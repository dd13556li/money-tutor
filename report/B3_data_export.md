# B3 存錢計畫 — 題庫資料匯出

> 資料來源：`js/b3_savings_plan.js`（B3_ALL_ITEMS / B3_ITEMS_BY_DIFF / B3_WEEKLY_OPTIONS / EXCHANGE_RULES）
> 匯出日期：2026-04-20

---

## 一、B3_ALL_ITEMS（共 21 個商品目標）

> 圖片路徑：`images/c5/icon-c5-*.png`（全部已存在）
> 難度篩選：easy（≤400）/ normal（≤800）/ hard（全部）

| # | 名稱 | 圖示 | 售價 | 類別 | 圖片檔名 | 適用難度 |
|---|------|------|------|------|---------|---------|
| 1  | 鉛筆盒   | 🖊️ | 180  | book    | icon-c5-pencil-case.png       | easy / normal / hard |
| 2  | 漫畫書   | 📚 | 200  | book    | icon-c5-comic-book.png        | easy / normal / hard |
| 3  | 日記本   | 📓 | 240  | book    | icon-c5-diary.png             | easy / normal / hard |
| 4  | 故事書   | 📕 | 260  | book    | icon-c5-story-book.png        | easy / normal / hard |
| 5  | 玩具車   | 🚗 | 300  | toy     | icon-c5-toy-car.png           | easy / normal / hard |
| 6  | 計算機   | 🔢 | 340  | tech    | icon-c5-calculator.png        | easy / normal / hard |
| 7  | 娃娃     | 🪆 | 350  | toy     | icon-c5-doll.png              | easy / normal / hard |
| 8  | 遙控車   | 🏎️ | 380 | toy     | icon-c5-rc-car.png            | easy / normal / hard |
| 9  | 機器人玩具 | 🤖 | 400 | toy    | icon-c5-robot.png             | easy / normal / hard |
| 10 | 運動上衣 | 👕 | 450  | outdoor | icon-c5-shirt.png             | normal / hard |
| 11 | 耳機     | 🎧 | 480  | tech    | icon-c5-headphones.png        | normal / hard |
| 12 | 運動褲   | 👖 | 520  | outdoor | icon-c5-pants.png             | normal / hard |
| 13 | 外套     | 🧥 | 550  | outdoor | icon-c5-jacket.png            | normal / hard |
| 14 | 籃球鞋   | 👟 | 620  | outdoor | icon-c5-basketball-shoes.png  | normal / hard |
| 15 | 藍芽喇叭 | 🔊 | 680  | tech    | icon-c5-bluetooth-speaker.png | normal / hard |
| 16 | 滑板     | 🛹 | 750  | outdoor | icon-c5-skateboard.png        | normal / hard |
| 17 | 智慧手錶 | ⌚ | 800  | tech    | icon-c5-smartwatch.png        | normal / hard |
| 18 | 腳踏車   | 🚴 | 1500 | outdoor | icon-c5-bicycle.png           | hard |
| 19 | 平板電腦 | 📱 | 3000 | tech    | icon-c5-tablet.png            | hard |
| 20 | 手機     | 📲 | 4500 | tech    | icon-c5-phone.png             | hard |

---

## 二、B3_ITEMS_BY_DIFF（各難度商品清單）

| 難度 | 篩選條件 | 適用商品數 | 商品名稱 |
|------|---------|---------|---------|
| easy   | price ≤ 400 | 9  | 鉛筆盒、漫畫書、日記本、故事書、玩具車、計算機、娃娃、遙控車、機器人玩具 |
| normal | price ≤ 800 | 17 | easy 全部 + 運動上衣、耳機、運動褲、外套、籃球鞋、藍芽喇叭、滑板、智慧手錶 |
| hard   | 全部        | 20 | normal 全部 + 腳踏車、平板電腦、手機 |

---

## 三、B3_WEEKLY_OPTIONS（測驗模式每週存款選項）

| 難度 | 可選每週存款金額 |
|------|----------------|
| easy   | 50, 100, 150, 200 |
| normal | 30, 50, 75, 100, 120, 150 |
| hard   | 25, 35, 50, 65, 80, 100, 125, 150, 175, 200 |

> 搜尋 `B3_WEEKLY_OPTIONS`

---

## 四、EXCHANGE_RULES（撲滿手動兌換規則）

| 原面額 | 數量 | 換成 |
|--------|------|------|
| 1 元   | 10 個 | 10 元 |
| 1 元   | 5 個  | 5 元  |
| 5 元   | 2 個  | 10 元 |
| 10 元  | 5 個  | 50 元 |
| 50 元  | 2 個  | 100 元 |
| 100 元 | 5 個  | 500 元 |
| 500 元 | 2 個  | 1000 元 |

> 搜尋 `EXCHANGE_RULES`、`.b3-pig-exch-btn`

---

## 五、月曆模式設定選項（難度與天數）

| 難度 | 天數選項（data-ndaily / data-hdaily）| 說明 |
|------|--------------------------------------|------|
| easy   | 固定每天金額，由 price-range + daily-group 決定 | 簡單：preset 面額組合 |
| normal | 6-10天 / 9-15天 / 10-20天 / 自訂金額（data-ndaily） | 每天存固定金額 |
| hard   | 6-10天 / 9-15天 / 10-20天 / 自訂金額（data-hdaily） | 每天存隨機金額 |

> 搜尋 `data-ndaily`、`data-hdaily`、`h-daily-btn-group`

---

## 六、搜尋關鍵字速查

| 項目 | 搜尋關鍵字 |
|------|-----------|
| 商品資料庫 | `B3_ALL_ITEMS` |
| 難度篩選 | `B3_ITEMS_BY_DIFF` |
| 每週存款選項 | `B3_WEEKLY_OPTIONS` |
| 撲滿兌換規則 | `EXCHANGE_RULES`、`_handleExchange` |
| 月曆模式生成 | `_generateCalendarMode`、`_startDragSession` |
| 測驗模式生成 | `_generateQuizMode`、`B3_WEEKLY_OPTIONS` |
| 設定頁天數按鈕 | `data-ndaily`、`data-hdaily` |
