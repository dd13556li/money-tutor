# F1 一對一對應 — 語音內容

> 資料來源：`js/f1_object_correspondence.js`
> 匯出日期：2026-04-23

---

## 一、歡迎語音

```javascript
// 遊戲開始時播放說明
'請把左邊的物品，一個一個放到右邊對應的格子裡'
// 依難度略有不同
```

> 搜尋：`welcomeText`（`f1_object_correspondence.js`）

---

## 二、題目語音（每題開始）

```javascript
// 播報本題物品名稱
`請把${itemCount}個${itemName}放到對應的格子`
// itemName 由 getItemName(icon) 取中文名稱
// 例：「請把三個蘋果放到對應的格子」
```

> 搜尋：`itemName: this.getItemName`（line 3263, 3376）

---

## 三、正確放置語音

```javascript
// 放置正確時：
`放對了！`
// 或播放 correct.mp3 音效
```

---

## 四、答錯語音

```javascript
// 放置位置錯誤：
`不對喔，請再試試看`
// 播放 error.mp3
```

---

## 五、輔助點擊語音

```javascript
// 輔助點擊模式：系統自動依序放置物品
// 每次放置前播放對應物品語音
`${itemName}`
```

> 搜尋：`f1AssistBounce`、`assist-click-hint`（F1 輔助點擊 CSS）

---

## 六、自訂主題上傳語音

```javascript
// 上傳圖片後（2026-03-14 修復）
Speech.speak('已新增自訂圖示')
// 搜尋：`confirmAddCustomItem`、`Speech.speak.*addCustomItem`
```

> 搜尋：`confirmAddCustomItem`（2026-03-14 修復）

---

## 七、完成語音

```javascript
// 所有物品放置完成後呼叫 endGame()
// 播放 success.mp3 + confetti 動畫
```

> 搜尋：`endGame`（F1）
