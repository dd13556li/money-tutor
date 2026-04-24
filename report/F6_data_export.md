# F6 數的組成 — 資料匯出

> 資料來源：`js/f6_number_composition.js`
> 匯出日期：2026-04-23

---

## 一、單元基本資訊

| 欄位 | 內容 |
|------|------|
| 標題 | 單元F6：數的合成與分解 |
| 副標題 | 學習數字的組合與拆分，建立加減法基礎 |
| 主物件 | `Game`（全域）；設定物件 `NumberCompositionConfig` |
| Debug 物件 | `GameDebug`（F5/F6 共用，非 `Game.Debug`）|
| JS 行數 | 5,641 行 |

---

## 二、難度設定（`NumberCompositionConfig.difficulties`）

| 難度 | 標籤 | 顯示圖形 | 顯示數字 | 拆分部分 | 時間限制 |
|------|------|---------|---------|---------|---------|
| `easy` | 簡單 | 是 | 是 | 2 | 無 |
| `normal` | 普通 | 是 | 是 | 2 | 無 |
| `hard` | 困難 | 否 | 是 | 2 | 30 秒 |

---

## 三、數量範圍（`NumberCompositionConfig.numberRanges`）

| 範圍 key | 標籤 | 最小數 | 最大數 |
|---------|------|--------|--------|
| `range1-5` | 1-5 | 1 | 5 |
| `range1-10` | 1-10 | 1 | 10 |
| `range5-15` | 5-15 | 5 | 15 |
| `custom` | 自訂範圍 | 1 | 30 |

---

## 四、遊戲模式（`NumberCompositionConfig.modes`）

| 模式 key | 標籤 | 題目格式 | 語音格式 |
|---------|------|---------|---------|
| `composition` | 合成挑戰 | `{a} + {b} = ?` | 請問 {a} 加 {b} 等於多少？ |
| `decomposition` | 分解挑戰 | `{total} 可以分成 ? 和 ?` | 請問 {total} 可以分成哪兩個數字？ |
| `fillBlank` | 填空挑戰 | `{a} + ? = {total}` | 請問 {a} 加多少等於 {total}？ |
| `random` | 隨機挑戰 | 混合上述三種 | 隨機題目 |

---

## 五、測驗模式（`NumberCompositionConfig.testModes`）

| 值 | 標籤 | 說明 |
|----|------|------|
| `retry` | 反複練習 | 答錯可以重選，直到答對 |
| `single` | 單次挑戰 | 答錯直接顯示正確答案，繼續下題 |

---

## 六、圖示主題（設定頁選項）

| 主題 | 說明 |
|------|------|
| 預設主題 | 使用 emoji（水果/動物/交通工具混合）|
| 自訂主題 | 使用者上傳圖片（最多若干張）|

---

## 七、語音系統（F6 特有）

F6 使用 `Speech.speak(text, options)` 回傳 **Promise**，與其他單元的 callback 模式不同：

```javascript
Speech: {
    speak(text, options = {}) {
        return new Promise(async (resolve) => { ... });
    }
}
```

語音優先：Microsoft Yating → Microsoft Hanhan → Google 國語（臺灣）→ zh-TW → zh → voices[0]

> 搜尋：`GameDebug`、`NumberCompositionConfig`

---

## 八、設定頁注意事項

- 設定內嵌於 `renderWelcomeScreen()`（不是獨立的 `showSettings()`）
- 搜尋：`renderWelcomeScreen`（F6）

---

## 九、廢棄/保留程式碼

- 1 處 `await new Promise(resolve => setTimeout(resolve, 100))` 語音取消延遲（同 C4 模式，刻意保留）
- 6~7 處 `alert()` 自訂物件上傳驗證（非遊戲流程，刻意保留）
