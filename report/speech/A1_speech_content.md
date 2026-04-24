# A1 自動販賣機 — 語音內容

> 資料來源：`js/a1_vending_machine.js`（`UI_TEXT` 配置物件）
> 匯出日期：2026-04-23

---

## 一、語音集中管理

A1 使用 `UI_TEXT` 配置物件集中定義語音文字。`VendingMachine.convertAmountToSpeech(amount)` 處理金額語音。

---

## 二、歡迎語音

```javascript
// 進入歡迎頁（1 秒後播放）
'歡迎來到自動飲料販賣機！'
```

> 搜尋：`UI_TEXT`、`歡迎來到自動飲料販賣機`

---

## 三、錢包介紹語音

```javascript
`你的錢包總共有${convertAmountToSpeech(walletAmount)}`
// 例：「你的錢包總共有伍拾元」
```

> 搜尋：`convertAmountToSpeech`（A1/A2/A5 用此函數，非 convertToTraditionalCurrency）

---

## 四、指定任務語音

```javascript
`請購買${drinkName}，價格是${convertAmountToSpeech(price)}`
// 例：「請購買巨峰葡萄汁，價格是參拾伍元」
```

---

## 五、投幣語音

```javascript
// 每次投幣後
`已投入${convertAmountToSpeech(inserted)}，還需要${convertAmountToSpeech(remaining)}`

// 金額足夠時
'投幣完成！請按確認購買'
```

---

## 六、購買成功語音

```javascript
'購買成功，請到取物口拿飲料'
```

---

## 七、找零語音

```javascript
`找零${convertAmountToSpeech(changeAmount)}，請收好您的零錢`
```

---

## 八、交易摘要語音（`showTransactionSummary`）

```javascript
// 完整念出商品名、價格、已付金額、找零
`${drinkName}，售價${price}元，你付了${paid}元，找零${change}元`
```

> 搜尋：`showTransactionSummary`、`mkMoneyIcons`（2026-04-10 金錢圖示）

---

## 九、操作錯誤語音

```javascript
// 選錯商品時（指定任務模式）
`選錯了，請購買指定的飲料：${targetDrinkName}`
```

---

## 十、完成挑戰語音

```javascript
`完成挑戰！共完成${count}題，用時${minutes}分${seconds}秒`
```

---

## 十一、coinFirst 模式語音

```javascript
// 先投幣 → 亮燈語音
`${drinkName}現在可以購買了！`

// 亮燈後引導（coinFirstFree）
'已有N個飲料可以選了'
```

> 搜尋：`_initCoinFirstScreen`、`coin-first-available`、`drinkLightUp`
