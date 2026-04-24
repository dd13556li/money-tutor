# A1 自動販賣機 — 資料匯出

> 資料來源：`js/a1_vending_machine.js`
> 匯出日期：2026-04-23

---

## 一、單元基本資訊

| 欄位 | 內容 |
|------|------|
| 標題 | A1 — 自動販賣機 |
| 主物件 | `VendingMachine`（IIFE 內部，全域 `window.VendingMachine`）|
| Debug 物件 | `VendingMachine.Debug` |
| JS 行數 | 7,588 行 |
| 版本 | 含 coinFirst 模式（2026-02-28+）|

---

## 二、飲料資料庫（`BEVERAGE_DATABASE`，共 19 種）

| # | id | 名稱 | 基礎售價 | 圖片 |
|---|----|------|---------|------|
| 1 | `premium_roasted_coffee` | 極品炭焙咖啡 | 35 元 | `icon-a01-premium-roasted-coffee.png` |
| 2 | `kyoho_grape_juice` | 巨峰葡萄汁 | 35 元 | `icon-a02-kyoho-grape-juice.png` |
| 3 | `oolong_tea` | 烏龍茶 | 30 元 | `icon-a03-oolong-tea.png` |
| 4 | `sugar_free_green_tea` | 油切無糖綠茶 | 30 元 | `icon-a04-sugar-free-green-tea.png` |
| 5 | `rich_cocoa` | 特濃可可 | 30 元 | `icon-a05-rich-cocoa.png` |
| 6 | `orange_pulp_juice` | 陽光果粒柳橙汁 | 35 元 | `icon-a06-orange-pulp-juice.png` |
| 7 | `classic_coke` | 經典可樂 | 30 元 | `icon-a07-classic-coke.png` |
| 8 | `sarsaparilla_drink` | 沁涼沙士 | 25 元 | `icon-a08-sarsaparilla-drink.png` |
| 9 | `sparkling_apple_drink` | 氣泡蘋果飲 | 25 元 | `icon-a09-sparkling-apple-drink.png` |
| 10 | `refreshing_cola` | 勁爽沁涼可樂 | 30 元 | `icon-a10-refreshing-cola.png` |
| 11 | `assam_milk_tea` | 阿薩姆奶茶 | 28 元 | `icon-a11-assam-milk-tea.png` |
| 12 | `iced_lemon_tea` | 鮮萃凍檸紅茶 | 25 元 | `icon-a12-iced-lemon-tea.png` |
| 13 | `peach_black_tea` | 蜜桃紅茶 | 28 元 | `icon-a13-peach-black-tea.png` |
| 14 | `royal_milk_tea` | 皇家英倫奶茶 | 28 元 | `icon-a14-royal-milk-tea.png` |
| 15 | `sports_drink` | 運動補給飲 | 25 元 | `icon-a15-sports-drink.png` |
| 16 | `traditional_soy_milk` | 古早味豆漿 | 25 元 | `icon-a16-traditional-soy-milk.png` |
| 17 | `mountain_spring_water` | 雪山礦泉水 | 20 元 | `icon-a17-mountain-spring-water.png` |
| 18–19 | （讀取 JS 確認第 18~19 種）| — | — | `icon-a18/a19-*.png` |

> 圖片路徑：`images/a1/`；搜尋：`BEVERAGE_DATABASE`

---

## 三、難度付款規則（`DIFFICULTY_PAYMENT_RULES`）

| 難度 | allowOverpayment | checkUnnecessary | overpaymentCheckMode | allowChange | maxErrors |
|------|-----------------|-----------------|---------------------|-------------|-----------|
| easy | false | false | — | false | 0（立即提示）|
| normal | true | true | `subset-enough` | true | 3 次後提示 |
| hard | true | true | `subset` | true | Infinity（手動提示）|

> 說明：
> - easy：錢包金額 = 商品價格，不允許多付找零
> - normal：任何子集合夠付時不能再加幣
> - hard：任何子集合剛好等於價格時不可多付

> 搜尋：`DIFFICULTY_PAYMENT_RULES`

---

## 四、任務類型

| 類型 | 說明 |
|------|------|
| `assigned` | 指定任務：系統隨機指定一款飲料 |
| `free` | 自選模式：學習者自由選擇 |
| `coinFirstAssigned` | 先投幣再選：指定飲料 |
| `coinFirstFree` | 先投幣再選：自由選 |

---

## 五、簡單模式流程（`EASY_MODE_FLOW`）

- 步驟 1：顯示指定飲料（任務提示）
- 步驟 2：引導投幣（系統顯示需要金額）
- 步驟 3：引導確認購買
- 步驟 4：引導取出飲料
- 步驟 5：引導收取找零（若有）

> 搜尋：`EASY_MODE_FLOW`

---

## 六、錢幣面額

使用 `images/money/` 目錄，含 1/5/10/50/100/500/1000 元正反面共 18 張。

---

## 七、魔法商品（自訂商品）

- 教師/家長可上傳自訂圖片、設定名稱和價格
- 搜尋：`customItems`（A1 magic items）、`showCustomWalletModal`（2026-03-22 升級）
