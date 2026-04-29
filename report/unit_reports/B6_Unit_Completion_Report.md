# B6 菜市場買菜 — 完成經驗報告書

> **建立日期**：2026-04-23
> **最後更新**：2026-04-23（獨立報告建立；整合 B_Series_Unit_Completion_Report.md 截至 Round 45 的修復記錄；加入 B6 商品圖片引用更新）
> **專案名稱**：Money Tutor 金錢教學系統
> **單元編號**：B6 — 菜市場買菜
> **報告類型**：單元完成經驗與開發建議

---

## 一、檔案規模總覽

| 檔案 | 路徑 | 行數 | 大小 |
|------|------|------|------|
| HTML 頁面 | `html/b6_market_shopping.html` | 27 行 | 純容器 |
| JS 核心邏輯 | `js/b6_market_shopping.js` | 4,441 行 | 252 KB |
| CSS 樣式 | `css/b6_market_shopping.css` | 3,045 行 | — |
| **合計** | — | **7,513 行** | — |

### CSS 載入順序

```
ai-theme.css → shared-game-base.css → b-series.css → b6_market_shopping.css
→ common-modal-responsive.css → dark-mode-simple.css
```

### 素材資源

| 類型 | 數量 | 路徑 |
|------|------|------|
| B6 商品圖片 | 63 張 PNG | `images/b6/icon-b6-*.png`（2026-04-23 更新）|
| 錢幣圖片 | 18 張 PNG | `images/money/*_yuan_front/back.png` |
| 市場圖示 | 3 張 PNG（借用 B4 商店圖）| `images/b4/icon-b4-store-*.png` |

---

## 二、單元特色

### 2.1 教學目標

B6 訓練學習者**在市場按清單採購商品並完成付款找零**：最貼近真實消費情境的 B 系列單元，包含市場攤位切換、預算管理、付款與找零完整流程。

### 2.2 三段式流程

| 段落 | 顯示內容 | 學習者操作 |
|------|---------|----------|
| **歡迎** | 市場類型介紹（2頁）| 點「開始採購！」 |
| **Phase 1**（採購）| 任務卡（預算+清單）+ 攤位商品格 | 按攤位選購商品，湊足每攤需求件數 |
| **Phase 2**（付款找零）| 付款：面額托盤 + 錢包放置區；找零：面額托盤 + 找零放置區 | 湊足付款 → 確認付款 → 選正確找零金幣 |

### 2.3 三市場類型（B6_MARKETS）

| 市場 key | 名稱 | 攤位（3 攤 × 12 商品）|
|---------|------|---------------------|
| `traditional` | 傳統市場 🏪 | 蔬菜攤、水果攤、雜貨攤 |
| `supermarket` | 超市購物 🛒 | 烘焙區、乳品區、冷凍區 |
| `nightmarket` | 夜市美食 🏮 | 小吃攤、飲料攤、紀念品攤 |
| `random` | 隨機 🎲 | 每關從三市場中隨機抽一個 |

### 2.4 攤位導航（2026-04-14 重設計）

- 移除 tabs，改用 `b6-stall-nav`（◀/▶ 按鈕 + 攤位名稱 + 圓點指示器 `b6-snav-dot`）
- `_switchStall()` 函數控制切換
- 搜尋：`b6-stall-nav`、`b6-snav-btn`、`b6-snav-dot`

### 2.5 商品圖示系統（2026-04-23 新增）

- `b6IconHTML(item)`：有 `imageUrl` 顯示 `<img class="b6-icon-img">`，否則顯示 emoji
- 已有圖片：超市全部（除馬芬/餅乾/奶油/雞蛋/冰淇淋）、夜市大部分（除牛肉麵/芋頭牛奶/紀念品部分）
- 傳統市場：雜貨攤僅豆腐/白米/麵條/味噌；蔬菜攤/水果攤暫無圖
- 搜尋：`b6IconHTML`、`b6-icon-img`、`imageUrl`

### 2.6 自訂購物項目功能

- 普通/困難：設定頁可開啟「自訂購物項目」，`_calcMissionTotal()` 含 `customTotal`
- 搜尋：`b6-custom-items-panel`、`b6-cip-add-btn`

---

## 三、三難度設計

| 難度 | Phase 1（採購）| Phase 2（付款）| 找零 |
|------|--------------|--------------|------|
| **簡單** | `_b6P1ActivateHintMode`（逐一高亮 1 個）；選完自動結帳 | Ghost Slot，填完自動確認 | Ghost Slot，填完自動確認 |
| **普通** | 3 次超購錯誤自動提示（`_b6P1ShowHint`）| 足額語音提示；3 次付款錯誤 → Ghost Slot | 3 次錯誤 → Ghost Slot；提示鈕 → Ghost Slot |
| **困難** | 提示鈕 → `_b6P1ShowHardHintModal`（購物建議清單彈窗）| 無 Ghost；提示鈕 → 彈窗 | 保留錢包；提示鈕 → 彈窗 `_b6P2ShowChangeHintModal` |

---

## 四、找零階段（Phase 2 Change Return，2026-04-17 重設計）

- `_b6P2ShowChangeReturn()` 完整重建找零頁（`b6c-change-page`）
- 面額選擇：貪婪解面額 + 最小面額下一個（干擾）+ 第一個大於找零的（干擾）
- Ghost Slot 模式（`g.changeGhostMode`）：普通 3 次錯誤自動觸發
- 搜尋：`b6c-change-page`、`b6c-denom-card`、`b6c-wallet-zone`、`b6c-confirm-btn`、`_b6P2ConfirmChange`、`changeGhostMode`、`changeGreedySolution`

---

## 五、語音系統

| 場景 | 語音內容範例 |
|------|------------|
| 任務介紹 | 「歡迎來到傳統市場！今天要買蔬菜攤 1 樣、雜貨攤 2 樣，預算 XXX 元」 |
| 攤位切換 | 「進入水果攤」 |
| 收集完成 | 「蔬菜攤完成！繼續選其他攤位的商品」 |
| 找零錯誤 | 「不對喔，找零算太多了/太少了，請再試一次」（`b6ChangeDir`）|
| 付款提示 | 「可以用兩個百元，一個五十元」 |

- 搜尋：`_speakMissionItemsOneByOne`、`b6ChangeDir`

---

## 六、提示系統

| 觸發條件 | 提示方式 | 搜尋關鍵字 |
|---------|---------|-----------|
| 普通 Phase 1 提示鈕 | 可負擔清單（`_b6P1ShowHint`）| `b6-p1-hint-btn` |
| 困難 Phase 1 提示鈕 | 購物建議彈窗（`_b6P1ShowHardHintModal`）| `b6-p1-hint-btn` |
| 普通付款提示（吉祥物）| Ghost Slot 顯示 | `b6c-wallet-zone` |
| 困難付款提示鈕 | 彈窗：`_b6P2ShowChangeHintModal` | `b6-hint-modal-overlay` |
| 付款提示鈕（普通）| `_showPaymentHint(total)`（toast）+ 語音「可以用N個X元」 | `speechParts`、`可以用` |
| 困難付款提示鈕 | 貪婪分解彈窗（`_showHardModeHintModal`）| `b6-hint-modal-overlay`、`b6-hm-close-btn` |

---

## 七、輔助點擊模式（AssistClick）

- Phase 1：攤位切換（`b6-stall-prev`/`b6-stall-next`）+ 提示商品點擊
- Phase 2：付款托盤 → 確認付款 → 找零托盤 → 確認找零
- 搜尋：`AssistClick.buildQueue`、`b6-checkout-btn`、`b6c-confirm-btn`

---

## 八、完成畫面（showResults()）

- 兩頁式，`.b-header` 標題列
- 統計：完成關卡數、答對率、用時
- 搜尋：`showResults`、`b6-results-page`

---

## 九、技術注意事項

| 項目 | 說明 | 搜尋關鍵字 |
|------|------|-----------|
| 主物件 | `Game` | `let Game;` |
| 市場切換 | `_currentStalls` / `_currentMissions` 動態切換 | `_mktKey`、`B6_MARKETS[rKey]` |
| 商品圖示 | `b6IconHTML(item)` | `b6-icon-img`、`imageUrl` |
| 攤位鍵清單 | `_stallKeys`（`Object.keys(_currentStalls)`）| `_stallKeys` |
| 正反面 | `g.p2TrayFaces`（每關一次性生成）| `p2TrayFaces` |
| 缺少 B6 圖片 | 傳統市場蔬菜/水果攤全部、雜貨攤 8 項、超市 5 項、夜市 9 項 | 詳見 `B6_data_export.md` 十二節 |
| 自訂按鈕關卡數 | 設定頁末 `_showSettingsCountNumpad` | `b6-custom-rounds-btn`、`b-snp-overlay` |

---

## 修復記錄速查（從 CLAUDE.md 遷移，2026-04-29）

| 項目 | 搜尋關鍵字 |
|------|------------|
| B6 找零錯誤語音統一 + 付款提示吉祥物（2026-04-03）| `b6ChangeDir`、`不對喔，找零算` |
| B6 提示語音格式統一（2026-04-03）| `speechParts`、`可以用` |
| B6 困難模式付法彈窗（2026-04-05）| `_showHardModeHintModal`、`b6-hint-modal-overlay`、`b6-hm-close-btn` |
| B6 afterClose 模式 + 購物逐項語音（2026-04-05）| `_speakMissionItemsOneByOne`、`afterClose`、`準備出發` |
| B6 自訂購物項目功能（2026-04-04）| `customItemsEnabled`、`b6-custom-items-panel`、`b6-cip-add-btn` |
| B6 Phase 1 購物頁版面重設計（2026-04-14）| `b6-task-card`、`b6-market-card`、`b6-checkout-strip`、`b6-cstrip-count` |
| B6 第一頁左右攤位導航 + 第二頁標籤（2026-04-14）| `b6-stall-nav`、`b6-snav-btn`、`b6-snav-dot`、`b6p2-my-money-label`、`b6p2-tray-subtitle` |
| B6 找零階段完全重設計（2026-04-17）| `b6c-change-page`、`b6c-denom-card`、`b6c-wallet-zone`、`b6c-confirm-btn`、`_b6P2ConfirmChange`、`changeGhostMode`、`changeGreedySolution` |
