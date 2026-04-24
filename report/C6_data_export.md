# C6 找零 — 資料匯出

> 資料來源：`js/c6_making_change.js`
> 匯出日期：2026-04-23

---

## 一、單元基本資訊

| 欄位 | 內容 |
|------|------|
| 標題 | 單元C6：找零 |
| 副標題 | 購買商品後計算並選出正確找零金額 |
| 主物件 | `Game`（全域變數） |
| Debug 前綴 | `[C6-*]` |
| JS 行數 | 10,471 行 |

---

## 二、商品分類（`items`）

C6 物品資料庫依價格層級分組，共 5 個層級：

### toys（玩具，100~500元層級）

| 名稱 | Emoji | 圖片 |
|------|-------|------|
| 玩具車 | 🚗 | `icon-c6-toy-car` |
| 玩具熊 | 🧸 | `icon-c6-teddy-bear` |
| 積木 | 🧱 | `icon-c6-blocks` |
| 球 | ⚽ | `icon-c6-ball` |
| 機器人 | 🤖 | `icon-c6-robot` |

### food（食物，100~500元層級）

| 名稱 | Emoji | 圖片 |
|------|-------|------|
| 漢堡 | 🍔 | `icon-c6-hamburger` |
| 披薩 | 🍕 | `icon-c6-pizza` |
| 蛋糕 | 🍰 | `icon-c6-cake` |
| 飲料 | 🥤 | `icon-c6-drink` |
| 薯條 | 🍟 | `icon-c6-fries` |

### stationery（文具，100元層級）

| 名稱 | Emoji | 圖片 |
|------|-------|------|
| 鉛筆 | ✏️ | `icon-c6-pencil` |
| 筆記本 | 📓 | `icon-c6-notebook` |
| 橡皮擦 | 🧹 | `icon-c6-eraser` |
| 尺 | 📏 | `icon-c6-ruler` |
| 剪刀 | ✂️ | `icon-c6-scissors` |

### cheap（低價層，10元層級，3~9元）

| 名稱 | Emoji | 圖片 |
|------|-------|------|
| 棒棒糖 | 🍭 | `icon-c6-lollipop` |
| 動物貼紙 | 🐱 | `icon-c6-animal-sticker` |
| 星星貼紙 | ⭐ | `icon-c6-star-sticker` |
| 愛心貼紙 | 💖 | `icon-c6-heart-sticker` |
| 橡皮擦 | 🧹 | `icon-c6-eraser` |

### budget（中低價層，50元層級，15~45元）

| 名稱 | Emoji | 圖片 |
|------|-------|------|
| 餅乾 | 🍪 | `icon-c6-cookie` |
| 洋芋片 | 🥔 | `icon-c6-chips` |
| 原子筆 | ✏️ | `icon-c6-ballpoint-pen` |
| 口香糖 | 🍬 | `icon-c6-gum` |
| 蘇打餅 | 🫓 | `icon-c6-crackers` |

### medium（中價層，100元層級，30~90元）

| 名稱 | Emoji | 圖片 |
|------|-------|------|
| 漢堡 | 🍔 | `icon-c6-hamburger` |
| 彩色筆 | 🎨 | `icon-c6-colored-pen` |
| 筆記本 | 📔 | `icon-c6-notebook` |
| 巧克力 | 🍫 | `icon-c6-chocolate` |
| 蘋果 | 🍎 | `icon-c6-apple` |

### pricey（高價層，500元層級，150~450元）

> 搜尋：`pricey`（`c6_making_change.js` line 369）

---

## 三、找零金額生成邏輯

| 難度 | 錢包金額 | 找零範圍 | 選項數 |
|------|---------|---------|--------|
| easy | 對應最小整鈔 | 1~9元 (cheap) / 少量 | 3 選 1 |
| normal | 整鈔（10/50/100/500元）| 依商品定 | 3 選 1 |
| hard | 大面額 | 跨面額找零 | 3 選 1 |

---

## 四、測驗模式（`settings.mode`）

| 值 | 說明 |
|----|------|
| `single` | 單次測試（每題獨立）|
| `repeated` | 反復測試（同商品可重複）|

> 反復測試錯誤語音精簡（2026-04-07）：`mode === 'single'` 保留雙語音，反復模式只播「不對喔，請再試一次」。

---

## 五、找零選項系統

- 每題產生 3 個選項（正確找零 + 2 個干擾選項）
- 干擾選項策略：±1元、±5元、×2、÷2 等變化
- `selectC6ChangeOption()` 處理選項點擊

> 搜尋：`selectC6ChangeOption`、`b6ChangeDir`（C6 找零方向語音 pattern）

---

## 六、進題語音與過渡（2026-03-17 修復）

- `nextQuestionScheduled` 旗標防止重複進題
- `transitionText`：過渡語音（「進入第X題」）
- 「測驗結束」過渡語音

> 搜尋：`nextQuestionScheduled`、`transitionText`、`進入第`、`測驗結束`

---

## 七、圖片路徑規格

- 圖片目錄：`images/c6/`（54 張 PNG，無背景）
- 命名：`icon-c6-[商品英文名].png`
- 注意：`icon-c6-star-sticker.png` 有拼字異常（購物功能不受影響）
