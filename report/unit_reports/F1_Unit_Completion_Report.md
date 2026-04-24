# F1 一對一對應單元 — 完成經驗報告書

> **建立日期**：2026-02-07（原始）
> **更新日期**：2026-03-14（assist-click-hint 加方框+點這裡提示；getItemName 擴展至全部40個圖示）
> **專案名稱**：Money Tutor 金錢教學系統
> **單元編號**：F1 — 一對一對應（Object Correspondence）
> **報告類型**：單元完成經驗與開發建議

---

## 一、檔案規模總覽

| 檔案 | 路徑 | 行數 | 大小 |
|------|------|------|------|
| JS 核心邏輯 | `js/f1_object_correspondence.js` | 7,468 行 | ~342 KB |
| HTML 頁面 | `html/f1_object_correspondence.html` | ~51 行（CSS 已外部化） | ~3 KB |
| CSS 專用樣式 | `css/f1-object-correspondence.css` | ~220 行 | ~7 KB |
| 作業單產生器 | `worksheet/units/f1-worksheet.js` | 135 行 | ~4 KB |
| **合計** | — | **~7,874 行** | ~356 KB |

### CSS 依賴

| 檔案 | 說明 |
|------|------|
| `css/ai-theme.css` | 共用主題樣式 |
| `css/unit6.css` | 共用單元樣式 |
| `css/f1-object-correspondence.css` | **F1 專用樣式（原 HTML 內嵌 CSS 外部化）** |
| `css/common-modal-responsive.css` | 共用彈窗響應式樣式 |

### JS 依賴

| 依賴 | 來源 | 用途 |
|------|------|------|
| `touch-drag-utility.js` | 本地 | 觸控拖曳跨平台支援 |
| `audio-unlocker.js` | 本地 | 行動裝置音訊解鎖 |
| `theme-system.js` | 本地 | 深色/淺色主題切換 |
| `emoji-library.js` | 本地 | Emoji 圖示庫 |
| `reward-launcher.js` | 本地 | 獎勵系統啟動器 |
| `number-speech-utils.js` | 本地 | 數字語音轉換 |
| `mobile-debug-panel.js` | 本地 | 行動裝置除錯面板 |
| `confetti.browser.min.js` | 本地（v1.9.2） | 煙火慶祝動畫 |

### F 系列規模比較

| 項目 | F1 一對一對應 | F2 唱數 | F3 數字認讀 | F4 數字排序 | F5 量比較 | F6 數的組成 |
|------|-------------|---------|------------|------------|----------|------------|
| JS 行數 | **7,468** | — | — | — | — | — |
| 作業單行數 | **135** | — | — | — | — | — |
| 難度模式 | **3 種** | — | — | — | — | — |
| 互動方式 | **拖曳+點擊** | — | — | — | — | — |

---

## 二、單元特色

### 2.1 組態驅動架構（ModeConfig）— F1 最大特色

F1 是 Money Tutor 專案中**架構最完整的單元之一**，其最大特色是將三種難度的所有差異（UI、語音、動畫、拖曳、計時等）全部集中於 `ModeConfig` 物件中：

```javascript
ModeConfig[difficulty] = {
    modeType,              // 模式分類
    speechTemplates,       // 語音模板（15+ 個）
    textTemplates,         // 文字模板
    cssClasses,            // CSS 類別映射（10+ 個）
    timing,                // 延遲時間設定
    uiElements,            // UI 元素顯示/隱藏
    clickToMoveConfig,     // 點擊放置模式設定
    touchDragConfig,       // 觸控拖曳設定
    animations             // 動畫設定
}
```

**優點**：
- 新增難度只需擴充組態，不需修改遊戲邏輯
- 行為差異一目了然，便於維護和除錯
- 可透過組態快速調整教學參數
- **無 if-else 業務邏輯硬編碼**

### 2.2 三種難度模式

| 模式 | 類型 | 物品數 | 特點 |
|------|------|--------|------|
| 簡單 | 一對一對應 | 1-5 | 有示範動畫，自動完成判定 |
| 普通 | 數量對應 | 1-10 | 有干擾物品，需手動確認 |
| 困難 | 多類型對應 | 5-15（1-5 種類型） | 需同時匹配類型與數量 |

### 2.3 雙重互動模式

同時支援「拖曳放置」和「點擊放置」兩種互動方式：
- **拖曳**：HTML5 Drag & Drop（桌面）+ TouchDragUtility（行動裝置）
- **點擊**：先點擊物品（綠色光暈選取）→ 再點擊目標格子放置

### 2.4 自訂主題

支援使用者上傳圖片作為遊戲素材：
- 圖片自動壓縮（200px、70% 品質）
- Base64 儲存於 state 中
- 搭配手動輸入名稱
- 遊戲中優先顯示圖片，fallback 為 Emoji

### 2.5 Debug 系統

F1 擁有完整的 `Debug` 物件，統一管理所有日誌輸出：

| 方法 | 用途 | 狀態 |
|------|------|------|
| `logError()` | 錯誤日誌 | ✅ 啟用 |
| `logGameFlow()` | 遊戲流程追蹤 | ✅ 啟用 |
| `logPlacementDrop()` | 放置框拖曳訊息 | ✅ 啟用 |
| `logUserAction()` | 用戶行為追蹤 | ✅ 啟用 |
| `logAudio()` | 音效播放 | ❌ 已禁用（減少輸出） |
| `logSpeech()` | 語音播放 | ❌ 已禁用 |
| `logConfig()` | 組態讀取 | ❌ 已禁用 |
| `logPerformance()` | 效能追蹤 | ❌ 已禁用 |

### 2.6 統一完成畫面（C/F 系列標準）

F1 已採用 C/F 系列統一的測驗結束畫面樣式：
- 紫色漸層背景 (`linear-gradient(135deg, #667eea 0%, #764ba2 100%)`)
- 卡片出現動畫 (`fadeIn`, `celebrate`)
- 獎盃上下彈跳動畫 (`bounce`)
- 橙色表現徽章 + 發光動畫 (`glow`)
- 粉紅色獎勵系統按鈕
- 三個統計卡片（答對題數、正確率、完成時間）
- 綠色「再玩一次」按鈕、紫色「返回設定」按鈕
- `confetti` 煙火動畫（v1.9.2 本地化）

### 2.7 作業單系統（連連看題型）

| 項目 | 說明 |
|------|------|
| 行數 | 135 行 |
| 題型 | 連連看（左右相同圖示用線連起來） |
| 佈局選項 | 1題10圖示 / 2題5圖示 / 3題3圖示 |
| 提示模式 | 一般 / 虛線提示（灰色虛線） |
| 答案卷 | 紅色實線連接 |
| 動態繪製 | `afterRender()` 中使用 SVG 繪製線條 |

**工具列配置**：
```javascript
toolbarConfig: {
    hidePrintAnswer: false,
    orientationButton: null,
    adjustCountButton: { label: '📊 圖示數量', type: 'dropdown', ... },
    fontButton: { label: '📝 測驗題型', type: 'cycle', options: ['一般', '虛線提示'] },
    needsPostRender: true
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

各難度有獨立的語音模板集（`speechTemplates`），包含 15+ 個場景：

| 模板 | 觸發時機 |
|------|---------|
| `initialInstruction` | 每題開始時的指導語 |
| `correctPlacement` | 正確放置物品時 |
| `turnComplete` | 完成一題時 |
| `incorrect` | 答錯時 |
| `hintUsed` | 提供提示時 |
| `itemSelected` | 點擊選取物品時 |
| `itemPlacedByClick` | 點擊放置成功時 |
| `itemReturnedByDrag` | 拖回物品區時 |
| `addCustomItem` | 新增自訂圖示時 |

### 3.3 音效系統

| 音效 | 檔案 | 觸發時機 |
|------|------|---------|
| 選取音 | `select.mp3` | 點擊選取物品 |
| 正確音 | `correct.mp3` | 正確放置 |
| 完成音 | `correct02.mp3` | 完成一題 |
| 錯誤音 | `error.mp3` | 答錯 |
| 成功音 | `success.mp3` | 完成所有題目 |
| 選單音 | `menu-select.mp3` | 選單互動 |
| 點擊音 | `click.mp3` | 一般點擊 |

### 3.4 行動裝置音訊解鎖

iOS/Android 要求使用者互動後才能播放音訊：
- 首次互動觸發 `unlockAudio()`
- 建立靜音 AudioContext + HTML5 Audio 元素
- 由 `audio-unlocker.js` 統一處理

---

## 四、觸控與桌面支援

### 4.1 觸控拖曳

| 機制 | 說明 |
|------|------|
| `touch-drag-utility.js` | 統一處理觸控事件轉換為拖曳邏輯 |
| `overscroll-behavior-y: contain` | 禁用下拉刷新（html、body、#app 三層防護） |
| `touch-action: manipulation` | 禁用雙擊縮放 |
| `-webkit-tap-highlight-color: transparent` | 移除觸控高亮 |
| `-webkit-touch-callout: none` | 禁用長按選單 |
| `user-select: none` | 禁用文字選取 |

### 4.2 觸控反饋

- 物品觸擊時：`transform: scale(0.95)`（手機端）/ `scale(0.98)`（桌面端）
- 選取狀態：綠色邊框 + 綠色陰影 + `scale(1.05)`
- 拖曳進入目標區：背景變為淡綠色 + 邊框變綠 + `scale(1.02)`

### 4.3 SortableJS 跨平台樣式

HTML 中定義了 SortableJS 相關 CSS class：
- `.sortable-fallback`：拖曳中的複製元素樣式
- `.sortable-ghost`：拖曳留下的佔位元素樣式
- `.sortable-chosen`：被選中元素的樣式

### 4.4 響應式設計

- `@media (min-width: 768px)`：桌面端較細微的觸控反饋
- 普通模式網格寬度固定 1490px（15 個 90px 格子 + 14 個 10px 間距）
- 困難模式使用 `border-box` 確保 JS 計算與渲染一致

### 4.5 F1 vs A6 觸控支援比較

| 項目 | F1 一對一對應 | A6 火車票 |
|------|-------------|----------|
| 音效解鎖 | `audio-unlocker.js` | `audio-unlocker.js` |
| 除錯面板 | `mobile-debug-panel.js` | `mobile-debug-panel.js` |
| 主題系統 | `theme-system.js` | `theme-system.js` |
| 拖曳工具 | `touch-drag-utility.js` | `touch-drag-utility.js` |
| Loading 畫面 | 無 | 有 |
| Error Boundary | 無 | 有 |
| Skip Link | 無 | **有（A 系列唯一）** |
| 鍵盤快捷鍵 | 無 | 無 |

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
│  │ 物品區(來源)   │  │ 目標區(放置)      │   │
│  │ Source Area  │  │ Target Area     │   │
│  └─────────────┘  └─────────────────┘   │
│                                         │
│  [確認完成] (普通/困難模式)                 │
│                                         │
├─────────────────────────────────────────┤
│ 煙火動畫容器 (固定定位，穿透點擊)            │
└─────────────────────────────────────────┘
```

### 5.2 三種模式版面差異

| 模式 | 版面特點 | CSS 類別 |
|------|---------|---------|
| 簡單 | 上方示範區 + 下方學生操作區 | `.easy-mode .placement-zone` |
| 普通 | 上方目標展示 + 下方來源池+放置格 | `.placement-grid-normal` |
| 困難 | 左側目標網格 + 右側放置網格 | `.target-grid`, `#placement-zone` |

---

## 六、動畫系統

### 6.1 @keyframes 動畫總覽

| 來源 | 數量 | 說明 |
|------|------|------|
| JS 內嵌 | 24 處定義 | 分散於各模式渲染函數中 |
| HTML 內嵌 | 1 處定義 | `fireworkExplode` |

### 6.2 JS 內嵌動畫列表

| # | 動畫名稱 | 行號 | 用途 | 重複定義 |
|---|----------|------|------|---------|
| 1 | `bounce` | 888, 5397 | 上下彈跳 | **2 處** |
| 2 | `fadeIn` | 2359, 5386 | 淡入 | **2 處** |
| 3 | `sparkle` | 3312, 3678 | 閃爍 | **2 處** |
| 4 | `pulse` | 3323, 3689 | 脈衝 | **2 處** |
| 5 | `shake` | 3349, 3715 | 抖動 | **2 處** |
| 6 | `hint-pulse` | 3808 | 提示脈衝 | 1 處 |
| 7 | `hint-glow` | 5876 | 提示發光 | 1 處 |
| 8 | `bounceIn` | 2344 | 彈跳進場 | 1 處 |
| 9 | `hintPulse` | 2088 | 提示脈衝（另一版） | 1 處 |
| 10 | `revealBounceIn` | 2154 | 揭示彈跳進場 | 1 處 |
| 11 | `numberGlow` | 2169 | 數字發光 | 1 處 |
| 12 | `revealBounceOut` | 2174 | 揭示彈跳離場 | 1 處 |
| 13 | `pulseGlow` | 2252 | 脈衝發光 | 1 處 |
| 14 | `pair-success-anim` | 3019, 4224, 4270 | 配對成功 | **3 處**（有條件檢查） |
| 15 | `error-shake` | 4316 | 錯誤抖動 | 1 處 |
| 16 | `celebrate` | 5391 | 慶祝 | 1 處 |
| 17 | `glow` | 5403 | 發光 | 1 處 |

**重複定義統計**：`bounce`(2)、`fadeIn`(2)、`sparkle`(2)、`pulse`(2)、`shake`(2)、`pair-success-anim`(3，有條件檢查)

### 6.3 Canvas-Confetti 煙火效果

| 項目 | 說明 |
|------|------|
| 版本 | **v1.9.2**（本地化，與其他單元一致） |
| 觸發時機 | 完成挑戰時（`endGame()`） |
| 粒子數 | 100 |
| 擴散角度 | 70° |

---

## 七、Bug 檢測與已知問題

### 7.1 已確認的程式碼問題

| # | 嚴重度 | 問題描述 | 數據 | 狀態 |
|---|--------|---------|------|------|
| 1 | **高** | `setTimeout` 未清理（含部分遊戲流程 raw setTimeout） | 43 個 + 新發現 11 個 → **全部 TimerManager 管理** | ✅ **已修復** (2026-02-11 + 2026-02-24) |
| 2 | **高** | `addEventListener` 未移除 | 26 個 addEventListener → **EventManager 管理** | ✅ **已修復** (2026-02-11) |
| 3 | **高** | `!important` 過多 | JS 116 個 + HTML 80 個 = **196 個** | ⚠️ 待改善 |
| 4 | **中** | JS @keyframes 重複定義 | 全部 19 個 @keyframes 已統一至 `injectGlobalAnimationStyles()`，衝突動畫已重命名 | ✅ **已修復** (2026-02-23) |
| 5 | **低** | `console.log` 殘留 | **6 個**（已由 Debug 系統統一管理，數量很少） | ✅ 可接受 |
| 6 | **建議** | 無 Loading 畫面 | 建議參考 A6 新增 | ⚠️ 待新增 |
| 7 | **建議** | 無 Error Boundary | 建議參考 A6 新增 | ⚠️ 待新增 |
| 8 | **建議** | 無 Skip Link | 建議參考 A6 新增（無障礙功能） | ⚠️ 待新增 |
| 9 | **低** | 自訂圖示上傳/刪除流程使用 `alert()`/`confirm()` 阻塞式對話框（7 處，搜尋 `alert(`） | ⚠️ 暫緩（低優先） |
| 10 | **高** | 普通模式 `this.state.normalMode` 永遠為 `null`，`handleSourceDrop()` 存取 `.targetItems` 崩潰 | `renderNormalMode()` 從未初始化 `normalMode`，拖回物品必定 TypeError | ✅ **已修復** (2026-02-24)：在 `renderNormalMode()` 加入 `this.state.normalMode = { targetItems: [] }` |
| 11 | **高** | `handleHintClick()` 直接解構 `this.state.hardMode` 無 null 防護，非困難模式下崩潰 | `const { correctAnswerSet, placedItems } = this.state.hardMode` → hardMode 為 null 時 TypeError | ✅ **已修復** (2026-02-24)：加入 `if (!this.state.hardMode) return` 防護 |
| 12 | **中** | `startNewTurn()` async 函數發生例外時 `isStartingNewTurn` 永久為 `true`，遊戲卡死 | try/finally 缺失，若 `renderModeSpecificUI()` 丟出例外，旗標不重置 | ✅ **已修復** (2026-02-24)：加入 try/finally，`finally` 區塊重置旗標 |

### 7.2 F1 vs A6 Bug 數量比較

| 問題類型 | F1 一對一對應 | A6 火車票 | 評價 |
|---------|-------------|----------|------|
| console.log | **6** | 276 | ✅ F1 優秀 |
| 未清理 setTimeout | ~~43~~ → **0（TimerManager）** | 74 | ✅ **已修復** |
| 未移除 addEventListener | ~~26~~ → **0（EventManager）** | 63 | ✅ **已修復** |
| !important 總數 | **196** | 110 | ❌ F1 較多 |
| 動畫重複定義 | ~~5+ 個~~ → **0（全局注入）** | 2 個 | ✅ **已修復** |
| 同名函數覆蓋 | **無** | 1 處 | ✅ F1 無此問題 |

### 7.3 正面發現

| 項目 | 說明 |
|------|------|
| Debug 系統 | 完整的 `Debug` 物件統一管理日誌，大幅減少 console.log 殘留 |
| confetti 版本 | 使用 v1.9.2（本地化），版本一致 |
| 完成畫面 | 已採用 C/F 系列統一樣式 |
| startTime 記錄 | 已正確記錄遊戲開始時間 |
| 組態驅動架構 | ModeConfig 設計良好，未來單元可參考 |
| **TimerManager** | ✅ 統一計時器管理，場景切換時自動清理（2026-02-11 新增） |
| **EventManager** | ✅ 統一事件監聽器管理，支援分類清理（2026-02-11 新增） |
| **全局動畫注入** | ✅ `injectGlobalAnimationStyles()` 統一管理 @keyframes（2026-02-11 新增） |

### 7.4 非 Bug 但需注意的設計

| 項目 | 說明 |
|------|------|
| JS 單檔 7,468 行 | 雖然大但低於 A 系列多數單元 |
| 普通模式網格 | 固定寬度 1490px，在小螢幕上可能需要水平捲動 |
| 圖片壓縮 | 自訂圖片壓縮至 200px，作為教學用途品質足夠但可能模糊 |
| 無 localStorage 持久化 | 遊戲進度不儲存，重新整理頁面會遺失 |

### 7.5 狀態管理現況

| 項目 | 狀態 |
|------|------|
| 統一重置函數 | ✅ `resetGameState()` |
| 布林旗標 | `isAnswering`, `isStartingNewTurn` |
| 重置位置 | 統一（2 處） |
| 評價 | ✅ **最佳實踐** |

**重構完成**（2026-02-17）：已實現統一的 `resetGameState()` 函數

**重置項目**：
- 核心狀態：`score`, `currentTurn`, `correctAnswer`, `lastAnswer`, `startTime`, `userCountProgress`, `isAnswering`, `isStartingNewTurn`, `selectedClickItem`
- 模式狀態：`easyMode`, `normalMode`, `hardMode`
- 拖曳狀態：`correctPlacements`, `draggedItems`, `selectedCard`, `placedCount`, `placedItems`

**調用位置**：
| 位置 | 調用條件 | 說明 |
|------|---------|------|
| `showSettings()` | 無條件 | 返回設定時重置狀態 |
| `start()` | 無條件 | 開始遊戲前重置狀態 |

**搜尋關鍵字**：`resetGameState`

---

## 八、未來開發建議

### 8.1 setTimeout / addEventListener 管理器 ✅ 已實現

**原問題**：43 個 setTimeout 無對應清理；26 個 addEventListener 無移除。

**已修復**（2026-02-11）：引入 `TimerManager` 和 `EventManager`

```javascript
// TimerManager：統一計時器管理
Game.TimerManager.setTimeout(callback, delay, 'turnTransition');
Game.TimerManager.clearByCategory('turnTransition');
Game.TimerManager.clearAll();

// EventManager：統一事件監聽器管理
Game.EventManager.on(element, 'click', handler, {}, 'gameUI');
Game.EventManager.removeByCategory('gameUI');
Game.EventManager.removeAll();
```

**整合位置**：
- `init()` → 清理所有計時器和事件監聽器
- `showSettings()` → 清理 gameUI 類別
- `endGame()` → 清理 turnTransition 類別
- `HTML5DragSystem.cleanup()` → 清理 dragSystem 和 animation 類別

### 8.2 CSS 動畫統一管理 ✅ 已完成

**原問題**：5+ 個動畫有重複定義，分散於 JS 各處。

**第一次修復**（2026-02-11）：
- 新增 `injectGlobalAnimationStyles()` 方法，移除主要重複定義

**第二次修復**（2026-02-23）：
- 新增 8 個唯一動畫至全局函數
- 移除所有剩餘散落定義（8 處）
- 重命名衝突動畫：`pulseGlow`→`inputPromptPulseGlow`、`bounceIn`→`popupBounceIn`
- 修復 11 個 `this.Debug` → `Game.Debug` 嵌套物件問題

**統一管理的動畫（19 個）**：
- `bounce`、`fadeIn`、`sparkle`、`pulse`、`shake`、`celebrate`、`glow`
- `pulseGlow`、`bounceIn`、`pair-success-anim`、`error-shake`
- `hintPulse`、`revealBounceIn`、`numberGlow`、`revealBounceOut`
- `inputPromptPulseGlow`、`popupBounceIn`、`hint-pulse`、`hint-glow`

### 8.3 新增無障礙功能

**建議參考 A6 新增**：
- Loading 畫面（旋轉動畫 + 「載入中...」）
- Error Boundary（全域錯誤處理 + 重新載入按鈕）
- Skip Link（跳過導航連結）
- NoScript 提示

### 8.4 ModeConfig 模板化

**問題**：三個難度的 `ModeConfig` 有大量重複（如 `speechTemplates`、`timing`）。

**建議**：

```javascript
const BaseModeConfig = { /* 共用預設值 */ };
ModeConfig.easy = { ...BaseModeConfig, /* 簡單模式覆寫 */ };
ModeConfig.normal = { ...BaseModeConfig, /* 普通模式覆寫 */ };
ModeConfig.hard = { ...BaseModeConfig, /* 困難模式覆寫 */ };
```

### 8.5 HTML 樣式外部化 ✅ 已完成（2026-02-24）

**原問題**：HTML 內嵌 220 行 CSS + 80 個 `!important`。

**已修復**：
- HTML 內嵌 `<style>` 區塊（~220 行）全部移至 `css/f1-object-correspondence.css`
- JS 內各函數 `<style>` 區塊（設定頁 Modal、完成畫面等）一併外部化
- JS 保留 `injectGlobalAnimationStyles()` 負責注入 @keyframes（動態需求）
- 搜尋關鍵字：`f1-object-correspondence.css`

### 8.6 作業單擴充建議

**現狀**：135 行、連連看題型、有 afterRender 動態繪製。

**可擴充方向**：
- 新增更多主題圖示（目前 30 個 emoji）
- 新增難度選項（圖示數量更大）
- 與遊戲共享主題資料（建立共用 `data/emoji-sets.js`）

---

## 九、總結

### F1 一對一對應的優勢

1. **組態驅動架構**：ModeConfig 設計是 Money Tutor 專案中最完整的範例，未來單元開發的良好參考
2. **Debug 系統**：統一管理所有日誌輸出，`console.log` 僅殘留 6 個（A 系列最少）
3. **雙重互動模式**：同時支援拖曳和點擊放置，照顧不同操作習慣的使用者
4. **自訂主題**：支援圖片上傳 + 壓縮，可客製化教學內容
5. **作業單 afterRender**：使用 SVG 動態繪製線條，技術實現優雅
6. **完成畫面統一**：已採用 C/F 系列標準樣式
7. **confetti 版本一致**：使用 v1.9.2 本地化版本

### F1 一對一對應的待改進處

1. ~~**43 個未清理 setTimeout**~~ → ✅ **已修復** (TimerManager)
2. ~~**26 個未移除 addEventListener**~~ → ✅ **已修復** (EventManager)
3. **196 個 !important** → ⚠️ 建議減少使用，改用更高特異性選擇器
4. ~~**5+ 個動畫重複定義**~~ → ✅ **已修復** (injectGlobalAnimationStyles，19 個動畫全統一)
5. **無 Loading / Error Boundary / Skip Link** → ⚠️ 建議參考 A6 新增

### 核心數據

| 指標 | 修復前 | 修復後 |
|------|--------|--------|
| 主程式行數 | 7,468 行 | ~7,620 行（含管理器 + 修復） |
| setTimeout 未清理 | **43 + 11 = 54 個** | **0 個**（TimerManager 管理） |
| addEventListener 未移除 | **26 個** | **0 個**（EventManager 管理） |
| @keyframes 重複 | **5+ 個** | **0 個**（全局統一） |
| console.log | 6 個 | 6 個（可接受） |
| !important | 196 個 | 196 個（待改善） |
| normalMode null 崩潰 | **有（拖回物品必崩）** | **0**（已修復） |
| hardMode null 防護 | **缺失** | **有（null guard）** |
| isStartingNewTurn 卡死 | **有（例外時旗標不重置）** | **0**（try/finally）|

| 指標 | 數值 |
|------|------|
| 難度模式 | 3 種 |
| 語音模板 | 15+ 個/難度 |
| 音效 | 7 個 |
| 外部依賴 | 8 個 JS（含本地 confetti） |
| 作業單題型 | 連連看（3 種版面配置） |
| 互動方式 | 拖曳 + 點擊（雙模式） |
| 自訂主題 | 支援圖片上傳 |

---

## 十、修復記錄

### 2026-02-11：記憶體洩漏修復

**修改檔案**：`js/f1_object_correspondence.js`

**新增功能**：

1. **TimerManager**（計時器管理器）
   - 位置：`elements: {}` 之後
   - 功能：統一管理所有 setTimeout，支援分類清理
   - 方法：`setTimeout()`, `clearTimeout()`, `clearAll()`, `clearByCategory()`
   - 類別：`turnTransition`, `animation`, `default`

2. **EventManager**（事件監聽器管理器）
   - 位置：`TimerManager` 之後
   - 功能：統一管理所有 addEventListener，支援分類清理
   - 方法：`on()`, `removeAll()`, `removeByCategory()`
   - 類別：`gameUI`, `dragSystem`, `default`

3. **injectGlobalAnimationStyles()**（全局動畫樣式注入）
   - 位置：`EventManager` 之後
   - 功能：統一注入所有 @keyframes 定義，避免重複
   - 動畫：bounce, fadeIn, sparkle, pulse, shake, celebrate, glow, pulseGlow, bounceIn, pair-success-anim, error-shake

**修改位置**：

| 函數 | 修改內容 |
|------|---------|
| `init()` | 新增 `TimerManager.clearAll()`, `EventManager.removeAll()`, `injectGlobalAnimationStyles()` |
| `showSettings()` | 新增 `TimerManager.clearAll()`, `EventManager.removeByCategory('gameUI')` |
| `endGame()` | 新增 `TimerManager.clearByCategory('turnTransition')` |
| `HTML5DragSystem.cleanup()` | 新增 `EventManager.removeByCategory('dragSystem')`, `TimerManager.clearByCategory('animation')` |
| `setupGameUI()` | app click 事件改用 `EventManager.on()` |
| `HTML5DragSystem.initialize()` | 6 個拖曳事件改用 `EventManager.on()` |

**刪除內容**（重複 @keyframes 定義）：

| 位置 | 刪除內容 |
|------|---------|
| settingsScreen | `@keyframes bounce` |
| renderNormalMode | `@keyframes sparkle`, `pulse`, `shake` |
| renderHardMode | `@keyframes sparkle`, `pulse`, `shake` |
| endGame | `@keyframes fadeIn`, `celebrate`, `bounce`, `glow` |

**預期效果**：

| 指標 | 修復前 | 修復後 |
|------|--------|--------|
| setTimeout 清理率 | 0% | 100%（透過 TimerManager） |
| addEventListener 清理率 | 0% | 100%（透過 EventManager） |
| @keyframes 重複定義 | 5 個×2 | 0（統一至全局） |
| 場景切換記憶體洩漏 | 有風險 | 已修復 |

---

### 2026-02-16：程式碼複檢

**檢查結果**：✅ 無新增 Bug

**驗證項目**：
1. ✅ TimerManager 正確實現並被調用（init、showSettings、endGame、HTML5DragSystem.cleanup）
2. ✅ EventManager 正確實現並被調用（拖曳事件、app click 事件）
3. ✅ injectGlobalAnimationStyles() 正確注入全局動畫
4. ✅ endGame() 完成畫面樣式符合 C/F 系列標準
5. ✅ confetti 動畫正確觸發
6. ✅ 獎勵系統按鈕正確綁定

**待改善項目（無變化）**：
- !important 196 個（建議性改進）
- 無 Loading 畫面 / Error Boundary / Skip Link（功能增強建議）

---

### 2026-02-17：狀態管理重構（resetGameState）

**問題**：
- 狀態重置邏輯分散於 6 個不同位置
- `score`、`currentTurn`、`isAnswering`、`isStartingNewTurn` 等多個狀態需要重置
- 不符合 C1/C2/C4/C5/C6 等單元的最佳實踐

**修改內容**：

1. **新增 `resetGameState()` 函數**
   - 位置：`injectGlobalAnimationStyles()` 之後
   - 集中管理所有遊戲相關狀態的重置
   - 重置項目：
     - 核心狀態：`score`, `currentTurn`, `correctAnswer`, `lastAnswer`, `startTime`, `userCountProgress`, `isAnswering`, `isStartingNewTurn`, `selectedClickItem`
     - 模式狀態：`easyMode`, `normalMode`, `hardMode`
     - 拖曳狀態：`correctPlacements`, `draggedItems`, `selectedCard`, `placedCount`, `placedItems`
   - 輸出日誌：`🔄 [F1] 遊戲狀態已重置`

2. **調用位置**
   | 位置 | 調用條件 | 說明 |
   |------|---------|------|
   | `showSettings()` | 無條件 | 返回設定時重置狀態 |
   | `start()` | 無條件 | 開始遊戲前重置狀態 |

**修改檔案**：
- `js/f1_object_correspondence.js`

**驗證方式**：
1. 開啟 F1 一對一對應
2. 完成部分測驗後點擊「返回設定」
3. Console 應顯示「🔄 [F1] 遊戲狀態已重置」
4. 重新開始遊戲，確認題目從第 1 題開始、分數為 0、狀態清空

---

---

### 2026-02-21：Debug Logger 重構為 FLAGS 分類開關系統

**問題**：
- F1 原有的 Debug 系統使用 `Debug.enabled` 單一開關 + 專用方法（`logError()`, `logGameFlow()` 等）
- 不符合 C4/C5/C6 等單元採用的 FLAGS 分類開關標準
- 部分 console 調用未通過 Debug 系統管理

**修改內容**：

1. **重構 Debug 系統為 FLAGS 分類開關**
   - 位置：`Game` 物件開頭
   - 新增 12 個分類：`init`, `speech`, `audio`, `ui`, `drag`, `question`, `state`, `timer`, `event`, `game`, `user`, `error`
   - 新增 `log(category, ...)`, `warn(category, ...)`, `error(...)` 統一方法
   - 保留向後兼容的舊方法映射

2. **轉換的 console 調用**（14 個）
   | 原始位置 | 分類 | 說明 |
   |---------|------|------|
   | TimerManager.clearAll() | timer | 計時器清理日誌 |
   | TimerManager.clearByCategory() | timer | 計時器分類清理日誌 |
   | EventManager.removeAll() | event | 事件監聽器清理日誌 |
   | EventManager.removeByCategory() | event | 事件監聽器分類清理日誌 |
   | injectGlobalAnimationStyles() | init | 動畫樣式注入日誌 |
   | resetGameState() | state | 遊戲狀態重置日誌 |
   | startFireworksAnimation() | ui | 煙火動畫日誌（3 個） |
   | handleImageUpload() | error | 圖片壓縮錯誤 |
   | console.groupEnd() | - | 移除（已註釋，2 個） |

3. **FLAGS 分類說明**
   ```javascript
   Game.Debug.FLAGS = {
       all: false,        // 全域開關
       init: false,       // 初始化相關
       speech: false,     // 語音系統
       audio: false,      // 音效系統
       ui: false,         // UI 渲染
       drag: false,       // 拖曳操作
       question: false,   // 題目生成
       state: false,      // 狀態變更
       timer: false,      // 計時器管理
       event: false,      // 事件管理
       game: false,       // 遊戲流程
       user: false,       // 用戶行為
       error: true        // 錯誤訊息（預設開啟）
   }
   ```

4. **使用方式**
   ```javascript
   // 在瀏覽器 Console 中開啟特定分類
   Game.Debug.FLAGS.all = true;     // 開啟全部
   Game.Debug.FLAGS.timer = true;   // 只開啟計時器相關
   Game.Debug.FLAGS.event = true;   // 只開啟事件相關
   ```

**保留的內部 console 調用**（3 個）：
- 行 89：`console.log(\`[F1-${category}]\`, ...args)` - Game.Debug.log 內部實現
- 行 95：`console.warn(\`[F1-${category}]\`, ...args)` - Game.Debug.warn 內部實現
- 行 101：`console.error('[F1-ERROR]', ...args)` - Game.Debug.error 內部實現

**修改檔案**：
- `js/f1_object_correspondence.js`

**統計**：
- 轉換前：14 個 console 調用 + 225 個 Game.Debug 調用
- 轉換後：3 個 console 調用（內部實現）+ 238 個 Game.Debug 調用

**搜尋關鍵字**：`Game.Debug.FLAGS`, `Game.Debug.log`

---

### 2026-02-23：動畫定義整合完成 + 嵌套物件修復

**問題**：
- `injectGlobalAnimationStyles()` 已於 2026-02-11 建立，但仍有 8 處散落 @keyframes 定義未移入
- 兩個動畫名稱與全局函數衝突（`pulseGlow`、`bounceIn` 內容不同）
- 11 個 `this.Debug` 在自訂圖示相關方法中，若作為事件回調可能 `this` 解析錯誤

**散落位置與處理方式**：

| 位置 | 動畫名稱 | 處理方式 |
|------|---------|---------|
| `hintBox()` 內嵌 `<style>` | `hintPulse` | 移入全局 |
| `answerRevealPopup()` 內嵌 `<style>` | `revealBounceIn`, `numberGlow`, `revealBounceOut` | 移入全局 |
| `inputPromptContainer()` 內嵌 `<style>` | `pulseGlow`（衝突） | 重命名為 `inputPromptPulseGlow`，移入全局 |
| `feedbackPopup()` 內嵌 `<style>` | `bounceIn`（衝突）, `fadeIn`（重複） | `bounceIn` 重命名 `popupBounceIn`，移入全局；`fadeIn` 刪除 |
| `#dynamic-turn-styles` CSS | `pair-success-anim`（重複）, `.pair-success`（重複） | 刪除（已在全局） |
| `#modern-hint-btn-styles` CSS | `hint-pulse` | 移入全局 |
| `#pair-success-animation-styles` 動態注入（2 處） | `pair-success-anim`（重複） | 刪除整個注入塊 |
| `showNormalError()` 動態 CSS | `error-shake`（重複）, `.error-shake`（重複） | 刪除整個注入塊 |
| `#hint-glow-animation-styles` 動態注入 | `hint-glow`, `.hint-glow` | 移入全局 |

**嵌套物件修復**：
- 11 個 `this.Debug` → `Game.Debug`（`triggerImageUpload`, `handleImageUpload`, `showImagePreview`, `closeImagePreview`, `confirmAddCustomItem`, `removeCustomItem` 方法中）

**修改結果**：
- `injectGlobalAnimationStyles()` 現包含 19 個動畫（原 11 個）
- 全局 CSS class：`.pair-success`, `.error-shake`, `.hint-glow`

**搜尋關鍵字**：`injectGlobalAnimationStyles`, `f1-global-animations`, `inputPromptPulseGlow`, `popupBounceIn`

---

---

### 2026-02-24：新發現 Bug 修復（Bug #10、#11、#12 + TimerManager 補完）

**問題 1（Bug #10）— 普通模式 normalMode null 崩潰（高）**：

- `renderNormalMode()` 從未初始化 `this.state.normalMode`（永遠為 `null`）
- `handleSourceDrop()` 直接存取 `this.state.normalMode.targetItems` → TypeError 崩潰
- **修復**：在 `renderNormalMode()` 開頭加入 `this.state.normalMode = { targetItems: [] }`

**問題 2（Bug #11）— handleHintClick() hardMode null 防護缺失（高）**：

- `handleHintClick()` 第一行直接解構 `this.state.hardMode`
- 若 hardMode 未初始化（非困難模式異常觸發），TypeError 崩潰
- **修復**：加入 `if (!this.state.hardMode) { Game.Debug.logError(...); return; }` 防護

**問題 3（Bug #12）— startNewTurn() isStartingNewTurn 旗標未防護（中）**：

- async `startNewTurn()` 若 `renderModeSpecificUI()` 拋出例外，`isStartingNewTurn` 永久 `true`
- 導致所有後續回合被阻擋，遊戲卡死
- **修復**：加入 `try/finally`，`finally` 區塊統一重置旗標

**問題 4（Bug #1 補完）— 11 個遊戲流程 raw setTimeout 遺漏**：

| 位置 | 描述 | 類別 |
|------|------|------|
| `handleNormalComplete()` 判斷延遲 (500ms) | 原 raw setTimeout → TimerManager | `turnTransition` |
| `handleNormalComplete()` 按鈕恢復延遲 (2500ms) | 原 raw setTimeout → TimerManager | `turnTransition` |
| `showNormalSuccess()` pair-success 動畫清除 ×2 | 原 raw setTimeout → TimerManager | `animation` |
| `showHardSuccess()` pair-success 動畫清除 ×2 | 原 raw setTimeout → TimerManager | `animation` |
| `showNormalError()` 按鈕恢復 (2000ms) | 原 raw setTimeout → TimerManager | `turnTransition` |
| `showNormalError()` error-shake 動畫清除 (600ms) | 原 raw setTimeout → TimerManager | `animation` |
| `handleHintClick()` hint-glow 動畫清除 | 原 raw setTimeout → TimerManager | `animation` |
| `showNormalSuccess()` 簡單模式 pair-success 動畫清除 | 原 raw setTimeout → TimerManager | `animation` |
| 演示動畫 pair-success 動畫清除 | 原 raw setTimeout → TimerManager | `animation` |

**搜尋關鍵字**：`Bug修復] 使用 TimerManager 管理`, `Bug修復] 初始化 normalMode`, `Bug修復] 防止 hardMode`, `Bug修復] 使用 try/finally`

---

### 2026-02-24（第二輪）：新發現 Bug 修復（Bug #13、#14）

**問題 1（Bug #13）— showSettings()/initThemeSystem()/showQuantityOptions() EventManager 繞過（高）**：

- `showSettings()` 的 4 個 addEventListener（`.game-settings`、`#start-game-btn`、獎勵連結、作業單連結）未透過 EventManager 追蹤
- `initThemeSystem()` 的 2 個 addEventListener（主題選擇器、顏色選擇器）未透過 EventManager 追蹤
- `showQuantityOptions()` 的 addEventListener（選項按鈕）未透過 EventManager 追蹤
- **修復**：全部改為 `Game.EventManager.on(..., 'gameUI')`

**問題 2（Bug #14）— resetGameState() 缺少 totalTurns 初始化（高）**：

- `handleSelection()` 設定 `this.state.totalTurns`，但 `resetGameState()` 未重置此屬性
- `start()` 呼叫 `resetGameState()` 後，`totalTurns` 變為 `undefined`
- `setupGameUI()` 使用 `this.state.totalTurns` 顯示題數進度 → 顯示異常
- **修復**：在 `resetGameState()` 加入 `this.state.totalTurns = this.state.settings.questionCount || 10`

---

### 2026-02-24：作業單連結統一簡化（僅傳 unit 參數）

**修改內容**：

- 作業單連結原本傳遞遊戲設定參數（`difficulty`, `range`, `theme`）
- 各作業單已有完整工具列，用戶開啟後可直接在工具列調整；遊戲設定與作業單設定應獨立運作
- **修復**：移除所有多餘參數，統一改為只傳 `unit` 參數，讓作業單完全使用自己的預設値

**修改檔案**：`js/f1_object_correspondence.js`

---

---

### 2026-02-24：主題「預設」選項新增

**修改檔案**：`js/f1_object_correspondence.js`

**問題描述**：
- 設定頁「遊戲主題」只有固定主題（水果/動物/交通工具/自訂），缺少隨機選擇選項
- 初始主題值為 `null`，需要使用者每次手動選擇

**修改內容**：

1. **新增「預設 🎲」主題按鈕**
   - 位置：設定頁主題選擇按鈕群組，排在第一個
   - 功能：隨機從全部內建主題（水果/動物/交通工具）中隨機混合選取
   - 初始選取狀態：預設選中「預設 🎲」

2. **初始設定值修改**
   - `this.state.settings.theme` 預設值：`null` → `'default'`

3. **主題生成邏輯**
   - 進入 `default` 模式時，合併所有非自訂主題的 emoji 組成完整池
   - 每題從完整池中隨機選取，達到自然混合效果

**搜尋關鍵字**：`theme: 'default'`, `'預設 🎲'`

---

### 2026-02-24：CSS 分離（Phase 1~4）

**修改檔案**：
- `html/f1_object_correspondence.html`（移除 inline `<style>` 區塊，新增 `<link>`）
- `css/f1-object-correspondence.css`（新建，~220 行）
- `js/f1_object_correspondence.js`（移除各函數模板內嵌 `<style>` 區塊）

**Phase 1 — HTML inline 樣式外部化**：
- HTML 原有 ~220 行 `<style>` 區塊（拖曳、觸控反饋、深色模式樣式）
- 移至 `css/f1-object-correspondence.css`
- HTML 新增 `<link rel="stylesheet" href="../css/f1-object-correspondence.css">`

**Phase 2 — settingsScreen() 模板 `<style>` 外部化**：
- 移除 `settingsScreen()` 中的 `.image-preview-modal` Modal 樣式（取消/確認按鈕等）
- 移至 CSS 檔案

**Phase 3 — 各小型模板 `<style>` 外部化**：
- 移除 `hintBox()`、`inputPromptContainer()`、`feedbackPopup()` 等函數中的 `<style>` 區塊
- 移至 CSS 檔案

**Phase 4 — endGame() 完成畫面 `<style>` 外部化**：
- 移除 `endGame()` 中 ~230 行結果畫面 `<style>` 區塊
- 移至 CSS 檔案

**驗證**：
- `grep '<style>'` → 0 個結果（僅 `injectGlobalAnimationStyles()` 保留 @keyframes 注入）

**搜尋關鍵字**：`f1-object-correspondence.css`

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
- `js/f1_object_correspondence.js`（`handleDragStart` 加入 setDragImage ghost）
- `js/touch-drag-utility.js`（touchIdentifier 過濾，跨單元共用）

---

### 2026-02-26：普通模式完成按鈕錯誤恢復期間補齊修復 + 困難模式 isAnswering 未重置修復

**問題 1 — 普通模式：補齊最後圖示後無法再按「完成對應」**

**重現步驟**：
1. 部分放置框空著，按下「完成對應」→ 顯示錯誤（「再試一次」狀態，按鈕 disabled）
2. 在錯誤恢復的 2500ms 計時器倒數期間，拖曳最後一個圖示補入放置框
3. 再按「完成對應」→ 無反應（按鈕仍 disabled 或 `isAnswering = true`）

**根本原因**：`handleNormalComplete()` 錯誤路徑以 `TimerManager.setTimeout(..., 2500, 'turnTransition')` 延遲重置按鈕與 `isAnswering`。若使用者在這 2500ms 內補齊最後圖示，按鈕依然 disabled，完全無法提交正確答案。

**修復**（`js/f1_object_correspondence.js` — drop handler 普通模式段）：
- 每次物品成功放入後，計算 `placedCount`
- 若 `placedCount >= this.state.correctAnswer`（已補齊）且 `completeBtn.disabled === true` 且 `completeBtn.classList.contains('error')`（確認是錯誤恢復期）：
  - 呼叫 `Game.TimerManager.clearByCategory('turnTransition')` 取消剩餘的 2500ms 計時器
  - 立即 `completeBtn.disabled = false`、移除 `error` class、加回 `ready` class
  - 恢復按鈕文字（「完成對應」/ ✨）
  - 重置 `this.state.isAnswering = false`

**問題 2 — 困難模式：錯誤後 `isAnswering` 永久為 true**

困難模式 `handleHardComplete()` 的錯誤路徑（`'animation'` 類別計時器）僅重新啟用按鈕，未重置 `this.state.isAnswering`。由於防抖條件為 `isAnswering || completeBtn?.disabled`，下次按下時雖然按鈕已啟用，但 `isAnswering = true` 仍阻擋進入。

**修復**（`js/f1_object_correspondence.js` — `handleHardComplete()` 錯誤路徑）：
- 在 2000ms 計時器回呼末尾加入 `this.state.isAnswering = false`

**修改檔案**：
- `js/f1_object_correspondence.js`（drop handler 普通模式段 + `handleHardComplete()` 錯誤路徑）

---

### 2026-02-26（2）：困難模式按鈕文字修復 + 取代放置功能

**問題 1 — 困難模式：答錯後按鈕文字恢復錯誤**

`handleHardComplete()` 使用 `completeBtn.textContent = '判斷中...'`，此操作會覆蓋按鈕內部的 HTML 結構（`<span class="btn-icon">✨</span><span class="btn-text">完成對應</span>`），導致按鈕文字變成純文字而非帶圖示的格式。恢復時同樣使用 `textContent = '完成'`，而非「✨完成對應」。

**修復**：改用 `.btn-text`/`.btn-icon` 子元素設定文字，與 `handleNormalComplete()` 保持一致：
- 進入判斷：`btnText.textContent = '判斷中...'`；`btnIcon.textContent = '⏳'`
- 錯誤恢復：`btnText.textContent = '完成對應'`；`btnIcon.textContent = '✨'`

**問題 2 — 困難模式：無法將物品拖曳至已有圖示的放置格（取代功能）**

困難模式放置格（`target-grid-item`）已有物品時，有三道防線封鎖新放置：
1. `validateDrop()`：`target-grid-item.filled` 返回 `false`
2. `executeDrop()`：`filled` 格子直接 `handleItemReturn` 並返回
3. `handleItemPlacement()`：無取代邏輯

**修復**：

1. **`validateDrop()`**：困難模式下 `target-grid-item` 即使 `filled` 也返回 `true`
2. **`executeDrop()`**：加入 `_isHardReplace` 旗標，困難模式的 `target-grid-item.filled` 不在此攔截
3. **`handleItemPlacement()`**：在 `appendChild` 前，若困難模式且目標格已有物品：
   - **從物品區拖入**：顯示原始物品（`display = ''`、刪除 `dataset.placed`）、移除格中複製品 → 取代
   - **從另一格拖入**：將原有物品移至原格（交換）

**修改檔案**：
- `js/f1_object_correspondence.js`（`handleHardComplete()`、`validateDrop()`、`executeDrop()`、`handleItemPlacement()`）

---

### 2026-02-26（3）：困難模式取代放置後續修復（舊物品消失 + 初始化錯誤）

**問題 1 — 取代時舊物品消失**

取代放置實作中，對「從物品區拖入」的情況，使用 `data-id` 去 source 找「隱藏的原始物品」並恢復顯示。但困難模式的放置走 `appendChild`（直接移動元素），不使用 F3 的 clone 隱藏機制，source 根本沒有隱藏版本可恢復 → `existingItem.remove()` 讓舊物品直接消失。

**修復**：改為 `origParent.appendChild(existingItem)` 直接將舊物品移回 `source-container`，並重置 class（移除 `placed-item`/`dragging`/`touch-dragging`/`static-item`）與 `draggable`/`dataset.placed` 屬性。

**問題 2 — 初始化時 `difficulty is not defined`（5 次）**

`HTML5DragSystem` 物件字面量內定義了**兩個** `validateDrop` 方法。JavaScript 後者覆蓋前者：
- 第一個（`~line 6534`）：有 `const difficulty = ...` 宣告（已無效）
- 第二個（`~line 6662`）：實際執行，無 `difficulty` 宣告

我先前的困難模式 `if (difficulty === 'hard' ...)` 加在第一個（dead code），第二個執行時拋出 `ReferenceError: difficulty is not defined`（5 次，於 `refresh()` 初始化期間，破壞整體觸控拖曳系統）。

**修復**：
1. 還原第一個 `validateDrop` 的修改（移除無效的 hard mode check）
2. 在第二個（實際執行）的 `target-grid-item` 判斷區塊內補加 `const difficulty = Game.state?.settings?.difficulty || 'easy';` 宣告與困難模式允許取代的條件

**修改檔案**：`js/f1_object_correspondence.js`（`handleItemPlacement()` 取代邏輯、第二個 `validateDrop()`）

---

### 2026-02-26（4）：困難模式移除點擊選擇效果

**問題**：點擊物品框圖示時，出現「已選擇公車，點擊放置區來放置」語音、點擊選擇視覺效果（高亮框）、圖示位移，干擾使用者，應僅保留拖曳功能。

**修復**：困難模式 `ModeConfig.hard.clickToMoveConfig.allowClickToPlace` 由 `true` 改為 `false`，`handleClickToPlace()` 在第一個 guard 即 return，語音/選擇效果/位移全部消除。`allowClickToReturn: true` 不變（點擊已放置物品仍可返回）。

**修改檔案**：`js/f1_object_correspondence.js`（`ModeConfig.hard.clickToMoveConfig`）

---

### 2026-02-26（5）：提示按鈕樣式同 F3

**修改**：`css/f1-object-correspondence.css` 的 `.modern-hint-btn` 區塊改為與 F3 一致的樣式：

| 屬性 | 修改前 | 修改後（同 F3） |
|------|--------|----------------|
| 顏色 | 黃藍漸層 `#ffd89b→#19547b` | 綠色漸層 `#4CAF50→#45a049` |
| `border-radius` | `40px` | `25px` |
| `padding` | `12px 24px` | `12px 20px` |
| `box-shadow` | 黃色系 | 綠色系 |
| `transition` | `cubic-bezier(...)` | `ease` |
| hover | 縮放 + 橙紅漸層 | 上移 + 綠色反轉 |
| `hint-effect` | 放射狀漣漪 | 橫向光澤掃過 |
| `hint-icon` 動畫 | `hint-pulse 2.5s` | `pulse 2s` |
| `hint-text` | `font-family` + `letter-spacing` | `font-size: 14px; font-weight: 600` |

**修改檔案**：`css/f1-object-correspondence.css`

---

### 2026-02-26（補充）：`setDragImage` 觸控防護

**問題描述**：

`TouchDragUtility` 以 `TouchEvent` 觸發 `onDragStart` 回呼，`TouchEvent` 無 `dataTransfer` 屬性。F1 的 dragstart handler 直接呼叫 `event.dataTransfer.setDragImage()`，在觸控裝置上會拋出 TypeError。

**修改內容**：

- `js/f1_object_correspondence.js`：`handleDragStart` 中 `setDragImage` 呼叫包覆 `if (event.dataTransfer && typeof event.dataTransfer.setDragImage === 'function')` 防護（1 處，16-space indent，使用 `event` 變數名）

**修改檔案**：`js/f1_object_correspondence.js`

---

### 2026-02-26（補充）：`showNumberInput` 錯誤提示 raw setTimeout 補齊

**問題描述**：

全專案 raw `setTimeout` 審查中發現，`showNumberInput()` 數字鍵盤的輸入驗證錯誤提示（「最小值必須大於0」、「最大值不能超過30」）以 2000ms raw `setTimeout` 清空提示文字，未透過 `TimerManager` 管理。若切換畫面時 timer 仍在倒數，會嘗試操作已從 DOM 移除的 `feedbackDiv`（雖為 no-op 不崩潰，但屬於遺漏）。

**修改內容**：

- `showNumberInput()` 中兩處 `setTimeout(() => { feedbackDiv.textContent = ''; }, 2000)` 改為 `Game.TimerManager.setTimeout(() => { feedbackDiv.textContent = ''; }, 2000, 'ui')`（共 2 處，以 `replace_all` 批次替換）

**修改檔案**：`js/f1_object_correspondence.js`

---

### 2026-02-26（補充）：測驗頁面放置語音「已放置」移除

**需求描述**：

放置圖示至對應框時會播放語音「已放置」，使用者希望移除語音、保留音效。

**修改內容**：

移除所有 `Speech.speak('correctPlacement', ...)` 呼叫，共 7 處：

| 位置 | 情境 |
|------|------|
| 普通/困難模式 drop handler（邏輯 B） | 拖至 placement-guide 放置成功 |
| `handleItemPlacement()` 困難模式段 | 困難模式放置到格子後 |
| 簡單模式 easy drop handler | 簡單模式正確放置後 |
| placement-guide zone 放置 ×3 | placement-guide / placement-zone / target-grid-item 三種容器 |
| touch drop handler `if (speechFeedback)` 整塊 | 觸控放置後語音條件判斷（整個 if 區塊移除） |

`Audio.playSound('correct', ...)` 音效呼叫全部保留。

**修改檔案**：`js/f1_object_correspondence.js`

---

*報告更新時間：2026-02-26*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

## 2026-02-27：Raw setTimeout + endGame 守衛修復（第三輪）

### 1. endGame() 重複呼叫防護

**問題**：語音非同步回呼可能在場景切換後重新觸發 `endGame()`，導致完成畫面重複渲染。

**修復**：
- `resetGameState()` 加入 `this.state.isEndingGame = false`
- `endGame()` 開頭加入守衛：
  ```javascript
  if (this.state.isEndingGame) { Game.Debug.log('flow', '阻止重複遊戲結束'); return; }
  this.state.isEndingGame = true;
  ```

### 2. Raw setTimeout 修復（共 14 處）

| # | 位置 | 類別 |
|---|------|------|
| 1 | `speech.init()` 語音初始化重試 500ms | `'speech'` |
| 2 | `speech.init()` 延遲初始化 1000ms | `'speech'` |
| 3 | `Audio` 安全逾時 safeCallback 10000ms | `'audio'` |
| 4 | `speak()` 音訊未解鎖路徑 100ms | `'ui'` |
| 5 | `speak()` shouldSpeak=false 路徑 100ms | `'ui'` |
| 6 | `speak()` 無語音物件路徑 100ms | `'ui'` |
| 7 | `speak()` 無模板路徑 100ms | `'ui'` |
| 8 | `speak()` 語音逾時 5000ms | `'speech'` |
| 9 | 完成畫面第二波煙火 200ms | `'ui'` |
| 10 | 粒子清除動畫 1000ms | `'animation'` |
| 11 | nameInput focus 100ms | `'ui'` |
| 12 | 主題切換過渡 300ms | `'animation'` |
| 13 | 拖曳 ghost 清除 0ms | `'dragSystem'` |
| 14 | 拖曳樣式套用 0ms | `'dragSystem'` |
| 15 | Drop zone DOM 復原（2 處）0ms | `'dragSystem'` |
| 16 | Drop zone 填入完成 0ms | `'dragSystem'` |

所有 `setTimeout` 均改為 `Game.TimerManager.setTimeout(callback, delay, category)`。

**注意**：`await new Promise(resolve => setTimeout(resolve, N))` 在 async 動畫函數內部，
屬合理用法，不納入管理範圍（已確認不影響場景切換）。

**修改檔案**：`js/f1_object_correspondence.js`

---

### 2026-02-27：簡單模式示範動畫 raw setTimeout 修復

**問題**：`playDemoAnimation()` 中同步 CSS 動畫（`animationDuration = 1000`ms）使用裸 `setTimeout(() => {...}, animationDuration)` 等待動畫完成後播放音效，不受 `TimerManager.clearAll()` 管理。

**修復**：改為 `Game.TimerManager.setTimeout(() => {...}, animationDuration, 'animation')`，確保場景切換時動畫等待計時器可被清除。

**修改檔案**：`js/f1_object_correspondence.js`

---

*報告更新時間：2026-02-27*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

## 2026-02-27（第五輪）：speak() safeCallback scope 修復

**問題**：`Speech.speak()` 函數中，`callbackExecuted` 和 `safeCallback` 宣告在 `if (callback) { }` 內部（`let`/`const` block scope）。catch 區塊位於 `if` 外，無法存取 `safeCallback`，因此 catch 使用 `if (callback) callback()` 直接呼叫。若 catch 觸發時 5 秒 TimerManager 備援計時器已啟動，catch 先執行 callback()，5 秒後備援計時器再執行 safeCallback()（此時 `callbackExecuted` 仍為 `false`），造成雙重呼叫。

**修復**：將 `callbackExecuted` 和 `safeCallback` 移至 `if (callback) { }` 外部，讓 catch 也可存取：
- `safeCallback` 改為 `if (!callbackExecuted && callback)` 判斷（兼容 callback 為 null 的情況）
- catch 區塊改為 `safeCallback()`

**修改檔案**：`js/f1_object_correspondence.js`

---

*報告更新時間：2026-02-27*
*報告產生者：Claude Code (claude-sonnet-4-6)*

### 2026-02-28
- `showResults()` 中 `elapsedMs = endTime - this.state.startTime` 改為 `this.state.startTime ? (endTime - this.state.startTime) : 0`，防止 startTime 未設定時顯示 NaN 時間

---

## 廢棄程式碼稽核（2026-03-01）

**稽核範圍**：`js/f1_object_correspondence.js`（7,165 行，2026-03-09 刪除 76 行死碼後）

### 結論：無需處理

| 類型 | 位置 | 內容 | 評估 |
|------|------|------|------|
| 向後相容 shim | Lines 104–126 | `logAudio()`、`logSpeech()`、`logConfig()` 等 7 個方法，映射至 FLAGS 系統，標有 `/* 已禁用 */` | 刻意保留的相容層，非廢棄 |
| console.log | Lines 89, 95, 101 | Debug.log() 內部呼叫 | 已受 FLAGS 守衛，無需處理 |
| **`alert()` 呼叫（自訂圖片上傳驗證）** | Lines 5726, 5759, 5770, 5817, 5822, 5829 | 共 6 處，用於自訂 emoji/圖片上傳驗證（格式/大小限制、名稱輸入）；同步阻塞彈窗 | 低 | 功能正常；若需提升 UX 可改為非阻塞式提示 |
| **原生 setTimeout（async sleep，動畫）** | Lines 3231, 3300, 3302 | `await new Promise(resolve => setTimeout(resolve, N))` — 非同步動畫函數中的延遲模式 | 低（刻意保留） | 同 C4/F4/F5/F6 的 async sleep 模式，語義上不適合轉為 TimerManager |

**整體評估**：程式碼品質良好。`alert()` 僅用於設定驗證，async sleep 為刻意設計，均不影響遊戲流程。

---

## 跨輪計時器洩漏稽核（2026-03-03）

**稽核背景**：A3 單元曾發現 `speakText()` 10 秒備援計時器在下一輪觸發導致跳輪的 Bug，已對全系列交叉稽核。

**F1 稽核結論：安全（無此問題）**

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

## validateDrop 重複定義清除（2026-03-09）

**問題**：`HTML5DragSystem` 物件字面量中有兩個 `validateDrop` 方法定義（JavaScript 規範：後者靜默覆蓋前者）。第一個（舊版，約 76 行）含 `placement-guide` 的舊判斷邏輯、Dead Debug logging，從未被執行；第二個（新版）才是實際執行版本，已含困難模式取代放置所需的 `difficulty` 宣告與條件。此問題先前在 `2026-02-26（3）` 修復記錄中有描述，但當時僅將邏輯補入第二個定義，未刪除第一個死碼。

**症狀（潛在）**：任何試圖在第一個定義（dead code）上增加邏輯的修改均無效，曾導致「困難模式 `difficulty is not defined`」ReferenceError（此修復前的記錄）。

**修復**：以 Python 行索引方式刪除第一個 `validateDrop` 定義（共 76 行，含上方注解標頭），保留第二個（實際執行版本）。修復後 `HTML5DragSystem` 內僅剩一個 `validateDrop`。

**修改**：`js/f1_object_correspondence.js`（2026-03-09，Python line splice，行數從 7241 → 7165）

**搜尋關鍵字**：`validateDrop` in `js/f1_object_correspondence.js`（現只有一處定義）

---

## 修復記錄（2026-03-10）— 設定頁自訂主題按鈕樣式同步 F2

**問題**：F1 設定頁面自訂主題區的「📸 上傳圖片」按鈕使用純綠色（`#4caf50`）；「❌」刪除按鈕尺寸過大（`font-size:16px; padding:5px 10px`）。兩者樣式與 F2 設計不一致。

**根因**：上傳/刪除按鈕的 CSS 原本在 `generateBaseCSS`（遊戲畫面 CSS），設定頁面渲染時此 CSS 未生效；設定頁 `HTMLTemplates.settingsScreen` 的 `<style>` 區塊只含 modal 按鈕樣式，缺少上傳/刪除按鈕的定義。

**修復**：
1. `HTMLTemplates.settingsScreen` `<style>` 區塊新增 `.upload-btn`（暖色漸層 `linear-gradient(45deg, #FF6B6B, #4ECDC4)`，`font-weight:bold`，hover 效果）與 `.remove-btn`（`background:#ff4444`，`font-size:12px`，`padding:4px 8px`，hover 效果），確保設定頁面首次載入即正確顯示。
2. `generateBaseCSS` 的 `.upload-btn` 同步從 `#4caf50` 改為相同漸層，`.remove-btn` 尺寸從 `font-size:16px; padding:5px 10px` 改為 `font-size:12px; padding:4px 8px`，保持遊戲畫面一致性。

**修改**：`js/f1_object_correspondence.js`（`HTMLTemplates.settingsScreen` 新增 upload/remove CSS；`generateBaseCSS` 更新 upload/remove CSS）

**搜尋關鍵字**：`linear-gradient(45deg, #FF6B6B, #4ECDC4)` in `js/f1_object_correspondence.js`

---

## 修復：assist-click-hint 方框+點這裡提示；getItemName 擴展（2026-03-14）

### 問題一：輔助點擊模式無視覺提示

`assist-click-hint` class 有程式碼設置，但完全沒有 CSS 定義，學生看不到任何高亮或「點這裡」提示。

### 修復

`injectGlobalAnimationStyles()` 末尾加入：

```css
@keyframes f1AssistBoxPulse { 邊框顏色 + outline-offset + 陰影脈動 }
@keyframes f1AssistBounce   { translateY 上下彈跳 }

.assist-click-hint {
    outline: 4px solid #FFC107; outline-offset: 4px;
    box-shadow: 0 0 25px rgba(255,193,7,0.8);
    animation: f1AssistBoxPulse 1.5s infinite;
}
.assist-click-hint::before { 黃色邊框方框，top/left/right/bottom: -10px }
.assist-click-hint::after  { '👇 點這裡' 氣泡，top: -48px，bounceHint 動畫 }
```

搜尋：`f1AssistBoxPulse`、`assist-click-hint`（`injectGlobalAnimationStyles`）

### 問題二：getItemName 回傳「物件」

`getItemName` 只定義 15 個圖示（且包含兩個不屬於任何主題的 🚓警車、🚑救護車），`EmojiLibrary` 三個主題合計 40 個圖示，未涵蓋的圖示（如 🚙）回傳 fallback `'物件'`，語音播「我們需要物件」。

### 修復

`getItemName` 擴展為完整 40 項：

| 分類 | 圖示 |
|------|------|
| 水果（14）| 🍎🍊🍋🍌🍉🍇🍓🍑🍒🥝🍈🍐🥭🍍 |
| 動物（14）| 🐶🐱🐭🐹🐰🦊🐻🐼🐨🐯🦁🐮🐷🐸 |
| 交通（12）| 🚗🚕🚙🚌🚎🚄🚅🚆🚇🚂✈️🚢 |

Fallback 從 `'物件'` 改為 `icon`（直接播 emoji，不說物件）。

搜尋：`getItemName`（`js/f1_object_correspondence.js`）

---
