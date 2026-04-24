# B5 生日派對預算 — 完成經驗報告書

> **建立日期**：2026-04-23
> **最後更新**：2026-04-23（獨立報告建立；整合 B_Series_Unit_Completion_Report.md 截至 Round 45 的修復記錄）
> **專案名稱**：Money Tutor 金錢教學系統
> **單元編號**：B5 — 生日派對預算
> **報告類型**：單元完成經驗與開發建議

---

## 一、檔案規模總覽

| 檔案 | 路徑 | 行數 | 大小 |
|------|------|------|------|
| HTML 頁面 | `html/b5_party_budget.html` | 27 行 | 純容器 |
| JS 核心邏輯 | `js/b5_party_budget.js` | 3,556 行 | 198 KB |
| CSS 樣式 | `css/b5_party_budget.css` | 2,438 行 | — |
| **合計** | — | **6,021 行** | — |

### CSS 載入順序

```
ai-theme.css → shared-game-base.css → b-series.css → b5_party_budget.css
→ common-modal-responsive.css → dark-mode-simple.css
```

---

## 二、單元特色

### 2.1 教學目標

B5 訓練學習者**在預算限制內規劃生日派對購物清單**：必買商品必選、預算內自由搭配可選商品，並完成付款找零。

### 2.2 兩段式流程（Phase 1 + Phase 2）

| Phase | 顯示內容 | 學習者操作 |
|-------|---------|----------|
| **Phase 1**（選購）| 任務卡（預算 + 必買清單）+ 商品格狀卡 | 選購商品，不超預算且必買全選 |
| **Phase 2**（付款找零）| 付款：面額托盤 + 錢包放置區；找零：面額托盤 + 找零放置區 | 湊足付款金額 → 確認付款 → 從托盤選正確找零金幣 |

### 2.3 轉場歡迎畫面（2026-04-18）

- `startGame()` → `showWelcomeScreen()`：兩頁式（B6 pattern）
  - Page 1：紫色漸層 + 派對主題 icon + 標題語音 → 500ms → Page 2
  - Page 2：預算 + 金幣圖示 + 商品 emoji + 「開始挑選！」按鈕
- 搜尋：`showWelcomeScreen`、`b5-wc2-start-btn`、`_skipIntroModal`

### 2.4 關卡資料庫

| 難度 | 關卡數 | 預算範圍 | 必買商品數 | 可選商品數 |
|------|--------|---------|----------|----------|
| 簡單（easy） | 16 關 | 600~750 元 | 1~2 | 3~5 |
| 普通（normal） | 16 關 | 900~1200 元 | 2~3 | 5~7 |
| 困難（hard） | 8 關 | 1200~2000 元 | 3~4 | 7~10 |

### 2.5 商品資料庫（B5_ALL_ITEMS，20 種）

| 類別 | 商品 | 價格範圍 |
|------|------|---------|
| food（食物飲料）| 蛋糕、果汁、糖果、派對紙盤、派對杯組、主題餐巾紙 | 30~380 元 |
| decor（裝飾道具）| 氣球、蠟燭、彩帶、派對帽、橫幅、串燈、貼紙、桌巾、魔法棒 | 30~90 元 |
| activity（遊戲活動）| 小禮物、拍立得、噴彩拉炮、藍牙喇叭、桌遊 | 55~280 元 |

### 2.6 派對主題系統（B5_THEMES，5 種）

| 主題 key | 名稱 |
|---------|------|
| default | 生日派對（預設） |
| princess | 公主派對 |
| adventure | 冒險探索 |
| ocean | 海洋世界 |
| space | 太空旅行 |

### 2.7 自訂商品功能

- 普通/困難：設定頁可開啟「自訂商品」面板，題目頁顯示 `b5-custom-items-panel`
- `_getTotal()` 加入 `customTotal`
- 搜尋：`b5-custom-items-panel`、`b5-cip-add-btn`

---

## 三、提示系統

### Phase 1（選購）

| 觸發條件 | 提示方式 | 搜尋關鍵字 |
|---------|---------|-----------|
| 簡單模式 | 關卡介紹關閉後自動啟用 `_b5P1ActivateHintMode()`，逐一高亮必選商品 | `b5-hint-here`、`_b5P1ActivateHintMode` |
| 普通 3 次超預算 | 自動 `_b5P1ShowHint()`（可負擔清單 + 語音）| `roundErrors`、`g.roundErrors >= 3` |
| 困難提示鈕 | `_showHardModeHintModal()`（B3 pattern）| `b5-hint-modal-overlay`、`b5-hm-close-btn` |
| 必買未選 | 「不對喔，記得要選所有必買的商品喔！」 | `不對喔，記得要選` |
| 超出預算 | 「不對喔，超出預算了，多了X元，請再試一次！」 | `不對喔，超出預算了` |

### Phase 2（找零）

| 觸發條件 | 提示方式 | 搜尋關鍵字 |
|---------|---------|-----------|
| 簡單 | 語音後自動 Ghost Slot（`_b5P2ShowChangeGhostSlots`）| `b5c-wallet-zone`、`changeGhostMode` |
| 普通 3 次錯 | 自動 Ghost Slot | `changeGhostMode` |
| 困難提示鈕 | 揭露 `b5c-wallet-info` + 彈窗 | `b5c-wallet-info`、`b6c-hidden` |

---

## 四、輔助點擊模式（AssistClick）

- Phase 1：商品類別切換 + 提示商品順序（`p1HintMode` 分支）
- Phase 2：付款托盤 → 確認付款 → 找零托盤 → 確認找零
- 搜尋：`AssistClick.buildQueue`、`b5-task-card`、`b5c-wallet-zone`、`b5c-confirm-btn`

---

## 五、找零階段（Phase 2 Change Return，2026-04-17/19）

- `_b5P2ShowChangeReturn()` 完整重建找零頁面
- 面額選擇邏輯：貪婪解用到的面額 + 最小面額下一個 + 第一個大於找零的（干擾）
- `b5c-denom-card`、`b5c-wallet-zone`、`b5c-confirm-btn`
- 錯誤語音：「不對喔，找零算太多了/太少了，請再試一次」（`b6ChangeDir` pattern）

---

## 六、語音系統

| 場景 | 語音內容範例 |
|------|------------|
| 關卡介紹 | 「歡迎來到生日派對！預算是 XXX 元，必買商品有…」 |
| 必買逐項 | 「必買：生日蛋糕，三百八十元」|
| 商品點選 | 「氣球，五十元」 |
| 付款完成 | 「金額足夠，可以確認付款了」（普通）|
| 提示語音 | 「可用商品：蛋糕三百八十元、氣球五十元…」（含價格）|

- 搜尋：`_speakMustItemsOneByOne`、`nameWithPrice`

---

## 七、完成畫面（showResults()）

- 兩頁式，`.b-header` 標題列
- 統計：本關完成數、答對率、用時
- 搜尋：`showResults`

---

## 八、技術注意事項

| 項目 | 說明 | 搜尋關鍵字 |
|------|------|-----------|
| 主物件 | `Game` | `let Game;` |
| 關卡狀態 | `state.game.{}` / `g` 別名 | `g.roundErrors`、`g.p1HintMode` |
| 付款狀態 | `g.changeGhostMode`、`changeGreedySolution` | `_b5P2SetupChangeInteraction` |
| 浮動標籤 | `_showItemFlyout(item, el)`（選商品時顯示）| `b5-item-flyout`、`b5FlyoutUp` |
| 自訂按鈕關卡數 | 設定頁末 `_showSettingsCountNumpad` | `b5-custom-rounds-btn`、`b-snp-overlay` |
