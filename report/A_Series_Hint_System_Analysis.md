# A 系列提示系統分析報告

> 最後更新：2026-03-20
> 範圍：A1~A6 各單元 JS 檔案
>
> **⚠️ 2026-03-20 重大變更**：A1~A6 普通模式的**計時器自動提示機制**（`scheduleNormalModeHint` / `clearNormalModeHintTimer` / `normalHintDelay` / `normalModeHintTimer`）已永久刪除。普通模式現在只保留「錯誤次數 ≥ 3 直接觸發」機制。設定頁的「自動提示延遲」選項（`normal-hint-delay-group`）同步移除。A5 的 `showATMEasyHint` 改為直接讀取 `config.hintDelay`，功能不受影響。

---

## 一、總覽比較表

| 單元 | 提示機制類型 | Easy 模式 | Normal 模式 | Hard 模式 |
|------|-----------|-----------|------------|----------|
| **A1** 販賣機 | 錯誤計數 | 立即自動提示 | 錯誤 ≥ 3 直接觸發 | 手動點擊提示鈕 |
| **A2** 理髮廳 | 錯誤計數 | 立即自動提示 | 錯誤 ≥ 3 直接觸發 | 手動點擊提示鈕 |
| **A3** 麥當勞 | 錯誤計數（按類別） | 立即自動提示 | 錯誤 ≥ 3 直接觸發 | 手動點擊提示鈕 |
| **A4** 超市 | 錯誤計數（分步驟） | 立即自動提示 | 每步驟錯誤 ≥ 3 直接觸發 | 手動點擊提示鈕 |
| **A5** ATM | **時間延遲**（唯一） | 立即自動提示（0ms） | **自動提示，延遲 10 秒**（`config.hintDelay`） | 手動點擊提示鈕 |
| **A6** 火車票 | 錯誤計數（分步驟） | 立即自動提示 | 每步驟錯誤 ≥ 3 直接觸發（500ms delay） | 手動點擊提示鈕 |

**核心規律**：
- Easy：全自動提示，0 延遲
- Normal：錯誤 ≥ 3 次直接觸發（A5 例外，改為 10 秒計時器，由 `config.hintDelay` 控制）
- Hard：手動提示鈕，無自動觸發

> **已移除（2026-03-20）**：A1~A4、A6 原有額外的「計時器延遲自動提示」層（`scheduleNormalModeHint`），該機制以 `normalHintDelay`（預設 10000ms）排程，與錯誤計數無關。現已全數刪除，普通模式提示直接由錯誤計數觸發。

---

## 二、各單元詳細說明

### A1 自動販賣機（`js/a1_vending_machine.js`）

**機制**：全域 `errorCount` 計數器，達 3 次觸發 `showNormalModeHint(currentStep)`

| 模式 | 自動提示 | 觸發條件 | 提示函數 |
|------|---------|---------|---------|
| Easy | ✅ 立即 | 步驟開始即高亮 | `showNormalModeHint(step)` |
| Normal | ✅ 自動 | `errorCount >= 3` | `showNormalModeHint(step)` |
| Hard | ❌ 手動 | 手動點按鈕 | `showHint()` |

**設定位置**：
- 難度規則：`DIFFICULTY_PAYMENT_RULES`（約第 82 行）
- 觸發邏輯：`state.gameState.normalMode.errorCount >= 3`（約第 3565 行）

**關鍵搜尋字**：`normalMode.errorCount >= 3`, `showNormalModeHint`, `DIFFICULTY_PAYMENT_RULES`

---

### A2 理髮廳（`js/a2_barber_shop_kiosk.js`）

**機制**：全域 `errorCount` 計數器，達 3 次觸發 `showNormalModeHint()`

| 模式 | 自動提示 | 觸發條件 | 提示函數 |
|------|---------|---------|---------|
| Easy | ✅ 立即 | 步驟開始即高亮 | `showNormalModeHint()` |
| Normal | ✅ 自動 | `errorCount >= 3` | `showNormalModeHint()` |
| Hard | ❌ 手動 | 手動點按鈕 | `showHint()` |

**設定位置**：
- 觸發邏輯：約第 4534 行 `normalMode.errorCount >= 3`
- 顯示判斷：約第 5609 行 `shouldShowHint = errorCount >= 3`

**關鍵搜尋字**：`normalMode.errorCount >= 3`, `showNormalModeHint`, `shouldShowHint`

---

### A3 麥當勞（`js/a3_mcdonalds_order.js`）

**機制**：按**餐點類別（category）**分別計數，各類別達 3 次觸發對應提示

| 模式 | 自動提示 | 觸發條件 | 提示函數 |
|------|---------|---------|---------|
| Easy | ✅ 立即 | 步驟開始即自動導航 | 自動導航到目標餐點 |
| Normal | ✅ 自動 | `categoryErrorCounts[category] >= 3` | `showCategoryAssignmentModal(category)` |
| Hard | ❌ 手動 | 手動點按鈕 | `showHardModeHint()` |

**設定位置**：
- 計數器：`state.gameState.categoryErrorCounts[category]`（約第 3461、4515 行）
- 觸發：`errorCount >= 3`（約第 3464、4534 行）

**特色**：Normal 模式的提示是「彈出類別選擇 Modal」，引導學生點選正確餐點類別。

**關鍵搜尋字**：`categoryErrorCounts`, `showCategoryAssignmentModal`, `showHardModeHint`

---

### A4 超市購物（`js/a4_simulated_shopping.js`）

**機制**：3 個獨立步驟計數器，各步驟達 3 次錯誤觸發對應提示

| 步驟 | 計數器 | 觸發條件 | 提示函數 |
|------|--------|---------|---------|
| 步驟 1：選商品 | `stepErrorCounts.productSelection` | ≥ 3 | `showProductSelectionHint(targetItem)` |
| 步驟 2：付款 | `stepErrorCounts.payment` | ≥ 3 | `showPaymentHint()` |
| 步驟 3：找零 | `stepErrorCounts.changeCalculation` | ≥ 3 | `showTotalHint()` |

| 模式 | 自動提示 | 觸發條件 |
|------|---------|---------|
| Easy | ✅ 立即 | 步驟開始即提示 |
| Normal | ✅ 自動 | 各步驟錯誤 ≥ 3 |
| Hard | ❌ 手動 | 手動點按鈕 |

**設定位置**：
- 計數器初始化：約第 269 行 `stepErrorCounts: { productSelection: 0, payment: 0, changeCalculation: 0 }`
- 商品選擇計數：約第 6303 行
- 付款計數：約第 8597 行
- 找零計數：約第 10226 行

**關鍵搜尋字**：`stepErrorCounts`, `showProductSelectionHint`, `showPaymentHint`, `showTotalHint`

---

### A5 ATM（`js/a5_atm_simulator.js`）⭐ 特殊設計

**機制**：唯一使用**時間延遲**（非錯誤計數）的單元

| 模式 | 自動提示 | 提示延遲 | 說明 |
|------|---------|---------|------|
| Easy | ✅ 立即 | **0 ms** | 進入步驟即顯示 |
| Normal | ✅ 自動 | **10,000 ms（10 秒）** | 等待 10 秒後自動顯示提示 |
| Hard | ❌ 手動 | — | 需點擊提示按鈕 |

**DIFFICULTY_CONFIG 設定**（約第 1381~1412 行）：

```javascript
DIFFICULTY_CONFIG: {
  easy: {
    hintDelay: 0,          // 立即顯示
    autoShowHint: true,
    showHintButton: false
  },
  normal: {
    hintDelay: 10000,      // 等 10 秒後自動提示
    autoShowHint: true,
    showHintButton: true
  },
  hard: {
    hintDelay: 0,
    autoShowHint: false,   // 不自動顯示
    showHintButton: true
  }
}
```

**提示流程**（約第 12530~12540 行）：
```javascript
// 普通模式 10 秒計時器
this.state.gameState.easyModeHints.delayedHintTimer =
    this.TimerManager.setTimeout(() => {
        this.showATMEasyHint(step, elementSelector, true);
    }, config.hintDelay, 'hintAnimation');
```

**關鍵搜尋字**：`DIFFICULTY_CONFIG`, `hintDelay: 10000`, `autoShowHint`, `delayedHintTimer`, `showATMEasyHint`, `config.hintDelay`

> **2026-03-20**：`showATMEasyHint` 中原有 `this.state.settings.normalHintDelay ?? config.hintDelay`，現已改為直接讀取 `config.hintDelay`（`normalHintDelay` 已從 state.settings 刪除）。

---

### A6 火車票（`js/a6_train_ticket.js`）

**機制**：4 個步驟計數器，各步驟達 3 次錯誤觸發提示（帶 500ms 延遲防競態）

| 步驟 | 計數器 | 觸發條件 | 延遲 |
|------|--------|---------|------|
| 步驟 1：出發站 | `stepErrorCounts.askStart` | ≥ 3 | 500 ms |
| 步驟 2：到達站 | `stepErrorCounts.askEnd` | ≥ 3 | 500 ms |
| 步驟 3：車種 | `stepErrorCounts.askType` | ≥ 3 | 500 ms |
| 步驟 4：張數 | `stepErrorCounts.askCount` | ≥ 3 | 500 ms |

| 模式 | 自動提示 | 觸發條件 |
|------|---------|---------|
| Easy | ✅ 立即 | 步驟開始即高亮目標選項 |
| Normal | ✅ 自動 | 各步驟錯誤 ≥ 3（500ms 後顯示） |
| Hard | ❌ 手動或也計數 | 同閾值但無語音反饋 |

**設定位置**：
- 計數器：約第 288 行 `stepErrorCounts: { askStart: 0, askEnd: 0, askType: 0, askCount: 0 }`
- 觸發：約第 6125~6361 行 `errorCount >= 3 && !stepHintsShown.askStart`
- 延遲：`TimerManager.setTimeout(() => { ... }, 500, 'hint')`

**特色**：以 `stepHintsShown` 旗標確保同一步驟的提示只顯示一次。

**關鍵搜尋字**：`stepErrorCounts`, `stepHintsShown`, `showNormalModeHint`, `500, 'hint'`

---

## 三、提示動畫樣式

各單元提示動畫共用 `.step-hint` 樣式（定義於各單元 CSS）：

```css
.step-hint {
    animation: pulseHighlight 1.5s infinite;
    box-shadow: 0 0 25px rgba(255,193,7,0.8);
    outline: 4px solid #FFC107;
}
```

普通模式錯誤 3 次的提示文字說明（CLAUDE.md 摘錄）：

> **普通模式錯誤 3 次提示**：Grep `stepErrorCounts` 定位計數器。`.step-hint { animation: pulseHighlight 1.5s infinite; box-shadow: 0 0 25px rgba(255,193,7,0.8); outline: 4px solid #FFC107; }`

---

## 四、提示系統架構小結

```
提示觸發機制
├── 時間計時型（僅 A5）
│   ├── Easy：0ms（立即）
│   ├── Normal：10,000ms（10秒）
│   └── Hard：手動
│
└── 錯誤計數型（A1, A2, A3, A4, A6）
    ├── 閾值：errorCount >= 3（統一）
    ├── 計數器粒度：
    │   ├── 全域單一（A1, A2）
    │   ├── 按類別（A3：burgers/sides/drinks/desserts）
    │   └── 按步驟（A4：3步, A6：4步）
    └── 提示延遲：
        ├── 0ms（A1, A2, A3, A4）
        └── 500ms（A6，防競態）
```

---

## 五、快速查找索引

| 想修改 | 搜尋關鍵字 | 說明 |
|--------|-----------|------|
| A5 普通模式等待秒數 | `hintDelay: 10000`（在 `DIFFICULTY_CONFIG`）| 改數值（ms）即可 |
| 所有錯誤次數閾值 | `>= 3` + `errorCount` | 改 3 為其他數字 |
| A1/A2 提示觸發 | `normalMode.errorCount >= 3` | 搜尋後修改閾值 |
| A3 提示觸發 | `categoryErrorCounts` | 找到對應類別邏輯 |
| A4 提示觸發 | `stepErrorCounts.productSelection`, `.payment`, `.changeCalculation` | 三處分別修改 |
| A6 提示觸發 | `stepErrorCounts.askStart`, `.askEnd`, `.askType`, `.askCount` | 四處分別修改 |
| A6 提示延遲 | `500, 'hint'` | 改延遲 ms 數 |
| 提示動畫樣式 | `pulseHighlight`, `.step-hint` | 修改 CSS |

> **已移除（2026-03-20，勿搜尋）**：`scheduleNormalModeHint`、`clearNormalModeHintTimer`、`normalHintDelay`、`normalModeHintTimer`、`normal-hint-delay-group`、`custom-hint-delay-confirm`
