# 輔助點擊模式：動畫驅動 DOM 的六個設計模式

> 來源：A5 ATM 模擬器多輪除錯（2026-03-25）
> 適用：所有實作 `clickModeState` / `executeNextAction` / `buildActionQueue` 的單元

---

## 背景

A5 ATM 的輔助點擊模式出現多個 bug，來自兩輪除錯：

**第一輪（取回卡片）**：
1. 煙火（confetti）在卡片還在滑出動畫中就提前觸發
2. 「取回卡片」按鈕出現後無法被點擊
3. `autoTakeReceipt` 有時並行啟動兩個輪詢實例

共同根因：**輔助點擊隊列假設 DOM 元素已就緒，但某些步驟需要「點擊 A → 動畫 → B 才出現」的兩段式流程**。

**第二輪（跨任務取走明細表）**：
4. 「餘額查詢」完成後切換到「轉帳」，明細表步驟直接跳過，系統凍結

根因：**`clickModeState` 物件被複用，上一輪的完成旗標未清除，污染了下一輪**。

---

## Pattern 1：動畫觸發的 DOM 元素必須輪詢，不能用固定延遲

### 問題

```javascript
// 錯誤：假設動畫固定 N ms 完成
cardImage.click();
this.TimerManager.setTimeout(() => {
    document.getElementById('take-card-btn').click(); // 可能尚未出現
}, 1800, 'clickMode');
```

動畫時間受效能、CSS transition、系統負載影響，固定延遲不可靠。

### 解法：先觸發動畫，再輪詢等待 DOM 元素出現

```javascript
cardImage.click(); // 步驟 1：觸發動畫

let attempts = 0;
const maxAttempts = 25; // 5 秒上限（每次 200ms）
const poll = () => {
    attempts++;
    const btn = document.getElementById('take-card-btn') ||
                document.querySelector('.take-card-btn');
    if (btn && btn.offsetParent !== null) {
        // DOM 元素就緒且可見，才執行步驟 2
        btn.click();
    } else if (attempts >= maxAttempts) {
        // 超時降級處理
        this.executeNextAction();
    } else {
        this.TimerManager.setTimeout(poll, 200, 'clickMode');
    }
};
this.TimerManager.setTimeout(poll, 200, 'clickMode');
```

**關鍵**：用 `btn.offsetParent !== null` 確認元素不只存在，且實際可見。

### 適用情境

- 卡片/票券退出動畫後才出現「取回」按鈕
- Modal 關閉動畫後才出現下一步元素
- 任何「點擊觸發 CSS 動畫 → 動畫結束後 JS 新增元素」的流程

---

## Pattern 2：安全網計時器必須記錄相位，防止舊相位計時器解鎖新相位

### 問題

```javascript
// 錯誤：1500ms 後才發現視覺提示沒出現，但此時已進入下一個相位
this.TimerManager.setTimeout(() => {
    if (!gs.clickModeState.waitingForClick) {
        gs.clickModeState.waitingForClick = true; // 意外解鎖了不同相位
    }
}, 1500, 'clickMode');
```

快速點擊時，舊相位的安全網計時器還在等待，但 `currentPhase` 已切換到新相位。計時器觸發後誤解鎖新相位的等待鎖定。

### 解法：排程時捕捉相位，觸發時驗證

```javascript
const safetyPhase = nextPhase; // 排程時快照

this.TimerManager.setTimeout(() => {
    // 只有相位未變才允許解鎖
    if (!gs.clickModeState.waitingForClick &&
        gs.clickModeState.currentPhase === safetyPhase) {
        gs.clickModeState.waitingForClick = true;
        gs.clickModeState.clickReadyTime = Date.now() - 600;
        gs.clickModeState.isExecuting = false;
    }
}, 1500, 'clickMode');
```

**原則**：計時器是「預排行程」，不是「即時命令」。任何有狀態的計時器都應在觸發時重新驗證條件是否仍然成立。

---

## Pattern 3：輪詢迴圈必須在每次迭代開頭檢查「已完成」旗標

### 問題

快速點擊導致 `autoTakeReceipt` 被啟動兩次，兩個輪詢實例並行執行，可能各自呼叫 `receiptBtn.click()` 一次，造成雙重觸發。

### 解法：輪詢開頭加早退守衛

```javascript
const poll = () => {
    // 每次迭代開頭先檢查
    if (gs.clickModeState.receiptTaken) {
        ATM.Debug.log('assist', '[ClickMode] 偵測到已取走，停止輪詢');
        return; // 立即退出，不執行後續邏輯
    }
    attempts++;
    const btn = document.querySelector('.take-receipt-btn');
    if (btn) {
        gs.clickModeState.receiptTaken = true; // 設旗標前先設，再點擊
        btn.click();
    } else {
        this.TimerManager.setTimeout(poll, 200, 'clickMode');
    }
};
```

**原則**：旗標在實際執行動作「之前」設為 true，而不是之後，以縮短競態窗口。

---

## Pattern 4：所有早退路徑都必須釋放 `isExecuting`

### 問題

`isExecuting = true` 防止快速點擊重入，但若某個分支提前 return 卻忘了重置，整個點擊系統會永久凍結。

### 解法：系統化檢查所有 return 點

```javascript
autoSomeStep() {
    const gs = this.state.gameState;

    if (earlyExitCondition) {
        gs.clickModeState.isExecuting = false; // 不可遺漏
        return;
    }

    // 正常流程...
    this.TimerManager.setTimeout(() => {
        gs.clickModeState.isExecuting = false;
        this.executeNextAction();
    }, delay, 'clickMode');
}
```

**檢查清單**：每次修改 `auto*` 函數時，搜尋該函數所有 `return` 語句，確認前面都有 `isExecuting = false`（或後續流程中有適當釋放）。

---

## Pattern 5：成功反饋（confetti/beep）必須在任務真正完成時觸發

### 問題

```javascript
// 錯誤：在找到卡片圖片時就觸發煙火
if (cardImage) {
    this.playStepSuccess(); // 卡片還在滑出，煙火提前爆
    cardImage.click();
    // ...等待 #take-card-btn 出現...
}
```

`playStepSuccess()` 在「找到可點擊元素」時觸發，而非「使用者任務完成」時觸發，造成視覺時序錯誤。

### 解法：反饋推遲到實際任務完成點

```javascript
if (cardImage) {
    cardImage.click(); // 觸發動畫，不播反饋

    const poll = () => {
        const btn = document.getElementById('take-card-btn');
        if (btn && btn.offsetParent !== null) {
            this.playStepSuccess(); // 卡片真正被取走時才播
            btn.click();
        } else {
            this.TimerManager.setTimeout(poll, 200, 'clickMode');
        }
    };
    this.TimerManager.setTimeout(poll, 200, 'clickMode');
}
```

**原則**：`playStepSuccess()` 的語意是「學生完成了這一步」，應在使用者任務完成的那一刻觸發，不是在「自動化流程找到入口點」時觸發。

---

## 綜合架構：兩段式步驟的標準模板

```javascript
autoTwoStageStep() {
    const gs = this.state.gameState;
    gs.clickModeState.currentStep++;

    // 優先查找「最終按鈕」（直接流程）
    const finalBtn = document.getElementById('final-btn');
    if (finalBtn && finalBtn.offsetParent !== null) {
        // 直接流程：按鈕已存在
        this.audio.playBeep();
        this.playStepSuccess(); // 任務已完成
        this.TimerManager.setTimeout(() => {
            finalBtn.click();
            this.TimerManager.setTimeout(() => {
                gs.clickModeState.isExecuting = false;
                this.executeNextAction();
            }, 500, 'clickMode');
        }, 300, 'clickMode');
        return;
    }

    // 動畫觸發流程：先點擊觸發元素，再輪詢最終按鈕
    const triggerEl = document.querySelector('.trigger-element');
    if (triggerEl) {
        this.TimerManager.setTimeout(() => {
            triggerEl.click(); // 觸發動畫，不播反饋

            let attempts = 0;
            const maxAttempts = 25;
            const poll = () => {
                if (gs.clickModeState.someCompletedFlag) return; // 並行防護
                attempts++;
                const btn = document.getElementById('final-btn');
                if (btn && btn.offsetParent !== null) {
                    gs.clickModeState.someCompletedFlag = true; // 先設旗標
                    this.audio.playBeep();
                    this.playStepSuccess(); // 任務完成時才播
                    this.TimerManager.setTimeout(() => {
                        btn.click();
                        this.TimerManager.setTimeout(() => {
                            gs.clickModeState.isExecuting = false;
                            this.executeNextAction();
                        }, 500, 'clickMode');
                    }, 300, 'clickMode');
                } else if (attempts >= maxAttempts) {
                    // 超時降級
                    gs.clickModeState.isExecuting = false; // 不可遺漏
                    this.executeNextAction();
                } else {
                    this.TimerManager.setTimeout(poll, 200, 'clickMode');
                }
            };
            this.TimerManager.setTimeout(poll, 200, 'clickMode');
        }, 300, 'clickMode');
        return;
    }

    // 退路：元素都找不到，直接繼續
    gs.clickModeState.isExecuting = false; // 不可遺漏
    this.TimerManager.setTimeout(() => {
        this.executeNextAction();
    }, 500, 'clickMode');
}
```

---

---

## Pattern 6：跨輪狀態污染——完成旗標必須在每輪 init 無條件重置

### 問題

```javascript
// 錯誤：只在物件不存在時才初始化，完成旗標從上輪殘留
if (!gs.clickModeState) {
    gs.clickModeState = {
        receiptTaken: false,  // 只有第一次才設
        isExecuting: false,
        // ...
    };
}
// 之後 receiptTaken 可能仍是上輪留下的 true
```

任務結束後 `unbindClickModeHandler()` 將 `_clickModeHandlerBound` 設為 `false`，使下一輪任務走「第一輪」初始化路徑。但 `if (!gs.clickModeState)` 守衛因物件已存在而跳過，`receiptTaken: true` 從上一輪殘留，導致下一輪的取明細表步驟直接判斷「已取走」並跳過，系統隨即凍結。

### 解法：在守衛之外，每次 init 都無條件重置跨輪旗標

```javascript
// 初始化 clickModeState（如果尚未初始化）
if (!gs.clickModeState) {
    gs.clickModeState = {
        receiptTaken: false,
        isExecuting: false,
        // ...其他欄位
    };
}
// 每輪重置完成旗標（防止上輪殘留污染）
gs.clickModeState.receiptTaken = false;
```

**原則**：`if (!obj)` 守衛只保護「物件建立」，不保護「欄位重置」。任何在任務間有意義的旗標都不能依賴守衛來清除，必須在 init 的最後無條件重置。

### 需要無條件重置的旗標特徵

- 語意是「這輪任務中某件事已完成」
- 在任務進行中被設為 `true`，任務結束後不應保留
- 若不清除，下輪任務遇到同類步驟時會誤判為「已完成」並跳過

### A5 適用的重置清單

```javascript
// initClickModeForATM() 末尾
gs.clickModeState.receiptTaken = false;
```

如未來新增其他「已完成」旗標（如 `cardTaken`、`cashTaken`），同樣需要加入此清單。

---

## 快速診斷清單

當輔助點擊模式出現「卡在某個步驟」時，依序檢查：

| 症狀 | 可能原因 | 對應 Pattern |
|------|---------|-------------|
| 按鈕出現但點擊無效 | 按鈕是動畫結束後才新增，固定延遲不夠 | Pattern 1 |
| 快速點擊後步驟被跳過或亂序 | 舊相位安全網計時器解鎖了新相位 | Pattern 2 |
| 某步驟被執行兩次 | 輪詢並行實例，無已完成旗標守衛 | Pattern 3 |
| 點擊系統完全凍結 | 某個 return 路徑沒有釋放 `isExecuting` | Pattern 4 |
| 煙火/音效時機不對 | `playStepSuccess` 在中間步驟就觸發 | Pattern 5 |
| **第二輪起某步驟直接跳過** | 完成旗標跨輪殘留，init 守衛沒清除 | **Pattern 6** |
