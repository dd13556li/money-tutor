# B1 今天帶多少錢 — 語音內容

> 資料來源：`js/b1_daily_budget.js`
> 匯出日期：2026-04-20

---

## 一、場景任務彈窗語音（_showTaskModal）

```
「今天要去${lbl}，準備出發！」
→ 語音播完後彈窗自動關閉（afterClose callback）
→ afterClose 觸發 _renderPhase1() 及 Phase 1 開題語音
```

> `fmtLabel(label)` 將場景名稱格式化（去除標點）；搜尋 `_showTaskModal`、`準備出發`

---

## 二、Phase 1 開題語音（_renderPhase1，300ms delay）

```javascript
// Easy 模式
`今天去${lbl}，第一項：${effectiveItems[0].name}，請點擊金錢圖示。`

// Normal 模式
`今天去${lbl}，要準備${names}，每一項是多少元？請點選正確金額。`

// Hard 模式
`今天去${lbl}，要準備${names}，每一項是多少元？請輸入正確金額。`
```

> `names = effectiveItems.map(it => it.name).join('、')`
> 存入 `state.quiz.lastSpeechText`（供 🔊 重播鈕使用）
> 搜尋 `lastSpeechText`、`請點擊金錢圖示`、`請點選正確金額`

---

## 三、Easy 模式 — 點幣逐項語音

### 3-1 每枚金幣點擊（_bindB1EasyCoinEvents）
```
每點一枚 → 播該幣對應的累計金額：
「${easyEventTotals[itemIdx]}元」（播完後自動顯示下一枚，或完成該項）
```

### 3-2 完成一項後揭露下一項
```
「${items[nextIdx].name}，請點擊金錢圖示」（200ms delay）
```

### 3-3 所有項目完成（Easy Phase 1 完成）
```
「太棒了！總共需要帶${toTWD(effectiveTotal)}，出發囉！」
→ 語音播完後自動進入 Phase 2
```

> 搜尋 `easyEventTotals`、`請點擊金錢圖示`、`太棒了！總共需要帶`

---

## 四、Normal 模式 — 金額選項語音

### 4-1 答對
```
「${correct}元，答對了！」
→ 語音播完後：若有下一項則揭露下一項，否則進入 Phase 1 完成
```

### 4-2 答錯
```
「不對喔，請再試一次」
```

### 4-3 Normal Phase 1 完成（所有項目答對）
```
「總共需要帶${toTWD(effectiveTotal)}，出發囉！」
→ 語音播完後自動進入 Phase 2
```

> 搜尋 `答對了`、`不對喔，請再試一次`

---

## 五、Hard 模式 — 數字鍵盤輸入語音

### 5-1 各項目提示語音（_bindHardItemInputEvents）
```
「${items[itemIdx].name}，需要幾元？」
```

### 5-2 各項目答對
```
「${cost}元，答對了！」
→ 語音播完後揭露下一項（或進入 Hard Phase 1 完成）
```

### 5-3 各項目答錯
```
「不對喔，算多了，再想想看」
「不對喔，算少了，再想想看」
```

### 5-4 Hard Phase 1 總計輸入（_renderHardTotalInput）
答對：
```
「答對了！總共${toTWD(correctTotal)}」
→ 語音播完後自動進入 Phase 2
```
答錯：
```
「不對喔，${算多了/算少了}，再想想看」
```

> 搜尋 `_renderHardTotalInput`、`b1-ht-confirm`、`算多了`、`算少了`

---

## 六、Phase 1 提示鈕語音（_showPhase1AmountHints）

普通/困難模式提示鈕：**不播語音**，改在未答對的 ？框上方顯示橙色金額數字泡泡（5 秒後自動消失）。

> 搜尋 `_showPhase1AmountHints`、`b1-cost-hint-tip`

---

## 七、困難模式行程卡逐項朗讀（_speakItemsOneByOneHard）

```
逐一朗讀每個費用項目：
「${it.name}，${toTWD(it.cost)}」（每項間隔 950ms）
最後：「總共${toTWD(q.total)}」（500ms delay）
```

> 搜尋 `_speakItemsOneByOneHard`

---

## 八、Phase 2 錢包操作語音（_renderPhase2）

### 8-1 進入 Phase 2
```
「請準備${toTWD(effectiveTotal)}」（即時播放）
Easy 模式：自動顯示 ghost slots（靜默，無語音）
```

### 8-2 放幣語音（簡單/普通模式，80ms delay）
```
「${walletNow}元」（當前錢包累計金額）
困難模式：放幣時靜音
```

### 8-3 確認付款 — 正確
```
「剛好！不需要找零，可以出發了！」（金額剛好等於目標）
「金額足夠，可以出發了！」（金額大於目標）
```

### 8-4 確認付款 — 錯誤
```
「不對喔，你付的錢太少，請再試一次」
```

> 搜尋 `_renderPhase2`、`請準備`、`剛好！不需要找零`、`金額足夠`、`你付的錢太少`

---

## 九、連勝徽章語音

| 連勝數 | 語音內容 |
|--------|---------|
| 3 連勝 | `三連勝，繼續加油！` |
| 5 連勝 | `五連勝，太厲害了！` |

> 搜尋 `三連勝`、`五連勝`

---

## 十、完成畫面語音

```
showResults() → 播放 success 音效 + confetti
無額外語音
```

---

## 十一、重播按鈕（🔊）

```
id="replay-speech-btn"
點擊後重播 state.quiz.lastSpeechText（最近一次開題語音）
```

> 搜尋 `replay-speech-btn`、`lastSpeechText`

---

## 十二、搜尋關鍵字速查

| 語音內容 | 搜尋關鍵字 |
|---------|-----------|
| 任務彈窗 | `_showTaskModal`、`準備出發` |
| Phase 1 開題 | `lastSpeechText`、`請點擊金錢圖示`、`請點選正確金額` |
| Easy 點幣 | `easyEventTotals`、`太棒了！總共需要帶` |
| Normal 答對/錯 | `答對了`、`不對喔，請再試一次` |
| Hard 各項 | `需要幾元`、`算多了`、`算少了` |
| Hard 總計 | `_renderHardTotalInput`、`答對了！總共` |
| Phase 1 提示泡泡 | `_showPhase1AmountHints`、`b1-cost-hint-tip` |
| Hard 逐項朗讀 | `_speakItemsOneByOneHard` |
| Phase 2 進入 | `請準備`、`_renderPhase2` |
| Phase 2 放幣 | `walletNow`（`toTWD(walletNow)` 播累計金額） |
| Phase 2 正確 | `剛好！不需要找零`、`金額足夠，可以出發了` |
| Phase 2 錯誤 | `你付的錢太少` |
| 連勝 | `三連勝`、`五連勝` |
| 重播鈕 | `replay-speech-btn`、`lastSpeechText` |
