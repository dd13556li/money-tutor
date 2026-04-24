# Bug 稽核報告
> 日期：2026-03-14
> 稽核範圍：全部 18 個單元（A1~A6、C1~C6、F1~F6）

---

## 稽核方法

針對以下模式對全部 18 個 JS 檔案執行 Grep 搜尋：

**P1（高優先）**：
1. 裸 setTimeout（非 TimerManager）
2. 裸 setInterval（非遞迴 TimerManager）
3. speak() 缺少 TimerManager 備援超時
4. 完成畫面重複呼叫缺守衛 flag

**P2（中優先）**：
5. startTime null 未防護
6. `document.addEventListener` 未去除重複綁定

---

## P1-1：裸 setTimeout 稽核

**結論：無新 Bug**

所有 18 個單元均已完成 TimerManager 遷移。唯一的 `setTimeout(` 出現在各單元 TimerManager 定義行本身（`setTimeout(callback, delay, category = 'default')`）。合法的 `await new Promise(resolve => setTimeout(resolve, ms))` cooperative multitasking 模式保留於 C4/F1/F4/F5/F6（已在各自 report 記錄）。

---

## P1-2：裸 setInterval 稽核

**結論：無新 Bug**

- 所有單元均已改用遞迴 TimerManager.setTimeout。
- `f5_quantity_comparison.js`：唯一的 `setInterval` 為注解中廢棄 AudioContext 監控程式碼（`// setInterval(checkContextState, 5000);`）。
- `html2canvas.min.js` / `html2pdf.bundle.min.js`：第三方函式庫，不計入。

---

## P1-3：speak() 備援超時稽核

**結論：無新 Bug**

所有單元語音呼叫均已實作 `callbackExecuted` 旗標 + TimerManager 備援超時（8~10s，category: `'speech'`）+ `onerror` 錯誤處理。

---

## P1-4：完成畫面守衛稽核

**結論：無新 Bug**

| 單元 | 守衛旗標 |
|------|---------|
| A2、A6 | `_completionScreenShown` |
| A3、A4 | `_completionSummaryShown` |
| C1、C2、C3、F1、F2、F3、F4、F6 | `isEndingGame` |
| C4、C5、C6 | `gameCompleted` |
| F5 | `gameState === 'finished'` |

---

## P2-5：startTime null 防護稽核

**結論：無新 Bug**

所有時間計算均使用 `startTime ? (Date.now() - startTime) : 0` 三元運算式防護。

---

## P2-6：document.addEventListener 重複綁定稽核

**發現 Bug：A2 `bindEvents()` 監聽器累積**

### 問題描述

`a2_barber_shop_kiosk.js` 的 `bindEvents()` 在每輪遊戲開始時被呼叫（共 4 個呼叫點：lines 3172、3181、3218、3270），但函數內有 5 個匿名 `document.addEventListener` 呼叫沒有防止重複綁定的機制：

```javascript
document.addEventListener('click', handleMoneyInput);           // 空函數，harmless
document.addEventListener('touchend', handleMoneyInput);        // 空函數，harmless
document.addEventListener('click', [ticket-dispenser check]);   // ⚠️ 有副作用
document.addEventListener('touchstart', [touchHandled = true]); // 效果疊加，harmless
document.addEventListener('click', [touchHandled check]);       // 效果疊加，harmless
```

**功能性 Bug**：ticket-dispenser click listener（lines 7228-7242）每次 `bindEvents()` 都會再綁定一次。使用者若在同一 session 內多輪遊戲，在簡單模式步驟1點擊票券區時，`validateEasyModeAction('ticket-area')` 被呼叫 N 次（N = 遊戲輪數），導致：
- 錯誤音效（`error02.mp3`）重複播放 N 次
- 元素 shake 動畫被 classList 操作 N 次

### 修復

在 `bindEvents()` 頂部加入 `_documentEventsBound` 旗標防護：

```javascript
bindEvents() {
    if (this._documentEventsBound) return;
    this._documentEventsBound = true;
    // ... 原有程式碼
}
```

**修改**：`js/a2_barber_shop_kiosk.js`（搜尋 `_documentEventsBound`）

**嚴重程度**：P2（中）— 功能性可見但條件需多輪遊戲 + 簡單模式 + 點擊錯誤區域

---

## 各單元最終狀態

| 單元 | 狀態 | 備註 |
|------|------|------|
| A1 | ✅ 正常 | |
| A2 | ✅ 已修復 | `_documentEventsBound` 旗標（2026-03-14）|
| A3 | ✅ 正常 | |
| A4 | ✅ 正常 | |
| A5 | ✅ 正常 | |
| A6 | ✅ 正常 | |
| C1 | ✅ 正常 | |
| C2 | ✅ 正常 | |
| C3 | ✅ 正常 | |
| C4 | ✅ 正常 | |
| C5 | ✅ 正常 | |
| C6 | ✅ 正常 | |
| F1 | ✅ 正常 | |
| F2 | ✅ 正常 | |
| F3 | ✅ 正常 | |
| F4 | ✅ 正常 | |
| F5 | ✅ 正常 | |
| F6 | ✅ 正常 | |

---

## 總結

本次稽核僅發現 1 個 Bug（A2 P2 級），已於稽核當日修復。整體程式碼品質優良，TimerManager / EventManager 模式落實完整，無裸 setInterval，無缺少守衛的完成畫面，無 startTime null 風險。
