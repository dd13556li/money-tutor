# F4 數字排序 — 語音內容

> 資料來源：`js/f4_number_sorting.js`
> 匯出日期：2026-04-23

---

## 一、歡迎語音

```javascript
// 遊戲開始時
'請把數字卡，從小到大（或從大到小）排列好'
```

---

## 二、拖曳開始語音（拖起卡片時）

```javascript
// 簡單模式：拖起時播數字語音
Speech.speak(numberCard.dataset.value)
// 例：拖起「7」→ 播「七」
```

> 注意：簡單模式放置時**不重播**（2026-03-24 修復）

---

## 三、正確放置語音（2026-03-20 新增）

```javascript
// handleInstantFeedback 正確分支
// 播放 correct.mp3 後，再播數字語音
playSound('correct')
Speech.speak(numberBox.dataset.value)
// 例：「正確音效」→「三」
```

> 搜尋：`handleInstantFeedback`（正確分支）

---

## 四、答錯語音

```javascript
// 放到錯誤位置
'不對喔，再試試看'
// 播放 error.mp3
```

---

## 五、完成語音

```javascript
// completeGame() 觸發
// 播放 success.mp3 + confetti
```

> 搜尋：`completeGame`（F4）

---

## 六、設定驗證語音

```javascript
// F4 使用 alert() 進行設定驗證（刻意保留，非遊戲流程）
// 不屬於語音系統，使用瀏覽器原生對話框
```
