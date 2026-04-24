# F4 數字排序 — 資料匯出

> 資料來源：`js/f4_number_sorting.js`
> 匯出日期：2026-04-23

---

## 一、單元基本資訊

| 欄位 | 內容 |
|------|------|
| 標題 | 單元F4：數字排序 |
| 副標題 | 拖曳數字卡，由小到大（或由大到小）排序 |
| 主物件 | `Game`（全域變數）、`NumberSortingConfig`（設定物件）|
| Debug 前綴 | `[F4-*]` |
| JS 行數 | 4,121 行 |

---

## 二、數字範圍（`NumberSortingConfig.numberRanges`）

| 範圍 key | 標籤 | 起始 | 結束 | 層級數 | 每層數字數 |
|---------|------|------|------|--------|-----------|
| `1-10` | 1-10 | 1 | 10 | 1 | 10 |
| `1-20` | 1-20 | 1 | 20 | 2 | 10 |
| `1-50` | 1-50 | 1 | 50 | 5 | 10 |
| `1-100` | 1-100 | 1 | 100 | 10 | 10 |
| `custom` | 自訂範圍 | 使用者輸入 | — | — | — |

> 搜尋：`numberRanges`（line 154）、`numberRange`

---

## 三、難度設定

| 值 | 說明 |
|----|------|
| `easy` | 數字提示明顯，少量卡片（由簡單範圍）|
| `normal` | 標準難度，中等範圍 |
| `hard` | 無提示，大範圍或自訂範圍 |

---

## 四、排序方向（`sortMode`）

| 值 | 說明 |
|----|------|
| `ascending` | 由小到大（預設）|
| `descending` | 由大到小 |

---

## 五、排序卡片數（`sortingCount`）

設定每題有幾張數字卡要排序（如 4/5/6/8 張等）。

> 搜尋：`sortingCount`、`settings.sortingCount`

---

## 六、測驗模式（`settings.testMode`）

| 值 | 說明 |
|----|------|
| `retry` | 反復練習（放錯可取回）|
| `single` | 單次測試 |

---

## 七、特殊功能（2026-03-20/03-24 修復）

- **正確放置播數字語音**（2026-03-20）：`handleInstantFeedback` 正確分支播 `Speech.speak(numberBox.dataset.value)`
- **簡單模式放置不重播**（2026-03-24）：拖曳開始時播 1 次語音，放置時不再重播
- `sleep()` 輔助函數（`const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))`）— 保留
- 最多 7~8 處 `alert()` 設定驗證（刻意保留）

> 搜尋：`handleInstantFeedback`、`isConsecutive`（連續數字判斷，line 2758）
