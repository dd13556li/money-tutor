# B3 存錢計畫 — 單元完成報告書

> **建立日期**：2026-03-24
> **更新日期**：2026-03-24（商品改圖片、語音修正）
> **更新日期**：2026-03-24（第二輪：補充圖片系統詳解、商品表修正「食譜書」、作業單題型、跨系列特色分析）
> **更新日期**：2026-03-24（第七輪：B3_ALL_ITEMS 擴充 14→20 件，easy 3→6 件，normal 11→15 件）
> **更新日期**：2026-03-25（第九輪：週數計算模式新增除法公式提示 `_showDivisionHint`）
> **更新日期**：2026-03-25（第十二輪：月曆模式進度里程碑徽章 `_showMilestoneBadge`，F2/A3 pattern）
> **專案名稱**：Money Tutor 金錢教學系統
> **單元編號**：B3 — 存錢計畫（Savings Plan）
> **系列**：B 預算規劃
> **報告類型**：單元完成報告（測驗內容 / 教學設計 / 技術規格）

---

## 一、檔案規模總覽

| 檔案 | 路徑 | 行數/版本 |
|------|------|---------|
| HTML | `html/b3_savings_plan.html` | — |
| JS | `js/b3_savings_plan.js` | ~1,400 行，v4.1（B 系列最大）|
| CSS（專用）| `css/b3_savings_plan.css` | ~650 行 |
| 作業單 | `worksheet/units/b3-worksheet.js` | 93 行 |
| 商品圖片 | `images/b3/icon-b3-*.png` | 14 張（2026-03-23 新增）；新增 6 張（2026-03-24）|

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

**20 種**生活化商品（2026-03-24 擴充，原 14 件），全部使用**真實圖片**（2026-03-23），emoji 作為 fallback：

| # | 商品名稱 | 價格 | 圖片檔案 | 難度篩選 |
|---|---------|------|---------|---------|
| 1 | 🎨 美術套組 | 200 元 | `icon-b3-art-set.png` | easy+ |
| 2 | 🧩 拼圖遊戲 | 250 元 | `icon-b3-puzzle.png` | easy+ |
| 3 | 📖 食譜書 | 280 元 | `icon-b3-recipe-book.png` | easy+ |
| 4 | 🤖 玩具機器人 | 300 元 | `icon-b3-robot-toy.png` | easy+ |
| 5 | 🔭 望遠鏡 | 350 元 | `icon-b3-telescope.png` | easy+ |
| 6 | 🎲 桌遊組 | 380 元 | `icon-b3-board-game.png` | easy+ |
| 7 | 🍳 烹飪玩具組 | 420 元 | `icon-b3-cooking-toy.png` | normal+ |
| 8 | 📚 故事書套組 | 450 元 | `icon-b3-story-books.png` | normal+ |
| 9 | 🔬 科學實驗組 | 480 元 | `icon-b3-science-kit.png` | normal+ |
| 10 | 🎡 遊樂園門票 | 500 元 | `icon-b3-amusement-ticket.png` | normal+ |
| 11 | 🎩 魔術道具組 | 550 元 | `icon-b3-magic-set.png` | normal+ |
| 12 | 🎂 生日蛋糕 | 600 元 | `icon-b3-birthday-cake.png` | normal+ |
| 13 | 🎵 音樂盒 | 650 元 | `icon-b3-music-box.png` | normal+ |
| 14 | 🧱 積木套組 | 700 元 | `icon-b3-lego-set.png` | normal+ |
| 15 | 👟 運動鞋 | 800 元 | `icon-b3-sneakers.png` | normal+ |
| 16 | 📷 數位相機 | 1,000 元 | `icon-b3-digital-camera.png` | hard |
| 17 | 🐠 水族箱 | 1,200 元 | `icon-b3-fish-tank.png` | hard |
| 18 | 🎮 電動遊戲機 | 1,500 元 | `icon-b3-game-console.png` | hard |
| 19 | 🚴 腳踏車 | 2,400 元 | `icon-b3-bicycle.png` | hard |
| 20 | 💻 平板電腦 | 3,500 元 | `icon-b3-tablet.png` | hard |

> **擴充說明（2026-03-24）**：新增 #1-2（easy 200/250），#6（easy 380），#14（normal 700），#16（hard 1000），#20（hard 3500）。Easy 池從 3 件→6 件，normal 從 11→15 件，hard 從 14→20 件。

### 2.4 難度篩選規則

```javascript
easy:   B3_ALL_ITEMS.filter(i => i.price <= 400)   // 6 件（2026-03-24 擴充，原 3 件）
normal: B3_ALL_ITEMS.filter(i => i.price <= 800)   // 15 件（原 11 件）
hard:   B3_ALL_ITEMS（全部）                        // 20 件（原 14 件）
```

月曆模式（easy）另依 `state.settings.priceRange` 篩選：

| priceRange 設定 | 上限 | 商品件數（更新後）|
|----------------|------|---------|
| 300 | 300 元 | 4 件（美術套組/拼圖遊戲/食譜書/玩具機器人）|
| 500 | 500 元 | 10 件 |
| 800 | 800 元 | 15 件 |

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

## 七、圖片系統詳解（2026-03-23 導入，2026-03-24 補充）

### 7.1 圖片資源一覽

| 圖片路徑 | 圖片來源 | 對應商品 | 複製依據 |
|---------|---------|---------|---------|
| `images/b3/icon-b3-art-set.png` | A4 食譜類圖片 | 食譜書（280元）| 價格相近：A4 食譜書 280元（完全一致）|
| `images/b3/icon-b3-robot-toy.png` | C6 機器人玩具 | 玩具機器人（300元）| C6 可用 |
| `images/b3/icon-b3-telescope.png` | A4 機器人玩具（350元）| 望遠鏡（350元）| 價格相近：350元 |
| `images/b3/icon-b3-cooking-toy.png` | A4 籃球（400元）| 烹飪玩具組（420元）| 價格相近：400元→420元（差20）|
| `images/b3/icon-b3-story-books.png` | C6 故事書套組 | 故事書套組（450元）| C6 可用 |
| `images/b3/icon-b3-science-kit.png` | A4 香水（400元）| 科學實驗組（480元）| 價格相近：400元→480元（差80）|
| `images/b3/icon-b3-amusement-ticket.png` | A4 牛仔褲（590元）| 遊樂園門票（500元）| 價格相近：590元→500元（差90）|
| `images/b3/icon-b3-magic-set.png` | C6 魔術道具組 | 魔術道具組（550元）| C6 可用 |
| `images/b3/icon-b3-birthday-cake.png` | C6 生日蛋糕 | 生日蛋糕（600元）| C6 可用 |
| `images/b3/icon-b3-music-box.png` | A4 羽毛球拍（600元）| 音樂盒（650元）| 價格相近：600元→650元（差50）|
| `images/b3/icon-b3-sneakers.png` | C6 籃球鞋 | 運動鞋（800元）| C6 可用 |
| `images/b3/icon-b3-fish-tank.png` | A4 慢跑鞋（1200元）| 水族箱（1200元）| 價格完全相同 |
| `images/b3/icon-b3-game-console.png` | A4 電動牙刷（1500元）| 電動遊戲機（1500元）| 價格完全相同 |
| `images/b3/icon-b3-bicycle.png` | C6 腳踏車 | 腳踏車（2400元）| C6 可用 |

> **圖片命名原則**：以 B3 商品識別碼命名（非圖片原名），確保語意清晰。

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
    if (item.img) {
        const fallback = item.icon || '🎁';
        return `<img src="../images/b3/${item.img}" alt="${item.name}"
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
