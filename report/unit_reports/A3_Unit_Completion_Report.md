# A3 麥當勞點餐 Unit Completion Report

> 詳細架構說明見 `CLAUDE.md §A3 特殊說明`；修復記錄見下方。

## 主物件

- `McDonald`（全域）；`McDonald.Debug`

## 主要 HTML/JS

- `html/a3_mcdonalds_order.html`
- `js/a3_mcdonalds_order.js`

## 魔法商品 State

`customItems: { burgers/sides/drinks/desserts }`；關鍵函數：`getAllCategoryItems`、`renderCustomItemsPanel`、`handleCustomItemImageUpload`、`confirmAddCustomItem`、`setEasyModeCustomItemPrices`

## 特殊注意

- 餐盤 CSS：Grep `tray`（黃色漸層 + ::before/after 把手）
- `_completionSummaryShown` 防重複旗標
- 餐點圖片用 `item.imageUrl||item.image`（8 處套用）
- 切換頁面前需先 `window.speechSynthesis.cancel()`（防跨頁語音）

---

## 修復記錄速查（從 CLAUDE.md 遷移，2026-04-29）

| 項目 | 搜尋關鍵字 |
|------|------------|
| A3 orderNumber setInterval→遞迴 | `startOrderNumberAnimation`, `orderAnimation` |
| A3 拖曳鬼影跟隨 | `imgW`, `imgH`, `setDragImage` |
| A3 步驟2付款提示動畫 | `counter-payment-btn`, `counter-payment-btn-hint` |
| A3 指定餐點完成語音 | `speakCompletionMessage`, `moveToNextAssignedItem` |
| A3 普通模式提示單一類別 | `showHardModeHint`, `showCategoryAssignmentModal` |
| A3 startOver計時器洩漏 | `_pickupNavigating`, `TimerManager.clearByCategory('speech')` |
| A3 步驟3勾勾提示 | `exactMoney`, `optimalPaymentTargets`, `walletHintMoney` |
| A3 步驟3/5/6 hint 按鈕 | `checkout-btn-hint`, `changeAmount === 0`, `pickup-order-btn` |
| A3 餐盤點擊即跳轉 | `onTrayScreen`, `trayNavCallback` |
| A3 Game未定義+錯誤邊界 | `McDonald.handleCustomQuestionClick`, `event.error` |
| A3 步驟2自動跳過 | `autoSelectPaymentMethod`, `selectPaymentMethod` |
| A3 取餐自動跳轉 | `trayReadyTime`, `buildActionQueue.*pickup` |
| A3 困難模式付款提示彈窗（2026-04-07）| `showPaymentHint()` 新增 inline style 彈窗（`a3PaymentHintModal`）含金錢圖片×張數；`McDonald.replayPaymentHintSpeech()`、`McDonald.confirmPaymentHint()`（確認後才顯示勾）|
| A3 付款提示 fallback 路徑顯示彈窗（2026-04-07）| `showPaymentHint()` fallback 分支改為也顯示 `a3PaymentHintModal`，使用 `optimalPaymentTargets` 物件；搜尋 `顯示付款提示彈窗（fallback）` |
| A3 切換頁面停止語音（2026-04-07）| `showCounterPayment()`、`showPaymentMethodSelection()`、`showPickupComplete()` 頂部加 `window.speechSynthesis.cancel()`；搜尋 `speechSynthesis.cancel` in `a3_mcdonalds_order.js` |
