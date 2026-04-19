# Claude Code 常用指令參考

> 建立日期：2026-03-08
> 語言：繁體中文

---

## 一、斜線指令（輸入 `/` 開頭）

### 會話與導航

| 指令 | 說明 |
|------|------|
| `/help` | 顯示說明與可用指令列表 |
| `/clear` | 清除對話歷史、釋放 context（別名：`/reset`、`/new`） |
| `/resume [會話]` | 依 ID 或名稱恢復對話，或開啟選擇器（別名：`/continue`） |
| `/fork [名稱]` | 從目前對話位置建立分支 |
| `/rewind` | 倒退對話與程式碼至先前狀態，或摘要（別名：`/checkpoint`） |
| `/rename [名稱]` | 重新命名目前會話 |
| `/export [檔名]` | 將目前對話匯出為純文字檔 |
| `/compact [說明]` | 壓縮對話，可附加焦點說明 |

### 資訊與工具

| 指令 | 說明 |
|------|------|
| `/status` | 開啟設定介面（版本、模型、帳號、連線狀態） |
| `/cost` | 顯示 Token 使用統計 |
| `/usage` | 顯示方案用量限制與速率限制狀態 |
| `/context` | 以彩色格狀圖顯示目前 context 使用量 |
| `/copy` | 複製最後一則助理回覆到剪貼簿 |
| `/diff` | 開啟互動式 diff 檢視器，顯示未提交的變更 |
| `/doctor` | 診斷並驗證 Claude Code 安裝與設定 |
| `/release-notes` | 查看完整更新日誌 |
| `/insights` | 產生分析 Claude Code 使用情況的報告 |
| `/stats` | 視覺化每日使用量、會話紀錄、連續使用天數 |
| `/feedback` | 提交使用回饋（別名：`/bug`） |

### 設定與配置

| 指令 | 說明 |
|------|------|
| `/config` | 開啟設定介面（別名：`/settings`） |
| `/permissions` | 查看或更新工具權限（別名：`/allowed-tools`） |
| `/keybindings` | 開啟或建立快捷鍵設定檔 |
| `/theme` | 變更色彩主題 |
| `/model [模型]` | 選擇或切換 AI 模型 |
| `/fast [on\|off]` | 切換快速模式 |
| `/output-style [樣式]` | 切換輸出風格（預設 / 說明 / 學習） |
| `/terminal-setup` | 設定終端機快捷鍵（Shift+Enter 等） |
| `/vim` | 切換 Vim / 一般編輯模式 |

### 記憶與 Context

| 指令 | 說明 |
|------|------|
| `/memory` | 編輯 CLAUDE.md 記憶檔、啟用/停用自動記憶 |
| `/init` | 用 CLAUDE.md 初始化專案 |

### 程式碼審查與 Git

| 指令 | 說明 |
|------|------|
| `/review` | 審查 Pull Request（品質、正確性、安全性、測試覆蓋率） |
| `/security-review` | 分析目前分支待提交變更的安全漏洞 |
| `/pr-comments [PR號碼]` | 抓取並顯示 GitHub PR 的留言 |

### 整合與工具

| 指令 | 說明 |
|------|------|
| `/mcp` | 管理 Model Context Protocol (MCP) 伺服器 |
| `/ide` | 管理 IDE 整合與顯示狀態 |
| `/hooks` | 管理工具事件的 Hook 設定 |
| `/agents` | 管理 Agent（子代理）設定 |
| `/skills` | 列出可用的技能（Skills） |
| `/tasks` | 列出並管理背景任務 |
| `/plan` | 直接從提示進入計畫模式 |
| `/add-dir <路徑>` | 為目前會話新增工作目錄 |

### 登入與帳號

| 指令 | 說明 |
|------|------|
| `/login` | 登入 Anthropic 帳號 |
| `/logout` | 登出 Anthropic 帳號 |
| `/upgrade` | 開啟升級頁面 |
| `/privacy-settings` | 查看並更新隱私設定 |

### 其他

| 指令 | 說明 |
|------|------|
| `/exit` | 離開 CLI（別名：`/quit`） |
| `/install-github-app` | 為儲存庫設定 Claude GitHub Actions |
| `/statusline` | 設定 Claude Code 狀態列 |
| `/desktop` | 在 Claude Code 桌面版繼續目前會話（別名：`/app`） |

---

## 二、鍵盤快捷鍵

### 一般控制

| 快捷鍵 | 說明 |
|--------|------|
| `Ctrl+C` | 取消目前輸入或生成 |
| `Ctrl+D` | 離開 Claude Code 會話 |
| `Ctrl+G` | 在預設文字編輯器中開啟 |
| `Ctrl+L` | 清除終端機畫面 |
| `Ctrl+O` | 切換詳細輸出模式 |
| `Ctrl+R` | 反向搜尋指令歷史 |
| `Ctrl+V` / `Cmd+V` | 從剪貼簿貼上圖片 |
| `Ctrl+T` | 切換任務列表 |
| `Ctrl+F` | 強制終止所有背景 Agent（3 秒內按兩次確認） |
| `Esc + Esc` | 倒退或摘要對話 |
| `Shift+Tab` / `Alt+M` | 切換權限模式 |
| `Option+P` / `Alt+P` | 切換模型 |
| `Option+T` / `Alt+T` | 切換延伸思考（Extended Thinking） |

### 文字編輯

| 快捷鍵 | 說明 |
|--------|------|
| `Ctrl+K` | 刪除至行尾 |
| `Ctrl+U` | 刪除整行 |
| `Ctrl+Y` | 貼上已刪除的文字 |
| `Alt+Y` | 循環貼上歷史（接在 Ctrl+Y 之後） |
| `Alt+B` | 游標後退一個單字 |
| `Alt+F` | 游標前進一個單字 |

### 多行輸入

| 快捷鍵 | 說明 |
|--------|------|
| `\` + `Enter` | 換行（所有終端機適用） |
| `Option+Enter` | 換行（macOS 預設） |
| `Shift+Enter` | 換行（iTerm2、WezTerm、Ghostty、Kitty） |
| `Ctrl+J` | 換行字元 |

### 提示符號前綴

| 前綴 | 說明 |
|------|------|
| `/` | 斜線指令或技能 |
| `!` | Bash 模式（直接執行 Shell 指令） |
| `@` | 檔案路徑提及（觸發自動補全） |

---

## 三、終端機 CLI 指令

### 核心操作

```bash
claude                          # 啟動互動會話
claude "問題內容"               # 帶初始提示啟動互動會話
claude -p "問題內容"            # 透過 SDK 查詢後離開（非互動）
cat 檔案 | claude -p "問題"    # 處理管道輸入
claude -c                       # 繼續最近的對話
claude -c -p "問題"             # 透過 SDK 繼續對話
claude -r "<會話>" "問題"       # 依 ID 或名稱恢復會話
```

### 版本與更新

```bash
claude -v                       # 顯示版本號（--version）
claude update                   # 更新至最新版本
```

### 登入驗證

```bash
claude auth login               # 登入帳號
claude auth login --sso         # 使用 SSO 登入
claude auth logout              # 登出帳號
claude auth status              # 顯示登入狀態
```

---

## 四、常用 CLI 旗標

### 會話控制

| 旗標 | 說明 |
|------|------|
| `--continue` / `-c` | 載入目前目錄最近的對話 |
| `--resume <會話>` / `-r` | 依 ID 或名稱恢復特定會話 |
| `--session-id <uuid>` | 使用指定 Session ID |

### 輸入／輸出

| 旗標 | 說明 |
|------|------|
| `--print` / `-p` | 列印回覆後離開（非互動模式） |
| `--output-format <格式>` | 指定輸出格式（`text`、`json`、`stream-json`） |
| `--json-schema <schema>` | 取得符合 JSON Schema 的驗證輸出 |

### 模型設定

| 旗標 | 說明 |
|------|------|
| `--model <模型>` | 設定模型（`sonnet`、`opus` 或完整名稱） |
| `--max-turns <數字>` | 限制代理輪次（非互動模式） |
| `--max-budget-usd <金額>` | 設定 API 費用上限（非互動模式） |

### 工具與權限

| 旗標 | 說明 |
|------|------|
| `--tools <工具>` | 限制可用的內建工具 |
| `--allowedTools <模式>` | 無需提示即可執行的工具 |
| `--disallowedTools <模式>` | 從模型 context 移除的工具 |
| `--permission-mode <模式>` | 指定初始權限模式（`auto`、`plan`、`always-on`、`always-off`） |
| `--dangerously-skip-permissions` | 跳過所有權限提示（謹慎使用） |

### 系統提示

| 旗標 | 說明 |
|------|------|
| `--system-prompt <文字>` | 以自訂文字取代整個系統提示 |
| `--append-system-prompt <文字>` | 在預設提示後附加自訂文字 |

### 其他

| 旗標 | 說明 |
|------|------|
| `--add-dir <路徑>` | 新增額外工作目錄 |
| `--worktree <名稱>` / `-w` | 在隔離的 git worktree 中啟動 |
| `--verbose` | 啟用詳細記錄 |
| `--debug` | 啟用除錯模式 |

---

## 五、Vim 模式（輸入 `/vim` 啟用）

### 模式切換

| 按鍵 | 說明 |
|------|------|
| `Esc` | 進入 NORMAL 模式 |
| `i` / `I` | 進入 INSERT 模式（游標前 / 行首） |
| `a` / `A` | 進入 APPEND 模式（游標後 / 行尾） |
| `o` / `O` | 在下方 / 上方插入新行 |

### NORMAL 模式導航

| 按鍵 | 說明 |
|------|------|
| `h` / `l` | 左 / 右移動 |
| `j` / `k` | 下 / 上移動 |
| `w` / `b` / `e` | 單字跳躍（前進 / 後退 / 字尾） |
| `0` / `$` / `^` | 行首 / 行尾 / 非空白行首 |
| `gg` / `G` | 輸入區開頭 / 結尾 |
| `f{字元}` / `F{字元}` | 向前 / 向後跳至字元 |

### NORMAL 模式編輯

| 按鍵 | 說明 |
|------|------|
| `x` | 刪除游標字元 |
| `dd` / `D` | 刪除整行 / 刪至行尾 |
| `cc` / `C` | 修改整行 / 修改至行尾 |
| `yy` | 複製整行 |
| `p` / `P` | 貼上（游標後 / 前） |
| `>>` / `<<` | 縮排 / 反縮排 |
| `.` | 重複上一個操作 |

---

## 六、自訂快捷鍵

執行 `/keybindings` 建立或編輯 `~/.claude/keybindings.json`：

```json
{
  "$schema": "https://www.schemastore.org/claude-code-keybindings.json",
  "bindings": [
    {
      "context": "Chat",
      "bindings": {
        "ctrl+e": "chat:externalEditor",
        "ctrl+u": null
      }
    }
  ]
}
```

**可用 context**：`Global`、`Chat`、`Autocomplete`、`Settings`、`Confirmation`、`Tabs`、`Help`、`Transcript`、`HistorySearch`、`Task`、`ThemePicker`、`Attachments`、`Footer`、`MessageSelector`、`DiffDialog`、`ModelPicker`、`Select`、`Plugin`

---

*產生時間：2026-03-08*
*Claude Code 版本參考：claude-sonnet-4-6*
