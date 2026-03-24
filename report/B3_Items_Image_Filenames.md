# B3 存錢計畫 — 商品清單與建議圖片檔名

命名規則：`icon-b3-{英文描述}.png`（對齊 C 系列慣例，如 `icon-c6-lollipop.png`）

---

## 商品清單

| # | 商品名稱   | 價格（元） | Emoji | 建議圖片檔名                        | 難度篩選範圍               |
|---|-----------|-----------|-------|-------------------------------------|--------------------------|
| 1 | 繪畫工具組 | 280       | 🎨    | `icon-b3-art-set.png`               | easy / normal / hard     |
| 2 | 玩具機器人 | 300       | 🤖    | `icon-b3-robot-toy.png`             | easy / normal / hard     |
| 3 | 望遠鏡     | 350       | 🔭    | `icon-b3-telescope.png`             | easy / normal / hard     |
| 4 | 烹飪玩具組 | 420       | 🍳    | `icon-b3-cooking-toy.png`           | normal / hard            |
| 5 | 故事書套組 | 450       | 📚    | `icon-b3-story-books.png`           | normal / hard            |
| 6 | 科學實驗組 | 480       | 🔬    | `icon-b3-science-kit.png`           | normal / hard            |
| 7 | 遊樂園門票 | 500       | 🎡    | `icon-b3-amusement-ticket.png`      | normal / hard            |
| 8 | 魔術道具組 | 550       | 🎩    | `icon-b3-magic-set.png`             | normal / hard            |
| 9 | 生日蛋糕   | 600       | 🎂    | `icon-b3-birthday-cake.png`         | normal / hard            |
|10 | 音樂盒     | 650       | 🎵    | `icon-b3-music-box.png`             | normal / hard            |
|11 | 運動鞋     | 800       | 👟    | `icon-b3-sneakers.png`              | normal / hard            |
|12 | 水族箱     | 1,200     | 🐠    | `icon-b3-fish-tank.png`             | hard                     |
|13 | 電動遊戲機 | 1,500     | 🎮    | `icon-b3-game-console.png`          | hard                     |
|14 | 腳踏車     | 2,400     | 🚴    | `icon-b3-bicycle.png`               | hard                     |

---

## 難度篩選對照

| 難度   | 條件          | 商品數 | 包含商品                                                      |
|--------|--------------|--------|---------------------------------------------------------------|
| easy   | price <= 400  | 3      | 繪畫工具組、玩具機器人、望遠鏡                                 |
| normal | price <= 800  | 11     | 以上 + 烹飪玩具組、故事書套組、科學實驗組、遊樂園門票、魔術道具組、生日蛋糕、音樂盒、運動鞋 |
| hard   | 全部          | 14     | 以上 + 水族箱、電動遊戲機、腳踏車                             |

設定頁「購買物品金額」篩選：`price <= 300` / `<= 500` / `<= 800`（`state.settings.priceRange`）

---

## 圖片規格建議

參考作業單 PDF 系統慣例（WebP 220px q80）：

| 項目       | 建議值                    |
|-----------|--------------------------|
| 格式       | PNG（遊戲用）/ WebP（PDF用）|
| 尺寸       | 220 × 220 px（透明背景）  |
| 存放路徑   | `images/b3/`             |
| 命名前綴   | `icon-b3-`               |

---

## 完整檔名清單（供批次製作）

```
images/b3/icon-b3-art-set.png
images/b3/icon-b3-robot-toy.png
images/b3/icon-b3-telescope.png
images/b3/icon-b3-cooking-toy.png
images/b3/icon-b3-story-books.png
images/b3/icon-b3-science-kit.png
images/b3/icon-b3-amusement-ticket.png
images/b3/icon-b3-magic-set.png
images/b3/icon-b3-birthday-cake.png
images/b3/icon-b3-music-box.png
images/b3/icon-b3-sneakers.png
images/b3/icon-b3-fish-tank.png
images/b3/icon-b3-game-console.png
images/b3/icon-b3-bicycle.png
```

---

## 可複用 C6 現有圖片（免重製）

部分商品與 C6 現有圖片語意相近，可直接複製使用：

| B3 商品    | 可複用 C6 圖片              | 說明            |
|-----------|----------------------------|-----------------|
| 故事書套組 | `icon-c6-story-book.png`   | 直接可用        |
| 生日蛋糕   | `icon-c6-cake.png`         | 直接可用        |
| 玩具機器人 | `icon-c6-robot.png`        | 直接可用        |
| 腳踏車     | `icon-c6-bicycle.png`      | 直接可用        |
| 運動鞋     | `icon-c6-basketball-shoes.png` | 款式略異，可用 |
| 魔術道具組 | `icon-c6-magic-item.png`   | 直接可用        |
