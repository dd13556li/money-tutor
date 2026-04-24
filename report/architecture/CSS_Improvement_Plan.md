# Money Tutor CSS 架構改善計畫

> **建立日期**：2026-03-06（五）
> **最後更新**：2026-03-09（日）
> **狀態**：方案 B 全部完成 ✅；策略 II（unit6.css C-series 選擇器前綴 + !important 移除）已完成 ✅；⑫ a4.css img 尺寸塊清理 ✅；⑬ A 系列跨檔案冗餘 !important 清理 ✅；⑭ F 系列 !important 全面稽核（424 個全數合法，無法在 @layer 外消除）✅；**方案 E 已完成 ✅**（unit6.css 分拆為 shared-game-base.css + c-series.css，2026-03-07）；**unit6.css 已刪除 ✅**（2026-03-09）；方案 F（@layer）為長期目標
> **目的**：改善 CSS 可維護性、減少衝突、消除 `!important` 濫用、降低未來修正的 token 消耗

---

## 執行摘要（2026-03-07）

### 已完成項目

| 項目 | 說明 | 移動行數 |
|------|------|---------|
| ① C3 HTML→外部 CSS | `<style>` 1,086 行移至 `c3_money_exchange.css`（新建） | 1,086 |
| ② A2~A6 HTML→外部 CSS | 各自 `<style>` 塊追加至現有 CSS 末尾 | 1,410 |
| ③ C1/C2/C4/C5/C6 HTML→外部 CSS | 各自建立新 CSS 檔案 | 398 |
| ④ F4 HTML→外部 CSS | 37 行追加至 `f4-number-sorting.css` | 37 |
| ⑤ `ai-theme.css` selector 縮限 | `div, span` 移出 `user-select` 規則；`input` 排除 range/checkbox/radio | — |
| ⑥ `unit6.css` CSS 變數化 | 7 個 `--u6-*` 變數，62 處使用 var() | — |
| ⑦ F5 重複塊清理 | 35 行（`question-prompt-area`）從 unit6.css 移除（f5 已有） | -35 |
| ⑧ body class 命名空間 | 全部 18 個遊戲單元 HTML `<body>` 加上 `aX-unit` / `cX-unit c-series` / `fX-unit f-series` | — |
| ⑨ Design Tokens 集中至 ai-theme.css | `--coin-size` / `--banknote-size` 等 7 個語意化變數移至 `:root`；`--u6-*` 作為向後相容別名；A4/C3 CSS 改用 var() 引用（66 處）| — |
| ⑩ 策略 II 第一階段：unit6.css C-series 選擇器前綴 | `unit6.css` 中所有 C-series 專屬選擇器（`.money-item`、`.product-item`、`.hint-item`、`.payment-money-item`、`.change-money`、`.exchange-item`、`.change-verification`、`.countable-item`、`.total-display.simple-display`、`.positive-change` 等共 **177 個** selector）加上 `.c-series` 前綴，確保 F-series 頁面不受影響 | — |
| ⑪ 策略 II 第二階段：unit6.css !important 移除 | 已前綴（特異度提升）的 C-series 規則移除 `!important`：**178 → 52**（減少 **126 個**，降幅 **71%**）；剩餘 52 個均為合法共用規則（accessibility、modal 按鈕、settings 連結） | — |
| ⑫ a4.css img 尺寸塊 !important 清理 | `a4_simulated_shopping.css` 第 244～810 行的圖示尺寸規則（`.money-item.banknote img`、`.hint-item img[src*]`、`.exchange-item img`、`.target-item-display img` 等）移除冗餘 `!important`：**203 → 126**（減少 **77 個**，降幅 **38%**）；這些規則透過選擇器特異度層級（attr selector / 雙 class > 單 class+element）已能勝出，無需 `!important` | — |
| ⑬ A 系列跨檔案冗餘 !important 清理 | **a2.css 96→83**（-13）、**a3.css 90→75**（-15）、**a5.css 47→34**（-13）、**a6.css 103→100**（-3）；共 3 類冗餘：① `a.selection-btn { color !important; font-weight !important }` — ai-theme.css 已排除 `.selection-btn`，瀏覽器預設 `a`（0,0,1）低於 `a.selection-btn`（0,1,1），無需 !important；② `a3.css .unit-welcome .selection-btn.active { !important×3 }` — `.active` 特異度（0,3,0）已高於 `.selection-btn`（0,2,0）；③ `#app` / `.title-bar` 全版面寬 @media 塊（各檔案末尾，來源順序自然勝出）— 共 **44 個** | — |
| ⑭ F 系列 !important 全面稽核 | F1~F6 六個 CSS 檔案共 **424 個** `!important` 逐一分類稽核（f1:88、f2:84、f3:82、f4:73、f5:63、f6:34）；全數屬合法使用，分 4 類：① **拖曳系統執行期狀態**（SortableJS `.sortable-fallback`/`.sortable-ghost`；`.selected`/`.placed`/`.item-placed.correct` 等 class 需覆寫 unit6 基礎樣式）② **Touch 跨瀏覽器相容**（`pointer-events:none !important`、`user-select:none !important`、`outline:none !important`）③ **遊戲狀態視覺回饋**（正確 `#2ecc71`/錯誤 `#e74c3c`/當前 `#3498db` 色彩標記；completion screen `position:fixed; height:100vh`）④ **F 系列覆寫 unit6 預設值所需**（拖曳區 flex 重設、容器寬高重設）；**稽核結論：F 系列不存在「a.selection-btn」、末尾 @media、img 尺寸內鬥等冗餘模式；現有 @layer 以外的方法無法安全移除任何一個** | — |
| **合計** | **全部 18 個遊戲單元 HTML 無內嵌 `<style>` 塊；全域 design token 已集中管理；unit6.css -126；a2/a3/a4/a5/a6 合計 -121；F 系列 424 個 !important 稽核完畢（全數合法）** | **2,931 行** |

### 已延後項目

| 項目 | 原因 |
|------|------|
| 方案 E：unit6.css 分拆為 shared-game-base.css + c-series.css | 分析發現 F2 使用 `.unified-task-frame`、F5 使用 `.item-info`、F1/F2 使用 `.products-grid` 等 class 位於「C 系列專屬區段」，共用/專屬邊界比預期模糊；強行分拆風險高於效益 |
| unit6.css 剩餘 52 個 !important 評估 | 剩餘的均為真正共用規則（`#question-area`、`.upload-btn`、`.modal-footer`、`.game-buttons`、accessibility）；F-series 也使用這些 class，無法加 `.c-series` 前綴；後續可考慮個案評估或方案 F (@layer) 解決 |

---

## 一、現況 CSS 關係圖（2026-03-07 更新）

### 1.1 載入架構（每個 HTML 的 CSS 順序）

```
┌─────────────────────────────────────────────────────────┐
│                   A1（特殊例外）                          │
├─────────────────────────────────────────────────────────┤
│  a1_vending_machine.css (972行)                          │
│  common-modal-responsive.css (106行)                     │
│  dark-mode-simple.css (84行)                             │
│  ─── 未載入 ai-theme.css（唯一例外）───                  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│              A2 ~ A6（A 系列通用架構）                    │
├─────────────────────────────────────────────────────────┤
│  1. ai-theme.css (1,999行) ← 全域主題                    │
│  2. aX_unit_specific.css  ← 單元專用樣式                 │
│     A2: 3,457行  A3: 1,871行  A4: 3,819行               │
│     A5: 4,697行  A6: 2,205行                            │
│  3. common-modal-responsive.css (106行)                  │
│  4. dark-mode-simple.css (84行)                          │
│  ✅ HTML 內嵌 <style> 塊：全部移除                        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│           C1 ~ C6（C 系列通用架構）                       │
├─────────────────────────────────────────────────────────┤
│  1. ai-theme.css (1,999行)                               │
│  2. shared-game-base.css (2,831行) ← C/F 共用基礎 ✅新  │
│  3. c-series.css (559行) ← C 系列專屬 ✅ 新建            │
│  4. cX_unit_specific.css ← 單元專用樣式 ✅ 新建          │
│     C1: 132行  C2: 153行  C3: 1,094行                   │
│     C4: 65行   C5: 34行   C6: 34行                      │
│  5. common-modal-responsive.css (106行)                  │
│  6. dark-mode-simple.css (84行)                          │
│  ✅ HTML 內嵌 <style> 塊：全部移除                        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│           F1 ~ F6（F 系列通用架構）                       │
├─────────────────────────────────────────────────────────┤
│  1. ai-theme.css (1,999行)                               │
│  2. shared-game-base.css (2,831行) ← C/F 共用基礎 ✅新  │
│  3. fX-unit-specific.css ← 單元專用樣式                  │
│     F1:481行  F2:462行  F3:883行  F4:1,744行            │
│     F5:1,790行  F6:1,244行                              │
│  4. common-modal-responsive.css (106行)                  │
│  5. dark-mode-simple.css (84行)                          │
│  ✅ HTML 內嵌 <style> 塊：F4 已移除，其餘原無             │
└─────────────────────────────────────────────────────────┘
```

### 1.2 CSS 檔案規模總覽（2026-03-07 更新）

| 檔案 | 行數 | 使用單元 | 角色 |
|------|------|---------|------|
| `ai-theme.css` | 1,999 | A2~A6, C1~C6, F1~F6（17個）| 全域主題（CSS變數、顏色、動畫） |
| `shared-game-base.css` | 2,831 | C1~C6, F1~F6（12個）| C/F系列共用基礎布局（原 unit6.css 改名，2026-03-07）|
| `c-series.css` | 559 | C1~C6（6個）| C 系列專屬樣式（從 unit6.css 分拆，2026-03-07）|
| `a5_atm_simulator.css` | 4,697 | A5（1個）| 最大的單元CSS（含從HTML遷移的325行）|
| `a4_simulated_shopping.css` | 3,819 | A4（1個）| （含從HTML遷移的273行）|
| `a2_barber_shop_kiosk.css` | 3,457 | A2（1個）| （含從HTML遷移的313行）|
| `a6_train_ticket.css` | 2,205 | A6（1個）| （含從HTML遷移的373行）|
| `f5-quantity-comparison.css` | 1,790 | F5（1個）| |
| `f4-number-sorting.css` | 1,744 | F4（1個）| （含從HTML遷移的37行）|
| `a3_mcdonalds_order.css` | 1,871 | A3（1個）| （含從HTML遷移的126行）|
| `c3_money_exchange.css` | 1,094 | C3（1個）| **新建**（從HTML遷移1,086行）|
| `f6-number-composition.css` | 1,244 | F6（1個）| |
| `f3-number-recognition.css` | 883 | F3（1個）| |
| `a1_vending_machine.css` | 972 | A1（1個）| 含主題（不用ai-theme.css）|
| `f1-object-correspondence.css` | 481 | F1（1個）| |
| `f2-rote-and-rational-counting.css` | 462 | F2（1個）| |
| `c2_money_counting.css` | 153 | C2（1個）| **新建**（從HTML遷移149行）|
| `c1_money_types.css` | 132 | C1（1個）| **新建**（從HTML遷移128行）|
| `c4_correct_amount.css` | 65 | C4（1個）| **新建**（從HTML遷移61行）|
| `c5_sufficient_payment.css` | 34 | C5（1個）| **新建**（從HTML遷移30行）|
| `c6_making_change.css` | 34 | C6（1個）| **新建**（從HTML遷移30行）|
| `common-modal-responsive.css` | 106 | 全部18個 | 共用：響應式彈窗 |
| `dark-mode-simple.css` | 84 | 全部18個 | 共用：深色模式 |

---

## 二、現況問題分析

### 2.1 `!important` 用量稽核（2026-03-07 更新）

#### 外部 CSS 檔案（含已遷移的原 HTML 樣式）

| 檔案 | `!important` 數量 | 主要用途分類 |
|------|----------|------------|
| `c3_money_exchange.css` | **212** | 兌換動畫執行期顯示/隱藏（合理使用） |
| `a4_simulated_shopping.css` | **126** ✅ | 圖示尺寸 77 個已移除（2026-03-07）；剩餘：版面強制、touch、dark-mode（合理）|
| ~~`unit6.css`~~ | ~~179~~ | ✅ **2026-03-09 已刪除**（分拆為 shared-game-base.css + c-series.css，!important 已轉移至兩個新檔）|
| `a6_train_ticket.css` | **100** ✅ | 遊戲狀態高亮/動畫（合理）；3 個冗餘已移除（2026-03-07）|
| `a2_barber_shop_kiosk.css` | **83** ✅ | 遊戲狀態動畫/無障礙（合理）；13 個冗餘已移除（2026-03-07）|
| `a3_mcdonalds_order.css` | **75** ✅ | 遊戲狀態動畫（合理）；15 個冗餘已移除（2026-03-07）|
| `f1-object-correspondence.css` | **88** ✅ 稽核 | 拖曳 ghost/fallback 執行期狀態；放置正確/錯誤色彩標記；touch 相容 → 全數合法 |
| `f2-rote-and-rational-counting.css` | **84** ✅ 稽核 | 拖曳 ghost 狀態；`.item-placed.correct` 選中/放置樣式；dark mode → 全數合法 |
| `f3-number-recognition.css` | **82** ✅ 稽核 | 拖曳區 flex 重設；答對區 `display:flex !important` 覆寫 unit6；touch 相容 → 全數合法 |
| `f4-number-sorting.css` | **73** ✅ 稽核 | 數字盒游標色（藍=當前/綠=正確/紅=錯誤）；排序容器 width 重設 → 全數合法 |
| `f5-quantity-comparison.css` | **63** ✅ 稽核 | 圖片預覽 modal `transform:none; overflow:hidden; position:fixed` viewport 鎖定；touch 相容 → 全數合法 |
| `a5_atm_simulator.css` | **34** ✅ | ATM 遊戲狀態/dark-mode（合理）；13 個冗餘已移除（2026-03-07）|
| `ai-theme.css` | 34 | 瀏覽器相容性（`user-select`、`-webkit-*`）|
| `f6-number-composition.css` | **34** ✅ 稽核 | 完成畫面 `position:fixed; height:100vh; width:100%`；拖曳 ghost → 全數合法 |
| `c2_money_counting.css` | 32 | 硬幣定位與縮放（新建）|
| `c1_money_types.css` | 19 | 錢幣顯示（新建）|
| `c4_correct_amount.css` | 14 | 版面調整（新建）|
| `c5_sufficient_payment.css` | 10 | 付款版面（新建）|
| `c6_making_change.css` | 10 | 找零版面（新建）|
| `dark-mode-simple.css` | 7 | 深色模式強制覆寫 |
| `a1_vending_machine.css` | 2 | 極少，架構較乾淨 |
| `common-modal-responsive.css` | 0 | — |
| **外部 CSS 合計** | **~1,361** | （原 HTML 內嵌 418 已全部移入；A 系列累計 -121；F 系列 424 個稽核完畢，全數合法）|

#### HTML 內嵌 `<style>` 塊（2026-03-07 更新）

| 單元 | 狀態 | 備注 |
|------|------|------|
| 全部 18 個遊戲單元 | ✅ **已全部移除** | A1 原本即無 |
| `ai-robot-demo.html` | ⚪ 225 行（保留）| 非遊戲單元，低優先度 |
| `color-palette-manager.html` | ⚪ 557 行（保留）| 非遊戲單元，低優先度 |

**全專案 `!important` 總計：約 1,361 個**（原 ~1,580，已減少約 219 個；unit6.css -126 + A 系列合計 -121 + 早期 -約20）

---

### 2.2 `!important` 根本原因：隱性優先順序導致的軍備競賽

現況的 CSS cascade 依靠：

```
載入順序（被動決定）+ !important（強制覆寫）
```

當 `unit6.css` 用 `!important` 固定硬幣尺寸，A4 想覆寫時**也必須用 `!important`**，形成軍備競賽：

```css
/* unit6.css — 先定義 */
.coin-img-120 { width: 120px !important; }

/* a4.css — 為了覆寫，被迫跟進 */
.product-area .coin-img-120 { width: 80px !important; }
```

**結果**：unit6.css 和 a4 的同一屬性都有 `!important`，誰贏取決於 selector 特異度（specificity），開發者難以直觀判斷，維護成本高。

這不是「濫用」，而是**架構沒有明確的層疊優先順序宣告**所導致的必然結果。

---

### 2.3 已知衝突點

| 問題 | 成因 | 影響範圍 | 已修復 |
|------|------|---------|--------|
| 設定頁按鈕文字不呈現粗黑 | `ai-theme.css` 全域 `a { color; transition }` 覆蓋 `.selection-btn` 樣式 | A2~A6, C, F 全系列 | ✅ 2026-03-06 |
| F5 完成畫面按鈕字體偏小 | `f5-quantity-comparison.css` `.btn-text { font-size:14px }` 覆蓋完成畫面 | F5 | ✅ 已修 |
| A4 付款頁文字底部對齊 | `.item-task-text` 無 flex 布局 | A4 | ✅ 已修 |
| `ai-theme.css` 過寬 `div, span` user-select | 全域覆寫影響互動元件 | 全系列 | ✅ 2026-03-07 |
| `ai-theme.css` input 規則含 range/checkbox | 影響拖曳條與勾選框樣式 | F4/F5 | ✅ 2026-03-07 |

---

### 2.4 結構性問題（2026-03-07 更新）

| 問題 | 狀態 |
|------|------|
| C 系列無獨立 CSS 檔（全靠 HTML 內嵌） | ✅ 已修：C1~C6 各建立獨立 CSS 檔案 |
| A 系列 HTML 大量內嵌樣式（141~388 行）| ✅ 已修：全部移至各自外部 CSS |
| C3 特例：HTML 內嵌 1,102 行 | ✅ 已修：移至 c3_money_exchange.css |
| A1 架構孤立（未載入 ai-theme.css）| ⚪ 保留現狀（A1 本身運作正常，風險不划算）|
| unit6.css 過度肥大（C/F 共用邊界模糊）| ✅ 已解決：分拆為 shared-game-base.css（2,831行）+ c-series.css（559行）|
| shared-game-base.css 與 a4 規則大量重疊 | ⚪ 長期目標（方案 F / CSS @layer）|

---

## 三、`!important` 消除策略

以下三種方案可**單獨使用或組合**，不需要大規模重構即可降低 `!important` 數量。

### 策略 I：CSS 自訂屬性（變數）取代固定值 ★★★（短期最有效）

**原理**：CSS 變數的值遵守正常的 cascade 繼承，父元素重新宣告變數，子元素自動取用新值，完全不需要 `!important`。

**現況（需要 !important）**：
```css
/* unit6.css */
.coin-img-120 { width: 120px !important; }

/* a4.css — 被迫跟進 */
.product-area .coin-img-120 { width: 80px !important; }
```

**改用變數後（不需要 !important）**：
```css
/* unit6.css — 定義預設值 */
.coin-img { width: var(--coin-size, 120px); }

/* a4.css — 只改變數，selector 特異度自然更高 */
.product-area { --coin-size: 80px; }
```

**已完成（2026-03-06~07）**：
- `unit6.css`：7 個 `--u6-*` 變數，62 處使用 var()
- `ai-theme.css`：將 design tokens 集中至全域 `:root`（`--coin-size` / `--banknote-size` 等 7 個語意化變數）；`--u6-*` 作為向後相容別名
- `a4_simulated_shopping.css`：58 處舊式 `80px / 120px / 50px / 72px !important` 改用 var()
- `c3_money_exchange.css`：8 處改用 var()
- `unit6.css` `:root` 定義已移除（集中至 ai-theme.css）

**可消除的 `!important` 估算**：unit6.css 的硬幣/尺寸相關 `!important` 約 100 個可轉為變數，A4/A系列因此跟進減少約 50 個，**合計可消除 ~150 個**。

---

### 策略 II：頁面 body class 命名空間（中期）

**原理**：每個 HTML 的 `<body>` 加上唯一 class，共用檔案的 selector 加上 body class 前綴，自然提高特異度，不需要 `!important` 即可覆寫。

```html
<!-- 各 HTML body -->
<body class="c3-unit">   <!-- c3_money_exchange.html -->
<body class="f4-unit">   <!-- f4_number_sorting.html -->
```

```css
/* unit6.css — 加前綴後特異度提升 */
body.c-series .coin-area { display: flex; width: 120px; }  /* 不需要 !important */
body.f-series .coin-area { display: flex; width: 100px; }

/* c3.css — 更具體的 selector 自然勝出 */
body.c3-unit .exchange-coin-area { width: 80px; }           /* 不需要 !important */
```

**優點**：各單元的樣式天然隔離，同名 class 在不同單元不會互相污染。

---

### 策略 III：CSS `@layer`（長期，最根本）

**原理**：明確宣告層疊順序，後宣告的層永遠贏，完全消除 `!important` 的需求。

```css
/* 在所有 CSS 的最頂端宣告層疊順序（越後面優先級越高）*/
@layer base, theme, shared, unit;

/* ai-theme.css */
@layer theme {
    a { color: var(--link-color); }
}

/* unit6.css */
@layer shared {
    .coin-img { width: 120px; }
}

/* c3.css — @layer unit 自動贏過 @layer shared，完全不需要 !important */
@layer unit {
    .exchange-area .coin-img { width: 80px; }
}
```

**瀏覽器支援**：Chrome 99+、Firefox 97+、Safari 15.4+（均已普及）
**移植成本**：高（需重構所有 CSS 檔案的層宣告）
**長期效益**：最根本的解決方案，架構最清晰

---

## 四、共用 CSS 的理想架構（長期目標）

### 4.1 理想分層設計

```
現況（2026-03-07 更新後）       →    理想（長期目標）
───────────────────────────────────────────────────
ai-theme.css（1,999行）               tokens.css（~100行）
  ↳ 混有變數+元件+互動規則              ↳ 只放 CSS 變數（顏色/字體/間距/圓角）

unit6.css（3,388行）                  ai-theme.css（~400行 精簡）
  ↳ 95% C 系列 + 5% 共用基礎           ↳ 只放瀏覽器相容性 + 互動行為

各 cX.css（新建，各 34~1,094行）      shared-game-base.css（~700行，延後）
  ↳ C 系列各單元 ✅ 已完成               ↳ C/F 真正共用：設定頁、完成畫面、標題列

各 fX.css（已有，各 462~1,790行）     unit6.css（精簡至 ~2,600行）
  ↳ F 系列各單元 ✅ 已完成               ↳ C1~C6 專屬：硬幣、錢包、付款、找零

各 aX.css（已有，各 971~4,697行）     單元 CSS（各自獨立）
  ↳ A 系列各單元 ✅ 已完成               ↳ 覆寫量大幅減少
```

### 4.2 各層的責任邊界

| 層 | 檔案 | 只負責 | 不應包含 |
|----|------|-------|---------|
| **變數層** | `tokens.css` | CSS Custom Properties 定義 | 任何直接樣式規則 |
| **主題層** | `ai-theme.css` | 瀏覽器 reset、互動行為（`user-select`）| 元件顏色、版面規則 |
| **共用層** | `shared-layout.css` | C/F 真正共用的結構（設定頁、完成畫面）| 系列特有的硬幣/數字樣式 |
| **系列層** | `c-series.css` / `f-series.css` | 各系列的通用元件 | 單元間有差異的細節 |
| **單元層** | `cX.css` / `fX.css` | 單元獨有的覆寫 | 應由上層定義的共用規則 |

### 4.3 「不干擾」的保證機制

1. **CSS 變數傳遞**：上層定義預設值，下層只改變數，不覆寫規則本身
2. **body class 命名空間**：各單元 selector 加前綴，天然隔離
3. **層責任不跨越**：共用層不定義單元專屬樣式，單元層不重定義共用結構

---

## 五、方案評估

### 方案 A：現況維持（最低風險）

**做法**：不做結構改動，問題出現才個別修補

| 面向 | 評估 |
|------|------|
| 風險 | 極低（不動現有檔案）|
| 維護成本 | 高（問題難以預測、修補分散）|
| Token 消耗 | 高（每次修補需重新讀取大量檔案定位問題）|
| 建議 | 不適合長期使用 |

---

### 方案 B：將 HTML 內嵌樣式抽出至外部 CSS ✅ **已完成**

**做法**：將 A2~A6 的 HTML `<style>` 塊、C1~C6 的 HTML `<style>` 塊各自移至獨立 CSS 檔案

**執行結果（2026-03-07）**：

| 步驟 | 說明 | 移動行數 | 狀態 |
|------|------|---------|------|
| C3（1,086行）| 新建 `c3_money_exchange.css` | 1,086 | ✅ |
| A2~A6（1,410行）| 追加至各自既有 CSS 末尾 | 1,410 | ✅ |
| C1/C2/C4/C5/C6（398行）| 各自新建 CSS 檔案 | 398 | ✅ |
| F4（37行）| 追加至 `f4-number-sorting.css` | 37 | ✅ |
| **合計** | | **2,931** | **✅ 全部完成** |

**效益**：
- 全部 18 個遊戲單元 HTML 無 `<style>` 塊
- 樣式全部可用 Grep 快速定位
- 修改時不需讀取整個 HTML，只讀相關 CSS 片段

---

### 方案 C：將 ai-theme.css 合入各單元 CSS（**不建議**）

**做法**：複製 ai-theme.css 1,999 行到 A2~A6（5個）+ C1~C6（6個）+ F1~F6（6個）共 17 個 CSS 檔案

| 面向 | 評估 |
|------|------|
| 維護問題 | **嚴重**：ai-theme.css 若有任何修改，需同步更新 17 個 CSS 檔案 |
| 重複程式碼 | 17 × 1,999 行 = 33,983 行重複 |
| Token 消耗 | **大幅增加**：每次讀取單元 CSS 都要載入額外 2,000 行 |
| **結論** | **不建議**：完全違反「共用樣式集中管理」的原則 |

---

### 方案 D：將 unit6.css 整體合入各 C/F 單元 CSS（**不建議**）

**做法**：將 unit6.css 3,388 行分別合入 C1~C6 + F1~F6 共 12 個 CSS 檔案

| 面向 | 評估 |
|------|------|
| 重複程式碼 | 12 × 3,388 行 = 40,656 行重複 |
| 維護問題 | **中等**：unit6.css 若修改，需更新 12 個單元 |
| **結論** | **不建議** |

---

### 方案 E：分拆 unit6.css ✅ **已完成（2026-03-07）**

#### 執行結果

**前提條件（已全部就緒）：**
- ✅ body class 命名空間：全 18 個 HTML 已加 `c-series` / `f-series`
- ✅ 策略 II：177 個頂層選擇器已加 `.c-series` 前綴，分拆邊界明確
- ✅ F 系列用到的 `.unified-task-frame`、`.item-info` 等未被前綴，確認為共用

**分拆方式：**

| 檔案 | 行數 | 內容 |
|------|------|------|
| `c-series.css`（新建） | 559 行 | 63 個頂層 `.c-series` 前綴規則區塊（原 unit6.css 中 C 系列專屬）|
| `shared-game-base.css`（unit6.css 改名） | 2,831 行 | C/F 共用基礎規則；@media 混合區塊中的 10 個 `.c-series` 保留（行為不變）|

**HTML 更新：**
- F1~F6：`unit6.css` → `shared-game-base.css`（只替換）
- C1~C6：`unit6.css` → `shared-game-base.css` + 補加 `c-series.css`（排在 shared 之後）

**@media 區塊處理：**
含 `.c-series` 的 @media 區塊（3 個，計 10 處）均為 C/F 混合內容，全部保留在 `shared-game-base.css`。`.c-series` 前綴確保僅在 C 系列頁面生效，F 系列不受影響。

| 面向 | 結果 |
|------|------|
| 版面崩潰風險 | **低**：選擇器已前綴，搬移不改行為 |
| F 系列 CSS 載入量 | 少載入 559 行 C 系列專屬規則 |
| 選項 C 準備度 | ✅ `c-series.css` / `shared-game-base.css` 可直接對應兩個 @layer |
| **結論** | **完成** |

---

### 方案 F：CSS Layers + 消除 `!important`（**長期最根本**）

**做法**：使用 CSS `@layer` 規則明確定義層疊優先順序，配合 CSS 變數，從根本消除 `!important` 依賴

```css
/* 在所有 CSS 最頂端宣告（越後面的層優先級越高）*/
@layer base, theme, shared-layout, c-series, f-series, unit-specific;

@layer base    { /* browser reset */ }
@layer theme   { /* CSS variables, colors, interaction behaviors */ }
@layer shared-layout { /* settings page, completion screen, header */ }
@layer c-series { /* coins, wallet, payment */ }
@layer f-series { /* drag containers, number cards */ }
@layer unit-specific { /* 各單元覆寫，自動最高優先 */ }
```

| 面向 | 評估 |
|------|------|
| 解決 `!important` 濫用 | ✅ 從根本解決（預計可消除 80% 以上）|
| 瀏覽器支援 | Chrome 99+、Firefox 97+、Safari 15.4+（現已普及）|
| 架構清晰度 | 最高（層次一目了然）|
| 移植成本 | 高（需重構所有 CSS 檔案的層宣告）|
| **結論** | **長期目標**，建議方案 B + E 完成後再推進 |

---

## 六、綜合建議與完整改善計畫

### 6.1 優先順序建議

```
短期（低風險，高效益）      ─── ✅ 已完成
  方案 B：HTML 內嵌樣式抽出至外部 CSS（18 個遊戲單元 HTML 全清）
  策略 I：CSS 變數化（unit6.css 62處 + a4.css 58處 + c3.css 8處）
         Design Tokens 集中至 ai-theme.css (:root)，語意化別名覆蓋
  body class：所有 HTML <body> 加 aX-unit / cX-unit c-series / fX-unit f-series
  ai-theme.css selector 縮限（排除 div/span/range/checkbox/radio）

中期（中風險，中等效益）    ─── 策略 II 全部完成 ✅
  策略 II 第一階段：unit6.css C-series 177 個選擇器加 .c-series 前綴 ✅
  策略 II 第二階段：unit6.css !important 178 → 52（-126，降幅 71%）✅
  方案 E：unit6.css 分拆為 shared-game-base.css（2,831行）+ c-series.css（559行）✅

長期（低優先）              ─── 視情況決定
  方案 F：CSS @layer 重構
  A1 架構統一（加入 ai-theme.css 或維持現狀）
```

### 6.2 不建議執行的方案

| 方案 | 原因 |
|------|------|
| 將 ai-theme.css 合入各單元（方案 C）| 17 倍重複程式碼，共用修改成本 17 倍 |
| 將 unit6.css 整體合入各單元（方案 D）| 同上，12 倍重複 |
| 完全重寫 CSS 架構 | 版面崩潰風險極高，得不償失 |

### 6.3 各方案的版面崩潰風險控管

無論執行哪個方案，建議遵守以下規則：

1. **一次只動一個單元**：不要同時搬遷多個單元的樣式
2. **移動前建立 git commit**：確保可以還原
3. **移動後驗證清單**：
   - 設定頁面（難度/任務/錢包等按鈕正常顯示）
   - 遊戲畫面（版面未跑位）
   - 彈窗（彈窗顯示位置和層級正確）
   - 深色模式（如適用）
   - 行動裝置（375px 寬度）
4. **不修改 CSS 規則本身**：只移動位置，不改寫 selector 或屬性
5. **CSS 變數策略獨立執行**：策略 I 可以與方案 B 同步進行，互不干擾

---

## 七、下一步建議（長期）

### 策略 II：已全部完成 ✅

| 階段 | 內容 | 結果 |
|------|------|------|
| 基礎建立 | 全部 18 個 HTML `<body>` 加 body class | ✅ |
| 第一階段 | `unit6.css` 中 177 個 C-series 選擇器加 `.c-series` 前綴 | ✅ |
| 第二階段 | 移除已前綴規則的 `!important`：178 → 52（-126，71%） | ✅ |

**剩餘 52 個 `!important` 均為合法共用規則**，無法用 `.c-series` 前綴解決，原因：
- `#question-area`、`.upload-btn`：F-series 也使用
- `.modal-footer`、`.cancel-btn`、`.confirm-btn`：共用彈窗按鈕
- `.game-buttons`：共用遊戲導航
- `a.selection-btn`：共用設定按鈕
- `*`、`*:focus`：accessibility 必要

### ⑭ F 系列稽核結論（2026-03-07）✅

F1~F6 共 **424 個** !important 全數屬合法使用，4 類細分：

| 類別 | 代表規則 | 原因 |
|------|---------|------|
| 拖曳執行期狀態 | `.sortable-ghost { opacity: 0.5 !important }` | JS 動態加/移 class，需強制覆寫任何可能衝突的基礎規則 |
| Touch 跨瀏覽器相容 | `pointer-events: none !important` | iOS Safari 特殊觸控行為，需強制蓋過所有繼承 |
| 遊戲狀態色彩 | `background-color: #2ecc71 !important`（正確）| 遊戲狀態改變時需即時可見，不可被其他規則意外蓋掉 |
| 覆寫 unit6.css 預設值 | `display: flex !important`（拖曳答對區）| unit6.css 的基礎規則使用了 !important，F 系列只能跟進 |

**稽核結論：本輪 !important 削減工作在不引入 CSS @layer 的前提下已達極限。**

---

### 下一步（長期選項）

**選項 A（C 系列小型 CSS 稽核）**：c1/c2/c4/c5/c6（各 10~32 個 !important）
- 這 5 個檔案是本次從 HTML 新建的，可快速掃描是否有同類冗餘模式（`a.selection-btn`、末尾 @media 等）
- 預估可消除 0~30 個（低效益）
- 建議作為下一個小步驟（風險極低）

**選項 B（方案 E 重新評估）**：unit6.css 分拆為 shared-game-base.css + c-series.css
- 前提：先解決 F-series 使用 `.products-grid` 等 C-series 命名類的問題
- 可將 C-series 專屬區段移至 c-series.css，F-series 保留 shared 部分

**選項 C（方案 F）**：CSS `@layer` 重構
- 用 `@layer` 定義優先順序，從根本解決 !important 問題
- 預計可消除全專案 80% 以上的 !important（現約 ~1,361）
- 成本高：需重構全部 **23 個** CSS 檔案的層宣告（unit6.css 已刪除，現為 5 共用 + 6A + 6C + 6F = 23）

---

## 八、Token 消耗優化指南

### 執行方案 B 後的改善效益（已實現）

| 改善面向 | 之前 | 之後 |
|---------|------|------|
| 定位樣式 | 讀 HTML 全文（大）| Grep CSS 關鍵字（快）✅ |
| 修改樣式 | Edit HTML 內的 style 塊（風險高）| Edit 外部 CSS（安全）✅ |
| Token 消耗 | 高（每次讀取整個 HTML）| 低（只讀相關 CSS 片段）✅ |
| 維護認知負擔 | 高（樣式分散在 HTML 和 CSS）| 低（樣式集中在 CSS）✅ |

### 建議的檔案讀取策略（對 AI 工具的操作建議）

1. **定位問題**：先用 Grep，不要用 Read
2. **確認選擇器**：Grep 特定 CSS 類名，只讀相關片段
3. **讀取 CSS 時**：指定 offset + limit，不要讀全文
4. **HTML 只讀必要部分**：用 Grep 找 `link` 或 `style` 標籤

---

## 附錄 A：CSS 檔案完整清單（2026-03-07 更新）

```
css/                                    （unit6.css 已於 2026-03-09 刪除，現共 23 個 CSS 檔）
├── ai-theme.css              (1,999行) ← 全域主題，17個單元共用
├── shared-game-base.css      (2,831行) ← C/F基礎，12個單元共用（原 unit6.css 改名，2026-03-07）
├── c-series.css                (559行) ← C系列專屬，C1~C6 共用（從 unit6.css 分拆，2026-03-07）
├── common-modal-responsive.css (106行) ← 響應式彈窗，18個單元共用
├── dark-mode-simple.css         (84行) ← 深色模式，18個單元共用
│
├── [A 系列單元專用]
│   ├── a1_vending_machine.css    (972行) ← 含主題（特殊）
│   ├── a2_barber_shop_kiosk.css (3,457行) ← +313行 從HTML遷移
│   ├── a3_mcdonalds_order.css   (1,871行) ← +126行 從HTML遷移
│   ├── a4_simulated_shopping.css (3,819行) ← +273行 從HTML遷移
│   ├── a5_atm_simulator.css     (4,697行) ← +325行 從HTML遷移
│   └── a6_train_ticket.css      (2,205行) ← +373行 從HTML遷移
│
├── [C 系列單元專用] ✅ 新建（2026-03-07）
│   ├── c1_money_types.css          (132行) ← 從HTML遷移128行
│   ├── c2_money_counting.css       (153行) ← 從HTML遷移149行
│   ├── c3_money_exchange.css     (1,094行) ← 從HTML遷移1,086行（最重要）
│   ├── c4_correct_amount.css        (65行) ← 從HTML遷移61行
│   ├── c5_sufficient_payment.css    (34行) ← 從HTML遷移30行
│   └── c6_making_change.css         (34行) ← 從HTML遷移30行
│
└── [F 系列單元專用]
    ├── f1-object-correspondence.css   (481行)
    ├── f2-rote-and-rational-counting.css (462行)
    ├── f3-number-recognition.css       (883行)
    ├── f4-number-sorting.css         (1,744行) ← +37行 從HTML遷移
    ├── f5-quantity-comparison.css    (1,790行)
    └── f6-number-composition.css     (1,244行)
```

---

## 附錄 B：HTML 內嵌 style 塊狀態（2026-03-07 更新）

| 單元 | 原 HTML 內嵌行數 | 遷移後狀態 | 目標 CSS 檔案 |
|------|-------------|-----------|-------------|
| C3 | ~1,086 行 | ✅ 已移除 | `c3_money_exchange.css` |
| A6 | ~373 行 | ✅ 已移除 | `a6_train_ticket.css` |
| A5 | ~325 行 | ✅ 已移除 | `a5_atm_simulator.css` |
| A2 | ~313 行 | ✅ 已移除 | `a2_barber_shop_kiosk.css` |
| A4 | ~273 行 | ✅ 已移除 | `a4_simulated_shopping.css` |
| A3 | ~126 行 | ✅ 已移除 | `a3_mcdonalds_order.css` |
| C2 | ~149 行 | ✅ 已移除 | `c2_money_counting.css` |
| C1 | ~128 行 | ✅ 已移除 | `c1_money_types.css` |
| C4 | ~61 行 | ✅ 已移除 | `c4_correct_amount.css` |
| F4 | ~37 行 | ✅ 已移除 | `f4-number-sorting.css` |
| C5 | ~30 行 | ✅ 已移除 | `c5_sufficient_payment.css` |
| C6 | ~30 行 | ✅ 已移除 | `c6_making_change.css` |
| A1 | 0 行 | ✅ 原本即無 | — |
| F1~F3, F5~F6 | 0 行 | ✅ 原本即無 | — |
| **合計移除** | **~2,931 行** | **✅ 全部完成** | |

---

## 附錄 C：`!important` 用量明細與根本原因對照（2026-03-07 更新）

| 來源 | 數量 | 根本原因 | 對應消除策略 |
|------|------|---------|------------|
| `c3_money_exchange.css` | 212 | 兌換動畫執行期控制（合理） | 保留 |
| ~~`unit6.css` 硬幣/尺寸規則~~ | ~~90~~ | 已轉移至 shared-game-base.css（C/F 共用）+ c-series.css（C 系列專屬）| ✅ **2026-03-09 unit6.css 已刪除** |
| ~~`unit6.css` 背景/顏色規則~~ | ~~89~~ | 同上 | ✅ **2026-03-09 unit6.css 已刪除** |
| `a4.css` 商品/硬幣尺寸 | ~126 ✅ | 圖示尺寸塊 77 個冗餘已移除（選擇器特異度已充足）；剩餘：版面強制、touch、dark-mode | 方案 F (@layer) 可處理剩餘 |
| F 系列單元 CSS（各 34~88） | ~332 | 覆寫 unit6.css 拖曳/容器規則 | 方案 E + 策略 II |
| A2/A3/A5/A6 單元 CSS | ~336 | 覆寫 ai-theme.css 通用規則 | 策略 II + 縮限 selector |
| `ai-theme.css` | 34 | 瀏覽器相容性（合理使用）| 保留，補充注解 |
| C1/C2/C4/C5/C6 CSS（新建）| 85 | 硬幣/版面定位（從 HTML 遷入）| 策略 II（中期）|
| `dark-mode-simple.css` | 7 | 深色模式強制覆寫（合理）| 保留 |
| `a1_vending_machine.css` | 2 | 極少（架構較乾淨）| 保留 |
| **合計** | **~1,482** | | |

**預估消除效益**：
- 短期（方案 B ✅ + 策略 I 部分）：已消除 ~20 個（-1%）
- 中期（策略 II ✅）：unit6.css 消除 126 個（總消除 ~146 個，-9%），剩 ~1,434
- 中期（⑫ a4.css 圖示尺寸清理 ✅）：a4.css 消除 77 個（總消除 ~223 個，-14%），剩 ~1,357
- 中期（⑬ A 系列跨檔案清理 ✅）：a2/a3/a5/a6 消除 44 個（總消除 ~267 個，-17%），剩 ~1,313
- 中期（⑭ F 系列稽核 ✅）：F1~F6 共 424 個全數合法，**本輪零消除**；目前剩 **~1,361**
- 長期（方案 F / @layer）：消除全專案 80% 以上

---

*計畫檔案結束*
*建立：2026-03-06 | 最後更新：2026-03-07 | 版本：3.6 | 作者：Claude Sonnet 4.6*


下一步選項

  選項 A（小步驟，低風險）：稽核 C 系列小型 CSS（c1/c2/c4/c5/c6，各 10~32 個），掃描是否有相同冗餘模式。

  選項 B（中期）：重新評估 unit6.css 分拆（方案 E），配合已建立的 body class 命名空間。

  選項 C（長期根本）：CSS @layer 重構（方案 F），預計可消除全專案 80%+ 的 !important（需重構 23 個 CSS 檔案）。

✻ Churned for 5m 39s

> 如果進行 選項a 多次後，會有利於 選項 b 及選項 c的進行嗎？ 進行選項b，會有利於選項c的進行嗎？

● 這是一個值得仔細分析的架構問題。讓我直接說結論：

  ---
  選項 A 多次 → 選項 B 的幫助

  幾乎沒有幫助。

  選項 A（C 系列小型 CSS 稽核）處理的是「冗餘的 !important」，而選項 B（unit6.css 分拆）需要解決的問題是完全不同的一件事：判斷哪些 class 是 C 系列專屬、哪些是 C/F 共用。

  c1/c2/c4/c5/c6 檔案裡有多少 !important，對「分拆邊界在哪裡」的判斷毫無幫助。真正阻擋選項 B 的問題是——F2 用了 .unified-task-frame、F5 用了 .item-info，這些 class 藏在「C
  系列專屬區段」裡——而這個問題做多少次選項 A 都解決不了。

  ---
  選項 A 多次 → 選項 C 的幫助

  極其有限，只是少掉一點點雜音。

  CSS @layer 的實作是「替每個 CSS 檔案加上 @layer {} 包裝」，這個工作跟目前有多少 !important 完全無關。加了 @layer 之後，大部分 !important 自然就可以移除，因為層級順序已經明確宣告，不再需要強制覆寫。

  換句話說，@layer 是在「之後」解決 !important，不是需要「之前」先把 !important 清掉才能做 @layer。先做選項 A 只是在自己動手做一部分 @layer 本來可以一次解決的事。

  ---
  選項 B → 選項 C 的幫助

  有中等程度的組織幫助，但不是必要條件。

  ┌──────────────────┬──────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
  │       情境       │                                                @layer 的樣子                                                 │
  ├──────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ 不做 B，直接做 C │ @layer shared { /* unit6.css 全部 3,388 行 */} — 可行，但一個大層                                            │
  ├──────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ 先做 B，再做 C   │ @layer shared { /* shared-game-base.css ~700行 */ } @layer c-series { /* c-series.css ~2,000行 */ } — 更清晰 │
  └──────────────────┴──────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

  選項 B 讓 @layer 的層宣告語意更清楚，但 @layer 本身不需要 B 才能運作。

  ---
  整體結論

  選項 A（多次）→ 選項 B：❌ 無幫助（問題性質完全不同）
  選項 A（多次）→ 選項 C：⚠️  極微幫助（@layer 會一次解決剩餘的 !important）
  選項 B       → 選項 C：✅  中等幫助（層邊界更清晰），但非必要

  實用建議：

  - 若最終目標是 @layer（選項 C），選項 A 的邊際效益低——它只是提前手動做掉 @layer 會自動解決的事。與其多次執行選項 A，不如在準備充分後直接推進選項 C。
  - 若想先做 選項 B 再做 選項 C，兩者確實有連貫性，因為分拆後的檔案結構可以直接對應 @layer 的層宣告。但 B 本身有一定風險（邊界模糊問題），若沒把握就跳過也可以。
  - 選項 A 的最佳用途：當你只想做一個低風險的小步驟、不打算動架構時。它是獨立的清理工作，不是通往 B 或 C 的踏板。

✻ Worked for 52s

> 所推薦進行選項c嗎？

● 坦白說，我不推薦現在進行選項 C。原因如下：

  ---
  為什麼不推薦現在做 @layer

  1. 風險與效益不成比例

  @layer 是開發體驗的改善，不是功能修復。現在剩餘的 ~1,361 個 !important 並沒有造成已知的視覺 bug——它們多半是：
  - 遊戲狀態的合理使用（拖曳、正確/錯誤色彩）
  - Touch 跨瀏覽器相容（必要）
  - 動畫執行期強制覆寫（必要）

  換句話說，現狀可以運作，只是架構不夠漂亮。

  2. 實作成本遠高於想像

  需要動的檔案：22 個 CSS 檔案（每個都要加 @layer {} 包裝）
  需要驗證的畫面：18 個單元 × 多個難度模式 × 多個遊戲場景
  層宣告出錯的後果：靜默的版面崩潰（@layer 錯誤不會跳出警告）

  一個層宣告順序錯誤（例如 @layer theme, shared, unit 寫成 @layer shared, theme, unit），可能讓某個單元的按鈕顏色或版面跑位，而且很難察覺是哪裡出問題。

  3. 這是一個教育軟體，不是開源框架

  @layer 帶來的最大效益是「大型團隊協作時不會踩到彼此的 CSS」。這個專案是單人維護 + AI 協助，本來就不存在多人協作衝突的問題。

  ---
  目前的成果已相當完整

  回顧這輪 CSS 改善，原始目標都已達成：

  ┌────────────────────────┬──────────────────────────────────┐
  │          目標          │               狀態               │
  ├────────────────────────┼──────────────────────────────────┤
  │ HTML 內嵌樣式全部移除  │ ✅ 18 個單元全清                 │
  ├────────────────────────┼──────────────────────────────────┤
  │ Design tokens 集中管理 │ ✅ ai-theme.css                  │
  ├────────────────────────┼──────────────────────────────────┤
  │ 命名空間隔離           │ ✅ body class 全部設定           │
  ├────────────────────────┼──────────────────────────────────┤
  │ CSS 變數化             │ ✅ unit6.css + a4 + c3           │
  ├────────────────────────┼──────────────────────────────────┤
  │ 降低 !important 濫用   │ ✅ -219 個（-14%）               │
  ├────────────────────────┼──────────────────────────────────┤
  │ 剩餘 !important 分類   │ ✅ 全數稽核完畢（合法/不可移除） │
  └────────────────────────┴──────────────────────────────────┘

  ---
  實際建議

  現在最值得做的事是把時間花在遊戲功能本身，而不是 CSS 架構。

  如果未來真的遇到「新增功能時 CSS 衝突頻繁、每次修改都要花大量時間定位問題」，那時才是引入 @layer 的適當時機——因為屆時有明確的痛點驅動，投入成本才划算。

  現在的架構雖然不完美，但已足夠清晰、可維護，繼續追求 !important 歸零是過度工程化（over-engineering）。


 ---
  執行結果

  新建檔案

  ┌──────────────────────────┬──────────┬────────────────────────────────────────────┐
  │           檔案           │   行數   │                    內容                    │
  ├──────────────────────────┼──────────┼────────────────────────────────────────────┤
  │ css/c-series.css         │ 559 行   │ 63 個頂層 .c-series 規則區塊（C 系列專屬） │
  ├──────────────────────────┼──────────┼────────────────────────────────────────────┤
  │ css/shared-game-base.css │ 2,831 行 │ 其餘 C/F 共用規則（unit6.css 改名）        │
  └──────────────────────────┴──────────┴────────────────────────────────────────────┘

  HTML 更新（12 個）

  - F1~F6：unit6.css → shared-game-base.css
  - C1~C6：unit6.css → shared-game-base.css + 新增 c-series.css

  文件更新

  - CSS_Improvement_Plan.md：架構圖、檔案表、方案 E 狀態全部更新
  - CLAUDE.md：新增 CSS 核心檔案對照表及載入順序說明

  @media 區塊處理

  3 個混合 @media 區塊（共 10 處 .c-series）保留在 shared-game-base.css，行為完全不變，.c-series
  前綴確保僅作用於 C 系列頁面。

✻ Sautéed for 2m 6s

> CSS_Improvement_Plan.md：中下述的規劃，達成幾項？現況（2026-03-07 更新後）       →    理想（長期目標）
  ───────────────────────────────────────────────────
  ai-theme.css（1,999行）               tokens.css（~100行）
    ↳ 混有變數+元件+互動規則              ↳ 只放 CSS 變數（顏色/字體/間距/圓角）

  unit6.css（3,388行）                  ai-theme.css（~400行 精簡）
    ↳ 95% C 系列 + 5% 共用基礎           ↳ 只放瀏覽器相容性 + 互動行為

  各 cX.css（新建，各 34~1,094行）      shared-game-base.css（~700行，延後）
    ↳ C 系列各單元 ✅ 已完成               ↳ C/F 真正共用：設定頁、完成畫面、標題列

  各 fX.css（已有，各 462~1,790行）     unit6.css（精簡至 ~2,600行）
    ↳ F 系列各單元 ✅ 已完成               ↳ C1~C6 專屬：硬幣、錢包、付款、找零

  各 aX.css（已有，各 971~4,697行）     單元 CSS（各自獨立）
    ↳ A 系列各單元 ✅ 已完成               ↳ 覆寫量大幅減少
  ```

● 對照分析

  先確認目前各檔案實際行數：

● Read 1 file (ctrl+o to expand)

● 達成情況

  理想目標: tokens.css（~100行）只放 CSS 變數
  現況: 變數仍在 ai-theme.css 的 :root，未分離
  達成: ❌
  ────────────────────────────────────────
  理想目標: ai-theme.css（~400行）只放瀏覽器相容性 + 互動行為
  現況: 仍為 2,022 行，混有變數、元件、互動規則
  達成: ❌
  ────────────────────────────────────────
  理想目標: shared-game-base.css（~700行）C/F 真正共用：設定頁、完成畫面、標題列
  現況: 我們的 shared-game-base.css 是 2,831 行（unit6.css 去掉 .c-series
    規則的餘量），名稱相同但規模和定義完全不同
  達成: ⚠️ 名稱已用，語意未達
  ────────────────────────────────────────
  理想目標: unit6.css 精簡至 ~2,600行（C1~C6 專屬）
  現況: 以 c-series.css（559行）取代，只包含 .c-series 前綴規則，不是完整 C 系列專屬內容
  達成: ⚠️ 方向相近，規模落差大
  ────────────────────────────────────────
  理想目標: 各單元 CSS 覆寫量大幅減少
  現況: !important 已從 ~1,580 降至 ~1,361（-14%）；cX.css / fX.css / aX.css 均已獨立
  達成: ⚠️ 部分達成

  ---
  根本落差說明

  理想圖的分拆邏輯是**「依內容職責」**：
  unit6.css 3,388行
    ├── 真正 C/F 共用（設定頁/標題列）→ shared-game-base.css ~700行
    └── C 系列專屬（硬幣/付款/找零）  → unit6.css 精簡 ~2,600行

  我們實際做的是**「依選擇器前綴」**：
  unit6.css 3,388行
    ├── 有 .c-series 前綴的規則 → c-series.css 559行
    └── 其餘（含大量 C 系列無前綴規則）→ shared-game-base.css 2,831行

  shared-game-base.css 裡仍有大量 C 系列專屬的 class（只是沒有加 .c-series 前綴），並不符合「~700行
  真正共用」的定義。

  ---
  結論

  5 個理想目標中，實質達成：0 個，部分朝向正確方向：2 個。

  - tokens.css 分離、ai-theme.css 精簡：完全未動
  - shared-game-base.css：名稱已用，但語意不符（2,831行 ≠ ~700行）
  - c-series.css：是正確方向的第一步，但覆蓋的只是「有前綴」的規則，非全部 C 系列專屬內容
  - 單元 CSS 覆寫量：有所改善但未達「大幅減少」

  要真正達成理想架構，還需要對 shared-game-base.css 的 2,831 行做第二次職責分析，把真正共用的 ~700 行和 C
  系列專屬的 ~2,000 行再次拆分。