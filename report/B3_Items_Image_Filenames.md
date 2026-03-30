# B3 存錢計畫 — 商品清單與圖片來源

> **更新日期**：2026-03-30（全面改用 C5 現有圖片，廢棄 `images/b3/` 資料夾）

---

## 商品清單（14 件）

| # | 商品名稱   | 價格（元） | Emoji | 圖片路徑（相對 `../images/`）           | 難度篩選     | 類別  |
|---|-----------|-----------|-------|----------------------------------------|-------------|-------|
| 1 | 漫畫書    | 200       | 📚    | `c5/icon-c5-comic-book.png`            | easy+       | book  |
| 2 | 故事書    | 260       | 📕    | `c5/icon-c5-story-book.png`            | easy+       | book  |
| 3 | 玩具車    | 300       | 🚗    | `c5/icon-c5-toy-car.png`               | easy+       | toy   |
| 4 | 娃娃      | 350       | 🪆    | `c5/icon-c5-doll.png`                  | easy+       | toy   |
| 5 | 遙控車    | 380       | 🏎️   | `c5/icon-c5-rc-car.png`                | easy+       | toy   |
| 6 | 機器人玩具 | 400      | 🤖    | `c5/icon-c5-robot.png`                 | easy+       | toy   |
| 7 | 耳機      | 480       | 🎧    | `c5/icon-c5-headphones.png`            | normal+     | tech  |
| 8 | 外套      | 550       | 🧥    | `c5/icon-c5-jacket.png`                | normal+     | outdoor |
| 9 | 籃球鞋    | 620       | 👟    | `c5/icon-c5-basketball-shoes.png`      | normal+     | outdoor |
|10 | 藍芽喇叭  | 680       | 🔊    | `c5/icon-c5-bluetooth-speaker.png`     | normal+     | tech  |
|11 | 滑板      | 750       | 🛹    | `c5/icon-c5-skateboard.png`            | normal+     | outdoor |
|12 | 智慧手錶  | 800       | ⌚    | `c5/icon-c5-smartwatch.png`            | normal+     | tech  |
|13 | 腳踏車    | 1,500     | 🚴    | `c5/icon-c5-bicycle.png`               | hard        | outdoor |
|14 | 平板電腦  | 3,000     | 📱    | `c5/icon-c5-tablet.png`                | hard        | tech  |

---

## 難度篩選對照

| 難度   | 條件          | 商品數 | 包含商品                                                              |
|--------|--------------|--------|-----------------------------------------------------------------------|
| easy   | price ≤ 400  | 6      | 漫畫書、故事書、玩具車、娃娃、遙控車、機器人玩具                       |
| normal | price ≤ 800  | 12     | 以上 + 耳機、外套、籃球鞋、藍芽喇叭、滑板、智慧手錶                   |
| hard   | 全部          | 14     | 以上 + 腳踏車、平板電腦                                               |

設定頁「購買物品金額」篩選：`price <= 300` / `<= 500` / `<= 800`（`state.settings.priceRange`）

---

## 圖片系統說明

### 路徑規則（2026-03-30 更新）

原 `../images/b3/${item.img}` 寫死路徑已改為 `../images/${item.img}`，`img` 欄位存放含資料夾的相對路徑（如 `c5/icon-c5-robot.png`）。

- **廢棄**：`images/b3/` 資料夾及所有 `icon-b3-*.png`（已刪除）
- **現用**：直接共用 `images/c5/` 資料夾圖片，無需複製

### 圖片來源對照

| 商品      | C5 圖片檔案                          |
|----------|--------------------------------------|
| 漫畫書    | `icon-c5-comic-book.png`             |
| 故事書    | `icon-c5-story-book.png`             |
| 玩具車    | `icon-c5-toy-car.png`                |
| 娃娃      | `icon-c5-doll.png`                   |
| 遙控車    | `icon-c5-rc-car.png`                 |
| 機器人玩具 | `icon-c5-robot.png`                 |
| 耳機      | `icon-c5-headphones.png`             |
| 外套      | `icon-c5-jacket.png`                 |
| 籃球鞋    | `icon-c5-basketball-shoes.png`       |
| 藍芽喇叭  | `icon-c5-bluetooth-speaker.png`      |
| 滑板      | `icon-c5-skateboard.png`             |
| 智慧手錶  | `icon-c5-smartwatch.png`             |
| 腳踏車    | `icon-c5-bicycle.png`                |
| 平板電腦  | `icon-c5-tablet.png`                 |
