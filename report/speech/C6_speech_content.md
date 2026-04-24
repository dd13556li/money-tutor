# C6 找零 — 語音內容

> 資料來源：`js/c6_making_change.js`
> 匯出日期：2026-04-23

---

## 一、歡迎語音

```javascript
// easy 模式
'看看商品的價格，付款後算算應該找多少零錢給你？'

// normal / hard 模式
'計算付款後的找零金額，選出正確的找零選項'
```

> 搜尋：`welcomeText`（`c6_making_change.js`）

---

## 二、商品與付款語音（題目開始）

```javascript
`${itemName}，售價${convertToTraditionalCurrency(price)}，
 付了${convertToTraditionalCurrency(payment)}，應該找多少錢？`
// 例：「棒棒糖，售價伍元，付了拾元，應該找多少錢？」
```

---

## 三、過渡語音（2026-03-17 修復）

```javascript
// 進入下一題前
`進入第${questionIndex}題`

// 所有題目完成
`測驗結束`
```

> 搜尋：`transitionText`、`進入第`、`測驗結束`
> 注意：`nextQuestionScheduled` 旗標防止重複進題

---

## 四、答對語音

```javascript
// single 模式（完整語音）：
`答對了！找零${convertToTraditionalCurrency(change)}，太棒了！`

// repeated 模式（精簡語音，2026-04-07）：
`答對了！`
```

> 搜尋：`mode === 'single'`、`答對了`

---

## 五、答錯語音

```javascript
// single 模式：
`不對喔，找零應該是${convertToTraditionalCurrency(change)}，請再試一次`

// repeated 模式（精簡，2026-04-07）：
`不對喔，請再試一次`
```

> 搜尋：`不對喔，請再試一次`（2026-04-07 精簡）

---

## 六、找零方向語音

C6 選項答錯時，根據方向（算多了/算少了）播不同語音：

```javascript
// b6ChangeDir pattern（同 B6 找零方向）
const dir = selectedAmount > correctChange ? '算多了' : '算少了';
`不對喔，${dir}，請再試一次`
```

> 搜尋：`b6ChangeDir`（C6 借用 B6 pattern）

---

## 七、完成語音

```javascript
// 進入完成畫面（inline 完成畫面，不用 endGame()）
`完成挑戰！`
// 觸發 confetti 動畫 + success.mp3
```

> 搜尋：`完成挑戰`（C6 inline completion）
