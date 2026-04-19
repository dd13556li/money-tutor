# B3 存錢計畫 — 商品清單與圖片來源

> **更新日期**：2026-03-31（商品擴充 14→20 件，新增文具/服飾/手機類別）
> **前次更新**：2026-03-30（全面改用 C5 現有圖片，廢棄 `images/b3/` 資料夾）

---

## 商品清單（20 件）

| # | 商品名稱   | 價格（元） | Emoji | 圖片路徑（相對 `../images/`）           | 難度篩選     | 類別  |
|---|-----------|-----------|-------|----------------------------------------|-------------|-------|
| 1 | 鉛筆盒    | 180       | 🖊️   | `c5/icon-c5-pencil-case.png`           | easy+       | book  |
| 2 | 漫畫書    | 200       | 📚    | `c5/icon-c5-comic-book.png`            | easy+       | book  |
| 3 | 日記本    | 240       | 📓    | `c5/icon-c5-diary.png`                 | easy+       | book  |
| 4 | 故事書    | 260       | 📕    | `c5/icon-c5-story-book.png`            | easy+       | book  |
| 5 | 玩具車    | 300       | 🚗    | `c5/icon-c5-toy-car.png`               | easy+       | toy   |
| 6 | 計算機    | 340       | 🔢    | `c5/icon-c5-calculator.png`            | easy+       | tech  |
| 7 | 娃娃      | 350       | 🪆    | `c5/icon-c5-doll.png`                  | easy+       | toy   |
| 8 | 遙控車    | 380       | 🏎️   | `c5/icon-c5-rc-car.png`                | easy+       | toy   |
| 9 | 機器人玩具 | 400      | 🤖    | `c5/icon-c5-robot.png`                 | easy+       | toy   |
|10 | 運動上衣  | 450       | 👕    | `c5/icon-c5-shirt.png`                 | normal+     | outdoor |
|11 | 耳機      | 480       | 🎧    | `c5/icon-c5-headphones.png`            | normal+     | tech  |
|12 | 運動褲    | 520       | 👖    | `c5/icon-c5-pants.png`                 | normal+     | outdoor |
|13 | 外套      | 550       | 🧥    | `c5/icon-c5-jacket.png`                | normal+     | outdoor |
|14 | 籃球鞋    | 620       | 👟    | `c5/icon-c5-basketball-shoes.png`      | normal+     | outdoor |
|15 | 藍芽喇叭  | 680       | 🔊    | `c5/icon-c5-bluetooth-speaker.png`     | normal+     | tech  |
|16 | 滑板      | 750       | 🛹    | `c5/icon-c5-skateboard.png`            | normal+     | outdoor |
|17 | 智慧手錶  | 800       | ⌚    | `c5/icon-c5-smartwatch.png`            | normal+     | tech  |
|18 | 腳踏車    | 1,500     | 🚴    | `c5/icon-c5-bicycle.png`               | hard        | outdoor |
|19 | 平板電腦  | 3,000     | 📱    | `c5/icon-c5-tablet.png`                | hard        | tech  |
|20 | 手機      | 4,500     | 📲    | `c5/icon-c5-phone.png`                 | hard        | tech  |

---

## 難度篩選對照（2026-03-31 更新）

| 難度   | 條件          | 商品數 | 包含商品                                                                                  |
|--------|--------------|--------|-------------------------------------------------------------------------------------------|
| easy   | price ≤ 400  | 9      | 鉛筆盒、漫畫書、日記本、故事書、玩具車、計算機、娃娃、遙控車、機器人玩具                   |
| normal | price ≤ 800  | 17     | 以上 + 運動上衣、耳機、運動褲、外套、籃球鞋、藍芽喇叭、滑板、智慧手錶                     |
| hard   | 全部          | 20     | 以上 + 腳踏車、平板電腦、手機                                                              |

設定頁「購買物品金額」篩選（`state.settings.priceRange`）：

| priceRange | 條件       | 商品數 | 說明                          |
|-----------|------------|--------|-------------------------------|
| 300       | price ≤300 | 5      | 鉛筆盒、漫畫書、日記本、故事書、玩具車 |
| 500       | price ≤500 | 11     | 以上 + 計算機、娃娃、遙控車、機器人玩具、運動上衣、耳機 |
| 800       | price ≤800 | 17     | easy + normal 全部            |

---

## 類別篩選（`state.settings.itemCat`）

| 類別    | 件數 | 商品名稱                                        |
|---------|------|------------------------------------------------|
| book    | 4    | 鉛筆盒、漫畫書、日記本、故事書                  |
| toy     | 4    | 玩具車、娃娃、遙控車、機器人玩具                |
| outdoor | 6    | 運動上衣、運動褲、外套、籃球鞋、滑板、腳踏車    |
| tech    | 6    | 計算機、耳機、藍芽喇叭、智慧手錶、平板電腦、手機 |

> 難度「困難」模式設定頁才顯示「🗂️ 目標類別」篩選。

---

## 圖片系統說明

### 路徑規則（2026-03-30 更新）

原 `../images/b3/${item.img}` 寫死路徑已改為 `../images/${item.img}`，`img` 欄位存放含資料夾的相對路徑（如 `c5/icon-c5-robot.png`）。

- **廢棄**：`images/b3/` 資料夾及所有 `icon-b3-*.png`（已刪除）
- **現用**：直接共用 `images/c5/` 資料夾圖片，無需複製

### 新增商品圖片（2026-03-31）

| 商品     | C5 圖片檔案                  | 說明           |
|---------|------------------------------|----------------|
| 鉛筆盒  | `icon-c5-pencil-case.png`    | 文具類，新增   |
| 日記本  | `icon-c5-diary.png`          | 文具類，新增   |
| 計算機  | `icon-c5-calculator.png`     | 科技文具，新增 |
| 運動上衣 | `icon-c5-shirt.png`         | 服飾類，新增   |
| 運動褲  | `icon-c5-pants.png`          | 服飾類，新增   |
| 手機    | `icon-c5-phone.png`          | 高價科技，新增 |

### 全部商品圖片來源對照

| 商品      | C5 圖片檔案                          |
|----------|--------------------------------------|
| 鉛筆盒    | `icon-c5-pencil-case.png`            |
| 漫畫書    | `icon-c5-comic-book.png`             |
| 日記本    | `icon-c5-diary.png`                  |
| 故事書    | `icon-c5-story-book.png`             |
| 玩具車    | `icon-c5-toy-car.png`                |
| 計算機    | `icon-c5-calculator.png`             |
| 娃娃      | `icon-c5-doll.png`                   |
| 遙控車    | `icon-c5-rc-car.png`                 |
| 機器人玩具 | `icon-c5-robot.png`                 |
| 運動上衣  | `icon-c5-shirt.png`                  |
| 耳機      | `icon-c5-headphones.png`             |
| 運動褲    | `icon-c5-pants.png`                  |
| 外套      | `icon-c5-jacket.png`                 |
| 籃球鞋    | `icon-c5-basketball-shoes.png`       |
| 藍芽喇叭  | `icon-c5-bluetooth-speaker.png`      |
| 滑板      | `icon-c5-skateboard.png`             |
| 智慧手錶  | `icon-c5-smartwatch.png`             |
| 腳踏車    | `icon-c5-bicycle.png`                |
| 平板電腦  | `icon-c5-tablet.png`                 |
| 手機      | `icon-c5-phone.png`                  |
