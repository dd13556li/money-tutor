# C5 夠不夠 — 語音內容

> 資料來源：`js/c5_sufficient_payment.js`
> 匯出日期：2026-04-23

---

## 一、歡迎語音

```javascript
// easy 模式
'看看你的錢包，有多少元可以用？這樣夠買東西嗎？'

// normal / hard 模式
'看看你的錢包，判斷這些錢夠不夠買商品，如果夠，選擇你要買的商品'
```

> 搜尋：`welcomeText`（`c5_sufficient_payment.js`）

---

## 二、商品價格語音（題目開始）

```javascript
`這個${itemName}要${convertToTraditionalCurrency(price)}`
// 例：「這個棒棒糖要伍元」
```

---

## 三、錢包金額語音

```javascript
`你的錢包有${convertToTraditionalCurrency(walletAmount)}`
// 例：「你的錢包有貳拾元」
```

---

## 四、「夠/不夠」判斷語音

```javascript
// 判斷「夠」（wallet >= price）：
`錢夠了，可以買${itemName}！`

// 判斷「不夠」（wallet < price）：
`錢不夠，還差${convertToTraditionalCurrency(diff)}，無法購買`
```

---

## 五、答對語音

```javascript
`答對了！太棒了！`
// 播放 correct.mp3 音效
```

---

## 六、答錯語音

```javascript
// 選錯「夠/不夠」時：
`不對喔，再想想看`
// 反復測試模式只播「不對喔，請再試一次」，不含進題語音（2026-04-07 精簡）
```

> 搜尋：`不對喔，請再試一次`、`mode === 'single'`（2026-04-07）

---

## 七、指示說明彈窗語音（`c5-instruction-modal`）

```javascript
// 說明彈窗關閉後播遊戲說明
// 搜尋：`_closeInstructionModal`、`c5-instruction-modal`（2026-03-17）
```

---

## 八、完成語音

```javascript
`完成挑戰！共完成${totalQuestions}題`
// 進入完成畫面，觸發 confetti 動畫
```

> 搜尋：`completion`、`完成挑戰`（C5 inline 完成畫面）
