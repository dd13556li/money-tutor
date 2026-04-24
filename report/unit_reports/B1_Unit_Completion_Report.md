# B1 今天帶多少錢 — 完成經驗報告書

> **建立日期**：2026-04-23
> **最後更新**：2026-04-23（獨立報告建立，對齊 A 系列格式；整合 B_Series_Unit_Completion_Report.md 截至 Round 45 的修復記錄）
> **專案名稱**：Money Tutor 金錢教學系統
> **單元編號**：B1 — 今天帶多少錢
> **報告類型**：單元完成經驗與開發建議

---

## 一、檔案規模總覽

| 檔案 | 路徑 | 行數 | 大小 |
|------|------|------|------|
| HTML 頁面 | `html/b1_daily_budget.html` | 28 行 | 純容器 |
| JS 核心邏輯 | `js/b1_daily_budget.js` | 3,208 行 | 187 KB |
| CSS 樣式 | `css/b1_daily_budget.css` | 2,182 行 | — |
| **合計** | — | **5,418 行** | — |

### CSS 載入順序

```
ai-theme.css → shared-game-base.css → b-series.css → b1_daily_budget.css
→ common-modal-responsive.css → dark-mode-simple.css
```

### 素材資源

| 類型 | 數量 | 路徑 |
|------|------|------|
| 場景圖片 | 60+ 張 PNG | `images/b1/icon-b1-*.png` |
| 錢幣圖片 | 18 張 PNG（正反面各 9） | `images/money/*_yuan_front/back.png` |
| 音效 | success / correct / error.mp3 | `audio/` 共用 |

---

## 二、單元特色

### 2.1 教學目標

B1 訓練學習者**出門前規劃金錢**的能力：給定今日行程清單（費用項目與金額），計算總共需要帶多少錢。

### 2.2 兩段式流程

| Phase | 顯示內容 | 學習者操作 |
|-------|---------|----------|
| **Phase 1**（行程確認） | 今日行程卡（項目名稱、費用） | 簡單/普通：確認後進入 Phase 2；困難：輸入總費用（數字鍵盤）|
| **Phase 2**（備錢） | 行程摘要參考卡 + 錢包 + 托盤 | 從托盤拖入正確面額至錢包放置區，湊足總金額 |

### 2.3 場景資料庫

| 難度 | 場景數 | 費用項目數 | 金額範圍 |
|------|--------|-----------|---------|
| 簡單（easy） | 23 個 | 2 項 | 每項 5~160 元 |
| 普通（normal） | 25 個 | 3 項 | 每項 10~360 元 |
| 困難（hard） | 20 個 | 4~5 項 | 每項 10~500 元 |

場景類別：`school`（學校）、`food`（飲食）、`outdoor`（戶外）、`entertainment`（娛樂）、`shopping`（購物）。設定頁可依類別篩選。

### 2.4 自訂項目功能

- 普通/困難模式可開啟「自訂項目」：刪除現有項目、新增自訂費用（名稱 + 數字鍵盤輸入金額）
- `customItemsEnabled` / `_getEffectiveTotal(curr)` / `_getEffectiveItems(curr)` 管理有效總額
- Phase 1 顯示 `b1-custom-items-panel`；`b1-cip-cost-btn`（？框）點後開數字彈窗

### 2.5 Ghost Slot 提示機制（B 系列首創）

- 提示按鈕點後，錢包放置區出現淡化正確面額幣圖（`b1-wallet-ghost-slot`，opacity 0.35）
- 拖入符合面額的錢幣時，Ghost 平滑填充（CSS transition）；不符合則拒絕並播錯誤音
- 搜尋：`b1-wallet-ghost-slot`、`_autoSetGhostSlots`、`hintSlots`

### 2.6 三難度設計

| 模式 | Phase 1 | Phase 2 |
|------|---------|---------|
| 簡單 | 逐項語音後自動進入 Phase 2 | Ghost Slot 全引導；自動確認 |
| 普通 | 顯示費用，確認按鈕 | 3 次錯誤 → Ghost Slot 顯示；提示鈕 → 金額數字泡泡 |
| 困難 | 數字鍵盤輸入總費用（3 次錯 → 計算提示） | 無 Ghost；提示鈕 → 金額數字泡泡 |

---

## 三、語音系統

| 場景 | 語音內容範例 |
|------|------------|
| 開題任務彈窗 | 「今天要去XXX，需要帶多少錢？」 |
| 逐項語音 | 「午餐費，四十五元；公車票，二十元」 |
| 放幣反饋 | 「已放入伍拾元，還需要拾伍元」 |
| 提示語音 | 「可以用兩個拾元，一個五元」 |
| 完成 | 「答對了！準備好了，可以出發了！」 |
| 錯誤 | 「不對喔，你付的錢太少，請再試一次」 |

- 金額使用 `convertToTraditionalCurrency()`（`number-speech-utils.js`）
- 語音串接：任務彈窗 `afterClose` → `_speakItemsOneByOne` callback chain

---

## 四、提示系統

| 觸發條件 | 提示方式 | 搜尋關鍵字 |
|---------|---------|-----------|
| Phase 1 提示鈕（普通/困難）| 在未填金額的 ？框上方顯示橙色數字泡泡（5 秒自動消失）| `_showPhase1AmountHints`、`b1-cost-hint-tip` |
| Phase 2 提示鈕（普通）| Ghost Slot（淡化正確面額圖示）| `_showCoinHint`、`b1-wallet-ghost-slot` |
| Phase 2 3 次錯誤（普通）| 自動觸發 Ghost Slot | `_updateWalletStatusOnly` |
| 困難 Phase 1 3 次錯（困難）| 顯示計算提示（金額拆解）| `_renderHardTotalInput`、`b1-ht-confirm` |

---

## 五、輔助點擊模式（AssistClick）

- 啟用後任意點擊執行下一步，依序操作 Phase 1 確認 → Phase 2 拖幣 → 確認
- Phase 2 拖幣：按提示鈕 Ghost 模式優先，否則按貪婪演算法分解面額
- 所有比對改用 `_getEffectiveTotal(curr)` 取代 `curr.total`
- 搜尋：`AssistClick.buildQueue`、`b1-phase-next-btn`、`b1-phase2-ref`

---

## 六、完成畫面

- `showResults()` — 兩頁式
  - 第一頁：`.b-header`（標題列含獎勵/返回按鈕）+ 今日行程清單（含金幣圖示）
  - 第二頁：完成統計（答對題數 / 正確率 / 時間）+ 再玩一次 / 返回設定
- 搜尋：`b1-review-reward-btn`、`b1-review-back-btn`

---

## 七、技術注意事項

| 項目 | 說明 | 搜尋關鍵字 |
|------|------|-----------|
| 主物件 | `Game`（`window.Game`）| `let Game;` |
| 題目流程 | `renderQuestion()` → `_renderPhase1()` / `_renderPhase2()` | `_renderPhase1`、`_bindPhase1Events` |
| 有效總額 | `_getEffectiveTotal(curr)` 合併原始費用 + 自訂項目 | `_getEffectiveTotal` |
| 錢幣面額 | 紙鈔 68px，硬幣 44px（托盤）；Phase 2 wallet 硬幣 60px / 紙鈔 100px | `imgSize.*68px` |
| 正反面 | `trayFaces` dict 每題生成；`q.trayFaces?.[d]||'front'` | `trayFaces`、`rf()` |
| Ghost Slot 方向對應 | `slot.face||trayFaces?.[slot.denom]||'front'` | `slot.face`、`_autoSetGhostSlots` |
| 數字鍵盤彈窗 | `_showB1CustomItemNumpad` | `b1-cip-cost-btn`、`customItemsPendingCount` |
| 自訂按鈕題數 | 設定頁末尾 `_showSettingsCountNumpad` | `b-snp-overlay`、`b1-custom-count-btn` |
