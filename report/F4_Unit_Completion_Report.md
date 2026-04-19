# F4 數字排序 — 單元完成經驗報告書

> **建立日期**：2026-02-08（原始）
> **更新日期**：2026-03-27（排序數量新增⭐預設選項）、2026-03-24（簡單模式放置不重播語音）、2026-03-20（正確放置改播數字語音）
> **專案名稱**：Money Tutor 金錢教學系統
> **單元編號**：F4 — 數字排序（Number Sorting）
> **報告類型**：單元完成經驗與開發建議

---

## 一、檔案規模總覽

| 檔案 | 路徑 | 行數 | 大小 |
|------|------|------|------|
| JS 核心邏輯 | `js/f4_number_sorting.js` | 4,013 行 | ~185 KB |
| HTML 頁面 | `html/f4_number_sorting.html` | 260 行（含 TouchDragUtility fallback） | ~10 KB |
| CSS 專用樣式 | `css/f4-number-sorting.css` | 1,714 行 | ~45 KB |
| 作業單產生器 | `worksheet/units/f4-worksheet.js` | 153 行 | ~5 KB |
| **合計** | — | **~6,140 行** | ~245 KB |

### CSS 依賴

| 檔案 | 說明 |
|------|------|
| `css/ai-theme.css` | 共用主題樣式 |
| `css/unit6.css` | 共用單元樣式 |
| `css/common-modal-responsive.css` | 共用彈窗響應式樣式 |
| `css/f4-number-sorting.css` | **F4 專用樣式（1,714 行）** |

### JS 依賴

| 依賴 | 來源 | 用途 |
|------|------|------|
| `confetti.browser.min.js` | 本地（v1.9.2） | 煙火慶祝動畫 |
| `audio-unlocker.js` | 本地 | 行動裝置音訊解鎖 |
| `theme-system.js` | 本地 | 深色/淺色主題切換 |
| `touch-drag-utility.js` | 本地 | 觸控拖曳跨平台支援 |
| `reward-launcher.js` | 本地 | 獎勵系統啟動器 |
| `number-speech-utils.js` | 本地 | 數字語音轉換 |
| `mobile-debug-panel.js` | 本地 | 行動裝置除錯面板 |

### F 系列規模比較

| 項目 | F1 一對一對應 | F2 唱數 | F3 數字認讀 | F4 數字排序 | F5 量比較 | F6 數的組成 |
|------|-------------|---------|------------|------------|----------|------------|
| JS 行數 | **7,468** | — | 4,750 | **4,013** | — | — |
| CSS 行數 | 內嵌 | — | 內嵌 | **1,714** | — | — |
| 作業單行數 | 135 | — | 116 | **153** | — | — |
| 難度模式 | 3 種 | — | 3 種 | **3 種** | — | — |
| 互動方式 | 拖曳+點擊 | — | 拖曳 | **拖曳+點擊輸入** | — | — |

---

## 二、單元特色

### 2.1 配置驅動架構（NumberSortingConfig）

F4 最核心的設計理念是「所有邏輯由配置驅動」。全域 `NumberSortingConfig` 物件集中管理所有遊戲參數，三種難度（簡單、普通、困難）的行為差異完全由配置定義，避免在邏輯中散布硬編碼判斷。

```
NumberSortingConfig 結構：
├── game                  // 遊戲基本信息（標題、版本）
├── difficulties          // 三難度配置（easy、normal、hard）
│   ├── colors            //   顏色方案
│   ├── timing            //   延遲設定
│   ├── scoring           //   計分規則
│   └── speechTemplates   //   語音模板
├── numberRanges          // 數字範圍（1-10、1-20、1-50、1-100、custom）
├── sortingCounts         // 排序數量（3、5、10、15、20、custom）
├── timeLimits            // 時間限制（none、300秒、120秒、60秒）
├── testModes             // 測驗模式（反複練習、單次作答）
└── soundSettings         // 音效配置（開啟/關閉）
```

**輔助方法**：
- `getDifficultyConfig(id)`
- `getNumberRangeConfig(id)`
- `getSortingCountConfig(id)`
- `getGameConfig()`

### 2.2 三種難度模式

| 特性 | 簡單 | 普通 | 困難 |
|------|------|------|------|
| 難度 ID | `easy` | `normal` | `hard` |
| 互動方式 | 拖放到固定插槽 | 拖放到自由區域 | 點擊輸入（數字鍵盤） |
| 答案提示 | 有（自動鎖定） | 無 | 無 |
| 確認機制 | 自動（填滿即完成） | 手動按鈕 | 手動按鈕 |
| 測驗模式 | 無選擇 | 反複/單次 | 反複/單次 |
| 得分 | 每題 +10 分 | 每題 +15 分 | 每題 +20 分 |
| 延遲設定 | feedbackDelay: 100ms | feedbackDelay: 500ms | feedbackDelay: 1000ms |
| 遊戲介面 | `gameScreen` 模板 | `gameScreen` 模板 | `hardModeGameScreen` 模板 |

### 2.3 順序分組出題邏輯（Sequential Grouping）

題目生成支援兩種模式：
- **連續數列**（consecutive）：生成範圍內的連續序列（如 5、6、7、8、9）
- **非連續數列**（non-consecutive）：從範圍內隨機選取指定數量的數字（如 3、7、9、15）

搭配排序方向選項：小到大、大到小、混合（隨機決定每題方向）。

### 2.4 數字鍵盤彈窗（困難模式）

困難模式使用點擊輸入而非拖放，玩家需透過 3×4 九宮格數字面板逐個輸入數字。此設計增加了認知負擔，要求玩家記住並正確輸入排序結果。

### 2.5 語音播放動畫彈窗

困難模式在每題開始時播放完整指令語音（如「請將 5 至 9 的數字由小到大排序」），搭配聲波動畫與數字依序高亮，提供視覺化的語音回饋體驗。

### 2.6 自訂範圍與排序數量

使用者可自訂：
- **數字範圍**：起始數字 1-999、結束數字 1-999
- **排序數量**：每題排序 3-20 個數字

透過數字面板輸入自訂數值，並進行合法性驗證。

### 2.7 雙介面模板

根據難度選擇不同的遊戲介面模板：
- **簡單/普通模式**：`gameScreen`（拖放介面，包含來源區與放置區）
- **困難模式**：`hardModeGameScreen`（點擊輸入介面，包含數字按鈕與進度條）

### 2.8 Debug 系統

F4 擁有完整的 `Debug` 物件，統一管理所有日誌輸出：

| 方法 | 用途 | 狀態 |
|------|------|------|
| `logGameFlow()` | 遊戲流程追蹤 | ✅ 啟用 |
| `logSpeech()` | 語音播放 | ✅ 啟用 |
| `logUserAction()` | 用戶行為追蹤 | ✅ 啟用 |
| `logDragDrop()` | 拖曳系統 | ✅ 啟用 |
| `logAudio()` | 音效播放 | ✅ 啟用 |
| `logConfig()` | 配置讀取 | ✅ 啟用 |
| `logMobileDrag()` | 手機端拖曳除錯 | ✅ 啟用 |
| `logTouchEvent()` | 觸控事件詳細除錯 | ✅ 啟用 |
| `logPlacementDrop()` | 放置框檢測 | ✅ 啟用 |

### 2.9 統一完成畫面（C/F 系列標準）

F4 已採用 C/F 系列統一的測驗結束畫面樣式：
- 紫色漸層背景 (`linear-gradient(135deg, #667eea 0%, #764ba2 100%)`)
- 卡片出現動畫 (`fadeIn`, `celebrate`)
- 獎盃上下彈跳動畫 (`bounce`)
- 橙色表現徽章 + 發光動畫 (`glow`)
- 粉紅色獎勵系統按鈕
- 三個統計卡片（答對題數、正確率、完成時間）
- 綠色「再玩一次」按鈕、紫色「返回設定」按鈕
- `confetti` 煙火動畫（v1.9.2 本地化）

### 2.10 作業單系統

| 項目 | 說明 |
|------|------|
| 行數 | 153 行 |
| 題型 | 數字排序（填入正確順序） |
| 數字範圍 | 支援自訂 `min-max_count` 格式 |
| 排列方式 | 非連續 / 連續 |
| 提示模式 | 無提示 / 第1個 / 第1、3、5個 / 全部 |
| 答案卷 | 答案直接顯示在 sort-box 中（紅色粗體） |

**工具列配置**：
```javascript
toolbarConfig: {
    adjustCountButton: { label: '🔢 數字範圍', type: 'dropdown', ... },
    fontButton: null,
    orientationButton: { label: '📊 排列方式', type: 'cycle', options: ['非連續', '連續'] },
    extraButtons: [{ label: '💡 提示', type: 'dropdown', ... }]
}
```

---

## 三、語音系統

### 3.1 Web Speech API（TTS）

使用瀏覽器內建語音合成，優先選用繁體中文（台灣）語音：

**語音選擇優先順序**：
1. Microsoft HsiaoChen Online（台灣）
2. Google 國語（台灣）
3. 任何 `zh_TW` 語音
4. 任何繁體中文語音
5. 任何 `zh` 語音

### 3.2 語音模板

各難度有獨立的語音模板集（`speechTemplates`）：

**簡單模式**：
| 模板鍵 | 文字 |
|--------|------|
| `levelComplete` | 「恭喜你答對了，進入下一題」 |
| `levelCompleteLast` | 「恭喜你答對了，測驗結束」 |
| `complete` | 「恭喜完成所有題目！」 |

**普通模式**：
| 模板鍵 | 文字 |
|--------|------|
| `correct` | 「恭喜你答對了，進入下一題」 |
| `correctLast` | 「恭喜你答對了，測驗結束」 |
| `incorrect` | 「對不起，有錯誤喔，請再試一次。」 |
| `incorrectSingle` | 「對不起你答錯了，進入下一題」 |
| `incorrectSingleLast` | 「對不起你答錯了，測驗結束」 |
| `complete` | 「恭喜完成所有題目！」 |

**困難模式**（普通模式的全部模板 + 額外的 `instruction` 動態指令）：
| 模板鍵 | 文字 |
|--------|------|
| `instruction` | 動態生成：「請將 X 至 Y 的數字，由小到大排序」 |

### 3.3 NumberSpeechUtils 整合

F4 使用 `NumberSpeechUtils.convertToPureNumberSpeech()` 進行數字語音轉換（F 系列專用）。所有數字中的「2」一律唸為「貳」：

| 數字 | 語音 |
|------|------|
| 2 | 貳 |
| 12 | 拾貳 |
| 20 | 貳拾 |
| 22 | 貳拾貳 |

### 3.4 音效系統

| 音效 | 檔案 | 觸發時機 |
|------|------|---------|
| 選取音 | `select.mp3` | 選取數字 |
| 正確音 | `correct.mp3` | 正確放置單個數字 |
| 完成音 | `correct02.mp3` | 完成一題 |
| 錯誤音 | `error.mp3` | 答錯 |
| 成功音 | `success.mp3` | 完成所有題目 |
| 點擊音 | `click.mp3` | 一般點擊/選單互動 |

---

## 四、觸控與桌面支援

### 4.1 雙軌拖放系統

F4 的拖放同時支援兩種機制：

1. **桌面端**：HTML5 Drag and Drop API（dragstart、dragend、dragover、drop 等原生事件）
2. **行動端**：`TouchDragUtility`（touchstart、touchmove、touchend 轉換為拖放操作）

### 4.2 HTML 內嵌 TouchDragUtility fallback

`html/f4_number_sorting.html`（260 行）中包含內嵌的 TouchDragUtility fallback 版本。若外部 `js/touch-drag-utility.js` 未能載入，使用內嵌版本確保行動端拖放功能可用。這是離線安全的重要保障。

### 4.3 拖放區域的模式差異

| 模式 | 拖放目標 | 替換行為 |
|------|---------|---------|
| 簡單 | `.placement-slot`（固定插槽） | 正確放置後自動鎖定，不可替換 |
| 普通 | `.placement-area.normal-placement`（自由區域） | 可替換已放置的數字 |
| 困難 | 無拖放（點擊輸入） | — |

### 4.4 audio-unlocker

使用 `audio-unlocker.js` 解決行動瀏覽器音訊自動播放限制，在設定頁面的首次使用者互動時觸發解鎖。

### 4.5 防止下拉重新整理

HTML 設定 `overscroll-behavior-y: contain`，防止行動裝置在拖曳操作時意外觸發頁面下拉重新整理。

### 4.6 F4 vs F1 vs F3 觸控支援比較

| 項目 | F4 數字排序 | F1 一對一對應 | F3 數字認讀 |
|------|------------|-------------|------------|
| 音效解鎖 | `audio-unlocker.js` | `audio-unlocker.js` | `audio-unlocker.js` |
| 除錯面板 | `mobile-debug-panel.js` | `mobile-debug-panel.js` | `mobile-debug-panel.js` |
| 主題系統 | `theme-system.js` | `theme-system.js` | `theme-system.js` |
| 拖曳工具 | `touch-drag-utility.js` | `touch-drag-utility.js` | `touch-drag-utility.js` |
| 互動方式 | **拖曳+點擊輸入** | 拖曳+點擊 | 僅拖曳 |
| TimerManager | ✅ **有** | ✅ 有 | ✅ 有 |
| EventManager | ✅ **有** | ✅ 有 | ✅ 有 |
| 全局動畫注入 | ✅ **有** | ✅ 有 | ✅ 有 |

---

## 五、版面配置

### 5.1 遊戲版面結構

```
┌─────────────────────────────────────────┐
│ 標題列                                   │
│ [進度: 第 1/10 題]     [🎁 獎勵] [返回設定] │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────┐  ┌─────────────────┐   │
│  │ 來源區(打亂)   │  │ 放置區(排序)      │   │
│  │ Source Area  │  │ Placement Area  │   │
│  └─────────────┘  └─────────────────┘   │
│                                         │
│  [確認] [提示] (普通/困難模式)              │
│                                         │
└─────────────────────────────────────────┘
```

### 5.2 三種模式版面差異

| 模式 | 版面特點 | CSS 類別 |
|------|---------|---------|
| 簡單 | 固定插槽，正確後自動鎖定 | `.placement-slot` |
| 普通 | 自由區域，可替換 | `.placement-area.normal-placement` |
| 困難 | 數字鍵盤 + 進度條 | `.hard-mode-container` |

### 5.3 獨立 CSS 檔案

與 F3 不同（F3 樣式內嵌於 JS），F4 擁有獨立的 CSS 檔案 `css/f4-number-sorting.css`（1,714 行），包含：

- 三難度顏色方案（綠 `#28a745` / 藍 `#007bff` / 紅 `#dc3545`）
- 插槽樣式（簡單模式固定大小正方形盒子）
- 放置區樣式（普通/困難模式自由區域）
- 拖曳反饋效果（被拖曳數字透明化 opacity: 0.3）
- 鎖定動畫（簡單模式正確放置後視覺變化）
- 數字鍵盤面板樣式（困難模式）
- 語音播放動畫（聲波視覺化）
- 響應式設計（768px、480px 斷點）

---

## 六、動畫系統

### 6.1 @keyframes 動畫總覽

| 來源 | 數量 | 說明 |
|------|------|------|
| JS 內嵌 | 4 處定義 | 完成畫面動畫 |
| CSS 檔案 | 15 處定義 | 遊戲互動動畫 |
| **總計** | **19 處** | — |

### 6.2 JS 內嵌動畫列表

| # | 動畫名稱 | 行號 | 用途 |
|---|----------|------|------|
| 1 | `fadeIn` | 734 | 淡入 |
| 2 | `celebrate` | 739 | 慶祝 |
| 3 | `bounce` | 745 | 上下彈跳 |
| 4 | `glow` | 751 | 發光 |

### 6.3 CSS 檔案動畫列表

| # | 動畫名稱 | 行號 | 用途 | 重複定義 |
|---|----------|------|------|---------|
| 1 | `shake` | 186 | 抖動（錯誤回饋） | **2 處** |
| 2 | `hintGlow` | 1136 | 提示發光 | 1 處 |
| 3 | `speakerPulse` | 1147 | 語音喇叭脈衝 | 1 處 |
| 4 | `lightBulbBlink` | 1158 | 燈泡閃爍 | 1 處 |
| 5 | `modalBounceIn` | 1169 | 彈窗進場 | 1 處 |
| 6 | `bounceGlow` | 1187 | 彈跳發光 | 1 處 |
| 7 | `soundWave` | 1198 | 聲波動畫 | 1 處 |
| 8 | `textPulse` | 1207 | 文字脈衝 | 1 處 |
| 9 | `rainbowShift` | 1216 | 彩虹漸變 | 1 處 |
| 10 | `progressGradient` | 1228 | 進度條漸層 | 1 處 |
| 11 | `modalFadeOut` | 1240 | 彈窗淡出 | 1 處 |
| 12 | `explode` | 1271 | 爆炸 | 1 處 |
| 13 | `slideUp` | 1584 | 上滑 | 1 處 |
| 14 | `bounce` | 1595 | 彈跳 | **與 JS 重複** |
| 15 | `shake` | 1701 | 抖動（自動返回） | **2 處** |

**重複定義統計**：
- `shake`：CSS 第 186 行、第 1701 行（**2 處重複**）
- `bounce`：JS 第 745 行、CSS 第 1595 行（**JS/CSS 跨檔案重複**）

### 6.4 Canvas-Confetti 煙火效果

| 項目 | 說明 |
|------|------|
| 版本 | **v1.9.2**（本地化，與其他單元一致） |
| 檔案 | `js/confetti.browser.min.js` |
| 觸發時機 | 完成一題時（`startFireworksAnimation()`） |
| 雙重觸發 | particleCount: 100 + 50，spread: 70 + 120 |

---

## 七、Bug 檢測與已知問題

### 7.1 已確認的程式碼問題

| # | 嚴重度 | 問題描述 | 數據 | 狀態 |
|---|--------|---------|------|------|
| 1 | **高** | `setTimeout` 未清理 | **23 個** setTimeout → 已引入 TimerManager | ✅ **已修復** |
| 2 | **高** | `addEventListener` 未移除 | **22 個** addEventListener → 已引入 EventManager | ✅ **已修復** |
| 3 | **中** | `@keyframes` 重複定義 | CSS `shake` 重命名、`bounce` 移至 JS 全局注入 | ✅ **已修復** |
| 4 | **中** | `!important` 過多 | JS 21 個 + CSS 69 個 = **90 個** | ⚠️ 待改善 |
| 5 | ~~**中**~~ | ~~`console.log` 數量~~ | ~~36 個~~ **✅ 已修復 (2026-02-21)**：Debug Logger FLAGS 重構，162 個 Game.Debug 統一管理，僅餘 1 個 raw console.log |
| 6 | **建議** | 無 Loading 畫面 | 建議參考 A6 新增 | ⚠️ 待新增 |
| 7 | **建議** | 無 Error Boundary | 建議參考 A6 新增 | ⚠️ 待新增 |
| 8 | **低** | 設定頁輸入驗證使用 `alert()` 阻塞式對話框（8 處，搜尋 `alert(`） | ⚠️ 暫緩（低優先） |

### 7.2 F4 vs F1 vs F3 Bug 數量比較

| 問題類型 | F4 數字排序 | F1 一對一對應 | F3 數字認讀 | 評價 |
|---------|------------|-------------|------------|------|
| 未清理 setTimeout | 0（TimerManager） | 0（TimerManager） | 0（TimerManager） | ✅ 已一致 |
| 未移除 addEventListener | 0（EventManager） | 0（EventManager） | 0（EventManager） | ✅ 已一致 |
| @keyframes 重複 | 0（全局注入） | 0（全局注入） | 0（全局注入） | ✅ 已一致 |
| console.log | **36** | 6 | 90+ | ✅ F4 適中 |
| !important 總數 | **90** | 196 | 84 | ✅ F4 適中 |
| JS 行數 | **4,013** | 7,468 | 4,750 | ✅ F4 最精簡 |

### 7.3 正面發現

| 項目 | 說明 |
|------|------|
| Debug 系統 | 完整的 `Debug` 物件統一管理日誌，分類明確 |
| confetti 版本 | 使用 v1.9.2（本地化），版本一致 |
| 完成畫面 | 已採用 C/F 系列統一樣式 |
| startTime 記錄 | 已正確記錄遊戲開始時間 |
| 配置驅動架構 | NumberSortingConfig 設計良好 |
| timerInterval 清理 | 有 3 處 `clearInterval(this.state.timerInterval)` |
| TouchDragUtility fallback | HTML 內嵌備份版本，離線安全 |

### 7.4 記憶體洩漏風險分析

**問題根源**（已修復）：
- ✅ F4 已有 `TimerManager`，setTimeout 統一清理（2026-02-12 修復）
- ✅ F4 已有 `EventManager`，addEventListener 統一管理（2026-02-12 修復）
- ✅ F4 有 `timerInterval` 清理（計時器專用）

**風險已消除**：
1. ~~使用者在遊戲進行中返回設定頁面，setTimeout 回調仍會執行~~ → 已修復
2. ~~重複進入/離開遊戲畫面，事件監聽器會累加~~ → 已修復
3. ~~長時間使用後可能導致效能下降~~ → 已修復

### 7.5 非 Bug 但需注意的設計

| 項目 | 說明 |
|------|------|
| 獨立 CSS 檔案 | 與 F1/F3 的內嵌方式不同，維護時需同步修改 |
| TouchDragUtility fallback | 內嵌於 HTML 中增加了檔案體積 |
| 困難模式無拖曳 | 使用點擊輸入，與其他模式差異大 |

### 7.6 狀態管理現況

| 項目 | 狀態 |
|------|------|
| 統一重置函數 | ✅ `resetGameState()` |
| 布林旗標 | `isChecking`（1 個） |
| 重置位置 | 統一（2 處） |
| 評價 | ✅ **最佳實踐** |

**重構完成**（2026-02-17）：已實現統一的 `resetGameState()` 函數，與 C/F 系列其他單元保持一致

**重置項目**：
- 核心狀態：`currentLevel`, `totalLevels`, `score`, `timeRemaining`, `isChecking`, `startTime`
- 計時器：`timerInterval`（含 clearInterval）
- 遊戲數據：`currentNumbers`, `correctOrder`, `draggedElement`

**調用位置**：
| 位置 | 調用條件 | 說明 |
|------|---------|------|
| `showSettings()` | 無條件 | 返回設定時重置狀態 |
| `initGameState()` | 無條件 | 開始遊戲前重置狀態 |

**搜尋關鍵字**：`resetGameState`

---

## 八、未來開發建議

### 8.1 引入 TimerManager（優先）

**問題**：23 個 setTimeout 無對應清理機制。

**建議**：參考 F1/F3 引入 `TimerManager`

```javascript
Game.TimerManager = {
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
};
```

**整合位置**：
- `init()` → `TimerManager.clearAll()`
- `showSettings()` → `TimerManager.clearAll()`
- `completeGame()` → `TimerManager.clearByCategory('turnTransition')`

### 8.2 引入 EventManager

**問題**：22 個 addEventListener 可能未完全移除。

**建議**：參考 F1/F3 引入 `EventManager`

```javascript
Game.EventManager = {
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
};
```

### 8.3 CSS 動畫統一管理

**問題**：`shake` 在 CSS 中定義了 2 次，`bounce` 在 JS 和 CSS 中各定義 1 次。

**建議**：
1. 刪除 CSS 第 1701 行的重複 `shake` 定義
2. 參考 F1/F3 新增 `injectGlobalAnimationStyles()` 方法
3. 將 JS 中的 4 個 @keyframes 移至全局動畫注入函數

### 8.4 清理 console.log

**問題**：36 個 console.log，雖然大部分通過 Debug 系統管理，但仍有少數獨立的。

**建議**：
1. 保留 Debug 系統內的 console.log（透過 `Debug.enabled` 控制）
2. 移除獨立的 console.log 除錯語句
3. 生產環境設定 `Debug.enabled = false`

### 8.5 其他建議

- **困難模式數字鍵盤元件化**：提取為共用元件供其他單元使用
- **CSS 組織方式統一**：考慮是否要將 CSS 內嵌於 JS（與 F1/F3 一致）或維持獨立檔案
- **新增無障礙功能**：Loading 畫面、Error Boundary、Skip Link

---

## 九、總結

### F4 數字排序的優勢

1. **配置驅動架構**：NumberSortingConfig 設計良好，與 F1/F3 一致
2. **Debug 系統**：統一管理日誌輸出，分類明確
3. **完成畫面統一**：已採用 C/F 系列標準樣式
4. **confetti 版本一致**：使用 v1.9.2 本地化版本
5. **獨立 CSS 檔案**：1,714 行專用樣式，結構清晰
6. **程式碼精簡**：4,013 行，是 F 系列中最精簡的
7. **timerInterval 清理**：有計時器清理機制
8. **TouchDragUtility fallback**：離線安全保障

### F4 數字排序的待改進處

1. ~~**23 個未清理 setTimeout**~~ → ✅ 已引入 TimerManager（2026-02-12 修復）
2. ~~**22 個 addEventListener 可能殘留**~~ → ✅ 已引入 EventManager（2026-02-12 修復）
3. ~~**@keyframes 重複定義**~~ → ✅ 已整合為全局注入（2026-02-12 修復）
4. **無 Loading / Error Boundary** → ⚠️ 建議參考 A6 新增

### 核心數據

| 指標 | 數值 |
|------|------|
| 主程式行數 | **~4,100 行**（修復後） |
| CSS 行數 | **~1,710 行**（修復後） |
| setTimeout 數量 | 23 個 → ✅ 全部由 TimerManager 管理 |
| addEventListener 數量 | 22 個 → ✅ 11 個由 EventManager 管理 |
| @keyframes 重複 | 3 處 → ✅ 0 處（已整合） |
| console.log | **36 個** |
| !important | **90 個**（JS 21 + CSS 69） |

| 指標 | 數值 |
|------|------|
| 難度模式 | 3 種 |
| 語音模板 | 6-7 個/難度 |
| 音效 | 6 個 |
| 外部依賴 | 7 個 JS（含本地 confetti） |
| 作業單題型 | 數字排序 |
| 互動方式 | 拖曳（簡單/普通）+ 點擊輸入（困難） |

### 與 F1/F3 差距分析

| 項目 | F1 一對一對應 | F3 數字認讀 | F4 數字排序 | 差距 |
|------|-------------|------------|------------|------|
| TimerManager | ✅ 有 | ✅ 有 | ✅ 有 | ✅ 已一致 |
| EventManager | ✅ 有 | ✅ 有 | ✅ 有 | ✅ 已一致 |
| 全局動畫注入 | ✅ 有 | ✅ 有 | ✅ 有 | ✅ 已一致 |
| console.log | 6 個 | 90+ 個 | 36 個 | ✅ 適中 |
| 獨立 CSS | ❌ 無 | ❌ 無 | ✅ 有 | 設計選擇 |

---

## 十、修復建議優先順序

| 優先級 | 項目 | 預估工作量 | 效益 | 狀態 |
|--------|------|-----------|------|------|
| **P0** | 引入 TimerManager | 中（約 50 行程式碼 + 23 處替換） | 防止記憶體洩漏 | ✅ **已完成** |
| **P0** | 引入 EventManager | 中（約 30 行程式碼 + 11 處替換） | 防止事件疊加 | ✅ **已完成** |
| **P1** | 全局動畫注入 | 小（約 20 行程式碼） | 消除重複定義 | ✅ **已完成** |
| **P1** | 清理 CSS @keyframes 重複 | 小（重命名 + 刪除重複） | 減少 CSS 體積 | ✅ **已完成** |
| **P2** | 清理獨立 console.log | 小 | 減少生產環境噪音 | ⚠️ 待處理 |
| **P2** | 新增無障礙功能 | 大（參考 A6） | 提升使用者體驗 | ⚠️ 待處理 |

---

## 十一、修復記錄

### 2026-02-12：P0/P1 Bug 修復

**修改檔案**：
- `js/f4_number_sorting.js`
- `css/f4-number-sorting.css`

**修復內容**：

#### 1. 引入 TimerManager（約第 1234 行）
```javascript
TimerManager: {
    timers: new Map(),
    timerIdCounter: 0,
    setTimeout(callback, delay, category = 'default') { ... },
    clearTimeout(id) { ... },
    clearAll() { ... },
    clearByCategory(category) { ... }
},
```

#### 2. 引入 EventManager（約第 1270 行）
```javascript
EventManager: {
    listeners: [],
    on(element, type, handler, options = {}, category = 'default') { ... },
    removeAll() { ... },
    removeByCategory(category) { ... }
},
```

#### 3. 引入 injectGlobalAnimationStyles()（約第 1310 行）
- 注入 `fadeIn`、`celebrate`、`bounce`、`glow` 四個 @keyframes
- 使用 `#f4-global-animations` ID 防止重複注入

#### 4. 修改 init()
- 新增 `this.TimerManager.clearAll()`
- 新增 `this.EventManager.removeAll()`
- 新增 `this.injectGlobalAnimationStyles()`

#### 5. 修改 showSettings()
- 新增 `this.TimerManager.clearAll()`
- 新增 `this.EventManager.removeByCategory('gameUI')`

#### 6. setTimeout 轉換（23 處）
- 全部改用 `this.TimerManager.setTimeout(callback, delay, category)`
- 分類：`turnTransition`（回合轉換）、`animation`（動畫）、`dragSystem`（拖曳）、`speech`（語音）

#### 7. addEventListener 轉換（11 處）
- 拖放事件（6處）→ `EventManager.on(..., 'dragSystem')`
- 觸控測試事件（1處）→ `EventManager.on(..., 'dragSystem')`
- 確認按鈕（1處）→ `EventManager.on(..., 'gameUI')`
- 關閉按鈕（1處）→ `EventManager.on(..., 'gameUI')`
- 獎勵連結（1處）→ `EventManager.on(..., 'gameUI')`
- DOMContentLoaded 和 voiceschanged 保持原樣（系統層級事件）

#### 8. CSS @keyframes 修復
- 移除 JS 第 734-754 行重複的 @keyframes（改用 injectGlobalAnimationStyles）
- CSS 第 1701 行 `shake` 重命名為 `shakeReturn`（避免與第 186 行衝突）
- CSS 第 1595-1605 行 `bounce` 移除（使用 JS 注入版本）

---

### 2026-02-16：系統性驗證

**驗證內容**：

| 項目 | 狀態 | 說明 |
|------|------|------|
| TimerManager | ✅ 正常 | 第 1219 行起，統一管理計時器 |
| EventManager | ✅ 正常 | 第 1259 行起，統一管理事件監聽器 |
| injectGlobalAnimationStyles | ✅ 正常 | 第 1290 行起，全局動畫注入 |
| completeGame() | ✅ 正常 | 含 confetti 煙火、統一完成畫面樣式 |
| startTime 記錄 | ✅ 正常 | 遊戲開始時記錄，完成畫面顯示用時 |

**使用統計**：
- TimerManager.setTimeout：20+ 處調用
- EventManager.on：20+ 處調用

**結論**：F4 單元已達到 F 系列標準，無需進一步修改。

---

### 2026-02-17：狀態管理重構（resetGameState）

**問題**：
- 雖然 F4 狀態管理原本已足夠簡潔，但為與 C/F 系列其他單元保持一致性
- 統一使用 `resetGameState()` 函數可提升程式碼可讀性和維護性

**修改內容**：

1. **新增 `resetGameState()` 函數**
   - 位置：`injectGlobalAnimationStyles()` 之後
   - 集中管理所有遊戲相關狀態的重置
   - 重置項目：
     - 核心狀態：`currentLevel`, `totalLevels`, `score`, `timeRemaining`, `isChecking`, `startTime`
     - 計時器：`timerInterval`（含 clearInterval）
     - 遊戲數據：`currentNumbers`, `correctOrder`, `draggedElement`
   - 輸出日誌：`🔄 [F4] 遊戲狀態已重置`

2. **調用位置**
   | 位置 | 調用條件 | 說明 |
   |------|---------|------|
   | `showSettings()` | 無條件 | 返回設定時重置狀態 |
   | `initGameState()` | 無條件 | 開始遊戲前重置狀態 |

**修改檔案**：
- `js/f4_number_sorting.js`

**驗證方式**：
1. 開啟 F4 數字排序
2. 完成部分關卡後點擊「返回設定」
3. Console 應顯示「🔄 [F4] 遊戲狀態已重置」
4. 重新開始遊戲，確認關卡從第 1 關開始、分數為 0、狀態清空

---

### 2026-02-21：Debug Logger 重構為 FLAGS 分類開關系統

**修改檔案**：`js/f4_number_sorting.js`

**修改內容**：
將舊版 `Debug` 系統（單一 `enabled` 開關 + 各種 `logXXX` 方法）重構為 FLAGS 分類開關系統。

**統計**：
- **轉換前**：39 個 console 調用
- **轉換後**：53 個 Game.Debug 調用
- **保留未轉換**：3 個（Debug 系統內部實現）

**FLAGS 分類（12 個）**：

```javascript
Debug: {
    FLAGS: {
        all: false,        // 全域開關
        init: false,       // 初始化相關
        speech: false,     // 語音系統
        audio: false,      // 音效系統
        ui: false,         // UI 渲染
        drag: false,       // 拖曳操作
        touch: false,      // 觸控事件
        question: false,   // 題目生成
        state: false,      // 狀態變更
        game: false,       // 遊戲流程
        user: false,       // 使用者行為
        error: true        // 錯誤訊息（預設開啟）
    }
}
```

**搜尋關鍵字**：`Game.Debug.FLAGS`, `Game.Debug.log`

---

---

### 2026-02-23：動畫整合確認 + 嵌套物件修復（this.Debug → Game.Debug）

**修改檔案**：`js/f4_number_sorting.js`

#### 動畫整合確認

`injectGlobalAnimationStyles()` 已於 2026-02-12 實現，本次確認當前狀態：

| 項目 | 狀態 |
|------|------|
| `injectGlobalAnimationStyles()` | ✅ 已實現（`id="f4-global-animations"`，4 個 @keyframes） |
| `injectGlobalAnimationStyles()` 調用點 | ✅ `init()` 有呼叫 |
| 散落的 @keyframes | ✅ 已替換為注解（1 處：line ~734） |

**全局函數包含的動畫**（4 個）：
`fadeIn`、`celebrate`、`bounce`、`glow`

#### 嵌套物件修復

**問題描述**：
2026-02-21 Debug Logger 重構保留了 wrapper 方法（`logGameFlow`、`logUserAction`、`logConfig`、`logDragDrop`、`logAudio` 等），但呼叫這些 wrapper 方法時使用 `this.Debug.logXXX(...)` 語法。當這些方法被當作 DOM 事件回呼或非同步回呼使用時，`this` 可能不指向 `Game`，導致 `this.Debug` 為 `undefined`。

**修改內容**：
使用 `replace_all` 將全部 109 個 `this.Debug.` 替換為 `Game.Debug.`

**影響函數統計**（部分）：

| 函數群組 | 涵蓋範圍 |
|---------|---------|
| `init()` / `showSettings()` | 初始化與設定畫面 |
| `handleSettingChange()` / `handleCustomRange()` / `handleCustomSortCount()` | 設定互動 |
| `startGame()` / `initGameState()` / `startLevel()` / `completeGame()` | 遊戲流程 |
| `showNumberInput()` / `handleKeyInput()` / `submitHardAnswer()` / `resetHardModeUI()` | 困難模式輸入 |
| `renderLevel()` / `renderHardLevel()` / `generateInstructionText()` | 關卡渲染 |
| `generateOrderedNumbers()` / `generateCustomConsecutive()` / `generateNonConsecutive()` 等 | 題目生成 |
| 觸控拖曳 handler、`handleDragStart()` / `handleDrop()` | 拖曳系統 |
| `checkAnswer()` / `showConfirmButton()` | 答案驗證 |
| `playSound()` / `playSelectSound()` / `playClickSound()` | 音效播放 |
| `resetGame()` / `simpleComplete()` | 重置與完成 |

**統計更新**：
- 修復前：53 × `Game.Debug.*`（直接呼叫）+ 109 × `this.Debug.*`（wrapper 方法）= 162 個 Debug 調用
- 修復後：162 × `Game.Debug.*` + 0 × `this.Debug.*`

**驗證結果**：
- ✅ `grep "this\.Debug\."` → 0 個結果
- ✅ 全部 4 個 @keyframes 仍在 `injectGlobalAnimationStyles()` 內（lines ~1325-1338）
- ✅ 散落處（1 個）為注解，無實際 @keyframes

**搜尋關鍵字**：`Game.Debug.log`, `injectGlobalAnimationStyles`, `f4-global-animations`

---

### 2026-02-24（第二輪）：稽核結果

**第二輪全面稽核結論（無新增 Bug）**：

- ✅ EventManager：全部事件監聽器正確使用 `Game.EventManager.on()`
  - 例外：`this.synth.addEventListener('voiceschanged', loadVoices)` 為 Web Speech API 一次性語音載入事件，屬於瀏覽器 API 標準用法，非 DOM UI 事件，不需要 EventManager 管理，無記憶體洩漏風險
- ✅ `resetGameState()` 完整重置所有必要屬性（含 startTime、totalLevels、score 等）
- ✅ `startTime` 在 `startGame()` 時正確設定
- ✅ 完成畫面符合 C/F 系列標準
- ✅ 作業單連結不傳 count 參數
- ✅ `injectGlobalAnimationStyles()` 使用正確 ID

**無需修復任何項目。**

---

### 2026-02-24：作業單連結統一簡化（僅傳 unit 參數）

**修改內容**：

- 作業單連結原本傳遞遊戲設定參數（`difficulty`, `numberRange`, `sortingCount`）
- 各作業單已有完整工具列，用戶開啟後可直接在工具列調整；遊戲設定與作業單設定應獨立運作
- **修復**：移除所有多餘參數，統一改為只傳 `unit` 參數，讓作業單完全使用自己的預設値

**修改檔案**：`js/f4_number_sorting.js`

---

### 2026-02-27：showResults() 守衛 + startTime null 修復

**問題 1 — showResults() 重複呼叫**：語音 callback 非同步完成時，`showResults()` 可能被多次觸發。

**修復**：
- `resetGameState()` 加入 `this.state.isEndingGame = false`
- `showResults()` 開頭加入守衛：`if (this.state.isEndingGame) return; this.state.isEndingGame = true;`

**問題 2 — startTime null 防護**：`showResults()` 計算 `elapsedMs = endTime - this.state.startTime` 未防護 null。

**修復**：
```javascript
const elapsedMs = this.state.startTime ? (endTime - this.state.startTime) : 0;
```

**修改檔案**：`js/f4_number_sorting.js`

---

### 2026-02-27：speak() safeCallback + 10 秒逾時保護

**問題**：`Speech.speak()` 的 `utterance.onend`、`utterance.onerror`、`catch` 三處均直接呼叫 `if (callback) callback()`，若多條件同時觸發（如 onend 與 onerror 同時Fire、或語音拋出例外後 synth 仍觸發 onend），callback 被重複執行。另外缺少 10 秒安全逾時保護。

**修復**：
- 在 try 之前宣告 `callbackExecuted` + `safeCallback`
- `utterance.onend`、`utterance.onerror`、`catch` 三處全改為 `safeCallback()`
- 加入 `Game.TimerManager.setTimeout(safeCallback, 10000, 'speech')` 防止語音卡住時阻塞流程

**修改檔案**：`js/f4_number_sorting.js`

---

*報告更新時間：2026-02-27*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

## 廢棄程式碼稽核（2026-03-01）

**稽核範圍**：`js/f4_number_sorting.js`（4,134 行）

### 結論：發現 2 項需補充記錄的項目（補充稽核 2026-03-02）

| 類型 | 位置 | 內容 | 嚴重性 | 建議 |
|------|------|------|--------|------|
| 向後相容 shim | Lines 1190–1193 | `logGameFlow()` 映射至新 Debug 系統 | 低 | 刻意保留的相容層，非廢棄 |
| 清理操作注解 | Line 2191 | `// 先移除舊的事件監聽器，避免重複綁定` | 低 | 操作性注解 |
| console.log | Lines 1173, 1179, 1185 | Debug 系統內部呼叫 | — | 已受 FLAGS 守衛，無需處理 |
| **原生 setTimeout（async sleep helper）** | Line ~3570 | `const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))` — 語音播放邏輯中的 async/await sleep 輔助函數 | 低（刻意保留） | 此為合法的 cooperative multitasking sleep 模式，語義上不適合轉為 TimerManager；可加注解說明 |
| **`alert()` 呼叫（設定驗證）** | Lines 1710, 1744, 1750, 1800, 1804, 1808, 1812, 2270 | 共 7–8 處，用於自訂範圍輸入驗證（最小值/最大值超出範圍提示）；為同步阻塞彈窗 | 低 | 功能正常；若需提升 UX 可改為非阻塞式提示（如現有的 popup 系統） |

**整體評估**：程式碼品質良好。`alert()` 僅用於設定驗證，不影響遊戲流程；async sleep 為刻意設計，非 TimerManager 遺漏。

---

## 跨輪計時器洩漏稽核（2026-03-03）

**稽核背景**：A3 單元曾發現 `speakText()` 10 秒備援計時器在下一輪觸發導致跳輪的 Bug，已對全系列交叉稽核。

**F4 稽核結論：安全（無此問題）**

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

---

## 排序數量新增「⭐ 預設 (10個)」選項（2026-03-27）

**需求**：設定頁「📋 排序數量」中，在「3個數字」左邊新增一個預設選項，其值為 10 個數字。

**實作**：在 `NumberSortingConfig.sortingCounts` 加入 `preset` 條目，並為所有條目補上 `order` 值：

| key | label | value | order |
|-----|-------|-------|-------|
| preset | ⭐ 預設 (10個) | 10 | 0 |
| 3 | 3個數字 | 3 | 1 |
| 5 | 5個數字 | 5 | 2 |
| 10 | 10個數字 | 10 | 3 |
| 15 | 15個數字 | 15 | 4 |
| 20 | 20個數字 | 20 | 5 |
| custom | 自訂 | — | 6 |

`getSettingOptions` 現有邏輯：`options.some(option => option.order > 0)` 為 true（3~custom 均有 order>0）→ 排序觸發 → `preset (order:0)` 排在最前。

選擇「⭐ 預設 (10個)」後：
- `settings.sortingCount = 'preset'`
- `getSortingCountConfig('preset').value = 10`
- 遊戲邏輯使用 `gameConfig.sortingCount.value = 10` → 每題排序 10 個數字
- 非 `'custom'`，不顯示自訂輸入框（既有邏輯自動處理）

**關鍵搜尋詞**：`sortingCounts.preset`、`getSortingCountConfig`、`order: 0`
