# A2 理髮廳自助機 — 語音內容

> 資料來源：`js/a2_barber_shop_kiosk.js`（`speechTemplates` 配置物件）
> 匯出日期：2026-04-23

---

## 一、語音集中管理

A2 使用 `speechTemplates` 配置物件管理各難度語音。`convertAmountToSpeech(amount)` 處理金額語音。

---

## 二、歡迎語音

```javascript
// 進入歡迎頁
'歡迎來到美髮沙龍！請選擇您想要的服務'
```

---

## 三、指定任務語音

```javascript
`請選擇${serviceName}服務，費用是${convertAmountToSpeech(price)}`
// 例：「請選擇洗髮服務，費用是參拾元」
```

---

## 四、服務選擇語音

```javascript
// 選擇服務後
`這個服務需要${convertAmountToSpeech(price)}`
// 注意：末尾不再多加「元」（2026-03-28 修復元元語音重複）
```

> 搜尋：`這個服務需要`（line 5495，移除多餘末尾「元」）

---

## 五、需要金額語音（顯示應付金額）

```javascript
// coinFirst 模式顯示應付金額時
`_cfSvc`、`_displayReq`
// easyMode.assignedService || normalMode.assignedService
```

> 搜尋：`_cfSvc`、`_displayReq`（2026-03-22 修復）

---

## 六、投幣/付款語音

```javascript
// 紙鈔投完後（coinFirst 模式）
'紙鈔已投完，請繼續投硬幣'
// 改提示硬幣口（2026-03-28 修復）

// 付款足額語音
'金額足夠，請確認付款'

// 超額語音（3 次後自動提示）
`你付了太多，需要${convertAmountToSpeech(price)}`
```

---

## 七、付款完成語音（`completePayment`）

```javascript
// 2026-03-22 重構後統一：
'付款完成，票卷列印中'
// 同步觸發列印動畫
```

> 搜尋：`speakCustom('付款完成，票卷列印中')`（2026-03-22）

---

## 八、燈號已亮語音（coinFirst 任務彈窗）

```javascript
// 已亮燈後開啟任務彈窗時
`💡 請選擇服務`
`${serviceName}的燈號已亮起，請點選${serviceName}服務`
```

> 搜尋：`coin-first-available`、`showTaskPopup` + `closeTaskPopup`（2026-03-22）

---

## 九、錯誤語音

```javascript
// 選錯服務（指定任務）
`選錯了，請選擇指定的${correctServiceName}服務`

// 付款金額不足
`金額不足，請繼續投入金錢`
```

---

## 十、coinFirst 亮燈批次語音

```javascript
// coinFirstFree 多個服務可選時（2026-03-28）
`已有${availCount}個服務可以選了`
// 700ms timer 批次播放（非逐個語音）
```

> 搜尋：`已有${availCount}個服務可以選了`（line 2026-03-28）
