# B1 今天帶多少錢 — 場景資料匯出

> 資料來源：`js/b1_daily_budget.js`（B1_SCENARIOS / DENOM_BY_DIFF）
> 匯出日期：2026-04-20

---

## 一、B1_SCENARIOS（依難度分組）

> 每個場景含：`icon`（Emoji）、`label`（名稱）、`cat`（類別）、`imageFile`（圖片檔名）、`items`（費用項目 min/max）
> 圖片路徑：`images/b1/`；缺少圖片時 `onerror` 自動顯示對應 Emoji
> 類別：`school`（學校）| `food`（飲食）| `outdoor`（戶外）| `entertainment`（娛樂）| `shopping`（購物）

---

### Easy 模式（共 23 個場景）

| # | 圖示 | 場景名稱 | 類別 | 圖片檔名 | 圖片狀態 | 費用項目（名稱 / 最低~最高） |
|---|------|---------|------|---------|---------|--------------------------|
| 1  | 🏫 | 去學校   | school        | icon-b1-easy-go-to-school.png              | ✅ | 午餐費 40~65、公車票 15~30 |
| 2  | 🏪 | 去超商   | shopping      | icon-b1-easy-go-to-convenience-store.png   | ✅ | 飲料費 25~40、零食費 15~30 |
| 3  | 📚 | 圖書館   | school        | icon-b1-easy-library.png                   | ✅ | 影印費 5~20、文具費 5~15 |
| 4  | 🎭 | 看表演   | entertainment | icon-b1-easy-watch-performance.png         | ✅ | 表演票 80~150、零食費 15~25 |
| 5  | 🏊 | 游泳課   | outdoor       | icon-b1-easy-swimming-class.png            | ✅ | 入場費 60~100、飲料費 10~20 |
| 6  | 🎨 | 美術課   | school        | icon-b1-easy-art-class.png                 | ✅ | 材料費 25~50、鉛筆費 10~20 |
| 7  | 🚌 | 搭公車   | school        | icon-b1-easy-take-bus.png                  | ✅ | 公車票 15~30、飲料費 10~20 |
| 8  | 🌿 | 逛公園   | outdoor       | icon-b1-easy-visit-park.png                | ✅ | 停車費 15~30、飲料費 10~20 |
| 9  | ☕ | 買早餐   | food          | icon-b1-easy-buy-breakfast.png             | ✅ | 早餐費 25~55、飲料費 10~20 |
| 10 | 🎬 | 看電影   | entertainment | icon-b1-easy-watch-movie.png               | ✅ | 電影票 100~160、爆米花 25~45 |
| 11 | 🍜 | 吃點心   | food          | icon-b1-easy-buy-snack.png                 | ✅ | 點心費 30~60、飲料費 10~20 |
| 12 | 🛒 | 買文具   | shopping      | icon-b1-easy-buy-stationery.png            | ✅ | 文具費 40~75、橡皮擦 5~10 |
| 13 | ⛺ | 踏青     | outdoor       | icon-b1-easy-outing.png                    | ✅ | 門票費 50~80、飲料費 10~20 |
| 14 | 🍦 | 買冰淇淋 | food          | icon-b1-hard-eat-ice-cream.png             | ✅（借用 hard 圖）| 冰淇淋費 20~50、飲料費 10~20 |
| 15 | 🎮 | 電玩體驗 | entertainment | icon-b1-easy-arcade-game.png               | ✅ | 遊戲費 30~60、零食費 10~20 |
| 16 | 🌸 | 賞花展   | outdoor       | icon-b1-easy-flower-show.png               | ✅ | 門票費 50~100、零食費 10~20 |
| 17 | 🧋 | 買手搖飲 | food          | icon-b1-easy-buy-bubble-tea.png            | ❌ 待新增（顯示🧋 emoji）| 飲料費 40~70、零食費 15~30 |
| 18 | 📓 | 買筆記本 | shopping      | icon-b1-easy-buy-stationery.png            | ✅（借用）| 筆記本費 25~45、鉛筆費 10~20 |
| 19 | 🍳 | 早餐店   | food          | icon-b1-easy-buy-breakfast.png             | ✅（借用）| 早餐費 35~60、公車票 15~30 |
| 20 | 🎮 | 買遊戲點數 | entertainment | icon-b1-easy-arcade-game.png            | ✅（借用）| 點數費 50~100、零食費 10~20 |
| 21 | 🏀 | 打球     | outdoor       | icon-b1-easy-swimming-class.png            | ✅（借用）| 飲料費 20~35、零食費 10~20 |
| 22 | 📱 | 買手機貼紙 | shopping    | icon-b1-easy-buy-stationery.png            | ✅（借用）| 貼紙費 20~40、飲料費 10~20 |
| 23 | 🌙 | 逛夜市   | food          | icon-b1-easy-outing.png                    | ✅（借用）| 小吃費 40~80、飲料費 15~30 |
| 24 | 📝 | 繳班費   | school        | icon-b1-easy-go-to-school.png              | ✅（借用）| 班費 50~100、飲料費 10~20 |

---

### Normal 模式（共 25 個場景）

| # | 圖示 | 場景名稱 | 類別 | 圖片檔名 | 圖片狀態 | 費用項目（名稱 / 最低~最高） |
|---|------|---------|------|---------|---------|--------------------------|
| 1  | 🏫 | 上學日    | school        | icon-b1-normal-school-day.png     | ✅ | 午餐費 50~85、公車票 15~35、文具費 10~25 |
| 2  | 🎨 | 才藝課    | school        | icon-b1-normal-talent-class.png   | ✅ | 課程費 120~220、材料費 40~80、飲料費 15~30 |
| 3  | 🏥 | 看醫生    | school        | icon-b1-normal-see-doctor.png     | ✅ | 掛號費 100~200、藥費 60~130、公車票 15~30 |
| 4  | 🎬 | 看電影    | entertainment | icon-b1-normal-watch-movie.png    | ✅ | 電影票 200~330、爆米花 60~120、飲料費 25~45 |
| 5  | 🚂 | 搭火車    | outdoor       | icon-b1-normal-take-train.png     | ✅ | 火車票 180~360、便當費 60~110、飲料費 20~40 |
| 6  | 🏊 | 去游泳    | outdoor       | icon-b1-normal-go-swimming.png    | ✅ | 入場費 70~130、飲料費 20~45、零食費 15~30 |
| 7  | 📖 | 買參考書  | shopping      | icon-b1-normal-buy-books.png      | ✅ | 參考書費 150~260、文具費 20~50、飲料費 15~30 |
| 8  | 🌄 | 爬山      | outdoor       | icon-b1-normal-mountain-climbing.png | ✅ | 門票費 80~160、食物費 80~160、飲料費 20~40 |
| 9  | 🍜 | 吃午飯    | food          | icon-b1-normal-have-lunch.png     | ✅ | 午餐費 70~130、飲料費 25~50、甜點費 30~60 |
| 10 | 🏫 | 補習班    | school        | icon-b1-normal-cram-school.png    | ✅ | 課程費 150~300、文具費 20~55、飲料費 15~30 |
| 11 | 🍰 | 下午茶    | food          | icon-b1-normal-afternoon-tea.png  | ✅ | 飲料費 45~80、點心費 50~95、甜點費 30~60 |
| 12 | 🎡 | 遊樂場    | entertainment | icon-b1-normal-playground.png     | ✅ | 入場費 120~210、零食費 45~85、飲料費 20~40 |
| 13 | 🍣 | 吃壽司    | food          | icon-b1-hard-eat-sushi.png        | ✅（借用 hard）| 壽司費 150~300、飲料費 25~50、甜點費 30~60 |
| 14 | 🥐 | 買麵包    | food          | icon-b1-hard-buy-bread.png        | ✅（借用 hard）| 麵包費 40~75、咖啡費 45~80、果汁費 20~40 |
| 15 | 💇 | 去剪髮    | shopping      | icon-b1-hard-get-haircut.png      | ✅（借用 hard）| 剪髮費 150~300、洗髮費 50~100、飲料費 20~40 |
| 16 | 🏋️ | 健身房   | outdoor       | icon-b1-hard-gym.png              | ✅（借用 hard）| 入場費 150~300、運動飲料 25~50、毛巾費 20~40 |
| 17 | 🎳 | 去打保齡球 | entertainment | icon-b1-hard-play-bowling.png    | ✅（借用 hard）| 場地費 120~210、租鞋費 40~70、飲料費 20~40 |
| 18 | 🐠 | 水族館    | outdoor       | icon-b1-normal-aquarium.png       | ✅ | 門票費 150~280、紀念品 50~100、飲料費 20~40 |
| 19 | ⛺ | 踏青      | outdoor       | icon-b1-normal-outing.png         | ✅ | 門票費 80~150、飲料費 20~45、零食費 25~50 |
| 20 | 🧋 | 珍奶聚會  | food          | icon-b1-normal-afternoon-tea.png  | ✅（借用）| 飲料費 50~85、點心費 45~80、甜點費 30~60 |
| 21 | 🎧 | 買耳機    | shopping      | icon-b1-hard-buy-phone-case.png   | ✅（借用 hard）| 耳機費 250~420、耳機套 25~50、飲料費 20~40 |
| 22 | 🏀 | 打籃球    | outdoor       | icon-b1-hard-gym.png              | ✅（借用 hard）| 場地費 80~150、飲料費 30~60、零食費 15~30 |
| 23 | 🌙 | 夜市出遊  | food          | icon-b1-normal-outing.png         | ✅（借用）| 小吃費 80~150、夾娃娃費 40~80、飲料費 20~40 |
| 24 | 👟 | 買運動服  | shopping      | icon-b1-hard-big-shopping.png     | ✅（借用 hard）| 運動衣費 150~280、運動褲費 120~220、飲料費 20~40 |
| 25 | 🎮 | 逛電玩店  | entertainment | icon-b1-normal-playground.png     | ✅（借用）| 二手遊戲 150~280、飲料費 25~50、零食費 20~40 |
| 26 | 🍱 | 訂外賣    | food          | icon-b1-normal-have-lunch.png     | ✅（借用）| 餐費 80~150、外送費 30~60、飲料費 20~40 |
| 27 | 📱 | 買手機殼  | shopping      | icon-b1-hard-buy-phone-case.png   | ✅（借用 hard）| 手機殼 100~200、保護貼 30~60、充電線 30~60 |
| 28 | 🏫 | 社團活動  | school        | icon-b1-normal-talent-class.png   | ✅（借用）| 社費 100~180、材料費 50~100、飲料費 15~30 |

---

### Hard 模式（共 27 個場景）

| # | 圖示 | 場景名稱 | 類別 | 圖片檔名 | 圖片狀態 | 費用項目（名稱 / 最低~最高） |
|---|------|---------|------|---------|---------|--------------------------|
| 1  | 🛒 | 大採購    | shopping      | icon-b1-hard-big-shopping.png      | ✅ | 衣服費 280~480、鞋子費 380~620、書費 150~230 |
| 2  | 🎂 | 買禮物    | shopping      | icon-b1-hard-buy-gift.png          | ✅ | 禮物費 200~400、蛋糕費 350~520、卡片費 25~55 |
| 3  | 🌿 | 出遊      | outdoor       | icon-b1-normal-trip.png            | ✅（借用 normal）| 公車票 15~35、冰淇淋費 35~65、門票費 80~160、飲料費 25~50 |
| 4  | 🏕️ | 露營     | outdoor       | icon-b1-normal-camping.png         | ✅（借用 normal）| 食材費 280~440、裝備費 150~300、入場費 120~210 |
| 5  | 🎡 | 遊樂園    | entertainment | icon-b1-hard-amusement-park.png    | ✅ | 門票費 450~720、餐費 200~340、紀念品費 150~260 |
| 6  | 🌍 | 校外教學  | school        | icon-b1-hard-field-trip.png        | ✅ | 交通費 60~130、午餐費 90~160、門票費 150~300、零用錢 80~160 |
| 7  | 🎓 | 畢業典禮  | school        | icon-b1-hard-graduation-ceremony.png | ✅ | 服裝費 380~580、花束費 200~400、聚餐費 280~450 |
| 8  | 🏖️ | 去海邊   | outdoor       | icon-b1-hard-go-to-beach.png       | ✅ | 防曬乳 150~260、餐費 250~400、停車費 80~160、飲料費 50~90 |
| 9  | 🍱 | 聚餐      | food          | icon-b1-hard-banquet.png           | ✅ | 餐費 380~580、飲料費 100~180、甜點費 120~210 |
| 10 | 🏫 | 暑期課程  | school        | icon-b1-hard-summer-course.png     | ✅ | 課程費 400~680、教材費 150~260、午餐費 80~160 |
| 11 | 🛍️ | 換季採購 | shopping      | icon-b1-hard-seasonal-shopping.png | ✅ | 外套費 550~850、褲子費 280~450、包包費 350~580 |
| 12 | 🎤 | KTV 歡唱 | entertainment | icon-b1-hard-sing-ktv.png          | ✅ | 包廂費 320~530、飲料費 100~190、小食費 60~130 |
| 13 | 🎳 | 去打保齡球 | entertainment | icon-b1-hard-play-bowling.png     | ✅ | 場地費 120~210、租鞋費 40~75、飲料費 25~50 |
| 14 | 📱 | 買手機殼  | shopping      | icon-b1-hard-buy-phone-case.png    | ✅ | 手機殼 150~260、保護貼 40~75、充電線 80~160 |
| 15 | 🎻 | 音樂課    | school        | icon-b1-hard-music-class.png       | ✅ | 課程費 320~530、樂器耗材 60~130、教材費 80~160 |
| 16 | 🍕 | 吃披薩    | food          | icon-b1-hard-eat-pizza.png         | ✅ | 披薩費 280~440、飲料費 50~90、甜點費 60~110 |
| 17 | 🏋️ | 健身房   | outdoor       | icon-b1-hard-gym.png               | ✅ | 月費 280~460、運動飲料 25~50、毛巾費 30~60 |
| 18 | 🐠 | 海生館    | outdoor       | icon-b1-hard-marine-museum.png     | ✅ | 門票費 300~480、紀念品費 100~200、餐費 150~280 |
| 19 | 🕹️ | 夾娃娃機 | entertainment | icon-b1-hard-claw-machine.png      | ✅ | 遊戲幣費 150~280、飲料費 25~50、零食費 40~80 |
| 20 | 🏥 | 看醫生    | school        | icon-b1-hard-see-doctor.png        | ✅ | 掛號費 150~300、檢查費 200~400、藥費 120~250 |
| 21 | 🚂 | 搭火車出遊 | outdoor      | icon-b1-hard-take-train.png        | ✅ | 火車票 350~680、便當費 80~150、飲料費 35~65、紀念品費 100~200 |
| 22 | 🎪 | 動漫展    | entertainment | icon-b1-hard-visit-toy-exhibition.png | ✅ | 門票費 250~420、周邊費 300~550、餐費 100~180 |
| 23 | 👟 | 買球鞋    | shopping      | icon-b1-hard-big-shopping.png      | ✅（借用）| 球鞋費 700~1200、鞋墊費 80~160、運動襪 50~100 |
| 24 | 🎮 | 同學聚會  | entertainment | icon-b1-hard-sing-ktv.png          | ✅（借用）| 餐費 250~420、KTV費 180~320、交通費 50~100 |
| 25 | 📚 | 補習班月費 | school       | icon-b1-hard-summer-course.png     | ✅（借用）| 補習費 500~850、教材費 120~230、文具費 60~120 |
| 26 | 🎸 | 音樂社演出 | school       | icon-b1-hard-music-class.png       | ✅（借用）| 表演服費 280~460、道具費 100~200、餐費 120~220、交通費 50~100 |
| 27 | 🌙 | 夜市班遊  | food          | icon-b1-hard-banquet.png           | ✅（借用）| 小吃費 180~320、遊戲費 120~220、飲料費 80~160、交通費 50~100 |
| 28 | 🎧 | 買3C配件  | shopping      | icon-b1-hard-buy-phone-case.png    | ✅（借用）| 耳機費 500~850、充電器費 150~280、手機殼費 80~160 |
| 29 | 🏃 | 校際運動會 | school       | icon-b1-hard-gym.png               | ✅（借用）| 報名費 100~200、服裝費 180~320、餐費 120~200、飲料費 50~100 |

---

## 二、DENOM_BY_DIFF（各難度可用面額）

| 難度 | 可用面額 |
|------|---------|
| easy   | 1, 5, 10, 50 |
| normal | 1, 5, 10, 50, 100, 500 |
| hard   | 1, 5, 10, 50, 100, 500, 1000 |

---

## 三、圖片狀態摘要

| 狀態 | 說明 | 數量 |
|------|------|------|
| ✅ 專屬圖片 | 場景有對應圖片（非借用）| easy: 16、normal: 10、hard: 21 |
| ✅ 借用圖片 | 借用其他難度圖片 | easy: 7、normal: 18、hard: 8 |
| ❌ 待新增 | 圖片尚未製作，目前顯示 Emoji | easy: 1（買手搖飲） |

> 待新增圖片：`icon-b1-easy-buy-bubble-tea.png`（🧋 買手搖飲）
> 搜尋 `TODO: 圖片待新增` 定位 JS 中標記位置

---

## 四、搜尋關鍵字速查

| 項目 | 搜尋關鍵字 |
|------|-----------|
| 場景資料庫 | `B1_SCENARIOS` |
| 圖片渲染（含 onerror fallback）| `_getScenarioIconHTML`、`b1-scene-img`、`onerror.*outerHTML.*icon` |
| Phase 2 參考卡圖片 | `_renderPhase2RefCard`、`b1-scene-img-lg` |
| 行程卡圖片 | `_renderScheduleCard`、`b1-scene-img-lg` |
| 待新增圖片（bubble tea）| `icon-b1-easy-buy-bubble-tea` |
