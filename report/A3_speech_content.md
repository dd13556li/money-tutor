# A3 麥當勞點餐機 — 語音內容

> 資料來源：`js/a3_mcdonalds_order.js`
> 匯出日期：2026-04-23

---

## 一、歡迎語音

```javascript
'歡迎來到麥當勞！今天想吃什麼呢？'
```

---

## 二、指定任務語音

```javascript
// 指定餐點時說出名稱
`今天要點${burgerName}、${sideName}和${drinkName}`
// 指定購買模式播語音（speakCompletionMessage）
```

> 搜尋：`speakCompletionMessage`、`moveToNextAssignedItem`（2026-03-14）

---

## 三、選餐語音（每選一項）

```javascript
// 選到漢堡時：
`${burgerName}，${price}元，已加入訂單`

// 步驟切換時（showCounterPayment 等）
window.speechSynthesis.cancel() // 先取消前頁語音（2026-04-07）
```

> 搜尋：`showCounterPayment`、`showPaymentMethodSelection`、`showPickupComplete`（2026-04-07 頁面切換語音取消）

---

## 四、結帳語音

```javascript
`您的訂單共${total}元，請付款`
```

---

## 五、付款方式語音

```javascript
// 顯示付款方式選擇
'請選擇付款方式：現金付款'
```

---

## 六、付款提示語音（困難模式，2026-04-07）

```javascript
// 困難模式：點提示鈕顯示付款彈窗
// a3PaymentHintModal：含金錢圖片×張數
McDonald.replayPaymentHintSpeech()   // 重播語音
McDonald.confirmPaymentHint()         // 確認後顯示勾勾
```

> 搜尋：`a3PaymentHintModal`、`confirmPaymentHint`（2026-04-07）

---

## 七、取餐語音

```javascript
'您的餐點準備好了，請到取餐口取餐！'
// 餐盤 trayReadyTime 後自動跳轉取餐畫面
```

> 搜尋：`trayReadyTime`、`buildActionQueue.*pickup`

---

## 八、普通模式步驟2提示語音

```javascript
// 步驟 2（付款）提示按鈕動畫
// counter-payment-btn-hint：脈動高亮
```

> 搜尋：`counter-payment-btn`、`counter-payment-btn-hint`（2026-03-14）

---

## 九、指定餐點完成語音

```javascript
// 普通模式提示（單一類別）：
`請選擇${categoryName}`
// 搜尋：showHardModeHint、showCategoryAssignmentModal
```

---

## 十、步驟 3 勾勾語音（找零確認）

```javascript
// 步驟3 顯示勾勾後語音
`${exactMoney}` // optimalPaymentTargets
```

> 搜尋：`exactMoney`、`optimalPaymentTargets`、`walletHintMoney`（A3）
