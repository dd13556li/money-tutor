# 專案檔案關聯表

建立日期：2026-02-24
最後更新：2026-04-23（B1~B6 個別 Unit Completion Report 建立；B 系列 JS/CSS 行數更新；images/b4、images/b6 圖片目錄新增；A3/A4/A6 JS 行數同步）
專案路徑：`money_tutor/`

---

## 目錄結構概覽

```
money_tutor/
├── index.html              # 首頁（單元入口，含 #part1~#part4 四個頁籤）
├── html/                   # 27 個 HTML（24 單元 + 3 工具頁）
├── js/                     # 32 個 JS（18 F/C/A 主邏輯 + 6 B 系列 + 8 工具）
├── css/                    # 30 個 CSS（A×6 + B×7 + C×6 + F×6 + 共用×5）
├── audio/                  # 13 個 MP3
├── images/                 # 21 個子目錄（a1~a6, b1~b6 無圖, c1~c6, f1~f6, index, money, common）
├── reward/                 # 獎勵系統獨立模組
├── worksheet/              # 作業單系統獨立模組
├── doc/                    # 競賽申請文件（V2~V13 DOCX/MD + 生成腳本）
└── report/                 # 完成報告 + 專項報告（含本檔案）
```

---

## 零、以 index.html 為起點的關係架構圖

### 0-1 整體架構樹

```
index.html（首頁 / 金錢小達人）
├── 載入資源
│   ├── css/ai-theme.css                    # 全域主題、Design Tokens
│   ├── js/audio-unlocker.js                # 行動裝置音訊解鎖
│   └── js/theme-system.js                  # 深色 / 淺色主題切換
├── 圖片引用
│   └── images/index/icon-index-[單元].png  # 18 張入口縮圖（f1~f6, c1~c6, a1~a6）
└── 頁籤導覽（3 個分頁，共 18 個單元連結）
    ├── #part1 第一部分：基礎技能（F 系列）
    │   ├── → html/f1_object_correspondence.html      F1 一對一對應
    │   ├── → html/f2_rote_and_rational_counting.html F2 唱數
    │   ├── → html/f3_number_recognition.html         F3 數字認讀
    │   ├── → html/f4_number_sorting.html             F4 數字排序
    │   ├── → html/f5_quantity_comparison.html        F5 量比較
    │   └── → html/f6_number_composition.html         F6 數的組成
    ├── #part2 第二部分：核心課程（C 系列）
    │   ├── → html/c1_money_types.html                C1 認識錢幣
    │   ├── → html/c2_money_counting.html             C2 數錢
    │   ├── → html/c3_money_exchange.html             C3 換錢
    │   ├── → html/c4_correct_amount.html             C4 付款
    │   ├── → html/c5_sufficient_payment.html         C5 夠不夠
    │   └── → html/c6_making_change.html              C6 找零
    ├── #part3 第三部分：進階應用（A 系列）
    │   ├── → html/a1_vending_machine.html            A1 自動販賣機
    │   ├── → html/a2_barber_shop_kiosk.html          A2 理髮廳自助機
    │   ├── → html/a3_mcdonalds_order.html            A3 麥當勞點餐機
    │   ├── → html/a4_simulated_shopping.html         A4 模擬購物
    │   ├── → html/a5_atm_simulator.html              A5 ATM 提款機
    │   └── → html/a6_train_ticket.html               A6 火車售票機
    └── #part4 第四部分：預算規劃（B 系列）（2026-03-14 新增）
        ├── → html/b1_daily_budget.html               B1 今天帶多少錢
        ├── → html/b2_allowance_diary.html            B2 零用錢日記
        ├── → html/b3_savings_plan.html               B3 存錢計畫
        ├── → html/b4_sale_comparison.html            B4 特賣比一比
        ├── → html/b5_party_budget.html               B5 生日派對預算
        └── → html/b6_market_shopping.html            B6 菜市場買菜
```

---

### 0-2 各系列單元頁面相依關係

#### F 系列（html/fX_*.html，共 6 個）

```
html/fX_*.html
├── CSS（依載入順序）
│   ├── css/ai-theme.css                 # 全域主題
│   ├── css/shared-game-base.css         # C/F 共用基礎（難度選擇、計分、完成畫面）
│   ├── css/fX-*.css                     # 單元專屬（6 個）
│   ├── css/common-modal-responsive.css  # 共用響應式 Modal
│   └── css/dark-mode-simple.css         # 深色模式
├── JS（依載入順序）
│   ├── js/audio-unlocker.js             # 全部 F 系列引用
│   ├── js/theme-system.js              # 全部 F 系列引用
│   ├── js/number-speech-utils.js       # 全部 F 系列引用
│   ├── js/confetti.browser.min.js      # 全部 F 系列引用
│   ├── js/reward-launcher.js           # 全部 F 系列引用
│   ├── js/touch-drag-utility.js        # F1/F2/F3/F4/F6（F5 不含）
│   ├── js/emoji-library.js             # F1/F5/F6
│   └── js/fX_*.js                      # 單元主邏輯（主物件：Game / QuantityComparisonGame）
├── 音效（<audio> 標籤或 JS 動態載入）
│   ├── audio/success.mp3               # 完成畫面音效
│   ├── audio/correct.mp3               # 答對音效
│   ├── audio/error.mp3                 # 答錯音效
│   ├── audio/click.mp3                 # 點擊音效
│   └── audio/select.mp3               # 選擇音效
└── 導出連結（遊戲畫面內按鈕）
    ├── → reward/index.html             # 🎁 獎勵按鈕（via RewardLauncher）
    └── → worksheet/index.html?unit=fX  # 作業單連結
```

#### C 系列（html/cX_*.html，共 6 個）

```
html/cX_*.html
├── CSS（依載入順序）
│   ├── css/ai-theme.css                 # 全域主題
│   ├── css/shared-game-base.css         # C/F 共用基礎
│   ├── css/c-series.css                 # C 系列專屬（.c-series 前綴）
│   ├── css/cX_*.css                     # 單元專屬（6 個）
│   ├── css/common-modal-responsive.css  # 共用響應式 Modal
│   └── css/dark-mode-simple.css         # 深色模式
├── JS（依載入順序）
│   ├── js/audio-unlocker.js             # 全部 C 系列引用
│   ├── js/theme-system.js              # 全部 C 系列引用
│   ├── js/number-speech-utils.js       # 全部 C 系列引用
│   ├── js/confetti.browser.min.js      # 全部 C 系列引用
│   ├── js/reward-launcher.js           # 全部 C 系列引用
│   ├── js/touch-drag-utility.js        # C3/C4/C5/C6
│   ├── js/emoji-library.js             # C3
│   └── js/cX_*.js                      # 單元主邏輯（主物件：Game）
├── 音效（<audio> 標籤）
│   ├── audio/success.mp3
│   ├── audio/correct.mp3 / correct02.mp3
│   ├── audio/error.mp3
│   ├── audio/click.mp3
│   ├── audio/select.mp3
│   └── audio/drop-sound.mp3            # C5/C6
└── 導出連結
    ├── → reward/index.html             # 🎁 獎勵按鈕（via RewardLauncher）
    └── → worksheet/index.html?unit=cX  # 作業單連結
```

#### A 系列（html/aX_*.html，共 6 個）

```
html/aX_*.html
├── CSS（依載入順序）
│   ├── css/ai-theme.css                 # A2~A6（A1 例外：不引用）
│   ├── css/aX_*.css                     # 單元專屬（6 個）
│   ├── css/common-modal-responsive.css  # 全部 A 系列
│   └── css/dark-mode-simple.css         # 全部 A 系列
├── JS（依載入順序）
│   ├── js/audio-unlocker.js             # 全部 A 系列
│   ├── js/theme-system.js              # A2~A6（A1 例外：不引用）
│   ├── js/number-speech-utils.js       # 全部 A 系列
│   ├── js/confetti.browser.min.js      # 全部 A 系列
│   ├── js/reward-launcher.js           # 全部 A 系列
│   ├── js/touch-drag-utility.js        # A3/A4/A6
│   ├── js/a4-shared-products.js        # 僅 A4（12 種商店商品資料）
│   └── js/aX_*.js                      # 單元主邏輯（VendingMachine/BarberKiosk/McDonald/Game/ATM）
├── 音效（<audio> 標籤 + JS 動態載入）
│   ├── audio/success.mp3
│   ├── audio/coin01.mp3                # A1（投幣）
│   ├── audio/checkout.mp3             # A3/A4/A6（結帳）
│   ├── audio/countmoney.mp3           # A5（數鈔）
│   ├── audio/correct02.mp3            # A3/A5（每步成功）
│   └── audio/error03.mp3              # A1/A5（ATM 錯誤）
└── 導出連結
    ├── → reward/index.html             # 🎁 獎勵按鈕（via RewardLauncher）
    └── → worksheet/index.html?unit=aX  # 作業單連結（A4 額外傳 storeType）
```

#### B 系列（html/bX_*.html，共 6 個）（2026-03-14 新增）

```
html/bX_*.html
├── CSS（依載入順序）
│   ├── css/ai-theme.css                 # 全部 B 系列
│   ├── css/shared-game-base.css         # 全部 B 系列
│   ├── css/b-series.css                 # B 系列專屬（.b-series/.b-header/.b-res-* 前綴規則；
│   │                                    #   完成畫面 CSS 外部化：bResCelebrate/bResBounce/bResGlow）
│   ├── css/bX_*.css                     # 單元專屬（6 個）
│   ├── css/common-modal-responsive.css  # 全部 B 系列
│   └── css/dark-mode-simple.css         # 全部 B 系列
├── JS（依載入順序）
│   ├── js/audio-unlocker.js             # 全部 B 系列
│   ├── js/theme-system.js              # 全部 B 系列
│   ├── js/number-speech-utils.js       # 全部 B 系列
│   ├── js/confetti.browser.min.js      # 全部 B 系列
│   ├── js/reward-launcher.js           # 全部 B 系列
│   └── js/bX_*.js                      # 單元主邏輯（主物件：Game）
├── 音效（<audio> 標籤）
│   ├── audio/success.mp3
│   ├── audio/correct.mp3
│   └── audio/error.mp3
└── 導出連結
    ├── → reward/index.html             # 🎁 獎勵按鈕（via RewardLauncher）
    ├── → worksheet/index.html?unit=bX  # 作業單連結
    └── → ../index.html#part4           # 返回主選單（指向 B 系列頁籤）
```

---

### 0-3 獨立模組（不經 index.html，可直接存取）

```
reward/index.html（獎勵系統）
├── reward/styles.css                    # 版面樣式（學生卡片、分數、彈窗）
├── reward/script.js                     # 主邏輯（學生管理、加扣分、縮放比例持久化）
└── reward/sound/*.mp3                   # bouns01~03.mp3、deduction.mp3

worksheet/index.html（作業單系統）
├── worksheet/worksheet-styles.css       # A4 列印樣式
├── worksheet/worksheet-generator.js     # 框架核心（WorksheetRegistry/Generator/App）
└── worksheet/units/[a1~f6]-worksheet.js # 18 個單元作業單 JS
```

---

### 0-4 共用工具 JS 扇形關係

```
                        ┌─────────────────────┐
                        │      index.html      │
                        └──────────┬──────────┘
                                   │ 連結至 18 個單元
          ┌────────────────────────┼────────────────────────┐
          ▼                        ▼                        ▼
   F 系列（6個）            C 系列（6個）            A 系列（6個）
   html/fX_*.html          html/cX_*.html          html/aX_*.html
          │                        │                        │
          └──────────┬─────────────┘                        │
                     │         共同引用的工具 JS             │
                     ▼                                      │
        ┌────────────────────────┐                          │
        │ audio-unlocker.js      │◄─────────────────────────┘
        │ number-speech-utils.js │◄─────────────────────────┘（已在上面）
        │ confetti.browser.min.js│
        │ reward-launcher.js     │
        └────────────────────────┘
                     │
          額外工具（部分單元引用）
          ├── theme-system.js        → 23 單元（A1 除外）+ index
          ├── touch-drag-utility.js  → A3/A4/A6, C3~C6, F1~F4/F6（12 個）
          ├── emoji-library.js       → C3, F1, F5, F6（4 個）
          └── a4-shared-products.js  → A4（1 個）
```

---

### 0-5 CSS 層疊結構

```
【A 系列】
css/ai-theme.css ─────────────────────────────────────────► aX 單元（A2~A6）
css/aX_*.css（單元專屬）──────────────────────────────────► aX 單元
css/common-modal-responsive.css ──────────────────────────► 全部 24 單元
css/dark-mode-simple.css ─────────────────────────────────► 全部 24 單元
※ A1 例外：跳過 ai-theme.css，僅用 a1_vending_machine.css

【B 系列】（2026-03-14 新增）
css/ai-theme.css
  └─► css/shared-game-base.css
        └─► css/b-series.css
              └─► css/bX_*.css（單元專屬）
                    └─► css/common-modal-responsive.css
                          └─► css/dark-mode-simple.css

【C 系列】
css/ai-theme.css
  └─► css/shared-game-base.css
        └─► css/c-series.css
              └─► css/cX_*.css（單元專屬）
                    └─► css/common-modal-responsive.css
                          └─► css/dark-mode-simple.css

【F 系列】
css/ai-theme.css
  └─► css/shared-game-base.css
        └─► css/fX-*.css（單元專屬）
              └─► css/common-modal-responsive.css
                    └─► css/dark-mode-simple.css
```

---

## 一、HTML 檔案

### 1-1 根目錄

| 檔案 | 行數 | 功能 | 引用 CSS | 引用 JS |
|------|------|------|---------|---------|
| `index.html` | ~150 | 首頁，所有單元入口卡片 | ai-theme.css | audio-unlocker.js, theme-system.js |

### 1-2 單元 HTML（html/ 目錄，24 個）

| 檔案 | 功能 | 備註 |
|------|------|------|
| `a1_vending_machine.html` | A1 自動販賣機 | 不引用 theme-system（無深色主題需求）|
| `a2_barber_shop_kiosk.html` | A2 理髮廳自助機 | |
| `a3_mcdonalds_order.html` | A3 麥當勞點餐機 | |
| `a4_simulated_shopping.html` | A4 超市模擬購物 | CSS/JS 版本號 `?v=9.52` |
| `a5_atm_simulator.html` | A5 ATM 提款機 | JS 版本號 `?cachebust=` |
| `a6_train_ticket.html` | A6 火車售票機 | |
| `b1_daily_budget.html` | B1 今天帶多少錢 | CSS 載入順序：ai-theme → shared-game-base → b-series → b1_daily_budget（2026-03-14 新增）|
| `b2_allowance_diary.html` | B2 零用錢日記 | 同 B1 CSS 載入模式 |
| `b3_savings_plan.html` | B3 存錢計畫 | 同 B1 CSS 載入模式 |
| `b4_sale_comparison.html` | B4 特賣比一比 | 同 B1 CSS 載入模式 |
| `b5_party_budget.html` | B5 生日派對預算 | 同 B1 CSS 載入模式 |
| `b6_market_shopping.html` | B6 菜市場買菜 | 同 B1 CSS 載入模式 |
| `c1_money_types.html` | C1 認識錢幣 | CSS 載入順序：ai-theme → shared-game-base → c-series → c1_money_types |
| `c2_money_counting.html` | C2 數錢 | 同 C1 CSS 載入模式 |
| `c3_money_exchange.html` | C3 換錢 | 同 C1 CSS 載入模式 |
| `c4_correct_amount.html` | C4 付款 | 同 C1 CSS 載入模式 |
| `c5_sufficient_payment.html` | C5 夠不夠 | 同 C1 CSS 載入模式 |
| `c6_making_change.html` | C6 找零 | 同 C1 CSS 載入模式 |
| `f1_object_correspondence.html` | F1 一對一對應 | CSS 載入順序：ai-theme → shared-game-base → f1-object-correspondence |
| `f2_rote_and_rational_counting.html` | F2 唱數 | 同 F1 CSS 載入模式 |
| `f3_number_recognition.html` | F3 數字認讀 | 同 F1 CSS 載入模式 |
| `f4_number_sorting.html` | F4 數字排序 | 同 F1 CSS 載入模式 |
| `f5_quantity_comparison.html` | F5 量比較 | 同 F1 CSS 載入模式 |
| `f6_number_composition.html` | F6 數的組成 | 同 F1 CSS 載入模式 |

### 1-3 工具頁 HTML（html/ 目錄，3 個）

| 檔案 | 功能 | 狀態 |
|------|------|------|
| `ai-robot-demo.html` | AI 機器人示範頁 | 使用中（測試用） |
| `clear-cache.html` | 清除瀏覽器快取工具 | 使用中（無外部 JS/CSS） |
| `color-palette-manager.html` | 顏色主題管理器 | 使用中（開發工具） |

---

## 二、JS 檔案

### 2-1 單元主邏輯 JS（js/ 目錄，24 個）

| 檔案 | 行數 | 對應單元 | 主要物件 |
|------|------|---------|---------|
| `a1_vending_machine.js` | 7,588 | A1 自動販賣機 | `VendingMachine` |
| `a2_barber_shop_kiosk.js` | 9,553 | A2 理髮廳 | `BarberKiosk` |
| `a3_mcdonalds_order.js` | 11,383 | A3 麥當勞 | `McDonald` |
| `a4_simulated_shopping.js` | 15,693 | A4 超市 | `Game` |
| `a5_atm_simulator.js` | 16,093 | A5 ATM | `ATM` |
| `a6_train_ticket.js` | 11,710 | A6 火車票 | `Game` |
| `b1_daily_budget.js` | 3,208 | B1 今天帶多少錢 | `Game`（2026-03-14 新增）|
| `b2_allowance_diary.js` | 3,795 | B2 零用錢日記 | `Game` |
| `b3_savings_plan.js` | 3,630 | B3 存錢計畫 | `Game` |
| `b4_sale_comparison.js` | 5,210 | B4 特賣比一比 | `Game` |
| `b5_party_budget.js` | 3,556 | B5 生日派對預算 | `Game` |
| `b6_market_shopping.js` | 4,441 | B6 菜市場買菜 | `Game` |
| `c1_money_types.js` | 1,786 | C1 認識錢幣 | `Game` |
| `c2_money_counting.js` | 2,299 | C2 數錢 | `Game` |
| `c3_money_exchange.js` | 10,430 | C3 換錢 | `Game` |
| `c4_correct_amount.js` | 6,133 | C4 付款 | `Game` |
| `c5_sufficient_payment.js` | 6,767 | C5 夠不夠 | `Game` |
| `c6_making_change.js` | 10,471 | C6 找零 | `Game` |
| `f1_object_correspondence.js` | 7,241 | F1 一對一對應 | `Game` |
| `f2_rote_and_rational_counting.js` | 4,401 | F2 唱數 | `Game` |
| `f3_number_recognition.js` | 3,944 | F3 數字認讀 | `Game` |
| `f4_number_sorting.js` | 4,121 | F4 數字排序 | `Game` |
| `f5_quantity_comparison.js` | 6,675 | F5 量比較 | `QuantityComparisonGame` |
| `f6_number_composition.js` | 5,641 | F6 數的組成 | `Game` |

### 2-2 工具 JS（js/ 目錄，8 個）

| 檔案 | 行數 | 功能 | 引用方 |
|------|------|------|--------|
| `reward-launcher.js` | 205 | 獎勵系統啟動器（跨頁通訊） | 全 18 個單元 HTML |
| `number-speech-utils.js` | 335 | 數字語音轉換（中文金額/唱數）；語音優先順序：雅婷→涵涵→Google 國語（臺灣）→zh-TW→zh→voices[0] | 全 18 個單元 HTML |
| `confetti.browser.min.js` | 7 | 彩紙動效（canvas-confetti v1.9.2 本地化） | 全 18 個單元 HTML |
| `theme-system.js` | 1,780 | 深色/淺色主題切換 | 17 單元（除 A1）+ index + ai-robot-demo + color-palette-manager |
| `audio-unlocker.js` | 93 | 行動裝置音訊解鎖 | 全 18 單元（2026-02-24 統一引入）|
| `touch-drag-utility.js` | 740+ | 觸控拖曳工具；`touchIdentifier` 多指誤觸防護；`quickCheck` 選擇器含 `.placed-item`（F3 fix 2026-03-05）、`.easy-change-money`（A6 fix）；`let target` + 父元素回退（2026-03-16 A6 easy-change-money 觸控修復）；HTML 引用 `?v=2.3`（A3/A4/A6/F1/F2/F6）| A3, A4, A6, C3, C4, C5, C6, F1, F2, F3, F4, F6（12 個）|
| `emoji-library.js` | 312 | Emoji 素材庫 | C3, F1, F5, F6（4 個）|
| `a4-shared-products.js` | 191 | A4 共用商品資料（12 種商店 × 約 10 商品）；`icon-a4-underpants-shop.png`（2026-03-08 更正）| A4 HTML |

### 2-3 獎勵系統 JS（reward/ 目錄）

| 檔案 | 行數 | 功能 |
|------|------|------|
| `reward/script.js` | 1,063 | 獎勵系統主邏輯（學生管理、加扣分、localStorage、縮放比例持久化）|

### 2-4 作業單 JS（worksheet/ 目錄，25 個）

| 檔案 | 行數 | 功能 |
|------|------|------|
| `worksheet-generator.js` | 165 | 作業單框架核心（WorksheetRegistry / Generator / App） |
| `units/a1-worksheet.js` | ~600 | A1 作業單題目生成 |
| `units/a2-worksheet.js` | ~400 | A2 作業單題目生成 |
| `units/a3-worksheet.js` | ~600 | A3 作業單題目生成 |
| `units/a4-worksheet.js` | ~700 | A4 作業單題目生成 |
| `units/a5-worksheet.js` | ~500 | A5 作業單題目生成 |
| `units/a6-worksheet.js` | ~700 | A6 作業單題目生成 |
| `units/b1-worksheet.js` | 282 | B1 作業單題目生成（2026-03-15 新增；emoji 改用 `.ws-emoji-icon` 包裹）|
| `units/b2-worksheet.js` | 409 | B2 作業單題目生成（emoji 改用 `.ws-emoji-icon` 包裹）|
| `units/b3-worksheet.js` | 453 | B3 作業單題目生成（emoji 改用 `.ws-emoji-icon` 包裹）|
| `units/b4-worksheet.js` | 457 | B4 作業單題目生成（新增 `cheaper-3` 三家比較型；emoji 改用 `.ws-emoji-icon` 包裹；計算差額 看圖填空/提示完成 行為更新）|
| `units/b5-worksheet.js` | 128 | B5 作業單題目生成（emoji 改用 `.ws-emoji-icon` 包裹）|
| `units/b6-worksheet.js` | 131 | B6 作業單題目生成（emoji 改用 `.ws-emoji-icon` 包裹）|
| `units/c1-worksheet.js` | ~400 | C1 作業單題目生成 |
| `units/c2-worksheet.js` | ~500 | C2 作業單題目生成 |
| `units/c3-worksheet.js` | ~500 | C3 作業單題目生成 |
| `units/c4-worksheet.js` | ~600 | C4 作業單題目生成 |
| `units/c5-worksheet.js` | ~600 | C5 作業單題目生成 |
| `units/c6-worksheet.js` | ~700 | C6 作業單題目生成 |
| `units/f1-worksheet.js` | ~400 | F1 作業單題目生成 |
| `units/f2-worksheet.js` | ~400 | F2 作業單題目生成 |
| `units/f3-worksheet.js` | ~400 | F3 作業單題目生成 |
| `units/f4-worksheet.js` | ~400 | F4 作業單題目生成 |
| `units/f5-worksheet.js` | ~500 | F5 作業單題目生成 |
| `units/f6-worksheet.js` | ~600 | F6 作業單題目生成 |

### 2-5 已清理記錄（2026-02-24）

| 檔案 | 處理 | 說明 |
|------|------|------|
| `js/mobile-debug-panel.js` | ✅ 確認不存在 | CLAUDE.md 曾記載此檔，實際從未建立 |
| `js/product_list.txt` | ✅ 已刪除 | 開發用商品清單草稿（非 JS 檔，錯置於 js/）|
| `js/product_prices.txt` | ✅ 已刪除 | 開發用價格資料草稿（非 JS 檔，錯置於 js/）|
| `js/replacement_verification_report.txt` | ✅ 已刪除 | 驗證報告文字檔（非 JS 檔，錯置於 js/）|

---

## 三、CSS 檔案

### 3-1 共用 CSS（跨單元引用）

| 檔案 | 行數 | 功能 | 引用方 |
|------|------|------|--------|
| `common-modal-responsive.css` | 106 | 通用響應式 Modal 樣式 | 全 24 個單元 HTML |
| `dark-mode-simple.css` | 83 | 深色模式（`prefers-color-scheme` 媒體查詢） | 全 24 個單元 HTML |
| `ai-theme.css` | 2,021 | AI 風格主題（背景、按鈕、卡片；`a:not(.selection-btn):not(.choice-btn)` 選擇器修正 2026-03-05）| 23 單元（除 A1）+ index |
| `shared-game-base.css` | 2,830 | **B/C/F 系列共用基礎**（原 `unit6.css` 重構分拆，2026-03-07 新增）：難度選擇、計分卡、完成畫面通用版面 | B1~B6, C1~C6, F1~F6（18 個）|
| `b-series.css` | 656 | **B 系列專屬**（2026-03-14 新增）：`.b-series/.b-header/.b-res-*` 前綴規則；完成畫面動畫（bResCelebrate/bResBounce/bResGlow）；語音重播按鈕（`.b-inline-replay`）；中央回饋動畫（`.b-center-feedback`）；2026-03-20 清除舊完成畫面死碼 `.b-completion` 系列（~85行）| B1~B6（6 個）|
| `c-series.css` | 559 | **C 系列專屬**（從 unit6.css 分拆，2026-03-07 新增）：`.c-series` 前綴規則，含購物區、金錢拖曳、購物車等 C 系列特有樣式 | C1~C6（6 個）|
| ~~`unit6.css`~~ | ~~3,377~~ | ~~C/F 系列通用基礎~~（已由 shared-game-base.css + c-series.css 取代）| ✅ **2026-03-09 已刪除** |
| ~~`dark-theme.css`~~ | ~~已刪除~~ | ~~深色主題完整樣式~~ | ✅ **2026-02-24 已刪除** |

**B 系列 CSS 載入順序**：`ai-theme.css` → `shared-game-base.css` → `b-series.css` → `bX_unit.css` → `common-modal-responsive.css` → `dark-mode-simple.css`

**C 系列 CSS 載入順序**：`ai-theme.css` → `shared-game-base.css` → `c-series.css` → `cX_unit.css` → `common-modal-responsive.css` → `dark-mode-simple.css`

**F 系列 CSS 載入順序**：`ai-theme.css` → `shared-game-base.css` → `fX-unit.css` → `common-modal-responsive.css` → `dark-mode-simple.css`

### 3-2 單元專屬 CSS（css/ 目錄）

#### B 系列（css/ 目錄，6 個）（2026-03-14 新增）

| 檔案 | 行數 | 對應單元 |
|------|------|---------|
| `b1_daily_budget.css` | 2,182 | B1（含兩段式流程 CSS；`.b1-coin-tray`/`.b1-drop-zone`/`.b1-wallet-goal-tag` 拖曳放置；Ghost Slot `.b1-wallet-ghost-slot`/`b1WalletGhostIn`；Phase 1 數字泡泡 `b1-cost-hint-tip`/`@keyframes b1CostHintIn`；Phase 2 白底放置區 `.b1-wallet-coins`；`b-res-denom-stats` 面額統計；行程費用清單 `.b1-res-schedules`；`.b1-exact-toast`/`b1ToastUp` 投幣剛好 toast）|
| `b2_allowance_diary.css` | 2,258 | B2（含兩段式流程 CSS；`.b2-answer-card`/`.b2-answer-prompt`；`.b2-res-diary`/`.b2-hist-table`/`.b2-hist-ev` 記帳回顧；`.b2-calc-breakdown`/`.b2-bd-row`/`.b2-bd-op.income/.expense` 計算過程；`.b2-entry-active` 逐項動畫；Phase 2 金幣 `b2-p2-coin`/`b2-phase2-card`；`.b2-mic-wrap`/`.b2-cic-wrap` 個別圖示；`b2-cost-hint-tip` 數字泡泡）|
| `b3_savings_plan.css` | 2,154 | B3（含 `b3-cal-*` 月曆系統；`b3-drag-coin`/`b3-nplaced-item`（每枚顯示）；`b3-pig-*` 撲滿卡片；`b3-pig-exch-btn`/`b3MilestonePop` 里程碑；`b3-nplaced-ghost-slot`/`b3NDenomInGhost` Ghost Slot；`b3-goal-modal*` 開題彈窗；`b3-hint-modal-overlay`/`.b3-hint-modal` 困難提示彈窗；省錢清單 `b3-goals-grid`/`b3-goal-result-card`/`b3-res-stats-row`）|
| `b4_sale_comparison.css` | 2,950 | B4（含 `.b4-icon-img`/`.b4-store-icon-img` 商品/商店圖片（2026-04-23）；`.b4-vs-divider`；`.b4-pbar-*` 視覺比例條；`b4-diff-normal-card`/`b4-diff-options-card` 重構後差額頁；`b4-price-unknown`/`b4-pi-modal`/`b4-pi-tap-hint` 輸入框彈窗；`b4-hnp-card`/`b4-hfh-card` 困難差額；`b4-sl-page`/`b4-sl-card2`/`b4-sl-summary-card` 省錢清單重設計；`48.91px` 紙鈔高度）|
| `b5_party_budget.css` | 2,438 | B5（含 `.b5-task-card`（紫色漸層任務卡）/`.b5-p1-hint-btn`（吉祥物+提示按鈕）/`.b5-hint-here`（橘色高亮泡泡，`@keyframes b5HereHintPulse/b5HereBounce`）；轉場歡迎畫面 `.b5-wc1-card`/`.b5-wc2-card`；找零階段 `.b5c-change-page`/`.b5c-denom-card`/`.b5c-wallet-zone`/`.b5c-confirm-btn`/`.b5c-hint-btn`/`.b5c-wallet-info`；Ghost slot `.b5c-ghost-slot`；`b5-item-flyout`/`b5FlyoutUp` 選商品浮動標籤）|
| `b6_market_shopping.css` | 3,045 | B6（含 `.b6-task-card`/`.b6-stall-nav`/`.b6-snav-btn`/`.b6-snav-dot` 攤位左右導航；`.b6-checkout-strip`/`.b6-cstrip-count`/`.b6-cstrip-total` 結帳列；`.b6-products-grid`/`.b6-product-btn`/`.b6-product-icon`/`.b6-icon-img`（2026-04-23）/`.b6-product-here-hint`；困難提示彈窗 `.b6-p1hh-overlay`/`.b6-p1hh-modal`；付款區 `.b6p2-ref-card`/`.b6p2-wallet-area`/`.b6p2-ghost-slot`；找零階段 `.b6c-change-page`/`.b6c-denom-card`/`.b6c-wallet-zone`/`.b6c-confirm-btn`/`.b6c-hint-btn`/`.b6c-ghost-slot`；付款提示彈窗 `.b6-hint-modal-overlay`/`.b6-hm-close-btn`）|

#### A 系列（css/ 目錄，6 個）

| 檔案 | 行數 | 對應單元 |
|------|------|---------|
| `a1_vending_machine.css` | 971 | A1（`.coin-modal` z-index:10300，高於標題列 10200）|
| `a2_barber_shop_kiosk.css` | 3,456 | A2 |
| `a3_mcdonalds_order.css` | 1,870 | A3（含 `.counter-payment-btn-hint` 提示動畫）|
| `a4_simulated_shopping.css` | 3,818 | A4（`?v=9.52.06` 版本後綴）|
| `a5_atm_simulator.css` | 4,696 | A5 |
| `a6_train_ticket.css` | 2,204 | A6（`?v=1.0.0` 版本後綴）|

#### C 系列（css/ 目錄，6 個）

| 檔案 | 行數 | 對應單元 | 說明 |
|------|------|---------|------|
| `c1_money_types.css` | 131 | C1 | 認識錢幣單元專屬 |
| `c2_money_counting.css` | 152 | C2 | 數錢單元專屬 |
| `c3_money_exchange.css` | 1,093 | C3 | 換錢單元專屬（最大，含兌換區域等特殊版面）|
| `c4_correct_amount.css` | 64 | C4 | 付款單元專屬 |
| `c5_sufficient_payment.css` | 33 | C5 | 夠不夠單元專屬（含 `.selection-btn:disabled` 紅色背景）|
| `c6_making_change.css` | 33 | C6 | 找零單元專屬（確認保留，有實質內容 33 行）|

#### F 系列（css/ 目錄，6 個）

| 檔案 | 行數 | 對應單元 |
|------|------|---------|
| `f1-object-correspondence.css` | 480 | F1（含 `.modern-hint-btn` 綠色漸層提示按鈕）|
| `f2-rote-and-rational-counting.css` | 461 | F2 |
| `f3-number-recognition.css` | 882 | F3 |
| `f4-number-sorting.css` | 1,743 | F4 |
| `f5-quantity-comparison.css` | 1,789 | F5 |
| `f6-number-composition.css` | 1,243 | F6 |

> **⚠️ 注意事項**：
> - **A4/A6 版本號**：HTML 以 `href="../css/a4_simulated_shopping.css?v=9.52.06"` 帶版本號引用，靜態掃描工具可能誤判為「未引用」。
> - **unit6.css**：2026-03-07 CSS 重構後不再被任何 HTML 引用，已於 2026-03-09 刪除。

### 3-3 獎勵系統 / 作業單 CSS（各自模組目錄）

| 檔案 | 行數 | 功能 |
|------|------|------|
| `reward/styles.css` | 636 | 獎勵系統版面樣式（學生卡片、分數、彈窗） |
| `worksheet/worksheet-styles.css` | 730 | 作業單列印樣式（A4 版面、題目區塊、答案欄；2026-04-12：`.ws-emoji-icon` 類別獨立縮放 emoji、`.question-answer` 13pt 與 `.question-prompt` 同尺寸）|

### 3-4 已清理記錄（2026-02-24）

| 檔案 | 處理 | 說明 |
|------|------|------|
| `css/click_mode_focus.txt` | ✅ 已刪除 | 點擊模式焦點樣式草稿（非 CSS 檔）|
| `css/click_mode_styles.txt` | ✅ 已刪除 | 點擊模式樣式草稿（非 CSS 檔）|
| `css/dark-theme.css` | ✅ 已刪除 | 深色主題舊版樣式（已由 dark-mode-simple.css 取代）|

---

## 四、音效檔案（audio/ 目錄，13 個）

### 4-1 在 HTML `<audio>` 標籤直接宣告

| 檔案 | 功能 | 引用單元 |
|------|------|---------|
| `success.mp3` | 完成關卡音效（長） | A1~A6, C1~C6, F1~F6（全 18 單元）|
| `correct.mp3` | 答對音效（短促） | A2, C1~C6, F1~F6（除 A1/A3/A4/A5/A6）|
| `correct02.mp3` | 答對音效（變奏） | A2, C3, F1, F3 |
| `error.mp3` | 答錯音效 | A2, C1~C4, F1~F4 |
| `error02.mp3` | 答錯音效（變奏） | F5, F6 |
| `click.mp3` | 點擊音效 | C2~C6, F1~F6；A6 步驟1-4按鈕（JS 動態）|
| `select.mp3` | 選擇音效 | C3~C6, F1~F6 |
| `drop-sound.mp3` | 拖放音效 | C5, C6 |

### 4-2 JS 動態載入（未在 HTML `<audio>` 直接宣告）

| 檔案 | 功能 | 引用 JS |
|------|------|---------|
| `coin01.mp3` | 投幣音效 | `a1_vending_machine.js`（A1）|
| `checkout.mp3` | 結帳音效 | `a3_mcdonalds_order.js`（A3）, `a4_simulated_shopping.js`（A4）, `a6_train_ticket.js`（A6）|
| `countmoney.mp3` | 數鈔音效 | `a5_atm_simulator.js`（A5）|
| `error03.mp3` | ATM 錯誤音效 | `a1_vending_machine.js`（A1）, `a5_atm_simulator.js`（A5）|
| `correct02.mp3` | 每步成功音效 | A3, A5（`playStepSuccess()` helper，2026-03-04 新增）|
| `menu-select.mp3` | 選單選取音效 | F1~F5（HTML 有直接宣告）|

---

## 五、圖片資料夾（images/ 目錄）

| 子目錄 | 檔案數 | 狀態 | 用途 |
|--------|--------|------|------|
| `a1/` | 19 | ✅ 使用中 | A1 飲料商品圖片 |
| `a2/` | 10 | ✅ 使用中 | A2 理髮服務圖示（`icon-a2-*.png` 英文命名）|
| `a3/` | 80 | ✅ 使用中 | A3 麥當勞餐點圖片 |
| `a4/` | 128 | ✅ 使用中 | A4 超市商品圖片（12 種商店 × 約 10 商品；含 3C 商品 11 種）|
| `a5/` | 2 | ✅ 使用中 | A5 ATM 機台示意圖 |
| `a6/` | 2 | ✅ 使用中 | A6 火車票示意圖 |
| `common/` | 1 | ✅ **使用中**（2026-03-16 新增）| 跨系列共用圖示；`icons_wallet.png`（A/C 系列「我的錢包」標題圖示）|
| `index/` | 18 | ✅ 使用中 | 首頁各單元入口縮圖（含 F/C/A 系列，B 系列另計）|
| `money/` | 19 | ✅ 使用中 | 硬幣/紙鈔圖片（1~1000 元正面）|
| `b1/` | 60+ | ✅ 使用中（2026-03-14 新增）| B1 場景圖（`icon-b1-easy/normal/hard-*.png`）|
| `b4/` | **39** | ✅ 使用中（2026-04-21 新增，2026-04-23 更新）| B4 商品圖（21 種，含牙刷/雨衣/糖果）+ 商店圖（18 種），已移除「- 已編輯」後綴；另有 `b4IconHTML`/`b4StoreIconHTML` 圖示輔助函數 |
| `b6/` | **63** | ✅ 使用中（2026-04-23 新增）| B6 商品圖：超市（烘焙/乳品/冷凍大部分 ✅）、夜市（小吃/飲料大部分 ✅）、紀念品（7種 ✅）、傳統市場（雜貨 4 種 ✅）；`b6IconHTML` 輔助函數顯示圖片，無圖退回 emoji；詳見 `B6_data_export.md` 十二節缺少清單 |
| `c1/` | 0 | ⚠️ 空目錄 | C1~C4 使用 emoji，無圖片需求 |
| `c2/` | 0 | ⚠️ 空目錄 | 同上 |
| `c3/` | 0 | ⚠️ 空目錄 | 同上 |
| `c4/` | 0 | ⚠️ 空目錄 | 同上 |
| `c5/` | **48** | ✅ **使用中**（2026-03 新增）| C5 購物商品圖示（`icon-c5-*.png`）；涵蓋食品/文具/玩具/運動/3C/服飾等類別 |
| `c6/` | **54** | ✅ **使用中**（2026-03 新增）| C6 找零商品圖示（`icon-c6-*.png`）；同 C5 類別，`icon-c6-star-sticker.pn.png` 為拼字異常（購物功能不受影響）|
| `f1/` | 0 | ⚠️ 空目錄 | F 系列使用 emoji，無圖片需求 |
| `f2/` | 0 | ⚠️ 空目錄 | 同上 |
| `f3/` | 0 | ⚠️ 空目錄 | 同上 |
| `f4/` | 0 | ⚠️ 空目錄 | 同上 |
| `f5/` | 0 | ⚠️ 空目錄 | 同上 |
| `f6/` | 0 | ⚠️ 空目錄 | 同上 |

> **B 系列圖片目錄**：B1~B3/B5 使用 emoji；B4 有 `images/b4/`（21 個商品圖 + 18 個商店圖）；B6 有 `images/b6/`（63 個商品圖，涵蓋超市/夜市大部分、傳統市場部分）。B1/B2/B3 場景圖在 `images/b1/`；B3 商品圖借用 `images/c5/`。
>
> **C5 圖檔說明**：C5 `images/c5/` 中目前無 `icon-c5-toy-car.png`（玩具車），但 JS 中 `game_toy_car` 項目定義此圖，實際遊戲顯示時無圖。

---

## 六、輔助模組

### 6-1 獎勵系統（reward/ 目錄）

| 檔案 | 行數 | 功能 |
|------|------|------|
| `index.html` | 91 | 獎勵系統頁面（可獨立開啟或透過 RewardLauncher 嵌入）|
| `script.js` | 1,063 | 主邏輯（學生管理、加扣分、localStorage、縮放比例持久化 `rewardSystemZoom`）|
| `styles.css` | 636 | 版面樣式 |
| `sound/bouns01.mp3` | — | 加分音效 1 |
| `sound/bouns02.mp3` | — | 加分音效 2 |
| `sound/bouns03.mp3` | — | 加分音效 3 |
| `sound/deduction.mp3` | — | 扣分音效 |
| `png/1.png ~ 5.png` | — | 預設學生獎勵卡圖片（5 張）|
| `CLAUDE.md` | ~120 | 速查文件（函式清單、DOM ID、localStorage 鍵值）|

### 6-2 作業單系統（worksheet/ 目錄）

| 檔案 | 行數 | 功能 |
|------|------|------|
| `index.html` | 572 | 作業單頁面（URL 參數：unit, difficulty）|
| `worksheet-generator.js` | 165 | 框架核心（WorksheetRegistry / WorksheetGenerator / WorksheetApp）|
| `worksheet-styles.css` | 730 | A4 列印樣式（2026-04-12：新增 `.ws-emoji-icon` 獨立縮放 CSS 類別；`.question-answer` 字體從 12pt 改為 13pt）|
| `units/` | — | 18 個單元作業單 JS（a1~a6, b1~b6, c1~c6, f1~f6）|

---

## 七、文件與報告

### 7-1 完成報告（report/ 目錄）

| 類別 | 檔案 | 說明 |
|------|------|------|
| A 系列 | `A1_Unit_Completion_Report.md` | A1 自動販賣機完成報告 |
| A 系列 | `A2_Unit_Completion_Report.md` | A2 理髮廳完成報告 |
| A 系列 | `A5_Unit_Completion_Report.md` | A5 ATM 完成報告 |
| A 系列（未建）| ~~A3, A4, A6 個別完成報告~~ | 尚未建立（相關修復記錄已整合至 CLAUDE.md）|
| B 系列總覽 | `B_Series_Unit_Completion_Report.md` | B 系列功能總覽報告（2026-03-30 新增；含 Round 1~45 所有修復記錄）|
| B 系列 | `B1_Unit_Completion_Report.md` | B1 今天帶多少錢完成報告（2026-04-23 新增）|
| B 系列 | `B2_Unit_Completion_Report.md` | B2 零用錢日記完成報告（2026-04-23 新增）|
| B 系列 | `B3_Unit_Completion_Report.md` | B3 存錢計畫完成報告（2026-04-23 新增）|
| B 系列 | `B4_Unit_Completion_Report.md` | B4 特賣比一比完成報告（2026-04-23 新增；含圖片引用更新）|
| B 系列 | `B5_Unit_Completion_Report.md` | B5 生日派對預算完成報告（2026-04-23 新增）|
| B 系列 | `B6_Unit_Completion_Report.md` | B6 菜市場買菜完成報告（2026-04-23 新增；含商品圖片引用更新）|
| C 系列 | `C1_Unit_Completion_Report.md` | C1 認識錢幣完成報告 |
| C 系列 | `C2_Unit_Completion_Report.md` | C2 數錢完成報告 |
| C 系列 | `C3_Unit_Completion_Report.md` | C3 換錢完成報告 |
| C 系列 | `C4_Unit_Completion_Report.md` | C4 付款完成報告 |
| C 系列（未建）| ~~C5, C6 個別完成報告~~ | 尚未建立（相關修復記錄已整合至 CLAUDE.md）|
| F 系列 | `F1_Unit_Completion_Report.md` | F1 一對一對應完成報告 |
| F 系列 | `F2_Unit_Completion_Report.md` | F2 唱數完成報告 |
| F 系列 | `F3_Unit_Completion_Report.md` | F3 數字認讀完成報告 |
| F 系列 | `F4_Unit_Completion_Report.md` | F4 數字排序完成報告 |
| F 系列 | `F5_Unit_Completion_Report.md` | F5 量比較完成報告 |
| F 系列 | `F6_Unit_Completion_Report.md` | F6 數的組成完成報告 |
| 輔助系統 | `Reward_Unit_Completion_Report.md` | 獎勵系統完成報告（2026-02-24 新建）|
| 輔助系統 | `Worksheet_Unit_Completion_Report.md` | 作業單系統完成報告（2026-02-24 新建）|

### 7-2 專項報告（report/ 目錄）

| 檔案 | 說明 |
|------|------|
| `Bug_Audit_Report_20260306.md` | 廢棄程式碼稽核報告（2026-03-06）|
| `Bug_Audit_Report_20260314.md` | 廢棄程式碼稽核報告（2026-03-14）|
| `CSS_Improvement_Plan.md` | CSS 改善計畫文件 |
| `Speech_Pattern_Report.md` | 語音模式分析報告 |
| `Code_Templates.md` | 常用程式碼模板（TimerManager/EventManager/完成畫面/煙火等）|
| `Deprecated_Code_Audit.md` | 廢棄程式碼稽核（持續維護）|
| `ClickMode_Animation_DOM_Patterns.md` | 輔助點擊動畫 DOM 模式分析 |
| `Debug_Commands_Reference.md` | Debug 指令速查 |
| `A_Series_Hint_System_Analysis.md` | A 系列提示系統分析 |
| `B_Series_Development_Spec.md` | B 系列開發規格文件 |
| `B_Series_Teaching_Design_Report.md` | B 系列教學設計報告 |
| `B_Series_Comprehensive_Analysis.md` | B 系列綜合分析報告 |
| `B1_Image_Audit_Report.md` | B1 圖片稽核報告 |
| `B1_data_export.md` | B1 場景資料匯出（2026-04-20）|
| `B1_Image_Audit_Report.md` | B1 圖片稽核報告 |
| `B1_speech_content.md` | B1 語音內容清單 |
| `B2_data_export.md` | B2 題庫資料匯出（2026-04-11）|
| `B2_speech_content.md` | B2 語音內容清單 |
| `B3_data_export.md` | B3 題庫資料匯出（2026-04-20）|
| `B3_Items_Image_Filenames.md` | B3 物品圖片檔名對照表 |
| `B3_speech_content.md` | B3 語音清單 |
| `B4_data_export.md` | B4 商品資料匯出（2026-04-23 更新；移除已編輯後綴、新增三種圖片）|
| `B4_speech_content.md` | B4 語音內容清單 |
| `B5_data_export.md` | B5 商品/關卡資料匯出（2026-04-23）|
| `B5_speech_content.md` | B5 語音內容清單 |
| `B6_data_export.md` | B6 市場/商品資料匯出（2026-04-23 更新；含圖片狀態與缺少清單）|
| `B6_speech_content.md` | B6 語音內容清單 |
| `Expansion_Planning_20260314.md` | B 系列擴充規劃（2026-03-14）|
| `CLAUDE_md_Token_Cost_Analysis.md` | CLAUDE.md Token 成本分析 |
| `AI_Video_Production_Plan_20260316_1400.md` | AI 影片製作計畫（2026-03-16）|
| `AI_Image_Generation_Automation.md` | AI 圖片生成自動化說明 |

### 7-3 report/ 目錄腳本

| 檔案 | 說明 |
|------|------|
| `make_ppt.py` | PPT 生成腳本（report/ 目錄，對應 Claude_Code_15_Features_Guide.pptx）|

### 7-4 檔案關聯記錄

| 檔案 | 說明 |
|------|------|
| `report/Project_File_Relationship.md` | **本檔案**（2026-02-24 建立，2026-03-09 移至 report/；含以 index.html 為起點的架構圖）|

### 7-5 競賽申請文件（doc/ 目錄）

| 類型 | 檔案 | 說明 |
|------|------|------|
| 生成腳本 | `gen_v5.py` | V5 生成腳本（歷史版本，主教案 A6）|
| 生成腳本 | `md_to_docx.py` | Markdown 轉 DOCX 工具 |
| 生成腳本 | `gen_v13.py` | V13 生成腳本（2026-03-16 新增）；三份分開文件 |
| MD 草稿 | `*_V2.md ~ *_V10.md` | V2~V10 各版本 Markdown 草稿（V10 為最新 MD 版本）|
| DOCX（舊版）| `*_V3.docx ~ *_V12.docx` | V3~V12 歷史 DOCX 版本 |
| **DOCX（現役）** | `金錢小達人_申請表_V13.docx` | **V13 申請表**（附表一 + 附表二 + 附表四）（2026-03-16）|
| **DOCX（現役）** | `金錢小達人_創作說明_V13.docx` | **V13 創作說明**（附表三 壹~肆）（2026-03-16）|
| **DOCX（現役）** | `金錢小達人_教案_V13.docx` | **V13 教案**（附表三之一，F/C/A 三份教案）（2026-03-16）|

### 7-6 Claude Code 參考文件（report/ 目錄）

| 檔案 | 說明 |
|------|------|
| `Claude_Code_15_Features_Boris_Cherny.md` | Claude Code 15 個功能介紹（Boris Cherny 版本）|
| `Claude_Code_15_Features_Guide.pptx` | Claude Code 功能指南簡報（由 make_ppt.py 生成）|
| `Claude_Code_協作功能使用指南.md` | Claude Code 協作功能使用說明 |
| `Claude_Code_常用指令參考.md` | Claude Code 常用指令速查 |
| `Claude_Code_手機遠端控制操作步驟.md` | Claude Code 手機遠端控制操作說明 |
| `Google NotebookLM × Claude Code 結合使用說明.md` | Google NotebookLM 與 Claude Code 整合使用說明 |

### 7-7 其他文件

| 檔案 | 說明 |
|------|------|
| `CLAUDE.md`（根目錄）| 專案速查文件（主索引，含所有單元說明）|
| `reward/CLAUDE.md` | 獎勵系統速查 |
| ~~`Stps_Flow/*.md`（5 個）~~ | ✅ **2026-03-09 已刪除**（A 系列步驟說明已整合入各單元 report）|
| ~~`analysis/`（5 個）~~ | ✅ **2026-03-09 已刪除**（開發期規劃文件，工作已完成）|
| ~~`image_list/`（5 個）~~ | ✅ **2026-03-09 已刪除**（Emoji 清單已整合入 CLAUDE.md）|
| ~~`difficulty_descriptions.txt`~~ | ✅ **2026-03-09 已刪除**（內容已整合入 CLAUDE.md）|
| ~~`difficulty_modes_analysis.txt`~~ | ✅ **2026-03-09 已刪除**（已過時）|
| ~~`F1_F2_F3_JS_CSS_separation_plan_20260120.txt`~~ | ✅ **2026-03-09 已刪除**（分離計畫已完成）|
| ~~`待修正.ini`~~ | ✅ **2026-03-09 已刪除**（已過時）|
| ~~`驗證方法.ini`~~ | ✅ **2026-03-09 已刪除**（已過時）|

---

## 八、跨單元 JS/CSS 引用矩陣

### 8-1 工具 JS 引用矩陣

| 工具 JS | A1 | A2 | A3 | A4 | A5 | A6 | B1 | B2 | B3 | B4 | B5 | B6 | C1 | C2 | C3 | C4 | C5 | C6 | F1 | F2 | F3 | F4 | F5 | F6 |
|---------|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|
| reward-launcher.js | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| number-speech-utils.js | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| confetti.browser.min.js | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| theme-system.js | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| audio-unlocker.js | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| touch-drag-utility.js | — | — | ✅ | ✅ | — | ✅ | — | — | — | — | — | — | — | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | ✅ |
| emoji-library.js | — | — | — | — | — | — | — | — | — | — | — | — | — | — | ✅ | — | — | — | ✅ | — | — | — | ✅ | ✅ |
| a4-shared-products.js | — | — | — | ✅ | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |

### 8-2 共用 CSS 引用矩陣

| 共用 CSS | A1 | A2 | A3 | A4 | A5 | A6 | B1 | B2 | B3 | B4 | B5 | B6 | C1 | C2 | C3 | C4 | C5 | C6 | F1 | F2 | F3 | F4 | F5 | F6 |
|---------|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|
| common-modal-responsive.css | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| dark-mode-simple.css | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| ai-theme.css | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| shared-game-base.css | — | — | — | — | — | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| b-series.css | — | — | — | — | — | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | — | — | — | — | — | — | — | — | — | — | — |
| c-series.css | — | — | — | — | — | — | — | — | — | — | — | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | — | — | — | — | — |
| ~~unit6.css~~ | ~~—~~ | ~~—~~ | ~~—~~ | ~~—~~ | ~~—~~ | ~~—~~ | — | — | — | — | — | — | ~~✅~~ | ~~✅~~ | ~~✅~~ | ~~✅~~ | ~~✅~~ | ~~✅~~ | ~~✅~~ | ~~✅~~ | ~~✅~~ | ~~✅~~ | ~~✅~~ | ~~✅~~ |

> **unit6.css 已刪除**：2026-03-07 CSS 重構後不再被任何 HTML 引用（由 shared-game-base.css 取代 F/C 共用部分，c-series.css 取代 C 系列專屬部分）；已於 **2026-03-09 刪除**。

---

## 九、清理記錄

| 狀態 | 類型 | 檔案 | 說明 |
|------|------|------|------|
| ✅ 已確認 | 不存在 | `js/mobile-debug-panel.js` | CLAUDE.md 曾記載，實際從未建立 |
| ✅ 已刪除 | 非 JS 置於 js/ | `js/product_list.txt` | 開發用商品清單草稿 |
| ✅ 已刪除 | 非 JS 置於 js/ | `js/product_prices.txt` | 開發用價格資料草稿 |
| ✅ 已刪除 | 非 JS 置於 js/ | `js/replacement_verification_report.txt` | 驗證報告文字檔 |
| ✅ 已刪除 | 非 CSS 置於 css/ | `css/click_mode_focus.txt` | 點擊模式焦點樣式草稿 |
| ✅ 已刪除 | 非 CSS 置於 css/ | `css/click_mode_styles.txt` | 點擊模式樣式草稿 |
| ✅ 已刪除 | 舊版關聯表 | `file_relationship/Project_File_Relationship_20260120.txt` | 2026-01-20 舊版（文字格式）|
| ✅ 已刪除 | 舊版關聯表 | `file_relationship/Project_File_Relationship_20260206.txt` | 2026-02-06 舊版（文字格式）|
| ✅ 已刪除 | 未使用 CSS | `css/dark-theme.css` | 深色主題舊版（已由 dark-mode-simple.css 涵蓋）|
| ✅ **2026-03-09 已刪除** | 廢棄 CSS | `css/unit6.css` | CSS 重構後不再引用；由 shared-game-base.css + c-series.css 取代 |
| ✅ **2026-03-09 已刪除** | 根目錄腳本 | `fix_a1.py`, `fix_a2.py`, `fix_all.py`, `fix_script.py` | 一次性修復腳本，任務已完成 |
| ✅ **2026-03-09 已刪除** | 根目錄臨時記錄 | `loc1_old.bin`, `loc1_old.txt`, `tmp_search.txt` | 開發備份與臨時記錄 |
| ✅ **2026-03-09 已刪除** | 根目錄分析文件 | `difficulty_descriptions.txt`, `difficulty_modes_analysis.txt`, `F1_F2_F3_JS_CSS_separation_plan_20260120.txt` | 已完成任務，內容整合入 CLAUDE.md |
| ✅ **2026-03-09 已刪除** | 根目錄過時記錄 | `待修正.ini`, `驗證方法.ini` | 已過時 |
| ✅ **2026-03-09 已刪除** | 規劃目錄 | `analysis/`（5 個）, `Stps_Flow/`（5 個）, `image_list/`（5 個）| 開發期規劃文件，工作已完成 |
| ✅ 確認不存在 | 原 CLAUDE.md 記載 | `js/*.backup`（5 個）, `css/*_ipad.css`（14 個）, 根目錄 `NUL` | 2026-03-09 實際掃描確認從未存在或早已清除 |

---

## 十、修正記錄

### 10-1 拖曳去背實作（2026-02-25）

**背景**：拖曳圖示時，瀏覽器預設截圖含背景色，需改為透明去背。

#### 桌面端（HTML5 Drag API `setDragImage`）

| 檔案 | 修改內容 |
|------|---------|
| `js/f1_object_correspondence.js` | `handleDragStart` 加入 `setDragImage` ghost（font-size 使用 `getComputedStyle`）|
| `js/f2_rote_and_rational_counting.js` | 同上 |
| `js/f3_number_recognition.js` | 同上 |
| `js/f6_number_composition.js` | 6 個 dragstart handler 加入 `setDragImage` ghost |
| `js/a3_mcdonalds_order.js` | 4 個 dragstart handler 加入 `setDragImage` |
| `js/c3_money_exchange.js` | `handleDragStart()` 加入 `setDragImage` |

> 已完整實作（無需修改）：A6, C4, C5, C6

#### 觸控端（touch-drag-utility.js）

| 檔案 | 修改內容 |
|------|---------|
| `js/touch-drag-utility.js` | `createDragClone()` 新增 emoji/文字去背（透明 `<span>`），font-size 改用 `getComputedStyle` |

---

### 10-2 多指觸控誤觸 Bug 修復（2026-02-25）

**根因**：第二根手指的 `touchend` 被誤判為拖曳結束，導致拖曳狀態提前重置。

**修復**：`touch-drag-utility.js` 新增 `touchIdentifier` 記錄拖曳手指；`handleTouchMove`/`handleTouchEnd` 過濾非拖曳手指。

**影響範圍**：所有使用 `TouchDragUtility` 的單元（A3, C3, C4, C5, C6, F1, F2, F3, F6）。

---

### 10-3 F5 語音競態條件與跨場次污染修復（2026-02-26）

**根因**：`resetGameState()` 取消語音後，`onerror` 非同步觸發建立新計時器，跨場次污染分數。

**修復**：`js/f5_quantity_comparison.js` 新增 `lastSpeakId`、`easyModeResultShown`、`gameSessionId` 三個屬性。

---

### 10-4 C4/C5/C6 觸控拖曳 TypeError 與完成時間修復（2026-02-26）

**Bug 1**：`event.dataTransfer.setDragImage is not a function`（TouchEvent 無 dataTransfer）
→ 修復：加 `if (event.dataTransfer && typeof event.dataTransfer.setDragImage === 'function')` 防護

**Bug 2**：完成時間顯示 29533771 分（startTime 為 null）
→ 修復：改為 `const elapsedMs = startTime ? (endTime - startTime) : 0`

---

### 10-5 F1 一對一對應多項修復（2026-02-26）

- 普通模式完成按鈕錯誤恢復期間補齊修復
- 困難模式按鈕文字 + `isAnswering` 未重置修復
- 困難模式「取代放置」功能新增（含 `validateDrop` 重複定義修復）
- `allowClickToPlace: false` 移除點擊選擇效果
- CSS：`css/f1-object-correspondence.css` `.modern-hint-btn` 改綠色漸層（同 F3）

---

### 10-6 CSS 架構重構（2026-03-07）

**背景**：原 `unit6.css` 混合 C/F 共用樣式與 C 系列專屬樣式，難以維護。

**重構方案**：

| 舊檔案 | 新檔案 | 說明 |
|--------|--------|------|
| `unit6.css`（3,404 行）| `shared-game-base.css`（2,830 行）| C/F 共用基礎（難度選擇、計分卡、完成畫面）|
| `unit6.css`（3,404 行）| `c-series.css`（559 行）| C 系列專屬（`.c-series` 前綴，購物區、金錢拖曳等）|

**新增 C 系列單元 CSS**（原無，統一由 unit6.css 覆蓋）：
- `c1_money_types.css`（131 行）
- `c2_money_counting.css`（152 行）
- `c3_money_exchange.css`（1,093 行）
- `c4_correct_amount.css`（64 行）
- `c5_sufficient_payment.css`（33 行，含 `.selection-btn:disabled` 紅色背景）
- `c6_making_change.css`（33 行）

**HTML 載入順序更新**：C 系列改為 `ai-theme → shared-game-base → c-series → cX_unit → common-modal → dark-mode`；F 系列改為 `ai-theme → shared-game-base → fX-unit → common-modal → dark-mode`

---

### 10-7 C5 邏輯重構（2026-03）

**主要變更**：

| 項目 | 說明 |
|------|------|
| `getMaxAllowedDenomination` | 新增 digits=1→5；修正 digits=3→100（原 500）|
| `handleSelection` | 切換位數改靜默自動移除（移除 `showInvalidCombinationWarning` 呼叫）|
| `buildQuestionPools()` | 新增函數；`startQuiz()` 呼叫一次，快取 sufficient/insufficient 兩個策略池 |
| `generateQuestion()` | 移除每題重複的 inline `buildValidPool`，改從 `this._questionPools` 快取池取 |
| `resetGameState()` | 加入 `this._questionPools = null` |
| 物品類型 UI | 移除設定頁「🛍️ 物品類型選擇」；新增 `autoSetItemTypes()` 自動根據位數設定 |
| 文字 | 「🛒 兌換區」→「🛒 購物區」（測驗頁面全域）|
| 語音反饋 | 答對/答錯語音改用 `question.item.name` 實際商品名稱 |
| 金錢放置語音 | 「目前總額X元」→「X元」（簡易/普通模式）|
| 商品替換 | 球拍→藍芽喇叭（`icon-c5-bluetooth-speaker.png`）；桌遊→搖控汽車（`icon-c5-rc-car.png`）|

---

### 10-8 C6 物品類型 UI 移除（2026-03）

- 移除設定頁「🛍️ 物品類型選擇」（與 C5 同步）
- 新增 `autoSetItemTypes()` 固定使用 `['toys', 'food', 'stationery']`
- `handleSelection()` 簡化為面額單一路徑
- 移除 `isSettingsComplete()`/`checkStartState()`/`startQuiz()` 中的 `itemTypes` 驗證條件

---

### 10-9 A4 商品圖示修正（2026-03-08）

| 檔案 | 修改內容 |
|------|---------|
| `js/a4-shared-products.js` | 第 99 行：`icon-a4-underwear-shop.png` → `icon-a4-underpants-shop.png`（與 images/a4/ 實際檔名一致；`a4_simulated_shopping.js` 原本已正確）|

---

### 10-10 C5/C6 圖片資料夾建立（2026-03）

- `images/c5/`：新增 48 個商品圖示（`icon-c5-*.png`）；原為空目錄
- `images/c6/`：新增 54 個商品圖示（`icon-c6-*.png`）；原為空目錄
- 已知異常：`images/c6/icon-c6-star-sticker.pn.png`（多一個 `.pn` 拼字）；`images/c5/` 缺少 `icon-c5-toy-car.png`

---

### 10-11 B3 月曆模式輔助點擊修正（2026-04-12）

**根因**：`_showCalendarTaskPopup` 中點「開始存錢」後 `AssistClick.deactivate()` 後不再重啟，遮罩消失導致輔助點擊失效。

| 檔案 | 修改內容 |
|------|---------|
| `js/b3_savings_plan.js` | click handler 加重新啟動 `AssistClick.activate(null)`（600ms delay）；`buildQueue` 新增月曆模式完整判斷鏈：達成目標頁→`b3-view-summary-btn`；簡單拖曳→`.b3-drag-coin:not(.b3-coin-placed)` 逐枚呼叫（MutationObserver 驅動）；普通/困難→貪婪面額 tile 點擊 + `b3-normal-confirm-btn`；兌換→`.b3-pig-exch-btn`；日期等待→`.b3-cal-active` |

---

### 10-12 B 系列作業單 Emoji 縮放分離（2026-04-12）

**背景**：作業單中 emoji 圖示與文字共用同一 CSS 縮放變數，無法獨立調整大小。

**修復方案**：

| 檔案 | 修改內容 |
|------|---------|
| `worksheet/worksheet-styles.css` | 新增 `.ws-emoji-icon` 類別：`font-size: calc(1em * var(--ws-icon-scale, 1) / var(--ws-font-scale, 1))` 解耦 emoji 縮放；`.question-answer` 字體從 12pt 改為 13pt（與 `.question-prompt` 一致）|
| `worksheet/units/b1-worksheet.js` | 所有 scenario.icon 改用 `<span class="ws-emoji-icon">` 包裹 |
| `worksheet/units/b2-worksheet.js` | 事件列、步驟表格、圖示填空中的 icon 改用 `.ws-emoji-icon` 包裹 |
| `worksheet/units/b3-worksheet.js` | 商品 icon 在 prompt 字串中改用 `.ws-emoji-icon` 包裹 |
| `worksheet/units/b4-worksheet.js` | `iconSpan()` helper 新增；所有 `item.icon` 改用 `iconSpan()` 包裹 |
| `worksheet/units/b5-worksheet.js` | 派對圖示與商品 icon 改用 `.ws-emoji-icon` 包裹 |
| `worksheet/units/b6-worksheet.js` | 購物車圖示與商品 icon 改用 `.ws-emoji-icon` 包裹 |

---

### 10-13 B4 作業單三家比較型新增與介面重構（2026-04-12）

**主要變更**：

| 項目 | 說明 |
|------|------|
| 新增 `cheaper-3` 題型 | 從三家商店（optA/optB/optC）中找出最便宜；`shuffle([...stores3])` 隨機排列店家順序；三色背景區分（黃/藍/綠）|
| `_items` 新增 `optC` | 20 個商品全數新增第三家商店資料，部分 optC 為最便宜 |
| 工具列標籤重命名 | 「找便宜（哪家划算）」→「找便宜(2家店比較)」；新增「找便宜(3家店比較)」；「數字填空（計算差額）」→「計算差額」|
| 金額呈現選項重排 | 選項順序改為：數字填空（`num-only`）→ 看圖填空（`coin-blank`）→ 提示完成（`coin-num`）|
| 計算差額 × 看圖填空 | 差額金錢圖示顯示於答案區，讓學生看圖填寫金額數字 |
| 計算差額 × 提示完成 | 兩家商店價格框與差額答案區均採提示完成格式（`mkHintComplete`）|

---

### 10-14 B6 桌面版面重構＋提示系統（2026-04-14~15）

**桌面版面重構**：

| 項目 | 說明 |
|------|------|
| 三欄佈局 | `.b6-market-checkout-row`：左（`.b6-stall-card` 採購進度卡）+ 中（`.b6-market-card` 市場卡）+ 右（`.b6-checkout-strip` 結帳卡）|
| 左右攤位導航 | `.b6-stall-nav`（`b6-stall-prev`/`b6-stall-next`）取代 tabs；切換時只替換 `.b6-stall-panel` DOM（不重建整頁，消除閃爍）|
| 結帳卡商品清單 | `.b6-cart-items`/`.b6-cart-item` 列出已選商品（icon+name+price）；`_updateShoppingUIPartial()` 同步更新 |
| 桌面 ≥900px | `auto-fill` 商品格 + overflow-y scroll（平板可接受部分遮蔽）|
| 桌面 ≥1200px | `grid-template-rows:repeat(2,auto); grid-auto-flow:column`（2 列水平展開，全商品可見）；`max-width:min(1800px,100vw-40px)` |

**第一頁提示系統**：

| 項目 | 說明 |
|------|------|
| 簡單模式 | 開場後自動啟動 `_b6P1ActivateHintMode()`；當前攤位第一個未選提示商品顯示橘色「👇 點這裡」（`.b6-product-here-hint`）；選完配額後自動切換到下一攤位（`_b6RefreshPanel`）；全買齊後結帳按鈕出現「點這裡」 |
| 普通模式 | 按提示鈕 → `_b6P1ActivateHintMode()`，當前攤位所有未選提示商品同時高亮 |
| 困難模式 | 按提示鈕 → `_b6P1ShowHardHintModal()`：彈窗列出建議清單（已選項顯示 `b6-p1hh-item-done` 淡化+「✅ 已選擇」徽章）；只移除不在清單中的已選商品；關閉後設 `g.p1HintMode=true`，但不在商品卡顯示高亮 |
| 錯誤守衛 | `g.p1HintMode=true` 時點非提示商品 → 錯誤音效+「不對喔，請選擇提示的商品」 |
| 貪婪演算法 | `_b6P1GenerateHintItems()`：各攤位按價格升序挑選，預算有剩才加入 |

**第二頁（付款畫面）**：
- 移除右側提示按鈕＋吉祥物（`_renderB6P2WalletArea` 去除 `.b6p2-hint-wrap`）
- 進入第二頁時若 `clickMode==='on'` 自動啟動 `AssistClick`（500ms delay）

---

### 10-15 B6 找零階段完全重設計（2026-04-17）

**背景**：B6 原找零頁面改用全新獨立頁面，與 B5 找零 + B1/B3 Ghost slot 設計同步。

| 檔案 | 修改內容 |
|------|---------|
| `js/b6_market_shopping.js` | `_b6P2ShowChangeReturn()` 完整重建找零頁（`b6c-change-page`）含：標題卡（找零N元＋進度條）、我的錢包區（drop zone）、確認找零按鈕＋提示鈕（吉祥物）、面額托盤（可重複拖曳）；新增 `_b6P2SetupChangeInteraction`/`_b6P2UpdateChangeDisplay`/`_b6P2RenderWalletCoins`/`_b6P2ConfirmChange`/`_b6P2ShowChangeGhostSlots`/`_b6P2ShowChangeHintModal`；面額動態選擇（貪婪解面額＋干擾面額）；Ghost slot 模式（`g.changeGhostMode`）：普通3次錯誤自動觸發，困難模式提示鈕→彈窗 |
| `css/b6_market_shopping.css` | 新增 `b6c-` 前綴規則（`.b6c-change-page`/`.b6c-denom-card`/`.b6c-wallet-zone`/`.b6c-confirm-btn`/`.b6c-ghost-slot`）|

---

### 10-16 B5 重大升級：提示系統＋轉場歡迎畫面＋付款找零重構（2026-04-17~18）

**背景**：B5 功能從 1,726 行擴充至 3,530 行（+1,804 行），全面同步 B6 設計。

| 項目 | 說明 |
|------|------|
| **第一頁提示系統** | `.b5-task-card`（紫色漸層）取代 `progress-bar-wrap`；簡單模式自動 `_b5P1ActivateHintMode()`（逐一高亮商品 `.b5-hint-here`）；普通模式3次錯誤自動 `_b5P1ShowHint()`；困難模式提示鈕→ `_showHardModeHintModal()`；AssistClick 加 `p1HintMode` 分支 |
| **轉場歡迎畫面** | `startGame()` 改呼叫 `showWelcomeScreen()`；2頁式（Page1 主題語音→Page2 預算金幣商品）；`_skipIntroModal` flag 跳過關卡介紹彈窗；AssistClick 加 `b5-wc2-start-btn` 偵測 |
| **第二頁付款** | 簡單模式移除確認按鈕（all-filled 自動確認）；`_b5P2AddCoin` 語音 callback 觸發下一動作；普通3次錯誤→ `_showB5HardModeHintModal` |
| **第二頁找零** | `_b5P2ShowChangeReturn()` 完整重建（`b5c-*` 新增類別）；Ghost slot 模式（`g.changeGhostMode`）；困難提示鈕→彈窗（B6 pattern）；AssistClick 加 `b5c-wallet-zone` 分支 |

| 檔案 | 修改內容 |
|------|---------|
| `js/b5_party_budget.js` | 新增 `showWelcomeScreen`/`_b5P1ActivateHintMode`/`_b5P1ShowHint`/`_b5P2ShowChangeReturn`/`_b5P2SetupChangeInteraction`/`_b5P2ConfirmChange`/`_b5P2ShowChangeGhostSlots`/`_b5P2ShowChangeHintModal` |
| `css/b5_party_budget.css` | 新增 `.b5-task-card`/`.b5-hint-here`/`.b5-wc1-card`/`.b5-wc2-card`/`b5c-*` 找零類別 |

---

## 十一、統計摘要（2026-03-16 現況）

| 類別 | 數量 | 備註 |
|------|------|------|
| HTML 檔案 | 29 個 | 24 單元 + 3 工具頁 + index.html + reward + worksheet |
| 單元主邏輯 JS | 24 個 | js/ 目錄（A×6 + B×6 + C×6 + F×6）|
| 工具 JS | 8 個 | js/ 目錄（包含 confetti 本地化）|
| 獎勵系統 JS | 1 個 | reward/script.js |
| 作業單 JS | 25 個 | worksheet/ 目錄（1 框架 + 24 單元）|
| A 系列單元 CSS | 6 個 | css/ 目錄 |
| B 系列單元 CSS | 6 個 | css/ 目錄（2026-03-14 新增）|
| C 系列單元 CSS | 6 個 | css/ 目錄（2026-03-07 新增）|
| F 系列單元 CSS | 6 個 | css/ 目錄 |
| 共用 CSS（現役）| 6 個 | ai-theme, shared-game-base, b-series, c-series, common-modal-responsive, dark-mode-simple |
| 輔助模組 CSS | 2 個 | reward/ + worksheet/ |
| ~~遺留 CSS~~（已刪）| ~~1 個~~ | ~~unit6.css~~（2026-03-09 已刪除）|
| 音效 MP3 | 13 個 | audio/ 目錄（全部使用中）|
| 獎勵音效 MP3 | 4 個 | reward/sound/ 目錄 |
| 圖片目錄（有檔案）| 11 個 | a1~a6, c5, c6, index, money, common（2026-03-16 新增）|
| 圖片目錄（空）| 10 個 | c1~c4, f1~f6 |
| 完成報告 MD | 21 個 | report/ 目錄（18 原有 + B1~B6（合 1 份）+ Reward + Worksheet）|
| 專項報告 MD | 4 個 | report/ 目錄（Bug稽核、CSS計畫、語音分析、Project_File_Relationship）|
| 競賽文件 DOCX（現役）| 3 個 | doc/ 目錄（申請表_V13、創作說明_V13、教案_V13；2026-03-16 生成）|
| 競賽文件 DOCX（歷史）| ~12 個 | doc/ 目錄（V3~V12 歷史版本）|
| 競賽文件腳本 | 3 個 | doc/ 目錄（gen_v5.py、md_to_docx.py、gen_v13.py）|
| **2026-03-09 刪除** | **16 個** | css/unit6.css、4 個 .py、3 個 .txt/.bin、2 個 .ini、analysis/(5)、Stps_Flow/(5)、image_list/(5) |
| **已清理異常檔** | **9 個** | 5 個錯位 txt（已刪）+ 1 個不存在 JS（確認）+ 3 個舊 CSS/txt（已刪）|

---

## 十二、B 系列說明（2026-03-14~16 新增）

### 12-1 B 系列特性

| 特性 | 說明 |
|------|------|
| 系列定位 | 預算規劃（介於 C 系列認知訓練與 A 系列情境應用之間）|
| index.html 入口 | `#part4` 第四部分（B1~B6 卡片）|
| 返回主選單 | `../index.html#part4`（`backToMenu()` 函數）|
| CSS 框架 | 遵循 B/C/F 三系列共用 `shared-game-base.css` + `b-series.css` 前綴規則 |
| 語音系統 | 同 A/C/F：優先 Yating→Hanhan→Google→zh-TW→zh→voices[0]；`_loadVoice()` / `onvoiceschanged` |
| 記憶體管理 | `TimerManager` + `EventManager`；`resetGameState()` + `isEndingGame` 旗標（對齊 C/F/A）|
| 吉祥物 | `educated_money_bag_character`（CSS 48px，設定頁左側置）|
| 完成畫面 | CSS 外部化至 `b-series.css`（`b-res-*` class）；JS 移除約 112 行 inline `<style>` |

### 12-2 B 系列各單元核心特色

| 單元 | 核心技能 | 特色設計 |
|------|---------|---------|
| B1 今天帶多少錢 | 從幣值中拖曳湊出目標金額 | `b1-coin-draggable` 拖曳放置；三種難度提示（easy=淡化面額、normal=3錯自動提示、hard=手動提示按鈕）；`_calcOptimalCoins()` |
| B2 零用錢日記 | 判斷每日消費後剩餘金額 | `B2_TEMPLATES` 情境模板；`b2-answer-card` 答題區卡片 |
| B3 存錢計畫 | 計算達成儲蓄目標所需天數 | `B3_ALL_ITEMS` 商品資料；`b3-answer-card` 答題區卡片 |
| B4 特賣比一比 | 比較不同商品的性價比 | `b4-vs-divider` VS 分隔圖示；`_diffDescriptions` 難度說明框；韓文標籤修正（2026-03-16）|
| B5 生日派對預算 | 依預算選購派對物品 | `B5_SCENARIOS` 場景資料；再試一次重試按鈕 |
| B6 菜市場買菜 | 依購物清單在多攤位選購商品並付款 | `B6_STALLS`/`B6_MISSIONS`/`B6_MARKETS`；三欄佈局（攤位進度卡＋市場卡＋結帳卡）；`b6-stall-nav` 左右切換攤位（無閃爍）；提示系統：`_b6P1GenerateHintItems`（貪婪）/`_b6P1ActivateHintMode`/`_b6P1UpdateHintHighlights`/`_b6P1ShowHardHintModal`；簡單模式自動切攤+結帳按鈕「點這裡」；第二頁付款拖曳（`b6p2-*`）；`b6-product-here-hint`（橘色「👇 點這裡」動畫）|

### 12-3 B 系列共用設計模式

- **語音重播**：`.b-inline-replay` 按鈕嵌入題目文字旁（2026-03-16 移入，取代標題列 `.b-replay-btn`）
- **中央回饋動畫**：`_showCenterFeedback()`、`.b-center-feedback`、`.b-cf-icon`（`bFeedbackPop` keyframe）
- **難度說明框**：B2/B3/B5/B6 有 `_diffDescriptions` + `#diff-desc`（`.b-diff-desc` class）
- **標題列三欄**：`.b-header` → `.b-header-left` / `.b-header-center` / `.b-header-right`
- **設定頁返回主選單**：`Game.backToMenu()` → `../index.html#part4`
- **speak() onerror 記錄**：`if (e.error !== 'interrupted') Game.Debug.warn(...)` 對齊 C1/A3 模式
