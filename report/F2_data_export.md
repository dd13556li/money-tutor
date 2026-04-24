# F2 唱數 — 資料匯出

> 資料來源：`js/f2_rote_and_rational_counting.js`
> 匯出日期：2026-04-23

---

## 一、單元基本資訊

| 欄位 | 內容 |
|------|------|
| 標題 | 單元F2：數量與點數 |
| 副標題 | 練習按順序唱數，點擊數字卡由小到大計數 |
| 主物件 | `Game`（全域變數） |
| Debug 前綴 | `[F2-*]` |
| JS 行數 | 4,401 行 |

---

## 二、數數範圍設定（`countingRanges`）

| 範圍 key | 標籤 | 最小值 | 最大值 |
|---------|------|--------|--------|
| `range1-5` | 1-5 | 1 | 5 |
| `range1-10` | 1-10 | 1 | 10 |
| `range15-20` | 15-20 | 15 | 20 |
| `range20-30` | 20-30 | 20 | 30 |
| `custom` | 自訂範圍 | 1 | 30（上限）|

> 搜尋：`countingRanges`（line 600）、`countingRange`

---

## 三、難度設定

| 值 | 標籤 | 說明 |
|----|------|------|
| `easy` | 簡單 | 系統逐步引導，數字依序高亮 |
| `normal` | 普通 | 學習者依序點擊數字卡 |
| `hard` | 困難 | 無提示引導，完全自主唱數 |

---

## 四、測驗模式（`settings.testMode`）

| 值 | 說明 |
|----|------|
| `retry` | 點錯可以重試 |
| `single` | 點錯直接計錯誤次數 |

---

## 五、主題（`settings.theme`）

| 值 | 說明 |
|----|------|
| `default` | 預設主題（系統 emoji）|
| `custom` | 自訂主題（上傳圖片）|

---

## 六、設定選項補充

| 設定 | 說明 |
|------|------|
| `questionCount` | 題數（5/10/15 題等）|
| `assistClick` | 輔助點擊模式（簡單模式可用）|

---

## 七、遊戲狀態（`state`）

```javascript
state: {
    score: 0,
    currentTurn: 0,
    totalTurns: 10,      // 由 questionCount 決定
    correctAnswer: 0,
    userCountProgress: 0, // 當前唱數進度
    isAnswering: false,
    isEndingGame: false,
    customItems: [],
    startTime: null
}
```

---

## 八、自訂範圍輸入

- 設定頁可輸入自訂最小值與最大值
- `countingRanges.custom` 在使用者確認後動態更新
- 搜尋：`type === 'countingRange' && value === 'custom'`（line 2120）
