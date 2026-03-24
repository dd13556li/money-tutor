# F3 數字認讀單元 — 完成經驗報告書

> **建立日期**：2026-02-07（原始）
> **更新日期**：2026-03-09（設定頁連結按鈕文字修復、觸控放置元素修復、自訂主題上傳修復）
> **專案名稱**：Money Tutor 金錢教學系統
> **單元編號**：F3 — 數字認讀（Number Recognition）
> **報告類型**：單元完成經驗與開發建議

---

## 一、檔案規模總覽

| 檔案 | 路徑 | 行數 | 大小 |
|------|------|------|------|
| JS 核心邏輯 | `js/f3_number_recognition.js` | 4,636 行 | ~213 KB |
| HTML 頁面 | `html/f3_number_recognition.html` | ~41 行（CSS 已外部化） | ~2 KB |
| CSS 專用樣式 | `css/f3-number-recognition.css` | ~550 行 | ~18 KB |
| 作業單產生器 | `worksheet/units/f3-worksheet.js` | 116 行 | ~4 KB |
| **合計** | — | **~5,343 行** | ~237 KB |

### CSS 依賴

| 檔案 | 說明 |
|------|------|
| `css/ai-theme.css` | 共用主題樣式 |
| `css/unit6.css` | 共用單元樣式 |
| `css/f3-number-recognition.css` | **F3 專用樣式（原 HTML 內嵌 + JS `gameStyles()` 函數 + 模板 `<style>` 外部化）** |
| `css/common-modal-responsive.css` | 共用彈窗響應式樣式 |

### JS 依賴

| 依賴 | 來源 | 用途 |
|------|------|------|
| `confetti.browser.min.js` | 本地（v1.9.2） | 煙火慶祝動畫 |
| `audio-unlocker.js` | 本地 | 行動裝置音訊解鎖 |
| `theme-system.js` | 本地 | 深色/淺色主題切換 |
| `touch-drag-utility.js` | 本地（v2.1） | 觸控拖曳跨平台支援 |
| `reward-launcher.js` | 本地 | 獎勵系統啟動器 |
| `number-speech-utils.js` | 本地 | 數字語音轉換 |
| `mobile-debug-panel.js` | 本地 | 行動裝置除錯面板 |

### F 系列規模比較

| 項目 | F1 一對一對應 | F2 唱數 | F3 數字認讀 | F4 數字排序 | F5 量比較 | F6 數的組成 |
|------|-------------|---------|------------|------------|----------|------------|
| JS 行數 | **7,468** | — | **4,636** | — | — | — |
| 作業單行數 | **135** | — | **116** | — | — | — |
| 難度模式 | **3 種** | — | **3 種** | — | — | — |
| 互動方式 | **拖曳+點擊** | — | **拖曳（點擊已關閉）** | — | — | — |

---

## 二、單元特色

### 2.1 組態驅動架構（ModeConfig）

F3 與 F1 一樣採用配置驅動設計，將三種難度的所有差異集中於 `ModeConfig` 物件：

```javascript
ModeConfig[difficulty] = {
    modeLabel,             // 模式分類
    turnTypes,             // 題型陣列
    speechTemplates,       // 語音模板
    timing,                // 延遲時間設定
    uiElements,            // UI 元素顯示/隱藏
    clickToMoveConfig,     // 點擊放置模式設定（已關閉）
    touchDragConfig,       // 觸控拖曳設定
    audioFeedback,         // 音效開關
    speechFeedback,        // 語音開關
    countingVoice          // 自動計數語音開關
}
```

**優點**：
- 新增難度只需擴充組態，不需修改遊戲邏輯
- 行為差異一目了然，便於維護和除錯
- 可透過組態快速調整教學參數

### 2.2 三種難度模式

| 模式 | 類型 | 放置方式 | 特點 |
|------|------|---------|------|
| 簡單 | 固定插槽 | `.placement-slot` | 有計數顯示、自動計數語音、自動完成判定 |
| 普通 | 自由區域 | `.normal-placement` | 有計數語音、需手動確認、有提示按鈕 |
| 困難 | 自由區域 | `.hard-placement` | 無計數語音、需手動確認、有提示按鈕 |

### 2.3 主題系統

內建三種主題，每種包含 10 個 emoji：

- **水果**：🍎🍊🍋🍇🍉🍓🍑🍒🍌🥝
- **動物**：🐶🐱🐰🐻🐼🐨🐯🦁🐮🐷
- **交通工具**：🚗🚌🚎🚑🚒🏎️🚂🚁✈️🚀

支援**自訂主題**：使用者可上傳圖片（壓縮至 200px、70% 品質，最多 8 個）。

### 2.4 Debug 系統

F3 有完整的 `Debug` 物件，統一管理日誌輸出：

| 方法 | 用途 | 狀態 |
|------|------|------|
| `logGameFlow()` | 遊戲流程追蹤 | ✅ 啟用 |
| `logSpeech()` | 語音播放 | ✅ 啟用 |
| `logUserAction()` | 用戶行為追蹤 | ✅ 啟用 |
| `logUI()` | UI 系統追蹤 | ✅ 啟用 |
| `logMobileDrag()` | 手機端拖曳除錯 | ✅ 啟用 |
| `logTouchEvent()` | 觸控事件詳細除錯 | ✅ 啟用 |
| `logDragState()` | 拖曳狀態追蹤 | ✅ 啟用 |
| `logPlacementDrop()` | 放置框檢測 | ✅ 啟用 |

### 2.5 統一完成畫面（C/F 系列標準）

F3 已採用 C/F 系列統一的測驗結束畫面樣式：
- 紫色漸層背景 (`linear-gradient(135deg, #667eea 0%, #764ba2 100%)`)
- 卡片出現動畫 (`fadeIn`, `celebrate`)
- 獎盃上下彈跳動畫 (`bounce`)
- 橙色表現徽章 + 發光動畫 (`glow`)
- 粉紅色獎勵系統按鈕
- 三個統計卡片（答對題數、正確率、完成時間）
- 綠色「再玩一次」按鈕、紫色「返回設定」按鈕
- `confetti` 煙火動畫（v1.9.2 本地化）

### 2.6 作業單系統

| 項目 | 說明 |
|------|------|
| 行數 | 116 行 |
| 題型 | 圈出正確數量 |
| 數字範圍 | 1-5、1-10、5-15、10-20、自訂 |
| 主題選擇 | 水果、動物、交通工具、混合 |
| 測驗題型 | 一般、虛線提示 |
| 答案卷 | 正確數量圖示加紅色邊框 |

**工具列配置**：
```javascript
toolbarConfig: {
    adjustCountButton: { label: '🔢 數字範圍', type: 'dropdown', ... },
    fontButton: { label: '🎨 主題選擇', type: 'dropdown', ... },
    orientationButton: null,
    extraButtons: [{ label: '📝 測驗題型', type: 'cycle', ... }]
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

| 模板 | 觸發時機 |
|------|---------|
| `initialInstruction` | 每題開始時的指導語 |
| `correct` | 答對時 |
| `incorrect` | 答錯時 |
| `incorrectWithAnswer` | 答錯時（單次模式） |
| `gameComplete` | 完成遊戲時 |
| `addCustomItem` | 新增自訂圖示時 |
| `removeCustomItem` | 移除圖示時 |

### 3.3 NumberSpeechUtils 整合

F3 使用 `convertToPureNumberSpeech()` 進行數字語音轉換（F 系列專用）。所有數字中的「2」一律唸為「貳」：

| 數字 | 語音 |
|------|------|
| 2 | 貳 |
| 12 | 拾貳 |
| 20 | 貳拾 |
| 22 | 貳拾貳 |

### 3.4 計數語音

簡單與普通模式啟用 `countingVoice`，每次放置圖示時自動唸出當前數量。困難模式關閉此功能，要求學生自行計數。

### 3.5 音效系統

| 音效 | 檔案 | 觸發時機 |
|------|------|---------|
| 選取音 | `select.mp3` | 點擊選取物品 |
| 正確音 | `correct.mp3` | 正確放置 |
| 完成音 | `correct02.mp3` | 完成一題 |
| 錯誤音 | `error.mp3` | 答錯 |
| 成功音 | `success.mp3` | 完成所有題目 |
| 點擊音 | `click.mp3` | 一般點擊/選單互動 |

---

## 四、觸控與桌面支援

### 4.1 雙軌拖放系統

F3 的拖放同時支援兩種機制：

1. **桌面端**：HTML5 Drag and Drop API（dragstart、dragend、dragover、drop 等原生事件）
2. **行動端**：`TouchDragUtility`（touchstart、touchmove、touchend 轉換為拖放操作）

`HTML5DragSystem.setupTouchDragSupport(difficulty)` 負責向 `TouchDragUtility` 註冊可拖曳選擇器與放置區域。

### 4.2 點擊放置功能（已關閉）

為避免與拖曳衝突，F3 在所有難度的 `clickToMoveConfig` 中設定：
```javascript
clickToMoveConfig: {
    enabled: false,
    allowClickToPlace: false,
    allowClickToReturn: false,
    // ...
}
```

這與 F1 支援雙重互動（拖曳+點擊）不同。

### 4.3 觸控反饋

- 拖曳複製品：`scale(1.1)`、`opacity(0.8)`
- 拖曳時原物件：`opacity(0.5)`
- 放置區懸停效果

### 4.4 防止下拉重新整理

HTML 設定 `overscroll-behavior-y: contain`（html、body、#app 三層防護），防止行動裝置在拖曳操作時意外觸發頁面下拉重新整理。

### 4.5 F3 vs F1 觸控支援比較

| 項目 | F3 數字認讀 | F1 一對一對應 |
|------|------------|-------------|
| 音效解鎖 | `audio-unlocker.js` | `audio-unlocker.js` |
| 除錯面板 | `mobile-debug-panel.js` | `mobile-debug-panel.js` |
| 主題系統 | `theme-system.js` | `theme-system.js` |
| 拖曳工具 | `touch-drag-utility.js` | `touch-drag-utility.js` |
| 互動方式 | **僅拖曳** | 拖曳+點擊 |
| TimerManager | ✅ 有（2026-02-12 新增） | ✅ 有 |
| EventManager | ✅ 有（2026-02-12 新增） | ✅ 有 |
| 全局動畫注入 | ✅ 有（2026-02-12 新增） | ✅ 有 |

---

## 五、版面配置

### 5.1 遊戲版面結構

```
┌─────────────────────────────────────────┐
│ 標題列                                   │
│ [進度: 第 1/10 題]     [🎁 獎勵] [返回設定] │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────┐                        │
│  │ 題目區       │  目標數字（大字）        │
│  └─────────────┘                        │
│                                         │
│  ┌─────────────┐  ┌─────────────────┐   │
│  │ 來源區       │  │ 放置區            │   │
│  │ Source Area │  │ Placement Area  │   │
│  └─────────────┘  └─────────────────┘   │
│                                         │
│  [完成] [提示] (普通/困難模式)              │
│                                         │
└─────────────────────────────────────────┘
```

### 5.2 三種模式版面差異

| 模式 | 版面特點 | 放置區 CSS 類別 |
|------|---------|----------------|
| 簡單 | 固定數量的小格子 | `.placement-slot` |
| 普通 | 自由擺放區域 | `.placement-area.normal-placement` |
| 困難 | 自由擺放區域 | `.placement-area.hard-placement` |

---

## 六、動畫系統

### 6.1 @keyframes 動畫總覽

| 來源 | 數量 | 重複定義 |
|------|------|---------|
| JS 內嵌 | 8 處定義 | **有重複** |
| HTML 內嵌 | 0 處 | — |

### 6.2 JS 內嵌動畫列表

| # | 動畫名稱 | 行號 | 用途 | 重複定義 |
|---|----------|------|------|---------|
| 1 | `pulse` | 1016, 1294 | 脈衝 | **2 處** |
| 2 | `bounce` | 1017, 3356 | 上下彈跳 | **2 處** |
| 3 | `hintMarkerAppear` | 1300 | 提示標記出現 | 1 處 |
| 4 | `fadeIn` | 3345 | 淡入 | 1 處 |
| 5 | `celebrate` | 3350 | 慶祝 | 1 處 |
| 6 | `glow` | 3362 | 發光 | 1 處 |

**重複定義統計**：`pulse`(2)、`bounce`(2)

### 6.3 Canvas-Confetti 煙火效果

| 項目 | 說明 |
|------|------|
| 版本 | **v1.9.2**（本地化，與其他單元一致） |
| 觸發時機 | 完成挑戰時（`endGame()` + `startFireworksAnimation()`） |
| 觸發方式 | 兩波煙火（間隔 200ms） |
| 第一波 | particleCount: 150, spread: 70 |
| 第二波 | particleCount: 100, spread: 60 |

---

## 七、Bug 檢測與已知問題

### 7.1 已確認的程式碼問題

| # | 嚴重度 | 問題描述 | 數據 | 狀態 |
|---|--------|---------|------|------|
| 1 | **高** | `setTimeout` 未清理 | **24 個** setTimeout → 引入 TimerManager | ✅ **已修復 (2026-02-12)** |
| 2 | **高** | `addEventListener` 可能未完全移除 | **19 個** → 引入 EventManager | ✅ **已修復 (2026-02-12)** |
| 3 | **中** | `!important` 過多 | JS 83 個 + HTML 1 個 = **84 個** | ⚠️ 待改善 |
| 4 | **中** | JS @keyframes 重複定義 | `pulse`(2次)、`bounce`(2次) → 全局注入 | ✅ **已修復 (2026-02-12)** |
| 5 | ~~**中**~~ | ~~`console.log` 過多~~ | ~~90+ 個~~ **✅ 已修復 (2026-02-21)**：Debug Logger FLAGS 系統重構，184 個 Debug 呼叫統一管理 |
| 6 | **建議** | 無 Loading 畫面 | 建議參考 A6 新增 | ⚠️ 待新增 |
| 7 | **建議** | 無 Error Boundary | 建議參考 A6 新增 | ⚠️ 待新增 |
| 8 | **建議** | 無 Skip Link | 建議參考 A6 新增（無障礙功能） | ⚠️ 待新增 |
| 9 | **低** | 設定頁/上傳流程使用 `alert()`/`confirm()` 阻塞式對話框（9 處，搜尋 `alert(`） | ⚠️ 暫緩（低優先） |

### 7.2 F3 vs F1 Bug 數量比較

| 問題類型 | F3 數字認讀 | F1 一對一對應 | 評價 |
|---------|------------|-------------|------|
| console.log | **90+** | 6 | ⚠️ F3 需清理 |
| 未清理 setTimeout | 0（TimerManager，已修復） | 0（TimerManager） | ✅ 已達標 |
| 未移除 addEventListener | 0（EventManager，已修復） | 0（EventManager） | ✅ 已達標 |
| !important 總數 | **84** | 196 | ✅ F3 較少 |
| 動畫重複定義 | 0（全局注入，已修復） | 0（全局注入） | ✅ 已達標 |
| JS 行數 | **~4,750** | 7,468 | ✅ F3 較精簡 |

### 7.3 正面發現

| 項目 | 說明 |
|------|------|
| Debug 系統 | 完整的 `Debug` 物件統一管理日誌 |
| confetti 版本 | 使用 v1.9.2（本地化），版本一致 |
| 完成畫面 | 已採用 C/F 系列統一樣式 |
| startTime 記錄 | 已正確記錄遊戲開始時間 |
| 組態驅動架構 | ModeConfig 設計良好 |
| 拖曳系統清理 | `HTML5DragSystem.cleanup()` 有呼叫 `TouchDragUtility.cleanupAll()` |

### 7.4 記憶體洩漏風險分析（已修復）

**問題根源**（已修復）：
- ✅ F3 有 `HTML5DragSystem.cleanup()` 會呼叫 `TouchDragUtility.cleanupAll()`
- ✅ 已引入 `TimerManager` 統一管理計時器
- ✅ 已引入 `EventManager` 統一管理事件監聽器

**修復後的清理流程**：
1. `init()` → `TimerManager.clearAll()` + `EventManager.removeAll()`
2. `showSettings()` → `TimerManager.clearAll()` + `EventManager.removeByCategory('gameUI')`
3. `endGame()` → `TimerManager.clearByCategory('turnTransition')`
4. `HTML5DragSystem.cleanup()` → `EventManager.removeByCategory('dragSystem')` + `TimerManager.clearByCategory('animation')`

### 7.5 非 Bug 但需注意的設計

| 項目 | 說明 |
|------|------|
| 點擊放置已關閉 | 為避免衝突，`clickToMoveConfig.enabled = false`，與 F1 支援雙模式不同 |
| 圖片壓縮 | 自訂圖片壓縮至 200px，作為教學用途品質足夠但可能模糊 |
| 無 localStorage 持久化 | 遊戲進度不儲存，重新整理頁面會遺失 |
| 大量除錯日誌 | 90+ 個 console.log 在生產環境應關閉或移除 |

### 7.6 狀態管理現況

| 項目 | 狀態 |
|------|------|
| 統一重置函數 | ✅ `resetGameState()` |
| 布林旗標 | `isAnswering` |
| 重置位置 | 統一（2 處） |
| 評價 | ✅ **最佳實踐** |

**重構完成**（2026-02-17）：已實現統一的 `resetGameState()` 函數

**重置項目**：
- 核心狀態：`score`, `currentTurn`, `correctAnswer`, `lastAnswer`, `currentTurnType`, `selectedItems`, `isAnswering`, `startTime`
- 點擊/拖曳狀態：`selectedClickItem`, `draggedElement`, `lastClickTime`, `lastClickedElement`, `clickCount`

**調用位置**：
| 位置 | 調用條件 | 說明 |
|------|---------|------|
| `showSettings()` | 無條件 | 返回設定時重置狀態 |
| `startGame()` | 無條件 | 開始遊戲前重置狀態 |

**搜尋關鍵字**：`resetGameState`

---

## 八、未來開發建議

### 8.1 引入 TimerManager（優先）

**問題**：24 個 setTimeout 無對應清理機制。

**建議**：參考 F1 引入 `TimerManager`

```javascript
Game.TimerManager = {
    timers: {},
    setTimeout(callback, delay, category = 'default') {
        const id = window.setTimeout(callback, delay);
        if (!this.timers[category]) this.timers[category] = [];
        this.timers[category].push(id);
        return id;
    },
    clearByCategory(category) {
        if (this.timers[category]) {
            this.timers[category].forEach(id => window.clearTimeout(id));
            this.timers[category] = [];
        }
    },
    clearAll() {
        Object.keys(this.timers).forEach(cat => this.clearByCategory(cat));
    }
};
```

**整合位置**：
- `init()` → `TimerManager.clearAll()`
- `showSettings()` → `TimerManager.clearAll()`
- `endGame()` → `TimerManager.clearByCategory('turnTransition')`

### 8.2 引入 EventManager

**問題**：19 個 addEventListener 可能未完全移除。

**建議**：參考 F1 引入 `EventManager`

```javascript
Game.EventManager = {
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
        this.listeners.forEach(l => l.element.removeEventListener(l.event, l.handler, l.options));
        this.listeners = [];
    }
};
```

### 8.3 CSS 動畫統一管理

**問題**：`pulse` 和 `bounce` 各有 2 處重複定義。

**建議**：參考 F1 新增 `injectGlobalAnimationStyles()` 方法

```javascript
injectGlobalAnimationStyles() {
    if (document.getElementById('f3-global-animations')) return;
    const style = document.createElement('style');
    style.id = 'f3-global-animations';
    style.textContent = `
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        @keyframes bounce { 0%, 20%, 60%, 100% { transform: translateY(0); } 40% { transform: translateY(-20px); } 80% { transform: translateY(-10px); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes celebrate { 0% { transform: scale(0.8) rotate(-10deg); opacity: 0; } 50% { transform: scale(1.1) rotate(5deg); opacity: 1; } 100% { transform: scale(1) rotate(0deg); opacity: 1; } }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(52, 152, 219, 0.4); } 50% { box-shadow: 0 0 30px rgba(52, 152, 219, 0.8); } }
        @keyframes hintMarkerAppear { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    `;
    document.head.appendChild(style);
}
```

在 `init()` 中呼叫此方法，並刪除 JS 中的重複定義。

### 8.4 清理 console.log

**問題**：90+ 個 console.log，大部分是除錯用途。

**建議**：
1. 保留 Debug 系統內的 console.log（透過 `Debug.enabled` 控制）
2. 移除獨立的 console.log 除錯語句（約 50+ 個）
3. 生產環境設定 `Debug.enabled = false`

**可清理的除錯日誌範例**：
- `🚨 [雙擊除錯]` 系列
- `🔧 [雙擊除錯]` 系列
- `🎯 [精確放置]` 系列
- `🔊 [放置語音]` 系列
- `F3 Range Input/Validation` 系列

### 8.5 新增無障礙功能

**建議參考 A6 新增**：
- Loading 畫面（旋轉動畫 + 「載入中...」）
- Error Boundary（全域錯誤處理 + 重新載入按鈕）
- Skip Link（跳過導航連結）
- NoScript 提示

### 8.6 作業單與遊戲主題共用

**問題**：作業單的 `_themes` 與遊戲的 `gameData.themes` 各自獨立維護，新增主題需同步修改兩處。

**建議**：建立共用資料檔案

```javascript
// 建議：shared/emoji-themes.js
const EmojiThemes = {
    fruits: ['🍎','🍊','🍋','🍇','🍉','🍓','🍑','🍒','🍌','🥝'],
    animals: ['🐶','🐱','🐰','🐻','🐼','🐨','🐯','🦁','🐮','🐷'],
    vehicles: ['🚗','🚌','🚎','🚑','🚒','🏎️','🚂','🚁','✈️','🚀']
};
```

---

## 九、總結

### F3 數字認讀的優勢

1. **組態驅動架構**：ModeConfig 設計良好，與 F1 架構一致
2. **Debug 系統**：統一管理日誌輸出，分類明確
3. **完成畫面統一**：已採用 C/F 系列標準樣式
4. **confetti 版本一致**：使用 v1.9.2 本地化版本
5. **拖曳系統清理**：有呼叫 `TouchDragUtility.cleanupAll()`
6. **程式碼較精簡**：4,636 行，約為 F1 的 62%
7. **作業單功能完整**：支援多種範圍、主題、題型

### F3 數字認讀的待改進處

1. ~~**24 個未清理 setTimeout**~~ → ✅ 已引入 TimerManager (2026-02-12)
2. ~~**19 個 addEventListener 可能殘留**~~ → ✅ 已引入 EventManager (2026-02-12)
3. ~~**2 個動畫重複定義**~~ → ✅ 已引入 injectGlobalAnimationStyles (2026-02-12)
4. **90+ 個 console.log** → ⚠️ 建議清理獨立除錯日誌
5. **無 Loading / Error Boundary / Skip Link** → ⚠️ 建議參考 A6 新增

### 核心數據

| 指標 | 數值 |
|------|------|
| 主程式行數 | **~4,750 行**（修復後） |
| setTimeout 數量 | 24 個 → ✅ 已納入 TimerManager 管理 |
| addEventListener 數量 | 19 個 → ✅ 已納入 EventManager 管理 |
| @keyframes 重複 | 0（✅ 已改為全局注入） |
| console.log | **90+ 個**（待清理） |
| !important | **84 個** |

| 指標 | 數值 |
|------|------|
| 難度模式 | 3 種 |
| 語音模板 | 6-7 個/難度 |
| 音效 | 6 個 |
| 外部依賴 | 7 個 JS（含本地 confetti） |
| 作業單題型 | 圈出正確數量（2 種變體） |
| 互動方式 | 僅拖曳 |
| 自訂主題 | 支援圖片上傳 |

### 與 F1 差距分析

| 項目 | F1 一對一對應 | F3 數字認讀 | 差距 |
|------|-------------|------------|------|
| TimerManager | ✅ 有 | ✅ 有（已補齊） | ✅ 已達標 |
| EventManager | ✅ 有 | ✅ 有（已補齊） | ✅ 已達標 |
| 全局動畫注入 | ✅ 有 | ✅ 有（已補齊） | ✅ 已達標 |
| console.log | 6 個 | 90+ 個 | **需清理** |
| 雙重互動模式 | ✅ 拖曳+點擊 | ❌ 僅拖曳 | 設計選擇 |

---

## 十、修復建議優先順序

| 優先級 | 項目 | 預估工作量 | 效益 | 狀態 |
|--------|------|-----------|------|------|
| **P0** | 引入 TimerManager | 中（約 50 行程式碼） | 防止記憶體洩漏 | ✅ **已完成** |
| **P0** | 引入 EventManager | 中（約 30 行程式碼） | 防止事件疊加 | ✅ **已完成** |
| **P1** | 全局動畫注入 | 小（約 20 行程式碼） | 消除重複定義 | ✅ **已完成** |
| **P1** | 清理 console.log | 中（移除 50+ 行） | 減少生產環境噪音 | ⚠️ 待處理 |
| **P2** | 新增無障礙功能 | 大（參考 A6） | 提升使用者體驗 | ⚠️ 待處理 |
| **P3** | 作業單主題共用 | 小 | 降低維護成本 | ⚠️ 待處理 |

---

## 十一、修復記錄

### 2026-02-12：P0/P1 Bug 修復

**修改檔案**：`js/f3_number_recognition.js`

**修改內容**：

#### 1. 新增 TimerManager（約第 143-180 行）
- 統一管理所有 `setTimeout` 計時器
- 支援分類清理（`turnTransition`、`animation`）
- 方法：`setTimeout()`、`clearTimeout()`、`clearAll()`、`clearByCategory()`

#### 2. 新增 EventManager（約第 183-210 行）
- 統一管理所有 `addEventListener` 事件監聽器
- 支援分類清理（`gameUI`、`dragSystem`）
- 方法：`on()`、`removeAll()`、`removeByCategory()`

#### 3. 新增 injectGlobalAnimationStyles()（約第 213-247 行）
- 集中定義所有 @keyframes 動畫
- 避免重複定義：`pulse`、`bounce`、`fadeIn`、`celebrate`、`glow`、`hintMarkerAppear`
- 透過 `document.getElementById('f3-global-animations')` 防止重複注入

#### 4. 修改 init()（約第 1475-1480 行）
- 新增：`TimerManager.clearAll()`
- 新增：`EventManager.removeAll()`
- 新增：`injectGlobalAnimationStyles()`

#### 5. 修改 showSettings()（約第 1488-1525 行）
- 新增：`TimerManager.clearAll()`
- 新增：`EventManager.removeByCategory('gameUI')`
- 替換：4 個 `addEventListener` → `EventManager.on(..., 'gameUI')`

#### 6. 修改 endGame()（約第 3341 行）
- 新增：`TimerManager.clearByCategory('turnTransition')`

#### 7. 修改 HTML5DragSystem.initialize()（約第 4105-4111 行）
- 替換：6 個 `addEventListener` → `EventManager.on(..., 'dragSystem')`

#### 8. 修改 HTML5DragSystem.setupSourceArea()（約第 4127-4129 行）
- 替換：2 個 `addEventListener` → `EventManager.on(..., 'dragSystem')`

#### 9. 修改 HTML5DragSystem.setupSingleDropZone()（約第 4170-4173 行）
- 替換：4 個 `addEventListener` → `EventManager.on(..., 'dragSystem')`

#### 10. 修改 HTML5DragSystem.cleanup()（約第 4708-4709 行）
- 新增：`EventManager.removeByCategory('dragSystem')`
- 新增：`TimerManager.clearByCategory('animation')`

#### 11. 替換關鍵 setTimeout 為 TimerManager.setTimeout
- 第 2110 行：初始化拖曳系統延遲（`animation`）
- 第 2170 行：題目渲染後重新註冊拖曳元素（`animation`）
- 第 2228 行：渲染新回合後刷新拖曳系統（`animation`）
- 第 2231 行：播放語音提示（`turnTransition`）
- 第 2277 行：普通模式語音提示（`turnTransition`）
- 第 2316 行：困難模式語音提示（`turnTransition`）
- 第 2977-2983 行：正確答案語音播放後進入下一題（`turnTransition`）
- 第 2995 行：答錯後清空放置區（`turnTransition`）
- 第 3030 行：單次模式答錯後進入下一題（`turnTransition`）
- 第 3067 行：清除錯誤狀態後刷新拖曳系統（`animation`）
- 第 3294 行：更新數字顯示動畫（`animation`）
- 第 3316 行：第二波煙火效果（`animation`）
- 第 4685 行：刷新後元素狀態檢查（`animation`）

#### 12. 刪除重複 @keyframes 定義
- 第 1123 行：移除 `pulse`、`bounce`（改為註釋說明）
- 第 1400 行：移除 `pulse`、`hintMarkerAppear`（改為註釋說明）
- 第 3444 行：移除 `fadeIn`、`celebrate`、`bounce`、`glow`（改為註釋說明）

#### 13. 修改遊戲畫面事件監聽器（約第 2114-2117 行）
- 替換：`addEventListener` → `EventManager.on(..., 'gameUI')`

#### 14. 修改結束畫面事件監聽器（約第 3667-3670 行）
- 替換：`addEventListener` → `EventManager.on(..., 'gameUI')`

**驗證方法**：
1. 開始遊戲 → 返回設定 → 再開始遊戲（確認無重複計時器）
2. Chrome DevTools → Elements → Event Listeners（確認事件監聽器正確移除）
3. 完成遊戲（確認動畫效果正常）
4. 簡單/普通/困難三種模式功能回歸測試

---

### 2026-02-16：系統性驗證

**驗證內容**：

| 項目 | 狀態 | 說明 |
|------|------|------|
| TimerManager | ✅ 正常 | 第 143-180 行，統一管理計時器 |
| EventManager | ✅ 正常 | 第 183-210 行，統一管理事件監聽器 |
| injectGlobalAnimationStyles | ✅ 正常 | 第 213-247 行，全局動畫注入 |
| endGame() | ✅ 正常 | 含 confetti 煙火、統一完成畫面樣式 |
| triggerConfetti() | ✅ 正常 | 雙波煙火效果 |
| startTime 記錄 | ✅ 正常 | 遊戲開始時記錄，完成畫面顯示用時 |

**結論**：F3 單元已達到 F 系列標準，無需進一步修改。

---

### 2026-02-17：狀態管理重構（resetGameState）

**問題**：
- 狀態重置邏輯分散於 4 個不同位置
- `score`、`currentTurn`、`isAnswering` 等多個狀態需要重置
- 不符合 C1/C2/C4/C5/C6/F1 等單元的最佳實踐

**修改內容**：

1. **新增 `resetGameState()` 函數**
   - 位置：`injectGlobalAnimationStyles()` 之後
   - 集中管理所有遊戲相關狀態的重置
   - 重置項目：
     - 核心狀態：`score`, `currentTurn`, `correctAnswer`, `lastAnswer`, `currentTurnType`, `selectedItems`, `isAnswering`, `startTime`
     - 點擊/拖曳狀態：`selectedClickItem`, `draggedElement`, `lastClickTime`, `lastClickedElement`, `clickCount`
   - 輸出日誌：`🔄 [F3] 遊戲狀態已重置`

2. **調用位置**
   | 位置 | 調用條件 | 說明 |
   |------|---------|------|
   | `showSettings()` | 無條件 | 返回設定時重置狀態 |
   | `startGame()` | 無條件 | 開始遊戲前重置狀態 |

**修改檔案**：
- `js/f3_number_recognition.js`

**驗證方式**：
1. 開啟 F3 數字認讀
2. 完成部分測驗後點擊「返回設定」
3. Console 應顯示「🔄 [F3] 遊戲狀態已重置」
4. 重新開始遊戲，確認題目從第 1 題開始、分數為 0、狀態清空

---

### 2026-02-21：Debug Logger 重構為 FLAGS 分類開關系統

**修改檔案**：`js/f3_number_recognition.js`

**修改內容**：
將舊版 `Debug` 系統（單一 `enabled` 開關 + 各種 `logXXX` 方法）重構為 FLAGS 分類開關系統。

**統計**：
- **轉換前**：96 個 console 調用
- **轉換後**：137 個 Game.Debug 調用
- **保留未轉換**：3 個（Debug 系統內部實現）

**FLAGS 分類（13 個）**：

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
        click: false,      // 點擊操作
        question: false,   // 題目生成
        state: false,      // 狀態變更
        game: false,       // 遊戲流程
        user: false,       // 使用者行為
        error: true        // 錯誤訊息（預設開啟）
    }
}
```

**使用方式**：

```javascript
// 在瀏覽器 Console 中開啟特定分類
Game.Debug.FLAGS.all = true;     // 開啟全部
Game.Debug.FLAGS.click = true;   // 只開啟點擊相關
Game.Debug.FLAGS.drag = true;    // 只開啟拖曳相關
```

**向後相容包裝方法**：

保留舊版 API 方法（如 `logGameFlow`, `logSpeech`, `logUI` 等），內部轉接至新的 `log(category, ...)` 方法。

**保留未轉換的調用（3 個）**：

- 行 89: `console.log(\`[F3-${category}]\`, ...args)` - Game.Debug.log 內部實現
- 行 95: `console.warn(\`[F3-${category}]\`, ...args)` - Game.Debug.warn 內部實現
- 行 101: `console.error('[F3-ERROR]', ...args)` - Game.Debug.error 內部實現

**搜尋關鍵字**：
- `Game.Debug.FLAGS`
- `Game.Debug.log`
- `Game.Debug.warn`
- `Game.Debug.error`

---

---

### 2026-02-23：動畫整合確認 + 嵌套物件修復（this.Debug → Game.Debug）

**修改檔案**：`js/f3_number_recognition.js`

#### 動畫整合確認

`injectGlobalAnimationStyles()` 已於 2026-02-12 實現，本次確認當前狀態：

| 項目 | 狀態 |
|------|------|
| `injectGlobalAnimationStyles()` | ✅ 已實現（`id="f3-global-animations"`，6 個 @keyframes） |
| `injectGlobalAnimationStyles()` 調用點 | ✅ `init()` 有呼叫 |
| 散落的 @keyframes | ✅ 已替換為注解（共 3 處：lines ~1169, ~1446, ~3490） |

**全局函數包含的動畫**（6 個）：
`pulse`、`bounce`、`fadeIn`、`celebrate`、`glow`、`hintMarkerAppear`

#### 嵌套物件修復

**問題描述**：
2026-02-21 Debug Logger 重構時，部分方法改用 `this.Debug.logXXX(...)` 呼叫包裝方法，但當這些方法被當作 DOM 事件回呼使用時，`this` 可能不指向 `Game`，導致 `this.Debug` 為 `undefined`。

**修改內容**：
使用 `replace_all` 將全部 47 個 `this.Debug.` 替換為 `Game.Debug.`

**影響函數列表**：

| 函數 | 修復數量 |
|------|---------|
| `init()` | 1 |
| `showSettings()` | 1 |
| `showSettings()` 自訂題數處理 | 2 |
| `handleSettingChange()` | 1 |
| `startGame()` | 1 |
| `startNewTurn()` | 3 |
| `handleItemClick()` / `handleClickToPlace()` / `handleClickToReturn()` / `handleSlotClick()` / `clearClickSelection()` | 16 |
| `checkAnswer()` | 3 |
| `showHint()` / `showVisualHint()` | 9 |
| `playCountingVoice()` | 1 |
| `endGame()` | 1 |
| `triggerImageUpload()` / `handleImageUpload()` / `showImagePreview()` / `confirmAddCustomItem()` / `removeCustomItem()` / `closeImagePreview()` | 9 |

**統計更新**：
- 修復前：137 個 Debug 調用（うち 90 × `Game.Debug.*` + 47 × `this.Debug.*`）
- 修復後：137 個 Debug 調用（137 × `Game.Debug.*` + 0 × `this.Debug.*`）

**驗證結果**：
- ✅ `grep "this\.Debug\."` → 0 個結果
- ✅ 全部 6 個 @keyframes 仍在 `injectGlobalAnimationStyles()` 內（lines 242-262）
- ✅ 散落處（3 個）均為注解，無實際 @keyframes

**搜尋關鍵字**：`Game.Debug.log`, `injectGlobalAnimationStyles`, `f3-global-animations`

---

### 2026-02-24（第二輪）：新發現 Bug 修復（Bug #8）

**問題 1（Bug #8）— resetGameState() 缺少 totalTurns 初始化（中）**：

- `resetGameState()` 未重置 `this.state.totalTurns`
- `startGame()` 呼叫 `resetGameState()` 後，`totalTurns` 可能保留舊值或為 undefined
- `setupGameUI()` 使用 `this.state.totalTurns` 顯示進度 → 顯示異常
- **修復**：在 `resetGameState()` 加入 `this.state.totalTurns = this.state.settings.questionCount || 10`

---

### 2026-02-24：作業單連結統一簡化（僅傳 unit 參數）

**修改內容**：

- 作業單連結原本傳遞遊戲設定參數（`difficulty`, `range`）
- 各作業單已有完整工具列，用戶開啟後可直接在工具列調整；遊戲設定與作業單設定應獨立運作
- **修復**：移除所有多餘參數，統一改為只傳 `unit` 參數，讓作業單完全使用自己的預設値

**修改檔案**：`js/f3_number_recognition.js`

---

---

### 2026-02-24：主題「預設」選項新增

**修改檔案**：`js/f3_number_recognition.js`

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
- `html/f3_number_recognition.html`（移除 12 行 inline `<style>`，新增 `<link>`）
- `css/f3-number-recognition.css`（新建，~550 行）
- `js/f3_number_recognition.js`（移除 `gameStyles()` 函數 + 3 個模板 `<style>` 區塊）

**Phase 1 — HTML inline 樣式外部化**：
- HTML 原有 12 行 `<style>` 區塊（`script { display:none }`、`overscroll-behavior-y`）
- 移至 `css/f3-number-recognition.css`
- HTML 新增 `<link rel="stylesheet" href="../css/f3-number-recognition.css">`

**Phase 2 — settingsScreen() 模板 `<style>` 外部化**：
- 移除 `settingsScreen()` 中的 `.image-preview-modal` Modal 樣式（~60 行）
- 移至 CSS 檔案

**Phase 3 — gameStyles() 函數整體移除（F3 特有）**：
- F3 有一個獨立的 `gameStyles(difficulty)` 函數，內容為純 `<style>` 區塊（~561 行），無動態插值
- 移除整個函數定義（~561 行）
- 移除呼叫點：`app.insertAdjacentHTML('beforeend', this.HTMLTemplates.gameStyles(...))`
- 所有 CSS 移至 CSS 檔案

**Phase 4 — endGame() 完成畫面 `<style>` 外部化**：
- 移除 `endGame()` 中 ~230 行結果畫面 `<style>` 區塊
- 移至 CSS 檔案

**驗證**：
- `grep '<style>'` → 0 個結果（JS 無任何 `<style>` 殘留）

**搜尋關鍵字**：`f3-number-recognition.css`

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
- `js/f3_number_recognition.js`（`handleDragStart` 加入 setDragImage ghost）
- `js/touch-drag-utility.js`（touchIdentifier 過濾，跨單元共用）

---

### 2026-02-26：`setDragImage` 觸控防護

**問題描述**：

`TouchDragUtility` 以 `TouchEvent` 觸發 `onDragStart` 回呼，`TouchEvent` 無 `dataTransfer` 屬性。F3 的 dragstart handler 直接呼叫 `event.dataTransfer.setDragImage()`，在觸控裝置上會拋出 TypeError。

**修改內容**：

- `js/f3_number_recognition.js`：`handleDragStart` 中 `setDragImage` 呼叫包覆 `if (event.dataTransfer && typeof event.dataTransfer.setDragImage === 'function')` 防護（1 處，使用 `event` 變數名）

**修改檔案**：`js/f3_number_recognition.js`

---

### 2026-02-26（補充）：`showNumberInput` 錯誤提示 raw setTimeout 補齊

**問題描述**：

同 F1/F2。`showNumberInput()` 數字鍵盤中「最小值必須大於0」與「最大值不能超過50」的 2000ms 錯誤提示清空使用 raw `setTimeout`，未透過 `TimerManager` 管理。

**修改內容**：

- 兩處 `setTimeout(() => { feedbackDiv.textContent = ''; }, 2000)` 改為 `Game.TimerManager.setTimeout(() => { feedbackDiv.textContent = ''; }, 2000, 'ui')`（共 2 處，以 `replace_all` 批次替換）

**修改檔案**：`js/f3_number_recognition.js`

---

---

### 2026-02-27：Speech.speak() 缺少 utterance.onerror 修復

**問題描述**：

`Speech.speak()` 只設置 `utterance.onend`，未設置 `utterance.onerror`。語音播放失敗時（瀏覽器不支援、被中斷等），`onend` 不觸發，callback 永遠不執行 → 遊戲流程卡住。

**修復方式**：

加入 `callbackExecuted` / `safeCallback` 雙重保護，並補上 `utterance.onerror` handler：
```javascript
if (callback) {
    let callbackExecuted = false;
    const safeCallback = () => {
        if (!callbackExecuted) { callbackExecuted = true; callback(); }
    };
    utterance.onend = safeCallback;
    utterance.onerror = (event) => {
        Game.Debug.log('speech', '🎙️ 語音播放錯誤:', event?.error);
        safeCallback();
    };
}
```

**修改檔案**：`js/f3_number_recognition.js`

---

*報告更新時間：2026-02-27*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

## 2026-02-27（第二輪）：Raw setTimeout 修復

**問題**：`js/f3_number_recognition.js` 的 `Audio.playSound()`、`Speech.speak()` 及拖曳系統
使用裸 `setTimeout`（共 8 處），無法被 `TimerManager.clearAll()` 清除。

| # | 位置 | 原始 | 修復後 |
|---|------|------|--------|
| 1 | `Audio.playSound()` 無 audioFeedback 路徑 | `setTimeout(callback, 100)` | `Game.TimerManager.setTimeout(callback, 100, 'audio')` |
| 2 | `Audio.playSound()` 無 soundId 路徑 | `setTimeout(callback, 100)` | `Game.TimerManager.setTimeout(callback, 100, 'audio')` |
| 3 | `Audio.playSound()` 播放後 callback | `setTimeout(callback, 300)` | `Game.TimerManager.setTimeout(callback, 300, 'audio')` |
| 4 | `Audio.playSound()` 無音效元素路徑 | `setTimeout(callback, 100)` | `Game.TimerManager.setTimeout(callback, 100, 'audio')` |
| 5 | `Speech.speak()` speechFeedback 關閉路徑 | `setTimeout(callback, 100)` | `Game.TimerManager.setTimeout(callback, 100, 'speech')` |
| 6 | `Speech.speak()` 無模板路徑 | `setTimeout(callback, 100)` | `Game.TimerManager.setTimeout(callback, 100, 'speech')` |
| 7 | `CustomItemsSettings` 驗證錯誤清除 3000ms | `setTimeout(() => {...}, 3000)` | `Game.TimerManager.setTimeout(..., 3000, 'ui')` |
| 8 | `handleDragStart()` 元素透明度設定 0ms | `setTimeout(() => element.style.opacity = '0.5', 0)` | `Game.TimerManager.setTimeout(..., 0, 'dragSystem')` |
| 9 | `handleDragStart()` ghost 清除 0ms | `setTimeout(() => _ghost.remove(), 0)` | `Game.TimerManager.setTimeout(..., 0, 'dragSystem')` |

**修改檔案**：`js/f3_number_recognition.js`

---

*報告更新時間：2026-02-27*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

## 2026-02-27（第四輪）：speak() safeCallback 備援超時修復

**問題**：`Speech.speak()` 的 `safeCallback` 區塊（行 597–614）僅依賴 `utterance.onend` 和 `utterance.onerror` 觸發 callback。若語音合成系統無聲失敗，callback 永遠不執行，導致遊戲流程卡住。

**修復**：在 `if (callback)` 區塊內加入：
```javascript
Game.TimerManager.setTimeout(safeCallback, 10000, 'speech');
```

**修改檔案**：`js/f3_number_recognition.js`

---

*報告更新時間：2026-02-27*
*報告產生者：Claude Code (claude-sonnet-4-6)*

### 2026-02-28
- `endGame()` 中 `elapsedMs = endTime - this.state.startTime` 改為 `this.state.startTime ? (endTime - this.state.startTime) : 0`，防止 startTime 未設定時顯示 NaN 時間
- `resetGameState()` 加 `isEndingGame = false`；`endGame()` 加 `isEndingGame` 守衛，防重複呼叫

---

## 廢棄程式碼稽核（2026-03-01）

**稽核範圍**：`js/f3_number_recognition.js`（3,948 行）

### 結論：僅有注解標記，無實際廢棄程式碼

| 類型 | 位置 | 內容 | 評估 |
|------|------|------|------|
| 廢棄標記注解 | Lines 2523–2525 | `// [已廢棄] 舊的拖曳系統已移至HTML5DragSystem`<br>`// [已廢棄] 所有舊的拖曳處理器已移至HTML5DragSystem` | 純注解標記，記錄重構歷史，無實際程式碼殘留 |
| 廢棄標記注解 | Line 3129 | `// [已廢棄] 舊的TouchDragUtility方法已移至HTML5DragSystem` | 同上，純文件注解 |
| 清理操作注解 | Line 2477 | `el.classList.remove('used'); // 移除舊的used類別（如果有的話）` | 操作性注解，刻意保留 |
| console.log | Lines 89, 95, 101 | Debug 系統內部呼叫 | 已受 FLAGS 守衛，無需處理 |
| **`alert()` 呼叫（輸入驗證）** | Lines 1009, 1036, 2968, 2994, 3007, 3045, 3051, 3058 | 共 8 處，用於數字範圍輸入驗證及自訂圖片上傳驗證；同步阻塞彈窗 | 低 | 功能正常；若需提升 UX 可改為非阻塞式提示 |

**整體評估**：廢棄標記注解屬重構歷史記錄，可保留；`alert()` 僅用於設定驗證，不影響遊戲流程；無需刪除任何程式碼。

---

## 跨輪計時器洩漏稽核（2026-03-03）

**稽核背景**：A3 單元曾發現 `speakText()` 10 秒備援計時器在下一輪觸發導致跳輪的 Bug，已對全系列交叉稽核。

**F3 稽核結論：安全（無此問題）**

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

### F3 困難模式觸控端已放置圖示可拖回來源區

**問題描述**

F3 困難模式桌面端可將已放置在放置格的圖示拖回來源區（取代放置），但觸控端無法執行相同操作。

**根本原因**

`touch-drag-utility.js` 的 `handleTouchStart` 和 `findDraggableElement` 均有 quickCheck 快速篩選邏輯，以 `target.closest(selector)` 快速排除不相關的 touchstart 事件。原選擇器未包含 `.placed-item`，導致觸控已放置圖示時（實際點到的是 `.placed-item` 內的 `.emoji-icon` span），quickCheck 立即返回 null，觸發 debug log「元素不符合快速檢查條件，忽略touchstart」，從未進入容器查找邏輯。

**修復位置**

`js/touch-drag-utility.js`，兩處 quickCheck：
1. `handleTouchStart()` 內（約 L255）
2. `findDraggableElement()` 內（約 L522）

**修復內容**

兩處 `target.closest(...)` 的選擇器字串均加入 `.placed-item`：

```javascript
// 修復前（兩處相同）：
const quickCheck = target.closest('.draggable-item, .money-item, ..., .source-item, .placement-slot, .number-item, ...');

// 修復後（兩處相同）：
const quickCheck = target.closest('.draggable-item, .money-item, ..., .source-item, .placement-slot, .placed-item, .number-item, ...');
```

**影響範圍**

此修復影響所有使用 `touch-drag-utility.js` 且有 `.placed-item` 元素的單元。F3 困難模式的取代放置功能在觸控端恢復正常。

---

## 跨單元修復（2026-03-05）— 設定頁連結按鈕文字粗黑修復

（詳細說明見 `report/A1_Unit_Completion_Report.md` 跨單元修復章節）

**問題**：`css/ai-theme.css` 全域 `a {}` 規則的 `transition: color` 使 `a.selection-btn { color: #000 !important }` 在 CSS 過渡期間失效，設定頁「開啟獎勵系統」連結按鈕文字呈現藍色而非粗黑。

**修復**：`css/ai-theme.css` 的 `a {}` 和 `a:hover {}` 改為 `a:not(.selection-btn):not(.choice-btn) {}`。

**關鍵搜尋詞**：`a:not(.selection-btn):not(.choice-btn)` in `css/ai-theme.css`

---

## 自訂主題上傳修復（2026-03-09）

### 問題 1：上傳圖片後仍顯示「自訂主題需要至少1個圖示」

**根因**：`showImagePreview()` 中 `nameInput.focus()` 被同步呼叫，在行動裝置上立即觸發虛擬鍵盤彈出，遮蓋「確認新增」按鈕，導致使用者無法點擊確認，只能關閉 modal，圖示未被加入。

**回溯**：原始程式碼應為 `setTimeout(() => nameInput.focus(), 100)` 延遲執行，與 F6 的修復模式一致（`F6 showImagePreview raw setTimeout`）。推測在「F3 raw setTimeout 修復（9 處）」時此延遲被移除而非轉換為 `TimerManager.setTimeout`，造成回歸。

**修復**：`showImagePreview()` 中 `nameInput.focus()` 改為 `this.TimerManager.setTimeout(() => { if (nameInput) nameInput.focus(); }, 300, 'ui')` 延遲 300ms 執行。

**關鍵搜尋詞**：`TimerManager.setTimeout.*nameInput.*focus` in `js/f3_number_recognition.js`

---

### 問題 2：自訂主題 modal CSS 樣式不一致

**根因 A**：`updateCustomThemeSettings()` 的 modal HTML 使用 `class="preview-section"`，但 `f3-number-recognition.css` 只定義了 `.image-preview-container`（含置中、邊框樣式），`preview-section` 無對應 CSS，導致預覽圖片樣式不一致。

**修復 A**：`updateCustomThemeSettings()` 的 `<div class="preview-section">` 改為 `<div class="image-preview-container">`，與 `settingsScreen()` 模板一致。

**根因 B**：`f3-number-recognition.css` 的 `.modal-content` 沒有指定 `z-index`，覆蓋了 `shared-game-base.css` 的 `z-index: 10001`，在某些瀏覽器的堆疊情境下可能導致 modal overlay 遮蓋 modal content。

**修復 B**：`css/f3-number-recognition.css` 的 `.modal-content` 加入 `z-index: 10001`，確保 modal 內容區域始終位於 overlay 之上。

**關鍵搜尋詞**：`image-preview-container` in `updateCustomThemeSettings`；`z-index: 10001` in `.modal-content` of `css/f3-number-recognition.css`

---
