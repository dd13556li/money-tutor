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
| *(B系列 Round 45 及更早修復已歸檔)* | — | 見 `report/Fix_History.md §二` |
| B3 設定頁普通/困難模式天數選項（2026-04-02）| B3 | 普通模式：`💰 每天存款金額：` + preset/自訂 改為 `📅 存款天數與金額：` + 6-10天/9-15天/10-20天/自訂金額（`data-ndaily`）；移除 `#b3-preset-display` 浮動金額動畫；困難模式：新增 `📅 存款天數與金額：` 含 6-10天/9-15天/10-20天（`data-hdaily`，無自訂）；`_checkCanStart` 困難模式加 `!s.dailyAmount` 守衛；`_updateNDaysPreview` 改支援 range string；`_generateHardDailyAmounts(price, targetDays=15)` 接受天數參數；搜尋 `data-ndaily`、`data-hdaily`、`h-daily-btn-group` |
| B3 自訂物品移至所有購買金額選項之後（2026-04-02）| B3 | `🖼️ 自訂物品（選填）` 區塊從簡單模式 price-range 與 daily-group 之間移至困難模式 price-range 之後（三模式共用，普通/困難切換時皆可見）；搜尋 `b3-add-custom-item-btn`（DOM 順序改變） |
| B3 設定頁四項修正（2026-04-03）| B3 | ①Preview 延遲顯示：`_updateNDaysPreview`/`_updateHDaysPreview` 先檢查 `!daily`（隱藏），再檢查 `!range`（顯示「請先選擇購買物品金額」提示），兩條件分離防止空黃框；②mode switch 後立即呼叫三個 preview 函數（`_updateDaysPreview`+`_updateNDaysPreview`+`_updateHDaysPreview`）消除切換時的空白顯示；③困難模式加入「自訂金額」按鈕（`data-hdaily="custom"`）；④三種難度共用單一 numpad modal（`#b3-daily-numpad-modal`）+ `_npSource` 變數判斷來源；搜尋 `b3-daily-numpad-modal`、`_npSource`、`showNumpad` |
| B3 設定頁切換模式清空選項（2026-04-03）| B3 | diff-change handler 改為全面清空：六組按鈕（`#price-range-group`/`#daily-group`/`#n-price-range-btns`/`#n-daily-btn-group`/`#h-price-range-btns`/`#h-daily-btn-group`）一律移除 active，`custom` 按鈕文字重置為「自訂金額」；`priceRange`/`dailyAmount` 歸 null；三個 preview 函數全呼叫；搜尋 `universal reset`、`h-daily-btn-group.*remove.*active` |
| B3 困難模式設定頁 preview 提示（2026-04-03）| B3 | 新增 `_updateHDaysPreview()` 函數 + `#b3-h-days-preview` DOM 節點；選完天數未選金額→「📋 請先選擇購買物品金額」；兩者皆選→「📅 每天存款金額隨機變動，預計約 X～Y 天完成目標」（range）/ 「📅 隨機變動，平均約 N 元/天，預計約 X 天」（custom）；搜尋 `_updateHDaysPreview`、`b3-h-days-preview` |
| B3 月曆模式放置區重構（2026-04-03）| B3 | 放置區改每枚各顯圖示（`b3-nplaced-item`，廢棄 `×N` 的 `b3-nplaced-row`）；紙鈔 `68px` > 硬幣 `44px`；搜尋 `b3-nplaced-item`、`imgSize.*68px` |
| B3 普通/困難模式確認後才提示金額錯誤（2026-04-03）| B3 | `_handleNormalDrop`：困難模式移除超額即時拒絕（加 `difficulty !== 'hard'` 守衛）；`_confirmNormalDeposit` 錯誤語音改「不對喔，你存的錢太多/太少，請再試一次」；困難模式放置時不播總額語音（`difficulty !== 'hard'` 守衛）；搜尋 `不對喔.*存的錢太多`、`difficulty.*hard.*Speech` |
| B3 普通/困難模式提示按鈕（2026-04-03）| B3 | `b3-daily-header-row`（flex space-between）+ `b3-daily-hint-wrap`（吉祥物 28px + 💡提示鈕）；普通模式 `_toggleDepositHint()`：計算 `hintSlots[]`→已放金錢退回動畫（`b3-nplaced-return`）→顯示 ghost slots（`b3-nplaced-ghost-slot`，`b3NDenomInGhost` 結尾 `opacity:0.35`）→播語音「可以存入N個X元」；填入時直接操作 `[data-hint-idx]` DOM 不重繪（避免閃爍）；清除時重置所有 slots；完成後隱藏提示鈕；搜尋 `b3-daily-hint-btn`、`hintSlots`、`data-hint-idx`、`b3NDenomInGhost` |
| B3 困難模式提示彈窗（2026-04-03）| B3 | `_showHardModeHintModal()`：貪婪分解面額→彈窗顯示圖示（紙鈔 62px/硬幣 48px）＋語音「今天要存X元，可以用N個X元…」；`b3-hint-modal-overlay`/`.b3-hint-modal`；搜尋 `_showHardModeHintModal`、`b3-hint-modal-overlay` |

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
