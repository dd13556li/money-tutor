# C6 找零 Unit Completion Report

> 修復記錄見下方；架構說明見 CLAUDE.md。

## 主物件

- `Game`（全域）；`Game.Debug.FLAGS`

## 主要 HTML/JS

- `html/c6_making_change.html`
- `js/c6_making_change.js`

## 注意事項

- 完成畫面：inline（Grep `完成挑戰` 或 `completion`）
- `generateSufficientMoney` 已廢棄（stub 保留）
- 圖片：`images/c6/`（`icon-c6-star-sticker`, `icon-c6-mystery-gift` 等）

---

## 修復記錄速查（從 CLAUDE.md 遷移，2026-04-29）

| 項目 | 搜尋關鍵字 |
|------|------------|
| C6 重複進題+過渡語音 | `nextQuestionScheduled`, `transitionText`, `進入第`, `測驗結束` |
| c6 圖片檔名修正 | `icon-c6-star-sticker`, `icon-c6-mystery-gift` |
| C5/C6 反復測試錯誤語音精簡（2026-04-07）| 反復測試模式選錯只播「不對喔，請再試一次」（不含進題語音）；C6 `selectC6ChangeOption` 錯誤分支依 mode 拆分；搜尋 `不對喔，請再試一次`、`mode === 'single'`、`selectC6ChangeOption` |
