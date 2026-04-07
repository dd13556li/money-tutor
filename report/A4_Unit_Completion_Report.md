# A4 超市購物單元 — 完成經驗報告書

> **建立日期**：2026-02-09（日）13:19
> **更新日期**：2026-04-07（付款提示彈窗音效修正）、2026-04-07（困難模式步驟3付款提示改為彈窗）、2026-03-30（任務框新增🔊朗讀按鈕）、2026-03-27（購買任務彈窗商品圖片放大 128px）、2026-03-14（簡單/輔助點擊模式步驟1–4「點這裡」提示動畫 + 方框；計算機圖片修正）
> **專案名稱**：Money Tutor 金錢教學系統
> **單元編號**：A4 — 模擬超市購物
> **報告類型**：單元完成經驗與開發建議

---

## 一、檔案規模總覽

| 檔案 | 路徑 | 行數 | 大小 |
|------|------|------|------|
| HTML 頁面 | `html/a4_simulated_shopping.html` | 288 行（+302 行 inline CSS） | — |
| JS 核心邏輯 | `js/a4_simulated_shopping.js` | 14,960 行 | 673 KB |
| CSS 樣式 | `css/a4_simulated_shopping.css` | 3,886 行 | 81 KB |
| 作業單產生器 | `worksheet/units/a4-worksheet.js` | 615 行 | — |
| **合計** | — | **19,749 行** | — |

### 素材資源

| 類型 | 數量 | 路徑 | 說明 |
|------|------|------|------|
| 錢幣圖片 | 18 張 PNG（9面額×正反面） | `images/money/*_yuan_front/back.png` | 共用 |
| 音效檔案 | 1 種（success.mp3） | `audio/success.mp3` | 共用 |
| 商品圖片 | 119 張 PNG | `images/a4/icon-a4-*.png` | 各商品專用圖示（emoji fallback） |
| 資料檔案 | 2 個 JSON | `images/a4/` | 商品名稱對照表 |

### 與 A1～A3 規模比較

| 項目 | A1 販賣機 | A2 理髮廳 | A3 麥當勞 | A4 超市購物 | A4 vs A1 | A4 vs A3 |
|------|----------|----------|----------|------------|----------|----------|
| JS 行數 | 6,080 | 8,163 | 9,691 | **14,682** | +141% | +51% |
| HTML 行數 | 31 | 450 | 252 | 288（+302） | +1,803% | +134% |
| CSS 行數 | 821 | 3,136 | 1,721 | **3,528** | +330% | +105% |
| 合計行數 | 7,290 | 12,090 | 12,074 | **19,415** | +166% | +61% |
| 品項數 | 19 飲料 | 6 服務 | 70 餐點 | **119 商品** | +584% | +86% |
| 商店/場所數 | 1 | 1 | 1 | **12 + 1 魔法** | — | — |
| 作業單行數 | 358 | 341 | 410 | **615** | +72% | +50% |

**A4 是 A 系列中規模最大的單元**，JS 行數為 A1 的 2.4 倍，商品數達 130 個，橫跨 12 種商店。

---

## 二、單元特色

### 2.1 完整模擬超市購物結帳體驗

A4 模擬了日常超市購物的完整流程：

1. **選擇商店** → 從 12 種商店中選擇購物場所
2. **瀏覽商品** → 在商品架上瀏覽各種商品（含名稱、Emoji、價格）
3. **選擇商品** → 加入購物清單（商品顯示專用圖片，搭配 emoji fallback）
4. **確認價格** → 查看商品價格與總金額
5. **投幣/紙鈔付款** → 從錢包中拖放金錢到付款區域
6. **找零驗證** → 依難度不同以三選一 / 拖放驗證 / 計算器輸入方式確認找零
7. **完成交易** → 進入下一題或顯示完成畫面

### 2.2 12 種商店類型（A 系列之最）

| # | 商店 | Emoji | 商品數 | 價格範圍（參考） |
|---|------|-------|--------|----------------|
| 1 | 便利商店 | 🏪 | 10 | 低價位 |
| 2 | 菜市場 | 🥬 | 10 | 低價位 |
| 3 | 早餐店 | 🍳 | 10 | 低價位 |
| 4 | 美式速食店 | 🍟 | 9 | 中價位 |
| 5 | 超級市場 | 🛒 | 10 | 中價位 |
| 6 | 服飾店 | 👕 | 10 | 高價位 |
| 7 | 3C 用品店 | 📱 | 10 | 高價位 |
| 8 | 書局 | 📚 | 10 | 中價位 |
| 9 | 玩具店 | 🧸 | 10 | 中價位 |
| 10 | 文具店 | ✏️ | 10 | 低價位 |
| 11 | 美妝店 | 💄 | 10 | 中高價位 |
| 12 | 運動用品店 | ⚽ | 10 | 高價位 |
| 13 | 魔法商店 | 🪄 | 自訂（最多 6） | 自訂 |
| | **合計** | — | **119 + 自訂** | — |

### 2.3 三種難度模式

| 面向 | 簡單模式 | 普通模式 | 困難模式 |
|------|---------|---------|---------|
| 價格變動 | 固定 | ±10% | ±15% |
| 價格取捨 | 整數 | 四捨五入 | 不規則 |
| 價格範圍 | 5~50 元 | 10~200 元 | 20~500 元 |
| 付款方式 | 輔助點擊 或 拖放 | 拖放 | 拖放 |
| 找零驗證 | 三選一 | 拖放金錢 | 計算器輸入 |
| 提示機制 | 自動高亮＋語音 | 錯誤 3 次後 | 無提示 |
| UI 速度 | 較慢（1000ms） | 中等（800ms） | 較快（600ms） |

### 2.4 兩種任務類型

| 類型 | 說明 |
|------|------|
| **指定商品** | 系統隨機指定一項商品，學習者必須找到並完成購買 |
| **自選購買** | 學習者在錢包金額內自由選擇商品（Click Mode 啟用時不可選） |

### 2.5 場景管理系統（SceneConfig / SceneManager）

A4 延續 A3 的場景管理架構，並擴展為 **8 個場景**（A3 為 7 個）：

| 場景名稱 | 用途 | onEnter | onExit |
|---------|------|---------|--------|
| `settings` | 設定頁面 | `showSettings()` | — |
| `welcome` | 歡迎序列 | 歡迎動畫＋語音 | — |
| `shopping` | 商品選擇 | 渲染商品架 | 清理事件 |
| `priceConfirmation` | 價格確認 | 顯示商品＋價格 | — |
| `paying` | 付款場景 | 渲染付款區域 | 取消語音 |
| `checking` | 找零驗證 | 顯示找零選項 | — |
| `calculation` | 困難模式計算 | 渲染計算器 | 取消語音 |
| `transactionSummary` | 交易摘要 | 顯示摘要 | — |

**切換機制**：`SceneManager.switchScene(newScene, context)` + `isTransitioning` 旗標防止重複切換。

### 2.6 輔助點擊模式（Click Mode）

專為**特殊需求學習者**設計：

- **啟用條件**：僅限簡單模式
- **操作方式**：任意處點擊即執行下一步
- **階段佇列**：welcome → shopping → priceConfirmation → payment → checking → nextQuestion
- **視覺延遲鎖**：500ms（等待 UI 渲染）
- **防快速連點**：600ms 安全鎖
- **智慧偵測**：自動偵測彈窗，不干擾使用者互動

### 2.7 魔法商店（自訂商品系統）

與 A1 的魔法商品類似，教師/家長可：
- 上傳自訂商品圖片
- 設定名稱與價格
- 最多 6 個自訂商品
- 讓教學情境更貼近學習者日常生活

### 2.8 錢包系統

| 錢包類型 | 金額 | 說明 |
|---------|------|------|
| 預設 100 元 | 100 | 低價商店 |
| 預設 500 元 | 500 | 中價商店 |
| 預設 1000 元 | 1000 | 高價商店 |
| 自訂金額 | 使用者設定 | 可調整各面額數量（0~10 枚） |

自訂錢包含互動式面額調整介面（1、5、10、50、100、500、1000 元各別 +/- 按鈕）。

### 2.9 普通模式錯誤 3 次提示機制

```
步驟錯誤計數器：
├── productSelection: 0    → 商品選擇錯誤
├── payment: 0             → 付款錯誤
└── changeCalculation: 0   → 找零計算錯誤
```

各步驟獨立計數，達到 3 次後顯示提示：
- **商品選擇**：高亮目標商品 + 語音提示
- **付款**：黃色光暈提示所需硬幣組合
- **找零計算**：語音念出正確答案

### 2.10 Loading 畫面與 Error Boundary

- **Loading 畫面**：紫色漸層背景 + 旋轉動畫，1 秒後自動消失
- **Error Boundary**：全域錯誤捕捉 + 「發生錯誤」彈窗 + 重新載入按鈕 + `role="alert"`
- **NoScript Fallback**：JavaScript 停用時顯示友善提示訊息
- **Skip Link**：鍵盤無障礙跳過導航連結

### 2.11 作業單系統

獨立的紙本作業單產生器（**A 系列最大，615 行**），提供 **10 種題型**＋**12 種商店**：

| # | 題型 | 說明 |
|---|------|------|
| 1 | 數字填空（價格計算） | 計算多樣商品總價 |
| 2 | 填空與選擇（價格計算） | 填空＋選正確金錢組合 |
| 3 | 圖示選擇（價格計算） | 從 3 組金錢圖示中勾選 |
| 4 | 提示選擇（價格計算） | 選項旁加金額提示 |
| 5 | 提示完成（價格計算） | 填寫各幣值所需數量 |
| 6 | 數字填空（找零計算） | 計算付款後的找零 |
| 7 | 填空與選擇（找零計算） | 找零填空＋選金錢組合 |
| 8 | 圖示選擇（找零計算） | 勾選正確找零組合 |
| 9 | 提示選擇（找零計算） | 附金額提示的找零選擇 |
| 10 | 提示完成（找零計算） | 填寫各幣值找零數量 |

**A4 作業單獨特功能**：
- 每題含 2~4 樣商品的購物清單（含各項小計）——唯一支援多商品清單的 A 系列作業單
- 依商店自動調整錢包金額
- 支援「混合」模式（每題隨機抽取不同商店）
- `fill-select` 題型在找零 ≤ 0 時自動 fallback 為純填空

---

## 三、語音系統使用分析

### 3.1 技術實現

使用 **Web Speech API**（`window.speechSynthesis`），搭配 `SpeechSynthesisUtterance` 物件：

```
語音引擎初始化流程：
1. 檢測瀏覽器支援 → 2. 取得語音清單 → 3. 優先選台灣中文語音
```

**語音優先順序**：
1. Microsoft HsiaoChen（Windows 台灣女聲）
2. Google 國語（Chrome 台灣語音）
3. 其他 zh-TW 語音
4. 任何中文語音（fallback）

### 3.2 模板化語音系統（speechTemplates）

A4 使用**完全模板化**語音，各難度有獨立語音腳本：

**各難度語音風格差異**：

| 場景 | 簡單模式 | 普通模式 | 困難模式 |
|------|---------|---------|---------|
| 歡迎 | 「歡迎來到商店，今天有特別優惠喔！」 | 含注意商品標價提示 | 「歡迎光臨！」（極簡） |
| 價格播報 | 「現在{itemName}的價格是{price}元」 | 「今天{itemName}的價格是{price}元」 | 「{itemName}{price}元」 |
| 價格變動 | 「今天{itemName}特價{price}元」 | 「{itemName}現在是{price}元」 | 「價格{price}元」 |

**難度遞進設計**：簡單模式語音最詳細友善，困難模式語音最精簡，模擬真實購物情境中店員不同程度的協助。

### 3.3 語音觸發時機一覽

| 場景 | 語音內容範例 | 觸發時機 |
|------|-------------|---------|
| 歡迎畫面 | 「歡迎來到商店」 | 進入歡迎場景 |
| 商品選擇 | 「請選擇{itemName}」 | 指定任務時 |
| 價格播報 | 「{itemName}的價格是{price}元」 | 選擇商品後 |
| 付款提示 | 「請付款{total}元」 | 進入付款場景 |
| 金額不足 | 「金額不足，還需要{remaining}元」 | 付款不足時 |
| 找零選擇 | 「請選擇正確的找零」 | 進入找零場景 |
| 選錯商品 | 「選錯了，請選擇指定的商品」 | 選錯時 |
| 完成挑戰 | 「完成挑戰！」 | 結束畫面 |

### 3.4 金額語音轉換

A4 使用 `this.convertToTraditionalCurrency(amount)` 函數（委託給 `NumberSpeechUtils`）：

| 金額 | 語音輸出 | 說明 |
|------|---------|------|
| 2 元 | 「兩元」 | 2 + 單位用「兩」 |
| 12 元 | 「拾貳元」 | 個位 2 用「貳」 |
| 25 元 | 「貳拾伍元」 | 標準中文數字 |
| 200 元 | 「兩百元」 | 百位 2 用「兩」 |
| 500 元 | 「伍佰元」 | 標準中文數字 |

### 3.5 語音速率

A4 **未明確設定自訂語速**，使用瀏覽器 Web Speech API 預設速率（約 1.0x）。

與其他單元比較：
- A1：標準速率
- A2：0.9~0.95x（慢速清晰）
- A3：1.2x / 0.9x（雙速率）
- A4：瀏覽器預設

### 3.6 語音注意事項

- **行動裝置限制**：iOS/Android 需要使用者互動後才能啟用語音（已由 `audio-unlocker.js` 處理）
- **語音佇列管理**：使用 `interrupt` 選項可打斷前一句語音
- **語音處理旗標**：`isProcessingSpeech` 旗標防止語音重疊
- **場景切換清理**：`paying` 和 `calculation` 場景的 `onExit` 會取消語音合成

---

## 四、觸控與桌面支援

### 4.1 桌面端支援

- 標準滑鼠點擊操作
- hover 效果（商品項目、按鈕、錢幣）
- 拖放付款（drag-and-drop）
- **無鍵盤快捷鍵**（A4 不支援鍵盤快捷鍵，與 A2/A3 不同）

### 4.2 觸控端支援

- **Viewport 設定**：`width=device-width, initial-scale=1.0`
- **防下拉重整**：`overscroll-behavior-y: contain`（html、body、#app 三層防護）
- **觸控拖放**：引用 `touch-drag-utility.js`，支援觸控裝置的錢幣拖放
- **觸控音效解鎖**：引用 `audio-unlocker.js`
- **觸控裝置偵測**：CSS `@media (hover: none) and (pointer: coarse)` 移除 hover 效果、增大觸控目標至 44px
- **行動裝置除錯面板**：引用 `mobile-debug-panel.js`

### 4.3 防快速連點（Debounce）多層防護

A4 擁有 A 系列中**最完善的多層防抖系統**：

| 層級 | 機制 | 說明 |
|------|------|------|
| **State 鎖** | `isProcessingProductSelection` | 商品選擇處理中 |
| **State 鎖** | `isProcessingPayment` | 付款處理中 |
| **State 鎖** | `isProcessingChange` | 找零處理中 |
| **State 鎖** | `isProcessingSpeech` | 語音處理中 |
| **轉場鎖** | `isTransitioning` | 場景切換中，防止重複切換 |
| **Click Mode 鎖** | `clickReadyTime` + 600ms | 輔助模式防快速連點 |
| **時間鎖** | 雙擊防護 800ms | 防止誤觸雙擊 |

**依難度調整的時間配置**：

| 設定項 | 簡單模式 | 普通模式 | 困難模式 |
|--------|---------|---------|---------|
| 價格顯示延遲 | 500ms | 300ms | 200ms |
| 語音延遲 | 1000ms | 800ms | 600ms |
| Click Mode 視覺延遲 | 500ms | — | — |

### 4.4 ARIA 標籤與無障礙

| 元素 | ARIA 屬性 | 值 |
|------|----------|---|
| `<a>` (Skip Link) | `aria-label` | 「跳過導航，直接到主要內容」 |
| `#loading-screen` | `aria-label` | 「遊戲載入中」 |
| `#app` | `role` | `main` |
| `#app` | `aria-label` | 「上街買東西遊戲主要內容」 |
| `#error-boundary` | `role` | `alert` |

**A4 獨有的無障礙特色**：
- **Skip Link**（跳過導航連結）—— A 系列中唯一提供的單元
- **NoScript Fallback** —— JavaScript 停用時的友善提示

### 4.5 與 A1～A3 的觸控支援比較

| 項目 | A1 | A2 | A3 | A4 |
|------|------|------|------|------|
| 音效解鎖 | 自行實現 | `audio-unlocker.js` | `audio-unlocker.js` | `audio-unlocker.js` |
| 除錯面板 | 不引用 | `mobile-debug-panel.js` | 內嵌 inline | `mobile-debug-panel.js` |
| 主題系統 | 不引用 | `theme-system.js` | `theme-system.js` | `theme-system.js` |
| 鍵盤快捷鍵 | 無 | 1-6, Enter, Esc | 1-4, Enter, Esc | **無** |
| 拖曳工具 | 不引用 | 不引用 | `touch-drag-utility.js` | `touch-drag-utility.js` |
| Loading | 無 | 有 | 有 | 有 |
| Error Boundary | 無 | 有 | 有 | 有 |
| ARIA | 基本 | 完整 | 完整 | **最完整（含 Skip Link）** |
| Skip Link | 無 | 無 | 無 | **有** |
| NoScript | 無 | 無 | 無 | **有** |
| 觸控裝置 CSS | 無 | 無 | 無 | **`hover:none` 偵測** |
| prefers-reduced-motion | 無 | 無 | 無 | **有** |
| 防抖層數 | 6 層 | 4 層 | 4 層 | **7 層** |

---

## 五、不同版面（RWD 響應式設計）

### 5.1 響應式斷點

| 斷點 | 範圍 | 版面配置 |
|------|------|---------|
| **桌面版** | >768px | 雙欄佈局：商品架（左）＋購物車/付款（右 300px） |
| **平板/手機版** | ≤768px | 單欄堆疊，商品與購物車上下排列 |
| **小手機** | ≤480px | 進一步縮小間距與字型 |

另有 3 個無障礙媒體查詢：

| 媒體查詢 | 用途 |
|---------|------|
| `prefers-reduced-motion: reduce` | 停用所有動畫（持續 0.01ms） |
| `prefers-contrast: high` | 增強邊框至 3px |
| `hover: none, pointer: coarse` | 觸控裝置移除 hover、增大觸控目標 |

### 5.2 商品 Grid 佈局轉換

| 斷點 | Grid 設定 | 效果 |
|------|----------|------|
| 桌面版 | `repeat(auto-fit, minmax(200px, 1fr))` | 自適應 3~5 欄 |
| ≤768px | `1fr` | 單欄，商品垂直堆疊 |

**購物區域整體佈局**：
- 桌面版：`grid-template-columns: 1fr 300px`（左側商品 + 右側面板）
- 平板以下：單欄（`1fr`），面板在商品下方

### 5.3 與 A1～A3 的 RWD 比較

| 項目 | A1 | A2 | A3 | A4 |
|------|------|------|------|------|
| RWD 斷點數 | 3 | 4 | 8 | **3 + 3 無障礙** |
| 最大螢幕支援 | 1024px+ | 1200px+ | 2560px+ | 768px+ |
| 佈局系統 | Grid（auto-fill） | Flex（三面板） | Grid（5→1 欄） | **Grid（雙欄→單欄）** |
| 高對比模式 | 無 | 有 | 有 | **有** |
| 減少動畫 | 無 | 無 | 無 | **有** |
| 觸控裝置 CSS | 無 | 無 | 無 | **有** |

### 5.4 設定頁面版面

- 居中白色卡片，最大寬度 600px
- 按鈕群組使用 flex-wrap，自動換行
- 商店選擇按鈕含 Emoji 圖示，依錢包金額動態過濾

### 5.5 完成畫面版面

- 紫色漸層全螢幕背景（`linear-gradient(135deg, #667eea 0%, #764ba2 100%)`）
- 居中卡片最大寬度 500px
- 統計卡片使用 `grid-template-columns: repeat(2, 1fr)`
- 垂直置中顯示（`min-height: 100vh` + flexbox）
- 學習成果 + 表現評價區塊

---

## 六、動畫系統

### 6.1 CSS @keyframes 動畫（CSS 檔案，8 個）

| 動畫名稱 | 效果 | 時長 | 用途 |
|----------|------|------|------|
| `slideUp` | 上滑淡入 | — | 內容進場 |
| `bounceIn` / `bounceInCenter` | 彈跳縮放進場 | — | 彈窗出現（`bounceInCenter` 含 `translate(-50%, -50%)` 居中） |
| `pulse` | 綠色光暈脈衝 | — | 成功狀態 |
| `fadeIn` | 淡入 | 0.3s | 通用淡入 |
| `modalSlideIn` | 縮放＋上滑 | 0.3s | 彈窗進場 |
| `bounce` | 上下彈跳 | 1s 循環 | 浮動圖示 |
| `pulseHighlight` | 黃色光暈脈衝 | 1.5s 循環 | 步驟提示 |
| `bounceHint` | 水平彈跳 | 1s 循環 | 提示標籤 |

### 6.2 JS 內嵌 @keyframes 動畫（JS 檔案，17 個）

| 動畫名稱 | 效果 | 用途 |
|----------|------|------|
| `moneyFloat` | 金錢浮動 | 付款動畫 |
| `modalFadeIn` | 彈窗淡入 | 彈窗出現 |
| `modalSlideIn` | 彈窗滑入 | 彈窗出現 |
| `modalFadeOut` | 彈窗淡出 | 彈窗關閉 |
| `calculatorSlideIn` | 計算器滑入 | 困難模式計算器 |
| `checkAppear` | 打勾出現 | 正確反饋 |
| `errorAppear` | 錯誤出現 | 錯誤反饋 |
| `gradient-flow` | 漸層流動 | 背景動態 |
| `pulse-glow` | 脈衝發光 | 按鈕高亮 |
| `correctGreenGlow` | 綠色光暈 | 正確反饋 |
| `incorrectRedPulse` | 紅色脈衝 | 錯誤反饋 |
| `amount-bounce` | 金額彈跳 | 金額變動 |
| `correct-pulse` | 正確脈衝 | 正確反饋 |
| `error-sequence` | 錯誤序列 | 連續錯誤 |
| `fadeIn` | 淡入 | 通用 |
| `slideDown` | 下滑 | 內容進場 |
| `celebrate` / `bounce` | 慶祝彈跳 | 完成畫面 |

### 6.3 HTML 內嵌動畫（inline style，3 個）

| 動畫名稱 | 用途 |
|----------|------|
| `spin` | Loading 旋轉器 |
| `errorX-appear` | 錯誤叉號出現 |
| `correct-tick-appear` | 正確打勾出現 |

### 6.4 動畫總數比較

| 項目 | A1 | A2 | A3 | A4 |
|------|------|------|------|------|
| CSS @keyframes | 14 | 8 | 16 | 8 |
| JS 內嵌動畫 | 2 | — | 14 | **17** |
| HTML 內嵌動畫 | — | — | — | **3** |
| **動畫總數** | **16** | **8** | **~24** | **~28（最多）** |

### 6.5 Canvas-Confetti 煙火效果

| 觸發場景 | 粒子數 | 持續時間 |
|---------|--------|---------|
| 完成挑戰 | 50×n（漸減） | 3 秒 |

A4 使用 canvas-confetti **v1.9.2**（本地副本 `js/confetti.browser.min.js`），與所有單元版本一致。

---

## 七、注意事項

### 7.1 瀏覽器相容性

| 功能 | Chrome | Safari | Firefox | Edge |
|------|--------|--------|---------|------|
| Web Speech API | 完整支援 | 部分支援 | 部分支援 | 完整支援 |
| Canvas-Confetti | 完整支援 | 完整支援 | 完整支援 | 完整支援 |
| CSS Grid | 完整支援 | 完整支援 | 完整支援 | 完整支援 |
| Touch Drag | 完整支援 | 完整支援 | 完整支援 | 完整支援 |
| `backdrop-filter` | 完整支援 | 完整支援 | 完整支援 | 完整支援 |
| Audio autoplay | 需互動 | 需互動 | 需互動 | 需互動 |

- **Safari 語音**：中文語音選擇有限，可能退回系統預設語音
- **Firefox**：`speechSynthesis.getVoices()` 需透過 `onvoiceschanged` 事件取得語音清單

### 7.2 行動裝置注意事項

- iOS Safari 必須在使用者互動後才能播放音效（已由 `audio-unlocker.js` 處理）
- 觸控裝置的拖放操作需要 `touch-drag-utility.js` 支援
- `overscroll-behavior-y: contain` 防止下拉重整（三層防護）
- 觸控裝置自動移除 hover 效果（`@media (hover: none)` 偵測）
- A4 商品支援專用圖片顯示（`images/a4/icon-a4-*.png`），搭配 emoji fallback（`onerror` 機制）

### 7.3 教學使用注意事項

- **12 種商店**覆蓋廣泛生活情境，教師可依學習者程度選擇適合的商店
- **低價商店**（便利商店、菜市場、早餐店、文具店）適合初學者
- **高價商店**（服飾店、3C 用品店、運動用品店）適合進階練習
- **魔法商店**最多 6 個自訂商品
- **自選模式**下不計算對錯
- **簡單模式**的輔助點擊模式啟用時，強制為「指定商品」任務

### 7.4 已知限制

- **無鍵盤快捷鍵**：A4 不支援鍵盤快捷鍵（A2/A3 都有支援）
- **大型觸控螢幕未優化**：A4 無 1920px+ / 2560px+ 斷點（A3 有）
- **版本查詢字串**：HTML 中 JS/CSS 檔案帶版本號 `?v=9.52.86`，需手動更新

### 7.5 狀態管理現況

| 項目 | 狀態 |
|------|------|
| 統一重置函數 | ✅ `resetNormalModeState()` |
| 布林旗標 | `isProcessingProductSelection`, `isProcessingPrice`, `isProcessingPayment`, `isProcessingChange`, `isProcessingSpeech`, `isProcessingHint`, `loadingQuestion` |
| 錯誤計數器 | `stepErrorCounts`, `stepHintsShown` |
| 重置位置 | 集中（`resetNormalModeState()` + `startQuiz()` 初始化） |
| 評價 | ✅ **最佳實踐** |

**說明**：A4 實現了統一的 `resetNormalModeState()` 函數，所有狀態旗標在場景切換時集中重置，是 A 系列的最佳範例

**搜尋關鍵字**：`resetNormalModeState`

---

## 八、Bug 檢測與已知問題

### 8.1 已確認的程式碼問題

| # | 嚴重度 | 問題描述 | 位置 |
|---|--------|---------|------|
| 1 | ~~**高**~~ | ~~467 個 `console.log` 殘留（**A 系列最多**）~~ **已修正**（2026-02-21：Debug Logger FLAGS 系統重構，551 個 console 統一管理，14 個分類） | 分散於 JS 全檔 |
| 2 | ~~**高**~~ | ~~104 個 `setTimeout` vs 僅 10 個 `clearTimeout`，94 個定時器未清理~~ **已修正**（2026-02-17：全部遷移至 TimerManager） | 分散於 JS 全檔 |
| 3 | **高** | 228 個 `!important`（JS 內嵌）+ 182 個（CSS 檔案）= **410 個 !important**（A 系列最多） | JS + CSS 檔案 |
| 4 | **中** | 21 個 `addEventListener` vs 僅 6 個 `removeEventListener`，15 個監聽器未移除 | 分散於 JS 全檔 |
| 5 | **中** | ~~CSS `bounceIn` @keyframes 重複定義 2 次~~ **已修正**（2026-02-11：改名為 `bounceInCenter`） | `css/a4_simulated_shopping.css` |
| 6 | **中** | ~~canvas-confetti 版本 v1.6.0 不一致~~ **已修正**（2026-02-09：統一為本地 v1.9.2） | `html/a4_simulated_shopping.html` |
| 7 | ~~**中**~~ | ~~大量 CSS 動畫分散在 3 處（CSS 檔案、JS 檔案、HTML inline）~~ **已修正**（2026-02-22：`injectGlobalAnimationStyles()` 整合，17 個 JS 內嵌 + 3 個 HTML 內嵌 @keyframes 統一管理） | 三個檔案 |
| 8 | **低** | ~~舊商品資料陣列殘留~~ **已修正**（2026-02-11：已刪除死碼） | 搜尋「舊的商品資料」 |
| 9 | **低** | 自訂錢包面額限制 0~10 枚，高價商店（如 3C 用品店）可能需要更多紙鈔 | 錢包系統 |
| 10 | **建議** | 作業單與遊戲各自獨立定義 119 個商品，需手動同步 | `a4-worksheet.js` + `a4_simulated_shopping.js` |
| 11 | **低** | 自訂商品/錢包設定頁使用 `alert()` 阻塞式對話框（26 處，搜尋 `alert(`） | ⚠️ 暫緩（低優先） |

### 8.2 各 A 系列 Bug 數量比較

| 問題類型 | A1 | A2 | A3 | A4 |
|---------|-----|-----|-----|-----|
| console.log | — | 66 | 201 | **467** |
| 未清理 setTimeout | — | ~~42~~ 0 | 64 | ~~**94**~~ 0 |
| 未移除 addEventListener | — | — | 39 | 15 |
| !important 總數 | — | 48 | 76 | **410** |
| 價格不一致 | 無 | **有** | 無 | 無（需手動同步） |
| 未定義語音模板 | 無 | 無 | **2 個** | 無 |
| 圖片命名問題 | 無 | 無 | 5 個 | 無（119 張統一命名 `icon-a4-*.png`） |
| 動畫重複定義 | 無 | 無 | 1 個 | ~~1 個~~ **已修正** |
| 版本不一致 | — | — | — | ~~confetti v1.6 vs v1.9~~ **已修正** |
| 死碼 | ~200 行 | ~50 行 | ~15 行 | ~~少量~~ **已清除** |

### 8.3 非 Bug 但需注意的設計

| 項目 | 說明 |
|------|------|
| JS 單檔 14,682 行 | **A 系列最大**，含 12 種商店的完整商品定義 + 8 場景 + 3 難度設定 |
| 動畫分散 3 處 | CSS 檔 8 個 + JS 檔 17 個 + HTML 3 個，統一管理困難 |
| 圖片 + Emoji fallback | 所有商品已加入專用圖片（`icon-a4-*.png`），搭配 `onerror` 回退至 Emoji |
| 版本號查詢字串 | `?v=9.52.86` 需手動更新，不利快取管理 |
| 商品資料雙份維護 | 遊戲與作業單各自定義 119 個商品，改價需改兩處 |

---

## 九、未來開發建議

### 9.1 模組化拆分（最高優先）

**問題：JS 檔案 14,682 行，A 系列之最（A1 的 2.4 倍）**

A4 將 12 種商店設定、119 個商品、8 個場景、3 種難度、Click Mode、錢包系統、找零邏輯等全部集中在單一檔案中。

**建議的拆分結構**：

```
js/
├── a4/
│   ├── a4-main.js              # 入口、初始化、SceneManager（~600 行）
│   ├── a4-config.js            # 商店定義、商品資料庫（~2,500 行）
│   ├── a4-speech-templates.js  # speechTemplates、語音管理（~600 行）
│   ├── a4-mode-config.js       # ModeConfig、PriceStrategy（~500 行）
│   ├── a4-settings.js          # 設定頁面、魔法商店（~1,200 行）
│   ├── a4-scene-manager.js     # SceneConfig、場景切換（~500 行）
│   ├── a4-shopping.js          # 商品瀏覽、選擇邏輯（~1,500 行）
│   ├── a4-payment.js           # 付款、錢包、拖放（~1,500 行）
│   ├── a4-change.js            # 找零驗證（三選一/拖放/計算器）（~800 行）
│   ├── a4-click-mode.js        # 輔助點擊模式（~800 行）
│   ├── a4-hints.js             # 提示系統（簡單/普通/困難）（~500 行）
│   ├── a4-ui-render.js         # 通用渲染函數（~1,500 行）
│   ├── a4-completion.js        # 完成畫面、統計（~400 行）
│   └── a4-animations.js        # 動畫 CSS 注入（~400 行）
```

### 9.2 商品資料共用化

**問題**：遊戲與作業單各自獨立定義 119 個商品，修改價格需改兩處。

**建議**：

```javascript
// js/a4-shared-data.js（共用商品資料源）
const A4_STORE_DATA = {
    convenience: [
        { name: '蘋果', emoji: '🍎', price: 25, category: 'food' },
        // ...
    ],
    // ...
};

// 遊戲端引用
import { A4_STORE_DATA } from './a4-shared-data.js';

// 作業單引用
const stores = A4_STORE_DATA;
```

### 9.3 ~~setTimeout / addEventListener 管理器~~ TimerManager 已實現

**已修正**（2026-02-17）：TimerManager 已實現並完成所有 setTimeout 遷移。

**實現架構**：

```javascript
TimerManager: {
    timers: new Map(),
    timerIdCounter: 0,
    setTimeout(callback, delay, category = 'default') { ... },
    clearTimeout(id) { ... },
    clearAll() { ... },
    clearByCategory(category) { ... }
}
```

**分類**：`audioCallback`, `speechDelay`, `uiAnimation`, `screenTransition`, `clickMode`, `settingsUI`

**待實現**：EventManager（addEventListener 統一管理）

### 9.4 Console.log 清理

**問題**：467 個 `console.log`，A 系列最多（A3 的 2.3 倍）。

**建議**：

```javascript
const DEBUG = false;
function debugLog(tag, ...args) {
    if (DEBUG) console.log(`[A4-Shop][${tag}]`, ...args);
}
```

- **保留**：系統初始化完成提示（1~2 個）
- **轉為 debugLog**：場景切換、商品操作、付款過程
- **刪除**：臨時除錯用途的 log（估計佔 90%+）

### 9.5 !important 削減

**問題**：410 個 `!important`（JS 228 + CSS 182），A 系列最多。

**建議**：
- 使用更高特異性的 CSS 選擇器（如 `#app .product-item` 代替 `.product-item !important`）
- 將 JS inline style 的 `!important` 改為 CSS class 切換
- 目標：控制在 30 個以內（僅保留真正需要覆蓋的情況）

### 9.6 CSS 動畫統一管理

**問題**：動畫分散在 3 處（CSS 檔案 8 個 + JS 檔案 17 個 + HTML 3 個 = 28 個），維護困難。

**建議**：
- 將所有 @keyframes 集中至 `css/a4_simulated_shopping.css`
- JS 只負責新增/移除 CSS class，不注入 `<style>` 標籤
- 共用動畫（`fadeIn`、`celebrate`、`bounce`、`slideUp`）提取至 `css/common-animations.css`
- ~~刪除 `bounceIn` 的重複定義~~ 已修正（改名為 `bounceInCenter`）

### 9.7 鍵盤快捷鍵支援

**問題**：A4 是 A2～A4 中唯一不支援鍵盤快捷鍵的單元。

**建議**：
- 數字鍵 `1`~`0`：選擇前 10 個商品
- `Enter`：確認操作
- `Escape`：取消/返回
- 方向鍵：在商品間導航
- 顯示快捷鍵提示

### 9.8 大型觸控螢幕 RWD

**問題**：A4 無 1920px+ / 2560px+ 斷點，A3 已支援。

**建議**：
- 新增 `@media (min-width: 1920px)` 斷點，加大字型與觸控目標
- 新增 `@media (min-width: 2560px)` 斷點，4K 螢幕優化
- 參考 A3 的大型觸控螢幕 CSS 實現

### 9.9 ~~canvas-confetti 版本統一~~ 已修正

**已修正**（2026-02-09）：所有 18 個單元統一使用本地副本 `js/confetti.browser.min.js`（v1.9.2）。

### 9.10 版本號管理改進

**問題**：`?v=9.52.86` 查詢字串需手動更新。

**建議**：
- 改用建構工具自動生成 content hash（如 Webpack、Vite）
- 或使用 `?v=${Date.now()}` 在開發環境自動更新
- 生產環境使用固定版本號

### 9.11 ~~商品圖片化~~ 已完成

**已完成**：所有 119 個商品已加入專用圖片（`images/a4/icon-a4-*.png`），搭配 `onerror` 回退至 Emoji。透過 `getProductIconHTML()` 函數統一渲染。

### 9.12 未來新單元開發 Checklist（A4 新增項目）

在前述報告 checklist 基礎上新增：

```
□ 29. 商品資料遊戲端與作業單端共用，避免雙份維護
□ 30. !important 控制在 30 個以內
□ 31. 動畫全部集中於 CSS 檔案，JS 不注入 <style>
□ 32. console.log 使用 DEBUG 旗標控制，正式版清理至 5 個以下
□ 33. setTimeout 清理率 > 80%（clearTimeout / setTimeout）
□ 34. Skip Link 無障礙跳過導航連結
□ 35. NoScript 友善提示
□ 36. prefers-reduced-motion 支援
□ 37. 觸控裝置 CSS 偵測（hover: none, pointer: coarse）
□ 38. canvas-confetti 版本統一
```

---

## 十、總結

### A4 超市購物的優勢

1. **商店最豐富**：12 種商店 + 魔法商店，119 個商品，A 系列之最
2. **生活情境覆蓋廣**：從便利商店到 3C 用品店，涵蓋學習者日常接觸的各種消費場景
3. **無障礙最完善**：Skip Link + NoScript + `prefers-reduced-motion` + `prefers-contrast: high` + 觸控裝置 CSS 偵測，A 系列最佳
4. **防抖最嚴密**：7 層多重防抖系統（state 鎖 4 層 + 轉場鎖 + Click Mode 鎖 + 時間鎖）
5. **場景管理成熟**：8 個場景 + `isTransitioning` 防護，防止重複切換
6. **找零驗證多元**：三種驗證方式（三選一 / 拖放 / 計算器）依難度遞進
7. **觸控拖放支援**：引用 `touch-drag-utility.js` 支援行動裝置拖放付款
8. **作業單最豐富**：615 行、12 種商店、多商品購物清單（含小計），A 系列最大
9. **商品圖片 + Emoji fallback**：119 張專用圖片搭配 `onerror` 回退至 Emoji，兼顧視覺品質與穩定性
10. **三難度語音遞進**：從友善詳細到極簡精練，模擬真實購物體驗

### A4 超市購物的待改進處

1. **JS 單檔最大**（14,682 行）→ 建議拆分為 14 個子模組
2. **467 個 console.log**（A 系列最多）→ 建議清理或改用 DEBUG 模式
3. **410 個 !important**（A 系列最多）→ 建議使用高特異性選擇器替代
4. ~~**94 個未清理 setTimeout**~~ **已修正**（TimerManager 已實現）
5. **動畫分散 3 處**（28 個）→ 建議集中至 CSS 檔案
6. **商品資料雙份維護** → 建議共用資料源
7. **無鍵盤快捷鍵** → 建議新增
8. **無大型觸控螢幕 RWD** → 建議新增 1920px+ 斷點
9. ~~canvas-confetti 版本不一致~~ **已修正**（統一為本地 v1.9.2）
10. ~~`bounceIn` 重複定義~~ **已修正**（改名為 `bounceInCenter`）

### A1～A4 架構比較表

| 面向 | A1 販賣機 | A2 理髮廳 | A3 麥當勞 | A4 超市購物 | 最佳 |
|------|----------|----------|----------|------------|------|
| 程式碼總量 | 7,290 行 | 12,090 行 | 12,074 行 | **19,415 行** | A1（最精簡） |
| JS 單檔大小 | 6,080 行 | 8,163 行 | 9,691 行 | **14,682 行** | A1（最精簡） |
| 品項/服務數 | 19 飲料 | 6 服務 | 70 餐點 | **119 商品** | A4（最豐富） |
| 商店/場所數 | 1 | 1 | 1 | **12 + 1** | **A4（最多元）** |
| 圖片資源 | 19 張 | 10 張 / 2.4MB | 83 張 / 46.3MB | **119 張 PNG（emoji fallback）** | A1（最輕量） |
| 設定驅動 | 部分 | 完全 | 完全 | **完全（含 PriceStrategy）** | A4 |
| 場景管理 | 無 | 無 | 7 場景 | **8 場景** | **A4（最完整）** |
| 語音系統 | 直接撰寫 | 模板驅動 | 模板 + 雙語速 | **模板 + 難度遞進** | A2/A3/A4 |
| RWD 斷點 | 3 | 4 | **8（含 4K）** | 3 + 3 無障礙 | A3（覆蓋最廣） |
| 動畫數量 | 16 | 8 | ~24 | **~28** | **A4（最多）** |
| 觸控拖放 | 不支援 | 不支援 | 支援 | **支援** | A3/A4 |
| 鍵盤快捷鍵 | 無 | 1-6, Enter, Esc | 1-4, Enter, Esc | **無** | A2 |
| 無障礙 | 基本 | ARIA+Loading+Error | ARIA+Loading+Error | **最完整（含 Skip Link + NoScript + reduced-motion）** | **A4** |
| 找零機制 | 逐枚取回 | 不找零 | 三選一 | **三選一 / 拖放 / 計算器** | **A4（最多元）** |
| 防抖層數 | 6 | 4 | 4 | **7** | **A4（最嚴密）** |
| 自訂內容 | 魔法商品 | 無 | 無 | **魔法商店** | A1/A4 |
| console.log | — | 66 | 201 | **467** | A2（最少） |
| !important | — | 48 | 76 | **410** | A2（最少） |
| 未清理 setTimeout | — | ~~42~~ 0 | 64 | ~~**94**~~ 0 | **A2/A4（已修正）** |
| 死碼量 | ~200 行 | ~50 行 | ~15 行 | 少量 | A3/A4 |
| 作業單行數 | 358 | 341 | 410 | **615** | A4（最豐富） |

### 對後續單元開發的影響

A4 在 A 系列中帶來了幾項重要的設計貢獻：

1. **多商店架構**：12 種商店提供了設定驅動的最佳範例——相同的遊戲流程可套用不同情境，只需更換商品資料。後續單元可參考此模式設計多主題系統。

2. **無障礙標竿**：A4 是 A 系列中無障礙最完善的單元（Skip Link、NoScript、`prefers-reduced-motion`、`prefers-contrast: high`、觸控裝置偵測），建議作為所有單元的無障礙標準。

3. **找零驗證多元化**：三種找零方式（三選一 / 拖放 / 計算器）依難度遞進，提供了差異化教學的典範。

4. **規模警示**：14,682 行 JS 單檔已達到維護困難的臨界點，467 個 console.log 和 410 個 !important 都是技術債累積的警訊。後續開發必須從一開始就規劃模組化拆分，並嚴格控制除錯語句和 CSS 覆蓋。

---

## 十一、修正記錄

### 2026-02-11 Bug 修正與報告更新

**修正項目**：

| # | Bug | 修正方式 | 修改檔案 |
|---|-----|---------|---------|
| 5 | CSS `bounceIn` @keyframes 重複定義 | 第一個（含 `translate(-50%, -50%)`）改名為 `bounceInCenter`，更新 `.question-result` 引用 | `css/a4_simulated_shopping.css` |
| 8 | 舊商品資料陣列殘留（6 個舊格式商品） | 確認零引用後刪除死碼（57 行） | `js/a4_simulated_shopping.js` |

**報告更新**：

- 商品數 130 → 119（美式速食店 10 → 9，實際盤點）
- 商品資料雙份維護數量 132 → 119
- 商品圖片：「無專用圖片」→「119 張 PNG（`icon-a4-*.png`）+ emoji fallback」
- canvas-confetti：v1.6.0 → v1.9.2（本地副本，2026-02-09 已統一）
- Bug #5、#6、#8 標記為「已修正」
- 第 9.9 節（confetti 版本統一）、9.11 節（商品圖片化）標記為「已完成」

---

## Bug 修正記錄（2026-02-13）

### 商品資料共用化

**問題**：遊戲端（`js/a4_simulated_shopping.js`）和作業單端（`worksheet/units/a4-worksheet.js`）各自維護一份商品資料，導致：
1. 價格不一致（如藍牙喇叭：遊戲 800 元 vs 作業單 8000 元）
2. Emoji 不一致（如洋芋片：遊戲 🍟 vs 作業單 🥔）
3. 維護困難（修改需同步兩處）

**解決方案**：建立共用資料檔案 `js/a4-shared-products.js`

**新建檔案**：
- `js/a4-shared-products.js`（12 種商店 × 10 商品 = 119 個商品）

**修改檔案**：

| 檔案 | 修改內容 |
|------|---------|
| `html/a4_simulated_shopping.html` | 新增 `<script src="../js/a4-shared-products.js">` |
| `js/a4_simulated_shopping.js` | `storeProducts` 改用 `Object.assign({}, A4_SHARED_PRODUCTS, { magic: [] })`，原資料移至 `_fallbackProducts` |
| `worksheet/index.html` | 新增 `<script src="../js/a4-shared-products.js">` |
| `worksheet/units/a4-worksheet.js` | `stores` 改用 IIFE 優先返回 `A4_SHARED_PRODUCTS`，原資料作為 fallback |

**資料來源決策**：以遊戲端為準

- 價格：採用遊戲端價格（更合理）
- Emoji：採用遊戲端 Emoji（與程式碼邏輯一致）
- 欄位：保留完整欄位（`id`, `name`, `price`, `price_min`, `price_max`, `category`, `emoji`, `icon`, `description`）

**fallback 機制**：

遊戲端在 `init()` 中檢查 `storeProducts.convenience` 是否存在，若不存在則從 `_fallbackProducts` 載入。作業單端使用 IIFE 在載入時判斷 `A4_SHARED_PRODUCTS` 是否定義。

---

*報告完成時間：2026-02-09 13:19*
*最後更新時間：2026-02-13（商品資料共用化）*
*報告產生者：Claude Code (claude-opus-4-6)*

---

## 驗證記錄

### 2026-02-16：系統性驗證

**驗證內容**：

| 項目 | 狀態 | 說明 |
|------|------|------|
| TimerManager | ✅ 已完成 | 104 個 setTimeout 統一管理（2026-02-17，支援 6 種分類：audioCallback/speechDelay/uiAnimation/screenTransition/clickMode/settingsUI） |
| EventManager | ✅ 已完成 | addEventListener 統一管理（2026-02-17，分類：settings/gameUI） |
| injectGlobalAnimationStyles | ✅ 已完成 | 動畫定義統一注入（id：a4-global-animations） |
| 完成畫面 | ✅ 正常 | 採用 A 系列統一完成畫面樣式 |
| confetti 煙火 | ✅ 正常 | 使用 v1.9.2 本地化版本 |
| 商品資料共用化 | ✅ 正常 | a4-shared-products.js |

**建議改進（P1）**：
- ~~引入 TimerManager/EventManager 統一管理記憶體~~ ✅ 已於 2026-02-17 完成

**結論**：A4 功能正常，記憶體管理標準已達成（TimerManager/EventManager/injectGlobalAnimationStyles 均已實作）。

---

### 2026-02-17：TimerManager 重構完成

**重構內容**：

| 項目 | 修改前 | 修改後 |
|------|--------|--------|
| TimerManager | ❌ 缺少 | ✅ 已實現 |
| setTimeout 管理 | 104 個原生 setTimeout | 全部遷移至 TimerManager.setTimeout() |
| 分類清理 | 無 | 支援 6 種分類：`audioCallback`, `speechDelay`, `uiAnimation`, `screenTransition`, `clickMode`, `settingsUI` |
| 版本號 | v2.2.3 | v2.3.0 |

**TimerManager 結構**（新增於 Game 物件）：

```javascript
TimerManager: {
    timers: new Map(),
    timerIdCounter: 0,
    setTimeout(callback, delay, category = 'default') { ... },
    clearTimeout(id) { ... },
    clearAll() { ... },
    clearByCategory(category) { ... }
}
```

**清理調用位置**：

| 位置 | 清理方式 |
|------|---------|
| `init()` | `TimerManager.clearAll()` |
| `showSettings()` | `TimerManager.clearAll()` |

**遷移模式範例**：

```javascript
// Before (native setTimeout)
setTimeout(() => {
    this.showWalletIntroScreen();
}, 500);

// After (TimerManager with Game reference)
Game.TimerManager.setTimeout(() => {
    Game.showWalletIntroScreen();
}, 500, 'screenTransition');
```

**驗證結果**：

```
grep "setTimeout" 結果：106 行（僅 1 行為 TimerManager 內部定義）
grep "^\s*(setTimeout|window\.setTimeout)" 結果：1 行（TimerManager 方法定義）
```

**結論**：A4 TimerManager 重構完成，所有 setTimeout 已統一管理。EventManager 和 injectGlobalAnimationStyles 建議未來實現（P2）。

---

### 2026-02-21：Debug Logger FLAGS 分類開關系統

**重構內容**：

| 項目 | 修改前 | 修改後 |
|------|--------|--------|
| console.log | 313 個 | 6 個（3 內部 + 3 `.catch(console.log)`） |
| console.warn | ~40 個 | 1 個（內部 Debug.warn） |
| console.error | ~38 個 | 1 個（內部 Debug.error） |
| Debug 系統 | 無 | FLAGS 分類開關（14 分類） |
| 版本號 | v2.3.0 | v2.4.0 |

**Debug Logger 結構**：

```javascript
Debug: {
    FLAGS: {
        all: false,      // 主開關
        init: false,     // 初始化
        state: false,    // 狀態管理
        ui: false,       // UI 渲染
        audio: false,    // 音效播放
        speech: false,   // 語音合成
        coin: false,     // 錢幣操作
        payment: false,  // 付款邏輯
        product: false,  // 商品選擇
        flow: false,     // 遊戲流程
        assist: false,   // 輔助模式
        hint: false,     // 提示系統
        timer: false,    // 計時器
        event: false,    // 事件監聽
        error: true      // 錯誤（預設開啟）
    },
    log(category, ...args) {
        if (this.FLAGS.all || this.FLAGS[category]) {
            console.log(`[A4-${category}]`, ...args);
        }
    },
    warn(category, ...args) {
        if (this.FLAGS.all || this.FLAGS[category]) {
            console.warn(`[A4-${category}]`, ...args);
        }
    },
    error(...args) {
        console.error('[A4-ERROR]', ...args);
    }
}
```

**轉換統計**：

| 分類 | 轉換數量 | 主要用途 |
|------|---------|---------|
| flow | ~120 | 場景管理、遊戲流程、找零驗證 |
| payment | ~90 | 付款算法、錢包操作、退款邏輯 |
| coin | ~80 | 錢幣拖放、放置、找零處理 |
| hint | ~50 | 付款提示、錢包提示、錯誤計數 |
| speech | ~45 | 商品語音、金額語音、找零語音 |
| assist | ~40 | Click Mode、輔助點擊處理 |
| ui | ~35 | UI 渲染、動畫、煙火 |
| timer | ~25 | TimerManager、備份機制 |
| event | ~20 | EventManager、TouchDragUtility |
| product | ~18 | 商品過濾、項目顯示 |
| state | ~15 | 狀態管理、處理狀態 |
| audio | ~8 | 音效播放、錯誤處理 |
| init | ~5 | 初始化、共用商品載入 |
| **總計** | **551** | — |

**標籤修正**：

許多 console 語句從 A1 複製而來，標籤為 `[A1-...]`，已全部更正為 `[A4-...]`：

| 修正前 | 修正後 |
|--------|--------|
| `[A1找零點擊]` | `[A4找零點擊]` |
| `[A1-摘要-v9.52.56]` | `[A4-摘要]` |
| `[A1-鈔票選項點擊]` | `[A4-鈔票選項點擊]` |
| `[A1-找零拖放]` | `[A4-找零拖放]` |

**保留的 console 調用**（6 個）：

| 行號 | 用途 |
|------|------|
| 86 | Debug.log 內部實現 |
| 92 | Debug.warn 內部實現 |
| 97 | Debug.error 內部實現 |
| 7513 | `.catch(console.log)` 音效錯誤 |
| 7649 | `.catch(console.log)` 音效錯誤 |
| 12247 | `.catch(console.log)` 音效錯誤 |

**使用方式**：

```javascript
// 方法內使用
this.Debug.log('flow', '場景切換:', sceneName);
this.Debug.warn('payment', '金額不足');
this.Debug.error('嚴重錯誤:', error);

// SceneConfig 回調使用
context.Debug.log('ui', '渲染商品架');

// 箭頭函數回調使用
Game.Debug.log('timer', '定時器觸發');
```

**啟用除錯**：

```javascript
// 啟用全部日誌
Game.Debug.FLAGS.all = true;

// 只啟用特定分類
Game.Debug.FLAGS.payment = true;
Game.Debug.FLAGS.coin = true;
```

**結論**：A4 Debug Logger 重構完成，551 個 console 調用轉換為 14 分類的 FLAGS 開關系統，可依需求精確啟用特定分類的日誌輸出。

---

### 2026-02-24（第二輪）：稽核結果

**第二輪全面稽核發現（架構性問題，暫列為待辦）**：

- ✅ 完成畫面符合 A 系列標準
- ✅ 作業單連結不傳 count 參數
- ✅ `injectGlobalAnimationStyles()` 正確實作
- ✅ EventManager 系統已實作（`Game.EventManager`，含 `removeAll()` / `removeByCategory()`，共 6 處呼叫）；⚠️ 仍有約 23 個直接 `addEventListener` 尚未遷移進 EventManager，屬後續優化項目
- ✅ A 系列不需要 `resetGameState()`（該函數僅 C/F 系列實作），A4 狀態重置設計符合規範

---

### 2026-02-24：作業單連結統一簡化（僅傳 unit 參數）

**修改內容**：

- 作業單連結原本傳遞遊戲設定參數（`difficulty`, `storeType`, `walletAmount`）
- 各作業單已有完整工具列，用戶開啟後可直接在工具列調整；遊戲設定與作業單設定應獨立運作
- **修復**：移除所有多餘參數，統一改為只傳 `unit` 參數，讓作業單完全使用自己的預設値

**修改檔案**：`js/a4_simulated_shopping.js`

---

### 2026-02-26：11-19 元語音唸法稽核確認（無修改）

**稽核結果**：A4 直接呼叫 `NumberSpeechUtils.convertToTraditionalCurrency(amount)`，是 A 系列中路徑最短的單元。共用模組 `number-speech-utils.js` 已於 2026-02-26 補入 11-19 的 specialCases（`'十一元'`~`'十九元'`），A4 自動受益，無需額外修改。

---

---

### 2026-02-27：showSettings() EventManager 事件累積修復

**問題描述**：

`showSettings()` 每次呼叫時，`settingsRewardLink` 和 `worksheetLink` 直接使用 `addEventListener` 新增監聽器，但沒有移除舊監聽器。每次返回設定頁面就累積一組監聽器，導致多次點擊事件被觸發。

**修復方式**：

- `showSettings()` 開頭加入 `this.EventManager.removeByCategory('settings')`
- 兩個連結的 `addEventListener` 改為 `this.EventManager.on(..., 'settings')`

**修改檔案**：`js/a4_simulated_shopping.js`

---

### 2026-02-27：confetti setInterval → 遞迴 TimerManager 模式

**問題**：完成畫面煙火效果使用裸 `setInterval`，場景切換時 `TimerManager.clearAll()` 無法中途停止動畫計時器。

**修復**：將 `setInterval` 改為遞迴 `this.TimerManager.setTimeout(fireConfetti, 250, 'confetti')`，確保 `clearAll()` 或 `clearByCategory('confetti')` 可立即停止動畫。

**修改檔案**：`js/a4_simulated_shopping.js`

---

### 2026-02-28：輔助點擊遮罩全程常駐 + 層級修正

**舊設計問題**：遮罩在 `executeNextAction()` 中 `isExecuting=true` 時動態建立（z-index:90），並在 `enableClickModeWithVisualDelay()`、`executeNextPayment()`、`autoSelectChange()`、`showWaitPrompt()` 等 13 處 `waitingForClick=true` 時移除。每個步驟都在切換顯隱，導致：
- 遊戲 modals（z-index:10001）出現時遮罩無法覆蓋（90 < 10001）
- 遮罩消失期間使用者可直接點擊遊戲元素

**新設計**：
- 遮罩在 `ClickMode.bind()` 時建立，`z-index: 10100`（高於所有遊戲 modals）
- 只在 `showCompletionSummary()` 和 `ClickMode.unbind()` 時移除
- 移除 13 處 `waitingForClick=true` 時的 `?.remove()` 呼叫

**Z-index 層級**：遊戲 modals（最高 10001）→ 遮罩（10100）→ 標題列（10200）

**修改檔案**：`js/a4_simulated_shopping.js`（移除 13 處 overlay 移除）、`css/a4_simulated_shopping.css`（`.title-bar` z-index: 100 → 10200）

---

### 2026-02-28
- `showCompletionSummary()` å  `_completionSummaryShown` å®è¡é²éè¤å¼å«ï¼`startGame()` éç½®ææ¨çº `false`

---

*報告更新時間：2026-02-28*
*報告產生者：Claude Code (claude-sonnet-4-6)*

### 2026-03-01

#### 蕃茄「12顆蕃茄」計數前綴修正

**問題**：`parseProductDisplay()` 將 count（如 `1`）直接拼接 measureWord（如 `2顆`），產生 `"12顆蕃茄"` 而非正確的 `"2顆蕃茄"`。

**修復**：`parseProductDisplay()` 中，取得 `mw`（measureWord）後，以 `/^\d/.test(mw)` 判斷是否已含數字前綴；若是，則 `prefix = ''`，跳過 count 拼接。同時修正 `else` 分支（無 `/` 分隔時）使用相同判斷邏輯。

**修改檔案**：`js/a4_simulated_shopping.js`（`parseProductDisplay`）

---

#### 普通/困難模式提示勾勾持續顯示至金錢放入付款區

**問題**：按提示鈕後，錢包金錢圖示上的綠色勾勾（`.show-correct-tick`）在 `updatePaymentDisplay()` 重渲染錢包時立即消失（`walletMoneyIcons.innerHTML = renderWalletContent()` 清除所有 class）。

**修復**：

1. **`showWalletHintWithTicks(moneyList)`**：加入 `this.state.gameState.activeWalletHintList = moneyList`，記錄目前提示清單

2. **`updatePaymentDisplay()`**：在 `walletMoneyIcons.innerHTML = renderWalletContent()` 後立即重新套用提示：
   ```javascript
   if (this.state.gameState.activeWalletHintList?.length > 0) {
       this.showWalletHintWithTicks(this.state.gameState.activeWalletHintList);
   }
   ```

3. **`proceedWithPaymentSuccess()`**：付款成功時加 `this.state.gameState.activeWalletHintList = null`，清除記錄

**生命週期**：勾勾隨金錢圖示 DOM 元素一同消失（拖入付款區時 `droppedElement.remove()`），不需額外清除

**修改檔案**：`js/a4_simulated_shopping.js`（`showWalletHintWithTicks`、`updatePaymentDisplay`、`proceedWithPaymentSuccess`）

---

#### 購買任務彈窗輔助點擊後直接消失修復

**問題 1 — 彈窗點擊後不消失**：輔助點擊遮罩（`z-index:10100`）蓋在購買任務彈窗（`z-index:10000`）上方，`handleClick()` 的 `e.target.closest()` 白名單偵測只能看到遮罩元素，永遠無法匹配 `#target-item-modal`，導致彈窗無法被關閉。

**修復**：`handleClick()` isTrusted 判斷後，先以 `document.getElementById('target-item-modal')` 直接偵測彈窗存在，若有則立即呼叫 `_taskModal.remove()` 並 return。

**問題 2 — 彈窗消失方式**：原 `closeTargetItemModal()` 使用 fade-out 縮小動畫（300ms timer），視覺上與 A2 服務任務彈窗「直接消失」不一致。

**修復**：`closeTargetItemModal()` 簡化為直接 `modal.remove()`，移除所有動畫與 timer 邏輯。

**修改檔案**：`js/a4_simulated_shopping.js`（`handleClick`、`closeTargetItemModal`）

---

#### 完成畫面按鈕點擊無響應修復

**問題**：進入完成畫面（`showCompletionSummary()`）後，🎁 開啟獎勵系統、🔄 再玩一次、⚙️ 返回設定等按鈕無法點擊。原因：函數僅呼叫 `document.getElementById('click-exec-overlay')?.remove()` 移除 DOM 元素，但 `document.addEventListener('click', handler, true)` 的 capture phase listener 仍然存在，持續攔截所有點擊事件並呼叫 `stopPropagation + preventDefault`。

**修復**：改為呼叫 `this.ClickMode.unbind()`，同時移除 overlay DOM 元素與 document capture listener。

**修改檔案**：`js/a4_simulated_shopping.js`（`showCompletionSummary`）

---

#### 巧克力量詞「條」改「包」

**說明**：商品敘述「一條巧克力」改為「一包巧克力」，同步更新 3 處：

1. 遊戲 JS 商品定義（id:104）：`description: '巧克力/條'` → `'巧克力/包'`
2. 遊戲 JS `getMeasureWord()` 查找表：`'巧克力': '條'` → `'巧克力': '包'`
3. 共用商品資料：`js/a4-shared-products.js` 對應商品 description 同步更新

**注意**：作業單不使用量詞（顯示格式為 `🍫 巧克力 × N`），無需修改。

**修改檔案**：`js/a4_simulated_shopping.js`（商品定義、`getMeasureWord`）、`js/a4-shared-products.js`

---

*報告更新時間：2026-03-01*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

## 廢棄程式碼稽核（2026-03-01）

**稽核範圍**：`js/a4_simulated_shopping.js`（14,748 行）

### 結論：發現 2 個未呼叫的 `_OLD` 函數（未刪除）

| 類型 | 位置 | 行數 | 內容 | 嚴重性 | 建議 |
|------|------|------|------|--------|------|
| **死函數（_OLD）** | Lines 11538–11577 | ~40 行 | `handleCorrectChangeSelection_OLD()` — 標記「🗑️ \[保留\] 舊的正確處理函數（暫時保留以防需要回滾）」；已由 `handleCorrectChangeSelectionSimplified()` 取代，**全檔案無呼叫點** | 中 | 確認不需回滾後可安全刪除 |
| **死函數（_OLD）** | Lines 11633–11682 | ~50 行 | `handleIncorrectChangeSelection_OLD()` — 標記同上；已由 `handleIncorrectChangeSelectionSimplified()` 取代，**全檔案無呼叫點** | 中 | 同上 |
| 廢棄計算機動畫注解 | Lines 6065, 10515, 11155 | 3 行 | `/* 已移除計算機按鈕縮小動畫效果 */` — 僅注解，無殘留程式碼 | 低 | 可清除注解 |
| 廢棄功能注解 | Lines 8202, 7689, 2286+ | 各 1 行 | 多處「已移除」說明注解 | 低 | 可保留作歷史記錄 |
| 向後相容 | Lines 3386–3387 | 2 行 | `// 🔧 舊版相容性：使用 customWalletTypes` | 低 | 刻意保留 |
| console.log | Lines 84–98 | — | Debug 系統定義內部呼叫 | — | 已受 FLAGS 守衛 |

### 廢棄項目詳情

#### `handleCorrectChangeSelection_OLD()` 和 `handleIncorrectChangeSelection_OLD()`
- **現行版本**：`handleCorrectChangeSelectionSimplified()` (lines 11435–11530) 和 `handleIncorrectChangeSelectionSimplified()` (lines 11580–11630)
- **_OLD 版本呼叫點**：全檔案搜尋確認為零
- **保留原因（原開發者標注）**：暫時保留以防需要回滾
- **刪除風險**：低（可確認無呼叫點）
- **合計約 90 行**可安全刪除

**整體評估**：唯一需要關注的是兩個 `_OLD` 後綴死函數；其餘均為記錄性注解。

---

### 2026-03-02：輔助點擊遮罩不覆蓋標題列（方案C）

**問題描述**：

輔助點擊遮罩使用 `inset:0`（全頁覆蓋），`.title-bar` z-index 升至 10200 確保標題列可點擊。但標題列（10200）高於所有彈窗（9999~10003），彈窗在標題列區域的內容會被遮蓋。

**根本原因（CSS 堆疊情境）**：

`position: sticky` 建立獨立堆疊情境，按鈕子元素的 z-index 無法突破父層的全域層級，故無法只把按鈕提升而保留標題列低 z-index。

**修復方案（方案C）**：

遮罩改為不覆蓋標題列區域，標題列恢復低 z-index：

| 步驟 | 內容 |
|------|------|
| JS：動態量測 | 遮罩建立時以 `getBoundingClientRect().bottom` 讀標題列底部位置（fallback 60px） |
| JS：調整範圍 | `inset:0` → `top:${_tbBottom}px;left:0;right:0;bottom:0` |
| CSS：降低 z-index | `.title-bar` z-index: 10200 → 100 |

**效果**：

- 遮罩覆蓋遊戲區域（標題列以下）→ 輔助點擊引導邏輯完全不受影響 ✓
- 標題列低於彈窗（100 < 9999）→ 彈窗不再被標題列遮蓋 ✓
- 標題列不在遮罩覆蓋範圍 → 🎁 獎勵、⚙️ 返回設定按鈕永遠可點擊 ✓

**修改檔案**：`js/a4_simulated_shopping.js`（`ClickMode.bind()`，`_ov.style.cssText`）、`css/a4_simulated_shopping.css`（`.title-bar` z-index）

---

### 2026-03-02：魔法商品自訂價格被動態定價覆蓋修復

**問題描述**：

上傳魔法商品設定價格 55 元，進入遊戲後顯示 54 元。

**根本原因追蹤**（console log）：

```
startGame() → resetAllPrices()（清除 session）
          ↓
getAvailableProducts('magic', 'normal')
→ applyDynamicPricing(customItems, 'normal')
→ addDynamicPrice({ price: 55, category: 'custom' }, 'normal')
  → 無 price_min/price_max → 走「舊格式 fallback」
  → generatePrice(55, 'normal') → 隨機偏移 → 54  ← Bug
```

**修復方式**：

`addDynamicPrice()` 開頭加 guard：

```javascript
if (item.category === 'custom') {
    return { ...item, basePrice: item.price };  // 保留使用者設定的原始價格
}
```

**現有保護機制確認**：

| 保護層 | 位置 | 說明 |
|--------|------|------|
| 上傳驗證 | `confirmAddCustomItem()` | `price > walletMaxAmount` → 拒絕上傳，確保商品不超過錢包上限 |
| 錢包初始化（指定模式） | `initializeWallet()` L3269 | `filter(price < max)` 為空 → `actualWalletAmount = max`（等於商品價格）✓ |
| 錢包初始化（自選模式） | `initializeWallet()` L3291 | `minWalletAmount = 商品價格` → `actualWalletAmount ≥ 商品價格` ✓ |

**結論**：修復後上傳 100 元商品、錢包上限 100 元時，錢包永遠等於 100，三種難度均適用。

**修改檔案**：`js/a4_simulated_shopping.js`（`storeData.addDynamicPrice`）

---

*報告更新時間：2026-03-02*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

## 跨輪計時器洩漏稽核（2026-03-03）

**稽核背景**：A3 單元曾發現 `speakText()` 10 秒備援計時器在下一輪觸發導致跳輪的 Bug，已對全系列交叉稽核。

**A4 稽核結論：安全（無此問題）**

| 條件 | 狀態 | 說明 |
|------|------|------|
| ① 新輪次從語音 callback 觸發 | 成立（但不觸發 bug） | `showTransactionSummaryScreenWithData()` 的語音 callback 內有 2s 計時器呼叫 `showCompletionSummary()` / `prepareNextQuestion()` |
| ② interrupted 不呼叫 safeCallback | **不成立 ✅** | `onerror` 對所有錯誤（含 `interrupted`）均呼叫 `safeCallback()`（line 925），備援計時器（10s, `'speechDelay'`）為 no-op |
| ③ 新輪次函數無 clearAll() | 成立（但不觸發 bug） | `startGame()` 無 `clearAll()`；但 `prepareNextQuestion()` 執行 `clearTimeout` ids 1~99999 暴力清除 |

**結論**：條件②不成立（`interrupted` 也呼叫 `safeCallback`，`callbackExecuted = true`），備援計時器為 no-op，bug 不可能發生。

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

## 各商店錢包上限 + 商品價格調整（2026-03-04）

### 問題描述

`initializeWallet()` 使用全域 5,000 元上限，導致部分商店（如 3C 用品店選手機）錢包金額高達萬元以上，遠超合理範圍。

### 修改：`js/a4_simulated_shopping.js`

在 `initializeWallet()` 加入 `STORE_WALLET_CAPS` 查表，取代原本 `Math.min(..., 5000)` 全域上限：

```javascript
const STORE_WALLET_CAPS = {
    convenience: 100, market: 100, breakfast: 100, stationery: 100,
    pxmart: 500, mcdonalds: 500, bookstore: 500, toystore: 500, cosmetics: 500,
    clothing: 3000, sports: 3000,
    electronics: 5000
};
const storeType = this.state.settings.storeType || 'convenience';
const walletCap = STORE_WALLET_CAPS[storeType] || 5000;
walletMaxAmount = Math.min(Math.ceil(maxPrice * multiplier / 10) * 10, walletCap);
```

### 修改：`js/a4-shared-products.js`

同步調整各商店超出上限的商品價格（`price` / `price_min` / `price_max`）：

| 商店 | 商品 | 舊 price/price_max | 新 price/price_max |
|------|------|--------------------|--------------------|
| 菜市場 | 魚 | 150 / 300 | 70 / 100 |
| 菜市場 | 豬肉 | 150 / 250 | 70 / 100 |
| 菜市場 | 雞肉 | 150 / 250 | 70 / 100 |
| 菜市場 | 胡蘿蔔 | 90 / 150 | 70 / 100 |
| 菜市場 | 蛋 | 80 / 120 | 60 / 90 |
| 文具店 | 計算機 | 150 / 350 | 80 / 100 |
| 文具店 | 彩色筆 | 80 / 150 | 60 / 90 |
| 美妝店 | 香水 | 800 / 2500 | 400 / 500 |
| 美妝店 | 口紅 | 300 / 800 | 250 / 450 |
| 美妝店 | 粉底液 | 400 / 1200 | 350 / 500 |
| 美妝店 | 睫毛膏 | 250 / 600 | 200 / 400 |
| 美妝店 | 眼影 | 350 / 900 | 300 / 500 |
| 書局 | 字典 | 400 / 800 | 380 / 500 |
| 書局 | 食譜 | 300 / 600 | 280 / 480 |
| 書局 | 旅遊書 | 350 / 650 | 320 / 500 |
| 書局 | 參考書 | 200 / 550 | 200 / 480 |
| 玩具店 | 積木 | 500 / 1500 | 300 / 500 |
| 玩具店 | 娃娃 | 300 / 800 | 250 / 480 |
| 玩具店 | 機器人 | 400 / 1000 | 350 / 500 |
| 玩具店 | 拼圖 | 200 / 600 | 180 / 380 |
| 玩具店 | 飛機 | 200 / 600 | 180 / 380 |

服飾店（clothing）和運動用品店（sports）商品 price_max 均已在 3,000 元內，無需調整。

---

## 交易摘要圖片尺寸調整 + 移除圖片下方商品名稱（2026-03-05）

### 問題描述

1. A4 交易摘要的單一商品圖片尺寸（160px）小於 A1 的 180px，視覺不一致。
2. 組合商品（multi-selection）各子項圖片下方有商品名稱標籤，與下方「購買商品：XXX、YYY」欄位重複顯示。

### 修復內容

| 位置 | 修改前 | 修改後 |
|------|--------|--------|
| `showTransactionSummaryScreenWithData()` 單一商品 | `getProductIconHTML(selectedItem, '160px')` | `getProductIconHTML(selectedItem, '180px')` |
| 組合商品各子項 | `${this.getProductIconHTML(it, '70px')}<div>${it.name}</div>` | 只保留 `${this.getProductIconHTML(it, '70px')}`，移除名稱 div |

### 關鍵搜尋詞

`getProductIconHTML.*180px`, `multi-selection.*70px`

---

## 自選模式 selectedItems 跨題污染修復（2026-03-05）

### 問題描述

自選購買（freeChoice）模式下，完成一題後進入下一題的購物場景，點擊任何商品都出現「超過金額，無法購買」語音，且 ClickMode 輔助點擊也立即失敗。

### 根因分析

`initializeSelectedItems()` 的判斷條件為 `if (!this.state.gameState.selectedItems)`，陣列已存在時**不清空**舊資料。

進入下一題 shopping 場景時，`showShoppingScene()` 未重置 `selectedItems`，導致：

```
currentTotal = 上一題所有已選商品價格總和
newTotal = currentTotal + 新商品價格
budgetLimit = walletTotal（新題目的錢包金額）
if (newTotal > budgetLimit) → "超過金額，無法購買"  // 舊資料累積造成誤判
```

ClickMode `autoSelectProduct()` 在場景載入後自動呼叫 `targetProduct.click()` → `toggleProduct()`，同樣受影響，導致錯誤在用戶未點擊前就連續觸發多次。

### 修復內容

| 位置 | 變更 |
|------|------|
| `showShoppingScene()` 重置區塊（`hasUserSelectedProduct` / `isProcessingProductSelection` 旁） | 新增 `this.state.gameState.selectedItems = []` |

一行修復確保每道新題目 shopping 場景開始時，商品選擇清單必定為空。

### 關鍵搜尋詞

`selectedItems = []`, `showShoppingScene`, `initializeSelectedItems`

---

## 輔助點擊付款：同面額第2枚錢幣無法放置（2026-03-07）

### 問題描述

簡單/輔助點擊模式，付款金額含2枚以上同面額硬幣（例如：1335元 = 2×1000元 + 1×100元 + 1×50元 + 1×10元），點擊第2枚1000元的淡化圖示時無反應（跳過），最終確認付款按鈕保持禁用。

Debug log 顯示：`[A4-assist] 使用 UI 的付款方案: (2) ['1000元', 'null']`，`錢幣對象為 null，跳過`。

### 根因分析

**根因1：`addMoneyToWallet` 重複 ID**

`addMoneyToWallet(value, count)` 在 `count=1` 時 loop 的 `i` 永遠為 0，ID 格式為 `money_${value}_${Date.now()}_0`。同一毫秒內批量生成多枚同面額硬幣（如 4 枚1000元）時，所有枚的 ID 完全相同。

**根因2：`hintMoneyMapping` 以 ID Set 去重失效**

`generatePaymentHints()` 與 `renderPaymentSceneUI()` 中的 `hintMoneyMapping` 初始化使用 `usedMoneyIds` Set 去重，避免同一枚幣被重複映射。然而因 ID 重複，第2枚1000元的 ID 已在 Set 中，`findIndex()` 找不到有效錢幣物件，`hintMoneyMapping[1] = null`。

`autoPayMoney()` 遍歷 `hintMoneyMapping`，遇到 `null` 時 `錢幣對象為 null，跳過`，該位置的淡化圖示永遠無法被放置。

### 修復內容

| 位置 | 變更說明 |
|------|---------|
| `addMoneyToWallet()` ID 生成 | 加入 `_${Math.floor(Math.random() * 1e9)}` 確保每次呼叫產生不重複 ID |
| `generatePaymentHints()` hintMoneyMapping 初始化 | 以 `usedWalletIndices` Set（追蹤陣列索引）取代 `usedMoneyIds` Set（追蹤 ID），根本去除對 ID 唯一性的依賴 |
| `renderPaymentSceneUI()` hintMoneyMapping 初始化 | 同上，第二處初始化同步改用 `usedWalletIndices` |

改用陣列索引追蹤後，即使 ID 相同，只要是錢包陣列中不同位置的物件，均可正確映射，徹底解決重複面額硬幣的找不到問題。

### 關鍵搜尋詞

`usedWalletIndices`, `addMoneyToWallet`, `hintMoneyMapping`, `Math.random.*1e9`

---

## 輔助點擊付款：executeNextPayment 目標位置錯誤（2026-03-07）

### 問題描述

簡單/輔助點擊模式，付款金額含多種面額（例如：3245元 = 3×1000元 + 2×100元 + 1×50元），點擊100元/50元時出現「面額不匹配或位置已被佔用」，之後3枚1000元點擊正常，但最終確認付款按鈕仍保持禁用。

Debug log 顯示：`handleMoneyDrop: 面額不匹配 expected 1000 got 100`。

### 根因分析

`executeNextPayment()` 尋找要放置硬幣的 DOM 位置時，固定選取 `querySelectorAll('.hint-item.faded')[0]`（即 DOM 中**第一個**淡化提示格，面額由大到小排列，始終為最大面額 = 1000元位置）。

然而 `paymentQueue = hintMoneyMapping` 的順序來自 `optimalPayment` 算法輸出，可能為 `[100, 100, 50, 1000, 1000, 1000]`，前3枚依序為100元、100元、50元。

系統嘗試將100元硬幣放到1000元的 DOM 位置 → `handleMoneyDrop` 面額驗證失敗 → 硬幣退回錢包 → `paidAmount` 不足 → 確認付款按鈕保持禁用。

### 修復內容

| 位置 | 變更說明 |
|------|---------|
| `executeNextPayment()` 目標 DOM 選取 | 從 `querySelectorAll('.hint-item.faded')[0]` 改為 `querySelector('.hint-item.faded[data-position="${currentIndex}"]')` |

`data-position` 屬性在渲染 hint-item 時即標記原始索引，`hintMoneyMapping[currentIndex]` 的面額必然與同 index 的 hint-item 一致，解決面額不匹配問題。

### 跨單元影響確認

| 單元 | 是否受影響 | 說明 |
|------|-----------|------|
| A1 / A2 / A3 / A5 | 否 | 無 `executeNextPayment` 函數 |
| A6 | 否 | 有 `executeNextPayment`，但採完全不同實作（從錢包 DOM 找幣、直接更新 state），不依賴 hint-item DOM |
| A4 `executeNextChange` | 否（非 Bug） | 雖使用 `changeTargets[0]`，但 `changeQueue = changeReceived` 與 DOM 渲染同源且順序一致，循序處理正確 |

### 關鍵搜尋詞

`executeNextPayment`, `data-position`, `hint-item.faded`

---

## 輔助點擊付款設計模式比較分析（2026-03-07）

### 背景

修復 `executeNextPayment` 目標位置錯誤後，針對 A 系列三種不同輔助點擊付款實作進行設計品質比較，確立最優設計原則。

### 三種方案比較

#### 方案一：順序對齊（`executeNextChange` 模式）

```
changeQueue = changeReceived  →  DOM 也用 changeReceived.map(...) 渲染
兩者天生同序  →  [0] 永遠正確
```

- **優點**：零額外標記，邏輯最簡單，沒有映射問題
- **前提**：資料來源與 DOM 渲染必須用同一個陣列、同一個順序
- **代表**：A4 `executeNextChange`（changeQueue 與 DOM 均來自 `changeReceived`）

#### 方案二：`data-position` 精確定位（目前 A4 付款的修復方式）

```
hintMoneyMapping[i]  ←→  hint-item[data-position="${i}"]
不依賴 DOM 順序，靠屬性精確配對
```

- **優點**：面額顯示可按大→小（UX 友好），邏輯資料可以任意順序
- **缺點**：額外維護 `data-position` 屬性，多一層間接映射

#### 方案三：面額 DOM 查詢（A6 模式）

```
每步直接在 DOM 找符合面額的元素  →  點擊/移除
不需要 mapping 陣列
```

- **優點**：概念最直觀
- **缺點**：多枚同面額時只能取 `[0]`，無法區分「哪一個」，邊緣情況不穩健

### 最優設計原則

**方案一（順序對齊）是最優的設計原則。**

A4 付款問題的根本原因是 `hintMoneyMapping` 與 hint-item DOM 的**排列順序不同**（前者依 `optimalPayment` 算法輸出，後者依面額大→小顯示）。

最乾淨的修法是在 `generatePaymentHints()` 建完 `hintMoneyMapping` 後，按面額降序排列，讓資料順序對齊 DOM：

```javascript
// 建完 hintMoneyMapping 後排序，與 DOM（大→小）對齊
this.state.gameState.hintMoneyMapping.sort((a, b) => b.value - a.value);
// 如此 hintItems[0] 永遠正確，不需要 data-position
```

### 現況評估與未來建議

目前的 `data-position` 修復**正確且穩健**，可維持現狀。

若未來重構，可考慮改為「排序對齊」方式：
- 消除 `data-position` 屬性這一層間接依賴
- 讓付款邏輯與找零邏輯保持一致的設計模式（均使用方案一）

---

## 3C 用品店商品全面更新（2026-03-07）

### 背景

舊有 3C 商品（手機 price_max: 35,000、平板 price_max: 20,000）遠超教學情境合理金額，且商品種類以電腦周邊為主（滑鼠、鍵盤、充電器、隨身碟），與真實 3C 賣場購物情境脫節。

### 商品清單更新（兩個檔案同步）

`js/a4-shared-products.js` 與 `js/a4_simulated_shopping.js` 內 `electronics` 區塊同步替換為以下 11 種商品（全部在 10,000 元以下）：

| id | 商品名稱 | emoji | 圖示檔名 | price_min | price_max | 預設 price |
|----|---------|-------|---------|-----------|-----------|-----------|
| 136 | 耳機 | 🎧 | `icon-a4-headphones-shop.png` | 1,000 | 3,000 | 2,000 |
| 137 | 手機 | 📱 | `icon-a4-smartphone-shop.png` | 2,000 | 9,000 | 5,000 |
| 138 | 平板電腦 | 🖥️ | `icon-a4-tablet-shop.png` | 2,500 | 9,000 | 5,000 |
| 139 | 智慧手錶 | ⌚ | `icon-a4-smartwatch-shop.png` | 1,500 | 6,500 | 3,000 |
| 140 | 電動牙刷 | 🪥 | `icon-a4-electric-toothbrush-shop.png` | 800 | 4,000 | 1,500 |
| 141 | 無線藍牙喇叭 | 🔊 | `icon-a4-bluetooth-speaker-shop.png` | 1,500 | 6,000 | 2,500 |
| 142 | 掌上遊戲機 | 🎮 | `icon-a4-handheld-console-shop.png` | 3,000 | 9,500 | 7,000 |
| 143 | 網路攝影機 | 📷 | `icon-a4-webcam-shop.png` | 800 | 3,500 | 1,500 |
| 144 | 電子書閱讀器 | 📚 | `icon-a4-ereader-shop.png` | 1,500 | 5,500 | 3,000 |
| 145 | 電動刮鬍刀 | 🪒 | `icon-a4-electric-shaver-shop.png` | 800 | 5,000 | 2,000 |
| 200 | 行車紀錄器 | 📹 | `icon-a4-dashcam-shop.png` | 1,000 | 6,000 | 2,500 |

> **注意**：行車紀錄器使用 id: 200（跳過 146-199），因為 id 146 已被書局使用。

### 錢包上限 5,000 → 10,000 元

| 修改項目 | 舊值 | 新值 | 檔案 |
|---------|------|------|------|
| `STORE_WALLET_CAPS.electronics` | 5000 | 10000 | a4_simulated_shopping.js |
| `storesByAmount` key | `5000: ['electronics']` | `10000: ['electronics']` | a4_simulated_shopping.js |
| `amountLevels` 最後元素 | `[100, 500, 1000, 5000]` | `[100, 500, 1000, 10000]` | a4_simulated_shopping.js |
| fallback walletCap | `\|\| 5000` | `\|\| 10000` | a4_simulated_shopping.js |
| 自訂錢包加值驗證上限 | `tempTotal > 5000` | `tempTotal > 10000` | a4_simulated_shopping.js |
| 自訂錢包最大允許值計算 | `5000 - currentTotal + ...` | `10000 - currentTotal + ...` | a4_simulated_shopping.js |
| 自訂錢包語音提示 | `'總金額不能超過5000元'` | `'總金額不能超過10000元'` | a4_simulated_shopping.js |
| 自訂錢包警告色門檻 | `total >= 5000` / `>= 4500` | `total >= 10000` / `>= 9000` | a4_simulated_shopping.js |
| 自訂錢包確認 alert | `'錢包金額不能超過5000元'` | `'錢包金額不能超過10000元'` | a4_simulated_shopping.js |

---

## 3C 商品細項調整（2026-03-07）

### 耳機價格範圍調整

舊 `price_max: 8000` 偏高（高端耳機不適合教學情境），調整至 3,000 元反映一般學生認知的無線耳機市場現況。

| 欄位 | 舊值 | 新值 |
|------|------|------|
| `price` | 2,500 | 2,000 |
| `price_max` | 8,000 | 3,000 |

### 平板 → 平板電腦（名稱更新）

`name` 欄位從 `'平板'` 改為 `'平板電腦'`，讓測驗頁面顯示與語音朗讀均使用完整名稱「平板電腦」，避免學生誤解。

| 欄位 | 舊值 | 新值 |
|------|------|------|
| `name` | `'平板'` | `'平板電腦'` |
| `description` | `'平板/台'` | `'平板電腦/台'` |

兩項修改均同步更新 `a4-shared-products.js` 與 `a4_simulated_shopping.js`。

---

## 測驗頁面 CSS 佈局修復（2026-03-07）

### 問題 1：商品名稱文字置底對齊（步驟1、2、3）

**症狀**：`.item-task-text` 內的文字（商品名稱、「共N元」）在 flex 容器中呈底部對齊，而非垂直置中於商品圖片。

**根因**：文字為原始 text node（匿名 flex item），部分瀏覽器對匿名 flex item 的 `align-items: center` 繼承存在差異，導致文字對齊至行底部。

**修復**：將商品名稱文字與「共N元」包裹於 `<span style="align-self:center">`，使其成為明確的 flex item，強制垂直置中。

| 修改位置 | 說明 |
|---------|------|
| `js/a4_simulated_shopping.js` 步驟1購物場景（`showShoppingScene` 附近） | `taskDescription` + `共N元` 各加 span |
| `js/a4_simulated_shopping.js` 步驟2確認價格場景（`showPriceCalculationScene`） | `itemDisplayText` + `共N元` 各加 span |
| `js/a4_simulated_shopping.js` 步驟3付款場景（`renderPaymentSceneUI`） | `共N元` 加 span |

### 問題 2：步驟3商品圖片尺寸小於步驟2

**症狀**：步驟3「購買的物品」框中的商品圖片為 64px，視覺上明顯小於步驟2的 8rem（≈128px）。

**修復**：`renderPaymentSceneUI` 中兩處 `getProductIconHTML(item, '64px')` 改為 `getProductIconHTML(item, '8rem')`（單一商品及組合商品均更新）。

### 問題 3：步驟3 付款區 與 步驟4 店家找零區 圖示偏小

**症狀**：
- 步驟3 付款區（`#payment-money` 內 `.payment-money-item`）：所有金錢圖示均為 60px，紙鈔偏小（錢包紙鈔為 100px）。
- 步驟4 店家找零（`.change-money` 拖曳區）：所有圖示 inline style `42.5px`，小於下方找回零錢目標區的 50px。

**修復**：

| 位置 | 修改前 | 修改後 |
|------|--------|--------|
| `handleMoneyDrop()` `.payment-money-item img` | `width: 60px; height: 60px`（全部） | 紙鈔：`width: 100px; height: auto; max-height: 60px`；硬幣：`50px × 50px` |
| `showEasyModeChangeVerification()` `.change-money img` | `width: 42.5px; height: 42.5px` | `width: 50px; height: 50px; object-fit: contain` |

對應 wallet / 找回零錢目標區的尺寸標準：硬幣 50px（`--coin-size-sm`）、紙鈔 100px（`--banknote-size-sm`）。

---

## 輔助點擊「點擊任一處開始」視窗修復（2026-03-07）

### 問題描述

選擇「簡單 + 輔助點擊模式」，遊戲開始時顯示「點擊任意處開始」小視窗，但無論點擊畫面何處，視窗均不消失。

### 根因分析

`initForWelcome()` / `initForQuestion()` 設定 `clickState.waitingForStart = true`，但 **不** 設定 `waitingForClick`（維持 `false`）。

`handleClick()` 中的解鎖 guard（`js/a4_simulated_shopping.js` ClickMode 物件）：

```javascript
// 修復前（有 bug）
if (!clickState.waitingForClick) {
    return;  // waitingForStart=true 時也被這裡擋住，永遠不到 waitingForStart 判斷
}
```

由於 `waitingForClick = false`，guard 直接 return，第 14095 行的 `waitingForStart` 判斷從未執行，導致「開始」視窗永遠不消失。

### 修復

```javascript
// 修復後
if (!clickState.waitingForClick && !clickState.waitingForStart) {
    return;  // 只在兩者皆 false 時才阻擋，waitingForStart=true 可通過
}
```

搜尋關鍵字：`waitingForStart && !clickState.waitingForStart`（`handleClick` 中）

---

## 簡單模式圖示尺寸補充修復（2026-03-07）

### 問題 A：步驟2（簡單模式）商品名稱文字仍置底對齊

**症狀**：簡單模式步驟2顯示「平板電腦(圖片) 平板電腦」，右側文字置底對齊圖片，而非垂直置中。

**根因**：2026-03-07 第一輪修復將 `<span style="align-self:center">` 加入 `showPriceInputScene()`（普通/困難模式路徑），但**簡單模式**步驟2走的是完全不同的函數 `showEasyModePriceConfirmation()`。該函數的 `price-formula-display` 容器缺少 flex 佈局，導致 `<img>`（8rem）與 `<span>` 以 inline 方式排列，文字按 baseline 對齊（貼底）。

**修復**：在 `showEasyModePriceConfirmation()` 的 `price-formula-display` div 的 inline style 加入 flex 設定：

```javascript
// 修復前
style="padding: 30px; text-align: center; font-size: 1.5rem; font-weight: bold; color: #333;"

// 修復後
style="padding: 30px; text-align: center; font-size: 1.5rem; font-weight: bold; color: #333; display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 8px;"
```

搜尋關鍵字：`showEasyModePriceConfirmation`, `price-formula-display`

---

### 問題 B：步驟4 店家找零紙鈔圖示偏小

**症狀**：步驟4「店家找零」區（`.store-change`）的 100元以上紙鈔圖示顯示為 50×50px，與錢包區及找回零錢目標區的 100px 紙鈔不一致。

**根因**：`showEasyModeChangeVerification()` 中 `.change-money img` 的 inline style 統一設為 `width: 50px; height: 50px`，未區分紙鈔與硬幣。

**修復**：加入 `isBanknote` 條件，依面額分別設定尺寸：

```javascript
const isBanknote = money.value >= 100;
const changeImgStyle = isBanknote
    ? 'width: 100px; height: auto; max-height: 60px; object-fit: contain; pointer-events: none;'
    : 'width: 50px; height: 50px; object-fit: contain; pointer-events: none;';
// <img src="..." style="${changeImgStyle}">
```

搜尋關鍵字：`changeImgStyle`, `showEasyModeChangeVerification`

---

### 問題 C：步驟3 付款區提示圖示（hint-item）紙鈔偏小

**症狀**：簡單模式步驟3「付款區」顯示的提示金錢圖示（faded/lit-up hint items）中，紙鈔顯示為 60×60px，明顯小於錢包區的 100px 紙鈔。

**根因**：`generatePaymentHints()` 中所有提示項目的圖片均使用固定 `style="width: 60px; height: 60px;"`，不區分紙鈔與硬幣。簡單模式付款區顯示的正是這些 `.hint-item` 提示，而非 `payment-money-item`，因此先前對 `handleMoneyDrop()` 的修復未能作用。

**修復**：加入 `isBanknoteHint` 條件：

```javascript
const isBanknoteHint = value >= 100;
const hintImgStyle = isBanknoteHint
    ? 'width: 100px; height: auto; max-height: 60px; object-fit: contain;'
    : 'width: 50px; height: 50px; object-fit: contain;';
// <img src="..." style="${hintImgStyle}">
```

搜尋關鍵字：`isBanknoteHint`, `generatePaymentHints`, `hintImgStyle`

---

## 錯誤邊界誤觸發 + DP RangeError 防護（2026-03-07）

### 問題 1：音訊載入失敗誤觸發錯誤邊界（`a4_simulated_shopping.html`）

**症狀**：頁面載入時，音訊資源（`drop-sound.mp3` 等）若無法找到，瀏覽器的 `window.error` 事件被觸發，但此時 `event.error === null`（資源載入失敗非 JS 執行錯誤），原先的 error handler 未過濾此情況，直接顯示錯誤邊界並隱藏遊戲畫面。

**根因**：
```javascript
// 修復前（無過濾）
window.addEventListener('error', function(event) {
    console.error('JavaScript 錯誤:', event.error);  // event.error 可能為 null
    document.getElementById('error-boundary').style.display = 'flex';  // 誤觸發
    document.getElementById('loading-screen').style.display = 'none';
});
```

**修復**：
```javascript
// 修復後
window.addEventListener('error', function(event) {
    if (!event.error) return; // event.error=null 為資源載入失敗，忽略
    console.error('JavaScript 錯誤:', event.error);
    document.getElementById('error-boundary').style.display = 'flex';
    document.getElementById('loading-screen').style.display = 'none';
});
```

搜尋關鍵字：`a4_simulated_shopping.html` → `if (!event.error) return`

---

### 問題 2：`calculateOptimalPayment` RangeError 防護

**症狀**：若 `targetAmount` 為 `NaN`（例如 `selectedItem.price` 尚未設定）或其他非法值，`new Array(NaN + 1)` 拋出 `RangeError: Invalid array length`，導致整個付款流程崩潰。

**根因**：`calculateOptimalPayment(targetAmount, availableMoney)` 及內部 `findExactPayment(target, ...)` 均直接使用 `target` 建立 DP 陣列，無輸入驗證。

**修復**：
```javascript
// calculateOptimalPayment 入口防護
if (!targetAmount || typeof targetAmount !== 'number' || isNaN(targetAmount) || targetAmount <= 0) {
    Game.Debug.warn('payment', '❌ [A4-付款計算] 無效的目標金額，跳過計算:', targetAmount);
    return null;
}

// findExactPayment 內部防護
function findExactPayment(target, coinsList, counts) {
    if (!target || isNaN(target) || target <= 0 || target > 100000) return null;
    const dp = new Array(target + 1).fill(null);
    // ...
}
```

搜尋關鍵字：`calculateOptimalPayment`, `❌ [A4-付款計算] 無效的目標金額`

---

## _visualDelayTimer 裸 clearTimeout 修復（2026-03-09）

**問題**：輔助點擊模式視覺延遲計時器 `clickState._visualDelayTimer` 由 `Game.TimerManager.setTimeout()` 建立（返回內部計數器 ID），但清除時使用裸 `clearTimeout(clickState._visualDelayTimer)`，無法真正清除，輔助點擊模式可能因殘留計時器觸發而卡住。

**修復**：改為 `Game.TimerManager.clearTimeout(clickState._visualDelayTimer)`。

**附記**：`pendingTimers` 陣列（同一檔案 370/476 行）雖也使用 `clearTimeout`，但該陣列從未被 push 資料（無 `pendingTimers.push` 呼叫），`forEach` 永遠不執行，屬 dead code，非 bug。

**修改**：`js/a4_simulated_shopping.js`（搜尋 `_visualDelayTimer` 的清除處）

---

## 困難模式第四步顯示購買商品（2026-03-10）

**問題**：`showNormalHardModeChangeVerification()`（普通/困難模式第四步：確認找零）頁面只顯示「找零金額」和三選一選項，未顯示本題購買的商品圖示與名稱。相較之下，第三步 `renderPaymentSceneUI()` 有「購買的物品」框顯示商品圖示（8rem），導致兩步之間缺乏視覺連貫性。

**修復**（`js/a4_simulated_shopping.js`）：
在 `app.innerHTML` 之前計算 `itemDisplayText`（與第三步相同邏輯，`getProductIconHTML(item, '8rem')`），並在 HTML 模板 `<div class="title-bar">` 之後補加：

```html
<!-- 購買目標物品框（同第三步） -->
<div class="unified-task-frame">
    <div class="task-header"><h2>購買的物品</h2></div>
    <div class="selected-item-display">
        <div class="item-task-text">${itemDisplayText}<span style="align-self:center"> 共${transaction.totalCost}元</span></div>
    </div>
</div>
```

單一商品與組合商品（`multi-selection`）均支援。此修復適用於普通和困難兩種模式（共用同一函數）。

**關鍵搜尋詞**：`showNormalHardModeChangeVerification`（`js/a4_simulated_shopping.js`）、`購買目標物品框（同第三步）`


---

## 普通模式步驟3付款錯誤三項修復（2026-03-10）

### 問題

普通模式（指定購買 + 自選購買）步驟3付款頁面有三個問題：

1. **付款錯誤後金錢不退回**：付款金額不足或太多時，付款區的金錢圖示維持在付款區，需使用者手動拖回錢包，操作不直覺。
2. **首次錯誤即出現紅色×提示**：超額付款時，`highlightPaymentMoney()` 立刻在付款區加上紅色×動畫，與教學設計不符（應先讓學生多試幾次）。
3. **提示鈕 hover 上移**：CSS `.payment-hint-btn:hover` 含 `transform: translateY(-50%) !important`，滑鼠移入時按鈕上移約半個按鈕高度。

### 根因分析

**問題 1 & 2（超額付款路徑）**：
- 欠費路徑（underpayment）已在先前版本改為 `returnAllPaidMoney()`，但超額路徑仍舊呼叫 `highlightPaymentMoney(moneyToReturn)` 並未退幣。
- 兩條路徑的修復模式需要對齊：都應先退幣，再視錯誤次數決定是否顯示提示。

**問題 3（CSS）**：
- `.payment-hint-btn` 的父層 wrapper div 以 `transform: translateY(-50%)` 垂直置中，按鈕本身不應再有此 transform。
- `:hover`/`:active` 重複加上同樣的 transform，瀏覽器計算後等於向上額外移動半個按鈕高度。

### 修復

**超額付款路徑**（`js/a4_simulated_shopping.js`，`confirmPayment()` overpayment 區塊）：

```javascript
// 舊版：
const returnMessage = this.generateReturnMoneyMessage(moneyToReturn);
const fullMessage = `你付了太多的錢，${returnMessage}`;
this.speech.speak(fullMessage, { interrupt: true });
this.highlightPaymentMoney(moneyToReturn);

// 新版：
this.returnAllPaidMoney();
if (errorCount >= 3) {
    const allAvailableMoney = [...this.state.gameState.playerWallet];
    const optimalPayment = this.calculateOptimalPayment(itemPrice, allAvailableMoney);
    const speechText = this.generateOptimalPaymentSpeech(optimalPayment);
    this.speech.speak(speechText, { interrupt: true });
    if (optimalPayment && optimalPayment.length > 0) {
        this.showWalletHintWithTicks(optimalPayment.map(val => ({ value: val })));
    }
} else {
    this.speech.speak('你付了太多的錢，請重新付款', { interrupt: true });
}
```

欠費路徑已於先前版本同步修復（相同模式）。

**提示鈕 CSS**（移除 transform）：

```css
/* 修復前 */
.payment-hint-btn:hover {
    transform: translateY(-50%) !important;
}
.payment-hint-btn:active {
    transform: translateY(-50%) !important;
}

/* 修復後：移除 transform 行 */
.payment-hint-btn:hover {
    background: linear-gradient(135deg, #F57C00 0%, #E65100 100%);
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}
.payment-hint-btn:active {
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
```

**搜尋關鍵字**：`你付了太多的錢，請重新付款`（overpayment 路徑）、`payment-hint-btn:hover`（CSS block）

---

## 確認付款鈕平板寬度自適應（2026-03-11）

**問題**：在平板電腦（一欄佈局）顯示時，第三步付款頁面的「確認付款」按鈕寬度撐滿整個父容器，遠大於文字寬度。

**根因**：`.confirm-btn` CSS 設定為 `display: block; width: auto; margin: 10px auto`。對 `display: block` 元素而言，`width: auto` 等同於撐滿父容器寬度（100%），而非收縮至文字寬度。在桌面多欄佈局時因父容器寬度受限，按鈕看起來尚可接受；在平板單欄佈局時父容器變寬，按鈕便撐至全寬。

**修復**（`css/a4_simulated_shopping.css`）：
```css
/* 付款步驟確認付款按鈕：寬度自適應文字（平板一欄佈局時不撐滿全寬）*/
#confirm-payment {
    width: fit-content;
    min-width: 150px;
}
```

以 `#confirm-payment` 高特異性選擇器覆蓋 `.confirm-btn { width: auto }`，使按鈕收縮至文字寬度，`margin: 10px auto`（繼承自 `.confirm-btn`）自然將其置中。`min-width: 150px` 確保按鈕不會過小。

**搜尋關鍵字**：`fit-content`（`css/a4_simulated_shopping.css`）

---

## 修復：簡單/輔助點擊模式「點這裡」提示動畫 + 方框（2026-03-14）

### 問題

A4 簡單模式各步驟沒有明確的視覺引導，學生不知道要點哪個物件或按鈕。

### 修復內容

**JS（`js/a4_simulated_shopping.js`）**

| 步驟 | 模式 | 觸發時機 | 效果 |
|------|------|---------|------|
| 步驟1 選擇商品 | 非ClickMode易模式 | `closeTargetItemModal()` 關閉後 200ms | 目標商品加 `step-hint` |
| 步驟1 選擇商品 | ClickMode | `handleClick` 偵測到 modal 時：第一次點擊關閉 modal + 200ms 後商品加 `step-hint` + `return`（第二次點擊才選購） | 兩段式點擊 |
| 步驟2 確認價格 | ClickMode | `buildActionQueue('priceConfirmation')` 後 700ms | `#confirm-easy-price-btn` 加 `step-hint` |
| 步驟3 付款確認 | ClickMode | 所有付款金幣放置後啟用 `confirm-payment` 按鈕時 300ms | `confirmBtn.classList.add('step-hint')` |
| 步驟4 確認無需找零 | ClickMode | `autoSelectChange` 無需找零路徑 300ms | `.confirm-btn` 加 `step-hint` |

搜尋：`closeTargetItemModal`、`autoSelectProduct`、`waitingForConfirmPayment`、`needsNoChangeButton`

**CSS（`css/a4_simulated_shopping.css`）**

- `::after` 文字改 `👇 點這裡`，位置從底部改至頂部（`top: -48px; bottom: auto`）
- `.step-hint::before`：黃色外框（`#FFC107`），距元素 10px，`boxFramePulse` 動畫
- `@keyframes boxFramePulse`：邊框顏色 + 陰影脈動
- `@keyframes pulseHighlight` 更新：同時動畫 `outline-offset`（4px → 8px）

**商品圖片修正**

`icon-a4-calculator-shop.png`（文具店計算機）：檔案被誤覆蓋為資料夾圖片，使用者自行更正檔案內容後，`a4-shared-products.js` 的 `icon` 欄位維持 `icon-a4-calculator-shop.png` 不變。

---

## 購買任務彈窗商品圖片放大（2026-03-27）

**問題**：進入測驗後彈出的「🎯 購買任務」彈窗中，商品圖示偏小（100px × 100px），視覺上不夠突出。

**修復**：`showTargetItemModal()` 內 `getProductIconHTML(targetItem, '100px')` → `getProductIconHTML(targetItem, '128px')`

**關鍵搜尋詞**：`showTargetItemModal`、`getProductIconHTML.*128px`

---

## 任務框新增🔊朗讀按鈕（2026-03-30）

**需求**：指定任務模式進入第一步（選購畫面）時，任務框「請購買X包衛生紙 [圖] 共35元」右側加入喇叭按鈕，點擊後語音朗讀任務內容。

**修復**：

**JS（`js/a4_simulated_shopping.js`）**

- 新增 `speakShoppingTask()` 方法：讀取 `state.gameState.selectedItem`，組合語音文字 `請購買${productInfo.speechText}，共${convertToTraditionalCurrency(price)}`，呼叫 `this.speech.speak()`
- 在 `showShoppingScene()` 的 `item-task-text` 行內末尾加入 `<button class="a4-task-speak-btn" onclick="Game.speakShoppingTask()">🔊</button>`
- 按鈕僅在 `targetItem` 存在時（指定任務）顯示，自選模式不顯示

**CSS（`css/a4_simulated_shopping.css`）**

- 新增 `.a4-task-speak-btn`：40px 圓形紫框按鈕（`border: 2px solid #7c3aed`），`inline-flex`，`align-self: center`，hover 填色，active 縮放

**修正**：初版語音誤為「請購買1個麵包麵包共40元」（`productInfo.name` 與 `speechText` 重複）→ 移除多餘的 `，${productInfo.name}`

**關鍵搜尋詞**：`speakShoppingTask`、`a4-task-speak-btn`

---

## 困難模式步驟3付款提示改為彈窗（2026-04-07）

### 需求

A4 困難模式第三步（付錢頁面），按下提示鈕後，仿照 A6 模式顯示付款提示彈窗，內容含金錢圖片×張數、「🔊 再播一次」及「我知道了」按鈕；確認後才在錢包顯示綠色勾。

### 修改

**`js/a4_simulated_shopping.js`**

- `showPaidAmountHint()` 重構：保留退回金錢、`paidAmountRevealed`、`calculateOptimalPayment()` 計算、`isProcessingHint` 旗標邏輯；新增建立 `hintListHTML`（`storeData.moneyItems.find(m => m.value === val).images.front`）並以 `insertAdjacentHTML` 插入彈窗（id=`a4PaymentHintModal`，全部 inline style）；儲存 `_lastPaymentHintSpeech` 及 `_lastOptimalPaymentA4`；播放 `this.speech.speak()`
- 新增 `replayPaymentHintSpeech()`：呼叫 `this.speech.speak(this._lastPaymentHintSpeech, { interrupt: true })`（`Game.replayPaymentHintSpeech()`）
- 新增 `confirmPaymentHint()`：移除彈窗，呼叫 `showWalletHintWithTicks()`，重置 `isProcessingHint = false`（`Game.confirmPaymentHint()`）

### 關鍵搜尋詞

`a4PaymentHintModal`、`replayPaymentHintSpeech`、`confirmPaymentHint`、`_lastOptimalPaymentA4`

---

## 付款提示彈窗音效修正（2026-04-07）

### 問題

按下「我知道了」或「🔊 再播一次」後出現錯誤：`Uncaught TypeError: this.playSound is not a function`（line ~14096）。

根因：`confirmPaymentHint()` 和 `replayPaymentHintSpeech()` 呼叫了 `this.playSound('click')`，但 A4 物件沒有 `playSound` 方法（A4 使用 `this.menuSelectAudio.play()` 播放點擊音效）。

### 修改

**`js/a4_simulated_shopping.js`**

- `replayPaymentHintSpeech()`：`this.playSound('click')` → `try { this.menuSelectAudio?.play().catch(() => {}); } catch(e) {}`
- `confirmPaymentHint()`：`this.playSound('click')` → `try { this.menuSelectAudio?.play().catch(() => {}); } catch(e) {}`

### 關鍵搜尋詞

`menuSelectAudio` in `confirmPaymentHint`
