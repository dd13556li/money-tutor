# Worksheet 作業單系統完成報告

> **作業單系統（worksheet/）** — 18 個單元的印刷用練習題產生器
> 最後更新：2026-03-21

---

## 一、檔案規模總覽

### 核心檔案

| 檔案 | 行數 | 說明 |
|------|------|------|
| `worksheet/index.html` | ~572 行 | 主頁面（含嵌入式 WorksheetApp 控制器） |
| `worksheet/worksheet-generator.js` | ~165 行 | 核心引擎（Registry、Generator、工具函數） |
| `worksheet/worksheet-styles.css` | ~707 行 | 作業單樣式表 |

### 各單元 JS（worksheet/units/）

| 系列 | 單元 | 行數 |
|------|------|------|
| A | a1-worksheet.js | ~435 |
| A | a2-worksheet.js | ~370 |
| A | a3-worksheet.js | ~444 |
| A | a4-worksheet.js | ~658 |
| A | a5-worksheet.js | ~434 |
| A | a6-worksheet.js | ~382 |
| **A 系列合計** | | **~2723** |
| C | c1-worksheet.js | ~150 |
| C | c2-worksheet.js | ~129 |
| C | c3-worksheet.js | ~205 |
| C | c4-worksheet.js | ~241 |
| C | c5-worksheet.js | ~279 |
| C | c6-worksheet.js | ~217 |
| **C 系列合計** | | **~1221** |
| F | f1-worksheet.js | ~134 |
| F | f2-worksheet.js | ~204 |
| F | f3-worksheet.js | ~115 |
| F | f4-worksheet.js | ~153 |
| F | f5-worksheet.js | ~195 |
| F | f6-worksheet.js | ~150 |
| **F 系列合計** | | **~951** |
| **全部 units 合計** | | **~4895** |

### 外部依賴

| 檔案 | 說明 | 引用於 |
|------|------|--------|
| `../js/a4-shared-products.js` | A4 共用商品資料（12 種商店 × 10 商品） | index.html（a4-worksheet.js 之前） |

---

## 二、系統架構

### 2.1 三層結構

```
WorksheetApp（index.html 內嵌）
    ↓ 呼叫
WorksheetGenerator（worksheet-generator.js）
    ↓ 查詢
WorksheetRegistry（worksheet-generator.js）
    ← register 來自各 units/*.js
```

### 2.2 WorksheetRegistry

```javascript
WorksheetRegistry.register(id, config)  // 各 unit JS 呼叫
WorksheetRegistry.has(id)               // 檢查單元是否存在
WorksheetRegistry.get(id)               // 取得單元配置
```

### 2.3 WorksheetGenerator

```javascript
class WorksheetGenerator {
    constructor(unitId, options)
    generate()      // 產生兩頁（第2頁避免與第1頁重複）
    renderPage(config, questions)  // 渲染單頁 HTML
}
```

**渲染流程**：
1. `generate()` 呼叫 `config.generate()` 兩次（含 `_usedValues` 去重機制）
2. 輸出 HTML = `renderPage(questions1) + renderPage(questions2)`
3. `renderPage()` 固定產生：標題區（單元名稱、姓名/日期欄）→ 題目區（`.question-block`）→ 頁尾（`數學小達人作業單`）

**每題資料結構**：
```javascript
{
    prompt: string,        // 題目文字
    visual: string,        // 圖示 HTML（可選）
    answerArea: string,    // 作答區 HTML（可選）
    answerDisplay: string, // 答案顯示（答案卷用）
    _key: string           // 去重用唯一鍵（可選，預設用 prompt）
}
```

### 2.4 WorksheetApp（index.html）

| 方法 | 說明 |
|------|------|
| `init()` | 解析 URL 參數、執行 `generate()`、初始化事件 |
| `generate()` | 產生 seed → `_generateWithSeed()` |
| `_generateWithSeed(seed, showAnswers)` | 以固定 seed 產生作業單（確保作業/答案卷一致） |
| `regenerate()` | 重新產生（新 seed） |
| `_trimOverflowQuestions()` | 移除超出頁尾的 `.question-block` |
| `_applyScale()` | 套用 `--ws-font-scale`、`--ws-icon-scale` CSS 變數 |
| `showSizeAdjust()` | 顯示大小調整 modal（文字：小/中/大、圖示：小/中/大） |
| `updateToolbarLabels()` | 根據 `toolbarConfig` 動態渲染工具列按鈕 |
| `_callAfterRender()` | 呼叫 `config.afterRender()`（F1 SVG 連線等） |
| `print(withAnswers)` | 列印（以相同 seed 重新渲染答案卷） |

### 2.5 亂數種子機制（Seeded PRNG）

```javascript
// Mulberry32 演算法
function createSeededRandom(seed) { ... }

// 使用方式（_generateWithSeed 中）
Math.random = createSeededRandom(seed);
// ...產生題目...
Math.random = origRandom; // finally 區塊還原
```

作業單（`showAnswers=false`）與答案卷（`showAnswers=true`）使用**同一 seed**，確保題目一致。

---

## 三、工具函數速查（worksheet-generator.js）

| 函數 | 說明 | 輸出範例 |
|------|------|---------|
| `coinImg(value)` | 硬幣/紙鈔正面圖片 | `<img src="../images/money/10_yuan_front.png">` |
| `coinImgFront(value)` | 硬幣/紙鈔正面（同 coinImg） | — |
| `coinImgBack(value)` | 硬幣/紙鈔反面 | `<img src="../images/money/10_yuan_back.png">` |
| `coinImgRandom(value)` | 隨機正/反面 | — |
| `coinTag(value)` | 面額標籤（≥100 元加 `note` class） | `<span class="coin-tag">10元</span>` |
| `coinSymbol(value)` | 面額符號方塊（≥100 元加 `note-symbol` class） | `<span class="coin-symbol">10</span>` |
| `coinQuantifier(value)` | 面額量詞 | `≥100→張`、`<100→個` |
| `walletToCoins(amount)` | 金額拆解為最少硬幣/紙鈔陣列 | `walletToCoins(165)→[100,50,10,5]` |
| `blankLine(wide)` | 填空格線 | `<span class="blank-line">` |
| `randomInt(min, max)` | 整數亂數 | — |
| `shuffle(arr)` | Fisher-Yates 洗牌 | — |
| `pickRandom(arr, n)` | 隨機取 n 個 | — |
| `CHINESE_NUMBERS[i]` | 中文序號陣列 | `一、二、…、三十` |

---

## 四、toolbarConfig 系統

### 4.1 配置結構

```javascript
toolbarConfig: {
    fontButton:        null | { label, type, options, getCurrentValue, onChange },
    orientationButton: null | { label, type, options, getCurrentValue, onChange },
    adjustCountButton: null | { label, type, options, getCurrentValue, onChange },
    hidePrintAnswer:   true | false,
    extraButtons: [
        { id, label, type: 'cycle'|'dropdown'|'modal', options, getCurrentValue, onChange }
    ]
}
```

- `null` = 隱藏該按鈕
- `type: 'cycle'` = 點擊循環切換（不顯示下拉）
- `type: 'dropdown'` = 點擊展開下拉選單
- `type: 'modal'` = 點擊展開 modal（支援 `multiSelect: true`）

### 4.2 按鈕顯示順序（`_buttonLabelOrder`）

工具列按鈕依以下優先序排列（`updateToolbarLabels()` 中 sort）：

```
測驗題型 > 數字範圍與數量 > 排序方式 > 排序數列 > 排列方式 > 提示 > 題數 > 數量範圍 >
錢包金額 > 目標金額 > 兌換類別 > 兌換方向 > 面額選擇 >
圖示數量 > 圖示類型 > 主題選擇 > 數字範圍 > 數數範圍 >
顯示模式 > 字體大小 > 版面
```

### 4.3 重要 DOM ID（index.html 實際 ID）

| ID | 說明 |
|----|------|
| `toolbar-title` | 工具列標題文字 span |
| `dynamic-buttons-container` | 動態按鈕容器（fontButton/orientationButton/adjustCountButton/extraButtons 皆渲染於此） |
| `size-adjust-btn` | 🔠 調整大小按鈕（固定存在，不受 toolbarConfig 控制） |
| `print-btn` | 🖨️ 列印按鈕 |
| `print-menu` | 列印下拉選單 |
| `print-answer-btn` | 列印答案卷選項（`hidePrintAnswer:true` 時隱藏） |
| `worksheet-container` | 作業單內容容器（CSS 變數 `--ws-font-scale`、`--ws-icon-scale` 掛載於此） |

> **注意**：CLAUDE.md 中記錄的 `adjust-count-btn`、`font-btn`、`orientation-btn`、`extra-buttons-container` 為舊版 ID，現已由 `dynamic-buttons-container` 統一管理。

### 4.4 afterRender 機制

若 unit config 定義 `afterRender()` 函式，`WorksheetApp._callAfterRender()` 會在 `requestAnimationFrame` 後呼叫（確保 DOM 已完成渲染）。目前僅 **F1** 使用（SVG 連線繪製）。

---

## 五、各單元配置摘要

### 5.1 Unit Config 共同欄位

```javascript
WorksheetRegistry.register('xx', {
    name: string,           // 顯示名稱（如 'A1 販賣機'）
    icon: string,           // emoji 圖示
    defaultCount: number,   // 預設題數（不傳 count 時使用）
    subtitle(opts): string, // 副標題函式（可選）
    dynamicName(opts): string, // 動態標題函式（可選，A4 用）
    toolbarConfig: { ... }, // 工具列配置
    generate(opts): Question[], // 題目產生函式
    afterRender(): void     // 渲染後回呼（可選，F1 用）
});
```

### 5.2 F 系列

| 單元 | defaultCount | fontButton | orientationButton | adjustCountButton | extraButtons | 特殊 |
|------|-------------|-----------|-----------------|-----------------|-------------|------|
| F1 | 5 | 📝 測驗題型（一般/虛線提示，dropdown） | null | 📊 圖示數量（1題10個/2題5個/3題3個，dropdown） | 無 | `afterRender()`（SVG 連線）；`hidePrintAnswer:false` |
| F2 | 10 | 🎨 主題選擇（水果/動物/交通工具，dropdown） | 📐 數數範圍（cycle） | 📊 數字範圍（dropdown） | 無 | — |
| F3 | 10 | 🎨 主題選擇（水果/動物/交通工具，dropdown） | null | 📊 數字範圍（dropdown） | 無 | — |
| F4 | 10 | 📝 提示（無/淺色提示，dropdown） | 📐 排序方式（連續/非連續，cycle） | 📊 數字範圍（dropdown） | 無 | — |
| F5 | 20 | 📝 顯示模式（dropdown） | null | 📊 數字範圍（dropdown） | 無 | — |
| F6 | 20 | 📝 顯示模式（合成/分解/填空，cycle） | 📐 數字範圍（cycle） | 📊 數字/圖示（cycle） | 無 | — |

### 5.3 C 系列

| 單元 | defaultCount | fontButton | orientationButton | adjustCountButton | extraButtons | 特殊 |
|------|-------------|-----------|-----------------|-----------------|-------------|------|
| C1 | 20 | 🔤 面額選擇（硬幣/紙鈔/混合，cycle） | 📐 圖示類型（真實正面/反面/正反/符號，dropdown） | 🔢 圖示數量（3/5/7/10，dropdown） | 📝 提示（開/關，cycle） | `hidePrintAnswer:false` |
| C2 | 20 | 🔤 面額選擇（modal 多選） | 📐 數量範圍（cycle） | null | 無 | — |
| C3 | 20 | — | — | — | — | 無特別配置 |
| C4 | 20 | 🔤 位數（cycle） | 📐 面額選擇（modal 多選） | 📊 圖示類型（cycle） | 無 | — |
| C5 | 30 | 🔤 位數（cycle） | 📐 面額選擇（modal 多選） | 📊 圖示類型（cycle） | 無 | 題型「夠不夠買？」；圖示右加 `= ______ 元` |
| C6 | 30 | 🔤 錢包金額（modal 多選） | 📐 商品（modal） | 📊 題型（填空/圖示選/提示選，cycle） | 無 | — |

### 5.4 A 系列（共用 12 種題型）

所有 A 系列單元 `defaultCount: 20`，`extraButtons[0]` 為 `📝 測驗題型` dropdown。

**12 種共用題型**：

| 題型值 | 說明 |
|--------|------|
| `price-fill` | 數字填空（價格計算） |
| `price-img-fill` | 看圖填空（價格計算，含金錢圖示視覺） |
| `price-fill-select` | 填空與選擇（價格計算） |
| `price-coin-select` | 圖示選擇（價格計算） |
| `price-hint-select` | 提示選擇（價格計算） |
| `price-hint-complete` | 提示完成（價格計算） |
| `fill` | 數字填空（找零計算） |
| `img-fill` | 看圖填空（找零計算，含金錢圖示視覺） |
| `fill-select` | 填空與選擇（找零計算） |
| `coin-select` | 圖示選擇（找零計算） |
| `hint-select` | 提示選擇（找零計算） |
| `hint-complete` | 提示完成（找零計算） |

- `isPrice` 判斷：`questionType.startsWith('price-')`
- 看圖填空（`price-img-fill`/`img-fill`）：使用 `_renderPriceWithCoins(price, renderCoin)` 輔助函數

**各單元個別配置**：

| 單元 | fontButton | orientationButton | adjustCountButton | 特殊說明 |
|------|-----------|-----------------|-----------------|---------|
| A1 | null | null | 📊 圖示類型（真實正面/反面/正反/符號，dropdown） | 飲料 19 種（20~35 元）；`_selectDrinksWithUniquePrice()` + `_getSmartPayment()` |
| A2 | null | null | 📊 圖示類型（dropdown） | 僅 6 種題型（無找零）；服務 2-3 項；圖片 `_serviceImg()`（`icon-a2-*.png`） |
| A3 | null | null | 📊 圖示類型（dropdown） | 10 種題型；餐點圖片 `_itemImg()` |
| A4 | 🏪 商店類型（12 種，dropdown） | 📐 錢包金額（dropdown，依商店類型自動調整） | 📊 圖示類型（dropdown） | `dynamicName()` 動態標題；`fill-select` 在 change≤0 時 fallback 純填空；依賴 `a4-shared-products.js` |
| A5 | null | null | 📊 圖示類型（dropdown） | — |
| A6 | null | null | 📊 圖示類型（dropdown） | 10 種題型（含 `priceVisualFill`/`priceVisual`）；`hidePrintAnswer:true` |

**A4 商店類型與預設錢包金額**：

| 商店類型 | 預設錢包金額 |
|---------|------------|
| 便利商店 / 菜市場 / 早餐店 / 文具店 / 超級市場 / 美式速食店 | 500 元 |
| 書局 / 玩具店 / 美妝店 | 1000 元 |
| 服飾店 / 運動用品店 | 5000 元 |
| 3C 用品店 | 10000 元 |

**A2 特殊**：只有前 6 種（`price-*`），無找零類題型。`toolbarConfig` 的 `extraButtons[0].options` 只定義 6 個選項。

**A6 特殊題型**：
- `priceVisualFill`：隱藏總票價，學生需自行計算
- `priceVisual`：顯示總票價

---

## 六、作業單連結規範

### 6.1 呼叫格式（各遊戲 JS 中）

```javascript
// 只傳 unit 參數，其餘由作業單工具列決定
const params = new URLSearchParams({ unit: 'a1' });
window.open('../worksheet/index.html?' + params.toString(), 'Worksheet', 'width=900,height=700');
```

> **重要**：不傳 `count`、`difficulty` 或其他遊戲參數，讓作業單完全使用自己的預設值（`defaultCount`）與工具列設定。

### 6.2 A4 例外

A4 會額外傳 `storeType` 和 `walletAmount`（`WorksheetApp.init()` 中設有 fallback 機制）：

```javascript
const params = new URLSearchParams({ unit: 'a4', storeType: this.state.settings.storeType });
```

若 `storeType` 無效或未傳，fallback 為 `'convenience'`；`walletAmount` 未傳則 fallback 為 `'500'`。

### 6.3 URL 參數彙整

| 參數 | 說明 | 預設值 |
|------|------|--------|
| `unit` | 單元代號（必填）| 無 |
| `count` | 題數 | `config.defaultCount` |
| `questionType` | A 系列題型 | `'price-fill'` |
| `coinStyle` | 圖示類型（real/real-back/real-both/symbol） | 各單元預設 |
| `storeType` | A4 商店類型 | `'convenience'` |
| `walletAmount` | A4 錢包金額 | `'500'` |
| `f1Layout` | F1 布局（題數_圖示數） | `'2_5'` |
| `hintLines` | F1 虛線提示（on/off） | `'off'` |
| `coinType` | C1 面額類型（coins/notes/mixed） | `'mixed'` |

---

## 七、版面配置

### 7.1 HTML 結構（index.html）

```
body
├── .toolbar.no-print（工具列，列印時隱藏）
│   ├── .toolbar-left
│   │   ├── #toolbar-title（單元名稱）
│   │   └── #dynamic-buttons-container（動態按鈕）
│   └── .toolbar-right
│       ├── #size-adjust-btn（🔠 調整大小）
│       ├── button（🔄 重新產生）
│       ├── #print-btn（🖨️ 列印）
│       │   └── #print-menu（下拉：列印作業單 / #print-answer-btn）
│       └── button（⬅️ 關閉）
└── #worksheet-container.worksheet-container（作業單內容）
    └── .worksheet-page（× 2）
        ├── .worksheet-header
        │   ├── h1.unit-title
        │   ├── .worksheet-subtitle（可選）
        │   └── .worksheet-info（姓名/日期）
        ├── .question-block（× N）
        │   ├── .question-number（中文序號 + 題目文字）
        │   ├── .question-visual（圖示區，可選）
        │   └── .question-answer（作答區 / 答案）
        └── .worksheet-footer（數學小達人作業單）
```

### 7.2 大小調整系統

```javascript
// CSS 變數（掛載於 #worksheet-container）
--ws-font-scale: 1     // 文字縮放（0.85 / 1 / 1.2）
--ws-icon-scale: 1     // 圖示縮放（0.8 / 1 / 1.3）
```

各單元在 `worksheet-styles.css` 中使用 `calc()` 套用這些變數。

### 7.3 列印設定

```css
@media print {
    .toolbar { display: none; }  /* 工具列列印時隱藏 */
}
@page { size: A4; margin: 15mm 20mm; }
```

預設直式 A4；橫式時 `WorksheetApp._defaultToggleOrientation()` 動態注入 `@page { size: A4 landscape; }`。

---

## 八、注意事項

### 8.1 作業單題數去重機制

`WorksheetGenerator.generate()` 第 2 頁使用 `_usedValues`（第 1 頁的 `q._key || q.prompt` Set）傳入 `config.generate()`，讓各單元可避免重複題目。各單元實作各自的去重邏輯。

### 8.2 溢出裁剪

`_trimOverflowQuestions()` 在 `requestAnimationFrame` 回呼中執行（確保瀏覽器完成排版後）：
- 取 `.worksheet-page` 的 `.worksheet-footer` 上邊緣為基準
- 移除 `bottom > footerTop` 的 `.question-block`

不同螢幕 DPI、縮放、字體大小都可能影響題目是否超出頁面。若題目過少，可嘗試調小文字/圖示大小。

### 8.3 C3 作業單

C3 目前無 `toolbarConfig`（使用預設工具列：字體大小 cycle + 版面 cycle + 調整題數）。

### 8.4 A4 依賴外部商品資料

`a4-worksheet.js` 依賴 `../js/a4-shared-products.js`（`A4SharedProducts` 全域物件）。`index.html` 中 `a4-shared-products.js` 須在 `a4-worksheet.js` 之前載入。

### 8.5 A2 題型限制

A2 只有前 6 種（`price-*`），若代碼中出現找零類題型（`fill` 等），A2 toolbarConfig 中沒有定義，會以 `price-fill` 作為 fallback（`getCurrentValue` 預設值）。

### 8.6 _renderPriceWithCoins 函數

各 A 系列單元各自定義此輔助函數：

```javascript
_renderPriceWithCoins(price, renderCoin) {
    const coins = walletToCoins(price);
    return `<span class="price-coins">${coins.map(c => renderCoin(c)).join('')}</span>`;
}
```

`renderCoin` 依 `coinStyle` 參數決定使用 `coinImg`、`coinImgBack`、`coinImgRandom` 或 `coinSymbol`。

---

## 九、修復記錄

### [2026-02-24] 作業單連結移除 count 參數

**問題**：各遊戲 JS 呼叫作業單時傳入 `count` 參數，導致作業單題數固定等於遊戲設定，無法通過工具列獨立調整。

**修復**：17 個遊戲 JS 改為只傳 `unit` 參數（A4 額外傳 `storeType`），讓作業單使用 `config.defaultCount` 預設值。

**搜尋關鍵字**：`作業單使用自己的預設值與工具列設定`

---

### [2026-02-24] A 系列 defaultCount 統一為 20

**問題**：A 系列部分單元 `defaultCount` 不一致（部分為 10）。

**修復**：A1~A6 全部 `defaultCount: 20`。

---

### [2026-02-24] 看圖填空題型（price-img-fill / img-fill）新增

**問題**：A 系列作業單缺少金錢圖示視覺輔助的填空題型。

**修復**：A1~A6 各單元新增 `price-img-fill` 和 `img-fill` 題型，使用 `_renderPriceWithCoins()` 輔助函數。

**搜尋關鍵字**：`_renderPriceWithCoins`, `price-img-fill`, `img-fill`

---

### [2026-02-24] A1 找零不重複價格 + 智慧投入金額

**問題**：A1 找零題型可能出現相同價格重複，且投入金額不夠合理（如 100 元買 20 元）。

**修復**：
- `_selectDrinksWithUniquePrice(count)`：從不同面額組選取，確保各題價格不重複
- `_getSmartPayment(price)`：依價格選擇合理的投入金額（如 25 元 → 投 50 元，而非 100 元）

**搜尋關鍵字**：`_selectDrinksWithUniquePrice`, `_getSmartPayment`

---

### [2026-03-13] PDF 下載系統（html2canvas + jsPDF）

**背景**：`window.print()` 在不同瀏覽器/DPI 下列印邊距不一致，且 html2pdf.js 會因分頁計算產生多餘空白頁。改用 html2canvas + jsPDF 方案：逐頁截圖、強制 A4（210×297mm）。

**檔案變更**：
- `worksheet/index.html`：移除 html2pdf.bundle.min.js，改引 html2canvas.min.js + jspdf.umd.min.js（各 ~200KB/350KB，載入即可用）
- `js/coin-images-base64.js`（255KB）、`a1-images-base64.js`（173KB）、`a2-images-base64.js`（193KB）、`a3-images-base64.js`（886KB）、`a4-images-base64.js`（1182KB）：Python+Pillow 產生，含 WebP base64 影像，支援透明背景

**架構**（`WorksheetApp` 新增方法）：

| 方法 | 說明 |
|------|------|
| `togglePrintMenu()` | 開關列印下拉選單 |
| `doPrint(withAnswers)` | 關閉選單 → 呼叫 `_downloadPdf` |
| `doPrintDirect()` | 備用：直接 `window.print()` |
| `_loadImagesBase64()` | 動態注入此單元所需的 base64 JS 檔（只在點擊時載入） |
| `_getAllBase64Maps()` | 合併所有已載入的 base64 lookup table |
| `_inlineImages(element)` | 將 `<img>` src 換成 data: URL（策略1：base64 表；策略2：fetch；策略3：透明 GIF fallback） |
| `_restoreImages(element)` | 還原 `data-pdf-orig-src` 備份的原始 src |
| `_downloadPdf(withAnswers)` | 主流程：載入 base64 → 逐頁 html2canvas → jsPDF → Blob URL 觸發下載 |

**工具列 HTML（print-btn 區塊）**：
```html
<button id="print-btn" onclick="WorksheetApp.togglePrintMenu()">📄 下載 PDF</button>
<div id="print-menu" class="print-dropdown-menu" style="display:none;">
    <div class="toolbar-dropdown-item" onclick="WorksheetApp.doPrint(false)">📄 下載 PDF（作業單）</div>
    <div id="print-answer-btn" class="toolbar-dropdown-item" onclick="WorksheetApp.doPrint(true)">📄 下載 PDF（答案卷）</div>
    <div class="toolbar-dropdown-item" style="color:#999;" onclick="WorksheetApp.doPrintDirect()">🖨️ 直接列印（備用）</div>
</div>
```

**base64 檔設定**（`_imageBase64Files`）：

| 檔案 | globalVar | 觸發單元 |
|------|-----------|---------|
| `coin-images-base64.js` | `CoinImagesBase64` | 全部（`'*'`） |
| `a1-images-base64.js` | `A1ImagesBase64` | `['a1']` |
| `a2-images-base64.js` | `A2ImagesBase64` | `['a2']` |
| `a3-images-base64.js` | `A3ImagesBase64` | `['a3']` |
| `a4-images-base64.js` | `A4ImagesBase64` | `['a4']` |

**重要**：base64 檔必須用 `window.X = window.X || {...}` 宣告（不能用 `const`），否則 `window[cfg.globalVar]` 永遠為 `undefined`。

**影像格式**：WebP（支援透明背景）；Python Pillow 壓縮；規格：
- coins：300px q85
- A1/A2：250px q82
- A3/A4：220px q80

---

### [2026-03-13] PDF 下載開新分頁 Bug 修復

**問題**：`pdf.save(filename)` 在部分瀏覽器 / 行動裝置會開新分頁而非下載。

**修復**：改用 `pdf.output('blob')` → `URL.createObjectURL()` → `<a download>` 觸發下載，10 秒後 `revokeObjectURL`。

**搜尋關鍵字**：`blobUrl`, `revokeObjectURL`, `a.download`

---

### [2026-03-13] base64 const 宣告導致圖片全透明

**問題**：base64 JS 檔使用 `const X = {...}`，但 JavaScript `const` 不會加入 `window` 物件。`_getAllBase64Maps()` 用 `window[cfg.globalVar]` 讀取，永遠取到 `undefined`，導致 lookup table 為空 → 所有圖片走 fetch → CORS 失敗 → 圖片被替換為透明 GIF。

**副作用**：每次點擊 PDF 下載都重新注入 script 標籤，第二次產生 `SyntaxError: Identifier already declared`。

**修復**：5 個 base64 檔第一行改為 `window.X = window.X || {...}`（Python 批次替換）。

**搜尋關鍵字**：`window.CoinImagesBase64`, `window.A1ImagesBase64`, `window.A4ImagesBase64`

---

### [2026-03-13] _inlineImages fetch 失敗 canvas 汙染

**問題**：fetch 失敗時 catch 區塊不處理，`img.src` 留著 `file://` 路徑 → html2canvas 嘗試繪製 `file://` 圖片 → canvas 被汙染（tainted） → `toDataURL()` 丟 `SecurityError`。

**修復**：catch 區塊將 `img.src` 替換為透明 1×1 GIF data URL，確保 html2canvas 不會碰到任何 `file://` URL。

**搜尋關鍵字**：`pdfOrigSrc`, `R0lGODlhAQABAIAAAAAAAP///`（透明 GIF）

---

### [2026-03-13] A4 作業單商品圖示改為圖片

**問題**：`a4-worksheet.js` 使用 `it.emoji` 顯示商品，但 `a4-shared-products.js` 已有 `icon` 欄位（PNG 圖片）。

**修復**：新增 `_productImg(item)` helper，有 `item.icon` 時渲染 `<img src="../images/a4/...">` 28×28px，否則 fallback 到 emoji。購物清單列（line 356 附近）改用 `this._productImg(it)`。

**搜尋關鍵字**：`_productImg`, `shopping-item`

---

### [2026-03-13] WebP 格式保留透明背景

**問題**：原使用 JPEG 壓縮，JPEG 不支援透明度，所有商品/硬幣圖片的透明背景變成白色方塊，在非白色背景下顯示異常。

**修復**：Python 重新生成 5 個 base64 檔，改用 WebP 格式（支援 alpha 通道），同時提升圖片品質（200px q70 → 220~300px q80~85）。總大小 2.7MB（舊版 JPEG 2.2MB）。

**搜尋關鍵字**：`data:image/webp;base64`, `compress_webp`

---

---

### [2026-03-21] 工具列按鈕文字更新

**修改檔案**：`worksheet/index.html`

**變更一：主按鈕文字**

| 項目 | 修改前 | 修改後 |
|------|--------|--------|
| `#print-btn` 按鈕文字 | `📄 下載 PDF` | `📄 下載與列印` |

**變更二：下拉選項「直接列印」**

| 項目 | 修改前 | 修改後 |
|------|--------|--------|
| 下拉選項文字 | `🖨️ 直接列印（備用）` | `🖨️ 直接列印` |
| 下拉選項樣式 | `color:#999; font-size:12px`（灰色小字）| 移除 muted 樣式（一般黑色字體）|
| 下拉選項邊框 | `border-top:1px solid #eee` | 保留不變 |

**原因**：「下載 PDF」一詞讓不熟悉 PDF 的使用者（家長/學生）不知道這是印刷用途。改為「下載與列印」更直覺；「直接列印（備用）」改為「直接列印」並恢復正常樣式，避免使用者誤以為此功能有問題。

**搜尋關鍵字**：`print-btn`, `doPrintDirect`, `直接列印`

---

*本報告由 Claude Code 自動生成，最後更新：2026-03-21*
