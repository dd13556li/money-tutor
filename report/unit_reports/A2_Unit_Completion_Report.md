# A2 理髮廳自助機單元 — 完成經驗報告書

> **建立日期**：2026-02-09（日）12:38
> **更新日期**：2026-03-28（元元語音修正；coinFirst 亮燈改 price≤inserted；錯選服務守衛）、2026-03-22（付款彈窗大改版：錢包式彈窗 + 兩階段付款 + 難度分離提示）
> **專案名稱**：Money Tutor 金錢教學系統
> **單元編號**：A2 — 理髮廳自助機
> **報告類型**：單元完成經驗與開發建議

## 一、檔案規模總覽

| 檔案 | 路徑 | 行數 | 大小 |
|------|------|------|------|
| HTML 頁面 | `html/a2_barber_shop_kiosk.html` | 450 行 | 14.4 KB |
| JS 核心邏輯 | `js/a2_barber_shop_kiosk.js` | 8,163 行 | 386 KB |
| CSS 樣式 | `css/a2_barber_shop_kiosk.css` | 3,136 行 | 68 KB |
| 作業單產生器 | `worksheet/units/a2-worksheet.js` | 341 行 | 21 KB |
| **合計** | — | **12,090 行** | **489 KB** |

### 與 A1 規模比較

| 項目 | A1 販賣機 | A2 理髮廳 | 差異 |
|------|----------|----------|------|
| JS 行數 | 6,080 | 8,163 | +34% |
| HTML 行數 | 31 | 450 | +1,352%（A2 含 Loading、Error Boundary） |
| CSS 行數 | 821 | 3,136 | +282% |
| 合計行數 | 7,290 | 12,090 | +66% |

### 素材資源

| 類型 | 數量 | 路徑 | 總大小 |
|------|------|------|--------|
| 服務圖片 | 10 張 PNG | `images/a2/icon-a2-*.png` | 2.4 MB |
| 錢幣圖片 | 18 張 PNG（9面額×正反面） | `images/money/*_yuan_front/back.png` | 共用 |
| 音效檔案 | 5 種（correct.mp3, correct02.mp3, success.mp3, error.mp3, click.mp3） | `audio/*.mp3` | 共用 |

### 圖片資源明細

| 檔案名 | 大小 | 用途 |
|--------|------|------|
| `icon-a2-barber-shop.png` | 308 KB | 歡迎畫面店鋪圖示 |
| `icon-a2-barber-shop-02.png` | 280 KB | 備用店鋪圖示 |
| `icon-a2-mens-haircut.png` | 135 KB | 男士剪髮服務 |
| `icon-a2-womens-haircut.png` | 161 KB | 女士剪髮服務 |
| `icon-a2-hair-wash.png` | 217 KB | 洗髮服務 |
| `icon-a2-hair-coloring.png` | 236 KB | 染髮服務 |
| `icon-a2-hair-perm.png` | 239 KB | 燙髮服務 |
| `icon-a2-scalp-protection.png` | 264 KB | 頭皮隔離服務 |
| `icon-a2-scalp-massage.png` | 314 KB | 頭皮按摩服務 |
| `icon-a2-hair-treatment.png` | 215 KB | 護髮服務 |

---

## 二、單元特色

### 2.1 完整模擬理髮廳自助機體驗

A2 模擬了理髮廳自助繳費取號機的完整操作流程：

1. **選擇服務** → 從 6 種理髮服務中點選（含圖片與價格）
2. **投幣付款** → 從錢包中選取紙鈔和硬幣投入
3. **列印票券** → 票券列印動畫 + 條碼生成
4. **取得號碼牌** → 顯示等候號碼，完成交易

### 2.2 設定驅動架構（Configuration-Driven）

A2 是 A 系列中**設定驅動程度最高**的單元，核心行為完全由 JSON 設定物件控制：

| 設定物件 | 說明 | 控制內容 |
|---------|------|---------|
| `serviceConfig` | 服務定義 | 各難度的服務項目、價格、圖片、鍵盤快捷鍵 |
| `speechTemplates` | 語音模板 | 各難度的語音台詞，含佔位符替換 |
| `timingConfig` | 時間配置 | 各難度的動畫延遲、場景轉場、列印時間 |

此架構使得新增難度等級或修改服務項目只需修改設定物件，無需改動流程邏輯。

### 2.3 六種理髮服務

| 服務 | 價格 | 圖示 | 鍵盤快捷鍵 |
|------|------|------|-----------|
| 男士剪髮 | 150 元 | `icon-a2-mens-haircut.png` | 1 |
| 女士剪髮 | 200 元 | `icon-a2-womens-haircut.png` | 2 |
| 洗髮 | 30 元 | `icon-a2-hair-wash.png` | 3 |
| 染髮 | 500 元 | `icon-a2-hair-coloring.png` | 4 |
| 頭皮隔離 | 250 元 | `icon-a2-scalp-protection.png` | 5 |
| 頭皮按摩 | 150 元 | `icon-a2-scalp-massage.png` | 6 |

### 2.4 三種難度模式

| 模式 | 名稱 | 特點 |
|------|------|------|
| **簡單模式** | 引導式操作 | 每一步都有視覺＋語音提示，引導完成整個流程 |
| **普通模式** | 半引導式 | 自己操作，錯誤 3 次後自動出現提示 |
| **困難模式** | 完全自主 | 自己操作，無自動提示 |

### 2.5 兩種任務類型

| 類型 | 說明 |
|------|------|
| **指定任務** | 系統隨機指定一項服務，學習者必須找到並完成付款 |
| **自選模式** | 學習者自由選擇喜歡的服務 |

### 2.6 輔助點擊模式（Click Mode）

與 A1 相同的無障礙設計，專為**特殊需求學習者**打造：
- 啟用後，畫面上任何地方按一下即執行下一步操作
- 系統自動依序執行：選服務 → 投入紙鈔 → 投入硬幣 → 取票券
- 僅在**簡單模式 + 指定任務**下可啟用
- 搭配視覺高亮與語音引導，降低操作門檻
- 防快速連點鎖定時間：600ms

### 2.7 票號系統（含條碼生成）

A2 獨有的票號系統模擬真實理髮廳取號機制：
- 每完成一筆交易，票號遞增（1~999）
- **ASCII 條碼生成**：`ticket.generateBarcode(number)` 將號碼轉換為條碼圖樣
- 條碼以 `|` 和空格組成的圖案表示，每個數字對應一種固定圖樣
- 列印動畫模擬票券印出過程（時長依難度 2000~3000ms）

### 2.8 錢包系統

| 錢包類型 | 金額 | 組成 |
|---------|------|------|
| 預設 | 等於服務價格 | 隨機組合紙鈔＋硬幣 |
| 固定 500 元 | 500 | 2×100 + 5×50 + 5×10 |
| 固定 1000 元 | 1000 | 4×100 + 10×50 + 10×10 |

### 2.9 Loading 畫面與 Error Boundary

**A2 獨有功能**（A1 無此設計）：

- **Loading 畫面**：iOS 風格旋轉載入動畫，頁面載入後 1.5 秒自動淡出
- **Error Boundary**：全域錯誤捕捉機制，捕捉到錯誤時顯示友善的錯誤訊息並提供重新載入按鈕（排除 ResizeObserver 錯誤）

### 2.10 作業單系統

獨立的紙本作業單產生器，提供 **10 種題型**（與 A1 相同的 A 系列共用題型架構）：

| # | 題型 | 說明 |
|---|------|------|
| 1 | 數字填空（價格計算） | 計算多項服務總價 |
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
1. 檢測瀏覽器支援 → 2. 取得語音清單 → 3. 優先選台灣中文語音 → 4. 設置語速 0.9~0.95
```

**語音優先順序**：
1. Microsoft HsiaoChen（Windows 台灣女聲）
2. Google 國語（Chrome 台灣語音）
3. 其他 zh-TW 語音
4. 任何中文語音（fallback）

### 3.2 模板化語音系統（speechTemplates）

A2 的語音系統與 A1 最大差異在於**完全模板化**，各難度有獨立語音腳本：

**模板佔位符**：

| 佔位符 | 說明 | 範例 |
|--------|------|------|
| `{serviceName}` | 服務名稱 | 男士剪髮 |
| `{price}` | 服務價格 | 150 |
| `{amount}` | 投入/退回金額 | 100 |
| `{queueNumber}` | 等候號碼 | 3 |
| `{remaining}` | 剩餘應付金額 | 50 |

**各難度語音風格差異**：

| 場景 | 簡單模式 | 普通模式 | 困難模式 |
|------|---------|---------|---------|
| 歡迎 | 「歡迎光臨百元理髮店，本機只收百元紙鈔或硬幣，不找零錢」 | 更詳細的引導說明 | 正式且全面的營業說明 |
| 選擇服務 | 「您選擇了{serviceName}，費用是{price}元」 | 含更多操作提示 | 正式確認措辭 |
| 付款指示 | 「請投入{amount}元」 | 含面額建議 | 僅金額確認 |
| 金額不足 | 「金額不足，還需要{remaining}元」 | 含解決建議 | 簡短提示 |

### 3.3 語音觸發時機一覽

| 場景 | 語音內容範例 | 觸發時機 |
|------|-------------|---------|
| 歡迎畫面 | 「歡迎光臨百元理髮店」 | 進入歡迎頁後 |
| 指定任務 | 「請選擇{serviceName}，費用是{price}元」 | 任務彈窗出現 |
| 選擇服務 | 「您選擇了{serviceName}，費用是{price}元」 | 點選服務項目 |
| 投幣提示 | 「請投入{amount}元」 | 進入付款畫面 |
| 收到金額 | 「已收到{amount}元」 | 每次投幣後 |
| 金額不足 | 「金額不足，還需要{remaining}元」 | 投幣未滿時 |
| 付款完成 | 「付款完成！」 | 投幣足額 |
| 列印票券 | 「票卷列印中，請稍候」 | 票券列印動畫 |
| 取票完成 | 「請取走您的號碼牌，號碼是{queueNumber}號」 | 票券列印完成 |
| 退幣 | 「已退回{amount}元，感謝使用」 | 取消交易 |
| 操作錯誤 | 「選錯了，請選擇指定的服務」 | 選錯服務時 |
| 完成挑戰 | 「完成挑戰！共完成X題」 | 結束畫面 |

### 3.4 金額語音轉換

使用 `convertAmountToSpeech()` 函數（委託給 `NumberSpeechUtils.convertToTraditionalCurrency()`）：

| 金額 | 語音輸出 | 說明 |
|------|---------|------|
| 2 元 | 「兩元」 | 2 + 單位用「兩」 |
| 12 元 | 「拾貳元」 | 個位 2 用「貳」 |
| 30 元 | 「參拾元」 | 標準中文數字 |
| 150 元 | 「壹佰伍拾元」 | 標準中文數字 |
| 200 元 | 「兩百元」 | 百位 2 用「兩」 |
| 500 元 | 「伍佰元」 | 標準中文數字 |

### 3.5 語音注意事項

- **行動裝置限制**：iOS/Android 需要使用者互動後才能啟用語音
- **語音佇列管理**：使用 `interrupt` 選項可打斷前一句語音，避免語音堆積
- **回呼機制**：`speak(templateKey, replacements, callback)` 在語音結束後執行回呼，用於步驟串接
- **錯誤處理**：忽略 `interrupted` 類型錯誤（正常的語音被打斷）

---

## 四、觸控與桌面支援

### 4.1 桌面端支援

- 標準滑鼠點擊操作
- hover 效果（服務項目、按鈕、錢幣）
- **鍵盤快捷鍵**（A2 獨有）：
  - 數字鍵 `1`~`6`：直接選擇對應服務
  - `Enter`：確認操作
  - `Escape`：取消/返回

### 4.2 觸控端支援

- **Viewport 設定**：`width=device-width, initial-scale=1.0`
- **防下拉重整**：`overscroll-behavior-y: contain`
- **觸控音效解鎖**：引用 `audio-unlocker.js`（與 A1 不同，A1 自行實現解鎖）
- **行動裝置除錯面板**：引用 `mobile-debug-panel.js`

### 4.3 防快速連點（Debounce）機制

| 操作 | 鎖定時間 | 防護變數 |
|------|---------|---------|
| 輔助模式操作 | 600ms | `clickModeState.isExecuting` |
| 服務選擇 | 依場景 | `_lastSelectTime` |
| 投幣 | 依場景 | `_lastCoinClickTime` |
| 按鈕操作 | 依場景 | 各場景獨立 |

### 4.4 ARIA 標籤與無障礙

| 元素 | ARIA 屬性 | 說明 |
|------|----------|------|
| `<main id="app">` | `role="main"` | 主內容區域 |
| Loading 畫面 | `aria-label="理髮店售票機系統載入中"` | 載入狀態提示 |
| Error Boundary | `role="alert"` | 錯誤提示區域 |
| 動態公告 | `aria-live="polite"` | 動態添加（非頁面載入時） |

### 4.5 與 A1 的觸控支援差異

| 項目 | A1 販賣機 | A2 理髮廳 |
|------|----------|----------|
| 音效解鎖 | 自行實現 | 引用 `audio-unlocker.js` |
| 除錯面板 | 不引用 | 引用 `mobile-debug-panel.js` |
| 主題系統 | 不引用 | 引用 `theme-system.js` |
| 鍵盤快捷鍵 | 無 | 數字鍵 1-6、Enter、Escape |
| 拖曳工具 | 不引用 | 不引用（無拖曳需求） |

---

## 五、不同版面（RWD 響應式設計）

### 5.1 響應式斷點

| 斷點 | 範圍 | 版面配置 |
|------|------|---------|
| **桌面版** | >1200px | 三面板橫向排列（左面板＋中央螢幕＋右面板） |
| **平板版** | 769~1200px | 三面板縮小間距，左右面板 180px |
| **手機版** | 481~768px | 上下堆疊，左右面板改為橫向排列 |
| **極小螢幕** | ≤480px | 進一步縮小間距與字型 |

### 5.2 三面板 Kiosk 佈局（A2 獨有）

A2 採用三面板自助機佈局設計，與 A1 的左右兩區不同：

| 面板 | 桌面版寬度 | 說明 |
|------|----------|------|
| 左面板 | 250px | 紙鈔投入口 |
| 中央面板 | 550px（最大） | 螢幕顯示區（服務選擇、付款、票券等） |
| 右面板 | 250px | 硬幣投入口＋票券出口 |

**RWD 轉換行為**：
- 桌面版：三面板橫向排列，`gap: 20px`
- 平板版：左右面板縮至 180px，`gap: 10px`
- 手機版：`flex-direction: column`，三面板垂直堆疊，中央螢幕高度 420px
- 極小螢幕：中央螢幕高度 350px，`padding: 10px`

### 5.3 各版面差異

**桌面版**（>1200px）：
- 三面板橫向排列
- 服務卡片完整顯示圖片＋名稱＋價格
- 字型大小 36px 標題
- 完整 hover 效果

**平板版**（769~1200px）：
- 三面板維持橫向，但左右面板縮窄
- 中央螢幕無最大寬度限制

**手機版**（481~768px）：
- 垂直堆疊佈局
- 左右面板改為橫向排列（紙鈔和硬幣並排）
- 標題字型縮至 26px

**極小螢幕**（≤480px）：
- 進一步縮小間距與文字大小
- 各面板最小化

### 5.4 高對比模式

```css
@media (prefers-contrast: high) {
    /* 增強邊框與陰影，提升可讀性 */
}
```

### 5.5 設定頁面版面

- 居中白色卡片，最大寬度 600px
- 按鈕群組使用 flex-wrap，自動換行
- 在小螢幕上堆疊顯示

### 5.6 完成畫面版面

- 紫色漸層全螢幕背景
- 居中卡片最大寬度 500px
- 統計卡片使用 `grid-template-columns: repeat(2, 1fr)`
- 垂直置中顯示（`min-height: 100vh` + flexbox）

---

## 六、動畫系統

### 6.1 CSS 動畫清單

| 動畫名稱 | 效果 | 時長 | 用途 |
|----------|------|------|------|
| `spinIOS` | iOS 風格旋轉 | 0.8s 循環 | Loading 畫面旋轉器 |
| `fadeOut` | 淡出 | 0.5s | Loading 畫面隱藏 |
| `fadeIn` | 淡入 | 0.5s | 完成畫面 |
| `celebrate` | 彈跳旋轉出現 | 1s | 完成畫面卡片 |
| `bounce` | 上下跳動 | 1.5s 循環 | 完成畫面 emoji |
| `trophyBounce` | 上下微跳 | 依設定 | 獎盃動畫 |
| `glow` | 光暈脈衝 | 依設定 循環 | 表現徽章發光 |
| `pulseHint` | 黃色脈衝 | 1.5s 循環 | 步驟提示光暈 |

### 6.2 Loading 畫面動畫（A2 獨有）

```
載入流程：
1. 頁面開始載入 → 顯示白色全螢幕 + iOS 風格旋轉器
2. 旋轉器使用 cubic-bezier(0.4, 0, 0.2, 1) 緩動函數
3. 頁面載入完成 + 1.5 秒延遲 → fadeOut 動畫消失
```

### 6.3 票券列印動畫

票券列印過程有專屬動畫：
- 列印時間依難度：簡單 2000ms / 普通 2500ms / 困難 3000ms
- 模擬票券從機器中印出的視覺效果

### 6.4 Canvas-Confetti 煙火效果

| 觸發場景 | 粒子數 | 持續時間 |
|---------|--------|---------|
| 完成挑戰 | 50×n（漸減） | 3 秒 |

煙火效果使用與 A1 相同的 A 系列標準實現：
- 左右雙向發射（x: 0.1~0.3 / 0.7~0.9）
- 每 250ms 發射一輪
- 粒子數隨時間遞減

### 6.5 CSS 過渡效果

- 按鈕：`transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- hover 效果：`transform: scale()`, `translateY()`
- 服務卡片選中：邊框顏色變化 + 陰影增強

---

## 七、注意事項

### 7.1 瀏覽器相容性

| 功能 | Chrome | Safari | Firefox | Edge |
|------|--------|--------|---------|------|
| Web Speech API | 完整支援 | 部分支援 | 部分支援 | 完整支援 |
| Canvas-Confetti | 完整支援 | 完整支援 | 完整支援 | 完整支援 |
| CSS Grid/Flexbox | 完整支援 | 完整支援 | 完整支援 | 完整支援 |
| CSS Variables | 完整支援 | 完整支援 | 完整支援 | 完整支援 |
| Audio autoplay | 需互動 | 需互動 | 需互動 | 需互動 |
| `{ once: true }` listener | 完整支援 | 完整支援 | 完整支援 | 完整支援 |

- **Safari 語音**：中文語音選擇有限，可能退回系統預設語音
- **Firefox**：`speechSynthesis.getVoices()` 需要透過 `onvoiceschanged` 事件才能取得語音清單
- **IE11 不支援**：使用 arrow function、`{ once: true }` 等現代語法

### 7.2 行動裝置注意事項

- iOS Safari 必須在使用者互動後才能播放音效（已由 `audio-unlocker.js` 處理）
- 觸控裝置不支援 hover 效果，部分視覺回饋會缺失
- 小螢幕上三面板改為垂直堆疊，操作動線與桌面版不同
- 長語音在部分 Android 機型上可能被系統中斷
- `overscroll-behavior-y: contain` 防止下拉重整

### 7.3 教學使用注意事項

- **「不找零」設計**：理髮廳自助機模擬不找零的情境，學習者需投入正確金額
- **自選模式**下不計算對錯，完成畫面無表現評價
- **簡單模式**的輔助點擊模式僅支援指定任務（非自選）
- **固定錢包**的硬幣組成是固定的（500元 / 1000元），方便教師預知學習者的操作
- **鍵盤快捷鍵**可讓教師用數字鍵快速示範操作

### 7.4 已知限制

- **CSS 檔案註解錯誤**：`a2_barber_shop_kiosk.css` 開頭註解寫「A3理髮店售票機」，應為 A2
- **HTML 錯誤邊界文字**：Error Boundary 內文提到「售票機系統」，用語上與理髮廳情境稍有不符
- **服務數量固定**：目前固定 6 種服務，無法像 A1 的魔法商品系統那樣自訂服務

### 7.5 狀態管理現況

| 項目 | 狀態 |
|------|------|
| 統一重置函數 | ❌ 無（不需要） |
| 布林旗標 | `isProcessing`（1 個） |
| 重置位置 | 集中（1 處） |
| 評價 | ✅ **設計簡潔** |

**說明**：A2 單元僅使用單一 `isProcessing` 旗標，狀態管理已足夠清晰，無須額外重構

**搜尋關鍵字**：`isProcessing`

---

## 八、Bug 檢測與已知問題

### 8.1 已確認的程式碼問題

| # | 嚴重度 | 問題描述 | 位置 |
|---|--------|---------|------|
| 1 | **高** | 作業單與遊戲的服務價格不一致 | 見下方 8.2 詳述 |
| 2 | **高** | 53 個 setTimeout/setInterval 未清理，潛在記憶體洩漏 | 分散於 JS 全檔 |
| 3 | **中** | `speechSynthesis` 的 `voiceschanged` 監聽器從未移除 | 搜尋 `voiceschanged` |
| 4 | **中** | Click Mode 的 `_clickModeRecoveryInterval` 每 500ms 執行一次，從未停止 | 搜尋 `_clickModeRecoveryInterval` |
| 5 | **中** | CSS 檔案開頭註解寫「A3」而非「A2」 | `css/a2_barber_shop_kiosk.css` 第 3 行 |
| 6 | **中** | 66 個 `console.log` 除錯語句殘留 | 分散於 JS 全檔 |
| 7 | **低** | 48 處 CSS `!important` 過度使用 | `css/a2_barber_shop_kiosk.css` |
| 8 | **低** | 音訊元素缺少 `onerror` 錯誤處理 | HTML 的 `<audio>` 標籤 |
| 9 | **低** | 魔術數字散落各處（100、500、1000、600ms 等） | 分散於 JS 全檔 |
| 10 | **低** | Task Popup 的 `_taskPopupDismissed` / `_taskPopupScheduled` 旗標存在競態條件風險 | 搜尋 `_taskPopupDismissed` |
| 11 | **低** | 大量 `innerHTML` 賦值操作，可能影響效能 | 搜尋 `innerHTML` |
| 12 | **建議** | 動態添加的 Modal 缺少 ARIA label | 搜尋 `appendChild` |

### 8.2 作業單與遊戲的服務價格不一致（嚴重）

**遊戲中的服務價格**（`js/a2_barber_shop_kiosk.js`）：

| 服務 | 遊戲價格 |
|------|---------|
| 男士剪髮 | 150 元 |
| 女士剪髮 | 200 元 |
| 洗髮 | 30 元 |
| 染髮 | **500 元** |
| 頭皮隔離 | 250 元 |
| 頭皮按摩 | 150 元 |

**作業單中的服務價格**（`worksheet/units/a2-worksheet.js`）：

| 服務 | 作業單價格 |
|------|----------|
| 男士剪髮 | 150 元 |
| 女士剪髮 | 200 元 |
| 洗髮 | 30 元 |
| 染髮 | **350 元**（差異 -150 元） |
| 燙髮 | **550 元**（遊戲中無此服務） |

**影響**：
- 學生在遊戲中看到染髮 500 元，但作業單上是 350 元
- 作業單多了「燙髮 550 元」，少了「頭皮隔離」和「頭皮按摩」
- 造成學習混淆與計算錯誤

### 8.3 非 Bug 但需注意的設計

| 項目 | 說明 |
|------|------|
| 大型 State 物件 | state 包含 `easyMode` 和 `normalMode` 兩個獨立子物件，結構清晰但體積大 |
| HTML 豐富度高 | 450 行 HTML（含 Loading、Error Boundary、多個 Audio 標籤），比 A1 的 31 行大幅增加 |
| CSS 變數系統 | `:root` 定義完整色彩方案（primary-blue、accent-yellow 等），但部分元素仍用 inline style |
| 設定驅動設計 | speechTemplates、timingConfig、serviceConfig 全由 JSON 驅動，擴展性佳但檔案體積大 |

---

## 十、2026-03-22 功能增修記錄

### 10.1 coinFirst 灰暗效果修復（根本原因分析）

**問題**：`coin-first-locked` class 已加入 DOM，CSS 規則也載入，但 `getComputedStyle` 顯示 `filter: none`。

**根因**：
1. `.service-item` 有 `transition: all 0.3s`，導致 filter 從 `none` 過渡無法即時套用
2. `serviceItemFadeIn` 動畫從 `opacity: 0` 開始，CSS 動畫數值優先於同屬性的 `!important` 靜態規則（動畫執行期間）

**修復**：
- CSS `.coin-first-locked` 加 `transition: none !important` 防止 transition 干擾
- JS `_lockServicesForCoinFirst()` 改用 `requestAnimationFrame` + `el.style.setProperty('filter', ..., 'important')` inline style 強制覆蓋
- CSS `serviceItemFadeIn` selector 加 `:not(.coin-first-locked):not(.coin-first-unlocking):not(.coin-first-available)`（全 7 條規則），防止 unlock 動畫時 `opacity:0` 短暫出現

**搜尋關鍵字**：`requestAnimationFrame`, `coin-first-locked`, `serviceItemFadeIn :not()`, `transition: none !important`

### 10.2 指示燈放大 + 亮燈變紅

- `.indicator-light`：12px → 18px
- 服務 unlock 完成後（`coin-first-available` class 加入後 650ms），呼叫 `activeLight.classList.add('active')`
- `.active` CSS 已有 `background: #ff3b30`、`box-shadow: 0 0 10px rgba(255,59,48,0.8)`、`animation: redLightPulse`

**搜尋關鍵字**：`.indicator-light 18px`, `light.classList.add('active')`, `redLightPulse`

### 10.3 coinFirst「需要金額」顯示錯誤修復

**問題**：彈窗與螢幕顯示「需要：500元」，服務實際只需 30元。

**根因**：`_lockServicesForCoinFirst()` 把 `requiredAmount = maxPrice`（超投保護上限），三個顯示點都直接讀這個值。

**修復**：三個顯示點（`moneySelectionModal`、`updateMoneyDisplay`、`updateMoneyDisplayInScreen`）各自計算 `displayReq`：
```javascript
const _cfSvc = this.isCoinFirstMode()
    ? (this.state.gameState.easyMode?.assignedService || this.state.gameState.normalMode?.assignedService)
    : null;
const _displayReq = _cfSvc ? _cfSvc.price : this.state.gameState.requiredAmount;
```

**搜尋關鍵字**：`_displayReq`, `_cfSvc`, `easyMode.assignedService || normalMode.assignedService`

### 10.4 設定頁按鈕寬度修復

「先投幣再選服務」和「先選服務再投幣」下的任務類型按鈕（指定任務/自選服務）改用 `<div class="button-group">` wrapper，移除 `style="flex:1"`，讓按鈕寬度自適應文字（同 A1）。

**搜尋關鍵字**：`button-group`（移除 `flex:1`）

### 10.5 自訂金額功能（自選服務 / 先投幣自選）

自選服務（`freeChoice` / `coinFirstFree`）設定頁新增「自訂金額」按鈕，點擊後開啟幣值選擇彈窗（10/50/100元，含 +/− 按鈕、即時總金額、最少 30元警告）。

**State**：`settings.walletType = 'custom'`、`settings.walletAmount = number`、`settings.customWalletDetails`、`settings.customWalletTypes`

**修復點**：
- 確認後不呼叫 `showSettings()`（改用 in-place DOM 更新），避免設定頁閃爍
- `setupFreeChoiceMode()` 新增 `custom` 分支，呼叫 `generateCustomWalletFromDetails()`
- `updateWalletOptionsDisplay()` 允許 `'custom'` 為有效值
- 最低 30元 real-time 警告（`#custom-wallet-warning`）

**搜尋關鍵字**：`showCustomWalletModal`, `adjustCustomWalletQuantity`, `confirmCustomWallet`, `custom-wallet-warning`, `setupFreeChoiceMode custom`

---

## 九、未來開發單元時的建議

### 9.1 模組化拆分

**問題：JS 檔案過大（8,163 行，比 A1 再多 34%）**

A2 將所有邏輯集中在單一 `BarberKiosk` 物件中，雖然組織有序但體積龐大。

**建議的拆分結構**：

```
js/
├── a2/
│   ├── a2-main.js              # 入口、初始化、場景切換（~600 行）
│   ├── a2-config.js            # serviceConfig, speechTemplates, timingConfig（~800 行）
│   ├── a2-settings.js          # 設定頁面邏輯（~700 行）
│   ├── a2-game-flow.js         # 遊戲流程控制（~1,000 行）
│   ├── a2-payment.js           # 投幣、付款、錢包邏輯（~800 行）
│   ├── a2-ui-render.js         # 畫面渲染函數（~1,200 行）
│   ├── a2-click-mode.js        # 輔助點擊模式（~600 行）
│   ├── a2-hints.js             # 提示系統（~500 行）
│   ├── a2-ticket.js            # 票號與條碼系統（~200 行）
│   ├── a2-audio-speech.js      # 音效與語音管理（~400 行）
│   └── a2-animations.js        # 動畫相關（~200 行）
```

### 9.2 設定驅動架構的改進

A2 已經建立了良好的設定驅動模式，建議進一步改進：

**1. 統一設定物件命名**

```javascript
// 建議：將 serviceConfig、speechTemplates、timingConfig 統一為
const A2_CONFIG = {
    services: { easy: [...], normal: [...], hard: [...] },
    speech: { easy: {...}, normal: {...}, hard: {...} },
    timing: { easy: {...}, normal: {...}, hard: {...} },
    wallet: { FIXED_500: 500, FIXED_1000: 1000, BILL_THRESHOLD: 100 },
    debounce: { CLICK_MODE: 600, DEFAULT: 300 }
};
```

**2. 消除魔術數字**

目前 `100`（紙鈔閾值）在程式碼中出現 23 次、`500` 出現 10+ 次、`1000` 出現 8+ 次。應集中定義為常數。

### 9.3 作業單服務資料一致性

**問題**：遊戲與作業單的服務項目和價格不同步。

**建議**：
- 建立共用的服務資料源，遊戲和作業單均從同一來源讀取
- 或在作業單中引用遊戲的 `serviceConfig`
- 至少確保服務名稱和價格完全一致

### 9.4 記憶體管理改進

**問題**：53 個 `setTimeout`/`setInterval` 中只有 11 個有對應的 `clearTimeout`/`clearInterval`。

**建議**：

```javascript
// 建立定時器管理器
const TimerManager = {
    _timers: new Set(),
    _intervals: new Set(),

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
        this._intervals.forEach(id => clearInterval(id));
        this._timers.clear();
        this._intervals.clear();
    }
};

// 場景切換時
TimerManager.clearAll();
```

### 9.5 Console.log 清理

66 個 `console.log` 語句應依以下原則處理：
- **保留**：系統初始化完成提示（`[A2-Kiosk] 理髮店售票機系統啟動`）
- **移除**：所有除錯用途的 log（錢包生成細節、點擊事件追蹤等）
- **替代方案**：使用 `DEBUG` 旗標控制輸出

```javascript
const DEBUG = false;
function debugLog(...args) {
    if (DEBUG) console.log('[A2-Kiosk]', ...args);
}
```

### 9.6 CSS 架構改進

**問題**：
1. CSS 檔案開頭註解錯誤（寫「A3」）
2. 48 處 `!important`，特別是 `.step-hint` 區塊有 18 個 `!important`
3. 部分動畫定義在 JS 的 inline style 中

**建議**：
- 修正 CSS 註解
- 減少 `!important` 使用，改用更高特異性的選擇器
- 將 JS 中的 inline 動畫移至 CSS 檔案
- 共用動畫（`fadeIn`、`celebrate`、`bounce`）提取至 `css/common-animations.css`

### 9.7 Error Boundary 改進

A2 已有 Error Boundary（A1 無此功能），但可進一步強化：
- 區分網路錯誤、語音錯誤、音效錯誤等類型
- 記錄錯誤至 localStorage 供後續診斷
- Error Boundary 文字從「售票機系統」改為更貼合理髮廳情境的用語

### 9.8 事件管理改進

與 A1 相同的建議，使用 `AbortController` 管理場景生命週期內的事件監聽：

```javascript
// 每個場景建立獨立的 AbortController
const controller = new AbortController();
element.addEventListener('click', handler, { signal: controller.signal });
// 場景切換時
controller.abort(); // 一次移除所有監聽器
```

特別注意 `speechSynthesis` 的 `voiceschanged` 監聽器需要在適當時機移除。

### 9.9 A2 特有的改進建議

| 改進項目 | 說明 | 優先度 |
|---------|------|--------|
| 服務價格同步 | 統一遊戲與作業單的服務定義 | 高 |
| 自訂服務 | 類似 A1 的魔法商品，允許教師自訂理髮服務 | 中 |
| 條碼視覺化 | 將 ASCII 條碼改為 Canvas/SVG 繪製的真實條碼 | 低 |
| 找零模式 | 增加「找零」模式，模擬需要找零的情境 | 低 |
| 票券印出動畫 | 強化列印動畫效果（紙張滑出效果） | 低 |

### 9.10 死碼清理

| 需檢查項目 | 估計行數 | 說明 |
|-----------|---------|------|
| 未使用的 `quiz` state 屬性 | ~20 行 | `quiz: { currentQuestion, score, ... }` 是否被使用 |
| 冗餘的 debounce 變數 | ~30 行 | 多處獨立實現的防快速連點邏輯 |
| **建議清理總計** | **~50 行** | 比 A1 的 200 行死碼少 |

---

## Bug 修正記錄（2026-02-13 更新）

| # | 問題 | 嚴重度 | 修正狀態 |
|---|------|--------|---------|
| 1 | 作業單與遊戲的服務價格不一致 | 高 | ✅ 同步 6 項服務至作業單 |
| 2 | 53 個 setTimeout/setInterval 未清理 | 高 | ✅ TimerManager 重構完成（67 個 setTimeout 遷移，2026-02-17） |
| 3 | voiceschanged 監聽器從未移除 | 中 | ✅ 加入 { once: true } |
| 4 | _clickModeRecoveryInterval 從未停止 | 中 | ✅ 新增 clearClickModeRecoveryInterval() + unbindClickModeHandler() |
| 5 | CSS 檔案註解寫「A3」而非「A2」 | 中 | ✅ 修正為 A2 |
| 6 | 66 個 console.log 殘留 | 中 | ✅ Debug Logger FLAGS 系統重構完成（406 個 console 統一管理，2026-02-21） |
| 7 | 48 處 CSS !important | 低 | 🔲 暫緩（CSS 重構） |
| 8 | 音訊元素缺少 onerror | 低 | ✅ 為 4 個 audio 元素添加 onerror 屬性 |
| 9 | 魔術數字散落 | 低 | 🔲 暫緩（涉及 100+ 處） |
| 10 | Task Popup 旗標競態條件 | 低 | ✅ closeTaskPopup() 增加旗標重置 |
| 11 | 大量 innerHTML 賦值 | 低 | 🔲 暫緩（架構重構） |
| 12 | Modal 缺少 ARIA label | 建議 | ✅ Task Popup Modal 添加 role="dialog" + aria-modal + aria-labelledby |
| — | alert() 阻塞操作（10 處） | 中 | ✅ 新增 showToast() + 全部替換 |
| 13 | 簡單模式自選服務投完部分紙鈔後彈窗卡住 | 高 | ✅ showEasyFreeChoiceHint() 改用 walletCoins |
| 14 | 輔助點擊模式 + 自選服務導致 buildActionQueue 報錯 | 高 | ✅ 自選服務時自動禁用並隱藏輔助點擊模式 |

**統計**：已確認問題 14 個 + 額外 1 個（12 個已修正、3 個暫緩）

### Bug #13：簡單模式自選服務付款彈窗卡住（2026-02-14 修正）

**問題**：選擇 250 元服務後，投完 2 張 100 元紙鈔（200 元），Modal 關閉後重新打開紙鈔彈窗，但此時已無紙鈔可選，導致卡住。

**原因**：`showEasyFreeChoiceHint()` 使用 `walletComposition`（初始快照）計算提示，而非 `walletCoins`（當前錢包狀態）。Modal 關閉後重新調用提示函數時，仍基於初始錢包計算，錯誤地認為還有紙鈔可用。

**修復**：搜尋關鍵字 `showEasyFreeChoiceHint`，將 `walletComposition` 改為 `walletCoins`。

**性質**：原始設計缺陷，非後續修復造成的回歸。

### Bug #14：輔助點擊模式 + 自選服務導致 crash（2026-02-14 修正）

**問題**：選擇簡單模式 + 輔助點擊模式 + 自選服務後開始測驗，觸發 `Uncaught TypeError: Cannot read properties of null (reading 'id')`。

**原因**：`buildActionQueue()` 嘗試存取 `assignedService.id`，但自選服務模式下 `assignedService` 為 `null`。根據設計文件，輔助點擊模式「僅在簡單模式 + 指定任務下可啟用」。

**修復**（2026-02-14 更新）：使用 disabled 狀態表達互斥關係，而非隱藏元素：
- 啟用輔助點擊模式 → 「自選服務」按鈕變成 disabled
- 選擇自選服務 → 輔助點擊「啟用」按鈕變成 disabled

**修改位置**：
- `bindSettingEvents()`: 檢查 disabled 狀態，阻止點擊
- `updateSetting()` 中 `clickMode` 處理：更新「自選服務」disabled
- `updateSetting()` 中 `taskType` 處理：更新輔助點擊「啟用」disabled
- 新增 `updateClickModeDisabledState()` 函數

**搜尋關鍵字**：`updateClickModeDisabledState` 或 `freeChoiceBtn.classList`

**性質**：UI 邏輯缺陷，已改用 disabled 狀態讓用戶更明確了解互斥關係。

---

## 十、總結

### A2 理髮廳的優勢

1. **設定驅動架構**：所有行為由 `serviceConfig`、`speechTemplates`、`timingConfig` 驅動，擴展性佳
2. **三面板 Kiosk 佈局**：真實模擬自助機的外觀，沉浸感強
3. **票號系統**：含條碼生成，完整模擬取號流程
4. **錯誤恢復機制**：Loading 畫面 + Error Boundary，提升系統穩定性
5. **鍵盤快捷鍵**：支援數字鍵選擇服務、Enter 確認、Escape 取消
6. **CSS 變數系統**：`:root` 定義完整色彩方案，便於主題切換
7. **分難度語音**：每個難度有獨立的語音腳本，語氣從簡潔到正式遞進
8. **共用 JS 引用完整**：引用了所有共用工具（`audio-unlocker`、`theme-system`、`mobile-debug-panel`），比 A1 更規範

### A2 理髮廳的待改進處

1. **單一檔案過大**（8,163 行）→ 建議模組化拆分
2. ~~**作業單與遊戲價格不一致**~~ → ✅ 已修正（2026-02-10）
3. **53 個定時器未清理** → 建議使用 TimerManager
4. **66 個 console.log** → 建議清理或改用 DEBUG 模式
5. ~~**CSS 註解錯誤（A3→A2）**~~ → ✅ 已修正（2026-02-10）
6. **48 個 !important** → 建議減少
7. **缺乏自訂服務功能** → 建議參考 A1 魔法商品系統

### 與 A1 的架構比較

| 面向 | A1 販賣機 | A2 理髮廳 | 評估 |
|------|----------|----------|------|
| 程式碼量 | 7,290 行 | 12,090 行 | A2 大 66% |
| HTML 結構 | 31 行（極簡） | 450 行（豐富） | A2 含 Loading/Error |
| 設定驅動 | 部分 | 完全 | A2 更好 |
| 語音系統 | 直接撰寫 | 模板驅動 | A2 更好 |
| 無障礙 | 基本 ARIA | ARIA + Error Boundary + Loading | A2 更好 |
| 共用 JS | 缺少 3 個引用 | 全部引用 | A2 更好 |
| 鍵盤支援 | 無 | 數字鍵+Enter+Escape | A2 更好 |
| 自訂內容 | 魔法商品 | 無 | A1 更好 |
| 死碼量 | ~200 行 | ~50 行 | A2 更好 |
| 價格一致性 | 無問題 | ~~作業單不一致~~ ✅ 已修正 | 一致 |

### 對後續單元開發的影響

A2 的設定驅動架構（`speechTemplates`、`timingConfig`、`serviceConfig`）是 A 系列中最成熟的架構模式。建議後續新單元（或重構現有單元）優先採用 A2 的設定驅動模式，搭配模組化拆分以控制單一檔案大小。

作業單與遊戲的資料一致性問題應作為**所有 A 系列單元的檢查項目**，避免學習者在兩個場景中看到矛盾的數據。

---

*報告完成時間：2026-02-09 12:38*
*報告產生者：Claude Code (claude-opus-4-6)*

---

## 驗證記錄

### 2026-02-21：Debug Logger FLAGS 分類開關系統

**版本更新**：v1.1.0 → v1.2.0

**重構內容**：將所有 console.log/warn/error 呼叫轉換為 Debug FLAGS 分類開關系統

**轉換統計**：
- **總轉換數量**：406 個 Debug 呼叫
- **內部保留**：3 個 console 呼叫（Debug.log/warn/error 內部實現）

**FLAGS 分類（14 個）**：

| FLAG | 說明 | 範例日誌標籤 |
|------|------|-------------|
| `all` | 全域開關 | - |
| `init` | 初始化 | [A2-Kiosk] |
| `state` | 狀態管理 | [Setting] |
| `ui` | UI 渲染 | [Task Popup], [Ticket Print], [Fireworks] |
| `audio` | 音效 | [A2-Kiosk] 音效相關 |
| `speech` | 語音 | [Speech], [Easy Mode Speech] |
| `coin` | 投幣相關 | [Wallet], [Fixed Wallet], [Wallet Generator] |
| `payment` | 付款驗證 | [Payment], [Easy Mode Payment], [Normal Mode Payment] |
| `service` | 服務選擇 | [Service] |
| `flow` | 遊戲流程 | [Complete], [Normal Mode], [Assigned Mode] |
| `assist` | 輔助點擊模式 | [A2-ClickMode] |
| `hint` | 提示系統 | [Easy Mode Hint], [Normal Mode Hint], [Payment Hint] |
| `timer` | 計時器 | [A2-TimerManager] |
| `event` | 事件處理 | [A2-EventManager] |
| `error` | 錯誤（預設開啟） | - |

**Debug 系統實現**：
```javascript
Debug: {
    FLAGS: {
        all: false,         // 全域開關
        init: false,        // 初始化
        state: false,       // 狀態管理
        ui: false,          // UI 渲染
        audio: false,       // 音效
        speech: false,      // 語音
        coin: false,        // 投幣相關
        payment: false,     // 付款驗證
        service: false,     // 服務選擇
        flow: false,        // 遊戲流程
        assist: false,      // 輔助點擊模式
        hint: false,        // 提示系統
        timer: false,       // 計時器
        event: false,       // 事件處理
        error: true         // 錯誤（預設開啟）
    },

    log(category, ...args) {
        if (this.FLAGS.all || this.FLAGS[category]) {
            console.log(`[A2-${category}]`, ...args);
        }
    },

    warn(category, ...args) {
        if (this.FLAGS.all || this.FLAGS[category]) {
            console.warn(`[A2-${category}]`, ...args);
        }
    },

    error(...args) {
        console.error('[A2-ERROR]', ...args);
    }
}
```

**使用方式**：
```javascript
// 開啟單一分類
BarberKiosk.Debug.FLAGS.payment = true;

// 開啟全部
BarberKiosk.Debug.FLAGS.all = true;

// 使用 Debug 方法
this.Debug.log('payment', '[Normal Mode Payment] 選擇金額:', amount);
this.Debug.error('[Ticket] 語音播放錯誤:', error);
```

**驗證結果**：
- Console 無多餘日誌輸出（除 error 外）✅
- FLAGS 開關切換正常運作 ✅
- 原有功能不受影響 ✅

---

### 2026-02-17：TimerManager 重構完成

**Phase 2：setTimeout 遷移**
- **遷移數量**：60 個 setTimeout 調用
- **分類統計**：

| 類別 | 數量 | 用途 |
|------|------|------|
| audioCallback | 2 | 音效回調 |
| speechDelay | 8 | 語音延遲 |
| uiAnimation | 20 | UI 動畫 |
| screenTransition | 8 | 畫面轉場 |
| clickMode | 22 | 輔助點擊模式 |

**Phase 3：addEventListener 狀況**
- **保留原因**：大多數 addEventListener 使用 `once: true` 自清理或有手動 bind/unbind 管理
- **建議**：未來可選擇性遷移設定頁面事件

**版本更新**：v1.0.0 → v1.1.0

**驗證結果**：
- Console 顯示計時器清理日誌 ✅
- 多輪測試後無記憶體洩漏 ✅

---

### 2026-02-16：系統性驗證

**驗證內容**：

| 項目 | 狀態 | 說明 |
|------|------|------|
| TimerManager | ✅ 已實現 | 60 個 setTimeout 已遷移 |
| EventManager | ⚠️ 待優化 | 基礎架構已就緒，大部分使用 once:true |
| injectGlobalAnimationStyles | ✅ 已實現 | 7 處內嵌動畫整合完成 |
| 完成畫面 | ✅ 正常 | 採用 A 系列統一完成畫面樣式 |
| confetti 煙火 | ✅ 正常 | 使用 v1.9.2 本地化版本 |

**建議改進（P2）**：
- 可選：遷移設定頁面 addEventListener 到 EventManager

**結論**：A2 已達記憶體管理標準，TimerManager 運作正常。

### 2026-02-22：動畫定義整合

**修改版本**：v1.4.0

**整合內容**：

| 階段 | 說明 | 修改數量 |
|------|------|---------|
| Phase 1 | 新增 `injectGlobalAnimationStyles()` 函數 | 7 個 @keyframes |
| Phase 2 | 移除 JS 內嵌 @keyframes | 7 處 |

**Phase 1：新增統一動畫函數**

在 `js/a2_barber_shop_kiosk.js` 中新增：
```javascript
injectGlobalAnimationStyles() {
    if (document.getElementById('a2-global-animations')) return;
    // 7 個 @keyframes 定義
}
```

**動畫清單**：
| 動畫名稱 | 用途 | 來源 |
|---------|------|------|
| `modalFadeIn` | 模態背景淡入 | task popup |
| `modalSlideIn` | 模態內容縮放滑入 | task popup |
| `slideInScale` | 縮放上滑進場 | error modal |
| `errorModalBounce` | 錯誤模態圖示彈跳 | error modal（原 bounce） |
| `celebrate` | 完成畫面慶祝 | completion screen |
| `completionBounce` | 完成畫面獎盃彈跳 | completion screen（原 bounce） |
| `clickModePulse` | 點擊模式脈衝（含中心定位） | start prompt（原 pulse） |

**Phase 2：移除內嵌動畫（7 處）**

| 位置 | 移除內容 | 替代方案 |
|------|---------|---------|
| task popup | `modalFadeIn`, `modalSlideIn` | → `injectGlobalAnimationStyles()` |
| shakeHintAnimation | `shake` 動態注入 | → CSS (line 2602) |
| showPaymentError | `fadeIn`, `slideInScale`, `bounce` | → CSS + `errorModalBounce` |
| showPaymentError | `fadeOut` 動態注入 | → CSS (line 113) |
| showCompletionScreen | `fadeIn`, `celebrate`, `bounce` | → CSS + `completionBounce` |
| createNumberInput | `fadeIn`, `bounceIn` | → CSS (lines 1155, 1166) |
| showStartPrompt | `pulse` 動態注入 | → `clickModePulse` |

**命名衝突處理**：
- `bounce` → 拆分為 `errorModalBounce`（錯誤彈窗）、`completionBounce`（完成畫面）
- `pulse` → 重命名為 `clickModePulse`（含 translate 中心定位）

**CSS 已有動畫（無需重複定義）**：
- `fadeIn` (line 1155)、`fadeOut` (line 113)
- `shake` (line 2602)、`bounceIn` (line 1166)
- `pulse` (line 1040)

---

### 2026-02-22：Debug Logger 嵌套物件檢查

**檢查結果**：✅ 無問題

**說明**：A2 的 `TimerManager` 和 `EventManager` 已正確使用 `BarberKiosk.Debug.log()`（而非 `this.Debug`），不存在嵌套物件 `this` 綁定問題。

**相關程式碼位置**：
- `TimerManager.clearAll()` (line ~3542)：使用 `BarberKiosk.Debug.log('timer', ...)`
- `TimerManager.clearByCategory()` (line ~3555)：使用 `BarberKiosk.Debug.log('timer', ...)`
- `EventManager.removeAll()` (line ~3583)：使用 `BarberKiosk.Debug.log('event', ...)`
- `EventManager.removeByCategory()` (line ~3597)：使用 `BarberKiosk.Debug.log('event', ...)`

**與其他單元比較**：
| 單元 | 嵌套物件狀況 | 修復狀態 |
|------|-------------|---------|
| A1 | TimerManager/EventManager 使用 `this.Debug` | ✅ 已修復 → `VendingMachine.Debug` |
| A2 | TimerManager/EventManager 使用 `BarberKiosk.Debug` | ✅ 原本正確 |
| A3 | SceneConfig/audio/speech 使用 `this.Debug` | ✅ 已修復 → `McDonald.Debug` |
| A4 | SceneConfig/speech/priceStrategy 使用 `this.Debug` | ✅ 已修復 → `Game.Debug` |

---

### 2026-02-24（第二輪）：稽核結果

**第二輪全面稽核發現（架構性問題，暫列為待辦）**：

- ✅ 完成畫面符合 A 系列標準
- ✅ 作業單連結不傳 count 參數
- ✅ `injectGlobalAnimationStyles()` 正確實作
- ✅ EventManager 系統已實作（`BarberKiosk.EventManager`，含 `removeAll()` / `removeByCategory()`，共 6 處呼叫）；⚠️ 仍有約 26 個直接 `addEventListener` 尚未遷移進 EventManager，屬後續優化項目
- ✅ A 系列不需要 `resetGameState()`（該函數僅 C/F 系列實作），A2 狀態重置設計符合規範

---

### 2026-02-24：作業單連結統一簡化（僅傳 unit 參數）

**修改內容**：

- 作業單連結原本傳遞遊戲設定參數（`difficulty`）
- 各作業單已有完整工具列，用戶開啟後可直接在工具列調整；遊戲設定與作業單設定應獨立運作
- **修復**：移除所有多餘參數，統一改為只傳 `unit` 參數，讓作業單完全使用自己的預設値

**修改檔案**：`js/a2_barber_shop_kiosk.js`

---

### 2026-02-26：11-19 元語音唸法稽核確認（無修改）

**稽核結果**：A2 的金額語音透過 `convertAmountToSpeech(amount)` → `NumberSpeechUtils.convertToTraditionalCurrency(amount)` 路由，完全使用共用模組。共用模組 `number-speech-utils.js` 已於 2026-02-26 補入 11-19 的 specialCases（`'十一元'`~`'十九元'`），A2 自動受益，無需額外修改。

---

---

### 2026-02-27：完成畫面 Bug 修復（第三輪）

| # | 問題 | 根本原因 | 修復方式 |
|---|------|----------|----------|
| 1 | 煙火動畫永遠不停（記憶體洩漏） | `showCompletionScreen()` 用 `setInterval` 驅動煙火，若返回設定，interval 無法被 `TimerManager.clearAll()` 清除 | 改為遞迴 `BarberKiosk.TimerManager.setTimeout(fireConfetti, 250, 'confetti')` 模式 |
| 2 | `showCompletionScreen()` 可能重複呼叫 | 無布林守衛旗標 | 加入 `_completionScreenShown` 旗標；`showSettings()` / `startOver()` 重置 |
| 3 | 設定頁面事件監聽器累積 | `bindSettingEvents()` 使用裸 `addEventListener`，每次返回設定即疊加 | 改為 `EventManager.on(..., 'settings')` + 加入 `removeByCategory('settings')` |
| 4 | 完成畫面獎勵連結監聽器累積 | 裸 `addEventListener` 未清除 | 改為 `EventManager.on(..., 'gameUI')` |

**修改檔案**：`js/a2_barber_shop_kiosk.js`

---

### 2026-02-27：speak() safeCallback + 8 秒逾時保護

**問題**：`Speech.speak()` 內部的 `BarberKiosk.TimerManager.setTimeout` 回呼中，`utterance.onend` 直接呼叫 `if (callback) callback()`，而 `utterance.onerror`（非 interrupted 情況）也直接呼叫 `if (callback) callback()`。若兩者在邊緣情況同時觸發，callback 被重複執行兩次。同時缺乏安全逾時保護。

**修復**：
- 在 TimerManager 回呼內新增 `callbackExecuted` + `safeCallback`
- `utterance.onend` 改為 `safeCallback()`
- `utterance.onerror` 非 interrupted 分支改為 `safeCallback()`；interrupted 分支設 `callbackExecuted = true` 防止逾時回呼仍觸發
- 加入 `BarberKiosk.TimerManager.setTimeout(safeCallback, 8000, 'speechDelay')` 安全逾時

**保留行為**：interrupted 錯誤（新語音取消舊語音的正常行為）不呼叫 callback，此設計維持不變。

**修改檔案**：`js/a2_barber_shop_kiosk.js`

---

### 2026-02-28：handleClickModeClick isTrusted 放行修復

**問題**：`handleClickModeClick` 移至捕獲階段（capture phase）後，`autoSelectMoney()` 等函數透過 `element.click()` 程式觸發的點擊（`isTrusted = false`）也會被攔截，造成自動操作流程卡住。

**修復**：白名單檢查後立即加入：
```javascript
if (!event.isTrusted) return;
```

**修改檔案**：`js/a2_barber_shop_kiosk.js`（`handleClickModeClick`）

---

### 2026-02-28：第2輪完成畫面封鎖 + viewTicket 事件穿透 Bug 修復

| # | 問題 | 根本原因 | 修復方式 |
|---|------|----------|----------|
| 1 | 第2輪完成後無法顯示完成畫面 | `startGame()` 未重置 `_completionScreenShown`，舊值 `true` 使守衛提前返回 | `startGame()` 加入 `this._completionScreenShown = false;` |
| 2 | 已完成訂單數顯示 2/1、3/1 | viewTicket 分支 `return;` 前未加 `stopPropagation()`，點擊穿透至 ticket modal「完成」按鈕，重複觸發 `completeTransaction()` | viewTicket 分支開頭加 `event.stopPropagation()` + `event.preventDefault()` |

**修改檔案**：`js/a2_barber_shop_kiosk.js`

---

### 2026-02-28：輔助點擊遮罩全程常駐 + 層級修正

**舊設計問題**：遮罩在 `isExecuting=true` 時建立、`waitingForClick=true` 時移除，頻繁切換。若完成畫面被封鎖，遮罩消失後遊戲元素可被直接點擊。

**新設計**：遮罩在 `initClickModeForWelcome()` 建立（`z-index: 10100`），只在完成畫面或 `unbindClickModeHandler()` 時移除；標題列 `z-index: 10200`（高於遮罩）。

**Z-index 層級**：遊戲 modals（最高 10000）→ 遮罩（10100）→ 標題列（10200）

**修改檔案**：`js/a2_barber_shop_kiosk.js`、`css/a2_barber_shop_kiosk.css`（`.kiosk-title-bar` z-index: 100 → 10200）

---

### 2026-02-28
- è¼å©é»æè¼ªè©¢ 4 è `setInterval` å¨æ¹çºéè¿´ `this.TimerManager.setTimeout(poll, delay, 'clickMode')`ï¼clickModeRecovery / autoSelectMoney / autoWaitPrintComplete / autoClickViewTicket

---

*報告更新時間：2026-02-28*
*報告產生者：Claude Code (claude-sonnet-4-6)*

---

## 廢棄程式碼稽核（2026-03-01）

**稽核範圍**：`js/a2_barber_shop_kiosk.js`（8,570 行）

### 結論：無需處理

| 類型 | 位置 | 內容 | 嚴重性 | 建議 |
|------|------|------|--------|------|
| 向後相容函數 | Lines 2858–2883 | `generateCustomWallet()` — 標記「舊版，保留以供相容」（~25 行），為 `customWalletDetails` 不可用時的 fallback | 低 | 刻意保留的安全回退，可在全面升級後刪除 |
| 廢棄標記注解 | Line 7038 | `// updateTicketPreview方法已刪除，不再需要票據預覽功能` — 僅為注解，無殘留程式碼 | 低 | 注解可保留或清除 |
| console.log | Lines 47–61 | Debug 系統定義內部呼叫 | — | 已受 FLAGS 守衛，無需處理 |

**整體評估**：程式碼整潔。`generateCustomWallet()` 為刻意保留的向後相容機制，並非廢棄死碼。

---

## 跨輪計時器洩漏稽核（2026-03-03）

**稽核背景**：A3 單元曾發現 `speakText()` 10 秒備援計時器在下一輪觸發導致跳輪的 Bug，已對全系列交叉稽核。

**A2 稽核結論：安全（無此問題）**

| 條件 | 狀態 | 說明 |
|------|------|------|
| ① 新輪次從語音 callback 觸發 | **不成立 ✅** | A2 的輪次推進（`completeTransaction()`）透過 `TimerManager.setTimeout(..., 500)` 純計時器觸發，不從語音 callback 呼叫 |
| ② interrupted 不呼叫 safeCallback | 不成立 ✅ | `interrupted` 時設 `callbackExecuted = true`（line 566），備援計時器為 no-op |
| ③ 新輪次函數無 clearAll() | 成立（但不觸發 bug） | `startGame()` 無 `clearAll()`，但條件①已保護 |

**結論**：條件①不成立（語音 callback 不觸發輪次切換），且條件②的防護使備援計時器為 no-op，bug 不可能發生。

---

## 語音速率統一 + 語音選擇優先順序更新（2026-03-04）

### 語音速率調整（rate → 1.0）

| 函數 | 舊 rate | 新 rate |
|------|---------|---------|
| `Speech.speak()` 主路徑 | 0.95 | 1.0 |
| `Speech.speakText()` 主路徑 | 0.9 | 1.0 |

`utterance.rate` 為相對倍數，數值 1.0 表示使用語音引擎的原生預設語速，非固定 wpm。統一改為 1.0 使各語音（Google 國語/HsiaoChen）在不同裝置上保持一致的自然語速。

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

## 跨單元修復（2026-03-05）— 設定頁連結按鈕文字粗黑修復

（詳細說明見 `report/A1_Unit_Completion_Report.md` 跨單元修復章節）

**問題**：`css/ai-theme.css` 全域 `a {}` 規則的 `transition: color` 使 `a.selection-btn { color: #000 !important }` 在 CSS 過渡期間失效，設定頁「開啟獎勵系統」連結按鈕文字呈現藍色而非粗黑。

**修復**：`css/ai-theme.css` 的 `a {}` 和 `a:hover {}` 改為 `a:not(.selection-btn):not(.choice-btn) {}`。

**關鍵搜尋詞**：`a:not(.selection-btn):not(.choice-btn)` in `css/ai-theme.css`

---

## 輔助點擊遮罩不覆蓋標題列（方案C）（2026-03-08）

**問題**：輔助點擊遮罩（z-index:10100，`inset:0`）覆蓋整個視窗，標題列按鈕被遮罩遮蔽無法點擊。

**修復**：遮罩建立時動態量測標題列高度（`getBoundingClientRect().bottom`），設 `top:${_tbBottom}px` 而非 `inset:0`。A2 CSS 標題列 z-index 從 10200 降回 100。

**關鍵搜尋詞**：`getBoundingClientRect().bottom`, `_tbBottom`, `click-exec-overlay`

---

## 裸 clearTimeout 修復（TimerManager ID）（2026-03-09）

**問題 1 — `_taskPopupTimeout`**（`closeTaskPopup()`）

`this._taskPopupTimeout` 由 `this.TimerManager.setTimeout()` 建立（返回內部計數器 ID），但 `closeTaskPopup()` 清除時使用裸 `clearTimeout(this._taskPopupTimeout)`，無法清除該計時器（實際是 no-op），彈窗可能在已關閉後仍延遲顯示。

**修復**：改為 `this.TimerManager.clearTimeout(this._taskPopupTimeout)`。

**問題 2 — `clickModeState._visualDelayTimer`**（clickMode 恢復函數）

`clickMode` 恢復函數清理段落（第二個清除點）使用裸 `clearTimeout(gs.clickModeState._visualDelayTimer)`，而第一個清除點（正確的）已用 `this.TimerManager.clearTimeout()`，兩處不一致。

**修復**：改為 `this.TimerManager.clearTimeout(gs.clickModeState._visualDelayTimer)`。

**修改**：`js/a2_barber_shop_kiosk.js`（搜尋 `_taskPopupTimeout` 和 `_visualDelayTimer` 的清除處）

---

## `bindEvents()` 監聽器累積修復（2026-03-14）

**問題**：`bindEvents()` 有 4 個呼叫點（每輪遊戲開始時各呼叫一次），函數內有 5 個匿名 `document.addEventListener`，其中 ticket-dispenser click listener 每次都重新綁定。使用者多輪遊戲後，在簡單模式步驟1點擊票券區時，`validateEasyModeAction('ticket-area')` 被重複呼叫 N 次（N = 遊戲輪數），導致錯誤音效重複播放。

**修復**：在 `bindEvents()` 頂部加入 `_documentEventsBound` 旗標防護，確保 document 層級監聽器僅綁定一次。

**關鍵搜尋詞**：`_documentEventsBound`

---

## 付款彈窗大改版（2026-03-22）

### 功能概要

針對普通/困難模式的付款流程進行全面重構，新增「錢包式」統一付款彈窗，改善兩階段付款邏輯與難度分離提示。

### 1. 統一錢包式付款彈窗（`walletPaymentModal`）

**新增函數** `HTMLTemplates.walletPaymentModal(activeType)`：
- 同時顯示紙鈔區（`.wp-section.wp-bills`）與硬幣區（`.wp-section.wp-coins`）
- 從紙鈔入口開啟：紙鈔區可點選，硬幣區灰暗（`inactive`）
- 從硬幣入口開啟：硬幣區可點選，紙鈔區灰暗
- coinFirst 模式使用 `assignedService.price` 計算正確金額（非 `requiredAmount=maxPrice`）
- 簡單模式維持原有 `moneySelectionModal` 路徑

**CSS 新增**（`css/a2_barber_shop_kiosk.css`）：
```css
.wp-section { margin-bottom: 10px; }
.wp-section-title { font-size: 14px; font-weight: 700; color: #64748b; }
.wp-section.inactive { opacity: 0.35; pointer-events: none; user-select: none; }
.wp-section .money-grid { max-height: none; overflow-y: visible; }
```

### 2. 兩階段付款邏輯重構

**`confirmMoneySelection(slotType)`**：
- 不強制紙鈔先於硬幣（任意順序）
- `shouldVerify` 觸發條件：
  - `insertedAmount >= requiredAmount`（超額立即判定）
  - `bothInserted`（兩階段均完成）
  - `slotType === 'bill' && hadNoCoins`（單純紙鈔錢包）
  - `slotType === 'coin' && hadNoBills`（單純硬幣錢包）
- coinFirst 分支呼叫 `validateCoinFirstPayment()`

**`updateSlotStatus()`**：
- 移除 `amountMatched` 停用條件
- 停用條件簡化為：`inserted || empty`

### 3. coinFirst 模式專屬付款驗證

**新增 `validateCoinFirstPayment()`**：
- coinFirstAssigned：`inserted === service.price` → 亮燈；否則 → `_handleCoinFirstPaymentError`
- coinFirstFree：找匹配服務 → 亮燈；否則 → `_handleCoinFirstPaymentError`

**新增 `_handleCoinFirstPaymentError(inserted, required)`**：
- 增加 `paymentErrorCount`
- 普通模式 3 次錯誤 → 錯誤語音播完後（callback）→ `showPaymentHintAfterErrors()`
- 困難模式：不自動觸發提示

### 4. 難度分離提示

**`validateNormalModePayment()`**：
```javascript
// 改前：const shouldShowHint = errorCount >= 3;
const shouldShowHint = errorCount >= 3 && difficulty === 'normal';
```

**語音鏈接修正**（`validateNormalModePayment` + `_handleCoinFirstPaymentError`）：
- 第 1/2 次錯誤：`付款金額不足/過多，已退回 X 元，請重新付款`
- 第 3 次（普通模式）：`付款金額不足/過多，請依提示付款` → 語音結束 → `showPaymentHintAfterErrors()` → `請投入紙鈔/硬幣，已標示正確的金額`

### 5. coinFirst 錯誤顯示修復

**問題**：`showPaymentError()` 與 `showPaymentHintAfterErrors()` 均使用 `state.gameState.requiredAmount`（= maxPrice = 500），coinFirst 模式下顯示「應付金額 500 元」（實際應為服務價格如 30 元）。

**修復**：兩函數均加入 coinFirst 判斷：
```javascript
let requiredAmount = this.state.gameState.requiredAmount;
if (this.isCoinFirstMode()) {
    const _svc = this.state.gameState.normalMode?.assignedService;
    if (_svc) requiredAmount = _svc.price;
}
```

### 6. coinFirstAssigned 錢包增量

**`setupCoinFirstAssignedMode()`** 普通/困難模式分支：
```javascript
// 改前：generateWalletCoins(price) → 精確金額
// 改後：generateWalletForAssignedMode(price) → 服務價格 + 100~500 元多餘
const walletData = this.generateWalletForAssignedMode(randomService.price);
this.state.gameState.normalMode.walletAmount = walletData.totalAmount;
```

### 7. 付款完成語音整合

**問題**：付款完成播放兩次語音（coinFirst `selectService` 的「選擇X，付款完成」+ `completePayment` 的「付款完成！」+ `printTicket` 的「票卷列印中，請稍後」）。

**修復**：
- coinFirst `selectService()`：移除預播語音，直接呼叫 `completePayment()`
- `completePayment()`：改播 `speakCustom('付款完成，票卷列印中')`，同時觸發列印動畫（不等語音結束）
- `printTicket()`：移除 `speech.speak('ticketPrinting')`

**結果**：僅播一次「付款完成，票卷列印中」，列印動畫與語音同步開始。

### 8. 燈號已亮時的任務彈窗修正

**問題**：coinFirst 服務燈號已亮、使用者按提示鈕時，任務彈窗仍顯示「先投幣再選服務」並播放「請先投幣…燈號就會亮起」。

**修復**：`showTaskPopup()` 與 `closeTaskPopup()` 均偵測服務是否已亮（`.coin-first-available` class）：
- 燈號未亮：標題「💰 先投幣再選服務」、說明「投入 NT$ X 後…」、按鈕「開始投幣」、語音「請先投幣…」
- 燈號已亮：標題「💡 請選擇服務」、說明「X的燈號已亮起，請點選服務」、按鈕「去選服務」、語音「X的燈號已亮起，請點選X服務」

**關鍵搜尋詞**：`walletPaymentModal`, `wp-section`, `validateCoinFirstPayment`, `_handleCoinFirstPaymentError`, `shouldVerify`, `willShowHint`, `serviceAlreadyLit`, `coin-first-available`

---

## 十九、2026-03-28 修正：元元語音 + coinFirst 亮燈邏輯

### 19.1 「元元」語音重複

**根因**：`selectService()` 中當 coinFirst 模式下點到已鎖定服務時觸發語音：
```javascript
`這個服務需要${this.convertAmountToSpeech(price)}元，請投入正確金額`
```
`convertAmountToSpeech()` 已在回傳值末尾含「元」（例如「參拾元」），模板再加一個「元」，結果播出「參拾元元」。

**修法**：移除模板末尾的 `元`，改為：
```javascript
`這個服務需要${this.convertAmountToSpeech(price)}，請投入正確金額`
```

---

### 19.2 coinFirst 亮燈改為 price ≤ inserted（同 A1 邏輯）

**問題**：`updateServiceAvailabilityByAmount()` 原使用精確相符（`inserted === price`）才亮燈，導致投入 250元 時只有恰好 250元 的服務亮燈，其他可負擔服務（30元、150元、200元）保持暗色。

**修法**：兩種 coinFirst 模式均改用 `price <= inserted`：

| 模式 | 亮燈條件 | 語音/步驟更新 |
|------|---------|-------------|
| coinFirstAssigned | 全部 `price <= inserted` 的服務亮燈 | 只對**指定服務**播語音、更新步驟至 step2 |
| coinFirstFree | 全部 `price <= inserted` 的服務亮燈 | forEach 完後批次語音（700ms）：`已有N個服務可以選了` |

**關鍵變數**：
- `isAssignedService = (taskType === 'coinFirstAssigned') && (serviceId === assignedServiceId)`
- 其他服務靜默解鎖（亮燈無語音）

---

### 19.3 錯選服務守衛

由於其他可負擔服務也會變成 `coin-first-available` 並可點選，需攔截 coinFirstAssigned 模式下選錯服務：

**normal/hard 模式**（line 5521）：
```javascript
// 原：taskType === 'assigned'
// 改：taskType === 'assigned' || taskType === 'coinFirstAssigned'
if ((taskType === 'assigned' || taskType === 'coinFirstAssigned') && assignedService) {
```

**easy 模式**（line 5544）：新增 coinFirstAssigned 專屬守衛，`service.id !== assignedService.id` 時播錯誤音效 + 語音「選錯了，請選擇X」並 return。

**關鍵搜尋詞**：`price <= inserted`、`已有${availCount}個服務可以選了`、`coinFirstAssigned 簡單模式：其他亮起的服務不可選`

---

## 二十、2026-03-28 修正：coinFirstAssigned 付款超額移除 cash 音效

### 20.1 問題描述

先投幣指定任務模式（`coinFirstAssigned`）下，投入金額超過服務價格（例如投 500元購買 150元服務）時，使用者在確認付款後會聽到 cash 音效，隨後才收到「付款金額過多」錯誤提示，造成「先聽到成功音感」的混淆。

### 20.2 根因

`confirmMoneySelection()` 中的音效判斷：

```javascript
// 改前
if (this.state.settings.taskType !== 'assigned') {
    this.audio.playSound('cash');
}
```

條件只排除 `'assigned'`，`'coinFirstAssigned'` 不在排除清單內，因此會播放 cash 音效。整個流程時序：

1. `confirmMoneySelection()` → 播 cash 音效 ← 問題點
2. 300ms 後 `validateCoinFirstPayment()` → 偵測超額 → `_handleCoinFirstPaymentError()` → 播 error 音效

### 20.3 修法

```javascript
// 改後
const _cfTaskType = this.state.settings.taskType;
if (_cfTaskType !== 'assigned' && _cfTaskType !== 'coinFirstAssigned') {
    this.audio.playSound('cash');
}
```

`coinFirstAssigned` 模式一律不播 cash 音效：
- 付款正確：完成後在 `selectService()` 觸發 correct02 + 煙火
- 付款超額：僅由 `_handleCoinFirstPaymentError()` 播 error 音效

`coinFirstFree`、`freeChoice`、`assigned` 等模式不受影響。

**關鍵搜尋詞**：`_cfTaskType`、`confirmMoneySelection`、`_handleCoinFirstPaymentError`

---

## 修復記錄速查（從 CLAUDE.md 遷移，2026-04-29）

| 項目 | 搜尋關鍵字 |
|------|------------|
| A2 coinFirst 灰暗 CSS cascade | `transition: none !important`, `requestAnimationFrame setProperty.*important`, `serviceItemFadeIn :not(.coin-first-unlocking)` |
| A2 coinFirst 指示燈放大+紅色 | `.indicator-light 18px`, `light.classList.add('active')`, `redLightPulse` |
| A2 coinFirst 需要金額顯示修復 | `_cfSvc`, `_displayReq`, `easyMode.assignedService || normalMode.assignedService` |
| A2 設定頁按鈕寬度修復 | `button-group`（移除 `flex:1`）|
| A2 自訂金額（自選服務）| `showCustomWalletModal`, `custom walletType`, `setupFreeChoiceMode custom`, `generateCustomWalletFromDetails` |
| A2 confirmCustomWallet 不閃爍 | `closeCustomWalletModal`, `customBtn.textContent`, `updateStartButton`, `custom-wallet-warning` |
| A2 coinFirst 新增 | `showCoinFirstScreen`, `_lockServicesForCoinFirst`, `_initCoinFirstScreen`, `updateServiceAvailabilityByAmount`, `coin-first-locked`, `coin-first-available`, `coinFirstAssigned`, `coinFirstFree` |
| A2 coinFirst 輔助點擊 | `coinFirstInsert`, `coinFirstSelect`, `autoSelectCoinFirstService`, `buildActionQueue`, `transitionToNextPhase` |
| A2 coinFirst 服務未鎖定修復 | `_lockServicesForCoinFirst`, `showTaskPopupIfNeeded` coinFirst guard, `closeTaskPopup` 播放引導語音 |
| A2 設定頁任務類型分組 | 先投幣再選服務/先選服務再投幣兩組標題；`coinFirstFree` 使用 fixed500/fixed1000 |
| A2 coinFirst 錢包修正+方框暗化 | `setupCoinFirstAssignedMode` 改用 `generateWalletCoins`；`_lockServicesForCoinFirst` 加 `coin-first-locked-wrapper`；CSS filter 移至 wrapper 層 |
| A2 coinFirst 紙鈔投完仍要求紙鈔 | `showNormalModeHint` coinFirst step1 加 `billsInserted` 判斷；`confirmMoneySelection` coinFirst 分支中 `hintShown` 時自動呼叫 `showNormalModeHint` |
| A2 錢包式付款彈窗（2026-03-22）| `walletPaymentModal(activeType)`, `.wp-section.inactive` |
| A2 兩階段付款重構（2026-03-22）| `confirmMoneySelection` `shouldVerify`；`updateSlotStatus` 移除 `amountMatched` |
| A2 coinFirst 付款驗證（2026-03-22）| `validateCoinFirstPayment`, `_handleCoinFirstPaymentError` |
| A2 難度分離提示（2026-03-22）| 普通模式 3 次自動顯示勾勾；困難模式僅提示鈕觸發；`willShowHint`, `hintSuffix` |
| A2 coinFirst 應付金額修復（2026-03-22）| `showPaymentError` + `showPaymentHintAfterErrors` 加 `isCoinFirstMode()` 判斷 |
| A2 coinFirstAssigned 錢包增量（2026-03-22）| `setupCoinFirstAssignedMode` 改用 `generateWalletForAssignedMode`（服務價格 + 100~500 元）|
| A2 付款完成語音整合（2026-03-22）| `completePayment` 改 `speakCustom('付款完成，票卷列印中')`；`printTicket` 移除 `speech.speak('ticketPrinting')` |
| A2 燈號已亮任務彈窗修正（2026-03-22）| `showTaskPopup` + `closeTaskPopup` 偵測 `.coin-first-available` |
| A2 元元語音重複（2026-03-28）| `selectService`：`convertAmountToSpeech` 已含「元」，移除末尾多餘「元」；搜尋 `這個服務需要` |
| A2 coinFirst 亮燈改 price<=inserted（2026-03-28）| `updateServiceAvailabilityByAmount`：`inserted===price` → `price<=inserted`；搜尋 `price <= inserted`, `已有${availCount}個服務可以選了` |
| A2 coinFirstAssigned 付款超額移除 cash 音效（2026-03-28）| `confirmMoneySelection` cash 音效條件加 `coinFirstAssigned` 排除；搜尋 `_cfTaskType` |
| A2 普通模式 step1 指定任務改彈窗（2026-03-20）| `showNormalModeHint` step1：移除 `difficulty==='hard'` 限制，指定任務統一呼叫 `showTaskPopup()` |
