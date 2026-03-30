# B 系列：預算規劃 — 教學設計完整報告

> **建立日期**：2026-03-30
> **版本**：v1.3（2026-03-31 更新：Round 42 — B5 分組佈局、B3 4選項、B1 逐項語音）
> **前次版本**：v1.2（2026-03-31，Round 41 — B2 簡單模式卡片視覺化、B4 動態價格浮動）
> **前次版本**：v1.1（2026-03-31，Round 40 功能、B3 輔助點擊修正、B3 商品擴充 14→20 件）
> **專案**：Money Tutor 金錢教學系統
> **系列**：B 預算規劃（B1～B6）
> **定位**：連接 C 系列「貨幣知識」與 A 系列「真實交易」的橋樑課程

---

## 目錄

1. [系列定位與課程脈絡](#一系列定位與課程脈絡)
2. [系列規模總覽](#二系列規模總覽)
3. [各單元核心設計](#三各單元核心設計)
4. [共同技術架構](#四共同技術架構)
5. [語音系統設計](#五語音系統設計)
6. [輔助點擊系統（AssistClick）](#六輔助點擊系統assistclick)
7. [視覺回饋與動畫系統](#七視覺回饋與動畫系統)
8. [完成畫面設計](#八完成畫面設計)
9. [觸控與桌面支援](#九觸控與桌面支援)
10. [RWD 版面設計](#十rwd-版面設計)
11. [B 系列 vs A/C/F 系列比較](#十一b-系列-vs-acf-系列比較)
12. [Rounds 24–39 豐富化總覽](#十二rounds-2439-豐富化總覽)
13. [已知問題與修復記錄](#十三已知問題與修復記錄)
14. [未來開發建議](#十四未來開發建議)

---

## 一、系列定位與課程脈絡

### 1.1 Money Tutor 課程金字塔

```
┌─────────────────────────────────────────┐
│          A 系列：沉浸式情境應用           │  ← 頂層：最接近真實交易
│  A1 販賣機 A2 理髮廳 A3 麥當勞           │
│  A4 超市  A5 ATM  A6 火車票              │
├─────────────────────────────────────────┤
│          B 系列：情境決策規劃  ← 本系列   │  ← 橋樑層：知識→決策→應用
│  B1帶多少錢 B2零用錢 B3存錢計畫          │
│  B4特賣比較 B5派對預算 B6買菜            │
├─────────────────────────────────────────┤
│          C 系列：貨幣概念基礎             │  ← 概念層：辨識→計算→判斷
│  C1認識錢幣 C2數錢 C3換錢               │
│  C4付款  C5夠不夠 C6找零                │
├─────────────────────────────────────────┤
│          F 系列：數學基礎支撐             │  ← 基礎層：計數→比較→組成
│  F1對應 F2唱數 F3認讀 F4排序 F5量比 F6組成│
└─────────────────────────────────────────┘
```

### 1.2 B 系列教學定位

**核心能力目標**：在真實限制（預算、時間、清單）下做出最佳財務決策。

| 層次 | 能力 | 對應單元 |
|------|------|---------|
| 計算層 | 加總費用、計算差額、推算週數 | B1、B2、B3、B4 |
| 判斷層 | 比較優劣、判斷是否超支 | B4、B5 |
| 規劃層 | 提前備錢、分配預算、達成目標 | B1、B3、B5 |
| 交易層 | 清單→採購→付款→找零 | B6 |

### 1.3 學習路徑（前後銜接）

```
F6 數的組成
    ↓ 乘除法基礎
B3 存錢計畫 ──────────────────────→ A 系列（消費應用）
    ↑                                      ↑
C2 數錢 → B2 零用錢日記 → B5 派對預算 ──→ A4 超市購物
    ↑                                      ↑
C5 夠不夠 → B1 帶多少錢 → B6 買菜 ──→ A3 麥當勞
    ↑
C6 找零 → B4 特賣比一比
```

---

## 二、系列規模總覽

### 2.1 各單元規模

| 單元 | 主題 | JS 行數 | CSS 行數 | 題庫規模 | 難度 | 狀態 |
|------|------|--------|---------|---------|------|------|
| B1 | 今天帶多少錢 | 1,516 | 1,029 | 39 組場景 | easy/normal/hard | ✅ |
| B2 | 零用錢日記 | 1,669 | 737 | 36 組模板 | easy/normal/hard | ✅ |
| B3 | 存錢計畫 | 2,863 | 1,729 | 14 件商品 | easy/normal/hard | ✅ |
| B4 | 特賣比一比 | 2,078 | 826 | 57 組商品對 | easy/normal/hard | ✅ |
| B5 | 生日派對預算 | 1,403 | 687 | 36 關卡 | easy/normal/hard | ✅ |
| B6 | 菜市場買菜 | 1,997 | 967 | 21 關卡×3 市場 | easy/normal/hard | ✅ |
| **合計** | | **11,526** | **5,975** | | | |

### 2.2 檔案清單

| 單元 | HTML | JS | 單元 CSS |
|------|------|----|---------|
| B1 | `html/b1_daily_budget.html` | `js/b1_daily_budget.js` | `css/b1_daily_budget.css` |
| B2 | `html/b2_allowance_diary.html` | `js/b2_allowance_diary.js` | `css/b2_allowance_diary.css` |
| B3 | `html/b3_savings_plan.html` | `js/b3_savings_plan.js` | `css/b3_savings_plan.css` |
| B4 | `html/b4_sale_comparison.html` | `js/b4_sale_comparison.js` | `css/b4_sale_comparison.css` |
| B5 | `html/b5_party_budget.html` | `js/b5_party_budget.js` | `css/b5_party_budget.css` |
| B6 | `html/b6_market_shopping.html` | `js/b6_market_shopping.js` | `css/b6_market_shopping.css` |

**共用 CSS 載入順序**（每個 B 單元 HTML 均依此順序引入）：
```html
ai-theme.css → shared-game-base.css → b-series.css → bX_unit.css
→ common-modal-responsive.css → dark-mode-simple.css
```

---

## 三、各單元核心設計

### B1 — 今天帶多少錢（Daily Budget）

**教學核心**：看行程費用清單 → 加總 → 選取正確面額硬幣組合

**前置知識**：C4 付款、C5 夠不夠
**後續銜接**：B5 預算管理、B6 完整交易流程

#### 互動流程
```
[設定] 選難度+場景類別
    ↓
[題目] 行程卡片（地點 + 費用 × N 項）
    ↓
[操作] 拖曳硬幣放入錢包 / 輔助點擊模式
    ↓
[確認] 按「出發！」驗證金額是否足夠
    ↓
[回饋] 答對（進度+1）/ 答錯（差額語音提示）
    ↓
[完成] 兩頁式結果頁（回顧→總結）
```

#### 難度設計

| 難度 | 費用顯示 | 合計顯示 | 面額提示 | 特殊設計 |
|------|---------|---------|---------|---------|
| easy | 全顯示 | 顯示 | 不可用面額淡化 | 面額計數摘要、投幣足額彈出動畫 |
| normal | 全顯示 | 隱藏 | 錯 3 次後提示 | 費用明細提示、最少張數提示 |
| hard | **個別費用隱藏** | 隱藏 | 無 | 純靠聆聽語音計算 |

#### 題庫設計
- **39 組場景**（5 種類別：school / food / outdoor / entertainment / shopping）
- 每場景含 2–5 項費用，合計 50–1,500 元
- 設定頁可選「場景類別」篩選（B1 特有）

#### 視覺化特色
- 行程卡：色標（依類別）+ 今日路線條（🏠→🏫→🏠）
- 錢包進度條（藍→橙→綠）
- 面額計數摘要膠囊（`N元×M`）
- 建議硬幣組合動畫卡（逐一飛入）

---

### B2 — 零用錢日記（Allowance Diary）

**教學核心**：記錄一週收支事件 → 計算期末餘額（初始 ± 收入 ± 支出）

**前置知識**：C2 數錢、C3 換錢
**後續銜接**：B3 存錢計畫、B5 派對預算

#### 互動流程
```
[設定] 選難度+日記主題（學校/假日/家庭）
    ↓
[題目] 起始金額 + N 條事件行（收入/支出+金額）
    ↓
[操作] 選擇題（三選一）或數字鍵盤輸入期末餘額
    ↓
[回饋] 答對（連勝徽章）/ 答錯（計算式逐步提示）
    ↓
[完成] 本期收支總計 + 記帳日記回顧 + 最大收支記錄
```

#### 難度設計

| 難度 | 模式 | 題型 | 特殊設計 |
|------|------|------|---------|
| easy | 動畫逐項高亮 | 選擇題（三選一）| 逐項語音（「收入X元」/「花了X元」）+ 週收支統計 |
| normal | 靜態顯示 | 選擇題（三選一）| 錯 ≥3 次→自動顯示計算過程 |
| hard | 數字鍵盤 | 自由輸入 | 語音重聽按鈕🔊 + 漸進提示（第 1 次→範圍，第 2 次→算式）|

#### 日記主題系統（2026-03-29）
- **school**（學校週記）/ **holiday**（假日時光）/ **family**（家庭生活）/ **random**（混合）
- 每主題各有 easy/normal/hard 模板，隨機挑選不重複

#### 視覺化特色
- 收支類型徽章（綠色「收入 📥」/ 紅色「支出 📤」）
- 即時餘額預覽（exact 綠 / over 紅 / under 橙）
- 餘額走勢條（good ≥80% / ok ≥50% / low）
- 收支趨勢指示（↑ 盈餘 / ↓ 赤字）

---

### B3 — 存錢計畫（Savings Plan）

**教學核心**：選定目標商品 → 計算每週存額 → 推算達標週數（price ÷ weekly）

**前置知識**：F6 數的組成（除法概念）
**後續銜接**：B5 派對預算（目標達成後的花費管理）

> **B3 為 B 系列規模最大單元**（JS 2,863 行 / CSS 1,729 行），擁有**雙模式**架構。

#### 雙模式設計

| 模式 | 觸發 | 核心互動 | 教學重點 |
|------|------|---------|---------|
| **月曆拖曳**（easy/normal）| 難度=簡單/普通 | 點格→拖幣→放撲滿 | 每日存錢習慣 |
| **週數計算**（hard）| 難度=困難 | 三選一 or 數字鍵盤 | 除法應用、目標計算 |

#### 月曆模式流程
```
[設定] 選商品金額範圍 + 每日存款金額
    ↓
[月曆] 顯示目標商品圖片 + 進度環 + 撲滿卡片
    ↓
[互動] 點日曆格 → 拖曳金幣/紙鈔 → 放入撲滿 drop zone
    ↓
[動畫] 存錢粒子✨ + 里程碑徽章（25/50/75%）+ 進度環更新
    ↓
[完成] 撲滿達標 → 語音慶祝 → 完成畫面
```

#### 商品資料庫（2026-03-30 重建）

| 難度池 | 條件 | 件數 | 商品（圖片來源）|
|--------|------|------|-------------|
| easy | price ≤ 400 | 6 | 漫畫書/故事書/玩具車/娃娃/遙控車/機器人玩具 |
| normal | price ≤ 800 | 12 | 以上 + 耳機/外套/籃球鞋/藍芽喇叭/滑板/智慧手錶 |
| hard | 全部 | 14 | 以上 + 腳踏車(1500)/平板電腦(3000) |

**圖片來源**：全部使用 `images/c5/icon-c5-*.png`（2026-03-30 廢棄 `images/b3/`）
**渲染路徑**：`_itemIconHTML()` → `../images/${item.img}`（通用格式）

#### 撲滿系統設計
- 面額堆積顯示（硬幣 55px / 紙鈔 90px grid）
- 手動兌換按鈕（10×1元→1×10元，6 條規則）
- 進度環（conic-gradient，`_updateCalendarUI` 同步更新）
- 存款達標日預估（`#b3-est-date`）

#### 週數計算模式（hard）
- 題型：三選一（偏移干擾）或數字鍵盤
- 提示：除法公式（「X元 ÷ Y元/週 ≈ Z週（無條件進位）」）
- 最佳存法對比（slow/correct/fast 三行）
- 週數積木視覺模擬（最多 8 塊，`b3WsimPop` 動畫）

---

### B4 — 特賣比一比（Sale Comparison）

**教學核心**：比較兩店（或三店）價格 → 找出最便宜 → 計算差額節省

**前置知識**：C6 找零（差額計算概念）
**後續銜接**：B5 派對預算（在預算內優化選擇）

#### 三種比較模式（2026-03-29 新增）

| 模式 | 設定 | 題庫 | 特殊互動 |
|------|------|------|---------|
| **雙商店**（預設）| compareStores=two | 30 組 | 選便宜→差額三選一 |
| **三商店排序** | compareStores=triple | 15 組 | 1️⃣2️⃣3️⃣依序點選；hard 需靠記憶 |
| **單位比價** | compareStores=unit | 12 組 | 顯示 qty + 每單位橘標；除法差額 |

#### 難度設計

| 難度 | 選擇互動 | 差額輸入 | 特殊設計 |
|------|---------|---------|---------|
| easy | 選便宜（價格全顯）| 三選一 | 冠軍徽章動畫、10s 自動提示 |
| normal | 選便宜 | 三選一 | 錯 ≥3 次語音說正確答案 |
| hard | 選便宜 | 數字鍵盤 | 三商店需靠記憶（3s 後模糊）|

#### 視覺化特色
- 視覺價差比例條（`_renderPriceBars`，紅/綠漸層）
- 差額百分比標示（「便宜了X%」橙色）
- 差額算式閃現 toast（`X − Y = Z 元`）
- 較貴商品差額標籤（`+N元` 紅色 `b4DeltaIn`）
- 三商店獎台動畫（2nd/1st/3rd `b4PodiumRise`）

#### 完成畫面特色
- 比價歷程表（商品/便宜/較貴/省下）
- 省錢排行榜 top-3 medals
- 總計節省金額橫幅

---

### B5 — 生日派對預算（Party Budget）

**教學核心**：必買商品（強制）+ 自選商品（選購）在預算內取得最大效益

**前置知識**：B1 加總、B2 計算餘額
**後續銜接**：A4 超市購物（完整版購物決策）

#### 關卡結構
- **36 關卡**（easy 12 / normal 12 / hard 8）
- 每關：固定預算 + 2 件必買 + N 件選購
- 難度遞進：預算緊→商品數增→hard 隱藏價格

#### 派對主題系統（2026-03-29）
- **birthday**（生日派對）/ **halloween**（萬聖節）/ **picnic**（野餐）/ **random**
- 每主題各有 `allItems[]` + 3 難度 `scenarios[]`
- 關卡轉場卡顯示主題圖示

#### 難度設計

| 難度 | 價格顯示 | 提示機制 | 特殊設計 |
|------|---------|---------|---------|
| easy | 全顯示 | 可負擔商品高亮（綠色虛線）| 預算儀表條、關卡完美配額特效 |
| normal | 全顯示 | 預算提示鈕（「還能選什麼？」）| 智慧移除建議、超支費用明細 |
| hard | **選購品隱藏「???元」** | 點一次揭示，點兩次才選取 | 必買門檻標線、超支立即 feedback |

#### 視覺化特色
- 預算儀表條（3 色 green→amber→red + 百分比）
- 必買門檻標線（琥珀色垂直線，`#b5-must-marker`）
- 確認按鈕 ready 脈動（`b5ConfirmPulse`）
- 超支震動效果（`b5Shake` keyframe）
- 節省金額徽章 + 預算效率徽章（💎完美/⭐善用/👍不錯/💡節省）
- 派對物品回顧（完成後顯示採購清單泡泡）

---

### B6 — 菜市場買菜（Market Shopping）

**教學核心**：購物清單 → 在攤位找到商品 → 計算總額 → 付款 → 找零

**前置知識**：B1 備錢、B5 清單採購
**後續銜接**：A3 麥當勞、A4 超市（複雜版完整交易）

#### 三市場類型系統（2026-03-29）

| 市場 | 攤位 | 特色商品 | 語音前綴 |
|------|------|---------|---------|
| traditional（傳統市場）| 4 攤 | 蔬菜、豆腐、雞蛋等 | 「歡迎來到傳統市場！」|
| supermarket（超市）| 3 攤 | 包裝食品、乳製品 | 「歡迎來到超市！」|
| nightmarket（夜市）| 4 攤 | 小吃、飲料、零食 | 「歡迎來到夜市！」|

#### 遊戲流程（每關）
```
[進場] 關卡任務彈窗（商品清單 + 預算）
    ↓
[採購] 攤位切換 → 點商品收集（商品飛出收據動畫）
    ↓
[確認] 結帳確認清單彈窗（合計 + 確認按鈕）
    ↓
[付款] 面額選擇 → 貪婪演算法最佳提示
    ↓
[找零] 三選一（普通）或計算式輸入（困難）
    ↓
[結果] 關卡完成轉場卡（1.5s）→ 下一關 or 完成
```

#### 難度設計

| 難度 | 付款方式 | 找零方式 | 特殊設計 |
|------|---------|---------|---------|
| easy | 自動計算 | 自動填入 | 付款最佳面額提示鈕 |
| normal | 手動選面額 | **三選一**（偏移干擾）| 精準付款（找零=0）特效 |
| hard | 手動選面額 | **計算式輸入** | 找零兩段漸進提示 + 幫我算一算展開板 |

#### 視覺化特色
- 攤位徽章（紅色待收件數 / 綠色✓已完成）
- 商品飛出收據（`b6FlyoutUp` 1s 動畫）
- 浮動購物籃徽章（`b6CartPop`，藍→綠）
- 攤位完成閃光（`b6StallFlash` 800ms）
- 全部收集閃光（`b6AllDoneIn` 深綠全屏 1.5s）
- 攤位消費分析橫條圖（完成畫面）
- 付款效率環形圖（精準付款次數 SVG）

---

## 四、共同技術架構

### 4.1 Game 物件標準結構

所有 B 系列單元均遵循此架構：

```javascript
Game = {
    // ── 1. Debug 系統
    Debug: {
        FLAGS: { all: false, init: false, ui: false, speech: false, quiz: false },
        log(cat, ...args),
        warn(cat, ...args),
        error(...args)
    },

    // ── 2. 計時器管理（禁用裸 setTimeout）
    TimerManager: {
        setTimeout(fn, ms, category),
        clearByCategory(cat),
        clearAll()
    },

    // ── 3. 事件管理（禁用重複綁定）
    EventManager: {
        on(el, type, fn, opts, category),
        removeByCategory(cat),
        removeAll()
    },

    // ── 4. 語音系統
    Speech: {
        speak(textOrKey, callback, onerror)
    },

    // ── 5. 音效系統
    audio: {
        init(),
        play(name)   // 'correct' | 'error' | 'click' | 'coin' | 'success'
    },

    // ── 6. 狀態管理
    state: {
        settings: {
            difficulty: null,         // 'easy' | 'normal' | 'hard'
            questionCount: null,      // 題數（B1~B4）
            retryMode: null,          // 'retry' | 'proceed'（B1~B4）
            clickMode: null,          // 'assist' | 'normal'
            // 各單元專屬設定...
        },
        quiz: {
            currentQuestion: 0,
            totalQuestions: 0,
            correctCount: 0,
            streak: 0,
            startTime: null,
            questions: []
        },
        isEndingGame: false,
        isProcessing: false
    },

    // ── 7. 核心流程
    init(),
    renderWelcomeScreen(),
    bindSettingEvents(),
    startGame(),
    renderQuestion(),
    handleAnswer(answer),
    showResults()
}
```

### 4.2 init() 標準流程

```javascript
init() {
    Game.TimerManager.clearAll();             // 清空所有計時器
    Game.EventManager.removeAll();             // 移除所有事件監聽
    this.injectGlobalAnimationStyles();        // 注入全局 CSS 動畫（防重複 id 守衛）
    this.audio.init();                         // 初始化音效
    this.renderWelcomeScreen();                // 顯示設定頁
}
```

### 4.3 場景切換規範

| 切換點 | 必須執行 |
|--------|---------|
| `renderWelcomeScreen()` | `TimerManager.clearAll()` + `EventManager.removeByCategory('gameUI')` |
| `startGame()` | `EventManager.removeByCategory('settings')` |
| `showResults()` | `TimerManager.clearByCategory('turnTransition')` |

### 4.4 題目生成策略

| 單元 | 策略 | 防重複機制 |
|------|------|----------|
| B1 | `B1_SCENARIOS` 靜態池隨機抽取 | `usedIndices` Set |
| B2 | `B2_THEMES` 動態生成 | `usedKeys` Set（key=主題+起始金額+事件組合）|
| B3 | `B3_ALL_ITEMS` × `B3_WEEKLY_OPTIONS` | `usedKeys` Set（key=名稱+週存額）|
| B4 | `B4_ITEMS` 靜態池 | `usedIndices` Set |
| B5 | `B5_THEMES[theme].scenarios[diff]` 關卡序列 | 順序制（不隨機）|
| B6 | `_currentMissions[diff]` 關卡序列 | 順序制（不隨機）|

### 4.5 全域資料物件

```javascript
// B1
const B1_SCENARIOS = [ { name, cat, items:[{label,cost}] }, ... ]  // 39 組

// B2
const B2_THEMES = { school:{easy:[],normal:[],hard:[]}, holiday:{}, family:{} }

// B3
const B3_ALL_ITEMS = [ { name, price, icon, img, cat }, ... ]      // 14 件
const B3_WEEKLY_OPTIONS = { easy:[], normal:[], hard:[] }

// B4
const B4_ITEMS = [ { name, optA:{store,price}, optB:{store,price}, cat }, ... ]
const B4_TRIPLE_ITEMS = [ ... ]    // 三商店排序用，15 組
const B4_UNIT_ITEMS = [ ... ]      // 單位比價用，12 組

// B5
const B5_THEMES = { birthday:{allItems:[],scenarios:{}}, halloween:{}, picnic:{} }

// B6
const B6_MARKETS = { traditional:{stalls:{},missions:{}}, supermarket:{}, nightmarket:{} }
const B6_STALLS  = { ... }   // 攤位名稱/圖示映射
```

---

## 五、語音系統設計

### 5.1 語音選擇優先順序（全系列統一）

```javascript
const VOICE_PRIORITY = [
    v => v.name.includes('Microsoft HsiaoChen Online'),  // 最佳：微軟雅婷
    v => v.name.includes('Google 國語'),                  // 次選：Google 繁中
    v => v.lang?.startsWith('zh-TW'),                     // 三選：任何台灣中文
    v => v.lang?.startsWith('zh'),                        // 兜底：任何中文
];
// 最終回退：voices[0]
```

### 5.2 語音觸發時機

| 時機 | 觸發條件 | 語音內容 |
|------|---------|---------|
| 進入場景 | 題目渲染完成後 800ms | 題目內容朗讀 |
| 放幣/選商品 | 每次互動後 80ms | 面額/商品名稱+價格 |
| 答對 | 即時 | 鼓勵語句 |
| 答錯 | 即時 | 提示語句 + callback → 提示語音 |
| 里程碑 | 進度達 25/50/75% | 「太棒了！已達成 X%！」|
| 完成 | 完成畫面渲染後 1s | 成績總結摘要 |

### 5.3 金額語音轉換（共用 `number-speech-utils.js`）

```javascript
// B 系列使用（與 C/A 系列相同規則）
const speech = convertToTraditionalCurrency(amount);
// 200 → 「兩百元」；1200 → 「一千兩百元」
// 「2」規則：百/千/萬位及帶單位唸「兩」，個位唸「貳」
```

### 5.4 各單元語音特色

| 單元 | 特色語音設計 |
|------|------------|
| B1 | 放幣即播（80ms delay），足額「金額足夠，可以出發了！」|
| B2 | 每事件行動畫高亮時同步語音（收入/支出方向），困難模式重聽按鈕 |
| B3 | 存錢目標彈窗語音、里程碑語音、週數答對「每週X元，需要Y週，就能買Z了！」|
| B4 | 選對即播「X店，Y元，比較便宜！」含雙店價格朗讀 |
| B5 | 選商品播「{名稱}，{價格}元」；取消播「取消{名稱}」；轉場語音「第N關」|
| B6 | 攤位切換「X攤，要找Y和Z」；全部收集「已全部收集！」|

---

## 六、輔助點擊系統（AssistClick）

### 6.1 設計原則

- 啟用後，任意點擊執行下一步（Action Queue 驅動）
- 高亮提示 + 語音引導同步觸發
- 完全不影響普通模式體驗
- 使用 `isTrusted` 防止自動化繞過

### 6.2 各單元 AssistClick 行為

| 單元 | AssistClick 行為 |
|------|----------------|
| B1 | `_pendingAction` 單步模式，貪婪選最大面額→投幣→confirm |
| B2 | easy 高亮正確選項；normal/hard 逐位數輸入+確認 |
| B3 | hard 模式：純 numpad 逐位數+ok 鍵 |
| B4 | select 高亮正確卡；diff 按模式分岔；三商店 hard 依 rankOrder 逐張 |
| B5 | confirm 可點則直接高亮；否則高亮可負擔商品 |
| B6 | shopping→切攤位→點商品→checkout；payment→貪婪選面額→pay；change→正確選項 |

### 6.3 遮罩 z-index 規範

```
標題列        z-index: 100
遊戲彈窗      z-index: 10000–10099
輔助點擊遮罩   z-index: 10100
任務/提示彈窗  z-index: 10050（輔助模式）/ 10200（普通模式）
```

---

## 七、視覺回饋與動畫系統

### 7.1 通用回饋模式

| 反饋類型 | 視覺效果 | 音效 | 語音 |
|---------|---------|------|------|
| ✅ 答對 | 綠色 checkmark + 0.5s 動畫 | `correct.mp3` | 鼓勵語句 |
| ❌ 答錯 | 紅色 × + shake 動畫 | `error.mp3` | 提示語句 |
| 💡 提示 | 黃色脈動邊框 + 高亮 | `click.mp3` | 提示內容 |
| 🎉 完成 | confetti v1.9.2 煙火 | `success.mp3` | 成績總結 |

### 7.2 各單元獨特動畫

| 單元 | 動畫名稱 | 觸發條件 | 說明 |
|------|---------|---------|------|
| B1 | `b1TotalPop` | 首次投幣足額 | 合計金額彈出放大 |
| B1 | `b1CoinPopup` | 每次放幣 | 「+N元」浮動膠囊上飄 |
| B1 | `b1ExactGlow` | 金額剛好符合 | 行程卡片綠光脈動 |
| B2 | `b2AnswerGlow` | 選題正確 | 綠色光暈 |
| B2 | `b2AnswerShake` | 選題錯誤 | 紅色抖動 |
| B3 | `b3MilestonePop` + `b3MilestoneFade` | 達 25/50/75% | 中央浮動徽章彈出淡出 2.2s |
| B3 | `b3SparkleUp` | 每次存錢完成 | 5 顆粒子飛散 |
| B3 | `b3WsimPop` | 週數積木模擬 | 積木逐個延遲 90ms 彈出 |
| B4 | `b4PodiumRise` | 三商店正確排序後 | 1st/2nd/3rd 獎台升起 |
| B4 | `b4ChampIn` + `b4ChampOut` | easy 答對 | 冠軍徽章淡入淡出 1.6s |
| B5 | `b5RtIn` | 每關開始 | 關卡轉場卡彈出 1.1s |
| B5 | `b5PerfectPulse` | 完美配額（剩餘=0）| 特效 2 次脈動 |
| B6 | `b6AllDoneIn` | 全部商品收集完 | 深綠全屏閃光 1.5s |
| B6 | `b6FlyoutUp` | 收集商品 | icon+name+價格浮標上飄 1s |

### 7.3 連勝徽章系統（全系列統一，2026-03-28）

- `quiz.streak` / `game.streak` 計數（答對+1，答錯清零）
- 達 3 連勝 → `_showStreakBadge(3)` → 橘金色「3️⃣ 連續答對！」
- 達 5 連勝 → `_showStreakBadge(5)` → 「🔥 5 連勝！」
- 動畫：`bXSbPop`（各單元專屬 class prefix）

---

## 八、完成畫面設計

### 8.1 B 系列完成畫面標準（對齊 C/F 系列）

```
┌────────────────────────────────┐
│  紫色漸層背景                   │
│  linear-gradient(135deg,       │
│    #667eea 0%, #764ba2 100%)   │
├────────────────────────────────┤
│  [🏆 bounceIn 動畫]            │
│  [🥇/🥈/🥉/⭐ 勳章徽章]         │
│  正確率 ≥90%→🥇優異             │
│  正確率 ≥70%→🥈良好             │
│  正確率 ≥50%→🥉努力             │
│  其他    →⭐練習                │
│                                │
│  [統計卡片 × 3]                │
│  ├─ 答對題數 / 總題數           │
│  ├─ 正確率百分比               │
│  └─ 完成時間                   │
│                                │
│  [單元專屬回顧區]               │
│  ├─ B1：行程費用清單            │
│  ├─ B2：記帳日記回顧+收支總計  │
│  ├─ B3：存錢目標清單+統計      │
│  ├─ B4：比價歷程表+省錢排行榜  │
│  ├─ B5：派對物品回顧+預算統計  │
│  └─ B6：採購收據+攤位消費分析  │
│                                │
│  [🔄 再玩一次]  [⚙️ 返回設定]   │
│  [confetti 煙火]               │
└────────────────────────────────┘
```

### 8.2 兩頁式結果（B1~B3、B5、B6）

- 第一頁：統計 + 回顧
- 第二頁：總結 + 返回按鈕

---

## 九、觸控與桌面支援

### 9.1 事件策略

| 互動類型 | 桌面 | 觸控 |
|---------|------|------|
| 按鈕點擊 | `click` | `touchstart` + `click` 防重複 |
| 拖曳放置 | HTML5 DnD | `TouchDragUtility`（`touch-drag-utility.js`）|
| 月曆存錢（B3）| HTML5 DnD | `TouchDragUtility._initCalendarDragAndDrop` |
| 硬幣放入（B1）| HTML5 DnD | Touch events |

### 9.2 TouchDragUtility（`js/touch-drag-utility.js`）

```javascript
// 使用模式
TouchDragUtility.init({
    draggableSelector: '.b3-drag-coin',
    dropzoneSelector: '.b3-drop-slot',
    onDrop: (dragged, target) => { ... },
    onCleanup: () => { ... }
});
TouchDragUtility.cleanupAll();  // 場景切換時必須呼叫
```

### 9.3 防快速連點

- 所有互動均設 `state.isProcessing` 旗標
- 輔助點擊模式：600ms 防重複
- 付款確認：`waitingForConfirmPayment` 守衛

---

## 十、RWD 版面設計

### 10.1 斷點策略（繼承 B 系列共用 CSS）

| 斷點 | 條件 | 版面說明 |
|------|------|---------|
| 手機縱向 | `max-width: 480px` | 單欄、字體縮小、按鈕全寬 |
| 平板 | `max-width: 768px` | 部分雙欄、中等間距 |
| 桌面 | `min-width: 769px` | 最大寬度限制、居中布局 |

### 10.2 各單元版面結構

#### B1（行程清單 + 錢幣盤）
```
┌──────────────────────┐
│ 標題列（題數/分數）   │
├──────────────────────┤
│ 行程卡片              │ ← 費用清單，色標依類別
│ 今日路線條 🏠→📍→🏠  │
├──────────────────────┤
│ 錢包放置區            │ ← drop zone
│ 進度條 / 面額摘要     │
├──────────────────────┤
│ 錢幣盤（4×N grid）   │ ← draggable coins
│ [出發！] 按鈕        │
└──────────────────────┘
```

#### B3（月曆模式雙欄）
```
┌──────────┬───────────┐
│ 月曆格子  │ 撲滿卡片  │
│ 日期格   │ 進度環    │
│ (點擊)   │ 面額堆積  │
│          │ 兌換按鈕  │
├──────────┴───────────┤
│ 今日可存金錢卡（常駐）│
└──────────────────────┘
```

#### B5（商品卡片網格）
```
┌──────────────────────┐
│ 標題列（關卡/預算）   │
├──────────────────────┤
│ 預算儀表條 + 門檻標線 │
├──────────────────────┤
│ 必買區（2 張卡，鎖定）│
├──────────────────────┤
│ 選購區（N 張卡，自由）│
│ ┌──┐ ┌──┐ ┌──┐      │
│ │卡│ │卡│ │卡│      │
│ └──┘ └──┘ └──┘      │
├──────────────────────┤
│ [確認採購] 按鈕       │
└──────────────────────┘
```

---

## 十一、B 系列 vs A/C/F 系列比較

### 11.1 互動模式對比

| 系列 | 主要互動 | 題目節奏 | 情境深度 |
|------|---------|---------|---------|
| F 系列 | 拖放/計數/排序 | 快（5–15s）| 抽象（數字為主）|
| C 系列 | 點選/聽音/判斷 | 快（5–10s）| 概念（錢幣識別）|
| **B 系列** | **計算+判斷+選擇** | 中（20–40s）| **情境（場景決策）**|
| A 系列 | 完整交易流程 | 慢（30–90s）| 高（真實模擬）|

### 11.2 難度設計對比

| 難度維度 | F/C 系列（知識測驗）| B 系列（決策應用）|
|---------|-------------------|-----------------|
| 簡單 | 視覺完整 + 直接點選 | 提示充足 + 選項明確 |
| 普通 | 部分遮蔽 + 計算要求 | 多步驟計算 + 引導提示 |
| 困難 | 純聽覺/純輸入 | 資訊隱藏 + 自主決策 |

### 11.3 B 系列獨有設計語言

1. **多重約束**：預算上限 + 必買下限 + 時間限制（B5/B6）
2. **視覺化進度**：存錢進度環、預算儀表條、里程碑徽章
3. **情境多樣性**：39 組場景（B1）、3 市場類型（B6）、3 派對主題（B5）
4. **算式即時揭示**：錯誤後顯示計算公式（B2/B3/B4/B6 均實現）
5. **決策輔助**：智慧移除建議（B5）、最佳存法提示（B3）、最佳面額貪婪演算（B6）

---

## 十二、Rounds 24–39 豐富化總覽

> 本節記錄 2026-03-25 至 2026-03-30 間的主要功能新增（Rounds 24–39）

### Round 24–25：基礎豐富化
- B1：放幣語音、開題彈窗、最少張數提示
- B2：計算過程提示（`_showCalcBreakdown`）
- B3：除法公式提示（`_showDivisionHint`）、里程碑徽章
- B4：差額算式提示（`_showDiffFormulaHint`）、視覺比例條
- B5：智慧移除建議、預算提示鈕、關卡轉場卡
- B6：付款最佳面額提示（`_showPaymentHint`）、困難找零三選一

### Round 26–28：語音 + 分析深化
- B1/B2/B3/B4/B5/B6：各單元語音反饋強化（足額提示、選商品語音、攤位切換語音）
- B4：困難差額提示鈕
- B1~B6：連勝徽章（`quiz.streak`）全系列統一
- B4：三商店排序模式（`B4_TRIPLE_ITEMS` 15 組）
- B1：最少張數提示（`_calcOptimalCoins`）
- B5：預算儀表條、confirm 脈動動畫

### Round 29：主題化系統
- B1：39 組場景 + 5 種場景類別篩選
- B2：日記主題系統（school/holiday/family）
- B3：目標類別篩選（toy/book/outdoor/tech）
- B4：商品類別篩選 + 單位比價模式（12 組）
- B5：派對主題系統（birthday/halloween/picnic）
- B6：三市場類型（traditional/supermarket/nightmarket）
- B1~B6：輔助點擊（AssistClick）完整實作

### Round 30–39：精細化體驗
- B1：今日路線條、投幣足額動畫、費用佔比條
- B2：起止對比條、即時餘額預覽、收支趨勢指示
- B3：進度環、存錢粒子、預估達標日、週存積木模擬
- B4：冠軍徽章、10s 自動提示、困難記憶倒數
- B5：超支費用明細、必買門檻標線、各關預算效率星評
- B6：商品飛出收據、全部收集閃光、付款效率環形圖、幫我算一算面板

### 2026-03-30：B3 商品重建
- 廢棄 `images/b3/`（14 張圖片，與商品名稱不一致）
- 全面改用 `images/c5/` 共 14 張圖片
- 渲染函數由 `../images/b3/${item.img}` 改為通用 `../images/${item.img}`
- 商品重建為 14 件（漫畫書～平板電腦）

### Round 40（2026-03-30）：互動精細化
- **B6**：找零計算輔助面板（`b6-calc-panel`）— 可展開的直式減法算式（付了X − 花了Y = 找零?元）
- **B3**：週存視覺模擬積木（`b3-wsim`）— 答錯時積木式週數進度預覽（最多 8 格，超出顯示溢出徽章）
- **B1**：最佳硬幣組合逐一動畫（`_animateHintCoins`）— 每 280ms 依序彈出建議硬幣圖示 + 累計金額
- **B1**：硬幣放入浮動標籤（`.b1-coin-popup`）— 放幣時綠色「+N元」膠囊從錢包區上方升起淡出
- **B2**：困難模式語音重聽按鈕（`#b2-replay-btn`）— 淺藍膠囊，點擊重播全部事件語音
- **B4**：10 秒無操作自動提示（`_selectHintTimer`）— easy/normal 模式 10s 後綠框脈動（`b4AutoHint`）+ 語音提示

### 2026-03-31：B3 輔助點擊設定頁修正
- 輔助點擊群組改為**「簡單」模式才顯示**（原為「困難」模式）
- 位置：移至難度選擇按鈕正下方（`diff-desc` 之後），與 B1 規範一致
- `clickMode` 預設值：`null` → `'off'`
- 切換難度時，若非簡單模式則自動重置 clickMode 並清除 active 狀態
- 搜尋關鍵字：`assist-click-group`、`clickMode: 'off'`

### 2026-03-31（Round 42）：B5 必買/選購分組 + B3 4選項 + B1 逐項語音

**B5 必買/選購分組佈局（A4 商品分類 pattern）**
- `_renderRoundHTML` 拆成兩個 `b5-section-group`：必買（琥珀色頭部）+ 選購（翠綠頭部）
- 必買區顯示固定小計（元），選購區顯示可用預算（動態更新）
- `_updateTotalBar` 加 `#b5-opt-budget` 即時顯示選購餘額（含超出紅字提示）
- 所有 `.b5-item-card` 選擇器不受 HTML 分組影響（class 選擇器）

**B3 簡單模式選項擴充4個 + 結構化干擾項（C1 adaptive pool pattern）**
- `_generateChoices` 由 `opts.size < 3` 改為 `< 4`
- 結構化干擾：`correct-1`（最常見忘進位）、`correct+1`、`ceil(correct*0.6)`、`correct+2`
- `b3-choices-4` CSS grid `grid-template-columns: 1fr 1fr`（2×2 格局）
- `_renderChoicesHTML` 依 `choices.length >= 4` 動態加 class

**B1 費用項目逐一語音播報（C2 逐項朗讀 pattern）**
- `renderQuestion` 簡單模式：400ms 說場景簡介，2400ms 啟動 `_speakItemsOneByOne`
- `_speakItemsOneByOne`：遞迴 `next()`，950ms/項，結束後 500ms 說「總共N元」
- 僅 easy 模式啟動；頁面切換時 `TimerManager.clearAll()` 自動中止

### 2026-03-31（Round 41）：B2 簡單模式事件卡片視覺強化
- **B2**：`.b2-diary` 加 `data-diff="${diff}"` + `.b2-event-row` 加 `${e.type}` class
- CSS 屬性選擇器 `[data-diff="easy"]`：收入列→淡綠卡片（左 5px 綠框）、支出列→淡紅卡片（左 5px 紅框）
- 字體放大（icon 28px，name 17px bold，amount 1.45rem），無須改動 HTML 結構
- 不影響普通/困難模式，`_animateEasyEntries` 的 class 操作不受額外 class 干擾
- 遵循 **F1 視覺配對大色塊** + **A4 彩色邊框卡片** 雙 pattern

### 2026-03-31（Round 41）：B4 動態價格浮動（普通/困難模式 ±10%/±20%）
- **B4**：`_generateQuestions` 兩商店分支加入隨機浮動（C5 PriceStrategy pattern）
- 普通 ±10%、困難 ±20%，取整到 5 元（避免奇怪數字）
- 安全守衛：若浮動後 `priceA ≤ priceB` 則不套用（保持 optA 恆貴）
- 簡單模式固定、三商店/單位比價跳過，確保向後相容
- 搜尋關鍵字：`價格動態變化`、`pct = difficulty === 'hard'`、`finalItem`

### 2026-03-31：B3 商品資料庫擴充（14 → 20 件）
- 新增 6 件商品（均使用現有 C5 圖片，無需新增圖片）
- **easy 新增**（price ≤ 400）：鉛筆盒 180元（book）、日記本 240元（book）、計算機 340元（tech）
- **normal 新增**（price ≤ 800）：運動上衣 450元（outdoor）、運動褲 520元（outdoor）
- **hard 新增**：手機 4500元（tech）
- priceRange 篩選變化：≤300 從 3→5 件，≤500 從 7→11 件，≤800 從 12→17 件
- 詳細對照見 `report/B3_Items_Image_Filenames.md`

---

## 十三、已知問題與修復記錄

### 13.1 已修復的重要問題

| 問題 | 影響單元 | 修復搜尋關鍵字 |
|------|---------|-------------|
| B 系列設定頁無預選（無法「開始」）| 全部 | `questionCount: null`, `retryMode: null` |
| 完成畫面 CSS 死碼（舊系統殘留）| 全部 | `b-series.css` 清除 85 行舊 `.b-completion` |
| `speak()` try-catch 缺失 | 全部 | `speechSynthesis.speak` 同步例外處理 |
| `setInterval` 改遞迴 | B3 月曆 | `_startCalendarSession` 使用 TimerManager |
| B3 圖片與商品名不一致 | B3 | 2026-03-30 全面重建 |
| B3 輔助點擊顯示於錯誤難度（困難→簡單） | B3 | `assist-click-group`、`clickMode: 'off'` |
| B2 難模式題庫不足 | B2 | 6→12 組（2026-03-24）|

### 13.2 Debug 使用方式

```javascript
// 啟用所有 debug 輸出
Game.Debug.FLAGS.all = true;

// 啟用特定類別
Game.Debug.FLAGS.speech = true;    // 語音
Game.Debug.FLAGS.quiz = true;      // 題目生成
Game.Debug.FLAGS.ui = true;        // UI 渲染

// 搜尋位置
// B1~B6: Grep `Game.Debug.FLAGS`
```

---

## 十四、未來開發建議

### 14.1 待強化項目

| 優先級 | 項目 | 說明 |
|--------|------|------|
| 高 | B3 月曆模式平板優化 | 雙欄在 iPad 上偶有版面擠壓 |
| 高 | B6 付款流程輔助點擊完整覆蓋 | hard 模式找零計算輸入未支援 AssistClick |
| 中 | B2 難度模式增加「完全自由輸入」| 目前 hard 仍有引導提示，可再強化 |
| 中 | B4 單位比價增加更多題型 | 目前 12 組，可擴充至 20 組 |
| 低 | B5 預算值動態調整 | 教師可自訂各關預算值 |

### 14.2 B 系列與 A 系列連動建議

```
B1（帶多少錢）→ A5（ATM 提款）：「提款前要知道帶多少錢」
B3（存錢計畫）→ A4（超市購物）：「存到錢後去超市購物」
B6（菜市場）  → A3（麥當勞）  ：「買菜回家，還是外食？」
```

### 14.3 題庫擴充計畫

| 單元 | 現有 | 建議擴充 | 說明 |
|------|------|---------|------|
| B1 | 39 組場景 | 50+ 組 | 補充「社區活動」類別 |
| B2 | 36 組模板 | 50+ 組 | 補充「暑假」主題 |
| B3 | 20 件商品 ✅ | — | 已完成（2026-03-31 擴充至 20 件）|
| B4 | 57 組商品對 | 70+ 組 | 補充「服飾類」比價 |
| B6 | 21 關 | 30 關 | 夜市類型補充更多關卡 |

---

> **參考文件**：
> - [B_Series_Unit_Completion_Report.md](B_Series_Unit_Completion_Report.md)（完整歷史記錄，8,907 行）
> - [B1_Unit_Completion_Report.md](B1_Unit_Completion_Report.md) ～ [B6_Unit_Completion_Report.md](B6_Unit_Completion_Report.md)
> - [B3_Items_Image_Filenames.md](B3_Items_Image_Filenames.md)（商品圖片索引）
> - [Code_Templates.md](Code_Templates.md)（共用程式碼模板）
