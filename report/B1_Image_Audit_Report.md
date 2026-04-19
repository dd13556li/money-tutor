# B1 圖片稽核報告

> 產生日期：2026-04-09
> 圖片資料夾：`images/b1/`（共 57 個檔案）
> 場景資料：`js/b1_daily_budget.js` → `B1_SCENARIOS`（共 58 個場景）

---

## 一、本次修正摘要

共找到 **9 個場景**缺少 `imageFile` 欄位，且資料夾中均有對應的圖片檔，已全數補上。

| 難度 | 場景名稱 | 補上的 imageFile |
|------|---------|-----------------|
| easy | 電玩體驗 🎮 | `icon-b1-easy-arcade-game.png` |
| easy | 賞花展 🌸 | `icon-b1-easy-flower-show.png` |
| easy | 寵物店 🐾 | `icon-b1-easy-pet-shop.png` |
| normal | 上學日 🏫 | `icon-b1-normal-school-day.png` |
| normal | 買書 📖 | `icon-b1-normal-buy-books.png` |
| normal | 水族館 🐠 | `icon-b1-normal-aquarium.png` |
| hard | 大採購 🛒 | `icon-b1-hard-big-shopping.png` |
| hard | 海生館 🐠 | `icon-b1-hard-marine-museum.png` |
| hard | 親子遊 🎠 | `icon-b1-hard-family-outing.png` |

---

## 二、仍缺少圖片的場景（資料夾中無對應檔案）

| 難度 | 場景名稱 | 說明 |
|------|---------|------|
| easy | 吃點心 🍜 | 資料夾中無適合的圖片，場景目前使用 emoji 代替 |

**建議**：新增一張名為 `icon-b1-easy-buy-snack.png` 的圖片並補上 `imageFile` 欄位。

---

## 三、資料夾中有圖片但無場景對應（未被使用）

| 檔案名稱 | 推測原意 | 現況 |
|---------|---------|------|
| `icon-b1-hard-claw-machine.png` | 夾娃娃機 | 無對應 hard 場景 |
| `icon-b1-hard-big-shopping2.png` | 大採購（第2版） | `大採購` 已使用 `big-shopping.png`，此為多餘備用 |
| `icon-b1-hard-see-doctor.png` | 看醫生（困難版） | 無 hard 模式看醫生場景（normal 模式已有 `icon-b1-normal-see-doctor.png`） |
| `icon-b1-hard-take-train.png` | 搭火車（困難版） | 無 hard 模式搭火車場景（normal 模式已有 `icon-b1-normal-take-train.png`） |
| `icon-b1-normal-outing.png` | 踏青（普通版） | easy 模式的「踏青」使用 `icon-b1-easy-outing.png`，此檔未被參照 |

---

## 四、圖片使用完整對照表

### Easy 模式（共 18 個場景）

| 場景名稱 | imageFile | 狀態 |
|---------|-----------|------|
| 去學校 🏫 | `icon-b1-easy-go-to-school.png` | ✅ 正常 |
| 去超商 🏪 | `icon-b1-easy-go-to-convenience-store.png` | ✅ 正常 |
| 圖書館 📚 | `icon-b1-easy-library.png` | ✅ 正常 |
| 看表演 🎭 | `icon-b1-easy-watch-performance.png` | ✅ 正常 |
| 游泳課 🏊 | `icon-b1-easy-swimming-class.png` | ✅ 正常 |
| 美術課 🎨 | `icon-b1-easy-art-class.png` | ✅ 正常 |
| 搭公車 🚌 | `icon-b1-easy-take-bus.png` | ✅ 正常 |
| 逛公園 🌿 | `icon-b1-easy-visit-park.png` | ✅ 正常 |
| 買早餐 ☕ | `icon-b1-easy-buy-breakfast.png` | ✅ 正常 |
| 買魚飼料 🐟 | `icon-b1-easy-buy-fish-food.png` | ✅ 正常 |
| 看電影 🎬 | `icon-b1-easy-watch-movie.png` | ✅ 正常 |
| 吃點心 🍜 | —（無圖片） | ❌ 缺少圖片（無對應檔） |
| 買文具 🛒 | `icon-b1-easy-buy-stationery.png` | ✅ 正常 |
| 踏青 ⛺ | `icon-b1-easy-outing.png` | ✅ 正常 |
| 買冰淇淋 🍦 | `icon-b1-hard-eat-ice-cream.png` | ✅ 正常（借用 hard 圖） |
| 電玩體驗 🎮 | `icon-b1-easy-arcade-game.png` | ✅ **本次修正** |
| 賞花展 🌸 | `icon-b1-easy-flower-show.png` | ✅ **本次修正** |
| 寵物店 🐾 | `icon-b1-easy-pet-shop.png` | ✅ **本次修正** |

### Normal 模式（共 20 個場景）

| 場景名稱 | imageFile | 狀態 |
|---------|-----------|------|
| 上學日 🏫 | `icon-b1-normal-school-day.png` | ✅ **本次修正** |
| 才藝課 🎨 | `icon-b1-normal-talent-class.png` | ✅ 正常 |
| 看醫生 🏥 | `icon-b1-normal-see-doctor.png` | ✅ 正常 |
| 看電影 🎬 | `icon-b1-normal-watch-movie.png` | ✅ 正常 |
| 搭火車 🚂 | `icon-b1-normal-take-train.png` | ✅ 正常 |
| 去游泳 🏊 | `icon-b1-normal-go-swimming.png` | ✅ 正常 |
| 買書 📖 | `icon-b1-normal-buy-books.png` | ✅ **本次修正** |
| 爬山 🌄 | `icon-b1-normal-mountain-climbing.png` | ✅ 正常 |
| 遊樂場 🎮（第1） | `icon-b1-normal-playground.png` | ✅ 正常 |
| 吃午飯 🍜 | `icon-b1-normal-have-lunch.png` | ✅ 正常 |
| 補習班 🏫 | `icon-b1-normal-cram-school.png` | ✅ 正常 |
| 下午茶 🍰 | `icon-b1-normal-afternoon-tea.png` | ✅ 正常 |
| 買玩具 🛒 | `icon-b1-normal-buy-toys.png` | ✅ 正常 |
| 遊樂場 🎡（第2） | `icon-b1-normal-playground.png` | ✅ 正常（同圖複用） |
| 吃壽司 🍣 | `icon-b1-hard-eat-sushi.png` | ✅ 正常（借用 hard 圖） |
| 買麵包 🥐 | `icon-b1-hard-buy-bread.png` | ✅ 正常（借用 hard 圖） |
| 去剪髮 💇 | `icon-b1-hard-get-haircut.png` | ✅ 正常（借用 hard 圖） |
| 健身房 🏋️ | `icon-b1-hard-gym.png` | ✅ 正常（借用 hard 圖） |
| 去打保齡球 🎳 | `icon-b1-hard-play-bowling.png` | ✅ 正常（借用 hard 圖） |
| 水族館 🐠 | `icon-b1-normal-aquarium.png` | ✅ **本次修正** |

### Hard 模式（共 20 個場景）

| 場景名稱 | imageFile | 狀態 |
|---------|-----------|------|
| 大採購 🛒 | `icon-b1-hard-big-shopping.png` | ✅ **本次修正** |
| 買禮物 🎂 | `icon-b1-hard-buy-gift.png` | ✅ 正常 |
| 出遊 🌿 | `icon-b1-normal-trip.png` | ✅ 正常（借用 normal 圖） |
| 露營 🏕️ | `icon-b1-normal-camping.png` | ✅ 正常（借用 normal 圖） |
| 遊樂園 🎡 | `icon-b1-hard-amusement-park.png` | ✅ 正常 |
| 校外教學 🌍 | `icon-b1-hard-field-trip.png` | ✅ 正常 |
| 畢業典禮 🎓 | `icon-b1-hard-graduation-ceremony.png` | ✅ 正常 |
| 去海邊 🏖️ | `icon-b1-hard-go-to-beach.png` | ✅ 正常 |
| 聚餐 🍱 | `icon-b1-hard-banquet.png` | ✅ 正常 |
| 暑期課程 🏫 | `icon-b1-hard-summer-course.png` | ✅ 正常 |
| 換季採購 🛍️ | `icon-b1-hard-seasonal-shopping.png` | ✅ 正常 |
| KTV 歡唱 🎤 | `icon-b1-hard-sing-ktv.png` | ✅ 正常 |
| 去打保齡球 🎳 | `icon-b1-hard-play-bowling.png` | ✅ 正常 |
| 逛玩具展 🧸 | `icon-b1-hard-visit-toy-exhibition.png` | ✅ 正常 |
| 買手機殼 📱 | `icon-b1-hard-buy-phone-case.png` | ✅ 正常 |
| 音樂課 🎻 | `icon-b1-hard-music-class.png` | ✅ 正常 |
| 吃披薩 🍕 | `icon-b1-hard-eat-pizza.png` | ✅ 正常 |
| 健身房 🏋️ | `icon-b1-hard-gym.png` | ✅ 正常 |
| 海生館 🐠 | `icon-b1-hard-marine-museum.png` | ✅ **本次修正** |
| 親子遊 🎠 | `icon-b1-hard-family-outing.png` | ✅ **本次修正** |

---

## 五、資料夾現有圖片清單（57 個）

```
images/b1/
├── Easy（16）
│   icon-b1-easy-arcade-game.png          ← 本次新連結：電玩體驗
│   icon-b1-easy-art-class.png
│   icon-b1-easy-buy-breakfast.png
│   icon-b1-easy-buy-fish-food.png
│   icon-b1-easy-buy-stationery.png
│   icon-b1-easy-flower-show.png          ← 本次新連結：賞花展
│   icon-b1-easy-go-to-convenience-store.png
│   icon-b1-easy-go-to-school.png
│   icon-b1-easy-library.png
│   icon-b1-easy-outing.png
│   icon-b1-easy-pet-shop.png             ← 本次新連結：寵物店
│   icon-b1-easy-swimming-class.png
│   icon-b1-easy-take-bus.png
│   icon-b1-easy-visit-park.png
│   icon-b1-easy-watch-movie.png
│   icon-b1-easy-watch-performance.png
│
├── Normal（17）
│   icon-b1-normal-afternoon-tea.png
│   icon-b1-normal-aquarium.png           ← 本次新連結：水族館
│   icon-b1-normal-buy-books.png          ← 本次新連結：買書
│   icon-b1-normal-buy-toys.png
│   icon-b1-normal-camping.png
│   icon-b1-normal-cram-school.png
│   icon-b1-normal-go-swimming.png
│   icon-b1-normal-have-lunch.png
│   icon-b1-normal-mountain-climbing.png
│   icon-b1-normal-outing.png             ⚠️ 未使用
│   icon-b1-normal-playground.png
│   icon-b1-normal-school-day.png         ← 本次新連結：上學日
│   icon-b1-normal-see-doctor.png
│   icon-b1-normal-take-train.png
│   icon-b1-normal-talent-class.png
│   icon-b1-normal-trip.png
│   icon-b1-normal-watch-movie.png
│
└── Hard（24）
    icon-b1-hard-amusement-park.png
    icon-b1-hard-banquet.png
    icon-b1-hard-big-shopping.png          ← 本次新連結：大採購
    icon-b1-hard-big-shopping2.png         ⚠️ 未使用（備用版本）
    icon-b1-hard-buy-bread.png
    icon-b1-hard-buy-gift.png
    icon-b1-hard-buy-phone-case.png
    icon-b1-hard-claw-machine.png          ⚠️ 未使用（無對應場景）
    icon-b1-hard-eat-ice-cream.png
    icon-b1-hard-eat-pizza.png
    icon-b1-hard-eat-sushi.png
    icon-b1-hard-family-outing.png         ← 本次新連結：親子遊
    icon-b1-hard-field-trip.png
    icon-b1-hard-get-haircut.png
    icon-b1-hard-go-to-beach.png
    icon-b1-hard-graduation-ceremony.png
    icon-b1-hard-gym.png
    icon-b1-hard-marine-museum.png         ← 本次新連結：海生館
    icon-b1-hard-music-class.png
    icon-b1-hard-play-bowling.png
    icon-b1-hard-seasonal-shopping.png
    icon-b1-hard-see-doctor.png            ⚠️ 未使用（無 hard 看醫生場景）
    icon-b1-hard-sing-ktv.png
    icon-b1-hard-summer-course.png
    icon-b1-hard-take-train.png            ⚠️ 未使用（無 hard 搭火車場景）
    icon-b1-hard-visit-toy-exhibition.png
```

---

## 六、建議後續動作

| 優先度 | 項目 |
|--------|------|
| 高 | 新增 `icon-b1-easy-buy-snack.png`（吃點心場景，目前唯一缺圖） |
| 低 | 考慮將 `icon-b1-hard-claw-machine.png` 新增為 hard 模式「夾娃娃機」場景 |
| 低 | 考慮將 `icon-b1-hard-see-doctor.png` 用於新增 hard「看診」場景 |
| 低 | 考慮將 `icon-b1-hard-take-train.png` 用於新增 hard「搭火車旅行」場景 |
| 可忽略 | `icon-b1-hard-big-shopping2.png`、`icon-b1-normal-outing.png` 可保留備用或刪除 |
