# Money Tutor 專案速查

> **原則**：本文件不記錄行號，需要定位時請用 Grep 搜尋函數名稱。

## CLAUDE.md 維護規則

| 類型 | 存放位置 |
|------|---------|
| 架構說明、常用模式、程式碼模板 | **CLAUDE.md**（本文件，每輪對話都載入） |
| 修復記錄：搜尋關鍵字 | **CLAUDE.md 修復記錄速查表**（只留關鍵字） |
| 修復記錄：詳細說明、根因分析 | **`report/XX_Unit_Completion_Report.md`** |
| 廢棄程式碼稽核 | **`report/Deprecated_Code_Audit.md`** |
| 架構設計與成本分析 | **`report/` 其他文件** |

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

> 獎勵系統按鈕 / 設定選項 / 完成畫面連結 HTML 模板：Grep `reward-btn` 定位現有單元複製；完整模板見 `report/Code_Templates.md`。

### 統一測驗結束畫面樣式

**C/F 系列**：紫色漸層背景、🏆 彈跳、橙色表現徽章（glow）、3 個統計卡片（答對/正確率/時間）、綠色「再玩一次」+ 紫色「返回設定」。
- 表現評價：≥90% 優異🏆 / ≥70% 良好👍 / ≥50% 努力💪 / <50% 練習📚
- 需記錄 `this.state.startTime = Date.now()` 於遊戲開始時

**A 系列**：同 C/F 但無表現徽章，2 個統計卡片（完成題數/時間），標題「🎉 完成挑戰 🎉」，另含煙火 + 音效。

**HTML 依賴**：`<audio id="success-sound" src="../audio/success.mp3">` + confetti.browser.min.js

**煙火觸發**：Grep `fireConfetti` / `TimerManager.setTimeout.*confetti` 定位；完整模板見 `report/Code_Templates.md`。

**完成畫面滾動修復**：Grep `document.body.style.overflow` 定位。

### TimerManager / EventManager 模式（記憶體管理）

所有單元已實現。Grep `TimerManager.setTimeout` / `EventManager.on` 定位；**完整模板見 `report/Code_Templates.md`**。

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

> 詳細說明見 `report/A3_Unit_Completion_Report.md §十一`

- 餐盤 CSS：Grep `tray`（黃色漸層 + ::before/after 把手）
- Debug 物件：`McDonald.Debug`；A1=`VendingMachine.Debug`；A2=`BarberKiosk.Debug`；A4/A6/C/F=`Game.Debug`；A5=`ATM.Debug`；F5/F6=`GameDebug`
- 魔法商品 State：`customItems: { burgers/sides/drinks/desserts }`；關鍵函數：`getAllCategoryItems`、`renderCustomItemsPanel`、`handleCustomItemImageUpload`、`confirmAddCustomItem`、`setEasyModeCustomItemPrices`
- `_completionSummaryShown` 防重複旗標；餐點圖片用 `item.imageUrl||item.image`（8 處套用）

---

## 作業單系統 (worksheet/)

> 詳細說明見 `report/Worksheet_Unit_Completion_Report.md`

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
- 重新生成指令（Python+Pillow）：見 `report/Worksheet_Unit_Completion_Report.md` 十、

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

> 完整配置表見 `report/Worksheet_Unit_Completion_Report.md §五`；特殊記憶點：

- A1：`_selectDrinksWithUniquePrice()` + `_getSmartPayment()`；adjustCount=圖示類型
- A2：僅 6 種 price-* 題型（無找零）；`_serviceImg()`（`icon-a2-*.png`）
- A4：`font=商店類型（12種）`；依賴 `a4-shared-products.js`；額外傳 `storeType` 參數
- A6：`priceVisualFill`（隱藏總票價）/ `priceVisual`（顯示）；`hidePrintAnswer:true`
- 共用：`_renderPriceWithCoins`（看圖填空題型，A1~A6 皆有）

**A6 自訂車站系統**：Grep `addCustomStation` / `resolveStationId` 定位；詳細說明見 `report/Code_Templates.md`。

---

## 修復記錄速查（最新狀態）

> 詳細說明見各單元 `report/XX_Unit_Completion_Report.md`。本表僅列搜尋關鍵字。

| 項目 | 單元 | 搜尋關鍵字 |
|------|------|------------|
| Debug Logger FLAGS | 全部 | `Game.Debug.FLAGS`, `GameDebug.FLAGS` |
| injectGlobalAnimationStyles | 全部 | `injectGlobalAnimationStyles`, `XX-global-animations` |
| TimerManager + EventManager | 全部 | `TimerManager.setTimeout`, `EventManager.on` |
| 狀態重置 resetGameState | C1/C2/C4/C5/C6/F1/F3/F4/F5/F6 | `resetGameState` |
| 作業單連結僅傳 unit 參數 | 全部 17 JS | `unit` param only |
| 作業單 defaultCount=20 | A 系列 | `defaultCount` |
| 看圖填空題型 | A1~A6 作業單 | `_renderPriceWithCoins` |
| A1 找零不重複+智慧投入 | A1 作業單 | `_selectDrinksWithUniquePrice`, `_getSmartPayment` |
| 作業單 PDF 下載系統 | worksheet/ | `_downloadPdf`, `_inlineImages`, `_loadImagesBase64` |
| PDF 下載開新分頁修復 | worksheet/ | `blobUrl`, `revokeObjectURL`, `a.download` |
| base64 const→window 修復 | worksheet/ | `window.CoinImagesBase64`, `window.A1ImagesBase64` |
| canvas taint 透明 GIF fallback | worksheet/ | `R0lGODlhAQABAIAAAAAAAP///` |
| A4 作業單商品改用圖片 | A4 作業單 | `_productImg`, `item.icon` |
| base64 WebP 透明背景 | worksheet/ | `data:image/webp;base64` |
| *(B系列 03-14~03-18 及更早修復已歸檔)* | — | 見 `report/Fix_History.md` |
| A6 easy-change-money 觸控拖曳修正（2026-03-16）| A6 + `touch-drag-utility.js` | `cleanupAll()` before change drag；`_DRAG_SEL` 常數；`let target` + 父元素回退；`?v=2.3` 快取清除（A3/A4/A6/F1/F2/F6）|
| A6 預設任務錢包分層上限（2026-03-16）| A6 | `walletCap`：≤100→300、≤300→700、≤600→1300、其他→+500；`minWallet = totalPrice + 10`；`generatePresetQuestion` + `renderPaymentSceneUI` fallback |
| A6 500/1000/2000 錢包隨機組成（2026-03-16）| A6 | `generateRandomWalletDecomposition`：貪婪起點→隨機拆解→≤10張；`breakRules`；`initializeWallet` 三路分支；每題重新計算 |
| A6 找零驗證普通模式加 ✗（2026-03-16）| A6 | `wrong-answer-overlay` 加入普通模式 else 分支；timing 對齊困難模式（300ms+1000ms）|
| A6 找零驗證正確答案加 ✓（2026-03-16）| A6 | `correct-answer-overlay`、`correct-mark`、`correctMarkAppear`；與 ✗ 結構完全對稱 |
| *(C/F/A 系列較舊系統修復已歸檔)* | — | 見 `report/Fix_History.md` |
| A2 coinFirst 灰暗 CSS cascade | A2 | `transition: none !important`, `requestAnimationFrame setProperty.*important`, `serviceItemFadeIn :not(.coin-first-unlocking)` |
| A2 coinFirst 指示燈放大+紅色 | A2 | `.indicator-light 18px`, `light.classList.add('active')`, `redLightPulse` |
| A2 coinFirst 需要金額顯示修復 | A2 | `_cfSvc`, `_displayReq`, `easyMode.assignedService \|\| normalMode.assignedService` |
| A2 設定頁按鈕寬度修復 | A2 | `button-group`（移除 `flex:1`）|
| A2 自訂金額（自選服務）| A2 | `showCustomWalletModal`, `custom walletType`, `setupFreeChoiceMode custom`, `generateCustomWalletFromDetails` |
| A2 confirmCustomWallet 不閃爍 | A2 | `closeCustomWalletModal`, `customBtn.textContent`, `updateStartButton`, `custom-wallet-warning` |
| A1 自訂金額彈窗升級 | A1 | `showCustomWalletModal`, `a1CustomWalletQty`, `a1AdjustWalletQty`, `a1ConfirmWallet`, `generateWalletCoins customWalletDetails` |
| A5 6x setInterval→遞迴 | A5 | `autoTakeCash`, `activeInterval` |
| A3 orderNumber setInterval→遞迴 | A3 | `startOrderNumberAnimation`, `orderAnimation` |
| F5 this.timer setInterval→遞迴 | F5 | `startTimer`, `tick`, `'timer'` |
| A6 張數調整 setInterval→遞迴 | A6 | `autoAdjustCount`, `doClick` |
| C1/C2/C3 speak() catch雙重callback | C1/C2/C3 | `catch`, `safeCallback()` |
| C3 普通模式固定1輪 | C3 | `totalExchanges = 1` |
| C3 提示鈕 | C3 | `showNormalModeHint`, `c3-hint-btn` |
| C3 困難模式移除提示 | C3 | `exchangeAreaTitleHTML` |
| A3 拖曳鬼影跟隨 | A3 | `imgW`, `imgH`, `setDragImage` |
| A4 提示勾勾持續 | A4 | `activeWalletHintList`, `showWalletHintWithTicks` |
| A4 蕃茄計數前綴修正 | A4 | `parseProductDisplay`, `/^\d/.test(mw)` |
| C3 completeExchange Bug | C3 | `MoneyExchange3.ModeStrategies.handleCompletion()` |
| A4 任務彈窗輔助點擊消失 | A4 | `#target-item-modal`, `closeTargetItemModal` |
| A4 完成畫面按鈕無響應 | A4 | `this.ClickMode.unbind()` |
| A4 巧克力量詞「條→包」 | A4 | `getMeasureWord`, `'巧克力': '包'` |
| A6 步驟6找零語音串接 | A6 | `handleEasyChangePlacement`, Speech callback chain |
| A6 找零圖示亮度 | A6 | `executeNextChange`, `img.style.opacity` |
| A6 步驟1-4 click.mp3 | A6 | `playSound('click')`, `click.mp3` |
| A5 煙火 zIndex | A5 | `zIndex: 10200` |
| A5 click監聽洩漏 | A5 | `_clickModeHandler`, `unbindClickModeHandler` |
| A5 隨機任務 | A5 | `getActualSessionType()`, `randomBag` |
| A5 selectMenuOption undefined | A5 | `selectMenuOption`, `getActualSessionType()` |
| A5 showTaskReminderModal 錯誤類型 | A5 | `getActualSessionType()` |
| A5 存款彈窗路由 | A5 | `showBillSelectionModal`, `getActualSessionType()` |
| A5 提款金額路由 | A5 | `startWithdrawProcess`, `getActualSessionType()` |
| A5 提款金額不一致 | A5 | `easyModeHints.assignedAmount` |
| A5 存款提示消失 | A5 | `clearATMEasyHint`, `showATMEasyHint` |
| A5 轉帳提示彈窗 | A5 | `showBankCodeInputScreen`, `getActualSessionType()` |
| 遮罩不覆蓋標題列 | A1~A6 | `getBoundingClientRect().bottom`, `_tbBottom` |
| A4 魔法商品自訂價格 | A4 | `addDynamicPrice`, `category === 'custom'` |
| A1 coinFirst 新增 | A1 | `_initCoinFirstScreen`, `updateDrinkAvailabilityByCoinAmount`, `coin-first-locked` |
| A1 coinFirst easy誤判 | A1 | `handleEasyModeAction`, `return false` |
| A1 coinFirst cancel修復 | A1 | `cancelCoinInsertion`, `INSERT_COIN` |
| A1 coinFirst buildQueue crash | A1 | `buildActionQueue('coinFirstInsert')`, `coinFirstSelect` |
| A1 交易摘要圖片 | A1 | `showTransactionSummary`, `product.imageUrl` |
| A1 coinFirst 螢幕圖片 | A1 | `screenProductImg` |
| A1 coinFirst step1提示 | A1 | `showNormalModeHint`, `coin-first-available` |
| A1 coinFirst 遮罩透明 | A1 | `coin-first-transparent-overlay`, `coin-first-content` |
| A1 交易摘要圖片動畫 | A1 | `productReveal`, `180×180px` |
| A1 productVended重複出貨 | A1 | `processPayment`, `productVended` |
| A1 coinFirst easy螢幕初始 | A1 | `screenProductImage`, `screenProductImg` |
| A1 coinFirst modal背景 | A1 | `.cf-header-card`, `coin-first-content` |
| A4 交易摘要圖示 | A4 | `showTransactionSummaryScreenWithData`, `productReveal` |
| A4 交易摘要圖片尺寸 | A4 | `getProductIconHTML.*180px`, `multi-selection.*70px` |
| A4 selectedItems跨題污染 | A4 | `selectedItems = []`, `showShoppingScene` |
| A3 步驟2付款提示動畫 | A3 | `counter-payment-btn`, `counter-payment-btn-hint` |
| A3 指定餐點完成語音 | A3 | `speakCompletionMessage`, `moveToNextAssignedItem` |
| A3 普通模式提示單一類別 | A3 | `showHardModeHint`, `showCategoryAssignmentModal` |
| A3 startOver計時器洩漏 | A3 | `_pickupNavigating`, `TimerManager.clearByCategory('speech')` |
| A1 coinFirst 完成 | A1 | `drinkLightUp`, `coinFirstInsert`, `coinFirstSelect` |
| A1 coinFirst拆分 | A1 | `isCoinFirstMode()`, `coinFirstAssigned`, `coinFirstFree` |
| A1 coinFirst設定頁兩列 | A1 | `coinFirstFree` button |
| A1 coinFirstAssigned即時亮燈 | A1 | `updateDrinkAvailabilityByCoinAmount`, `.coin-modal z-index:10300` |
| A1 coinFirst流程稽核3項 | A1 | `cfTarget`, `coinFirstFree：允許重新選擇`, `指定購買：只高亮目標` |
| A1 輔助點擊說明更新 | A1 | `showSettings`, warning text |
| 彈窗z-index稽核 | A1~A6 | `標題列(100) < 彈窗 < 遮罩(10100)` |
| 語音速率+選擇順序 | 全部 | `utterance.rate`, `voices.find` |
| 語音雅婷優先 | 全部 | `Microsoft Yating`, `startsWith` |
| A4 各商店錢包上限 | A4 | `STORE_WALLET_CAPS`, `initializeWallet` |
| A4 3C商品更新 | A4 | `amountLevels`, `electronics: 10000` |
| A4 3C細項調整 | A4 | `price_max: 3000`, `平板電腦` |
| A3 餐盤點擊即跳轉 | A3 | `onTrayScreen`, `trayNavCallback` |
| A3 Game未定義+錯誤邊界 | A3 | `McDonald.handleCustomQuestionClick`, `event.error` |
| A3 步驟2自動跳過 | A3 | `autoSelectPaymentMethod`, `selectPaymentMethod` |
| A3 取餐自動跳轉 | A3 | `trayReadyTime`, `buildActionQueue.*pickup` |
| A1 coinFirst稽核3項 | A1 | `coinFirstAssigned 關閉彈窗後應進入投幣階段` |
| A2 coinFirst 新增 | A2 | `showCoinFirstScreen`, `_lockServicesForCoinFirst`, `_initCoinFirstScreen`, `updateServiceAvailabilityByAmount`, `coin-first-locked`, `coin-first-available`, `coinFirstAssigned`, `coinFirstFree` |
| A2 coinFirst 輔助點擊 | A2 | `coinFirstInsert`, `coinFirstSelect`, `autoSelectCoinFirstService`, `buildActionQueue`, `transitionToNextPhase` |
| A2 coinFirst 服務未鎖定修復 | A2 | `_lockServicesForCoinFirst`, `showTaskPopupIfNeeded` coinFirst guard, `closeTaskPopup` 播放引導語音 |
| A2 設定頁任務類型分組 | A2 | 先投幣再選服務/先選服務再投幣 兩組標題；`coinFirstFree` 使用 fixed500/fixed1000 |
| A2 coinFirst 錢包修正+方框暗化 | A2 | `setupCoinFirstAssignedMode` 改用 `generateWalletCoins`（精確金額，防超投死局）；`_lockServicesForCoinFirst` 加 `coin-first-locked-wrapper` 至 wrapper；CSS filter 移至 wrapper 層使指示燈與方框同步暗化 |
| A2 coinFirst 紙鈔投完仍要求紙鈔 | A2 | `showNormalModeHint` coinFirst step1 加 `billsInserted` 判斷（紙鈔投完後改提示硬幣口）；hint guard 加 coinFirst 分支允許放行；`confirmMoneySelection` coinFirst 分支中 `hintShown` 時自動呼叫 `showNormalModeHint` 更新提示；雙元語音修正（`convertAmountToSpeech` 後移除多餘「元」）|
| A2 錢包式付款彈窗（2026-03-22）| A2 | `walletPaymentModal(activeType)`；`.wp-section.inactive`；紙鈔/硬幣分區顯示；開啟來源決定哪區可點選 |
| A2 兩階段付款重構（2026-03-22）| A2 | `confirmMoneySelection` `shouldVerify`（超額立即判定）；`updateSlotStatus` 移除 `amountMatched`；任意順序投入 |
| A2 coinFirst 付款驗證（2026-03-22）| A2 | `validateCoinFirstPayment`, `_handleCoinFirstPaymentError`；coinFirst 用 `assignedService.price` 非 `requiredAmount` |
| A2 難度分離提示（2026-03-22）| A2 | 普通模式 3 次自動顯示勾勾；困難模式僅提示鈕觸發；錯誤語音→callback→hint語音（`willShowHint`, `hintSuffix`）|
| A2 coinFirst 應付金額修復（2026-03-22）| A2 | `showPaymentError` + `showPaymentHintAfterErrors` 加 `isCoinFirstMode()` 判斷，改用 `assignedService.price` |
| A2 coinFirstAssigned 錢包增量（2026-03-22）| A2 | `setupCoinFirstAssignedMode` 普通/困難改用 `generateWalletForAssignedMode`（服務價格 + 100~500 元）|
| A2 付款完成語音整合（2026-03-22）| A2 | coinFirst `selectService` 移除預播；`completePayment` 改 `speakCustom('付款完成，票卷列印中')` 同步觸發列印；`printTicket` 移除 `speech.speak('ticketPrinting')` |
| A2 燈號已亮任務彈窗修正（2026-03-22）| A2 | `showTaskPopup` + `closeTaskPopup` 偵測 `.coin-first-available`；已亮→「💡 請選擇服務」+「X的燈號已亮起，請點選X服務」|
| A2 元元語音重複（2026-03-28）| A2 | `selectService` line 5495：`convertAmountToSpeech` 已含「元」，模板多加一個 → 移除末尾 `元`；搜尋 `這個服務需要` |
| A2 coinFirst 亮燈改 price<=inserted（2026-03-28）| A2 | `updateServiceAvailabilityByAmount`：`inserted===price` → `price<=inserted`（同 A1 邏輯）；coinFirstAssigned 只對指定服務播語音/更新步驟，其他可負擔服務靜默亮燈；coinFirstFree 改批次語音 `已有N個服務可以選了`（700ms timer）；`selectService` normal/hard 模式 `assigned\|coinFirstAssigned` 均攔截錯選；easy 模式 coinFirstAssigned 也加錯選守衛；搜尋 `price <= inserted`、`已有${availCount}個服務可以選了` |
| A2 coinFirstAssigned 付款超額移除 cash 音效（2026-03-28）| A2 | `confirmMoneySelection` cash 音效條件加 `coinFirstAssigned` 排除：超額時不再誤播成功音效（300ms 後由 `_handleCoinFirstPaymentError` 播錯誤音）；搜尋 `_cfTaskType` |
| F3 觸控放置拖回 | F3 | `.placed-item` |
| F5 易模式隱藏測驗模式 | F5 | `updateTestModeVisibility` |
| F5 普通計分0/0 | F5 | `checkAnswer`, `handleCorrectAnswer` |
| 設定頁連結按鈕文字 | 全部 | `a:not(.selection-btn):not(.choice-btn)` |
| C3 答對語音 | C3 | `handleMultiRound`, `playFinalCompletionSpeech` |
| A4 同面額第2枚id重複 | A4 | `usedWalletIndices`, `Math.random.*1e9` |
| A4 executeNextPayment位置錯誤 | A4 | `data-position.*currentIndex`, `executeNextPayment` |
| A4 佈局修復3項 | A4 | `align-self:center`, `getProductIconHTML.*8rem`, `isBanknote.*money.value` |
| A4 點擊開始無反應 | A4 | `waitingForClick && !clickState.waitingForStart` |
| A4 步驟2flex缺失 | A4 | `showEasyModePriceConfirmation`, `price-formula-display` |
| A4 步驟4找零紙鈔偏小 | A4 | `changeImgStyle`, `showEasyModeChangeVerification` |
| A4 步驟3hint紙鈔偏小 | A4 | `isBanknoteHint`, `generatePaymentHints` |
| 錯誤邊界音訊誤觸發 | A4/A5/A6 | `if (!event.error) return` |
| calculateOptimalPayment防護 | A4/A6 | `❌ [A4-付款計算] 無效的目標金額` |
| F5 除以零防護 | F5 | `accuracy: this.totalAnswers > 0 ? Math.round` |
| F1 validateDrop重複定義 | F1 | `validateDrop`（現只有一處） |
| A6 console.log→Debug.warn | A6 | `Game.Debug.warn('sound'` |
| c6 圖片檔名修正 | images/c6/ | `icon-c6-star-sticker`, `icon-c6-mystery-gift` |
| clearTimeout(TimerManager ID) | A1/A2/A4/A6 | `_visualDelayTimer`, `_taskPopupTimeout` |
| F3 自訂主題上傳3項 | F3 | `TimerManager.setTimeout.*nameInput.*focus`, `image-preview-container` |
| 吉祥物尺寸48px | 15 JS | `educated_money_bag_character.*48px` |
| 吉祥物位置修正 | A1/A5/C2/C4/F2 | `hint-btn-wrapper`, `position:static;transform:none` |
| A4 困難第四步顯示商品 | A4 | `showNormalHardModeChangeVerification` |
| A6 skipOnInterrupt | A6 | `skipOnInterrupt` |
| A6 重新選擇presetTask | A6 | `savedPresetTask` |
| A6 確認付款脈動 | A6 | `classList.*ready`, `@keyframes pulse` |
| A6 確認付款hover橘色 | A6 | `confirm-payment-btn:hover` |
| A4 確認付款平板寬度 | A4 | `fit-content` |
| 自訂主題按鈕樣式 | F1/F5/F6 | `linear-gradient(45deg, #FF6B6B, #4ECDC4)` |
| A3 步驟3勾勾提示 | A3 | `exactMoney`, `optimalPaymentTargets`, `walletHintMoney` |
| A4 步驟3付款錯誤3項 | A4 | `你付了太多的錢，請重新付款`, `payment-hint-btn:hover` |
| A6 付款錯誤退幣+勾勾 | A6 | `validatePayment`, `付款金額不足，請重新付款` |
| F1/F3 上傳語音修復 | F1/F3 | `confirmAddCustomItem`, `Speech.speak.*addCustomItem` |
| C4 輔助點擊兩階段+hint CSS | C4 | `_closeInstructionModal`, `instruction-modal-overlay`, `unit4-easy-source-item:not(.assist-click-hint)` |
| C5 輔助點擊彈窗偵測 | C5 | `c5-instruction-modal`, `_closeInstructionModal` |
| C6 重複進題+過渡語音 | C6 | `nextQuestionScheduled`, `transitionText`, `進入第`, `測驗結束` |
| C/F 輔助點擊說明更新 | C1~C6, F1~F6 | `assist-click-group`, `啟用後，只要偵測到點擊` |
| A6 步驟6輔助點擊等待確認找零 | A6 | `executeNextChange`, `ChangeConfirm`, `enableClickModeWithVisualDelay` |
| hint 方框 ::before | A3/A4/A6 | `boxFramePulse`, `checkoutBoxFramePulse`, `confirmBoxFramePulse` |
| A4 步驟1兩段式點擊 | A4 | `closeTargetItemModal`, `autoSelectProduct`, `_taskModal.remove.*return` |
| A4 步驟2-4 hint 按鈕 | A4 | `waitingForConfirmPayment`, `needsNoChangeButton`, `confirm-easy-price-btn` |
| A3 步驟3/5/6 hint 按鈕 | A3 | `checkout-btn-hint`, `changeAmount === 0`, `pickup-order-btn` |
| F1 assist-click-hint CSS | F1 | `f1AssistBoxPulse`, `assist-click-hint`, `injectGlobalAnimationStyles` |
| F1 getItemName 擴展40圖示 | F1 | `getItemName`, `f1AssistBounce`, fallback `\|\| icon` |
| A 系列普通模式計時自動提示永久刪除（2026-03-20）| A1~A6 | `scheduleNormalModeHint`, `clearNormalModeHintTimer`, `normalHintDelay`, `normalModeHintTimer`, `normal-hint-delay-group` 全數移除；A5 `showATMEasyHint` 改用 `config.hintDelay` |
| F4 正確放置播數字語音（2026-03-20）| F4 | `handleInstantFeedback` 正確分支：`playSound('correct')` → `Speech.speak(numberBox.dataset.value)`；簡單模式＋輔助點擊均適用 |
| F4 簡單模式放置不重播語音（2026-03-24）| F4 | `handleInstantFeedback` 正確分支移除 `Speech.speak(numberBox.dataset.value)`；拖曳開始時播1次即可，放置時不再重播 |
| A2 普通模式 step1 指定任務改彈窗（2026-03-20）| A2 | `showNormalModeHint` step1：移除 `difficulty==='hard'` 限制，指定任務（普通+困難）統一呼叫 `showTaskPopup()`；自選任務維持光暈動畫 |
| A5 普通模式自動提示關閉（2026-03-20）| A5 | `DIFFICULTY_CONFIG.normal.autoShowHint: false`；`showATMEasyHint` 計時器條件加 `config.autoShowHint` 守衛，防止 `hintDelay > 0` 繞過設定直接啟動計時器 |
| B 系列 CSS 死碼清除（2026-03-20）| `b-series.css` | 移除舊完成畫面系統：`.b-completion`/`.b-completion-header`/`.b-trophy`/`.b-perf-badge`/`.b-stats-grid`/`.b-stat-card`/`.b-comp-btns`/`.b-btn-again`/`.b-btn-settings` + `@keyframes bBounce`（共 ~85 行）；全 B 系列 JS grep 驗證 0 引用 |
| B 系列設定頁無預選（2026-03-21）| B1~B6 | `questionCount: null`, `retryMode: null`（B1~B4）；`rounds: null`（B5/B6）；移除 HTML active 預選；`_checkCanStart()` 要求全選 |
| B3 簡單模式月曆改版（2026-03-21）| B3 | easy mode 改為月曆模擬：`_startCalendarSession`, `renderCalendar`, `_renderCalendarHTML`, `_bindCalendarEvents`, `_handleDayClick`, `_onCalendarGoalReached`；新增 `state.calendar`；設定頁動態顯示 `b3-cal-settings` / `b3-quiz-settings`；`b3_savings_plan.css` 新增 `b3-cal-*` CSS |
| B 系列設定頁視覺提升（2026-03-21）| `b-series.css` v2.9 | `.b-series .unit-welcome` amber 漸層；`welcome-content` 頂部 6px 邊框；`b-setting-group` 淺灰邊框；`b-sel-btn` 膠囊形；`b-setting-label` 橘色；`.b-series .start-btn/.back-btn` 主題色覆寫 |
| B3 月曆 UX 修正（2026-03-21）| B3 | 任務彈窗 `_showCalendarTaskPopup`；整合資訊卡 `b3-cal-info-card`；進度條上方金額 `b3-cal-curr-amount`；進度條右側 `%` + 目標；統計列合一；`_updateCalendarUI()` in-place 更新（不重繪整頁）；存錢格子 💰→🐷 |
| B3 月曆大改版（2026-03-21）| B3 | 真實金幣動畫 `_getMoneyImagesHTML`、`_spawnCoinParticles` 改 img；設定頁自訂物品 `b3CompressImage`, `_renderCustomItemsPanel`, `confirmAddCustomItem`；撲滿右側卡片 `_renderPiggyBankCard`, `_updatePiggyBankCard`；雙欄佈局 `b3-cal-layout` row + `b3-cal-center-col` + `b3-pig-card` 160px |
| B3 撲滿面額表格重設計（2026-03-21）| B3 | `_decomposeToDenominations`（貪婪分解，現已棄用於撲滿渲染）；`_renderPiggyBankCard(changedDenoms)`（grid 76px/1fr，硬幣55px/鈔90px）；`b3-pig-card` 改 flex:1；CSS：`b3-pig-row/label/imgs/img-wrap/img-new`, `b3ExchPop/b3ExchFade`（`_showExchangeBadge` 已於 2026-03-23 改為手動兌換按鈕）|
| 作業單按鈕文字更新（2026-03-21）| worksheet/ | `#print-btn` `下載 PDF`→`下載與列印`；下拉 `直接列印（備用）`→`直接列印`（移除 `color:#999` muted 樣式）|
| A1 提示鈕改顯示彈窗（2026-03-21）| A1 | `showNormalModeHint` step1：`assigned`（未選飲料）與 `coinFirstAssigned`（飲料亮起後未選）改呼叫 `showTargetItemModal()`；`document.getElementById('target-item-modal')` 防重複守衛 |
| A2 任務類型按鈕互斥修正（2026-03-23）| A2 | `bindSettingEvents` 按鈕 active 清除只針對同一 `.button-group`；加 `type==='taskType'` 時跨群組清除 `[data-type="taskType"]` |
| A2 付款提示模式取消鈕隱藏（2026-03-23）| A2 | `walletPaymentModal` 加 `hintShown` 讀取；`hintShown=true` 時隱藏「✕ 取消」按鈕，強制使用綠色勾勾金額完成付款 |
| A2 困難模式付款無語音（2026-03-23）| A2 | `selectMoneyNormalMode` 點擊金額語音改由 `difficulty !== 'hard'` 守衛；困難模式不播放金額語音 |
| A1 困難模式投幣無語音（2026-03-23）| A1 | `clickCoin` 最後/非最後硬幣語音改由 `difficulty !== 'hard'` 守衛；困難模式不播放 |
| A1 coinFirst 關閉任務彈窗不重複播投幣語音（2026-03-23）| A1 | `_initCoinFirstScreen` 普通/困難模式加 `insertedAmount < target.price` 守衛；已投足不再說「請投幣」 |
| A1 指定任務模式退幣鈕無效（2026-03-23）| A1 | `refundMoney` 加 `assigned`/`coinFirstAssigned` 早期攔截：播放「請完成接下來的步驟」並返回；適用全難度 |
| A1 自選模式退幣顯示彈窗（2026-03-23）| A1 | `refundMoney` 加 `freeChoice`/`coinFirstFree` + `insertedAmount>0` + `!productVended` 守衛；呼叫 `_showRefundModal(amount)` 顯示退回金額彈窗，確認後呼叫 `_executeRefund()` 歸還硬幣並重置 |
| A1 coinFirst 付款錯誤燈號重置（2026-03-23）| A1 | `showCoinsReturnAnimation` 開頭加 coinFirst 重鎖：移除 `coin-first-available`/`coin-first-unlocking`，加回 `coin-first-locked`；付款錯誤退幣後燈號立即變暗 |
| B3 簡單模式拖曳存錢（2026-03-23）| B3 | 點擊日曆格後啟動拖曳工作階段：`_startDragSession`→`_renderDailyItemsHTML`（來源卡）+`_renderDropZoneHTML`（淡化槽）；`_initCalendarDragAndDrop`（桌面 HTML5 + TouchDragUtility）；`_handleCoinDrop`（面額比對/勾勾動畫）；`_completeDragSession`（存錢完成，轉回原流程）；`b3-pig-col` 包裹右欄；CSS：`b3-drag-coin`/`b3-drop-slot`/`b3-slot-filled`/`b3-slot-check`/`b3-drop-wrong` |
| B3 設定頁價格區間 + 天數預覽（2026-03-23）| B3 | 新增 `🛒 購買物品金額` 選擇器（300/500/800元以內）；`state.settings.priceRange`；`_startCalendarSession` 改用 `B3_ALL_ITEMS.filter(i => i.price <= maxPrice)`；`_updateDaysPreview()` 在選擇區間/金額/自訂物品後更新；`_checkCanStart` 加 `!priceRange` 鎖定；`confirmAddCustomItem`/`removeCustomItem` 觸發 `_updateDaysPreview`；CSS：`.b3-days-preview` 淺黃背景卡 |
| B3 今日可存金錢卡常駐 + 撲滿結構重整（2026-03-23）| B3 | 今日可存金錢卡改為常駐（`renderCalendar` 直接含在佈局中）；點擊存錢格後填入金錢圖示、完成後清空恢復提示；撲滿頂部新增永久「存入金錢區」drop zone（`b3-pig-drop-zone` `display:none` 預設隱藏）；`🐷我的撲滿` 移至硬幣區上方（`.b3-pig-section-hd`）；`_updatePiggyBankCard` 改 target `#b3-pig-content`；`_completeDragSession` 拖曳完成即時更新撲滿（不等語音）；CSS：`b3-pig-drop-title`/`b3-pig-section-hd`/`b3-pig-section-title`/`b3-pig-section-total` |
| theme-switcher 面板隱藏 + 預設正常模式（2026-03-24）| `theme-system.js` | `createThemeSwitcher` 三處呼叫註解停用（面板不顯示）；`detectSystemPreference` 註解停用（不跟隨系統深色模式，固定 `ai-robot` 主題）；修復 Edge+LiveServer 深色問題（系統偏好被偵測導致黑色背景）；`initializeDragFunctionality` 同步停用 |
| B3 撲滿手動兌換（2026-03-23）| B3 | 移除自動兌換（`_decomposeToDenominations` 貪婪分解 → 改用 `c.denomPile` 逐枚記錄）；`EXCHANGE_RULES` 6條規則；每個面額行達兌換閾值時顯示綠色 `🔄 X個換1個Y元` 按鈕（`.b3-pig-exch-btn`）；`_handleExchange(from,count,to)` 更新 `denomPile`；`_bindCalendarEvents` 加委派點擊監聽；`_startCalendarSession` 補加 `denomPile:{}`/`drag:null` 欄位（修復 TypeError） |
| B6 困難模式找零三選一（2026-03-24）| B6 | `_showChange` 路由困難模式至 `_showChangeQuiz(paid,total,change)`；生成 ±偏移干擾項；答對→`.b6-change-opt-correct`+語音+800ms→`_showChangeResult`；答錯 retry→disable 該選項；答錯 proceed→顯示正確答案+1400ms→`_showChangeResult`；`g.correctCount++` 移至 `_showChangeResult`；CSS 新增 `.b6-change-question/.b6-change-opts/.b6-change-opt/-correct/-wrong` |
| B3 週數計算除法提示（2026-03-25）| B3 | `_showDivisionHint(question)`：答錯時在 `.b3-numpad-section` 末尾顯示「X元 ÷ Y元/週 ≈ Z週（無條件進位）」；`.b3-div-hint` 黃底琥珀框 `b3FadeIn`；proceed timeout 2200→2500ms |
| B5 超支智慧移除建議（2026-03-25）| B5 | `_handleConfirm` 超支分支：`selectedOptionals.sort(desc).find(i => total-i.price<=budget)` 貪婪單步建議；`suggestionHTML` 插入 `.b5-result-banner.fail`；`.b5-removal-hint` 黃底琥珀框 |
| B1 開題任務說明彈窗（2026-03-25）| B1 | `_showTaskModal(curr, diff)`：每題渲染後顯示全屏半透明彈窗；easy/normal 顯示目標金額（黃色大字）；hard 顯示「？元」；2000ms 自動關閉或點任意處關閉；C4 `_showInstructionModal` pattern |
| B4 視覺價差比例條（2026-03-25）| B4 | `_renderPriceBars(curr)`：在 `_renderDiffSection` 頂部顯示雙欄比例橫條；optA 紅漸層（貴）/ optB 綠漸層（便宜）；寬度依實際比例；`.b4-pbar-*` CSS；F5 量比較 pattern |
| B5 預算提示鈕（2026-03-25）| B5 | `_showBudgetHint()`：高亮可負擔未選商品（`.b5-hint-glow` 脈動 2 次）+ 語音「還剩X元可加選Y」；`.b5-hint-btn` 黃框按鈕；B1 `_showCoinHint` pattern |
| B2 easy 逐項動畫高亮（2026-03-25）| B2 | `_animateEasyEntries(question)`：easy 模式初始隱藏選項，逐項（每 800ms）高亮日記事件行（`.b2-entry-active` 黃底縮放）；全部完成後 500ms 淡出動畫顯示選項；C2 逐一計數 pattern |
| B6 正確商品彈出價格（2026-03-25）| B6 | `_showPricePopup(anchor, price)`：找到商品後列表項目彈跳（`.b6-list-bounce`）+ 綠色「+X元」浮動標籤（`b6PriceFloat` 上飄消失）；A4 交易摘要 pattern |
| B1 hard 模式隱藏費用（2026-03-25）| B1 | `_renderScheduleCard` isHard 分支：個別費用改顯示「??? 元」（`.b1-cost-hidden` 灰色斜體）；學生必須依賴語音聽到的金額計算；C1 困難模式僅聽聲音 pattern |
| B2 計算過程提示（2026-03-25）| B2 | `_showCalcBreakdown(question)`：普通/困難鍵盤模式答錯即顯示逐步算式（起/±事件/＝結果）；防重複守衛；retry 模式算式保留可參考重試；CSS：`.b2-calc-breakdown`/`.b2-bd-row`/`.b2-bd-op.income`（綠）/`.b2-bd-op.expense`（紅）/`.b2-bd-result` |
| B4 差額算式提示（2026-03-25）| B4 | `_showDiffFormulaHint()`：Diff 階段答錯即在選項上方顯示「XXX − YYY = ？ 元」；`state.currentDiffItem` 進入 diff 前保存（`handleSelectClick`）；防重複守衛；CSS：`.b4-diff-hint-formula`/`.b4-hint-label`/`.b4-hint-op`/`.b4-hint-blank` |
| B6 付款最佳面額提示（2026-03-25）| B6 | `_showPaymentHint(total)`：簡單/普通模式付款畫面新增「💡 提示」按鈕；貪婪演算法算出最少面額；`.b6-bill-hint` 高亮+脈動；`.b6-hint-toast` 文字提示+語音；6秒後自動清除；困難模式隱藏按鈕 |
| B6 攤位需求件數徽章（2026-03-25）| B6 | `_renderShoppingUI` stallTabsHTML：依 `mission.items.filter(i=>i.stall===k)` 計算每攤位待收件數；紅色數字 `.b6-stall-badge`（有剩）/ 綠色 ✓ `.b6-stall-badge-done`（全收完）；切換攤位重繪自動更新；C5 指示燈 pattern |
| B4 完成畫面累計節省（2026-03-25）| B4 | `quiz.totalSaved`（init/reset/startGame 三處歸零）；`handleDiffAnswer` 答對時 `+= correctDiff`；`showResults` 以 `.b4-savings-banner` 黃色橫幅顯示「你總共省了 X 元」；A4 交易摘要 pattern |
| B3 月曆進度里程碑（2026-03-25）| B3 | `_completeDragSession` 存入後偵測 25/50/75% 閾值（`prevPct < m && newPct >= m`）；`_showMilestoneBadge(pct)` 顯示中央浮動徽章（`b3MilestonePop`+`b3MilestoneFade` 2.2s）；F2 里程碑音效 + A3 任務彈窗 pattern |
| B5 關卡轉場卡（2026-03-25）| B5 | `_showRoundTransition(roundNum, callback)`：`nextRound()` 改呼叫此方法；紫色全屏覆蓋卡「第X關」1.1s + 淡出 0.3s + callback；`b5RtIn` 彈出動畫；C6 transitionText pattern |
| B2 easy 逐項小計顯示（2026-03-25）| B2 | `_animateEasyEntries` 插入 `#b2-running-total` 卡；每步高亮同步更新餘額；`b2-rt-up`（綠，收入）/`b2-rt-down`（紅，支出）；`b2RtPop` 彈出動畫；F5 視覺化 pattern |
| B1 放幣語音反饋（2026-03-25）| B1 | `addCoin(denom)` 末尾加 `TimerManager.setTimeout(() => Speech.speak(\`${denom}元\`), 80, 'ui')`；coin.mp3 先播完再語音；F4 instant feedback + C1 coin recognition pattern |
| A4 困難模式實付金額顯示0元（2026-03-25）| A4 | `proceedWithPaymentSuccess` speech callback 開頭加 `this.state.gameState.currentTransaction.amountPaid = paidAmount`；防止非同步期間 amountPaid 被清零導致 `renderCalculationSceneUI` 顯示錯誤；`changeExpected` 計算不受影響 |
| A5 簡單+輔助模式彈窗無法點擊（2026-03-25）| A5 | `task-reminder-modal`/`amount-reminder-modal`/`transfer-amount-reminder-modal` z-index 從 10000 改為 10200；原因：`click-exec-overlay` z-index=10100 覆蓋彈窗，`event.target` 為遮罩非彈窗按鈕，click mode 攔截點擊 |
| A5 三個流程提示彈窗改為低於遮罩（2026-03-25）| A5 | `clickMode ? 10050 : 10200`；`showTaskReminderModal`/`showAmountReminderModal`/`showTransferAmountReminderModal`；輔助點擊模式改為遮罩下方，由 `autoCloseModal` 統一處理；全專案掃描：B/C/F 系列無此問題 |
| A5 轉帳 hint-modal 列入點擊隊列（2026-03-25）| A5 | `transferBank`/`transferAccount`/`transferAmount` 隊列首位加 `closeModal`（`bank-code-hint-close-btn`/`account-hint-close-btn`/`transfer-amount-hint-close-btn`）；三個按鈕加 id；`autoCloseModal` 新增對應分支（查 `#hint-modal-overlay` → remove → executeNextAction）|
| A5 takeReceipt 快速點擊凍結（2026-03-25）| A5 | `receiptTaken` 守衛加 `isExecuting = false`（防永久凍結）；`autoTakeReceipt` 提前在找到按鈕時設 `receiptTaken = true`（縮短競態視窗，原在 300ms timer 內）|
| A5 取卡步驟快速點擊卡死（2026-03-25）| A5 | `transitionPhase` 安全網加 `safetyPhase` 相位守衛（`currentPhase === safetyPhase`，防舊階段 1.5s timer 跨相位觸發）；`autoTakeReceipt` poll 開頭加 `receiptTaken` 早退守衛（防兩個並行 poll 實例）；`autoTakeCard` 列印流程改為輪詢：點卡片圖片觸發動畫 → 輪詢等 `#take-card-btn`（1800ms 後出現）→ 點擊後才播煙火並繼續（原先 2000ms 固定等待導致提前轉 `takeReceipt`）|
| A5 標題列轉帳步驟計數修正（2026-03-25）| A5 | `updateTitleBar` 分母改動態：`getActualSessionType()==='transfer'?8:5`；轉帳共 8 步，其他操作 5 步；隨機模式透過 `currentRandomType` 自動判斷 |
| B5 轉場卡語音「第N關」（2026-03-26）| B5 | `_showRoundTransition` 加 `Game.Speech.speak(\`第${roundNum}關\`)` |
| B6 攤位切換語音（2026-03-26）| B6 | stall-tab click 加防重複守衛 + `Game.Speech.speak(B6_STALLS[stall].name)`；`所有商品收集完成，可以去結帳了！` 在 allDone 時觸發 |
| B2 errorCount 機制（2026-03-26）| B2 | `quiz.errorCount` 計數；choice retry 答錯 ≥3 次自動呼叫 `_showCalcBreakdown`；`nextQuestion` 重置 |
| B4 selectErrorCount 高亮提示（2026-03-26）| B4 | `quiz.selectErrorCount` 計數；select retry 答錯 ≥3 次語音說出正確店名 + `.b4-select-hint` CSS 脈動高亮；CSS：`b4SelectHint` |
| B6 找到商品語音（2026-03-26）| B6 | `_showPricePopup` 呼叫點加 `Game.Speech.speak(\`${itemData.name}，${itemData.price}元\`)` |
| B4 困難模式差額提示鈕（2026-03-26）| B4 | `_renderDiffSection` hard 分支加 `<button class="b4-diff-hint-btn" id="b4-diff-hint-btn">💡 提示</button>`；click 呼叫 `_showDiffFormulaHint()` + 語音 `${optA.price}減${optB.price}`；CSS：`.b4-diff-hint-btn` |
| B2 開題起始金額彈窗（2026-03-26）| B2 | `_showTaskIntroModal(question)`：每題渲染後顯示全屏半透明彈窗，顯示起始金額橘色大字；2200ms 自動關閉或點任意處關閉；語音「本週零用錢，起始X元」；B1 `_showTaskModal` pattern；CSS：`.b2-task-intro-*` |
| B6 付款足額語音（2026-03-26）| B6 | `_updatePaidDisplay` 加 `wasSufficient` 守衛；首次達到足額：剛好→「金額剛好，可以付款了！」；超過→「超過X元，找零後可以付款！」 |
| B1 錢包足夠語音（2026-03-26）| B1 | `_updateWalletDisplay` 加 `wasSufficient` 守衛；`!wasSufficient && enough && total>0` 時說「金額足夠，可以出發了！」；B6 `wasSufficient` pattern |
| B5 商品點選語音（2026-03-26）| B5 | `_bindRoundEvents` 卡片點擊後加語音：選擇→「{名稱}，{價格}元」；取消→「取消{名稱}」；A4 shopping speech pattern |
| B3 quiz 存錢目標開題彈窗（2026-03-26）| B3 | `_showSavingsGoalModal(question)`：顯示物品圖示/名稱/價格；2500ms 自動關閉；語音「存錢目標：{名稱}，{價格}元」；B2 `_showTaskIntroModal` pattern；CSS：`.b3-goal-modal*` |
| B4 比價語音含雙店價格（2026-03-26）| B4 | `renderQuestion` 語音改為 `{名稱}，{A店}X元，{B店}Y元，哪個比較便宜？`；對齊 A/C/F 讀出題目所有數字 pattern |
| B6 清除付款語音（2026-03-26）| B6 | `_bindPaymentEvents` clear 按鈕加 `Game.Speech.speak('清除，重新選擇')` |
| B5 超支建議商品高亮（2026-03-26）| B5 | `_handleConfirm` 超支分支：`suggestion` 存在時 800ms 後加 `b5-hint-glow` 至建議移除的卡片（2400ms 後移除）；B5 `_showBudgetHint` pattern |
| B2 easy 逐項事件語音（2026-03-26）| B2 | `_animateEasyEntries` 每步高亮時加 `Game.Speech.speak('收入X元'/'花了X元')`；C1 逐一計數 pattern |
| B3 quiz 答對語音含週存與商品名（2026-03-26）| B3 | choice + numpad 答對語音改為 `每週存X元，需要Y週，就能買Z了！`；強化除法概念連結 |
| C3 金錢區外框自適應（2026-03-26）| C3 | 移除 `min-height: 124/144/156px`；`height: 120px/80px` → `auto`；`.unit3-banknote-container .unit3-banknote { width: 120px !important; height: auto !important; max-height: none !important }`（0-2-0 + !important 解決 `.money-item img` 0-1-1 覆蓋）；padding `8px` → `2px` |
| C3 設定頁兌換組合改版（2026-03-26）| C3 | 標題改「小換大」/「大換小」（`#333`）；末尾加 `🎲 隨機`（`data-type="random-pair"`，與一般 `selection-btn` 同樣式）；`pair = { type, random: true }`；`generateQuestions()` 每題用 `activePair` 隨機挑選；`start()` 加 `pair.random` 語音守衛 |
| C3 「大換小」標題字色修正（2026-03-26）| C3 | `renderPairButtons()` 大換小 h4 字色 `#fff` → `#333`；Grep `大換小.*color` 定位 |
| C3 兌換區金額數字間距修復（2026-03-26）| C3 | `getCommonCSS()` inline style `.money-value { margin: 1px 0 0 0 }` → `margin: 6px 0 0 0`；外部 CSS 的 8px 被 inline style 覆蓋，根因在此；另補 `.money-label` CSS（`target-money` 的標籤 class）|
| C3 提示鈕4項修正（2026-03-27）| C3 | Issue1：`showNormalModeHint` 改用 `requiredSourceCounts[currentRound]`（非 `exchangeRate`）；Issue2：`const gameState = this.getGameState('gameState')`（原 `this.state.gameState` 永遠是 `{}`）；`exchangeZone.innerHTML=''` → 保留 `.placed-coins-container`/`.drop-hint` 結構；Issue4：`handleDrop` `let droppedElement` + `.dragging` fallback；`processDropToFlexibleZone` clone 後 `delete newCoin.dataset.dragHandled`；hint 退回元素 ID 用 `baseCoinId`（去 `source-item-` 前綴） |
| C6 我的錢包新增🎲隨機（2026-03-27）| C6 | `walletAmount==='random'`；`generateQuestion` 每題隨機抽 [10,50,100,500,1000]；`effectiveItemTypes` 依實際金額決定物品類型；`c6-random-wallet-hint` 提示文字 |
| C3 兌換主類別「🎲 全隨機」（2026-03-26）| C3 | `renderCategoryButtons()` 末尾加 `data-type="all-random-category"` 按鈕；`handleSelection()` 加 `all-random-category` 分支：`category='all-random'`、`pair={random:true,type:'all'}`；`renderPairButtons()` 全隨機時顯示提示；`generateQuestions()` 加 `isAllRandomMode`：收集三類別全部 22 個 pairs，每題隨機抽，`lastExchangeKey` 機制防連續重複 |
| B1 面額使用統計（2026-03-27）| B1 | 完成畫面新增「🪙 面額使用統計」：`state.quiz.denomStats`累計；`addCoin(denom)` 加 `denomStats[denom]++`；`showResults()` 渲染面額圖示+次數格子；CSS `.b-res-denom-stats/.b1-stat-grid/.b1-stat-item` 加入 `b1_daily_budget.css`；C1 計數統計 pattern |
| B5 派對物品回顧（2026-03-27）| B5 | 完成畫面新增「🎉 本次派對採購物品」：`state.game.successfulRoundItems[]`；`_handleConfirm` 答對分支收集 `${icon} ${name}`（去重）；`showResults()` 渲染粉色標籤泡泡；CSS `.b5-res-party-review/.b5-party-tags/.b5-party-tag` 加入 `b5_party_budget.css`；A4 交易摘要 pattern |
| B6 採購收據（2026-03-27）| B6 | 完成畫面新增「🧾 採購收據」表格：`state.game.receipts[]`；`_showChangeResult` 儲存 `{items,total,paid,change}`；`showResults()` 渲染 5 欄表格（關卡/商品/小計/付款/找零）；CSS `.b6-res-receipt/.b6-receipt-table` 加入 `b6_market_shopping.css`；A3/A4 收據風格 pattern |
| B2 記帳日記回顧（2026-03-26）| B2 | 完成畫面新增「📒 記帳日記回顧」：`state.quiz.answeredHistory[]`；`_handleChoiceAnswer`+`_handleNumpadAnswer` 答對時 `push({startAmount,events,answer})`；`showResults()` 渲染綠框斑馬表格，收入綠膠囊/支出紅膠囊；CSS `.b2-res-diary/.b2-hist-table/.b2-hist-ev` 加入 `b2_allowance_diary.css` |
| B1 行程費用清單（2026-03-27）| B1 | 完成畫面新增「📋 完成的行程」：`state.quiz.solvedSchedules[]`；`handleConfirm()` 答對時 `push(questions[currentQuestion])`；`showResults()` 渲染藍框列表（emoji+名稱+項目金額列表+合計）；CSS `.b1-res-schedules/.b1-schedule-row/.b1-sch-*` 加入 `b1_daily_budget.css` |
| B2 本期收支總計（2026-03-27）| B2 | 完成畫面新增「💰 本期收支總計」：無新 state，從 `answeredHistory` 派生計算 totalIncome/totalExpense/net；`showResults()` 渲染灰框三欄（收入綠/支出紅/淨餘額藍或黃）；CSS `.b2-res-totals/.b2-totals-row/.b2-total-item` 加入 `b2_allowance_diary.css` |
| B5 各關預算使用統計（2026-03-27）| B5 | 完成畫面新增「📊 各關預算使用」：`state.game.roundStats[]`；`_handleConfirm()` 答對時 `push({roundNum,budget,spent})`；`showResults()` 渲染綠框橫條圖（ok=綠/near=橙/over=紅）；CSS `.b5-res-budget-stats/.b5-budget-bars/.b5-bar-fill` 加入 `b5_party_budget.css` |
| B3 存錢統計摘要（2026-03-27）| B3 | 完成畫面第二頁目標清單下新增三格摘要（目標數量/合計金額/平均週數）；無新 state，從 `achievedGoals` 派生；CSS `.b3-goal-summary/.b3-gs-item/.b3-gs-val` 加入 `b3_savings_plan.css` |
| B4 省錢排行榜（2026-03-27）| B4 | 完成畫面新增「🏅 省錢排行榜」top-3 medals；無新 state，從 `comparisonHistory` 排序；`savingsRankHTML` 在比價歷程前渲染；CSS `.b4-res-ranking/.b4-rank-row/.b4-rank-medal` 加入 `b4_sale_comparison.css` |
| B6 攤位消費分析（2026-03-27）| B6 | 完成畫面新增「🏪 攤位消費分析」橫條圖；`state.game.stallStats{}`；`_showChangeResult()` items 迴圈中累計；`showResults()` 渲染黃框比例條；CSS `.b6-res-stall-stats/.b6-stall-fill` 加入 `b6_market_shopping.css` |
| B4 省錢 toast（2026-03-27）| B4 | diff 答對後立即顯示固定底部浮動 toast「💰 省了X元！」；`_showSavingsToast(amount)`；`handleDiffAnswer` 正確分支呼叫；`@keyframes b4ToastUp` 升起+淡出；`pointer-events:none` 不干擾操作 |
| B6 關卡完成轉場卡（2026-03-27）| B6 | 非最後關「下一關」改呼叫 `_showRoundCompleteCard(…)`；深綠全屏卡含關卡號/商品列表/付款摘要；1.5s 自動或點任意處前進；`@keyframes b6RcIn`；最後關直接 `nextRound()` |
| B2 最大收支記錄（2026-03-27）| B2 | 完成畫面新增「📌 本期最大記錄」；從 `answeredHistory[].events[]` 求最大值；無新 state；CSS `.b2-res-max-records/.b2-max-item.income/expense` 加入 `b2_allowance_diary.css` |
| B3 存錢目標清單（2026-03-26）| B3 | 完成畫面第二頁新增「🐷 存錢目標清單」：`state.quiz.achievedGoals[]`；答對時 `push({item,weekly,answer})`；第二畫面條件渲染 `.b3-res-goals` 卡片列（icon+名稱+售價+每週×週數）；CSS `.b3-res-goals/.b3-goal-row/.b3-goal-*` 加入 `b3_savings_plan.css` |
| B4 比價歷程表（2026-03-26）| B4 | 完成畫面新增「🛒 比價歷程」4欄表格（商品/便宜/較貴/省下）：`state.quiz.comparisonHistory[]`；`handleDiffAnswer` 答對時從 `state.currentDiffItem` 取資料 push；`showResults()` 節省橫幅後渲染橘框斑馬表；CSS `.b4-res-compare/.b4-cmp-table/.b4-cmp-cheap/exp/saved` 加入 `b4_sale_comparison.css` |
| B5 每關開場預算介紹卡（2026-03-27）| B5 | `renderRound()` 末尾呼叫 `_showRoundIntroCard(roundNum, budget)`；紫色半透明全屏蓋板 + 白卡顯示關卡/🎂/預算大字；語音整合（移除舊 400ms speech timer）；1800ms 或點擊後 fade；CSS `.b5-round-intro`/`b5RiIn`/`.b5-ri-*` 加入 `b5_party_budget.css` |
| B3 quiz 答對連勝徽章（2026-03-27）| B3 | `state.quiz.streak` 計數；`_handleChoiceAnswer`/`_handleNumpadAnswer` 正確 `streak++`、錯誤 `streak=0`；達 3/5 題觸發 `_showStreakBadge(streak)`；橘金色 badge 置中彈出 + 語音；CSS `.b3-streak-badge`/`b3SbPop` 加入 `b3_savings_plan.css` |
| B1 投幣剛好浮動提示（2026-03-27）| B1 | `_updateWalletDisplay` 加 `total === required` 判斷；剛好時呼叫 `_showExactMatchToast()` + 語音「剛好！不需要找零，可以出發了！」；底部深綠 toast `b1ToastUp` 升起；CSS `.b1-exact-toast`/`b1ToastUp` 加入 `b1_daily_budget.css` |
| C4 提示鈕持久化（2026-03-27）| C4 | `applyHintMarkings(mode)` 新函數；`hintedCoinIds` 存於 `state.gameState`（跨重繪持久，`loadQuestion` 建立新 gameState 時自動清除）；`showNormalModeHint`/`showHardModeHint` 改為：清空 droppedItems→從全部 sourceCoins 算解法→儲存 `hintedCoinIds`→re-render；`renderNormalMode`/`renderHardMode` 末尾呼叫 `applyHintMarkings`；移除 5 秒自動消除 timer |
| A4 購買任務彈窗商品圖片（2026-03-27）| A4 | `showTargetItemModal` 內 `getProductIconHTML(targetItem, '100px')` → `'128px'` |
| C5 錢不夠差額圖示（2026-03-27）| C5 | `buildShortfallHTML(shortfall)`：貪婪分解→紙鈔 72px/硬幣 44px img；`showMessage` 新增第 4 參數 `extraHTML`（不語音朗讀）；`handleJudgment` 正確+不夠路徑傳入差額 HTML |
| C4/C5 面額預設按鈕（2026-03-27）| C4/C5 | `applyDefaultDenominations()`：依位數套用 presets（1→[1,5]；2→[1,10,50]；3→[10,100,500]；4→[100,500,1000]）；`querySelectorAll('[data-type="denomination"]')` 直接 `classList.toggle('active')` 不重繪頁面；按鈕置於 💰 面額選擇標題正下方第一列，樣式同 `selection-btn` |
| C4/C5 面額預設鈕記憶+位數連動（2026-03-27）| C4/C5 | `state.settings.usingPreset` flag；`applyDefaultDenominations` 設 flag + 按鈕 active；手動改面額清除 flag；digits 切換時若 flag=true 自動重新套用預設 |
| F4 排序數量預設選項（2026-03-27）| F4 | `sortingCounts.preset`（value:10, order:0）排在「3個數字」前；所有條目補 order 1–6；`getSettingOptions` 既有排序邏輯自動生效 |
| C6 我的錢包新增🎲隨機（2026-03-27）| C6 | `walletAmount==='random'`；`generateQuestion` 每題隨機抽 [10,50,100,500,1000]；`effectiveItemTypes` 依實際金額決定物品類型；`c6-random-wallet-hint` 提示文字 |
| C5 困難模式提示鈕加語音（2026-03-27）| C5 | `setupHardModeEventListeners` 提示鈕顯示總額後加 `speech.speak('目前總額是X元')`；同普通模式 `convertToTraditionalCurrency` pattern |
| C5 簡單模式完成音效與語音（2026-03-27）| C5 | `checkEasyModeAutoJudgment`：錢不夠路徑 `playError02Sound()` → `playCorrectSound()`；`handleJudgment` autoJudgmentData：兩路完成訊息改 `恭喜你數完了！` |
| C6 測驗頁step1整合卡片+C5風格版面（2026-03-27）| C6 | `item-payment-section` 合併商品+付款區；`ip-title-row` 標題置中；`item-info-compact` 水平排；圖片 180px；`border:2px solid #4CAF50`、`padding:20px`、自然高度；`#payment-drop-zone min-height:140px` |
| C6 找零頁step2滿版面（2026-03-27）| C6 | `game-container flex column min-height:100vh`；`c6-step2-container flex:1 width:100%`；圖片 180px；`item-info-compact` 水平排 |
| C6 找零金額框垂直距離縮小（2026-03-27）| C6 | `change-question-area` margin/padding 縮小；`change-title` 1.4em；`change-amount-highlight` padding 8px；`change-options-area` padding-top 12px；`change-option` padding 12px |
| C6 困難模式商品資訊置中+紙鈔放大（2026-03-27）| C6 | `item-info-section` 加 `align-items:center`；找零選項紙鈔 80px→110px，硬幣 60px |
| C6 找零選項均分寬度（2026-03-27）| C6 | `change-options width:100%` 移除 `flex-wrap`；`change-option` 移除 `max-width`、`min-width:0` |
| C2 金錢數量預設顯示範圍（2026-03-27）| C2 | 設定頁 `moneyQuantity==='default'` 按鈕文字 `預設`→`預設(5-20)` |
| 全單元設定頁隨機圖示後移（2026-03-27）| A5/C3/C6/F1~F6 | `🎲 隨機`→`隨機 🎲`；`🎲 全隨機`→`全隨機 🎲`；A5/F5獨立`隨機`補`🎲`；F6`🎨 圖示主題`→`🎨 主題選擇` |
| C3 金錢卡底部間距縮小（2026-03-27）| C3 | `getCommonCSS()` `.money-value { padding: 0 0 3px 0 }` → `padding: 0`；移除金額文字下方 3px 間距，底部邊線緊靠數字 |
| C3 紙鈔外框底部貼近文字（2026-03-28）| C3 | 根因：`c-series.css .c-series .money-item { min-height: 120px }` 未被覆蓋，卡片高度強制 120px 造成文字與底線間大量空白；修法：`getCommonCSS()` 三處 `.unit3-banknote-container` 規則加 `min-height: 0 !important`；`padding-bottom: 0 → 4px`；關鍵字：`min-height: 0 !important`、`padding: 2px 2px 4px 2px` |
| B1~B6 report 新增觸控與版面章節（2026-03-27）| B1~B6 report | B1 補 九/十；B2 補 十/十一；B3 補 十一/十二；B4 補 十/十一；B5 補 十/十一；B6 補 十四/十五；各含觸控桌面支援、版面結構 ASCII 圖、CSS 類別表 |
| B1 場景類別篩選（2026-03-29）| B1 | `cat` 欄位加入 `B1_SCENARIOS`（school/food/outdoor/entertainment/shopping）；設定頁「🗂️ 場景類別」6 選項；`_generateQuestions` 依 `sceneCategory` 篩選 pool；`_checkCanStart` 加守衛；`_renderHeader` 顯示類別；完成畫面加「專注練習：XXX 場景」；擴充題庫至 39 組；A4 store type + C4 denomination 模式 |
| B5 派對主題篩選（2026-03-29）| B5 | `B5_THEMES` 物件（birthday/halloween/picnic）各含 `allItems[]`+`scenarios{easy,normal,hard}[]`；`partyTheme: null` 設定；設定頁「🎪 派對主題」4 選項含「隨機 🎲」；`_pickScenarios` 隨機模式每關添加 `_themeKey`；`renderRound` 讀 `scenario._themeKey`；`_showRoundIntroCard` 顯示主題圖示；完成畫面標題動態「${icon} 本次${name}採購物品」；A4 store type pattern |
| B2 日記主題篩選（2026-03-29）| B2 | `B2_THEMES` 物件（school/holiday/family）各含 easy/normal/hard `templates[]`；`diaryTheme: null` 設定；設定頁「📓 日記主題」4 選項含「隨機 🎲」；隨機模式三主題合併 flatMap 每題抽取；`_checkCanStart` 加 `diaryTheme` 守衛；header 中心欄顯示主題；完成畫面「記帳日記回顧」標題動態顯示；B5 partyTheme pattern |
| B6 市場類型篩選（2026-03-29）| B6 | `B6_MARKETS` 物件（traditional/supermarket/nightmarket）各含 `stalls{}`+`missions{}`；`_currentStalls`/`_currentMissions` 模組變數（`startGame` 設定）；`marketType: null` 設定；設定頁「🏪 市場類型」4 選項含「隨機 🎲」；隨機模式每關 `_mktKey` 動態切換 `_currentStalls`；header 顯示市場名稱；`activeStall` 改 `Object.keys(_currentStalls)[0]`；A4 store type pattern |
| B3 目標類別篩選（2026-03-29）| B3 | `cat` 欄位加入 `B3_ALL_ITEMS`（toy/book/outdoor/tech）；`itemCat: 'all'` 設定（非必選，預設全部）；設定頁困難模式顯示「🗂️ 目標類別」5 選項（含全部）；`_generateQuestions` 依 `itemCat` 篩選 pool，少於 2 項時 fallback；`showResults` 目標清單標題顯示類別；B1 sceneCategory pattern |
| B4 單位比價模式（2026-03-29）| B4 | `B4_UNIT_ITEMS`（12 組，含 `qty/unit` 欄位，optA 每單位貴/optB 便宜）；`compareStores=unit`；`_generateQuestions` 計算 `perA/perB/diff`；`_renderOptionCard` unit 模式顯示 qty+每單位橘標；`_renderPriceBars` 用 perA/perB；`_getDiffOptions` 改小差值 [1-8]；`_showDiffFormulaHint` 除法算式；speech 改「划算/每X差N元」；`comparisonHistory` 含 `isUnit/unit` 欄位 |
| B4 三商店排序模式（2026-03-28）| B4 | `B4_TRIPLE_ITEMS`（15 組三店）；`compareStores` 設定（`two`/`triple`/`unit`）；`isTriple` 題目旗標；easy/normal 選最便宜→差額三選一；hard 依序點選 1️⃣2️⃣3️⃣；`_renderTripleQuestion`/`_bindTripleEvents`/`_handleTripleSelectClick`/`_handleTripleRankClick`/`_renderTripleDiffSection`；`tripleClickOrder[]`；`.b4-triple-grid/.b4-triple-card/.b4-rank-badge` CSS；F4 排序 pattern |
| B1 最少張數提示（2026-03-28）| B1 | 答對後比較實際用幣數 vs `_calcOptimalCoins` 最少數；超過時顯示橘色底部 toast「你用了N張，其實最少只需要M張！」；`_showMinCoinsHint(walletTotal, requiredTotal)`；`.b1-min-coins-toast` CSS；C4/C6 最佳付款 pattern |
| B1~B6 連勝徽章（2026-03-28）| B1~B6 | `quiz.streak`/`game.streak` 計數；答對 +1，答錯清零；達 3/5 題觸發 `_showStreakBadge(streak)`；橘金色置中徽章 + 語音；`.bX-streak-badge`/`.bX-sb-inner`/`bXSbPop` CSS；B3 streak pattern |
| B1 費用明細提示（2026-03-28）| B1 | 困難模式答錯後 400ms 顯示費用明細卡：`_showScheduleBreakdown(question)` 列出每項費用+合計；普通模式 3 次錯誤後 900ms 顯示；`.b1-breakdown` 黃框；`b1FadeIn` 動畫；B2 breakdown pattern |
| B5 預算儀表條（2026-03-28）| B5 | `_updateTotalBar()` 同步更新 `#b5-budget-meter-fill`（0%→100%，green→amber→red）+ `#b5-meter-label` 百分比；HTML 插在 `.b5-total-bar` 下方；`.b5-budget-meter/.b5-budget-meter-fill` CSS；F5 量比較 pattern |
| B6 關卡開場任務彈窗（2026-03-28）| B6 | `renderRound()` 呼叫 `_showMissionIntroModal(mission, roundNum)`；顯示本關購買清單（綠色膠囊）+ 預算大字；語音「第N關，今天要買：X、Y，預算M元」；2800ms 自動關閉或點擊關閉；`.b6-mission-intro/.b6-mi-card/.b6-mi-item` CSS；B1 `_showTaskModal` pattern |
| B3 週數預覽方塊（2026-03-28）| B3 | quiz 模式：選擇/輸入答案時即時渲染小方塊預覽週數；`_updateWeekPreview(n, question)`；上限 16 格 + `+N` 溢出；正確答案時 `.correct` 綠色；`b3BlockPop` 動畫；F5 量比較 pattern |
| B5 確認按鈕 ready 脈動（2026-03-28）| B5 | `_updateTotalBar()` 加 `btn.classList.toggle('ready', canConfirm)`；`#b5-confirm-btn.ready` CSS `b5ConfirmPulse` 動畫（綠光縮放）；A6 確認付款脈動 pattern |
| B6 錯誤商品攤位提示（2026-03-28）| B6 | 點到不在清單的商品時，額外顯示「這裡需要：X、Y」（`.b6-wt-hint` 綠字）；`neededAtStall` 過濾此攤位未收集需求；`.b6-wrong-tip` 整合容器（深色背景 + `b6WtIn` 動畫）|
| B1 行程卡精準金額綠光（2026-03-28）| B1 | `_updateWalletDisplay` 加 `.b1-schedule-card.exact-match`；剛好符合時 `b1ExactGlow` 脈動綠框；移除時同步清除 CSS class |
| B4 三商店困難自動提示（2026-03-28）| B4 | `_bindTripleEvents` hard 模式：10 秒無點擊後 `tcard-cheapestIdx` 加 `.b4-triple-auto-hint`（綠框 `b4AutoHintPulse` 3 次）+ 語音「提示：先找最便宜的」|
| B1~B6 輔助點擊模式（2026-03-28/29）| B1~B6 | `AssistClick` 模組（`Game.init()` 前獨立區塊）；設定頁新增「🤖 輔助點擊」啟用/停用選項；`_checkCanStart` 加 `clickMode` 守衛；B2：easy 高亮正確選項，normal/hard 逐位數+確認；B4：select 高亮正確卡，diff normal 高亮 `.b4-diff-opt`，diff hard 逐位數+`btn-ok`，三商店 hard 依 `rankOrder` 逐張；B1：`_pendingAction` 單步模式，貪婪選最大面額，不足→投幣，足夠→confirm；B3：hard quiz only，純 numpad 逐位數+ok；B5：confirm 直接可點則高亮，否則高亮可負擔商品；B6：shopping→切換攤位→點商品→checkout，payment→貪婪選面額→pay，change quiz→正確選項；`b-series.css` 新增 `.assist-click-hint`/`bAssistPulse`；搜尋 `b1-assist-overlay`、`b2-assist-overlay`、`b3-assist-overlay`、`b4-assist-overlay`、`b5-assist-overlay`、`b6-assist-overlay` |
| B4 商品類別篩選（2026-03-29）| B4 | `cat` 欄位加入 `B4_ITEMS`/`B4_TRIPLE_ITEMS`/`B4_UNIT_ITEMS`（food/stationery/daily/clothing）；`itemCat:'all'` 預設（非必選）；設定頁「🏷️ 商品類別」5 選項；`_generateQuestions` 依 `cat` 篩選，少於 2 項 fallback；header 顯示類別；B3 itemCat pattern |
| B4 開題商品介紹彈窗（2026-03-29）| B4 | `_showItemIntroModal(curr)`：每題渲染後顯示商品 icon+名稱+兩店價格 vs 對比；1800ms 自動關閉或點擊；`.b4-intro-card/.b4-intro-store/.b4-intro-vs/.b4-intro-question` CSS；`b4IntroIn` 動畫；B1 `_showTaskModal` + B6 mission intro pattern |
| B5 超支費用明細展開（2026-03-29）| B5 | `_handleConfirm` 超支分支：渲染所有已選商品的費用明細表格（合計/預算/超出）；超出金額同時顯示百分比「超出 X%」；`.b5-breakdown/.b5-bd-row/.b5-bd-over/.b5-bd-total` CSS；B1/B2 breakdown pattern |
| B6 找零算式提示（2026-03-29）| B6 | `_showChangeFormula(paid,total,change)`：change quiz 答錯時在選項下方顯示「付X元 − 商品Y元 = Z元」公式；`.b6-change-formula/.b6-cf-item/.b6-cf-op/.b6-cf-ans` CSS；B4 diff formula pattern |
| B4 節省百分比（2026-03-29）| B4 | `_showSavingsToast` 改為「省了 X 元（省 Y%）」；高價格 optA.price 為計算基準；unit 模式用 perA；B4 savings toast pattern |
| B2 收支類型徽章（2026-03-29）| B2 | `_renderQuestionHTML` 每條事件行加 `.b2-type-badge income/expense`（「收入 📥」/「支出 📤」）；金額前加 +/- 符號；移除舊 `::before` 偽元素；CSS 綠/紅膠囊徽章 |
| B6 第一關進場語音（2026-03-29）| B6 | `_showMissionIntroModal` roundNum===1 時加「歡迎來到{市場名}！」前綴；`roundTitle` 顯示市場 icon+名稱；隨機市場模式讀 `mission._mktKey` |
| B4 三商店獎台動畫（2026-03-29）| B4 | `_showPodiumAnimation(curr)`：triple 排序正確後顯示 2nd/1st/3rd 獎台動畫；`b4PodiumRise` 動畫；F4 排序 + C5 差額圖示 pattern；搜尋 `b4-podium-overlay` |
| B5 節省金額徽章（2026-03-29）| B5 | `_handleConfirm` 成功分支：`rem>0` 時渲染 `.b5-savings-badge`「💰 節省了X元（節省Y%）！」；綠色漸層徽章；B4 savings toast pattern |
| B6 結帳確認清單（2026-03-29）| B6 | `_showCheckoutConfirm(g, callback)`：結帳按鈕→先顯示商品清單+合計+預算確認卡（`b6-checkout-card`）；語音「合計X元，預算Y元，確認去付款」；5s 自動/點背景關閉；AssistClick 加 `b6-cc-go` 偵測；`.b6-checkout-card/.b6-cc-*` CSS；B1 `_showTaskModal` pattern |
| B3 月曆倒數提示（2026-03-29）| B3 | `_completeDragSession` else 分支加語音「還差X元，再存Y天就達標了！」；`_showCountdownHint(remaining, daysLeft)` 底部浮動卡顯示剩餘金額+天數；`.b3-countdown-hint/.b3-cd-num/label` CSS；`b3CdIn` 動畫；B1 exact toast pattern |
| B5 預算效率徽章（2026-03-29）| B5 | `_handleConfirm` 成功分支：`usePct=total/budget*100`；≥95% 💎完美/≥80% ⭐善用/≥60% 👍不錯/<60% 💡節省；`.b5-eff-badge.perfect/good/ok/save` CSS；B4 savings toast pattern |
| B6 攤位小計提示（2026-03-29）| B6 | 切換攤位時若已收集商品，`_showStallSubtotal(stallName, subtotal)` 顯示離開攤位已花金額；`.b6-stall-subtotal/.b6-ss-name/total` CSS；`b6SsIn` 動畫 |
| B1 找零說明動畫（2026-03-29）| B1 | 答對且 `diff>0` 時 300ms 後顯示 `_showChangeTip(paid, required, change)`：「付X − 需Y = 找回Z元」公式卡；`.b1-change-tip/.b1-ct-row/item/op/ans` CSS；`b1CtIn` 動畫；B6 change formula pattern |
| B2 收支趨勢指示（2026-03-29）| B2 | 答對後 `_showNetTrend(question)`：net>0 顯示「↑ 本週盈餘+X元」（綠）/ net<0 顯示「↓ 本週赤字-X元」（紅）；`.b2-net-trend.up/down` CSS；`b2NtIn` 動畫 |
| B3 月曆距完成天數（2026-03-29）| B3 | 月曆 info card 新增「距完成 N 天」，`_updateCalendarUI` 同步更新 `#b3-days-left`；≤3天時 `near` class + `b3DlPulse` 脈動；`.b3-days-left-num.near` CSS |
| B5 完美配額特效（2026-03-29）| B5 | `rem===0` 時：banner 改「🎯 完美配額！」黃色主題；feedback 改「💯」；語音「完美！剛好花了X元，用完全部預算！」；eff-badge 改 `perfect-exact` 粉色 + `b5PerfectPulse` 2次脈動 |
| B4 較貴商品差額標籤（2026-03-29）| B4 | 兩商店 select 答對時，wrong card 加 `.b4-exp-delta`「比較貴 +N元」紅色標籤（`b4DeltaIn` 動畫）；unit mode 跳過（單位不同）|
| B6 收集進度動畫（2026-03-29）| B6 | 收集商品後 `_showCollectionProgress(collected, needed)` 右側浮動「+1 X/Y」；全收完時橘色；`.b6-col-progress/.b6-cp-plus/count` CSS；`b6CpIn` 動畫 |
| B2 易模式週收支統計（2026-03-29）| B2 | `_animateEasyEntries` 動畫進行中，倒數第 1 步後插入 `#b2-week-summary`：「📥 收入X元 ｜ 📤 支出Y元」；動畫結束時移除；`.b2-week-summary/.b2-ws-item` CSS |
| B6 精準付款特效（2026-03-29）| B6 | `_showChangeResult` 加 `change===0` 分支：「💯 精準付款！不需找零」黃色 banner + 語音；易/普通模式補充結果語音；`.b6-change-section.exact-payment` CSS；`b6ExactGlow` 動畫 |
| B4 差額算式閃現（2026-03-29）| B4 | `handleDiffAnswer` 正確分支：`_showDiffCalcFlash(highPrice, lowPrice, diff)` 底部顯示「X − Y = Z元」；`.b4-calc-flash/.b4-cf-num/op/ans` CSS；`b4CfIn` 動畫；B6 change formula pattern |
| B3 平均每週存款統計（2026-03-29）| B3 | 結果頁 `b3-goal-summary` 新增第 4 格「平均每週存款 X 元」（黃色高亮）；`g.weekly` 平均值；`.b3-gs-item.highlight` CSS |
| B1 錢包進度條（2026-03-29/Round 29）| B1 | `_renderWalletArea` 新增 `#b1-wallet-progress` 橫條；`_updateWalletDisplay` 依 `pct` 更新填充（藍→橙70%→綠100%）；`.b1-wallet-progress-wrap/.fill` CSS |
| B5 各關總計摘要（2026-03-29/Round 29）| B5 | `roundStatsHTML` 改 IIFE 計算 `totalBudget/totalSpent/totalSaved/avgPct`；`.b5-res-total-row` 顯示 4 欄；`.saved`（綠）/ `.over`（紅）CSS |
| B1 今日路線條（Round 30）| B1 | `_renderScheduleCard` 末尾加 `.b1-route-strip`：「🏠 → icon label → 🏠」；`bFadeIn 0.3s 0.5s both`；CSS `.b1-rs-*` |
| B2 餘額走勢條（Round 30）| B2 | `_animateEasyEntries` summaryDelay 回呼加 `b2-balance-trend`：進度條顯示 `endBalance/startAmount * 100%`（good≥80/ok≥50/low）；`.b2-bt-*` CSS |
| B3 進度環（Round 30）| B3 | `_renderPiggyBankCard` 加 `b3-progress-ring`（conic-gradient）+ `b3-ring-pct`；`_updateCalendarUI` 同步更新 deg；`.b3-progress-ring/.inner` CSS |
| B5 超限震動（Round 30）| B5 | `_updateTotalBar` 加 `wasOver` 偵測；首次超出時加 `b5-shake` class（600ms 後移除）；`@keyframes b5Shake` CSS |
| B6 浮動購物籃徽章（Round 30）| B6 | `_bindShoppingEvents` 收集後呼叫 `_updateCartBadge(collected, needed)`；藍色→綠色（done）；`_renderPaymentUI` 移除；`@keyframes b6CartPop`；`.b6-cart-badge` CSS |
| B2 即時餘額預覽（Round 31）| B2 | `_updateInputDisplay` 同步更新 `#b2-input-preview`：`diff===0` exact（綠）/ `diff>0` over（紅）/ `diff<0` under（橙）；`_renderNumpadHTML` 插入元素；`.b2-input-preview.exact/over/under` CSS |
| B3 最佳存法提示（Round 31）| B3 | `_handleNumpadAnswer` 答錯加 `_showBestSavingHint(question)`：顯示半量/原量/雙量三行對比（slow灰/correct綠/fast藍）；`.b3-best-hint/.b3-bh-*` CSS |
| B4 冠軍徽章（Round 31）| B4 | `handleSelectClick` easy 答對後呼叫 `_showChampionBadge(storeName)`；中央「🥇X最便宜！」淡入淡出 1.6s；`@keyframes b4ChampIn/Out`；`.b4-champion-badge` CSS |
| B5 預算效率星評（Round 31）| B5 | `showResults` 在 `roundStatsHTML` 後插入 IIFE 星評：avgPct≥90→3星/≥60→2星/其他→1星；`.b5-star-rating/.b5-star.lit` CSS |
| B1 面額計數摘要（Round 32）| B1 | `_updateWalletDisplay` 統計各面額數量→更新 `#b1-denom-summary`；膠囊標籤顯示「N元×M」；`_renderWalletArea` 加 `b1-denom-summary` 元素（初始 `display:none`）；`.b1-ds-item` CSS |
| B2 理財建議卡（Round 32）| B2 | `_handleChoiceAnswer`/`_handleNumpadAnswer` 答對後呼叫 `_showFinancialTip(question)`；依 net>0/0/<0 隨機顯示建議語句；底部深色 toast 1.4s 後消失；`.b2-fin-tip/.b2-ft-*` CSS |
| B4 減法學習要點（Round 32）| B4 | `handleDiffAnswer` 正確分支加 `_showSubtractionTip(high, low, diff)`：底部「X − Y = Z元」算式 toast（1.2s+fade）；`.b4-sub-tip/.b4-st-*` CSS |
| B6 結帳平均金額（Round 32）| B6 | `_showCheckoutConfirm` 清單新增 `.b6-cc-avg` 列：「共N項，平均每項M元」；`.b6-cc-avg` 虛線分隔灰色文字 CSS |
| B1 差額錯誤語音（Round 33）| B1 | `handleConfirm` 錯誤分支改「還差X元，再多加一些！」（精準說出短缺金額）|
| B2 答題動畫（Round 33）| B2 | `_handleChoiceAnswer` 選題時 `.b2-answer-correct` 綠光 / `.b2-answer-wrong` 紅抖動（`b2AnswerGlow/b2AnswerShake`）|
| B2 錯誤辨識語音（Round 33）| B2 | numpad 答錯計算 `diff33`；「算太多了，多了X元」/ 「還有X元沒算到」|
| B4 卡片光暈（Round 33）| B4 | `handleSelectClick` 正確卡加 `.b4-card-glow`（`b4CardGlow` 0.8s）|
| B5 勳章制（Round 33）| B5 | 100%→🥇完美；≥90%→🥇優異；≥70%→🥈良好；≥50%→🥉努力；其他→⭐練習；B1/B2/B3/B4/B6 同步升級 |
| B6 付款效率環形圖（Round 33）| B6 | `g.exactPayments` 計數精準付款；`showResults` 新增 `efficiencyHTML`（SVG 圓弧圖）|
| B2 漸進提示（Round 34）| B2 | numpad 第1次錯→`_showRangeHint(lo, hi)` 範圍提示；第2次以上→完整 `_showCalcBreakdown` |
| B3 配速預覽（Round 34）| B3 | `_renderChoicesHTML` 每個按鈕下方加 `b3-choice-pace` 顯示「每週X元 × Y週 = Z元」|
| B4/B1/B2/B3/B6 勳章全面升級（Round 34）| B1~B6 | 所有 showResults 的 badge 改為 🥇🥈🥉⭐ 分層勳章 |
| B5 預算分配說明（Round 34）| B5 | `_showRoundIntroCard` 加 `.b5-ri-alloc`（必買X元 + 選購Y元）|
| B6 找零兩段漸進提示（Round 34）| B6 | `_changeQuizErrors` 計數；第1次→`_showChangeRangeHint`（架構提示）；第2次→完整公式 |
| B1 行程項目入場動畫（Round 35）| B1 | `_renderScheduleCard` 每個 `.b1-schedule-item` 加 `b1ItemSlideIn` stagger 動畫（140ms/項）|
| B2 起始/結束對比條（Round 35）| B2 | easy 動畫後加 `.b2-before-after` 雙橫條（起始灰色/結束依餘額比例染色）|
| B3 里程碑語音（Round 35）| B3 | `_showMilestoneBadge` 加 `audio.play('correct')` + `Game.Speech.speak` 里程碑語音 |
| B4 最佳比價摘要（Round 35）| B4 | `savingsRankHTML` 頂部加 `.b4-best-deal` 卡「🌟 最划算：X在Y買，省了Z元！」|
| B5 困難模式隱藏價格（Round 35）| B5 | hard mode 非必買商品顯示「??? 元」；首次點擊揭示價格（`.b5-price-hidden` CSS）；第二次點擊才選取 |
| B1 投幣足額彈出動畫（Round 36）| B1 | `_updateWalletDisplay` 加 `wasEnough` 旗標；首次足額時加 `b1-total-pop` class（500ms 後移除）；`b1TotalPop` keyframe |
| B4 差額百分比標示（Round 36）| B4 | `_renderPriceBars` 加 `.b4-pbar-diff-pct`「便宜了X%」橙色標籤 |
| B5 必買門檻標線（Round 36）| B5 | `_updateTotalBar` 計算 `mustPct`；`#b5-must-marker` 琥珀色垂直標線 |
| B6 攤位完成閃光（Round 36）| B6 | 攤位商品全收後加 `b6-stall-done-flash`（800ms 後移除）；`b6StallFlash` keyframe |
| B1 建議硬幣組合卡（Round 37）| B1 | `_showCoinHint` 改為 DOM 卡片 `#b1-hint-combo-card`；顯示建議面額文字；5秒後自動移除 |
| B2 Easy 圖例行（Round 37）| B2 | `_renderQuestionHTML` easy 模式加 `.b2-legend` 行說明 📥 收入 / 📤 支出 符號 |
| B3 月曆預估達標日（Round 37）| B3 | `_updateCalendarUI` 計算剩餘存款節奏；`#b3-est-date` 顯示「預計 M/D 達標」或「🎉 達標！」 |
| B4 選對即播報語音（Round 37）| B4 | `handleSelectClick` 正確分支即時語音「X店，Y元，比較便宜！」 |
| B6 商品飛出收據（Round 37）| B6 | `_showItemReceiptFlyout(anchor, item)` 收集商品時從錨點彈出 icon+name+價格浮標（`b6FlyoutUp` 1s）|
| B1 費用佔比條（Round 38）| B1 | `_renderScheduleCard` 每個 item 下加 `.b1-item-pct-bar-wrap` + `.b1-item-pct-bar`（寬度依 `cost/total*100%`）；困難模式不顯示 |
| B2 事件累計金額列（Round 38）| B2 | `_renderQuestionHTML` 中計算 `runningAmt`（起始→逐步加減）；每個 `b2-event-row` 末尾加 `.b2-running-val` 灰色小字 |
| B3 存錢粒子（Round 38）| B3 | `_completeDragSession` 後呼叫 `_showSavingsSparkle()`；5顆 ✨💫⭐🌟💰 從撲滿上方飛散（`b3SparkleUp` 1.2s）|
| B4 困難記憶倒數（Round 38）| B4 | `renderQuestion` hard 模式 1900ms 後啟動 `_startMemoryCountdown()`；3秒後 `.b4-mem-blur` 模糊價格，顯示「🤔 靠記憶回答！」|
| B5 可負擔商品高亮（Round 38）| B5 | `_updateTotalBar` 末尾對非必買未選卡片 toggle `.b5-affordable`（`price <= remBudget`）；綠色虛線外框 |
| B6 全部收集閃光（Round 38）| B6 | `allDone && !wasDone` 時呼叫 `_showAllCollectedFlash()`；中央深綠全屏閃光卡（`b6AllDoneIn` 1.5s）|
| B1 場景類別色標（Round 39）| B1 | `_renderScheduleCard` 依 `q.cat` 加 `b1-cat-*` CSS class；schedule card 頂部 4px 色條（school藍/food橙/outdoor綠/entertainment紫/shopping粉）|
| B2 主題情境語音（Round 39）| B2 | `renderQuestion` 語音前加 `themePrefix`（學校週記/假日時光日記/家庭生活日記）；random 主題不加前綴 |
| B3 即時剩餘金額標籤（Round 39）| B3 | `_updateWeekPreview` 末尾加 `.b3-week-rem` 標籤：「還差X元」（黃色）/ 「🎉 足夠！」（綠色）|
| B4 累計節省徽章（Round 39）| B4 | `_renderHeader` header-right 加 `b4-savings-tally`：`q.totalSaved > 0` 顯示「💰 已省X元」綠色小徽章 |
| B5 即時選擇計數（Round 39）| B5 | total-bar 新增 `#b5-sel-count`；`_updateTotalBar` 更新「必買N件+選購M件」；`.b5-sel-count` 藍色膠囊 |
| B6 攤位商品語音引導（Round 39）| B6 | 切換攤位時語音改為「X攤，要找Y和Z」；全部收集時說「已全部收集！」 |
| B6 找零計算輔助面板（2026-03-30）| B6 | `_showChangeQuiz` 新增「🧮 幫我算一算」切換按鈕；展開 `.b6-calc-panel` 顯示直式減法（付了X − 花了Y = 找零？元）；EventManager 綁定 toggle；CSS：`.b6-calc-toggle`/`.b6-calc-panel`/`.b6-cp-*`；搜尋 `b6-calc-panel`、`b6-calc-toggle` |
| B3 週存視覺模擬積木（2026-03-30）| B3 | `_showDivisionHint` 答錯後在提示下方新增 `.b3-wsim` 積木列；最多 8 個 `.b3-wsim-block` 顯示第N週+累計金額；每塊延遲 90ms 彈出（`b3WsimPop`）；超過8週顯示「…共N週」溢出徽章；搜尋 `b3-wsim`、`b3WsimPop` |
| B1 最佳硬幣組合逐一動畫（2026-03-30）| B1 | `_showCoinHint` 末尾呼叫 `_animateHintCoins(coins)`；在 `#b1-hint-combo-card` 建立 `#b1-hint-anim`；每 280ms 依序顯示硬幣圖片+面額+累計金額；`b1HintCoinIn` scale/opacity 進場；搜尋 `_animateHintCoins`、`b1-hint-anim` |
| B1 硬幣放入浮動標籤（2026-03-30）| B1 | `addCoin(denom)` 末尾建立 `.b1-coin-popup`（綠色膠囊 `+N元`）；fixed 定位於錢包區正上方；`b1CoinPopup` 0.85s 上飄淡出；900ms 後移除；搜尋 `b1-coin-popup`、`b1CoinPopup` |
| B2 困難模式語音重聽按鈕（2026-03-30）| B2 | `_renderNumpadHTML` hard 模式加 `#b2-replay-btn`（🔊 小藍按鈕）；`_bindQuestionEvents` 綁定 click→講出全部事件列表；`.b2-replay-btn` 淺藍膠囊；搜尋 `b2-replay-btn`、`b2ReplayBtn` |
| B4 10秒無操作自動提示（2026-03-30）| B4 | `renderQuestion` easy/normal 末尾啟動 10s timer；`_clearSelectHintTimer()` 取消；`phase==='select'` 時高亮正確卡 `.b4-auto-select-hint`（綠框 `b4AutoHint` 2次脈動）+ 語音「提示：哪個比較便宜？」；搜尋 `_selectHintTimer`、`b4-auto-select-hint` |
| B2 簡單模式事件卡片視覺化（2026-03-31）| B2 | `.b2-diary` 加 `data-diff="${diff}"`；`.b2-event-row` 加 `${e.type}` class；CSS `[data-diff="easy"]` 選擇器：income→綠漸層+左5px綠框，expense→紅漸層+左5px紅框；icon 28px/name 17px bold/amount 1.45rem；搜尋 `data-diff`、`b2-event-row income` |
| B4 動態價格浮動（2026-03-31）| B4 | `_generateQuestions` 兩商店分支：normal ±10%、hard ±20%，取整到5元；安全守衛：浮動後 `priceA ≤ priceB` 不套用；三商店/單位比價跳過；搜尋 `價格動態變化`、`finalItem`、`pct = difficulty` |
| B5 必買/選購分組佈局（2026-03-31）| B5 | `_renderRoundHTML` 分拆 mustItems/optItems 兩組；`b5-section-hd-must`（琥珀）/`b5-section-hd-opt`（翠綠）；`#b5-opt-budget` 即時顯示可用餘額；`_updateTotalBar` 加 optBudgetEl 更新；搜尋 `b5-section-group`、`b5-opt-budget` |
| B3 選項擴充4個 + 結構化干擾項（2026-03-31）| B3 | `_generateChoices` 擴充 `opts.size < 3` → `4`；加結構化干擾：`correct-1`（忘進位）/ `correct+1`（過度進位）/ `ceil(correct*0.6)`（低估）；`b3-choices-4` 2×2 grid CSS；搜尋 `structured`、`b3-choices-4` |
| B1 費用逐項語音播報（2026-03-31）| B1 | `renderQuestion` easy 模式加 `_speakItemsOneByOne`（2400ms 後啟動）；遞迴 `next()`，950ms/項，完成後說「總共N元」；搜尋 `_speakItemsOneByOne`、`C2 逐項朗讀 pattern` |
| B2 困難模式聽力記憶模糊（Round 43）| B2 | `b2-memory-mode` class 加至 `.b2-diary`；`b2-event-icon`/`.b2-event-name` blur 6px；`#b2-reveal-btn` 切換 `b2-revealed`（toggle 解除模糊）；搜尋 `b2-memory-mode`、`b2-reveal-btn`、`b2-revealed` |
| B3 困難模式週存金額隱藏（Round 43）| B3 | `.b3-weekly-hidden` blur + `???元`；`#b3-reveal-weekly-btn` 點擊揭示真實金額並語音；`data-weekly` 保存值；搜尋 `b3-weekly-hidden`、`b3-reveal-weekly-btn` |
| B4 三商店獎台語音播報（Round 43）| B4 | `_showPodiumAnimation` overlay 建立後 350ms 播報「第一名，X，Y元，最便宜！」；搜尋 `語音播報排名` |
| B5 困難模式翻牌動畫（Round 43）| B5 | 首次點擊加 `b5-flip-reveal`（`scaleX` 0→0→1 動畫）；150ms 時移除 `b5-price-hidden` 並更新文字；330ms 後移除動畫 class；搜尋 `b5-flip-reveal`、`b5FlipReveal` |
| B6 付款提示面額色塊（Round 43）| B6 | `_showPaymentHint` toast 改為 `.b6-hint-badge`（`--bc` 對應面額顏色）+ `.b6-hint-badges` flex 排列；搜尋 `b6-hint-badge`、`b6-hint-badges` |
| B1 行程卡倒數計時器（Round 44）| B1 | `_startRouteTimer(question)`：easy=30s/normal=20s/hard=15s；遞迴 tick，`'countdown'` category；≤5s 加 `b1-rt-urgent`（`b1RtPulse` 脈動紅色）；時間到播 error 音+語音+`_showScheduleBreakdown`；`handleConfirm` 正確時 `clearByCategory('countdown')`；`#b1-route-timer` 插入 header；搜尋 `_startRouteTimer`、`b1-rt-urgent` |
| B2 類別圖示動畫導引（Round 44）| B2 | `_showThemeGuide()`：依 `diaryTheme`（school/holiday/family）顯示圖示+短語；`b2TgSlideIn` 從上滑入，2s 後 `b2-tg-fade` 淡出；`renderQuestion` 任務彈窗後 2400ms 觸發；隨機/未設定模式不顯示；搜尋 `_showThemeGuide`、`b2-theme-guide` |
| B3 存錢里程碑語音貢獻（Round 44）| B3 | `_showMilestoneBadge` speeches 更新為：25%「已經存了四分之一了，繼續加油！」/ 50%「存了一半了，真棒！」/ 75%「快到了，差一點點！」；`_onCalendarGoalReached` 開頭加 100% 達標語音「達標了！{itemName}可以買了！」；搜尋 `celebSpeeches`、`達標了` |
| B4 比價思路步驟卡（Round 44）| B4 | `_showThinkingSteps(curr)`：兩商店模式 easy 答對後顯示藍色卡片；1️⃣A店X元 / 2️⃣B店Y元 / 結論；`b4TcIn`+`b4TcStepIn` 動畫；2s 後 `b4-tc-fade` 淡出；`handleSelectClick` easy 分支呼叫；搜尋 `_showThinkingSteps`、`b4-thinking-card` |
| B6 付款找零計算過程顯示（Round 44）| B6 | `_animateChangeCalc(paid, total, change)`：`_showChangeResult` 渲染後 400ms 觸發（change>0）；三行 `.b6-cc-line` 逐行 `b6CcLineIn`（400ms 間隔）；付/商品/找零=三色；2.8s 後 `b6-cca-fade` 淡出；搜尋 `_animateChangeCalc`、`b6-change-calc-anim` |
| B1 per-item 場景類別徽章（Round 45）| B1 | `_renderScheduleCard` 每個 `.b1-schedule-item` 加 `.b1-item-cat-badge`（20px 圓形半透明 emoji）；`catBadgeMap`：school📚/food🍔/outdoor🌳/entertainment🎭/shopping🛒；搜尋 `b1-item-cat-badge`、`catBadgeMap` |
| B3 達標煙火慶祝（Round 45）| B3 | `_onCalendarGoalReached` 語音後加三波 confetti burst（angle 60/120/90，300ms 間隔，zIndex:10200）；搜尋 `達標煙火`、`burst` |
| B4 記憶模式語音重聽按鈕（Round 45）| B4 | `_startMemoryCountdown` 模糊後加 `#b4-mem-replay`（`.b4-mem-replay-btn`，fixed top:76px right:12px）；click 呼叫 `Game.Speech.speak` 所有店家價格；2s disable 防連按；搜尋 `b4-mem-replay`、`b4-mem-replay-btn` |
| B5 朗讀已選清單按鈕（Round 45）| B5 | `#b5-read-selected-btn`（`.b5-read-selected-btn`，藍色膠囊）；`_bindRoundEvents` 綁定：朗讀必買+已選商品名稱/價格+合計；插於 hint-btn 和 confirm-btn 之間；搜尋 `b5-read-selected-btn`、`朗讀已選` |
| B6 切換至已完成攤位 toast（Round 45）| B6 | 攤位切換時偵測 `destDone`；已完成→底部顯示 `.b6-stall-done-toast`「✅ X攤位 已收集完畢！」；1s 後 `.b6-sdt-fade` 淡出，1.6s 後移除；搜尋 `b6-stall-done-toast`、`b6-sdt-fade` |
| B3 設定頁普通/困難模式天數選項（2026-04-02）| B3 | 普通模式：`💰 每天存款金額：` + preset/自訂 改為 `📅 存款天數與金額：` + 6-10天/9-15天/10-20天/自訂金額（`data-ndaily`）；移除 `#b3-preset-display` 浮動金額動畫；困難模式：新增 `📅 存款天數與金額：` 含 6-10天/9-15天/10-20天（`data-hdaily`，無自訂）；`_checkCanStart` 困難模式加 `!s.dailyAmount` 守衛；`_updateNDaysPreview` 改支援 range string；`_generateHardDailyAmounts(price, targetDays=15)` 接受天數參數；搜尋 `data-ndaily`、`data-hdaily`、`h-daily-btn-group` |
| B3 自訂物品移至所有購買金額選項之後（2026-04-02）| B3 | `🖼️ 自訂物品（選填）` 區塊從簡單模式 price-range 與 daily-group 之間移至困難模式 price-range 之後（三模式共用，普通/困難切換時皆可見）；搜尋 `b3-add-custom-item-btn`（DOM 順序改變） |

---

## 廢棄程式碼稽核

> 詳細記錄見 `report/Deprecated_Code_Audit.md`

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
