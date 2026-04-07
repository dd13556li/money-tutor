# C6 找零 — 單元開發經驗報告書

> **日期**：2026-02-09
> **時間**：下午
> **更新日期**：2026-04-07（反復測試錯誤語音精簡）、2026-03-30（題目框新增🔊朗讀按鈕；刪除｜分隔符；已付顯示移至下列）、2026-03-27（設定頁我的錢包新增🎲隨機選項）、2026-03-14（輔助點擊重複進題修復 + 過渡語音串接 + 設定頁說明更新）
> **單元名稱**：C6 找零與計算（Making Change）
> **系列**：C 貨幣認知

---

## 一、基本資訊

### 檔案清單

| 類型 | 檔案路徑 | 說明 |
|------|---------|------|
| HTML | `html/c6_making_change.html` | 主頁面（83 行，含點擊放置 CSS） |
| JS | `js/c6_making_change.js` | 主邏輯（10,490 行，C 系列最大檔案） |
| CSS | `css/unit6.css`、`css/ai-theme.css`、`css/dark-theme.css`、`css/common-modal-responsive.css` | 共用樣式 |
| 作業單 | `worksheet/units/c6-worksheet.js` | 作業單產生器（217 行） |
| 共用工具 | `js/number-speech-utils.js`、`js/audio-unlocker.js`、`js/reward-launcher.js`、`js/theme-system.js`、`js/mobile-debug-panel.js`、`js/touch-drag-utility.js` | 各項支援模組 |
| 圖片 | `images/money/*_yuan_front.png`、`*_yuan_back.png` | 7 種面額正反面共 14 張 |
| 音效 | `audio/drop-sound.mp3`、`audio/error.mp3`、`audio/error02.mp3`、`audio/correct.mp3`、`audio/success.mp3`、`audio/click.mp3`、`audio/select.mp3` | 放置/錯誤/錯誤02/答對/完成/點擊/選擇音效（7 種） |

### 外部依賴

- **canvas-confetti** (`cdn.jsdelivr.net/npm/canvas-confetti@1.9.2`)：完成畫面與步驟轉場煙火動畫
- **TouchDragUtility** (`js/touch-drag-utility.js?v=2.1`)：行動裝置觸控拖曳支援
- **NumberSpeechUtils** (`js/number-speech-utils.js`)：中文貨幣語音轉換

---

## 二、單元特色

### 2.1 核心玩法：兩階段找零練習

C6 是 C 系列的最終單元，綜合了付款與找零兩個階段。每一題包含：

**Step 1 — 付款階段**：
- 系統展示商品（emoji + 名稱 + 價格）和錢包中的金錢
- 學生將錢幣/紙鈔從「我的錢包」拖曳到「付款區」
- 系統具備**智慧超額付款判斷**（移植自 A4），當使用者超額付款但有更好組合時，會以紅色 × 動畫標記多餘金錢、綠色 ✓ 動畫標記最佳組合

**Step 2 — 找零驗證階段**（依難度模式而異）：
- **簡單模式**：店家找零區展示零錢硬幣/紙鈔，學生需逐一拖曳到「我的錢包」中，錢包內有半透明「鬼影」提示正確位置
- **普通模式**：三選一選擇題，從三個金錢組合中選出正確找零金額
- **困難模式**：手動計算輸入（含內建計算機工具），答對後再進入三選一選擇題

### 2.2 三種難度模式（Step 2 完全分離）

| 特性 | 簡單 | 普通 | 困難 |
|------|------|------|------|
| Step 1 付款 | 拖曳付款，淡化提示鬼影 | 拖曳付款，無提示鬼影 | 同普通模式 |
| Step 1 語音 | 每次拖入播報累計金額 | 每次拖入播報累計金額 | 無語音，顯示 ??? |
| Step 2 類型 | 拖曳收集找零硬幣 | 三選一選擇題 | 計算輸入 → 三選一選擇題 |
| Step 2 提示 | 錢包鬼影 + 累計金額 | 💡 提示按鈕（顯示各選項金額） | 🧮 計算機工具 |
| 答錯處理 | 不存在（拖曳完成即正確） | 可重複選擇 / 單次作答 | 錯誤 3 次顯示正確答案 |
| 測驗模式 | 不適用 | repeated / single | 不適用（固定流程） |

### 2.3 配置驅動價格生成系統（ModeConfig + PriceStrategy）

沿用 C5 的增強型價格策略系統：

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

**PriceStrategy 確定性隨機**：使用 `seededRandom(seed)` 基於 `Math.sin(seed)` 的偽隨機數產生器，種子由 `sessionSeed + rangeSum + itemId + difficulty` 計算。

### 2.4 錢包金額制度

C6 使用「錢包金額」決定付款上限，不同於 C5 的面額選擇：

| 錢包金額 | 可購買範圍 | 生成邏輯 |
|---------|-----------|---------|
| 10 元 | 1-9 元 | 30%-90% × 錢包金額 |
| 50 元 | 15-45 元 | 同上 |
| 100 元 | 30-90 元 | 同上 |
| 500 元 | 150-450 元 | 同上 |
| 1000 元 | 300-900 元 | 同上 |
| 自訂金額 | 自訂範圍 | DP 相容性檢查 |

### 2.5 雙層物品系統

C6 擁有兩套物品資料庫：

**簡單物品資料庫**（`items`，實際遊戲使用）：
- 玩具類（5 個）：🧸 玩偶、🪀 陀螺、🎮 遊戲機、🪁 風箏、🤖 機器人
- 食物類（5 個）：🍪 餅乾、🧃 果汁、🍭 棒棒糖、🍞 麵包、🥛 牛奶
- 文具類（5 個）：✏️ 鉛筆、📏 尺、📎 迴紋針、🖍️ 蠟筆、📘 筆記本

**複雜物品資料庫**（`purchaseItems`，用於 DP 相容性驗證）：
- 4 個位數層級 × 3-4 類型 × 3 物品 = 48+ 個物品
- 與 C5 共用結構，在 `gameData` 和 `initGameData()` 中**重複定義**

### 2.6 智慧付款判斷系統（A4 移植）

`findOptimalReturnMoney()` 使用 **2^n 子集列舉**找出最佳退回組合：
- 列舉付款區所有金錢的子集
- 找到總額 = 溢付金額的最小子集
- 將該子集金錢以紅色 × 動畫退回錢包
- 同時以綠色 ✓ 動畫標記最佳付款組合
- `calculateOptimalPayment()` 使用 DP 求精確付款方案，若無解則退回 greedy 最小找零方案

### 2.7 內建計算機（困難模式）

困難模式 Step 2 提供全功能四則運算計算機：
- 深色主題面板（`#2d3748` 背景）
- 表達式顯示列 + 結果顯示列
- 4×N 按鈕格：數字 0-9、+、-、×、÷、C（清除）、=（計算）
- 支援連續計算和表達式顯示
- 可透過按鈕切換顯示/隱藏

### 2.8 作業單系統（c6-worksheet.js）

| 題型 | 描述 | 答案呈現 |
|------|------|---------|
| `fill` | 數字填空（「應該找回 ____ 元」） | 紅色粗體數字 |
| `coin-select` | 3 個金錢圖示組合選擇題 | 正確選項紅色邊框 |
| `hint-select` | 3 個金錢圖示 + 灰色金額提示 | 正確選項紅色邊框 |
| `hint-complete` | 填寫各面額數量（___ 個 50 元硬幣...） | 紅色粗體數量 |

工具列配置：
- **錢包金額**：modal 多選（50/100/200/500/隨機）
- **圖示類型**：cycle 切換（真實正面/反面/正反面/金錢符號）
- **測驗題型**：cycle 切換（4 種題型）

---

## 三、技術重點

### 3.1 整體架構

```
DOMContentLoaded
  └→ let Game = { ... }   // 全域遊戲物件（10,233 行）
       ├── Debug               // 除錯系統（行動端觸控追蹤）
       ├── state               // 狀態管理
       │   ├── settings        // 設定（walletAmount, difficulty, mode, itemTypes, questionCount）
       │   ├── gameState        // 遊戲狀態（questions[], currentIndex, correctCount, totalChangeCollected）
       │   └── quiz             // 測驗追蹤（answered[], correct[], startTime, currentStep）
       ├── items               // 簡單物品資料庫（3 類 × 5 個）
       ├── audio               // 音效系統（7 種音效）
       ├── speech              // 語音系統（Web Speech API）
       ├── ModeConfig          // 難度配置（3 級）
       ├── PriceStrategy       // 價格策略（確定性隨機）
       ├── gameData            // 複雜物品 + 面額定義
       ├── showSettings()      // 設定頁面
       ├── generateQuestion()  // 題目生成
       ├── renderEasyMode()    // 簡單模式 Step 1 渲染
       ├── renderNormalMode()  // 普通模式 Step 1 渲染
       ├── renderHardMode()    // 困難模式 Step 1 渲染（委派至 renderNormalMode）
       ├── confirmC6Payment()  // Step 1 確認付款（3 步驗證流程）
       ├── renderC6Step2()         // 簡單模式 Step 2（拖曳找零）
       ├── renderC6NormalStep2()   // 普通模式 Step 2（三選一）
       ├── renderC6HardModeStep2() // 困難模式 Step 2（計算 + 三選一）
       ├── showResults()       // 完成畫面
       └── CSS 函數群           // 8 個 CSS 函數
```

### 3.2 兩階段遊戲流程

```
showSettings() → startQuiz() → loadQuestion()
                                    ↓
                    ┌── renderEasyMode()
                    ├── renderNormalMode()      ← Step 1 付款階段
                    └── renderHardMode()
                                    ↓
                          confirmC6Payment()
                    ┌── 不足 → 退回重試
                    ├── 超額但有更好組合 → 退回多餘金錢，標示最佳組合
                    └── 足額/接受超額 → proceedToStep2()
                                    ↓
                    ┌── renderC6Step2()           ← 簡單模式：拖曳收集找零
                    ├── renderC6NormalStep2()     ← 普通模式：三選一
                    └── renderC6HardModeStep2()   ← 困難模式：計算 → 三選一
                                    ↓
                         nextQuestion() / showResults()
```

### 3.3 確認付款三步驟驗證（confirmC6Payment）

1. **不足檢查**：付款總額 < 商品價格 → 語音提示「不夠」，返回繼續付款
2. **智慧超額檢查**（`findOptimalReturnMoney`）：付款總額 > 商品價格，且存在更好組合 → 退回多餘金錢（紅色 ×），標記最佳組合（綠色 ✓）
3. **成功流程**：付款足額（精確或可接受的超額） → confetti 煙火 → 語音播報 → `proceedToStep2()`

### 3.4 找零選項生成（generateC6ChangeOptions）

普通/困難模式 Step 2 的三選一選項生成：
- 1 個正確選項：使用 `generateChangeMoney()` 分解正確找零金額
- 2 個錯誤選項：在正確金額基礎上加減隨機偏移量（1 ~ max(5, 30% × correctAmount)）
- 若 20 次嘗試仍不足 3 個選項，使用 `correctAmount + index * 3` 作為 fallback

### 3.5 DP 相容性驗證系統

與 C5 共用同一套 DP 驗證架構：
- `generatePossibleAmounts()`：使用 2D `Uint16Array` + 30 枚硬幣上限的動態規劃
- `checkItemCompatibility()`：帶快取機制（`compatibilityCache`）
- `checkCustomAmountCompatibility()`：驗證自訂金額是否能生成有效題目
- `getAvailableItemTypes()`：根據錢包金額嚴格篩選可用物品類型

### 3.6 CSS 架構（8 個內嵌函數）

| 函數 | 行數 | 用途 |
|------|------|------|
| `getCommonCSS()` | ~300 行 | 共用基礎樣式（設定頁、標題列、按鈕） |
| `getEasyModeCSS()` | ~60 行 | 簡單模式 Step 1 背景與物品區 |
| `getC6EasyModeCSS()` | ~300 行 | 簡單模式 Step 2（購買資訊、找零區、錢包區） |
| `getNormalModeCSS()` | ~90 行 | 普通模式 Step 1（含內聯總額動畫） |
| `getC6NormalStep2CSS()` | ~350 行 | 普通模式 Step 2（選項卡片、勾叉動畫） |
| `getCalculationModalCSS()` | ~410 行 | 計算彈窗 + 數字鍵盤 + 計算機面板 |
| `getHardModeCSS()` | ~200 行 | 困難模式 Step 1（含 ??? 問號動畫） |
| `getC6HardModeStep2CSS()` | ~500 行 | 困難模式 Step 2（計算輸入 + 計算機 + 響應式） |

總計超過 **2,200 行 CSS** 內嵌於 JS 函數中。

---

## 四、語音系統

### 4.1 語音選擇策略

```javascript
speech: {
    synth: window.speechSynthesis,
    voice: null,
    init() {
        // 優先順序：HsiaoChen > Google 國語 > 含 zh-TW（排除 Hanhan）
    }
}
```

排除 `Hanhan` 語音（發音品質差）。

### 4.2 語音使用場景

| 場景 | 觸發函數 | 內容範例 |
|------|---------|---------|
| Step 1 拖曳付款 | `updateC6Payment()` | 「目前放入 壹佰伍拾 元」 |
| Step 1 付款提示 | `showC6PaymentHint()` | 「最佳付款方式：壹佰元 壹張、伍拾元 壹個」 |
| Step 1 付款不足 | `confirmC6Payment()` | 「錢不夠，請再放入一些」 |
| Step 1 付款成功 | `confirmC6Payment()` | 「付款 壹佰元，商品 陸拾伍元，找零 參拾伍元」 |
| Step 2 找零拖曳 | `playChangeSpeech()` | 「伍拾元，目前找回 伍拾元」（累計追蹤） |
| Step 2 找零完成 | `checkC6ChangeComplete()` | 「找零正確！全部 參拾伍元 收好了」 |
| Step 2 選擇正確 | `selectC6ChangeOption()` | 「答對了！找零金額是 參拾伍元」 |
| Step 2 選擇錯誤 | `selectC6ChangeOption()` | 「這不是正確的找零金額，請再想想」 |
| Step 2 計算正確 | `setupC6HardModeStep2Listeners()` | 「計算正確！找零是 參拾伍元」 |
| 完成畫面 | `speakResults()` | 「恭喜完成！答對 N 題，正確率 X%」 |

### 4.3 NumberSpeechUtils 整合

透過 `convertToTraditionalCurrency()` 將數字轉為中文金額語音：
```javascript
speak(text, options) {
    // ... 安全檢查（synth 存在、voice 載入）
    // 取消前一句語音（interrupt 模式）
    // 支援 callback 在語音結束後執行
}
```

### 4.4 找零累計語音播報（playChangeSpeech）

簡單模式 Step 2 的特有機制：
- `state.gameState.totalChangeCollected` 追蹤已收集的找零累計金額
- 每次拖曳一枚找零硬幣時播報「[面額]元，目前找回 [累計]元」
- 完成全部找零後自動播報完成訊息

---

## 五、觸控與桌面支援

### 5.1 三組獨立的拖曳註冊

C6 需要比 C5 更多的拖曳註冊，因為有雙向和多階段拖曳：

| 註冊 | 來源 | 目標 | 使用階段 |
|------|------|------|---------|
| 桌面 Drag & Drop | `.wallet-money` | `#payment-zone-area` | Step 1 付款 |
| 桌面 Drag & Drop | `.payment-money` | `#my-money-area` | Step 1 退回 |
| 桌面 Drag & Drop | `.change-money` | `.my-wallet-container` | Step 2 找零收集 |
| TouchDragUtility | `.money-item[draggable]` | `#payment-zone-area` | Step 1 付款 |
| setupC6TouchDragSupport | `.change-money` | `.my-wallet-container` | Step 2 找零收集 |

### 5.2 點擊放置系統（雙擊機制）

除拖曳外，C6 支援**雙擊放置**操作：
- 第一次點擊：選擇金錢（綠色邊框 + 發光 CSS `selected-item`）
- 第二次點擊（`doubleClickDelay` 時間內）：執行放置動作
- `handleClickToReturn()`：在付款區點擊金錢可取回至錢包，使用 `insertMoneyInOriginalPosition()` 按面額排序插入

### 5.3 CSS 觸控優化

```css
html, body, #app {
    overscroll-behavior-y: contain;  /* 禁用下拉重新整理 */
}
.money-item {
    cursor: pointer !important;       /* 行動端手指圖示 */
    -webkit-user-select: none;        /* 禁止文字選取 */
    touch-action: none;               /* 禁止瀏覽器手勢 */
}
```

### 5.4 音頻解鎖

依賴 `audio-unlocker.js` 在使用者首次互動時解鎖 iOS/Android 音頻播放限制。

---

## 六、版面設計

### 6.1 三階段畫面

#### 設定頁面（showSettings）

7 個設定群組（縱向堆疊）：
1. **難度選擇**：簡單/普通/困難（3 按鈕）
2. **錢包金額**：10/50/100/500/1000/自訂（6 按鈕，自訂有即時 input）
3. **物品類型**：按位數層級分組的多選按鈕，含「全選」/「取消全選」
4. **題數選擇**：5/10/15/20/自訂（5 按鈕）
5. **測驗模式**：反覆作答/單次作答（2 按鈕）
6. **獎勵系統**：開啟獎勵系統連結
7. **作業單**：開啟作業單連結

事件處理使用 `bindSettingEvents()` 中的事件委派模式（`click` 代理到 `#app`）。

#### Step 1 付款頁面

- **標題列**：「🧮 C6 找零與計算」 + 題數進度（`N/M`）+ 🎁 獎勵按鈕 + 返回設定按鈕
- **商品展示**：大型 emoji（5em）+ 名稱 + 價格標籤
- **我的錢包**：橘黃色漸層背景 + 綠色虛線邊框，金錢卡片可拖曳
- **付款區域**：淺灰背景 + 虛線邊框，拖入金錢後動態顯示
- **確認按鈕**：灰色（disabled）→ 綠色漸層（有金錢時啟用）
- **簡單模式額外**：付款區內有半透明「鬼影」提示最佳付款組合

#### Step 2 找零頁面（依模式分離）

**簡單模式**（`renderC6Step2`）：
- 購買資訊區（白色卡片）：商品 + 價格 + 付款 - 價格 = 找零 公式
- 店家找零區（灰色背景）：系統放置的找零硬幣，可拖曳到錢包
- 我的錢包區（橘黃漸層 + 綠色虛線）：目標拖放區域 + 累計金額顯示
  - 預設有半透明鬼影（`wallet-target.faded`），拖入正確硬幣後亮起（`lit-up`）

**普通模式**（`renderC6NormalStep2`）：
- 找零題目區（紫色漸層背景）：標題 + 大字金額動畫（`pulse` 動畫 3em 金色字）
- 選項區（白色背景）：3 張選項卡片並排
  - 每張卡片：金錢圖片 + 面額標籤
  - 正確選擇：綠色漸層背景 + 圓形綠色 ✓ 彈出動畫（`checkmarkPop`）
  - 錯誤選擇：粉紅漸層背景 + 圓形紅色 ✗ 彈出動畫（`crossPop`）
- 💡 提示按鈕：點擊顯示各選項的金額數字

**困難模式**（`renderC6HardModeStep2`）：
- 計算頁面：公式展示（付款金額 - 商品價格 = ？）+ 數字輸入框
- 計算機面板（可收合）：深色主題、4×N grid 按鈕、表達式 + 結果雙顯示列
- 錯誤 3 次自動顯示正確答案
- 計算正確後進入三選一選擇題（同普通模式 Step 2）

#### 完成畫面（displayResultsWindow）

統一 C/F 系列完成畫面格式：
- 紫色漸層背景（`#667eea → #764ba2`）
- 🏆 獎盃彈跳動畫
- 表現徽章（≥90%/70%/50%/<50%）
- 三統計卡片：答對題數、正確率、完成時間
- 🎁 獎勵系統粉紅按鈕
- 「再玩一次」綠色按鈕 + 「返回設定」紫色按鈕
- confetti 煙火動畫

### 6.2 響應式設計

各 CSS 函數均包含 `@media (max-width: 768px)` 響應式斷點：
- 選項卡片從水平排列改為垂直堆疊
- 金額文字縮小
- 計算機按鈕縮小（padding 從 20px → 15px）
- 數字鍵盤最大寬度 350px

---

## 七、注意事項

### 7.1 兩階段流程的狀態管理

Step 1 → Step 2 轉場時需保留的關鍵狀態：
- `currentQuestion.price`（商品價格）
- `currentQuestion.walletAmount`（付款金額 = 用戶實際付的總額）
- `currentQuestion.change`（找零金額 = 付款 - 價格）
- `currentQuestion.changeHint`（找零硬幣組合提示）
- `state.gameState.totalChangeCollected`（簡單模式累計找零追蹤）

Step 2 完成後需重置 `totalChangeCollected = 0` 再載入下一題。

### 7.2 智慧超額付款的指數時間風險

`generateMoneyCombinations()` 使用 2^n 子集列舉，當付款區硬幣數量 > 20 時可能造成效能問題。雖然實際遊戲中硬幣數量不太可能超過 15 枚，但缺乏硬性上限保護。

### 7.3 CSS 命名空間混用

C6 的 CSS 類別同時存在 `unit5-*`（從 C5 複製）和 `c6-*`（C6 新增）兩套命名：
- Step 1：`unit5-easy-layout`、`unit5-normal-layout`、`unit5-hard-layout`（沿用 C5）
- Step 2：`c6-step2-container`、`c6-purchase-info`、`c6-change-area`（C6 新增）
- 選項系統：`change-option`、`change-question-area`（C6 獨有）

### 7.4 錢包金額與找零的關係

錢包金額決定找零上限。例如錢包 100 元，最大商品價格 90 元（90% × 100），最大找零 = 100 - 30 = 70 元（最低價格 30% × 100 = 30 元）。自訂金額模式需通過 DP 相容性檢查。

### 7.5 困難模式的雙重 Step 2

困難模式 Step 2 實際上是兩個子步驟：
1. 計算輸入（填入正確找零金額）
2. 計算正確後觸發 `renderC6NormalStep2()` 進入三選一選擇題

這意味著困難模式的一道題需要完成 3 個步驟（付款 → 計算 → 選擇），開發或修改時需注意完整流程。

### 7.6 狀態管理現況

| 項目 | 狀態 |
|------|------|
| 統一重置函數 | ✅ `resetGameState()` |
| 布林旗標 | `loadingQuestion` |
| 重置位置 | 集中（2 處調用） |
| 評價 | ✅ **最佳實踐** |

**說明**：C6 已實現統一的 `resetGameState()` 函數，在 `showSettings()` 和 `startQuiz()` 中調用，集中管理所有遊戲狀態的重置

**重置項目**：`quiz` 物件、`loadingQuestion`、`compatibilityCache`、`clickState` 物件

**搜尋關鍵字**：`resetGameState`

---

## 八、潛在 Bug 與程式碼品質檢測

### Bug #1：startSystemMonitoring() 的 setInterval 未清除（記憶體洩漏）

`startSystemMonitoring()` 呼叫 `setInterval(fn, 60000)` 每分鐘監控系統狀態，但：
- 沒有儲存 interval ID
- 沒有清除機制（切換頁面、結束遊戲時不會停止）
- 「再玩一次」會呼叫 `Game.init()` 再次觸發，累積多個 interval

與 C5 的 Bug #1 完全相同。

### Bug #2：purchaseItems 重複定義

`purchaseItems` 在兩處完整定義：
1. `gameData` 物件屬性（初始定義）
2. `initGameData()` 方法內（完全覆蓋）

兩份定義內容相同，浪費約 300 行程式碼。`initGameData()` 的覆蓋讓第一份定義完全無用。

### Bug #3：PriceStrategy.resetSession() 日誌訊息錯誤

```javascript
console.log(`🔄 [C5-價格策略] Session已重置`);
```
應為 `[C6-找零]`。這是從 C5 複製時的遺留錯誤。

### Bug #4：Debug 系統日誌標記錯誤

多處日誌使用 C5 的標記：
- `Debug.logPlacementDrop` 註解：「C5專用放置框檢測」
- `setupTouchDragSupport()`：「[C5-足夠支付]」
- `setupClickEventListeners()`：「[C5點擊除錯]」
- `handleMoneyClick()`：「[C5點擊除錯]」
- `handleClickToPlace()`：「[C5點擊除錯]」
- `handleClickToReturn()`：「[C5點擊除錯]」
- `insertMoneyInOriginalPosition()`：「[C5位置修復]」
- `checkPaymentCompletion()`：「[C5點擊除錯]」

共計 **20+ 處** C5 標記出現在 C6 程式碼中。

### Bug #5：Legacy 事件監聽函數殘留

以下函數保留了 C5 風格的「夠/不夠」判斷系統，與 C6 的找零邏輯無關：
- `setupEasyModeEventListeners()`：綁定 `enough-btn`/`not-enough-btn`
- `setupNormalModeEventListeners()`：同上 + 提示按鈕
- `setupHardModeEventListeners()`：同上
- `handleJudgment(isEnough)`：C5 的「足額判斷」邏輯
- `verifyDOMElements()`：驗證 `enough-btn`/`not-enough-btn` 是否存在

這些函數在 C6 中**未被使用**（C6 使用 `setupC6Step1EventListeners` 和 `confirmC6Payment`），但佔用約 600 行程式碼。

### Bug #6：findAllCombinations() 指數時間風險

`findAllCombinations()` 使用回溯法列舉所有金錢組合，上限 30 枚硬幣。當面額選擇多、金額大時，搜尋空間可能爆炸。雖有 `maxResults: 1000` 限制，但在特定參數下仍可能造成 UI 凍結。

### Bug #7：updatePaymentTotal() 使用 legacy 選擇器

`updatePaymentTotal()` 使用 `#payment-zone-area .money-item` 計算總額，但部分模式的付款區 ID 可能不同。此函數同時存在於 legacy 區段和主流程中，可能造成混淆。

### Bug #8：showCustomQuestionInput() 使用 prompt()

```javascript
showCustomQuestionInput() {
    const input = prompt('請輸入自訂題數 (1-50):');
    // ...
}
```
使用原生 `prompt()` 而非自訂 UI，與整體設計風格不一致，且在行動裝置上體驗較差。

### Bug #9：簡單模式 Step 2 找零完成檢查的時序

`checkC6ChangeComplete()` 使用 DOM 查詢計算已收集的找零數量。若拖曳動畫尚未完成就觸發檢查，可能導致提前或延遲判斷。

### Bug #10：console.log 無全域開關 ✅ 已修正

~~全檔約 150+ 處 `console.log`/`console.error` 呼叫，無全域 debug 開關。生產環境會輸出大量除錯訊息。~~

**修正**（2026-02-19）：實作 `Game.Debug` FLAGS 分類開關系統，503 處 console 呼叫全部轉換為 `Game.Debug.log/warn/error`。詳見「十二、重構記錄」。

---

## 九、未來開發建議

### 9.1 清除 Legacy 程式碼

刪除約 600 行 C5 風格的遺留函數（`setupEasyModeEventListeners`、`setupNormalModeEventListeners`、`setupHardModeEventListeners`、`handleJudgment`、`verifyDOMElements`），可將檔案大小減少 ~6%。

### 9.2 合併重複的 purchaseItems 定義

只保留 `initGameData()` 中的定義（因為它會覆蓋初始值），或只保留 `gameData` 中的初始定義並移除 `initGameData()` 中的覆蓋，可減少 ~300 行。

### 9.3 統一 CSS 命名空間

將所有 `unit5-*` 類別重命名為 `c6-*` 或 `unit6-*`，避免語意混淆。

### 9.4 修正所有 C5 日誌標記

使用全域搜尋替換 `[C5` → `[C6`、`C5專用` → `C6專用`、`C5-足夠支付` → `C6-找零`。

### 9.5 CSS 外部化

2,200+ 行的內嵌 CSS 可抽取至 `css/c6_making_change.css`（目前此檔案存在但未被引用，可重新利用）。

### 9.6 子集列舉加上硬性上限

`generateMoneyCombinations()` 應檢查 `paymentMoney.length`，若 > 20 則 fallback 至 greedy 演算法，避免 2^20+ 的效能風險。

### 9.7 startSystemMonitoring() 清除機制

儲存 interval ID 並在 `showResults()`、頁面離開時清除：
```javascript
if (this._monitorInterval) clearInterval(this._monitorInterval);
this._monitorInterval = setInterval(..., 60000);
```

### 9.8 簡化物品系統

考慮統一為單一物品資料庫。目前簡單物品庫用於實際遊戲、複雜物品庫僅用於 DP 驗證，可將驗證邏輯也基於簡單物品庫重寫。

### 9.9 抽取共用模組

C5 和 C6 共用大量程式碼（ModeConfig、PriceStrategy、DP 系統、點擊放置系統、觸控拖曳設置），可抽取為共用模組：
- `js/price-strategy.js`：ModeConfig + PriceStrategy
- `js/money-dp-utils.js`：DP 相容性驗證
- `js/click-placement.js`：點擊放置系統

---

## 十、總結

C6 找零與計算是 C 系列的壓軸單元，以 10,240 行的龐大程式碼量整合了付款（C4/C5 的技能）與找零驗證的雙階段遊戲流程。

**核心亮點**：
1. **兩階段設計**：Step 1 付款 + Step 2 找零驗證，模擬真實購物找零體驗
2. **智慧超額判斷**：移植自 A4 的 2^n 子集列舉，精準標記多餘與最佳付款
3. **三種模式的 Step 2 完全分離**：簡單（拖曳收集）、普通（選擇題）、困難（計算+選擇題），滿足不同學習階段
4. **內建計算機**：困難模式提供全功能四則計算工具
5. **豐富的視覺回饋**：綠色 ✓ / 紅色 ✗ 彈出動畫、累計金額即時顯示、鬼影提示

**主要隱憂**：
1. **大量 C5 複製痕跡**：20+ 處日誌標記、600 行 legacy 函數、CSS 命名空間混用
2. **重複定義**：purchaseItems 完整定義兩次
3. **記憶體洩漏**：startSystemMonitoring 的 setInterval 未清除
4. **檔案過大**：10,240 行含 2,200+ 行內嵌 CSS，建議模組化拆分

### Bug 修正記錄（2026-02-10）

| Bug | 問題 | 修正狀態 |
|-----|------|---------|
| #1 | startSystemMonitoring() setInterval 未清除 | ✅ 儲存 ID + init() 前清除 |
| #2 | purchaseItems 重複定義 | ✅ 刪除初始 gameData 中的重複定義 |
| #3 | PriceStrategy.resetSession() 日誌錯誤 | ✅ [C5-價格策略] → [C6-找零] |
| #4 | Debug 系統 25+ 處 C5 標記錯誤 | ✅ 批量替換為 C6 標記 |
| #5 | Legacy 事件監聽函數殘留 | ✅ 刪除 3 個未使用函數（~98 行） |
| #6 | findAllCombinations() 指數時間風險 | ✅ 加入 MAX_COMBINATIONS=100 限制 |
| #7 | updatePaymentTotal() class selector | ✅ 改用 getElementById |
| #8 | showCustomQuestionInput() 死碼 + alert() | ✅ 刪除死碼 + alert 改 showMessage |
| #9 | checkC6ChangeComplete() 時序問題 | ✅ 加入 requestAnimationFrame |
| #10 | console.log 無全域開關 | ✅ Game.Debug 統一日誌系統（503 處） |

**統計**：潛在 Bug 10 個（全部已修正）

整體而言，C6 功能完整且學習體驗豐富，但作為從 C5 大量延伸的單元，累積了顯著的技術債務。經 Bug 修正後，已清理 legacy 程式碼、修正 C5 標記殘留、消除記憶體洩漏和效能風險。剩餘建議為模組化抽取共用邏輯。

---

## 十一、驗證記錄

### 2026-02-16：系統性驗證

**驗證內容**：

| 項目 | 狀態 | 說明 |
|------|------|------|
| TimerManager | ✅ 已完成 | 40 個 setTimeout 統一管理（2026-02-22 v2.1.0，分類：question/ui/speech/drag） |
| EventManager | ✅ 已完成 | 49 個 addEventListener 統一管理（2026-02-22 v2.1.0，分類：settings/dragSystem/gameUI） |
| injectGlobalAnimationStyles | ✅ 已完成 | 16 個動畫統一注入（2026-02-22，id：c6-global-animations） |
| endGame() | ✅ 正常 | 採用 C/F 系列統一完成畫面樣式 |
| confetti 煙火 | ✅ 正常 | 使用 v1.9.2 本地化版本 |

**建議改進（P1）**：
- ~~引入 TimerManager 統一管理 setTimeout~~ ✅ 已於 2026-02-22 完成
- ~~引入 EventManager 統一管理 addEventListener~~ ✅ 已於 2026-02-22 完成

**結論**：C6 功能正常，記憶體管理標準已達成（TimerManager 40個 + EventManager 49個 + injectGlobalAnimationStyles 均已實作）。

---

## 十二、重構記錄

### 2026-02-17：狀態管理重構（resetGameState）

**問題**：
- 狀態重置邏輯分散於多個位置
- `quiz`、`clickState`、`loadingQuestion` 等多個狀態需要重置
- 不符合 C1/C2/C4/C5/A4/A5 等單元的最佳實踐

**修改內容**：

1. **新增 `resetGameState()` 函數**
   - 集中管理所有遊戲相關狀態的重置
   - 重置項目：
     - `quiz`：`currentQuestion`, `totalQuestions`, `score`, `questions`, `startTime`, `attempts`
     - `loadingQuestion`：載入鎖定旗標
     - `compatibilityCache`：相容性檢查緩存
     - `clickState`：`selectedItem`, `lastClickTime`, `lastClickedElement`, `doubleClickDelay`
   - 輸出日誌：`🔄 [C6] 遊戲狀態已重置`

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
    this.state.compatibilityCache = {};
    this.clickState = {
        selectedItem: null,
        lastClickTime: 0,
        lastClickedElement: null,
        doubleClickDelay: 500
    };
    console.log('🔄 [C6] 遊戲狀態已重置');
}
```

**修改檔案**：
- `js/c6_making_change.js`

**驗證方式**：
1. 開啟 C6 找零
2. 完成部分測驗後點擊「返回設定」
3. Console 應顯示「🔄 [C6] 遊戲狀態已重置」
4. 重新開始測驗，確認題目從第 1 題開始、分數為 0、點擊狀態清空

### 2026-02-19：Debug Logger 統一日誌系統（Bug #10 修正）

**問題**：
- 全檔約 503 處 `console.log`/`console.warn`/`console.error` 呼叫
- 無全域 debug 開關，生產環境輸出大量除錯訊息
- 原有 `Game.Debug` 系統僅支援單一 `enabled` 開關，無分類控制

**修改內容**：

1. **擴展 Game.Debug FLAGS 系統**
   - 新增 14 個分類開關，取代單一 `enabled` 旗標
   - 所有開關預設 `false`，`error` 永遠顯示
   - 支援 `FLAGS.all = true` 全開模式

2. **FLAGS 分類定義**

   | 分類 | 說明 | 數量 |
   |------|------|------|
   | `all` | 全開/全關主開關 | — |
   | `init` | 初始化流程 | 12 |
   | `speech` | 語音系統 | 23 |
   | `audio` | 音效系統 | 12 |
   | `ui` | UI 渲染 | 32 |
   | `payment` | 付款驗證 | 8 |
   | `change` | 找零計算 | 10 |
   | `drag` | 拖放操作 | 15 |
   | `touch` | 觸控事件 | 1 |
   | `question` | 題目生成 | 17 |
   | `state` | 狀態轉換 | 251 |
   | `wallet` | 錢包操作 | 43 |
   | `hint` | 提示系統 | 25 |
   | `event` | 事件監聽 | 3 |
   | `error` | 錯誤（永遠顯示） | 51 |

3. **方法定義**

   ```javascript
   Game.Debug = {
       FLAGS: { all: false, init: false, speech: false, ... error: true },

       log(category, ...args) {
           if (this.FLAGS.all || this.FLAGS[category]) {
               console.log(`[C6-${category}]`, ...args);
           }
       },

       warn(category, ...args) {
           if (this.FLAGS.all || this.FLAGS[category]) {
               console.warn(`[C6-${category}]`, ...args);
           }
       },

       error(...args) {
           console.error('[C6-ERROR]', ...args);
       }
   };
   ```

4. **轉換統計**

   | 原始 | 轉換後 | 數量 |
   |------|--------|------|
   | `console.log(...)` | `Game.Debug.log('category', ...)` | 427 |
   | `console.warn(...)` | `Game.Debug.warn('category', ...)` | 25 |
   | `console.error(...)` | `Game.Debug.error(...)` | 51 |
   | **總計** | | **503** |

**使用方式**：

```javascript
// 瀏覽器 Console 中執行
Game.Debug.FLAGS.all = true;      // 開啟所有日誌
Game.Debug.FLAGS.speech = true;   // 只開啟語音相關日誌
Game.Debug.FLAGS.payment = true;  // 只開啟付款相關日誌
```

**修改檔案**：
- `js/c6_making_change.js`（第 21-82 行擴展 Debug 物件 + 全檔 503 處取代）

**驗證方式**：
1. 開啟 C6 找零頁面
2. 開啟 DevTools Console
3. 確認 `FLAGS.all = false` 時 Console 乾淨（僅顯示 AudioUnlocker 等外部訊息）
4. 執行 `Game.Debug.FLAGS.speech = true`，確認只顯示語音相關訊息
5. 完整遊玩一輪，確認功能正常

**搜尋關鍵字**：`Game.Debug.FLAGS`、`Game.Debug.log`

### 2026-02-22：動畫定義整合（injectGlobalAnimationStyles）

**問題**：
- 19 處內嵌 @keyframes 分散於 JS 程式碼各處
- 3 組動畫重複定義（fadeIn、shake、totalAmountGlow 各出現 2 次）
- 無法統一管理動畫定義

**修改內容**：

1. **新增 `injectGlobalAnimationStyles()` 函數**
   - 位置：Debug 系統之後、state 物件之前
   - 16 個唯一動畫統一定義
   - 使用 `#c6-global-animations` style ID 避免重複注入

2. **動畫清單（16 個）**

   | 分類 | 動畫名稱 | 用途 |
   |------|---------|------|
   | 訊息動畫 | `messageSlideIn` | 訊息彈窗滑入 |
   | 訊息動畫 | `messageSlideOut` | 訊息彈窗滑出 |
   | 完成畫面 | `fadeIn` | 淡入效果 |
   | 完成畫面 | `celebrate` | 慶祝動畫 |
   | 完成畫面 | `bounce` | 彈跳動畫 |
   | 完成畫面 | `glow` | 發光效果 |
   | 錯誤/正確 | `error-pulse` | 錯誤脈衝 |
   | 錯誤/正確 | `shake` | 搖晃動畫 |
   | 錯誤/正確 | `correct-tick-appear` | 綠色 ✓ 出現 |
   | 金額顯示 | `totalAmountGlow` | 總額發光 |
   | 金額顯示 | `pulse` | 脈衝動畫 |
   | 金額顯示 | `questionPulse` | 問號脈衝 |
   | 找零選項 | `checkmarkPop` | ✓ 彈出 |
   | 找零選項 | `correctPulse` | 正確選項脈衝 |
   | 找零選項 | `crossPop` | ✗ 彈出 |
   | 模態框 | `slideDown` | 下滑動畫 |

3. **移除位置（19 處 → 註解標記）**

   | 原位置 | 動畫 | 替換內容 |
   |--------|------|---------|
   | showMessage() | messageSlideIn/Out | 刪除整個 style 注入區塊 |
   | showResults() | fadeIn/celebrate/bounce/glow | 註解標記 |
   | C6 Step 1 CSS | error-pulse/shake/correct-tick-appear | 註解標記 |
   | getC6NormalStep1CSS() | totalAmountGlow | 註解標記 |
   | getC6NormalStep2CSS() | pulse/checkmarkPop/correctPulse/crossPop/shake | 註解標記 |
   | getCalculationModalCSS() | fadeIn/slideDown | 註解標記 |
   | getC6HardModeStep2CSS() | questionPulse/totalAmountGlow | 註解標記 |

4. **調用位置**
   - `init()` 函數開頭（在第一個 log 之後立即調用）

**重複定義處理**：
- `fadeIn`：2 處 → 合併為 1 個
- `shake`：2 處 → 合併為 1 個
- `totalAmountGlow`：2 處 → 合併為 1 個

**嵌套物件 this.Debug 檢查**：
- ✅ 無問題（C6 沒有 TimerManager/EventManager/SceneConfig 嵌套物件）
- 所有 Debug 呼叫都使用 `Game.Debug.log()` 形式

**修改檔案**：
- `js/c6_making_change.js`
- `CLAUDE.md`（新增修復記錄）
- `C6_Unit_Completion_Report.md`（本文件）

**搜尋關鍵字**：`injectGlobalAnimationStyles`、`c6-global-animations`

**驗證方式**：
1. 開啟 C6 找零遊戲
2. 檢查 DevTools Elements，確認 `<style id="c6-global-animations">` 存在於 `<head>` 中
3. Console 應顯示「🎬 全局動畫樣式注入完成（16 個動畫）」（需開啟 init FLAG）
4. 遊玩各模式，確認動畫正常：
   - 完成畫面：celebrate、bounce、fadeIn、glow
   - 錯誤標記：shake、error-pulse
   - 正確標記：correct-tick-appear、checkmarkPop
   - 錯誤選項：crossPop
   - 金額顯示：pulse、totalAmountGlow、questionPulse
   - 模態框：slideDown、fadeIn

---

## 記憶體管理實作（v2.1.0）

### 實作範圍

| 項目 | 數量 | 說明 |
|------|------|------|
| TimerManager 遷移 | 40 個 | `setTimeout` → `Game.TimerManager.setTimeout` |
| EventManager 遷移 | 49 個 | `addEventListener` → `Game.EventManager.on` |
| clearAll 呼叫點 | 3 個 | `init()` / `showSettings()` / `startQuiz()` |
| 保留 raw setTimeout | 3 個 | speech 子物件（2個）+ TimerManager 內部定義（1個） |
| 保留 raw addEventListener | 4 個 | DOMContentLoaded + EventManager 內部 + window.error × 2 |

### setTimeout 分類

| 分類 | 數量 | 說明 |
|------|------|------|
| `'question'` | 3 | checkEasyModeAutoJudgment、下一題延遲 |
| `'ui'` | 32 | DOM 更新、modal、動畫、dragImg 移除 |
| `'speech'` | 2 | 語音延遲（totalAmountSpeechTimer）|
| `'drag'` | 3 | setupTouchDragSupport 延遲 |

### addEventListener 分類

| 分類 | 數量 | 說明 |
|------|------|------|
| `'settings'` | 5 | startBtn、settingsRewardLink、worksheetLink、setCustomWalletBtn、gameSettings |
| `'dragSystem'` | 22 | dragstart/dragend/dragover/dragleave/drop |
| `'gameUI'` | 22 | click 按鈕、hintMoney、target、completion 連結 |

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

- 作業單連結原本傳遞遊戲設定參數（`walletAmount`, `difficulty`）
- 各作業單已有完整工具列，用戶開啟後可直接在工具列調整；遊戲設定與作業單設定應獨立運作
- **修復**：移除所有多餘參數，統一改為只傳 `unit` 參數，讓作業單完全使用自己的預設値

**修改檔案**：`js/c6_making_change.js`

---

---

### 2026-02-26：觸控拖曳 TypeError 修復 + 完成畫面時間顯示修復

#### Bug 1：觸控拖曳 `setDragImage is not a function` TypeError

**問題描述**：
在行動裝置觸控拖曳時，`TouchDragUtility` 呼叫 `onDragStart` 回調時傳入的是 `TouchEvent`，而非真正的 `DragEvent`。`TouchEvent` 沒有 `dataTransfer` 屬性，因此 `e.dataTransfer.setDragImage(...)` 拋出 `TypeError: e.dataTransfer.setDragImage is not a function`，導致觸控端無法拖曳放置金錢圖示。

**影響位置**（C6，3 處）：

| 位置 | 場景 |
|------|------|
| `setupDraggableCoins()` 付款硬幣拖曳 | 付款區金錢拖曳 |
| `setupDraggableCoins()` 找零硬幣拖曳 | 找零區金錢拖曳 |
| `setupDraggableMoneyItems()` | 練習模式金錢拖曳 |

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

**修改檔案**：`js/c6_making_change.js`

---

---

### 2026-02-26（補充）：步驟2「確認答案」防快速重複點擊

**問題描述**：

全單元防快速重複點擊審查中發現，C6 步驟2 的「確認答案」按鈕（困難模式 `setupC6HardModeStep2Listeners` 與普通模式彈窗 `setupCalculationModalListeners`）click handler 入口**未立即禁用按鈕**：

- 答對時：語音播放期間按鈕仍可點擊，可能重複呼叫 `renderC6NormalStep2`
- 答錯（反復作答）時：`confirmBtn.disabled = true` 在 speech callback（非同步）才執行，語音播放期間快速點擊可導致 `errorCount` 重複累加、重複播放語音

**修改內容**：

兩個 handler 入口各補加兩行防護：

```javascript
if (confirmBtn.disabled) return;  // 防止已禁用時重入
confirmBtn.disabled = true;       // 立即鎖定，阻擋語音播放期間的重複點擊
```

- 答對：按鈕保持禁用，語音播放完畢後進入下一步，流程不受影響
- 答錯（反復模式）：按鈕立即禁用，語音播放完畢後 input 清空，用戶透過 numberpad 輸入新值時 `confirmBtn.disabled = false` 重新啟用
- 答錯（單次模式）：按鈕保持禁用，自動跳下一題，流程不受影響

**修改檔案**：`js/c6_making_change.js`（`setupC6HardModeStep2Listeners` line ~6396、`setupCalculationModalListeners` line ~7095）

---

## 2026-02-27：語音/狀態/計時器綜合修復（第三輪）

### 1. Raw setTimeout 修復

| # | 位置 | 原始 | 修復後 |
|---|------|------|--------|
| 1 | `speech.init()` 延遲初始化 | `setTimeout(() => {...}, 1000)` | `Game.TimerManager.setTimeout(..., 1000, 'speech')` |
| 2 | `speech.init()` 初始化重試 | `setTimeout(() => {...}, 100)` | `Game.TimerManager.setTimeout(..., 100, 'speech')` |
| 3 | `speak()` 安全逾時（10秒） | `setTimeout(safeCallback, 10000)` | `Game.TimerManager.setTimeout(safeCallback, 10000, 'speech')` |

### 2. speak() 缺少 onerror + safeCallback 防護

與 C5 相同問題與修復模式：retry 路徑及主路徑均加入 `callbackExecuted` 旗標，
確保 `utterance.onend` + `utterance.onerror` 不會雙重觸發 callback。

### 3. showResults() 重複呼叫防護

- `resetGameState()` 加入 `this.state.gameCompleted = false`
- `showResults()` 開頭加入守衛旗標檢查（同 C5 模式）

**修改檔案**：`js/c6_making_change.js`

---

### 2026-02-27：confetti setInterval → 遞迴 TimerManager 模式（第二輪）

**問題**：完成畫面煙火效果包在 `Game.TimerManager.setTimeout` 回呼中，但內部的裸 `setInterval` 不受 TimerManager 管理，場景切換時 `TimerManager.clearAll()` 無法中途停止動畫計時器。

**修復**：將 `setInterval` 改為遞迴 `Game.TimerManager.setTimeout(fireConfetti, 250, 'confetti')`，確保 `clearAll()` 或 `clearByCategory('confetti')` 可立即停止動畫。

**修改檔案**：`js/c6_making_change.js`

---

### 2026-02-28
- `init()` æ¸é¤èè¨æå¨æ¹ç¨ `Game.TimerManager.clearByCategory('monitoring')` åä»£ `clearInterval(this.monitoringIntervalId)`
- `startSystemMonitoring()` ç `setInterval(logMemoryUsage, 30000)` æ¹çºéè¿´ `scheduleNext()` ä½¿ç¨ `Game.TimerManager.setTimeout(..., 30000, 'monitoring')`ï¼å¯ç± `clearByCategory('monitoring')` ç«å³åæ­¢
- `startSystemMonitoring()` ä¸­ `window.addEventListener('error', ...)` å `window.addEventListener('unhandledrejection', ...)` æ¹çº `Game.EventManager.on(window, ..., {}, 'monitoring')`ï¼å¯ç± `removeByCategory('monitoring')` æ¸é¤

---

*報告更新時間：2026-02-28*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

## 廢棄程式碼稽核（2026-03-01）

**稽核範圍**：`js/c6_making_change.js`（10,127 行）

### 結論：發現 2 個廢棄函數 stub + 1 個 Debug category 錯誤

| 類型 | 位置 | 內容 | 嚴重性 | 建議 |
|------|------|------|--------|------|
| **廢棄函數 stub** | Line 3191 | `generateSufficientMoney()` — 保留為警告 stub | 中 | 確認無呼叫點後可刪除 |
| **廢棄函數 stub** | Line 3198 | `generateInsufficientMoney()` — 同上 | 中 | 同上 |
| **⚠️ Debug category 錯誤** | Lines 3192, 3199 | `generateSufficientMoney()` 和 `generateInsufficientMoney()` 兩個 stub 使用 `Game.Debug.warn('state', ...)` — 但與題目生成相關，應使用 `'question'` 分類（C5 同名 stub 正確使用 `'question'`） | 中 | 將 `'state'` 改為 `'question'`，保持與 C5 一致 |
| 清理操作注解 | Line 832 | `// 監控系統狀態（清除舊的 monitoring 計時器避免累積）` | 低 | 操作性注解 |
| 操作性注解 | Line 4579 | `Game.Debug.log('state', '✅ [拖放] 已移除綠色勾勾效果')` | 低 | 已整合進 Debug 系統 |
| console.log | Lines 57, 64, 90, 109, 115+ | Debug 系統內部呼叫 | — | 已受 FLAGS 守衛 |

**備注**：`backupCounts` 變數（Lines 5307–5315）雖命名含 "backup"，但為貪心找零算法中的功能性變數，非廢棄程式碼。

### ⚠️ Debug Category 錯誤詳情

C6 的廢棄 stub 使用 `'state'` 分類：
```javascript
generateSufficientMoney(...) {
    Game.Debug.warn('state', '⚠️ generateSufficientMoney 已廢棄，請使用新的面額優先邏輯');
}
```
C5 的對應 stub 正確使用 `'question'` 分類。此錯誤為複製 C5 結構時的貼上失誤，導致開發者啟用 `FLAGS.question = true` 時看不到 C6 的廢棄警告，需啟用 `FLAGS.state = true` 才會出現（與語義不符）。

**修復**：兩處 `'state'` 改為 `'question'`。

**整體評估**：廢棄 stub 為中優先度（確認呼叫點為零後可刪除）；Debug category 錯誤影響開發除錯體驗，建議一併修正。

---

## 跨輪計時器洩漏稽核（2026-03-03）

**稽核背景**：A3 單元曾發現 `speakText()` 10 秒備援計時器在下一輪觸發導致跳輪的 Bug，已對全系列交叉稽核。

**C6 稽核結論：安全（無此問題）**

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

## 輔助點擊重複進題修復（2026-03-14）

### Bug 1：設定 3 題時進入第 2 題，「購買物品」彈窗出現兩次

**根因**：輔助點擊快速放置找零錢幣時，多枚找零幣的放置動作在語音播放完畢前依序完成。每枚找零幣的 `playChangeSpeech()` callback 在 `allLitUp===true` 時，都各自排定 `loadNextQuestion()`（setTimeout 2000ms）。多個 callback 同時觸發，導致 `loadNextQuestion()` 被呼叫兩次，第二次重複渲染彈窗。

**修復**：在找零步驟 2 初始化時新增旗標：

```javascript
this.state.gameState.totalChangeCollected = 0;
this.state.gameState.nextQuestionScheduled = false;  // 防止重複呼叫
```

在 `playChangeSpeech()` 的 `allLitUp` 分支中加守衛：

```javascript
if (allLitUp) {
    if (this.state.gameState.nextQuestionScheduled) return;
    this.state.gameState.nextQuestionScheduled = true;
    // ... 進行語音 + 換題
}
```

### Bug 2：完成一題後未播放過渡語音就直接進入下一題

**問題**：原本完成後等待 2000ms 靜默再呼叫 `loadNextQuestion()`，沒有語音提示。

**修復**：改為 1000ms（等煙火）後朗讀過渡語音，callback 再進題：

```javascript
Game.TimerManager.setTimeout(() => {
    this.state.quiz.score += 10;
    const nextIndex = this.state.quiz.currentQuestion;
    const isLast = nextIndex >= this.state.quiz.questions.length;
    const transitionText = isLast ? '測驗結束' : `進入第${nextIndex + 1}題`;
    this.speech.speak(transitionText, {
        interrupt: true,
        callback: () => { this.loadNextQuestion(); }
    });
}, 1000);
```

最後一題語音「測驗結束」播完後，`loadNextQuestion()` 偵測到無更多題目，顯示結果畫面。

**關鍵搜尋詞**：`nextQuestionScheduled`、`transitionText`、`進入第`、`測驗結束`

---

## 設定頁輔助點擊說明更新（2026-03-14）

C6 具體描述：「拖曳找零錢幣至對應格」（格式同 C4 章節說明）

**關鍵搜尋詞**：`assist-click-group`、`啟用後，只要偵測到點擊`

---

## 設定頁「我的錢包」新增🎲隨機選項（2026-03-27）

### 需求

設定頁面「我的錢包」選項新增「🎲 隨機」，進入測驗後每題錢包金額不同。

### 實作

**設定頁 HTML**（`showSettings()`）：在「自訂」按鈕前插入隨機按鈕：
```html
<button class="selection-btn ${settings.walletAmount === 'random' ? 'active' : ''}"
        data-type="walletAmount" data-value="random">
    🎲 隨機
</button>
```

**`handleSettingSelection()`**：`walletAmount` 型別判斷加入 `'random'`，不執行 `parseInt`：
```javascript
settings[type] = (value === 'custom' || value === 'random') ? value : parseInt(value, 10);
```

選擇隨機時插入提示文字（不重新渲染頁面）：
> 每題將隨機從 10、50、100、500、1000 元中選擇不同錢包金額。

**`autoSetItemTypes()`**：隨機模式等同未選，使用全部 5 種物品類型：
```javascript
const types = (walletAmount && walletAmount !== 'custom' && walletAmount !== 'random')
    ? this.getItemTypesByWalletAmount(walletAmount)
    : ['cheap', 'budget', 'medium', 'pricey', 'premium'];
```

**`generateQuestion()`**：每題獨立隨機抽取錢包金額，並依實際金額決定物品類型：
```javascript
} else if (walletAmount === 'random') {
    const randomWallets = [10, 50, 100, 500, 1000];
    actualWalletAmount = randomWallets[Math.floor(Math.random() * randomWallets.length)];
}
// 物品類型依實際錢包金額
const effectiveItemTypes = (walletAmount === 'random')
    ? this.getItemTypesByWalletAmount(actualWalletAmount)
    : itemTypes;
```

**驗證（`checkStartState` / `startQuiz`）**：允許 `'random'` 通過驗證。

**關鍵搜尋詞**：`walletAmount === 'random'`、`randomWallets`、`effectiveItemTypes`、`c6-random-wallet-hint`

---

## 測驗頁step1 UI 大改版（2026-03-27）

### 需求

1. 商品資訊 + 付款區整合為單一卡片（減少上下距離）
2. 商品圖片改為 180×180px
3. 版面對齊 C5 風格（綠色邊框、自然高度、不強制撐滿）

### 實作

**HTML 結構**（`renderEasyMode` / `renderNormalMode`）：
- 移除原有的「商品資訊卡」與「付款區卡」兩層獨立卡片
- 改為 `item-payment-section` 單一白卡
- 內部：`ip-title-row`（標題置中 + 提示按鈕）+ `item-info-compact`（水平排）+ `#payment-drop-zone` + 確認按鈕

**CSS（`getC6EasyModeCSS()`）**：
- `c6-easy-layout`：`display:flex; flex-direction:column`（維持 sticky title bar）
- `c6-step1-container`：移除 `flex:1`，改 `padding:10px; gap:10px`
- `item-payment-section`：移除 `flex:1`，改自然高度；加 `border:2px solid #4CAF50; padding:20px`
- `#payment-drop-zone`：`flex:1` → `min-height:140px`

**圖片尺寸**：全部 `getItemImg(item, '128px')` → `180px`

**關鍵搜尋詞**：`item-payment-section`、`ip-title-row`、`item-info-compact`、`c6-step1-container`

---

## 找零頁step2 滿版面（2026-03-27）

### 需求

找零頁（step2）水平 + 垂直撐滿版面，商品圖片改 180px。

### 實作

**CSS（`getC6EasyModeCSS()`）**：
```css
.game-container {
    display: flex; flex-direction: column; min-height: 100vh;
}
.c6-step2-container {
    display: flex; flex-direction: column; flex: 1; width: 100%;
    gap: 10px; padding: 8px 12px 12px; box-sizing: border-box;
}
```

**`itemInfoHTML`**（easy/normal/hard 三處）：`getItemImg(item, '3em')` → `180px`，`item-display` div → `item-info-compact`

**關鍵搜尋詞**：`game-container`、`c6-step2-container`、`c6-purchase-info`

---

## 找零金額框垂直距離縮小（2026-03-27）

### 需求

減少「找零金額 N元」框與上下框的垂直距離；找零選項內硬幣更貼近外框。

### 修改（`getC6NormalStep2CSS()` 或 `getC6EasyModeCSS()`）

| CSS 類別 | 變更 |
|---------|------|
| `.change-question-area` | `margin:20px→8px`、`padding:30px→12px 20px` |
| `.change-title` | `font-size:1.8em→1.4em`、`margin-bottom:15px→6px` |
| `.change-amount-highlight` | `padding:20px→8px 20px`、`margin:10px→4px` |
| `.change-options-area` | `padding-top:60px→12px`、`margin` 縮小 |
| `.change-option` | `padding:25px→12px` |

**關鍵搜尋詞**：`change-question-area`、`change-options-area`、`change-option`

---

## 困難模式商品資訊置中 + 找零選項紙鈔放大（2026-03-27）

### 需求

1. 困難模式計算頁「玩具車圖片 435元」水平置中
2. 找零選項紙鈔圖示要明顯大於硬幣

### 實作

**商品置中**：`.item-info-section` 加 `display:flex; flex-direction:column; align-items:center`

**紙鈔圖大小**：`_showChangeQuiz()` 中 `sizeStyle`:
```javascript
const sizeStyle = isBanknote ? 'width: 110px; height: auto;' : 'width: 60px; height: auto;';
```

**關鍵搜尋詞**：`item-info-section`、`sizeStyle`、`isBanknote`

---

## 找零選項均分寬度（2026-03-27）

### 需求

三個找零選項框水平平均分配寬度（不因 max-width 受限）。

### 修改

```css
.change-options { display: flex; gap: 16px; width: 100%; }
.change-option  { flex: 1; min-width: 0; /* 移除 max-width */ }
```

**關鍵搜尋詞**：`change-options`、`change-option`

---

## 題目框新增🔊朗讀按鈕 + 版面調整（2026-03-30）

### 需求

1. 付款頁與找零頁的商品資訊（如「橡皮擦 8元」）右側新增🔊喇叭按鈕，點擊後重播題目語音
2. 刪除商品資訊行中的 `｜` 分隔符號
3. 普通/困難模式「已付: X元」顯示移至商品資訊列下方，自適應寬度並水平置中

### 修改

**`js/c6_making_change.js`**

- 新增 `speakQuestion()` 方法：語音文字 `購買物品，${item.name}共${itemPrice}元，請付錢`
- 5 處 `<span class="iic-price">` 後各加 `<button class="quiz-speak-btn" onclick="event.stopPropagation();Game.speakQuestion()">🔊</button>`
  - 付款步驟：簡單模式（line ~3615）、普通/困難模式（line ~3709）
  - 找零步驟：簡單模式（line ~5765）、普通模式 step2（line ~6164）、困難模式 step2（line ~6474）
- 加 `event.stopPropagation()` 防止點擊冒泡觸發付款確認
- 移除 2 處 `<span class="iic-divider">｜</span>`
- `item-info-compact` CSS 加 `flex-wrap: wrap`，`payment-info-display` 改為外層容器（`width:100%; justify-content:center`）+ 內層 `iic-paid` span 自適應寬度
- `getCommonCSS()` 新增 `.quiz-speak-btn` 樣式

**關鍵搜尋詞**：`speakQuestion`、`quiz-speak-btn`、`iic-divider`、`payment-info-display`、`flex-wrap`

---

---

## 反復測試錯誤語音精簡（2026-04-07）

### 需求

反復測試模式選擇錯誤時，不應播放「進入下一題」等語音，改為精簡的「不對喔，請再試一次」。

### 修改

**`js/c6_making_change.js`**

- `selectC6ChangeOption()` 錯誤分支依 `mode` 拆分：
  - `mode === 'single'`：保留原有雙語音序列（`firstSpeechText` callback → `endingText` callback → `loadNextQuestion()`）
  - `mode !== 'single'`（反復測試）：播放 `'不對喔，請再試一次'`，callback 中移除 `incorrect-selected`、`clicked` class，並重置 `questionAnswered = false`

### 關鍵搜尋詞

`不對喔，請再試一次`、`mode === 'single'`（C6 `selectC6ChangeOption`）
