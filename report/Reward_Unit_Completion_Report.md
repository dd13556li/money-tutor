# Reward 單元完成報告

> **獎勵系統（reward/）** — 學生優良行為計分板
> 最後更新：2026-02-24

---

## 一、檔案規模總覽

| 檔案 | 行數 | 說明 |
|------|------|------|
| `reward/index.html` | ~92 行 | 主頁面 HTML |
| `reward/script.js` | ~1053 行 | 主要 JavaScript 邏輯 |
| `reward/styles.css` | ~636 行 | 樣式表 |
| `reward/sound/bouns01.mp3` | — | 內建加分音效 1 |
| `reward/sound/bouns02.mp3` | — | 內建加分音效 2 |
| `reward/sound/bouns03.mp3` | — | 內建加分音效 3 |
| `reward/sound/deduction.mp3` | — | 內建扣分音效 |

### JS 依賴

| 檔案 | 說明 |
|------|------|
| `../js/emoji-library.js` | Emoji 素材庫（唯一外部 JS 依賴） |

### 不含以下機制

- TimerManager / EventManager（無需管理複雜計時器/事件生命週期）
- Debug FLAGS 系統
- canvas-confetti
- 主題系統（theme-system.js）
- 音訊解鎖（audio-unlocker.js）

---

## 二、系統特色

### 2.1 學生管理

- **最多 15 位學生**（超過則提示拒絕新增）
- 學生資料：`{ id, name, photo, score }`
  - `id`：`Date.now() + Math.random()`（確保唯一性）
  - `name`：可為空白
  - `photo`：Base64 字串（已壓縮至 300px / 70% 品質 JPEG）
  - `score`：整數，最低為 0（不允許負分）
- **顯示/隱藏分離**：`displayedStudentIds`（Set）控制哪些學生出現在欄位，學生可「清空（從欄位移除）」或「永久刪除（從主列表移除）」

### 2.2 圖片壓縮

```javascript
compressImage(file, maxWidth = 300, quality = 0.7)
```

- 獨立於 `DOMContentLoaded` 外的全域函式
- 輸出格式：JPEG，maxWidth 300px，quality 0.7（約 30-50KB）
- 呼叫點：
  1. 新增學生（`showAddStudentDialog()`）
  2. 更改照片（`handleChangePhoto()`）
  3. 上傳加分圖示（maxWidth 200px, quality 0.8，略有不同）

### 2.3 加分圖示

- **內建 10 個 emoji 圖示**（⭐🌟🏆🎖️🏅💎👍🎯🌈🎁）
- **自訂上傳：最多 5 個**
  - 以 `data-icon-name` 屬性區分自訂 option 與內建 option
  - 命名規則：`自訂圖示01`、`自訂圖示02`...
  - 支援圖片上傳（壓縮為 200px/80%）
- 圖示預覽區：`.bonus-icon-preview-container`，透過 CSS `has-content` class 控制顯示
- emoji 判斷邏輯：`!src.includes('/') && !src.startsWith('data:')`

### 2.4 加分音效

- **內建 3 個音效**（bouns01~03.mp3）
- **自訂上傳：最多 1 個**，限制 300KB（`MAX_SOUND_SIZE = 300 * 1024`）
- 自訂音效以 `data-sound-name` 屬性區分
- 刪除判斷：`selectedValue.startsWith('data:')` 才允許刪除
- **扣分音效**：固定使用 `sound/deduction.mp3`（不受下拉選單影響）

### 2.5 分數與排名

- `updateScore(student, increment)`：增減分數，觸發音效 + 重整畫面
- 分數最低為 0（不允許 `newScore < 0`）
- `updateRankings()`：呼叫 `refreshDisplay(true)` 以分數排序顯示
- 排名數字：同分顯示相同排名（密排機制）

### 2.6 視窗縮放

- `zoomInBtn` / `zoomOutBtn`：±10%，範圍 50%~150%
- 縮放方式：`document.body.style.transform = scale()`，`transformOrigin: 'top center'`

---

## 三、資料持久化（localStorage）

### 3.1 儲存函式：`saveToLocalStorage()`

每次以下操作後自動儲存：新增學生、更改照片、加/扣分、顯示/隱藏切換、刪除學生/圖示/音效、上傳圖示/音效。

### 3.2 載入函式：`loadFromLocalStorage()`

頁面 `DOMContentLoaded` 後執行，重建：
1. 學生陣列（含 Base64 照片）
2. 顯示中學生 ID Set（向後相容：若無記錄則顯示所有學生）
3. 加分圖示下拉選單（動態 append option）
4. 上次選取的圖示值
5. 加分音效下拉選單（動態 append option）

### 3.3 localStorage 鍵值

| 鍵 | 說明 | 清除時機 |
|----|------|---------|
| `rewardSystemStudents` | 學生資料陣列（含 Base64 照片） | clearAll / 永久刪除 |
| `rewardSystemDisplayed` | 目前顯示中的學生 ID Set | clearAll |
| `rewardSystemIcons` | 自訂加分圖示陣列 | clearAll / 單個刪除 |
| `rewardSystemSounds` | 自訂加分音效陣列 | clearAll / 單個刪除 |
| `rewardSystemSelectedIcon` | 目前選取的加分圖示值 | clearAll / 刪除圖示時重設 |
| `pendingRewards` | 待發放獎勵（跨頁面通訊） | clearAll / 處理後 |

### 3.4 儲存空間警告

```javascript
if (e.name === 'QuotaExceededError') {
    alert('儲存空間已滿！建議減少學生照片數量或清除部分資料。');
}
```

Base64 照片佔用較大空間，15 位學生約佔 1.5-3MB localStorage。

---

## 四、跨頁面通訊

### 4.1 機制

各遊戲單元完成後，透過 `js/reward-launcher.js` 將獎勵寫入 `localStorage.pendingRewards`：

```javascript
// 各單元寫入格式
{
    points: correctCount,
    source: '單元名稱',
    timestamp: Date.now()
}
```

### 4.2 獎勵系統接收

```javascript
// 方法一：window message 事件（即時）
window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'REWARD_UPDATE') {
        processPendingRewards();
    }
});

// 方法二：定期輪詢（每 5 秒）
setInterval(() => {
    const pendingRewards = JSON.parse(localStorage.getItem('pendingRewards') || '[]');
    if (pendingRewards.length > 0 && students.length > 0) {
        processPendingRewards();
    }
}, 5000);

// 方法三：頁面載入後延遲 1 秒檢查
setTimeout(() => processPendingRewards(), 1000);
```

### 4.3 `processPendingRewards()` 流程

1. 讀取 `pendingRewards` 陣列
2. 計算總分 + 按來源分組統計
3. 顯示 confirm 對話框（含各來源題數/分數）
4. 若確認：顯示 `showStudentSelector()` 對話框，選擇要加分的學生
5. **清除** `localStorage.pendingRewards`（無論是否確認）

### 4.4 `showStudentSelector()` 功能

- 顯示全部學生列表（checkbox）
- 「全選」按鈕
- 確認後：所選學生分數 +points（若新分數<0則設為0）
- 觸發音效（正/負分對應加分/扣分音效）

---

## 五、版面配置

### 5.1 HTML 結構（index.html）

```
.container（max-width: 800px）
├── .title-row
│   ├── h1（學生優良行為計分）
│   └── .zoom-controls（zoomOutBtn, zoomInBtn）
├── .section-block（區塊一：學生管理 + 上傳）
│   ├── studentSelectDropdown（下拉選單）
│   ├── studentDeleteBtn（🗑️ 永久刪除）
│   ├── addStudentBtn（➕ 新增照片）
│   ├── iconUploadInput（隱藏 input）+ label（🖼️ 新增加分圖示）
│   └── soundUploadInput（隱藏 input）+ label（🔊 新增加分音效）
├── .section-block（區塊二：加分圖示與音效）
│   ├── [左] bonusIconSelect + iconDeleteBtn + bonusIconPreview
│   └── [右] bonusSoundSelect + previewSoundBtn + soundDeleteBtn
├── .section-block（區塊三：分數設定）
│   ├── rankButton（分數排名）
│   ├── resetButton（重設分數，紅色）
│   └── clearAllButton（清除所有資料，灰色）
├── .upload-hint（隱私提示文字）
└── #studentsContainer（學生卡片容器）
```

> **注意**：原 CLAUDE.md 記錄為 4 個 section-block，實際 HTML 只有 3 個。

### 5.2 學生卡片結構（`displayStudent()`）

```
.student-row[data-student-id]
├── .rank-number（排名，可選）
├── .photo-section
│   ├── img.student-photo（100×100px，點擊放大）
│   ├── .student-name（若有）
│   └── .button-group
│       ├── .add-point-btn（加分）
│       └── .subtract-point-btn（扣分）
└── .student-info
    ├── .score-section
    │   ├── .student-score（分數：N）
    │   └── .action-buttons
    │       ├── .move-up-btn（⬆️）
    │       ├── .move-down-btn（⬇️）
    │       ├── .change-photo-btn（更改照片）+ 隱藏 input
    │       └── .delete-btn（清空，從欄位移除）
    └── .icon-display（加分圖示展示區，min-height 55px）
```

### 5.3 重要 CSS 類別

| 類別 | 說明 |
|------|------|
| `.section-block` | 區塊背景（#f9f9f9）、邊框、圓角 |
| `.upload-btn` | 通用按鈕（藍色），`.reset-btn`（紅色），`.clear-all-btn`（灰色） |
| `.select-wrapper` | 下拉選單包裝器（加大版，藍色 2px border） |
| `.bonus-icon-preview-container` | 圖示預覽容器，預設 `visibility: hidden`，加 `has-content` class 後顯示 |
| `.student-row` | 學生卡片（flex 橫排，hover 效果） |
| `.student-photo` | 100×100px，object-fit: contain |
| `.icon-display` | 加分圖示展示區，flex + flex-wrap |
| `.rank-number` | 排名數字（藍色，24px bold） |
| `.student-selector-overlay` | 對話框遮罩（fixed，z-index: 9999） |
| `.student-selector-dialog` | 對話框主體（max-width: 500px，max-height: 80vh） |
| `.photo-zoom-overlay` | 照片放大遮罩（fixed，z-index: 10000，inline style） |
| `.zoom-btn` | 縮放按鈕（36×36px，藍色邊框） |
| `.preview-sound-btn` | 音效預聽按鈕（36×36px，綠色邊框） |

---

## 六、UI 互動功能

### 6.1 新增學生對話框（`showAddStudentDialog()`）

- 動態建立 overlay + dialog
- 包含：學生名稱 input、照片選擇預覽區（150×150px 虛線框）
- 照片選擇後即時壓縮並預覽
- 限制：`students.length >= 15` 則拒絕

### 6.2 照片放大（`showPhotoZoom(student)`）

- 動態建立 `.photo-zoom-overlay`（z-index: 10000）
- 顯示學生名稱（若有）+ 放大照片
- 點擊任意處關閉

### 6.3 學生下拉選單（`updateStudentDropdown()`）

- `✓ 名稱` = 已顯示在欄位
- `＋ 名稱` = 未顯示（選取後加入欄位）
- 選取已顯示的學生：滾動到該卡片並高亮 2 秒（綠色 box-shadow）

### 6.4 移動學生順序（`moveStudent(student, direction)`）

- ⬆️ / ⬇️ 按鈕
- 交換 `students` 陣列中的位置
- `refreshDisplay(false)` 保持手動順序（不啟用排名）

### 6.5 clearAllButton 行為（2026-02-24 修復）

按下「清除所有資料」依序執行：
1. 清除學生陣列（`students = []`）、清空顯示 ID Set
2. 清除自訂圖示陣列（`uploadedIcons = []`、`uploadedIconCount = 0`）
3. 移除圖示下拉選單中所有 `data-icon-name` option
4. 重置圖示預覽與刪除鈕可見性
5. 清除自訂音效陣列（`uploadedSounds = []`、`uploadedSoundCount = 0`）
6. 移除音效下拉選單中所有 `data-sound-name` option
7. 重置音效下拉至第一項
8. 刪除全部 6 個 localStorage 鍵

---

## 七、注意事項與已知限制

### 7.1 localStorage 容量

每位學生照片壓縮後約 30-50KB（Base64 轉換後增加約 33%，約 40-67KB）。15 位學生最多佔用約 1MB，加上圖示約 1.5MB。建議在學生人數多時定期備份或整理。

### 7.2 無 TimerManager / EventManager

`script.js` 未使用 TimerManager 或 EventManager，直接使用 `window.setTimeout` 和 `setInterval`：
- `setInterval` 每 5 秒輪詢 `pendingRewards`（頁面存在期間持續執行）
- `setTimeout` 1 秒後初始化檢查 `pendingRewards`
- 各對話框 event listener 隨 DOM 移除自然回收

### 7.3 音效自動播放限制

行動裝置需使用者先互動（點擊）後方可播放音效，否則 `sound.play()` 會拋出 Promise 拒絕（已有 `.catch()` 處理）。

### 7.4 排名機制

排名使用**密排（Standard Competition Ranking）**：同分者顯示相同排名，下一名跳過排名數。非中國常見排名方式，若需修改請調整 `refreshDisplay()` 中的 `rankToShow` 計算邏輯。

### 7.5 圖示計數器不重置

`uploadedIconCount` 在刪除圖示後**不會減少**（用於命名，不影響功能），因此刪除後再上傳的圖示名稱會繼續遞增（如刪除「自訂圖示01」後再傳，新圖示命名為「自訂圖示02」）。

### 7.6 跨頁面通訊時序

若玩家在獎勵系統**尚未開啟**時完成遊戲，獎勵資料保存在 `pendingRewards` 中。當獎勵系統開啟後：
1. 延遲 1 秒後自動檢查
2. 之後每 5 秒輪詢一次

若此時 `students` 陣列為空（尚未新增學生），輪詢條件 `students.length > 0` 不成立，不會顯示對話框。建議先新增學生再完成遊戲。

---

## 八、修復記錄

### [2026-02-24] clearAllButton 清除範圍擴大

**問題**：原 `clearAllButton` 只清除學生資料和分數，不清除自訂加分圖示和自訂加分音效。

**修復**：在 `clearAllButton` 事件處理器中加入：
- 清除 `uploadedIcons = []`、`uploadedIconCount = 0`，移除所有 `data-icon-name` option
- 清除 `uploadedSounds = []`、`uploadedSoundCount = 0`，移除所有 `data-sound-name` option
- 重置圖示預覽（`updateBonusIconPreview()`）及刪除鈕可見性（`updateIconDeleteBtnVisibility()`）
- 新增刪除 3 個 localStorage 鍵：`rewardSystemIcons`、`rewardSystemSounds`、`rewardSystemSelectedIcon`
- 更新 confirm 提示文字，明確告知清除範圍

**搜尋關鍵字**：`clearAllButton`, `rewardSystemIcons`, `data-icon-name`

---

### [2026-02-24] reward/CLAUDE.md 資訊修正

**問題**：原 CLAUDE.md 記錄了不存在的 `loadCustomConfig()` 函式，行號過時，DOM ID 不完整，localStorage 鍵值表缺少部分鍵。

**修復**：
- 移除 `loadCustomConfig()`（不存在）
- 改為「Grep 函式名稱」為主的查找方式
- 補齊所有 DOM ID（`iconDeleteBtn`、`soundDeleteBtn`、`previewSoundBtn`、`studentSelectDropdown`、`studentDeleteBtn`、`zoomInBtn`/`zoomOutBtn`）
- localStorage 鍵值表補齊 6 個鍵並標注清除時機
- 新增 clearAllButton 行為說明節
- 新增上傳圖示/音效資料結構說明

---

---

### [2026-02-26] 視窗縮放比例持久化

**需求**：使用者按 `+` / `-` 鈕調整縮放比例後，關閉視窗並重新開啟時，應套用上次設定的縮放比例。

**實作（`reward/script.js`）**：

1. **頁面載入時讀取**：在縮放控制初始化段落（`let currentZoom = 100` 之後）加入：
   ```javascript
   const savedZoom = parseInt(localStorage.getItem('rewardSystemZoom') || '100');
   if (savedZoom >= MIN_ZOOM && savedZoom <= MAX_ZOOM) {
       currentZoom = savedZoom;
   }
   ```

2. **`applyZoom()` 加入儲存**：
   ```javascript
   localStorage.setItem('rewardSystemZoom', currentZoom);
   ```

3. **頁面載入後立即套用**：在事件綁定前呼叫 `applyZoom()`，確保頁面一開啟就呈現已儲存的縮放比例。

**新增 localStorage 鍵**：`rewardSystemZoom`（整數，範圍 50~150）。不隨「清除所有資料」一同清除（屬使用者顯示偏好，非學生資料）。

**修改檔案**：`reward/script.js`、`reward/CLAUDE.md`（localStorage 表格補充新鍵）

---

*本報告由 Claude Code 自動生成，最後更新：2026-02-26*
