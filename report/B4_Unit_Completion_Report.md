# B4 特賣比一比 — 單元完成報告書

> **建立日期**：2026-03-24
> **更新日期**：2026-03-25（第十輪：視覺價差比例條 `_renderPriceBars`，F5 量比較 pattern）
> **更新日期**：2026-03-25（第十二輪：完成畫面累計節省統計 `totalSaved`，A4 交易摘要 pattern）
> **更新日期**：2026-03-29（三商店排序模式 `B4_TRIPLE_ITEMS`；單位比價模式 `B4_UNIT_ITEMS`；商品類別篩選；開題商品介紹彈窗；輔助點擊 AssistClick）
> **更新日期**：2026-03-30（Rounds 29–39 豐富化：冠軍徽章/省錢%/差額百分比/記憶倒數/獎台動畫/貴差標籤完整記錄）
> **更新日期**：2026-03-31（Round 41：普通/困難模式動態價格浮動 ±10%/±20%，C5 PriceStrategy pattern）
> **更新日期**：2026-04-01（Rounds 43–44：三商店獎台語音播報 `語音播報排名`；比價思路步驟卡 `_showThinkingSteps`）
> **專案名稱**：Money Tutor 金錢教學系統
> **單元編號**：B4 — 特賣比一比（Sale Comparison）
> **系列**：B 預算規劃
> **報告類型**：單元完成報告（測驗內容 / 教學設計 / 技術規格）

---

## 一、檔案規模總覽

| 檔案 | 路徑 | 行數/版本 |
|------|------|---------|
| HTML | `html/b4_sale_comparison.html` | — |
| JS | `js/b4_sale_comparison.js` | 2,169 行，v4.0（2026-04-01）|
| CSS（專用）| `css/b4_sale_comparison.css` | 890 行（2026-04-01）|
| 作業單 | `worksheet/units/b4-worksheet.js` | 110 行 |

---

## 二、單元特色

### 2.1 教學定位

B4 訓練「比較商品價格、選出較便宜的、計算差額」的消費判斷能力。
學習路徑：**數字比較（F4 排序）→ 金額加減（B2 日記）→ 價格比較（B4）→ 預算採購（B5/B6）**

### 2.2 兩段式流程（B4 獨有）

B4 是 B 系列中唯一**分兩個子階段**完成一題的單元：

```
[Select 階段] → 點選較便宜的選項卡
    ↓（簡單模式在此得分，普通/困難繼續）
[Diff 階段] → 計算兩者差額
    普通：三選一
    困難：數字鍵盤輸入
```

**教學意義**：先建立「哪個便宜」的判斷，再追問「便宜多少」，分層訓練比較與計算兩種技能。

### 2.3 防作題慣性設計

- `B4_ITEMS` 中 `optA` 永遠比 `optB` 貴（資料一致性）
- 顯示時 **50% 機率左右交換**（`swapped` 旗標），防止學生習慣「選右邊」
- 每題重新隨機決定左右位置

### 2.4 三種難度模式

| 模式 | Select 階段 | Diff 階段 | 測驗重點 |
|------|------------|---------|---------|
| 簡單 | 選出便宜方即得分 | 無 Diff | 價格比較判斷 |
| 普通 | 選出便宜方 → 繼續 | 三選一差額 | 比較 + 有選項計算 |
| 困難 | 選出便宜方 → 繼續 | 鍵盤輸入差額 | 比較 + 自主計算 |

### 2.5 重試 / 繼續模式

**Select 階段**：
- `retry`：1500ms 後重置選項，允許重選
- `proceed`：語音說出正確答案 → 直接跳題

**Diff 階段**：
- `retry`：重新啟用選項 or 重置數字鍵盤
- `proceed`：語音說出正確差額 → 跳題

### 2.6 差額算式提示（`_showDiffFormulaHint`）（2026-03-25）

**靈感來源**：A4 步驟 3 付款提示顯示金額計算公式；C 系列答錯後展示算式的設計哲學。

Diff 階段（普通/困難）答錯時，立即在選項區上方插入算式提示框：

```
💡 算式提示：
189 − 149 = ？ 元
```

**設計重點**：
- 答錯即顯示，正確答案答對不顯示（不干擾有能力的學生）
- `this.state.currentDiffItem`：在 `handleSelectClick` 進入 diff 階段前儲存當前商品（`optA.price` / `optB.price`）
- 防重複守衛：同一題只出現一次
- CSS：`.b4-diff-hint-formula`（黃色背景）、`.b4-hint-op`（橙色算子）、`.b4-hint-blank`（紅色 ？）

### 2.7 視覺價差比例條（`_renderPriceBars`）—— 2026-03-25 新增

進入 diff 階段（答對比較題後）自動在差額問題上方顯示雙欄比例橫條：

```
🏪 書局   ████████████████ 280 元  ← 紅漸層（貴）
📚 二手店  ████████          150 元  ← 綠漸層（便宜）
```

**寬度算法**：`pct = Math.round(price / maxPrice * 100)`，兩欄相對比例。

**靈感來源**：F5 量比較視覺化橫條設計 — 幫助視覺型學習者理解數字的「大小感」，不依賴純計算。

**設計重點**：
- 兩個模式（三選一 / 鍵盤輸入）都顯示比例條
- 貴的用紅漸層、便宜的用綠漸層，配合已選中答案的視覺回饋
- `b4FadeIn` 動畫（0.4s ease），與題目答案動畫時序分離
- CSS：`.b4-price-bars`、`.b4-pbar-row`、`.b4-pbar-track`、`.b4-pbar-high`（紅）/ `.b4-pbar-low`（綠）

### 2.8 完成畫面累計節省統計（`totalSaved`）—— 2026-03-25 新增

`showResults()` 新增黃色橫幅，顯示本次測驗全部 diff 題答對後累積的節省總金額。

**資料追蹤**（`state.quiz.totalSaved`）：
- 初始化 / 重置：`quiz.totalSaved = 0`（`init()`、`resetGameState()`、`startGame()` 三處）
- 累加：`handleDiffAnswer` 答對時 `this.state.quiz.totalSaved += correctDiff`
- 顯示：`showResults` 完成畫面學習成果下方，`totalSaved > 0` 才渲染

**橫幅設計**（`b4-savings-banner`）：
```
🤑
這次比價你總共省了
XXX 元         ← 大字（2rem）amber 色
```

**靈感來源**：A4 完成畫面「交易總結」顯示實際花費 — 呼應比價目的：「用更少的錢買到相同的東西」。

**CSS**（`b4_sale_comparison.css`）：`.b4-savings-banner`、`.b4-savings-icon`、`.b4-savings-text`、`.b4-savings-amount`

---

## 三、題庫內容詳解（`B4_ITEMS`，30 組）

> **2026-03-24 更新**：從 20 組擴充至 30 組，20 題設定不再循環。

| # | 商品 | 貴的店 | 貴的價 | 便宜的店 | 便宜的價 | 差額 |
|---|------|-------|-------|---------|---------|------|
| 1 | 鉛筆盒 ✏️ | 文具店 | 85 | 超市 | 65 | 20 |
| 2 | 蘋果（1斤）🍎 | 超市 | 45 | 菜市場 | 35 | 10 |
| 3 | 原子筆 🖊️ | 書局 | 15 | 大賣場 | 12 | 3 |
| 4 | 礦泉水 💧 | 超商 | 20 | 量販店 | 13 | 7 |
| 5 | 洗髮精 🧴 | 藥妝店 | 189 | 量販店 | 149 | 40 |
| 6 | 巧克力 🍫 | 超商 | 55 | 超市 | 42 | 13 |
| 7 | 毛巾 🧣 | 百貨 | 250 | 市場 | 180 | 70 |
| 8 | 故事書 📖 | 書店 | 280 | 二手店 | 150 | 130 |
| 9 | 牛奶（1公升）🥛 | 超商 | 65 | 超市 | 55 | 10 |
| 10 | 面紙（一包）🧻 | 超商 | 39 | 量販店 | 25 | 14 |
| 11 | 雨傘 ☂️ | 百貨 | 480 | 夜市 | 150 | 330 |
| 12 | 餅乾（一盒）🍪 | 超商 | 45 | 超市 | 35 | 10 |
| 13 | 牙刷 🪥 | 藥局 | 39 | 量販店 | 29 | 10 |
| 14 | 色鉛筆 🖍️ | 文具店 | 120 | 大賣場 | 89 | 31 |
| 15 | 果汁（1瓶）🧃 | 超商 | 35 | 超市 | 25 | 10 |
| 16 | 電池（4顆）🔋 | 超商 | 85 | 量販店 | 59 | 26 |
| 17 | 洗碗精 🧼 | 超市 | 59 | 量販店 | 45 | 14 |
| 18 | 運動鞋 👟 | 品牌店 | 1,580 | 網購 | 1,200 | 380 |
| 19 | 拖鞋 🩴 | 百貨 | 390 | 夜市 | 120 | 270 |
| 20 | 手套 🧤 | 百貨 | 320 | 市場 | 180 | 140 |
| 21 | 洗手乳 🧴 | 藥局 | 55 | 量販店 | 39 | 16 |
| 22 | 奶茶 🧋 | 手搖店 | 60 | 超商 | 50 | 10 |
| 23 | 運動水壺 🍶 | 體育用品店 | 350 | 量販店 | 260 | 90 |
| 24 | 帽子 🧢 | 百貨 | 580 | 網購 | 420 | 160 |
| 25 | 便當盒 🍱 | 百貨 | 285 | 量販店 | 199 | 86 |
| 26 | 筆記本（3本）📓 | 書局 | 95 | 量販店 | 69 | 26 |
| 27 | 口香糖 🍬 | 超商 | 35 | 超市 | 25 | 10 |
| 28 | 浴巾 🛁 | 百貨 | 480 | 量販店 | 320 | 160 |
| 29 | 醬油（一瓶）🫙 | 超商 | 89 | 量販店 | 65 | 24 |
| 30 | 洗衣精 🧺 | 超市 | 159 | 量販店 | 119 | 40 |

**題庫設計特點**：
- 涵蓋多種商業場所（超商、量販店、百貨、夜市、書店、二手店、手搖店、體育用品店）
- 差額範圍廣（3 元 ~ 380 元），各難度均有挑戰性
- 包含大額商品（運動鞋 1,580/1,200、帽子 580/420）測試困難模式
- **新增 #21-30（2026-03-24）**：日常用品擴充（洗手乳、奶茶、水壺、帽子等），20 題作業單不再重複

---

## 四、測驗流程

```
[設定] 難度 × 題數 × 重試模式
    ↓
[Select 階段] 渲染兩張選項卡（含商店名稱、emoji、價格）
    ├── 語音：「{商品名}，哪個地方比較便宜？」
    ├── 點選卡片
    ├─ 正確 → 簡單：得分進下一題 | 普通/困難：繼續 Diff 階段
    └─ 錯誤 → retry / proceed 處理
    ↓
[Diff 階段]（普通/困難）
    ├── 語音：「{便宜店}比{貴的店}便宜了多少元？」
    ├── 作答（三選一 or 鍵盤）
    ├─ 正確 → 得分進下一題
    └─ 錯誤 → retry / proceed 處理
    ↓
[完成] showResults()
```

---

## 五、語音設計

| 場景 | 語音模板 |
|------|---------|
| 進題（簡單）| 「{商品}，哪個地方比較便宜？」|
| 進題（普通）| 「{商品}，哪個地方比較便宜？選出之後再回答便宜了多少元。」|
| 進題（困難）| 「{商品}，哪個地方比較便宜？選出之後輸入差額。」|
| Select 答對 | 「答對了！{便宜店}比較便宜」|
| Diff 答對 | 「對！差了 X 元」|
| 答錯（retry）| 「再看看哪個價格比較低」|
| 答錯（proceed）| 「{便宜店} X 元比較便宜，差了 X 元」|

---

## 六、作業單

| 項目 | 說明 |
|------|------|
| 題型 | 比較兩家商品價格 + 填差額 |
| defaultCount | 20 題 |
| 左右隨機 | 作業單中也隨機交換 optA/optB 位置（`swapped` 機制）|

---

## 七、技術注意事項

- `B4_ITEMS` 中 `optA.price > optB.price` 是**資料層的設計規範**，勿修改順序
- `swapped` 旗標只影響視覺呈現，不影響正確答案判斷
- `_getDiffOptions(diff)` 產生差額干擾項：選取 ±5 ~ ±50 的不同間距值，確保不等於正確差額
- 困難模式數字鍵盤允許輸入 1~4 位數（差額上限 9999 元）

---

## 八、作業單題型詳表（2026-03-24 補充）

| # | 題型名稱 | 說明 | 難度對應 |
|---|---------|------|---------|
| 1 | 圈選便宜的 | 給兩家商店名稱 + 各自價格，圈出較便宜的店家 | easy |
| 2 | 填差額（填空）| 給兩家商店價格，計算差額並填入空格 | normal/hard |
| 3 | 選差額（三選一）| 給兩家商店價格，從三選項選出正確差額 | easy/normal |
| 4 | 左右隨機 | 作業單亦套用 `swapped` 機制，左右位置隨機，防止固定答題模式 | 全難度 |

> `defaultCount = 20`，B4 是題庫最大的 B 系列單元（20 組），每份作業單從 20 組中隨機抽取。

---

## 九、跨系列特色分析（2026-03-24）

### 9.1 B4 vs C5 夠不夠（同為「比較判斷」類型）

| 特性 | B4 特賣比一比 | C5 夠不夠 |
|------|------------|---------|
| 比較對象 | 兩家商店的同一商品價格 | 我的錢 vs. 商品價格 |
| 核心問題 | 「哪個便宜？便宜多少？」| 「夠不夠買？」|
| 資料庫 | 固定 20 組（B4_ITEMS）| 48+ 商品（4 位數層級）+ 動態生成金額 |
| 難度模態 | 只改輸入方式（選擇→鍵盤）| 同時改呈現模態（顯示→隱藏）+ 輸入方式 |
| 防作題設計 | `swapped`（左右隨機）| `seededRandom`（確定性隨機）|
| ModeConfig | 無（if-else）| 有（PriceStrategy + ModeConfig）|

### 9.2 B4 vs F4 數字排序（同為「排序/比較」數學概念）

| 特性 | B4 | F4 |
|------|----|----|
| 比較維度 | 兩個金額大小 | 多個數字順序 |
| 互動方式 | 點選較便宜的卡片 | 拖曳/點擊放置到插槽 |
| 配置架構 | if-else | NumberSortingConfig（完整配置驅動）|
| 計分 | +1/題 | easy +10 / normal +15 / hard +20 |
| 時間限制 | 無 | 有（none/300s/120s/60s）|

### 9.3 B4 優化建議

| 優先度 | 建議 | 參照 |
|--------|------|------|
| 中 | 動態價格生成：保留 `B4_ITEMS` 情境名稱，改用 `seededRandom` 動態生成各難度差額，突破 20 組上限 | C5 PriceStrategy |
| 中 | 差分計分：Select+5分 → Select+Diff 完成 +10/15/20（依難度），取代現有 +1/題 | F4 差分計分 |
| 中 | 加入「多商店排序」題型（如 4 家商店由便宜到貴排序），參照 F4 排序互動 | F4 |
| 低 | 加入差距百分比計算（困難+：「便宜了幾%」）| — |
| 低 | 導入 `B4_MODE_CONFIG` 配置驅動（Select 階段 + Diff 階段各有獨立配置）| F4 ModeConfig |

> **動態價格設計規格**：詳見 `report/B_Series_Unit_Completion_Report.md §五十七`（C5 PriceStrategy → B4 動態商品價格生成）。
> **差分計分規格**：詳見 `report/B_Series_Unit_Completion_Report.md §五十九`（F4/F5 計時器 + 差分計分 → B 系列遊戲化升級）。

---

## 十、觸控與桌面支援（2026-03-27 補充）

### 10.1 互動模式與觸控

B4 以「點選比較 → 輸入/選擇差額」為主要互動，無拖曳操作。

| 功能 | 桌面 | 行動 |
|------|------|------|
| 選擇較便宜的商品 | 點擊店家卡片 | 觸控點擊（≥ 44px 目標）|
| 輸入差額（normal/hard）| 鍵盤輸入 | 數字鍵盤 |
| 選擇差額（easy）| 點擊選項按鈕 | 觸控點擊 |
| 提示鈕（hard 差額）| 點擊 💡 | 觸控 💡 |

**比例條視覺（B4 特有）**：
- `_renderPriceBars`: 兩欄橫條，寬度依實際價格比例計算
- 行動裝置不需要額外觸控處理（純視覺元素）
- 省錢 toast `.b4-savings-toast`：`pointer-events: none`，不影響觸控操作

### 10.2 響應式設計斷點

| 斷點 | ≥ 768px | < 768px |
|------|---------|---------|
| 雙店比較區 | 並排（flex-direction: row）| 上下堆疊（column）|
| 店家卡片寬度 | `calc(50% - 10px)` | `100%` |
| 比例條寬度 | `240px` | `100%` |
| 差額輸入區 | 置中 `max-width: 400px` | 全寬 |
| 省錢排行 | 橫列展示（3 medals）| 縮小 |

### 10.3 跨裝置測試重點

- **iOS**：`input[type=number]` 整數輸入需確認不顯示小數點
- **低解析度**（< 375px）：雙店卡片堆疊後確認按鈕可見（非被鍵盤遮蓋）
- **平板橫向**：比例條可充分展開，視覺更清晰

---

## 十一、版面設計（RWD）（2026-03-27 補充）

### 11.1 遊戲版面結構

```
┌──────────────────────────────────────────────────────┐
│  標題列（.title-bar）              [獎勵🎁][設定🔧]  │
│  第 N/M 題 | 已省 XXX 元                             │
├──────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────┐    │
│  │  🏪 Select 階段（.b4-select-section）        │    │
│  │                                              │    │
│  │  ┌──────────────┐   ┌──────────────┐        │    │
│  │  │ A 店         │   │ B 店         │        │    │
│  │  │ 商品 emoji   │   │ 商品 emoji   │        │    │
│  │  │ 商品名稱     │   │ 商品名稱     │        │    │
│  │  │ XXX 元       │   │ YYY 元       │        │    │
│  │  │ [比例條 ▓▓▓] │   │ [比例條 ▓▓] │        │    │
│  │  └──────────────┘   └──────────────┘        │    │
│  │  哪家比較便宜？                               │    │
│  └──────────────────────────────────────────────┘    │
│  ─── Select 答對後進入 Diff 階段 ───                  │
│  ┌──────────────────────────────────────────────┐    │
│  │  💰 Diff 階段（.b4-diff-section）            │    │
│  │  便宜了多少元？                               │    │
│  │  [easy: 選項按鈕]  [normal/hard: 數字鍵盤]   │    │
│  │  [💡 提示（hard 可見）] [確認]               │    │
│  └──────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────┘
```

### 11.2 難度模式版面差異

| 版面元素 | 簡單（easy）| 普通（normal）| 困難（hard）|
|----------|------------|---------------|------------|
| Select 比例條 | 顯示 | 顯示 | 顯示 |
| Diff 答題 | 選項按鈕（3 個）| 數字鍵盤 | 數字鍵盤 |
| Diff 提示鈕 | 隱藏 | 隱藏 | 顯示（💡）|
| 差額公式提示 | 答錯自動出現 | 答錯自動出現 | 按鈕觸發 |
| 選店提示 | 答錯 ≥3 次語音 + 脈動高亮 | 同 easy | 同 easy |

### 11.3 CSS 主要類別

| 類別 | 說明 |
|------|------|
| `.b4-select-section` | 比較選擇區（雙欄 flex）|
| `.b4-store-card` | 店家卡片（點選後 `.selected`）|
| `.b4-pbar-row` | 比例條容器（雙欄）|
| `.b4-pbar-fill` | 比例橫條填充（optA 紅 / optB 綠）|
| `.b4-diff-section` | 差額計算區 |
| `.b4-diff-hint-formula` | 差額算式提示（XXX − YYY = ？）|
| `.b4-savings-toast` | 省錢浮動 toast（底部升起）|
| `.b4-res-compare` | 完成畫面比價歷程表（橘框）|
| `.b4-res-ranking` | 省錢排行榜（金/銀/銅牌）|
| `.b4-savings-banner` | 總節省金額橫幅（黃色）|


---

## 十二、三商店排序模式（Round 25，2026-03-28）

### 12.1 設計動機

參照 F4「數字排序」的核心技能（由小到大排列三個數字），將 B4 從「兩家比價」延伸到「三家排序」，讓學生練習：
- **easy/normal**：從三家中選出最便宜一家 → 再計算最貴與最便宜的差額
- **hard**：價格隱藏，依序點選「便宜→中間→最貴」（完整排序，直接對應 F4 排序概念）

### 12.2 題庫

`B4_TRIPLE_ITEMS`（15 組）：每組含三家店（store/storeIcon/price），原始排列由貴到便宜，生成題目時隨機打亂顯示順序。

### 12.3 題目生成（`_generateQuestions`）

```javascript
if (isTriple) {
    const shuffled  = [...item.stores].sort(() => Math.random() - 0.5);
    const sortedAsc = [...item.stores].sort((a, b) => a.price - b.price);
    const cheapestIdx = shuffled.findIndex(s => s.price === sortedAsc[0].price);
    const middleIdx   = shuffled.findIndex(s => s.price === sortedAsc[1].price);
    const mostExpIdx  = shuffled.findIndex(s => s.price === sortedAsc[2].price);
    result.push({ ...item, stores: shuffled, sortedAsc, cheapestIdx, middleIdx, mostExpIdx,
                  diff: sortedAsc[2].price - sortedAsc[0].price, isTriple: true });
}
```

### 12.4 渲染與互動流程

| 難度 | 選店階段 | 差額階段 |
|------|----------|----------|
| easy | 點最便宜 → ✅ 直接下一題 | 無 |
| normal | 點最便宜 → ✅ 進入差額 | 三選一（最貴 − 最便宜） |
| hard | 價格隱藏，依序點 3 家（1️⃣2️⃣3️⃣）→ 驗證排序 | 排序正確即得分 |

**hard 模式 click-order 驗證**：
```javascript
// tripleClickOrder[] 記錄點擊順序
// 第三下後驗證：order[0]===cheapestIdx && order[1]===middleIdx && order[2]===mostExpIdx
```

### 12.5 新增 CSS

| 類別 | 說明 |
|------|------|
| `.b4-triple-grid` | 三店卡片容器（flex wrap，justify:center）|
| `.b4-triple-card` | 單家店卡片（flex:1，min 100px，max 200px）|
| `.b4-price-hidden` | 困難模式隱藏價格（灰色斜體）|
| `.b4-rank-badge` | 排序徽章 1️⃣2️⃣3️⃣（absolute 右上角）|
| `.b4-triple-clicked` | 已點擊卡片（橘色邊框）|
| `.b4-pbar-mid` | 三店比例條中間色（橘色漸層）|

### 12.6 設定頁新增選項

```html
<div class="b-setting-group">
    <label class="b-setting-label">🏪 比較方式</label>
    <div class="b-btn-group">
        <button class="b-sel-btn" data-stores="two">兩家店</button>
        <button class="b-sel-btn" data-stores="triple">三家店排序 🎲</button>
    </div>
</div>
```

`_checkCanStart()` 要求 `compareStores` 非空（與其他三個設定並列）。

### 12.7 完成畫面學習成果區分

```javascript
${compareStores === 'triple'
    ? `<div class="b-res-ach-item">✅ 將三家商店由便宜到貴排序（F4 排序技能應用）</div>`
    : `<div class="b-res-ach-item">✅ 計算兩價格的差額</div>`}
```

---

## 十三、連勝徽章（Round 20，2026-03-28）

### 13.1 設計動機（B3 streak pattern）

B4 有兩個答題階段（Select 選店 + Diff 差額），連勝追蹤跨越兩個階段累積。

### 13.2 觸發點

| 函數 | 操作 |
|------|------|
| 選店正確（easy）| `streak++`，檢查徽章，進入下一題 |
| 選店正確（normal/hard）| 不計連勝，進入差額計算 |
| `handleDiffAnswer` 正確 | `streak++`，檢查徽章 |
| 選店錯誤 / 差額錯誤 | `streak = 0` |

三商店 easy 選最便宜正確也累計連勝（與兩商店 easy 相同路徑）。

### 13.3 CSS

`.b4-streak-badge`：固定置中，`b4SbPop`，橘金漸層，1.6s 後淡出。

## 十四、三商店困難模式自動提示（Round 21，2026-03-28）

### 14.1 功能說明

三商店排序模式（困難）中，若學生 10 秒內未點擊任何卡片：

1. 最便宜商品的卡片出現綠色邊框脈動（`b4AutoHintPulse`，3 次循環）
2. 語音：「提示：先找最便宜的」
3. 2.5 秒後自動移除高亮效果

### 14.2 觸發條件

```javascript
// _bindTripleEvents isHard 分支
Game.TimerManager.setTimeout(() => {
    if (this.state.tripleClickOrder.length === 0 && !this.state.isProcessing) {
        // 顯示 cheapestIdx 卡片提示
    }
}, 10000, 'ui');
```

**守衛**：`tripleClickOrder.length === 0`（尚未點擊）且 `!isProcessing`（未提交）

### 14.3 CSS

`.b4-triple-auto-hint`：`border: 3px solid #10b981`；`b4AutoHintPulse`：綠光 0→20px→0 迴圈 3 次。

### 14.4 設計參考

B1 `_showMinCoinsHint` 的「超時自動輔助」理念 — 給學生充足思考時間後才介入，不破壞主動挑戰的體驗。

---

## 十五、教學設計詳析（參照 F/C/A 格式，2026-03-29）

### 15.1 教學定位與學習目標

**核心定位**：B4 以「比價購物」的生活場景，訓練學生「比較兩個（或三個）數字大小 → 計算差額 → 做出最省錢選擇」的決策能力。

**學習目標層次**：
1. **知識層**：理解「同一商品不同店家可能有不同價格」的消費概念
2. **技能層**：比較數字大小，計算減法差額
3. **應用層**：在真實購物情境中選擇性價比最高的選項，並量化節省金額

**與其他單元的銜接**：
- 前置：F4（數字大小比較）→ F6（減法）
- 後續：B5（預算限制 → 更複雜的選擇決策）

### 15.2 測驗內容設計

**兩階段設計理念（Select + Diff）**：
- 第一階段（選店）：訓練「比較判斷」，聚焦大小關係
- 第二階段（差額）：訓練「量化差距」，聚焦減法計算
- 兩階段分離設計，讓學生逐步攻克，降低認知負荷

**防慣性設計**：50% 機率左右交換店家位置，防止學生慣性選「左邊」或「右邊」，強迫實際比較數字。

**三商店排序設計理念**：延伸比較能力至「完整排序」，對應 F4「數字排序」的高階應用。困難模式隱藏價格，測試學生能否先「觀察比較」而非依賴數字。

### 15.3 互動方式詳析

**兩店比較流程**：
```
題目出現（商品圖示 + 兩店名稱 + 各自價格）
→ 比例橫條即時視覺化（紅色=貴 / 綠色=便宜）
→ 學生點擊便宜的那家 → 勾勾確認
→ 差額題出現（普通：三選一 / 困難：鍵盤輸入）
→ 省錢 toast 升起
→ 下一題
```

**三商店排序流程**：
```
題目出現（三個商品卡片，順序隨機）
簡單：點最便宜 → 答對進下題
普通：點最便宜 → 進入差額三選一（最貴−最便宜）
困難：依序點 1️⃣→2️⃣→3️⃣（價格隱藏，純靠比較）
→ 10 秒未點 → 最便宜商品自動綠框提示
```

### 15.4 語音系統設計

**題目語音（含所有價格）**：
```
「[商品名]，[A店]X元，[B店]Y元，哪個比較便宜？」
三商店：「[商品名]，[A店]X元，[B店]Y元，[C店]Z元，請由便宜到貴排列。」
```

**答對語音**：「[A店] 比較便宜，省了 [差額] 元！」

**差額答對語音**：「答對了！[A店]比[B店]少[差額]元，可以省[差額]元！」

### 15.5 視覺設計特色

| 元素 | 設計 | 說明 |
|------|------|------|
| 比例橫條 | 紅色（貴）vs 綠色（便宜）寬度比例 | 視覺直覺化價格差距 |
| 省錢 toast | 底部升起「💰 省了X元！」| 即時正增強 |
| 排行榜 | 金/銀/銅牌 + 商品名 + 省幅 | 完成畫面遊戲化 |
| 比價歷程表 | 斑馬行 4 欄表格 | 學習回顧，強化記憶 |
| 自動提示 | 綠框脈動（三商店困難）| 非侵入式輔助 |

---

## 十六、單位比價模式（Round 22，2026-03-29）

### 16.1 設計動機

參照 A4「商店採購」的情境深度與 F6「數的組成」的除法概念應用，將 B4 從「直接比總價」升級為「先算每單位價格，再比較」，教導學生「同樣的錢買越多越划算」的消費判斷力。

**教學層次提升**：
- 兩家店（two）：直接比較總價 → 基礎比較
- 三家店排序（triple）：三個總價排序 → 排序應用
- **單位比價（unit）：先除再比 → 除法 + 比較的複合應用**

### 16.2 題庫（`B4_UNIT_ITEMS`，12 組）

| # | 商品 | 單位 | A 店（貴）| 每單位 | B 店（便宜）| 每單位 | 差 |
|---|------|------|-----------|--------|-------------|--------|-----|
| 1 | 糖果 🍬 | 個 | 超商 8個56元 | 7元 | 超市 10個50元 | 5元 | 2 |
| 2 | 鉛筆 ✏️ | 支 | 文具店 5支40元 | 8元 | 大賣場 6支36元 | 6元 | 2 |
| 3 | 雞蛋 🥚 | 顆 | 超商 6顆60元 | 10元 | 超市 10顆80元 | 8元 | 2 |
| 4 | 香蕉 🍌 | 根 | 超市 3根30元 | 10元 | 菜市場 4根32元 | 8元 | 2 |
| 5 | 水餃 🥟 | 個 | 冷凍食品 10個80元 | 8元 | 大賣場 12個84元 | 7元 | 1 |
| 6 | 吐司 🍞 | 片 | 超商 4片60元 | 15元 | 麵包店 6片72元 | 12元 | 3 |
| 7 | 小番茄 🍅 | 顆 | 超商 5顆35元 | 7元 | 菜市場 8顆40元 | 5元 | 2 |
| 8 | 優格 🫙 | 瓶 | 超商 2瓶50元 | 25元 | 超市 4瓶88元 | 22元 | 3 |
| 9 | 巧克力棒 🍫 | 支 | 超商 3支75元 | 25元 | 超市 5支110元 | 22元 | 3 |
| 10 | 洗衣錠 🧼 | 顆 | 藥局 10顆120元 | 12元 | 量販店 15顆150元 | 10元 | 2 |
| 11 | 果凍 🍮 | 個 | 超商 3個45元 | 15元 | 量販店 6個72元 | 12元 | 3 |
| 12 | 抹布 🧹 | 條 | 超市 2條30元 | 15元 | 量販店 4條48元 | 12元 | 3 |

**資料設計規範**：
- `optA.price / optA.qty`（每單位）永遠大於 `optB.price / optB.qty`（整數除法，精確無餘數）
- 差額 diff = perA - perB，範圍 1-3 元（適合小差值選項）
- 各種商品計算單位：個/支/顆/根/片/瓶/條

### 16.3 題目生成（`_generateQuestions`）

```javascript
} else if (isUnit) {
    const perA   = item.optA.price / item.optA.qty;  // 每單位價格（整數）
    const perB   = item.optB.price / item.optB.qty;
    const diff   = perA - perB;                       // 每單位差額（1-3）
    const swapped = Math.random() < 0.5;
    result.push({ ...item, swapped, perA, perB, diff, isTriple: false, isUnit: true });
}
```

### 16.4 UI 變化（unit mode 特有）

**選項卡（`_renderOptionCard`）**：
```
🏪 超商                    🛒 超市
 8個 / 56元               10個 / 50元
每個 [7]元                每個 [5]元   ← 橘色標籤（amber 底色）
```

**比例條（`_renderPriceBars`）**：使用 `perA`/`perB` 而非總價，單位標示「元/個」

**差額題（`_renderDiffSection`）**：
- 問題文字：「每${unit}差多少元？」
- 選項標籤：「N 元/${unit}」
- 鍵盤顯示：「0 元/${unit}」

**算式提示（`_showDiffFormulaHint`）**：
```
💡 算式提示：
超商 56÷8=7元 − 超市 50÷10=5元 = ？ 元/個
```

### 16.5 語音設計

| 場景 | 語音模板 |
|------|---------|
| 進題（簡單）| 「糖果，超商8個56元，超市10個50元，哪家每個比較划算？」|
| 進題（普通）| 「...哪家每個比較划算？選出後再回答每個差多少元。」|
| 選店答對（easy）| 「答對了！超市比較划算」|
| Diff 答對 | 「答對了！每個便宜了2元」|
| Diff 答錯（retry）| 「每個差2元，再試一次」|
| 提示鈕 | 「每個，超商7元，超市5元，差2元」|

### 16.6 完成畫面更新

- **比價歷程表**：便宜/較貴欄顯示「X元/個」格式
- **排行榜**：顯示「每個省N元」
- **節省橫幅**：改為「你找出了最划算的單位價格！」+ 「X 元 / 單位」

### 16.7 AssistClick 整合

單位比價模式沿用兩家店的 AssistClick 邏輯（`isUnit` 不影響 phase 結構）：
- Select 階段：高亮 `card-right`（optB 較便宜），同兩家店
- Diff 普通：高亮正確的差額選項（如 `[data-val="2"]`）
- Diff 困難：逐位數輸入（如 `2` → `✓`）

---

## 十七、商品類別篩選（2026-03-29）

### 17.1 類別設計

| 類別 ID | 中文名稱 | 涵蓋範圍 |
|---------|---------|---------|
| `food` | 食品飲料 | 蘋果、牛奶、餅乾、奶茶等 |
| `stationery` | 文具書籍 | 鉛筆盒、色鉛筆、故事書等 |
| `daily` | 日用品 | 洗髮精、牙刷、面紙等 |
| `clothing` | 服裝配件 | 運動鞋、拖鞋、帽子等 |

`B4_ITEMS`、`B4_TRIPLE_ITEMS`、`B4_UNIT_ITEMS` 三個題庫均含 `cat` 欄位。`itemCat: 'all'` 為預設值，題庫少於 2 項時自動 fallback。

---

## 十八、開題商品介紹彈窗（`_showItemIntroModal`，2026-03-29）

每題渲染後顯示商品 icon + 名稱 + 兩店價格對比，1.8 秒自動關閉或點擊關閉。

靈感來源：B1 `_showTaskModal`（C4 pattern）、B6 mission intro。

CSS：`.b4-intro-card`、`.b4-intro-store`、`.b4-intro-vs`、`.b4-intro-question`、`b4IntroIn` 動畫。

---

## 十九、輔助點擊模式（AssistClick，2026-03-29）

| 階段 / 模式 | 策略 |
|------------|------|
| Select（兩家店）| 高亮 `card-right`（optB 較便宜，swapped 時高亮 left）|
| Select（三家店 easy/normal）| 高亮 `tcard-${cheapestIdx}` |
| Select（三家店 hard）| 依 `tripleClickOrder[]` 完成數量，決定下一張目標（cheapest→middle→expensive）|
| Diff 普通 | 高亮正確差額選項（`.b4-diff-opt[data-val]`）|
| Diff 困難 | 逐位數 → `btn-ok` |
| 單位比價 | 沿用兩家店邏輯（`isUnit` 不影響 phase 結構）|

---

## 二十、Rounds 26–39 豐富化紀錄

### 20.1 省錢 Toast（2026-03-27）

`_showSavingsToast(amount)`：diff 答對後立即顯示固定底部浮動 toast「💰 省了 X 元（省 Y%）！」，高價格 `optA.price` 為計算基準，unit 模式用 `perA`。`@keyframes b4ToastUp`、`pointer-events: none`。

### 20.2 較貴商品差額標籤（Round 29）

兩商店 select 答對時，wrong card 加 `.b4-exp-delta`「比較貴 +N 元」紅色標籤（`b4DeltaIn` 動畫）；unit mode 跳過。

### 20.3 差額算式閃現（Round 29）

`handleDiffAnswer` 正確分支：`_showDiffCalcFlash(highPrice, lowPrice, diff)` 底部顯示「X − Y = Z 元」算式 toast。CSS：`.b4-calc-flash`、`b4CfIn` 動畫。

### 20.4 三商店獎台動畫（Round 29）

`_showPodiumAnimation(curr)`：triple 排序全對後顯示 2nd/1st/3rd 獎台動畫，`b4PodiumRise` 動畫，搜尋 `b4-podium-overlay`。

### 20.5 冠軍徽章（Round 31）

`handleSelectClick` easy 答對後呼叫 `_showChampionBadge(storeName)`，中央「🥇 X 最便宜！」淡入淡出 1.6s，`@keyframes b4ChampIn/Out`。

### 20.6 減法學習要點（Round 32）

`handleDiffAnswer` 正確分支加 `_showSubtractionTip(high, low, diff)`：底部「X − Y = Z 元」算式 toast（1.2s + fade）。

### 20.7 卡片光暈（Round 33）

`handleSelectClick` 正確卡加 `.b4-card-glow`（`b4CardGlow` 0.8s）。

### 20.8 差額百分比標示（Round 36）

`_renderPriceBars` 加 `.b4-pbar-diff-pct`「便宜了 X%」橙色標籤。

### 20.9 困難記憶倒數（Round 38）

`renderQuestion` hard 模式 1.9 秒後啟動 `_startMemoryCountdown()`；3 秒後 `.b4-mem-blur` 模糊價格，顯示「🤔 靠記憶回答！」。教學意義：訓練短期記憶與心算，強化認知負荷管理。

### 20.10 累計節省徽章（Round 39）

`_renderHeader` header-right 加 `b4-savings-tally`：`q.totalSaved > 0` 顯示「💰 已省 X 元」綠色小徽章。

---

## 二十一、完成畫面豐富化

### 21.1 比價歷程表（2026-03-26）

`state.quiz.comparisonHistory[]`，`handleDiffAnswer` 答對時從 `state.currentDiffItem` 取資料 push，渲染橘框斑馬表（商品 / 便宜 / 較貴 / 省下 4 欄）。

### 21.2 省錢排行榜（2026-03-27）

Top-3 medals 排行（🥇🥈🥉）；無新 state，從 `comparisonHistory` 排序。

### 21.3 最划算摘要（Round 35）

`savingsRankHTML` 頂部加 `.b4-best-deal` 卡「🌟 最划算：X 在 Y 買，省了 Z 元！」。

### 21.4 勳章制（Round 33/34）

🥇🥈🥉⭐ 分層勳章，與 B1~B6 全系列對齊。


## 二十二、10秒無操作自動提示（2026-03-30）

### 背景

A5 ATM 採用「時間觸發提示」（`hintDelay`）作為補充機制，與 B4 現有「錯誤次數觸發」並行。B4 選擇階段（`phase === 'select'`）學生有時猶豫不決，錯誤計數尚未累積，無法觸發舊提示。

### 實作

在 `renderQuestion()` easy/normal 模式末尾啟動 10 秒計時器：

```javascript
if (diff !== 'hard') {
    this._clearSelectHintTimer();
    this._selectHintTimer = Game.TimerManager.setTimeout(() => {
        if (this.state.phase === 'select') {
            const curr = this.state.quiz.questions[this.state.quiz.currentQuestion];
            if (!curr || curr.isTriple) return;
            const correctSide = curr.swapped ? 'left' : 'right';
            const card = document.getElementById(`card-${correctSide}`);
            if (card) {
                card.classList.add('b4-auto-select-hint');
                Game.TimerManager.setTimeout(() => card.classList.remove('b4-auto-select-hint'), 3000, 'ui');
                Game.Speech.speak('提示：哪個比較便宜？');
            }
        }
    }, 10000, 'ui');
}
```

**取消計時器**：`handleSelectClick()` 開頭呼叫 `this._clearSelectHintTimer()`，防止答對後仍觸發提示。

### `_clearSelectHintTimer()` 輔助方法

```javascript
_clearSelectHintTimer() {
    this._selectHintTimer = null;
    // TimerManager 的 category 'ui' 在 renderQuestion 中重新設定，不需要手動 clearTimeout
},
```

### CSS

| 類別 | 說明 |
|------|------|
| `.b4-auto-select-hint` | 綠色 `outline: 3px solid #22c55e`，`b4AutoHint` 脈動 2 次 |
| `@keyframes b4AutoHint` | box-shadow rgba(34,197,94) 低→高→低，1.5s，2 iterations |

### 設計細節

- **困難模式跳過**：困難模式學生不應收到自動提示
- **三商店跳過**：`curr.isTriple` 為真時跳過（三商店邏輯不同）
- **不干擾錯誤計數提示**：此為獨立 timer，與 `selectErrorCount >= 3` 的高亮提示並行
- 遵循 **A5 hintDelay** pattern，以時間衡量困難度而非只看錯誤次數

---

## 十二、價格動態變化（2026-03-31，Round 41）

### 背景

B4 原本所有商品使用固定價格（`B4_ITEMS` 資料表中的 `optA.price` / `optB.price`），每次遊玩答案完全相同，學生可能依靠記憶而非真正比較。參照 **A4 ±10-15% 動態定價**與 **C5 PriceStrategy（seeded random）** 模式，在普通/困難模式加入隨機價格浮動，讓每次遊玩都有不同數字。

### 技術實作

**JS 修改**（`_generateQuestions`，`else` 兩商店分支）：

```javascript
// 價格動態變化（普通/困難模式 ±10%/±20%）
let finalItem = item;
const difficulty = this.state.settings.difficulty;
if (difficulty === 'normal' || difficulty === 'hard') {
    const pct = difficulty === 'hard' ? 0.20 : 0.10;
    let priceA = Math.round(item.optA.price * (1 + (Math.random() * 2 - 1) * pct) / 5) * 5;
    let priceB = Math.round(item.optB.price * (1 + (Math.random() * 2 - 1) * pct) / 5) * 5;
    priceA = Math.max(priceA, 5);
    priceB = Math.max(priceB, 5);
    // 確保 optA 仍較貴（若隨機使 A ≤ B，則不套用變化）
    if (priceA > priceB) {
        finalItem = { ...item, optA: { ...item.optA, price: priceA }, optB: { ...item.optB, price: priceB } };
    }
}
const swapped = Math.random() < 0.5;
const diff    = finalItem.optA.price - finalItem.optB.price;
result.push({ ...finalItem, swapped, diff, isTriple: false, isUnit: false });
```

### 設計決策

| 難度 | 浮動範圍 | 取整單位 | 說明 |
|------|---------|---------|------|
| easy | 無變化（固定） | — | 初學者需一致性，建立比較基礎 |
| normal | ±10% | 5 元 | 適度變化，訓練真實比價能力 |
| hard | ±20% | 5 元 | 最大浮動，每次算法不同 |

- **取整到 5 元**：`Math.round(price / 5) * 5`，避免奇怪數字（如 37、83），貼近真實市場定價
- **安全守衛**：變化後若 `priceA ≤ priceB`（極少發生，機率 < 5%），**不套用變化**，使用原始固定價，確保題目永遠有正確答案
- **最低 5 元**：`Math.max(priceA, 5)` 防止極端低價商品被 round 為 0
- **三商店/單位比價跳過**：只在兩商店模式（`else` 分支）套用；三商店排序保持固定避免邏輯混亂；單位比價有自己的 `perA/perB` 計算邏輯

### 搜尋關鍵字

- `價格動態變化`、`pct = difficulty === 'hard'`、`finalItem`、`priceA = Math.max`
- 參照：`A4 amountLevels`、`C5 PriceStrategy`、`B4_ITEMS`

---

## 十三、Round 43 三商店獎台語音播報（2026-03-31）

### 功能說明
`_showPodiumAnimation` 顯示獎台動畫後 350ms，自動語音播報「第一名，X店，Y元，最便宜！」。使用 `TimerManager.setTimeout` 確保記憶體安全，並加入 `'speech'` 類別標記。

### 教學設計
- **參照模式**：A4 交易摘要語音 + B系列答對語音反饋模式
- **學習強化**：視覺（獎台動畫）與聽覺（語音播報）雙重確認排名結果；幫助學生鞏固「最便宜」的比較概念

### 關鍵實作
```javascript
document.body.appendChild(overlay);
// 語音播報排名（Round 43）
const cheapest = sorted[0];
Game.TimerManager.setTimeout(() => {
    Game.Speech.speak(`第一名，${cheapest.store}，${cheapest.price}元，最便宜！`);
}, 350, 'speech');
```

### 搜尋關鍵字
`語音播報排名`、`cheapest.store`、`_showPodiumAnimation`

---

## 二十四、Rounds 40–44 豐富化總覽（2026-03-31 ~ 2026-04-01）

> **更新日期**：2026-04-01（Rounds 40–44 完整記錄）

### 檔案規模更新

| 檔案 | 行數（Round 44，2026-04-01）|
|------|--------------------------|
| `js/b4_sale_comparison.js` | 2,169 行 |
| `css/b4_sale_comparison.css` | 890 行 |

### Round 40–44 功能彙整

| Round | 功能 | 關鍵類別/函數 | 教學模式參照 |
|-------|------|--------------|------------|
| 41 | **動態價格浮動** | `_generateQuestions` 兩商店分支：normal ±10%、hard ±20%，取整到5元；安全守衛：浮動後 `priceA ≤ priceB` 不套用；三商店/單位比價跳過 | A4 amountLevels / C5 PriceStrategy |
| 43 | **三商店獎台語音播報** | `_showPodiumAnimation` overlay 建立後 350ms 播報「第一名，X店，Y元，最便宜！」；`TimerManager.setTimeout(..., 'speech')` | A4 交易摘要語音 |
| 44 | **比價思路步驟卡** | `_showThinkingSteps(curr)`：兩商店模式 easy 答對後顯示藍色卡片；1️⃣A店X元 / 2️⃣B店Y元 / 結論；`b4TcIn`+`b4TcStepIn` stagger 動畫；2s 後 `b4-tc-fade` 淡出；`handleSelectClick` easy 分支呼叫 | B5 round intro card pattern |

### 技術要點

- **動態價格安全守衛**：浮動後若 `priceA ≤ priceB`（機率 <5%）不套用，使用原始固定價，確保題目永遠有正確答案；最低 5 元防止歸零
- **三商店語音播報**：350ms 延遲 = overlay DOM 建立穩定後，`sorted[0]` 為最便宜店（已依 price 升序排序）
- **思路步驟卡**：每個步驟（1️⃣2️⃣結論）以 `b4TcStepIn` stagger 進場（0/0.15s/0.3s delay），引導學生「看→比→結論」的思維流程；只在 easy 模式顯示，不干擾 normal/hard 的學習節奏
- 連勝徽章（B 系列統一）：`quiz.streak`；達 3/5 觸發 `_showStreakBadge(streak)`

### 搜尋關鍵字

- `價格動態變化`、`pct = difficulty`、`finalItem`
- `語音播報排名`、`cheapest.store`、`_showPodiumAnimation`
- `_showThinkingSteps`、`b4-thinking-card`、`b4TcIn`、`b4TcStepIn`
- `b4-mem-replay`、`b4-mem-replay-btn`（Round 45）

---

## 二十五、Round 45 新增功能（2026-04-01）

| 功能 | 描述 | 搜尋關鍵字 |
|------|------|----------|
| 記憶模式語音重聽按鈕 | `_startMemoryCountdown` 模糊後加 `#b4-mem-replay` 按鈕（fixed 右上角）；click 朗讀所有店家價格；2s disable 防連按 | `b4-mem-replay`, `b4-mem-replay-btn` |

**教學意義**：困難模式遮蔽價格後，提供一次語音重聽機會，讓學生可以選擇是否需要「聲音輔助」記憶，兼顧不同學習風格（視覺/聽覺記憶）。對照 B2 困難模式語音重聽鈕（Round 30）的設計。
