# C1 認識錢幣 — 資料匯出

> 資料來源：`js/c1_money_types.js`
> 匯出日期：2026-04-23

---

## 一、單元基本資訊

| 欄位 | 內容 |
|------|------|
| 標題 | 單元C1：金錢的種類與面額 |
| 副標題 | 認識常用的硬幣與紙鈔，了解各種面額的價值 |
| 主物件 | `Game`（全域變數） |
| Debug 前綴 | `[C1-*]` |
| 全域動畫 style id | `c1-global-animations` |

---

## 二、錢幣資料（`gameData.items`）

### 硬幣（`coins`，共 4 種）

| 面額 | 名稱 | 正面圖片 | 反面圖片 |
|------|------|---------|---------|
| 1 | 1元 | `images/money/1_yuan_front.png` | `images/money/1_yuan_back.png` |
| 5 | 5元 | `images/money/5_yuan_front.png` | `images/money/5_yuan_back.png` |
| 10 | 10元 | `images/money/10_yuan_front.png` | `images/money/10_yuan_back.png` |
| 50 | 50元 | `images/money/50_yuan_front.png` | `images/money/50_yuan_back.png` |

### 紙鈔（`notes`，共 5 種）

| 面額 | 名稱 | 正面圖片 | 反面圖片 |
|------|------|---------|---------|
| 100 | 100元 | `images/money/100_yuan_front.png` | `images/money/100_yuan_back.png` |
| 200 | 200元 | `images/money/200_yuan_front.png` | `images/money/200_yuan_back.png` |
| 500 | 500元 | `images/money/500_yuan_front.png` | `images/money/500_yuan_back.png` |
| 1000 | 1000元 | `images/money/1000_yuan_front.png` | `images/money/1000_yuan_back.png` |
| 2000 | 2000元 | `images/money/2000_yuan_front.png` | `images/money/2000_yuan_back.png` |

> 注意：C2 的紙鈔僅有 100/500/1000 三種（無 200/2000）；C1 多了 200 和 2000 元紙鈔。

---

## 三、設定選項

### 難度（`settings.difficulty`）

| 值 | 標籤 | 說明 |
|----|------|------|
| `easy` | 簡單 | 看圖片選擇正確錢幣種類 |
| `normal` | 普通 | 看文字選擇正確錢幣種類 |
| `hard` | 困難 | 聽聲音選擇正確錢幣種類 |

### 面額選擇（`settings.category`）

| 值 | 標籤 | 來源資料 |
|----|------|---------|
| `coins` | 硬幣 | `gameData.items.coins`（4 種） |
| `notes` | 紙鈔 | `gameData.items.notes`（5 種） |
| `mixed` | 混合 | coins + notes 合併（9 種） |

### 題數（`settings.questionCount`）

| 選項 | 說明 |
|------|------|
| 1 / 3 / 5 / 10 | 固定題數 |
| 自訂 | 彈出數字鍵盤，範圍 1–100，輸入框 id：`custom-question-count-c1` |

### 測驗模式（`settings.mode`）

| 值 | 標籤 | 說明 |
|----|------|------|
| `retry` | 反複作答 | 答錯可重試同一題 |
| `proceed` | 單次作答 | 答錯直接揭示正確答案並進題 |

> 輔助點擊模式（`settings.assistClick`）啟用時，mode 固定單次且皆答對；僅「簡單」難度可見。

---

## 四、遊戲狀態（`state`）

| 欄位 | 初始值 | 說明 |
|------|--------|------|
| `score` | 0 | 答對題數 |
| `totalQuestions` | 10 | 總題數（由 questionCount 覆蓋） |
| `currentQuestionIndex` | 0 | 當前題目索引（0-based） |
| `quizQuestions` | `[]` | 預先生成的題目陣列 |
| `isAnswering` | false | 防連點旗標 |
| `audioUnlocked` | false | 行動裝置音頻解鎖狀態 |
| `startTime` | null | `Date.now()` 於 `start()` 設定 |
| `isEndingGame` | false | 防重複呼叫 `endGame()` |

---

## 五、題目結構（`quizQuestions` 元素）

```javascript
{
  answer: { value, name, images: { front, back } },  // 正確答案錢幣物件
  options: [ ...moneyItem ]                           // 已洗牌的選項陣列（min 4、max 5 個）
}
```

> 選項數量由 `Math.min(sourceData.length, 5)` 決定；硬幣模式最多 4 個選項。

---

## 六、圖片顯示邏輯

- `getRandomImage(item)`：隨機回傳 `images.front` 或 `images.back`（50/50 機率）。
- 簡單模式：正確選項顯示與題目完全相同的圖片（同正反面）；其他選項隨機。

---

## 七、完成畫面統計卡片

| 卡片 | 說明 |
|------|------|
| 答對題數 | `correctAnswers / totalQuestions` |
| 正確率 | `percentage %` |
| 完成時間 | `X秒` 或 `X分Y秒` |

### 表現評價門檻

| 百分比 | 評語 | 圖示 |
|--------|------|------|
| ≥ 90% | 表現優異 | 🏆 |
| ≥ 70% | 表現良好 | 👍 |
| ≥ 50% | 還需努力 | 💪 |
| < 50% | 多加練習 | 📚 |

### 學習成果項目（固定文字）

- 認識各面額錢幣外觀
- 分辨硬幣與紙鈔差異
- 掌握錢幣符號與數值
