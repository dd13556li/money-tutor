// =============================================================
// FILE: js/b4_sale_comparison.js — B4 特賣比一比
// 建立日期：2026-03-14
// =============================================================
'use strict';

// ── 商品資料（20組）─────────────────────────────────────────────
// optA 永遠比 optB 貴；顯示時隨機左右交換（swapped 旗標）
const B4_ITEMS = [
    { name:'鉛筆盒',       icon:'✏️',  optA:{ store:'文具店',  storeIcon:'🏪', price:85  }, optB:{ store:'超市',   storeIcon:'🛒', price:65  } },
    { name:'蘋果（1斤）',  icon:'🍎',  optA:{ store:'超市',   storeIcon:'🛒', price:45  }, optB:{ store:'菜市場', storeIcon:'🥬', price:35  } },
    { name:'原子筆',       icon:'🖊️', optA:{ store:'書局',   storeIcon:'📚', price:15  }, optB:{ store:'大賣場', storeIcon:'🏬', price:12  } },
    { name:'礦泉水',       icon:'💧',  optA:{ store:'超商',   storeIcon:'🏪', price:20  }, optB:{ store:'量販店', storeIcon:'🏬', price:13  } },
    { name:'洗髮精',       icon:'🧴',  optA:{ store:'藥妝店', storeIcon:'💊', price:189 }, optB:{ store:'量販店', storeIcon:'🏬', price:149 } },
    { name:'巧克力',       icon:'🍫',  optA:{ store:'超商',   storeIcon:'🏪', price:55  }, optB:{ store:'超市',   storeIcon:'🛒', price:42  } },
    { name:'毛巾',         icon:'🧣',  optA:{ store:'百貨',   storeIcon:'🏢', price:250 }, optB:{ store:'市場',   storeIcon:'🥬', price:180 } },
    { name:'故事書',       icon:'📖',  optA:{ store:'書店',   storeIcon:'📚', price:280 }, optB:{ store:'二手店', storeIcon:'♻️', price:150 } },
    { name:'牛奶（1公升）',icon:'🥛',  optA:{ store:'超商',   storeIcon:'🏪', price:65  }, optB:{ store:'超市',   storeIcon:'🛒', price:55  } },
    { name:'面紙（一包）', icon:'🧻',  optA:{ store:'超商',   storeIcon:'🏪', price:39  }, optB:{ store:'量販店', storeIcon:'🏬', price:25  } },
    { name:'雨傘',         icon:'☂️',  optA:{ store:'百貨',   storeIcon:'🏢', price:480 }, optB:{ store:'夜市',   storeIcon:'🌙', price:150 } },
    { name:'餅乾（一盒）', icon:'🍪',  optA:{ store:'超商',   storeIcon:'🏪', price:45  }, optB:{ store:'超市',   storeIcon:'🛒', price:35  } },
    { name:'牙刷',         icon:'🪥',  optA:{ store:'藥局',   storeIcon:'💊', price:39  }, optB:{ store:'量販店', storeIcon:'🏬', price:29  } },
    { name:'色鉛筆',       icon:'🖍️', optA:{ store:'文具店', storeIcon:'🏪', price:120 }, optB:{ store:'大賣場', storeIcon:'🏬', price:89  } },
    { name:'果汁（1瓶）',  icon:'🧃',  optA:{ store:'超商',   storeIcon:'🏪', price:35  }, optB:{ store:'超市',   storeIcon:'🛒', price:25  } },
    { name:'電池（4顆）',  icon:'🔋',  optA:{ store:'超商',   storeIcon:'🏪', price:85  }, optB:{ store:'量販店', storeIcon:'🏬', price:59  } },
    { name:'洗碗精',       icon:'🧼',  optA:{ store:'超市',   storeIcon:'🛒', price:59  }, optB:{ store:'量販店', storeIcon:'🏬', price:45  } },
    { name:'運動鞋',       icon:'👟',  optA:{ store:'品牌店', storeIcon:'👔', price:1580}, optB:{ store:'網購',   storeIcon:'💻', price:1200} },
    { name:'拖鞋',         icon:'🩴',  optA:{ store:'百貨',   storeIcon:'🏢', price:390 }, optB:{ store:'夜市',   storeIcon:'🌙', price:120 } },
    { name:'手套',         icon:'🧤',  optA:{ store:'百貨',   storeIcon:'🏢', price:320 }, optB:{ store:'市場',   storeIcon:'🥬', price:180 } },
    { name:'洗手乳',       icon:'🧴',  optA:{ store:'藥局',   storeIcon:'💊', price:55  }, optB:{ store:'量販店', storeIcon:'🏬', price:39  } },
    { name:'奶茶',         icon:'🧋',  optA:{ store:'手搖店', storeIcon:'🥤', price:60  }, optB:{ store:'超商',   storeIcon:'🏪', price:50  } },
    { name:'運動水壺',     icon:'🍶',  optA:{ store:'體育用品店',storeIcon:'⚽',price:350 }, optB:{ store:'量販店', storeIcon:'🏬', price:260 } },
    { name:'帽子',         icon:'🧢',  optA:{ store:'百貨',   storeIcon:'🏢', price:580 }, optB:{ store:'網購',   storeIcon:'💻', price:420 } },
    { name:'便當盒',       icon:'🍱',  optA:{ store:'百貨',   storeIcon:'🏢', price:285 }, optB:{ store:'量販店', storeIcon:'🏬', price:199 } },
    { name:'筆記本（3本）',icon:'📓',  optA:{ store:'書局',   storeIcon:'📚', price:95  }, optB:{ store:'量販店', storeIcon:'🏬', price:69  } },
    { name:'口香糖',       icon:'🍬',  optA:{ store:'超商',   storeIcon:'🏪', price:35  }, optB:{ store:'超市',   storeIcon:'🛒', price:25  } },
    { name:'浴巾',         icon:'🛁',  optA:{ store:'百貨',   storeIcon:'🏢', price:480 }, optB:{ store:'量販店', storeIcon:'🏬', price:320 } },
    { name:'醬油（一瓶）', icon:'🫙',  optA:{ store:'超商',   storeIcon:'🏪', price:89  }, optB:{ store:'量販店', storeIcon:'🏬', price:65  } },
    { name:'洗衣精',       icon:'🧺',  optA:{ store:'超市',   storeIcon:'🛒', price:159 }, optB:{ store:'量販店', storeIcon:'🏬', price:119 } },
];

// ── 輔助函數 ────────────────────────────────────────────────────
const toTWD = v => typeof convertToTraditionalCurrency === 'function' ? convertToTraditionalCurrency(v) : `${v}元`;

// ── 主遊戲物件 ─────────────────────────────────────────────────
let Game;

document.addEventListener('DOMContentLoaded', () => {
    Game = {

        // ── Debug ──────────────────────────────────────────────
        Debug: {
            FLAGS: { all:false, init:false, speech:false, audio:false,
                     ui:false, question:false, state:false, error:true },
            log(cat, ...a)  { if (this.FLAGS.all || this.FLAGS[cat]) console.log(`[B4-${cat}]`, ...a); },
            warn(cat, ...a) { if (this.FLAGS.all || this.FLAGS[cat]) console.warn(`[B4-${cat}]`, ...a); },
            error(...a)     { console.error('[B4-ERROR]', ...a); }
        },

        // ── TimerManager ───────────────────────────────────────
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

        // ── EventManager ───────────────────────────────────────
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
                        try { l?.element?.removeEventListener(l.type, l.handler, l.options); } catch(e) {}
                        this.listeners[i] = null;
                    }
                });
            }
        },

        // ── Audio ──────────────────────────────────────────────
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
                try { s.currentTime = 0; s.play().catch(() => {}); } catch(e) {}
            }
        },

        // ── Speech ─────────────────────────────────────────────
        Speech: {
            cachedVoice: null,
            _loadVoice() {
                if (!window.speechSynthesis) return;
                const voices = window.speechSynthesis.getVoices();
                if (voices.length === 0) {
                    Game.TimerManager.setTimeout(() => Game.Speech._loadVoice(), 500, 'speech');
                    return;
                }
                this.cachedVoice =
                    voices.find(v => v.name.startsWith('Microsoft Yating')) ||
                    voices.find(v => v.name.startsWith('Microsoft Hanhan')) ||
                    voices.find(v => v.name === 'Google 國語（臺灣）') ||
                    voices.find(v => v.lang === 'zh-TW') ||
                    voices.find(v => v.lang.startsWith('zh')) ||
                    voices[0] ||
                    null;
            },
            speak(text, callback) {
                if (!window.speechSynthesis) { callback?.(); return; }
                window.speechSynthesis.cancel();
                const u = new SpeechSynthesisUtterance(text);
                u.lang = this.cachedVoice?.lang || 'zh-TW'; u.rate = 1.0;
                if (this.cachedVoice) u.voice = this.cachedVoice;

                let callbackExecuted = false;
                const safeCallback = () => {
                    if (callbackExecuted) return;
                    callbackExecuted = true;
                    callback?.();
                };

                u.onend   = safeCallback;
                u.onerror = (e) => { if (e.error !== 'interrupted') Game.Debug.warn('speech', '語音錯誤', e.error); safeCallback(); };
                Game.TimerManager.setTimeout(safeCallback, 10000, 'speech');
                try {
                    window.speechSynthesis.speak(u);
                } catch(e) {
                    Game.Debug.warn('speech', '語音播放失敗', e);
                    safeCallback();
                }
            }
        },

        // ── State ──────────────────────────────────────────────
        state: {
            settings: { difficulty: null, questionCount: null, retryMode: null },
            quiz: {
                currentQuestion: 0,
                totalQuestions: 10,
                correctCount: 0,
                questions: [],
                startTime: null
            },
            phase: 'select',    // 'select' | 'diff'
            numpadValue: '',
            isEndingGame: false,
            isProcessing: false
        },

        // ── Init ───────────────────────────────────────────────
        init() {
            Game.TimerManager.clearAll();
            Game.EventManager.removeAll();
            this.injectGlobalAnimationStyles();
            this.audio.init();
            Game.Speech._loadVoice();
            if (window.speechSynthesis?.onvoiceschanged !== undefined) {
                window.speechSynthesis.onvoiceschanged = () => Game.Speech._loadVoice();
            }
            this.showSettings();
        },

        injectGlobalAnimationStyles() {
            if (document.getElementById('b4-global-animations')) return;
            const s = document.createElement('style');
            s.id = 'b4-global-animations';
            s.textContent = `
                @keyframes b4SlideUp {
                    from { opacity:0; transform:translateY(20px); }
                    to   { opacity:1; transform:translateY(0); }
                }
            `;
            document.head.appendChild(s);
        },

        resetGameState() {
            const q = this.state.quiz;
            q.currentQuestion = 0;
            q.totalQuestions  = this.state.settings.questionCount;
            q.correctCount    = 0;
            q.questions       = [];
            q.startTime       = null;
            this.state.phase        = 'select';
            this.state.numpadValue  = '';
            this.state.isEndingGame = false;
            this.state.isProcessing  = false;
            Game.Debug.log('init', '🔄 [B4] 遊戲狀態已重置');
        },

        // ── Settings ───────────────────────────────────────────
        showSettings() {
            Game.TimerManager.clearAll();
            Game.EventManager.removeByCategory('gameUI');
            this.resetGameState();

            const app = document.getElementById('app');
            app.style.cssText = '';
            document.body.style.overflow = '';

            app.innerHTML = `
            <div class="unit-welcome">
                <div class="welcome-content">
                    <div class="settings-title-row">
                        <img src="../images/index/educated_money_bag_character.png" alt="金錢小助手"
                             class="settings-mascot-img" onerror="this.style.display='none'">
                        <h1>單元B4：特賣比一比</h1>
                    </div>
                    <div class="game-settings">
                        <div class="b-setting-group">
                            <label class="b-setting-label">🎯 難度選擇</label>
                            <div class="b-btn-group">
                                <button class="b-sel-btn b-diff-easy"   data-diff="easy">簡單</button>
                                <button class="b-sel-btn b-diff-normal" data-diff="normal">普通</button>
                                <button class="b-sel-btn b-diff-hard"   data-diff="hard">困難</button>
                            </div>
                            <div class="b-diff-desc" id="diff-desc"></div>
                        </div>
                        <div class="b-setting-group">
                            <label class="b-setting-label">📋 題目數量</label>
                            <div class="b-btn-group" id="count-group">
                                <button class="b-sel-btn" data-count="1">1題</button>
                                <button class="b-sel-btn" data-count="5">5題</button>
                                <button class="b-sel-btn" data-count="10">10題</button>
                                <button class="b-sel-btn" data-count="15">15題</button>
                                <button class="b-sel-btn" data-count="20">20題</button>
                            </div>
                        </div>
                        <div class="b-setting-group">
                            <label class="b-setting-label">🔄 作答模式</label>
                            <div class="b-btn-group">
                                <button class="b-sel-btn" data-mode="retry">重試模式</button>
                                <button class="b-sel-btn" data-mode="proceed">繼續模式</button>
                            </div>
                            <div style="margin-top:6px;font-size:12px;color:#6b7280;line-height:1.5;">
                                重試：答錯可以再試 ｜ 繼續：顯示正確答案後繼續
                            </div>
                        </div>
                        <div class="b-setting-group">
                            <label class="b-setting-label">📝 作業單</label>
                            <div class="b-btn-group">
                                <a href="#" id="settings-worksheet-link" class="b-sel-btn"
                                   style="text-decoration:none;display:inline-flex;align-items:center;justify-content:center;">
                                    產生作業單
                                </a>
                            </div>
                        </div>
                        <div class="b-setting-group">
                            <label class="b-setting-label">🎁 獎勵系統</label>
                            <div class="b-btn-group">
                                <a href="#" id="settings-reward-link" class="b-sel-btn"
                                   style="text-decoration:none;display:inline-flex;align-items:center;justify-content:center;">
                                    開啟獎勵系統
                                </a>
                            </div>
                        </div>
                        <div class="b-setting-group">
                            <label style="font-size:13px;color:#6b7280;text-align:left;display:block;">
                                ✨ 比較兩個地方的價格，找出比較便宜的！<br>
                                簡單：點選便宜的；普通/困難：再回答差額
                            </label>
                        </div>
                    </div>
                    <div class="game-buttons">
                        <button class="back-btn" onclick="Game.backToMenu()">← 返回主選單</button>
                        <button class="start-btn" id="start-btn" disabled>▶ 開始練習</button>
                    </div>
                </div>
            </div>`;

            this._bindSettingsEvents();
        },

        _diffDescriptions: {
            easy:   '簡單：只要點選比較便宜的那個選項，答對就過關！',
            normal: '普通：選出便宜的之後，再回答便宜了多少元（三選一）',
            hard:   '困難：選出便宜的之後，用數字鍵盤自己輸入差額'
        },

        _bindSettingsEvents() {
            Game.EventManager.removeByCategory('settings');
            document.querySelectorAll('[data-diff]').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('[data-diff]').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.difficulty = btn.dataset.diff;
                    const desc = document.getElementById('diff-desc');
                    if (desc) { desc.textContent = this._diffDescriptions[btn.dataset.diff]; desc.classList.add('show'); }
                    this._checkCanStart();
                }, {}, 'settings');
            });

            document.querySelectorAll('[data-count]').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('[data-count]').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.questionCount = parseInt(btn.dataset.count);
                    this._checkCanStart();
                }, {}, 'settings');
            });

            document.querySelectorAll('[data-mode]').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('[data-mode]').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.retryMode = btn.dataset.mode;
                    this._checkCanStart();
                }, {}, 'settings');
            });

            Game.EventManager.on(document.getElementById('settings-reward-link'), 'click', (e) => {
                e.preventDefault();
                if (typeof RewardLauncher !== 'undefined') RewardLauncher.open();
                else window.open('../reward/index.html', 'RewardSystem', 'width=1200,height=800');
            }, {}, 'settings');

            // 作業單
            Game.EventManager.on(document.getElementById('settings-worksheet-link'), 'click', (e) => {
                e.preventDefault();
                const params = new URLSearchParams({ unit: 'b4' });
                window.open('../worksheet/index.html?' + params.toString(), 'Worksheet', 'width=900,height=700');
            }, {}, 'settings');

            Game.EventManager.on(document.getElementById('start-btn'), 'click', () => {
                this.startGame();
            }, {}, 'settings');
        },

        _checkCanStart() {
            const btn = document.getElementById('start-btn');
            if (btn) btn.disabled = !this.state.settings.difficulty || !this.state.settings.questionCount || !this.state.settings.retryMode;
        },

        // ── Start Game ─────────────────────────────────────────
        startGame() {
            Game.EventManager.removeByCategory('settings');
            Game.TimerManager.clearAll();

            const s = this.state.settings;
            const q = this.state.quiz;
            q.currentQuestion = 0;
            q.totalQuestions  = s.questionCount;
            q.correctCount    = 0;
            q.startTime       = Date.now();
            q.questions       = this._generateQuestions(q.totalQuestions);

            this.state.phase         = 'select';
            this.state.numpadValue   = '';
            this.state.isEndingGame = false;
            this.state.isProcessing  = false;

            this.renderQuestion();
        },

        _generateQuestions(count) {
            const pool   = [...B4_ITEMS];
            const result = [];
            for (let i = 0; i < count; i++) {
                if (pool.length === 0) pool.push(...B4_ITEMS);
                const idx  = Math.floor(Math.random() * pool.length);
                const item = pool.splice(idx, 1)[0];
                // 隨機決定左右交換
                const swapped = Math.random() < 0.5;
                const diff    = item.optA.price - item.optB.price; // optB 永遠便宜
                result.push({ ...item, swapped, diff });
            }
            return result;
        },

        // ── Render Question ────────────────────────────────────
        renderQuestion() {
            Game.TimerManager.clearAll();
            Game.EventManager.removeByCategory('gameUI');
            this.state.isProcessing = false;
            this.state.phase        = 'select';
            this.state.numpadValue  = '';

            const q    = this.state.quiz;
            const curr = q.questions[q.currentQuestion];
            const diff = this.state.settings.difficulty;
            const app  = document.getElementById('app');

            // 決定左右
            const left  = curr.swapped ? curr.optB : curr.optA;
            const right = curr.swapped ? curr.optA : curr.optB;
            // 正確答案：便宜的是 optB；若 swapped，便宜在左（left=optB）
            const correctSide = curr.swapped ? 'left' : 'right';

            app.innerHTML = `
            ${this._renderHeader()}
            <div class="b-game-wrap">
                <div class="b4-item-hero">
                    <span class="b4-item-icon">${curr.icon}</span>
                    <div class="b4-item-name">${curr.name}</div>
                    <div class="b4-question-label">
                        哪個地方比較便宜？
                        <button class="b-inline-replay" id="replay-speech-btn" title="重播語音">🔊</button>
                    </div>
                </div>
                <div class="b4-compare-grid" id="compare-grid">
                    ${this._renderOptionCard('left', left, curr.optB.price, correctSide)}
                    <div class="b4-vs-divider">VS</div>
                    ${this._renderOptionCard('right', right, curr.optB.price, correctSide)}
                </div>
                <div id="diff-section"></div>
            </div>`;

            this._bindSelectEvents(curr, correctSide, left, right);

            // 語音引導
            Game.TimerManager.setTimeout(() => {
                const diff = this.state.settings.difficulty;
                const speechMap = {
                    easy:   `${curr.name}，哪個地方比較便宜？`,
                    normal: `${curr.name}，哪個地方比較便宜？選出之後再回答便宜了多少元。`,
                    hard:   `${curr.name}，哪個地方比較便宜？選出之後輸入差額。`,
                };
                this.state.quiz.lastSpeechText = speechMap[diff] || `${curr.name}，哪個地方比較便宜？`;
                Game.Speech.speak(speechMap[diff] || `${curr.name}，哪個地方比較便宜？`);
            }, 400, 'speech');
        },

        _renderHeader() {
            const q = this.state.quiz;
            const diffLabel = { easy: '簡單模式', normal: '普通模式', hard: '困難模式' }[this.state.settings.difficulty] || '';
            return `
            <div class="b-header">
                <div class="b-header-left">
                    <span class="b-header-unit">🏷️ 特賣比一比</span>
                </div>
                <div class="b-header-center">${diffLabel}</div>
                <div class="b-header-right">
                    <span class="b-progress">第 ${q.currentQuestion + 1} 題 / 共 ${q.totalQuestions} 題</span>
                    <button class="b-reward-btn" id="reward-btn-g">🎁 獎勵</button>
                    <button class="b-back-btn" id="back-to-settings">返回設定</button>
                </div>
            </div>`;
        },

        _renderOptionCard(side, opt, cheaperPrice, correctSide) {
            const isCheaper = (opt.price === cheaperPrice);
            return `
            <div class="b4-option-card" id="card-${side}" data-side="${side}">
                <div class="b4-store-label">商店</div>
                <div class="b4-store-icon">${opt.storeIcon}</div>
                <div class="b4-store-name">${opt.store}</div>
                <div class="b4-price">${opt.price} <span class="b4-price-unit">元</span></div>
            </div>`;
        },

        _bindSelectEvents(curr, correctSide, left, right) {
            // 選項卡點擊
            ['left', 'right'].forEach(side => {
                const card = document.getElementById(`card-${side}`);
                Game.EventManager.on(card, 'click', () => {
                    if (this.state.isProcessing) return;
                    this.state.isProcessing = true;
                    const isCorrect = (side === correctSide);
                    this.handleSelectClick(isCorrect, curr, correctSide, left, right);
                }, {}, 'gameUI');
            });

            // 導覽
            Game.EventManager.on(document.getElementById('back-to-settings'), 'click', () => {
                this.showSettings();
            }, {}, 'gameUI');
            Game.EventManager.on(document.getElementById('reward-btn-g'), 'click', () => {
                if (typeof RewardLauncher !== 'undefined') RewardLauncher.open();
                else window.open('../reward/index.html', 'RewardSystem', 'width=1200,height=800');
            }, {}, 'gameUI');
            // 語音重播
            const replayBtn = document.getElementById('replay-speech-btn');
            if (replayBtn) {
                Game.EventManager.on(replayBtn, 'click', () => {
                    const text = this.state.quiz.lastSpeechText;
                    if (text) Game.Speech.speak(text);
                }, {}, 'gameUI');
            }
        },

        // ── Select Phase Handler ────────────────────────────────
        handleSelectClick(isCorrect, curr, correctSide, left, right) {
            const diff = this.state.settings.difficulty;

            // 視覺回饋
            const correctCard = document.getElementById(`card-${correctSide}`);
            const wrongSide   = correctSide === 'left' ? 'right' : 'left';
            const wrongCard   = document.getElementById(`card-${wrongSide}`);

            if (isCorrect) {
                this.audio.play('correct');
                this._showCenterFeedback('✅', '答對了！');
                if (correctCard) {
                    correctCard.classList.add('selected-correct');
                    correctCard.innerHTML += `<div class="b4-result-mark correct">✓</div>
                        <div class="b4-cheaper-tag">比較便宜！</div>`;
                }
                if (diff === 'easy') {
                    // 簡單：直接下一題
                    this.state.quiz.correctCount++;
                    Game.Speech.speak(`答對了！${correctCard?.querySelector('.b4-store-name')?.textContent || ''}比較便宜`);
                    Game.TimerManager.setTimeout(() => this.nextQuestion(), 1400, 'turnTransition');
                } else {
                    // 普通/困難：顯示差額問題
                    Game.TimerManager.setTimeout(() => {
                        this.state.isProcessing = false;
                        this.state.phase = 'diff';
                        this._renderDiffSection(curr, diff);
                    }, 700, 'turnTransition');
                }
            } else {
                this.audio.play('error');
                if (wrongCard)   wrongCard.classList.add('selected-wrong');
                if (correctCard) {
                    correctCard.classList.add('reveal-correct');
                    correctCard.innerHTML += `<div class="b4-cheaper-tag">這個才便宜</div>`;
                }
                if (this.state.settings.retryMode === 'proceed') {
                    this._showCenterFeedback('❌', '答錯了！');
                    Game.Speech.speak(`答錯了，${correctCard?.querySelector('.b4-store-name')?.textContent || '另一個'}才是比較便宜的`);
                    Game.TimerManager.setTimeout(() => this.nextQuestion(), 1800, 'turnTransition');
                } else {
                    this._showCenterFeedback('❌', '再試一次！');
                    Game.Speech.speak('這邊比較貴喔，再看看另一邊');
                    Game.TimerManager.setTimeout(() => {
                        this.state.isProcessing = false;
                        ['left','right'].forEach(s => {
                            const c = document.getElementById(`card-${s}`);
                            if (c) c.classList.remove('selected-wrong', 'reveal-correct', 'selected-correct');
                            const marks = c?.querySelectorAll('.b4-result-mark,.b4-cheaper-tag');
                            marks?.forEach(m => m.remove());
                        });
                    }, 1500, 'turnTransition');
                }
            }
        },

        // ── Diff Phase ─────────────────────────────────────────
        _renderDiffSection(curr, diff) {
            Game.EventManager.removeByCategory('diffUI');
            const section = document.getElementById('diff-section');
            if (!section) return;

            const correctDiff = curr.diff; // optA.price - optB.price

            if (diff === 'normal') {
                const options = this._getDiffOptions(correctDiff);
                section.innerHTML = `
                <div class="b4-diff-section" style="animation:b4SlideUp 0.3s ease">
                    <div class="b4-diff-question">
                        便宜了多少元？
                        <div class="b4-diff-sub">點選正確的差額</div>
                    </div>
                    <div class="b4-diff-options">
                        ${options.map(val => `
                        <button class="b4-diff-opt" data-val="${val}">${val} 元</button>`).join('')}
                    </div>
                </div>`;

                section.querySelectorAll('.b4-diff-opt').forEach(btn => {
                    Game.EventManager.on(btn, 'click', () => {
                        if (this.state.isProcessing) return;
                        this.state.isProcessing = true;
                        const chosen    = parseInt(btn.dataset.val);
                        const isCorrect = (chosen === correctDiff);
                        btn.classList.add(isCorrect ? 'correct-ans' : 'wrong-ans');
                        if (!isCorrect) {
                            section.querySelector(`[data-val="${correctDiff}"]`)?.classList.add('correct-ans');
                        }
                        this.handleDiffAnswer(isCorrect, correctDiff);
                    }, {}, 'diffUI');
                });

            } else {
                // 困難：數字鍵盤
                section.innerHTML = `
                <div class="b4-diff-section" style="animation:b4SlideUp 0.3s ease">
                    <div class="b4-diff-question">
                        便宜了多少元？
                        <div class="b4-diff-sub">用鍵盤輸入差額，再按 ✓</div>
                    </div>
                    <div class="b4-input-display" id="numpad-display">
                        <span id="numpad-val">0</span><span class="b4-unit-text"> 元</span>
                    </div>
                    <div class="b4-numpad">
                        ${[7,8,9,4,5,6,1,2,3].map(n =>
                            `<button class="b4-numpad-btn" data-num="${n}">${n}</button>`).join('')}
                        <button class="b4-numpad-btn btn-del" id="btn-del">⌫</button>
                        <button class="b4-numpad-btn" data-num="0">0</button>
                        <button class="b4-numpad-btn btn-ok" id="btn-ok">✓</button>
                    </div>
                </div>`;

                this.state.numpadValue = '';

                section.querySelectorAll('[data-num]').forEach(btn => {
                    Game.EventManager.on(btn, 'click', () => {
                        if (this.state.numpadValue.length >= 5) return;
                        this.state.numpadValue += btn.dataset.num;
                        this._updateNumpadDisplay();
                    }, {}, 'diffUI');
                });

                Game.EventManager.on(document.getElementById('btn-del'), 'click', () => {
                    this.state.numpadValue = this.state.numpadValue.slice(0, -1);
                    this._updateNumpadDisplay();
                }, {}, 'diffUI');

                Game.EventManager.on(document.getElementById('btn-ok'), 'click', () => {
                    if (this.state.isProcessing) return;
                    const entered = parseInt(this.state.numpadValue) || 0;
                    if (entered === 0) return;
                    this.state.isProcessing = true;
                    const isCorrect = (entered === correctDiff);
                    const display   = document.getElementById('numpad-display');
                    if (display) {
                        display.style.background = isCorrect ? '#059669' : '#dc2626';
                        display.style.color      = '#fff';
                    }
                    this.handleDiffAnswer(isCorrect, correctDiff);
                }, {}, 'diffUI');
            }
        },

        _updateNumpadDisplay() {
            const el = document.getElementById('numpad-val');
            if (el) el.textContent = this.state.numpadValue || '0';
        },

        _getDiffOptions(correct) {
            const opts = new Set([correct]);
            const variations = [10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 100];
            for (const v of variations) {
                if (opts.size >= 3) break;
                const candidate = correct + (Math.random() < 0.5 ? v : -v);
                if (candidate > 0 && candidate !== correct) opts.add(candidate);
            }
            // 補足到3個
            let extra = 10;
            while (opts.size < 3) { opts.add(correct + extra); extra += 5; }
            return [...opts].sort(() => Math.random() - 0.5);
        },

        // ── Diff Answer Handler ─────────────────────────────────
        handleDiffAnswer(isCorrect, correctDiff) {
            if (isCorrect) {
                this.audio.play('correct');
                this._showCenterFeedback('✅', '答對了！');
                this.state.quiz.correctCount++;
                Game.Speech.speak(`答對了！便宜了${toTWD(correctDiff)}`);
            } else {
                this.audio.play('error');
                if (this.state.settings.retryMode === 'proceed') {
                    this._showCenterFeedback('❌', '答錯了！');
                    Game.Speech.speak(`差額是${toTWD(correctDiff)}，繼續下一題`);
                    Game.TimerManager.setTimeout(() => this.nextQuestion(), 1800, 'turnTransition');
                } else {
                    // retry: re-enable buttons after showing correct
                    this._showCenterFeedback('❌', '再試一次！');
                    Game.Speech.speak(`差額是${toTWD(correctDiff)}，再試一次`);
                    Game.TimerManager.setTimeout(() => {
                        this.state.isProcessing = false;
                        // Re-enable diff options
                        document.querySelectorAll('.b4-diff-opt').forEach(b => {
                            b.classList.remove('wrong-ans');
                            b.disabled = false;
                        });
                        // Reset numpad display if hard mode
                        const display = document.getElementById('numpad-display');
                        if (display) {
                            display.style.background = '';
                            display.style.color = '';
                        }
                        this.state.numpadValue = '';
                        this._updateNumpadDisplay();
                    }, 1600, 'turnTransition');
                }
            }
        },

        // ── Next / Results ─────────────────────────────────────
        nextQuestion() {
            const q = this.state.quiz;
            q.currentQuestion++;
            if (q.currentQuestion >= q.totalQuestions) {
                this.showResults();
            } else {
                this.renderQuestion();
            }
        },

        showResults() {
            // ── 完成畫面守衛 ──
            if (this.state.isEndingGame) return;
            this.state.isEndingGame = true;

            Game.TimerManager.clearByCategory('turnTransition');
            Game.EventManager.removeByCategory('gameUI');
            Game.EventManager.removeByCategory('diffUI');

            const q       = this.state.quiz;
            const endTime = Date.now();
            const elapsed = q.startTime ? (endTime - q.startTime) : 0;
            const mins    = Math.floor(elapsed / 60000);
            const secs    = Math.floor((elapsed % 60000) / 1000);
            const accuracy = q.totalQuestions > 0
                ? Math.round((q.correctCount / q.totalQuestions) * 100) : 0;

            let badge, badgeColor;
            if      (accuracy >= 90) { badge = '優異 🏆'; badgeColor = '#f59e0b'; }
            else if (accuracy >= 70) { badge = '良好 👍'; badgeColor = '#10b981'; }
            else if (accuracy >= 50) { badge = '努力 💪'; badgeColor = '#6366f1'; }
            else                     { badge = '練習 📚'; badgeColor = '#94a3b8'; }

            const app = document.getElementById('app');
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
            app.style.overflow  = 'auto';
            app.style.height    = 'auto';
            app.style.minHeight = '100vh';

            app.innerHTML = `
<div class="b-res-wrapper">
    <div class="b-res-screen">
        <div class="b-res-header">
            <div class="b-res-trophy">🏆</div>
            <div class="b-res-title-row">
                <img src="../images/index/educated_money_bag_character.png"
                     class="b-res-mascot" alt="金錢小助手" onerror="this.style.display='none'">
                <h1 class="b-res-title">🎉 比價達人 🎉</h1>
                <span class="b-res-mascot-spacer"></span>
            </div>
        </div>

        <div class="b-res-reward-wrap">
            <a href="#" id="endgame-reward-link" class="b-res-reward-link">
                🎁 開啟獎勵系統（可加 ${q.correctCount} 分）
            </a>
        </div>

        <div class="b-res-container">
            <div class="b-res-grid">
                <div class="b-res-card b-res-card-1">
                    <div class="b-res-icon">✅</div>
                    <div class="b-res-label">答對題數</div>
                    <div class="b-res-value">${q.correctCount}/${q.totalQuestions}</div>
                </div>
                <div class="b-res-card b-res-card-2">
                    <div class="b-res-icon">📊</div>
                    <div class="b-res-label">正確率</div>
                    <div class="b-res-value">${accuracy}%</div>
                </div>
                <div class="b-res-card b-res-card-3">
                    <div class="b-res-icon">⏱️</div>
                    <div class="b-res-label">完成時間</div>
                    <div class="b-res-value">${mins > 0 ? mins + '分' : ''}${secs}秒</div>
                </div>
            </div>

            <div class="b-res-perf-section">
                <h3>📊 表現評價</h3>
                <div class="b-res-perf-badge">${badge}</div>
            </div>

            <div class="b-res-achievements">
                <h3>🏆 學習成果</h3>
                <div class="b-res-ach-list">
                    <div class="b-res-ach-item">✅ 比較不同商店的價格</div>
                    <div class="b-res-ach-item">✅ 找出最划算的選擇</div>
                    <div class="b-res-ach-item">✅ 計算兩價格的差額</div>
                </div>
            </div>

            <div class="b-res-btns">
                <button id="play-again-btn" class="b-res-play-btn">
                    <span class="btn-icon">🔄</span><span class="btn-text">再玩一次</span>
                </button>
                <button id="back-settings-btn" class="b-res-back-btn">
                    <span class="btn-icon">⚙️</span><span class="btn-text">返回設定</span>
                </button>
            </div>
        </div>
    </div>
</div>`;

            Game.EventManager.on(document.getElementById('play-again-btn'),    'click', () => this.startGame(),    {}, 'gameUI');
            Game.EventManager.on(document.getElementById('back-settings-btn'), 'click', () => this.showSettings(), {}, 'gameUI');
            Game.EventManager.on(document.getElementById('endgame-reward-link'), 'click', (e) => {
                e.preventDefault();
                if (typeof RewardLauncher !== 'undefined') RewardLauncher.open();
                else window.open('../reward/index.html', 'RewardSystem', 'width=1200,height=800');
            }, {}, 'gameUI');

            Game.TimerManager.setTimeout(() => {
                document.getElementById('success-sound')?.play();
                this._fireConfetti();
            }, 100, 'confetti');

            // 完成語音
            Game.TimerManager.setTimeout(() => {
                const accuracy = q.totalQuestions > 0
                    ? Math.round((q.correctCount / q.totalQuestions) * 100) : 0;
                let msg;
                if (accuracy === 100)    msg = '太厲害了，全部答對了！';
                else if (accuracy >= 80) msg = `很棒喔，答對了${q.correctCount}題！`;
                else if (accuracy >= 60) msg = '不錯喔，繼續加油！';
                else                     msg = '要再加油喔，多練習幾次！';
                Game.Speech.speak(msg);
            }, 800, 'speech');
        },

        // ── Confetti（遞迴版）────────────────────────────────────
        _fireConfetti() {
            if (typeof confetti !== 'function') return;
            const duration = 3000;
            const end      = Date.now() + duration;
            const defaults = { startVelocity:30, spread:360, ticks:60, zIndex:1001 };
            const rand     = (a, b) => Math.random() * (b - a) + a;
            const fire     = () => {
                const t = end - Date.now();
                if (t <= 0) return;
                const n = 50 * (t / duration);
                confetti({ ...defaults, particleCount: n, origin: { x: rand(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount: n, origin: { x: rand(0.7, 0.9), y: Math.random() - 0.2 } });
                Game.TimerManager.setTimeout(fire, 250, 'confetti');
            };
            fire();
        },

        // ── Helpers ────────────────────────────────────────────
        _showCenterFeedback(icon, text = '') {
            document.querySelector('.b-center-feedback')?.remove();
            const overlay = document.createElement('div');
            overlay.className = 'b-center-feedback';
            overlay.innerHTML = `<span class="b-cf-icon">${icon}</span>${text ? `<span class="b-cf-text">${text}</span>` : ''}`;
            document.body.appendChild(overlay);
            Game.TimerManager.setTimeout(() => overlay.remove(), 1200, 'ui');
        },

        backToMenu() {
            Game.TimerManager.clearAll();
            Game.EventManager.removeAll();
            window.location.href = '../index.html#part4';
        }

    };  // end Game

    Game.init();
});
