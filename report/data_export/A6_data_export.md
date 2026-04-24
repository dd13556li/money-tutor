# A6 火車票售票機 — 資料匯出

> 資料來源：`js/a6_train_ticket.js`
> 匯出日期：2026-04-23

---

## 一、單元基本資訊

| 欄位 | 內容 |
|------|------|
| 標題 | A6 — 火車票售票機 |
| 主物件 | `Game`（全域）|
| Debug 物件 | `Game.Debug` |
| JS 行數 | 11,710 行 |

---

## 二、預設車站列表（`StationData.stationList`，共 32 站）

```
基隆、七堵、南港、松山、臺北、萬華、板橋、樹林、
桃園、中壢、新竹、竹南、苗栗、豐原、臺中、彰化、
員林、斗六、嘉義、新營、臺南、岡山、新左營、高雄、
屏東、潮州、臺東、玉里、花蓮、蘇澳新、宜蘭、瑞芳
```

---

## 三、車站 ID 對應（`StationData.Stations`）

| ID | 中文名 | 索引 |
|----|--------|------|
| `keelung` | 基隆 | 0 |
| `taipei` | 臺北 | 4 |
| `taichung` | 臺中 | 14 |
| `kaohsiung` | 高雄 | 23 |
| `hualien` | 花蓮 | 28 |
| ... | （共 32 站）| 0~31 |

---

## 四、區域劃分（`StationData.regions`）

| 區域 | 說明 | 代理站 |
|------|------|--------|
| `north` | 北部 | `taipei`（臺北）|
| `central` | 中部 | `taichung`（臺中）|
| `south` | 南部 | `kaohsiung`（高雄）|
| `east` | 東部 | `hualien`（花蓮）|

> `PROXY_STATIONS`：自訂車站的票價計算代理站（依區域對應到最近的預設站）

---

## 五、台鐵全線車站資料庫（`TRA_STATION_DATABASE`）

完整台鐵站資料庫（含英文拼音，數百站），供自訂車站功能搜尋使用。
涵蓋：北段、宜蘭線、平溪線、深澳線、內灣線、海線、山線、屏東線、南迴線、台東線等。

---

## 六、自訂車站系統

| 欄位 | 說明 |
|------|------|
| `MAX_CUSTOM_STATIONS` | 最多 6 個自訂車站 |
| `addCustomStation(name, region)` | 新增自訂車站（依區域指定 proxyStationId）|
| `resolveStationId(stationName)` | 解析車站 ID（優先自訂→預設）|

> 搜尋：`addCustomStation`、`resolveStationId`（自訂車站系統）

---

## 七、票價計算

- 基於車站間距離（依 stationList 索引差距）
- 自訂車站使用代理站計算票價
- 票種：全票/優惠票/兒童票

---

## 八、付款面額（`denomination`）

```javascript
// 支援面額
{ value: 1000, name: '1000元', images: { front: ..., back: ... } }
// 1/5/10/50/100/500/1000 元（完整組合）
```

---

## 九、錢包上限（`walletCap` 分層邏輯，2026-03-16）

| 票價範圍 | 錢包上限 |
|---------|---------|
| ≤ 100 元 | 300 元 |
| ≤ 300 元 | 700 元 |
| ≤ 600 元 | 1,300 元 |
| 其他 | 票價 + 500 元 |

> `minWallet = totalPrice + 10`（至少比票價多 10 元）
> 搜尋：`walletCap`、`generatePresetQuestion`

---

## 十、500/1000/2000 元錢包隨機組成（2026-03-16）

- `generateRandomWalletDecomposition`：貪婪起點→隨機拆解→≤10張
- `initializeWallet` 三路分支（easy/normal/hard）
- `breakRules` 鬆弛規則（避免死局）

---

## 十一、步驟流程

1. 選出發站 → 2. 選目的地 → 3. 選票種/張數 → 4. 確認購票 → 5. 付款（拖幣）→ 6. 找零 → 7. 取票
