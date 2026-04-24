# A4 超市購物 — 語音內容

> 資料來源：`js/a4_simulated_shopping.js`
> 匯出日期：2026-04-23

---

## 一、金額語音

A4 使用 `convertToTraditionalCurrency()` 處理金額語音（不用 `convertAmountToSpeech`）。

---

## 二、歡迎語音

```javascript
'歡迎來到超市！讓我們一起購物吧！'
// 依 storeType 調整店名
```

---

## 三、任務指定語音

```javascript
// 指定購買模式
`請購買${itemName}，這個商品的價格是${convertToTraditionalCurrency(price)}`
// 任務彈窗：#target-item-modal
```

> 搜尋：`#target-item-modal`、`closeTargetItemModal`（2026-03-18）

---

## 四、步驟 2 確認價格語音

```javascript
// 顯示總價公式：
`${item1}加上${item2}，一共${total}元`
// showEasyModePriceConfirmation 中的 price-formula-display
```

> 搜尋：`showEasyModePriceConfirmation`、`price-formula-display`（2026-03-26）

---

## 五、步驟 3 付款語音

```javascript
// 提示鈕（3 次錯誤後）
`你付了太多的錢，請重新付款`
```

> 搜尋：`你付了太多的錢，請重新付款`（2026-03-22）

---

## 六、步驟 4 找零語音

```javascript
// 找零驗證
`找零${convertToTraditionalCurrency(change)}，請確認是否正確`

// 錯誤時
`付款金額不足，請重新付款`
```

> 搜尋：`showEasyModeChangeVerification`

---

## 七、付款提示彈窗語音（困難模式，2026-04-07）

```javascript
// 顯示 a4PaymentHintModal（含金錢圖片）
Game.replayPaymentHintSpeech()     // 重播語音
Game.confirmPaymentHint()           // 確認後顯示勾勾，重置 isProcessingHint
// 音效使用 menuSelectAudio（非 playSound，A4 無 playSound）
```

> 搜尋：`a4PaymentHintModal`、`_lastOptimalPaymentA4`（2026-04-07）

---

## 八、交易摘要語音

```javascript
// 交易完成後（showTransactionSummaryScreenWithData）
`${itemName}，售價${price}元，你付了${paid}元，找零${change}元`
// mkMoneyIcons 顯示金錢圖示（2026-04-10）
```

> 搜尋：`showTransactionSummaryScreenWithData`、`productReveal`

---

## 九、提示勾勾語音

```javascript
// 步驟4找零驗證正確時：✓ 覆蓋
// 顯示 correct-answer-overlay（2026-03-16）
// 持續亮起（activeWalletHintList、showWalletHintWithTicks）
```

> 搜尋：`activeWalletHintList`、`showWalletHintWithTicks`（2026-03-18）
