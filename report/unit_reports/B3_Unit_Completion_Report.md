# B3 存錢計畫 — 完成經驗報告書

> **建立日期**：2026-04-23
> **最後更新**：2026-04-23（獨立報告建立；整合 B_Series_Unit_Completion_Report.md 截至 Round 45 的修復記錄）
> **專案名稱**：Money Tutor 金錢教學系統
> **單元編號**：B3 — 存錢計畫
> **報告類型**：單元完成經驗與開發建議

---

## 一、檔案規模總覽

| 檔案 | 路徑 | 行數 | 大小 |
|------|------|------|------|
| HTML 頁面 | `html/b3_savings_plan.html` | 29 行 | 純容器 |
| JS 核心邏輯 | `js/b3_savings_plan.js` | 3,630 行 | 197 KB |
| CSS 樣式 | `css/b3_savings_plan.css` | 2,154 行 | — |
| **合計** | — | **5,813 行** | — |

### CSS 載入順序

```
ai-theme.css → shared-game-base.css → b-series.css → b3_savings_plan.css
→ common-modal-responsive.css → dark-mode-simple.css
```

### 素材資源

| 類型 | 數量 | 路徑 |
|------|------|------|
| 商品圖片 | 20 張 PNG | `images/c5/icon-c5-*.png`（借用 C5 圖片） |
| 錢幣圖片 | 18 張 PNG（正反面各 9） | `images/money/*_yuan_front/back.png` |
| 撲滿圖示 | 1 張 | `images/b3/icon-b3-piggy-bank.png` |

---

## 二、單元特色

### 2.1 教學目標

B3 訓練學習者**設定儲蓄目標並規劃存錢計畫**：選定想買的商品，計算需要存幾週及每週存多少錢，透過月曆模式每天拖幣練習存錢動作。

### 2.2 三種模式架構

| 模式 key | 名稱 | 流程 |
|---------|------|------|
| `quiz` | 測驗模式 | 直接選答案（週數 / 每週金額）；簡單：選擇題；普通/困難：數字鍵盤 |
| `calendar` | 月曆模式 | 真實月曆UI；每天拖幣存入；達成目標後撲滿兌換動畫 |
| 兩模式 | 同時選兩者 | 先測驗後月曆 |

設定頁可選擇開啟測驗/月曆/兩者。

### 2.3 商品資料庫（B3_ALL_ITEMS，21 件）

| 難度 | 商品數 | 售價範圍 | 類別 |
|------|--------|---------|------|
| easy | 9 件 | 180~400 元 | book / toy / tech |
| normal | 17 件 | 180~800 元 | 含 outdoor |
| hard | 21 件 | 180~4500 元 | 含手機/平板 |

圖片借用 `images/c5/icon-c5-*.png`（全部已存在）。

### 2.4 設定頁選項（2026-04-02~03 重設計）

| 選項 | 說明 |
|------|------|
| 商品類別 | book / toy / tech / outdoor / 全部 |
| 存款天數與金額 | 普通：6-10天/9-15天/10-20天/自訂；困難：6-10天/9-15天/10-20天/自訂 |
| 自訂物品 | 上傳自訂圖片+名稱+價格 |

- 搜尋：`data-ndaily`、`data-hdaily`、`_updateNDaysPreview`、`_updateHDaysPreview`

### 2.5 月曆模式詳細設計

#### 月曆 UI 要素

| 元素 | 說明 |
|------|------|
| 月曆格子 | 今日高亮（`b3-cal-active`），過去日期灰暗 |
| 放置區 | 每格可放置金幣（`b3-nplaced-item`，每枚各顯圖示）|
| 確認按鈕 | `b3-normal-confirm-btn`（普通/困難）|
| 撲滿卡片 | 右側顯示目標商品 + 已存金額 + 進度條 |
| 兌換按鈕 | `b3-pig-exch-btn`，達成目標後出現 |

#### 存款面額邏輯

- 簡單：固定數量固定面額的金幣（直接拖放）
- 普通：可自由拖任意面額；確認後驗算是否等於每日目標（超額或不足均提示）
- 困難：同普通但無即時超額拒絕（確認後判斷）

#### 金幣尺寸

- 紙鈔 68px，硬幣 44px（`b3-nplaced-item`）

---

## 三、語音系統

| 場景 | 語音內容範例 |
|------|------------|
| 存錢目標彈窗 | 「你想買 XXX，售價 OOO 元，要存 N 週…」 |
| 日期語音 | 「X 月 X 號，請存入 N 元」 |
| 提示語音 | 「可以存入兩個拾元，一個五元」 |
| 困難彈窗 | 「今天要存 X 元，可以用 N 個 X 元…」 |
| 達成目標 | 「恭喜！你已經存夠錢了，可以購買 XXX！」 |
| 錯誤 | 「不對喔，你存的錢太多/太少，請再試一次」 |

- 語音格式：「N個X元，M個Y元」（永遠顯示數量，含 1 個）
- 搜尋：`可以存入.*個.*元`、`b3NDenomInGhost`

---

## 四、提示系統

| 觸發條件 | 提示方式 | 搜尋關鍵字 |
|---------|---------|-----------|
| 普通模式提示鈕 | Ghost Slot（淡化正確面額，`b3-nplaced-ghost-slot`）+ 語音 | `_toggleDepositHint`、`hintSlots`、`data-hint-idx` |
| 困難模式提示鈕 | 貪婪分解彈窗（`_showHardModeHintModal`）+ 語音 | `b3-hint-modal-overlay`、`b3-hint-modal` |
| 測驗錯誤（普通）| 「不對喔」+ 方向提示；3 次後直接給算式 | `_showDivisionHint` |
| 測驗錯誤（困難）| 提示彈窗揭露算式 | `_showHardModeHintModal` |

---

## 五、輔助點擊模式（AssistClick）

- 月曆模式完整佇列：達成目標頁 → `b3-view-summary-btn`；簡單拖曳 → MutationObserver 驅動；普通/困難 → 貪婪面額 tile；兌換 → `b3-pig-exch-btn`；日期等待 → `b3-cal-active`
- 重啟修復：`_showCalendarTaskPopup` 按「開始存錢」後重啟 AssistClick（600ms delay）
- 搜尋：`b3-view-summary-btn`、`b3-pig-exch-btn`、`b3-drag-coin:not.*b3-coin-placed`、`b3-ndrag-denom.*remaining`

---

## 六、完成畫面（showResults()）

- 第一頁：`.b-header`（`b3-res1-reward-btn`/`b3-res1-back-btn`）+ 成功橫幅（`b3-res-success-banner`）+ 目標卡片網格（`b3-goals-grid`）+ 三欄統計
- 第二頁：`.b-header`（`b3-res2-reward-btn`/`b3-res2-back-btn`）+ 完整統計
- 搜尋：`b3MkMoneyIcons`、`b3-goals-grid`、`b3-goal-result-card`

---

## 七、技術注意事項

| 項目 | 說明 | 搜尋關鍵字 |
|------|------|-----------|
| 主物件 | `Game` | `let Game;` |
| 正反面隨機 | 模組層級 `b3Rf()` | `b3Rf`、`item.face` |
| 拖曳架構 | `_startDragSession` + `_handleCoinDrop` | `b3-drag-coin`、`b3-coin-placed` |
| 撲滿換算 | `EXCHANGE_RULES`（100=5×20 等）| `b3-pig-exch-btn` |
| 自訂按鈕題數 | 無（月曆模式由天數決定）| — |
| 數字鍵盤 | `#b3-daily-numpad-modal`（普通/困難/自訂共用）| `_npSource`、`showNumpad` |

---

## 修復記錄速查（從 CLAUDE.md 遷移，2026-04-29）

| 項目 | 搜尋關鍵字 |
|------|------------|
| B3 設定頁普通/困難模式天數選項（2026-04-02）| `data-ndaily`、`data-hdaily`、`h-daily-btn-group` |
| B3 自訂物品移至所有購買金額選項之後（2026-04-02）| `b3-add-custom-item-btn`（DOM 順序改變）|
| B3 設定頁四項修正（2026-04-03）| `b3-daily-numpad-modal`、`_npSource`、`showNumpad` |
| B3 設定頁切換模式清空選項（2026-04-03）| `universal reset`、`h-daily-btn-group.*remove.*active` |
| B3 困難模式設定頁 preview 提示（2026-04-03）| `_updateHDaysPreview`、`b3-h-days-preview` |
| B3 月曆模式放置區重構（2026-04-03）| `b3-nplaced-item`、`imgSize.*68px` |
| B3 普通/困難模式確認後才提示金額錯誤（2026-04-03）| `不對喔.*存的錢太多`、`difficulty.*hard.*Speech` |
| B3 普通/困難模式提示按鈕（2026-04-03）| `b3-daily-hint-btn`、`hintSlots`、`data-hint-idx`、`b3NDenomInGhost` |
| B3 困難模式提示彈窗（2026-04-03）| `_showHardModeHintModal`、`b3-hint-modal-overlay` |
| B3 提示語音格式修正（2026-04-03）| `可以存入.*個.*元` |
| B3 所有金錢圖示隨機正反面（2026-04-09）| `b3Rf`、`item.face` |
| B3 省錢清單卡片版面重設計（2026-04-09）| `b3MkMoneyIcons`、`b3-goals-grid`、`b3-goal-result-card`、`b3-res1-reward-btn`、`b3-res2-reward-btn` |
| B3 月曆模式輔助點擊修正（2026-04-12）| `b3-view-summary-btn`、`b3-pig-exch-btn`、`b3-drag-coin:not.*b3-coin-placed`、`b3-ndrag-denom.*remaining` |
