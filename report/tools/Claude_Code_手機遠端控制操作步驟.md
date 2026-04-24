# Claude Code 手機遠端控制完整操作步驟

> 建立日期：2026-03-08
> 適用系統：Windows 10 / 11

---

## 前置準備

- 電腦已安裝 Claude Code
- 擁有 Pro / Max / Team / Enterprise 帳號（不支援 API Key）
- 手機（iPhone 或 Android）

---

## 第一部分：設定電腦自動開放遠端連線（只需做一次）

已完成設定，`~/.claude/settings.json` 已加入：

```json
{
  "remoteControlEnabled": true
}
```

---

## 第二部分：安裝手機 App

### iOS（iPhone / iPad）
1. 打開 **App Store**
2. 搜尋「**Claude**」
3. 找到 Anthropic 開發的 App，點擊安裝
4. 安裝完成後打開，用**和電腦相同的帳號**登入

### Android
1. 打開 **Google Play**
2. 搜尋「**Claude**」
3. 找到 Anthropic 開發的 App，點擊安裝
4. 安裝完成後打開，用**和電腦相同的帳號**登入

---

## 第三部分：開啟終端機

### 方法一（最簡單）
1. 按鍵盤 `Windows 鍵 + R`
2. 跳出視窗後輸入 `cmd`
3. 按 **Enter**
4. 出現黑色視窗，顯示 `C:\Users\hidar>`

### 方法二
1. 按鍵盤左下角 `Windows` 鍵
2. 輸入 `cmd`
3. 點擊「命令提示字元」開啟

---

## 第四部分：啟動 Claude Code

在終端機黑色視窗輸入：

```
claude
```

按 **Enter**，等待畫面出現 Claude Code 介面：

```
╭─────────────────────────────╮
│ Claude Code                 │
╰─────────────────────────────╯

>
```

看到 `>` 表示已成功進入 Claude Code。

---

## 第五部分：取得 App 下載 QR Code（已有 App 可跳過）

進入 Claude Code 後，輸入：

```
/mobile
```

按 **Enter**，畫面會出現 QR Code，用手機掃描即可前往下載 App。

---

## 第六部分：啟動遠端控制

### 方式一：在 Claude Code 中輸入指令

進入 Claude Code 後，輸入：

```
/remote-control
```

按 **Enter**，畫面顯示：

```
遠端控制已啟動
網址：https://claude.ai/code/sessions/xxxxxx

[QR Code 圖形]
按空白鍵切換 QR Code 顯示
```

### 方式二：直接從終端機啟動

不進入 Claude Code，直接在終端機輸入：

```
claude remote-control
```

按 **Enter**，同樣會顯示網址與 QR Code。

---

## 第七部分：手機連線

取得網址或 QR Code 後，選擇以下任一方式連線：

### 方式一：掃描 QR Code（最快）
1. 打開手機 **Claude App**
2. 找到 Code 或會話區塊
3. 選擇掃描 QR Code
4. 對準電腦畫面掃描
5. 自動連線完成

### 方式二：傳網址到手機
1. 複製終端機顯示的網址（`https://claude.ai/code/sessions/xxxxxx`）
2. 用 **Line / 訊息 / Email** 傳到手機
3. 手機點開網址
4. 自動進入會話畫面

### 方式三：從 App 會話列表找
1. 打開手機 **Claude App**
2. 進入 Code 或會話列表
3. 找到有**綠色圓點**的會話（代表電腦目前上線中）
4. 點進去即可連線

---

## 第八部分：連線後的操作

連線成功後，手機畫面會顯示和電腦相同的 Claude Code 對話介面。

| 可以做的事 | 說明 |
|-----------|------|
| 傳送指令 | 在手機輸入文字，電腦上的 Claude 會執行 |
| 查看結果 | 即時看到 Claude 的回覆與操作內容 |
| 查看程式碼變更 | 看到電腦上的檔案被修改的內容 |
| 對話同步 | 電腦與手機的對話完全同步 |
| 中斷任務 | 可以隨時停止 Claude 正在執行的動作 |

> ⚠️ 所有程式仍在**電腦上執行**，手機只是遙控器，不需要電腦和手機在同一個網路。

---

## 注意事項

| 項目 | 說明 |
|------|------|
| 終端機不能關 | 電腦的終端機黑色視窗必須保持開啟，關掉就斷線 |
| 同一帳號 | 手機和電腦必須登入同一個 Anthropic 帳號 |
| 網路中斷 | 10 分鐘內可自動重連，超過則需重新啟動 |
| 同時連線 | 可同時用多個裝置連同一個會話 |

---

## 斷線後重新連線

若斷線，回到電腦終端機重新輸入：

```
claude remote-control
```

再用手機掃碼或點網址重新連入。

---

## 常見問題

**Q：QR Code 沒有出現？**
A：在終端機按一下**空白鍵**，QR Code 會切換顯示。

**Q：手機 App 找不到會話？**
A：確認手機和電腦登入的是**同一個帳號**，並且電腦終端機還開著。

**Q：輸入 `/mobile` 出現錯誤？**
A：要先輸入 `claude` 進入 Claude Code，再輸入 `/mobile`。
直接在 `C:\Users\hidar>` 輸入是無效的。

**Q：電腦關機或睡眠後斷線怎麼辦？**
A：重新開啟終端機，輸入 `claude remote-control`，再用手機重新連線。

---

*產生時間：2026-03-08*
*Claude Code 版本參考：claude-sonnet-4-6*
