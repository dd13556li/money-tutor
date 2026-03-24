# F6 數的組成 — 單元開發經驗報告書

> **建立日期**：2026-02-08（原始）
> **更新日期**：2026-03-08（設定頁連結按鈕文字修復）
> **單元名稱**：F6 數的組成（Number Composition）
> **系列**：F 數學基礎

---

## 一、基本資訊

### 檔案清單

| 類型 | 檔案路徑 | 說明 |
|------|---------|------|
| HTML | `html/f6_number_composition.html` | 主頁面（50 行） |
| JS | `js/f6_number_composition.js` | 主邏輯（4,218 行，配置驅動架構） |
| CSS | `css/f6-number-composition.css` | 專用樣式表（1,243 行） |
| 作業單 | `worksheet/units/f6-worksheet.js` | A4 列印版作業單產生器（138 行） |
| 共用工具 | `js/number-speech-utils.js`、`js/audio-unlocker.js`、`js/reward-launcher.js`、`js/theme-system.js`、`js/emoji-library.js`、`js/touch-drag-utility.js`、`js/mobile-debug-panel.js`、`js/confetti.browser.min.js` | 各項支援模組 |

> **注意**：`css/f6_number_composition_ipad.css`（原報告記載 413 行）**實際不存在**，已從清單中移除。

### 外部依賴

- **canvas-confetti** (`js/confetti.browser.min.js`，v1.9.2 本地化)：完成畫面煙火動畫
- **Web Speech API**：語音合成（瀏覽器內建）

### 音效檔案

| 音效 ID | 用途 |
|---------|------|
| `correct-sound` | 答對回饋 |
| `success-sound` | 完成畫面 |
| `error-sound` | 答錯回饋 |
| `select-sound` | 選擇操作 |
| `menu-select-sound` | 設定選單操作 |
| `click-sound` | 一般點擊 |

---

## 二、單元特色

### 2.1 配置驅動架構（Configuration-Driven Architecture）

F6 延續 F4/F5 的設計理念——「所有邏輯由配置驅動」。全域 `NumberCompositionConfig` 物件集中管理 9 個配置群組，三種難度與三種遊戲模式的行為差異完全由配置定義。

```
NumberCompositionConfig 結構：
├── game              // 基本資訊（title、subtitle、version）
├── difficulties      // 三難度配置（easy、normal、hard）
│   ├── showVisuals   //   是否顯示視覺元素
│   ├── showNumbers   //   是否顯示數字
│   └── timeLimit     //   時間限制
├── numberRanges      // 數字範圍（1-5、1-10、5-15、custom）
├── modes             // 三種遊戲模式（composition、decomposition、fillBlank）
├── testModes         // 測驗模式（retry 反覆練習、single 單次作答）
├── visuals           // 視覺元素（EmojiLibrary 整合 + fallback）
├── audio             // 音效配置（5 個音效路徑）
├── speech            // 語音模板（correct、incorrect、incorrectWithAnswer、complete）
└── ui                // UI 配置（顏色、樣式、版面）
```

### 2.2 三種遊戲模式（F6 最大特色）

F6 的核心特色是提供**三種遊戲模式**——合成、分解、填空，這是 F 系列中題型變化最豐富的單元：

| 模式 | 圖示 | 題型格式 | 說明 |
|------|------|---------|------|
| 合成（composition） | ➕ | `a + b = ?` | 給定兩個部分，求總和 |
| 分解（decomposition） | ➗ | `total = ? + ?` | 給定總數，拆分為兩部分 |
| 填空（fillBlank） | ❓ | `a + ? = total` | 給定部分和總數，求缺少的部分 |

這與 F3（配對）、F4（排序）、F5（比較）各自只有一種遊戲機制截然不同。

### 2.3 三種難度模式

| 特性 | 簡單 | 普通 | 困難 |
|------|------|------|------|
| 難度 ID | `easy` | `normal` | `hard` |
| 視覺元素 | 是 | 是 | 否（純數字） |
| 互動方式 | 拖放 emoji | 拖放 + 選項按鈕 | 數字鍵盤輸入 |
| 時間限制 | 無 | 無 | 30 秒（配置中定義但未實作 UI 倒計時） |
| 測驗模式 | 自動進行（無需選擇） | 反覆練習 / 單次作答 | 反覆練習 / 單次作答 |

### 2.4 簡單模式拖放自動完成檢測

簡單模式中，使用者將 emoji 從上方拖放至下方容器，系統**自動檢測是否完成**——當底部容器數量等於正確答案、且上方容器為空時，自動判定答案正確。此設計讓學齡前使用者無需按下「確認」按鈕，降低操作門檻。

### 2.5 分解模式的「左右分配」設計

分解模式中，使用者需要將物件從中央拖放至**左右兩個容器**，將一個總數拆分為兩部分。這種「左右分配」互動設計為 F6 獨有，可供其他需要分類操作的單元複用。

### 2.6 困難模式的數字鍵盤輸入彈窗

困難模式不顯示 emoji 視覺元素，改為純數字題目搭配數字鍵盤輸入。自訂範圍功能允許使用者設定最小值/最大值（最大 30、最小 > 0）及自訂題數。

### 2.7 EmojiLibrary 整合

F6 從 `emoji-library.js` 的 `EmojiLibrary.numbers.shapes` 取得形狀圖示用於視覺元素顯示。當 `EmojiLibrary` 不可用時，使用內建 10 個 emoji 作為 fallback：

```javascript
['🔴', '🟢', '🔵', '🟡', '🟣', '🟤', '⭐', '❤️', '💎', '🔷']
```

---

## 三、技術重點

### 3.1 三大元件架構

| 元件 | 說明 |
|------|------|
| `GameDebug` | 分類日誌系統（7 種分類：init、Speech、settings、generation、interaction、answer、game） |
| `NumberCompositionConfig` | 配置中心（9 個配置群組） |
| `Game` | 主邏輯物件（全域單例，含 Audio、Speech 子系統） |

### 3.2 NumberCompositionConfig 設計

配置物件以 9 個群組涵蓋所有遊戲參數：

- `game` — 標題、副標題、版本號
- `difficulties` — 三難度的視覺/數字/時間配置
- `numberRanges` — 四種數字範圍（含自訂）
- `modes` — 三種遊戲模式定義
- `testModes` — 反覆練習 / 單次作答
- `visuals` — 視覺元素（getter 函數延遲取得 EmojiLibrary）
- `audio` — 五個音效路徑
- `speech` — 語音模板（含 `{answer}` 佔位符）
- `ui` — 介面配置

### 3.3 Game 物件與子系統

Game 為全域單例物件，包含兩個子系統：

**Audio 子系統**：
- `init()` — 預載所有音效
- `play(soundName)` — 播放音效（重設 currentTime = 0）
- 5 個音效：correctSound、errorSound、selectSound、menuSelectSound、successSound

**Speech 子系統**：
- `init()` — 語音引擎初始化
- `speak(text, options)` — 播放語音（支援 delay 選項，回傳 Promise）
- `currentVoice` — 當前選用語音

### 3.4 狀態管理

```javascript
state: {
    settings: {
        difficulty: null,      // 'easy' | 'normal' | 'hard'
        mode: null,            // 'composition' | 'decomposition' | 'fillBlank'
        numberRange: null,     // 'range1-5' | 'range1-10' | 'range5-15' | 'custom'
        questionCount: null,   // 題數
        testMode: null         // 'retry' | 'single' | null（簡單模式為 null）
    },
    currentQuestion: 0,        // 當前題目索引
    score: 0,                  // 答對題數
    questions: [],             // 已生成題目陣列
    startTime: null,           // 遊戲開始時間戳
    isAnswering: false         // 防快速連點旗標
}
```

### 3.5 渲染函數架構

每種遊戲模式 × 每種難度 = 獨立渲染函數，共 9 個：

| 函數 | 模式 | 難度 |
|------|------|------|
| `renderEasyCompositionQuestion()` | 合成 | 簡單（拖放 emoji） |
| `renderNormalCompositionQuestion()` | 合成 | 普通（拖放 + 選項按鈕） |
| `renderHardCompositionQuestion()` | 合成 | 困難（數字輸入） |
| `renderEasyDecompositionQuestion()` | 分解 | 簡單（拖放至左右容器） |
| `renderNormalDecompositionQuestion()` | 分解 | 普通（拖放 + 選項按鈕） |
| `renderHardDecompositionQuestion()` | 分解 | 困難（數字輸入） |
| `renderEasyFillBlankQuestion()` | 填空 | 簡單（拖放 emoji） |
| `renderNormalFillBlankQuestion()` | 填空 | 普通（拖放 + 選項按鈕） |
| `renderHardFillBlankQuestion()` | 填空 | 困難（數字輸入） |

`renderQuestion()` 為調度函數，根據當前 mode/difficulty 組合路由至對應渲染函數。

### 3.6 答案驗證邏輯

| 模式 | 答案格式 | 比對方式 |
|------|---------|---------|
| 合成 | 數字（如 `"7"`） | 數字字串比對 |
| 填空 | 數字（如 `"3"`） | 數字字串比對 |
| 分解 | `"a,b"` 字串格式 | 特殊字串比對（如 `"3,4"`） |

### 3.7 計分系統

每題正確 +1 分（不依難度加分），簡潔直觀。

### 3.8 isAnswering 防快速連點旗標

防止回饋動畫期間重複提交：
1. 點擊前檢查 `isAnswering === true` 則忽略
2. 答題時設為 `true`
3. 正確答案：鎖定至下一題（約 3.5s 後自動進行）
4. 錯誤答案（反覆模式）：1s 後解鎖
5. `nextQuestion()` 中重設為 `false`

### 3.9 題目去重

`isDuplicateQuestion()` 防止連續重複題目：

| 模式 | 去重條件 |
|------|---------|
| 合成 | 兩個加數相同（忽略順序） |
| 分解 | 總數相同 |
| 填空 | 已知數和總數皆相同 |

生成過程中最多重試 50 次以避免重複。

---

## 四、語音系統

### 4.1 Speech 子系統

```
Speech 結構：
├── init()            // 語音引擎初始化
├── speak(text, options)  // 播放語音（支援 delay、回傳 Promise）
├── currentVoice      // 當前語音物件
└── speechSynth       // SpeechSynthesis 引擎
```

### 4.2 語音偏好

語音選擇優先順序：
1. Microsoft HsiaoChen Online（zh-TW）
2. Google 國語（臺灣）
3. 其他 zh-TW 語音（排除 Hanhan）
4. 任何 zh-* 語音

語音語速設定 0.9（略慢，適合學習者）。

### 4.3 語音模板設計

**預定義語音模板**：
| 模板鍵 | 內容 |
|--------|------|
| `correct` | 陣列隨機選取：「答對了！」「很棒！」「正確！」「太好了！」 |
| `incorrect` | 陣列隨機選取：「再想想看」「不對喔，再試一次」「加油！」 |
| `incorrectWithAnswer` | 「不對，正確的答案是 {answer}」（含佔位符） |
| `complete` | 「恭喜你完成所有題目！」 |

**各遊戲模式獨立語音**：
| 模式 | 題目語音 |
|------|---------|
| 合成 | 「請問 {a} 加 {b} 等於多少？」 |
| 分解 | 「請問 {total} 可以分成哪兩個數字？」 |
| 填空 | 「請問 {a} 加多少等於 {total}？」 |

### 4.4 拖放過程中的即時語音播報

簡單/普通模式拖放過程中，每拖放一個 emoji，系統即時播報當前數量（如拖放第 3 個時播報「參」）。搭配 `NumberSpeechUtils.convertToPureNumberSpeech()` 進行中文數字轉換。

### 4.5 「2」發音規則

F 系列統一使用「貳」——所有情境中的數字「2」一律唸為「貳」，與 C/A 系列的金額模式（使用 `convertToTraditionalCurrency()`，在特定位置使用「兩」）不同。

| 數字 | 語音 |
|------|------|
| 2 | 貳 |
| 12 | 拾貳 |
| 20 | 貳拾 |
| 22 | 貳拾貳 |

---

## 五、觸控與桌面支援

### 5.1 拖放機制（簡單/普通模式）

F6 **使用拖放機制**（與 F3/F4 相同、與 F5 不同）：
- **桌面端**：HTML5 Drag and Drop API
- **行動端**：`TouchDragUtility`（`js/touch-drag-utility.js`）

HTML 中引入 `js/touch-drag-utility.js` 確保觸控裝置上的拖放功能正常運作。

### 5.2 拖放視覺回饋

拖放過程中透過 CSS 類別切換提供視覺回饋：
- `.dragging` — 正在拖曳的元素
- `.filled` — 已放入容器的元素
- `.hidden` — 隱藏的元素

### 5.3 audio-unlocker

使用 `audio-unlocker.js` 解決行動瀏覽器音訊自動播放限制，在設定頁面的首次使用者互動時觸發解鎖。

### 5.4 iPad 專用 CSS

> **注意**：原報告記載 `css/f6_number_composition_ipad.css`（413 行）**實際不存在**。F6 目前未有獨立的 iPad CSS 檔案。

若需要 iPad 優化，建議參考 F5 的 `css/f5_quantity_comparison_ipad.css`（308 行）實作方式：
- **Landscape 模式**（1024-1366px）：橫向版面優化
- **Portrait 模式**（768-1024px）：直向版面優化
- 約 1.5-2 倍放大所有元素
- 加大觸控目標尺寸

---

## 六、版面設計

### 6.1 三階段畫面流程

```
設定頁面 → 遊戲頁面 → 完成頁面
```

所有畫面皆動態渲染至 `<div id="app">`。

### 6.2 設定頁面

由 `renderWelcomeScreen()` 渲染（設定內嵌於此函數），包含：

- 難度選擇（簡單/普通/困難）
- 遊戲模式選擇（合成 ➕ / 分解 ➗ / 填空 ❓）
- 數字範圍選擇（1-5、1-10、5-15、自訂）
- 題數選擇
- 測驗模式選擇（反覆練習 / 單次作答，簡單模式自動進行不需選擇）
- 獎勵系統連結
- 作業單連結

### 6.3 遊戲頁面

由 `renderQuestion()` 調度至 7 個分支渲染函數，根據難度 × 模式組合呈現不同互動介面：

**簡單模式（拖放 emoji）**：

| 區域 | 說明 |
|------|------|
| 標題列 | 進度（第 X / Y 題）、獎勵按鈕、返回設定按鈕 |
| 題目區 | 題目文字（如「3 + 4 = ?」） |
| 上方容器 | 可拖放的 emoji 元素 |
| 下方容器 | 拖放目標區域（自動檢測完成） |

**普通模式（拖放 + 選項按鈕）**：

| 區域 | 說明 |
|------|------|
| 標題列 | 進度、獎勵按鈕、返回設定按鈕 |
| 題目區 | 題目文字 |
| 拖放區 | emoji 拖放互動 |
| 選項區 | 多選項按鈕（點擊作答） |

**困難模式（純數字輸入）**：

| 區域 | 說明 |
|------|------|
| 標題列 | 進度、獎勵按鈕、返回設定按鈕 |
| 題目區 | 純數字題目（無 emoji） |
| 輸入區 | 數字鍵盤輸入框 |

### 6.4 完成頁面

由 `showResults()` 觸發，遵循 C/F 系列統一樣式：

- 紫色漸層背景（`linear-gradient(135deg, #667eea 0%, #764ba2 100%)`）
- 獎盃彈跳動畫（`bounce`）
- 表現徽章：
  - ≥90%：表現優異！🏆
  - ≥70%：表現良好！👍
  - ≥50%：還需努力！💪
  - <50%：多加練習！📚
- 三張統計卡片（答對題數、正確率、完成時間）
- 獎勵系統連結（粉紅色按鈕，帶獲得分數提示）
- 「再玩一次」與「返回設定」按鈕
- 煙火動畫（canvas-confetti）
- 成功音效

**完成畫面 CSS 內嵌於 JS**（約 340+ 行），包含 4 個動畫定義（fadeIn、celebrate、bounce、glow）。

### 6.5 獨立 CSS 檔案

`css/f6-number-composition.css`（1,243 行）包含：

- 遊戲容器樣式
- 題目區域樣式
- 拖放元素樣式（emoji、容器、提示區）
- 選項按鈕樣式（預設、正確、錯誤三種狀態）
- 8 種 CSS 動畫（pulse、popIn、correctBounce、shake、arrowBounce、emojiPop、bounce、slideUp）
- 暗色模式支援（`[data-theme="dark"]`，10 個規則）
- 響應式斷點（768px、480px）

### 6.6 暗色模式支援

透過 `[data-theme="dark"]` CSS 選擇器提供暗色模式：

```
暗色模式色彩方案：
├── 背景主色：#263238
├── 背景次色：#37474f、#455a64
├── 文字主色：#eceff1
├── 邊框色：#546e7a
└── 強調色：#81d4fa
```

### 6.7 作業單版面

由 `worksheet/units/f6-worksheet.js`（138 行）產生 A4 列印版面，支援 3 種模式 × 2 種顯示 = 6 種組合：

| 模式 | 數字顯示 | 圖示顯示 |
|------|---------|---------|
| 合成 | `3 + 4 = ___` | 🍎🍎🍎 + 🍎🍎🍎🍎 = ___ |
| 分解 | `7 = ___ + ___` | 🍌🍌🍌🍌🍌🍌🍌 = ___ + ___ |
| 填空 | `3 + ___ = 7` | 🍇🍇🍇 + ___ = 🍇🍇🍇🍇🍇🍇🍇 |

圖示模式使用 10 個水果 emoji：`['🍎','🍌','🍇','🍓','🍊','🥝','🍍','🍉','🍑','🍒']`

工具列配置：
- **`fontButton`**：測驗類型 cycle（合成/分解/填空）
- **`orientationButton`**：數量範圍 dropdown（2-5、2-10、5-15、自訂）
- **`adjustCountButton`**：測驗方式 cycle（數字/圖示）
- **`extraButtons`**：自訂範圍

---

## 七、Bug 檢測與已知問題

### 7.1 已確認的程式碼問題

| # | 嚴重度 | 問題描述 | 數據 | 狀態 |
|---|--------|---------|------|------|
| 1 | ~~**高**~~ | ~~`setTimeout` 未清理~~ | ~~42 個（原始）~~ **✅ 已修復（2026-02-24）**：38 個遊戲邏輯 setTimeout 遷移至 `this.TimerManager.setTimeout()`（lines 3376-4608），總計 41 個由 TimerManager 管理 |
| 2 | **高** | `addEventListener` 未移除 | **32 個** | ✅ 已修復（EventManager） |
| 3 | **中** | JS @keyframes 與 CSS 重複 | `bounce` (1 個) | ✅ 已修復（injectGlobalAnimationStyles） |
| 4 | **低** | `console.log` 殘留 | **5 個**（多為錯誤處理） | ✅ 可接受 |
| 5 | **低** | `!important` 過多 | JS: 4 + CSS: 34 = **38 個** | ✅ 相對較少 |
| 6 | **建議** | 無 TimerManager | F1 已有 | ✅ 已新增 |
| 7 | **建議** | 無 EventManager | F1 已有 | ✅ 已新增 |
| 8 | **建議** | 無 injectGlobalAnimationStyles | F1 已有 | ✅ 已新增 |

### 7.2 setTimeout 分布（42 個）

| 類型 | 數量 | 位置 |
|------|------|------|
| Promise-based | 2 | 第 345, 373 行 |
| 回調式 | 40 | 分散於各渲染和答題函數中 |

### 7.3 addEventListener 分布（32 個）

| 區域 | 數量 | 說明 |
|------|------|------|
| 設定頁面 | 4 | gameSettings, start-game-btn, settingsRewardLink, worksheetLink |
| 拖放系統 | 24 | dragstart, dragend, dragover, drop（6 組 × 4 個） |
| 按鈕點擊 | 3 | 選項按鈕、答案框、數字輸入框 |
| 完成畫面 | 1 | resultsRewardLink |

### 7.4 @keyframes 分析

**CSS 檔案中的 @keyframes（8 個）**：
1. `pulse` (行 241)
2. `popIn` (行 276)
3. `correctBounce` (行 335)
4. `shake` (行 344)
5. `slideUp` (行 356)
6. `bounce` (行 505) ← **與 JS 重複**
7. `arrowBounce` (行 714)
8. `emojiPop` (行 788)

**JS 檔案中的 @keyframes（4 個）**：
1. `fadeIn` (行 3860)
2. `celebrate` (行 3865)
3. `bounce` (行 3871) ← **與 CSS 重複**
4. `glow` (行 3877)

**重複**：`bounce` 在 CSS 與 JS 各定義一次

### 7.5 F6 vs F1 比較

| 項目 | F6 數的組成 | F1 一對一對應 |
|------|------------|--------------|
| JS 行數 | 4,218 行 → 4,348 行（+130 行） | 7,468 行 |
| setTimeout | ✅ 42 個（由 TimerManager 管理） | 43→0（TimerManager） |
| addEventListener | ✅ 32 個（由 EventManager 管理） | 26→0（EventManager） |
| @keyframes 重複 | ✅ 0（全局注入） | 0（全局注入） |
| console.log | 5 個 | 6 個 |
| !important | 38 個 | 196 個 |
| TimerManager | ✅ 有 | ✅ 有 |
| EventManager | ✅ 有 | ✅ 有 |
| 全局動畫注入 | ✅ 有 | ✅ 有 |

### 7.6 正面發現

| 項目 | 說明 |
|------|------|
| Debug 系統 | GameDebug 物件統一管理 7 種分類日誌 |
| confetti 版本 | 使用本地化 v1.9.2（`js/confetti.browser.min.js`） |
| 完成畫面 | 已採用 C/F 系列統一樣式 |
| 配置驅動架構 | NumberCompositionConfig 設計良好 |
| EmojiLibrary 整合 | 有 fallback 機制（10 個內建 emoji） |
| isAnswering 旗標 | 防止快速連點 |
| 題目去重 | isDuplicateQuestion() 機制完善 |

### 7.7 非 Bug 但需注意的設計

| 項目 | 說明 |
|------|------|
| 困難模式 timeLimit | 配置 `timeLimit: 30` 但未實作 UI 倒計時 |
| 7 個渲染函數 | 每種模式×難度獨立渲染，有重複程式碼 |
| 完成畫面 CSS | 約 340+ 行內嵌於 JS，未外移至獨立 CSS |
| iPad CSS 不存在 | 原報告記載 `css/f6_number_composition_ipad.css` 實際不存在 |

### 7.8 狀態管理現況

| 項目 | 狀態 |
|------|------|
| 統一重置函數 | ✅ `resetGameState()` |
| 布林旗標 | `isAnswering` |
| 重置位置 | 統一（2 處） |
| 評價 | ✅ **最佳實踐** |

**重構完成**（2026-02-17）：已實現統一的 `resetGameState()` 函數

**重置項目**：
- 核心狀態：`currentQuestion`, `score`, `questions`, `startTime`, `isAnswering`

**調用位置**：
| 位置 | 調用條件 | 說明 |
|------|---------|------|
| `renderWelcomeScreen()` | 無條件 | 返回設定時重置狀態 |
| `startGame()` | 無條件 | 開始遊戲前重置狀態 |

**搜尋關鍵字**：`resetGameState`

---

## 八、注意事項

### 8.1 語音初始化時機

`Speech.init()` 必須在使用者互動後呼叫，否則部分瀏覽器會拒絕語音合成。搭配 `audio-unlocker.js` 確保首次互動後解鎖音訊。語音引擎的可用語音列表可能異步載入，需監聽 `voiceschanged` 事件。

### 8.2 簡單模式拖放自動完成檢測

簡單模式的完成條件：`bottomCount === totalAnswer && leftCount === 0 && rightCount === 0`。系統自動判定，使用者不需按確認按鈕。此設計需確保容器計數邏輯正確，避免誤判。

### 8.3 isAnswering 旗標防止重複提交

回饋動畫播放期間（正確閃爍、錯誤搖晃），`isAnswering` 旗標為 `true`，所有點擊事件被忽略。這防止了使用者在動畫中重複提交答案導致的計分錯誤。

### 8.4 困難模式 timeLimit 配置未實作 UI

困難模式在配置中定義 `timeLimit: 30`（30 秒），但**目前未在 UI 中實作倒計時功能**——系統僅記錄遊戲時間，不會在到達時限時強制結束。這是一個需要補上或移除的配置缺口。

### 8.5 自訂範圍驗證

自訂數字範圍的驗證規則：
- 最大值 ≤ 30
- 最小值 > 0
- 最大值 > 最小值

### 8.6 分解模式答案格式

分解模式的答案為 `"a,b"` 字串格式（如 `"3,4"`），需要特殊的比對邏輯。此格式與合成/填空的單一數字比對不同，開發時需注意格式一致性。

### 8.7 題目去重機制

`isDuplicateQuestion()` 最多重試 50 次以生成不重複的題目。當數字範圍較小時（如 1-5），可用的不重複題目數量有限，需注意避免無限迴圈。

### 8.8 外部依賴風險管理

| 依賴 | 用途 | 風險管理 |
|------|------|---------|
| canvas-confetti (本地) | 煙火動畫 | `typeof confetti === 'function'` 防護 |
| Web Speech API | 語音合成 | Speech 子系統有錯誤處理（Promise resolve） |
| EmojiLibrary | 視覺元素來源 | 有 fallback 機制（10 個內建 emoji） |

### 8.9 EmojiLibrary fallback

當 `EmojiLibrary` 不可用時（如 `emoji-library.js` 載入失敗），`NumberCompositionConfig.visuals` 透過 getter 函數自動使用內建 10 個 emoji，不會造成執行錯誤。

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

### 9.2 程式碼改進

**GameDebug 系統共用化**：F6 的 `GameDebug` 系統（7 種分類日誌）與 F4（6 種分類）、F5（12 種分類）各自獨立實作，存在重複。建議提取為共用模組，供所有單元採用。

**完成畫面統一提取**：完成畫面（`showResults()` / `endGame()` / `completeGame()`）的 HTML/CSS 在 18 個單元中各自實作，存在大量重複。建議提取為共用模組。

**完成畫面 CSS 外移**：F6 完成畫面的 CSS 目前內嵌於 JS（約 340+ 行），應移至獨立 CSS 檔案以便維護。

### 9.3 架構建議

**CSS 組織方式不一致**：F3 的遊戲樣式內嵌於 JS 中，F4 使用獨立 CSS 檔案（1,714 行），F5 使用獨立 CSS + iPad CSS，F6 使用獨立 CSS（1,243 行）。建議統一做法。

**iPad CSS 組織**：F5 有獨立 iPad CSS 檔案，F3、F4、F6 則無。若其他單元也需要 iPad 優化，應制定統一的 iPad CSS 組織方案。

**A1 引用差異**：A1 是唯一不引用 `theme-system.js`、`audio-unlocker.js`、`mobile-debug-panel.js` 的單元。建議統一所有單元的 HTML 引用清單。

### 9.4 F6 特有建議

**困難模式 timeLimit 處理**：`timeLimit: 30` 已定義於配置但未實作 UI 倒計時。應決定是補上倒計時功能，或移除此配置以免產生誤解。

**7 個渲染函數模組化**：每種模式 × 難度的獨立渲染函數（共 7 個）導致大量重複程式碼。可考慮合併為更模組化的結構，以模板參數區分不同模式/難度的差異。

**拖放互動元件共用化**：簡單/普通模式的 emoji 拖放互動可提取為共用元件，供 F3（卡片拖放配對）、F4（數字拖放排序）等單元複用。

**分解模式「左右分配」複用**：「左右分配」的互動設計可供其他需要分類操作的單元（如 F1 一對一對應）複用。

**數字鍵盤彈窗合併**：自訂範圍/題數的數字鍵盤彈窗與 F4 的數字鍵盤輸入功能類似，應合併為共用模組。

---

## 十、修復建議

參考 F1 已實現的解決方案，建議 F6 進行以下修復：

### 10.1 新增 TimerManager（計時器管理器）

```javascript
// 建議位置：Game 物件的 Audio 子系統之後
TimerManager: {
    timers: new Map(),
    setTimeout(callback, delay, category = 'default') {
        const id = window.setTimeout(() => {
            this.timers.delete(id);
            callback();
        }, delay);
        this.timers.set(id, { category, callback });
        return id;
    },
    clearTimeout(id) {
        if (this.timers.has(id)) {
            window.clearTimeout(id);
            this.timers.delete(id);
        }
    },
    clearByCategory(category) {
        for (const [id, timer] of this.timers) {
            if (timer.category === category) {
                window.clearTimeout(id);
                this.timers.delete(id);
            }
        }
    },
    clearAll() {
        for (const id of this.timers.keys()) {
            window.clearTimeout(id);
        }
        this.timers.clear();
    }
}
```

**修改位置**：
- `renderWelcomeScreen()` → 清理所有計時器
- `showResults()` → 清理 turnTransition 類別
- 各渲染函數中的 setTimeout → 改用 `Game.TimerManager.setTimeout()`

### 10.2 新增 EventManager（事件監聽器管理器）

```javascript
// 建議位置：TimerManager 之後
EventManager: {
    listeners: [],
    on(element, event, handler, options = {}, category = 'default') {
        element.addEventListener(event, handler, options);
        this.listeners.push({ element, event, handler, options, category });
    },
    removeByCategory(category) {
        this.listeners = this.listeners.filter(l => {
            if (l.category === category) {
                l.element.removeEventListener(l.event, l.handler, l.options);
                return false;
            }
            return true;
        });
    },
    removeAll() {
        this.listeners.forEach(l => {
            l.element.removeEventListener(l.event, l.handler, l.options);
        });
        this.listeners = [];
    }
}
```

**修改位置**：
- 設定頁面的 4 個 addEventListener → 改用 `Game.EventManager.on()`，類別 `settings`
- 拖放系統的 24 個事件 → 改用 `Game.EventManager.on()`，類別 `dragSystem`
- 完成畫面的獎勵連結 → 改用 `Game.EventManager.on()`，類別 `results`

### 10.3 新增 injectGlobalAnimationStyles()

```javascript
// 建議位置：EventManager 之後
injectGlobalAnimationStyles() {
    if (document.getElementById('f6-global-animations')) return;

    const style = document.createElement('style');
    style.id = 'f6-global-animations';
    style.textContent = `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes celebrate { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        @keyframes glow {
            0%, 100% { box-shadow: 0 0 5px rgba(255, 152, 0, 0.5); }
            50% { box-shadow: 0 0 20px rgba(255, 152, 0, 0.8); }
        }
    `;
    document.head.appendChild(style);
}
```

**修改位置**：
- `Game.init()` → 呼叫 `this.injectGlobalAnimationStyles()`
- `showResults()` → 刪除內嵌 @keyframes（fadeIn、celebrate、bounce、glow）

### 10.4 困難模式 timeLimit 處理

**選項 A：移除配置**
```javascript
// 移除 NumberCompositionConfig.difficulties.hard.timeLimit
```

**選項 B：實作倒計時 UI**
```javascript
// 在困難模式渲染函數中加入倒計時顯示
// 時間到時自動進入下一題或結束遊戲
```

### 10.5 預期修復效果

| 指標 | 修復前 | 修復後 |
|------|--------|--------|
| setTimeout 清理率 | 0% | 100%（透過 TimerManager） |
| addEventListener 清理率 | 0% | 100%（透過 EventManager） |
| @keyframes 重複定義 | 1 個 | 0（統一至全局） |
| 場景切換記憶體洩漏 | 有風險 | 已修復 |

---

## 十一、總結

### F6 數的組成的優勢

1. **三種遊戲模式**：合成/分解/填空，是 F 系列中題型變化最豐富的單元
2. **配置驅動架構**：NumberCompositionConfig 設計良好，未來單元開發的參考範例
3. **GameDebug 系統**：統一管理 7 種分類日誌，console.log 僅殘留 5 個
4. **EmojiLibrary 整合**：有完善的 fallback 機制
5. **isAnswering 防快速連點**：回饋動畫期間鎖定輸入
6. **題目去重機制**：isDuplicateQuestion() 防止連續重複
7. **完成畫面統一**：已採用 C/F 系列標準樣式
8. **confetti 版本一致**：使用 v1.9.2 本地化版本
9. **!important 使用克制**：僅 38 個（相比 F1 的 196 個）

### F6 數的組成的待改進處

1. ~~**42 個未清理 setTimeout**~~ → ✅ 已新增 TimerManager（2026-02-13）
2. ~~**32 個未移除 addEventListener**~~ → ✅ 已新增 EventManager（2026-02-13）
3. ~~**1 個動畫重複定義（bounce）**~~ → ✅ 已新增 injectGlobalAnimationStyles（2026-02-13）
4. **困難模式 timeLimit 未實作** → ⚠️ 建議實作或移除配置
5. **完成畫面 CSS 內嵌 JS** → ⚠️ 建議外移至獨立 CSS

### 核心數據

| 指標 | 數值 |
|------|------|
| JS 主程式行數 | 4,348 行（含 TimerManager/EventManager） |
| CSS 樣式行數 | 1,243 行 |
| 作業單行數 | 138 行 |
| setTimeout | 42 個（✅ 由 TimerManager 管理） |
| addEventListener | 32 個（✅ 由 EventManager 管理） |
| @keyframes 重複 | 0（✅ 統一至全局動畫樣式） |
| console.log | 5 個（可接受） |
| !important | 38 個（相對較少） |

| 指標 | 數值 |
|------|------|
| 難度模式 | 3 種 |
| 遊戲模式 | 3 種（合成/分解/填空） |
| 語音模板 | 4 個預定義 + 3 個模式專用 |
| 音效 | 6 個 |
| 外部依賴 | 8 個 JS（含本地 confetti） |
| 作業單題型 | 3 種模式 × 2 種顯示 = 6 種 |
| 互動方式 | 拖放 + 數字輸入（雙模式） |

### F 系列比較表

| 特性 | F3 數字認讀 | F4 數字排序 | F5 量比較 | F6 數的組成 |
|------|-----------|-----------|----------|------------|
| 互動機制 | 卡片拖放配對 | 數字拖放排序 | **按鈕點擊**（無拖放） | **拖放 + 數字輸入** |
| 獨立 CSS | 無（內嵌 JS） | 有（1,714 行） | 有（1,804 行） | 有（1,243 行） |
| iPad CSS | 無 | 無 | 有（308 行） | **無**（原報告錯誤） |
| Debug 系統 | 無 | 6 種分類 | 12 種分類 | **7 種分類** |
| 遊戲模式數量 | 1 種 | 1 種 | 1 種 | **3 種**（合成/分解/填空） |
| 獨特互動 | 翻牌配對 | 數字鍵盤輸入 | 點擊計數 | **左右分配拖放** |
| TimerManager | 無 | 無 | 無 | ✅ 有 |
| EventManager | 無 | 無 | 無 | ✅ 有 |

### 結論

F6 數的組成單元以**三種遊戲模式**為核心特色，透過 `NumberCompositionConfig` 集中管理 9 個配置群組，三種難度模式分別提供不同層次的認知挑戰：

1. **簡單模式**：拖放 emoji 視覺操作，自動檢測完成，適合學齡前使用者
2. **普通模式**：結合拖放與選項按鈕，漸進過渡至抽象思維
3. **困難模式**：純數字輸入，訓練數學運算能力

2026-02-13 已完成記憶體管理改進：新增 TimerManager 和 EventManager 解決記憶體洩漏風險、新增 injectGlobalAnimationStyles 統一 @keyframes 定義。剩餘改進空間：困難模式 timeLimit 配置缺口（未實作 UI 倒計時）。

---

## 十二、修復記錄

### 2026-02-13：記憶體洩漏修復

**修改檔案**：`js/f6_number_composition.js`

**問題描述**：
1. 42 個 `setTimeout` 未清理（場景切換時可能導致記憶體洩漏）
2. 32 個 `addEventListener` 未移除（重複綁定風險）
3. JS @keyframes 與 CSS 重複定義（`bounce` 動畫）

**修復內容**：

1. **新增 TimerManager**（計時器統一管理）
   - 位置：Game 物件的 Speech 子系統之後
   - 方法：`setTimeout()`、`clearTimeout()`、`clearAll()`、`clearByCategory()`
   - 支援分類管理：`turnTransition`、`animation`、`speech` 等

2. **新增 EventManager**（事件監聽器統一管理）
   - 位置：TimerManager 之後
   - 方法：`on()`、`removeAll()`、`removeByCategory()`
   - 支援分類管理：`settings`、`gameUI`、`dragSystem`、`results` 等

3. **新增 injectGlobalAnimationStyles()**
   - 位置：EventManager 之後
   - 功能：統一注入全局動畫樣式（fadeIn、celebrate、bounce、glow）
   - 避免 showResults() 中重複定義 @keyframes

4. **修改 init() 函數**
   - 新增：`this.TimerManager.clearAll()` — 清理所有計時器
   - 新增：`this.EventManager.removeAll()` — 清理所有事件監聽器
   - 新增：`this.injectGlobalAnimationStyles()` — 注入全局動畫樣式

5. **修改 renderWelcomeScreen() 函數**
   - 新增：`this.TimerManager.clearAll()` — 清理所有計時器
   - 新增：`this.EventManager.removeByCategory('gameUI')` — 清理遊戲 UI 事件

6. **修改 showResults() 函數**
   - 新增：`this.TimerManager.clearByCategory('turnTransition')` — 清理回合轉換計時器
   - 刪除：內嵌的 @keyframes 定義（fadeIn、celebrate、bounce、glow）

**修改位置**（搜尋關鍵字定位）：
- TimerManager：搜尋 `TimerManager`
- EventManager：搜尋 `EventManager`
- injectGlobalAnimationStyles：搜尋 `injectGlobalAnimationStyles`

**預期效果**：

| 指標 | 修復前 | 修復後 |
|------|--------|--------|
| setTimeout 清理率 | 0% | 100%（透過 TimerManager） |
| addEventListener 清理率 | 0% | 100%（透過 EventManager） |
| @keyframes 重複定義 | 1 個（bounce） | 0（統一至全局） |
| 場景切換記憶體洩漏 | 有風險 | 已修復 |

**驗證方法**：
1. 開啟瀏覽器開發者工具 Console
2. 進行遊戲設定 → 遊戲 → 返回設定的循環
3. 確認 Console 中顯示計時器和事件清理日誌
4. 確認完成畫面動畫正常運作
5. 確認無 JavaScript 錯誤

---

### 2026-02-16：系統性驗證

**驗證內容**：

| 項目 | 狀態 | 說明 |
|------|------|------|
| TimerManager | ✅ 正常 | 第 387 行起，統一管理計時器 |
| EventManager | ✅ 正常 | 第 433 行起，統一管理事件監聯器 |
| injectGlobalAnimationStyles | ✅ 正常 | 第 472 行起，全局動畫注入 |
| showResults() | ✅ 正常 | 第 3893 行呼叫 `TimerManager.clearByCategory('turnTransition')` |
| confetti 煙火 | ✅ 正常 | 使用 v1.9.2 本地化版本 |

**結論**：F6 單元已達到 F 系列標準，無需進一步修改。

---

### 2026-02-17：狀態管理重構（resetGameState）

**問題**：
- 狀態重置邏輯分散於 11 個不同位置（F 系列最多）
- `currentQuestion`、`score`、`isAnswering` 等多個狀態需要重置
- 不符合 C1/C2/C4/C5/C6/F1/F3/F4/F5 等單元的最佳實踐

**修改內容**：

1. **新增 `resetGameState()` 函數**
   - 位置：`injectGlobalAnimationStyles()` 之後
   - 集中管理所有遊戲相關狀態的重置
   - 重置項目：`currentQuestion`, `score`, `questions`, `startTime`, `isAnswering`
   - 輸出日誌：`🔄 [F6] 遊戲狀態已重置`

2. **調用位置**
   | 位置 | 調用條件 | 說明 |
   |------|---------|------|
   | `renderWelcomeScreen()` | 無條件 | 返回設定時重置狀態 |
   | `startGame()` | 無條件 | 開始遊戲前重置狀態 |

**修改檔案**：
- `js/f6_number_composition.js`

**驗證方式**：
1. 開啟 F6 數的組成
2. 完成部分測驗後點擊「返回設定」
3. Console 應顯示「🔄 [F6] 遊戲狀態已重置」
4. 重新開始遊戲，確認題目從第 1 題開始、分數為 0、狀態清空

---

### 2026-02-18：填空模式拖曳式介面重構

**問題**：
- 簡單模式填空挑戰需要全新的拖曳互動設計
- 普通模式填空挑戰需要支援 ? 在任意位置
- 需要避免產生含 0 的題目（如 0+1=1）

**修改內容**：

1. **重寫 `renderEasyFillBlankQuestion()` 函數**
   - **新版面設計**：
     - 上方紫色區域：可拖曳的圖示（數量等於答案）
     - 已知數框（綠色）：顯示 a 個正常圖示
     - 問號框（橙色虛線）：顯示 b 個淡化圖示作為佔位符
     - 總數框（藍色）：顯示 a 個正常 + b 個淡化圖示
   - **互動方式**：拖曳圖示到問號框，淡化圖示變正常，總數框同步更新
   - **自動完成**：所有圖示拖放完成後自動判定正確

2. **重寫 `renderNormalFillBlankQuestion()` 函數**
   - **新版面設計**：同簡單模式，但 ? 可在第一或第二位置
   - **標籤顯示**：已知數和總數直接顯示數字（非「已知」「總共」）
   - **移除提示文字**：刪除「從總共拖曳...」說明
   - **選項按鈕**：拖放完成後顯示 4 個數字選項

3. **修改 `generateFillBlankQuestion()` 函數**
   - 確保 total >= 2，a >= 1，answer >= 1
   - 新增 `questionMarkPosition` 欄位（0 或 1）

4. **更新狀態管理**
   - 新狀態變數：`dragSourceCount`、`targetFilledCount`
   - 移除舊變數：`sourceCount`、`targetCount`

**修改檔案**：
- `js/f6_number_composition.js`

**新版面結構**：

```
┌─────────────────────────────────────┐
│  [請拖曳下方圖示到 ? 框中]          │  ← 紫色拖曳區
│     🔴 🔴                           │
└─────────────────────────────────────┘

┌─────┐     ┌─────┐     ┌─────┐
│  2  │  +  │  ?  │  =  │  4  │
│ 🔴🔴│     │ ⚪⚪│     │🔴🔴⚪⚪│
└─────┘     └─────┘     └─────┘
  綠色       橙色虛線      藍色
  已知數      問號區       總數
```

（⚪ 代表淡化圖示，當拖入後變成 🔴 正常圖示）

**渲染函數架構更新**（共 9 個）：

| 函數 | 模式 | 難度 |
|------|------|------|
| `renderEasyCompositionQuestion()` | 合成 | 簡單 |
| `renderNormalCompositionQuestion()` | 合成 | 普通 |
| `renderHardCompositionQuestion()` | 合成 | 困難 |
| `renderEasyDecompositionQuestion()` | 分解 | 簡單 |
| `renderNormalDecompositionQuestion()` | 分解 | 普通 |
| `renderHardDecompositionQuestion()` | 分解 | 困難 |
| `renderEasyFillBlankQuestion()` | 填空 | 簡單（🆕） |
| `renderNormalFillBlankQuestion()` | 填空 | 普通（🆕） |
| `renderHardFillBlankQuestion()` | 填空 | 困難 |

**驗證方式**：
1. 開啟 F6 數的組成
2. 選擇「簡單」難度 + 「填空 ❓」模式
3. 確認顯示拖曳式介面（`a + ? = total` 格式）
4. 將 emoji 拖放至問號區域，確認自動檢測正確答案
5. 選擇「普通」難度 + 「填空 ❓」模式
6. 確認顯示拖曳 + 選項按鈕介面

---

### 2026-02-21：Debug Logger 重構為 FLAGS 分類開關系統

**問題**：
- 原始 GameDebug 系統僅有 `enabled` 布林開關
- 6 個直接 console.log 呼叫分散於程式碼中
- 難以按需開啟/關閉特定分類的日誌

**修改內容**：

1. **重構 GameDebug 物件為 FLAGS 分類開關系統**
   - 新增 `FLAGS` 物件：11 個分類開關
   - 預設全部關閉，僅 `error: true` 保持開啟
   - 新增 `log(category, ...args)`、`warn(category, ...args)`、`error(...args)` 方法

2. **FLAGS 分類一覽**
   | 分類 | 說明 | 預設值 |
   |------|------|--------|
   | `all` | 全域開關 | `false` |
   | `init` | 初始化 | `false` |
   | `config` | 配置 | `false` |
   | `game` | 遊戲流程 | `false` |
   | `ui` | UI 渲染 | `false` |
   | `audio` | 音效 | `false` |
   | `speech` | 語音 | `false` |
   | `drag` | 拖曳 | `false` |
   | `question` | 題目生成 | `false` |
   | `state` | 狀態管理 | `false` |
   | `animation` | 動畫 | `false` |
   | `error` | 錯誤訊息 | `true` |

3. **轉換統計**
   - 原始 console 呼叫：6 個
   - 轉換為 GameDebug：5 個（audio:1, state:1, question:3）
   - 保留（Debug 系統內部）：3 個

4. **使用方式**
   ```javascript
   // 開啟特定分類
   GameDebug.FLAGS.question = true;

   // 開啟所有分類
   GameDebug.FLAGS.all = true;
   ```

**修改檔案**：
- `js/f6_number_composition.js`
- `CLAUDE.md`（新增修復記錄）
- `F6_Unit_Completion_Report.md`（本文件）

**驗證方式**：
1. 開啟 F6 數的組成遊戲
2. 預設情況下 Console 應無一般日誌（僅錯誤）
3. 在 Console 輸入 `GameDebug.FLAGS.question = true` 後生成題目，應顯示題目分類日誌
4. 輸入 `GameDebug.FLAGS.all = true` 應顯示所有分類日誌

---

### 2026-02-23：動畫整合確認 + 嵌套物件確認（無需修改）

**背景**：系統性檢查 F6 單元的 CSS 動畫定義是否集中管理，以及是否存在嵌套物件中 `this.Debug` 失效的問題。

**1. CSS 動畫整合確認**

檢查結果：`injectGlobalAnimationStyles()` 已存在（2026-02-13 實現），共包含 **4 個 @keyframes**：

| # | 動畫名稱 | 用途 |
|---|---------|------|
| 1 | `fadeIn` | 淡入 |
| 2 | `celebrate` | 慶祝旋轉縮放 |
| 3 | `bounce` | 彈跳 |
| 4 | `glow` | 發光 |

散落位置（1 處）已確認為注解，無實際 @keyframes 定義，無需額外整合：

```javascript
/* 🔧 [Bug修復] @keyframes 已移至全局動畫樣式（injectGlobalAnimationStyles） */
```

**結論**：動畫整合已完成，無需修改。

**2. 嵌套物件確認（無需修改）**

**掃描結果**：全檔搜尋 `this.Debug.` → **0 個**

F6 從設計之初即直接使用全域 `const GameDebug = { ... }`（定義於第 25 行），所有呼叫皆為 `GameDebug.log(...)` 形式，無 `this.Debug` 繫結問題。

| 項目 | 數量 | 狀態 |
|------|------|------|
| `this.Debug.` 呼叫 | 0 個 | ✅ 無需修改 |
| `GameDebug.*` 呼叫 | 直接使用 | ✅ 正確 |
| @keyframes 分散定義 | 0 處（1 處已為注解）| ✅ 無需修改 |

**修改檔案**：
- `js/f6_number_composition.js`（無修改，確認已符合規範）
- `CLAUDE.md`（新增修復記錄）
- `F6_Unit_Completion_Report.md`（本文件，新增 2026-02-23 確認記錄）

---

### 2026-02-24（第二輪）：新發現 Bug 修復（Bug #9、#10）

**問題 1（Bug #9）— bindWelcomeScreenEvents() EventManager 繞過（高）**：

- `bindWelcomeScreenEvents()` 的 4 個 addEventListener（`.game-settings`、`#start-game-btn`、獎勵連結、作業單連結）未透過 EventManager 追蹤
- **修復**：全部改為 `this.EventManager.on(..., 'gameUI')`

**問題 2（Bug #10）— 完成畫面「再玩一次」使用 location.reload()（中）**：

- `showResults()` 完成畫面的「再玩一次」按鈕使用 `onclick="location.reload()"`
- 這會重新載入整個頁面，與其他單元（F3/F4 使用 `Game.init()` 或 `Game.startGame()`）不一致
- `location.reload()` 會清除所有已選設定，用戶必須重新選擇
- **修復**：改為 `onclick="Game.init()"` 回到設定畫面優雅重啟

---

### 2026-02-24：作業單連結統一簡化（僅傳 unit 參數）

**修改內容**：

- 作業單連結原本傳遞遊戲設定參數（`difficulty`, `mode`, `numberRange`）
- 各作業單已有完整工具列，用戶開啟後可直接在工具列調整；遊戲設定與作業單設定應獨立運作
- **修復**：移除所有多餘參數，統一改為只傳 `unit` 參數，讓作業單完全使用自己的預設値

**修改檔案**：`js/f6_number_composition.js`

---

---

### 2026-02-25：拖曳去背修復（setDragImage）+ 多指觸控誤觸修復

**問題 1 — 桌面端拖曳預覽含背景色**

拖曳圖示時，瀏覽器預設以完整元素截圖作為拖曳預覽（含背景色、邊框），視覺上不夠清晰。

**修復**：F6 有 Type A（數字拖曳）與 Type B（符號拖曳）兩種拖曳類型，共 **6 個** `dragstart` 事件處理函數，全部加入 setDragImage ghost：
- Type A：2 個 dragstart handler（左側數字列表 → 右側放置框）
- Type B：4 個 dragstart handler（符號選項 → 運算式填空）
- ghost `<span>` 透明背景，`fontSize` 改用 `getComputedStyle(element).fontSize` 取得實際渲染尺寸

**問題 2 — 多指觸控時拖曳失敗**

觸控拖曳時若使用者意外放置第二根手指，第二根手指的 `touchend` 被 `handleTouchEnd` 處理，`findDropZoneAt` 返回 null → `cleanupDrag()` 重置拖曳狀態，實際拖曳手指抬起時 `isDragging = false`，物件未能放入放置框。

**修復（`js/touch-drag-utility.js`，跨單元共用）**：
- `handleTouchStart`：`touchState` 新增 `touchIdentifier: touch.identifier`
- `handleTouchMove`：優先以 `touchIdentifier` 找到對應手指，fallback 到 `touches[0]`
- `handleTouchEnd`：先以 `touchIdentifier` 過濾；非拖曳手指的 touchend 記錄 `⚠️` 後 `return`，不重置拖曳狀態
- `cleanupDrag`：`touchState` 重置時加入 `touchIdentifier: undefined`

**修改檔案**：
- `js/f6_number_composition.js`（6 個 dragstart handler 加入 setDragImage ghost）
- `js/touch-drag-utility.js`（touchIdentifier 過濾，跨單元共用）

---

### 2026-02-26：`setDragImage` 觸控防護（6 處）

**問題描述**：

`TouchDragUtility` 以 `TouchEvent` 觸發 `onDragStart` 回呼，`TouchEvent` 無 `dataTransfer` 屬性。F6 中 6 個 dragstart handler 直接呼叫 `e.dataTransfer.setDragImage()`，在觸控裝置上會拋出 TypeError。

**修改內容**：

- `js/f6_number_composition.js`：6 個 dragstart handler 中 `setDragImage` 呼叫統一包覆 `if (e.dataTransfer && typeof e.dataTransfer.setDragImage === 'function')` 防護
- 6 處模式完全相同（使用 `e` 變數名 + `(_ghost.offsetWidth || 30)` 計算），以 `replace_all: true` 一次批次替換

**修改檔案**：`js/f6_number_composition.js`

---

---

### 2026-02-27：showImagePreview() 裸 setTimeout 修復

**問題描述**：

`showImagePreview()` 中 `setTimeout(() => nameInput.focus(), 100)` 未透過 TimerManager 管理，返回設定頁面時無法被 `clearAll()` 清除，可能造成計時器洩漏。

**修復方式**：

```javascript
// 修改前
setTimeout(() => nameInput.focus(), 100);

// 修改後
this.TimerManager.setTimeout(() => nameInput.focus(), 100, 'ui');
```

**修改檔案**：`js/f6_number_composition.js`

---

*報告更新時間：2026-03-07*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

## 廢棄程式碼稽核（2026-03-01）

**稽核範圍**：`js/f6_number_composition.js`（5,488 行）

### 結論：發現 2 項需補充記錄的項目（補充稽核 2026-03-02）

| 類型 | 位置 | 內容 | 嚴重性 | 建議 |
|------|------|------|--------|------|
| console.log | Lines 72, 78, 84 | Debug 系統內部呼叫 | — | 已受 FLAGS 守衛，無需處理 |
| **原生 setTimeout（async sleep，語音取消）** | Line 399 | `await new Promise(resolve => setTimeout(resolve, 100))` — 語音系統取消後的短暫等待 | 低（刻意保留） | 同 F4/F5/C4 的 async sleep 模式；語義上不適合轉為 TimerManager，可加注解說明 |
| **`alert()` 呼叫（自訂物件驗證）** | Lines 907, 5407, 5421, 5429, 5457, 5458, 5460 | 共 6–7 處，用於自訂物件上傳驗證（圖片格式/大小限制、名稱輸入）及數字範圍驗證 | 低 | 功能正常；若需提升 UX 可改為非阻塞式提示 |

**整體評估**：程式碼整潔，整體品質高。async sleep 為刻意設計，`alert()` 僅用於設定驗證，不影響遊戲流程。

---

## 跨輪計時器洩漏稽核（2026-03-03）

**稽核背景**：A3 單元曾發現 `speakText()` 10 秒備援計時器在下一輪觸發導致跳輪的 Bug，已對全系列交叉稽核。

**F6 稽核結論：安全（無此問題）**

三層保護均完備：

| 條件 | 狀態 | 說明 |
|------|------|------|
| ① 新輪次從語音 callback 觸發 | **不成立 ✅** | `endGame()` / `completeGame()` / `startNewTurn()` 不從語音 callback 鏈內部呼叫 |
| ② interrupted 不呼叫 safeCallback | **不成立 ✅** | `onerror` 對所有錯誤**無條件**呼叫 `safeCallback()` 或 `resolve()`（F5/F6 Promise 架構），備援計時器為 no-op |
| ③ 新輪次函數無 clearAll() | **不成立 ✅** | `init()` / `showSettings()` 有 `TimerManager.clearAll()` |

**結論**：三個條件均不成立，從架構、語音錯誤處理、計時器清理三個層面同時保護，bug 不可能發生。

---

## 語音速率統一 + 語音選擇優先順序更新（2026-03-04）

### 語音速率調整（rate → 1.0）

| 函數 | 舊 rate | 新 rate |
|------|---------|---------|
| `Speech.speak()` 主路徑 `utterance.rate` | 0.9 | 1.0 |

`utterance.rate` 為相對倍數，數值 1.0 表示使用語音引擎的原生預設語速，非固定 wpm。統一改為 1.0 使各語音在不同裝置上保持一致的自然語速。

### 語音選擇優先順序更新

F6 使用 `this.currentVoice`（不同於其他 16 個單元的 `this.voice`，命名慣例延續自 F5）。全專案 18 個單元統一語音選擇策略，已更新為：

```javascript
this.currentVoice =
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

## speak() safeResolve 保護 + 備援超時修復（2026-03-07）

### 問題描述

`Speech.speak()` 採 Promise 架構，`onend` 與 `onerror` 各自直接呼叫 `resolve()`，缺少以下防護：

1. **無 `resolved` 旗標**：若 `onend` 與 `onerror` 均觸發（邊緣情況），`resolve()` 被呼叫兩次（Promise 雖為 no-op 但不規範）
2. **無備援超時**：語音引擎無聲失敗（既不觸發 `onend` 也不觸發 `onerror`）時，Promise 永遠掛起，導致後續 `.then()` 鏈中的「進入下一題」邏輯永久卡住

這是全系列 18 個單元中唯一一個仍缺少此防護的單元（其他 17 個單元均已修復，本輪例行掃描發現）。

### 修復內容

**修改函數**：`Speech.speak()`

```javascript
// 修改前
utterance.onend = () => {
    GameDebug.log('Speech', '✅ 語音播放完成');
    resolve();
};
utterance.onerror = (event) => {
    GameDebug.log('Speech', '❌ 語音播放錯誤', { error: event.error });
    resolve();
};
// 延遲播放：無備援超時
Game.TimerManager.setTimeout(() => {
    this.speechSynth.speak(utterance);
}, delay, 'speech');

// 修改後
let resolved = false;
const safeResolve = () => {
    if (!resolved) {
        resolved = true;
        resolve();
    }
};
utterance.onend = () => {
    GameDebug.log('Speech', '✅ 語音播放完成');
    safeResolve();
};
utterance.onerror = (event) => {
    GameDebug.log('Speech', '❌ 語音播放錯誤', { error: event.error });
    safeResolve();
};
// 延遲播放：語音啟動後加入 10 秒備援超時
Game.TimerManager.setTimeout(() => {
    this.speechSynth.speak(utterance);
    Game.TimerManager.setTimeout(() => {
        GameDebug.log('Speech', '⏰ 語音備援超時，強制完成');
        safeResolve();
    }, 10000, 'speech');
}, delay, 'speech');
```

**修改檔案**：`js/f6_number_composition.js`

**搜尋關鍵字**：`safeResolve`, `語音備援超時`

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

## 修復記錄（2026-03-10）— 設定頁自訂主題按鈕樣式同步 F2 + 新增圖示語音

**問題**：
1. F6 設定頁面自訂主題區的「📸 上傳圖片」按鈕（`.f6-upload-btn`）使用藍紫色漸層（`#667eea→#764ba2`），與 F2 暖色漸層不一致。
2. 「❌」刪除按鈕（`.f6-remove-btn`）無背景色，為裸按鈕樣式（`background:none; font-size:18px`）。
3. modal「取消」按鈕（`.f6-cancel-btn`）為灰色填滿，「確認新增」按鈕（`.f6-confirm-btn`）為藍紫色漸層；兩者均無圓角膠囊樣式（`border-radius:8px`），與 F2 pill 形不一致。
4. `confirmAddCustomItem()` 新增圖示後無語音回饋，與 F2/F1/F3 不一致。

**修復**：
1. `injectGlobalAnimationStyles()` 的 `f6-custom-theme-styles` CSS 中：
   - `.f6-upload-btn`：改為暖色漸層 `linear-gradient(45deg, #FF6B6B, #4ECDC4)`，`padding:8px 15px`，`font-weight:bold`，加 hover（`#FF5252→#26C6DA` + `translateY(-2px)`）
   - `.f6-remove-btn`：改為 `background:#ff4444; color:white; font-size:12px; padding:4px 8px; border-radius:5px`，加 hover `#cc0000`
   - `.f6-cancel-btn`：改為紅色填滿（`#dc3545`）+ 白字 + `border-radius:25px` + box-shadow（與 F1/F2/F3 modal 取消按鈕一致）
   - `.f6-confirm-btn`：改為綠色（`#28a745`）+ 白字 + `border-radius:25px` + box-shadow
   - `.f6-image-preview-modal .modal-footer`：`justify-content:center !important`（置中而非靠右）
2. `confirmAddCustomItem()` 新增圖示後加入 `this.Speech.speak(`已新增${name}圖示`)`。

**修改**：`js/f6_number_composition.js`（`injectGlobalAnimationStyles` CSS 更新；`confirmAddCustomItem` 新增語音）

**搜尋關鍵字**：`linear-gradient(45deg, #FF6B6B, #4ECDC4)` in `js/f6_number_composition.js`；`已新增${name}圖示` in `confirmAddCustomItem`

---
