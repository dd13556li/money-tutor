# B4 特賣比一比 — 完成經驗報告書

> **建立日期**：2026-04-23
> **最後更新**：2026-04-23（獨立報告建立；整合 B_Series_Unit_Completion_Report.md 截至 Round 45 的修復記錄；加入 B4 圖片引用更新）
> **專案名稱**：Money Tutor 金錢教學系統
> **單元編號**：B4 — 特賣比一比
> **報告類型**：單元完成經驗與開發建議

---

## 一、檔案規模總覽

| 檔案 | 路徑 | 行數 | 大小 |
|------|------|------|------|
| HTML 頁面 | `html/b4_sale_comparison.html` | 27 行 | 純容器 |
| JS 核心邏輯 | `js/b4_sale_comparison.js` | 5,210 行 | 313 KB |
| CSS 樣式 | `css/b4_sale_comparison.css` | 2,950 行 | — |
| **合計** | — | **8,187 行** | — |

### CSS 載入順序

```
ai-theme.css → shared-game-base.css → b-series.css → b4_sale_comparison.css
→ common-modal-responsive.css → dark-mode-simple.css
```

### 素材資源

| 類型 | 數量 | 路徑 |
|------|------|------|
| B4 商品圖片 | 21 張 PNG | `images/b4/icon-b4-*.png` |
| B4 商店圖片 | 18 張 PNG | `images/b4/icon-b4-store-*.png` |
| A4 借用圖片 | ~15 張 PNG | `images/a4/icon-a4-*-shop.png` |
| C6 借用圖片 | ~12 張 PNG | `images/c6/icon-c6-*.png` |
| 錢幣圖片 | 18 張 PNG | `images/money/*_yuan_front/back.png` |

---

## 二、單元特色

### 2.1 教學目標

B4 訓練學習者**比較不同商店的價格**，找出哪家商店賣得最便宜，並計算價差。三種比價模式全面訓練：兩商店比較、三商店排序、同商品單位比價。

### 2.2 三種比價模式（compareStores）

| 模式 | 說明 | 題庫 |
|------|------|------|
| `two` | 兩商店比較 | B4_ITEMS（40 組）|
| `triple` | 三商店由貴到便宜排序 | B4_TRIPLE_ITEMS（20 組）|
| `unit` | 同商品單位比價（計算每單位價格）| B4_UNIT_ITEMS（15 組）|

### 2.3 商品圖示系統（2026-04-23 更新）

- `b4IconHTML(item)`：有 `imageUrl` 顯示 `<img class="b4-icon-img">`，否則顯示 emoji
- `b4StoreIconHTML(storeName, storeIcon)`：同樣原理顯示商店圖示
- B4 專屬圖片（21 種商品 + 18 家商店）已全數更新檔名（移除「- 已編輯」後綴）
- 新增圖片：`icon-b4-toothbrush.png`（牙刷）、`icon-b4-raincoat.png`（雨衣）、`icon-b4-candy.png`（糖果）
- 搜尋：`b4IconHTML`、`b4StoreIconHTML`、`imageUrl`、`b4-icon-img`

### 2.4 三難度流程（2026-04-10 重構）

| 難度 | 第一頁流程 | 第二頁（差額）|
|------|-----------|--------------|
| **簡單** | 逐枚點幣累計金額 → 兩側完成自動高亮便宜卡 | 算式卡 + 單一答案按鈕（選項顯示，非???）|
| **普通** | 逐枚點幣 → 兩側完成 → 點框開 numpad 輸入較便宜價格 → 揭露卡片 | 選項初始???，點擊後自動揭露；3次後自動揭露正確答案 |
| **困難** | 價格顯示???，介紹彈窗後開 numpad 輸入較便宜價格 | ???可點 → `_showHardDiffNumpadModal`；提示鈕→算式彈窗 |

> 注意：普通/困難模式 ±10%/±20% 隨機價格變動

### 2.5 自訂價格功能

- 兩商店比較 + 普通/困難模式：設定頁可開啟「自訂價格」面板
- `_applyCustomPrices(curr, leftPrice, rightPrice)` 更新 optA/optB 價格與差額
- 搜尋：`customItemsEnabled`、`_applyCustomPrices`、`b4-cpp-apply-btn`

---

## 三、語音系統

| 場景 | 語音內容範例 |
|------|------------|
| 介紹彈窗 | 「XXX 商品，A 店 N 元，B 店 N 元，請問哪個商店賣的比較便宜？」 |
| 點幣語音 | 「拾元」（每枚播面額）；最後一枚用 Speech callback 確認完成 |
| 錯誤（三商店）| 「不對喔，請看看正確的排序」 |
| 差額錯誤（1~2次）| 「算多了/少了，再想想看」 |
| 差額錯誤（3次+）| 顯示算式 + 說出答案 |
| 困難差額提示語 | 「A 店 X 元，B 店 Y 元，兩者差多少元？」 |

- 搜尋：`請問哪一個商店賣的比較便宜`、`兩者差多少元`

---

## 四、提示系統

| 觸發條件 | 提示方式 | 搜尋關鍵字 |
|---------|---------|-----------|
| 普通第一頁 3 次錯（三商店）| 自動高亮正確商品 + 語音說答案 | `tripleAutoHint`、`tripleHintSpeech` |
| 差額第 1~2 次錯 | 方向提示（算多了/少了）| `diffErrorCount`、`revealAnswer` |
| 差額第 3 次+ | 揭露算式 + 說答案 | `revealTriple` |
| 困難差額提示鈕 | 算式彈窗（`_showHardDiffFormulaHint`）| `b4-hnp-card`、`b4-hfh-card` |
| 困難提示鈕（第一頁）| 揭露???金額 + 揭露卡片 | `_revealCoinsOnly`、`b4-price-unknown` |
| 普通提示鈕（差額頁）| 揭露???選項 + 高亮正確選項 | `_revealNormalDiffOptions`、`b4-diff-opt-masked` |

---

## 五、輔助點擊模式（AssistClick）

- 簡單/普通：按提示高亮最便宜卡 → 差額頁選項
- 困難：揭露金額 → numpad 輸入 → 差額頁 numpad
- 搜尋：`AssistClick.buildQueue`

---

## 六、完成畫面（showSavingsList）

- 標題：省錢清單
- `.b-header`（`b4-sl-reward-btn`/`b4-sl-back-btn`）
- 摘要卡（`b4-sl-summary-card`，綠色漸層）
- 卡片網格（`b4-sl-cards2`，含分類色帶 + 算式列）
- 搜尋：`b4-sl-page`、`b4-sl-card2`、`b4-sl-summary-card`

---

## 七、技術注意事項

| 項目 | 說明 | 搜尋關鍵字 |
|------|------|-----------|
| 主物件 | `Game` | `let Game;` |
| 圖示顯示 | `b4IconHTML(item)` / `b4StoreIconHTML()` | `b4-icon-img`、`b4-store-icon-img` |
| 點幣邏輯 | `_setupEasyModeCoins` / `_setupNormalModeCoins` | `b4-easy-coin`、`_handleEasyBothSidesDone` |
| 價格輸入彈窗 | `_showPriceInputSection` → `openNumpad` → `b4-pi-modal` | `b4-pi-tap-hint` |
| 差額彈窗（困難）| `_showHardDiffNumpadModal` | `b4-hnp-card` |
| 紙鈔尺寸 | `height: 48.91px; object-fit: cover` | `48.91px` |
| 自訂按鈕題數 | 無自訂題數功能（B4 省錢清單取代） | — |
