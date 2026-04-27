# B5 生日派對預算 — 商品資料匯出

> 資料來源：`js/b5_party_budget.js`（B5_ALL_ITEMS / B5_ROUND_CONFIG / B5_THEMES）
> 匯出日期：2026-04-27（重大更新：商品擴充至各主題30種，B5_SCENARIOS 已廢棄改用動態生成）

---

## 一、B5_ALL_ITEMS（生日派對主題商品，共 30 種）

> 重組為 3 類 × 10 種，舊版 20 種已移除 `photo`、`speaker`、`game`，新增 13 種

### 食物飲料（10 種）

| id | 名稱 | 圖示 | 基準單價 | 價格範圍 | imageUrl |
|----|------|------|----------|----------|---------|
| cake | 生日蛋糕 | 🎂 | 380 | [350,500] | icon-b5-birthday-cake.png |
| drink | 果汁飲料 | 🧃 | 120 | [80,150] | icon-b5-juice-drink.png |
| candy | 糖果禮包 | 🍬 | 90 | [65,120] | icon-b5-candy-bag.png |
| plate | 派對紙盤 | 🍽️ | 45 | [30,60] | icon-b5-party-plate.png |
| cup | 派對杯組 | 🥤 | 55 | [40,80] | icon-b5-party-cup.png |
| napkin | 主題餐巾紙 | 🧻 | 35 | [25,50] | icon-b5-party-napkin.png |
| bd_cookie | 造型餅乾 | 🍪 | 55 | [35,75] | icon-b5-bd-cookie.png |
| bd_choco | 巧克力 | 🍫 | 65 | [45,90] | icon-b5-bd-chocolate.png |
| bd_lollipop | 棒棒糖 | 🍭 | 35 | [20,50] | icon-b5-bd-lollipop.png |
| bd_fruit | 水果拼盤 | 🍓 | 130 | [90,170] | icon-b5-bd-fruit-plate.png |

### 裝飾道具（10 種）

| id | 名稱 | 圖示 | 基準單價 | 價格範圍 | imageUrl |
|----|------|------|----------|----------|---------|
| balloon | 彩色氣球 | 🎈 | 50 | [30,65] | icon-b5-balloon.png |
| candle | 生日蠟燭 | 🕯️ | 30 | [20,45] | icon-b5-birthday-candle.png |
| ribbon | 彩帶裝飾 | 🎊 | 65 | [45,85] | icon-b5-ribbon.png |
| hat | 派對帽 | 🎉 | 80 | [50,100] | icon-b5-party-hat.png |
| banner | 生日橫幅 | 🏷️ | 70 | [50,95] | icon-b5-birthday-banner.png |
| lights | 彩色串燈 | 💡 | 90 | [75,130] | icon-b5-string-lights.png |
| sticker | 主題貼紙 | 🌟 | 40 | [25,55] | icon-b5-theme-sticker.png |
| tablecloth | 派對桌巾 | 🎪 | 75 | [50,95] | icon-b5-party-tablecloth.png |
| bd_flag | 派對旗子 | 🎏 | 55 | [35,75] | icon-b5-bd-party-flag.png |
| bd_confetti | 彩色紙花 | 🎉 | 30 | [20,45] | icon-b5-bd-confetti.png |

### 遊戲活動（10 種）

| id | 名稱 | 圖示 | 基準單價 | 價格範圍 | imageUrl |
|----|------|------|----------|----------|---------|
| popper | 彩帶拉炮 | 🎆 | 55 | [35,75] | icon-b5-party-popper.png |
| gift | 小禮物 | 🎁 | 200 | [150,300] | icon-b5-gift.png |
| wand | 魔法棒 | 🪄 | 45 | [30,65] | icon-b5-magic-wand.png |
| dice | 遊戲骰子 | 🎲 | 85 | [60,120] | icon-b5-game-dice.png |
| funglasses | 造型眼鏡 | 🕶️ | 40 | [25,55] | icon-b5-fun-glasses.png |
| bdcake | 生日蛋糕 | 🎂 | 350 | [280,420] | icon-b5-birthday-cake.png |
| squishy | 造型捏捏樂 | 🎊 | 60 | [40,80] | icon-b5-squishy-toy.png |
| bubbleguns | 泡泡槍 | 🫧 | 75 | [50,100] | icon-b5-bd-bubble-gun.png |
| playingcards | 撲克牌 | 🃏 | 90 | [65,120] | icon-b5-playing-cards.png |
| bd_ball | 玩具球 | ⚽ | 60 | [40,85] | icon-b5-bd-ball.png |

---

## 二、B5_ITEM_CATEGORIES（類別 → 分組 meta）

| 類別 key | 名稱 | 圖示 |
|---------|------|------|
| food | 食物飲料 | 🍱 |
| decor | 裝飾道具 | 🎊 |
| activity | 遊戲活動 | 🎯 |

各主題商品類別對照（生日派對為例）：
- food：cake, drink, candy, plate, cup, napkin, bd_cookie, bd_choco, bd_lollipop, bd_fruit
- decor：balloon, candle, ribbon, hat, banner, lights, sticker, tablecloth, bd_flag, bd_confetti
- activity：popper, gift, wand, dice, funglasses, bdcake, squishy, bubbleguns, playingcards, bd_ball

---

## 三、B5_ROUND_CONFIG（動態關卡配置，取代舊版 B5_SCENARIOS）

> `_B5_SCENARIOS_DEPRECATED` 仍保留在 JS 中供回溯，但已不使用。
> 每關由 `_generateRound(diff, themeKey)` 動態生成：隨機抽 count 件商品 + 隨機化各商品價格。

| 難度 | countRange | 預算計算 |
|------|-----------|---------|
| easy | [2, 3] | 大於目標總和的最小標準鈔票面額（100/500/1000/2000），確保找零 > 0 |
| normal | [3, 4] | 同上 |
| hard | [4, 6] | 同上 |

---

## 四、B5_THEMES（派對主題，共 3 種）

### birthday — 生日派對 🎂
- 使用 `B5_ALL_ITEMS`（30 種，見第一節）

### halloween — 萬聖節派對 🎃（共 30 種，3 類 × 10）

#### 食物飲料（10 種）

| id | 名稱 | 圖示 | 基準單價 | 價格範圍 | imageUrl |
|----|------|------|----------|----------|---------|
| pumpkin | 南瓜燈 | 🎃 | 150 | [120,200] | icon-b5-hw-pumpkin.png |
| candy_bag | 糖果袋 | 🍬 | 80 | [60,110] | icon-b5-hw-candy-bag.png |
| treat | 萬聖節糖果 | 🛍️ | 40 | [25,55] | icon-b5-hw-treat-bag.png |
| hw_chocolate | 萬聖節巧克力 | 🍫 | 35 | [25,50] | icon-b5-hw-chocolate.png |
| hw_cookie | 鬼臉餅乾 | 🍪 | 30 | [20,45] | icon-b5-hw-ghost-cookie.png |
| hw_popcorn | 鬼怪爆米花 | 🍿 | 40 | [25,55] | icon-b5-hw-ghost-popcorn.png |
| hw_cake | 南瓜蛋糕 | 🎃 | 280 | [220,360] | icon-b5-hw-cake.png |
| hw_drink | 魔女飲料 | 🧃 | 50 | [35,70] | icon-b5-hw-drink.png |
| hw_jelly | 眼球果凍 | 🍮 | 40 | [25,55] | icon-b5-hw-jelly.png |
| hw_bread | 骷髏麵包 | 🍞 | 65 | [45,90] | icon-b5-hw-bread.png |
| hw_marshmallow | 鬼臉棉花糖 | ☁️ | 35 | [20,50] | icon-b5-hw-marshmallow.png |

> ⚠️ 注意：食物類實際為 11 種（pumpkin 在 JS 中歸 decor，但 food 類共 10 種：candy_bag, treat, hw_chocolate, hw_cookie, hw_popcorn, hw_cake, hw_drink, hw_jelly, hw_bread, hw_marshmallow）

#### 裝飾道具（10 種）

| id | 名稱 | 圖示 | 基準單價 | 價格範圍 | imageUrl |
|----|------|------|----------|----------|---------|
| pumpkin | 南瓜燈 | 🎃 | 150 | [120,200] | icon-b5-hw-pumpkin.png |
| witch_hat | 巫師帽 | 🧙 | 60 | [45,85] | icon-b5-hw-witch-hat.png |
| spider | 蜘蛛網裝飾 | 🕸️ | 45 | [30,65] | icon-b5-hw-spider-web.png |
| skull | 骷髏擺件 | 💀 | 70 | [50,95] | icon-b5-hw-skull.png |
| hw_bat | 蝙蝠裝飾 | 🦇 | 40 | [25,55] | icon-b5-hw-bat.png |
| hw_gravestone | 墓碑擺件 | 🪦 | 80 | [55,110] | icon-b5-hw-gravestone.png |
| hw_ghost_deco | 幽靈吊飾 | 👻 | 45 | [30,65] | icon-b5-hw-ghost-deco.png |
| hw_cauldron | 巫師鍋裝飾 | 🪄 | 120 | [90,160] | icon-b5-hw-cauldron.png |
| hw_banner | 萬聖節橫幅 | 🏷️ | 60 | [40,85] | icon-b5-hw-banner.png |
| hw_lights | 橘色串燈 | 🔦 | 70 | [50,95] | icon-b5-hw-lights.png |

#### 遊戲活動（10 種）

| id | 名稱 | 圖示 | 基準單價 | 價格範圍 | imageUrl |
|----|------|------|----------|----------|---------|
| costume | 萬聖節服裝 | 👻 | 250 | [180,350] | icon-b5-hw-costume.png |
| glow | 螢光棒 | 🌟 | 25 | [15,40] | icon-b5-hw-glow-stick.png |
| ghost | 鬼臉面具 | 😱 | 90 | [65,120] | icon-b5-hw-ghost-mask.png |
| fangs | 吸血鬼牙齒 | 🦷 | 30 | [20,45] | icon-b5-hw-vampire-fangs.png |
| hw_mask | 恐怖面具 | 😈 | 65 | [45,90] | icon-b5-hw-horror-mask.png |
| hw_dice | 遊戲骰子 | 🎲 | 85 | [60,120] | icon-b5-hw-game-dice.png |
| hw_funglasses | 造型眼鏡 | 🕶️ | 40 | [25,55] | icon-b5-hw-fun-glasses.png |
| hw_squishy | 造型捏捏樂 | 🎊 | 60 | [40,80] | icon-b5-hw-squishy-toy.png |
| hw_bubbleguns | 泡泡槍 | 🫧 | 75 | [50,100] | icon-b5-hw-bubble-gun.png |
| hw_playingcards | 撲克牌 | 🃏 | 90 | [65,120] | icon-b5-hw-playing-cards.png |

### picnic — 春日野餐 🌸（共 29 種，食物10 / 裝飾9 / 活動10）

> 舊版有 `pc_umbrella`（遮陽傘），已在本次更新中移除。

#### 食物飲料（10 種）

| id | 名稱 | 圖示 | 基準單價 | 價格範圍 | imageUrl |
|----|------|------|----------|----------|---------|
| sandwich | 三明治 | 🥪 | 120 | [90,150] | icon-b5-pc-sandwich.png |
| fruit | 水果盒 | 🍓 | 95 | [75,130] | icon-b5-pc-fruit-box.png |
| juice | 果汁飲料 | 🧃 | 60 | [45,85] | icon-b5-pc-juice.png |
| cookies | 餅乾點心 | 🍪 | 75 | [55,100] | icon-b5-pc-cookies.png |
| pc_onigiri | 飯糰 | 🍙 | 45 | [30,60] | icon-b5-pc-onigiri.png |
| pc_cake | 野餐蛋糕 | 🎂 | 200 | [150,270] | icon-b5-pc-cake.png |
| pc_tea | 野餐茶飲 | 🍵 | 45 | [30,65] | icon-b5-pc-tea.png |
| pc_bread | 法式麵包 | 🥖 | 80 | [55,110] | icon-b5-pc-bread.png |
| pc_cheese | 起司片 | 🧀 | 75 | [50,100] | icon-b5-pc-cheese.png |
| pc_grapes | 葡萄串 | 🍇 | 65 | [45,90] | icon-b5-pc-grapes.png |

#### 裝飾道具（9 種）

| id | 名稱 | 圖示 | 基準單價 | 價格範圍 | imageUrl |
|----|------|------|----------|----------|---------|
| blanket | 野餐墊 | 🧺 | 180 | [150,250] | icon-b5-pc-picnic-blanket.png |
| sunhat | 遮陽帽 | 👒 | 150 | [120,200] | icon-b5-pc-sun-hat.png |
| pc_flowers | 野花束 | 🌺 | 55 | [40,75] | icon-b5-pc-wildflowers.png |
| pc_basket | 野餐籃 | 🧺 | 180 | [140,240] | icon-b5-pc-basket.png |
| pc_tablecloth | 野餐桌巾 | 🎪 | 90 | [65,120] | icon-b5-pc-tablecloth.png |
| pc_bell | 風鈴 | 🔔 | 75 | [50,100] | icon-b5-pc-bell.png |
| pc_straw_hat | 草帽 | 👒 | 120 | [85,160] | icon-b5-pc-straw-hat.png |
| pc_sticker | 貼紙套組 | 🌺 | 40 | [25,55] | icon-b5-pc-sticker.png |
| pc_wreath | 花環 | 💐 | 85 | [60,115] | icon-b5-pc-wreath.png |

#### 遊戲活動（10 種）

| id | 名稱 | 圖示 | 基準單價 | 價格範圍 | imageUrl |
|----|------|------|----------|----------|---------|
| frisbee | 飛盤 | 🥏 | 85 | [65,120] | icon-b5-pc-frisbee.png |
| bubble | 泡泡水 | 🫧 | 30 | [20,45] | icon-b5-pc-bubble-wand.png |
| balloon | 彩色汽球 | 🎈 | 50 | [35,65] | icon-b5-pc-balloon.png |
| kite | 風箏 | 🪁 | 160 | [130,220] | icon-b5-pc-kite.png |
| pc_badminton | 羽毛球組 | 🏸 | 75 | [55,100] | icon-b5-pc-badminton.png |
| pc_rope | 跳繩 | 🪢 | 50 | [35,70] | icon-b5-pc-jump-rope.png |
| pc_dice | 遊戲骰子 | 🎲 | 85 | [60,120] | icon-b5-pc-game-dice.png |
| pc_funglasses | 造型眼鏡 | 🕶️ | 40 | [25,55] | icon-b5-pc-fun-glasses.png |
| pc_ball | 球 | ⚽ | 55 | [35,80] | icon-b5-pc-ball.png |
| pc_dart | 魔鬼氈飛鏢靶 | 🎯 | 95 | [65,130] | icon-b5-pc-dart-board.png |
| pc_playingcards | 撲克牌 | 🃏 | 90 | [65,120] | icon-b5-pc-playing-cards.png |

> ⚠️ 注意：活動類實際 11 種（共 29 種，因裝飾只有 9 種）

---

## 五、難度與流程對應（2026-04-18 重設計後）

| 難度 | Phase 1（購物）| Phase 2（付款）| 找零 |
|------|---------------|---------------|------|
| easy | 簡單模式：`_b5P1ActivateHintMode`（一次高亮1個商品），不可選非提示商品；選完自動高亮確認按鈕 | 顯示 ghost slots，拖入自動確認 | Ghost slot 提示（貪婪解），填完自動確認 |
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
- `startGame()` 中每關各別隨機選擇 themeKey
- `round.themeKey` 記錄本關主題，渲染時讀取
- 結果頁顯示：`{ icon: '🎲', name: '隨機派對' }`
- 搜尋 `partyTheme.*random`、`themeKey`

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

## 十、UI 元件重構記錄（2026-04-27）

| 元件 | 舊版 | 新版 |
|------|------|------|
| 目標清單 | `.b5-tc-item`（列表行） | `.b5-tc-card`（卡片，含 img 128×128）|
| 商品選取彈窗 | `.b5-item-flyout`（膠囊上飄） | `.b5-item-flyout`（白底彈窗，256×256 圖，附 `.b5-flyout-blocker`）|
| Phase 2 參考卡 | `.b5p2-formula-row`（算式串） | `.b5p2-ref-items-grid` + `.b5p2-ref-total-bar` |
| 結果頁商品列 | `<table class="b5-items-table">` | `.b5-review-items-grid` + `.b5-review-total-bar` |
| 關卡介紹彈窗 | 顯示「第 N 關」 | 移除關卡號顯示 |
| 關卡轉場卡 | 顯示「第 N 關」+ 語音「第N關」 | 移除，改語音「準備好了嗎」 |
| 語音（關卡介紹）| `第${N}關，採購清單：...` | `今天要買的商品` |

---

## 十一、商品圖示英文檔名（`images/b5/`）

> 路徑：`images/b5/`；格式 PNG 透明背景，尺寸 128×128；Emoji 作為備用

### 生日派對（birthday）— 全部 ✅

| id | 中文名稱 | 英文檔名 | 狀態 |
|----|---------|---------|------|
| cake | 生日蛋糕 | icon-b5-birthday-cake.png | ✅ |
| drink | 果汁飲料 | icon-b5-juice-drink.png | ✅ |
| candy | 糖果禮包 | icon-b5-candy-bag.png | ✅ |
| plate | 派對紙盤 | icon-b5-party-plate.png | ✅ |
| cup | 派對杯組 | icon-b5-party-cup.png | ✅ |
| napkin | 主題餐巾紙 | icon-b5-party-napkin.png | ✅ |
| bd_cookie | 造型餅乾 | icon-b5-bd-cookie.png | ✅ |
| bd_choco | 巧克力 | icon-b5-bd-chocolate.png | ✅ |
| bd_lollipop | 棒棒糖 | icon-b5-bd-lollipop.png | ✅ |
| bd_fruit | 水果拼盤 | icon-b5-bd-fruit-plate.png | ✅ |
| balloon | 彩色氣球 | icon-b5-balloon.png | ✅ |
| candle | 生日蠟燭 | icon-b5-birthday-candle.png | ✅ |
| ribbon | 彩帶裝飾 | icon-b5-ribbon.png | ✅ |
| hat | 派對帽 | icon-b5-party-hat.png | ✅ |
| banner | 生日橫幅 | icon-b5-birthday-banner.png | ✅ |
| lights | 彩色串燈 | icon-b5-string-lights.png | ✅ |
| sticker | 主題貼紙 | icon-b5-theme-sticker.png | ✅ |
| tablecloth | 派對桌巾 | icon-b5-party-tablecloth.png | ✅ |
| bd_flag | 派對旗子 | icon-b5-bd-party-flag.png | ✅ |
| bd_confetti | 彩色紙花 | icon-b5-bd-confetti.png | ✅ |
| popper | 彩帶拉炮 | icon-b5-party-popper.png | ✅ |
| gift | 小禮物 | icon-b5-gift.png | ✅ |
| wand | 魔法棒 | icon-b5-magic-wand.png | ✅ |
| dice | 遊戲骰子 | icon-b5-game-dice.png | ✅ |
| funglasses | 造型眼鏡 | icon-b5-fun-glasses.png | ✅ |
| bdcake | 生日蛋糕（活動）| icon-b5-birthday-cake.png | ✅（共用）|
| squishy | 造型捏捏樂 | icon-b5-squishy-toy.png | ✅ |
| bubbleguns | 泡泡槍 | icon-b5-bd-bubble-gun.png | ✅ |
| playingcards | 撲克牌 | icon-b5-playing-cards.png | ✅ |
| bd_ball | 玩具球 | icon-b5-bd-ball.png | ✅ |

### 萬聖節派對（halloween）— 部分 ⚠️

| id | 中文名稱 | 英文檔名 | 狀態 |
|----|---------|---------|------|
| pumpkin | 南瓜燈 | icon-b5-hw-pumpkin.png | ✅ |
| candy_bag | 糖果袋 | icon-b5-hw-candy-bag.png | ✅ |
| treat | 萬聖節糖果 | icon-b5-hw-treat-bag.png | ✅ |
| hw_chocolate | 萬聖節巧克力 | icon-b5-hw-chocolate.png | ✅ |
| hw_cookie | 鬼臉餅乾 | icon-b5-hw-ghost-cookie.png | ✅ |
| hw_popcorn | 鬼怪爆米花 | icon-b5-hw-ghost-popcorn.png | ✅ |
| hw_cake | 南瓜蛋糕 | icon-b5-hw-cake.png | ✅ |
| hw_drink | 魔女飲料 | icon-b5-hw-drink.png | ✅ |
| hw_jelly | 眼球果凍 | icon-b5-hw-jelly.png | ✅ |
| hw_bread | 骷髏麵包 | icon-b5-hw-bread.png | ✅ |
| hw_marshmallow | 鬼臉棉花糖 | icon-b5-hw-marshmallow.png | ✅ |
| witch_hat | 巫師帽 | icon-b5-hw-witch-hat.png | ✅ |
| spider | 蜘蛛網裝飾 | icon-b5-hw-spider-web.png | ⚠️ 缺少 |
| skull | 骷髏擺件 | icon-b5-hw-skull.png | ✅ |
| hw_bat | 蝙蝠裝飾 | icon-b5-hw-bat.png | ✅ |
| hw_gravestone | 墓碑擺件 | icon-b5-hw-gravestone.png | ✅ |
| hw_ghost_deco | 幽靈吊飾 | icon-b5-hw-ghost-deco.png | ✅ |
| hw_cauldron | 巫師鍋裝飾 | icon-b5-hw-cauldron.png | ✅ |
| hw_banner | 萬聖節橫幅 | icon-b5-hw-banner.png | ✅ |
| hw_lights | 橘色串燈 | icon-b5-hw-lights.png | ✅ |
| costume | 萬聖節服裝 | icon-b5-hw-costume.png | ✅ |
| glow | 螢光棒 | icon-b5-hw-glow-stick.png | ⚠️ 缺少 |
| ghost | 鬼臉面具 | icon-b5-hw-ghost-mask.png | ✅ |
| fangs | 吸血鬼牙齒 | icon-b5-hw-vampire-fangs.png | ✅ |
| hw_mask | 恐怖面具 | icon-b5-hw-horror-mask.png | ✅ |
| hw_dice | 遊戲骰子 | icon-b5-hw-game-dice.png | ✅ |
| hw_funglasses | 造型眼鏡 | icon-b5-hw-fun-glasses.png | ✅ |
| hw_squishy | 造型捏捏樂 | icon-b5-hw-squishy-toy.png | ✅ |
| hw_bubbleguns | 泡泡槍 | icon-b5-hw-bubble-gun.png | ✅ |
| hw_playingcards | 撲克牌 | icon-b5-hw-playing-cards.png | ✅ |

### 春日野餐（picnic）— 全部 ✅

| id | 中文名稱 | 英文檔名 | 狀態 |
|----|---------|---------|------|
| sandwich | 三明治 | icon-b5-pc-sandwich.png | ✅ |
| fruit | 水果盒 | icon-b5-pc-fruit-box.png | ✅ |
| juice | 果汁飲料 | icon-b5-pc-juice.png | ✅ |
| cookies | 餅乾點心 | icon-b5-pc-cookies.png | ✅ |
| pc_onigiri | 飯糰 | icon-b5-pc-onigiri.png | ✅ |
| pc_cake | 野餐蛋糕 | icon-b5-pc-cake.png | ✅ |
| pc_tea | 野餐茶飲 | icon-b5-pc-tea.png | ✅ |
| pc_bread | 法式麵包 | icon-b5-pc-bread.png | ✅ |
| pc_cheese | 起司片 | icon-b5-pc-cheese.png | ✅ |
| pc_grapes | 葡萄串 | icon-b5-pc-grapes.png | ✅ |
| blanket | 野餐墊 | icon-b5-pc-picnic-blanket.png | ✅ |
| sunhat | 遮陽帽 | icon-b5-pc-sun-hat.png | ✅ |
| pc_flowers | 野花束 | icon-b5-pc-wildflowers.png | ✅ |
| pc_basket | 野餐籃 | icon-b5-pc-basket.png | ✅ |
| pc_tablecloth | 野餐桌巾 | icon-b5-pc-tablecloth.png | ✅ |
| pc_bell | 風鈴 | icon-b5-pc-bell.png | ✅ |
| pc_straw_hat | 草帽 | icon-b5-pc-straw-hat.png | ✅ |
| pc_sticker | 貼紙套組 | icon-b5-pc-sticker.png | ✅ |
| pc_wreath | 花環 | icon-b5-pc-wreath.png | ✅ |
| frisbee | 飛盤 | icon-b5-pc-frisbee.png | ✅ |
| bubble | 泡泡水 | icon-b5-pc-bubble-wand.png | ✅ |
| balloon | 彩色汽球 | icon-b5-pc-balloon.png | ✅ |
| kite | 風箏 | icon-b5-pc-kite.png | ✅ |
| pc_badminton | 羽毛球組 | icon-b5-pc-badminton.png | ✅ |
| pc_rope | 跳繩 | icon-b5-pc-jump-rope.png | ✅ |
| pc_dice | 遊戲骰子 | icon-b5-pc-game-dice.png | ✅ |
| pc_funglasses | 造型眼鏡 | icon-b5-pc-fun-glasses.png | ✅ |
| pc_ball | 球 | icon-b5-pc-ball.png | ✅ |
| pc_dart | 魔鬼氈飛鏢靶 | icon-b5-pc-dart-board.png | ✅ |
| pc_playingcards | 撲克牌 | icon-b5-pc-playing-cards.png | ✅ |

---

## 十二、缺少的圖片（待製作）

- `icon-b5-hw-spider-web.png`（spider 蜘蛛網裝飾）
- `icon-b5-hw-glow-stick.png`（glow 螢光棒）
