# B4 特賣比一比 — 商品資料匯出

> 資料來源：`js/b4_sale_comparison.js`（B4_ITEMS / B4_TRIPLE_ITEMS / B4_UNIT_ITEMS）
> 匯出日期：2026-04-20（更新：加入圖片引用欄位）

---

## 一、B4_ITEMS（兩商店比價，共 40 組）

> optA 永遠比 optB 貴；顯示時隨機左右交換（swapped 旗標）
> 圖片欄標示來源：**C6** = `images/c6/`、**A4** = `images/a4/`；「—」表示無對應圖片，仍用 emoji

| # | 類別 | 商品 | 圖示 | 圖片引用 | optA 商店 | optA 價格 | optB 商店 | optB 價格 | 差額 |
|---|------|------|------|----------|-----------|-----------|-----------|-----------|------|
| 1  | stationery | 鉛筆盒        | ✏️  | —                                      | 文具店🏪  | 85  | 超市🛒    | 65  | 20  |
| 2  | food       | 蘋果（1斤）   | 🍎  | **C6** icon-c6-apple                   | 超市🛒    | 45  | 菜市場🥬  | 35  | 10  |
| 3  | stationery | 原子筆        | 🖊️ | **C6** icon-c6-ballpoint-pen           | 書局📚    | 15  | 大賣場🏬  | 12  | 3   |
| 4  | food       | 礦泉水        | 💧  | —                                      | 超商🏪    | 20  | 量販店🏬  | 13  | 7   |
| 5  | daily      | 洗髮精        | 🧴  | **A4** icon-a4-shampoo-shop            | 藥妝店💊  | 189 | 量販店🏬  | 149 | 40  |
| 6  | food       | 巧克力        | 🍫  | **C6** icon-c6-chocolate               | 超商🏪    | 55  | 超市🛒    | 42  | 13  |
| 7  | daily      | 毛巾          | 🧣  | —                                      | 百貨公司🏢    | 250 | 市場🥬    | 180 | 70  |
| 8  | stationery | 故事書        | 📖  | **C6** icon-c6-story-book              | 書店📚    | 280 | 二手店♻️  | 150 | 130 |
| 9  | food       | 牛奶（1公升） | 🥛  | **A4** icon-a4-milk-shop               | 超商🏪    | 65  | 超市🛒    | 55  | 10  |
| 10 | daily      | 面紙（一包）  | 🧻  | **A4** icon-a4-box-of-tissues-shop     | 超商🏪    | 39  | 量販店🏬  | 25  | 14  |
| 11 | clothing   | 雨傘          | ☂️  | —                                      | 百貨公司🏢    | 480 | 夜市🌙    | 150 | 330 |
| 12 | food       | 餅乾（一盒）  | 🍪  | **C6** icon-c6-cookie                  | 超商🏪    | 45  | 超市🛒    | 35  | 10  |
| 13 | daily      | 牙刷          | 🪥  | —                                      | 藥局💊    | 39  | 量販店🏬  | 29  | 10  |
| 14 | stationery | 色鉛筆        | 🖍️ | **C6** icon-c6-colored-pen             | 文具店🏪  | 120 | 大賣場🏬  | 89  | 31  |
| 15 | food       | 果汁（1瓶）   | 🧃  | **A4** icon-a4-juice-shop              | 超商🏪    | 35  | 超市🛒    | 25  | 10  |
| 16 | daily      | 電池（4顆）   | 🔋  | **A4** icon-a4-battery-shop            | 超商🏪    | 85  | 量販店🏬  | 59  | 26  |
| 17 | daily      | 洗碗精        | 🧼  | **A4** icon-a4-dish-soap-shop          | 超市🛒    | 59  | 量販店🏬  | 45  | 14  |
| 18 | clothing   | 運動鞋        | 👟  | **C6** icon-c6-basketball-shoes        | 運動用品店⚽| 1200| 大賣場🏬 | 880 | 320 |
| 19 | clothing   | 拖鞋          | 🩴  | —                                      | 百貨公司🏢    | 390 | 夜市🌙    | 120 | 270 |
| 20 | clothing   | 手套          | 🧤  | **A4** icon-a4-gloves-shop             | 百貨公司🏢    | 320 | 市場🥬    | 180 | 140 |
| 21 | daily      | 洗手乳        | 🧴  | **A4** icon-a4-body-wash-shop          | 藥局💊    | 55  | 量販店🏬  | 39  | 16  |
| 22 | food       | 奶茶          | 🧋  | **A4** icon-a4-milk-tea-shop           | 手搖店🥤  | 60  | 超商🏪    | 50  | 10  |
| 23 | daily      | 運動水壺      | 🍶  | **A4** icon-a4-water-bottle-shop       | 運動用品店⚽| 350| 大賣場🏬  | 260 | 90  |
| 24 | clothing   | 帽子          | 🧢  | **A4** icon-a4-hat-shop                | 百貨公司🏢    | 580 | 網購💻    | 420 | 160 |
| 25 | daily      | 便當盒        | 🍱  | **C6** icon-c6-bento                   | 百貨公司🏢    | 285 | 量販店🏬  | 199 | 86  |
| 26 | stationery | 筆記本（3本） | 📓  | **C6** icon-c6-notebook                | 書局📚    | 95  | 量販店🏬  | 69  | 26  |
| 27 | food       | 口香糖        | 🍬  | **C6** icon-c6-gum                     | 超商🏪    | 35  | 超市🛒    | 25  | 10  |
| 28 | daily      | 浴巾          | 🛁  | —                                      | 百貨公司🏢    | 480 | 量販店🏬  | 320 | 160 |
| 29 | food       | 醬油（一瓶）  | 🫙  | —                                      | 超商🏪    | 89  | 量販店🏬  | 65  | 24  |
| 30 | daily      | 洗衣精        | 🧺  | **A4** icon-a4-laundry-detergent-shop  | 超市🛒    | 159 | 量販店🏬  | 119 | 40  |
| 31 | stationery | 橡皮擦（2個）| 📎  | **C6** icon-c6-eraser                  | 文具店🏪  | 25  | 大賣場🏬  | 18  | 7   |
| 32 | food       | 果凍（一盒）  | 🍮  | —                                      | 超商🏪    | 55  | 量販店🏬  | 38  | 17  |
| 33 | food       | 麵包          | 🍞  | **A4** icon-a4-bread-shop              | 咖啡廳☕  | 60  | 麵包店🥐  | 45  | 15  |
| 34 | food       | 鮪魚罐頭      | 🐟  | —                                      | 超商🏪    | 45  | 量販店🏬  | 32  | 13  |
| 35 | clothing   | 雨衣          | 🌧️ | —                                      | 百貨公司🏢    | 280 | 夜市🌙    | 150 | 130 |
| 36 | stationery | 剪刀          | ✂️ | **C6** icon-c6-scissors                | 文具店🏪  | 35  | 大賣場🏬  | 25  | 10  |
| 37 | food       | 洋芋片（大包）| 🥔  | **C6** icon-c6-chips                   | 超商🏪    | 49  | 量販店🏬  | 35  | 14  |
| 38 | daily      | 眼藥水        | 💊  | —                                      | 藥局💊    | 89  | 網購💻    | 65  | 24  |
| 39 | daily      | 保溫瓶        | 🫙  | **A4** icon-a4-water-bottle-shop       | 品牌店👔  | 650 | 量販店🏬  | 480 | 170 |
| 40 | food       | 零食禮盒      | 🎁  | —                                      | 百貨公司🏢    | 380 | 量販店🏬  | 260 | 120 |

---

## 二、B4_TRIPLE_ITEMS（三商店排序，共 20 組）

> stores[0] 最貴、[1] 中間、[2] 最便宜（顯示時隨機打亂）
> 有圖片引用者同 B4_ITEMS 欄標示

| # | 類別 | 商品 | 圖片引用 | 第1名（貴）| 第2名（中）| 第3名（便宜）|
|---|------|------|----------|-----------|-----------|------------|
| 1  | stationery | 鉛筆盒        | —                                     | ✏️  百貨公司🏢 120  | 文具店🏪 85   | 大賣場🏬 65   |
| 2  | food       | 礦泉水        | —                                     | 💧  高級餐廳🍽️ 50| 超商🏪 25    | 量販店🏬 13   |
| 3  | food       | 巧克力        | **C6** icon-c6-chocolate              | 🍫  百貨公司🏢 120| 超商🏪 55   | 超市🛒 42    |
| 4  | daily      | 洗髮精        | **A4** icon-a4-shampoo-shop           | 🧴  百貨公司🏢 280  | 藥妝店💊 189  | 量販店🏬 149  |
| 5  | stationery | 故事書        | **C6** icon-c6-story-book             | 📖  書店📚 320  | 書局📚 280   | 二手店♻️ 150  |
| 6  | food       | 牛奶（1公升） | **A4** icon-a4-milk-shop              | 🥛  超商🏪 80   | 超市🛒 65    | 量販店🏬 50   |
| 7  | stationery | 色鉛筆        | **C6** icon-c6-colored-pen            | 🖍️ 百貨公司🏢 180  | 文具店🏪 120  | 大賣場🏬 89   |
| 8  | food       | 果汁（1瓶）   | **A4** icon-a4-juice-shop             | 🧃  百貨公司🏢 80| 超商🏪 35    | 超市🛒 25    |
| 9  | daily      | 電池（4顆）   | **A4** icon-a4-battery-shop           | 🔋  超商🏪 120  | 藥局💊 85    | 量販店🏬 59   |
| 10 | daily      | 毛巾          | —                                     | 🧣  百貨公司🏢 350  | 超市🛒 250   | 市場🥬 180   |
| 11 | stationery | 筆記本（3本） | **C6** icon-c6-notebook               | 📓  書局📚 150  | 文具店🏪 95   | 量販店🏬 69   |
| 12 | daily      | 洗手乳        | **A4** icon-a4-body-wash-shop         | 🧴  百貨公司🏢 120  | 藥局💊 79    | 量販店🏬 55   |
| 13 | food       | 奶茶          | **A4** icon-a4-milk-tea-shop          | 🧋  咖啡廳☕ 150 | 手搖店🥤 60   | 超商🏪 45    |
| 14 | clothing   | 運動鞋        | **C6** icon-c6-basketball-shoes       | 👟  品牌店👔 1580| 運動用品店⚽ 1200| 大賣場🏬 880  |
| 15 | daily      | 洗碗精        | **A4** icon-a4-dish-soap-shop         | 🧼  超商🏪 89   | 超市🛒 59    | 量販店🏬 45   |
| 16 | stationery | 橡皮擦（2個）| **C6** icon-c6-eraser                 | 📎  書局📚 45   | 文具店🏪 25   | 大賣場🏬 18   |
| 17 | food       | 果凍（一盒）  | —                                     | 🍮  超商🏪 75   | 超市🛒 55    | 量販店🏬 38   |
| 18 | food       | 麵包          | **A4** icon-a4-bread-shop             | 🍞  咖啡廳☕ 80  | 便利商店🏪 55  | 麵包店🥐 45   |
| 19 | clothing   | 雨衣          | —                                     | 🌧️ 百貨公司🏢 480  | 超市🛒 280   | 夜市🌙 150   |
| 20 | food       | 洋芋片（大包）| **C6** icon-c6-chips                  | 🥔  超商🏪 79   | 超市🛒 49    | 量販店🏬 35   |

---

## 三、B4_UNIT_ITEMS（單位比價，共 15 組）

> 每單位價格：price ÷ qty（取整數）
> 有圖片引用者同 B4_ITEMS 欄標示

| # | 類別 | 商品 | 圖示 | 圖片引用 | 單位 | A店 | A數量 | A總價 | A每單位 | B店 | B數量 | B總價 | B每單位 | 便宜者 |
|---|------|------|------|----------|------|-----|-------|-------|---------|-----|-------|-------|---------|--------|
| 1  | food       | 糖果       | 🍬 | —                                    | 個 | 超商🏪    | 8  | 56  | 7元 | 超市🛒    | 10 | 50  | 5元 | B |
| 2  | stationery | 鉛筆       | ✏️ | **C6** icon-c6-pencil               | 支 | 文具店🏪  | 5  | 40  | 8元 | 大賣場🏬  | 6  | 36  | 6元 | B |
| 3  | food       | 雞蛋       | 🥚 | **A4** icon-a4-egg-shop             | 顆 | 超商🏪    | 6  | 60  | 10元| 超市🛒    | 10 | 80  | 8元 | B |
| 4  | food       | 香蕉       | 🍌 | **C6** icon-c6-banana               | 根 | 超市🛒    | 3  | 30  | 10元| 菜市場🥬  | 4  | 32  | 8元 | B |
| 5  | food       | 水餃       | 🥟 | —                                    | 個 | 冷凍食品🏪| 10 | 80  | 8元 | 大賣場🏬  | 12 | 84  | 7元 | B |
| 6  | food       | 吐司       | 🍞 | **A4** icon-a4-toast-shop           | 片 | 超商🏪    | 4  | 60  | 15元| 麵包店🥐  | 6  | 72  | 12元| B |
| 7  | food       | 小番茄     | 🍅 | —                                    | 顆 | 超商🏪    | 5  | 35  | 7元 | 菜市場🥬  | 8  | 40  | 5元 | B |
| 8  | food       | 優格       | 🫙 | —                                    | 瓶 | 超商🏪    | 2  | 50  | 25元| 超市🛒    | 4  | 88  | 22元| B |
| 9  | food       | 巧克力棒   | 🍫 | **C6** icon-c6-chocolate            | 支 | 超商🏪    | 3  | 75  | 25元| 超市🛒    | 5  | 110 | 22元| B |
| 10 | daily      | 洗衣錠     | 🧼 | **A4** icon-a4-laundry-detergent-shop| 顆 | 藥局💊    | 10 | 120 | 12元| 量販店🏬  | 15 | 150 | 10元| B |
| 11 | food       | 果凍       | 🍮 | —                                    | 個 | 超商🏪    | 3  | 45  | 15元| 量販店🏬  | 6  | 72  | 12元| B |
| 12 | daily      | 抹布       | 🧹 | —                                    | 條 | 超市🛒    | 2  | 30  | 15元| 量販店🏬  | 4  | 48  | 12元| B |
| 13 | food       | 棒棒糖     | 🍭 | **C6** icon-c6-lollipop             | 支 | 超商🏪    | 4  | 48  | 12元| 量販店🏬  | 6  | 60  | 10元| B |
| 14 | food       | 麵條       | 🍜 | —                                    | 包 | 超市🛒    | 3  | 90  | 30元| 量販店🏬  | 5  | 130 | 26元| B |
| 15 | stationery | 橡皮擦     | 📎 | **C6** icon-c6-eraser               | 個 | 書局📚    | 3  | 30  | 10元| 大賣場🏬  | 5  | 40  | 8元 | B |

---

## 四、難度與流程對應（2026-04-10 重構後）

| 難度 | compareStores | 第一頁流程 | 第二頁（差額）|
|------|--------------|-----------|--------------|
| easy   | two（固定） | 逐枚點幣 → 兩側完成自動比較高亮 | easy diff 版：算式卡 + 單一答案按鈕（選項顯示，非 ???）|
| normal | two / triple / unit | 逐枚點幣 → 兩側完成 → 點框開 numpad 輸入較便宜價格 → 揭露卡片 → 差額頁 | 選項初始 ???，點擊後自動揭露；3次後自動揭露正確答案 |
| hard   | two / triple / unit | 價格顯示 ???，介紹彈窗後開 numpad 輸入較便宜價格 | ??? 可點 → `_showHardDiffNumpadModal`；提示鈕→ `_showHardDiffFormulaHint` |

> 注意：normal/hard 模式 ±10%/±20% 隨機價格變動

---

## 五、自訂價格功能（2026-04-04 新增）

- 設定頁「商品類別」下方有「自訂價格」切換列（兩家店＋普通/困難，`#b4-custom-price-toggle-row`）
- 啟用後題目頁顯示 `b4-custom-price-panel`，可手動輸入左右商店價格
- `_applyCustomPrices(curr, leftPrice, rightPrice)` 更新 `curr.optA.price`/`curr.optB.price`/`curr.diff`
- 搜尋 `customItemsEnabled`、`_applyCustomPrices`、`b4-cpp-apply-btn`

---

## 六、紙鈔尺寸規格（2026-04-10 更新）

```css
/* b4PriceCoins 中的紙鈔 */
height: 48.91px; object-fit: cover;
```
搜尋 `48.91px`

---

## 七、商品圖示顯示邏輯（2026-04-20 新增）

- 各商品新增選用 `imageUrl` 欄位（引用自 A4 或 C6 圖片資料夾）
- 渲染函數 `b4IconHTML(item)`：有 `imageUrl` 時輸出 `<img>`，否則 fallback 至 emoji
- CSS `.b4-icon-img { height: 1.1em; width: auto; object-fit: contain; }` — 隨字型大小自動縮放
- 適用位置：商品主頁 hero 圖示、介紹彈窗、差額頁參考卡、省錢清單
- 搜尋 `b4IconHTML`、`imageUrl`、`b4-icon-img`
- 圖片路徑規則：
  - C6：`../images/c6/icon-c6-xxx.png`（54 個商品圖，無背景）
  - A4：`../images/a4/icon-a4-xxx-shop.png`（127 個商店商品圖）
