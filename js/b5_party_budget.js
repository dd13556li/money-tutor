// =============================================================
// FILE: js/b5_party_budget.js — B5 生日派對預算
// =============================================================
'use strict';

// ── 所有可選商品 ─────────────────────────────────────────────
const B5_ALL_ITEMS = [
    { id: 'cake',      name: '生日蛋糕',  price: 380, icon: '🎂', must: true  },
    { id: 'drink',     name: '果汁飲料',  price: 120, icon: '🧃', must: true  },
    { id: 'balloon',   name: '彩色氣球',  price: 50,  icon: '🎈', must: false },
    { id: 'gift',      name: '小禮物',    price: 200, icon: '🎁', must: false },
    { id: 'plate',     name: '派對紙盤',  price: 45,  icon: '🍽️', must: false },
    { id: 'candle',    name: '生日蠟燭',  price: 30,  icon: '🕯️', must: false },
    { id: 'ribbon',    name: '彩帶裝飾',  price: 65,  icon: '🎊', must: false },
    { id: 'hat',       name: '派對帽',    price: 80,  icon: '🎉', must: false },
    { id: 'candy',     name: '糖果禮包',  price: 90,  icon: '🍬', must: false },
    { id: 'photo',     name: '拍立得相機',price: 150, icon: '📸', must: false },
    { id: 'popper',    name: '噴彩拉炮',  price: 55,  icon: '🎆', must: false },
    { id: 'banner',    name: '生日橫幅',  price: 70,  icon: '🏷️', must: false },
];

// ── 關卡設定（依難度，每關有預算和可用商品清單）──────────────
const B5_SCENARIOS = {
    easy: [
        // 簡單：預算寬裕，只需含必買 + 任意 1~2 項即可達標
        { budget: 700,  availableIds: ['cake','drink','balloon','hat','candle'] },
        { budget: 600,  availableIds: ['cake','drink','ribbon','plate','candle'] },
        { budget: 650,  availableIds: ['cake','drink','balloon','plate','hat'] },
        { budget: 750,  availableIds: ['cake','drink','candy','hat','candle'] },
        { budget: 680,  availableIds: ['cake','drink','popper','candle','balloon'] },
        { budget: 720,  availableIds: ['cake','drink','ribbon','hat','plate'] },
        { budget: 600,  availableIds: ['cake','drink','balloon','candle','plate'] },
        { budget: 650,  availableIds: ['cake','drink','hat','popper','candle'] },
        { budget: 700,  availableIds: ['cake','drink','banner','photo','candle'] },
        { budget: 650,  availableIds: ['cake','drink','candy','popper','ribbon'] },
        { budget: 720,  availableIds: ['cake','drink','plate','candle','banner'] },
        { budget: 680,  availableIds: ['cake','drink','ribbon','balloon','plate'] },
    ],
    normal: [
        // 普通：需思考，選 2~3 項選購才能接近但不超過預算
        { budget: 700,  availableIds: ['cake','drink','balloon','gift','plate','candle','hat'] },
        { budget: 750,  availableIds: ['cake','drink','ribbon','gift','photo','candle','hat'] },
        { budget: 800,  availableIds: ['cake','drink','balloon','gift','candy','popper','hat'] },
        { budget: 650,  availableIds: ['cake','drink','balloon','plate','ribbon','candle','hat'] },
        { budget: 720,  availableIds: ['cake','drink','gift','ribbon','photo','plate','candle'] },
        { budget: 780,  availableIds: ['cake','drink','candy','gift','popper','banner','hat'] },
        { budget: 700,  availableIds: ['cake','drink','balloon','photo','plate','ribbon','candle'] },
        { budget: 760,  availableIds: ['cake','drink','gift','candy','banner','popper','hat'] },
        { budget: 730,  availableIds: ['cake','drink','balloon','photo','candy','ribbon','plate'] },
        { budget: 710,  availableIds: ['cake','drink','gift','plate','banner','balloon','candle'] },
        { budget: 740,  availableIds: ['cake','drink','candy','hat','photo','popper','ribbon'] },
        { budget: 770,  availableIds: ['cake','drink','balloon','banner','ribbon','hat','gift'] },
    ],
    hard: [
        // 困難：預算偏緊，需精算組合，多一項就超支
        { budget: 700,  availableIds: ['cake','drink','balloon','gift','plate','candle','ribbon','hat','candy'] },
        { budget: 750,  availableIds: ['cake','drink','ribbon','gift','photo','candle','hat','popper','candy'] },
        { budget: 720,  availableIds: ['cake','drink','balloon','gift','banner','plate','ribbon','hat','photo'] },
        { budget: 680,  availableIds: ['cake','drink','balloon','gift','candy','popper','ribbon','hat','banner'] },
        { budget: 760,  availableIds: ['cake','drink','gift','photo','candy','popper','banner','ribbon','hat'] },
        { budget: 740,  availableIds: ['cake','drink','balloon','gift','photo','plate','candle','ribbon','popper'] },
        { budget: 710,  availableIds: ['cake','drink','candy','banner','gift','hat','photo','ribbon','popper'] },
        { budget: 770,  availableIds: ['cake','drink','balloon','gift','photo','candy','plate','banner','hat'] },
    ],
};

// ── 派對主題資料（除 birthday 外的額外主題）──────────────────────
const B5_THEMES = {
    birthday: {
        name: '生日派對', icon: '🎂',
        allItems: B5_ALL_ITEMS,
        scenarios: B5_SCENARIOS,
    },
    halloween: {
        name: '萬聖節派對', icon: '🎃',
        allItems: [
            { id:'pumpkin',  name:'南瓜燈',    price:150, icon:'🎃', must:true  },
            { id:'costume',  name:'萬聖節服裝', price:250, icon:'👻', must:true  },
            { id:'candy_bag',name:'糖果袋',     price:80,  icon:'🍬', must:false },
            { id:'witch_hat',name:'巫師帽',     price:60,  icon:'🧙', must:false },
            { id:'spider',   name:'蜘蛛網裝飾', price:45,  icon:'🕸️', must:false },
            { id:'skull',    name:'骷髏擺件',   price:70,  icon:'💀', must:false },
            { id:'glow',     name:'螢光棒',     price:25,  icon:'🌟', must:false },
            { id:'ghost',    name:'鬼臉面具',   price:90,  icon:'😱', must:false },
            { id:'treat',    name:'糖果包裝袋', price:40,  icon:'🛍️', must:false },
            { id:'fangs',    name:'吸血鬼牙齒', price:30,  icon:'🦷', must:false },
        ],
        scenarios: {
            easy: [
                { budget:600, availableIds:['pumpkin','costume','candy_bag','witch_hat','glow'] },
                { budget:550, availableIds:['pumpkin','costume','spider','skull','fangs'] },
                { budget:580, availableIds:['pumpkin','costume','treat','glow','witch_hat'] },
                { budget:620, availableIds:['pumpkin','costume','ghost','candy_bag','glow'] },
                { budget:570, availableIds:['pumpkin','costume','skull','treat','spider'] },
                { budget:610, availableIds:['pumpkin','costume','witch_hat','fangs','glow'] },
                { budget:590, availableIds:['pumpkin','costume','candy_bag','spider','glow'] },
                { budget:600, availableIds:['pumpkin','costume','glow','treat','fangs'] },
            ],
            normal: [
                { budget:640, availableIds:['pumpkin','costume','candy_bag','witch_hat','glow','skull','spider'] },
                { budget:700, availableIds:['pumpkin','costume','ghost','treat','fangs','witch_hat','skull'] },
                { budget:680, availableIds:['pumpkin','costume','candy_bag','spider','skull','glow','fangs'] },
                { budget:660, availableIds:['pumpkin','costume','witch_hat','ghost','treat','candy_bag','glow'] },
                { budget:720, availableIds:['pumpkin','costume','skull','fangs','candy_bag','witch_hat','treat'] },
                { budget:650, availableIds:['pumpkin','costume','spider','glow','ghost','witch_hat','candy_bag'] },
                { budget:690, availableIds:['pumpkin','costume','fangs','skull','treat','ghost','spider'] },
                { budget:670, availableIds:['pumpkin','costume','candy_bag','glow','skull','witch_hat','ghost'] },
            ],
            hard: [
                { budget:640, availableIds:['pumpkin','costume','candy_bag','witch_hat','glow','skull','spider','ghost','treat'] },
                { budget:680, availableIds:['pumpkin','costume','ghost','treat','fangs','witch_hat','skull','spider','glow'] },
                { budget:660, availableIds:['pumpkin','costume','candy_bag','spider','skull','glow','fangs','treat','witch_hat'] },
                { budget:700, availableIds:['pumpkin','costume','witch_hat','ghost','treat','candy_bag','glow','fangs','skull'] },
                { budget:650, availableIds:['pumpkin','costume','skull','fangs','candy_bag','witch_hat','treat','ghost','spider'] },
                { budget:720, availableIds:['pumpkin','costume','spider','glow','ghost','witch_hat','candy_bag','fangs','skull'] },
            ],
        },
    },
    picnic: {
        name: '春日野餐', icon: '🌸',
        allItems: [
            { id:'sandwich', name:'三明治',    price:120, icon:'🥪', must:true  },
            { id:'blanket',  name:'野餐墊',    price:180, icon:'🧺', must:true  },
            { id:'fruit',    name:'水果盒',    price:95,  icon:'🍓', must:false },
            { id:'juice',    name:'果汁飲料',  price:60,  icon:'🧃', must:false },
            { id:'cookies',  name:'餅乾點心',  price:75,  icon:'🍪', must:false },
            { id:'sunhat',   name:'遮陽帽',    price:150, icon:'👒', must:false },
            { id:'frisbee',  name:'飛盤',      price:85,  icon:'🥏', must:false },
            { id:'bubble',   name:'泡泡水',    price:30,  icon:'🫧', must:false },
            { id:'balloon',  name:'彩色汽球',  price:50,  icon:'🎈', must:false },
            { id:'kite',     name:'風箏',      price:160, icon:'🪁', must:false },
        ],
        scenarios: {
            easy: [
                { budget:500, availableIds:['sandwich','blanket','juice','bubble','cookies'] },
                { budget:480, availableIds:['sandwich','blanket','fruit','balloon','bubble'] },
                { budget:520, availableIds:['sandwich','blanket','cookies','juice','balloon'] },
                { budget:490, availableIds:['sandwich','blanket','bubble','fruit','juice'] },
                { budget:510, availableIds:['sandwich','blanket','balloon','cookies','bubble'] },
                { budget:500, availableIds:['sandwich','blanket','juice','fruit','balloon'] },
                { budget:480, availableIds:['sandwich','blanket','cookies','bubble','fruit'] },
                { budget:520, availableIds:['sandwich','blanket','balloon','juice','bubble'] },
            ],
            normal: [
                { budget:600, availableIds:['sandwich','blanket','fruit','juice','cookies','frisbee','bubble'] },
                { budget:650, availableIds:['sandwich','blanket','frisbee','balloon','cookies','juice','fruit'] },
                { budget:620, availableIds:['sandwich','blanket','bubble','kite','juice','cookies','balloon'] },
                { budget:580, availableIds:['sandwich','blanket','fruit','frisbee','balloon','bubble','cookies'] },
                { budget:640, availableIds:['sandwich','blanket','cookies','juice','kite','bubble','fruit'] },
                { budget:610, availableIds:['sandwich','blanket','balloon','frisbee','fruit','cookies','bubble'] },
                { budget:630, availableIds:['sandwich','blanket','juice','kite','frisbee','balloon','bubble'] },
                { budget:600, availableIds:['sandwich','blanket','frisbee','fruit','cookies','bubble','balloon'] },
            ],
            hard: [
                { budget:630, availableIds:['sandwich','blanket','fruit','juice','cookies','frisbee','bubble','balloon','kite'] },
                { budget:660, availableIds:['sandwich','blanket','frisbee','balloon','cookies','juice','fruit','bubble','kite'] },
                { budget:640, availableIds:['sandwich','blanket','bubble','kite','juice','cookies','balloon','fruit','frisbee'] },
                { budget:620, availableIds:['sandwich','blanket','fruit','frisbee','balloon','bubble','cookies','juice','kite'] },
                { budget:680, availableIds:['sandwich','blanket','cookies','juice','kite','bubble','fruit','frisbee','balloon'] },
                { budget:650, availableIds:['sandwich','blanket','balloon','frisbee','fruit','cookies','bubble','kite','juice'] },
            ],
        },
    },
};

// ── Game 物件 ────────────────────────────────────────────────────
// 金額語音轉換（安全版：若 number-speech-utils.js 未載入則退回原始格式）
const toTWD = v => typeof convertToTraditionalCurrency === 'function' ? convertToTraditionalCurrency(v) : `${v}元`;

let Game;

document.addEventListener('DOMContentLoaded', () => {
    Game = {

        // ── 1. Debug ──────────────────────────────────────────
        Debug: {
            FLAGS: { all: false, init: false, speech: false, question: false, error: true },
            log(cat, ...a)  { if (this.FLAGS.all || this.FLAGS[cat]) console.log(`[B5-${cat}]`, ...a); },
            warn(cat, ...a) { if (this.FLAGS.all || this.FLAGS[cat]) console.warn(`[B5-${cat}]`, ...a); },
            error(...a)     { console.error('[B5-ERROR]', ...a); },
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
            settings: { difficulty: null, rounds: null, clickMode: 'off', partyTheme: null, customItemsEnabled: false },
            game: {
                currentRound: 0,
                totalRounds: 5,
                correctCount: 0,
                streak: 0,
                scenarios: [],
                startTime: null,
                // current round state
                selectedIds: new Set(),
                budget: 0,
                items: [],
                submitted: false,
                successfulRoundItems: [],
                roundStats: [],
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
            if (document.getElementById('b5-global-animations')) return;
            const style = document.createElement('style');
            style.id = 'b5-global-animations';
            style.textContent = `
                @keyframes b5CardSelect {
                    0%   { transform: scale(1); }
                    50%  { transform: scale(1.06); }
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
            g.streak       = 0;
            g.scenarios    = [];
            g.startTime    = null;
            g.selectedIds  = new Set();
            g.budget       = 0;
            g.items        = [];
            g.submitted    = false;
            g.successfulRoundItems = [];
            g.roundStats           = [];
            this.state.isEndingGame = false;
            this.state.isProcessing  = false;
            Game.Debug.log('init', '🔄 [B5] 遊戲狀態已重置');
        },

        // ── 8. 設定頁 ─────────────────────────────────────────
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
                        <h1>單元B5：生日派對預算</h1>
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
                        <div class="b-setting-group" id="b5-custom-items-group-wrap">
                            <div id="b5-custom-items-toggle-row" style="display:none;">
                                <label style="font-size:13px;color:#374151;font-weight:600;">🛠️ 自訂商品</label>
                                <div class="b-btn-group" id="b5-custom-items-group" style="margin-top:4px;">
                                    <button class="b-sel-btn active" data-custom="off">關閉</button>
                                    <button class="b-sel-btn" data-custom="on">開啟</button>
                                </div>
                                <div style="margin-top:4px;font-size:12px;color:#6b7280;">開啟後，可在關卡頁面新增自訂商品，計入選購總金額</div>
                            </div>
                        </div>
                        <div class="b-setting-group" id="assist-click-group" style="display:none;">
                            <label class="b-setting-label">🤖 輔助點擊：</label>
                            <div class="b-btn-group" id="assist-group">
                                <button class="b-sel-btn${this.state.settings.clickMode === 'on' ? ' active' : ''}" data-assist="on">✓ 啟用</button>
                                <button class="b-sel-btn${this.state.settings.clickMode !== 'on' ? ' active' : ''}" data-assist="off">✗ 停用</button>
                            </div>
                            <div style="margin-top:4px;font-size:12px;color:#6b7280;">
                                啟用後，只要偵測到點擊便會自動執行下一個步驟
                            </div>
                        </div>
                        <div class="b-setting-group">
                            <label class="b-setting-label">關卡數：</label>
                            <div class="b-btn-group" id="rounds-group">
                                <button class="b-sel-btn" data-val="1">1關</button>
                                <button class="b-sel-btn" data-val="3">3關</button>
                                <button class="b-sel-btn" data-val="5">5關</button>
                                <button class="b-sel-btn" data-val="8">8關</button>
                                <button class="b-sel-btn" id="b5-custom-rounds-btn">自訂選項</button>
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
                            <label class="b-setting-label">🎪 派對主題</label>
                            <div class="b-btn-group" id="theme-group">
                                <button class="b-sel-btn" data-theme="birthday">生日派對 🎂</button>
                                <button class="b-sel-btn" data-theme="halloween">萬聖節 🎃</button>
                                <button class="b-sel-btn" data-theme="picnic">春日野餐 🌸</button>
                                <button class="b-sel-btn" data-theme="random">隨機 🎲</button>
                            </div>
                            <div style="margin-top:4px;font-size:12px;color:#6b7280;">
                                每個主題有不同的必買商品和預算挑戰！
                            </div>
                        </div>
                        <div class="b-setting-group">
                            <label style="font-size:13px;color:#6b7280;text-align:left;display:block;">
                                🔒 紫色商品為必買；在預算內選購商品辦派對<br>
                                簡單：預算寬裕；困難：需要精算才不超支
                            </label>
                        </div>
                    </div>
                    <div class="game-buttons">
                        <button class="back-btn" onclick="Game.backToMenu()">返回主選單</button>
                        <button class="start-btn" id="start-btn" disabled>開始練習</button>
                    </div>
                </div>
            </div>`;
        },

        _diffDescriptions: {
            easy:   '簡單：預算寬裕，容易在預算內選購所有必要商品',
            normal: '普通：需要在預算內選擇必買和選購商品，注意總額',
            hard:   '困難：預算緊湊，需精算每筆費用才能不超出預算',
        },

        _bindSettingsEvents() {
            Game.EventManager.removeByCategory('settings');

            document.querySelectorAll('#theme-group .b-sel-btn').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#theme-group .b-sel-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.partyTheme = btn.dataset.theme;
                    this._checkCanStart();
                }, {}, 'settings');
            });

            document.querySelectorAll('#diff-group .b-sel-btn').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#diff-group .b-sel-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.difficulty = btn.dataset.val;
                    const desc = document.getElementById('diff-desc');
                    if (desc) { desc.textContent = this._diffDescriptions[btn.dataset.val]; desc.classList.add('show'); }
                    const assistGroup = document.getElementById('assist-click-group');
                    const customToggle = document.getElementById('b5-custom-items-toggle-row');
                    if (assistGroup) {
                        if (btn.dataset.val === 'easy') {
                            assistGroup.style.display = '';
                            if (customToggle) customToggle.style.display = 'none';
                            this.state.settings.customItemsEnabled = false;
                            document.querySelectorAll('#b5-custom-items-group [data-custom]').forEach(b => b.classList.toggle('active', b.dataset.custom === 'off'));
                        } else {
                            assistGroup.style.display = 'none';
                            this.state.settings.clickMode = 'off';
                            if (customToggle) customToggle.style.display = '';
                        }
                    }
                    this._checkCanStart();
                }, {}, 'settings');
            });

            document.querySelectorAll('#rounds-group .b-sel-btn:not(#b5-custom-rounds-btn)').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#rounds-group .b-sel-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.rounds = parseInt(btn.dataset.val);
                    this._checkCanStart();
                }, {}, 'settings');
            });

            // 自訂關卡數
            const b5CustomRoundsBtn = document.getElementById('b5-custom-rounds-btn');
            if (b5CustomRoundsBtn) {
                Game.EventManager.on(b5CustomRoundsBtn, 'click', () => {
                    this._showSettingsCountNumpad('關卡數', (n) => {
                        document.querySelectorAll('#rounds-group .b-sel-btn').forEach(b => b.classList.remove('active'));
                        b5CustomRoundsBtn.classList.add('active');
                        b5CustomRoundsBtn.textContent = `${n}關`;
                        this.state.settings.rounds = n;
                        this._checkCanStart();
                    });
                }, {}, 'settings');
            }

            const rewardLink = document.getElementById('settings-reward-link');
            Game.EventManager.on(rewardLink, 'click', (e) => {
                e.preventDefault();
                if (typeof RewardLauncher !== 'undefined') RewardLauncher.open();
                else window.open('../reward/index.html', 'RewardSystem', 'width=1200,height=800');
            }, {}, 'settings');

            // 作業單
            Game.EventManager.on(document.getElementById('settings-worksheet-link'), 'click', (e) => {
                e.preventDefault();
                const params = new URLSearchParams({ unit: 'b5' });
                window.open('../worksheet/index.html?' + params.toString(), 'Worksheet', 'width=900,height=700');
            }, {}, 'settings');

            document.querySelectorAll('#b5-custom-items-group [data-custom]').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#b5-custom-items-group [data-custom]').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.customItemsEnabled = btn.dataset.custom === 'on';
                }, {}, 'settings');
            });

            document.querySelectorAll('#assist-group .b-sel-btn').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#assist-group .b-sel-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.clickMode = btn.dataset.assist;
                    this._checkCanStart();
                }, {}, 'settings');
            });

            Game.EventManager.on(document.getElementById('start-btn'), 'click', () => this.startGame(), {}, 'settings');
        },

        _checkCanStart() {
            const btn = document.getElementById('start-btn');
            const s = this.state.settings;
            if (btn) btn.disabled = !s.difficulty || !s.rounds || !s.partyTheme;
        },

        _showSettingsCountNumpad(label, onConfirm) {
            document.getElementById('b-snp-overlay')?.remove();
            let val = '';
            const overlay = document.createElement('div');
            overlay.id = 'b-snp-overlay';
            overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:10200;display:flex;align-items:center;justify-content:center;';
            overlay.innerHTML = `
                <div style="background:#fff;border-radius:16px;padding:20px 24px;width:260px;box-shadow:0 8px 32px rgba(0,0,0,0.3);">
                    <div style="font-size:14px;font-weight:700;color:#374151;margin-bottom:10px;">自訂${label}</div>
                    <div id="b-snp-disp" style="font-size:2rem;font-weight:bold;text-align:center;padding:10px;background:#f3f4f6;border-radius:10px;margin-bottom:12px;">---</div>
                    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:10px;">
                        ${[1,2,3,4,5,6,7,8,9,'⌫',0,'✓'].map(k => `<button style="padding:12px;font-size:1.1rem;border:2px solid #e5e7eb;border-radius:8px;background:#f9fafb;cursor:pointer;font-weight:600;" data-snpk="${k}">${k}</button>`).join('')}
                    </div>
                    <button id="b-snp-cancel" style="width:100%;padding:8px;border:none;background:#f3f4f6;border-radius:8px;cursor:pointer;font-size:14px;color:#6b7280;">取消</button>
                </div>`;
            document.body.appendChild(overlay);
            const disp = overlay.querySelector('#b-snp-disp');
            const update = () => { disp.textContent = val || '---'; };
            overlay.querySelectorAll('[data-snpk]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const k = btn.dataset.snpk;
                    if (k === '⌫') { val = val.slice(0, -1); }
                    else if (k === '✓') {
                        const n = parseInt(val);
                        if (n >= 1 && n <= 99) { overlay.remove(); onConfirm(n); return; }
                        disp.style.color = '#ef4444';
                        setTimeout(() => { disp.style.color = ''; }, 500);
                        val = '';
                    } else {
                        const next = val + k;
                        if (parseInt(next) <= 99) val = next;
                    }
                    update();
                });
            });
            overlay.querySelector('#b-snp-cancel').addEventListener('click', () => overlay.remove());
            overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
        },

        // ── 9. 遊戲開始 ───────────────────────────────────────
        startGame() {
            Game.EventManager.removeByCategory('settings');
            Game.TimerManager.clearAll();

            const s = this.state.settings;
            const g = this.state.game;
            g.currentRound = 0;
            g.totalRounds  = s.rounds;
            g.correctCount = 0;
            g.streak       = 0;
            g.startTime    = Date.now();
            g.scenarios    = this._pickScenarios(s.rounds, s.difficulty);

            this.state.isEndingGame = false;
            this.state.isProcessing  = false;

            this.renderRound();
        },

        _pickScenarios(count, diff) {
            const themeKey = this.state.settings.partyTheme;
            // 隨機模式：每關從三個主題中各自隨機一個情境
            if (themeKey === 'random') {
                const keys = ['birthday', 'halloween', 'picnic'];
                const result = [];
                for (let i = 0; i < count; i++) {
                    const rKey = keys[Math.floor(Math.random() * keys.length)];
                    const rTheme = B5_THEMES[rKey];
                    const pool = (rTheme.scenarios[diff] || rTheme.scenarios.normal).slice().sort(() => Math.random() - 0.5);
                    result.push({ ...pool[0], _themeKey: rKey });
                }
                return result;
            }
            const theme = B5_THEMES[themeKey] || B5_THEMES.birthday;
            const pool = (theme.scenarios[diff] || theme.scenarios.normal).slice().sort(() => Math.random() - 0.5);
            const result = [];
            for (let i = 0; i < count; i++) {
                result.push(pool[i % pool.length]);
            }
            return result;
        },

        // ── 10. 關卡渲染 ──────────────────────────────────────
        renderRound() {
            Game.TimerManager.clearAll();
            Game.EventManager.removeByCategory('gameUI');
            this.state.isProcessing = false;
            AssistClick.deactivate();

            const g        = this.state.game;
            const scenario = g.scenarios[g.currentRound];
            g.budget       = scenario.budget;
            const effectiveThemeKey = scenario._themeKey || this.state.settings.partyTheme;
            const themeData = B5_THEMES[effectiveThemeKey] || B5_THEMES.birthday;
            g.items        = scenario.availableIds.map(id => themeData.allItems.find(i => i.id === id)).filter(Boolean);
            g.selectedIds  = new Set(g.items.filter(i => i.must).map(i => i.id));
            g.submitted    = false;
            g.roundErrors  = 0; // 每關重置錯誤計數（B4 autoHint pattern）
            g.customItems  = []; // 自訂商品

            const app = document.getElementById('app');
            app.innerHTML = this._renderRoundHTML();
            this._bindRoundEvents();
            this._updateTotalBar();
            this._showRoundIntroCard(g.currentRound + 1, scenario.budget, () => {
                // afterClose callback（B1 pattern）：關卡介紹語音結束後，easy 模式逐項朗讀必買商品
                if (this.state.settings.difficulty === 'easy') {
                    Game.TimerManager.setTimeout(() => this._speakMustItemsOneByOne(), 200, 'speech');
                }
            });

            if (this.state.settings.clickMode === 'on') {
                Game.TimerManager.setTimeout(() => AssistClick.activate(), 400, 'ui');
            }
        },

        _showRoundIntroCard(roundNum, budget, afterClose) {
            // B1 _showTaskModal afterClose pattern
            const existing = document.getElementById('b5-round-intro');
            if (existing) existing.remove();
            const card = document.createElement('div');
            card.id = 'b5-round-intro';
            card.className = 'b5-round-intro';
            card.innerHTML = `
                <div class="b5-ri-inner">
                    <div class="b5-ri-round">第 ${roundNum} 關</div>
                    <div class="b5-ri-icon">${(B5_THEMES[this.state.settings.partyTheme] || B5_THEMES.birthday).icon}</div>
                    <div class="b5-ri-label">本關預算</div>
                    <div class="b5-ri-budget">${budget} 元</div>
                    ${(() => {
                        const g = this.state.game;
                        const mustTotal = (g.items || []).filter(i => i.must).reduce((s, i) => s + i.price, 0);
                        const optBudget = budget - mustTotal;
                        return mustTotal > 0 ? `
                        <div class="b5-ri-alloc">
                            <span class="b5-ri-must">必買 ${mustTotal} 元</span>
                            <span class="b5-ri-sep">＋</span>
                            <span class="b5-ri-opt">選購 ${Math.max(0, optBudget)} 元</span>
                        </div>` : '';
                    })()}
                    <div class="b5-ri-hint">點任意處開始</div>
                </div>`;
            document.body.appendChild(card);
            const diff = this.state.settings.difficulty;
            const speechMap = {
                easy:   `第${roundNum}關，預算${budget}元，選一些你喜歡的東西吧！`,
                normal: `第${roundNum}關，預算${budget}元，在預算內選購商品。`,
                hard:   `第${roundNum}關，預算${budget}元，要精算才不會超支！`,
            };
            this.state.game.lastSpeechText = speechMap[diff];
            let closed = false;
            const dismiss = () => {
                if (closed) return;
                closed = true;
                if (document.body.contains(card)) {
                    card.classList.add('b5-ri-fade');
                    Game.TimerManager.setTimeout(() => {
                        if (card.parentNode) card.remove();
                        afterClose?.();
                    }, 300, 'turnTransition');
                }
            };
            // 語音結束後關閉卡片（B1 afterClose pattern）
            Game.Speech.speak(speechMap[diff], dismiss);
            card.addEventListener('click', dismiss, { once: true });
            Game.TimerManager.setTimeout(dismiss, 2200, 'turnTransition');
        },

        // ── 簡單模式：必買商品逐項朗讀（B1 _speakItemsOneByOne pattern）───
        _speakMustItemsOneByOne() {
            const g = this.state.game;
            const mustItems = g.items.filter(i => i.must);
            if (!mustItems.length) return;
            let idx = 0;
            const speakNext = () => {
                if (idx >= mustItems.length) {
                    Game.TimerManager.setTimeout(() => {
                        Game.Speech.speak(`共${mustItems.length}項必買，一起挑選吧！`);
                    }, 300, 'speech');
                    return;
                }
                const item = mustItems[idx++];
                Game.Speech.speak(`必買：${item.name}，${toTWD(item.price)}`, () => {
                    Game.TimerManager.setTimeout(speakNext, 350, 'speech');
                });
            };
            speakNext();
        },

        _renderRoundHTML() {
            const g        = this.state.game;
            const pct      = Math.round((g.currentRound / g.totalRounds) * 100);
            const diffLabel = { easy: '簡單模式', normal: '普通模式', hard: '困難模式' }[this.state.settings.difficulty] || '';

            const isHardPriceHide = this.state.settings.difficulty === 'hard';

            // 必買/選購分組（A4 商品分類 pattern，Round 42）
            const renderCard = item => `
                <div class="b5-item-card ${item.must ? 'locked' : ''}${isHardPriceHide && !item.must ? ' b5-price-hidden' : ''}" data-id="${item.id}">
                    <span class="b5-check-mark">✅</span>
                    ${item.must ? '<span class="b5-must-badge">🔒 必買</span>' : ''}
                    <span class="b5-item-icon">${item.icon}</span>
                    <span class="b5-item-name">${item.name}</span>
                    <span class="b5-item-price" data-price="${item.price}">${isHardPriceHide && !item.must ? '??? 元' : item.price + ' 元'}</span>
                </div>`;
            const mustItems   = g.items.filter(i => i.must);
            const optItems    = g.items.filter(i => !i.must);
            const mustTotal   = mustItems.reduce((s, i) => s + i.price, 0);
            const optBudget   = Math.max(0, g.budget - mustTotal);
            const mustItemsHTML = mustItems.map(renderCard).join('');
            const optItemsHTML  = optItems.map(renderCard).join('');

            return `
            <div class="b-header">
                <div class="b-header-left">
                    <span class="b-header-unit">🎂 生日派對預算</span>
                </div>
                <div class="b-header-center">${diffLabel}</div>
                <div class="b-header-right">
                    <span class="b-progress">第 ${g.currentRound + 1} 關 / 共 ${g.totalRounds} 關</span>
                    <button class="b-reward-btn" onclick="if(typeof RewardLauncher!=='undefined'){RewardLauncher.open();}else{window.open('../reward/index.html','RewardSystem','width=1200,height=800');}">🎁 獎勵</button>
                    <button class="b-back-btn" onclick="Game.showSettings()">返回設定</button>
                </div>
            </div>
            <div class="game-container">
                <div class="progress-bar-wrap">
                    <div class="progress-bar-fill" style="width:${pct}%"></div>
                </div>
                <div class="b5-round-info">第 ${g.currentRound + 1} 關 / 共 ${g.totalRounds} 關</div>

                <div class="b5-budget-banner">
                    <div class="b5-budget-label">
                        🎉 今天辦派對的預算
                        <button class="b-inline-replay" id="replay-speech-btn" title="重播語音">🔊</button>
                    </div>
                    <div class="b5-budget-amount">${g.budget} 元</div>
                </div>

                <div class="b5-total-bar ok" id="b5-total-bar">
                    <span>已選：<span class="b5-total-amount" id="b5-total-amount">0</span> 元</span>
                    <span class="b5-sel-count" id="b5-sel-count">0 件</span>
                    <span class="b5-remaining" id="b5-remaining">還剩 ${g.budget} 元</span>
                </div>
                <div class="b5-budget-meter" style="position:relative">
                    <div class="b5-budget-meter-fill ok" id="b5-budget-meter-fill" style="width:0%"></div>
                    <div class="b5-must-marker" id="b5-must-marker" title="必買"></div>
                    <span class="b5-meter-label" id="b5-meter-label">0%</span>
                </div>

                ${mustItems.length > 0 ? `
                <div class="b5-section-group">
                    <div class="b5-section-hd b5-section-hd-must">
                        <span>🔒 必買商品</span>
                        <span class="b5-section-sub">${mustTotal} 元（固定）</span>
                    </div>
                    <div class="b5-items-grid">${mustItemsHTML}</div>
                </div>` : ''}
                <div class="b5-section-group">
                    <div class="b5-section-hd b5-section-hd-opt">
                        <span>✨ 選購商品</span>
                        <span class="b5-section-sub" id="b5-opt-budget">可用 ${optBudget} 元</span>
                    </div>
                    <div class="b5-items-grid" id="b5-items-grid">${optItemsHTML}</div>
                </div>

                <div id="b5-result-area"></div>
                <div id="b5-custom-items-list"></div>
                ${this.state.settings.customItemsEnabled && this.state.settings.difficulty !== 'easy' ? this._renderCustomItemsPanel() : ''}

                <span style="display:inline-flex;align-items:center;gap:4px;">
                    <img src="../images/index/educated_money_bag_character.png" alt="" style="width:28px;height:28px;object-fit:contain;" onerror="this.style.display='none'">
                    <button class="b5-hint-btn" id="b5-hint-btn">💡 還能選什麼？</button>
                </span>
                <button class="b5-read-selected-btn" id="b5-read-selected-btn">🔊 朗讀已選</button>
                <button class="b5-confirm-btn" id="b5-confirm-btn">✅ 確認購買！</button>
            </div>`;
        },

        _renderCustomItemsPanel() {
            return `
            <div class="b5-custom-items-panel" id="b5-cip-panel">
                <div class="b5-cip-header">🛍️ 自訂商品</div>
                <div class="b5-cip-add-row">
                    <input type="text" id="b5-cip-name-input" placeholder="商品名稱" maxlength="8" class="b5-cip-input">
                    <input type="number" id="b5-cip-price-input" placeholder="金額" min="1" max="9999" class="b5-cip-input b5-cip-price-inp">
                    <button class="b5-cip-add-btn" id="b5-cip-add-btn">＋ 新增</button>
                </div>
            </div>`;
        },

        _bindCustomItemsPanel() {
            const g = this.state.game;
            const addBtn = document.getElementById('b5-cip-add-btn');
            if (!addBtn) return;
            Game.EventManager.on(addBtn, 'click', () => {
                const nameEl  = document.getElementById('b5-cip-name-input');
                const priceEl = document.getElementById('b5-cip-price-input');
                const name  = nameEl?.value.trim();
                const price = parseInt(priceEl?.value);
                if (!name || !price || price < 1) return;
                const newItem = { name, price, icon: '🛍️', _deleted: false };
                g.customItems.push(newItem);
                const ci  = g.customItems.length - 1;
                const list = document.getElementById('b5-custom-items-list');
                const card = document.createElement('div');
                card.className = 'b5-item-card b5-cip-custom-card selected';
                card.id = `b5-custom-item-${ci}`;
                card.innerHTML = `<span class="b5-check-mark">✅</span><span class="b5-item-icon">${newItem.icon}</span><span class="b5-item-name">${name}</span><span class="b5-item-price">${price} 元</span><button class="b5-cip-del-btn" data-custom-idx="${ci}">✕</button>`;
                list.appendChild(card);
                const delBtn = card.querySelector('[data-custom-idx]');
                Game.EventManager.on(delBtn, 'click', (e) => {
                    e.stopPropagation();
                    g.customItems[ci]._deleted = true;
                    card.remove();
                    this._updateTotalBar();
                }, {}, 'gameUI');
                if (nameEl) nameEl.value = '';
                if (priceEl) priceEl.value = '';
                this._updateTotalBar();
                this.audio.play('click');
            }, {}, 'gameUI');
        },

        _bindRoundEvents() {
            const g = this.state.game;

            // 商品卡片點擊
            document.querySelectorAll('.b5-item-card:not(.locked)').forEach(card => {
                Game.EventManager.on(card, 'click', () => {
                    if (g.submitted) return;
                    const id = card.dataset.id;
                    const item = g.items.find(i => i.id === id);
                    // 困難模式：首次點擊先揭示價格（翻牌動畫 Round 43）
                    if (card.classList.contains('b5-price-hidden')) {
                        card.classList.add('b5-flip-reveal');
                        Game.TimerManager.setTimeout(() => {
                            card.classList.remove('b5-price-hidden');
                            const priceEl = card.querySelector('.b5-item-price');
                            if (priceEl) priceEl.textContent = priceEl.dataset.price + ' 元';
                        }, 150, 'ui');
                        Game.TimerManager.setTimeout(() => card.classList.remove('b5-flip-reveal'), 330, 'ui');
                        if (item) Game.Speech.speak(`${item.name}，${toTWD(item.price)}`);
                        this.audio.play('click');
                        return; // 第一次只揭示，不選
                    }
                    if (g.selectedIds.has(id)) {
                        g.selectedIds.delete(id);
                        card.classList.remove('selected');
                        if (item) Game.Speech.speak(`取消${item.name}`);
                    } else {
                        g.selectedIds.add(id);
                        card.classList.add('selected');
                        if (item) {
                            Game.Speech.speak(`${item.name}，${toTWD(item.price)}`);
                            this._showItemFlyout(item, card); // B6 flyout pattern
                        }
                    }
                    this.audio.play('click');
                    this._updateTotalBar();
                }, {}, 'gameUI');
            });

            // 確認按鈕
            Game.EventManager.on(document.getElementById('b5-confirm-btn'), 'click', () => {
                if (g.submitted) return;
                this._handleConfirm();
            }, {}, 'gameUI');
            // 預算提示按鈕
            const hintBtn = document.getElementById('b5-hint-btn');
            if (hintBtn) {
                Game.EventManager.on(hintBtn, 'click', () => {
                    if (this.state.settings.difficulty === 'hard') this._showHardModeHintModal();
                    else this._showBudgetHint();
                }, {}, 'gameUI');
            }
            // 已選清單語音朗讀按鈕（Round 45）
            const readBtn = document.getElementById('b5-read-selected-btn');
            if (readBtn) {
                Game.EventManager.on(readBtn, 'click', () => {
                    const selected = g.items.filter(i => i.must || (g.selectedIds && g.selectedIds.has(i.id)));
                    if (!selected.length) { Game.Speech.speak('還沒有選任何商品'); return; }
                    const total = selected.reduce((s, i) => s + i.price, 0);
                    const parts = selected.map(i => `${i.name}${i.price}元`).join('，');
                    Game.Speech.speak(`已選：${parts}，共${total}元`);
                }, {}, 'gameUI');
            }
            // 語音重播
            const replayBtn = document.getElementById('replay-speech-btn');
            if (replayBtn) {
                Game.EventManager.on(replayBtn, 'click', () => {
                    const text = this.state.game.lastSpeechText;
                    if (text) Game.Speech.speak(text);
                }, {}, 'gameUI');
            }
            // 自訂商品面板
            if (this.state.settings.customItemsEnabled && this.state.settings.difficulty !== 'easy') {
                this._bindCustomItemsPanel();
            }
        },

        // ── 預算提示鈕（B1 _showCoinHint pattern）────────────────
        _showBudgetHint() {
            const g = this.state.game;
            if (g.submitted) return;
            const remaining = g.budget - this._getTotal();
            const affordable = g.items.filter(i =>
                !i.must && !g.selectedIds.has(i.id) && i.price <= remaining
            );
            // 高亮可選商品
            document.querySelectorAll('.b5-item-card:not(.locked):not(.selected)').forEach(card => {
                const id = card.dataset.id;
                if (affordable.some(a => a.id === id)) {
                    card.classList.add('b5-hint-glow');
                    Game.TimerManager.setTimeout(
                        () => card.classList.remove('b5-hint-glow'), 2500, 'ui'
                    );
                }
            });
            if (affordable.length === 0) {
                Game.Speech.speak(`還剩${toTWD(remaining)}，沒有可以加選的商品了`);
            } else {
                const nameWithPrice = affordable.map(i => `${i.name}${toTWD(i.price)}`).join('或');
                Game.Speech.speak(`還剩${toTWD(remaining)}，可以加選${nameWithPrice}`);
            }
        },

        // ── 困難模式提示彈窗（B3 _showHardModeHintModal pattern）────
        _showHardModeHintModal() {
            const g = this.state.game;
            const budget = g.budget;
            const mustItems = g.items.filter(i => i.must);
            const mustTotal = mustItems.reduce((s, i) => s + i.price, 0);
            const customTotal = (g.customItems || []).filter(i => !i._deleted).reduce((s, i) => s + i.price, 0);
            const remaining = budget - mustTotal - customTotal;
            const affordable = g.items.filter(i => !i.must && i.price <= remaining);
            const mustHTML = mustItems.map(i =>
                `<div class="b5-hm-row"><span class="b5-hm-icon">${i.icon}</span><span class="b5-hm-name">${i.name}</span><span class="b5-hm-price">${i.price}元</span></div>`
            ).join('');
            const optHTML = affordable.map(i =>
                `<div class="b5-hm-row b5-hm-opt"><span class="b5-hm-icon">${i.icon}</span><span class="b5-hm-name">${i.name}</span><span class="b5-hm-price">${i.price}元</span></div>`
            ).join('');
            const existing = document.getElementById('b5-hard-hint-modal');
            if (existing) existing.remove();
            const overlay = document.createElement('div');
            overlay.id = 'b5-hard-hint-modal';
            overlay.className = 'b5-hint-modal-overlay';
            overlay.innerHTML = `
                <div class="b5-hint-modal">
                    <div class="b5-hm-header">💡 預算分析</div>
                    <div class="b5-hm-budget-row"><span class="b5-hm-label">派對預算</span><span class="b5-hm-budget-val">${budget}元</span></div>
                    <div class="b5-hm-section">
                        <div class="b5-hm-sec-title">🎂 必買商品</div>
                        ${mustHTML}
                        <div class="b5-hm-row b5-hm-total"><span>必買合計</span><span>${mustTotal}元</span></div>
                    </div>
                    ${affordable.length > 0 ? `
                    <div class="b5-hm-section">
                        <div class="b5-hm-sec-title">✨ 可加選（還剩${remaining}元）</div>
                        ${optHTML}
                    </div>` : `<div class="b5-hm-empty">還剩 ${remaining} 元，已無可加選商品</div>`}
                    <button class="b5-hm-close-btn" id="b5-hm-close">✕ 關閉</button>
                </div>`;
            document.body.appendChild(overlay);
            const close = () => overlay.remove();
            Game.EventManager.on(document.getElementById('b5-hm-close'), 'click', close, {}, 'gameUI');
            Game.EventManager.on(overlay, 'click', e => { if (e.target === overlay) close(); }, {}, 'gameUI');
            const parts = affordable.map(i => `${i.name}${toTWD(i.price)}`);
            const speech = affordable.length > 0
                ? `派對預算${toTWD(budget)}，必買要${toTWD(mustTotal)}，還剩${toTWD(remaining)}，可以選${parts.join('或')}`
                : `派對預算${toTWD(budget)}，必買要${toTWD(mustTotal)}，還剩${toTWD(remaining)}，沒有可加選的商品了`;
            Game.Speech.speak(speech);
        },

        _getTotal() {
            const g = this.state.game;
            const baseTotal = g.items
                .filter(item => g.selectedIds.has(item.id))
                .reduce((sum, item) => sum + item.price, 0);
            const customTotal = (g.customItems || [])
                .filter(i => !i._deleted)
                .reduce((sum, i) => sum + i.price, 0);
            return baseTotal + customTotal;
        },

        // ── 商品選取浮動標籤（B6 flyout pattern）──────────────────
        _showItemFlyout(item, el) {
            const flyout = document.createElement('div');
            flyout.className = 'b5-item-flyout';
            flyout.innerHTML = `<span class="b5-if-icon">${item.icon}</span><span class="b5-if-name">${item.name}</span><span class="b5-if-price">+${item.price}元</span>`;
            const rect = el.getBoundingClientRect();
            flyout.style.cssText = rect.top > 60
                ? `position:fixed;top:${rect.top - 40}px;left:${Math.min(rect.left, window.innerWidth - 160)}px;z-index:600;pointer-events:none;`
                : `position:fixed;top:${rect.bottom + 6}px;left:${Math.min(rect.left, window.innerWidth - 160)}px;z-index:600;pointer-events:none;`;
            document.body.appendChild(flyout);
            Game.TimerManager.setTimeout(() => { if (flyout.parentNode) flyout.remove(); }, 1000, 'ui');
        },

        _updateTotalBar() {
            const g     = this.state.game;
            const total = this._getTotal();
            const rem   = g.budget - total;

            const bar     = document.getElementById('b5-total-bar');
            const totalEl = document.getElementById('b5-total-amount');
            const remEl   = document.getElementById('b5-remaining');
            const btn     = document.getElementById('b5-confirm-btn');

            if (totalEl) totalEl.textContent = total;
            if (remEl)   remEl.textContent = rem >= 0 ? `還剩 ${rem} 元` : `超出 ${-rem} 元`;
            // 即時選擇計數（Round 39）
            const selCountEl = document.getElementById('b5-sel-count');
            if (selCountEl) {
                const mustCount = g.items.filter(i => i.must).length;
                const optCount  = g.selectedIds ? [...g.selectedIds].filter(id => {
                    const item = g.items.find(i => i.id === id);
                    return item && !item.must;
                }).length : 0;
                selCountEl.textContent = mustCount > 0
                    ? `必買${mustCount}件${optCount > 0 ? `+選購${optCount}件` : ''}`
                    : `已選 ${g.selectedIds ? g.selectedIds.size : 0} 件`;
            }

            if (bar) {
                const wasOver = bar.classList.contains('over');
                bar.className = 'b5-total-bar';
                if (total > g.budget) {
                    bar.classList.add('over');
                    if (!wasOver) {
                        bar.classList.add('b5-shake');
                        Game.TimerManager.setTimeout(() => bar.classList.remove('b5-shake'), 600, 'ui');
                    }
                } else if (total > g.budget * 0.9) bar.classList.add('near');
                else                          bar.classList.add('ok');
            }

            // 預算儀表條（F5 量比較 pattern）
            const meter = document.getElementById('b5-budget-meter-fill');
            if (meter && g.budget > 0) {
                const pct = Math.min(Math.round(total / g.budget * 100), 100);
                meter.style.width = pct + '%';
                meter.className = 'b5-budget-meter-fill' +
                    (total > g.budget ? ' over' : total > g.budget * 0.9 ? ' near' : ' ok');
                const label = document.getElementById('b5-meter-label');
                if (label) label.textContent = `${pct}%`;
            }

            // 選購剩餘預算即時更新（Round 42）
            const mustTotal  = g.items.filter(i => i.must).reduce((s, i) => s + i.price, 0);
            const optBudgetEl = document.getElementById('b5-opt-budget');
            if (optBudgetEl) {
                const optBudget = Math.max(0, g.budget - mustTotal);
                const optSpent  = total - mustTotal;
                const optRem    = optBudget - Math.max(0, optSpent);
                optBudgetEl.textContent = optRem >= 0 ? `可用 ${optBudget} 元（剩 ${optRem}）` : `超出 ${-optRem} 元`;
                optBudgetEl.style.color = optRem < 0 ? '#dc2626' : '';
            }
            // 必買/選購分隔視覺（Round 36）
            const mustPct    = g.budget > 0 ? Math.min(100, Math.round(mustTotal / g.budget * 100)) : 0;
            const mustMarker = document.getElementById('b5-must-marker');
            if (mustMarker) {
                mustMarker.style.left = mustPct + '%';
                mustMarker.title = `必買 ${mustTotal} 元（${mustPct}%）`;
            }

            const canConfirm = total > 0 && total <= g.budget;
            if (btn) {
                btn.disabled = !canConfirm;
                btn.classList.toggle('ready', canConfirm);
            }

            // 可負擔商品高亮（Round 38）：未選的選購商品中，標示仍買得起的
            const remBudget = g.budget - total;
            document.querySelectorAll('.b5-item-card:not(.locked)').forEach(card => {
                const item = g.items.find(i => i.id === card.dataset.id);
                if (!item || item.must) return;
                const isSelected = g.selectedIds.has(item.id);
                card.classList.toggle('b5-affordable', !isSelected && item.price <= remBudget);
            });
        },

        _showCenterFeedback(icon, text = '') {
            document.querySelector('.b-center-feedback')?.remove();
            const overlay = document.createElement('div');
            overlay.className = 'b-center-feedback';
            overlay.innerHTML = `<span class="b-cf-icon">${icon}</span>${text ? `<span class="b-cf-text">${text}</span>` : ''}`;
            document.body.appendChild(overlay);
            Game.TimerManager.setTimeout(() => overlay.remove(), 1200, 'ui');
        },

        // ── 11. 確認購買 ──────────────────────────────────────
        _handleConfirm() {
            if (this.state.isProcessing) return;
            this.state.isProcessing = true;

            const g         = this.state.game;
            g.submitted     = true;
            const total     = this._getTotal();
            const mustOk    = g.items.filter(i => i.must).every(i => g.selectedIds.has(i.id));
            const budgetOk  = total <= g.budget;
            const isCorrect = mustOk && budgetOk && total > 0;

            // Disable all cards and confirm button
            document.querySelectorAll('.b5-item-card').forEach(c => c.classList.add('disabled'));
            const btn = document.getElementById('b5-confirm-btn');
            if (btn) btn.disabled = true;

            const resultArea = document.getElementById('b5-result-area');
            if (resultArea) {
                const rem = g.budget - total;
                if (isCorrect) {
                    const remPct = g.budget > 0 ? Math.round((rem / g.budget) * 100) : 0;
                    const isPerfectBudget = rem === 0;
                    const savingsBadge = rem > 0
                        ? `<div class="b5-savings-badge">💰 節省了 ${rem} 元（節省 ${remPct}%）！</div>`
                        : '';
                    const usePct = g.budget > 0 ? Math.round((total / g.budget) * 100) : 0;
                    const effInfo = isPerfectBudget ? { icon: '💯', label: '完美！剛好用完預算！', cls: 'perfect-exact' }
                        : usePct >= 95 ? { icon: '💎', label: '完美預算！', cls: 'perfect' }
                        : usePct >= 80 ? { icon: '⭐', label: '善用預算！', cls: 'good' }
                        : usePct >= 60 ? { icon: '👍', label: '不錯預算！', cls: 'ok' }
                        : { icon: '💡', label: '節省模式', cls: 'save' };
                    const effBadge = `<div class="b5-eff-badge ${effInfo.cls}">${effInfo.icon} ${effInfo.label} <span class="b5-eff-pct">${usePct}%</span></div>`;
                    resultArea.innerHTML = `
                        <div class="b5-result-banner success${isPerfectBudget ? ' perfect-budget' : ''}">
                            ${isPerfectBudget ? '🎯 完美配額！' : '🎉 太棒了！派對辦起來！'}
                            <div class="b5-result-sub">共花了 ${total} 元${isPerfectBudget ? '，剛好用完！' : `，還剩 ${rem} 元`}</div>
                        </div>
                        ${effBadge}
                        ${savingsBadge}`;
                } else if (!mustOk) {
                    resultArea.innerHTML = `
                        <div class="b5-result-banner fail">
                            😅 記得要選所有必買的商品喔！
                            <div class="b5-result-sub">必買商品：蛋糕🎂 和 飲料🧃</div>
                        </div>`;
                } else {
                    // 計算建議移除的選購商品（最貴的、移除後不超支）
                    const overBy = total - g.budget;
                    const selectedOptionals = g.items
                        .filter(i => !i.must && g.selectedIds.has(i.id))
                        .sort((a, b) => b.price - a.price);
                    const suggestion = selectedOptionals.find(i => total - i.price <= g.budget);
                    const suggestionHTML = suggestion
                        ? `<div class="b5-removal-hint">💡 試試取消勾選「${suggestion.icon} ${suggestion.name}」（${suggestion.price}元）！</div>`
                        : '';
                    // 費用明細（B1/B2 breakdown pattern）
                    const selectedItems = g.items.filter(i => g.selectedIds.has(i.id));
                    const breakdownRows = selectedItems.map(i =>
                        `<div class="b5-bd-row${i === suggestion ? ' b5-bd-over' : ''}">
                            <span>${i.icon} ${i.name}</span><span>${i.price}元</span>
                         </div>`
                    ).join('');
                    const breakdownHTML = `
                        <div class="b5-breakdown">
                            <div class="b5-bd-title">📋 費用明細</div>
                            ${breakdownRows}
                            <div class="b5-bd-sep"></div>
                            <div class="b5-bd-row b5-bd-total"><span>合計</span><span>${total}元</span></div>
                            <div class="b5-bd-row b5-bd-budget"><span>預算</span><span>${g.budget}元</span></div>
                            <div class="b5-bd-row b5-bd-over-row"><span>超出</span><span>${overBy}元（${Math.round(overBy/g.budget*100)}%）</span></div>
                        </div>`;
                    resultArea.innerHTML = `
                        <div class="b5-result-banner fail">
                            💸 超出預算了！請重新選擇
                            <div class="b5-result-sub">超出 ${overBy} 元（超出預算 ${Math.round(overBy/g.budget*100)}%）</div>
                            ${suggestionHTML}
                        </div>
                        ${breakdownHTML}`;
                    // 高亮建議移除的商品（B5 _showBudgetHint pattern）
                    if (suggestion) {
                        Game.TimerManager.setTimeout(() => {
                            const card = document.querySelector(`.b5-item-card[data-id="${suggestion.id}"]`);
                            if (card) {
                                card.classList.add('b5-hint-glow');
                                Game.TimerManager.setTimeout(
                                    () => card.classList.remove('b5-hint-glow'), 2400, 'ui'
                                );
                            }
                        }, 800, 'ui');
                    }
                }
            }

            if (isCorrect) {
                g.correctCount++;
                g.streak = (g.streak || 0) + 1;
                if (g.streak === 3 || g.streak === 5) {
                    Game.TimerManager.setTimeout(() => this._showStreakBadge(g.streak), 200, 'ui');
                }
                // 記錄各關預算使用（B6 receipts pattern）
                const mustSpent = g.items.filter(i => i.must && g.selectedIds.has(i.id)).reduce((s, i) => s + i.price, 0);
                const optSpent  = g.items.filter(i => !i.must && g.selectedIds.has(i.id)).reduce((s, i) => s + i.price, 0);
                g.roundStats.push({ roundNum: g.currentRound + 1, budget: g.budget, spent: total, mustSpent, optSpent });
                // 記錄本關選購物品（A4 交易摘要模式）
                g.items.filter(i => g.selectedIds.has(i.id)).forEach(i => {
                    if (!g.successfulRoundItems.includes(`${i.icon} ${i.name}`))
                        g.successfulRoundItems.push(`${i.icon} ${i.name}`);
                });
                this.audio.play('correct');
                const rem = g.budget - total;
                if (rem === 0) {
                    this._showCenterFeedback('💯', '完美配額！');
                    Game.Speech.speak(`完美！剛好花了${toTWD(total)}，用完全部預算！`);
                } else {
                    this._showCenterFeedback('✅', '太棒了！');
                    Game.Speech.speak(`太棒了！共花了${toTWD(total)}，還剩${toTWD(rem)}！`);
                }
            } else {
                g.streak = 0;
                g.roundErrors = (g.roundErrors || 0) + 1;
                this.audio.play('error');
                if (!mustOk) {
                    this._showCenterFeedback('❌', '必買商品未選！');
                    Game.Speech.speak('不對喔，記得要選所有必買的商品喔！');
                } else {
                    this._showCenterFeedback('❌', '超出預算！');
                    Game.Speech.speak(`不對喔，超出預算了，多了${toTWD(total - g.budget)}，請再試一次！`);
                }
                // 3次錯誤後自動觸發提示（B4 autoHint pattern）
                if (g.roundErrors >= 3) {
                    Game.TimerManager.setTimeout(() => {
                        if (this.state.settings.difficulty === 'hard') this._showHardModeHintModal();
                        else this._showBudgetHint();
                    }, 800, 'ui');
                }
            }

            // Show action button (retry on wrong, next on correct)
            Game.TimerManager.setTimeout(() => {
                const resultArea2 = document.getElementById('b5-result-area');
                if (resultArea2) {
                    if (isCorrect) {
                        const nextBtn = document.createElement('button');
                        nextBtn.className = 'b5-next-btn';
                        nextBtn.textContent = g.currentRound + 1 >= g.totalRounds ? '查看結果 →' : '下一關 →';
                        Game.EventManager.on(nextBtn, 'click', () => this.nextRound(), {}, 'gameUI');
                        resultArea2.appendChild(nextBtn);
                    } else {
                        // Retry: re-render same round
                        const retryBtn = document.createElement('button');
                        retryBtn.className = 'b5-next-btn';
                        retryBtn.textContent = '🔄 再試一次';
                        retryBtn.style.background = '#6366f1';
                        Game.EventManager.on(retryBtn, 'click', () => this.renderRound(), {}, 'gameUI');
                        resultArea2.appendChild(retryBtn);
                        // Skip button
                        const skipBtn = document.createElement('button');
                        skipBtn.className = 'b5-next-btn';
                        skipBtn.textContent = g.currentRound + 1 >= g.totalRounds ? '查看結果 →' : '下一關 →';
                        skipBtn.style.cssText = 'background:#9ca3af;margin-top:8px;';
                        Game.EventManager.on(skipBtn, 'click', () => this.nextRound(), {}, 'gameUI');
                        resultArea2.appendChild(skipBtn);
                    }
                }
            }, 1400, 'turnTransition');
        },

        // ── 12. 下一關 ────────────────────────────────────────
        nextRound() {
            this.state.game.currentRound++;
            if (this.state.game.currentRound >= this.state.game.totalRounds) {
                this.showResults();
            } else {
                this._showRoundTransition(this.state.game.currentRound + 1, () => this.renderRound());
            }
        },

        // ── 連勝徽章（B3 streak pattern）─────────────────────
        _showStreakBadge(streak) {
            const existing = document.getElementById('b5-streak-badge');
            if (existing) existing.remove();
            const badge = document.createElement('div');
            badge.id = 'b5-streak-badge';
            badge.className = 'b5-streak-badge';
            const label = streak === 3 ? '🔥 3連勝！' : '⚡ 5連勝！';
            const msg   = streak === 3 ? '繼續加油！' : '太厲害了！';
            badge.innerHTML = `<div class="b5-sb-inner"><div class="b5-sb-label">${label}</div><div class="b5-sb-msg">${msg}</div></div>`;
            document.body.appendChild(badge);
            Game.Speech.speak(streak === 3 ? '三連勝，繼續加油！' : '五連勝，太厲害了！');
            Game.TimerManager.setTimeout(() => {
                badge.classList.add('b5-sb-fade');
                Game.TimerManager.setTimeout(() => { if (badge.parentNode) badge.remove(); }, 400, 'ui');
            }, 1600, 'ui');
        },

        _showRoundTransition(roundNum, callback) {
            const existing = document.getElementById('b5-round-transition');
            if (existing) existing.remove();
            const card = document.createElement('div');
            card.id = 'b5-round-transition';
            card.className = 'b5-round-transition';
            card.innerHTML = `
                <div class="b5-rt-inner">
                    <div class="b5-rt-label">準備好了嗎？</div>
                    <div class="b5-rt-round">第 ${roundNum} 關</div>
                    <div class="b5-rt-icon">🎂</div>
                </div>`;
            document.body.appendChild(card);
            Game.Speech.speak(`第${roundNum}關`);
            Game.TimerManager.setTimeout(() => {
                card.classList.add('b5-rt-fade');
                Game.TimerManager.setTimeout(() => {
                    if (document.body.contains(card)) card.remove();
                    callback();
                }, 300, 'turnTransition');
            }, 1100, 'turnTransition');
        },

        // ── 12. 完成畫面 ──────────────────────────────────────
        showResults() {
            if (this.state.isEndingGame) return;
            this.state.isEndingGame = true;

            AssistClick.deactivate();
            Game.TimerManager.clearByCategory('turnTransition');
            Game.EventManager.removeByCategory('gameUI');

            const g        = this.state.game;
            const elapsed  = g.startTime ? (Date.now() - g.startTime) : 0;
            const mins     = Math.floor(elapsed / 60000);
            const secs     = Math.floor((elapsed % 60000) / 1000);
            const accuracy = g.totalRounds > 0
                ? Math.round((g.correctCount / g.totalRounds) * 100) : 0;

            let badge, badgeColor, medalIcon;
            if (accuracy === 100)    { badge = '完美 🥇'; badgeColor = '#f59e0b'; medalIcon = '🥇'; }
            else if (accuracy >= 90) { badge = '優異 🥇'; badgeColor = '#f59e0b'; medalIcon = '🥇'; }
            else if (accuracy >= 70) { badge = '良好 🥈'; badgeColor = '#10b981'; medalIcon = '🥈'; }
            else if (accuracy >= 50) { badge = '努力 🥉'; badgeColor = '#6366f1'; medalIcon = '🥉'; }
            else                     { badge = '練習 ⭐'; badgeColor = '#94a3b8'; medalIcon = '⭐'; }

            // 各關預算使用統計（F5 量比較 pattern）
            const roundStatsCardHTML = g.roundStats && g.roundStats.length > 0 ? (() => {
                const totalBudget = g.roundStats.reduce((s, r) => s + r.budget, 0);
                const totalSpent  = g.roundStats.reduce((s, r) => s + r.spent,  0);
                const totalSaved  = totalBudget - totalSpent;
                const avgPct = Math.round(totalSpent / totalBudget * 100);
                return `
            <div class="b5-res-budget-stats">

                <h3>📊 各關預算使用</h3>
                <div class="b5-budget-bars">
                    ${g.roundStats.map(r => {
                        const pct = Math.round(r.spent / r.budget * 100);
                        const barClass = pct > 100 ? 'over' : pct >= 90 ? 'near' : 'ok';
                        return `<div class="b5-bar-row">
                            <span class="b5-bar-label">第${r.roundNum}關</span>
                            <div class="b5-bar-track">
                                <div class="b5-bar-fill ${barClass}" style="width:${Math.min(pct,100)}%"></div>
                            </div>
                            <span class="b5-bar-val">${r.spent}/${r.budget}元</span>
                        </div>`;
                    }).join('')}
                </div>
                <div class="b5-res-total-row">
                    <span>總預算：<strong>${totalBudget}元</strong></span>
                    <span>總花費：<strong>${totalSpent}元</strong></span>
                    <span class="${totalSaved >= 0 ? 'saved' : 'over'}">節省：<strong>${totalSaved >= 0 ? '+'+totalSaved : totalSaved}元</strong></span>
                    <span>平均使用率：<strong>${avgPct}%</strong></span>
                </div>
            </div>`;
            })() : '';

            // 派對物品回顧
            const themeForResult = this.state.settings.partyTheme === 'random'
                ? { icon: '🎲', name: '隨機派對' }
                : (B5_THEMES[this.state.settings.partyTheme] || B5_THEMES.birthday);
            const partyCardHTML = g.successfulRoundItems.length > 0 ? `
            <div class="b-review-card">
                <h3>${themeForResult.icon} 本次${themeForResult.name}採購物品</h3>
                <div class="b5-party-tags">
                    ${g.successfulRoundItems.map(item =>
                        `<span class="b5-party-tag">${item}</span>`).join('')}
                </div>
            </div>` : '';

            const app = document.getElementById('app');
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
            app.style.overflow = 'auto'; app.style.height = 'auto'; app.style.minHeight = '100vh';

            // ── 第一頁：測驗回顧 ──
            app.innerHTML = `
<div class="b-review-wrapper">
    <div class="b-review-screen">
        <div class="b-review-header">
            <div class="b-review-emoji">${themeForResult.icon}</div>
            <h1 class="b-review-title">派對回顧</h1>
            <p class="b-review-subtitle">看看這次的採購記錄！</p>
        </div>
        ${roundStatsCardHTML}
        ${partyCardHTML}
        <button id="b5-view-summary-btn" class="b-review-next-btn">
            📊 查看測驗總結
        </button>
    </div>
</div>`;

            Game.TimerManager.setTimeout(() => {
                document.getElementById('success-sound')?.play();
            }, 100, 'confetti');
            Game.TimerManager.setTimeout(() => {
                Game.Speech.speak('完成了！來看看派對回顧吧！');
            }, 600, 'speech');

            Game.EventManager.on(document.getElementById('b5-view-summary-btn'), 'click', () => {
                Game.EventManager.removeByCategory('gameUI');

                // ── 第二頁：測驗總結 ──
                app.innerHTML = `
<div class="b-res-wrapper">
    <div class="b-res-screen">
        <div class="b-res-header">
            <div class="b-res-trophy">🏆</div>
            <div class="b-res-title-row">
                <img src="../images/index/educated_money_bag_character.png"
                     class="b-res-mascot" alt="金錢小助手" onerror="this.style.display='none'">
                <h1 class="b-res-title">🎉 派對規劃師 🎉</h1>
                <span class="b-res-mascot-spacer"></span>
            </div>
        </div>
        <div class="b-res-reward-wrap">
            <a href="#" id="endgame-reward-link" class="b-res-reward-link">
                🎁 開啟獎勵系統
            </a>
        </div>
        <div class="b-res-container">
            <div class="b-res-grid">
                <div class="b-res-card b-res-card-1">
                    <div class="b-res-icon">✅</div>
                    <div class="b-res-label">成功關卡</div>
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
                    <div class="b-res-ach-item">✅ 在預算內規劃購物</div>
                    <div class="b-res-ach-item">✅ 分辨必買與選購商品</div>
                    <div class="b-res-ach-item">✅ 控制花費不超出預算</div>
                </div>
            </div>

            ${roundStatsCardHTML}

            ${/* 預算效率星評（Round 31 pattern）*/ (() => {
                if (!g.roundStats || g.roundStats.length === 0) return '';
                const avgPct2 = Math.round(g.roundStats.reduce((s,r) => s + r.spent/r.budget*100, 0) / g.roundStats.length);
                const stars = avgPct2 >= 90 ? 3 : avgPct2 >= 60 ? 2 : 1;
                const starHTML = ['⭐','⭐','⭐'].map((s, i) => `<span class="b5-star${i < stars ? ' lit' : ''}">${s}</span>`).join('');
                const label = stars === 3 ? '預算大師！' : stars === 2 ? '不錯的控制！' : '繼續練習！';
                return `<div class="b5-star-rating">
                    <div class="b5-star-row">${starHTML}</div>
                    <div class="b5-star-label">${label}（平均使用率 ${avgPct2}%）</div>
                </div>`;
            })()}

            ${partyCardHTML}

            ${/* 必買vs選購比例條（Round 40）*/ (() => {
                if (!g.roundStats || g.roundStats.length === 0) return '';
                const totalMust = g.roundStats.reduce((s, r) => s + (r.mustSpent || 0), 0);
                const totalOpt  = g.roundStats.reduce((s, r) => s + (r.optSpent  || 0), 0);
                const total     = totalMust + totalOpt;
                if (total === 0) return '';
                const mustPct = Math.round(totalMust / total * 100);
                const optPct  = 100 - mustPct;
                return `<div class="b5-res-ratio">
                    <h3>🛒 必買 vs 選購比例</h3>
                    <div class="b5-ratio-bar">
                        <div class="b5-ratio-must" style="width:${mustPct}%">必買 ${mustPct}%</div>
                        <div class="b5-ratio-opt"  style="width:${optPct}%">選購 ${optPct}%</div>
                    </div>
                    <div class="b5-ratio-vals">
                        <span>必買：${totalMust}元</span>
                        <span>選購：${totalOpt}元</span>
                    </div>
                </div>`;
            })()}


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

                this._fireConfetti();
                Game.TimerManager.setTimeout(() => {
                    let msg;
                    if (accuracy === 100)    msg = '太厲害了，全部答對了！';
                    else if (accuracy >= 80) msg = `很棒喔，答對了${g.correctCount}關！`;
                    else if (accuracy >= 60) msg = '不錯喔，繼續加油！';
                    else                     msg = '要再加油喔，多練習幾次！';
                    Game.Speech.speak(msg);
                }, 300, 'speech');
            }, {}, 'gameUI');
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

    // 👆 輔助點擊模式（AssistClick）— 獨立區塊
    const AssistClick = {
        _overlay: null, _handler: null, _touchHandler: null,
        _queue: [], _enabled: false,
        _lastHighlighted: null, _observer: null,

        activate() {
            if (this._overlay) return;
            this._overlay = document.createElement('div');
            this._overlay.id = 'b5-assist-overlay';
            const tbEl = document.querySelector('.b-header');
            const tbBottom = tbEl ? Math.round(tbEl.getBoundingClientRect().bottom) : 60;
            this._overlay.style.cssText = `position:fixed;top:${tbBottom}px;left:0;right:0;bottom:0;z-index:10100;pointer-events:all;touch-action:none;background:transparent;cursor:pointer;`;
            document.body.appendChild(this._overlay);
            this._handler = (e) => { e.stopPropagation(); this._executeStep(); };
            this._touchHandler = (e) => { e.preventDefault(); e.stopPropagation(); this._executeStep(); };
            this._overlay.addEventListener('click', this._handler);
            this._overlay.addEventListener('touchend', this._touchHandler, { passive: false });
            this._enabled = true;
            this._startObserver();
            this.buildQueue();
        },

        deactivate() {
            if (this._overlay) {
                this._overlay.removeEventListener('click', this._handler);
                this._overlay.removeEventListener('touchend', this._touchHandler);
                this._overlay.remove(); this._overlay = null;
            }
            if (this._observer) { this._observer.disconnect(); this._observer = null; }
            this._clearHighlight();
            this._queue = []; this._enabled = false;
        },

        buildQueue() {
            if (!this._enabled) return;
            // Wait for intro / transition overlays to dismiss
            if (document.getElementById('b5-round-intro') || document.getElementById('b5-round-transition')) return;
            this._clearHighlight();
            this._queue = [];

            const g = Game.state.game;
            if (!g) return;

            // After submission: click retry / next button
            if (g.submitted) {
                const nextBtn = document.querySelector('.b5-next-btn');
                if (nextBtn) {
                    this._highlight(nextBtn);
                    this._queue = [{ el: nextBtn, action: () => nextBtn.click() }];
                }
                return;
            }

            // Confirm button enabled: queue click
            const confirmBtn = document.getElementById('b5-confirm-btn');
            if (confirmBtn && !confirmBtn.disabled) {
                this._highlight(confirmBtn);
                this._queue = [{ el: confirmBtn, action: () => confirmBtn.click() }];
                return;
            }

            // Find first affordable optional item not yet selected
            const total = g.items.filter(i => g.selectedIds.has(i.id)).reduce((s, i) => s + i.price, 0);
            const remaining = g.budget - total;
            const card = [...document.querySelectorAll('.b5-item-card:not(.locked):not(.selected):not(.disabled)')]
                .find(c => {
                    const item = g.items.find(i => i.id === c.dataset.id);
                    return item && item.price <= remaining;
                });
            if (card) {
                this._highlight(card);
                this._queue = [{ el: card, action: () => card.click() }];
            }
        },

        _executeStep() {
            if (!this._enabled || this._queue.length === 0) return;
            const step = this._queue.shift();
            this._clearHighlight();
            if (step?.action) step.action();
            Game.TimerManager.setTimeout(() => { if (this._enabled) this.buildQueue(); }, 150, 'ui');
        },

        _startObserver() {
            if (!this._enabled) return;
            let t = null;
            const trigger = () => {
                if (!this._enabled) return;
                if (t) window.clearTimeout(t);
                t = window.setTimeout(() => {
                    if (this._enabled && this._queue.length === 0) this.buildQueue();
                }, 400);
            };
            this._observer = new MutationObserver(trigger);
            const app = document.getElementById('app');
            if (app) this._observer.observe(app, { childList: true, subtree: true });
            this._observer.observe(document.body, { childList: true });
        },

        _highlight(el) {
            this._clearHighlight();
            if (!el) return;
            el.classList.add('assist-click-hint');
            this._lastHighlighted = el;
        },

        _clearHighlight() {
            if (this._lastHighlighted) { this._lastHighlighted.classList.remove('assist-click-hint'); this._lastHighlighted = null; }
            document.querySelectorAll('.assist-click-hint').forEach(e => e.classList.remove('assist-click-hint'));
        },
    };

    Game.init();
});
