# C5 夠不夠 — 單元開發經驗報告書

> **日期**：2026-02-09
> **時間**：下午
> **更新日期**：2026-03-27（錢不夠差額金錢圖示 + 面額預設按鈕 + 預設連動 + 困難模式提示語音）、2026-03-14（輔助點擊彈窗偵測修復 + 設定頁說明更新）
> **單元名稱**：C5 夠不夠（Sufficient Payment）
> **系列**：C 貨幣認知

---

## 一、基本資訊

### 檔案清單

| 類型 | 檔案路徑 | 說明 |
|------|---------|------|
| HTML | `html/c5_sufficient_payment.html` | 主頁面（83 行，含點擊放置 CSS） |
| JS | `js/c5_sufficient_payment.js` | 主邏輯（6,271 行） |
| CSS | `css/unit6.css`、`css/ai-theme.css`、`css/dark-theme.css`、`css/common-modal-responsive.css` | 共用樣式 |
| 作業單 | `worksheet/units/c5-worksheet.js` | 作業單產生器（277 行） |
| 共用工具 | `js/number-speech-utils.js`、`js/audio-unlocker.js`、`js/reward-launcher.js`、`js/theme-system.js`、`js/mobile-debug-panel.js`、`js/touch-drag-utility.js` | 各項支援模組 |
| 圖片 | `images/money/*_yuan_front.png`、`*_yuan_back.png` | 7 種面額正反面共 14 張 |
| 音效 | `audio/drop-sound.mp3`、`audio/error.mp3`、`audio/error02.mp3`、`audio/correct02.mp3`、`audio/success.mp3`、`audio/click.mp3` | 放置/錯誤/錯誤02/答對/完成/點擊音效 |

### 外部依賴

- **canvas-confetti** (`cdn.jsdelivr.net/npm/canvas-confetti@1.9.2`)：完成畫面煙火動畫
- **TouchDragUtility** (`js/touch-drag-utility.js?v=2.1`)：行動裝置觸控拖曳支援
- **NumberSpeechUtils** (`js/number-speech-utils.js`)：中文貨幣語音轉換

---

## 二、單元特色

### 2.1 核心玩法：判斷「夠不夠買」

C5 的核心學習目標是理解「足額付款」概念。每一題會展示：
- **商品**：帶有 emoji、名稱和價格標籤的物品
- **我的錢包**：一組可拖曳的錢幣/紙鈔

學生需要將所有錢幣拖曳到「兌換區」，然後判斷自己的錢是否足以購買該商品。不同於 C4（湊出正確金額），C5 的金錢數量是系統固定的，學生要做的是「比較」而非「組合」。

### 2.2 三種難度模式（完全分離渲染）

| 特性 | 簡單 | 普通 | 困難 |
|------|------|------|------|
| 拖曳操作 | 必須全部拖入兌換區 | 必須全部拖入兌換區 | 必須全部拖入兌換區 |
| 語音回饋 | 每次拖入播報累計金額 | 每次拖入播報累計金額 | 無語音，僅播放選擇音效 |
| 目前總額 | 即時顯示 | 初始隱藏（`???`），需按「💡 提示」3 秒後自動隱藏 | 初始隱藏（`？？？`），需按「💡 提示」3 秒後自動隱藏 |
| 判斷方式 | 全部放入後自動判斷 | 全部放入後顯示「夠/不夠」按鈕，手動判斷 | 全部放入後顯示「夠/不夠」按鈕，手動判斷 |
| 提示按鈕 | 無（有即時總額） | 有（顯示 3 秒後隱藏） | 有（顯示 3 秒後隱藏） |
| 答錯處理 | 不存在（自動判斷必正確） | 反覆作答 / 單次作答 | 反覆作答 / 單次作答 |
| 測驗模式 | 不適用（自動完成） | repeated / single | repeated / single |
| CSS 前綴 | `unit5-easy-*` | `unit5-normal-*` | `unit5-hard-*` |

### 2.3 配置驅動價格生成系統（ModeConfig + PriceStrategy）

C5 獨有的**增強型價格生成策略**系統，是所有 C 系列中最複雜的價格機制：

**ModeConfig 三級配置**：
| 配置項 | 簡單 | 普通 | 困難 |
|--------|------|------|------|
| 策略 | `favor_center`（偏好中心） | `balanced_range`（平衡範圍） | `expand_range`（擴展範圍） |
| 擴展因子 | 5% | 10% | 15% |
| 中心偏好 | 70% | 50% | 30% |
| 邊緣機率 | — | 20% | 40% |
| 極端機率 | — | — | 10% |
| 捨入規則 | nearest1 | nearest1 | irregular（不規則） |
| 語音模板 | 完整提示 | 標準提示 | 精簡提示 |
| 延遲配置 | 500/800ms | 300/600ms | 200/400ms |

**PriceStrategy 確定性隨機**：使用 `seededRandom(seed)` 基於 `Math.sin(seed)` 的確定性隨機數產生器，確保同一 session 內同一商品的價格保持一致。種子由 `sessionSeed + rangeSum + itemId + difficulty` 計算。

### 2.4 豐富的物品資料庫（48+ 個物品）

按 4 個位數層級嚴格分類，每個層級 3-4 種類型，每種類型 3 個物品：

| 位數 | 價格範圍 | 物品類型 | 物品範例 |
|------|---------|---------|---------|
| 1 位數 | 1-9 元 | 糖果、貼紙、橡皮擦 | 🍭 棒棒糖 [2-8]、⭐ star 貼紙 [1-6] |
| 2 位數 | 10-99 元 | 零食、筆、筆記本、水果 | 🍪 餅乾 [15-85]、✏️ 原子筆 [10-60] |
| 3 位數 | 100-999 元 | 玩具、書籍、便當、文具組 | 🚗 玩具車 [120-850]、📚 故事書 [100-400] |
| 4 位數 | 1000-9999 元 | 電子產品、衣物、運動用品、遊戲 | 📱 手機 [3000-9000]、🎮 遊戲機 [3000-9000] |
| 自訂 | 1-9999 元 | 神秘禮物、寶物、魔法物品 | 🎁 神秘禮物 [1-9999] |

### 2.5 自訂金額模式

C5 支援「自訂金額」模式，與 C4 不同的是：
- **固定錢包金額**：自訂金額是「我的錢」的固定金額，非商品價格
- **變化幣值組合**：使用 `findAllCombinations()` 回溯搜索所有可能的幣值組合，每題隨機選擇一種
- **獨立商品價格**：由 `generateItemPriceForCustomAmount()` 根據策略（sufficient/insufficient）獨立生成
- **自動面額選擇**：選擇自訂金額後，系統自動篩選 ≤ 金額的所有面額
- **隱藏面額選擇區**：自訂金額模式下隱藏面額設定群組

### 2.6 面額優先題目生成邏輯

C5 的題目生成採用**面額優先**流程（不同於 C4 的物品優先）：

```
位數篩選物品 → 面額生成金額 → 策略決定價格 → 先選物品 → 生成我的金錢
```

具體步驟：
1. **位數篩選**：嚴格對應位數的物品類型（不向下相容）
2. **面額計算**：DP 算法計算 30 硬幣限制下的所有可組合金額
3. **策略選擇**：50%/50% 機率分配 sufficient/insufficient（困難模式 70%/30%）
4. **物品選擇**：先隨機選物品，再根據策略在物品價格範圍內配合金額
5. **金錢生成**：`generateMoneyByAmount()` 用貪婪算法生成幣值組合

### 2.7 設定頁面（8 個設定群組）

| # | 設定群組 | 選項 |
|---|---------|------|
| 1 | 🎯 選擇難度 | 簡單 / 普通 / 困難（含說明文字） |
| 2 | 🔢 我的錢包的金額位數 | 1 位 / 2 位 / 3 位 / 4 位 / 自訂金額 |
| 3 | 💰 面額選擇 | 硬幣(1/5/10/50) + 紙鈔(100/500/1000)，多選 |
| 4 | 🛍️ 物品類型選擇 | 按位數分組顯示，含相容性檢測標記，多選 |
| 5 | 🎲 題目設定 | 1 / 3 / 5 / 10 / 自訂(1-100) |
| 6 | 🎮 模式選擇 | 反覆作答 / 單次作答（簡單模式禁用） |
| 7 | 🎁 獎勵系統 | 開啟獎勵系統連結 |
| 8 | 📝 作業單 | 產生作業單連結 |

### 2.8 智能相容性檢測系統

C5 獨有的**物品-面額相容性檢測**機制：
- **30 硬幣購買力檢查**：`30 × maxDenomination < digitRangeMin` 時標記不相容
- **面額金額重疊檢查**：物品價格範圍是否與可組合金額有交集
- **不相容視覺回饋**：按鈕標記為紅色背景 + ❌ 圖示 + tooltip 提示
- **緩存系統**：`compatibilityCache` 避免重複 DP 計算，切換位數/面額時清除

---

## 三、技術重點

### 3.1 架構設計

```
DOMContentLoaded
  └─ let Game = { ... }    // 全域物件
       ├─ Debug             // 統一日誌系統（14 類別 FLAGS 開關 + 手機觸控除錯）
       ├─ state             // 狀態管理（settings, gameState, quiz, clickState）
       ├─ audio             // 音效系統（7 個音效物件）
       ├─ speech            // 語音系統（Web Speech API）
       ├─ ModeConfig        // 配置驅動系統（3 級難度配置）
       ├─ PriceStrategy     // 增強型價格策略（seeded random）
       ├─ gameData          // 遊戲資料庫（purchaseItems + allItems）
       ├─ 設定系統           // showSettings, bindSettingEvents, handleSelection
       ├─ 相容性系統         // checkItemCompatibility, generatePossibleAmounts (DP)
       ├─ 題目生成           // generateQuestion (面額優先), generateCustomAmountQuestion
       ├─ 渲染系統           // renderEasyMode / renderNormalMode / renderHardMode
       ├─ 事件系統           // setupDragAndDrop, setupTouchDragSupport, setupClickEventListeners
       ├─ 判斷系統           // handleJudgment, checkEasyModeAutoJudgment
       ├─ CSS 系統           // getCommonCSS + getEasyModeCSS + getNormalModeCSS + getHardModeCSS
       └─ 結果系統           // showResults, displayResultsWindow, speakResults
```

### 3.2 狀態管理

```javascript
state: {
    settings: {
        digits: null,           // 位數（1-4 或 'custom'）
        customAmount: 0,        // 自訂金額
        denominations: [],      // 面額陣列
        difficulty: null,       // easy / normal / hard
        mode: null,             // repeated / single
        itemTypes: [],          // 物品類型陣列
        questionCount: null     // 題數
    },
    gameState: {
        question: null,         // 當前題目物件
        currentTotal: 0,        // 兌換區目前總額
        questionAnswered: false, // 是否已作答
        correctAnswer: null,    // 正確答案（普通/困難模式）
        audioPlayed: false      // 防止重複播放音效
    },
    quiz: {
        currentQuestion: 0,
        totalQuestions: 10,
        score: 0,               // 分數（每題 10 分）
        questions: [],
        startTime: null,
        attempts: 0
    },
    loadingQuestion: false,
    compatibilityCache: {}      // 相容性緩存
}
```

### 3.3 題目物件結構

```javascript
{
    item: {                     // 商品資訊
        id: 'snack_cookie',
        name: '餅乾',
        emoji: '🍪',
        image: '../images/items/snack_cookie.png',
        priceRange: [15, 85],
        price: 42               // 由策略系統生成的實際價格
    },
    itemPrice: 42,              // 商品價格
    myMoney: [                  // 我的金錢陣列
        { id: 'money-xxx', value: 10, image: '10_yuan_front.png' },
        { id: 'money-yyy', value: 50, image: '50_yuan_back.png' }
    ],
    totalMoney: 60,             // 金錢總額
    isAffordable: true          // 是否買得起
}
```

### 3.4 多重動態規劃算法

C5 內含多種 DP 和搜索算法：

| 函數 | 算法 | 用途 | 時間複雜度 |
|------|------|------|-----------|
| `checkCustomAmountCompatibility()` | 標準 coin change (boolean) | 自訂金額可行性 | O(n×amount) |
| `generatePossibleAmounts()` | coin change + Uint16Array | 計算 30 硬幣內所有可組合金額 | O(n×maxAmount) |
| `canMakeAmount()` | coin change (min coins) | 指定硬幣數限制下可行性 | O(n×amount) |
| `findAllCombinations()` | 回溯搜索 | 列舉所有幣值組合（≤30 硬幣） | 指數級（有 30 硬幣剪枝） |
| `generateMoneyByAmount()` | 貪婪（先多樣化再大面額） | 生成實際幣值組合 | O(n×k) |

### 3.5 防重複題目機制

`isDuplicateQuestion()` 檢查最近 2 題，判斷為重複的條件：
- 物品名稱 **且** 價格相同
- **或** 總金額 **且** 夠/不夠狀態相同

生成時最多重試 50 次避免連續重複。

### 3.6 系統監控

`startSystemMonitoring()` 建立了完整的運行時監控：
- **記憶體監控**：每 30 秒記錄 `performance.memory` 使用量
- **全域錯誤捕獲**：`window.addEventListener('error', ...)`
- **未處理 Promise 拒絕**：`window.addEventListener('unhandledrejection', ...)`

---

## 四、語音系統

### 4.1 語音選擇策略

```
優先順序：
1. Microsoft HsiaoChen Online
2. Google 國語 (臺灣)
3. 其他 zh-TW 語音（排除 Hanhan）
4. 任何 zh-TW 語音
5. 瀏覽器預設語音（備用方案）
```

### 4.2 speech 物件內建

C5 的語音系統完全定義在 `speech` 物件內部，包含：
- `init()`：初始化 + 1 秒超時重試
- `speak(text, options)`：支援 `interrupt`（是否中斷）和 `callback`（結束回呼）
- `convertToTraditionalCurrency(amount)`：委派至 `NumberSpeechUtils`

### 4.3 speak() 安全機制

```javascript
speak(text, { interrupt = true, callback = null }) {
    // 1. 非中斷模式 + 正在播放 → 忽略
    // 2. 系統未就緒 → 重新初始化 + 100ms 延遲重試
    // 3. 重試後仍失敗 → 執行 callback（防止流程卡住）
    // 4. interrupt=true → 先 cancel() 再播放
}
```

### 4.4 各模式語音使用場景

| 場景 | 簡單 | 普通 | 困難 |
|------|------|------|------|
| 指令彈窗 | ✅「算一算，你的錢夠不夠買{物品名}」 | ✅「想一想，你的錢夠不夠買{物品名}，它要{價格}元」 | ✅ 同普通 |
| 拖入金錢 | ✅ 300ms 延遲播報「目前總額{N}元」(interrupt:false) | ✅ 即時播報「目前總額{N}元」(interrupt:true) | ❌ 僅音效 |
| 提示按鈕 | — | ✅「目前總額是{傳統中文金額}」 | ❌ 僅音效 |
| 判斷結果 | ✅ 自動判斷語音（含物品名和金額） | ✅ 手動判斷語音 | ✅ 手動判斷語音 |
| 完成畫面 | ✅「恭喜你完成全部測驗，答對{N}題，{表現評語}」 | ✅ 同左 | ✅ 同左 |
| 設定警告 | ✅ 設定衝突語音提示 | ✅ 同左 | ✅ 同左 |

### 4.5 NumberSpeechUtils 使用

- `speech.convertToTraditionalCurrency(amount)` → 委派至 `NumberSpeechUtils.convertToTraditionalCurrency(amount)`
- 用於提示按鈕的金額播報（將數字轉換為傳統中文貨幣讀法）

---

## 五、觸控與桌面支援

### 5.1 三種互動方式

| 方式 | 實現 | 適用場景 |
|------|------|---------|
| HTML5 Drag & Drop | `dragstart`/`dragover`/`dragleave`/`drop`/`dragend` | 桌面瀏覽器 |
| TouchDragUtility | `registerDraggable()` + `registerDropZone()` | 行動裝置觸控 |
| 雙擊放置 | `clickState` 管理 + 500ms `doubleClickDelay` | 桌面/觸控通用 |

### 5.2 拖曳預覽圖片

桌面拖曳時創建 1.2 倍大的去背圖片作為拖曳預覽：
```javascript
const dragImg = img.cloneNode(true);
dragImg.style.width = img.offsetWidth * 1.2 + 'px';
e.dataTransfer.setDragImage(dragImg, dragImg.offsetWidth / 2, dragImg.offsetHeight / 2);
setTimeout(() => dragImg.remove(), 0);
```

### 5.3 觸控拖曳設置

- **延遲註冊**：`setupDragAndDrop()` 使用 100ms setTimeout 確保 DOM 就緒
- **二次嘗試**：若金錢元素未載入，額外延遲 200ms 再試
- **合成事件**：TouchDragUtility 的 `onDrop` 回呼中建構 `syntheticDropEvent` 物件

### 5.4 點擊放置系統

```
第一次點擊 → selectItem()（綠色邊框 + 放大 1.05）
第二次點擊（500ms 內）→ executeClickPlacement()（雙擊放置到兌換區）
在兌換區點擊 → handleClickToReturn()（取回到源區域，按面額排序插入）
```

### 5.5 CSS 觸控優化（HTML 內嵌）

```css
.money-item.selected-item {
    border: 3px solid #4CAF50;
    box-shadow: 0 0 15px rgba(76, 175, 80, 0.6);
    transform: scale(1.05);
    z-index: 10;
    background: rgba(76, 175, 80, 0.1);
}
```

### 5.6 AudioUnlocker 整合

設定頁面的 `handleSelection()` 中觸發 `window.AudioUnlocker.unlock()`，確保行動裝置首次互動後解鎖音頻播放。

---

## 六、版面設計

### 6.1 三階段畫面流程

```
設定頁面 → 遊戲頁面（簡單/普通/困難） → 完成頁面
   ↑           ↓ (返回設定)                    ↓
   └───────────┘                               └→ 再玩一次（回遊戲）
                                               └→ 返回設定（回設定，重新init）
```

### 6.2 設定頁面

- 標題：「單元C5：足額付款」
- 說明文字：「理解足額付款的概念，了解付出的金錢大於或等於商品價格」
- 8 個設定群組垂直排列
- 物品類型按位數分組顯示（含相容性標記）
- 自訂金額彈出數字鍵盤
- 難度說明文字動態更新
- 簡單模式自動禁用模式選擇

### 6.3 遊戲頁面

共同結構：
```
┌──────────────────────────────────────┐
│ 標題列：題號 | 單元C5：足額付款 | 🎁獎勵 返回設定 │
├──────────────────────────────────────┤
│ 🛒 兌換區           [💡 提示]       │
│ [emoji] 物品名 價格元                │
│ 目前總額: ??? 元                     │
│ ┌────────────────────────────┐      │
│ │  拖曳放置區（虛線邊框）      │      │
│ └────────────────────────────┘      │
│ [❌錢不夠] [💰錢夠] (普通/困難)      │
├──────────────────────────────────────┤
│ 我的錢包                             │
│ [1元][5元][10元][50元][100元]...     │
└──────────────────────────────────────┘
```

**各模式差異**：
- **簡單**：總額即時顯示，無判斷按鈕，全部放入後自動判斷
- **普通**：總額隱藏（`???`），有提示按鈕（3 秒顯示），全部放入後出現判斷按鈕
- **困難**：總額隱藏（`？？？`），有提示按鈕（3 秒顯示），全部放入後出現判斷按鈕，無語音

### 6.4 指令彈窗

每題載入後顯示全螢幕彈窗：
- 深色漸層背景 (`#34495e → #2c3e50`)
- 金色標題「購買的物品」
- 商品 emoji + 名稱 + 價格
- 語音播報完畢後自動關閉（300ms 淡出）

### 6.5 完成頁面

採用統一 C/F 系列樣式：
- 紫色漸層背景 (`#667eea → #764ba2`)
- 表現徽章（≥90% 🏆 / ≥70% 👍 / ≥50% 💪 / <50% 📚）
- 三統計卡（答對題數、正確率、完成時間）
- 粉紅色獎勵系統按鈕
- 綠色「再玩一次」+ 紫色「返回設定」
- confetti 煙火動畫 + success 音效

### 6.6 響應式設計

- 完成頁面：`@media (max-width: 600px)` 統計卡改為單欄
- 普通/困難模式：`@media (max-width: 768px)` 總額顯示縮小
- 所有金錢容器 `flex-wrap: wrap` 自適應排列

---

## 七、注意事項

### 7.1 簡單模式不需要選擇測驗模式

簡單模式自動完成，`isSettingsComplete()` 和 `checkStartState()` 中皆有特殊判斷：
```javascript
const modeRequired = difficulty !== 'easy';
const modeValid = modeRequired ? mode : true;
```

### 7.2 金錢必須全部放入兌換區

普通/困難模式的 `handleJudgment()` 會檢查源區域是否還有剩餘金錢，有的話彈出警告並阻止判斷。

### 7.3 簡單模式語音延遲機制

簡單模式的 `updatePaymentTotal()` 使用 300ms 延遲播報：
- 快速連續拖入時，前一次語音會被取消（`clearTimeout`）
- 最後一次拖入後延遲 300ms 播報
- 播報後再延遲 2000ms 執行自動判斷
- 此機制確保語音不會重疊，且留足時間讓用戶聽完

### 7.4 分數計算方式

每答對一題加 10 分，正確率 = `(score / 10 / totalQuestions) * 100%`。此設計允許未來加入部分得分機制。

### 7.5 困難模式 currentTotal 初始化差異

困難模式的 `gameState.currentTotal` 初始化為 `totalMoney`（錢包總額），而普通模式初始化為 `0`。這反映困難模式「一開始就知道總額但隱藏」的設計意圖。

### 7.6 配置驅動的註解警告

檔案頭部有大段配置驅動開發指南註解（`UNIFIED_DEVELOPMENT_GUIDE.md`），但實際程式碼中 ModeConfig 僅用於價格生成，speech/audio/timing 配置並未被完整套用。

### 7.7 狀態管理現況

| 項目 | 狀態 |
|------|------|
| 統一重置函數 | ✅ `resetGameState()` |
| 布林旗標 | `loadingQuestion`, `isProcessing`, `isProcessingDrop` |
| 重置位置 | 集中（2 處調用） |
| 評價 | ✅ **最佳實踐** |

**說明**：C5 已實現統一的 `resetGameState()` 函數，在 `showSettings()` 和 `startQuiz()` 中調用，集中管理所有遊戲狀態的重置

**重置項目**：`quiz` 物件、`loadingQuestion`、`isProcessing`、`isProcessingDrop`、`compatibilityCache`、`clickState` 物件

**搜尋關鍵字**：`resetGameState`

---

## 八、潛在 Bug 與程式碼品質檢測

### Bug #1：purchaseItems 資料重複定義（嚴重度：低）

`gameData.purchaseItems` 在兩處定義了完全相同的物品資料：
- 初始物件定義（約第 564-654 行）
- `initGameData()` 方法（約第 708-811 行）

`initGameData()` 會覆蓋初始定義，造成約 240 行的冗餘程式碼。應刪除初始定義或 `initGameData()` 中的重複部分。

### Bug #2：findAllCombinations() 可能指數爆炸（嚴重度：高）

自訂金額模式使用回溯搜索列舉所有幣值組合，當金額大且面額小時（如 1000 元 + [1,5,10] 面額），組合數量極大，可能造成瀏覽器凍結。缺乏計時器中斷或最大組合數限制。

**建議**：加入 `maxCombinations` 限制（如 100），達到後提前 return。

### Bug #3：filterAmountsByItemPriceRanges() 效能問題（嚴重度：低）

使用 `Array.includes()` 檢查金額是否已在 `validAmounts` 中，時間複雜度 O(n)。當可組合金額數量龐大時（數千個），多重巢狀迴圈效能差。

**建議**：改用 `Set` 資料結構。

### Bug #4：CSS `:contains()` 偽類無效（嚴重度：低）

困難模式 CSS 中有：
```css
#current-total-display:contains("？？？") { ... }
```
`:contains()` 不是標準 CSS 偽類（僅存在於 jQuery），此規則永遠不會生效。

### Bug #5：handleCustomQuestionClick() 重複定義（嚴重度：低）

此函數在第 1538 行和第 5186 行各定義一次，內容完全相同。第二個定義會覆蓋第一個。

### Bug #6：showMessage() 的 'warning' type 未處理（嚴重度：低）

`showMessage(text, type, callback)` 中，type 只判斷 `success` 和其他（else），但 `handleJudgment()` 中傳入了 `'warning'` type（金錢未全部放入時）。雖然 warning 會走 else 分支（紅色背景），但視覺上不夠精確。

### Bug #7：startSystemMonitoring() 的 setInterval 永不清除（嚴重度：中）

每 30 秒的記憶體監控 `setInterval` 在遊戲結束或返回設定後不會被清除。若多次調用 `init()`（如「再玩一次」→ `Game.init()`），會累積多個 interval，造成記憶體洩漏和 console 日誌堆積。

### Bug #8：「再玩一次」按鈕行為不一致（嚴重度：中）

完成頁面的「再玩一次」按鈕調用 `Game.startQuiz()`，直接重新生成題目而不回設定頁。但「返回設定」按鈕調用 `Game.init()`，會重新初始化包括語音和音效。若語音在結果頁後異常，「再玩一次」無法修復。

### Bug #9：普通模式語音每次拖入都 interrupt: true（嚴重度：低）

普通模式 `updatePaymentTotal()` 中播報語音使用 `interrupt: true`，每次拖入金錢都會中斷上一次語音。若快速連續拖入，用戶只能聽到最後一次的金額。（簡單模式用 300ms debounce 避免了此問題）

### Bug #10：自動判斷的 autoJudgmentData 訊息邏輯不一致（嚴重度：低）

簡單模式自動判斷答錯時，`showMessage()` 的 type 由 `messageType = userSaysEnough ? 'success' : 'error'` 決定，但此時是答對情境（`isCorrect = true`），type 卻可能為 `'error'`。雖然不影響流程（答對分支），但邏輯上不清晰。

### Bug #11：大量 console.log 無全域開關（嚴重度：低）✅ 已修復

~~雖然 `Debug` 系統有 `enabled` 旗標控制專用日誌，但絕大多數 `console.log` 直接寫在函數中（非通過 `Debug.log()`），無法統一關閉。估計有 200+ 行 console.log 散佈在程式碼中。~~

**修復狀態**（2026-02-20）：已將全部 130+ 處 `console.log`/`warn`/`error` 轉換為 `Game.Debug.log(category, ...)` 分類日誌系統。支援 14 種日誌類別，可透過 `Game.Debug.FLAGS` 個別開關。

---

## 九、未來開發建議

### 9.1 架構改進

1. **刪除重複的 purchaseItems 定義**：保留 `initGameData()` 中的版本，移除 `gameData` 初始物件中的重複
2. **findAllCombinations() 加入限制**：加入 `maxCombinations` 參數和計時器，防止回溯搜索爆炸
3. **使用 Set 替代 Array.includes()**：`filterAmountsByItemPriceRanges()` 中的 `validAmounts` 應改為 Set
4. **清理 setInterval**：`startSystemMonitoring()` 應返回 interval ID，在 `init()` 或銷毀時清除
5. ~~**統一 console.log 管理**：所有日誌通過 `Debug.log()` 輸出，支援全域開關~~ ✅ 已完成（2026-02-20）

### 9.2 檔案分類建議

| 模組 | 建議拆分檔案 | 內容 |
|------|------------|------|
| 設定系統 | `c5-settings.js` | showSettings, handleSelection, 相容性檢測 |
| 價格策略 | `c5-price-strategy.js` | ModeConfig, PriceStrategy, 增強型價格生成 |
| 題目生成 | `c5-question-generator.js` | generateQuestion, 面額計算, DP 算法 |
| 遊戲邏輯 | `c5-game-logic.js` | 三模式渲染, 事件處理, 判斷邏輯 |
| CSS | `c5-styles.js` 或 `css/c5.css` | getCommonCSS, 三模式 CSS |

### 9.3 可改進之處

1. **ModeConfig 完整套用**：目前 `speechTemplates` 和 `timing` 配置未被使用，應將語音文字和延遲時間從硬編碼改為讀取配置
2. **物品圖片支援**：purchaseItems 定義了 `image` 屬性（指向 `../images/items/` 路徑），但 `getItemDisplay()` 和 `getSmallItemDisplay()` 僅使用 emoji，未利用圖片
3. **困難模式增加挑戰性**：目前困難模式僅隱藏總額和語音，可考慮加入：隱藏面額標籤、時間限制、混淆選項
4. **金錢取回按面額排序**：`insertMoneyInOriginalPosition()` 已實現，但按面額大小排序而非原始位置，可考慮使用 `data-original-index` 保持原始順序
5. **insufficient 策略改進**：目前 insufficient 價格生成使用線性搜索 `for (price = max; price >= min; price--)`，效率較低，可改為隨機偏移

### 9.4 作業單功能擴展

C5 作業單目前支援 4 種題型（fill / coin-select / coin-text / hint-complete），可考慮新增：
- **比較題型**：兩組金錢比較哪個夠買
- **排序題型**：多個商品按「能否買得起」排序

---

## Bug 修正記錄（2026-02-10）

| Bug | 問題 | 修正狀態 |
|-----|------|---------|
| #1 | purchaseItems 資料重複定義 | ✅ 刪除初始 gameData 中的重複定義 |
| #2 | findAllCombinations() 指數爆炸 | ✅ 加入 MAX_COMBINATIONS=100 限制 |
| #3 | filterAmountsByItemPriceRanges() 用 Array.includes | ✅ 改用 Set |
| #4 | CSS :contains() 偽類無效 | ✅ 改用 class-based (.question-mark-state) |
| #5 | handleCustomQuestionClick() 重複定義 | ✅ 刪除第一份 |
| #6 | showMessage() warning type 未處理 | ✅ 加入 warning 橙色樣式 |
| #7 | startSystemMonitoring() setInterval 未清除 | ✅ 儲存 ID + init() 前清除 |
| #8 | 「再玩一次」不重新初始化語音 | ✅ startQuiz() 加 speech.init() |
| #9 | 普通模式語音 interrupt:true | ✅ 加入 300ms debounce |
| #10 | 自動判斷 messageType 不一致 | ✅ 正確分支統一用 'success' |
| #11 | console.log 無全域開關 | ✅ 已完成（2026-02-20 Debug Logger 統一） |

---

## 十、總結

C5「夠不夠」是 C 系列中設計最為複雜的設定系統之一，其核心亮點在於：

1. **配置驅動的價格策略**：ModeConfig + PriceStrategy 雙層配置系統，支援確定性隨機和多種價格分佈策略，是整個專案中最精緻的價格生成機制
2. **豐富的物品資料庫**：48+ 個物品按 4 個位數層級嚴格分類，配合智能相容性檢測系統，確保面額-物品-位數三者之間的合理配對
3. **面額優先的題目生成**：不同於 C4 的物品優先邏輯，C5 採用面額→金額→價格→物品的流程，更適合「判斷夠不夠」的玩法需求
4. **多重 DP 算法**：Uint16Array 優化的 coin change、回溯搜索列舉、貪婪組合生成等多種算法各司其職

主要風險集中在 `findAllCombinations()` 的指數爆炸可能和 `startSystemMonitoring()` 的記憶體洩漏。建議優先修復這兩個問題，並清理重複的 purchaseItems 資料定義。

**統計**：JS 6,271 行、HTML 83 行、作業單 277 行、潛在 Bug 11 個（全部已修正）、設定群組 8 個、物品 48+ 個、DP 算法 4 種。

---

## 十一、驗證記錄

### 2026-02-16：系統性驗證

**驗證內容**：

| 項目 | 狀態 | 說明 |
|------|------|------|
| TimerManager | ✅ 已完成 | 31 個 setTimeout 統一管理（2026-02-22 v2.1.0，分類：question/ui/speech/drag） |
| EventManager | ✅ 已完成 | 23 個 addEventListener 統一管理（2026-02-22 v2.1.0，分類：settings/dragSystem/gameUI） |
| injectGlobalAnimationStyles | ✅ 已完成 | 動畫定義統一注入（id：c5-global-animations） |
| endGame() | ✅ 正常 | 採用 C/F 系列統一完成畫面樣式 |
| confetti 煙火 | ✅ 正常 | 使用 v1.9.2 本地化版本 |

**建議改進（P1）**：
- ~~引入 TimerManager 統一管理 setTimeout~~ ✅ 已於 2026-02-22 完成
- ~~引入 EventManager 統一管理 addEventListener~~ ✅ 已於 2026-02-22 完成
- ~~新增 console.log 全域開關（Bug #11 暫緩）~~ ✅ 已完成（2026-02-20）

**結論**：C5 功能正常，記憶體管理標準已達成（TimerManager 31個 + EventManager 23個 + injectGlobalAnimationStyles 均已實作）。

---

## 十二、重構記錄

### 2026-02-17：狀態管理重構（resetGameState）

**問題**：
- 狀態重置邏輯分散於多個位置
- `quiz`、`clickState`、`loadingQuestion`、`isProcessing` 等多個狀態需要重置
- 不符合 C1/C2/C4/A4/A5 等單元的最佳實踐

**修改內容**：

1. **新增 `resetGameState()` 函數**
   - 集中管理所有遊戲相關狀態的重置
   - 重置項目：
     - `quiz`：`currentQuestion`, `totalQuestions`, `score`, `questions`, `startTime`, `attempts`
     - `loadingQuestion`：載入鎖定旗標
     - `isProcessing`：處理中旗標
     - `isProcessingDrop`：拖放處理中旗標
     - `compatibilityCache`：相容性檢查緩存
     - `clickState`：`selectedItem`, `lastClickTime`, `lastClickedElement`, `doubleClickDelay`
   - 輸出日誌：`🔄 [C5] 遊戲狀態已重置`

2. **調用位置**
   | 位置 | 調用條件 | 說明 |
   |------|---------|------|
   | `showSettings()` | 無條件 | 返回設定時重置狀態 |
   | `startQuiz()` | 無條件 | 開始測驗前重置狀態 |

**新增程式碼**（搜尋關鍵字：`resetGameState`）：

```javascript
resetGameState() {
    this.state.quiz = {
        currentQuestion: 0,
        totalQuestions: 10,
        score: 0,
        questions: [],
        startTime: null,
        attempts: 0
    };
    this.state.loadingQuestion = false;
    this.state.isProcessing = false;
    this.state.isProcessingDrop = false;
    this.state.compatibilityCache = {};
    this.clickState = {
        selectedItem: null,
        lastClickTime: 0,
        lastClickedElement: null,
        doubleClickDelay: 500
    };
    console.log('🔄 [C5] 遊戲狀態已重置');
}
```

**修改檔案**：
- `js/c5_sufficient_payment.js`

**驗證方式**：
1. 開啟 C5 夠不夠
2. 完成部分測驗後點擊「返回設定」
3. Console 應顯示「🔄 [C5] 遊戲狀態已重置」
4. 重新開始測驗，確認題目從第 1 題開始、分數為 0、處理狀態清空

---

### 2026-02-20：Debug Logger 統一轉換

**問題**：
- Bug #11 指出 console.log 無全域開關
- 約 130+ 處 console.log/warn/error 散佈在程式碼中
- 雖有 Debug 系統基礎設施，但大多數日誌未使用

**解決方案**：
將所有 `console.log`、`console.warn`、`console.error` 呼叫轉換為 `Game.Debug.log(category, ...)` 系統。

**Debug FLAGS 結構**：

```javascript
Game.Debug.FLAGS = {
    all: false,      // 開啟全部
    init: false,     // 初始化
    speech: false,   // 語音
    audio: false,    // 音效
    ui: false,       // UI
    payment: false,  // 付款
    drag: false,     // 拖曳
    touch: false,    // 觸控
    question: false, // 題目
    state: false,    // 狀態
    wallet: false,   // 金錢
    hint: false,     // 提示
    event: false,    // 事件
    judge: false,    // 判斷
    error: true      // 錯誤（預設開啟）
}
```

**轉換統計**：

| 類別 | 說明 | 轉換數量 |
|------|------|----------|
| `init` | 初始化 | 2 |
| `audio` | 音效系統 | 5 |
| `speech` | 語音系統 | 10 |
| `ui` | UI 渲染 | 15 |
| `state` | 狀態管理 | 18 |
| `question` | 題目生成 | 12 |
| `wallet` | 金錢生成 | 8 |
| `drag` | 拖曳操作 | 16 |
| `touch` | 觸控操作 | 6 |
| `event` | 事件處理 | 22 |
| `payment` | 付款邏輯 | 4 |
| `judge` | 判斷邏輯 | 12 |
| `hint` | 提示功能 | 4 |
| `error` | 錯誤（總是顯示） | 8 |

**使用方式**：

```javascript
// 開發時透過 Console 開啟特定類別
Game.Debug.FLAGS.drag = true;   // 只看拖曳相關日誌
Game.Debug.FLAGS.all = true;    // 開啟全部日誌
```

**修改檔案**：
- `js/c5_sufficient_payment.js`

**搜尋關鍵字**：`Game.Debug.FLAGS`, `Game.Debug.log`

---

### 2026-02-22：動畫定義整合

**問題**：
- 動畫定義分散於 JS 程式碼中的多處 `<style>` 注入區塊
- 共 9 處 @keyframes 定義，其中 `totalAmountGlow` 重複 2 次
- 缺少統一的 `injectGlobalAnimationStyles()` 函數

**解決方案**：
新增 `injectGlobalAnimationStyles()` 函數，集中管理所有動畫定義。

**Phase 1：新增 `injectGlobalAnimationStyles()` 函數**

位置：Debug 系統後、state 物件前

```javascript
injectGlobalAnimationStyles() {
    if (document.getElementById('c5-global-animations')) return;

    const style = document.createElement('style');
    style.id = 'c5-global-animations';
    style.innerHTML = `
        /* ===== 訊息動畫 ===== */
        @keyframes messageSlideIn { ... }
        @keyframes messageSlideOut { ... }

        /* ===== 完成畫面動畫 ===== */
        @keyframes fadeIn { ... }
        @keyframes celebrate { ... }
        @keyframes bounce { ... }
        @keyframes glow { ... }

        /* ===== 金額顯示動畫 ===== */
        @keyframes totalAmountGlow { ... }
        @keyframes questionPulse { ... }
    `;
    document.head.appendChild(style);
    Game.Debug.log('init', '🎬 全局動畫樣式注入完成（8 個動畫）');
},
```

**調用位置**：`init()` 函數開頭

**Phase 2：移除內嵌 @keyframes**

移除/替換位置統計：

| 位置 | 動畫名稱 | 處理方式 |
|------|---------|---------|
| showMessage() | messageSlideIn, messageSlideOut | 移除整個 style 注入區塊，保留註解 |
| 完成畫面 | fadeIn, celebrate, bounce, glow | 移除 4 個 @keyframes，保留註解 |
| unit5-normal 樣式 | totalAmountGlow | 移除，保留註解 |
| hard 模式樣式 | questionPulse | 移除，保留註解 |
| unit5-hard 樣式 | totalAmountGlow（重複） | 移除，保留註解 |

**動畫清單（8 個唯一動畫）**：

| 動畫名稱 | 用途 | 原位置 |
|---------|------|--------|
| messageSlideIn | 訊息淡入縮放 | showMessage() |
| messageSlideOut | 訊息淡出縮放 | showMessage() |
| fadeIn | 完成畫面淡入 | 完成畫面 |
| celebrate | 完成畫面慶祝 | 完成畫面 |
| bounce | 彈跳動畫 | 完成畫面 |
| glow | 發光效果 | 完成畫面 |
| totalAmountGlow | 金額發光（普通/困難模式） | unit5-normal/hard 樣式 |
| questionPulse | 問號脈衝 | hard 模式 |

**重複定義消除**：
- `totalAmountGlow`：原有 2 處（unit5-normal + unit5-hard），合併為 1 處

**嵌套物件 `this.Debug` 檢查**：
- C5 不使用 TimerManager/EventManager/SceneConfig 等嵌套物件結構
- 所有 Debug 呼叫皆使用 `Game.Debug.log()` 形式
- **結論：無嵌套物件問題**

**修改檔案**：
- `js/c5_sufficient_payment.js`

**搜尋關鍵字**：`injectGlobalAnimationStyles`, `c5-global-animations`

**驗證方式**：
1. 開啟 C5 夠不夠
2. 開啟開發者工具 → Elements
3. 確認 `<head>` 中存在 `<style id="c5-global-animations">`
4. 確認 Console 無 CSS 動畫相關錯誤
5. 測試各種模式動畫效果正常

---

## 記憶體管理實作（v2.1.0）

### 實作範圍

| 項目 | 數量 | 說明 |
|------|------|------|
| TimerManager 遷移 | 31 個 | `setTimeout` → `Game.TimerManager.setTimeout` |
| EventManager 遷移 | 23 個 | `addEventListener` → `Game.EventManager.on` |
| clearAll 呼叫點 | 3 個 | `init()` / `showSettings()` / `startQuiz()` |
| 保留 raw setTimeout | 3 個 | speech 子物件（2個）+ TimerManager 內部定義（1個） |
| 保留 raw addEventListener | 4 個 | DOMContentLoaded + EventManager 內部 + window.error × 2 |

### setTimeout 分類

| 分類 | 數量 | 說明 |
|------|------|------|
| `'question'` | 3 | checkEasyModeAutoJudgment 等 |
| `'ui'` | 24 | DOM 更新、modal、動畫、dragImg 移除 |
| `'speech'` | 2 | 語音延遲（非 speech 子物件） |
| `'drag'` | 2 | setupTouchDragSupport 延遲 |

### addEventListener 分類

| 分類 | 數量 | 說明 |
|------|------|------|
| `'settings'` | 5 | startBtn、settingsRewardLink、worksheetLink、setCustomAmountBtn、gameSettings |
| `'dragSystem'` | 9 | dragstart/dragend/dragover/dragleave/drop |
| `'gameUI'` | 9 | backBtn、enoughBtn、notEnoughBtn、modal、completion |

**搜尋關鍵字**：`TimerManager.setTimeout`, `EventManager.on`

---

### 2026-02-24（第二輪）：稽核結果

**第二輪全面稽核結論（無新增 Bug）**：

- ✅ EventManager：UI 事件監聽器全部使用 `Game.EventManager.on()`
  - 例外：`window.addEventListener('error', ...)` 和 `window.addEventListener('unhandledrejection', ...)` 為全域錯誤捕獲處理器，屬於除錯工具，非 UI 事件，不需要 EventManager 管理
- ✅ `resetGameState()`：正確初始化所有必要屬性
- ✅ 完成畫面符合 C/F 系列標準
- ✅ 作業單連結不傳 count 參數

**無需修復任何項目。**

---

### 2026-02-24：作業單連結統一簡化（僅傳 unit 參數）

**修改內容**：

- 作業單連結原本傳遞遊戲設定參數（`digits`, `difficulty`）
- 各作業單已有完整工具列，用戶開啟後可直接在工具列調整；遊戲設定與作業單設定應獨立運作
- **修復**：移除所有多餘參數，統一改為只傳 `unit` 參數，讓作業單完全使用自己的預設値

**修改檔案**：`js/c5_sufficient_payment.js`

---

---

### 2026-02-26：觸控拖曳 TypeError 修復 + 完成畫面時間顯示修復

#### Bug 1：觸控拖曳 `setDragImage is not a function` TypeError

**問題描述**：
在行動裝置觸控拖曳時，`TouchDragUtility` 呼叫 `onDragStart` 回調時傳入的是 `TouchEvent`，而非真正的 `DragEvent`。`TouchEvent` 沒有 `dataTransfer` 屬性，因此 `e.dataTransfer.setDragImage(...)` 拋出 `TypeError: e.dataTransfer.setDragImage is not a function`，導致觸控端無法拖曳放置金錢圖示。

**影響位置**（C5，1 處）：
- `setupDraggableMoneyItems()` 中的 `e.dataTransfer.setDragImage(...)` 呼叫

**修復方式**：
```javascript
// 修復前
e.dataTransfer.setDragImage(dragImg, dragImg.offsetWidth / 2, dragImg.offsetHeight / 2);

// 修復後
if (e.dataTransfer && typeof e.dataTransfer.setDragImage === 'function') {
    e.dataTransfer.setDragImage(dragImg, dragImg.offsetWidth / 2, dragImg.offsetHeight / 2);
}
```

#### Bug 2：完成畫面顯示「答對 0 題 / 29533771 分 43 秒」

**問題描述**：
`displayResultsWindow()` 讀取 `this.state.quiz.startTime`，若 startTime 為 null 時，`endTime - null = Date.now()` → 顯示 29533771 分 43 秒。

**修復方式**：
```javascript
// 修復前
const elapsedMs = endTime - startTime;

// 修復後
const elapsedMs = startTime ? (endTime - startTime) : 0;
```

**修改檔案**：`js/c5_sufficient_payment.js`

---

*報告更新時間：2026-02-26*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

## 2026-02-27：語音/狀態/計時器綜合修復（第三輪）

### 1. Raw setTimeout 修復

| # | 位置 | 原始 | 修復後 |
|---|------|------|--------|
| 1 | `speech.init()` 延遲初始化 | `setTimeout(() => {...}, 1000)` | `Game.TimerManager.setTimeout(..., 1000, 'speech')` |
| 2 | `speech.init()` 初始化重試 | `setTimeout(() => {...}, 100)` | `Game.TimerManager.setTimeout(..., 100, 'speech')` |
| 3 | `speak()` 安全逾時（10秒） | `setTimeout(safeCallback, 10000)` | `Game.TimerManager.setTimeout(safeCallback, 10000, 'speech')` |

### 2. speak() 缺少 onerror + safeCallback 防護

**問題**：`utterance.onend` 觸發後若再觸發 `onerror`，callback 會被執行兩次，
可能導致遊戲流程雙重推進。

**修復**：retry 路徑及主路徑均加入 `callbackExecuted` 旗標：

```javascript
if (callback) {
    let callbackExecuted = false;
    const safeCallback = () => {
        if (!callbackExecuted) { callbackExecuted = true; callback(); }
    };
    utterance.onend = safeCallback;
    utterance.onerror = (e) => {
        Game.Debug.log('speech', '語音播放錯誤', e?.error);
        safeCallback();
    };
    Game.TimerManager.setTimeout(safeCallback, 10000, 'speech');
}
```

### 3. showResults() 重複呼叫防護

**問題**：語音回呼非同步完成時，`showResults()` 可能被多次觸發。

**修復**：

- `resetGameState()` 加入 `this.state.gameCompleted = false`
- `showResults()` 開頭加入守衛：
  ```javascript
  if (this.state.gameCompleted) { Game.Debug.log('state', '⚠️ showResults 已執行過，忽略重複呼叫'); return; }
  this.state.gameCompleted = true;
  ```

### 4. 系統監控 EventManager 改寫

**問題**：`startSystemMonitoring()` 直接呼叫 `window.addEventListener`，
無法被 `EventManager.removeAll()` 清除。

**修復**：

```javascript
// 修復前
window.addEventListener('error', handler);
window.addEventListener('unhandledrejection', handler);

// 修復後
Game.EventManager.on(window, 'error', handler, {}, 'global');
Game.EventManager.on(window, 'unhandledrejection', handler, {}, 'global');
```

**修改檔案**：`js/c5_sufficient_payment.js`

---

### 2026-02-27：confetti setInterval → 遞迴 TimerManager 模式（第二輪）

**問題**：完成畫面煙火效果包在 `Game.TimerManager.setTimeout` 回呼中，但內部的裸 `setInterval` 不受 TimerManager 管理，場景切換時 `TimerManager.clearAll()` 無法中途停止動畫計時器。

**修復**：將 `setInterval` 改為遞迴 `Game.TimerManager.setTimeout(fireConfetti, 250, 'confetti')`，確保 `clearAll()` 或 `clearByCategory('confetti')` 可立即停止動畫。

**修改檔案**：`js/c5_sufficient_payment.js`

---

*報告更新時間：2026-02-27*
*報告產生者：Claude Code (claude-sonnet-4-6)*

### 2026-02-28
- `init()` 清除舊計時器改用 `Game.TimerManager.clearByCategory('monitoring')` 取代 `clearInterval(this.monitoringIntervalId)`
- `startSystemMonitoring()` 的 `setInterval(logMemoryUsage, 30000)` 改為遞迴 `scheduleNext()` 使用 `Game.TimerManager.setTimeout(..., 30000, 'monitoring')`，可由 `clearByCategory('monitoring')` 立即停止

---

## 廢棄程式碼稽核（2026-03-01）

**稽核範圍**：`js/c5_sufficient_payment.js`（6,366 行）

### 結論：發現 2 個廢棄函數 stub（未刪除）

| 類型 | 位置 | 內容 | 嚴重性 | 建議 |
|------|------|------|--------|------|
| **廢棄函數 stub** | Line 3183 | `generateSufficientMoney()` — 注解標記「廢棄的舊函數（保留以防止錯誤，但不再使用）」；函數體為最小實作，並以 `Game.Debug.warn()` 警告 | 中 | 確認無呼叫點後可刪除 |
| **廢棄函數 stub** | Line 3190 | `generateInsufficientMoney()` — 同上，保留為 stub | 中 | 同上 |
| 清理操作注解 | Line 755 | `// 監控系統狀態（清除舊的 monitoring 計時器避免累積）` | 低 | 操作性注解 |
| console.log | Lines 47, 53, 78, 97, 103+ | Debug 系統內部呼叫 | — | 已受 FLAGS 守衛 |

### 廢棄項目詳情

#### `generateSufficientMoney()` 和 `generateInsufficientMoney()`（Lines 3182–3203）
```javascript
// 廢棄的舊函數（保留以防止錯誤，但不再使用）
generateSufficientMoney(...) {
    Game.Debug.warn('state', '⚠️ generateSufficientMoney 已廢棄，請使用新的面額優先邏輯');
    // Minimal implementation as fallback
}
```
- **保留原因**：原開發者保留 stub 防止意外呼叫時崩潰
- **刪除風險**：低（若確認無呼叫點）；若有呼叫點則需先更新呼叫者

**整體評估**：兩個廢棄 stub 是唯一需要處理的項目，可在確認無呼叫點後刪除。

---

## 跨輪計時器洩漏稽核（2026-03-03）

**稽核背景**：A3 單元曾發現 `speakText()` 10 秒備援計時器在下一輪觸發導致跳輪的 Bug，已對全系列交叉稽核。

**C5 稽核結論：安全（無此問題）**

三層保護均完備：

| 條件 | 狀態 | 說明 |
|------|------|------|
| ① 新輪次從語音 callback 觸發 | **不成立 ✅** | `endGame()` / `loadNextQuestion()` 不從語音 callback 鏈內部呼叫 |
| ② interrupted 不呼叫 safeCallback | **不成立 ✅** | `onerror` 對所有錯誤**無條件**呼叫 `safeCallback()`，備援計時器為 no-op |
| ③ 新輪次函數無 clearAll() | **不成立 ✅** | `init()` / `showSettings()` 有 `TimerManager.clearAll()` |

**結論**：三個條件均不成立，從架構、語音錯誤處理、計時器清理三個層面同時保護，bug 不可能發生。

---

## 語音選擇優先順序統一（2026-03-04）

全專案 18 個單元統一語音選擇策略，舊版以 `Microsoft HsiaoChen Online` 為第一優先，已更新為：

```javascript
this.voice =
    voices.find(v => v.name === 'Google 國語 (臺灣)') ||        // 有連網優先 1
    voices.find(v => v.name === 'Microsoft HsiaoChen Online') || // 有連網優先 2
    voices.find(v => v.name === 'Microsoft HsiaoChen') ||        // 無連網 Win11
    voices.find(v => v.name === 'Microsoft Hanhan') ||           // 無連網 Win10
    voices.find(v => v.lang === 'zh-TW') ||                      // 任何 zh-TW
    voices.find(v => v.lang.startsWith('zh')) ||                 // 任何 zh
    voices[0];
```

**變更重點**：
- `Google 國語 (臺灣)` 升為第一優先（連網時音質最佳）
- 新增 `Microsoft HsiaoChen`（Win11 離線版，無 Online 後綴）
- 新增 `Microsoft Hanhan`（Win10 離線備用，舊版誤用 `!v.name.includes('Hanhan')` 排除）
- 移除 `const preferredVoices` 陣列、`!Hanhan` filter 邏輯、多步 if 塊，以單一鏈式表達式取代

---

## 語音選擇優先順序調整（雅婷優先）（2026-03-04）

### 新優先順序

```javascript
this.voice =
    voices.find(v => v.name.startsWith('Microsoft Yating')) ||   // 微軟雅婷 優先 1
    voices.find(v => v.name.startsWith('Microsoft Hanhan')) ||   // 微軟涵涵 優先 2
    voices.find(v => v.name === 'Google 國語（臺灣）') ||          // Google 線上 優先 3
    voices.find(v => v.lang === 'zh-TW') ||                      // 任何 zh-TW
    voices.find(v => v.lang.startsWith('zh')) ||                 // 任何 zh
    voices[0];
```

### 同步修正兩個舊 Bug

**Bug 1：Google 語音名稱括號錯誤**
- 舊：`'Google 國語 (臺灣)'`（ASCII 半形括號）
- 新：`'Google 國語（臺灣）'`（全形括號）
- 影響：`find()` 永遠找不到 Google 語音，直接跳過

**Bug 2：Microsoft 語音使用 `===` 精確比對失敗**
- Chrome 實際語音名稱：`'Microsoft Hanhan - Chinese (Traditional, Taiwan)'`（帶語言後綴）
- 舊 `===` 無法匹配，實際由第 5 順位 `zh-TW` 通用 fallback 選到
- 改為 `startsWith('Microsoft Yating')` / `startsWith('Microsoft Hanhan')` 後正確匹配

---

## 跨單元修復（2026-03-05）— 設定頁連結按鈕文字粗黑修復

（詳細說明見 `report/A1_Unit_Completion_Report.md` 跨單元修復章節）

**問題**：`css/ai-theme.css` 全域 `a {}` 規則的 `transition: color` 使 `a.selection-btn { color: #000 !important }` 在 CSS 過渡期間失效，設定頁「開啟獎勵系統」連結按鈕文字呈現藍色而非粗黑。

**修復**：`css/ai-theme.css` 的 `a {}` 和 `a:hover {}` 改為 `a:not(.selection-btn):not(.choice-btn) {}`。

**關鍵搜尋詞**：`a:not(.selection-btn):not(.choice-btn)` in `css/ai-theme.css`

---

## generateQuestion 幣值組合失敗修復（2026-03-08）

### 問題描述

特定幣值與位數組合下（例如僅選 1元 搭配 3位數、或僅選小面額搭配高位數），`startQuiz()` 在生成第2題時連續失敗50次，最終顯示「設定有問題」返回設定頁。Console 顯示大量 `❌ 多次重試後仍無法生成有效的物品+價格組合`。

### 根本原因

`generateQuestion()` 內的舊版「10次隨機採樣迴圈」有兩個設計缺陷：

1. **策略固定**：`getQuestionStrategy()` 在進入 10 次迴圈前就決定了唯一策略（sufficient 或 insufficient）。若該策略對當前幣值完全無有效組合（例如：錢包最大金額 30元 << 物品最低價格 80元），10次全部 `continue`，函數返回 null。

2. **無策略備援**：若主策略失敗，不會改用另一策略，直接返回 null。

由於 `startQuiz()` 外層迴圈每次呼叫 `generateQuestion()` 都會隨機決定策略（50% sufficient / 50% insufficient），若 **兩種策略都無有效組合**（錢包上限 < 2/3 × 物品最低價格），50 次嘗試全部返回 null，最終觸發失敗。

**典型觸發設定**：
- 位數=3（100-999元）+ 僅選 1元：錢包最大 30元，物品最低 80元
- 位數=4（1000-9999元）+ 僅選 1/5/10元：錢包最大 300元，物品最低 1000元

### 修復方案

以「預先建立有效組合池」取代「隨機採樣重試」：

```javascript
const buildValidPool = (strat) => {
    const pool = [];
    for (const ci of allCandidateItems) {
        const iMin = Math.max(1, ci.priceRange[0]);
        const iMax = Math.min(maxPrice, ci.priceRange[1]);
        for (const amt of possibleAmounts) {
            const pMin = strat === 'insufficient'
                ? Math.max(iMin, amt + 1) : iMin;
            const pMax = strat === 'insufficient'
                ? Math.min(iMax, insufficientCeiling) : Math.min(iMax, amt);
            if (pMin <= pMax) pool.push({ ci, pMin, pMax, amt });
        }
    }
    return pool;
};

// 優先使用隨機策略；若無有效組合，自動切換備用策略
let pool = buildValidPool(strategy);
let effectiveStrategy = strategy;
if (pool.length === 0) {
    const altStrategy = strategy === 'sufficient' ? 'insufficient' : 'sufficient';
    pool = buildValidPool(altStrategy);
    effectiveStrategy = altStrategy;
}

if (pool.length === 0) return null;  // 兩種策略均無有效組合

// 從有效組合池隨機選取
const pick = pool[Math.floor(Math.random() * pool.length)];
```

同步修正 `generateMoneyForStrategy(itemPrice, denominations, strategy)` → `effectiveStrategy`。

### 同步更新

`showGenerationErrorMessage()` 提示文字更新：新增「選擇**面額較大**的錢幣（例如：選3位數時需包含50元或100元）」說明，幫助使用者理解根本原因。

### 關鍵搜尋詞

`buildValidPool`, `effectiveStrategy`, `generateQuestion`

---

## 輔助點擊彈窗偵測修復（2026-03-14）

### 問題描述

C5 簡單模式進入測驗時，`showInstructionModal()` 建立的彈窗 overlay 元素沒有設定 `id`，AssistClick 的 `buildQueue()` 無法偵測彈窗是否存在，導致：
1. 彈窗顯示期間，金幣已被高亮並觸發放置
2. 點擊遮罩時金幣被放置，彈窗仍未關閉

### 修復方案

**1. 為彈窗加上 id**（`js/c5_sufficient_payment.js`，`showInstructionModal()`）

```javascript
const modalOverlay = document.createElement('div');
modalOverlay.id = 'c5-instruction-modal';  // ← 新增
```

**2. `buildQueue()` 優先偵測彈窗**

```javascript
buildQueue() {
    if (!this._enabled) return;
    const modal = document.getElementById('c5-instruction-modal');
    if (modal) {
        this._queue = [{ target: null, action: () => this._closeInstructionModal() }];
        this._step = 0;
        return;
    }
    // ... 正常找錢幣邏輯
}
```

**3. 新增 `_closeInstructionModal()`**

與 C4/C6 相同模式：TTS 取消 → 淡出動畫（300ms）→ 移除 DOM → 重呼 `buildQueue()`。

**關鍵搜尋詞**：`c5-instruction-modal`、`_closeInstructionModal`

---

## 設定頁輔助點擊說明更新（2026-03-14）

C5 具體描述：「拖曳錢幣至付款區」（格式同 C4 章節說明）

**關鍵搜尋詞**：`assist-click-group`、`啟用後，只要偵測到點擊`

---

---

## 正確回答「錢不夠」時顯示差額金錢圖示（2026-03-27）

### 需求

三種難度（簡單/普通/困難）正確回答「❌ 錢不夠，不能買」後，在彈窗主訊息下方以真實金錢圖示顯示還差多少錢，紙鈔圖示（100/500/1000元）大於硬幣圖示（1/5/10/50元）。

### 實作

**新增 `buildShortfallHTML(shortfall)`**：
- 貪婪演算法將差額分解為面額（1000→500→100→50→10→5→1），最多 12 枚
- 紙鈔（≥100元）寬度 72px，硬幣（<100元）寬度 44px，均加 `drop-shadow`
- 返回 HTML 字串：「還差 **X** 元（金色）」+ 金錢圖示列

**修改 `showMessage(text, type, callback, extraHTML='')`**：
- 新增第 4 參數 `extraHTML`（不會被語音朗讀）
- 渲染在主訊息文字下方，以虛線分隔

**修改 `handleJudgment`**：
- 正確且為「不能買」情況：計算差額並生成 `shortfallHTML`
  - 自動判斷路徑（簡單模式）：`autoItemPrice - currentTotal`
  - 手動判斷路徑（普通/困難模式）：`itemPrice - totalMoney`
- 傳入 `showMessage(message, 'success', cb, shortfallHTML)`

**關鍵搜尋詞**：`buildShortfallHTML`、`extraHTML`、`showMessage.*extraHTML`

---

## 面額選擇預設按鈕（2026-03-27）

**需求**：選擇位數後，「💰 面額選擇 (可多選)」下方第一列新增「⭐ 預設（依位數自動選擇）」按鈕，樣式同 `selection-btn`，點選後不刷新頁面，直接更新面額按鈕選中狀態。

**預設面額對應表**：

| 位數 | 預設面額 |
|------|---------|
| 1位數 | 1元、5元 |
| 2位數 | 1元、10元、50元 |
| 3位數 | 10元、100元、500元 |
| 4位數 | 100元、500元、1000元 |

**`applyDefaultDenominations()`**：
1. 讀取 `settings.digits` → 查 `presets` 表
2. 更新 `state.settings.denominations`
3. `querySelectorAll('[data-type="denomination"]')` 遍歷全部面額按鈕，`classList.toggle('active', defaults.includes(val))` 直接切換選中狀態（不重繪頁面）

**關鍵搜尋詞**：`applyDefaultDenominations`、`denomination.*preset`

---

## 面額預設鈕記憶 + 位數連動（2026-03-27）

**需求**：選擇 ⭐ 預設後，再切換位數時面額自動更新為新位數的預設組合；手動改動面額後取消連動。

**實作**：`state.settings.usingPreset` flag（初始 `false`）。

- `applyDefaultDenominations()`：套用預設後設 `usingPreset = true`，`#c5-preset-denom-btn` 加 `active`
- denomination 點擊：設 `usingPreset = false`，移除按鈕 `active`
- digits 切換：若 `usingPreset && value !== 'custom'`，自動呼叫 `applyDefaultDenominations()`

**關鍵搜尋詞**：`usingPreset`、`c5-preset-denom-btn`

---

## 困難模式提示鈕加語音（2026-03-27）

**需求**：困難模式按下提示鈕，顯示目前總額的同時播放語音，行為同普通模式。

**修改位置**：`setupHardModeEventListeners()` 困難模式提示鈕 click handler 的「顯示總額」分支，加入：

```javascript
if (this.speech && typeof this.speech.speak === 'function') {
    const traditionalTotal = currentTotal === 0 ? '零元' : this.speech.convertToTraditionalCurrency(currentTotal);
    this.speech.speak(`目前總額是${traditionalTotal}`, { interrupt: true });
}
```

普通模式已有相同邏輯（`setupNormalModeEventListeners`），困難模式補齊。

**關鍵搜尋詞**：`setupHardModeEventListeners`、`困難模式：顯示總額`、`convertToTraditionalCurrency`

---
