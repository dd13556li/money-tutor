# A6 模擬火車購票單元 — 完成經驗報告書

> **建立日期**：2026-02-09（日）20:30
> **更新日期**：2026-03-16（錢包組成多樣化 + 找零驗證正確/錯誤反饋一致性）
> **專案名稱**：Money Tutor 金錢教學系統
> **單元編號**：A6 — 模擬火車購票
> **報告類型**：單元完成經驗與開發建議

---

## 一、檔案規模總覽

| 檔案 | 路徑 | 行數 | 大小 |
|------|------|------|------|
| JS 核心邏輯 | `js/a6_train_ticket.js` | 10,570 行 | 517 KB |
| CSS 樣式 | `css/a6_train_ticket.css` | 1,821 行 | 42 KB |
| HTML 頁面 | `html/a6_train_ticket.html` | 535 行（+126 行 inline CSS） | 16 KB |
| 作業單產生器 | `worksheet/units/a6-worksheet.js` | 348 行 | — |
| **合計** | — | **13,274 行** | — |

### 素材資源

| 類型 | 數量 | 路徑 | 說明 |
|------|------|------|------|
| 售票員圖片 | 1 張 PNG（167 KB） | `images/a6/train_clerk.png` | NPC 售票員角色圖 |
| QR Code 圖片 | 1 張 PNG（34 KB） | `images/a6/qr_codes.png` | 車票模擬 QR Code |
| 錢幣圖片 | 18 張 PNG（9 面額×正反面） | `images/money/*_yuan_front/back.png` | 共用 |
| 音效檔案 | 1 種（success.mp3） | `audio/success.mp3` | 共用 |

### A1～A6 規模比較

| 項目 | A1 販賣機 | A2 理髮廳 | A3 麥當勞 | A4 超市購物 | A5 ATM | **A6 火車票** | A6 vs A5 | A6 vs A1 |
|------|----------|----------|----------|------------|--------|-------------|----------|----------|
| JS 行數 | 6,080 | 8,163 | 9,691 | 14,682 | 15,758 | **10,570** | -33% | +74% |
| HTML 行數 | 31 | 450 | 252 | 288（+302） | 448（+327） | **535（+126）** | +15% | +2,032% |
| CSS 行數 | 821 | 3,136 | 1,721 | 3,528 | 4,344 | **1,821** | -58% | +122% |
| 合計行數 | 7,290 | 12,090 | 12,074 | 19,415 | 20,597 | **13,274** | -36% | +82% |
| 品項/服務數 | 19 飲料 | 6 服務 | 70 餐點 | 130 商品 | 4 交易類型 | **32 車站×4 車種** | — | — |
| 專用圖片 | 19 張 | 10 張 | 83 張 | 0（Emoji） | 2 張 | **2 張** | 相同 | — |
| 作業單行數 | 358 | 341 | 410 | 615 | 47 | **348** | +640% | -3% |

**A6 的 JS 行數（10,570 行）在 A 系列中排名第四**，低於 A5（15,758）和 A4（14,682），但仍為萬行級單檔。合計 13,274 行在 A 系列中排名第四。

---

## 二、單元特色

### 2.1 NPC 對話式購票流程（A6 獨有）

A6 是 A 系列中**唯一使用 NPC 對話系統**的單元。透過 `DialogueManager` 管理售票員對話流程：

| 步驟 | 對話階段 | 操作 |
|------|---------|------|
| 1 | `welcome` | 售票員問候 |
| 2 | `askStart` | 「請選擇出發站」 |
| 3 | `askEnd` | 「請選擇到達站」 |
| 4 | `askType` | 「請選擇車種」 |
| 5 | `askCount` | 「請選擇張數」 |
| 6 | `confirm` | 確認訂單（自動計算票價） |
| 7 | `paying` | 進入付款場景 |
| 8 | `change` | 找零驗證 |

售票員圖片（`train_clerk.png`）配合 `npcSpeak` CSS 動畫產生說話效果。

### 2.2 32 個真實車站 + 4 區域分類

A6 包含台灣鐵路 **32 個真實車站**，按 4 個區域分類：

| 區域 | 代表站 | 說明 |
|------|--------|------|
| 北部 | 臺北、板橋、桃園、新竹... | 北部車站群 |
| 中部 | 臺中、彰化、嘉義... | 中部車站群 |
| 南部 | 臺南、高雄、屏東... | 南部車站群 |
| 東部 | 花蓮、臺東、宜蘭... | 東部車站群 |

32 個車站的品項數為交通類單元之最，與 A3 的 70 種餐點、A4 的 130 種商品屬於不同維度的豐富度。

### 2.3 4 種車種

| 車種 | 票價等級 | 說明 |
|------|---------|------|
| 區間車 | 最低（莒光號 × 0.6） | 各站皆停 |
| 莒光號 | 基準 | 半直達 |
| 自強號 | 最高 | 直達快車 |
| 普悠瑪 | 同自強號 | 傾斜式列車 |

### 2.4 真實票價矩陣（2 個 32×32，A 系列最大數據結構）

A6 包含 **2 個 32×32 票價矩陣**（自強號 + 莒光號），基於真實 OCR 票價數據：

- **自強號矩陣**：`fareMatrixTzeChiang`，32×32 = 1,024 個票價
- **莒光號矩陣**：`fareMatrixChuKuang`，32×32 = 1,024 個票價
- **區間車**：莒光號 × 0.6（四捨五入）
- **普悠瑪**：同自強號票價

**合計 2,048 個票價數據點**，為 A 系列中最大的靜態數據結構。

### 2.5 三種難度模式

| 面向 | 簡單模式 | 普通模式 | 困難模式 |
|------|---------|---------|---------|
| 視覺提示 | 每步自動高亮 + 語音 | 無自動提示 | 無自動提示 |
| 錯誤提示 | 不適用 | 錯誤 3 次後提示 | 無提示 |
| 付款方式 | 自動計算 + 顯示 | 手動選擇（提示後高亮） | 手動選擇（無提示） |
| 找零驗證 | 三選一 | 拖放金錢 | 計算器輸入 |
| Click Mode | 可啟用 | 不可啟用 | 不可啟用 |
| 任務類型 | 僅預設 | 預設 / 自由 | 預設 / 自由 |
| 站點選擇 | 自動高亮正確站 | 手動選擇 | 手動選擇 |

### 2.6 自訂車站系統（A6 獨有）

A6 是 A 系列中繼 A1 魔法商品、A4 魔法商店後，第三個支援自訂內容的單元：

| 項目 | 說明 |
|------|------|
| 最大數量 | 6 個自訂車站 |
| 區域選擇 | 北部 / 中部 / 南部 / 東部 |
| 代理站機制 | 北→臺北、中→臺中、南→高雄、東→花蓮 |
| 儲存方式 | localStorage（`a6_customStations`） |
| 任務整合 | 自動加入預設任務中 |
| 顯示方式 | 車站名稱前加 ★ 標記 |

**代理站機制**：自訂車站使用代理站的票價進行計算，確保票價合理。例如自訂「板橋新站」設為北部，則使用臺北站的票價矩陣。

### 2.7 輔助點擊模式（9 個 phases，88 處引用）

A6 的 Click Mode 覆蓋 **9 個操作階段**：

| Phase | 操作 | 說明 |
|-------|------|------|
| `welcome` | 場景初始化 | 自動進入 |
| `askStart` | 選擇出發站 | 自動選取正確區域 + 車站 |
| `askEnd` | 選擇到達站 | 自動選取正確區域 + 車站 |
| `askType` | 選擇車種 | 自動選取指定車種卡片 |
| `askCount` | 選擇張數 | 自動設定正確數量 |
| `confirm` | 確認訂單 | 自動點擊確認 |
| `payment` | 付款 | 自動計算最佳付款組合 |
| `change` | 找零驗證 | 自動選取正確找零 |
| `ticketResult` | 取票 | 自動完成 |

- **啟用條件**：僅限簡單模式 + 預設任務
- **防快速連點**：`isProcessing` + `clickReadyTime` 600ms
- **Action Queue**：佇列管理，88 處引用

### 2.8 擬真車票生成（A6 獨有）

A6 在確認購票後會生成擬真車票，包含：

| 欄位 | 內容 | 說明 |
|------|------|------|
| 出發站 / 到達站 | 所選車站 | 含自訂車站顯示名稱 |
| 車種 | 區間車/莒光號/自強號/普悠瑪 | — |
| 車次 | 隨機生成 | 模擬真實車次號碼 |
| 出發日期 | 隨機生成 | — |
| 出發時間 | 隨機生成 | — |
| 座位 | 隨機生成（車廂 + 座位號） | — |
| QR Code | `qr_codes.png` | 模擬車票 QR Code |
| 票價 | 自動計算 | 單價 × 張數 |

車票顯示使用 `ticketAppear` CSS 動畫。

### 2.9 付款與找零系統（繼承 A4 架構）

A6 的付款與找零系統繼承自 A4，引用 `touch-drag-utility.js`：

| 功能 | 簡單模式 | 普通模式 | 困難模式 |
|------|---------|---------|---------|
| 付款方式 | 自動計算最佳組合 | 拖放金錢至付款區 | 拖放金錢至付款區 |
| 找零驗證 | 三選一（選擇正確找零） | 拖放金錢至錢包 | 計算器輸入找零金額 |
| 錢包自動調整 | 確保錢包金額 > 票價 | 確保錢包金額 > 票價 | 確保錢包金額 > 票價 |

### 2.10 普通模式錯誤 3 次提示（6 個計數器）

A6 擁有 6 個獨立錯誤計數器：

```
stepErrorCounts: {
    askStart: 0,          // 出發站選擇錯誤
    askEnd: 0,            // 到達站選擇錯誤
    askType: 0,           // 車種選擇錯誤
    askCount: 0           // 張數選擇錯誤
},
paymentErrorCount: 0,     // 付款錯誤
changeErrorCount: 0       // 找零錯誤
```

各計數器在每輪新題目時透過 `resetNormalModeState()` 重置。

### 2.11 Loading + Error Boundary + NoScript + Skip Link

| 功能 | 實現方式 |
|------|---------|
| Loading 畫面 | 旋轉動畫 + 「載入中...」+ 1 秒後自動隱藏 |
| Error Boundary | 全域 `window.addEventListener('error', ...)` + 「系統發生錯誤」彈窗 + 重新載入按鈕 + `role="alert"` |
| NoScript | JavaScript 停用時顯示友善提示 |
| **Skip Link** | `<a>` 跳過導航連結（`aria-label="跳過導航，直接到主要內容"`）— **A 系列首次出現** |
| 效能監控 | `performance.timing` 載入時間記錄 + 超過 5 秒警告 |

**Skip Link 是 A6 的無障礙新功能**，A1～A5 均無此功能。

### 2.12 SceneConfig / SceneManager 場景管理（6 個場景）

A6 繼承 A4 的 SceneConfig/SceneManager 架構，定義 6 個場景：

| 場景 | 名稱 | 說明 |
|------|------|------|
| `settings` | 設定頁面 | 難度/任務/錢包/題數/自訂車站 |
| `ticketWindow` | 購票窗口 | NPC 對話 + 車站/車種/張數選擇 |
| `paying` | 付款場景 | 拖放金錢付款 |
| `changeCalculation` | 找零計算 | 困難模式找零計算 |
| `checking` | 找零驗證 | 三選一/拖放/計算器驗證 |
| `ticketResult` | 車票結果 | 擬真車票展示 |

場景透過 `SceneManager` 的 `onEnter` / `onExit` 管理資源，比 A5 的雙層追蹤更結構化。

### 2.13 作業單系統（348 行，10 種題型）

| 項目 | 說明 |
|------|------|
| 行數 | 348 行 |
| 題型數 | 10 種（5 種價格計算 + 5 種找零計算） |
| 路線數 | 15 條預定義路線 |
| 車種 | 2 種（區間車 + 自強號） |
| 張數範圍 | 1-3 張 |
| 預設題數 | 8 題 |
| 工具列 | 2 按鈕（圖示類型 + 測驗題型） |

**作業單題型一覽**：

| # | 類型 | 題型名稱 | 說明 |
|---|------|---------|------|
| 1 | 價格計算 | `price-fill` | 數字填空（計算總票價） |
| 2 | 價格計算 | `price-fill-select` | 填空 + 3 個金錢圖示選項 |
| 3 | 價格計算 | `price-coin-select` | 圖示選擇（勾選正確金錢組合） |
| 4 | 價格計算 | `price-hint-select` | 提示選擇（含金額提示） |
| 5 | 價格計算 | `price-hint-complete` | 提示完成（填寫幣值數量） |
| 6 | 找零計算 | `fill` | 數字填空（計算找零） |
| 7 | 找零計算 | `fill-select` | 填空 + 3 個金錢圖示選項 |
| 8 | 找零計算 | `coin-select` | 圖示選擇（勾選正確找零組合） |
| 9 | 找零計算 | `hint-select` | 提示選擇（含金額提示） |
| 10 | 找零計算 | `hint-complete` | 提示完成（填寫幣值數量） |

### 2.14 設定頁面選項

| 設定項目 | 選項 | 說明 |
|---------|------|------|
| 選擇難度 | 簡單 / 普通 / 困難 | 含難度說明文字 |
| 任務類型 | 預設購票 / 自由購票 | 自由購票時可自選路線 |
| 輔助點擊模式 | 啟用 / 停用 | 僅簡單模式 + 預設任務可啟用 |
| 錢包金額 | 500 / 1000 / 2000 / 自訂 | 預設任務時自動配置 |
| 測驗題數 | 1 / 3 / 5 / 10 / 自訂 | — |
| 自訂車站 | 新增 / 刪除 / 清除全部 | 最多 6 個，含區域選擇 |
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

### 3.2 per-phase 語音結構

A6 採用 **per-phase** 的語音結構（與 A5 相似），每個購票階段各自撰寫語音內容，透過共用 `Speech` 子系統播放：

| 場景 | 語音方式 |
|------|---------|
| 歡迎畫面 | NPC 對話直接撰寫 |
| 出發站選擇 | 依難度各自撰寫 |
| 到達站選擇 | 依難度各自撰寫 |
| 車種選擇 | 依難度各自撰寫 |
| 張數選擇 | 依難度各自撰寫 |
| 確認訂單 | 使用 `convertAmountToSpeech()` 轉換票價 |
| 付款場景 | 使用 `convertAmountToSpeech()` 轉換金額 |
| 找零場景 | 使用 `convertAmountToSpeech()` 轉換找零 |
| 完成畫面 | 直接撰寫 |

### 3.3 金額語音轉換

A6 使用 `this.convertAmountToSpeech(amount)` 函數（共 **8 處**引用），內部呼叫 `NumberSpeechUtils.convertToTraditionalCurrency()`：

| 金額 | 語音輸出 | 說明 |
|------|---------|------|
| 2 元 | 「兩元」 | 2 + 單位用「兩」 |
| 12 元 | 「拾貳元」 | 個位 2 用「貳」 |
| 200 元 | 「兩百元」 | 百位 2 用「兩」 |
| 976 元 | 「玖佰柒拾陸元」 | 自強號臺北→高雄票價 |

### 3.4 語音速率

A6 明確設定語音速率為 **0.9x**（`utterance.rate = 0.9`），為 A 系列中較慢的語速。

各 A 系列語音速率比較：

| 單元 | 速率 | 說明 |
|------|------|------|
| A1 | 標準（瀏覽器預設） | — |
| A2 | 0.9~0.95x | 慢速清晰 |
| A3 | 1.2x / 0.9x | 雙語速（播報/引導） |
| A4 | 瀏覽器預設 | — |
| A5 | 1.0x（明確設定） | — |
| **A6** | **0.9x** | **慢速，適合購票流程的逐步引導** |

### 3.5 語音觸發時機一覽

| 場景 | 語音內容範例 | 觸發時機 |
|------|-------------|---------|
| 歡迎畫面 | 「歡迎來到火車站」 | 進入遊戲 |
| 選擇出發站 | 「請選擇出發的車站」 | 進入 askStart 階段 |
| 選擇到達站 | 「請選擇到達的車站」 | 出發站確認後 |
| 選擇車種 | 「請選擇車種」 | 到達站確認後 |
| 選擇張數 | 「請選擇購買張數」 | 車種確認後 |
| 確認訂單 | 「票價為 X 元」 | 訂單摘要顯示 |
| 付款 | 「請付款 X 元」 | 進入付款場景 |
| 找零 | 「找零 X 元」 | 付款完成 |
| 取票 | 「請取票」 | 找零完成 |
| 完成 | 「購票完成」 | 車票展示 |

### 3.6 語音注意事項

- **行動裝置限制**：iOS/Android 需要使用者互動後才能啟用語音（已由 `audio-unlocker.js` 處理）
- **語速 0.9x 適合初學者**：慢速語音配合 NPC 對話，讓學習者有充分時間理解每個步驟
- **NPC 對話配合**：語音與售票員對話框同步，視覺+聽覺雙重引導

---

## 四、觸控與桌面支援

### 4.1 桌面端支援

A6 **不支援鍵盤快捷鍵**（HTML 中無全域 `keydown` 事件監聽器）。所有操作皆透過滑鼠/觸控點擊完成。

### 4.2 觸控端支援

- **Viewport 設定**：`width=device-width, initial-scale=1.0`
- **防下拉重整**：`overscroll-behavior-y: contain`（html、body、#app 三層防護）
- **觸控拖放**：引用 `touch-drag-utility.js`（付款與找零的金錢拖放）
- **觸控音效解鎖**：引用 `audio-unlocker.js`
- **行動裝置除錯面板**：引用 `mobile-debug-panel.js`
- **主題系統**：引用 `theme-system.js`

### 4.3 ARIA 標籤與無障礙

| 元素 | ARIA 屬性 | 值 |
|------|----------|---|
| Skip Link | `aria-label` | 「跳過導航，直接到主要內容」 |
| Loading 畫面 | `aria-label` | 「遊戲載入中」 |
| `<main>` | `role` + `aria-label` | `main` + 「模擬火車購票遊戲主要內容」 |
| Error Boundary | `role` | `alert` |

**Skip Link 為 A6 新增**，是 A 系列中首個提供跳過導航功能的單元。

### 4.4 A1～A6 觸控支援比較

| 項目 | A1 | A2 | A3 | A4 | A5 | **A6** |
|------|------|------|------|------|------|------|
| 音效解鎖 | 自行實現 | `audio-unlocker.js` | `audio-unlocker.js` | `audio-unlocker.js` | `audio-unlocker.js` | `audio-unlocker.js` |
| 除錯面板 | 不引用 | `mobile-debug-panel.js` | 內嵌 inline | `mobile-debug-panel.js` | `mobile-debug-panel.js` | `mobile-debug-panel.js` |
| 主題系統 | 不引用 | `theme-system.js` | `theme-system.js` | `theme-system.js` | `theme-system.js` | `theme-system.js` |
| 鍵盤快捷鍵 | 無 | 1-6, Enter, Esc | 1-4, Enter, Esc | 無 | 0-9, Enter, Esc | **無** |
| 拖曳工具 | 不引用 | 不引用 | `touch-drag-utility.js` | `touch-drag-utility.js` | 不引用 | **`touch-drag-utility.js`** |
| Loading | 無 | 有 | 有 | 有 | 有 | **有** |
| Error Boundary | 無 | 有 | 有 | 有 | 有 | **有** |
| NoScript | 無 | 無 | 無 | 有 | 有 | **有** |
| Skip Link | 無 | 無 | 無 | 無 | 無 | **有（唯一）** |
| ARIA | 基本 | 完整 | 完整 | 最完整 | 完整（+aria-live） | **完整（+Skip Link）** |
| 效能監控 | 無 | 無 | 無 | 無 | 有 | **有** |
| 防抖層數 | 6 | 4 | 4 | 7 | 6 | **2（isProcessing + clickReadyTime）** |

---

## 五、不同版面（RWD 響應式設計）

### 5.1 CSS 檔案響應式斷點

| 斷點 | 數量 | 用途 |
|------|------|------|
| `max-width: 768px` | 3 個 | 平板版佈局（NPC 區域 flex-direction: column、站點 2 欄、彈窗寬度 90%） |
| `max-width: 480px` | 1 個 | 手機版佈局（Tab 間距 10px、摘要卡片 15px margin、按鈕垂直排列） |

### 5.2 Dark Mode

A6 使用 **`[data-theme="dark"]` 屬性選擇器**（約 25+ 個選擇器），而非 `@media (prefers-color-scheme: dark)` 媒體查詢。

- 引用 `css/dark-theme.css` + `css/ai-theme.css`
- 透過 `theme-system.js` 管理主題切換

**注意**：這與 A5 的 `@media (prefers-color-scheme: dark)` 方式不同。A6 的暗色模式由使用者手動觸發，不會自動跟隨系統設定。

### 5.3 缺少的媒體查詢

| 媒體查詢 | 狀態 |
|---------|------|
| `prefers-color-scheme: dark` | ❌ 不使用（改用 `[data-theme]` 屬性） |
| `prefers-reduced-motion: reduce` | ❌ 未實現 |
| `prefers-contrast: high` | ❌ 未實現 |
| `@media print` | ❌ 未實現 |

### 5.4 A1～A6 RWD 比較

| 項目 | A1 | A2 | A3 | A4 | A5 | **A6** |
|------|------|------|------|------|------|------|
| RWD 斷點數 | 3 | 4 | 8 | 3+3 無障礙 | 4+4 無障礙 | **4（無額外無障礙）** |
| 最大螢幕支援 | 1024px+ | 1200px+ | 2560px+ | 768px+ | 1200px+ | **768px+** |
| 佈局系統 | Grid | Flex | Grid | Grid | Flex（三欄） | **Flex** |
| Dark Mode | 無 | 無 | 無 | 無 | 有（CSS media） | **有（`[data-theme]` 屬性）** |
| Print CSS | 無 | 無 | 無 | 無 | 有 | **無** |
| 高對比模式 | 無 | 有 | 有 | 有 | 有 | **無** |
| 減少動畫 | 無 | 無 | 無 | 有 | 有 | **無** |

---

## 六、動畫系統

### 6.1 CSS @keyframes 動畫（CSS 檔案，14 個）

| # | 動畫名稱 | 效果 | 用途 |
|---|----------|------|------|
| 1 | `slideUp` | 上滑淡入 | 設定頁面進場 |
| 2 | `ticketAppear` | 車票彈出 | 擬真車票出現 |
| 3 | `npcSpeak` | NPC 縮放 | 售票員說話效果 |
| 4 | `optionHighlight` | 選項脈衝光暈 | 站點/車種高亮 |
| 5 | `regionPulse` | 區域按鈕脈衝 | 提示正確區域 |
| 6 | `hintBounce` | 提示文字彈跳 | 「點擊此處」提示 |
| 7 | `stationPulse` | 車站按鈕脈衝 | 提示正確車站 |
| 8 | `confirmPulse` | 確認按鈕脈衝 | 提示點擊確認 |
| 9 | `trainTypePulse` | 車種卡片脈衝 | 提示正確車種 |
| 10 | `errorMessageAppear` | 錯誤訊息淡入 | 錯誤提示出現 |
| 11 | `modalFadeIn` | 彈窗淡入 | 彈窗背景出現 |
| 12 | `modalSlideIn` | 彈窗滑入 | 彈窗內容進場 |
| 13 | `shakeError` | 付款錯誤抖動 | 付款金額錯誤 |
| 14 | `pulseErrorX` | 錯誤叉號脈衝 | 錯誤標記閃爍 |

**A6 的 CSS 動畫有 5 個與購票提示相關**（regionPulse、stationPulse、confirmPulse、trainTypePulse、hintBounce），反映了 A6 NPC 對話式購票的多步驟引導需求。

### 6.2 JS 內嵌 @keyframes 動畫（JS 檔案，7 個獨立）

| # | 動畫名稱 | 用途 | 備註 |
|---|----------|------|------|
| 1 | `fadeIn` | 通用淡入 | **3 處重複定義**（CSS 無同名） |
| 2 | `bounceIn` | 彈跳進場 | 僅 JS |
| 3 | `checkBounce` | 確認勾勾彈跳 | 付款成功 |
| 4 | `correctPulse` | 正確答案脈衝 | 找零正確 |
| 5 | `incorrectShake` | 錯誤答案抖動 | 找零錯誤 |
| 6 | `wrongMarkAppear` | 錯誤標記出現 | 找零錯誤反饋 |
| 7 | `correctMarkAppear` | 正確標記出現 | 找零正確反饋（2026-03-16 新增） |
| 8 | `celebrate` | 慶祝動畫 | 完成畫面 |
| 9 | `bounce` | 上下彈跳 | 完成畫面圖示 |

**JS 檔案共 11 處 @keyframes 定義，9 個獨立動畫名稱（2026-03-16 新增 `correctMarkAppear`）。其中 `fadeIn` 有 3 處重複定義。**

### 6.3 HTML 內嵌 @keyframes 動畫（6 處定義，4 個獨立）

| # | 動畫名稱 | 用途 | 備註 |
|---|----------|------|------|
| 1 | `errorX-appear` | 錯誤叉號出現 | inline CSS |
| 2 | `correct-tick-appear` | 正確勾勾出現 | inline CSS |
| 3 | `pulse-highlight` | 脈衝高亮 | inline CSS |
| 4 | `bounce` | 上下彈跳 | **2 處重複定義** |
| 5 | `spin` | Loading 旋轉 | Loading 畫面 |

### 6.4 動畫總數比較

| 項目 | A1 | A2 | A3 | A4 | A5 | **A6** |
|------|------|------|------|------|------|------|
| CSS @keyframes | 14 | 8 | 16 | 8 | 30 | **14** |
| JS 內嵌動畫 | 2 | — | 14 | 17 | 9（15 處） | **8（10 處）** |
| HTML 內嵌動畫 | — | — | — | 3 | — | **5（6 處）** |
| **動畫總數** | **16** | **8** | **~24** | **~28** | **~39** | **~27** |

**A6 的動畫總數約 27 個，在 A 系列中排名第三**（低於 A5 的 ~39 和 A4 的 ~28）。

### 6.5 Canvas-Confetti 煙火效果

| 觸發場景 | 粒子數 | 持續時間 | 版本 |
|---------|--------|---------|------|
| 完成挑戰 | 50×n（漸減） | 3 秒 | **v1.6.0** |

**注意**：A6 使用 canvas-confetti **v1.6.0**（與 A4、A5 相同），A3 使用 v1.9.2。版本不一致。

---

## 七、注意事項

### 7.1 瀏覽器相容性

| 功能 | Chrome | Safari | Firefox | Edge |
|------|--------|--------|---------|------|
| Web Speech API | 完整支援 | 部分支援 | 部分支援 | 完整支援 |
| Canvas-Confetti | 完整支援 | 完整支援 | 完整支援 | 完整支援 |
| CSS Flex 佈局 | 完整支援 | 完整支援 | 完整支援 | 完整支援 |
| Touch Drag API | 完整支援 | 完整支援 | 完整支援 | 完整支援 |
| Audio autoplay | 需互動 | 需互動 | 需互動 | 需互動 |

- **Safari 語音**：中文語音選擇有限，可能退回系統預設語音
- **Firefox**：`speechSynthesis.getVoices()` 需透過 `onvoiceschanged` 事件取得語音清單

### 7.2 行動裝置注意事項

- iOS Safari 必須在使用者互動後才能播放音效（已由 `audio-unlocker.js` 處理）
- 32 個車站在小螢幕上可能需要較多滾動
- `overscroll-behavior-y: contain` 防止下拉重整（三層防護）
- 付款拖放在觸控裝置上使用 `touch-drag-utility.js` 處理

### 7.3 教學使用注意事項

- **32 個車站的教學建議**：初學者可先從簡單模式的預設任務開始，系統會自動選擇常用路線
- **自訂車站功能**：教師可新增學習者熟悉的車站名稱（如學校附近的車站），增加學習動機
- **4 種車種**覆蓋台灣鐵路主要列車類型，可配合實際搭火車的經驗教學
- **建議教學順序**：簡單模式預設任務 → 普通模式預設任務 → 困難模式預設任務 → 自由購票
- **票價矩陣**基於真實票價，可讓學習者對照實際火車票價學習

### 7.4 已知限制

- **無鍵盤快捷鍵**：與 A2、A3、A5 不同，A6 不支援鍵盤操作
- **CSS 無障礙媒體查詢不足**：缺少 `prefers-reduced-motion`、`prefers-contrast: high`、`@media print`
- **cache-bust 參數**：`a6_train_ticket.js?v=1.0.0` 和 CSS 均使用固定版本號
- **票價矩陣硬編碼**：2,048 個票價內嵌於 JS 檔案中，無法獨立更新
- **`showStepHint()` 重複定義**：行 4523 和行 4811 有同名函數（不同簽名），後者覆蓋前者，可能影響普通模式提示功能

### 7.5 狀態管理現況

| 項目 | 狀態 |
|------|------|
| 統一重置函數 | ✅ `resetNormalModeState()` |
| 布林旗標 | `isProcessingPayment`, `isProcessingChange`, `isProcessingSpeech`, `loadingQuestion` |
| 錯誤計數器 | `stepErrorCounts`, `stepHintsShown` |
| 重置位置 | 集中（`resetNormalModeState()` + `startQuiz()` 初始化） |
| TimerManager | ✅ Phase 2 完成（27 個 setTimeout，79 個調用點） |
| EventManager | ✅ Phase 3 完成（48 個遊戲流程事件） |
| Debug Logger | ✅ v1.3.0 完成（298 個 console 轉換為分類開關系統） |
| 評價 | ✅ **最佳實踐** |

**說明**：A6 實現了統一的 `resetNormalModeState()` 函數，所有狀態旗標在場景切換時集中重置。v1.2.0 新增 TimerManager/EventManager 管理計時器和事件監聯器的生命週期。v1.3.0 新增 Debug Logger FLAGS 分類開關系統。

**搜尋關鍵字**：`resetNormalModeState`, `TimerManager`, `EventManager`, `Game.Debug.FLAGS`

---

## 八、Bug 檢測與已知問題

### 8.1 已確認的程式碼問題

| # | 嚴重度 | 問題描述 | 數據 |
|---|--------|---------|------|
| 1 | ~~**高**~~ | ~~`console.log` 殘留~~ | ~~276 個~~ **✅ 已修正（2026-02-22）：298 個轉換為 Game.Debug 分類開關系統，v1.3.0** |
| 2 | ~~**高**~~ | ~~`setTimeout` 未清理~~ | ~~79 個 setTimeout vs 5 個 clearTimeout = 74 個未清理~~ **✅ 已修正（2026-02-19）：27 個 setTimeout 遷移至 TimerManager（79 個調用點），v1.1.0** |
| 3 | **高** | `!important` 過多 | JS 32 個 + CSS 78 個 = **110 個** |
| 4 | ~~**高**~~ | ~~`addEventListener` 未移除~~ | ~~65 個 addEventListener vs 2 個 removeEventListener = 63 個未移除~~ **✅ 已修正（2026-02-19）：48 個 addEventListener 遷移至 EventManager，v1.2.0** |
| 5 | ~~**中**~~ | ~~JS @keyframes 重複定義~~ | ~~`fadeIn` 3 處重複定義~~ **✅ 已修正（2026-02-13）：保留 1 處，刪除 2 處重複**；~~HTML `bounce` 2 處重複定義~~ **✅ 已修正（2026-02-22）：7 個 @keyframes 遷移至 JS injectGlobalAnimationStyles()，v1.4.0** |
| 6 | **中** | ~~`showStepHint()` 同名函數覆蓋~~ | ~~行 4523（2 參數版）被行 4811（1 參數版）覆蓋~~ **✅ 已修正（2026-02-13）：重新命名為 `showNormalModeStepHint()`** |
| 7 | **中** | ~~canvas-confetti 版本不一致~~ | ~~A6 使用 v1.6.0~~ **✅ 已修正（2026-02-09）：已改用本地 `../js/confetti.browser.min.js` v1.9.2** |
| 8 | **低** | ~~`performance.timing` 已棄用~~ | **✅ 已修正（2026-02-13）：改用 `performance.getEntriesByType('navigation')`** |
| 9 | **低** | 票價矩陣硬編碼 | 2,048 個票價內嵌於 JS，無法獨立更新 |
| 10 | **建議** | Skip Link 僅 A6 有 | 建議推廣至所有單元 |
| 11 | **低** | 9 個 `@keyframes` 殘留於 JS 模板字串中（含 2 個與 `injectGlobalAnimationStyles()` 重複）| 搜尋 `@keyframes celebrate`、`@keyframes bounce`（位於 template literals 內） |
| 12 | **低** | 設定頁使用 `alert()` 阻塞式對話框（4 處，搜尋 `alert(`） | ⚠️ 暫緩（低優先） |

### 8.2 A1～A6 Bug 數量比較

| 問題類型 | A1 | A2 | A3 | A4 | A5 | **A6** | 最多 |
|---------|-----|-----|-----|-----|-----|--------|------|
| ~~console.log~~ | — | ~~66~~ ✅ | ~~201~~ ✅ | ~~467~~ ✅ | ~~514~~ ✅ | ~~**276**~~ ✅ | **全部已修正** |
| ~~未清理 setTimeout~~ | — | 42 | 64 | 94 | 199 | ~~74~~ ✅ | A5 |
| ~~未移除 addEventListener~~ | — | — | 39 | 15 | 45 | ~~63~~ ✅ | ~~A6~~ |
| !important 總數 | — | 48 | 76 | 410 | 208 | **110** | A4 |
| 動畫重複定義 | 無 | 無 | 1 個 | 1 個 | 5+ 個 | **2 個** | A5 |
| 版本不一致 | — | — | — | confetti v1.6 | confetti v1.6 | ~~confetti v1.6~~ ✅ | — |
| 同名函數覆蓋 | — | — | — | — | — | ~~1 處~~ ✅ | ~~A6~~ |

**2026-02-19 更新**：A6 已完成 TimerManager（Phase 2）和 EventManager（Phase 3）遷移，setTimeout 和 addEventListener 問題已解決。

### 8.3 非 Bug 但需注意的設計

| 項目 | 說明 |
|------|------|
| JS 單檔 10,570 行 | A 系列第四大，含 NPC 對話 + 32 車站 + 票價矩陣 |
| 2 個 32×32 票價矩陣 | 2,048 個票價數據佔用大量程式碼空間 |
| 88 處 Click Mode 引用 | 9 個 phases 的 Action Queue 管理 |
| per-phase 語音 | 不使用模板化語音，每個階段各自撰寫 |
| 6 個錯誤計數器 | 比 A5 的 9 個少，但覆蓋購票全流程 |
| 效能監控 | 使用已棄用的 `performance.timing` API |

---

## 九、未來開發建議

### 9.1 模組化拆分

**問題：JS 檔案 10,570 行，A 系列第四大**

A6 將 NPC 對話系統、32 個車站資料、2 個票價矩陣、付款系統、找零系統、Click Mode 等全部集中在單一檔案。

**建議的拆分結構**：

```
js/
├── a6/
│   ├── a6-main.js              # 入口、初始化、Game 物件（~500 行）
│   ├── a6-config.js            # 車站資料、票價矩陣（~1,500 行）
│   ├── a6-settings.js          # 設定頁面（~500 行）
│   ├── a6-dialogue.js          # DialogueManager + NPC 對話（~800 行）
│   ├── a6-scene-manager.js     # SceneConfig + SceneManager（~600 行）
│   ├── a6-ticket-window.js     # 購票窗口 UI（站點/車種/張數選擇）（~2,000 行）
│   ├── a6-payment.js           # 付款系統（~1,500 行）
│   ├── a6-change.js            # 找零系統（~1,000 行）
│   ├── a6-ticket-result.js     # 車票生成與展示（~500 行）
│   ├── a6-click-mode.js        # 輔助點擊模式（~1,000 行）
│   ├── a6-hints.js             # 提示系統、錯誤計數器（~500 行）
│   ├── a6-custom-stations.js   # 自訂車站系統（~300 行）
│   ├── a6-completion.js        # 完成畫面（~500 行）
│   └── a6-speech.js            # 語音管理（~300 行）
```

### 9.2 setTimeout / addEventListener 管理器 ✅ 已完成

**原問題**：79 個 setTimeout 僅 5 個 clearTimeout（清理率 6.3%）。65 個 addEventListener 僅 2 個 removeEventListener（清理率 3.1%，**A 系列最低**）。

**已完成的修正（v1.2.0）**：

| Phase | 內容 | 調用點 |
|-------|------|--------|
| Phase 1 | TimerManager/EventManager 基礎設施 | — |
| Phase 2 | setTimeout 遷移至 TimerManager | 27 個 setTimeout → 79 個調用點 |
| Phase 3 | addEventListener 遷移至 EventManager | 48 個遊戲流程事件 |

**清理調用點（3 處）**：
- `init()` - 頁面初始化時
- `renderSettingsUI()` - 返回設定時
- `startGame()` - 開始遊戲時

**事件類別**：
| 類別 | 說明 |
|------|------|
| `stationSelect` | 車站選擇事件 |
| `trainType` | 車種選擇事件 |
| `ticketCount` | 張數選擇事件 |
| `orderConfirm` | 訂單確認事件 |
| `paymentDrag` | 付款拖曳事件 |
| `changeCalc` | 找零計算事件 |
| `easyChange` | 簡單找零拖曳事件 |
| `ticketResult` | 車票結果事件 |
| `completionScreen` | 完成畫面事件 |

### 9.3 Console.log 清理（276 個）✅ 已完成

**原問題**：276 個 `console.log`，A 系列第三多（低於 A5 的 514 和 A4 的 467）。

**已完成的修正（v1.3.0）**：

298 個 console 呼叫已轉換為 `Game.Debug` 分類開關系統，使用 14 個分類：

| 分類 | 用途 |
|------|------|
| `init` | 初始化 |
| `state` | 狀態管理（自訂車站） |
| `ui` | UI 渲染 |
| `audio` | 音效 |
| `flow` | 遊戲流程 |
| `assist` | 輔助模式 |
| `hint` | 提示系統 |
| `payment` | 付款/找零 |
| `event` | 事件註冊 |
| `coin` | 錢幣 |
| `error` | 錯誤 |
| `timer` | 計時器 |

保留 17 個 console 呼叫（3 個內部實作 + 14 個 audio `.catch()` 處理器）。

### 9.4 CSS 無障礙媒體查詢補全

**問題**：A6 缺少 `prefers-reduced-motion`、`prefers-contrast: high`、`@media print` 三項無障礙媒體查詢。

**建議新增**：

```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}

@media (prefers-contrast: high) {
    .station-btn { border: 2px solid black; }
    .train-type-card { border: 2px solid black; }
    .npc-dialogue { border: 2px solid black; }
}

@media print {
    .title-bar, .reward-btn { display: none; }
    body { background: white; color: black; }
}
```

### 9.5 CSS 動畫統一管理

**問題**：JS 中 8 個獨立動畫（10 處定義），其中 `fadeIn` 有 3 處重複定義；HTML 中 `bounce` 有 2 處重複定義。

**建議**：
- 將所有 @keyframes 集中至 `css/a6_train_ticket.css`
- JS 只負責新增/移除 CSS class
- 消除 `fadeIn`（3 處）的重複定義
- 消除 HTML 中 `bounce`（2 處）的重複定義
- 統一 CSS 與 JS 的命名（避免同名不同效果）

### 9.6 作業單擴充建議

**現狀**：348 行、10 種題型、15 條路線——在 A 系列中屬於中等水準（遠優於 A5 的 47 行/1 種題型）。

**可擴充方向**：
- 增加更多路線（目前 15 條，可擴充至 20+）
- 新增莒光號/普悠瑪車種（目前僅區間車+自強號）
- 新增「路線排序」題型（類似 A5 的步驟排序）
- 新增 `toolbarConfig` 中的更多按鈕（如路線篩選）

### 9.7 票價矩陣外部化

**問題**：2 個 32×32 票價矩陣（2,048 個票價）硬編碼於 JS 檔案中，佔用大量程式碼空間且無法獨立更新。

**建議**：
- 將票價矩陣移至獨立 JSON 檔案（如 `data/a6-fare-matrix.json`）
- 遊戲啟動時以 `fetch()` 載入
- 便於未來票價更新（無需修改 JS 檔案）

### 9.8 canvas-confetti 版本統一

**問題**：A6 使用 v1.6.0，A3 使用 v1.9.2。

**建議**：統一所有單元使用 v1.9.2（最新穩定版），或下載至本地避免 CDN 版本不一致。

### 9.9 showStepHint() 重複定義修復

**問題**：`showStepHint()` 在行 4523（2 參數版，用於普通模式）和行 4811（1 參數版，用於困難模式）有兩個不同的實現，後者覆蓋前者。

**建議**：
- 將兩個函數重新命名為不同名稱（如 `showNormalModeStepHint()` 和 `showHardModeStepPopup()`）
- 或合併為單一函數，透過參數判斷行為

### 9.10 未來新單元開發 Checklist（A6 新增項目）

在前述報告 checklist 基礎上新增：

```
□ 46. addEventListener 清理率 > 50%（A6 僅 3.1%，A 系列最低，需嚴格改善）
□ 47. 避免同名函數覆蓋（使用 eslint no-func-assign 規則）
□ 48. 大型數據結構（如票價矩陣）應外部化為 JSON
□ 49. NPC 對話系統考慮模組化為獨立工具（可複用於其他單元）
□ 50. Skip Link 推廣至所有單元（A6 為首例）
□ 51. 自訂內容系統（車站/商品/商店）統一 localStorage 管理架構
□ 52. canvas-confetti 版本統一為 v1.9.2 或本地化
```

---

## 十、Bug 修正記錄

### 10.1 2026-02-13 修正內容

| # | 問題 | 修正方式 | 修改檔案 |
|---|------|---------|---------|
| 1 | `showStepHint()` 同名函數覆蓋 | 將 2 參數版重新命名為 `showNormalModeStepHint(step, correctValue)`，並更新 4 處調用位置 | `js/a6_train_ticket.js` |
| 2 | JS `@keyframes fadeIn` 重複定義（3 處） | 保留第 5234 行的定義，刪除第 9538、9957 行的重複定義 | `js/a6_train_ticket.js` |
| 3 | `performance.timing` 已棄用 | 改用 `performance.getEntriesByType('navigation')[0]` API | `html/a6_train_ticket.html` |

### 10.2 2026-02-19 修正內容（記憶體管理 v1.2.0）

| # | Phase | 問題 | 修正方式 | 修改檔案 |
|---|-------|------|---------|---------|
| 1 | Phase 1 | TimerManager/EventManager 基礎設施缺失 | 新增 TimerManager（setTimeout, clearTimeout, clearAll, clearByCategory）和 EventManager（on, removeAll, removeByCategory） | `js/a6_train_ticket.js` |
| 2 | Phase 2 | 79 個 setTimeout 僅 5 個 clearTimeout | 27 個 setTimeout 遷移至 TimerManager.setTimeout()，使用類別管理（gameUI, speech, hint, transition 等） | `js/a6_train_ticket.js` |
| 3 | Phase 3 | 65 個 addEventListener 僅 2 個 removeEventListener | 48 個遊戲流程事件遷移至 EventManager.on()，使用類別管理（stationSelect, trainType, ticketCount, orderConfirm, paymentDrag, changeCalc, easyChange, ticketResult, completionScreen） | `js/a6_train_ticket.js` |
| 4 | — | 清理調用點 | 在 init(), renderSettingsUI(), startGame() 添加 TimerManager.clearAll() + EventManager.removeAll() | `js/a6_train_ticket.js` |

### 10.3 2026-02-09 修正內容

| # | 問題 | 修正方式 | 修改檔案 |
|---|------|---------|---------|
| 1 | canvas-confetti CDN 版本不一致 | 下載 v1.9.2 至 `js/confetti.browser.min.js`，所有 HTML 改為本地引用 | `html/a6_train_ticket.html` |

### 10.4 2026-03-11 修正內容（普通模式語音競態 + 確認付款按鈕動畫）

#### 1. Speech.speak() skipOnInterrupt 選項

**問題**：普通模式各步驟（askStart/askEnd/askType/askCount）的主語音播完後會觸發 callback 播放任務提示語音（如「要抵達東部，花蓮」）。但 `Speech.speak()` 的 `safeCallback` 在 `onend` **和** `onerror`（含 `'interrupted'`）都會觸發，導致主語音被遊戲內任何語音打斷時 callback 立刻在錯誤時機執行。實際觀察到的後果：
- 自動語音在使用者選擇正確車站時觸發，打斷到站確認語音
- 到站確認語音的 callback 呼叫 `DialogueManager.nextStep`，因被中斷而提早觸發
- 導致遊戲意外進入「重新選擇」流程

**修復**：`Speech.speak()` 選項物件新增 `skipOnInterrupt: boolean`。`onerror` 收到 `'interrupted'` 且 `skipOnInterrupt === true` 時，設 `callbackExecuted = true`（同時阻止 10s 備援計時器）並直接 return，不觸發 callback。四個步驟 switch case 一律傳入 `skipOnInterrupt: true`。

**搜尋關鍵字**：`skipOnInterrupt`（`js/a6_train_ticket.js`）

---

#### 2. 重新選擇後提示鈕「找不到預設任務資料」

**問題**：「重新選擇」按鈕（`reset-arrival-btn`）的 click handler 將整個 `ticketProcess` 替換為新物件，新物件不含 `presetTask` 欄位。後續按提示鈕呼叫 `showStepHint()` 時，開頭 guard `if (!presetTask)` 為 true 而提前返回，顯示 `⚠️ 找不到預設任務資料`。

**根因**：
```javascript
// 舊版：完全替換，presetTask 消失
this.state.gameState.ticketProcess = {
    startStation: null, endStation: null, ...
    // 無 presetTask
};
```

**修復**：
```javascript
// 新版：先存再還
const savedPresetTask = this.state.gameState.ticketProcess.presetTask;
this.state.gameState.ticketProcess = {
    startStation: null, endStation: null, ...
    presetTask: savedPresetTask || null
};
```

**搜尋關鍵字**：`savedPresetTask`（`js/a6_train_ticket.js`）

---

#### 3. 確認付款按鈕就緒脈動動畫（同 A4）

**功能**：付款金額足夠（`paidAmount >= targetCost`）或困難模式時，「確認付款」鈕顯示綠色脈動光環動畫，與 A4 第三步效果一致。

**實作**：
- `injectGlobalAnimationStyles` 新增 `@keyframes pulse`（綠色 `box-shadow` 0→10px→0，1.5s infinite）與 `#confirm-payment-btn.ready`（套用 pulse + 保持綠色背景）
- `updatePaymentButton()`：金額足夠 + 困難模式路徑加 `classList.add('ready')`；金額不足時 `classList.remove('ready')`
- ClickMode 自動付款完成路徑同步加 `classList.add('ready')`

**搜尋關鍵字**：`classList.*ready`、`@keyframes pulse`（`js/a6_train_ticket.js`）

---

#### 4. 確認付款按鈕 hover 橘色動畫（同 A4）

**功能**：滑鼠移至「確認付款」鈕時背景變橘色（`#F57C00`）並上移 2px，與 A4 `.confirm-btn:hover:not(:disabled)` 效果一致。

**實作**：`injectGlobalAnimationStyles` 新增：
```css
#confirm-payment-btn {
    transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}
#confirm-payment-btn:hover:not(:disabled) {
    background: #F57C00 !important;
    animation: none;       /* 暫停 pulse，防兩個動畫衝突 */
    transform: translateY(-2px);
}
```

**搜尋關鍵字**：`confirm-payment-btn:hover`（`js/a6_train_ticket.js`）

### 10.5 2026-03-16 修正內容（錢包多樣化 + 找零反饋一致性）

#### 1. 預設任務錢包金額改用固定分層上限

**問題**：`generatePresetQuestion()` 普通/困難模式的錢包金額為「票價 × 1.0 ～ 2.0 倍」，比例固定，每題找零感受差異不大。

**修正**：改用固定分層上限（與 A3/A4 相同思路），讓找零金額真正隨機：

| 票價範圍 | 舊做法（上限） | 新做法（上限） | 效果 |
|---------|------------|------------|------|
| ≤ 100元 | 票價 × 2 | 300元 | 找零範圍更寬 |
| ≤ 300元 | 票價 × 2 | 700元 | 同票價 250元：舊 0-250、新 10-450 |
| ≤ 600元 | 票價 × 2 | 1300元 | 大幅增加找零差異 |
| > 600元 | 票價 × 2 | 票價 + 500 | 高票價合理上限 |

最小金額從 `totalPrice`（可能零找零）改為 `totalPrice + 10`，**保證每題至少有 10 元找零**。

`renderPaymentSceneUI()` fallback 邏輯同步更新。

**搜尋關鍵字**：`walletCap`（`generatePresetQuestion`、`renderPaymentSceneUI`）

---

#### 2. 500/1000/2000 錢包選項改為隨機組成（≤10 張，每題不同）

**問題**：自由購票選擇 500/1000/2000 元時，`initializeWallet()` 用貪婪演算法 → 永遠只有 1 ～ 2 張紙鈔（500→[500]、1000→[1000]），毫無變化。

**修正**：新增 `generateRandomWalletDecomposition(amount)` 函數，採用「隨機拆解」演算法：

**演算法說明**：
1. 從貪婪最少張數出發（如 500元 → [500]，1 張）
2. 隨機決定目標張數（current ～ 10 張）
3. 反覆隨機選一張「可拆解的」紙幣換成等值小鈔，直到達到目標：
   - 1000 → [500, 500]（+1 張）
   - 500 → [100×5]（+4 張）
   - 100 → [50, 50]（+1 張）
   - 50 → [10×5]（+4 張）
4. 每步檢查拆解後不超過 10 張才執行

**組合範例（500元）**：
```
[500] → [100×5] → [100×4, 50×2] → [100×3, 50×4] → ... 約 7~8 種終態
```

`initializeWallet()` 新增第二條路徑：
```
有 customWalletDetails → 自訂彈窗（不變）
有 customWalletAmount，無 customWalletDetails → 隨機分解（新）
其他 → 預設任務貪婪演算法（不變）
```

每題呼叫 `initializeWallet()` 時重新計算，**每題組合不同**。

**搜尋關鍵字**：`generateRandomWalletDecomposition`、`breakRules`

---

#### 3. 找零驗證：普通模式加 ✗ 反饋（與困難模式一致）

**問題**：找零驗證選錯時，困難模式顯示紅色圓圈 ✗（`wrong-answer-overlay`），普通模式只有紅色背景 CSS，行為不一致。

**修正**：普通模式同樣加入 `wrong-answer-overlay` + `wrong-mark` 結構。Timing 對齊困難模式（300ms 說語音，1000ms 後移除 overlay 並重新渲染）。

**搜尋關鍵字**：`wrong-answer-overlay`（普通模式 else 分支）

---

#### 4. 找零驗證：正確答案加綠色 ✓ 反饋

**問題**：選對答案時只有綠色背景 CSS（`correct-selected`），無視覺強調反饋。

**修正**：正確時疊加綠色圓圈 ✓（`correct-answer-overlay` + `correct-mark`），與錯誤 ✗ 結構完全對稱：
- 背景：`rgba(76, 175, 80, 0.15)`（綠色半透明）
- 圓圈：`rgba(76, 175, 80, 0.9)`，80×80px，白色 ✓，font-size 48px
- 動畫：`correctMarkAppear`（旋轉縮放進場，與 `wrongMarkAppear` 完全對稱）
- ✓ 在語音說完、場景切換時自然消失（整個畫面被替換）

**搜尋關鍵字**：`correct-answer-overlay`、`correctMarkAppear`

---

## 十二、A6 自訂車站系統（2026-03-22 移入）

| 函數 | 說明 |
|------|------|
| `addCustomStation()` | 新增自訂車站（上限 `MAX_CUSTOM_STATIONS: 6`） |
| `deleteCustomStation()` | 刪除指定自訂車站 |
| `saveCustomStations()` | 寫入 localStorage（鍵：`a6_customStations`） |
| `loadCustomStations()` | 從 localStorage 讀取 |
| `resolveStationId()` | 代理站 ID 解析（自訂站 → 代理真實站） |
| `generatePresetQuestion()` | 以車站資料生成指定任務題目 |

**資料結構**：`{ id, name, displayName, region, proxyStationId, isCustom }`

**代理站機制**：北→臺北、中→臺中、南→高雄、東→花蓮（使真實票價矩陣仍可運算）

---

## 十一、總結

### A6 模擬火車購票的優勢

1. **NPC 對話式購票流程**：A 系列唯一使用 `DialogueManager` 的單元，售票員對話引導讓學習者沉浸式體驗購票流程
2. **32 個真實車站**：涵蓋台灣鐵路 4 個區域的完整車站系統，配合真實票價數據
3. **2 個 32×32 票價矩陣**：基於真實 OCR 票價數據，合計 2,048 個票價——A 系列最大的靜態數據結構
4. **自訂車站系統**：最多 6 個自訂車站 + 代理站機制 + localStorage 儲存，教師可客製化教學內容
5. **擬真車票生成**：車次/日期/座位/QR Code 完整呈現，增強學習真實感
6. **4 種車種**：區間車/莒光號/自強號/普悠瑪，覆蓋台灣鐵路主要列車類型
7. **SceneConfig/SceneManager 架構**：6 個場景結構化管理，優於 A5 的雙層追蹤方式
8. **Skip Link 無障礙功能**：A 系列首個提供跳過導航連結的單元
9. **完整作業單**：348 行、10 種題型——大幅優於 A5 的 47 行/1 種題型
10. **繼承 A4 付款/找零系統**：成熟的金錢拖放機制，確保操作一致性

### A6 模擬火車購票的待改進處

1. ~~**63 個未移除 addEventListener**（A 系列最多，清理率 3.1%）~~ → ✅ 已修正（2026-02-19，Phase 3 完成，48 個事件遷移至 EventManager）
2. ~~**276 個 console.log**~~ → ✅ 已修正（2026-02-22，298 個轉換為 Game.Debug 分類開關系統，v1.3.0）
3. ~~**74 個未清理 setTimeout**~~ → ✅ 已修正（2026-02-19，Phase 2 完成，27 個 setTimeout 遷移至 TimerManager）
4. ~~**`showStepHint()` 同名函數覆蓋**~~ → ✅ 已修正（2026-02-13）
5. **CSS 缺少無障礙媒體查詢**（reduced-motion / high-contrast / print）→ 建議補全
6. ~~**JS @keyframes 重複定義**（`fadeIn` 3 處）~~ → ✅ 已修正（2026-02-13）
7. **票價矩陣硬編碼**（2,048 個票價）→ 建議外部化為 JSON
8. **無鍵盤快捷鍵** → 建議加入數字鍵選擇站點/車種
9. ~~**canvas-confetti 版本不一致**~~ → ✅ 已修正（2026-02-09，改用本地 v1.9.2）
10. ~~**`performance.timing` 已棄用**~~ → ✅ 已修正（2026-02-13）

### A1～A6 六單元架構比較表

| 面向 | A1 販賣機 | A2 理髮廳 | A3 麥當勞 | A4 超市購物 | A5 ATM | **A6 火車票** | 最佳 |
|------|----------|----------|----------|------------|--------|-------------|------|
| 程式碼總量 | 7,290 行 | 12,090 行 | 12,074 行 | 19,415 行 | 20,597 行 | **13,274 行** | A1（最精簡） |
| JS 單檔大小 | 6,080 行 | 8,163 行 | 9,691 行 | 14,682 行 | 15,758 行 | **10,570 行** | A1（最精簡） |
| CSS 行數 | 821 行 | 3,136 行 | 1,721 行 | 3,528 行 | 4,344 行 | **1,821 行** | A1（最精簡） |
| 品項/服務數 | 19 飲料 | 6 服務 | 70 餐點 | 130 商品 | 4 交易類型 | **32 車站×4 車種** | A4（商品最多）/ A6（站點最多） |
| 圖片資源 | 19 張 | 10 張 / 2.4MB | 83 張 / 46.3MB | Emoji（0 MB） | 2 張 / 1.1 MB | **2 張 / 201 KB** | **A6（最輕量）** |
| 設定驅動 | 部分 | 完全 | 完全 | 完全 | 完全 | **完全** | A2/A3/A4/A5/A6 |
| 場景管理 | 無 | 無 | 7 場景 | 8 場景 | 雙層追蹤（33+階段） | **6 場景（SceneManager）** | A3/A4/A6（結構化） |
| 語音系統 | 直接撰寫 | 模板驅動 | 模板+雙語速 | 模板+難度遞進 | per-phase+callback | **per-phase（0.9x）** | A2/A3/A4（模板化） |
| 語音速率 | 預設 | 0.9~0.95x | 1.2x / 0.9x | 預設 | 1.0x | **0.9x** | — |
| RWD 斷點數 | 3 | 4 | 8 | 3+3 | 4+4 | **4** | A3（覆蓋最廣） |
| 最大螢幕支援 | 1024px+ | 1200px+ | 2560px+ | 768px+ | 1200px+ | **768px+** | A3 |
| 動畫數量 | 16 | 8 | ~24 | ~28 | ~39 | **~27** | A5（最多） |
| 觸控拖放 | 不支援 | 不支援 | 支援 | 支援 | 不支援 | **支援** | A3/A4/A6 |
| 鍵盤快捷鍵 | 無 | 1-6, Enter, Esc | 1-4, Enter, Esc | 無 | 0-9, Enter, Esc | **無** | A2/A5 |
| 無障礙 | 基本 | ARIA+Loading | ARIA+Loading | 最完整 | 完整（+aria-live） | **完整（+Skip Link）** | A4/A5/A6 |
| Skip Link | 無 | 無 | 無 | 無 | 無 | **有（唯一）** | **A6（唯一）** |
| Dark Mode CSS | 無 | 無 | 無 | 無 | 有（CSS media） | **有（`[data-theme]`）** | A5（自動跟隨系統） |
| Print CSS | 無 | 無 | 無 | 無 | 有 | **無** | A5（唯一） |
| 高對比模式 | 無 | 有 | 有 | 有 | 有 | **無** | A2/A3/A4/A5 |
| 減少動畫 | 無 | 無 | 無 | 有 | 有 | **無** | A4/A5 |
| 找零機制 | 逐枚取回 | 不找零 | 三選一 | 三選一/拖放/計算器 | 不適用 | **三選一/拖放/計算器** | A4/A6（最多元） |
| NPC 對話系統 | 無 | 無 | 無 | 無 | 無 | **有（唯一）** | **A6（唯一）** |
| 密碼系統 | 無 | 無 | 無 | 無 | 有（4-12 位） | **無** | A5（唯一） |
| 帳戶餘額 | 無 | 無 | 無 | 無 | 有（即時更新） | **無** | A5（唯一） |
| 收據/車票 | 無 | 取號單 | 餐盤 | 無 | 收據列印分支 | **擬真車票** | A5/A6（各有特色） |
| 硬體模擬 | 販賣機面板 | 自助機面板 | 點餐機面板 | 無 | ATM 三欄硬體 | **售票窗口+NPC** | A5（最擬真硬體） |
| 效能監控 | 無 | 無 | 無 | 無 | 有 | **有** | A5/A6 |
| 防抖層數 | 6 | 4 | 4 | 7 | 6 | **2** | A4（最嚴密） |
| Click Mode 階段 | ~10 | ~8 | ~15 | ~6 | 30+ | **9** | A5（最多） |
| 錯誤計數器 | 4 步 | 2 步 | 3 步 | 3 步 | 9 步 | **6 步** | A5（最精細） |
| 自訂內容 | 魔法商品 | 無 | 無 | 魔法商店 | 自訂密碼/餘額 | **自訂車站（6 個+代理站）** | A1/A4/A5/A6 |
| 數據結構大小 | 19 飲料陣列 | 6 服務 | 70 餐點 | 130 商品 | 帳戶系統 | **2×32×32 票價矩陣** | **A6（最大）** |
| console.log | — | 66 | 201 | 467 | 514 | **276** | A2（最少） |
| !important | — | 48 | 76 | 410 | 208 | **110** | A2（最少） |
| 未清理 setTimeout | — | 42 | 64 | 94 | 199 | **74** | A2（最少） |
| 未移除 addEventListener | — | — | 39 | 15 | 45 | **63** | A4（最少） |
| 作業單行數 | 358 | 341 | 410 | 615 | 47 | **348** | A4（最豐富）/ A5（最簡） |
| 作業單題型數 | 10 | 10 | 10 | 10 | 1 | **10** | A1-A4/A6（10 種） |

### A 系列完結總回顧

A1～A6 六個生活應用單元已全部完成開發，涵蓋了日常生活中最常見的金錢交易場景：

| 單元 | 場景 | 核心學習目標 | 獨特貢獻 |
|------|------|-------------|---------|
| A1 販賣機 | 自動販賣機 | 投幣/選商品/取找零 | 最早開發，奠定基礎架構 |
| A2 理髮廳 | 理髮廳自助機 | 服務選擇/付款/取號 | 設定驅動架構先驅 |
| A3 麥當勞 | 速食店點餐機 | 餐點搭配/付款/取餐 | 最多品項圖片（83 張） |
| A4 超市購物 | 超市結帳 | 商品挑選/計算/找零 | 最大規模（19,415 行）、SceneManager |
| A5 ATM | ATM 提款機 | 金融操作/密碼安全 | 最擬真硬體、Dark Mode、Print CSS |
| **A6 火車票** | **火車售票機** | **路線選擇/票價計算/購票流程** | **NPC 對話、32 車站、擬真車票、Skip Link** |

**A 系列的技術演進軌跡**：

```
A1（基礎）→ A2（設定驅動）→ A3（SceneConfig 雛形）→ A4（SceneManager 成熟）→ A5（硬體模擬巔峰）→ A6（NPC 對話創新）
```

**A 系列的共同技術債**：
- **JS 單檔過大**：6,080 ~ 15,758 行，均需模組化拆分
- **console.log 殘留**：66 ~ 514 個，應統一使用 DEBUG 模式
- **setTimeout 未清理**：42 ~ 199 個，應引入 TimerManager
- **addEventListener 未移除**：15 ~ 63 個，應引入 EventManager
- **!important 過多**：48 ~ 410 個，應改用更高特異性選擇器
- **canvas-confetti 版本不一致**：v1.6.0 vs v1.9.2，應統一

**A 系列的設計亮點**：
- **三種難度模式**一致貫穿 A1～A6，為不同程度學習者提供適切的挑戰
- **輔助點擊模式**讓手部控制能力較弱的學習者也能體驗完整操作流程
- **普通模式錯誤 3 次提示**在挑戰與輔助之間取得平衡
- **作業單系統**延伸課堂外的練習機會（A5 除外）
- **獎勵系統整合**提供學習動機
- **自訂內容**（魔法商品/魔法商店/自訂車站）讓教師可客製化教學

---

## 修復記錄（2026-02-07）

### 作業單題目敘述修正

**修改檔案**：`worksheet/units/a6-worksheet.js`

**問題**：圖示選擇、提示選擇等題型顯示「單價：470 元 × 3 張」，缺少總票價計算結果。

**修改內容**：
- `priceVisual` 從 `單價：X 元 × Y 張` 改為 `總票價：X 元 × Y 張 = Z 元`

**搜尋關鍵字**：`priceVisual`

### 自訂車站功能修正

**修改檔案**：`js/a6_train_ticket.js`

**修改內容**：

1. **刪除「使用輪數」設定**：自訂車站不再自動消除，僅能手動刪除
   - 移除新增車站彈窗中的「使用輪數」按鈕（1/2/3/5 輪）
   - 移除 `_selectedMaxUsage` 變數與事件綁定
   - 移除 `addCustomStation()` 中的 `usageCount` 和 `maxUsage` 欄位
   - 移除車站標籤上的使用次數顯示 `(0/2)`
   - `checkAndUpdateCustomStationUsage()` 改為僅記錄，不再自動消除

2. **修正普通/困難模式預設任務不含自訂車站的 Bug**
   - **根本原因**：`ticketWindow.onEnter` 中條件 `!ticketProcess.startStation` 在普通/困難模式下為 `true`（`generatePresetQuestion()` 對非簡單模式設 `startStation = null`），導致 `ticketProcess` 被重置、`presetTask`（含自訂車站）被清除，接著 fallback 呼叫 `generateNormalModePresetTask()` 不含自訂車站邏輯
   - **修正**：條件改為 `(!startStation && !presetTask)`，當 `presetTask` 已存在時不重置
   - **加強**：`generateNormalModePresetTask()` 也加入自訂車站支援作為 fallback
   - **搜尋關鍵字**：`保留預設模式生成的購票資料` 或 `generateNormalModePresetTask`

3. **新增提示文字**：「已新增 X/6 個」右方顯示紫色提示「自訂車站會自動加入預設任務中」
   - **搜尋關鍵字**：`自訂車站會自動加入預設任務中`

---

*報告完成時間：2026-02-09 20:30*
*Bug 修正更新：2026-02-13*
*功能修正更新：2026-02-07（自訂車站、作業單）*
*報告產生者：Claude Code (claude-opus-4-6)*

---

## 驗證記錄

### 2026-02-16：系統性驗證

**驗證內容**：

| 項目 | 狀態 | 說明 |
|------|------|------|
| TimerManager | ✅ Phase 2 完成 | 27 個 setTimeout 遷移（79 個調用點） |
| EventManager | ✅ Phase 3 完成 | 48 個 addEventListener 遷移（遊戲流程事件） |
| injectGlobalAnimationStyles | ✅ v1.4.0 完成 | 7 個 @keyframes 從 HTML 遷移至 JS |
| 完成畫面 | ✅ 正常 | 採用 A 系列統一完成畫面樣式 |
| confetti 煙火 | ✅ 正常 | 使用 v1.9.2 本地化版本 |
| 自訂車站功能 | ✅ 正常 | 2026-02-07 已修正 |

**2026-02-19 更新（記憶體管理 v1.2.0）**：

| Phase | 內容 | 數量 |
|-------|------|------|
| Phase 1 | TimerManager/EventManager 基礎設施 | — |
| Phase 2 | setTimeout 遷移至 TimerManager | 27 個（79 個調用點） |
| Phase 3 | addEventListener 遷移至 EventManager | 48 個遊戲流程事件 |

**清理調用點（3 處）**：
- `init()` - 頁面初始化時
- `renderSettingsUI()` - 返回設定時
- `startGame()` - 開始遊戲時

**遷移的事件類別**：

| 類別 | 事件數量 | 說明 |
|------|----------|------|
| `stationSelect` | 8 | 車站選擇（分區切換、車站按鈕、確認、重設） |
| `trainType` | 4 | 車種選擇（卡片點擊） |
| `ticketCount` | 3 | 張數選擇（減、加、確認） |
| `orderConfirm` | 3 | 訂單確認（重新選擇、確認購票） |
| `paymentDrag` | 6 | 付款拖曳 |
| `changeCalc` | 12 | 找零計算（輸入框、計算機、數字鍵盤） |
| `easyChange` | 8 | 簡單找零拖曳 |
| `ticketResult` | 2 | 車票結果（下一題、完成） |
| `completionScreen` | 1 | 完成畫面獎勵連結 |

**結論**：A6 記憶體管理已完成 Phase 1～3，版本升級至 v1.2.0。

---

---

## 十二、Debug Logger 重構（v1.3.0）

### 12.1 修正內容

**修改日期**：2026-02-22
**修改檔案**：`js/a6_train_ticket.js`
**版本**：v1.2.0 → v1.3.0

### 12.2 Debug Logger 系統

在 `EventManager` 之後新增 `Debug` 子系統：

```javascript
Debug: {
    FLAGS: {
        all: false,      // 主開關：開啟後顯示所有分類
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

### 12.3 轉換統計

| 指標 | 數量 |
|------|------|
| 原始 console 呼叫 | 312 個 |
| 轉換為 Game.Debug | **298 個** |
| 保留的 console 呼叫 | 17 個 |

**保留的 17 個 console 呼叫**：
- 3 個內部 Debug 實作（`console.log/warn/error` 在 `Debug.log/warn/error` 內部）
- 14 個 audio `.catch()` 錯誤處理器（簡單錯誤處理，無需分類）

### 12.4 分類使用統計

| 分類 | 用途 | 呼叫數 |
|------|------|--------|
| `init` | 初始化 | 1 |
| `state` | 自訂車站管理 | 13 |
| `ui` | UI 渲染、元素未找到 | 5 |
| `audio` | 音頻權限解鎖 | 1 |
| `flow` | 遊戲流程（購票步驟、確認、場景切換） | 22 |
| `assist` | 輔助點擊模式（ClickMode） | 19 |
| `hint` | 提示系統（高亮、錯誤提示） | 9 |
| `payment` | 付款/找零邏輯（拖曳、驗證、計算） | 93 |
| `event` | 觸控拖曳事件註冊 | 10 |
| `coin` | 錢幣圖片驗證 | 1 |
| `error` | 錯誤訊息（票價找不到、拖曳資料無效等） | 7 |
| `timer` | TimerManager 清理 | 2（已存在） |

### 12.5 使用方式

**開啟單一分類除錯**：
```javascript
// 在瀏覽器控制台執行
Game.Debug.FLAGS.payment = true;  // 開啟付款分類
Game.Debug.FLAGS.flow = true;     // 開啟流程分類
```

**開啟所有除錯**：
```javascript
Game.Debug.FLAGS.all = true;
```

### 12.6 搜尋關鍵字

- `Game.Debug.FLAGS` - Debug 開關設定
- `Game.Debug.log` - Debug 日誌呼叫
- `Game.Debug.warn` - Debug 警告呼叫
- `Game.Debug.error` - Debug 錯誤呼叫

---

## 十三、動畫定義整合（v1.4.0）

### 13.1 修正內容

**修改日期**：2026-02-22
**修改檔案**：`js/a6_train_ticket.js`, `html/a6_train_ticket.html`
**版本**：v1.3.0 → v1.4.0

### 13.2 問題描述

A6 模組的動畫定義極度分散於 3 個位置：
- **CSS 檔案** (`css/a6_train_ticket.css`): 16 個 @keyframes
- **HTML 內嵌樣式** (`html/a6_train_ticket.html`): 5 個 @keyframes
- **JS 檔案** (`js/a6_train_ticket.js`): 0 個（缺少 `injectGlobalAnimationStyles()` 函數）

此外還有重複定義：
- `bounce` 在 HTML 中定義 2 次
- `pulse-highlight` 在 CSS 和 HTML 都有

### 13.3 修正方式

**Phase 1: 基礎設施**

在 JS 中新增 `injectGlobalAnimationStyles()` 函數（參照 F1/F6 模式）：

```javascript
injectGlobalAnimationStyles() {
    if (document.getElementById('a6-global-animations')) return;

    const style = document.createElement('style');
    style.id = 'a6-global-animations';
    style.innerHTML = `
        @keyframes errorX-appear { ... }
        @keyframes correct-tick-appear { ... }
        @keyframes pulse-highlight { ... }
        @keyframes bounce { ... }
        @keyframes spin { ... }
        @keyframes fadeIn { ... }
        @keyframes celebrate { ... }
    `;
    document.head.appendChild(style);
    Game.Debug.log('init', '🎬 全局動畫樣式注入完成');
},
```

**Phase 2: HTML 遷移**

從 HTML 移除 5 個 @keyframes 定義（保留使用這些動畫的 class 定義）：

| 動畫名稱 | 原 HTML 行號 | 狀態 |
|---------|-------------|------|
| `errorX-appear` | 91-104 | ✅ 已移除 |
| `correct-tick-appear` | 139-148 | ✅ 已移除 |
| `pulse-highlight` | 151-160 | ✅ 已移除 |
| `bounce` | 163-170 | ✅ 已移除 |
| `bounce` | 280-283 | ✅ 已移除（重複） |
| `spin` | 441-444 | ✅ 已移除 |

**Phase 3: 調用位置**

在 `init()` 函數中調用：

```javascript
async init() {
    Game.Debug.log('init', '🚀 [A6] 初始化遊戲');

    this.TimerManager.clearAll();
    this.EventManager.removeAll();

    // 🎬 注入全局動畫樣式（避免 HTML 內嵌重複定義）
    this.injectGlobalAnimationStyles();

    // ...
}
```

### 13.4 遷移的動畫清單

| 動畫名稱 | 用途 | 原位置 |
|---------|------|--------|
| `errorX-appear` | 付款錯誤 × 出現動畫 | HTML |
| `correct-tick-appear` | 正確 ✓ 出現動畫 | HTML |
| `pulse-highlight` | 簡單模式高亮脈衝 | HTML/CSS |
| `bounce` | 輔助點擊提示彈跳 | HTML（2處） |
| `spin` | Loading 旋轉 | HTML |
| `fadeIn` | 完成畫面淡入 | JS（已有） |
| `celebrate` | 完成畫面慶祝 | JS（已有） |

### 13.5 搜尋關鍵字

- `injectGlobalAnimationStyles` - 動畫注入函數
- `a6-global-animations` - 注入的 style 元素 ID
- `@keyframes 已移至 JS` - HTML 中的遷移註解

---

### 2026-02-24（第二輪）：稽核結果

**第二輪全面稽核結論（無新增可修復 Bug）**：

- ✅ 完成畫面符合 A 系列標準
- ✅ 作業單連結不傳 count 參數
- ✅ `injectGlobalAnimationStyles()` 正確實作
- ⚠️ 設定畫面部分監聽器（約 14 個）未透過 EventManager 追蹤：A6 大量使用 EventManager，但設定畫面有部分直接 addEventListener；由於每次返回設定時 DOM 被替換，實際記憶體洩漏風險有限

---

### 2026-02-24：作業單連結統一簡化（僅傳 unit 參數）

**修改內容**：

- 作業單連結原本傳遞遊戲設定參數（`difficulty`, `walletAmount`）
- 各作業單已有完整工具列，用戶開啟後可直接在工具列調整；遊戲設定與作業單設定應獨立運作
- **修復**：移除所有多餘參數，統一改為只傳 `unit` 參數，讓作業單完全使用自己的預設値

**修改檔案**：`js/a6_train_ticket.js`

---

---

### 2026-02-26：觸控拖曳 easy-change-money 修復 + setDragImage 防護

#### Bug 1：`easy-change-money` 元素無法觸控拖曳

**問題描述**：
找零簡單模式（easy 難度）中，`easy-change-money` 元素已正確以 `TouchDragUtility.registerDraggable()` 註冊，但觸控 touchstart 時 `TouchDragUtility` 的快速預檢查（quickCheck）未包含 `.easy-change-money`，導致所有觸碰被 `❌ 元素不符合快速檢查條件，忽略touchstart` 直接跳過。

**修復（`js/touch-drag-utility.js`，跨單元共用）**：
- `handleTouchStart` 與 `findDraggableElement` 中的 quickCheck 選擇器字串，新增 `.easy-change-money`（2 處，以 `replace_all` 批次替換）

#### Bug 2：dragstart handler 缺少 setDragImage 防護

**問題描述**：
`setupPaymentScreen()` 與 `setupReturnPaymentDrag()` 中的 EventManager dragstart 事件處理器，直接呼叫 `e.dataTransfer.setDragImage(...)`，若日後呼叫路徑傳入 TouchEvent 則會拋出 TypeError。

**修復（`js/a6_train_ticket.js`，2 處）**：
```javascript
// 修復後
if (e.dataTransfer && typeof e.dataTransfer.setDragImage === 'function') {
    e.dataTransfer.setDragImage(dragImg, dragImg.offsetWidth / 2, dragImg.offsetHeight / 2);
}
```

**修改檔案**：
- `js/touch-drag-utility.js`（quickCheck 選擇器，跨單元共用）
- `js/a6_train_ticket.js`（setDragImage 防護，2 處）

---

### 2026-02-26：11-19 元語音唸法稽核確認（無修改）

**稽核結果**：A6 的金額語音透過 `convertAmountToSpeech(amount)` → `NumberSpeechUtils.convertToTraditionalCurrency(amount)` 路由，完全使用共用模組。共用模組 `number-speech-utils.js` 已於 2026-02-26 補入 11-19 的 specialCases（`'十一元'`~`'十九元'`），A6 自動受益，無需額外修改。

---

---

### 2026-02-27：Speech.speak() safeCallback 雙觸發修復

**問題描述**：

`Speech.speak()` 中 `utterance.onend` 與 `utterance.onerror` 直接指向同一個 `callback`，沒有 `callbackExecuted` 保護旗標。若語音播放被中斷（`onerror: interrupted`），兩者都可能觸發 callback，造成流程重複執行。

**修復方式**：

加入 `callbackExecuted` 布林旗標與 `safeCallback` 包裝：
```javascript
let callbackExecuted = false;
const safeCallback = () => {
    if (!callbackExecuted) { callbackExecuted = true; callback(); }
};
utterance.onend = safeCallback;
utterance.onerror = (event) => {
    Game.Debug.log('speech', '🎙️ 語音播放錯誤:', event.error);
    safeCallback();
};
```

**修改檔案**：`js/a6_train_ticket.js`

---

### 2026-02-27：confetti setInterval → 遞迴 TimerManager 模式

**問題**：完成畫面煙火效果包在 `this.TimerManager.setTimeout` 回呼中，但內部的裸 `setInterval` 不受 TimerManager 管理，場景切換時 `TimerManager.clearAll()` 無法中途停止動畫計時器。

**修復**：將 `setInterval` 改為遞迴 `this.TimerManager.setTimeout(fireConfetti, 250, 'confetti')`，確保 `clearAll()` 或 `clearByCategory('confetti')` 可立即停止動畫。

**修改檔案**：`js/a6_train_ticket.js`

---

*報告更新時間：2026-02-27*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

## 2026-02-27（第三輪）：speak() safeCallback 備援超時修復

**問題**：`Speech.speak()` 的 `safeCallback` 區塊（行 2401–2418）僅依賴 `utterance.onend` 和 `utterance.onerror` 觸發 callback。若語音合成系統無聲失敗（既不觸發 onend 也不觸發 onerror），callback 永遠不執行，導致遊戲流程卡住。

**修復**：在 `if (callback && typeof callback === 'function')` 區塊內，`onerror` 設定之後加入：
```javascript
Game.TimerManager.setTimeout(safeCallback, 10000, 'speech');
```

**影響**：確保即使語音系統無聲失敗，callback 最多 10 秒後也會被強制觸發，避免遊戲流程永久阻塞。

**修改檔案**：`js/a6_train_ticket.js`

---

### 2026-02-28：輔助點擊遮罩全程常駐 + 層級修正

**舊設計問題**：遮罩在 `handleContinueClick()` 中動態建立（z-index:90），並在 `enableClickModeWithVisualDelay()` 的 3 處 `waitingForClick=true` 時移除。z-index:90 低於遊戲 modals（最高 10000），無法有效攔截 modal 區域的點擊。

**新設計**：
- 遮罩在 `ClickMode.bind()` 建立，`z-index: 10100`
- 移除 `enableClickModeWithVisualDelay()` 的 3 處 `?.remove()` 呼叫
- 移除 `handleContinueClick()` 中舊的建立行
- `ClickMode.unbind()` 開頭加入 `document.getElementById('click-exec-overlay')?.remove()`
- 只在 `showCompletionScreen()` 和 `unbind()` 時移除

**Z-index 層級**：遊戲 modals（最高 10000）→ 遮罩（10100）→ 標題列（10200）

**修改檔案**：`js/a6_train_ticket.js`（4 處動態操作改為常駐設計）、`css/a6_train_ticket.css`（`.title-bar` z-index: 100 → 10200）

---

### 2026-02-28
- `showCompletionScreen()` å  `_completionScreenShown` å®è¡é²éè¤å¼å«ï¼`startGame()` éç½®ææ¨çº `false`
- `handleClick(e)` å  `if (!e.isTrusted) return;`ï¼è®ç¨å¼è§¸ç¼çé»æï¼isTrusted=falseï¼ä¸è¢«ææª

---

*報告更新時間：2026-03-01*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

### 2026-02-28：張數調整按鈕序列 setInterval 改遞迴 TimerManager

**問題**：`autoAdjustCount()` 中增加/減少張數的按鈕連續點擊序列使用 `setInterval`（300ms），無法被 `TimerManager.clearAll()` 或 `clearByCategory('clickMode')` 立即停止。

**修復**：兩處 `const clickInterval = setInterval(...)` 均改為遞迴 `const doClick = () => { ...; Game.TimerManager.setTimeout(doClick, 300, 'clickMode') }`，確保 `clearByCategory('clickMode')` 可立即中斷按鈕點擊序列。

**修改檔案**：`js/a6_train_ticket.js`

---

### 2026-03-01：步驟6找零語音 callback 串接修復

**問題**：簡單模式步驟6（找零驗證），放置最後一枚硬幣後，「已找回XXX元」與「太棒了！找零金額正確！」兩段語音間以固定 300ms `TimerManager.setTimeout` 銜接。當找零金額較大（如 352 元，語音較長）時，第一段語音尚未播完就觸發第二段，造成語音重疊截斷。

**修復**：`handleEasyChangePlacement()` 中 `allDropped` 分支改用 Speech callback 串接：
```javascript
this.Speech.speak(`已找回${this.convertAmountToSpeech(cumulativeTotal)}`, {
    callback: () => {
        this.Speech.speak('太棒了！找零金額正確！');
    }
});
```
移除原本 300ms setTimeout，確保「已找回XXX元」完整播完後才銜接「太棒了」。

**修改檔案**：`js/a6_train_ticket.js`（`handleEasyChangePlacement`）

---

### 2026-03-01：輔助點擊步驟6找零圖示亮度修復

**問題**：輔助點擊模式步驟6，`executeNextChange()` 偵測點擊後高亮錢包中的金錢圖示時，只設定容器元素的 `opacity: 1` 與 class，但未設定內部 `<img>` 的 opacity，導致圖示看起來仍呈半透明（淡化），與簡單模式拖曳路徑不一致。

**修復**：`executeNextChange()` 高亮邏輯後補加：
```javascript
const targetImg = targetItem.querySelector('img');
if (targetImg) targetImg.style.opacity = '1';
```
與簡單模式拖曳路徑的 img opacity 設定完全一致。

**修改檔案**：`js/a6_train_ticket.js`（`executeNextChange`）

---

### 2026-03-01：步驟1-4按鈕播放 click.mp3

**問題**：步驟1（確認起迄站）、步驟2（車種選擇）、步驟3（張數選擇）、步驟4（確認訂單）各頁面的按鈕被點擊時，沒有播放 click.mp3 音效，回饋感不足。

**修復**：

1. **`playSound()` 新增 `'click'` 分支**：建立 `new Audio('../audio/click.mp3')`，volume 0.5，呼叫 `.play()`。

2. **12 處按鈕 handler 加入 `this.playSound('click')`**：
   - `dismissStepPopup()`（彈窗關閉）
   - `speakStationInfo()`（確認起迄站頁確認按鈕）
   - `speakTrainTypeInfo()`（車種選擇確認按鈕）
   - `speakTicketCountInfo()`（張數確認按鈕）
   - 車站 tab 點擊 handler
   - 出發站 station-btn click handler
   - confirm-departure-btn click handler
   - 抵達站 station-btn click handler
   - confirm-arrival-btn click handler
   - train-type-card click handler
   - 減少張數 minusBtn click handler
   - 增加張數 plusBtn click handler（+ confirmBtn 張數確認 + reset/confirm-order-btn）

**修改檔案**：`js/a6_train_ticket.js`（`playSound`、`dismissStepPopup`、`speakStationInfo`、`speakTrainTypeInfo`、`speakTicketCountInfo`、各 step handler）

---

*報告更新時間：2026-03-01*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

## 廢棄程式碼稽核（2026-03-01）

**稽核範圍**：`js/a6_train_ticket.js`（10,821 行）

### 結論：無需處理

| 類型 | 位置 | 內容 | 嚴重性 | 建議 |
|------|------|------|--------|------|
| TODO 注解 | Line 7873 | `// TODO: 可以添加錢包高亮提示` — 低優先度未實作功能記錄 | 低 | 評估是否需要實作 |
| 廢棄標記注解 | Line 5850 | `// 註：舊的自動高亮代碼已移除，改用新的提示系統（updateHints）` — 僅注解，無殘留 | 低 | 可保留作歷史記錄 |
| console.log | Lines 140–152 | Debug 系統定義內部呼叫 | — | 已受 FLAGS 守衛，無需處理 |

**整體評估**：整體程式碼品質高，無實際廢棄程式碼，僅有一個低優先度 TODO 注解。

---

## 跨輪計時器洩漏稽核（2026-03-03）

**稽核背景**：A3 單元曾發現 `speakText()` 10 秒備援計時器在下一輪觸發導致跳輪的 Bug，已對全系列交叉稽核。

**A6 稽核結論：安全（無此問題）**

| 條件 | 狀態 | 說明 |
|------|------|------|
| ① 新輪次從語音 callback 觸發 | 不成立 ✅ | 不適用 |
| ② interrupted 不呼叫 safeCallback | 不成立 ✅ | 不適用（條件③已保護） |
| ③ 新輪次函數無 clearAll() | **不成立 ✅** | `startGame()` 內有 `TimerManager.clearAll()`，新輪次開始時所有舊計時器被清除 |

**結論**：條件③不成立，備援計時器在新輪次開始時即被清除，bug 不可能發生。

---

## 語音速率統一 + 語音選擇優先順序更新（2026-03-04）

### 語音速率調整（rate → 1.0）

| 函數 | 舊 rate | 新 rate |
|------|---------|---------|
| `Speech.speak()` 主路徑 | 0.9 | 1.0 |

`utterance.rate` 為相對倍數，數值 1.0 表示使用語音引擎的原生預設語速，非固定 wpm。統一改為 1.0 使各語音在不同裝置上保持一致的自然語速。

### 語音選擇優先順序更新

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

## 錯誤邊界誤觸發 + DP RangeError 防護（2026-03-07）

### 問題 1：音訊載入失敗誤觸發錯誤邊界（`a6_train_ticket.html`）

**症狀**：頁面載入時音訊資源載入失敗觸發 `window.error`，但 `event.error === null`（非 JS 執行錯誤），錯誤邊界誤觸發、遊戲畫面被隱藏。console 顯示「JavaScript 錯誤: null」。

**修復**（`html/a6_train_ticket.html`）：
```javascript
window.addEventListener('error', function(event) {
    if (!event.error) return; // event.error=null 為資源載入失敗，忽略
    console.error('JavaScript 錯誤:', event.error);
    document.getElementById('error-boundary').style.display = 'flex';
    document.getElementById('loading-screen').style.display = 'none';
});
```

搜尋關鍵字：`a6_train_ticket.html` → `if (!event.error) return`

---

### 問題 2：`calculateOptimalPayment` RangeError 防護

**症狀**：`Uncaught RangeError: Invalid array length` 出現於 `a6_train_ticket.js:6881`（修復前行號）。當 `ticketProcess.totalPrice` 未初始化（`undefined`），`undefined * ticketCount = NaN`，`totalCost = NaN`，`new Array(NaN + 1)` 拋出 `RangeError`。

**根因**：`calculateOptimalPayment(targetAmount, ...)` 及內部 `findExactPayment(target, ...)` 無輸入驗證，直接使用 `target` 建立 DP 陣列。

**修復**：
```javascript
// calculateOptimalPayment 入口防護
if (!targetAmount || typeof targetAmount !== 'number' || isNaN(targetAmount) || targetAmount <= 0) {
    Game.Debug.warn('payment', '❌ [A6-付款計算] 無效的目標金額，跳過計算:', targetAmount);
    return null;
}

// findExactPayment 內部防護
function findExactPayment(target, coinsList, counts) {
    if (!target || isNaN(target) || target <= 0 || target > 100000) return null;
    const dp = new Array(target + 1).fill(null);
    // ...
}
```

搜尋關鍵字：`calculateOptimalPayment`, `❌ [A6-付款計算] 無效的目標金額`

---

## playSound 裸 console.log → Debug.warn 修復（2026-03-09）

**問題**：`playSound()`、`playCorrectSound()`、`playErrorSound()` 三個函數於音效播放失敗（`.catch(err => ...)`）時，使用 8 處裸 `console.log('⚠️ ...')` 記錄錯誤，遊離於 `Game.Debug.FLAGS` 分類系統之外，無法透過 FLAGS 開關管控。

**修復**：將 8 處 `console.log('⚠️ ...', err)` 全部改為 `Game.Debug.warn('sound', '⚠️ ...', err)`，納入 `DEBUG.FLAGS.sound` 管控。

**修改**：`js/a6_train_ticket.js`（2026-03-09，8 處 playSound/playCorrectSound/playErrorSound 的 catch handler）

**搜尋關鍵字**：`Game.Debug.warn('sound'` in `js/a6_train_ticket.js`

---

## _visualDelayTimer 裸 clearTimeout 修復（2026-03-09）

**問題**：輔助點擊模式視覺延遲計時器 `clickState._visualDelayTimer` 由 `Game.TimerManager.setTimeout()` 建立（返回內部計數器 ID），但清除時使用裸 `clearTimeout(clickState._visualDelayTimer)`，無法真正清除，輔助點擊模式可能因殘留計時器觸發而卡住。

**修復**：改為 `Game.TimerManager.clearTimeout(clickState._visualDelayTimer)`。

**修改**：`js/a6_train_ticket.js`（搜尋 `_visualDelayTimer` 的清除處）

---

## 普通模式付款步驟錯誤退幣 + 3次後勾勾提示（2026-03-10）

### 問題

普通模式（預設模式 + 自由購票模式）第五步付款頁面有兩個問題：

1. **付款錯誤後金錢不退回**：欠款或超額付款時，付款區的金錢圖示維持原位，需使用者手動拖回錢包。
2. **提示方式不一致**：
   - 欠款路徑 3次後只語音說「還需要N元」，`// TODO: 可以添加錢包高亮提示` 未實作。
   - 超額路徑 3次後呼叫 `highlightPaymentMoney(moneyToReturn)` 顯示紅色×，與提示鈕（勾勾）行為不同。

### 根因

`validatePayment()` 函數兩條錯誤路徑均未呼叫 `returnAllPaidMoney()`。`showPaymentHint()`（提示鈕）已有完整邏輯（退幣 + 計算最佳組合 + 勾勾 + 語音），但錯誤路徑未複用此邏輯。

另外 `showPaymentHint()` 內部有 100ms `TimerManager.setTimeout` 計時器，若直接呼叫，使用者在計時器觸發前的點擊可能使 wallet DOM 更新，導致 `showWalletHintWithTicks` 找不到目標元素（同 A3 的 async 競態問題）。因此修復時直接同步執行提示邏輯，不呼叫 `showPaymentHint()`。

### 修復（`js/a6_train_ticket.js`，`validatePayment()` 函數）

**欠款路徑**：
```javascript
// 退回所有金錢到錢包
this.returnAllPaidMoney();

if (errorCount >= 3) {
    // 同步執行提示鈕相同邏輯
    const allAvailableMoney = [...this.state.gameState.playerWallet];
    const optimalPayment = this.calculateOptimalPayment(targetCost, allAvailableMoney);
    if (optimalPayment && optimalPayment.length > 0) {
        // 建立語音文字（同 showPaymentHint()）
        let speechText = `建議付款：`;
        // ...
        this.showWalletHintWithTicks(optimalPayment.map(val => ({ value: val })));
        this.Speech.speak(speechText, { interrupt: true });
    }
} else {
    this.Speech.speak('付款金額不足，請重新付款');
}
```

**超額路徑**：相同模式，移除 `highlightPaymentMoney(moneyToReturn)`，改為 `returnAllPaidMoney()` + 3次後同步勾勾提示。

**搜尋關鍵字**：`validatePayment`（`js/a6_train_ticket.js`）、`付款金額不足，請重新付款`

---

## 修復：步驟6輔助點擊模式確認找零改為等待學生點擊（2026-03-14）

### 問題

步驟6（找回零錢）輔助點擊模式放置完所有零錢圖示後，程式自動點擊「確認找零」按鈕，學生沒有機會自己點。

### 修復內容

**JS（`js/a6_train_ticket.js`）**

`executeNextChange()` 中兩個路徑（`currentIndex >= changeQueue.length` 與 `allDropped`），原本直接 `confirmBtn.click()`，改為：
1. 顯示並啟用 `#confirm-change-btn`
2. `Game.TimerManager.setTimeout(() => Game.highlightConfirmButton('confirm-change-btn'), 300, 'hint')`
3. `this.enableClickModeWithVisualDelay('ChangeConfirm')` — 等待學生點擊

`handleContinueClick()` 新增分支：當 `phase === 'change'` 且 `currentStep >= actionQueue.length` 時，設 `isAutomatedClick = true` 後點擊 `confirm-change-btn`。

**CSS（`css/a6_train_ticket.css`）**

`.confirm-btn-hint::before`：橘色外框（`#FF9800`），距元素 10px，`confirmBoxFramePulse` 動畫。

**注意事項**

ClickMode 物件方法中 `this` ≠ Game，必須用 `Game.TimerManager`、`Game.highlightConfirmButton`（不可用 `this.`）。

搜尋：`executeNextChange`、`ChangeConfirm`、`confirm-change-btn`、`confirmBoxFramePulse`

## 修復：觸控端找零拖曳無法作動（2026-03-15）

### 問題

觸控裝置上步驟6（找回零錢）的 `.easy-change-money` 元素無法拖曳。Console 顯示：

```
❌ 元素不符合快速檢查條件，忽略touchstart
```

### 根因分析

`touch-drag-utility.js` 的 quickCheck 選擇器（第 255、522 行）已包含 `.easy-change-money`，**JS 檔案本身正確**。

問題根因：`html/a6_train_ticket.html` 引用 `touch-drag-utility.js` **沒有版本參數**，而其他單元（c3~c6、f3~f4）已加 `?v=2.1`。瀏覽器因此讀取快取中的舊版本（不含 `.easy-change-money` 的舊 quickCheck），導致拖曳被靜默拒絕。

### 修復內容

**HTML（`html/a6_train_ticket.html`）**

```html
<!-- 修前 -->
<script src="../js/touch-drag-utility.js"></script>
<!-- 修後 -->
<script src="../js/touch-drag-utility.js?v=2.2"></script>
```

**同步修正（其他未加版本參數的 HTML）**

| 檔案 | 修前 | 修後 |
|------|------|------|
| `html/a3_mcdonalds_order.html` | 無參數 | `?v=2.2` |
| `html/a4_simulated_shopping.html` | 無參數 | `?v=2.2` |
| `html/f1_object_correspondence.html` | 無參數 | `?v=2.2` |
| `html/f2_rote_and_rational_counting.html` | 無參數 | `?v=2.2` |
| `html/f6_number_composition.html` | 無參數 | `?v=2.2` |

已有 `?v=2.1` 的單元（c3~c6、f3、f4）維持不變（快取版本無問題）。

搜尋：`touch-drag-utility.js?v=2.2`、`easy-change-money`
