# 程式碼模板存檔

> 存放從 CLAUDE.md 移出的完整程式碼模板，需要時查閱。

---

## TimerManager 模板

```javascript
TimerManager: {
    timers: new Map(), timerIdCounter: 0,
    setTimeout(callback, delay, category = 'default') {
        const id = ++this.timerIdCounter;
        const timerId = window.setTimeout(() => { this.timers.delete(id); callback(); }, delay);
        this.timers.set(id, { timerId, category }); return id;
    },
    clearAll() { this.timers.forEach(t => window.clearTimeout(t.timerId)); this.timers.clear(); },
    clearByCategory(category) {
        this.timers.forEach((t, id) => { if (t.category === category) { window.clearTimeout(t.timerId); this.timers.delete(id); } });
    }
}
```

## EventManager 模板

```javascript
EventManager: {
    listeners: [],
    on(element, type, handler, options = {}, category = 'default') {
        if (!element) return -1;
        element.addEventListener(type, handler, options);
        return this.listeners.push({ element, type, handler, options, category }) - 1;
    },
    removeAll() { this.listeners.forEach(l => { try { l?.element?.removeEventListener(l.type, l.handler, l.options); } catch(e){} }); this.listeners = []; },
    removeByCategory(category) {
        this.listeners.forEach((l, i) => { if (l?.category === category) { try { l.element?.removeEventListener(l.type, l.handler, l.options); } catch(e){} this.listeners[i] = null; } });
    }
}
```

**呼叫點規範**：
- `init()`：`TimerManager.clearAll()` + `EventManager.removeAll()` + `injectGlobalAnimationStyles()`
- `renderWelcomeScreen()`：`TimerManager.clearAll()` + `EventManager.removeByCategory('gameUI')`
- `showResults()`：`TimerManager.clearByCategory('turnTransition')`

---

## 煙火觸發（A 系列完成畫面）

```javascript
setTimeout(() => {
    document.getElementById('success-sound')?.play();
    if (typeof confetti === 'function') {
        const duration = 3000, animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1001 };
        const rand = (a, b) => Math.random() * (b - a) + a;
        const iv = setInterval(() => {
            const t = animationEnd - Date.now();
            if (t <= 0) return clearInterval(iv);
            const n = 50 * (t / duration);
            confetti({ ...defaults, particleCount: n, origin: { x: rand(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount: n, origin: { x: rand(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    }
}, 100);
```

> 注意：實際代碼中已改為 `TimerManager.setTimeout(fireConfetti, 250, 'confetti')` 遞迴寫法，Grep `fireConfetti` 定位。

---

## 完成畫面滾動修復

```javascript
document.body.style.overflow = 'auto';
document.documentElement.style.overflow = 'auto';
app.style.overflow = 'auto'; app.style.height = 'auto'; app.style.minHeight = '100vh';
```

---

## 獎勵系統按鈕（標題列）

```html
<button class="reward-btn" onclick="if(typeof RewardLauncher!=='undefined'){RewardLauncher.open();}else{window.open('../reward/index.html','RewardSystem','width=1200,height=800');}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 8px 12px; border-radius: 5px; cursor: pointer; margin-right: 10px; font-size: 14px;">🎁 獎勵</button>
```

## 獎勵系統設定選項 + 事件監聽器

```html
<div class="setting-group">
    <label style="text-align: left; display: block;">🎁 獎勵系統：</label>
    <div class="button-group">
        <a href="#" id="settings-reward-link" class="selection-btn"
           style="text-decoration: none; display: inline-flex; align-items: center; justify-content: center;">
            開啟獎勵系統
        </a>
    </div>
</div>
```
```javascript
document.getElementById('settings-reward-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (typeof RewardLauncher !== 'undefined') RewardLauncher.open();
    else window.open('../reward/index.html', 'RewardSystem', 'width=1200,height=800');
});
```

## 完成畫面獎勵連結

```html
<a href="#" id="completion-reward-link" style="color:#4CAF50;font-size:18px;font-weight:bold;text-decoration:underline;cursor:pointer;margin-top:15px;display:block;text-align:center;">
    🎁 開啟獎勵系統 (答對 ${correctCount} 題，可加 ${correctCount} 分)
</a>
```

---

## A 系列學習成果內容

| 單元 | 學習成果 |
|------|---------|
| A1 | 完成自動販賣機操作學習、投幣找零、商品選購確認 |
| A2 | 完成理髮廳自助機操作、服務付款、取號等候 |
| A3 | 完成速食店點餐機操作、餐點套餐、付款取餐 |
| A4 | 完成超市購物結帳、商品挑選、付款找零 |
| A5 | 依交易類型動態顯示（withdraw/deposit/inquiry/transfer） |
| A6 | 完成售票機操作、路線票種、付款取票 |

**表現評價（getPerformanceByCount）**：≥10 題非常熟練 / ≥5 題不錯 / <5 題初次嘗試

---

## A6 自訂車站系統（遊戲 JS，非作業單）

函數：`addCustomStation()` / `deleteCustomStation()` / `saveCustomStations()` / `loadCustomStations()` / `resolveStationId()` / `generatePresetQuestion()`

資料：`{ id, name, displayName, region, proxyStationId, isCustom }`；代理：北→臺北、中→臺中、南→高雄、東→花蓮；`MAX_CUSTOM_STATIONS: 6`；localStorage：`a6_customStations`
