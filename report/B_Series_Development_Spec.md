# B 系列：預算規劃 — 完整開發規格書

> **建立日期**：2026-03-14
> **系列定位**：銜接 C 系列（貨幣認知）→ A 系列（生活應用）之間的「計畫消費」能力
> **開發原則**：從第一行程式碼起就遵守所有現有規範，不靠事後修補

---

## 一、B 系列單元總覽

| 單元 | 主題 | 核心學習 | 前置單元 |
|------|------|---------|---------|
| B1 | 今天帶多少錢 | 看清單→加總→選錢幣組合 | C5夠不夠、C6找零 |
| B2 | 零用錢日記 | 收支記錄→計算餘額 | C4付款、C5 |
| B3 | 存錢計畫 | 目標金額→計算達成週數 | C2數錢、F5量比較 |
| B4 | 特賣比一比 | 原價vs特價→判斷差額 | C6找零 |
| B5 | 生日派對預算 | 固定預算→選物品組合 | B1、C5 |
| B6 | 菜市場買菜 | 清單採購→付款找零 | B1、C6 |

---

## 二、過去專案的錯誤與 B 系列的對策

> 以下每一項都是真實發生過、花時間修復的問題。B 系列從架構設計就避開。

### 2-1 計時器類

| 過去錯誤 | B 系列對策 |
|---------|-----------|
| 裸 `setTimeout(fn, ms)` 散落各處 | **全面禁止**，只用 `Game.TimerManager.setTimeout(fn, ms, 'category')` |
| `setInterval` 建立後不清除 | **全面禁止**，改用遞迴 `TimerManager.setTimeout` |
| confetti 用 `setInterval` | 直接貼用 CLAUDE.md 的遞迴 confetti 模板 |
| `clearTimeout(TimerManager ID)` 無效 | 用 `TimerManager.clearByCategory()` 取代所有 clearTimeout |

### 2-2 事件監聽類

| 過去錯誤 | B 系列對策 |
|---------|-----------|
| `document.addEventListener` 每輪重複綁定 | `_documentEventsBound` 旗標（如 A2 修復後的做法）|
| DOM 元素 addEventListener 累積 | 遊戲內元素一律用 `EventManager.on(el, type, fn, {}, 'gameUI')`；每題開始前 `EventManager.removeByCategory('gameUI')` |
| 設定頁 listener 未清除 | `EventManager.removeByCategory('settings')` 於 `startGame()` 前執行 |

### 2-3 完成畫面類

| 過去錯誤 | B 系列對策 |
|---------|-----------|
| `showResults()` 重複呼叫 | 一律加 `if (this.state.gameCompleted) return; this.state.gameCompleted = true;` |
| `startTime` 為 null 造成 NaN | 時間計算一律用 `startTime ? (Date.now() - startTime) : 0` |

### 2-4 語音類

| 過去錯誤 | B 系列對策 |
|---------|-----------|
| speak() callback 不執行 | 一律用 `callbackExecuted` + TimerManager 10s 備援 + onerror |
| 語音 `${amount}元` 直接插值 | 一律用 `convertToTraditionalCurrency(amount)` |

### 2-5 架構類

| 過去錯誤 | B 系列對策 |
|---------|-----------|
| `injectGlobalAnimationStyles` 重複注入 | 以 `'bX-global-animations'` id 防重，直接用 CLAUDE.md 模板 |
| `isProcessing` 旗標未設 | 所有點擊 handler 開頭加 `if (this.state.isProcessing) return;` |
| isTrusted 未檢查 | 輔助點擊相關 handler 加 `if (!event.isTrusted) return;` |

---

## 三、共用檔案結構

```
html/
  b1_daily_budget.html
  b2_allowance_diary.html
  b3_savings_plan.html
  b4_sale_comparison.html
  b5_party_budget.html
  b6_market_shopping.html

js/
  b1_daily_budget.js
  b2_allowance_diary.js
  b3_savings_plan.js
  b4_sale_comparison.js
  b5_party_budget.js
  b6_market_shopping.js

css/
  b-series.css          ← B 系列共用（參照 c-series.css）
  b1_daily_budget.css
  b2_allowance_diary.css
  b3_savings_plan.css
  b4_sale_comparison.css
  b5_party_budget.css
  b6_market_shopping.css

worksheet/units/
  b1-worksheet.js
  b2-worksheet.js
  ...
```

### CSS 載入順序（所有 B 系列 HTML 共用）

```html
<link rel="stylesheet" href="../css/ai-theme.css">
<link rel="stylesheet" href="../css/shared-game-base.css">
<link rel="stylesheet" href="../css/b-series.css">
<link rel="stylesheet" href="../css/bX_unit_name.css">
<link rel="stylesheet" href="../css/common-modal-responsive.css">
<link rel="stylesheet" href="../css/dark-mode-simple.css">
```

---

## 四、HTML 模板（所有 B 系列共用）

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BX 單元名稱</title>
    <link rel="stylesheet" href="../css/ai-theme.css">
    <link rel="stylesheet" href="../css/shared-game-base.css">
    <link rel="stylesheet" href="../css/b-series.css">
    <link rel="stylesheet" href="../css/bX_unit_name.css">
    <link rel="stylesheet" href="../css/common-modal-responsive.css">
    <link rel="stylesheet" href="../css/dark-mode-simple.css">
</head>
<body class="bX-unit b-series">
    <div id="app">
        <!-- 內容由 JS 動態產生 -->
    </div>

    <!-- 音效（B 系列固定集合）-->
    <audio id="correct-sound"  src="../audio/correct02.mp3" preload="auto"></audio>
    <audio id="success-sound"  src="../audio/success.mp3"   preload="auto"></audio>
    <audio id="error-sound"    src="../audio/error02.mp3"   preload="auto"></audio>
    <audio id="click-sound"    src="../audio/click.mp3"     preload="auto"></audio>

    <script src="../js/confetti.browser.min.js"></script>
    <script src="../js/audio-unlocker.js"></script>
    <script src="../js/theme-system.js"></script>
    <script src="../js/reward-launcher.js"></script>
    <script src="../js/number-speech-utils.js"></script>
    <script src="../js/bX_unit_name.js?v=1.0"></script>
</body>
</html>
```

> **注意**：B 系列不引用 `touch-drag-utility.js`（B1~B4 無拖放需求）；B5/B6 如需拖放再加入。

---

## 五、JS 架構模板（每個 B 系列單元的骨架）

以下為乾淨的起點模板，**所有已知 bug 防護已內建**，開發者直接填入業務邏輯即可。

```javascript
// =============================================
// FILE: js/bX_unit_name.js — B系列單元X
// =============================================
'use strict';

let Game;

document.addEventListener('DOMContentLoaded', () => {
    Game = {

        // ── 1. Debug System ──────────────────────────────────
        Debug: {
            FLAGS: {
                all: false, init: false, speech: false, audio: false,
                ui: false, question: false, state: false, error: true
            },
            log(cat, ...a)  { if (this.FLAGS.all || this.FLAGS[cat]) console.log(`[BX-${cat}]`, ...a); },
            warn(cat, ...a) { if (this.FLAGS.all || this.FLAGS[cat]) console.warn(`[BX-${cat}]`, ...a); },
            error(...a)     { console.error('[BX-ERROR]', ...a); }
        },

        // ── 2. TimerManager ──────────────────────────────────
        TimerManager: {
            timers: new Map(), timerIdCounter: 0,
            setTimeout(callback, delay, category = 'default') {
                const id = ++this.timerIdCounter;
                const timerId = window.setTimeout(() => { this.timers.delete(id); callback(); }, delay);
                this.timers.set(id, { timerId, category });
                return id;
            },
            clearTimeout(id) {
                const t = this.timers.get(id);
                if (t) { window.clearTimeout(t.timerId); this.timers.delete(id); }
            },
            clearAll() { this.timers.forEach(t => window.clearTimeout(t.timerId)); this.timers.clear(); },
            clearByCategory(cat) {
                this.timers.forEach((t, id) => {
                    if (t.category === cat) { window.clearTimeout(t.timerId); this.timers.delete(id); }
                });
            }
        },

        // ── 3. EventManager ──────────────────────────────────
        EventManager: {
            listeners: [],
            on(el, type, fn, opts = {}, cat = 'default') {
                if (!el) return -1;
                el.addEventListener(type, fn, opts);
                return this.listeners.push({ element: el, type, handler: fn, options: opts, category: cat }) - 1;
            },
            removeAll() {
                this.listeners.forEach(l => {
                    try { l?.element?.removeEventListener(l.type, l.handler, l.options); } catch(e) {}
                });
                this.listeners = [];
            },
            removeByCategory(cat) {
                this.listeners.forEach((l, i) => {
                    if (l?.category === cat) {
                        try { l.element?.removeEventListener(l.type, l.handler, l.options); } catch(e) {}
                        this.listeners[i] = null;
                    }
                });
            }
        },

        // ── 4. Audio ─────────────────────────────────────────
        audio: {
            sounds: {},
            init() {
                ['correct', 'success', 'error', 'click'].forEach(name => {
                    const el = document.getElementById(`${name}-sound`);
                    if (el) this.sounds[name] = el;
                });
            },
            play(name) {
                const s = this.sounds[name];
                if (!s) return;
                s.currentTime = 0;
                s.play().catch(() => {});
            }
        },

        // ── 5. Speech ─────────────────────────────────────────
        Speech: {
            speak(text, callback, onerrorCallback) {
                if (!window.speechSynthesis) { callback?.(); return; }
                window.speechSynthesis.cancel();
                const u = new SpeechSynthesisUtterance(text);
                u.lang = 'zh-TW'; u.rate = 0.9;

                // 雅婷優先
                const voices = window.speechSynthesis.getVoices();
                const yating = voices.find(v => v.name.startsWith('Microsoft Yating'));
                if (yating) u.voice = yating;

                // safeCallback 防重複
                let callbackExecuted = false;
                const safeCallback = () => {
                    if (callbackExecuted) return;
                    callbackExecuted = true;
                    callback?.();
                };

                u.onend = safeCallback;
                u.onerror = () => { (onerrorCallback || safeCallback)(); };

                // 10s 備援
                Game.TimerManager.setTimeout(safeCallback, 10000, 'speech');
                window.speechSynthesis.speak(u);
            }
        },

        // ── 6. State ─────────────────────────────────────────
        state: {
            settings: {
                difficulty: null,       // 'easy' | 'normal' | 'hard'
                questionCount: 10,      // 5 | 10 | 15 | 20 | custom
                // 各單元自訂設定放這裡
                assistClick: false
            },
            quiz: {
                currentQuestion: 0,
                totalQuestions: 10,
                correctCount: 0,
                questions: [],
                startTime: null
            },
            gameCompleted: false,   // ← 完成畫面守衛
            isProcessing: false,    // ← 防快速連點
            _documentEventsBound: false  // ← document 監聽器防重複
        },

        // ── 7. 初始化 ─────────────────────────────────────────
        init() {
            Game.TimerManager.clearAll();
            Game.EventManager.removeAll();
            this.injectGlobalAnimationStyles();
            this.audio.init();
            this.showSettings();
        },

        // ── 8. 全域動畫樣式注入（防重複）────────────────────
        injectGlobalAnimationStyles() {
            if (document.getElementById('bX-global-animations')) return;
            const style = document.createElement('style');
            style.id = 'bX-global-animations';
            style.textContent = `
                @keyframes bXBounce {
                    0%,100% { transform: translateY(0); }
                    50%     { transform: translateY(-8px); }
                }
                /* 各單元在這裡加自己的 keyframes */
            `;
            document.head.appendChild(style);
        },

        // ── 9. 設定頁 ────────────────────────────────────────
        showSettings() {
            Game.TimerManager.clearAll();
            Game.EventManager.removeByCategory('gameUI');
            this.state.gameCompleted = false;

            const app = document.getElementById('app');
            app.innerHTML = this._renderSettingsHTML();

            // 設定頁事件（用 'settings' category）
            this._bindSettingsEvents();
            Game.Debug.log('init', 'showSettings 完成');
        },

        _renderSettingsHTML() {
            return `
            <div class="game-header">
                <button class="back-btn" onclick="Game.backToMenu()">← 返回</button>
                <h1 class="game-title">BX 單元名稱</h1>
                <button class="reward-btn" onclick="if(typeof RewardLauncher!=='undefined'){RewardLauncher.open();}else{window.open('../reward/index.html','RewardSystem','width=1200,height=800');}">🎁 獎勵</button>
            </div>
            <div class="settings-container">
                <!-- 難度 -->
                <div class="setting-group">
                    <label>難度：</label>
                    <div class="button-group" id="difficulty-group">
                        <button class="selection-btn" data-val="easy">簡單</button>
                        <button class="selection-btn" data-val="normal">普通</button>
                        <button class="selection-btn" data-val="hard">困難</button>
                    </div>
                </div>

                <!-- 題數 -->
                <div class="setting-group">
                    <label>題數：</label>
                    <div class="button-group" id="count-group">
                        <button class="selection-btn" data-val="5">5題</button>
                        <button class="selection-btn active" data-val="10">10題</button>
                        <button class="selection-btn" data-val="15">15題</button>
                        <button class="selection-btn" data-val="20">20題</button>
                    </div>
                </div>

                <!-- 獎勵系統連結 -->
                <div class="setting-group">
                    <label>🎁 獎勵系統：</label>
                    <div class="button-group">
                        <a href="#" id="settings-reward-link" class="selection-btn"
                           style="text-decoration:none;display:inline-flex;align-items:center;justify-content:center;">
                            開啟獎勵系統
                        </a>
                    </div>
                </div>

                <button class="start-btn" id="start-btn" disabled>開始練習</button>
            </div>`;
        },

        _bindSettingsEvents() {
            // 難度選擇
            document.querySelectorAll('#difficulty-group .selection-btn').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#difficulty-group .selection-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.difficulty = btn.dataset.val;
                    this._checkCanStart();
                }, {}, 'settings');
            });

            // 題數選擇
            document.querySelectorAll('#count-group .selection-btn').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#count-group .selection-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.questionCount = parseInt(btn.dataset.val);
                }, {}, 'settings');
            });

            // 獎勵系統
            const rewardLink = document.getElementById('settings-reward-link');
            Game.EventManager.on(rewardLink, 'click', (e) => {
                e.preventDefault();
                if (typeof RewardLauncher !== 'undefined') RewardLauncher.open();
                else window.open('../reward/index.html', 'RewardSystem', 'width=1200,height=800');
            }, {}, 'settings');

            // 開始按鈕
            const startBtn = document.getElementById('start-btn');
            Game.EventManager.on(startBtn, 'click', () => this.startGame(), {}, 'settings');
        },

        _checkCanStart() {
            const btn = document.getElementById('start-btn');
            if (btn) btn.disabled = !this.state.settings.difficulty;
        },

        // ── 10. 遊戲開始 ─────────────────────────────────────
        startGame() {
            Game.EventManager.removeByCategory('settings');
            Game.TimerManager.clearAll();

            const s = this.state.settings;
            const q = this.state.quiz;
            q.currentQuestion = 0;
            q.totalQuestions  = s.questionCount;
            q.correctCount    = 0;
            q.startTime       = Date.now();   // ← 必須在這裡設定
            q.questions       = this._generateQuestions(q.totalQuestions);

            this.state.gameCompleted = false;
            this.state.isProcessing  = false;

            this.renderQuestion();
        },

        // ── 11. 題目產生（各單元實作）─────────────────────────
        _generateQuestions(count) {
            // TODO: 各單元實作
            return [];
        },

        // ── 12. 渲染題目 ─────────────────────────────────────
        renderQuestion() {
            Game.TimerManager.clearAll();
            Game.EventManager.removeByCategory('gameUI');
            this.state.isProcessing = false;

            const q   = this.state.quiz;
            const app = document.getElementById('app');
            app.innerHTML = this._renderQuestionHTML(q.questions[q.currentQuestion]);
            this._bindQuestionEvents();
        },

        _renderQuestionHTML(question) {
            return `<!-- 各單元實作 -->`;
        },

        _bindQuestionEvents() {
            // 各單元實作，一律用 EventManager.on(..., 'gameUI')
        },

        // ── 13. 答題處理 ─────────────────────────────────────
        handleAnswer(isCorrect) {
            if (this.state.isProcessing) return;
            this.state.isProcessing = true;

            const q = this.state.quiz;
            if (isCorrect) {
                q.correctCount++;
                this.audio.play('correct');
            } else {
                this.audio.play('error');
            }

            Game.TimerManager.setTimeout(() => this.nextQuestion(), 1200, 'turnTransition');
        },

        nextQuestion() {
            const q = this.state.quiz;
            q.currentQuestion++;
            if (q.currentQuestion >= q.totalQuestions) {
                this.showResults();
            } else {
                this.renderQuestion();
            }
        },

        // ── 14. 完成畫面 ─────────────────────────────────────
        showResults() {
            // ← 守衛：防止重複呼叫
            if (this.state.gameCompleted) return;
            this.state.gameCompleted = true;

            Game.TimerManager.clearByCategory('turnTransition');

            const q        = this.state.quiz;
            const endTime  = Date.now();
            const elapsed  = q.startTime ? (endTime - q.startTime) : 0;  // ← null 防護
            const mins     = Math.floor(elapsed / 60000);
            const secs     = Math.floor((elapsed % 60000) / 1000);
            const accuracy = q.totalQuestions > 0
                ? Math.round((q.correctCount / q.totalQuestions) * 100) : 0;

            // 表現評價
            let badge, badgeColor;
            if (accuracy >= 90)      { badge = '優異 🏆'; badgeColor = '#f59e0b'; }
            else if (accuracy >= 70) { badge = '良好 👍'; badgeColor = '#10b981'; }
            else if (accuracy >= 50) { badge = '努力 💪'; badgeColor = '#6366f1'; }
            else                     { badge = '練習 📚'; badgeColor = '#94a3b8'; }

            const app = document.getElementById('app');
            // 滾動修復
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
            app.style.overflow = 'auto'; app.style.height = 'auto'; app.style.minHeight = '100vh';

            app.innerHTML = `
            <div class="completion-screen">
                <div class="completion-header">
                    <div class="trophy-bounce">🏆</div>
                    <h1>完成挑戰 🎉</h1>
                    <span class="performance-badge" style="background:${badgeColor}">${badge}</span>
                </div>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-num">${q.correctCount}/${q.totalQuestions}</div>
                        <div class="stat-label">答對題數</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-num">${accuracy}%</div>
                        <div class="stat-label">正確率</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-num">${mins > 0 ? mins + '分' : ''}${secs}秒</div>
                        <div class="stat-label">花費時間</div>
                    </div>
                </div>
                <a href="#" id="completion-reward-link"
                   style="color:#4CAF50;font-size:18px;font-weight:bold;text-decoration:underline;cursor:pointer;margin:15px 0;display:block;text-align:center;">
                    🎁 開啟獎勵系統（可加 ${q.correctCount} 分）
                </a>
                <div class="completion-buttons">
                    <button id="play-again-btn" class="btn-play-again">再玩一次</button>
                    <button id="back-settings-btn" class="btn-back-settings">返回設定</button>
                </div>
            </div>`;

            // 綁定完成畫面按鈕
            Game.EventManager.on(
                document.getElementById('play-again-btn'), 'click',
                () => this.startGame(), {}, 'gameUI'
            );
            Game.EventManager.on(
                document.getElementById('back-settings-btn'), 'click',
                () => this.showSettings(), {}, 'gameUI'
            );
            Game.EventManager.on(
                document.getElementById('completion-reward-link'), 'click',
                (e) => {
                    e.preventDefault();
                    if (typeof RewardLauncher !== 'undefined') RewardLauncher.open();
                    else window.open('../reward/index.html', 'RewardSystem', 'width=1200,height=800');
                }, {}, 'gameUI'
            );

            // 音效 + 煙火
            Game.TimerManager.setTimeout(() => {
                document.getElementById('success-sound')?.play();
                this._fireConfetti();
            }, 100, 'confetti');
        },

        _fireConfetti() {
            if (typeof confetti !== 'function') return;
            const duration = 3000, end = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1001 };
            const rand = (a, b) => Math.random() * (b - a) + a;
            const fire = () => {
                const t = end - Date.now();
                if (t <= 0) return;
                const n = 50 * (t / duration);
                confetti({ ...defaults, particleCount: n, origin: { x: rand(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount: n, origin: { x: rand(0.7, 0.9), y: Math.random() - 0.2 } });
                Game.TimerManager.setTimeout(fire, 250, 'confetti');  // ← 遞迴，不用 setInterval
            };
            fire();
        },

        // ── 15. 返回主選單 ────────────────────────────────────
        backToMenu() {
            Game.TimerManager.clearAll();
            Game.EventManager.removeAll();
            window.location.href = '../html/index.html';
        }
    };

    Game.init();
});
```

---

## 六、各單元詳細規格

---

### B1：今天帶多少錢 `b1_daily_budget.js`

#### 學習目標
看行程清單 → 加總所需費用 → 選出正確的錢幣組合放入錢包

#### 題目資料結構

```javascript
// 場景資料庫（共 30 個，難度交錯）
const SCENARIOS = {
    easy: [
        { icon:'🏫', name:'上學', items:[
            { name:'午餐費', cost:50 }
        ]},
        { icon:'🏪', name:'去超商', items:[
            { name:'飲料', cost:25 }
        ]},
        { icon:'📚', name:'圖書館', items:[
            { name:'影印費', cost:10 }
        ]},
        { icon:'🎭', name:'看表演', items:[
            { name:'門票', cost:100 }
        ]},
        { icon:'🏊', name:'游泳課', items:[
            { name:'入場費', cost:80 }
        ]},
    ],
    normal: [
        { icon:'🏫', name:'上學', items:[
            { name:'午餐費', cost:60 },
            { name:'公車費', cost:20 }
        ]},
        { icon:'🎨', name:'才藝課', items:[
            { name:'課程費', cost:150 },
            { name:'材料費', cost:50 }
        ]},
        { icon:'🏥', name:'看醫生', items:[
            { name:'掛號費', cost:150 },
            { name:'藥費', cost:80 }
        ]},
        { icon:'🎬', name:'看電影', items:[
            { name:'票價', cost:280 },
            { name:'爆米花', cost:90 }
        ]},
        { icon:'🚂', name:'搭火車', items:[
            { name:'票價', cost:250 },
            { name:'便當', cost:75 }
        ]},
    ],
    hard: [
        { icon:'🛒', name:'大採購', items:[
            { name:'衣服', cost:350 },
            { name:'鞋子', cost:490 },
            { name:'書', cost:180 }
        ]},
        { icon:'🎂', name:'買生日禮物', items:[
            { name:'禮物', cost:280 },
            { name:'蛋糕', cost:420 },
            { name:'卡片', cost:35 }
        ]},
        { icon:'🌿', name:'去公園', items:[
            { name:'公車費', cost:20 },
            { name:'冰淇淋', cost:45 },
            { name:'門票', cost:100 },
            { name:'飲料', cost:30 }
        ]},
    ]
};
```

#### 遊戲流程

```
1. 顯示行程卡（icon + 行程名 + 費用清單）
2. 顯示計算題（各費用 + 空格填總額）
   - 簡單：直接顯示總額，選錢幣組合
   - 普通：提示各項但不顯示總額，玩家先算後選
   - 困難：不提示總額，需選最省零錢的組合
3. 錢包拖放區：從錢幣盤拖入錢包
4. 「確認出門！」按鈕
5. 驗證：金額是否足夠（允許多，不允許少）
```

#### 錢幣盤配置（依難度）

```javascript
const WALLET_POOL = {
    easy:   [1, 5, 10, 50],           // 硬幣
    normal: [1, 5, 10, 50, 100, 500], // 硬幣 + 鈔票
    hard:   [1, 5, 10, 50, 100, 500, 1000]  // 全面額
};
```

#### AssistClick 步驟（簡單模式）

```javascript
const ASSIST_STEPS = [
    { target: '.schedule-card',     hint: '先看看今天的行程' },
    { target: '.total-display',     hint: '這是需要帶的總金額' },
    { target: '.coin-[X]',          hint: '點擊這枚錢幣放入錢包', dynamic: true },
    { target: '#confirm-btn',       hint: '錢都準備好了，出發！' }
];
```

#### 作業單題型

| 題型 | 說明 |
|------|------|
| 看清單算總額 | 給3~5項費用，填寫總額 |
| 選錢幣組合 | 總額固定，用錢幣符號圈出正確組合 |
| 夠不夠帶 | 錢包有X元，行程要Y元，夠嗎？ |

---

### B2：零用錢日記 `b2_allowance_diary.js`

#### 學習目標
看一週的收支記錄 → 計算剩餘零用錢

#### 題目資料結構

```javascript
const DIARY_TEMPLATES = {
    easy: [
        {
            startAmount: 100,  // 本週起始
            events: [
                { type:'income', name:'媽媽給零用錢', amount:50, icon:'💰' },
                { type:'expense', name:'買飲料', amount:30, icon:'🧋' }
            ]
            // 正解：100 + 50 - 30 = 120
        }
    ],
    normal: [
        {
            startAmount: 200,
            events: [
                { type:'income',  name:'爸爸給零用錢', amount:100, icon:'💰' },
                { type:'expense', name:'買文具',       amount:45,  icon:'✏️' },
                { type:'expense', name:'買零食',       amount:35,  icon:'🍿' },
                { type:'income',  name:'幫忙家事',     amount:20,  icon:'🧹' }
            ]
            // 正解：200 + 100 - 45 - 35 + 20 = 240
        }
    ],
    hard: [ /* 5~6 個事件、金額更大 */ ]
};
```

#### 遊戲流程

```
1. 日記本 UI：每行顯示一個收支事件
   - 收入：綠色 ▲ 金額
   - 支出：紅色 ▼ 金額
2. 最後一行：「現在剩下 ___ 元？」
3. 玩家輸入數字（或選擇題：3個選項）
   - 簡單：選擇題（3選1）
   - 普通/困難：數字輸入（鍵盤）
4. 確認答案
```

#### 特別注意

- **數字輸入**：用自製數字鍵盤（參照 A5 ATM 的輸入方式），避免行動裝置輸入法問題
- **選擇題**：3 個選項間隔設計使干擾項不要太接近（例如正解 120，干擾項 80、200，而非 118、122）

---

### B3：存錢計畫 `b3_savings_plan.js`

#### 學習目標
看目標物品 → 設定每週存款 → 計算幾週能達成

#### 題目資料結構

```javascript
const SAVING_GOALS = [
    { name:'玩具機器人', price:300,  icon:'🤖', image:'../images/b3/robot.png' },
    { name:'故事書套組', price:450,  icon:'📚', image:'../images/b3/books.png' },
    { name:'運動鞋',    price:800,  icon:'👟', image:'../images/b3/shoes.png' },
    { name:'遊樂園門票', price:500, icon:'🎡', image:'../images/b3/ticket.png' },
    { name:'電動遊戲',  price:1500, icon:'🎮', image:'../images/b3/game.png' },
    { name:'生日派對',  price:600,  icon:'🎂', image:'../images/b3/cake.png' },
    { name:'腳踏車',   price:2400,  icon:'🚴', image:'../images/b3/bike.png' },
    { name:'水族箱',   price:1200,  icon:'🐠', image:'../images/b3/fish.png' },
];

// 每週存款選項（依難度）
const WEEKLY_OPTIONS = {
    easy:   [50, 100, 150, 200],
    normal: [30, 50, 75, 100, 120, 150, 200],
    hard:   [25, 35, 50, 65, 80, 100, 125, 150, 175, 200]
};
```

#### 遊戲流程

```
1. 顯示目標物品（圖片 + 名稱 + 價格）
2. 顯示「每週存多少？」→ 玩家選擇或輸入
3. 計算需要幾週（Math.ceil(price / weekly)）
4. 「需要 ___ 週」→ 選擇題 or 填寫
5. 撲滿動畫（每週存入一枚，進度條）
```

#### 撲滿動畫規格

```javascript
// 撲滿進度條（CSS animation + JS 控制）
// 最多顯示 10 格（超過10週只顯示10格，每格代表「1/N 目標」）
// 動畫：硬幣從上方落入，發出 coin.mp3
// 完成時：撲滿搖晃 + 閃光 + 目標物品 reveal

// 注意：動畫用 TimerManager.setTimeout 串接，禁止 setInterval
function animateSaving(weeks, weekly, callback) {
    let w = 0;
    const step = () => {
        w++;
        // 更新進度條
        Game.TimerManager.setTimeout(w < weeks ? step : callback, 400, 'animation');
    };
    step();
}
```

---

### B4：特賣比一比 `b4_sale_comparison.js`

#### 學習目標
比較兩個價格 → 判斷哪個便宜 → 計算差額 / 省多少錢

#### 題目資料結構

```javascript
const COMPARISON_ITEMS = [
    {
        name: '鉛筆盒',
        optionA: { store:'文具店', price:85,  icon:'🏪' },
        optionB: { store:'超市',   price:65,  icon:'🛒' }
        // 正解：B 便宜，差 20 元
    },
    {
        name: '蘋果（1斤）',
        optionA: { store:'超市',   price:45, sale:true,  icon:'🛒' },
        optionB: { store:'菜市場', price:35, sale:false, icon:'🥦' }
    },
    {
        name: '原子筆（1支）',
        optionA: { store:'書局',   price:15, icon:'📖' },
        optionB: { store:'大賣場', price:12, icon:'🏬', note:'買5送1' }
    },
    // ... 共 20 組
];
```

#### 遊戲流程

```
1. 顯示商品名稱 + 兩個選項（左右並排）
2. 玩家判斷「哪個比較便宜？」（點選 A 或 B）
   - 簡單：只問哪個便宜（選擇）
   - 普通：問便宜多少元（填空）
   - 困難：問省了幾%（選擇題）
3. 動畫回饋（正確：綠色打勾；錯誤：紅色叉叉）
```

#### 困難模式的百分比簡化

```javascript
// 為特教學生設計：不用真正算%，而是給選項
// 例如差 20 元，原價 100 元 → 省了 20%
// 選項：10%、20%、30% 三選一（差距大，容易判斷方向）
```

---

### B5：生日派對預算 `b5_party_budget.js`

#### 學習目標
在固定預算內，選購派對所需商品（不超支）

#### 題目資料結構

```javascript
const PARTY_ITEMS = [
    { name:'蛋糕',     price:380, icon:'🎂', must:true  },  // 必買
    { name:'飲料',     price:120, icon:'🧃', must:true  },  // 必買
    { name:'氣球',     price:50,  icon:'🎈', must:false },
    { name:'小禮物',   price:200, icon:'🎁', must:false },
    { name:'紙盤',     price:45,  icon:'🍽️', must:false },
    { name:'蠟燭',     price:30,  icon:'🕯️', must:false },
    { name:'彩帶',     price:65,  icon:'🎊', must:false },
    { name:'派對帽',   price:80,  icon:'🎉', must:false },
    { name:'糖果',     price:90,  icon:'🍬', must:false },
    { name:'音樂CD',   price:150, icon:'🎵', must:false },
];

// 預算設定（依難度）
const BUDGETS = {
    easy:   [500, 600, 700],         // 寬裕預算，選必買即可
    normal: [600, 700, 800],         // 適中預算，需思考選購
    hard:   [700, 800, 900, 1000]    // 緊迫預算，需精算組合
};
```

#### 遊戲流程

```
1. 顯示預算（如：今天有 700 元辦派對）
2. 顯示商品清單（必買商品標記 🔒）
3. 玩家勾選想買的商品
4. 右側：即時顯示「已選：XXX 元 / 預算：700 元」
   - 綠色：尚有餘額
   - 黃色：接近預算
   - 紅色：超出預算
5. 「確認購買」按鈕（超支時 disabled）
```

#### 即時金額計算規格

```javascript
// 每次勾選 / 取消勾選立即更新
function updateTotalDisplay() {
    const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
    const el = document.getElementById('total-display');
    el.textContent = `已選：${total} 元`;
    el.className = total > budget ? 'over-budget' :
                   total > budget * 0.9 ? 'near-budget' : 'ok-budget';
    document.getElementById('confirm-btn').disabled = total > budget;
}
```

---

### B6：菜市場買菜 `b6_market_shopping.js`

#### 學習目標
依照購物清單在市場攤位買菜 → 付款 → 找零

#### 題目資料結構

```javascript
const MARKET_STALLS = {
    vegetable: {
        name:'蔬菜攤', icon:'🥦',
        items: [
            { name:'高麗菜', price:30, unit:'顆', icon:'🥬' },
            { name:'番茄',   price:45, unit:'斤', icon:'🍅' },
            { name:'青蔥',   price:20, unit:'把', icon:'🌿' },
            { name:'地瓜',   price:35, unit:'斤', icon:'🍠' }
        ]
    },
    fruit: {
        name:'水果攤', icon:'🍎',
        items: [
            { name:'蘋果', price:50, unit:'斤', icon:'🍎' },
            { name:'香蕉', price:25, unit:'把', icon:'🍌' },
            { name:'葡萄', price:80, unit:'串', icon:'🍇' }
        ]
    },
    grocery: {
        name:'雜貨攤', icon:'🛒',
        items: [
            { name:'雞蛋', price:65, unit:'盒', icon:'🥚' },
            { name:'豆腐', price:25, unit:'塊', icon:'🫙' },
            { name:'醬油', price:45, unit:'瓶', icon:'🍶' }
        ]
    }
};

// 購物清單模板（共 15 個）
const SHOPPING_LISTS = [
    { budget:100, items:[
        { stall:'vegetable', name:'高麗菜', qty:1 },
        { stall:'vegetable', name:'青蔥', qty:1 }
    ]},
    // 正解：30 + 20 = 50 元，找零 50 元
    ...
];
```

#### 遊戲流程（與 A4 超市類似但簡化）

```
1. 顯示購物清單（左側固定）
2. 顯示市場攤位（右側，3個攤位 tab 切換）
3. 點擊商品加入購物籃
   - 清單上的商品打勾
4. 所有清單商品勾選完成 → 前往結帳
5. 付款（選錢幣/鈔票）
6. 找零（顯示找回多少）
7. 完成！
```

---

## 七、b-series.css 規格

```css
/* ===== B 系列 Design Tokens ===== */
:root {
    --b-primary:    #f59e0b;   /* 琥珀黃（錢幣感） */
    --b-secondary:  #10b981;   /* 翡翠綠（正確/收入）*/
    --b-danger:     #ef4444;   /* 紅色（超支/支出）*/
    --b-neutral:    #6b7280;
    --b-bg:         #fffbeb;   /* 淡黃背景 */
    --b-card-bg:    #ffffff;
    --b-border:     #fde68a;
}

/* 頁面背景 */
.b-series { background: var(--b-bg); }

/* 標準卡片 */
.b-card {
    background: var(--b-card-bg);
    border: 2px solid var(--b-border);
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(245,158,11,0.15);
}

/* 金額顯示 */
.b-amount { font-size: 2rem; font-weight: bold; color: var(--b-primary); }
.b-amount-income  { color: var(--b-secondary); }
.b-amount-expense { color: var(--b-danger); }

/* 預算狀態 */
.ok-budget   { color: var(--b-secondary); }
.near-budget { color: var(--b-primary); }
.over-budget { color: var(--b-danger); animation: shake 0.3s ease; }

/* 購物清單項目 */
.shopping-item { display:flex; align-items:center; gap:8px; padding:8px; border-bottom:1px solid var(--b-border); }
.shopping-item.checked { opacity:0.5; text-decoration:line-through; }
.shopping-item.checked::before { content:'✓'; color:var(--b-secondary); font-weight:bold; }

/* 動畫 */
@keyframes shake {
    0%,100% { transform:translateX(0); }
    25%     { transform:translateX(-5px); }
    75%     { transform:translateX(5px); }
}
@keyframes coinDrop {
    0%  { transform:translateY(-30px); opacity:0; }
    60% { transform:translateY(4px); }
    100%{ transform:translateY(0); opacity:1; }
}
```

---

## 八、作業單規格（worksheet/units/bX-worksheet.js）

### B1 作業單

```javascript
// 題型1：看清單算總額
// 給 3~5 項費用列表，最後填寫總額
// _renderRow(name, cost) → 表格列

// 題型2：夠不夠帶
// 左圖：錢包（金額X元），右邊：行程清單（需Y元）
// 勾選：夠 / 不夠

// 題型3：選錢幣組合（看圖填空）
// 題目：今天要帶 85 元，下面哪些組合正確？
// 圖示：多個錢幣組合，圈出正確的
```

### B4 作業單

```javascript
// 題型：兩欄比價
// 左：商品A（圖+價格），右：商品B（圖+價格）
// 問：哪個便宜？便宜多少元？
```

---

## 九、開發優先順序

| 順序 | 單元 | 理由 | 預估複雜度 |
|------|------|------|-----------|
| 1 | **B1 今天帶多少錢** | 機制最單純，複用 C5 判斷邏輯 | 低 |
| 2 | **B4 特賣比一比** | 純判斷題，無拖放，最快完成 | 低 |
| 3 | **B3 存錢計畫** | 撲滿動畫是新機制，先做後兩個建立信心 | 中 |
| 4 | **B2 零用錢日記** | 數字輸入複雜，需自製鍵盤 | 中 |
| 5 | **B5 生日派對預算** | 即時金額計算，UI 互動豐富 | 中 |
| 6 | **B6 菜市場買菜** | 最複雜（多攤位 + 付款 + 找零），最後做 | 高 |

---

## 十、開發前 Checklist（每個單元開始前確認）

```
□ HTML 模板複製，修改 title / body class / CSS link / JS src
□ JS 骨架中 'bX' 全部替換成正確的 'b1' / 'b2' 等
□ Debug.FLAGS 依單元特性新增分類（如 b1 加 'wallet', 'schedule'）
□ injectGlobalAnimationStyles 的 id 改為 'b1-global-animations'
□ state.settings 只加本單元需要的欄位
□ _generateQuestions() 實作完成
□ AssistClick 步驟定義完成（簡單模式）
□ 作業單 JS 同步建立（worksheet/units/bX-worksheet.js）
□ 在 WorksheetRegistry 中 register
□ 在 index.html 中加入單元入口連結
□ 測試清單：
  □ 完成3輪遊戲，確認 showResults 只執行一次
  □ DevTools 確認無裸 setTimeout / setInterval
  □ 手機模擬器測試觸控
  □ 切換難度3次後開始遊戲，功能正常
```

---

*本文件由 Claude Code 於 2026-03-14 產出，作為 B 系列開發的唯一規格依據。*
*開發完成後，請將各單元的修復記錄補充至各自的 `report/BX_Unit_Completion_Report.md`。*
