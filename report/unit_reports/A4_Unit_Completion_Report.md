# A4 超市購物 Unit Completion Report

> 修復記錄見下方；架構說明見 CLAUDE.md。

## 主物件

- `Game`（全域）；`Game.Debug.FLAGS`
- 商品資料：`js/a4-shared-products.js`（12 種商店 × 10 商品）

## 主要 HTML/JS

- `html/a4_supermarket_shopping.html`
- `js/a4_supermarket_shopping.js`

## 作業單

- `worksheet/units/a4-worksheet.js`
- 額外傳 `storeType` 參數（其他單元只傳 `unit`）

---

## 修復記錄速查（從 CLAUDE.md 遷移，2026-04-29）

| 項目 | 搜尋關鍵字 |
|------|------------|
| A4 提示勾勾持續 | `activeWalletHintList`, `showWalletHintWithTicks` |
| A4 蕃茄計數前綴修正 | `parseProductDisplay`, `/^\d/.test(mw)` |
| A4 任務彈窗輔助點擊消失 | `#target-item-modal`, `closeTargetItemModal` |
| A4 完成畫面按鈕無響應 | `this.ClickMode.unbind()` |
| A4 巧克力量詞「條→包」 | `getMeasureWord`, `'巧克力': '包'` |
| A4 同面額第2枚id重複 | `usedWalletIndices`, `Math.random.*1e9` |
| A4 executeNextPayment位置錯誤 | `data-position.*currentIndex`, `executeNextPayment` |
| A4 佈局修復3項 | `align-self:center`, `getProductIconHTML.*8rem`, `isBanknote.*money.value` |
| A4 點擊開始無反應 | `waitingForClick && !clickState.waitingForStart` |
| A4 步驟2flex缺失 | `showEasyModePriceConfirmation`, `price-formula-display` |
| A4 步驟4找零紙鈔偏小 | `changeImgStyle`, `showEasyModeChangeVerification` |
| A4 步驟3hint紙鈔偏小 | `isBanknoteHint`, `generatePaymentHints` |
| A4 魔法商品自訂價格 | `addDynamicPrice`, `category === 'custom'` |
| A4 各商店錢包上限 | `STORE_WALLET_CAPS`, `initializeWallet` |
| A4 3C商品更新 | `amountLevels`, `electronics: 10000` |
| A4 3C細項調整 | `price_max: 3000`, `平板電腦` |
| A4 交易摘要圖示 | `showTransactionSummaryScreenWithData`, `productReveal` |
| A4 交易摘要圖片尺寸 | `getProductIconHTML.*180px`, `multi-selection.*70px` |
| A4 selectedItems跨題污染 | `selectedItems = []`, `showShoppingScene` |
| A4 步驟3付款錯誤3項 | `你付了太多的錢，請重新付款`, `payment-hint-btn:hover` |
| A4 步驟1兩段式點擊 | `closeTargetItemModal`, `autoSelectProduct`, `_taskModal.remove.*return` |
| A4 步驟2-4 hint 按鈕 | `waitingForConfirmPayment`, `needsNoChangeButton`, `confirm-easy-price-btn` |
| A4 困難第四步顯示商品 | `showNormalHardModeChangeVerification` |
| A4 確認付款平板寬度 | `fit-content` |
| A4 困難模式付款提示彈窗（2026-04-07）| `showPaidAmountHint()` 新增 inline style 彈窗（`a4PaymentHintModal`）含金錢圖片×張數；`Game.replayPaymentHintSpeech()`、`Game.confirmPaymentHint()`；搜尋 `a4PaymentHintModal`, `_lastOptimalPaymentA4` |
| A4 付款提示彈窗音效修正（2026-04-07）| `replayPaymentHintSpeech`/`confirmPaymentHint` 的音效改 `this.menuSelectAudio?.play()`（A4 無 `playSound` 方法）；搜尋 `menuSelectAudio` in `confirmPaymentHint` |
| A4 作業單商品改用圖片 | `_productImg`, `item.icon` |
| A4 作業單難度分級（2026-04-25）| `_items` 拆成 `easy`(10項,max≤100)、`normal`(8項,59-280)、`hard`(6項,320-1580)；`usedKeys` 改用 `b4_${difficulty}_${idx}` 前綴；搜尋 `this._items[difficulty]`、`keyPrefix`、`adjustCountButton` in a4-worksheet.js |
