# 修復記錄存檔

> 本文件存放已完成且穩定的歷史修復記錄，供查閱用。活躍修復記錄見 `CLAUDE.md`。

---

## 一、一般舊修復（B 系列前）

| 項目 | 單元 | 搜尋關鍵字 |
|------|------|------------|
| canvas-confetti 本地化 | 全部 | `confetti.browser.min.js` |
| A6 自訂車站修正 | A6 | `保留預設模式生成的購票資料` |
| A2 圖檔重命名英文 | A2 | `icon-a2-` |
| C4 總額隱藏修復 | C4 | `current-total-display` |
| F1/F2/F3/F5 主題「預設」 | F1/F2/F3/F5 | `theme: 'default'`, `'預設 🎲'` |
| F1/F2/F3 CSS 分離 | F1/F2/F3 | `f1-object-correspondence.css`, `f2-rote-and-rational-counting.css`, `f3-number-recognition.css` |
| F4 觸控拖曳修復 | F4 | `setupTouchDragForReturnedNumber`, `autoReturnIncorrectNumber` |
| F4/F1 桌面拖曳修復 | F4, F1 | `handleDragStart`, `event.target.closest` |
| F4 完成畫面滿版+可滾動 | F4 | `f4_number_sorting.html`, `overflow-y:auto` |
| F4 totalLevels NaN | F4 | `this.state.customRange` |
| F4 數字範圍輸入修復 | F4 | `showNumberInput`, `confirmCustomRange` |
| F2 最後一題語音時機 | F2 | `isLastQuestion`, `currentTurn >= totalTurns` |
| F2 emoji 背景改白色 | F2 | `modeStyles.easy.item.backgroundColor` |
| F1 困難模式最少3種圖示 | F1 | `generateHardModeItems`, `numTargetTypes` |
| 拖曳去背 ghost | F1/F2/F3/F6/A3/C3 | `setDragImage`, `getComputedStyle` |
| 多指觸控誤觸 | A3/C3/C4/C5/C6/F1/F2/F3/F6 | `touchIdentifier`, `touch.identifier` |
| F5 普通模式語音競態 | F5 | `handleNormalTestClick`, `lastSpeakId` |
| F5 簡單模式重複計分 | F5 | `handleEasyModeAutoResult`, `easyModeResultShown` |
| F5 跨場次計時器污染 | F5 | `gameSessionId`, `mySessionId` |
| F5 簡單模式語音指令 | F5 | `speakInstruction()` |
| 觸控拖曳 setDragImage TypeError | C4/C5/C6 | `event.dataTransfer.setDragImage` |
| startTime null 修復 | C4/C5/C6 | `startTime ? (endTime - startTime) : 0` |
| A3 命名空間錯誤 | A3 | `McDonald.TimerManager.setTimeout` |
| A6 觸控拖曳 easy-change-money（舊版） | A6 | `.easy-change-money` |
| touch-drag-utility.js 版本參數補齊 | A3/A4/A6/F1/F2/F6 | `touch-drag-utility.js?v=2.2`（快取清除） |
| 獎勵系統縮放持久化 | reward/ | `applyZoom`, `rewardSystemZoom` |
| F1 完成鈕錯誤恢復補齊 | F1 | `clearByCategory('turnTransition')`, `isAnswering = false` |
| F1 困難模式按鈕文字+取代放置 | F1 | `handleHardComplete`, `btn-text`, `btn-icon`, `origParent.appendChild` |
| F1 困難取代放置後續3項 | F1 | `validateDrop`, `executeDrop`, `allowClickToPlace` |
| F1 提示按鈕樣式同F3 | F1 | `.modern-hint-btn`, `hint-effect` |
| C1 喇叭重播按鈕 | C1 | `replay-audio-btn-normal` |
| setDragImage 觸控防護14處 | A3/C3/F1/F2/F3/F6 | `e.dataTransfer.setDragImage` |
| C6 步驟2防重複點擊 | C6 | `setupC6HardModeStep2Listeners`, `confirmBtn.disabled` |
| showNumberInput raw setTimeout | F1/F2/F3 | `TimerManager.setTimeout.*'ui'` |
| F1 移除「已放置」語音 | F1 | `Speech.speak('correctPlacement'` |
| 11-19元語音修正 | C/A | `convertToTraditionalCurrency`, `specialCases` |
| C2 最後金幣語音順序 | C2 | `handleItemClick`, nested callback |
| A3 魔法商品上傳 | A3 | `customItems`, `getAllCategoryItems`, `renderCustomItemsPanel`, `setEasyModeCustomItemPrices` |
| A3 speak 防重複callback | A3 | `callbackFired`, `safeCallback` |
| A3 showSettings 清殘留modal | A3 | `category-assignment-modal` |
| A3 startOver 清speechDelay | A3 | `TimerManager.clearByCategory('speechDelay')` |
| A3 addToCart 場景守衛 | A3 | `currentScene !== 'ordering'` |
| A3 showCompletionSummary 防重複 | A3 | `_completionSummaryShown` |
| F6 showImagePreview raw setTimeout | F6 | `TimerManager.setTimeout.*'ui'` |
| C2 raw setTimeout 5處 | C2 | `Game.TimerManager.setTimeout.*category` |
| C3 raw setTimeout 8處 | C3 | `resetGameState`, `lastExchangeKey` |
| C5 語音+狀態+計時器 | C5 | `safeCallback`, `onerror`, `startSystemMonitoring` |
| C6 語音+狀態+計時器 | C6 | `safeCallback`, `onerror`, `gameCompleted` |
| A2 完成畫面防重複 | A2 | `_completionScreenShown`, `bindSettingEvents` |
| A2 bindEvents 監聽器累積 | A2 | `_documentEventsBound`, `bindEvents` |

---

## 二、B 系列修復（2026-03-14 ~ 2026-03-18）

| 項目 | 單元 | 搜尋關鍵字 |
|------|------|------------|
| B 系列全新開發（2026-03-14）| B1~B6 | `B3_ALL_ITEMS`, `B2_TEMPLATES`, `B5_SCENARIOS`, `B6_STALLS`, `B6_MISSIONS` |
| B 系列品質改進（2026-03-15）| B1~B6 | `retryMode`, `mode-group`, `speechMap`, `完成語音 800ms` |
| B5/B6 Speech 物件補齊 | B5, B6 | `Game.Speech.speak`, `safeCallback` |
| B 系列吉祥物→圖片（2026-03-15）| B1~B6 | `educated_money_bag_character` 替換 emoji、`學習成果` 區塊、`bGlow` 動畫、B1 `retryMode` `data-mode` |
| B2/B3/B5/B6 難度說明框（2026-03-15）| B2,B3,B5,B6 | `_diffDescriptions`, `b-diff-desc`, `diff-desc`, `classList.add('show')` |
| B 系列作業單整合（2026-03-15）| B1~B6 | `settings-worksheet-link`, `b1~b6-worksheet.js`, `WorksheetRegistry.register('b1'~'b6')` |
| B2~B6 backToMenu href 修正 | B2,B3,B5,B6 | `../html/index.html` → `../index.html` |
| B1/B2 toTWD 語音金額（2026-03-15）| B1,B2 | `const toTWD = v =>`, 修正大金額語音（>1000元）|
| B 系列設定頁卡片佈局+吉祥物左置（2026-03-15）| B1~B6 | `unit-welcome`, `welcome-content`, `settings-title-row`, `settings-mascot-img`, `settingsBounce` |
| B 系列返回主選單指向 part4（2026-03-15）| B1~B6 | `../index.html#part4`；`backToMenu()` 已更新 |
| B 系列 Speech 語音升級（2026-03-15）| B1~B6 | `cachedVoice`, `_loadVoice()`，`onvoiceschanged`，優先順序：Yating→Hanhan→Google→zh-TW→zh |
| B 系列測驗標題列對齊（2026-03-15）| B1~B6 | `b-header`, `b-header-left/center/right` |
| B 完成畫面 CSS 補齊（2026-03-15）| `b-series.css` | `completion-screen`, `stats-grid`, `stat-card`, `completion-buttons`, `btn-play-again`, `btn-back-settings` |
| B1 `b1-diff-desc` → `b-diff-desc`（2026-03-15）| B1 | `b-diff-desc`, `id="diff-desc"` |
| B3 toTWD 語音金額（2026-03-15）| B3 | `toTWD(price)`, 價格 ≥1000 元正確發音 |
| B4 韓文標籤修正 | B4 | `b4-store-label`, `매장→商店` |
| B5 錯誤重試按鈕 | B5 | `再試一次`, `renderRound()` retry |
| B6 錯誤商品提示+語音 | B6 | `b6-wrong-tip`, `Speech.speak.*不在今天的購物清單` |
| B 系列付款/找零語音 | B6 | `_renderPaymentUI`, `_showChange`, `共消費.*找回` |
| B 系列 resetGameState() 補齊 | B1~B6 | `resetGameState`, `🔄 [B1]`, showSettings 改呼叫 |
| B2/B5/B6 convertToTraditionalCurrency 語音 | B2,B5,B6 | `convertToTraditionalCurrency.*answer`, `共花了`, `找回` |
| B1/B4 speak() 移除未使用 onerrorCb 參數 | B1,B4 | `u.onerror = safeCallback` |
| B2 convertToTraditionalCurrency typeof 防護 | B2 | `typeof convertToTraditionalCurrency === 'function'` |
| B5/B6 toTWD 安全輔助函數 | B5,B6 | `const toTWD = v =>`, `toTWD(total)` |
| B4 toTWD 補齊 + 差額語音 | B4 | `const toTWD = v =>`, `toTWD(correctDiff)` |
| B4 _diffDescs → _diffDescriptions 統一命名 | B4 | `_diffDescriptions` |
| B1 錢幣圖示 CSS 修正 | B1 | `.b1-coin-btn .coin-img`, `.b1-coin-btn .banknote-img` |
| B 系列標題列重構（左/中/右三欄）| B1~B6 | `b-header-unit`, `b-header-left`, `b-header-center` |
| B 系列設定頁 h1 加單元代碼前綴 | B1~B6 | `單元B1：今天帶多少錢` |
| B1/B4 完成畫面移除 sticky header | B1,B4 | `completion-screen`, `trophy-bounce`, `performance-badge` |
| B2/B3/B5/B6 showResults() EventManager.removeByCategory | B2,B3,B5,B6 | `removeByCategory('gameUI')` in `showResults` |
| B 系列 _bindSettingsEvents() removeByCategory('settings') 守衛 | B1~B6 | `removeByCategory('settings')` in `_bindSettingsEvents` |
| B4 backToMenu() 補齊 + B1/B4 設定頁返回按鈕修正 | B1,B4 | `backToMenu`, `Game.backToMenu()` in settings back-btn |
| B1 金錢圖示透明背景（2026-03-15）| B1 | `.b1-coin-btn` transparent bg, `b1-denom-label` |
| B 系列語音重播按鈕（2026-03-15）| B1~B6 | `b-replay-btn`, `replay-speech-btn`, `lastSpeechText` |
| B 系列中央回饋動畫（2026-03-15）| B1~B6 | `_showCenterFeedback`, `b-center-feedback`, `b-cf-icon`, `b-cf-text`, `bFeedbackPop` |
| B1 金錢圖示水平排列（2026-03-15）| B1 | `.b1-tray-coins` flex row, `.b1-coin-tray` column, card box |
| B1 錢包目標金額顯示（2026-03-15）| B1 | `b1-wallet-goal-tag`, `需要 X 元`, `_renderWalletArea` |
| B2 答題區卡片（2026-03-15）| B2 | `b2-answer-card`, `b2-answer-prompt` |
| B3 答題區卡片（2026-03-15）| B3 | `b3-answer-card` |
| B4 VS 分隔圖示（2026-03-15）| B4 | `b4-vs-divider`, `grid-template-columns: 1fr auto 1fr` |
| B6 面額顏色鈔票按鈕（2026-03-15）| B6 | `--bill-color` CSS variable, `b6-bill-label`, `b6-bill-value` |
| B 系列內嵌語音重播按鈕（2026-03-16）| B1~B6 | `b-inline-replay` |
| B1 錢幣拖曳放置（2026-03-16）| B1 | `b1-coin-draggable`, `_setupDragDrop`, `_setupTouchDrag`, `b1-drop-zone`, `_calcOptimalCoins` |
| B1 難度提示系統（2026-03-16）| B1 | easy=淡化面額, normal=3錯自動提示, hard=`#hint-btn`; `_showCoinHint`, `b1CoinHintPulse` |
| B 系列 voices[0] 終極回退（2026-03-16）| B1~B6 | `voices[0] \|\|` |
| B 系列完成畫面 CSS 外部化（2026-03-16）| B1~B6 + `b-series.css` | `b-res-*` 移至 `b-series.css`；新增 `bResCelebrate/bResBounce/bResGlow` |
| B 系列 injectGlobalAnimationStyles 清理（2026-03-16）| B1~B6 | 移除死碼 `bGlow` keyframe |
| B 系列 speak() onerror 錯誤日誌（2026-03-16）| B1~B6 | `u.onerror = (e) => { if (e.error !== 'interrupted') Game.Debug.warn(` |
| B6 #b6-wrong-tip CSS 外部化（2026-03-16）| B6 | `#b6-wrong-tip` 移至 `b6_market_shopping.css` |
| B1 b1-inline-replay → b-inline-replay（2026-03-16）| B1 | 移除 `b1_daily_budget.css` 重複定義 |
| B 系列 gameCompleted → isEndingGame（2026-03-16）| B1~B6 | `isEndingGame` 對齊 C/F/A 命名標準 |
| B4 b4Glow 死碼清除（2026-03-16）| B4 | `b4Glow` keyframe 已移除 |
| B2/B3/B5/B6 設定頁按鈕 selection-btn→b-sel-btn（2026-03-17）| B2,B3,B5,B6 | `b-sel-btn`, `b-diff-easy`, `b-diff-normal`, `b-diff-hard` |
| B 系列 speak() try-catch 包裝（2026-03-17）| B1~B6 | `try { window.speechSynthesis.speak(u) } catch(e) { safeCallback() }` |
| B 系列 audio.play() try-catch 補齊（2026-03-18）| B2,B3,B5,B6 | `try { s.currentTime = 0; s.play().catch` |
| B 系列 Debug FLAGS speech 補齊（2026-03-18）| B2,B5,B6 | `speech: false` in `FLAGS` |
| B3 speak() 移除多餘 undefined 引數（2026-03-18）| B3 | `Game.Speech.speak(\`不對喔`（4 處，無第二引數）|
| B1/B4 Speech.speak 命名統一 this→Game（2026-03-18）| B1,B4 | `Game.Speech.speak(` |
| B2/B3/B5/B6 設定頁 CSS 類別遷移（2026-03-18）| B2,B3,B5,B6 | `b-setting-group`, `b-btn-group`, `b-setting-label` |
| B 系列 speak() 語音速率 0.9→1.0（2026-03-18）| B1~B6 | `u.rate = 1.0` |
| B1 state.settings 移除死碼 assistClick（2026-03-18）| B1 | `settings: { difficulty, questionCount, retryMode }` |
| B 系列 speak() 語音語系由 cachedVoice 派生（2026-03-18）| B1~B6 | `u.lang = this.cachedVoice?.lang \|\| 'zh-TW'` |

---

## 三、C / F / A 系列較舊的系統修復

| 項目 | 單元 | 搜尋關鍵字 |
|------|------|------------|
| F1 endGame 守衛+14處setTimeout | F1 | `isEndingGame`, `TimerManager.setTimeout` |
| F2 11處setTimeout+confetti | F2 | `TimerManager.setTimeout('confetti')` |
| A6 safeCallback+onerror | A6 | `safeCallback`, `onerror` |
| F3 speak() onerror | F3 | `safeCallback`, `onerror` |
| A4/A5 settings EventManager | A4/A5 | `removeByCategory('settings')` |
| C2 endGame 守衛+startTime | C2 | `isEndingGame`, `startTime ? ... : 0` |
| C2 setVoice 500ms 補漏 | C2 | `setTimeout(setVoice, 500)` |
| C1 endGame 守衛+startTime | C1 | `isEndingGame`, `startTime ? ... : 0` |
| F4 showResults 守衛+startTime | F4 | `isEndingGame`, `startTime ? ... : 0` |
| F5 completeGame 守衛 | F5 | `this.gameState === 'finished'` |
| F6 showResults 守衛+startTime | F6 | `isEndingGame`, `startTime ? ... : 0` |
| F6 drag ghost raw setTimeout | F6 | `_ghost.remove`, `dragSystem` |
| A3 modal focus raw setTimeout | A3 | `McDonald.TimerManager.setTimeout.*'ui'` |
| C4 raw setTimeout 6處 | C4 | `Game.TimerManager.setTimeout.*'speech'` |
| F3 raw setTimeout 9處 | F3 | `handleDragStart opacity`, `ghost` |
| confetti setInterval → 遞迴 | A1/A3~A6/C1~C6 | `TimerManager.setTimeout(fireConfetti, 250, 'confetti')` |
| F1 示範動畫 raw setTimeout | F1 | `playDemoAnimation`, `TimerManager.*'animation'` |
| F4 speak() safeCallback+10s | F4 | `callbackExecuted`, `10000, 'speech'` |
| F5 speakSync() safeCallback | F5 | `speakSync`, `safeCallback` |
| A2 speak() safeCallback+8s | A2 | `callbackExecuted`, 8s timeout |
| speak() TimerManager 備援 | A6/F3/F5 | `TimerManager.setTimeout(safeCallback, 10000, 'speech')` |
| A3 speak() TimerManager備援+catch | A3 | `this.parent.TimerManager.setTimeout.*10000` |
| F1/F2 safeCallback scope修復 | F1/F2 | `callbackExecuted` block-scope |
| A3 付款拖曳guard | A3 | `fillPaymentTarget`, `draggedElement && clickMode` |
| A3 找零拖曳guard | A3 | `fillChangeTarget`, `autoCollectChange` |
| A3 autoPayMoney雙重splice | A3 | `autoPayMoney`, `availableMoney.splice` |
| A5 *Processing多按1次 | A5 | `endsWith('Processing')`, `executeNextAction` |
| A5 普通模式錯誤3次提示補齊（2026-03-17）| A5 | `pinCancelErrorCount`, `bankCodeErrorCount`, `transferAmountErrorCount` |
| A5 轉帳確認頁/最終確認頁取消鍵封鎖（2026-03-17）| A5 | `transferVerifyErrorCount`, `transferConfirmErrorCount` |
| A3+A5 每步煙火音效 | A3, A5 | `playStepSuccess` |
| A3+A5 音效防重複 | A3, A5 | `playStepSuccess(skipSound = false)`, `correct02.mp3` |
| A3 魔法餐點定價 | A3 | `isSystemPrice`, `setEasyModeCustomItemPrices` |
| A3 我的錢包按鈕 | A3 | `showWalletPopup`, `closeWalletPopup` |
| isTrusted放行 | A2/A3 | `if (!event.isTrusted) return` |
| A2 _completionScreenShown重置 | A2 | `this._completionScreenShown = false` |
| A2 viewTicket stopPropagation | A2 | `stopPropagation`, `preventDefault` |
| 輔助點擊遮罩常駐+層級 | A1~A6 | `z-index:10100`, `z-index:10200` |
| F1/F2/F3/F5 startTime null | F1/F2/F3/F5 | `startTime ? (endTime - startTime) : 0` |
| A5 startTime null | A5 | `showFinalResults`, `startTime ?` |
| F3 endGame 守衛 | F3 | `isEndingGame`, `resetGameState` |
| C3 endGame 守衛+startTime | C3 | `isEndingGame`, `startTime ? ... : 0` |
| A4 showCompletionSummary 防重複 | A4 | `_completionSummaryShown` |
| A6 showCompletionScreen 防重複 | A6 | `_completionScreenShown`, `isTrusted` |
| C5/C6 monitoring setInterval→遞迴 | C5/C6 | `startSystemMonitoring`, `scheduleNext` |
| C6 window.addEventListener→EventManager | C6 | `EventManager.on(window` |
| A2 4x setInterval→遞迴 | A2 | `clickModeRecovery`, `TimerManager.*'clickMode'` |
