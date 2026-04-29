# B2 零用錢日記 — 完成經驗報告書

> **建立日期**：2026-04-23
> **最後更新**：2026-04-23（獨立報告建立；整合 B_Series_Unit_Completion_Report.md 截至 Round 45 的修復記錄）
> **專案名稱**：Money Tutor 金錢教學系統
> **單元編號**：B2 — 零用錢日記
> **報告類型**：單元完成經驗與開發建議

---

## 一、檔案規模總覽

| 檔案 | 路徑 | 行數 | 大小 |
|------|------|------|------|
| HTML 頁面 | `html/b2_allowance_diary.html` | 28 行 | 純容器 |
| JS 核心邏輯 | `js/b2_allowance_diary.js` | 3,795 行 | 225 KB |
| CSS 樣式 | `css/b2_allowance_diary.css` | 2,258 行 | — |
| **合計** | — | **6,081 行** | — |

### CSS 載入順序

```
ai-theme.css → shared-game-base.css → b-series.css → b2_allowance_diary.css
→ common-modal-responsive.css → dark-mode-simple.css
```

---

## 二、單元特色

### 2.1 教學目標

B2 訓練學習者**追蹤零用錢收支**：給定起始金額與多筆收支事件，計算最終餘額。培養加減計算與金錢管理概念。

### 2.2 兩段式流程

| Phase | 顯示內容 | 學習者操作 |
|-------|---------|----------|
| **Phase 1**（日記閱讀） | 日記任務彈窗 → 收支事件列（含金錢圖示）| 簡單：逐項動畫高亮後確認；普通/困難：閱讀後輸入答案（選擇題 / 數字鍵盤） |
| **Phase 2**（金錢視覺化） | 答對後顯示答案金額對應金幣（≤10 枚逐枚動畫，>10 枚分組×N）| 5 秒後自動前進 |

### 2.3 題庫規模

| 難度 | 通用題庫 | 各主題題庫 | 事件數/題 | 金額範圍 |
|------|--------|----------|----------|---------|
| 簡單（easy） | 12 題 | 每主題 8~12 題 | 2 事件 | 起始 35~800 |
| 普通（normal） | 12 題 | 每主題 8~12 題 | 4 事件 | 起始 100~500 |
| 困難（hard） | 12 題 | 每主題 8~12 題 | 6 事件 | 起始 500~2000 |

### 2.4 主題系統（B2_THEMES）

| 主題 key | 名稱 | 特色 |
|---------|------|------|
| random 🎲 | 隨機（預設） | 每題隨機抽取 |
| school 🏫 | 學校生活 | 午餐費、文具、活動費 |
| holiday 🌴 | 假期出遊 | 交通、景點、飲食 |
| family 👨‍👩‍👧 | 家庭活動 | 購物、外食、生活費 |

設定頁「隨機」排在第一位（2026-04-09）。

### 2.5 自訂事件功能

- 普通/困難可開啟「自訂事件」：刪除現有事件、新增收支事件（收入/支出 + 名稱 + 數字鍵盤金額）
- `_getEffectiveEvents(question)` / `_getEffectiveAnswer(question)` 合併原始 + 自訂事件
- 搜尋：`b2-custom-events-panel`、`b2-cep-add-btn`、`_showB2CustomEventNumpad`

### 2.6 三難度設計

| 模式 | 答題方式 | 提示機制 |
|------|---------|---------|
| 簡單 | 選擇題（4 選 1）| afterClose 逐項語音動畫 → 選擇 |
| 普通 | 數字鍵盤輸入 | 3 次錯誤自動提示（計算過程行內卡片）；提示鈕觸發 |
| 困難 | 數字鍵盤輸入 | 2 次錯誤後自動彈出計算步驟彈窗 |

---

## 三、語音系統

| 場景 | 語音內容範例 |
|------|------------|
| 任務彈窗 | 「這是你的零用錢日記，今天有幾筆收支…」 |
| 逐項動畫 | 「買飲料，支出三十元」（含名稱） |
| 提示語音 | 「從一百元開始，加上五十元，減去三十元，最後剩下一百二十元」 |
| 錯誤（普通） | 「不對喔，算太多了/太少了，請再試一次」 |
| 完成 | 「太棒了！日記記錄完成！」 |

- `_animateEasyEntriesSequential`：語音回調串接逐項動畫（afterClose pattern）
- 搜尋：`afterClose`、`b2-task-intro-modal`、`_animateEasyEntriesSequential`

---

## 四、提示系統

| 觸發條件 | 提示方式 | 搜尋關鍵字 |
|---------|---------|-----------|
| Phase 1 提示鈕（普通/困難/簡單） | 在未填金額的 ？框上方顯示橙色數字泡泡 | `_showDiaryAmountHints`、`b2-cost-hint-tip` |
| 普通 3 次錯誤自動 | 行內計算分解卡片（`_showCalcBreakdown`）| `b2-calc-card` |
| 困難 2 次錯誤自動 | 計算步驟彈窗（`_showHardModeHintModal`）| `b2-hm-overlay`、`b2-hard-hint-modal` |
| 困難提示鈕 | 同 `_showHardModeHintModal` | — |

---

## 五、輔助點擊模式（AssistClick）

- 選擇題模式：自動點選正確選項
- 鍵盤輸入模式：自動填入正確答案 → 點確認
- 搜尋：`AssistClick.buildQueue`

---

## 六、完成畫面

- `showResults()` — 兩頁式
  - 第一頁：`.b-header` + 日記彙整（各題答案與金錢圖示）
  - 第二頁：完成統計
- 金錢圖示個別顯示（紙鈔 68px/硬幣 44px，不分組）
- 搜尋：`b2-mic-wrap`、`b2-cic-wrap`

---

## 七、技術注意事項

| 項目 | 說明 | 搜尋關鍵字 |
|------|------|-----------|
| 主物件 | `Game` | `let Game;` |
| 有效答案 | `_getEffectiveAnswer(question)` | `_getEffectiveEvents` |
| 計算分解 | `_showCalcBreakdown(question)` | `b2-calc-card` |
| 困難彈窗 | `_showHardModeHintModal(question)` | `b2-hm-overlay` |
| Phase 2 金幣 | `_renderPhase2(question, effectiveAnswer)` | `b2-phase2-card`、`b2-p2-coin` |
| 正反面隨機 | `trayFaces` + `rf()` | `b2-mic-wrap` |
| 自訂按鈕題數 | 設定頁 `_showSettingsCountNumpad` | `b2-custom-count-btn`、`b-snp-overlay` |

---

## 修復記錄速查（從 CLAUDE.md 遷移，2026-04-29）

| 項目 | 搜尋關鍵字 |
|------|------------|
| B2 提示按鈕 + 吉祥物 + 錯誤語音統一（2026-04-03）| `b2-hint-btn`、`b2EasyErrDir` |
| B2 提示按鈕擴展至簡單模式（2026-04-04）| `b2-hint-wrap`（無 diff 條件）|
| B2 吉祥物圖示尺寸修正（2026-04-04）| `b2-hint-wrap`、`width:28px` |
| B2 自訂事件功能（2026-04-04）| `customItemsEnabled`、`_getEffectiveEvents`、`b2-custom-events-panel`、`b2-cep-add-btn` |
| B2 afterClose 模式 + 逐項語音（2026-04-05）| `afterClose`、`b2-task-intro-modal`、`_animateEasyEntries` |
| B2 困難模式提示彈窗（2026-04-05）| `_showHardModeHintModal`、`b2-hm-overlay`、`b2-hard-hint-modal` |
| B2 語音動畫鏈式串接＋金錢圖示＋第2頁（2026-04-06）| `_animateEasyEntriesSequential`、`_renderMoneyIconsGrouped`、`_renderPhase2`、`b2-phase2-card`、`b2-p2-coin` |
| B2 設定頁「隨機」主題移至第一位（2026-04-09）| `data-theme="random"` |
| B2 自訂事件 ? 框改數字鍵盤（普通模式）（2026-04-09）| `_showB2CustomEventNumpad`、`b2-cep-numpad-overlay` |
| B2 日記清單金錢圖示個別顯示（2026-04-10）| `b2-mic-wrap`、`b2-cic-wrap` |
| B1/B2 Phase1 提示鈕改金額數字泡泡（2026-04-10）| `b2-cost-hint-tip`、`_showDiaryAmountHints(question)` |
