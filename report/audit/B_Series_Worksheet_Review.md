# B 系列作業單程式碼審查報告

> 審查日期：2026-04-24  
> 審查範圍：`worksheet/units/b1-worksheet.js` ~ `b6-worksheet.js`

---

## 一、審查摘要

| 維度 | 評分 | 說明 |
|------|------|------|
| 題目邏輯合理性 | 8/10 | B4 無難度分級是主要缺陷 |
| 金額合理性 | 7/10 | B2/B3 有極端值，B6 缺廉價食材 |
| 重複程式碼 | 3/10 | 約 300+ 行重複（佔 14%），應提取共用函數 |
| 函數命名一致性 | 6/10 | 私有變數、參數命名不統一 |
| 邊界條件處理 | 7/10 | B3 月曆模式有潛在無限迴圈風險 |
| toolbarConfig 配置 | 5/10 | 各單元配置差異明顯，B3/B4 有缺陷 |
| 題型多樣性 | 9/10 | 題型豐富且進階合理 |
| 整體一致性 | 5/10 | 資料結構命名、難度定義方式不統一 |

---

## 二、各單元快速評估

| 單元 | 主題 | 主要問題 |
|------|------|---------|
| B1 今天帶多少錢 | ✓ 邏輯合理，金額循序漸進 | 重複函數 |
| B2 零用錢日記 | ✓ 題型最豐富 | Hard 金額上限略高（890 元手錶）；重複函數 |
| B3 存錢計畫 | ✓ 月曆題型創新 | 月曆邊界檢查不足；Hard 2400 元腳踏車跨度過大；難度命名不統一 |
| B4 特賣比一比 | ✗ **最多問題** | 無難度分級、無 adjustCountButton、商品混用 |
| B5 生日派對預算 | ✓ 三主題清晰 | 重複函數 |
| B6 菜市場買菜 | ✓ 場景貼近生活 | 豆腐缺少 emoji；Easy 缺廉價食材 |

---

## 三、高優先問題（必須修復）

### 問題 1：B4 無難度分級 ⚠⚠⚠

**位置**：`b4-worksheet.js` `generate()` 函數

**現況**：
```javascript
const items = this._items;  // 沒有 difficulty 區分！
```

所有 10-1580 元的商品共用同一個 `_items` 陣列，Easy 級會出現「運動鞋 1580 元」，完全不適合初學者。

此外 `toolbarConfig.adjustCountButton` 設為 `null`（第 24 行），學生無法選擇難度。

**改進方向**：
```javascript
// 將 _items 拆成三個難度池
_items = {
  easy:   [ /* 10-100 元商品，5-8 筆 */ ],
  normal: [ /* 50-500 元商品，8-10 筆 */ ],
  hard:   [ /* 100-1580 元商品，8-10 筆 */ ]
};

// generate() 中依 difficulty 取對應池
const diff  = options.difficulty || 'easy';
const items = this._items[diff] || this._items.easy;
```

同時需還原 `toolbarConfig.adjustCountButton`，格式與 B1 一致。

---

### 問題 2：大量重複程式碼 ⚠⚠

**位置**：所有 B1-B6 作業單

以下函數在六個檔案中幾乎完全相同，共重複約 300+ 行：

| 函數 | 重複次數 | 備註 |
|------|---------|------|
| `_findCombo(amount)` | 6 次 | 完全相同 |
| `_coinOptions(correct, coins, hard)` | 5 次 | 95% 相同 |
| `_coinsDisplay(coins)` | 4 次 | 完全相同 |
| `renderCoin(denom, face)` 邏輯 | 6 次 | 完全相同 |

**改進方向**：在 `worksheet-generator.js` 中添加靜態工具函數，各單元改為調用：

```javascript
// 建議加入 worksheet-generator.js
static findCombination(amount) {
    const denoms = [1000, 500, 100, 50, 10, 5, 1];
    const result = [];
    let remaining = amount;
    for (const d of denoms) {
        if (remaining >= d) {
            const c = Math.floor(remaining / d);
            result.push({ denom: d, count: c });
            remaining -= c * d;
        }
    }
    return remaining === 0 ? result : null;
}

static generateCoinOptions(correctAmount, correctCoins, isHard) {
    // 統一實作，取代各單元版本
}
```

---

### 問題 3：B3 月曆模式邊界條件不足 ⚠

**位置**：`b3-worksheet.js` `genOne()` 函數（行 162-178 附近）

**現況**：
```javascript
while (gTries++ < 20) {
    const item = calItems[Math.floor(Math.random() * calItems.length)];
    // ...
    if (daysNeeded > daysInMonth && mTries < 12) continue;
    if (daysNeeded > daysInMonth) continue;  // 可能仍無法找到合適題目
}
// 若所有嘗試失敗，返回 null → 上層靜默跳過 → 題目數量不足
```

當 `calItems` 中所有項目都無法適配當月時，`genOne()` 回傳 `null`，最終生成題數可能少於預期。

**改進方向**：
```javascript
// genOne() 失敗時的回退機制
if (!a || !b || !c || !d) {
    // fallback：改用非月曆題型補足，或提示使用者重新生成
    console.warn('[B3] 月曆題目生成失敗，題數可能不足');
    return fallbackQuestions;
}
```

---

## 四、中優先問題（應該改進）

### 問題 4：B6 豆腐缺少 emoji

**位置**：`b6-worksheet.js` `_itemEmoji`（行 103-109）

`_scenarios` 的 Easy/Normal/Hard 多次使用「豆腐」，但 `_itemEmoji` 未定義對應圖示，導致顯示為純文字。

**修復**（1 行）：
```javascript
// 在 _itemEmoji 中加入
'豆腐': '🫆',  // 或 '🍲'
```

---

### 問題 5：toolbarConfig 各單元不一致

| 配置項 | B1 | B2 | B3 | B4 | B5 | B6 |
|--------|----|----|----|----|----|----|
| `fontButton` | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ |
| `adjustCountButton` | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ |
| 題型選項 | fontButton | fontButton | extraButtons | extraButtons | fontButton | fontButton |

B3/B4 將題型選擇放在 `extraButtons`，其他單元放在 `fontButton`，行為一致但設計不統一，維護困難。

**改進方向**：統一改用 `fontButton`，B3/B4 配合補上 `adjustCountButton`。

---

### 問題 6：資料結構命名不統一

| 單元 | 題庫變數名稱 |
|------|------------|
| B1, B5, B6 | `_scenarios` |
| B2 | `_templates` |
| B3, B4 | `_items` |

三種命名指向同樣概念（題庫資料），建議統一為 `_scenarios`（B2/B3/B4 配合修改）。

---

### 問題 7：難度命名不統一

- B3 使用中文「小金額 / 中金額 / 大金額」
- 其他單元使用英文 `easy / normal / hard`

同一套程式碼框架應統一用 `easy / normal / hard`，B3 的中文命名應改回英文。

---

### 問題 8：B2 Hard 級金額上限偏高

**位置**：`b2-worksheet.js` Hard 題庫

Hard 難度出現「智慧手錶 890 元」，金額偏高，超出小學生一般認知範圍。

**建議**：Hard 難度單筆事件金額上限設為 600 元，智慧手錶改為「新書包 580 元」或「溜冰鞋 550 元」等更貼近小學生的商品。

---

### 問題 9：B3 Hard 難度金額跨度過大

**位置**：`b3-worksheet.js` Hard 題庫

Hard 難度目標金額高達 2400 元（腳踏車），與 Normal 最高 800 元差距過大，學生若做錯會感到大量挫折。

**建議**：Hard 上限調整至 1200 元（如「電動玩具 1200 元」、「智慧手表 980 元」），循序漸進。

---

### 問題 10：B6 Easy 缺少廉價食材

**位置**：`b6-worksheet.js` Easy 題庫

Easy 最低食材價格約 20-25 元，對初學者仍有一定難度。建議加入 10-15 元的基礎食材（如醬油 15 元、鹽 10 元），提供更入門的選項。

---

## 五、低優先問題（優化類）

| 編號 | 位置 | 問題 | 改進建議 |
|------|------|------|---------|
| L1 | B5 Normal | Normal 出現拍立得相機 150 元，難度偏高 | 移至 Hard 題庫 |
| L2 | 全部 | `usedLabels` vs `usedKeys` vs `usedValues` 命名不一致 | 統一改為 `usedKeys` |
| L3 | B3 行 250-259 | 月曆生成 4 個 `genOne()` 依序呼叫，當 usedKeys 耗盡時可能多次失敗 | 先檢查剩餘數量 |
| L4 | B4 行 134 | `cheaperOpt = item.optB` 硬編碼假設，缺少說明 | 加入注釋說明 optB 永遠是較便宜選項 |

---

## 六、改進工作量評估

| 問題 | 改動量 | 優先度 |
|------|--------|--------|
| B4 難度分級缺失 | 高（約 40-60 行改寫）| 1 |
| 重複程式碼提取 | 中（6 個檔案各刪 ~50 行，加 20 行至 generator.js）| 2 |
| B3 月曆邊界條件 | 低（5-10 行）| 3 |
| B6 豆腐 emoji | 極低（1 行）| 4 |
| toolbarConfig 統一 | 中（B3/B4 各改 20 行）| 5 |
| 資料結構命名統一 | 低（rename only）| 6 |
| 難度命名統一 | 低（B3 改 3 處）| 7 |
| B2 金額上限 | 極低（改資料 1-2 行）| 8 |
| B3 金額上限 | 極低（改資料 1-2 行）| 9 |
| B6 廉價食材 | 低（加資料 3-5 行）| 10 |
