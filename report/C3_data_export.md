# C3 換錢 — 資料匯出

> 資料來源：`js/c3_money_exchange.js`
> 匯出日期：2026-04-23

---

## 一、金錢面額（allItems，共 7 種）

| value | name   | 圖片 front                          | 圖片 back                          |
|-------|--------|-------------------------------------|------------------------------------|
| 1     | 1元    | `images/money/1_yuan_front.png`     | `images/money/1_yuan_back.png`     |
| 5     | 5元    | `images/money/5_yuan_front.png`     | `images/money/5_yuan_back.png`     |
| 10    | 10元   | `images/money/10_yuan_front.png`    | `images/money/10_yuan_back.png`    |
| 50    | 50元   | `images/money/50_yuan_front.png`    | `images/money/50_yuan_back.png`    |
| 100   | 100元  | `images/money/100_yuan_front.png`   | `images/money/100_yuan_back.png`   |
| 500   | 500元  | `images/money/500_yuan_front.png`   | `images/money/500_yuan_back.png`   |
| 1000  | 1000元 | `images/money/1000_yuan_front.png`  | `images/money/1000_yuan_back.png`  |

---

## 二、兌換主類別（categories，共 3 類）

| key            | name          | 說明                    |
|----------------|---------------|-------------------------|
| `coin-to-coin` | 錢幣 ↔ 錢幣   | 硬幣之間互換            |
| `note-to-note` | 紙鈔 ↔ 紙鈔   | 紙鈔之間互換            |
| `coin-to-note` | 錢幣 ↔ 紙鈔   | 硬幣與紙鈔互換          |
| *(全隨機)*     | 全隨機 🎲     | 從所有類別隨機出題       |

---

## 三、兌換組合（pairs）

### 3-1 錢幣 ↔ 錢幣（coin-to-coin）

| 方向    | from | to   | name              | type           |
|---------|------|------|-------------------|----------------|
| 小換大  | 1    | 5    | 1元 → 5元         | small-to-big   |
| 小換大  | 1    | 10   | 1元 → 10元        | small-to-big   |
| 小換大  | 5    | 10   | 5元 → 10元        | small-to-big   |
| 小換大  | 5    | 50   | 5元 → 50元        | small-to-big   |
| 小換大  | 10   | 50   | 10元 → 50元       | small-to-big   |
| 大換小  | 5    | 1    | 5元 → 1元         | big-to-small   |
| 大換小  | 10   | 1    | 10元 → 1元        | big-to-small   |
| 大換小  | 10   | 5    | 10元 → 5元        | big-to-small   |
| 大換小  | 50   | 5    | 50元 → 5元        | big-to-small   |
| 大換小  | 50   | 10   | 50元 → 10元       | big-to-small   |

### 3-2 紙鈔 ↔ 紙鈔（note-to-note）

| 方向    | from | to   | name               | type           |
|---------|------|------|--------------------|----------------|
| 小換大  | 100  | 500  | 100元 → 500元      | small-to-big   |
| 小換大  | 100  | 1000 | 100元 → 1000元     | small-to-big   |
| 小換大  | 500  | 1000 | 500元 → 1000元     | small-to-big   |
| 大換小  | 500  | 100  | 500元 → 100元      | big-to-small   |
| 大換小  | 1000 | 100  | 1000元 → 100元     | big-to-small   |
| 大換小  | 1000 | 500  | 1000元 → 500元     | big-to-small   |

### 3-3 錢幣 ↔ 紙鈔（coin-to-note）

| 方向    | from | to  | name              | type           |
|---------|------|-----|-------------------|----------------|
| 小換大  | 10   | 100 | 10元 → 100元      | small-to-big   |
| 小換大  | 50   | 100 | 50元 → 100元      | small-to-big   |
| 小換大  | 50   | 500 | 50元 → 500元      | small-to-big   |
| 大換小  | 100  | 10  | 100元 → 10元      | big-to-small   |
| 大換小  | 100  | 50  | 100元 → 50元      | big-to-small   |
| 大換小  | 500  | 50  | 500元 → 50元      | big-to-small   |

---

## 四、ModeConfig — 三難度設定摘要

| 屬性                   | easy（簡單）                    | normal（普通）                   | hard（困難）                     |
|------------------------|---------------------------------|----------------------------------|----------------------------------|
| `triggerType`          | `auto`（拖入自動觸發）          | `manual`（手動觸發）             | `manual`（手動觸發）             |
| `showButton`           | false                           | true                             | true                             |
| `allowMultiRound`      | true                            | true                             | true                             |
| `visualHints`          | true（佔位符圖示）              | true（淡化圖示）                 | true（emoji 形式）               |
| `speechFeedback`       | true                            | true                             | true                             |
| `autoAdvance`          | true                            | false                            | false                            |
| `exchanges.min/max`    | `2 / 2`（固定 2 輪）           | `1 / 1`（固定 1 輪，普通固定）   | `2 / 5`（隨機 2–5 輪）           |
| `ui.targetMoneyFaded`  | false                           | true                             | true                             |
| `timing.nextQDelay`    | 1000 ms                         | 2000 ms                          | 2000 ms                          |
| `timing.allRoundsDelay`| 3000 ms                         | 4000 ms                          | 4000 ms                          |
| `validation.validator` | `validateSimple`                | `validateNormalMode`             | `validateHardMode`               |
| `success.handler`      | `handleSimpleModeSuccess`       | `handleNormalModeSuccess`        | `handleHardModeSuccess`          |

> 注意：普通模式小換大固定 1 輪（`totalExchanges = 1`）；困難/簡單模式支援多輪。
> 搜尋：`ModeConfig`

---

## 五、ModeStrategies — 策略模組

| 方法                          | 說明                                               |
|-------------------------------|----------------------------------------------------|
| `render(mode, question, ...)` | 統一渲染：呼叫 `DOMRenderer.generateGameHTML`      |
| `handleInteraction(mode, action, data)` | 統一交互：dragStart/dragEnd/dragOver/drop/complete |
| `handleDrop(mode, data, config)` | 統一放置：easy→`processDropToExchangeArea`；normal/hard→`processDropToFlexibleZone` |
| `handleCompletion(mode, data)` | 統一完成：呼叫 `CompletionStrategy.process`        |
| `handleMultiRound(mode, ...)`  | 多輪完成後決定繼續或結束                           |

> 搜尋：`ModeStrategies`

---

## 六、題目結構（quizQuestions 陣列中的每一筆）

| 欄位              | 說明                                      |
|-------------------|-------------------------------------------|
| `sourceValue`     | 來源面額（from）                          |
| `targetValue`     | 目標面額（to）                            |
| `sourceItemsCount`| 我的金錢區提供的來源金錢總數              |
| `exchangeRate`    | 兌換比率（to/from 或 from/to）            |
| `totalExchanges`  | 本題共需完成幾輪兌換                      |
| `exchangeType`    | `'small-to-big'` 或 `'big-to-small'`     |

---

## 七、題數選項

| 選項   | questionCount |
|--------|---------------|
| 1 題   | 1             |
| 3 題   | 3             |
| 5 題   | 5             |
| 10 題  | 10            |
| 自訂   | 任意整數      |

---

## 八、測驗模式（mode）

| 值        | 說明                          | 簡單模式可用 |
|-----------|-------------------------------|-------------|
| `retry`   | 反複作答（答錯退回重試）       | 否（禁用）  |
| `proceed` | 單次作答（答錯也進入下一題）   | 否（禁用）  |
| *(簡單)*  | 自動完成，無需選模式           | 是          |

---

## 九、完成畫面（endGame）— 表現評價門檻

| 正確率   | performanceMessage | performanceIcon |
|----------|--------------------|-----------------|
| ≥ 90%    | 表現優異！         | 🏆              |
| ≥ 70%    | 表現良好！         | 👍              |
| ≥ 50%    | 還需努力！         | 💪              |
| < 50%    | 多加練習！         | 📚              |

> 搜尋：`endGame`

---

## 十、學習成果清單（endGame 畫面）

- 了解等值兌換概念
- 練習硬幣與紙鈔互換
- 掌握多種換法組合
