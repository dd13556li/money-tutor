# C4 付款 — 語音內容

> 資料來源：`js/c4_correct_amount.js`
> 匯出日期：2026-04-23

---

## 一、歡迎語音

```javascript
// easy 模式
'請把正確的金錢放入付款區，剛好付清商品的價格'

// normal / hard 模式
'請從錢包中選擇正確的金錢，湊出商品的價格'
```

> 搜尋：`welcomeText`（`c4_correct_amount.js`）

---

## 二、商品價格語音

```javascript
// 開題時播商品名稱與價格
`${itemName}，${convertToTraditionalCurrency(price)}`
// 例：「鉛筆，拾五元」
```

> 搜尋：`speak.*itemName`、`convertToTraditionalCurrency`

---

## 三、逐枚放幣語音

```javascript
// 每次拖幣到付款區後播目前已付金額
`已付 ${convertToTraditionalCurrency(currentAmount)}`
// 例：「已付拾元」
```

---

## 四、答對語音

```javascript
// 恰好湊足商品價格時
`太棒了！付款成功！`
// 或使用完成音效 correct.mp3
```

---

## 五、答錯語音

```javascript
// 付款金額超過商品價格
`付太多了，請重新試試看`

// 付款金額不足（按確認時）
`金額不夠，還差一些，請再加入金錢`
```

---

## 六、提示語音

```javascript
// 提示鈕（普通/困難模式）：說明正確付法
`可以用 ${denomBreakdown}，湊成 ${targetAmount}`
```

> 搜尋：`showNormalModeHint`、`hint-btn`（C4）

---

## 七、輔助點擊語音

```javascript
// 簡單模式 + 輔助點擊：依序自動放幣，每枚播面額語音
// instruction-modal 關閉後開始
```

> 搜尋：`_closeInstructionModal`、`unit4-easy-source-item:not(.assist-click-hint)`（2026-03-17）
