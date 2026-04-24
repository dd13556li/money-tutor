# F3 數字認讀 — 語音內容

> 資料來源：`js/f3_number_recognition.js`
> 匯出日期：2026-04-23

---

## 一、歡迎語音

```javascript
// 遊戲開始時
'看看圖示的數量，選出正確的數字'
// 或
'看看數字，找到對應數量的圖示'
```

---

## 二、題目語音

```javascript
// 顯示題目後播報：
`這裡有${count}個${itemName}`
// 例：「這裡有五個蘋果」
```

---

## 三、選項語音（點選數字卡後）

```javascript
// 選擇選項時播語音
convertPureNumberSpeech(selectedNumber)
// 例：點選「7」→「七」
```

---

## 四、答對語音

```javascript
'太棒了，答對了！'
// 播放 correct.mp3
```

---

## 五、答錯語音

```javascript
'不對喔，再想想看'
// 播放 error.mp3
```

---

## 六、自訂主題上傳語音（2026-03-14 修復）

```javascript
// 上傳圖片並確認後
Speech.speak('已新增自訂圖示：' + itemName)
// 搜尋：confirmAddCustomItem（F3）、Speech.speak.*addCustomItem
```

---

## 七、完成語音

```javascript
// endGame() 觸發
// 播放 success.mp3 + 完成畫面
```
