# C4 付款 — 資料匯出

> 資料來源：`js/c4_correct_amount.js`
> 匯出日期：2026-04-23

---

## 一、單元基本資訊

| 欄位 | 內容 |
|------|------|
| 標題 | 單元C4：付款 |
| 副標題 | 從錢包選取正確金額，恰好付清商品價格 |
| 主物件 | `Game`（全域變數） |
| Debug 前綴 | `[C4-*]` |
| JS 行數 | 6,133 行 |

---

## 二、商品資料

C4 商品圖片引用自 `images/c5/` 目錄（與 C5 共用）。商品以隨機方式從難度對應的金額範圍內生成，不使用固定商品清單。

### 金額生成邏輯

| 難度 | 金額範圍 | 說明 |
|------|---------|------|
| easy | 低金額（1-10 元範圍） | 系統自動選幣，引導放入 |
| normal | 中金額（10-100 元範圍） | 學習者拖幣，選擇題驗證 |
| hard | 高金額（可含百元紙鈔） | 學習者自行拖幣湊足 |

> 詳細金額邏輯：搜尋 `generatePaymentAmount`、`wallet.*amount`

---

## 三、錢幣面額

使用全套台幣面額（硬幣 + 紙鈔，共 7 種）：

| 面額 | 類型 | 圖片路徑 |
|------|------|---------|
| 1 | 硬幣 | `images/money/1_yuan_front/back.png` |
| 5 | 硬幣 | `images/money/5_yuan_front/back.png` |
| 10 | 硬幣 | `images/money/10_yuan_front/back.png` |
| 50 | 硬幣 | `images/money/50_yuan_front/back.png` |
| 100 | 紙鈔 | `images/money/100_yuan_front/back.png` |
| 500 | 紙鈔 | `images/money/500_yuan_front/back.png` |
| 1000 | 紙鈔 | `images/money/1000_yuan_front/back.png` |

---

## 四、難度設定

| 值 | 標籤 | 說明 |
|----|------|------|
| `easy` | 簡單 | 系統顯示提示，輔助點擊可全自動 |
| `normal` | 普通 | 拖幣後選擇題確認；錯誤 3 次後顯示提示 |
| `hard` | 困難 | 完全自主操作，提示鈕手動觸發 |

---

## 五、測驗模式（`settings.mode`）

| 值 | 說明 |
|----|------|
| `repeated` | 反復測試（同商品可重複出現）|
| `single` | 單次測試（每個商品只出現一次）|

> 注意：easy 模式下測驗模式按鈕禁用；搜尋 `modeRequired`、`mode-selection-group`

---

## 六、錢包組合搜索系統

C4 實作**錢包金額組合搜索**演算法，確保錢包中必有恰好的付款組合：

- `combinationSearch(amount)` — 找出湊成指定金額的所有可能幣值組合
- 超時保護：最大搜索時間限制（搜尋 `組合搜索.*超時`）
- 包含所有幣值的最小組合優先

> 搜尋：`組合搜索`、`_closeInstructionModal`、`instruction-modal-overlay`

---

## 七、指示說明彈窗（`instruction-modal-overlay`）

C4 是 C 系列中唯一有「說明彈窗」的單元：
- 遊戲開始前顯示操作說明
- `_closeInstructionModal()` 關閉彈窗後進入遊戲
- 輔助點擊偵測：`unit4-easy-source-item:not(.assist-click-hint)`

> 搜尋：`_closeInstructionModal`、`instruction-modal-overlay`（2026-03-17 修復）

---

## 八、圖片規格

- 商品圖片：引用 `images/c5/icon-c5-*.png`（C4 借用 C5 圖片庫）
- 錢幣圖片：`images/money/` 目錄（全 C 系列共用）
