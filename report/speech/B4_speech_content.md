# B4 特賣比一比 — 語音內容

> 資料來源：`js/b4_sale_comparison.js`
> 匯出日期：2026-04-11

---

## 一、商品介紹彈窗語音（afterClose 鏈式）

`_showItemIntroModal(curr, afterClose)` 只顯示 icon + name，彈窗關閉觸發 afterClose。

```javascript
// afterClose 內播開題語音（afterClose pattern，B1/B2/B5/B6 同模式）
Game.Speech.speak(curr.name, afterClose)  // 彈窗關閉後再播開題語音
```

---

## 二、開題語音（two-store，2026-04-10 更新）

```javascript
// easy / normal（相同格式）
`${store1}${toTWD(p1)}，${store2}${toTWD(p2)}，請問哪一個商店賣的比較便宜？`

// hard（不說價格，因價格顯示 ???）
`${s1}跟${s2}，請問哪一個商店賣的比較便宜？`
```
> 注意：easy/normal 從「哪個比較便宜？」改為「請問哪一個商店賣的比較便宜？」

---

## 三、開題語音（triple-store）

```javascript
// normal（介紹彈窗說商品名，afterClose 後播問題語音）
// （triple-store 開題時由 afterClose 接 _showPriceInputSection）
```

三商店選擇完後自動進入差額頁，差額頁另有獨立語音（見第六節）。

---

## 四、開題語音（unit-price）

```javascript
// easy / normal
`${left.store}${left.qty}${curr.unit}${toTWD(left.price)}，${right.store}${right.qty}${curr.unit}${toTWD(right.price)}，哪家每${curr.unit}比較划算？`

// easy 語音後綴（unit 模式）
`，哪家每${curr.unit}比較划算？`
// normal/hard 語音後綴（unit 模式）
`，哪家每${curr.unit}比較划算？請輸入較划算的每${curr.unit}價格。`
```

---

## 五、第一頁流程語音

### Easy 模式：逐枚點幣（_setupEasyModeCoins）
```javascript
// 每點一枚 → 播面額語音（無額外文字）
Game.Speech.speak(String(denom))  // e.g. "85"
// 最後一枚：等語音播完 → 檢查兩側是否都完成 → _handleEasyBothSidesDone
// 兩側完成 → 自動高亮較便宜一側（無語音，直接執行 diff 段）
```
搜尋 `_setupEasyModeCoins`、`b4-easy-coin`、`_handleEasyBothSidesDone`

### Normal 模式：逐枚點幣 → 價格輸入（_setupNormalModeCoins）
```javascript
// 每點一枚 → 播面額語音（同 easy）
// 最後一枚語音播完 → 兩側完成 → _showPriceInputSection（點框開 numpad 彈窗）
// Numpad 正確 → 揭露卡片 → _renderDiffSection
// Numpad 錯誤 → 播錯誤語音重試
```
搜尋 `_setupNormalModeCoins`、`_showPriceInputSection`、`b4-pi-card`、`b4-pi-modal`、`b4-pi-tap-hint`

### Hard 模式：??? 價格 → 開題語音後開 numpad
```javascript
// 介紹彈窗關閉後觸發開題語音，語音播完後呼叫 _showPriceInputSection
// 商品卡顯示 <span class="b4-price-unknown">？？？</span>
// 提示鈕額外觸發 _revealCoinsOnly + _revealCardPrices
```
搜尋 `b4-price-unknown`、`diff === 'hard'` in afterClose

---

## 六、差額頁語音（_renderDiffSection / two-store）

### Easy 差額頁
```javascript
// 開題語音
`${cheapOpt.store}${cheapOpt.price}元，${expOpt.store}${expOpt.price}元，請選擇正確的答案`
// （unit 模式）
`${curr.name}，每${curr.unit}差${correctDiff}元，請選擇正確的答案`
```

### Normal 差額頁
```javascript
// 選項初始全部顯示 ???（b4-diff-opt-masked）
// 語音：（同 easy 格式）
`${expOpt.store}${expOpt.price}元，${cheapOpt.store}${cheapOpt.price}元，請選擇正確的答案`
// （unit 模式）
`${curr.name}，每${curr.unit}差${correctDiff}元，請選擇正確的答案`
```

### Hard 差額頁
```javascript
// 語音
`${expOpt.store}${expOpt.price}元，${cheapOpt.store}${cheapOpt.price}元，點擊問號輸入差額`
// （unit 模式）
`請計算每${curr.unit}差多少元，點擊問號輸入答案`
// 點 ??? → _showHardDiffNumpadModal
```

---

## 七、差額頁語音（triple-store）

### Normal triple 差額
```javascript
`${tripleExpOpt.store}${tripleExpOpt.price}元，${tripleCheapOpt.store}${tripleCheapOpt.price}元，便宜了${correctDiff}元，請選擇正確的答案`
```

### Hard triple 差額
```javascript
`${tripleExpOpt.store}${tripleExpOpt.price}元，${tripleCheapOpt.store}${tripleCheapOpt.price}元，點擊問號輸入差額`
```

---

## 八、差額頁語音（normal，硬幣揭露後 two-store）

```javascript
// hard numpad 答對後進選擇頁
`答對，便宜了${correctDiff}元，請選擇正確的答案。`
```

---

## 九、選擇正確語音

### 選最便宜（two-store）
```javascript
`答對了！${cheapOpt.store}${cheapPrice}元，比較便宜`
// unit 模式
`答對了！${cheapOpt.store}每${curr.unit}${cheapPrice}元，比較划算`
```

### 選最便宜（triple-store）
```javascript
// 三商店排序正確
`答對了！${curr.stores[curr.cheapestIdx].store}最便宜`
// 三商店排序（自動翻轉後）
`答對了！${curr.sortedAsc[0].store}${sortedPrices[0]}元最便宜`
```

### 差額答對
```javascript
`答對了！便宜了${toTWD(correctDiff)}`
// unit 模式
`答對了！每${ci2.unit}便宜了${correctDiff}元`
```

---

## 十、錯誤語音（統一，2026-04-03/04/10 更新）

### 選最便宜錯誤（two-store）
```
「不對喔，請再比較看看」
```

### 三商店排序錯誤
```
「不對喔，請看看正確的排序，再試一次！」
（同時揭露正確排序）
```

### 三商店普通模式 3次後自動揭露
- 揭露所有卡片價格（`_revealTripleCardPrices`）
- 同時播：`「不對喔，請看看正確的排序，再試一次！」`
搜尋 `selectErrorCount`

### 差額輸入錯誤（漸進提示，2026-04-04 更新）

| 次數 | 說明 | 語音 |
|------|------|------|
| 第1~2次 | 方向提示（不透露答案）| `「不對喔，算多了，再想想看」` / `「不對喔，算少了，再想想看」` / `「不對喔，再想想看」` |
| 第3次（普通模式）| 說出答案，顯示算式 | `「不對喔，差額是${toTWD(correctDiff)}，請再試一次」` / `「不對喔，每${unit}差${correctDiff}元，請再試一次」` |
| 困難模式全次數 | 只給方向提示，提示鈕才揭露 | 同第1~2次 |

搜尋 `diffErrorCount`、`revealAnswer`

---

## 十一、困難模式差額彈窗（_showHardDiffNumpadModal）

- 觸發：hard 差額頁點 ??? 按鈕
- 顯示數字鍵盤 + `b4-hnp-card`
- 答對語音：`「答對，便宜了${correctDiff}元，請選擇正確的答案。」`→ 選項揭露
- 搜尋 `_showHardDiffNumpadModal`、`b4-hnp-card`

---

## 十二、困難模式差額算式提示（_showHardDiffFormulaHint）

- 觸發：困難模式差額提示按鈕
- 顯示算式卡 `b4-hfh-card`，含金錢圖示與語音
- 提示鈕語音（two-store）：`「${A店名}${A價格}元，${B店名}${B價格}元，兩者差多少元？」`
- 提示鈕語音（unit）：`「每${unit}，${optA.store}${perA}元，${optB.store}${perB}元，兩者差多少元？」`
- 搜尋 `_showHardDiffFormulaHint`、`b4-hfh-card`、`兩者差多少元`

---

## 十三、省錢清單頁語音

```
showResults() → success 音效 + confetti
「太棒了！完成挑戰！」
```

---

## 十四、搜尋關鍵字速查

| 語音類型 | 搜尋關鍵字 |
|---------|-----------|
| 開題語音 | `speechText`、`請問哪一個商店賣的比較便宜` |
| 介紹彈窗 | `_showItemIntroModal`、`afterClose`、`b4-item-intro-modal` |
| 點幣語音 | `_setupEasyModeCoins`、`_setupNormalModeCoins`、`isLast` |
| 價格輸入 | `_showPriceInputSection`、`openNumpad`、`b4-pi-modal` |
| ??? 價格 | `b4-price-unknown`、`_revealCoinsOnly` |
| 差額選項 ??? | `b4-diff-opt-masked`、`_revealNormalDiffOptions` |
| 差額 hard numpad | `_showHardDiffNumpadModal`、`b4-hnp-card` |
| 差額 hard 算式提示 | `_showHardDiffFormulaHint`、`b4-hfh-card`、`兩者差多少元` |
| 選擇反饋 | `不對喔，請再比較看看` |
| 排序反饋 | `不對喔，請看看正確的排序` |
| 差額錯誤方向提示 | `算多了，再想想看`、`算少了，再想想看` |
| 差額錯誤揭露答案 | `diffErrorCount`、`revealAnswer`、`差額是` |
| 單位比價開題 | `哪家每.*比較划算` |
