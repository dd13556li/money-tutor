# C2 數錢 — 資料匯出

> 資料來源：`js/c2_money_counting.js`
> 匯出日期：2026-04-23

---

## 一、單元基本資訊

| 欄位 | 內容 |
|------|------|
| 標題 | 單元C2：金錢的點數與加總 |
| 副標題 | 學習計算金錢的總金額，練習將不同面額的金錢加總計算 |
| 主物件 | `Game`（全域變數） |
| Debug 前綴 | `[C2-*]` |
| 全域動畫 style id | `c2-global-animations` |

---

## 二、錢幣資料（`gameData.items`）

### 硬幣（`coins`，共 4 種）

| 面額 | 名稱 | 正面圖片 | 反面圖片 |
|------|------|---------|---------|
| 1 | 1元 | `images/money/1_yuan_front.png` | `images/money/1_yuan_back.png` |
| 5 | 5元 | `images/money/5_yuan_front.png` | `images/money/5_yuan_back.png` |
| 10 | 10元 | `images/money/10_yuan_front.png` | `images/money/10_yuan_back.png` |
| 50 | 50元 | `images/money/50_yuan_front.png` | `images/money/50_yuan_back.png` |

### 紙鈔（`notes`，共 3 種）

| 面額 | 名稱 | 正面圖片 | 反面圖片 |
|------|------|---------|---------|
| 100 | 100元 | `images/money/100_yuan_front.png` | `images/money/100_yuan_back.png` |
| 500 | 500元 | `images/money/500_yuan_front.png` | `images/money/500_yuan_back.png` |
| 1000 | 1000元 | `images/money/1000_yuan_front.png` | `images/money/1000_yuan_back.png` |

> 注意：C2 紙鈔僅 100/500/1000 三種（C1 多了 200/2000）。

---

## 三、設定選項

### 難度（`settings.difficulty`）

| 值 | 標籤 | 說明 |
|----|------|------|
| `easy` | 簡單 | 系統幫你數，引導下完成題目（自動判定正確） |
| `normal` | 普通 | 系統幫你數，以選擇題方式選擇正確答案 |
| `hard` | 困難 | 自己數，輸入正確金額數字 |

> 簡單模式無需選擇測驗模式（自動完成）。

### 面額選擇（`settings.category`）

| 值 | 標籤 | 來源資料 |
|----|------|---------|
| `coins` | 硬幣 | `gameData.items.coins`（4 種） |
| `notes` | 紙鈔 | `gameData.items.notes`（3 種） |
| `mixed` | 混合 | coins + notes 合併（7 種） |
| `random` | 隨機 | 從全部 7 種中隨機選 2–4 種面額（自動，不顯示手動選擇） |

### 面額複選（`settings.selectedItems`，僅 coins/notes/mixed）

選擇 category 後顯示 `#item-selection-group`，可多選要練習的面額（值陣列）。

### 金錢數量（`settings.moneyQuantity`）

| 值 | 標籤 | 實際範圍 |
|----|------|---------|
| `default` | 預設(5-20) | 隨機 5–20 個 |
| `1-10` | 1-10個 | 隨機 1–10 個 |
| `10-15` | 10-15個 | 隨機 10–15 個 |
| `15-20` | 15-20個 | 隨機 15–20 個 |
| `20-25` | 20-25個 | 隨機 20–25 個 |
| `25-30` | 25-30個 | 隨機 25–30 個 |

### 題數（`settings.questionCount`）

| 選項 | 說明 |
|------|------|
| 1 / 3 / 5 / 10 | 固定題數 |
| 自訂 | 彈出數字鍵盤，範圍 1–100，輸入框 id：`custom-question-count-c2` |

### 測驗模式（`settings.mode`，簡單模式不可選）

| 值 | 標籤 | 說明 |
|----|------|------|
| `retry` | 反複作答 | 答錯重置點數後重試 |
| `proceed` | 單次作答 | 答錯揭示正確答案並進題 |

---

## 四、遊戲狀態（`state`）

| 欄位 | 初始值 | 說明 |
|------|--------|------|
| `score` | 0 | 答對題數 |
| `totalQuestions` | 10 | 總題數 |
| `currentQuestionIndex` | 0 | 當前題目索引（0-based） |
| `quizQuestions` | `[]` | 預先生成的題目陣列 |
| `isAnswering` | false | 防連點旗標 |
| `audioUnlocked` | false | 行動裝置音頻解鎖狀態 |
| `startTime` | null | `Date.now()` 於 `start()` 設定 |
| `runningTotal` | 0 | 點數中的累計金額 |
| `itemsToCount` | 0 | 本題錢幣總數量 |
| `countedItems` | 0 | 已點擊的錢幣數量 |
| `correctTotal` | 0 | 本題正確總金額 |
| `isEndingGame` | false | 防重複呼叫 `endGame()` |
| `isPlayingFinalAmount` | false | 最後一枚語音播放中（鎖定點擊） |

---

## 五、題目結構（`quizQuestions` 元素）

```javascript
{
  items: [
    { item: { value, name, images: { front, back } }, quantity: N },
    ...
  ],
  correctTotal: N  // 所有 item.value * quantity 之加總
}
```

### 題目生成規則（`generateQuestions()`）

1. 依 `selectedItems` 或 `category` 建立 `itemPool`
2. 若有 `selectedItems`，每種面額至少出現 1 次（必現邏輯）
3. 剩餘名額從 itemPool 隨機填充至 `targetTotalCount`
4. 連續兩題相同（`areQuestionsEqual`）時重新生成（最多 50 次嘗試）

---

## 六、錢幣顯示邏輯

- `getRandomImage(item)`：隨機回傳 `images.front` 或 `images.back`（50/50 機率）
- 點擊後 item 加 `.counted` class，不可重複點擊
- 簡單模式：顯示累計數字（`.count-number`）
- 普通模式：顯示綠色打勾（`.count-checkmark`）
- 困難模式：點完後直接進入答題，無即時數字顯示

---

## 七、答題介面

### 普通模式選項生成（`showOptions()`）

- 正確答案 + 2 個錯誤選項（正確答案 ±5~40 的隨機偏移）
- 3 個選項隨機排列
- 按鈕文字格式：`${optionValue} 元`

### 困難模式輸入（`showNumberInput()`）

- 3×4 數字鍵盤彈窗（標題：`請輸入總金額`）
- 最大輸入 5 位數字
- 按鈕：1–9、清除、0、確認

---

## 八、提示功能

| 難度 | 提示按鈕 | 觸發語音 |
|------|---------|---------|
| 普通 | `onclick="Game.showTotalHint()"` | 播報總計金額，顯示 1 秒後恢復 `？？？` |
| 困難 | `onclick="Game.showTotalHint()"` | 同上 |

> 簡單模式無提示按鈕，直接顯示累計金額。

---

## 九、完成畫面統計卡片

| 卡片 | 說明 |
|------|------|
| 答對題數 | `correctCount / totalQuestions` |
| 正確率 | `percentage %` |
| 完成時間 | `X 秒` 或 `X 分 Y 秒` |

### 表現評價門檻

| 百分比 | 評語 | 圖示 |
|--------|------|------|
| ≥ 90% | 表現優異！ | 🏆 |
| ≥ 70% | 表現良好！ | 👍 |
| ≥ 50% | 還需努力！ | 💪 |
| < 50% | 多加練習！ | 📚 |

### 學習成果項目（固定文字）

- 學會逐一點數錢幣金額
- 掌握累計加總技巧
- 練習不同組合的金額計算
