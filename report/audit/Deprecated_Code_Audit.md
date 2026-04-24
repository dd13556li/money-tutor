# 廢棄程式碼稽核報告

> 稽核日期：2026-03-02
> 原則：僅記錄，不刪除（per user instruction）

## 稽核範圍

全部 18 個單元 JS 檔案（A1~A6、C1~C6、F1~F6）

---

## 重要發現（需後續處理）

| 嚴重性 | 單元 | 問題 | 搜尋關鍵字 |
|--------|------|------|-----------|
| ~~嚴重（執行期 Bug）~~ **已修復** | C3 | `this.completeExchange()` 兩處呼叫已改為 `MoneyExchange3.ModeStrategies.handleCompletion()`；lines 7327–7343 redundant 程式碼移除 | `completeExchange`, `handleCompletion` |
| ~~**高（記憶體洩漏）**~~ **已修復** | A5 | `bindClickModeHandler()` 改用具名參考 `this._clickModeHandler`；新增 `unbindClickModeHandler()`；`showFinalResults()` 呼叫解除 | `unbindClickModeHandler`, `_clickModeHandler` |
| 中 | A4 | `handleCorrectChangeSelection_OLD()` 和 `handleIncorrectChangeSelection_OLD()` 約 90 行，從未被呼叫；標記為「暫時保留以防需要回滾」 | `_OLD`, `handleCorrectChangeSelection_OLD` |
| 中 | A5 | 約 8 處裸 `console.log` 版面高度偵測程式碼（框線字元格式）遊離於 Debug 系統外 | `╔═╗`, `ATM 高度偵測` |
| 中 | C5/C6 | `generateSufficientMoney()` 和 `generateInsufficientMoney()` 廢棄 stub（各 2 個），以 `Game.Debug.warn()` 警告 | `generateSufficientMoney`, `已廢棄` |
| **中（Debug category 錯誤）** | C6 | 上述兩個 stub 使用 `Game.Debug.warn('state', ...)`，應為 `'question'`（C5 同名 stub 正確使用 `'question'`）；導致 `FLAGS.question` 無法顯示這兩個廢棄警告 | `generateSufficientMoney`, `'state'` |
| 中 | F5 | `renderObjectsOld()` 約 52 行備用函數，從未被呼叫；標記「舊版本 - 保留作為備用」 | `renderObjectsOld` |

---

## 低優先度（不影響功能）

- **C1/C2/C3/C4**：`hideCustomQuestionInput()` 空 stub 函數（各有 1 個呼叫點但函數本體為空）；相鄰 `// alert(...)` 已注解的提示行 → 搜尋 `hideCustomQuestionInput`
- **A1**：廢棄 `customQuestionCount` 相關標記（仍功能正常）
- **A2**：`generateCustomWallet()` 向後相容 fallback（刻意保留）
- **A3**：`findExactPayment()` 向後相容 wrapper；1 個 TODO 注解（`顯示自訂金額輸入框`）
- **A6**：1 個 TODO 注解（`可以添加錢包高亮提示`）
- **C4**：`generateAllQuestions()` 內含 1 處 `await new Promise(resolve => setTimeout(resolve, 1))` 原生 setTimeout，為合法 cooperative multitasking 讓步，非計時器用途，不需轉為 TimerManager
- **F1**：6 處 `alert()` 自訂圖片上傳驗證；3 處 `await new Promise(resolve => setTimeout(resolve, N))` async 動畫延遲（同 C4 模式，刻意保留）
- **F2**：6 處 `alert()` 自訂圖片上傳驗證
- **F3**：8 處 `alert()` 輸入範圍驗證 + 自訂圖片上傳驗證
- **F4**：`sleep()` 輔助函數（`const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))`）及 7–8 處 `alert()` 設定驗證對話框（非遊戲流程，刻意保留）
- **F5**：3 處 `await new Promise(resolve => setTimeout(resolve, ms))` 動畫/語音延遲（同 C4 模式）；5 處 `alert()` 設定驗證
- **F6**：1 處 `await new Promise(resolve => setTimeout(resolve, 100))` 語音取消延遲（同 C4 模式）；6–7 處 `alert()` 自訂物件上傳驗證
- **C3**：誤導性注解（`loadNextQuestion函數已移除`，實際仍存在）
- **F1–F4、F6**：向後相容 Debug shim，均刻意保留
- **F5**：已注解的 AudioContext 監控程式碼（14 行，已有說明）
- **C1/C2/C4**：操作性清理注解（正常重構標記）
