# Money Tutor 專案速查

> **原則**：本文件不記錄行號，需要定位時請用 Grep 搜尋函數名稱。

## CLAUDE.md 維護規則

| 類型 | 存放位置 |
|------|---------|
| 架構說明、常用模式、程式碼模板 | **CLAUDE.md**（本文件，每輪對話都載入） |
| 修復記錄：搜尋關鍵字 | **CLAUDE.md 修復記錄速查表**（只留關鍵字） |
| 修復記錄：詳細說明、根因分析 | **`report/unit_reports/XX_Unit_Completion_Report.md`** |
| 廢棄程式碼稽核 | **`report/audit/Deprecated_Code_Audit.md`** |
| 架構設計與成本分析 | **`report/architecture/` 或 `report/analysis/` 其他文件** |

**為什麼這樣分**：CLAUDE.md 是系統提示的一部分，每輪對話都計費；report 文件只在需要時才讀取（單次計費）。目標：CLAUDE.md 控制在 40~60 KB 以內。

## 單元列表

| 系列 | 主題 | 單元 |
|------|------|------|
| A | 生活應用 | A1 販賣機、A2 理髮廳、A3 麥當勞、A4 超市購物、A5 ATM、A6 火車票 |
| B | 預算規劃 | B1 今天帶多少錢、B2 零用錢日記、B3 存錢計畫、B4 特賣比一比、B5 生日派對預算、B6 菜市場買菜 |
| C | 貨幣認知 | C1 認識錢幣、C2 數錢、C3 換錢、C4 付款、C5 夠不夠、C6 找零 |
| F | 數學基礎 | F1 一對一對應、F2 唱數、F3 數字認讀、F4 數字排序、F5 量比較、F6 數的組成 |

---

## 專案結構

```
money_tutor/
├── html/           # 各單元 HTML 頁面
├── js/             # 各單元 JS 邏輯
├── css/            # 樣式表
├── images/         # money/ a1/ a2/ a3/ a5/ a6/ index/
├── audio/          # success.mp3, click.mp3, coin01.mp3 等
├── reward/         # 獎勵系統（獨立模組）
└── worksheet/      # 作業單系統
```

### JS 工具檔案

| 檔案 | 說明 |
|------|------|
| `js/reward-launcher.js` | 獎勵系統啟動器（各 HTML 頁面需引入） |
| `js/number-speech-utils.js` | 數字語音轉換工具 |
| `js/audio-unlocker.js` | 音訊解鎖（行動裝置） |
| `js/confetti.browser.min.js` | canvas-confetti v1.9.2（18 個 HTML 引用） |
| `js/a4-shared-products.js` | A4 共用商品資料（12 種商店 × 10 商品） |
| `js/touch-drag-utility.js` | 觸控拖曳工具 |
| `js/theme-system.js` | 主題系統（A1 HTML 未引用） |
| `js/emoji-library.js` | Emoji 素材庫 |

### CSS 核心檔案（2026-03-07 更新）

| 檔案 | 使用單元 | 說明 |
|------|---------|------|
| `css/ai-theme.css` | A2~A6, B1~B6, C1~C6, F1~F6（23個）| 全域主題、Design Tokens、CSS 變數 |
| `css/shared-game-base.css` | B1~B6, C1~C6, F1~F6（18個）| B/C/F 共用基礎（原 `unit6.css` 改名，2026-03-07）|
| `css/b-series.css` | B1~B6（6個）| B 系列專屬（`.b-series` 前綴規則）|
| `css/c-series.css` | C1~C6（6個）| C 系列專屬（從 unit6.css 分拆，`.c-series` 前綴規則）|
| `css/common-modal-responsive.css` | 全部 24 個 | 共用響應式彈窗 |
| `css/dark-mode-simple.css` | 全部 24 個 | 深色模式 |

**B 系列載入順序**：`ai-theme.css` → `shared-game-base.css` → `b-series.css` → `bX_unit.css`
**C 系列載入順序**：`ai-theme.css` → `shared-game-base.css` → `c-series.css` → `cX_unit.css`
**F 系列載入順序**：`ai-theme.css` → `shared-game-base.css` → `fX-unit.css`
**A1 例外**：不載入 `ai-theme.css`，只用 `a1_vending_machine.css`

---

## 關鍵函數速查

### 設定頁面：`showSettings()`（A1~A6、C1~C6、F1~F4）
- F5：`showSettingsScreen()`
- F6：設定內嵌於 `renderWelcomeScreen()`

### 標題列：Grep `reward-btn` 定位各單元遊戲畫面渲染函數

### 題數選項：Grep `題數` / `questionCount` / `totalQuestions`

### 完成畫面函數

| 單元 | 函數 |
|------|------|
| B1~B3、B4 | `showResults()` |
| B5、B6 | `showResults()`（關卡制，以 `totalRounds` / `correctCount` 計分）|
| A1 | `showResults()` |
| A2、A6 | `showCompletionScreen()` |
| A3 | `showPickupComplete()` → `showCompletionSummary()` |
| A4 | `showGameComplete()` → `showCompletionSummary()` |
| A5 | `generateFinalCompleteScreen()` |
| C1~C4、F1~F3 | `endGame()` |
| C5、C6 | inline（Grep `完成挑戰` 或 `completion`） |
| F4、F5 | `completeGame()` |
| F6 | `showResults()` |

---

## 常用修改模式

> 獎勵系統按鈕 / 設定選項 / 完成畫面連結 HTML 模板：Grep `reward-btn` 定位現有單元複製；完整模板見 `report/architecture/Code_Templates.md`。

### 統一測驗結束畫面樣式

**C/F 系列**：紫色漸層背景、🏆 彈跳、橙色表現徽章（glow）、3 個統計卡片（答對/正確率/時間）、綠色「再玩一次」+ 紫色「返回設定」。
- 表現評價：≥90% 優異🏆 / ≥70% 良好👍 / ≥50% 努力💪 / <50% 練習📚
- 需記錄 `this.state.startTime = Date.now()` 於遊戲開始時

**A 系列**：同 C/F 但無表現徽章，2 個統計卡片（完成題數/時間），標題「🎉 完成挑戰 🎉」，另含煙火 + 音效。

**HTML 依賴**：`<audio id="success-sound" src="../audio/success.mp3">` + confetti.browser.min.js

**煙火觸發**：Grep `fireConfetti` / `TimerManager.setTimeout.*confetti` 定位；完整模板見 `report/architecture/Code_Templates.md`。

**完成畫面滾動修復**：Grep `document.body.style.overflow` 定位。

### TimerManager / EventManager 模式（記憶體管理）

所有單元已實現。Grep `TimerManager.setTimeout` / `EventManager.on` 定位；**完整模板見 `report/architecture/Code_Templates.md`**。

**呼叫點規範**：
- `init()`：`TimerManager.clearAll()` + `EventManager.removeAll()` + `injectGlobalAnimationStyles()`
- `renderWelcomeScreen()`：`TimerManager.clearAll()` + `EventManager.removeByCategory('gameUI')`
- `showResults()`：`TimerManager.clearByCategory('turnTransition')`

**injectGlobalAnimationStyles**：以 `XX-global-animations` id 防重複注入，搜尋此關鍵字定位各單元實作。

**A 系列學習成果與表現評價**：Grep `getPerformanceByCount` 定位；文字內容見 `report/Code_Templates.md`。

---

## HTML 檔案

位於 `html/`，命名規則：`a1_vending_machine.html` ~ `f6_number_composition.html`（共 24 個單元 + ai-robot-demo、clear-cache、color-palette-manager）。B 系列：`b1_daily_budget.html` ~ `b6_market_shopping.html`（2026-03-14 新增）。

各 HTML 需引入：`<script src="../js/reward-launcher.js"></script>`

**A1 例外**：不引用 `theme-system.js`（無深色主題需求）。`audio-unlocker.js` 已於 2026-02-24 統一引入。

---

## 獎勵系統 (reward/)

```
reward/index.html / script.js / styles.css / sound/ / png/1.png~5.png / CLAUDE.md
```

**重要函式**：`compressImage()`（300px,70%）、`showAddStudentDialog()`、`saveToLocalStorage()`、`loadFromLocalStorage()`、`refreshDisplay()`、`updateScore()`

**資料結構**：`{ id, name, photo(base64), score }`；localStorage 鍵：`rewardSystemStudents`、`pendingRewards`、`rewardSystemZoom`（縮放比例，50~150）

---

## 數字語音轉換 (number-speech-utils.js)

| 函數 | 用途 |
|------|------|
| `convertToPureNumberSpeech()` | F 系列純數字 |
| `convertToTraditionalCurrency()` | C/A 系列金額 |
| `convertToQuantitySpeech()` | 數量（帶單位） |
| `convertToChineseNumber()` | 金額（不含元） |

**「2」發音規則**：個位唸「貳」；百/千/萬位及帶單位唸「兩」。避免 `${amount}元` 直接插值（A1/A2/A5 用 `convertAmountToSpeech()`，A4 用 `convertToTraditionalCurrency()`）。

---

## A 系列輔助點擊模式

- Action Queue：Grep `actionQueue` / `buildActionQueue`
- 點擊處理：Grep `handleAssistClick` / `processClick`
- 高亮：Grep `highlightElement` / `step-hint`
- 防快速連點：600ms，`state.isProcessing` 旗標

**普通模式錯誤3次提示**：Grep `stepErrorCounts` 定位計數器。`.step-hint { animation: pulseHighlight 1.5s infinite; box-shadow: 0 0 25px rgba(255,193,7,0.8); outline: 4px solid #FFC107; }`

自選任務模式無正確答案，不需此機制。

---

## A3 特殊說明

> 詳細說明見 `report/unit_reports/A3_Unit_Completion_Report.md §十一`

- 餐盤 CSS：Grep `tray`（黃色漸層 + ::before/after 把手）
- Debug 物件：`McDonald.Debug`；A1=`VendingMachine.Debug`；A2=`BarberKiosk.Debug`；A4/A6/C/F=`Game.Debug`；A5=`ATM.Debug`；F5/F6=`GameDebug`
- 魔法商品 State：`customItems: { burgers/sides/drinks/desserts }`；關鍵函數：`getAllCategoryItems`、`renderCustomItemsPanel`、`handleCustomItemImageUpload`、`confirmAddCustomItem`、`setEasyModeCustomItemPrices`
- `_completionSummaryShown` 防重複旗標；餐點圖片用 `item.imageUrl||item.image`（8 處套用）

---

## 作業單系統 (worksheet/)

> 詳細說明見 `report/unit_reports/Worksheet_Unit_Completion_Report.md`

```
worksheet/index.html / worksheet-generator.js / worksheet-styles.css / units/（18個JS）
```

**核心**：`WorksheetRegistry`（register/has/get）、`WorksheetGenerator`（generate/renderPage）、`WorksheetApp`（index.html 內嵌）

**工具函數**：`coinImg(v)` / `coinImgBack(v)` / `coinImgRandom(v)` / `coinTag(v)` / `coinSymbol(v)` / `walletToCoins(amt)` / `blankLine(wide)`

**作業單連結只傳 `unit` 參數**（讓作業單完全使用自己的預設值與工具列設定）：
```javascript
const params = new URLSearchParams({ unit: 'a1' });
window.open('../worksheet/index.html?' + params.toString(), 'Worksheet', 'width=900,height=700');
```

**A4 例外**：額外傳 `storeType`（`WorksheetApp.init()` 有 fallback 為 `convenience`）

**溢出處理**：`_trimOverflowQuestions()` 自動裁剪超出頁尾的題目。

### PDF 下載系統（2026-03-13）

**依賴**：`js/html2canvas.min.js`（195KB）、`js/jspdf.umd.min.js`（356KB）、懶載入 base64 JS 群。

**流程**：`doPrint(withAnswers)` → `_downloadPdf()` → `_loadImagesBase64()` → 逐頁 `_inlineImages()` → `html2canvas(scale:2)` → `pdf.addImage(0,0,210,297)` → Blob URL 觸發下載。

**base64 檔（js/ 目錄，懶載入）**：

| 檔案 | globalVar | 單元 | 格式 | 大小 |
|------|-----------|------|------|------|
| `coin-images-base64.js` | `CoinImagesBase64` | 全部 | WebP 300px q85 | 255KB |
| `a1-images-base64.js` | `A1ImagesBase64` | a1 | WebP 250px q82 | 173KB |
| `a2-images-base64.js` | `A2ImagesBase64` | a2 | WebP 250px q82 | 193KB |
| `a3-images-base64.js` | `A3ImagesBase64` | a3 | WebP 220px q80 | 886KB |
| `a4-images-base64.js` | `A4ImagesBase64` | a4 | WebP 220px q80 | 1182KB |

**重要規則**：
- base64 檔宣告必須用 `window.X = window.X || {...}`（不可用 `const`，`const` 不掛 `window`）
- `_inlineImages()` 三段策略：①base64 lookup → ②fetch（http 環境）→ ③透明 GIF fallback（防 canvas taint）
- 重新生成指令（Python+Pillow）：見 `report/unit_reports/Worksheet_Unit_Completion_Report.md` 十、

### 工具列 toolbarConfig

```javascript
toolbarConfig: {
    fontButton: { ... } | null,         // null=隱藏
    orientationButton: { ... } | null,
    adjustCountButton: { ... } | null,
    hidePrintAnswer: true,
    extraButtons: [{ id, label, type: 'cycle'|'dropdown'|'modal', options, getCurrentValue, onChange }]
}
```

重要 DOM ID：`dynamic-buttons-container`（所有動態按鈕渲染於此）、`print-answer-btn`、`worksheet-container`

### 各單元作業單配置摘要

> 完整配置表見 `report/unit_reports/Worksheet_Unit_Completion_Report.md §五`；特殊記憶點：

- A1：`_selectDrinksWithUniquePrice()` + `_getSmartPayment()`；adjustCount=圖示類型
- A2：僅 6 種 price-* 題型（無找零）；`_serviceImg()`（`icon-a2-*.png`）
- A4：`font=商店類型（12種）`；依賴 `a4-shared-products.js`；額外傳 `storeType` 參數
- A6：`priceVisualFill`（隱藏總票價）/ `priceVisual`（顯示）；`hidePrintAnswer:true`
- 共用：`_renderPriceWithCoins`（看圖填空題型，A1~A6 皆有）

**A6 自訂車站系統**：Grep `addCustomStation` / `resolveStationId` 定位；詳細說明見 `report/Code_Templates.md`。

---

## 修復記錄速查（最新狀態）

> 詳細說明見各單元 `report/unit_reports/XX_Unit_Completion_Report.md`（各單元末尾有「修復記錄速查」章節）。本表僅列搜尋關鍵字。

| 項目 | 單元 | 搜尋關鍵字 |
|------|------|------------|
| Debug Logger FLAGS | 全部 | `Game.Debug.FLAGS`, `GameDebug.FLAGS` |
| injectGlobalAnimationStyles | 全部 | `XX-global-animations` |
| TimerManager + EventManager | 全部 | `TimerManager.setTimeout`, `EventManager.on` |
| 狀態重置 resetGameState | C1/C2/C4/C5/C6/F1/F3/F4/F5/F6 | `resetGameState` |
| 作業單連結僅傳 unit 參數 | 全部 17 JS | `unit` param only |
| 作業單 defaultCount=20 | A 系列 | `defaultCount` |
| 看圖填空題型 | A1~A6 作業單 | `_renderPriceWithCoins` |
| 作業單 PDF 下載系統 | worksheet/ | `_downloadPdf`, `_inlineImages`, `_loadImagesBase64` |
| 語音速率+選擇順序 | 全部 | `utterance.rate`, `voices.find` |
| 語音雅婷優先 | 全部 | `Microsoft Yating` |
| clearTimeout(TimerManager ID) | A1/A2/A4/A6 | `_visualDelayTimer`, `_taskPopupTimeout` |
| 吉祥物尺寸48px | 15 JS | `educated_money_bag_character.*48px` |
| 吉祥物位置修正 | A1/A5/C2/C4/F2 | `hint-btn-wrapper`, `position:static` |
| 設定頁連結按鈕文字 | 全部 | `a:not(.selection-btn):not(.choice-btn)` |
| 錯誤邊界音訊誤觸發 | A4/A5/A6 | `if (!event.error) return` |
| calculateOptimalPayment防護 | A4/A6 | `calculateOptimalPayment` |
| 遮罩不覆蓋標題列 | A1~A6 | `getBoundingClientRect().bottom`, `_tbBottom` |
| hint 方框 ::before | A3/A4/A6 | `boxFramePulse`, `checkoutBoxFramePulse`, `confirmBoxFramePulse` |
| A 系列普通模式計時自動提示永久刪除 | A1~A6 | `scheduleNormalModeHint`（已移除）|
| C/F 輔助點擊說明更新 | C1~C6, F1~F6 | `assist-click-group`, `啟用後，只要偵測到點擊` |
| 彈窗z-index稽核 | A1~A6 | 標題列(100) < 彈窗 < 遮罩(10100) |
| C5/C6 反復測試錯誤語音精簡 | C5/C6 | `不對喔，請再試一次`, `mode === 'single'` |
| 自訂主題按鈕樣式 | F1/F5/F6 | `linear-gradient(45deg, #FF6B6B, #4ECDC4)` |
| B1/B2/B5/B6 設定頁自訂題數 | B1/B2/B5/B6 | `_showSettingsCountNumpad`, `b-snp-overlay` |
| B1/B2 金錢圖示隨機正反面 | B1/B2 | `trayFaces`, `rf()` |
| B1/B2 提示金額數字泡泡 | B1/B2 | `b1-cost-hint-tip`, `b2-cost-hint-tip` |
| *(早期修復已歸檔)* | — | 見 `report/audit/Fix_History.md` |
| A1 coinFirst 系統 | A1 | `isCoinFirstMode()`, `coinFirstAssigned`, `coinFirstFree` |
| A1 交易摘要金錢圖示 | A1 | `mkMoneyIcons`, `a1-money-icons-row` |
| A1 找零不重複+智慧投入 | A1 作業單 | `_selectDrinksWithUniquePrice`, `_getSmartPayment` |
| A2 coinFirst 系統 | A2 | `validateCoinFirstPayment`, `walletPaymentModal`, `price <= inserted` |
| A2 普通模式 step1 指定任務改彈窗 | A2 | `showNormalModeHint` step1 → `showTaskPopup()` |
| A3 付款提示彈窗+停止語音 | A3 | `a3PaymentHintModal`, `speechSynthesis.cancel` |
| A4 提示勾勾+付款提示彈窗 | A4 | `a4PaymentHintModal`, `STORE_WALLET_CAPS` |
| A4 作業單難度分級 | A4 作業單 | `this._items[difficulty]`, `keyPrefix` |
| A5 隨機任務+計時器 | A5 | `getActualSessionType()`, `randomBag` |
| A5 普通模式自動提示關閉 | A5 | `DIFFICULTY_CONFIG.normal.autoShowHint` |
| A6 錢包組成+找零驗證 | A6 | `generateRandomWalletDecomposition`, `walletCap` |
| A6 困難模式付款語音旗標 | A6 | `_showPaidAmount`, `paymentSpeech` |
| B1 兩步驟流程+自訂項目 | B1 | `_renderPhase1`, `_getEffectiveTotal`, `b1-wallet-ghost-slot` |
| B2 語音鏈+Phase2+自訂事件 | B2 | `_animateEasyEntriesSequential`, `_getEffectiveEvents` |
| B3 月曆模式+提示+輔助點擊 | B3 | `_toggleDepositHint`, `b3Rf`, `b3-pig-exch-btn` |
| B4 點幣流程+提示系統 | B4 | `_setupEasyModeCoins`, `b4-price-unknown`, `diffErrorCount` |
| B4 作業單難度分級 | B4 作業單 | `this._items[difficulty]`, `keyPrefix` |
| B5 Phase1提示+找零+歡迎畫面 | B5 | `_b5P1ActivateHintMode`, `changeGhostMode`, `b5-wc2-start-btn` |
| B6 攤位導航+找零重設計 | B6 | `b6-stall-nav`, `b6c-change-page`, `changeGreedySolution` |
| C1/C2/C3 語音修復 | C1/C2/C3 | `safeCallback()`, `totalExchanges = 1` |
| C4/C5 輔助點擊 | C4/C5 | `_closeInstructionModal`, `c5-instruction-modal` |
| C6 重複進題 | C6 | `nextQuestionScheduled` |
| c6 圖片檔名修正 | images/c6/ | `icon-c6-star-sticker`, `icon-c6-mystery-gift` |
| F1 assist-click+getItemName | F1 | `f1AssistBoxPulse`, `getItemName`, `validateDrop` |
| F3 自訂主題+觸控放置 | F3 | `image-preview-container`, `.placed-item` |
| F4 放置語音 | F4 | `handleInstantFeedback` |
| F5 計時器+計分防護 | F5 | `startTimer`, `accuracy.*totalAnswers > 0` |

---

## 廢棄程式碼稽核

> 詳細記錄見 `report/audit/Deprecated_Code_Audit.md`

| 搜尋關鍵字 | 單元 | 說明 |
|-----------|------|------|
| `_OLD`, `handleCorrectChangeSelection_OLD` | A4 | 廢棄函數（未被呼叫） |
| `╔═╗`, `ATM 高度偵測` | A5 | 裸 console.log |
| `generateSufficientMoney`, `已廢棄` | C5/C6 | 廢棄 stub |
| `renderObjectsOld` | F5 | 廢棄備用函數 |
- **F1**：6 處 `alert()` 自訂圖片上傳驗證；3 處 `await new Promise(resolve => setTimeout(resolve, N))` async 動畫延遲（同 C4 模式，刻意保留）
- **F2**：6 處 `alert()` 自訂圖片上傳驗證
- **F3**：8 處 `alert()` 輸入範圍驗證 + 自訂圖片上傳驗證
- **F4**：`sleep()` 輔助函數（`const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))`）及 7–8 處 `alert()` 設定驗證對話框（非遊戲流程，刻意保留）
- **F5**：3 處 `await new Promise(resolve => setTimeout(resolve, ms))` 動畫/語音延遲（同 C4 模式）；5 處 `alert()` 設定驗證
- **F6**：1 處 `await new Promise(resolve => setTimeout(resolve, 100))` 語音取消延遲（同 C4 模式）；6–7 處 `alert()` 自訂物件上傳驗證
- **C3**：誤導性注解（`loadNextQuestion函數已移除`，實際仍存在）
- **F1–F4、F6**：向後相容 Debug shim，均刻意保留
- **F5**：已注解的 AudioContext 監控程式碼（14 行，已有說明）
- **C1/C2/C4**：操作性清理注解（正常重構標記）
