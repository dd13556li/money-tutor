# C4 正確的金額 — 單元開發經驗報告書

> **日期**：2026-02-09
> **時間**：下午
> **更新日期**：2026-03-14（輔助點擊兩階段流程修復 + hint CSS 修復 + 設定頁說明更新）
> **單元名稱**：C4 正確的金額（Correct Amount）
> **系列**：C 貨幣認知

---

## 一、基本資訊

### 檔案清單

| 類型 | 檔案路徑 | 說明 |
|------|---------|------|
| HTML | `html/c4_correct_amount.html` | 主頁面（109 行，含內嵌點擊選擇/觸控 CSS） |
| JS | `js/c4_correct_amount.js` | 主邏輯（6,073 行） |
| CSS | `css/unit6.css`、`css/ai-theme.css`、`css/dark-theme.css`、`css/common-modal-responsive.css` | 共用樣式 |
| 作業單 | `worksheet/units/c4-worksheet.js` | 作業單產生器（241 行） |
| 共用工具 | `js/number-speech-utils.js`、`js/audio-unlocker.js`、`js/reward-launcher.js`、`js/theme-system.js`、`js/mobile-debug-panel.js`、`js/touch-drag-utility.js` | 各項支援模組 |
| 圖片 | `images/money/*_yuan_front.png`、`*_yuan_back.png` | 7 種面額正反面共 14 張 |
| 音效 | `audio/drop-sound.mp3`、`audio/error.mp3`、`audio/correct02.mp3`、`audio/success.mp3`、`audio/click.mp3`、`audio/select.mp3` | 放置/錯誤/答對/完成/點擊/選取音效 |

### 外部依賴

- **canvas-confetti** (v1.9.2)：完成畫面煙火動畫 — 已改為本地 `js/confetti.browser.min.js`，離線環境可正常使用
- **TouchDragUtility** (`js/touch-drag-utility.js?v=2.1`)：行動裝置觸控拖曳支援

---

## 二、單元特色

### 2.1 核心玩法：拖曳金錢組合

C4 的核心互動是「拖曳金錢到兌換區，湊出目標金額」。學生從「我的金錢區」選擇適當面額的錢幣/紙鈔，拖放到「兌換區」，目標是湊出系統指定的金額。支援桌面端拖曳（HTML5 Drag & Drop API）、行動裝置觸控拖曳（TouchDragUtility），以及雙擊點擊放置三種互動方式。

### 2.2 三種難度模式（完全分離渲染）

| 特性 | 簡單 | 普通 | 困難 |
|------|------|------|------|
| 視覺提示 | 淡化圖示顯示正確組合位置 | 無視覺提示 | 無視覺提示 |
| 語音回饋 | 每次放置後播報累計金額 | 每次放置後播報累計金額 | 無語音回饋 |
| 目前總額 | 即時顯示 | 初始隱藏，點「完成」或「💡 提示」後顯示 | 初始隱藏，點「完成」或「💡 提示」後顯示 |
| 提示按鈕 | 無（視覺提示已足夠） | 有（💡 提示：高亮正確錢幣 + 顯示總額） | 有（💡 提示：高亮正確錢幣 + 顯示總額） |
| 答案判定 | 自動判定（湊滿即正確） | 按「完成」按鈕後判定 | 按「完成」按鈕後判定 |
| 答錯處理 | 不存在（簡單模式不超額） | retry 清空重來 / proceed 0 分進下一題 | retry 清空重來 / proceed 0 分進下一題 |
| 測驗模式 | 不適用（自動完成） | retry / proceed（=single） | retry / proceed（=single） |
| 主題色 | 綠色 (#2ecc71) | 藍色 (#3498db) | 紅色 (#e74c3c) |

### 2.3 簡單模式視覺提示系統

簡單模式的兌換區預先顯示所有需要的錢幣圖示，但以淡化（灰階 + 虛線邊框）狀態呈現。學生拖入正確面額的錢幣後，對應位置的提示會「點亮」（恢復原色 + 綠色邊框光暈）。這個機制類似 C3 的視覺引導系統。

**狀態管理**：使用固定長度陣列 `droppedItems[i]`（與解法陣列長度相同），每個位置初始為 `null`，點亮後記錄 `{ id, value, imageSrc }`。

### 2.4 自訂金額模式

除了標準的 1-4 位數範圍模式外，C4 獨有「自訂金額」功能：
- 使用彈出式數字鍵盤（3×4 網格）輸入 1-9999 之間的目標金額
- 系統自動決定可用面額（`getAutoDenominations()`：選取 ≤ 目標金額的所有標準面額）
- 面額選擇區塊自動隱藏（因為面額由系統決定）
- 每題使用相同目標金額但嘗試不同的組合變化

### 2.5 智能設定驗證系統

C4 具備業界少見的前端設定驗證機制：

1. **面額-位數相容性檢查**：選擇 1 位數時自動禁用 ≥10 元面額，2 位數禁用 ≥100 元面額
2. **組合可行性驗證**：`isValidCombination()` 檢查選定面額能否組成目標範圍內的金額
3. **低組合數量警告**：當有效組合不足 4 種時彈窗提醒
4. **30 硬幣上限提示**：`updateCompatibilityHint()` 檢查最大面額×30 是否足以覆蓋最小目標金額
5. **自訂金額衝突檢查**：添加面額時即時驗證所有選中面額之和是否超過目標金額

### 2.6 目標金額指令彈窗

每題開始時顯示全屏半透明指令彈窗，以 4em 大字體展示「目標金額 X 元」，搭配語音播報「請拿出 X 元」（使用傳統中文貨幣格式），語音結束後延遲 1.5 秒自動關閉彈窗。

### 2.7 批量題目預生成

`generateAllQuestions()` 使用 `async/await` 在遊戲開始前一次生成所有題目，每生成一題就 `await setTimeout(1)` 讓出執行權避免阻塞 UI。生成失敗時顯示友善的錯誤彈窗並返回設定頁。

### 2.8 防重複題目機制

使用 `state.lastTargetAmount` 記錄上一題的目標金額，新題目若與之相同則重新生成（最多重試 10 次），避免連續兩題金額相同。

---

## 三、技術重點

### 3.1 架構概覽

```
Game (全域物件，DOMContentLoaded 中初始化)
├── Debug                    # 除錯系統（手機端拖曳專用日誌）
├── state
│   ├── settings             # 使用者設定（digits, denominations, difficulty, mode, questionCount, customAmount）
│   ├── gameState            # 單題遊戲狀態（targetAmount, currentTotal, droppedItems, sourceCoins）
│   ├── quiz                 # 全局測驗進度（currentQuestion, totalQuestions, score, questions, startTime）
│   ├── clickState           # 雙擊偵測狀態（clickCount, lastClickTime, selectedClickItem）
│   ├── audioUnlocked        # 音頻解鎖狀態
│   └── lastTargetAmount     # 防重複題目
├── clickToMoveConfig        # 三模式的點擊配置（easy/normal/hard）
├── audio                    # 音效系統（drop/error/success）
├── speech                   # 語音系統（Web Speech API）
├── gameData                 # 金錢資料（7 面額的名稱與圖片路徑）
├── init()                   # 進入點
├── showSettings()           # 設定畫面渲染
├── startQuiz()              # 測驗開始（async）
├── generateAllQuestions()   # 批量題目生成
├── generateQuestion()       # 單題生成（位數範圍/自訂金額分派）
├── loadQuestion()           # 載入指定題目 → renderGameBoard
├── renderGameBoard()        # 模式分派 → renderEasyMode / renderNormalMode / renderHardMode
├── displayResultsWindow()   # 完成畫面
└── 各種處理函數...
```

### 3.2 模式完全分離設計

C4 的三個難度模式在渲染和事件處理上完全分離，每個模式擁有獨立的：

- **渲染函數**：`renderEasyMode()` / `renderNormalMode()` / `renderHardMode()`
- **CSS 字串**：`getEasyModeCSS()` / `getNormalModeCSS()` / `getHardModeCSS()`（+ 共用 `getCommonCSS()`）
- **事件綁定**：`setupEasyModeEventListeners()` / `setupNormalModeEventListeners()` / `setupHardModeEventListeners()`
- **拖曳處理**：`handleEasyModeDrop()` / `handleNormalModeDrop()` / `handleHardModeDrop()`
- **觸控設置**：`setupTouchDragForEasyMode()` / `setupTouchDragForNormalMode()` / `setupTouchDragForHardMode()`
- **答案確認**：簡單模式自動檢查 / `handleNormalModeConfirm()` / `handleHardModeConfirm()`
- **答錯處理**：`handleNormalModeIncorrectAnswer()` / `handleHardModeIncorrectAnswer()`
- **清空函數**：`clearEasyModeDropZone()` / `clearNormalModeDropZone()` / `clearHardModeDropZone()`
- **提示函數**：（簡單模式無需）/ `showNormalModeHint()` / `showHardModeHint()`
- **CSS 類別前綴**：`unit4-easy-*` / `unit4-normal-*` / `unit4-hard-*`

### 3.3 題目生成演算法

C4 使用「構建」方法（非搜索方法）生成題目，效率極高：

**位數範圍模式** (`generateDigitRangeQuestion()`):
1. 以所有選定面額各 1 個作為基礎金額
2. 從基礎金額開始，隨機添加額外硬幣直到達到目標範圍
3. 透過改變添加順序（大→小、小→大、隨機）產生不同組合
4. 生成 10-20 個有效目標後隨機輪換

**自訂金額模式** (`generateCustomAmountQuestion()`):
1. 基礎同為所有面額各 1 個
2. 剩餘金額使用貪心算法填充
3. 同樣使用 3 種排列策略產生多種組合變化

**關鍵限制**：硬幣數量上限 30 個（`MAX_COINS = 30`），超過時跳過該組合。

### 3.4 狀態驅動渲染

C4 採用「更新狀態 → 完整重渲染」的模式：
- 每次拖曳/點擊操作先更新 `state.gameState`（currentTotal、droppedItems）
- 然後調用 `render*Mode()` 從狀態完整重建 HTML
- 再調用 `setup*ModeEventListeners()` 重新綁定所有事件
- **sourceCoins 持久化**：來源硬幣資料（含圖片路徑）在第一次渲染時生成並儲存於 `state.gameState.sourceCoins`，後續重渲染使用已儲存的資料，避免圖片閃爍

### 3.5 動態規劃算法

`getMinCoinsForAmount()` 使用經典 DP（動態規劃）硬幣找零算法計算最少硬幣數量，用於設定驗證時的組合搜索。`findAllSolutionsForAmount()` 則使用回溯法搜索所有最少硬幣組合，附帶超時保護（2 秒）和解法數量限制（20 個）。

### 3.6 開發者快捷鍵

內建 Ctrl+T/Y/U/I 快捷鍵可直接觸發 80/100/60/30 分的結果畫面，用於快速測試完成畫面的不同表現評價。

---

## 四、語音系統

### 4.1 語音選擇策略

C4 的 `speech` 物件使用與 F1/C1/C2/C3 相同的語音選擇策略：

1. 優先：`Microsoft HsiaoChen Online`、`Google 國語 (臺灣)`
2. 次選：其他 `zh-TW` 語音（排除 `Hanhan`）
3. 備選：任何 `zh-TW` 語音
4. 容錯：含 `zh` 或 `中文` 或 `Chinese` 的語音
5. 靜音模式：找不到中文語音則進入靜音模式（`voice = null`，`isReady = true`）

### 4.2 語音初始化

- 最多重試 5 次（每次間隔 500ms）
- `onvoiceschanged` 事件監聽 + 額外 1000ms 延遲重試
- 手機端語音列表為空時，進入靜音模式而非無限等待

### 4.3 安全機制

- **音頻解鎖檢查**：`speak()` 先檢查 `Game.state.audioUnlocked`，未解鎖則跳過
- **語音中斷**：`interrupt` 參數控制是否 `synth.cancel()` 停止上一段語音
- **安全回調**：`callbackExecuted` 防止重複觸發，10 秒超時強制執行
- **onerror 處理**：語音播放錯誤時仍觸發 callback

### 4.4 NumberSpeechUtils 整合

C4 的 `speech.convertToTraditionalCurrency()` 委派給 `NumberSpeechUtils.convertToTraditionalCurrency()`，確保金額語音遵循「2」的正確發音規則。

### 4.5 語音使用場景

| 場景 | 語音文字 | 模式 |
|------|---------|------|
| 每題開始 | 「請拿出 X 元」（傳統中文格式） | 全部 |
| 拖曳放置 | 「總共 X 元」 | 簡單 |
| 拖曳放置 | 「現在總共是 X 元」 | 普通 |
| 拖曳放置 | （無語音） | 困難 |
| 拖曳取回 | 「現在總共是 X 元」/ 「總共 X 元」 | 簡單/普通 |
| 答對 | 「恭喜你答對了，總共是 X 元，進入下一題/測驗結束」 | 全部 |
| 答錯 | 「對不起你答錯了，進入下一題/請再試一次」 | 普通/困難 |
| 提示 | 「請依提示拿出正確的金額」/ 「目前總額是 X 元」 | 普通/困難 |
| 測驗結束 | 「恭喜你完成全部測驗，答對 X 題，表現 XX」 | 全部 |
| 設定衝突 | 各種衝突警告文字 | 設定頁 |

---

## 五、觸控與桌面支援

### 5.1 三種互動方式

C4 支援三種金錢移動方式，確保所有裝置都能操作：

1. **桌面拖曳**（HTML5 Drag & Drop API）：`handleDragStart` → `handleDragOver` → `handle*ModeDrop` / `handleDropBack`
2. **觸控拖曳**（TouchDragUtility）：`setupTouchDragFor*Mode()` 將觸控事件轉換為合成的 Drag & Drop 事件
3. **雙擊放置**（Click-to-Move）：`setupClickEventListeners()` → `handleActionClick()` → `handleItemClick()` → `handleClickToPlace()` / `handleClickToReturn()`

### 5.2 TouchDragUtility 整合

每個模式都有獨立的 `setupTouchDragFor*Mode()` 函數：
- 使用 `window.TouchDragUtility.registerDraggable()` 註冊可拖曳元素
- 使用 `window.TouchDragUtility.registerDropZone()` 註冊放置區域
- **延遲註冊**：用 `setTimeout` 重試機制確保 DOM 元素已生成再註冊
- **合成事件**：`onDrop` 回調中構建完整的合成事件物件（含 `dataTransfer.getData()`），交由原有的 `handle*ModeDrop()` 處理
- **圖片信息保留**：從被拖曳元素的 `<img>` 取得 `src` 傳入合成事件，修復「破圖」問題

### 5.3 雙擊放置機制

參考 C3 的成功實現，C4 實作了完整的點擊互動系統：

- **事件綁定層級**：綁定在 `#app` 容器上（capture 階段），統一捕捉所有模式的金錢點擊
- **雙擊偵測**：`clickState` 記錄 clickCount/lastClickTime/lastClickedElement，500ms 內對同一元素第二次點擊視為雙擊
- **第一次點擊**：選擇物品（添加 `.selected-item` 綠色邊框光暈）
- **雙擊執行**：`simulateCoinPlacement()` 直接操作狀態並重渲染
- **點擊取回**：已放置物品（`.unit4-*-dropped-item`）只需單擊即可取回

### 5.4 CSS 觸控優化

HTML 中內嵌了多項觸控相關 CSS：
- `overscroll-behavior-y: contain`：禁用下拉重新整理
- `pointer-events: none !important` 在 img 上：防止圖片攔截觸控事件
- `touch-action: manipulation`：優化觸控響應
- `-webkit-touch-callout: none`：禁止長按彈出選單
- `user-select: none`：禁止文字選取

### 5.5 拖曳資料結構

所有拖曳操作統一使用 JSON 格式的資料：
```javascript
{
    value: number,      // 面額數值
    id: string,         // 元素 ID
    fromZone: string,   // 'source' | 'drop'
    imageSrc: string    // 圖片 URL（保持正反面一致性）
}
```

---

## 六、版面設計

### 6.1 三階段畫面

| 階段 | 畫面 | 說明 |
|------|------|------|
| 設定頁 | `showSettings()` | 難度、位數、面額、題數、模式等完整設定介面 |
| 測驗頁 | `renderGameBoard()` → `render*Mode()` | 標題列 + 兌換區 + 我的金錢區 |
| 完成頁 | `displayResultsWindow()` | 紫色漸層卡片 + 統計 + 煙火 |

### 6.2 設定頁面

設定項目多達 7 個區塊（業界少見的豐富選項）：

1. **難度選擇**（easy/normal/hard）+ 即時說明文字
2. **目標金額位數**（1/2/3/4 位數 + 自訂金額）+ 彈出式數字鍵盤
3. **面額選擇**（多選，分「錢幣」「紙鈔」兩組）+ 智能禁用/警告
4. **題目設定**（1/3/5/10 題 + 自訂）
5. **測驗模式**（反覆作答 / 單次作答）+ 簡單模式自動禁用
6. **獎勵系統**連結
7. **作業單**連結

### 6.3 測驗頁面結構

```
┌─────────────────────────────────────┐
│  [進度] 第 X / N 題    C4    [獎勵][返回設定]  │  ← 標題列（sticky）
├─────────────────────────────────────┤
│  兌換區                    [💡 提示]  │
│  請拿出 X 元                         │
│  ┌─────────────────────────┐        │
│  │  [放置區域 / 視覺提示]    │        │  ← 簡單模式：淡化提示 / 普通困難：自由放置
│  └─────────────────────────┘        │
│  目前總額: X 元                      │  ← 簡單模式可見 / 普通困難初始隱藏
│           [完成]                     │  ← 普通/困難模式
├─────────────────────────────────────┤
│  我的金錢區                          │
│  ┌─────────────────────────┐        │
│  │  [各種面額的錢幣圖示]     │        │  ← 含解法硬幣 + 干擾硬幣
│  └─────────────────────────┘        │
└─────────────────────────────────────┘
```

### 6.4 面額圖示大小漸變

C4 為不同面額設定不同的圖示大小，視覺上反映面額差異：

| 面額 | 比例 | 最大寬×高 |
|------|------|----------|
| 1000 元 | 220% | 154×110px |
| 500 元 | 190% | 133×95px |
| 100 元 | 180% | 126×90px |
| 50 元 | 200% | 140×100px |
| 10 元 | 190% | 133×95px |
| 5 元 | 180% | 126×90px |
| 1 元 | 170% | 119×85px |

### 6.5 完成畫面

遵循 C/F 系列統一風格：
- 紫色漸層背景 (`linear-gradient(135deg, #667eea, #764ba2)`)
- 表現徽章（≥90%🏆 / ≥70%👍 / ≥50%💪 / <50%📚）+ 橙色漸層 + 發光動畫
- 兩個統計卡片：答對題數、完成時間
- 粉紅色獎勵系統按鈕
- 綠色「再玩一次」+ 紫色「返回設定」按鈕
- canvas-confetti 煙火動畫 + 成功音效

### 6.6 模式主題色差異

| 模式 | 金錢區邊框 | 放置區邊框 | 總額顏色 | 金錢物件 | 確認按鈕 |
|------|-----------|-----------|---------|---------|---------|
| 簡單 | 綠色 #2ecc71 | 綠色 | 綠色 | 透明背景 | 無 |
| 普通 | 藍色 #3498db | 藍色 | 藍色 | 透明背景 | 藍色漸層 |
| 困難 | 藍色 #3498db | 藍色 | 藍色 | 紅色邊框 | 藍色漸層 |

### 6.7 響應式設計

完成畫面 `@media (max-width: 600px)` 切換為單欄統計卡片、全寬按鈕。遊戲頁面透過 `flex-wrap` 和 `gap` 自適應不同寬度。

---

## 七、注意事項

### 7.1 模式分離的代價

每個模式完全獨立意味著大量重複程式碼（如三個模式的 CSS 幾乎相同但前綴不同、三個觸控設置函數結構相同）。修改共用邏輯時需要同步修改三處。

### 7.2 完整重渲染的效能考量

每次拖曳/點擊操作都完整重建 HTML + 重綁事件，在大量硬幣（接近 30 個上限）時可能產生延遲。`sourceCoins` 的持久化設計減輕了部分問題。

### 7.3 簡單模式的 droppedItems 結構差異

簡單模式使用固定長度陣列（`new Array(solution.length).fill(null)`），普通/困難模式使用動態陣列 `[]`。`handleDropBack()` 中需要根據模式使用不同的移除邏輯。

### 7.4 「返回設定」導向差異

- 設定頁面的「返回設定」按鈕：`window.location.href = '../index.html#part2'`（返回首頁）
- 遊戲頁面的「返回設定」按鈕（`#back-to-menu-btn`）：同樣指向 `'../index.html#part2'`（應為 `Game.showSettings()`）
- 完成畫面的「返回設定」按鈕：`Game.init()`（正確，重新初始化）

### 7.5 測驗模式命名不一致

設定頁面的「單次作答」按鈕 data-value 為 `"proceed"`，但答錯處理中檢查的是 `mode === 'single'`，這兩個值不匹配，導致「單次作答」模式永遠走 retry 分支。

### 7.6 Debug 系統常開

`Debug.enabled: true` 硬編碼為開啟狀態，所有除錯日誌在正式環境中也會輸出。

### 7.7 狀態管理現況

| 項目 | 狀態 |
|------|------|
| 統一重置函數 | ✅ `resetGameState()` |
| 布林旗標 | `loadingQuestion`, `isProcessingDrop` |
| 重置位置 | 集中（2 處調用） |
| 評價 | ✅ **最佳實踐** |

**說明**：C4 已實現統一的 `resetGameState()` 函數，在 `showSettings()` 和 `startQuiz()` 中調用，集中管理所有遊戲狀態的重置

**重置項目**：`quiz` 物件、`loadingQuestion`、`clickState` 物件、`lastTargetAmount`、`gameCompleted`

**搜尋關鍵字**：`resetGameState`

---

## 八、潛在 Bug 與程式碼品質檢測

### Bug #1：測驗模式值不匹配（嚴重）

**位置**：`handleNormalModeIncorrectAnswer()` / `handleHardModeIncorrectAnswer()`

**問題**：設定頁面中「單次作答」的 `data-value="proceed"`，但答錯處理中檢查 `mode === 'single'`，永遠為 `false`，導致單次作答模式行為等同反覆作答模式。

**影響**：選擇「單次作答」的學生答錯後會被清空重來而非跳到下一題。

**修正狀態**：✅ 已修正 — `mode === 'single'` 改為 `mode === 'proceed'`（2 處）

### Bug #2：遊戲頁面「返回設定」導向首頁

**位置**：`setupEasyModeEventListeners()` / `setupNormalModeEventListeners()` / `setupHardModeEventListeners()`

**問題**：`#back-to-menu-btn` 的點擊事件導向 `'../index.html#part2'` 而非 `Game.showSettings()`。學生點「返回設定」後會跳回首頁而非回到設定頁面。

**修正狀態**：✅ 已修正 — 3 處 `window.location.href` 改為 `Game.showSettings()`

### Bug #3：簡單模式答錯時 clearEasyModeDropZone() 初始化錯誤

**位置**：`clearEasyModeDropZone()`

**問題**：清空時將 `droppedItems` 設為 `[]`（空陣列），但簡單模式的 `renderEasyMode()` 期望它是固定長度陣列或 `undefined`（才會重新初始化）。空陣列 `[]` 是 truthy，且長度可能不匹配解法長度，可能導致提示渲染異常。

**修正狀態**：⏭️ 已有防護 — `renderEasyMode()` 長度檢查會自動重新初始化

### Bug #4：canvas-confetti 版本不一致

**位置**：`html/c4_correct_amount.html`

**問題**：C4 使用 confetti `@1.6.0`，其他單元（C2、C3 等）使用 `@1.9.2`。雖然功能正常但版本不統一。

**修正狀態**：✅ 已修正 — confetti 已改為本地 `js/confetti.browser.min.js`（2026-02-09 confetti 本地化）

### Bug #5：「再玩一次」按鈕重新調用 startQuiz()

**位置**：`displayResultsWindow()`

**問題**：`onclick="Game.startQuiz()"` 直接重新開始測驗，但不重新生成題目（`startQuiz()` 內部會重新 `generateAllQuestions()`）。然而 `state.settings` 和面額等狀態保留，如果學生想更換設定只能點「返回設定」。問題在於不會重新初始化 speech 系統。

**修正狀態**：✅ 已修正 — `startQuiz()` 開頭加 `this.speech.init()`

### Bug #6：validateCurrentTotal() 兩個 else if 分支邏輯相同

**位置**：`validateCurrentTotal()`

**問題**：`easy` 分支和 `normal || hard` 分支的計算邏輯完全相同（都是遍歷 `droppedItems` 加總 `value`），程式碼冗餘但無功能問題。

**修正狀態**：✅ 已修正 — 合併為單一遍歷邏輯，移除冗餘分支

### Bug #7：getSettingsCSS() 定義但未使用

**位置**：`getSettingsCSS()`

**問題**：778-826 行定義了完整的設定頁面 CSS 字串，但 `showSettings()` 並未引用它。設定頁面的樣式來自外部 CSS 檔案（`unit6.css` 等）。

**修正狀態**：✅ 已修正 — 刪除未使用的 `getSettingsCSS()` 函數

### Bug #8：showMessage() 可能在快速操作時堆疊

**位置**：`showMessage()`

**問題**：每次調用都 `appendChild` 一個新的浮動 div，2 秒後移除。快速連續操作時可能同時出現多個訊息重疊在同一位置。

**修正狀態**：✅ 已修正 — 新增 `.game-message` class + 呼叫前移除舊訊息

### Bug #9：clickToMoveConfig.speechFeedback 設為 false 但實際仍有語音

**位置**：`clickToMoveConfig` 三個模式都設定 `speechFeedback: false`

**問題**：註釋寫「c4 沒有語音系統」，但 C4 實際上有完整的語音系統。`speechFeedback` 這個配置項實際上未被使用，語音播放由各模式的 `simulateCoinPlacement()` 直接控制。

**修正狀態**：✅ 已修正 — easy/normal 改為 `true`，hard 維持 `false`，修正註解

### Bug #10：console.log 大量除錯日誌無全域開關

**位置**：整個檔案

**問題**：雖然有 `Debug` 物件但僅用於手機端拖曳日誌。大量的 `console.log()` 直接散佈在各函數中（如 handleDragStart、findSolution 等），無法統一關閉。

**修正狀態**：✅ 已完成（2026-02-20）— Debug Logger 統一日誌系統，281 個 console.log/warn/error 轉換為 Game.Debug 分類開關

---

## 九、未來開發建議

### 9.1 檔案結構優化

| 建議 | 說明 |
|------|------|
| 抽離 CSS | `getCommonCSS()`、`getEasyModeCSS()` 等約 800 行 CSS 字串應移至獨立 `.css` 檔案 |
| 抽離設定頁 | `showSettings()` + 相關驗證邏輯約 1,000 行可獨立為 `c4-settings.js` |
| 抽離組合算法 | `findSolution()`、`findAllMinimumCombinationsWithAllCoins()` 等組合算法約 200 行可獨立為工具模組 |
| 統一觸控設置 | 三個模式的 `setupTouchDragFor*Mode()` 結構高度相似，可抽離為參數化工廠函數 |

### 9.2 架構改進

1. **修復測驗模式值**：將 `mode === 'single'` 改為 `mode === 'proceed'`，或將 data-value 改為 `'single'`
2. **統一返回按鈕行為**：遊戲頁面的「返回設定」應調用 `Game.showSettings()` 而非導向首頁
3. **引入差異化渲染**：僅更新變化的 DOM 節點（如新增/移除的硬幣），而非完整重渲染
4. **Debug 開關完善**：擴展 `Debug` 物件涵蓋所有 `console.log`，統一控制日誌輸出
5. **clickToMoveConfig 生效化**：讓 `speechFeedback`、`audioFeedback` 等配置真正驅動行為，而非硬編碼

### 9.3 功能改進

1. **統一 confetti 版本**：更新至 `@1.9.2` 與其他單元一致
2. **提示次數限制**：普通/困難模式的 💡 提示可加入使用次數限制或扣分機制
3. **面額圖示類型**：目前只支援正反面隨機，可考慮加入「僅正面」「僅反面」選項（與作業單的 coinStyle 一致）
4. **showMessage 去重**：新訊息出現時先移除舊訊息，避免堆疊
5. **移除 deprecated 函數**：`findAllMinimumCombinationsWithAllCoins()` 標記為 DEPRECATED 但仍被設定驗證使用，應明確其存廢

---

## 十、總結

C4「正確的金額」是 C 系列中設定選項最豐富的單元（7 個設定區塊），也是唯一支援「自訂金額」模式的單元。其核心創新在於拖曳/點擊雙模式互動 + 智能設定驗證系統（面額-位數相容性、組合可行性、30 硬幣上限），在教育軟體中較為少見。

技術上，C4 採用完全的模式分離設計（三套獨立的渲染/事件/CSS），雖然帶來程式碼冗餘，但確保了各模式互不干擾。題目生成使用高效的「構建」方法取代傳統搜索，並內建批量預生成 + 防重複機制。

作業單部分支援 4 種題型（數字填空、圖示選擇、提示選擇、提示完成），配置齊全。

### Bug 修正記錄（2026-02-10）

| Bug | 問題 | 修正狀態 |
|-----|------|---------|
| #1 | 測驗模式值不匹配（嚴重） | ✅ `mode === 'single'` → `mode === 'proceed'` |
| #2 | 遊戲頁面「返回設定」導向首頁 | ✅ 3 處改為 `Game.showSettings()` |
| #3 | clearEasyModeDropZone() 初始化 | ⏭️ 已有防護機制 |
| #4 | canvas-confetti 版本不一致 | ✅ 已改為本地 v1.9.2（2026-02-09） |
| #5 | 「再玩一次」不重新初始化語音 | ✅ `startQuiz()` 加 `speech.init()` |
| #6 | validateCurrentTotal() 重複分支 | ✅ 合併為單一邏輯 |
| #7 | getSettingsCSS() 未使用 | ✅ 已刪除 |
| #8 | showMessage() 訊息堆疊 | ✅ 新增 `.game-message` + 移除舊訊息 |
| #9 | speechFeedback 值與註解錯誤 | ✅ easy/normal 改 `true`，修正註解 |
| #10 | console.log 無全域開關 | ✅ Debug Logger 統一（2026-02-20） |
| #11 | 單次作答最後一題答錯時語音被截斷 + showResults 重複呼叫 | ✅ 移除 15 處重複 `setup*ModeEventListeners()` + `showResults()` 加 `gameCompleted` 護欄 |

| 指標 | 數值 |
|------|------|
| HTML 行數 | 109 行 |
| 作業單行數 | 241 行 |
| 難度模式 | 3（簡單/普通/困難） |
| 設定選項 | 7 區塊 |
| 面額種類 | 7（1/5/10/50/100/500/1000 元） |
| 互動方式 | 3（桌面拖曳/觸控拖曳/雙擊放置） |
| 作業單題型 | 4（fill/coin-select/hint-select/hint-complete） |
| 潛在 Bug | 11 個（10 個已修正、1 個已有防護） |

---

## 十一、驗證記錄

### 2026-02-16：系統性驗證

**驗證內容**：

| 項目 | 狀態 | 說明 |
|------|------|------|
| TimerManager | ✅ 已完成 | 31 個 setTimeout 統一管理（2026-02-22 v2.1.0，分類：question/ui/speech/drag） |
| EventManager | ✅ 已完成 | 53 個 addEventListener 統一管理（2026-02-22 v2.1.0，分類：settings/dragSystem/gameUI/global） |
| injectGlobalAnimationStyles | ✅ 已完成 | 動畫定義統一注入（id：c4-global-animations） |
| endGame() | ✅ 正常 | 採用 C/F 系列統一完成畫面樣式 |
| confetti 煙火 | ✅ 正常 | 使用 v1.9.2 本地化版本 |

**建議改進（P1）**：
- ~~引入 TimerManager 統一管理 setTimeout~~ ✅ 已於 2026-02-22 完成
- ~~引入 EventManager 統一管理 addEventListener~~ ✅ 已於 2026-02-22 完成
- ~~新增 console.log 全域開關~~（✅ 2026-02-20 已完成 Debug Logger 統一）

**結論**：C4 功能正常，記憶體管理標準已達成（TimerManager 31個 + EventManager 53個 + injectGlobalAnimationStyles 均已實作）。

---

## 十二、重構記錄

### 2026-02-17：狀態管理重構（resetGameState）

**問題**：
- 狀態重置邏輯分散於多個位置
- `quiz`、`clickState`、`loadingQuestion` 等多個狀態物件需要重置
- 不符合 C1/C2/A4/A5 等單元的最佳實踐

**修改內容**：

1. **新增 `resetGameState()` 函數**
   - 集中管理所有遊戲相關狀態的重置
   - 重置項目：
     - `quiz`：`currentQuestion`, `totalQuestions`, `score`, `questions`, `startTime`, `attempts`
     - `loadingQuestion`：載入鎖定旗標
     - `clickState`：`clickCount`, `lastClickTime`, `lastClickedElement`, `selectedClickItem`
     - `lastTargetAmount`：上一題目標金額
     - `gameCompleted`：完成旗標
   - 輸出日誌：`🔄 [C4] 遊戲狀態已重置`

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
    this.state.clickState = {
        clickCount: 0,
        lastClickTime: 0,
        lastClickedElement: null,
        selectedClickItem: null
    };
    this.state.lastTargetAmount = null;
    this.state.gameCompleted = false;
    console.log('🔄 [C4] 遊戲狀態已重置');
}
```

**修改檔案**：
- `js/c4_correct_amount.js`

**驗證方式**：
1. 開啟 C4 付款
2. 完成部分測驗後點擊「返回設定」
3. Console 應顯示「🔄 [C4] 遊戲狀態已重置」
4. 重新開始測驗，確認題目從第 1 題開始、分數為 0、點擊狀態清空

---

*報告更新時間：2026-02-20*
*報告產生者：Claude Code (claude-opus-4-5)*

---

## 十三、Debug Logger 統一（2026-02-20）

### 13.1 背景

C4 原有 273+ 個 console.log/warn/error 呼叫散佈於各函數中，無法統一控制。本次重構將所有除錯日誌統一至 `Game.Debug` 系統，支援分類開關控制。

### 13.2 Debug FLAGS 系統

```javascript
Debug: {
    FLAGS: {
        all: false,       // 全域開關
        init: false,      // 初始化相關
        speech: false,    // 語音系統
        audio: false,     // 音效系統
        ui: false,        // UI 渲染
        payment: false,   // 付款金額計算
        drag: false,      // 拖曳操作
        touch: false,     // 觸控操作
        question: false,  // 題目生成
        state: false,     // 狀態變更
        wallet: false,    // 錢包/組合搜索
        hint: false,      // 提示系統
        event: false,     // 事件處理
        judge: false,     // 答案判定
        error: true       // 錯誤訊息（預設開啟）
    },
    log(category, ...args) { ... },
    warn(category, ...args) { ... },
    error(...args) { ... },
    logMobileDrag(phase, data, event, additionalInfo) { ... },
    logTouchEvent(eventType, eventInfo) { ... },
    logPlacementDrop(action, zoneType, itemInfo) { ... }
}
```

### 13.3 分類說明

| 分類 | 說明 | 使用場景 |
|------|------|---------|
| `init` | 初始化 | `init()`, `showSettings()` |
| `speech` | 語音 | `speak()`, `initVoice()` |
| `audio` | 音效 | `playDropSound()`, `playErrorSound()` |
| `ui` | 介面 | `render*Mode()`, 按鈕渲染 |
| `payment` | 付款 | 總金額計算、錢幣加總 |
| `drag` | 拖曳 | `handleDragStart()`, `handle*ModeDrop()` |
| `touch` | 觸控 | `setupTouchDragFor*Mode()` |
| `question` | 題目 | `generateQuestion()`, `loadQuestion()` |
| `state` | 狀態 | 狀態變更、重置 |
| `wallet` | 錢包 | `findSolution()`, 組合搜索 |
| `hint` | 提示 | `show*ModeHint()` |
| `event` | 事件 | 點擊事件、事件監聽 |
| `judge` | 判定 | `checkAnswer()`, 正確/錯誤判定 |
| `error` | 錯誤 | 錯誤訊息（預設開啟） |

### 13.4 轉換統計

| 項目 | 數量 |
|------|------|
| 原始 console.log | ~270 個 |
| 原始 console.warn | ~5 個 |
| 原始 console.error | ~8 個 |
| 轉換後 Game.Debug 呼叫 | 281 個 |
| 分類數量 | 14 個 |

### 13.5 使用方式

```javascript
// 開啟特定分類除錯
Game.Debug.FLAGS.drag = true;

// 開啟全部除錯
Game.Debug.FLAGS.all = true;

// 錯誤訊息永遠顯示
Game.Debug.error('發生錯誤:', errorObj);
```

### 13.6 搜尋關鍵字

- `Game.Debug.FLAGS`
- `Game.Debug.log`
- `Game.Debug.warn`
- `Game.Debug.error`

---

## 十四、動畫定義整合（2026-02-22）

### 14.1 問題描述

- 動畫定義分散於 JS 程式碼中的多處 `<style>` 注入區塊
- 共 8 處 @keyframes 定義，其中 `hintPulse` 重複 2 次（normal mode + hard mode）
- 缺少統一的 `injectGlobalAnimationStyles()` 函數

### 14.2 解決方案

新增 `injectGlobalAnimationStyles()` 函數，集中管理所有動畫定義。

### 14.3 Phase 1：新增函數

位置：Debug 系統後、state 物件前

```javascript
injectGlobalAnimationStyles() {
    if (document.getElementById('c4-global-animations')) return;

    const style = document.createElement('style');
    style.id = 'c4-global-animations';
    style.innerHTML = `
        /* ===== 拖曳動畫 ===== */
        @keyframes dropIn { ... }

        /* ===== 警告動畫 ===== */
        @keyframes warning-pulse { ... }

        /* ===== 提示高亮動畫 ===== */
        @keyframes hintPulse { ... }

        /* ===== 完成畫面動畫 ===== */
        @keyframes fadeIn { ... }
        @keyframes celebrate { ... }
        @keyframes bounce { ... }
        @keyframes glow { ... }
    `;
    document.head.appendChild(style);
    Game.Debug.log('init', '🎬 全局動畫樣式注入完成（7 個動畫）');
},
```

調用位置：`init()` 函數開頭

### 14.4 Phase 2：移除內嵌 @keyframes

| 位置 | 動畫名稱 | 處理方式 |
|------|---------|---------|
| 共用樣式區塊 | dropIn | 移除，保留註解 |
| normal mode CSS | warning-pulse | 移除，保留註解 |
| normal mode CSS | hintPulse | 移除，保留註解 |
| hard mode CSS | hintPulse（重複） | 移除，保留註解 |
| 完成畫面 | fadeIn, celebrate, bounce, glow | 移除，保留註解 |

### 14.5 動畫清單（7 個唯一動畫）

| 動畫名稱 | 用途 | 原位置 |
|---------|------|--------|
| dropIn | 拖曳放入縮放效果 | 共用樣式 |
| warning-pulse | 超額警告脈衝 | normal mode |
| hintPulse | 提示高亮脈衝 | normal/hard mode |
| fadeIn | 完成畫面淡入 | 完成畫面 |
| celebrate | 完成畫面慶祝 | 完成畫面 |
| bounce | 彈跳動畫 | 完成畫面 |
| glow | 發光效果 | 完成畫面 |

### 14.6 重複定義消除

- `hintPulse`：原有 2 處（normal mode + hard mode CSS），合併為 1 處

### 14.7 嵌套物件 `this.Debug` 檢查

- C4 不使用 TimerManager/EventManager/SceneConfig 等嵌套物件結構
- 所有 Debug 呼叫皆使用 `Game.Debug.log()` 形式
- **結論：無嵌套物件問題**

### 14.8 搜尋關鍵字

- `injectGlobalAnimationStyles`
- `c4-global-animations`

### 14.9 驗證方式

1. 開啟 C4 正確的金額
2. 開啟開發者工具 → Elements
3. 確認 `<head>` 中存在 `<style id="c4-global-animations">`
4. 確認 Console 無 CSS 動畫相關錯誤
5. 測試各種模式動畫效果正常：
   - 拖曳放入效果（dropIn）
   - 超額警告（warning-pulse）
   - 提示高亮（hintPulse）
   - 完成畫面（fadeIn, celebrate, bounce, glow）

---

## 十五、記憶體管理實作（v2.1.0）

### 實作範圍

| 項目 | 數量 | 說明 |
|------|------|------|
| TimerManager 遷移 | 31 個 | `setTimeout` → `Game.TimerManager.setTimeout` |
| EventManager 遷移 | 53 個 | `addEventListener` → `Game.EventManager.on` |
| clearAll 呼叫點 | 3 個 | `init()` / `showSettings()` / `startQuiz()` |
| 保留 raw setTimeout | 8 個 | speech 子物件（6個）+ TimerManager 內部（1個）+ async yield（1個） |
| 保留 raw addEventListener | 2 個 | DOMContentLoaded + EventManager 內部定義 |

### setTimeout 分類

| 分類 | 數量 | 說明 |
|------|------|------|
| `'question'` | 8 | nextQuestion、callback 屬性中的延遲下題 |
| `'ui'` | 18 | DOM 更新、動畫、modal 關閉、煙火效果 |
| `'speech'` | 2 | 語音延遲（非 speech 子物件） |
| `'drag'` | 3 | registerTouchDrag |

### addEventListener 分類

| 分類 | 數量 | 說明 |
|------|------|------|
| `'settings'` | 5 | gameSettings、startBtn、settingsRewardLink、worksheetLink、setCustomAmountBtn |
| `'dragSystem'` | 36 | drag/drop/enter/leave 事件 |
| `'gameUI'` | 10 | click 按鈕、completion 連結 |
| `'global'` | 1 | keydown 全局事件 |
| `'gameUI'` (mousedown) | 1 | mousedown 觸控模擬 |

**搜尋關鍵字**：`TimerManager.setTimeout`, `EventManager.on`

---

### 2026-02-24（第二輪）：稽核結果

**第二輪全面稽核結論（無新增 Bug）**：

- ✅ EventManager：全部事件監聽器正確使用 `Game.EventManager.on()`
- ✅ `startTime`：在 `start()` 正確設定 `this.state.quiz.startTime = Date.now()`（行 1707）
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

**修改檔案**：`js/c4_correct_amount.js`

---

---

### 2026-02-26：觸控拖曳 TypeError 修復 + 完成畫面時間顯示修復

#### Bug 1：觸控拖曳 `setDragImage is not a function` TypeError

**問題描述**：
在行動裝置觸控拖曳時，`TouchDragUtility` 呼叫 `onDragStart` 回調時傳入的是 `TouchEvent`，而非真正的 `DragEvent`。`TouchEvent` 沒有 `dataTransfer` 屬性，因此 `event.dataTransfer.setDragImage(...)` 拋出 `TypeError: event.dataTransfer.setDragImage is not a function`，導致觸控端無法拖曳放置金錢圖示。

**影響位置**（C4）：
- `handleDragStart()` 中的 `event.dataTransfer.setDragImage(...)` 呼叫（1 處）

**修復方式**：
```javascript
// 修復前
event.dataTransfer.setDragImage(dragImg, dragImg.offsetWidth / 2, dragImg.offsetHeight / 2);

// 修復後
if (event.dataTransfer && typeof event.dataTransfer.setDragImage === 'function') {
    event.dataTransfer.setDragImage(dragImg, dragImg.offsetWidth / 2, dragImg.offsetHeight / 2);
}
```

#### Bug 2：完成畫面顯示「答對 0 題 / 29533771 分 43 秒」

**問題描述**：
`displayResultsWindow()` 讀取 `this.state.quiz.startTime`，若遊戲尚未正式開始（`startTime` 仍為 `null`），計算 `endTime - null` = `Date.now()`（null 被強制轉型為 0），約等於 1.77×10¹² ms（Unix 元年至今）→ 顯示 29533771 分 43 秒。

**修復方式**：
```javascript
// 修復前
const elapsedMs = endTime - startTime;

// 修復後
const elapsedMs = startTime ? (endTime - startTime) : 0;
```

**修改檔案**：`js/c4_correct_amount.js`

---

*報告更新時間：2026-02-26*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

## 2026-02-27：Raw setTimeout 修復（第三輪）

**問題**：`js/c4_correct_amount.js` 的語音系統（`speech.init()` / `speak()`）使用裸 `setTimeout`（共 6 處），
無法被 `TimerManager.clearAll()` 清除，可能在場景切換後繼續觸發語音回呼。

| # | 位置 | 原始 | 修復後 |
|---|------|------|--------|
| 1 | `speech.init()` 語音列表為空，重試 500ms | `setTimeout(setVoice, 500)` | `Game.TimerManager.setTimeout(setVoice, 500, 'speech')` |
| 2 | `speech.init()` 額外延遲重試 1000ms | `setTimeout(() => {...}, 1000)` | `Game.TimerManager.setTimeout(..., 1000, 'speech')` |
| 3 | `speak()` 音訊未解鎖路徑 callback | `setTimeout(callback, 100)` | `Game.TimerManager.setTimeout(callback, 100, 'speech')` |
| 4 | `speak()` 語音系統未就緒路徑 callback | `setTimeout(callback, 100)` | `Game.TimerManager.setTimeout(callback, 100, 'speech')` |
| 5 | `speak()` 無語音物件路徑 callback | `setTimeout(callback, 100)` | `Game.TimerManager.setTimeout(callback, 100, 'speech')` |
| 6 | `speak()` 安全逾時（10秒）safeCallback | `setTimeout(safeCallback, 10000)` | `Game.TimerManager.setTimeout(safeCallback, 10000, 'speech')` |

**修改檔案**：`js/c4_correct_amount.js`

---

### 2026-02-27：confetti setInterval → 遞迴 TimerManager 模式（第二輪）

**問題**：完成畫面煙火效果包在 `Game.TimerManager.setTimeout` 回呼中，但內部的裸 `setInterval` 不受 TimerManager 管理，場景切換時 `TimerManager.clearAll()` 無法中途停止動畫計時器。

**修復**：將 `setInterval` 改為遞迴 `Game.TimerManager.setTimeout(fireConfetti, 250, 'confetti')`，確保 `clearAll()` 或 `clearByCategory('confetti')` 可立即停止動畫。

**修改檔案**：`js/c4_correct_amount.js`

---

*報告更新時間：2026-02-27*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

## 廢棄程式碼稽核（2026-03-01）

**稽核範圍**：`js/c4_correct_amount.js`（6,166 行）

### 結論：無需處理

| 類型 | 位置 | 內容 | 評估 |
|------|------|------|------|
| 重構說明注解 | Line 4582 | `// 舊的函數已經被分離為handleNormalModeConfirm和handleHardModeConfirm` | 歷史記錄注解，無廢棄程式碼 |
| 清理操作注解 | Line 5767 | `// 移除舊的點擊事件監聽器（如果存在）` | 操作性注解，刻意保留 |
| console.log | Lines 52, 59, 85, 104, 110+ | Debug 系統內部呼叫 | 已受 FLAGS 守衛，無需處理 |

**整體評估**：程式碼品質良好，無實際廢棄程式碼。

### 補充稽核（第二輪）

| 類型 | 位置 | 內容 | 嚴重性 | 建議 |
|------|------|------|--------|------|
| 空 stub 函數（有呼叫點） | Line 1196–1198 | `hideCustomQuestionInput()` — 同 C1/C2/C3，函數本體僅含注解；被 line 970 呼叫 1 次 | 低 | 可刪除函數並移除呼叫點 |
| 已注解的 alert | Line 1190 | `// alert(...)` — 已取消彈窗提示 | 低 | 可清除注解行 |
| 原生 setTimeout（async yield） | Line 1873 | `await new Promise(resolve => setTimeout(resolve, 1))` — `generateAllQuestions()` 中用於讓瀏覽器更新 UI 的 cooperative multitasking 模式，非計時器用途 | 低（刻意保留） | 此 1ms yield 為合法的 async UI 讓步，不需轉為 TimerManager；可加注解說明意圖 |

---

## 跨輪計時器洩漏稽核（2026-03-03）

**稽核背景**：A3 單元曾發現 `speakText()` 10 秒備援計時器在下一輪觸發導致跳輪的 Bug，已對全系列交叉稽核。

**C4 稽核結論：安全（無此問題）**

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

## 提示按鈕吉祥物位置修正（2026-03-10）

**問題**：`.section-header-with-hint`（`display:flex; position:relative`）中，`.hint-total-btn` CSS 設有 `position: absolute; right: 10px`。吉祥物 `<img>` 作為 flex 兄弟元素出現在 `<h2>` 之後，但按鈕因絕對定位浮到右側，兩者不相鄰。

**修復**（`js/c4_correct_amount.js`）：普通模式與困難模式各 1 處，將 `<img>` 和 `<button id="hint-total-btn">` 包進：
```html
<div style="position:absolute;right:10px;top:50%;transform:translateY(-50%);display:flex;align-items:center;gap:6px;">
    <img ...>
    <button id="hint-total-btn" class="hint-total-btn" style="position:static;transform:none;">💡 提示</button>
</div>
```
button 加 `position:static;transform:none` 覆蓋 CSS 絕對定位，吉祥物顯示於提示鈕左側。

**關鍵搜尋詞**：`position:static;transform:none`（`hint-total-btn` 在 `renderNormalModeUI`/`renderHardModeUI` 模板中）

---

## 輔助點擊兩階段流程修復（2026-03-14）

### 問題描述

C4 簡單模式進入測驗時，`renderGameBoard()` 先渲染金幣，緊接 `showInstructionModal()` 覆蓋一個「目標金額彈窗」（`id="instruction-modal-overlay"`）。AssistClick 的 MutationObserver 在 300ms 後呼叫 `buildQueue()`，此時彈窗已存在，但 `buildQueue()` 直接找金幣並高亮，導致：
1. 黃色框出現在被彈窗覆蓋的金幣上，視覺混亂
2. 點擊遮罩時金幣被觸發放置，彈窗未關閉

### 修復方案

**1. `buildQueue()` 優先偵測彈窗**（`js/c4_correct_amount.js`）

```javascript
buildQueue() {
    if (!this._enabled) return;
    const modal = document.getElementById('instruction-modal-overlay');
    if (modal) {
        this._queue = [{ target: null, action: () => this._closeInstructionModal() }];
        this._step = 0;
        return;  // 不高亮金幣，等待點擊關閉彈窗
    }
    // ... 正常找金幣邏輯
}
```

**2. 新增 `_closeInstructionModal()`**

淡出動畫（opacity 0 + scale 0.8，300ms）→ 移除 DOM → 清除 `loadingQuestion` 旗標 → 重新呼叫 `buildQueue()` 指向金幣。

**3. CSS 衝突修復**

`getEasyModeCSS()` 原有內嵌樣式覆蓋 `shared-game-base.css` 的 `.assist-click-hint`：

```css
/* 修復前 */
.unit4-easy-source-item { outline: none !important; box-shadow: none !important; }

/* 修復後 */
.unit4-easy-source-item:not(.assist-click-hint) { outline: none !important; box-shadow: none !important; }
.unit4-easy-source-item:focus:not(.assist-click-hint) { outline: none !important; border: none !important; background: transparent !important; }
```

**根因**：內嵌 `<style>` 在 DOM 中晚於外部 CSS，`!important` 同優先度時後者勝出，故 `.assist-click-hint` 的黃色框被覆蓋。`:not(.assist-click-hint)` 排除高亮狀態，CSS 優先度差異讓 `shared-game-base.css` 的規則生效。

**關鍵搜尋詞**：`_closeInstructionModal`、`instruction-modal-overlay`、`unit4-easy-source-item:not(.assist-click-hint)`

---

## 設定頁輔助點擊說明更新（2026-03-14）

所有 C/F 系列（共 12 個檔案）設定頁的輔助點擊說明，由原本的「啟用後，點擊畫面任意處將自動執行正確操作。」，更新為對應 A 系列格式：

```html
<p>
    啟用後，只要偵測到點擊，系統會自動依序完成[單元操作]等所有操作。適合手部控制能力較弱的學習者使用。<br>
    <strong style="color: #ff6b6b;">⚠️ 僅適用於「簡單模式」</strong>
</p>
```

C4 具體描述：「拖曳錢幣完成正確金額付款」

**關鍵搜尋詞**：`assist-click-group`、`啟用後，只要偵測到點擊`
