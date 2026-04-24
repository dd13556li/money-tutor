# A4 超市購物 — 資料匯出

> 資料來源：`js/a4_simulated_shopping.js` + `js/a4-shared-products.js`
> 匯出日期：2026-04-23

---

## 一、單元基本資訊

| 欄位 | 內容 |
|------|------|
| 標題 | A4 — 超市購物模擬 |
| 主物件 | `Game`（全域）|
| Debug 物件 | `Game.Debug` |
| JS 行數 | 15,693 行（a4_simulated_shopping.js）+ 191 行（a4-shared-products.js）|

---

## 二、商店類型（`storeType`，共 13 種）

| key | 名稱 | Emoji | 錢包上限 |
|-----|------|-------|---------|
| `convenience` | 便利商店 | 🏪 | 300 元 |
| `market` | 菜市場 | 🥬 | 300 元 |
| `breakfast` | 早餐店 | 🍳 | 300 元 |
| `stationery` | 文具店 | ✏️ | 300 元 |
| `pxmart` | 超級市場 | 🛒 | 500 元 |
| `mcdonalds` | 美式速食店 | 🍟 | 500 元 |
| `bookstore` | 書局 | 📚 | 500 元 |
| `toystore` | 玩具店 | 🧸 | 500 元 |
| `cosmetics` | 美妝店 | 💄 | 500 元 |
| `clothing` | 服飾店 | 👕 | 3,000 元 |
| `sports` | 運動用品店 | ⚽ | 3,000 元 |
| `electronics` | 3C用品店 | 📱 | 10,000 元 |
| `magic` | 魔法商店 | 🎪 | 10,000 元（自訂）|

> 搜尋：`STORE_WALLET_CAPS`（line 3226）

---

## 三、商品資料（`a4-shared-products.js`，共 12 種商店各 ~10 商品）

商品格式：`{ id, name, price, icon, imageUrl }`
圖片路徑：`images/a4/icon-a4-*-shop.png`（約 127 張）

### 便利商店商品範例

| 商品 | 參考價格範圍 |
|------|------------|
| 飲料、零食、文具、日用品等 | 20~200 元 |

### 3C 商品（electronics，2026-03-28 更新）

| 商品類型 | 最高價格 |
|---------|---------|
| 平板電腦 | 3,000 元 |
| 電子產品 | amountLevels up to 10,000 元 |

> 搜尋：`amountLevels`、`electronics: 10000`、`price_max: 3000`、`平板電腦`

---

## 四、任務類型

| 類型 | 說明 |
|------|------|
| `assigned` | 指定商品：系統隨機指定 1~2 種商品 |
| `free` | 自選模式：學習者自由選購 |

---

## 五、多步驟流程（easy 模式）

1. 任務彈窗（指定商品）
2. 選擇商品（Click 或 Drag）
3. 確認總價（`showEasyModePriceConfirmation`）
4. 選擇付款金額（從錢包）
5. 確認付款（`confirm-payment-btn`）
6. 找零驗證（`showEasyModeChangeVerification`）
7. 交易摘要（`showTransactionSummaryScreenWithData`）

---

## 六、巧克力量詞修正

- 「巧克力」量詞：「條」→「包」（2026-03-14）
- 搜尋：`getMeasureWord`、`'巧克力': '包'`

---

## 七、圖示顯示

- `b4IconHTML` 模式（A4 也有類似輔助函數）
- 商品圖 180px（交易摘要英雄圖）/ 70px（多選模式）
- 搜尋：`getProductIconHTML.*180px`、`showTransactionSummaryScreenWithData`、`productReveal`
