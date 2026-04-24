# F5 量比較 — 語音內容

> 資料來源：`js/f5_quantity_comparison.js`
> 匯出日期：2026-04-23

---

## 一、語音設定結構

F5 使用 `QuantityComparisonConfig.difficulties[diff].speechTemplates` 集中管理語音，各難度有獨立模板。

---

## 二、指令語音（題目開始）

```javascript
// easy：
'請比較兩邊的數量，選擇正確的關係'

// normal：
'先數數看兩邊各有幾個，再比較'

// hard：
'仔細看兩邊的圖形數量'
```

> 搜尋：`speechTemplates.instruction`

---

## 三、答對語音

```javascript
// easy：
'太棒了，答對了！'

// normal：
'答對了！'

// hard：
'正確！'
```

> 搜尋：`speechTemplates.correct`

---

## 四、答錯語音

```javascript
// easy：
'再試試看，仔細觀察兩邊的數量'

// normal：
'不對喔，再數一遍看看'

// hard：
'答錯了，繼續努力'

// 顯示正確答案時（共用）：
'正確答案已顯示，請觀察兩邊的數量關係'
```

> 搜尋：`speechTemplates.incorrect`、`speechTemplates.correctAnswer`

---

## 五、完成語音

```javascript
// easy：
'恭喜完成所有題目！'

// normal：
'很棒！完成所有題目！'

// hard：
'挑戰完成！'
```

> 搜尋：`speechTemplates.complete`

---

## 六、自訂主題語音

```javascript
// 新增自訂圖示後：
'已新增自訂圖示：{itemName}'

// 移除自訂圖示後：
'已移除圖示：{itemName}'
```

> 搜尋：`speechTemplates.addCustomItem`、`speechTemplates.removeCustomItem`

---

## 七、計時器語音（限時模式）

```javascript
// 時間到時：
'時間到！'
// 由 tick() 遞迴函數管理（2026-03-15 修復，取代 setInterval）
```

> 搜尋：`startTimer`、`tick`、`'timer'`（F5 遞迴計時器）
