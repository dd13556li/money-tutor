# B3 存錢計畫 — 單元完成報告書

> **建立日期**：2026-03-24
> **更新日期**：2026-03-24（商品改圖片、語音修正）
> **更新日期**：2026-03-24（第二輪：補充圖片系統詳解、商品表修正「食譜書」、作業單題型、跨系列特色分析）
> **更新日期**：2026-03-24（第七輪：B3_ALL_ITEMS 擴充 14→20 件，easy 3→6 件，normal 11→15 件）
> **更新日期**：2026-03-25（第九輪：週數計算模式新增除法公式提示 `_showDivisionHint`）
> **更新日期**：2026-03-25（第十二輪：月曆模式進度里程碑徽章 `_showMilestoneBadge`，F2/A3 pattern）
> **更新日期**：2026-03-25（第十四輪：月曆模式語音完整設計 — 彈窗標題修正、存錢目標語音、日期語音、最後拖放等語音完成再下一步；商品名稱修正 美術套組→食譜書 / 食譜書→兒童繪本；金幣顯示移除上限）
> **更新日期**：2026-03-29（目標類別篩選：`B3_ALL_ITEMS` 加 `cat` 欄位（toy/book/outdoor/tech）；輔助點擊 AssistClick；月曆倒數提示；距完成天數；平均每週存款）
> **更新日期**：2026-03-30（Rounds 29–39 豐富化：進度環/存錢粒子/最佳存法提示/預估達標日/週剩餘標籤完整記錄）
> **更新日期**：2026-03-30（商品全面重建：廢棄 images/b3/，改用 C5 現有圖片 14 件；渲染路徑改為通用 `../images/${item.img}`）
> **更新日期**：2026-03-31（商品資料庫再擴充 14→20 件：新增鉛筆盒/日記本/計算機/運動上衣/運動褲/手機；輔助點擊設定頁修正—改為簡單模式才顯示，對齊 B1 規範）
> **更新日期**：2026-03-31（Round 42：簡單模式選項擴充4個 + 結構化干擾項 `_generateChoices`；2×2 格局 CSS）
> **專案名稱**：Money Tutor 金錢教學系統
> **單元編號**：B3 — 存錢計畫（Savings Plan）
> **系列**：B 預算規劃
> **報告類型**：單元完成報告（測驗內容 / 教學設計 / 技術規格）

---

## 一、檔案規模總覽

| 檔案 | 路徑 | 行數/版本 |
|------|------|---------|
| HTML | `html/b3_savings_plan.html` | — |
| JS | `js/b3_savings_plan.js` | ~2,863 行，v4.5（B 系列最大）|
| CSS（專用）| `css/b3_savings_plan.css` | ~1,729 行（2026-03-30）|
| 作業單 | `worksheet/units/b3-worksheet.js` | 93 行 |
| 商品圖片 | `images/c5/icon-c5-*.png`（共用） | 14 張（2026-03-30 改用 C5 圖片，廢棄 images/b3/）|

> B3 為 B 系列規模最大單元，擁有**雙模式**（月曆拖曳 / 週數計算）與**撲滿視覺化**系統。

---

## 二、單元特色

### 2.1 教學定位

B3 訓練「目標導向儲蓄規劃」：看目標商品，計算每週需存多少才能達成目標。
學習路徑：**乘除法（F6 數的組成）→ 目標計算（B3）→ 預算管控（B5/B6）**

### 2.2 雙模式設計（B3 獨有）

| 模式 | 觸發條件 | 核心互動 | 教學重點 |
|------|---------|---------|---------|
| **月曆拖曳**（easy）| 難度選「簡單」| 點擊日曆格 → 拖曳金錢圖示放入撲滿 | 每日存錢習慣養成 |
| **週數計算**（normal/hard）| 難度選普通/困難 | 三選一 or 數字鍵盤輸入週數 | 乘除法應用、目標計算 |

### 2.3 商品資料庫（`B3_ALL_ITEMS`）

**14 種**生活化商品（2026-03-30 全面重建，改用 C5 現有圖片），emoji 作為 fallback：

| # | 商品名稱   | 價格    | 圖片路徑（`../images/` 起）           | 類別    | 難度篩選 |
|---|-----------|--------|--------------------------------------|---------|---------|
| 1 | 📚 漫畫書  | 200 元 | `c5/icon-c5-comic-book.png`          | book    | easy+  |
| 2 | 📕 故事書  | 260 元 | `c5/icon-c5-story-book.png`          | book    | easy+  |
| 3 | 🚗 玩具車  | 300 元 | `c5/icon-c5-toy-car.png`             | toy     | easy+  |
| 4 | 🪆 娃娃    | 350 元 | `c5/icon-c5-doll.png`                | toy     | easy+  |
| 5 | 🏎️ 遙控車  | 380 元 | `c5/icon-c5-rc-car.png`              | toy     | easy+  |
| 6 | 🤖 機器人玩具 | 400 元 | `c5/icon-c5-robot.png`            | toy     | easy+  |
| 7 | 🎧 耳機    | 480 元 | `c5/icon-c5-headphones.png`          | tech    | normal+ |
| 8 | 🧥 外套    | 550 元 | `c5/icon-c5-jacket.png`              | outdoor | normal+ |
| 9 | 👟 籃球鞋  | 620 元 | `c5/icon-c5-basketball-shoes.png`    | outdoor | normal+ |
|10 | 🔊 藍芽喇叭 | 680 元 | `c5/icon-c5-bluetooth-speaker.png`  | tech    | normal+ |
|11 | 🛹 滑板    | 750 元 | `c5/icon-c5-skateboard.png`          | outdoor | normal+ |
|12 | ⌚ 智慧手錶 | 800 元 | `c5/icon-c5-smartwatch.png`         | tech    | normal+ |
|13 | 🚴 腳踏車  | 1,500 元 | `c5/icon-c5-bicycle.png`           | outdoor | hard   |
|14 | 📱 平板電腦 | 3,000 元 | `c5/icon-c5-tablet.png`            | tech    | hard   |

### 2.4 難度篩選規則

```javascript
easy:   B3_ALL_ITEMS.filter(i => i.price <= 400)   // 6 件（漫畫書/故事書/玩具車/娃娃/遙控車/機器人玩具）
normal: B3_ALL_ITEMS.filter(i => i.price <= 800)   // 12 件（以上 + 耳機/外套/籃球鞋/藍芽喇叭/滑板/智慧手錶）
hard:   B3_ALL_ITEMS（全部）                        // 14 件（以上 + 腳踏車/平板電腦）
```

月曆模式（easy）另依 `state.settings.priceRange` 篩選：

| priceRange 設定 | 上限 | 商品件數 |
|----------------|------|---------|
| 300 | 300 元 | 3 件（漫畫書/故事書/玩具車）|
| 500 | 500 元 | 6 件（以上 + 娃娃/遙控車/機器人玩具）|
| 800 | 800 元 | 12 件 |

### 2.5 撲滿動畫系統（普通 / 困難模式）

答對後視覺化「存錢格子」填充過程：
- 最多 8 格（totalWeeks > 8 時每格代表 N 週）
- 每格填充間隔 350ms，同步播放 `coin.mp3`
- 填滿後豬豬震動動畫，callback 進入下一題

### 2.6 月曆存錢系統（簡單模式）—— 2026-03-21 新增

模擬每日存錢行為：
- 月曆格子代表每一天（天數 = `ceil(price / dailyAmount)`）
- 點擊未存的日期格 → 觸發拖曳工作階段
- 拖曳真實金錢圖示放入右側撲滿
- 撲滿面額堆積，支援手動兌換（如 10×10元 → 1×100元）

### 2.7 手動兌換系統（月曆模式）—— 2026-03-23 新增

| 兌換規則 | 條件 |
|---------|------|
| 10×1元 → 1×10元 | `denomPile[1] >= 10` |
| 2×5元 → 1×10元 | `denomPile[5] >= 2` |
| 5×10元 → 1×50元 | `denomPile[10] >= 5` |
| 10×10元 → 1×100元 | `denomPile[10] >= 10` |
| 2×50元 → 1×100元 | `denomPile[50] >= 2` |
| 5×100元 → 1×500元 | `denomPile[100] >= 5` |

達閾值時顯示綠色兌換按鈕（`.b3-pig-exch-btn`）。

### 2.9 月曆進度里程碑（`_showMilestoneBadge`）—— 2026-03-25 新增

月曆模式每次拖曳存錢完成後，偵測累計金額是否跨越 25 / 50 / 75% 閾值，觸發中央浮動徽章慶祝。

**觸發邏輯**（`_completeDragSession`）：
```javascript
const prevPct = Math.floor(prevAccum / c.item.price * 100);
const newPct  = Math.floor(c.accumulated / c.item.price * 100);
const crossed = [25, 50, 75].find(m => prevPct < m && newPct >= m);
if (crossed) this._showMilestoneBadge(crossed);
```

| 里程碑 | 徽章文字 |
|--------|---------|
| 25%    | 存了四分之一！🎉 |
| 50%    | 存了一半！🌟 |
| 75%    | 快到了！💪 |

**技術細節**：
- 固定在畫面中央（`top:45%, left:50%`）
- 雙重動畫：`b3MilestonePop`（彈出）+ `b3MilestoneFade`（2.2s 後淡出）
- `TimerManager.setTimeout` 2200ms 後移除 DOM（避免殘留）
- `document.body.contains()` 守衛防止重複渲染

**靈感來源**：F2 唱數里程碑音效 + A3 任務彈窗的視覺確認模式 — 在學習進度的關鍵節點給予正向強化。

---

### 2.8 除法公式提示（週數計算模式）—— 2026-03-25 新增

普通 / 困難模式答錯時，在數字鍵盤上方即時顯示算式分解：

```
💡 計算方式：480 元 ÷ 60 元/週 ≈ 8 週（無條件進位）
```

**實作重點**：

| 項目 | 說明 |
|------|------|
| 函數 | `_showDivisionHint(question)` |
| 觸發條件 | `_handleNumpadAnswer` 答錯時呼叫 |
| 防重複 | `document.querySelector('.b3-div-hint')` 守衛 |
| 插入位置 | `.b3-numpad-section` 末尾 append |
| 生命週期 | 下一題 `renderQuestion` 時自動消失 |

**CSS**（`b3_savings_plan.css`）：
- `.b3-div-hint`：黃底（`#fef9c3`）、琥珀邊框（`#fde047`）、`b3FadeIn` 動畫
- `.b3-hint-ans`：綠色（`#059669`）突顯正確答案
- retry 語音更新：「不對喔，參考提示再試一次」
- proceed timeout：2200→2500ms（讓學生有時間閱讀提示）

**教學設計對齊**：與 B2 `_showCalcBreakdown`、B4 `_showDiffFormulaHint` 統一採用「錯答即時顯示算式」模式，源自 C 系列逐步揭示原則。

### 2.9 自訂物品上傳（月曆模式）

教師可上傳自訂商品圖片，設定名稱與價格，加入商品池：
- 圖片壓縮：300px、70% 品質（`b3CompressImage`）
- 儲存於 `state.customItems`（陣列）
- 月曆生成時自訂物品優先納入（若在 priceRange 內）


---

## 三、測驗設計詳解

### 3.1 週數計算流程（普通 / 困難）

```
[設定] 選商品 → [題目] 顯示商品圖片 + 名稱 + 價格 + 每週存款金額
    ↓
核心計算：answer = Math.ceil(price / weeklyAmount)
    ↓
[作答]
普通：三選一（answer, answer±1~3 作為干擾項）
困難：數字鍵盤輸入
    ↓
正確 → 語音「需要 N 週！」→ 撲滿動畫 → 下一題
錯誤（retry）→ 語音「不對，再想想」→ 1600ms 後重啟
錯誤（proceed）→ 語音「正確 N 週」→ hint div → 2200ms 後跳題
```

### 3.2 月曆拖曳流程（簡單模式）—— 2026-03-23 更新版

```
① 進入月曆頁  → 語音：「今天可以存 X 元」
② 點擊日曆格  → _startDragSession()，語音：「把 X 元拖曳放進撲滿！」
③ 放置第 1 枚  → placedAmount += denom，語音：「存入 10 元」
④ 放置第 2 枚  → placedAmount += denom，語音：「存入 20 元」
   …（依序累計播報）
⑤ 全部放完    → 延遲 500ms → _completeDragSession()
   語音：「今天存了 X 元，共存了 X 元，還差了 X 元」
   若達目標 → 語音：「太棒了！已經存夠了！」
```

### 3.3 難度測驗對照表

| 維度 | 簡單（月曆）| 普通（週數）| 困難（週數）|
|------|-----------|-----------|-----------|
| 商品範圍 | priceRange 篩選（≤300:4件/≤500:10件/≤800:15件）| ≤800 元 15 件 | 全部 20 件 |
| 互動方式 | 月曆點擊 + 拖曳放幣 | 三選一 | 數字鍵盤 |
| 核心計算 | 視覺完成（每日存入）| `ceil(price/weekly)` | `ceil(price/weekly)` |
| 提示 | 步驟語音引導 | retry 重啟 or proceed 跳題 | 同普通 |
| 撲滿行為 | 面額堆積 + 手動兌換 | 格子填充動畫 | 格子填充動畫 |

---

## 四、語音系統

### 4.1 週數計算模式語音

| 場景 | 語音 |
|------|------|
| 進入題目 | 「想買{商品名}要{price}元，每週存{weekly}元，需要幾週？」|
| 答對 | 「答對了！需要 N 週才能存夠！」|
| 答錯（retry）| 「不對喔，再想想看」|
| 答錯（proceed）| 「正確答案是 N 週」|

### 4.2 月曆模式語音（2026-03-23 更新）

| 場景 | 語音 |
|------|------|
| 進入月曆 | 「今天可以存 X 元」|
| 拖曳開始 | 「把 X 元拖曳放進撲滿！」|
| 每枚放置 | 「存入 X 元」（X = 累計放入金額）|
| 每日完成（未達標）| 「今天存了 X 元，共存了 X 元，還差了 X 元」|
| 每日完成（達標）| 「太棒了！已經存夠了！」|

---

## 五、作業單

| 項目 | 說明 |
|------|------|
| 題型 | 存錢計畫計算（商品價格 ÷ 週存金額 = 週數）|
| defaultCount | 20 題 |
| 月曆模式對應 | 無對應作業單（月曆為模擬互動，非紙本化）|

---

## 六、技術注意事項

- `_itemIconHTML(item, size='128px')`：優先 `item.imageData`（自訂上傳）→ `item.img`（內建圖片，`onerror` 回退 emoji）→ `item.icon`（emoji）
- 月曆模式 `c.drag.placedAmount` 追蹤拖曳累計金額，每次放置後播語音
- 月曆 `state.calendar.denomPile` 記錄各面額數量（非貪婪分解）
- `b3CompressImage` 為全域函數（非 `Game` 方法），多實例共存會衝突（實際不會）
- `B3_ITEMS_BY_DIFF` 在模組載入時靜態生成，自訂物品需在 `_startCalendarSession` 動態合併

---

## 七、圖片系統詳解（2026-03-30 全面重建）

> **重建原因**：原 `images/b3/` 圖片與商品名稱長期不一致（如籃球圖片對應「烹飪玩具組」名稱），整批刪除後改用 C5 現有圖片直接共用，無需另行製圖。

### 7.1 圖片資源一覽

| 商品      | 圖片路徑（完整）                                    | 圖片確認 |
|----------|-----------------------------------------------------|---------|
| 漫畫書    | `images/c5/icon-c5-comic-book.png`                 | ✅ C5 現有 |
| 故事書    | `images/c5/icon-c5-story-book.png`                 | ✅ C5 現有 |
| 玩具車    | `images/c5/icon-c5-toy-car.png`                    | ✅ C5 現有 |
| 娃娃      | `images/c5/icon-c5-doll.png`                       | ✅ C5 現有 |
| 遙控車    | `images/c5/icon-c5-rc-car.png`                     | ✅ C5 現有 |
| 機器人玩具 | `images/c5/icon-c5-robot.png`                     | ✅ C5 現有 |
| 耳機      | `images/c5/icon-c5-headphones.png`                 | ✅ C5 現有 |
| 外套      | `images/c5/icon-c5-jacket.png`                     | ✅ C5 現有 |
| 籃球鞋    | `images/c5/icon-c5-basketball-shoes.png`           | ✅ C5 現有 |
| 藍芽喇叭  | `images/c5/icon-c5-bluetooth-speaker.png`          | ✅ C5 現有 |
| 滑板      | `images/c5/icon-c5-skateboard.png`                 | ✅ C5 現有 |
| 智慧手錶  | `images/c5/icon-c5-smartwatch.png`                 | ✅ C5 現有 |
| 腳踏車    | `images/c5/icon-c5-bicycle.png`                    | ✅ C5 現有 |
| 平板電腦  | `images/c5/icon-c5-tablet.png`                     | ✅ C5 現有 |

### 7.2 `_itemIconHTML()` 方法

```javascript
_itemIconHTML(item, size = '128px') {
    // 優先 1：自訂上傳圖片（base64）
    if (item.imageData) {
        return `<img src="${item.imageData}" alt="${item.name}"
                     style="width:${size};height:${size};object-fit:cover;border-radius:8px;"
                     draggable="false">`;
    }
    // 優先 2：內建 PNG 圖片（onerror 回退 emoji）
    // item.img 格式：'c5/icon-c5-xxx.png'（含資料夾，路徑從 images/ 起）
    if (item.img) {
        const fallback = item.icon || '🎁';
        return `<img src="../images/${item.img}" alt="${item.name}"
                     style="width:${size};height:${size};object-fit:contain;"
                     draggable="false"
                     onerror="this.replaceWith(document.createTextNode('${fallback}'))">`;
    }
    // 優先 3：emoji fallback
    return item.icon || '🎁';
}
```

### 7.3 圖片顯示尺寸（全 B3 統一為 128px）

| 呼叫位置 | 函數/模板 | 尺寸 |
|---------|---------|------|
| 週數測驗商品卡 | `renderQuestion()` | 128px |
| 月曆模式商品展示 | `_startCalendarSession()` | 128px |
| 設定頁自訂物品預覽 | `_renderCustomItemsPanel()` | 128px |
| 作業單 | `b3-worksheet.js` | 96px（紙本較小）|

---

## 八、作業單詳解（2026-03-24 補充）

| 項目 | 說明 |
|------|------|
| 題型 1 | 存錢計畫計算：商品圖示 + 名稱 + 價格 + 每週存款，填寫所需週數 |
| 題型 2（建議）| 逆向計算：給商品價格 + 目標週數，填寫每週需存多少 |
| 題型 3（建議）| 三選一週數：同題型 1 但附三個選項 |
| 題數 | `defaultCount = 20`（可在作業單工具列調整）|
| 商品選取 | 從 `B3_ALL_ITEMS` 全 20 件中隨機抽取，不重複 |
| 月曆模式 | 無對應作業單（月曆為模擬互動，難以紙本化）|

---

## 九、跨系列特色分析（2026-03-24，參照 F1/C2）

### 9.1 B3 vs F 系列設計原則比較

| 特性 | B3 存錢計畫 | F3 數字認讀 | F5 量比較 |
|------|-----------|-----------|---------|
| 架構 | if-else 難度分支 | ModeConfig 配置驅動 | QuantityComparisonConfig |
| 互動類型 | 選擇/鍵盤/拖曳（3 種）| 拖曳 | 按鈕點擊 |
| 自訂主題 | 自訂商品上傳（含圖片）| emoji 主題（水果/動物/交通）| 6 內建主題 + 自訂 |
| 計時挑戰 | 無 | 無 | 有（none/180s/120s/60s）|
| 計分制度 | correctCount（+1/題）| correctCount | +10/+15/+20（依難度）|

### 9.2 B3 月曆模式 vs C3 拖曳兌換比較

| 特性 | B3 月曆拖曳（easy）| C3 換錢拖曳（全難度）|
|------|--------------------|---------------------|
| 拖曳目標 | 金錢圖示 → 撲滿 | 金錢圖示 → 兌換區 |
| 自動完成 | 全部放置後 500ms 自動完成 | 簡單：自動；普通/困難：需按確認 |
| 語音回饋 | 每放 1 枚播累計金額 | 每放 1 枚播累計金額 |
| 視覺提示 | 月曆格子 ✓ + 撲滿面額堆積 | 目標面額圖示淡化→亮起 |
| 難度分層 | 只有 easy 有此模式 | 三難度均可 |

### 9.3 B3 相對於其他系列的獨特貢獻

1. **時間序列模擬**：月曆模式是全 Money Tutor 唯一「模擬跨日積累」的設計，有別於 A/C/F 的單次任務。
2. **手動兌換系統**：`EXCHANGE_RULES` 6 條規則（如「10×1元→1×10元」），融合 C3 換錢概念，在存錢情境中自然教導面額兌換。
3. **雙模式並存**：同一單元同時支援「測驗模式」（週數計算，普通/困難）和「模擬模式」（月曆拖曳，簡單），是 B 系列中設計最複雜的單元。

### 9.4 B3 優化建議（2026-03-24 補充）

| 優先度 | 建議 | 參照 |
|--------|------|------|
| 高 | 計分升級：測驗模式答對週數差距計分（差0週+30/差1週+20），月曆模式每天存對+10 | F4/F5 差分計分 |
| 中 | ✅ 商品圖片擴充：已擴充至 20 件（2026-03-24 完成），新增美術套組/拼圖/桌遊/積木/數位相機/平板電腦 | B3 圖片系統 |
| 中 | 月曆模式加入「存錢進度聲音」：達到 25%/50%/75%/100% 時各播放不同音效 | C/F 音效系統 |
| 低 | 測驗模式加入可選計時（30/60秒/無限），提升挑戰感 | F4 計時模式 |
| 低 | 自訂物品系統升級：允許設定多個存錢目標（如「本週存蘋果，下週存書包」）| F3/F1 自訂主題 |

> **差分計分規格**：詳見 `report/B_Series_Unit_Completion_Report.md §五十九`（F4/F5 計時器 + 差分計分 → B 系列遊戲化升級）。

---

## 十、月曆模式完整語音設計（2026-03-25 第十四輪）

### 10.1 語音觸發清單（依流程順序）

| # | 觸發時機 | 語音文字 | 函數 |
|---|---------|---------|------|
| 1 | 彈窗顯示（存錢目標） | `存錢目標，{物品名稱}，需要 {金額} 元` | `_showCalendarTaskPopup` |
| 2 | 點擊「開始存錢！🐷」| `開始存錢` | `_showCalendarTaskPopup` click handler |
| 3 | 點擊日曆格（存錢圖示）| `{月}月{日}日，第{N}天` | `_handleDayClick` |
| 4 | 啟動拖曳後 | `今天可以存 {每日金額} 元` | `_startDragSession` |
| 5 | 拖放中途（非最後一枚）| `存入 {累計金額} 元` | `_handleCoinDrop` |
| 6 | 拖放最後一枚（語音完成後才下一步）| `存入 {累計金額} 元` → callback → `_completeDragSession` | `_handleCoinDrop` |
| 7 | 每次存完・達標 | `太棒了！存到 {目標金額} 了，可以買 {物品名稱} 了！` | `_completeDragSession` |
| 8 | 完成畫面 | `太棒了！你只用了 {天數} 天就存到了 {金額}，買到了 {物品名稱}！` | `_onCalendarGoalReached` |
| 9 | 兌換按鈕 | `{N}個{from}元換成1個{to}元` | `_handleExchange` |
| 10 | 語音重播鈕 | 重播 `c.lastSpeech`（最近一次語音）| `_bindCalendarEvents` |

> **注意**：原有「共存了 {累計金額}，還需要 {剩餘金額}」語音已於 2026-03-25 移除（視覺 UI 已提供足夠資訊，避免冗餘）。

### 10.2 重要設計決策

#### 最後拖放等語音完成再下一步（callback 驅動）
```javascript
// 修改前：固定 500ms timer
if (c.drag.placedCount >= c.drag.items.length) {
    Game.TimerManager.setTimeout(() => this._completeDragSession(), 500, 'turnTransition');
}

// 修改後：語音完成後才下一步
const isLast = c.drag.placedCount >= c.drag.items.length;
if (isLast) {
    Game.Speech.speak(`存入${toTWD(c.drag.placedAmount)}`, () => {
        this._completeDragSession();
    });
} else {
    Game.Speech.speak(`存入${toTWD(c.drag.placedAmount)}`);
}
```
**教學意義**：確保學生聽到完整金額語音後才看到存款結果，避免語音被下一步動畫打斷。

#### 日期語音（×月×日，第×天）
```javascript
_handleDayClick(day) {
    const month = c.startDate.getMonth() + 1;
    const dayNum = c.clickedDays + 1; // 點擊時尚未遞增
    Game.Speech.speak(`${month}月${day}日，第${dayNum}天`);
    this._startDragSession(day);
}
```
**教學意義**：讓學生意識到「今天是哪天、這是第幾次存錢」，強化日期概念與習慣計數。

#### 彈窗標題修正
- 修改前：`🎯 今天的存錢目標`
- 修改後：`🎯 存錢目標`
- **原因**：月曆模式可能跨多天，「今天」不精確；直接說「存錢目標」更通用。

### 10.3 商品資料庫修正（2026-03-25）

| 修正項目 | 修改前 | 修改後 | 原因 |
|---------|--------|--------|------|
| 200 元商品名稱 | 美術套組（🎨）| 食譜書（📖）| `icon-b3-art-set.png` 圖片實為食譜書 |
| 200 元商品 icon | `🎨` | `📖` | 同上 |
| 280 元商品名稱 | 食譜書（📖）| 兒童繪本（📕）| 避免重名；原圖片 `icon-b3-recipe-book.png` 不存在 |
| 280 元商品 icon | `📖` | `📕` | 同上 |

### 10.4 撲滿金幣顯示修正（2026-03-25）

移除 `renderRow` 的 `MAX_SHOW = 10` 硬上限：

```javascript
// 修改前：最多顯示 10 枚，超出顯示 "+N"
const MAX_SHOW = 10;
const shown = Math.min(count, MAX_SHOW);
if (count > MAX_SHOW) imgs += `<span class="b3-pig-denom-overflow">+${count - MAX_SHOW}</span>`;

// 修改後：有幾枚顯示幾枚
for (let i = 0; i < count; i++) {
    imgs += `<span ...><img ...></span>`;
}
```

**原因**：當 10 元硬幣累積超過 10 枚（未兌換時）顯示「10元 ×11」但只渲染 10 個圖示 +「+1」文字，視覺與標籤不一致。

**搜尋關鍵字**：`renderRow`, `MAX_SHOW`, `b3-pig-img-wrap`

---

## 十一、觸控與桌面支援（2026-03-27 補充）

### 11.1 拖曳與觸控互動

B3 月曆模式同時使用 HTML5 DnD（桌面）與 `TouchDragUtility`（行動），是 B 系列中觸控支援最完整的單元。

| 功能 | 桌面（HTML5 DnD）| 行動（TouchDragUtility）|
|------|-----------------|-------------------------|
| 拖曳金幣 | `dragstart` / `drop` | `touchstart` / `touchmove` / `touchend` |
| 放入日曆格 | `dragover` / `drop` | 落點偵測 `elementFromPoint` |
| 放入撲滿 drop zone | 同上 | 同上 |
| 來源卡片金幣 | 點擊或拖曳 | 點擊或拖曳 |
| 移除已放金幣 | 無（放入即確認）| 無 |

**B3 觸控特殊設計**：
- `_initCalendarDragAndDrop`：同時初始化桌面 DnD 和 `TouchDragUtility`
- `TouchDragUtility.cleanupAll()` 在每題重新開始前呼叫，防止舊監聽殘留
- 金幣落入正確 drop zone：`_handleCoinDrop` 驗證 `data-denom` 屬性
- 金幣落入錯誤位置：`.b3-drop-wrong` 閃紅 300ms，不計分

### 11.2 月曆格子觸控體驗

```css
/* 月曆格子觸控區域放大 */
.b3-cal-day {
    min-height: 52px;       /* 超過 44px 觸控最小標準 */
    touch-action: auto;     /* 允許滾動（月曆可能超出螢幕）*/
}

/* 拖曳中的金幣幽靈 */
.b3-drag-coin {
    cursor: grabbing;
    pointer-events: none;   /* 避免干擾 drop zone 偵測 */
    opacity: 0.9;
    transform: scale(1.1) rotate(-5deg);
}
```

### 11.3 響應式設計斷點

| 斷點 | ≥ 768px（平板 / 桌面）| < 768px（手機）|
|------|-----------------------|----------------|
| 主版面 `.b3-cal-layout` | `flex-direction: row`（月曆 + 撲滿並排）| `flex-direction: column` |
| 月曆格子 | `52px × 52px` | `40px × 40px` |
| 撲滿卡片 `.b3-pig-card` | 固定 `160px` 右欄 | 全寬展開 |
| 面額圖示 | `55px`（硬幣）/ `90px`（紙鈔）| `44px` / `72px`（縮小）|
| 每日金幣來源卡 | 橫排展開 | 換行 2 枚一列 |

### 11.4 跨裝置測試重點

- **iOS Safari**：`TouchDragUtility` 的 `elementFromPoint` 在 scroll 容器內需調整座標（已修正）
- **Android**：`dragstart` 的 `setDragImage` 不支援自訂圖片，改用 CSS 幽靈元素
- **平板直向**：月曆 7×5 格（35 格）在 `480px` 以下需確認橫向不截斷

---

## 十二、版面設計（RWD）（2026-03-27 補充）

### 12.1 月曆模式版面結構

```
┌──────────────────────────────────────────────────────┐
│  標題列（.title-bar）               [獎勵🎁][設定🔧] │
│  第 N/M 題                                            │
├──────────────────────────────────────────────────────┤
│  ┌──────────────────────────┐  ┌──────────────────┐  │
│  │  🐷 月曆（.b3-cal-center）│  │  🐷 我的撲滿     │  │
│  │  ┌────────────────────┐  │  │  （.b3-pig-card）│  │
│  │  │  進度資訊卡         │  │  │  ┌────────────┐ │  │
│  │  │  目標：XXX 元       │  │  │  │ 存入金錢區  │ │  │
│  │  │  已存：YYY 元 ZZ%  │  │  │  │ (drop zone) │ │  │
│  │  └────────────────────┘  │  │  └────────────┘ │  │
│  │  ┌────────────────────┐  │  │  面額統計表     │  │
│  │  │  月曆主體（7×5）   │  │  │  [🪙1元 ×3]    │  │
│  │  │  週一~週日 格子     │  │  │  [🪙5元 ×2]    │  │
│  │  │  ✅ 已存格          │  │  │  [💵100元×1]  │  │
│  │  │  🐷 存錢格（點擊）  │  │  │  [🔄 兌換鈕]  │  │
│  │  └────────────────────┘  │  └──────────────────┘  │
│  └──────────────────────────┘                        │
│  ┌──────────────────────────────────────────────┐    │
│  │  今日可存金幣來源（拖曳源）                    │    │
│  │  [🪙10元] [🪙50元] [💵100元]（依題目金額）  │    │
│  └──────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────┘
```

### 12.2 測驗模式 vs 月曆模式版面差異

| 版面元素 | quiz 測驗模式 | calendar 月曆模式 |
|----------|--------------|------------------|
| 主容器 | `.b3-quiz-container` | `.b3-cal-layout` |
| 題目展示 | 商品圖示 + 售價 + 週存金額 | 月曆格子 + 撲滿 |
| 答題互動 | 選項按鈕 / 數字鍵盤 | 拖曳金幣到月曆格 |
| 進度追蹤 | 題數計數 | 月曆完成格數 + 百分比 |
| 設定項目 | 難度 / 題數 / 物品類型 | 難度 / 存錢金額 / 物品金額區間 |

### 12.3 CSS 主要類別（月曆模式）

| 類別 | 說明 |
|------|------|
| `.b3-cal-layout` | 雙欄 flex 容器 |
| `.b3-cal-center-col` | 月曆主欄（flex:1）|
| `.b3-cal-info-card` | 進度資訊卡（目標 + 進度條）|
| `.b3-cal-grid` | 7×5 月曆格子（CSS Grid）|
| `.b3-cal-day.b3-cal-can-save` | 可存錢的格子 |
| `.b3-cal-day.b3-cal-done` | 已完成格子（✅）|
| `.b3-pig-card` | 撲滿右欄（160px 固定寬）|
| `.b3-pig-drop-zone` | 撲滿存入區（拖曳目標）|
| `.b3-pig-row` | 面額統計行（圖示 + 數量）|
| `.b3-pig-exch-btn` | 兌換按鈕（達閾值才顯示）|
| `.b3-drag-coin` | 拖曳中金幣幽靈 |
| `.b3-drop-slot` | 日曆格放置槽 |


## 十三、週數預覽方塊（Round 21，2026-03-28）

### 13.1 功能說明

quiz 模式（存錢計畫）在學生選擇答案或輸入數字時，立即在選項區上方顯示對應週數的小方塊矩陣：

- 每個方塊代表一週（灰色 = 未確認，綠色 = 正確答案）
- 最多顯示 16 個方塊，超出時顯示 `+N` 溢出標籤
- 動畫：`b3BlockPop`（每格 60ms stagger 延遲），視覺化「數數」效果

### 13.2 實作

```javascript
_updateWeekPreview(n, question) {
    const preview = document.getElementById('b3-week-preview');
    const cap = Math.min(n, 16);
    const isCorrect = n === question.answer;
    // 渲染 cap 個方塊 + 溢出標籤 + 週數文字
}
```

**觸發時機**：
- 簡單模式（choice）：點選選項按鈕時（選擇後 → `_handleChoiceAnswer` 前）
- 數字鍵盤模式：每次輸入有效數字後更新（不等待確認）

### 13.3 CSS

`.b3-week-block`：20×20px 圓角方塊，灰底；`.correct`：10b981 綠色；`b3BlockPop`：scale(0.3)→(1) 彈跳；stagger 60ms/格，16 格共 960ms 完全展開。

### 13.4 設計參考

F5「量比較」視覺化比例條 — 將抽象數字轉為視覺元素，強化學生對「幾週才夠存到」的直覺感受。

---

## 十四、教學設計詳析（參照 F/C/A 格式，2026-03-29）

### 14.1 教學定位與學習目標

**核心定位**：B3 是 B 系列中唯一採用「雙模式設計」的單元，簡單模式以月曆拖曳模擬「每天存一點」的過程感受，普通/困難模式以除法計算「幾週才夠買」的數學能力。兩種模式服務不同認知層次的學生。

**學習目標層次**：
1. **知識層（月曆模式）**：理解「積少成多」的存錢概念，認識不同面額
2. **技能層（測驗模式）**：執行除法並應用無條件進位
3. **應用層（兩者）**：規劃達成目標所需的時間與行動

**與其他單元的銜接**：
- 前置：C1~C3（面額認知）→ F6（除法概念）
- 後續：B5（預算限制決策）

### 14.2 測驗內容設計

**月曆模式設計理念**：
- 以「真實感」模擬存錢行為，每個月曆格代表一天，學生逐日存入
- 撲滿視覺化累積，兌換系統延伸 C3 換錢知識
- 里程碑徽章（25/50/75%）提供分段正增強，防止挫折感

**測驗模式設計理念**：
- 選用學生熟悉的真實商品（含圖片）強化目標感
- 3 種價格區間對應 3 種難度，難度標誌清晰
- 週數預覽方塊讓抽象除法結果「視覺化」

**題目公平性設計**：
- 普通模式：選項設計使正確答案不相鄰（防猜測）
- 困難模式：數字鍵盤輸入，無選項提示
- 商品價格與週存金額設計確保整除或接近整除（避免過大餘數造成混淆）

### 14.3 互動方式詳析

**月曆拖曳（簡單模式）**：
```
點擊月曆格 → 啟動拖曳會話（顯示當日可存金額面額）
→ 拖曳面額圖示到月曆格（HTML5 DnD + TouchDragUtility）
→ 面額比對正確 → 勾勾動畫 + 撲滿累計
→ 達到目標 → 煙火完成
```

**測驗計算（普通/困難）**：
```
顯示目標商品 + 售價 + 每週存款金額
→ 選擇/輸入「需要幾週」
→ 系統驗證（⌈售價 ÷ 週存⌉）
→ 答對：更新週數預覽（綠色）+ 語音「每週存X元，需要Y週，就能買Z了！」
→ 答錯：顯示除法提示（「X元 ÷ Y元/週 ≈ Z週（無條件進位）」）
```

### 14.4 語音系統設計

**月曆模式語音**：每次存入面額播報「[面額]元」，完成時「太棒了！達成目標！存了[總金額]元！」

**測驗模式開題語音**：「存錢目標：[商品名]，[售價]元」（搭配目標彈窗）

**答對語音**（B3 特色設計）：「每週存[週存]元，需要[答案]週，就能買[商品名]了！」→ 強化除法與目標的因果連結

**里程碑語音**：「棒！已存了四分之一！」/ 「太好了！一半了！」/ 「快到了！四分之三！」

---

## 十五、目標類別篩選（2026-03-29）

### 15.1 類別設計

| 類別 ID | 中文名稱 | 代表商品 |
|---------|---------|---------|
| `toy` | 玩具遊戲 | 拼圖、機器人、桌遊 |
| `book` | 書籍學習 | 食譜書、故事書套組、繪本 |
| `outdoor` | 戶外活動 | 望遠鏡、滑板車、帳篷 |
| `tech` | 科技用品 | 科學實驗組、音響、電子書閱讀器 |

設定頁困難模式顯示「🗂️ 目標類別」5 選項（含「全部」）。`itemCat: 'all'` 為預設值（非必選）。題庫少於 2 項時自動 fallback 至全部。

---

## 十六、輔助點擊模式（AssistClick，2026-03-29）

B3 AssistClick 僅在**困難模式 quiz 週數計算**中啟用（easy 月曆模式不適用）：

| 作答方式 | 策略 |
|---------|------|
| 普通（三選一）| 高亮正確選項按鈕 |
| 困難（數字鍵盤）| 逐位數（`digit buttons`）→ `ok` 按鈕 |

---

## 十七、Rounds 26–39 豐富化紀錄

### 17.1 月曆倒數提示（Round 29）

`_completeDragSession` else 分支加語音「還差 X 元，再存 Y 天就達標了！」，`_showCountdownHint(remaining, daysLeft)` 底部浮動卡顯示剩餘金額 + 天數，`b3CdIn` 動畫。

### 17.2 月曆距完成天數（Round 29）

月曆 info card 新增「距完成 N 天」，`_updateCalendarUI` 同步更新 `#b3-days-left`；≤3 天時 `.near` class + `b3DlPulse` 脈動。

### 17.3 存錢目標開題彈窗（2026-03-26）

`_showSavingsGoalModal(question)`：顯示物品圖示 / 名稱 / 價格，2.5 秒自動關閉，語音「存錢目標：{名稱}，{價格}元」。

### 17.4 進度環（Round 30）

`_renderPiggyBankCard` 加 `b3-progress-ring`（conic-gradient 圓弧），`_updateCalendarUI` 同步更新 deg。CSS：`.b3-progress-ring/.inner`。

### 17.5 最佳存法提示（Round 31）

`_handleNumpadAnswer` 答錯加 `_showBestSavingHint(question)`，顯示三種存法對比：
- 半量存法（slow，灰）
- 正確答案（correct，綠）
- 雙量存法（fast，藍）

CSS：`.b3-best-hint`、`.b3-bh-*`。

### 17.6 里程碑語音（Round 35）

`_showMilestoneBadge` 加 `audio.play('correct')` + `Game.Speech.speak` 里程碑語音（「存到一半了！加油！」/ 「快到了！」/ 「達標！」）。

### 17.7 存錢粒子（Round 38）

`_completeDragSession` 後呼叫 `_showSavingsSparkle()`，5 顆 ✨💫⭐🌟💰 從撲滿上方飛散（`b3SparkleUp` 1.2s）。

### 17.8 月曆預估達標日（Round 37）

`_updateCalendarUI` 計算剩餘存款節奏，`#b3-est-date` 顯示「預計 M/D 達標」或「🎉 達標！」。

### 17.9 週剩餘標籤（Round 39）

`_updateWeekPreview` 末尾加 `.b3-week-rem` 標籤：
- 「還差 X 元」（黃色）
- 「🎉 足夠！」（綠色）

### 17.10 配速預覽（Round 34）

`_renderChoicesHTML` 每個選項按鈕下方加 `b3-choice-pace` 顯示「每週 X 元 × Y 週 = Z 元」，幫助學生理解週存計劃的乘法意義。

---

## 十八、完成畫面豐富化

### 18.1 存錢目標清單（2026-03-26）

`state.quiz.achievedGoals[]`，答對時 `push({item, weekly, answer})`，完成畫面第二頁渲染 `.b3-res-goals` 卡片列（icon + 名稱 + 售價 + 每週×週數）。

### 18.2 存錢統計摘要（2026-03-27）

從 `achievedGoals` 派生計算：
- 目標數量
- 合計金額
- 平均週數

CSS：`.b3-goal-summary`、`.b3-gs-item`、`.b3-gs-val`。

### 18.3 平均每週存款統計（Round 29）

`b3-goal-summary` 新增第 4 格「平均每週存款 X 元」（黃色高亮），`.b3-gs-item.highlight` CSS。

### 18.4 里程碑徽章 CSS

`.b3-streak-badge`、`b3SbPop` — 連勝 3/5 題彈跳動畫，橘金色漸層背景。


## 十九、週存視覺模擬積木（2026-03-30）

### 背景

F4 排序積木動畫（`b4BlockPop`）與 C2 逐一計數動畫（每格延遲出現）已廣泛用於 A/C/F 系列。B3 的除法提示（`_showDivisionHint`）顯示文字公式時，學生仍難以感受「每週存一次」的時間跨度。

### 實作

在 `_showDivisionHint(question)` 原有文字公式下方，追加 `.b3-wsim` 視覺積木列：

- 最多顯示 8 個 `.b3-wsim-block`
- 每個積木顯示「第 N 週」+ 累計金額（`question.weekly * (i+1)`）
- 每塊 `animation-delay: i * 90ms`，使用 `b3WsimPop`（`scale(0.5)→scale(1.1)→scale(1)`）
- 超過 8 週時，顯示 `.b3-wsim-more`「… 共 N 週」溢出徽章

### CSS 類別

| 類別 | 用途 |
|------|------|
| `.b3-wsim` | 容器（上方 8px margin，fade-in） |
| `.b3-wsim-title` | 標題「📅 每週存款模擬」 |
| `.b3-wsim-blocks` | 積木 flexbox 容器 |
| `@keyframes b3WsimPop` | `scale(0.5)→scale(1.1)→scale(1)` |
| `.b3-wsim-block` | 單週積木（藍色漸層，圓角，stagger delay） |
| `.b3-wsim-week` | 「第N週」標籤（細白字） |
| `.b3-wsim-acc` | 累計金額（粗白字） |
| `.b3-wsim-more` | 溢出徽章（橙色，`+X 週`）|

### 教學設計

- 遵循 **F4 積木排序 + C2 逐一計數** double pattern
- 積木數量對應週數，讓「需要幾週」變成可數的視覺單位
- 累計金額顯示強化「每週累加」的概念
- 上限 8 格防止畫面過長，超出部分以溢出徽章標示

---

## 二十、輔助點擊設定頁修正（2026-03-31）

### 背景

B3 的「🤖 輔助點擊」選項原置於困難模式專屬設定區（`class="b3-hard-settings"`），選「困難」難度時才顯示。然而輔助點擊的設計初衷是為需要引導的學習者降低操作門檻，困難模式學生恰好相反，反而不需要此輔助。B1 的規範是「選簡單模式才顯示」，B3 與其不一致，本次修正對齊 B1 行為。

### 修正對照

| 項目 | 修改前 | 修改後 |
|------|--------|--------|
| 顯示時機 | 選「困難」才出現 | 選「簡單」才出現 |
| 群組位置 | 困難模式設定區底部 | 難度選擇正下方（同 B1） |
| HTML class | `b3-hard-settings` | `id="assist-click-group"` |
| 切換其他難度 | 不重置 clickMode | 自動重置為 `'off'` |
| clickMode 預設值 | `null` | `'off'` |
| `_checkCanStart` 困難模式 | 需要 `!s.clickMode` | 移除此守衛 |

### 實作

難度事件處理器新增 show/hide 邏輯：

```javascript
const assistGroup = document.getElementById('assist-click-group');
if (diff === 'easy') {
    if (assistGroup) assistGroup.style.display = '';
} else {
    if (assistGroup) assistGroup.style.display = 'none';
    this.state.settings.clickMode = 'off';
    document.querySelectorAll('#assist-group .b-sel-btn')
        .forEach(b => b.classList.toggle('active', b.dataset.assist === 'off'));
}
```

HTML 結構改變：

```html
<!-- 位置：難度選擇按鈕正下方（diff-desc 之後）-->
<div class="b-setting-group" id="assist-click-group" style="display:none;">
    <label class="b-setting-label">🤖 輔助點擊</label>
    <div class="b-btn-group" id="assist-group">
        <button class="b-sel-btn" data-assist="on">✓ 啟用</button>
        <button class="b-sel-btn active" data-assist="off">✗ 停用</button>
    </div>
</div>
```

### 修復搜尋關鍵字

`assist-click-group`、`clickMode: 'off'`、`dataset.assist`

### 教學設計

輔助點擊適合「需要多一點引導」的學習者，而簡單模式正是針對這群學生設計的（月曆拖曳存錢，每日小額累積，視覺化即時回饋）。困難模式（週數計算 quiz）的學生已具備計算能力，不需要自動輔助。此修正確保輔助點擊顯示邏輯在 B 系列全系列一致。


---

## 二十一、簡單模式選項擴充4個 + 結構化干擾項（2026-03-31，Round 42）

### 背景

B3 簡單模式原本只提供 3 個選項，干擾項完全隨機（±1~4 週）。這導致干擾項可能「太遠」（學生一眼就排除）或「沒有針對性」（無法讓學生理解錯誤類型）。參照 **C1 adaptive pool pattern**，擴充到 4 個選項並設計針對特定計算錯誤類型的干擾項。

### 技術實作

**JS 修改**（`_generateChoices`）：

```javascript
_generateChoices(correct) {
    // 4選項 + 結構化干擾項（C1 adaptive pool pattern，Round 42）
    const structured = [
        Math.max(1, correct - 1),               // 忘記進位（最常見錯誤）
        correct + 1,                            // 多算1週
        Math.max(2, Math.ceil(correct * 0.6)), // 估算不足
        correct + 2,                            // 寬鬆估算
    ];
    const opts = new Set([correct]);
    for (const c of structured) {
        if (opts.size >= 4) break;
        if (c > 0 && c !== correct) opts.add(c);
    }
    // 不足4個時隨機補足
    let attempts = 0;
    while (opts.size < 4 && attempts < 60) {
        attempts++;
        const delta = Math.floor(Math.random() * 4) + 1;
        const candidate = Math.random() < 0.5 ? correct + delta : Math.max(1, correct - delta);
        if (candidate > 0 && candidate !== correct) opts.add(candidate);
    }
    return Array.from(opts).sort(() => Math.random() - 0.5);
},
```

**CSS 新增**（`b3_savings_plan.css`）：

```css
.b3-choices-4 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    max-width: 600px;
    margin: 0 auto;
}
.b3-choices-4 .b3-choice-btn { width: 100%; }
```

**HTML 條件**（`_renderChoicesHTML`）：
```javascript
const gridClass = question.choices.length >= 4 ? 'b3-choices b3-choices-4' : 'b3-choices';
```

### 干擾項設計哲學

| 干擾項類型 | 計算方式 | 針對的錯誤 |
|-----------|---------|-----------|
| 少1週 | `correct - 1` | 忘記「無條件進位」（最常見）|
| 多1週 | `correct + 1` | 過度進位 |
| 低估 | `ceil(correct * 0.6)` | 粗略估算不足 |
| 高估 | `correct + 2` | 過度寬鬆估算 |

- 正確答案永遠由 `Math.ceil(price / weekly)` 決定，干擾項針對此計算的常見錯誤
- 若結構化干擾項與正確答案重複（如 correct=1 時 correct-1=0），自動跳過
- 遵循 **C1 選項池自適應** pattern：選項數由內容決定，不強制固定數量

### 搜尋關鍵字

- `_generateChoices`、`b3-choices-4`、`structured`、`C1 adaptive pool pattern`
