# C2 數錢 — 單元開發經驗報告書

> **日期**：2026-02-09
> **更新日期**：2026-03-10（提示按鈕吉祥物位置修正）
> **時間**：上午
> **單元名稱**：C2 數錢（Money Counting）
> **系列**：C 貨幣認知

---

## 一、基本資訊

### 檔案清單

| 類型 | 檔案路徑 | 說明 |
|------|---------|------|
| HTML | `html/c2_money_counting.html` | 主頁面（201 行，含內嵌觸控/動畫 CSS） |
| JS | `js/c2_money_counting.js` | 主邏輯（2,176 行） |
| CSS | `css/unit6.css`、`css/ai-theme.css`、`css/dark-theme.css`、`css/common-modal-responsive.css` | 共用樣式 |
| 作業單 | `worksheet/units/c2-worksheet.js` | 作業單產生器（129 行） |
| 共用工具 | `js/number-speech-utils.js`、`js/audio-unlocker.js`、`js/reward-launcher.js`、`js/theme-system.js`、`js/mobile-debug-panel.js` | 各項支援模組 |
| 圖片 | `images/money/*_yuan_front.png`、`*_yuan_back.png` | 7 種面額正反面共 14 張 |
| 音效 | `audio/correct.mp3`、`audio/error.mp3`、`audio/success.mp3`、`audio/click.mp3` | 正確/錯誤/完成/點擊音效 |

### 外部依賴

- **canvas-confetti** (v1.9.2) — 已改為本地 `js/confetti.browser.min.js`，離線環境可正常使用

---

## 二、單元特色

### 2.1 七種面額貨幣系統

C2 涵蓋台灣 7 種常用貨幣面額（不含 200 元與 2000 元紙鈔）：

| 類型 | 面額 |
|------|------|
| 硬幣（4 種） | 1 元、5 元、10 元、50 元 |
| 紙鈔（3 種） | 100 元、500 元、1000 元 |

每種面額皆有正面（front）與背面（back）圖片，題目中隨機顯示其中一面（`getRandomImage()` 以 50% 機率選擇正面或背面），增加視覺多樣性。

### 2.2 點數機制（核心玩法）

C2 與 C1 最大差異在於：C2 採用「逐一點擊金錢圖示累加」的互動方式，而非直接選擇題。學生需逐個點擊畫面上的金錢圖示，系統會逐步累加金額，模擬真實數錢行為。

**互動流程**：
1. 系統生成一組金錢圖示散佈於畫面（洗牌排列）
2. 學生逐一點擊金錢圖示
3. 每次點擊時：圖示標記為「已點數」(`.counted`)、播放點擊音效、語音播報累計金額
4. 全部點完後進入答題階段

### 2.3 三種難度模式

| 特性 | 簡單 | 普通 | 困難 |
|------|------|------|------|
| 點數回饋 | 顯示序號數字 | 顯示綠色打勾 ✓ | 僅播放點擊音效 |
| 語音播報 | 每次點擊播報累計金額 | 每次點擊播報累計金額 | 無語音播報 |
| 總計顯示 | 即時顯示總計金額 | 隱藏顯示「？？？」 | 隱藏顯示「？？？」 |
| 提示按鈕 | 無（無需提示） | 有（💡 提示） | 有（💡 提示） |
| 答題方式 | 自動判正確（免測驗） | 三選一選擇題 | 數字鍵盤輸入金額 |
| 測驗模式 | 不適用（自動完成） | retry / proceed | retry / proceed |

### 2.4 簡單模式免測驗機制

簡單模式下，學生只需完成點數操作，系統自動判定正確：
- 點完最後一個金錢圖示 → 語音播報最終金額 → 自動判正確 → 煙火動畫 → 語音「太棒了，你數完了，總共是 X 元」→ 自動進入下一題
- 設定頁面中，簡單模式時「測驗模式」按鈕被禁用（`disabled`、`opacity: 0.5`），並顯示提示「簡單模式自動完成，無需選擇測驗模式」

### 2.5 金錢數量設定

提供 6 種金錢數量範圍：

| 設定 | 數量範圍 |
|------|---------|
| 預設 | 5-20 個 |
| 1-10 | 1-10 個 |
| 10-15 | 10-15 個 |
| 15-20 | 15-20 個 |
| 20-25 | 20-25 個 |
| 25-30 | 25-30 個 |

### 2.6 面額多選機制

選擇面額分類（硬幣/紙鈔/混合）後，展開個別面額多選按鈕（`selectedItem` 類型），可選擇特定面額組合（如只選 1 元+5 元）。按鈕使用 toggle 模式（點擊新增、再點移除），`selectedItems` 陣列動態維護。

### 2.7 幣值必現邏輯

`generateQuestions()` 中確保每題所有選中的面額至少出現一次：
1. 先遍歷 `selectedItems`，每種面額放入 1 個
2. 剩餘數量從面額池中隨機填充
3. 使用 `Map` 統計各面額數量

### 2.8 防重複題目機制

`areQuestionsEqual()` 比較相鄰題目：
- 先比較總金額（`correctTotal`）
- 再建立物品數量映射（`Map<value, quantity>`）逐一比對
- `do-while` 迴圈最多嘗試 50 次生成不重複題目

### 2.9 提示按鈕（普通/困難模式）

`showTotalHint()` 功能：
- 暫時顯示正確總金額（替換「？？？」）
- 播放語音「總計金額是 X 元」
- 語音結束 1 秒後恢復為「？？？」
- 使用 CSS 類 `.hint-shown` 切換視覺樣式

### 2.10 獎勵與作業單系統整合

- **設定頁面**：獎勵系統連結 + 作業單連結（傳遞 unit/category/difficulty/count 參數）
- **測驗頁面**：標題列包含獎勵按鈕（🎁）
- **完成頁面**：粉紅色獎勵系統按鈕
- 三處皆支援 `RewardLauncher.open()` 優先、`window.open()` fallback

---

## 三、技術重點

### 3.1 Game 物件架構

整個單元封裝在一個全域 `Game` 物件中（`DOMContentLoaded` 內定義），包含以下子系統：

```
Game
├── gameData              # 靜態資料（標題、副標題、7 種面額定義）
│   └── items
│       ├── coins[]       # 硬幣（4 種，含 front/back 圖片路徑）
│       └── notes[]       # 紙鈔（3 種，含 front/back 圖片路徑）
├── state                 # 集中式狀態管理
├── elements              # DOM 元素快取
├── speech                # 語音子系統（init）
├── unlockAudio()         # 音頻解鎖系統
├── convertToTraditionalCurrency()  # 貨幣語音轉換（委派 NumberSpeechUtils）
├── init() / start()      # 初始化與遊戲流程
├── showSettings()        # 設定頁面渲染
├── handleSelection()     # 事件委派處理
├── setupQuizUI()         # 測驗頁面渲染
├── generateQuestions()   # 題目生成
├── loadNextQuestion()    # 載入下一題
├── startQuestion()       # 渲染金錢圖示
├── handleItemClick()     # 金錢圖示點擊處理
├── proceedToAnswerPhase()# 進入答題階段
├── showOptions()         # 普通模式選項渲染
├── showNumberInput()     # 數字鍵盤（困難模式/自訂題數共用）
├── checkAnswer()         # 普通模式答題檢查
├── checkNumpadAnswer()   # 困難模式答題檢查
├── resetCounting()       # retry 模式重置點數
├── showTotalHint()       # 提示功能
├── showCenterFeedback()  # 中央回饋覆蓋層
├── endGame()             # 完成畫面（含內嵌 CSS）
├── startFireworksAnimation()  # 答對煙火
├── triggerConfetti()     # 完成煙火
├── speak()               # 語音播放（獨立於 speech 物件）
└── getRandomImage()      # 隨機正反面圖片
```

### 3.2 狀態管理

`Game.state` 採集中式設計：

```javascript
{
  score: 0,                    // 答對題數
  totalQuestions: 10,          // 總題數
  currentQuestionIndex: 0,     // 當前題目索引
  quizQuestions: [],           // 生成的題目陣列
  isAnswering: false,          // 作答中鎖定旗標
  audioUnlocked: false,        // 音頻解鎖狀態
  startTime: null,             // 遊戲開始時間戳
  runningTotal: 0,             // 當前累計金額
  itemsToCount: 0,             // 本題需點數的總數
  countedItems: 0,             // 已點數的數量
  correctTotal: 0,             // 本題正確答案
  isPlayingFinalAmount: false, // 是否正在播放最終金額語音（防快速點擊）
  lastTotal: null,             // 上一題總額（防重複）
  settings: {
    category: null,            // 'coins' | 'notes' | 'mixed'
    difficulty: null,          // 'easy' | 'normal' | 'hard'
    mode: null,                // 'retry' | 'proceed'（簡單模式為 null）
    selectedItems: [],         // 選中的面額值陣列
    questionCount: null,       // 1 | 3 | 5 | 10 | 自訂(1-100)
    moneyQuantity: 'default'   // 金錢數量設定
  }
}
```

### 3.3 題目生成邏輯

`generateQuestions()` 的運作流程：

1. 根據 `selectedItems` 或 `category` 決定面額來源池
2. 根據 `moneyQuantity` 設定決定金錢數量範圍
3. 幣值必現：先確保所有選中面額各出現一次
4. 填充剩餘數量至目標數量（從面額池隨機抽取）
5. 使用 `Map` 統計各面額出現次數
6. `areQuestionsEqual()` 防止與前一題相同（最多嘗試 50 次）

**題目資料結構**：
```javascript
{
  items: [
    { item: { value: 10, name: '10元', images: {...} }, quantity: 3 },
    { item: { value: 50, name: '50元', images: {...} }, quantity: 1 }
  ],
  correctTotal: 80
}
```

### 3.4 點擊流程（handleItemClick）

```
handleItemClick(event)
    ├── 防重複：isPlayingFinalAmount 檢查 → 忽略
    ├── 防重複：item.counted 檢查 → 忽略
    ├── item.classList.add('counted')
    ├── runningTotal += value
    ├── 播放 click-sound
    │
    ├─ 簡單模式 ─→ 顯示序號數字（countNumber）
    │              → 即時更新 hint-total-amount
    │              → 語音播報累計金額
    │              → 最後一個 → isPlayingFinalAmount=true → proceedToAnswerPhase()
    │
    ├─ 普通模式 ─→ 顯示綠色打勾（countCheckmark）
    │              → 不更新總計顯示（保持「？？？」）
    │              → 語音播報累計金額
    │              → 最後一個 → speak('總共是 X 元') → proceedToAnswerPhase()
    │
    └─ 困難模式 ─→ 僅播放 click.mp3
                   → 最後一個 → 直接 proceedToAnswerPhase()
```

### 3.5 答題階段（proceedToAnswerPhase）

```
proceedToAnswerPhase()
    ├─ 簡單模式 ─→ 自動 score++ → 煙火+音效 → speak('太棒了') → loadNextQuestion()
    │
    ├─ 普通模式 ─→ speak('請選擇正確的金額') → showOptions()
    │              → 3 個選項（1 正確 + 2 干擾）
    │              → 干擾選項：偏移 ±5~20 或 ±10~40（確保不重複、不為負）
    │
    └─ 困難模式 ─→ speak('請輸入數錢的金額') → showNumberInput()
                   → 3x4 數字鍵盤 → checkNumpadAnswer()
```

### 3.6 普通模式選項生成（showOptions）

- 正確答案：`this.state.correctTotal`
- 干擾選項 1：偏移 ±5 的倍數（5/10/15/20）
- 干擾選項 2：偏移 ±10 的倍數（10/20/30/40）
- 使用 `do-while` 確保不重複、不為負
- Fisher-Yates 洗牌打亂順序
- 選項支援 hover 語音（`mouseenter` + `touchstart`）

### 3.7 重置點數（resetCounting）

retry 模式答錯時：
- `runningTotal = 0`、`countedItems = 0`
- 移除所有 `.counted` 類和序號數字元素
- 重置 `hint-total-amount` 為 `0`
- 學生需重新點數所有金錢圖示

### 3.8 事件委派模式

設定頁面使用單一事件委派：

```
gameSettings.addEventListener('click', handleSelection)
    ↓
handleSelection(event)
    ├── event.target.closest('.selection-btn') 取得按鈕
    ├── btn.dataset.type → 判斷設定類型
    │   ├── 'questions' → 題目數量
    │   ├── 'category' / 'difficulty' / 'mode' / 'moneyQuantity' → 各設定
    │   └── 'selectedItem' → 面額多選（toggle 模式）
    ├── 更新 state.settings
    ├── 更新 active 類別
    └── updateStartButton() 檢查完整性
```

### 3.9 自訂題數數字鍵盤

`showNumberInput()` 為通用元件，同時用於自訂題數和困難模式答題：

- **佈局**：3×4 九宮格（1-9 + 清除/0/確認）
- **限制**：最多 5 位數字
- **樣式**：確認=綠色、清除=黃色、數字=灰色
- **關閉**：紅色圓形 × 按鈕
- **防重複**：`if (document.getElementById('number-input-popup')) return`
- **callback 模式**：自訂題數 callback 限制 1-100；答題 callback 為 `checkNumpadAnswer`

---

## 四、語音系統

### 4.1 語音選擇優先順序（5 級 fallback）

`speech.init()` 中的語音選擇策略：

| 優先級 | 條件 | 說明 |
|--------|------|------|
| 1 | `Microsoft HsiaoChen Online` | Windows Edge 預設中文語音 |
| 2 | `Google 國語 (臺灣)` | Chrome 預設台灣中文語音 |
| 3 | `zh-TW` 且不含 `Hanhan` | 其他台灣中文語音（排除特定語音） |
| 4 | `lang === 'zh-TW'` | 任何 zh-TW 語音 |
| 5 | `lang.includes('zh')` 或名稱含中文/Chinese | 任何中文語音 |

若 5 級全部失敗，`voice` 保持 `null`，語音功能靜默失效。

### 4.2 初始化機制

語音初始化採三重保障：

1. **立即嘗試**：`setVoice()` 首次呼叫
2. **voiceschanged 事件**：`synth.onvoiceschanged = setVoice`（處理異步載入）
3. **延遲重試**：`setTimeout(setVoice, 1000)`（處理部分行動瀏覽器延遲）

每次 `setVoice()` 呼叫時遞增 `voiceInitAttempts`，最多重試 5 次（每次間隔 500ms）。若語音列表始終為空，標記 `isReady = true` 進入靜音模式。

### 4.3 安全機制（6 項）

| 機制 | 說明 |
|------|------|
| `audioUnlocked` 檢查 | 未解鎖時跳過語音播放，直接執行 callback（100ms 延遲） |
| `synth.cancel()` 防重疊 | 播放前停止所有正在播放的語音 |
| `callbackExecuted` 旗標 | 確保 callback 只執行一次（防 onend + timeout 雙重觸發） |
| 10 秒安全超時 | `setTimeout(safeCallback, 10000)`，防止語音卡住時阻塞流程 |
| `try-catch` 包裝 | 捕獲語音合成異常，確保 callback 仍被執行 |
| `voice` null 檢查 | 無可用語音時跳過播放，直接執行 callback |

### 4.4 語音使用場景

| 場景 | 觸發時機 | 語音內容 |
|------|---------|---------|
| 歡迎語音 | `start()` → 500ms 延遲後 | 依難度：「數數看有幾元，點擊金錢圖示來計算/計算後選擇/計算後輸入」 |
| 題目語音 | `startQuestion()` → 500ms 延遲後 | 「數數看有幾元」 |
| 累計金額語音 | `handleItemClick()`（簡單/普通模式） | 傳統中文貨幣金額（如「伍拾元」） |
| 最終金額語音 | 最後一個圖示被點擊時 | 簡單：金額；普通：「總共是 X 元」 |
| 提示語音 | `showTotalHint()` | 「總計金額是 X 元」 |
| 答題提示語音 | `proceedToAnswerPhase()` | 普通：「請選擇正確的金額」；困難：「請輸入數錢的金額」 |
| 選項 hover | `mouseenter` / `touchstart` | 該選項的金額文字 |
| 答對回饋 | `checkAnswer()` / `checkNumpadAnswer()` 正確時 | 「恭喜你答對了，總共是 X 元，進入下一題/測驗結束」 |
| 答錯回饋（retry） | 錯誤 + retry 模式 | 「答錯了，再試一次」 |
| 答錯回饋（proceed） | 錯誤 + proceed 模式（普通） | 第一段：「對不起你答錯了，你選擇的是 X 元」；第二段：「X 元才是正確答案」 |
| 答錯回饋（proceed） | 錯誤 + proceed 模式（困難） | 「對不起你答錯了，正確答案是 X 元」 |
| 簡單模式成功 | `proceedToAnswerPhase()` 自動判正確 | 「太棒了，你數完了，總共是 X 元」 |
| 完成語音 | `endGame()` → 100ms 後 | 依正確率：「太厲害了全部答對」/「很棒喔」/「不錯喔」/「要再加油喔」 |

### 4.5 NumberSpeechUtils 整合

C2 使用 C/A 系列專用的 `convertToTraditionalCurrency()`：

| 函數 | 系列 | 「2」的處理 |
|------|------|-----------|
| `convertToTraditionalCurrency()` | C/A 系列 | 百位以上用「兩」，個位用「貳」 |
| `convertToPureNumberSpeech()` | F 系列 | 一律用「貳」 |

C2 透過 `Game.convertToTraditionalCurrency(amount)` 委派至 `NumberSpeechUtils.convertToTraditionalCurrency(amount)`。

---

## 五、觸控與桌面支援

### 5.1 事件綁定策略

C2 採用多重事件綁定確保跨平台相容：

| 事件類型 | 綁定目標 | 用途 |
|---------|---------|------|
| `click` | `.selection-btn`（委派）、`.countable-item`、`.option-btn` | 主要互動事件 |
| `touchend` | `.countable-item`、`.option-btn` | 行動裝置點數/答題（`preventDefault` + `passive: false`） |
| `touchstart` | `.option-btn` | 行動裝置 hover 語音觸發 |
| `mouseenter` | `.option-btn` | 桌面端 hover 語音觸發 |

### 5.2 CSS 觸控優化

HTML 內嵌 CSS 提供以下觸控優化：

| CSS 屬性 | 作用 |
|---------|------|
| `touch-action: manipulation` | 禁止雙擊縮放，加速觸控回應（`.countable-item`、`.option-btn`） |
| `-webkit-user-select: none` | 防止長按選取文字 |
| `-webkit-touch-callout: none` | 防止長按彈出選單 |
| `transform: scale(0.95)` | `:active` 觸控回饋（縮小效果） |
| `transform: scale(1.05)` | `:hover` 桌面回饋（放大效果） |
| `pointer-events: none` | 圖片元素不攔截觸控事件 |
| `overscroll-behavior-y: contain` | `html/body/#app` 三層防止下拉重新整理 |

### 5.3 音頻解鎖系統（雙路徑）

`Game.unlockAudio()` 使用兩種方式解鎖行動裝置音頻限制：

1. **AudioContext 路徑**：建立空白 buffer → `createBufferSource()` → `start(0)`
2. **HTML Audio 路徑**：建立 `new Audio()` → 播放 Base64 靜音 MP3 → `pause()` → `currentTime = 0`

兩者並行執行。解鎖成功後設 `audioUnlocked = true`。失敗時也設 `true` 避免重複嘗試。

同時引入外部 `audio-unlocker.js`（監聽全域首次互動事件），形成雙重解鎖機制。

### 5.4 防連點機制

**isPlayingFinalAmount 旗標**：當最後一個金錢圖示被點擊、正在播放最終金額語音時，設 `isPlayingFinalAmount = true`，阻止額外的點擊事件觸發。

**isAnswering 旗標**：答題階段設 `isAnswering = true`，用於阻擋選項 hover 語音。

**counted 類檢查**：已點擊的金錢圖示加上 `.counted` CSS 類，阻止重複點擊。

### 5.5 disabled 選項樣式修正

HTML 內嵌 CSS 中對 `.option-btn:disabled` 進行特殊處理：
- `opacity: 1` — 防止 disabled 時變淡
- `background: white` — 保持原始背景
- `.no-highlight` 類 — 錯誤選項禁用所有高亮效果

---

## 六、版面設計

### 6.1 三階段畫面流程

```
設定頁面（showSettings）→ 測驗頁面（setupQuizUI + startQuestion）→ 完成頁面（endGame）
```

所有畫面皆動態渲染至 `<div id="app">`，透過 `innerHTML` 替換內容。

### 6.2 設定頁面

由 `showSettings()` 渲染，包含 8 組設定：

| 設定 | 選項 | 說明 |
|------|------|------|
| 難度 | 簡單/普通/困難 | 附動態說明文字（`getDifficultyDescription()`） |
| 面額 | 硬幣/紙鈔/混合 | 決定面額來源池 |
| 面額多選 | 依分類動態顯示 | 可選擇特定面額組合 |
| 金錢數量 | 預設/1-10/10-15/15-20/20-25/25-30 | 每題金錢圖示數量範圍 |
| 題數 | 1/3/5/10/自訂 | 自訂使用數字鍵盤（1-100） |
| 測驗模式 | 反複作答/單次作答 | 簡單模式時禁用 |
| 獎勵系統 | 開啟獎勵系統 | 連結至 reward 模組 |
| 作業單 | 產生作業單 | 傳遞參數至 worksheet 模組 |

開始按鈕動態狀態：需完成「面額分類 + 難度 + 面額多選 + 測驗模式（非簡單時）+ 題數」才能啟用。

### 6.3 測驗頁面

由 `setupQuizUI()` 渲染，採 `store-layout` 結構：

| 區域 | DOM 結構 | 說明 |
|------|---------|------|
| 標題列 | `.title-bar`（左進度/中標題/右獎勵+返回） | 固定於頂部 |
| 題目區 | `.unified-task-frame` > `#question-area` | 包含提示框+金錢顯示區 |
| 回饋區 | `#feedback-area` | 預設隱藏，用於行內回饋 |

金錢圖示渲染於 `#coin-display-area`，使用 `shuffleArray()` 打亂排列順序。

### 6.4 提示框（hintBox）

提示框根據難度不同呈現：

| 難度 | 提示框內容 |
|------|-----------|
| 簡單 | 「總計：{即時金額}元」，無提示按鈕，`.simple-mode` 類 |
| 普通 | 「總計：？？？元」+ 💡 提示按鈕，`.blurred-total` 類 |
| 困難 | 「總計：？？？元」+ 💡 提示按鈕 |

### 6.5 完成頁面

由 `endGame()` 渲染，遵循 C/F 系列統一樣式（約 250 行內嵌 `<style>`）：

| 元素 | 樣式 |
|------|------|
| 背景 | 紫色漸層 `linear-gradient(135deg, #667eea 0%, #764ba2 100%)` |
| 卡片動畫 | `celebrate`（縮放+旋轉）+ `fadeIn` |
| 獎盃圖示 | `bounce` 上下彈跳動畫（2s 無限循環） |
| 表現徽章 | 橙色漸層背景 + `glow` 發光動畫 |
| 獎勵按鈕 | 粉紅色漸層 `linear-gradient(135deg, #ff6b9d, #e91e63)` |
| 統計卡片 | 3 張（答對題數/正確率/完成時間），`grid-template-columns: repeat(3, 1fr)` |
| 再玩一次 | 綠色漸層 `linear-gradient(135deg, #27ae60, #2ecc71)` |
| 返回設定 | 紫色漸層 `linear-gradient(135deg, #8e44ad, #9b59b6)` |
| 煙火 | `triggerConfetti()`（canvas-confetti） |
| 音效 | `success-sound` |
| 星空背景 | SVG pattern 半透明圓點 |

**表現評價**（依正確率）：

| 正確率 | 評語 | 圖示 |
|--------|------|------|
| ≥90% | 表現優異 | 🏆 |
| ≥70% | 表現良好 | 👍 |
| ≥50% | 還需努力 | 💪 |
| <50% | 多加練習 | 📚 |

### 6.6 中央回饋覆蓋層（showCenterFeedback）

答對/答錯時在畫面中央顯示覆蓋回饋：
- 動態建立 `#center-feedback` 元素，append 至 `document.body`
- 答對：🎉 綠色 + 「答對了！」
- 答錯（retry）：❌ 紅色 + 「答錯了，再試一次！」
- 答錯（proceed）：❌ 紅色 + 「答錯了，正確答案是 X 元」

### 6.7 響應式斷點

**完成畫面內嵌響應式**（`@media (max-width: 600px)`）：

| 元素 | 大螢幕 | ≤600px |
|------|--------|--------|
| wrapper padding | 20px | 10px |
| screen padding | 40px | 20px |
| 標題字體 | 2.5em | 2em |
| 統計卡片排列 | 3 欄 grid | 1 欄 stack |
| 按鈕排列 | 水平 flex | 垂直 column |
| 按鈕寬度 | min-width 160px | width 100%, max 250px |

---

## 七、注意事項

### 7.1 語音初始化時機

`speech.init()` 在 `Game.init()` 中呼叫（即 `DOMContentLoaded` 時）。部分瀏覽器的 `getVoices()` 在此時返回空陣列，需依賴 `voiceschanged` 事件或延遲重試。語音系統在使用者首次互動前可能尚未就緒，但 `audioUnlocked` 檢查會在此期間跳過語音播放，不影響流程。

### 7.2 雙重音頻解鎖系統

C2 同時存在兩套音頻解鎖機制（與 C1 相同）：

1. **`Game.unlockAudio()`**：在 `handleSelection()` 和 `start()` 中手動呼叫
2. **`audio-unlocker.js`**：全域模組，監聯首次使用者互動事件自動解鎖

兩者功能重疊但互不干擾。

### 7.3 事件監聽器重建

每次呼叫 `showSettings()` 都會用 `innerHTML` 完全重建 DOM，之前綁定的事件監聯器全部失效。設定按鈕使用事件委派處理，獎勵/作業單連結在每次 `showSettings()` 後重新綁定。

### 7.4 retry 模式重置行為

retry 模式答錯時，`resetCounting()` 會重置所有已點數的金錢圖示，學生需從頭重新點數。這在金錢數量較多（如 25-30 個）時可能造成較差的使用體驗。

### 7.5 showNumberInput 共用問題

`showNumberInput()` 同時用於自訂題數和困難模式答題，但行為不同：
- **自訂題數**：提供自訂 callback + cancelCallback
- **困難模式答題**：無參數呼叫，使用預設 `checkNumpadAnswer` callback
- 兩者共用防重複機制（`if (document.getElementById('number-input-popup')) return`）

### 7.6 外部 CDN 依賴（已修正）

~~canvas-confetti 從 CDN 載入，離線環境無法使用。~~ 已改為本地 `js/confetti.browser.min.js`（v1.9.2），離線環境可正常使用。程式碼中仍保留防護：
- `triggerConfetti()`：`if (typeof confetti !== 'function') return`
- `startFireworksAnimation()`：`if (window.confetti) { ... }`

### 7.7 「再玩一次」行為

完成畫面的「再玩一次」按鈕執行 `Game.init(); Game.start()`，會重新初始化語音系統但不重新選擇設定。由於 `init()` 呼叫 `showSettings()` 而 `start()` 立即開始遊戲，畫面會快速閃爍（先顯示設定頁再立刻進入遊戲）。

### 7.8 狀態管理現況

| 項目 | 狀態 |
|------|------|
| 統一重置函數 | ✅ `resetGameState()` |
| 布林旗標 | `isAnswering`, `isPlayingFinalAmount` |
| 重置位置 | 集中（2 處調用） |
| 評價 | ✅ **最佳實踐** |

**說明**：C2 已實現統一的 `resetGameState()` 函數，在 `showSettings()` 和 `start()` 中調用，集中管理所有遊戲狀態的重置

**重置項目**：`score`, `currentQuestionIndex`, `quizQuestions`, `isAnswering`, `startTime`, `runningTotal`, `itemsToCount`, `countedItems`, `correctTotal`

**搜尋關鍵字**：`resetGameState`

---

## 八、潛在 Bug 與程式碼品質檢測

### Bug #1：返回設定按鈕導向錯誤

| 項目 | 內容 |
|------|------|
| **問題** | 測驗畫面標題列「返回設定」按鈕跳轉至 `../index.html#part2`（主選單），而非回到本單元設定頁面 |
| **根本原因** | `setupQuizUI()` 中返回按鈕使用 `window.location.href = '../index.html#part2'`，應呼叫 `Game.showSettings()` |
| **影響範圍** | 使用者想調整設定時被帶離單元，需重新從首頁進入 |
| **建議修正** | 將 `window.location.href` 改為 `Game.showSettings()`（與 C1 Bug #3 相同問題） |
| **修正狀態** | ✅ 已修正 — 設定頁 `onclick` 和 `setupQuizUI()` 事件監聽器皆改為 `Game.showSettings()` |

### Bug #2：checkAnswer() 中 `this.synth` 未定義

| 項目 | 內容 |
|------|------|
| **問題** | `checkAnswer()` 開頭使用 `this.synth`（第 1522 行），但 `synth` 定義在 `this.speech.synth`，`Game` 層級無 `synth` 屬性 |
| **根本原因** | 應為 `this.speech.synth` |
| **影響範圍** | `this.synth` 為 `undefined`，`this.synth && this.synth.speaking` 條件永遠為 `false`，導致答題時不會停止之前的選項 hover 語音 |
| **建議修正** | 改為 `if (this.speech.synth && this.speech.synth.speaking) { this.speech.synth.cancel(); }` |
| **修正狀態** | ✅ 已修正 — `this.synth` 改為 `this.speech.synth` |

### Bug #3：speak() 方法位置不一致

| 項目 | 內容 |
|------|------|
| **問題** | `Game.speak()` 獨立定義在 Game 層級（含完整安全機制），但 `speech` 物件內無 `speak` 方法 |
| **根本原因** | 開發過程中未統一語音播放路徑 |
| **影響範圍** | 功能上不受影響（`Game.speak()` 正確引用 `this.speech.synth` 和 `this.speech.voice`），但架構上不夠內聚 |
| **建議修正** | 可考慮將 `speak()` 移入 `speech` 物件，並在 Game 層級建立委派方法 |
| **修正狀態** | ✅ 已修正 — `speak()` 完整邏輯移入 `speech` 物件，`Game.speak()` 改為單行委派 `this.speech.speak(text, callback)` |

### Bug #4：HTML 保留未使用音效元素

| 項目 | 內容 |
|------|------|
| **問題** | `<audio id="select-sound">` 在 HTML 中定義但未被 JS 引用 |
| **根本原因** | 早期開發遺留 |
| **影響範圍** | 僅造成不必要的網路請求（預載入 select.mp3），不影響功能 |
| **建議修正** | 移除未使用的 `<audio>` 元素 |
| **修正狀態** | ✅ 已修正 — 從 `html/c2_money_counting.html` 移除 `<audio id="select-sound">` |

### Bug #5：困難模式重複播放 click.mp3

| 項目 | 內容 |
|------|------|
| **問題** | `handleItemClick()` 困難模式分支中使用 `new Audio('../audio/click.mp3').play()`（第 1216 行），但外層已有 `clickSound.play()`（第 1144-1148 行） |
| **根本原因** | 困難模式分支額外建立新 Audio 物件播放同一音效 |
| **影響範圍** | 困難模式點擊時會同時播放兩次 click.mp3（一次來自 `#click-sound` DOM 元素，一次來自 `new Audio`） |
| **建議修正** | 移除困難模式分支中的 `new Audio('../audio/click.mp3').play()` |
| **修正狀態** | ✅ 已修正 — 移除困難模式分支中的 `new Audio(...)` 呼叫，由外層 `clickSound.play()` 統一處理 |

### Bug #6：console.log 無開關

| 項目 | 內容 |
|------|------|
| **問題** | 大量除錯日誌（如 `🎯 [C2-點數]`、`🎙️ [C2-語音]`）無全域開關 |
| **影響範圍** | 生產環境仍輸出大量控制台日誌 |
| **建議修正** | 建立分類日誌系統，類似 F3 的 `Game.Debug` |
| **修正狀態** | ✅ 已修正 — 新增 `const DEBUG = false` 全域開關，44 處 `console.log(` 改為 `DEBUG && console.log(`，`console.error` 保留不變 |

### Bug #7：困難模式無語音回饋

| 項目 | 內容 |
|------|------|
| **問題** | 困難模式點擊金錢圖示時僅播放 click 音效，不播報累計金額語音 |
| **設計意圖** | 困難模式要求學生「自己數」，不提供語音輔助 |
| **潛在問題** | 對於需要聽覺輔助的學習者，困難模式可能過於困難 |
| **修正狀態** | ⏭️ 設計決定，非 Bug — 困難模式刻意不提供語音輔助，維持現狀 |

---

## 九、未來開發建議

### 9.1 檔案分類改進

**JS 目錄重構**：目前 `js/` 目錄混合了 18 個單元檔案與 7 個工具檔案。建議拆分為 `js/units/` 和 `js/shared/`。

**清除未使用 CSS**：專案中有 14 個 `*_ipad.css` 和 1 個未引用的 `c6_making_change.css`，可清除。

### 9.2 程式碼架構改進

**提取完成畫面模組**：`endGame()` 中約 250 行內嵌 CSS 在 18 個單元中各自實作，存在大量重複。建議提取為共用模組。

**統一語音播放路徑**：~~`speak()` 應移入 `speech` 物件或建立明確的委派關係，並修正 Bug #2（`this.synth` 未定義）。~~ 已完成（Bug #2、#3 已修正）。

**集中 Config 常數**：以下數值散佈於程式碼各處：

| 常數 | 目前值 | 出現位置 |
|------|--------|---------|
| 自訂題數上限 | 100 | `showCustomQuestionInput()` callback |
| 防重複嘗試上限 | 50 | `generateQuestions()` |
| 歡迎語音延遲 | 500ms | `start()` |
| 答對後等待 | 1200ms | `checkAnswer()` 正確分支 |
| 答錯後等待 | 1500ms / 2000ms | retry / proceed 分支 |
| 安全超時 | 10000ms | `speak()` |
| 語音重試上限 | 5 次 | `speech.init()` |
| 數字鍵盤最大位數 | 5 | `showNumberInput()` |

### 9.3 現有可改進之處

| 問題 | 說明 | 建議 |
|------|------|------|
| 重複 `synth.cancel()` | `speak()` 中先檢查 `synth.speaking` 再 `cancel()`，接著第 2123 行又無條件 `cancel()` | 合併為一次 |
| 缺少 ARIA 標籤 | 金錢圖示和選項按鈕缺少 `aria-label` | 新增 `aria-label` 提升無障礙支援 |
| 面額多選 UX | 選擇面額分類後 `selectedItems` 被清空，若切換回同一分類需重新選擇 | 可按分類快取選擇狀態 |
| `elements` 快取不足 | 僅快取 `questionArea` 和 `feedbackArea`，其他元素每次 `querySelector` | 擴充 DOM 快取 |
| 數字鍵盤最大位數 | 5 位數字（最大 99999），但實際最大合理金額遠小於此 | 依題目金額範圍動態限制 |

### 9.4 作業單改進

C2 作業單目前僅支援 2 種題型（`fill` 和 `hint-complete`），相較於 A 系列的 10 種題型較少。可考慮新增：
- 選擇題型：提供 3 個金額選項，勾選正確的
- 圖示選擇題型：給定金額，從金錢組合中選出正確的

---

## 十、總結

C2 數錢單元以「逐一點擊累加」的互動設計，模擬真實數錢行為，與 C1 的「選擇題辨識」形成差異化。三種難度模式（系統幫數自動完成/選擇題/數字輸入）和六種金錢數量範圍的設定，提供從入門到進階的完整學習路徑。

核心技術亮點包括：幣值必現邏輯確保練習覆蓋率、`areQuestionsEqual()` 防重複機制、`isPlayingFinalAmount` 防快速點擊保護、以及 retry 模式的完整重置機制。語音系統延續 C1 的 5 級 fallback + 6 項安全機制架構。

**2026-02-09 修正記錄**：已完成 Bug #1～#6 的修正，包括：返回設定按鈕改為 `Game.showSettings()`（#1）、`this.synth` 改為 `this.speech.synth`（#2）、`speak()` 移入 `speech` 物件並建立委派（#3）、移除未使用的 `<audio id="select-sound">`（#4）、移除困難模式重複 click 音效（#5）、新增 `DEBUG` 全域開關控制 44 處 `console.log`（#6）。Bug #7 確認為設計決定，維持現狀。

---

## 十一、驗證記錄

### 2026-02-16：系統性驗證

**驗證內容**：

| 項目 | 狀態 | 說明 |
|------|------|------|
| TimerManager | ✅ 已完成 | 16 個 setTimeout 統一管理（2026-02-23 v2.3.0，分類：question/ui/speech） |
| EventManager | ✅ 已完成 | 12 個 addEventListener 統一管理（2026-02-23 v2.3.0，分類：settings/gameUI） |
| injectGlobalAnimationStyles | ✅ 已完成 | 4 個 @keyframes 遷移至統一函數 |
| DEBUG 開關 | ✅ 已有 | 44 處 console.log 已用 DEBUG 開關控制 |
| endGame() | ✅ 正常 | 採用 C/F 系列統一完成畫面樣式 |
| confetti 煙火 | ✅ 正常 | 使用 v1.9.2 本地化版本 |

**建議改進（P1）**：
- ~~引入 TimerManager 統一管理 setTimeout~~ ✅ 已於 2026-02-23 完成
- ~~引入 EventManager 統一管理 addEventListener~~ ✅ 已於 2026-02-23 完成

**結論**：C2 功能正常，記憶體管理標準已達成（TimerManager 16個 + EventManager 12個 + injectGlobalAnimationStyles 均已實作）。

---

## 十二、重構記錄

### 2026-02-17：狀態管理重構（resetGameState）

**問題**：
- 狀態重置邏輯分散於多個位置
- 容易遺漏導致狀態殘留
- 不符合 C1/A4/A5 等單元的最佳實踐

**修改內容**：

1. **新增 `resetGameState()` 函數**
   - 集中管理所有遊戲相關狀態的重置
   - 重置項目：`score`, `currentQuestionIndex`, `quizQuestions`, `isAnswering`, `startTime`, `runningTotal`, `itemsToCount`, `countedItems`, `correctTotal`
   - 輸出日誌：`🔄 [C2] 遊戲狀態已重置`

2. **調用位置**
   | 位置 | 調用條件 | 說明 |
   |------|---------|------|
   | `showSettings()` | 無條件 | 返回設定時重置狀態 |
   | `start()` | 無條件 | 開始測驗前重置狀態 |

**新增程式碼**（搜尋關鍵字：`resetGameState`）：

```javascript
resetGameState() {
    this.state.score = 0;
    this.state.currentQuestionIndex = 0;
    this.state.quizQuestions = [];
    this.state.isAnswering = false;
    this.state.startTime = null;
    this.state.runningTotal = 0;
    this.state.itemsToCount = 0;
    this.state.countedItems = 0;
    this.state.correctTotal = 0;
    console.log('🔄 [C2] 遊戲狀態已重置');
}
```

**修改檔案**：
- `js/c2_money_counting.js`

**驗證方式**：
1. 開啟 C2 數錢
2. 完成部分測驗後點擊「返回設定」
3. Console 應顯示「🔄 [C2] 遊戲狀態已重置」
4. 重新開始測驗，確認題目從第 1 題開始、分數為 0、累計金額為 0

---

---

## 十三、Debug Logger 統一日誌系統

### 修改日期
2026-02-21

### 修改內容
將所有 `console.log`、`console.warn`、`console.error` 調用轉換為統一的 `Game.Debug` 分類開關系統（升級自 Bug #6 的 `const DEBUG = false` 簡易開關）。

### 統計
- **轉換前**：48 個 console 調用
- **轉換後**：53 個 Game.Debug 調用
- **保留未轉換**：1 個（Debug 系統內部實現）

### FLAGS 分類（10 個）

```javascript
Debug: {
    FLAGS: {
        all: false,        // 全域開關（開啟後顯示所有分類）
        init: false,       // 初始化相關
        speech: false,     // 語音系統
        audio: false,      // 音效系統
        ui: false,         // UI 渲染
        counting: false,   // 點數操作
        question: false,   // 題目生成
        state: false,      // 狀態變更
        answer: false,     // 答案檢查
        option: false,     // 選項處理
        error: true        // 錯誤訊息（預設開啟）
    }
}
```

### 使用方式

```javascript
// 在瀏覽器 Console 中開啟特定分類
Game.Debug.FLAGS.all = true;        // 開啟全部
Game.Debug.FLAGS.speech = true;     // 只開啟語音相關
Game.Debug.FLAGS.counting = true;   // 只開啟點數相關
```

### 保留未轉換的調用（1 個）

- `console.log('[C2-${category}]', ...args)` — Game.Debug.log 內部實現

### 搜尋關鍵字
- `Game.Debug.FLAGS`
- `Game.Debug.log`
- `Game.Debug.warn`
- `Game.Debug.error`

---

## 十四、版本歷史

| 版本 | 日期 | 修改內容 |
|------|------|---------|
| 2.2.0 | 2025-08-30 | 配置驅動 + 詳細 Debug 系統 |
| — | 2026-02-09 | Bug #1~#6 修正（含 `const DEBUG` 簡易開關） |
| — | 2026-02-17 | 狀態管理重構（resetGameState 統一函數） |
| 2.2.1 | 2026-02-21 | Debug Logger 升級為 Game.Debug 分類系統（48 → 53 個調用） |

---

## 十五、重構記錄（動畫定義整合）

### 2026-02-23：動畫定義整合（injectGlobalAnimationStyles）

**問題**：
- `@keyframes` 定義內嵌於 `endGame()` 的 `<style>` 標籤中，每次進入完成畫面都重複插入
- 與 C/F 系列其他單元不一致

**修改內容**：

1. **新增 `injectGlobalAnimationStyles()` 函數**
   - 統一管理 4 個動畫：`fadeIn`、`celebrate`、`bounce`、`glow`
   - 使用 `document.getElementById('c2-global-animations')` 防止重複插入
   - 在 `init()` 中呼叫

2. **移除 `endGame()` 內嵌的 4 個 @keyframes**

**搜尋關鍵字**：`injectGlobalAnimationStyles`, `c2-global-animations`

---

## 十六、版本歷史

| 版本 | 日期 | 修改內容 |
|------|------|---------|
| 2.2.0 | 2025-08-30 | 配置驅動 + 詳細 Debug 系統 |
| — | 2026-02-09 | Bug #1~#6 修正（含 `const DEBUG` 簡易開關） |
| — | 2026-02-17 | 狀態管理重構（resetGameState 統一函數） |
| 2.2.1 | 2026-02-21 | Debug Logger 升級為 Game.Debug 分類系統（48 → 53 個調用） |
| 2.2.2 | 2026-02-23 | 動畫定義整合（新增 `injectGlobalAnimationStyles()`，4 個 @keyframes 遷移） |
| 2.3.0 | 2026-02-23 | 記憶體管理：TimerManager（16個）+ EventManager（12個），3 個 clearAll/removeAll 呼叫點 |

---

## 十七、記憶體管理實作（v2.3.0）

### 實作範圍

| 項目 | 數量 | 說明 |
|------|------|------|
| TimerManager 遷移 | 16 個 | `setTimeout` → `Game.TimerManager.setTimeout` |
| EventManager 遷移 | 12 個 | `addEventListener` → `Game.EventManager.on` |
| clearAll 呼叫點 | 3 個 | `init()` / `showSettings()` / `start()` |
| 保留 raw setTimeout | 7 個 | speech 子物件（6個）+ TimerManager 內部定義（1個） |
| 保留 raw addEventListener | 2 個 | DOMContentLoaded + EventManager 內部定義 |

### setTimeout 分類

| 分類 | 數量 | 說明 |
|------|------|------|
| `'question'` | 3 | loadNextQuestion、hideCenterFeedback 後下題 |
| `'ui'` | 10 | DOM 更新、classList、動畫、confetti |
| `'speech'` | 3 | 語音播放延遲（非 speech 子物件） |

### addEventListener 分類

| 分類 | 數量 | 說明 |
|------|------|------|
| `'settings'` | 4 | gameSettings、startBtn、settingsRewardLink、worksheetLink |
| `'gameUI'` | 8 | click/touchend/touchstart 按鈕、completion 連結、backBtn |

**搜尋關鍵字**：`TimerManager.setTimeout`, `EventManager.on`

---

### 2026-02-24（第二輪）：稽核結果

**第二輪全面稽核結論（無新增 Bug）**：所有項目均符合規範，無需修復。

---

### 2026-02-24：作業單連結統一簡化（僅傳 unit 參數）

**修改內容**：

- 作業單連結原本傳遞遊戲設定參數（`category`, `difficulty`）
- 各作業單已有完整工具列，用戶開啟後可直接在工具列調整；遊戲設定與作業單設定應獨立運作
- **修復**：移除所有多餘參數，統一改為只傳 `unit` 參數，讓作業單完全使用自己的預設値

**修改檔案**：`js/c2_money_counting.js`

---

### 2026-02-26：11-19 元語音唸法修正

**問題描述**：

C2 金錢點數播放語音時，11-19 元的唸法為「拾壹元」至「拾玖元」（正體字形，TTS 引擎讀起來不自然）。正確的日常用語應為「十一元」至「十九元」。

**根本原因**：

共用模組 `number-speech-utils.js` 的 `convertToTraditionalCurrency()` 函數：
- 11-19 未列入 `specialCases`，由通用算法產生 `'壹拾壹元'`…`'壹拾玖元'`（正體字）
- TTS 引擎讀正體字「壹拾」時發音偏正式，聽起來像「拾壹」
- 已有的 `15: '拾伍元'` specialCase 同樣使用正體字，發音不自然

**修改內容**：

`js/number-speech-utils.js` `convertToTraditionalCurrency()` specialCases 加入 11-19：

```javascript
11: '十一元',  // 原：算法產生'壹拾壹元'
12: '十二元',  // 原：算法產生'壹拾貳元'
13: '十三元',  // 原：算法產生'壹拾參元'
14: '十四元',  // 原：算法產生'壹拾肆元'
15: '十五元',  // 原：'拾伍元'（已有 specialCase，一併修正）
16: '十六元',  // 原：算法產生'壹拾六元'
17: '十七元',  // 原：算法產生'壹拾七元'
18: '十八元',  // 原：算法產生'壹拾八元'
19: '十九元',  // 原：算法產生'壹拾九元'
```

**影響範圍**：共用模組，所有使用 `convertToTraditionalCurrency()` 的單元同步修正（C 系列、A 系列）。

**修改檔案**：`js/number-speech-utils.js`

---

---

### 2026-02-26：普通模式最後金幣語音順序修正

**問題描述**：

C2 普通模式點擊最後一枚金幣時，僅播放「總共是15元，請選擇正確的答案」，未先單獨播放金額。正確的語音順序應為：先播放金額（「十五元」），再播放完整提示句（「總共是十五元，請選擇正確的答案」）。

**修改內容**：

`js/c2_money_counting.js` `handleItemClick()` 普通模式最後一枚金幣段落，改用巢狀 callback：

```javascript
// 修改前：
this.speak(`總共是 ${traditionalAmount}`, () => {
    Game.Debug.log('speech', '...');
    this.state.isPlayingFinalAmount = false;
    this.proceedToAnswerPhase();
});

// 修改後：
this.speak(traditionalAmount, () => {
    this.speak(`總共是 ${traditionalAmount}，請選擇正確的答案`, () => {
        Game.Debug.log('speech', '🎙️ [C2-語音] 最終金額語音播放完成，進入答題階段');
        this.state.isPlayingFinalAmount = false;
        this.proceedToAnswerPhase();
    });
});
```

**效果**：點擊第3個5元硬幣時，依序播放「十五元」→「總共是十五元，請選擇正確的答案」。

**修改檔案**：`js/c2_money_counting.js`

---

*報告更新時間：2026-02-26*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

## 2026-02-27：Raw setTimeout 修復（第三輪）

**問題**：`js/c2_money_counting.js` 的語音系統（`speech.init()` / `speak()`）使用裸 `setTimeout`，
無法被 `TimerManager.clearAll()` 清除，可能在場景切換後繼續觸發回呼。

| # | 位置 | 原始 | 修復後 |
|---|------|------|--------|
| 1 | `speech.init()` 語音 API 延遲初始化 | `setTimeout(() => {...}, 1000)` | `Game.TimerManager.setTimeout(..., 1000, 'speech')` |
| 2 | `speak()` 音訊未解鎖路徑 | `setTimeout(callback, 100)` | `Game.TimerManager.setTimeout(callback, 100, 'ui')` |
| 3 | `speak()` 語音未就緒路徑 | `setTimeout(callback, 100)` | `Game.TimerManager.setTimeout(callback, 100, 'ui')` |
| 4 | `speak()` 無語音物件路徑 | `setTimeout(callback, 100)` | `Game.TimerManager.setTimeout(callback, 100, 'ui')` |
| 5 | `speak()` 安全逾時（10秒） | `setTimeout(safeCallback, 10000)` | `Game.TimerManager.setTimeout(safeCallback, 10000, 'ui')` |

**修改檔案**：`js/c2_money_counting.js`

---

*報告更新時間：2026-02-27*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

## 2026-02-27（第二輪）：endGame 守衛 + startTime null 修復

### 1. endGame() 重複呼叫防護

**問題**：`endGame()` 無守衛旗標，語音非同步回呼可能導致重複呼叫完成畫面。

**修復**：
- `resetGameState()` 加入 `this.state.isEndingGame = false`
- `endGame()` 開頭加入守衛：
  ```javascript
  if (this.state.isEndingGame) { Game.Debug.log('state', '⚠️ [C2] endGame 已執行過，忽略重複呼叫'); return; }
  this.state.isEndingGame = true;
  ```

### 2. startTime null 防護

**問題**：`endGame()` 計算 `elapsedMs = endTime - this.state.startTime` 未防護 null，
若 `resetGameState()` 後未正常進入遊戲就觸發 endGame，會顯示錯誤時間。

**修復**：
```javascript
// 修復前
const elapsedMs = endTime - this.state.startTime;

// 修復後
const elapsedMs = this.state.startTime ? (endTime - this.state.startTime) : 0;
```

**修改檔案**：`js/c2_money_counting.js`

---

### 2026-02-27：confetti setInterval → 遞迴 TimerManager 模式（第三輪）

**問題**：`triggerConfetti()` 函數中的煙火效果使用裸 `setInterval`，包在 `Game.TimerManager.setTimeout` 回呼中但 setInterval 本身不受 TimerManager 管理，場景切換時 `TimerManager.clearAll()` 無法中途停止動畫計時器。

**修復**：將 `setInterval` 改為遞迴 `Game.TimerManager.setTimeout(fireConfetti, 250, 'confetti')`，確保 `clearAll()` 或 `clearByCategory('confetti')` 可立即停止動畫。

**修改檔案**：`js/c2_money_counting.js`

---

*報告更新時間：2026-02-27*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

### 2026-02-28
- `speak()` 的 `catch` 區塊從 `if (callback) callback()` 改為 `safeCallback()`，防止 `onend` 已觸發後 catch 再次呼叫 callback 導致雙重觸發

---

## 廢棄程式碼稽核（2026-03-01）

**稽核範圍**：`js/c2_money_counting.js`（985 行）

### 結論：無需處理

| 類型 | 位置 | 內容 | 評估 |
|------|------|------|------|
| 清理操作注解 | Line 985 | `// 移除舊的回饋元素` | 操作性注解 |
| console.log | Lines 53+ | Debug 系統內部呼叫 | 已受 FLAGS 守衛，無需處理 |

**整體評估**：程式碼整潔，無實際廢棄程式碼。

### 補充稽核（第二輪）

| 類型 | 位置 | 內容 | 嚴重性 | 建議 |
|------|------|------|--------|------|
| 空 stub 函數（有呼叫點） | Line 951–953 | `hideCustomQuestionInput()` — 同 C1，函數本體僅含注解；被 line 769 呼叫 1 次 | 低 | 可刪除函數並移除呼叫點 |
| 已注解的 alert | Line 945 | `// alert(...)` — 已取消彈窗提示 | 低 | 可清除注解行 |

---

## 跨輪計時器洩漏稽核（2026-03-03）

**稽核背景**：A3 單元曾發現 `speakText()` 10 秒備援計時器在下一輪觸發導致跳輪的 Bug，已對全系列交叉稽核。

**C2 稽核結論：安全（無此問題）**

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

## 跨單元修復（2026-03-05）— 設定頁連結按鈕文字粗黑修復

（詳細說明見 `report/A1_Unit_Completion_Report.md` 跨單元修復章節）

**問題**：`css/ai-theme.css` 全域 `a {}` 規則的 `transition: color` 使 `a.selection-btn { color: #000 !important }` 在 CSS 過渡期間失效，設定頁「開啟獎勵系統」連結按鈕文字呈現藍色而非粗黑。

**修復**：`css/ai-theme.css` 的 `a {}` 和 `a:hover {}` 改為 `a:not(.selection-btn):not(.choice-btn) {}`。

**關鍵搜尋詞**：`a:not(.selection-btn):not(.choice-btn)` in `css/ai-theme.css`

---

## 提示按鈕吉祥物位置修正（2026-03-10）

**問題**：`#question-area` 中，CSS 規則 `#question-area > .hint-button { position: absolute; right: 10px; top: 10px; }` 使 `.hint-button` 脫離文件流。吉祥物 `<img>` 與 `<button class="hint-button">` 為兄弟元素，兩者視覺上不相鄰——吉祥物顯示於上方正常流位置，按鈕浮到右上角。

**修復**（`js/c2_money_counting.js`）：普通模式與困難模式各 1 處，將吉祥物 `<img>` 和 `<button class="hint-button">` 一起包進：
```html
<div style="position:absolute;right:10px;top:10px;display:flex;align-items:center;gap:6px;z-index:100;">
    <img ...>
    <button class="hint-button" ...>...</button>
</div>
```
button 不再是 `#question-area` 的直接子元素，CSS `#question-area > .hint-button` 規則不再套用，無需 inline override。

**關鍵搜尋詞**：`position:absolute;right:10px;top:10px`（`hintBoxHtml` 模板中）
