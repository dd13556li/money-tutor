# A1 販賣機單元 — 完成經驗報告書

> **建立日期**：2026-02-09（日）11:30
> **更新日期**：2026-03-10（提示按鈕吉祥物位置修正）
> **更新日期**：2026-03-21（提示鈕行為修正：assigned / coinFirstAssigned 模式改顯示彈窗）
> **更新日期**：2026-03-22（自訂錢包彈窗升級：number input → 幣值選擇 modal；最低金額動態計算）
> **專案名稱**：Money Tutor 金錢教學系統
> **單元編號**：A1 — 自動販賣機
> **報告類型**：單元完成經驗與開發建議

---

## 一、檔案規模總覽

| 檔案 | 路徑 | 行數 | 大小 |
|------|------|------|------|
| HTML 頁面 | `html/a1_vending_machine.html` | 31 行 | 極精簡（純容器） |
| JS 核心邏輯 | `js/a1_vending_machine.js` | 6,080 行 | 328 KB |
| CSS 樣式 | `css/a1_vending_machine.css` | 821 行 | — |
| 作業單產生器 | `worksheet/units/a1-worksheet.js` | 358 行 | — |
| **合計** | — | **7,290 行** | — |

### 素材資源

| 類型 | 數量 | 路徑 |
|------|------|------|
| 飲料圖片 | 19 張 PNG | `images/a1/icon-a01~a19-*.png` |
| 錢幣圖片 | 18 張 PNG（9面額×正反面） | `images/money/*_yuan_front/back.png` |
| 音效檔案 | 8 種（共用音效池 13 個 MP3） | `audio/*.mp3` |

---

## 二、單元特色

### 2.1 完整模擬真實販賣機體驗

A1 是整個 Money Tutor 專案中**最早開發、功能最完整**的 A 系列單元。它完整模擬了自動販賣機的操作流程：

1. **選擇商品** → 從 19 種飲料中點選
2. **投幣付款** → 從錢包中逐枚選取硬幣投入
3. **確認購買** → 按下確認按鈕
4. **取出商品** → 在取物口拿取飲料（含掉落動畫）
5. **收取找零** → 在退幣口拿取找零硬幣

### 2.2 三種難度模式，滿足不同程度學習者

| 模式 | 名稱 | 特點 |
|------|------|------|
| **簡單模式** | 引導式操作 | 每一步都有黃色光暈提示下一步該做什麼，語音逐步引導 |
| **普通模式** | 半引導式 | 錯誤 3 次後自動出現提示，適合有基礎的學習者 |
| **困難模式** | 完全自主 | 無自動提示，需靠自己完成整個購買流程 |

### 2.3 兩種任務類型

| 類型 | 說明 |
|------|------|
| **指定任務** | 系統隨機指定一款飲料，學習者必須找到並購買 |
| **自選模式** | 學習者自由選擇喜歡的飲料購買 |

### 2.4 魔法商品（自訂商品）系統

教師/家長可上傳自訂圖片，設定名稱與價格，創造個人化的商品。此功能讓教學情境更貼近學習者日常生活。

### 2.5 輔助點擊模式（Click Mode）

專為**特殊需求學習者**設計的無障礙功能：
- 啟用後，畫面上任何地方按一下即執行下一步操作
- 系統自動建立操作佇列（Action Queue），依序執行選商品→投幣→確認→取物→取找零
- 搭配視覺高亮與語音，降低操作門檻

### 2.6 錢包系統（擬真硬幣互動）

- 學習者擁有一個包含隨機面額硬幣的錢包
- 投幣時逐枚從錢包選取，每枚硬幣都以**真實錢幣圖片**呈現（正面/反面隨機）
- 錢包金額可選 50 元或 100 元，也支援自訂金額

### 2.7 作業單系統

獨立的紙本作業單產生器，提供 **10 種題型**：

| # | 題型 | 說明 |
|---|------|------|
| 1 | 數字填空（價格計算） | 計算多瓶飲料總價 |
| 2 | 填空與選擇（價格計算） | 填空＋選正確金錢組合 |
| 3 | 圖示選擇（價格計算） | 從 3 組金錢圖示中勾選正確的 |
| 4 | 提示選擇（價格計算） | 同上，選項旁加金額提示 |
| 5 | 提示完成（價格計算） | 填寫各幣值所需數量 |
| 6 | 數字填空（找零計算） | 計算投幣後的找零 |
| 7 | 填空與選擇（找零計算） | 找零填空＋選正確金錢組合 |
| 8 | 圖示選擇（找零計算） | 勾選正確找零組合 |
| 9 | 提示選擇（找零計算） | 附金額提示的找零選擇 |
| 10 | 提示完成（找零計算） | 填寫各幣值找零數量 |

---

## 三、語音系統使用分析

### 3.1 技術實現

使用 **Web Speech API**（`window.speechSynthesis`），搭配 `SpeechSynthesisUtterance` 物件：

```
語音引擎初始化流程：
1. 檢測瀏覽器支援 → 2. 取得語音清單 → 3. 優先選台灣中文語音 → 4. 最多重試 5 次
```

**語音優先順序**：
1. Microsoft HsiaoChen（Windows 台灣女聲）
2. Google 國語（Chrome 台灣語音）
3. 其他 zh-TW 語音
4. 任何中文語音（fallback）

### 3.2 語音觸發時機一覽

| 場景 | 語音內容範例 | 觸發時機 |
|------|-------------|---------|
| 歡迎畫面 | 「歡迎來到自動飲料販賣機」 | 進入歡迎頁 1 秒後 |
| 錢包介紹 | 「你的錢包總共有五十元」 | 顯示錢包畫面 |
| 指定任務 | 「請購買巨峰葡萄汁，價格是參拾伍元」 | 任務彈窗出現 |
| 投幣提示 | 「已投入貳拾元，還需要壹拾伍元」 | 每次投幣後 |
| 投幣完成 | 「投幣完成！請按確認購買」 | 金額足夠時 |
| 購買成功 | 「購買成功，請到取物口拿飲料」 | 確認購買後 |
| 找零提示 | 「找零壹拾伍元，請收好您的零錢」 | 顯示找零 |
| 交易摘要 | 完整念出商品、價格、投入金額、找零 | 交易結算 |
| 操作錯誤 | 「選錯了，請購買指定的飲料：XX」 | 選錯商品時 |
| 完成挑戰 | 「完成挑戰！共完成X題，用時Y分Z秒」 | 結束畫面 |

### 3.3 金額語音轉換

使用共用工具 `NumberSpeechUtils.convertToTraditionalCurrency()` 處理中文金額唸法：

| 金額 | 語音輸出 | 說明 |
|------|---------|------|
| 2 元 | 「兩元」 | 2 + 單位用「兩」 |
| 12 元 | 「拾貳元」 | 個位 2 用「貳」 |
| 20 元 | 「貳拾元」 | 十位 2 用「貳」 |
| 200 元 | 「兩百元」 | 百位 2 用「兩」 |
| 35 元 | 「參拾伍元」 | 標準中文數字 |

### 3.4 語音注意事項

- **行動裝置限制**：iOS/Android 需要使用者互動後才能啟用語音，A1 在首次觸控/點擊時解鎖
- **語音佇列管理**：使用 `interrupt` 選項可打斷前一句語音，避免語音堆積
- **回呼機制**：`speak(text, {callback})` 在語音結束後執行回呼，用於步驟串接

---

## 四、觸控與桌面支援

### 4.1 桌面端支援

- 標準滑鼠點擊操作
- hover 效果（商品項目、按鈕）
- 所有操作透過 `onclick` 事件觸發

### 4.2 觸控端支援

- **Viewport 設定**：`width=device-width, initial-scale=1.0`
- **觸控音效解鎖**：引用 `audio-unlocker.js`（2026-02-24 統一，取代原內建 `setupUnlock()` 邏輯）
- **防雙重觸發**：所有關鍵操作加入 debounce 機制，防止觸控 + 點擊同時觸發

### 4.3 防快速連點（Debounce）機制

| 操作 | 鎖定時間 | 防護變數 |
|------|---------|---------|
| 選擇商品 | 300ms | `_lastSelectTime` |
| 投幣 | 300ms | `_lastCoinClickTime` |
| 確認付款 | 500ms | `_lastPaymentTime` |
| 取物 | 500ms | `_lastPickupTime` |
| 退幣 | 500ms | `_lastRefundTime` |
| 提示按鈕 | 500ms | `_lastHintTime` |
| 輔助模式操作 | 600ms | `state.isProcessing` |

### 4.4 觸控操作注意事項

- A1 **不引用** `touch-drag-utility.js`（因無拖曳需求，與其他 17 個單元不同）
- A1 **不引用** `theme-system.js`（與其他 17 個單元不同，無深色主題切換需求）
- A1 **不引用** `touch-drag-utility.js`（無拖曳需求）

---

## 五、不同版面（RWD 響應式設計）

### 5.1 響應式斷點

| 斷點 | 範圍 | 版面配置 |
|------|------|---------|
| **桌面版** | >1024px | 左右並排：販賣機（3/4）＋控制面板（1/4） |
| **平板版** | 769~1024px | 同桌面但商品圖縮小為 100px |
| **手機版** | ≤768px | 上下堆疊：販賣機在上、控制面板在下 |

### 5.2 各版面差異

**桌面版**（>1024px）：
- 商品格狀排列：`grid-template-columns: repeat(auto-fill, minmax(140px, 1fr))`
- 商品圖片 120×120px
- 控制面板在右側固定
- LCD 螢幕顯示投幣金額

**平板版**（769~1024px）：
- 商品格狀排列：`minmax(110px, 1fr)`
- 商品圖片 100×100px
- 仍為左右並排

**手機版**（≤768px）：
- Flex 方向改為 `column`（上下堆疊）
- 商品格狀排列：`minmax(90px, 1fr)`
- 商品圖片 80×80px
- 字型縮小（標題 1.5rem）
- 投幣按鈕仍維持 2 欄格局

### 5.3 設定頁面版面

- 居中白色卡片，最大寬度 600px
- 按鈕群組使用 flex-wrap，自動換行
- 在小螢幕上堆疊顯示

### 5.4 完成畫面版面

- 紫色漸層全螢幕背景
- 居中卡片最大寬度 500px
- 統計卡片使用 `grid-template-columns: repeat(2, 1fr)`
- 垂直置中顯示（`min-height: 100vh` + flexbox）

---

## 六、動畫系統

### 6.1 CSS 動畫清單

| 動畫名稱 | 效果 | 時長 | 用途 |
|----------|------|------|------|
| `dropDown` | 從上方掉落 | 0.8s | 商品掉入取物口 |
| `coinInsert` | 縮小淡出 | 0.6s | 投幣動畫 |
| `coinRefund` | 上浮消失 | 0.6s | 退幣動畫 |
| `coinReturn` | 上浮消失 | 0.8s | 找零返回動畫 |
| `modalSlideIn` | 從上方滑入 | 0.3s | 彈窗出現 |
| `slideUp` | 從下方滑上 | 0.6s | 內容進場 |
| `pulseHint` | 黃色脈衝 | 1.5s 循環 | 提示光暈 |
| `borderPulse` | 邊框閃爍 | 1.5s 循環 | 提示邊框 |
| `bounceHint` | 上下跳動 | 1s 循環 | 提示箭頭 |
| `gridPulseHint` | 格子脈衝 | 1.5s 循環 | 商品格提示 |
| `wrongMarkAppear` | 彈跳出現 | 0.5s | 紅色 ✗ 標記 |
| `warningMarkAppear` | 彈跳出現 | 0.6s | 警告標記 |
| `warningMarkShake` | 左右搖晃 | 0.3s×3 | 警告搖晃 |
| `bounce` | 上下跳動 | 1.5s 循環 | 完成畫面獎盃 |
| `celebrate` | 彈跳出現 | 1s | 完成畫面卡片 |
| `fadeIn` | 淡入 | 0.5s | 完成畫面 |

### 6.2 Canvas-Confetti 煙火效果

| 觸發場景 | 粒子數 | 持續時間 |
|---------|--------|---------|
| 簡單模式投幣完成 | 150 | 單次 |
| 取出商品 | 150 | 單次 |
| 完成挑戰 | 50×n（漸減） | 3 秒 |

---

## 七、注意事項

### 7.1 瀏覽器相容性

| 功能 | Chrome | Safari | Firefox | Edge |
|------|--------|--------|---------|------|
| Web Speech API | 完整支援 | 部分支援 | 部分支援 | 完整支援 |
| Canvas-Confetti | 完整支援 | 完整支援 | 完整支援 | 完整支援 |
| CSS Grid | 完整支援 | 完整支援 | 完整支援 | 完整支援 |
| Audio autoplay | 需互動 | 需互動 | 需互動 | 需互動 |

- **Safari 語音**：中文語音選擇有限，可能退回系統預設語音
- **Firefox**：`speechSynthesis.getVoices()` 需要透過 `onvoiceschanged` 事件才能取得語音清單

### 7.2 行動裝置注意事項

- iOS Safari 必須在使用者互動後才能播放音效，A1 已自行處理解鎖
- 觸控裝置不支援 hover 效果，部分視覺回饋會缺失
- 小螢幕上商品圖片較小，可能不易辨識
- 長語音在部分 Android 機型上可能被系統中斷

### 7.3 教學使用注意事項

- **魔法商品**價格需手動設定，若價格超過錢包金額會導致無法購買
- **自選模式**下不計算對錯，完成畫面無表現評價
- **簡單模式**的輔助點擊模式僅支援指定任務（非自選）
- **錢包硬幣**是隨機生成的，同一金額可能產生不同組合

### 7.4 已知限制

- **quiz 系統**未使用：程式碼中存在完整的測驗模板系統（`QUIZ_TEMPLATES`），但從未在遊戲流程中呼叫（約 200 行死碼）
- **找零演算法**：`findMinimumCoinCombination()` 使用 bitmask 暴力搜尋（O(2^n)），硬幣超過 20 枚可能效能下降

### 7.5 狀態管理現況

| 項目 | 狀態 |
|------|------|
| 統一重置函數 | ✅ 在 showSettings() 和 startGame() |
| TimerManager | ✅ 已添加（v2.0.1）|
| EventManager | ✅ 已添加（v2.0.1）|
| clearAll() 調用點 | ✅ 3 個 |
| 評價 | ✅ **最佳實踐** |

**說明**：A1 單元已於 2026-02-17 完成 Phase 1 重構，引入 TimerManager/EventManager 基礎設施

---

## 八、Bug 檢測與已知問題

### 8.1 已確認的程式碼問題

| # | 嚴重度 | 問題描述 | 位置 |
|---|--------|---------|------|
| 1 | **中** | Quiz 系統（200+ 行）從未被呼叫，為死碼 | `QUIZ_TEMPLATES`、`startQuiz()`、`checkAnswer()` |
| 2 | **中** | `findMinimumCoinCombination()` 使用 O(2^n) bitmask 演算法，大量硬幣時效能差 | 搜尋 `findMinimumCoinCombination` |
| 3 | **低** | 部分動畫 CSS 定義在 `.css` 檔，部分以 `<style>` 內嵌在 JS 的 HTML 字串中，維護困難 | 分散於 JS 與 CSS |
| 4 | **低** | 事件監聽器（如 Click Mode 全域監聽）未在場景切換時移除，可能造成記憶體洩漏 | `_clickModeHandler` |
| 5 | **低** | 部分錯誤訊息使用 `alert()`，破壞沉浸式體驗 | 分散於 JS |
| 6 | **低** | 魔法商品上傳的圖片以 Base64 儲存在記憶體中，大量上傳可能佔用過多記憶體 | `handleProductImageUpload` |
| 7 | **建議** | debounce 時間常數（300ms、500ms、600ms）散落各函數，無統一定義 | 6 處不同位置 |

### 8.2 非 Bug 但需注意的設計

| 項目 | 說明 |
|------|------|
| A1 不引用 theme-system.js | A1 無深色主題切換需求，不引用 `theme-system.js`（其他 17 個單元有引用）；`audio-unlocker.js` 已於 2026-02-24 統一引入 |
| 大型 State 物件 | `gameState` 包含 20+ 屬性，許多屬性在特定模式下不使用 |
| 函數路徑重複 | 簡單模式與進階模式的商品選擇使用完全不同的程式碼路徑，邏輯部分重複 |

---

## 九、未來開發單元時的建議

### 9.1 檔案分類與配置改進

#### 問題：JS 檔案過大（6,080 行）

A1 的核心 JS 檔案將所有邏輯（設定、遊戲流程、音效、語音、動畫、輔助模式、作業單）集中在單一檔案中，造成：
- 難以搜尋特定功能
- 難以多人協作
- 修改一處容易影響其他功能

#### 建議：模組化拆分

```
建議的檔案結構：
js/
├── a1/
│   ├── a1-main.js              # 入口、初始化、場景切換（~500 行）
│   ├── a1-settings.js          # 設定頁面邏輯（~600 行）
│   ├── a1-game-flow.js         # 遊戲流程控制（~800 行）
│   ├── a1-payment.js           # 投幣、付款、找零邏輯（~600 行）
│   ├── a1-ui-render.js         # 畫面渲染函數（~1,000 行）
│   ├── a1-click-mode.js        # 輔助點擊模式（~500 行）
│   ├── a1-hints.js             # 提示系統（簡單/普通/困難）（~500 行）
│   ├── a1-audio-speech.js      # 音效與語音管理（~300 行）
│   ├── a1-animations.js        # 動畫相關（~200 行）
│   └── a1-config.js            # 常數、飲料資料庫、設定值（~300 行）
```

#### 問題：CSS 動畫分散兩處

部分動畫定義在 `.css` 檔案中，部分以 `<style>` 標籤內嵌在 JS 產生的 HTML 字串中。

#### 建議：

- 所有動畫統一定義在 CSS 檔案中
- JS 只負責新增/移除 CSS class，不直接注入 `<style>` 標籤
- 共用動畫（如 `fadeIn`、`celebrate`、`bounce`）提取至 `css/common-animations.css`

### 9.2 常數與設定值統一管理

#### 問題

魔術數字（magic numbers）散落各處：debounce 時間、動畫時長、重試次數等。

#### 建議

```javascript
// a1-config.js
const A1_CONFIG = {
    DEBOUNCE: {
        PRODUCT_SELECT: 300,
        COIN_INSERT: 300,
        PAYMENT_CONFIRM: 500,
        PICKUP: 500,
        CLICK_MODE_LOCK: 600
    },
    ANIMATION: {
        DROP_DOWN: 800,
        COIN_INSERT: 600,
        MODAL_SLIDE: 300,
        HINT_PULSE: 1500
    },
    SPEECH: {
        MAX_RETRY: 5,
        RETRY_INTERVAL: 500
    },
    GAME: {
        MAX_WALLET_COINS: 10,
        ERROR_THRESHOLD: 3  // 普通模式錯誤幾次顯示提示
    }
};
```

### 9.3 State 管理改進

#### 問題

單一巨大 state 物件包含所有模式的狀態，許多屬性在特定模式下完全不使用。

#### 建議

```javascript
// 依模式分離 state
const baseState = { currentScene, settings, startTime, completedQuestions };
const easyModeState = { currentStep, hintShown };
const normalModeState = { stepErrorCounts, stepHintsShown, coinInsertionErrors };
const clickModeState = { enabled, currentPhase, actionQueue };

// 只在對應模式下初始化相關 state
```

### 9.4 HTML 模板管理

#### 問題

所有 HTML 都以 ES6 template literal 寫在 JS 中，混合大量 inline style，不易維護。

#### 建議

- 將大型 HTML 區塊提取為 `<template>` 標籤放在 HTML 檔案中
- 或使用輕量模板引擎
- inline style 統一移至 CSS class
- 特別是完成畫面（`showResults()`）和交易摘要（`showTransactionSummary()`）的 HTML 超過 200 行，應優先抽離

### 9.5 事件管理改進

#### 問題

事件監聽器混用 inline `onclick` 與 `addEventListener`，且全域監聽器未在場景切換時清除。

#### 建議

- 統一使用 `addEventListener`，搭配事件委派（Event Delegation）
- 場景切換時使用 `AbortController` 批次移除監聽器：
  ```javascript
  // 每個場景建立獨立的 AbortController
  const controller = new AbortController();
  element.addEventListener('click', handler, { signal: controller.signal });
  // 場景切換時
  controller.abort(); // 一次移除所有監聽器
  ```

### 9.6 共用工具引用一致性

#### 問題

A1 不引用 `theme-system.js`，與其他 17 個單元不同。

#### 狀態（2026-02-24 更新）

- ✅ `audio-unlocker.js`：已統一引入，移除原內建 `setupUnlock()` / `unlocked` 屬性
- ⚠️ `theme-system.js`：A1 無深色主題切換需求，確認不需引入，維持現狀

### 9.7 演算法效能改進

#### 問題

`findMinimumCoinCombination()` 使用 bitmask 暴力搜尋，時間複雜度 O(2^n)。

#### 建議

改用**動態規劃（DP）**或**貪婪演算法**：

```javascript
// 貪婪法（適用於台幣面額，因面額互不衝突）
function findMinimumCoins(coins, target) {
    const denominations = [1000, 500, 100, 50, 10, 5, 1];
    const result = [];
    let remaining = target;
    for (const denom of denominations) {
        const available = coins.filter(c => c === denom);
        const needed = Math.floor(remaining / denom);
        const use = Math.min(needed, available.length);
        for (let i = 0; i < use; i++) result.push(denom);
        remaining -= use * denom;
    }
    return remaining === 0 ? result : null;
}
```

### 9.8 死碼清理

#### 建議移除

| 死碼區塊 | 估計行數 | 說明 |
|---------|---------|------|
| `QUIZ_TEMPLATES` | ~60 行 | 測驗模板定義，從未使用 |
| `startQuiz()` | ~50 行 | 測驗啟動函數，從未呼叫 |
| `checkAnswer()` | ~80 行 | 測驗答案驗證，從未呼叫 |
| quiz 相關 state | ~10 行 | `quizState` 相關屬性 |
| **合計** | **~200 行** | 可安全移除 |

### 9.9 錯誤處理一致性

#### 問題

錯誤回饋方式不一致：有時用 `alert()`、有時用語音、有時用視覺標記。

#### 建議

建立統一的錯誤回饋系統：

```javascript
function showFeedback(type, message, options = {}) {
    // type: 'error' | 'warning' | 'success' | 'info'
    // 統一處理：音效 + 語音 + 視覺標記
    // 永遠不使用 alert()
}
```

### 9.10 未來新單元開發 Checklist

開發新的 A/C/F 系列單元時，建議依照以下 checklist 確認：

```
□ 1. HTML 引用必要的共用 JS（reward-launcher, number-speech-utils,
      audio-unlocker, theme-system, touch-drag-utility）
□ 2. HTML 引用 canvas-confetti 與 success-sound
□ 3. 設定頁面包含獎勵系統連結
□ 4. 設定頁面包含作業單連結（若有）
□ 5. 標題列包含獎勵按鈕與返回設定按鈕
□ 6. 完成畫面使用統一樣式（A系列或C/F系列標準）
□ 7. 完成畫面包含獎勵系統連結
□ 8. 完成畫面包含煙火動畫與音效
□ 9. 完成畫面允許滾動（overflow 修復代碼）
□ 10. 金額語音使用 convertToTraditionalCurrency()，不用字串插值
□ 11. 所有操作加入 debounce 防快速連點
✅ 12. 觸控音效解鎖（audio-unlocker.js，2026-02-24 統一）
□ 13. RWD 支援至少手機與平板兩個斷點
□ 14. A 系列：普通模式錯誤 3 次提示機制
□ 15. A 系列：學習成果與表現評價區塊
□ 16. A 系列：輔助點擊模式（選配）
□ 17. 圖片提供 fallback（onerror 處理）
□ 18. 記錄 startTime 供完成畫面使用
□ 19. CLAUDE.md 更新（函數表、設定頁面、完成畫面函數）
□ 20. 作業單產生器（若需要）註冊至 WorksheetRegistry
```

---

### Bug 修正記錄（2026-02-10）

| # | 問題 | 嚴重度 | 修正狀態 |
|---|------|--------|---------|
| 1 | Quiz 系統死碼（~143 行） | 中 | ✅ 刪除 5 個死碼區塊（QUIZ_TEMPLATES、quiz state、quizArea DOM、startQuiz()、checkAnswer()） |
| 2 | findMinimumCoinCombination() O(2^n) | 中 | ✅ 加入 n>20 安全防護 + findMinimumCoinGreedy() fallback |
| 3 | CSS 動畫分散兩處（11 處 inline style） | 低 | ✅ 遷移至 `injectGlobalAnimationStyles()`（30 個動畫統一管理，2026-02-22） |
| 4 | Click Mode 全域監聯器未移除 | 低 | ✅ 新增 unbindClickModeHandler()，於 showResults() 和 showSettings() 中呼叫 |
| 5 | alert() 破壞沉浸式體驗（16 處） | 低 | ✅ 新增 showToast(message, type) + 全部 16 處替換 |
| 6 | 魔法商品圖片無壓縮 | 低 | ✅ 新增 compressProductImage()（200px, 70% 品質） |
| 7 | Debounce 常數散落（6 處） | 建議 | ✅ 提取至 A1_DEBOUNCE 常數物件（含 CLICK_MODE 共 8 處替換） |

| 8 | 魔法商品圖片在取物口和購買成功彈窗中使用 `product.image` 而非 `product.imageUrl \|\| product.image`，導致自訂圖片無法顯示 | 高 | ✅ 修正 `vendProduct()` 及 `pickUpProduct()` 兩處（2026-02-23） |
| 9 | 普通/困難模式指定任務未優先分配魔法商品，導致魔法商品不一定出現在指定購買任務中 | 中 | ✅ 在 `prepareShoppingSession()` 加入 `unusedAffordableMagic` 優先邏輯（2026-02-23） |

**統計**：已確認問題 9 個（8 個已修正、1 個暫緩 → 全部已修正）

---

## 十、總結

### A1 販賣機的優勢

1. **教學完整性高**：從選商品→投幣→取物→找零，完整模擬真實販賣機
2. **分級設計佳**：三種難度＋兩種任務類型，覆蓋不同程度學習者
3. **無障礙考量**：輔助點擊模式大幅降低操作門檻
4. **語音互動豐富**：全程中文語音引導，金額使用正確的中文數字唸法
5. **視覺回饋多元**：14+ 種動畫＋煙火效果，提升學習動機
6. **作業單延伸**：10 種紙本題型，課堂教學與回家作業皆可用

### A1 販賣機的待改進處

1. **單一檔案過大**（~6,800 行）→ 建議模組化拆分
2. ~~**死碼未清理**~~ → ✅ 已於 2026-02-10 移除 Quiz 系統死碼
3. **共用 JS 引用不一致**→ 建議統一
4. ~~**魔術數字散落**~~ → ✅ 已於 2026-02-10 提取至 A1_DEBOUNCE 常數
5. ~~**事件監聽器未清理**~~ → ✅ 已於 2026-02-10 新增 unbindClickModeHandler()
6. ~~**錯誤回饋不一致**~~ → ✅ 已於 2026-02-10 統一為 showToast() 系統
7. ~~**CSS 動畫分散兩處**~~ → ✅ 已於 2026-02-22 整合至 `injectGlobalAnimationStyles()`（30 個動畫統一管理）

### 對後續單元開發的影響

A1 作為 A 系列的首個單元，建立了許多開發模式（設定頁面結構、完成畫面樣式、語音整合方式、提示機制等），後續 A2~A6 都在 A1 的基礎上發展。本報告中提出的改進建議，可優先在新單元中實施，再回頭重構 A1。

---

*報告完成時間：2026-02-09 11:30*
*報告產生者：Claude Code (claude-opus-4-6)*

---

## 驗證記錄

### 2026-02-16：系統性驗證

**驗證內容**：

| 項目 | 狀態 | 說明 |
|------|------|------|
| TimerManager | ✅ 已完成 | 44 個 setTimeout 統一管理（2026-02-17，分類：speechInit/speechDelay/screenTransition/uiAnimation/clickMode） |
| EventManager | ✅ 已完成 | 5 個 addEventListener 統一管理（2026-02-17，分類：settingsUI/gameUI） |
| injectGlobalAnimationStyles | ✅ 已完成 | 31 個 @keyframes 統一注入（2026-02-22，id：a1-global-animations） |
| 完成畫面 | ✅ 正常 | 採用 A 系列統一完成畫面樣式 |
| confetti 煙火 | ✅ 正常 | 使用 v1.9.2 本地化版本 |

**建議改進（P1）**：
- ~~引入 TimerManager/EventManager 統一管理記憶體~~ ✅ 已於 2026-02-17 完成

**結論**：A1 功能正常，記憶體管理標準已達成（TimerManager/EventManager/injectGlobalAnimationStyles 均已實作）。

---

### 2026-02-17：Phase 1 完成（TimerManager/EventManager 基礎設施）

**修改內容**：

| 項目 | 狀態 | 說明 |
|------|------|------|
| TimerManager | ✅ 已添加 | 計時器統一管理（setTimeout/clearTimeout/clearAll/clearByCategory）|
| EventManager | ✅ 已添加 | 事件監聯器統一管理（on/removeAll/removeByCategory）|
| clearAll() 調用點 | ✅ 3 個 | init()、showSettings()、startGame() |
| normalMode 重置 | ✅ 已添加 | showSettings() 返回設定時重置 |

**版本更新**：v2.0.0 → v2.0.1

**搜尋關鍵字**：`[Phase 1]`、`TimerManager`、`EventManager`

**結論**：A1 已達 F 系列記憶體管理基礎標準。

---

### 2026-02-17：Phase 2 完成（setTimeout 遷移）

**修改內容**：

| 項目 | 狀態 | 說明 |
|------|------|------|
| setTimeout 遷移 | ✅ 完成 | 44 個 setTimeout 全部遷移至 TimerManager |
| clearTimeout 遷移 | ✅ 完成 | 語音計時器使用 TimerManager.clearTimeout() |

**遷移分類統計**：

| 類別 | 數量 | 說明 |
|------|------|------|
| speechInit | 1 | 語音初始化 |
| speechDelay | 5 | 語音延遲播放 |
| screenTransition | 5 | 畫面切換 |
| uiAnimation | 16 | UI 動畫效果 |
| clickMode | 17 | 輔助點擊模式 |
| **總計** | **44** | — |

**版本更新**：v2.0.1 → v2.0.2

**搜尋關鍵字**：`TimerManager.setTimeout`

---

### 2026-02-17：Phase 3 完成（addEventListener 遷移）

**修改內容**：

| 項目 | 狀態 | 說明 |
|------|------|------|
| addEventListener 遷移 | ✅ 完成 | 5 個事件監聽器遷移至 EventManager |
| removeByCategory 調用 | ✅ 完成 | showSettings() + startGame() 各 1 個 |

**遷移分類統計**：

| 類別 | 數量 | 說明 |
|------|------|------|
| settingsUI | 3 | 設定按鈕、獎勵連結、作業單連結 |
| gameUI | 2 | 任務彈窗、完成畫面獎勵連結 |
| **總計** | **5** | — |

**未遷移（特殊情況）**：

| 項目 | 原因 |
|------|------|
| 音訊解鎖監聽器 (2個) | 一次性自清理設計 |
| 輔助點擊模式 (1個) | 已有手動 bind/unbind 管理 |
| DOMContentLoaded (1個) | 初始化事件，僅執行一次 |

**版本更新**：v2.0.2 → v2.0.3

**搜尋關鍵字**：`EventManager.on`、`[Phase 3]`

**結論**：A1 記憶體管理重構 100% 完成。

---

### 2026-02-21：Debug Logger 重構為 FLAGS 分類開關系統

**問題**：
- 163 個直接 console.log/warn/error 呼叫分散於程式碼中
- 無法按需開啟/關閉特定分類的日誌
- 生產環境日誌過多

**修改內容**：

1. **新增 VendingMachine.Debug FLAGS 分類開關系統**
   - 位置：VendingMachine 物件開頭
   - 新增 `FLAGS` 物件：14 個分類開關
   - 預設全部關閉，僅 `error: true` 保持開啟
   - 新增 `log(category, ...args)`、`warn(category, ...args)`、`error(...args)` 方法

2. **FLAGS 分類一覽**
   | 分類 | 說明 | 預設值 |
   |------|------|--------|
   | `all` | 全域開關 | `false` |
   | `init` | 初始化 | `false` |
   | `state` | 狀態管理 | `false` |
   | `ui` | UI 渲染 | `false` |
   | `audio` | 音效 | `false` |
   | `speech` | 語音 | `false` |
   | `coin` | 投幣相關 | `false` |
   | `payment` | 付款驗證 | `false` |
   | `product` | 商品選擇 | `false` |
   | `flow` | 遊戲流程 | `false` |
   | `assist` | 輔助點擊模式 | `false` |
   | `hint` | 提示系統 | `false` |
   | `timer` | 計時器 | `false` |
   | `event` | 事件處理 | `false` |
   | `error` | 錯誤訊息 | `true` |

3. **轉換統計**
   - 原始 console 呼叫：163 個
   - 轉換為 VendingMachine.Debug：160 個
   - 保留（Debug 系統內部）：3 個

4. **版本更新**：v2.0.3 → v2.0.4

5. **使用方式**
   ```javascript
   // 開啟特定分類
   VendingMachine.Debug.FLAGS.coin = true;
   VendingMachine.Debug.FLAGS.payment = true;

   // 開啟所有分類
   VendingMachine.Debug.FLAGS.all = true;
   ```

**修改檔案**：
- `js/a1_vending_machine.js`
- `CLAUDE.md`（新增修復記錄）
- `A1_Unit_Completion_Report.md`（本文件）

**驗證方式**：
1. 開啟 A1 自動販賣機遊戲
2. 預設情況下 Console 應無一般日誌（僅錯誤）
3. 在 Console 輸入 `VendingMachine.Debug.FLAGS.coin = true` 後投幣，應顯示投幣分類日誌
4. 輸入 `VendingMachine.Debug.FLAGS.all = true` 應顯示所有分類日誌

---

### 2026-02-22：動畫定義整合

**修改版本**：v2.0.4 → v2.1.0

**整合內容**：

| 階段 | 說明 | 修改數量 |
|------|------|---------|
| Phase 1 | 新增 `injectGlobalAnimationStyles()` 函數 | 31 個 @keyframes |
| Phase 2 | 移除 JS 內嵌 @keyframes | 30 處 |
| Phase 3 | Debug Logger 嵌套物件修復 | 2 處 |

**Phase 1：新增統一動畫函數**

在 `js/a1_vending_machine.js` 中新增：
```javascript
injectGlobalAnimationStyles() {
    if (document.getElementById('a1-global-animations')) return;
    const style = document.createElement('style');
    style.id = 'a1-global-animations';
    // 31 個 @keyframes 定義
}
```

**動畫分類清單（31 個）**：

| 分類 | 動畫名稱 | 用途 |
|------|---------|------|
| 基礎動畫 | `fadeIn`, `fadeInSlide`, `fadeInScale` | 淡入效果 |
| 模態動畫 | `modalSlideIn`, `slideUp`, `modalFadeIn` | 彈窗動畫 |
| 彈跳動畫 | `bounceWelcome`, `bounceResults`, `bounceHint` | 歡迎/完成/提示 |
| 投幣動畫 | `coinInsert`, `coinReturn`, `coinRefund` | 投幣與退幣 |
| 商品動畫 | `dropDown`, `dropFromTop` | 商品掉落 |
| 提示動畫 | `pulseHint`, `gridPulseHint`, `borderPulse`, `clickModePulse` | 各種脈衝高亮 |
| 標記動畫 | `wrongMarkAppear`, `warningMarkAppear`, `warningMarkShake` | 錯誤/警告標記 |
| 完成畫面 | `celebrate`, `statsFadeInSlide`, `buttonsFadeIn`, `completionGlow` | 完成慶祝 |
| 其他動畫 | `iconJump`, `toastSlideIn`, `toastSlideOut` | Toast 提示等 |

**命名衝突處理**：
- `bounce` → 拆分為 `bounceWelcome`（歡迎畫面）、`bounceResults`（完成畫面）
- `pulse` → 重命名為 `clickModePulse`（含中心定位）

**Phase 2：移除內嵌動畫（30 處）**

移除 JS 中直接定義的 `@keyframes` 區塊，改用 `/* @keyframes XXX - moved to injectGlobalAnimationStyles() */` 註解標記。

**Phase 3：Debug Logger 嵌套物件修復**

| 位置 | 原程式碼 | 修正後 |
|------|---------|--------|
| `TimerManager.clearAll()` | `this.Debug.log(...)` | `VendingMachine.Debug.log(...)` |
| `EventManager.removeAll()` | `this.Debug.log(...)` | `VendingMachine.Debug.log(...)` |

**問題說明**：JavaScript 物件字面量中，嵌套物件內的 `this` 不會指向父物件（`VendingMachine`），而是指向嵌套物件本身（`TimerManager` / `EventManager`），導致 `this.Debug` 為 `undefined`。

**搜尋關鍵字**：`injectGlobalAnimationStyles`, `a1-global-animations`, `VendingMachine.Debug.log`

**驗證結果**：
- Console 無 `Cannot read properties of undefined (reading 'log')` 錯誤 ✅
- 31 個動畫正常運作 ✅
- TimerManager.clearAll() 日誌正常輸出 ✅
- EventManager.removeAll() 日誌正常輸出 ✅

---

### 2026-02-24（第二輪）：稽核結果

**第二輪全面稽核結論（無新增可修復 Bug）**：

- ✅ 完成畫面符合 A 系列標準（🎉 完成挑戰、2 個統計卡片、煙火、學習成果）
- ✅ 作業單連結不傳 count 參數
- ✅ `injectGlobalAnimationStyles()` 正確實作
- ⚠️ 3 個不受 EventManager 管理的監聽器（音訊解鎖 2 個 + 點擊模式 1 個）：這些是一次性初始化事件，實際影響有限，為後續優化項目

---

### 2026-02-24：作業單連結統一簡化（僅傳 unit 參數）

**修改內容**：

- 作業單連結原本傳遞遊戲設定參數（`difficulty`, `walletAmount`）
- 各作業單已有完整工具列，用戶開啟後可直接在工具列調整；遊戲設定與作業單設定應獨立運作
- **修復**：移除所有多餘參數，統一改為只傳 `unit` 參數，讓作業單完全使用自己的預設値

**修改檔案**：`js/a1_vending_machine.js`

---

### 2026-02-26：11-19 元語音唸法稽核確認（無修改）

**稽核結果**：A1 的金額語音透過 `convertAmountToSpeech(amount)` → `NumberSpeechUtils.convertToTraditionalCurrency(amount)` 路由，完全使用共用模組。共用模組 `number-speech-utils.js` 已於 2026-02-26 補入 11-19 的 specialCases（`'十一元'`~`'十九元'`），A1 自動受益，無需額外修改。

---

### 2026-02-27：confetti setInterval → 遞迴 TimerManager 模式

**問題**：完成畫面煙火效果使用裸 `setInterval`，場景切換時 `TimerManager.clearAll()` 無法中途停止動畫計時器。

**修復**：將 `setInterval` 改為遞迴 `this.TimerManager.setTimeout(fireConfetti, 250, 'confetti')`，確保 `clearAll()` 或 `clearByCategory('confetti')` 可立即停止動畫。

**修改檔案**：`js/a1_vending_machine.js`

---

### 2026-02-28：輔助點擊遮罩層級修正（CSS）

**修改**：`.machine-header` 加入 `z-index: 10200`，確保標題列始終顯示於輔助點擊遮罩（z-index:10100）之上，標題列按鈕可正常點擊。

**修改檔案**：`css/a1_vending_machine.css`（`.machine-header` 新增 `z-index: 10200`）

---

*報告更新時間：2026-03-04（第三次更新）*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

## 廢棄程式碼稽核（2026-03-01）

**稽核範圍**：`js/a1_vending_machine.js`（7,017 行）

### 結論：無需處理

| 類型 | 位置 | 內容 | 嚴重性 | 建議 |
|------|------|------|--------|------|
| 廢棄標記函數 | Lines 1275–1277 | `// 自訂題數（已廢棄，改用數字輸入器）` — 函數仍存在且有效，僅標記為過時 | 低 | 可在確認不需回滾後清理 |
| 廢棄程式碼注解 | Line 6980 | `// -（已移除 QUIZ_TEMPLATES 死碼）` — 僅為注解，無實際殘留程式碼 | 低 | 注解本身可保留或清除 |
| console.log | Lines 236–250 | Debug 系統定義內部呼叫 | — | 已受 FLAGS 守衛，無需處理 |

**整體評估**：程式碼品質良好。廢棄的 `customQuestionCount` 相關邏輯仍功能正常，僅是過渡期保留。

---

### 2026-03-03：新增「先投幣模式」（coinFirst taskType）

**功能描述**：新增第三種任務類型 `coinFirst`，模擬真實販賣機「先投幣、燈號亮起後再選飲料」的體驗。與現有 `assigned`（指定購買）及 `freeChoice`（自選購買）並列於設定頁面。

**模式說明**：

| 難度 | 流程 |
|------|------|
| 簡單 | 顯示目標飲料（暗色）→ 引導點投幣口 → 逐枚投幣 → 目標飲料燈號亮起 → 引導點選 → 確認購買 |
| 普通/困難 | 全部飲料鎖定（暗色）→ 自由投幣 → 可負擔的飲料逐一亮起 → 選擇已亮起的飲料 → 確認購買 |

**新增 CSS（`css/a1_vending_machine.css`）**：

| Class | 效果 |
|-------|------|
| `.product-item.coin-first-locked` | grayscale + dim，cursor:not-allowed |
| `.product-item.coin-first-unlocking` | `drinkLightUp` 動畫（0.6s，金色光暈） |
| `.product-item.coin-first-available` | 正常亮度 + 金色 box-shadow |
| `@keyframes drinkLightUp` | 0→40%→100% 由暗轉亮 + drop-shadow |

**新增 / 修改 JS 函數（`js/a1_vending_machine.js`）**：

| 函數 | 說明 |
|------|------|
| `_initCoinFirstScreen()` | 新增：初始化 coinFirst 購物畫面（流程步驟、提示、語音） |
| `updateDrinkAvailabilityByCoinAmount()` | 新增：每次投幣後呼叫，解鎖可負擔飲料、播放動畫與語音 |
| `showSettings()` | 新增 coinFirst 按鈕與說明文字 |
| `updateSetting()` | 允許 coinFirst 搭配點擊模式；easy 難度切換時保留 coinFirst |
| `startGame()` / `startNewRound()` | easy+coinFirst 使用 `prepareShoppingSessionForEasyMode()` |
| `prepareShoppingSession()` | 新增 coinFirst 分支（normal/hard）；easy 早期返回納入 coinFirst |
| `showShoppingScreen()` | product-item 加 `data-price` 屬性；coinFirst 鎖定所有飲料；顯示幕 4 種模板 |
| `showCoinModal()` | coinFirst 邏輯**提前至** `handleNormalModeAction` 之前（關鍵Bug Fix） |
| `handleNormalModeAction()` | coinFirst bypass（步驟順序顛倒，跳過步驟追蹤） |
| `validateAction()` | 新增 coinFirst 例外：未選飲料也可投幣 |
| `checkPaymentComplete()` | 新增 null guard（coinFirst 尚未選飲料時返回） |
| `confirmCoinInsertion()` | 新增 coinFirst 早期返回（關閉 modal，引導選亮起飲料） |
| `cancelCoinInsertion()` | 新增 coinFirst easy mode 流程步驟重置 |
| `handleEasyModeAction()` | 新增 coinFirst bypass（easyMode.currentStep 不適用 coinFirst） |
| `selectProduct()` | 新增：亮燈檢查（advanced）、目標飲料檢查（easy）、coinFirst post-selection 路徑 |
| `reset()` | 新增 coinFirst 重新鎖定飲料、恢復顯示幕、恢復投幣口提示 |
| `buildActionQueue()` | 新增 `coinFirstInsert`（easy 投精確金額 / normal 投全部）、`coinFirstSelect`（easy 用 target / normal 選最便宜可負擔） |
| `executeNextAction()` | 新增 coinFirstInsert→coinFirstSelect→confirmPurchase 轉換 |
| `handleWelcomeNavigation()` | coinFirst 使用 `coinFirstInsert` 起始 phase |

**輔助點擊模式（ClickMode）支援**：

| Phase | 行為 |
|-------|------|
| `coinFirstInsert` | 開啟投幣口 → 投入錢包所有硬幣（normal/hard）或剛好夠的硬幣（easy） |
| `coinFirstSelect` | 選最便宜的可負擔飲料（normal/hard）或目標飲料（easy） |
| 轉換 | coinFirstInsert → coinFirstSelect（1200ms 延遲讓燈號動畫完成） → confirmPurchase |

---

### 2026-03-03：coinFirst Bug 修復（2 項）

**Bug 1：`handleEasyModeAction()` 對 coinFirst easy 模式誤判所有操作為錯誤**

| 項目 | 內容 |
|------|------|
| 問題 | coinFirst easy 模式使用 `currentFlowStep` 流程系統，而 `easyMode.currentStep` 永遠停在 `'step1'` 從不更新。`refundMoney()` 呼叫 `handleEasyModeAction('refund')` → step1 只允許 `selectCorrectProduct` → 誤判為錯誤 → 播放錯誤音效並阻止退幣/取消。 |
| 影響 | 簡單 coinFirst 模式下，使用者按退幣或取消按鈕會聽到錯誤音效且操作失敗 |
| 修復 | 在 `handleEasyModeAction()` 開頭加入 `if (taskType === 'coinFirst') return false;` bypass |
| 搜尋關鍵字 | `handleEasyModeAction`, `coinFirst 模式使用 currentFlowStep` |

**Bug 2：`cancelCoinInsertion()` 在 coinFirst easy 模式不重置流程步驟**

| 項目 | 內容 |
|------|------|
| 問題 | 若 coinFirst easy 模式的投幣 modal 被取消，流程步驟停留在 `INSERTING_COINS`（僅允許 `clickCoin` / `cancelCoinInsertion`），使用者無法再次點擊投幣口（`showCoinModal` 被 validateAction 阻擋）。 |
| 影響 | 使用者操作後取消投幣 modal，遊戲流程卡死，無法繼續（低概率但完全阻斷流程） |
| 修復 | 在 `cancelCoinInsertion()` 新增 coinFirst + easy + !selectedProduct 分支，重設流程至 `INSERT_COIN` 並顯示投幣口提示 |
| 搜尋關鍵字 | `cancelCoinInsertion`, `coinFirst 簡單模式：取消後回到投幣口步驟` |

**Bug 3：`buildActionQueue('coinFirstInsert')` normal/hard 模式 null 存取**

| 項目 | 內容 |
|------|------|
| 問題 | 原實作直接執行 `const targetAmount = gs.targetProduct.price;`，但 normal/hard coinFirst 模式下 `targetProduct` 為 null → TypeError crash。 |
| 影響 | 開啟輔助點擊模式 + normal/hard + coinFirst 時，點擊按鈕立即拋出例外，功能完全無法使用 |
| 修復 | 改為 `if (gs.targetProduct) { /* 精確金額 */ } else { /* 投入全部硬幣 */ }`；`coinFirstSelect` 同樣新增 fallback：`targetProduct` 為 null 時選最便宜的可負擔飲料 |
| 搜尋關鍵字 | `coinFirstInsert`, `普通/困難模式：投入全部錢包硬幣` |

**驗證矩陣**：

| 場景 | 預期結果 | 狀態 |
|------|---------|------|
| 設定頁面選 coinFirst | 三種難度均可選 | ✅ |
| easy + coinFirst 開始 | 目標飲料暗色 + 投幣口提示 + 語音 | ✅ |
| 投幣後金額 < 任何飲料 | 所有飲料仍暗色 | ✅ |
| 投幣後金額 ≥ 某飲料 | 該飲料 lightUp 動畫 + 語音 | ✅ |
| 點選未亮飲料 | 錯誤音效 + 語音提示 | ✅ |
| 點選亮起飲料 | 進入確認購買畫面 | ✅ |
| easy coinFirst 按退幣/取消 | 正常退幣，流程重置 | ✅ (Bug 1 fix) |
| easy coinFirst 取消投幣 modal | 流程回到 INSERT_COIN，可再次投幣 | ✅ (Bug 2 fix) |
| normal/hard + clickMode + coinFirst | 自動投入全部硬幣，選最便宜飲料 | ✅ (Bug 3 fix) |
| easy + clickMode + coinFirst | 逐步引導投幣 → 引導點選目標飲料 | ✅ |
| 完成後結果畫面 | 與現有相同（showResults） | ✅ |
| 再玩一次 | 回到設定，coinFirst 選項保留 | ✅ |

---

### 2026-03-03：coinFirst UI 改善（4 項）

**改善 1：`showTransactionSummary()` 📋 交易完成頁面 — 飲料圖片顯示**

| 項目 | 內容 |
|------|------|
| 問題 | 所有模式（assigned / freeChoice / coinFirst）的交易完成頁面只顯示商品名稱文字，無法讓學生確認購買的是哪一瓶飲料 |
| 修復 | 在「交易摘要」白卡中，商品名稱上方加入 `product.imageUrl \|\| product.image` 圖片；無圖時 fallback `product.emoji \|\| '🥤'` |
| 搜尋關鍵字 | `showTransactionSummary`, `購買商品：`, `product.imageUrl \|\| product.image` |

**改善 2：`selectProduct()` coinFirst 普通/困難 — 左上角螢幕圖示更新**

| 項目 | 內容 |
|------|------|
| 問題 | 選飲料後，`screenTitle` 文字更新為「您選擇了 X」，但 `screenProductImg` 不更新，顯示空白 |
| 修復 | coinFirst 分支補加與 freeChoice 路徑相同的 `screenProductImg.src = product.imageUrl \|\| product.image` 邏輯 |
| 搜尋關鍵字 | `coinFirst 模式：已投入足夠金額`, `cfImg.src` |

**改善 3：`showNormalModeHint()` / `removeNormalModeHint()` — coinFirst step1 正確提示**

| 項目 | 內容 |
|------|------|
| 問題 | `showNormalModeHint('step1')` 在 coinFirst 模式下試圖高亮 `targetProduct`（指定飲料），但 coinFirst step1 的任務是「投幣」而非「選飲料」，提示方向完全錯誤 |
| 修復 | step1 分支新增 coinFirst check：若已有 `.coin-first-available`（燈號亮起）→ 高亮所有可選飲料 + 語音「飲料燈號已亮起，請點選您要購買的飲料」；若尚未有飲料亮起 → 高亮 `#coinSlot` + 語音「請點擊投幣口，先投入硬幣」；`removeNormalModeHint('step1')` 對應移除 coinSlot 與 coin-first-available 的高亮 |
| 搜尋關鍵字 | `showNormalModeHint`, `coin-first-available.*easy-mode-hint`, `coinSlotCF` |

**改善 4：`showWalletCoinsModal()` — coinFirst 遮罩透明化**

| 項目 | 內容 |
|------|------|
| 問題 | 投幣彈窗的 `.coin-modal-overlay`（`rgba(0,0,0,0.7)` + `backdrop-filter:blur`）在 coinFirst 模式下遮蓋了飲料格子，學生投幣過程中無法看到飲料燈號逐一亮起的動畫 |
| 修復 | coinFirst 時為 overlay div 加 `coin-first-transparent-overlay` class，CSS 設 `background:transparent !important; backdrop-filter:none !important` |
| 搜尋關鍵字 | `isCoinFirstModal`, `coin-first-transparent-overlay` |

---

### 2026-03-03：coinFirst UI 進一步改善 + Bug 修復（3 項）

**改善 1：投幣彈窗本體背景透明化（玻璃質感）**

| 項目 | 內容 |
|------|------|
| 問題 | 遮罩透明後，投幣視窗的白色 `.coin-modal-content` 方塊仍遮蓋中央飲料區域，學生仍無法清楚觀察燈號變化 |
| 修復 | coinFirst 時為 `.coin-modal-content` 加 `coin-first-content` class；CSS 設 `background:transparent`，加輕白邊框 `rgba(255,255,255,0.35)` 維持輪廓；硬幣區 `.wallet-coins-display`、已投金額欄 `.coin-progress` 改半透明白色；金額數字 `#insertedAmountDisplay` 改金黃色 `#FFD700`，確保在深色背景可讀 |
| 搜尋關鍵字 | `coin-first-content`, `coin-first-transparent-overlay` |

**改善 2：`showTransactionSummary()` 飲料圖片加大 + 進場動畫**

| 項目 | 內容 |
|------|------|
| 問題 | 首次修復的圖片大小（`max-width:110px`）過小，視覺比例不足，與完成頁面的大字體不協調 |
| 修復 | 改為固定 `180×180px`；加 `border-radius:16px` + `box-shadow:0 6px 20px rgba(0,0,0,0.18)`；新增 `productReveal` keyframe 動畫（`scale(0.7)+opacity:0 → scale(1.06) → scale(1)` 0.5s 進場效果）；emoji fallback 字型從 3.5rem 改 5rem |
| 搜尋關鍵字 | `showTransactionSummary`, `productReveal`, `180px` |

**Bug 修復：`processPayment()` 重複出貨（所有模式）**

| 項目 | 內容 |
|------|------|
| 問題 | coinFirst 模式 `handleNormalModeAction()` 開頭即 `return false`（不追蹤步驟），飲料出貨後再次點「確認購買」鈕無任何攔截，`vendProduct()` 被重複呼叫。Debug log 顯示同一輪出貨 3 次（step3→step4 → step4→step4 → step4→step4），取物口掉落動畫和退幣口零錢動畫重複產生 |
| 影響 | coinFirst 普通/困難模式：多按一下確認購買 → 重複出貨動畫、重複語音，UX 混亂；理論上對 assigned/freeChoice 普通/困難亦有防護效益 |
| 修復 | `processPayment()` 在防抖之後、步驟檢查之前加入 `productVended` 守衛：`if (this.state.gameState.productVended)` → 播 `error03` 音效 + 語音提示 + `return`；有找零時說「已完成購買，請到取物口拿取飲料，並記得拿退幣口的零錢」，無找零時說「已完成購買，請到取物口拿取飲料」 |
| 搜尋關鍵字 | `processPayment`, `productVended`, `飲料已出貨，忽略重複確認購買` |

**驗證矩陣（本輪新增）**：

| 場景 | 預期結果 | 狀態 |
|------|---------|------|
| 所有模式完成購買後看交易完成頁面 | 顯示 180px 飲料圖片 + 進場動畫 | ✅ |
| coinFirst normal/hard 選飲料後左上角螢幕 | 顯示飲料圖示 | ✅ |
| coinFirst normal/hard 按提示鈕（step1，未投幣） | 高亮投幣口 + 語音引導投幣 | ✅ |
| coinFirst normal/hard 按提示鈕（step1，已有飲料亮起） | 高亮所有亮起飲料 + 語音引導選飲料 | ✅ |
| coinFirst 投幣過程中 modal 可見飲料格子燈號 | 遮罩透明，可看到飲料亮起 | ✅ |
| coinFirst 投幣視窗白色背景 | 透明玻璃質感，金額數字金黃色 | ✅ |
| coinFirst normal/hard 出貨後再按確認購買 | 錯誤音 + 語音「已完成購買...」，無重複出貨 | ✅ |

---

## 2026-03-03：coinFirst UI 再改善（3 項）

### 問題背景

本輪修復三個 coinFirst 視覺細節：

---

**改善 1：簡單模式 coinFirst — 飲料圖示僅於選擇後顯示**

| 項目 | 內容 |
|------|------|
| 問題 | 簡單模式 coinFirst 使用獨立的 `screenTargetImg` 模板分支，遊戲開始時就顯示目標飲料的灰暗圖片，與「選擇飲料後才顯示」的預期不符 |
| 修復 | 刪除 `coinFirst && targetProduct` 條件分支，合併至統一的 `coinFirst` 分支（使用 `screenProductImage` / `screenProductImg`，初始 `display:none`）；移除 `updateDrinkAvailabilityByCoinAmount()` 中的 `screenTargetImg.style.filter = ''` 呼叫；退幣處理器改為重置 `screenProductImg`（隱藏 + 清空 src）而非設定暗色 filter |
| 搜尋關鍵字 | `screenProductImg`, `screenProductImage`, `updateDrinkAvailabilityByCoinAmount` |

---

**改善 2：coinFirst 投幣視窗 — 各區塊獨立背景，外框完全透明**

| 項目 | 內容 |
|------|------|
| 問題 | 前一輪修復將整個 `.coin-modal-content` 設為半透明玻璃，但仍有白邊框和陰影；學生反映應讓各元素自己保有不透明背景，外框不應有任何輪廓 |
| 修復 | `.coin-first-content` 改為 `background:transparent; box-shadow:none; border:none`；新增 `.cf-header-card` div 包住標題「💰 請投入硬幣」和副標題「點擊硬幣進行投入」，以深色半透明 `rgba(20,28,58,0.88)` 為背景；硬幣格子 `.wallet-coins-display` 和已投金額欄 `.coin-progress` 同樣套用相同深色背景；coinFirst 時 HTML 模板條件性地插入 `<div class="cf-header-card">` 開關標籤 |
| 搜尋關鍵字 | `cf-header-card`, `coin-first-content`, `rgba(20, 28, 58` |

---

**改善 3：A4 交易完成畫面顯示商品圖示**

| 項目 | 內容 |
|------|------|
| 問題 | A4 `showTransactionSummaryScreenWithData()` 的交易摘要卡片只有文字，缺少商品圖示，視覺不如 A1 |
| 修復 | 在 `summary-card` 的「交易摘要」標題後、第一個 `.summary-item` 前加入商品圖示區塊：單一商品使用 `getProductIconHTML(selectedItem, '160px')` + `productReveal` 0.5s 進場動畫；組合商品（multi-selection）以 flex wrap 排列各子商品的 70px 圖示 + 名稱；複用 A1 相同的 `@keyframes productReveal` CSS |
| 搜尋關鍵字 | `showTransactionSummaryScreenWithData`, `getProductIconHTML`, `productReveal` |

---

**驗證矩陣（本輪新增）**：

| 場景 | 預期結果 | 狀態 |
|------|---------|------|
| coinFirst easy 開始遊戲，左上角螢幕 | 顯示「請先投幣」文字，無飲料圖片 | ✅ |
| coinFirst easy 投幣完成，目標飲料亮起 | 螢幕文字更新為「X 燈號亮起了！請點選 X」，仍無圖片 | ✅ |
| coinFirst easy 點選目標飲料 | 螢幕顯示飲料圖片（`selectProduct()` 更新 `screenProductImg`） | ✅ |
| coinFirst 退幣後螢幕 | 文字重置「請先投幣」，飲料圖片隱藏 | ✅ |
| coinFirst 投幣 modal（任何難度） | 外框透明無邊框；標題、副標題、硬幣格、金額欄各有深色半透明背景 | ✅ |
| A4 交易完成畫面（單一商品） | 160px 商品圖示 + productReveal 動畫 | ✅ |
| A4 交易完成畫面（組合商品） | 多張 70px 圖示 + 名稱水平排列 | ✅ |

---

### 2026-03-04：coinFirst 拆分為 coinFirstAssigned + coinFirstFree

**功能概述**：將原有單一 `coinFirst` taskType 拆分為兩種，提供更精細的教學情境選擇。

| taskType | 說明 | 支援難度 |
|----------|------|---------|
| `coinFirstAssigned` | 先投幣 → 投入目標飲料確切金額並按確定 → 目標飲料亮起 → 選指定飲料 | 簡單、普通、困難 |
| `coinFirstFree` | 先投幣 → 投入足夠金額後可負擔飲料即時亮起 → 自由選任意已亮飲料 | 普通、困難（不支援簡單） |

**行為差異對照**：

| 功能 | coinFirstAssigned | coinFirstFree |
|------|-------------------|---------------|
| 目標彈窗 | ✅（關閉後呼叫 `_initCoinFirstScreen()`） | ❌ 無（直接初始化） |
| 燈號時機 | 簡單：最後一枚自動亮；普通/困難：確定按鈕驗證通過後才亮（只亮目標飲料） | 每次投幣後即時更新所有可負擔飲料 |
| 投幣驗證 | 金額不足 → 退幣；超額 → 退幣；普通3次錯誤自動提示；困難3次出現提示鈕 | 有投幣 + 有飲料可選即通過 |
| 簡單模式 | ✅ 支援（target modal → 投幣口提示 → 逐枚投幣 → 目標飲料亮） | ❌ 不支援 |

**新增函數**：

| 函數 | 說明 |
|------|------|
| `isCoinFirstMode()` | 新增 helper，`taskType === 'coinFirstAssigned' \|\| === 'coinFirstFree'` |
| `_unlockTargetDrink()` | 現有函數（供 easy 模式使用），動畫解鎖目標飲料 + 語音 + easy 提示 |
| `_recordCoinFirstAssignedError()` | 計錯誤次數；普通模式達3次自動 `showCoinHint()`；困難模式由 `showWalletCoinsModal()` 顯示提示鈕 |

**修改函數**：

| 函數 | 修改說明 |
|------|---------|
| `showSettings()` | 兩個 taskType 各為獨立按鈕，分兩列呈現（與先選飲料後投幣風格一致） |
| `updateSetting()` | easy 切換時 `coinFirstFree` → `coinFirstAssigned`；隱藏/顯示 `coinFirstFree` 按鈕；說明文字新增兩種描述 |
| `prepareShoppingSession()` | `coinFirstAssigned` 進入 assigned 分支（選目標飲料）；`coinFirstFree` 直接 `showShoppingScreen()` |
| `showShoppingScreen()` | `coinFirstAssigned` → 先顯示 target modal；`coinFirstFree` → 直接 `_initCoinFirstScreen()` |
| `closeTargetItemModal()` | `coinFirstAssigned` 關閉後呼叫 `_initCoinFirstScreen()` |
| `showTargetItemModal()` | `coinFirstAssigned` 按鈕文字改「開始投幣」 |
| `_initCoinFirstScreen()` | 依 assigned/free 給出不同語音引導 |
| `confirmCoinInsertion()` | 拆分為 `coinFirstFree`（舊行為）與 `coinFirstAssigned`（金額驗證）兩個獨立分支 |
| `showWalletCoinsModal()` | `coinFirstAssigned` 困難才顯示提示鈕；`coinFirstFree` 保持舊邏輯 |
| `showCoinHint()` | fallback 改用 `selectedProduct \|\| targetProduct` |
| 全域 ~20 處 | `=== 'coinFirst'` 改為 `isCoinFirstMode()` 或具體 `taskType` 值 |

---

### 2026-03-04：設定頁先投幣選項版面修正

**問題**：`coinFirst` 拆分後新增兩個按鈕，若直接加入原有 button-group，四個按鈕橫排顯示，視覺不易區分。

**修復**：參照「先選飲料後投幣」的版面模式，將兩種 coinFirst 選項改為獨立的分組區塊：

```html
<!-- 先投幣後選飲料 分組 -->
<div style="margin-bottom:8px;">
    <div style="font-size:0.8em;color:#666;...">先投幣後選飲料</div>
    <div class="button-group">
        <button ... data-value="coinFirstAssigned">購買指定飲料</button>
        <button ... data-value="coinFirstFree" style="${easy?'display:none;':''}">自選購買飲料</button>
    </div>
</div>
```

---

### 2026-03-04：coinFirstAssigned 即時亮燈 + 投幣彈窗 z-index 修復

**Bug 1：coinFirstAssigned 普通/困難模式飲料燈號不即時更新**

| 項目 | 內容 |
|------|------|
| 問題 | 原設計為「確定按鈕驗證後才亮燈」，在 `updateDrinkAvailabilityByCoinAmount()` 加入 early return 阻止即時亮燈。但使用者體驗上希望 coinFirstAssigned 與 coinFirstFree 一樣，投幣過程中即時顯示可負擔飲料 |
| 修復 | 移除 `updateDrinkAvailabilityByCoinAmount()` 中 `coinFirstAssigned && isAdvancedMode()` 的 early return；`confirmCoinInsertion()` 驗證通過後不再呼叫 `_unlockTargetDrink()`（飲料已亮），改為語音引導「${target.name}的燈號亮起來了，請點選這個飲料」 |
| 修改檔案 | `js/a1_vending_machine.js` |
| 搜尋關鍵字 | `updateDrinkAvailabilityByCoinAmount`, `confirmedTarget`, `驗證通過：關閉彈窗，目標飲料已在投幣時即時亮起` |

**Bug 2：投幣彈窗被標題列遮蓋（所有先選飲料後投幣模式）**

| 項目 | 內容 |
|------|------|
| 問題 | 動態建立的 `wallet-coins-modal`（class: `coin-modal`）CSS z-index 為 1000，低於標題列的 inline z-index: 10200，導致彈窗顯示於標題列後方，困難模式尤其明顯 |
| 修復 | `css/a1_vending_machine.css` `.coin-modal` `z-index` 從 `1000` 改為 `10300`（高於標題列 10200、遮罩 10100） |
| 修改檔案 | `css/a1_vending_machine.css` |
| 搜尋關鍵字 | `.coin-modal` |

**z-index 層級表（更新後）**：

| 元素 | z-index | 說明 |
|------|---------|------|
| 輔助點擊遮罩 `.click-exec-overlay` | 10100 | 遮蓋遊戲區域 |
| 標題列 `.machine-header` | 10200 | 始終高於遮罩 |
| 投幣彈窗 `.coin-modal` | 10300 | 高於標題列，完整顯示 |

**驗證矩陣**：

| 場景 | 預期結果 | 狀態 |
|------|---------|------|
| coinFirstAssigned 普通/困難投幣過程 | 投幣後飲料即時亮起（同 coinFirstFree） | ✅ |
| coinFirstAssigned 普通/困難按確定（金額正確） | 彈窗關閉 + 語音「XXX的燈號亮起來了...」 | ✅ |
| coinFirstAssigned 普通/困難按確定（金額不足） | 錯誤音 + 退幣動畫 + 記錄錯誤次數 | ✅ |
| coinFirstFree 普通/困難投幣後按確定 | 原有行為不變 | ✅ |
| 投幣彈窗在困難模式下顯示 | 彈窗完整顯示於標題列上方 | ✅ |
| Settings：簡單模式 coinFirstFree 隱藏 | 切換到 easy 時自動改為 coinFirstAssigned | ✅ |

---

### 2026-03-04：coinFirst 流程稽核 — 3 項 Bug 修復

**稽核範圍**：全面稽核 `coinFirstAssigned` 與 `coinFirstFree` 所有函數（`selectProduct()`、`showNormalModeHint()`、`confirmCoinInsertion()`、`cancelCoinInsertion()` 等 26 個相關函數）。

---

**Bug 1（嚴重）：`coinFirstAssigned` 進階模式可選任意已亮飲料**

| 項目 | 內容 |
|------|------|
| 問題 | `selectProduct()` 進階模式中，`coinFirst` 共用路徑（`isCoinFirstMode()` block）只驗證「飲料是否已亮起（已投入足夠金額）」，但 **不驗證是否為目標飲料**。`assigned` 模式的目標飲料比對（`taskType === 'assigned'`）不包含 `coinFirstAssigned`，導致使用者在 `coinFirstAssigned` 普通/困難模式下可點選任何已亮起的飲料，包括非目標飲料。 |
| 影響範圍 | `coinFirstAssigned` 普通/困難所有難度 |
| 修復 | 在 `isCoinFirstMode()` 亮燈驗證後加入 `coinFirstAssigned` 的目標比對：<br>目標不符 → `audio.play('error')` + `showWrongProductMark()` + 語音「請選擇指定的飲料：XXX」+ `handleNormalModeAction('selectWrongProduct')` + `return` |
| 搜尋關鍵字 | `cfTarget`, `請選擇指定的飲料` |

---

**Bug 2（中等）：`coinFirstFree` 進階模式選定飲料後無法重新選擇**

| 項目 | 內容 |
|------|------|
| 問題 | `selectProduct()` 進階模式的重選邏輯（`selectedProduct` 已存在時的分支）只處理 `freeChoice`（`isFreeChoiceMode = taskType === 'freeChoice'`），不包含 `coinFirstFree`。當 `coinFirstFree` 使用者選定一杯飲料後若想改選另一杯已亮起的飲料，會落入 `else` 分支（呼叫 `handleNormalModeAction('selectProduct_afterSelected')` 然後 `return`），被錯誤阻擋無法重選。 |
| 影響範圍 | `coinFirstFree` 普通/困難 |
| 修復 | 在 `isFreeChoiceMode` 分支**前**加入 `coinFirstFree` 獨立分支：直接清除 `selectedProduct` 並重置 DOM 高亮，不受 `insertedAmount > 0` 限制（因錢已在機器中），允許重新選擇任意已亮飲料。 |
| 搜尋關鍵字 | `coinFirstFree：允許重新選擇飲料`, `allProductsCFF` |

---

**Bug 3（中等）：`showNormalModeHint()` step1 `coinFirstAssigned` 提示方向錯誤**

| 項目 | 內容 |
|------|------|
| 問題 | `showNormalModeHint()` step1 中，`isCoinFirstMode()` 分支有飲料亮起時，高亮**所有**已亮起的飲料（`coin-first-available`），語音說「請點選您要購買的飲料」。在 `coinFirstAssigned` 中，若使用者多投了錢導致多杯飲料亮起，提示方向模糊，應明確指向目標飲料。 |
| 影響範圍 | `coinFirstAssigned` 普通/困難（提示按鈕觸發或普通3次錯誤後自動提示） |
| 修復 | 在 `isCoinFirstMode()` 且有飲料亮起時，依 `taskType` 拆分：<br>• `coinFirstAssigned`：找目標元素加 `easy-mode-hint`，語音「請點選指定的飲料：XXX」<br>• `coinFirstFree`：保持原有行為（高亮所有亮起飲料） |
| 搜尋關鍵字 | `指定購買：只高亮目標飲料`, `hintTarget` |

---

**驗證矩陣（本輪新增）**：

| 場景 | 預期結果 | 狀態 |
|------|---------|------|
| coinFirstAssigned 普通/困難：選目標飲料 | 正確音效 + 進入確認購買 | ✅ |
| coinFirstAssigned 普通/困難：選非目標已亮飲料 | 錯誤音 + 紅 ✗ 標記 + 語音「請選擇指定的飲料：XXX」 | ✅ |
| coinFirstAssigned 普通/困難：選未亮飲料 | 錯誤音 + 警告標記 + 語音「還沒有亮起來」 | ✅ |
| coinFirstFree 普通/困難：已選飲料後想換選 | 清除舊選擇，允許點選另一已亮飲料 | ✅ |
| coinFirstFree 普通/困難：點選未亮飲料 | 錯誤音 + 警告標記 | ✅ |
| coinFirstAssigned 普通/困難：提示按鈕（有飲料亮起） | 僅高亮目標飲料 + 語音「請點選指定的飲料：XXX」 | ✅ |
| coinFirstFree 普通/困難：提示按鈕（有飲料亮起） | 高亮所有已亮飲料 + 語音「請點選已亮起的飲料」 | ✅ |
| coinFirstAssigned/Free 提示（尚未投幣） | 高亮投幣口 + 語音「請投幣」 | ✅ |

---

## 跨輪計時器洩漏稽核（2026-03-03）

**稽核背景**：A3 單元曾發現 `speakText()` 10 秒備援計時器在下一輪觸發導致跳輪的 Bug，已對全系列交叉稽核。

**A1 稽核結論：安全（無此問題）**

| 條件 | 狀態 | 說明 |
|------|------|------|
| ① 新輪次從語音 callback 觸發 | 不成立 ✅ | 不適用 |
| ② interrupted 不呼叫 safeCallback | 不成立 ✅ | 不適用（條件③已保護） |
| ③ 新輪次函數無 clearAll() | **不成立 ✅** | `startGame()` 內有 `TimerManager.clearAll()`，新輪次開始時所有舊計時器被清除 |

**結論**：條件③不成立，備援計時器在新輪次開始時即被清除，bug 不可能發生。

---

### 2026-03-04（第三次更新）：輔助點擊模式說明文字 + A1~A6 彈窗 z-index 稽核

---

#### 輔助點擊模式說明文字修正

| 項目 | 內容 |
|------|------|
| 問題 | `showSettings()` 輔助點擊模式的警告文字說「⚠️ 僅適用於『簡單模式 + 指定商品』」，但 `coinFirstAssigned` 拆分後此模式也支援輔助點擊，說明文字未更新 |
| 修復 | 改為「⚠️ 僅適用於『簡單模式 + 購買指定飲料』（含先投幣指定模式）」，明確涵蓋 `assigned` 與 `coinFirstAssigned` 兩種指定模式 |
| 修改檔案 | `js/a1_vending_machine.js` |
| 搜尋關鍵字 | `含先投幣指定模式` |

---

#### A1~A6 彈窗 z-index 稽核

**目標**：確認所有 A 系列彈窗在輔助點擊模式及一般模式下均正確顯示於標題列上方。

**設計原則**：

| 情境 | 彈窗應在位置 |
|------|------------|
| 輔助點擊模式（遮罩透明） | 標題列 < 彈窗 < 遮罩(10100)（遮罩透明，彈窗仍可見；遮罩在上，確保點擊由 capture 監聽器統一攔截） |
| 一般模式 | 標題列 < 彈窗 |

**稽核結果**：

| 單元 | 標題列 z-index | 彈窗 z-index 範圍 | 遮罩 | 狀態 | 說明 |
|------|--------------|-----------------|------|------|------|
| A1 | 10（CSS）/ 10200（購物畫面 inline） | 10000~10300 | 10100 | ✅ 例外合理 | 見下方說明 |
| A2 | 100 | 1000~10000 | 10100 | ✅ | `.money-selection-modal` z-index:1000 符合 100 < 1000 < 10100 |
| A3 | 100 | 9999~10000 | 10100 | ✅ | 所有彈窗均在標題列與遮罩之間 |
| A4 | 100 | 10000~10001 | 10100 | ✅ | 所有彈窗均在標題列與遮罩之間 |
| A5 | 100 | 10000~10003 | 10100 | ✅ | `.numeric-input-modal`(10002) 只在普通/困難出現，與輔助點擊模式（僅簡單）不重疊 |
| A6 | 100 | 9998~10000 | 10100 | ✅ | 所有彈窗均在標題列與遮罩之間 |

**A1 特殊說明（`.coin-modal` z-index:10300 高於遮罩）**：

A1 購物畫面的標題列為 `position: sticky`，z-index 設為 10200（inline style in `showShoppingScreen()`）。`.coin-modal` 需要覆蓋整個畫面包含標題列，因此必須 > 10200，導致也超過遮罩（10100）。此為結構性例外，不可避免：

```
遮罩(10100) < 標題列(10200) < 投幣彈窗(10300)
```

輔助點擊模式下，A1 使用 `document.addEventListener('click', handler, true)`（capture 捕獲階段），在任何元素接收事件前即攔截，因此彈窗高於遮罩不影響自動執行邏輯。

**無需修改**：稽核確認所有單元均符合設計原則，無需變更。

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

## coinFirst 模式全面稽核與 Bug 修復（2026-03-05）

### 稽核範圍

全面稽核 `coinFirstAssigned` 與 `coinFirstFree` 所有相關函數（26 個，含 `handleClickModeClick()`、`cancelCoinInsertion()`、`buildActionQueue()`、`confirmCoinInsertion()` 等），確認流程完整性與 edge case 處理。

---

### Bug 1（嚴重）：輔助點擊模式 — 任務彈窗關閉後進入錯誤階段

| 項目 | 說明 |
|------|------|
| 函數 | `handleClickModeClick()` |
| 問題 | `coinFirstAssigned` 輔助點擊模式顯示任務彈窗（`waitingForModal = true`）後，使用者點擊關閉彈窗時，程式碼將 `clickModeState.currentPhase` 強制設為 `'selectProduct'`，導致輔助點擊直接跳到選飲料階段，**跳過投幣步驟（coinFirstInsert 階段）**。|
| 影響範圍 | `coinFirstAssigned` 簡單模式 + 輔助點擊模式 |
| 修復 | 將階段設定從固定 `'selectProduct'` 改為依 `taskType` 判斷：`coinFirstAssigned` → `'coinFirstInsert'`，其他 → `'selectProduct'`；對應的 500ms 延遲再確認也同步修正。 |
| 搜尋關鍵字 | `coinFirstAssigned 關閉彈窗後應進入投幣階段` |

---

### Bug 2（中等）：取消投幣在 coinFirst 普通/困難模式無引導語音

| 項目 | 說明 |
|------|------|
| 函數 | `cancelCoinInsertion()` |
| 問題 | `isCoinFirstMode()` + 未選飲料的取消投幣處理，原只有簡單模式分支（重設流程步驟 + 顯示投幣口提示）；普通/困難模式無對應分支，落入函數末尾的通用 `speech.speak('已關閉投幣視窗')` 語音，沒有任何行動指引。 |
| 影響範圍 | `coinFirstAssigned` / `coinFirstFree` 普通模式、困難模式 |
| 修復 | 將簡單模式判斷外移至 `isCoinFirstMode()` 大分支內，新增 `else`（普通/困難）分支：播放「已關閉投幣視窗，請繼續投幣」並 `return`，防止繼續執行通用邏輯。 |
| 搜尋關鍵字 | `cancelCoinInsertion`, `coinFirst 模式：取消後回到投幣提示` |

---

### Bug 3（輕微）：`confirmCoinInsertion()` 函數注解錯誤

| 項目 | 說明 |
|------|------|
| 函數 | `confirmCoinInsertion()` |
| 問題 | 函數開頭注解「確定投幣（普通模式專用）」，但實際此函數處理：coinFirstFree（所有模式）、coinFirstAssigned（所有模式）、標準 assigned/freeChoice 普通/困難模式。注解誤導維護者。 |
| 修復 | 改為「確定投幣（普通/困難模式 + 所有 coinFirst 模式）」。 |

---

### 死碼紀錄（不刪除，保留供參考）

| 函數 | 行號 | 說明 |
|------|------|------|
| `_unlockTargetDrink()` | ~L4444 | 定義但從未被呼叫。原計畫在 `confirmCoinInsertion()` 驗證通過後用於 DOM 操作（解鎖目標飲料），後改由 `updateDrinkAvailabilityByCoinAmount()` 即時更新取代，本函數成為死碼。保留作為文件參考。 |

---

### 稽核確認正常的功能

| 場景 | 預期行為 | 狀態 |
|------|---------|------|
| coinFirstAssigned easy 輔助點擊：關閉彈窗後進投幣階段 | 建立 coinFirstInsert 佇列 → 依序投幣 → 目標飲料亮起 → 選飲料 | ✅ 修復後正常 |
| coinFirstFree normal/hard 取消投幣 | 播放「已關閉投幣視窗，請繼續投幣」+ return | ✅ 修復後正常 |
| coinFirstAssigned easy：目標飲料亮起後引導 | SELECT_PRODUCT 步驟 + 提示框 + 語音 | ✅ |
| coinFirstAssigned normal/hard：金額不足退幣 | 錯誤音 + 退幣動畫 + 記錄錯誤（≥3次 auto hint） | ✅ |
| coinFirstAssigned normal/hard：超額退幣 | 錯誤音 + 退幣動畫 + 記錄錯誤 | ✅ |
| coinFirstFree normal/hard：確認投幣 | 彈窗關閉 + 語音引導選飲料 | ✅ |
| coinFirstFree normal/hard：金額不足時重開彈窗 | 語音「金額不足」+ 1500ms 後重開投幣視窗 | ✅ |
| coinFirstAssigned/Free 取消投幣（easy） | 回 INSERT_COIN 步驟 + 投幣口提示 | ✅ |
| coinFirstAssigned/Free 取消投幣（normal/hard） | 語音「請繼續投幣」 | ✅ 修復後正常 |
| showNormalModeHint step1（已亮起，coinFirstAssigned） | 只高亮目標飲料 + 語音 | ✅ |
| showNormalModeHint step1（已亮起，coinFirstFree） | 高亮所有已亮飲料 + 語音 | ✅ |
| showNormalModeHint step1（尚未投幣） | 高亮投幣口 + 語音「請投幣」 | ✅ |
| buildActionQueue coinFirstInsert（easy，has target） | clickCoinSlot + insertCoin×N（精確金額） | ✅ |
| buildActionQueue coinFirstInsert（easy，無 target fallback） | clickCoinSlot + 全部錢包硬幣 | ✅ |
| buildActionQueue coinFirstSelect（有 target） | selectProduct(target.id) | ✅ |
| buildActionQueue coinFirstSelect（無 target） | 選最便宜可負擔飲料 | ✅ |
| Phase 轉換 coinFirstInsert → coinFirstSelect | 1200ms 延遲後 waitingForStart = true | ✅ |
| Phase 轉換 coinFirstSelect → confirmPurchase | waitingForStart = true | ✅ |

---

## 跨單元修復（2026-03-05）— 設定頁連結按鈕文字粗黑修復

**影響範圍**：A2~A6、C1~C6、F1~F6（共 17 個單元），A1 不受影響（未載入 ai-theme.css）

### 問題描述

所有單元設定頁的「開啟獎勵系統」與「產生作業單」`<a>` 按鈕均有：
- HTML inline style：`style="color: #000 !important; font-weight: bold !important;"`
- CSS 規則：`a.selection-btn { color: #000 !important; font-weight: bold !important; }` 於各 unit CSS
- CSS 規則：`a.selection-btn { color: #000 !important; font-weight: bold !important; }` 於 `ai-theme.css`

然而實際顯示時，A2~A6、C、F 系列的按鈕文字呈現藍色／非粗黑，A1 和 A5 正常。

### 根本原因

`ai-theme.css` 的「連結」區塊（原 L1050）有全域規則：

```css
a {
    color: var(--ai-vibrant-orange);  /* = #00aeff（藍色）*/
    transition: color var(--transition-fast);
    text-decoration: none;
}
```

此規則的 `transition: color` 子屬性使瀏覽器在某些狀態切換（hover、focus、active）時觸發 CSS 顏色過渡動畫，導致 `a.selection-btn { color: #000 !important }` 的 `!important` 在過渡期間失效或視覺呈現不一致。

A1 正常是因為 **不載入 ai-theme.css**，所以沒有這個全域 `a {}` 干擾。
A5 正常是因為 `a5_atm_simulator.css` 的 dark mode section 有 `.settings-content .selection-btn { color: #000 !important; }` 額外強化。

### 修復方案

修改 `css/ai-theme.css`，將全域 `a {}` 和 `a:hover {}` 改為排除按鈕類連結：

```css
/* 前（問題版本）*/
a {
    color: var(--ai-vibrant-orange);
    transition: color var(--transition-fast);
    text-decoration: none;
}
a:hover {
    color: var(--ai-vibrant-orange-hover);
    text-shadow: 0 1px 3px rgba(255, 165, 0, 0.3);
}

/* 後（修復版本）*/
a:not(.selection-btn):not(.choice-btn) {
    color: var(--ai-vibrant-orange);
    transition: color var(--transition-fast);
    text-decoration: none;
}
a:not(.selection-btn):not(.choice-btn):hover {
    color: var(--ai-vibrant-orange-hover);
    text-shadow: 0 1px 3px rgba(255, 165, 0, 0.3);
}
```

使用 `:not(.selection-btn):not(.choice-btn)` 排除按鈕類連結，讓這些元素完全不受全域 `a {}` 顏色規則影響，由各自的 `a.selection-btn { color: #000 !important }` 規則明確控制。

### 驗證

| 場景 | 預期結果 |
|------|---------|
| A2~A6 設定頁「開啟獎勵系統」按鈕 | 文字粗黑 ✅ |
| C1~C6 設定頁「開啟獎勵系統」按鈕 | 文字粗黑 ✅ |
| F1~F6 設定頁「開啟獎勵系統」按鈕 | 文字粗黑 ✅ |
| 設定頁以外的一般 `<a>` 連結 | 仍顯示橙/藍色（`--ai-vibrant-orange`），hover 效果正常 ✅ |
| A1 設定頁（不受影響） | 文字粗黑 ✅（ai-theme.css 未載入） |

---

## 輔助點擊遮罩不覆蓋標題列（方案C）（2026-03-08）

### 問題描述

輔助點擊模式的透明遮罩（`click-exec-overlay`，z-index:10100）以 `inset:0` 覆蓋整個視窗，導致標題列按鈕（設定⚙️、獎勵🎁）被遮罩覆蓋而無法點擊。

### 修復方案

遮罩建立時動態量測標題列高度：

```javascript
const toolbarEl = document.querySelector('.toolbar, .top-bar, header, #toolbar');
const _tbBottom = toolbarEl ? toolbarEl.getBoundingClientRect().bottom : 60;
overlay.style.cssText = `
    position:fixed; top:${_tbBottom}px; left:0; right:0; bottom:0;
    background:transparent; z-index:10100; cursor:pointer;
`;
```

- `inset:0` 改為 `top:${_tbBottom}px;left:0;right:0;bottom:0`（fallback 60px）
- A2/A3/A4/A5/A6 CSS 標題列 z-index 從 10200 降回 100
- A1 標題列維持 10200（購物畫面 sticky 需要，結構性例外）

### 驗證

| 場景 | 預期結果 |
|------|---------|
| 輔助點擊模式啟動後 | 遮罩從標題列下方開始，標題列按鈕可正常點擊 ✅ |
| 遊戲區域 | 遮罩仍覆蓋，輔助點擊引導邏輯正常 ✅ |

### 關鍵搜尋詞

`getBoundingClientRect().bottom`, `_tbBottom`, `click-exec-overlay`

---

## speechTimer raw clearTimeout 修復（2026-03-08）

### 問題描述

`this.state.gameState.speechTimer` 由 `this.TimerManager.setTimeout()` 賦值，返回 TimerManager 內部計數器 ID（1、2、3…），而非瀏覽器原生 timer ID。`confirmCoinInsertion()` 和 `cancelCoinInsertion()` 使用原生 `clearTimeout(speechTimer)` 嘗試清除，原生 `clearTimeout` 不認識 TimerManager 內部 ID，呼叫為 no-op，導致語音計時器在 coinFirst 模式投幣確認/取消時無法正確取消。

### 修復

兩處 `clearTimeout(this.state.gameState.speechTimer)` 改為 `this.TimerManager.clearTimeout(this.state.gameState.speechTimer)`：

```javascript
// confirmCoinInsertion() 和 cancelCoinInsertion() 中（兩處相同模式）
if (this.state.gameState.speechTimer) {
    this.TimerManager.clearTimeout(this.state.gameState.speechTimer);  // 修復前：clearTimeout(...)
    this.state.gameState.speechTimer = null;
}
```

### 驗證

Grep `(?<!TimerManager\.)clearTimeout\(` in `js/a1_vending_machine.js` 返回無匹配。

**注意**：上述掃描於 2026-03-08 完成，但掃描時遺漏了 `_visualDelayTimer` 的裸 clearTimeout（見下方 2026-03-09 修復）。

### 關鍵搜尋詞

`TimerManager.clearTimeout`, `speechTimer`, `confirmCoinInsertion`, `cancelCoinInsertion`

---

## _visualDelayTimer 裸 clearTimeout 修復（2026-03-09）

**問題**：輔助點擊模式視覺延遲計時器 `clickState._visualDelayTimer` 由 `this.TimerManager.setTimeout()` 建立（返回內部計數器 ID，非瀏覽器 timer ID），但清除時使用裸 `clearTimeout(clickState._visualDelayTimer)`，無法真正清除該計時器，導致輔助點擊模式可能卡住。

**修復**：改為 `this.TimerManager.clearTimeout(clickState._visualDelayTimer)`。

**修改**：`js/a1_vending_machine.js`（搜尋 `_visualDelayTimer` 的清除處）

---

## 提示按鈕吉祥物位置修正（2026-03-10）

**問題**：遊戲畫面標題列（`.machine-header`）中，`.hint-button` CSS 設有 `position: absolute; right: 20px; top: 50%; transform: translateY(-50%)`，吉祥物 `<img>` 作為 flex 兄弟元素置於其前，但 `hint-button` 脫離 flex 流，兩者視覺上不相鄰——吉祥物浮在左側，按鈕浮在右側。

**修復**（`js/a1_vending_machine.js`）：將 `<img>` 和 `<button class="hint-button">` 一起包進 `<div style="position:absolute;right:20px;top:50%;transform:translateY(-50%);display:flex;align-items:center;gap:6px;">`，button 補加 inline style `position:static;transform:none` 覆蓋 CSS 絕對定位，使吉祥物正確顯示於提示鈕左側。

**關鍵搜尋詞**：`position:static;transform:none`（`hint-button` 在 `showShoppingScreen` 模板中）

---

## 提示鈕行為修正：assigned / coinFirstAssigned 模式改顯示彈窗（2026-03-21）

### 問題描述

`showNormalModeHint('step1')` 在兩種指定任務模式中，原本直接在目標飲料 DOM 元素加上 `easy-mode-hint` 黃框動畫。此行為有兩個問題：

1. **視覺提示不夠明確**：黃框只高亮飲料，學生需自行判斷是否為目標；彈窗可同時顯示飲料名稱、圖片與價格，資訊量更完整。
2. **`coinFirstAssigned` 模式多餘語音**：原先呼叫 `this.speech.speak(...)` 與彈窗本身的語音重複。

### 受影響情境

| 模式 | 難度 | 觸發時機 | 原行為 | 修正後 |
|------|------|---------|--------|--------|
| `assigned`（先選飲料再投幣） | 普通 | 關閉彈窗後、未選飲料前按提示鈕 | 目標飲料加 `easy-mode-hint` 黃框 + 語音「請選擇正確的飲料」 | 顯示 `showTargetItemModal()` 指定飲料彈窗 |
| `coinFirstAssigned`（先投幣再選飲料） | 普通 | 飲料燈號亮起後、未選飲料前按提示鈕 | 目標飲料加 `easy-mode-hint` 黃框 + 語音「請點選指定的飲料：XXX」 | 顯示 `showTargetItemModal()` 指定飲料彈窗 |

### 修復方式

在 `showNormalModeHint()` → `case 'step1'` 中：

**1. `coinFirstAssigned` 分支**（有飲料亮起的情況）：

```javascript
// 修復前
if (this.state.settings.taskType === 'coinFirstAssigned') {
    const hintTarget = this.state.gameState.targetProduct;
    if (hintTarget) {
        const hintTargetEl = document.querySelector(`[data-product-id="${hintTarget.id}"]`);
        if (hintTargetEl) hintTargetEl.classList.add('easy-mode-hint');
        this.speech.speak(`請點選指定的飲料：${hintTarget.name}`);
    }
}

// 修復後
if (this.state.settings.taskType === 'coinFirstAssigned') {
    if (!document.getElementById('target-item-modal')) {
        this.showTargetItemModal();
    }
}
```

**2. `assigned` 分支**（`targetProductId` 存在的情況）：

```javascript
// 修復前
if (targetProductId) {
    const targetElement = document.querySelector(`[data-product-id="${targetProductId}"]`);
    if (targetElement) {
        targetElement.classList.add('easy-mode-hint');
        this.speech.speak('請選擇正確的飲料');
    }
}

// 修復後
if (targetProductId) {
    if (!document.getElementById('target-item-modal')) {
        this.showTargetItemModal();
    }
}
```

兩處均加入 `document.getElementById('target-item-modal')` 防重複開啟守衛，避免連續點擊提示鈕產生多個彈窗。

### 驗證矩陣

| 場景 | 預期結果 | 狀態 |
|------|---------|------|
| `assigned` 普通模式：關閉彈窗後按提示鈕 | 顯示指定飲料彈窗（含圖片/名稱/價格）| ✅ |
| `assigned` 普通模式：彈窗已開時再按提示鈕 | 不重複開啟第二個彈窗 | ✅ |
| `coinFirstAssigned` 普通模式：飲料亮起後按提示鈕 | 顯示指定飲料彈窗 | ✅ |
| `coinFirstAssigned` 普通模式：尚未投幣時按提示鈕 | 進入 `else` 分支 → 高亮投幣口 + 語音（原有行為不變）| ✅ |
| `coinFirstFree` 普通模式：按提示鈕 | 高亮所有已亮飲料（原有行為不變）| ✅ |
| `freeChoice` 普通模式：按提示鈕 | 無 `targetProductId`，不進入此分支（原有行為不變）| ✅ |

### 關鍵搜尋詞

`showNormalModeHint`, `target-item-modal`, `showTargetItemModal`, `指定任務模式：顯示指定飲料彈窗`

---

---

## 修復記錄速查（從 CLAUDE.md 遷移，2026-04-29）

> 以下記錄原存於 CLAUDE.md 修復記錄速查表，詳細說明見各搜尋關鍵字對應程式碼。

| 項目 | 搜尋關鍵字 |
|------|------------|
| A1 自訂金額彈窗升級 | `showCustomWalletModal`, `a1CustomWalletQty`, `a1AdjustWalletQty`, `a1ConfirmWallet`, `generateWalletCoins customWalletDetails` |
| A1 coinFirst 新增 | `_initCoinFirstScreen`, `updateDrinkAvailabilityByCoinAmount`, `coin-first-locked` |
| A1 coinFirst easy誤判 | `handleEasyModeAction`, `return false` |
| A1 coinFirst cancel修復 | `cancelCoinInsertion`, `INSERT_COIN` |
| A1 coinFirst buildQueue crash | `buildActionQueue('coinFirstInsert')`, `coinFirstSelect` |
| A1 交易摘要圖片 | `showTransactionSummary`, `product.imageUrl` |
| A1 coinFirst 螢幕圖片 | `screenProductImg` |
| A1 coinFirst step1提示 | `showNormalModeHint`, `coin-first-available` |
| A1 coinFirst 遮罩透明 | `coin-first-transparent-overlay`, `coin-first-content` |
| A1 交易摘要圖片動畫 | `productReveal`, `180×180px` |
| A1 productVended重複出貨 | `processPayment`, `productVended` |
| A1 coinFirst easy螢幕初始 | `screenProductImage`, `screenProductImg` |
| A1 coinFirst modal背景 | `.cf-header-card`, `coin-first-content` |
| A1 coinFirst 完成 | `drinkLightUp`, `coinFirstInsert`, `coinFirstSelect` |
| A1 coinFirst拆分 | `isCoinFirstMode()`, `coinFirstAssigned`, `coinFirstFree` |
| A1 coinFirst設定頁兩列 | `coinFirstFree` button |
| A1 coinFirstAssigned即時亮燈 | `updateDrinkAvailabilityByCoinAmount`, `.coin-modal z-index:10300` |
| A1 coinFirst流程稽核3項 | `cfTarget`, `coinFirstFree：允許重新選擇`, `指定購買：只高亮目標` |
| A1 輔助點擊說明更新 | `showSettings`, warning text |
| A1 coinFirst稽核3項 | `coinFirstAssigned 關閉彈窗後應進入投幣階段` |
| A1 交易完成頁卡片加寬＋金錢圖示（2026-04-10）| `mkMoneyIcons`, `a1-money-icons-row` |
