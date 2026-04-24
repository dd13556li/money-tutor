# F6 數的組成 — 語音內容

> 資料來源：`js/f6_number_composition.js`
> 匯出日期：2026-04-23

---

## 一、語音系統特色

F6 使用 Promise-based 語音：`await Speech.speak(text, options)`，與其他單元的 callback 模式不同。

---

## 二、歡迎語音（`renderWelcomeScreen`）

```javascript
// 遊戲開始時
'學習數字的合成與分解，讓我們一起來練習吧！'
```

---

## 三、題目語音（依模式）

```javascript
// composition 模式（合成）
`請問 ${a} 加 ${b} 等於多少？`
// 例：「請問三加四等於多少？」

// decomposition 模式（分解）
`請問 ${total} 可以分成哪兩個數字？`
// 例：「請問七可以分成哪兩個數字？」

// fillBlank 模式（填空）
`請問 ${a} 加多少等於 ${total}？`
// 例：「請問三加多少等於七？」
```

> 搜尋：`NumberCompositionConfig.modes[mode].speech`

---

## 四、答對語音

```javascript
await Speech.speak('太棒了，答對了！')
// 播放 correct.mp3
```

---

## 五、答錯語音

```javascript
await Speech.speak('不對喔，再想想看')
// 播放 error.mp3

// retry 模式（反複練習）：可重試
// single 模式（單次）：顯示正確答案後繼續
```

---

## 六、完成語音

```javascript
// showResults() 觸發（inline）
await Speech.speak('完成挑戰！')
// 觸發 confetti + success.mp3
```

> 搜尋：`完成挑戰`（F6 inline completion）

---

## 七、自訂主題語音

```javascript
// 上傳圖片後
await Speech.speak('已新增自訂物件')
```

---

## 八、時間限制語音（困難模式）

```javascript
// 30 秒倒數到 0 時
await Speech.speak('時間到！')
```
