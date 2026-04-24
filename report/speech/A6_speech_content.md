# A6 火車票售票機 — 語音內容

> 資料來源：`js/a6_train_ticket.js`
> 匯出日期：2026-04-23

---

## 一、金額語音

A6 使用 `convertToTraditionalCurrency()` 處理票價語音（同 A4，非 convertAmountToSpeech）。

---

## 二、歡迎語音

```javascript
'歡迎使用台鐵自動售票機！請選擇您的出發站'
```

---

## 三、步驟語音（easy 模式）

```javascript
// 步驟 1：選出發站
`請選擇出發站，例如：臺北`

// 步驟 2：選目的地
`請選擇目的地，例如：高雄`

// 步驟 3：選票種與張數
'請選擇票種：全票、優惠票或兒童票'

// 步驟 4：確認購票
`本次購票共${convertToTraditionalCurrency(total)}，請確認`

// 步驟 5：付款
`請放入${convertToTraditionalCurrency(total)}的金錢`

// 步驟 6：找零（鏈式語音串接）
`找零${convertToTraditionalCurrency(change)}，請取走零錢`

// 步驟 7：取票
'票券已列印，請取走您的車票'
```

---

## 四、步驟 1-4 點擊音效語音

```javascript
// 步驟 1~4 使用 click.mp3（2026-03-16）
// 搜尋：playSound('click')、click.mp3（A6）
```

---

## 五、步驟 6 找零語音串接（2026-03-16）

```javascript
// handleEasyChangePlacement：逐枚放置找零金幣
// 語音 callback 串接，每枚播面額語音後繼續
// 搜尋：handleEasyChangePlacement、Speech callback chain
```

---

## 六、找零圖示亮度（2026-03-16）

```javascript
// 每次執行找零後亮起圖示
executeNextChange → img.style.opacity
// 搜尋：executeNextChange、img.style.opacity（A6）
```

---

## 七、困難模式付款語音（2026-04-07）

```javascript
// 困難模式拖幣放置時不播語音（_showPaidAmount = false）
// 按提示鈕後 _showPaidAmount = true 才播
```

> 搜尋：`_showPaidAmount`、`paymentSpeech`（2026-04-07）

---

## 八、找零驗證語音（2026-03-16）

```javascript
// 找零正確時（✓ 動畫）
'太棒了，找零正確！'
// correct-answer-overlay、correct-mark、correctMarkAppear

// 找零錯誤時（✗ 動畫，普通模式）
'找零不對，請重新選擇'
// wrong-answer-overlay（普通模式 else 分支）
```

> 搜尋：`correct-answer-overlay`、`wrong-answer-overlay`（A6，2026-03-16）

---

## 九、付款錯誤退幣語音

```javascript
// 付款金額不足
`付款金額不足，請重新付款`
// validatePayment（2026-03-22）
```

---

## 十、step-hint 提示語音（2026-04-07）

```javascript
// step-hint 樣式更新：`::after` 改「👇 點這裡」，上方位置，橙色漸層
// @keyframes bounceHint
// 搜尋：bounceHint、step-hint::after（A6，2026-04-07）
```

---

## 十一、跳過中斷語音（`skipOnInterrupt`）

```javascript
// 語音被中斷時，依 skipOnInterrupt 旗標決定是否跳過
// 搜尋：skipOnInterrupt（A6，2026-03-21）
```
