# A3 麥當勞點餐機 — 資料匯出

> 資料來源：`js/a3_mcdonalds_order.js`
> 匯出日期：2026-04-23

---

## 一、單元基本資訊

| 欄位 | 內容 |
|------|------|
| 標題 | A3 — 麥當勞點餐機 |
| 主物件 | `McDonald`（全域）|
| Debug 物件 | `McDonald.Debug` |
| JS 行數 | 11,383 行 |

---

## 二、餐點類別（`menuConfig.categories`）

| 類別 key | 名稱 | 鍵盤快捷鍵 |
|---------|------|-----------|
| `burgers` | 🍔 經典漢堡 | 1 |
| `sides` | 🍟 美味配餐 | 2 |
| `drinks` | 🥤 清涼飲品 | 3 |
| `desserts` | 🍦 繽紛甜點 | 4 |

---

## 三、漢堡（`burgers`，共 20 種）

| # | id | 名稱 | 價格 |
|---|----|------|------|
| 1 | `big-mac` | 雙層獨家醬料牛肉堡 | 75 元 |
| 2 | `mc-double` | 雙層起司牛肉堡 | 55 元 |
| 3 | `mc-chicken` | 經典香雞堡 | 65 元 |
| 4 | `filet-o-fish` | 黃金鱈魚堡 | 52 元 |
| 5 | `quarter-pounder` | 厚切牛肉堡 | 68 元 |
| 6 | `deluxe-chicken` | 勁辣雞腿堡 | 70 元 |
| 7 | `cheese-burger` | 起司牛肉堡 | 45 元 |
| 8 | `bacon-burger` | 培根牛肉堡 | 80 元 |
| 9 | `double-deluxe` | 雙層豪華牛肉堡 | 95 元 |
| 10 | `mushroom-burger` | 蘑菇牛肉堡 | 72 元 |
| 11 | `teriyaki-burger` | 照燒雞腿堡 | 68 元 |
| 12 | `veggie-burger` | 素食蔬菜堡 | 60 元 |
| 13 | `bbq-burger` | BBQ 牛肉堡 | （讀取 JS 確認）|
| 14–20 | — | （其餘 7 種）| — |

> 圖片路徑：`images/a3/icon-a3-*.png`；搜尋：`burgers`（line 387）

---

## 四、配餐（`sides`）、飲品（`drinks`）、甜點（`desserts`）

各類別各有約 10~20 種餐點，均含 `id`, `name`, `price`, `emoji`, `image` 欄位。

| 類別 | 起始行 | 說明 |
|------|--------|------|
| sides | ~550 | 薯條、雞塊、沙拉等配餐 |
| drinks | ~712 | 可樂、咖啡、牛奶、果汁等 |
| desserts | ~874 | 冰淇淋、派、聖代等 |

---

## 五、自訂餐點（魔法商品）

| 狀態容器 | 說明 |
|---------|------|
| `customItems.burgers` | 自訂漢堡列表 |
| `customItems.sides` | 自訂配餐列表 |
| `customItems.drinks` | 自訂飲品列表 |
| `customItems.desserts` | 自訂甜點列表 |

- 上傳自訂圖片，設定名稱與價格
- easy 模式自訂餐點動態定價：burgers 45~80元、sides 25~55元、drinks 20~45元、desserts 25~55元

> 搜尋：`getAllCategoryItems`、`renderCustomItemsPanel`、`handleCustomItemImageUpload`、`setEasyModeCustomItemPrices`

---

## 六、任務類型

| 類型 | 說明 |
|------|------|
| 指定任務 | 系統指定漢堡+配餐+飲料（+甜點），按順序點餐 |
| 自選模式 | 學習者自由選擇，無正確答案限制 |

---

## 七、多步驟流程

1. 選漢堡 → 2. 選配餐 → 3. 選飲料 → 4. 選甜點（可選）→ 5. 結帳 / 確認付款 → 6. 取餐（餐盤畫面）

---

## 八、餐盤 UI

- 黃色漸層 + `::before`/`::after` 把手（CSS）
- `onTrayScreen` 狀態、`trayNavCallback`
- 搜尋：`tray`（A3 CSS 搜尋關鍵字）
