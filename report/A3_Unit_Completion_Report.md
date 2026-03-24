# A3 麥當勞自助點餐單元 — 完成經驗報告書

> **建立日期**：2026-02-09（日）
> **更新日期**：2026-03-14（簡單模式步驟3/5/6「點這裡」提示動畫 + 方框；步驟5無需找零按鈕提示）
> **專案名稱**：Money Tutor 金錢教學系統
> **單元編號**：A3 — 麥當勞自助點餐機
> **報告類型**：單元完成經驗與開發建議

---

## 一、檔案規模總覽

| 檔案 | 路徑 | 行數 | 大小 |
|------|------|------|------|
| HTML 頁面 | `html/a3_mcdonalds_order.html` | 252 行 | 8.3 KB |
| JS 核心邏輯 | `js/a3_mcdonalds_order.js` | 9,691 行 | 456 KB |
| CSS 樣式 | `css/a3_mcdonalds_order.css` | 1,721 行 | — |
| 作業單產生器 | `worksheet/units/a3-worksheet.js` | 410 行 | — |
| **合計** | — | **12,074 行** | — |

### 素材資源

| 類型 | 數量 | 路徑 | 總大小 |
|------|------|------|--------|
| 餐點圖片 | 83 張 PNG | `images/a3/icon-a3-*.png` | 46.3 MB |
| 錢幣圖片 | 18 張 PNG（9面額×正反面） | `images/money/*_yuan_front/back.png` | 共用 |
| 音效檔案 | 1 種（success.mp3） | `audio/*.mp3` | 共用 |

### 與 A1、A2 規模比較

| 項目 | A1 販賣機 | A2 理髮廳 | A3 麥當勞 | A3 vs A1 | A3 vs A2 |
|------|----------|----------|----------|----------|----------|
| JS 行數 | 6,080 | 8,163 | 9,691 | +59% | +19% |
| HTML 行數 | 31 | 450 | 252 | +713% | -44% |
| CSS 行數 | 821 | 3,136 | 1,721 | +110% | -45% |
| 合計行數 | 7,290 | 12,090 | 12,074 | +66% | ≈同 |
| 圖片數量 | 19 張 | 10 張 | 83 張 | +337% | +730% |
| 圖片總大小 | — | 2.4 MB | 46.3 MB | — | +1,829% |
| 餐點/服務品項 | 19 飲料 | 6 服務 | 70 餐點 | +268% | +1,067% |

---

## 二、單元特色

### 2.1 完整模擬麥當勞自助點餐機體驗

A3 是 A 系列中**品項最豐富、流程最完整**的單元，模擬了速食店自助點餐機的完整操作流程：

1. **瀏覽菜單** → 在 4 個分類中切換瀏覽
2. **選擇餐點** → 加入購物車，可調整數量
3. **結帳下單** → 確認訂單並進入付款
4. **投幣/紙鈔付款** → 從錢包中選取金錢投入
5. **找零選擇**（普通/困難模式）→ 從三個選項中選出正確找零
6. **取餐** → 餐盤動畫 + 食物出現效果

### 2.2 三種難度模式

| 模式 | 名稱 | 特點 |
|------|------|------|
| **簡單模式** | 引導式操作 | 每一步都有視覺＋語音提示，購物車有高亮引導 |
| **普通模式** | 半引導式 | 自己操作，錯誤 3 次後自動出現提示 |
| **困難模式** | 完全自主 | 無自動提示，需靠自己完成整個點餐流程 |

### 2.3 兩種任務類型

| 類型 | 說明 |
|------|------|
| **指定任務** | 系統隨機指定餐點與數量，學習者必須找到並加入購物車 |
| **自選模式** | 學習者自由選擇喜歡的餐點 |

### 2.4 場景管理系統（SceneConfig / SceneManager）

A3 是 A 系列中**首個採用場景管理系統**的單元，使用 `onEnter` / `onExit` 生命週期鉤子管理場景切換：

| 場景名稱 | 用途 | onEnter | onExit |
|---------|------|---------|--------|
| `settings` | 設定頁面 | `showSettings()` | console log |
| `welcome` | 歡迎頁面 | `showWelcomePage1()` | console log |
| `ordering` | 菜單點餐 | `renderOrderingUI()` | 解除觸控事件、重設捲動 |
| `payment` | 付款場景 | — | console log |
| `calculation` | 金額計算 | `renderCalculationSceneUI()` | 取消語音合成 |
| `change` | 找零選擇 | — | console log |
| `pickup` | 取餐完成 | — | console log |

**切換機制**：`SceneManager.switchScene(newScene, context)` 依序執行：當前場景 `onExit` → 更新狀態 → 新場景 `onEnter`。

### 2.5 四類別分頁菜單系統

A3 擁有 A 系列中最龐大的品項資料庫，70 種餐點分為 4 類：

| 類別 | 名稱 | 品項數 | 鍵盤快捷鍵 |
|------|------|--------|-----------|
| burgers | 🍔 經典漢堡 | 20 | 1 |
| sides | 🍟 美味配餐 | 14 | 2 |
| drinks | 🥤 清涼飲品 | 17 | 3 |
| desserts | 🍦 繽紛甜點 | 19 | 4 |
| **合計** | — | **70** | — |

菜單使用 5 欄 CSS Grid 排列（桌面版），RWD 下自動縮減至單欄。每個品項含 emoji 與圖片（`images/a3/icon-a3-*.png`），優先顯示圖片、fallback 用 emoji。

### 2.6 黃色餐盤動畫系統

A3 獨有的**擬真餐盤 CSS**，模擬麥當勞黃色塑膠餐盤：

- 黃色漸層背景（`linear-gradient`）
- 左右把手挖孔（`::before` / `::after` 偽元素）
- 內凹表面效果
- 食物出現動畫（`foodAppear` 0.5s ease-out）

餐盤 CSS 內嵌於 JS 檔案中（搜尋關鍵字：`food-tray`）。

### 2.7 找零三選一機制

普通模式和困難模式下，付款完成後進入找零選擇：

- `generateChangeOptions(expectedChange)` 產生 3 個選項（1 正確 + 2 錯誤）
- 錯誤選項策略：50% 多找（+5~20 元）/ 50% 少找（-1~10 元）
- 找零為 0 元時，錯誤選項隨機生成 5~39 元
- 選項以錢幣圖片呈現，使用 `shuffleArray()` 隨機排列
- `handleChangeOption()` 驗證選擇結果

### 2.8 輔助點擊模式（Click Mode）

專為**特殊需求學習者**設計的無障礙功能：

- 啟用條件：僅限簡單模式 + 指定任務
- 畫面上任何地方按一下即執行下一步操作
- 依階段建立操作佇列：
  - **ordering 階段**：selectItem → ... → checkout
  - **payment 階段**：payMoney → ... → confirmPayment
  - **change 階段**：collectChange → ... → confirmChange
  - **pickup 階段**：直接完成
- 防快速連點鎖定時間：600ms
- 使用 `isExecuting` 旗標防止競態條件

### 2.9 錢包系統

| 面額 | 圖片 | 說明 |
|------|------|------|
| 1,000 元 | 正/反面 | 紙鈔 |
| 500 元 | 正/反面 | 紙鈔 |
| 100 元 | 正/反面 | 硬幣 |
| 50 元 | 正/反面 | 硬幣 |
| 10 元 | 正/反面 | 硬幣 |
| 5 元 | 正/反面 | 硬幣 |
| 1 元 | 正/反面 | 硬幣 |

7 種面額共 14 張圖片，每枚隨機顯示正面或反面。

### 2.10 Loading 畫面與 Error Boundary

與 A2 相同的穩定性設計（A1 無此功能）：

- **Loading 畫面**：旋轉載入動畫 + 文字「美式速食點餐系統載入中...」，頁面載入後 1.5 秒自動消失
- **Error Boundary**：全域錯誤捕捉，顯示「系統發生錯誤」訊息 + 重新載入按鈕，含 `role="alert"` 無障礙標記

### 2.11 作業單系統

獨立的紙本作業單產生器，提供 **10 種題型**（A 系列共用架構）：

| # | 題型 | 說明 |
|---|------|------|
| 1 | 數字填空（價格計算） | 計算多樣餐點總價 |
| 2 | 填空與選擇（價格計算） | 填空＋選正確金錢組合 |
| 3 | 圖示選擇（價格計算） | 從 3 組金錢圖示中勾選正確的 |
| 4 | 提示選擇（價格計算） | 同上，選項旁加金額提示 |
| 5 | 提示完成（價格計算） | 填寫各幣值所需數量 |
| 6 | 數字填空（找零計算） | 計算付款後的找零 |
| 7 | 填空與選擇（找零計算） | 找零填空＋選正確金錢組合 |
| 8 | 圖示選擇（找零計算） | 勾選正確找零組合 |
| 9 | 提示選擇（找零計算） | 附金額提示的找零選擇 |
| 10 | 提示完成（找零計算） | 填寫各幣值找零數量 |

**A3 作業單特點**：
- 作業單內建 80 個餐點品項（4 類別各 20 個），價格與遊戲完全一致
- 使用單一 `for` 迴圈處理所有 10 種題型
- 每題隨機 2~3 樣餐點組合
- `_itemImg()` 方法渲染餐點圖片，含 `onerror` fallback 至 emoji

---

## 三、語音系統使用分析

### 3.1 技術實現

使用 **Web Speech API**（`window.speechSynthesis`），搭配 `SpeechSynthesisUtterance` 物件：

```
語音引擎初始化流程：
1. 檢測瀏覽器支援 → 2. 取得語音清單 → 3. 優先選台灣中文語音 → 4. 設置語速
```

**語音優先順序**：
1. Microsoft HsiaoChen（Windows 台灣女聲）
2. Google 國語（Chrome 台灣語音）
3. 其他 zh-TW 語音
4. 任何中文語音（fallback）

### 3.2 語音速率配置

A3 採用**雙速率設計**，依場景切換：

| 語速 | 用途 |
|------|------|
| **1.2x** | 品項名稱、商品加入、一般提示（較快節奏） |
| **0.9x** | 付款金額、找零金額、完成訊息（較慢清晰） |

此設計與 A1（標準速率）和 A2（0.9~0.95x 統一慢速）皆不同。

### 3.3 模板化語音系統（speechTemplates）

A3 的語音系統為**完全模板化**，各難度有獨立語音腳本：

**主要模板鍵值**：

| 模板鍵 | 說明 | 佔位符 |
|--------|------|--------|
| `welcomePage1` | 歡迎頁面第一段 | — |
| `welcome` | 歡迎進入點餐 | — |
| `instructions` | 操作說明 | — |
| `welcomeFreeChoice` | 自選模式歡迎 | — |
| `overBudget` | 超過預算提醒 | `{budget}` |
| `walletInfo` | 錢包資訊 | `{total}` |
| `categorySelected` | 選擇類別 | `{category}` |
| `paidAmount` | 已付金額 | `{paid}`, `{remaining}` |
| `collectedAmount` | 已收金額 | `{amount}` |
| `itemAdded` | 加入餐點 | `{item}`, `{price}` |
| `itemRemoved` | 移除餐點 | `{item}` |
| `cartUpdated` | 購物車更新 | `{total}` |
| `checkout` | 結帳確認 | `{total}` |
| `orderComplete` | 訂單完成 | — |
| `cartEmpty` | 購物車空 | — |
| `pickupComplete` | 取餐完成 | — |
| `categoryAssignment` | 指定類別（普通/困難） | `{item}`, `{category}` |
| `wrongItem` | 選錯品項（普通/困難） | `{item}` |
| `paymentInsufficient` | 付款不足（普通/困難） | `{remaining}` |
| `selectChangeAmount` | 選擇找零（普通/困難） | `{change}` |

**合計約 20 個語音模板鍵值**。

### 3.4 語音觸發時機一覽

| 場景 | 語音內容範例 | 觸發時機 |
|------|-------------|---------|
| 歡迎畫面 | 「歡迎來到美式速食自助點餐機」 | 進入歡迎頁後 |
| 操作說明 | 「請選擇您想要的餐點」 | 說明頁面 |
| 指定任務 | 「請到{category}類別選擇{item}」 | 任務彈窗出現 |
| 加入餐點 | 「已加入{item}，價格{price}元」 | 加入購物車 |
| 移除餐點 | 「已移除{item}」 | 從購物車移除 |
| 購物車更新 | 「目前總計{total}元」 | 購物車內容變動 |
| 結帳確認 | 「總共{total}元，請付款」 | 按下結帳按鈕 |
| 付款中 | 「已付{paid}元，還需{remaining}元」 | 每次投幣/紙鈔 |
| 超過預算 | 「已超過預算{budget}元」 | 購物車超額 |
| 找零選擇 | 「請選擇正確的找零金額」 | 進入找零畫面 |
| 選錯品項 | 「選錯了，請選擇指定的{item}」 | 選錯時 |
| 取餐完成 | 「請取走您的餐點」 | 完成取餐 |
| 完成挑戰 | 「完成挑戰！共完成X題」 | 結束畫面 |

### 3.5 金額語音轉換

使用 `NumberSpeechUtils.convertToChineseNumber()` 處理中文金額唸法：

| 金額 | 語音輸出 | 說明 |
|------|---------|------|
| 2 元 | 「兩元」 | 2 + 單位用「兩」 |
| 12 元 | 「拾貳元」 | 個位 2 用「貳」 |
| 39 元 | 「參拾玖元」 | 標準中文數字 |
| 200 元 | 「兩百元」 | 百位 2 用「兩」 |
| 500 元 | 「伍佰元」 | 標準中文數字 |

### 3.6 語音 Bug — 未定義語音模板

A3 存在 **2 個未定義的語音模板**，會導致語音播放失敗：

| 模板鍵 | 問題 | 影響 |
|--------|------|------|
| `correct` | `speechTemplates` 中未定義此模板 | 正確操作時無語音回饋 |
| `completeChallenge` | `speechTemplates` 中未定義此模板 | 完成挑戰時無語音播報 |

### 3.7 語音注意事項

- **行動裝置限制**：iOS/Android 需要使用者互動後才能啟用語音（已由 `audio-unlocker.js` 處理）
- **語音佇列管理**：使用 `interrupt` 選項可打斷前一句語音，避免語音堆積
- **付款語音防抖**：使用 `paymentSpeechTimer` / `changeSpeechTimer` 搭配 `clearTimeout` 避免語音重疊
- **場景切換清理**：`calculation` 場景的 `onExit` 會取消正在播放的語音合成

---

## 四、觸控與桌面支援

### 4.1 桌面端支援

- 標準滑鼠點擊操作
- hover 效果（餐點項目、按鈕、錢幣）
- **鍵盤快捷鍵**：
  - 數字鍵 `1`~`4`：切換菜單類別（漢堡/配餐/飲品/甜點）
  - `Enter`：確認操作
  - `Escape`：取消/返回

### 4.2 觸控端支援

- **Viewport 設定**：`width=device-width, initial-scale=1.0`
- **觸控拖曳工具**：A3 引用 `touch-drag-utility.js`（A1、A2 不引用）
- **觸控音效解鎖**：引用 `audio-unlocker.js`
- **行動裝置除錯面板**：引用 `mobile-debug-panel.js`（HTML 內嵌 inline script 方式）

### 4.3 防快速連點（Debounce）機制

A3 使用 `timingConfig` 設定物件統一管理延遲時間，依難度不同：

| 設定項 | 簡單模式 | 普通模式 | 困難模式 |
|--------|---------|---------|---------|
| `speechDelay` | 500ms | 300ms | 200ms |
| `animationDuration` | 1000ms | 800ms | 600ms |
| `cartUpdateDelay` | 300ms | 200ms | 100ms |
| `checkoutDelay` | 2000ms | 1500ms | 1000ms |

**專用防抖計時器**：
- `paymentSpeechTimer`：付款語音防抖
- `changeSpeechTimer`：找零語音防抖
- `_visualDelayTimer`：視覺延遲防抖
- Click Mode：600ms `isExecuting` 鎖定

### 4.4 ARIA 標籤與無障礙

| 元素 | ARIA 屬性 | 值 |
|------|----------|---|
| `#loading-screen` | `aria-label` | 「美式速食點餐系統載入中」 |
| `#app` | `role` | `main` |
| `#app` | `aria-label` | 「美式速食自助點餐主要內容」 |
| `#app` | `aria-live` | `polite`（動態添加） |
| `#error-boundary` | `role` | `alert` |

### 4.5 與 A1、A2 的觸控支援比較

| 項目 | A1 販賣機 | A2 理髮廳 | A3 麥當勞 |
|------|----------|----------|----------|
| 音效解鎖 | 自行實現 | `audio-unlocker.js` | `audio-unlocker.js` |
| 除錯面板 | 不引用 | `mobile-debug-panel.js` | 內嵌 inline |
| 主題系統 | 不引用 | `theme-system.js` | `theme-system.js` |
| 鍵盤快捷鍵 | 無 | 1-6、Enter、Escape | 1-4、Enter、Escape |
| 拖曳工具 | 不引用 | 不引用 | `touch-drag-utility.js` |
| Loading | 無 | 有 | 有 |
| Error Boundary | 無 | 有 | 有 |
| ARIA | 基本 | 完整 | 完整 |

---

## 五、不同版面（RWD 響應式設計）

### 5.1 響應式斷點

A3 擁有 A 系列中**最多的 RWD 斷點**（8 個），涵蓋從手機到 4K 觸控螢幕：

| 斷點 | 範圍 | 版面配置 |
|------|------|---------|
| **4K 螢幕** | ≥2560px | 超大觸控優化，加大字型與間距 |
| **大型觸控螢幕** | ≥1920px | 70 吋觸控螢幕優化 |
| **桌面版** | >1200px | 5 欄菜單 Grid |
| **中螢幕** | 769~1200px | `auto-fit, minmax(250px, 1fr)` |
| **平板** | 601~768px | `auto-fit, minmax(280px, 1fr)` |
| **平板橫向** | ≤768px 橫向 | `auto-fit, minmax(220px, 1fr)` |
| **大手機** | 481~600px | 單欄（`1fr`） |
| **小手機** | ≤480px | 單欄 + 進一步縮小 |

另有 `prefers-contrast: high` 高對比模式支援。

### 5.2 菜單 Grid 佈局轉換

| 斷點 | Grid 設定 | 欄數 |
|------|----------|------|
| 桌面版 | `repeat(5, 1fr)` | 5 欄 |
| ≤1200px | `auto-fit, minmax(250px, 1fr)` | 3~4 欄 |
| ≤768px | `auto-fit, minmax(280px, 1fr)` | 2~3 欄 |
| 橫向 ≤768px | `auto-fit, minmax(220px, 1fr)` | 3 欄 |
| ≤600px | `1fr` | 1 欄 |

### 5.3 與 A1、A2 的 RWD 比較

| 項目 | A1 販賣機 | A2 理髮廳 | A3 麥當勞 |
|------|----------|----------|----------|
| RWD 斷點數 | 3 | 4 | **8** |
| 最大螢幕支援 | 1024px+ | 1200px+ | **2560px+（4K）** |
| 佈局系統 | Grid（auto-fill） | Flex（三面板） | Grid（5→1欄） |
| 高對比模式 | 無 | 有 | 有 |
| 大型觸控螢幕 | 不支援 | 不支援 | **1920px + 2560px 優化** |

### 5.4 設定頁面版面

- 居中白色卡片，最大寬度 600px
- 按鈕群組使用 flex-wrap，自動換行
- 在小螢幕上堆疊顯示

### 5.5 完成畫面版面

- 紫色漸層全螢幕背景
- 居中卡片最大寬度 500px
- 統計卡片使用 `grid-template-columns: repeat(2, 1fr)`
- 垂直置中顯示（`min-height: 100vh` + flexbox）

---

## 六、動畫系統

### 6.1 CSS @keyframes 動畫清單（CSS 檔案，16 個）

| 動畫名稱 | 效果 | 時長 | 用途 |
|----------|------|------|------|
| `spin` | 360° 旋轉 | 1s 循環 | Loading 旋轉器 |
| `slideUp` | 上滑淡入 | 0.6s | 內容進場 |
| `fadeIn` | 淡入 | 0.3s | 通用淡入 |
| `slideInFromLeft` | 左滑淡入 | 0.6s | 左側內容進場 |
| `slideInFromRight` | 右滑淡入 | 0.6s | 右側內容進場 |
| `addToCartPulse` | 縮放脈衝 | 0.6s | 加入購物車 |
| `bounceHintMcD` | Y 軸彈跳 | 1s 循環 | 菜單提示彈跳 |
| `breathingOutlineMcD` | 輪廓呼吸脈衝 | 2s 循環 | 菜單項目提示 |
| `breathingBorderMcD` | 邊框呼吸脈衝 | 2s 循環 | 邊框提示 |
| `pulseCheckoutOutline` | 輪廓脈衝 | 1.5s 循環 | 結帳按鈕提示 |
| `bounceDownMcD` | Y 軸下彈 | 1s 循環 | 下方提示箭頭 |
| `pulseCartOverBudget` | 輪廓警告脈衝 | 1s 循環 | 超預算警告 |
| `bounceHint` | Y 軸微彈 | 0.6s | 通用提示彈跳 |
| `shakeError` | X 軸搖晃 | 0.5s | 錯誤搖晃 |
| `pulseCorrectTick` | 縮放發光 | 1s 循環 | 正確打勾脈衝 |
| `pulseErrorX` | 縮放發光 | 1s 循環 | 錯誤叉號脈衝 |

### 6.2 JS 動畫（已整合至 injectGlobalAnimationStyles，14 個）

> **2026-02-22 更新**：所有 JS 內嵌動畫已遷移至 `injectGlobalAnimationStyles()` 統一函數

| 動畫名稱 | 效果 | 時長 | 用途 |
|----------|------|------|------|
| `bounceIn` | 彈入 | 0.3s | 彈窗出現 |
| `fadeInCenterScale` | 中心淡入縮放 | 0.5s | 輔助點擊模式提示 |
| `payment-target-pulse` | 付款目標脈衝 | 循環 | 付款區域高亮 |
| `checkmarkPop` | 打勾彈出 | 0.3s | 正確操作 |
| `correctPopIn` | 正確彈入 | 0.5s | 正確反饋 |
| `wrongPopOut` | 錯誤彈出 | 0.8s | 錯誤反饋 |
| `fadeOutBtn` | 按鈕淡出 | — | 按鈕消失 |
| `checkBounce` | 打勾彈跳 | 0.5s | 找零提示 |
| `clickPromptPulse` | 脈衝（opacity） | 1.5s 循環 | 點擊提示 |
| `pickupIconPulse` | 脈衝（scale） | 2s 循環 | 取餐圖示 |
| `foodAppear` | 食物出現 | 0.5s | 餐盤食物動畫 |
| `celebrate` | 慶祝彈跳旋轉 | 1s | 完成畫面 |
| `bounce` | 上下彈跳 | 循環 | 完成畫面 emoji |
| `fadeInUp` | 淡入上移 | 0.6s | 內容進場 |

**依賴 CSS 定義的動畫**：`fadeIn`、`slideUp`（由 CSS 檔案提供）

### 6.3 動畫總數比較

| 項目 | A1 販賣機 | A2 理髮廳 | A3 麥當勞 |
|------|----------|----------|----------|
| CSS @keyframes | 14 | 8 | **16** |
| JS 內嵌動畫 | 2 | — | **14** |
| **動畫總數** | **16** | **8** | **~24（最多）** |

### 6.4 Canvas-Confetti 煙火效果

| 觸發場景 | 粒子數 | 持續時間 |
|---------|--------|---------|
| 完成挑戰 | 50×n（漸減） | 3 秒 |

煙火效果使用 A 系列標準實現：
- 左右雙向發射（x: 0.1~0.3 / 0.7~0.9）
- 每 250ms 發射一輪
- 粒子數隨時間遞減

---

## 七、注意事項

### 7.1 瀏覽器相容性

| 功能 | Chrome | Safari | Firefox | Edge |
|------|--------|--------|---------|------|
| Web Speech API | 完整支援 | 部分支援 | 部分支援 | 完整支援 |
| Canvas-Confetti | 完整支援 | 完整支援 | 完整支援 | 完整支援 |
| CSS Grid (5欄) | 完整支援 | 完整支援 | 完整支援 | 完整支援 |
| CSS Variables | 完整支援 | 完整支援 | 完整支援 | 完整支援 |
| Touch Events | 完整支援 | 完整支援 | 完整支援 | 完整支援 |
| Audio autoplay | 需互動 | 需互動 | 需互動 | 需互動 |

- **Safari 語音**：中文語音選擇有限，可能退回系統預設語音
- **Firefox**：`speechSynthesis.getVoices()` 需要透過 `onvoiceschanged` 事件才能取得語音清單

### 7.2 行動裝置注意事項

- iOS Safari 必須在使用者互動後才能播放音效（已由 `audio-unlocker.js` 處理）
- 觸控裝置不支援 hover 效果，部分視覺回饋會缺失
- 小螢幕上菜單從 5 欄縮為 1 欄，需要較多捲動
- 長語音在部分 Android 機型上可能被系統中斷
- 70 種餐點圖片（共 46.3 MB）在行動裝置上可能造成載入緩慢

### 7.3 教學使用注意事項

- **自選模式**下不計算對錯，完成畫面無表現評價
- **簡單模式**的輔助點擊模式僅支援指定任務（非自選）
- 70 種餐點品項豐富但可能造成選擇困難，教師可引導學習者聚焦特定類別
- **錢包金額**需足以支付選購餐點，否則無法完成付款
- **找零三選一**僅出現在普通和困難模式，簡單模式自動處理找零

### 7.4 已知限制

- **圖片資源龐大**：83 張 PNG 共 46.3 MB，單張最大 1.8 MB（egg-burger），建議壓縮
- **鍵盤快捷鍵**：類別快捷鍵 1~4 已在 `menuConfig` 中定義但未完整綁定事件處理器
- **自訂金額**：程式碼中有 `TODO: 顯示自訂金額輸入框` 標記，功能尚未實作

### 7.5 狀態管理現況

| 項目 | 狀態 |
|------|------|
| TimerManager | ✅ 已實現（2026-02-17） |
| EventManager | ✅ 已實現（2026-02-17） |
| injectGlobalAnimationStyles | ✅ 已實現（2026-02-22） |
| 統一重置函數 | ❌ 無（不需要） |
| 布林旗標 | `isProcessing`（1 個） |
| 重置位置 | 集中（1 處） |
| 評價 | ✅ **最佳實踐** |

**說明**：A3 單元已實現 TimerManager/EventManager 記憶體管理模式，並已完成動畫定義整合，符合 F 系列標準。

**搜尋關鍵字**：`TimerManager`、`EventManager`、`isProcessing`、`injectGlobalAnimationStyles`

---

## 八、Bug 檢測與已知問題

### 8.1 已確認的程式碼問題

| # | 嚴重度 | 問題描述 | 位置 | 狀態 |
|---|--------|---------|------|------|
| 1 | **高** | 2 個未定義語音模板（`correct`、`completeChallenge`） | 搜尋 `correct`、`completeChallenge` | ✅ 已修正 |
| 2 | **高** | 68 個 `setTimeout` vs 僅 4 個 `clearTimeout` | 分散於 JS 全檔 | ✅ TimerManager |
| 3 | **高** | 49 個 `addEventListener` vs 僅 10 個 `removeEventListener` | 分散於 JS 全檔 | ✅ EventManager |
| 4 | **中** | 201 個 `console.log` 除錯語句殘留 | 分散於 JS 全檔 | ✅ Debug Logger FLAGS 系統重構完成（246 個 console 統一管理，2026-02-21） |
| 5 | **中** | 圖片命名不一致（見 8.2 詳述） | `images/a3/` 目錄 | 🔲 暫緩 |
| 6 | **中** | 73 個 CSS `!important` + 3 個 JS inline `!important` | CSS 檔 + JS 檔 | 🔲 暫緩 |
| 7 | **中** | CSS `bounceHintMcD` 動畫重複定義 | `css/a3_mcdonalds_order.css` | ✅ 已修正 |
| 8 | **低** | 部分餐盤 CSS 內嵌於 JS 檔案中 | 搜尋 `food-tray` | 🔲 暫緩 |
| 9 | **低** | `speechSynthesis` 的 `voiceschanged` 監聽器 | 搜尋 `voiceschanged` | ✅ 已修正 |
| 10 | **建議** | 鍵盤快捷鍵 1~4 已定義但未完整綁定 | `menuConfig.categories` | 🔲 暫緩 |

### 8.2 圖片命名問題（嚴重度：中）

83 張圖片中存在以下命名不一致：

| 問題類型 | 數量 | 範例 |
|---------|------|------|
| 檔名截斷 | 1 | `icon-a3-double-special-sauce-beef-burge.png`（缺少尾端 `r`） |
| 檔名有尾隨空格 | 1 | `icon-a3-french-fries-medium .png`（`.png` 前有空格） |
| 大小寫不一致 | 1 | `icon-a3-French-Fries-Medium.png`（應為全小寫） |
| 重複檔案 | 2 | `icon-a3-double-special-sauce-beef-burger.png` 出現 2 次 + `*1.png` 舊版 |
| 內容重複 | 2 | `icon-a3-chicken-strips.png` 與 `icon-a3-chicken-wings.png` 完全相同（581,671 bytes） |

**影響**：
- 尾隨空格和大小寫問題在區分大小寫的檔案系統上（Linux/macOS）會導致圖片載入失敗
- 重複檔案浪費儲存空間

### 8.3 與 A1、A2 的 Bug 數量比較

| 問題類型 | A1 | A2 | A3 |
|---------|-----|-----|-----|
| console.log | — | 66 | **201** |
| 未清理 setTimeout | — | 42 | **64** |
| 未移除 addEventListener | — | — | **39** |
| !important | — | 48 | **76** |
| 價格不一致 | 無 | **有** | 無 |
| 未定義語音模板 | 無 | 無 | **2 個** |
| 圖片命名問題 | 無 | 無 | **5 個** |

### 8.4 非 Bug 但需注意的設計

| 項目 | 說明 |
|------|------|
| 單一檔案 9,691 行 | A 系列最大的 JS 檔案，含 SceneConfig、menuConfig、speechTemplates 等大型設定物件 |
| 餐盤 CSS 內嵌 JS | 應移至 CSS 檔案統一管理 |
| 圖片資源 46.3 MB | 83 張 PNG 未壓縮，行動裝置載入緩慢 |
| 雙語速設計 | 1.2x / 0.9x 切換可能讓使用者感覺不一致 |

---

## 九、未來開發建議

### 9.1 模組化拆分（最高優先）

**問題：JS 檔案 9,691 行，A 系列之最**

A3 的核心 JS 將 SceneConfig、menuConfig（70 品項）、speechTemplates、付款邏輯、找零邏輯、Click Mode、動畫等全部集中在單一檔案中。

**建議的拆分結構**：

```
js/
├── a3/
│   ├── a3-main.js              # 入口、初始化、SceneManager（~500 行）
│   ├── a3-config.js            # menuConfig、speechTemplates、timingConfig、ModeConfig（~2,000 行）
│   ├── a3-settings.js          # 設定頁面邏輯（~700 行）
│   ├── a3-scene-manager.js     # SceneConfig、場景切換管理（~500 行）
│   ├── a3-ordering.js          # 菜單瀏覽、購物車、結帳（~1,500 行）
│   ├── a3-payment.js           # 投幣/紙鈔、付款邏輯（~800 行）
│   ├── a3-change.js            # 找零三選一（~400 行）
│   ├── a3-click-mode.js        # 輔助點擊模式（~600 行）
│   ├── a3-hints.js             # 提示系統（~500 行）
│   ├── a3-ui-render.js         # 畫面渲染、餐盤動畫（~1,200 行）
│   ├── a3-audio-speech.js      # 音效與語音管理（~400 行）
│   └── a3-animations.js        # 動畫、CSS 注入（~300 行）
```

### 9.2 setTimeout / addEventListener 管理器

**問題**：68 個 setTimeout 僅 4 個 clearTimeout；49 個 addEventListener 僅 10 個 removeEventListener。

**建議**：

```javascript
// 定時器管理器
const TimerManager = {
    _timers: new Set(),

    setTimeout(fn, delay) {
        const id = setTimeout(() => {
            this._timers.delete(id);
            fn();
        }, delay);
        this._timers.add(id);
        return id;
    },

    clearAll() {
        this._timers.forEach(id => clearTimeout(id));
        this._timers.clear();
    }
};

// 場景切換時統一清理
SceneManager.switchScene = (newScene, context) => {
    TimerManager.clearAll();
    controller.abort(); // AbortController 清理監聽器
    // ... 執行場景切換
};
```

### 9.3 Console.log 清理

**問題**：201 個 `console.log`，A 系列最多。

**建議**：

```javascript
const DEBUG = false;
function debugLog(...args) {
    if (DEBUG) console.log('[A3-McD]', ...args);
}
```

- **保留**：系統初始化完成提示
- **轉為 debugLog**：場景切換追蹤、購物車操作、付款過程
- **移除**：臨時除錯用途的 log

### 9.4 圖片資源優化

**問題**：83 張 PNG 共 46.3 MB，單張最大 1.8 MB。

**建議**：
- 將所有圖片壓縮至 128×128px PNG 透明背景（建議大小 < 50 KB/張）
- 目標總大小 < 5 MB（壓縮比 89%）
- 修正命名問題（尾隨空格、截斷檔名、大小寫不一致）
- 刪除重複檔案（`*1.png` 舊版、完全相同的 chicken-strips/chicken-wings）
- 使用 WebP 格式進一步壓縮（保留 PNG fallback）

### 9.5 CSS 重構

**問題**：
1. 76 處 `!important`
2. `bounceHintMcD` 重複定義
3. 餐盤 CSS 內嵌在 JS 中

**建議**：
- 將餐盤 CSS 從 JS 移至 `a3_mcdonalds_order.css`
- 減少 `!important`，改用更高特異性的選擇器
- 刪除重複的 `bounceHintMcD` 定義
- 共用動畫（`fadeIn`、`celebrate`、`bounce`）提取至 `css/common-animations.css`

### 9.6 語音模板修正

**問題**：`correct` 和 `completeChallenge` 模板未定義。

**建議**：在 `speechTemplates` 各難度中補充：

```javascript
speechTemplates: {
    easy: {
        // ... 現有模板
        correct: '做得好！',
        completeChallenge: '恭喜！完成所有挑戰！'
    },
    normal: {
        correct: '正確！',
        completeChallenge: '太棒了！完成所有挑戰！'
    },
    hard: {
        correct: '正確！',
        completeChallenge: '優秀！完成所有挑戰！'
    }
}
```

### 9.7 場景管理系統改進

A3 的 SceneConfig/SceneManager 是 A 系列的重要架構創新，建議進一步完善：

- **補充所有場景的 onEnter/onExit**：目前 `payment`、`change`、`pickup` 場景的 onEnter 為空
- **增加場景驗證**：防止非法場景切換（如從 `welcome` 直接跳到 `change`）
- **標準化清理邏輯**：每個場景的 `onExit` 都應清理定時器和監聯器
- **推廣至其他單元**：A1、A2 可參考 A3 的場景管理架構重構

### 9.8 鍵盤快捷鍵完善

**問題**：`menuConfig.categories` 中定義了 `keyShortcut: '1'~'4'`，但未完整綁定事件處理器。

**建議**：
- 綁定全域 `keydown` 事件，根據當前場景分派快捷鍵
- 在菜單場景：1~4 切換類別
- 在付款場景：數字鍵選擇面額
- 在找零場景：1~3 選擇找零選項
- 顯示快捷鍵提示（如按鈕上標示 `[1]`）

### 9.9 死碼清理

| 需清理項目 | 估計行數 | 說明 |
|-----------|---------|------|
| TODO 未實作的自訂金額 | ~5 行 | 移除或實作 |
| 未綁定的 keyShortcut 定義 | ~10 行 | 綁定或移除 |
| **建議清理總計** | **~15 行** | 比 A1（200 行）和 A2（50 行）少 |

### 9.10 未來新單元開發 Checklist（A3 新增項目）

在 A1 報告的 20 項 checklist 基礎上，A3 新增以下建議：

```
□ 21. 場景管理使用 SceneConfig/SceneManager 架構（含 onEnter/onExit 生命週期）
□ 22. 圖片檔名統一小寫，無空格、無截斷
□ 23. 所有 setTimeout 有對應的清理機制（TimerManager 或 clearTimeout）
□ 24. 所有 addEventListener 有對應的移除機制（AbortController 或 removeEventListener）
□ 25. 語音模板完整定義，無未定義的模板鍵
□ 26. 圖片單張 < 50 KB，總大小 < 5 MB
□ 27. console.log 使用 DEBUG 旗標控制
□ 28. CSS !important 控制在 20 個以內
```

---

## Bug 修正記錄（2026-02-10）

| # | 問題 | 嚴重度 | 修正狀態 |
|---|------|--------|---------|
| 1 | 2 個未定義語音模板（correct、completeChallenge） | 高 | ✅ 三個難度均補充模板 |
| 2 | 64 個 setTimeout 未清理 | 高 | ✅ 已修正（2026-02-17 TimerManager） |
| 3 | 39 個 addEventListener 未移除 | 高 | ✅ 部分修正（2026-02-17 EventManager） |
| 4 | 201 個 console.log 殘留 | 中 | ✅ Debug Logger FLAGS 系統重構完成（246 個 console 統一管理，2026-02-21） |
| 5 | 圖片命名不一致（5 個） | 中 | 🔲 暫緩（涉及檔案重命名） |
| 6 | 76 處 CSS !important | 中 | 🔲 暫緩（CSS 重構） |
| 7 | CSS bounceHintMcD 動畫重複定義 | 中 | ✅ 刪除被覆蓋的第一個定義 |
| 8 | 餐盤 CSS 內嵌 JS | 低 | 🔲 暫緩（CSS 遷移） |
| 9 | voiceschanged 監聯器從未移除 | 低 | ✅ 加入 { once: true } |
| 10 | 鍵盤快捷鍵未完整綁定 | 建議 | 🔲 暫緩（功能擴充） |
| — | Click Mode 全局事件未解除 | 中 | ✅ 新增 unbindClickModeHandler() |
| — | alert() 阻塞操作（15 處） | 中 | ✅ 新增 showToast() + 全部替換 |

**統計**：已確認問題 10 個 + 額外 2 個（8 個已修正、4 個暫緩）

---

## 十、總結

### A3 麥當勞的優勢

1. **品項最豐富**：70 種餐點分 4 類，A 系列之最，模擬真實麥當勞點餐機體驗
2. **場景管理架構**：首創 SceneConfig/SceneManager 生命週期設計，A 系列最成熟的架構
3. **RWD 最完善**：8 個斷點覆蓋手機到 4K 觸控螢幕，含大型觸控螢幕（1920px+, 2560px+）優化
4. **動畫最豐富**：~24 種動畫（16 CSS + 14 JS），含獨有的餐盤食物出現動畫
5. **觸控拖放支援**：引用 `touch-drag-utility.js`，支援拖放投幣（A1/A2 不支援）
6. **找零三選一**：獨特的三選一找零機制，增添互動性
7. **作業單價格一致**：與遊戲完全同步（A2 有不一致 Bug）
8. **餐盤視覺設計**：擬真黃色餐盤 CSS，提升沉浸感
9. **CSS 變數系統**：13 個 McDonald's 品牌色彩變數 + 7 個外部主題變數
10. **設定驅動設計**：timingConfig 依難度自動調整延遲，擴展性佳

### A3 麥當勞的待改進處

1. **單一檔案最大**（10,357 行）→ 建議模組化拆分為 12 個子模組
2. ~~**2 個未定義語音模板**~~ → ✅ 已修正（2026-02-10）
3. **201 個 console.log**（A 系列最多）→ 建議清理或改用 DEBUG 模式
4. **64 個未清理 setTimeout** → 建議使用 TimerManager
5. **39 個未移除 addEventListener** → 建議使用 AbortController
6. **圖片 46.3 MB 過大** → 建議壓縮至 < 5 MB
7. **5 個圖片命名問題** → 須修正空格、截斷、大小寫
8. **76 個 !important** → 建議減少
9. **餐盤 CSS 內嵌 JS** → 建議移至 CSS 檔案
10. **鍵盤快捷鍵未完整綁定** → 建議完善或移除

### A1 / A2 / A3 架構比較表

| 面向 | A1 販賣機 | A2 理髮廳 | A3 麥當勞 | 最佳 |
|------|----------|----------|----------|------|
| 程式碼總量 | 7,290 行 | 12,090 行 | 12,740 行 | A1（最精簡） |
| JS 單檔大小 | 6,080 行 | 8,163 行 | 10,357 行 | A1（最精簡） |
| 品項/服務數 | 19 飲料 | 6 服務 | 70 餐點 | A3（最豐富） |
| 圖片資源 | 19 張 | 10 張 | 83 張 / 46.3 MB | A2（最精簡） |
| 設定驅動程度 | 部分 | 完全 | 完全（含 SceneConfig） | A3（最完整） |
| 語音系統 | 直接撰寫 | 模板驅動 | 模板驅動 + 雙語速 | A2/A3 |
| 場景管理 | 無 | 無 | SceneConfig/SceneManager | **A3（獨有）** |
| RWD 斷點 | 3 個 | 4 個 | 8 個（含 4K） | **A3（最完善）** |
| 動畫數量 | 16 | 8 | ~24 | **A3（最豐富）** |
| 觸控拖放 | 不支援 | 不支援 | 支援 | **A3（獨有）** |
| 鍵盤快捷鍵 | 無 | 1-6, Enter, Esc | 1-4, Enter, Esc | A2（最完整） |
| 無障礙 | 基本 | ARIA + Loading + Error | ARIA + Loading + Error | A2/A3 |
| 自訂內容 | 魔法商品 | 無 | 魔法商品 | **A1、A3** |
| Loading/Error | 無 | 有 | 有 | A2/A3 |
| 找零機制 | 逐枚取回 | 不找零 | **三選一** | A3（最有互動性） |
| console.log | — | 66 | 201 | A2（較少） |
| !important | — | 48 | 76 | A2（較少） |
| 未清理 setTimeout | — | 42 | 64 | A2（較少） |
| 語音 Bug | 無 | 無 | 2 個未定義模板 | A1/A2 |
| 價格一致性 | 一致 | 不一致 | 一致 | A1/A3 |
| 死碼量 | ~200 行 | ~50 行 | ~15 行 | **A3（最少）** |

### 對後續單元開發的影響

A3 在 A 系列中引入了兩項重要的架構創新：

1. **SceneConfig / SceneManager**：生命週期管理（`onEnter` / `onExit`）使場景切換更加結構化，建議 A1、A2 及後續新單元參考此架構重構。

2. **大型觸控螢幕 RWD**（1920px+ / 2560px+）：A3 是首個支援 70 吋觸控螢幕和 4K 螢幕的單元，此設計可推廣至所有單元。

然而，A3 也暴露了單一檔案過大（9,691 行）帶來的維護困難，以及圖片資源未壓縮（46.3 MB）的效能問題。後續開發應以 A3 的架構為基礎，但嚴格控制檔案大小（建議單檔不超過 2,000 行）和圖片資源（建議單張 < 50 KB）。

---

## 十一、A3 特殊實作說明（2026-03-22 移入）

### 11.1 餐盤 CSS

餐盤元素使用 `::before` / `::after` 模擬把手，黃色漸層背景。
**搜尋關鍵字**：Grep `tray` 或 `餐盤`

### 11.2 餐點圖片渲染（8 處套用）

```javascript
${(item.imageUrl||item.image)
  ? `<img src="${item.imageUrl||item.image}" onerror="this.style.display='none'">`
  : item.emoji}
```
- 魔法商品（自訂上傳）用 `imageUrl`；內建餐點用 `image`

### 11.3 A3 魔法商品（自訂餐點上傳）

**State 結構**（存於 `state.settings`，多輪遊戲持續保留）：
```javascript
customItems: { burgers: [], sides: [], drinks: [], desserts: [] }
// 每項：{ id, name, description, price, imageUrl, emoji:'✨', image:null, category, isCustom:true }
```

**關鍵函數**：

| 函數 | 說明 |
|------|------|
| `getAllCategoryItems(category)` | 合併 `menuConfig.items[category]` + `customItems[category]`，供菜單與指定任務共用 |
| `renderCustomItemsPanel(category)` | 渲染設定頁「自訂餐點」面板（上限每類 3 種） |
| `switchCustomItemsTab(category)` | 切換 4 個類別 tab |
| `handleCustomItemImageUpload(event, category)` | 讀取圖片 → 壓縮 → prompt 輸入名稱/價格 → 新增 |
| `confirmAddCustomItem(imageUrl, category)` | 彈窗確認按鈕回呼，建立項目並推入 `customItems` |
| `removeCustomItem(category, index)` | 移除指定自訂餐點 |
| `compressCustomItemImage(base64)` | Canvas 壓縮至 200px / JPEG 0.7 |
| `setEasyModeCustomItemPrices()` | 簡單模式動態定價（price===0 時依類別範圍隨機整數） |

**整合位置**：`generateAssignedItems()`、`HTMLTemplates.menuItems()`、`nextPage()`/`navigateToItemPage()`、`addToCart()`（含 `currentScene !== 'ordering'` 場景守衛）

**防重複呼叫**：`showCompletionSummary()` 以 `_completionSummaryShown` 旗標防止 callback 二次觸發（在 `startOver/restartAllQuestions/backToSettings` 重置）

---

## Bug 修正記錄（2026-02-13）

| # | 問題 | 嚴重度 | 修正狀態 |
|---|------|--------|---------|
| 5 | 圖片命名不一致（5 個） | 中 | 🔲 → ✅ 部分修正 |

### 圖片檔案清理詳情

**問題**：`images/a3/` 目錄存在 3 個與 `french-fries-medium` 相關的問題檔案：

| 檔案名稱 | 問題 | 處理方式 |
|---------|------|---------|
| `icon-a3-french-fries-medium .png` | 尾隨空格 | 已刪除 |
| `icon-a3-French-Fries-Medium.png` | 大小寫不一致 | 已刪除 |
| `icon-a3-french-fries-medium.png` | 正確命名 | 新建（從 large 版本複製） |

**修正結果**：
- 圖片總數：81 → 80 張（刪除 2 個問題檔案，新建 1 個正確檔案）
- 程式碼引用的 `icon-a3-french-fries-medium.png` 現在可正確載入

---

## Bug 修正記錄（2026-02-15）

| # | 問題 | 嚴重度 | 修正狀態 |
|---|------|--------|---------|
| 1 | 測驗完成時間顯示 0 秒 | 高 | ✅ 已修正 |
| 2 | 標題列步驟編號重複（步驟5 出現兩次） | 中 | ✅ 已修正 |

### 測驗完成時間修正

**問題**：完成測驗後，總結頁面的「完成時間」始終顯示 0 秒。

**根本原因**：`startGame()` 函數中缺少 `this.state.gameState.startTime = Date.now()` 設置。`startTime` 只在 `restartAllQuestions()` 和 `backToSettings()` 中設置，首次開始遊戲時未設置。

**修正位置**：`js/a3_mcdonalds_order.js` 第 2315-2316 行

```javascript
// 🔧 [修正] 記錄測驗開始時間（修正完成時間顯示為0秒的問題）
this.state.gameState.startTime = Date.now();
```

### 標題列步驟編號修正

**問題**：困難模式 + 自選購買餐點完成後，標題列顯示順序為：
- 步驟1，選擇餐點 → 步驟2，完成訂單 → 步驟3，櫃檯付款 → 步驟4，計算找零金額 → **步驟5，確認找零 → 步驟5，點餐完成**（重複）

**修正**：將「點餐完成」從步驟5改為步驟6。

**修正位置**：`js/a3_mcdonalds_order.js` 第 7349 行

```javascript
// 修正前
${this.HTMLTemplates.titleBar(5, '點餐完成')}

// 修正後
${this.HTMLTemplates.titleBar(6, '點餐完成')}
```

---

*報告完成時間：2026-02-09*
*報告產生者：Claude Code (claude-opus-4-6)*
*最後更新：2026-02-15（測驗時間修正、標題列步驟修正）*

---

## 驗證記錄

### 2026-02-21：Debug Logger FLAGS 分類開關系統

**版本更新**：v1.3.0 → v1.4.0

**重構內容**：將所有 console.log/warn/error 呼叫轉換為 Debug FLAGS 分類開關系統

**轉換統計**：
- **總轉換數量**：246 個 Debug 呼叫
- **內部保留**：3 個 console 呼叫（Debug.log/warn/error 內部實現）

**FLAGS 分類（14 個）**：

| FLAG | 說明 | 範例日誌標籤 |
|------|------|-------------|
| `all` | 全域開關 | - |
| `init` | 初始化 | 📦 [A3-McDonald] 版本 |
| `state` | 狀態管理 | [Setting], [A3-McDonald-防重複] |
| `ui` | UI 渲染 | 🎨 [A3-計算場景UI] |
| `audio` | 音效 | 播放音效失敗 |
| `speech` | 語音 | [A3-RepeatVoice] |
| `coin` | 金錢相關 | - |
| `payment` | 付款驗證 | 🎯 [A3-櫃檯付款], [A3-計算] |
| `product` | 餐點選擇 | - |
| `flow` | 遊戲流程 | [A3-McDonald], 🎬 [場景管理] |
| `assist` | 輔助點擊模式 | [A3-ClickMode] |
| `hint` | 提示系統 | ✅ [A3-打勾提示], 🔥 [A3-錯誤提示] |
| `timer` | 計時器 | 🧹 [A3-McDonald] TimerManager |
| `event` | 事件處理 | 🧹 [A3-McDonald] EventManager, 📱 觸控 |
| `error` | 錯誤（預設開啟） | - |

**使用方式**：
```javascript
// 開啟單一分類
McDonald.Debug.FLAGS.payment = true;

// 開啟全部
McDonald.Debug.FLAGS.all = true;
```

**驗證結果**：
- Console 無多餘日誌輸出（除 error 外）✅
- FLAGS 開關切換正常運作 ✅
- 原有功能不受影響 ✅

---

### 2026-02-16：系統性驗證

**驗證內容**：

| 項目 | 狀態 | 說明 |
|------|------|------|
| TimerManager | ✅ 已修正 | 2026-02-17 完成 |
| EventManager | ✅ 已修正 | 2026-02-17 完成 |
| injectGlobalAnimationStyles | ✅ 已修正 | 2026-02-22 完成 |
| 完成畫面 | ✅ 正常 | 採用 A 系列統一完成畫面樣式 |
| confetti 煙火 | ✅ 正常 | 使用 v1.9.2 本地化版本 |
| startTime 記錄 | ✅ 正常 | 2026-02-15 已修正 |

**結論**：A3 已達 F 系列記憶體管理標準，所有基礎設施完備。

---

### 2026-02-17：記憶體管理重構完成

**重構內容**：TimerManager/EventManager 三階段重構

| Phase | 內容 | 統計 |
|-------|------|------|
| Phase 1 | TimerManager/EventManager 基礎設施 | 新增 2 個管理器 |
| Phase 2 | setTimeout 遷移 | 66 個調用遷移至 TimerManager |
| Phase 3 | addEventListener 遷移 | 7 個調用遷移至 EventManager |

**Phase 2 setTimeout 分類**：

| 類別 | 數量 | 說明 |
|------|------|------|
| `speechDelay` | 8 | 語音播放延遲 |
| `uiAnimation` | 25 | UI 動畫、視覺效果 |
| `screenTransition` | 10 | 場景切換 |
| `clickMode` | 20 | 輔助點擊模式 |
| `audioCallback` | 3 | 音頻系統回調 |
| **總計** | **66** | |

**Phase 3 addEventListener 分類**：

| 類別 | 數量 | 說明 |
|------|------|------|
| `settingsUI` | 3 | 設定頁面按鈕、獎勵連結、作業單連結 |
| `gameUI` | 4 | 計算場景輸入框、計算機、確認按鈕、完成獎勵連結 |
| **總計** | **7** | |

**保留原有方式的 addEventListener（43 個）**：
- DOMContentLoaded（1）：初始化事件
- EventManager 定義（1）：內部實現
- 音頻解鎖（5）：`once: true` 自清理
- 拖曳事件（22）：配合 cloneNode 重置機制
- 數字鍵盤（5）：動態創建、自清理
- 計算機按鈕（1）：cloneNode 重置
- Click mode（1）：手動 bind/unbind
- 橫幅提示（4）：`once: true` 自清理
- 觸控事件（3）：手動 unbindTouchEvents()

**版本更新**：v1.1.0 → v1.3.0

**驗證狀態**：

| 項目 | 狀態 | 說明 |
|------|------|------|
| TimerManager | ✅ 已實現 | 66 個 setTimeout 遷移 |
| EventManager | ✅ 已實現 | 7 個 addEventListener 遷移 |
| clearAll() 調用 | ✅ 已設置 | showSettings() 中調用 |
| removeByCategory() 調用 | ✅ 已設置 | showSettings() 中調用 |

**結論**：A3 已達 F 系列記憶體管理標準。

---

---

### 2026-02-22：動畫定義整合

**版本更新**：v1.4.0 → v1.5.0

**整合目標**：將分散在 JS 各處的 @keyframes 動畫定義整合至統一的 `injectGlobalAnimationStyles()` 函數

**新增函數**：`injectGlobalAnimationStyles()` — 在 `init()` 中呼叫，注入 `<style id="a3-global-animations">` 元素

**整合統計**：

| 來源 | 移除數量 | 說明 |
|------|---------|------|
| JS 內嵌 @keyframes | 19 個 | 遷移至統一函數 |
| 動態 style 注入 | 7 處 | 移除 createElement('style') 程式碼 |

**整合後的動畫清單（14 個）**：

| 動畫名稱 | 用途 | 時長 |
|---------|------|------|
| `bounceIn` | 數字輸入彈窗彈跳出現 | 0.3s |
| `fadeInCenterScale` | 輔助點擊模式中心淡入縮放 | 0.5s |
| `payment-target-pulse` | 付款目標脈衝 | 循環 |
| `checkmarkPop` | 勾勾彈出 | 0.3s |
| `correctPopIn` | 正確答案彈入 | 0.5s |
| `wrongPopOut` | 錯誤答案彈出 | 0.8s |
| `fadeOutBtn` | 按鈕淡出 | — |
| `checkBounce` | 找零提示勾勾彈跳 | 0.5s |
| `clickPromptPulse` | 點擊提示脈衝 | 1.5s 循環 |
| `fadeInUp` | 向上淡入 | 0.6s |
| `pickupIconPulse` | 取餐圖示脈衝 | 2s 循環 |
| `foodAppear` | 食物出現 | 0.5s |
| `celebrate` | 完成畫面慶祝 | 1s |
| `bounce` | 彈跳動畫 | 循環 |

**重命名處理**（避免與 CSS 定義衝突）：

| 原名稱 | 新名稱 | 原因 |
|-------|-------|------|
| `pulse`（opacity 版） | `clickPromptPulse` | CSS 已有 pulse 定義 |
| `pulse`（scale 版） | `pickupIconPulse` | CSS 已有 pulse 定義 |
| `fadeIn`（帶縮放版） | `fadeInCenterScale` | CSS 已有簡單 fadeIn |

**保留在 CSS 的動畫（16 個）**：
- `spin`, `slideUp`, `fadeIn`, `slideInFromLeft`, `slideInFromRight`
- `addToCartPulse`, `breathingOutlineMcD`, `breathingBorderMcD`, `bounceHintMcD`
- `pulseCheckoutOutline`, `bounceDownMcD`, `pulseCartOverBudget`
- `bounceHint`, `shakeError`, `pulseCorrectTick`, `pulseErrorX`

**驗證結果**：
- JS 檔案內所有動態 @keyframes 注入已移除 ✅
- 動畫引用已更新為新名稱 ✅
- 全局樣式注入正常運作 ✅
- 原有功能不受影響 ✅

---

### 2026-02-24（第二輪）：稽核結果

**第二輪全面稽核結論（無新增可修復 Bug）**：

- ✅ 完成畫面符合 A 系列標準
- ✅ 作業單連結不傳 count 參數
- ✅ `injectGlobalAnimationStyles()` 正確實作
- ⚠️ A3 EventManager 使用不完整（36 個拖曳/選單等處理器未追蹤）：主要是拖曳和菜單選擇事件；由於這些事件都綁定在動態 DOM 元素上（每題重新渲染時元素更換），實際記憶體洩漏風險有限

---

### 2026-02-24：作業單連結統一簡化（僅傳 unit 參數）

**修改內容**：

- 作業單連結原本傳遞遊戲設定參數（`difficulty`）
- 各作業單已有完整工具列，用戶開啟後可直接在工具列調整；遊戲設定與作業單設定應獨立運作
- **修復**：移除所有多餘參數，統一改為只傳 `unit` 參數，讓作業單完全使用自己的預設値

**修改檔案**：`js/a3_mcdonalds_order.js`

---

---

### 2026-02-25：拖曳去背修復（setDragImage）+ 多指觸控誤觸修復

**問題 1 — 桌面端拖曳預覽含背景色**

拖曳圖示時，瀏覽器預設以完整元素截圖作為拖曳預覽（含背景色、邊框），視覺上不夠清晰。

**修復**：A3 有 4 個拖曳場景，各自加入 setDragImage ghost：
- 錢包金錢拖曳（wallet → payment area）
- 已付款金錢拖曳（paid coin → return area）
- 付款格拖曳（payment slot）
- 找零金錢拖曳（change coin）
- ghost `<span>` 透明背景，`fontSize` 改用 `getComputedStyle(element).fontSize` 取得實際渲染尺寸

**問題 2 — 多指觸控時拖曳失敗**

觸控拖曳時若使用者意外放置第二根手指，第二根手指的 `touchend` 被 `handleTouchEnd` 處理，`findDropZoneAt` 返回 null → `cleanupDrag()` 重置拖曳狀態，實際拖曳手指抬起時 `isDragging = false`，物件未能放入放置框。

**修復（`js/touch-drag-utility.js`，跨單元共用）**：
- `handleTouchStart`：`touchState` 新增 `touchIdentifier: touch.identifier`
- `handleTouchMove`：優先以 `touchIdentifier` 找到對應手指，fallback 到 `touches[0]`
- `handleTouchEnd`：先以 `touchIdentifier` 過濾；非拖曳手指的 touchend 記錄 `⚠️` 後 `return`，不重置拖曳狀態
- `cleanupDrag`：`touchState` 重置時加入 `touchIdentifier: undefined`

**修改檔案**：
- `js/a3_mcdonalds_order.js`（4 個 dragstart handler 加入 setDragImage ghost）
- `js/touch-drag-utility.js`（touchIdentifier 過濾，跨單元共用）

---

### 2026-02-26：拖曳去背 `Game` 命名空間錯誤修復

**問題描述**：

桌面端拖曳金錢圖示時，dragstart 處理函數呼叫 `Game.TimerManager.setTimeout()`，但 A3 的主物件命名空間為 `McDonald`（不是 `Game`），導致拋出 `Uncaught ReferenceError: Game is not defined`。錯誤被 HTML 全域 error handler 捕獲，顯示「美式速食點餐系統錯誤: null」並跳出錯誤邊界畫面。

**根因**：

拖曳去背修復（2026-02-25 加入）時，沿用了其他單元（C/F/A4/A6 系列）的 `Game.TimerManager.setTimeout` 寫法，但 A3 不存在 `Game` 物件。

**影響位置（4 處）**：

| 場景 | 修復前 | 修復後 |
|------|--------|--------|
| 錢包金錢拖曳（dragstart） | `Game.TimerManager.setTimeout(...)` | `McDonald.TimerManager.setTimeout(...)` |
| 已付款金錢拖曳（dragstart）| `Game.TimerManager.setTimeout(...)` | `McDonald.TimerManager.setTimeout(...)` |
| 付款格拖曳（dragstart）| `Game.TimerManager.setTimeout(...)` | `McDonald.TimerManager.setTimeout(...)` |
| 找零金錢拖曳（dragstart）| `Game.TimerManager.setTimeout(...)` | `McDonald.TimerManager.setTimeout(...)` |

**修改檔案**：`js/a3_mcdonalds_order.js`（全部以 `replace_all` 批次替換）

---

---

### 2026-02-26（補充）：`setDragImage` 觸控防護（4 處）

**問題描述**：

`TouchDragUtility` 以 `TouchEvent` 觸發 `onDragStart` 回呼，`TouchEvent` 無 `dataTransfer` 屬性。A3 中 4 個 dragstart handler 直接呼叫 `e.dataTransfer.setDragImage()`，在觸控裝置上會拋出 TypeError。

**修改內容**：

- `js/a3_mcdonalds_order.js`：4 處 `setDragImage` 呼叫各包覆 `if (e.dataTransfer && typeof e.dataTransfer.setDragImage === 'function')` 防護
  - 24-space indent 版本 × 2（已付款金錢、找零金錢 dragstart handler）
  - 28-space indent 版本 × 2（付款格 dragstart handler）
- 以 `replace_all: true` 批次替換同縮排模式字串

**修改檔案**：`js/a3_mcdonalds_order.js`

---

### 2026-02-26：11-19 元語音唸法稽核確認（無修改）

**稽核結果**：A3 使用配置驅動模板語音系統，`{total}` / `{price}` 等金額替換鍵在 `speech.speak()` 內部透過 `NumberSpeechUtils.convertToChineseNumber(value)` → `convertToTraditionalCurrency()` 轉換。共用模組 `number-speech-utils.js` 已於 2026-02-26 補入 11-19 的 specialCases，A3 自動受益，無需額外修改。

---

---

### 2026-02-27：魔法商品功能實作（A3 自訂餐點上傳）

**版本更新**：v1.5.0 → v1.6.0

**功能描述**：比照 A1 的「魔法商品」概念，在設定頁面可對 4 個類別（漢堡/配餐/飲品/甜點）各自上傳自訂餐點圖片，自訂餐點加入題目候選池（指定購買模式）及菜單顯示（自選購買模式）。

#### 新增 State 欄位

```javascript
state.settings.customItems: { burgers: [], sides: [], drinks: [], desserts: [] }
// 每項結構：{ id, name, description, price, imageUrl, emoji:'✨', image:null, category, isCustom:true }
```

存於 `settings`（非 `gameState`），多輪遊戲中持續保留，不受 `resetGameState` 清除。

#### 新增函數（10 個）

| 函數 | 說明 |
|------|------|
| `getAllCategoryItems(category)` | 合併 `menuConfig.items[category]` + `customItems[category]` |
| `renderCustomItemsPanel(category)` | 產生設定頁面板 HTML（上限每類 3 種） |
| `switchCustomItemsTab(category)` | 切換 4 個類別 tab，呼叫 renderCustomItemsPanel |
| `compressCustomItemImage(base64)` | Canvas 縮至 200px / JPEG 0.7，回傳 Promise\<string> |
| `handleCustomItemImageUpload(event, category)` | 讀取檔案 → 壓縮 → 顯示彈窗 |
| `showCustomItemInputModal(imageUrl, category)` | 渲染名稱/價格輸入彈窗（position:fixed，stopPropagation） |
| `closeCustomItemInputModal()` | 移除彈窗 DOM |
| `confirmAddCustomItem(imageUrl, category)` | 讀取輸入值 → 建立物件 → push → 刷新面板 |
| `removeCustomItem(category, index)` | splice 指定項目 → 刷新面板 |
| `setEasyModeCustomItemPrices()` | 簡單模式 price===0 時依類別範圍動態定價 |

#### 動態定價範圍（簡單模式）

| 類別 | 範圍 | 步進 |
|------|------|------|
| burgers | 45–80 元 | 5 元 |
| sides | 25–55 元 | 5 元 |
| drinks | 20–45 元 | 5 元 |
| desserts | 25–55 元 | 5 元 |

#### 整合修改

| 修改位置 | 說明 |
|---------|------|
| `generateAssignedItems()` | 候選池：`menuConfig.items[category]` → `getAllCategoryItems(category)` |
| `initializeGameData()` | 簡單模式在 `generateAssignedItems()` 前呼叫 `setEasyModeCustomItemPrices()` |
| `HTMLTemplates.menuItems()` | 第一行改為 `getAllCategoryItems(categoryId)` |
| `nextPage()` | 分頁項目數改用 `getAllCategoryItems` |
| `navigateToItemPage()` | 導航頁碼計算改用 `getAllCategoryItems` |
| `addToCart()` | 查找餐點改用 `getAllCategoryItems` |
| 8 處圖片渲染 | `item.image ?` → `(item.imageUrl\|\|item.image) ?`，並加 onerror 防護 |
| `showCategoryAssignmentModal()` | 彈窗圖片改用 `imageUrl\|\|image` |

#### 設定頁面 UI

在任務類型與錢包金額之間插入「✨ 自訂餐點：」setting-group，含 4 個類別 tab 按鈕 + `#custom-items-panel` 容器。初始化時顯示飲品 tab（`switchCustomItemsTab('drinks')`）。

---

### 2026-02-27：語音 / 購物車 / 完成畫面 Bug 修復（第三輪）

**修復問題清單**：

| # | 問題 | 根因 | 修復方式 |
|---|------|------|---------|
| 1 | 上傳魔法商品彈窗輸入時播放奇怪語音 | `showSettings()` 未取消語音；modal 未 stopPropagation | `showSettings()` 加 `speechSynthesis.cancel()`；modal 加 `onclick/ontouchstart/ontouchend stopPropagation` |
| 2 | `pickupComplete` 語音 callback 雙觸發（wrongItem 播放兩次） | `speech.speak()` 的 `utterance.onend` 與 `onerror` 各自呼叫 callback | 加入 `callbackFired` flag + `safeCallback`，確保 `speak()` / `speakText()` 各只呼叫一次 |
| 3 | 返回設定後 body 殘留 modal 遮蔽畫面 | `category-assignment-modal` / `hard-mode-assignment-modal` 等附加於 `document.body`，`showSettings()` 只清理 `#app` | `showSettings()` 新增移除 5 個 body 層 modal ID 的清理邏輯 |
| 4 | 舊輪次 `wrongItem` 等語音在新輪次播放 | `startOver()` 未清除 `speechDelay` 類別計時器 | `startOver()` 加入 `TimerManager.clearByCategory('speechDelay')` |
| 5 | 設定頁魔法商品彈窗操作時餐點被加入購物車 | `addToCart()` 使用 `getAllCategoryItems` 後可找到自訂餐點，但場景不在 ordering 時仍被呼叫 | `addToCart()` 入口加 `currentScene !== 'ordering'` guard |
| 6 | 進入測驗總結畫面播放 2 次「太棒了」語音 | 用戶點「查看測驗總結」→ `showCompletionSummary()` 呼叫 `speech.speak('completeChallenge')`，`speakText()` 內部 `cancel()` 中斷仍播放的 `pickupComplete` → `safeCallback` 再次呼叫 `showCompletionSummary()` | `showCompletionSummary()` 入口加 `_completionSummaryShown` 旗標；`startOver/restartAllQuestions/backToSettings` 重置 |

**修改檔案**：`js/a3_mcdonalds_order.js`（唯一）

---

### 2026-02-27：Raw setTimeout + confetti setInterval → TimerManager（第四輪）

**問題 1 — modal focus timeout**：自訂餐點上傳後開啟輸入 modal 時，`setTimeout(() => { input.focus(); }, 100)` 為裸計時器，無法被 TimerManager 管理。

**修復**：改為 `McDonald.TimerManager.setTimeout(() => { input.focus(); }, 100, 'ui')`。

**問題 2 — confetti setInterval**：完成畫面使用裸 `setInterval`，場景切換時 `TimerManager.clearAll()` 無法中途停止動畫計時器。

**修復**：將 `setInterval` 改為遞迴 `this.TimerManager.setTimeout(fireConfetti, 250, 'confetti')`，確保 `clearAll()` 或 `clearByCategory('confetti')` 可立即停止動畫。

**修改檔案**：`js/a3_mcdonalds_order.js`

---

*報告更新時間：2026-02-27*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

## 2026-02-27（第四輪）：speech.speak() / speakText() safeCallback 備援超時修復

**問題 1 — TimerManager fallback 缺失**：`speech.speak()` 和 `speech.speakText()` 均有 `safeCallback`（`callbackFired`）防雙重觸發，但缺少 TimerManager 備援超時。若語音合成系統無聲失敗（既不觸發 onend 也不觸發 onerror），callback 永遠不執行，導致遊戲流程卡住。

**問題 2 — catch 區塊繞過 safeCallback**：兩個函數的 catch 區塊都以 `if (callback) callback()` 直接呼叫，而非透過 `safeCallback()`/`safeCallback2()`。若語音播放拋出同步例外且 TimerManager 備援計時器已啟動，catch 觸發後 callback() 先執行一次，10 秒後備援計時器再執行一次，造成雙重呼叫。

**修復（speak()）**：
```javascript
// onerror 之後加入
this.parent.TimerManager.setTimeout(safeCallback, 10000, 'speech');
// catch 區塊改為
safeCallback();
```

**修復（speakText()）**：
```javascript
// onerror 之後加入
this.parent.TimerManager.setTimeout(safeCallback2, 10000, 'speech');
// catch 區塊改為
safeCallback2();
```

**修改檔案**：`js/a3_mcdonalds_order.js`

---

*報告更新時間：2026-02-27*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

## 2026-02-27（第五輪）：輔助點擊模式付款畫面直接拖曳導致流程卡住修復

**問題**：輔助點擊模式下在付款畫面，使用者不小心以滑鼠或觸控直接拖曳錢包中的金錢圖示至付款目標，會繞過 click mode action queue，直接呼叫 `fillPaymentTarget()` / `addMoneyToPaymentArea()`，導致：
1. `availableWalletMoney` 被提早扣除（money 從 state 移除）
2. 之後 action queue 執行 `autoPayMoney(value)` 時找不到該面額
3. 錯誤：`[A3-ClickMode] 錢包中找不到金額: XX`，queue 跳過付款步驟
4. 後續 `autoConfirmPayment` 因付款不完整而失敗（確認按鈕仍 disabled）
5. 付款無法完成，錢包仍顯示金錢圖示但淡化的付款目標無法互動

**根本原因**：touch-drag-utility.js 的 touchend 事件早於 click 事件觸發，在 click mode handler 攔截 click 事件前就已完成 drop 放置，完全繞過輔助點擊模式的控制邏輯。

**修復**：在 `fillPaymentTarget()` 和 `addMoneyToPaymentArea()` 函數開頭加入 guard：
- 條件：`draggedElement` 不為 null（使用者直接拖曳）且 click mode 啟用
- 行為：播放錯誤音效、還原拖曳元素不透明度（`draggedElement.style.opacity = '1'`）、return
- `draggedElement === null` 代表 `autoPayMoney()` 程式呼叫，不受限制

**影響**：輔助點擊模式下，使用者無法直接拖曳付款；需透過點擊繼續讓 click mode 引導操作。其他模式不受影響。

**修改檔案**：`js/a3_mcdonalds_order.js`（`fillPaymentTarget` + `addMoneyToPaymentArea` 各加 guard）

---

## 2026-02-27（第六輪）：輔助點擊模式找零畫面直接拖曳導致流程卡住修復

**問題**：輔助點擊模式下在找零畫面，使用者不小心以觸控直接拖曳找零硬幣圖示至找零目標，繞過 click mode action queue，直接呼叫 `fillChangeTarget()`，導致：
1. 硬幣元素被提早從 DOM 移除
2. 之後 action queue 執行 `autoCollectChange(value)` 時找不到該面額的 `.change-money-item` 元素
3. 錯誤：`[A3-ClickMode] 找不到零錢元素: 1`，queue 跳過找零步驟
4. 後續 `autoPickupOrder()` 因找零狀態不正確而失敗（找不到取餐按鈕）

**根本原因**：與付款畫面相同的 touch-drag-utility.js touchend/click 競態問題，延伸至找零收回階段。

**修復**：
1. 在 `fillChangeTarget()` 函數開頭加入與 `fillPaymentTarget()` 相同的 guard（條件相同：`draggedElement` 不為 null 且 click mode 啟用 → 播放錯誤音效、還原透明度、return）
2. 調整 `autoCollectChange()` 的呼叫方式：先手動 `coinElement.remove()` 移除硬幣元素，再以 `null` 作為 `draggedElement` 呼叫 `fillChangeTarget()`，確保不觸發 guard 封鎖

**原本做法**：`autoCollectChange()` 傳入 `coinElement` 給 `fillChangeTarget()`，讓後者負責 remove。改為先 remove 再傳 null，邏輯等效但可正確通過 guard 判斷。

**修改檔案**：`js/a3_mcdonalds_order.js`（`fillChangeTarget` 加 guard + `autoCollectChange` 改呼叫方式）

---

## 2026-02-27（第七輪）：輔助點擊模式 autoPayMoney 雙重扣除 availableWalletMoney 修復

**問題**：輔助點擊模式付款時（任何難度），使用者點擊任意位置觸發 click mode 步驟執行，`autoPayMoney(100)` 執行步驟1後，步驟2出現 `[A3-ClickMode] 錢包中找不到金額: 100` 錯誤，確認付款按鈕無法啟用。

**根本原因（雙重扣除）**：
1. `autoPayMoney(value)` 先執行 `availableMoney.splice(moneyIndex, 1)` → 從 `availableWalletMoney` 移除一張 $100
2. 再呼叫 `fillPaymentTarget(target, data, null)` 或 `addMoneyToPaymentArea(data, null)`
3. 這兩個函數內部**各自也執行 `awm.splice(awmIdx, 1)`** → 再次移除一張 $100

步驟1執行時，兩張 $100 都被消耗（一張被 `autoPayMoney` 移除，一張被 `fillPaymentTarget` 移除），步驟2執行時 `availableWalletMoney` 中已無任何 $100。

**與觸控拖曳繞過的區別**：此 bug 由「合法的 click mode 操作」觸發（用滑鼠點擊任意位置），不涉及拖曳繞過。之前的 drag guard 修復是獨立機制，不應撤銷。

**修復**：移除 `autoPayMoney` 中的 `availableMoney.splice(moneyIndex, 1)` 這一行。`fillPaymentTarget` 和 `addMoneyToPaymentArea` 已各自負責在 state 中移除對應金錢，`autoPayMoney` 只需負責從 DOM 中移除錢包圖示即可。

**修改檔案**：`js/a3_mcdonalds_order.js`（`autoPayMoney` 移除重複的 `availableMoney.splice(moneyIndex, 1)`）

---

## 2026-02-27（第八輪）：每步成功煙火+音效（簡單模式 & 輔助點擊模式）

**需求**：在簡單模式和輔助點擊模式下，每一個步驟成功時出現煙火動畫及音效（音效沿用各步驟已有的 beep/success，新增 confetti 煙火動畫）。

**設計**：新增 `playStepSuccess()` helper 方法（40顆彩色粒子、中心上方 origin `{x:0.5, y:0.25}`、`startVelocity: 30, ticks: 60`），使用 confetti.browser.min.js（已引入 HTML）。

**注入點**：

| 函數 | 模式 | 注入位置 |
|------|------|---------|
| `addToCart()` | 簡單模式 | `playSound('addToCart')` 後，加 `!clickMode` guard |
| `fillPaymentTarget()` | 簡單模式 | `playSound('beep')` 後，加 `!clickMode` guard |
| `confirmPayment()` | 簡單模式 | `playSound('success')` 後，加 `!clickMode` guard |
| `fillChangeTarget()` | 簡單模式 | `playSound('beep')` 後，加 `!clickMode` guard |
| `completeChangeCollection()` | 簡單模式 | `playSound('success')` 後，加 `!clickMode` guard |
| `autoSelectMenuItem()` | 輔助點擊 | `playSound('addToCart')` 後 |
| `autoClickCheckout()` | 輔助點擊 | `playSound('beep')` 後 |
| `autoPayMoney()` | 輔助點擊 | `playSound('beep')` 後 |
| `autoConfirmPayment()` | 輔助點擊 | `playSound('success')` 後 |
| `autoCollectChange()` | 輔助點擊 | `playSound('beep')` 後 |
| `autoConfirmChange()` | 輔助點擊 | `playSound('success')` 後 |
| `autoPickupOrder()` | 輔助點擊 | `showPickupComplete()` 前（新增 `playSound('success')`） |
| `autoClickOrderAgain()` | 輔助點擊 | `playSound('success')` 後 |

**Guard 設計**：簡單模式函數加 `if (difficulty === 'easy' && !clickMode)` 防止簡單+輔助點擊時雙重觸發；auto* 函數（只在 click mode 執行）無條件呼叫。

**修改檔案**：`js/a3_mcdonalds_order.js`（新增 `playStepSuccess()`，13 處注入）

---

## 2026-02-27（第九輪）：每步成功音效修正 — 防止 correct02.mp3 重複播放

**問題**：`playStepSuccess()` 加入 `new Audio('../audio/correct02.mp3').play()` 後，部分步驟原本已透過 `playSound('addToCart')` / `playSound('success')` 播放 `correct02.mp3`，導致同一步驟重複播放兩次相同音效。

**根本原因**：
- `playSound('addToCart')` → `addToCartSound` → `correct02.mp3`
- `playSound('success')` → `successSound` → `correct02.mp3`
- `playStepSuccess()` 又加一次 `new Audio('../audio/correct02.mp3').play()`

**修復**：`playStepSuccess(skipSound = false)` 加入 `skipSound` 參數；已播放 `correct02.mp3` 的步驟傳入 `true`：

| 步驟 | 原有音效 | 修改 |
|------|---------|------|
| `addToCart`（簡單模式） | `addToCart`（correct02） | `playStepSuccess(true)` |
| `confirmPayment` 成功（簡單模式） | `success`（correct02） | `playStepSuccess(true)` |
| `completeChangeCollection` 成功（簡單模式） | `success`（correct02） | `playStepSuccess(true)` |
| `autoSelectMenuItem` | `addToCart`（correct02） | `playStepSuccess(true)` |
| `autoConfirmPayment` | `success`（correct02） | `playStepSuccess(true)` |
| `autoConfirmChange` | `success`（correct02） | `playStepSuccess(true)` |
| `autoPickupOrder` | 手動加的 `playSound('success')` | 移除手動 sound，改由 `playStepSuccess()` 播放 |
| `autoClickOrderAgain` | `success`（correct02） | `playStepSuccess(true)` |
| 其餘 `beep` 步驟 | `beep`（click.mp3） | 保留 `playStepSuccess()`，補上 correct02.mp3 ✓ |

**修改檔案**：`js/a3_mcdonalds_order.js`（`playStepSuccess` 加 `skipSound` 參數，8 處改為 `(true)`）

---

## 2026-02-27（第十輪）：魔法餐點定價邏輯修正

### 問題一：指定購買模式下使用者可自訂高價導致付款失敗

**情境**：錢包設定 300 元，魔法餐點自訂價格 299 元，進入付款步驟時金額不足。

**修復**：
1. **`showCustomItemInputModal()`**：判斷式改為 `isSystemPrice = taskType !== 'freeChoice'`（只有自選購買才顯示價格輸入欄，其他情況均顯示「價格由系統自動設定」）
2. **`confirmAddCustomItem()`**：改為 `if (taskType === 'freeChoice')` 才讀取使用者輸入的價格
3. **`initializeGameData()`**：移除 `if (difficulty === 'easy')` 內層判斷，指定購買模式任何難度均呼叫 `setEasyModeCustomItemPrices()` 自動設定合理價格

### 問題二：先自選購買設高價，切換至指定購買造成 bug

**情境**：先在自選購買模式以 299 元上傳魔法餐點，再切換至指定購買 → 舊的 299 元仍存在。

**修復**：在 `updateSetting('task', 'assigned')` 分支加入：
```javascript
for (const cat of ['burgers', 'sides', 'drinks', 'desserts']) {
    (this.state.settings.customItems[cat] || []).forEach(item => { item.price = 0; });
}
```
切換時立即歸零，`setEasyModeCustomItemPrices()` 在遊戲開始時重新指派合理範圍價格。

### 問題三：先指定購買再切換自選購買，上傳時無法自訂價格

**情境**：先選「指定購買」→ 切換「自選購買」→ 上傳圖片 → 不顯示價格輸入欄。

**根本原因**：舊判斷 `isEasyMode || taskType === 'assigned'` 中，若難度為簡單模式，切回自選購買後 `isEasyMode = true` 仍隱藏欄位；且邏輯比實際需求複雜。

**修復**：改為 `isSystemPrice = taskType !== 'freeChoice'`（只看任務類型，不看難度），語義清晰且完全正確。

**修改檔案**：`js/a3_mcdonalds_order.js`（`showCustomItemInputModal`、`confirmAddCustomItem`、`updateSetting`、`initializeGameData`）

---

## 2026-02-27（第十一輪）：自選購買「我的錢包」按鈕 + 彈窗 + 語音

**需求**：自選購買模式的步驟1選餐頁面，在類別導航欄加入「💰 我的錢包」按鈕，點選後顯示彈窗（總金額 + 金錢圖示），並播放語音。

**實作**：

1. **`categoryButtons()`**：新增 `walletButton`（橘色漸層 `#ff9800 → #f57c00`），條件 `taskType === 'freeChoice'` 時顯示，樣式與「提示」按鈕一致
2. **`showWalletPopup()`**（新增）：
   - 播放 `speech.speak('walletInfo', { total })` → 語音「我的錢包總共 X 元」
   - 彈窗顯示：💰 標題 + 總金額大字 + 金錢圖示區
   - 金錢圖示：依面額由小到大排列，隨機正/反面，不可拖曳，黃框背景
   - 點擊背景或關閉按鈕可關閉
3. **`closeWalletPopup()`**（新增）：移除 `#wallet-popup-overlay` 元素

**設計細節**：
- 語音使用既有 `walletInfo` 模板（`'我的錢包總共{total}元'`），金額自動透過 `convertToChineseNumber` 轉換
- 彈窗 `max-height: 80vh` + `overflow-y: auto`，金錢過多時可滾動
- `z-index: 9000`（低於輸入彈窗的 10000，避免層疊衝突）

**修改檔案**：`js/a3_mcdonalds_order.js`（`categoryButtons` 加 walletButton；新增 `showWalletPopup`、`closeWalletPopup`）

---

### 2026-02-28：輔助點擊遮罩層級修正（CSS）

**修改**：`.mcdonalds-title-bar` z-index: 100 → 10200，確保標題列始終顯示於輔助點擊遮罩（z-index:10100）之上。

**修改檔案**：`css/a3_mcdonalds_order.css`

---

*報告更新時間：2026-02-28*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

### 2026-02-28：orderNumber setInterval 改遞迴 TimerManager

**問題**：`startOrderNumberAnimation()` 使用 `setInterval` 控制取餐跳號動畫，無法被 `TimerManager.clearAll()` 或 `clearByCategory('orderAnimation')` 立即停止，頁面切換時可能殘留計時器。

**修復**：`this.orderNumberInterval = setInterval(...)` 改為遞迴 `scheduleNext()` 使用 `this.TimerManager.setTimeout(scheduleNext, 1000, 'orderAnimation')`；開頭清除改用 `this.TimerManager.clearByCategory('orderAnimation')`；停止時改用 `this.TimerManager.clearByCategory('orderAnimation')`（原 `clearInterval` 已無效）。

**修改檔案**：`js/a3_mcdonalds_order.js`

### 2026-03-01：步驟3桌面端拖曳鬼影圖示修正

**問題**：步驟3（櫃檯付款）拖曳金錢圖示時，鬼影（drag ghost image）不隨滑鼠移動，因為 `setDragImage` 使用的尺寸為 0（ghost 元素定位至 -9999px 後 `offsetWidth/Height` 回傳 0）。

**修復**（`initializeDragAndDrop`，共 2 處 dragstart handler）：
- 先讀取原始 `_dragImg.offsetWidth / offsetHeight`，儲存至 `imgW` / `imgH`（fallback 60px）
- 建立 ghost clone，設定 `width/height = imgW/imgH`，再定位至 -9999px
- `setDragImage(_ghost, imgW/2, imgH/2)` 使用已保存的尺寸，而非重新讀取 ghost

**修改檔案**：`js/a3_mcdonalds_order.js`（`initializeDragAndDrop`，`replace_all: true` 同時修正 2 處）

---

*報告更新時間：2026-03-01*
*報告產生者：Claude Code (claude-sonnet-4-6)*
---

## 廢棄程式碼稽核（2026-03-01）

**稽核範圍**：`js/a3_mcdonalds_order.js`（10,534 行）

### 結論：無需處理

| 類型 | 位置 | 內容 | 嚴重性 | 建議 |
|------|------|------|--------|------|
| 向後相容 wrapper | Lines 4999–5001 | `findExactPayment()` — 標記「舊版本，保留相容性」，委派至 `findExactPaymentWithIndex()` | 低 | 刻意保留的相容層，可在確認不需後刪除 |
| TODO 注解 | Line 2307 | `// TODO: 顯示自訂金額輸入框` — 未實作的功能記錄 | 低 | 評估是否需要實作此功能 |
| 廢棄標記注解 | Lines 1417, 8666, 8723, 6153 | 多處「已刪除/已移除」說明注解，無殘留程式碼 | 低 | 可保留作歷史記錄 |
| console.log | Lines 54–68 | Debug 系統定義內部呼叫 | — | 已受 FLAGS 守衛，無需處理 |

**整體評估**：無實際廢棄死碼，各注解均為重構歷史記錄或刻意保留的相容層。

---

## 2026-03-03：指定餐點完成語音 + 普通模式提示鈕 + 跨輪計時器洩漏修復

### 問題一：所有指定餐點加入訂單後缺少語音提示

**問題描述**：在指定購買模式下，將所有指定餐點加入購物車後，畫面出現「前往結帳」高亮按鈕但沒有語音播放，使用者可能不知道下一步操作。

**根本原因**：
- `speakCompletionMessage()` 函數已存在，但從未在流程中被呼叫
- `moveToNextAssignedItem()` 在 `!nextItem`（所有餐點已購買）分支，只呼叫 `highlightCheckoutButton()`，未呼叫語音

**修復**：
1. **`speakCompletionMessage()`**：更新文字為 `'已將所有餐點加入訂單，請按下前往結帳鈕，前往結帳'`；改用 `this.speech.speakText(text)` 播放（原用裸 `speech.synth.speak()`）
2. **`moveToNextAssignedItem()`**：在 `!nextItem` 分支的 `highlightCheckoutButton()` 前加入 `this.speakCompletionMessage()` 呼叫

**影響範圍**：指定購買模式（全三種難度），所有指定餐點加入後播放語音提示。

---

### 問題二：普通模式提示按鈕顯示所有類別彈窗（應顯示單一類別）

**問題描述**：普通模式 + 指定購買模式下，點擊「提示」按鈕應顯示下一個未購買餐點的所屬類別彈窗（讓使用者聚焦在特定類別），但實際呼叫 `showHardModeAllItemsModal()`，顯示所有 4 個類別和所有指定餐點，對學習者過於複雜。

**根本原因**：`showHardModeHint()` 未區分難度，普通和困難模式均呼叫 `showHardModeAllItemsModal()`。

**修復**：`showHardModeHint()` 依 `difficulty` 拆分行為：

```javascript
showHardModeHint() {
    this.audio.playSound('beep');
    const difficulty = this.state.settings.difficulty;
    if (difficulty === 'normal') {
        // 普通模式：顯示下一個未購買指定餐點的單一類別彈窗
        const nextItem = this.getNextAssignedItem();
        if (nextItem) {
            this.showCategoryAssignmentModal(nextItem.category);
        } else {
            // 所有餐點已購買，提示前往結帳
            this.highlightCheckoutButton();
            this.speech.speakText('所有餐點已加入訂單，請按下前往結帳鈕');
        }
    } else {
        // 困難模式：顯示所有指定餐點彈窗（標記已購買的餐點）
        this.showHardModeAllItemsModal();
    }
},
```

**影響範圍**：`difficulty === 'normal'` + 指定購買模式的提示按鈕行為；困難模式不受影響。

---

### 問題三：第 2 輪加入一個餐點後自動跳至第 3 輪（跨輪 speech 計時器洩漏）

**問題描述**：完成第 1 輪後，第 2 輪僅加入一個餐點，畫面就直接跳至下一輪（「歡迎畫面」顯示第 3 輪題目）。Debug log 顯示 `TimerManager.clearByCategory('speechDelay')` + `停止步驟5語音播放和動畫` 在無使用者操作下自動觸發，且 `已完成題數: 2 / 3`。

**根本原因（計時器洩漏鏈）**：

1. **第 1 輪**：`showPickupComplete()` 的 `speakChunk()` 遞迴語音鏈完成後，觸發 `navigateAfterSpeech()` → 設置 `_pickupNavigating = true` → 呼叫 `startOver()`
2. **`startOver()`（有 bug 版本）**：在第 1 行就執行 `this._pickupNavigating = false`，重置了守衛旗標
3. **`speakText()`** 的 10 秒備援計時器（category: `'speech'`）在語音正常完成後「沒有被清除」（`startOver()` 原本未清除此計時器）
4. **第 2 輪**：10 秒後備援計時器觸發 → `speakChunk` 遞迴鏈末端的 `navigateAfterSpeech()` → 檢查 `_pickupNavigating`，發現是 `false`（已被 `startOver()` 重置）→ 設置 `true` → 呼叫 `startOver()` → 第 3 輪開始

**關鍵時序**：語音計時器（10s）> 兩個步驟的操作時間，所以 bug 在使用者加入一個餐點時觸發（約 10 秒後）。

**修復（`startOver()`）**：

```javascript
startOver() {
    // 重置防重複旗標（新一輪開始）
    this._completionSummaryShown = false;
    // ⚠️ 不在此重置 _pickupNavigating。
    // _pickupNavigating 由 showPickupComplete() 在建立新一輪時重置。
    // 若此處提前重置，speakChunk 備援計時器（category:'speech'，10秒後觸發）
    // 仍能通過 navigateAfterSpeech() 的守衛，導致 startOver() 被再次呼叫。
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
    this.TimerManager.clearByCategory('speechDelay');
    // 🔧 清除 speakText() 的 10 秒備援計時器，防止其在下一輪觸發 navigateAfterSpeech()
    this.TimerManager.clearByCategory('speech');
    // ... 其餘邏輯
```

**兩個修復點**：
1. **移除** `this._pickupNavigating = false`（由 `showPickupComplete()` 在重建語音鏈時負責重置，約 line 9505）
2. **新增** `this.TimerManager.clearByCategory('speech')` 殺除殘留備援計時器

**影響範圍**：全三種難度（`showPickupComplete()` 和 `startOver()` 是共用函數）。

---

*報告更新時間：2026-03-03*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

## 語音速率統一 + 語音選擇優先順序更新（2026-03-04）

### 語音速率調整（rate → 1.0）

| 函數 | 路徑 | 舊 rate | 新 rate |
|------|------|---------|---------|
| `speech.speak()` | 主路徑 | 1.2 | 1.0 |
| `speech.speakText()` | 主路徑 | 1.2 | 1.0 |
| `speech.speak()` | retry 路徑 | 0.9 | 1.0 |
| `speech.speakText()` | retry 路徑 | 0.9 | 1.0 |

`utterance.rate` 為相對倍數，數值 1.0 表示使用語音引擎的原生預設語速，非固定 wpm。A3 原本主路徑設為 1.2（略快）、retry 路徑設為 0.9（略慢），現統一改為 1.0，確保所有路徑語速一致。

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

## 兩項 Bug 修復（2026-03-05）

### Bug 1：設定頁題數輸入框 `Game is not defined` ReferenceError

**症狀**：開啟設定頁時，console 出現 `Uncaught ReferenceError: Game is not defined`。

**根因**：`showSettings()` 的題數輸入框 HTML 模板中，`onclick` 屬性使用了錯誤的命名空間：

```html
<!-- 錯誤（舊） -->
readonly onclick="Game.handleCustomQuestionClick()">

<!-- 修正（新） -->
readonly onclick="McDonald.handleCustomQuestionClick()">
```

A3 的主物件為 `McDonald`，`Game` 未在此頁面定義，點擊輸入框時即拋出 ReferenceError。

**修正位置**：`js/a3_mcdonalds_order.js`，`showSettings()` 題數輸入框模板（約 L1835）

---

### Bug 2：錯誤邊界因音訊資源載入失敗誤觸發

**症狀**：頁面載入後，console 出現 `美式速食點餐系統錯誤: null`（來自 `html/a3_mcdonalds_order.html:171`）；部分情況下錯誤邊界畫面短暫顯示。

**根因**：`html/a3_mcdonalds_order.html` 的 `window.addEventListener('error', ...)` 無差別攔截所有瀏覽器錯誤事件，包含音訊資源載入失敗（`audio-unlocker.js` 的 HTMLAudioElement 嘗試載入不存在的音頻）。資源載入失敗時 `event.error === null`（非 JS 執行錯誤），但舊版仍會顯示錯誤邊界畫面。

**修正內容**：

```javascript
// 修正前
window.addEventListener('error', function(event) {
    console.error('美式速食點餐系統錯誤:', event.error);
    document.getElementById('error-boundary').style.display = 'flex';
    document.getElementById('loading-screen').style.display = 'none';
});

// 修正後
window.addEventListener('error', function(event) {
    if (!event.error) return;   // 資源載入失敗（event.error===null）略過
    console.error('美式速食點餐系統錯誤:', event.error);
    const eb = document.getElementById('error-boundary');
    const ls = document.getElementById('loading-screen');
    if (eb) eb.style.display = 'flex';   // 補 null 防護
    if (ls) ls.style.display = 'none';
});
```

**修正位置**：`html/a3_mcdonalds_order.html`（約 L170）

---

---

## 餐盤畫面點擊即進入下一頁修復（2026-03-05）

### 問題描述

簡單 + 輔助點擊模式下，完成點餐進入餐盤畫面（`showPickupComplete()`）後，必須等語音播完才能進入下一頁，無法透過點擊或觸控立即跳過。

### 根因分析

原始做法在 `easy + clickMode` 時，對 `.pickup-complete-wrapper` 加 `click` 監聽器。但輔助點擊模式已在 document capture 層以 `event.stopPropagation()` 攔截所有 click 事件，wrapper 的監聽器永遠無法觸發。

### 修復內容

| 位置 | 變更 |
|------|------|
| `handleClickModeClick()` | 在 `isTrusted` 判斷後，立即檢查 `gs.clickModeState.onTrayScreen`；若為 `true` 則呼叫 `trayNavCallback` 並 return（桌面端 click 支援） |
| `showPickupComplete()` | easy+clickMode 時於 `gs.clickModeState` 設定 `onTrayScreen=true` + `trayNavCallback=navigateAfterSpeech`，取代原有無效的 wrapper click listener |
| `showPickupComplete()` | 額外以 `document.addEventListener('touchend', ..., {capture:true, once:true, passive:true})` 補強觸控端（`touchend` 不受 click 模式 overlay 攔截） |
| `navigateAfterSpeech()` | 進入時立即清除 `onTrayScreen` + `trayNavCallback` 旗標，防止後續誤觸 |

### 關鍵搜尋詞

`onTrayScreen`, `trayNavCallback`

---

## 取餐鈕出現後自動跳至餐盤畫面修復（2026-03-05）

### 問題描述

簡單 + 輔助點擊模式，等待取餐號碼頁面顯示「取餐」按鈕後，系統自動跳至餐盤畫面，不需用戶點擊。此行為在上輪修正前並不存在。

### 根因分析

`startOrderNumberAnimation()` 動畫完成後包含一個 800ms 計時器，自動呼叫 `executeNextAction()`（即 `autoPickupOrder`），原注解為「純程式步驟：自動執行取餐，無需用戶點擊」。此設計繞過了用戶互動步驟。

另外，移除此計時器後需同步修正 600ms 防抖邏輯：「取餐」按鈕的 click 事件和 `handleClickModeClick()` 的 `onTrayScreen` 旗標彼此時序接近，若無防抖，「取餐」的點擊可能立刻觸發餐盤畫面導航（使餐盤畫面無法被單獨點擊跳過）。

### 修復內容

| 位置 | 變更 |
|------|------|
| `startOrderNumberAnimation()` | 移除 800ms 自動執行計時器（`executeNextAction()`），改為 `buildActionQueue('pickup')` 等待用戶點擊取餐鈕 |
| `handleClickModeClick()` onTrayScreen 分支 | 加入 `trayReadyTime` 600ms 防抖：若 `Date.now() - trayReadyTime < 600` 則 return，防止「取餐」點擊瞬間觸發餐盤導航 |
| `showPickupComplete()` | easy+clickMode 時設定 `cms.trayReadyTime = Date.now()`；touchend handler 從 `{once:true}` 改為手動移除（配合防抖手動控制生命週期，防抖不滿足時不移除 listener） |
| touchend handler | 同步加入 `trayReadyTime` 600ms 防抖，行為與 click 路徑一致 |

### 關鍵搜尋詞

`trayReadyTime`, `buildActionQueue.*pickup`, `startOrderNumberAnimation`

---

## 步驟2「至櫃臺排隊付款」按鈕提示動畫（2026-03-05）

### 問題描述

簡單模式（含輔助點擊模式），步驟2「完成訂單」頁面顯示後，「至櫃臺排隊付款」按鈕沒有任何視覺提示，使用者不知道需要點擊該按鈕。

### 修復內容

| 位置 | 變更 |
|------|------|
| `showPaymentMethodSelection()` HTML 模板 | 「至櫃臺排隊付款」按鈕加入 `id="counter-payment-btn"` |
| `showPaymentMethodSelection()` 邏輯（`app.innerHTML` 後） | 若 `difficulty === 'easy'`，延遲 300ms 對 `counter-payment-btn` 加上 `counter-payment-btn-hint` class |
| `css/a3_mcdonalds_order.css` | 新增 `.counter-payment-btn-hint`：橘色脈動外框（`pulseCheckoutOutline` 動畫）+ `::after` 顯示「👇 點這裡付款」（`bounceDownMcD` 彈跳） |

### 關鍵搜尋詞

`counter-payment-btn`, `counter-payment-btn-hint`

---

## 輔助點擊步驟2自動跳過修復（2026-03-08）

### 問題描述

簡單/輔助點擊模式完成步驟1（點餐），進入步驟2（付款方式選擇頁面），未等用戶點擊即自動跳至步驟3（付款流程）。

### 根本原因

`autoClickCheckout()` 內有 1500ms 計時器自動呼叫 `showCounterPayment()`，跳過了「至櫃臺排隊付款」按鈕的互動步驟。

### 修復內容

| 位置 | 變更 |
|------|------|
| `buildActionQueue('ordering')` | 新增 `selectPaymentMethod` action（在 `checkout` 之後） |
| `autoClickCheckout()` | 移除 1500ms 自動計時器，改為呼叫 `moveToNextStep()` 等待用戶點擊 |
| 新增 `autoSelectPaymentMethod()` | 負責呼叫 `showCounterPayment()` + `buildActionQueue('payment')` |
| `executeNextAction()` switch | 新增 `'selectPaymentMethod'` case |

### 關鍵搜尋詞

`autoSelectPaymentMethod`, `selectPaymentMethod`

---

## 輔助點擊遮罩不覆蓋標題列（方案C）（2026-03-08）

**問題**：輔助點擊遮罩（z-index:10100，`inset:0`）覆蓋整個視窗，標題列按鈕被遮罩遮蔽無法點擊。

**修復**：遮罩建立時動態量測標題列高度（`getBoundingClientRect().bottom`），設 `top:${_tbBottom}px` 而非 `inset:0`。A3 CSS 標題列 z-index 從 10200 降回 100。

**關鍵搜尋詞**：`getBoundingClientRect().bottom`, `_tbBottom`, `click-exec-overlay`

---

## 普通模式步驟3綠色勾勾提示修復（2026-03-10）

### 問題描述

普通模式（含指定餐點 assigned + 自選餐點 freeChoice）步驟3「櫃臺付款」頁面，錯誤付款 3 次後，錢包金錢圖示上**未出現綠色勾勾提示**（`freeChoice` 有時正常，`assigned` 幾乎從不出現）。

### 根因一：非精確付款無法顯示提示

`confirmPayment()` 在錯誤 ≥3 次的路徑中呼叫 `findExactPayment(totalAmount, availableMoney)`。此函數**只尋找精確付款組合**（無找零）。指定餐點的價格（例如 68元）在錢包面額組合下可能沒有精確解（如錢包有 [50, 10, 10] → 最近只能湊 70元），導致 `findExactPayment` 返回 `[]`，`showWalletHintWithTicks` 被跳過，只播放語音「付款金額不足，請繼續付款」。

**修復**：改用雙重候補邏輯：
```javascript
const exactMoney = this.findExactPayment(totalAmount, availableMoney);
const optimalMoney = exactMoney.length > 0
    ? exactMoney
    : (this.state.gameState.optimalPaymentTargets || []);
```
`optimalPaymentTargets` 由進入付款頁面時 `calculateOptimalPaymentTargets()` 計算，Strategy 2 會找**最小找零**組合，對所有面額組合均有解。不足金額與多付兩條路徑（`confirmPayment` 約 6228 行 + 6302 行）均套用此修復。

### 根因二：非同步計時器競態（async timer race condition）

`showWalletHintWithTicks` 原本透過 `TimerManager.setTimeout(..., 50ms/200ms)` 延遲呼叫。執行時機晚於使用者排隊中的 click 事件，導致：

1. `returnPaymentToWallet()` 同步重建 wallet DOM（`.money-item` 就緒）
2. 計時器排入佇列（50ms/200ms 後執行）
3. **使用者的 click 事件先於計時器執行**，硬幣被移至付款區
4. 計時器觸發時，`.money-item[data-value="X"]` 已不在 wallet DOM → `querySelectorAll` 返回 0 → 勾勾不顯示

**修復**：移除所有計時器，在 `returnPaymentToWallet()` 返回後立即**同步**呼叫：

| 位置 | 原本 | 修復後 |
|------|------|--------|
| `confirmPayment()` 不足金額路徑 | `TimerManager.setTimeout(..., 50ms)` | 同步呼叫 |
| `confirmPayment()` 多付路徑 | `TimerManager.setTimeout(..., 50ms)` | 同步呼叫 |
| `showPaymentHint()` 提示鈕 | `TimerManager.setTimeout(..., 200ms)` | 同步呼叫 |

### 為何同步呼叫有效

`returnPaymentToWallet()` 在 `walletAreaEl.innerHTML = this.generateWalletMoneyForPayment(walletMoney)` 同步重建 DOM 後返回。此時 wallet DOM 已包含所有 `.money-item` 元素，可立即被 `showWalletHintWithTicks` 的 `querySelectorAll` 查詢到。之後 `initializeDragAndDrop()` 的 100ms 計時器執行 `cloneNode(true)` 時，`show-correct-tick` CSS class 會被複製，勾勾持續顯示。

### 補充說明

- `showWalletHintWithTicks` 的 `Debug.log` 使用 `'hint'` category（預設 `FLAGS.hint = false`），測試時需手動設 `FLAGS.hint = true` 或 `FLAGS.all = true` 才能在 console 看到 `[A3-打勾提示]` 日誌。
- `walletHintMoney` state 同步儲存（成功付款時清除）。
- `showPaymentHint()` 的 fallback 路徑（`findExactPayment` 失敗時改用 `_showCheckmarksOnWallet`）保持不動。

### 關鍵搜尋詞

`exactMoney`, `optimalPaymentTargets`（`confirmPayment` 中），`walletHintMoney`, `showWalletHintWithTicks`

---

## 修復：簡單模式「點這裡」提示動畫 + 方框（2026-03-14）

### 問題

簡單模式各步驟完成後，學生不知道要點哪個按鈕繼續。

### 修復內容

**JS（`js/a3_mcdonalds_order.js`）**

| 步驟 | 觸發時機 | 加提示的按鈕 |
|------|---------|-------------|
| 步驟3 櫃檯付款 | 付款金額 >= 訂單總額時 | `#confirm-payment-btn`（`checkout-btn-hint`） |
| 步驟5 確認找零 | 所有找零目標填入後 | `#complete-change-btn`（`checkout-btn-hint`） |
| 步驟5 無需找零 | 畫面渲染完成後 400ms | `#complete-change-btn`（`checkout-btn-hint`） |
| 步驟6 取餐 | 取餐號碼動畫啟動後 500ms | `#pickup-order-btn`（`checkout-btn-hint`） |

搜尋：`checkout-btn-hint`、`changeAmount === 0`、`pickup-order-btn`

**CSS（`css/a3_mcdonalds_order.css`）**

- `.checkout-btn-hint::before`：橘色外框（`#F58025`），距元素 10px，`checkoutBoxFramePulse` 動畫
- `.counter-payment-btn-hint::before`：同上
- 動畫 `@keyframes checkoutBoxFramePulse`：邊框顏色 + 陰影脈動

---
