# F1 一對一對應 — 資料匯出
> 資料來源：`js/f1_object_correspondence.js`
> 匯出日期：2026-04-23

---

## 一、主要資料結構

### 1.1 遊戲標題與副標

| 欄位 | 內容 |
|------|------|
| `title` | `單元F1：數與物的對應` |
| `subtitle` | `將抽象的數字與具體物品進行一對一配對，建立數量概念的基礎認知` |

### 1.2 圖示主題（`gameData.themes`）

主題資料優先由 `EmojiLibrary` 提供（若未載入則使用備用陣列）。

| 主題鍵 | 說明 | 備用 Emoji 清單 |
|--------|------|-----------------|
| `default` | 隨機（水果＋動物＋交通工具合併） | 前三主題全部合併 |
| `fruits` | 水果 | `🍎🍌🍇🍓🍊🥝🍍🍉🍑🍒` |
| `animals` | 動物 | `🐶🐱🐭🐰🦊🐻🐼🐨🐯🦁` |
| `vehicles` | 交通工具 | `🚗🚕🚌🚓🚑🚒🚚🚲🚀✈️` |
| `custom` | 自訂主題（動態上傳） | `[]`（初始空陣列） |

**EmojiLibrary 對應路徑**（來源：`js/emoji-library.js`）：
- `default` = `EmojiLibrary.food.fruits` + `EmojiLibrary.animals.mammals` + `EmojiLibrary.services.transport`
- `fruits` = `EmojiLibrary.food.fruits`
- `animals` = `EmojiLibrary.animals.mammals`
- `vehicles` = `EmojiLibrary.services.transport`

### 1.3 `getItemName(icon)` — 圖示名稱對應表

函數位置：搜尋 `getItemName`

| 類別 | Emoji → 中文名稱（完整清單） |
|------|-------------------------------|
| 水果 | 🍎蘋果、🍊橘子、🍋檸檬、🍌香蕉、🍉西瓜、🍇葡萄、🍓草莓、🍑水蜜桃、🍒櫻桃、🥝奇異果、🍈哈密瓜、🍐西洋梨、🥭芒果、🍍鳳梨 |
| 動物 | 🐶小狗、🐱小貓、🐭老鼠、🐹倉鼠、🐰兔子、🦊狐狸、🐻熊、🐼貓熊、🐨無尾熊、🐯老虎、🦁獅子、🐮乳牛、🐷小豬、🐸青蛙 |
| 交通工具 | 🚗轎車、🚕計程車、🚙越野車、🚌公車、🚎電車、🚄高鐵、🚅高速列車、🚆火車、🚇地鐵、🚂蒸汽火車、✈️飛機、🚢輪船 |

---

## 二、難度配置

### 2.1 `gameData.difficultySettings`

| 難度 | `minItems` | `maxItems` | 標籤 |
|------|-----------|-----------|------|
| `easy` | 1 | 5 | 簡單 |
| `normal` | 1 | 10 | 普通 |
| `hard` | 5 | 15 | 困難 |

### 2.2 `gameData.countingRanges`

| 鍵 | `minItems` | `maxItems` | 設定頁顯示標籤 |
|----|-----------|-----------|----------------|
| `range1-5` | 1 | 5 | 1-5 |
| `range1-10` | 1 | 10 | 1-10 |
| `range15-20` | 15 | 20 | 15-20 |
| `range20-30` | 20 | 30 | 20-30 |
| `custom` | 1 | 30 | 自訂範圍 |

### 2.3 `ModeConfig` 模式定義

#### 簡單模式（`easy`）

| 屬性 | 值 |
|------|----|
| `modeType` | `one-to-one-correspondence` |
| `sourceHasDistractors` | `false`（無干擾項） |
| `targetGuides` | `true`（有放置提示框） |
| 難度說明（設定頁） | 簡單：單一物品與數量的對應，有系統示範提示。 |
| 輔助點擊 | 支援（僅簡單模式） |
| `timing.speechDelay` | 300 ms |
| `timing.nextQuestionDelay` | 2000 ms |
| `timing.placementFeedbackDelay` | 500 ms |
| `clickToMoveConfig.allowClickToPlace` | `true` |
| `clickToMoveConfig.allowClickToReturn` | `false` |

#### 普通模式（`normal`）

| 屬性 | 值 |
|------|----|
| `modeType` | `quantity-to-numeral` |
| `sourceHasDistractors` | `true`（有干擾項） |
| `targetGuides` | `false`（統一放置容器） |
| `optionsCount` | 3 |
| 難度說明（設定頁） | 普通：單一物品與數量的對應，沒有示範提示。 |
| `timing.speechDelay` | 300 ms |
| `timing.nextQuestionDelay` | 2000 ms |
| `timing.retryDelay` | 1500 ms |
| `timing.placementFeedbackDelay` | 300 ms |
| `clickToMoveConfig.allowClickToPlace` | `true` |
| `clickToMoveConfig.allowClickToReturn` | `true` |

#### 困難模式（`hard`）

| 屬性 | 值 |
|------|----|
| `modeType` | `multi-item-correspondence` |
| `sourceHasDistractors` | `true`（有干擾項） |
| `targetGuides` | `false`（統一放置區） |
| `useHintButton` | `true` |
| 難度說明（設定頁） | 困難：多種物品與數量的對應，考驗觀察力。 |
| `timing.speechDelay` | 300 ms |
| `timing.nextQuestionDelay` | 2500 ms |
| `timing.hintAnimationDuration` | 1500 ms |
| `timing.invalidDropReturnDuration` | 300 ms |
| `clickToMoveConfig.allowClickToPlace` | `false`（僅拖曳） |
| `clickToMoveConfig.allowClickToReturn` | `true` |

---

## 三、遊戲狀態（`state`）

| 欄位 | 說明 |
|------|------|
| `score` | 答題分數（每答對一題 +10） |
| `currentTurn` | 當前題號 |
| `totalTurns` | 總題數 |
| `correctAnswer` | 正確答案（物品數量） |
| `lastAnswer` | 上一題答案（避免重複） |
| `startTime` | 遊戲開始時間戳 |
| `userCountProgress` | 使用者點擊進度 |
| `isAnswering` | 防連點旗標 |
| `isEndingGame` | 防止 `endGame()` 重複觸發 |
| `customItems` | 自訂圖示陣列（`{imageData, name}`） |
| `selectedClickItem` | 點擊模式選中的物品物件 |
| `audioUnlocked` | 行動裝置音訊解鎖狀態 |
| `settings.difficulty` | 難度：`easy / normal / hard` |
| `settings.theme` | 主題：`default / fruits / animals / vehicles / custom` |
| `settings.questionCount` | 題數（1/3/5/10/自訂） |
| `settings.testMode` | 固定為 `'single'`（一對一對應不適合反複作答） |
| `settings.countingRange` | 數數範圍鍵（見 §二 countingRanges） |
| `settings.assistClick` | 輔助點擊模式（`boolean`） |

---

## 四、設定頁選項

| 設定項目 | 選項 |
|---------|------|
| 難度 | 簡單 / 普通 / 困難 |
| 輔助點擊 | 啟用 / 停用（僅簡單模式顯示） |
| 數數範圍 | 1-5 / 1-10 / 15-20 / 20-30 / 自訂範圍 |
| 主題 | 隨機 / 水果 / 動物 / 交通工具 / 自訂主題（困難模式禁用隨機與預設主題） |
| 題目數量 | 1 / 3 / 5 / 10 / 自訂 |
| 獎勵系統 | 開啟獎勵系統（連結） |
| 作業單 | 產生作業單（連結） |

**注意**：困難模式不可選主題（使用多種圖示主題，無需選擇單一主題）；困難模式也不可選自訂主題。

---

## 五、自訂主題系統

| 函數 | 說明 |
|------|------|
| `triggerImageUpload()` | 觸發 `<input type="file">` 點擊 |
| `handleImageUpload(event)` | 讀取圖片，開啟預覽彈窗 |
| `confirmAddCustomItem()` | 壓縮圖片（200px, 0.7 quality）後加入 `state.customItems` |
| `removeCustomItem(index)` | 移除自訂圖示 |
| `closeImagePreview()` | 關閉圖片預覽彈窗 |

壓縮規格：`maxWidth=200px`，`quality=0.7`，輸出 `image/jpeg` base64。
搜尋：`confirmAddCustomItem`、`image-preview-container`

---

## 六、完成畫面（`endGame()`）

| 統計項目 | 說明 |
|---------|------|
| 答對題數 | `Math.floor(score / 10)` / `totalTurns` |
| 正確率 | `Math.round(correctAnswers / totalTurns * 100)`% |
| 完成時間 | `Date.now() - state.startTime`，格式：`N 分 M 秒` 或 `M 秒` |

### 表現評價

| 正確率 | 評語 | 圖示 |
|--------|------|------|
| ≥ 90% | 表現優異！ | 🏆 |
| ≥ 70% | 表現良好！ | 👍 |
| ≥ 50% | 還需努力！ | 💪 |
| < 50% | 多加練習！ | 📚 |

### 學習成果條目
- 🎯 理解一對一對應概念
- 🔢 練習圖形與數量的配對
- 📝 建立基礎數學概念

---

## 七、音效映射

| 音效鍵 | `<audio>` ID |
|--------|-------------|
| `select` | `menu-select-sound` |
| `correct` | `correct-sound` |
| `correct02` | `correct-sound`（困難/普通模式完成） |
| `error` | `error-sound` |
| `success` | `success-sound` |

---

## 八、全局動畫（`injectGlobalAnimationStyles`）

防重複注入 id：`f1-global-animations`

主要 keyframe 清單：`bounce`、`fadeIn`、`sparkle`、`pulse`、`shake`、`celebrate`、`glow`、`pulseGlow`、`bounceIn`、`pair-success-anim`、`error-shake`、`hintPulse`、`revealBounceIn`、`numberGlow`、`revealBounceOut`、`inputPromptPulseGlow`、`popupBounceIn`、`hint-pulse`、`hint-glow`、`f1AssistBoxPulse`、`f1AssistBounce`

輔助點擊 CSS 類別：`.assist-click-hint`（黃色外框脈動 + `👇 點這裡` 提示標籤）
