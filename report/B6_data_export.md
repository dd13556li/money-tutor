# B6 菜市場買菜 — 商品資料匯出

> 資料來源：`js/b6_market_shopping.js`（B6_STALLS / B6_MISSIONS / B6_MARKETS）
> 匯出日期：2026-04-19

---

## 一、B6_STALLS — 傳統市場攤位（3 攤 × 12 商品）

### 蔬菜攤 vegetable 🥦

| id | 名稱 | 單位 | 單價 | 圖示 |
|----|------|------|------|------|
| cabbage | 高麗菜 | 顆 | 30 | 🥬 |
| tomato | 番茄 | 斤 | 45 | 🍅 |
| scallion | 青蔥 | 把 | 20 | 🌿 |
| sweetpot | 地瓜 | 斤 | 35 | 🍠 |
| spinach | 菠菜 | 把 | 25 | 🥗 |
| carrot | 紅蘿蔔 | 斤 | 40 | 🥕 |
| corn | 玉米 | 根 | 15 | 🌽 |
| cucumber | 小黃瓜 | 條 | 20 | 🥒 |
| broccoli | 花椰菜 | 顆 | 45 | 🥦 |
| pumpkin | 南瓜 | 顆 | 55 | 🎃 |
| daikon | 白蘿蔔 | 條 | 30 | 🥬 |
| pakchoi | 青江菜 | 把 | 15 | 🌱 |

### 水果攤 fruit 🍎

| id | 名稱 | 單位 | 單價 | 圖示 |
|----|------|------|------|------|
| apple | 蘋果 | 斤 | 50 | 🍎 |
| banana | 香蕉 | 把 | 25 | 🍌 |
| grape | 葡萄 | 串 | 80 | 🍇 |
| orange | 柳橙 | 斤 | 40 | 🍊 |
| melon | 哈密瓜 | 顆 | 120 | 🍈 |
| mango | 芒果 | 斤 | 60 | 🥭 |
| watermelon | 西瓜 | 片 | 80 | 🍉 |
| pineapple | 鳳梨 | 顆 | 70 | 🍍 |
| strawberry | 草莓 | 盒 | 100 | 🍓 |
| peach | 桃子 | 顆 | 55 | 🍑 |
| papaya | 木瓜 | 顆 | 45 | 🧡 |
| guava | 芭樂 | 顆 | 35 | 🍏 |

### 雜貨攤 grocery 🛒

| id | 名稱 | 單位 | 單價 | 圖示 |
|----|------|------|------|------|
| egg | 雞蛋 | 盒 | 65 | 🥚 |
| tofu | 豆腐 | 塊 | 25 | 🫙 |
| soy | 醬油 | 瓶 | 45 | 🍶 |
| rice | 白米 | 包 | 90 | 🌾 |
| noodle | 麵條 | 包 | 35 | 🍜 |
| salt | 食鹽 | 包 | 20 | 🧂 |
| sugar | 砂糖 | 包 | 30 | 🍬 |
| miso | 味噌 | 包 | 40 | 🟡 |
| oil | 沙拉油 | 瓶 | 75 | 🫙 |
| canned | 罐頭 | 罐 | 35 | 🥫 |
| soap | 洗碗精 | 瓶 | 45 | 🧴 |
| tissue | 衛生紙 | 包 | 50 | 🧻 |

---

## 二、B6_MISSIONS — 傳統市場任務（依難度，共 24 組）

> 格式：`budget`（預算上限）、`stalls`（各攤位 {stall, count}）
> 商品為在指定攤位**自由選取** count 樣（非指定具體商品）

### 簡單（easy，8 組）

| # | 預算 | 攤位需求 |
|---|------|----------|
| 1 | 80 | 蔬菜攤×1, 雜貨攤×1 |
| 2 | 100 | 水果攤×1, 蔬菜攤×1 |
| 3 | 60 | 蔬菜攤×2 |
| 4 | 80 | 雜貨攤×1, 水果攤×1 |
| 5 | 100 | 水果攤×1, 雜貨攤×1 |
| 6 | 70 | 蔬菜攤×1, 水果攤×1 |
| 7 | 80 | 雜貨攤×2 |
| 8 | 100 | 蔬菜攤×1, 水果攤×1, 雜貨攤×1 |

### 普通（normal，8 組）

| # | 預算 | 攤位需求 |
|---|------|----------|
| 1 | 120 | 蔬菜攤×2, 雜貨攤×1 |
| 2 | 150 | 水果攤×1, 雜貨攤×2 |
| 3 | 130 | 蔬菜攤×2, 水果攤×1 |
| 4 | 180 | 水果攤×2, 雜貨攤×1 |
| 5 | 140 | 蔬菜攤×1, 水果攤×1, 雜貨攤×1 |
| 6 | 110 | 蔬菜攤×3 |
| 7 | 160 | 水果攤×1, 蔬菜攤×2, 雜貨攤×1 |
| 8 | 170 | 雜貨攤×2, 水果攤×1 |

### 困難（hard，8 組）

| # | 預算 | 攤位需求 |
|---|------|----------|
| 1 | 200 | 蔬菜攤×2, 水果攤×1, 雜貨攤×2 |
| 2 | 180 | 蔬菜攤×3, 雜貨攤×2 |
| 3 | 220 | 水果攤×2, 蔬菜攤×2, 雜貨攤×1 |
| 4 | 250 | 雜貨攤×3, 水果攤×2 |
| 5 | 200 | 蔬菜攤×3, 水果攤×1, 雜貨攤×1 |
| 6 | 230 | 水果攤×2, 雜貨攤×2, 蔬菜攤×1 |
| 7 | 260 | 蔬菜攤×2, 水果攤×2, 雜貨攤×2 |
| 8 | 200 | 蔬菜攤×4, 雜貨攤×2 |

---

## 三、B6_MARKETS — 市場類型（共 3 種）

### traditional — 傳統市場 🏪
- 使用 `B6_STALLS`（蔬菜攤/水果攤/雜貨攤）
- 使用 `B6_MISSIONS`（見上方）

### supermarket — 超市購物 🛒（3 區 × 12 商品）

#### 烘焙區 bakery 🥖

| id | 名稱 | 單位 | 單價 |
|----|------|------|------|
| bread | 麵包 | 個 | 30 |
| croissant | 可頌 | 個 | 45 |
| toast | 吐司 | 條 | 35 |
| muffin | 馬芬 | 個 | 25 |
| bun | 小餐包 | 包 | 20 |
| cake_slice | 蛋糕 | 片 | 60 |
| bagel | 貝果 | 個 | 40 |
| waffle | 鬆餅 | 片 | 50 |
| donut | 甜甜圈 | 個 | 30 |
| cookie | 餅乾 | 包 | 45 |
| brownie | 布朗尼 | 塊 | 35 |
| eclair | 閃電泡芙 | 個 | 55 |

#### 乳品區 dairy 🥛

| id | 名稱 | 單位 | 單價 |
|----|------|------|------|
| milk | 牛奶 | 瓶 | 50 |
| yogurt | 優格 | 杯 | 40 |
| cheese | 起司 | 片 | 80 |
| butter | 奶油 | 盒 | 65 |
| cream | 鮮奶油 | 瓶 | 45 |
| sm_egg | 雞蛋 | 盒 | 55 |
| soy_milk | 豆漿 | 瓶 | 35 |
| oat_milk | 燕麥奶 | 瓶 | 60 |
| pudding | 布丁 | 個 | 25 |
| ice_coffee | 咖啡凍 | 杯 | 30 |
| milk_tea_b | 奶茶 | 瓶 | 45 |
| custard | 卡士達 | 個 | 55 |

#### 冷凍區 frozen 🧊

| id | 名稱 | 單位 | 單價 |
|----|------|------|------|
| dumpling | 水餃 | 包 | 75 |
| sausage | 香腸 | 包 | 60 |
| ice_cream | 冰淇淋 | 支 | 45 |
| nugget | 雞塊 | 包 | 80 |
| fish_ball | 魚丸 | 包 | 50 |
| edamame | 毛豆 | 包 | 35 |
| wonton | 餛飩 | 包 | 65 |
| shrimp | 蝦仁 | 包 | 90 |
| pizza | 披薩 | 片 | 55 |
| corn_dog | 熱狗 | 條 | 40 |
| pork_bun | 刈包 | 個 | 50 |
| spring_roll | 春捲 | 條 | 35 |

**超市任務預算範圍**：easy 80–100、normal 130–200、hard 220–300

### nightmarket — 夜市美食 🏮（3 攤 × 12–14 商品）

#### 小吃攤 snack 🍜

| id | 名稱 | 單位 | 單價 |
|----|------|------|------|
| oysternoodle | 蚵仔麵線 | 碗 | 50 |
| beefnoodle | 牛肉麵 | 碗 | 80 |
| pancake | 蔥抓餅 | 份 | 35 |
| popcorn_chk | 鹹酥雞 | 份 | 60 |
| stinky_tofu | 臭豆腐 | 份 | 45 |
| takoyaki | 章魚燒 | 份 | 50 |
| chicken_chop | 雞排 | 份 | 65 |
| oyster_omelet | 蚵仔煎 | 份 | 60 |
| sweet_potato_ball | 地瓜球 | 份 | 30 |
| fishball_soup | 魚丸湯 | 碗 | 40 |
| scallion_egg | 蔥油餅 | 份 | 35 |
| pork_pepper | 胡椒餅 | 個 | 45 |

#### 飲料攤 drink 🧋

| id | 名稱 | 單位 | 單價 |
|----|------|------|------|
| bubble_tea | 珍珠奶茶 | 杯 | 55 |
| lemon_tea | 檸檬茶 | 杯 | 40 |
| sugarcane | 甘蔗汁 | 杯 | 30 |
| milk_tea | 奶茶 | 杯 | 45 |
| smoothie | 果汁 | 杯 | 50 |
| soymilk | 豆花 | 碗 | 35 |
| papaya_milk | 木瓜牛奶 | 杯 | 50 |
| iced_tea | 紅茶 | 杯 | 30 |
| taro_milk | 芋頭牛奶 | 杯 | 55 |
| winter_melon | 冬瓜茶 | 杯 | 25 |
| mango_ice | 芒果冰 | 杯 | 60 |
| plum_juice | 梅子汁 | 杯 | 30 |

#### 紀念品攤 souvenir 🎁

| id | 名稱 | 單位 | 單價 |
|----|------|------|------|
| phone_case | 手機殼 | 個 | 80 |
| keychain | 鑰匙圈 | 個 | 45 |
| hairpin | 髮夾 | 個 | 30 |
| bookmark | 書籤 | 個 | 20 |
| magnet | 冰箱磁鐵 | 個 | 35 |
| wristband | 手環 | 個 | 60 |
| postcard | 明信片 | 張 | 25 |
| sticker | 貼紙組 | 包 | 20 |
| charm | 吊飾 | 個 | 55 |
| plush | 可愛布偶 | 個 | 90 |
| badge_pin | 徽章 | 個 | 30 |
| fan | 摺扇 | 把 | 50 |
| lanyard | 掛繩 | 條 | 40 |
| tote_bag | 帆布袋 | 個 | 75 |

**夜市任務預算範圍**：easy 70–120、normal 140–200、hard 220–300

---

## 四、B6_BILLS — 付款面額

| 面額 | 標籤 | 顏色 |
|------|------|------|
| 1000 | 千元 | #7c3aed（紫）|
| 500 | 五百 | #b45309（棕）|
| 100 | 百元 | #1d4ed8（藍）|
| 50 | 五十 | #0369a1（深藍）|
| 10 | 十元 | #047857（綠）|
| 5 | 五元 | #b91c1c（紅）|
| 1 | 一元 | #374151（灰）|

---

## 五、難度與流程對應（2026-04-17 重設計後）

| 難度 | Phase 1（購物）| Phase 2（付款）| 找零 |
|------|---------------|---------------|------|
| easy | 簡單模式：`_b6P1ActivateHintMode`（一次高亮1個商品），不可選非提示商品；選完自動高亮結帳按鈕 | Ghost slot 顯示，拖入自動確認 | Ghost slot，填完自動確認 |
| normal | 3次超購錯誤自動提示（`_b6P1ShowHint`）；提示按鈕手動觸發 | 金額足夠播提示語音；3次付款錯誤 → 提示彈窗 | 普通3次錯誤 → ghost slot；提示鈕 → ghost slot |
| hard | 提示鈕 → `_b6P1ShowHardHintModal`（購物建議清單彈窗）| 無 ghost slot；提示鈕 → 彈窗 | 保留錢包內容；提示鈕 → `_b6P2ShowChangeHintModal`（彈窗）|

---

## 六、攤位導航（2026-04-14 重設計）

- 移除 `b6-stall-tabs`，改用 `b6-stall-nav`（◀/▶ 按鈕 + 攤位名稱 + 圓點指示器）
- 各攤位完成時更新 `.b6-snav-dot`（標記完成狀態）
- AssistClick 偵測 `b6-stall-prev`/`b6-stall-next`
- 搜尋 `b6-stall-nav`、`b6-snav-btn`、`b6-snav-dot`、`_switchStall`

---

## 七、自訂購物項目功能（2026-04-04 新增）

- 設定頁「難度」下方有「自訂購物項目」切換列（普通/困難可見，`#b6-custom-items-toggle-row`）
- 啟用後購物頁顯示 `b6-custom-items-panel`（`_renderCustomItemsPanel`）
- `_calcMissionTotal()` 中包含 `customTotal`（`g.customItems` 中未刪除的商品價格總和）
- 搜尋 `customItemsEnabled`、`b6-custom-items-panel`、`b6-cip-add-btn`

---

## 八、隨機市場（random）

- 設定頁選「隨機」時，每關從 traditional/supermarket/nightmarket 隨機挑一個市場
- `mission._mktKey` 記錄本關市場，`_currentStalls` 動態切換
- 結果頁顯示：`{ icon: '🎲', name: '隨機市場' }`
- 搜尋 `_mktKey`、`_currentStalls`、`B6_MARKETS\[rKey\]`

---

## 九、金錢圖示規格

- 付款托盤：紙鈔（≥100元）`height:auto`（固定高度由 CSS 控制）、硬幣 `52px`
- Ghost slot：opacity 0.3
- 隨機正反面：`g.p2TrayFaces`（每關一次性生成）
- 找零面額選擇邏輯：
  - 找零 ≤ 100 → [50, 10, 5, 1]
  - 找零 < 1000 → [500, 100, 50, 10, 5, 1]
  - 找零 ≥ 1000 → [1000, 500, 100, 50, 10, 5, 1]
