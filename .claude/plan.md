# A3 完成時間顯示 0 秒問題修正計畫

## 問題分析

### 問題描述
A3 完成測驗後，測驗總結頁面顯示「完成時間：0 秒」。

### 根本原因
`startTime` 只在 `restartAllQuestions()` (第 9426 行) 和 `backToSettings()` (第 9461 行) 中設置，但 `startGame()` (第 2284 行) 沒有設置 `startTime`。

**問題流程**：
1. 用戶點擊「開始遊戲」→ 呼叫 `startGame()` → `startTime` 仍為 `null`
2. 遊戲完成 → 呼叫 `showCompletionSummary()`
3. 計算時間：`const startTime = this.state.gameState.startTime || endTime;`
4. 由於 `startTime` 是 `null`，fallback 為 `endTime`，導致 `elapsedSeconds = 0`

### 其他單元檢查結果

| 單元 | startTime 設置位置 | 狀態 |
|------|-------------------|------|
| A1 | `startGame()` 第 1361 行 | ✅ 正常 |
| A2 | `startGame()` 第 1857 行 | ✅ 正常 |
| A3 | 只在 `restartAllQuestions()` 和 `backToSettings()` | ❌ **有問題** |
| A4 | 遊戲開始時 第 2911 行 | ✅ 正常 |
| A5 | 遊戲開始時 第 3564 行 | ✅ 正常 |
| A6 | `startGame()` 第 3228 行 | ✅ 正常 |

**結論**：只有 A3 有此問題。

---

## 修改計畫

### 檔案
`js/a3_mcdonalds_order.js`

### 修改位置
`startGame()` 函數（約第 2284 行開始）

### 修改內容
在 `startGame()` 函數中，`initializeGameData()` 之前，添加 `startTime` 的設置：

```javascript
// 在第 2315 行（initializeGameData 之前）添加：
this.state.gameState.startTime = Date.now();
```

### 完整修改位置

**原始代碼（第 2311-2316 行）**：
```javascript
console.log('[A3-McDonald] 開始遊戲，難度:', this.state.settings.difficulty);
console.log('[A3-McDonald] 錢包金額:', this.state.settings.walletAmount);
console.log('[A3-McDonald] 任務類型:', this.state.settings.taskType);

// 初始化遊戲資料
this.initializeGameData();
```

**修改後代碼**：
```javascript
console.log('[A3-McDonald] 開始遊戲，難度:', this.state.settings.difficulty);
console.log('[A3-McDonald] 錢包金額:', this.state.settings.walletAmount);
console.log('[A3-McDonald] 任務類型:', this.state.settings.taskType);

// 記錄測驗開始時間
this.state.gameState.startTime = Date.now();

// 初始化遊戲資料
this.initializeGameData();
```

---

## 預期結果

修正後，A3 完成測驗時會正確顯示實際完成時間（如「32 秒」或「1 分 15 秒」）。

---

## 驗證步驟

1. 開啟 A3 麥當勞點餐單元
2. 選擇任一難度、題數，開始遊戲
3. 完成測驗流程
4. 在測驗總結頁面確認「完成時間」顯示正確的實際時間
