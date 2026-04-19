# F2 唱數單元 — 完成經驗報告書

> **建立日期**：2026-02-07（原始）
> **更新日期**：2026-03-10（困難模式提示框新增吉祥物）
> **專案名稱**：Money Tutor 金錢教學系統
> **單元編號**：F2 — 唱數（Rote and Rational Counting）
> **報告類型**：單元完成經驗與開發建議

---

## 一、檔案規模總覽

| 檔案 | 路徑 | 行數 | 大小 |
|------|------|------|------|
| JS 核心邏輯 | `js/f2_rote_and_rational_counting.js` | ~4,589 行 | ~200 KB |
| HTML 頁面 | `html/f2_rote_and_rational_counting.html` | ~42 行（CSS 已外部化） | ~2 KB |
| CSS 專用樣式 | `css/f2-rote-and-rational-counting.css` | ~170 行 | ~6 KB |
| 作業單產生器 | `worksheet/units/f2-worksheet.js` | 163 行 | ~5 KB |
| **合計** | — | **~4,964 行** | ~213 KB |

### CSS 依賴

| 檔案 | 說明 |
|------|------|
| `css/ai-theme.css` | 共用主題樣式 |
| `css/unit6.css` | 共用單元樣式 |
| `css/f2-rote-and-rational-counting.css` | **F2 專用樣式（原 HTML 內嵌 + JS 模板 `<style>` 外部化）** |

### JS 依賴

| 依賴 | 來源 | 用途 |
|------|------|------|
| `touch-drag-utility.js` | 本地 | 觸控拖曳跨平台支援 |
| `audio-unlocker.js` | 本地 | 行動裝置音訊解鎖 |
| `theme-system.js` | 本地 | 深色/淺色主題切換 |
| `emoji-library.js` | 本地 | Emoji 圖示庫（HTML 未引用，由主程式內建主題） |
| `reward-launcher.js` | 本地 | 獎勵系統啟動器 |
| `number-speech-utils.js` | 本地 | 數字語音轉換 |
| `mobile-debug-panel.js` | 本地 | 行動裝置除錯面板 |
| `confetti.browser.min.js` | 本地（v1.9.2） | 煙火慶祝動畫 |

### F1 vs F2 規模比較

| 項目 | F1 一對一對應 | F2 唱數 | 差異 |
|------|-------------|---------|------|
| JS 行數 | **7,468 行** | **~4,589 行** | F2 減少 39% |
| 作業單行數 | **135 行** | **163 行** | F2 稍多 |
| 難度模式 | **3 種** | **3 種** | 相同 |
| 互動方式 | **拖曳+點擊** | **點擊為主** | F2 較簡單 |
| 總程式碼量 | **~7,874 行** | **~4,887 行** | F2 精簡 38% |

---

## 二、單元特色

### 2.1 組態驅動架構（ModeConfig）

與 F1 類似，F2 透過 `ModeConfig` 物件定義三種難度的完整行為：

```javascript
ModeConfig[difficulty] = {
    triggerType,           // 觸發方式（manual）
    audioFeedback,         // 音效開關
    speechFeedback,        // 語音開關
    showNumbers,           // 是否顯示勾選標記
    autoShowTotal,         // 是否自動顯示總數
    requireAnswer,         // 是否需要回答
    allowRetry,            // 是否允許重試
    useNumberInput,        // 是否使用數字鍵盤
    optionsCount,          // 選項數量
    speechTemplates,       // 語音模板
    textTemplates,         // 文字模板
    timing                 // 延遲時間設定
}
```

### 2.2 三種難度模式

| 模式 | 互動方式 | 回答方式 | 特點 |
|------|---------|---------|------|
| **簡單** | 逐一點擊 → 綠色勾選 + 語音唸數 | 自動完成 | 有語音引導，無需選答案 |
| **普通** | 逐一點擊 → 藍色勾選 + 語音唸數 | 三選一按鈕 | 需從 3 個選項中選正確答案 |
| **困難** | 逐一點擊 → 淡化效果（無語音） | 數字鍵盤輸入 | 無逐項語音，需自行輸入數字 |

### 2.3 四種主題 + 自訂主題

| 主題 | 圖示 |
|------|------|
| 水果 | 🍎🍌🍇🍓🍊🥝🍍🍉🍑🍒 |
| 動物 | 🐶🐱🐭🐰🦊🐻🐼🐨🐯🦁 |
| 交通工具 | 🚗🚕🚌🚓🚑🚒🚚🚲🚀✈️ |
| 自訂 | 使用者上傳圖片（最多 8 張，Base64 壓縮） |

### 2.4 五種數數範圍

| 範圍 | 最小值 | 最大值 |
|------|--------|--------|
| 1-5 | 1 | 5 |
| 1-10 | 1 | 10 |
| 15-20 | 15 | 20 |
| 20-30 | 20 | 30 |
| 自訂 | 1 | 30（由使用者設定） |

### 2.5 測驗模式

| 模式 | 說明 | 適用難度 |
|------|------|---------|
| 重試模式 | 答錯可重新作答 | 普通、困難 |
| 單次模式 | 答錯顯示正確答案後跳下一題 | 普通、困難 |
| 無（自動） | 數完自動進入下一題 | 簡單 |

### 2.6 防重複機制

使用 `getRandomIntExcluding()` 確保連續兩題的正確答案不同，避免學生不思考直接重複選擇。

### 2.7 動態 CSS 產生器（StyleConfig）

F2 透過 `StyleConfig` 物件動態產生各難度的 CSS：

| 難度 | 邊框顏色 | 背景色 | Hover 效果 |
|------|---------|--------|-----------|
| 簡單 | 綠色 `#28a745` | `#d4edda` | 放大 1.05 + 陰影 |
| 普通 | 藍色 `#007bff` | `#d1ecf1` | 放大 1.05 + 陰影 |
| 困難 | 紅色 `#dc3545` | `#f8d7da` | 淡化 + 勾選標記 |

---

## 三、重點架構

### 3.1 遊戲流程

```
init() → showSettings()
  ↓
使用者選擇：難度、主題、題數、範圍、測驗模式
  ↓
start() → setupGameUI() → startNewTurn()
  ↓
┌─── 題目迴圈 ────────────────────┐
│ 1. 隨機產生數量（避免與上題重複）    │
│ 2. 渲染圖示到畫面上                │
│ 3. 播放指導語音                    │
│ 4. 等待使用者逐一點擊圖示           │
│    → 顯示勾選/淡化 + 語音唸數      │
│ 5. 全部點完 → finishCountingPhase()│
│    ├ 簡單：自動顯示總數 → 下一題   │
│    ├ 普通：顯示三選一按鈕          │
│    └ 困難：顯示數字鍵盤輸入        │
│ 6. 驗證答案 → 反饋 → 下一題       │
└──────────────────────────────────┘
  ↓
全部完成 → endGame() → 結果畫面
```

### 3.2 狀態管理

```javascript
state: {
    score: 0,                    // 分數（每題正確 +10）
    currentTurn: 0,              // 目前題號
    totalTurns: 10,              // 總題數
    correctAnswer: 0,            // 本題正確答案
    lastAnswer: null,            // 上題答案（防重複用）
    userCountProgress: 0,        // 使用者已點擊數量
    isAnswering: false,          // 回答階段鎖定
    isEndingGame: false,         // 防止 endGame 重複調用
    isStartingNewTurn: false,    // 防重入保護
    startTime: null,             // 遊戲開始時間
    customItems: [],             // 自訂主題圖片
    settings: {
        difficulty,              // easy/normal/hard
        theme,                   // fruits/animals/vehicles/custom
        questionCount,           // 1-50
        testMode,                // retry/single/null
        countingRange            // range1-5/range1-10/...
    }
}
```

### 3.3 統一狀態重置函數（resetGameState）

**2026-02-16 新增**：為解決狀態重置邏輯分散的問題，新增 `resetGameState()` 函數統一管理。

```javascript
resetGameState() {
    // 遊戲進度
    this.state.score = 0;
    this.state.currentTurn = 0;
    this.state.lastAnswer = null;
    this.state.userCountProgress = 0;

    // 控制旗標（全部重置為 false）
    this.state.isAnswering = false;
    this.state.isEndingGame = false;
    this.state.isStartingNewTurn = false;

    // 時間
    this.state.startTime = null;

    console.log('🔄 [F2] 遊戲狀態已重置');
}
```

**調用位置**：

| 入口點 | 調用方式 |
|--------|---------|
| `showSettings()` | `this.resetGameState()` |
| `start()` | `this.resetGameState()` + `this.state.startTime = Date.now()` |

**設計原則**：
- **遊戲級別重置**：由 `resetGameState()` 統一處理
- **回合級別重置**：保留在 `startNewTurn()` 中（如 `isAnswering = false`, `userCountProgress = 0`）

---

## 四、語音系統

### 4.1 Web Speech API（TTS）

語音選擇優先順序（與 F1 相同）：
1. Microsoft HsiaoChen Online（台灣）
2. Google 國語（台灣）
3. 任何 `zh_TW` 語音
4. 任何繁體中文語音
5. 任何 `zh` 語音

### 4.2 語音模板（依難度）

**簡單模式語音**（逐項引導）：

| 模板 | 觸發時機 | 內容範例 |
|------|---------|---------|
| `initialInstruction` | 題目開始 | 「請數一數，總共有幾個」 |
| `instruction` | 引導點擊 | 「請鼠鼠看有幾個」 |
| `itemCount` | 數到第 N 個 | 「三」（使用數字語音轉換） |
| `totalComplete` | 全部數完 | 「數完了，總共有 5 個」 |
| `encouragement` | 鼓勵 | 「你真棒！」 |

**普通模式語音**（選答引導）：

| 模板 | 觸發時機 | 內容範例 |
|------|---------|---------|
| `chooseAnswer` | 進入選答階段 | 「請選擇正確的答案」 |
| `correct` | 答對 | 「答對了！正確答案是 5」 |
| `incorrect` | 答錯（重試模式） | 「答錯了，再試一次！」 |
| `incorrectWithAnswer` | 答錯（單次模式） | 「答錯了，正確答案是 5」 |

**困難模式語音**（最少引導）：

| 模板 | 觸發時機 | 內容範例 |
|------|---------|---------|
| `inputPrompt` | 進入輸入階段 | 「請輸入正確的數量」 |
| `correct` | 答對 | 「答對了！正確答案是 12」 |
| `incorrectWithAnswer` | 答錯 | 「答錯了，正確答案是 12」 |

**困難模式限制**：`speechFeedback: false`，逐項點擊時不播放語音（只有結果回饋才有語音）。

### 4.3 數字發音

使用 `NumberSpeechUtils` 處理中文數字發音：
- `convertToQuantitySpeech(count)` — 帶量詞「個」的數量語音
- `convertToPureNumberSpeech(count)` — 純數字語音
- 正確處理「2」的發音規則（貳/兩）

### 4.4 音效

| 音效 | 檔案 | 觸發時機 |
|------|------|---------|
| 選取音 | `menu-select.mp3` | 點擊圖示 |
| 正確音 | `correct.mp3` | 答對 |
| 錯誤音 | `error.mp3` | 答錯 |
| 成功音 | `success.mp3` | 完成全部題目 |
| 點擊音 | `click.mp3` | 一般按鈕點擊 |

### 4.5 語音安全機制

- 5 秒 timeout 保護：語音播放超時會強制執行回呼
- 取消重疊：新語音播放前取消前一個
- 行動裝置解鎖：首次互動觸發 `unlockAudio()`

---

## 五、觸控與桌面支援

### 5.1 雙重拖曳系統

F2 內建 `CrossPlatformDragManager` 管理兩套拖曳系統：

| 系統 | 適用平台 | 說明 |
|------|---------|------|
| `HTML5DragSystem` | 桌面瀏覽器 | 使用原生 HTML5 Drag & Drop API |
| `TouchDragUtility` | 行動裝置 | 外部工具庫處理 touch 事件轉拖曳 |

**注意**：F2 的主要互動方式是**點擊**而非拖曳，拖曳系統使用率較低。

### 5.2 點擊互動（主要互動方式）

F2 的主要互動方式是**點擊**而非拖曳。使用者逐一點擊圖示進行數數：

1. 點擊圖示 → `handleItemClick()` 觸發
2. 標記為已點擊（加上 `checked` class）
3. 顯示勾選覆蓋（簡單/普通）或淡化效果（困難）
4. 播放對應語音
5. 全部點完後進入回答階段

### 5.3 行動裝置優化

| 技術 | 用途 |
|------|------|
| `overscroll-behavior-y: contain` | 禁用下拉刷新 |
| `touch-action: manipulation` | 禁用雙擊縮放 |
| `-webkit-tap-highlight-color: transparent` | 移除觸控高亮 |
| `user-select: none` | 禁用文字選取 |
| 觸擊回饋 `scale(0.95)` | 提供觸覺反饋 |

### 5.4 深色模式支援

HTML 中定義 `[data-theme="dark"]` 選擇器，搭配 `theme-system.js` 切換深色/淺色主題。

---

## 六、版面配置

### 6.1 設定頁面

```
┌─────────────────────────────────────┐
│ 遊戲難度：[簡單] [普通] [困難]        │
├─────────────────────────────────────┤
│ 數數範圍：[1-5] [1-10] [15-20]      │
│           [20-30] [自訂]             │
├─────────────────────────────────────┤
│ 遊戲主題：[水果] [動物] [交通工具]     │
│           [自訂主題]                  │
│   (自訂主題區：上傳、預覽、列表)        │
├─────────────────────────────────────┤
│ 測驗題數：[1] [3] [5] [10] [自訂]    │
├─────────────────────────────────────┤
│ 測驗模式：[重試模式] [單次模式]        │
│   (簡單模式時禁用)                    │
├─────────────────────────────────────┤
│ [🎁 獎勵系統]  [📝 作業單]            │
├─────────────────────────────────────┤
│        [▶ 開始遊戲]                  │
└─────────────────────────────────────┘
```

### 6.2 遊戲頁面

```
┌─────────────────────────────────────────┐
│ 標題列                                   │
│ F2 唱數  [第 1/10 題]  [🎁 獎勵] [返回設定] │
├─────────────────────────────────────────┤
│                                         │
│  ┌───────────────────────────────────┐  │
│  │         物品區（item-area）         │  │
│  │  🍎 🍎 🍎 🍎 🍎  🍎 🍎 🍎       │  │
│  │  （每 10 個換行）                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │       選項區（options-area）        │  │
│  │  [5]  [7]  [8]  （普通模式三選一）  │  │
│  │  或 [數字鍵盤]    （困難模式輸入）    │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │       提示區（hint-area）          │  │
│  │  💡 需要提示？點我看答案            │  │
│  │  （困難模式專用）                    │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

### 6.3 完成畫面

統一使用 C/F 系列標準完成畫面（紫色漸層背景）：
- 表現徽章（依正確率分 4 級）
- 三個統計卡片：答對題數、正確率、完成時間
- 獎勵系統按鈕
- 「再玩一次」+「返回設定」按鈕
- 煙火動畫 + 成功音效

### 6.4 各難度的視覺差異

| 元素 | 簡單 | 普通 | 困難 |
|------|------|------|------|
| 勾選覆蓋 | 綠色圓圈 ✓ | 藍色圓圈 ✓ | 淡化 + 小勾選 |
| 邊框色 | 綠色 | 藍色 | 紅色 |
| 回答方式 | 自動 | 三選一按鈕 | 數字鍵盤 |
| 語音引導 | 完整（每項唸數） | 完整（每項唸數） | 最少（僅結果回饋） |
| 提示功能 | 無（自動完成） | 無 | 有（💡 按鈕） |

---

## 七、Bug 檢測與已知問題

### 7.1 已確認的程式碼問題

#### 主程式 Bug（js/f2_rote_and_rational_counting.js）

| # | 嚴重度 | 問題描述 | 位置 | 狀態 |
|---|--------|---------|------|------|
| 1 | **高** | 事件監聽器未清理 - 記憶體洩漏風險 | 第 3419、3426、3818-3819 行 | ✅ **已修復** (2026-02-11) |
| 2 | **高** | 語音播放競態條件 - 狀態管理不同步 | 第 2510-2516、2527-2538 行 | ⚠️ 待修復（複雜度較高） |
| 3 | **高** | closeFeedbackPopup 未正確初始化 | 第 2565-2567、3826 行 | ✅ **已修復** (2026-02-11) |
| 4 | **中** | 答題選項可能包含重複值（範圍過小時無限迴圈） | 第 2604-2607 行 | ✅ **已修復** (2026-02-11) |
| 5 | **中** | testMode 未被正確初始化為簡單模式默認值 | 第 2172-2173 行 | ✅ **已修復** (2026-02-11) |
| 6 | **中** | 語音播放超時機制隱患（雙重執行風險） | 第 1233-1236 行 | ✅ **原本已有防護** |
| 7 | **低** | getRandomIntExcluding 在範圍為 1 時無法避免重複 | 第 3738-3756 行 | ⚠️ 待修復（低優先） |
| 8 | **低** | 渲染完成後未驗證 DOM 元素 | 第 2613-2643 行 | ⚠️ 待修復（低優先） |
| 9 | **低** | HTML5DragSystem 與 TouchDragUtility 潛在衝突 | 第 3320-3364 行 | ⚠️ 待修復（低優先） |
| 10 | **低** | customItems 上傳品質未驗證 | 第 3884-3888 行 | ⚠️ 待修復（低優先） |
| 11 | **中** | `setupGameUI()` 的 `app` 匿名監聽器未透過 EventManager 管理，每次遊戲後堆疊累積 | 搜尋 `boundHandleAppDelegatedClick` | ✅ **已修復** (2026-02-23)：改用 `boundHandleAppDelegatedClick` + `Game.EventManager.on(..., 'gameUI')` |
| 12 | **中** | 4 個遊戲邏輯 `setTimeout` 未透過 TimerManager 管理（`finishCountingPhase`/`startNewTurn`），快速重置後可能觸發舊狀態轉換 | 搜尋 `turnTransition` | ✅ **已修復** (2026-02-24)：改用 `Game.TimerManager.setTimeout(..., 'turnTransition')` |
| 13 | **低** | 自訂圖示上傳/刪除流程使用 `alert()`/`confirm()` 阻塞式對話框（7 處） | 搜尋 `alert(` | ⚠️ 暫緩（低優先） |
| 14 | **中** | `showAnswerRevealPopup()` 3 秒自動隱藏與 `startFireworksAnimation()` 第二波煙火（200ms）使用 raw `setTimeout`，場景切換後仍可能執行 | 搜尋 `答案提示彈窗自動隱藏`, `延遲觸發第二波煙火` | ✅ **已修復** (2026-02-24)：改用 `Game.TimerManager.setTimeout(..., 'turnTransition'/'animation')` |

#### 詳細說明

**Bug #1：事件監聯器未清理**
```javascript
// 第 3418-3430 行：popup 和 backdrop 的 click 事件未在移除元素時清理
if (popup) {
    popup.addEventListener('click', () => {
        popup.remove();
        if (backdrop) backdrop.remove();
    });
}
if (backdrop) {
    backdrop.addEventListener('click', () => {
        if (popup) popup.remove();
        backdrop.remove();
    });
}
```
問題：元素被 `remove()` 後，事件監聽器雖然會被 GC 回收，但若快速重複開關彈窗，可能造成短暫的記憶體累積。

**Bug #2：語音播放競態條件**
```javascript
// 第 2510-2516 行：簡單/普通模式
this.state.isAnswering = true;
this.Speech.speak('itemCount', difficulty, config, { count: count }, () => {
    this.finishCountingPhase();
});

// 第 2527-2538 行：困難模式
this.state.isAnswering = true;
const delay = (config.timing.numberDisplayDelay || 100) + 500;
setTimeout(() => this.finishCountingPhase(), delay);
```
問題：`isAnswering` 狀態在語音播放完成前設為 true，但若語音被中斷（如快速連點），callback 可能不會執行，導致狀態錯亂。

**Bug #3：closeFeedbackPopup 未正確初始化**
```javascript
// 第 2565-2567 行：使用前檢查
if (this.closeFeedbackPopup) {
    this.closeFeedbackPopup();
    this.closeFeedbackPopup = null;
}

// 第 3826 行：設置
this.closeFeedbackPopup = closePopup;
```
問題：`closeFeedbackPopup` 在 Game 物件頂層未初始化為 `null`，首次存取時為 `undefined`。雖然 `if` 檢查可避免錯誤，但語意不清晰。

**Bug #4：答題選項無限迴圈風險**
```javascript
// 第 2604-2607 行
while (options.length < config.optionsCount) {
    const wrongOption = this.getRandomInt(rangeConfig.minItems, rangeConfig.maxItems);
    if (!options.includes(wrongOption)) options.push(wrongOption);
}
```
問題：當 `maxItems - minItems + 1 < optionsCount` 時（例如範圍 1-3 但需要 4 個選項），此 while 迴圈將無限執行。

**Bug #5：testMode 初始化問題**
```javascript
// 第 2172-2173 行
// 清除模式選擇（重置為null）
this.state.settings.testMode = null;
```
問題：簡單模式切換時將 testMode 設為 null 是正確的，但若使用者從普通模式切換到簡單再切回普通，testMode 不會自動恢復預設值。

**Bug #6：語音超時雙重執行**
```javascript
// 第 1233-1236 行
setTimeout(() => {
    Game.Debug.logSpeech('語音播放超時，強制執行回調', templateKey, difficulty);
    safeCallback();
}, 5000);
```
問題：當語音正常播放完成（觸發 onend）且超時計時器也觸發時，callback 會被執行兩次。雖然 `safeCallback` 可能有防護，但仍有風險。

**Bug #7：getRandomIntExcluding 邊界情況**
```javascript
// 第 3738-3756 行
getRandomIntExcluding(min, max, excludeValue) {
    if (min === max) {
        return min;  // 無法避免重複，直接返回
    }
    // ...
}
```
問題：當範圍只有 2 個數字且其中一個是 excludeValue 時，函數能正確工作。但註解應更清楚說明邊界行為。

#### 作業單 Bug（worksheet/units/f2-worksheet.js）

| # | 嚴重度 | 問題描述 | 位置 | 狀態 |
|---|--------|---------|------|------|
| 1 | **中** | 主題選項多一個「混合」 | 第 41-52 行 | ⚠️ 設計差異 |
| 2 | **中** | Easy 模式圖示數量不受 5~15 限制 | 第 85-104 行 | ⚠️ 設計差異 |

**Bug #1：主題選項差異**
```javascript
// 第 41-52 行
options: [
    { label: '水果', value: 'fruits' },
    { label: '動物', value: 'animals' },
    { label: '交通工具', value: 'vehicles' },
    { label: '混合', value: 'mixed' },  // 多出此選項
],
```
問題：CLAUDE.md 記載作業單主題只有 3 種（水果/動物/交通工具），但實際有 4 種（含混合）。這是**文件不同步**而非程式錯誤。

**Bug #2：Easy 模式圖示數量**
```javascript
// 第 85-104 行
if (difficulty === 'easy') {
    const lo = min;
    const hi = max;
    let answer;
    // ...
}
```
問題：CLAUDE.md 記載「easy 模式圖示數量 5~15」，但程式使用使用者選擇的範圍（可能是 1-5 或 20-30）。這是**文件描述不精確**。

### 7.2 F2 vs F1 Bug 數量比較

| 問題類型 | F1 一對一對應 | F2 唱數 | 評價 |
|---------|-------------|---------|------|
| 未清理 setTimeout | ~~43~~ → 0（已修復） | 未計數 | F1 已修復 |
| 未移除 addEventListener | ~~26~~ → 0（已修復） | ~4 處 | F2 較少 |
| console.log 殘留 | 6 個 | ~10 個 | 差異不大 |
| 競態條件 | 無明顯 | 2 處（語音相關） | F2 需注意 |
| 無限迴圈風險 | 無 | 1 處（選項生成） | F2 需修復 |

### 7.3 正面發現

| 項目 | 說明 |
|------|------|
| 程式碼精簡 | 比 F1 減少 ~40% 程式碼量，架構更清晰 |
| Debug 系統 | 完整的 `Game.Debug` 物件統一管理日誌 |
| confetti 版本 | 使用 v1.9.2（本地化），版本一致 |
| 完成畫面 | 已採用 C/F 系列統一樣式 |
| startTime 記錄 | 已正確記錄遊戲開始時間 |
| 組態驅動架構 | ModeConfig + StyleConfig 設計良好 |
| getRandomIntExcluding | 有完整的邊界檢查 |

### 7.4 非 Bug 但需注意的設計

| 項目 | 說明 |
|------|------|
| 拖曳系統佔比高 | HTML5DragSystem（~450 行）在 F2 中使用率低（主要互動為點擊） |
| ~~CSS 分散~~ | ✅ **已修復（2026-02-24）**：靜態樣式已統一移至 `css/f2-rote-and-rational-counting.css`；動態 CSS（`CSSGenerator.generateCSS()`）仍保留在 JS（合理，依難度動態生成） |
| 自訂主題無持久化 | 圖片存於 state，頁面刷新後遺失 |
| 困難模式鍵盤 | 無退格鍵，只有「清除」全部重輸 |
| 遺留 CSS 檔案 | `css/f2_rote_and_rational_counting_ipad.css` 未被引用 |

---

## 八、未來開發建議

### 8.1 EventManager / TimerManager 建議

**問題**：F2 有多處 addEventListener 和 setTimeout 未妥善管理。

**建議**：參考 F1 已實現的 TimerManager 和 EventManager，將這兩個工具類別移植到 F2。

```javascript
// TimerManager：統一計時器管理
Game.TimerManager = {
    timers: {},
    setTimeout(callback, delay, category = 'default') { /* ... */ },
    clearByCategory(category) { /* ... */ },
    clearAll() { /* ... */ }
};

// EventManager：統一事件監聽器管理
Game.EventManager = {
    listeners: [],
    on(element, event, handler, options = {}, category = 'default') { /* ... */ },
    removeByCategory(category) { /* ... */ },
    removeAll() { /* ... */ }
};
```

### 8.2 答題選項無限迴圈修復

**問題**：當數字範圍小於選項數量時，while 迴圈會無限執行。

**修復建議**：

```javascript
renderOptions() {
    const { difficulty } = this.state.settings;
    const config = this.ModeConfig[difficulty];
    const rangeConfig = this.getRangeConfig();

    // 🔧 修正：檢查範圍是否足夠產生所需選項數量
    const rangeSize = rangeConfig.maxItems - rangeConfig.minItems + 1;
    const optionsCount = Math.min(config.optionsCount, rangeSize);

    let options = [this.state.correctAnswer];

    let attempts = 0;
    const maxAttempts = optionsCount * 10; // 防護機制

    while (options.length < optionsCount && attempts < maxAttempts) {
        const wrongOption = this.getRandomInt(rangeConfig.minItems, rangeConfig.maxItems);
        if (!options.includes(wrongOption)) options.push(wrongOption);
        attempts++;
    }

    // ...
}
```

### 8.3 closeFeedbackPopup 邏輯修正

**問題**：`closeFeedbackPopup` 未在 Game 物件頂層初始化。

**修復建議**：

```javascript
const Game = {
    closeFeedbackPopup: null,  // 🔧 新增：明確初始化

    // ...其他屬性
};
```

### 8.4 語音超時雙重執行修復

**問題**：語音 onend 和 setTimeout 可能同時觸發 callback。

**修復建議**：

```javascript
speak(templateKey, difficulty, config, vars = {}, callback = null) {
    // ...

    let callbackExecuted = false;  // 🔧 新增：執行標記

    const safeCallback = () => {
        if (callbackExecuted) return;  // 🔧 修正：防止重複執行
        callbackExecuted = true;
        if (callback) callback();
    };

    utterance.onend = () => {
        safeCallback();
    };

    utterance.onerror = () => {
        safeCallback();
    };

    const timeoutId = setTimeout(() => {
        safeCallback();
    }, 5000);

    // 🔧 可選：在 callback 執行後清除 timeout
    // 但需要額外邏輯追蹤
}
```

### 8.5 ModeConfig 繼承機制

**問題**：三個難度的 ModeConfig 有大量重複（如 timing 區塊）。

**建議**：

```javascript
const BaseMode = {
    triggerType: 'manual',
    audioFeedback: true,
    timing: { speechDelay: 300, nextQuestionDelay: 2000, ... }
};

ModeConfig.easy = { ...BaseMode, autoShowTotal: true, requireAnswer: false };
ModeConfig.normal = { ...BaseMode, requireAnswer: true, optionsCount: 3 };
ModeConfig.hard = { ...BaseMode, speechFeedback: false, useNumberInput: true };
```

### 8.6 移除低利用率的拖曳系統

**問題**：F2 的核心互動是「點擊數數」，拖曳功能僅為輔助，但佔約 500 行程式碼。

**建議**：
- 將 `HTML5DragSystem` 和 `CrossPlatformDragManager` 移至共用模組
- F2 主程式不直接包含，改為按需引入
- 可減少約 500 行程式碼

### 8.7 自訂主題持久化

**問題**：自訂圖片存於 state，頁面刷新後遺失。

**建議**：

```javascript
saveCustomItems() {
    localStorage.setItem('f2_customItems', JSON.stringify(this.state.customItems));
}

loadCustomItems() {
    const saved = localStorage.getItem('f2_customItems');
    if (saved) this.state.customItems = JSON.parse(saved);
}
```

---

## 九、作業單系統

### 9.1 配置

```javascript
defaultCount: 10
subtitle: '範圍：{range}'

toolbarConfig: {
    adjustCountButton: 數數範圍 dropdown（1-5, 1-10, 15-20, 20-30, 自訂）
    fontButton: 主題選擇 dropdown（水果/動物/交通工具/混合）
    orientationButton: null（隱藏）
}
```

### 9.2 題型

| 難度 | 題型 | 說明 |
|------|------|------|
| Easy | 圖示數數 | 顯示一組 Emoji 圖示（每 10 個換行），填寫數量 |
| Normal | 順數填空 | 給定數列，填入缺少的數字（順數） |
| Hard | 倒數填空 | 給定數列，填入缺少的數字（倒數） |

### 9.3 主題

| 主題 | 圖示 |
|------|------|
| 水果 | 🍎🍌🍇🍓🍊🥝🍍🍉🍑🍒（10 個） |
| 動物 | 🐶🐱🐭🐰🦊🐻🐼🐨🐯🦁（10 個） |
| 交通工具 | 🚗🚕🚌🚓🚑🚒🚚🚲🚀✈️（10 個） |
| 混合 | 以上全部（30 個） |

### 9.4 已知問題

1. **文件差異**：CLAUDE.md 記載只有 3 種主題，實際有 4 種（含混合）
2. **圖示數量限制**：CLAUDE.md 記載「5~15」，實際由使用者範圍決定

---

## 十、總結

### F2 唱數的優勢

1. **程式碼精簡**：比 F1 減少約 40% 程式碼量，架構更清晰
2. **組態驅動架構**：ModeConfig + StyleConfig 設計良好，未來單元可參考
3. **Debug 系統**：統一管理所有日誌輸出
4. **點擊互動設計**：簡潔有效，符合教學需求
5. **完成畫面統一**：已採用 C/F 系列標準樣式
6. **confetti 版本一致**：使用 v1.9.2 本地化版本

### F2 唱數的待改進處

1. ~~**事件監聽器未清理**（~4 處）~~ → ✅ **已修復**（EventManager 已實現）
2. **語音競態條件**（2 處）→ ⚠️ 待修復（複雜度較高，需謹慎處理）
3. ~~**選項生成無限迴圈風險**（1 處）~~ → ✅ **已修復**（加入上限檢查）
4. **拖曳系統佔比過高**（~500 行）→ ⚠️ 建議按需載入
5. **自訂主題無持久化** → ⚠️ 建議使用 localStorage

### 核心數據對比

| 指標 | F1 一對一對應 | F2 唱數 |
|------|-------------|---------|
| 主程式行數 | ~7,468 行 | ~4,700 行（含管理器） |
| 作業單行數 | 135 行 | 163 行 |
| 難度模式 | 3 種 | 3 種 |
| 主題 | 4 種（水果/動物/交通/自訂） | 4 種（水果/動物/交通/自訂） |
| 語音模板 | 15+ 個/難度 | 8-10 個/難度 |
| 音效 | 7 個 | 5 個 |
| 外部依賴 | 8 個 JS | 8 個 JS |
| 互動方式 | 拖曳 + 點擊 | 點擊為主 |
| 自訂主題 | 支援圖片上傳 | 支援圖片上傳 |
| TimerManager | ✅ 已實現 | ✅ **已實現** (2026-02-11) |
| EventManager | ✅ 已實現 | ✅ **已實現** (2026-02-11) |
| resetGameState | ❌ 無 | ✅ **已實現** (2026-02-16) |

### Bug 統計

| 嚴重度 | 主程式 | 作業單 | 已修復 | 待修復 |
|--------|--------|--------|--------|--------|
| 高 | 3 | 0 | **2** | 1 |
| 中 | 3 | 2（設計差異） | **3** | 2 |
| 低 | 4 | 0 | 0 | 4 |
| **總計** | **10** | **2** | **5** | **7** |

---

## 十一、修復記錄

### 2026-02-11：記憶體洩漏與邏輯錯誤修復

**修改檔案**：`js/f2_rote_and_rational_counting.js`

**新增功能**：

1. **TimerManager**（計時器管理器）
   - 位置：`elements: {}` 之後
   - 功能：統一管理所有 setTimeout，支援分類清理
   - 方法：`setTimeout()`, `clearTimeout()`, `clearAll()`, `clearByCategory()`
   - 類別：`turnTransition`, `feedbackPopup`, `default`

2. **EventManager**（事件監聽器管理器）
   - 位置：`TimerManager` 之後
   - 功能：統一管理所有 addEventListener，支援分類清理
   - 方法：`on()`, `removeAll()`, `removeByCategory()`
   - 類別：`gameUI`, `feedbackPopup`, `answerReveal`, `default`

3. **closeFeedbackPopup 初始化**
   - 位置：`elements: {}` 之後
   - 修改：新增 `closeFeedbackPopup: null` 明確初始化

**修改位置**：

| 函數 | 修改內容 |
|------|---------|
| `init()` | 新增 `TimerManager.clearAll()`, `EventManager.removeAll()`, `closeFeedbackPopup = null` |
| `showSettings()` | 新增清理 gameUI、feedbackPopup、answerReveal 類別 |
| `endGame()` | 新增 `TimerManager.clearByCategory('turnTransition')`, `clearByCategory('feedbackPopup')` |
| `showFeedbackPopup()` | 改用 `EventManager.on()` 管理 popup/backdrop 點擊事件，改用 `TimerManager.setTimeout()` |
| `showAnswerReveal()` | 改用 `EventManager.on()` 管理 popup/backdrop 點擊事件 |
| `renderOptions()` | 新增範圍檢查 `actualOptionsCount = Math.min(config.optionsCount, rangeSize)`，新增嘗試次數上限防止無限迴圈 |
| `updateModeButtonsAvailability()` | 切換到普通/困難模式時，若 testMode 為 null 則自動設為 'retry' |

**預期效果**：

| 指標 | 修復前 | 修復後 |
|------|--------|--------|
| setTimeout 清理率 | 0% | 100%（透過 TimerManager） |
| addEventListener 清理率 | 0% | 100%（透過 EventManager） |
| 選項生成無限迴圈風險 | 有 | 無（有上限保護） |
| testMode 切換問題 | 有 | 無（自動恢復預設值） |
| closeFeedbackPopup 初始化 | undefined | null（明確初始化） |

---

### 待修復項目清單

| # | 優先順序 | 問題 | 建議修復方式 | 狀態 |
|---|---------|------|-------------|------|
| 1 | ~~高~~ | ~~事件監聽器未清理~~ | ~~新增 EventManager~~ | ✅ 已修復 |
| 2 | 高 | 語音競態條件 | 需要更全面的狀態管理重構 | ⚠️ 待修復 |
| 3 | ~~高~~ | ~~closeFeedbackPopup 初始化~~ | ~~在 Game 物件頂層初始化為 null~~ | ✅ 已修復 |
| 4 | ~~中~~ | ~~選項生成無限迴圈~~ | ~~加入上限檢查~~ | ✅ 已修復 |
| 5 | ~~中~~ | ~~testMode 初始化~~ | ~~切換難度時恢復預設值~~ | ✅ 已修復 |
| 6 | ~~中~~ | ~~語音超時雙重執行~~ | ~~加入 callbackExecuted 標記~~ | ✅ 原本已有防護 |
| 7 | 低 | 拖曳系統佔比高 | 未來重構時考慮模組化 | ⚠️ 待修復 |
| 8 | 低 | 自訂主題無持久化 | 加入 localStorage | ⚠️ 待修復 |

---

### 2026-02-16：程式碼複檢

**檢查結果**：✅ 主要功能正常，有小改善空間

**驗證項目**：
1. ✅ TimerManager 正確實現並被調用（init、showSettings、endGame、showFeedbackPopup）
2. ✅ EventManager 正確實現並被調用（feedbackPopup、answerReveal 事件）
3. ✅ closeFeedbackPopup 已初始化為 null
4. ✅ endGame() 完成畫面樣式符合 C/F 系列標準
5. ✅ confetti 動畫正確觸發（triggerConfetti + startFireworksAnimation）
6. ✅ 獎勵系統按鈕正確綁定
7. ✅ injectGlobalAnimationStyles() 已實現（13 個 @keyframes 全部統一管理）

---

### 2026-02-16：狀態管理重構（resetGameState）

**問題描述**：
- 狀態重置邏輯**分散在多處**（showSettings、start、startNewTurn、generateOptions、checkAnswer）
- 每次出現 bug 就在某處補一個重置，難以追蹤
- 容易遺漏，造成狀態殘留（如 `isEndingGame` 未重置導致「再玩一次」後遊戲無法結束）

**布林旗標清單**：

| 旗標 | 目的 |
|------|------|
| `isAnswering` | 防止答題中重複點擊 |
| `isEndingGame` | 防止 endGame() 重複調用 |
| `isStartingNewTurn` | 防止 startNewTurn() 重複調用 |

**修改內容**：

1. **新增 `resetGameState()` 函數**（第 2395-2411 行）
   - 統一重置所有遊戲進度：`score`, `currentTurn`, `lastAnswer`, `userCountProgress`
   - 統一重置所有控制旗標：`isAnswering`, `isEndingGame`, `isStartingNewTurn`
   - 重置時間：`startTime`
   - 輸出日誌：`🔄 [F2] 遊戲狀態已重置`

2. **修改 `showSettings()`**（第 2088 行）
   - 將原本的 `this.state.isEndingGame = false;` 替換為 `this.resetGameState()`

3. **修改 `start()`**（第 2423 行）
   - 將分散的 6 個狀態重置替換為 `this.resetGameState()` + `this.state.startTime = Date.now()`

**設計原則**：

| 重置類型 | 處理方式 | 位置 |
|----------|---------|------|
| 遊戲級別 | `resetGameState()` | showSettings()、start() |
| 回合級別 | 局部重置 | startNewTurn()（`isAnswering`, `userCountProgress`） |

**驗證方式**：
1. 開啟 F2 唱數單元
2. 選擇「困難模式」+「單次作答」+ 1 題
3. 故意答錯，確認測驗正常結束
4. 點擊「再玩一次」，重複測試至少 5 次
5. 確認每次都能正常結束
6. Console 確認看到 `🔄 [F2] 遊戲狀態已重置` 日誌

**搜尋關鍵字**：`resetGameState`

---

**待改善項目（更新）**：
- 語音競態條件（2 處）→ 較複雜，需謹慎重構
- 自訂主題無持久化 → 建議使用 localStorage

---

### 2026-02-21：Debug Logger 重構為 FLAGS 分類開關系統

**修改檔案**：`js/f2_rote_and_rational_counting.js`

**修改內容**：
將舊版 `Debug` 系統（單一 `enabled` 開關 + 各種 `logXXX` 方法）重構為 FLAGS 分類開關系統。

**統計**：
- **轉換前**：46 個 console 調用
- **轉換後**：208 個 Game.Debug 調用（208 Game.Debug.* + 0 this.Debug.*）
- **保留未轉換**：3 個（Debug 系統內部實現）

**FLAGS 分類（14 個）**：

```javascript
Debug: {
    FLAGS: {
        all: false,        // 全域開關（開啟後顯示所有分類）
        init: false,       // 初始化相關
        speech: false,     // 語音系統
        audio: false,      // 音效系統
        ui: false,         // UI 渲染
        drag: false,       // 拖曳操作
        touch: false,      // 觸控事件
        question: false,   // 題目生成
        state: false,      // 狀態變更
        animation: false,  // 動畫效果
        upload: false,     // 圖片上傳
        game: false,       // 遊戲流程
        user: false,       // 使用者行為
        error: true        // 錯誤訊息（預設開啟）
    }
}
```

**使用方式**：

```javascript
// 在瀏覽器 Console 中開啟特定分類
Game.Debug.FLAGS.all = true;       // 開啟全部
Game.Debug.FLAGS.drag = true;      // 只開啟拖曳相關
Game.Debug.FLAGS.ui = true;        // 只開啟 UI 相關
Game.Debug.FLAGS.animation = true; // 只開啟動畫相關
```

**向後相容包裝方法**：

保留舊版 API 方法（如 `logGameFlow`, `logAudio`, `logSpeech` 等），內部轉接至新的 `log(category, ...)` 方法。

**保留未轉換的調用（3 個）**：

- 行 94: `console.log(\`[F2-${category}]\`, ...args)` - Game.Debug.log 內部實現
- 行 100: `console.warn(\`[F2-${category}]\`, ...args)` - Game.Debug.warn 內部實現
- 行 107: `console.error('[F2-ERROR]', ...args)` - Game.Debug.error 內部實現

**搜尋關鍵字**：
- `Game.Debug.FLAGS`
- `Game.Debug.log`
- `Game.Debug.warn`
- `Game.Debug.error`

---

---

### 2026-02-23：嵌套物件修復（this.Debug → Game.Debug）

**修改檔案**：`js/f2_rote_and_rational_counting.js`

**問題描述**：
`injectGlobalAnimationStyles()` 已確認實現且完整（13 個 @keyframes 全部統一在函數內），無需追加動畫。
但發現 11 處 `this.Debug.*` 引用，位於以事件回呼方式呼叫的方法中，`this` 綁定可能不指向 `Game`，導致潛在 `undefined` 錯誤。

**修改內容**：
使用 `replace_all` 將全部 11 個 `this.Debug.` 替換為 `Game.Debug.`

**影響位置**：

| 函數 | 修復前 | 修復後 |
|------|--------|--------|
| `handleSelection()` | `this.Debug.log(...)` | `Game.Debug.log(...)` |
| `triggerImageUpload()` | `this.Debug.log(...)` | `Game.Debug.log(...)` |
| `handleImageUpload()` | `this.Debug.log(...)` × 3 | `Game.Debug.log(...)` × 3 |
| `showImagePreview()` | `this.Debug.log(...)` | `Game.Debug.log(...)` |
| `closeImagePreview()` | `this.Debug.log(...)` | `Game.Debug.log(...)` |
| `confirmAddCustomItem()` | `this.Debug.log(...)` × 2 | `Game.Debug.log(...)` × 2 |
| `removeCustomItem()` | `this.Debug.log(...)` × 2 | `Game.Debug.log(...)` × 2 |

**統計更新**：
- 修復前：197 Game.Debug.* + 11 this.Debug.*（共 208 個調用）
- 修復後：208 Game.Debug.* + 0 this.Debug.*（共 208 個調用）

**驗證結果**：
- ✅ `grep "this\.Debug\."` → 0 個結果
- ✅ `injectGlobalAnimationStyles()` 確認包含全部 13 個 @keyframes（`fadeIn`, `celebrate`, `bounce`, `glow`, `hintPulse`, `revealBounceIn`, `numberGlow`, `revealBounceOut`, `pulseGlow`, `bounceIn`, `popIn`, `sparkle`, `pulse`）
- ✅ 無散落的 @keyframes 在函數外部

**搜尋關鍵字**：`Game.Debug.log`, `injectGlobalAnimationStyles`

---

### 2026-02-24（第二輪）：新發現 Bug 修復（Bug #15、#16）

**問題 1（Bug #15）— showSettings()/showHintBox()/showInputPromptBox() EventManager 繞過（高）**：

- `showSettings()` 的 4 個 addEventListener（`.game-settings`、`#start-game-btn`、獎勵連結、作業單連結）未透過 EventManager 追蹤
- `endGame()` 的結束畫面獎勵連結 addEventListener 未透過 EventManager 追蹤
- `showInputPromptBox()` promptBox click 未透過 EventManager 追蹤
- `showHintBox()` hintBox click 未透過 EventManager 追蹤
- **修復**：全部改為 `Game.EventManager.on(..., 'gameUI')`

**問題 2（Bug #16）— resetGameState() 缺少 totalTurns 初始化（中）**：

- `resetGameState()` 未重置 `this.state.totalTurns`
- 重新開始遊戲後，`totalTurns` 可能保留舊值或為 undefined
- **修復**：在 `resetGameState()` 加入 `this.state.totalTurns = this.state.settings.questionCount || 10`

---

### 2026-02-24：作業單連結統一簡化（僅傳 unit 參數）

**修改內容**：

- 作業單連結原本傳遞遊戲設定參數（`difficulty`, `range`）
- 各作業單已有完整工具列，用戶開啟後可直接在工具列調整；遊戲設定與作業單設定應獨立運作
- **修復**：移除所有多餘參數，統一改為只傳 `unit` 參數，讓作業單完全使用自己的預設値

**修改檔案**：`js/f2_rote_and_rational_counting.js`

---

---

### 2026-02-24：主題「預設」選項新增

**修改檔案**：`js/f2_rote_and_rational_counting.js`

**問題描述**：
- 設定頁「遊戲主題」只有固定主題（水果/動物/交通工具/自訂），缺少隨機選擇選項
- 初始主題值為 `null`，需要使用者每次手動選擇

**修改內容**：

1. **新增「預設 🎲」主題按鈕**
   - 位置：設定頁主題選擇按鈕群組，排在第一個
   - 功能：隨機從全部內建主題（水果/動物/交通工具）混合選取圖示
   - 初始選取狀態：預設選中「預設 🎲」

2. **初始設定值修改**
   - `this.state.settings.theme` 預設值：`null` → `'default'`

3. **主題生成邏輯**
   - 進入 `default` 模式時，合併所有非自訂主題的 emoji 組成完整池

**搜尋關鍵字**：`theme: 'default'`, `'預設 🎲'`

---

### 2026-02-24：CSS 分離（Phase 1~4）

**修改檔案**：
- `html/f2_rote_and_rational_counting.html`（移除 93 行 inline `<style>`，新增 `<link>`）
- `css/f2-rote-and-rational-counting.css`（新建，~170 行）
- `js/f2_rote_and_rational_counting.js`（移除 6 個函數模板 `<style>` 區塊）

**Phase 1 — HTML inline 樣式外部化**：
- HTML 原有 93 行 `<style>` 區塊（拖曳、觸控反饋、深色模式樣式）
- 移至 `css/f2-rote-and-rational-counting.css`
- HTML 新增 `<link rel="stylesheet" href="../css/f2-rote-and-rational-counting.css">`

**Phase 2 — settingsScreen() 模板 `<style>` 外部化**：
- 移除 `settingsScreen()` 中的 `.image-preview-modal` Modal 樣式（~60 行）
- 移至 CSS 檔案

**Phase 3 — 小型模板 `<style>` 外部化**：
- 移除 4 個函數模板 `<style>`：`hintBox()`、`inputPromptBox()`、`hintBoxContainer()`、`feedbackPopup()`
- 合計 ~46 行，移至 CSS 檔案

**Phase 4 — endGame() 完成畫面 `<style>` 外部化**：
- 移除 `endGame()` 中 ~230 行結果畫面 `<style>` 區塊
- 移至 CSS 檔案

**保留**：
- `CSSGenerator.generateCSS(difficulty)` 中的 `<style>` 注入（動態 CSS，依難度生成，合理保留在 JS）

**驗證**：
- `grep '<style>'` → 1 個結果（`CSSGenerator` 內部，合理保留）

**搜尋關鍵字**：`f2-rote-and-rational-counting.css`, `CSSGenerator`

---

---

### 2026-02-25：拖曳去背修復（setDragImage）+ 多指觸控誤觸修復

**問題 1 — 桌面端拖曳預覽含背景色**

拖曳圖示時，瀏覽器預設以完整元素截圖作為拖曳預覽（含背景色、邊框），視覺上不夠清晰。

**修復**：在 `handleDragStart()` 中加入 `setDragImage` ghost：
- 建立透明背景的 ghost `<span>` 元素，只顯示 emoji 文字
- `ghost.style.fontSize` 改用 `getComputedStyle(element).fontSize` 取得實際渲染尺寸
- 追加至 `document.body` → 設為拖曳預覽圖 → `setTimeout` 延遲移除

**問題 2 — 多指觸控時拖曳失敗**

觸控拖曳時若使用者意外放置第二根手指，第二根手指的 `touchend` 被 `handleTouchEnd` 處理，`findDropZoneAt` 返回 null → `cleanupDrag()` 重置拖曳狀態，實際拖曳手指抬起時 `isDragging = false`，物件未能放入放置框。

**修復（`js/touch-drag-utility.js`，跨單元共用）**：
- `handleTouchStart`：`touchState` 新增 `touchIdentifier: touch.identifier`
- `handleTouchMove`：優先以 `touchIdentifier` 找到對應手指，fallback 到 `touches[0]`
- `handleTouchEnd`：先以 `touchIdentifier` 過濾；非拖曳手指的 touchend 記錄 `⚠️` 後 `return`，不重置拖曳狀態
- `cleanupDrag`：`touchState` 重置時加入 `touchIdentifier: undefined`

**修改檔案**：
- `js/f2_rote_and_rational_counting.js`（`handleDragStart` 加入 setDragImage ghost）
- `js/touch-drag-utility.js`（touchIdentifier 過濾，跨單元共用）

---

### 2026-02-26：`setDragImage` 觸控防護

**問題描述**：

`TouchDragUtility` 以 `TouchEvent` 觸發 `onDragStart` 回呼，`TouchEvent` 無 `dataTransfer` 屬性。F2 的 dragstart handler 直接呼叫 `event.dataTransfer.setDragImage()`，在觸控裝置上會拋出 TypeError。

**修改內容**：

- `js/f2_rote_and_rational_counting.js`：`handleDragStart` 中 `setDragImage` 呼叫包覆 `if (event.dataTransfer && typeof event.dataTransfer.setDragImage === 'function')` 防護（1 處，使用 `event` 變數名）

**修改檔案**：`js/f2_rote_and_rational_counting.js`

---

### 2026-02-26（補充）：`showNumberInput` 錯誤提示 raw setTimeout 補齊

**問題描述**：

同 F1。`showNumberInput()` 數字鍵盤中「最小值必須大於0」與「最大值不能超過30」的 2000ms 錯誤提示清空使用 raw `setTimeout`，未透過 `TimerManager` 管理。

**修改內容**：

- 兩處 `setTimeout(() => { feedbackDiv.textContent = ''; }, 2000)` 改為 `Game.TimerManager.setTimeout(() => { feedbackDiv.textContent = ''; }, 2000, 'ui')`（共 2 處，以 `replace_all` 批次替換）

**修改檔案**：`js/f2_rote_and_rational_counting.js`

---

*報告更新時間：2026-02-26*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

## 2026-02-27：Raw setTimeout + setInterval 修復（第三輪）

### Raw setTimeout / setInterval 修復（共 11 處 + 1 處 setInterval）

| # | 位置 | 原始 | 修復後 |
|---|------|------|--------|
| 1 | `Audio` 回呼延遲 | `setTimeout(callback, delay)` | `Game.TimerManager.setTimeout(callback, delay, 'audio')` |
| 2 | `speech.init()` 語音初始化重試 500ms | `setTimeout(setVoice, 500)` | `Game.TimerManager.setTimeout(setVoice, 500, 'speech')` |
| 3 | `speech.init()` 延遲初始化 1000ms | `setTimeout(..., 1000)` | `Game.TimerManager.setTimeout(..., 1000, 'speech')` |
| 4 | `speak()` 音訊未解鎖路徑 100ms | `setTimeout(callback, 100)` | `Game.TimerManager.setTimeout(callback, 100, 'ui')` |
| 5 | `speak()` shouldSpeak=false 路徑 100ms | `setTimeout(callback, 100)` | `Game.TimerManager.setTimeout(callback, 100, 'ui')` |
| 6 | `speak()` 無模板路徑 100ms | `setTimeout(callback, 100)` | `Game.TimerManager.setTimeout(callback, 100, 'ui')` |
| 7 | `speak()` 語音逾時 5000ms | `setTimeout(..., 5000)` | `Game.TimerManager.setTimeout(..., 5000, 'speech')` |
| 8 | 提示框對齊（2 處）50ms | `setTimeout(() => alignHintBox(), 50)` | `Game.TimerManager.setTimeout(..., 50, 'ui')` |
| 9 | 拖曳 ghost 清除 0ms | `setTimeout(() => _ghost.remove(), 0)` | `Game.TimerManager.setTimeout(..., 0, 'dragSystem')` |
| 10 | 完成畫面煙火 `setInterval` | `setInterval(...)` | 遞迴 `Game.TimerManager.setTimeout(fireConfetti, 250, 'confetti')` |

### setInterval → 遞迴 TimerManager 模式

```javascript
// 修復前（無法 clearAll）
const iv = setInterval(() => { ... }, 250);

// 修復後
const fireConfetti = () => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) return;
    const particleCount = 50 * (timeLeft / duration);
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.2, 0.8), y: Math.random() - 0.2 } });
    Game.TimerManager.setTimeout(fireConfetti, 250, 'confetti');
};
fireConfetti();
```

**效果**：`TimerManager.clearAll()` 或 `clearByCategory('confetti')` 可立即中止煙火動畫。

**修改檔案**：`js/f2_rote_and_rational_counting.js`

---

*報告更新時間：2026-02-27*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

## 2026-02-27（第四輪）：speak() safeCallback scope 修復

**問題**：`Speech.speak()` 函數中，`callbackExecuted` 和 `safeCallback` 宣告在 `if (callback) { }` 內部（`let`/`const` block scope）。catch 區塊位於 `if` 外，無法存取 `safeCallback`，因此 catch 使用 `if (callback) callback()` 直接呼叫。若 catch 觸發時 5 秒 TimerManager 備援計時器已啟動，catch 先執行 callback()，5 秒後備援計時器再執行 safeCallback()（此時 `callbackExecuted` 仍為 `false`），造成雙重呼叫。

**修復**：將 `callbackExecuted` 和 `safeCallback` 移至 `if (callback) { }` 外部，讓 catch 也可存取：
- `safeCallback` 改為 `if (!callbackExecuted && callback)` 判斷（兼容 callback 為 null 的情況）
- catch 區塊改為 `safeCallback()`

**修改檔案**：`js/f2_rote_and_rational_counting.js`

---

*報告更新時間：2026-02-27*
*報告產生者：Claude Code (claude-sonnet-4-6)*

### 2026-02-28
- `endGame()` 中 `elapsedMs = endTime - this.state.startTime` 改為 `this.state.startTime ? (endTime - this.state.startTime) : 0`，防止 startTime 未設定時顯示 NaN 時間

---

## 廢棄程式碼稽核（2026-03-01）

**稽核範圍**：`js/f2_rote_and_rational_counting.js`（4,426 行）

### 結論：無需處理

| 類型 | 位置 | 內容 | 評估 |
|------|------|------|------|
| 向後相容 shim | Lines 112–126 | `logError()` 映射至新 Debug 系統 | 刻意保留的相容層，非廢棄 |
| 清理操作注解 | Line 2404 | `// 清理舊的拖曳註冊（如果有的話）` | 操作性注解，無廢棄程式碼 |
| 清理操作注解 | Line 3602 | `// 移除舊的反饋視窗` | 操作性注解 |
| console.log | Lines 94, 100, 107 | Debug 系統內部呼叫 | 已受 FLAGS 守衛，無需處理 |
| **`alert()` 呼叫（自訂圖片上傳驗證）** | Lines 3700, 3731, 3744, 3783, 3789, 3796 | 共 6 處，用於自訂 emoji/圖片上傳驗證（格式/大小限制、名稱輸入）；同步阻塞彈窗 | 低 | 功能正常；若需提升 UX 可改為非阻塞式提示 |

**整體評估**：程式碼品質良好。`alert()` 僅用於設定驗證，不影響遊戲流程。

---

## 跨輪計時器洩漏稽核（2026-03-03）

**稽核背景**：A3 單元曾發現 `speakText()` 10 秒備援計時器在下一輪觸發導致跳輪的 Bug，已對全系列交叉稽核。

**F2 稽核結論：安全（無此問題）**

三層保護均完備：

| 條件 | 狀態 | 說明 |
|------|------|------|
| ① 新輪次從語音 callback 觸發 | **不成立 ✅** | `endGame()` / `completeGame()` / `startNewTurn()` 不從語音 callback 鏈內部呼叫 |
| ② interrupted 不呼叫 safeCallback | **不成立 ✅** | `onerror` 對所有錯誤**無條件**呼叫 `safeCallback()` 或 `resolve()`（F5/F6 Promise 架構），備援計時器為 no-op |
| ③ 新輪次函數無 clearAll() | **不成立 ✅** | `init()` / `showSettings()` 有 `TimerManager.clearAll()` |

**結論**：三個條件均不成立，從架構、語音錯誤處理、計時器清理三個層面同時保護，bug 不可能發生。

---

## 語音選擇優先順序統一（2026-03-04）

全專案 18 個單元統一語音選擇策略，舊版以 `Microsoft HsiaoChen Online` 為第一優先，已更新為：

```javascript
this.voice =
    voices.find(v => v.name === 'Google 國語 (臺灣)') ||        // 有連網優先 1
    voices.find(v => v.name === 'Microsoft HsiaoChen Online') || // 有連網優先 2
    voices.find(v => v.name === 'Microsoft HsiaoChen') ||        // 無連網 Win11
    voices.find(v => v.name === 'Microsoft Hanhan') ||           // 無連網 Win10
    voices.find(v => v.lang === 'zh-TW') ||                      // 任何 zh-TW
    voices.find(v => v.lang.startsWith('zh')) ||                 // 任何 zh
    voices[0];
```

**變更重點**：
- `Google 國語 (臺灣)` 升為第一優先（連網時音質最佳）
- 新增 `Microsoft HsiaoChen`（Win11 離線版，無 Online 後綴）
- 新增 `Microsoft Hanhan`（Win10 離線備用，舊版誤用 `!v.name.includes('Hanhan')` 排除）
- 移除 `const preferredVoices` 陣列、`!Hanhan` filter 邏輯、多步 if 塊，以單一鏈式表達式取代

---

## 語音選擇優先順序調整（雅婷優先）（2026-03-04）

### 新優先順序

```javascript
this.voice =
    voices.find(v => v.name.startsWith('Microsoft Yating')) ||   // 微軟雅婷 優先 1
    voices.find(v => v.name.startsWith('Microsoft Hanhan')) ||   // 微軟涵涵 優先 2
    voices.find(v => v.name === 'Google 國語（臺灣）') ||          // Google 線上 優先 3
    voices.find(v => v.lang === 'zh-TW') ||                      // 任何 zh-TW
    voices.find(v => v.lang.startsWith('zh')) ||                 // 任何 zh
    voices[0];
```

### 同步修正兩個舊 Bug

**Bug 1：Google 語音名稱括號錯誤**
- 舊：`'Google 國語 (臺灣)'`（ASCII 半形括號）
- 新：`'Google 國語（臺灣）'`（全形括號）
- 影響：`find()` 永遠找不到 Google 語音，直接跳過

**Bug 2：Microsoft 語音使用 `===` 精確比對失敗**
- Chrome 實際語音名稱：`'Microsoft Hanhan - Chinese (Traditional, Taiwan)'`（帶語言後綴）
- 舊 `===` 無法匹配，實際由第 5 順位 `zh-TW` 通用 fallback 選到
- 改為 `startsWith('Microsoft Yating')` / `startsWith('Microsoft Hanhan')` 後正確匹配

---

## 跨單元修復（2026-03-05）— 設定頁連結按鈕文字粗黑修復

（詳細說明見 `report/A1_Unit_Completion_Report.md` 跨單元修復章節）

**問題**：`css/ai-theme.css` 全域 `a {}` 規則的 `transition: color` 使 `a.selection-btn { color: #000 !important }` 在 CSS 過渡期間失效，設定頁「開啟獎勵系統」連結按鈕文字呈現藍色而非粗黑。

**修復**：`css/ai-theme.css` 的 `a {}` 和 `a:hover {}` 改為 `a:not(.selection-btn):not(.choice-btn) {}`。

**關鍵搜尋詞**：`a:not(.selection-btn):not(.choice-btn)` in `css/ai-theme.css`

---

## 困難模式提示框新增吉祥物（2026-03-10）

**問題**：困難模式的「需要提示 / 點我看答案」卡片（`#hint-box`）放置於 `#hint-area`（`position:absolute; right:20px`）中，`hintBoxContainer()` 只渲染 `.standalone-hint-container` 包住 `hintBox()`，沒有吉祥物圖示，與其他單元風格不一致。

**修復**（`js/f2_rote_and_rational_counting.js`，`hintBoxContainer()`）：
`.standalone-hint-container` 加入 `style="display:flex;flex-direction:row;align-items:center;gap:6px;"`，並在 `hintBox()` 前插入吉祥物 `<img>`（`height:48px`，`pointer-events:none` 使提示框仍可點擊）：

```javascript
hintBoxContainer() {
    return `
        <div class="standalone-hint-container" style="display:flex;flex-direction:row;align-items:center;gap:6px;">
            <img src="../images/index/educated_money_bag_character.png" style="height:48px;...pointer-events:none;">
            ${this.hintBox()}
        </div>
    `;
},
```

**關鍵搜尋詞**：`hintBoxContainer`（`js/f2_rote_and_rational_counting.js`）
