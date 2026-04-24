# C1 認識錢幣 — 語音內容

> 資料來源：`js/c1_money_types.js`
> 匯出日期：2026-04-23

---

## 一、語音系統配置

| 項目 | 內容 |
|------|------|
| 語音優先順序 | Microsoft Yating → Microsoft Hanhan → Google 國語（臺灣）→ zh-TW → zh → 第一個可用語音 |
| 語速（rate） | `1.0` |
| 安全超時 | 10 秒（超過自動執行 callback） |
| 金額轉換 | `NumberSpeechUtils.convertToTraditionalCurrency(amount)` |

---

## 二、測驗開始語音（`start()` 函式）

依難度播放，語音播完後才呼叫 `loadNextQuestion()`（callback 鏈）。

```
簡單：「請看圖片，選出一樣的錢幣或紙鈔」
普通：「請看文字，選出對應的錢幣或紙鈔」
困難：「請聽聲音，選出對應的錢幣或紙鈔」
```

> 搜尋關鍵字：`welcomeText` / `start()` in `c1_money_types.js`

---

## 三、題目語音（`loadNextQuestion()` + `speak(questionText)`）

題目語音格式固定為：

```
「請找出 ${traditionalCurrencyName}」
```

例如：「請找出一元」、「請找出一千元」

- `traditionalCurrencyName` 由 `convertToTraditionalCurrency(question.answer.value)` 產生
- 語音播完後 callback 呼叫 `renderOptions()`，才顯示選項

> 搜尋關鍵字：`questionText` / `請找出` / `loadNextQuestion`

---

## 四、選項懸停語音（`renderOptions()` 的 `mouseenter` / `touchstart`）

滑鼠移入或觸控開始時播放選項面額：

```
convertToTraditionalCurrency(option.value)
```

例如：「五十元」、「五百元」

> 搜尋關鍵字：`speakOptionName` / `traditionalOptionName`

---

## 五、重播語音按鈕

| 難度 | 按鈕 id | 觸發語音 |
|------|---------|---------|
| 普通 | `replay-audio-btn-normal` | `speak(questionText)` 重播題目 |
| 困難 | `replay-audio-btn` | `speak(questionText)` 重播題目 |

> 簡單模式無重播按鈕（圖片即為題目）。

---

## 六、答題回饋語音（`checkAnswer()`）

### 答對（兩種難度共用）

```
最後一題：「恭喜你答對了，測驗結束」
非最後題：「恭喜你答對了，進入下一題」
```

### 答錯 — 反複作答模式（`retry`）

```
「答錯了，再試一次」
```

### 答錯 — 單次作答模式（`proceed`）

第一段語音（播完後再播第二段）：

```
「對不起你答錯了，你選擇的是${traditionalSelectedAnswer}」
```

例：「對不起你答錯了，你選擇的是一百元」

第二段語音：

```
「這才是${traditionalCorrectAnswer}，${endingText}」
```

例：「這才是五十元，進入下一題」 / 「這才是五十元，測驗結束」

> 搜尋關鍵字：`firstSpeech` / `secondSpeech` / `對不起你答錯了` / `這才是`

---

## 七、完成畫面語音（`endGame()`）

依答對百分比決定語音文字：

```
100%：「太厲害了，全部答對了！」
≥80%：「很棒喔，答對了${correctAnswers}題！」
≥60%：「不錯喔，答對了${correctAnswers}題！」
 <60%：「要再加油喔，答對了${correctAnswers}題。」
```

> 搜尋關鍵字：`finalText` / `太厲害了` / `很棒喔` / `endGame`
