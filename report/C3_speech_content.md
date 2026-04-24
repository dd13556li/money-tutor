# C3 換錢 — 語音內容

> 資料來源：`js/c3_money_exchange.js`
> 匯出日期：2026-04-23

---

## 一、歡迎語音（`welcomeText`）

```javascript
this.Speech.speak(welcomeText, currentMode, config, () => { ... });
// 內容依難度與模式不同，開場說明換錢規則
```

> 搜尋：`welcomeText`、`Speech.speak.*welcome`

---

## 二、換錢題目語音

```javascript
// 每題開始時描述要換的金額與目標面額
MoneyExchange3.Speech.speak(speechText, mode, config);
// 例：「請把一個五十元，換成幾個十元？」
```

> 搜尋：`speechText`、`MoneyExchange3.Speech.speak`（line 2317）

---

## 三、答對語音

```javascript
// 正確放置後：
this.Speech.speak(finalMessage, 'normal', this.ModeConfig.normal, () => { ... });
// line 1143：單輪完成語音
// line 1211：多輪完成語音
```

> 搜尋：`finalMessage`、`speak.*1143`、`playFinalCompletionSpeech`

---

## 四、答錯語音

```javascript
// 放置錯誤時：
MoneyExchange3.Speech.speak(errorMessage, mode, config, () => { ... });
// 「不對喔，再想想看」（普通/困難）
```

> 搜尋：`errorMessage`（line 2776, 2783）

---

## 五、進入下一輪語音

```javascript
MoneyExchange3.Speech.speak('進入下一輪兌換', mode, config, () => { ... });
// line 3186：普通模式多輪換錢切換時
```

> 搜尋：`進入下一輪兌換`

---

## 六、完成所有題目語音

```javascript
this.Speech.speak('恭喜完成所有題目', difficulty, config);
// line 6516
```

> 搜尋：`恭喜完成所有題目`

---

## 七、提示語音（C3 hint）

```javascript
// 普通模式提示鈕：說明正確換法
this.Speech.speak(speechText, difficulty, config, () => { ... });
// line 5862, 5919, 5921, 5949, 5969, 6089
```

> 搜尋：`showNormalModeHint`、`c3-hint-btn`

---

## 八、多輪換錢語音（round message）

```javascript
MoneyExchange3.Speech.speak(roundMessage, difficulty, config, () => { ... });
// line 7578：開始新一輪
MoneyExchange3.Speech.speak(successMessage, difficulty, config, () => { ... });
// line 7619：本輪完成
MoneyExchange3.Speech.speak(errorMessage, difficulty, config, () => { ... });
// line 7655, 7680：本輪錯誤
```

> 搜尋：`roundMessage`、`successMessage`（line 7578~7680）

---

## 九、語音系統特色

- C3 使用 `MoneyExchange3.Speech.speak(text, mode, config, callback)` — 比其他單元多傳 `mode` 和 `config` 參數
- `safeCallback()` catch 雙重回調防護（2026-03-07 修復）
- 搜尋：`speak(text, mode = null, config = null, callback = null)`（line 10187）
