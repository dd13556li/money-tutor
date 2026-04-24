# F2 唱數 — 語音內容

> 資料來源：`js/f2_rote_and_rational_counting.js`
> 匯出日期：2026-04-23

---

## 一、歡迎語音

```javascript
// easy 模式
'請跟著我一起數，點擊數字卡，由一數到最後'

// normal / hard 模式
'請依序點擊數字卡，由小到大數'
```

> 搜尋：`welcomeText`（F2）

---

## 二、唱數語音（每次點擊）

```javascript
// 點擊數字卡後播放對應數字語音
convertPureNumberSpeech(number)
// 例：點擊 5 → 「五」

// 簡單模式：系統依序播放每個數字
// 1 → 「一」、2 → 「二」... N → 「N」
```

> 搜尋：`convertPureNumberSpeech`、`number-speech-utils.js`

---

## 三、正確順序語音

```javascript
// 按正確順序點擊後：
`很好！`  // 或無語音，僅播 correct.mp3
```

---

## 四、答錯語音（點擊順序錯誤）

```javascript
`不對喔，應該先點 ${correctNumber}，再試一次`
// 或播放 error.mp3
```

---

## 五、完成語音

```javascript
// 完成所有題目後呼叫 endGame()
// 播放 success.mp3 + confetti + 完成畫面
```

---

## 六、簡單模式自動唱數語音

```javascript
// 簡單模式 + 輔助點擊：系統自動依序點擊，每個數字播語音
// 每點一個 → 播數字語音 → 稍後自動點下一個
```

> 搜尋：`showEasyModeResult`（line 3420）、`totalCount`
