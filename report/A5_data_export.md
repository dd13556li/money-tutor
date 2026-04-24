# A5 ATM 提款機 — 資料匯出

> 資料來源：`js/a5_atm_simulator.js`
> 匯出日期：2026-04-23

---

## 一、單元基本資訊

| 欄位 | 內容 |
|------|------|
| 標題 | A5 — ATM 提款機模擬 |
| 主物件 | `ATM`（全域）|
| Debug 物件 | `ATM.Debug` |
| JS 行數 | 16,093 行（A 系列最大）|

---

## 二、交易類型（`state.settings.sessionType`）

| 值 | 說明 |
|----|------|
| `withdraw` | 提款 |
| `deposit` | 存款 |
| `inquiry` | 查詢餘額 |
| `transfer` | 轉帳 |
| `free` | 自選（學習者自己選）|
| `random` | 隨機（系統每次隨機指定）|
| `null` | 未設定 |

> 搜尋：`sessionType`、`getActualSessionType()`（統一路由函數）

---

## 三、難度配置（`DIFFICULTY_CONFIG`，全域常數，line 1381）

| 設定 | easy | normal | hard |
|------|------|--------|------|
| `name` | 簡單模式 | 普通模式 | 困難模式 |
| `autoShowHint` | true | false | false |
| `hintDelay` | 0（立即）| 10000（不再使用）| 0 |
| `showHintButton` | false | true | true |
| `strictValidation` | true | false | true |
| `allowCancel` | false | true | false |
| `trackSteps` | true | false | true |
| `pinInputValidation` | true | false | false |

---

## 四、ATM 操作步驟（`ATM_FLOW`，line 1418）

| 步驟 | 階段 id | 說明 |
|------|---------|------|
| 1 | `INSERT_CARD` | 插入金融卡（卡片動畫）|
| 2 | `ENTER_PIN` | 輸入 PIN 密碼（1234，3×4 鍵盤）|
| 3 | `SELECT_OPERATION` | 選擇交易類型（提款/存款/查詢/轉帳）|
| 4 | `AMOUNT / TRANSFER_DETAILS` | 輸入金額或轉帳帳號 |
| 5 | `CONFIRM` | 確認交易 |
| 6 | `TAKE_CASH / TAKE_RECEIPT` | 取鈔/取收據 |
| 7 | `EJECT_CARD` | 退卡 |

> 搜尋：`ATM_FLOW`（line 1418）

---

## 五、提款金額選項（easy 模式）

- 預設金額選項（常見面額，如 1000/3000/5000/10000 等）
- `easyModeHints.assignedAmount`：指定金額
- 搜尋：`easyModeHints`、`showBillSelectionModal`（2026-03-29）

---

## 六、錢幣面額（提款）

使用 100/500/1000 元紙鈔（`images/money/`）。

---

## 七、隨機任務機制

```javascript
randomBag: []  // 隨機模式當前循環剩餘類型列表
// getActualSessionType() 統一路由 sessionType
```

> 搜尋：`randomBag`、`getActualSessionType()`（2026-03-29 多處修復）

---

## 八、硬體模擬元素

| 元素 | 位置 | 功能 |
|------|------|------|
| 卡片插槽 + 指示燈 | 左側面板 | 金融卡插入/退出動畫 |
| ATM 螢幕 | 中央面板 | 主操作介面（520px 高）|
| 3×4 數字鍵盤 | 中央面板下方 | PIN / 金額 / 帳號輸入 |
| 出鈔口 | 左側面板 | 提款現金動畫 / 存款放入 |
| 收據列印機 + 收據槽 | 右側面板 | 明細表列印動畫 |

---

## 九、技術修復記錄

| 項目 | 說明 |
|------|------|
| setInterval→遞迴 | `autoTakeCash`（6 處，2026-03-15）|
| click 監聽洩漏 | `_clickModeHandler`、`unbindClickModeHandler`（2026-03-24）|
| 提款金額路由 | `startWithdrawProcess`（2026-03-29）|
| 存款提示 | `clearATMEasyHint`、`showATMEasyHint`（2026-03-29）|
| 轉帳提示彈窗 | `showBankCodeInputScreen`（2026-03-29）|
| 煙火 zIndex | `zIndex: 10200`（2026-03-28）|
