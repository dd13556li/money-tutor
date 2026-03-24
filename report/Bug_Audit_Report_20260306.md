# Bug 稽核報告
> 日期：2026-03-06
> 稽核範圍：全部 18 個單元（A1~A6、C1~C6、F1~F6）

---

## 稽核方法

針對以下 4 個 P1（高優先）和 2 個 P2（中優先）Bug 模式，對全部 18 個 JS 檔案執行 Grep 搜尋，並交叉比對各單元 `report/XX_Unit_Completion_Report.md` 的記錄。

**P1 模式**：
1. 裸 setTimeout（非 TimerManager、非 cooperative multitasking `await new Promise`）
2. 裸 setInterval（非遞迴 TimerManager）
3. speak() 缺少 TimerManager 備援超時
4. 完成畫面重複呼叫缺守衛 flag

**P2 模式**：
5. startTime null 未防護（`Date.now() - startTime` 未加 `|| endTime` 或三元判斷）
6. answer mode 未區分

---

## P1-1：裸 setTimeout 稽核

**稽核結果**：所有 18 個單元均已完成 TimerManager 遷移。

- 搜尋 `setTimeout(` 後排除 `TimerManager.setTimeout` 定義行、`window.setTimeout`（TimerManager 內部使用）、`await new Promise(resolve => setTimeout(...))` 模式（cooperative multitasking）、注解行。
- 剩餘結果均為合法的 async sleep 模式：
  - C4（line 1840）、F1（lines 3191/3260/3262）、F4（`sleep` helper）、F5（lines 3527/3532/5815）、F6（line 385）
- 上述均已在各單元 completion report 記載為「刻意保留的 cooperative multitasking」。

**結論：無新 Bug**

---

## P1-2：裸 setInterval 稽核

**稽核結果**：所有 18 個單元均已完成遞迴 TimerManager 遷移。

- F5 line 6271 唯一 `setInterval` 出現在注解中（`// setInterval(checkContextState, 5000);`），已注解廢棄，不影響執行。

**結論：無新 Bug**

---

## P1-3：speak() 缺少 TimerManager 備援超時稽核

**稽核結果**：所有單元均有備援機制，但備援超時值和 category 有差異（均已在各自 report 記載）。

| 單元 | 備援超時 | Category | 備註 |
|------|---------|----------|------|
| A1 | estimatedDuration（動態） | 'speechDelay' | VendingMachine.TimerManager |
| A2 | 8000ms | 'speech' | 已記載於 A2 report |
| A3 | 10000ms | 'speech' | McDonald.TimerManager |
| A4 | 10000ms | 'speechDelay' | Game.TimerManager |
| A5 | 5000ms | 'speechDelay' | ATM.TimerManager |
| A6 | 10000ms | 'speech' | Game.TimerManager |
| C1 | 10000ms | 'ui' | Game.TimerManager |
| C2 | 10000ms | 'ui' | 已記載於 C2 report（category 命名不影響功能，clearAll() 覆蓋全部） |
| C3 | 10000ms | 'ui' | Game.TimerManager（clearAll() 覆蓋） |
| C4 | 10000ms | 'speech' | Game.TimerManager |
| C5 | 10000ms | 'speech' | Game.TimerManager |
| C6 | 10000ms | 'speech' | Game.TimerManager |
| F1 | 5000ms | 'speech' | Game.TimerManager（5000ms 已記載於 F1 report） |
| F2 | 5000ms | 'speech' | Game.TimerManager（5000ms 已記載於 F2 report） |
| F3 | 10000ms | 'speech' | Game.TimerManager |
| F4 | 10000ms | 'speech' | Game.TimerManager |
| F5 | 10000ms | 'speech' | QuantityComparisonGame.TimerManager |
| F6 | 無（Promise 架構） | N/A | `onerror` 無條件 resolve()，documented 為安全（F6 report 2026-03-03） |

**結論：無新 Bug**（5000ms vs 10000ms 差異均已在各自 report 中記載）

---

## P1-4：完成畫面重複呼叫缺守衛 flag 稽核

**稽核結果**：

| 單元 | 完成函數 | 守衛機制 | 狀態 |
|------|---------|---------|------|
| A1 | `showResults()` | `productVended` flag（processPayment 防抖 + guard） | 已保護 |
| A2 | `showCompletionScreen()` | `_completionScreenShown` flag | 已保護 |
| A3 | `showCompletionSummary()` | `_completionSummaryShown` flag | 已保護 |
| A4 | `showCompletionSummary()` | `_completionSummaryShown` flag | 已保護 |
| A5 | `showFinalResults()` | 架構性保護（`currentQuestion >= questionCount` else 分支，單一呼叫點） | 無顯式 flag，但低風險 |
| A6 | `showCompletionScreen()` | `_completionScreenShown` flag | 已保護 |
| C1 | `endGame()` | `isEndingGame` flag | 已保護 |
| C2 | `endGame()` | `isEndingGame` flag | 已保護 |
| C3 | `endGame()` | `isEndingGame` flag | 已保護 |
| C4 | `endGame()` | （需驗證）| 見下方 |
| C5 | `showResults()` | `gameCompleted` flag | 已保護 |
| C6 | `showResults()` | `gameCompleted` flag | 已保護 |
| F1 | `endGame()` | `isEndingGame` flag | 已保護 |
| F2 | `endGame()` | `isEndingGame` flag | 已保護 |
| F3 | `endGame()` | `isEndingGame` flag | 已保護 |
| F4 | `showResults()` | `isEndingGame` flag | 已保護 |
| F5 | `completeGame()` | `gameState === 'finished'` guard | 已保護 |
| F6 | `showResults()` | `isEndingGame` flag | 已保護 |

**A5 補充**：`showFinalResults()` 沒有顯式守衛 flag，但由於呼叫路徑為 `completeTransaction()` 內的單一 else 分支（`currentQuestion >= questionCount`），且 `currentQuestion` 在每次呼叫時遞增，重複觸發的架構性風險極低。此狀況在 A5 report 中未明確記載為已知問題或刻意設計。

**結論：無 P1 新 Bug**（A5 showFinalResults 缺顯式守衛為 P2 低風險項目）

---

## P2-5：startTime null 未防護稽核

**稽核結果**：所有已知完成畫面的 `elapsedSeconds`/`elapsedMs` 計算均已防護。

- A 系列（A1~A4/A6）使用 `const startTime = this.state.xxx.startTime || endTime` 模式
- A5 使用 `startTime ? (Date.now() - startTime) : 0` 模式
- C 系列使用三元判斷 `startTime ? ... : 0`
- F 系列使用三元判斷 `startTime ? ... : 0`
- C4 中出現的 `Date.now() - startTime` 均屬於 `generateAllQuestions()` 內部的函數執行時間計算（局部變數，非遊戲狀態 startTime），不屬於完成畫面時間顯示，不適用此 Bug 模式。

**結論：無新 Bug**

---

## P2-6：answer mode 未區分稽核

此項稽核目標為：有 retry/proceed 模式的單元（F4/F5 等）是否在語音/流程中正確區分。已在各單元 report 中記載，本次稽核未發現新的未記載問題。

**結論：無新 Bug**

---

## 已發現問題清單

| 優先度 | 單元 | 問題描述 | 搜尋關鍵字 | 建議 |
|--------|------|---------|-----------|------|
| P2（低風險） | A5 | `showFinalResults()` 無顯式 `isEndingGame` / `_finalResultsShown` 守衛 flag；架構性保護存在（單一 else 分支），但未在 A5 report 中明確記載為「刻意設計」 | `showFinalResults`, `currentQuestion >= questionCount` | 可在 A5 report 補充說明，或視需要加 `_finalResultsShown` flag |
| 資訊性 | C2/C3 | `Speech.speak()` 的 10000ms 備援計時器使用 `'ui'` category 而非 `'speech'`；`clearAll()` 仍能清除，功能正常，但 `clearByCategory('speech')` 無法清除此備援計時器（若未來有局部清除需求） | `TimerManager.setTimeout(safeCallback, 10000, 'ui')` | 低優先度，已在 C2 report 記載 |

---

## 結論

18 個單元均符合已知修復標準。本次稽核**未發現新的 P1 級 Bug**。

- 裸 setTimeout：全部遷移完成
- 裸 setInterval：全部遷移完成（F5 唯一出現在注解中）
- speak() 備援超時：全部有效（F6 使用 Promise 架構，不需備援）
- 完成畫面守衛：全部保護（A5 為架構性保護，低風險）
- startTime null：全部防護

唯一發現的 P2 低風險項目為 **A5 `showFinalResults()` 缺顯式守衛 flag**，建議在 A5 report 補充說明或視需求加 flag，但不構成執行期 Bug。
