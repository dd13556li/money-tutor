# B 系列：預算規劃 — 單元完成報告書

> **建立日期**：2026-03-14（初版）
> **更新日期**：2026-03-15（品質提升：語音系統、重試模式、吉祥物）
> **更新日期**：2026-03-15（第二輪：resetGameState、convertToTraditionalCurrency、韓文修正）
> **更新日期**：2026-03-15（第四輪：speak() 簽名統一、convertToTraditionalCurrency 安全防護）
> **更新日期**：2026-03-15（完成度提升：吉祥物圖片、學習成果區塊、bGlow、B1 retryMode、難度說明框、作業單整合）
> **更新日期**：2026-03-15（第六輪：backToMenu href 修正、B1/B2 toTWD 語音品質提升）
> **更新日期**：2026-03-15（第七輪：設定頁卡片佈局、b-header 測驗標題、Speech 語音升級、按鈕順序修正、完成畫面 CSS 補齊）
> **更新日期**：2026-03-15（第八輪：金幣圖示 CSS 尺寸修正、標題列重構、設定頁標題加單元代碼、B4 toTWD 補齊 + _diffDescs 統一命名）
> **更新日期**：2026-03-15（第九輪：完成畫面全系列統一 — B1/B4 移除 sticky header、統一 CSS class 命名、加入單元專屬標題；B2/B3/B5/B6 補齊 EventManager.removeByCategory('gameUI')）
> **更新日期**：2026-03-15（第十輪：`_bindSettingsEvents()` 加入 `EventManager.removeByCategory('settings')` 守衛，防止多次返回設定頁時監聽器累積）
> **更新日期**：2026-03-15（第十一輪：B4 補齊 `backToMenu()` 函數；B1/B4 設定頁返回主選單按鈕改呼叫 `Game.backToMenu()`）
> **更新日期**：2026-03-16（第十四輪：內嵌語音重播按鈕移至題目文字旁、B1 錢幣改為拖曳放置互動）
> **更新日期**：2026-03-16（第十五輪：對照 F/C/A 系列 report 修正 — voices[0] 終極回退、完成畫面 CSS 外部化、移除死碼）
> **更新日期**：2026-03-16（第十六輪：speak() onerror 加入錯誤日誌、B6 wrong-tip CSS 外部化、B1 b1-inline-replay → b-inline-replay）
> **更新日期**：2026-03-16（第十七輪：對照 F/C/A 系列 — gameCompleted → isEndingGame 命名統一；B4 dead b4Glow 清除）
> **更新日期**：2026-03-17（第十八輪：對照 F/C/A 系列全面合規稽核 — 14 項指標全數通過，無程式碼修改）
> **更新日期**：2026-03-17（第十九輪：設定頁按鈕樣式統一 — B2/B3/B5/B6 selection-btn → b-sel-btn + b-diff-* 難度色彩）
> **更新日期**：2026-03-17（第二十輪：speak() try-catch 包裝 — 對齊 C1 第六項語音安全機制，防止 speechSynthesis.speak() 同步拋出例外時 safeCallback 無法執行）
> **更新日期**：2026-03-18（第二十一輪：對照 F/C/A 系列 report — audio.play() try-catch 補齊（B2/B3/B5/B6）、Debug FLAGS 補 'speech' 旗標（B2/B5/B6））
> **更新日期**：2026-03-18（第二十二輪：對照 F/C/A 系列 report — B3 speak() 移除多餘 undefined 引數、B1/B4 Speech.speak 命名統一 this→Game）
> **更新日期**：2026-03-18（第二十三輪：對照 B1/B4 — B2/B3/B5/B6 設定頁 CSS 類別遷移：setting-group→b-setting-group、button-group→b-btn-group、label→label.b-setting-label）
> **更新日期**：2026-03-18（第二十四輪：對照 A/C/F 系列 — speak() 語音速率 0.9→1.0（全 B 系列）、移除 B1 state.settings 死碼 assistClick: false）
> **更新日期**：2026-03-18（第二十五輪：對照 A2 系列 — speak() 語音語系由硬編碼 'zh-TW' 改為 cachedVoice?.lang || 'zh-TW'（全 B 系列））
> **更新日期**：2026-03-18（第二十六輪：對照 A/C/F 系列全面合規稽核 — 無程式碼修改；修正報告 CSS 清單缺漏（B2~B6 補 ai-theme.css / common-modal-responsive.css / dark-mode-simple.css，B1 修正載入順序））
> **更新日期**：2026-03-20（第二十七輪：對照 F/C/A 系列 report — `b-series.css` 死碼清除；參照 F/C/A 系列測驗版面建立標準，補充 B 系列測驗版面結構說明與 CSS 架構文件）
> **更新日期**：2026-03-21（第二十八輪：設定頁無預選、B3 簡單模式月曆改版、設定頁視覺提升）
> **更新日期**：2026-03-21（第二十九輪：B3 月曆 UX 修正 — 任務彈窗、整合資訊卡、進度條改版、in-place DOM 更新、🐷 撲滿圖示）
> **更新日期**：2026-03-21（第三十輪：B3 月曆大改版 — 真實金錢動畫、自訂物品上傳、撲滿右側卡片、雙欄版面）
> **更新日期**：2026-03-21（第三十一輪：B3 撲滿卡片重設計 — 面額分組表格佈局、貪婪分解顯示、進位換算提示）
> **更新日期**：2026-03-23（十二～二十二節新增：學習目標、難度對照表、遊戲流程、資料庫結構、B3 月曆詳解、檔案規模、JS 依賴、B1 拖曳架構、RWD 版面、動畫系統、瀏覽器相容性、狀態管理、未來開發建議；二十三～二十七節新增：未來建議、Game物件架構、答題流程詳解、作業單系統、總結評估）
> **更新日期**：2026-03-23（二十八～三十四節新增：設定頁面規格、測驗畫面版面、語音模板詳解、音效系統詳表、Bug格式化記錄、技術注意事項、B系列vs其他系列比較）
> **更新日期**：2026-03-23（三十五～三十八節新增：Debug系統使用指南、各單元測試步驟、修復記錄函數位置表、各單元教學使用注意事項）
> **更新日期**：2026-03-23（三十九～四十二節新增：CSS規格與品質分析、動畫清單詳表、各單元題庫內容摘要、程式碼品質指標與合規稽核）
> **更新日期**：2026-03-23（四十三～四十七節新增：B 系列測驗內容特色深析、各單元難度設計詳表、B vs A/C/F 測驗方式比較、B3 月曆模式完整測驗規格、強化建議、題庫規模對照）
> **更新日期**：2026-03-24（建立 B1~B6 各單元獨立報告，對齊 A/C/F 系列格式）
> **更新日期**：2026-03-24（第四輪豐富化：B2 困難模式題庫 6→12 組；新增五十三～五十六節：A3 場景管理→B6、C4 鬼影提示→B1/B5、C6 兩階段找零→B6 困難、F6 三模式→B2 多模式擴展設計規格）
> **更新日期**：2026-03-24（第五輪豐富化：B2 easy/normal 題庫各 8→12 組（總計 36 組）；修正 §3.2 #7/#8 過時資料；新增五十七～五十九節：C5 PriceStrategy→B4 動態價格、A4/A2 ClickMode→B6 完整輔助點擊設計、F4/F5 差分計分→B 系列遊戲化升級規格；更新 B3/B4/B5 各單元報告）
> **更新日期**：2026-03-24（第六輪豐富化：B4_ITEMS 20→30 組、B6_MISSIONS 各難度 5/6/5→8 組並修正 hard 表過時資料；新增六十～六十二節：A5 狀態機→B6 Phase 精化、F2 唱數動畫→B3 存款動畫升級、C2 逐項點擊計數→B2 累算輔助具體規格；更新所有題庫統計數據）
> **更新日期**：2026-03-24（第七輪豐富化：B3_ALL_ITEMS 14→20 件（easy 3→6/normal 11→15/hard 14→20）、B5_SCENARIOS easy/normal 8→12 組；新增六十三～六十五節：A6 找零面額分解→B6 視覺化找零展示、C3 換錢多輪→B3 月曆里程碑系統、A1 coinFirst 解鎖→B5 必買解鎖/B6 攤位漸進解鎖設計規格）
> **系列**：B 預算規劃（B1～B6）
> **開發原則**：從 C 系列移植最佳實踐，對齊 A 系列完成度標準
>
> **各單元獨立報告**（詳細測驗內容 / 題庫 / 流程，參照 A1/C1/F1 格式）：
> - [B1_Unit_Completion_Report.md](B1_Unit_Completion_Report.md) — 今天帶多少錢
> - [B2_Unit_Completion_Report.md](B2_Unit_Completion_Report.md) — 零用錢日記
> - [B3_Unit_Completion_Report.md](B3_Unit_Completion_Report.md) — 存錢計畫
> - [B4_Unit_Completion_Report.md](B4_Unit_Completion_Report.md) — 特賣比一比
> - [B5_Unit_Completion_Report.md](B5_Unit_Completion_Report.md) — 生日派對預算
> - [B6_Unit_Completion_Report.md](B6_Unit_Completion_Report.md) — 菜市場買菜

---

## 一、系列概覽

| 單元 | 主題 | 互動類型 | 難度 | JS 行數 | JS 版本 | CSS 行數 | 作業單 | 狀態 |
|------|------|---------|------|---------|---------|---------|--------|------|
| B1 | 今天帶多少錢 | 拖曳放置錢幣（HTML5 DnD + 觸控） | easy/normal/hard | 1036 | v3.8 | 758 | 166 | ✅ 完成 |
| B2 | 零用錢日記 | 選擇題 / 數字鍵盤 | easy/normal/hard | 907 | v3.8 | 276 | 203 | ✅ 完成 |
| B3 | 存錢計畫 | 選擇題 / 數字鍵盤 + 撲滿動畫 | easy/normal/hard | 835 | v3.9 | 294 | 93 | ✅ 完成 |
| B4 | 特賣比一比 | 選擇題 + 差額輸入 | easy/normal/hard | 867 | v3.7 | 296 | 110 | ✅ 完成 |
| B5 | 生日派對預算 | 關卡制商品選購 | easy/normal/hard | 781 | v3.7 | 243 | 128 | ✅ 完成 |
| B6 | 菜市場買菜 | 關卡制採購 + 付款找零 | easy/normal/hard | 980 | v3.8 | 375 | 131 | ✅ 完成 |

> 資料更新日期：2026-03-20（第二十七輪）。JS 版本為 HTML 中 `?v=X.X` cache-busting 版號。

---

## 二、檔案清單

### B1 今天帶多少錢
| 類型 | 檔案路徑 |
|------|---------|
| HTML | `html/b1_daily_budget.html` |
| JS | `js/b1_daily_budget.js` |
| CSS | `css/ai-theme.css`、`css/shared-game-base.css`、`css/b-series.css`、`css/b1_daily_budget.css`、`css/common-modal-responsive.css`、`css/dark-mode-simple.css` |

### B2 零用錢日記
| 類型 | 檔案路徑 |
|------|---------|
| HTML | `html/b2_allowance_diary.html` |
| JS | `js/b2_allowance_diary.js` |
| CSS | `css/ai-theme.css`、`css/shared-game-base.css`、`css/b-series.css`、`css/b2_allowance_diary.css`、`css/common-modal-responsive.css`、`css/dark-mode-simple.css` |

### B3 存錢計畫
| 類型 | 檔案路徑 |
|------|---------|
| HTML | `html/b3_savings_plan.html` |
| JS | `js/b3_savings_plan.js` |
| CSS | `css/ai-theme.css`、`css/shared-game-base.css`、`css/b-series.css`、`css/b3_savings_plan.css`、`css/common-modal-responsive.css`、`css/dark-mode-simple.css` |

### B4 特賣比一比
| 類型 | 檔案路徑 |
|------|---------|
| HTML | `html/b4_sale_comparison.html` |
| JS | `js/b4_sale_comparison.js` |
| CSS | `css/ai-theme.css`、`css/shared-game-base.css`、`css/b-series.css`、`css/b4_sale_comparison.css`、`css/common-modal-responsive.css`、`css/dark-mode-simple.css` |

### B5 生日派對預算
| 類型 | 檔案路徑 |
|------|---------|
| HTML | `html/b5_party_budget.html` |
| JS | `js/b5_party_budget.js` |
| CSS | `css/ai-theme.css`、`css/shared-game-base.css`、`css/b-series.css`、`css/b5_party_budget.css`、`css/common-modal-responsive.css`、`css/dark-mode-simple.css` |

### B6 菜市場買菜
| 類型 | 檔案路徑 |
|------|---------|
| HTML | `html/b6_market_shopping.html` |
| JS | `js/b6_market_shopping.js` |
| CSS | `css/ai-theme.css`、`css/shared-game-base.css`、`css/b-series.css`、`css/b6_market_shopping.css`、`css/common-modal-responsive.css`、`css/dark-mode-simple.css` |

---

## 三、各單元特色

### 3.1 B1 今天帶多少錢

**學習目標**：看行程清單，計算所需費用，從錢幣盤中點選正確面額放入錢包。

**特色機制**：
- 錢幣盤（`b1-coin-tray`）顯示難度對應的面額：簡單（1/5/10/50元）、普通（+100/500元）、困難（+1000元）
- **拖曳放置互動**（2026-03-16）：HTML5 DnD（桌面）+ Touch 模擬拖曳（行動裝置），錢幣可無限次使用（原始拖曳元素留在盤中）
- 錢包合計即時顯示，達到需求金額時 `confirm-btn` 解鎖
- 錢包目標金額 pill（`b1-wallet-goal-tag`）顯示「需要 X 元」，避免學生需上滾查看
- 錯誤（金額不足/超出）：錢包區震動動畫（b1Shake）+ 語音提示，**不強制跳題**，學生自行補足
- 圖片以 `../images/money/${denom}_yuan_front.png` 載入，onerror fallback 隱藏圖片
- 困難模式：總金額顯示 `??? 元`，學生需自行加總
- **難度提示系統**（2026-03-16）：簡單模式自動淡化不可用面額（`.b1-coin-faded`）；普通模式答錯3次後自動提示最佳組合；困難模式提供「提示」按鈕（`#hint-btn`）
- **最佳組合演算法**（`_calcOptimalCoins`）：貪婪法由大到小，計算達到目標的最少面額組合，用於 hint 高亮

**難度語音（2026-03-15 新增）**：
```
easy:   今天要去{label}，需要準備{items}，共{total}元
normal: 今天要去{label}，需要準備{items}，把錢幣放進錢包。
hard:   今天要去{label}，需要準備{items}，自己算好總金額！
```

---

### 3.2 B2 零用錢日記

**學習目標**：閱讀一週的收入/支出日記，計算最終餘額。

**資料庫**：`B2_TEMPLATES` — easy（12組，2筆事件）、normal（12組，4筆事件）、hard（12組，6筆事件）— 共 36 組（2026-03-24 全面擴充）

**特色機制**：
- 日記卡呈現：每列以 `income`（綠色 ▲+）/ `expense`（紅色 ▼-）樣式顯示
- 簡單：3 選 1（干擾項間距 ≥20 元，使用 fixed delta array 確保有效干擾）
- 普通/困難：數字鍵盤輸入（最大 5 位）

**重試/繼續模式（2026-03-15 新增）**：
- `retryMode: 'retry'`（預設）：答錯後重新啟用選項/鍵盤，語音「不對喔，再想想看」
- `retryMode: 'proceed'`：顯示正確答案 + 語音，1400ms 後跳下一題

---

### 3.3 B3 存錢計畫

**學習目標**：看目標商品價格與每週存款金額，計算需幾週存夠。

**資料庫**：
- `B3_ALL_ITEMS`：20 種商品（價格 200～3500 元；2026-03-24 擴充，原 14 件）
- `B3_ITEMS_BY_DIFF`：依難度篩選（easy ≤400、normal ≤800、hard 全部）
- `B3_WEEKLY_OPTIONS`：各難度對應週存金額選項

**核心計算**：`answer = Math.ceil(price / weekly)`

**撲滿動畫**：
- 答對後顯示動畫：最多 8 個格子（totalWeeks > 8 時顯示「每格代表N週」）
- 每格填充間隔 350ms，呼叫 `audio.play('coin')`
- 填滿後豬豬震動，callback 進入下一題

**重試/繼續模式（2026-03-15 新增）**：
- retry 正確：語音「答對了！需要N週」→ 觸發撲滿動畫
- retry 錯誤：語音「不對喔，再想想看」→ 1600ms 後重新啟用按鈕（不進下一題）
- proceed 錯誤：語音「正確答案是N週」→ 顯示 hint div → 2200ms 後跳題

---

### 3.4 B4 特賣比一比

**學習目標**：比較兩家店的同商品價格，選出較便宜的（+ 計算差額）。

**資料庫**：`B4_ITEMS`（30 組，2026-03-24 從 20 組擴充），`optA` 永遠比 `optB` 貴；顯示時 50% 機率左右交換（swapped 旗標）。

**兩段式流程**：
1. **Select 階段**：點選較便宜的選項卡（easy 直接得分；normal/hard 繼續）
2. **Diff 階段**（normal/hard）：回答差額
   - normal：三選一（`_getDiffOptions()` 產生干擾項）
   - hard：數字鍵盤輸入

**重試/繼續模式（2026-03-15 新增）**：
- Select 階段：retry → 1500ms 後重置卡片允許重選；proceed → 語音 + 直接跳題
- Diff 階段：retry → 重新啟用選項/重置數字盤；proceed → 語音 + 跳題

**難度語音（2026-03-15 新增，全難度）**：
```
easy:   {商品名}，哪個地方比較便宜？
normal: {商品名}，哪個地方比較便宜？選出之後再回答便宜了多少元。
hard:   {商品名}，哪個地方比較便宜？選出之後輸入差額。
```

---

### 3.5 B5 生日派對預算

**學習目標**：在固定預算內，確保選購所有必買商品，且不超支。

**資料庫**：
- `B5_ALL_ITEMS`（12件）：含 `must: true`（蛋糕🎂、飲料🧃）與選購商品
- `B5_SCENARIOS`（各難度 8 組）：`{ budget, availableIds }`

**核心機制**：
- 必買商品初始化時預先選取（`selectedIds` 預填 must items），顯示 🔒 標記
- 即時金額條 `b5-total-bar`：ok（綠）/ near（黃，>90% budget）/ over（紅）
- 確認邏輯：`mustOk && budgetOk && total > 0`

**錯誤重試（2026-03-15 新增）**：
- 答對：顯示 `🎉 太棒了！` + 「下一關」按鈕 + 語音
- 答錯：顯示錯誤說明 + 「🔄 再試一次」（重新渲染同關卡）+ 灰色「跳過」按鈕

**Speech 物件（2026-03-15 新增）**：B5 原本缺少 Speech，此版本補全。

---

### 3.6 B6 菜市場買菜

**學習目標**：依購物清單在三個攤位（蔬菜攤/水果攤/雜貨攤）採購，然後付款找零。

**資料庫**：
- `B6_STALLS`：3 個攤位，各 6 件商品
- `B6_MISSIONS`（各難度 8 組，2026-03-24 擴充）：`{ budget, items: [{stall, id}] }`
- `B6_BILLS`：7 種面額（1000/500/100/50/10/5/1 元）

**三階段流程**：
1. **Shopping**：切換攤位標籤，點擊正確商品勾選清單
2. **Payment**：點選鈔票/硬幣面額累積付款金額，達到消費額後解鎖付款鈕
3. **Change**：顯示找零金額，語音播報

**錯誤商品提示（2026-03-15 新增）**：
- 點到不在清單的商品：顯示浮動提示框「❌ {商品名}不在今天的購物清單上」（2秒後自動消失）+ 語音提示
- 錯誤音效，但不跳題（允許繼續採購）

**Speech 物件（2026-03-15 新增）**：B6 原本缺少 Speech，此版本補全。

---

## 四、共通架構規範（全 B 系列）

### 4.1 標準物件結構

所有 B 系列單元均包含以下物件（照初版開發規格）：

```javascript
Game = {
    Debug      // FLAGS: all/init/speech/question/error
    TimerManager   // setTimeout / clearAll / clearByCategory
    EventManager   // on / removeAll / removeByCategory
    audio      // init() / play(name)
    Speech     // speak(text, callback)  ← B5/B6 在 2026-03-15 補全
    state      // settings / game(quiz) / gameCompleted / isProcessing
    // ... 各單元專屬方法
}
```

### 4.2 TimerManager 類別規範

| 類別名稱 | 用途 |
|---------|------|
| `'speech'` | 語音播報計時器 |
| `'turnTransition'` | 題目切換過渡 |
| `'animation'` | 動畫（撲滿格子填充等） |
| `'confetti'` | 完成畫面煙火 |
| `'ui'` | 短暫 UI 效果 |
| `'wrongTip'` | B6 錯誤商品提示自動消失 |

### 4.3 isEndingGame 守衛（2026-03-16 第十七輪：gameCompleted → isEndingGame）

```javascript
showResults() {
    if (this.state.isEndingGame) return;
    this.state.isEndingGame = true;
    // ...
}
```

### 4.4 speak() safeCallback 模式

```javascript
let callbackExecuted = false;
const safeCallback = () => {
    if (callbackExecuted) return;
    callbackExecuted = true;
    callback?.();
};
u.onend   = safeCallback;
u.onerror = (e) => { if (e.error !== 'interrupted') Game.Debug.warn('speech', '語音錯誤', e.error); safeCallback(); };
Game.TimerManager.setTimeout(safeCallback, 10000, 'speech');
```

### 4.5 遞迴 confetti（無 setInterval）

```javascript
_fireConfetti() {
    const end = Date.now() + 3000;
    const fire = () => {
        if (Date.now() >= end) return;
        confetti({ ... });
        Game.TimerManager.setTimeout(fire, 250, 'confetti');
    };
    fire();
}
```

---

## 五、語音系統設計（2026-03-15 補全）

### 5.1 題目語音

| 單元 | 觸發時機 | 語音內容 |
|------|---------|---------|
| B1 | renderQuestion() +400ms | 行程名稱 + 費用項目（依難度）|
| B2 | renderQuestion() +500ms | 「看看日記，計算最後剩下多少錢？」（依難度） |
| B3 | renderQuestion() +500ms | 商品名 + 目標金額 + 週存金額 |
| B4 | renderQuestion() +400ms | 商品名 + 難度提示 |
| B5 | renderRound()   +400ms | 預算金額 + 難度提示 |
| B6 | renderRound()   +600ms | 讀出購物清單所有商品名稱 |

### 5.2 答題回饋語音

| 情境 | 語音內容 |
|------|---------|
| 正確（B2/B3 retry） | 「答對了！剩下/需要N元/週」 |
| 錯誤（retry 模式） | 「不對喔，再想想看」/「再試一次」 |
| 錯誤（proceed 模式）| 「正確答案是N元/週」 |
| B4 select 選錯 retry | 「這邊比較貴喔，再看看另一邊」 |
| B4 select 選錯 proceed | 「答錯了，{店名}才是比較便宜的」 |
| B4 diff 答錯 retry | 「差額是N元，再試一次」 |
| B5 成功 | 「太棒了！共花了N元，還剩N元！」 |
| B5 失敗（必買未選）| 「記得要選所有必買的商品喔！」 |
| B5 失敗（超支）| 「超出預算了，多了N元，再試一次！」 |
| B6 付款 | 「共消費N元，請選擇付款金額。」 |
| B6 找零 | 「你付了N元，找回N元，買菜成功！」 |
| B6 錯誤商品 | 「{商品名}不在今天的購物清單上」 |

### 5.3 完成語音（4 段評語）

| 正確率 | 語音 |
|--------|------|
| 100% | 太厲害了，全部答對了！ |
| ≥80%  | 很棒喔，答對了N題/關！ |
| ≥60%  | 不錯喔，繼續加油！ |
| <60%  | 要再加油喔，多練習幾次！ |

觸發時機：`showResults()` + 800ms（confetti 啟動後播放）

---

## 六、重試/繼續模式設計（B2/B3/B4）

### 6.1 設定頁 UI

```html
<div class="b-setting-group">
    <label class="b-setting-label">🔄 作答模式：</label>
    <div class="b-btn-group" id="mode-group">
        <button class="b-sel-btn active" data-val="retry">重試模式</button>
        <button class="b-sel-btn" data-val="proceed">繼續模式</button>
    </div>
    <div style="font-size:12px;color:#6b7280;">
        重試：答錯可以再試 ｜ 繼續：顯示答案後繼續
    </div>
</div>
```

### 6.2 state.settings 預設值

```javascript
settings: { difficulty: null, questionCount: 10, retryMode: 'retry' }
```

### 6.3 行為對照

| 情境 | retry | proceed |
|------|-------|---------|
| 選擇題答錯 | 重新啟用按鈕 | 顯示正確項目 + 跳題 |
| 數字鍵盤答錯 | 清空輸入 + 重新啟用 | 顯示 hint 提示 + 跳題 |
| 分數計算 | 只有答對才加分 | 只有答對才加分 |

> **B1**：自然為 retry 模式（金額不足時錢包震動，學生可繼續補錢）
> **B5**：錯誤時顯示「再試一次」（重新渲染同關）+ 「跳過」灰色按鈕
> **B6**：Shopping 階段不強制跳過（點錯商品只提示，不扣分）

---

## 七、吉祥物

所有 B 系列設定頁與完成畫面統一使用 `educated_money_bag_character.png`（金錢小助手），已於 2026-03-15 第五輪從 emoji 更換為圖片。

**設定頁 HTML 結構**（`settings-title-row` 左側）：
```html
<img src="../images/index/educated_money_bag_character.png"
     alt="金錢小助手"
     class="settings-mascot-img"
     onerror="this.style.display='none'">
```

**完成畫面 HTML 結構**（trophy 旁）：
```html
<div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:8px;">
    <img src="../images/index/educated_money_bag_character.png"
         alt="金錢小助手"
         style="width:52px;height:52px;object-fit:contain;"
         onerror="this.style.display='none'">
    <div class="trophy-bounce">🏆</div>
</div>
```

> 圖片路徑：`../images/index/educated_money_bag_character.png`（相對於 `html/` 目錄）

---

## 八、完成畫面規格

### 8.1 B1/B2/B3/B4（題數制）

```
b-completion-header:
  b-trophy: 🏆
  b-completion-title: 完成挑戰！
  b-perf-badge: {badge} (顏色依正確率)

b-stats-grid（3 個 b-stat-card）:
  答對題數 / 正確率% / 花費時間

獎勵連結 + 再玩一次 + 返回設定
```

### 8.2 B5/B6（關卡制）

與 B1/B2/B3/B4 相同結構，但：
- trophy 圖示：B5 = 🎂；B6 = 🛒
- 標題：B5 = 「派對規劃師 🎉」；B6 = 「採購達人 🎉」
- 統計：成功關卡數 / 成功率% / 花費時間

---

## 九、已知限制與未來工作

| 項目 | 說明 |
|------|------|
| 作業單（worksheet） | ✅ 2026-03-15 完成，`worksheet/units/b1~b6-worksheet.js` 已建立 |
| 輔助點擊（ClickMode） | B 系列未實作，不適用（B 系列以清晰 UI 設計取代）|
| B1 數字加總語音 | ✅ `toTWD()` 已在所有語音中使用（easy 說出總金額；normal/hard 不說出以保留挑戰性）|
| B6 錯誤商品 CSS 動畫 | ✅ 2026-03-16 第十六輪：`#b6-wrong-tip` 已移至 `b6_market_shopping.css` 外部定義，JS 改只建立 id 不設 inline style |
| 完成畫面 CSS 缺失 | ✅ 2026-03-15 補齊：`completion-screen`, `stats-grid`, `stat-card` 等加入 `b-series.css` |

---

## 十、架構合規性（對照 C/F/A 系列標準）

| 項目 | B1 | B2 | B3 | B4 | B5 | B6 | 狀態 |
|------|:--:|:--:|:--:|:--:|:--:|:--:|------|
| TimerManager + EventManager | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 完整 |
| injectGlobalAnimationStyles | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 完整 |
| confetti 遞迴模式 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 完整 |
| 語音 Yating 優先 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 完整 |
| safeCallback + 10s 備援 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 完整 |
| isEndingGame 守衛（第十七輪：gameCompleted → isEndingGame）| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-16 統一命名 |
| startTime null-check | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 完整 |
| **resetGameState()** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-15 補齊 |
| convertToTraditionalCurrency (toTWD) | ✅ | ✅ | — | ✅ | ✅ | ✅ | B3 無金額語音需求；B4 差額語音 2026-03-15 補齊 |
| speak() 簽名統一（2 params） | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-15 第四輪統一 |
| convertToTraditionalCurrency typeof 防護 | ✅ | ✅ | — | — | ✅ | ✅ | 2026-03-15 第四輪加固 |
| 吉祥物圖片（設定頁+完成畫面）| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-15 完成 |
| 學習成果區塊（完成畫面）| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-15 完成 |
| 表現徽章 bGlow 動畫 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-15 完成 |
| B1 retryMode UI | ✅ | — | — | — | — | — | 2026-03-15 補齊（B2~B4 已有）|
| 難度說明框 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-15 補齊 |
| 作業單系統 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-15 完成 |
| 設定頁卡片佈局（settings-title-row + 吉祥物左置）| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-15 第七輪 |
| 測驗標題列 b-header | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-15 第七輪 |
| Speech cachedVoice + _loadVoice() | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-15 第七輪 |
| 返回主選單 → #part4 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-15 第七輪 |
| 完成畫面 CSS（unprefixed classes）| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-15 第九輪 B1/B4 全統一 |
| 完成畫面單元專屬標題 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | B1 帶錢小達人、B4 比價達人 |
| showResults() EventManager.removeByCategory('gameUI') | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-15 第九輪 B2~B6 補齊 |
| _bindSettingsEvents() removeByCategory('settings') 守衛 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-15 第十輪全系列補齊 |
| backToMenu() 函數（settings 按鈕正確清理）| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-15 第十一輪 B4 補齊；B1/B4 按鈕改呼叫 Game.backToMenu() |
| 語音重播按鈕（內嵌題目文字旁）| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-16 第十四輪：`b-inline-replay` 移至題目 span 旁 |
| B1 拖曳放置互動（HTML5 DnD + Touch） | ✅ | — | — | — | — | — | 2026-03-16 第十四輪；B2~B6 維持點選模式 |
| B1 難度提示系統（淡化/3錯自動/hint鈕）| ✅ | — | — | — | — | — | 2026-03-16 第十四輪 |
| B1 `_calcOptimalCoins()` 貪婪演算法 | ✅ | — | — | — | — | — | 2026-03-16 第十四輪 |
| `_loadVoice()` voices[0] 終極回退 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-16 第十五輪：對齊 A/C/F 系列 |
| 完成畫面 CSS 外部化（b-res-*）| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-16 第十五輪：移至 b-series.css |
| injectGlobalAnimationStyles 死碼清除 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-16 第十五輪：移除 bGlow/.performance-badge |
| `speak()` onerror 錯誤日誌（非 interrupted 才警告）| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-16 第十六輪：對齊 C1/A3 模式 |
| B6 `#b6-wrong-tip` CSS 外部化 | — | — | — | — | — | ✅ | 2026-03-16 第十六輪：移至 b6_market_shopping.css |
| B1 `.b-inline-replay` 統一命名（移除單元前綴）| ✅ | — | — | — | — | — | 2026-03-16 第十六輪：移除 b1_daily_budget.css 重複定義 |
| 設定頁按鈕 `b-sel-btn` 統一（含 `b-diff-*` 難度色彩）| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-17 第十九輪：B2/B3/B5/B6 由 selection-btn 改為 b-sel-btn |
| `audio.play()` try-catch 防護 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-18 第二十一輪：B2/B3/B5/B6 補齊，對齊 B1/B4 |
| Debug FLAGS 含 `speech` 旗標 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-18 第二十一輪：B2/B5/B6 補齊（B1/B3/B4 已有）|
| `speak()` 無多餘 `undefined` 引數 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-18 第二十二輪：B3 移除 4 處 `speak(text, undefined)` |
| `Speech.speak()` 以 `Game.` 而非 `this.` 呼叫 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-18 第二十二輪：B1/B4 統一為 `Game.Speech.speak()`（對齊 B2/B3/B5/B6）|
| 設定頁 CSS 類別（`b-setting-group`/`b-btn-group`/`b-setting-label`）| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-18 第二十三輪：B2/B3/B5/B6 由 shared-game-base 通用類別遷移至 B 系列專屬類別 |
| `speak()` 語音速率 `u.rate = 1.0` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-18 第二十四輪：全系列由 0.9 改為 1.0，對齊 A/C/F 系列 |
| `state.settings` 無廢棄屬性 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-18 第二十四輪：移除 B1 死碼 `assistClick: false` |
| `speak()` 語音語系由 `cachedVoice?.lang` 派生 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 2026-03-18 第二十五輪：`'zh-TW'` → `this.cachedVoice?.lang \|\| 'zh-TW'`（對齊 A2）|

> B3：語音只說「週數」（非金額），無需 `convertToTraditionalCurrency`
> B4：語音說明為文字描述，金額比較以畫面呈現為主

---

## 十一、修復記錄

### 第一輪（2026-03-14）：全系列初版建立

| 項目 | 單元 | 搜尋關鍵字 |
|------|------|------------|
| B 系列全新開發 | B1~B6 | `B3_ALL_ITEMS`, `B5_SCENARIOS`, `B6_STALLS`, `B6_MISSIONS` |

### 第二輪（2026-03-15）：品質對齊第一輪

| 項目 | 單元 | 搜尋關鍵字 |
|------|------|------------|
| 新增 Speech 物件 | B5, B6 | `Game.Speech.speak` |
| 重試/繼續模式 | B2, B3, B4 | `retryMode`, `mode-group` |
| 所有難度語音 | B1, B4 | `speechMap`, `convertToTraditionalCurrency` |
| 答題語音回饋 | B2, B3, B4 | `答對了`, `不對喔` |
| 關卡語音引導 | B5, B6 | `Game.Speech.speak`, `renderRound` |
| 錯誤商品浮動提示 | B6 | `b6-wrong-tip`, `wrongTip` |
| 付款/找零語音 | B6 | `共消費`, `買菜成功` |
| 完成語音 | B1~B6 | `完成語音`, `800ms`, `speech` |
| B5 retry 重試按鈕 | B5 | `🔄 再試一次`, `renderRound()` |
| 吉祥物 | B1~B6 | `48px`, settings mascot |
| B6 Init 重複編號修復 | B6 | `// ── 7. Init` |
| B4 `b4-store-label` 韓文修正 | B4 | `매장→商店` |

### 第三輪（2026-03-15）：品質對齊第二輪（參照 C/F/A 系列報告）

| 項目 | 單元 | 搜尋關鍵字 |
|------|------|------------|
| `resetGameState()` 補齊 | B1~B6 | `resetGameState`, `🔄 [B1]` |
| `showSettings()` 改呼叫 `resetGameState()` | B1~B6 | `this.resetGameState()` in `showSettings` |
| `convertToTraditionalCurrency` 語音金額 | B2 | `答對了！剩下`, `正確答案是` |
| `convertToTraditionalCurrency` 語音金額 | B5 | `共花了`, `多了`, `還剩` |
| `convertToTraditionalCurrency` 語音金額 | B6 | `共消費`, `你付了`, `找回` |

### 第四輪（2026-03-15）：speak() 統一 + convertToTraditionalCurrency 安全防護（參照 C/F/A 系列報告）

**根因分析**

全系列 B JS 檔案對照 C/F/A 系列 12 項架構指標逐一稽核，發現以下不一致：

1. **B1/B4 `speak()` 簽名含未使用第三參數 `onerrorCb`**
   - B2/B3/B5/B6 為 `speak(text, callback)`；B1/B4 多了 `onerrorCb` 參數
   - 實際使用中 B1/B4 從未傳入第三引數，參數名無意義
   - `u.onerror = () => { (onerrorCb || safeCallback)(); }` 在 onerrorCb=undefined 時行為等同 safeCallback，但與其他單元不一致
   - **修正**：移除 `onerrorCb` 參數，`u.onerror = safeCallback`（對齊 B2/B3/B5/B6）

2. **B2 `convertToTraditionalCurrency` 用 truthy 而非 typeof 檢查（4 處）**
   - `convertToTraditionalCurrency ? ... : x + '元'` → `typeof convertToTraditionalCurrency === 'function' ? ... : x + '元'`
   - typeof 比 truthy 更精確：明確要求「必須是函數」才呼叫

3. **B5/B6 直接呼叫 `convertToTraditionalCurrency()` 無防護**
   - B5 有 3 處、B6 有 3 處直接呼叫，若 number-speech-utils.js 未載入會 crash
   - **修正**：在各檔案 `let Game;` 前新增模組級輔助函數 `toTWD`：
     ```javascript
     const toTWD = v => typeof convertToTraditionalCurrency === 'function'
         ? convertToTraditionalCurrency(v) : `${v}元`;
     ```
   - 所有直接呼叫改為 `toTWD(x)`

| 項目 | 單元 | 搜尋關鍵字 |
|------|------|------------|
| `speak()` 移除 `onerrorCb`，`u.onerror = safeCallback` | B1, B4 | `onerrorCb`, `u.onerror = safeCallback` |
| `convertToTraditionalCurrency` typeof 防護 | B2 | `typeof convertToTraditionalCurrency === 'function'` |
| 新增 `toTWD` 模組級輔助函數 | B5, B6 | `const toTWD = v =>` |
| B5 speak 呼叫改用 `toTWD` | B5 | `toTWD(total)`, `toTWD(rem)`, `toTWD(total - g.budget)` |
| B6 speak 呼叫改用 `toTWD` | B6 | `toTWD(total)`, `toTWD(paid)`, `toTWD(change)` |

### 第五輪（2026-03-15）：完成度提升（對齊 C/F/A 系列外觀與功能）

**目標**：逐步讓 B 系列在視覺呈現與功能完整性上達到 C/F/A 系列的完成度。

#### 第一輪：吉祥物圖片 + 學習成果 + bGlow

| 項目 | 單元 | 搜尋關鍵字 |
|------|------|------------|
| 設定頁 emoji→吉祥物圖片 | B1~B6 | `educated_money_bag_character.png`, `onerror` |
| 完成畫面吉祥物圖片（trophy 旁） | B1~B6 | `display:flex;align-items:center;gap:12px` |
| 學習成果區塊（綠色漸層）| B1~B6 | `學習成果`, `d1fae5`, `a7f3d0` |
| 表現徽章 bGlow @keyframe | B1~B6 | `bGlow`, `b-perf-badge`, `.performance-badge` |
| B1 retryMode UI（設定頁）| B1 | `mode-group`, `data-mode`, `b-sel-btn active` |
| B1 retryMode 錯誤邏輯（handleConfirm）| B1 | `retryMode === 'proceed'`, `b1Shake` |

#### 第二輪：難度說明框（B2/B3/B5/B6）

| 項目 | 單元 | 搜尋關鍵字 |
|------|------|------------|
| `_diffDescriptions` 物件新增 | B2, B3, B5, B6 | `_diffDescriptions` |
| 難度說明框 HTML（`b-diff-desc` class）| B2, B3, B5, B6 | `diff-desc`, `b-diff-desc` |
| 難度按鈕 change handler 更新說明 | B2, B3, B5, B6 | `classList.add('show')` |

#### 第三輪：作業單整合

| 項目 | 單元 | 搜尋關鍵字 |
|------|------|------------|
| 新建 `worksheet/units/b1-worksheet.js` | B1 | `fill`, `coin-select`, `hint-complete`, `_findCombo`, `_coinOptions` |
| 新建 `worksheet/units/b2-worksheet.js` | B2 | `fill`, `steps`, `eventsHtml`, `runAns` |
| 新建 `worksheet/units/b3-worksheet.js` | B3 | `Math.ceil(item.price / weekly)`, `_items`, `_weekly` |
| 新建 `worksheet/units/b4-worksheet.js` | B4 | `cheaper`, `diff`, `both`, `optA.price - optB.price` |
| 新建 `worksheet/units/b5-worksheet.js` | B5 | `mustTotal`, `remaining`, `mustRows`, `optRows` |
| 新建 `worksheet/units/b6-worksheet.js` | B6 | `total`, `change`, `budget - total` |
| `worksheet/index.html` 加入 6 個 script 標籤 | worksheet | `b1-worksheet.js`~`b6-worksheet.js` |
| B1~B6 設定頁加入「📝 作業單」按鈕 | B1~B6 | `settings-worksheet-link`, `產生作業單` |
| B1~B6 EventManager 綁定 worksheet link | B1~B6 | `unit: 'b1'`~`unit: 'b6'`, `Worksheet` window |

### 第六輪（2026-03-15）：Bug 修正 + 語音品質提升

| 項目 | 單元 | 搜尋關鍵字 |
|------|------|------------|
| `backToMenu()` href 修正 `../html/index.html` → `../index.html` | B2,B3,B5,B6 | `backToMenu`, `window.location.href` |
| 新增 `toTWD` 模組級輔助函數 | B1, B2 | `const toTWD = v =>` |
| B1 語音金額改用 `toTWD`（大金額正確發音）| B1 | `toTWD(requiredTotal)`, `toTWD(walletTotal)` |
| B1 題目語音 easy 模式改用 `toTWD` | B1 | `toTWD(curr.total)` |
| B2 語音金額改用 `toTWD`（簡化 typeof 守衛）| B2 | `toTWD(question.answer)` |
| HTML cache-busting 版本 v2.0→v2.1 | B1,B2,B3,B5,B6 | `v=2.1` |

### 第七輪（2026-03-15）：設定頁卡片佈局 + 語音升級 + 完成畫面 CSS 補齊

| 項目 | 單元 | 搜尋關鍵字 |
|------|------|------------|
| 設定頁 `b-header+b-settings-wrap` → `unit-welcome>welcome-content>settings-title-row` 卡片 | B1~B6 | `settings-title-row`, `settings-mascot-img`, `settingsBounce` |
| 測驗標題列 `game-header` → `b-header` (left/center/right) | B2~B6 | `b-header`, `b-header-left`, `b-header-center`, `b-header-right` |
| `Speech` 物件升級：`cachedVoice` + `_loadVoice()` + `onvoiceschanged` | B1~B6 | `cachedVoice`, `_loadVoice`, `onvoiceschanged` |
| `game-buttons` 按鈕順序：返回主選單(左) + 開始練習(右) | B1~B6 | `back-btn`, `start-btn`, `game-buttons` |
| `backToMenu()` href 補 `#part4` 跳轉到預算規劃頁 | B1~B6 | `../index.html#part4` |
| B1 `backToMenu()` 函數（line ~853）修正 `#part4` | B1 | `backToMenu`, `window.location.href = '../index.html#part4'` |
| B1 `diff-desc` class 修正：`b1-diff-desc` → `b-diff-desc` | B1 | `b-diff-desc`, `id="diff-desc"` |
| 完成畫面 unprefixed CSS 補齊（B2/B3/B5/B6 使用）| `b-series.css` | `completion-screen`, `stats-grid`, `stat-card`, `btn-play-again`, `btn-back-settings` |
| `b-series.css` + JS 版本 → v2.4 / v2.3 | B1~B6 | `v=2.4`, `v=2.3` |

### 第八輪（2026-03-15）：B1 金幣圖示 CSS 修正 + 標題列重構 + B4 toTWD

| 項目 | 單元 | 搜尋關鍵字 |
|------|------|------------|
| B1 錢幣圖示 CSS 選擇器修正（`.b-coin-img` → `.coin-img` / `.banknote-img`）| B1 | `.b1-coin-btn .coin-img { width:60px }`, `.b1-coin-btn .banknote-img { width:100px }` |
| B1 錢包圖示 inline size 修正（44→60px / 72→100px）| B1 | `imgW = coin.isBanknote ? '100px' : '60px'` |
| b-series 標題列重構（左=單元名, 中=難度, 右=進度+獎勵+返回）| B1~B6 | `b-header-unit`, `b-header-left`, `b-header-center`, `b-header-right` |
| 設定頁 h1 加單元代碼前綴 | B1~B6 | `單元B1：今天帶多少錢`, `單元B2：零用錢日記` 等 |
| B5 `_renderRoundHTML()` 加入 `diffLabel` 變數 | B5 | `diffLabel`, `b-header-center` |
| B4 新增 `toTWD` 模組級輔助函數 | B4 | `const toTWD = v =>` |
| B4 差額語音改用 `toTWD`（3 處）| B4 | `toTWD(correctDiff)` |
| B4 `_diffDescs` 統一命名為 `_diffDescriptions` | B4 | `_diffDescriptions` |

### 第九輪（2026-03-15）：完成畫面全系列統一

**根因分析**

深度比對 B1~B6 六個完成畫面，發現 B1/B4 與 B2/B3/B5/B6 存在三項架構不一致：

1. **B1/B4 有 sticky completion header** — 完成畫面頂端保留一條 `b-header`，B2/B3/B5/B6 則無，造成視覺落差與重複的獎勵按鈕
2. **B1/B4 使用 b-prefixed CSS 類別** — `b-completion`, `b-stats-grid`, `b-stat-card`, `b-perf-badge` 等，而 B2/B3/B5/B6 使用 unprefixed（`completion-screen`, `stats-grid`, `performance-badge`）
3. **B1/B4 完成標題通用** — "完成挑戰！" 無個性，B2/B3/B5/B6 各有單元專屬慶祝標題
4. **B2/B3/B5/B6 缺少 `EventManager.removeByCategory('gameUI')`** — `showResults()` 進入時未清理舊 gameUI 監聽器，造成 EventManager 記憶體未釋放

| 項目 | 單元 | 搜尋關鍵字 |
|------|------|------------|
| B1/B4 完成畫面移除 sticky header（b-header 區塊）| B1, B4 | `completion-screen`（取代 `b-completion`） |
| B1/B4 CSS class 統一為 unprefixed（對齊 B2/B3/B5/B6）| B1, B4 | `completion-screen`, `completion-header`, `trophy-bounce`, `performance-badge`, `stats-grid`, `stat-card`, `completion-buttons`, `btn-play-again`, `btn-back-settings` |
| B1 完成標題 "完成挑戰！" → "帶錢小達人 🎉" | B1 | `帶錢小達人` |
| B4 完成標題 "完成挑戰！" → "比價達人 🎉" | B4 | `比價達人` |
| B1/B4 獎勵連結 id 統一為 `completion-reward-link` | B1, B4 | `completion-reward-link` |
| B1/B4 `injectGlobalAnimationStyles()` `.b-perf-badge` → `.performance-badge` | B1, B4 | `.performance-badge { animation: bGlow` |
| B2/B3/B5/B6 `showResults()` 補齊 `EventManager.removeByCategory('gameUI')` | B2,B3,B5,B6 | `Game.EventManager.removeByCategory('gameUI')` |
| JS 版本更新 | B1=v2.6, B2~B6=v2.5 | `v=2.5`, `v=2.6` |

### 第十輪（2026-03-15）：`_bindSettingsEvents()` 防重複綁定守衛

**根因分析**

`_bindSettingsEvents()` 在每次 `showSettings()` 呼叫時執行，透過 `EventManager.on` 將設定頁事件（難度選擇、模式選擇、開始按鈕等）推入 EventManager。
若玩家從遊戲畫面多次返回設定頁，`EventManager.listeners` 陣列中會累積多筆指向舊 DOM 節點的 `'settings'` 類別監聽器（innerHTML 替換後舊 DOM 節點無效，但物件仍佔記憶體）。

`startGame()` 已有 `Game.EventManager.removeByCategory('settings')` 清理，可防止進遊戲後的累積，但「設定→返回→設定」的循環仍有累積問題。

**修正**：在 `_bindSettingsEvents()` 第一行加入 `Game.EventManager.removeByCategory('settings');`（全 6 檔）

| 項目 | 單元 | 搜尋關鍵字 |
|------|------|------------|
| `_bindSettingsEvents()` 加入 `removeByCategory('settings')` 守衛 | B1~B6 | `Game.EventManager.removeByCategory('settings')` in `_bindSettingsEvents` |
| JS 版本更新 | B1=v2.7, B2~B6=v2.6 | `v=2.6`, `v=2.7` |

### 第十一輪（2026-03-15）：B4 `backToMenu()` 補齊 + B1/B4 設定頁返回按鈕修正

**問題**：
1. B4 缺少 `backToMenu()` 函數（B2/B3/B5/B6 均有）；設定頁返回主選單按鈕用 `window.location.href` 直接跳轉，繞過 TimerManager/EventManager 清理
2. B1 設定頁也有同樣問題（`backToMenu()` 函數存在但按鈕未呼叫它）

**修正**：
- B4 加入 `backToMenu()` 方法（呼叫 `TimerManager.clearAll()` + `EventManager.removeAll()` 後跳轉）
- B1/B4 設定頁按鈕：`onclick="window.location.href='../index.html#part4'"` → `onclick="Game.backToMenu()"`

| 項目 | 單元 | 搜尋關鍵字 |
|------|------|------------|
| B4 補充 `backToMenu()` 函數 | B4 | `backToMenu`, `TimerManager.clearAll`, `EventManager.removeAll` |
| B1/B4 設定頁返回按鈕改用 `Game.backToMenu()` | B1, B4 | `Game.backToMenu()` in settings back button |
| JS 版本更新 | B1=v2.8, B4=v2.7 | `v=2.7`, `v=2.8` |

### 第十二輪（2026-03-15）：語音重播按鈕 + 中央回饋動畫 + B1 錢幣透明

**新增功能**：

1. **🔊 語音重播按鈕**：全 6 個單元，位於標題列左側單元名稱旁（`b-header-left`）。儲存每題語音文字於 `state.quiz.lastSpeechText` / `state.game.lastSpeechText`，點擊重播。
2. **中央回饋動畫**：各單元加入 `_showCenterFeedback(icon, text)` 方法，正確顯示 ✅/答對了！、錯誤顯示 ❌/再試一次！，以 `bFeedbackPop` keyframe 動畫彈出，1200ms 後自動消失。
3. **B1 錢幣圖示透明**：`.b1-coin-btn` 加入透明背景樣式，`.b1-tray-coins` 水平排列，`.b1-coin-tray` 加入 card box。

| 項目 | 單元 | 搜尋關鍵字 |
|------|------|------------|
| 🔊 重播按鈕（header-left）| B1~B6 | `b-replay-btn`, `replay-speech-btn`, `lastSpeechText` |
| 中央回饋方法 | B1~B6 | `_showCenterFeedback`, `b-center-feedback`, `bFeedbackPop` |
| B1 錢幣圖示 CSS | B1 | `.b1-coin-btn`, `.b1-tray-coins`, card box |
| CSS/JS 版本更新 | B1=v3.0, B2~B6=v2.8 | — |

### 第十三輪（2026-03-15）：遊戲畫面視覺分組強化

**改進項目**：

1. **B4 VS 分隔圖示**：兩張商店比較卡片之間插入橘紅漸層圓形 VS 標籤（`b4-vs-divider`）；比較網格改為 `grid-template-columns: 1fr auto 1fr`。
2. **B1 錢包目標金額**：`_renderWalletArea()` 在合計旁加入「需要 X 元」藍色 pill（`b1-wallet-goal-tag`），學生不需往上滾動即可看到目標。
3. **B2 答題區卡片**：`#b2-answer-area` 外層加入白色 card box（`b2-answer-card`）+ 提示文字「請選擇或輸入最後剩下的金額：」，視覺上與日記本明確分開。
4. **B3 答題區卡片**：`#b3-answer-area` 外層加入綠色邊框 card box（`b3-answer-card`），與每週存款資訊條配色一致。
5. **B6 面額色彩鈔票按鈕**：`B6_BILLS` 各面額賦予顏色（千元紫、五百棕、百元藍…），透過 CSS Variable `--bill-color` 呈現彩色邊框與文字標籤。

| 項目 | 單元 | 搜尋關鍵字 |
|------|------|------------|
| VS 分隔圓圈 | B4 | `b4-vs-divider`, `1fr auto 1fr` |
| 錢包目標金額 | B1 | `b1-wallet-goal-tag`, `需要 X 元` |
| 答題卡片 | B2, B3 | `b2-answer-card`, `b3-answer-card` |
| 鈔票彩色按鈕 | B6 | `--bill-color`, `b6-bill-label`, `b6-bill-value` |
| CSS/JS 版本更新 | B1=v3.2, B2=v3.0, B3=v3.0, B4=v3.1, B6=v3.0 | — |

### 第十四輪（2026-03-16）：內嵌語音重播按鈕 + B1 拖曳放置互動

#### 14.1 語音重播按鈕移至題目內嵌（全 B 系列）

**問題**：第十二輪將 🔊 按鈕加在 `b-header-left`，但位置遠離題目文字，使用者需回頭找按鈕。
**改進**：將 🔊 按鈕移至每題題目文字緊鄰右側（內嵌），如「今天要去：爬山 🔊」。

**實作方式**：
- 移除 `b-header-left` 中的 `<button id="replay-speech-btn">` 區塊
- 在各單元題目渲染函數中，題目文字 `<span>` 後方插入 `<button class="b-inline-replay" id="replay-speech-btn">🔊</button>`
- CSS 新增 `.b-inline-replay`（`css/b-series.css` v2.7）：透明背景，hover 放大，垂直居中

**各單元題目插入位置**：

| 單元 | 函數 | HTML 插入位置 |
|------|------|-------------|
| B1 | `_renderScheduleCard()` | `今天要去：${q.label}` span 後 |
| B2 | `renderQuestion()` | `b2-diary-header` 日記標題 span 後 |
| B3 | `renderQuestion()` | `b3-weekly-strip` 週存資訊旁 |
| B4 | `renderQuestion()` | `b4-question-label` span 後 |
| B5 | `renderRound()` | `b5-budget-label` span 後 |
| B6 | `renderRound()` | 購物清單標題旁 |

| 項目 | 單元 | 搜尋關鍵字 |
|------|------|------------|
| 移除 header-left replay 按鈕 | B1~B6 | `replay-speech-btn`（原 `b-header-left` 已無此 id） |
| 新增內嵌 `.b-inline-replay` 按鈕 | B1~B6 | `b-inline-replay`, `id="replay-speech-btn"` |
| `.b-inline-replay` CSS | `b-series.css` | `.b-inline-replay`, `vertical-align:middle`, `flex-shrink:0` |
| CSS 版本更新 | `b-series.css` | `v=2.7` |
| JS 版本更新 | B1=v3.3, B2=v3.1, B3=v3.1, B4=v3.2, B5=v3.0, B6=v3.1 | — |

#### 14.2 B1 錢幣互動改為拖曳放置

**問題**：原 B1 以點擊錢幣按鈕加入錢包，不符合日常「把錢放入錢包」的直覺動作，且不支援觸控拖曳。
**改進**：錢幣盤改為可拖曳元素，錢包區加入放置區（drop zone）。

**技術設計**：

1. **無限次使用**：HTML5 drag 保留原始元素於盤中；Touch 拖曳建立 ghost clone，放置後 ghost 移除，原始元素不動
2. **桌面 HTML5 DnD**：`dragstart`（含 ghost 圖片）、`dragover`/`dragleave`（.b1-drop-active 高亮）、`drop`（觸發加幣）
3. **觸控模擬**：`touchstart` → 建立 ghost clone → `touchmove`（`passive:false`，跟隨手指）→ `touchend`（命中 drop zone 則加幣）
4. **錢包顯示格子**：已放入的硬幣以 `<div class="b1-placed-coin">` 顯示，點擊可移除（退還）

**難度提示系統**：

| 難度 | 提示機制 |
|------|---------|
| easy | `_updateWalletDisplay()` 每次更新：淡化 `denom > remaining` 的面額（`.b1-coin-faded`）|
| normal | `errorCount` 計數，≥3 次呼叫 `_showCoinHint()`：高亮最佳組合（`.b1-coin-hint` + 語音提示）|
| hard | 顯示「提示」按鈕（`#hint-btn`），點擊後觸發 `_showCoinHint()` |

**貪婪演算法 `_calcOptimalCoins(amount, denoms)`**：
```javascript
_calcOptimalCoins(amount, denoms) {
    const sorted = [...denoms].sort((a, b) => b - a);
    const result = [];
    let rem = amount;
    for (const d of sorted) {
        while (rem >= d) { result.push(d); rem -= d; }
    }
    return rem === 0 ? result : null;
}
```

| 項目 | 單元 | 搜尋關鍵字 |
|------|------|------------|
| 錢幣拖曳元素 `.b1-coin-draggable` | B1 | `b1-coin-draggable`, `draggable="true"` |
| HTML5 拖曳設定 `_setupDragDrop()` | B1 | `_setupDragDrop`, `dragstart`, `drop` |
| 觸控拖曳設定 `_setupTouchDrag()` | B1 | `_setupTouchDrag`, `touchstart`, `touchmove`, `touchend` |
| 放置區 `.b1-drop-zone` / `.b1-drop-active` | B1 | `b1-drop-zone`, `b1-drop-active` |
| 已放置硬幣顯示 `.b1-placed-coin` | B1 | `b1-placed-coin`, `removeCoin` |
| 淡化面額 `.b1-coin-faded` | B1 | `b1-coin-faded`, `_updateWalletDisplay` |
| 提示高亮 `.b1-coin-hint` + `b1CoinHintPulse` | B1 | `b1-coin-hint`, `b1CoinHintPulse`, `_showCoinHint` |
| 錢包目標欄 `.b1-wallet-header` 已放/需要順序 | B1 | `b1-wallet-header`, `已放`, `需要` |
| 行程卡右側總金額 `.b1-total-right` | B1 | `b1-total-right`, `b1-total-tag` |
| 貪婪演算法 | B1 | `_calcOptimalCoins`, `rem`, `sorted` |
| CSS 版本更新 | `b1_daily_budget.css` | `v=2.0` |

---

### 第十五輪（2026-03-16）：對照 F/C/A 系列 report — voices[0] 終極回退、完成畫面 CSS 外部化、移除死碼

#### 根因分析

對照 F/C/A 系列所有 18 個 JS 檔與 B 系列 6 個 JS 檔，發現 3 項遺漏：

1. **`voices[0]` 終極回退缺失**
   - A/C/F 系列所有 `_loadVoice()` 函數在 `zh` 語系 fallback 之後，均設有 `voices[0] || null` 作為最終回退，確保即使在無任何中文語音的裝置上也能嘗試語音輸出
   - B 系列 6 個 JS 均缺少此行，直接以 `null` 結束，造成部分裝置 TTS 靜音失敗

2. **完成畫面 CSS 重複 ~112 行 × 6 檔 = 672 行**
   - 每個 B 系列單元的 `showResults()` 以 `<style>` 標籤內嵌一組完全相同的 `b-res-*` CSS 規則
   - 這些規則應屬全系列共用，正確位置為 `css/b-series.css`
   - 同時，`b-series.css` 中第九輪補齊的 `.completion-screen`、`.stats-grid` 等舊規則（約 90 行）已無任何 B 系列 JS 使用（已全面轉用 `b-res-*` 命名），屬廢棄死碼

3. **`injectGlobalAnimationStyles()` 殭屍動畫規則**
   - 全 6 檔的 `injectGlobalAnimationStyles()` 中均定義了 `@keyframes bGlow` 與 `.performance-badge { animation: bGlow 2s ... }`
   - 但 B 系列完成畫面使用 `class="b-res-perf-badge"`，動畫為 `bResGlow`（定義於 inline CSS 中）；`.performance-badge` 類別從未被任何 B 系列 HTML 元素採用
   - 這些規則是第一輪建立時從 C 系列模板複製但未清理的死碼

#### 修復項目

| 項目 | 受影響檔案 | 搜尋關鍵字 |
|------|-----------|------------|
| `_loadVoice()` 加入 `voices[0] \|\|` 終極回退 | B1~B6 js | `voices[0] \|\|`（第六行，在 `zh` 之後）|
| `showResults()` 移除 inline `<style>` 區塊（~112 行）| B1~B6 js | `b-res-wrapper`（原存在於 `<style>` tag 內，移除後僅剩 CSS class 引用）|
| `injectGlobalAnimationStyles()` 移除死碼 | B1~B6 js | `bGlow`、`.performance-badge`（已全數移除）|
| `b-series.css` 移除廢棄 `.completion-screen` 等舊規則 | `b-series.css` | `.completion-screen`（舊 Round 9 規則，已替換）|
| `b-series.css` 新增 `b-res-*` 共用規則 + 3 keyframes | `b-series.css` | `bResCelebrate`、`bResBounce`、`bResGlow`、`.b-res-wrapper` |

#### 版本更新

| 檔案 | 修改前 | 修改後 | JS 行數差 |
|------|--------|--------|-----------|
| `js/b1_daily_budget.js` | v3.3 / 1152 行 | v3.4 / 1036 行 | −116 行 |
| `js/b2_allowance_diary.js` | v3.1 / 1023 行 | v3.2 / 907 行 | −116 行 |
| `js/b3_savings_plan.js` | v3.1 / 951 行 | v3.2 / 835 行 | −116 行 |
| `js/b4_sale_comparison.js` | v3.2 / 983 行 | v3.3 / 867 行 | −116 行 |
| `js/b5_party_budget.js` | v3.0 / 897 行 | v3.1 / 781 行 | −116 行 |
| `js/b6_market_shopping.js` | v3.1 / 1096 行 | v3.2 / 980 行 | −116 行 |
| `css/b-series.css` | v2.7 | v2.8 | 廢棄 ~90 行 → 新增 b-res-* ~115 行 |

> 各 HTML cache-busting 版號同步更新（b-series.css v2.8，各 JS 版號同上）

---

### 第十六輪（2026-03-16）：speak() onerror 錯誤日誌 + B6 wrong-tip CSS 外部化 + B1 replay class 統一

#### 根因分析

對照 C1/A3/F3 等 A/C/F 系列的 `speak()` 實作，發現 3 項輕量但正確性相關的差距：

1. **`u.onerror = safeCallback`（B 系列全部）vs `u.onerror = (e) => { if (e.error !== 'interrupted') warn; safeCallback(); }`（A/C/F 系列）**
   - B 系列直接把 `safeCallback` 指定給 `onerror`，語音被系統中斷（`e.error === 'interrupted'`）或真正錯誤（`'synthesis-failed'`, `'network'` 等）都靜默處理
   - A/C/F 系列（C1/C2/C3/F3/A3/A6 等）統一使用帶參數的 handler，只在非 interrupted 錯誤時呼叫 `Debug.warn`，保留可觀察性
   - **修正**：全 6 個 B 系列 JS 改為帶參數 onerror handler

2. **B6 `#b6-wrong-tip` 使用 `tip.style.cssText` inline style（~80 字元）**
   - 直接在 JS 中設定 `position:fixed;bottom:80px;...` 等定位與視覺屬性，違反樣式與邏輯分離原則
   - `b6_market_shopping.css` 中沒有對應的 `#b6-wrong-tip` 規則
   - **修正**：將樣式規則移至 `b6_market_shopping.css`；JS 只建立 element 並設 `id`，不設 `style.cssText`

3. **B1 `.b1-inline-replay` 重複定義**
   - `css/b1_daily_budget.css` 的 `.b1-inline-replay`（lines 68–83）與 `css/b-series.css` 的 `.b-inline-replay`（lines 587–603）內容幾乎完全相同（background: none、border: none、font-size: 15px、opacity、hover scale）
   - B2/B3/B4/B5/B6 均使用 `b-inline-replay`；B1 獨用 `b1-inline-replay` 是建立初版時的疏漏
   - **修正**：刪除 `b1_daily_budget.css` 的 17 行重複定義；`b1_daily_budget.js` template 的 class 名稱改為 `b-inline-replay`

#### 修復項目

| 項目 | 受影響檔案 | 搜尋關鍵字 |
|------|-----------|------------|
| `u.onerror` 改為帶 `e` 參數 handler，非 interrupted 時呼叫 `Debug.warn` | B1~B6 js | `u.onerror = (e) => { if (e.error !== 'interrupted')` |
| `#b6-wrong-tip` 樣式規則移至 CSS | `b6_market_shopping.css` | `#b6-wrong-tip { position:fixed;bottom:80px` |
| B6 JS 移除 `style.cssText` 賦值 | `b6_market_shopping.js` | （已刪除 `tip.style.cssText = ...` 3 行）|
| B1 `b1-inline-replay` → `b-inline-replay` | `b1_daily_budget.js` | `class="b-inline-replay"` |
| 移除 `b1_daily_budget.css` 重複 replay 定義 | `b1_daily_budget.css` | （已刪除 `.b1-inline-replay` 和 `.b1-inline-replay:hover` 共 17 行）|

#### 版本更新

本輪修改屬行為對齊（onerror 日誌）與程式碼整潔（CSS 外部化 / 重複刪除），不影響外觀與功能，故版號不變。

---

### 第十七輪（2026-03-16）：gameCompleted → isEndingGame 命名統一 + B4 死碼清除

#### 根因分析

對照 F/C/A 系列各單元完成報告及程式碼，發現 B 系列與其他系列在以下 2 點命名/架構上有差距：

1. **`gameCompleted` vs `isEndingGame`（全 6 檔）**
   - B 系列建立時使用 `gameCompleted` 作為 `showResults()` 的防重入旗標（state init / resetGameState / startGame / showResults 共 5 處），功能上等同但命名不一致
   - C/F/A 系列（C1~C6、F1~F6、A 系列）全部使用 `isEndingGame` 作為此旗標名稱，已記錄於 CLAUDE.md 標準架構
   - **修正**：全 6 個 B 系列 JS，以 `replace_all` 方式將 `gameCompleted` 改為 `isEndingGame`（每檔 5 處）

2. **B4 `@keyframes b4Glow` 死碼**
   - B4 的 `injectGlobalAnimationStyles()` 定義了 `@keyframes b4Glow`（綠色光暈，用 `rgba(16,185,129,0.5)`），但 B 系列完成畫面使用 `class="b-res-perf-badge"`，其動畫由 `b-series.css` 的 `bResGlow`（橙色光暈）負責
   - `b4Glow` 從未被任何 CSS class 或 JS 程式碼引用，屬 Round 1 建立時遺留的多餘定義
   - **修正**：移除 B4 `injectGlobalAnimationStyles()` 中的 4 行 `b4Glow` keyframe 定義

#### 修復項目

| 項目 | 受影響檔案 | 搜尋關鍵字 |
|------|-----------|------------|
| `gameCompleted` → `isEndingGame`（state init、resetGameState、startGame、showResults 守衛、showResults 設旗）| B1~B6 js | `isEndingGame`（已統一為此名稱）|
| 移除 B4 `@keyframes b4Glow` 死碼 | `b4_sale_comparison.js` | `b4Glow`（已刪除 4 行）|

#### 版本更新

本輪修改屬命名統一（`isEndingGame`）與死碼清除（`b4Glow`），不影響外觀與功能，故版號不變。

---

### 第十八輪（2026-03-17）：對照 F/C/A 系列全面合規稽核

#### 稽核說明

以 F/C/A 系列 18 個 JS 檔的完成報告（`F1_Unit_Completion_Report.md`、`C1_Unit_Completion_Report.md`、`A1_Unit_Completion_Report.md` 等）為基準，對 B 系列 6 個 JS 檔逐一稽核 14 項架構指標。

#### 稽核結果（全數通過，無需修改程式碼）

| 指標 | 稽核內容 | B1 | B2 | B3 | B4 | B5 | B6 |
|------|---------|:--:|:--:|:--:|:--:|:--:|:--:|
| **speak() safeCallback** | `callbackExecuted` 旗標 + `safeCallback` + `onerror` 帶參 + 10s 備援 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **voices[0] 終極回退** | `_loadVoice()` 最後為 `voices[0] || null` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **isEndingGame 守衛** | `showResults()` 開頭防重入 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **confetti 遞迴模式** | 無 setInterval，改用遞迴 TimerManager.setTimeout | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **clearByCategory('turnTransition')** | `showResults()` 開頭清除題目過渡計時器 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **removeByCategory('gameUI')** | `showResults()` 開頭清除遊戲 UI 監聽器 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **removeByCategory('settings')** | `_bindSettingsEvents()` 開頭防累積監聽器 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **resetGameState() 呼叫** | `showSettings()` 開頭呼叫 `resetGameState()` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **b-res-* CSS 外部化** | 完成畫面使用 b-res-* class，無 inline style 標籤 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Debug.FLAGS 系統** | 各檔案有 `Game.Debug.FLAGS` 分類旗標 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **injectGlobalAnimationStyles** | 以唯一 id 防重複注入，已清除廢棄 keyframe | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **無裸 setTimeout** | 所有 setTimeout 均透過 `TimerManager.setTimeout` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **無 setInterval** | 全系列無任何 setInterval 呼叫 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **獎勵系統整合** | 設定頁連結 + 完成畫面連結 + EventManager 監聽器 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

#### 補充觀察

**架構選擇差異（刻意保留）**

B 系列 `speak()` 採用**輕量直接**模式（`window.speechSynthesis`），C 系列採用**重型集中**模式（Speech.synth 物件 + 多層 guard）；兩者均安全、均有 safeCallback + 10s 備援，B 系列以可讀性換取精簡，屬刻意設計選擇，不視為缺漏。

**B 系列輔助點擊（ClickMode）**

B 系列未實作 A 系列的 ClickMode 輔助點擊機制。B 系列以**明確 UI 視覺設計**（面額淡化、即時金額條、VS 分隔圖示等）取代輔助點擊，適合其教學情境，不視為缺漏。

#### 結論

B 系列（B1～B6）已完全對齊 F/C/A 系列架構規範，本輪稽核**無需修改任何程式碼**。

---

### 第十九輪（2026-03-17）：設定頁按鈕樣式統一

#### 根因分析

對照 B1/B4 與 B2/B3/B5/B6 設定頁，發現兩組使用不同的按鈕 CSS 類別：

| 單元 | 按鈕 class | 樣式來源 | 難度按鈕色彩 |
|------|-----------|---------|------------|
| B1、B4 | `b-sel-btn` | `css/b-series.css`（橙色/amber 系，`--b-primary`）| `b-diff-easy/normal/hard`（綠/藍/紅）|
| B2、B3、B5、B6 | `selection-btn` | `css/shared-game-base.css`（紫色系，C/F 系列共用）| 無色彩區分 |

B2/B3/B5/B6 使用 `selection-btn` 是建立初版時沿用 C 系列模板，未改為 B 系列專屬樣式，造成：
1. **視覺不一致**：同一 B 系列內，難度選取按鈕 active 狀態顯示橙色（B1/B4）或紫色（B2/B3/B5/B6），風格混雜
2. **缺乏難度色彩**：B2/B3/B5/B6 難度按鈕無 `b-diff-easy/normal/hard` 綠/藍/紅 邊框，視覺辨識度較低

#### 修復項目

| 項目 | 受影響檔案 | 搜尋關鍵字 |
|------|-----------|------------|
| `selection-btn` → `b-sel-btn`（全部設定按鈕、querySelectorAll 選擇器）| B2,B3,B5,B6 js | `b-sel-btn`（已統一） |
| 難度按鈕加入 `b-diff-easy/normal/hard` 色彩類別 | B2,B3,B5,B6 js | `b-diff-easy`, `b-diff-normal`, `b-diff-hard` |

#### 版本更新

| 檔案 | 修改前 | 修改後 |
|------|--------|--------|
| `js/b2_allowance_diary.js` | v3.2 | v3.3 |
| `js/b3_savings_plan.js` | v3.2 | v3.3 |
| `js/b5_party_budget.js` | v3.1 | v3.2 |
| `js/b6_market_shopping.js` | v3.2 | v3.3 |

---

### 第二十輪（2026-03-17）：speak() try-catch 包裝 — 對齊 C1 第六項語音安全機制

#### 根因分析

對照 `report/C1_Unit_Completion_Report.md` 第 4.3 節，C1 `speak()` 共有 6 項安全機制，其中第六項為：

> **try-catch 包裝**：`speechSynthesis.speak(u)` 以 `try { ... } catch(e) { safeCallback(); }` 包裹，捕獲語音合成同步拋出例外，確保 callback 仍被執行。

B 系列原本實作：
```javascript
Game.TimerManager.setTimeout(safeCallback, 10000, 'speech');
window.speechSynthesis.speak(u);
```

在 Android WebView / 部分桌面 Chrome 的邊緣情況下，`speechSynthesis.speak()` 可能**同步拋出例外**（例如：語音引擎未初始化完成、系統語音服務崩潰）。此時：
- `u.onend` / `u.onerror` 均**已登錄**，但因語音播放從未真正啟動，這兩個回調**永遠不會觸發**
- 10s 備援計時器**最終仍會觸發**，但造成 10 秒空白卡頓

修復後，同步例外立即被 catch 攔截，`safeCallback()` 即時執行，遊戲不卡頓。

#### 修復項目

所有 6 個 B 系列 JS 檔案均套用相同修復：

```javascript
// 修復前
Game.TimerManager.setTimeout(safeCallback, 10000, 'speech');
window.speechSynthesis.speak(u);

// 修復後
Game.TimerManager.setTimeout(safeCallback, 10000, 'speech');
try {
    window.speechSynthesis.speak(u);
} catch(e) {
    Game.Debug.warn('speech', '語音播放失敗', e);
    safeCallback();
}
```

| 修復檔案 | 搜尋關鍵字 |
|---------|------------|
| `js/b1_daily_budget.js` | `try.*speechSynthesis.speak`, `語音播放失敗` |
| `js/b2_allowance_diary.js` | 同上 |
| `js/b3_savings_plan.js` | 同上 |
| `js/b4_sale_comparison.js` | 同上 |
| `js/b5_party_budget.js` | 同上 |
| `js/b6_market_shopping.js` | 同上 |

#### B 系列 speak() 完整安全機制（修復後共 6 項，對齊 C1）

| # | 機制 | 實作 |
|---|------|------|
| 1 | `callbackExecuted` 旗標 | 防止 onend/onerror/timeout 三路 callback 重複執行 |
| 2 | `u.onend = safeCallback` | 正常語音結束時觸發 |
| 3 | `u.onerror = (e) => { if (e.error !== 'interrupted') Game.Debug.warn(...); safeCallback(); }` | 語音錯誤時觸發，`interrupted` 不記錄日誌 |
| 4 | `Game.TimerManager.setTimeout(safeCallback, 10000, 'speech')` | 10 秒備援，防止 onend/onerror 均未觸發的永久卡頓 |
| 5 | `synth.cancel()` before `speak()` | 清除語音佇列，防止前一句話被截斷 |
| 6 | `try { synth.speak(u) } catch(e) { safeCallback() }` | 捕獲同步例外，確保即時恢復（**本輪新增**）|

#### 版本更新

| 檔案 | 修改前 | 修改後 |
|------|--------|--------|
| `html/b1_daily_budget.html` | v3.4 | v3.5 |
| `html/b2_allowance_diary.html` | v3.3 | v3.4 |
| `html/b3_savings_plan.html` | v3.3 | v3.4 |
| `html/b4_sale_comparison.html` | v3.3 | v3.4 |
| `html/b5_party_budget.html` | v3.2 | v3.3 |
| `html/b6_market_shopping.html` | v3.3 | v3.4 |

---

### 第二十一輪（2026-03-18）：audio.play() try-catch 補齊 + Debug FLAGS speech 旗標補齊

#### 根因分析

對照 F/C/A 系列所有 JS 檔案，發現 B 系列 2 項細節不一致：

1. **`audio.play()` 缺少 `try-catch` 防護（B2/B3/B5/B6）**
   - B1/B4 的 `audio.play()` 正確使用：
     ```javascript
     try { s.currentTime = 0; s.play().catch(() => {}); } catch(e) {}
     ```
   - B2/B3/B5/B6 直接呼叫：
     ```javascript
     s.currentTime = 0;
     s.play().catch(() => {});
     ```
   - 在部分 iOS / Android WebView 環境下，`s.currentTime = 0` 或 `s.play()` 呼叫可能**同步拋出例外**（例如：音訊元素尚未就緒、autoplay policy 限制）。此時：
     - `.catch(() => {})` 只處理 Promise rejection，無法攔截同步例外
     - 例外會向上傳播，導致呼叫該 `play()` 的函數崩潰，後續邏輯（如語音播報、題目切換）無法執行
   - **修正**：補齊 `try { ... } catch(e) {}` 包裝（對齊 B1/B4 及 A/C/F 系列標準）

2. **Debug FLAGS 缺少 `speech` 旗標（B2/B5/B6）**
   - B1/B3/B4 的 `FLAGS` 含 `speech: false`；B2/B5/B6 不含此旗標
   - `speak()` 中使用 `Game.Debug.warn('speech', ...)` 記錄語音警告，若 `FLAGS.speech` 不存在則永遠為 `undefined`（falsy），語音診斷訊息即使 `all:false` 也無法單獨開啟
   - **修正**：B2/B5/B6 的 `FLAGS` 物件補入 `speech: false`

#### 修復項目

| 項目 | 受影響檔案 | 搜尋關鍵字 |
|------|-----------|------------|
| `audio.play()` 加入 `try { ... } catch(e) {}` | B2, B3, B5, B6 | `try { s.currentTime = 0; s.play().catch` |
| `FLAGS` 補入 `speech: false` | B2, B5, B6 | `speech: false` in `FLAGS` |

#### 版本更新

| 檔案 | 修改前 | 修改後 |
|------|--------|--------|
| `html/b2_allowance_diary.html` | v3.4 | v3.5 |
| `html/b3_savings_plan.html` | v3.4 | v3.5 |
| `html/b5_party_budget.html` | v3.3 | v3.4 |
| `html/b6_market_shopping.html` | v3.4 | v3.5 |

---

### 第二十二輪（2026-03-18）：speak() 命名統一 + 移除多餘 undefined 引數

#### 根因分析

對照 F/C/A 系列及 B 系列其他 JS 檔的 speak() 呼叫慣例，發現 B 系列 3 個 JS 檔有 2 項細節差異：

1. **B3：4 處 `speak(text, undefined)` 顯式傳入 undefined**
   - B3 的錯誤回饋語音（選擇題 retry 模式「不對喔，再想想看」、proceed 模式「正確答案是N週」；數字鍵盤 retry「不對喔，再試一次」、proceed「正確答案是N週」）共 4 處，呼叫時帶有明確的 `undefined` 第二引數
   - 語意上 `speak(text, undefined)` 等同 `speak(text)`（`callback?.()` 對 undefined 呼叫無害），但顯式傳遞 `undefined` 是不良風格，且與 B 系列其他 11 個無回調語音呼叫不一致
   - **修正**：移除 4 處 `undefined` 引數，改為單引數呼叫

2. **B1/B4：`this.Speech.speak()` 而非 `Game.Speech.speak()`（B1 共 7 處，B4 共 9 處）**
   - B1/B4 的語音呼叫使用 `this.Speech.speak()`；B2/B3/B5/B6 統一使用 `Game.Speech.speak()`
   - 由於所有呼叫點都在箭頭函數（arrow function）內，`this` 繼承外層 `=Game` 故功能等同，不造成執行時錯誤
   - 但在程式碼可讀性上，混用 `this.` 和 `Game.` 兩種方式呼叫同一物件的方法，增加維護者理解負擔
   - **修正**：B1/B4 以 `replace_all` 將 `this.Speech.speak(` → `Game.Speech.speak(`，對齊全系列統一命名

#### 修復項目

| 項目 | 受影響檔案 | 搜尋關鍵字 |
|------|-----------|------------|
| 移除 4 處 `speak(text, undefined)` 的 `undefined` 引數 | `js/b3_savings_plan.js` | `Game.Speech.speak(\`不對喔`, `Game.Speech.speak(\`正確答案` |
| `this.Speech.speak(` → `Game.Speech.speak(`（7 處）| `js/b1_daily_budget.js` | `Game.Speech.speak(` |
| `this.Speech.speak(` → `Game.Speech.speak(`（9 處）| `js/b4_sale_comparison.js` | `Game.Speech.speak(` |

#### 版本更新

| 檔案 | 修改前 | 修改後 |
|------|--------|--------|
| `html/b1_daily_budget.html` | v3.5 | v3.6 |
| `html/b3_savings_plan.html` | v3.5 | v3.6 |
| `html/b4_sale_comparison.html` | v3.4 | v3.5 |

---

### 第二十三輪（2026-03-18）：設定頁 CSS 類別遷移 — B2/B3/B5/B6 統一使用 B 系列專屬類別

#### 根因分析

對照 B1/B4 與 B2/B3/B5/B6 的設定頁 HTML 模板，發現兩組在設定群組容器、按鈕群組、標籤文字上使用了不同的 CSS 類別：

| 元素 | B1、B4（已正確）| B2、B3、B5、B6（待修正）| 樣式來源差異 |
|------|----------------|------------------------|------------|
| 設定群組容器 | `b-setting-group` | `setting-group` | B 系列有 card 樣式（背景/邊框/圓角/陰影）；通用版只有 `margin-bottom:20px` |
| 按鈕群組 | `b-btn-group` | `button-group` | B 系列 `gap:8px`；通用版 `gap:10px`；微小但不一致 |
| 設定標籤 | `<label class="b-setting-label">` | `<label>` | B 系列加 `font-size:15px; color:#374151`；通用版僅繼承 `.setting-group label` 規則 |

B2/B3/B5/B6 建立初版時沿用 C 系列（`shared-game-base.css`）的通用類別，未遷移至 B 系列專屬類別（`b-series.css`），造成：

1. **設定頁 card 樣式缺失**：B2/B3/B5/B6 每個設定選項未顯示 `b-setting-group` 的卡片外觀（白底、橙色邊框、圓角、陰影），視覺上較 B1/B4 簡陋
2. **標籤文字樣式不一致**：B1/B4 標籤文字大小/顏色符合 `b-setting-label` 規範，B2/B3/B5/B6 使用繼承樣式
3. **說明文字標籤除外**：底部的 `<label style="font-size:13px;color:#6b7280;...">` 說明文字為 inline style，不在修正範圍內

**確認安全性**：
- `class="setting-group"` 計數：B2=6、B3=6、B5=5、B6=5（全在設定頁，遊戲 UI 無此類別）
- `class="button-group"` 計數：B2=5、B3=5、B5=4、B6=4（同）
- `<label>` 計數：B2=5、B3=5、B5=4、B6=4（皆為無 style 屬性的純設定標籤，不含說明文字標籤）

#### 修復項目

| 項目 | 受影響檔案 | 舊值 | 新值 |
|------|-----------|------|------|
| 設定群組容器類別 | B2, B3, B5, B6 js | `class="setting-group"` | `class="b-setting-group"` |
| 按鈕群組類別 | B2, B3, B5, B6 js | `class="button-group"` | `class="b-btn-group"` |
| 設定標籤類別 | B2, B3, B5, B6 js | `<label>` | `<label class="b-setting-label">` |

全部使用 `replace_all`，不影響說明文字的 `<label style=...>` 標籤。

#### 版本更新

| 檔案 | 修改前 | 修改後 |
|------|--------|--------|
| `html/b2_allowance_diary.html` | v3.5 | v3.6 |
| `html/b3_savings_plan.html` | v3.6 | v3.7 |
| `html/b5_party_budget.html` | v3.4 | v3.5 |
| `html/b6_market_shopping.html` | v3.5 | v3.6 |

---

### 第二十四輪（2026-03-18）：speak() 語音速率統一 + B1 死碼清除

#### 根因分析

對照 A/C/F 系列 18 個 JS 檔案的 `speak()` 實作，發現 B 系列 2 項遺漏：

1. **`u.rate = 0.9`（全 B 系列）vs `utterance.rate = 1.0`（全 A/C/F 系列）**
   - B 系列建立初版時設定語音速率為 0.9（略慢於正常）
   - A/C/F 系列全部使用 1.0（正常速率）：`a1_vending_machine.js`、`c1_money_types.js`、`c2_money_counting.js`、`f1_object_correspondence.js`、`f3_number_recognition.js` 等均已確認
   - 0.9 的速率並非 B 系列設計文件中的刻意決定，且與其他系列一致性相違，學生在 A/C/F 和 B 系列之間切換時會感受到明顯語速差異
   - **修正**：全 6 個 B 系列 JS 以 `replace_all` 將 `u.rate = 0.9` 改為 `u.rate = 1.0`

2. **B1 `state.settings` 含死碼 `assistClick: false`**
   - `b1_daily_budget.js` 的 `state.settings` 初始值包含 `assistClick: false`
   - B2/B3/B4/B5/B6 均無此屬性
   - 搜尋整個 B1 JS 檔案，`assistClick` 只出現一次（初始化），**從未被讀取或使用**
   - B 系列設計不包含 ClickMode 輔助點擊機制（詳見十一章說明），此屬性為初版複製 C 系列模板時的遺留，屬確認廢棄的死碼
   - **修正**：移除 B1 `state.settings` 中的 `assistClick: false`

#### 修復項目

| 項目 | 受影響檔案 | 搜尋關鍵字 |
|------|-----------|------------|
| `u.rate = 0.9` → `u.rate = 1.0` | B1~B6 js | `u.rate = 1.0`（已統一）|
| 移除 `assistClick: false` | `js/b1_daily_budget.js` | `settings: { difficulty: null, questionCount: 10, retryMode: 'retry' }` |

#### 版本更新

| 檔案 | 修改前 | 修改後 |
|------|--------|--------|
| `html/b1_daily_budget.html` | v3.6 | v3.7 |
| `html/b2_allowance_diary.html` | v3.6 | v3.7 |
| `html/b3_savings_plan.html` | v3.7 | v3.8 |
| `html/b4_sale_comparison.html` | v3.5 | v3.6 |
| `html/b5_party_budget.html` | v3.5 | v3.6 |
| `html/b6_market_shopping.html` | v3.6 | v3.7 |

---

### 第二十五輪（2026-03-18）：speak() 語音語系由 cachedVoice 派生 — 對齊 A2 最佳實踐

#### 根因分析

對照 A2（`a2_barber_shop_kiosk.js`）的 `speak()` 實作，發現 B 系列在語音語系設定上有一項細節差異：

**A2 模式（較佳實踐）**：
```javascript
utterance.lang = this.voice.lang;  // 從選定的語音物件派生語系
```

**B 系列（舊模式）**：
```javascript
u.lang = 'zh-TW';  // 硬編碼常數
```

**問題分析**：
- 硬編碼 `'zh-TW'` 在本系統的使用場景下通常正確（所有支援的語音：雅婷、涵涵、Google 國語、zh-TW、zh 均屬中文語系）
- 但若 `cachedVoice` 已選定某語音，`SpeechSynthesisUtterance.lang` 應設為與該語音一致的語系，才能確保語音引擎以正確方式渲染音素
- 例如：若系統回退到 `voices[0]`（可能為英文語音），硬編碼 `'zh-TW'` 反而可能造成語音引擎混淆
- `this.cachedVoice?.lang || 'zh-TW'` 兼顧兩種情形：voice 已載入時使用 voice 的實際語系；voice 未載入時安全回退 'zh-TW'

**B 系列物件命名差異**：A2 使用 `this.voice`；B 系列使用 `this.cachedVoice`，因此改為 `this.cachedVoice?.lang || 'zh-TW'`（加 optional chaining，比 A2 更安全）。

#### 修復項目

```javascript
// 修改前（B1~B6 speak()）：
u.lang = 'zh-TW'; u.rate = 1.0;

// 修改後：
u.lang = this.cachedVoice?.lang || 'zh-TW'; u.rate = 1.0;
```

| 修復檔案 | 搜尋關鍵字 |
|---------|------------|
| `js/b1_daily_budget.js` | `u.lang = this.cachedVoice?.lang \|\| 'zh-TW'` |
| `js/b2_allowance_diary.js` | 同上 |
| `js/b3_savings_plan.js` | 同上 |
| `js/b4_sale_comparison.js` | 同上 |
| `js/b5_party_budget.js` | 同上 |
| `js/b6_market_shopping.js` | 同上 |

#### 版本更新

| 檔案 | 修改前 | 修改後 |
|------|--------|--------|
| `html/b1_daily_budget.html` | v3.7 | v3.8 |
| `html/b2_allowance_diary.html` | v3.7 | v3.8 |
| `html/b3_savings_plan.html` | v3.8 | v3.9 |
| `html/b4_sale_comparison.html` | v3.6 | v3.7 |
| `html/b5_party_budget.html` | v3.6 | v3.7 |
| `html/b6_market_shopping.html` | v3.7 | v3.8 |

---

### 第二十六輪（2026-03-18）：對照 A/C/F 系列全面合規稽核 — 無程式碼修改

#### 稽核方法

本輪以自動化 Agent 對 B1~B6 六個 JS 檔逐項驗證 9 大稽核指標，並與 A 系列（A1~A6）、C 系列（C1~C6）、F 系列（F1~F6）最新實作比對。

#### 稽核結果：全部通過 ✅

| 稽核項目 | B1 | B2 | B3 | B4 | B5 | B6 |
|---------|----|----|----|----|----|----|
| speak() u.lang 從 cachedVoice 派生 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| speak() u.rate = 1.0 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| speak() safeCallback + 10s 備援 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| speak() onerror e.error !== 'interrupted' | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| speak() try-catch 包裝 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| isEndingGame 旗標（init/reset/守衛） | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| startTime null 防護 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| EventManager removeByCategory('gameUI') in showResults | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| EventManager removeByCategory('settings') in _bindSettingsEvents | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Debug FLAGS 含 speech: false | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| confetti 使用遞迴 setTimeout（非 setInterval） | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| audio.play() try-catch + .catch() | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| injectGlobalAnimationStyles 防重複 id 格式 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| TimerManager.clearTimeout 無誤用 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**結論**：B 系列全 14 項指標完全合規，無需程式碼修改。

#### 文件修正（本輪唯一異動）

發現報告第二節「檔案清單」CSS 欄位記載有誤：
- **B1**：CSS 順序錯誤（應為 ai-theme → shared-game-base → b-series → unit CSS → common-modal → dark-mode）
- **B2~B6**：遺漏 `css/ai-theme.css`、`css/common-modal-responsive.css`、`css/dark-mode-simple.css`（實際 HTML 已正確引入，僅報告缺漏）

已修正報告第二節所有 CSS 清單，與實際 HTML 檔案一致。

#### 本輪版本異動

無程式碼修改，所有 HTML 版本號不變：

| 單元 | JS 版本（HTML） |
|------|---------------|
| B1 | v3.8（不變） |
| B2 | v3.8（不變） |
| B3 | v3.9（不變） |
| B4 | v3.7（不變） |
| B5 | v3.7（不變） |
| B6 | v3.8（不變） |

---

### 第二十七輪（2026-03-20）：對照 F/C/A 系列 report — CSS 死碼清除 + 測驗版面結構補充

#### 一、CSS 死碼清除（`css/b-series.css`）

**問題**：`b-series.css` 中保留了舊版完成畫面系統（`.b-completion`）的 CSS 定義，共 85 行。
該系統已於第九/十五輪全面遷移至 `b-res-*` 新系統，舊類別不再被任何 JS 檔案引用。

**驗證方式**：對 `js/b1~b6` 全部 grep `b-completion|b-stats-grid|b-stat-card|b-comp-btns|b-btn-again|b-btn-settings|b-perf-badge|b-trophy` → **0 matches**

**移除清單**：

| 移除類別 / keyframe | 說明 |
|--------------------|------|
| `.b-completion` | 舊完成畫面最外層容器 |
| `.b-completion-header` | 舊紫色漸層標題區（已由 `.b-res-screen` 取代） |
| `.b-trophy` | 舊獎盃 emoji（已由 `.b-res-trophy` 取代） |
| `.b-completion-title` | 舊標題文字（已由 `.b-res-title` 取代） |
| `.b-perf-badge` | 舊表現徽章（已由 `.b-res-perf-badge` 取代） |
| `.b-stats-grid` | 舊統計卡片網格（已由 `.b-res-grid` 取代） |
| `.b-stat-card` | 舊統計卡片（已由 `.b-res-card` 取代） |
| `.b-stat-num` | 舊數字樣式（已由 `.b-res-value` 取代） |
| `.b-stat-label` | 舊標籤樣式（已由 `.b-res-label` 取代） |
| `.b-comp-btns` | 舊按鈕容器（已由 `.b-res-btns` 取代） |
| `.b-btn-again` | 舊「再玩一次」按鈕（已由 `.b-res-play-btn` 取代） |
| `.b-btn-settings` | 舊「返回設定」按鈕（已由 `.b-res-back-btn` 取代） |
| `@keyframes bBounce` | 僅被死碼 `.b-trophy` 引用（已由 `bResBounce` 取代） |

**結果**：`b-series.css` 由 666 行縮減至約 581 行，無 JS 修改，版本號不變。

---

#### 二、B 系列測驗版面結構（對照 F/C/A 標準補充說明）

##### 2-1 整體版面架構

B 系列採用**自訂版面**（不使用 C/F 系列的 `store-layout` / `unified-task-frame`），原因是各單元互動模式差異大（拖曳錢幣、日記帳本、撲滿動畫、比較卡片等）。

所有 B 單元的測驗版面均由 `app.innerHTML = ...` 一次渲染，包含：

```html
<!-- 共用頂部：b-header（三欄式標題列）-->
<div class="b-header">
  <div class="b-header-left">
    <span class="b-header-unit">💰 單元名稱</span>
    <button class="b-inline-replay">🔊</button>   <!-- 語音重播 -->
  </div>
  <div class="b-header-center">難度模式</div>
  <div class="b-header-right">
    <span class="b-progress">第 N 題 / 共 N 題</span>
    <button class="b-reward-btn">🎁 獎勵</button>
    <button class="b-back-btn">返回設定</button>
  </div>
</div>

<!-- 內容區：b-game-wrap（各單元自訂）-->
<div class="b-game-wrap">
  <!-- 單元專屬卡片與互動區 -->
</div>
```

##### 2-2 各單元遊戲區結構

| 單元 | 渲染函數 | 遊戲區主要元素 |
|------|---------|--------------|
| B1 | `renderQuestion()` | `b1-schedule-card`（行程卡）、`b1-wallet-area`（錢包放置區）、`b1-coin-tray`（錢幣托盤，拖曳互動） |
| B2 | `renderQuestion()` | `b2-diary`（日記本容器）、`b2-event-row`（收支事件列）、`b2-answer-card`（答題區） |
| B3 | `renderQuestion()` | `b3-goal-card`（目標商品卡）、`b3-weekly-strip`（每週存款條）、`b3-answer-card`（答題區）、撲滿動畫 |
| B4 | `renderQuestion()` | `b4-item-hero`（商品主視覺）、`b4-compare-grid`（比較網格，1fr auto 1fr）、`b4-option-card`（選項卡） |
| B5 | `renderRound()` | `b5-budget-banner`（預算橫幅）、`b5-total-bar`（即時金額條）、`b5-items-grid`（商品清單 2欄） |
| B6 | `renderRound()` | `b6-list-card`（購物清單）、`b6-stall-tabs`（攤位分頁）、付款找零 UI |

##### 2-3 CSS 分層架構（對照 C/F 系列）

| CSS 檔案 | 類比 C/F | 說明 |
|---------|---------|------|
| `ai-theme.css` | 相同 | Design tokens、全域 CSS 變數 |
| `shared-game-base.css` | 相同 | 通用 `title-bar`、`store-layout` 等基底（B 系列不直接使用這些類，但載入確保 token 可用） |
| `b-series.css` | 類比 `c-series.css` / `f4-number-sorting.css` 的共用部分 | B 系列專屬 tokens（`--b-primary` 等）、標題列、設定頁、遊戲區共用元件、完成畫面（`b-res-*`） |
| `bX_unit.css` | 類比各 C/F 單元 CSS | 各單元專屬元件樣式 |
| `common-modal-responsive.css` | 相同 | 共用響應式彈窗 |
| `dark-mode-simple.css` | 相同 | 深色模式 |

##### 2-4 完成畫面規格（對照 C/F 系列標準 ✅）

| 規格項目 | C/F 標準 | B 系列實作 |
|---------|---------|-----------|
| 背景 | 紫色漸層 `#667eea → #764ba2` | `.b-res-screen` ✅ |
| 獎盃動畫 | 🏆 持續彈跳 | `.b-res-trophy { animation: bResBounce 2s infinite }` ✅ |
| 表現徽章 | 橙色漸層 + glow 動畫 | `.b-res-perf-badge { animation: bResGlow 2s infinite }` ✅ |
| 統計卡片 | 3 張（答對/正確率/時間） | `.b-res-card-1/2/3`（綠/藍/橙） ✅ |
| 再玩按鈕 | 綠色漸層 | `.b-res-play-btn` ✅ |
| 返回按鈕 | 紫色漸層 | `.b-res-back-btn` ✅ |
| 入場動畫 | scale 0.8 → 1.0 | `bResCelebrate 1s ease-out` ✅ |
| 獎勵連結 | 粉紅色按鈕 | `.b-res-reward-link` ✅ |
| 學習成果 | 綠色漸層區塊 | `.b-res-achievements` ✅ |
| 煙火效果 | canvas-confetti 遞迴 | `_fireConfetti()` ✅ |
| 完成語音 | +800ms 延遲 | `TimerManager.setTimeout(..., 800)` ✅ |

#### 三、本輪版本異動

無 JS 修改，版本號不變：

| 單元 | JS 版本（HTML） |
|------|---------------|
| B1 | v3.8（不變） |
| B2 | v3.8（不變） |
| B3 | v3.9（不變） |
| B4 | v3.7（不變） |
| B5 | v3.7（不變） |
| B6 | v3.8（不變） |

---

## 第二十八輪：設定頁無預選、B3 月曆改版、設定頁視覺提升（2026-03-21）

### 一、設定頁無預選（B1~B6）

**問題**：B1~B4 的題數預設選 10、作答模式預設選重試模式；B5/B6 的關數預設選 5，讓使用者不需主動選擇即可開始，缺乏強制選擇感。

**修正內容**：

| 單元 | 修正前 | 修正後 |
|------|--------|--------|
| B1 | `questionCount: 10, retryMode: 'retry'` | `questionCount: null, retryMode: null` |
| B2 | 同上 | 同上 |
| B3 | 同上（含 B3 全面改版，見二） | 見二 |
| B4 | 同上 | 同上 |
| B5 | `rounds: 5` | `rounds: null` |
| B6 | `rounds: 5` | `rounds: null` |

- HTML 模板移除 `active` class（count/mode/rounds 預設按鈕）
- `_checkCanStart()`：B1/B2/B4 需要 `difficulty + questionCount + retryMode`；B5/B6 需要 `difficulty + rounds`
- `resetGameState()` / `startGame()` 移除 `|| 10` / `|| 5` 回退值

### 二、B3 簡單模式月曆改版

**改版理念**：原簡單模式（多選題選週數）改為「月曆模擬存錢」，以視覺化互動方式體驗每天存款達成目標的過程。

**設定頁新增項目**（難度選擇後顯示）：
- **開始日期**：`<input type="date">` 預設今天，用於月曆顯示起點
- **每天存款金額**：自動 / 10元 / 20元 / 30元 / 50元（自動時系統計算使目標約 12~18 天達成）

**新增/修改函數**：

| 函數 | 說明 |
|------|------|
| `_startCalendarSession()` | 選取目標商品、計算每日存款、建立 `state.calendar` |
| `renderCalendar()` | 渲染月曆頁面（header + 進度條 + 月曆格）|
| `_renderCalendarHTML()` | 產生 7 欄月曆格 HTML（past/done/active/future 四態）|
| `_bindCalendarEvents()` | 綁定 `.b3-cal-active` 點擊事件 |
| `_handleDayClick(day)` | 處理日期點擊：累積存款、語音播報、更新狀態 |
| `_onCalendarGoalReached()` | 達成目標：顯示完成畫面（含煙火、語音、統計）|

**狀態結構新增**：
```javascript
calendar: { item, dailyAmount, accumulated, clickedDays, startDate, startTime }
```

**設定頁動態顯示**：
- `b3-cal-settings` 群組（日期、每日金額）：僅 `difficulty === 'easy'` 時顯示
- `b3-quiz-settings` 群組（題數、作答模式）：僅 `difficulty !== 'easy'` 時顯示

**CSS 新增（`b3_savings_plan.css`）**：`b3-cal-*` 類別，含月曆格四種狀態、進度條、目標條、`@keyframes b3CalPulse`。

### 三、設定頁視覺提升（`b-series.css` v2.9）

**修改目標**：對照 A/C/F 系列，提升 B 系列設定頁面的配色、背景、卡片、按鈕、文字視覺品質。

**CSS 新增規則**：

| 規則 | 說明 |
|------|------|
| `.b-series .unit-welcome` | 覆寫背景為 B 系列主題漸層（amber→orange→green） |
| `.b-series .welcome-content` | 頂部加 6px amber 色邊框；縮小 padding |
| `.b-series .welcome-content h1` | 漸層文字色（amber → green）|
| `.b-setting-group` | 邊框改 `#e5e7eb` 淺灰色，hover 提升陰影 |
| `.b-setting-label` | 文字色改 `var(--b-primary-dark)` 橘色，加粗 700 |
| `.b-sel-btn` | `border-radius: 8px → 22px`（膠囊形），`#f9fafb` 背景，`#e5e7eb` 邊框 |
| `.b-sel-btn:hover` | 金色邊框 + 淡黃背景 + 輕微上移 + shadow |
| `.b-sel-btn.active` | 保留主題色 + 更強 shadow |
| `.b-diff-*.active` | 各難度 active 加專屬 shadow |
| `.b-diff-desc.show` | 背景改為淡黃漸層 + 黃色邊框 |
| `.b-series .start-btn` | 主題 amber 漸層，圓角 14px |
| `.b-series .back-btn` | 灰色漸層（返回感），圓角 14px |

### 四、版本異動

| 單元 | JS 版本（HTML） | CSS (b-series.css) |
|------|---------------|-------------------|
| B1 | 無變動 | v2.8 → v2.9 |
| B2 | 無變動 | v2.8 → v2.9 |
| B3 | v3.9 → **v4.0** | v2.8 → v2.9 |
| B4 | 無變動 | v2.8 → v2.9 |
| B5 | 無變動 | v2.8 → v2.9 |
| B6 | 無變動 | v2.8 → v2.9 |

---

## 第二十九輪：B3 月曆 UX 修正（2026-03-21）

### 一、修正項目

使用者回報 B3 簡單模式月曆有 8 項體驗問題，本輪全數修正。

| # | 問題 | 修正方式 |
|---|------|---------|
| 1 | 進入測驗頁面時缺乏引導 | 新增 `_showCalendarTaskPopup()` — 先出現商品彈窗再進入月曆 |
| 2 | 商品資訊不置中、圖示偏小 | 改為置中佈局，`b3-cal-item-icon-lg` 設 `font-size: 64px` |
| 3 | 商品資訊與進度條分散 | 合併為 `.b3-cal-info-card` 單一卡片方框 |
| 4 | 點擊後整頁重新渲染（閃爍） | 改用 `_updateCalendarUI()` in-place DOM 更新，僅跨月時 full re-render |
| 5 | 進度條百分比位置不明顯 | `b3-cal-pct-val` + `b3-cal-target-val` 移至進度條右側 |
| 6 | 缺少目前累積金額顯示 | 進度條上方顯示「已存 **N** 元」（`b3-cal-curr-amount`，綠色大字） |
| 7 | 數字資訊重複出現 | 移除舊 goal-strip / daily-label 分散區塊，統一於卡片內底部統計列 |
| 8 | 存錢格子用 💰（鈔票袋）| 改為 🐷（撲滿）更符合存錢主題 |

### 二、新增函數

| 函數 | 說明 |
|------|------|
| `_showCalendarTaskPopup(onConfirm)` | 顯示任務彈窗（商品圖示、名稱、價格、每日存款、預計天數）；確認後執行 callback |
| `_updateCalendarUI()` | 在不重新渲染整頁的前提下，更新進度條寬度、數字、剛點的格子（active→done）、下一格（future→active）；跨月時 fallback 到 `renderCalendar()` |

### 三、新增 CSS（b3_savings_plan.css）

| 類別 | 說明 |
|------|------|
| `.b3-task-popup-overlay / .b3-task-popup` | 黑色半透明遮罩 + 白色彈窗（頂部 amber 邊框、b3SlotPop 動畫）|
| `.b3-task-item-icon-wrap` | 72px 商品圖示 |
| `.b3-task-meta` | 每日存款 + 預計天數 flex 並排 |
| `.b3-task-start-btn` | amber 漸層膠囊按鈕 |
| `.b3-cal-info-card` | 整合卡片（白底、黃邊框、shadow）|
| `.b3-cal-item-center` | 商品置中區 |
| `.b3-cal-item-icon-lg` | 64px 圖示 |
| `.b3-cal-item-title / .b3-cal-item-target` | 名稱 + 目標金額 |
| `.b3-cal-progress-section` | 進度區（含上方金額、bar row、統計列）|
| `.b3-cal-curr-amount / .b3-cal-acc-num` | 「已存 N 元」顯示（綠色大字）|
| `.b3-cal-bar-row` | 進度條 + 右側數字 flex 容器 |
| `.b3-cal-prog-bar-wrap / .b3-cal-progress-fill` | 新版進度條（覆蓋舊版 `b3-cal-progress-bar`）|
| `.b3-cal-bar-right` | 進度條右側（`pct%` + `target元`）|
| `.b3-cal-stats-row / .b3-cal-stat-sep` | 底部統計列（還需/每天/共N天）|

### 四、版本異動

B3 JS：v4.0（版號不變，內容更新）

---

## 第三十輪：B3 月曆大改版（2026-03-21）

### 一、改版項目

| # | 功能 | 說明 |
|---|------|------|
| 1 | 中心動畫改真實金錢圖示 | `_showCenterFeedback` 改用 `_getMoneyImagesHTML(dailyAmount)` 產生真實幣鈔 `<img>`；`_spawnCoinParticles` 粒子也改為 `<img>` 標籤（`images/money/coin_*.png`）|
| 2 | 設定頁自訂物品上傳 | 比照 F1 自訂主題模式：隱藏 `<input type="file">` + canvas 壓縮（200px / JPEG 0.7）+ 預覽彈窗（輸入名稱與價格）+ 列表面板（最多 5 種，支援刪除）|
| 3 | 自訂物品合入題目池 | `_startCalendarSession()` 和 `_generateQuestions()` 均以 `[...B3_ITEMS_BY_DIFF[diff], ...state.customItems]` 合併；自訂物品不在 `resetGameState` 中清除（遊戲間持續保留）|
| 4 | 統一圖示渲染 | `_itemIconHTML(item, size)` helper：自訂物品回傳 `<img>` 標籤，內建物品回傳 emoji `<span>`；取代 JS 中 5 處 `item.icon` 直接插值 |
| 5 | 資訊卡重設計 | `.b3-cal-info-card`：商品置中（icon + 名稱 + 目標金額）、圓形 % badge 緊鄰右側、絕對定位 🔊 播音按鈕、進度條 + 三行統計列 |
| 6 | 撲滿右側卡片 | `b3-pig-card` 移至版面右側，獨立顯示每天儲存的真實金錢圖示（每點一天新增一枚代表面額的硬幣/鈔票圖示，附淡入動畫）；超過 20 枚顯示「+N天」溢出指示器 |
| 7 | 雙欄版面 | `b3-cal-layout` 改為 `flex-direction: row`；新增 `b3-cal-center-col`（flex 1，包含資訊卡 + 月曆）；`b3-pig-card` 為右側固定寬度欄（160px）；`≤600px` 時改回單欄 |

### 二、新增函數

| 函數 | 所在物件 | 說明 |
|------|---------|------|
| `b3CompressImage(file, maxWidth, quality)` | 頂層（Game 外） | Canvas 壓縮圖片至指定寬度 / JPEG 品質，回傳 base64 |
| `_itemIconHTML(item, size)` | `Game.Calendar` | 統一渲染圖示：自訂物品 `<img>`，內建物品 `<span>` |
| `_renderCustomItemsPanel()` | `Game.Calendar` | 渲染設定頁自訂物品面板（空狀態、卡片列表、新增按鈕）|
| `_updateCustomItemsPanel()` | `Game.Calendar` | 在設定頁 in-place 更新自訂物品面板 |
| `triggerCustomItemUpload()` | `Game.Calendar` | 觸發隱藏 file input |
| `handleCustomItemUpload(event)` | `Game.Calendar` | 讀取檔案 → 壓縮 → 暫存 → 顯示預覽彈窗 |
| `showCustomItemPreview(imageData)` | `Game.Calendar` | 顯示預覽彈窗（圖片 + 名稱/價格輸入框）|
| `closeCustomItemPreview()` | `Game.Calendar` | 關閉預覽彈窗，清除暫存 |
| `confirmAddCustomItem()` | `Game.Calendar` | 驗證輸入 → 建立自訂物品物件 → 推入 `state.customItems` → 更新面板 |
| `removeCustomItem(index)` | `Game.Calendar` | 移除指定自訂物品 → 更新面板 |
| `_pigDenom(dailyAmount)` | `Game.Calendar` | 依每日金額選代表面額（100/50/10/5/1 元）|
| `_renderPiggyBankCard()` | `Game.Calendar` | 渲染撲滿卡片完整 HTML（標題、金幣區、頁尾合計）|
| `_updatePiggyBankCard()` | `Game.Calendar` | 在 `_updateCalendarUI()` 後 in-place 更新撲滿卡片 |
| `_getMoneyImagesHTML(amount)` | `Game.Calendar` | 貪婪分解金額為最多 3 枚幣鈔圖示，回傳 HTML |

### 三、State 結構新增

```javascript
// Game.state
customItems: []      // { name, price, imageData, isCustom:true }，resetGameState 不清除

// Game.tempItemImageData（直掛 Game，非 state）
tempItemImageData: null   // 上傳預覽時的暫存 base64
```

### 四、版面 CSS 新增（b3_savings_plan.css）

| 類別 | 說明 |
|------|------|
| `.b3-cal-layout` | 改為 `flex-direction: row`，`max-width: 860px` |
| `.b3-cal-center-col` | `flex: 1`，`flex-direction: column`，`gap: 14px` |
| `.b3-pig-card` | `width: 160px`，amber 漸層，獨立右側卡片 |
| `.b3-pig-header / .b3-pig-title` | 撲滿標題列 |
| `.b3-pig-coins-wrap` | `flex: 1`，`flex-wrap: wrap`，溢出滾動 |
| `.b3-pig-coin` | 單枚金幣圖示容器（含 `b3PigCoinIn` 淡入動畫）|
| `.b3-pig-coin-new` | 觸發 `b3PigCoinIn` keyframe |
| `.b3-pig-footer / .b3-pig-total-num` | 底部合計金額 |
| `.b3-cal-pct-badge` | 圓形進度 % badge（綠色） |
| `.b3-cal-replay-btn` | 絕對定位右上角 🔊 按鈕 |
| `@keyframes b3PigCoinIn` | 撲滿新增金幣淡入+縮放動畫 |
| `@media (max-width: 600px)` | 單欄回退：`.b3-cal-layout` 改 column，pig card 水平排列 |
| 自訂物品面板 | `.b3-custom-items-list / .b3-custom-item-card / .b3-custom-item-img` 等 |
| 預覽彈窗 | `.b3-modal-overlay / .b3-modal-box / .b3-modal-btn-confirm / .b3-modal-btn-cancel` |

### 五、b-series.css 更新

`.b-cf-icon`：加入 `display: inline-flex; align-items: center; gap: 6px`，支援多枚金錢圖示並排顯示（中心回饋動畫）。

### 六、版本異動

B3 JS：v4.1（建議更新 HTML cache-busting 版號）

---

## 第三十一輪：B3 撲滿卡片重設計（2026-03-21）

### 一、改版理念

第三十輪的撲滿卡片（`b3-pig-card`）採用「每點一天放入一個代表面額的硬幣/鈔票」的概念，但無法讓學生看出「我共存了多少錢」、「需要幾枚什麼面額」。本輪改版為**面額分組表格**，每次點擊後動態更新各面額的數量，展示累積金額的完整幣鈔組成。

同時將撲滿卡片寬度從固定 `160px` 改為 `flex: 1`，與中央欄等寬，提供更多顯示空間。

---

### 二、設計規格

**面額分解邏輯**：`_decomposeToDenominations(amount)` 使用貪婪演算法，依 `[1000, 500, 100, 50, 10, 5, 1]` 順序分解，回傳各面額數量物件 `{ 1000: N, 100: M, ... }`。

**表格佈局**：每個面額一列（`b3-pig-row`），左欄（`b3-pig-row-label`，76px 固定寬）顯示縮圖 + 面額文字，右欄（`b3-pig-row-imgs`）顯示實際金錢圖片。

**金錢圖示大小**（對齊 A3 付款頁面）：
- 硬幣（< 100 元）：55px
- 紙鈔（≥ 100 元）：90px
- 縮圖（左欄）：硬幣 28px、紙鈔 40px

**面額分組順序**：硬幣（1/5/10/50）在上，紙鈔（100/500/1000）在下，小面額→大面額由上而下。

**進位換算提示**：當 `_updatePiggyBankCard()` 偵測到大面額（100/500/1000元）數量增加時（代表進位），顯示綠色換算提示徽章（`_showExchangeBadge`），例如「10 × 10元 → 1 × 100元」。

**最多顯示數**：`MAX_SHOW = 10`，超過時末尾顯示 `+N` 琥珀色溢出標記。

---

### 三、新增 / 修改函數

| 函數 | 說明 |
|------|------|
| `_decomposeToDenominations(amount)` | 貪婪演算法將金額分解為各面額數量（回傳物件）|
| `_renderPiggyBankCard(changedDenoms)` | 重寫：產生面額分組表格 HTML；`changedDenoms` 為本次有變化的面額集合（用於觸發新增動畫）|
| `_updatePiggyBankCard()` | 重寫：比對舊/新分解結果 → 找出 changedDenoms → 偵測進位換算 → 呼叫 `_renderPiggyBankCard` in-place 更新 |
| `_showExchangeBadge(container, {from, fromCount, to})` | 在撲滿卡片絕對定位顯示綠色換算提示，2200ms 後淡出移除（`TimerManager`）|

**已移除**（第三十輪建立，本輪取代）：

| 移除函數 | 原說明 |
|---------|--------|
| `_pigDenom(dailyAmount)` | 依每日金額選代表面額（已無此概念） |
| `_pigMoneyImg(denom, size)` | 產生單枚圖示（已內聯至 renderRow）|
| `_renderDenomGroup(title, items)` | 分組渲染（已改為 renderRow 內層函數）|

---

### 四、版面 CSS 異動（b3_savings_plan.css）

**`.b3-cal-layout`**：調整 `align-items: flex-start`（兩欄不等高時各自頂對齊）

**`.b3-pig-card`**：`flex: 1; min-width: 0`（改為與中央欄等寬，移除 `width: 160px`）

**完整新增 pig card 內部樣式**：

| 類別 | 說明 |
|------|------|
| `.b3-pig-header` | flex row，左：標題 + 子標題；右：合計金額 |
| `.b3-pig-header-left` | 🐷 標題 + 子標題 column |
| `.b3-pig-header-total` | 合計金額（黃色背景，大字）|
| `.b3-pig-body` | flex column，`overflow-y: auto`（scrollbar-width: thin）|
| `.b3-pig-group` | 硬幣 / 紙鈔分組容器 |
| `.b3-pig-group-hd` | 分組標題（灰色小字）|
| `.b3-pig-group-divider` | 分組分隔線 |
| `.b3-pig-row` | `display: grid; grid-template-columns: 76px 1fr; gap: 10px` |
| `.b3-pig-row-label` | 縮圖 + 面額文字（置中 column flex，黃色邊框背景）|
| `.b3-pig-row-thumb` | 縮圖（inline 覆寫尺寸）|
| `.b3-pig-row-denom` | 面額文字（灰色，11px）|
| `.b3-pig-row-imgs` | flex wrap，gap 6px |
| `.b3-pig-img-wrap` | 單枚容器（hover scale，drop-shadow）|
| `.b3-pig-img-new` | 觸發 `b3PigCoinIn` drop-in 動畫 |
| `.b3-pig-denom-overflow` | `+N` 溢出標記（琥珀色）|
| `.b3-pig-exchange-badge` | 換算提示徽章（綠色，絕對定位）|
| `.b3-pig-exch-eq` | 換算等號「→」|
| `.b3-pig-exch-sub` | 換算描述文字（小字）|
| `@keyframes b3PigCoinIn` | 新金幣/鈔票下落淡入動畫 |
| `@keyframes b3ExchPop` | 換算徽章彈出動畫 |
| `@keyframes b3ExchFade` | 換算徽章淡出動畫 |
| `@media (max-width: 600px)` | `.b3-cal-layout { flex-direction: column }`；`.b3-pig-card { flex: none; width: 100% }` |

**已移除**（舊版 pig card CSS）：
`.b3-pig-coins-wrap`、`.b3-pig-coin`、`.b3-pig-coin-new`（改為 `.b3-pig-img-new`）、`.b3-pig-extra`、`.b3-pig-footer`、`.b3-pig-total-num`

---

### 五、換算偵測邏輯

```javascript
// _updatePiggyBankCard() 中：
const oldDecomp = _decomposeToDenominations(accumulated - dailyAmount);
const newDecomp = _decomposeToDenominations(accumulated);

// changedDenoms：新值 > 舊值的面額
const changedDenoms = {};
for (const d of [1, 5, 10, 50, 100, 500, 1000]) {
    if ((newDecomp[d] || 0) > (oldDecomp[d] || 0)) changedDenoms[d] = true;
}

// 換算偵測（大面額增加代表進位）：
let exchangeMsg = null;
for (const [d, fromD, fromCount] of [[1000, 100, 10], [500, 100, 5], [100, 10, 10]]) {
    if ((newDecomp[d] || 0) > (oldDecomp[d] || 0)) {
        exchangeMsg = { from: fromD, fromCount, to: d }; break;
    }
}
if (exchangeMsg) _showExchangeBadge(container, exchangeMsg);
```

---

### 六、版本異動

B3 JS 版號：v4.1（本輪無版號更新，CSS 改版屬視覺調整）

---

## 十二、學習目標與設計理念（2026-03-23 補充）

### 12.1 B 系列總學習目標

B 系列定位為**「預算規劃」**情境，建立在 C 系列（貨幣認知）和 A 系列（生活場景模擬）之上，針對以下能力進行延伸訓練：

| 層次 | 能力 | 對應單元 |
|------|------|---------|
| 計算 | 加減乘除應用於金錢場景 | B1/B2/B3/B4 |
| 比較 | 判斷哪個方案更省錢 | B4 |
| 規劃 | 分配有限預算、選擇優先順序 | B5/B6 |
| 累積 | 理解長期儲蓄概念（時間 × 金額） | B3 |
| 記錄 | 追蹤日常收支（記帳概念） | B2 |
| 採購 | 實際生活中的購物決策 | B6 |

### 12.2 各單元設計動機

| 單元 | 真實生活情境 | 設計動機 |
|------|------------|---------|
| B1 | 出門前準備零用錢 | 在錢幣互動中培養快速估算能力；面額 → 金額對應 |
| B2 | 週記帳本 | 培養記帳習慣與正負數加減；視覺化收入/支出 |
| B3 | 制定存錢計畫 | 從「每週存N元，幾週存夠？」→月曆日存體驗目標感 |
| B4 | 超市/攤位比價 | 建立比價意識；計算差額鞏固減法概念 |
| B5 | 生日派對籌備 | 有限預算內決策：必買優先、選購取捨 |
| B6 | 市場採購付款 | 端到端購物流程：清單 → 採購 → 付款 → 找零 |

### 12.3 B 系列與 A/C 系列的定位關係

```
C 系列（貨幣認知）         A 系列（生活場景模擬）
   ↓ 認識錢幣面額              ↓ 操作販賣機/ATM/售票機
   ↓ 數錢、找零                ↓ 完整付款流程
         ↘                    ↙
            B 系列（預算規劃）
            → 將金錢知識應用於日常預算決策
            → 規劃、比較、採購、累積
```

### 12.4 難度設計原則（全系列共用）

| 難度 | 策略 | 數字範圍 | 輔助 |
|------|------|---------|------|
| 簡單（easy） | 降低計算負擔，聚焦概念理解 | 小金額、整數倍 | 提示、自動確認 |
| 普通（normal） | 中等複雜度，需較多心算 | 中金額 | 部分提示 |
| 困難（hard） | 完整挑戰，接近真實場景 | 大金額、不整除 | 無自動提示 |

---

## 十三、各單元難度對照表（詳細版，2026-03-23 補充）

### 13.1 B1 今天帶多少錢

| 項目 | 簡單 | 普通 | 困難 |
|------|------|------|------|
| 可用面額 | 1/5/10/50 元 | 1/5/10/50/100/500 元 | 1/5/10/50/100/500/1000 元 |
| 總金額顯示 | 顯示（行程卡上） | 顯示（行程卡上） | 隱藏（`??? 元`，需自行加總）|
| 費用項目數 | 1~2 項 | 2~3 項 | 3~4 項 |
| 典型金額範圍 | 10~50 元 | 50~300 元 | 100~700 元 |
| 面額提示 | 不可用面額自動淡化（`.b1-coin-faded`）| 答錯 3 次後高亮最佳組合（`b1-coin-hint`）| 提示鈕（`#hint-btn`）才顯示最佳組合 |
| 語音內容 | 「今天要去X，需要準備X，共N元」| 「今天要去X，需要準備X，把錢幣放進錢包」| 「今天要去X，需要準備X，自己算好總金額！」|

### 13.2 B2 零用錢日記

| 項目 | 簡單 | 普通 | 困難 |
|------|------|------|------|
| 日記事件數 | 2 筆 | 4 筆 | 6 筆 |
| 答題方式 | 三選一按鈕 | 數字鍵盤輸入 | 數字鍵盤輸入 |
| 干擾項間距 | ≥20 元（fixed delta array 確保有效）| — | — |
| 金額範圍 | 20~100 元 | 50~500 元 | 100~1000 元 |
| 含負數結果？ | 否（餘額恆為正）| 可能為負 | 可能為負 |
| 資料組數 | 8 組 | 8 組 | 6 組 |

### 13.3 B3 存錢計畫

**測驗模式（普通/困難）**：

| 項目 | 簡單（月曆模式，2026-03-21）| 普通 | 困難 |
|------|--------------------------|------|------|
| 互動方式 | 月曆點擊存錢（模擬日存）| 三選一按鈕 | 數字鍵盤輸入 |
| 商品金額 | ≤400 元（`B3_ITEMS_BY_DIFF.easy`） | ≤800 元 | 280~2400 元（全部）|
| 週存金額選項 | 自動計算（目標 12~18 天達成）| `B3_WEEKLY_OPTIONS.normal` | `B3_WEEKLY_OPTIONS.hard` |
| 計算公式 | 每天累積存款（不需計算）| `Math.ceil(price / weekly)` 週 | `Math.ceil(price / weekly)` 週 |
| 動畫回饋 | 月曆格 done 變色 + 撲滿卡片面額表格更新 | 撲滿格子填充動畫（8 格）| 同普通 |
| 題數 | 不限（完成目標為止）| 設定頁選擇 | 設定頁選擇 |

### 13.4 B4 特賣比一比

| 項目 | 簡單 | 普通 | 困難 |
|------|------|------|------|
| 回答內容 | 只需選出便宜的那家 | 選便宜 + 三選一差額 | 選便宜 + 數字鍵盤差額 |
| 差額範圍 | — | 10~200 元 | 10~500 元 |
| 資料庫 | `B4_ITEMS`（20 組，同一份）| 同 | 同 |
| 商品類型 | 日用品/文具/零食（各 5~7 件）| 同 | 同 |
| 語音說明 | 「哪個地方比較便宜？」| 「…選出之後再回答便宜了多少元」| 「…選出之後輸入差額」|

### 13.5 B5 生日派對預算

| 項目 | 簡單 | 普通 | 困難 |
|------|------|------|------|
| 預算金額 | 200~400 元 | 350~600 元 | 500~900 元 |
| 商品總數 | 5 件（`B5_SCENARIOS.easy` availableIds 5 件）| 7~8 件 | 10~12 件 |
| 必買商品數 | 2 件（蛋糕+飲料）| 2 件 | 2 件 |
| 超支容忍度 | 較寬鬆（差距大）| 中 | 緊湊（幾乎剛好）|
| 場景組數 | 8 組 | 8 組 | 8 組 |

### 13.6 B6 菜市場買菜

| 項目 | 簡單 | 普通 | 困難 |
|------|------|------|------|
| 購物清單數量 | 2~3 件 | 3~4 件 | 4~5 件 |
| 涉及攤位數 | 1~2 個攤位 | 2~3 個攤位 | 全部 3 個攤位 |
| 預算金額 | 100~200 元 | 150~350 元 | 250~500 元 |
| 付款面額 | 50/100/500 元 | 50/100/500/1000 元 | 全部 7 種面額 |
| 場景組數（各難度）| 5~6 組 | 5~6 組 | 5~6 組 |

---

## 十四、各單元遊戲流程（2026-03-23 補充）

### 14.1 B1 今天帶多少錢

```
設定頁（選難度/題數/作答模式）
    ↓
renderQuestion()  ← 顯示行程卡（地點/項目/金額）
    ↓ +400ms
Speech 題目語音（依難度調整內容）
    ↓
學生拖曳/點選錢幣 → 錢包合計即時更新
    ↓
合計 ≠ 目標：b1Shake 震動 + 語音提示（不強制跳題）
合計 = 目標：「確認」按鈕解鎖 → 點確認 → 評分
    ↓
答對：語音「太棒了！」+ correctFeedback + 進下一題
超出：語音「錢太多了，試著移除一些」→ 繼續嘗試
    ↓
全部題目完成 → showResults()
```

**B1 特殊分支（難度提示）**：

```
普通模式答錯 3 次
    → _showCoinHint()：高亮最佳面額組合（b1-coin-hint CSS class）
    → 語音「需要N元，試試看這些面額」

困難模式按提示鈕（#hint-btn）
    → _calcOptimalCoins() 貪婪演算法
    → 標示最佳組合（不揭示總金額）
```

### 14.2 B2 零用錢日記

```
設定頁（選難度/題數/作答模式）
    ↓
renderQuestion()  ← 顯示日記本（N 筆收支事件）
    ↓ +500ms
Speech：「看看日記，計算最後剩下多少錢？」
    ↓
簡單：顯示 3 個選項按鈕
普通/困難：顯示數字鍵盤（最大 5 位，含負數 -999）
    ↓
正確：
  Speech「答對了！剩下N元」+ correct 音效 + 1400ms 進下一題
錯誤 retry：
  Speech「不對喔，再想想看」+ 重置鍵盤/選項
錯誤 proceed：
  Speech「正確答案是N元」+ 顯示答案 hint + 1400ms 進下一題
    ↓
全部完成 → showResults()
```

### 14.3 B3 存錢計畫（普通/困難）

```
設定頁（選難度/題數/作答模式）
    ↓
renderQuestion()  ← 顯示目標商品卡（圖示/名稱/價格/週存選項）
    ↓ +500ms
Speech：「想要買X，需要N元，每週存Y元，要幾週才夠？」
    ↓
普通：顯示 3 個週數選項按鈕
困難：顯示數字鍵盤
    ↓
正確：
  Speech「答對了！需要N週」
  → 撲滿格子填充動畫（最多 8 格，350ms 間隔，coin 音效）
  → 填滿後豬豬震動 → 1000ms 後進下一題
錯誤 retry：
  Speech「不對喔，再想想看」+ 重置
錯誤 proceed：
  Speech「正確答案是N週」+ hint div + 2200ms 進下一題
    ↓
全部完成 → showResults()
```

### 14.4 B3 月曆存錢模式（簡單，2026-03-21）

```
設定頁（選 easy 難度 → b3-cal-settings 顯示）
選開始日期 + 每日存款金額 → 點開始
    ↓
_startCalendarSession()
  → 隨機抽取目標商品（≤400 元）
  → 計算每日存款（或使用設定值）
    ↓
_showCalendarTaskPopup()
  → 顯示商品/每日存款/預計天數 → 使用者確認
    ↓
renderCalendar()
  → 月曆格：past(灰)/done(綠/🐷)/active(脈動)/future(灰白)
  → 資訊卡：商品名稱/目標/進度條/已存金額
  → 撲滿卡片（右側）：面額分組表格
    ↓
使用者點擊 active 格子（_handleDayClick）
  → 累積存款 += dailyAmount
  → _updateCalendarUI()（in-place DOM 更新，不重繪整頁）
  → 撲滿卡片更新（_updatePiggyBankCard）
  → 偵測進位換算 → 顯示換算徽章
  → 語音「存了N元，還需要M元」
    ↓
accumulated >= target
  → _onCalendarGoalReached()：煙火 + 語音「存到了！」+ showResults()
```

### 14.5 B4 特賣比一比

```
設定頁（選難度/題數/作答模式）
    ↓
renderQuestion()  ← 顯示商品主視覺 + 比較卡片（1fr | VS | 1fr）
                   optA/optB 左右位置隨機交換（swapped 旗標）
    ↓ +400ms
Speech：「XX，哪個地方比較便宜？」（依難度加後綴）
    ↓
【Select 階段】
學生點選較便宜的選項卡
  正確（easy）：直接加分 + 語音 + 進下一題
  正確（normal/hard）：語音「選對了！再計算便宜了多少元」→ 進 Diff 階段
  錯誤 retry：語音「這邊比較貴喔，再看看另一邊」+ 1500ms 重置
  錯誤 proceed：語音「答錯了，X才是便宜的」+ 直接跳題
    ↓
【Diff 階段】（普通/困難）
普通：三選一差額按鈕（_getDiffOptions 生成干擾項）
困難：數字鍵盤輸入
  正確：語音「對了！便宜了N元」+ 加分 + 進下一題
  錯誤 retry：語音「差額是N元，再試一次」+ 重置
  錯誤 proceed：顯示正確答案 + 跳題
    ↓
全部完成 → showResults()
```

### 14.6 B5 生日派對預算

```
設定頁（選難度/關數）
    ↓
renderRound()  ← 顯示預算橫幅 + 商品清單（2欄）
                必買商品（🔒 鎖定，預先加入 selectedIds）
    ↓ +400ms
Speech：「你有N元的預算，記得選所有必買商品！」
    ↓
學生點選商品（必買鎖定/可選商品切換）
→ b5-total-bar 即時更新（ok/near/over 三態顏色）
→ 確認鈕：mustOk && budgetOk && total > 0 才啟用
    ↓
點確認 → 評分
  全部 mustOk && 未超支：
    Speech「太棒了！共花了N元，還剩N元！」+ 進下關
  必買未選：
    Speech「記得要選所有必買的商品喔！」+ 顯示「再試一次」
  超支：
    Speech「超出預算了，多了N元，再試一次！」+ 顯示「再試一次」
    ↓
全部關卡完成 → showResults()
```

### 14.7 B6 菜市場買菜

```
設定頁（選難度/關數）
    ↓
renderRound()  ← 顯示購物清單 + 攤位分頁（蔬菜/水果/雜貨）
    ↓ +600ms
Speech：讀出購物清單商品名稱（全部）
    ↓
【Shopping 階段】
學生切換攤位標籤 → 點擊清單上的商品
  正確商品：✓ 勾選清單，音效
  錯誤商品：b6-wrong-tip 浮動提示 2 秒 + 語音「X不在清單上」（不扣分）
全部商品勾選完成 → 自動進入 Payment 階段
    ↓
【Payment 階段】
顯示消費總額 + 面額按鈕（依難度提供面額）
學生點選面額累積付款金額
付款金額 >= 消費總額 → 「確認付款」按鈕解鎖
    ↓
點確認付款 → 進入 Change 階段
    ↓
【Change 階段】
顯示找零金額
Speech「你付了N元，找回N元，買菜成功！」
→ 進下一關
    ↓
全部關卡完成 → showResults()
```

---

## 十五、題目生成邏輯與資料庫結構（2026-03-23 補充）

### 15.1 B1 題目生成

```javascript
// B1_SCHEDULE_ITEMS（行程資料庫，各難度對應不同行程）
// 格式：{ label: '去圖書館', items: [{name:'借書證費', amount:30},...], total: 30 }

// 題目生成：從對應難度的 schedule pool 隨機抽題
const pool = B1_SCHEDULES_BY_DIFF[difficulty];
const question = pool[Math.floor(Math.random() * pool.length)];

// 最佳組合演算法（提示用）
_calcOptimalCoins(targetAmount, availableDenoms) {
    // 貪婪法：由大到小選取面額
    const result = {};
    let remaining = targetAmount;
    for (const denom of availableDenoms.sort((a,b)=>b-a)) {
        const count = Math.floor(remaining / denom);
        if (count > 0) { result[denom] = count; remaining -= count * denom; }
    }
    return result;  // { 100: 2, 50: 1, ... }
}
```

### 15.2 B2 題目生成

```javascript
// B2_TEMPLATES 結構
const B2_TEMPLATES = {
    easy: [   // 8 組，2 筆事件
        { events: [{type:'income',desc:'零用錢',amount:50},{type:'expense',desc:'文具',amount:20}], answer:30 },
        // ...
    ],
    normal: [...],  // 8 組，4 筆事件
    hard: [...]     // 6 組，6 筆事件
};

// 選題：打亂後依序取用，全部用完重新打亂（shuffle）
// 簡單模式干擾項生成（間距保證有效）：
const FIXED_DELTAS = [15, 20, 25, 30, 40, 50];
const delta = FIXED_DELTAS[Math.floor(Math.random() * FIXED_DELTAS.length)];
const options = [answer, answer + delta, answer - delta].sort(() => Math.random()-0.5);
```

### 15.3 B3 題目生成

```javascript
// B3_ALL_ITEMS（20 種商品；2026-03-24 擴充，原 14 件）
const B3_ALL_ITEMS = [
    { name:'鉛筆盒', icon:'✏️', price:280 },
    { name:'積木組', icon:'🧱', price:350 },
    { name:'繪本',   icon:'📚', price:450 },
    // ... 共 14 件，price 範圍 280~2400 元
];

// B3_ITEMS_BY_DIFF（依難度篩選）
const B3_ITEMS_BY_DIFF = {
    easy:   B3_ALL_ITEMS.filter(i => i.price <= 400),
    normal: B3_ALL_ITEMS.filter(i => i.price <= 800),
    hard:   B3_ALL_ITEMS
};

// 核心計算
const answer = Math.ceil(price / weeklyAmount);

// 普通模式三選一干擾項（_getWeeklyOptions）：
// answer ± 1、± 2、± 3 中隨機取 2 個不同值，確保 > 0
```

### 15.4 B4 題目生成

```javascript
// B4_ITEMS（20 組）
const B4_ITEMS = [
    { name:'原子筆', optA: { store:'文具行', price:35 }, optB: { store:'超市', price:25 } },
    // optA 永遠 > optB（cheaper 永遠是 optB）
    // ...
];

// 左右交換邏輯（避免正確答案永遠在固定側）
const swapped = Math.random() < 0.5;
const leftOpt  = swapped ? item.optB : item.optA;
const rightOpt = swapped ? item.optA : item.optB;
// correctSide = swapped ? 'left' : 'right'

// 差額選項生成（_getDiffOptions）
const diff = item.optA.price - item.optB.price;
const offsets = [-10, +10, -20, +20].slice(0,2);
const distractors = offsets.map(d => diff + d).filter(v => v > 0 && v !== diff);
```

### 15.5 B5 題目生成

```javascript
// B5_ALL_ITEMS（12件）
const B5_ALL_ITEMS = [
    { id:'cake',     name:'蛋糕',   icon:'🎂', price:120, must:true },
    { id:'drinks',   name:'飲料',   icon:'🧃', price: 60, must:true },
    { id:'balloon',  name:'氣球',   icon:'🎈', price: 30 },
    // ... 共 12 件
];

// B5_SCENARIOS（各難度 8 組）
// 格式：{ budget: 350, availableIds: ['cake','drinks','balloon','chips','candle'] }
// 設計約束：所有 must 商品總價 < budget，存在可行解

// 關卡驗證邏輯
const mustTotal = items.filter(i=>i.must).reduce((s,i)=>s+i.price,0);
const selectedTotal = selectedIds.reduce((s,id)=>s+findItem(id).price,0);
const mustOk = mustItems.every(i => selectedIds.includes(i.id));
const budgetOk = selectedTotal <= scenario.budget;
```

### 15.6 B6 題目生成

```javascript
// B6_STALLS（3 個攤位，各 6 件商品）
const B6_STALLS = {
    veggie: { name:'蔬菜攤', items: [
        { id:'cabbage', name:'高麗菜', icon:'🥬', price:25 },
        // ...
    ]},
    fruit:  { name:'水果攤', items: [...] },
    grocery:{ name:'雜貨攤', items: [...] }
};

// B6_MISSIONS（各難度 5~6 組）
// 格式：{ budget:200, items:[{stall:'veggie',id:'cabbage'},{stall:'fruit',id:'apple'},...] }
// 設計約束：total < budget（確保有找零）

// 找零計算
const total = mission.items.reduce((s,item) => s + getItemPrice(item), 0);
const change = paidAmount - total;
```

---

## 十六、B3 月曆存錢模式詳解（2026-03-23 補充）

> 月曆模式於 2026-03-21 第二十八輪引入，第二十九輪（UX 修正）與第三十輪（大改版）和第三十一輪（撲滿卡片重設計）持續完善。

### 16.1 完整狀態結構

```javascript
// Game.state（月曆模式專用欄位）
calendar: {
    item:         Object,   // 目標商品 { name, price, icon, imageData? }
    dailyAmount:  Number,   // 每日存款金額（設定頁選擇或自動計算）
    accumulated:  Number,   // 已累積存款（初始 0）
    clickedDays:  Number,   // 已點擊天數
    startDate:    Date,     // 月曆起始日（設定頁 date input）
    startTime:    Number    // Date.now()，用於完成畫面計時
}

// Game（直接掛載，非 state）
customItems:        Array   // [{ name, price, imageData, isCustom:true }]，resetGameState 不清除
tempItemImageData:  null    // 上傳預覽時的暫存 base64
```

### 16.2 每日存款金額計算邏輯

```javascript
// 設定頁「自動」選項時：
// 目標：12~18 天達成 → 推算每日金額
const autoDaily = (difficulty) => {
    const targetDays = 15;  // 目標天數中點
    const raw = Math.ceil(item.price / targetDays);
    // 四捨五入到最近的 5 元倍數（視覺上更整齊）
    return Math.round(raw / 5) * 5 || 5;
};
```

### 16.3 月曆格子狀態機

```
future（灰白，不可點）
    ↓（到達日期後）
active（脈動高亮，可點擊）：當天可存款
    ↓（點擊後）
done（綠色/🐷，已存款）
    ↓（過去已點的日期）
past（灰色，已過去）
```

**CSS keyframe**：`b3CalPulse`（active 格子脈動效果）

### 16.4 撲滿卡片面額分解邏輯

```javascript
// _decomposeToDenominations(amount) — 貪婪演算法
const DENOMS = [1000, 500, 100, 50, 10, 5, 1];
function _decomposeToDenominations(amount) {
    const result = {};
    let remaining = amount;
    for (const d of DENOMS) {
        const cnt = Math.floor(remaining / d);
        if (cnt > 0) { result[d] = cnt; remaining -= cnt * d; }
    }
    return result;  // { 100: 2, 10: 3, 1: 2 } 等
}
```

### 16.5 進位換算偵測

點擊一天後，比較前後的分解結果：

| 偵測條件 | 換算提示 |
|---------|---------|
| 1000元 增加 | `10 × 100元 → 1 × 1000元` |
| 500元 增加 | `5 × 100元 → 1 × 500元` |
| 100元 增加 | `10 × 10元 → 1 × 100元` |

提示徽章（`.b3-pig-exchange-badge`）以絕對定位顯示於撲滿卡片右上角，2200ms 後淡出（`b3ExchFade` keyframe）。

### 16.6 自訂物品上傳流程

```
使用者點「新增自訂商品」
    ↓
triggerCustomItemUpload() → 觸發 <input type="file" accept="image/*"> 隱藏 input
    ↓
handleCustomItemUpload(event)
    → b3CompressImage(file, 200px, 0.7)：canvas 壓縮 → base64
    → 儲存至 Game.tempItemImageData
    ↓
showCustomItemPreview(imageData)
    → 顯示預覽彈窗：圖片 + 名稱輸入框 + 價格輸入框
    ↓
confirmAddCustomItem()
    → 驗證（名稱非空、價格 1~9999 整數）
    → { name, price, imageData, isCustom:true } 推入 state.customItems
    → 更新設定頁自訂物品面板（_updateCustomItemsPanel）
    ↓
開始遊戲時：
    _startCalendarSession()：
        [...B3_ITEMS_BY_DIFF[diff], ...state.customItems] 合併題目池
        → 自訂物品與內建物品同等機率被選中
```

### 16.7 雙欄版面佈局

```
┌─────────────────────────────────────────────────────────┐
│ b3-cal-layout (flex row, max-width: 860px)              │
│                                                         │
│  ┌──────────────────────────────┐  ┌──────────────────┐│
│  │  b3-cal-center-col (flex:1)  │  │  b3-pig-card     ││
│  │                              │  │  (flex:1)        ││
│  │  ┌──────────────────────┐   │  │  ┌────────────┐   ││
│  │  │  b3-cal-info-card    │   │  │  │  🐷 標題    │   ││
│  │  │  商品圖示 + 名稱     │   │  │  │  面額表格  │   ││
│  │  │  進度條 + 統計       │   │  │  │  1000元: N │   ││
│  │  └──────────────────────┘   │  │  │  500元:  N │   ││
│  │                              │  │  │  100元:  N │   ││
│  │  ┌──────────────────────┐   │  │  │  ...       │   ││
│  │  │  月曆（7欄×N行）     │   │  │  │  合計: N元 │   ││
│  │  └──────────────────────┘   │  │  └────────────┘   ││
│  └──────────────────────────────┘  └──────────────────┘│
└─────────────────────────────────────────────────────────┘
  ≤600px: flex-direction: column（單欄，pig card 在月曆下方）
```

### 16.8 圖示渲染統一方法

```javascript
// _itemIconHTML(item, size)
// 自訂物品（有 imageData）→ <img>
// 內建物品（有 icon emoji） → <span>
function _itemIconHTML(item, size = 48) {
    if (item.imageData) {
        return `<img src="${item.imageData}" alt="${item.name}"
                     style="width:${size}px;height:${size}px;object-fit:contain;"
                     onerror="this.style.display='none'">`;
    }
    return `<span style="font-size:${size}px;line-height:1;">${item.icon}</span>`;
}
```

### 16.9 月曆模式完成畫面特殊統計

月曆模式的 `showResults()` 統計卡片與測驗模式不同：

| 統計項 | 測驗模式 | 月曆模式 |
|--------|---------|---------|
| 卡片 1 | 答對題數 | 存錢天數（`clickedDays` 天）|
| 卡片 2 | 正確率 | 達成目標（「NT$ N 元」）|
| 卡片 3 | 花費時間 | 花費時間 |
| 學習成果 | 完成 B3 存錢計畫學習 | 成功存到 [商品名]！達成目標 NT$ N 元 |

---

## 十七、詳細檔案規模總覽（2026-03-23 補充）

> 參照 A2/F1 報告格式，補充各單元實際檔案規模、JS 依賴與 CSS 依賴清單。

### 17.1 各單元檔案規模對照

| 單元 | JS 路徑 | JS 約行數 | CSS 專用路徑 | CSS 約行數 | 作業單路徑 | 作業單行數 |
|------|---------|---------|------------|----------|----------|---------|
| B1 今天帶多少錢 | `js/b1_daily_budget.js` | ~1,050 行 | `css/b1_daily_budget.css` | ~758 行 | `worksheet/units/b1-worksheet.js` | ~166 行 |
| B2 零用錢日記 | `js/b2_allowance_diary.js` | ~910 行 | `css/b2_allowance_diary.css` | ~276 行 | `worksheet/units/b2-worksheet.js` | ~203 行 |
| B3 存錢計畫 | `js/b3_savings_plan.js` | ~1,800 行 ※ | `css/b3_savings_plan.css` | ~580 行 ※ | `worksheet/units/b3-worksheet.js` | ~93 行 |
| B4 特賣比一比 | `js/b4_sale_comparison.js` | ~870 行 | `css/b4_sale_comparison.css` | ~296 行 | `worksheet/units/b4-worksheet.js` | ~110 行 |
| B5 生日派對預算 | `js/b5_party_budget.js` | ~790 行 | `css/b5_party_budget.css` | ~243 行 | `worksheet/units/b5-worksheet.js` | ~128 行 |
| B6 菜市場買菜 | `js/b6_market_shopping.js` | ~990 行 | `css/b6_market_shopping.css` | ~375 行 | `worksheet/units/b6-worksheet.js` | ~131 行 |
| **B 系列共用** | — | — | `css/b-series.css` | ~581 行 | — | — |

> ※ B3 在第二十八～三十一輪加入月曆模式、自訂物品、撲滿卡片等功能，JS/CSS 行數已大幅成長。

**B 系列 vs A2/F1 規模對比**：

| 項目 | F1 一對一對應 | A2 理髮廳 | B 系列（6 單元合計） |
|------|-------------|----------|-------------------|
| JS 合計行數 | ~7,468 | ~8,163 | ~6,410（各單元平均 ~1,070）|
| CSS 合計行數 | ~220（專用）| ~3,136 | ~3,109（專用）+ 581（共用）|
| 作業單合計行數 | ~135 | ~341 | ~831（6 個作業單）|

### 17.2 B 系列 JS 共用依賴

所有 B1~B6 HTML 均引入以下外部工具（順序固定）：

| 依賴檔案 | 用途 |
|---------|------|
| `js/confetti.browser.min.js` | canvas-confetti v1.9.2（完成畫面煙火） |
| `audio/correct.mp3` / `success.mp3` / `error.mp3` | 音效（inline `<audio>` 標籤）|
| `js/audio-unlocker.js` | iOS/Android 音訊解鎖 |
| `js/theme-system.js` | 深色/淺色主題切換 |
| `js/reward-launcher.js` | 獎勵系統啟動器 |
| `js/number-speech-utils.js` | 數字語音轉換工具 |
| `js/bX_unit.js` | 各單元主邏輯（含 Game 物件）|

**B 系列不引用的工具**（與 A/F 系列差異）：

| 未引用工具 | 原因 |
|----------|------|
| `touch-drag-utility.js` | 僅 B1 在 JS 內自行實作觸控拖曳；B2~B6 無拖曳需求 |
| `emoji-library.js` | B 系列圖示使用 inline Emoji 或 PNG，不使用 emoji library |
| `mobile-debug-panel.js` | B 系列不引用除錯面板（使用 `Debug.FLAGS` 控制台輸出）|

### 17.3 各單元 CSS 載入順序

```html
<!-- B1 載入順序（其他 B 單元相同，只換最後一個 CSS）-->
<link rel="stylesheet" href="../css/ai-theme.css">
<link rel="stylesheet" href="../css/shared-game-base.css">
<link rel="stylesheet" href="../css/b-series.css?v=2.9">
<link rel="stylesheet" href="../css/b1_daily_budget.css?v=X.X">
<link rel="stylesheet" href="../css/common-modal-responsive.css">
<link rel="stylesheet" href="../css/dark-mode-simple.css">
```

**CSS 層疊覆寫關係**：

| 層次 | 檔案 | 作用 |
|------|------|------|
| 1（底層）| `ai-theme.css` | Design tokens、CSS 變數（`--primary-color` 等）|
| 2 | `shared-game-base.css` | 通用 `title-bar`、`store-layout`（B 系列不直接使用但確保 token 可用）|
| 3 | `b-series.css` | B 系列專屬 tokens（`--b-primary: #f97316`）、標題列、設定頁、完成畫面 |
| 4（最高）| `bX_unit.css` | 各單元覆寫，最高優先級 |
| 5 | `common-modal-responsive.css` | 彈窗響應式（`!important` 確保彈窗不被覆寫）|
| 6 | `dark-mode-simple.css` | 深色模式覆寫（`@media prefers-color-scheme: dark`）|

---

## 十八、B1 拖曳放置互動架構（深度說明，2026-03-23 補充）

> B1 是 B 系列唯一具有拖曳互動的單元，以下詳細說明其實作架構。

### 18.1 雙模式互動（桌面 DnD + 觸控模擬）

B1 在 `_setupDragDrop()` 和 `_setupTouchDrag()` 中實作兩套互動，同時啟用：

```
桌面端（HTML5 Drag and Drop API）：
  dragstart → dragover → drop → dragend

觸控端（Touch Events 模擬拖曳）：
  touchstart → touchmove → touchend
  透過 elementFromPoint() 偵測放置目標
```

### 18.2 錢幣拖曳的特殊設計

| 設計決策 | 說明 | 原因 |
|---------|------|------|
| 原始錢幣保留托盤 | 拖曳後托盤中的錢幣不消失（仍可再拖）| 同一面額可放多枚 |
| 幽靈圖（ghost image）| 拖曳時顯示半透明錢幣圖片，非瀏覽器預設矩形 | `e.dataTransfer.setDragImage()` |
| 托盤元素淡化（faded）| 錢幣被放入錢包後，托盤中的對應錢幣淡化 | 視覺反饋「已使用這枚」|
| 放置後可移回 | 拖回托盤 = 從錢包移除 | 讓學生可以重新組合 |

### 18.3 錢幣托盤面額組成

```javascript
// 依難度提供的面額（COIN_CONFIG）
const COIN_CONFIG = {
    easy:   [1, 5, 10, 50],          // 硬幣只
    normal: [1, 5, 10, 50, 100, 500],// 硬幣 + 100/500 鈔票
    hard:   [1, 5, 10, 50, 100, 500, 1000] // 全面額
};
```

面額圖片路徑：
- 硬幣（< 100 元）：`../images/money/coin_${denom}_yuan_front.png`
- 紙鈔（≥ 100 元）：`../images/money/${denom}_yuan_front.png`
- onerror fallback：`this.style.display='none'`（隱藏圖片，顯示面額文字）

### 18.4 最佳組合演算法（`_calcOptimalCoins`）

```javascript
// 貪婪法：由大到小選取面額，計算達到目標的最少枚數組合
_calcOptimalCoins(targetAmount) {
    const availableDenoms = COIN_CONFIG[this.settings.difficulty]
        .filter(d => d <= targetAmount)   // 只考慮 ≤ 目標的面額
        .sort((a, b) => b - a);           // 由大到小排序

    const result = {};
    let remaining = targetAmount;
    for (const denom of availableDenoms) {
        const count = Math.floor(remaining / denom);
        if (count > 0) {
            result[denom] = count;
            remaining -= count * denom;
        }
        if (remaining === 0) break;
    }
    return result;   // { 100: 1, 50: 1 } 表示「需要 1 枚 100 元 + 1 枚 50 元」
}
```

**使用場景**：
- 普通模式答錯 3 次：呼叫 `_showCoinHint()` → `_calcOptimalCoins()` → 高亮最佳組合
- 困難模式提示鈕（`#hint-btn`）：同上，但由學生主動觸發

### 18.5 錢包合計邏輯

```javascript
// 每次放置/移除錢幣後觸發
_updateWalletTotal() {
    const total = this.state.walletCoins.reduce((sum, coin) => sum + coin.denom, 0);
    document.querySelector('.b1-wallet-total').textContent = `${total} 元`;
    document.querySelector('.b1-wallet-goal-tag').textContent =
        total === this.state.question.total ? '✓ 金額正確！' : `需要 ${this.state.question.total} 元`;
    // 達標或超出：顯示確認按鈕
    document.querySelector('.b1-confirm-btn').disabled = (total !== this.state.question.total);
}
```

### 18.6 拖曳相關 CSS 類別

| CSS 類別 | 觸發時機 | 視覺效果 |
|---------|---------|---------|
| `.b1-coin-draggable` | 可拖曳的錢幣 | cursor: grab |
| `.b1-coin-dragging` | 拖曳中 | opacity: 0.5 |
| `.b1-coin-faded` | 簡單模式：不可用面額 | opacity: 0.25, pointer-events: none |
| `.b1-coin-hint` | 提示模式：最佳組合錢幣 | 黃色脈動邊框（`b1CoinHintPulse`）|
| `.b1-drop-zone` | 錢包放置區 | 虛線邊框 |
| `.b1-drop-zone.drag-over` | 拖曳進入放置區 | 綠色邊框 + 淡綠背景 |

---

## 十九、響應式設計與版面配置（2026-03-23 補充）

### 19.1 B 系列整體版面結構

B 系列採用 `b-header`（固定標題列）+ `b-game-wrap`（自適應遊戲區）雙層架構：

```
┌──────────────────────────────────────────────────────┐
│  b-header（flex row，三欄式）                          │
│  ┌──────────────┬────────────┬──────────────────────┐│
│  │ b-header-left│b-header-  │ b-header-right       ││
│  │ 💰 單元名稱  │ center    │ 第N題/共N題 🎁 返回  ││
│  │ 🔊 重播      │ 難度模式   │                      ││
│  └──────────────┴────────────┴──────────────────────┘│
├──────────────────────────────────────────────────────┤
│  b-game-wrap（各單元自訂遊戲區）                        │
│                                                      │
│  B1：行程卡 | 錢包放置區 | 錢幣托盤                     │
│  B2：日記本卡片 | 答題區                               │
│  B3：目標卡片 | 週存條 | 答題區（或月曆 | 撲滿卡片）       │
│  B4：商品主視覺 | VS 比較網格                           │
│  B5：預算橫幅 | 商品清單（2欄）                          │
│  B6：購物清單 | 攤位分頁 | 付款區                        │
└──────────────────────────────────────────────────────┘
```

### 19.2 響應式斷點

B 系列 CSS 在 `b-series.css` 及各單元 CSS 中定義以下斷點：

| 斷點 | 範圍 | 主要調整 |
|------|------|---------|
| 桌面版 | > 768px | 完整標題列三欄；遊戲區並排（B4 VS 網格 1fr auto 1fr）|
| 平板版 | 600~768px | 標題列中欄隱藏（難度文字縮短）；B3 月曆雙欄改單欄 |
| 手機版 | ≤ 600px | `b-header` 改雙列；B3 `b3-cal-layout` 改 `flex-direction: column` |

### 19.3 各單元版面特色

| 單元 | 桌面版配置 | 手機版調整 |
|------|----------|----------|
| B1 | 行程卡（上）+ 錢包區（左）+ 錢幣托盤（右）| 錢包/托盤改垂直堆疊 |
| B2 | 日記本卡片置中（max-width: 600px）| 事件列字型縮小 |
| B3（測驗）| 目標卡（上）+ 週存條 + 答題區 | 週存條水平滾動 |
| B3（月曆）| 中央欄（資訊卡+月曆）+ 右側撲滿卡片 | 單欄，撲滿卡片在月曆下方 |
| B4 | `1fr auto 1fr` 三欄（商店A | VS | 商店B）| 改垂直：商店A → VS → 商店B |
| B5 | 預算橫幅（全寬）+ 商品 2 欄網格 | 商品改 1 欄 |
| B6 | 清單（左）+ 攤位（右）| 上下堆疊；攤位 Tab 改捲動 |

### 19.4 設定頁版面

```
unit-welcome（amber 漸層背景）
  └── welcome-content（白色卡片，頂部 6px amber 邊框）
       ├── settings-title-row（flex row）
       │    ├── settings-mascot-img（金錢小助手圖片，48px）
       │    └── h1（單元名稱，漸層文字色）
       └── [各設定群組]
            ├── b-setting-group（白底/灰邊框卡片）
            │    ├── b-setting-label（橘色標籤）
            │    └── b-btn-group（膠囊按鈕群組）
            └── game-buttons（返回[左] + 開始[右]）
```

### 19.5 完成畫面版面（b-res-* 系統）

```
b-res-screen（紫色漸層全螢幕）
  └── b-res-card（白色卡片，max-width: 500px，bResCelebrate 進場動畫）
       ├── [吉祥物圖 + 🏆 b-res-trophy（bResBounce 無限彈跳）]
       ├── b-res-title（單元專屬慶祝標題）
       ├── b-res-perf-badge（橙色漸層徽章，bResGlow 發光動畫）
       ├── b-res-grid（3 張統計卡片：綠/藍/橙）
       ├── b-res-reward-link（粉紅色獎勵按鈕）
       ├── b-res-achievements（綠色漸層學習成果區塊）
       └── b-res-btns（再玩一次[綠] + 返回設定[紫]）
```

---

## 二十、動畫系統（2026-03-23 補充）

### 20.1 B 系列全局動畫（`injectGlobalAnimationStyles()`）

每個 B 系列單元均在 `init()` 時注入以下共用 keyframe（以 `b-global-animations` id 防重複）：

| Keyframe 名稱 | 效果 | 用途 |
|-------------|------|------|
| `bResCelebrate` | `scale(0.8) → scale(1.0)` + `opacity 0→1` | 完成畫面卡片進場 |
| `bResBounce` | Y 軸 0→-15px→0（循環）| 完成畫面 🏆 獎盃跳動 |
| `bResGlow` | box-shadow 脈衝（循環）| 完成畫面表現徽章發光 |
| `settingsBounce` | `scale(0.95) → scale(1.02) → scale(1.0)` | 設定頁吉祥物進場 |
| `bFeedbackPop` | `scale(0) → scale(1.15) → scale(1.0)` | 中央回饋動畫（`_showCenterFeedback`）|

### 20.2 B1 專屬 Keyframe

| Keyframe 名稱 | 效果 | 用途 |
|-------------|------|------|
| `b1Shake` | X 軸 ±8px 抖動 | 錢包金額錯誤時震動 |
| `b1CoinHintPulse` | 邊框 `#FFC107 → transparent` 脈衝 | 提示高亮面額 |

### 20.3 B3 月曆模式 Keyframe

| Keyframe 名稱 | 效果 | 用途 |
|-------------|------|------|
| `b3CalPulse` | box-shadow 脈動 | 月曆 active 格子（可點擊日期）|
| `b3PigCoinIn` | `translateY(-12px) + opacity 0→1` | 撲滿新增金幣/鈔票下落淡入 |
| `b3ExchPop` | `scale(0.5) → scale(1.05) → scale(1.0)` | 換算提示徽章彈出 |
| `b3ExchFade` | `opacity 1→0 + translateY(-20px)` | 換算提示徽章淡出移除 |
| `b3SlotPop` | `scale(0.8) + opacity 0→1` | 任務彈窗進場 |

### 20.4 音效系統

B 系列各單元音效使用 `<audio>` 標籤 inline 載入，透過 `Game.audio.play(name)` 呼叫：

| 音效 ID | 檔案 | 觸發場景 |
|---------|------|---------|
| `correct-sound` | `correct.mp3` | 答對回饋 |
| `error-sound` | `error.mp3` | 答錯回饋 |
| `success-sound` | `success.mp3` | 完成挑戰（完成畫面）|

**B3 月曆模式額外音效**：
- 每次點擊日期格：`correct.mp3`（存款成功）
- 撲滿面額換算時：`success.mp3`（達成進位）
- 目標達成：`success.mp3` + 煙火

---

## 二十一、瀏覽器相容性與注意事項（2026-03-23 補充）

### 21.1 瀏覽器相容性

| 功能 | Chrome | Safari | Firefox | Edge |
|------|--------|--------|---------|------|
| Web Speech API（TTS）| ✅ 完整 | ⚠️ 部分（中文語音有限）| ⚠️ 部分 | ✅ 完整 |
| Canvas-Confetti | ✅ | ✅ | ✅ | ✅ |
| HTML5 Drag & Drop（B1）| ✅ | ✅ | ✅ | ✅ |
| Touch Events（B1 拖曳）| ✅ | ✅ | ✅ | ✅ |
| CSS Grid / Flexbox | ✅ | ✅ | ✅ | ✅ |
| CSS Variables | ✅ | ✅ | ✅ | ✅ |
| Audio autoplay | 需互動 | 需互動 | 需互動 | 需互動 |
| `onvoiceschanged` 事件 | ✅ | ✅ | ⚠️ 延遲 | ✅ |
| `{ once: true }` listener | ✅ | ✅ | ✅ | ✅ |
| date input（B3 設定頁）| ✅ | ✅ | ✅ | ✅ |

**Safari 特別說明**：
- 中文語音選擇有限，`cachedVoice` 可能退回 `voices[0]`（系統預設）
- 語音速率 1.0 在 Safari 可能感覺略快，但不影響理解

**Firefox 特別說明**：
- `speechSynthesis.getVoices()` 需透過 `onvoiceschanged` 事件才能取得語音清單（B 系列已正確處理）

### 21.2 行動裝置注意事項

| 項目 | 說明 |
|------|------|
| 音效解鎖 | iOS/Android 需使用者互動後才能播放音效，由 `audio-unlocker.js` 統一處理 |
| B1 觸控拖曳 | JS 自行實作 Touch Events 模擬拖曳（不依賴 `touch-drag-utility.js`）|
| hover 效果 | 觸控裝置無 hover，`b-sel-btn:hover` 等 CSS hover 效果不會觸發 |
| 小螢幕版面 | B3 月曆雙欄在 ≤600px 改為單欄（`flex-direction: column`）|
| 長語音中斷 | 部分 Android 機型在螢幕熄滅時會中斷語音（`safeCallback` + 10s 備援已處理）|
| B1 拖曳精準度 | 觸控拖曳使用 `elementFromPoint()` 偵測放置目標，小螢幕需注意格子大小 |

### 21.3 教學使用注意事項

| 注意事項 | 說明 |
|---------|------|
| 設定頁無預選（2026-03-21）| 學生必須主動選擇難度/題數/作答模式才能開始，不會有未選擇就開始的情況 |
| B5 必買商品 | 蛋糕🎂和飲料🧃 為鎖定必買，學生不可取消選取（🔒 標記）|
| B6 錯誤商品不扣分 | 點到不在清單的商品只顯示浮動提示，不影響得分，保留探索空間 |
| B3 月曆不限題數 | 簡單模式（月曆）沒有題數限制，以達成目標為結束條件 |
| 作答模式差異 | `retry`（重試）：答錯不告知答案；`proceed`（繼續）：答錯後顯示答案自動跳題 |
| 自訂物品持久 | B3 設定頁上傳的自訂物品在同一瀏覽器 session 中跨題目保留（`resetGameState` 不清除）|
| 困難模式計時 | 完成畫面顯示花費時間，可用於評估學習效率 |
| 輔助點擊不支援 | B 系列不設計 ClickMode 輔助點擊（以清晰 UI 設計取代），特殊需求學習者建議使用簡單模式 |

### 21.4 已知限制

| # | 嚴重度 | 說明 | 位置 |
|---|--------|------|------|
| 1 | **低** | B3 月曆自訂物品不持久化至 localStorage，重新整理頁面後遺失 | `state.customItems` |
| 2 | **低** | B1 錢幣托盤面額固定不可自訂（與 B3 月曆自訂物品不一致）| `COIN_CONFIG` |
| 3 | **低** | B5/B6 題庫資料量有限（各難度 5~8 組），長時間使用可能重複出現 | `B5_SCENARIOS`、`B6_MISSIONS` |
| 4 | **建議** | B 系列無 Loading 畫面（A2 有 iOS 風格旋轉載入）| HTML 頁面 |
| 5 | **建議** | B 系列無 Error Boundary（A2 有全域錯誤捕捉）| HTML 頁面 |
| 6 | **低** | 語音系統無法測試（`e2e` 測試無法模擬 SpeechSynthesis）| 所有 JS |
| 7 | **低** | B3 月曆的「開始日期」設定在頁面重新整理後需重新選擇 | `state.calendar.startDate` |

---

## 二十二、狀態管理分析（2026-03-23 補充）

> 參照 F1 §7.5 及 A2 §7.5 格式，分析 B 系列各單元的狀態管理設計。

### 22.1 共用 State 結構（全 B 系列）

```javascript
Game.state = {
    settings: {
        difficulty: null,      // 'easy' | 'normal' | 'hard'（無預選）
        questionCount: null,   // B1~B4 題數（無預選）
        retryMode: null,       // 'retry' | 'proceed'（B2/B3/B4，無預選）
        rounds: null           // B5/B6 關數（無預選）
    },
    game: {                    // 各單元專屬遊戲狀態
        currentQuestion: 0,
        score: 0,
        startTime: null,       // Date.now()（記錄開始時間，用於計時）
        // ... 各單元自訂欄位
    },
    isEndingGame: false,       // 防止 showResults() 重複執行
    isProcessing: false        // 防止重複點擊
}
```

### 22.2 各單元狀態管理差異

| 單元 | 專屬狀態欄位 | 特殊設計 |
|------|------------|---------|
| B1 | `walletCoins[]`（錢包中的錢幣）、`question.total`（目標金額）| 錢幣托盤無需 state（DOM 為來源）|
| B2 | `currentQuestion`（當前日記資料）、`retryMode`、`inputValue` | 數字鍵盤輸入值暫存 |
| B3（測驗）| `currentItem`（目標商品）、`currentWeekly`（週存金額）| 撲滿動畫用 TimerManager 控制 |
| B3（月曆）| `calendar` 完整物件（詳見十六節）、`customItems[]` | `customItems` 跨遊戲保留 |
| B4 | `currentItem`（B4_ITEMS 條目）、`swapped`（左右交換旗標）、`phase`（select/diff）| 兩段式流程旗標 |
| B5 | `currentRound`（場景）、`selectedIds[]`（已選商品 ID）| 必買商品預填入 selectedIds |
| B6 | `currentRound`（任務）、`purchasedIds[]`（已採購）、`paidAmount`（已付金額）、`phase`（shopping/payment/change）| 三段式流程旗標 |

### 22.3 `resetGameState()` 呼叫點規範

所有 B 系列單元均在以下兩處呼叫 `resetGameState()`：

| 呼叫位置 | 作用 |
|---------|------|
| `showSettings()` | 返回設定頁時重置遊戲狀態（`customItems` 除外，B3 特例）|
| `startGame()` | 開始遊戲前確保清空上局狀態 |

**搜尋關鍵字**：`resetGameState`（全 B 系列 JS 均有）

### 22.4 防重複執行守衛

| 守衛變數 | 位置 | 說明 |
|---------|------|------|
| `isEndingGame` | `showResults()` 入口 | 防止煙火/語音/完成畫面重複觸發（2026-03-16 第十七輪統一命名）|
| `isProcessing` | 答題按鈕點擊 | 防止快速連點導致重複計分 |
| `callbackExecuted` | `speak()` 的 safeCallback | 防止語音 `onend` + 10s 備援 Timer 雙重觸發 callback |

### 22.5 狀態管理評價

| 評分項目 | 狀態 | 說明 |
|---------|------|------|
| 統一重置函數 | ✅ `resetGameState()` | 全 6 個單元均有，2026-03-15 第三輪補齊 |
| 完成守衛 | ✅ `isEndingGame` | 2026-03-16 第十七輪從 `gameCompleted` 統一命名 |
| 記憶體管理 | ✅ TimerManager + EventManager | 全 B 系列統一架構 |
| startTime null 防護 | ✅ | `startTime ? (endTime - startTime) : 0` |
| 無障礙 ClickMode | ➖ 不適用 | B 系列以 UI 清晰度設計取代 |

---

## 二十三、未來開發建議（2026-03-23 補充）

> 參照 A2 §8 及 F1 §8 格式，列出 B 系列的優化方向。

### 23.1 題庫擴充（優先度：中）

| 單元 | 現況 | 建議 |
|------|------|------|
| B2 | **easy 12組/normal 12組/hard 12組（2026-03-24 全部完成）** | 各難度可視需求繼續補至 15 組，加入交通費、繳費場景 |
| B5 | 各難度 8 組 | 補至 12 組，加入不同派對主題（運動會/聖誕/生日）|
| B6 | **各難度已擴充至 8 組（2026-03-24）** | 繼續補至 10 組，加入季節性商品（水果價格隨季節變動）|
| B3 | 14 種商品 | 補至 20 種，新增大型商品（自行車、電腦）供困難模式 |

### 23.2 B1 拖曳體驗改善（優先度：中）

| 建議 | 說明 |
|------|------|
| 觸控拖曳精準度 | 在小螢幕（≤ 375px）上適當放大可點擊面積 |
| 錯誤動畫增強 | 超出金額時同時顯示超出的面額高亮（`b1-coin-over`）|
| 多枚同面額管理 | 目前允許放入無限枚，可加入上限（每種面額最多 10 枚）|

### 23.3 B3 月曆模式持久化（優先度：低）

```javascript
// 建議加入 localStorage 持久化
// 讓學生跨 session 繼續存錢進度
localStorage.setItem('b3_calendar_progress', JSON.stringify(state.calendar));

// 自訂物品也可持久化
localStorage.setItem('b3_custom_items', JSON.stringify(state.customItems));
```

### 23.4 B4 視覺改善（優先度：低）

| 建議 | 說明 |
|------|------|
| 真實商店 Logo | 目前用「商店A/商店B」文字，可加入超市/藥局等圖示 |
| 差額計算過程顯示 | 普通模式可視化減法步驟（類似 C4 的數字計算動畫）|

### 23.5 B6 找零視覺化（優先度：中）

B6 目前找零只以文字顯示金額，建議加入：
- 真實錢幣圖示顯示找回的各面額（類似 A2 的找零動畫）
- 讓學生確認找零金額的幣別組成

### 23.6 B 系列共用改善（優先度：低）

| 建議 | 類型 | 說明 |
|------|------|------|
| Loading 畫面 | UI | 參照 A2，加入 iOS 風格旋轉載入（尤其 B3 月曆模式圖片較多）|
| Error Boundary | 穩健性 | 參照 A2，捕捉未預期的 JS 錯誤並顯示友善提示 |
| localStorage 進度儲存 | 功能 | 儲存當前題目 index，重新整理後可繼續 |
| 多語言支援 | 國際化 | 目前硬編碼繁體中文，可將字串集中至 i18n 物件 |
| 統計報表 | 功能 | 累計跨 session 答題數、正確率曲線，供教師查看 |

---

## 二十四、Game 物件架構（各單元詳細，2026-03-23 補充）

> 參照 C1 §3.1 格式，補充各單元 Game 物件完整樹狀結構。

### 24.1 共用 Game 物件骨架（全 B 系列）

```
Game（頂層全域物件）
├── Debug                  # 偵錯系統
│   └── FLAGS: { all, init, speech, question, error }
├── TimerManager           # 計時器管理
│   ├── timers: Map
│   ├── setTimeout(fn, ms, category)
│   ├── clearAll()
│   └── clearByCategory(category)
├── EventManager           # 事件管理
│   ├── listeners: []
│   ├── on(el, type, fn, opts, category)
│   ├── removeAll()
│   └── removeByCategory(category)
├── audio                  # 音效系統
│   ├── init()
│   └── play(name)         # correct / error / success
├── Speech                 # 語音系統
│   ├── cachedVoice        # 選定的語音物件
│   ├── _loadVoice()       # 初始化語音（三重保障）
│   └── speak(text, callback)
├── state                  # 狀態管理
│   ├── settings: { difficulty, questionCount/rounds, retryMode }
│   ├── game: { currentQuestion, score, startTime, ... }
│   └── isEndingGame / isProcessing
├── init()                 # 頁面初始化
├── showSettings()         # 渲染設定頁
├── _bindSettingsEvents()  # 綁定設定頁事件
├── _checkCanStart()       # 檢查是否可開始
├── startGame()            # 開始遊戲
├── resetGameState()       # 重置狀態
├── backToMenu()           # 返回主選單
├── showResults()          # 完成畫面
└── _fireConfetti()        # 遞迴煙火動畫
```

### 24.2 B1 今天帶多少錢 — 專屬子系統

```
Game（B1）
├── [共用骨架]
├── state.game
│   ├── questions[]        # 行程題目陣列
│   ├── currentIndex       # 當前題目索引
│   ├── walletCoins[]      # 已放入錢包的錢幣
│   ├── score / totalCorrect
│   └── startTime
├── _generateQuestions()   # 從行程池隨機抽題
├── renderQuestion()       # 渲染行程卡 + 錢包 + 錢幣托盤
├── _setupDragDrop()       # HTML5 DnD（桌面）
├── _setupTouchDrag()      # Touch Events 模擬拖曳（行動裝置）
├── _updateWalletTotal()   # 即時更新合計 + 解鎖確認按鈕
├── handleConfirm()        # 確認答案
├── _calcOptimalCoins()    # 貪婪演算法：最佳面額組合
├── _showCoinHint()        # 高亮提示面額
└── COIN_CONFIG            # 各難度面額配置
```

### 24.3 B2 零用錢日記 — 專屬子系統

```
Game（B2）
├── [共用骨架]
├── B2_TEMPLATES           # 題目資料庫（easy/normal/hard）
├── state.game
│   ├── shuffledQuestions[]# 打亂後的題目序列
│   ├── currentQuestion    # 當前題目物件
│   ├── inputValue         # 數字鍵盤輸入值
│   └── retryMode
├── _getQuestions()        # 抽題（shuffle + 依序取用）
├── renderQuestion()       # 渲染日記本 + 答題區
├── _renderDiaryEvents()   # 渲染收支事件列
├── _renderAnswerArea()    # 依難度渲染：按鈕 or 數字鍵盤
├── _handleOptionClick()   # 選擇題答題
├── _handleKeypadInput()   # 數字鍵盤輸入
├── _checkAnswer()         # 驗證答案（retry / proceed 分支）
└── _getDistractors()      # 生成干擾選項（FIXED_DELTAS）
```

### 24.4 B3 存錢計畫 — 專屬子系統

```
Game（B3）
├── [共用骨架]
├── B3_ALL_ITEMS / B3_ITEMS_BY_DIFF / B3_WEEKLY_OPTIONS
├── b3CompressImage()      # 自訂圖片壓縮（頂層函數）
├── state.game
│   ├── questions[]
│   ├── currentItem        # 當前目標商品
│   └── currentWeekly
├── state.calendar         # 月曆模式專用（簡單難度）
│   ├── item / dailyAmount / accumulated
│   ├── clickedDays / startDate / startTime
├── state.customItems[]    # 自訂物品（跨遊戲保留）
├── Calendar               # 月曆模式子系統
│   ├── _startCalendarSession()
│   ├── renderCalendar()
│   ├── _renderCalendarHTML()
│   ├── _bindCalendarEvents()
│   ├── _handleDayClick(day)
│   ├── _updateCalendarUI()
│   ├── _onCalendarGoalReached()
│   ├── _showCalendarTaskPopup()
│   ├── _itemIconHTML(item, size)
│   ├── _renderPiggyBankCard(changedDenoms)
│   ├── _updatePiggyBankCard()
│   ├── _decomposeToDenominations(amount)
│   ├── _showExchangeBadge(container, msg)
│   ├── _getMoneyImagesHTML(amount)
│   ├── _renderCustomItemsPanel()
│   ├── confirmAddCustomItem()
│   └── removeCustomItem(index)
├── renderQuestion()       # 測驗模式（普通/困難）
├── _renderPiggyAnimation()# 撲滿格子填充動畫
└── _checkAnswer()
```

### 24.5 B4 特賣比一比 — 專屬子系統

```
Game（B4）
├── [共用骨架]
├── B4_ITEMS[]             # 商品比較資料庫（30 組，2026-03-24 擴充）
├── state.game
│   ├── currentItem        # 當前商品物件（含 optA/optB）
│   ├── swapped            # 左右交換旗標
│   ├── phase              # 'select' | 'diff'
│   └── diffAnswer         # 差額正確答案
├── renderQuestion()       # 渲染比較網格（1fr auto 1fr）
├── _handleSelectClick()   # 選便宜按鈕
├── _handleDiffAnswer()    # 差額答題（普通：三選一；困難：鍵盤）
├── _getDiffOptions()      # 生成差額干擾選項
└── _diffDescriptions      # 各難度說明文字
```

### 24.6 B5 生日派對預算 — 專屬子系統

```
Game（B5）
├── [共用骨架]
├── B5_ALL_ITEMS[]         # 12 件商品（含 must 旗標）
├── B5_SCENARIOS{}         # 各難度場景庫（8 組）
├── state.game
│   ├── currentRound       # 當前場景
│   ├── selectedIds[]      # 已選商品 ID（必買商品預填）
│   └── rounds / correctRounds
├── renderRound()          # 渲染預算橫幅 + 商品清單
├── _toggleItem(id)        # 切換商品選取（必買鎖定）
├── _updateTotalBar()      # 即時更新金額條（ok/near/over）
├── _handleConfirm()       # 驗證：mustOk && budgetOk
└── _getItemById(id)       # 從 B5_ALL_ITEMS 查詢商品
```

### 24.7 B6 菜市場買菜 — 專屬子系統

```
Game（B6）
├── [共用骨架]
├── B6_STALLS{}            # 3 個攤位（各 6 件商品）
├── B6_MISSIONS{}          # 各難度任務庫（8 組，2026-03-24 擴充）
├── B6_BILLS[]             # 7 種面額按鈕
├── state.game
│   ├── currentRound       # 當前任務
│   ├── purchasedIds[]     # 已採購商品 ID
│   ├── paidAmount         # 累積付款金額
│   ├── phase              # 'shopping' | 'payment' | 'change'
│   └── activeStall        # 當前顯示的攤位
├── renderRound()          # 渲染購物清單 + 攤位分頁
├── _switchStall(stall)    # 切換攤位
├── _handleItemClick(id)   # 商品點擊（正確勾選 / 錯誤提示）
├── _showWrongTip(name)    # 錯誤商品浮動提示（2秒）
├── _renderPaymentUI()     # 渲染付款面額按鈕
├── _handleBillClick(v)    # 累積付款金額
└── _showChange()          # 顯示找零金額 + 語音
```

---

## 二十五、答題流程詳解（2026-03-23 補充）

> 參照 C1 §3.5 格式，詳細說明各單元答題判斷邏輯與分支。

### 25.1 B1 今天帶多少錢 — 答題流程

```
handleConfirm()
    ├── walletTotal = walletCoins.reduce(sum)
    │
    ├─ 金額正確（total === question.total）
    │   → playSound('correct')
    │   → Speech: 「太棒了！準備好了 N 元」
    │   → score++
    │   → b1Shake 不觸發
    │   → 1400ms 後 loadNextQuestion() 或 showResults()
    │
    └─ 金額錯誤（total ≠ question.total）
        ├─ 不足（total < question.total）
        │   → playSound('error')
        │   → Speech: 「還差 N 元，繼續加錢！」
        │   → b1Shake 震動動畫
        │   → 錯誤計數++ → 普通模式達3次 → _showCoinHint()
        │
        └─ 超出（total > question.total）
            → playSound('error')
            → Speech: 「錢太多了，移除一些試試」
            → b1Shake 震動動畫
```

### 25.2 B2 零用錢日記 — 答題流程（含 retry/proceed 分支）

```
_checkAnswer(userAnswer)
    ├── correct = (userAnswer === question.answer)
    │
    ├─ 正確
    │   → playSound('correct')
    │   → Speech: 「答對了！剩下 N 元」（toTWD）
    │   → score++
    │   → 中央回饋：🎉
    │   → 1400ms 後 loadNextQuestion()
    │
    └─ 錯誤
        ├─ retry 模式
        │   → playSound('error')
        │   → Speech: 「不對喔，再想想看」
        │   → 中央回饋：❌
        │   → 重置輸入 / 解鎖選項（500ms 後）
        │   → 不計錯誤分數，等待重試
        │
        └─ proceed 模式
            → playSound('error')
            → Speech: 「正確答案是 N 元」（toTWD）
            → 顯示 hint div（綠色正確答案）
            → 1400ms 後 loadNextQuestion()
```

### 25.3 B4 特賣比一比 — 兩段式答題流程

```
Phase 1：Select（選便宜）

_handleSelectClick(side)        # 'left' | 'right'
    ├── isCorrect = (side === correctSide)
    │
    ├─ 正確 + easy 模式
    │   → score++ → 語音 → loadNextQuestion()
    │
    ├─ 正確 + normal/hard 模式
    │   → 語音「選對了！再回答差額」
    │   → phase = 'diff'
    │   → 渲染差額題目
    │
    ├─ 錯誤 + retry
    │   → Speech: 「這邊比較貴喔，再看看另一邊」
    │   → 1500ms 後重置選項卡片
    │
    └─ 錯誤 + proceed
        → Speech: 「答錯了，X 才是比較便宜的」
        → loadNextQuestion()

Phase 2：Diff（差額計算）

_handleDiffAnswer(userDiff)
    ├── correct = (userDiff === item.optA.price - item.optB.price)
    │
    ├─ 正確
    │   → Speech: 「對了！便宜了 N 元」
    │   → score++ → loadNextQuestion()
    │
    ├─ 錯誤 + retry
    │   → Speech: 「差額是 N 元，再試一次」
    │   → 重置數字盤 / 解鎖選項
    │
    └─ 錯誤 + proceed
        → Speech: 「正確答案是 N 元」
        → 顯示 hint → loadNextQuestion()
```

### 25.4 B5 生日派對預算 — 確認驗證流程

```
_handleConfirm()
    ├── mustOk = mustItems.every(i => selectedIds.includes(i.id))
    ├── total  = selectedIds.reduce((s, id) => s + getItem(id).price, 0)
    ├── budgetOk = (total <= scenario.budget)
    │
    ├─ mustOk && budgetOk && total > 0
    │   → playSound('correct')
    │   → Speech: 「太棒了！共花了 N 元，還剩 M 元！」
    │   → correctRounds++
    │   → 顯示「下一關」按鈕
    │
    ├─ !mustOk
    │   → playSound('error')
    │   → Speech: 「記得要選所有必買的商品喔！」
    │   → 顯示「再試一次」+ 「跳過」按鈕
    │   → 再試一次 → renderRound()（重新渲染同關）
    │
    └─ !budgetOk（超支）
        → playSound('error')
        → Speech: 「超出預算了，多了 N 元，再試一次！」
        → 顯示「再試一次」+ 「跳過」按鈕
```

### 25.5 B6 菜市場買菜 — 三段式流程答題

```
Shopping 階段（_handleItemClick）
    ├─ 商品在清單中（purchasedIds 未含）
    │   → purchasedIds.push(id)
    │   → ✓ 標記清單項目
    │   → playSound('correct')
    │   → 全部採購完成？→ 進入 Payment 階段
    │
    └─ 商品不在清單 或 已採購
        → playSound('error')
        → _showWrongTip(name)：浮動提示 2 秒
        → Speech: 「X 不在今天的購物清單上」
        → 不影響進度

Payment 階段（_handleBillClick）
    paidAmount += denom
    ├─ paidAmount >= total → 解鎖「確認付款」按鈕
    └─ 點確認付款 → 進入 Change 階段

Change 階段（_showChange）
    change = paidAmount - total
    → Speech: 「你付了 N 元，找回 M 元，買菜成功！」
    → correctRounds++
    → 1500ms 後 renderRound() 或 showResults()
```

---

## 二十六、作業單系統詳細說明（2026-03-23 補充）

> 參照 A4 §2.11 格式，詳細說明各 B 單元作業單的題型設計與特殊功能。

### 26.1 B 系列作業單共用架構

所有 B 系列作業單均透過 `WorksheetRegistry.register('bX', config)` 註冊，遵循共用 `toolbarConfig` 格式：

```javascript
// 全 B 系列共用工具列設定
toolbarConfig: {
    fontButton: null,                    // 無字體選項
    orientationButton: { ... },          // 橫/直向切換
    adjustCountButton: null,             // 無題數調整（固定題型）
    hidePrintAnswer: false,              // 顯示「列印答案卷」按鈕
    extraButtons: []                     // 無額外按鈕
}
```

### 26.2 B1 今天帶多少錢 作業單

**題型**：`fill`（填空）+ `coin-select`（選錢幣）+ `hint-complete`（提示完成）

| 題型代碼 | 題型說明 | 特殊設計 |
|---------|---------|---------|
| `fill` | 看行程，計算總費用（填空）| 含行程名稱 + 費用項目清單 |
| `coin-select` | 看總金額，從圖示中勾選所需硬幣/鈔票 | `_coinOptions()` 生成 3 組選項 |
| `hint-complete` | 提示部分面額，補完剩餘組合 | `_findCombo()` 確保有唯一解 |

**特殊函數**：
- `_findCombo(target, availableCoins)` — 回溯法找出達成目標的最小面額組合（確保作業單有解）
- `_coinOptions(answer, difficulty)` — 依難度生成面額選項（干擾項使用鄰近金額）

### 26.3 B2 零用錢日記 作業單

**題型**：`fill`（計算餘額）+ `steps`（逐步計算）

| 題型代碼 | 說明 |
|---------|------|
| `fill` | 看日記收支記錄，填寫最終餘額 |
| `steps` | 逐筆列出收支，提供計算格（+/-）引導學生逐步計算 |

**核心渲染**：
- `_renderDiaryEvents(events)` — 渲染日記事件列（income=綠色▲ / expense=紅色▼）
- `runAns(events)` — 計算答案（`events.reduce` 加減總和）

### 26.4 B3 存錢計畫 作業單

**題型**：週數計算（填空）

```javascript
// 核心公式（與遊戲完全一致）
const answer = Math.ceil(item.price / weekly);
```

**資料來源**：`_items`（從 `B3_ITEMS_BY_DIFF` 各難度抽取）+ `_weekly`（固定選項或隨機）

**特殊設計**：作業單同時顯示商品圖示（emoji）+ 目標金額 + 每週存款，視覺化說明目標感。

### 26.5 B4 特賣比一比 作業單

**題型**：`cheaper`（選便宜）+ `diff`（差額）+ `both`（兩段合一）

| 題型 | 說明 | 配置 |
|------|------|------|
| `cheaper` | 圈出較便宜的商店 | 僅 select 階段 |
| `diff` | 填寫兩價格差額 | 僅 diff 階段 |
| `both` | 圈出便宜 + 填差額 | select + diff 合一頁面 |

```javascript
// 差額計算
const correctDiff = optA.price - optB.price;
// 確保 optA 永遠 > optB（與遊戲一致）
```

### 26.6 B5 生日派對預算 作業單

**題型**：預算選購（圈選）

```
作業單呈現：
┌──────────────────────────────┐
│ 預算：NT$ XXX 元              │
│ ★ 必買商品（需全選）:           │
│   ○ 蛋糕 NT$120   ○ 飲料 NT$60│
│ 可選商品（在預算內選購）:        │
│   ○ 氣球 NT$30    ○ 零食 NT$45 │
│   ○ 蠟燭 NT$20    ...          │
│                               │
│ 答：總計 NT$___ 元             │
└──────────────────────────────┘
```

特殊設計：`mustTotal`（必買合計）印於題目中，降低計算負擔；選項旁附 checkbox 讓學生勾選。

### 26.7 B6 菜市場買菜 作業單

**題型**：採購 + 付款計算

```
作業單呈現：
購物清單：高麗菜 NT$25、蘋果 NT$40、醬油 NT$35
消費合計：NT$___ 元
付款：NT$___ 元（圈選面額組合）
找零：NT$___ 元
```

```javascript
// 核心計算
const total  = mission.items.reduce((s, item) => s + getItemPrice(item), 0);
const change = budget - total;   // budget = scenario.budget
```

特殊設計：題目中同時顯示攤位來源（如「蔬菜攤：高麗菜」），加強情境記憶。

---

## 二十七、總結：B 系列完成度評估（2026-03-23 補充）

> 參照 F1 §九 格式，評估 B 系列整體完成度。

### 27.1 B 系列的設計優勢

| 優勢 | 說明 |
|------|------|
| **從零合規** | B 系列為本專案唯一「從第一行就遵守所有規範」的系列，無需事後修補 TimerManager/EventManager |
| **多樣互動模式** | 6 個單元涵蓋：拖曳放置（B1）、選擇題（B2/B3/B4）、關卡制選購（B5/B6）、月曆模擬（B3 easy），是 A/C/F 系列最多樣的組合 |
| **retry/proceed 雙模式** | B2/B3/B4 提供答錯後「重試 vs 繼續」兩種教學策略，對應不同學習者特性 |
| **設定頁無預選**（2026-03-21）| 學生必須主動選擇所有選項才能開始，避免未理解設定就進入測驗 |
| **B3 月曆模式** | 獨創的日存體驗，撲滿面額分組 + 進位換算提示，兼具數學與金融素養 |
| **自訂物品（B3）** | 與 F1/F3/A1/A3 同樣支援圖片上傳，讓教學情境可客製化 |
| **完整作業單** | 6 個單元各有專屬作業單，題型設計與遊戲邏輯一致 |
| **語音系統規範** | `cachedVoice + _loadVoice()` 三重保障、`safeCallback + 10s 備援`，與 A/C/F 系列完全對齊 |

### 27.2 B 系列的待改進處

| 項目 | 說明 | 優先度 |
|------|------|--------|
| B3 月曆自訂物品不持久 | `state.customItems` 在重新整理頁面後遺失 | 低 |
| B5/B6 題庫組數有限 | 各難度 5~8 組，長期使用可能重複 | 中 |
| 無 Loading 畫面 | B 系列 HTML 無 iOS 風格旋轉載入（A2 有）| 低 |
| 無 Error Boundary | 無全域錯誤捕捉機制 | 低 |
| B1 面額無法自訂 | 托盤面額固定，無法像 A1 魔法商品自訂 | 低 |
| B6 找零無視覺化 | 找零金額只顯示文字，無錢幣圖示 | 中 |

### 27.3 核心數據（修復前 vs 修復後）

| 指標 | 初版（2026-03-14）| 最終（2026-03-23）|
|------|-----------------|-----------------|
| 未清理 setTimeout | **0（從零合規）** | **0** |
| 未移除 addEventListener | **0（從零合規）** | **0** |
| @keyframes 重複定義 | 0 | 0 |
| console.log 裸呼叫 | 少量 | 0（Debug.FLAGS 管理）|
| isEndingGame 守衛 | 有（初始為 `gameCompleted`）| ✅（已統一為 `isEndingGame`）|
| speak() safeCallback | ✅ 從初版即有 | ✅ |
| 語音速率 | 0.9（第二十四輪前）| ✅ 1.0（對齊 A/C/F）|
| 設定頁無預選 | ❌（有預設值）| ✅（第二十八輪改為 `null`）|
| 完成畫面 CSS 外部化 | ❌（inline style 內嵌）| ✅（第十五輪移至 `b-series.css`）|
| 作業單整合 | ❌ 無 | ✅（第五輪補齊全 6 個）|
| B3 月曆模式 | ❌ 無 | ✅（第二十八～三十一輪完整實作）|

### 27.4 B 系列各單元完成度摘要

| 單元 | 核心功能 | 語音 | 作業單 | 難度提示 | 月曆/特殊 | 完成度 |
|------|---------|------|--------|---------|---------|--------|
| B1 | ✅ 拖曳錢幣 | ✅ | ✅ | ✅ 3種難度 | — | ★★★★★ |
| B2 | ✅ 日記計算 | ✅ | ✅ | ✅ retry/proceed | — | ★★★★★ |
| B3 | ✅ 存錢+月曆 | ✅ | ✅ | ✅ 自訂物品 | ✅ 月曆 | ★★★★★ |
| B4 | ✅ 比價+差額 | ✅ | ✅ | ✅ 兩段式 | — | ★★★★★ |
| B5 | ✅ 預算選購 | ✅ | ✅ | ✅ 必買鎖定 | — | ★★★★☆ |
| B6 | ✅ 採購付款 | ✅ | ✅ | ✅ 三段流程 | — | ★★★★☆ |

> B5/B6 扣一星原因：題庫組數偏少（5~8 組），且找零/選購互動深度較 B3/B4 簡單。

---

## 二十八、各單元設定頁面規格（2026-03-23 補充）

> 參照 C1 §6.2 格式，逐單元列出設定頁所有選項、預設值與互動行為。

### 28.1 共用設定頁架構

所有 B 系列設定頁均採用「卡片式設定頁」（`unit-welcome > welcome-content`）結構：

```
unit-welcome（全畫面白色背景）
├── welcome-content（max-width:480px 卡片）
│   ├── settings-title-row（吉祥物左側 + h1 右側）
│   │   ├── <img> educated_money_bag_character.png（48px）
│   │   └── <h1>單元BX：{標題}</h1>
│   ├── b-diff-desc（難度說明動態文字框）
│   ├── [各單元設定組]（b-setting-group × N）
│   └── game-buttons
│       ├── back-btn（返回主選單 → Game.backToMenu()）
│       └── start-btn（開始練習 → 全選後解鎖）
└── footer（選配）
```

**開始按鈕邏輯**（`_checkCanStart()`）：全部必要設定均不為 `null` 時解鎖；否則顯示「請完成所有選擇」（disabled 灰色）。

---

### 28.2 B1 今天帶多少錢 — 設定選項

| 設定組 | 選項 | 預設值 | 說明 |
|--------|------|--------|------|
| 難度 | 簡單 / 普通 / 困難 | `null`（無預選） | 決定面額範圍與提示策略 |
| 題數 | 5 / 10 / 15 | `null` | 決定行程題目數 |
| 作答模式 | 重試 / 繼續 | `null` | 錯誤後行為（B1 natural retry：金額不足時仍可繼續補錢）|
| 獎勵系統連結 | 開啟獎勵系統 | — | RewardLauncher.open() |
| 作業單連結 | 產生作業單 | — | worksheet?unit=b1 |

**難度說明文字**（`_diffDescriptions`）：
- 簡單：「1元、5元、10元、50元 硬幣」
- 普通：「加入100元、500元 紙鈔」
- 困難：「加入1000元，不顯示總金額」

---

### 28.3 B2 零用錢日記 — 設定選項

| 設定組 | 選項 | 預設值 | 說明 |
|--------|------|--------|------|
| 難度 | 簡單 / 普通 / 困難 | `null` | 決定事件筆數（2/4/6 筆）與題型（選擇/鍵盤） |
| 題數 | 5 / 10 / 15 | `null` | 日記題目總數 |
| 作答模式 | 重試 / 繼續 | `null` | 答錯後重試或顯示答案 |
| 獎勵系統連結 | 開啟獎勵系統 | — | — |
| 作業單連結 | 產生作業單 | — | — |

**難度說明文字**（`_diffDescriptions`）：
- 簡單：「2 筆收支，三選一答題」
- 普通：「4 筆收支，用數字鍵盤輸入」
- 困難：「6 筆收支，用數字鍵盤輸入，金額更大」

---

### 28.4 B3 存錢計畫 — 設定選項

| 設定組 | 選項 | 預設值 | 說明 |
|--------|------|--------|------|
| 難度 | 簡單 / 普通 / 困難 | `null` | 簡單→月曆模式；普通/困難→週數計算測驗 |
| 題數 | 5 / 10 / 15（測驗模式）| `null` | 簡單模式固定月曆回合 |
| 作答模式 | 重試 / 繼續 | `null` | 測驗模式有效；月曆模式不適用 |
| 獎勵系統連結 | 開啟獎勵系統 | — | — |
| 作業單連結 | 產生作業單 | — | — |

**動態設定組顯示**：選擇簡單時，隱藏「題數」與「作答模式」組（`b3-quiz-settings`），只顯示月曆簡介（`b3-cal-settings`）。

**難度說明文字**：
- 簡單：「月曆存錢模擬，每天點格子存入固定金額」
- 普通：「商品價格 ≤800 元，三選一週數」
- 困難：「所有商品，用數字鍵盤輸入週數」

---

### 28.5 B4 特賣比一比 — 設定選項

| 設定組 | 選項 | 預設值 | 說明 |
|--------|------|--------|------|
| 難度 | 簡單 / 普通 / 困難 | `null` | 簡單→只選便宜；普通→三選一差額；困難→鍵盤輸入差額 |
| 題數 | 5 / 10 / 20 | `null` | 比較題目數 |
| 作答模式 | 重試 / 繼續 | `null` | Select + Diff 兩階段均適用 |
| 獎勵系統連結 | 開啟獎勵系統 | — | — |
| 作業單連結 | 產生作業單 | — | — |

**難度說明文字**：
- 簡單：「只需選出哪個比較便宜」
- 普通：「選出便宜的，再三選一回答便宜多少」
- 困難：「選出便宜的，再用鍵盤輸入差額」

---

### 28.6 B5 生日派對預算 — 設定選項

| 設定組 | 選項 | 預設值 | 說明 |
|--------|------|--------|------|
| 難度 | 簡單 / 普通 / 困難 | `null` | 預算寬裕度 + 商品數量 |
| 關卡數 | 3 / 5 / 8 | `null` | 場景關卡總數 |
| 獎勵系統連結 | 開啟獎勵系統 | — | — |
| 作業單連結 | 產生作業單 | — | — |

> B5 無「作答模式」設定（錯誤後統一顯示「再試一次」與「跳過」）。

**難度說明文字**：
- 簡單：「預算充裕，商品較少，容易選購」
- 普通：「預算適中，需要精打細算」
- 困難：「預算緊縮，商品更多，需謹慎規劃」

---

### 28.7 B6 菜市場買菜 — 設定選項

| 設定組 | 選項 | 預設值 | 說明 |
|--------|------|--------|------|
| 難度 | 簡單 / 普通 / 困難 | `null` | 購物清單長度 + 攤位分散度 |
| 關卡數 | 3 / 5 / 8 | `null` | 採購任務總數 |
| 獎勵系統連結 | 開啟獎勵系統 | — | — |
| 作業單連結 | 產生作業單 | — | — |

> B6 無「作答模式」設定（Shopping 階段點錯商品不強制重來，Payment 階段無錯誤機制）。

**難度說明文字**：
- 簡單：「清單 2 種商品，金額為整數百元」
- 普通：「清單 3~4 種，需計算合計付款」
- 困難：「清單 5 種以上，金額帶零頭，需精確找零」

---

## 二十九、各單元測驗畫面版面結構（2026-03-23 補充）

> 參照 C1 §6.3 + F1 §5.1 格式，說明各單元遊戲主畫面的 DOM 結構與版面設計。

### 29.1 共用 `b-header` 標題列結構

所有 B 系列測驗畫面頂端均使用 `.b-header`（sticky top，`z-index: 100`）：

```
.b-header
├── .b-header-left    # 單元名稱（b-header-unit）
├── .b-header-center  # 難度標籤 ＋ 進度（第 N/M 題）
└── .b-header-right   # 🎁 獎勵按鈕 ＋ 返回設定按鈕
```

**注意**：語音重播按鈕（`#replay-speech-btn .b-inline-replay`）移至各題目文字旁，不在 header。

---

### 29.2 B1 今天帶多少錢 — 測驗版面

```
.b-header（標題列）
├── #b1-schedule-card（行程卡）
│   ├── .b1-schedule-label（行程名稱 + 🔊）
│   ├── .b1-item-list（費用項目列表）
│   └── .b1-wallet-goal-tag（「需要 X 元」藍色 pill）
├── #b1-wallet-area（錢包放置區）
│   ├── .b1-drop-zone（拖曳目標區，.b1-drop-active 高亮）
│   │   └── .b1-placed-coin × N（已放入錢幣，點擊可移除）
│   └── .b1-wallet-total（合計：X 元）
├── #b1-coin-tray（錢幣托盤）
│   └── .b1-coin-btn × N（可拖曳錢幣，附圖片與面額）
│       └── .b1-coin-draggable（draggable="true"）
└── #confirm-btn（確認按鈕，達目標金額後解鎖）
```

**難度對應版面差異**：

| 難度 | 金額顯示 | 可用面額 | 托盤提示 |
|------|---------|---------|---------|
| 簡單 | 顯示目標金額 | 1/5/10/50 | 多餘面額淡化 |
| 普通 | 顯示目標金額 | +100/500 | 3次錯誤後高亮最佳 |
| 困難 | 顯示 `??? 元` | +1000 | hint-btn 按鈕 |

---

### 29.3 B2 零用錢日記 — 測驗版面

```
.b-header（標題列）
├── .b2-diary-card（日記本卡片，灰色 border-left 5px 橘色）
│   ├── .b2-diary-header（日記標題 + 🔊）
│   └── .b2-diary-events（事件列表）
│       └── .b2-event-row × N（income=綠色▲ / expense=紅色▼）
├── .b2-answer-card（答題卡，白色 card box）
│   ├── .b2-answer-prompt（「請選擇或輸入最後剩下的金額：」）
│   └── [簡單：.b2-options（3個選擇按鈕）/ 普通困難：.b2-keypad（數字鍵盤）]
└── #b2-hint-div（正確答案提示，proceed 模式錯誤後顯示）
```

**數字鍵盤結構**（普通/困難）：3×4 九宮格（1~9 + 清除/0/確認），`max-width: 5` 位數限制。

---

### 29.4 B3 存錢計畫 — 測驗版面（普通/困難）

```
.b-header（標題列）
├── .b3-product-card（商品卡片）
│   ├── .b3-product-icon（emoji 圖示 48px）
│   ├── .b3-product-name（商品名稱）
│   └── .b3-product-price（目標金額）
├── .b3-weekly-strip（每週存款資訊條 + 🔊）
├── .b3-pig-fill-row（撲滿格子動畫，≤8 格）
│   └── .b3-pig-cell × N（每格 350ms 間隔填充）
└── .b3-answer-card（答題卡，綠色邊框）
    └── [簡單：3選一 / 困難：數字鍵盤]
```

**B3 月曆版面**（簡單模式）：見 §十六 詳解。雙欄佈局（`.b3-cal-layout flex row`）：左側月曆 + 右側撲滿卡片（`.b3-pig-card`）。

---

### 29.5 B4 特賣比一比 — 測驗版面

```
.b-header（標題列）
├── .b4-question-label（商品名稱 + 🔊）
├── .b4-compare-grid（grid: 1fr auto 1fr）
│   ├── .b4-store-card.left（商店A 價格卡）
│   │   └── .b4-store-price（NT$ XXX）
│   ├── .b4-vs-divider（橘紅漸層圓形「VS」）
│   └── .b4-store-card.right（商店B 價格卡）
├── [Phase diff：.b4-diff-question（差額提問 + 選項/鍵盤）]
└── #b4-hint-div（正確差額提示）
```

**選中效果**：`.b4-store-card.selected`（綠色邊框 + 勾勾），`.b4-store-card.wrong`（紅色邊框）。

---

### 29.6 B5 生日派對預算 — 測驗版面

```
.b-header（標題列）
├── .b5-budget-bar（預算橫幅：預算 NT$XXX + 🔊）
├── .b5-items-grid（商品清單網格）
│   └── .b5-item-card × N
│       ├── .b5-item-must-badge（🔒 必買）
│       ├── .b5-item-icon（emoji）
│       ├── .b5-item-name
│       └── .b5-item-price
├── .b5-total-bar（即時金額條，ok/near/over 三色）
│   └── .b5-total-label（已選 NT$XXX 元）
└── .b5-confirm-btn（確認按鈕）+ 錯誤後顯示「再試一次」+「跳過」
```

**金額條顏色邏輯**：

| 狀態 | 條件 | 顏色 |
|------|------|------|
| ok | total ≤ budget × 0.9 | 綠色 |
| near | budget × 0.9 < total ≤ budget | 黃色 |
| over | total > budget | 紅色 |

---

### 29.7 B6 菜市場買菜 — 測驗版面（三階段）

```
.b-header（標題列）

Phase 1 Shopping：
├── .b6-mission-bar（購物任務橫幅 + 🔊）
├── .b6-stall-tabs（蔬菜攤 / 水果攤 / 雜貨攤 分頁）
│   └── .b6-tab-btn × 3（active 狀態橘色邊框）
├── .b6-stall-grid（當前攤位商品網格）
│   └── .b6-item-card × 6（點擊正確商品打勾）
├── .b6-checklist（購物清單核取框狀態）
└── #b6-wrong-tip（錯誤商品浮動提示，2秒消失）

Phase 2 Payment（購物完成後切換）：
├── .b6-total-display（消費合計）
├── .b6-payment-btns（7 種面額按鈕，彩色邊框）
│   └── .b6-bill-btn × 7（每種面額以 --bill-color CSS var 著色）
└── .b6-paid-display（已付金額）＋ 確認付款按鈕

Phase 3 Change（確認付款後）：
└── .b6-change-display（找零金額 + 語音 + 自動進下一關）
```

---

### 29.8 完成畫面共用結構（`b-res-*` CSS 系統）

所有 B 系列完成畫面遵循外部化至 `b-series.css` 的 `b-res-*` CSS 類別：

```
.completion-screen（bResCelebrate 動畫）
├── .completion-header
│   ├── <img> 吉祥物（52px）
│   ├── .trophy-bounce（🏆 / 單元專屬 emoji，bResBounce 動畫）
│   └── .completion-title（單元專屬標題，如「帶錢小達人 🎉」）
├── .performance-badge（橘色，bResGlow 動畫）
├── .learning-results（綠色漸層，學習成果說明）
├── .stats-grid（3 個 .stat-card）
│   ├── 答對 N/M 題（或 N/M 關）
│   ├── 正確率 XX%
│   └── 花費時間 X 分 XX 秒
├── .completion-reward-link（粉紅色，🎁 開啟獎勵系統）
└── .completion-buttons
    ├── .btn-play-again（綠色，再玩一次）
    └── .btn-back-settings（紫色，返回設定）
```

---

## 三十、語音模板詳解（各單元，2026-03-23 補充）

> 參照 F1 §3.2 格式，逐單元列出語音模板名稱、觸發時機與語音內容。

### 30.1 B1 今天帶多少錢 — 語音模板

| 場景 | 觸發函數 | 語音內容 |
|------|---------|---------|
| 題目語音（easy） | `renderQuestion()` +400ms | 「今天要去{label}，需要準備{items}，共{total}元」 |
| 題目語音（normal） | `renderQuestion()` +400ms | 「今天要去{label}，需要準備{items}，把錢幣放進錢包。」 |
| 題目語音（hard） | `renderQuestion()` +400ms | 「今天要去{label}，需要準備{items}，自己算好總金額！」 |
| 重播語音 | `#replay-speech-btn` 點擊 | 同題目語音（`state.game.lastSpeechText`）|
| 答對（正確金額）| `handleConfirm()` | 「太棒了！準備好了{total}元」 |
| 答錯（金額不足）| `handleConfirm()` 錯誤分支 | 「還差{diff}元，繼續加錢！」 |
| 答錯（金額超出）| `handleConfirm()` 錯誤分支 | 「錢太多了，移除一些試試」 |
| 提示語音 | `_showCoinHint()` | 「提示：用{面額組合}可以剛好到{total}元」 |
| 完成語音 | `showResults()` +800ms | 依正確率 4 段（見 §五 §5.3）|

### 30.2 B2 零用錢日記 — 語音模板

| 場景 | 觸發函數 | 語音內容 |
|------|---------|---------|
| 題目語音（easy） | `renderQuestion()` +500ms | 「看看日記，小明這個星期花了多少？三選一喔。」 |
| 題目語音（normal/hard） | `renderQuestion()` +500ms | 「看看日記，計算最後剩下多少錢？用數字鍵盤輸入。」 |
| 重播語音 | `#replay-speech-btn` | 同題目語音 |
| 答對（retry） | `_checkAnswer()` 正確 | 「答對了！剩下{toTWD(answer)}元」 |
| 答錯（retry） | `_checkAnswer()` 錯誤 | 「不對喔，再想想看」 |
| 答錯（proceed）| `_checkAnswer()` 錯誤 | 「正確答案是{toTWD(answer)}元」 |
| 完成語音 | `showResults()` +800ms | 依正確率 4 段 |

### 30.3 B3 存錢計畫 — 語音模板

| 場景 | 觸發函數 | 語音內容 |
|------|---------|---------|
| 題目語音（easy 月曆）| `_startCalendarSession()` | 「我們要存錢買{item.name}，每天存{dailyAmount}元，一起來存錢吧！」 |
| 題目語音（normal/hard）| `renderQuestion()` +500ms | 「要買{item.name}，價格是{price}元，每週存{weekly}元，要存幾週？」 |
| 月曆點格成功 | `_handleDayClick()` | 「存了{dailyAmount}元，累積{accumulated}元！」 |
| 月曆達標 | `_onCalendarGoalReached()` | 「太棒了！存夠了，可以買{item.name}了！」 |
| 撲滿填充完成 | `_renderPiggyAnimation()` callback | 「需要{answer}週，才能存夠！」 |
| 答對（測驗）| `_checkAnswer()` | 「答對了！需要{answer}週」 |
| 答錯（retry）| `_checkAnswer()` | 「不對喔，再想想看」 |
| 答錯（proceed）| `_checkAnswer()` | 「正確答案是{answer}週」 |
| 完成語音 | `showResults()` +800ms | 依正確率 4 段 |

> B3 語音只說「週數」，不涉及金額語音，故無需 `convertToTraditionalCurrency`。

### 30.4 B4 特賣比一比 — 語音模板

| 場景 | 觸發函數 | 語音內容 |
|------|---------|---------|
| 題目語音（easy）| `renderQuestion()` +400ms | 「{商品名}，哪個地方比較便宜？」 |
| 題目語音（normal）| `renderQuestion()` +400ms | 「{商品名}，哪個地方比較便宜？選出之後再回答便宜了多少元。」 |
| 題目語音（hard）| `renderQuestion()` +400ms | 「{商品名}，哪個地方比較便宜？選出之後輸入差額。」 |
| 重播語音 | `#replay-speech-btn` | 同題目語音 |
| Select 答對（easy）| `_handleSelectClick()` | 「答對了！{便宜店名}比較便宜！」 |
| Select 答對（normal/hard）| `_handleSelectClick()` | 「選對了！再回答便宜了多少元。」 |
| Select 答錯（retry）| `_handleSelectClick()` | 「這邊比較貴喔，再看看另一邊」 |
| Select 答錯（proceed）| `_handleSelectClick()` | 「答錯了，{便宜店名}才是比較便宜的」 |
| Diff 答對 | `_handleDiffAnswer()` | 「對了！{便宜店名}便宜了{toTWD(diff)}元」 |
| Diff 答錯（retry）| `_handleDiffAnswer()` | 「差額是{toTWD(diff)}元，再試一次」 |
| Diff 答錯（proceed）| `_handleDiffAnswer()` | 「正確答案是{toTWD(diff)}元」 |
| 完成語音 | `showResults()` +800ms | 依正確率 4 段 |

### 30.5 B5 生日派對預算 — 語音模板

| 場景 | 觸發函數 | 語音內容 |
|------|---------|---------|
| 題目語音 | `renderRound()` +400ms | 「今天辦派對，預算是{toTWD(budget)}元，記得選所有必買商品！」 |
| 重播語音 | `#replay-speech-btn` | 同題目語音 |
| 確認成功 | `_handleConfirm()` | 「太棒了！共花了{toTWD(total)}元，還剩{toTWD(rem)}元！」 |
| 確認失敗（未選必買）| `_handleConfirm()` | 「記得要選所有必買的商品喔！」 |
| 確認失敗（超支）| `_handleConfirm()` | 「超出預算了，多了{toTWD(over)}元，再試一次！」 |
| 完成語音 | `showResults()` +800ms | 依正確率 4 段（以「關」計）|

### 30.6 B6 菜市場買菜 — 語音模板

| 場景 | 觸發函數 | 語音內容 |
|------|---------|---------|
| 題目語音 | `renderRound()` +600ms | 讀出清單所有商品名，如「今天要買：高麗菜、蘋果、醬油」 |
| 重播語音 | `#replay-speech-btn` | 同題目語音 |
| 正確採購商品 | `_handleItemClick()` | （無語音，只有 correct 音效）|
| 錯誤採購商品 | `_handleItemClick()` 錯誤 | 「{商品名}不在今天的購物清單上」 |
| 進入付款 | 全部採購完成後 | 「共消費{toTWD(total)}元，請選擇付款金額。」 |
| 付款確認 | 點確認付款 | 「你付了{toTWD(paid)}元，找回{toTWD(change)}元，買菜成功！」 |
| 完成語音 | `showResults()` +800ms | 依正確率 4 段（以「關」計）|

---

## 三十一、音效系統詳表（2026-03-23 補充）

> 參照 F1 §3.3 格式，列出 B 系列所有音效使用場景。

### 31.1 音效檔案清單

B 系列使用 `html/bX_*.html` 中以 `<audio>` 標籤預載的 4 種音效：

| 音效 ID | 檔案路徑 | 說明 |
|---------|---------|------|
| `correct-sound` | `../audio/correct.mp3` | 答對、正確採購商品 |
| `error-sound` | `../audio/error.mp3` | 答錯、金額不符、錯誤商品 |
| `success-sound` | `../audio/success.mp3` | 完成所有題目/關卡 |
| `coin-sound` | `../audio/coin01.mp3`（B1/B3）| 錢幣放入 / 撲滿格子填充 |

> B2/B4/B5/B6 不使用 `coin-sound`。所有 B 系列 HTML 均有 `<audio id="correct-sound">` 等 3~4 個標籤。

### 31.2 音效觸發時機詳表

| 單元 | 音效 | 觸發時機 | 呼叫方式 |
|------|------|---------|---------|
| B1 | correct | 金額完全正確、放入正確面額時 | `Game.audio.play('correct')` |
| B1 | error | 金額不足/超出 | `Game.audio.play('error')` |
| B1 | coin | 每枚錢幣拖入錢包 drop | `Game.audio.play('coin')` |
| B1 | success | 完成所有題目 | `showResults()` 中 |
| B2 | correct | 答對時 | `Game.audio.play('correct')` |
| B2 | error | 答錯時 | `Game.audio.play('error')` |
| B2 | success | `showResults()` | — |
| B3 | correct | 答對時（測驗）/ 月曆點格成功 | `Game.audio.play('correct')` |
| B3 | coin | 撲滿每格填充（350ms 間隔）| `Game.audio.play('coin')` |
| B3 | error | 答錯時 | `Game.audio.play('error')` |
| B3 | success | 完成 / 月曆達標 | — |
| B4 | correct | Select 或 Diff 答對 | `Game.audio.play('correct')` |
| B4 | error | Select 或 Diff 答錯 | `Game.audio.play('error')` |
| B4 | success | `showResults()` | — |
| B5 | correct | 確認成功 | `Game.audio.play('correct')` |
| B5 | error | 確認失敗（未選必買/超支）| `Game.audio.play('error')` |
| B5 | success | `showResults()` | — |
| B6 | correct | 正確採購商品 | `Game.audio.play('correct')` |
| B6 | error | 點到非清單商品 | `Game.audio.play('error')` |
| B6 | success | `showResults()` | — |

### 31.3 `audio.play()` 安全機制

B 系列 `audio.play()` 已補齊 `try-catch`（第二十一輪，2026-03-18）：

```javascript
audio: {
    play(name) {
        const id = { correct: 'correct-sound', error: 'error-sound',
                     success: 'success-sound', coin: 'coin-sound' }[name];
        const s = document.getElementById(id);
        if (!s) return;
        try {
            s.currentTime = 0;
            s.play().catch(() => {});
        } catch (e) {}
    }
}
```

**防護目的**：行動裝置在使用者互動前播放音效可能拋出 `NotAllowedError`；`try-catch` 確保即使播放失敗也不影響遊戲流程。

### 31.4 行動裝置音訊解鎖

B 系列 HTML 均引入 `js/audio-unlocker.js`（統一於 2026-02-24 加入）：

| 機制 | 說明 |
|------|------|
| `audio-unlocker.js` 全域監聽 | 監聽首次使用者互動，建立靜音 AudioContext 解鎖底層限制 |
| `Game.audio.play()` try-catch | 個別音效播放容錯 |
| HTML `<audio preload="auto">` | 提前快取音效到記憶體，減少首次播放延遲 |

> B 系列無 `Game.unlockAudio()`（C1 獨有），僅依賴 `audio-unlocker.js` 全域解鎖即足夠。

---

## 三十二、Bug 格式化修復記錄（2026-03-23 補充）

> 參照 C1 §八 格式（Bug #X 表格），列出 B 系列開發過程中的重要問題與修復。

### Bug #1：B4 韓文標籤

| 項目 | 內容 |
|------|------|
| **問題** | B4 商店標籤顯示韓文「매장」而非中文「商店」 |
| **根本原因** | 初版複製其他語系模板時未替換商店標籤文字 |
| **修正方式** | `b4-store-label` 文字由 `매장` 改為 `商店A`/`商店B` |
| **影響範圍** | B4 所有難度商店比較卡片標題顯示異常 |

### Bug #2：B6 Init 重複編號

| 項目 | 內容 |
|------|------|
| **問題** | `js/b6_market_shopping.js` 中 init 區段標記為 `// ── 7. Init`，但前面已有 7 號，造成代碼審查混亂 |
| **根本原因** | 手動維護區段序號時計數錯誤 |
| **修正方式** | 重新排列序號，確保唯一 |
| **影響範圍** | 程式碼可讀性；不影響功能 |

### Bug #3：B5/B6 缺少 Speech 物件

| 項目 | 內容 |
|------|------|
| **問題** | B5、B6 初版完全缺少 `Game.Speech` 物件，所有語音呼叫靜默失敗 |
| **根本原因** | 初版開發時優先完成功能邏輯，語音系統未同步補上 |
| **修正方式** | 第二輪（2026-03-15）補全 `Game.Speech` 物件（`cachedVoice + _loadVoice() + speak()`），對齊 B1~B4 |
| **影響範圍** | B5 所有答題/完成語音；B6 付款確認/找零/錯誤商品語音 |

### Bug #4：backToMenu() href 錯誤路徑

| 項目 | 內容 |
|------|------|
| **問題** | B2/B3/B5/B6 的 `backToMenu()` 使用 `'../html/index.html'`，因 B 系列 HTML 已移入 `html/` 目錄，實際應為 `'../index.html'` |
| **根本原因** | 複製 A/C/F 系列模板時路徑未調整 |
| **修正方式** | 第六輪改為 `'../index.html#part4'` |
| **影響範圍** | 點擊「返回主選單」跳轉 404 Not Found |

### Bug #5：B4 缺少 backToMenu() 函數

| 項目 | 內容 |
|------|------|
| **問題** | B4 設定頁返回按鈕使用 `window.location.href` 直接跳轉，繞過 `TimerManager.clearAll()` 與 `EventManager.removeAll()` 清理 |
| **根本原因** | B4 初版未實作 `backToMenu()` 方法，依賴 inline href |
| **修正方式** | 第十一輪（2026-03-15）補入 `backToMenu()` 方法 + 按鈕改呼叫 `Game.backToMenu()` |
| **影響範圍** | 返回主選單後若快速重新進入 B4，計時器與事件監聽器可能殘留 |

### Bug #6：isEndingGame 命名不一致（gameCompleted）

| 項目 | 內容 |
|------|------|
| **問題** | B 系列初版使用 `state.gameCompleted` 作為完成畫面守衛，與 A/C/F 系列的 `state.isEndingGame` 命名不同，增加跨系列維護困難 |
| **根本原因** | 開發 B 系列時未參照現有系列命名規範 |
| **修正方式** | 第十七輪（2026-03-16）全 B 系列統一改為 `isEndingGame`（5 處/檔）|
| **影響範圍** | 命名一致性；不影響功能 |

### Bug #7：完成畫面 CSS 未外部化（inline style 大量重複）

| 項目 | 內容 |
|------|------|
| **問題** | 各 B 系列 JS 的 `showResults()` 中內嵌大量完成畫面 `<style>`（約 112 行），6 個單元各自重複，總計 ~672 行重複 CSS |
| **根本原因** | 初版參照 C1/F1 的 `endGame()` inline CSS 模式，未意識到 B 系列跨 6 個單元會產生大量冗餘 |
| **修正方式** | 第十五輪（2026-03-16）將所有完成畫面 CSS 統一移至 `css/b-series.css`，JS 中移除 `<style>` 標籤，改用 `b-res-*` 外部 CSS 類別 |
| **影響範圍** | JS 檔案各減少 ~112 行；`b-series.css` 增加 `bResCelebrate/bResBounce/bResGlow` keyframes |

### Bug #8：_bindSettingsEvents() 多次返回累積事件監聽器

| 項目 | 內容 |
|------|------|
| **問題** | 玩家從遊戲畫面多次返回設定頁時，`EventManager.listeners` 中 `'settings'` 類別監聽器不斷累積（雖指向被 innerHTML 覆蓋的舊 DOM，但物件仍佔記憶體） |
| **根本原因** | `_bindSettingsEvents()` 每次執行時只 push 新監聽器，未先清除舊的 `'settings'` 類別 |
| **修正方式** | 第十輪（2026-03-15）在 `_bindSettingsEvents()` 第一行加入 `Game.EventManager.removeByCategory('settings')` 守衛（全 6 檔）|
| **影響範圍** | 記憶體洩漏（輕微）；功能正常（舊 DOM 已失效，無雙重觸發）|

### Bug #9：speak() 語音速率過慢（0.9 vs 1.0）

| 項目 | 內容 |
|------|------|
| **問題** | B 系列初版 `u.rate = 0.9`，語音比 A/C/F 系列慢，教學場景中語速不統一 |
| **根本原因** | 複製模板時未同步確認語音速率標準 |
| **修正方式** | 第二十四輪（2026-03-18）全 B 系列改為 `u.rate = 1.0` |
| **影響範圍** | 全 B 系列所有語音語速對齊 A/C/F 系列 |

### Bug #10：B3 月曆模式設定頁無動態隱藏（2026-03-21 第二十八輪）

| 項目 | 內容 |
|------|------|
| **問題** | B3 簡單模式使用月曆，但設定頁仍顯示「題數」與「作答模式」兩個對月曆模式無意義的選項，造成使用者困惑 |
| **根本原因** | 月曆模式為後期加入（第二十八輪），初版設定頁設計未考慮此場景 |
| **修正方式** | 選擇簡單難度時，動態隱藏 `.b3-quiz-settings` 區塊，顯示 `.b3-cal-settings` 月曆說明文字 |
| **影響範圍** | B3 設定頁 UX；選簡單時「開始練習」按鈕僅需選「簡單」即解鎖（不需選題數）|

---

## 三十三、技術注意事項（2026-03-23 補充）

> 參照 C1 §七 格式，列出 B 系列開發、維護、測試時需特別注意的技術細節。

### 33.1 `_loadVoice()` 三重保障時機

B 系列 `Speech._loadVoice()` 採三重初始化保障：

1. **立即嘗試**：`Game.init()` 時呼叫 `Speech._loadVoice()`
2. **voiceschanged 事件**：`speechSynthesis.onvoiceschanged = () => Speech._loadVoice()`（處理非同步載入）
3. **延遲重試**：`setTimeout(Speech._loadVoice, 500)`（部分行動瀏覽器延遲）+ `voices[0]` 終極回退

**注意**：若 `voiceschanged` 未觸發（部分 iOS 情況），語音可能使用系統預設而非 Yating。`voices[0] ||` 終極回退確保此情況下仍有語音，而非靜默。

### 33.2 B1 拖曳放置的無限次使用設計

B1 錢幣採「**原始元素保留在托盤**」設計：

- 桌面 HTML5 DnD：`dragstart` 記錄面額，`drop` 時將新的 DOM 元素加入錢包，**不移動原始元素**
- 觸控拖曳：建立 `ghost clone` 跟隨手指，`touchend` 後 ghost 移除，原始元素不動
- **已放入的硬幣**（`.b1-placed-coin`）點擊可移除（退還），允許修正

**注意**：因無限次放入，同一面額可放多枚。若需限制枚數（每種最多 10 枚），需在 `_onDrop()` 中加入計數守衛（目前未實作，見 §二十三 未來建議）。

### 33.3 B3 月曆模式 state.customItems 持久化限制

`state.customItems[]` 儲存自訂物品，**跨遊戲回合保留**（不在 `resetGameState()` 中重置），但**不做 localStorage 持久化**：

- 同一頁面 session 內切換難度/重玩，自訂物品仍保留
- **重新整理頁面後遺失**，學生需重新上傳

若教師每堂課使用固定自訂物品，建議告知學生課前完成上傳後不要重新整理。

### 33.4 B5 必買商品的 selectedIds 初始化時機

`selectedIds` 在 `renderRound()` 中預填 `must: true` 的商品 ID，但若 `renderRound()` 被「再試一次」重新呼叫時，**selectedIds 會重置為只含 must items**（設計如此）：

```javascript
renderRound() {
    this.state.game.selectedIds = [
        ...scenario.availableIds.filter(id => this._getItemById(id)?.must)
    ];
    // 重新渲染，學生需重新選擇非必買商品
}
```

**注意**：「再試一次」不保留上次已選的非必買商品。這是教學設計決策，確保學生重新思考。

### 33.5 B6 三階段狀態切換與 phase 變數

B6 使用 `state.game.phase`（`'shopping' | 'payment' | 'change'`）管理三階段流程。

**需注意**：
- `phase = 'payment'` 切換時機：`purchasedIds` 數量等於 `mission.items.length`（全部採購完成）
- `phase = 'change'` 切換時機：使用者點擊確認付款且 `paidAmount >= total`
- **`paidAmount` 不重置**：`renderRound()` 時會重置（進下一關），但「確認付款前」若使用者多次點擊面額按鈕累積過多，系統允許超額付款（找零正常計算）

### 33.6 B4 左右商店隨機交換（swapped 旗標）

`renderQuestion()` 中以 50% 機率設 `state.game.swapped = true`，交換商店 A/B 的左右位置：

```javascript
const swapped = Math.random() < 0.5;
this.state.game.swapped = swapped;
const left  = swapped ? item.optB : item.optA;
const right = swapped ? item.optA : item.optB;
```

**`_handleSelectClick(side)` 正確答案判定**：

```javascript
const correctSide = this.state.game.swapped ? 'right' : 'left';
// optB 永遠比 optA 便宜（B4_ITEMS 保證 optA.price > optB.price）
// 不 swap 時 optA 在左、optB 在右 → 正確答案 = right
// swap 時 optB 在左 → 正確答案 = left
```

**注意**：若後續修改 B4_ITEMS 資料時，必須確保 `optA.price > optB.price`，否則 swapped 邏輯的正確答案計算會反轉。

### 33.7 B2/B3/B4 設定頁無預選（null）的影響

第二十八輪（2026-03-21）改為設定頁無預選（`settings.difficulty = null` 等）後：

- `_checkCanStart()` 需所有關鍵設定均不為 `null` 才解鎖「開始練習」
- **B3 的特例**：選擇簡單難度後，月曆模式不顯示「題數」設定組；此時 `settings.questionCount` 可保持 `null`，`_checkCanStart()` 需排除此欄位的 null 檢查
- **實作**：B3 `_checkCanStart()` 中若 `difficulty === 'easy'`，只檢查 `difficulty !== null`，不檢查 `questionCount`

### 33.8 speak() try-catch 包裝必要性

第二十輪（2026-03-17）加入 `try { window.speechSynthesis.speak(u) } catch(e) { safeCallback(); }`：

**原因**：`speechSynthesis.speak()` 在某些瀏覽器（Chrome 115+、部分 iOS）若 `utterance` 無效或 speech queue 狀態異常，可能**同步**拋出例外（如 `InvalidStateError`）。若無 `try-catch`，例外會傳播到呼叫方，`safeCallback` 永遠不會被執行，後續遊戲流程卡死。

---

## 三十四、B 系列 vs. 其他系列特性比較（2026-03-23 補充）

> 參照 F1 §7.2 格式，與 A/C/F 系列進行多維度橫向比較。

### 34.1 B 系列 vs. C/F/A 系列規模比較

| 項目 | B 系列（6 個單元）| C 系列（6 個）| F 系列（6 個）| A 系列（6 個）|
|------|:---:|:---:|:---:|:---:|
| 平均 JS 行數 | **901** | ~1,500 | ~4,000 | ~6,000 |
| 最大單元 JS | B6（980 行）| C6（~2,500 行）| F1（7,468 行）| A2（8,163 行）|
| CSS 架構 | 共用 `b-series.css` + 各單元 CSS | 共用 `c-series.css` + 各單元 CSS | `shared-game-base.css` + 各單元 CSS | 各單元獨立 CSS |
| 作業單 | ✅ 6 個單元 | ✅ 6 個單元 | ✅ 6 個單元 | ✅ 6 個單元 |
| 觸控拖曳 | ✅ B1（原生 Touch）| ❌（C 系列無拖曳）| ✅ F1/F3/F4/F6 | ✅ A3/A4/A6 |
| 月曆模式 | ✅ B3 獨有 | ❌ | ❌ | ❌ |
| 從零合規 | ✅（無需事後修補）| ❌（多次修補）| ❌（多次修補）| ❌（多次修補）|

### 34.2 B 系列 vs. C 系列技術比較

| 項目 | B 系列 | C 系列 |
|------|--------|--------|
| isEndingGame 守衛 | ✅ 從第二版即有（命名統一於第十七輪）| ✅ 後期補入 |
| TimerManager | ✅ 從初版即有 | ✅ 後期補入 |
| EventManager | ✅ 從初版即有 | ✅ 後期補入 |
| safeCallback + 10s 備援 | ✅ 從初版即有 | ✅ 後期補入 |
| resetGameState() | ✅ 第三輪補齊 | ✅ 後期補入 |
| speak() try-catch | ✅ 第二十輪補入（參照 C1）| C1 是原型 |
| 輔助點擊 ClickMode | ❌（B 系列不適用）| ✅ C4/C5/C6 有 |
| 語音重播按鈕 | ✅ `.b-inline-replay`（移至題目旁）| ❌（C 系列無此機制）|
| 中央回饋動畫 | ✅ `_showCenterFeedback()` | ✅ `showCenterFeedback()` 共用（C1 有）|

### 34.3 B 系列 vs. F 系列技術比較

| 項目 | B 系列 | F 系列 |
|------|--------|--------|
| ModeConfig 架構 | ❌（B 系列以 `_diffDescriptions` 物件管理難度差異）| ✅ F1 完整 ModeConfig |
| 自訂物品上傳 | ✅ B3（月曆模式）| ✅ F1/F3/F5/F6 |
| 完成畫面 CSS 外部化 | ✅ `b-res-*` 於 `b-series.css` | ✅ C/F 統一樣式（但仍部分 inline）|
| `injectGlobalAnimationStyles` | ✅ 從初版即用（含防重複 id）| ✅ F1 最先採用 |
| Debug FLAGS 系統 | ✅（`FLAGS: { all, init, speech, question, error }`）| ✅ F1 最完整（8 個 FLAG）|
| 作業單 afterRender | ❌（B 系列無 SVG 動態繪製）| ✅ F1（連連看 SVG 線條）|
| 遞迴 confetti | ✅ 全 B 系列 | ✅（F/C/A 全部）|

### 34.4 B 系列 vs. A 系列技術比較

| 項目 | B 系列 | A 系列 |
|------|--------|--------|
| 設定驅動架構 | 輕量（`_diffDescriptions` 物件）| A2 最完整（`serviceConfig + speechTemplates + timingConfig`）|
| 多場景管理 | ❌（B 系列每題均為相同畫面結構）| ✅ A3/A4/A6 多場景切換 |
| coinFirst 先投幣模式 | ❌（不適用）| ✅ A1/A2 有 coinFirst 任務類型 |
| Loading 畫面 | ❌ | ✅ A2/A5/A6 有 |
| Error Boundary | ❌ | ✅ A2/A3/A5/A6 有 |
| 輔助點擊 ClickMode | ❌ | ✅ A1~A6 全部有 |
| 「提示」按鈕 | ✅ B1 hint-btn（困難）| ✅ A1~A6 全部有 |
| 作業單 base64 圖片 | ❌（B 系列作業單無需 base64）| ✅ A1~A4 有 base64 圖片集 |
| 多步驟語音串接 | ❌（B 系列單步語音）| ✅ A2/A3/A6 複雜語音 callback chain |

### 34.5 合規性橫向比較（B 系列 vs. 所有系列）

| 合規指標 | B 系列 | C 系列 | F 系列 | A 系列 |
|---------|:------:|:------:|:------:|:------:|
| TimerManager | ✅ 從初版 | ✅ 後補 | ✅ 後補 | ✅ 後補 |
| EventManager | ✅ 從初版 | ✅ 後補 | ✅ 後補 | ✅ 後補 |
| isEndingGame 守衛 | ✅ | ✅ | ✅ | ✅ |
| safeCallback + 10s | ✅ 從初版 | ✅ 後補 | ✅ 後補 | ✅ 後補 |
| speak() try-catch | ✅ 第 20 輪 | ✅（C1 原型）| ✅ 後補 | ✅ 後補 |
| speak() rate = 1.0 | ✅ 第 24 輪 | ✅ | ✅ | ✅ |
| cachedVoice?.lang | ✅ 第 25 輪 | ❌（硬編碼）| ❌（硬編碼）| ✅ A2 原型 |
| confetti 遞迴 | ✅ 從初版 | ✅ 後補 | ✅ 後補 | ✅ 後補 |
| 完成畫面 CSS 外部化 | ✅ 第 15 輪 | ⚠️ 部分外部 | ⚠️ 部分外部 | ⚠️ 部分外部 |
| 0 raw setTimeout | ✅ 從初版 | ✅ 後補 | ✅ 後補 | ✅ 後補 |
| resetGameState() | ✅ 第 3 輪 | ✅ 後補 | ✅ 後補 | ✅ 後補 |
| 設定頁無預選 null | ✅ 第 28 輪 | ✅ | ✅ | ✅ |

> **評語**：B 系列是本專案唯一「從第一行就採用所有主要規範」的系列，後補項目主要為命名統一與品質細節，而非補救基礎架構缺失。

### 34.6 B 系列對其他系列的貢獻（可參考的設計決策）

| 貢獻項目 | 說明 | 可參考的單元 |
|---------|------|------------|
| 設定頁無預選（null + _checkCanStart）| 確保學生主動選擇，避免未理解設定就開始 | 若未來新增 G/H 系列 |
| b-res-* CSS 完全外部化 | 完成畫面 CSS 徹底從 JS 中分離，6 個單元共用 | 可推廣至 C/F 系列 |
| b-inline-replay 語音按鈕位置 | 移至題目文字旁，降低認知負擔 | 可推廣至 C 系列 |
| _showCenterFeedback 模組化 | 獨立方法，所有單元統一呼叫 | 已對齊 C1 的 showCenterFeedback |
| 月曆模式（B3 easy）| 在傳統測驗框架中加入時間序列模擬 | 未來 E 系列（假設）|
| cachedVoice?.lang 派生語系 | 語音語系自動對齊選用的語音引擎，比硬編碼 zh-TW 更準確 | 可推廣至 C/F 系列 |

---

## 三十五、Debug 系統使用指南（2026-03-23 補充）

> 參照 C1 §十四 格式，詳述 B 系列 Debug 系統架構與瀏覽器 Console 操作方式。

### 35.1 Debug 物件架構（全 B 系列共用）

所有 B 系列單元均包含相同的 `Game.Debug` 物件：

```javascript
Debug: {
    FLAGS: {
        all:      false,   // 全域開關（開啟後顯示所有分類）
        init:     false,   // 初始化相關
        speech:   false,   // 語音系統
        question: false,   // 題目生成 / 關卡載入
        error:    true     // 錯誤訊息（預設開啟）
    },
    log(category, ...args) {
        if (!this.FLAGS.all && !this.FLAGS[category]) return;
        console.log(`[B${N}-${category}]`, ...args);
    },
    warn(category, ...args) {
        if (!this.FLAGS.all && !this.FLAGS[category] && category !== 'error') return;
        console.warn(`[B${N}-${category}]`, ...args);
    },
    error(...args) {
        console.error('[B${N}-ERROR]', ...args);
    }
}
```

> `N` 為單元編號（1~6），如 `[B1-speech]`、`[B3-question]`。

### 35.2 各單元 FLAGS 差異

| FLAGS | B1 | B2 | B3 | B4 | B5 | B6 |
|-------|:--:|:--:|:--:|:--:|:--:|:--:|
| all | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| init | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| speech | ✅ | ✅（第21輪補）| ✅ | ✅ | ✅（第21輪補）| ✅（第21輪補）|
| question | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| error | ✅（預設 true）| ✅ | ✅ | ✅ | ✅ | ✅ |

> B2/B5/B6 的 `speech` 旗標於第二十一輪（2026-03-18）補入，對齊 B1/B3/B4。

### 35.3 瀏覽器 Console 使用方式

在瀏覽器開發者工具 Console 中輸入以下指令可動態開啟各分類日誌：

```javascript
// 開啟全部 debug 訊息
Game.Debug.FLAGS.all = true;

// 只開啟語音系統日誌（追蹤 speak() 呼叫與語音選擇）
Game.Debug.FLAGS.speech = true;

// 只開啟題目生成日誌（追蹤抽題、洗牌、關卡資料）
Game.Debug.FLAGS.question = true;

// 只開啟初始化日誌（追蹤 init()、_loadVoice()、resetGameState() 呼叫）
Game.Debug.FLAGS.init = true;

// 還原（關閉非 error 的所有日誌）
Game.Debug.FLAGS.all = false;
Game.Debug.FLAGS.speech = false;
Game.Debug.FLAGS.question = false;
Game.Debug.FLAGS.init = false;
```

### 35.4 各 FLAGS 對應的日誌訊息

| 分類 | 典型日誌內容 | 觸發時機 |
|------|------------|---------|
| `init` | `[B1-init] 初始化完成`、`[B3-init] _loadVoice() 已設置 cachedVoice: Microsoft Yating` | `init()` / `_loadVoice()` |
| `speech` | `[B2-speech] 播報語音: 看看日記...`、`[B4-speech] 語音錯誤: interrupted`（非警告）| `speak()` 每次呼叫 |
| `question` | `[B1-question] 載入第 3 題: 爬山，需要 350 元`、`[B6-question] 關卡 2 已載入，共 4 件商品` | `renderQuestion()` / `renderRound()` |
| `error` | `[B5-ERROR] _getItemById 找不到 id=99`（預設開啟，無需設定）| 任何未預期狀況 |

### 35.5 speak() 語音 onerror 日誌（第十六輪補入）

`speak()` 的 `u.onerror` 只在 `e.error !== 'interrupted'` 時才輸出警告，避免正常語音被打斷的 `interrupted` 事件淹沒 Console：

```javascript
u.onerror = (e) => {
    if (e.error !== 'interrupted') {
        Game.Debug.warn('speech', '語音錯誤', e.error);
    }
    safeCallback();
};
```

**debug 意義**：若 Console 出現 `[BX-speech] 語音錯誤 synthesis-failed`，代表系統無可用語音引擎，需確認設備語音設定。

---

## 三十六、各單元功能測試步驟（2026-03-23 補充）

> 參照 C1 §十三 格式，提供各單元關鍵功能的驗證步驟，供開發者與教師確認系統運作。

### 36.1 共用基礎測試（適用全 B 系列）

#### 測試 A：語音系統啟動

1. 開啟任一 B 系列 HTML（如 `html/b1_daily_budget.html`）
2. 在設定頁點擊任一難度按鈕
3. **預期結果**：語音播報難度說明文字（或問候語）
4. 若無語音：開啟 Console，輸入 `Game.Debug.FLAGS.speech = true`，重新點擊，觀察語音選擇日誌

#### 測試 B：isEndingGame 防重複守衛

1. 完成一局遊戲到完成畫面
2. 快速多次點擊「再玩一次」
3. **預期結果**：只執行一次重置，Console 不出現重複的初始化日誌

#### 測試 C：返回設定後事件清理

1. 開始遊戲 → 答 3 題 → 點「返回設定」
2. 再次開始遊戲
3. **預期結果**：題目索引從 1 重新開始，分數歸零

#### 測試 D：設定頁無預選守衛

1. 開啟任一 B 系列設定頁
2. 僅選擇難度，不選題數（或不選任一選項）
3. **預期結果**：「開始練習」按鈕維持灰色 disabled，不可點擊

---

### 36.2 B1 今天帶多少錢 — 功能驗證

#### 測試 B1-1：拖曳放置（桌面）
1. 設定：普通 → 10題 → 重試 → 開始
2. 拖曳一枚面額硬幣至錢包放置區
3. **預期結果**：
   - 硬幣在托盤中保留（不消失）
   - 錢包區出現放入的硬幣圖示
   - 合計金額即時更新

#### 測試 B1-2：拖曳移除
1. 在 B1-1 基礎上，點擊錢包區中已放入的硬幣
2. **預期結果**：硬幣從錢包移除，合計金額減少

#### 測試 B1-3：最佳組合提示（普通）
1. 設定：普通 → 重試 → 開始
2. 故意答錯（放入錯誤金額）連續 3 次
3. **預期結果**：錢包托盤上正確面額高亮（`.b1-coin-hint`，金色邊框）+ 語音「提示：用XXX可以剛好到XX元」

#### 測試 B1-4：困難模式不顯示金額
1. 設定：困難 → 開始
2. **預期結果**：行程卡「需要 ??? 元」，目標金額隱藏

---

### 36.3 B2 零用錢日記 — 功能驗證

#### 測試 B2-1：選擇題模式（簡單）
1. 設定：簡單 → 5題 → 重試 → 開始
2. 選擇正確金額
3. **預期結果**：中央出現 ✅ + 語音「答對了！剩下 XX 元」→ 1.4 秒後進下一題

#### 測試 B2-2：proceed 模式
1. 設定：普通 → 5題 → 繼續 → 開始
2. 故意輸入錯誤金額
3. **預期結果**：顯示正確答案提示（綠色 hint div）+ 語音「正確答案是 XX 元」→ 1.4 秒後進下一題（不重試）

#### 測試 B2-3：數字鍵盤最大位數
1. 設定：普通 → 開始
2. 在數字鍵盤連續按 6 個數字
3. **預期結果**：最多顯示 5 位數，第 6 位無效

---

### 36.4 B3 存錢計畫 — 功能驗證

#### 測試 B3-1：月曆存錢模式（簡單）
1. 設定：簡單 → 開始
2. 點擊月曆格子
3. **預期結果**：格子顯示 💰，進度條增加，語音播報存入金額

#### 測試 B3-2：月曆達標完成
1. 持續點擊月曆格子直到進度條達 100%
2. **預期結果**：顯示達標提示彈窗 + 語音「太棒了！存夠了，可以買 XX 了！」+ 煙火動畫

#### 測試 B3-3：撲滿動畫（測驗模式）
1. 設定：普通 → 10題 → 重試 → 開始
2. 答對一題
3. **預期結果**：撲滿格子依序填充（每格 350ms），coin 音效 × N 次，最後豬豬震動

#### 測試 B3-4：自訂物品上傳（月曆）
1. 設定：簡單 → 開始
2. 點擊月曆頁面中的自訂物品上傳區
3. 上傳一張圖片 + 輸入名稱 + 輸入價格
4. **預期結果**：自訂物品出現在選擇清單，可作為存錢目標

---

### 36.5 B4 特賣比一比 — 功能驗證

#### 測試 B4-1：左右隨機交換驗證
1. 設定：簡單 → 10題 → 開始
2. 觀察 10 題中商店 A/B 的位置
3. **預期結果**：約 50% 題目 A 在左、50% 在右（不應全部固定在同側）

#### 測試 B4-2：兩段式流程（普通）
1. 設定：普通 → 5題 → 重試 → 開始
2. 選擇較便宜的商店（正確）
3. **預期結果**：語音「選對了！再回答便宜了多少元」→ 進入差額選擇階段

#### 測試 B4-3：差額計算（困難）
1. 設定：困難 → 5題 → 開始
2. 答對選便宜後，輸入錯誤差額（retry）
3. **預期結果**：語音「差額是 XX 元，再試一次」→ 數字盤清空，可重新輸入

---

### 36.6 B5 生日派對預算 — 功能驗證

#### 測試 B5-1：必買商品鎖定
1. 設定：簡單 → 3關 → 開始
2. 嘗試取消勾選必買商品（蛋糕/飲料）
3. **預期結果**：必買商品無法取消（`_toggleItem` 有 must 守衛）

#### 測試 B5-2：即時金額條顏色
1. 設定：普通 → 3關 → 開始
2. 逐步勾選商品，直到接近預算上限
3. **預期結果**：金額條由綠色（ok）→ 黃色（near，>90%）→ 紅色（over，超支）

#### 測試 B5-3：再試一次重置
1. 超出預算後點「再試一次」
2. **預期結果**：頁面重新渲染同一關，僅必買商品預選，其他商品取消選取

---

### 36.7 B6 菜市場買菜 — 功能驗證

#### 測試 B6-1：攤位切換
1. 設定：普通 → 3關 → 開始
2. 點擊「水果攤」分頁標籤
3. **預期結果**：商品網格切換為水果攤商品，分頁按鈕 active 狀態更新

#### 測試 B6-2：錯誤商品提示
1. 點擊不在購物清單上的商品
2. **預期結果**：出現浮動紅色提示「XX 不在今天的購物清單上」（2 秒後自動消失）+ error 音效 + 語音

#### 測試 B6-3：付款與找零計算
1. 完成所有採購後，點選面額按鈕直到超過消費總額
2. 點「確認付款」
3. **預期結果**：顯示「找零：XX 元」+ 語音「你付了 XX 元，找回 XX 元，買菜成功！」

---

## 三十七、重要修復的函數修改位置（2026-03-23 補充）

> 參照 F1 §十 格式，列出最關鍵幾輪修復中，各 JS 檔案實際修改的函數名稱。

### 37.1 第三輪：resetGameState() 新增（2026-03-15）

| 單元 | 新增函數 | 修改函數 |
|------|---------|---------|
| B1 | `resetGameState()` | `showSettings()`（加入呼叫）、`startGame()`（加入呼叫）|
| B2 | `resetGameState()` | `showSettings()`、`startGame()` |
| B3 | `resetGameState()` | `showSettings()`、`startGame()` |
| B4 | `resetGameState()` | `showSettings()`、`startGame()` |
| B5 | `resetGameState()` | `showSettings()`、`startGame()` |
| B6 | `resetGameState()` | `showSettings()`、`startGame()` |

**resetGameState() 重置項目（各單元）**：

| 單元 | 重置項目 |
|------|---------|
| B1 | `score`, `totalCorrect`, `currentIndex`, `walletCoins`, `startTime`, `isEndingGame`, `isProcessing` |
| B2 | `score`, `totalAnswered`, `currentQuestion`, `inputValue`, `startTime`, `isEndingGame`, `isProcessing` |
| B3 | `score`, `totalAnswered`, `currentItem`, `startTime`, `isEndingGame`；`state.calendar`（月曆模式）|
| B4 | `score`, `totalAnswered`, `currentItem`, `phase`, `startTime`, `isEndingGame`, `isProcessing` |
| B5 | `correctRounds`, `currentRound`, `selectedIds`, `startTime`, `isEndingGame` |
| B6 | `correctRounds`, `currentRound`, `purchasedIds`, `paidAmount`, `phase`, `startTime`, `isEndingGame` |

---

### 37.2 第十輪：_bindSettingsEvents() 守衛（2026-03-15）

| 單元 | 修改函數 | 新增內容 |
|------|---------|---------|
| B1~B6 | `_bindSettingsEvents()` | 第一行加入 `Game.EventManager.removeByCategory('settings')` |

---

### 37.3 第十五輪：完成畫面 CSS 外部化（2026-03-16）

| 單元 | 修改函數 | 修改內容 |
|------|---------|---------|
| B1~B6 | `showResults()` | 移除 `<style>` 標籤（~112 行 inline CSS），改用 `b-res-*` CSS 類別 |
| B1~B6 | `injectGlobalAnimationStyles()` | 移除廢棄的 `bGlow` keyframe + `.performance-badge { animation: bGlow }` |
| `b-series.css` | — | 新增 `bResCelebrate`、`bResBounce`、`bResGlow` @keyframes + `.completion-screen` 等外部 CSS |

---

### 37.4 第十七輪：isEndingGame 命名統一（2026-03-16）

每個 JS 檔各有 **5 處**修改：

| 位置 | 修改前 | 修改後 |
|------|--------|--------|
| `state` 初始化 | `gameCompleted: false` | `isEndingGame: false` |
| `resetGameState()` | `this.state.gameCompleted = false` | `this.state.isEndingGame = false` |
| `startGame()` | `this.state.gameCompleted = false` | `this.state.isEndingGame = false` |
| `showResults()` 守衛 | `if (this.state.gameCompleted) return` | `if (this.state.isEndingGame) return` |
| `showResults()` 設旗 | `this.state.gameCompleted = true` | `this.state.isEndingGame = true` |

---

### 37.5 第二十輪：speak() try-catch 包裝（2026-03-17）

| 單元 | 修改函數 | 修改位置 |
|------|---------|---------|
| B1~B6 | `Speech.speak(text, callback)` | `window.speechSynthesis.speak(u)` 外層加 `try { } catch(e) { safeCallback(); }` |

**修改前後對照**：

```javascript
// 修改前
window.speechSynthesis.speak(u);

// 修改後
try {
    window.speechSynthesis.speak(u);
} catch(e) {
    Game.Debug.warn('speech', 'speechSynthesis.speak 例外', e.message);
    safeCallback();
}
```

---

### 37.6 第二十四輪：語音速率 0.9 → 1.0（2026-03-18）

| 單元 | 修改函數 | 修改位置 |
|------|---------|---------|
| B1~B6 | `Speech.speak(text, callback)` | `u.rate = 0.9` → `u.rate = 1.0`（1 處/檔）|

---

### 37.7 第二十五輪：語音語系由 cachedVoice 派生（2026-03-18）

| 單元 | 修改函數 | 修改位置 |
|------|---------|---------|
| B1~B6 | `Speech.speak(text, callback)` | `u.lang = 'zh-TW'` → `u.lang = this.cachedVoice?.lang \|\| 'zh-TW'`（1 處/檔）|

---

### 37.8 第二十八輪：設定頁無預選 null（2026-03-21）

| 單元 | 修改函數 | 修改內容 |
|------|---------|---------|
| B1~B4 | `state` 初始化 | `difficulty: 'easy'` → `difficulty: null`；`questionCount: 10` → `questionCount: null`；`retryMode: 'retry'` → `retryMode: null` |
| B5/B6 | `state` 初始化 | `difficulty: 'easy'` → `difficulty: null`；`rounds: 5` → `rounds: null` |
| B1~B6 | `_bindSettingsEvents()` | 難度/題數/模式按鈕：移除初始 `active` 預選 class |
| B1~B6 | `_checkCanStart()` | 加入各設定 `!== null` 判斷（B3 easy 模式排除 questionCount）|
| B1~B6 | HTML 設定頁 | 移除難度/題數/模式按鈕的 `class="b-sel-btn active"` 預選狀態 |

---

## 三十八、各單元教學使用注意事項（2026-03-23 補充）

> 參照 A2 §7.3 格式，列出教師與學生使用 B 系列各單元時應知悉的設計決策與操作限制。

### 38.1 B 系列整體注意事項

| 事項 | 說明 |
|------|------|
| **設定頁無預選設計**（2026-03-21）| 學生必須主動選擇難度、題數、作答模式，確保理解設定後再開始 |
| **語音需要使用者互動**| iOS/Android 規定，頁面載入後首次互動（任一點擊）才解鎖語音 |
| **無進度儲存**| 重新整理頁面後遊戲進度全部清除（包含 B3 自訂物品，若需持久化建議用 localStorage）|
| **retry 模式不計錯誤**| retry 模式下答錯不扣分也不計錯題，只有答對才加分；教師如需記錄錯誤次數需自行觀察 |
| **proceed 模式節奏更快**| proceed 模式顯示答案後 1.4 秒自動跳題；若學生閱讀速度較慢，建議改用 retry 模式 |

---

### 38.2 B1 今天帶多少錢 — 教學注意事項

| 事項 | 說明 |
|------|------|
| **行程清單包含多筆費用**| 每題可含 2~4 筆費用項目，學生需先加總再備好錢幣 |
| **困難模式無提示**| 困難模式目標金額顯示 `??? 元`；提示鈕（#hint-btn）仍可點，但教師可評估是否允許使用 |
| **錢包無上限**| 學生可無限次放入同一面額硬幣；若學生放入大量硬幣造成視覺混亂，教師可提醒移除多餘的（點擊錢包中硬幣即移除）|
| **拖曳行為差異**| 桌面用滑鼠拖曳；觸控設備用手指拖曳（需 `touchmove` 不被瀏覽器攔截），若觸控無反應請確認未啟用「下拉重整」手勢 |
| **簡單模式面額淡化**| 超出剩餘金額的面額自動淡化（`.b1-coin-faded`），幫助學生避免放入過大面額；若教師希望學生自行判斷可改用普通模式 |

---

### 38.3 B2 零用錢日記 — 教學注意事項

| 事項 | 說明 |
|------|------|
| **收支符號**| 收入（▲綠）/ 支出（▼紅），教師上課前建議先說明圖示含義 |
| **計算方向**| B2 以「期初金額 + 收入 - 支出 = 期末餘額」計算；題目不顯示期初金額，學生需從第一筆事件開始加減 |
| **干擾選項設計**| 簡單模式 3 個選項，干擾項間距固定（FIXED_DELTAS），確保不與正確答案過近（≥20 元）；若學生猜題，建議改用普通數字鍵盤模式 |
| **困難模式事件數**| 困難模式共 6 筆事件，金額較大；建議先讓學生熟練普通（4 筆）再進入困難 |

---

### 38.4 B3 存錢計畫 — 教學注意事項

| 事項 | 說明 |
|------|------|
| **簡單模式是月曆**| 簡單難度選擇後設定頁會隱藏「題數」和「作答模式」；直接開始月曆存錢，非傳統測驗模式 |
| **每日存款為固定金額**| 月曆模式中每天存入金額固定，不允許修改（教育目標是培養「每天固定存一點」的習慣意識）|
| **月曆格子可重複點擊**| 目前設計允許點擊已記錄過的日期（不會報錯），教師可說明實際情況下每天只存一次 |
| **自訂物品上傳**| 教師可事先上傳學生感興趣的商品圖片，提升學習動機；自訂物品在同一 session 跨回合保留，重新整理後消失 |
| **存週計算公式**| `Math.ceil(price / weekly)`，含餘數週；如存 100 元/週 買 350 元物品 = `ceil(3.5)` = 4 週（第 4 週只需存 50 元），教師可補充說明 |
| **撲滿格子最多 8 個**| 若答案 > 8 週，每個格子代表多週（如「每格 2 週」）；困難模式可能出現此情況 |

---

### 38.5 B4 特賣比一比 — 教學注意事項

| 事項 | 說明 |
|------|------|
| **optA 永遠比 optB 貴**| B4_ITEMS 資料中 optA.price 永遠大於 optB.price，「商店 A」未必是貴的那個（因有 50% 機率左右交換），不要讓學生固定選某一側 |
| **簡單模式只選便宜**| easy 只需「選出哪個比較便宜」即完成，不計算差額；適合剛學比大小的學生 |
| **差額計算為正數**| 差額 = 貴的價格 - 便宜的價格，永遠為正；學生只需輸入差額數字，不需判斷正負 |
| **數字鍵盤上限**| 困難模式差額最大為 `max(B4_ITEMS.optA.price - optB.price)` ≈ 幾百元；數字鍵盤最大位數 5 位，不會超出 |

---

### 38.6 B5 生日派對預算 — 教學注意事項

| 事項 | 說明 |
|------|------|
| **必買商品不可取消**| 蛋糕和飲料為必買，初始化時預先選取且無法取消；教師可藉此說明「有些花費是必要的，其餘才是可選的」|
| **即時金額條**| 金額條顏色（綠/黃/紅）是即時回饋；教師可讓學生先隨機選取、觀察顏色變化，再逐步調整 |
| **預算通常仍有剩餘**| 設計上學生不需花光預算，在預算內選齊必買即可；剩餘金額越多不代表表現越好（代表選購較少）|
| **「跳過」按鈕**| 答錯後出現「跳過」灰色按鈕，讓課堂時間有限的情況下可略過難題；教師可決定是否允許學生使用 |

---

### 38.7 B6 菜市場買菜 — 教學注意事項

| 事項 | 說明 |
|------|------|
| **三個攤位需逐一切換**| 購物清單商品可能分佈在不同攤位，學生需主動切換分頁標籤；教師可先示範攤位切換操作 |
| **付款允許超額**| 學生可付超過消費總額的金額（系統自動計算找零）；這是設計決策，模擬真實付款行為。教師可藉此討論「多付了還是少付了」的概念 |
| **找零為自動計算**| B6 不要求學生手動計算找零，系統自動顯示找零金額；若教學目標是「練習找零計算」，建議搭配 C6 找零單元 |
| **錯誤商品不扣分**| 點到非清單商品只提示、不扣分、不強制重來；這讓學生可以探索商品，但若學生刻意亂點教師可介入引導 |
| **付款面額設計**| B6_BILLS 包含 7 種面額（1000/500/100/50/10/5/1 元）；困難模式消費金額含零頭，需組合多種面額才能湊整 |

---

## 三十九、CSS 規格與品質分析

### 39.1 CSS 變數系統（b-series.css）

B 系列採用集中式 CSS 變數策略，所有共用色彩、尺寸皆定義於 `b-series.css` 的 `.b-series` 根選擇器（12 個變數），各單元 CSS 直接參照，不重新定義。

| 變數名稱 | 值 | 用途 |
|---------|---|------|
| `--b-primary` | `#f59e0b` | 琥珀主色（按鈕、標題、邊框亮態）|
| `--b-primary-dark` | `#d97706` | 主色深版（hover 狀態）|
| `--b-secondary` | `#10b981` | 翠綠輔色（收入、正確、進度條）|
| `--b-secondary-dark` | `#059669` | 輔色深版（hover）|
| `--b-danger` | `#ef4444` | 紅色危險（支出、超支、錯誤）|
| `--b-danger-dark` | `#dc2626` | 危險深版（hover）|
| `--b-neutral` | `#6b7280` | 中性灰（次要文字、停用狀態）|
| `--b-bg` | `#fffbeb` | 琥珀色系頁面底色 |
| `--b-card-bg` | `#ffffff` | 卡片背景（純白）|
| `--b-border` | `#fde68a` | 淡琥珀色邊框 |
| `--b-border-active` | `#f59e0b` | 亮態邊框（等同主色）|
| `--b-shadow` | `0 2px 8px rgba(245,158,11,0.18)` | 琥珀陰影 |
| `--b-radius` | `16px` | 大圓角（卡片、彈窗）|
| `--b-radius-sm` | `10px` | 小圓角（標籤、徽章）|

> 設計哲學：B 系列統一以「琥珀＋翠綠＋紅」三色系呈現「錢幣感」主題，與 C 系列（藍紫）、F 系列（彩虹）形成視覺區隔。

### 39.2 各單元 CSS 檔案規格

| 單元 | CSS 檔案 | `!important` 數量 | 主要職責 |
|------|---------|:-----------------:|---------|
| 共用 | `b-series.css` | 0 | CSS 變數、b-header、設定頁、完成畫面、共用動畫 |
| B1 | `b1_daily_budget.css` | 6 | 錢幣拖曳區、錢包目標、提示系統（b1CoinHintPulse）|
| B2 | `b2_allowance_diary.css` | 0 | 日記卡片、收支表格、答題區卡片 |
| B3 | `b3_savings_plan.css` | 0 | 撲滿、月曆格子、自訂物品面板、雙欄佈局 |
| B4 | `b4_sale_comparison.css` | 0 | 商品比較卡、VS 分隔符、差額輸入鍵盤 |
| B5 | `b5_party_budget.css` | 0 | 商品卡片選取、預算進度條、即時金額區 |
| B6 | `b6_market_shopping.css` | 0 | 攤位分頁標籤、商品格子、付款面額按鈕 |

**B1 的 6 處 `!important` 均集中於 `.b1-coin-btn` 系列**，用途是覆蓋 `b-series.css` 的通用按鈕樣式，確保錢幣按鈕的透明背景不被繼承規則干擾。其他單元 CSS 完全零 `!important`，達成架構目標。

### 39.3 CSS 架構分層與載入順序

```
ai-theme.css          ← 全域 Design Token（色彩/字型/spacing）
shared-game-base.css  ← B/C/F 共用基礎（.game-header、.modal-overlay 等）
b-series.css          ← B 系列主題層（CSS 變數、.b-series 根選擇器）
bX_unit.css           ← 單元專屬層（B1~B6 各自的元件/動畫）
common-modal-responsive.css ← 跨系列彈窗響應式
dark-mode-simple.css  ← 深色主題覆蓋
```

**各層職責原則**：
- 上層定義 token，下層只使用 token（不重定義）
- 單元 CSS 只負責「當前單元唯一」的元件；共用元件寫入 `b-series.css`
- B3 為特例：月曆模式（`b3-cal-*`）的 CSS 量最大，`b3_savings_plan.css` 是 B 系列最長的 CSS 檔

### 39.4 響應式設計策略

B 系列採用 `common-modal-responsive.css` 統一處理彈窗響應式，並透過 `b-series.css` 的 `@media (max-width: 600px)` 處理標題列自適應。單元 CSS 中的響應式斷點：

| 單元 | 主要斷點 | 響應行為 |
|------|---------|---------|
| B1 | 480px | 錢幣按鈕縮小、拖曳區調整高度 |
| B3 | 600px | 雙欄佈局 → 單欄（撲滿卡片移至上方）|
| B4 | 480px | 比較卡改 column 方向 |
| B6 | 480px | 攤位分頁標籤縮小字體 |

### 39.5 與其他系列 CSS 架構比較

| 指標 | B 系列 | C 系列 | F 系列 | A 系列 |
|------|--------|--------|--------|--------|
| 共用 CSS 變數檔 | `b-series.css`（14 個變數）| `c-series.css` | `shared-game-base.css`（間接）| 無統一 |
| 單元 CSS `!important` | B1:6 / 其餘:0 | 少量（C4/C6）| 少量（F4）| 較多（A2/A6）|
| 主題色系 | 琥珀 + 翠綠 | 藍紫 | 彩虹 | 單元各異 |
| 完成畫面 CSS | 外部化（`b-series.css` `b-res-*`）| 各單元 CSS | 各單元 CSS | 各單元 JS inline（A1~A6）|

---

## 四十、`injectGlobalAnimationStyles` 動畫清單詳表

### 40.1 架構說明

B 系列每個 JS 檔案均實作 `injectGlobalAnimationStyles()`，以 `id="bX-global-animations"` 防重複注入。注入的 `@keyframes` 均為「只能在 JS 中動態控制的動畫」，靜態 CSS 動畫則定義於各 CSS 檔（`.css`）。

**注入時機**：`init()` 呼叫 → `TimerManager.clearAll()` + `EventManager.removeAll()` → `injectGlobalAnimationStyles()`（每次重設遊戲均重新確認，但以 id 守衛確保只注入一次）。

### 40.2 JS 內 `injectGlobalAnimationStyles` 動畫清單

| # | 動畫名稱 | 所在 JS | 用途 | 觸發選擇器 |
|---|---------|---------|------|-----------|
| 1 | `b1CoinIn` | b1 | 錢幣飛入拖曳區的縮放動畫 | `.b1-coin-in` |
| 2 | `b1Pop` | b1 | 錢幣放置成功的放大彈跳 | `.b1-coin-pop` |
| 3 | `b1Shake` | b1 | 拖曳到目標區失敗的搖晃 | `.b1-coin-shake` |
| 4 | `b2RowIn` | b2 | 日記事件列從右滑入 | `.b2-row-in` |
| 5 | `b3SlotPop` | b3 | 撲滿格子存錢彈跳 | `.b3-slot-pop` |
| 6 | `b3CoinFloat` | b3 | 真實金幣圖片浮動飛入撲滿 | `.b3-coin-float` |
| 7 | `b4SlideUp` | b4 | 商品比較卡從底部滑入 | `.b4-slide-up` |
| 8 | `b5CardSelect` | b5 | 商品卡片選取時的縮放 | `.b5-card-select` |
| 9 | `b6Collect` | b6 | 商品加入購物車的收集動畫 | `.b6-collect` |

### 40.3 CSS 檔靜態動畫清單（`@keyframes` in `.css`）

| # | 動畫名稱 | 所在 CSS | 用途 | 觸發選擇器 |
|---|---------|---------|------|-----------|
| 1 | `settingsBounce` | b-series.css | 設定頁吉祥物圖片彈跳（上下）| `.settings-mascot-img` |
| 2 | `bResCelebrate` | b-series.css | 完成畫面整體淡入縮放 | `.b-res-screen` |
| 3 | `bResBounce` | b-series.css | 完成畫面獎盃 🏆 上下彈跳 | `.b-res-trophy` |
| 4 | `bResGlow` | b-series.css | 完成畫面表現徽章光暈脈動 | `.b-res-badge` |
| 5 | `bCoinIn` | b-series.css | 共用：錢幣飛入（`b1CoinIn` 的 CSS 版）| `.b-coin-in`（備用）|
| 6 | `bShake` | b-series.css | 共用：搖晃錯誤回饋 | `.b-shake` |
| 7 | `bFadeIn` | b-series.css | 共用：淡入 | `.b-fade-in` |
| 8 | `bPop` | b-series.css | 共用：放大彈跳 | `.b-pop` |
| 9 | `bFeedbackPop` | b-series.css | 中央回饋氣泡（`_showCenterFeedback`）| `.b-center-feedback` |
| 10 | `b1CoinHintPulse` | b1_daily_budget.css | B1 提示錢幣脈動光暈 | `.b1-coin-hint` |
| 11 | `b1FeedbackPop` | b1_daily_budget.css | B1 專用回饋氣泡（重複定義，已在 b-series.css 有 bFeedbackPop）| `.b1-cf-popup` |
| 12 | `b1AssistPulse` | b1_daily_budget.css | 輔助點擊提示脈動 | `.b1-assist-hint` |
| 13 | `b2Shake` | b2_allowance_diary.css | B2 錯誤答案搖晃 | `.b2-wrong` |
| 14 | `b3CoinDrop` | b3_savings_plan.css | 金幣掉入撲滿（向下落）| `.b3-coin-drop` |
| 15 | `b3PiggyShake` | b3_savings_plan.css | 撲滿存錢後晃動 | `.b3-piggy-shake` |
| 16 | `b3Shake` | b3_savings_plan.css | B3 錯誤搖晃 | `.b3-wrong` |
| 17 | `b3PigCoinIn` | b3_savings_plan.css | 撲滿面板金幣飛入 | `.b3-pig-coin-in` |
| 18 | `b3ExchPop` | b3_savings_plan.css | 換算提示徽章彈出 | `.b3-exch-badge` |
| 19 | `b3ExchFade` | b3_savings_plan.css | 換算提示徽章淡出消失 | `.b3-exch-badge.fade` |
| 20 | `b3CalPulse` | b3_savings_plan.css | 月曆模式目標金額脈動 | `.b3-cal-goal-pulse` |
| 21 | `b4Shake` | b4_sale_comparison.css | B4 錯誤搖晃 | `.b4-wrong` |
| 22 | `b4Pop` | b4_sale_comparison.css | B4 正確彈跳 | `.b4-pop` |
| 23 | `b5Pulse` | b5_party_budget.css | B5 預算進度條警戒脈動 | `.b5-bar-over` |
| 24 | `b6ItemCollect` | b6_market_shopping.css | B6 商品選取收集效果 | `.b6-item-collect` |

**合計**：JS 注入 9 個 + CSS 靜態 24 個 = **33 個 `@keyframes`**（含跨檔案重複的 bFeedbackPop/b1FeedbackPop 同義動畫）

---

## 四十一、各單元題庫內容摘要

### 41.1 B1 今天帶多少錢 — 題目生成邏輯

B1 無預設題庫，採**動態生成**策略：

```
generateQuestion() {
    const level = difficulty levels[current];
    target = random(level.min, level.max) — rounded to level.step
    wallet = generateWalletCoins(target)
}
```

| 難度 | 目標金額範圍 | 步進 | 最佳解錢幣數 |
|------|------------|------|------------|
| easy | 10~100 元 | 10 | 1~3 枚（主要用大面額）|
| normal | 50~500 元 | 10 | 2~5 枚 |
| hard | 100~1000 元 | 1（含零頭）| 3~8 枚 |

- **`_calcOptimalCoins(target, available)`**：貪婪演算法，由大到小選取面額；`easy` 模式先淡化多餘面額作為視覺提示
- 每回合錢幣池（`walletCoins`）包含目標金額的最佳組合 + 干擾面額，確保有唯一最佳解

### 41.2 B2 零用錢日記 — `B2_TEMPLATES` 題庫

| 難度 | 題目數（模板數）| 事件筆數 | 金額範圍 | 答案範圍 |
|------|:-----------:|:------:|---------|---------|
| easy | 8 | 2 筆/題 | 起始 50~300 元 | 55~170 元 |
| normal | 8 | 4 筆/題 | 起始 100~500 元 | 115~295 元 |
| hard | 8 | 6 筆/題 | 起始 100~600 元 | 65~395 元 |

**題型特徵**：
- 每筆事件含 `type`（income/expense）+ `name`（中文描述）+ `amount`（金額）+ `icon`（emoji）
- `startAmount` 為期初金額（顯示於日記第一行）；答案 = `startAmount + Σincome - Σexpense`
- 選項干擾值（`FIXED_DELTAS`）：easy `[20,40]`，normal `[25,50]`，hard `[30,60]`，確保選項間距合理

**範例（easy 第 1 題）**：
- 期初：100 元 → 媽媽給零用錢 +50 → 買飲料 -30 → **答案：120 元**

### 41.3 B3 存錢計畫 — `B3_ALL_ITEMS` 商品資料庫

| 商品 | 價格 | 圖示 | 難度篩選 |
|------|------|------|---------|
| 食譜書 | 280 | 📖 | easy/normal/hard |（2026-03-23 更名：原「繪畫工具組」，圖片實為食譜書）
| 玩具機器人 | 300 | 🤖 | easy/normal/hard |
| 望遠鏡 | 350 | 🔭 | easy/normal/hard |
| 烹飪玩具組 | 420 | 🍳 | normal/hard |
| 故事書套組 | 450 | 📚 | normal/hard |
| 科學實驗組 | 480 | 🔬 | normal/hard |
| 遊樂園門票 | 500 | 🎡 | normal/hard |
| 魔術道具組 | 550 | 🎩 | normal/hard |
| 生日蛋糕 | 600 | 🎂 | normal/hard |
| 音樂盒 | 650 | 🎵 | normal/hard |
| 運動鞋 | 800 | 👟 | hard |
| 水族箱 | 1200 | 🐠 | hard |
| 電動遊戲機 | 1500 | 🎮 | hard |
| 腳踏車 | 2400 | 🚴 | hard |

- `B3_ITEMS_BY_DIFF.easy`：≤400 元（3 個）；`normal`：≤800 元（10 個）；`hard`：全部（14 個）
- **每週存款選項（`B3_WEEKLY_OPTIONS`）**：easy `[50,100,150,200]`，normal `[30,50,75,100,120,150]`，hard `[25,35,...,200]`（10 個選項）
- **月曆模式（easy）**：固定每天存入金額 = `weekly_amount / 7`（四捨五入），目標累計達商品價格即完成

### 41.4 B4 特賣比一比 — `B4_ITEMS` 商品資料庫

共 **20 組**比價商品，涵蓋文具、食品、生活用品、服飾等類別：

| # | 商品 | 圖示 | 店家 A 價 | 店家 B 價 | 差額 |
|---|------|------|:--------:|:--------:|:---:|
| 1 | 鉛筆盒 | ✏️ | 85（文具店）| 65（超市）| 20 |
| 2 | 蘋果 | 🍎 | 45（超市）| 35（菜市場）| 10 |
| 3 | 原子筆 | 🖊️ | 15（書局）| 12（大賣場）| 3 |
| 4 | 礦泉水 | 💧 | 20（超商）| 13（量販店）| 7 |
| 5 | 洗髮精 | 🧴 | 189（藥妝店）| 149（量販店）| 40 |
| ... | ... | ... | ... | ... | ... |
| 17 | 洗碗精 | 🧼 | 59（超市）| 45（量販店）| 14 |
| 18 | 運動鞋 | 👟 | 1580（品牌店）| 1200（網購）| 380 |
| 19 | 拖鞋 | 🩴 | 390（百貨）| 120（夜市）| 270 |
| 20 | 手套 | 🧤 | 320（百貨）| 180（市場）| 140 |

- `optA.price` > `optB.price` 是資料不變量（optA 永遠是貴的選項）
- 顯示時以 50% 機率左右交換（`swapped` 旗標），防止學生固定選某側
- 差額範圍：3~380 元（easy 差額較小，hard 無額外限制，直接從全池抽）

### 41.5 B5 生日派對預算 — `B5_ALL_ITEMS` + `B5_SCENARIOS`

**商品清單（共 12 項）**：

| id | 商品名稱 | 價格 | 圖示 | 必買 |
|----|---------|------|------|:---:|
| cake | 生日蛋糕 | 380 | 🎂 | ✓ |
| drink | 果汁飲料 | 120 | 🧃 | ✓ |
| balloon | 彩色氣球 | 50 | 🎈 | - |
| gift | 小禮物 | 200 | 🎁 | - |
| plate | 派對紙盤 | 45 | 🍽️ | - |
| candle | 生日蠟燭 | 30 | 🕯️ | - |
| ribbon | 彩帶裝飾 | 65 | 🎊 | - |
| hat | 派對帽 | 80 | 🎉 | - |
| candy | 糖果禮包 | 90 | 🍬 | - |
| photo | 拍立得相機 | 150 | 📸 | - |
| popper | 噴彩拉炮 | 55 | 🎆 | - |
| banner | 生日橫幅 | 70 | 🏷️ | - |

- 必買合計：380 + 120 = **500 元**（每題最低消費）
- `B5_SCENARIOS` 各難度 8 個關卡，每關指定 `budget` 和 `availableIds`（easy 5 個/normal 7 個/hard 9 個可用商品）
- easy 預算 600~750 → 買必買後剩餘寬裕；hard 預算 680~770 → 需精算才不超支

### 41.6 B6 菜市場買菜 — `B6_STALLS` + `B6_MISSIONS`

**攤位商品（3 攤 × 6 商品 = 18 項）**：

| 攤位 | 商品 | 價格 | 單位 |
|------|------|------|------|
| 蔬菜攤 🥦 | 高麗菜/番茄/青蔥/地瓜/菠菜/紅蘿蔔 | 20~45 元 | 顆/斤/把 |
| 水果攤 🍎 | 蘋果/香蕉/葡萄/柳橙/哈密瓜/芒果 | 25~120 元 | 斤/把/串/顆 |
| 雜貨攤 🛒 | 雞蛋/豆腐/醬油/白米/麵條/食鹽 | 20~90 元 | 盒/塊/瓶/包 |

**任務設計（`B6_MISSIONS` 各難度 6 組）**：

| 難度 | 預算範圍 | 購買商品數 | 特點 |
|------|---------|:--------:|------|
| easy | 100~200 元 | 2 項 | 單一/雙攤，找零為整十 |
| normal | 200~300 元 | 3 項 | 跨兩攤，找零含零頭 |
| hard | 200~400 元 | 3~4 項 | 跨三攤，消費金額含零頭 |

---

## 四十二、程式碼品質指標與合規稽核

### 42.1 整體品質指標

| 指標 | B1 | B2 | B3 | B4 | B5 | B6 | 目標 |
|------|:--:|:--:|:--:|:--:|:--:|:--:|:---:|
| `window.setTimeout`（裸呼叫）| 1 | 1 | 1 | 1 | 1 | 1 | 0（每檔僅 TimerManager 內部 1 處，合規）|
| `window.setInterval`（裸呼叫）| 0 | 0 | 0 | 0 | 0 | 0 | 0 ✓ |
| `document.addEventListener`（非管理）| 1 | 1 | 1 | 1 | 1 | 1 | 1（`DOMContentLoaded` 必要用途）|
| 裸 `.addEventListener`（非 EventManager）| 2 | 2 | 3 | 2 | 2 | 2 | 盡量最小化 |
| CSS `!important`（JS inline）| 0 | 0 | 0 | 0 | 0 | 0 | 0 ✓ |
| `isEndingGame` 守衛 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 全 ✓ |
| `speak()` safeCallback + 10s 備援 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 全 ✓ |
| `speak()` try-catch | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 全 ✓ |
| `audio.play()` try-catch | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 全 ✓ |
| `toTWD()` 安全包裝 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 全 ✓ |

> **說明**：`window.setTimeout` 各 1 處均為 `TimerManager.setTimeout` 內部呼叫（`window.setTimeout(() => {...})`），非直接裸用，屬合規。裸 `.addEventListener` 中 B3 多 1 處因月曆模式綁定額外的 `window.resize` 事件。

### 42.2 架構合規稽核

| 合規項目 | B1 | B2 | B3 | B4 | B5 | B6 |
|---------|:--:|:--:|:--:|:--:|:--:|:--:|
| TimerManager 實作 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| EventManager 實作 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Debug FLAGS（含 `error:true`）| ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `injectGlobalAnimationStyles` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `resetGameState()` 完整重置 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `_bindSettingsEvents` `removeByCategory('settings')` 守衛 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `showResults` / `_endGame` `isEndingGame` 雙重守衛 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 語音 `cachedVoice + _loadVoice()` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 語音速率 `u.rate = 1.0` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 語音語系 `u.lang = cachedVoice?.lang` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 設定頁無預選（全 null 初始化）| ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `_checkCanStart()` 全選才開放 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `backToMenu()` 指向 `../index.html#part4` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 作業單連結只傳 `unit` 參數 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

### 42.3 B 系列 vs 其他系列品質指標比較

| 指標 | B 系列（平均）| C 系列（平均）| F 系列（平均）| A 系列（平均）|
|------|:-----------:|:-----------:|:-----------:|:-----------:|
| CSS `!important`（CSS 檔）| ~1（B1 特例）| ~2-5 | ~1-3 | ~10-20 |
| JS inline style 使用 | 少（動態需要時）| 少 | 少 | 中等 |
| 未清理 raw setTimeout | 0 | 0（已修復）| 0（已修復）| 0（已修復）|
| confetti `setInterval` | 遞迴 ✓ | 遞迴 ✓ | 遞迴 ✓ | 遞迴 ✓ |
| 語音安全機制完整度 | 完整 | 完整 | 完整 | 完整 |
| Debug logger 規範化 | ✓ | ✓ | ✓ | ✓（部分 warn 漏洞）|

> B 系列為後期開發成果，直接繼承並整合了 A/C/F 系列迭代出的最佳實踐，因此在首次發布時即達到較高的基準品質，不需大量修復。

### 42.4 已知技術債與待觀察項目

| 項目 | 嚴重度 | 說明 | 影響單元 |
|------|:------:|------|---------|
| B3 `window.resize` 裸監聽 | 低 | 月曆模式重新排版時使用，未透過 EventManager 管理，重新整理遊戲時可能累積多個監聽器 | B3 |
| B1 `!important` 6 處 | 低 | 可改用提高 CSS 選擇器優先度取代 `!important`，但功能正常，優先度低 | B1 |
| B3 `b3CompressImage` 頁面層級函數 | 低 | 宣告為全域函數（非 Game 物件方法），若多個 B3 實例共存會衝突（實際上不會）| B3 |
| B2/B5/B6 難度 Debug `speech` FLAG 首批未含 | 低 | 後來在 2026-03-18 修復補齊（見修復記錄速查表）| B2,B5,B6 |

### 42.5 程式碼行數統計（估算）

| 單元 | JS 行數（估）| CSS 行數（估）| 題庫資料（估行）| 合計 |
|------|:-----------:|:-----------:|:------------:|:---:|
| B1 | ~800 | ~700 | ~0（動態）| ~1500 |
| B2 | ~600 | ~300 | ~120（B2_TEMPLATES）| ~1020 |
| B3 | ~1400 | ~650 | ~60（B3_ALL_ITEMS）| ~2110 |
| B4 | ~500 | ~300 | ~22（B4_ITEMS）| ~822 |
| B5 | ~700 | ~250 | ~70（B5_SCENARIOS + B5_ALL_ITEMS）| ~1020 |
| B6 | ~800 | ~400 | ~95（B6_STALLS + B6_MISSIONS）| ~1295 |
| 共用 CSS | — | ~640（b-series.css）| — | ~640 |
| **合計** | **~4800** | **~3240** | **~367** | **~8407** |

> B3 為規模最大的 B 系列單元（月曆 + 撲滿雙模式 + 自訂物品），JS 行數約為其他單元 1.7~2.8 倍。

---

## 四十三、B 系列測驗內容特色深析（對照 A/C/F 系列）（2026-03-23）

### 43.1 B 系列核心定位

B 系列橋接「數字運算能力（F 系列）」與「真實情境操作（A 系列）」，強調**規劃與決策**：不只是算對一個數字，而是在情境限制（預算、清單、時間）下做出合理判斷。

| 系列 | 核心能力 | 主要互動 | 情境深度 |
|------|---------|---------|---------|
| F 系列 | 數字基礎（唱數/認讀/比較）| 拖曳、點選 | 低（純符號）|
| C 系列 | 貨幣認知（面額/換算/找零）| 點選、拖曳 | 中（錢幣圖片）|
| A 系列 | 情境操作（購物/ATM/買票）| 多步驟流程 | 高（模擬場景）|
| **B 系列** | **預算規劃（計算/比較/存錢）**| **選擇+輸入+拖曳** | **中高（帶情境的計算）**|

---

### 43.2 各單元測驗內容特色

#### B1 今天帶多少錢

| 特色 | 說明 | 對應系列 |
|------|------|---------|
| 拖曳放置硬幣 | 模擬「從錢包取錢」的物理操作 | 類 F1/F3 拖曳架構 |
| 多面額選擇 | 簡單（1/5/10/50）→ 困難（+500/1000），漸增認知負荷 | 類 C 系列面額梯度 |
| 行程情境 | 生活化場景（看電影/買早餐/搭車等），非抽象計算 | 類 A 系列情境包裝 |
| 最佳組合演算法 | `_calcOptimalCoins()` 貪婪法提示最省面額組合 | B1 獨有 |
| 困難模式隱藏總額 | `??? 元` 強迫加總思考，不依賴視覺確認 | 類 C1 困難模式（只聽不看）|

**難度測驗重點**：

| 難度 | 測驗重點 | 提示機制 |
|------|---------|---------|
| 簡單 | 辨識面額 + 加總到目標金額 | 不可用面額自動灰暗（`.b1-coin-faded`）|
| 普通 | 多面額搭配，無灰暗輔助 | 錯誤 3 次後自動高亮最佳組合 |
| 困難 | 自行加總（隱藏目標）+ 多面額 | 提示按鈕 `#hint-btn`（手動觸發）|

---

#### B2 零用錢日記

| 特色 | 說明 | 對應系列 |
|------|------|---------|
| 日記卡格式 | income/expense 視覺分色，模擬真實記帳情境 | B 系列獨有 |
| 累加/累減計算 | 多筆事件序列運算（簡單2筆→困難6筆）| 類 F6 數的組成（分解概念）|
| 數字鍵盤輸入 | 普通/困難模式自由輸入，無選項依賴 | 類 C5/C6 鍵盤輸入模式 |
| 干擾項設計 | 簡單模式干擾項間距 ≥20 元（固定 delta array 保品質）| 類 C1 動態選項數量設計 |

**難度測驗重點**：

| 難度 | 題數/難度 | 呈現方式 | 輸入方式 |
|------|---------|---------|---------|
| 簡單 | 2 筆事件，8 組題庫 | 日記卡（圖+文）| 三選一選擇題 |
| 普通 | 4 筆事件，8 組題庫 | 日記卡 | 數字鍵盤 |
| 困難 | 6 筆事件，6 組題庫 | 日記卡（混合正負值）| 數字鍵盤 |

---

#### B3 存錢計畫

| 特色 | 說明 | 對應系列 |
|------|------|---------|
| 雙模式設計 | 普通/困難：選擇或輸入週數；簡單：月曆拖曳存錢 | B3 獨有 |
| 月曆模式 | 模擬每日存錢行為（2026-03-21 新增）| 類 A 系列步驟化模擬 |
| 撲滿動畫 | 答對後逐格填充，視覺化「存錢週數」| B3 獨有 |
| 商品圖片目標 | 14 種商品（280~2400 元），以圖片代替 emoji（2026-03-23）| 類 A 系列商品圖片 |
| 手動兌換系統 | 撲滿達閾值可手動兌換面額（如 10×10 → 1×100）| B3 獨有 |
| 自訂物品上傳 | 教師可上傳自訂商品圖片，設定名稱與價格 | 類 A3/F1 自訂主題 |
| 每日拖曳語音 | 每次放置一枚硬幣播報累計金額（2026-03-23）| 類 A 系列步驟語音 |

**難度測驗重點**：

| 難度 | 模式 | 商品範圍 | 輸入方式 | 答案計算 |
|------|------|---------|---------|---------|
| 簡單 | 月曆拖曳存錢（每日放幣）| 14 件中篩選 ≤400 | 拖曳放置 | 視覺完成 |
| 普通 | 選擇幾週 | ≤800 元商品 | 三選一 | `ceil(price/weekly)` |
| 困難 | 輸入幾週 | 全部 14 件 | 數字鍵盤 | `ceil(price/weekly)` |

---

#### B4 特賣比一比

| 特色 | 說明 | 對應系列 |
|------|------|---------|
| 兩段式測驗 | 先選較便宜方（選擇），再算差額（計算）| B4 獨有 |
| 左右隨機交換 | `swapped` 旗標防止答題慣性 | 類 C 系列隨機選項 |
| 雙重計算訓練 | 比較 + 差額，同一題型練習兩種技能 | B4 獨有 |
| 固定差額選項 | `_getDiffOptions()` 確保有效干擾項（普通模式）| 類 B2 干擾項設計 |

**難度測驗重點**：

| 難度 | Select 階段 | Diff 階段 | 特點 |
|------|------------|---------|-----|
| 簡單 | 選出便宜方即完成 | 無 | 單步驟比較 |
| 普通 | 選出便宜方 | 三選一差額 | 兩步驟，有選項輔助 |
| 困難 | 選出便宜方 | 鍵盤輸入差額 | 兩步驟，完全自主計算 |

---

#### B5 生日派對預算

| 特色 | 說明 | 對應系列 |
|------|------|---------|
| 必買約束 | 蛋糕+飲料必選（🔒），其他自由組合 | B5 獨有 |
| 即時預算條 | ok（綠）/ near（黃，>90%）/ over（紅）動態更新 | 類 A4 付款進度條 |
| 關卡制結構 | `B5_SCENARIOS`：easy/normal 各 12 關，hard 8 關（2026-03-24 擴充）| 類 A3/A4 關卡制 |
| 策略選購 | 學生需在預算內最大化滿足度（必買+選購）| 類 A4 超市購物策略 |

**難度測驗重點**：

| 難度 | 預算範圍 | 商品數 | 測驗重點 |
|------|---------|-------|---------|
| 簡單 | 較寬裕（餘裕 >100）| 5~6 件 | 必買概念 + 基本加總 |
| 普通 | 適中（餘裕 30~100）| 6~8 件 | 預算管控 + 選擇優先級 |
| 困難 | 嚴格（餘裕 <30）| 8~10 件 | 精確計算 + 取捨決策 |

---

#### B6 菜市場買菜

| 特色 | 說明 | 對應系列 |
|------|------|---------|
| 三攤位系統 | 蔬菜/水果/雜貨，切換標籤採購 | 類 A4 商店切換 |
| 三段式流程 | 採購 → 付款 → 找零（完整交易循環）| 最接近 A 系列的 B 單元 |
| 錯誤商品提示 | 點到不在清單的商品：浮動提示 + 語音（不強制跳過）| 類 A4 容錯設計 |
| 鈔票/硬幣組合付款 | 點選面額累積到目標，解鎖確認鈕 | 類 A 系列付款流程 |

**難度測驗重點**：

| 難度 | 攤位數 | 商品件數 | 付款方式 | 找零 |
|------|-------|---------|---------|-----|
| 簡單 | 1~2 | 2~3 件 | 整額（無需找零）| 顯示找零（0元）|
| 普通 | 2~3 | 3~4 件 | 多面額付款 | 顯示找零 |
| 困難 | 3 | 4~5 件 | 自選最佳付款 | 自行驗算找零 |

---

## 四十四、B 系列 vs A/C/F 系列測驗方式比較（2026-03-23）

### 44.1 互動模式對照

| 互動類型 | F 系列 | C 系列 | A 系列 | B 系列 |
|---------|--------|--------|--------|--------|
| 拖曳放置 | F1/F3/F4/F6 | C4/C5 | — | B1/B3（月曆）|
| 選擇題（多選一）| F5 | C1/C2/C3 | — | B2/B3/B4/B5 |
| 數字鍵盤輸入 | F5/F6（部分）| C5/C6 | — | B2/B3/B4 |
| 多步驟流程 | — | C6（找零）| A1~A6 全部 | B6（三段）、B5（選購+確認）|
| 自訂商品/主題 | F1/F3 | — | A3/A4 | B3（自訂物品）|
| 輔助點擊模式 | F1~F6 | C1~C6 | A1~A6 | **未實作** |

### 44.2 難度遞進策略對照

| 策略 | F 系列 | C 系列 | A 系列 | B 系列 |
|------|--------|--------|--------|--------|
| 視覺→文字→聽覺 | — | C1（看圖/看文/聽音）| — | — |
| 有輔助→半輔助→無輔助 | F1/F3（高亮消失）| — | A1~A6（光暈/提示）| B1（面額灰暗消失）|
| 題型增加→選項減少 | F2/F4 | C2/C4 | — | B2/B3（選→輸入）|
| 情境複雜度遞增 | — | — | A 全系列 | B6（攤位/付款/找零分離）|
| 隱藏關鍵資訊 | — | C1 困難聽音 | A1 困難無提示 | B1 困難（??? 元）|

### 44.3 B 系列相對 A/C/F 的差異點

| 差異 | 說明 | 影響 |
|------|------|------|
| **無輔助點擊（ClickMode）** | B 系列未實作 ClickMode | 特殊需求學習者門檻較高 |
| **無視覺→聽覺難度梯度** | B 系列難度差異主要在計算複雜度，非呈現模式 | 視覺障礙友善度較弱 |
| **無多模態題目呈現** | B 系列題目均為文字+圖示組合，無純聽覺模式 | 聽覺學習者缺少對應 |
| **B3 最接近 A 系列深度** | 月曆模式 = 模擬每日存錢，撲滿 = 累積視覺化 | B3 複雜度最高，需最多測試 |
| **B6 最接近 A 系列流程** | 三段式採購→付款→找零，最接近 A2/A4 的情境深度 | B6 是 B 系列「生活應用」最強單元 |

---

## 四十五、B3 月曆模式測驗規格完整版（2026-03-23）

### 45.1 月曆模式啟動條件

| 條件 | 值 |
|------|---|
| 難度設定 | `easy`（簡單模式專屬）|
| 進入函數 | `_startCalendarSession()` |
| 觸發語音 | `今天可以存{dailyAmount}元`（2026-03-23 更新）|

### 45.2 State 結構（月曆相關）

```javascript
state.calendar = {
    sessions: [           // 每一天的存錢記錄
        {
            day,          // 1~totalDays
            item,         // B3_ALL_ITEMS 中被選中的商品
            dailyAmount,  // 每日存錢金額（根據商品價格計算）
            accumulated,  // 累計存入金額
        }
    ],
    drag: {               // 拖曳工作階段（點擊日曆格後建立）
        dayBeingSaved,    // 目前正在存的天數
        items,            // 分解後的金錢圖示陣列（各面額）
        placedCount,      // 已放置數量
        placedAmount,     // 已放置累計金額（2026-03-23 新增）
    },
    denomPile: {          // 撲滿面額堆積（手動兌換用）
        1: N, 5: N, 10: N, 50: N, 100: N, 500: N, 1000: N
    }
}
```

### 45.3 拖曳存錢語音流程（2026-03-23 更新版）

```
① 進入月曆頁  → 語音：「今天可以存X元」
② 點擊日曆格  → 拖曳工作階段開始，語音：「把X元拖曳放進撲滿！」
③ 放置第1枚硬幣 → 語音：「存入10元」（placedAmount += denom）
④ 放置第2枚硬幣 → 語音：「存入20元」（placedAmount += denom）
   ...（依此類推直到所有硬幣放完）
⑤ 全部放置完成 → 延遲 500ms → 語音：
   「今天存了X元，共存了X元，還差了X元」（2026-03-23: 還需要→還差了）
   若已達目標 → 語音：「太棒了！已經存夠了！」
```

### 45.4 金錢圖示拆解邏輯（_startDragSession）

日存金額依下列面額貪婪拆解，產生可拖曳的金錢圖示：

| 日存金額示例 | 拆解結果 | 圖示數量 |
|------------|---------|---------|
| 10 元 | 10×1 | 1 個 |
| 20 元 | 10×2 | 2 個 |
| 50 元 | 50×1 | 1 個 |
| 100 元 | 100×1 | 1 個 |
| 150 元 | 100+50 | 2 個 |

### 45.5 手動兌換規則（EXCHANGE_RULES，2026-03-23）

| 規則 | 條件 | 兌換結果 |
|------|------|---------|
| 1元×10 → 10元×1 | `denomPile[1] >= 10` | -10×1元，+1×10元 |
| 5元×2 → 10元×1 | `denomPile[5] >= 2` | -2×5元，+1×10元 |
| 10元×5 → 50元×1 | `denomPile[10] >= 5` | -5×10元，+1×50元 |
| 10元×10 → 100元×1 | `denomPile[10] >= 10` | -10×10元，+1×100元 |
| 50元×2 → 100元×1 | `denomPile[50] >= 2` | -2×50元，+1×100元 |
| 100元×5 → 500元×1 | `denomPile[100] >= 5` | -5×100元，+1×500元 |

達閾值時顯示綠色 `🔄 X個換1個Y元` 按鈕（`.b3-pig-exch-btn`），點擊觸發 `_handleExchange(from, count, to)`。

### 45.6 商品篩選（priceRange 設定）

| 設定值 | 上限 | 可用商品 | 建議難度 |
|-------|------|---------|---------|
| `300` | 300 元 | 食譜書(280)、玩具機器人(300) | 初學者 |
| `500` | 500 元 | 以上 + 望遠鏡(350)、烹飪玩具組(420)、故事書套組(450)、科學實驗組(480)、遊樂園門票(500) | 一般 |
| `800` | 800 元 | 以上 + 魔術道具組(550)、生日蛋糕(600)、音樂盒(650)、運動鞋(800) | 進階 |

---

## 四十六、B 系列強化建議（基於 A/C/F 最佳實踐）（2026-03-23）

### 46.1 短期可行強化（低實作成本）

| 項目 | 參照 | 說明 | 影響單元 |
|------|------|------|---------|
| B1/B3 圖片顯示大小 128px | — | 商品圖片改為 128×128（2026-03-23 已完成）| B3 ✅ |
| B3 食譜書命名修正 | A4 商品名稱對應圖片 | 圖示為食譜，名稱改為「食譜書」（2026-03-23 已完成）| B3 ✅ |
| 各單元進入語音精簡化 | A 系列語音設計 | B3 已更新「今天可以存X元」，其他單元可審視是否過長 | B1~B6 |
| B6 困難模式找零驗算 | C6 找零系統 | 目前困難模式找零為系統自動顯示，可改為學生輸入驗證 | B6 |
| B4 視覺化差額 | A4 商品比較 | 在選出便宜方後視覺化顯示差距（如進度條/箭頭）| B4 |

### 46.2 中期強化建議（中等實作成本）

| 項目 | 參照 | 說明 |
|------|------|------|
| B 系列輔助點擊模式 | A/C/F 全系列 | 為 B1（拖曳）、B6（三步驟）實作 ClickMode，服務特殊需求學習者 |
| B2 日記視覺升級 | A3 餐點展示 | 日記卡片加入情境圖示或場景背景，提升代入感 |
| B5 商品圖片化 | B3 圖片系統 | B5_ALL_ITEMS 目前為 emoji，可改為圖片（參考 B3 的 `img` 欄位設計）|
| B6 商品圖片化 | B3 圖片系統 | B6_STALLS 商品加入圖片（配合 images/b6/ 目錄），增加視覺辨識度 |
| B3 自訂商品 PDF 輸出 | 作業單系統 | 自訂商品圖片整合至作業單 PDF 下載（類似 A3/A4 base64 懶載入機制）|

### 46.3 長期架構強化建議（高實作成本，參照 F1 ModeConfig）

| 項目 | 參照 | 說明 |
|------|------|------|
| ModeConfig 架構導入 | F1/F3 | 將 B1~B6 各單元的難度差異從 if-else 分散邏輯，統一為 `ModeConfig[difficulty]` 物件，便於新增難度或調整參數 |
| B 系列 ClickMode | A/C/F | 建立 `B_ClickMode` 共用輔助點擊框架，各單元僅需定義 ActionQueue |
| C1 式多模態難度 | C1 | B 系列目前難度差異主要在計算複雜度；可加入「聽題模式」（困難：只聽語音不看文字），提供聽覺學習通道 |
| B6 升級為 A 系列深度 | A2/A4 | B6 三段流程已接近 A 系列，可加入「錢包擬真互動」（類 A1/A2），讓付款更具操作感 |

### 46.4 B 系列教學序列建議

根據各單元認知難度與互動複雜度，建議教學順序：

```
入門（概念建立）
  B4 特賣比一比 → 單純比較，視覺直觀
  B1 今天帶多少錢（簡單）→ 拖錢幣，操作建立概念

基礎（運算練習）
  B2 零用錢日記（簡單/普通）→ 加減累算
  B3 存錢計畫（普通）→ 乘法應用 + 目標導向

進階（情境應用）
  B5 生日派對預算 → 限制條件下選購
  B3 月曆模式（簡單）→ 每日存錢模擬，時間感

挑戰（完整交易）
  B6 菜市場買菜（困難）→ 採購 + 付款 + 找零完整循環
```

---

## 四十七、B 系列各單元作業單題庫對照（2026-03-23）

### 47.1 作業單與遊戲題庫對應關係

| 單元 | 遊戲題庫 | 作業單題型 | 特殊說明 |
|------|---------|-----------|---------|
| B1 | 動態生成（行程×面額組合）| 看圖選幣值、填空計算 | 作業單 defaultCount=20 |
| B2 | B2_TEMPLATES（22 組）| 日記閱讀 + 計算填空 | — |
| B3 | B3_ALL_ITEMS（20 件，2026-03-24 擴充）| 存錢計畫計算 | 月曆模式無對應作業單 |
| B4 | B4_ITEMS（30 組，2026-03-24 擴充）| 比較 + 差額計算 | — |
| B5 | B5_SCENARIOS（easy/normal 12 組、hard 8 組，2026-03-24 擴充）| 預算規劃選購 | — |
| B6 | B6_MISSIONS（8 組×3 難度，2026-03-24 擴充）| 採購清單 + 找零計算 | — |

### 47.2 B 系列各題庫規模

| 資料庫變數 | 筆數 | 難度分布 | 題型變化 |
|-----------|------|---------|---------|
| B1 動態生成 | 無上限 | 面額池依難度擴展 | 行程/費用組合 × 面額數量 |
| `B2_TEMPLATES` | easy 12 + normal 12 + hard 12 = 36 組（2026-03-24 全面擴充）| 事件筆數 2→4→6 | 收入/支出/混合 |
| `B3_ALL_ITEMS` | 20 件（2026-03-24 擴充）| easy ≤400：6件/normal ≤800：15件/hard 全部 | 商品×週存金額矩陣 |
| `B3_WEEKLY_OPTIONS` | 各難度 4~6 選項 | — | 含正確答案±1~3週干擾 |
| `B4_ITEMS` | 30 組（2026-03-24 從 20 組擴充）| 統一（差額=optA-optB）| A/B 左右隨機 |
| `B5_ALL_ITEMS` | 12 件（2 必買+10 選購）| — | — |
| `B5_SCENARIOS` | easy 12 + normal 12 + hard 8 = 32 組（2026-03-24 擴充）| 預算/商品子集變化 | — |
| `B6_STALLS` | 3 攤位 × 6 商品 = 18 件 | — | — |
| `B6_MISSIONS` | easy 8 + normal 8 + hard 8 = 24 組（2026-03-24 從 6/6/5 擴充）| 攤位數/商品件數/預算 | — |

---

> **更新日期**：2026-03-23（四十三～四十七節新增：測驗內容特色深析、各單元難度詳表、B vs A/C/F 測驗比較、B3 月曆測驗完整規格、強化建議、題庫對照）
> **更新日期**：2026-03-24（四十八～五十二節新增：作業單題型詳表、C1 多模態難度啟示、B5/B6 圖片資源建議、計分制度設計、ModeConfig 架構規格；B3 商品表修正「食譜書」；建立 B1~B6 各單元獨立報告）

---

## 四十八、B 系列作業單題型詳表（2026-03-24，參照 A1 十種題型格式）

> A1 作業單設計了 10 種題型（價格計算×5 + 找零計算×5），C/F 系列各有 2~5 種題型。以下依 B 各單元列出現有及建議補充的作業單題型。

### 48.1 B1 今天帶多少錢

| # | 題型名稱 | 說明 | 難度對應 |
|---|---------|------|---------|
| 1 | 費用加總（填空）| 給行程名稱 + 各費用項目，填寫總金額 | easy |
| 2 | 費用加總（選擇）| 給行程 + 費用，三選一正確金額 | easy |
| 3 | 選幣組合（圖示）| 給目標金額，從錢幣圖示中勾選正確組合 | normal |
| 4 | 選幣組合（提示）| 同上，附各面額數量提示框 | easy |
| 5 | 填幣數量 | 給目標金額，填寫各面額需幾枚 | hard |
| 6 | 最少枚數 | 給目標金額，計算最少需幾枚硬幣（貪婪法概念）| hard |

> **現況**：B1 作業單 `defaultCount=20`，依難度生成動態行程+費用，選項為金錢圖示勾選。
> **建議補充**：A1 模式的「提示完成」題型（填寫面額×數量表格），適合困難模式。

### 48.2 B2 零用錢日記

| # | 題型名稱 | 說明 | 難度對應 |
|---|---------|------|---------|
| 1 | 日記閱讀填空 | 給收支日記，計算最終餘額（填空）| normal/hard |
| 2 | 日記選擇 | 給收支日記，三選一正確餘額 | easy |
| 3 | 單筆計算 | 給起始金額＋一筆收支，計算結果 | easy |
| 4 | 正負判斷 | 給多筆事件，判斷期末餘額是否比期初多/少 | normal |
| 5 | 事件分類 | 給多個消費行為，勾選哪些是「收入」哪些是「支出」| easy |

> **現況**：B2 作業單為日記閱讀+計算填空/三選一，`defaultCount` 依難度生成 B2_TEMPLATES 子集。

### 48.3 B3 存錢計畫

| # | 題型名稱 | 說明 | 難度對應 |
|---|---------|------|---------|
| 1 | 週數計算（填空）| 給商品價格＋週存金額，填寫需幾週 | normal/hard |
| 2 | 週數計算（選擇）| 同上，三選一 | easy/normal |
| 3 | 每週存多少（填空）| 給商品價格＋目標週數，填寫每週需存金額 | hard |
| 4 | 月存計算 | 給商品價格＋每月存款，計算需幾個月（除法）| hard |
| 5 | 圖表判讀 | 給撲滿格子圖（N格），判斷還差幾格 | easy |

> **現況**：B3 作業單為純週數計算填空，`defaultCount=20`，月曆模式無對應作業單。
> **建議補充**：題型 3「每週存多少」為逆向計算，可補充至困難模式。

### 48.4 B4 特賣比一比

| # | 題型名稱 | 說明 | 難度對應 |
|---|---------|------|---------|
| 1 | 圈選便宜的 | 給兩家商店價格，圈出較便宜的 | easy |
| 2 | 填差額 | 給兩家商店價格，計算差額（填空）| normal/hard |
| 3 | 選差額 | 同上，三選一差額 | easy/normal |
| 4 | 多商品排序 | 給 3~4 家商店，由便宜到貴排序 | hard（建議新增）|
| 5 | 最划算判斷 | 給多商店的不同規格商品，判斷哪種 CP 值最高 | hard（建議新增）|

> **現況**：B4 作業單含「圈選便宜的」+「填差額」，左右位置隨機（`swapped` 機制），`defaultCount=20`。

### 48.5 B5 生日派對預算

| # | 題型名稱 | 說明 | 難度對應 |
|---|---------|------|---------|
| 1 | 勾選合理組合 | 給預算+商品清單（含必買），勾選在預算內的合理購物組合 | easy/normal |
| 2 | 計算剩餘預算 | 給預算+已選商品，計算剩餘金額 | normal |
| 3 | 判斷是否超支 | 給預算+選擇清單，判斷 YES/NO | easy |
| 4 | 最多可買幾件 | 給預算+必買後剩餘，從選購區選出最多件數（不超支）| hard（建議新增）|

> **現況**：B5 作業單為「看預算+商品清單→勾選合理購物組合」，`defaultCount=5`（每關複雜度高）。

### 48.6 B6 菜市場買菜

| # | 題型名稱 | 說明 | 難度對應 |
|---|---------|------|---------|
| 1 | 看清單算總價 | 給購物清單（含各商品單價），計算購買總金額 | easy/normal |
| 2 | 計算找零 | 給總價+付出金額，計算找回金額 | normal/hard |
| 3 | 選付款方式 | 給總價，從選項中選出「剛好夠用」的付款方式 | normal |
| 4 | 清單核對 | 給購物清單，從攤位商品中勾選應購買的商品 | easy |
| 5 | 找零面額組合 | 給找零金額，填寫各面額枚數組合 | hard（建議新增）|

> **現況**：B6 作業單為「看購物清單+算總價+計算找零」，`defaultCount=10`。
> **建議補充**：題型 5「找零面額組合」與 C6 找零系統銜接，適合困難模式。

---

## 四十九、C1 多模態難度設計對 B 系列的啟示（2026-03-24）

> C1 認識錢幣的三難度，不是增加「計算複雜度」，而是改變「訊息呈現模態」：
> 簡單 = 看圖辨識（視覺）→ 普通 = 讀文字（文字）→ 困難 = 聽聲音（聽覺）

### 49.1 B 系列目前難度設計的主要維度

| 單元 | 簡單 vs. 困難的差異維度 |
|------|----------------------|
| B1 | 面額種類（1/5/10 → 加大面額） + 金額顯示（顯示 → 隱藏）|
| B2 | 事件筆數（2→6）+ 答題方式（選擇→鍵盤）|
| B3 | 商品金額範圍 + 答題方式（選擇→鍵盤）|
| B4 | 答題深度（只選便宜 → 再算差額）+ 輸入方式（選擇→鍵盤）|
| B5 | 可選商品數（5→10）+ 預算緊張度 |
| B6 | 購物項目數 + 涉及攤位數 |

**觀察**：B 系列的難度主要靠「計算量增加」和「輸入方式由選擇改為鍵盤」，缺乏 C1 的「模態轉換」維度。

### 49.2 C1 三模態設計

| 難度 | 題目呈現 | 選項呈現 | 核心挑戰 |
|------|---------|---------|---------|
| 簡單 | 看圖（貨幣圖片）| 圖片+文字 | 圖像辨識 |
| 普通 | 看文字（面額名稱）| 圖片+文字 | 文字→圖像對應 |
| 困難 | 聽聲音（語音播報）| 圖片+文字 + 重播鍵 | 聽覺→圖像對應 |

### 49.3 B 系列可借鑒的多模態設計

| B 單元 | 現行 Hard 模式 | 建議加入的模態維度 | 參照 |
|--------|-------------|----------------|------|
| B1 | 隱藏目標金額 | **聽覺模式**：行程費用只用語音播報，不顯示文字（`??? 元` 保留，但項目名稱隱藏） | C1 困難 |
| B2 | 鍵盤輸入 | **純語音模式**：日記事件只播語音，不顯示文字，學生聽完再輸入 | C1 困難 |
| B4 | 鍵盤輸入差額 | **記憶模式**：商品價格顯示 2 秒後隱藏，需記住再比較 | C3 emoji 提示 |
| B6 | 3 攤位 + 大金額 | **清單隱藏**：購物清單顯示 3 秒後消失，需記住再採購 | C3 困難 emoji |

### 49.4 實作建議（低成本方案）

在設定頁新增「挑戰模式」checkbox（獨立於難度設定）：

```javascript
// B1 挑戰模式：隱藏所有費用項目文字，只播語音
if (state.settings.challengeMode) {
    document.querySelectorAll('.b1-item-name').forEach(el => el.style.opacity = 0);
    Game.Speech.speak(itemListText);  // 完整語音播報所有費用
}

// B4 挑戰模式：價格顯示後 2000ms 自動遮蓋
if (state.settings.challengeMode) {
    Game.TimerManager.setTimeout(() => {
        document.querySelectorAll('.b4-store-price').forEach(el => {
            el.textContent = '???';
        });
    }, 2000, 'questionTransition');
}
```

---

## 五十、B5/B6 圖片資源建議（參照 B3 圖片系統，2026-03-24）

> B3 在 2026-03-23 完整導入圖片系統（`images/b3/`，14 張 PNG，含 `onerror` emoji fallback）。B5 和 B6 目前仍使用 emoji，以下為系統化擴充建議。

### 50.1 B3 圖片系統現況（已完成）

| 機制 | 說明 |
|------|------|
| 圖片目錄 | `images/b3/icon-b3-*.png` |
| 命名規則 | `icon-b3-{商品識別碼}.png` |
| 規格 | 220px、PNG，自 A4/C6 圖片按**價格相近原則**複製重命名 |
| `_itemIconHTML()` | 優先 `imageData`（自訂上傳）→ `item.img`（PNG）→ `item.icon`（emoji fallback）|
| 顯示尺寸 | 128×128 px（2026-03-23 統一）|

### 50.2 B5 生日派對預算 — 圖片擴充計畫

| id | 商品 | 現行 icon | 建議圖片名稱 | 可複製來源 |
|----|------|----------|------------|----------|
| cake | 生日蛋糕 | 🎂 | `icon-b5-birthday-cake.png` | B3 `icon-b3-birthday-cake.png` |
| drink | 果汁飲料 | 🧃 | `icon-b5-juice-drink.png` | A4 飲料類圖片 |
| balloon | 彩色氣球 | 🎈 | `icon-b5-balloons.png` | 新增（無現有來源）|
| gift | 小禮物 | 🎁 | `icon-b5-gift.png` | C6 `icon-c6-mystery-gift.png` |
| plate | 派對紙盤 | 🍽️ | `icon-b5-plates.png` | 新增 |
| candle | 生日蠟燭 | 🕯️ | `icon-b5-candles.png` | 新增 |
| ribbon | 彩帶裝飾 | 🎊 | `icon-b5-ribbons.png` | 新增 |
| hat | 派對帽 | 🎉 | `icon-b5-party-hat.png` | 新增 |
| candy | 糖果禮包 | 🍬 | `icon-b5-candy.png` | C6 `icon-c6-lollipop.png` 近似 |
| photo | 拍立得相機 | 📸 | `icon-b5-camera.png` | A4 3C 類圖片 |
| popper | 噴彩拉炮 | 🎆 | `icon-b5-popper.png` | 新增 |
| banner | 生日橫幅 | 🏷️ | `icon-b5-banner.png` | 新增 |

**實作方式**（參照 B3）：
1. 建立 `images/b5/` 目錄
2. 從現有圖片複製可重用的 4 張（cake/drink/gift/candy）
3. 其餘 8 張需新製（可以 AI 生成 220px PNG）
4. `B5_ALL_ITEMS` 各項加入 `img` 欄位（如 `img: 'icon-b5-birthday-cake.png'`）
5. 加入 `_itemIconHTML(item, size='80px')` 方法（B5 商品格較小，建議 80px）

### 50.3 B6 菜市場買菜 — 圖片擴充計畫

B6 共 18 件商品（3 攤×6），以食材為主，A4/C6 現有圖片難以複用。建議採用統一風格的食材 emoji 風格 PNG。

| 攤位 | 商品 | 建議圖片 | 備註 |
|------|------|---------|------|
| 蔬菜攤 | 高麗菜/番茄/青蔥/地瓜/菠菜/紅蘿蔔 | `icon-b6-cabbage.png` … | 食材，A4 無可用來源 |
| 水果攤 | 蘋果/香蕉/葡萄/柳橙/哈密瓜/芒果 | `icon-b6-apple.png` … | C6 有 `star-sticker`，不可用 |
| 雜貨攤 | 雞蛋/豆腐/醬油/白米/麵條/食鹽 | `icon-b6-egg.png` … | A4 食品類部分可用 |

**短期替代方案**：B6 保持 emoji 顯示，但將商品格從純文字升級為「emoji + 商品名稱 + 單位/價格」三行卡片，提升視覺辨識度。

---

## 五十一、計分制度設計建議（參照 F4/F5，2026-03-24）

> F4 數字排序：easy +10 / normal +15 / hard +20 分；F5 量比較：同策略。B 系列目前為每題 +1 分（`correctCount`）。

### 51.1 現行 B 系列計分方式

| 統計項 | 說明 | 顯示位置 |
|--------|------|---------|
| `correctCount` | 答對題數（+1/題）| 完成畫面卡片 1 |
| 正確率 | `correctCount / totalCount × 100%` | 完成畫面卡片 2 |
| 花費時間 | `endTime - startTime` | 完成畫面卡片 3 |

**限制**：B5/B6 為關卡制，`correctCount` 為完成關卡數，無困難度加權。

### 51.2 F4/F5 計分制度

```javascript
// F4 NumberSortingConfig
difficulties: {
    easy:   { scoring: { pointsPerQuestion: 10 } },
    normal: { scoring: { pointsPerQuestion: 15 } },
    hard:   { scoring: { pointsPerQuestion: 20 } }
}
```

完成畫面：顯示「總分 XXX 分」（非正確率）。

### 51.3 B 系列計分升級建議

| 方案 | 說明 | 影響 |
|------|------|------|
| **方案 A**（加權計分） | easy +10 / normal +15 / hard +20，完成畫面加「總分」卡片 | 低：加一個統計卡片 |
| **方案 B**（速度加分）| 在時間限制內完成加「速度獎勵」（+5），超時不扣分 | 中：需加計時器 |
| **方案 C**（完美連擊）| 連續答對 3 題獲「連擊獎勵」+5，顯示連擊動畫 | 中：需追蹤連擊狀態 |

**建議實作**（方案 A，低成本）：
```javascript
// 在各 B 單元 state 加入 totalScore
state.game.totalScore = 0;

// handleCorrectAnswer() 中
const points = { easy: 10, normal: 15, hard: 20 }[state.settings.difficulty];
state.game.totalScore += points;

// showResults() 加入第四統計卡片
{ label: '總得分', value: `${state.game.totalScore} 分` }
```

### 51.4 時間挑戰模式（F4 風格）

F4 提供 4 種時間限制：無限制 / 300 秒 / 120 秒 / 60 秒。

B 系列可在設定頁新增「時間挑戰」選項：

| 選項 | 適用單元 | 說明 |
|------|---------|------|
| 無時間限制（預設）| 全部 | 現行行為 |
| 3 分鐘挑戰 | B2/B3/B4 | 倒數計時，時間到顯示結果 |
| 1 分鐘衝關 | B4 | 比較題最適合快速挑戰 |

**實作要點**：參照 F5 的 `startTimer()` 遞迴計時器（非 `setInterval`）。

---

## 五十二、ModeConfig 配置驅動架構導入規格（參照 F1/F4，2026-03-24）

> F1、F3、F4、F5 全部採用 `ModeConfig[difficulty]` 集中管理難度差異，避免 if-else 散布全碼。B 系列目前以 if-else 實現難度分支，建議在新功能開發時逐步導入。

### 52.1 F1 ModeConfig 完整結構（參考模板）

```javascript
const ModeConfig = {
    easy: {
        modeType: 'guided',
        speechTemplates: {
            intro:    '今天要去{label}...',
            correct:  '答對了！共{total}元',
            error:    '不對喔，再試一次',
            hint:     '提示：用{coins}可以剛好到{target}元',
        },
        timing: {
            feedbackDelay: 100,
            nextQuestionDelay: 1400,
        },
        uiElements: {
            showTotal: true,
            showHint: 'auto',       // 自動顯示提示
            showCoinFade: true,     // 不可用面額淡化
        },
        audioFeedback: true,
        requireAnswer: true,
    },
    normal: { /* ... */ },
    hard:   { /* ... */ }
};
```

### 52.2 B1 ModeConfig 設計草稿

```javascript
// B1 今天帶多少錢 — ModeConfig 草稿
const B1_MODE_CONFIG = {
    easy: {
        denoms: [1, 5, 10, 50],
        amountRange: { min: 10, max: 100, step: 10 },
        showTotal: true,
        showCoinFade: true,     // 不可用面額淡化
        hintMode: 'auto',       // 自動提示（不需錯誤次數觸發）
        speechTemplates: {
            intro: '今天要去{label}，需要準備{items}，共{total}元',
        },
        timing: { nextDelay: 1200 },
    },
    normal: {
        denoms: [1, 5, 10, 50, 100, 500],
        amountRange: { min: 50, max: 500, step: 10 },
        showTotal: true,
        showCoinFade: false,
        hintMode: 'afterErrors3',  // 3 次錯誤後提示
        speechTemplates: {
            intro: '今天要去{label}，需要準備{items}，把錢幣放進錢包',
        },
        timing: { nextDelay: 1400 },
    },
    hard: {
        denoms: [1, 5, 10, 50, 100, 500, 1000],
        amountRange: { min: 100, max: 1000, step: 1 },
        showTotal: false,           // 顯示 ??? 元
        showCoinFade: false,
        hintMode: 'button',         // 需主動按提示按鈕
        speechTemplates: {
            intro: '今天要去{label}，需要準備{items}，自己算好總金額！',
        },
        timing: { nextDelay: 1600 },
    }
};
```

### 52.3 B6 ModeConfig 設計草稿（三階段均可配置）

```javascript
const B6_MODE_CONFIG = {
    easy: {
        stallCount: { min: 1, max: 2 },
        itemCount:  { min: 2, max: 2 },
        bills: [50, 100, 500],
        changeVerify: false,    // 找零不需學生驗算
        errorItem: 'tip',       // 點錯商品：tip 提示（不懲罰）
    },
    normal: {
        stallCount: { min: 2, max: 3 },
        itemCount:  { min: 3, max: 4 },
        bills: [50, 100, 500, 1000],
        changeVerify: false,
        errorItem: 'tip',
    },
    hard: {
        stallCount: { min: 3, max: 3 },
        itemCount:  { min: 4, max: 5 },
        bills: [1, 5, 10, 50, 100, 500, 1000],
        changeVerify: true,     // 困難：學生需驗算找零（類 C6）
        errorItem: 'penalty',   // 點錯商品：需重新選（輕度懲罰）
    }
};
```

### 52.4 導入優先順序建議

| 優先級 | 單元 | 理由 |
|--------|------|------|
| 高 | B1 | 難度參數最多（面額/金額/提示/顯示），if-else 最複雜 |
| 高 | B6 | 三段流程 × 三難度，ModeConfig 可同時管理各段行為 |
| 中 | B4 | Select/Diff 兩段均有難度分支，可各自定義 ModeConfig |
| 低 | B2/B3/B5 | 難度差異相對單純，if-else 尚可維護 |

---

## 五十三、A3 場景管理模式 → B6 場景生命週期設計（2026-03-24）

> A3 麥當勞採用 `SceneConfig / SceneManager` 實現多場景跳轉，每個場景有 `onEnter` / `onExit` 生命週期鉤子。B6 菜市場買菜同為多階段流程，可借鑑此架構。

### 53.1 A3 SceneConfig 核心結構（參考）

```javascript
// A3 實作方式（參考，不直接複製）
const SceneConfig = {
    BROWSE:    { id: 'browse',    onEnter: () => renderBrowseUI(),   onExit: () => cleanupBrowse() },
    CHECKOUT:  { id: 'checkout',  onEnter: () => renderCheckoutUI(), onExit: () => {} },
    PAYMENT:   { id: 'payment',   onEnter: () => initPayment(),      onExit: () => clearPaymentUI() },
    CHANGE:    { id: 'change',    onEnter: () => renderChangeUI(),   onExit: () => {} },
    PICKUP:    { id: 'pickup',    onEnter: () => renderPickupUI(),   onExit: () => {} },
};

SceneManager.goTo = function(sceneId) {
    if (current) SceneConfig[current].onExit();
    current = sceneId;
    SceneConfig[current].onEnter();
};
```

### 53.2 B6 適用場景分析

B6 菜市場買菜目前流程為：

```
[選攤位] → [選商品] → [確認付款] → [找零驗算（困難）] → [完成]
```

| A3 場景 | B6 對應場景 | 現況 | 建議 |
|---------|-----------|------|------|
| BROWSE（點餐選購）| 選攤位 + 選商品 | renderRound() 混合處理 | 拆分為 STALL / ITEMS 兩個場景 |
| CHECKOUT（結帳確認）| 確認購物清單 | 無獨立場景 | 新增 REVIEW 場景（列出已選商品+總價）|
| PAYMENT（付款）| 付款互動 | renderPaymentUI() | 改為 PAYMENT 場景，onEnter 初始化錢包 |
| CHANGE（找零）| 困難模式找零驗算 | 無（2026-03-24 建議新增）| CHANGE 場景，onEnter 顯示找零金額 |
| PICKUP（取餐）| 無 | — | B6 不需取餐，可省略 |

### 53.3 B6 場景管理導入規格

```javascript
const B6_SCENES = {
    STALL:   { onEnter: () => Game._renderStallSelect(),   onExit: () => {} },
    ITEMS:   { onEnter: () => Game._renderItemSelect(),    onExit: () => Game._clearItemHighlights() },
    REVIEW:  { onEnter: () => Game._renderReviewPanel(),   onExit: () => {} },
    PAYMENT: { onEnter: () => Game._initPaymentUI(),       onExit: () => Game._clearWalletState() },
    CHANGE:  { onEnter: () => Game._renderChangeVerify(),  onExit: () => {} },
    RESULT:  { onEnter: () => Game._showRoundResult(),     onExit: () => {} },
};
// 使用：Game._goScene('PAYMENT')
```

**導入效益**：
- 避免 `renderRound()` 函數超過 200 行（現況痛點）
- `onExit` 確保 TimerManager / EventManager 清理不遺漏
- 每個場景可獨立測試（`Game._goScene('CHANGE')` 直接進入找零場景）

---

## 五十四、C4 鬼影佔位提示 → B1/B5 視覺輔助設計（2026-03-24）

> C4 換零錢採用「鬼影佔位（ghost placeholder）」技術：答錯時在正確位置顯示淡化的正確錢幣圖示，讓學生看到「應該在哪裡」而非直接給答案。

### 54.1 C4 鬼影提示機制（參考）

```javascript
// C4 實作概念（參考）
function showGhostHints(correctSlots) {
    correctSlots.forEach(slot => {
        const ghost = document.createElement('div');
        ghost.className = 'ghost-coin';
        ghost.style.cssText = 'opacity:0.3; filter:grayscale(0.5); pointer-events:none;';
        ghost.innerHTML = coinImg(slot.value);
        slot.element.appendChild(ghost);
    });
}
```

### 54.2 B1 應用：最佳組合鬼影提示

B1 普通模式已有「錯誤 3 次後高亮最佳組合」機制，可升級為鬼影提示：

| 現況 | 升級方向 |
|------|---------|
| `_calcOptimalCoins()` 計算最佳組合 | 同樣使用，但改變呈現方式 |
| 普通：3 次後黃色邊框高亮（閃爍）| 改為：錢包區顯示半透明鬼影硬幣，標示應放的面額與數量 |
| 困難：提示按鈕觸發語音 | 改為：按提示鈕 → 錢包區出現鬼影組合，學生拖入實體硬幣覆蓋鬼影 |

```css
/* B1 鬼影提示 CSS */
.b1-ghost-coin {
    opacity: 0.25;
    filter: grayscale(0.6) sepia(0.3);
    pointer-events: none;
    border: 2px dashed #FFC107;
    border-radius: 50%;
    animation: b1GhostPulse 1.8s ease-in-out infinite;
}
@keyframes b1GhostPulse {
    0%, 100% { opacity: 0.15; }
    50%       { opacity: 0.40; }
}
```

### 54.3 B5 應用：超支警告鬼影

B5 生日派對預算可在超支時，顯示「去掉哪件商品可回到預算內」的鬼影標示：

```javascript
// B5 超支時：找出移除哪件最便宜的非必買商品可解除超支
function _showOverBudgetGhost() {
    const optionals = [...state.selectedIds].filter(id => !MUST_BUY.includes(id));
    optionals.sort((a, b) => itemMap[a].price - itemMap[b].price);
    const cheapest = optionals[0]; // 移除最便宜的可選商品
    document.querySelector(`[data-id="${cheapest}"]`)
        .classList.add('b5-ghost-remove'); // 淡紅色邊框提示可移除
}
```

---

## 五十五、C6 兩階段找零驗算 → B6 困難模式實作規格（2026-03-24）

> C6 找零採用「系統顯示找零 → 學生選擇確認」兩階段設計，普通模式三選一、困難模式鍵盤輸入。B6 困難模式在 `B6_MODE_CONFIG.hard.changeVerify: true` 中已規劃此機制，本節定義具體實作規格。

### 55.1 C6 找零驗算流程（參考）

```
[付款完成] → [系統計算找零金額]
    ↓
[普通] 三個金額選項（正確 + 兩個干擾）→ 學生點選
[困難] 數字鍵盤 → 學生輸入 → 確認
    ↓
[答對] 語音「找零正確！找你 X 元」→ 顯示找零錢幣
[答錯（retry）] 語音「不對，再算算看」→ 重新作答
[答錯（proceed）] 語音「正確找零是 X 元」→ 顯示答案 → 下一關
```

### 55.2 B6 找零驗算規格（困難模式）

| 項目 | 規格 |
|------|------|
| 觸發條件 | `B6_MODE_CONFIG.hard.changeVerify === true` |
| 付款金額 | 系統自動選擇最小整數面額（如需付 340 元 → 給 500 元）|
| 找零計算 | `change = paidAmount - totalPrice` |
| 作答方式 | 數字鍵盤輸入（對齊 B4 困難模式）|
| 干擾設計 | 無（困難模式學生自行計算，不提供選項）|
| 答錯行為 | `retryMode` 控制：retry → 重答；proceed → 顯示正確找零 |
| 語音模板 | 「付了 X 元，買了 Y 元的東西，找回多少錢？」|

```javascript
// B6 困難找零驗算核心邏輯（設計規格）
function _startChangeVerify(totalPrice) {
    const bills  = B6_MODE_CONFIG.hard.bills;
    const paid   = bills.find(b => b >= totalPrice) || totalPrice; // 最小可覆蓋面額
    const change = paid - totalPrice;
    state.change = { paid, change };

    // 渲染找零題目
    document.getElementById('b6-change-verify').innerHTML = `
        <p>你付了 <strong>${paid} 元</strong>，買了 <strong>${totalPrice} 元</strong> 的東西</p>
        <p>找回多少錢？</p>
    `;
    // 顯示數字鍵盤（同 B2/B4 普通/困難）
    _renderNumpad('b6-change-numpad', (val) => _checkChange(val, change));
}
```

### 55.3 B6 vs C6 找零差異

| 特性 | B6 菜市場 | C6 找零練習 |
|------|---------|----------|
| 情境 | 現實採購找零 | 純找零練習（店員視角）|
| 付款金額 | 系統自動決定（最小面額）| 隨機生成（多種面額選擇）|
| 困難模式 | 鍵盤輸入（本節規格）| 鍵盤輸入 |
| 找零錢幣顯示 | 無（數字確認即可）| 有（顯示找零錢幣組合）|
| 普通模式 | 無找零驗算（僅困難）| 三選一選擇 |

---

## 五十六、F6 三模式設計 → B2 多模式擴展規格（2026-03-24）

> F6 數的組成在同一單元內提供三種互補的學習模式：**合成**（已知兩部分求整體）、**分解**（已知整體求兩部分）、**填空**（隨機隱藏一個數字）。B2 目前只有「計算期末餘額」一種模式，參照 F6 可擴展為三模式。

### 56.1 F6 三模式設計（參考）

| 模式 | 題型 | 技能 |
|------|------|------|
| 合成（composition）| 部分 + 部分 = ? | 加法 |
| 分解（decomposition）| 整體 = 部分 + ? | 減法推導 |
| 填空（fillBlank）| 隨機隱藏任一數字 | 加減混合 |

F6 的關鍵設計：三種模式**共用同一題庫**，只改變「問哪個數字」，實作成本低但學習廣度高。

### 56.2 B2 三模式擴展規格

B2 零用錢日記同樣可以「共用日記模板，改變問題焦點」：

| 模式 | 問題焦點 | 現況 | 技能訓練 |
|------|---------|------|---------|
| **餘額模式**（現有）| 計算期末餘額 | 已實作 | 多步加減累算 |
| **缺項模式**（新增）| 隱藏一筆收支金額，學生推算 | 未實作 | 逆向推理（減法）|
| **分類模式**（新增）| 列出事件，學生分類為收入/支出 | 未實作 | 概念辨別（不需計算）|

### 56.3 缺項模式設計規格（B2 新增）

```javascript
// 缺項模式：隱藏一筆事件的金額，給出期末餘額，學生算出缺失金額
function _generateMissingItemQuestion(template) {
    const known   = template.startAmount;
    const correct = _calcBalance(template); // 真實期末餘額
    const hideIdx = Math.floor(Math.random() * template.events.length);
    const missing = template.events[hideIdx].amount;
    const type    = template.events[hideIdx].type; // income | expense

    // 渲染：將 hideIdx 那筆金額改為 "??? 元"
    // 題目：期初 X 元，已知事件... [??? 元] ...，最後剩 Y 元，??? 是多少？
    return { template, hideIdx, missing, correct, type };
}
```

**難度設計**：
- 簡單：隱藏收入項（加法缺項，直覺較強）
- 普通：隱藏支出項（減法缺項）
- 困難：隨機隱藏任一項，需先判斷方向再計算

### 56.4 分類模式設計規格（B2 新增，適合簡單模式）

```javascript
// 分類模式：給出 6~8 個生活事件，學生拖曳分類至「收入」或「支出」格
const CLASSIFY_EVENTS = [
    { name: '媽媽給零用錢', type: 'income',  icon: '💰' },
    { name: '買飲料',       type: 'expense', icon: '🧃' },
    { name: '過年紅包',     type: 'income',  icon: '🧧' },
    { name: '買書',         type: 'expense', icon: '📚' },
    { name: '幫忙家事獎勵', type: 'income',  icon: '🏠' },
    { name: '看電影',       type: 'expense', icon: '🎬' },
    // ...
];
```

互動方式：兩個分類框（「💚 收入」、「❤️ 支出」），學生點擊或拖曳事件卡片至正確框。

### 56.5 B2 三模式設定頁整合

```html
<!-- B2 設定頁新增「題型模式」選項 -->
<div class="b-setting-group" id="b2-mode-group">
    <label class="b-setting-label">題型模式</label>
    <div class="b-btn-group">
        <button class="b-sel-btn" data-type="quizMode" data-value="balance">計算餘額</button>
        <button class="b-sel-btn" data-type="quizMode" data-value="missing">找缺項</button>
        <button class="b-sel-btn" data-type="quizMode" data-value="classify">分類練習</button>
    </div>
</div>
```

> **建議**：分類模式適合作為 B2 的前置熱身（設定頁預設「計算餘額」），而非替代主模式。實作順序：餘額（現有）→ 分類（低技術成本）→ 缺項（需改渲染邏輯）。

### 56.6 B2 多模式 vs F6 三模式差異

| 特性 | B2 | F6 |
|------|----|-----|
| 題庫共用 | 共用 B2_TEMPLATES | 共用數字組合 |
| 新增模式技術成本 | 中（需修改渲染與題目生成）| 低（只改「問哪個數」）|
| 分類模式 | 有語意（收入/支出）| 無（純數字）|
| 設定頁整合 | 新增「題型模式」按鈕組 | 既有「模式選擇」按鈕 |
| 建議實作順序 | 分類（優先）→ 缺項 | 三模式同時已完成 |

---

## 五十七、C5 PriceStrategy + seededRandom → B4 動態商品價格生成（2026-03-24）

> C5 夠不夠採用 `PriceStrategy` 物件和 `seededRandom(seed)` 確定性隨機函數，動態生成 48+ 種商品的價格，確保同一 session 內重複播題時顯示相同選項。B4 已靜態擴充至 30 組，但未來若需更大題庫可借鑑 C5 動態生成機制。

### 57.1 C5 PriceStrategy 核心機制（參考）

```javascript
// C5 實作概念（參考，不直接複製）
const PriceStrategy = {
    favor_center:    (seed, base) => /* 偏向中間範圍 */,
    balanced_range:  (seed, base) => /* 均衡分布 */,
    expand_range:    (seed, base) => /* 向外擴展，困難模式 */,
};

function seededRandom(seed) {
    return Math.abs(Math.sin(seed) * 10000) % 1; // 確定性 0~1
}
// 同 seed → 同結果，確保重新渲染同一題時選項不變
```

### 57.2 B4 動態價格生成規格

B4 的核心是「兩家商店比較同一商品」，可用動態生成擴展 20 組限制：

```javascript
// B4 動態價格生成規格（設計方案）
const B4_PRICE_RANGES = {
    easy:   { min: 10,  max: 100,  diffMin: 5,  diffMax: 30  },
    normal: { min: 20,  max: 500,  diffMin: 10, diffMax: 100 },
    hard:   { min: 100, max: 2000, diffMin: 50, diffMax: 500 },
};

function _generateB4Item(seed, difficulty) {
    const range    = B4_PRICE_RANGES[difficulty];
    const rng      = (s) => Math.abs(Math.sin(s) * 10000) % 1;
    const priceA   = Math.round((range.min + rng(seed) * (range.max - range.min)) / 5) * 5;
    const diff     = Math.round((range.diffMin + rng(seed+1) * (range.diffMax - range.diffMin)) / 5) * 5;
    const priceB   = priceA - diff; // B 永遠是便宜方（同 B4_ITEMS 規範）
    return { priceA, priceB, diff, seed };
}
```

**設計重點**：
- `diff` 取整為 5 的倍數（避免 3 元、7 元等不自然差額）
- `seed` 由題號 + 難度決定（`seed = questionIndex * 7 + difficultyOffset`）
- 同 session 重播同題 → `seed` 不變 → 選項固定（C5 設計精神）

### 57.3 B4 動態擴充 vs 靜態 B4_ITEMS 比較

| 特性 | 現況（靜態 20 組）| 建議（動態生成）|
|------|---------------|--------------|
| 題庫上限 | 20 組（循環重複）| 無限（seed 驅動）|
| 差額範圍 | 3 ~ 380 元（固定）| 依難度動態調整 |
| 情境名稱 | 固定（如「鉛筆盒」）| 固定情境 + 動態金額（兩者分離）|
| 防作題 | `swapped` 左右隨機 | `swapped` + `seededRandom` 雙重 |
| 實作成本 | — | 低（只改金額生成，情境名稱可保留靜態）|

### 57.4 實作建議：情境靜態 + 金額動態

最低成本方案：保留 `B4_ITEMS` 的情境名稱（商品名稱 + 店家名稱），只將 `optA.price` / `optB.price` 改為動態生成：

```javascript
// 混合模式：情境靜態，金額動態（每次進題重新生成）
function _getDynamicItem(templateIdx, seed, difficulty) {
    const template = B4_ITEMS[templateIdx % B4_ITEMS.length];
    const { priceA, priceB, diff } = _generateB4Item(seed, difficulty);
    return {
        ...template,           // 保留 name, emoji, stores
        optA: { ...template.optA, price: priceA },
        optB: { ...template.optB, price: priceB },
        diff,
    };
}
```

---

## 五十八、A4 多商品採購流程 + A2 付款介面 → B6 完整輔助點擊設計（2026-03-24）

> A4 超市購物有最完整的多商品 ClickMode：action queue → 自動高亮 → 點選商品 → 確認付款 → 找零驗算。A2 理髮廳有分區付款介面（紙鈔區 + 硬幣區）。B6 菜市場買菜同為「選購 + 付款」流程，導入 ClickMode 是長期目標。

### 58.1 A4 ClickMode Action Queue 結構（參考）

```
actionQueue 為步驟序列，每步驟含：
{ type: 'selectItem' | 'confirmPayment' | 'verifyChange', targetId, hint }

processClick(event) → 比對 event.target 與 currentStep.targetId
    ├─ 符合 → highlightElement → 執行 → 推進 queue
    └─ 不符合 → stepErrorCount++ → showHint（≥3次）
```

### 58.2 B6 ClickMode 三段流程設計規格

| 階段 | 步驟 | ClickMode 目標元素 | 輔助提示觸發 |
|------|------|-----------------|------------|
| **Phase 1：選商品** | 1. 點選攤位 | `.b6-stall-card` | ≥3 次錯誤 → 高亮最近攤位 |
| | 2. 點選商品（可多件）| `.b6-item-card` | ≥3 次錯誤 → 高亮任務商品 |
| | 3. 確認商品 | `#b6-confirm-items-btn` | ≥2 次錯誤 → 高亮按鈕 |
| **Phase 2：付款** | 4. 選擇面額（一或多次）| `.b6-bill-btn` | ≥3 次錯誤 → 高亮最佳面額 |
| | 5. 確認付款 | `#b6-confirm-pay-btn` | 金額正確後自動高亮 |
| **Phase 3：找零**（困難）| 6. 輸入找零金額 | `.b6-numpad-btn` | ≥3 次錯誤 → 語音提示計算方式 |

### 58.3 A2 分區付款介面 → B6 應用

A2 的 `walletPaymentModal` 分「紙鈔區」和「硬幣區」，視覺清晰。B6 Phase 2 付款目前為單一列表，可借鑑 A2 的分區設計：

```javascript
// B6 Phase 2 付款介面升級（設計規格）
function _renderB6PaymentUI(wallet) {
    const bills = wallet.filter(c => c.value >= 100);  // 紙鈔
    const coins = wallet.filter(c => c.value < 100);   // 硬幣
    return `
        <div class="b6-payment-section">
            <h4>💴 紙鈔</h4>
            ${bills.map(b => `<button class="b6-bill-btn" data-value="${b.value}">${b.value}元</button>`).join('')}
        </div>
        <div class="b6-payment-section">
            <h4>🪙 硬幣</h4>
            ${coins.map(c => `<button class="b6-coin-btn" data-value="${c.value}">${c.value}元</button>`).join('')}
        </div>
    `;
}
```

### 58.4 B6 vs A4 ClickMode 差異

| 特性 | B6（規格）| A4（已實作）|
|------|---------|----------|
| 商品選擇 | 跨攤位多選 | 單一商店內選 |
| 付款面額 | 按鈕點選 | 硬幣/鈔票拖入 |
| 找零 | 困難模式數字鍵盤 | 鈔票面額點選 |
| 防快速連點 | 需加 600ms 守衛（同 A4）| 已實作 |
| 實作成本評估 | 高（三段 × 跨攤位）| 已完成 |

---

## 五十九、F4/F5 計時器 + 差分計分 → B 系列遊戲化升級規格（2026-03-24）

> F4 數字排序有四段時間限制（無限制/300s/120s/60s）+ 差分計分（easy+10/normal+15/hard+20）。F5 量比較有每題倒計時 + 累積計分。B 系列目前只記錄正確題數，沒有計時壓力和差分計分，導致難度感較弱。

### 59.1 F4 差分計分機制（參考）

```javascript
// F4 實作（參考）
const SCORE_PER_CORRECT = { easy: 10, normal: 15, hard: 20 };
// 答對：state.score += SCORE_PER_CORRECT[state.difficulty];
// 完成畫面：顯示 totalScore、stars（≥90%→3星，≥70%→2星，≥50%→1星）
```

### 59.2 F5 計時器機制（參考）

```javascript
// F5 tick() 模式（2026-03-24 已歸檔為「setInterval→遞迴修正」案例）
function tick() {
    if (state.timeLeft <= 0) { handleTimeUp(); return; }
    state.timeLeft--;
    updateTimerDisplay();
    TimerManager.setTimeout(tick, 1000, 'timer');
}
```

### 59.3 B 系列差分計分導入規格

| 單元 | 現況計分 | 建議計分升級 | 說明 |
|------|---------|------------|------|
| B1 | +1/題 | easy+10 / normal+15 / hard+20 | 面額種類多 → 高分激勵 |
| B2 | +1/題 | easy+5 / normal+10 / hard+20 | easy 事件少，困難大額應有更高分 |
| B3 | correctCount | 週數差距計算：差1週+20 / 差0週+30 | 月曆模式另計：每天存對 +10 |
| B4 | +1/題 | Select+5 / Select+Diff+10→20 | 兩段完成才給高分 |
| B5 | correctCount | 剩餘預算百分比計分：剩 ≥30%→20分 / ≥10%→15分 / ≤10%→10分 | 引導精算 |
| B6 | correctCount | 三關完成計分：easy+10/normal+15/hard+20 | 困難找零答對額外+5 |

### 59.4 B 系列可選計時模式規格

參照 F4 的「有/無時間限制」設計，B 系列可加入可選計時：

```javascript
// B 系列設定頁（選填）
const B_TIME_OPTIONS = [
    { label: '無限制', value: 0 },      // 預設，適合教學
    { label: '60 秒/題', value: 60 },   // 挑戰模式（B4/B2 最適合）
    { label: '30 秒/題', value: 30 },   // 壓力模式（困難）
];
```

**設計原則（對照 F4）**：
- 預設不計時，不強迫學生有時間壓力（符合特殊需求學習者需求）
- 時間限制為加分選項，答對但超時 → 不計分，不扣分
- 語音讀題時間不計入計時（等語音結束後才開始倒數）

### 59.5 B 系列 vs F4/F5 遊戲化差距

| 特性 | B 系列（現況）| F4（已實作）| F5（已實作）|
|------|------------|-----------|-----------|
| 計分制度 | +1/題（無差分）| +10/15/20（依難度）| 累積分數 + 準確率 |
| 時間限制 | 無 | 4 段可選（0/300/120/60s）| 每題倒數 |
| 星級評等 | 百分比文字（優異/良好/努力）| 無（仍用文字）| 無 |
| 連答獎勵 | 無 | 無 | 無 |
| 建議優先度 | 差分計分（高）→ 可選計時（中）→ 連答獎勵（低）| — | — |

---

## 六十、A5 多狀態機交易設計 → B6 Phase 狀態精化（2026-03-24）

> A5 ATM 是 A 系列中狀態機設計最複雜的單元，支援三種交易類型（存款/提款/轉帳），每種類型有 3~5 個子步驟，使用 `getActualSessionType()` 統一路由。B6 三段式流程（Shopping→Payment→Change）可借鑑此架構精化狀態管理。

### 60.1 A5 狀態機關鍵模式（參考）

```javascript
// A5 核心：交易類型路由（參考概念）
function getActualSessionType() {
    if (state.isRandom) return state.randomBag.shift() || pickRandom(['deposit','withdraw','transfer']);
    return state.settings.sessionType; // 'deposit' | 'withdraw' | 'transfer'
}

// A5 步驟序列（存款為例）：
// INSERT_CARD → SELECT_MENU → ENTER_AMOUNT → CONFIRM → COMPLETE
```

**核心設計精神**：
- **交易類型 × 步驟** 形成二維矩陣，每格定義：`onEnter`、`validate`、`onSuccess`、`onError`
- `getActualSessionType()` 讓隨機任務和指定任務共用同一驗證邏輯
- 錯誤邊界：`if (!event.error) return`（防止非遊戲錯誤觸發回饋）

### 60.2 B6 Phase 狀態精化規格

B6 目前三段式流程用 if-else 控制，缺乏統一狀態驗證。借鑑 A5 設計：

```javascript
// B6 Phase 狀態機（設計規格）
const B6_PHASES = {
    SHOPPING: {
        validate: () => state.checkedItems.size === state.mission.items.length,
        onError:  () => Game.Speech.speak('購物清單還沒買完喔'),
        onSuccess: () => Game._goPhase('PAYMENT'),
    },
    PAYMENT: {
        validate: () => state.paid >= state.totalPrice,
        onError:  () => Game.Speech.speak(`還差 ${state.totalPrice - state.paid} 元`),
        onSuccess: () => state.change > 0 ? Game._goPhase('CHANGE') : Game._completeRound(),
    },
    CHANGE: {
        // 困難模式才啟用（changeVerify === true）
        validate: (input) => input === state.change,
        onError:  () => Game.Speech.speak('找零金額不對，再想想'),
        onSuccess: () => Game._completeRound(),
    },
};
```

### 60.3 A5 隨機任務機制 → B6 隨機清單設計

A5 的 `randomBag` 確保隨機任務不重複（每輪打散）。B6 可在「隨機關卡模式」下採用：

```javascript
// B6 隨機關卡（設計規格）
function _buildMissionBag(difficulty) {
    const missions = [...B6_MISSIONS[difficulty]];
    // Fisher-Yates shuffle
    for (let i = missions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [missions[i], missions[j]] = [missions[j], missions[i]];
    }
    return missions; // 打散後的任務列表，取用後不重複
}
```

### 60.4 B6 vs A5 狀態機複雜度比較

| 特性 | B6 | A5 |
|------|----|----|
| 交易類型數 | 1（採購）| 3（存/提/轉）|
| 子步驟數 | 3（Shopping/Payment/Change）| 3~5（依交易類型）|
| 隨機任務 | 無（可加）| 有（randomBag）|
| 錯誤邊界 | 基本 | 完整（event.error 守衛）|
| 狀態驗證 | 分散 if-else | 集中 getActualSessionType() |
| 實作成本 | 低（只需重構 3 個 Phase）| 已完成 |

---

## 六十一、F2 唱數動畫 → B3 月曆每日存款動畫升級（2026-03-24）

> F2 唱數採用「視覺數字 + 語音同步播報」的逐步動畫，每個數字在畫面出現時同步朗讀。B3 月曆模式的每日存款（拖入硬幣 → 撲滿增加）可借鑑此模式，加入逐枚計數動畫。

### 61.1 F2 唱數動畫核心機制（參考）

```javascript
// F2 概念：視覺 + 語音逐步同步（參考）
function playCountingAnimation(items, onDone) {
    let i = 0;
    function next() {
        if (i >= items.length) { onDone?.(); return; }
        showItem(items[i]);           // 視覺：顯示第 i 個物件
        Speech.speak(String(i + 1));  // 語音：朗讀數量
        TimerManager.setTimeout(next, 800, 'counting');
        i++;
    }
    next();
}
```

### 61.2 B3 月曆存款動畫升級規格

當學生拖入硬幣至撲滿時，可加入「逐枚計數動畫」：

```javascript
// B3 存款動畫規格（設計）
function _animateCoinDeposit(coins, targetTotal) {
    let running = 0;
    coins.forEach((coin, idx) => {
        Game.TimerManager.setTimeout(() => {
            running += coin.value;
            // 1. 硬幣飛入撲滿動畫（translateY + scale）
            _spawnCoinFlyAnimation(coin);
            // 2. 語音同步：朗讀當前累計金額
            if (idx === coins.length - 1) {
                Game.Speech.speak(`存入${toTWD(running)}，共存了${toTWD(state.calendar.totalSaved)}`);
            } else {
                Game.Speech.speak(toTWD(coin.value));  // 逐枚念面額
            }
            // 3. 進度條即時更新
            _updateProgressBar(running / state.targetAmount);
        }, idx * 600, 'coinDeposit');
    });
}
```

**教學意義**（對照 F2 唱數）：

| F2 唱數 | B3 存款動畫 |
|---------|-----------|
| 每個物件出現時朗讀序數（1,2,3…）| 每枚硬幣飛入時朗讀面額（5元,10元…）|
| 訓練數量感知 | 訓練面額加總感知 |
| 純數學（抽象）| 金錢場景（具象）|
| 速率：約 800ms/個 | 建議：600ms/枚（需感知但不冗長）|

### 61.3 B3 vs F2 動畫系統比較

| 特性 | B3（現況）| F2 |
|------|---------|-----|
| 存款動畫 | 金幣飛入（`_spawnCoinParticles`，批次）| 逐步計數（800ms/個）|
| 語音配合 | 完成後統一播報 | 每步同步朗讀 |
| 建議升級 | 改為逐枚 600ms 飛入 + 即時語音 | — |
| 複雜度 | 現況：批次渲染（低成本）| F2：逐步遞迴（TimerManager 遞迴）|

---

## 六十二、C2 逐項點擊計數 → B2 普通模式累算輔助具體規格（2026-03-24）

> C2 數錢有「逐一點擊計數」模式：學生點擊每枚錢幣，系統累加並即時顯示當前金額。B2 §五十六已提出此概念，本節定義具體 UI 與互動規格。

### 62.1 C2 點擊計數機制（參考）

```javascript
// C2 普通模式：點擊計數（參考概念）
coinEl.addEventListener('click', () => {
    state.count += coin.value;
    updateDisplay(state.count);
    Speech.speak(toTWD(state.count)); // 點一次念一次當前總計
    coin.classList.add('counted');    // 已計入標記
});
```

### 62.2 B2 普通模式「逐項點擊」子模式規格

在現有普通模式基礎上，新增可選的「點擊輔助」開關：

```javascript
// B2 普通模式點擊輔助（設計規格）
function _enableClickAccumulate() {
    document.querySelectorAll('.b2-event-row').forEach(row => {
        row.style.cursor = 'pointer';
        row.addEventListener('click', () => {
            if (row.classList.contains('b2-row-counted')) return; // 防重複
            const amount = parseInt(row.dataset.amount);
            const type   = row.dataset.type; // 'income' | 'expense'
            state.runningBalance += type === 'income' ? amount : -amount;
            row.classList.add('b2-row-counted'); // 淡化已計入
            _updateRunningBalanceDisplay(state.runningBalance);
            Game.Speech.speak(
                type === 'income'
                    ? `加${toTWD(amount)}，現在有${toTWD(state.runningBalance)}`
                    : `減${toTWD(amount)}，現在有${toTWD(state.runningBalance)}`
            );
        }, {}, 'clickAccumulate');
    });
}
```

**UI 設計**：
- 每列事件卡初始為未計入（正常顯示）
- 點擊後：綠色 ✓ 標記（收入）或紅色 ✓（支出）+ 列淡化
- 右上角常駐「目前餘額：X 元」（`.b2-running-total`）
- 所有列點完後：自動填入數字鍵盤並提示「確認答案」

### 62.3 B2 點擊輔助 vs C2 點擊計數差異

| 特性 | B2 點擊輔助（規格）| C2 點擊計數 |
|------|----------------|-----------|
| 計入單位 | 事件列（有正負）| 錢幣（純加法）|
| 語音 | 「加/減 X 元，現在有 Y 元」| 「X 元」（累計）|
| 防重複 | `.b2-row-counted` 類別 | `.counted` 類別 |
| 最終確認 | 自動填入 + 提示確認 | 顯示總計 |
| 建議啟動方式 | 設定頁「輔助模式」開關（不強制）| 普通模式預設行為 |

### 62.4 B2 點擊輔助啟動規格

```html
<!-- B2 設定頁新增「學習輔助」選項 -->
<div class="b-setting-group" id="b2-assist-group">
    <label class="b-setting-label">學習輔助</label>
    <div class="b-btn-group">
        <button class="b-sel-btn" data-type="assistMode" data-value="none">直接作答</button>
        <button class="b-sel-btn" data-type="assistMode" data-value="click">點擊累算</button>
    </div>
</div>
```

> **建議**：「點擊累算」適合普通模式，困難模式因事件數較多（6筆），點擊輔助會降低挑戰性，建議困難模式不顯示此選項（或顯示但標記「[簡化難度]」）。

---

## 六十三、A6 火車票找零面額分解 → B6 困難模式找零展示升級（2026-03-24）

> A6 找零系統以**最優面額分解**（greedy decomposition）展示找零硬幣/紙鈔序列，並逐一動畫呈現。B6 困難模式目前僅驗證總金額，可參照 A6 升級為「視覺化找零展示」，強化找零教學效果。

### 63.1 A6 找零系統關鍵機制（參考）

A6 困難模式流程：
1. `calculateOptimalChange(changeAmount)` — 貪婪分解找零金額為最少面額組合
2. `executeNextChange()` — 逐一展示每張/枚找零，每次配合語音（「找你 10 元」）
3. 學生從接受槽拖曳找零圖示至確認區（`ChangeConfirm`）
4. 全部確認後呼叫 `validatePayment()` — 核對金額正確

```javascript
// A6 找零面額分解（參考）
function calculateOptimalChange(changeAmount) {
    const denoms = [1000, 500, 100, 50, 10, 5, 1];
    const result = [];
    let remaining = changeAmount;
    for (const d of denoms) {
        while (remaining >= d) {
            result.push(d);
            remaining -= d;
        }
    }
    return result; // 例：找零 35 元 → [10, 10, 10, 5]
}
```

### 63.2 B6 困難模式找零升級規格

**現狀**：B6 困難模式學生輸入付款金額後，系統驗證是否等於「最佳付款」，無找零教學環節。

**升級方向**：付款驗證通過後，新增「看找零」教學步驟。

```
[學生付款] → 驗證通過
    ↓
[Phase: showChange]
    ├── 語音：「你付了 {paid} 元，找你 {change} 元」
    ├── 逐一展示找零圖示（每 600ms 一張）
    ├── 每張語音：「{denom} 元」（A6 同步模式）
    └── 全部展示完 → 「✓ 完成購物」→ 進下一攤
```

**核心函數規格**：

```javascript
// B6 困難模式找零動畫展示（設計規格）
function _showChangeAnimation(changeAmount, callback) {
    const denoms = _decomposeChange(changeAmount);
    const container = document.querySelector('.b6-change-display');
    let i = 0;
    function showNext() {
        if (i >= denoms.length) { callback(); return; }
        const d = denoms[i++];
        const img = `<img src="../images/money/${_moneyFile(d)}"
                         style="width:64px;animation:b6CoinAppear 0.3s ease">`;
        container.insertAdjacentHTML('beforeend', img);
        Game.Speech.speak(toTWD(d), showNext);
    }
    showNext();
}
```

### 63.3 B6 vs A6 找零設計差異

| 特性 | B6 升級規格 | A6 找零（現有）|
|------|-----------|--------------|
| 呈現方式 | 純展示（不需拖曳）| 拖曳至確認區 |
| 互動要求 | 無需操作，自動展示 | 需逐一拖曳確認 |
| 教學目標 | 讓學生「看見找零結果」| 讓學生「操作找零過程」|
| 適合年齡 | 較低（B 系列定位）| 較高（A 系列）|
| 語音同步 | 展示每張時念面額 | 同 B6 規格 |

> **實作建議**：B6 困難模式新增 `b6-change-display` 區塊，在 `_startChangeVerify()` 完成後觸發；動畫 CSS `@keyframes b6CoinAppear` 對應 A6 的 `changeCoinAppear`。

---

## 六十四、C3 換錢多輪設計 → B3 月曆模式存錢里程碑深化（2026-03-24）

> C3 換錢設計了**多輪累進**機制：每完成一次換錢即算一輪，難度遞增（換的總金額越來越大）。B3 月曆模式可參照此概念，新增「存錢里程碑」系統，在達到 25%/50%/75%/100% 時給予特別回饋。

### 64.1 C3 多輪累進機制（參考）

```javascript
// C3 換錢多輪（參考概念）
const MoneyExchange3 = {
    ModeStrategies: {
        normal: {
            totalExchanges: 1,         // 普通：固定 1 輪
            handleCompletion(round) {
                if (round >= this.totalExchanges) Game.endGame();
                else Game.nextRound();
            }
        },
        hard: {
            totalExchanges: 3,         // 困難：3 輪，金額遞增
            amounts: [50, 100, 200],
        }
    }
};
```

**教學邏輯**：C3 困難模式連換 3 次，金額從小到大（50→100→200），避免單次大量換錢的認知負擔，改為分段累進。

### 64.2 B3 月曆模式里程碑規格

在現有月曆存錢流程中，新增**進度里程碑事件**：

| 里程碑 | 觸發條件 | 回饋設計 |
|--------|---------|---------|
| 25% 達標 | `savedAmount >= price * 0.25` | 語音「存了四分之一了！繼續加油」+ 撲滿輕震動 |
| 50% 達標 | `savedAmount >= price * 0.5`  | 語音「一半了！你快到囉」+ 金幣雨動畫（5 枚）|
| 75% 達標 | `savedAmount >= price * 0.75` | 語音「快到了！還差 X 元」+ 撲滿亮起 |
| 100% 達標 | `savedAmount >= price`        | 語音「存夠了！太棒了！」+ 煙火動畫（現有）|

**核心實作規格**：

```javascript
// B3 里程碑偵測（設計規格）
const MILESTONES = [0.25, 0.5, 0.75, 1.0];

function _checkMilestones(prevAmount, newAmount, price) {
    for (const pct of MILESTONES) {
        const target = Math.floor(price * pct);
        if (prevAmount < target && newAmount >= target) {
            _triggerMilestone(pct, price - newAmount);
            return; // 每次只觸發一個里程碑
        }
    }
}

function _triggerMilestone(pct, remaining) {
    const msgs = {
        0.25: '存了四分之一了！繼續加油！',
        0.5:  `一半了！還差${toTWD(remaining)}就到了！`,
        0.75: `快到了！還差${toTWD(remaining)}元！`,
        1.0:  '存夠了！太棒了！你做到了！',
    };
    Game.audio.play('correct');
    Game.Speech.speak(msgs[pct]);
    _animatePiggyMilestone(pct); // 0.5 觸發金幣雨
}
```

### 64.3 B3 里程碑 vs C3 多輪機制比較

| 特性 | B3 里程碑（規格）| C3 多輪換錢 |
|------|----------------|-----------|
| 觸發點 | 金額百分比（25/50/75/100%）| 完成一次換錢 |
| 累進邏輯 | 儲蓄金額自然累積 | 明確題數輪次 |
| 回饋強度 | 依里程碑加強（50%最強）| 每輪相同強度 |
| 教學目標 | 習慣養成、目標感 | 換算練習密度 |
| 實作位置 | `_completeDragSession()` 後呼叫 | `handleCompletion()` |

> **整合建議**：里程碑偵測加入 `_completeDragSession()` 最後、更新撲滿之前，避免視覺衝突；50% 里程碑的「金幣雨」複用 `_spawnCoinParticles()`（現有）。

---

## 六十五、A1 coinFirst 解鎖機制 → B5/B6 解鎖流程設計（2026-03-24）

> A1 coinFirst 模式在學生投入足夠金額後，才「解鎖」可選飲料（`.coin-first-locked` → `.coin-first-available`）。B5 的必買商品和 B6 的攤位解鎖，可參照此機制，設計「前置條件達成後才解鎖後續選項」的教學流程。

### 65.1 A1 coinFirst 解鎖機制（參考）

```javascript
// A1 coinFirst 解鎖流程（參考）
function updateDrinkAvailabilityByCoinAmount(insertedAmount) {
    document.querySelectorAll('.drink-card').forEach(card => {
        const price = parseInt(card.dataset.price);
        if (insertedAmount >= price) {
            card.classList.remove('coin-first-locked');
            card.classList.add('coin-first-available');
            // 指示燈亮起（紅色 → 綠色動畫）
            card.querySelector('.indicator-light').classList.add('active');
        }
    });
}
```

**教學邏輯**：學生必須先完成「投幣」動作，選購選項才會解鎖；避免學生未建立「先有錢才能買」的正確觀念就直接操作。

### 65.2 B5 必買確認解鎖規格

**應用場景**：B5 開始時，強化「必買概念」：選購商品初始**鎖定**，學生先「確認」兩件必買商品後，才解鎖選購商品。

```
[關卡開始]
    ├── 必買商品：已勾選 + 金色邊框（強調）
    ├── 選購商品：初始鎖定（灰色 + 🔒 + 無法點擊）
    └── 語音：「先確認必買的蛋糕和飲料！」
         ↓
[學生點擊「確認必買」按鈕]
    ├── 播放解鎖動畫（🔒 → ✓，灰色→彩色，0.3s ease-in）
    ├── 語音：「很好！現在來選其他的派對用品！」
    └── 選購商品解鎖，可正常點擊
```

**CSS 規格（參照 A1 coinFirst）**：

```css
/* B5 選購商品鎖定狀態 */
.b5-item-card.b5-locked {
    opacity: 0.45;
    filter: grayscale(0.6);
    pointer-events: none;
    position: relative;
}
.b5-item-card.b5-locked::after {
    content: '🔒';
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
}
/* 解鎖動畫 */
.b5-item-card.b5-unlocking {
    animation: b5UnlockPop 0.3s ease-in forwards;
}
@keyframes b5UnlockPop {
    0%   { opacity: 0.45; transform: scale(0.95); }
    60%  { opacity: 1;    transform: scale(1.08); }
    100% { opacity: 1;    transform: scale(1); }
}
```

### 65.3 B6 攤位漸進解鎖規格

**應用場景**：B6 困難模式中，攤位依序解鎖（完成前一攤才能進下一攤），強化「逐步採購、計算剩餘預算」的教學邏輯。

```
[B6 困難模式攤位序列]
    攤位 1：開放 ✅
    攤位 2：鎖定 🔒（需完成攤位 1 後解鎖）
    攤位 3：鎖定 🔒（需完成攤位 2 後解鎖）
    ……依此類推
```

**核心邏輯規格**：

```javascript
// B6 攤位解鎖（設計規格）
function _unlockNextStall(completedIndex) {
    const nextIndex = completedIndex + 1;
    const stallEl = document.querySelector(`[data-stall-index="${nextIndex}"]`);
    if (!stallEl) return; // 已是最後一攤
    stallEl.classList.remove('b6-stall-locked');
    stallEl.classList.add('b6-stall-unlocking');
    Game.Speech.speak(`第${nextIndex + 1}個攤位開放了！`);
    Game.TimerManager.setTimeout(() => {
        stallEl.classList.remove('b6-stall-unlocking');
        stallEl.classList.add('b6-stall-available');
    }, 500, 'stallUnlock');
}
```

### 65.4 A1 coinFirst → B5/B6 解鎖機制對照表

| 特性 | A1 coinFirst | B5 必買解鎖（規格）| B6 攤位解鎖（規格）|
|------|-------------|-------------------|-------------------|
| 解鎖觸發 | 投幣金額達飲料價格 | 點擊「確認必買」按鈕 | 完成當前攤位 |
| 解鎖目標 | 個別飲料卡片 | 全部選購商品 | 下一個攤位 |
| 鎖定視覺 | `coin-first-locked`（灰暗）| `b5-locked`（灰色+🔒）| `b6-stall-locked`（灰色）|
| 解鎖動畫 | 指示燈亮起 + 邊框 | Pop 彈出（scale 1.08）| 滑入開放 |
| 教學意義 | 先有錢再買 | 先確認必要支出 | 逐步採購不跳題 |
| 語音引導 | 「X 元的 Y 可以購買了！」| 「很好！現在來選其他的！」| 「第 N 攤開放了！」|

> **實作優先度**：B5 必買解鎖（高）可大幅強化必買概念教學，僅需在 `renderRound()` 初始化時加入鎖定狀態，並新增「確認必買」按鈕。B6 攤位解鎖（中）對現有流程改動較大，建議作為困難模式選項。

