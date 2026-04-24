# C2 數錢 — 語音內容

> 資料來源：`js/c2_money_counting.js`
> 匯出日期：2026-04-23

---

## 一、歡迎語音（`welcomeText`，遊戲開始時播放）

```javascript
// easy 模式
'數數看有幾元，點擊金錢圖示來計算總金額'

// normal 模式
'數數看有幾元，點擊金錢圖示計算後選擇正確答案'

// hard 模式
'數數看有幾元，點擊金錢圖示計算後輸入總金額'
```

> 搜尋：`welcomeText`、`數數看有幾元`

---

## 二、逐枚點幣語音（`speak(traditionalAmount)`）

```javascript
// 每次點擊一枚金幣後播放該幣面額中文語音
this.speak(traditionalAmount);
// traditionalAmount = convertToTraditionalCurrency(coinValue)
// 例：點擊 10 元 → 「拾元」

// 最後一枚點完後：
this.speak(traditionalAmount, () => {
    // 語音結束後進入答題階段
});
```

> 搜尋：`speak(traditionalAmount`、`最後一枚完成`

---

## 三、提示語音

```javascript
// 點擊提示鈕時
this.speak("數數看有幾元");
```

> 搜尋：`數數看有幾元`

---

## 四、答題回饋語音

```javascript
// 答對（easy 模式自動判定）
// → 無明確語音，由完成畫面接續

// 答錯時
this.speak('答錯了，再試一次', () => { ... });
```

> 搜尋：`答錯了，再試一次`

---

## 五、完成語音

```javascript
// 完成所有題目後進入完成畫面，由 showResults() 或 endGame() 接管
// 無獨立完成語音字串（由共用完成畫面 CSS + confetti 處理）
```

---

## 六、輔助點擊語音串接

```javascript
// 簡單模式 + 輔助點擊啟用時，系統依序自動點選所有金幣
// 每枚播對應面額語音，完成後自動進入答題
```

> 搜尋：`assistClick`、`C2 easy: click all uncounted coin items`
