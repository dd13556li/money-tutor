# C3 換錢 — 單元開發經驗報告書

> **日期**：2026-02-09
> **更新日期**：2026-03-26（「大換小」字色修正、金額間距修復、兌換主類別全隨機）
> **時間**：下午
> **單元名稱**：C3 換錢（Money Exchange）
> **系列**：C 貨幣認知

---

## 一、基本資訊

### 檔案清單

| 類型 | 檔案路徑 | 說明 |
|------|---------|------|
| HTML | `html/c3_money_exchange.html` | 主頁面（1,141 行，含大量內嵌 CSS、暗色模式樣式約 400 行） |
| JS | `js/c3_money_exchange.js` | 主邏輯（10,045 行，為 C 系列中最大的單元 JS） |
| CSS | `css/unit6.css`、`css/ai-theme.css`、`css/dark-theme.css`、`css/common-modal-responsive.css` | 共用樣式 |
| 作業單 | `worksheet/units/c3-worksheet.js` | 作業單產生器（211 行） |
| 共用工具 | `js/number-speech-utils.js`、`js/audio-unlocker.js`、`js/reward-launcher.js`、`js/theme-system.js`、`js/mobile-debug-panel.js` | 各項支援模組 |
| 特殊依賴 | `js/touch-drag-utility.js?v=2.1` | 觸控拖曳工具（C3 獨有依賴，其他 C 系列不使用） |
| 特殊依賴 | `js/emoji-library.js` | Emoji 素材庫（C3 困難模式 emoji 提示用，其他 C 系列不使用） |
| 圖片 | `images/money/*_yuan_front.png`、`*_yuan_back.png` | 7 種面額正反面共 14 張 |
| 音效 | `audio/correct02.mp3`、`audio/error.mp3`、`audio/coin01.mp3`、`audio/click.mp3` | 正確/錯誤/投幣/點擊音效（注意：使用 `correct02.mp3` 而非 `correct.mp3`） |

### 外部依賴

- **canvas-confetti** (v1.9.2) — 已改為本地 `js/confetti.browser.min.js`，離線環境可正常使用

### 與 C1/C2 的依賴差異

C3 比 C1/C2 多引入兩個額外模組：
1. **touch-drag-utility.js**：因為 C3 核心玩法是拖曳金錢到兌換區，需要專門的觸控拖曳支援
2. **emoji-library.js**：因為困難模式使用 emoji 替代數字顯示（EmojiLibrary.money.denominations），增加難度

---

## 二、單元特色

### 2.1 七種面額貨幣系統

C3 涵蓋台灣 7 種常用貨幣面額（不含 200 元與 2000 元紙鈔）：

| 類型 | 面額 |
|------|------|
| 硬幣（4 種） | 1 元、5 元、10 元、50 元 |
| 紙鈔（3 種） | 100 元、500 元、1000 元 |

`gameData.allItems` 定義每種面額的 `value`、`name`、`images`（正反面路徑）、`type`（coin/bill）。`getRandomImage()` 以 50% 機率選擇正面或背面。

### 2.2 拖曳兌換機制（核心玩法）

C3 與 C1/C2 最大差異在於：C3 採用「拖曳金錢到兌換區」的互動方式。學生需將指定數量的金錢拖曳到兌換區域，完成貨幣面額兌換。

**基本互動流程**：
1. 系統在「我的金錢區」生成多個同面額金錢圖示
2. 學生將金錢逐一拖曳到「兌換區」
3. 兌換區右方顯示淡化的目標面額金錢（兌換完成後亮起）
4. 每輪兌換完成後，兌換結果累積顯示在「兌換結果區」
5. 所有輪次完成後進入下一題

### 2.3 三大兌換類別

設定頁面提供三種兌換主類別（`gameData.categories`）：

| 類別 | 說明 | 兌換對數 |
|------|------|---------|
| 硬幣 ↔ 硬幣 | 1↔5、1↔10、1↔50、5↔10、5↔50、10↔50 | 10 對（含小換大、大換小） |
| 紙鈔 ↔ 紙鈔 | 100↔500、100↔1000、500↔1000 | 6 對 |
| 硬幣 ↔ 紙鈔 | 10↔100、50↔100、50↔500 | 6 對 |

每個兌換對支援雙向：
- **小換大（small-to-big）**：如 5 個 1 元 → 1 個 5 元
- **大換小（big-to-small）**：如 1 個 5 元 → 5 個 1 元

### 2.4 三種難度模式

| 特性 | 簡單 | 普通 | 困難 |
|------|------|------|------|
| 觸發方式 | 自動觸發（auto） | 手動觸發（manual） | 手動觸發（manual） |
| 放置區類型 | 一格一幣（固定格子） | 彈性多幣（flexible-zone） | 彈性多幣（flexible-zone） |
| 視覺提示 | 有（淡化佔位符） | 有（數字顯示） | emoji 提示（需點擊揭示） |
| 語音回饋 | 有（累計金額語音） | 有（累計金額語音） | 有（與普通模式一致） |
| 音效回饋 | 有 | 有 | 有 |
| 完成按鈕 | 無（自動偵測填滿） | 有（完成兌換） | 有（完成兌換） |
| 兌換數量 | min:1, max:3 輪 | min:2, max:5 輪 | min:2, max:5 輪 |
| 點擊放置 | 有（雙擊放置） | 關閉 | 關閉 |
| 金錢數量限制 | 30 個 | 30 個 | 30 個 |
| 測驗模式 | 不適用（自動完成） | retry / proceed | retry / proceed |

**簡單模式特殊機制**：
- 使用「一格一幣」放置邏輯（`processDropToExchangeArea`）：每個目標格只能放一個金錢
- 放置後自動鎖定（`draggable = false`、`cursor = not-allowed`）
- 所有格子填滿後自動觸發完成驗證

**困難模式特殊機制**：
- 使用 `EmojiLibrary` 的面額 emoji 替代數字顯示
- emoji 提示框支援點擊揭示（`clickToReveal: true`，`autoHideDelay: 3000`）
- 目標金錢數量可變（`variableTargets: true`，範圍 1-3 個）

### 2.5 多輪兌換機制

每道題目包含多輪兌換，而非一次完成：
- **簡單模式**：每輪固定 1 個目標金錢，總共 2-5 輪
- **普通模式**：智能分配目標（如 3+2=5 個目標分 2 輪完成），至少 2 輪
- **困難模式**：可變目標數量（每輪 1-3 個），總共 2-5 輪

輪次間有轉場動畫：退出動畫（400ms 向下移動 + 淡出）→ DOM 更新 → 進入動畫（500ms 向上移動 + 淡入）。

### 2.6 設定選項

| 設定 | 選項 |
|------|------|
| 難度 | 簡單 / 普通 / 困難 |
| 兌換主類別 | 硬幣↔硬幣 / 紙鈔↔紙鈔 / 硬幣↔紙鈔 |
| 兌換組合 | 依所選類別動態生成（分「小面額換大面額」與「大面額換小面額」兩組） |
| 題數 | 1 / 3 / 5 / 10 / 自訂（1-100） |
| 測驗模式 | 反複作答 / 單次作答（簡單模式禁用） |
| 獎勵系統 | 開啟獎勵系統 |
| 作業單 | 產生作業單 |

### 2.7 雙向拖曳支援

普通/困難模式支援金錢雙向拖曳：
- **正向**：從「我的金錢區」拖曳到「兌換區」→ `processDropToFlexibleZone()`
- **反向**：從「兌換區」拖曳回「我的金錢區」→ `processReturnToMoneyArea()`

反向拖曳時會恢復提示文字、更新累計金額語音。

### 2.8 防重複題目機制

`generateQuestions()` 中使用 `lastExchangeKey`（格式 `{from}-{to}-{sourceItemsCount}`）比較相鄰題目，最多重試 20 次避免相鄰題目的金錢組合完全相同。

---

## 三、技術重點

### 3.1 核心架構（策略模式 + 狀態管理）

C3 是所有單元中架構最複雜的，採用多層策略模式：

```
MoneyExchange3 (全域 Game 物件)
├── Core
│   ├── StateManager    — 模式隔離狀態管理（Proxy 雙向同步）
│   └── EventSystem     — 發布/訂閱事件系統
├── ModeConfig          — 三種難度的完整配置物件
├── ModeStrategies      — 統一渲染/交互/完成處理策略
├── Strategies
│   ├── ValidationStrategy    — 驗證邏輯（含 ExchangeTypeStrategies）
│   ├── CompletionStrategy    — 成功/失敗處理
│   ├── DOMRenderer           — 統一 DOM 渲染器
│   └── RenderStrategy        — 模式隔離事件綁定
├── Utils
│   ├── DOMUtils             — DOM 操作工具
│   ├── Animation            — 轉場動畫工具
│   ├── ValidationUtils      — 狀態一致性驗證
│   └── Logger               — 分級日誌系統
├── Audio                    — 配置驅動音效系統
├── Speech                   — 高品質語音系統
├── Debug                    — 行動裝置除錯模組
└── state / speech / audio   — 舊版結構（向後兼容）
```

### 3.2 Core.StateManager — 模式隔離狀態

StateManager 採用模式隔離設計，每個難度模式有獨立的狀態空間：

```javascript
_state: {
    global: {},   // 全域共用狀態
    easy: {},     // 簡單模式專用
    normal: {},   // 普通模式專用
    hard: {}      // 困難模式專用
}
```

**關鍵特性**：
- `getState(path, mode)` / `setState(path, value, mode)`：根據當前模式自動路由到對應狀態空間
- `getCurrentMode()`：返回當前活動的難度模式
- `migrateLegacyState(oldState)`：將舊 `this.state` 遷移到新系統

**Proxy 雙向同步**：
- 新 StateManager → 舊 `this.state`：透過 `EventSystem.on('stateChange')` 監聽
- 舊 `this.state` → 新 StateManager：透過 `setupLegacyStateProxy()` 為 `state` 屬性建立 Proxy/defineProperty，修改自動同步

### 3.3 Core.EventSystem — 發布/訂閱

使用 `Map` 儲存事件監聽器：
- `on(eventName, callback)`：註冊監聽
- `emit(eventName, data)`：觸發事件
- `off(eventName, callback)`：取消監聯

用於 StateManager 狀態變更通知，取代直接耦合。

### 3.4 ModeConfig — 配置驅動架構

每個難度模式擁有完整的配置物件（約 200 行/模式），包含：

| 配置項 | 說明 |
|--------|------|
| `triggerType` | 觸發方式：`auto`（簡單）或 `manual`（普通/困難） |
| `clickToMoveConfig` | 點擊放置配置（enabled、allowClickToPlace、allowClickToReturn 等） |
| `exchanges` | 兌換數量範圍 `{min, max}` |
| `ui` | UI 配置（targetMoneyFaded、showCompleteButton） |
| `validation` | 驗證配置（method、validator） |
| `success` | 成功處理配置（handler、autoAdvanceDelay） |
| `specialRules` | 特殊規則（smallToBig/bigToSmall 的金錢數量限制） |
| `speechTemplates` | 語音模板（dropComplete、exchangeComplete、allRoundsComplete、error） |
| `uiElements` | UI 元素配置（buttonText、cssClasses、animations） |
| `timing` | 時間配置（speechDelay、nextQuestionDelay 等） |
| `animations` | 轉場動畫配置（exitAnimation、enterAnimation） |
| `speechSettings` | 語音參數（rate、pitch、volume，依兌換類型可調） |
| `emojiMapping` | emoji 對應表（困難模式，使用 getter 動態讀取 EmojiLibrary） |
| `emojiHintConfig` | emoji 提示框配置（困難模式） |

### 3.5 ModeStrategies — 統一策略層

ModeStrategies 是所有模式互動邏輯的統一入口：

| 方法 | 說明 |
|------|------|
| `render(mode, question, ...)` | 統一渲染入口 |
| `handleInteraction(mode, action, data)` | 統一交互路由（dragStart/dragEnd/dragOver/drop/complete） |
| `handleDrop(mode, data, config)` | 統一拖放處理（根據模式分派到 processDropToExchangeArea 或 processDropToFlexibleZone） |
| `handleCompletion(mode, data, config)` | 統一完成處理（驗證 → 成功/失敗） |
| `processSuccess(mode, question, config)` | 成功處理（激活目標圖示、更新計數、播放語音） |
| `processFailure(mode, question, config)` | 失敗處理（根據 proceed/retry 模式選擇語音模板和後續動作） |
| `handleMultiRound(mode, question, config)` | 多輪兌換管理 |
| `bindEvents(mode, question, config)` | 模式事件綁定（含 cleanup） |
| `setupTouchDragForMode(...)` | 觸控拖曳註冊（含重試機制） |

### 3.6 遊戲流程

```
showSettings() → handleSelection() → updateStartButton()
    ↓
start() → generateQuestions() → setupQuizUI() → 播放歡迎語音
    ↓
loadNextQuestion() → startQuestion(question) → renderGameBoard()
    ↓
renderModeSpecificUI() → renderGameContent() → setupDragDropEvents()
    ↓
[用戶拖曳金錢] → ModeStrategies.handleDrop()
    ↓ (簡單模式自動 / 普通困難按鈕)
ModeStrategies.handleCompletion() → validateAnswer()
    ↓ 正確                          ↓ 錯誤
processSuccess()                  processFailure()
showExchangeResult()              ↓ proceed: nextQuestion()
playExchangeCompletionSpeech()    ↓ retry: returnCoinsToMoneyArea()
    ↓
handleMultiRound()
    ↓ 還有輪次                    ↓ 全部完成
continueNextRound()              playFinalCompletionSpeech() → nextQuestion()
    ↓                                                           ↓ 最後一題
refreshExchangeArea()                                         endGame()
```

### 3.7 重構成果

程式碼中記載了大規模重構：
- 舊的 `renderEasyMode()`、`renderNormalMode()`、`renderHardMode()` 等重複函數（約 1,000+ 行）已被統一策略替代
- 舊的 `handleCompleteExchangeClick` 從 400+ 行減至 15 行（減少 96%）
- 舊的事件監聽器函數已被統一的 `RenderStrategy.bindEvents()` 替代

---

## 四、語音系統

### 4.1 雙層語音架構

C3 擁有兩套語音系統：

1. **基礎 speech 物件**（`Game.speech`）：位於主物件，與 C1/C2 相同的 5 級回退選擇
2. **進階 Speech 模組**（`MoneyExchange3.Speech`）：獨立模組，增強版語音選擇和配置驅動回饋

### 4.2 Speech 模組語音選擇（增強版）

```
優先序：
1. Microsoft HsiaoChen Online (Natural)
2. Google 國語 (臺灣)
3. zh-TW 且名稱不含 "Hanhan"
4. zh-TW 任何語音
5. 名稱含「中文」/「國語」/「普通話」且排除「簡體」
```

**特殊過濾**：C3 的 Speech 模組額外排除簡體中文語音（`name.includes('简体')`），確保使用繁體中文語音。

### 4.3 Speech.speak() — 配置驅動語音

```javascript
Speech.speak(text, mode, config, callback)
```

- 根據 `config.speechFeedback` 決定是否播放
- 使用 `config.speechSettings` 的 rate/pitch/volume
- 根據兌換類型（`determineExchangeType()`）調整語音參數
- 支援回調函數（用於語音完畢後觸發下一步邏輯）
- 6 項安全機制：synth.cancel()、callbackExecuted 旗標、10 秒超時、try-catch、voice null 檢查、audioUnlocked 檢查

### 4.4 語音使用場景

| 場景 | 觸發函數 | 語音內容範例 |
|------|---------|-------------|
| 測驗開始 | `start()` | 「金錢兌換測驗開始，拖曳金錢到兌換區…」 |
| 題目開始 | `playQuestionStartSpeech()` | 「請問 10 個壹元可以換成幾個伍元」 |
| 拖曳放置（簡單） | `playCumulativeAmountSpeech()` | 「目前總共 3 個壹元」或「目前總共參元」 |
| 拖曳放置（普通） | `playPlacementSpeech()` | 「目前總共 15 元」（使用 speechTemplates.dropComplete） |
| 單輪兌換完成 | `playExchangeCompletionSpeech()` | 「5 個壹元換到 1 個伍元」 |
| 所有輪次完成 | `playFinalCompletionSpeech()` | 「恭喜你，10 個壹元，共換到 2 個伍元，進入下一題」 |
| 答錯（proceed） | `processFailure()` | 「對不起，你答錯了，是 5 個壹元換 1 個伍元，…請繼續下一題」 |
| 答錯（retry） | `processFailure()` | 「對不起，你答錯了，…請重新試試」 |
| 佔位已滿 | `processDropToExchangeArea()` | 「此位置已被佔用，請選擇其他空位」 |

### 4.5 語音模板系統

所有語音文字透過 `ModeConfig.speechTemplates` 配置模板和變數替換：

```javascript
speechTemplates: {
    dropComplete: '目前總共{totalValue}元',
    exchangeComplete: {
        smallToBig: '{sourceCount}個{sourceName}換到{targetCount}個{targetName}',
        bigToSmall: '{sourceCount}個{sourceName}換到{targetCount}個{targetName}'
    },
    error: {
        proceed: { smallToBig: '...請繼續下一題', bigToSmall: '...請繼續下一題' },
        retry: { smallToBig: '...請重新試試', bigToSmall: '...請重新試試' }
    }
}
```

### 4.6 NumberSpeechUtils 使用

C3 使用 `convertToTraditionalCurrency()` 進行金額語音轉換（在 `Speech` 模組內部呼叫），確保「2 元」唸「兩元」、「12 元」唸「拾貳元」等正確發音。

---

## 五、觸控與桌面支援

### 5.1 HTML5 拖曳事件

桌面端使用標準 HTML5 Drag and Drop API：
- `dragstart`：記錄拖曳元素 ID 和值到 `dataTransfer`，設置 `isDragging` 和 `draggedElementId`
- `dragover`：`preventDefault()` 允許放置，僅未填充格子顯示 dragover 效果
- `drop`：統一路由到 `ModeStrategies.handleDrop()`
- `dragleave`：移除 dragover 視覺效果

### 5.2 TouchDragUtility 觸控拖曳

C3 是唯一依賴 `touch-drag-utility.js` 的 C 系列單元，提供行動裝置觸控拖曳支援：

**註冊機制**：
```javascript
window.TouchDragUtility.registerDraggable(container, selectors, {
    onDragStart: (element, event) => { ... },
    onDrop: (draggedElement, dropZone, event) => { ... },
    onDragEnd: (element, event) => { ... }
});
window.TouchDragUtility.registerDropZone(zone, predicate);
```

**重試機制**：使用 `setTimeout(registerTouchDrag, 100)` 延遲重試，直到找到可拖曳元素才註冊。

**合成事件**：觸控拖曳透過創建合成事件（`syntheticEvent`）橋接到桌面端的事件處理器，統一處理邏輯。

**放置區註冊**：`.drop-zone`、`.flexible-zone`、`.placed-coins-container`、`#my-money-area` 均註冊為有效放置區。

### 5.3 防長按干擾

```javascript
document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.money-item, .exchange-money-item, ...')) {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('selectstart', (e) => {
    if (e.target.closest('.money-item, ...')) {
        e.preventDefault();
    }
});
```

### 5.4 點擊放置功能（簡單模式）

簡單模式啟用 `clickToMoveConfig.enabled`，支援雙擊放置：
1. 第一次點擊：選中物品（`selected-item` class），記錄時間戳
2. 第二次點擊（500ms 內）：偵測為雙擊，呼叫 `simulateCoinPlacement()` 直接放置到空格

### 5.5 Debug 行動裝置除錯

`Game.Debug.logMobileDrag()` 和 `Game.Debug.logPlacementDrop()` 記錄觸控拖曳的詳細資訊，便於行動裝置除錯。

---

## 六、版面設計

### 6.1 三階段畫面

| 階段 | 畫面 | 背景色 |
|------|------|--------|
| 設定頁 | 難度、類別、組合、題數、模式選擇 | 預設主題色 |
| 測驗頁 | 我的金錢區 + 兌換區 + 兌換結果區 | 簡單：紫色漸層 / 普通：粉紅漸層 / 困難：深藍漸層 |
| 完成頁 | 成績卡 + 獎勵 + 煙火 | 紫色漸層 |

### 6.2 設定頁面

- 標準設定組件：難度、類別、組合、題數、模式
- 難度說明文字動態更新（`getDifficultyDescription()`）
- 簡單模式時測驗模式按鈕禁用（`opacity: 0.5`、`cursor: not-allowed`）
- 兌換組合區域分兩組顯示：「小面額換大面額」和「大面額換小面額」
- 自訂題數使用 3×4 數字鍵盤彈窗（`showNumberInput()`，與 C2 相同）
- 底部包含「獎勵系統」和「產生作業單」連結

### 6.3 測驗頁面（模式隔離 UI）

每個難度使用獨立的 CSS 佈局類別：

| 模式 | 佈局類別 | 背景漸層 | 金錢區背景 |
|------|---------|---------|-----------|
| 簡單 | `unit3-easy-layout` | `#667eea → #764ba2` | `#e3f2fd → #bbdefb` |
| 普通 | `unit3-normal-layout` | `#f093fb → #f5576c` | `#fce4ec → #f8bbd9` |
| 困難 | `unit3-hard-layout` | `#4b6cb7 → #182848` | `#ecf0f1 → #bdc3c7` |

**三區域佈局**：
1. **我的金錢區**（`#my-money-area`）：flex 換行排列，`data-count` 屬性控制密度（low/medium/high）
2. **兌換區**（`#game-area`）：CSS Grid 佈局（`grid-template-columns: 1fr auto auto auto`），包含放置區 + 等號 + 目標區 + 勾選區
3. **兌換結果區**（`#exchange-results-area`）：水平排列已完成的兌換結果金錢圖示

**兌換區差異**：
- 簡單模式：一格一幣的 `.drop-zone`（固定數量格子）
- 普通/困難模式：彈性 `.flexible-zone`（單一大框，內含 `.placed-coins-container`）

### 6.4 完成頁面

採用 C/F 系列統一完成畫面樣式：
- 紫色漸層背景 + 星星 SVG pattern
- 獎盃/表情上下彈跳動畫（bounce）
- 橙色表現徽章（`≥90%`：表現優異 / `≥70%`：表現良好 / `≥50%`：還需努力 / `<50%`：多加練習）
- 粉紅色獎勵系統按鈕
- 三個統計卡片（答對題數、正確率、完成時間）
- 綠色「再玩一次」按鈕、紫色「返回設定」按鈕
- canvas-confetti 煙火動畫

### 6.5 響應式設計

- HTML 內嵌大量 CSS（約 1,100 行），包含完整的暗色模式支援（`[data-theme="dark"]` 約 400 行）
- 響應式斷點：768px、600px、480px、400px
- 600px 以下：統計卡片改為單列、按鈕全寬
- 金錢圖示尺寸：硬幣 80px（`.unit3-coin-container`）、紙鈔 120px（`.unit3-banknote-container`）

### 6.6 動畫系統

| 動畫 | 說明 |
|------|------|
| `resultFadeIn` | 兌換結果金錢出現動畫（0.8s scale 0.8→1） |
| `exchange-area-exit` | 輪次切換退出動畫（400ms 向下移動+淡出） |
| `exchange-area-enter` | 輪次切換進入動畫（500ms 向上移動+淡入） |
| `success-flash` | 格子成功放置閃爍（800ms） |
| `error-flash` | 格子佔用錯誤閃爍（600ms） |
| `celebrate` | 完成頁卡片出現動畫 |
| `bounce` | 獎盃上下彈跳 |
| `glow` | 表現徽章發光 |
| `fadeIn` | 通用淡入 |

---

## 七、注意事項

### 7.1 模式隔離狀態需同步維護

C3 的 StateManager 維護了兩套狀態系統（新 StateManager + 舊 `this.state`），透過 Proxy 雙向同步。修改狀態時需注意：
- 使用 `getGameState()` / `setGameState()` 確保經過 StateManager
- 避免直接修改深層嵌套物件（如 `this.state.gameState.currentRoundDropZone.placedCoins`），因為 Proxy 只監聽頂層屬性

### 7.2 「再玩一次」的初始化問題

完成頁的「再玩一次」按鈕呼叫 `Game.init(); Game.start()`，會重新初始化 StateManager 和 Speech 模組，但不重新進入設定頁面選擇設定。此行為與 C2 相同。

### 7.3 兌換區 DOM 保護

多輪兌換時，`renderGameContent()` 使用 `isNewQuestion` 參數控制是否清除兌換結果區：
- 新題目：清除舊結果
- 同題下一輪：完全不動結果區（`🔒 保護現有兌換結果`）

`Utils.DOMUtils.safeInnerHTML()` 也會在替換 innerHTML 前保存 `.exchange-results` 和 `[data-preserve="true"]` 元素。

### 7.4 競爭條件防護

- `isProcessingExchange` 旗標防止重複觸發完成驗證
- `playExchangeCompletionSpeech()` 的語音回調中才觸發 `handleMultiRound()`，避免語音未完就切換
- `processFailure()` 在語音回調中才執行 `nextQuestion()` 或 `returnCoinsToMoneyArea()`

### 7.5 簡單模式放置後不可拖曳

簡單模式放置金錢後，會強制設置 `draggable = false`、`setAttribute('draggable', 'false')`、`cursor = not-allowed`，並移除拖曳事件監聯器。這是單向操作設計。

### 7.6 音效檔案差異

C3 使用 `correct02.mp3` 而非其他單元常用的 `correct.mp3`，且使用 `coin01.mp3`（投幣音效）。修改音效時需注意此差異。

### 7.7 狀態管理現況

| 項目 | 狀態 |
|------|------|
| 統一重置函數 | ✅ `Core.StateManager` |
| 布林旗標 | `isAnswering`, `isProcessingExchange` |
| 重置位置 | 集中（StateManager 統一管理） |
| 評價 | ✅ **最佳實踐** |

**說明**：C3 採用 `Core.StateManager` 模式隔離狀態管理，每個難度模式有獨立狀態空間，並透過 Proxy 雙向同步確保狀態一致性。這是 C 系列中最完整的狀態管理實現。

**搜尋關鍵字**：`StateManager`, `isAnswering`, `isProcessingExchange`

---

## 八、潛在 Bug 與程式碼品質檢測

### Bug #1：舊版音效系統仍保留

**修正狀態**：✅ 已修正 — 刪除舊版 `audio` 物件（29 行）

`audio` 物件（約 30 行）被標記為「已廢棄」（`console.warn('⚠️ 舊的音效系統已廢棄')`），但其方法（`playDropSound`、`playErrorSound` 等）仍委派到新的 `Audio` 模組。建議完全移除舊 `audio` 物件，避免混淆。

### Bug #2：coinImages 重複初始化

**修正狀態**：✅ 已修正 — 刪除小換大第一段重複初始化

在 `startQuestion()` 的小換大邏輯中，`currentGameState.coinImages` 被初始化了兩次：
1. 第一次在 `if (smallToBigRules.maxSourceCoins)` 區塊內（約第 4581-4585 行）
2. 第二次在區塊外（約第 4595-4601 行）

第二次覆蓋了第一次的結果，雖然功能正確（使用相同的 `getRandomImage()`），但浪費了計算資源。

### Bug #3：大換小 `finalSourceCount` 可能未定義

**修正狀態**：✅ 已修正 — 刪除大換小第一段（含 buggy `finalSourceCount`）

在大換小非困難模式的 `coinImages` 設置中（約第 4780 行）：
```javascript
const finalSourceCount = (bigToSmallRules.maxTargetCoins && typeof actualSourceCount !== 'undefined') ? actualSourceCount : requiredSourceCount;
```
`actualSourceCount` 變數在此作用域中未被定義（只在另一個 if 分支中存在），這會導致 `typeof actualSourceCount !== 'undefined'` 始終為 `false`，實際上總是使用 `requiredSourceCount`。此條件判斷是無效的。

### Bug #4：`generateExchangeAreaHTML` 中未定義的變數 `i`

**修正狀態**：✅ 已修正 — `${i}` 改為 `${0}`

在 `generateExchangeAreaHTML()` 的大換小分支中（約第 6732 行），HTML 模板使用了 `id="exchange-item-${i}"`，但此處 `i` 未在迴圈中定義（它位於 `if (exchangeType === 'big-to-small')` 的分支中，不在 `for` 迴圈內），會導致 `exchange-item-undefined` 的 ID。

### Bug #5：console.log 無全域開關

**修正狀態**：✅ 已修正 — 新增 `const DEBUG = false` + 404 處加 `DEBUG &&` 前綴

C3 有大量除錯日誌（數百個 `console.log`），雖然 `Utils.Logger` 提供了分級日誌系統（DEBUG/INFO/WARN/ERROR），但大多數日誌仍直接使用 `console.log` 而非 `Logger`。Logger 的存在並未被充分利用。

### Bug #6：`handleDragOver` 在某些路徑未定義

**修正狀態**：✅ 已修正 — 新增 `handleDragOver(e) { e.preventDefault(); }` 方法

`ModeStrategies.createEventHandlers()` 中的 `dragOver` handler 呼叫 `MoneyExchange3.handleDragOver(e)`，但主物件並未顯式定義 `handleDragOver` 函數（只在 `bindAutoTriggerEvents` 等舊函數中通過 `this.handleDragOver.bind(this)` 引用，但此函數未見明確定義）。可能依賴 HTML5 的 `dragover` 預設行為。

### Bug #7：舊版拖曳函數仍保留

**修正狀態**：⏭️ 保留 — 舊函數仍有活躍呼叫者（`setupEasyModeDragListeners` 行 698、`setupNormalModeDragListeners` 行 704、`setupHardModeDragListeners` 行 7957），暫不刪除

`setupEasyModeDragListeners()`、`setupNormalModeDragListeners()`、`setupHardModeDragListeners()` 等舊函數仍然存在（約 7699-7937 行），雖然上方註解說已被統一策略替代，但函數本體並未刪除。這些函數可能在某些路徑仍被呼叫。

### Bug #8：localStorage 日誌存儲可能導致空間不足

**修正狀態**：✅ 已修正 — `storeLogEntry` 加 `if (!DEBUG) return` 門檻

`Utils.Logger.storeLogEntry()` 將日誌存儲到 localStorage（鍵名 `moneyExchange3_logs`），最多 100 條。但若用戶長期使用，加上其他單元的 localStorage 使用，可能接近 5MB 限制。

### Bug #9：返回設定按鈕導向問題

**修正狀態**：✅ 已修正 — 兩處 `window.location.href` 改為 `Game.showSettings()`

設定頁面的「返回設定」按鈕（`back-btn`）導向 `../index.html#part2`（首頁），而非遊戲中的 `Game.showSettings()`。但在測驗結束畫面中，「返回設定」按鈕正確使用 `Game.init()`。此行為在設定頁面與測驗頁面不一致。

### Bug #10：`runStateManagementTests()` 測試函數保留在生產環境

**修正狀態**：✅ 已修正 — 刪除兩份 `runStateManagementTests` + `testStateManager`

`runStateManagementTests()` 是測試/除錯用的函數，但保留在生產程式碼中，且其中的測試案例並未實際執行（只輸出日誌），`testResults` 的布林值全部為 `false` 且從未更新。

---

## 九、未來開發建議

### 9.1 檔案拆分

C3 的 10,045 行 JS 是整個專案中最大的單一檔案，建議拆分為多個模組：

| 建議模組 | 內容 | 預估行數 |
|---------|------|---------|
| `c3_core.js` | Core.StateManager、Core.EventSystem | ~300 |
| `c3_config.js` | ModeConfig（三個模式配置）| ~600 |
| `c3_strategies.js` | ModeStrategies、Strategies | ~1,500 |
| `c3_ui.js` | renderModeSpecificUI、CSS 字串、DOM 渲染 | ~2,000 |
| `c3_drag.js` | 拖曳事件處理、TouchDragUtility 整合 | ~1,500 |
| `c3_speech.js` | Speech 模組、語音模板處理 | ~500 |
| `c3_audio.js` | Audio 模組 | ~200 |
| `c3_main.js` | init、showSettings、遊戲流程 | ~1,500 |

### 9.2 移除廢棄程式碼

已完成刪除：
- ✅ 舊版 `audio` 物件（已有新 `Audio` 模組）— Bug #1
- ✅ `runStateManagementTests()` 測試函數（兩份副本）+ `testStateManager()` — Bug #10
- ✅ 註解掉的大段程式碼（`/* 刪除的舊函數 */` 區塊、`【已移除】`/`【已刪除】` 標記）
- ✅ 重複的 `coinImages` 初始化區塊（小換大 + 大換小各一段）— Bug #2, #3

保留不刪除（仍有活躍呼叫者）：
- ⏭️ `setupEasyModeDragListeners()`、`setupNormalModeDragListeners()`、`setupHardModeDragListeners()` — Bug #7
- ⏭️ `handleExchangeDropHard()` — 行 903 和 7914 仍有呼叫

### 9.3 Logger 系統整合

將散落的 `console.log` 統一替換為 `Utils.Logger` 呼叫，並在生產環境設置 `Logger.setLevel('WARN')` 減少輸出。

### 9.4 CSS 外部化

HTML 檔案中約 1,100 行內嵌 CSS（含 400 行暗色模式），建議提取為獨立的 `css/c3_money_exchange.css`，方便維護。

### 9.5 TypeScript 或 JSDoc 註解

考慮為 ModeConfig 等複雜配置物件添加 JSDoc 或 TypeScript 型別定義，提升 IDE 支援和維護性。

### 9.6 金錢圖示數量限制統一

目前三種模式都硬編碼最大 30 個金錢圖示（分散在 `specialRules.smallToBig.maxSourceCoins` 和 `specialRules.bigToSmall.maxTargetCoins`），建議提取為全域常數。

### 9.7 簡化重複的觸控拖曳註冊

`setupTouchDragForMode()`、`setupTouchDragForEasyMode()`、`setupTouchDragForNormalMode()` 等函數有大量重複邏輯，建議統一為單一參數化函數。

---

## 十、總結

C3 換錢是 C 系列中架構最複雜、程式碼量最大的單元（10,045 行 JS + 1,141 行 HTML），其核心特色在於：

1. **拖曳兌換玩法**：首個在 C 系列中採用拖曳互動的單元，需同時支援桌面 HTML5 拖曳和行動裝置觸控拖曳
2. **策略模式架構**：採用 ModeConfig + ModeStrategies + Strategies 多層策略設計，實現配置驅動的行為差異化
3. **模式隔離狀態管理**：Core.StateManager 為每個難度模式維護獨立狀態空間，避免模式切換時的狀態汙染
4. **多輪兌換機制**：每道題目包含多輪兌換（而非一次完成），含轉場動畫和結果累積顯示
5. **配置驅動語音**：所有語音文字透過模板配置，支援變數替換，並依兌換類型和作答模式動態調整

開發時需特別注意雙層狀態同步、多輪結果保護、觸控拖曳重試機制、以及龐大程式碼量帶來的維護挑戰。建議優先進行檔案拆分和廢棄程式碼清理，以降低後續開發的認知負擔。

### 2026-02-09 Bug 修正記錄

本次共修正第八節記載的 10 個 Bug/品質問題中的 9 個（Bug #7 保留），並清理廢棄程式碼：

| Bug | 修正內容 |
|-----|---------|
| #1 | 刪除舊版 `audio` 物件（29 行） |
| #2 | 刪除小換大 `coinImages` 重複初始化 |
| #3 | 刪除大換小 `coinImages` 重複初始化（含 buggy `finalSourceCount`） |
| #4 | `generateExchangeAreaHTML` 大換小分支 `${i}` → `${0}` |
| #5 | 新增 `const DEBUG = false`，404 處 `console.log` 加 `DEBUG &&` 前綴 |
| #6 | 新增 `handleDragOver(e) { e.preventDefault(); }` 方法 |
| #7 | 保留（舊拖曳函數仍有活躍呼叫者） |
| #8 | `storeLogEntry` 加 `if (!DEBUG) return` 門檻 |
| #9 | 兩處返回按鈕 `window.location.href` → `Game.showSettings()` |
| #10 | 刪除兩份 `runStateManagementTests` + `testStateManager` + 舊函數刪除註解 |

---

## 十一、驗證記錄

### 2026-02-16：系統性驗證

**驗證內容**：

| 項目 | 狀態 | 說明 |
|------|------|------|
| TimerManager | ✅ 已完成 | 73 個 setTimeout 統一管理（2026-02-23 v2.3.0，分類：question/ui/drag/speech） |
| EventManager | ✅ 已完成 | 59 個 addEventListener 統一管理（2026-02-23 v2.3.0，分類：settings/dragSystem/gameUI） |
| injectGlobalAnimationStyles | ✅ 已完成 | 6 個 @keyframes 遷移至統一函數，重命名 hintRevealFadeIn |
| DEBUG 開關 | ✅ 已有 | 404 處 console.log 已用 DEBUG 開關控制 |
| endGame() | ✅ 正常 | 採用 C/F 系列統一完成畫面樣式 |
| confetti 煙火 | ✅ 正常 | 使用 v1.9.2 本地化版本 |

**建議改進（P1）**：
- ~~引入 TimerManager 統一管理 setTimeout~~ ✅ 已於 2026-02-23 完成
- ~~引入 EventManager 統一管理 addEventListener~~ ✅ 已於 2026-02-23 完成

**結論**：C3 功能正常，記憶體管理標準已達成（TimerManager 73個 + EventManager 59個 + injectGlobalAnimationStyles 均已實作）。

---

---

## 十二、Debug Logger 統一日誌系統

### 修改日期
2026-02-21

### 修改內容
將所有 `console.log`、`console.warn`、`console.error` 調用轉換為統一的 `Game.Debug` 分類開關系統（升級自 Bug #5 的 `const DEBUG = false` 簡易開關）。

### 統計
- **轉換前**：346 個 console 調用（311 個 console.log、20 個 console.warn、15 個 console.error）
- **轉換後**：426 個 Game.Debug 調用
- **保留未轉換**：13 個（Debug 系統內部實現 + 日誌系統工具方法）

### FLAGS 分類（13 個）

```javascript
Debug: {
    FLAGS: {
        all: false,        // 全域開關（開啟後顯示所有分類）
        init: false,       // 初始化相關
        speech: false,     // 語音系統
        audio: false,      // 音效系統
        ui: false,         // UI 渲染
        exchange: false,   // 兌換操作
        drag: false,       // 拖曳操作
        touch: false,      // 觸控操作
        question: false,   // 題目生成
        state: false,      // 狀態變更
        hint: false,       // 提示系統
        event: false,      // 事件處理
        judge: false,      // 答案判定
        integrity: false,  // 完整性檢查
        error: true        // 錯誤訊息（預設開啟）
    }
}
```

### 使用方式

```javascript
// 在瀏覽器 Console 中開啟特定分類
Game.Debug.FLAGS.all = true;       // 開啟全部
Game.Debug.FLAGS.drag = true;      // 只開啟拖曳相關
Game.Debug.FLAGS.exchange = true;  // 只開啟兌換相關
Game.Debug.FLAGS.speech = true;    // 只開啟語音相關
```

### 分類統計

| 分類 | 數量 | 主要內容 |
|------|------|---------|
| drag | 43 | 拖曳開始/結束、放置處理、返回金錢 |
| exchange | 52 | 兌換邏輯、多輪處理、輪次檢查 |
| speech | 62 | 語音播放、語音系統初始化、語音回調 |
| ui | 28 | UI 渲染、動畫、進度更新 |
| touch | 18 | 觸控拖拽、TouchDragUtility 註冊 |
| event | 18 | 事件綁定、點擊處理、事件監聯 |
| state | 32 | 狀態管理、狀態同步、防重複 |
| question | 15 | 題目生成、題目載入、題目檢查 |
| judge | 18 | 判定邏輯、金錢類型驗證、完成檢查 |
| hint | 12 | 提示顯示、提示隱藏、提示文字 |
| audio | 8 | 音效加載、音效播放、音效錯誤 |
| init | 6 | 系統初始化、狀態管理初始化 |
| error | 12 | 錯誤消息、異常處理 |
| integrity | 1 | 數據完整性檢查 |

### 保留未轉換的調用（13 個）

1. **Debug 系統內部實現**（4 個）：
   - `console.log('[C3-${category}]', ...args)` — Game.Debug.log 內部
   - `console.warn('[C3-${category}]', ...args)` — Game.Debug.warn 內部
   - `console.error('[C3-ERROR]', ...args)` — Game.Debug.error 內部
   - `console.log('[C3-drag]', phase, {...})` — logMobileDrag 內部

2. **日誌系統 case 語句**（5 個）：
   - `case 'ERROR': return console.error;` 等 — 日誌級別映射

3. **日誌系統工具方法**（4 個）：
   - `console.time(...)` — 性能計時開始
   - `console.timeEnd(...)` — 性能計時結束
   - `console.info('日誌已清空')` — 日誌清空提示
   - `console.info('日誌級別設置為...')` — 日誌級別設置提示

### 搜尋關鍵字
- `Game.Debug.FLAGS`
- `Game.Debug.log`
- `Game.Debug.warn`
- `Game.Debug.error`

---

## 十三、重構記錄

### 2026-02-23：動畫定義整合（injectGlobalAnimationStyles）

**問題**：
- `@keyframes` 分散於 3 個不同位置（`endGame()` 內嵌 `<style>`、`getCommonCSS()`、`getHardModeCSS()`）
- `fadeIn` 在兩處定義且定義不一致（endGame 為純 opacity，hard mode 多了 scale(0.9)）
- 每次進入完成畫面或渲染模式 CSS 時重複插入動畫定義

**修改內容**：

1. **新增 `injectGlobalAnimationStyles()` 函數**
   - 統一管理 6 個動畫：`fadeIn`、`celebrate`、`bounce`、`glow`、`resultFadeIn`、`hintRevealFadeIn`
   - 使用 `document.getElementById('c3-global-animations')` 防止重複插入
   - 在 `init()` 中呼叫

2. **移除分散的 @keyframes**

   | 移除位置 | 動畫名稱 |
   |---------|---------|
   | `endGame()` 內嵌 `<style>` | `fadeIn`、`celebrate`、`bounce`、`glow` |
   | `getCommonCSS()` | `resultFadeIn` |
   | `getHardModeCSS()` | `fadeIn`（重複，與 endGame 版本不同） |

3. **重命名衝突動畫**
   - `getHardModeCSS()` 的 `fadeIn`（`scale(0.9)` 版本）→ `hintRevealFadeIn`
   - 更新 `.emoji-hint-box.emoji-hint-revealed .hint-text` 的 `animation` 引用

**搜尋關鍵字**：`injectGlobalAnimationStyles`, `c3-global-animations`, `hintRevealFadeIn`

---

## 十四、版本歷史

| 版本 | 日期 | 修改內容 |
|------|------|---------|
| 2.2.0 | 2025-08-31 | 配置驅動 + 詳細 Debug 系統 |
| — | 2026-02-09 | Bug #1~#6、#8~#10 修正（含 `const DEBUG` 簡易開關） |
| 2.2.1 | 2026-02-21 | Debug Logger 升級為 Game.Debug 分類系統（346 → 426 個調用） |
| 2.2.2 | 2026-02-23 | 動畫定義整合（新增 `injectGlobalAnimationStyles()`，6 個 @keyframes 遷移，重命名 `hintRevealFadeIn`） |
| 2.2.3 | 2026-02-23 | Debug Logger 狀態驗證（確認 v2.2.1 已完整實現，14 個 FLAGS 分類，0 個 `this.Debug.`）|
| 2.3.0 | 2026-02-23 | 記憶體管理：新增 TimerManager（73 個 setTimeout）+ EventManager（59 個 addEventListener），clearAll/removeAll 呼叫點 3 個（init/showSettings/start）|

---

## 十五、Debug Logger 狀態驗證（2026-02-23）

### 驗證日期
2026-02-23

### 驗證目的
確認 C3 Debug Logger 統一系統的實現狀態，參考 C4 標準進行對照。

### 驗證結果：**已完成，無需修改**

C3 的 Debug Logger 統一工作已於 **2026-02-21（v2.2.1）** 完成。本次驗證確認以下狀態：

#### 1. Game.Debug FLAGS 系統

| 分類 | FLAGS | 預設值 |
|------|-------|--------|
| `all` | 全域開關 | `false` |
| `init` | 初始化 | `false` |
| `speech` | 語音系統 | `false` |
| `audio` | 音效系統 | `false` |
| `ui` | UI 渲染 | `false` |
| `exchange` | 兌換操作 | `false` |
| `drag` | 拖曳操作 | `false` |
| `touch` | 觸控操作 | `false` |
| `question` | 題目生成 | `false` |
| `state` | 狀態變更 | `false` |
| `hint` | 提示系統 | `false` |
| `event` | 事件處理 | `false` |
| `judge` | 答案判定 | `false` |
| `integrity` | 完整性檢查 | `false` |
| `error` | 錯誤訊息 | `true` |

#### 2. 調用統計

| 類型 | 數量 |
|------|------|
| `Game.Debug.log(...)` | 380 個 |
| `Game.Debug.warn(...)` / `Game.Debug.error(...)` | 43 個 |
| **合計** | **423 個** |
| 保留 console 調用（Debug 系統內部 + 日誌工具） | 13 個 |

#### 3. 嵌套物件問題確認

| 項目 | 結果 |
|------|------|
| `this.Debug.` 殘留 | **0 個**（無問題） |
| `Game.Debug.*` 正確使用 | ✅ |

**結論**：C3 Debug Logger 完整符合 C4 標準，無需修改。

---

## 十六、記憶體管理實作（2026-02-23）

### 修改日期
2026-02-23

### 背景
C3 原有 81 個原始 `setTimeout` 和 72 個 `addEventListener` 呼叫，場景切換時均未清理，存在記憶體洩漏風險。本次新增 TimerManager 和 EventManager 統一管理。

---

### Phase 1：基礎設施

**新增 TimerManager**（Game 物件內，Debug 之後）：

| 方法 | 說明 |
|------|------|
| `setTimeout(callback, delay, category)` | 取代 window.setTimeout，自動追蹤 |
| `clearTimeout(id)` | 清除單一計時器 |
| `clearAll()` | 清除所有計時器 |
| `clearByCategory(category)` | 清除指定分類計時器 |

**新增 EventManager**（TimerManager 之後）：

| 方法 | 說明 |
|------|------|
| `on(element, type, handler, options, category)` | 取代 addEventListener，自動追蹤 |
| `removeAll()` | 移除所有監聽器 |
| `removeByCategory(category)` | 移除指定分類監聽器 |

**清理呼叫點（3 處）**：

| 函數 | 清理方式 |
|------|---------|
| `init()` | `TimerManager.clearAll()` + `EventManager.removeAll()` |
| `showSettings()` | `TimerManager.clearAll()` + `EventManager.removeByCategory('gameUI')` |
| `start()` | `TimerManager.clearAll()` + `EventManager.removeByCategory('gameUI')` |

---

### Phase 2：setTimeout 遷移統計

| Category | 數量 | 說明 |
|----------|------|------|
| `'question'` | 15 個 | loadNextQuestion、nextQuestion、handleCompletion |
| `'ui'` | 42 個 | updateSectionTitleCounts、classList 動畫、UI 更新 |
| `'drag'` | 16 個 | isDragging 重置、registerTouchDrag |
| `'speech'` | 4 個（多行） | 語音相關 |
| **合計遷移** | **73 個** | |
| 保留（TimerManager 定義內部 + Speech 系統） | 8 個 | window.setTimeout + 9750-9984 行語音系統 |

---

### Phase 3：addEventListener 遷移統計

| Category | 數量 | 說明 |
|----------|------|------|
| `'settings'` | 4 個 | gameSettings, startBtn, settingsRewardLink, worksheetLink |
| `'dragSystem'` | 48 個 | dragstart, dragend, dragover, dragleave, drop |
| `'gameUI'` | 7 個 | 完成按鈕、contextmenu、selectstart、completion 連結 |
| **合計遷移** | **59 個** | |
| 保留（手動模式清理 + 系統層） | 14 個 | DOMContentLoaded、EventManager 內部、易/普/難模式 drag 12 個（已有 `_xyzModeEventCleanup`） |

---

### 搜尋關鍵字
- `TimerManager.setTimeout`、`TimerManager.clearAll`
- `EventManager.on`、`EventManager.removeAll`、`EventManager.removeByCategory`

---

### 2026-02-24（第二輪）：新發現 Bug 修復

**問題 1 — showSettings() 未清理模式拖曳事件（高）**：

- `bindEasyModeEvents()`、`bindNormalModeEvents()`、`bindHardModeEvents()` 在 `#app` 元素上直接呼叫 `addEventListener` 綁定拖曳事件（dragstart/dragend/dragover/drop）
- 雖然各模式有對應的 `_easyModeEventCleanup`、`_normalModeEventCleanup`、`_hardModeEventCleanup` 清理函數，但 `showSettings()` 返回設定畫面時從未呼叫這些清理函數
- 由於 `#app` 元素不被 `innerHTML` 替換（只有子元素替換），舊的拖曳監聽器在返回設定後仍然殘留，造成記憶體洩漏
- **修復**：在 `showSettings()` 中呼叫 `Game.TimerManager.clearAll()` 之後，迴圈清理所有三種模式的拖曳事件：
  ```javascript
  ['easy', 'normal', 'hard'].forEach(mode => {
      const cleanupKey = `_${mode}ModeEventCleanup`;
      if (Game[cleanupKey]) { Game[cleanupKey](); Game[cleanupKey] = null; }
  });
  ```

---

### 2026-02-24：作業單連結統一簡化（僅傳 unit 參數）

**修改內容**：

- 作業單連結原本傳遞遊戲設定參數（`difficulty`）
- 各作業單已有完整工具列，用戶開啟後可直接在工具列調整；遊戲設定與作業單設定應獨立運作
- **修復**：移除所有多餘參數，統一改為只傳 `unit` 參數，讓作業單完全使用自己的預設値

**修改檔案**：`js/c3_money_exchange.js`

---

---

### 2026-02-25：拖曳去背修復（setDragImage）+ 多指觸控誤觸修復

**問題 1 — 桌面端拖曳預覽含背景色**

拖曳圖示時，瀏覽器預設以完整元素截圖作為拖曳預覽（含背景色、邊框），視覺上不夠清晰。

**修復**：在 `handleDragStart()` 方法中加入 setDragImage ghost：
- 建立透明背景的 ghost `<span>` 元素，顯示錢幣/金錢圖示內容
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
- `js/c3_money_exchange.js`（`handleDragStart()` 方法加入 setDragImage ghost）
- `js/touch-drag-utility.js`（touchIdentifier 過濾，跨單元共用）

---

### 2026-02-26：`setDragImage` 觸控防護

**問題描述**：

`TouchDragUtility` 以 `TouchEvent` 觸發 `onDragStart` 回呼，`TouchEvent` 無 `dataTransfer` 屬性。C3 的 dragstart handler 直接呼叫 `e.dataTransfer.setDragImage()`，在觸控裝置上會拋出 TypeError。

**修改內容**：

- `js/c3_money_exchange.js`：`handleDragStart` 中 `setDragImage` 呼叫包覆 `if (e.dataTransfer && typeof e.dataTransfer.setDragImage === 'function')` 防護（1 處，16-space indent）

**修改檔案**：`js/c3_money_exchange.js`

---

*報告更新時間：2026-02-26*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

## 2026-02-27：Raw setTimeout + resetGameState 修復（第三輪）

### Raw setTimeout 修復

**問題**：`js/c3_money_exchange.js` 語音系統及完成畫面使用裸 `setTimeout`（共 8 處），
無法被 `TimerManager.clearAll()` 清除。

| # | 位置 | 原始 | 修復後 |
|---|------|------|--------|
| 1 | `speech.init()` 語音初始化重試 | `setTimeout(setVoice, 500)` | `Game.TimerManager.setTimeout(setVoice, 500, 'speech')` |
| 2 | `speech.init()` 延遲初始化 | `setTimeout(() => {...}, 1000)` | `Game.TimerManager.setTimeout(..., 1000, 'speech')` |
| 3 | `speak()` 音訊未解鎖路徑 | `setTimeout(callback, 100)` | `Game.TimerManager.setTimeout(callback, 100, 'ui')` |
| 4 | `speak()` 語音未就緒路徑 | `setTimeout(callback, 100)` | `Game.TimerManager.setTimeout(callback, 100, 'ui')` |
| 5 | `speak()` 無語音物件路徑 | `setTimeout(callback, 100)` | `Game.TimerManager.setTimeout(callback, 100, 'ui')` |
| 6 | `speak()` shouldSpeak=false 路徑 | `setTimeout(callback, 100)` | `Game.TimerManager.setTimeout(callback, 100, 'ui')` |
| 7 | `speak()` 安全逾時（10秒） | `setTimeout(safeCallback, 10000)` | `Game.TimerManager.setTimeout(safeCallback, 10000, 'ui')` |
| 8 | 完成畫面第二波煙火 | `setTimeout(() => confetti({...}), 200)` | `Game.TimerManager.setTimeout(..., 200, 'ui')` |

### resetGameState 補齊遺漏欄位

**問題**：`resetGameState()` 未重置部分狀態欄位，導致場景切換後舊值殘留。

```javascript
// 補充至 resetGameState()：
this.setState('game.isDragging', false);
this.setState('game.score', 0);
this.setState('game.currentQuestionIndex', 0);
this.setState('game.quizQuestions', []);
Game.state.lastExchangeKey = null;   // 不在 StateManager 路徑表，直接賦值
Game.state.startTime = null;         // 同上
```

**說明**：`lastExchangeKey` / `startTime` 未登錄於 C3 StateManager 路徑對映表，
故需直接對 `Game.state` 賦值而非透過 `setState()` 。

**修改檔案**：`js/c3_money_exchange.js`

---

### 2026-02-27：confetti setInterval → 遞迴 TimerManager 模式（第二輪）

**問題**：完成畫面煙火效果包在 `Game.TimerManager.setTimeout` 回呼中，但內部的裸 `setInterval` 不受 TimerManager 管理，場景切換時 `TimerManager.clearAll()` 無法中途停止動畫計時器。

**修復**：將 `setInterval` 改為遞迴 `Game.TimerManager.setTimeout(fireConfetti, 250, 'confetti')`，確保 `clearAll()` 或 `clearByCategory('confetti')` 可立即停止動畫。

**修改檔案**：`js/c3_money_exchange.js`

---

*報告更新時間：2026-02-27*
*報告產生者：Claude Code (claude-sonnet-4-6)*

### 2026-02-28
- `state` 新增 `isEndingGame: false`；`endGame()` 加守衛防重複呼叫；`resetGameState()` 加 `Game.state.isEndingGame = false`
- `elapsedMs = endTime - this.state.startTime` 改為 `this.state.startTime ? (endTime - this.state.startTime) : 0`，防止 NaN 時間

---

### 2026-02-28
- `speak()` 的 `catch` 區塊從 `if (callback) callback()` 改為 `safeCallback()`，防止 `onend` 已觸發後 catch 再次呼叫 callback 導致雙重觸發

### 2026-03-01

#### 普通模式固定 1 輪兌換

**問題**：普通模式 `generateQuestions()` 原本依據簡單/困難模式的隨機輪次邏輯，普通模式也會生成 2~5 輪，導致題目過於繁雜。

**修復**：在 `generateQuestions()` 的 `pair.type === 'small-to-big'` / `big-to-small` 分支中，加入 `if (difficulty === 'normal')` 條件，強制設定：
- 小換大：`totalExchanges = 1`，`sourceItemsCount = exchangeRate`（例如 5×1元換1×5元，只兌換1輪）
- 大換小：`totalExchanges = 1`，`sourceItemsCount = 1`（例如 1×5元換5×1元，只兌換1輪）

**修改檔案**：`js/c3_money_exchange.js`（`generateQuestions`）

---

#### 普通/困難模式「我的金錢區」提示鈕

**需求**：
- 普通模式：「我的金錢 目前共...」區塊標題列右側加提示鈕；按下後先退回兌換區金錢，再在「我的金錢區」前 N 個圖示顯示綠色勾勾
- 困難模式：同上位置加提示鈕；移除「🔄 兌換區」標題中原有的「🧮 提示」；按下後播放語音說明兌換區目前數量與尚需數量

**實作**：

1. **HTML 結構調整**（`renderModeSpecificUI`）：將 normal/hard 的「我的金錢」`h2` 包在 flex 容器內，右側加 `<button class="c3-hint-btn">💡 提示</button>`；`h2` 以 inline style `border-bottom:none` 去除重複底線，改由外層 flex div 承載

2. **移除🧮提示**：
   - `exchangeAreaTitleHTML` 統一改為純計數（不再呼叫 `generateCurrentTotalEmojiHint`）
   - `updateSectionTitleCounts` 中「🔄 兌換區」分支，移除困難模式的 emoji hint 條件，所有模式一律顯示計數

3. **`showNormalModeHint()`**（新增）：
   - Step 1：找 `#game-area .flexible-zone`，依 `gameState.currentRoundDropZone.placedCoins` 重建金錢元素，加回 `#my-money-area`，清空兌換區，重置 `placedCoins = []`
   - Step 2：清除舊勾勾，對 `#my-money-area` 前 `exchangeRate` 個 `.money-item` 加 `.show-correct-tick` class
   - 播放語音：「請將N個X拖曳到兌換區」

4. **`showHardModeHint()`**（新增）：
   - 讀取 `gameState.currentRoundDropZone.placedCoins.length` 為 `coinCount`
   - 呼叫 `Strategies.ValidationStrategy.calculateRequirements()` 取得 `requiredCount`
   - 依 neededCount 生成語音文字並播放

5. **CSS**（`getCommonCSS()` 新增）：
   - `.c3-hint-btn`：綠色漸層圓角按鈕，hover scale
   - `.money-item.show-correct-tick`：綠色邊框 + `::before` 顯示 `✓` 徽章

**修改檔案**：`js/c3_money_exchange.js`

---

#### 普通/困難模式語音修正（上輪完成，本輪確認）

- 普通模式拖曳放置語音：`playPlacementSpeech()` 改為直接呼叫 `convertToTraditionalCurrency` 而非使用含「目前總共」前綴的模板
- 簡單/普通模式：`playCumulativeAmountSpeech()` 加 `difficulty === 'normal'` 條件，放置時只說「{金額}元」，不說「目前總共」

**修改檔案**：`js/c3_money_exchange.js`

---

*報告更新時間：2026-03-01*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

## 廢棄程式碼稽核（2026-03-01）

**稽核範圍**：`js/c3_money_exchange.js`（10,203 行）

### 結論：發現 1 處執行期 Bug + 多處低優先度項目

| 類型 | 位置 | 內容 | 嚴重性 | 建議 |
|------|------|------|--------|------|
| **執行期 Bug — 呼叫不存在的函數** | Lines 5675, 7325 | `this.completeExchange(question, difficulty/mode)` — 函數已被刪除，僅留下警告注解 `// ⚠️ completeExchange 函數已刪除，請使用 ModeStrategies.handleCompletion 替代` | **嚴重** | 需修正為 `MoneyExchange3.ModeStrategies.handleCompletion(...)` |
| 廢棄標記注解 | Line 5947 | `// ⚠️ checkAllRoundsComplete 函數已刪除，請使用 ModeStrategies.handleCompletion 替代` | 低 | 確認無呼叫點後可清除注解 |
| 誤導性注解 | Line 9688 | `// 重複的loadNextQuestion函數已移除，統一使用nextQuestion()` — 但 `loadNextQuestion` 仍存在並被廣泛呼叫 | 低 | 注解本身不正確，可刪除注解 |
| 向後相容注解 | Line 1576 | `// 向後兼容：映射到舊的state結構` | 低 | 操作性說明，可保留 |
| 重構記錄注解 | Line 6761 | `// 【重構成果】舊的複雜邏輯已被上方的統一策略模式取代，節省了500+行代碼` | 低 | 可保留或移除 |
| console.log | Lines 188, 194, 219+ | Debug 系統內部呼叫 | — | 已受 FLAGS 守衛，無需處理 |

### 執行期 Bug 詳情

#### `completeExchange()` 呼叫缺失定義（Lines 5675 & 7325）
- **Line 5675**（普通模式）：`checkExchangeComplete()` 判斷兌換完成後呼叫 `this.completeExchange(question, difficulty)`
- **Line 7325**（簡單模式 auto trigger）：`ModeStrategies` 放置硬幣後呼叫 `this.completeExchange(question, mode)`
- **影響**：任何觸及這兩條路徑的遊戲操作都會拋出 `TypeError: this.completeExchange is not a function`，導致遊戲卡住
- **修正方向**：將兩處改為 `MoneyExchange3.ModeStrategies.handleCompletion(difficulty/mode, { question })` 
- **注意**：需先確認 `handleCompletion` 的參數格式（參考 Line 2387 的呼叫範例）

**整體評估**：`completeExchange` 缺失是嚴重執行期 Bug，應優先修正；其餘均為低優先度注解清理。

### 補充稽核（第二輪）

| 類型 | 位置 | 內容 | 嚴重性 | 建議 |
|------|------|------|--------|------|
| 空 stub 函數（有呼叫點） | Line 4384–4386 | `hideCustomQuestionInput()` — 同 C1/C2，函數本體僅含注解；被 line 4152 呼叫 1 次 | 低 | 可刪除函數並移除呼叫點 |
| 已注解的 alert | Line 4378 | `// alert(...)` — 已取消彈窗提示 | 低 | 可清除注解行 |
| 重構記錄區塊 | Lines 9725–9743 | 多行注解記錄策略模式重構成果（400行→15行），為歷史文件 | — | 可保留，具文件價值 |

---

### 2026-03-01 — completeExchange 執行期 Bug 修復

**問題**：`processNormalModeBigToSmallDrop()` 中簡單模式 auto trigger 完成時呼叫 `this.completeExchange(question, mode)`，但該函數已刪除（僅留警告注解），導致 `TypeError: this.completeExchange is not a function`，換錢遊戲簡單模式大換小完成時必然崩潰。

同函數另有一處相同 bug（`checkExchangeComplete()` 中 line 5675），但因其上層呼叫鏈（`resetDropArea` → `handleDrop`）從未被呼叫，為無法觸及的死程式碼，一併修正以防未來誤用。

**修復方式**：
- **Line 7324–7344（主要修復）**：將 `this.completeExchange(question, mode)` 及其後 redundant 的 `showExchangeResult` / `playFinalCompletionSpeech` / `continueNextRound` 呼叫整體替換為 `MoneyExchange3.ModeStrategies.handleCompletion(mode, { question })`。`handleCompletion` 已透過 `processSuccess` → `showExchangeResult` → `playExchangeCompletionSpeech` → callback → `handleMultiRound` 完整處理所有後續流程。
- **Line 5675（防護修復）**：`checkExchangeComplete()` 中 `this.completeExchange(question, difficulty)` 改為 `MoneyExchange3.ModeStrategies.handleCompletion(difficulty, { question })`。

**修改檔案**：`js/c3_money_exchange.js`

---

## 跨輪計時器洩漏稽核（2026-03-03）

**稽核背景**：A3 單元曾發現 `speakText()` 10 秒備援計時器在下一輪觸發導致跳輪的 Bug，已對全系列交叉稽核。

**C3 稽核結論：安全（無此問題）**

三層保護均完備：

| 條件 | 狀態 | 說明 |
|------|------|------|
| ① 新輪次從語音 callback 觸發 | **不成立 ✅** | `endGame()` / `loadNextQuestion()` 不從語音 callback 鏈內部呼叫 |
| ② interrupted 不呼叫 safeCallback | **不成立 ✅** | `onerror` 對所有錯誤**無條件**呼叫 `safeCallback()`，備援計時器為 no-op |
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

## C3 答對語音優化（2026-03-06）

### 需求
完成該輪兌換答對時，語音應明確告知「答對」，並依是否為最後一題播放合適結尾；進入測驗總結視窗時，播放「恭喜完成所有題目」。

### 修改內容

| 位置 | 修改前 | 修改後 |
|------|--------|--------|
| `handleMultiRound`：還有輪次時 | `'進入下一輪兌換'` | `'答對，進入下一輪兌換'` |
| `playFinalCompletionSpeech`：非最後題 | `speechText + '，進入下一題'` | `'答對，' + speechText + '，進入下一題'` |
| `playFinalCompletionSpeech`：最後題 | `speechText + '，測驗結束'` | `'答對，' + speechText`（結尾由 endGame 接續）|
| 困難模式完成語音：非最後題 | `successMessage + '，進入下一題'` | `'答對，' + successMessage + '，進入下一題'` |
| 困難模式完成語音：最後題 | `successMessage + '，測驗結束'` | `'答對，' + successMessage` |
| `endGame()`：進入總結畫面後 | （無語音）| 300ms 後 `this.Speech.speak('恭喜完成所有題目', difficulty, config)` |

### 完整語音播放流程

```
完成一輪（非最後）→「答對，進入下一輪兌換」→ 進入下一輪
完成所有輪次（非最後題）→「答對，恭喜你，X個...，進入下一題」→ 下一題
完成所有輪次（最後題）→「答對，恭喜你，X個...」→ endGame → 「恭喜完成所有題目」+ 煙火
```

**修改檔案**：`js/c3_money_exchange.js`（4 處）

---

## 十四、設定頁兌換組合改版 + 金錢區外框自適應（2026-03-26）

### 14.1 金錢區外框自適應

**問題**：遊戲畫面中，錢幣/紙鈔圖示外的綠色邊框垂直高度過高，圖示與邊框之間空隙太大。

**根因分析**：
1. `.unit3-coin-container` / `.unit3-banknote-container` 有固定 `min-height`（124px/144px），導致外框無法收縮
2. `.money-item img { max-height: 75px }` (specificity 0-1-1) 覆蓋了 `.unit3-banknote { height: 120px }` (0-1-0)，圖片實際渲染小於預期
3. 紙鈔圖片為 2:1 長寬比，在 120×120 正方形容器中上下各有 ~30px 透明帶

**修復內容**（`css/c3_money_exchange.css` + `js/c3_money_exchange.js`）：

| 項目 | 修改前 | 修改後 |
|------|--------|--------|
| `min-height` 限制 | `min-height: 124px/144px/156px` | 全數移除 |
| 圖片高度 | `height: 120px`（紙鈔）/ `80px`（硬幣） | `height: auto`（自然比例） |
| 容器尺寸 | 無高特異度覆蓋 | `.unit3-banknote-container .unit3-banknote { width: 120px !important; height: auto !important; max-height: none !important }` |
| padding | `8px` | `2px` |

### 14.2 設定頁兌換組合改版

**新增功能**：
1. **短標題**：「小面額換大面額」→「小換大」；「大面額換小面額」→「大換小」；字色改為 `#333`（原白色不可見）
2. **🎲 隨機按鈕**：每組（小換大/大換小）末尾新增，樣式與一般 `selection-btn` 相同
3. **隨機語意**：選「🎲 隨機」後進入測驗，每道題從該組所有合法組合中隨機挑選（非進設定時固定一組）
4. 適用三個類別：錢幣↔錢幣、紙鈔↔紙鈔、錢幣↔紙鈔

**技術實作**：

| 函數 | 變更 |
|------|------|
| `renderPairButtons()` | h4 改短文字 + `#333` 色；各組末尾加 `data-type="random-pair"` 按鈕；active 判斷加 `!pair.random` 守衛 |
| `handleSelection()` | 新增 `random-pair` 分支：`state.settings.pair = { type, random: true }`；重繪 pair buttons；`return` 早退避免被 button-group active 邏輯覆蓋 |
| `generateQuestions()` | 偵測 `pair.random === true`；每輪迭代用 `activePair`（隨機從 `eligiblePairsForRandom` 取）替代固定 `pair` |
| `start()` | welcome 語音加 `pair.random` 守衛，隨機模式說「隨機金錢兌換」 |

**state 結構**（隨機模式）：
```javascript
state.settings.pair = { type: 'small-to-big', random: true }
// 無 from/to 欄位，generateQuestions() 每題自行挑選
```

**修改檔案**：`js/c3_money_exchange.js`、`css/c3_money_exchange.css`

---

## 十五、視覺修正與兌換主類別全隨機（2026-03-26）

### 15.1 「大換小」標題字色修正

**問題**：設定頁「大換小」區塊標題文字為白色（`#fff`），在白色背景下不可見。

**根因**：`renderPairButtons()` 中大換小的 `<h4>` 有 `color: #fff`，小換大已正確使用 `#333`，兩者不一致。

**修復**：`js/c3_money_exchange.js` 第 4169 行，`color: #fff` → `color: #333`。

### 15.2 兌換區金額數字間距修復

**問題**：兌換區的淡化目標金錢圖示（如 50元），金額文字與圖示幾乎重疊，間距過小。

**根因分析**：
1. HTML 結構：`<div class="target-money"><img class="unit3-coin faded"><div class="money-value">50元</div></div>`
2. `css/c3_money_exchange.css` 中 `.money-value { margin: 8px 0 0 0 }` — 但被覆蓋
3. `getCommonCSS()` inline `<style>` 注入時間晚於外部 CSS，其 `.money-value { margin: 1px 0 0 0 }` 贏得層疊，實際間距只有 1px

**修復**：`getCommonCSS()` inline style 中 `.money-value { margin: 1px 0 0 0 }` → `margin: 6px 0 0 0`

**附帶修復**：`css/c3_money_exchange.css` 及 inline style 補充 `.money-label` 樣式（`margin: 4px 0 0 0`），供 `generateTargetMoneyHTML()` 中 `money-label` class 使用。

### 15.3 兌換主類別「🎲 全隨機」

**新增功能**：在「💰 兌換主類別」右側新增「🎲 全隨機」按鈕，選後每題從三大類別所有 pairs 中隨機抽取，且連續兩題不會相同。

**可用 pairs 總數**：22 個（錢幣↔錢幣 10 + 紙鈔↔紙鈔 6 + 錢幣↔紙鈔 6）

**技術實作**：

| 函數 | 變更 |
|------|------|
| `renderCategoryButtons()` | 類別按鈕末尾加 `data-type="all-random-category"` 按鈕；`category === 'all-random'` 時標為 active |
| `renderPairButtons()` | `category === 'all-random'` 早返回，顯示「✅ 將從所有類別中隨機出題，每題儘可能不重複」 |
| `handleSelection()` | 新增 `all-random-category` 分支：`category = 'all-random'`、`pair = { random: true, type: 'all' }`；重繪 pair buttons；由既有 button-group active 邏輯處理按鈕高亮 |
| `generateQuestions()` | 新增 `isAllRandomMode`；全隨機時 `eligiblePairsForRandom` 收集所有類別 pairs；`isAllRandomMode` 加入 `activePair` 抽取條件；既有 `lastExchangeKey` 防連續重複機制自動生效 |
| `start()` | 歡迎語音加 `isAllRandom` 守衛：「每題都是不同的金錢兌換」 |

**state 結構**（全隨機模式）：
```javascript
state.settings.category = 'all-random'
state.settings.pair = { random: true, type: 'all' }
// generateQuestions() 每題從 22 個 pairs 中隨機選，from/to 由 activePair 決定
```

**修改檔案**：`js/c3_money_exchange.js`
