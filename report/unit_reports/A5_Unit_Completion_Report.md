# A5 ATM 提款機單元 — 完成經驗報告書

> **建立日期**：2026-02-09（日）17:45
> **更新日期**：2026-03-25（輔助點擊模式六項修復 + Pattern 6 跨輪狀態污染；標題列轉帳步驟計數修正）
> **專案名稱**：Money Tutor 金錢教學系統
> **單元編號**：A5 — ATM 提款機模擬學習
> **報告類型**：單元完成經驗與開發建議

---

## 一、檔案規模總覽

| 檔案 | 路徑 | 行數 | 大小 |
|------|------|------|------|
| JS 核心邏輯 | `js/a5_atm_simulator.js` | 15,758 行 | 787 KB |
| CSS 樣式 | `css/a5_atm_simulator.css` | 4,344 行 | 97 KB |
| HTML 頁面 | `html/a5_atm_simulator.html` | 448 行（+327 行 inline CSS） | — |
| 作業單產生器 | `worksheet/units/a5-worksheet.js` | 405 行 | — |
| **合計** | — | **20,955 行** | — |

### 素材資源

| 類型 | 數量 | 路徑 | 說明 |
|------|------|------|------|
| ATM 圖片 | 1 張 PNG（132 KB） | `images/a5/icon-a5-atm.png` | ATM 機台圖 |
| 金融卡圖片 | 1 張 PNG（941 KB） | `images/a5/icon-a5-card.png` | 金融卡圖 |
| 錢幣圖片 | 18 張 PNG（9 面額×正反面） | `images/money/*_yuan_front/back.png` | 共用 |
| 音效檔案 | 1 種（success.mp3） | `audio/success.mp3` | 共用 |

### A1～A5 規模比較

| 項目 | A1 販賣機 | A2 理髮廳 | A3 麥當勞 | A4 超市購物 | **A5 ATM** | A5 vs A4 | A5 vs A1 |
|------|----------|----------|----------|------------|-----------|----------|----------|
| JS 行數 | 6,080 | 8,163 | 9,691 | 14,682 | **15,758** | +7% | +159% |
| HTML 行數 | 31 | 450 | 252 | 288（+302） | 448（+327） | +34% | +2,400% |
| CSS 行數 | 821 | 3,136 | 1,721 | 3,528 | **4,344** | +23% | +429% |
| 合計行數 | 7,290 | 12,090 | 12,074 | 19,415 | **20,597** | +6% | +183% |
| 品項/服務數 | 19 飲料 | 6 服務 | 70 餐點 | 119 商品 | **4 交易類型** | — | — |
| 專用圖片 | 19 張 | 10 張 | 83 張 | 119 張 PNG（emoji fallback） | **2 張** | — | — |
| 作業單行數 | 358 | 341 | 410 | 615 | **405** | -34% | +13% |

**A5 是 A 系列中 JS 行數最大（15,758 行）、程式碼總量最大（20,955 行）的單元**，作業單已擴充至 405 行、11 種題型。

---

## 二、單元特色

### 2.1 完整模擬 ATM 操作體驗

A5 模擬了真實 ATM 提款機的完整操作流程，涵蓋 4 種交易類型，每種交易都包含多步驟流程：

1. **插入金融卡** → 卡片插入動畫 + 指示燈亮起
2. **輸入 PIN 密碼** → 3×4 數字鍵盤 + 星號遮蔽
3. **選擇交易服務** → 主選單介面
4. **執行交易操作** → 依交易類型進入不同子流程
5. **列印/不列印明細表** → 收據列印分支
6. **退卡** → 卡片退出動畫

### 2.2 ATM 硬體視覺元素（A5 獨有）

A5 是 A 系列中**唯一包含物理硬體視覺模擬**的單元：

| 硬體元素 | 位置 | 功能 |
|---------|------|------|
| 卡片插槽 + 指示燈 | 左側面板 | 金融卡插入/退出動畫、LED 狀態指示 |
| ATM 螢幕 | 中央面板 | 主操作介面（520px 高） |
| 3×4 數字鍵盤 | 中央面板下方 | PIN 密碼 / 金額 / 帳號輸入 |
| 出鈔口 | 左側面板 | 提款現金動畫、存款金錢放入 |
| 收據列印機 + 收據槽 | 右側面板 | 明細表列印動畫、取走收據 |
| 收據顯示區域 | 右側面板 | 交易明細即時顯示 |

**三欄佈局**：`左側面板（卡片槽 + 出鈔口）| 中央面板（螢幕 + 鍵盤）| 右側面板（收據）`

### 2.3 PIN 密碼系統（A5 獨有）

A5 是 A 系列中**唯一包含密碼輸入**的單元：

| 項目 | 說明 |
|------|------|
| 預設密碼 | 1234（4 位數） |
| 自訂密碼 | 支援 4-12 位數字 |
| 輸入介面 | 3×4 數字鍵盤（0-9 + 確認 + 取消） |
| 顯示方式 | 星號（*）遮蔽 |
| 驗證機制 | 逐次比對，錯誤計數 |
| 密碼安全教育 | 模擬 ATM 的密碼操作規範 |

### 2.4 三種難度模式

| 面向 | 簡單模式 | 普通模式 | 困難模式 |
|------|---------|---------|---------|
| 任務方式 | 指定交易 + 自動提示 | 指定交易 + 3 次錯誤後提示 | 指定/自選交易 |
| PIN 驗證 | 驗證輸入 | 驗證輸入 | 驗證輸入 |
| 提示方式 | 每步自動黃色光暈 + 語音 | 錯誤 3 次後 10 秒延遲提示 | 無自動提示 |
| 帳戶餘額 | 隨機 1,000-60,000 | 預設 100,000 | 自訂（可設定） |
| 自選服務 | 不可選 | 不可選 | **可選** |
| 自訂餘額 | 不可選 | 不可選 | **可選** |
| Click Mode | 可啟用 | 不可啟用 | 不可啟用 |

### 2.5 四種交易類型 + 自選模式

| 交易類型 | 步驟數 | 主要操作 |
|---------|--------|---------|
| **提款** | 7 步 | 插卡 → 密碼 → 選提款 → 輸入金額 → 確認 → 取現金 → 取卡 |
| **存款** | 6 步 | 插卡 → 密碼 → 選存款 → 放入現金 → 確認金額 → 取卡 |
| **餘額查詢** | 5 步 | 插卡 → 密碼 → 選查詢 → 查看餘額 → 取卡 |
| **轉帳** | 8+ 步 | 插卡 → 密碼 → 選轉帳 → 銀行代碼 → 帳號 → 金額 → 確認 → 取卡 |
| **自選服務** | 不定 | 困難模式可自由選擇交易類型 |

**轉帳是 A 系列中最多步驟的單一流程**（8+ 步），需要輸入銀行代碼（3 位）+ 帳號（10 位）+ 轉帳金額。

### 2.6 輔助點擊模式（30+ 階段，A 系列最多）

A5 的 Click Mode 覆蓋 **30+ 個操作階段**，為 A 系列中最多：

- **啟用條件**：僅限簡單模式 + 指定任務
- **操作方式**：任意處點擊即執行下一步
- **全域點擊攔截器**：`document.addEventListener('click', ...)` 攔截所有點擊事件
- **Action Queue**：`actionQueue` 佇列管理（81 處引用）
- **防快速連點**：三層防抖（`isProcessing` + `clickReadyTime` 600ms + `lastClickTime` 500ms）
- **安全網**：`waitForScreenReady` 等待畫面就緒
- **彈窗特殊處理**：金錢選擇彈窗、任務提示彈窗、明細表彈窗等各自有點擊判斷邏輯

### 2.7 帳戶餘額系統（A5 獨有）

A5 是 A 系列中**唯一包含帳戶餘額追蹤**的單元：

| 項目 | 說明 |
|------|------|
| 預設餘額 | 100,000 元（普通/困難模式） |
| 簡單模式餘額 | 隨機 1,000-60,000 元（以 1,000 為單位） |
| 自訂餘額 | 困難模式可自訂（`customBalance`） |
| 自訂帳號 | 預設 8 位隨機數字（可自訂） |
| 即時更新 | 交易完成後即時更新帳戶餘額 |
| 餘額查詢 | 可在 ATM 螢幕上查看當前餘額 |

### 2.8 收據列印系統（A5 獨有）

A5 包含完整的收據列印/不列印分支流程：

1. 交易完成後詢問「是否列印明細表？」
2. 選擇列印 → 收據列印動畫 → 收據顯示在右側面板 → 取走收據按鈕
3. 選擇不列印 → 直接進入退卡流程
4. 收據內容包含：交易時間、交易類型、金額、帳戶餘額

### 2.9 普通模式錯誤 3 次提示（9 個錯誤計數器）

A5 擁有 A 系列中**最精細的錯誤追蹤系統**，共 9 個獨立計數器：

```
normalModeErrors: {
    pinErrorCount: 0,            // 密碼輸入錯誤
    pinCancelErrorCount: 0,      // 密碼輸入時按取消鈕
    bankCodeErrorCount: 0,       // 銀行代碼輸入錯誤
    accountNumberErrorCount: 0,  // 轉帳帳號輸入錯誤
    transferAmountErrorCount: 0, // 轉帳金額輸入錯誤
    mainMenuErrorCount: 0,       // 主選單服務選擇錯誤
    withdrawAmountErrorCount: 0, // 提款金額選擇錯誤
    depositCancelErrorCount: 0,  // 存款取消按鈕錯誤
    depositConfirmErrorCount: 0  // 存款確認按鈕錯誤
}
```

各計數器在每輪新題目時重置。達到 3 次後啟動視覺動畫提示。

### 2.10 Loading + Error Boundary + NoScript

| 功能 | 實現方式 |
|------|---------|
| Loading 畫面 | 旋轉動畫 + 「ATM系統載入中...」+ 1.5 秒後自動隱藏 |
| Error Boundary | 全域 `window.addEventListener('error', ...)` + 「系統發生錯誤」彈窗 + 重新載入按鈕 + `role="alert"` |
| NoScript | JavaScript 停用時顯示「需要啟用 JavaScript」友善提示 |
| 效能監控 | `performance.timing` 載入時間記錄 + 超過 5 秒警告 |

### 2.11 作業單系統（405 行，11 種題型）

A5 的作業單已擴充至 **405 行**，提供 **11 種題型**，與其他 A 系列單元看齊：

| 項目 | 說明 |
|------|------|
| 步驟排序 | 將操作步驟按正確順序排列（4 種交易類型） |
| 存款計算（5 種） | fill / fill-select / coin-select / hint-select / hint-complete |
| 提款計算（5 種） | fill / fill-select / coin-select / hint-select / hint-complete |
| 預設題數 | 步驟 2 題/頁、計算 20 題（滿版） |
| 工具列配置 | 帳戶金額 / 圖示類型 / 測驗題型 |
| 金錢圖示 | 紙幣圖示（100/500/1000 元） |

**題型詳細說明**：

| # | 題型值 | 顯示名稱 | 說明 |
|---|--------|---------|------|
| 1 | `steps` | 提款機步驟 | 步驟排序題 |
| 2 | `deposit-fill` | 數字填空(存款) | 計算帳戶總額，填空作答 |
| 3 | `deposit-fill-select` | 填空與選擇(存款) | 填空 + 3 個紙幣圖示選項 |
| 4 | `deposit-coin-select` | 圖示選擇(存款) | 從 3 個紙幣組合中勾選正確的 |
| 5 | `deposit-hint-select` | 提示選擇(存款) | 同上，選項旁顯示金額提示 |
| 6 | `deposit-hint-complete` | 提示完成(存款) | 填寫各幣值數量 |
| 7 | `withdraw-fill` | 數字填空(提款) | 計算帳戶餘額，填空作答 |
| 8 | `withdraw-fill-select` | 填空與選擇(提款) | 填空 + 3 個紙幣圖示選項 |
| 9 | `withdraw-coin-select` | 圖示選擇(提款) | 從 3 個紙幣組合中勾選正確的 |
| 10 | `withdraw-hint-select` | 提示選擇(提款) | 同上，選項旁顯示金額提示 |
| 11 | `withdraw-hint-complete` | 提示完成(提款) | 填寫各幣值數量 |

**與其他 A 系列作業單比較**：

| 項目 | A1 | A2 | A3 | A4 | **A5** |
|------|-----|-----|-----|-----|--------|
| 行數 | 358 | 341 | 410 | 615 | **405** |
| 題型數 | 10 | 10 | 10 | 10 | **11** |
| 工具列 | 完整 | 完整 | 完整 | 完整 | **完整** |
| 金錢圖示 | 有 | 有 | 有 | 有 | **有** |

### 2.12 設定頁面選項

| 設定項目 | 選項 | 說明 |
|---------|------|------|
| 選擇難度 | 簡單 / 普通 / 困難 | 含難度說明文字 |
| 輔助點擊模式 | 啟用 / 停用 | 僅簡單模式顯示 |
| 帳戶設定 | 預設 / 自訂密碼 / 自訂帳戶金額 | 自訂金額僅困難模式 |
| 任務類型 | 提款 / 存款 / 餘額查詢 / 轉帳 / 自選服務 | 自選僅困難模式 |
| 測驗題數 | 1 / 3 / 5 / 10 / 自訂 | 含自訂輸入 |
| 獎勵系統 | 開啟獎勵系統 | — |
| 作業單 | 產生作業單 | — |

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

### 3.2 per-phase / per-transaction 語音結構

A5 **不使用模板化語音系統**（speechTemplates），而是採用 **per-phase / per-transaction** 的語音結構。每個交易類型的每個階段各自撰寫語音內容：

| 場景 | 語音方式 |
|------|---------|
| 歡迎畫面 | 直接撰寫 |
| PIN 密碼提示 | 依難度各自撰寫 |
| 主選單選擇 | 依交易類型各自撰寫 |
| 金額選擇 | 使用 `convertAmountToSpeech()` 轉換金額 |
| 交易處理中 | 依交易類型各自撰寫 |
| 收據/明細表 | callback-based 串接 |
| 完成畫面 | 直接撰寫 |

**與 A2～A4 的差異**：A2/A3/A4 採用 `speechTemplates` 模板化語音，A5 則逐階段手寫語音，靈活但維護成本較高。

### 3.3 callback-based 語音串接

A5 的語音使用 **callback** 機制，確保語音播放完畢後再執行後續操作：

```
語音「謝謝惠顧」 → callback → 顯示取走明細表按鈕
語音「請取走現金」 → callback → 啟用取鈔按鈕
```

此設計解決了語音被後續操作中斷的問題（v1.2.60 修復記錄中有詳細說明）。

### 3.4 金額語音轉換

A5 使用 `this.convertAmountToSpeech(amount)` 函數（共 21 處引用），確保金額語音符合中文發音規則：

| 金額 | 語音輸出 | 說明 |
|------|---------|------|
| 2 元 | 「兩元」 | 2 + 單位用「兩」 |
| 12 元 | 「拾貳元」 | 個位 2 用「貳」 |
| 200 元 | 「兩百元」 | 百位 2 用「兩」 |
| 2,000 元 | 「兩千元」 | 千位 2 用「兩」 |
| 10,000 元 | 「壹萬元」 | 標準中文數字 |

### 3.5 語音速率

A5 明確設定語音速率為 **1.0x**（`utterance.rate = 1.0`）。

各 A 系列語音速率比較：

| 單元 | 速率 |
|------|------|
| A1 | 標準（瀏覽器預設） |
| A2 | 0.9~0.95x（慢速清晰） |
| A3 | 1.2x / 0.9x（雙速率） |
| A4 | 瀏覽器預設 |
| **A5** | **1.0x（明確設定）** |

### 3.6 語音觸發時機一覽

| 場景 | 語音內容範例 | 觸發時機 |
|------|-------------|---------|
| 歡迎畫面 | 「歡迎使用ATM」 | 進入遊戲 |
| 插卡提示 | 「請插入金融卡」 | 顯示 ATM 介面 |
| PIN 輸入 | 「請輸入四位數密碼」 | 進入密碼畫面 |
| 主選單 | 「請選擇要使用的服務」 | 密碼驗證成功 |
| 金額選擇 | 「請選擇提款金額」 | 進入金額選擇 |
| 交易處理 | 「處理中，請稍候」 | 確認交易 |
| 明細表 | 「請問是否需要列印明細表？」 | 交易完成 |
| 取鈔 | 「請取走現金」 | 提款完成 |
| 退卡 | 「請取回您的金融卡」 | 流程結束 |
| 完成 | 「謝謝惠顧，歡迎下次使用」 | 退卡完成 |

### 3.7 語音注意事項

- **行動裝置限制**：iOS/Android 需要使用者互動後才能啟用語音（已由 `audio-unlocker.js` 處理）
- **callback 串接**：確保語音完整播放後再觸發後續操作
- **語音中斷問題**：v1.2.60 修復了「謝謝惠顧」語音被「請取走明細表」中斷的問題
- **轉帳帳號語音**：v1.2.60 修復帳號逐位數唸出（如 「5 9 7 9 4 8 7 2 6 7」）

---

## 四、觸控與桌面支援

### 4.1 桌面端支援

A5 是 A 系列中**唯一支援鍵盤快捷鍵**的後期單元（A2/A3 也有，A4 無）：

| 按鍵 | 功能 | 觸發方式 |
|------|------|---------|
| `0`-`9` | 數字輸入（PIN/金額/帳號） | `ATM.handleNumberInput(key)` |
| `Enter` | 確認操作 | `ATM.handleEnterKey()` |
| `Escape` | 取消操作 | `ATM.handleCancelKey()` |

鍵盤事件在 HTML 中以全域 `document.addEventListener('keydown', ...)` 註冊。

### 4.2 觸控端支援

- **Viewport 設定**：`width=device-width, initial-scale=1.0`
- **防下拉重整**：`overscroll-behavior-y: contain`（html、body、#app 三層防護）
- **觸控音效解鎖**：引用 `audio-unlocker.js`
- **行動裝置除錯面板**：引用 `mobile-debug-panel.js`
- **主題系統**：引用 `theme-system.js`
- **觸控滾動**：`-webkit-overflow-scrolling: touch`

**注意**：A5 **不引用** `touch-drag-utility.js`（無拖放需求，ATM 操作以點擊為主）。

### 4.3 防快速連點（Debounce）多層防護

A5 的防抖系統涵蓋 Click Mode 和一般操作：

| 層級 | 機制 | 說明 |
|------|------|------|
| **State 鎖** | `isProcessing` | 交易處理中 |
| **State 鎖** | `showingModal` | 彈窗顯示中 |
| **Click Mode 鎖** | `clickReadyTime` + 600ms | 輔助模式防快速連點 |
| **Click Mode 鎖** | `lastClickTime` + 500ms | 雙擊防護 |
| **安全網** | `waitForScreenReady` | 等待畫面就緒 |
| **子流程鎖** | `isSubFlowActive` | 防止主選單事件觸發 |

### 4.4 ARIA 標籤與無障礙

| 元素 | ARIA 屬性 | 值 |
|------|----------|---|
| `#loading-screen` | `aria-label` | 「ATM系統載入中」 |
| `#app` | `role` | `main` |
| `#app` | `aria-label` | 「ATM提款機模擬學習主要內容」 |
| `#app` | `aria-live` | `polite`（DOM ready 後設定） |
| `#error-boundary` | `role` | `alert` |

### 4.5 A1～A5 觸控支援比較

| 項目 | A1 | A2 | A3 | A4 | **A5** |
|------|------|------|------|------|------|
| 音效解鎖 | 自行實現 | `audio-unlocker.js` | `audio-unlocker.js` | `audio-unlocker.js` | `audio-unlocker.js` |
| 除錯面板 | 不引用 | `mobile-debug-panel.js` | 內嵌 inline | `mobile-debug-panel.js` | `mobile-debug-panel.js` |
| 主題系統 | 不引用 | `theme-system.js` | `theme-system.js` | `theme-system.js` | `theme-system.js` |
| 鍵盤快捷鍵 | 無 | 1-6, Enter, Esc | 1-4, Enter, Esc | 無 | **0-9, Enter, Esc** |
| 拖曳工具 | 不引用 | 不引用 | `touch-drag-utility.js` | `touch-drag-utility.js` | **不引用** |
| Loading | 無 | 有 | 有 | 有 | **有** |
| Error Boundary | 無 | 有 | 有 | 有 | **有** |
| NoScript | 無 | 無 | 無 | 有 | **有** |
| ARIA | 基本 | 完整 | 完整 | 最完整 | **完整（含 aria-live）** |
| 效能監控 | 無 | 無 | 無 | 無 | **有** |
| 防抖層數 | 6 | 4 | 4 | 7 | **6** |

---

## 五、不同版面（RWD 響應式設計）

### 5.1 HTML inline CSS 響應式斷點

| 斷點 | 範圍 | 版面配置 |
|------|------|---------|
| **桌面版** | >1200px | 三欄水平佈局：左側面板（卡片槽+出鈔口）+ 中央面板（螢幕+鍵盤）+ 右側面板（收據） |
| **平板版** | ≤1200px | 三欄垂直堆疊，各面板最大寬度 500px 居中 |
| **手機版** | ≤768px | 垂直堆疊，減小間距，螢幕高度 420px |
| **小手機** | ≤480px | 進一步縮小間距，螢幕高度 350px |

### 5.2 CSS 檔案響應式斷點

CSS 檔案含 14 個 `@media` 查詢：

| 媒體查詢 | 數量 | 用途 |
|---------|------|------|
| `max-width: 768px` | 5 個 | 平板/手機版佈局 |
| `max-width: 480px` | 3 個 | 小手機版佈局 |
| `prefers-color-scheme: dark` | **1 個** | Dark Mode 支援 |
| `prefers-reduced-motion: reduce` | **1 個** | 減少動畫偏好 |
| `prefers-contrast: high` | **1 個** | 高對比模式 |
| `print` | **1 個** | 列印樣式 |

### 5.3 Dark Mode CSS（A5 獨有）

A5 是 A 系列中**唯一支援 `prefers-color-scheme: dark`** 的單元：

- 深色背景漸層（`#1a1a1a` → `#2d2d2d`）
- 設定頁面保持白色（確保可讀性）
- 結果頁面使用深色主題
- 按鈕顏色自動調整

### 5.4 Print CSS（A5 獨有）

A5 是 A 系列中**唯一支援 `@media print`** 的單元：

- 移除陰影效果
- 背景改為白色
- 文字改為黑色
- ATM 邊框改為實線

### 5.5 ATM 螢幕高度 RWD

| 斷點 | 螢幕高度 |
|------|---------|
| 桌面版 | 520px |
| 平板版（≤768px） | 420px |
| 手機版（≤480px） | 350px |

### 5.6 A1～A5 RWD 比較

| 項目 | A1 | A2 | A3 | A4 | **A5** |
|------|------|------|------|------|------|
| RWD 斷點數 | 3 | 4 | 8 | 3+3 無障礙 | **4+4 無障礙** |
| 最大螢幕支援 | 1024px+ | 1200px+ | 2560px+ | 768px+ | **1200px+** |
| 佈局系統 | Grid | Flex | Grid | Grid | **Flex（三欄）** |
| Dark Mode | 無 | 無 | 無 | 無 | **有** |
| Print CSS | 無 | 無 | 無 | 無 | **有** |
| 高對比模式 | 無 | 有 | 有 | 有 | **有** |
| 減少動畫 | 無 | 無 | 無 | 有 | **有** |

---

## 六、動畫系統

### 6.1 CSS @keyframes 動畫（CSS 檔案，30 個）

| # | 動畫名稱 | 效果 | 用途 |
|---|----------|------|------|
| 1 | `slideUp` | 上滑淡入 | 內容進場 |
| 2 | `pulse` | 綠色光暈脈衝 | 成功狀態 |
| 3 | `blink` | 閃爍 | 指示燈 |
| 4 | `cardInsertToSlot` | 卡片插入 | 金融卡插入動畫 |
| 5 | `cardEjectReverse` | 卡片反向退出 | 金融卡退出動畫 |
| 6 | `lightPulse` | 燈光脈衝 | LED 指示燈 |
| 7 | `billAppear` | 紙鈔出現 | 存款/提款動畫 |
| 8 | `cashOutletSlideDown` | 出鈔口下滑 | 出鈔口開啟 |
| 9 | `cashOutletSlideUp` | 出鈔口上滑 | 出鈔口關閉 |
| 10 | `dispensing` | 出鈔中 | 提款出鈔動畫 |
| 11 | `cash-dispenser-closing` | 出鈔口關閉 | 提款完成 |
| 12 | `cardEject` | 卡片退出 | 退卡動畫 |
| 13 | `cardEjectFromSlot` | 卡片從槽退出 | 退卡動畫（另一角度） |
| 14 | `billDispense` | 紙鈔分發 | 提款現金動畫 |
| 15 | `cashDispense` | 現金分發 | 提款現金動畫 |
| 16 | `spin` | 旋轉 | Loading 旋轉器 |
| 17 | `dotPulse` | 點脈衝 | Loading 點點 |
| 18 | `successPulse` | 成功脈衝 | 成功反饋 |
| 19 | `bounce` | 上下彈跳 | 浮動圖示 |
| 20 | `modalFadeIn` | 彈窗淡入 | 彈窗出現 |
| 21 | `modalSlideUp` | 彈窗上滑 | 彈窗進場 |
| 22 | `atmBoot` | ATM 開機 | ATM 啟動動畫 |
| 23 | `screenFadeIn` | 螢幕淡入 | ATM 螢幕亮起 |
| 24 | `flowHintPulse` | 流程提示脈衝 | 步驟提示 |
| 25 | `atmPulseHint` | ATM 脈衝提示 | 操作提示 |
| 26 | `atmBorderPulse` | ATM 邊框脈衝 | 邊框高亮提示 |
| 27 | `atmBounceHint` | ATM 彈跳提示 | 提示標籤 |
| 28 | `hint-pulse` | 提示脈衝 | 通用提示 |
| 29 | `fadeIn` | 淡入 | 通用淡入 |
| 30 | `slideDown` | 下滑 | 內容進場 |

**CSS 檔案 34 個 @keyframes 動畫（含 2026-02-11 從 JS 移入的 4 個），無重複定義。**

### 6.2 JS 內嵌 @keyframes 動畫（JS 檔案）

> **2026-02-11 更新**：`fadeIn`、`fadeInScale`（×3）、`depositAnimation`（×3）、`bounce`（×2）共 10 處重複定義已移至 CSS 去重。完成畫面的 `bounce` 改名為 `bounceCompletion`，歡迎畫面的 `bounce` 改名為 `bounceWelcome`。

| # | 動畫名稱 | 用途 | 備註 |
|---|----------|------|------|
| 1 | `bounceIn` | 彈跳進場 | 僅 JS |
| 2 | `hintBounce` | 提示彈跳 | 僅 JS |
| 3 | `modalSlideIn` | 彈窗滑入 | CSS 有 `modalSlideUp`（類似） |
| 4 | `celebrate` | 慶祝動畫 | 完成畫面 |
| 5 | `pulse` | 脈衝 | CSS 也有（重複，僅 1 處） |

**JS 檔案現存 5 處 @keyframes 定義，5 個獨立動畫名稱。`pulse` 仍有 1 處 JS/CSS 重複。**

### 6.3 ATM 專屬動畫（A5 獨有）

以下動畫為 A5 獨有，模擬 ATM 硬體操作：

| 動畫 | 說明 |
|------|------|
| `cardInsertToSlot` / `cardEjectFromSlot` | 金融卡插入/退出卡片槽 |
| `cardEject` / `cardEjectReverse` | 金融卡退出動畫（多角度） |
| `billDispense` / `cashDispense` | 提款出鈔動畫 |
| `billAppear` | 存款紙鈔出現 |
| `dispensing` / `cash-dispenser-closing` | 出鈔口開關動畫 |
| `cashOutletSlideDown` / `cashOutletSlideUp` | 出鈔口滑動 |
| `atmBoot` / `screenFadeIn` | ATM 開機序列 |
| `lightPulse` / `blink` | LED 指示燈效果 |

### 6.4 動畫總數比較

| 項目 | A1 | A2 | A3 | A4 | **A5** |
|------|------|------|------|------|------|
| CSS @keyframes | 14 | 8 | 16 | 8 | **30** |
| JS 內嵌動畫 | 2 | — | 14 | 17 | **9（15 處定義）** |
| HTML 內嵌動畫 | — | — | — | 3 | — |
| **動畫總數** | **16** | **8** | **~24** | **~28** | **~39（最多）** |

**A5 的 CSS 動畫數量（30 個）為 A 系列最多**，主要用於 ATM 硬體模擬效果。

### 6.5 Canvas-Confetti 煙火效果

| 觸發場景 | 粒子數 | 持續時間 | 版本 |
|---------|--------|---------|------|
| 完成挑戰 | 50×n（漸減） | 3 秒 | **v1.9.2**（本地副本 `js/confetti.browser.min.js`） |

**已統一**：2026-02-09 已將全部 18 個單元統一使用本地 canvas-confetti v1.9.2。

---

## 七、注意事項

### 7.1 瀏覽器相容性

| 功能 | Chrome | Safari | Firefox | Edge |
|------|--------|--------|---------|------|
| Web Speech API | 完整支援 | 部分支援 | 部分支援 | 完整支援 |
| Canvas-Confetti | 完整支援 | 完整支援 | 完整支援 | 完整支援 |
| CSS Flex 三欄佈局 | 完整支援 | 完整支援 | 完整支援 | 完整支援 |
| `backdrop-filter` | 完整支援 | 完整支援 | 完整支援 | 完整支援 |
| Dark Mode CSS | 完整支援 | 完整支援 | 完整支援 | 完整支援 |
| Audio autoplay | 需互動 | 需互動 | 需互動 | 需互動 |

- **Safari 語音**：中文語音選擇有限，可能退回系統預設語音
- **Firefox**：`speechSynthesis.getVoices()` 需透過 `onvoiceschanged` 事件取得語音清單

### 7.2 行動裝置注意事項

- iOS Safari 必須在使用者互動後才能播放音效（已由 `audio-unlocker.js` 處理）
- ATM 三欄佈局在小螢幕（≤480px）會垂直堆疊，頁面較長需滾動
- `overscroll-behavior-y: contain` 防止下拉重整（三層防護）
- **不引用 `touch-drag-utility.js`**——ATM 操作以點擊為主，無拖放需求
- ATM 螢幕高度從 520px 降至 350px（手機版），密碼鍵盤可能較擁擠

### 7.3 教學使用注意事項

- **PIN 安全教育**：A5 模擬了真實 ATM 的密碼操作流程，可作為金融安全教育的教材
- **4 種交易類型**覆蓋 ATM 主要功能，教師可依學習者程度逐步增加交易類型
- **建議教學順序**：餘額查詢（5 步）→ 提款（7 步）→ 存款（6 步）→ 轉帳（8+ 步）
- **輔助點擊模式**適合手部控制能力較弱的學習者
- **自訂密碼**功能可讓教師設定學習者需要記憶的密碼

### 7.4 已知限制

- ~~**作業單極簡**：僅 47 行、1 種題型（步驟排序），無金錢計算題~~ **✅ 已完成**（2026-02-16 擴充至 405 行、11 種題型）
- ~~**cache-bust 參數手動更新**：`a5_atm_simulator.js?cachebust=20251217160400` 需手動更新~~ **✅ 已修正**（2026-02-11）
- **版本歷史註解**：檔案頭部包含 v1.0.0 ～ v1.2.60 完整版本記錄（約 1,500 行），佔 JS 檔案約 10%
- **無大型觸控螢幕斷點**：無 1920px+ / 2560px+ 斷點

### 7.5 狀態管理現況

| 項目 | 狀態 |
|------|------|
| 統一重置函數 | ✅ `resetNormalModeState()` |
| 錯誤計數器 | `normalModeErrors`（9 個） |
| 提示已顯示標記 | `normalModeHintsShown`（9 個） |
| 調用位置 | `showSettings()` + `startLearning()` + `resetTransactionState()` |
| TimerManager | ✅ 完整實現（Phase 1-5 完成） |
| EventManager | ✅ 基礎設施就緒（Phase 1） |
| 評價 | ✅ **最佳實踐**（錯誤計數器 + TimerManager） |

**2026-02-16~17 重構**：
1. 已新增統一重置函數 `resetNormalModeState()`，參考 A4/A6 最佳實踐
2. Phase 1-5 完成：204 個 TimerManager.setTimeout 遷移完成

---

## 八、Bug 檢測與已知問題

### 8.1 已確認的程式碼問題

| # | 嚴重度 | 問題描述 | 數據 |
|---|--------|---------|------|
| 1 | ~~高~~ | ~~`console.log` 殘留（**A 系列最多**）~~ | ~~514 個~~ **✅ 已修正**（2026-02-21 Debug Logger FLAGS 系統重構，554 個 console 統一管理，14 個分類） |
| 2 | ~~高~~ | ~~`setTimeout` 未清理~~ | ~~199 個未清理~~ **✅ 已修正**（2026-02-17 Phase 1-5 完成） |
| 3 | **高** | `!important` 過多 | JS 172 個 + CSS 36 個 = **208 個** |
| 4 | **中** | `addEventListener` 未移除 | 56 個 addEventListener vs 11 個 removeEventListener = **45 個未移除** |
| 5 | ~~中~~ | ~~JS @keyframes 重複定義~~ | ~~`fadeInScale` 3 處重複、`depositAnimation` 3 處重複、`bounce` / `fadeIn` JS 與 CSS 重複~~ **✅ 已修正**（2026-02-11 移至 CSS 去重） |
| 6 | ~~中~~ | ~~canvas-confetti 版本不一致~~ | ~~A5 使用 v1.6.0，A3 使用 v1.9.2~~ **✅ 已修正**（2026-02-09 統一為本地 v1.9.2） |
| 7 | **中** | 版本歷史註解佔比過高 | 約 1,500 行版本記錄佔 JS 檔案 ~10% |
| 8 | **低** | Phase-based 狀態管理複雜 | `currentScene` + `currentFlowStep` 雙層追蹤，不使用 SceneConfig/SceneManager |
| 9 | ~~低~~ | ~~cache-bust 參數手動更新~~ | ~~`?cachebust=20251217160400` 日期為 2025-12-17~~ **✅ 已修正**（2026-02-11 更新為 20260211000000） |
| 10 | ~~建議~~ | ~~作業單極簡~~ | ~~47 行、1 種題型，與遊戲內容嚴重不匹配~~ **✅ 已完成**（2026-02-16 擴充至 405 行、11 種題型） |
| 11 | **低** | 設定頁使用 `alert()` 阻塞式對話框（5 處，搜尋 `alert(`） | ⚠️ 暫緩（低優先） |
| 12 | ~~低~~ | ~~`_hintTimeout` 有時以 raw `setTimeout` 設置（line 12612），但以 `TimerManager.clearTimeout()` 取消，導致取消失效（100ms DOM hint timer）~~ + `delayedHintTimer` 也以 raw `setTimeout` 設置但需 TimerManager 管理 | 搜尋 `_hintTimeout = setTimeout`, `delayedHintTimer` | ✅ **已修復** (2026-02-24)：改用 `this.TimerManager.setTimeout(..., 'hintAnimation')`；`clearDelayedHint()` 改用 `TimerManager.clearTimeout` |

### 8.2 A1～A5 Bug 數量比較

| 問題類型 | A1 | A2 | A3 | A4 | **A5** | 最多 |
|---------|-----|-----|-----|-----|--------|------|
| console.log | — | ~~66~~ ✅ | ~~201~~ ✅ | ~~467~~ ✅ | ~~**514**~~ ✅ | **全部已修正** |
| 未清理 setTimeout | — | 42 | 64 | 94 | ~~199~~ **✅ 已修正** | ~~A5~~ |
| 未移除 addEventListener | — | — | 39 | 15 | **45** | **A5** |
| !important 總數 | — | 48 | 76 | 410 | 208 | A4 |
| 動畫重複定義 | 無 | 無 | 1 個 | 1 個 | ~~5+ 個~~ **✅ 已修正** | ~~A5~~ |
| 版本不一致 | — | — | — | ~~confetti v1.6~~ ✅ | ~~confetti v1.6~~ ✅ | ~~已統一 v1.9.2~~ |
| 死碼 | ~200 行 | ~50 行 | ~15 行 | 少量 | **~1,500 行（版本記錄）** | **A5** |

### 8.3 非 Bug 但需注意的設計

| 項目 | 說明 |
|------|------|
| JS 單檔 15,758 行 | **A 系列最大**，含 4 種交易類型 × 3 難度 + 30+ Click Mode 階段 |
| 版本歷史 ~1,500 行 | v1.0.0 ～ v1.2.60 完整記錄，包含詳細的 Bug 修復說明 |
| per-phase 語音 | 不使用模板化語音，每個階段各自撰寫，靈活但冗長 |
| 雙層狀態追蹤 | `currentScene` + `currentFlowStep`，不使用 SceneConfig/SceneManager |
| 9 個錯誤計數器 | 最精細但也最複雜的錯誤追蹤系統 |
| 效能監控 | HTML 中包含 `performance.timing` 載入時間記錄 |

---

## 九、未來開發建議

### 9.1 模組化拆分（最高優先）

**問題：JS 檔案 15,758 行，A 系列之最**

A5 將 4 種交易類型、PIN 系統、帳戶管理、收據系統、30+ Click Mode 階段、9 個錯誤計數器等全部集中在單一檔案中。

**建議的拆分結構**：

```
js/
├── a5/
│   ├── a5-main.js              # 入口、初始化、ATM Singleton（~600 行）
│   ├── a5-config.js            # 交易類型定義、帳戶設定（~300 行）
│   ├── a5-settings.js          # 設定頁面（~500 行）
│   ├── a5-state.js             # 狀態管理、雙層追蹤（~400 行）
│   ├── a5-atm-ui.js            # ATM 硬體 UI 渲染（卡片槽、螢幕、鍵盤）（~1,500 行）
│   ├── a5-pin-system.js        # PIN 密碼系統（~800 行）
│   ├── a5-withdraw.js          # 提款流程（~1,500 行）
│   ├── a5-deposit.js           # 存款流程（~1,500 行）
│   ├── a5-inquiry.js           # 餘額查詢流程（~500 行）
│   ├── a5-transfer.js          # 轉帳流程（~1,500 行）
│   ├── a5-receipt.js           # 收據列印系統（~500 行）
│   ├── a5-click-mode.js        # 輔助點擊模式（~2,000 行）
│   ├── a5-hints.js             # 提示系統、錯誤計數器（~800 行）
│   ├── a5-completion.js        # 完成畫面（~500 行）
│   └── a5-speech.js            # 語音管理（~600 行）
```

### 9.2 setTimeout / addEventListener 管理器

**✅ setTimeout 已完成**（2026-02-17）：204 個 TimerManager.setTimeout 遷移完成。

**待完成**：56 個 addEventListener 僅 11 個 removeEventListener（清理率 19.6%）。

### 9.3 Console.log 清理（514 個）

**問題**：514 個 `console.log`，A 系列最多（A4 的 1.1 倍）。

**建議**：

```javascript
const DEBUG = false;
function debugLog(tag, ...args) {
    if (DEBUG) console.log(`[A5-ATM][${tag}]`, ...args);
}
```

- **保留**：系統初始化完成提示（1~2 個）
- **轉為 debugLog**：交易流程追蹤、Click Mode 階段、錯誤計數
- **刪除**：臨時除錯用途的 log（估計佔 90%+）

### 9.4 !important 削減

**問題**：208 個 `!important`（JS 172 + CSS 36）。

**建議**：
- CSS 的 36 個 `!important` 多在 Dark Mode 區塊（確保覆蓋），可接受但可改用更高特異性選擇器
- JS 的 172 個 `!important` 應改為 CSS class 切換
- 目標：控制在 40 個以內

### 9.5 CSS 動畫統一管理

**✅ 大部分已完成**（2026-02-11）：`fadeInScale`（×3）、`depositAnimation`（×3）、`fadeIn`（×2）、`bounce`（×2）共 10 處 JS 重複定義已移至 CSS 去重。

**剩餘**：`pulse` 仍有 1 處 JS/CSS 重複，`bounceIn`、`hintBounce`、`modalSlideIn`、`celebrate` 僅存在於 JS。

### 9.6 場景管理改進

**問題**：A5 使用 `currentScene` 字串 + `currentFlowStep` 雙層追蹤，不使用 A3/A4 的 SceneConfig/SceneManager 架構。

**建議**：
- 引入 SceneConfig/SceneManager 架構
- 每個交易類型定義為獨立場景
- 利用 `onEnter` / `onExit` 管理資源（語音取消、定時器清理、事件移除）
- 減少散落在各處的狀態管理程式碼

### 9.7 作業單擴充

**✅ 已完成**（2026-02-16）：作業單已從 47 行擴充至 405 行，新增 11 種題型：

- **步驟排序**：提款/存款/餘額查詢/轉帳 4 種交易類型步驟排序
- **存款計算（5 種）**：fill / fill-select / coin-select / hint-select / hint-complete
- **提款計算（5 種）**：fill / fill-select / coin-select / hint-select / hint-complete
- **工具列配置**：帳戶金額 / 圖示類型 / 測驗題型

與 A1～A4 相同的金錢圖示選擇題型架構，使用 100/500/1000 元紙幣圖示。

### 9.8 canvas-confetti 版本統一

**✅ 已完成**（2026-02-09）：已將 canvas-confetti v1.9.2 下載至 `js/confetti.browser.min.js`，全部 18 個單元統一使用本地副本。

### 9.9 CSS Custom Properties 引入

**建議**：

```css
:root {
    --atm-screen-bg: linear-gradient(135deg, #1e3a8a, #1e40af);
    --atm-panel-bg: linear-gradient(135deg, #e3f2fd, #bbdefb);
    --atm-card-slot-bg: linear-gradient(135deg, #2196f3, #1976d2);
    --atm-cash-bg: linear-gradient(135deg, #607d8b, #455a64);
    --atm-receipt-bg: linear-gradient(135deg, #4caf50, #388e3c);
    --atm-screen-height: 520px;
}

@media (max-width: 768px) {
    :root { --atm-screen-height: 420px; }
}

@media (max-width: 480px) {
    :root { --atm-screen-height: 350px; }
}
```

### 9.10 死碼 / 版本歷史清理

**問題**：檔案頭部約 1,500 行版本歷史註解（v1.0.0 ～ v1.2.60），佔 JS 檔案約 10%。

**建議**：
- 將版本歷史移至獨立的 `CHANGELOG.md` 檔案
- JS 檔案頭部僅保留當前版本號和最近 3 個版本的摘要
- 使用 Git 版本控制追蹤歷史變更

### 9.11 未來新單元開發 Checklist（A5 新增項目）

在前述報告 checklist 基礎上新增：

```
□ 39. setTimeout 清理率 > 50%（A5 僅 5.2%，需嚴格改善）
□ 40. addEventListener 清理率 > 50%（A5 僅 19.6%）
□ 41. 版本歷史移至 CHANGELOG.md，JS 頭部 < 50 行
□ 42. 作業單至少 3 種題型、含金錢計算
□ 43. 複雜流程使用 SceneConfig/SceneManager 管理
□ 44. per-phase 語音改為模板化或可配置結構
□ 45. ATM 硬體模擬類單元需測試小螢幕三欄堆疊體驗
```

---

## 十、總結

### A5 ATM 提款機的優勢

1. **最擬真的硬體模擬**：卡片槽、出鈔口、收據列印機、3×4 數字鍵盤——A 系列中唯一包含完整物理硬體視覺元素的單元
2. **PIN 密碼安全教育**：4-12 位自訂密碼、星號遮蔽、錯誤計數——模擬真實 ATM 安全操作
3. **最豐富的動畫**：CSS 30 個 + JS 9 個 = ~39 個動畫，A 系列最多，ATM 專屬動畫極為生動
4. **最精細的錯誤追蹤**：9 個獨立錯誤計數器，比任何其他 A 系列單元都精細
5. **最多 Click Mode 階段**：30+ 階段，完整覆蓋所有交易類型的操作步驟
6. **帳戶餘額系統**：預設/自訂餘額 + 交易後即時更新——A 系列唯一
7. **收據列印系統**：列印/不列印分支流程 + 收據顯示區域——A 系列唯一
8. **Dark Mode + Print CSS**：A 系列中唯一支援暗色模式和列印樣式的單元
9. **鍵盤快捷鍵支援**：0-9 數字鍵 + Enter + Escape，模擬實體 ATM 鍵盤
10. **效能監控**：`performance.timing` 載入時間記錄 + 5 秒警告——A 系列唯一

### A5 ATM 提款機的待改進處

1. **JS 單檔最大**（15,758 行）→ 建議拆分為 15 個子模組
2. **514 個 console.log**（A 系列最多）→ 建議清理或改用 DEBUG 模式
3. ~~**199 個未清理 setTimeout**~~ **✅ 已修正**（2026-02-17 Phase 1-5 完成）
4. **45 個未移除 addEventListener**（A 系列最多）→ 建議使用 EventManager
5. ~~**JS @keyframes 重複定義**（5+ 個）→ 建議集中至 CSS 檔案~~ **✅ 已修正**（2026-02-11）
6. **不使用 SceneConfig/SceneManager** → 建議引入統一場景管理
7. ~~**作業單極簡**（47 行、1 種題型）→ 建議擴充至 3+ 種題型~~ **✅ 已完成**（2026-02-16 擴充至 405 行、11 種題型）
8. **版本歷史佔比過高**（~1,500 行）→ 建議移至 CHANGELOG.md
9. **per-phase 語音非模板化** → 建議改為可配置結構
10. ~~**canvas-confetti 版本不一致** → 建議統一 v1.9.2~~ **✅ 已完成**（2026-02-09）

### A1～A5 五單元架構比較表

| 面向 | A1 販賣機 | A2 理髮廳 | A3 麥當勞 | A4 超市購物 | **A5 ATM** | 最佳 |
|------|----------|----------|----------|------------|-----------|------|
| 程式碼總量 | 7,290 行 | 12,090 行 | 12,074 行 | 19,415 行 | **20,955 行** | A1（最精簡） |
| JS 單檔大小 | 6,080 行 | 8,163 行 | 9,691 行 | 14,682 行 | **15,758 行** | A1（最精簡） |
| CSS 行數 | 821 行 | 3,136 行 | 1,721 行 | 3,528 行 | **4,344 行** | A1（最精簡） |
| 品項/服務數 | 19 飲料 | 6 服務 | 70 餐點 | 119 商品 | 4 交易類型 | A4（最豐富） |
| 圖片資源 | 19 張 | 10 張 / 2.4MB | 83 張 / 46.3MB | 119 張 PNG（emoji fallback） | **2 張 / 1.1 MB** | A3（最多圖片） |
| 設定驅動 | 部分 | 完全 | 完全 | 完全 | 完全 | A2/A3/A4/A5 |
| 場景管理 | 無 | 無 | 7 場景 | 8 場景 | **雙層追蹤（33+ 階段）** | A3/A4（結構化） |
| 語音系統 | 直接撰寫 | 模板驅動 | 模板 + 雙語速 | 模板 + 難度遞進 | **per-phase + callback** | A2/A3/A4（模板化） |
| 語音速率 | 預設 | 0.9~0.95x | 1.2x / 0.9x | 預設 | **1.0x（明確設定）** | — |
| RWD 斷點數 | 3 | 4 | 8 | 3+3 | **4+4** | A3（覆蓋最廣） |
| 最大螢幕支援 | 1024px+ | 1200px+ | 2560px+ | 768px+ | 1200px+ | A3 |
| 動畫數量 | 16 | 8 | ~24 | ~28 | **~39** | **A5（最多）** |
| 觸控拖放 | 不支援 | 不支援 | 支援 | 支援 | **不支援** | A3/A4 |
| 鍵盤快捷鍵 | 無 | 1-6, Enter, Esc | 1-4, Enter, Esc | 無 | **0-9, Enter, Esc** | A2/A5 |
| 無障礙 | 基本 | ARIA+Loading | ARIA+Loading | 最完整 | **完整（+aria-live+效能監控）** | A4/A5 |
| Dark Mode CSS | 無 | 無 | 無 | 無 | **有** | **A5（唯一）** |
| Print CSS | 無 | 無 | 無 | 無 | **有** | **A5（唯一）** |
| 找零機制 | 逐枚取回 | 不找零 | 三選一 | 三選一/拖放/計算器 | **不適用** | A4（最多元） |
| 密碼系統 | 無 | 無 | 無 | 無 | **有（4-12 位）** | **A5（唯一）** |
| 帳戶餘額 | 無 | 無 | 無 | 無 | **有（即時更新）** | **A5（唯一）** |
| 收據系統 | 無 | 取號單 | 餐盤 | 無 | **收據列印分支** | **A5（最完整）** |
| 硬體模擬 | 販賣機面板 | 自助機面板 | 點餐機面板 | 無 | **ATM 三欄硬體** | **A5（最擬真）** |
| 效能監控 | 無 | 無 | 無 | 無 | **有** | **A5（唯一）** |
| 防抖層數 | 6 | 4 | 4 | 7 | 6 | A4（最嚴密） |
| Click Mode 階段 | ~10 | ~8 | ~15 | ~6 | **30+** | **A5（最多）** |
| 錯誤計數器 | 4 步 | 2 步 | 3 步 | 3 步 | **9 步** | **A5（最精細）** |
| 自訂內容 | 魔法商品 | 無 | 無 | 魔法商店 | **自訂密碼/餘額/帳號** | A1/A4/A5 |
| console.log | — | 66 | 201 | 467 | **514** | A2（最少） |
| !important | — | 48 | 76 | 410 | 208 | A2（最少） |
| 未清理 setTimeout | — | 42 | 64 | 94 | ~~199~~ **✅ 已修正** | A2（最少） |
| 未移除 addEventListener | — | — | 39 | 15 | **45** | A4（最少） |
| 作業單行數 | 358 | 341 | 410 | 615 | **405** | A4（最豐富） |
| 作業單題型數 | 10 | 10 | 10 | 10 | **11** | **A5（最多）** |

### 對後續單元開發的影響

A5 在 A 系列中帶來了幾項重要的設計貢獻與警示：

1. **硬體模擬標竿**：ATM 三欄佈局 + 卡片槽 / 出鈔口 / 收據列印機的視覺設計，為模擬實體機台操作的最佳範例。A6 火車票售票機可參考此架構。

2. **密碼/安全教育範本**：PIN 密碼系統是金融安全教育的優秀模板，可延伸至其他需要安全驗證的單元。

3. **Dark Mode + Print CSS 先驅**：A5 是唯一支援暗色模式和列印樣式的單元，建議作為所有單元的擴展標準。

4. **Click Mode 複雜度警示**：30+ 階段的輔助點擊模式雖然功能強大，但 81 處 actionQueue 引用使維護極為困難。建議後續單元採用更結構化的 Click Mode 架構。

5. **技術債累積最嚴重**：514 個 console.log、~~199 個未清理 setTimeout~~ ✅ 已修正、45 個未移除 addEventListener。後續開發必須從一開始就嚴格控制，並引入 TimerManager / EventManager 等資源管理工具。

6. ~~**作業單與遊戲落差最大**：遊戲 15,758 行 vs 作業單 47 行的極端落差，說明作業單開發未能跟上遊戲功能的擴展。後續單元應同步開發遊戲與作業單。~~ **✅ 已解決**（2026-02-16 作業單擴充至 405 行、11 種題型）

---

## 十一、修正記錄

| 日期 | 修正項目 | 修改檔案 |
|------|---------|---------|
| 2026-02-09 | canvas-confetti 統一為本地 v1.9.2（Bug #6） | `html/a5_atm_simulator.html` |
| 2026-02-11 | JS @keyframes 重複定義移至 CSS 去重（Bug #5）：移除 10 處 JS 定義（`fadeInScale`×3、`depositAnimation`×3、`fadeIn`×2、`bounce`×2），新增 `fadeInScale`、`depositAnimation`、`bounceWelcome`、`bounceCompletion` 至 CSS | `css/a5_atm_simulator.css`、`js/a5_atm_simulator.js` |
| 2026-02-11 | cachebust 參數更新為 20260211000000（Bug #9） | `html/a5_atm_simulator.html` |
| 2026-02-11 | 更新報告：修正 A4 數據（130→119 商品、Emoji→119 張 PNG）、confetti 版本資訊、Bug 修正狀態 | `A5_Unit_Completion_Report.md` |
| 2026-02-16 | 作業單擴充（Bug #10）：47 行 → 405 行，1 種 → 11 種題型（steps + 5 deposit + 5 withdraw），新增工具列配置 | `worksheet/units/a5-worksheet.js` |
| 2026-02-16 | 更新報告：反映作業單擴充後的數據（行數、題型數、比較表） | `A5_Unit_Completion_Report.md` |
| 2026-02-16 | 狀態管理重構：新增 `resetNormalModeState()` + `normalModeHintsShown` 結構（參考 A4/A6 最佳實踐） | `js/a5_atm_simulator.js` |
| 2026-02-16 | 記憶體管理 Phase 1：新增 TimerManager/EventManager 基礎設施（版本 v1.2.60） | `js/a5_atm_simulator.js` |
| 2026-02-17 | 記憶體管理 Phase 2-5：204 個 TimerManager.setTimeout 遷移完成（版本 v1.2.63） | `js/a5_atm_simulator.js` |

---

## 十二、重構記錄

### 2026-02-16：狀態管理重構（resetNormalModeState）

**問題分析**：

| 問題 | 說明 |
|------|------|
| 無統一重置函數 | 只有 `resetTransactionState()` 處理交易狀態，缺少 `resetNormalModeState()` |
| 錯誤計數器命名 | 使用 `normalModeErrors` 而非 `stepErrorCounts`（保留現有命名以維持兼容性） |
| 無 normalModeHintsShown | 缺少提示已顯示的布林對象 |
| 重置邏輯分散 | `normalModeErrors` 在 `startLearning()` 和 `resetTransactionState()` 中重複定義 |

**修改內容**：

#### 1. 新增 `normalModeHintsShown` 結構

**位置**：`state.gameState` 初始化處（`normalModeErrors` 後方）

```javascript
normalModeHintsShown: {
    pinHintShown: false,
    pinCancelHintShown: false,
    bankCodeHintShown: false,
    accountNumberHintShown: false,
    transferAmountHintShown: false,
    mainMenuHintShown: false,
    withdrawAmountHintShown: false,
    depositCancelHintShown: false,
    depositConfirmHintShown: false
}
```

#### 2. 新增 `resetNormalModeState()` 函數

**位置**：`resetTransactionState()` 後方

```javascript
resetNormalModeState() {
    // 重置錯誤計數器
    this.state.gameState.normalModeErrors = {
        pinErrorCount: 0,
        pinCancelErrorCount: 0,
        bankCodeErrorCount: 0,
        accountNumberErrorCount: 0,
        transferAmountErrorCount: 0,
        mainMenuErrorCount: 0,
        withdrawAmountErrorCount: 0,
        depositCancelErrorCount: 0,
        depositConfirmErrorCount: 0
    };

    // 重置提示已顯示標記
    this.state.gameState.normalModeHintsShown = {
        pinHintShown: false,
        pinCancelHintShown: false,
        bankCodeHintShown: false,
        accountNumberHintShown: false,
        transferAmountHintShown: false,
        mainMenuHintShown: false,
        withdrawAmountHintShown: false,
        depositCancelHintShown: false,
        depositConfirmHintShown: false
    };

    console.log('🔄 [A5-ATM] 普通模式錯誤計數已重置');
}
```

#### 3. 調用位置更新

| 位置 | 函數 | 修改內容 |
|------|------|---------|
| `showSettings()` | 開頭 | 無條件調用 `resetNormalModeState()` |
| `startLearning()` | 狀態重置區塊 | 普通/困難模式時調用 `resetNormalModeState()` |
| `resetTransactionState()` | 普通模式重置區塊 | 改為調用 `resetNormalModeState()` |

---

### 2026-02-16~17：記憶體管理重構（TimerManager/EventManager Phase 1-5）

**背景**：

A5 存在潛在的記憶體洩漏問題：
- 210 個 `setTimeout`，僅 11 個 `clearTimeout`（清理率 5.2%）
- 56 個 `addEventListener`，僅 11 個 `removeEventListener`

**Phase 進度總覽**：

| Phase | 內容 | 風險 | 狀態 |
|-------|------|------|------|
| Phase 1 | 添加 TimerManager/EventManager 基礎設施 | 零 | ✅ 完成 |
| Phase 2a | 遷移卡片動畫 setTimeout | 極低 | ✅ 完成（10 個） |
| Phase 2b | 遷移現金/收據動畫 setTimeout | 低 | ✅ 完成（9 個） |
| Phase 2c | 遷移彈窗動畫 setTimeout | 低 | ✅ 完成（7 個） |
| Phase 2d | 遷移提示動畫 setTimeout | 低 | ✅ 完成（25 個） |
| Phase 3 | 遷移延遲邏輯類 setTimeout | 中 | ✅ 完成（94 個） |
| Phase 4 | 遷移 addEventListener | 中 | 待執行 |
| Phase 5 | 添加 clearAll() 調用點 | 低 | ✅ 完成（3 個調用點） |

**遷移統計**：
- **TimerManager.setTimeout**：204 個
- **TimerManager.clearTimeout**：9 個
- **clearAll() 調用點**：3 個（`init()`、`showSettings()`、`startLearning()`）

**已遷移的類別總覽**：

| 類別 | 數量 | 說明 |
|------|------|------|
| `cardAnimation` | 10 個 | 卡片插入/退出動畫 |
| `cashAnimation` | 5 個 | 現金出鈔動畫 |
| `receiptAnimation` | 4 個 | 收據列印動畫 |
| `modalAnimation` | 7 個 | 彈窗動畫 |
| `hintAnimation` | 36 個 | 提示顯示延遲 |
| `visualDelay` | 2 個 | 視覺延遲 |
| `speechDelay` | 7 個 | 語音延遲 |
| `speechInit` | 1 個 | 語音初始化 |
| `screenTransition` | 20 個 | 畫面切換延遲 |
| `clickMode` | 46 個 | 輔助點擊模式延遲 |
| `uiAnimation` | 10 個 | UI 元素動畫 |

**版本更新**：v1.2.59 → v1.2.63

**搜尋關鍵字**：

| 用途 | 關鍵字 |
|------|--------|
| 定位 TimerManager | `TimerManager:` |
| 定位 EventManager | `EventManager:` |
| 定位 Phase 標記 | `[Phase 1]`、`[Phase 2a]`、`[Phase 2b]`、`[Phase 2c]`、`[Phase 2d]`、`[Phase 3]`、`[Phase 5]` |
| 定位 clearAll 調用 | `TimerManager.clearAll()` |

---

## 驗證記錄

### 2026-02-19：系統性驗證

**驗證內容**：

| 項目 | 狀態 | 說明 |
|------|------|------|
| resetNormalModeState | ✅ 已實現 | 統一重置函數（2026-02-16 新增） |
| normalModeHintsShown | ✅ 已新增 | 9 個提示已顯示標記 |
| TimerManager | ✅ 完成 | Phase 1-5 全部完成（204 個 setTimeout） |
| EventManager | ✅ Phase 1 | 基礎設施就緒，待遷移現有 addEventListener |
| injectGlobalAnimationStyles | ✅ v1.4.0 完成 | 5 個 JS 內嵌 @keyframes 遷移至統一函數（2026-02-22） |
| 完成畫面 | ✅ 正常 | 採用 A 系列統一完成畫面樣式 |
| confetti 煙火 | ✅ 正常 | 使用 v1.9.2 本地化版本 |
| 作業單系統 | ✅ 完成 | 405 行、11 種題型（2026-02-16 擴充） |

**結論**：A5 狀態管理與記憶體管理已達最佳實踐標準。尚未引入 addEventListener 遷移（Phase 4）。

---

### 2026-02-21：Debug Logger FLAGS 分類開關系統

**重構內容**：

| 項目 | 修改前 | 修改後 |
|------|--------|--------|
| console.log | ~400 個 | 47 個（3 內部 + 44 `.catch()/styled`） |
| console.warn | ~13 個 | 5 個（1 內部 + 4 styled） |
| console.error | ~69 個 | 1 個（內部） + 28 `.catch()` |
| Debug 系統 | 無 | FLAGS 分類開關（14 分類） |
| 版本號 | v1.2.60 | v1.3.0 |

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
        product: false,  // 商品/服務選擇
        flow: false,     // 遊戲流程
        assist: false,   // 輔助模式
        hint: false,     // 提示系統
        timer: false,    // 計時器
        event: false,    // 事件監聽
        error: true      // 錯誤（預設開啟）
    },
    log(category, ...args) { ... },
    warn(category, ...args) { ... },
    error(...args) { ... }
}
```

**轉換統計**：

| 分類 | 轉換數量 | 主要用途 |
|------|---------|---------|
| flow | ~150 | 場景管理、交易流程、步驟切換 |
| hint | ~130 | 密碼提示、金額提示、錯誤計數 |
| assist | ~80 | ClickMode、輔助點擊處理 |
| speech | ~50 | ATM 語音、金額語音 |
| coin | ~40 | 存款/提款、鈔票動畫 |
| ui | ~35 | UI 渲染、螢幕顯示 |
| timer | ~20 | TimerManager 清理 |
| event | ~15 | EventManager 清理 |
| audio | ~15 | 音效播放、解鎖 |
| init | ~10 | 初始化、版本號 |
| error | ~9 | ATM 錯誤、找不到元素 |
| **總計** | **554** | — |

**保留的 console 調用**（47 個）：

| 類型 | 數量 | 說明 |
|------|------|------|
| 內部 Debug | 3 | log/warn/error 實現 |
| audio `.catch()` | 6 | 音效播放錯誤處理 |
| errorAudio `.catch()` | 28 | 錯誤音效播放處理 |
| styled %c | 10 | 版面偵測（帶 CSS 樣式） |

**使用方式**：

```javascript
// 方法內使用
ATM.Debug.log('flow', '場景切換:', sceneName);
ATM.Debug.warn('hint', '提示顯示失敗');
ATM.Debug.error('ATM 錯誤:', error);
```

**啟用除錯**：

```javascript
// 啟用全部日誌
ATM.Debug.FLAGS.all = true;

// 只啟用特定分類
ATM.Debug.FLAGS.flow = true;
ATM.Debug.FLAGS.hint = true;
```

**結論**：A5 Debug Logger 重構完成，554 個 console 調用轉換為 14 分類的 FLAGS 開關系統。

---

### 2026-02-22：動畫定義整合（v1.4.0）

**問題描述**：

A5 模組的動畫定義分散於兩個位置：
- **CSS 檔案** (`css/a5_atm_simulator.css`): 35 個 @keyframes（合適位置）
- **JS 內嵌** (`js/a5_atm_simulator.js`): 5 個 @keyframes（需要整合）

此外還有命名衝突：
- JS 中的 `pulse` 與 CSS 中的 `pulse` 定義不同，會導致行為不一致

**修正內容**：

| Phase | 修改內容 | 說明 |
|-------|---------|------|
| Phase 1 | 新增 `injectGlobalAnimationStyles()` 函數 | 在 Debug 對象後新增統一動畫注入機制 |
| Phase 2 | 遷移 5 個 JS 內嵌 @keyframes | 從原位置移除並統一到注入函數 |
| Phase 3 | 重命名 `pulse` 為 `clickPromptPulse` | 避免與 CSS 中的 `pulse` 衝突 |

**遷移的動畫清單**：

| 動畫名稱 | 原行號 | 用途 | 備註 |
|---------|--------|------|------|
| `bounceIn` | 2945 | 數字輸入按鈕彈入動畫 | — |
| `hintBounce` | 7361 | 金錢圖示提示彈跳 | — |
| `modalSlideIn` | 11667 | 彈窗滑入動畫 | — |
| `celebrate` | 13233 | 完成畫面慶祝動畫 | — |
| `pulse` → `clickPromptPulse` | 14432 | 點擊提示脈衝動畫 | 重命名避免衝突 |

**調用位置**：

```javascript
init() {
    this.TimerManager.clearAll();
    this.injectGlobalAnimationStyles();  // 🎬 注入全局動畫樣式
    // ...
}
```

**搜尋關鍵字**：
- `injectGlobalAnimationStyles` - 動畫注入函數
- `a5-global-animations` - 注入的 style 元素 ID
- `clickPromptPulse` - 重命名後的點擊提示動畫

**結論**：A5 動畫定義整合完成，5 個 JS 內嵌 @keyframes 遷移至統一函數，消除與 CSS 的命名衝突。

---

### 2026-02-24（第二輪）：新發現 Bug 修復

**問題 — 作業單連結傳遞 count 參數（高）**：

- 作業單連結傳遞 `count: 2` 參數（原意為「每頁2題」）
- 違反專案規範：作業單應使用自己的 `defaultCount`，遊戲不應傳遞 count 參數
- **修復**：移除 `count: 2` 參數，作業單將使用自己的預設題數

---

*報告完成時間：2026-02-09 17:45*
### 2026-02-24：作業單連結統一簡化（僅傳 unit 參數）

**修改內容**：

- 作業單連結原本傳遞遊戲設定參數（`questionType`）
- 各作業單已有完整工具列，用戶開啟後可直接在工具列調整；遊戲設定與作業單設定應獨立運作
- **修復**：移除所有多餘參數，統一改為只傳 `unit` 參數，讓作業單完全使用自己的預設値

**修改檔案**：`js/a5_atm_simulator.js`

---

### 2026-02-26：11-19 元語音唸法稽核確認（無修改）

**稽核結果**：A5 的金額語音透過 `convertAmountToSpeech(amount)` → `NumberSpeechUtils.convertToTraditionalCurrency(amount)` 路由，完全使用共用模組。共用模組 `number-speech-utils.js` 已於 2026-02-26 補入 11-19 的 specialCases（`'十一元'`~`'十九元'`），A5 自動受益，無需額外修改。

---

---

### 2026-02-27：showSettings() EventManager 事件累積修復

**問題描述**：

`showSettings()` 每次呼叫時：1) 未呼叫 `EventManager.removeByCategory('settings')`；2) `settingsRewardLink` 和 `worksheetLink` 使用裸 `addEventListener`，每次返回設定頁面即累積重複監聽器。

**修復方式**：

- `showSettings()` 開頭加入 `this.EventManager.removeByCategory('settings')`
- 兩個連結改為 `EventManager.on(..., 'settings')` 統一管理

**修改檔案**：`js/a5_atm_simulator.js`

---

### 2026-02-27：confetti setInterval → 遞迴 TimerManager 模式

**問題**：完成畫面煙火效果使用裸 `setInterval`，包在 `this.TimerManager.setTimeout` 回呼中但 setInterval 本身不受 TimerManager 管理，場景切換時 `TimerManager.clearAll()` 無法中途停止動畫計時器。

**修復**：將 `setInterval` 改為遞迴 `this.TimerManager.setTimeout(fireConfetti, 250, 'confetti')`，確保 `clearAll()` 或 `clearByCategory('confetti')` 可立即停止動畫。

**修改檔案**：`js/a5_atm_simulator.js`

---

## 2026-02-27（新增）：輔助點擊模式 *Processing 階段需按兩次才能觸發明細表選擇修復

**問題**：輔助點擊模式下（提款/存款/查詢/轉帳），當 ATM 顯示「是否列印明細表」畫面並出現提示動畫後，使用者需要按 2 次才能選擇，體驗不符合直覺。

**根本原因**：`transitionPhase` 進入 `*Processing` 階段（如 `withdrawProcessing`）後，ATM 交易動畫會自動播放完成並切換到 TAKE_CASH 畫面（含 `.print-btn` 提示），但此時 click mode 仍在 `*Processing` 階段等待使用者點擊才能啟動 `waitProcessing`：
1. 使用者看到「列印明細表」提示 → 點擊（第 1 次）→ click mode 執行 `waitProcessing`（此時 ATM 已處理完，立即自動完成）→ 轉換到 `*Receipt` 階段
2. 使用者再點擊（第 2 次）→ `selectReceiptOption` 執行 → 實際點擊按鈕

**對比 A3**：A3 每個動作都需要使用者點擊，且提示在前一個動作完成後才顯示，不存在「動畫先到、queue 未到」的競態。

**修復**：在 `transitionPhase` 中，對所有 `nextPhase.endsWith('Processing')` 的階段（`withdrawProcessing` / `depositProcessing` / `inquiryProcessing` / `transferProcessing`），直接 300ms 後自動呼叫 `executeNextAction()`，不再等待使用者點擊。`waitProcessing` 本身就是純程式輪詢，無需使用者觸發。修復後，使用者在「列印明細表」畫面只需點擊 **1 次** 即可完成選擇。

**修改檔案**：`js/a5_atm_simulator.js`（`transitionPhase` 函數，在 `buildActionQueue(nextPhase)` 後加入 `endsWith('Processing')` 自動執行分支）

---

## 2026-02-27（新增）：每步成功煙火+音效（簡單模式 & 輔助點擊模式）

**需求**：同 A3，在簡單模式和輔助點擊模式下，每一步驟成功時出現煙火動畫（音效沿用各步驟已有的 playBeep/playSuccess）。

**設計**：新增 `playStepSuccess()` helper 方法（40顆彩色粒子、中心上方 origin `{x:0.5, y:0.25}`、`startVelocity: 30, ticks: 60`），置於自動化操作函數區塊頂部。

**注入點**：

| 函數 | 模式 | 注入位置 |
|------|------|---------|
| `validatePin()` | 簡單模式 | PIN 正確分支 `updateFlowStep` 後，加 `!clickMode` guard |
| `selectMenuOption()` | 簡單模式 | `clearATMEasyHint()` 後，加 `!clickMode` guard |
| `takeCash()` | 簡單模式 | `audio.playSuccess()` 後，加 `!clickMode` guard |
| `bindTransactionSuccessEvents()` | 簡單模式 | 明細表選項正確後 `clearATMEasyHint()` 後，加 `!clickMode` guard |
| `bindContinueTransactionQuestionEvents()` | 簡單模式 | 同上，加 `!clickMode` guard |
| `takeReceipt()` | 簡單模式 | `audio.playSuccess()` 後，加 `!clickMode` guard |
| `autoClickCard()` | 輔助點擊 | `playBeep()` 後 |
| `autoPressKey('enter')` | 輔助點擊 | enter 鍵分支 `clearATMEasyHint()` 後 |
| `autoSelectOperation()` | 輔助點擊 | `playBeep()` 後 |
| `autoSelectAmount()` | 輔助點擊 | 提款/轉帳模式 `playBeep()` 後 |
| `autoTakeCash()` | 輔助點擊 | 一般流程 `playBeep()` 後 |
| `autoSelectReceiptOption()` | 輔助點擊 | 找到按鈕 `playBeep()` 後 |
| `autoTakeReceipt()` | 輔助點擊 | 找到按鈕 `playBeep()` 後 |
| `autoTakeCard()` | 輔助點擊 | `playBeep()` 後 |
| `autoClickTakeCardButton()` | 輔助點擊 | 找到按鈕 `playBeep()` 後 |

**修改檔案**：`js/a5_atm_simulator.js`（新增 `playStepSuccess()`，15 處注入）

---

## 2026-02-27（新增）：每步成功音效修正 — 防止 correct02.mp3 重複播放

**問題**：`playStepSuccess()` 加入 `new Audio('../audio/correct02.mp3').play()` 後，`takeCash()` 和 `takeReceipt()` 原本已透過 `audio.playSuccess()` 播放 `correct02.mp3`，導致重複播放兩次。

**修復**：`playStepSuccess(skipSound = false)` 加入 `skipSound` 參數；已播放 `playSuccess()` 的步驟傳入 `true`：

| 步驟 | 原有音效 | 修改 |
|------|---------|------|
| `takeCash()`（簡單模式） | `audio.playSuccess()`（correct02） | `playStepSuccess(true)` |
| `takeReceipt()`（簡單模式） | `audio.playSuccess()`（correct02） | `playStepSuccess(true)` |
| 其餘輔助點擊 auto* 步驟 | `playBeep()`（click.mp3） | 保留 `playStepSuccess()`，補上 correct02.mp3 ✓ |

**修改檔案**：`js/a5_atm_simulator.js`（`playStepSuccess` 加 `skipSound` 參數，2 處改為 `(true)`）

---

*報告更新時間：2026-02-27*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

### 2026-02-28：輔助點擊遮罩全程常駐 + 層級修正

**舊設計問題**：遮罩在 `executeNextAction()` 中 `isExecuting=true` 時動態建立（z-index:90），並在 `enableClickModeWithVisualDelay()`、`transitionPhase()` 各 waitingForClick 轉換點等 30 處移除。z-index:90 遠低於遊戲 modals（最高 10003），遮罩期間仍可點擊彈窗。

**新設計**：
- 遮罩在 `bindClickModeHandler()` 建立，`z-index: 10100`（高於所有 ATM modals，最高 10003）
- 只在 `showFinalResults()` 時移除（ATM 無獨立 unbindClickModeHandler）
- 移除 30 處 waitingForClick 時的 `?.remove()` 呼叫（包含舊的 `executeNextAction()` 建立行）

**Z-index 層級**：ATM modals（最高 10003）→ 遮罩（10100）→ 標題列（10200）

**修改檔案**：`js/a5_atm_simulator.js`（移除 30 處 + 新增建立於 `bindClickModeHandler()`）、`css/a5_atm_simulator.css`（`.atm-title-bar` z-index: 100 → 10200）

---

### 2026-02-28
- `showFinalResults()` ä¸­ `completionTime = Date.now() - startTime` æ¹çº `startTime ? (Date.now() - startTime) : 0`ï¼é²æ­¢ startTime æªè¨­å®æé¡¯ç¤º NaN æé
- è¼å©é»æè¼ªè©¢ 6 è `setInterval` å¨æ¹çºéè¿´ `this.TimerManager.setTimeout(poll, delay, 'clickMode')`ï¼autoTakeCash / autoCompleteCash / autoTakeReceipt / autoSelectReceiptOption / autoClickTakeCardButton / autoConfirmDepositï¼activeInterval guard æ¹çºå¸æå¼

---

*報告更新時間：2026-03-01*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

### 2026-03-01：每步煙火動畫 zIndex 修復（遮罩遮擋）

**問題**：簡單模式與輔助點擊模式各步驟觸發 `playStepSuccess()` 時，canvas-confetti 繪製的煙火粒子被輔助點擊透明遮罩（`z-index: 10100`）遮擋，無法完整顯示。

**根本原因**：`playStepSuccess()` 呼叫 `confetti({ ... })` 時未指定 `zIndex`，canvas-confetti 預設將 canvas 插入 `z-index: 0`，低於遮罩層級。

**修復**：在 `playStepSuccess()` 的 `confetti()` 呼叫中加入 `zIndex: 10200`（高於 overlay:10100，與標題列同級），確保煙火顯示在遮罩上方。

**修改檔案**：`js/a5_atm_simulator.js`（`playStepSuccess`）

---

## 廢棄程式碼稽核（2026-03-01）

**稽核範圍**：`js/a5_atm_simulator.js`（16,119 行）

### 結論：發現 1 個高嚴重性問題 + 8 處裸 console.log

| 類型 | 位置 | 內容 | 嚴重性 | 建議 |
|------|------|------|--------|------|
| ~~**⚠️ Click 監聽器永不移除（記憶體洩漏）**~~ ✅ **已修復（2026-03-02）** | `bindClickModeHandler` / `showFinalResults` | 新增 `this._clickModeHandler` 具名參考 + `unbindClickModeHandler()` 方法；`showFinalResults()` 結束時呼叫解除 | **高** → 已修復 |
| **裸 console.log（非 Debug 系統）** | Lines 3835–3873 | 約 8 處高度偵測 / 版面 debug 輸出，使用框線字元格式化（`╔═╗╠╣╚═╝`）；明顯為開發期版面偵錯程式碼 | 中 | 整合至 Debug 系統或移除 |
| console.error（音效 catch handler） | Lines 1946, 1953, 1960, 1967, 1984, 1997 | 6 處 `.play().catch()` 中的 `console.log('播放[音效]失敗:', error)` | 低 | 音效錯誤輸出，可保留或整合 |
| console.error（音效 catch handler） | 約 31 處 | 各音效 `.play().catch()` 的 `console.error()` | 低 | 刻意的錯誤記錄，可保留 |
| 廢棄功能注解 | Lines 934, 6197, 6286, 8374, 10819, 12844 | 6 處「已移除」說明注解（已移除插入卡片按鈕等） | 低 | 可保留作歷史記錄 |
| console.log | Lines 1734–1746 | Debug 系統定義內部呼叫 | — | 已受 FLAGS 守衛，無需處理 |

### ✅ Click 監聽器修復詳情（2026-03-02）

**修復前**：`bindClickModeHandler()` 使用匿名箭頭函數，無法 `removeEventListener`；`_clickModeHandlerBound` guard 雖防止累積多個 handler，但 handler 永遠無法被移除。

**修復內容**（`js/a5_atm_simulator.js`）：

1. `bindClickModeHandler()`：改用具名參考
```javascript
this._clickModeHandler = (e) => this.handleClickModeClick(e);
document.addEventListener('click', this._clickModeHandler, true);
```

2. 新增 `unbindClickModeHandler()` 方法（位於 `bindClickModeHandler` 下方）：
```javascript
unbindClickModeHandler() {
    if (this._clickModeHandlerBound && this._clickModeHandler) {
        document.removeEventListener('click', this._clickModeHandler, true);
        this._clickModeHandler = null;
        this._clickModeHandlerBound = false;
    }
},
```

3. `showFinalResults()`：在 overlay 移除後呼叫解除：
```javascript
document.getElementById('click-exec-overlay')?.remove();
this.unbindClickModeHandler();  // ← 新增
```

**修復後路徑**：
- 同一局多輪（`proceedToNext` → `startNextRound`）：`_clickModeHandlerBound=true` → `else-if` 重置 state，handler 持續作用
- 局完成後（`showFinalResults` → unbind → 再玩一次或返回設定）：`_clickModeHandlerBound=false` → 下一局 `initClickModeForATM()` 重新綁定

### 裸 console.log 詳情（Lines 3835–3873）

這些 console.log 使用 ASCII 框線字元輸出版面高度偵測資訊，例如：
```
╔══════════════════════════════════════════╗
║          ATM 高度偵測報告                   ║
╠══════════════════════════════════════════╣
```
這是開發期版面偵錯工具，應整合至 `ATM.Debug.log()` 或在確認不需要後移除，以避免在正式環境出現非 Debug-controlled 輸出。

**整體評估**：Click 監聽器洩漏為高優先度問題；裸 console.log 為中優先度；音效錯誤的 console.error 為可接受的錯誤記錄。

---

## 十、第五輪修復（2026-03-02）

### 10.1 隨機任務類型功能新增

**需求**：設定頁「任務類型」增加「隨機」選項，選後每輪從 4 種類型（提款/存款/餘額查詢/轉帳）中隨機抽取，且每種出現過後不重複，直到 4 種均已出現後才重新隨機。

**新增狀態欄位**（`state.quiz`）：
```javascript
randomBag: [],          // 隨機模式：當前循環剩餘類型池
currentRandomType: null // 隨機模式：本輪實際任務類型
```

**新增輔助函數**：
```javascript
getActualSessionType()   // random 時返回 currentRandomType，否則返回 sessionType
pickNextRandomType()     // Fisher-Yates shuffle；bag 空了才重填（確保4種輪完才重複）
```

**設定頁**：`showSettings()` HTML 新增「隨機」按鈕（最左側）。

**流程整合**：
- `startLearning()`：隨機模式初始化 bag 並抽取第一輪類型
- `startNextRound()`：每輪結束後呼叫 `pickNextRandomType()` 抽下一輪
- 10 處原本讀取 `settings.sessionType` 的遊戲邏輯改為呼叫 `getActualSessionType()`：
  `showMissionScreen`, `startATMSession`, `updateScreen(menu case)`, `resetTransactionState`,
  `initClickModeForATM`, `startFirstScenario`, `selectMenuOption`, `showTaskReminderModal`,
  `getLearningOutcomesByType`, `getSessionTypeName`

---

### 10.2 selectMenuOption 隨機模式 undefined 錯誤修復

**問題**：`selectMenuOption()` 驗證選單項目時讀取 `this.state.settings.sessionType`（= `'random'`），`taskMapping['random']` 為 `undefined`，導致：
- 所有選單選項均被視為錯誤
- 語音說「請選擇undefined」
- 提示動畫指向 `.side-label[data-action="undefined"]`（不存在元素）

**修復**：`selectMenuOption()` 中的比對邏輯改用 `this.getActualSessionType()` 取得實際交易類型再比對 `taskMapping`。

---

### 10.3 showTaskReminderModal 隨機模式錯誤類型修復

**問題**：`showTaskReminderModal()` 中 `taskNames[settings.sessionType]`（= `taskNames['random']`）為 `undefined`，透過 `|| '提款'` fallback，導致任務提示彈窗永遠顯示「提款」，而 ATM 螢幕實際提示的是其他操作（如「餘額查詢」）。

**修復**：讀取任務名稱時改用 `this.getActualSessionType()` 取正確類型。

---

### 10.4 隨機模式存款彈窗路由修復（與 10.2/10.3 同根因）

**問題**：`showBillSelectionModal()` 中兩個路由條件均檢查 `this.state.settings.sessionType === 'deposit'`，但在隨機模式下 `sessionType === 'random'`，導致兩個條件均不符合，跌落至無指定金額限制的通用備用彈窗。

**症狀**：
- 隨機模式存款任務：顯示通用鈔票選擇彈窗，使用者可任意選擇金額，最終存款金額與任務指定金額不符
- 語音說「實際存款金額XXX元」但金額與任務指定不同
- 彈窗樣式為舊版通用樣式，與指定存款任務的彈窗樣式不一致

**修復**（`showBillSelectionModal()`，2 處）：
```javascript
// 修復前：
this.state.settings.sessionType === 'deposit'

// 修復後：
this.getActualSessionType() === 'deposit'
```

**修復後行為**：
- 簡單隨機存款 → `showEasyModeDepositModal()`（預填指定張數的1000元鈔票，點擊逐一存入）
- 普通/困難隨機存款 → `showNormalModeDepositModal()`（顯示多餘鈔票，需選擇正確金額，錯誤3次後提示）
- 自由模式（無指定金額）→ 維持通用備用彈窗（不受影響）

---

**根本原因總結（10.2 / 10.3 / 10.4 共同根因）**：新增「隨機」模式後，多處遊戲邏輯直接讀取 `settings.sessionType`（= `'random'`）而非透過 `getActualSessionType()` 取得本輪真實類型，形成「隨機類型被當作第5種任務類型直接比對、但 mapping 中不存在此 key」的系列 Bug。修復原則：所有遊戲邏輯取任務類型一律用 `getActualSessionType()`；僅設定 UI 顯示（active 按鈕、`isSettingsComplete()` 判斷）保留直讀 `settings.sessionType`。

---

### 10.5 隨機模式提款金額選擇路由修復（同根因）

**問題**：`startWithdrawProcess()` 與 `bindAmountOptionEvents()` 的提款分支均直接比對 `settings.sessionType === 'withdraw'`，隨機模式下條件不成立，導致：
- `startWithdrawProcess()`：跳過「金額提示彈窗」和指定金額設定，直接進入自由選擇模式
- `bindAmountOptionEvents()`：跳過金額驗證，使用者選任意金額均被接受
- `generateAmountEntryScreen()`：`sessionType` 取自 `settings` 而非 `getActualSessionType()`，導致「提款」文字消失（顯示空字串）

**修復**（3 處）：

| 函數 | 修改 |
|------|------|
| `startWithdrawProcess()` | `settings.sessionType === 'withdraw'` → `getActualSessionType() === 'withdraw'` |
| `bindAmountOptionEvents()` | `settings.sessionType === 'withdraw'` → `getActualSessionType() === 'withdraw'` |
| `generateAmountEntryScreen()` | `const { sessionType } = this.state.settings` → `const sessionType = this.getActualSessionType()` |

**修復後行為**：隨機模式實際為提款時，完整走提款指定金額流程：金額提示彈窗 → 金額選擇畫面顯示「請選擇提款金額」→ 點選錯誤金額時錯誤計數 + 提示 → 正確金額才允許繼續。

---

### 10.6 提款金額彈窗與任務畫面不一致修復

**問題**：`startWithdrawProcess()` 內部重新隨機生成提款金額並覆寫 `easyModeHints.assignedAmount`，導致「金額提示彈窗」與「任務畫面」顯示金額不同：

| 設定位置 | 金額來源 | 範圍 |
|---------|---------|------|
| `showMissionScreen()` | 第一次設定 `easyModeHints.assignedAmount` | `[1000, 3000, 5000, 10000, 20000]`（5種） |
| `startWithdrawProcess()`（舊） | 重新隨機、覆蓋 `easyModeHints.assignedAmount` | `[1000, 3000, 5000, 10000, 20000, 40000, 60000]`（7種） |

由於兩次各自獨立隨機，任務畫面可能顯示「請提領 3000 元」，但金額彈窗卻顯示「NT$ 10000」。

**修復**：移除 `startWithdrawProcess()` 中的隨機金額生成邏輯，改為直接讀取 `showMissionScreen()` 已設定的 `easyModeHints.assignedAmount`：

```javascript
// 修復前：重新隨機並覆蓋
const amounts = [1000, 3000, 5000, 10000, 20000, 40000, 60000];
const randomAmount = validAmounts[Math.floor(Math.random() * validAmounts.length)];
this.state.gameState.easyModeHints.assignedAmount = randomAmount;  // ← 覆蓋！
this.showAmountReminderModal(randomAmount, ...);

// 修復後：直接使用已設定的金額
const assignedAmount = this.state.gameState.easyModeHints.assignedAmount;
this.showAmountReminderModal(assignedAmount, ...);
```

**影響範圍**：簡單/普通/困難模式，指定提款任務及隨機任務均受益（任務畫面、金額提示彈窗、金額選擇畫面高亮三者現在一致）。

### 10.7 存款畫面現金出口提示在錯誤操作後消失修復

**問題**：簡單模式下，存款流程顯示「請存入現鈔」步驟時，現金出口（`.cash-dispenser-area`）會出現黃色脈衝提示動畫。若使用者尚未點擊現金出口，卻先按了主螢幕的「取消」或「確認」按鈕，提示動畫會消失且不再恢復。

**根本原因**（雙重問題）：

| 按鈕 | 問題 |
|------|------|
| 確認（confirm） | 在 bill check 之前就呼叫 `clearATMEasyHint()`（無條件清除），即使尚未存入鈔票也被清除 |
| 取消（cancel） | 未主動清除提示，但缺少錯誤後重新顯示的邏輯，使提示在某些情境下消失後不再恢復 |

**修復**：

1. **確認按鈕**：將 `clearATMEasyHint()` 從 bill check 前移至 bill check 後（有鈔票的成功路徑才清除）；在無鈔票錯誤路徑加入 `speech.speak()` callback，語音播報完成後為簡單模式重新顯示現金出口提示：
   ```javascript
   // 修復前：在 bill check 前無條件清除
   if (this.shouldShowHint()) {
       this.clearATMEasyHint();  // ← 此時可能尚未存入鈔票！
   }
   // 後續 bill check 失敗 → 提示消失

   // 修復後：僅在 bill check 通過後才清除
   // bill check 失敗時：
   this.speech.speak('請先點擊現金出口放入鈔票', {
       callback: () => {
           if (this.state.settings.difficulty === 'easy') {
               this.TimerManager.setTimeout(() => {
                   this.showATMEasyHint('deposit_cash', '.cash-dispenser-area');
               }, 300, 'hintAnimation');
           }
       }
   });
   // bill check 通過時：
   if (this.shouldShowHint()) {
       this.clearATMEasyHint();  // ← 正確位置
   }
   ```

2. **取消按鈕**：在無鈔票錯誤路徑同樣加入 `speech.speak()` callback，語音後為簡單模式重新顯示現金出口提示（與確認按鈕修復模式相同）。

3. **競態條件守衛**：`speech.speak()` callback 中 300ms 計時器觸發時，加入 `!document.getElementById('bill-selection-modal')` 守衛——若使用者在語音播放期間點擊了現金出口（彈窗已開啟），計時器觸發後不再重新顯示提示：
   ```javascript
   this.TimerManager.setTimeout(() => {
       // 僅在彈窗尚未開啟時才恢復提示（避免使用者已點擊現金出口後提示重新出現）
       if (!document.getElementById('bill-selection-modal')) {
           this.showATMEasyHint('deposit_cash', '.cash-dispenser-area');
       }
   }, 300, 'hintAnimation');
   ```

**效果**：
- 未點擊現金出口時誤按取消/確認 → 提示持續顯示（語音後恢復）✅
- 點擊現金出口後彈窗開啟 → 提示立即消失且不再重現 ✅
- 語音播放中途點擊現金出口 → 語音結束後計時器觸發但偵測到彈窗已存在，跳過恢復 ✅

### 10.8 轉帳任務銀行代碼/帳號/金額提示彈窗統一至所有模式

**問題**：轉帳流程的三個輸入步驟（銀行代碼、轉入帳號、轉帳金額），提示彈窗只在普通模式出現；簡單模式僅播放語音後顯示按鈕高亮提示，困難模式僅播放語音，皆無彈窗。

另外，`startTransferProcess()` 中 `sessionType === 'transfer'` 檢查未使用 `getActualSessionType()`，導致隨機任務（`sessionType = 'random'`）在簡單模式下不顯示金額提醒彈窗。

**修復（4 處）**：

| 函數 | 修改前 | 修改後 |
|------|--------|--------|
| `startTransferProcess()` | `sessionType === 'transfer'` | `getActualSessionType() === 'transfer'`（修復隨機任務路由） |
| `showBankCodeInputScreen()` | `if (difficulty === 'normal') { showBankCodeHintModal() }` | 所有模式均顯示彈窗；簡單模式額外 1.5s 後顯示按鈕高亮 |
| `showAccountInputScreen()` | `if (difficulty === 'normal') { showAccountHintModal() }` | 同上，對帳號輸入畫面 |
| `showTransferAmountInputScreen()` | `if (difficulty === 'normal' && !skipAutoHint) { showTransferAmountHintModal() }` | 所有模式均顯示彈窗（仍尊重 `skipAutoHint`）；簡單模式額外高亮 |

**簡單模式視覺提示時機**：彈窗 500ms 後出現；視覺高亮 1.5s 後出現（確保彈窗已可見，使用者讀完後關閉彈窗時高亮已就緒）。

**影響範圍**：簡單/困難模式的指定轉帳任務及隨機任務（實際為轉帳時）。

---

*報告更新時間：2026-03-02（第六輪修復完整版）*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

## 跨輪計時器洩漏稽核（2026-03-03）

**稽核背景**：A3 單元曾發現 `speakText()` 10 秒備援計時器在下一輪觸發導致跳輪的 Bug，已對全系列交叉稽核。

**A5 稽核結論：安全（無此問題）**

| 條件 | 狀態 | 說明 |
|------|------|------|
| ① 新輪次從語音 callback 觸發 | 不成立 ✅ | 不適用 |
| ② interrupted 不呼叫 safeCallback | 不成立 ✅ | 不適用（條件③已保護） |
| ③ 新輪次函數無 clearAll() | **不成立 ✅** | `startLearning()` 內有 `TimerManager.clearAll()`，新輪次開始時所有舊計時器被清除 |

**結論**：條件③不成立，備援計時器在新輪次開始時即被清除，bug 不可能發生。

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

## showFinalResults() 守衛機制說明（2026-03-06）

### 背景

2026-03-06 全專案 Bug 稽核中，發現 A5 `showFinalResults()` 未使用與其他單元相同的顯式 `isEndingGame` / `_completionScreenShown` flag，記錄於此以說明架構設計。

### 呼叫路徑分析

`showFinalResults()` 有**唯一一條呼叫路徑**：

```
completeTransaction(experienceGained)
  └─ TimerManager.setTimeout(() => proceedToNext(), 3000, 'screenTransition')
       └─ proceedToNext()
            ├─ state.quiz.currentQuestion++
            ├─ if (currentQuestion < questionCount) → startNextRound()   // 繼續下一題
            └─ else → showFinalResults()                                  // 所有題目完成
```

### 為何不需顯式守衛

| 保護機制 | 說明 |
|---------|------|
| **計數器邏輯保護** | `currentQuestion` 每題遞增一次，只有 `currentQuestion >= questionCount` 時才進入 else 分支，不可能重複觸發 |
| **單一呼叫點** | 整個 JS 檔案中，`showFinalResults()` 僅在 `proceedToNext()` 的 else 分支被呼叫（line 12106），無其他呼叫點 |
| **3 秒延遲保護** | `completeTransaction()` 透過 `TimerManager.setTimeout(..., 3000, 'screenTransition')` 延遲呼叫，TimerManager 確保不重複執行 |
| **輔助點擊清理** | `showFinalResults()` 開頭執行 `unbindClickModeHandler()` + overlay 移除，確保輔助點擊模式不會在結果畫面觸發重複動作 |

### 與其他單元的守衛機制比較

| 單元 | 守衛機制 | 原因 |
|------|---------|------|
| A2、A3、A4、A6 | `_completionScreenShown` / `_completionSummaryShown` flag | 多個可能觸發完成的路徑，需顯式防重複 |
| C1~C6、F1~F4、F6 | `isEndingGame` flag | `endGame()` 可能被計時器、語音 callback 等多處觸發 |
| F5 | `gameState === 'finished'` 狀態機守衛 | 同上 |
| **A5** | **架構性保護**（單一呼叫點 + 計數器邏輯）| 無多呼叫點風險，不需顯式 flag |

### 結論

A5 `showFinalResults()` 的架構性保護在功能上等同顯式守衛 flag，**不構成執行期 Bug**，為刻意設計。

如未來有以下情況，才需加入 `_finalResultsShown` flag：
- 新增其他呼叫點（如錯誤回復路徑直接跳至結果畫面）
- 輔助點擊模式的特殊流程可能繞過 `proceedToNext()` 直接呼叫結果畫面

---

## 錯誤邊界誤觸發防護（2026-03-07）

**症狀**：頁面載入時，音訊資源若無法找到，`window.error` 事件的 `event.error === null`（資源載入失敗，非 JS 執行錯誤），原先的 error handler 未過濾，直接顯示錯誤邊界並隱藏 ATM 畫面。

與 A3、A4、A6 相同問題。A2 因使用 `if (event.error && event.error.message && ...)` 條件判斷已受保護，A1 無全域 error handler，不受影響。

**修復**（`html/a5_atm_simulator.html`）：
```javascript
window.addEventListener('error', function(event) {
    if (!event.error) return; // event.error=null 為資源載入失敗，忽略
    console.error('ATM系統錯誤:', event.error);
    document.getElementById('error-boundary').style.display = 'flex';
    document.getElementById('loading-screen').style.display = 'none';
});
```

搜尋關鍵字：`a5_atm_simulator.html` → `if (!event.error) return`

---

## 提示按鈕新增吉祥物（2026-03-10）

**問題**：ATM 遊戲畫面的提示按鈕（`#hint-request-btn`，普通/困難模式顯示）沒有吉祥物圖示，與其他單元風格不一致。

**修復**（`js/a5_atm_simulator.js`）：

1. **HTML 模板**：將原本獨立的 `<button class="hint-request-btn">` 包進新增的 `<div id="hint-btn-wrapper">` 中，wrapper 繼承 `grid-column:3; justify-self:end`（原屬 button 的 grid 定位），並設 `display:flex; align-items:center; gap:6px`；吉祥物 `<img>` 置於 wrapper 內、button 左側。wrapper 初始 `display:none`。

2. **`showHintButton()`**：改為對 `#hint-btn-wrapper` 設 `display = 'flex'`（fallback：若 wrapper 不存在則操作 button）。

3. **`hideHintButton()`**：改為對 `#hint-btn-wrapper` 設 `display = 'none'`。

**關鍵搜尋詞**：`hint-btn-wrapper`（`js/a5_atm_simulator.js`）

---

## 2026-03-25：輔助點擊模式六項修復

本輪共修復六個輔助點擊模式問題，分兩輪除錯完成。

---

### 25.1 簡單/輔助模式彈窗無法點擊（z-index 衝突）

**症狀**：簡單模式或輔助點擊模式中，任務提示彈窗（task-reminder-modal / amount-reminder-modal / transfer-amount-reminder-modal）出現後，點擊彈窗內按鈕無反應。

**根本原因**：`click-exec-overlay`（z-index: 10100）覆蓋於彈窗上方，`event.target` 為遮罩而非彈窗按鈕，click mode 攔截後不知道應點擊哪個元素。

**修復**：三個提示彈窗 z-index 從 10000 改為 10200（高於遮罩層）。

**搜尋關鍵字**：`task-reminder-modal`, `amount-reminder-modal`, `transfer-amount-reminder-modal`

---

### 25.2 轉帳 hint-modal 按鈕未列入點擊隊列

**症狀**：轉帳任務輔助點擊模式下，銀行代碼/帳號/轉帳金額提示彈窗出現後，輔助點擊沒有「關閉彈窗」這一步，導致流程卡住。

**修復**：`transferBank` / `transferAccount` / `transferAmount` 隊列首位加入 `closeModal` 步驟；三個關閉按鈕加入對應 id（`bank-code-hint-close-btn` / `account-hint-close-btn` / `transfer-amount-hint-close-btn`）；`autoCloseModal` 函數新增對應分支（查 `#hint-modal-overlay` → remove → executeNextAction）。

**搜尋關鍵字**：`autoCloseModal`, `bank-code-hint-close-btn`, `account-hint-close-btn`, `transfer-amount-hint-close-btn`

---

### 25.3 takeReceipt 快速點擊後系統凍結

**症狀**：快速連點時，`autoTakeReceipt` 可能被啟動兩次。兩個 poll 實例各自執行，`receiptTaken` 守衛的早退路徑缺少 `isExecuting = false`，導致系統永久凍結。

**修復**：
1. `receiptTaken` 早退路徑加入 `isExecuting = false`（Pattern 4）
2. `autoTakeReceipt` 在找到按鈕時提前設 `receiptTaken = true`（縮短競態視窗，Pattern 3）

**搜尋關鍵字**：`receiptTaken`, `autoTakeReceipt`

---

### 25.4 autoTakeCard 固定延遲導致取卡步驟卡死

**症狀**：輔助點擊模式取卡步驟，因使用固定 2000ms 延遲等待 `#take-card-btn` 出現，在效能差的環境下延遲不足，按鈕尚未出現時已嘗試點擊，導致後續步驟卡死。另外煙火在卡片還在滑出動畫中就提前觸發。

**根本原因**：固定延遲對動畫觸發的 DOM 元素不可靠（Pattern 1）。

**修復**：`autoTakeCard` 改為兩段式輪詢流程：
1. 點擊卡片圖片觸發退卡動畫（不播反饋）
2. 每 200ms 輪詢 `#take-card-btn`，出現後才播煙火並呼叫 `executeNextAction()`

最多輪詢 25 次（5 秒上限），超時降級繼續。

**搜尋關鍵字**：`autoTakeCard`, `take-card-btn`

---

### 25.5 transitionPhase 安全網計時器跨相位解鎖

**症狀**：快速連點時，舊相位的 1500ms 安全網計時器尚在等待，`currentPhase` 已切換到新相位，計時器觸發後誤解鎖新相位的 `waitingForClick`。

**根本原因**：計時器排程時未記錄當前相位，觸發時無法驗證相位是否仍有效（Pattern 2）。

**修復**：`transitionPhase` 安全網計時器排程時快照 `safetyPhase = nextPhase`，觸發時加入 `gs.clickModeState.currentPhase === safetyPhase` 驗證。

**搜尋關鍵字**：`safetyPhase`, `transitionPhase`

---

### 25.6 receiptTaken 跨輪狀態污染（Pattern 6）

**症狀**：完成「餘額查詢」等任務後，切換到「轉帳」任務，`takeReceipt` 步驟直接被跳過（日誌顯示「明細表已經取走過，跳過重複執行」），隨後系統凍結無法繼續。

**根本原因**：
1. `unbindClickModeHandler()` 將 `_clickModeHandlerBound = false`，使下一輪走「第一輪初始化」路徑
2. `initClickModeForATM()` 的 `if (!gs.clickModeState)` 守衛因物件已存在而跳過重建
3. 上輪 `autoTakeReceipt()` 設置的 `receiptTaken: true` 殘留，下輪直接誤判「已取走」

這是 **Pattern 6（跨輪狀態污染）** 的典型案例：`if (!obj)` 守衛只保護物件建立，不保護欄位重置。

**修復**：`initClickModeForATM()` 的 `if (!gs.clickModeState)` 守衛之後，無條件加入：

```javascript
// 每輪重置明細表取走標記（防止上輪殘留污染）
gs.clickModeState.receiptTaken = false;
```

**適用範圍**：一行修復覆蓋所有 4 種操作類型（提款/存款/餘額查詢/轉帳）。

**未來新增的「已完成」旗標**（如 `cardTaken`、`cashTaken`）同樣需要加入此無條件重置清單。

**搜尋關鍵字**：`initClickModeForATM`, `receiptTaken = false`

**關聯文件**：`report/ClickMode_Animation_DOM_Patterns.md`（Pattern 6 完整說明）

---

### 25.7 三個流程提示彈窗在輔助點擊模式下應低於遮罩

**症狀**：簡單模式 + 輔助點擊模式下，`showTaskReminderModal`、`showAmountReminderModal`、`showTransferAmountReminderModal` 三個彈窗 z-index 為 10200（高於透明遮罩 10100），使用者可直接點擊「我知道了」按鈕，繞過 ClickMode 系統，導致 `autoCloseModal` 邏輯與 `confirmBtn.onclick` 雙重執行（已有 v1.2.39 的重複執行守衛緩解，但根本問題仍存在）。

**根本原因**：25.1 的修復為了解決「彈窗按鈕無法點擊」，將 z-index 從 10000 提升至 10200。然而正確做法應是讓彈窗位於遮罩**下方**，由 ClickMode 統一攔截並透過 `autoCloseModal` 關閉，而非讓使用者直接操作按鈕。

**修復**：三個彈窗的 z-index 改為條件式：
- `clickMode = true`（輔助點擊模式）→ `z-index: 10050`（低於遮罩 10100）
- `clickMode = false`（一般模式）→ `z-index: 10200`（維持原邏輯）

```javascript
z-index: ${this.state.settings.clickMode ? 10050 : 10200};
```

影響三個函數：`showTaskReminderModal`、`showAmountReminderModal`、`showTransferAmountReminderModal`。

**全專案掃描結果**：B/C/F 系列無此問題；A1~A4、A6 無在輔助點擊流程中出現的高 z-index 彈窗。A1 `_showRefundModal`（z-index: 10200）只在自選模式退幣時觸發，無 ClickMode 隊列對應，不需更改。

**搜尋關鍵字**：`clickMode ? 10050 : 10200`

---

### 25.8 標題列步驟計數：轉帳任務顯示「7/5」或「8/5」

**症狀**：轉帳任務進行到「確認轉帳資訊」或「最終確認」畫面時，標題列顯示「步驟 7 / 5」、「步驟 8 / 5」，分子超過分母，視覺錯誤。

**根本原因**：`updateTitleBar(step, stepTitle)` 中分母寫死為 `5`。轉帳流程共 8 個步驟（步驟 4~8：輸入銀行代碼、輸入轉入帳號、輸入轉帳金額、確認轉帳資訊、最終確認），而提款/存款/查詢最多只到步驟 5。

```javascript
// 修復前
progressInfoElement.textContent = `步驟 ${step} / 5`;

// 修復後
const totalSteps = this.getActualSessionType() === 'transfer' ? 8 : 5;
progressInfoElement.textContent = `步驟 ${step} / ${totalSteps}`;
```

隨機模式也正確處理：`getActualSessionType()` 回傳 `currentRandomType`，抽到轉帳時自動使用 8。

**搜尋關鍵字**：`updateTitleBar`, `totalSteps`, `getActualSessionType`

---

*報告更新時間：2026-03-25*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

## 修復記錄速查（從 CLAUDE.md 遷移，2026-04-29）

| 項目 | 搜尋關鍵字 |
|------|------------|
| A5 6x setInterval→遞迴 | `autoTakeCash`, `activeInterval` |
| A5 煙火 zIndex | `zIndex: 10200` |
| A5 click監聽洩漏 | `_clickModeHandler`, `unbindClickModeHandler` |
| A5 隨機任務 | `getActualSessionType()`, `randomBag` |
| A5 selectMenuOption undefined | `selectMenuOption`, `getActualSessionType()` |
| A5 showTaskReminderModal 錯誤類型 | `getActualSessionType()` |
| A5 存款彈窗路由 | `showBillSelectionModal`, `getActualSessionType()` |
| A5 提款金額路由 | `startWithdrawProcess`, `getActualSessionType()` |
| A5 提款金額不一致 | `easyModeHints.assignedAmount` |
| A5 存款提示消失 | `clearATMEasyHint`, `showATMEasyHint` |
| A5 轉帳提示彈窗 | `showBankCodeInputScreen`, `getActualSessionType()` |
| A5 普通模式自動提示關閉（2026-03-20）| `DIFFICULTY_CONFIG.normal.autoShowHint: false`；`showATMEasyHint` 計時器條件加 `config.autoShowHint` 守衛 |
