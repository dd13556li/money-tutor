# B6 菜市場買菜 — 語音內容

> 資料來源：`js/b6_market_shopping.js`
> 匯出日期：2026-04-23

---

## 一、歡迎畫面語音（showWelcomeScreen，2頁式）

### 第1頁
```javascript
// 市場動畫後自動播放（圖示使用 B4 商店圖示：icon-b4-store-traditional-market.png / icon-b4-store-supermarket.png / icon-b4-store-nightmarket.png）
`歡迎來到${mkt.name}！`
// 語音結束後 500ms → 轉第2頁
```

### 第2頁
```javascript
// 顯示預算 + 攤位需求
`今日預算${mission.budget}元，${stallsSpeech}`
// stallsSpeech 由攤位列表合成，例：「蔬菜攤選1樣，雜貨攤選1樣」

// 點「開始購物 🛍️」
`開始購物`  // 語音結束後進入 renderRound()
```
搜尋 `showWelcomeScreen`、`b6-wc2-start-btn`、`stallsSpeech`

---

## 二、任務介紹彈窗語音（_showMissionIntroModal）

### 彈窗開啟時播放
```javascript
// 第1關：「歡迎來到市場！」前綴；其他關無前綴
`${welcomePrefix}${stallsText}，預算${mission.budget}元。`
// stallsText：「蔬菜攤、水果攤」列表文字
```

### easy 模式：afterClose → _speakMissionItemsOneByOne
```javascript
// 逐一朗讀攤位需求
`${req.name}，選${toCountSpeech(req.count)}樣`  // 每項 80ms 間隔

// 全部唸完後 300ms
`共要選${toCountSpeech(totalCount)}樣商品，準備出發！`
```
搜尋 `_showMissionIntroModal`、`_speakMissionItemsOneByOne`、`準備出發`、`afterClose`

---

## 三、Phase 1 購物頁語音

### 選取商品（成功選購）
```javascript
`${itemName}，${price}元`
// + 若本攤位需求已達成且全部攤位完成：
`所有商品選購完成，可以去結帳了！`
// + easy 模式：結帳按鈕 classList.add('b6-product-here-hint')
```

### 攤位完成更新（_updateMissionStatus suppressCompletion=false）
```javascript
`所有商品選購完成，可以去結帳了！`
```

### 提示模式限制（簡單模式 p1HintMode）
```javascript
`不對喔，請選擇提示的商品`
```

### 連勝徽章（3連勝/5連勝）
```javascript
`三連勝，繼續加油！`
`五連勝，太厲害了！`
```
搜尋 `_showStreakBadge`、`g.streak`

---

## 四、提示系統語音（Phase 1）

### 困難模式提示彈窗（_b6P1ShowHardHintModal / B3 pattern）
```javascript
// 彈窗「💡 購物建議清單」
// 語音（逐項按鈕 data-speech 屬性）：各商品項目
```

### Ghost slot 提示（普通模式3次錯誤自動 / 提示鈕）
```javascript
`可以用${parts.join('，')}`
// 此語音由 _b6P2ShowChangeGhostSlots 使用（找零頁），
// Phase 1 提示模式的商品語音由 data-speech 屬性驅動，非統一 Speech.speak 字串
```
搜尋 `b6-p1-hint-btn`、`_b6P1ActivateHintMode`、`b6-hint-here`、`b6-p1hh-modal`

---

## 五、Phase 2 付款頁語音（_renderB6P2 / _b6P2AddCoin）

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

### Ghost slot 提示按鈕（普通模式）
```javascript
`請按照提示放入正確的金錢`
```

### 付款不足（_b6P2HandleConfirm）
```javascript
`付太少了，還差${toTWD(total - wTotal)}，請再拖入金錢`
// 普通模式3次付款錯誤後 900ms 自動開提示彈窗（_showHardModeHintModal）
```

### 剛好付清
```javascript
`剛好${toTWD(wTotal)}，買菜成功！`
// 400ms 後進 _showChangeResult（無找零）
```

### 超付（有找零）
```javascript
`付了${toTWD(wTotal)}`
// 400ms 後進 _b6P2ShowChangeReturn（找零階段）
```
搜尋 `_b6P2HandleConfirm`、`共消費.*請拖曳`、`b6p2-wallet-coins`

---

## 六、找零階段語音（_b6P2ShowChangeReturn / _b6P2ConfirmChange）

### 進入找零頁
```javascript
// 進入找零頁時
`找您${toTWD(change)}，請把找回的金錢，拖曳到我的錢包`
```

### 普通/困難模式拖入一枚金幣時（簡單模式靜音，diff !== 'easy'）
```javascript
`找回${toTWD(runningTotal)}`
```

### Ghost slot 提示（普通模式3次錯誤 / 提示按鈕）
```javascript
`可以用${parts.join('，')}`  // e.g. "可以用2個50元，1個10元"
```

### 困難模式提示彈窗（_b6P2ShowChangeHintModal）
```javascript
`找零${toTWD(change)}，可以用${parts.join('，')}`
```

### 找零錯誤（_b6P2ConfirmChange）
```javascript
const b6ChangeDir = placedTotal > change ? '太多了' : '太少了';
`不對喔，找零算${b6ChangeDir}，請再試一次`
// e.g. 「不對喔，找零算太少了，請再試一次」
// 普通模式3次錯誤後 900ms 自動 _b6P2ShowChangeGhostSlots(change)
// 困難模式：保留錢包內容，不清空
```

### 找零正確
```javascript
`找回${toTWD(change)}，找零完成！`
// + confetti → _showChangeResult(paid, change)
```
搜尋 `b6ChangeDir`、`不對喔，找零算`、`_b6P2ConfirmChange`、`_b6P2ShowChangeGhostSlots`

---

## 七、完成畫面語音（showResults）

```javascript
// success 音效 + confetti
`太棒了！完成挑戰！`
```
搜尋 `showResults`、`isEndingGame`

---

## 八、找零頁面面額選擇邏輯

```javascript
// 依找零金額決定托盤面額組合：
if (change <= 100)      trayDenoms = [50, 10, 5, 1];
else if (change < 1000) trayDenoms = [500, 100, 50, 10, 5, 1];
else                    trayDenoms = [1000, 500, 100, 50, 10, 5, 1];
```

---

## 九、搜尋關鍵字速查

| 語音類型 | 搜尋關鍵字 |
|---------|-----------|
| 歡迎畫面 | `showWelcomeScreen`、`歡迎來到`、`b6-wc2-start-btn` |
| 任務介紹 | `_showMissionIntroModal`、`stallsText`、`afterClose` |
| 逐項朗讀 | `_speakMissionItemsOneByOne`、`準備出發` |
| 商品選取完成 | `所有商品選購完成，可以去結帳了` |
| 提示商品錯誤 | `不對喔，請選擇提示的商品` |
| Phase 2 付款 | `共消費.*請拖曳`、`_b6P2HandleConfirm` |
| 付款提示 | `剛好！可以確認付款了`、`金額足夠，可以確認付款了` |
| 找零進入語音 | `找您.*請把找回的金錢` |
| 找零累加語音 | `找回${toTWD`、`diff !== 'easy'` |
| 找零錯誤 | `b6ChangeDir`、`不對喔，找零算` |
| 找零提示 ghost | `_b6P2ShowChangeGhostSlots`、`可以用` |
| 找零彈窗提示 | `_b6P2ShowChangeHintModal`、`找零.*可以用` |
| 完成畫面 | `太棒了！完成挑戰` |
| 連勝徽章 | `_showStreakBadge`、`三連勝`、`五連勝` |
