# B2 零用錢日記 — 語音內容

> 資料來源：`js/b2_allowance_diary.js`
> 匯出日期：2026-04-11

---

## 一、開題語音（全難度統一）

```javascript
// 三難度共用同一語音（無 themePrefix）
const introSpeech = `請計算每筆收入和支出，算出最後的金額。`;
```

完整鏈式順序：
1. 起始彈窗語音 `本週零用錢記錄，一開始有${question.startAmount}元` → 彈窗關閉
2. `請計算每筆收入和支出，算出最後的金額。` 播完
3. Easy → `_animateEasyEntriesSequential`；Normal/Hard → 顯示題目

搜尋 `introSpeech`、`_showTaskIntroModal`、`afterClose`

---

## 二、起始金額彈窗語音

```
「本週零用錢記錄，一開始有${question.startAmount}元」
（語音播完後彈窗關閉，再由 afterClose 觸發開題語音）
```

---

## 三、Easy 模式 — 逐列動畫語音（_animateEasyEntriesSequential）

事件列依序淡入，每列出現後播：
```
「${ev.name}」（只播名稱，不播金額）
```
首列出現後立即啟動金錢圖示點擊（不等語音結束）。

**輔助點擊提示語音（_advanceSequentialHint）**
```
verb = income → '收入'；expense → '支出'
「第${nextIdx+1}項，${ev.name}，${verb}${ev.amount}元，請點擊金錢圖示」
```

**Easy 模式 — 金幣點擊語音（_bindB2EasyModeCoins）**
```
每點一枚金幣 → 顯示累計金額（easyRunningTotal），無語音
完成一整項後自動揭露下一事件列並播該列 ev.name
```

---

## 四、Phase 1 完成語音（_proceedB2FromPhase1）

```
「最後剩下${effectiveAnswer}元」
→ 語音播完 → 進入 Phase 2
```

---

## 五、Normal 模式 — 事件金額輸入語音

### 普通模式選項彈窗（_showB2NormalChoices / _showB2CustomEventNumpad）

正確選擇後：
```
verb = income → `增加${correct}元`；expense → `花掉${correct}元`
「${evName}，${verb}」
```

錯誤選擇：
```
「不對喔，再想想看」
```

### 普通模式 Phase 1 提示鈕（_showDiaryAmountHints）
```
不播語音，在未答對的 ？框上方顯示橙色數字泡泡（5秒後自動消失）
```
搜尋 `b2-cost-hint-tip`

---

## 六、Hard 模式 — 數字鍵盤語音

答對：（無語音，進入 Phase 2）

答錯：
```
「不對喔，算太多了，請再試一次」
「不對喔，算太少了，請再試一次」
3次錯誤 → 800ms 後自動彈出提示彈窗（_showHardModeHintModal）
```

---

## 七、困難模式提示彈窗（_showHardModeHintModal）

顯示逐步計算步驟（起始 → 各事件 → 最終餘額）：
```
「從${question.startAmount}元開始，${加上/減去}${amount}元（${name}），…，最後剩下${effAnswer}元」
```
- 觸發：困難模式提示鈕 / 錯誤2次+ 後 800ms
- 彈窗 DOM：`b2-hm-overlay`、`b2-hard-hint-modal`
- 搜尋 `_showHardModeHintModal`、`b2-hm-overlay`、`從.*元開始`

---

## 八、Phase 2 錢包操作語音

```
進入 Phase 2 時：「最後剩下${toTWD(effectiveAnswer)}，請拿出正確的金額」
確認付款正確 → 直接進下一題（無語音）
確認付款錯誤 → 「不對喔，算${b2EasyErrDir}，請再試一次」
    b2EasyErrDir = chosen > effectiveAnswer ? '太多了' : '太少了'
3次錯誤 → 提示鈕語音（同 hint，顯示步驟卡片 _showCalcBreakdown）
```

---

## 九、Phase 2 金錢圖示動畫頁（_renderPhase2，第 2 頁）

```
（無語音）
≤10枚：逐枚動畫（150ms delay/枚）
>10枚：分組顯示（face 隨機正反面）
5 秒後自動前進下一題（或點「下一題」按鈕）
```
搜尋 `_renderPhase2`、`b2-p2-next-btn`、`b2-p2-coin`、`b2-phase2-card`

---

## 十、Normal/Hard Phase 1 提示鈕說明

### 普通模式 _showCalcBreakdown（行內步驟卡片）
```
「從${startAmount}元開始，${收入/花了}${amount}元，剩下${running}元，…，最後剩下${effAnswer}元」
（_showCalcBreakdown 也顯示步驟卡片）
```

### 困難模式 _showHardModeHintModal（彈窗）
```
見第七節
```

---

## 十一、完成畫面語音

```
showResults() → 播放 success 音效 + confetti
無額外語音（靠畫面顯示）
```

---

## 十二、搜尋關鍵字速查

| 語音內容 | 搜尋關鍵字 |
|---------|-----------|
| 開題語音 | `introSpeech`、`lastSpeechText` |
| 起始彈窗 | `_showTaskIntroModal`、`本週零用錢記錄` |
| 逐列動畫 | `_animateEasyEntriesSequential`、`ev.name` |
| 輔助點擊提示 | `_advanceSequentialHint`、`請點擊金錢圖示` |
| Phase 1 完成 | `_proceedB2FromPhase1`、`最後剩下.*元` |
| 普通選項語音 | `_showB2NormalChoices`、`增加.*元`、`花掉.*元` |
| 普通提示泡泡 | `_showDiaryAmountHints`、`b2-cost-hint-tip` |
| 困難答錯 | `不對喔，算太多了`、`不對喔，算太少了` |
| 困難提示彈窗 | `_showHardModeHintModal`、`b2-hm-overlay`、`從.*元開始` |
| Phase 2 語音 | `最後剩下.*請拿出`、`b2EasyErrDir` |
| Phase 2 金幣頁 | `_renderPhase2`、`b2-p2-coin`、`p2auto` |
| 普通步驟卡片 | `_showCalcBreakdown`、`從.*元開始` |
