# B 系列：預算規劃 — 專案特色深度分析報告

> **建立日期**：2026-04-01
> **版本**：v1.0
> **分析方向**：從 A/C/F 系列提取共同模式，萃取 B 系列設計哲學與創新特色
> **JS 總行數**：12,101 行（B1~B6 合計，Round 45 後）

---

## 目錄

1. [B 系列在課程架構中的定位](#一b-系列在課程架構中的定位)
2. [B 系列 vs A/C/F 核心差異對照](#二b-系列-vs-acf-核心差異對照)
3. [各單元算法核心深度分析](#三各單元算法核心深度分析)
4. [提示系統設計（對照 A 系列分析報告）](#四提示系統設計對照-a-系列分析報告)
5. [語音系統設計（對照 C 系列）](#五語音系統設計對照-c-系列)
6. [AssistClick 架構完整規格](#六assistclick-架構完整規格)
7. [題庫規模與設計原則](#七題庫規模與設計原則)
8. [視覺回饋系統總覽（Rounds 24–45）](#八視覺回饋系統總覽rounds-2445)
9. [B 系列獨有創新](#九b-系列獨有創新)
10. [從 A/C/F 移植的關鍵模式](#十從-acf-移植的關鍵模式)
11. [教學設計評估](#十一教學設計評估)
12. [技術架構注意事項](#十二技術架構注意事項)

---

## 一、B 系列在課程架構中的定位

### 1.1 Money Tutor 課程金字塔

```
┌──────────────────────────────────────────────┐
│         A 系列：沉浸式情境應用（6 個）          │ ← 頂層：模擬真實交易
│  A1販賣機 A2理髮廳 A3麥當勞 A4超市 A5ATM A6火車 │
├──────────────────────────────────────────────┤
│         B 系列：情境決策規劃（6 個）◄ 本文焦點  │ ← 橋樑層：知識→決策→應用
│  B1帶多少錢 B2零用錢 B3存錢 B4比價 B5預算 B6採購│
├──────────────────────────────────────────────┤
│         C 系列：貨幣概念基礎（6 個）            │ ← 概念層：辨識→計算→判斷
│  C1認識錢幣 C2數錢 C3換錢 C4付款 C5夠不夠 C6找零│
├──────────────────────────────────────────────┤
│         F 系列：數學基礎支撐（6 個）            │ ← 基礎層：計數→比較→組成
│  F1對應 F2唱數 F3認讀 F4排序 F5量比 F6數組成    │
└──────────────────────────────────────────────┘
```

### 1.2 B 系列教學能力層次

| 層次 | 核心能力 | 對應單元 | 前置依賴 |
|------|---------|---------|---------|
| 計算層 | 加總費用、計算餘額、推算週數 | B1、B2、B3 | C2 數錢、F6 數的組成 |
| 判斷層 | 比較優劣、辨別便宜、差額計算 | B4 | F4 排序、C6 找零 |
| 規劃層 | 備錢、分配預算、達成儲蓄目標 | B1、B3、B5 | C5 夠不夠 |
| 交易層 | 清單採購→付款→找零完整流程 | B6 | A 系列模擬交易 |

### 1.3 各單元前後銜接

```
F6 數的組成
    ↓ 乘除法基礎
C2 數錢 ──→ B1 帶多少錢 ──→ B6 菜市場買菜 ──→ A3/A4 購物模擬
    ↓               ↓
B2 零用錢日記    B3 存錢計畫 ──→ A 系列消費目標
    ↓
B5 生日派對預算 ←── B4 特賣比一比 ←── C6 找零
```

---

## 二、B 系列 vs A/C/F 核心差異對照

### 2.1 互動模式比較

| 維度 | A 系列 | B 系列 | C 系列 | F 系列 |
|------|--------|--------|--------|--------|
| **主要互動** | 拖曳+點擊（5–8步流程） | 拖曳/選擇/鍵盤輸入 | 拖曳金錢到區域 | 拖曳排序/對應 |
| **流程長度** | 5–8 步驟（A6 最多） | 1–3 步驟/題 | 1–2 步驟/題 | 1 步驟/題 |
| **情境複雜度** | 最高（真實模擬） | 中（情境決策） | 低（單一技能） | 最低（純數學） |
| **任務類型** | 指定任務 / 自由模式 | 場景題庫 / 主題篩選 | 面額/位數配置 | 數量/範圍配置 |
| **商品數量** | A4: 130種 | B3: 20種，B6: 3市場×多攤位 | 固定面額9種 | 無商品 |
| **找零設計** | A1/A4/A6 有完整找零 | B6 含找零三選一 | C6 專門訓練 | — |

### 2.2 錯誤處理哲學

| 系列 | 錯誤觸發機制 | 提示類型 | 進階失敗處理 |
|------|------------|---------|-----------|
| **A 系列** | `errorCount >= 3`（分步驟）| 黃色光暈高亮 + 語音 | 困難模式僅手動提示鈕 |
| **B 系列** | `quiz.errorCount >= 3`（題目層）| breakdown算式 + 語音 + 公式提示 | 勳章扣分（B3/B4）；retry/proceed 模式 |
| **C 系列** | 即時反饋（放置即判斷）| ✓/✗ 標記 + 語音 | 提示鈕顯示總額 |
| **F 系列** | 即時反饋（拖放即判斷）| 光暈 + 語音 | 困難模式無提示 |

**B 系列創新**：提示不只是「高亮正確答案」，而是展示**計算過程**（`_showCalcBreakdown`、`_showDiffFormulaHint`、`_showDivisionHint`），培養解題思維而非只確認答案。

### 2.3 狀態管理對照

| 系列 | 主要狀態容器 | 架構模式 |
|------|-----------|---------|
| **A 系列** | `state.gameState.{normalMode, easyMode, hardMode}` + Phase 機制 | 分難度子物件 + 多步驟 Phase |
| **B 系列** | `state.quiz.{}` + `state.game.{}` | quiz = 題目流程；game = 關卡/採購狀態 |
| **C 系列** | `state.gameState.{}` + ModeConfig | 組態驅動（C4/C5 最明顯） |
| **F 系列** | `this.state.{}` | 扁平狀態 |

---

## 三、各單元算法核心深度分析

### 3.1 B1 — `_calcOptimalCoins()`（最少枚數貪婪算法）

**用途**：計算達到目標金額所需的最少硬幣/鈔票枚數，用於 hint 高亮與「最少N張」提示。

```javascript
_calcOptimalCoins(target) {
    const denoms = [1000, 500, 100, 50, 10, 5, 1];
    let remaining = target, coins = [];
    for (const d of denoms) {
        const n = Math.floor(remaining / d);
        if (n > 0) { coins.push({ denom: d, count: n }); remaining -= n * d; }
    }
    return coins; // [{ denom: 500, count: 1 }, { denom: 50, count: 1 }, ...]
}
```

**應用位置**：
- `_showCoinHint()` → `_animateHintCoins()`：動畫逐一展示最佳組合
- `_showMinCoinsHint()` 答對後比對實際用量 vs 最少量

**教學意義**：讓學生看到「最省的方式」，連結貨幣效率觀念。

---

### 3.2 B2 — 收支追蹤與干擾項設計

**Delta 干擾項（簡單模式）**：
```javascript
const deltas = [-40, -20, +20, +40];
// 確保選項間距 ≥ 20元，且無負數
const distractors = deltas.filter(d => answer + d > 0 && d !== 0)
    .sort(() => Math.random() - 0.5).slice(0, 2);
```

**收支計算公式**：
```javascript
// 每道題：startAmount + Σ(收入) - Σ(支出) = answer
const answer = question.startAmount + question.events.reduce((acc, e) =>
    acc + (e.type === 'income' ? e.amount : -e.amount), 0);
```

**漸進提示**（第1次錯→範圍提示，第2次錯→完整算式）：
```javascript
if (quiz.errorCount === 1) this._showRangeHint(lo, hi);
else if (quiz.errorCount >= 2) this._showCalcBreakdown(question);
```

---

### 3.3 B3 — 雙模式系統（月曆 / 週數計算）

**週數計算（ceil 除法）**：
```javascript
const weeks = Math.ceil(item.price / question.weekly);
// 學生答案需用無條件進位（與數學標準切割邊界一致）
```

**結構化干擾項（4選項，Round 42）**：
```javascript
_generateChoices(question) {
    const correct = Math.ceil(question.price / question.weekly);
    const structured = [
        correct - 1,          // 忘進位（最常見錯誤）
        correct + 1,          // 過度保守
        Math.ceil(correct * 0.6) // 大幅低估
    ].filter(v => v > 0 && v !== correct);
    // 取前3個不重複干擾項 + 1個正確答案，2×2 格局
}
```

**月曆拖曳架構**：
```
_startDragSession(dayIdx)
    ↓ 渲染 b3-drag-coin 來源 + b3-drop-slot 目標
_initCalendarDragAndDrop()  ← HTML5 DnD + TouchDragUtility
_handleCoinDrop(coinValue, slotEl)
    ↓ 面額比對 → 勾勾動畫 → 存入
_completeDragSession()
    ↓ _updateCalendarUI() + _updatePiggyBankCard() + 里程碑偵測
```

---

### 3.4 B4 — 三模式比價系統

**防作題慣性機制**：
```javascript
// B4_ITEMS: optA 永遠比 optB 貴
// 顯示時 50% 機率左右翻轉
const swapped = Math.random() < 0.5;
const left  = swapped ? curr.optB : curr.optA;
const right = swapped ? curr.optA : curr.optB;
```

**動態價格浮動（Round 41）**：
```javascript
// normal: ±10%, hard: ±20%
const pct = difficulty === 'hard' ? 0.20 : 0.10;
const floatA = Math.round(base.optA.price * (1 + (Math.random() * 2 - 1) * pct) / 5) * 5;
// 安全守衛: 浮動後若 A ≤ B 則不套用
if (floatA <= floatB) return base; // 保持原題
```

**三商店排序（triple mode）**：
```javascript
// hard: 依序點選 1️⃣→2️⃣→3️⃣（由便宜到貴）
// _handleTripleRankClick: 比對 tripleClickOrder vs sorted prices
const sortedAsc = [...curr.stores].sort((a, b) => a.price - b.price);
```

**單位比價（unit mode）**：
```javascript
const perA = curr.optA.price / curr.optA.qty;
const perB = curr.optB.price / curr.optB.qty;
// 差額: Math.abs(perA - perB) 取整到1元
```

---

### 3.5 B5 — 必買約束下的最佳化選購

**效率評級算法**：
```javascript
const usePct = total / scenario.budget * 100;
const effBadge = usePct === 100 ? '💎 完美配額'
    : usePct >= 95 ? '💎 完美'
    : usePct >= 80 ? '⭐ 善用'
    : usePct >= 60 ? '👍 不錯'
    : '💡 節省';
```

**超支智慧建議（單步貪婪移除）**：
```javascript
// 找到移除哪一個選購品能讓總額 ≤ 預算
const suggestion = selectedOptionals
    .sort((a, b) => b.price - a.price)
    .find(i => total - i.price <= budget);
```

**預算儀表條計算**：
```javascript
const pct = Math.min(100, Math.round(total / budget * 100));
fill.style.width = pct + '%';
fill.style.background = pct <= 70 ? '#10b981' : pct <= 90 ? '#f59e0b' : '#ef4444';
```

---

### 3.6 B6 — 市場採購+付款找零複合系統

**貪婪付款提示（`_showPaymentHint`）**：
```javascript
// 找出最少面額組合達到 total
const B6_BILLS = [1000, 500, 100, 50, 10, 5, 1];
let rem = total; const used = {};
for (const b of B6_BILLS) {
    const n = Math.floor(rem / b);
    if (n) { used[b] = n; rem -= n * b; }
}
```

**攤位路由設計（多市場動態**）：
```javascript
// startGame 時設定 _currentStalls / _currentMissions
// 隨機市場: 每關動態切換 _mktKey
const mkt = B6_MARKETS[mktKey];
_currentStalls = mkt.stalls;
_currentMissions = mkt.missions;
```

**找零三選一干擾項**：
```javascript
// 生成 ±偏移干擾項，確保不等於正確答案
const offsets = [-10, -5, +5, +10, +20, -20].sort(() => Math.random() - 0.5);
const distractors = offsets.filter(o => change + o > 0 && change + o !== change).slice(0, 2);
```

---

## 四、提示系統設計（對照 A 系列分析報告）

### 4.1 提示觸發機制對照表

| 單元 | Easy 模式 | Normal 模式 | Hard 模式 | 特殊機制 |
|------|----------|------------|---------|---------|
| **B1** | 不可用面額淡化 | 錯誤 ≥ 3 自動高亮最佳組合 | 手動提示鈕 | 倒數計時器（Round 44）|
| **B2** | 逐項動畫高亮 | 第1次→範圍提示，≥2次→算式 | 手動重聽語音（Round 30）| `errorCount` 計數 |
| **B3** | 拖曳工作階段導引 | 除法算式提示 + 週數積木 | 週存金額遮蔽（Round 43）| 配速預覽（Round 34）|
| **B4** | 選題即得分 | selectError ≥ 3 高亮正確卡 | 10s 無操作自動高亮 | 記憶模式（Round 38）|
| **B5** | 預算條染色 | 預算提示鈕高亮可負擔商品 | 困難隱藏價格翻牌 | 效率儀表條 |
| **B6** | 商品彈出價格 | 付款面額提示（貪婪演算）| 無提示鈕 | 錯誤攤位提示 `neededAtStall` |

**對照 A 系列** (`A_Series_Hint_System_Analysis.md`)：
- A 系列：錯誤計數達 3 次觸發黃色光暈高亮 → B 系列：同樣用 errorCount ≥ 3，但提示**更有教育性**（顯示算式而非只高亮答案）
- A 系列困難模式：完全手動提示鈕 → B 系列困難模式：增加隱藏資訊（遮蔽价格/費用）讓難度更真實
- B 系列獨有：**段梯式提示**（B2 先給範圍後給算式；B3 週數積木視覺化）

### 4.2 提示展示模式分類

| 模式 | 實現方式 | 使用單元 | 靈感來源 |
|------|---------|---------|---------|
| 算式展示 | `_showCalcBreakdown`, `_showDivisionHint` | B2、B3、B4、B6 | C4 分步說明 |
| 視覺高亮 | `.assist-click-hint` + `bAssistPulse` | 全 B 系列 AssistClick | A 系列 `.step-hint` |
| 元素淡化 | `.b1-coin-faded`, `b5-price-hidden` | B1、B5 | C4 淡化非解元素 |
| 彈窗資訊 | `_showTaskModal`, `_showRoundIntroCard` | B1、B2、B5、B6 | C4 instruction modal |
| 聲音引導 | 語音播報所有數字 | B4 比價語音 | A 系列步驟語音 |

---

## 五、語音系統設計（對照 C 系列）

### 5.1 技術實現

B 系列語音使用與 A/C/F 相同的 `Game.Speech.speak()` 封裝：

```javascript
// 共用架構（所有系列相同）
const utterance = new SpeechSynthesisUtterance(text);
utterance.rate = 1.0;
utterance.lang = cachedVoice?.lang || 'zh-TW';
utterance.voice = cachedVoice;  // 雅婷優先（Microsoft Yating）
speechSynthesis.speak(utterance);
```

### 5.2 各單元語音使用模式

| 單元 | 主要語音場景 | 數字格式 | 回調用途 |
|------|-----------|---------|---------|
| B1 | 費用逐項朗讀、投幣反饋、倒數計時 | `${cost}元` | 完成語音後進下一步 |
| B2 | 開題金額、日記事件朗讀、理財建議 | `${amount}元` | 無 |
| B3 | 存錢目標、里程碑慶祝、達標語音 | `${price}元` / `每週${weekly}元` | 達標後顯示結果頁 |
| B4 | 比價完整資訊「A店X元，B店Y元」 | `${price}元` | 無 |
| B5 | 關卡開場、商品點選、超支移除建議 | `${price}元` | 無 |
| B6 | 攤位引導、商品找到、付款足額、找零 | `${total}元` | 找零語音後進結果 |

### 5.3 B 系列語音創新（超越 C 系列）

C 系列語音主要用於「確認答案/面額」，B 系列語音更積極地：
1. **情境引入**：每題開始前用語音建立情境（「今天要去…」、「第N關，今天要買…」）
2. **里程碑慶祝**：25/50/75/100% 存錢目標各有專屬語音（B3）
3. **教學性說明**：答對後說出「每週存X元，需Y週，就能買Z了！」（B3）連結計算意義
4. **足額提醒**：首次金額足夠時說「金額足夠，可以出發了！」（B1/B6）

---

## 六、AssistClick 架構完整規格

### 6.1 模組結構

B 系列 AssistClick 是獨立模組（`Game.AssistClick = { ... }`），在 `Game.init()` 前定義：

```javascript
Game.AssistClick = {
    _overlay: null,
    _queue: [],
    _isActive: false,

    init() { /* 建立 b1-assist-overlay 全螢幕點擊層 */ },
    _highlight(el) { el.classList.add('assist-click-hint'); },
    _clearHighlight() { document.querySelectorAll('.assist-click-hint').forEach(...) },
    _queue, nextStep() { /* 執行佇列中下一個動作 */ },
    build() { /* 決定高亮哪個元素，建立佇列 */ }
};
```

### 6.2 各單元 AssistClick 行為

| 單元 | Easy 行為 | Normal/Hard 行為 | 特殊邏輯 |
|------|----------|-----------------|---------|
| **B1** | 貪婪選最大面額硬幣→確認 | 同 easy（單步模式）| 不足→投幣；足夠→confirm |
| **B2** | 高亮正確選項 | 逐位數 numpad + ok 鍵 | Hard: 3位數拆解輸入 |
| **B3** | quiz hard: 逐位數 numpad | 僅 hard quiz 啟用 | Cal 模式不啟用 |
| **B4** | 高亮正確卡 + diff 選項 | diff hard: 逐位數輸入 | Triple hard: 依 rankOrder 逐張 |
| **B5** | confirm 可點→高亮 | 否則→高亮可負擔商品 | 確認購買 |
| **B6** | 切換攤位→點商品→checkout | payment: 貪婪→pay | change quiz: 正確選項 |

### 6.3 vs A 系列 ClickMode 差異

| 維度 | A 系列 ClickMode | B 系列 AssistClick |
|------|----------------|-------------------|
| 啟用條件 | 設定頁獨立選項 | 設定頁獨立選項（同） |
| 佇列結構 | `buildActionQueue()` 多步驟 | `_queue[]` 簡單佇列 |
| 視覺提示 | `.step-hint` 黃色脈動 | `.assist-click-hint` 綠色脈動 |
| 遮罩設計 | `#click-exec-overlay`（固定定位） | `#b1-assist-overlay`（每單元命名）|
| 適用場景 | 5–8 步驟流程（購物全程）| 1–3 步驟題目 |

---

## 七、題庫規模與設計原則

### 7.1 題庫統計

| 單元 | Easy 組數 | Normal 組數 | Hard 組數 | 合計 | 主題/場景 | 特殊模式 |
|------|---------|------------|---------|------|---------|---------|
| **B1** | 14 | 14 | 11 | **39** | 5 場景類別 | 無 |
| **B2** | 12 | 12 | 12 | **36** | 3 日記主題 | 無 |
| **B3** | 6件 | 15件 | 20件 | **20件（月曆+週數）** | 4 物品類別 | 月曆/週數雙模式 |
| **B4** | 30 | 30 | 30 | **30（+15 triple +12 unit）** | 4 商品類別 | 兩店/三店/單位比 |
| **B5** | 12關 | 12關 | 8關 | **32關** | 3 派對主題 | 必買+選購 |
| **B6** | 8任務 | 8任務 | 8任務 | **24任務（×3市場）** | 3 市場類型 | 採購+付款+找零 |

### 7.2 題庫設計原則

**B1 行程卡設計**：
- 每題 2~4 項費用，金額從易到難遞增
- 困難模式隱藏個別費用（只靠語音）
- 場景色標（school藍/food橙/outdoor綠/entertainment紫/shopping粉）

**B2 日記事件設計**：
- 每題 2/4/6 筆事件（依難度）
- 事件包含：emoji + 情境名稱 + 方向（收入/支出）+ 金額
- 困難模式啟用記憶遮蔽（模糊圖示+名稱）

**B4 防作題機制**：
- 50% 左右交換防記憶化
- 動態價格浮動（normal ±10%，hard ±20%）確保每次不同

**B6 任務設計**：
- 每個任務有 2~3 種商品，分布在 2~3 個攤位
- 付款金額 ≤ 預算（確保找零場景合理）
- 市場切換時整批替換攤位與任務資料

---

## 八、視覺回饋系統總覽（Rounds 24–45）

### 8.1 通知類（Toast / Badge）

| 元素 | 觸發條件 | 動畫 | CSS class |
|------|---------|------|---------|
| `b1-exact-toast` | 投幣剛好符合 | `b1ToastUp` 上飄 | 深綠底白字 |
| `b1-min-coins-toast` | 答對但用幣超過最少 | `b1ToastUp` | 橙色 |
| `b1-coin-popup` | 每次投幣 | `b1CoinPopup` 上飄淡出 | 綠色膠囊 |
| `b4-savings-tally` | 累計節省 > 0 | header 右側徽章 | 綠色小徽章 |
| `b4-sub-tip` | diff 答對後 | 底部算式 toast | `b4CfIn` |
| `b5-eff-badge` | 每關完成 | 根據效率 4 種樣式 | perfect/good/ok/save |
| `b6-stall-done-toast` | 切換至已完成攤位 | `b6-sdt-fade` 淡出 | 綠色底 |

### 8.2 覆蓋卡（Overlay Card）

| 元素 | 觸發條件 | 持續時間 | CSS class |
|------|---------|---------|---------|
| `b1-task-modal` | 每題開始 | 2000ms / 點擊關閉 | 全屏半透明 |
| `b2-task-intro` | 每題開始 | 2200ms / 點擊關閉 | 黃色大字起始金額 |
| `b3-goal-modal` | quiz 每題開始 | 2500ms / 點擊關閉 | 物品圖示+名稱+價格 |
| `b4-thinking-card` | easy select 答對 | 2000ms 後淡出 | 藍色步驟說明 |
| `b5-round-intro` | 每關開始 | 1800ms / 點擊關閉 | 紫色預算大字 |
| `b5-round-transition` | 關卡間 | 1100ms + 淡出 | 紫色全屏 |
| `b6-mission-intro` | 每關開始 | 2800ms / 點擊關閉 | 購買清單+預算 |
| `b6-checkout-card` | 結帳按鈕點擊 | 5s / 點背景 | 商品清單確認 |

### 8.3 進度指示類

| 元素 | 位置 | 更新時機 | 表達資訊 |
|------|------|---------|---------|
| `b1-wallet-progress` | 錢包區下方 | 每次投幣 | 投幣進度（藍→橙→綠） |
| `b2-balance-trend` | easy 動畫後 | 動畫結束 | 餘額vs起始 比例條 |
| `b3-progress-ring` | 撲滿卡頂部 | 每次存入 | 圓形進度（conic-gradient）|
| `b3-days-left` | 月曆info卡 | 每次存入 | 距完成天數（≤3天脈動）|
| `b5-budget-meter` | 預算條下方 | 每次選購 | 0-100% 填充 + 必買標線 |
| `b5-must-marker` | 儀表條 | 靜態 | 必買費用佔比標線 |
| `b6-cart-badge` | 固定右下角 | 每次收集 | 已收/需收件數（藍→綠）|

### 8.4 動畫系統

B 系列共定義 **80+ 個 CSS keyframe 動畫**，依類型：

| 類型 | 數量 | 範例 |
|------|------|------|
| 彈出/縮放 | ~20 | `b3SbPop`, `b4TcIn`, `b5RiIn`, `b6RcIn` |
| 上飄/淡出 | ~15 | `b1ToastUp`, `b4CfIn`, `b6FlyoutUp`, `b6CpIn` |
| 滑入 | ~10 | `b2TgSlideIn`, `b6WtIn`, `b6SsIn` |
| 脈動/閃爍 | ~15 | `bAssistPulse`, `b5ConfirmPulse`, `b1RtPulse` |
| 翻轉 | ~5 | `b5FlipReveal`, `b4CardGlow` |
| 震動 | ~3 | `b5Shake`, `b2AnswerShake` |
| 其他 | ~10 | `b3MilestonePop`, `b4PodiumRise`, `b6StallFlash` |

---

## 九、B 系列獨有創新

### 9.1 月曆存錢系統（B3 easy mode，全系列唯一）

B3 的月曆模式是 Money Tutor 中**唯一模擬真實存錢習慣**的互動系統：

```
月曆格 → 點擊 → 啟動 _startDragSession()
    ↓
來源卡（今日可存金額：面額圖示）
目標槽（drop zone）
    ↓
_handleCoinDrop() → 撲滿更新 → 里程碑偵測
    ↓（達 100%）
_onCalendarGoalReached() → 三波 confetti + 結果頁
```

**撲滿面額分解 + 手動兌換系統**（`EXCHANGE_RULES`）：
- 5個1元 → 換1個5元
- 2個5元 → 換1個10元
- 5個10元 → 換1個50元
等等，每個面額達兌換閾值時顯示綠色「🔄 X個換1個Y元」按鈕。

這是 B3 最複雜的設計，讓學童在存錢過程中自然學習**換錢（C3）**的知識。

### 9.2 三模式比價（B4，全系列唯一）

B4 是唯一同時支援：
- **兩商店比價**（optA vs optB）
- **三商店排序**（最便宜→最貴的 1/2/3 排列）
- **單位比價**（每個/每克計算）

且每次題目**左右交換 + 動態價格浮動**，使每次作答都是真實判斷而非記憶。

### 9.3 必買約束系統（B5，全系列唯一）

B5 是唯一有**硬約束 + 軟選擇**雙層結構的單元：
- 必買（must）：無法取消，代表「固定支出」
- 選購（optional）：自由決策，代表「可變支出」

這在 Money Tutor 中是最接近真實消費決策的模擬（固定房租+變動開銷概念的簡化版）。

### 9.4 多市場動態切換（B6）

B6 不是固定一個市場，而是 3 種市場（傳統市場/超市/夜市），每種市場有不同的：
- 攤位配置（名稱、圖示、商品）
- 任務設計（需購買的商品清單）
- 情境語音（「歡迎來到…市場！」）

隨機市場模式下，每關可動態切換市場類型，實現最大化題目變化。

---

## 十、從 A/C/F 移植的關鍵模式

### 10.1 已移植模式索引

| 模式名稱 | 原始來源 | B 系列應用 | 搜尋關鍵字 |
|---------|---------|----------|---------|
| instruction modal per question | C4 `_showInstructionModal` | B1 `_showTaskModal`, B2 `_showTaskIntroModal`, B3 `_showSavingsGoalModal` | `_showTaskModal` |
| 算式提示卡 | C6 找零明細 | B2 `_showCalcBreakdown`, B4 `_showDiffFormulaHint`, B6 `_showChangeFormula` | `_showCalcBreakdown` |
| 逐項動畫展示 | C2 `_highlightCoinsOneByOne` | B2 `_animateEasyEntries`, B1 `_speakItemsOneByOne` | `_animateEasyEntries` |
| 量比較比例條 | F5 量比較 | B4 `_renderPriceBars`, B5 `_updateTotalBar` | `_renderPriceBars` |
| 排序 pattern | F4 數字排序 | B4 三商店 hard mode 排序 | `tripleClickOrder` |
| 里程碑 pattern | F2 唱數里程碑 | B3 `_showMilestoneBadge` | `_showMilestoneBadge` |
| 關卡轉場卡 | C6 transitionText | B5 `_showRoundTransition`, B6 `_showRoundCompleteCard` | `_showRoundTransition` |
| 差額圖示 | C5 差額金錢圖示 | B6 `_showChangeQuiz` 改版 | `_showChangeQuiz` |
| 配速預覽 | F5 量比較 | B3 `b3-choice-pace` 配速說明 | `b3-choice-pace` |
| 確認按鈕脈動 | A6 confirm-payment-btn | B5 `b5ConfirmPulse` | `b5ConfirmPulse` |
| 交易摘要圖示 | A4 `showTransactionSummaryScreenWithData` | B6 採購收據 + B5 派對物品回顧 | `receipts`, `successfulRoundItems` |
| 錯誤計數自動提示 | A 系列 `errorCount >= 3` | B2/B4 `quiz.errorCount >= 3` | `quiz.errorCount` |
| 自訂物品上傳 | A1/A3/A4 魔法商品 | B3 `_renderCustomItemsPanel` / `b3CompressImage` | `b3CompressImage` |
| 貪婪最佳付款 | A4/A6 `calculateOptimalPayment` | B1 `_calcOptimalCoins`, B6 `_showPaymentHint` | `_calcOptimalCoins` |
| 煙火動畫 | 全系列 `confetti.browser.min.js` | B3 達標 confetti burst（Round 45）| `confetti` |

### 10.2 B 系列超越原始 pattern 之處

| 原始 pattern | B 系列進化版 | 改進點 |
|------------|------------|--------|
| C4 單一指令彈窗 | B系列每題開場彈窗 + 2-3秒自動關閉 | 整合語音+自動關閉 |
| A 系列黃色光暈高亮 | B3/B4 `_showDivisionHint` 除法積木展示 | 從「指向答案」→「解釋過程」|
| F2 里程碑音效 | B3 四段式里程碑語音（25/50/75/100%）| 從音效→個性化語音回應 |
| C6 找零三選一 | B6 找零 + 計算面板 + 漸進提示 | 三層回饋（選項+公式+輔助計算）|
| A4 自訂商品 | B3 自訂儲蓄目標（含圖片壓縮+類別管理）| 完整自訂物品管理系統 |

---

## 十一、教學設計評估

### 11.1 B 系列優勢

**1. 情境真實度高**
B 系列每道題都有生活情境包裝（行程、日記事件、存錢目標、市場採購），讓學生在真實脈絡中練習數學，比 C/F 系列的抽象練習更有意義。

**2. 漸進式提示（B2/B3/B4 最明顯）**
不是直接給答案，而是：問題 → 範圍提示 → 計算過程 → 完整算式，符合**鷹架教學（Scaffolding）**原則。

**3. 錯誤後學習設計**
答錯不是懲罰，而是觸發更多教學內容（B2算式、B4公式、B6計算面板），符合「從錯誤中學習」的建構主義教育觀。

**4. 主題與場景多樣化**
B2（3主題）、B5（3主題）、B6（3市場）讓相同難度的練習有不同情境包裝，降低重複感。

**5. 完成畫面資訊豐富**
B 系列完成畫面（兩頁式）包含：勳章評等、統計分析、比價歷程、採購收據、面額使用統計等，讓學生能回顧自己的學習表現。

### 11.2 相對 A/C/F 的不足之處

**1. 流程複雜度仍低於 A 系列**
A 系列（5–8步）模擬完整交易；B 系列（1–3步）更適合概念練習，但不夠貼近真實消費行為。

**2. 影像資源有限**
A 系列使用 100+ 真實商品圖片；B 系列主要使用 emoji 或借用 C5 圖片（B3），視覺吸引力稍遜。

**3. B4 單位比價缺乏生活情境**
B4 unit mode 展示每單位價格比較，但缺乏真實購物情境包裝（只顯示 qty/unit 數字）。

**4. B5 預算範圍固定**
B5_SCENARIOS 中預算值固定，動態難度（如 C5 的 PriceStrategy）尚未引入。

### 11.3 建議未來方向

1. **B6 + A3 整合**：B6 採購完成後可連結 A3 麥當勞點餐，做為「買食材→做飯→結帳」的跨單元體驗
2. **B 系列作業單擴充**：目前 B3/B5 作業單較簡單（93/128行），可參考 A4（615行）的深度
3. **B5 動態預算**：引入 C5 PriceStrategy 概念，讓每次預算值略有浮動
4. **B1 找零訓練**：B1 目前只訓練「帶多少」，可在答對後加「如果你帶了N元，會找回多少？」延伸題
5. **B系列跨單元成就系統**：完成 B1→B2→B3 連續關卡後解鎖特殊獎勵，增加學習動機

---

## 十二、技術架構注意事項

### 12.1 記憶體管理

所有 B 系列均遵守：
- `init()` 時：`TimerManager.clearAll()` + `EventManager.removeAll()`
- `renderWelcomeScreen()` 時：`TimerManager.clearAll()` + `EventManager.removeByCategory('gameUI')`
- `showResults()` 時：`TimerManager.clearByCategory('turnTransition')`

**特例**：B3 月曆模式使用 `'countdown'` category 管理倒數計時（B1 Route Timer 也用此 category）。

### 12.2 CSS 層級架構

```
ai-theme.css        ← Design Tokens（色彩、間距）
shared-game-base.css ← B/C/F 通用版面
b-series.css        ← B 系列共用（AssistClick 樣式、設定頁風格）
bX_unit.css         ← 各單元專屬（B1~B6 各自）
```

**b-series.css 重要規則**：
- `.b-series .unit-welcome` amber 漸層設定頁背景
- `.b-sel-btn` 膠囊形選項按鈕
- `.assist-click-hint` 綠色脈動提示框

### 12.3 B3 特殊依賴

B3 是 B 系列唯一需要額外注意的單元：
- 借用 `images/c5/icon-c5-*.png` 商品圖片（廢棄自己的 images/b3/）
- TouchDragUtility 在月曆拖曳中使用
- `state.calendar.denomPile{}` 記錄各面額枚數（手動兌換系統依賴此）

### 12.4 Debug 物件

```javascript
Game.Debug.FLAGS = {
    quiz:   true,   // 題目/計算 log
    speech: true,   // 語音 log
    ui:     false,  // UI 渲染 log
    drag:   false   // 拖曳 log（B1/B3）
};
// 使用：Game.Debug.log('quiz', '計算結果', answer);
```

### 12.5 HTML 版本號

各 B 系列 HTML 引用 JS 時使用 `?v=X.X` cache-busting：
- B3 最新：`?v=4.5`（B 系列最複雜，版本最高）
- B1/B2/B6：`?v=3.8`
- B4/B5：`?v=3.7` / `?v=4.0`

---

## 附錄：B 系列關鍵函數速查

| 功能 | 函數名 | 單元 |
|------|--------|------|
| 最少枚數 | `_calcOptimalCoins` | B1 |
| 硬幣貪婪動畫 | `_animateHintCoins` | B1 |
| 逐項費用語音 | `_speakItemsOneByOne` | B1 |
| 收支計算提示 | `_showCalcBreakdown` | B2 |
| 漸進範圍提示 | `_showRangeHint` | B2 |
| 主題動畫導引 | `_showThemeGuide` | B2 |
| 結構化干擾項 | `_generateChoices` | B3 |
| 月曆拖曳啟動 | `_startDragSession` | B3 |
| 達標語音+煙火 | `_onCalendarGoalReached` | B3 |
| 手動兌換 | `_handleExchange` | B3 |
| 比例條渲染 | `_renderPriceBars` | B4 |
| 防作題交換 | `swapped` + 動態浮動 | B4 |
| 三商店排序 | `_handleTripleRankClick` | B4 |
| 記憶倒數 | `_startMemoryCountdown` | B4 |
| 效率評級 | `effBadge` (IIFE in showResults) | B5 |
| 超支移除建議 | `_handleConfirm` 超支分支 | B5 |
| 朗讀已選清單 | `b5-read-selected-btn` handler | B5 |
| 貪婪付款提示 | `_showPaymentHint` | B6 |
| 找零三選一 | `_showChangeQuiz` | B6 |
| 計算過程動畫 | `_animateChangeCalc` | B6 |
| 多市場路由 | `_currentStalls/_currentMissions` | B6 |
