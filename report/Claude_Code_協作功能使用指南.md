# Claude Code 協作功能使用指南

> 建立日期：2026-03-08
> 說明：Claude Code 沒有名為「cowork」的指令，但提供多種協作與平行工作功能，本文統一說明。

---

## 功能總覽

| 功能 | 適用情境 |
|------|---------|
| **Agent 團隊** | 多個 Claude 同時協作、平行研究或互相辯論 |
| **遠端控制** | 從手機、平板或其他裝置操作本機 Claude |
| **Worktree 隔離** | 同一專案開多個獨立分支各自執行 |
| **子代理（Subagent）** | 同一會話中委派特定任務給專屬助手 |

---

## 一、Agent 團隊（多代理協作）

> **狀態**：實驗性功能，預設關閉。

多個 Claude Code 會話共用任務清單、可互傳訊息，真正平行協作。

### 啟用方式

在 `~/.claude/settings.json` 新增：

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

或設定環境變數：

```bash
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

### 啟動 Agent 團隊

直接描述需要平行進行的任務，Claude 會自動建立團隊：

```text
我要設計一個 CLI 工具，請建立 Agent 團隊分工：
- 一位負責使用者體驗
- 一位負責技術架構
- 一位負責風險評估
```

Claude 會自動：
- 建立團隊
- 生成子成員（Teammate）
- 分配任務
- 管理協作流程

### 顯示模式設定

```bash
# 同一終端機顯示所有成員（預設）
claude --teammate-mode in-process

# 各自分割視窗（需要 tmux 或 iTerm2）
claude --teammate-mode tmux
```

或寫入設定檔永久生效：

```json
{
  "teammateMode": "in-process"
}
```

### 操作快捷鍵

**in-process 模式：**

| 按鍵 | 動作 |
|------|------|
| `Shift+Down` | 切換到下一個成員 |
| `Ctrl+T` | 切換任務清單 |
| `Escape` | 中斷目前回合 |
| 直接輸入 | 對目前成員發送訊息 |

**tmux 分割模式：**
- 直接點進各成員的視窗互動
- 可同時看見所有人的輸出

### 任務管理指令（自然語言）

```text
請建立一個 4 人團隊，平行重構各模組，每人使用 Sonnet。

請架構師成員在進行任何修改前先提交計畫。

請研究員成員關閉。

把任務 #3 指派給前端成員。
```

### 共用任務清單狀態

| 狀態 | 說明 |
|------|------|
| **待處理** | 尚未分配的任務（含相依性） |
| **進行中** | 目前由成員執行 |
| **已完成** | 執行完畢 |
| **相依封鎖** | 等待前置任務完成 |

### 限制事項

- 同一會話只能有一個團隊
- 成員無法再生成自己的子團隊
- 成員關閉較慢（等目前請求完成）
- 無法恢復含 in-process 成員的會話

---

## 二、遠端控制（Remote Control）

從任何裝置透過瀏覽器或手機 App 操作本機的 Claude Code 會話。

### 啟動遠端控制

**新會話：**

```bash
claude remote-control
claude remote-control "我的專案"          # 自訂名稱
claude remote-control --name "我的專案"
```

**從現有會話：**

```text
/remote-control
/remote-control 我的專案名稱
```

### 從其他裝置連線

終端機會顯示 URL 與 QR Code，三種連線方式：

1. 直接點擊連結 → 開啟 `claude.ai/code`
2. 掃描 QR Code → 使用 Claude 手機 App（iOS / Android）
3. 開啟 `claude.ai/code` → 在清單中找到對應會話（綠點 = 上線中）

### 為所有會話啟用遠端控制

```text
/config
# 切換「為所有會話啟用遠端控制」為開啟
```

或寫入設定檔：

```json
{
  "remoteControlEnabled": true
}
```

### 特性

- 程式在**本機執行**，非雲端
- 可存取所有本機工具、MCP 伺服器、檔案
- 多裝置訊息同步
- 網路中斷後可自動重連（約 10 分鐘內）

### 限制事項

- 每個 Claude Code 實例只能有一個遠端會話
- 終端機必須持續開著（不可關閉進程）
- 網路中斷超過 10 分鐘會斷線

---

## 三、Worktree 隔離（平行分支）

在同一個 Git 儲存庫中開多個隔離的工作目錄，各自跑獨立的 Claude 會話，互不干擾。

### 建立 Worktree 會話

```bash
# 自動產生名稱
claude --worktree

# 自訂名稱（同時成為分支名稱與目錄名稱）
claude --worktree feature-auth
claude --worktree bugfix-123
```

建立位置：`<專案>/.claude/worktrees/<名稱>/`
對應分支：`worktree-<名稱>`

### 清理 Worktree

Claude 會自動判斷：
- **無變更** → 自動刪除 worktree 與分支
- **有變更** → 詢問是否保留

手動清理：

```bash
git worktree list
git worktree remove ../project-feature-a
```

### 建議設定

在 `.gitignore` 加入：

```
.claude/worktrees/
```

---

## 四、子代理（Subagent）

在同一個會話中委派特定任務給專屬助手，助手完成後回報主代理。

### 查看與使用子代理

```text
/agents
```

內建子代理包含：
- 程式碼審查員
- 除錯員
- 資料科學家
- 資料庫驗證員

### 自動委派（直接描述即可）

```text
幫我審查最近的變更有無安全漏洞。

執行所有測試並修復失敗的部分。
```

Claude 會自動選擇適合的子代理處理。

### 建立自訂子代理

在 `.claude/agents/` 目錄下建立 Markdown 設定檔：

```yaml
---
name: code-reviewer
description: 審查程式碼品質問題
model: claude-opus-4-6
permissions:
  - read
  - webfetch
---

你是一位專業的程式碼審查員，專注於...
```

### 子代理與 Agent 團隊的差異

| 比較項目 | 子代理 | Agent 團隊 |
|---------|--------|-----------|
| 溝通方式 | 只向主代理回報 | 成員間可互傳訊息 |
| 協調方式 | 主代理統一管理 | 透過共用任務清單自我協調 |
| Context | 共用主代理 context | 各自獨立 |
| Token 成本 | 較低（摘要結果） | 較高（獨立 Claude 實例） |

---

## 五、背景任務

在互動模式中以 `!` 前綴執行不阻塞的背景指令：

```bash
!npm run build         # 背景執行 build，繼續對話
!pytest tests/         # 背景執行測試
```

結果準備好時自動顯示，不打斷目前對話。

---

## 六、選用建議

| 情境 | 建議功能 |
|------|---------|
| 平行編輯不同模組（無檔案衝突） | Worktree（`--worktree`） |
| 平行研究調查（多角度） | Agent 團隊 |
| 從不同面向審查程式碼 | Agent 團隊（3 位審查員） |
| 快速委派特定任務 | 子代理（`/agents`） |
| 從手機或平板操作 | 遠端控制（`/remote-control`） |
| 平行處理多個功能分支 | Worktree + 多個 `claude` 視窗 |
| 同一分支的連續輔助任務 | 子代理（`/agents`） |

---

*產生時間：2026-03-08*
*Claude Code 版本參考：claude-sonnet-4-6*
