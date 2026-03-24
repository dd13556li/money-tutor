// =============================================================
// FILE: js/b6_market_shopping.js — B6 菜市場買菜
// =============================================================
'use strict';

// ── 市場攤位資料 ─────────────────────────────────────────────
const B6_STALLS = {
    vegetable: {
        name: '蔬菜攤', icon: '🥦',
        items: [
            { id: 'cabbage',  name: '高麗菜', price: 30,  unit: '顆', icon: '🥬' },
            { id: 'tomato',   name: '番茄',   price: 45,  unit: '斤', icon: '🍅' },
            { id: 'scallion', name: '青蔥',   price: 20,  unit: '把', icon: '🌿' },
            { id: 'sweetpot', name: '地瓜',   price: 35,  unit: '斤', icon: '🍠' },
            { id: 'spinach',  name: '菠菜',   price: 25,  unit: '把', icon: '🥗' },
            { id: 'carrot',   name: '紅蘿蔔', price: 40,  unit: '斤', icon: '🥕' },
        ],
    },
    fruit: {
        name: '水果攤', icon: '🍎',
        items: [
            { id: 'apple',    name: '蘋果',   price: 50,  unit: '斤', icon: '🍎' },
            { id: 'banana',   name: '香蕉',   price: 25,  unit: '把', icon: '🍌' },
            { id: 'grape',    name: '葡萄',   price: 80,  unit: '串', icon: '🍇' },
            { id: 'orange',   name: '柳橙',   price: 40,  unit: '斤', icon: '🍊' },
            { id: 'melon',    name: '哈密瓜', price: 120, unit: '顆', icon: '🍈' },
            { id: 'mango',    name: '芒果',   price: 60,  unit: '斤', icon: '🥭' },
        ],
    },
    grocery: {
        name: '雜貨攤', icon: '🛒',
        items: [
            { id: 'egg',      name: '雞蛋',   price: 65,  unit: '盒', icon: '🥚' },
            { id: 'tofu',     name: '豆腐',   price: 25,  unit: '塊', icon: '🫙' },
            { id: 'soy',      name: '醬油',   price: 45,  unit: '瓶', icon: '🍶' },
            { id: 'rice',     name: '白米',   price: 90,  unit: '包', icon: '🌾' },
            { id: 'noodle',   name: '麵條',   price: 35,  unit: '包', icon: '🍜' },
            { id: 'salt',     name: '食鹽',   price: 20,  unit: '包', icon: '🧂' },
        ],
    },
};

// ── 購物清單任務（依難度）───────────────────────────────────
const B6_MISSIONS = {
    easy: [
        { budget: 100, items: [
            { stall: 'vegetable', id: 'cabbage' },
            { stall: 'vegetable', id: 'scallion' },
        ]},  // 總價50，找零50
        { budget: 100, items: [
            { stall: 'vegetable', id: 'tomato' },
            { stall: 'grocery',   id: 'salt' },
        ]},  // 總價65，找零35
        { budget: 150, items: [
            { stall: 'fruit',     id: 'banana' },
            { stall: 'grocery',   id: 'tofu' },
            { stall: 'vegetable', id: 'scallion' },
        ]},  // 總價70，找零80
        { budget: 100, items: [
            { stall: 'grocery',   id: 'tofu' },
            { stall: 'vegetable', id: 'spinach' },
        ]},  // 總價50，找零50
        { budget: 200, items: [
            { stall: 'vegetable', id: 'carrot' },
            { stall: 'fruit',     id: 'apple' },
        ]},  // 總價90，找零110
        { budget: 100, items: [
            { stall: 'vegetable', id: 'sweetpot' },
            { stall: 'grocery',   id: 'salt' },
        ]},  // 總價55，找零45
        { budget: 150, items: [
            { stall: 'fruit',     id: 'apple' },
            { stall: 'vegetable', id: 'scallion' },
            { stall: 'grocery',   id: 'salt' },
        ]},  // 總價90，找零60
        { budget: 200, items: [
            { stall: 'grocery',   id: 'tofu' },
            { stall: 'vegetable', id: 'carrot' },
        ]},  // 總價65，找零135
    ],
    normal: [
        { budget: 200, items: [
            { stall: 'vegetable', id: 'cabbage' },
            { stall: 'vegetable', id: 'tomato' },
            { stall: 'grocery',   id: 'tofu' },
        ]},  // 總價100，找零100
        { budget: 300, items: [
            { stall: 'fruit',     id: 'apple' },
            { stall: 'grocery',   id: 'egg' },
            { stall: 'vegetable', id: 'carrot' },
        ]},  // 總價155，找零145
        { budget: 250, items: [
            { stall: 'fruit',     id: 'banana' },
            { stall: 'vegetable', id: 'tomato' },
            { stall: 'grocery',   id: 'noodle' },
            { stall: 'grocery',   id: 'salt' },
        ]},  // 總價125，找零125
        { budget: 200, items: [
            { stall: 'vegetable', id: 'sweetpot' },
            { stall: 'fruit',     id: 'orange' },
            { stall: 'grocery',   id: 'soy' },
        ]},  // 總價120，找零80
        { budget: 300, items: [
            { stall: 'grocery',   id: 'rice' },
            { stall: 'vegetable', id: 'spinach' },
            { stall: 'fruit',     id: 'mango' },
        ]},  // 總價175，找零125
        { budget: 250, items: [
            { stall: 'vegetable', id: 'scallion' },
            { stall: 'vegetable', id: 'carrot' },
            { stall: 'fruit',     id: 'banana' },
            { stall: 'grocery',   id: 'tofu' },
        ]},  // 總價110，找零140
        { budget: 250, items: [
            { stall: 'vegetable', id: 'tomato' },
            { stall: 'fruit',     id: 'banana' },
            { stall: 'grocery',   id: 'soy' },
        ]},  // 總價115，找零135
        { budget: 300, items: [
            { stall: 'vegetable', id: 'sweetpot' },
            { stall: 'fruit',     id: 'grape' },
            { stall: 'grocery',   id: 'noodle' },
            { stall: 'grocery',   id: 'salt' },
        ]},  // 總價170，找零130
    ],
    hard: [
        { budget: 500, items: [
            { stall: 'grocery',   id: 'rice' },
            { stall: 'grocery',   id: 'egg' },
            { stall: 'vegetable', id: 'cabbage' },
            { stall: 'vegetable', id: 'tomato' },
            { stall: 'fruit',     id: 'apple' },
        ]},  // 總價280，找零220
        { budget: 300, items: [
            { stall: 'fruit',     id: 'grape' },
            { stall: 'grocery',   id: 'egg' },
            { stall: 'vegetable', id: 'spinach' },
            { stall: 'grocery',   id: 'noodle' },
        ]},  // 總價205，找零95
        { budget: 400, items: [
            { stall: 'fruit',     id: 'mango' },
            { stall: 'vegetable', id: 'sweetpot' },
            { stall: 'grocery',   id: 'rice' },
            { stall: 'fruit',     id: 'banana' },
            { stall: 'grocery',   id: 'salt' },
        ]},  // 總價230，找零170
        { budget: 500, items: [
            { stall: 'fruit',     id: 'melon' },
            { stall: 'grocery',   id: 'egg' },
            { stall: 'grocery',   id: 'soy' },
            { stall: 'vegetable', id: 'carrot' },
            { stall: 'vegetable', id: 'scallion' },
        ]},  // 總價270，找零230
        { budget: 300, items: [
            { stall: 'fruit',     id: 'grape' },
            { stall: 'fruit',     id: 'orange' },
            { stall: 'grocery',   id: 'tofu' },
            { stall: 'vegetable', id: 'cabbage' },
            { stall: 'grocery',   id: 'noodle' },
        ]},  // 總價210，找零90
        { budget: 400, items: [
            { stall: 'fruit',     id: 'melon' },
            { stall: 'grocery',   id: 'egg' },
            { stall: 'vegetable', id: 'spinach' },
            { stall: 'vegetable', id: 'tomato' },
        ]},  // 總價255，找零145
        { budget: 500, items: [
            { stall: 'grocery',   id: 'rice' },
            { stall: 'fruit',     id: 'mango' },
            { stall: 'vegetable', id: 'sweetpot' },
            { stall: 'vegetable', id: 'cabbage' },
            { stall: 'grocery',   id: 'soy' },
        ]},  // 總價260，找零240
        { budget: 300, items: [
            { stall: 'fruit',     id: 'apple' },
            { stall: 'vegetable', id: 'carrot' },
            { stall: 'grocery',   id: 'tofu' },
            { stall: 'grocery',   id: 'noodle' },
        ]},  // 總價150，找零150
    ],
};

// ── 付款面額 ────────────────────────────────────────────────
const B6_BILLS = [
    { value: 1000, label: '千元',   color: '#7c3aed' },
    { value: 500,  label: '五百',   color: '#b45309' },
    { value: 100,  label: '百元',   color: '#1d4ed8' },
    { value: 50,   label: '五十',   color: '#0369a1' },
    { value: 10,   label: '十元',   color: '#047857' },
    { value: 5,    label: '五元',   color: '#b91c1c' },
    { value: 1,    label: '一元',   color: '#374151' },
];

// ── Game 物件 ────────────────────────────────────────────────────
// 金額語音轉換（安全版：若 number-speech-utils.js 未載入則退回原始格式）
const toTWD = v => typeof convertToTraditionalCurrency === 'function' ? convertToTraditionalCurrency(v) : `${v}元`;

let Game;

document.addEventListener('DOMContentLoaded', () => {
    Game = {

        // ── 1. Debug ──────────────────────────────────────────
        Debug: {
            FLAGS: { all: false, init: false, speech: false, question: false, payment: false, error: true },
            log(cat, ...a)  { if (this.FLAGS.all || this.FLAGS[cat]) console.log(`[B6-${cat}]`, ...a); },
            warn(cat, ...a) { if (this.FLAGS.all || this.FLAGS[cat]) console.warn(`[B6-${cat}]`, ...a); },
            error(...a)     { console.error('[B6-ERROR]', ...a); },
        },

        // ── 2. TimerManager ───────────────────────────────────
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
            },
        },

        // ── 3. EventManager ───────────────────────────────────
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
            },
        },

        // ── 4. Audio ──────────────────────────────────────────
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
            },
        },

        // ── 5. Speech ─────────────────────────────────────────
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
                const safeCallback = () => { if (callbackExecuted) return; callbackExecuted = true; callback?.(); };
                u.onend = safeCallback;
                u.onerror = (e) => { if (e.error !== 'interrupted') Game.Debug.warn('speech', '語音錯誤', e.error); safeCallback(); };
                Game.TimerManager.setTimeout(safeCallback, 10000, 'speech');
                try {
                    window.speechSynthesis.speak(u);
                } catch(e) {
                    Game.Debug.warn('speech', '語音播放失敗', e);
                    safeCallback();
                }
            },
        },

        // ── 6. State ──────────────────────────────────────────
        state: {
            settings: { difficulty: null, rounds: null },
            game: {
                currentRound: 0,
                totalRounds: 5,
                correctCount: 0,
                missions: [],
                startTime: null,
                // current round state
                mission: null,
                collectedIds: new Set(),
                activeStall: 'vegetable',
                phase: 'shopping', // 'shopping' | 'payment' | 'change'
                paidAmount: 0,
            },
            isEndingGame: false,
            isProcessing: false,
        },

        // ── 7. Init ───────────────────────────────────────────
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
            if (document.getElementById('b6-global-animations')) return;
            const style = document.createElement('style');
            style.id = 'b6-global-animations';
            style.textContent = `
                @keyframes b6Collect {
                    0%   { transform: scale(1); }
                    40%  { transform: scale(1.15); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        },

        resetGameState() {
            const g = this.state.game;
            g.currentRound = 0;
            g.totalRounds  = this.state.settings.rounds;
            g.correctCount = 0;
            g.missions     = [];
            g.startTime    = null;
            g.mission      = null;
            g.collectedIds = new Set();
            g.activeStall  = 'vegetable';
            g.phase        = 'shopping';
            g.paidAmount   = 0;
            this.state.isEndingGame = false;
            this.state.isProcessing  = false;
            Game.Debug.log('init', '🔄 [B6] 遊戲狀態已重置');
        },

        // ── 7. 設定頁 ─────────────────────────────────────────
        showSettings() {
            Game.TimerManager.clearAll();
            Game.EventManager.removeByCategory('gameUI');
            this.resetGameState();
            document.getElementById('app').innerHTML = this._renderSettingsHTML();
            this._bindSettingsEvents();
        },

        _renderSettingsHTML() {
            return `
            <div class="unit-welcome">
                <div class="welcome-content">
                    <div class="settings-title-row">
                        <img src="../images/index/educated_money_bag_character.png" alt="金錢小助手"
                             class="settings-mascot-img" onerror="this.style.display='none'">
                        <h1>單元B6：菜市場買菜</h1>
                    </div>
                    <div class="game-settings">
                        <div class="b-setting-group">
                            <label class="b-setting-label">難度：</label>
                            <div class="b-btn-group" id="diff-group">
                                <button class="b-sel-btn b-diff-easy"   data-val="easy">簡單</button>
                                <button class="b-sel-btn b-diff-normal" data-val="normal">普通</button>
                                <button class="b-sel-btn b-diff-hard"   data-val="hard">困難</button>
                            </div>
                            <div class="b-diff-desc" id="diff-desc"></div>
                        </div>
                        <div class="b-setting-group">
                            <label class="b-setting-label">關卡數：</label>
                            <div class="b-btn-group" id="rounds-group">
                                <button class="b-sel-btn" data-val="1">1關</button>
                                <button class="b-sel-btn" data-val="3">3關</button>
                                <button class="b-sel-btn" data-val="5">5關</button>
                                <button class="b-sel-btn" data-val="6">6關</button>
                            </div>
                        </div>
                        <div class="b-setting-group">
                            <label class="b-setting-label">📝 作業單：</label>
                            <div class="b-btn-group">
                                <a href="#" id="settings-worksheet-link" class="b-sel-btn"
                                   style="text-decoration:none;display:inline-flex;align-items:center;justify-content:center;">
                                    產生作業單
                                </a>
                            </div>
                        </div>
                        <div class="b-setting-group">
                            <label class="b-setting-label">🎁 獎勵系統：</label>
                            <div class="b-btn-group">
                                <a href="#" id="settings-reward-link" class="b-sel-btn"
                                   style="text-decoration:none;display:inline-flex;align-items:center;justify-content:center;">
                                    開啟獎勵系統
                                </a>
                            </div>
                        </div>
                        <div class="b-setting-group">
                            <label style="font-size:13px;color:#6b7280;text-align:left;display:block;">
                                ✨ 依照購物清單在市場各攤位買菜，然後付款找零
                            </label>
                        </div>
                    </div>
                    <div class="game-buttons">
                        <button class="back-btn" onclick="Game.backToMenu()">← 返回主選單</button>
                        <button class="start-btn" id="start-btn" disabled>開始練習</button>
                    </div>
                </div>
            </div>`;
        },

        _diffDescriptions: {
            easy:   '簡單：購物清單項目少，攤位明確，付款金額為整數',
            normal: '普通：多項商品，需找到正確攤位並計算總消費',
            hard:   '困難：複雜購物清單，需精算總額並正確處理找零',
        },

        _bindSettingsEvents() {
            Game.EventManager.removeByCategory('settings');
            document.querySelectorAll('#diff-group .b-sel-btn').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#diff-group .b-sel-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.difficulty = btn.dataset.val;
                    const desc = document.getElementById('diff-desc');
                    if (desc) { desc.textContent = this._diffDescriptions[btn.dataset.val]; desc.classList.add('show'); }
                    this._checkCanStart();
                }, {}, 'settings');
            });

            document.querySelectorAll('#rounds-group .b-sel-btn').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#rounds-group .b-sel-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.rounds = parseInt(btn.dataset.val);
                    this._checkCanStart();
                }, {}, 'settings');
            });

            const rewardLink = document.getElementById('settings-reward-link');
            Game.EventManager.on(rewardLink, 'click', (e) => {
                e.preventDefault();
                if (typeof RewardLauncher !== 'undefined') RewardLauncher.open();
                else window.open('../reward/index.html', 'RewardSystem', 'width=1200,height=800');
            }, {}, 'settings');

            // 作業單
            Game.EventManager.on(document.getElementById('settings-worksheet-link'), 'click', (e) => {
                e.preventDefault();
                const params = new URLSearchParams({ unit: 'b6' });
                window.open('../worksheet/index.html?' + params.toString(), 'Worksheet', 'width=900,height=700');
            }, {}, 'settings');

            Game.EventManager.on(document.getElementById('start-btn'), 'click', () => this.startGame(), {}, 'settings');
        },

        _checkCanStart() {
            const btn = document.getElementById('start-btn');
            if (btn) btn.disabled = !this.state.settings.difficulty || !this.state.settings.rounds;
        },

        // ── 8. 遊戲開始 ───────────────────────────────────────
        startGame() {
            Game.EventManager.removeByCategory('settings');
            Game.TimerManager.clearAll();

            const s = this.state.settings;
            const g = this.state.game;
            g.currentRound = 0;
            g.totalRounds  = s.rounds;
            g.correctCount = 0;
            g.startTime    = Date.now();
            g.missions     = this._pickMissions(s.rounds, s.difficulty);

            this.state.isEndingGame = false;
            this.state.isProcessing  = false;

            this.renderRound();
        },

        _pickMissions(count, diff) {
            const pool = B6_MISSIONS[diff].slice().sort(() => Math.random() - 0.5);
            const result = [];
            for (let i = 0; i < count; i++) {
                result.push(pool[i % pool.length]);
            }
            return result;
        },

        // ── 9. 關卡初始化 ─────────────────────────────────────
        renderRound() {
            Game.TimerManager.clearAll();
            Game.EventManager.removeByCategory('gameUI');
            this.state.isProcessing = false;

            const g       = this.state.game;
            g.mission     = g.missions[g.currentRound];
            g.collectedIds = new Set();
            g.activeStall = 'vegetable';
            g.phase       = 'shopping';
            g.paidAmount  = 0;

            this._renderShoppingUI();

            // 語音引導：讀出購物清單
            Game.TimerManager.setTimeout(() => {
                const names = g.mission.items.map(({ stall, id }) => {
                    const item = B6_STALLS[stall].items.find(i => i.id === id);
                    return item ? item.name : '';
                }).filter(Boolean).join('、');
                this.state.game.lastSpeechText = `今天要買：${names}。請去各攤位找到這些商品。`;
                Game.Speech.speak(`今天要買：${names}。請去各攤位找到這些商品。`);
            }, 600, 'speech');
        },

        // ── 10. 購物畫面 ──────────────────────────────────────
        _renderShoppingUI() {
            const g       = this.state.game;
            const mission = g.mission;
            const total   = this._calcMissionTotal();
            const pct     = Math.round((g.currentRound / g.totalRounds) * 100);

            const listHTML = mission.items.map(({ stall, id }) => {
                const item  = B6_STALLS[stall].items.find(i => i.id === id);
                const done  = g.collectedIds.has(id);
                return `
                <div class="b6-list-item ${done ? 'checked' : ''}" data-item-id="${id}">
                    <span class="b6-list-icon">${item.icon}</span>
                    <span class="b6-list-name">${item.name}</span>
                    <span class="b6-list-check">✅</span>
                </div>`;
            }).join('');

            const stallKeys = Object.keys(B6_STALLS);
            const stallTabsHTML = stallKeys.map(k => `
                <button class="b6-stall-tab ${g.activeStall === k ? 'active' : ''}" data-stall="${k}">
                    ${B6_STALLS[k].icon} ${B6_STALLS[k].name}
                </button>`).join('');

            const stallItems = B6_STALLS[g.activeStall].items;
            const needIds    = new Set(mission.items.map(i => i.id));
            const productsHTML = stallItems.map(item => {
                const collected  = g.collectedIds.has(item.id);
                const inList     = needIds.has(item.id);
                return `
                <button class="b6-product-btn ${collected ? 'collected' : ''} ${!inList ? 'not-in-list' : ''}"
                        data-item-id="${item.id}" data-stall="${g.activeStall}" ${collected ? 'disabled' : ''}>
                    <span class="b6-product-icon">${item.icon}</span>
                    <span class="b6-product-name">${item.name}</span>
                    <span class="b6-product-price">${item.price} 元</span>
                    <span class="b6-product-unit">/ ${item.unit}</span>
                </button>`;
            }).join('');

            const allDone  = mission.items.every(({ id }) => g.collectedIds.has(id));

            const app = document.getElementById('app');
            app.innerHTML = `
            <div class="b-header">
                <div class="b-header-left">
                    <span class="b-header-unit">🛒 菜市場買菜</span>
                </div>
                <div class="b-header-center">${{ easy: '簡單模式', normal: '普通模式', hard: '困難模式' }[this.state.settings.difficulty] || ''}</div>
                <div class="b-header-right">
                    <span class="b-progress">第 ${this.state.game.currentRound + 1} 關 / 共 ${this.state.game.totalRounds} 關</span>
                    <button class="b-reward-btn" onclick="if(typeof RewardLauncher!=='undefined'){RewardLauncher.open();}else{window.open('../reward/index.html','RewardSystem','width=1200,height=800');}">🎁 獎勵</button>
                    <button class="b-back-btn" onclick="Game.showSettings()">返回設定</button>
                </div>
            </div>
            <div class="game-container">
                <div class="progress-bar-wrap">
                    <div class="progress-bar-fill" style="width:${pct}%"></div>
                </div>
                <div style="text-align:center;font-size:14px;color:#6b7280;">
                    第 ${g.currentRound + 1} 關 / 共 ${g.totalRounds} 關 　預算：${mission.budget} 元
                </div>

                <!-- 購物清單 -->
                <div class="b6-list-card">
                    <div class="b6-list-header">
                        <span>📋 今天要買的東西</span>
                        <button class="b6-replay-btn" id="replay-speech-btn" title="重播語音">🔊</button>
                    </div>
                    ${listHTML}
                </div>

                <!-- 攤位分頁 -->
                <div class="b6-stall-tabs">${stallTabsHTML}</div>

                <!-- 商品格子 -->
                <div class="b6-stall-panel">
                    <div class="b6-stall-panel-header">
                        ${B6_STALLS[g.activeStall].icon} ${B6_STALLS[g.activeStall].name}
                    </div>
                    <div class="b6-products-grid">${productsHTML}</div>
                </div>

                <!-- 購物籃 -->
                <div class="b6-basket-bar">
                    <span>🛒 小計：<span class="b6-basket-total">${total}</span> 元</span>
                    <button class="b6-checkout-btn" id="b6-checkout-btn" ${allDone ? '' : 'disabled'}>
                        前往結帳 →
                    </button>
                </div>
            </div>`;

            this._bindShoppingEvents();
        },

        _bindShoppingEvents() {
            const g = this.state.game;

            // 攤位切換
            document.querySelectorAll('.b6-stall-tab').forEach(tab => {
                Game.EventManager.on(tab, 'click', () => {
                    this.audio.play('click');
                    g.activeStall = tab.dataset.stall;
                    this._renderShoppingUI();
                }, {}, 'gameUI');
            });

            // 商品點擊
            document.querySelectorAll('.b6-product-btn:not([disabled])').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    const itemId = btn.dataset.itemId;
                    const stall  = btn.dataset.stall;
                    const needIds = new Set(g.mission.items.map(i => i.id));

                    if (!needIds.has(itemId)) {
                        this.audio.play('error');
                        // 顯示提示文字
                        const itemData = B6_STALLS[stall].items.find(i => i.id === itemId);
                        const tipId = 'b6-wrong-tip';
                        let tip = document.getElementById(tipId);
                        if (!tip) {
                            tip = document.createElement('div');
                            tip.id = tipId;
                            document.body.appendChild(tip);
                        }
                        const itemName = itemData ? itemData.name : '這個';
                        tip.textContent = `❌ ${itemName}不在今天的購物清單上`;
                        Game.TimerManager.clearByCategory('wrongTip');
                        Game.TimerManager.setTimeout(() => { tip?.remove(); }, 2000, 'wrongTip');
                        Game.Speech.speak(`${itemName}不在今天的購物清單上`);
                        return;
                    }

                    g.collectedIds.add(itemId);
                    this.audio.play('correct');
                    btn.classList.add('collected');
                    btn.disabled = true;

                    // Update list item
                    const listItem = document.querySelector(`.b6-list-item[data-item-id="${itemId}"]`);
                    if (listItem) listItem.classList.add('checked');

                    // Update total and checkout button
                    const total     = this._calcMissionTotal();
                    const basketEl  = document.querySelector('.b6-basket-total');
                    if (basketEl) basketEl.textContent = total;

                    const allDone   = g.mission.items.every(({ id }) => g.collectedIds.has(id));
                    const checkoutBtn = document.getElementById('b6-checkout-btn');
                    if (checkoutBtn) checkoutBtn.disabled = !allDone;
                }, {}, 'gameUI');
            });

            // 結帳按鈕
            const checkoutBtn = document.getElementById('b6-checkout-btn');
            Game.EventManager.on(checkoutBtn, 'click', () => {
                if (this.state.isProcessing) return;
                g.phase = 'payment';
                g.paidAmount = 0;
                this._renderPaymentUI();
            }, {}, 'gameUI');
            // 語音重播
            const replayBtn = document.getElementById('replay-speech-btn');
            if (replayBtn) {
                Game.EventManager.on(replayBtn, 'click', () => {
                    const text = this.state.game.lastSpeechText;
                    if (text) Game.Speech.speak(text);
                }, {}, 'gameUI');
            }
        },

        _showCenterFeedback(icon, text = '') {
            document.querySelector('.b-center-feedback')?.remove();
            const overlay = document.createElement('div');
            overlay.className = 'b-center-feedback';
            overlay.innerHTML = `<span class="b-cf-icon">${icon}</span>${text ? `<span class="b-cf-text">${text}</span>` : ''}`;
            document.body.appendChild(overlay);
            Game.TimerManager.setTimeout(() => overlay.remove(), 1200, 'ui');
        },

        _calcMissionTotal() {
            const g = this.state.game;
            return g.mission.items.reduce((sum, { stall, id }) => {
                const item = B6_STALLS[stall].items.find(i => i.id === id);
                return sum + (item ? item.price : 0);
            }, 0);
        },

        // ── 11. 付款畫面 ──────────────────────────────────────
        _renderPaymentUI() {
            Game.TimerManager.clearAll();
            Game.EventManager.removeByCategory('gameUI');

            const g     = this.state.game;
            const total = this._calcMissionTotal();

            const billsHTML = B6_BILLS.map(b => `
                <button class="b6-bill-btn" data-value="${b.value}" style="--bill-color:${b.color || '#374151'}">
                    <span class="b6-bill-label">${b.label}</span>
                    <span class="b6-bill-value">${b.value}</span>
                </button>`).join('');

            const app = document.getElementById('app');
            app.innerHTML = `
            <div class="b-header">
                <div class="b-header-left">
                    <span class="b-header-unit">🛒 菜市場買菜</span>
                </div>
                <div class="b-header-center">${{ easy: '簡單模式', normal: '普通模式', hard: '困難模式' }[this.state.settings.difficulty] || ''}</div>
                <div class="b-header-right">
                    <span class="b-progress">第 ${this.state.game.currentRound + 1} 關 / 共 ${this.state.game.totalRounds} 關</span>
                    <button class="b-reward-btn" onclick="if(typeof RewardLauncher!=='undefined'){RewardLauncher.open();}else{window.open('../reward/index.html','RewardSystem','width=1200,height=800');}">🎁 獎勵</button>
                    <button class="b-back-btn" onclick="Game.showSettings()">返回設定</button>
                </div>
            </div>
            <div class="game-container">
                <div class="b6-payment-section">
                    <div class="b6-payment-title">💰 結帳付款</div>
                    <div class="b6-payment-amount">${total} 元</div>

                    <div class="b6-paid-display" id="b6-paid-display">
                        已付：<span id="b6-paid-value">0</span> 元
                    </div>

                    <div class="b6-bill-grid">${billsHTML}</div>

                    <div class="b6-pay-actions">
                        <button class="b6-clear-btn" id="b6-clear-btn">清除</button>
                        <button class="b6-pay-btn" id="b6-pay-btn" disabled>付款</button>
                    </div>
                </div>
            </div>`;

            // 語音
            Game.TimerManager.setTimeout(() => {
                Game.Speech.speak(`共消費${toTWD(total)}，請選擇付款金額。`);
            }, 300, 'speech');

            this._bindPaymentEvents(total);
        },

        _bindPaymentEvents(total) {
            const g = this.state.game;

            document.querySelectorAll('.b6-bill-btn').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    this.audio.play('click');
                    g.paidAmount += parseInt(btn.dataset.value);
                    this._updatePaidDisplay(g.paidAmount, total);
                }, {}, 'gameUI');
            });

            Game.EventManager.on(document.getElementById('b6-clear-btn'), 'click', () => {
                g.paidAmount = 0;
                this._updatePaidDisplay(0, total);
            }, {}, 'gameUI');

            Game.EventManager.on(document.getElementById('b6-pay-btn'), 'click', () => {
                if (this.state.isProcessing) return;
                if (g.paidAmount < total) return;
                this.state.isProcessing = true;
                this._showChange(g.paidAmount, total);
            }, {}, 'gameUI');
        },

        _updatePaidDisplay(paid, total) {
            const el = document.getElementById('b6-paid-value');
            if (el) el.textContent = paid;

            const payBtn = document.getElementById('b6-pay-btn');
            if (payBtn) {
                payBtn.disabled = paid < total;
                if (paid >= total) {
                    payBtn.style.background = '#059669';
                } else {
                    payBtn.style.background = '';
                }
            }
        },

        // ── 12. 找零畫面 ──────────────────────────────────────
        _showChange(paid, total) {
            Game.TimerManager.clearAll();
            Game.EventManager.removeByCategory('gameUI');

            const change = paid - total;

            // 困難模式：三選一找零驗算
            if (this.state.settings.difficulty === 'hard') {
                this._showChangeQuiz(paid, total, change);
                return;
            }

            // 簡單 / 普通模式：直接顯示找零結果
            this._showChangeResult(paid, change);
        },

        _showChangeQuiz(paid, total, change) {
            const g = this.state.game;

            Game.Speech.speak(`你付了${toTWD(paid)}，買菜共花了${toTWD(total)}元，應該找回多少元？`);

            // 產生干擾項（±5~30，避免出現負數或 0）
            const offsets = [5, 10, 15, 20, 25, 30];
            const decoys = [];
            for (const d of offsets) {
                if (change - d > 0 && !decoys.includes(change - d)) { decoys.push(change - d); break; }
            }
            for (const d of offsets) {
                if (change + d !== change && !decoys.includes(change + d)) { decoys.push(change + d); break; }
            }
            const options = [change, ...decoys].sort(() => Math.random() - 0.5);

            const optionsHTML = options.map(v => `
                <button class="b6-change-opt" data-value="${v}">${v} 元</button>
            `).join('');

            const app = document.getElementById('app');
            app.innerHTML = `
            <div class="b-header">
                <div class="b-header-left"><span class="b-header-unit">🛒 菜市場買菜</span></div>
                <div class="b-header-center">困難模式</div>
                <div class="b-header-right">
                    <span class="b-progress">第 ${g.currentRound + 1} 關 / 共 ${g.totalRounds} 關</span>
                    <button class="b-reward-btn" onclick="if(typeof RewardLauncher!=='undefined'){RewardLauncher.open();}else{window.open('../reward/index.html','RewardSystem','width=1200,height=800');}">🎁 獎勵</button>
                    <button class="b-back-btn" onclick="Game.showSettings()">返回設定</button>
                </div>
            </div>
            <div class="game-container">
                <div class="b6-change-section">
                    <div class="b6-change-icon">🤔</div>
                    <div class="b6-change-text">付了 <strong>${paid}</strong> 元，買菜花了 <strong>${total}</strong> 元</div>
                    <div class="b6-change-question">應該找回多少元？</div>
                    <div class="b6-change-opts" id="b6-change-opts">${optionsHTML}</div>
                </div>
            </div>`;

            document.querySelectorAll('.b6-change-opt').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    const selected = parseInt(btn.dataset.value);
                    if (selected === change) {
                        // 答對
                        document.querySelectorAll('.b6-change-opt').forEach(b => b.disabled = true);
                        btn.classList.add('b6-change-opt-correct');
                        this.audio.play('correct');
                        this._showCenterFeedback('✅', `找回 ${change} 元！`);
                        Game.Speech.speak(`對了！找回${toTWD(change)}，買菜成功！`, () => {
                            Game.TimerManager.setTimeout(() => {
                                this._showChangeResult(paid, change);
                            }, 800, 'turnTransition');
                        });
                    } else {
                        // 答錯
                        btn.classList.add('b6-change-opt-wrong');
                        this.audio.play('error');
                        const retryMode = this.state.settings.retryMode;
                        if (retryMode === 'retry') {
                            btn.disabled = true;
                            Game.Speech.speak('再想想看，找回多少元？');
                        } else {
                            document.querySelectorAll('.b6-change-opt').forEach(b => {
                                b.disabled = true;
                                if (parseInt(b.dataset.value) === change) b.classList.add('b6-change-opt-correct');
                            });
                            Game.Speech.speak(`正確答案是找回${toTWD(change)}`, () => {
                                Game.TimerManager.setTimeout(() => {
                                    this._showChangeResult(paid, change);
                                }, 1400, 'turnTransition');
                            });
                        }
                    }
                }, {}, 'gameUI');
            });
        },

        _showChangeResult(paid, change) {
            const g = this.state.game;

            g.correctCount++;

            const app = document.getElementById('app');
            app.innerHTML = `
            <div class="b-header">
                <div class="b-header-left"><span class="b-header-unit">🛒 菜市場買菜</span></div>
                <div class="b-header-center">${{ easy: '簡單模式', normal: '普通模式', hard: '困難模式' }[this.state.settings.difficulty] || ''}</div>
                <div class="b-header-right">
                    <span class="b-progress">第 ${g.currentRound + 1} 關 / 共 ${g.totalRounds} 關</span>
                    <button class="b-reward-btn" onclick="if(typeof RewardLauncher!=='undefined'){RewardLauncher.open();}else{window.open('../reward/index.html','RewardSystem','width=1200,height=800');}">🎁 獎勵</button>
                    <button class="b-back-btn" onclick="Game.showSettings()">返回設定</button>
                </div>
            </div>
            <div class="game-container">
                <div class="b6-change-section">
                    <div class="b6-change-icon">🎉</div>
                    <div class="b6-change-text">付了 ${paid} 元，找回</div>
                    <div class="b6-change-amount">${change} 元</div>
                    <div style="font-size:14px;color:#065f46;margin-top:4px;">買菜成功！</div>
                </div>
                <button class="b5-next-btn" id="b6-next-btn">
                    ${g.currentRound + 1 >= g.totalRounds ? '查看結果 →' : '下一關 →'}
                </button>
            </div>`;

            Game.EventManager.on(document.getElementById('b6-next-btn'), 'click',
                () => this.nextRound(), {}, 'gameUI');
        },

        // ── 13. 下一關 ────────────────────────────────────────
        nextRound() {
            this.state.game.currentRound++;
            if (this.state.game.currentRound >= this.state.game.totalRounds) {
                this.showResults();
            } else {
                this.renderRound();
            }
        },

        // ── 14. 完成畫面 ──────────────────────────────────────
        showResults() {
            if (this.state.isEndingGame) return;
            this.state.isEndingGame = true;

            Game.TimerManager.clearByCategory('turnTransition');
            Game.EventManager.removeByCategory('gameUI');

            const g        = this.state.game;
            const elapsed  = g.startTime ? (Date.now() - g.startTime) : 0;
            const mins     = Math.floor(elapsed / 60000);
            const secs     = Math.floor((elapsed % 60000) / 1000);
            const accuracy = g.totalRounds > 0
                ? Math.round((g.correctCount / g.totalRounds) * 100) : 0;

            let badge, badgeColor;
            if (accuracy >= 90)      { badge = '優異 🏆'; badgeColor = '#f59e0b'; }
            else if (accuracy >= 70) { badge = '良好 👍'; badgeColor = '#10b981'; }
            else if (accuracy >= 50) { badge = '努力 💪'; badgeColor = '#6366f1'; }
            else                     { badge = '練習 📚'; badgeColor = '#94a3b8'; }

            const app = document.getElementById('app');
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
            app.style.overflow = 'auto'; app.style.height = 'auto'; app.style.minHeight = '100vh';

            app.innerHTML = `
<div class="b-res-wrapper">
    <div class="b-res-screen">
        <div class="b-res-header">
            <div class="b-res-trophy">🏆</div>
            <div class="b-res-title-row">
                <img src="../images/index/educated_money_bag_character.png"
                     class="b-res-mascot" alt="金錢小助手" onerror="this.style.display='none'">
                <h1 class="b-res-title">🎉 採購達人 🎉</h1>
                <span class="b-res-mascot-spacer"></span>
            </div>
        </div>

        <div class="b-res-reward-wrap">
            <a href="#" id="endgame-reward-link" class="b-res-reward-link">
                🎁 開啟獎勵系統（可加 ${g.correctCount} 分）
            </a>
        </div>

        <div class="b-res-container">
            <div class="b-res-grid">
                <div class="b-res-card b-res-card-1">
                    <div class="b-res-icon">✅</div>
                    <div class="b-res-label">完成關卡</div>
                    <div class="b-res-value">${g.correctCount}/${g.totalRounds}</div>
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
                    <div class="b-res-ach-item">✅ 找到指定商品的攤位</div>
                    <div class="b-res-ach-item">✅ 計算總消費金額</div>
                    <div class="b-res-ach-item">✅ 選擇正確付款金額與找零</div>
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

            Game.EventManager.on(document.getElementById('play-again-btn'), 'click',
                () => this.startGame(), {}, 'gameUI');
            Game.EventManager.on(document.getElementById('back-settings-btn'), 'click',
                () => this.showSettings(), {}, 'gameUI');
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
                const accuracy = g.totalRounds > 0
                    ? Math.round((g.correctCount / g.totalRounds) * 100) : 0;
                let msg;
                if (accuracy === 100)    msg = '太厲害了，全部完成了！';
                else if (accuracy >= 80) msg = `很棒喔，完成了${g.correctCount}關！`;
                else if (accuracy >= 60) msg = '不錯喔，繼續加油！';
                else                     msg = '要再加油喔，多練習幾次！';
                Game.Speech.speak(msg);
            }, 800, 'speech');
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
                Game.TimerManager.setTimeout(fire, 250, 'confetti');
            };
            fire();
        },

        backToMenu() {
            Game.TimerManager.clearAll();
            Game.EventManager.removeAll();
            window.location.href = '../index.html#part4';
        },
    };

    Game.init();
});
