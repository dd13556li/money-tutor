# 語音播放模式分析報告（Speech Pattern Report）

> **建立日期**：2026-03-06
> **分析範圍**：全部 18 個單元（A1~A6、C1~C6、F1~F6）
> **分析方法**：逐一讀取各單元 JS 檔案，擷取實際語音字串，不推測。
> **原則**：`${variable}` 保留動態內容格式；`{placeholder}` 為 speechTemplate 模板格式。

---

## 說明

### 作答模式
- **反複作答（retry）**：答錯後留在同題，允許再試。
- **單次作答（proceed/single）**：答錯後自動進入下一題。

### A 系列特性
A1~A6 為情境流程式（非問答式），無「反複/單次」答題模式概念。
語音依「操作正確/操作錯誤/情境引導」分類，無 retry/proceed 區分。

### 完成畫面函數對照
| 單元 | 完成畫面函數 |
|------|-------------|
| A1 | `showResults()` |
| A2 | `showCompletionScreen()` |
| A3 | `showPickupComplete()` → `showCompletionSummary()` |
| A4 | `showGameComplete()` → `showCompletionSummary()` |
| A5 | `generateFinalCompleteScreen()` → `showFinalResults()` |
| A6 | `showCompletionScreen()` |
| C1~C4、F1~F3 | `endGame()` |
| C5、C6 | `showResults()` |
| F4 | `completeGame()` → `showResults()` |
| F5 | `completeGame()` → `showResultsScreen()` |
| F6 | `showResults()` |

---

## A 系列

> A 系列為情境模擬，流程如下：選擇商品/服務 → 付款 → 找零（部分單元）。
> 語音分「操作語音」（流程中）與「完成語音」（全部題目結束時）。

---

### A1 自動販賣機（a1_vending_machine.js）

**任務類型**：assigned（指定商品）、freeChoice（自選）、coinFirstAssigned（先投幣指定）、coinFirstFree（先投幣自選）

#### 流程中語音

| 情境 | 語音文字 |
|------|----------|
| 付款金額不足 | `你付的錢不夠，請再試一次` |
| 付款金額過多 | `你付了太多的錢，請再試一次` |
| 交易摘要（購買後）| `購買商品：${product.name}，商品價格：${product.price}元，已付金額：${insertedAmount}元，找零金額：${change}元` |
| coinFirstAssigned 金額不足確認時 | `你投入的金額不足，還差${shortage}元，請繼續投幣` |
| coinFirstAssigned 金額過多確認時 | `你投入的金額超過商品價格了，已退幣${excess}元` |
| coinFirstAssigned 選錯飲料 | `請選擇指定的飲料：${targetName}` |
| 普通模式第1步提示（coinFirstAssigned 無亮起）| `請點選投幣口，開始投幣` |
| 普通模式第1步提示（coinFirstAssigned 有亮起）| `請點選指定的飲料：${targetName}` |
| 普通模式第1步提示（coinFirstFree 有亮起）| 高亮所有可購買飲料 |

#### 完成畫面語音（`showResults()`）

| 語音文字 |
|----------|
| `完成挑戰！共完成 ${countSpeech}，用時 ${timeDisplay}` |

> **備註**：`countSpeech` 為 `convertToQuantitySpeech()` 輸出（例：「十題」）；`timeDisplay` 為「X分Y秒」。

---

### A2 理髮廳自助機（a2_barber_shop_kiosk.js）

**語音系統**：`speechTemplates[difficulty][key]`（模板 key 系統，`{placeholder}` 格式）

#### 流程中語音（依難度）

| Key | 簡單模式（easy） | 普通模式（normal） | 困難模式（hard） |
|-----|------------|-------------|------------|
| `welcome` | `歡迎光臨百元理髮店，本機只收百元紙鈔或硬幣，不找零錢` | `歡迎使用理髮廳付款機，本機不提供找零服務，請投入正確金額` | `理髮廳付款系統就緒` |
| `paymentComplete` | `付款完成！` | `付款已完成，感謝您` | `付款完成` |
| `noChange` | `本機不找零，請投入正確金額` | `本機不提供找零服務，請確認金額後再投入` | `無找零功能` |
| `insufficient` | `金額不足，還需要{remaining}元` | `金額不足，您尚需投入{remaining}元` | `金額不足：{remaining}元` |
| `refund` | `已退回{amount}元，感謝使用` | `已退還{amount}元，請取回您的款項` | `退款：{amount}元` |
| `overpaid` | `您投入了太多錢，已退回多餘的{amount}元` | `金額超出，已退還多餘款項{amount}元` | `超額退款：{amount}元` |
| `serviceSelected` | `您選擇了{service}，費用{price}元` | `已選擇{service}服務，費用為{price}元` | `服務：{service}，{price}元` |
| `ticketIssued` | `取號成功！您的號碼牌是{number}號，請稍候等候叫號` | `取號完成，您的號碼為{number}，請在等候區等待` | `號碼：{number}` |

#### 完成畫面語音（`showCompletionScreen()`）

| 語音文字 |
|----------|
| `完成挑戰！共完成 ${countSpeech}，用時 ${timeDisplay}` |

> **備註**：A2 無找零步驟（「本機不找零」為核心設計），故無找零相關正確/錯誤語音。

---

### A3 麥當勞點餐機（a3_mcdonalds_order.js）

**語音系統**：`speechTemplates[difficulty][key]`（模板 key 系統）

#### 流程中語音（依難度）

| Key | 簡單模式（easy） | 普通模式（normal） | 困難模式（hard） |
|-----|------------|-------------|------------|
| `welcome` | `歡迎光臨麥當勞，請開始點餐` | `歡迎使用自助點餐機` | `點餐開始` |
| `itemAdded` | `好的，已加入訂單` | `已加入購物車` | `已加入` |
| `wrongItem` | `這不是指定的餐點，請重新選擇` | `請選擇指定的餐點` | `餐點不符` |
| `overBudget` | `錢不夠，請選擇較便宜的餐點或刪除購物車中的餐點` | `金額超出預算，請調整您的選擇` | `超出預算` |
| `orderComplete` | `訂單完成，準備付款` | `訂單已確認` | `結帳` |
| `paymentInsufficient` | （簡單模式自動付款，無此語音）| `付款金額不足，請再加入金錢` | `付款金額不足` |
| `paymentOverpaid` | （簡單模式自動付款，無此語音）| `付款金額過多，請拿回多餘的錢` | `付款金額過多` |
| `paymentCorrect` | （簡單模式自動付款，無此語音）| `付款成功！` | `已付款` |
| `changeCorrect` | （簡單模式自動找零，無此語音）| `找零正確！` | `找零完成` |
| `changeWrong` | （簡單模式自動找零，無此語音）| `找零金額不正確，請重新確認` | `找零錯誤` |

#### 完成畫面語音（`showCompletionSummary()`，key: `completeChallenge`）

| 難度 | 語音文字 |
|------|----------|
| 簡單（easy） | `恭喜完成{completedCount}題挑戰，共花了{timeDisplay}` |
| 普通（normal） | `太棒了，完成{completedCount}題挑戰，共花了{timeDisplay}` |
| 困難（hard） | `完成{completedCount}題挑戰，共花了{timeDisplay}` |

---

### A4 超市購物（a4_simulated_shopping.js）

**語音系統**：直接字串（部分用 `convertToTraditionalCurrency()`）

#### 流程中語音

| 情境 | 語音文字 |
|------|----------|
| 付款金額計算 | `你總共付了${paidAmount}` |
| 付款不足 | `付款金額不足，請繼續付款` |
| 付款過多 | `你付了太多的錢，請拿回多餘的錢` |
| 找零正確 | `找零正確！` |
| 找零不正確（retry）| `找零金額不正確，請重新確認` |
| 找零不正確（proceed）| `找零金額不正確，進入下一題` |

#### 完成畫面語音（`showCompletionSummary()`）

| 語音文字 |
|----------|
| `完成挑戰！共完成 ${countSpeech}，用時 ${timeDisplay}` |

---

### A5 ATM 模擬（a5_atm_simulator.js）

**語音系統**：直接字串 + 情境語音（依交易類型：withdraw/deposit/inquiry/transfer）

#### 流程中語音（依操作）

| 情境 | 語音文字 |
|------|----------|
| PIN 碼錯誤 | `密碼錯誤，請重新輸入` |
| PIN 碼正確 | `密碼正確` |
| 操作選擇 | 依選項動態生成 |
| 提款金額選擇正確 | `你選了${amount}元` |
| 提款金額選擇錯誤 | `請選擇正確的金額` |
| 取款成功 | 情境語音 |
| 存款金額不足 | `金額不足，請確認後再試` |
| 轉帳資訊錯誤 | `資料有誤，請重新輸入` |
| 取卡提示 | `請取回您的金融卡` |

#### 完成畫面語音（`showFinalResults()`）

| 語音文字 |
|----------|
| `完成挑戰！共完成 ${countSpeech}，用時 ${timeDisplay}` |

---

### A6 火車票售票機（a6_train_ticket.js）

**語音系統**：直接字串

#### 流程中語音

| 情境 | 語音文字 |
|------|----------|
| 付款金額不足 | `付款金額不足，請繼續付款` |
| 付款金額過多 | `你付了太多的錢，請再試一次` |
| 找零放置正確（最後一枚）| `已找回${cumulativeTotal}` → callback → `太棒了！找零金額正確！` |
| 找零放置錯誤 | `不對，請再試一次` |
| 按鈕點擊音效 | `click.mp3`（音效，非語音） |

#### 完成畫面語音（`showCompletionScreen()`）

| 語音文字 |
|----------|
| **（無語音，直接進入）** — 僅播放 `success.mp3` 音效 + confetti |

---

## C 系列

> C 系列為問答式，支援「反複作答（retry）」與「單次作答（proceed）」模式。
> `endingText` 為動態結尾：非最後題 = `進入下一題`；最後題 = `測驗結束`。
> 金額語音使用 `NumberSpeechUtils.convertToTraditionalCurrency()` 轉換（例：「十五元」）。

---

### C1 認識錢幣（c1_money_types.js）

#### 答題語音

| 模式 | 答對語音 | 答錯語音（反複作答 retry）| 答錯語音（單次作答 proceed）|
|------|----------|------------------------|--------------------------|
| 簡單（easy） | 同普通 | 同普通 | 同普通 |
| 普通（normal）| `恭喜你答對了，進入下一題` 或 `恭喜你答對了，測驗結束` | `答錯了，再試一次` | ①`對不起你答錯了，你選擇的是${traditionalSelectedAnswer}` → ②`這才是${traditionalCorrectAnswer}，${endingText}` |
| 困難（hard） | 同普通 | 同普通 | 同普通 |

#### 完成畫面語音（`endGame()`）

| 正確率 | 語音文字 |
|--------|----------|
| 100% | `太厲害了，全部答對了！` |
| ≥80% | `很棒喔，答對了${correctAnswers}題！` |
| ≥60% | `不錯喔，答對了${correctAnswers}題！` |
| <60% | `要再加油喔，答對了${correctAnswers}題。` |

> **備註**：C1 的簡單/普通/困難在答題語音上無差異，但題目類型不同（簡單=認硬幣，普通/困難=選擇題）。

---

### C2 數錢（c2_money_counting.js）

#### 答題語音（數錢模式）

**輸入模式（直接輸入金額）**：

| 情境 | 語音文字 |
|------|----------|
| 輸入完成（數完所有金幣）| `太棒了，你數完了，總共是 ${traditionalTotal}` |
| 答對（選擇答案模式） | `恭喜你答對了，總共是 ${traditionalTotal}，${endingText}` |
| 答錯（retry，選擇答案）| `答錯了，再試一次` |
| 答錯（proceed，選擇答案）| ①`對不起你答錯了，你選擇的是${selectedValue}元` → ②`${correctTotal}元才是正確答案，${endingText}` |
| 答錯（proceed，輸入模式）| `對不起你答錯了，正確答案是 ${correctTotal}元，${endingText}` |

#### 完成畫面語音（`endGame()`）

| 正確率 | 語音文字 |
|--------|----------|
| 100% | `太厲害了，全部答對了！` |
| ≥80% | `很棒喔，答對了${correctAnswers}題！` |
| ≥60% | `不錯喔，答對了${correctAnswers}題！` |
| <60% | `要再加油喔，答對了${correctAnswers}題。` |

---

### C3 換錢（c3_money_exchange.js）

**語音系統**：`speechTemplates[difficulty][key]`（模板 key 系統）

#### 答題語音（依難度）

**簡單模式（easy）**：

| 情境 | Key | 語音文字 |
|------|-----|----------|
| 大換小 答對 | `exchangeComplete` | `答對了，{sourceCount}個{sourceName}換到1個{targetName}` |
| 小換大 答對 | `exchangeComplete` | `答對了，1個{sourceName}換到{targetCount}個{targetName}` |
| 全部兌換完成 | `allRoundsComplete` | `恭喜你，{totalSource}個{sourceName}，共換到{totalTarget}個{targetName}` |
| 答錯 | `error` | `對不起，你答錯了，是{expectedCount}個{sourceName}換1個{targetName}，你剛剛放了{actualCount}個{sourceName}，請繼續下一題` |

**普通模式（normal）**：

| 情境 | Key | 語音文字 |
|------|-----|----------|
| 每輪完成 | `exchangeComplete` | `{sourceCount}個{sourceName}換到{targetCount}個{targetName}` |
| 輪與輪之間 | （直接字串）| `答對，進入下一輪兌換` |
| 答錯（retry）| `error` | `對不起，你答錯了...請重新試試` |
| 答錯（proceed）| `error` | `對不起，你答錯了...請繼續下一題` |

**困難模式（hard）**：

| 情境 | Key | 語音文字 |
|------|-----|----------|
| 兌換完成 | `exchangeComplete` | `{sourceCount}個{sourceName}換到{targetCount}個{targetName}` |
| 答錯（retry）| `error` | `對不起，你答錯了...請重新試試` |
| 答錯（proceed）| `error` | `對不起，你答錯了...請繼續下一題` |

> **備註**：普通模式每題固定 1 輪兌換（`totalExchanges = 1`）。

#### 完成畫面語音（`endGame()`）

| 語音文字 |
|----------|
| `恭喜完成所有題目` |

---

### C4 付款（c4_correct_amount.js）

#### 答題語音

| 模式 | 答對語音 | 答錯語音（反複作答 retry）| 答錯語音（單次作答 proceed）|
|------|----------|------------------------|--------------------------|
| 簡單（easy） | `恭喜你答對了，總共是${traditionalAmount}，${endingText}` | `對不起，你答錯了，請再試一次` | `對不起你答錯了，${endingText}` |
| 普通（normal）| 同簡單 | 同簡單 | 同簡單 |
| 困難（hard） | 同簡單 | 同簡單 | 同簡單 |

> **備註**：C4 三種難度的答題語音邏輯相同，差異在於題目本身的組合複雜度。

#### 完成畫面語音（`displayResultsWindow()` → `speakResults()`）

| 語音文字 |
|----------|
| `恭喜你完成全部測驗，答對${correctAnswers}題，${performanceText}` |

`performanceText` 對照：
| 正確率 | performanceText |
|--------|----------------|
| ≥90% | `你的表現優異` |
| ≥70% | `你的表現良好` |
| ≥50% | `你還需努力` |
| <50% | `請你多加練習` |

---

### C5 夠不夠（c5_sufficient_payment.js）

C5 有兩種題型：
- **自動判斷**（auto）：系統自動計算錢包金額是否足夠，學生點選「夠/不夠」回答
- **手動判斷**（manual）：學生自行點擊硬幣湊出金額，再回答「夠/不夠」

#### 答對語音

| 模式 | 題型 | 答對語音 |
|------|------|----------|
| 全部 | auto（錢夠） | `恭喜你答對了！你的錢總共${currentTotal}元，可以買${itemPrice}元的${itemName}！${endingText}` |
| 全部 | auto（錢不夠）| `恭喜你答對了！你的錢總共${currentTotal}元，不能購買${itemPrice}元的${itemName}，${endingText}` |
| 全部 | manual（錢夠）| `恭喜你答對了！你的錢夠買${itemPrice}元的物品！${endingText}` |
| 全部 | manual（錢不夠）| `恭喜你答對了！你的錢不夠買${itemPrice}元的物品！${endingText}` |

#### 答錯語音

| 模式 | 題型 | 答錯（retry）| 答錯（proceed）|
|------|------|-------------|---------------|
| 全部 | auto（實際夠，答不夠）| `不好意思，你的錢總共${currentTotal}元，可以購買${itemPrice}元的${itemName}！請再試一次` | `不好意思，你的錢總共${currentTotal}元，可以購買${itemPrice}元的${itemName}！正確答案：${correctAnswerHint}，${endingText}` |
| 全部 | auto（實際不夠，答夠）| `不好意思，你的錢總共${currentTotal}元，不能購買${itemPrice}元的${itemName}！請再試一次` | `不好意思，你的錢總共${currentTotal}元，不能購買${itemPrice}元的${itemName}！正確答案：${correctAnswerHint}，${endingText}` |
| 全部 | manual（錢不夠，答夠）| `錯誤！你的錢不夠買${itemPrice}元的物品！請再試一次` | `錯誤！你的錢不夠買${itemPrice}元的物品！正確答案：${correctAnswerHint}，${endingText}` |

#### 完成畫面語音（`showResults()`）

| 語音文字 |
|----------|
| `恭喜你完成全部測驗，答對${correctAnswers}題，${performanceText}` |

`performanceText` 同 C4（≥90% 優異 / ≥70% 良好 / ≥50% 努力 / <50% 練習）。

---

### C6 找零（c6_making_change.js）

C6 分兩步驟：**步驟1（付款）** 與 **步驟2（選擇找零）**。

#### 步驟1（付款）語音

| 情境 | 模式 | 語音文字 |
|------|------|----------|
| 付款成功，繼續步驟2 | 全部 | `你付了${paidAmount}元` |
| 付款不足（retry） | 普通 | `還需要${neededAmount}元，請繼續付款` |
| 付款不足（retry） | 困難 | `你付的錢不夠，請再試一次` |
| 付款不足（proceed）| 全部 | `對不起你答錯了，你付的錢不夠，還需要${neededAmount}元，${endingText}` |
| 付款過多有更優選擇（retry）| 普通 | `${returnMessage}`（說明可退回金額） |
| 付款過多有更優選擇（retry）| 困難 | `你付的錢太多了，請再試一次` |
| 付款過多有更優選擇（proceed）| 全部 | `對不起你答錯了，存在更優的付款方式，${endingText}` |

#### 步驟2（選擇找零）語音

| 情境 | 答對語音 | 答錯語音（retry）| 答錯語音（proceed）|
|------|----------|----------------|------------------|
| 找零選擇 | `恭喜你答對了，找回${changeAmount}元，${endingText}` | ①`不對，你選的是${changeAmount}元` → ②`正確的找零應該是${correctAmount}元，${endingText}` → 留在同題 | ①`不對，你選的是${changeAmount}元` → ②`正確的找零應該是${correctAmount}元，${endingText}` → 自動前進 |

> **備註**：步驟2的「答對/答錯」計入總題數統計。步驟1付款過多若已是最優解則視為正確。

#### 完成畫面語音（`showResults()`）

| 語音文字 |
|----------|
| `恭喜你完成全部測驗，答對${correctAnswers}題，${performanceText}` |

`performanceText` 同 C4（≥90% 優異 / ≥70% 良好 / ≥50% 努力 / <50% 練習）。

---

## F 系列

> F 系列為數學基礎問答式，使用 `ModeConfig[difficulty].speechTemplates[key]` 模板系統（F1~F5），或 `NumberCompositionConfig.speech` 物件（F6）。
> retry/proceed 模式影響答錯後的流程，但不一定影響語音文字本身（部分單元相同）。

---

### F1 一對一對應（f1_object_correspondence.js）

**語音系統**：`ModeConfig[difficulty].speechTemplates[key]`（模板 key 系統）

#### 答題語音（依難度）

**簡單模式（easy）**：

| 情境 | Key | 語音文字 |
|------|-----|----------|
| 每個圖示放置正確 | `correctPlacement` | `排對了！` |
| 一輪全部完成 | `turnComplete` | `全部都排好了，你真棒！` |

**普通模式（normal）**：

| 情境 | Key | 語音文字 |
|------|-----|----------|
| 放置完成後確認（答對）| `correct` | `答對了！正確答案是 {targetCount} 個` |
| 放置完成後確認（答錯）| `incorrect` | `數量不正確，您放置了 {targetCount} 個，正確答案是 {correctAnswer} 個` |

**困難模式（hard）**：

| 情境 | Key | 語音文字 |
|------|-----|----------|
| 一組放置完成（答對）| `correct` | `答對了，太棒了！` |
| 全組完成 | `turnComplete` | `全部都對了，真厲害！` |
| 答錯 | `incorrect` | `不對喔，請檢查目標和您放置的物品，再試一次！` |

> **備註**：F1 的 retry/proceed 在簡單模式無意義（拖曳放置模式，無選擇按鈕）；普通/困難模式答錯語音相同，皆要求「再試一次」。

#### 完成畫面語音（`endGame()`）

| 語音文字 |
|----------|
| **（無語音，直接進入）** — 僅播放 `success` 音效 + confetti |

---

### F2 數數（f2_rote_and_rational_counting.js）

**語音系統**：`ModeConfig[difficulty].speechTemplates[key]`（模板 key 系統）

#### 答題語音（依難度）

**簡單模式（easy）**：
> 簡單模式為觀察/點選流程，無選項式問答，無「答對/答錯」概念。

**普通模式（normal）**：

| 情境 | Key | 語音文字 |
|------|-----|----------|
| 答對 | `correct` | `答對了！正確答案是 {answer}` |
| 答錯（retry）| `incorrect` | `答錯了，再試一次！` |
| 答錯（proceed）| `incorrectWithAnswer` | `答錯了，正確答案是 {answer}` |

**困難模式（hard）**：

| 情境 | Key | 語音文字 |
|------|-----|----------|
| 答對 | `correct` | `答對了！正確答案是 {answer}` |
| 答錯（retry）| `incorrect` | `答錯了，再試一次！` |
| 答錯（proceed）| `incorrectWithAnswer` | `答錯了，正確答案是 {answer}` |

> **備註**：F2 普通/困難模式語音相同。

#### 完成畫面語音（`endGame()`）

| 語音文字 |
|----------|
| `你真棒！`（`encouragement` template） |

---

### F3 數字認讀（f3_number_recognition.js）

**語音系統**：`ModeConfig[difficulty].speechTemplates[key]`（模板 key 系統）

#### 答題語音（依難度）

**簡單模式（easy）**：

| 情境 | Key | 語音文字 |
|------|-----|----------|
| 答對 | `correct` | `答對了！你真棒！` |
| 答錯 | `incorrect` | `不對喔，你放了{userAnswer}個，正確答案是{answer}，請再試一次` |

**普通模式（normal）**：

| 情境 | Key | 語音文字 |
|------|-----|----------|
| 答對 | `correct` | `答對了！正確答案是 {answer}。` |
| 答錯（含 retry 和 proceed）| `incorrect` | `不對喔，你放了{userAnswer}個，正確答案是{answer}，請再試一次` |
| 提示（使用提示按鈕後）| `hint` | `目前總共{currentCount}個，{hintMessage}` |

**困難模式（hard）**：

| 情境 | Key | 語音文字 |
|------|-----|----------|
| 答對 | `correct` | `答對了！正確答案是 {answer}。` |
| 答錯（含 retry 和 proceed）| `incorrect` | `不對喔，你放了{userAnswer}個，正確答案是{answer}，請再試一次` |
| 提示 | `hint` | `目前總共{currentCount}個，{hintMessage}` |

> **備註**：F3 的 retry/proceed 差異在流程控制（留題或前進），但語音文字相同。

#### 完成畫面語音（`endGame()`，key: `gameComplete`）

| 難度 | 語音文字 |
|------|----------|
| 簡單（easy） | `恭喜你完成了所有題目！` |
| 普通（normal）| `太棒了！你完成了所有題目！` |
| 困難（hard） | `恭喜你完成挑戰！` |

---

### F4 數字排序（f4_number_sorting.js）

**語音系統**：`ModeConfig[difficulty].speechTemplates[key]`（模板 key 系統）

#### 答題語音（依難度）

**簡單模式（easy）**（自動鎖定排序，無選擇題）：

| 情境 | Key | 語音文字 |
|------|-----|----------|
| 一關完成（非最後關）| `levelComplete` | `恭喜你答對了，進入下一題` |
| 最後一關完成 | `levelCompleteLast` | `恭喜你答對了，測驗結束` |

**普通模式（normal）**：

| 情境 | Key | 語音文字 |
|------|-----|----------|
| 答對（非最後題）| `correct` | `恭喜你答對了，進入下一題` |
| 答對（最後題）| `correctLast` | `恭喜你答對了，測驗結束` |
| 答錯（retry）| `incorrect` | `對不起，有錯誤喔，請再試一次。` |
| 答錯（proceed，非最後題）| `incorrectSingle` | `對不起你答錯了，進入下一題` |
| 答錯（proceed，最後題）| `incorrectSingleLast` | `對不起你答錯了，測驗結束` |

**困難模式（hard）**：

| 情境 | Key | 語音文字 |
|------|-----|----------|
| 答對（非最後題）| `correct` | `恭喜你答對了，進入下一題` |
| 答對（最後題）| `correctLast` | `恭喜你答對了，測驗結束` |
| 答錯（retry）| `incorrect` | `對不起，有錯誤喔，請再試一次。` |
| 答錯（proceed，非最後題）| `incorrectSingle` | `對不起你答錯了，進入下一題` |
| 答錯（proceed，最後題）| `incorrectSingleLast` | `對不起你答錯了，測驗結束` |

#### 完成畫面語音（`completeGame()` → `showResults()`，key: `complete`）

| 語音文字 |
|----------|
| `恭喜完成所有題目！` |

---

### F5 量比較（f5_quantity_comparison.js）

**語音系統**：`ModeConfig[difficulty].speechTemplates[key]`（模板 key 系統）

#### 答題語音（依難度）

**簡單模式（easy）**：

| 情境 | Key | 語音文字 |
|------|-----|----------|
| 答對 | `correct` | `太棒了，答對了！` |
| 答錯 | `incorrect` | `再試試看，仔細觀察兩邊的數量` |

> **備註**：F5 簡單模式隱藏「測驗模式」選項，預設為 retry 模式。

**普通模式（normal）**：

| 情境 | Key | 語音文字 |
|------|-----|----------|
| 答對 | `correct` | `太棒了，你數對了也比較對了！` |
| 答錯（retry）| `incorrect` | `再仔細數數看，然後比較大小` |
| 答錯（proceed，非最後題）| （直接字串）| `對不起，你答錯了，進入下一題` |
| 答錯（proceed，最後題）| （直接字串）| `對不起，你答錯了，測驗結束` |

> **備註**：普通模式 proceed 的語音由 `isLastLevel` 條件分支控制。

**困難模式（hard）**：

| 情境 | Key | 語音文字 |
|------|-----|----------|
| 答對（含正確值）| `correctWithAnswer` | `答對了，較{comparisonType}的數字是{correctAnswer}` |
| 答對（一般）| `correct` | `答對了！繼續保持！` |
| 答錯（retry，直接選錯）| `incorrect` | `對不起，你答錯了，請再試一次` |
| 答錯（proceed，非最後題）| （直接字串）| `對不起，你答錯了，進入下一題` |
| 答錯（proceed，最後題）| （直接字串）| `對不起，你答錯了，測驗結束` |
| 答錯後系統顯示正確答案 | `incorrectWithAnswer` | `答案不正確，正確答案是{correctAnswer}` |

#### 完成畫面語音（`completeGame()` → `showResultsScreen()`，key: `complete`）

| 難度 | 語音文字 |
|------|----------|
| 簡單（easy） | `恭喜完成所有題目！` |
| 普通（normal）| `恭喜完成所有題目！` |
| 困難（hard） | `恭喜完成所有題目！` |

---

### F6 數的組成（f6_number_composition.js）

**語音系統**：`NumberCompositionConfig.speech` 物件（直接字串陣列 + 模板字串）

語音設定（位於 config 物件）：
```javascript
correct: ['答對了！', '很棒！', '正確！', '太好了！'],
incorrect: ['再想想看', '不對喔，再試一次', '加油！'],
incorrectWithAnswer: '不對，正確的答案是 {answer}',
complete: '恭喜你完成所有題目！'
```

#### 答題語音（依題型）

**組合模式（composition）— 兩數相加**：

| 情境 | 語音文字 |
|------|----------|
| 答對（非最後題）| `恭喜你答對了，${a} 加 ${b} 等於 ${c}，進入下一題` |
| 答對（最後題）| `恭喜你答對了，${a} 加 ${b} 等於 ${c}，測驗結束` |
| 答錯（retry）| 從陣列隨機：`再想想看` / `不對喔，再試一次` / `加油！` |
| 答錯（proceed）| `不對，正確的答案是 ${convertedAnswer}，${endingText}` |

**分解模式（decomposition）— 一數拆兩數**：

| 模式 | 情境 | 語音文字 |
|------|------|----------|
| 普通/簡單 | 答對 | `恭喜你答對了，${totalAnswer} 可以分成 ${leftAnswer} 和 ${rightAnswer}${endingText}` |
| 困難 | 答對 | `答對了，${totalAnswer} 可分成 ${leftAnswer} 跟 ${rightAnswer}` |

**填空模式（fillBlank）**：

| 情境 | 語音文字 |
|------|----------|
| 答對（易）| `恭喜你答對了，${knownCount} 加 ${correctAnswer} 等於 ${totalAnswer}${endingText}` |
| 答錯（retry）| 從陣列隨機：`再想想看` / `不對喔，再試一次` / `加油！` |
| 答錯（proceed）| `不對，正確的答案是 ${convertedAnswer}${endingText}` |
| 簡單模式答錯 | 從陣列隨機：`再想想看` / `不對喔，再試一次` / `加油！` |

#### 完成畫面語音（`showResults()`）

| 語音文字 |
|----------|
| `恭喜你完成所有題目！` |

---

## 語音文字統整表

### 完成畫面語音快速對照

| 單元 | 完成畫面語音 |
|------|-------------|
| A1 | `完成挑戰！共完成 ${countSpeech}，用時 ${timeDisplay}` |
| A2 | `完成挑戰！共完成 ${countSpeech}，用時 ${timeDisplay}` |
| A3 easy | `恭喜完成{completedCount}題挑戰，共花了{timeDisplay}` |
| A3 normal | `太棒了，完成{completedCount}題挑戰，共花了{timeDisplay}` |
| A3 hard | `完成{completedCount}題挑戰，共花了{timeDisplay}` |
| A4 | `完成挑戰！共完成 ${countSpeech}，用時 ${timeDisplay}` |
| A5 | `完成挑戰！共完成 ${countSpeech}，用時 ${timeDisplay}` |
| A6 | **（無語音）** |
| C1 | 依正確率：`太厲害了，全部答對了！` / `很棒喔，答對了${n}題！` / `不錯喔，答對了${n}題！` / `要再加油喔，答對了${n}題。` |
| C2 | 同 C1 |
| C3 | `恭喜完成所有題目` |
| C4 | `恭喜你完成全部測驗，答對${n}題，${performanceText}` |
| C5 | 同 C4 |
| C6 | 同 C4 |
| F1 | **（無語音）** |
| F2 | `你真棒！` |
| F3 easy | `恭喜你完成了所有題目！` |
| F3 normal | `太棒了！你完成了所有題目！` |
| F3 hard | `恭喜你完成挑戰！` |
| F4 | `恭喜完成所有題目！` |
| F5 | `恭喜完成所有題目！` |
| F6 | `恭喜你完成所有題目！` |

### 答錯語音模式分析

#### retry 模式（反複作答）

| 單元 | retry 答錯語音特點 |
|------|-----------------|
| C1 | `答錯了，再試一次` |
| C2 | `答錯了，再試一次` |
| C3 easy | 說明錯誤原因 + 自動前進（easy 無純 retry）|
| C3 normal/hard | `對不起，你答錯了...請重新試試` |
| C4 | `對不起，你答錯了，請再試一次` |
| C5 auto | 說明金額總計 + `請再試一次` |
| C5 manual | `錯誤！你的錢不夠買...！請再試一次` |
| C6 步驟2 | `不對，你選的是X元` → `正確是Y元，...` → 留題 |
| F2 | `答錯了，再試一次！` |
| F3 | `不對喔，你放了X個，正確是Y個，請再試一次`（retry/proceed 語音相同）|
| F4 | `對不起，有錯誤喔，請再試一次。` |
| F5 easy | `再試試看，仔細觀察兩邊的數量` |
| F5 normal | `再仔細數數看，然後比較大小` |
| F5 hard | `對不起，你答錯了，請再試一次` |
| F6 | 從陣列隨機選：`再想想看` / `不對喔，再試一次` / `加油！` |

#### proceed 模式（單次作答）

| 單元 | proceed 答錯語音特點 |
|------|-------------------|
| C1 | ①說出選錯的選項 → ②說出正確答案 + endingText |
| C2 | 選擇：①說出選錯的選項 → ②說出正確答案 + endingText；輸入：直接 `答錯了，正確答案是X元，${endingText}` |
| C3 normal/hard | `對不起，你答錯了...請繼續下一題` |
| C4 | `對不起你答錯了，${endingText}` |
| C5 auto | 說明金額 + `正確答案：X，${endingText}` |
| C5 manual | `錯誤！你的錢不夠買...！正確答案：X，${endingText}` |
| C6 步驟2 | `不對，你選的是X元` → `正確是Y元，...` → 自動前進 |
| F2 | `答錯了，正確答案是 {answer}` |
| F4 | `對不起你答錯了，進入下一題` / `對不起你答錯了，測驗結束` |
| F5 | `對不起，你答錯了，進入下一題` / `對不起，你答錯了，測驗結束` |
| F6 | `不對，正確的答案是 ${convertedAnswer}${endingText}` |

---

*報告結束*
