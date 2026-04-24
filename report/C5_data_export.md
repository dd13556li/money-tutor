# C5 單元：足額付款 — 資料匯出

> 資料來源：`js/c5_sufficient_payment.js`
> 匯出日期：2026-04-23

---

## 一、單元基本資訊

| 項目 | 說明 |
|------|------|
| 單元編號 | C5 |
| 單元名稱 | 足額付款 |
| 主物件 | `Game`（全域） |
| 核心概念 | 判斷錢包裡的金額是否足夠購買商品（夠／不夠），並在簡單模式下自動判斷；普通／困難模式下需拖曳金錢至購物區再按鈕判斷 |
| 商品圖片目錄 | `images/c5/`（共 48 種圖示） |

---

## 二、設定頁選項（`state.settings`）

| 欄位 | 型別 | 說明 | 可選值 |
|------|------|------|--------|
| `digits` | number / string | 商品價格位數 | `1`、`2`、`3`、`4`、`'custom'` |
| `customAmount` | number | 自訂目標金額（digits='custom' 時生效） | 1–9999（預設 0） |
| `denominations` | number[] | 可用的錢幣面額（多選） | 1、5、10、50、100、500、1000 |
| `difficulty` | string | 難度 | `'easy'`、`'normal'`、`'hard'` |
| `mode` | string / null | 測驗模式（簡單模式不需設定） | `'repeated'`（反復）、`'single'`（單次） |
| `itemTypes` | string[] | 物品類型（多選，依 digits 自動限制） | 見第三節 |
| `questionCount` | number / null | 題目數量 | 1、3、5、10、自訂 |
| `assistClick` | boolean | 輔助點擊模式（僅簡單模式可用） | true / false |
| `usingPreset` | boolean | 是否使用預設設定 | true / false |

---

## 三、商品資料庫（`gameData.purchaseItems`）

### 1 位數（1–9 元）

| 類型 key | 類型名稱 | 商品 id | 商品名稱 | img 前綴 | priceRange |
|---------|---------|---------|---------|---------|-----------|
| `candy` | 糖果 | `candy_lollipop` | 棒棒糖 | icon-c5-lollipop | [2, 8] |
| `candy` | 糖果 | `candy_gum` | 口香糖 | icon-c5-gum | [3, 9] |
| `candy` | 糖果 | `candy_chocolate` | 巧克力 | icon-c5-chocolate | [4, 9] |
| `sticker` | 貼紙 | `sticker_star` | 星星貼紙 | icon-c5-star-sticker | [1, 6] |
| `sticker` | 貼紙 | `sticker_heart` | 愛心貼紙 | icon-c5-heart-sticker | [2, 8] |
| `sticker` | 貼紙 | `sticker_animal` | 動物貼紙 | icon-c5-animal-sticker | [3, 9] |
| `eraser` | 橡皮擦 | `eraser_elephant` | 大象造形橡皮擦 | icon-c5-elephant-eraser | [2, 7] |
| `eraser` | 橡皮擦 | `eraser_car` | 汽車造形橡皮擦 | icon-c5-car-eraser | [4, 9] |
| `eraser` | 橡皮擦 | `eraser_rainbow` | 彩虹造形橡皮擦 | icon-c5-rainbow-eraser | [3, 9] |

### 2 位數（10–99 元）

| 類型 key | 類型名稱 | 商品 id | 商品名稱 | img 前綴 | priceRange |
|---------|---------|---------|---------|---------|-----------|
| `snack` | 零食 | `snack_cookie` | 餅乾 | icon-c5-cookie | [15, 85] |
| `snack` | 零食 | `snack_chips` | 洋芋片 | icon-c5-chips | [20, 90] |
| `snack` | 零食 | `snack_crackers` | 蘇打餅 | icon-c5-crackers | [12, 75] |
| `pen` | 筆 | `pen_ballpoint` | 原子筆 | icon-c5-ballpoint-pen | [10, 60] |
| `pen` | 筆 | `pen_whiteboard` | 白板筆 | icon-c5-whiteboard-marker | [25, 95] |
| `pen` | 筆 | `pen_colored` | 彩色筆 | icon-c5-colored-pen | [30, 85] |
| `notebook` | 筆記本 | `drink_cup` | 杯子 | icon-c5-cup | [30, 150] |
| `notebook` | 筆記本 | `notebook_spiral` | 線圈筆記本 | icon-c5-spiral-notebook | [20, 85] |
| `notebook` | 筆記本 | `notebook_diary` | 日記本 | icon-c5-diary | [25, 95] |
| `fruit` | 水果 | `fruit_apple` | 蘋果 | icon-c5-apple | [12, 45] |
| `fruit` | 水果 | `fruit_banana` | 香蕉 | icon-c5-banana | [10, 35] |
| `fruit` | 水果 | `fruit_orange` | 橘子 | icon-c5-orange | [15, 50] |

### 3 位數（100–999 元）

| 類型 key | 類型名稱 | 商品 id | 商品名稱 | img 前綴 | priceRange |
|---------|---------|---------|---------|---------|-----------|
| `toy` | 玩具 | `toy_car` | 玩具車 | icon-c5-toy-car | [120, 850] |
| `toy` | 玩具 | `toy_doll` | 娃娃 | icon-c5-doll | [150, 600] |
| `toy` | 玩具 | `toy_robot` | 機器人 | icon-c5-robot | [200, 900] |
| `book` | 書籍 | `book_story` | 故事書 | icon-c5-story-book | [100, 400] |
| `book` | 書籍 | `book_comic` | 漫畫書 | icon-c5-comic-book | [150, 500] |
| `book` | 書籍 | `food_pizza` | 比薩 | icon-c5-pizza | [150, 500] |
| `lunch` | 便當 | `lunch_bento` | 便當 | icon-c5-bento | [80, 300] |
| `lunch` | 便當 | `lunch_club_sandwich` | 總匯三明治 | icon-c5-club-sandwich | [80, 250] |
| `lunch` | 便當 | `lunch_beef_noodle` | 牛肉麵 | icon-c5-beef-noodle | [120, 400] |
| `stationery_set` | 文具組 | `stationery_pencil_case` | 筆盒 | icon-c5-pencil-case | [120, 500] |
| `stationery_set` | 文具組 | `food_nuts` | 堅果 | icon-c5-nuts | [80, 350] |
| `stationery_set` | 文具組 | `stationery_calculator` | 計算機 | icon-c5-calculator | [150, 600] |

### 4 位數（1000–9999 元）

| 類型 key | 類型名稱 | 商品 id | 商品名稱 | img 前綴 | priceRange |
|---------|---------|---------|---------|---------|-----------|
| `electronics` | 電子產品 | `electronics_phone` | 手機 | icon-c5-phone | [3000, 9000] |
| `electronics` | 電子產品 | `electronics_tablet` | 平板 | icon-c5-tablet | [2500, 8000] |
| `electronics` | 電子產品 | `electronics_headphones` | 耳機 | icon-c5-headphones | [1000, 5000] |
| `clothing` | 衣物 | `clothing_shirt` | 上衣 | icon-c5-shirt | [1000, 3000] |
| `clothing` | 衣物 | `clothing_pants` | 褲子 | icon-c5-pants | [1000, 4000] |
| `clothing` | 衣物 | `clothing_jacket` | 外套 | icon-c5-jacket | [1500, 6000] |
| `sports` | 運動用品 | `sports_skateboard` | 滑板 | icon-c5-skateboard | [2000, 8000] |
| `sports` | 運動用品 | `sports_speaker` | 藍芽喇叭 | icon-c5-bluetooth-speaker | [1000, 5000] |
| `sports` | 運動用品 | `sports_basketball_shoes` | 籃球鞋 | icon-c5-basketball-shoes | [2000, 8000] |
| `game` | 遊戲 | `sports_bicycle` | 腳踏車 | icon-c5-bicycle | [3000, 12000] |
| `game` | 遊戲 | `game_rc_car` | 搖控汽車 | icon-c5-rc-car | [1000, 3000] |
| `game` | 遊戲 | `tech_smartwatch` | 智慧手錶 | icon-c5-smartwatch | [3000, 12000] |

### 自訂金額物品

| 類型 key | 商品 id | 商品名稱 | img 前綴 | priceRange |
|---------|---------|---------|---------|-----------|
| `custom_item` | `custom_gift` | 神秘禮物 | icon-c5-mystery-gift | [1, 9999] |
| `custom_item` | `custom_treasure` | 寶物 | icon-c5-treasure | [1, 9999] |
| `custom_item` | `custom_magic` | 魔法物品 | icon-c5-magic-item | [1, 9999] |

---

## 四、位數 → 物品類型對應（`getAvailableItemTypes`）

| digits | 可選物品類型（type key） |
|--------|------------------------|
| 1 | candy, sticker, eraser |
| 2 | snack, pen, notebook, fruit |
| 3 | toy, book, lunch, stationery_set |
| 4 | electronics, clothing, sports, game |
| 'custom' | 依自訂金額大小自動對應至對應位數層級 |

---

## 五、錢幣資料（`gameData.allItems`）

| 面額 | 正面圖片路徑 | 背面圖片路徑 |
|------|------------|------------|
| 1元 | `../images/money/1_yuan_front.png` | `../images/money/1_yuan_back.png` |
| 5元 | `../images/money/5_yuan_front.png` | `../images/money/5_yuan_back.png` |
| 10元 | `../images/money/10_yuan_front.png` | `../images/money/10_yuan_back.png` |
| 50元 | `../images/money/50_yuan_front.png` | `../images/money/50_yuan_back.png` |
| 100元 | `../images/money/100_yuan_front.png` | `../images/money/100_yuan_back.png` |
| 500元 | `../images/money/500_yuan_front.png` | `../images/money/500_yuan_back.png` |
| 1000元 | `../images/money/1000_yuan_front.png` | `../images/money/1000_yuan_back.png` |

---

## 六、難度配置（`ModeConfig`）

| 難度 | 價格策略 | expansionFactor | centerBias | roundingRule | priceDisplayDelay | speechDelay |
|------|---------|----------------|-----------|-------------|-------------------|-------------|
| easy | favor_center | 5% | 70% | nearest1 | 500ms | 800ms |
| normal | balanced_range | 10% | 50% | nearest1 | 300ms | 600ms |
| hard | expand_range | 15% | 30% | irregular | 200ms | 400ms |

---

## 七、題目結構（`state.quiz.questions[]` 每題物件）

| 欄位 | 說明 |
|------|------|
| `item` | 商品物件（含 name, img, emoji, id, priceRange） |
| `itemPrice` | 本題商品售價（由 PriceStrategy 生成） |
| `totalMoney` | 錢包裡的金錢總額 |
| `isAffordable` | 布林值：totalMoney >= itemPrice |
| `walletCoins` | 錢包幣組成（{value, image, type}[] ） |

---

## 八、計分方式

- 每題答對：+10 分
- 完成畫面：`showResults()` → `speakResults(score, totalQuestions, percentage)`
- 百分比 = round((score / 10 / totalQuestions) * 100)

---

## 九、Debug 系統

搜尋：`Game.Debug.FLAGS`

| 類別 flag | 說明 |
|----------|------|
| judge | 判斷邏輯（夠/不夠） |
| payment | 付款驗證 |
| drag | 拖放操作 |
| touch | 觸控事件 |
| question | 題目生成 |
| state | 狀態轉換 |
| wallet | 錢包操作 |
| hint | 提示系統 |
| speech | 語音系統 |
| error | 永遠顯示 |
