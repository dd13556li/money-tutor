# C1 認識錢幣 — 單元開發經驗報告書

> **日期**：2026-02-08
> **更新日期**：2026-03-08（設定頁連結按鈕文字修復）
> **時間**：下午
> **單元名稱**：C1 認識錢幣（Money Types & Denominations）
> **系列**：C 貨幣認知

---

## 一、基本資訊

### 檔案清單

| 類型 | 檔案路徑 | 說明 |
|------|---------|------|
| HTML | `html/c1_money_types.html` | 主頁面（177 行，含內嵌觸控/動畫 CSS） |
| JS | `js/c1_money_types.js` | 主邏輯（約 1643 行） |
| CSS | `css/unit6.css`、`css/ai-theme.css`、`css/dark-theme.css`、`css/common-modal-responsive.css` | 共用樣式 |
| 作業單 | `worksheet/units/c1-worksheet.js` | 作業單產生器 |
| 共用工具 | `js/number-speech-utils.js`、`js/audio-unlocker.js`、`js/reward-launcher.js`、`js/theme-system.js`、`js/mobile-debug-panel.js` | 各項支援模組 |
| 圖片 | `images/money/*_yuan_front.png`、`*_yuan_back.png` | 9 種面額正反面共 18 張 |
| 音效 | `audio/correct.mp3`、`audio/error.mp3`、`audio/success.mp3`、`audio/click.mp3` | 正確/錯誤/完成/選單音效 |

### 外部依賴

- **canvas-confetti** (v1.9.2)：完成畫面與答對時的煙火動畫 — ~~原從 CDN 載入~~ → 已改為本地 `js/confetti.browser.min.js`，離線環境可正常使用

---

## 二、單元特色

### 2.1 九種面額貨幣系統

C1 涵蓋台灣全部 9 種常用貨幣面額：

| 類型 | 面額 |
|------|------|
| 硬幣（4 種） | 1 元、5 元、10 元、50 元 |
| 紙鈔（5 種） | 100 元、200 元、500 元、1000 元、2000 元 |

每種面額皆有正面（front）與背面（back）圖片，題目與選項中隨機顯示其中一面（`getRandomImage()` 以 50% 機率選擇正面或背面），增加辨識挑戰性。

### 2.2 三種難度模式

| 特性 | 簡單 | 普通 | 困難 |
|------|------|------|------|
| 題目呈現 | 看圖片（顯示貨幣圖） | 看文字（顯示面額名稱） | 聽聲音（語音播報面額） |
| 選項呈現 | 貨幣圖片 + 面額名稱 | 貨幣圖片 + 面額名稱 | 貨幣圖片 + 面額名稱 |
| 語音播報 | 題目語音 + hover 語音 | 題目語音 + hover 語音 | 題目語音 + 播放按鈕重聽 + hover 語音 |
| 互動方式 | 直接點選 | 直接點選 | 先聽再選 |

困難模式額外提供 SVG 播放按鈕，讓學生可反覆點擊重聽題目語音。

### 2.3 兩種測驗模式

| 模式 | 說明 |
|------|------|
| 反複作答（retry） | 答錯後顯示中央回饋「❌ 答錯了，再試一次！」，選項重新解鎖，學生可繼續嘗試直到答對 |
| 單次作答（proceed） | 答錯後依序顯示：(1) 紅色 × 標記在錯誤選項上 + 語音告知選錯的面額；(2) 綠色 ✓ 標記在正確選項上 + 語音告知正確答案，然後自動進入下一題 |

### 2.4 動態選項數量

選項數量根據面額池大小自動調整：

- **硬幣模式**：4 個選項（`Math.min(4, 5)` = 4，因硬幣僅 4 種面額）
- **紙鈔模式**：5 個選項（`Math.min(5, 5)` = 5）
- **混合模式**：5 個選項（`Math.min(9, 5)` = 5）

這是 Bug #2 修正後的行為——原本硬幣模式因不足 5 個選項會靜默切換為混合模式。

### 2.5 傳統中文貨幣語音

所有金額語音透過 `convertToTraditionalCurrency()` 轉換（委派至 `NumberSpeechUtils.convertToTraditionalCurrency()`），遵循台灣傳統貨幣唸法：

| 面額 | 語音 |
|------|------|
| 1 元 | 壹元 |
| 5 元 | 伍元 |
| 10 元 | 拾元 |
| 50 元 | 伍拾元 |
| 100 元 | 壹佰元 |
| 200 元 | 兩百元 |
| 500 元 | 伍佰元 |
| 1000 元 | 壹仟元 |
| 2000 元 | 兩千元 |

注意「200 元」與「2000 元」使用「兩」而非「貳」，遵循百位以上「2」唸「兩」的規則。

### 2.6 獎勵與作業單系統整合

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
├── gameData              # 靜態資料（標題、副標題、9 種面額定義）
│   └── items
│       ├── coins[]       # 硬幣（4 種，含 front/back 圖片路徑）
│       └── notes[]       # 紙鈔（5 種，含 front/back 圖片路徑）
├── state                 # 集中式狀態管理
├── elements              # DOM 元素快取
├── speech                # 語音子系統（init、speak）
├── unlockAudio()         # 音頻解鎖系統
├── convertToTraditionalCurrency()  # 貨幣語音轉換（委派 NumberSpeechUtils）
├── init() / start()      # 初始化與遊戲流程
├── showSettings()        # 設定頁面渲染
├── handleSelection()     # 事件委派處理
├── setupQuizUI()         # 測驗頁面渲染
├── generateQuestions()   # 題目生成
├── loadNextQuestion()    # 載入下一題
├── renderOptions()       # 選項渲染
├── checkAnswer()         # 答題檢查
├── showCenterFeedback()  # 中央回饋覆蓋層
├── endGame()             # 完成畫面（含內嵌 CSS）
├── showNumberInput()     # 自訂題數數字鍵盤
├── startFireworksAnimation()  # 答對煙火
└── triggerConfetti()     # 完成煙火
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
  settings: {
    category: null,            // 'coins' | 'notes' | 'mixed'
    difficulty: null,          // 'easy' | 'normal' | 'hard'
    mode: null,                // 'retry' | 'proceed'
    questionCount: null        // 1 | 3 | 5 | 10 | 自訂(1-100)
  }
}
```

### 3.3 題目生成邏輯

`generateQuestions()` 的運作流程：

1. 根據 `category` 決定面額來源池（`coins` / `notes` / 合併）
2. 動態計算選項數 `minOptionsNeeded = Math.min(sourceData.length, 5)`
3. 每題隨機抽取 1 個正確答案 + (N-1) 個干擾選項
4. 干擾選項使用 `filter` + `splice` 確保不重複（雙重檢查 `value` 和 `name`）
5. 最終以 Fisher-Yates 洗牌（`shuffleArray()`）打亂選項順序

**注意**：C1 不使用 `getRandomIntExcluding()` 防重複（與 F3 不同），當面額池較小時可能出現連續相同面額的題目。

### 3.4 事件委派模式

設定頁面使用單一事件委派處理所有設定按鈕：

```
gameSettings.addEventListener('click', handleSelection)
    ↓
handleSelection(event)
    ├── event.target.closest('.selection-btn') 取得按鈕
    ├── btn.dataset.type → 判斷設定類型
    ├── btn.dataset.value → 取得設定值
    ├── 更新 state.settings
    ├── 更新 active 類別
    └── updateStartButton() 檢查完整性
```

優點：避免為每個按鈕單獨綁定事件，DOM 重建後無需重新綁定。

### 3.5 答題檢查流程

`checkAnswer()` 的完整流程：

```
checkAnswer(event, correctAnswer)
    ├── synth.cancel()           # 停止選項 hover 語音
    ├── isAnswering = true       # 鎖定
    ├── 全選項 pointerEvents = 'none'  # 禁止點擊
    │
    ├─ 正確 ─→ score++
    │         → showCenterFeedback('🎉')
    │         → correct-sound.play()
    │         → startFireworksAnimation()
    │         → speak('答對了') → 1200ms → loadNextQuestion()
    │
    └─ 錯誤 ─→ 200ms 延遲後
              ├─ retry 模式 ─→ showCenterFeedback('❌')
              │               → speak('再試一次') → 500ms
              │               → 解鎖選項 + isAnswering = false
              │
              └─ proceed 模式 ─→ 紅色 × 標記錯誤選項
                              → speak('你選的是 X 元')
                              → 綠色 ✓ 標記正確選項
                              → speak('這才是 Y 元') → 1500ms
                              → loadNextQuestion()
```

### 3.6 自訂題數數字鍵盤

`showNumberInput()` 提供彈窗式數字鍵盤：

- **佈局**：3×4 九宮格（1-9 + 清除/0/確認）
- **限制**：最多 3 位數（即最大 999，但 callback 限制 1-100）
- **樣式**：確認=綠色、清除=黃色、數字=灰色
- **關閉**：紅色圓形 × 按鈕
- **防重複**：`if (document.getElementById('number-input-popup')) return`

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
| 歡迎語音 | `start()` → 500ms 延遲後 | 「請看圖片/文字/聽聲音，選出正確錢幣或紙鈔」 |
| 題目語音 | `loadNextQuestion()` | 「請找出 {傳統中文面額}」 |
| 選項 hover | `mouseenter` / `touchstart` | 該選項的傳統中文面額 |
| 困難模式重聽 | 點擊播放按鈕 | 同題目語音 |
| 答對回饋 | `checkAnswer()` 正確時 | 「恭喜你答對了，進入下一題/測驗結束」 |
| 答錯回饋（retry） | `checkAnswer()` 錯誤 + retry | 「答錯了，再試一次」 |
| 答錯回饋（proceed） | `checkAnswer()` 錯誤 + proceed | 第一段：「對不起你答錯了，你選擇的是 X 元」；第二段：「這才是 Y 元，進入下一題/測驗結束」 |
| 完成語音 | `endGame()` → 100ms 後 | 依正確率：「太厲害了全部答對」/「很棒喔答對N題」/「不錯喔」/「要再加油喔」 |

### 4.5 NumberSpeechUtils 整合

C1 使用 C/A 系列專用的 `convertToTraditionalCurrency()`，而非 F 系列的 `convertToPureNumberSpeech()`：

| 函數 | 系列 | 「2」的處理 |
|------|------|-----------|
| `convertToTraditionalCurrency()` | C/A 系列 | 百位以上用「兩」，個位用「貳」 |
| `convertToPureNumberSpeech()` | F 系列 | 一律用「貳」 |

C1 透過 `Game.convertToTraditionalCurrency(amount)` 委派至 `NumberSpeechUtils.convertToTraditionalCurrency(amount)`。

---

## 五、觸控與桌面支援

### 5.1 事件綁定策略

C1 採用多重事件綁定確保跨平台相容：

| 事件類型 | 綁定目標 | 用途 |
|---------|---------|------|
| `click` | `.selection-btn`（委派）、選項 `product-item`、返回按鈕 | 主要互動事件 |
| `touchend` | 選項 `product-item` | 行動裝置答題（`preventDefault` + `passive: false`） |
| `touchstart` | 選項 `product-item` | 行動裝置 hover 語音觸發 |
| `mouseenter` | 選項 `product-item` | 桌面端 hover 語音觸發 |
| `keydown` | 選項 `product-item`（`Enter`/`Space`） | 鍵盤無障礙支援 |

### 5.2 CSS 觸控優化

HTML 內嵌 CSS 提供以下觸控優化（約 60 行）：

| CSS 屬性 | 作用 |
|---------|------|
| `touch-action: manipulation` | 禁止雙擊縮放，加速觸控回應 |
| `-webkit-user-select: none` | 防止長按選取文字 |
| `-webkit-touch-callout: none` | 防止長按彈出選單 |
| `transform: scale(0.95)` | `:active` 觸控回饋（縮小效果） |
| `transform: scale(1.02)` | `:hover` 桌面回饋（放大效果） |
| `pointer-events: none` | 圖片元素不攔截觸控事件 |
| `overscroll-behavior-y: contain` | `html/body/#app` 三層防止下拉重新整理 |

### 5.3 音頻解鎖系統（雙路徑）

`Game.unlockAudio()` 使用兩種方式解鎖行動裝置音頻限制：

1. **AudioContext 路徑**：建立空白 buffer → `createBufferSource()` → `start(0)`
2. **HTML Audio 路徑**：建立 `new Audio()` → 播放 Base64 靜音 MP3 → `pause()` → `currentTime = 0`

兩者並行執行（`await testAudio.play()`）。解鎖成功後設 `audioUnlocked = true`。失敗時也設 `true` 避免重複嘗試。

**注意**：C1 同時引入了外部 `audio-unlocker.js`（監聽全域首次互動事件），形成雙重解鎖機制（見 7.2 注意事項）。

### 5.4 isAnswering 防連點鎖定

答題後立即設 `isAnswering = true` + 全選項 `pointerEvents = 'none'`，雙重防護：

- `isAnswering`：阻擋 hover 語音在答題期間觸發
- `pointerEvents`：阻擋觸控/點擊事件

retry 模式在 500ms 後解鎖；proceed 模式在進入下一題時由 `loadNextQuestion()` 重置。

### 5.5 鍵盤無障礙支援

每個選項設 `tabindex="0"` + `role="button"`，監聽 `keydown` 事件（`Enter` 或 `Space` 觸發 `checkAnswer`），支援鍵盤導航與操作。

---

## 六、版面設計

### 6.1 三階段畫面流程

```
設定頁面（showSettings）→ 測驗頁面（setupQuizUI）→ 完成頁面（endGame）
```

所有畫面皆動態渲染至 `<div id="app">`，透過 `innerHTML` 替換內容。

### 6.2 設定頁面

由 `showSettings()` 渲染，包含 6 組設定：

| 設定 | 選項 | 說明 |
|------|------|------|
| 難度 | 簡單/普通/困難 | 附動態說明文字（`getDifficultyDescription()`） |
| 面額 | 硬幣/紙鈔/混合 | 決定面額來源池 |
| 題數 | 1/3/5/10/自訂 | 自訂使用數字鍵盤（1-100） |
| 測驗模式 | 反複作答/單次作答 | 決定答錯行為 |
| 獎勵系統 | 開啟獎勵系統 | 連結至 reward 模組 |
| 作業單 | 產生作業單 | 傳遞參數至 worksheet 模組 |

開始按鈕動態狀態：未完成所有必要設定時顯示「請完成所有選擇」（disabled），完成後顯示「開始測驗！」（enabled）。

### 6.3 測驗頁面

由 `setupQuizUI()` 渲染，採 `store-layout` 結構：

| 區域 | DOM 結構 | 說明 |
|------|---------|------|
| 標題列 | `.title-bar`（sticky） | 左：進度 / 中：標題 / 右：獎勵+返回 |
| 題目區 | `.unified-task-frame` > `#question-area` | 依難度顯示圖片/文字/播放按鈕 |
| 回饋區 | `#feedback-area` | 預設隱藏，用於行內回饋 |
| 選項區 | `#options-area` | 動態渲染選項卡片 |

### 6.4 選項排列

選項使用 `.products-grid.horizontal-layout`（flexbox 水平排列），每個選項為 `.product-item`：

- 包含貨幣圖片（`<img>`）+ 面額名稱（`.product-name`）
- 正確答案在簡單模式下顯示與題目相同的圖片面（正面或背面）
- 其他選項隨機顯示正面或背面

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

- `showCenterFeedback(icon, color, text)`：動態建立 `#center-feedback` 元素，append 至 `document.body`
- `hideCenterFeedback()`：移除該元素
- 答對：🎉 綠色 + 「答對了！」
- 答錯（retry）：❌ 紅色 + 「答錯了，再試一次！」

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

**HTML 內嵌觸控 CSS**：

| 選擇器 | 功能 |
|--------|------|
| `.correct-check-mark` | 綠色 ✓ 標記（absolute 定位 + `checkMarkAppear` 動畫） |
| `.wrong-cross-mark` | 紅色 × 標記（同上 + `wrongMarkAppear` 動畫） |
| `.product-item` | `position: relative`（容納標記圖示） |

---

## 七、注意事項

### 7.1 語音初始化時機

`speech.init()` 在 `Game.init()` 中呼叫（即 `DOMContentLoaded` 時）。部分瀏覽器的 `getVoices()` 在此時返回空陣列，需依賴 `voiceschanged` 事件或延遲重試。語音系統在使用者首次互動前可能尚未就緒，但 `audioUnlocked` 檢查會在此期間跳過語音播放，不影響流程。

### 7.2 雙重音頻解鎖系統

C1 同時存在兩套音頻解鎖機制：

1. **`Game.unlockAudio()`**：在 `handleSelection()` 和 `start()` 中手動呼叫，使用 AudioContext + HTML Audio 雙路徑
2. **`audio-unlocker.js`**：全域模組，監聽首次使用者互動事件自動解鎖，觸發 `audiounlocked` 自訂事件

兩者功能重疊但互不干擾。`Game.unlockAudio()` 只控制 `state.audioUnlocked` 旗標（影響 `speech.speak()` 是否執行），`audio-unlocker.js` 控制底層 `AudioContext` 狀態（影響 `<audio>` 元素播放）。

### 7.3 事件監聽器重建

每次呼叫 `showSettings()` 都會用 `innerHTML` 完全重建 DOM，之前綁定的事件監聽器全部失效。因此：

- 設定按鈕使用事件委派（綁在 `.game-settings` 容器上）
- 獎勵/作業單連結在 `showSettings()` 每次執行後重新綁定 `addEventListener`
- `start()` 按鈕在每次 `showSettings()` 後重新綁定

這不會造成記憶體洩漏（舊 DOM 被 `innerHTML` 覆蓋時自動回收），但需注意每次重建的一致性。

### 7.4 endGame() 內嵌 CSS

完成畫面的約 250 行 CSS 透過 `<style>` 標籤內嵌於 `endGame()` 的 `innerHTML` 中。這意味著：

- 每次進入完成畫面都會重新插入 `<style>` 標籤
- CSS 無法被瀏覽器單獨快取
- 與其他 17 個單元的完成畫面 CSS 存在大量重複
- 但優點是樣式與邏輯高度內聚，單一檔案即可維護

### 7.5 自訂題數範圍（1-100）

`showNumberInput()` 的 callback 限制 `1 ≤ questionCount ≤ 100`，但面額池最大僅 9 種。當題數超過面額數時，`generateQuestions()` 仍可正常運作（每題獨立從池中抽取），但會出現大量重複題目。對於硬幣模式（僅 4 種面額），大題數時重複更明顯。

### 7.6 圖片路徑一致性（Bug #1 教訓）

200 元紙鈔背面原始檔名為 `200_yuan_back..png`（雙點），導致圖片無法載入。教訓：

- 圖片路徑需與實際檔名嚴格一致
- 建議建立圖片路徑驗證機制（開發階段檢查所有 `src` 是否可存取）
- 所有面額遵循 `{value}_yuan_{front|back}.png` 命名規則

### 7.7 外部 CDN 依賴（已修正）

~~canvas-confetti 從 CDN 載入，離線環境無法使用。~~ **已修正**：canvas-confetti v1.9.2 已下載至本地端 `js/confetti.browser.min.js`，所有 18 個單元的 HTML 已統一引用本地版本，離線環境可正常使用煙火動畫。

程式碼中仍保留防護機制（在 confetti 載入失敗時安全降級）：

- `triggerConfetti()`：`if (typeof confetti !== 'function') return`
- `startFireworksAnimation()`：`if (window.confetti) { ... }`

煙火僅為視覺增強，即使載入失敗也不影響核心功能。

### 7.8 狀態管理現況

| 項目 | 狀態 |
|------|------|
| 統一重置函數 | ✅ `resetGameState()` |
| 布林旗標 | `isAnswering`, `audioUnlocked` |
| 重置位置 | 集中（2 處調用） |
| 評價 | ✅ **最佳實踐** |

**說明**：C1 已實現統一的 `resetGameState()` 函數，在 `showSettings()` 和 `start()` 中調用，集中管理所有遊戲狀態的重置

**重置項目**：`score`, `currentQuestionIndex`, `quizQuestions`, `isAnswering`, `startTime`

**搜尋關鍵字**：`resetGameState`

---

## 八、Bug 檢測歷史

### Bug #1：200 元紙鈔背面圖檔名稱錯誤

| 項目 | 內容 |
|------|------|
| **問題** | `images/money/200_yuan_back..png` 檔名含雙點（`..png`），導致 200 元紙鈔背面圖片無法載入 |
| **根本原因** | 檔案命名時的人為疏失，多加了一個點號 |
| **修正方式** | 1. 重新命名檔案為 `200_yuan_back.png`；2. 更新 `js/c1_money_types.js` 中的路徑引用 |
| **影響範圍** | 簡單模式中出現 200 元背面題目時圖片破圖 |

### Bug #2：硬幣模式出現紙鈔

| 項目 | 內容 |
|------|------|
| **問題** | 選擇「硬幣」模式時，由於硬幣僅 4 種不足 5 個選項，系統靜默切換為混合模式，紙鈔出現在硬幣模式中 |
| **根本原因** | `minOptionsNeeded` 硬編碼為 5，當面額池不足 5 種時觸發 fallback 邏輯切換至混合模式 |
| **修正方式** | `minOptionsNeeded` 改為 `Math.min(sourceData.length, 5)`，硬幣模式自然顯示 4 個選項 |
| **附帶清理** | 移除不再需要的 `showToast()` 方法和靜默切換邏輯 |

### Bug #3：「返回設定」按鈕導向錯誤

| 項目 | 內容 |
|------|------|
| **問題** | 測驗畫面標題列「返回設定」按鈕跳轉至 `../index.html#part2`（主選單），而非回到本單元設定頁面 |
| **根本原因** | `setupQuizUI()` 中返回按鈕使用 `window.location.href` 導航至首頁，應呼叫 `Game.showSettings()` |
| **修正方式** | 將 `window.location.href` 改為 `Game.showSettings()` |
| **影響範圍** | 使用者想調整設定時被帶離單元，需重新從首頁進入 |

### Bug #4：兩個不一致的語音播放方法

| 項目 | 內容 |
|------|------|
| **問題** | 存在 `Game.speech.speak()`（完整版）和 `Game.speak()`（簡化版）兩個方法，部分場景使用簡化版缺少安全機制 |
| **根本原因** | 開發過程中先建立簡化版，後來新增完整版但未統一呼叫路徑 |
| **修正方式** | `Game.speak(text, callback)` 改為單行委派 `this.speech.speak(text, callback)`，確保所有語音走同一路徑 |
| **影響範圍** | `loadNextQuestion()` 和 `checkAnswer()` 中的語音在行動裝置可能因缺少 audioUnlocked 檢查而靜默失敗 |

### Bug #5：audio-unlocker.js 殘留除錯日誌

| 項目 | 內容 |
|------|------|
| **問題** | `js/audio-unlocker.js` 中殘留 `console.log("[F3-除錯] 視覺化除錯系統已啟動")`，載入 C1 時輸出不相關訊息 |
| **根本原因** | 開發 F3 時在共用模組中加入的除錯日誌未清除 |
| **修正方式** | 刪除該行除錯日誌 |
| **影響範圍** | 所有引用 `audio-unlocker.js` 的單元（17 個）均會輸出無關訊息 |

### Fix #6：canvas-confetti CDN 改為本地載入

| 項目 | 內容 |
|------|------|
| **問題** | canvas-confetti 從外部 CDN (`cdn.jsdelivr.net`) 載入，離線環境無法使用煙火動畫；且 18 個單元存在兩個版本（v1.6.0 和 v1.9.2）不一致 |
| **根本原因** | 開發時直接引用 CDN，未考慮離線使用場景 |
| **修正方式** | 1. 下載 canvas-confetti v1.9.2 至 `js/confetti.browser.min.js`；2. 將 `html/c1_money_types.html` 的 CDN `<script>` 改為 `<script src="../js/confetti.browser.min.js">` |
| **附帶修正** | 其餘 17 個單元 HTML 同步改為本地引用，統一版本為 v1.9.2（原 A1、A4、A5、C4、A6 為 v1.6.0） |
| **影響範圍** | 全部 18 個單元，離線環境煙火動畫恢復正常 |

### Cleanup：移除未使用的 HTML 音效元素

| 項目 | 內容 |
|------|------|
| **問題** | `html/c1_money_types.html` 中有 `<audio id="select-sound">` 和 `<audio id="click-sound">` 未被 JS 引用 |
| **根本原因** | JS 使用 `new Audio()` 建構子直接載入音效，HTML 元素為早期開發遺留 |
| **修正方式** | 移除兩個未使用的 `<audio>` 元素 |

---

## 九、未來開發建議

### 9.1 檔案分類改進

**JS 目錄重構**：目前 `js/` 目錄混合了 18 個單元檔案與 7 個工具檔案。建議拆分：

```
js/
├── units/          # 各單元邏輯（a1~a6、c1~c6、f1~f6）
└── shared/         # 共用工具（reward-launcher、number-speech-utils 等）
```

**清除未使用 CSS**：專案中有 14 個 `*_ipad.css` 和 1 個未引用的 `c6_making_change.css`，共 15 個未使用 CSS 檔案可清除。

**A1 引用差異**：A1 是唯一不引用 `theme-system.js`、`audio-unlocker.js`、`mobile-debug-panel.js` 的單元。建議統一所有單元的 HTML 引用清單。

### 9.2 程式碼架構改進

**提取完成畫面模組**：`endGame()` 中約 250 行內嵌 CSS 在 18 個單元中各自實作，存在大量重複。建議提取為共用模組：

```javascript
// 建議：shared/completion-screen.js
CompletionScreen.render({
  type: 'cf',          // 'cf' = C/F系列 | 'a' = A系列
  correctCount: 8,
  totalCount: 10,
  startTime: timestamp,
  onRestart: () => {},
  onSettings: () => {}
});
```

**集中 Config 常數**：以下數值散佈於程式碼各處，建議集中管理：

| 常數 | 目前值 | 出現位置 |
|------|--------|---------|
| 選項上限 | 5 | `generateQuestions()` |
| 自訂題數上限 | 100 | `showCustomQuestionInput()` callback |
| 歡迎語音延遲 | 500ms | `start()` |
| 答對後等待 | 1200ms | `checkAnswer()` 正確分支 |
| 答錯後等待 | 500ms / 1500ms | `checkAnswer()` retry/proceed 分支 |
| 安全超時 | 10000ms | `speech.speak()` |
| 語音重試上限 | 5 次 | `speech.init()` |

**DOM 快取**：`Game.elements` 目前僅快取 3 個元素（questionArea、optionsArea、feedbackArea）。其他頻繁存取的元素（如 progress-info、options-title）每次都用 `querySelector` 查詢，可考慮擴充快取。

**消除全域 Game**：`Game` 作為全域變數（`let Game`），供 HTML `onclick` 屬性呼叫。建議改用事件委派或 `addEventListener`，避免全域污染。

### 9.3 現有可改進之處

| 問題 | 說明 | 建議 |
|------|------|------|
| 重複 `synth.cancel()` | `speech.speak()` 中連續呼叫兩次 `cancel()`（第 249 行和第 272 行） | 合併為一次 |
| 缺少 ARIA 標籤 | 選項有 `role="button"` 和 `tabindex` 但缺少 `aria-label`（面額名稱） | 新增 `aria-label="${option.name}"` |
| 硬編碼音效路徑 | `new Audio('../audio/click.mp3')` 在 `initAudio()` 中硬編碼 | 集中至 soundMap 或 config |
| `console.log` 無開關 | 大量除錯日誌無全域開關，生產環境仍輸出 | 建立類似 F3 `Game.Debug` 的分類日誌系統 |
| 內嵌 CSS 約 250 行 | `endGame()` 樣式內嵌於 JS | 提取為獨立 CSS 檔案或共用模組 |
| 事件重建 | `showSettings()` 每次呼叫重建所有 DOM 和事件 | 可考慮 DOM diff 或保留設定狀態而非重建 |
| 無防連續重複題目 | `generateQuestions()` 不檢查相鄰題目是否重複 | 可加入類似 F3 的 `getRandomIntExcluding()` 機制 |

### 9.4 教學功能擴充建議

| 建議 | 說明 |
|------|------|
| 難度自適應 | 根據學生的正確率動態調整題目難度 |
| 錯題記錄 | 記錄學生常犯錯的面額，提供加強複習功能 |
| 多語言支援 | 可擴充英語等語言的貨幣面額辨識 |
| 觸覺回饋 | 行動裝置加入震動回饋（`navigator.vibrate()`），增強互動體驗 |

### 9.5 已知限制

| 限制 | 說明 | 建議處理 |
|------|------|---------|
| 硬幣模式選項數量 | 硬幣僅 4 種面額，每題只有 4 個選項（設計合理，非 Bug） | 可在說明文字中告知使用者 |
| 行動裝置語音 | 部分行動裝置無中文語音引擎，困難模式（聽聲音）會靜音 | 程式已有 fallback，可在 UI 增加提示 |
| 面額使用頻率 | 200 元和 2000 元紙鈔在日常生活中較少見，可能影響學習效果 | 可考慮在說明中標注使用頻率 |

---

## 十、總結

C1 認識錢幣單元以簡潔的架構實現了完整的貨幣辨識教學功能。透過三種難度模式（看圖/看文字/聽聲音）和兩種測驗模式（反複作答/單次作答）的組合，適應不同程度的學習者。語音系統採用 5 級 fallback + 6 項安全機制，確保跨平台穩定性。動態選項數量的設計（Bug #2 修正後）優雅地處理了硬幣模式面額不足的邊界情況。

後續修正中，canvas-confetti 已從 CDN 改為本地載入（Fix #6），解決了離線環境煙火動畫失效的問題，同時統一了 18 個單元的版本（v1.9.2）。

主要改進空間在於：將內嵌 CSS 與重複的完成畫面程式碼提取為共用模組、建立分類日誌系統取代散布的 `console.log`、以及統一事件綁定策略消除全域 `Game` 的依賴。這些改進不影響現有功能，但能顯著降低日後維護成本，並為其他 C 系列單元的開發提供可複用的基礎設施。

---

## 十一、驗證記錄

### 2026-02-16：系統性驗證

**驗證內容**：

| 項目 | 狀態 | 說明 |
|------|------|------|
| TimerManager | ✅ 已完成 | 13 個 setTimeout 統一管理（2026-02-23 v2.1.0，分類：question/ui/drag/speech） |
| EventManager | ✅ 已完成 | 12 個 addEventListener 統一管理（2026-02-23 v2.1.0，分類：settings/dragSystem/gameUI） |
| injectGlobalAnimationStyles | ✅ 已完成 | 動畫定義統一至 injectGlobalAnimationStyles() |
| endGame() | ✅ 正常 | 採用 C/F 系列統一完成畫面樣式 |
| confetti 煙火 | ✅ 正常 | 使用 v1.9.2 本地化版本 |

**建議改進（P1）**：
- ~~引入 TimerManager 統一管理 13 個 setTimeout~~ ✅ 已於 2026-02-23 完成
- ~~引入 EventManager 統一管理 13 個 addEventListener~~ ✅ 已於 2026-02-23 完成

**結論**：C1 功能正常，記憶體管理標準已達成（TimerManager 13個 + EventManager 12個 + injectGlobalAnimationStyles 均已實作）。

---

## 十二、重構記錄

### 2026-02-17：狀態管理重構（resetGameState）

**問題**：
- 狀態重置邏輯分散於 3 個不同位置
- 容易遺漏導致狀態殘留
- 不符合 A4/A5 等單元的最佳實踐

**修改內容**：

1. **新增 `resetGameState()` 函數**
   - 集中管理所有遊戲相關狀態的重置
   - 重置項目：`score`, `currentQuestionIndex`, `quizQuestions`, `isAnswering`, `startTime`
   - 輸出日誌：`🔄 [C1] 遊戲狀態已重置`

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
    console.log('🔄 [C1] 遊戲狀態已重置');
}
```

**驗證方式**：
1. 開啟 C1 認識錢幣
2. 完成部分測驗後點擊「返回設定」
3. Console 應顯示「🔄 [C1] 遊戲狀態已重置」
4. 重新開始測驗，確認題目從第 1 題開始、分數為 0

**搜尋關鍵字**：`resetGameState`

---

---

## 十三、測試步驟

### Bug #1 測試：200 元紙鈔背面圖片
1. 開啟 `html/c1_money_types.html`
2. 設定：簡單 → 紙鈔 → 3 題 → 反複作答 → 開始測驗
3. 反覆作答直到出現 200 元題目
4. **預期結果**：200 元紙鈔正面和背面圖片都能正常顯示

### Bug #2 測試：硬幣模式只出現硬幣
1. 開啟 `html/c1_money_types.html`
2. 設定：簡單 → **硬幣** → 3 題 → 反複作答 → 開始測驗
3. **預期結果**：
   - 所有題目和選項只出現硬幣（1/5/10/50 元）
   - 每題顯示 4 個選項
   - 不會出現紙鈔，不會出現 Toast 提示
4. 再測試**紙鈔**模式 → 確認每題 5 個選項，只有紙鈔
5. 再測試**混合**模式 → 確認每題 5 個選項，硬幣和紙鈔混合

### Bug #3 測試：返回設定按鈕
1. 開啟 `html/c1_money_types.html`
2. 完成所有設定 → 開始測驗
3. 點擊標題列右側的「返回設定」按鈕
4. **預期結果**：回到本單元的設定頁面（非主選單）

### Bug #4 測試：語音播放一致性
1. 開啟 `html/c1_money_types.html`
2. 設定：困難 → 混合 → 3 題 → 反複作答 → 開始測驗
3. 點擊播放按鈕聽題目
4. 選擇正確/錯誤答案
5. **預期結果**：所有語音提示正常播放，無重疊或遺漏

### Bug #5 測試：console 無殘留日誌
1. 開啟瀏覽器開發者工具 Console
2. 開啟 `html/c1_money_types.html`
3. **預期結果**：Console 中不會出現 `[F3-除錯]` 相關訊息

### Cleanup 測試：HTML 音效元素
1. 開啟 `html/c1_money_types.html`
2. 在開發者工具 Console 輸入 `document.getElementById('select-sound')`
3. **預期結果**：回傳 `null`（元素已移除）

### Fix #6 測試：本地 confetti 煙火動畫
1. 確認 `js/confetti.browser.min.js` 檔案存在
2. 斷開網路連線（離線模式）
3. 開啟 `html/c1_money_types.html`
4. 完成測驗到結束畫面
5. **預期結果**：完成畫面煙火動畫正常顯示（離線環境下）
6. 抽查其他單元（如 A1、F1）確認煙火正常

---

## 十四、Debug Logger 統一日誌系統

### 修改日期
2026-02-21

### 修改內容
將所有 `console.log`、`console.warn`、`console.error` 調用轉換為統一的 `Game.Debug` 分類開關系統。

### 統計
- **轉換前**：37 個 console 調用
- **轉換後**：40 個 Game.Debug 調用
- **保留未轉換**：3 個（Debug 系統內部實現）

### FLAGS 分類（8 個）

```javascript
Debug: {
    FLAGS: {
        all: false,        // 全域開關（開啟後顯示所有分類）
        init: false,       // 初始化相關
        speech: false,     // 語音系統
        audio: false,      // 音效系統
        ui: false,         // UI 渲染
        question: false,   // 題目生成
        state: false,      // 狀態變更
        answer: false,     // 答案檢查
        error: true        // 錯誤訊息（預設開啟）
    }
}
```

### 使用方式

```javascript
// 在瀏覽器 Console 中開啟特定分類
Game.Debug.FLAGS.all = true;       // 開啟全部
Game.Debug.FLAGS.speech = true;    // 只開啟語音相關
Game.Debug.FLAGS.question = true;  // 只開啟題目相關
Game.Debug.FLAGS.answer = true;    // 只開啟答案檢查相關
```

### 保留未轉換的調用（3 個）

- `console.log('[C1-${category}]', ...args)` — Game.Debug.log 內部實現
- `console.warn('[C1-${category}]', ...args)` — Game.Debug.warn 內部實現
- `console.error('[C1-ERROR]', ...args)` — Game.Debug.error 內部實現

### 搜尋關鍵字
- `Game.Debug.FLAGS`
- `Game.Debug.log`
- `Game.Debug.warn`
- `Game.Debug.error`

---

---

## 十五、重構記錄

### 2026-02-23：動畫定義整合（injectGlobalAnimationStyles）

**問題**：
- 4 個 `@keyframes` 定義內嵌於 `endGame()` 的 `<style>` 標籤中
- 每次進入完成畫面都重複插入動畫定義
- 不符合 C6 等單元的最佳實踐

**移除的 @keyframes 位置**：

| 位置 | @keyframes |
|------|-----------|
| `endGame()` 內嵌 `<style>` | `fadeIn`, `celebrate`, `bounce`, `glow` |

**修改內容**：

1. **新增 `injectGlobalAnimationStyles()` 函數**
   - Style ID：`c1-global-animations`
   - 包含 4 個唯一動畫：`fadeIn`, `celebrate`, `bounce`, `glow`
   - 具備 idempotency 防重複插入檢查

2. **`init()` 新增調用**
   ```javascript
   this.injectGlobalAnimationStyles();
   ```

3. **移除 `endGame()` 內嵌 @keyframes**（4 個）

**無嵌套物件問題**：確認無 `this.Debug` 誤用（C1 使用 `Game.Debug` 直接引用）

**搜尋關鍵字**：`injectGlobalAnimationStyles`, `c1-global-animations`

---

## 十六、版本歷史

| 版本 | 日期 | 修改內容 |
|------|------|---------|
| 原始版本 | 2026-02-08 | 基礎功能完成 |
| — | 2026-02-08 | Bug #1~#5 修正、Cleanup |
| — | 2026-02-09 | Fix #6：canvas-confetti 本地化（v1.9.2） |
| — | 2026-02-17 | 狀態管理重構（resetGameState 統一函數） |
| 2.0.0 | 2026-02-21 | Debug Logger 統一日誌系統（37 → 40 Game.Debug 調用） |
| 2.0.1 | 2026-02-23 | 動畫定義整合（injectGlobalAnimationStyles，4 個 @keyframes 統一管理） |
| 2.1.0 | 2026-02-23 | 記憶體管理：TimerManager（13個）+ EventManager（12個），3 個 clearAll/removeAll 呼叫點 |

---

## 十七、記憶體管理實作（v2.1.0）

### 實作範圍

| 項目 | 數量 | 說明 |
|------|------|------|
| TimerManager 遷移 | 13 個 | `setTimeout` → `Game.TimerManager.setTimeout` |
| EventManager 遷移 | 12 個 | `addEventListener` → `Game.EventManager.on` |
| clearAll 呼叫點 | 3 個 | `init()` / `showSettings()` / `start()` |
| 保留 raw setTimeout | 1 個 | TimerManager 內部定義（正確） |
| 保留 raw addEventListener | 1 個 | EventManager 內部定義（正確） |

### setTimeout 分類

| 分類 | 數量 | 說明 |
|------|------|------|
| `'question'` | 3 | loadNextQuestion、nextQuestion、endGame |
| `'ui'` | 7 | DOM 更新、classList、動畫 |
| `'drag'` | 2 | isDragging 重設 |
| `'speech'` | 1 | 語音播放 |

### addEventListener 分類

| 分類 | 數量 | 說明 |
|------|------|------|
| `'settings'` | 4 | gameSettings、startBtn、settingsRewardLink、worksheetLink |
| `'dragSystem'` | 5 | dragstart、dragend、dragover、dragleave、drop |
| `'gameUI'` | 3 | click 按鈕、completion 連結 |

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

**修改檔案**：`js/c1_money_types.js`

---

---

### 2026-02-26：普通模式題目喇叭重播按鈕

**問題描述**：

普通模式測驗中，題目（如「請找出以下錢幣/紙鈔 10元」）缺少語音重播按鈕，學生無法重複聆聽題目，與困難模式體驗不一致。

**修改內容**：

- `js/c1_money_types.js` `loadNextQuestion()` `case 'normal':` 題目區加入可點擊喇叭 SVG
- 喇叭 SVG 以 `display:inline-flex; align-items:center; gap:12px` 與面額文字並排，尺寸固定 36px（覆蓋 `.replay-icon` 預設 60px），`flex-shrink:0` 防止壓縮
- `id="replay-audio-btn-normal"` + `Game.EventManager.on(..., 'gameUI')` 綁定 click → `this.speak(questionText)`
- 與困難模式行為一致：點擊即重播題目語音

**修改檔案**：`js/c1_money_types.js`

---

### 2026-02-26：`setDragImage` 觸控防護補齊

**問題描述**：

`TouchDragUtility` 以 `TouchEvent` 觸發 `onDragStart` 回呼，`TouchEvent` 無 `dataTransfer` 屬性，若 dragstart handler 直接呼叫 `e.dataTransfer.setDragImage()` 會拋出 TypeError。

本次對所有 C1 相關（本單元不含拖曳，C3 為跨單元修復）及 F 系列統一補加防護。

**注意**：C1 本身無拖曳功能，此條目記錄為專案跨單元修復的一部分（A3×4、C3×1、F1×1、F2×1、F3×1、F6×6 共 14 處）。

---

### 2026-02-27：endGame() 重複呼叫防護 + startTime null 修復

**問題 1 — endGame() 守衛**：`endGame()` 無守衛旗標，語音非同步回呼可能導致重複呼叫完成畫面。

**修復**：
- `resetGameState()` 加入 `this.state.isEndingGame = false`
- `endGame()` 開頭加入守衛：
  ```javascript
  if (this.state.isEndingGame) { Game.Debug.log('state', '⚠️ [C1] endGame 已執行過，忽略重複呼叫'); return; }
  this.state.isEndingGame = true;
  ```

**問題 2 — startTime null 防護**：`endGame()` 計算 `elapsedTime = Date.now() - this.state.startTime` 未防護 null，若未正常進入遊戲就觸發 endGame，會顯示錯誤時間。

**修復**：
```javascript
// 修復前
const elapsedTime = Date.now() - this.state.startTime;

// 修復後
const elapsedTime = this.state.startTime ? (Date.now() - this.state.startTime) : 0;
```

**修改檔案**：`js/c1_money_types.js`

---

### 2026-02-27：confetti setInterval → 遞迴 TimerManager 模式

**問題**：`triggerConfetti()` 函數使用裸 `setInterval`，場景切換時 `TimerManager.clearAll()` 無法中途停止動畫計時器。

**修復**：將 `setInterval` 改為遞迴 `Game.TimerManager.setTimeout(fireConfetti, 250, 'confetti')`，確保 `clearAll()` 或 `clearByCategory('confetti')` 可立即停止動畫。

**修改檔案**：`js/c1_money_types.js`

---

*報告更新時間：2026-02-27*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

### 2026-02-28
- `speak()` 的 `catch` 區塊從 `if (callback) callback()` 改為 `safeCallback()`，防止 `onend` 已觸發後 catch 再次呼叫 callback 導致雙重觸發

---

## 廢棄程式碼稽核（2026-03-01）

**稽核範圍**：`js/c1_money_types.js`（1,277 行）

### 結論：無需處理

| 類型 | 位置 | 內容 | 評估 |
|------|------|------|------|
| 清理操作注解 | Line 1277 | `// 移除舊的回饋元素` | 操作性注解，刻意移除 DOM 殘留元素 |
| console.log | Lines 44, 50, 56 | Debug 系統內部呼叫 | 已受 FLAGS 守衛，無需處理 |

**整體評估**：程式碼整潔，無實際廢棄程式碼。

### 補充稽核（第二輪）

| 類型 | 位置 | 內容 | 嚴重性 | 建議 |
|------|------|------|--------|------|
| 空 stub 函數（有呼叫點） | Line 824–826 | `hideCustomQuestionInput()` — 函數本體僅含注解「不再需要隱藏，因為使用彈出式數字選擇器」；被 line 708 呼叫 1 次 | 低 | 可刪除函數並移除呼叫點 |
| 已注解的 alert | Line 818 | `// alert(...)` — 已取消彈窗提示 | 低 | 可清除注解行 |

---

## 跨輪計時器洩漏稽核（2026-03-03）

**稽核背景**：A3 單元曾發現 `speakText()` 10 秒備援計時器在下一輪觸發導致跳輪的 Bug，已對全系列交叉稽核。

**C1 稽核結論：安全（無此問題）**

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
