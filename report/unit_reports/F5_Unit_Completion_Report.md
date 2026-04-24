# F5 量比較 — 單元完成經驗報告書

> **建立日期**：2026-02-08（原始）
> **更新日期**：2026-03-08（除零防護修復）
> **專案名稱**：Money Tutor 金錢教學系統
> **單元編號**：F5 — 量比較（Quantity Comparison）
> **報告類型**：單元完成經驗與開發建議

---

## 一、檔案規模總覽

| 檔案 | 路徑 | 行數 | 大小 |
|------|------|------|------|
| JS 核心邏輯 | `js/f5_quantity_comparison.js` | 6,445 行 | ~257 KB |
| HTML 頁面 | `html/f5_quantity_comparison.html` | 42 行 | ~2 KB |
| CSS 專用樣式 | `css/f5-quantity-comparison.css` | 1,804 行 | ~55 KB |
| CSS iPad 優化 | `css/f5_quantity_comparison_ipad.css` | 308 行 | ~9 KB |
| 作業單產生器 | `worksheet/units/f5-worksheet.js` | 195 行 | ~6 KB |
| **合計** | — | **~8,794 行** | ~329 KB |

### CSS 依賴

| 檔案 | 說明 |
|------|------|
| `css/ai-theme.css` | 共用主題樣式 |
| `css/unit6.css` | 共用單元樣式 |
| `css/common-modal-responsive.css` | 共用彈窗響應式樣式 |
| `css/f5-quantity-comparison.css` | **F5 專用樣式（1,804 行）** |
| `css/f5_quantity_comparison_ipad.css` | **F5 iPad 優化（308 行）** |

### JS 依賴

| 依賴 | 來源 | 用途 |
|------|------|------|
| `confetti.browser.min.js` | 本地（v1.9.2） | 煙火慶祝動畫 |
| `audio-unlocker.js` | 本地 | 行動裝置音訊解鎖 |
| `theme-system.js` | 本地 | 深色/淺色主題切換 |
| `emoji-library.js` | 本地 | Emoji 圖示庫 |
| `reward-launcher.js` | 本地 | 獎勵系統啟動器 |
| `number-speech-utils.js` | 本地 | 數字語音轉換 |
| `mobile-debug-panel.js` | 本地 | 行動裝置除錯面板 |

### F 系列規模比較

| 項目 | F1 一對一對應 | F2 唱數 | F3 數字認讀 | F4 數字排序 | F5 量比較 | F6 數的組成 |
|------|-------------|---------|------------|------------|----------|------------|
| JS 行數 | 7,468 | — | 4,750 | 4,013 | **6,445** | — |
| CSS 行數 | 獨立 CSS（~220 行） | 獨立 CSS（~170 行） | 獨立 CSS（~550 行） | 1,714 | **2,112**（含 iPad） | — |
| 作業單行數 | 135 | — | 116 | 153 | **195** | — |
| 難度模式 | 3 種 | — | 3 種 | 3 種 | **3 種** | — |
| 互動方式 | 拖曳+點擊 | — | 拖曳 | 拖曳+點擊輸入 | **按鈕點擊**（無拖曳） | — |
| TimerManager | ✅ 有 | — | ✅ 有 | ✅ 有 | ✅ **有**（2026-02-12） | — |
| EventManager | ✅ 有 | — | ✅ 有 | ✅ 有 | ✅ **有**（2026-02-12） | — |
| 全局動畫注入 | ✅ 有 | — | ✅ 有 | ✅ 有 | ✅ **有**（2026-02-12） | — |

---

## 二、單元特色

### 2.1 配置驅動架構（QuantityComparisonConfig）

F5 延續 F4 的設計理念——「所有邏輯由配置驅動」。全域 `QuantityComparisonConfig` 物件集中管理 15+ 配置群組，三種難度的行為差異完全由配置定義。

```
QuantityComparisonConfig 結構：
├── game                  // 遊戲基本信息（標題、版本）
├── difficulties          // 三難度配置（easy、normal、hard）
│   ├── colors            //   顏色方案
│   ├── timing            //   延遲設定
│   ├── scoring           //   計分規則
│   └── speechTemplates   //   語音模板
├── quantityRanges        // 數量範圍（1-5、1-10、5-15、10-20、15-25、20-30、custom）
├── comparisonModes       // 比較模式（findSmaller、findLarger、random）
├── comparisonTypes       // 比較類型（>、<、=）
├── timeLimits            // 時間限制（none、180秒、120秒、60秒）
├── testModes             // 測驗模式（retry、single）
├── soundSettings         // 音效配置
├── questionCounts        // 題數選項
├── themes                // 主題（6 種內建 + custom）
├── objectTypes           // 物件類型（dots、shapes、icons、animals、toys、fruits）
├── arrangements          // 排列方式（random、grid、line、cluster、circle）
├── difficultyDifferences // 難度差異配置（minDiff、maxDiff、sameQuantityRate）
└── getter 函數（12 個）  // getDifficultyConfig()、getComparisonModeConfig() 等
```

### 2.2 三種難度模式

| 特性 | 簡單 | 普通 | 困難 |
|------|------|------|------|
| 難度 ID | `easy` | `normal` | `hard` |
| 視覺模式 | `direct`（直接視覺比較） | `counting`（點擊計數互動） | `number_input`（純數字比較） |
| 互動方式 | 按鈕點擊選答案 | 逐一點擊物件計數 → 再選答案 | 按鈕點擊選答案 |
| 顯示物件 | 是 | 是 | 否（純數字） |
| 最大數量 | 10 | 20 | 自訂範圍 |
| 相同數量機率 | 20% | 30% | 40% |
| 差異約束 | minDiff: 2, maxDiff: 5 | minDiff: 1, maxDiff: 8 | minDiff: 1, maxDiff: 3 |
| 得分 | 每題 +10 分 | 每題 +15 分 | 每題 +20 分 |

### 2.3 普通模式的點擊計數互動

普通模式的互動設計是 F5 的獨特亮點——使用者需要**逐一點擊左右兩組物件來計數**，完成兩側計數後才會顯示作答按鈕。每次點擊時系統播報當前計數（如「壹」、「貳」、「參」...），強化數量感知。

### 2.4 六種內建主題 + 自訂圖片

| 主題 | Emoji |
|------|-------|
| 水果 | 🍎🍌🍇🍓🍊🥝🍍🍉🍑🍒 |
| 動物 | 🐶🐱🐭🐰🦊🐻🐼🐨🐯🦁 |
| 交通工具 | 🚗🚕🚌🚓🚑🚒🚚🚲🚀✈️ |
| 形狀 | 🔵🟢🟡🟠🟣🔴⚫⚪🔺🔸 |
| 運動 | ⚽🏀🏈🎾🏐🏓🏸🥎🏑🏒 |
| 食物 | 🍔🍕🌭🥪🌮🌯🥙🍗🍟🥨 |
| 自訂 | 使用者上傳圖片（最多 8 個，壓縮至 200px、70% 品質） |

### 2.5 GameDebug 日誌系統（12 種分類）

F5 擁有完整的 `GameDebug` 物件，統一管理所有日誌輸出：

| 方法 | 用途 | 顏色 |
|------|------|------|
| `logInit()` | 初始化過程 | #4CAF50 綠色 |
| `logConfig()` | 配置載入 | #2196F3 藍色 |
| `logGameFlow()` | 遊戲流程 | #FF9800 橙色 |
| `logUI()` | UI 渲染 | #9C27B0 紫色 |
| `logAudio()` | 音效播放 | #795548 棕色 |
| `logSpeech()` | 語音合成 | #607D8B 藍灰色 |
| `logEvents()` | 事件處理 | #E91E63 粉紅色 |
| `logScoring()` | 計分邏輯 | #FFC107 黃色 |
| `logTimer()` | 計時器 | #00BCD4 青色 |
| `logGeneration()` | 題目生成 | #8BC34A 淺綠色 |
| `logRendering()` | 畫面渲染 | #FF5722 深橙色 |
| `logAnimation()` | 動畫控制 | #E040FB 紫紅色 |

額外工具：`logError()`、`logUserAction()`、`performance.start()`/`performance.end()`

### 2.6 統一完成畫面（C/F 系列標準）

F5 已採用 C/F 系列統一的測驗結束畫面樣式：
- 紫色漸層背景 (`linear-gradient(135deg, #667eea 0%, #764ba2 100%)`)
- 獎盃彈跳動畫 (`bounce`)
- 橙色表現徽章 + 發光動畫 (`glow`)
- 三個統計卡片（答對題數、正確率、完成時間）
- `confetti` 煙火動畫（v1.9.2 本地化）

### 2.7 作業單系統（11 種題型）

| # | 題型 ID | 說明 | 互動方式 |
|---|---------|------|---------|
| 1 | `num-check-big` | 數字(勾選)：找大 | 勾選較大數字 |
| 2 | `num-check-small` | 數字(勾選)：找小 | 勾選較小數字 |
| 3 | `num-check-mix` | 數字(勾選)：混合 | 隨機找大或找小 |
| 4 | `icon-hint-big` | 圖示(有提示)：找大 | 圈選較多組（附數量提示） |
| 5 | `icon-hint-small` | 圖示(有提示)：找小 | 圈選較少組（附數量提示） |
| 6 | `icon-hint-mix` | 圖示(有提示)：混合 | 隨機 |
| 7 | `icon-nohint-big` | 圖示(無提示)：找大 | 圈選較多組（無提示） |
| 8 | `icon-nohint-small` | 圖示(無提示)：找小 | 圈選較少組（無提示） |
| 9 | `icon-nohint-mix` | 圖示(無提示)：混合 | 隨機 |
| 10 | `num-symbol-mix` | 數字(填符號)：混合 | 填寫 >、<、= |
| 11 | `icon-symbol-mix` | 圖示(填符號)：混合 | 填寫 >、<、= |

**工具列配置**：
```javascript
toolbarConfig: {
    adjustCountButton: null,
    fontButton: { label: '📝 測驗題型', type: 'dropdown', options: [...] },
    orientationButton: { label: '📐 數量範圍', type: 'cycle', options: ['1-5', '1-10', '1-20'] }
}
```

---

## 三、語音系統

### 3.1 Web Speech API（TTS）

使用瀏覽器內建語音合成，優先選用繁體中文（台灣）語音：

**語音選擇優先順序**：
1. Microsoft HsiaoChen Online（台灣）
2. Google 國語（台灣）
3. 任何 `zh_TW` 語音（排除 Hanhan）
4. 任何 `zh` 語音

### 3.2 語音模板

各難度有獨立的語音模板集（`speechTemplates`）：

| 模板鍵 | 觸發時機 |
|--------|---------|
| `instruction` | 每題開始時的指導語 |
| `correct` | 答對時 |
| `incorrect` | 答錯時 |
| `correctAnswer` | 顯示正確答案時 |
| `complete` | 完成所有題目時 |
| `addCustomItem` | 新增自訂圖示時 |
| `removeCustomItem` | 移除自訂圖示時 |

### 3.3 NumberSpeechUtils 整合

F5 使用 `NumberSpeechUtils.convertToPureNumberSpeech()` 進行數字語音轉換（F 系列專用）。所有數字中的「2」一律唸為「貳」：

| 數字 | 語音 |
|------|------|
| 2 | 貳 |
| 12 | 拾貳 |
| 20 | 貳拾 |
| 22 | 貳拾貳 |

### 3.4 音效系統

| 音效 ID | 檔案 | 觸發時機 |
|---------|------|---------|
| `correct-sound` | `correct.mp3` | 答對回饋 |
| `success-sound` | `success.mp3` | 完成畫面 |
| `error-sound` | `error02.mp3` | 答錯回饋 |
| `select-sound` | `select.mp3` | 選擇物件 |
| `menu-select-sound` | `click.mp3` | 設定選單操作 |
| `click-sound` | `click.mp3` | 一般點擊 |

---

## 四、觸控與桌面支援

### 4.1 按鈕式互動（無拖放機制）

與 F3（卡片拖放配對）和 F4（數字拖放排序）不同，F5 **完全基於按鈕點擊互動**，不使用拖放機制。HTML 中無 `TouchDragUtility` 引用，也無內嵌 fallback 版本。

這使得 F5 的觸控與桌面支援更為簡潔：
- 所有互動皆為按鈕點擊或物件點擊
- 觸控與滑鼠操作體驗一致
- 無需處理 HTML5 Drag and Drop API 的跨平台差異

### 4.2 普通模式的點擊計數

普通模式中的物件點擊計數同時支援觸控與滑鼠：使用者點擊（或觸碰）左右兩組中的物件，每次點擊增加計數。此互動不依賴拖放，因此在所有裝置上行為一致。

### 4.3 audio-unlocker

使用 `audio-unlocker.js` 解決行動瀏覽器音訊自動播放限制，在設定頁面的首次使用者互動時觸發解鎖。

### 4.4 iPad 專用 CSS

獨立的 `css/f5_quantity_comparison_ipad.css`（308 行）提供 iPad 優化：
- 全視窗覆蓋（`!important` 覆寫）
- 放大字體（標題 32px+）
- Portrait 模式 12 欄網格
- Landscape 模式 15 欄網格
- 加大觸控目標（物件 80-90px）
- 放大比較符號（64-72px）
- 底部導覽列始終可見

---

## 五、版面配置

### 5.1 三階段畫面流程

```
設定頁面 → 遊戲頁面 → 完成頁面
```

### 5.2 三種模式版面差異

| 模式 | 版面特點 |
|------|---------|
| 簡單 | 左右兩組物件並排顯示，可直接觀察多寡 |
| 普通 | 可點擊物件（需逐一計數），完成後顯示比較按鈕 |
| 困難 | 左右兩組以數字顯示（A 組 / B 組），無物件圖示 |

### 5.3 獨立 CSS 檔案

`css/f5-quantity-comparison.css`（1,804 行）包含：
- CSS 變數系統（`--primary-color`、`--success-color`、`--error-color` 等）
- 標題列樣式（返回按鈕、遊戲標題、進度資訊）
- 比較區域樣式（左右兩組並排、中間比較符號）
- 物件項目樣式（emoji 渲染、點擊動畫）
- 作答按鈕樣式（三種狀態：預設、正確、錯誤）
- 數字面板覆蓋層樣式（困難模式）
- 20+ 種 CSS 動畫
- 響應式斷點（桌面 ≥1025px、平板 769-1024px、手機 481-768px、小手機 ≤480px）

---

## 六、動畫系統

### 6.1 @keyframes 動畫總覽

| 來源 | 數量 | 說明 |
|------|------|------|
| JS 內嵌 | 14 處定義 | 完成畫面 + 互動回饋動畫 |
| CSS 檔案 | 17 處定義 | 遊戲互動動畫 |
| **總計** | **31 處** | — |

### 6.2 JS 內嵌動畫列表

| # | 動畫名稱 | 行號 | 用途 | 重複定義 |
|---|----------|------|------|---------|
| 1 | `emphasis-glow` | 1227 | 強調發光 | 1 處 |
| 2 | `hint-border-flash` | 1239 | 提示邊框閃爍 | 1 處 |
| 3 | `lively-correct` | 1290 | 生動正確回饋 | **與 CSS 重複** |
| 4 | `frantic-incorrect` | 1299 | 激烈錯誤回饋 | **與 CSS 重複** |
| 5 | `pulse-correct` | 1310 | 正確脈衝 | 1 處 |
| 6 | `shake-incorrect` | 1316 | 錯誤抖動 | 1 處 |
| 7 | `hard-mode-correct` | 1330 | 困難模式正確 | 1 處 |
| 8 | `error-pulse` | 1398 | 錯誤脈衝 | 1 處 |
| 9 | `shake` | 1409 | 抖動 | **與 CSS 重複** |
| 10 | `correct-tick-appear` | 1448 | 正確勾號出現 | 1 處 |
| 11 | `fadeIn` | 1526 | 淡入 | **與 CSS 重複** |
| 12 | `celebrate` | 1531 | 慶祝 | 1 處 |
| 13 | `bounce` | 1537 | 上下彈跳 | **與 CSS 重複** |
| 14 | `glow` | 1543 | 發光 | 1 處 |

### 6.3 CSS 檔案動畫列表

| # | 動畫名稱 | 行號 | 用途 | 重複定義 |
|---|----------|------|------|---------|
| 1 | `checkmark-appear` | 240 | 勾號出現 | 1 處 |
| 2 | `pulse` | 481 | 脈衝 | **2 處（內部重複）** |
| 3 | `fadeInScale` | 780 | 淡入放大 | 1 處 |
| 4 | `pulse` | 791 | 脈衝 | **重複定義** |
| 5 | `bounce` | 800 | 彈跳 | **與 JS 重複** |
| 6 | `correctPulse` | 812 | 正確脈衝 | 1 處 |
| 7 | `shake` | 827 | 抖動 | **與 JS 重複** |
| 8 | `messageSlideIn` | 839 | 訊息滑入 | 1 處 |
| 9 | `firework` | 871 | 煙火 | 1 處 |
| 10 | `spin` | 1079 | 旋轉 | 1 處 |
| 11 | `fadeIn` | 1342 | 淡入 | **與 JS 重複** |
| 12 | `pulse-highlight` | 1418 | 脈衝高亮 | 1 處 |
| 13 | `bounce-in` | 1627 | 彈跳進場 | 1 處 |
| 14 | `lively-correct` | 1642 | 生動正確 | **與 JS 重複** |
| 15 | `frantic-incorrect` | 1650 | 激烈錯誤 | **與 JS 重複** |
| 16 | `correct-bounce` | 1664 | 正確彈跳 | 1 處 |
| 17 | `shake-error` | 1687 | 錯誤抖動 | 1 處 |

### 6.4 重複定義統計

| 動畫名稱 | JS 行號 | CSS 行號 | 狀態 |
|----------|---------|----------|------|
| `pulse` | — | 481, 791 | ⚠️ CSS 內部重複 |
| `fadeIn` | 1526 | 1342 | ⚠️ JS/CSS 跨檔案重複 |
| `bounce` | 1537 | 800 | ⚠️ JS/CSS 跨檔案重複 |
| `shake` | 1409 | 827 | ⚠️ JS/CSS 跨檔案重複 |
| `lively-correct` | 1290 | 1642 | ⚠️ JS/CSS 跨檔案重複 |
| `frantic-incorrect` | 1299 | 1650 | ⚠️ JS/CSS 跨檔案重複 |

**共計 6 組重複定義**

### 6.5 Canvas-Confetti 煙火效果

| 項目 | 說明 |
|------|------|
| 版本 | **v1.9.2**（本地化，與其他單元一致） |
| 檔案 | `js/confetti.browser.min.js` |
| 觸發時機 | 完成挑戰時（`completeGame()`） |
| 雙重觸發 | particleCount: 150 + 100，spread: 70 + 60 |

---

## 七、Bug 檢測與已知問題

### 7.1 已確認的程式碼問題

| # | 嚴重度 | 問題描述 | 數據 | 狀態 |
|---|--------|---------|------|------|
| 1 | **高** | `setTimeout` 未清理 | **17 個**回調式 setTimeout，已使用 TimerManager 管理 | ✅ **已修復** |
| 2 | **高** | `addEventListener` 未移除 | **5 處** addEventListener，已使用 EventManager 管理 | ✅ **已修復** |
| 3 | **中** | `@keyframes` 重複定義 | **14 組**，已移至 `injectGlobalAnimationStyles()` | ✅ **已修復** |
| 4 | **中** | `!important` 過多 | JS 71 個 + CSS 63 個 = **134 個** | ⚠️ 待改善 |
| 5 | ~~**低**~~ | ~~`console.log` 數量~~ | ~~62 個~~ **✅ 已修復 (2026-02-21)**：Debug Logger FLAGS 重構，252 個 GameDebug 呼叫統一管理，僅餘 4 個 raw console.log |
| 6 | **建議** | 無 Loading 畫面 | 建議參考 A6 新增 | ⚠️ 待新增 |
| 7 | **建議** | 無 Error Boundary | 建議參考 A6 新增 | ⚠️ 待新增 |
| 8 | **低** | 設定頁使用 `alert()` 阻塞式對話框（5 處，搜尋 `alert(`） | ⚠️ 暫緩（低優先） |

### 7.2 F5 vs F1/F3/F4 Bug 數量比較

| 問題類型 | F5 量比較 | F1 一對一對應 | F3 數字認讀 | F4 數字排序 | 評價 |
|---------|----------|-------------|------------|------------|------|
| 未清理 setTimeout | **0**（TimerManager） | 0（TimerManager） | 0（TimerManager） | 0（TimerManager） | ✅ 已對齊 |
| 未移除 addEventListener | **0**（EventManager） | 0（EventManager） | 0（EventManager） | 0（EventManager） | ✅ 已對齊 |
| @keyframes 重複 | **0**（全局注入） | 0（全局注入） | 0（全局注入） | 0（全局注入） | ✅ 已對齊 |
| console.log | **62** | 6 | 90+ | 36 | ⚠️ F5 較多（但有 GameDebug） |
| !important 總數 | **134** | 196 | 84 | 90 | ✅ F5 適中 |
| JS 行數 | **6,500+** | 7,468 | 4,750 | 4,013 | ✅ F5 適中 |
| TimerManager | ✅ **有** | ✅ 有 | ✅ 有 | ✅ 有 | ✅ 已對齊 |
| EventManager | ✅ **有** | ✅ 有 | ✅ 有 | ✅ 有 | ✅ 已對齊 |
| 全局動畫注入 | ✅ **有** | ✅ 有 | ✅ 有 | ✅ 有 | ✅ 已對齊 |

### 7.3 正面發現

| 項目 | 說明 |
|------|------|
| GameDebug 系統 | 完整的 12 種分類日誌 + 效能監測，是 F 系列中最完善的 |
| confetti 版本 | 使用 v1.9.2（本地化），版本一致 |
| 完成畫面 | 已採用 C/F 系列統一樣式 |
| 配置驅動架構 | QuantityComparisonConfig 設計良好 |
| timerInterval 清理 | 有 `clearInterval(this.timer)` 清理計時器（5 處） |
| iPad 專用 CSS | 唯一擁有獨立 iPad CSS 檔案的 F 系列單元 |
| 按鈕式互動 | 無拖曳機制，跨平台相容性較佳 |

### 7.4 記憶體洩漏風險分析（✅ 已修復）

**已修復的問題**：
- ✅ F5 已引入 `TimerManager`，17 個回調式 setTimeout 可統一清理
- ✅ F5 已引入 `EventManager`，5 處 addEventListener 可統一移除
- ✅ F5 有 `timerInterval` 清理（計時器專用）

**修復後的行為**：
1. 使用者返回設定頁面時，`init()` 會呼叫 `TimerManager.clearAll()` 清理所有計時器
2. 使用者返回設定頁面時，`init()` 會呼叫 `EventManager.removeAll()` 移除所有事件監聽器
3. 完成遊戲時，`completeGame()` 會呼叫 `TimerManager.clearByCategory('turnTransition')` 清理回合轉換計時器

### 7.5 非 Bug 但需注意的設計

| 項目 | 說明 |
|------|------|
| 獨立 CSS + iPad CSS | F1/F2/F3 已於 2026-02-24 完成 CSS 分離，F5 的獨立 CSS 方式已成為 F 系列共識；維護時需同步修改兩檔案（主 CSS + iPad CSS） |
| console.log 62 個 | 雖然有 GameDebug 系統，但數量較多 |
| 無拖曳機制 | 與 F1/F3/F4 互動方式不同，需要不同的測試策略 |

### 7.6 狀態管理現況

| 項目 | 狀態 |
|------|------|
| 統一重置函數 | ✅ `resetGameState()` |
| 布林旗標 | `isAnswering` |
| 重置位置 | 統一（2 處） |
| 評價 | ✅ **最佳實踐** |

**重構完成**（2026-02-17）：已實現統一的 `resetGameState()` 函數

**重置項目**：
- 核心狀態：`currentLevel`, `totalLevels`, `score`, `correctAnswers`, `totalAnswers`
- 自訂主題狀態：`state.startTime`, `state.isAnswering`
- 題目狀態：`currentQuestion`, `timeRemaining`, `timer`（含 clearInterval）

**調用位置**：
| 位置 | 調用條件 | 說明 |
|------|---------|------|
| `showSettingsScreen()` | 無條件 | 返回設定時重置狀態 |
| `startGame()` | 無條件 | 開始遊戲前重置狀態 |

**搜尋關鍵字**：`resetGameState`

---

## 八、未來開發建議

### 8.1 引入 TimerManager（優先）

**問題**：20 個 setTimeout 無對應清理機制。

**建議**：參考 F1/F3/F4 引入 `TimerManager`

```javascript
// 在 QuantityComparisonGame 類別中新增
TimerManager: {
    timers: new Map(),
    timerIdCounter: 0,

    setTimeout(callback, delay, category = 'default') {
        const id = ++this.timerIdCounter;
        const timerId = window.setTimeout(() => {
            this.timers.delete(id);
            callback();
        }, delay);
        this.timers.set(id, { timerId, category });
        return id;
    },

    clearByCategory(category) {
        this.timers.forEach((timer, id) => {
            if (timer.category === category) {
                window.clearTimeout(timer.timerId);
                this.timers.delete(id);
            }
        });
    },

    clearAll() {
        this.timers.forEach(timer => window.clearTimeout(timer.timerId));
        this.timers.clear();
    }
}
```

**整合位置**：
- `constructor()` / `init()` → `TimerManager.clearAll()`
- `showSettingsScreen()` → `TimerManager.clearAll()`
- `completeGame()` → `TimerManager.clearByCategory('turnTransition')`

### 8.2 引入 EventManager

**問題**：10 個 addEventListener 可能未完全移除。

**建議**：參考 F1/F3/F4 引入 `EventManager`

```javascript
EventManager: {
    listeners: [],

    on(element, type, handler, options = {}, category = 'default') {
        if (!element) return -1;
        element.addEventListener(type, handler, options);
        return this.listeners.push({ element, type, handler, options, category }) - 1;
    },

    removeByCategory(category) {
        this.listeners.forEach((l, i) => {
            if (l?.category === category && l.element) {
                try { l.element.removeEventListener(l.type, l.handler, l.options); } catch(e) {}
                this.listeners[i] = null;
            }
        });
    },

    removeAll() {
        this.listeners.forEach(l => {
            if (l?.element) {
                try { l.element.removeEventListener(l.type, l.handler, l.options); } catch(e) {}
            }
        });
        this.listeners = [];
    }
}
```

### 8.3 CSS 動畫統一管理

**問題**：6 組 @keyframes 重複定義。

**建議**：
1. 新增 `injectGlobalAnimationStyles()` 方法
2. 將 JS 中的 14 個 @keyframes 移至全局動畫注入函數
3. 刪除 CSS 中重複的 `pulse`（第 791 行）
4. 刪除 CSS 中與 JS 重複的定義（fadeIn, bounce, shake, lively-correct, frantic-incorrect）

### 8.4 清理 console.log

**問題**：62 個 console.log，雖然大部分通過 GameDebug 系統管理，但仍有獨立的。

**建議**：
1. 保留 GameDebug 系統內的日誌（透過 `config.enabled` 控制）
2. 移除或整合獨立的 console.log 語句
3. 生產環境設定 `GameDebug.config.enabled = false`

### 8.5 其他建議

- **GameDebug 系統共用化**：F5 的 GameDebug 設計完善，可提取為共用模組供其他單元採用
- **CSS 組織方式統一**：考慮是否要將 iPad CSS 合併至主 CSS（媒體查詢）
- **新增無障礙功能**：Loading 畫面、Error Boundary、Skip Link

---

## 九、總結

### F5 量比較的優勢

1. **GameDebug 系統**：12 種分類日誌 + 效能監測，是 F 系列中最完善的
2. **配置驅動架構**：QuantityComparisonConfig 設計良好，與 F4 一致
3. **完成畫面統一**：已採用 C/F 系列標準樣式
4. **confetti 版本一致**：使用 v1.9.2 本地化版本
5. **按鈕式互動**：無拖曳機制，跨平台相容性較佳
6. **iPad 專用 CSS**：唯一擁有獨立 iPad 優化的 F 系列單元
7. **timerInterval 清理**：有計時器清理機制
8. **作業單題型豐富**：11 種題型，是 F 系列中最多的

### F5 量比較的待改進處

1. ~~**20 個未清理 setTimeout**~~ → ✅ TimerManager 已引入（2026-02-12）
2. ~~**10 個 addEventListener 可能殘留**~~ → ✅ EventManager 已引入（2026-02-12）
3. **6 組 @keyframes 重複定義** → ⚠️ 需整合為全局注入
4. **無 Loading / Error Boundary** → ⚠️ 建議參考 A6 新增

### 核心數據

| 指標 | 數值 |
|------|------|
| 主程式行數 | **6,445 行** |
| CSS 行數 | **2,112 行**（主 1,804 + iPad 308） |
| setTimeout 數量 | **0 個原生**（✅ TimerManager 統一管理，2026-02-12） |
| addEventListener 數量 | **0 個原生**（✅ EventManager 統一管理，2026-02-12） |
| @keyframes 重複 | **6 組** |
| console.log | **62 個**（有 GameDebug 系統） |
| !important | **134 個**（JS 71 + CSS 63） |

| 指標 | 數值 |
|------|------|
| 難度模式 | 3 種 |
| 語音模板 | 7+ 個/難度 |
| 音效 | 6 個 |
| 外部依賴 | 7 個 JS（含本地 confetti） |
| 作業單題型 | 11 種 |
| 互動方式 | 按鈕點擊（無拖曳） |
| 自訂主題 | 支援圖片上傳（最多 8 個） |

### 與 F1/F3/F4 差距分析

| 項目 | F1 一對一對應 | F3 數字認讀 | F4 數字排序 | F5 量比較 | 差距 |
|------|-------------|------------|------------|----------|------|
| TimerManager | ✅ 有 | ✅ 有 | ✅ 有 | ✅ **有** | ✅ 已對齊 |
| EventManager | ✅ 有 | ✅ 有 | ✅ 有 | ✅ **有** | ✅ 已對齊 |
| 全局動畫注入 | ✅ 有 | ✅ 有 | ✅ 有 | ✅ **有** | ✅ 已對齊 |
| GameDebug 系統 | 8 種分類 | 無 | 6 種分類 | **12 種分類** | ✅ F5 最佳 |
| 獨立 CSS | ❌ 無 | ❌ 無 | ✅ 有 | ✅ 有 | 設計選擇 |
| iPad CSS | ❌ 無 | ❌ 無 | ❌ 無 | ✅ **有** | F5 獨有 |

---

## 十、修復建議優先順序

| 優先級 | 項目 | 預估工作量 | 效益 | 狀態 |
|--------|------|-----------|------|------|
| **P0** | 引入 TimerManager | 中（約 50 行程式碼 + 17 處替換） | 防止記憶體洩漏 | ✅ **已完成** |
| **P0** | 引入 EventManager | 中（約 30 行程式碼 + 5 處替換） | 防止事件疊加 | ✅ **已完成** |
| **P1** | 全局動畫注入 | 中（約 40 行程式碼） | 消除 14 組重複定義 | ✅ **已完成** |
| **P1** | 清理 CSS @keyframes 重複 | 小（刪除 5 處重複定義） | 減少 CSS 體積 | ✅ **已完成** |
| **P2** | 清理獨立 console.log | 小 | 減少生產環境噪音 | ⚠️ 待處理 |
| **P2** | 新增無障礙功能 | 大（參考 A6） | 提升使用者體驗 | ⚠️ 待處理 |

---

## 十一、修復記錄

### 2026-02-12：TimerManager、EventManager 與全局動畫注入

**修改檔案**：
- `js/f5_quantity_comparison.js`
- `css/f5-quantity-comparison.css`
- `F5_Unit_Completion_Report.md`

**修改內容**：

1. **新增 TimerManager 靜態屬性**
   - 位置：`QuantityComparisonGame` 類別末尾
   - 方法：`setTimeout(callback, delay, category)`、`clearTimeout(id)`、`clearAll()`、`clearByCategory(category)`
   - 將 17 處回調式 `setTimeout` 改為 `QuantityComparisonGame.TimerManager.setTimeout()`
   - 分類：`animation`（動畫相關）、`turnTransition`（回合轉換）

2. **新增 EventManager 靜態屬性**
   - 位置：`QuantityComparisonGame` 類別末尾
   - 方法：`on(element, type, handler, options, category)`、`removeAll()`、`removeByCategory(category)`
   - 將 5 處 `addEventListener` 改為 `QuantityComparisonGame.EventManager.on()`
   - 分類：`gameUI`（遊戲 UI）、`resultsUI`（結果畫面）

3. **新增 injectGlobalAnimationStyles() 方法**
   - 位置：`init()` 方法之後
   - 注入 14 個全局 @keyframes 動畫定義
   - 動畫列表：emphasis-glow、hint-border-flash、lively-correct、frantic-incorrect、pulse-correct、shake-incorrect、hard-mode-correct、error-pulse、shake、correct-tick-appear、fadeIn、celebrate、bounce、glow

4. **修改 init() 方法**
   - 在開始時呼叫 `TimerManager.clearAll()` 和 `EventManager.removeAll()`
   - 呼叫 `injectGlobalAnimationStyles()` 注入全局動畫

5. **修改 completeGame() 方法**
   - 在開始時呼叫 `TimerManager.clearByCategory('turnTransition')`

6. **刪除 JS 中重複的 @keyframes**
   - `gameScreenStyles()`：移除 10 個 @keyframes 定義
   - `resultsScreen()`：移除 4 個 @keyframes 定義

7. **刪除 CSS 中重複的 @keyframes**
   - 移除 pulse、bounce、shake、fadeIn、lively-correct、frantic-incorrect（共 5 處）

**驗證方法**：
1. 計時器清理測試：開始遊戲 → 返回設定 → 再開始，確認無重複執行
2. 事件監聽器測試：Chrome DevTools 確認事件不疊加
3. 動畫測試：三種難度 + 完成畫面動畫正常
4. 功能回歸：三種難度、六種主題、語音、煙火

---

### 2026-02-16：系統性驗證

**驗證內容**：

| 項目 | 狀態 | 說明 |
|------|------|------|
| TimerManager | ✅ 正常 | 第 6421 行起，靜態屬性統一管理計時器 |
| EventManager | ✅ 正常 | 第 6461 行起，靜態屬性統一管理事件監聽器 |
| injectGlobalAnimationStyles | ✅ 正常 | 第 2238 行起，全局動畫注入 |
| completeGame() | ✅ 正常 | 第 5515 行呼叫 `TimerManager.clearByCategory('turnTransition')` |
| confetti 煙火 | ✅ 正常 | 使用 v1.9.2 本地化版本 |

**使用統計**：
- TimerManager.setTimeout：20+ 處調用
- EventManager.on：5 處調用

**結論**：F5 單元已達到 F 系列標準，無需進一步修改。

---

### 2026-02-17：狀態管理重構（resetGameState）

**問題**：
- 狀態重置邏輯分散於 7 個不同位置
- `currentLevel`、`score`、`isAnswering` 等多個狀態需要重置
- 不符合 C1/C2/C4/C5/C6/F1/F3/F4 等單元的最佳實踐

**修改內容**：

1. **新增 `resetGameState()` 方法**
   - 位置：`injectGlobalAnimationStyles()` 之後
   - 集中管理所有遊戲相關狀態的重置
   - 重置項目：
     - 核心狀態：`currentLevel`, `totalLevels`, `score`, `correctAnswers`, `totalAnswers`
     - 自訂主題狀態：`state.startTime`, `state.isAnswering`
     - 題目狀態：`currentQuestion`, `timeRemaining`, `timer`（含 clearInterval）
   - 輸出日誌：`🔄 [F5] 遊戲狀態已重置`

2. **調用位置**
   | 位置 | 調用條件 | 說明 |
   |------|---------|------|
   | `showSettingsScreen()` | 無條件 | 返回設定時重置狀態 |
   | `startGame()` | 無條件 | 開始遊戲前重置狀態 |

**修改檔案**：
- `js/f5_quantity_comparison.js`

**驗證方式**：
1. 開啟 F5 量比較
2. 完成部分測驗後點擊「返回設定」
3. Console 應顯示「🔄 [F5] 遊戲狀態已重置」
4. 重新開始遊戲，確認題目從第 1 題開始、分數為 0、狀態清空

---

### 2026-02-21：Debug Logger 重構為 FLAGS 分類開關系統

**問題**：
- 68 個直接 console.log/warn/error 呼叫分散於程式碼中
- 難以按需開啟/關閉特定分類的日誌
- 生產環境日誌過多

**修改內容**：

1. **重構 GameDebug 物件為 FLAGS 分類開關系統**
   - 新增 `FLAGS` 物件：15 個分類開關
   - 預設全部關閉，僅 `error: true` 保持開啟
   - 新增 `log(category, ...args)`、`warn(category, ...args)`、`error(...args)` 方法
   - 保留向後相容包裝方法：`logInit()`, `logConfig()`, `logGameFlow()`, `logUI()`, `logAudio()`, `logSpeech()`, `logEvents()`, `logScoring()`, `logTimer()`, `logGeneration()`, `logRendering()`, `logAnimation()`, `logUserAction()`, `logError()`

2. **FLAGS 分類一覽**
   | 分類 | 說明 | 預設值 |
   |------|------|--------|
   | `all` | 全域開關（開啟則顯示所有分類） | `false` |
   | `init` | 初始化過程 | `false` |
   | `config` | 配置載入 | `false` |
   | `game` | 遊戲流程 | `false` |
   | `ui` | UI 渲染 | `false` |
   | `audio` | 音效播放 | `false` |
   | `speech` | 語音合成 | `false` |
   | `events` | 事件處理 | `false` |
   | `scoring` | 計分邏輯 | `false` |
   | `timer` | 計時器 | `false` |
   | `question` | 題目生成 | `false` |
   | `render` | 畫面渲染 | `false` |
   | `animation` | 動畫控制 | `false` |
   | `state` | 狀態管理 | `false` |
   | `error` | 錯誤訊息 | `true` |

3. **轉換統計**
   - 原始 console 呼叫：68 個
   - 轉換為 GameDebug：65 個
   - 保留（Debug 系統內部）：3 個

4. **使用方式**
   ```javascript
   // 開啟特定分類
   GameDebug.FLAGS.ui = true;
   GameDebug.FLAGS.events = true;

   // 開啟所有分類
   GameDebug.FLAGS.all = true;
   ```

**修改檔案**：
- `js/f5_quantity_comparison.js`
- `CLAUDE.md`（新增修復記錄）
- `F5_Unit_Completion_Report.md`（本文件）

**驗證方式**：
1. 開啟 F5 量比較遊戲
2. 預設情況下 Console 應無一般日誌（僅錯誤）
3. 在 Console 輸入 `GameDebug.FLAGS.ui = true` 後操作 UI，應顯示 UI 分類日誌
4. 輸入 `GameDebug.FLAGS.all = true` 應顯示所有分類日誌

---

### 2026-02-23：動畫整合確認 + 嵌套物件修復（this.Debug → GameDebug）

**背景**：系統性檢查 F5 單元的 CSS 動畫定義是否集中管理，以及是否存在嵌套物件中 `this.Debug` 失效的問題。

**1. CSS 動畫整合確認**

檢查結果：`injectGlobalAnimationStyles()` 已存在（2026-02-12 實現），共包含 **14 個 @keyframes**：

| # | 動畫名稱 | 用途 |
|---|---------|------|
| 1 | `emphasis-glow` | 強調發光 |
| 2 | `hint-border-flash` | 提示邊框閃爍 |
| 3 | `lively-correct` | 活潑正確動畫 |
| 4 | `frantic-incorrect` | 錯誤抖動動畫 |
| 5 | `pulse-correct` | 正確脈衝 |
| 6 | `shake-incorrect` | 錯誤搖晃 |
| 7 | `hard-mode-correct` | 困難模式正確 |
| 8 | `error-pulse` | 錯誤脈衝 |
| 9 | `shake` | 搖晃 |
| 10 | `correct-tick-appear` | 正確勾出現 |
| 11 | `fadeIn` | 淡入 |
| 12 | `celebrate` | 慶祝 |
| 13 | `bounce` | 彈跳 |
| 14 | `glow` | 發光 |

散落在各函數的 @keyframes 定義（5 處）已確認皆為注解，無需額外整合。

**2. 嵌套物件修復（this.Debug → GameDebug）**

**問題說明**：F5 使用 `class QuantityComparisonGame` 結構，Debug 系統為外部全域常數 `const GameDebug = { ... }`，在建構子中以 `this.Debug = GameDebug` 賦值。當類別方法作為 DOM 事件回呼或非同步回呼執行時，`this` 可能指向錯誤對象，導致 `this.Debug` 失效。

**修復內容**：
- 掃描全檔，找到 **165 個** `this.Debug.` 呼叫
- 全部以 `replace_all` 替換為 `GameDebug.`
- 替換後驗證：0 個 `this.Debug.` 殘留

**F5 特殊說明**：
- F5 為 class 結構，Debug 引用需使用 `GameDebug.`（而非 F1–F4 的 `Game.Debug.`）
- `GameDebug` 包裝方法使用箭頭函數，內部已明確呼叫 `GameDebug.log(...)`，無 `this` 繫結問題

**修改統計**：

| 項目 | 修改前 | 修改後 |
|------|--------|--------|
| `this.Debug.*` 呼叫 | 165 個 | 0 個 |
| `GameDebug.*` 呼叫 | (原有) | 全部使用 |
| @keyframes 分散定義 | 已為注解 | 無需變動 |

**修改檔案**：
- `js/f5_quantity_comparison.js`（165 個 `this.Debug.` → `GameDebug.`）
- `CLAUDE.md`（新增修復記錄）
- `F5_Unit_Completion_Report.md`（本文件，修正一覽表 + 新增修復記錄）

**驗證方式**：
1. 開啟 F5 量比較遊戲，執行各種操作（答題、切換難度、完成遊戲）
2. 預設情況下 Console 應無一般日誌（僅錯誤）
3. 在 Console 輸入 `GameDebug.FLAGS.ui = true` 後操作 UI，應顯示 UI 分類日誌
4. 確認動畫正常（慶祝動畫、正確/錯誤回饋動畫）

---

### 2026-02-24（第二輪）：新發現 Bug 修復（Bug #8）

**問題 1（Bug #8）— 作業單連結傳入錯誤/多餘的遊戲設定參數（高）**：

- 作業單連結原本傳遞 `difficulty`、`rangeMode` 等遊戲設定參數
- F5 作業單（`worksheet/units/f5-worksheet.js`）有自己的工具列（題型 dropdown + 數量範圍 cycle），使用者可在作業單內自行調整
- 作業單參數名稱（`rangeMode: 'small'/'medium'/'large'`）與遊戲設定（`quantityRange: '1-5'/'1-10'/...`）格式不同，且 `difficulty` 根本不被 F5 作業單使用
- **修復**：只傳 `unit: 'f5'`，讓作業單完全使用自己的預設值與工具列設定，不受遊戲設定影響

**第二輪稽核其他發現（無需修復）**：

- EventManager：`bindGroupClickEvents()` / `bindNormalTestClickEvents()` 使用 `_clickHandler` 屬性儲存處理器引用，並有對應的 `unbindGroupClickEvents()` / `unbindNormalTestClickEvents()` 清理函數，功能正確，為 F5 特有架構（EventManager 系統亦存在）
- `gameState` 屬性：通過 `init()` → `this.gameState = 'menu'` 正確重置，無問題
- 完成畫面：符合 C/F 系列標準

---

### 2026-02-24：作業單連結統一簡化（僅傳 unit 參數）

**修改內容**：

- 作業單連結原本傳遞遊戲設定參數（`difficulty`, `rangeMode`）
- 各作業單已有完整工具列，用戶開啟後可直接在工具列調整；遊戲設定與作業單設定應獨立運作
- **修復**：移除所有多餘參數，統一改為只傳 `unit` 參數，讓作業單完全使用自己的預設値

**修改檔案**：`js/f5_quantity_comparison.js`

---

---

### 2026-02-24：主題「預設」選項新增

**修改檔案**：`js/f5_quantity_comparison.js`

**問題描述**：
- 設定頁「主題選擇」只有固定主題（水果/動物/交通工具/形狀/運動/食物/自訂），缺少隨機選擇選項
- 初始主題值為 `null`，需要使用者每次手動選擇

**修改內容**：

1. **新增「預設 🎲」主題按鈕**
   - 位置：設定頁主題選擇按鈕群組，排在第一個
   - 功能：隨機從全部內建主題（水果/動物/交通工具/形狀/運動/食物）混合選取圖示
   - 初始選取狀態：預設選中「預設 🎲」

2. **初始設定值修改**
   - `theme` 初始值：`null` → `'default'`

3. **主題生成邏輯**
   - 進入 `default` 模式時，合併所有非自訂主題的 emoji 組成完整池
   - 每題從完整池中隨機選取，達到自然混合效果

**搜尋關鍵字**：`theme: 'default'`, `'預設 🎲'`

---

---

### 2026-02-25/26：語音競態條件修復、跨場次污染修復與簡單模式語音指令

**問題描述（共 4 個）**：

1. **普通模式點擊語音競態（Bug）**：點擊計數圖示時，每次點擊都會啟動一個獨立的 `async handleNormalTestClick()`。新點擊呼叫 `speechSynth.cancel()` 取消前一次語音，但被取消語音的 `onerror` 會立即觸發 → Promise 解析 → 舊的 `.then()` 回呼呼叫 `checkNormalTestComplete()`，使最後一個數字語音尚未播完就觸發答題完成。

2. **簡單模式重複計分（Bug）**：`handleEasyModeAutoResult()` 在某些競態下被呼叫兩次，導致同一題答對計分兩次（顯示答對 2 題，實為 1 題）。

3. **跨場次計時器污染導致 0/0 分（Bug，兩種模式皆有）**：
   - `resetGameState()` 呼叫 `TimerManager.clearAll()` + `speechSynth.cancel()`
   - 被取消語音的 `onerror` **在 clearAll 之後才非同步觸發**
   - `.then()` 回呼在此時建立一個全新計時器（不在 clearAll 管轄範圍內）
   - 該計時器在 800ms 後觸發 `completeGame()`，此時新場次分數為 0
   - 結果：測驗總結視窗顯示 0/0

4. **簡單模式語音指令（功能需求）**：進入簡單模式測驗頁面時，應依比較模式播放對應語音指令（如「請找出數量較少、數字較小的是哪一組？」）。

---

**修復方案**：

#### Fix 1 — `lastSpeakId` 語音競態鎖（`handleNormalTestClick`）

```javascript
// 每次點擊遞增，確保只有「最後一次」點擊的 await 之後才繼續
const mySpeakId = ++this.lastSpeakId;
await this.speak(newCount.toString());
if (mySpeakId === this.lastSpeakId) {
    this.checkNormalTestComplete();
}
```

- `lastSpeakId` 在 constructor 初始化（`= 0`）
- `resetGameState()` 重置為 `0`
- `renderQuestion()` 每題重置為 `0`

#### Fix 2 — `easyModeResultShown` 防重複旗標（`handleEasyModeAutoResult`）

```javascript
if (this.easyModeResultShown) return;
this.easyModeResultShown = true;
// ... 計分、語音、下一題 ...
```

- `easyModeResultShown` 在 constructor 初始化（`= false`）
- `resetGameState()` 重置為 `false`
- `renderQuestion()` 每題重置為 `false`

#### Fix 3 — `gameSessionId` 跨場次隔離機制（根本原因修復）

**核心概念**：每次 `resetGameState()` 推進場次 ID；所有非同步回呼在啟動時快照 `mySessionId`，在執行時比對當前場次，若不符則提前返回。

```javascript
// resetGameState() 中
this.gameSessionId = (this.gameSessionId || 0) + 1;

// 每個 .then() 回呼的開頭
const mySessionId = this.gameSessionId;
someAsyncOperation().then(() => {
    if (mySessionId !== this.gameSessionId) return; // 舊場次，略過
    TimerManager.setTimeout(() => {
        if (mySessionId !== this.gameSessionId) return; // 雙重檢查
        // ... 正常邏輯 ...
    }, delay, 'turnTransition');
});
```

**涵蓋的 6 個 `.then()` 位置**：

| 函數 | 路徑 | 行號（約） |
|------|------|-----------|
| `handleEasyModeAutoResult()` | speak → completeGame/nextQuestion | 4475, 4480 |
| `handleCorrectAnswer()` easy 分支 | speak(optionText) → addVisualEffects → nextQuestion/completeGame | 4551 |
| `handleComparisonAnswer()` 正確路徑 | handleCorrectAnswer → nextQuestion/completeGame | 3731, 3733 |
| `handleComparisonAnswer()` 錯誤路徑 | handleIncorrectAnswer → showNextButton/completeGame | 3826, 3828 |
| `handleGroupSelection()` 錯誤路徑 | handleIncorrectAnswer → nextQuestion/completeGame | 3876, 3883 |
| `checkAnswer()` 正確 + 錯誤路徑 | speak → nextQuestion/completeGame | 3957, 3961 |

#### Fix 4 — 簡單模式語音指令（`speakInstruction`）

```javascript
// 簡單模式 easy 分支末尾
if (instruction) {
    this.speak(instruction); // 非阻塞，使用者可立即開始點擊
}
```

語音在每道新題目的 `speakInstruction()` 中觸發，依比較模式播放不同指令文字。

---

**修改統計**：

| 新增屬性 | 初始化位置 | 重置位置 |
|---------|-----------|---------|
| `this.lastSpeakId` | constructor | `resetGameState()` + `renderQuestion()` |
| `this.easyModeResultShown` | constructor | `resetGameState()` + `renderQuestion()` |
| `this.gameSessionId` | constructor | `resetGameState()`（+1 遞增） |

**修改函數**：`constructor`、`resetGameState`、`renderQuestion`、`handleNormalTestClick`、`handleEasyModeAutoResult`、`handleCorrectAnswer`（easy 分支）、`handleComparisonAnswer`、`handleGroupSelection`、`checkAnswer`、`speakInstruction`

**修改檔案**：
- `js/f5_quantity_comparison.js`
- `CLAUDE.md`（修復記錄速查表）
- `report/F5_Unit_Completion_Report.md`（本文件）
- `file_relationship/Project_File_Relationship.md`

**驗證方式**：
1. **簡單模式**：設定 1 題，開始遊戲 → 等待自動答題完成 → 確認總結視窗顯示答對 1/1（非 2/1 或 0/0）
2. **普通模式**：設定 1 題，開始遊戲 → 逐一點擊圖示計數 → 完成後確認總結視窗顯示答對 1/1（非 0/0）
3. **多次遊玩**：連續玩 3 次以上，確認每次總結視窗顯示正確分數，無「恭喜完成所有題目」語音重疊
4. **語音指令**：簡單模式進入測驗頁面時，應播放對應比較模式的語音指令

---

### 2026-02-27：completeGame() 重複呼叫防護

**問題**：`completeGame()` 無守衛，語音 callback 非同步完成時可能重複觸發完成畫面。

**修復**：利用現有 `this.gameState` 欄位作為守衛（避免新增冗餘旗標）：
```javascript
// completeGame() 入口加入守衛
if (this.gameState === 'finished') {
    GameDebug.log('state', '⚠️ [F5] completeGame 已執行過，忽略重複呼叫');
    return;
}
// resetGameState() 補加
this.gameState = 'idle';
```

**說明**：F5 已有 `gameSessionId` 非同步保護機制（防止跨場次計時器污染），`gameState` 守衛補強同場次內的重複呼叫防護。

**修改檔案**：`js/f5_quantity_comparison.js`

---

### 2026-02-27：speakSync() safeCallback 防護

**問題**：`speakSync()` 的 `utterance.onend`（在 `if (callback)` 區塊內）與 `utterance.onerror`（在 `if (callback)` 外）分別呼叫 `callback()`。若 onend 與 onerror 在邊緣情況下同時觸發，callback 被重複執行兩次。

**修復**：
```javascript
if (callback) {
    let callbackExecuted = false;
    const safeCallback = () => {
        if (!callbackExecuted) { callbackExecuted = true; callback(); }
    };
    utterance.onend = () => { ...; safeCallback(); };
    utterance.onerror = (event) => { ...; safeCallback(); };
} else {
    utterance.onerror = (event) => { ... };
}
```

**修改檔案**：`js/f5_quantity_comparison.js`

---

*報告更新時間：2026-02-27*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

## 2026-02-27（第四輪）：speakSync() safeCallback 備援超時修復

**問題**：`speakSync()` 函數（行 5976–5996）的 `safeCallback` 僅依賴 `utterance.onend` 和 `utterance.onerror`。若語音合成系統無聲失敗，callback 永遠不執行，導致遊戲流程卡住。

**修復**：在 `if (callback)` 區塊內，`onerror` 設定之後加入：
```javascript
QuantityComparisonGame.TimerManager.setTimeout(safeCallback, 10000, 'speech');
```

**修改檔案**：`js/f5_quantity_comparison.js`

---

*報告更新時間：2026-02-27*
*報告產生者：Claude Code (claude-sonnet-4-6)*

### 2026-02-28
- `completeGame()` 中 `elapsedMs = endTime - this.state.startTime` 改為 `this.state.startTime ? (endTime - this.state.startTime) : 0`，防止 startTime 未設定時顯示 NaN 時間
- `startTimer()` 從 `this.timer = setInterval(...)` 改為遞迴 `tick()` 使用 `QuantityComparisonGame.TimerManager.setTimeout(tick, 1000, 'timer')`，可由 `clearByCategory('timer')` 立即停止

---

## 廢棄程式碼稽核（2026-03-01）

**稽核範圍**：`js/f5_quantity_comparison.js`（6,606 行）

### 結論：發現 2 處需記錄的廢棄程式碼（未刪除）

| 類型 | 位置 | 內容 | 嚴重性 | 建議 |
|------|------|------|--------|------|
| **備用函數（從未呼叫）** | Lines 3407–3459 | `renderObjectsOld()` — 約 52 行，函數說明標記為「舊版本 - 保留作為備用」；全域搜尋確認從未被呼叫 | 中 | 可安全刪除 |
| **已注解程式碼區塊** | Lines 6190–6203 | AudioContext 狀態監控代碼（14 行）；注解說明「已移除 — 此專案使用 HTML5 Audio 元素，不需要監控 Web Audio API」 | 低 | 可清除注解區塊 |
| 向後相容 shim | Lines 68–89 | 多個舊 API 對應方法（`logInit()`、`logConfig()` 等） | 低 | 刻意保留的相容層 |
| console.log | Lines 51, 57, 63 | Debug 系統內部呼叫 | — | 已受 FLAGS 守衛，無需處理 |

### 廢棄項目詳情

#### 1. `renderObjectsOld()` 函數（Lines 3407–3459）
- **函數完整名稱**：`renderObjectsOld()`
- **搜尋確認**：全檔案無任何呼叫點，確為死程式碼
- **保留原因（推測）**：原開發者標注「保留作為備用」，是重構時保留的舊版本
- **刪除風險**：低（無任何呼叫點）

#### 2. 已注解的 AudioContext 監控（Lines 6190–6203）
```javascript
// [已移除] 此專案使用 HTML5 Audio 元素，不需要監控 Web Audio API 的 AudioContext 狀態
// const audioContextMonitor = ...
```
- **說明**：完整的 AudioContext 監控邏輯，已被注解且附有說明
- **刪除風險**：低（已確認不需要）

**整體評估**：整體程式碼品質良好；`renderObjectsOld()` 是唯一需要刪除的真正死程式碼。

### 補充稽核（2026-03-02）

| 類型 | 位置 | 內容 | 嚴重性 | 建議 |
|------|------|------|--------|------|
| **原生 setTimeout（async sleep，動畫延遲）** | Lines 3522, 3527 | `await new Promise(resolve => setTimeout(resolve, animationInterval))` 及 `setTimeout(resolve, 500)` — 動畫循環中的 async/await 延遲 | 低（刻意保留） | 同 F4/C4 的 async sleep 模式；語義上不適合轉為 TimerManager，可加注解說明 |
| **原生 setTimeout（async sleep，語音取消）** | Line 5746 | `await new Promise(resolve => setTimeout(resolve, 100))` — 語音取消後的短暫等待 | 低（刻意保留） | 同上 |
| **`alert()` 呼叫（設定/上傳驗證）** | Lines 2617, 2821, 4778, 6256, 6451 | 共 5 處，用於數字範圍驗證、數量驗證、圖片上傳限制提示 | 低 | 功能正常；若需提升 UX 可改為非阻塞式提示 |

---

## 跨輪計時器洩漏稽核（2026-03-03）

**稽核背景**：A3 單元曾發現 `speakText()` 10 秒備援計時器在下一輪觸發導致跳輪的 Bug，已對全系列交叉稽核。

**F5 稽核結論：安全（無此問題）**

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

## 第五輪修復（2026-03-05）

### Fix 1：簡單模式設定頁不顯示測驗模式選項

**問題描述**

設定頁簡單模式下顯示「📝 測驗模式：反複作答 / 單次作答」，但簡單模式不需此選項（同 F4 行為）。

**修復內容**

1. **新增 `updateTestModeVisibility(difficulty)`**（置於 `updateStartButton()` 之後）
   - `difficulty === 'easy'` 時：隱藏 testMode 設定群組，並自動設 `gameSettings.testMode = 'retry'`
   - 其他難度：恢復顯示

2. **`validateSettings()` easy 分支**：排除 `testMode` 必填項，避免 Start 按鈕永遠無法啟用

3. **呼叫點**：
   - `showSettingsScreen()` 渲染完成後呼叫
   - `handleSettingSelection()` 難度切換時呼叫

---

### Fix 2：普通模式結果畫面計分 0/0

**問題描述**

普通模式完成後，結果畫面顯示「答對 0 題 / 共 0 題」。

**根本原因**

`checkAnswer()` 是普通模式群組比較按鈕（較大/較小等）的專用答案驗證函數，與其他模式的 `handleCorrectAnswer()` 路徑完全獨立。原始實作只有動畫、音效、語音和 `completeGame()` 呼叫，完全缺少 `totalAnswers` 和 `correctAnswers` 的遞增邏輯。

**修復內容**

在 `checkAnswer()` 加入計分：

```javascript
if (isCorrect) {
    this.totalAnswers++;
    this.correctAnswers++;
    // ... 原有動畫/語音/completeGame
} else {
    if (gameConfig.testMode.id === 'single') {
        this.totalAnswers++;  // 單次作答：計入總數
        // ... 原有錯誤處理
    }
    // 反複作答：不計入，讓學生重試
}
```

**影響範圍**

僅影響 F5 普通模式（`difficulty === 'normal'`）的群組比較按鈕答題路徑。

---

## 跨單元修復（2026-03-05）— 設定頁連結按鈕文字粗黑修復

（詳細說明見 `report/A1_Unit_Completion_Report.md` 跨單元修復章節）

**問題**：`css/ai-theme.css` 全域 `a {}` 規則的 `transition: color` 使 `a.selection-btn { color: #000 !important }` 在 CSS 過渡期間失效，設定頁「開啟獎勵系統」連結按鈕文字呈現藍色而非粗黑。

**修復**：`css/ai-theme.css` 的 `a {}` 和 `a:hover {}` 改為 `a:not(.selection-btn):not(.choice-btn) {}`。

**關鍵搜尋詞**：`a:not(.selection-btn):not(.choice-btn)` in `css/ai-theme.css`

---

## 第六輪修復（2026-03-08）

### 修復一：`handleCorrectAnswer()` Debug 日誌除以零防護

**問題描述**

`handleCorrectAnswer()` 中的 `GameDebug.logScoring()` 計算 `accuracy` 時無除以零防護：

```javascript
// 修復前（第一次答對時 totalAnswers 可能為 0）
accuracy: Math.round((this.correctAnswers / this.totalAnswers) * 100)
```

第一次呼叫時 `this.totalAnswers` 為 0，產生 `NaN`，雖不影響遊戲功能，但會在 `GameDebug.scoring` 分類開啟時輸出 `NaN%`。

**修復**：加入 `totalAnswers > 0` 防護：

```javascript
accuracy: this.totalAnswers > 0 ? Math.round((this.correctAnswers / this.totalAnswers) * 100) : 0
```

**搜尋關鍵字**：`accuracy: this.totalAnswers > 0 ? Math.round`（`handleCorrectAnswer` 內）

---

### 修復二：`showResultsScreen()` Debug 日誌除以零防護

**問題描述**

`showResultsScreen()` 的 `GameDebug.logScoring()` 中有 `rawAccuracy` 計算：

```javascript
// 修復前
rawAccuracy: this.correctAnswers / this.totalAnswers
```

`totalAnswers` 為 0 時產生 `NaN`。

**修復**：

```javascript
rawAccuracy: this.totalAnswers > 0 ? this.correctAnswers / this.totalAnswers : 0
```

**說明**：同函數的 `accuracy` 已有防護（`totalAnswers > 0 ? ... : 0`），本次補齊 `rawAccuracy` 的防護，保持一致性。

**搜尋關鍵字**：`rawAccuracy: this.totalAnswers > 0 ?`

---

## 修復記錄（2026-03-10）— 設定頁自訂主題按鈕樣式同步 F2

**問題**：F5 設定頁面自訂主題區的「📸 上傳圖片」按鈕和「❌」刪除按鈕無 CSS 樣式定義，呈現瀏覽器預設外觀，與 F2 設計不一致。

**根因**：F5 的設定頁 CSS 在 `QuantityComparisonTemplates.settingsScreen` 的 `<style>` 區塊中，只含 modal 按鈕樣式，缺少 `.upload-btn` 和 `.remove-btn` 的定義。

**修復**：`QuantityComparisonTemplates.settingsScreen` `<style>` 區塊新增 `.upload-btn`（暖色漸層 `linear-gradient(45deg, #FF6B6B, #4ECDC4)`，`font-weight:bold`，hover 效果）與 `.remove-btn`（`background:#ff4444`，`font-size:12px`，`padding:4px 8px`，hover 效果）。

**修改**：`js/f5_quantity_comparison.js`（`QuantityComparisonTemplates.settingsScreen` `<style>` 新增 upload/remove CSS）

**搜尋關鍵字**：`linear-gradient(45deg, #FF6B6B, #4ECDC4)` in `js/f5_quantity_comparison.js`

---

*報告更新時間：2026-03-10*
*報告產生者：Claude Code (claude-sonnet-4-6)*
