# Debug 除錯指令速查表

> 在瀏覽器 DevTools Console 貼上以下指令即可開啟對應單元的除錯輸出。
> `error` 分類預設已開啟，無需手動設定。
> 使用完畢後將 `true` 改為 `false` 或重新整理頁面即可關閉。

---

## A 系列

### A1 販賣機 (`VendingMachine.Debug.FLAGS`)

```javascript
// 開啟全部
VendingMachine.Debug.FLAGS.all = true;

// 分類開啟
VendingMachine.Debug.FLAGS.init    = true;  // 初始化
VendingMachine.Debug.FLAGS.state   = true;  // 狀態管理
VendingMachine.Debug.FLAGS.ui      = true;  // UI 渲染
VendingMachine.Debug.FLAGS.audio   = true;  // 音效
VendingMachine.Debug.FLAGS.speech  = true;  // 語音
VendingMachine.Debug.FLAGS.coin    = true;  // 投幣相關
VendingMachine.Debug.FLAGS.payment = true;  // 付款驗證
VendingMachine.Debug.FLAGS.product = true;  // 商品選擇
VendingMachine.Debug.FLAGS.flow    = true;  // 遊戲流程
VendingMachine.Debug.FLAGS.assist  = true;  // 輔助點擊模式
VendingMachine.Debug.FLAGS.hint    = true;  // 提示系統
VendingMachine.Debug.FLAGS.timer   = true;  // 計時器
VendingMachine.Debug.FLAGS.event   = true;  // 事件處理
```

---

### A2 理髮廳 (`BarberKiosk.Debug.FLAGS`)

```javascript
// 開啟全部
BarberKiosk.Debug.FLAGS.all = true;

// 分類開啟
BarberKiosk.Debug.FLAGS.init    = true;  // 初始化
BarberKiosk.Debug.FLAGS.state   = true;  // 狀態管理
BarberKiosk.Debug.FLAGS.ui      = true;  // UI 渲染
BarberKiosk.Debug.FLAGS.audio   = true;  // 音效
BarberKiosk.Debug.FLAGS.speech  = true;  // 語音
BarberKiosk.Debug.FLAGS.coin    = true;  // 投幣相關
BarberKiosk.Debug.FLAGS.payment = true;  // 付款驗證
BarberKiosk.Debug.FLAGS.service = true;  // 服務選擇
BarberKiosk.Debug.FLAGS.flow    = true;  // 遊戲流程
BarberKiosk.Debug.FLAGS.assist  = true;  // 輔助點擊模式
BarberKiosk.Debug.FLAGS.hint    = true;  // 提示系統
BarberKiosk.Debug.FLAGS.timer   = true;  // 計時器
BarberKiosk.Debug.FLAGS.event   = true;  // 事件處理
```

---

### A3 麥當勞 (`McDonald.Debug.FLAGS`)

```javascript
// 開啟全部
McDonald.Debug.FLAGS.all = true;

// 分類開啟
McDonald.Debug.FLAGS.init    = true;  // 初始化
McDonald.Debug.FLAGS.state   = true;  // 狀態管理
McDonald.Debug.FLAGS.ui      = true;  // UI 渲染
McDonald.Debug.FLAGS.audio   = true;  // 音效
McDonald.Debug.FLAGS.speech  = true;  // 語音
McDonald.Debug.FLAGS.coin    = true;  // 金錢相關
McDonald.Debug.FLAGS.payment = true;  // 付款驗證
McDonald.Debug.FLAGS.product = true;  // 餐點選擇
McDonald.Debug.FLAGS.flow    = true;  // 遊戲流程
McDonald.Debug.FLAGS.assist  = true;  // 輔助點擊模式
McDonald.Debug.FLAGS.hint    = true;  // 提示系統
McDonald.Debug.FLAGS.timer   = true;  // 計時器
McDonald.Debug.FLAGS.event   = true;  // 事件處理
```

---

### A4 超市購物 (`Game.Debug.FLAGS`)

```javascript
// 開啟全部
Game.Debug.FLAGS.all = true;

// 分類開啟
Game.Debug.FLAGS.init    = true;  // 初始化
Game.Debug.FLAGS.state   = true;  // 狀態管理
Game.Debug.FLAGS.ui      = true;  // UI 渲染
Game.Debug.FLAGS.audio   = true;  // 音效
Game.Debug.FLAGS.speech  = true;  // 語音
Game.Debug.FLAGS.coin    = true;  // 金錢相關
Game.Debug.FLAGS.payment = true;  // 付款驗證
Game.Debug.FLAGS.product = true;  // 商品選擇
Game.Debug.FLAGS.flow    = true;  // 遊戲流程
Game.Debug.FLAGS.assist  = true;  // 輔助點擊模式
Game.Debug.FLAGS.hint    = true;  // 提示系統
Game.Debug.FLAGS.timer   = true;  // 計時器
Game.Debug.FLAGS.event   = true;  // 事件處理
```

---

### A5 ATM (`ATM.Debug.FLAGS`)

```javascript
// 開啟全部
ATM.Debug.FLAGS.all = true;

// 分類開啟
ATM.Debug.FLAGS.init    = true;  // 初始化
ATM.Debug.FLAGS.state   = true;  // 狀態管理
ATM.Debug.FLAGS.ui      = true;  // UI 渲染
ATM.Debug.FLAGS.audio   = true;  // 音效
ATM.Debug.FLAGS.speech  = true;  // 語音
ATM.Debug.FLAGS.coin    = true;  // 錢幣操作
ATM.Debug.FLAGS.payment = true;  // 付款邏輯
ATM.Debug.FLAGS.product = true;  // 商品/服務選擇
ATM.Debug.FLAGS.flow    = true;  // 遊戲流程
ATM.Debug.FLAGS.assist  = true;  // 輔助模式
ATM.Debug.FLAGS.hint    = true;  // 提示系統
ATM.Debug.FLAGS.timer   = true;  // 計時器
ATM.Debug.FLAGS.event   = true;  // 事件監聽
```

---

### A6 火車票 (`Game.Debug.FLAGS`)

```javascript
// 開啟全部
Game.Debug.FLAGS.all = true;

// 分類開啟
Game.Debug.FLAGS.init    = true;  // 初始化
Game.Debug.FLAGS.state   = true;  // 狀態管理
Game.Debug.FLAGS.ui      = true;  // UI 渲染
Game.Debug.FLAGS.audio   = true;  // 音效
Game.Debug.FLAGS.speech  = true;  // 語音
Game.Debug.FLAGS.coin    = true;  // 錢幣操作
Game.Debug.FLAGS.payment = true;  // 付款邏輯
Game.Debug.FLAGS.product = true;  // 商品/服務選擇
Game.Debug.FLAGS.flow    = true;  // 遊戲流程
Game.Debug.FLAGS.assist  = true;  // 輔助模式
Game.Debug.FLAGS.hint    = true;  // 提示系統
Game.Debug.FLAGS.timer   = true;  // 計時器
Game.Debug.FLAGS.event   = true;  // 事件監聽
```

---

## C 系列

### C1 認識錢幣 (`Game.Debug.FLAGS`)

```javascript
// 開啟全部
Game.Debug.FLAGS.all = true;

// 分類開啟
Game.Debug.FLAGS.init     = true;  // 初始化
Game.Debug.FLAGS.speech   = true;  // 語音系統
Game.Debug.FLAGS.audio    = true;  // 音效系統
Game.Debug.FLAGS.ui       = true;  // UI 渲染
Game.Debug.FLAGS.question = true;  // 題目生成
Game.Debug.FLAGS.state    = true;  // 狀態變更
Game.Debug.FLAGS.answer   = true;  // 答案檢查
```

---

### C2 數錢 (`Game.Debug.FLAGS`)

```javascript
// 開啟全部
Game.Debug.FLAGS.all = true;

// 分類開啟
Game.Debug.FLAGS.init     = true;  // 初始化
Game.Debug.FLAGS.speech   = true;  // 語音系統
Game.Debug.FLAGS.audio    = true;  // 音效系統
Game.Debug.FLAGS.ui       = true;  // UI 渲染
Game.Debug.FLAGS.counting = true;  // 點數操作
Game.Debug.FLAGS.question = true;  // 題目生成
Game.Debug.FLAGS.state    = true;  // 狀態變更
Game.Debug.FLAGS.answer   = true;  // 答案檢查
Game.Debug.FLAGS.option   = true;  // 選項處理
```

---

### C3 換錢 (`Game.Debug.FLAGS`)

```javascript
// 開啟全部
Game.Debug.FLAGS.all = true;

// 分類開啟
Game.Debug.FLAGS.init      = true;  // 初始化
Game.Debug.FLAGS.speech    = true;  // 語音系統
Game.Debug.FLAGS.audio     = true;  // 音效系統
Game.Debug.FLAGS.ui        = true;  // UI 渲染
Game.Debug.FLAGS.exchange  = true;  // 兌換操作
Game.Debug.FLAGS.drag      = true;  // 拖曳操作
Game.Debug.FLAGS.touch     = true;  // 觸控操作
Game.Debug.FLAGS.question  = true;  // 題目生成
Game.Debug.FLAGS.state     = true;  // 狀態變更
Game.Debug.FLAGS.hint      = true;  // 提示系統
Game.Debug.FLAGS.event     = true;  // 事件處理
Game.Debug.FLAGS.judge     = true;  // 答案判定
Game.Debug.FLAGS.integrity = true;  // 完整性檢查
```

---

### C4 付款 (`Game.Debug.FLAGS`)

```javascript
// 開啟全部
Game.Debug.FLAGS.all = true;

// 分類開啟
Game.Debug.FLAGS.init     = true;  // 初始化
Game.Debug.FLAGS.speech   = true;  // 語音系統
Game.Debug.FLAGS.audio    = true;  // 音效系統
Game.Debug.FLAGS.ui       = true;  // UI 渲染
Game.Debug.FLAGS.payment  = true;  // 付款邏輯
Game.Debug.FLAGS.drag     = true;  // 拖曳操作
Game.Debug.FLAGS.touch    = true;  // 觸控操作
Game.Debug.FLAGS.question = true;  // 題目生成
Game.Debug.FLAGS.state    = true;  // 狀態管理
Game.Debug.FLAGS.wallet   = true;  // 金錢生成
Game.Debug.FLAGS.hint     = true;  // 提示功能
Game.Debug.FLAGS.event    = true;  // 事件處理
Game.Debug.FLAGS.judge    = true;  // 判斷邏輯
```

---

### C5 夠不夠 (`Game.Debug.FLAGS`)

```javascript
// 開啟全部
Game.Debug.FLAGS.all = true;

// 分類開啟
Game.Debug.FLAGS.init     = true;  // 初始化流程
Game.Debug.FLAGS.speech   = true;  // 語音系統
Game.Debug.FLAGS.audio    = true;  // 音效系統
Game.Debug.FLAGS.ui       = true;  // UI 渲染
Game.Debug.FLAGS.payment  = true;  // 付款驗證
Game.Debug.FLAGS.drag     = true;  // 拖放操作
Game.Debug.FLAGS.touch    = true;  // 觸控事件
Game.Debug.FLAGS.question = true;  // 題目生成
Game.Debug.FLAGS.state    = true;  // 狀態轉換
Game.Debug.FLAGS.wallet   = true;  // 錢包操作
Game.Debug.FLAGS.hint     = true;  // 提示系統
Game.Debug.FLAGS.event    = true;  // 事件監聽
Game.Debug.FLAGS.judge    = true;  // 判斷邏輯（夠/不夠）
```

---

### C6 找零 (`Game.Debug.FLAGS`)

```javascript
// 開啟全部
Game.Debug.FLAGS.all = true;

// 分類開啟
Game.Debug.FLAGS.init     = true;  // 初始化流程
Game.Debug.FLAGS.speech   = true;  // 語音系統
Game.Debug.FLAGS.audio    = true;  // 音效系統
Game.Debug.FLAGS.ui       = true;  // UI 渲染
Game.Debug.FLAGS.payment  = true;  // 付款驗證
Game.Debug.FLAGS.change   = true;  // 找零計算
Game.Debug.FLAGS.drag     = true;  // 拖放操作
Game.Debug.FLAGS.touch    = true;  // 觸控事件
Game.Debug.FLAGS.question = true;  // 題目生成
Game.Debug.FLAGS.state    = true;  // 狀態轉換
Game.Debug.FLAGS.wallet   = true;  // 錢包操作
Game.Debug.FLAGS.hint     = true;  // 提示系統
Game.Debug.FLAGS.event    = true;  // 事件監聽
```

---

## F 系列

### F1 一對一對應 (`Game.Debug.FLAGS`)

```javascript
// 開啟全部
Game.Debug.FLAGS.all = true;

// 分類開啟
Game.Debug.FLAGS.init     = true;  // 初始化
Game.Debug.FLAGS.speech   = true;  // 語音系統
Game.Debug.FLAGS.audio    = true;  // 音效系統
Game.Debug.FLAGS.ui       = true;  // UI 渲染
Game.Debug.FLAGS.drag     = true;  // 拖曳操作
Game.Debug.FLAGS.question = true;  // 題目生成
Game.Debug.FLAGS.state    = true;  // 狀態變更
Game.Debug.FLAGS.timer    = true;  // 計時器管理
Game.Debug.FLAGS.event    = true;  // 事件管理
Game.Debug.FLAGS.game     = true;  // 遊戲流程
Game.Debug.FLAGS.user     = true;  // 用戶行為
```

---

### F2 唱數 (`Game.Debug.FLAGS`)

```javascript
// 開啟全部
Game.Debug.FLAGS.all = true;

// 分類開啟
Game.Debug.FLAGS.init      = true;  // 初始化
Game.Debug.FLAGS.speech    = true;  // 語音系統
Game.Debug.FLAGS.audio     = true;  // 音效系統
Game.Debug.FLAGS.ui        = true;  // UI 渲染
Game.Debug.FLAGS.drag      = true;  // 拖曳操作
Game.Debug.FLAGS.touch     = true;  // 觸控事件
Game.Debug.FLAGS.question  = true;  // 題目生成
Game.Debug.FLAGS.state     = true;  // 狀態變更
Game.Debug.FLAGS.animation = true;  // 動畫效果
Game.Debug.FLAGS.upload    = true;  // 圖片上傳
Game.Debug.FLAGS.game      = true;  // 遊戲流程
Game.Debug.FLAGS.user      = true;  // 使用者行為
```

---

### F3 數字認讀 (`Game.Debug.FLAGS`)

```javascript
// 開啟全部
Game.Debug.FLAGS.all = true;

// 分類開啟
Game.Debug.FLAGS.init     = true;  // 初始化
Game.Debug.FLAGS.speech   = true;  // 語音系統
Game.Debug.FLAGS.audio    = true;  // 音效系統
Game.Debug.FLAGS.ui       = true;  // UI 渲染
Game.Debug.FLAGS.drag     = true;  // 拖曳操作
Game.Debug.FLAGS.touch    = true;  // 觸控事件
Game.Debug.FLAGS.click    = true;  // 點擊操作
Game.Debug.FLAGS.question = true;  // 題目生成
Game.Debug.FLAGS.state    = true;  // 狀態變更
Game.Debug.FLAGS.game     = true;  // 遊戲流程
Game.Debug.FLAGS.user     = true;  // 使用者行為
```

---

### F4 數字排序 (`Game.Debug.FLAGS`)

```javascript
// 開啟全部
Game.Debug.FLAGS.all = true;

// 分類開啟
Game.Debug.FLAGS.init     = true;  // 初始化
Game.Debug.FLAGS.speech   = true;  // 語音系統
Game.Debug.FLAGS.audio    = true;  // 音效系統
Game.Debug.FLAGS.ui       = true;  // UI 渲染
Game.Debug.FLAGS.drag     = true;  // 拖曳操作
Game.Debug.FLAGS.touch    = true;  // 觸控事件
Game.Debug.FLAGS.question = true;  // 題目生成
Game.Debug.FLAGS.state    = true;  // 狀態變更
Game.Debug.FLAGS.game     = true;  // 遊戲流程
Game.Debug.FLAGS.user     = true;  // 使用者行為
```

---

### F5 量比較 (`GameDebug.FLAGS`)

```javascript
// 開啟全部
GameDebug.FLAGS.all = true;

// 分類開啟
GameDebug.FLAGS.init      = true;  // 初始化
GameDebug.FLAGS.config    = true;  // 配置相關
GameDebug.FLAGS.game      = true;  // 遊戲流程
GameDebug.FLAGS.ui        = true;  // UI 操作
GameDebug.FLAGS.audio     = true;  // 音效系統
GameDebug.FLAGS.speech    = true;  // 語音系統
GameDebug.FLAGS.events    = true;  // 事件處理
GameDebug.FLAGS.scoring   = true;  // 計分系統
GameDebug.FLAGS.timer     = true;  // 計時器
GameDebug.FLAGS.question  = true;  // 題目生成
GameDebug.FLAGS.render    = true;  // 渲染相關
GameDebug.FLAGS.animation = true;  // 動畫相關
GameDebug.FLAGS.state     = true;  // 狀態變更
```

---

### F6 數的組成 (`GameDebug.FLAGS`)

```javascript
// 開啟全部
GameDebug.FLAGS.all = true;

// 分類開啟
GameDebug.FLAGS.init      = true;  // 初始化
GameDebug.FLAGS.config    = true;  // 配置
GameDebug.FLAGS.game      = true;  // 遊戲流程
GameDebug.FLAGS.ui        = true;  // UI 渲染
GameDebug.FLAGS.audio     = true;  // 音效
GameDebug.FLAGS.speech    = true;  // 語音
GameDebug.FLAGS.drag      = true;  // 拖曳
GameDebug.FLAGS.question  = true;  // 題目生成
GameDebug.FLAGS.state     = true;  // 狀態管理
GameDebug.FLAGS.animation = true;  // 動畫
```

---

## 命名空間對照

| 單元 | 命名空間 |
|------|---------|
| A1 販賣機 | `VendingMachine.Debug.FLAGS` |
| A2 理髮廳 | `BarberKiosk.Debug.FLAGS` |
| A3 麥當勞 | `McDonald.Debug.FLAGS` |
| A4 超市購物 | `Game.Debug.FLAGS` |
| A5 ATM | `ATM.Debug.FLAGS` |
| A6 火車票 | `Game.Debug.FLAGS` |
| C1~C6 | `Game.Debug.FLAGS` |
| F1~F4 | `Game.Debug.FLAGS` |
| F5 量比較 | `GameDebug.FLAGS` |
| F6 數的組成 | `GameDebug.FLAGS` |

> **注意**：A4 與 A6 同用 `Game.Debug.FLAGS`，但兩頁面各自獨立，不會互相干擾。
> C 系列與 F1~F4 亦同，各頁面 `Game` 物件獨立。
