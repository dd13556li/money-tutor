# A5 ATM 提款機 — 語音內容

> 資料來源：`js/a5_atm_simulator.js`
> 匯出日期：2026-04-23

---

## 一、語音系統

A5 使用 `convertAmountToSpeech(amount)` 處理金額語音（同 A1/A2）。

---

## 二、歡迎語音

```javascript
'歡迎使用 ATM 自動提款機！請將金融卡插入卡片插槽'
```

---

## 三、步驟語音（easy 模式逐步引導）

```javascript
// 步驟 1：插入金融卡
'請將金融卡插入卡片插槽'

// 步驟 2：輸入密碼
'請輸入您的 4 位數密碼（密碼為 1234）'

// 步驟 3：選擇交易
'請選擇您要進行的交易類型'

// 步驟 4：提款金額
`請選擇提款金額：${convertAmountToSpeech(amount)}`

// 步驟 5：確認交易
'請確認交易內容，點擊確認'

// 步驟 6：取鈔
'交易完成！請取走您的現金'

// 步驟 7：退卡
'請取走您的金融卡'
```

---

## 四、指定任務語音

```javascript
// 系統指定交易類型時
`今天要進行${transactionTypeName}，請依照步驟操作`
```

> 搜尋：`showTaskReminderModal`（2026-03-29 修復錯誤類型）

---

## 五、提款語音

```javascript
// 提款金額確認
`您要提款${convertAmountToSpeech(amount)}，請確認`

// 取鈔動畫語音
`已提款${convertAmountToSpeech(amount)}，請取走現金`
```

---

## 六、存款語音

```javascript
// 引導放入鈔票
'請將鈔票放入存款口'

// 確認存款
`存款${convertAmountToSpeech(amount)}，交易完成`
```

---

## 七、查詢餘額語音

```javascript
`您的帳戶餘額為${convertAmountToSpeech(balance)}`
```

---

## 八、轉帳語音

```javascript
// 輸入帳號
'請輸入轉帳帳號'

// 確認轉帳
`您要轉帳${convertAmountToSpeech(amount)}給帳號${accountNumber}，請確認`
```

---

## 九、提示語音（普通模式 hint）

```javascript
// showATMEasyHint：指示下一步
`請${nextAction}`

// 自動提示關閉（2026-03-20）：
// DIFFICULTY_CONFIG.normal.autoShowHint: false
// 計時器條件加 config.autoShowHint 守衛
```

> 搜尋：`showATMEasyHint`、`clearATMEasyHint`、`autoShowHint`（2026-03-20）

---

## 十、錯誤語音

```javascript
// 密碼錯誤
'密碼錯誤，請重新輸入'

// 金額錯誤
'金額輸入有誤，請重新選擇'

// 操作錯誤
'操作順序不對，請依照步驟進行'
```
