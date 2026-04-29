# C5 夠不夠 Unit Completion Report

> 修復記錄見下方；架構說明見 CLAUDE.md。

## 主物件

- `Game`（全域）；`Game.Debug.FLAGS`

## 主要 HTML/JS

- `html/c5_enough_money.html`
- `js/c5_enough_money.js`

## 注意事項

- `generateSufficientMoney` 已廢棄（stub 保留）
- 完成畫面：inline（Grep `完成挑戰` 或 `completion`）

---

## 修復記錄速查（從 CLAUDE.md 遷移，2026-04-29）

| 項目 | 搜尋關鍵字 |
|------|------------|
| C5 輔助點擊彈窗偵測 | `c5-instruction-modal`, `_closeInstructionModal` |
| C5/C6 反復測試錯誤語音精簡（2026-04-07）| 反復測試模式選錯只播「不對喔，請再試一次」（不含進題語音）；`mode === 'single'` 保留雙語音；搜尋 `不對喔，請再試一次`、`mode === 'single'` |
