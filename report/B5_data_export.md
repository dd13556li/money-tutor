# B5 生日派對預算 — 商品資料匯出

> 資料來源：`js/b5_party_budget.js`（B5_ALL_ITEMS / B5_SCENARIOS / B5_THEMES）
> 匯出日期：2026-04-23

---

## 一、B5_ALL_ITEMS（生日派對主題商品，共 20 種）

| id | 名稱 | 圖示 | 單價 | 類別 |
|----|------|------|------|------|
| cake | 生日蛋糕 | 🎂 | 380 | food |
| drink | 果汁飲料 | 🧃 | 120 | food |
| candy | 糖果禮包 | 🍬 | 90 | food |
| plate | 派對紙盤 | 🍽️ | 45 | food |
| cup | 派對杯組 | 🥤 | 55 | food |
| napkin | 主題餐巾紙 | 🧻 | 35 | food |
| balloon | 彩色氣球 | 🎈 | 50 | decor |
| candle | 生日蠟燭 | 🕯️ | 30 | decor |
| ribbon | 彩帶裝飾 | 🎊 | 65 | decor |
| hat | 派對帽 | 🎉 | 80 | decor |
| banner | 生日橫幅 | 🏷️ | 70 | decor |
| lights | 彩色串燈 | 💡 | 90 | decor |
| sticker | 主題貼紙 | 🌟 | 40 | decor |
| tablecloth | 派對桌巾 | 🎪 | 75 | decor |
| wand | 魔法棒 | 🪄 | 45 | decor |
| gift | 小禮物 | 🎁 | 200 | activity |
| photo | 拍立得相機 | 📸 | 150 | activity |
| popper | 噴彩拉炮 | 🎆 | 55 | activity |
| speaker | 藍牙喇叭 | 🔊 | 280 | activity |
| game | 桌遊卡片 | 🃏 | 120 | activity |

---

## 二、B5_ITEM_CATEGORIES（類別 → 分組 meta）

| 類別 key | 名稱 | 圖示 | 涵蓋商品 id（生日主題）|
|---------|------|------|----------------------|
| food | 食物飲料 | 🍱 | cake, drink, candy, plate, cup, napkin |
| decor | 裝飾道具 | 🎊 | balloon, candle, ribbon, hat, banner, lights, sticker, tablecloth, wand |
| activity | 遊戲活動 | 🎯 | gift, photo, popper, speaker, game |

---

## 三、B5_SCENARIOS（生日派對主題關卡，依難度）

> 各關提供 `budget`（預算上限）與 `availableIds`（可選商品清單）

### 簡單（easy，共 16 關）
| # | 預算 | 可選商品 |
|---|------|----------|
| 1 | 700 | cake, drink, balloon, hat, candle |
| 2 | 600 | cake, drink, ribbon, plate, candle |
| 3 | 650 | cake, drink, balloon, plate, hat |
| 4 | 750 | cake, drink, candy, hat, candle |
| 5 | 680 | cake, drink, popper, candle, balloon |
| 6 | 720 | cake, drink, ribbon, hat, plate |
| 7 | 600 | cake, drink, balloon, candle, plate |
| 8 | 650 | cake, drink, hat, popper, candle |
| 9 | 700 | cake, drink, banner, photo, candle |
| 10 | 650 | cake, drink, candy, popper, ribbon |
| 11 | 720 | cake, drink, plate, candle, banner |
| 12 | 680 | cake, drink, ribbon, balloon, plate |
| 13 | 700 | cake, drink, cup, napkin, sticker |
| 14 | 650 | cake, drink, wand, tablecloth, balloon |
| 15 | 680 | cake, drink, lights, hat, candle |
| 16 | 720 | cake, drink, sticker, ribbon, cup |

### 普通（normal，共 16 關）
| # | 預算 | 可選商品 |
|---|------|----------|
| 1 | 700 | cake, drink, balloon, gift, plate, candle, hat |
| 2 | 750 | cake, drink, ribbon, gift, photo, candle, hat |
| 3 | 800 | cake, drink, balloon, gift, candy, popper, hat |
| 4 | 650 | cake, drink, balloon, plate, ribbon, candle, hat |
| 5 | 720 | cake, drink, gift, ribbon, photo, plate, candle |
| 6 | 780 | cake, drink, candy, gift, popper, banner, hat |
| 7 | 700 | cake, drink, balloon, photo, plate, ribbon, candle |
| 8 | 760 | cake, drink, gift, candy, banner, popper, hat |
| 9 | 730 | cake, drink, balloon, photo, candy, ribbon, plate |
| 10 | 710 | cake, drink, gift, plate, banner, balloon, candle |
| 11 | 740 | cake, drink, candy, hat, photo, popper, ribbon |
| 12 | 770 | cake, drink, balloon, banner, ribbon, hat, gift |
| 13 | 720 | cake, drink, cup, napkin, lights, sticker, tablecloth |
| 14 | 760 | cake, drink, game, wand, sticker, cup, tablecloth |
| 15 | 750 | cake, drink, lights, ribbon, hat, sticker, napkin |
| 16 | 740 | cake, drink, tablecloth, cup, game, balloon, candle |

### 困難（hard，共 12 關）
| # | 預算 | 可選商品（9樣）|
|---|------|----------------|
| 1 | 700 | cake, drink, balloon, gift, plate, candle, ribbon, hat, candy |
| 2 | 750 | cake, drink, ribbon, gift, photo, candle, hat, popper, candy |
| 3 | 720 | cake, drink, balloon, gift, banner, plate, ribbon, hat, photo |
| 4 | 680 | cake, drink, balloon, gift, candy, popper, ribbon, hat, banner |
| 5 | 760 | cake, drink, gift, photo, candy, popper, banner, ribbon, hat |
| 6 | 740 | cake, drink, balloon, gift, photo, plate, candle, ribbon, popper |
| 7 | 710 | cake, drink, candy, banner, gift, hat, photo, ribbon, popper |
| 8 | 770 | cake, drink, balloon, gift, photo, candy, plate, banner, hat |
| 9 | 720 | cake, drink, cup, napkin, lights, sticker, tablecloth, wand, game |
| 10 | 760 | cake, drink, game, gift, lights, ribbon, tablecloth, cup, sticker |
| 11 | 740 | cake, drink, speaker, balloon, hat, cup, sticker, napkin, wand |
| 12 | 730 | cake, drink, photo, game, lights, tablecloth, ribbon, hat, sticker |

---

## 四、B5_THEMES（派對主題，共 3 種）

### birthday — 生日派對 🎂
- 使用 `B5_ALL_ITEMS`（20 種）+ `B5_SCENARIOS`
- 可選商品：見上方商品表

### halloween — 萬聖節派對 🎃（15 種商品）

| id | 名稱 | 圖示 | 單價 | 類別 |
|----|------|------|------|------|
| pumpkin | 南瓜燈 | 🎃 | 150 | decor |
| costume | 萬聖節服裝 | 👻 | 250 | activity |
| candy_bag | 糖果袋 | 🍬 | 80 | food |
| witch_hat | 巫師帽 | 🧙 | 60 | decor |
| spider | 蜘蛛網裝飾 | 🕸️ | 45 | decor |
| skull | 骷髏擺件 | 💀 | 70 | decor |
| glow | 螢光棒 | 🌟 | 25 | activity |
| ghost | 鬼臉面具 | 😱 | 90 | activity |
| treat | 糖果包裝袋 | 🛍️ | 40 | food |
| fangs | 吸血鬼牙齒 | 🦷 | 30 | activity |
| hw_bat | 蝙蝠裝飾 | 🦇 | 40 | decor |
| hw_mask | 恐怖面具 | 😈 | 65 | activity |
| hw_chocolate | 萬聖節巧克力 | 🍫 | 35 | food |
| hw_cookie | 鬼臉餅乾 | 🍪 | 30 | food |
| hw_popcorn | 鬼怪爆米花 | 🍿 | 40 | food |

**萬聖節關卡預算範圍**：easy 550–620、normal 640–720、hard 640–720

### picnic — 春日野餐 🌸（15 種商品）

| id | 名稱 | 圖示 | 單價 | 類別 |
|----|------|------|------|------|
| sandwich | 三明治 | 🥪 | 120 | food |
| blanket | 野餐墊 | 🧺 | 180 | decor |
| fruit | 水果盒 | 🍓 | 95 | food |
| juice | 果汁飲料 | 🧃 | 60 | food |
| cookies | 餅乾點心 | 🍪 | 75 | food |
| sunhat | 遮陽帽 | 👒 | 150 | decor |
| frisbee | 飛盤 | 🥏 | 85 | activity |
| bubble | 泡泡水 | 🫧 | 30 | activity |
| balloon | 彩色汽球 | 🎈 | 50 | decor |
| kite | 風箏 | 🪁 | 160 | activity |
| pc_onigiri | 飯糰 | 🍙 | 45 | food |
| pc_flowers | 野花束 | 🌺 | 55 | decor |
| pc_umbrella | 遮陽傘 | ⛱️ | 90 | decor |
| pc_badminton | 羽毛球組 | 🏸 | 75 | activity |
| pc_rope | 跳繩 | 🪢 | 50 | activity |

**春日野餐關卡預算範圍**：easy 480–520、normal 580–650、hard 620–680

---

## 五、難度與流程對應（2026-04-18 重設計後）

| 難度 | Phase 1（購物）| Phase 2（付款）| 找零 |
|------|---------------|---------------|------|
| easy | 簡單模式：一次高亮1個商品（`_b5P1ActivateHintMode`），一件一件帶著選；選完自動高亮確認按鈕 | 顯示 ghost slots，拖入自動確認 | Ghost slot 提示（貪婪解），填完自動確認 |
| normal | 3次超預算錯誤後自動提示（`_b5P1ShowHint`）；ghost slot 模式引導 | 金額足夠播提示語音；3次付款錯誤 → `_showB5HardModeHintModal` | 普通模式3次錯誤 → ghost slot；提示鈕 → ghost slot |
| hard | 提示鈕 → `_showHardModeHintModal`（預算分析彈窗） | 無 ghost slot；提示鈕 → `_showB5HardModeHintModal` | 提示鈕 → `_b5P2ShowChangeHintModal`（彈窗）|

---

## 六、自訂商品功能（2026-04-04 新增）

- 設定頁「難度」下方有「自訂商品」切換列（普通/困難可見，`#b5-custom-items-toggle-row`）
- 啟用後關卡頁顯示 `b5-custom-items-panel`（`_renderCustomItemsPanel`）
- `_getTotal()` 中包含 `customTotal`（`g.customItems` 中未刪除的商品價格總和）
- 搜尋 `customItemsEnabled`、`b5-custom-items-panel`、`b5-cip-add-btn`

---

## 七、隨機主題（random）

- 設定頁選「隨機🎲」時，每關從 birthday/halloween/picnic 隨機挑一個主題
- 挑選邏輯在 `_pickScenarios`：對每關各別隨機選擇主題
- `scenario._themeKey` 記錄本關主題，渲染時讀取
- 結果頁顯示：`{ icon: '🎲', name: '隨機派對' }`
- 搜尋 `partyTheme.*random`、`_themeKey`、`randomBag`（如存在）

---

## 八、金錢圖示規格

- 付款托盤：紙鈔（≥100元）`height:80px;width:auto`、硬幣 `width:60px;height:60px`
- Ghost slot：同上尺寸，`opacity:0.3`（fade-in 結尾 0.35）
- 隨機正反面：`g.p2TrayFaces`（每關一次性生成）
- 找零面額選擇邏輯：
  - 找零 ≤ 100 → [50, 10, 5, 1]
  - 找零 < 1000 → [500, 100, 50, 10, 5, 1]
  - 找零 ≥ 1000 → [1000, 500, 100, 50, 10, 5, 1]

---

## 九、派對主題進入畫面圖示（`images/b5/`）

> 進入測驗時歡迎畫面第1頁顯示的主題場景圖，PNG 格式

| 主題 key | 中文名稱 | 檔名 | 對應路徑 |
|---------|---------|------|---------|
| birthday | 生日派對 | `001.png` | `images/b5/001.png` |
| halloween | 萬聖節派對 | `002.png` | `images/b5/002.png` |
| picnic | 春日野餐 | `003.png` | `images/b5/003.png` |

---

## 十、商品圖示英文檔名（`images/b5/`，待製作）

> 路徑：`images/b5/`；格式建議 PNG 透明背景，尺寸 128×128；Emoji 作為備用

### 生日派對（birthday）

| id | 中文名稱 | 建議英文檔名 | Emoji 備用 |
|----|---------|-------------|-----------|
| cake | 生日蛋糕 | icon-b5-birthday-cake.png | 🎂 |
| drink | 果汁飲料 | icon-b5-juice-drink.png | 🧃 |
| balloon | 彩色氣球 | icon-b5-balloon.png | 🎈 |
| gift | 小禮物 | icon-b5-gift.png | 🎁 |
| plate | 派對紙盤 | icon-b5-party-plate.png | 🍽️ |
| candle | 生日蠟燭 | icon-b5-birthday-candle.png | 🕯️ |
| ribbon | 彩帶裝飾 | icon-b5-ribbon.png | 🎊 |
| hat | 派對帽 | icon-b5-party-hat.png | 🎉 |
| candy | 糖果禮包 | icon-b5-candy-bag.png | 🍬 |
| photo | 拍立得底片 | icon-b5-instant-film.png | 📸 |
| popper | 噴彩拉炮 | icon-b5-party-popper.png | 🎆 |
| banner | 生日橫幅 | icon-b5-birthday-banner.png | 🏷️ |
| cup | 派對杯組 | icon-b5-party-cup.png | 🥤 |
| napkin | 主題餐巾紙 | icon-b5-party-napkin.png | 🧻 |
| speaker | 藍牙喇叭 | icon-b5-bluetooth-speaker.png | 🔊 |
| game | 桌遊卡片 | icon-b5-board-game-card.png | 🃏 |
| lights | 彩色串燈 | icon-b5-string-lights.png | 💡 |
| sticker | 主題貼紙 | icon-b5-theme-sticker.png | 🌟 |
| tablecloth | 派對桌巾 | icon-b5-party-tablecloth.png | 🎪 |
| wand | 魔法棒 | icon-b5-magic-wand.png | 🪄 |

### 萬聖節派對（halloween）

| id | 中文名稱 | 建議英文檔名 | Emoji 備用 |
|----|---------|-------------|-----------|
| pumpkin | 南瓜燈 | icon-b5-hw-pumpkin.png | 🎃 |
| costume | 萬聖節服裝 | icon-b5-hw-costume.png | 👻 |
| candy_bag | 糖果袋 | icon-b5-hw-candy-bag.png | 🍬 |
| witch_hat | 巫師帽 | icon-b5-hw-witch-hat.png | 🧙 |
| spider | 蜘蛛網裝飾 | icon-b5-hw-spider-web.png | 🕸️ |
| skull | 骷髏擺件 | icon-b5-hw-skull.png | 💀 |
| glow | 螢光棒 | icon-b5-hw-glow-stick.png | 🌟 |
| ghost | 鬼臉面具 | icon-b5-hw-ghost-mask.png | 😱 |
| treat | 糖果包裝袋 | icon-b5-hw-treat-bag.png | 🛍️ |
| fangs | 吸血鬼牙齒 | icon-b5-hw-vampire-fangs.png | 🦷 |
| hw_bat | 蝙蝠裝飾 | icon-b5-hw-bat.png | 🦇 |
| hw_mask | 恐怖面具 | icon-b5-hw-horror-mask.png | 😈 |
| hw_chocolate | 萬聖節巧克力 | icon-b5-hw-chocolate.png | 🍫 |
| hw_cookie | 鬼臉餅乾 | icon-b5-hw-ghost-cookie.png | 🍪 |
| hw_popcorn | 鬼怪爆米花 | icon-b5-hw-ghost-popcorn.png | 🍿 |

### 春日野餐（picnic）

| id | 中文名稱 | 建議英文檔名 | Emoji 備用 |
|----|---------|-------------|-----------|
| sandwich | 三明治 | icon-b5-pc-sandwich.png | 🥪 |
| blanket | 野餐墊 | icon-b5-pc-picnic-blanket.png | 🧺 |
| fruit | 水果盒 | icon-b5-pc-fruit-box.png | 🍓 |
| juice | 果汁飲料 | icon-b5-pc-juice.png | 🧃 |
| cookies | 餅乾點心 | icon-b5-pc-cookies.png | 🍪 |
| sunhat | 遮陽帽 | icon-b5-pc-sun-hat.png | 👒 |
| frisbee | 飛盤 | icon-b5-pc-frisbee.png | 🥏 |
| bubble | 泡泡水 | icon-b5-pc-bubble-wand.png | 🫧 |
| balloon | 彩色汽球 | icon-b5-pc-balloon.png | 🎈 |
| kite | 風箏 | icon-b5-pc-kite.png | 🪁 |
| pc_onigiri | 飯糰 | icon-b5-pc-onigiri.png | 🍙 |
| pc_flowers | 野花束 | icon-b5-pc-wildflowers.png | 🌺 |
| pc_umbrella | 遮陽傘 | icon-b5-pc-beach-umbrella.png | ⛱️ |
| pc_badminton | 羽毛球組 | icon-b5-pc-badminton.png | 🏸 |
| pc_rope | 跳繩 | icon-b5-pc-jump-rope.png | 🪢 |
