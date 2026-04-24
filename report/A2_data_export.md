# A2 理髮廳自助機 — 資料匯出

> 資料來源：`js/a2_barber_shop_kiosk.js`
> 匯出日期：2026-04-23

---

## 一、單元基本資訊

| 欄位 | 內容 |
|------|------|
| 標題 | A2 — 理髮廳自助機 |
| 主物件 | `BarberKiosk`（DOMContentLoaded 內部，全域可用）|
| Debug 物件 | `BarberKiosk.Debug` |
| JS 行數 | 9,553 行 |

---

## 二、服務項目（`serviceConfig`，共 6 種）

| # | 服務名稱 | 價格 | 圖片 | 鍵盤快捷鍵 |
|---|---------|------|------|-----------|
| 1 | 男士剪髮 | 150 元 | `icon-a2-mens-haircut.png` | 1 |
| 2 | 女士剪髮 | 200 元 | `icon-a2-womens-haircut.png` | 2 |
| 3 | 洗髮 | 30 元 | `icon-a2-hair-wash.png` | 3 |
| 4 | 染髮 | 500 元 | `icon-a2-hair-coloring.png` | 4 |
| 5 | 頭皮隔離 | 250 元 | `icon-a2-scalp-protection.png` | 5 |
| 6 | 頭皮按摩 | 150 元 | `icon-a2-scalp-massage.png` | 6 |

> 圖片路徑：`images/a2/`（10 張 PNG，含商店圖 2 張）

---

## 三、任務類型

| 類型 | 說明 |
|------|------|
| `assigned` | 指定服務（系統隨機指定一項）|
| `free` | 自選服務（學習者自由選擇）|
| `coinFirstAssigned` | 先投幣再選：指定服務 |
| `coinFirstFree` | 先投幣再選：自由選（使用 fixed500/fixed1000）|

---

## 四、難度配置（`timingConfig`）

| 難度 | 自動提示 | 錯誤上限 | 說明 |
|------|---------|---------|------|
| easy | 立即 | 0 | 每步有語音+視覺高亮引導 |
| normal | 3 次錯誤後 | 3 | 指定任務改彈窗（2026-03-20）|
| hard | 手動提示鈕 | Infinity | 完全自主 |

---

## 五、付款流程

A2 採**兩階段付款**（2026-03-22 重構）：

1. 點選服務
2. 開啟「錢包式付款彈窗」（`walletPaymentModal`）
3. 分區放入紙鈔/硬幣
4. 確認付款（`validateCoinFirstPayment` / 一般驗證）
5. 列印票券 + 號碼牌

> 搜尋：`walletPaymentModal(activeType)`、`confirmMoneySelection`、`wp-section.inactive`

---

## 六、coinFirst 模式（先投幣再選）

- `_initCoinFirstScreen()`：顯示先投幣畫面
- `_lockServicesForCoinFirst()`：鎖定所有服務（`coin-first-locked`）
- `updateServiceAvailabilityByAmount(inserted)`：投幣金額 ≥ 服務價格時亮燈（`price <= inserted`，2026-03-28）
- coinFirstFree：批次語音「已有N個服務可以選了」

> 搜尋：`showCoinFirstScreen`、`_lockServicesForCoinFirst`、`coin-first-available`

---

## 七、設定架構（設定驅動）

| 設定物件 | 說明 |
|---------|------|
| `serviceConfig` | 6 種服務定義（各難度的服務列表、圖片、價格）|
| `speechTemplates` | 各難度語音台詞（含佔位符）|
| `timingConfig` | 各難度的動畫延遲、場景轉場時間 |
