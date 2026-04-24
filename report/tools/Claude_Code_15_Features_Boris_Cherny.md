# Claude Code 15 項被低估功能整理
**來源**：Boris Cherny（Claude Code 負責人）推文連串，數小時內達 56 萬次瀏覽
**整理日期**：2026-03-31
**驗證狀態**：依公開文件與本專案實際使用經驗逐項標記

---

## 一、背景

Boris Cherny 為 Anthropic 旗下 Claude Code 產品負責人。他以一篇推文連串整理了 15 項「早已內建、卻普遍被忽略」的功能，並公開 Anthropic 內部數據：自今年以來工程師程式碼產出成長逾 200%，Code Review 功能正是因「審查速度跟不上產出」才被開發出來。研究機構 SemiAnalysis 另估計 Claude Code 已佔 GitHub 公開提交量的 4%，預測年底可達 20%。

---

## 二、功能分類整理

### A. 跨裝置連續工作

| # | 指令／功能 | 說明 | 驗證 |
|---|-----------|------|------|
| 1 | **Mobile App（iOS / Android）** | 下載 Claude App → 切換至左側 Code 分頁，即可存取雲端工作階段。Cherny 表示個人大比例的程式修改直接從 iPhone 完成。 | ✅ App Store / Google Play 可下載；Code 分頁已存在 |
| 2 | **`--teleport` / `/teleport`** | 將雲端工作階段拉回本機繼續執行，CLI 啟動時加旗標，或工作階段中直接輸入 `/teleport`。 | ✅ 官方文件有記載 |
| 3 | **`/remote-control`** | 從手機或任何瀏覽器即時操控本機進行中的工作階段。Cherny 在 `/config` 開啟「Enable Remote Control for all sessions」確保每次預設可遠端接手。 | ✅ 本專案 `cladue.bat` 已整合（`claude remote-control --name`） |
| 4 | **Cowork Dispatch** | Claude Desktop App 的安全遠端控制介面，可調用 MCP 連接器、操控瀏覽器、直接操作電腦。Cherny 在非寫程式時間用它處理 Slack 訊息、電子郵件與檔案管理。 | ⚠️ 需 Claude Desktop App；MCP 伺服器設定門檻較高 |

### B. 排程、並行與自動驗證

| # | 指令／功能 | 說明 | 驗證 |
|---|-----------|------|------|
| 5 | **`/loop` / `/schedule`** | 以固定間隔自動執行任務，最長可排程一週。Cherny 實例：`/loop 5m /babysit`（每 5 分鐘處理 code review 與 PR rebase）、`/loop 30m /slack-feedback`（每 30 分鐘整理 Slack 回饋成 PR）。 | ✅ 官方文件有記載 |
| 6 | **Hooks（四個節點）** | 在工作週期特定節點注入確定性邏輯：<br>• `SessionStart`：自動載入專案上下文<br>• `PreToolUse`：每次執行 bash 指令前自動記錄日誌<br>• `PermissionRequest`：授權請求轉發至 WhatsApp，手機直接批准<br>• `Stop`：Claude 等待時自動 poke 繼續，實現無人看管的持續推進 | ✅ 官方文件有完整 Hook 類型說明 |
| 7 | **`claude --worktree`（git worktrees）** | 在同一 repo 開啟多個完全獨立工作樹，每個代理人在自己環境作業互不干擾。Cherny 表示隨時都有幾十個 Claude 在跑，worktrees 是核心基礎設施。非 git 版控可用 `WorktreeCreate` hook 自訂邏輯。 | ✅ 本專案 Agent 工具已使用 `isolation: "worktree"` |
| 8 | **`/batch`** | 2025 年 2 月底正式推出。先提問釐清需求，再自動拆解工作並同時開啟數十至數千個 worktree 代理人並行執行。典型場景：`/batch migrate from jest to vite`，Claude 自行協調整個遷移過程。 | ✅ 2025-02 推出，官方公告可查 |

### C. 開發工具鏈整合

| # | 指令／功能 | 說明 | 驗證 |
|---|-----------|------|------|
| 9 | **Chrome 擴充套件（beta）** | 讓 Claude 直接操控瀏覽器、讀取 console log、測試 UI 互動。Cherny 類比：不讓工程師開瀏覽器，成果會打折；Chrome 擴充套件把驗證能力還給 Claude。 | ✅ Chrome Web Store 有 beta 版；目前為 beta 狀態 |
| 10 | **Claude Desktop App 內建瀏覽器** | 自動啟動 web server 並以內建瀏覽器測試，本機開發完整流程在 Claude 中閉環。CLI / VS Code 使用者可改用 Chrome 擴充套件達成類似效果。 | ✅ Desktop App 功能，需安裝桌面版 |
| 11 | **`/branch`（`claude --resume --fork-session`）** | 從同一工作節點分叉出不同嘗試方向，隨時可切回原本主線，解決「改壞了回不去」的心理負擔。 | ✅ 官方文件有記載 |
| 12 | **`/btw`** | 代理人仍在執行任務時，插入快速旁支問答而不中斷主工作流程。 | ✅ 官方文件有記載 |

### D. SDK 與多 Repo 協作優化

| # | 指令／功能 | 說明 | 驗證 |
|---|-----------|------|------|
| 13 | **`--bare` 旗標** | 以 `-p` 模式或 TypeScript / Python SDK 非互動式呼叫時，加上 `--bare` 可跳過 CLAUDE.md、設定檔、MCP 等自動載入，可將 SDK 啟動時間縮短最多 **10 倍**，對批次處理與 CI 流程有實質影響。 | ✅ CLI 文件有記載；10x 數字來自 Cherny 本人 |
| 14 | **`--add-dir`（`/add-dir`）** | 啟動時加入其他 repo 目錄，不只是讓 Claude「看到」，還同步賦予完整操作權限。可寫入 `settings.json` 的 `additionalDirectories` 供團隊共用。 | ✅ 官方文件有記載 |
| 15 | **`--agent` 旗標** | 在 `.claude/agents/` 定義 Markdown 代理人配置檔，以 `claude --agent=<名稱>` 啟動具有自訂系統提示與工具限制的子代理人。Cherny 示範的 ReadOnly 代理人僅開放讀取工具，適合安全審查場景。 | ✅ 本專案 CLAUDE.md 中的 `subagent_type` 是同概念的延伸 |

### E. 輸入體驗

| # | 指令／功能 | 說明 | 驗證 |
|---|-----------|------|------|
| 16* | **`/voice`（語音輸入）** | CLI 執行 `/voice` 後按住空白鍵；Desktop 版點擊語音按鈕；iPhone 可在系統設定開啟聽寫功能。Cherny 親口確認日常以說話為主、鍵盤為輔。 | ✅ 官方功能；iOS 聽寫為系統層級整合 |

> *原文標題為 15 項，文中實際羅列 16 個功能點（hooks 拆為 4 個子項，`/loop` 與 `/schedule` 合為一項）。此處依功能語意個別列出，數量略有出入屬正常。

---

## 三、驗證說明

### 3.1 可直接確認（本專案已使用）

| 功能 | 本專案使用記錄 |
|------|--------------|
| `claude --worktree` | Agent 工具中 `isolation: "worktree"` 參數，自動建立隔離分支 |
| `claude remote-control` | `cladue.bat` 已整合（2026-03-31 更新） |
| `--agent` 概念 | CLAUDE.md `subagent_type` 欄位（general-purpose / Explore / Plan 等） |
| hooks | `CLAUDE.md` 列有 SessionStart / PreToolUse 等 hook 說明 |

### 3.2 數據可信度評估

| 數據 | 來源 | 可信度 |
|------|------|--------|
| 56 萬次瀏覽 | Cherny 推文本身 | 高（平台公開數據） |
| Anthropic 內部程式碼產出 +200% | Cherny 2026-03-09 公開數據 | 中（內部數據，單一來源） |
| GitHub 提交量 4% | SemiAnalysis 研究報告 | 中高（獨立研究機構，方法論未完全公開） |
| `/batch` 2025 年 2 月推出 | 官方公告 | ✅ 可查 |
| `--bare` 縮短啟動 10 倍 | Cherny 個人說法 | 中（依環境而異，CLAUDE.md 大小影響顯著） |

### 3.3 注意事項

- **Cowork Dispatch** 需要 Claude Desktop App 並設定 MCP 伺服器，對非技術使用者門檻較高；文中描述的「處理 Slack 訊息」需另外配置 Slack MCP 連接器。
- **`/batch`** 雖已正式推出，但「數千個 worktree」的並行規模涉及大量 API 費用，實際使用需考量成本。
- **Chrome 擴充套件** 仍為 beta 版，穩定性與功能完整性可能持續更新。
- **`--teleport`** 需要雲端工作階段（Claude.ai/code），本機純 CLI 使用者無法直接套用。
- **`/voice`** 在 Windows 環境的支援依賴 OS 層語音 API，體驗可能與 macOS / iOS 不同。

---

## 四、功能地圖（概念關係）

```
Claude Code 功能層次
│
├── 裝置層
│   ├── Mobile App（iOS/Android）
│   ├── Claude Desktop App
│   └── CLI / VS Code 擴充
│
├── 工作階段層
│   ├── /teleport（雲端 ↔ 本機）
│   ├── /remote-control（遠端操控本機）
│   ├── /branch（工作節點分叉）
│   └── /btw（不中斷插入問答）
│
├── 自動化層
│   ├── /loop + /schedule（排程執行）
│   ├── hooks（週期節點注入邏輯）
│   │   ├── SessionStart
│   │   ├── PreToolUse
│   │   ├── PermissionRequest
│   │   └── Stop
│   └── /batch（大規模並行代理人）
│
├── 環境層
│   ├── --worktree（隔離工作樹）
│   ├── --add-dir（跨 repo 操作）
│   └── --agent（自訂子代理人）
│
├── 驗證層
│   ├── Chrome 擴充套件（瀏覽器操控）
│   └── Desktop 內建瀏覽器（完整閉環）
│
└── 輸入層
    ├── --bare（SDK 快速啟動）
    ├── /voice（語音輸入）
    └── Cowork Dispatch（MCP 遠端控制）
```

---

## 五、與本專案的關聯

Money Tutor 專案目前已實際使用的 Claude Code 功能：

| 功能 | 使用方式 |
|------|---------|
| **`--worktree`（Agent isolation）** | 每次 Agent 任務自動隔離，避免污染主分支 |
| **`/remote-control`** | `cladue.bat` 雙視窗模式（互動式 + 遠端控制伺服器） |
| **`--agent` 概念** | CLAUDE.md 定義多種 `subagent_type`（Explore、Plan、general-purpose 等） |
| **Hooks（概念）** | CLAUDE.md 的 `user-prompt-submit-hook` 已在使用 |
| **`CLAUDE.md`（`SessionStart` 概念）** | 每次對話自動載入專案完整上下文，對應 SessionStart hook 的設計意圖 |

**下一步建議**：

1. `/loop` + `/schedule`：可考慮為 Money Tutor 設定每日自動執行的 QA 腳本（例如每 24 小時掃描 JS console error）。
2. `--bare` 旗標：若未來整合 CI/CD 自動部署，可在腳本中加上 `--bare` 縮短啟動時間。
3. `/btw`：開發過程中可用於在 Claude 執行大型重構時，同步插入小問題而不中斷主任務。

---

*資料來源：Boris Cherny 推文（2026 年 3 月）、Anthropic 官方文件、SemiAnalysis 研究報告*
*整理：Claude Code（claude-sonnet-4-6），依原文逐項驗證與結構化*
