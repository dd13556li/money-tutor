# B5 生日派對預算 — 語音內容

> 資料來源：`js/b5_party_budget.js`
> 匯出日期：2026-04-19

---

## 一、歡迎畫面語音（showWelcomeScreen，2頁式）

### 第1頁
```javascript
// 派對主題動畫後自動播放
`今天要舉辦${themeData.name}，讓我們一起規劃派對預算吧！`
// 語音結束後 500ms → 轉第2頁
```

### 第2頁
```javascript
// 顯示預算 + 商品 emoji
`本關預算${scenario.budget}元，從${items.length}個商品中選購，在預算內就可以！`

// 點「開始挑選！」按鈕
`開始挑選！`  // 語音結束後進入 renderRound()
```
搜尋 `showWelcomeScreen`、`b5-wc2-start-btn`、`_skipIntroModal`

---

## 二、關卡介紹卡語音（_showRoundIntroCard）

```javascript
const speechMap = {
    easy:   `第${roundNum}關，本關預算${budget}元，在預算內選好商品就過關！`,
    normal: `第${roundNum}關，本關預算${budget}元，選好必買和選購商品，不要超出預算！`,
    hard:   `第${roundNum}關，本關預算${budget}元，精心規劃才能不超出預算！`,
};
// 語音結束後 dismiss 卡片，觸發 afterClose
```
搜尋 `_showRoundIntroCard`、`speechMap`、`afterClose`

---

## 三、簡單模式必買商品逐項語音（_speakMustItemsOneByOne）

```javascript
// afterClose 後 200ms 啟動，逐項朗讀有 must 屬性的商品
`必買：${item.name}，${toTWD(item.price)}`  // 每項之間 350ms

// 全部唸完後 300ms
`共${mustItems.length}項必買，一起挑選吧！`
```
> 注意：目前 B5_ALL_ITEMS / B5_THEMES 的商品定義均無 `must: true` 屬性，此函數實際為 no-op（無必買項目時直接 return）。若需啟用必買機制，需在 `allItems` 中為特定商品加入 `must: true`。

搜尋 `_speakMustItemsOneByOne`、`必買：`、`i.must`

---

## 四、Phase 1 購物頁語音

### 語音重播按鈕
```javascript
`派對採購任務，請在預算${g.budget}元之內採購所需商品`
```

### 選取商品
```javascript
// 一般選取（非提示模式）
`${item.name}，${toTWD(item.price)}`

// 取消商品（從購物清單 ✕）
`取消${item.name}`
```

### 選取超出預算
```javascript
`${item.name}${toTWD(item.price)}，超出預算${over}元，請換一個便宜一點的`
```

### 提示模式限制（簡單模式 p1HintMode）
```javascript
// 選到非提示商品
`不對喔，請選擇提示的商品`

// 嘗試從清單取消提示商品
`提示商品不可以取消`
```

### 全部提示商品選購完成
```javascript
`所有商品選購完成，可以確認購買了！`
// + confirm-btn 加 b5-hint-here 高亮
```
搜尋 `b5-p1-hint-btn`、`b5-hint-here`、`_b5P1ActivateHintMode`

---

## 五、Phase 1 確認購買語音（_handleConfirm）

### 購買成功（total <= budget）
```javascript
// 剛好用完預算
`完美！剛好花了${toTWD(total)}，用完全部預算！`
// + '💯 完美配額！' feedback

// 有剩餘
`太棒了！共花了${toTWD(total)}，還剩${toTWD(rem)}！`
// + '🎊 太棒了，派對辦起來！' feedback
```

### 超出預算（isCorrect = false）
```javascript
`不對喔，超出預算了，多了${toTWD(total - g.budget)}，請再試一次！`
// + '❌ 超出預算！' feedback
// 普通模式3次錯誤後 800ms 自動呼叫 _b5P1ShowHint()
```
搜尋 `_handleConfirm`、`roundErrors`、`g.roundErrors >= 3`

---

## 六、提示系統語音

### 普通/困難模式提示按鈕（_showBudgetHint，普通）
```javascript
// 有可加選商品
`還剩${toTWD(remaining)}，可以加選${nameWithPrice}`  // nameWithPrice = "NAME金額或NAME金額"

// 沒有可加選商品
`還剩${toTWD(remaining)}，沒有可以加選的商品了`
```

### 困難模式提示彈窗（_showHardModeHintModal，B3 pattern）
```javascript
// 彈窗標題「💡 預算分析」
// 語音：
`派對預算${toTWD(budget)}，已選${toTWD(total)}，還剩${toTWD(remaining)}，可以選${parts.join('或')}`
// 或（無可加選商品）
`派對預算${toTWD(budget)}，已選${toTWD(total)}，還剩${toTWD(remaining)}，沒有可加選的商品了`
```
搜尋 `_showHardModeHintModal`、`b5-hint-modal-overlay`、`b5-hm-close-btn`

---

## 七、Phase 2 付款頁語音（_renderB5Phase2）

### 進入 Phase 2 時
```javascript
// 300ms 後播放
`共消費${toTWD(total)}，請拖曳正確的金錢圖示付款。`
```

### 拖入金錢時（簡單/普通模式）
```javascript
// 播累加金額語音（toTWD(walletNow)）後 callback：
// 簡單模式：所有 ghost slot 填完 → 自動確認（300ms）
// 普通模式：金額足夠 →
`剛好！可以確認付款了！`
// 或
`金額足夠，可以確認付款了！`
```

### Ghost slot 提示按鈕（普通模式，p2ShowHint）
```javascript
`請按照提示放入正確的金錢`
```

### 付款不足（_b5P2HandleConfirm）
```javascript
`付太少了，還差${toTWD(total - wTotal)}，請再拖入金錢`
// 普通模式3次錯誤後 900ms 自動開提示彈窗（_showB5HardModeHintModal）
```

### 付款剛好
```javascript
`剛好${toTWD(wTotal)}，精準付款！`
// 700ms 後進 _b5P2ShowResult（無找零）
```

### 超付（有找零）
```javascript
`付了${toTWD(wTotal)}，需要找您${toTWD(change)}`
// 700ms 後進 _b5P2ShowChangeReturn（找零階段）
```
搜尋 `_b5P2HandleConfirm`、`_renderB5Phase2`、`b5-p2-confirm-btn`

---

## 八、找零階段語音（_b5P2ShowChangeReturn / _b5P2ConfirmChange）

### 進入找零頁
```javascript
// 頁面標題顯示找零金額，無獨立語音
// 普通模式拖入一枚金幣後：
`找為${toTWD(runningTotal)}`  // 累加語音
```

### Ghost slot 提示（普通模式3次錯誤 / 提示按鈕）
```javascript
`可以用${parts.join('，')}`  // e.g. "可以用2個50元，1個10元"
```

### 困難模式提示彈窗（_b5P2ShowChangeHintModal）
```javascript
`找零${toTWD(change)}，可以用${parts.join('，')}`
```

### 找零錯誤（_b5P2ConfirmChange）
```javascript
const b5ChangeDir = placedTotal > change ? '太多了' : '太少了';
`不對喔，找零算${b5ChangeDir}，請再試一次`
// e.g. 「不對喔，找零算太多了，請再試一次」
```

### 找零正確
```javascript
`找回${toTWD(change)}，找零完成！`
// → _b5P2ShowResult(paid, change)
```
搜尋 `b5ChangeDir`、`不對喔，找零算`、`_b5P2ConfirmChange`、`_b5P2ShowChangeGhostSlots`

---

## 九、完成畫面語音（showResults）

```javascript
// success 音效 + confetti
`太棒了！完成挑戰！`
```
搜尋 `showResults`、`isEndingGame`

---

## 十、連勝徽章語音（_showStreakBadge）

```javascript
// 3連勝
`三連勝，繼續加油！`
// 5連勝
`五連勝，太厲害了！`
```
搜尋 `_showStreakBadge`、`g.streak`

---

## 十一、搜尋關鍵字速查

| 語音類型 | 搜尋關鍵字 |
|---------|-----------|
| 歡迎畫面 | `showWelcomeScreen`、`今天要舉辦`、`b5-wc2-start-btn` |
| 關卡介紹 | `_showRoundIntroCard`、`speechMap`、`afterClose` |
| 必買朗讀 | `_speakMustItemsOneByOne`、`必買：` |
| 商品選取 | `派對採購任務`、`取消${item.name}` |
| 提示商品錯誤 | `不對喔，請選擇提示的商品` |
| 超出預算錯誤 | `不對喔，超出預算了，多了` |
| 預算提示語音 | `_showBudgetHint`、`還剩.*可以加選` |
| 困難提示彈窗 | `_showHardModeHintModal`、`b5-hint-modal-overlay` |
| Phase 2 付款 | `共消費.*請拖曳`、`_b5P2HandleConfirm` |
| 找零錯誤 | `b5ChangeDir`、`不對喔，找零算` |
| 找零提示 | `_b5P2ShowChangeGhostSlots`、`可以用` |
| 完成畫面 | `太棒了！完成挑戰` |
| 連勝徽章 | `_showStreakBadge`、`三連勝`、`五連勝` |
