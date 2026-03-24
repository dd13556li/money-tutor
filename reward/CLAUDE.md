# 學生優良行為計分板 - 常用檔案位置速查

> 詳細說明見 `report/Reward_Unit_Completion_Report.md`

## 檔案結構

```
reward/
├── index.html      # 主頁面 HTML（~92 行）
├── script.js       # 主要 JavaScript 邏輯（~1053 行）
├── styles.css      # 樣式表（~636 行）
├── sound/          # 音效檔案資料夾
│   ├── bouns01.mp3
│   ├── bouns02.mp3
│   ├── bouns03.mp3
│   └── deduction.mp3
└── CLAUDE.md       # 本檔案
```

---

## script.js 重要函式（用 Grep 搜尋函式名稱定位）

| 函式名稱 | 說明 |
|---------|------|
| `compressImage()` | 圖片壓縮（獨立於 DOMContentLoaded 外，maxWidth=300, quality=0.7） |
| `showAddStudentDialog()` | 新增學生照片對話框 |
| `saveToLocalStorage()` | 儲存所有資料到 localStorage（學生、圖示、音效、選取狀態） |
| `loadFromLocalStorage()` | 從 localStorage 載入並重建下拉選單 |
| `processPendingRewards()` | 處理待發放獎勵（跨頁面通訊） |
| `showStudentSelector()` | 選擇學生加分對話框 |
| `updateBonusIconPreview()` | 更新加分圖示預覽（支援 emoji / Base64 圖片） |
| `updateIconDeleteBtnVisibility()` | 依選取項目顯示／隱藏圖示刪除鈕（自訂才顯示） |
| `refreshDisplay()` | 重新整理學生顯示區域 |
| `updateStudentDropdown()` | 重建學生選擇下拉選單 |
| `displayStudent()` | 顯示單一學生卡片（含加分/扣分/移動/換照片/清空按鈕） |
| `showPhotoZoom()` | 點擊照片放大顯示 overlay |
| `handleChangePhoto()` | 更改學生照片（含壓縮） |
| `handleClearStudentFromDisplay()` | 從欄位移除學生（學生資料保留在下拉選單） |
| `handleDeleteStudent()` | 永久刪除學生（從主列表移除，內部用） |
| `moveStudent()` | 學生上下排序 |
| `playSound()` | 播放加分／扣分音效 |
| `updateScore()` | 更新分數並觸發音效與畫面重整 |
| `updateRankings()` | 觸發排名顯示 |

---

## 重要 DOM 元素 ID

| ID | 說明 |
|----|------|
| `addStudentBtn` | 新增照片按鈕 |
| `iconUploadInput` | 新增加分圖示（隱藏 input，最多 5 個） |
| `soundUploadInput` | 新增加分音效（隱藏 input，最多 1 個，限 300KB） |
| `bonusIconSelect` | 加分圖示下拉選單（內建 emoji + 自訂上傳） |
| `bonusSoundSelect` | 加分音效下拉選單（內建音效 + 自訂上傳） |
| `bonusIconPreview` | 加分圖示預覽圖片元素 |
| `iconDeleteBtn` | 刪除自訂加分圖示（僅自訂項目時可見） |
| `soundDeleteBtn` | 刪除自訂加分音效 |
| `previewSoundBtn` | 預聽加分音效 |
| `studentSelectDropdown` | 學生選擇下拉選單（含顯示/隱藏切換） |
| `studentDeleteBtn` | 永久刪除學生按鈕（🗑️） |
| `rankButton` | 分數排名按鈕 |
| `resetButton` | 重設分數按鈕（僅清分數，保留學生與圖示音效） |
| `clearAllButton` | 清除所有資料按鈕（見下方說明） |
| `studentsContainer` | 學生卡片容器 |
| `zoomInBtn` / `zoomOutBtn` | 視窗縮放按鈕（±10%，範圍 50%~150%） |

---

## localStorage 鍵值

| 鍵 | 說明 | 清除時機 |
|----|------|---------|
| `rewardSystemStudents` | 學生資料陣列 | clearAll / 永久刪除 |
| `rewardSystemDisplayed` | 目前顯示中的學生 ID Set | clearAll |
| `rewardSystemIcons` | 自訂加分圖示陣列 | clearAll / 單個刪除 |
| `rewardSystemSounds` | 自訂加分音效陣列 | clearAll / 單個刪除 |
| `rewardSystemSelectedIcon` | 目前選取的加分圖示值 | clearAll / 刪除圖示時重設 |
| `pendingRewards` | 待發放獎勵（跨頁面通訊） | clearAll / 處理後 |
| `rewardSystemZoom` | 視窗縮放比例（50~150 整數） | 不隨 clearAll 清除（屬顯示偏好） |

---

## clearAllButton 行為說明

按下「清除所有資料」會一次清除：
1. 學生陣列（`students = []`）與顯示 ID Set
2. 自訂加分圖示陣列（`uploadedIcons = []`）+ 下拉選單中的自訂 option
3. 重置圖示預覽與刪除鈕可見性
4. 自訂加分音效陣列（`uploadedSounds = []`）+ 下拉選單中的自訂 option
5. 刪除全部 6 個相關 localStorage 鍵

**搜尋關鍵字**：`clearAllButton`, `rewardSystemIcons`, `data-icon-name`

---

## 常見修改

### 調整圖片壓縮品質
搜尋 `compressImage(file,` 定位呼叫點（新增學生 / 更改照片 / 上傳圖示）

### 調整下拉選單大小
修改 `styles.css` 中 `.select-wrapper select` 的樣式

### 新增預設加分圖示
在 `index.html` 的 `#bonusIconSelect` 中新增 `<option>`

### 新增預設加分音效
在 `index.html` 的 `#bonusSoundSelect` 中新增 `<option>`
並將音效檔案放入 `sound/` 資料夾

### 調整自訂音效大小上限
搜尋 `MAX_SOUND_SIZE`（目前 300KB）

### 調整學生人數上限
搜尋 `students.length >= 15`

### 調整自訂圖示數量上限
搜尋 `uploadedIcons.length >= 5`
