# A6 火車票 Unit Completion Report

> 修復記錄見下方；架構說明見 CLAUDE.md。

## 主物件

- `Game`（全域）；`Game.Debug.FLAGS`

## 主要 HTML/JS

- `html/a6_train_ticket.html`
- `js/a6_train_ticket.js`

## 特殊注意

- 自訂車站系統：`addCustomStation`, `resolveStationId`
- 觸控拖曳依賴 `js/touch-drag-utility.js`（`cleanupAll()` before change drag）

---

## 修復記錄速查（從 CLAUDE.md 遷移，2026-04-29）

| 項目 | 搜尋關鍵字 |
|------|------------|
| A6 easy-change-money 觸控拖曳修正（2026-03-16）| `cleanupAll()` before change drag；`_DRAG_SEL` 常數；`let target` + 父元素回退；`?v=2.3` 快取清除（A3/A4/A6/F1/F2/F6）|
| A6 預設任務錢包分層上限（2026-03-16）| `walletCap`：≤100→300、≤300→700、≤600→1300、其他→+500；`minWallet = totalPrice + 10`；`generatePresetQuestion` + `renderPaymentSceneUI` fallback |
| A6 500/1000/2000 錢包隨機組成（2026-03-16）| `generateRandomWalletDecomposition`：貪婪起點→隨機拆解→≤10張；`breakRules`；`initializeWallet` 三路分支；每題重新計算 |
| A6 找零驗證普通模式加 ✗（2026-03-16）| `wrong-answer-overlay` 加入普通模式 else 分支；timing 對齊困難模式（300ms+1000ms）|
| A6 找零驗證正確答案加 ✓（2026-03-16）| `correct-answer-overlay`、`correct-mark`、`correctMarkAppear`；與 ✗ 結構完全對稱 |
| A6 步驟6找零語音串接 | `handleEasyChangePlacement`, Speech callback chain |
| A6 找零圖示亮度 | `executeNextChange`, `img.style.opacity` |
| A6 步驟1-4 click.mp3 | `playSound('click')`, `click.mp3` |
| A6 張數調整 setInterval→遞迴 | `autoAdjustCount`, `doClick` |
| A6 console.log→Debug.warn | `Game.Debug.warn('sound'` |
| A6 skipOnInterrupt | `skipOnInterrupt` |
| A6 重新選擇presetTask | `savedPresetTask` |
| A6 確認付款脈動 | `classList.*ready`, `@keyframes pulse` |
| A6 確認付款hover橘色 | `confirm-payment-btn:hover` |
| A6 付款錯誤退幣+勾勾 | `validatePayment`, `付款金額不足，請重新付款` |
| A6 步驟6輔助點擊等待確認找零 | `executeNextChange`, `ChangeConfirm`, `enableClickModeWithVisualDelay` |
| A6 困難模式付款語音 `_showPaidAmount` 旗標（2026-04-07）| 困難模式拖曳放置金錢時不播語音，按提示鈕後 `_showPaidAmount=true` 才播；桌面/觸控兩處加 `difficulty !== 'hard' || _showPaidAmount` 守衛（50ms timer）；搜尋 `_showPaidAmount`、`paymentSpeech` |
| A6 step-hint 樣式更新（2026-04-07）| `::after` 改 `👇 點這裡`；`top:-54px;bottom:auto`（上方）；橙色漸層；新增 `@keyframes bounceHint`；搜尋 `bounceHint`、`step-hint::after` |
