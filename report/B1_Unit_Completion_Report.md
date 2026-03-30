# B1 今天帶多少錢 — 單元完成報告書

> **建立日期**：2026-03-24
> **更新日期**：2026-03-25（第十輪：開題任務說明彈窗 `_showTaskModal`，C4 instruction modal pattern）
> **更新日期**：2026-03-25（第十一輪：困難模式隱藏個別費用 `_renderScheduleCard` isHard 分支，C1 audio-only pattern）
> **更新日期**：2026-03-25（第十三輪：放幣語音反饋 `addCoin` 80ms 延遲語音，F4/C1 coin recognition pattern）
> **更新日期**：2026-03-29（場景類別篩選 `cat` / `sceneCategory`，39 組題庫，5 種場景；輔助點擊 AssistClick）
> **更新日期**：2026-03-30（Rounds 29-39 豐富化：進度條/找零算式/路線條/面額摘要/投幣特效/場景色標完整記錄）
> **更新日期**：2026-03-31（Round 42：費用項目逐一語音播報 `_speakItemsOneByOne`，C2 逐項朗讀 pattern）
> **專案名稱**：Money Tutor 金錢教學系統
> **單元編號**：B1 — 今天帶多少錢（Daily Budget）
> **系列**：B 預算規劃
> **報告類型**：單元完成報告（測驗內容 / 教學設計 / 技術規格）

---

## 一、檔案規模總覽

| 檔案 | 路徑 | 行數/版本 |
|------|------|---------|
| HTML | `html/b1_daily_budget.html` | — |
| JS | `js/b1_daily_budget.js` | ~1,516 行，v3.8（2026-03-30）|
| CSS（專用）| `css/b1_daily_budget.css` | ~1,029 行（2026-03-30）|
| 作業單 | `worksheet/units/b1-worksheet.js` | 166 行 |

### CSS 載入順序
```
ai-theme.css → shared-game-base.css → b-series.css → b1_daily_budget.css
→ common-modal-responsive.css → dark-mode-simple.css
```

### JS 依賴
| 依賴 | 用途 |
|------|------|
| `touch-drag-utility.js` | 觸控拖曳支援 |
| `audio-unlocker.js` | 行動裝置音訊解鎖 |
| `theme-system.js` | 深色/淺色主題切換 |
| `reward-launcher.js` | 獎勵系統啟動器 |
| `number-speech-utils.js` | 中文貨幣語音轉換 |
| `confetti.browser.min.js` | 完成煙火動畫 |

---

## 二、單元特色

### 2.1 教學定位

B1 是 B 系列的**入門單元**，核心技能是「看情境、加總金額、選對錢幣」。
學習路徑：**認識面額（C 系列）→ 組合金額（B1）→ 計劃預算（B3/B5）**

### 2.2 情境驅動設計

每一題提供一個**生活行程**（如「去電影院」「買早餐」），附帶 2~4 項費用清單，學生需計算總金額並從錢幣盤中選取正確面額放入錢包。

情境設計原則：
- 取材自台灣學童日常生活（看電影、搭車、買文具等）
- 每項費用明確標示名稱與金額
- 困難模式隱藏總金額（`??? 元`），強迫自行加總

### 2.3 拖曳放置互動（2026-03-16）

| 互動方式 | 說明 |
|---------|------|
| 桌面 HTML5 DnD | `dragstart` / `drop` 事件，錢幣原件留在盤中（可無限拖取） |
| 行動裝置觸控 | `touch-drag-utility.js` 模擬拖曳 |
| 錢幣放置 | 拖入錢包區即加總，允許重複放入同面額 |
| 移除錢幣 | 點擊錢包中已放入的錢幣可移除 |

### 2.4 三種難度模式

| 模式 | 面額範圍 | 總金額顯示 | 提示機制 |
|------|---------|----------|---------|
| 簡單 | 1/5/10/50 元 | 顯示 | 不可用面額自動淡化（`.b1-coin-faded`）|
| 普通 | +100/500 元 | 顯示 | 答錯 3 次後自動高亮最佳組合 |
| 困難 | +1000 元 | ??? 元 | 提示按鈕（`#hint-btn`，手動觸發）|

### 2.5 最佳組合演算法（`_calcOptimalCoins`）

貪婪法（由大面額到小），計算達到目標的**最少枚數組合**，用於 hint 高亮與普通模式自動提示。

```javascript
// 示例：目標 85 元，可用面額 [50,10,5,1]
// 結果：50×1 + 10×3 + 5×1 = 5 枚（最少）
```

### 2.6 重試 / 繼續模式

| 模式 | 行為 |
|------|------|
| `retry`（預設）| 答錯後震動動畫 + 語音，學生自行補足，不跳題 |
| `proceed` | 答錯後語音說出正確答案，1600ms 後跳下一題 |

### 2.7 困難模式隱藏個別費用（`_renderScheduleCard` isHard 分支）—— 2026-03-25 新增

**靈感來源**：C1 困難模式「僅聽聲音辨識面額」設計 — 移除視覺提示，強迫學生依賴語音資訊。

在 B1 困難模式下，行程卡的**個別費用全部改顯示「??? 元」**（灰色斜體），學生必須：
1. 聆聽開題語音：「今天要去超市，需要準備牙刷、飲料、面紙，自己算好總金額！」
2. 記住各項費用
3. 自行加總後拖曳硬幣

| 難度 | 個別費用顯示 | 總金額顯示 |
|------|------------|---------|
| 簡單 | ✅ 顯示 | ✅ 顯示 |
| 普通 | ✅ 顯示 | ❌ 隱藏（??? 元）|
| 困難 | ❌ 隱藏（??? 元）| ❌ 隱藏（??? 元）|

**教學設計**：難度梯度清晰 — 從「全部可見（簡單）」→「總金額隱藏（普通）」→「全部隱藏（困難）」，訓練學生的心算能力逐步提升。

### 2.9 放幣語音反饋（`addCoin`）—— 2026-03-25 新增

每次將錢幣拖曳放入錢包後，在播放 coin.mp3 音效的同時，**80ms 後語音說出面額**（如「五十元」、「一百元」）。

**靈感來源**：
- **F4**：正確放置數字卡片後播放數字語音（即時語音確認放置行為）
- **C1**：認識錢幣單元以「聽聲音辨認錢幣」為核心教學目標

**教學效果**：
- 強化「硬幣/紙鈔視覺 → 面額語音」的多感官連結
- 幫助學習者邊拖放邊心算「這枚是幾元？」
- 困難模式尤其有效：費用欄顯示「???」，學生依賴語音確認放入金額

**技術細節**：
- `addCoin(denom)` 末尾加 `Game.TimerManager.setTimeout(() => Game.Speech.speak(\`${denom}元\`), 80, 'ui')`
- 80ms 延遲讓 coin.mp3 先播完，語音不互相覆蓋
- 使用 `'ui'` 計時器類別，切換題目時自動清除（不殘留未播語音）
- 觸控拖曳（`_setupTouchDrag`）與滑鼠拖曳（HTML5 DnD）皆觸發相同的 `addCoin()`，語音一致

---

### 2.8 開題任務說明彈窗（`_showTaskModal`）—— 2026-03-25 新增

每題載入後即顯示全屏半透明彈窗，告知學生本題任務，**2 秒後自動關閉**或點擊任意處關閉：

| 難度 | 金額顯示 | 教學意義 |
|------|---------|---------|
| 簡單 / 普通 | 黃色大字顯示目標金額 | 讓學生先建立心算基準 |
| 困難 | 顯示「？元」灰色 | 不提示金額，考驗自算 |

**靈感來源**：C4 `_showInstructionModal`（每題開始時全屏大字「目標金額 X 元」）。

**技術細節**：
- 彈窗附加至 `document.body`（確保覆蓋 app container）
- `TimerManager.setTimeout` 2000ms 自動移除
- 防重複：顯示前移除舊 `#b1-task-modal`
- CSS：`.b1-task-modal`（z-index 9000）、`.b1-task-amount`（f59e0b 黃）、`.b1-task-amount-q`（灰）

---

## 三、測驗設計詳解

### 3.1 題目生成邏輯

B1 題目**動態生成**，不固定題庫：
1. 依難度選取可用面額池
2. 隨機生成 1~3 項費用項目（費用在面額池範圍內）
3. 計算總費用作為目標金額
4. 渲染行程卡（情境名稱 + 費用清單）

### 3.2 情境類別（參考）

| 情境 | 費用項目示例 |
|------|------------|
| 看電影 | 票價、爆米花 |
| 買早餐 | 三明治、豆漿 |
| 搭公車 | 車票、零食 |
| 買文具 | 鉛筆、筆記本 |
| 去圖書館 | 零食、飲料 |
| 運動公園 | 入場費、冰淇淋 |

### 3.3 難度遞進設計（對照 C 系列多模態）

| 維度 | 簡單 | 普通 | 困難 |
|------|------|------|------|
| 面額種類 | 4 種（最小基礎）| 6 種 | 7 種（含千元） |
| 目標金額範圍 | 10~60 元 | 20~300 元 | 50~1500 元 |
| 視覺提示 | 不可用面額灰暗 | 無灰暗 | 無灰暗 |
| 自動提示 | 即時淡化 | 錯誤 3 次觸發 | 不自動，需按鈕 |
| 資訊完整性 | 完整顯示總金額 | 完整顯示總金額 | 隱藏總金額（???）|

### 3.4 語音引導設計

| 場景 | 語音模板 |
|------|---------|
| 進入題目（簡單）| 今天要去{行程名稱}，需要準備{費用項目}，共{total}元 |
| 進入題目（普通）| 今天要去{行程名稱}，需要準備{費用項目}，把錢幣放進錢包。|
| 進入題目（困難）| 今天要去{行程名稱}，需要準備{費用項目}，自己算好總金額！|
| 金額不足 | 還差{差額}元，請再放入錢幣 |
| 金額超出 | 放太多了！請移出一些錢幣 |
| 答對完成 | 帶對了！共{total}元，出發囉！|
| 提示觸發 | 最少需要{N}枚錢幣，最佳組合是… |

### 3.5 錯誤回饋機制

| 錯誤類型 | 視覺回饋 | 音效 | 語音 |
|---------|---------|------|------|
| 金額不足按確認 | 錢包區 b1Shake 震動 | error.mp3 | 「還差 X 元」|
| 金額超出按確認 | 錢包區 b1Shake 震動 | error.mp3 | 「放太多了！」|
| 普通模式 3 次錯 | 最佳面額高亮（黃色邊框）| — | 提示語音 |

---

## 四、語音系統

### 4.1 語音物件（`Game.Speech`）

```javascript
Game.Speech = {
    init()          // 初始化，優先選 Microsoft Yating / HsiaoChen
    speak(text, callback)  // 播報，結束後執行 callback
}
```

**語音優先順序**：
1. Microsoft Yating（台灣）
2. Microsoft HsiaoChen（台灣）
3. Google 國語（台灣）
4. 任何 zh-TW 語音
5. `voices[0]` 終極回退

### 4.2 金額語音轉換

使用 `convertToTraditionalCurrency()`（委派 `NumberSpeechUtils`）：

| 金額 | 語音 |
|------|------|
| 50 元 | 伍拾元 |
| 100 元 | 壹佰元 |
| 1000 元 | 壹仟元 |

困難模式「??? 元」不播報金額，僅播報行程名稱與費用項目。

---

## 五、作業單設計

### 5.1 題型總覽（參照 A1 十種題型格式）

| # | 題型名稱 | 說明 | 難度對應 |
|---|---------|------|---------|
| 1 | 費用加總（填空）| 給行程名稱 + 各費用項目，填寫總金額 | easy |
| 2 | 費用加總（三選一）| 給行程 + 費用，從三個金額選項中選正確 | easy |
| 3 | 看圖選幣組合 | 給目標金額，勾選正確的錢幣圖示組合 | normal |
| 4 | 看圖選幣（附提示）| 同上，附各面額「需幾枚」填空欄 | easy |
| 5 | 填幣數量表 | 給目標金額，填寫每種面額各需幾枚 | hard |
| 6 | 最少枚數推算 | 給目標金額 + 可用面額清單，計算最少枚數 | hard |

### 5.2 核心機制

| 機制 | 說明 |
|------|------|
| `defaultCount` | 20 題 |
| `_getSmartPayment()` | 智慧付款面額推算：依目標金額計算最佳面額組合，生成作業單選項 |
| `_selectDrinksWithUniquePrice()` | 確保每題目標金額不重複，提升練習多樣性 |
| 動態生成 | 作業單每次開啟均重新隨機生成，確保每份不同 |

---

## 六、RWD 版面

| 斷點 | 配置 |
|------|------|
| 桌面（>768px）| 左：行程卡；右：錢幣盤 + 錢包 |
| 手機（≤768px）| 上下堆疊 |

---

## 七、技術注意事項

- 錢幣盤原件（`.b1-coin`）作為**拖曳來源**，`dragstart` 記錄面額；放入錢包後渲染複製元素，不移除原件
- 確認按鈕（`#confirm-btn`）預設 `disabled`，僅在 `walletTotal === targetAmount` 時解鎖
- `_calcOptimalCoins()` 只在可用面額的子集內運算（依難度）
- 困難模式：`#wallet-goal-tag` 顯示「???元」，`state.targetAmount` 仍正確存在，僅視覺隱藏

---

## 八、跨系列特色分析（2026-03-24，參照 A1/C1/F1）

### 8.1 B1 vs A1 自動販賣機（同為「付款互動」類型）

| 特性 | B1 今天帶多少錢 | A1 自動販賣機 |
|------|--------------|------------|
| 付款互動 | 拖曳硬幣 → 錢包放置區 | 逐枚點選硬幣 → 投幣口 |
| 面額種類 | 7 種（依難度擴展）| 硬幣 9 種面額（正反面）|
| 付款目標 | 行程費用總額（計算型）| 商品固定售價（已知型）|
| 找零機制 | 無（學生放剛好的金額）| 有（系統計算並展示）|
| 自訂商品 | 無 | 有（魔法商品上傳）|
| 輔助點擊 | 無 | 有（完整 ClickMode）|
| 作業單題型 | 6 種 | 10 種 |

**B1 教學定位**：A1 是「操作型」付款（模擬真實機器），B1 是「計算型」付款（先算好再準備錢）。B1 更強調「事前規劃」，A1 更強調「現場操作」。

### 8.2 B1 vs C1 認識錢幣（同為「錢幣互動」類型）

| 特性 | B1 | C1 |
|------|----|----|
| 核心學習 | 面額組合達到目標金額 | 辨識錢幣面額 |
| 難度模態 | 計算複雜度（金額範圍/面額數）| 感知模態（視覺→文字→聽覺）|
| 互動方式 | 拖曳放置 | 點選答案 |
| 建議改進 | 可加入 C1 的聽覺模態（困難：只說費用，不顯示金額）| — |

### 8.3 B1 vs F1 一對一對應（同為「拖曳放置」類型）

| 特性 | B1 | F1 |
|------|----|----|
| 拖曳架構 | 自行實作（HTML5 DnD + Touch Events）| `TouchDragUtility` |
| 點擊放置 | 錢包中的硬幣可點擊移除（反向操作）| 點擊→選取→點擊目標格 |
| 來源元素 | 拖曳後原件保留（無限次使用）| 拖曳後原件移除 |
| ModeConfig | 無（if-else）| 完整 ModeConfig（15+ 欄位）|

### 8.4 優化建議（基於跨系列分析）

| 優先度 | 建議 | 參照 |
|--------|------|------|
| 中 | 引入 `TouchDragUtility` 取代自實作觸控拖曳，提升跨平台一致性 | F1 |
| 中 | 加入「聽覺挑戰」子模式（困難+：費用只用語音播報不顯示）| C1 困難模式 |
| 中 | 普通模式提示升級：錯誤 3 次後在錢包區顯示**鬼影硬幣**（淡化 + 虛線邊框），標示應放面額與數量（取代閃爍高亮）| C4 鬼影佔位 |
| 低 | 導入 `B1_MODE_CONFIG` 配置驅動（見 B_Series_Unit_Completion_Report §52.2）| F1 ModeConfig |
| 低 | 加入魔法行程（自訂行程情境上傳）| A1 魔法商品 |

> **鬼影提示設計規格**：詳見 `report/B_Series_Unit_Completion_Report.md §五十四`（C4 鬼影佔位提示 → B1 視覺輔助設計）。

---

## 九、觸控與桌面支援（2026-03-27 補充）

### 9.1 拖曳與觸控互動

B1 採用自行實作的 HTML5 Drag-and-Drop 與 Touch Events，無依賴 `TouchDragUtility`（B6 引入，B1 尚未升級）。

| 功能 | 桌面（HTML5 DnD）| 行動（Touch Events）|
|------|-----------------|---------------------|
| 拖曳硬幣 | `dragstart` / `dragend` | `touchstart` / `touchmove` / `touchend` |
| 放入錢包 | `dragover` / `drop` | 手動計算落點座標 |
| 從錢包移除 | 點擊 `.b1-coin-used` | 點擊同一元素 |
| 防快速連點 | 無（拖曳性質較慢）| 無 |

**拖曳視覺反饋**：
- 拖曳中：`opacity: 0.5` + `cursor: grabbing`
- 錢包 dragover：`.b1-wallet-drop.dragover { border-color: #4CAF50; background: #e8f5e9; }`
- 放置成功：硬幣圖示 + 面額文字加入 `.b1-coins-used` 列表

### 9.2 觸控事件處理

```javascript
// 拖曳開始時播放面額語音（B1 特有）
addCoin(denom) {
    // ...放入錢包邏輯...
    TimerManager.setTimeout(() => Speech.speak(`${denom}元`), 80, 'ui');
}
```

**行動裝置最佳化**：
- `touch-action: none` 施加於可拖曳硬幣元素，防止瀏覽器原生滾動干擾
- `user-select: none` 防止長按選字
- `audio-unlocker.js` 首次觸控後解鎖 AudioContext

### 9.3 響應式設計斷點

| 斷點 | ≥ 768px（平板 / 桌面）| < 768px（手機）|
|------|-----------------------|----------------|
| 行程卡 | 兩欄並排（行程 + 費用項目）| 單欄堆疊 |
| 錢包 drop zone | 橫向展開（flex-wrap）| 換行（2~3 枚一列）|
| 硬幣來源區 | 橫排（7 種面額）| 換行 |
| 字體大小 | `1.2em` | `1em`（自動縮減）|

**B1 已有 `六、RWD 版面`**：該章節記錄 CSS Grid 斷點細節，本節補充互動層面。

### 9.4 跨裝置測試重點

- **iOS Safari**：Audio 必須在使用者手勢後解鎖；拖曳結束後 `touchend` 事件需手動觸發 `drop` 邏輯
- **Android Chrome**：`dragover` 的 `preventDefault()` 必須在 `passive: false` 模式下呼叫
- **Edge / Firefox**：`dataTransfer.setData` 若未設定會導致拖曳失敗；B1 已用空字串填充
- **平板直向**：行程卡費用項目超過 5 項時需確認不溢出 viewport

---

## 十、版面設計（RWD）（2026-03-27 補充）

> **注意**：B1 已有 `六、RWD 版面` 記錄 CSS Grid 斷點細節，本章補充遊戲版面整體結構與模式差異。

### 10.1 遊戲版面結構

```
┌──────────────────────────────────────────────────────┐
│  標題列（.title-bar）                  [獎勵🎁][返回⬅]│
│  第 N/M 題 | 已答對 X 題              [設定🔧][題數]  │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────────────────────────────────────┐    │
│  │  📋 今天的行程（.b1-schedule-card）          │    │
│  │  ┌────────────┐  ┌──────────────────────┐   │    │
│  │  │  行程名稱   │  │  費用項目列表         │   │    │
│  │  │  + emoji   │  │  item1: ??? 元       │   │    │
│  │  │            │  │  item2: ??? 元       │   │    │
│  │  └────────────┘  └──────────────────────┘   │    │
│  │  合計：XXX 元 需要準備的錢                    │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
│  ┌──────────────────────────────────────────────┐    │
│  │  💰 我的錢包（.b1-wallet-section）            │    │
│  │  ┌──────────────┐  → drop zone （已放入）    │    │
│  │  │ 已放：XXX 元  │  [1元][5元][10元][50元]  │    │
│  │  │ 目標：XXX 元  │  每枚可點擊移除           │    │
│  │  └──────────────┘                            │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
│  ┌──────────────────────────────────────────────┐    │
│  │  🪙 選擇硬幣（.b1-coins-source）              │    │
│  │  [1元] [5元] [10元] [50元] [100元] [500元]   │    │
│  │  [1000元]  ← 依難度開放面額                  │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
│  [💡 提示]  [✅ 確認]                              │
└──────────────────────────────────────────────────────┘
```

### 10.2 三種難度模式版面差異

| 版面元素 | 簡單（easy）| 普通（normal）| 困難（hard）|
|----------|------------|---------------|------------|
| 行程費用 | 顯示各項金額 | 顯示各項金額 | `??? 元`（隱藏各項）|
| 合計金額 | 顯示 | 顯示 | 顯示 |
| 硬幣面額 | 1/5/10/50 | 1/5/10/50/100 | 全 7 種 |
| 任務彈窗 | 開題顯示 2s | 開題顯示 2s | 開題顯示 2s |
| 提示鈕 | 顯示（可求助）| 顯示（可求助）| 隱藏 |
| 錯誤 3 次 | 自動提示 | 自動提示 | 無自動提示 |

### 10.3 RWD 斷點（補充 `css/b1_daily_budget.css`）

| CSS 類別 | 桌面 | 手機 |
|----------|------|------|
| `.b1-schedule-card` | `max-width: 640px; margin: auto` | `width: 100%; padding: 12px` |
| `.b1-wallet-section` | `flex-direction: row` | `flex-direction: column` |
| `.b1-coins-source` | `flex-wrap: wrap; gap: 12px` | `gap: 8px` |
| `.b1-coin-btn` | `64px × 64px` | `52px × 52px` |


---

## 十一、最少張數提示（Round 25，2026-03-28）

### 11.1 設計動機

參照 C4/C6「最佳付款」概念：學生答對後若使用的張數超過理論最小值，顯示教育性 toast，引導反思「有沒有更省的組合？」。

### 11.2 實作

```javascript
_showMinCoinsHint(walletTotal, requiredTotal) {
    const used    = this.state.wallet.length;           // 實際使用張/枚數
    const denoms  = DENOM_BY_DIFF[difficulty];
    const optimal = this._calcOptimalCoins(requiredTotal, denoms); // 貪婪最優
    const minCount = optimal.length;
    if (used <= minCount) return; // 已達最佳，不顯示
    // 顯示橘色底部 toast
}
```

- 呼叫點：`handleConfirm` 答對分支，`correctCount++` 之後立即呼叫
- 使用已有的 `_calcOptimalCoins(amount, denoms)` 貪婪函數
- `walletTotal` 可能 ≥ `requiredTotal`（有找零情況），但最少張數仍依 `requiredTotal` 計算
- Toast 持續 1800ms 後淡出，不干擾 1400ms 後的 `nextQuestion` 流程

### 11.3 視覺設計

```
💡 你用了 5 張，其實最少只需要 3 張！
```

- 位置：`position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%)`
- 背景：橘色漸層（`#92400e → #d97706`）
- 動畫：`b1ToastUp`（與 exact toast 共用，從下方彈入）
- z-index：9900（不覆蓋 modal）

### 11.4 CSS

```css
.b1-min-coins-toast {
    position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
    background: linear-gradient(135deg, #92400e, #d97706);
    color: white; font-size: 16px; font-weight: 600;
    padding: 11px 24px; border-radius: 40px;
    animation: b1ToastUp 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
}
```

---

## 十二、連勝徽章與費用明細提示（Round 20，2026-03-28）

### 12.1 連勝徽章（B3 streak pattern）

- `state.quiz.streak` 計數，答對 +1，答錯清零
- 達 3 連勝：置中彈出 `🔥 3連勝！繼續加油！` + 語音
- 達 5 連勝：`⚡ 5連勝！太厲害了！` + 語音
- CSS：`.b1-streak-badge / .b1-sb-inner / b1SbPop`（橘金漸層，固定置中，1.6s 後淡出）

### 12.2 費用明細提示（B2 breakdown pattern）

答錯後顯示行程費用明細，幫助學生理解各項成本：

| 模式 | 觸發時機 |
|------|----------|
| 困難（hard）| 每次答錯後 400ms 顯示 |
| 普通（normal）| 第 3 次答錯後 900ms 顯示（與硬幣提示同時）|
| 簡單（easy）| 不顯示（費用已見）|

```html
<!-- 費用明細卡範例 -->
💡 費用明細
📌 午餐費  60 元
📌 公車費  20 元
合計 80 元
```

CSS：`.b1-breakdown`（黃框）、`.b1-bd-row`、`.b1-bd-total`、`b1FadeIn` 動畫，4 秒後自動淡出。

## 十三、行程卡精準金額綠光（Round 21，2026-03-28）

### 13.1 功能說明

當錢包投入金額剛好等於行程所需總費用時，行程卡出現綠色脈動邊框（`b1ExactGlow`），強調「不需要找零」的完美狀態，與底部 toast「剛好！不需要找零，可以出發了！」搭配。

- 金額超過或不足 → 移除 `.exact-match` class，恢復普通樣式
- 金額剛好 → 加入 `.exact-match` class，啟動綠光循環

### 13.2 實作

```javascript
// _updateWalletDisplay() 確認按鈕更新段末
const card = document.querySelector('.b1-schedule-card');
if (card) card.classList.toggle('exact-match', total === required && total > 0);
```

### 13.3 CSS

```css
.b1-schedule-card.exact-match {
    border-color: #10b981 !important;
    box-shadow: 0 0 18px rgba(16,185,129,0.5);
    animation: b1ExactGlow 1.2s ease-in-out infinite;
}
@keyframes b1ExactGlow {
    0%,100% { box-shadow: 0 0 12px rgba(16,185,129,0.4); }
    50%     { box-shadow: 0 0 28px rgba(16,185,129,0.75); }
}
```

### 13.4 設計參考

A6「確認付款脈動」+ B1 現有 exact match toast — 視覺（邊框閃光）與聽覺（語音 toast）雙重反饋，強化剛好付清的成就感。

---

## 十四、教學設計詳析（參照 F/C/A 格式，2026-03-29）

### 14.1 教學定位與學習目標

**核心定位**：B1 是 B 系列的起點單元，以「出門帶多少錢？」的生活情境，訓練學生「閱讀費用條目 → 加總計算 → 選取錢幣湊額」的完整預算規劃能力。

**學習目標層次**：
1. **知識層**：認識各費用項目，理解加總的意義
2. **技能層**：從錢幣盤中選取正確面額組合
3. **應用層**：根據情境需求判斷「帶夠了沒」

**與其他單元的銜接**：
- 前置：C1~C4（面額辨識 + 數錢）
- 後續：B5（多商品預算決策）、B6（完整購物流程）

### 14.2 測驗內容設計

**情境驅動設計理念**：每題以一個真實生活場景（親子出遊、學校活動、醫療等）作為情境框架，讓學生感受「帶對錢才能完成任務」的現實意義，而非單純計算題。

**費用結構**：
- 每個情境包含 2~5 個費用項目（如：公車票 + 午餐 + 入場費）
- 費用以台灣真實物價為基準
- 簡單模式費用整數化（避免計算困難）
- 困難模式費用以 5/10 元為最小單位

**題目生成規則**：
```
選情境 → 選費用子集 → 計算總額 → 依難度生成錢包
  ↓
簡單：錢包金額 = 總額 ± 50元隨機上下，面額小
普通：錢包金額 = 總額 + 100~300元，含多種面額
困難：錢包金額 = 總額 + 200~500元，大面額為主
```

### 14.3 互動方式詳析

**拖曳操作設計**（同 F1/F3 系列）：
- 桌面：HTML5 Drag & Drop（`dragstart` / `dragover` / `drop`）
- 行動：Touch Events（`touchstart` / `touchmove` / `touchend`）
- 放置回饋：即時金額更新（`TimerManager.setTimeout` 80ms 後語音）
- 超額保護：總金額超出情境需求時仍允許放置（與 A1 投幣機不同，此單元允許多帶）

**錢幣盤設計**：
- 真實錢幣圖片（`images/money/`）
- 每種面額多枚（確保有足夠數量）
- 禁用已使用完畢的面額（灰化）

### 14.4 視覺回饋設計

| 狀態 | 視覺 | 音效 / 語音 |
|------|------|-----------|
| 放入錢幣 | 錢包金額數字更新 | 硬幣聲 + 語音報面額 |
| 接近足額 | — | — |
| 達到足額 | 行程卡綠光邊框脈動 | 語音「金額足夠！」|
| 剛好付清 | 綠光 + 底部 toast | 語音「剛好，不需要找零！」|
| 確認成功 | 煙火 + 完成畫面 | correct02.mp3 |
| 答錯（超額）| — | 語音提示重試 |
| 費用明細提示 | 黃框算式卡片 | — |
| 最少張數提示 | 橘色底部 toast | — |

### 14.5 語音系統設計

**題目語音（情境播報）**：
```
「今天要去[情境名稱]，[費用項目1][金額]元，[費用項目2][金額]元，
 共需要[總金額]元，請準備好錢再出發。」
```

**困難模式（費用隱藏）**：
```
「今天要去[情境名稱]，[費用項目1]??? 元，[費用項目2]??? 元，
 請仔細聽：[費用1音]元，[費用2音]元，算算看總共需要多少錢。」
```

**放幣語音**：每次放入錢幣後 80ms 延遲播報面額（避免與硬幣音效重疊）

**金額語音轉換**：`convertToTraditionalCurrency(amount)` 確保「1,250 元」正確讀為「一千兩百五十元」

---

## 十五、場景類別篩選（2026-03-29，Round 26）

### 15.1 設計動機

B1 題庫擴充至 **39 組情境**，新增 `cat` 欄位（school/food/outdoor/entertainment/shopping），讓教師可針對特定生活場景進行練習。

### 15.2 場景類別

| 類別 ID | 中文名稱 | 情境示例 |
|---------|---------|---------|
| `school` | 學校活動 | 買文具、繳費、午餐 |
| `food` | 飲食消費 | 買早餐、小吃、飲料 |
| `outdoor` | 戶外活動 | 搭車、公園入場、騎乘 |
| `entertainment` | 娛樂休閒 | 看電影、遊樂場、借書 |
| `shopping` | 購物採買 | 超市、量販店、服飾 |

設定頁新增「🗂️ 場景類別」選項（6 按鈕：全部 + 5 種），`_checkCanStart` 加入 `sceneCategory` 守衛。

### 15.3 完成畫面整合

完成畫面底部新增「專注練習：XXX 場景」說明文字，提示學生本次練習的生活情境範疇。

---

## 十六、輔助點擊模式（AssistClick，2026-03-29）

### 16.1 模組結構

```javascript
const AssistClick = {
    activate(question)   // 建立全屏透明覆蓋層，監聽點擊
    deactivate()         // 移除覆蓋層與 observer
    buildQueue(question) // 依 _pendingAction 建立待執行步驟
    _executeStep()       // 執行一步：_pendingAction.action()
    _highlight(el)       // 加 .assist-click-hint CSS class
}
```

### 16.2 B1 AssistClick 邏輯（`_pendingAction` 模式）

B1 採用「單步模式」：每次點擊只執行一個動作，動作完成後根據新狀態重新決定下一步。

| 狀態 | 下一步動作 |
|------|-----------|
| `walletTotal < targetAmount` | 貪婪選最大可用面額（加一枚）|
| `walletTotal === targetAmount` | 高亮 `#confirm-btn`（確認） |
| `walletTotal > targetAmount` | 高亮 `#clear-wallet-btn`（清除重來）|

### 16.3 設定頁整合

設定頁新增「🤖 輔助點擊」群組（啟用 / 停用），`_checkCanStart` 加 `clickMode` 守衛，全部五項選項（難度/題數/重試模式/場景類別/輔助點擊）均選後才解鎖「開始練習」按鈕。

---

## 十七、Rounds 29–39 豐富化紀錄

### 17.1 錢包進度條（Round 29）

`_renderWalletArea` 加入 `#b1-wallet-progress` 橫條，`_updateWalletDisplay` 依 `pct = walletTotal / targetAmount` 更新填充色（藍 → 橙 ≥70% → 綠 100%）。

### 17.2 找零算式提示（Round 29）

答對且 `walletTotal > targetAmount` 時，300ms 後顯示 `_showChangeTip(paid, required, change)` 公式卡：

```
付 XXX − 需 YYY = 找回 ZZZ 元
```

CSS：`.b1-change-tip`、`b1CtIn`（fadeIn + slideUp 動畫）。

### 17.3 今日路線條（Round 30）

`_renderScheduleCard` 末尾加入 `.b1-route-strip`：
```
🏠 → [行程圖示] [行程名稱] → 🏠
```
`bFadeIn 0.3s 0.5s both` 延遲淡入，強化「出門→回家」的情境感。

### 17.4 面額計數摘要（Round 32）

`_updateWalletDisplay` 統計各面額使用數量，更新 `#b1-denom-summary`：
- 膠囊標籤 `N元×M`（如「50元×2」「10元×3」）
- 初始 `display:none`，放入第一枚後顯示

### 17.5 差額錯誤語音（Round 33）

`handleConfirm` 錯誤分支改為精準語音：「還差 **X** 元，再多加一些！」（明確說出短缺金額而非泛稱）。

### 17.6 行程項目入場動畫（Round 35）

`_renderScheduleCard` 每個 `.b1-schedule-item` 加 `b1ItemSlideIn` stagger 動畫（140ms/項），費用項目逐步滑入。

### 17.7 投幣足額彈出動畫（Round 36）

`_updateWalletDisplay` 加 `wasEnough` 旗標，首次達到足額時加 `b1-total-pop` CSS class（500ms 後移除），`b1TotalPop` keyframe 縮放彈跳。

### 17.8 建議硬幣組合卡（Round 37）

`_showCoinHint` 改為 DOM 卡片 `#b1-hint-combo-card`，以文字形式顯示建議面額組合，5 秒後自動移除（取代舊式閃爍高亮）。

### 17.9 費用佔比條（Round 38）

`_renderScheduleCard` 每個費用項目下方加 `.b1-item-pct-bar-wrap` + `.b1-item-pct-bar`，寬度依 `cost / total * 100%` 計算，困難模式（費用隱藏）不顯示。

### 17.10 場景類別色標（Round 39）

`_renderScheduleCard` 依 `q.cat` 加 `b1-cat-*` CSS class，行程卡頂部 4px 色條：
- `school` → 藍色
- `food` → 橙色
- `outdoor` → 綠色
- `entertainment` → 紫色
- `shopping` → 粉色

---

## 十八、完成畫面豐富化

### 18.1 行程費用清單（2026-03-27）

`state.quiz.solvedSchedules[]` 收集每題答對的行程物件，`showResults()` 渲染藍框清單（emoji + 名稱 + 各費用項目列 + 合計）。

CSS：`.b1-res-schedules`、`.b1-schedule-row`、`.b1-sch-*`（加入 `b1_daily_budget.css`）。

### 18.2 面額使用統計（2026-03-27）

`state.quiz.denomStats` 累計每種面額使用次數，完成畫面新增「🪙 面額使用統計」格子。

CSS：`.b-res-denom-stats`、`.b1-stat-grid`、`.b1-stat-item`。

### 18.3 勳章制（Round 33）

| 正確率 | 勳章 |
|--------|------|
| 100% | 🥇 完美 |
| ≥90% | 🥇 優異 |
| ≥70% | 🥈 良好 |
| ≥50% | 🥉 努力 |
| 其他 | ⭐ 練習 |


## 十九、最佳硬幣組合逐一動畫（2026-03-30）

### 背景

C2 逐一計數動畫（每枚硬幣依序進場）與 F4 積木依序出現（stagger delay）已在 C/F 系列廣泛使用。B1 的 `_showCoinHint()` 原本只顯示靜態文字「建議用 X 元 + Y 元 + ...」，學生難以感受「拿起每枚硬幣」的動作序列。

### 實作

`_showCoinHint()` 末尾呼叫 `_animateHintCoins(hintCoins)`：

1. 在 `#b1-hint-combo-card` 內建立 `#b1-hint-anim` 容器
2. 每 **280ms** 使用 `Game.TimerManager.setTimeout(step, 280, 'ui')` 依序顯示一枚硬幣
3. 每枚顯示：
   - 硬幣圖片（`../images/money/${denom}_yuan_front.png`，onerror fallback 為文字）
   - 面額標籤（`.b1-hc-denom`）
   - 當前累計金額（`.b1-hc-total`，格式：`累計：X 元`）
4. 使用 `b1HintCoinIn`（`opacity: 0 + translateY(12px)` → `opacity: 1 + translateY(0)`）進場動畫

### CSS 類別

| 類別 | 用途 |
|------|------|
| `@keyframes b1HintCoinIn` | opacity+translateY 進場（0.25s ease-out） |
| `.b1-hint-anim` | 動畫硬幣容器（flex wrap，上方 8px gap） |
| `.b1-hint-coin` | 單枚硬幣卡（白色圓角，淺陰影，`animation: b1HintCoinIn`） |
| `.b1-hc-denom` | 面額文字（粗橙色） |
| `.b1-hc-total` | 累計金額文字（小字灰色） |

### 教學設計

- 遵循 **C2 逐一計數 pattern**：每步間距 280ms，讓學生視線能跟上
- 圖片顯示真實硬幣外觀，結合 B1 現有 `_renderCoinImages()` 風格
- 累計金額欄位強化「每加一枚，金額增加」的直觀感受
- 與 `_showMinCoinsHint`（最少張數提示）搭配，形成「建議組合 → 視覺演示」的完整提示流程

## 二十、硬幣放入浮動標籤（2026-03-30）

### 背景

A4 超市單元在商品加入購物車時顯示浮動「+X元」標籤（`b6PriceFloat`）；B6 也已採用此 pattern。B1 放入硬幣時只有語音反饋，缺乏視覺即時確認。

### 實作

在 `addCoin(denom)` 末尾，偵測 `.b1-coin-tray` / `#wallet-coins` 等錢包容器，建立浮動標籤：

```javascript
const popup = document.createElement('div');
popup.className = 'b1-coin-popup';
popup.textContent = `+${denom}元`;
popup.style.cssText = `position:fixed;left:${cx}px;top:${top}px;`;
document.body.appendChild(popup);
Game.TimerManager.setTimeout(() => popup.remove(), 900, 'ui');
```

### CSS

| 類別 | 說明 |
|------|------|
| `.b1-coin-popup` | 綠色漸層膠囊，`transform:translateX(-50%)` 水平置中 |
| `@keyframes b1CoinPopup` | 0→1 opacity，Y 0→-55px，0.85s ease-out |

### 教學設計

- 遵循 **A4 price popup / B6 item receipt flyout** pattern
- 語音（`${denom}元`）+ 視覺標籤雙軌確認，強化「投幣→金額累加」的感知
- 使用 `TimerManager` 管理移除，不洩漏 DOM 元素

---

## 十三、費用項目逐一語音播報（2026-03-31，Round 42）

### 背景

B1 簡單模式原本的語音為單一整句「今天要去X，需要準備午餐費、公車費，共N元」，所有費用名稱一次唸出，對認知負擔較重的學生來說難以跟上。參照 **C2 逐一計數（coin-by-coin reading）** 模式，在簡單模式加入費用逐項播報，讓學生能「一邊聽、一邊看、一邊理解」。

### 技術實作

**JS 新增**（`js/b1_daily_budget.js`）：

1. `renderQuestion` 簡單模式：原始語音文字縮短為「今天要去X，需要準備名稱」（去掉總金額）；額外在 2400ms 後啟動 `_speakItemsOneByOne(curr)`。

2. 新函數 `_speakItemsOneByOne(q)`：遞迴讀出每個費用項目，950ms/項，全部讀完後 500ms 再說「總共N元」。

```javascript
_speakItemsOneByOne(q) {
    const items = q.items;
    let idx = 0;
    const next = () => {
        if (idx < items.length) {
            const it = items[idx++];
            Game.Speech.speak(`${it.name}，${toTWD(it.cost)}`);
            Game.TimerManager.setTimeout(next, 950, 'speech');
        } else {
            Game.TimerManager.setTimeout(
                () => Game.Speech.speak(`總共${toTWD(q.total)}`),
                500, 'speech'
            );
        }
    };
    next();
},
```

### 為何設計此方式

| 模式 | 播報時機 | 內容 |
|------|---------|------|
| 簡單（easy）| 400ms：場景簡介<br>2400ms：逐項播報 | 先聽場景→彈窗關閉→逐項聽費用→聽總計 |
| 普通（normal）| 400ms 一次整句 | 所有費用名稱一次唸出 |
| 困難（hard）| 400ms 一次整句 | 只知道名稱，金額需自行計算 |

- 2400ms 時機 = 任務彈窗自動關閉（2000ms）後 400ms，確保不干擾彈窗語音
- 使用遞迴 TimerManager（非 setInterval），頁面切換時 `TimerManager.clearAll()` 自動中止播報
- 遵循 **C2 逐一計數** + **F4 instant feedback** pattern

### 搜尋關鍵字

- `_speakItemsOneByOne`、`逐項播報費用`、`C2 逐項朗讀 pattern`
