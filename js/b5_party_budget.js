// =============================================================
// FILE: js/b5_party_budget.js — B5 生日派對預算
// =============================================================
'use strict';

// ── 所有可選商品 ─────────────────────────────────────────────
const B5_ALL_ITEMS = [
    { id: 'cake',       name: '生日蛋糕',   price: 380, icon: '🎂' },
    { id: 'drink',      name: '果汁飲料',   price: 120, icon: '🧃' },
    { id: 'balloon',    name: '彩色氣球',   price: 50,  icon: '🎈' },
    { id: 'gift',       name: '小禮物',     price: 200, icon: '🎁' },
    { id: 'plate',      name: '派對紙盤',   price: 45,  icon: '🍽️' },
    { id: 'candle',     name: '生日蠟燭',   price: 30,  icon: '🕯️' },
    { id: 'ribbon',     name: '彩帶裝飾',   price: 65,  icon: '🎊' },
    { id: 'hat',        name: '派對帽',     price: 80,  icon: '🎉' },
    { id: 'candy',      name: '糖果禮包',   price: 90,  icon: '🍬' },
    { id: 'photo',      name: '拍立得相機', price: 150, icon: '📸' },
    { id: 'popper',     name: '噴彩拉炮',   price: 55,  icon: '🎆' },
    { id: 'banner',     name: '生日橫幅',   price: 70,  icon: '🏷️' },
    { id: 'cup',        name: '派對杯組',   price: 55,  icon: '🥤' },
    { id: 'napkin',     name: '主題餐巾紙', price: 35,  icon: '🧻' },
    { id: 'speaker',    name: '藍牙喇叭',   price: 280, icon: '🔊' },
    { id: 'game',       name: '桌遊卡片',   price: 120, icon: '🃏' },
    { id: 'lights',     name: '彩色串燈',   price: 90,  icon: '💡' },
    { id: 'sticker',    name: '主題貼紙',   price: 40,  icon: '🌟' },
    { id: 'tablecloth', name: '派對桌巾',   price: 75,  icon: '🎪' },
    { id: 'wand',       name: '魔法棒',     price: 45,  icon: '🪄' },
];

const ITEMS_PER_PAGE = 5; // 舊版分頁（已棄用）

// ── 商品類別對照 ────────────────────────────────────────────────
const B5_ITEM_CATEGORIES = {
    // 生日派對
    cake:'food', drink:'food', candy:'food', plate:'food', cup:'food', napkin:'food',
    balloon:'decor', candle:'decor', ribbon:'decor', hat:'decor', banner:'decor', lights:'decor', sticker:'decor', tablecloth:'decor',
    photo:'activity', popper:'activity', gift:'activity', speaker:'activity', game:'activity', wand:'activity',
    // 萬聖節
    pumpkin:'decor', costume:'activity', candy_bag:'food',
    witch_hat:'decor', spider:'decor', skull:'decor', glow:'activity',
    ghost:'activity', treat:'food', fangs:'activity',
    // 春日野餐
    sandwich:'food', blanket:'decor', fruit:'food', juice:'food',
    cookies:'food', sunhat:'decor', frisbee:'activity', bubble:'activity', kite:'activity',
};
const B5_CATEGORY_META = {
    food:     { name: '食物飲料', icon: '🍱' },
    decor:    { name: '裝飾道具', icon: '🎊' },
    activity: { name: '遊戲活動', icon: '🎯' },
};

// ── 關卡設定（依難度，每關有預算和可用商品清單）──────────────
const B5_SCENARIOS = {
    easy: [
        // 簡單：預算寬裕，只需在預算內選購即可
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
        { budget: 700,  availableIds: ['cake','drink','cup','napkin','sticker'] },
        { budget: 650,  availableIds: ['cake','drink','wand','tablecloth','balloon'] },
        { budget: 680,  availableIds: ['cake','drink','lights','hat','candle'] },
        { budget: 720,  availableIds: ['cake','drink','sticker','ribbon','cup'] },
    ],
    normal: [
        // 普通：需思考，在預算內選購，但不能全選
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
        { budget: 720,  availableIds: ['cake','drink','cup','napkin','lights','sticker','tablecloth'] },
        { budget: 760,  availableIds: ['cake','drink','game','wand','sticker','cup','tablecloth'] },
        { budget: 750,  availableIds: ['cake','drink','lights','ribbon','hat','sticker','napkin'] },
        { budget: 740,  availableIds: ['cake','drink','tablecloth','cup','game','balloon','candle'] },
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
        { budget: 720,  availableIds: ['cake','drink','cup','napkin','lights','sticker','tablecloth','wand','game'] },
        { budget: 760,  availableIds: ['cake','drink','game','gift','lights','ribbon','tablecloth','cup','sticker'] },
        { budget: 740,  availableIds: ['cake','drink','speaker','balloon','hat','cup','sticker','napkin','wand'] },
        { budget: 730,  availableIds: ['cake','drink','photo','game','lights','tablecloth','ribbon','hat','sticker'] },
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
            { id:'pumpkin',  name:'南瓜燈',    price:150, icon:'🎃' },
            { id:'costume',  name:'萬聖節服裝', price:250, icon:'👻' },
            { id:'candy_bag',name:'糖果袋',     price:80,  icon:'🍬' },
            { id:'witch_hat',name:'巫師帽',     price:60,  icon:'🧙' },
            { id:'spider',   name:'蜘蛛網裝飾', price:45,  icon:'🕸️' },
            { id:'skull',    name:'骷髏擺件',   price:70,  icon:'💀' },
            { id:'glow',     name:'螢光棒',     price:25,  icon:'🌟' },
            { id:'ghost',    name:'鬼臉面具',   price:90,  icon:'😱' },
            { id:'treat',    name:'糖果包裝袋', price:40,  icon:'🛍️' },
            { id:'fangs',    name:'吸血鬼牙齒', price:30,  icon:'🦷' },
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
            { id:'sandwich', name:'三明治',    price:120, icon:'🥪' },
            { id:'blanket',  name:'野餐墊',    price:180, icon:'🧺' },
            { id:'fruit',    name:'水果盒',    price:95,  icon:'🍓' },
            { id:'juice',    name:'果汁飲料',  price:60,  icon:'🧃' },
            { id:'cookies',  name:'餅乾點心',  price:75,  icon:'🍪' },
            { id:'sunhat',   name:'遮陽帽',    price:150, icon:'👒' },
            { id:'frisbee',  name:'飛盤',      price:85,  icon:'🥏' },
            { id:'bubble',   name:'泡泡水',    price:30,  icon:'🫧' },
            { id:'balloon',  name:'彩色汽球',  price:50,  icon:'🎈' },
            { id:'kite',     name:'風箏',      price:160, icon:'🪁' },
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
                    <div class="settings-title-row b-settings-title-row">
                        <h1>單元B5：生日派對預算</h1>
                        <img src="../images/index/educated_money_bag_character.png" alt="金錢小助手"
                             class="settings-mascot-img" onerror="this.style.display='none'">
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
                                <a href="#" id="settings-worksheet-link" class="b-sel-btn active"
                                   style="text-decoration:none;display:inline-flex;align-items:center;justify-content:center;">
                                    產生作業單
                                </a>
                            </div>
                        </div>
                        <div class="b-setting-group">
                            <label class="b-setting-label">🎁 獎勵系統：</label>
                            <div class="b-btn-group">
                                <a href="#" id="settings-reward-link" class="b-sel-btn active"
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

            this.showWelcomeScreen();
        },

        // ── 歡迎畫面（B6 showWelcomeScreen pattern：2頁式，設定後先顯示再進遊戲）─
        showWelcomeScreen() {
            const app = document.getElementById('app');
            const g   = this.state.game;
            const s   = this.state.settings;

            // 取得第一關情境及主題資料
            const scenario        = g.scenarios[0];
            const effectiveThemeKey = scenario._themeKey || s.partyTheme;
            const themeData       = B5_THEMES[effectiveThemeKey] || B5_THEMES.birthday;
            const items = scenario.availableIds
                .map(id => themeData.allItems.find(i => i.id === id)).filter(Boolean);

            let currentPage = 1;

            const renderPage = (page) => {
                if (page === 1) {
                    // ── 第1頁：派對主題歡迎 ──────────────────────────────────
                    app.innerHTML = `
                        <style>
                            .b5-wc-container {
                                display:flex;flex-direction:column;justify-content:center;
                                align-items:center;min-height:100vh;
                                background:linear-gradient(135deg,#ede9fe 0%,#c4b5fd 100%);
                                padding:20px;
                            }
                            .b5-wc-box {
                                background:linear-gradient(135deg,#faf5ff 0%,#ede9fe 100%);
                                border:3px solid #a78bfa;border-radius:24px;
                                padding:50px 60px;text-align:center;
                                max-width:560px;width:100%;
                            }
                            .b5-wc-icon { font-size:80px;margin-bottom:16px;line-height:1; }
                            .b5-wc-title {
                                font-size:30px;font-weight:800;color:#4c1d95;
                                margin-bottom:8px;
                            }
                            .b5-wc-sub {
                                font-size:17px;color:#6d28d9;margin-bottom:24px;
                            }
                            .b5-wc-unit-img {
                                width:180px;height:180px;object-fit:contain;
                                border-radius:16px;
                            }
                            @media(max-width:480px){
                                .b5-wc-box{padding:32px 20px;}
                                .b5-wc-icon{font-size:60px;}
                                .b5-wc-title{font-size:22px;}
                                .b5-wc-unit-img{width:130px;height:130px;}
                            }
                        </style>
                        <div class="b5-wc-container">
                            <div class="b5-wc-box">
                                <div class="b5-wc-icon">${themeData.icon}</div>
                                <h1 class="b5-wc-title">今天要舉辦${themeData.name}！</h1>
                                <p class="b5-wc-sub">讓我們一起規劃派對預算吧！</p>
                                <img src="../images/index/icon-index-b5.png" alt="生日派對預算"
                                     class="b5-wc-unit-img" onerror="this.style.display='none'">
                            </div>
                        </div>`;

                    Game.Speech.speak(`今天要舉辦${themeData.name}，讓我們一起規劃派對預算吧！`, () => {
                        Game.TimerManager.setTimeout(() => { currentPage = 2; renderPage(2); }, 500, 'screenTransition');
                    });

                } else if (page === 2) {
                    // ── 第2頁：預算 + 商品預覽 + 開始按鈕 ──────────────────
                    const denomMap = {
                        easy:   [100, 50, 10, 5, 1],
                        normal: [500, 100, 50, 10, 5, 1],
                        hard:   [1000, 500, 100, 50, 10, 5, 1]
                    };
                    const denoms = denomMap[s.difficulty] || denomMap.easy;
                    const budgetCoins = [];
                    let rem = scenario.budget;
                    for (const d of denoms) { while (rem >= d) { budgetCoins.push(d); rem -= d; } }
                    const budgetIconsHtml = budgetCoins.map(d => {
                        const isBill = d >= 100;
                        const face   = Math.random() < 0.5 ? 'back' : 'front';
                        return `<img src="../images/money/${d}_yuan_${face}.png" alt="${d}元"
                            style="width:${isBill ? '72px' : '44px'};height:${isBill ? 'auto' : '44px'};
                            object-fit:contain;" onerror="this.style.display='none'">`;
                    }).join('');

                    const showItems = items.slice(0, 9);
                    const extra = items.length - showItems.length;
                    const itemIconsHtml = showItems.map(i =>
                        `<span class="b5-wc2-item-icon" title="${i.name}">${i.icon}</span>`
                    ).join('') + (extra > 0 ? `<span class="b5-wc2-item-more">+${extra}</span>` : '');

                    app.innerHTML = `
                        <style>
                            .b5-wc-container {
                                display:flex;flex-direction:column;justify-content:center;
                                align-items:center;min-height:100vh;
                                background:linear-gradient(135deg,#ede9fe 0%,#c4b5fd 100%);
                                padding:20px;
                            }
                            .b5-wc2-box {
                                background:linear-gradient(135deg,#faf5ff 0%,#ede9fe 100%);
                                border:3px solid #a78bfa;border-radius:24px;
                                padding:40px 50px;text-align:center;
                                max-width:600px;width:100%;
                            }
                            .b5-wc2-label {
                                font-size:22px;font-weight:700;color:#4c1d95;margin-bottom:6px;
                            }
                            .b5-wc2-budget {
                                font-size:44px;font-weight:800;color:#d97706;margin-bottom:16px;
                            }
                            .b5-wc2-icons {
                                display:flex;flex-wrap:wrap;justify-content:center;
                                gap:6px;margin-bottom:24px;
                            }
                            .b5-wc2-divider {
                                border:none;border-top:2px dashed #a78bfa;margin:0 0 20px;
                            }
                            .b5-wc2-stalls-label {
                                font-size:18px;font-weight:700;color:#4c1d95;margin-bottom:12px;
                            }
                            .b5-wc2-items {
                                display:flex;flex-wrap:wrap;justify-content:center;
                                gap:8px;margin-bottom:28px;
                            }
                            .b5-wc2-item-icon {
                                font-size:28px;background:rgba(255,255,255,0.7);
                                border:2px solid #c4b5fd;border-radius:12px;
                                padding:8px 10px;
                            }
                            .b5-wc2-item-more {
                                font-size:18px;font-weight:700;color:#6d28d9;
                                background:rgba(255,255,255,0.7);border:2px solid #c4b5fd;
                                border-radius:12px;padding:8px 14px;align-self:center;
                            }
                            .b5-wc2-start-btn {
                                background:linear-gradient(135deg,#7c3aed,#6d28d9);
                                color:#fff;border:none;border-radius:16px;
                                padding:14px 40px;font-size:20px;font-weight:700;
                                cursor:pointer;
                                box-shadow:0 4px 12px rgba(124,58,237,0.4);
                                transition:transform 0.15s,box-shadow 0.15s;
                            }
                            .b5-wc2-start-btn:hover {
                                transform:translateY(-2px);
                                box-shadow:0 6px 18px rgba(124,58,237,0.5);
                            }
                            @media(max-width:480px){
                                .b5-wc2-box{padding:28px 16px;}
                                .b5-wc2-budget{font-size:34px;}
                                .b5-wc2-item-icon{font-size:22px;padding:6px 8px;}
                                .b5-wc2-start-btn{font-size:17px;padding:12px 28px;}
                            }
                        </style>
                        <div class="b5-wc-container">
                            <div class="b5-wc2-box">
                                <div class="b5-wc2-label">💰 本關預算</div>
                                <div class="b5-wc2-budget">${scenario.budget} 元</div>
                                <div class="b5-wc2-icons">${budgetIconsHtml}</div>
                                <hr class="b5-wc2-divider">
                                <div class="b5-wc2-stalls-label">🎪 派對商品（共 ${items.length} 件）</div>
                                <div class="b5-wc2-items">${itemIconsHtml}</div>
                                <button class="b5-wc2-start-btn" id="b5-wc2-start-btn">開始挑選！ 🎉</button>
                            </div>
                        </div>`;

                    Game.Speech.speak(`本關預算${scenario.budget}元，從${items.length}個商品中選購，在預算內就可以！`);

                    const startBtn = document.getElementById('b5-wc2-start-btn');
                    if (startBtn) {
                        Game.EventManager.on(startBtn, 'click', () => {
                            window.speechSynthesis.cancel();
                            Game.Speech.speak('開始挑選！', () => {
                                g._skipIntroModal = true;
                                this.renderRound();
                            });
                        }, {}, 'welcome');
                    }
                }
            };

            renderPage(1);

            if (s.clickMode === 'on') {
                Game.TimerManager.setTimeout(() => AssistClick.activate(), 400, 'ui');
            }
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
            // 確保所有商品總額 > 預算（讓選擇有挑戰性）
            const itemsTotal = g.items.reduce((s, i) => s + i.price, 0);
            if (itemsTotal <= g.budget) {
                const usedIds = new Set(g.items.map(i => i.id));
                const extras = themeData.allItems.filter(i => !usedIds.has(i.id))
                    .sort((a, b) => b.price - a.price);
                for (const extra of extras) {
                    g.items.push(extra);
                    if (g.items.reduce((s, i) => s + i.price, 0) > g.budget) break;
                }
            }
            g.selectedIds    = new Set(); // 進度條從 0 開始
            g.submitted      = false;
            g.roundErrors    = 0; // 每關重置錯誤計數（B4 autoHint pattern）
            g.customItems    = []; // 自訂商品
            g.activeCategory = null; // 3欄佈局：當前類別
            g.itemRevealed   = {}; // 困難模式：已翻牌的商品
            g.p1HintMode     = false; // 提示模式旗標（B6 pattern）
            g.p1HintItems    = [];    // 提示建議商品 id 清單
            g.p1ErrorCount   = 0;    // 普通模式過預算錯誤計數（3次自動提示）

            const app = document.getElementById('app');
            app.innerHTML = this._renderRoundHTML();
            this._bindRoundEvents();
            this._updateTotalBar();
            if (g._skipIntroModal) {
                g._skipIntroModal = false;
                if (this.state.settings.difficulty === 'easy') {
                    Game.TimerManager.setTimeout(() => this._speakMustItemsOneByOne(), 200, 'speech');
                    this._b5P1ActivateHintMode();
                }
            } else {
                this._showRoundIntroCard(g.currentRound + 1, scenario.budget, () => {
                    // afterClose callback（B1 pattern）：關卡介紹語音結束後，easy 模式逐項朗讀必買商品
                    if (this.state.settings.difficulty === 'easy') {
                        Game.TimerManager.setTimeout(() => this._speakMustItemsOneByOne(), 200, 'speech');
                        this._b5P1ActivateHintMode();
                    }
                });
            }

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
            const themeIcon = (B5_THEMES[this.state.settings.partyTheme] || B5_THEMES.birthday).icon;

            // 初始化類別（取第一個可用類別）
            const cats = this._getAvailableCategories();
            if (!g.activeCategory || !cats.includes(g.activeCategory)) {
                g.activeCategory = cats[0] || null;
            }
            const activeCat = g.activeCategory;

            return `
            <div class="b-header">
                <div class="b-header-left">
                    <img src="../images/index/educated_money_bag_character.png" alt="" class="b-header-mascot" onerror="this.style.display='none'">
                    <span class="b-header-unit">${themeIcon} 生日派對預算</span>
                </div>
                <div class="b-header-center">${diffLabel}</div>
                <div class="b-header-right">
                    <span class="b-progress">第 ${g.currentRound + 1} 關 / 共 ${g.totalRounds} 關</span>
                    <button class="b-reward-btn" onclick="if(typeof RewardLauncher!=='undefined'){RewardLauncher.open();}else{window.open('../reward/index.html','RewardSystem','width=1200,height=800');}">🎁 獎勵</button>
                    <button class="b-back-btn" onclick="Game.showSettings()">返回設定</button>
                </div>
            </div>
            <div class="game-container b5-game-container">
                <!-- 任務卡（B6 b6-task-card pattern） -->
                <div class="b5-task-card">
                    <div class="b5-task-hdr">
                        <div class="b5-task-hdr-left">
                            <div class="b5-task-hdr-text">
                                <div class="b5-task-title">🎪 派對採購任務<button class="b-inline-replay" id="replay-speech-btn" title="重播語音">🔊</button></div>
                                <div class="b5-task-budget">預算：<strong>${g.budget}</strong> 元</div>
                            </div>
                        </div>
                        <div class="b5-task-hdr-right">
                            <img src="../images/index/educated_money_bag_character.png" class="b5-task-mascot" onerror="this.style.display='none'" alt="">
                            <button class="b5-p1-hint-btn" id="b5-p1-hint-btn">💡 提示</button>
                        </div>
                    </div>
                </div>
                <div class="b5-shopping-layout">
                    <div class="b5-cat-list" id="b5-cat-list">${this._renderB5CatList(cats, activeCat)}</div>
                    <div class="b5-cat-panel" id="b5-cat-panel">${this._renderB5CatPanel(activeCat)}</div>
                    <div class="b5-right-panel" id="b5-right-panel">${this._renderB5RightPanel(g)}</div>
                </div>
                <div id="b5-result-area"></div>
                <div id="b5-custom-items-list"></div>
                ${this.state.settings.customItemsEnabled && this.state.settings.difficulty !== 'easy' ? this._renderCustomItemsPanel() : ''}
            </div>`;
        },

        // ── B1-style 金錢圖示（貪婪分解面額，桌面逐枚 / 手機分組×N）────
        _renderB5MoneyIcons(amount) {
            const rf = () => Math.random() < 0.5 ? 'back' : 'front';
            const denoms = [1000, 500, 100, 50, 10, 5, 1];
            let rem = amount;
            const groups = [];
            for (const d of denoms) {
                if (rem <= 0) break;
                const count = Math.floor(rem / d);
                if (count > 0) { groups.push({ denom: d, count }); rem -= count * d; }
                if (groups.length >= 4) break;
            }
            if (groups.length === 0) return '';
            // 手機版：分組 ×N
            const mobileHTML = groups.map(grp => {
                const isBill = grp.denom >= 100;
                const w = isBill ? 34 : 24;
                const badge = grp.count > 1 ? `<span class="b5-mic-count">×${grp.count}</span>` : '';
                return `<span class="b5-mic-item">
                    <img src="../images/money/${grp.denom}_yuan_${rf()}.png" alt="${grp.denom}元"
                         style="width:${w}px;height:${isBill ? 'auto' : w + 'px'};display:block;"
                         onerror="this.style.display='none'" draggable="false">${badge}
                </span>`;
            }).join('');
            // 桌面版：逐枚（最多10枚）
            const coins = [];
            for (const grp of groups) {
                for (let i = 0; i < grp.count && coins.length < 10; i++) coins.push(grp.denom);
            }
            const desktopHTML = coins.map(d => {
                const isBill = d >= 100;
                const w = isBill ? 68 : 44;
                return `<img src="../images/money/${d}_yuan_${rf()}.png" alt="${d}元"
                     style="width:${w}px;height:${isBill ? 'auto' : w + 'px'};display:block;flex-shrink:0;border-radius:${isBill ? '4px' : '50%'}"
                     onerror="this.style.display='none'" draggable="false">`;
            }).join('');
            return `<span class="b5-mic-desktop">${desktopHTML}</span><span class="b5-mic-mobile">${mobileHTML}</span>`;
        },

        // ── 3欄佈局輔助函數 ──────────────────────────────────────

        _getAvailableCategories() {
            const g = this.state.game;
            const catSet = new Set(g.items.map(i => B5_ITEM_CATEGORIES[i.id]).filter(Boolean));
            return Object.keys(B5_CATEGORY_META).filter(c => catSet.has(c));
        },

        _renderB5CatList(cats, activeCat) {
            const g = this.state.game;
            return cats.map(cat => {
                const meta = B5_CATEGORY_META[cat];
                const catItems = g.items.filter(i => B5_ITEM_CATEGORIES[i.id] === cat);
                const selCount = catItems.filter(i => g.selectedIds.has(i.id)).length;
                const isActive = cat === activeCat;
                return `<div class="b5-cat-tab${isActive ? ' active' : ''}" data-cat="${cat}">
                    <span class="b5-cat-tab-icon">${meta.icon}</span>
                    <span class="b5-cat-tab-name">${meta.name}</span>
                    <span class="b5-cat-tab-badge">${selCount}/${catItems.length}</span>
                </div>`;
            }).join('');
        },

        _renderB5CatPanel(activeCat) {
            const meta = activeCat ? B5_CATEGORY_META[activeCat] : null;
            const title = meta ? `${meta.icon} ${meta.name}` : '請選擇類別';
            const itemsHTML = activeCat ? this._renderB5CategoryItems(activeCat)
                : '<div class="b5-cp-hint">← 從左側選擇類別</div>';
            return `
            <div class="b5-cp-header">
                <span class="b5-cp-cat-name" id="b5-cp-cat-name">${title}</span>
            </div>
            <div class="b5-items-grid" id="b5-items-grid">${itemsHTML}</div>`;
        },

        _renderB5CategoryItems(cat) {
            const g = this.state.game;
            const diff = this.state.settings.difficulty;
            const items = g.items.filter(i => B5_ITEM_CATEGORIES[i.id] === cat);
            if (!items.length) return '<div class="b5-cp-hint">此類別無商品</div>';
            return items.map(item => {
                const isSelected = g.selectedIds.has(item.id);
                const isRevealed = diff !== 'hard' || !!(g.itemRevealed && g.itemRevealed[item.id]);
                const showPrice = diff !== 'hard' || isRevealed;
                return `<div class="b5-item-card${isSelected ? ' selected' : ''}${!isRevealed && diff === 'hard' ? ' b5-price-hidden' : ''}" data-id="${item.id}">
                    <span class="b5-item-icon">${item.icon}</span>
                    <span class="b5-item-name">${item.name}</span>
                    <span class="b5-item-price" data-price="${item.price}">${showPrice ? item.price + ' 元' : '??? 元'}</span>
                    ${isSelected ? '<span class="b5-check-mark">✅</span>' : ''}
                </div>`;
            }).join('');
        },

        _renderB5RightPanel(g) {
            const total = this._getTotal();
            const rem   = g.budget - total;
            const pct   = g.budget > 0 ? Math.min(Math.round(total / g.budget * 100), 100) : 0;
            const meterCls = total > g.budget ? ' over' : total > g.budget * 0.9 ? ' near' : ' ok';
            const canConfirm = total > 0 && total <= g.budget;
            const selectedItems = g.items.filter(i => g.selectedIds.has(i.id));
            const cartHTML = selectedItems.length
                ? selectedItems.map(i =>
                    `<div class="b5-cart-item" data-id="${i.id}">
                        <span class="b5-ci-name">${i.icon} ${i.name}</span>
                        <span class="b5-ci-price">${i.price}元</span>
                        <button class="b5-ci-remove" data-id="${i.id}" title="取消">✕</button>
                    </div>`).join('')
                : '<div class="b5-cart-empty">尚未選購任何商品</div>';
            return `
            <div class="b5-rp-budget-row">
                <span class="b5-rp-label">本關預算</span>
                <span class="b5-rp-budget-val">${g.budget} 元</span>
            </div>
            <div class="b5-budget-meter">
                <div class="b5-budget-meter-fill${meterCls}" id="b5-budget-meter-fill" style="width:${pct}%"></div>
                <span class="b5-meter-label" id="b5-meter-label">${pct}%</span>
            </div>
            <div class="b5-rp-spent-row">
                <span>已選 <b id="b5-total-amount">${total}</b> 元</span>
                <span class="${rem < 0 ? 'b5-rp-over' : ''}">剩 <b id="b5-remaining-amount">${rem}</b> 元</span>
            </div>
            <div class="b5-cart-header">🛒 購物清單</div>
            <div class="b5-cart-items" id="b5-cart-items">${cartHTML}</div>
            <button class="b5-confirm-btn${canConfirm ? ' ready' : ''}" id="b5-confirm-btn" ${canConfirm ? '' : 'disabled'}>確認購買</button>`;
        },

        _switchB5Category(cat) {
            const g = this.state.game;
            g.activeCategory = cat;
            document.querySelectorAll('.b5-cat-tab').forEach(t => {
                t.classList.toggle('active', t.dataset.cat === cat);
            });
            const meta = B5_CATEGORY_META[cat];
            const nameEl = document.getElementById('b5-cp-cat-name');
            if (nameEl && meta) nameEl.textContent = `${meta.icon} ${meta.name}`;
            const grid = document.getElementById('b5-items-grid');
            if (grid) grid.innerHTML = this._renderB5CategoryItems(cat);
            this._updateTotalBar(); // refresh affordable highlights
            this.audio.play('click');
        },

        _updateCartPanel() {
            const g     = this.state.game;
            const total = this._getTotal();
            const rem   = g.budget - total;
            const pct   = g.budget > 0 ? Math.min(Math.round(total / g.budget * 100), 100) : 0;
            const meterCls = 'b5-budget-meter-fill' + (total > g.budget ? ' over' : total > g.budget * 0.9 ? ' near' : ' ok');

            const fillEl = document.getElementById('b5-budget-meter-fill');
            if (fillEl) { fillEl.style.width = pct + '%'; fillEl.className = meterCls; }
            const labelEl = document.getElementById('b5-meter-label');
            if (labelEl) labelEl.textContent = pct + '%';
            const totalEl = document.getElementById('b5-total-amount');
            if (totalEl) totalEl.textContent = total;
            const remEl = document.getElementById('b5-remaining-amount');
            if (remEl) {
                remEl.textContent = rem;
                const row = remEl.closest('.b5-rp-spent-row') || remEl.parentElement;
                const overSpan = row?.querySelector('span:last-child');
                if (overSpan) overSpan.className = rem < 0 ? 'b5-rp-over' : '';
            }

            const cartEl = document.getElementById('b5-cart-items');
            if (cartEl) {
                const sel = g.items.filter(i => g.selectedIds.has(i.id));
                cartEl.innerHTML = sel.length
                    ? sel.map(i =>
                        `<div class="b5-cart-item" data-id="${i.id}">
                            <span class="b5-ci-name">${i.icon} ${i.name}</span>
                            <span class="b5-ci-price">${i.price}元</span>
                            <button class="b5-ci-remove" data-id="${i.id}" title="取消">✕</button>
                        </div>`).join('')
                    : '<div class="b5-cart-empty">尚未選購任何商品</div>';
            }

            const canConfirm = total > 0 && total <= g.budget;
            const btn = document.getElementById('b5-confirm-btn');
            if (btn) { btn.disabled = !canConfirm; btn.classList.toggle('ready', canConfirm); }
        },

        _updateCatBadges() {
            const g    = this.state.game;
            const cats = this._getAvailableCategories();
            cats.forEach(cat => {
                const catItems = g.items.filter(i => B5_ITEM_CATEGORIES[i.id] === cat);
                const selCount = catItems.filter(i => g.selectedIds.has(i.id)).length;
                const badge = document.querySelector(`.b5-cat-tab[data-cat="${cat}"] .b5-cat-tab-badge`);
                if (badge) badge.textContent = `${selCount}/${catItems.length}`;
            });
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
                const cipMoneyHTML = this._renderB5MoneyIcons(price);
                card.innerHTML = `
                    <div class="b5-item-top">
                        <span class="b5-item-name">${newItem.icon} ${name}</span>
                        <span class="b5-check-mark">✅</span>
                        <button class="b5-cip-del-btn" data-custom-idx="${ci}">✕</button>
                    </div>
                    <div class="b5-item-bottom">
                        <div class="b5-item-money-icons">${cipMoneyHTML}</div>
                        <span class="b5-item-price">${price} 元</span>
                    </div>`;
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

            // ① 類別標籤點擊（委派於 b5-cat-list）
            const catList = document.getElementById('b5-cat-list');
            if (catList) {
                Game.EventManager.on(catList, 'click', (e) => {
                    const tab = e.target.closest('.b5-cat-tab');
                    if (!tab || tab.dataset.cat === g.activeCategory) return;
                    this._switchB5Category(tab.dataset.cat);
                }, {}, 'gameUI');
            }

            // ② 商品卡片點擊（委派於 b5-cat-panel — 切換類別後 grid 重繪，但 panel 不變）
            const catPanel = document.getElementById('b5-cat-panel');
            if (catPanel) {
                Game.EventManager.on(catPanel, 'click', (e) => {
                    if (g.submitted) return;
                    const card = e.target.closest('.b5-item-card');
                    if (!card) return;
                    const id   = card.dataset.id;
                    const item = g.items.find(i => i.id === id);
                    if (!item) return;

                    // 困難模式：首次點擊先揭示價格（翻牌動畫）
                    if (card.classList.contains('b5-price-hidden')) {
                        if (!g.itemRevealed) g.itemRevealed = {};
                        g.itemRevealed[id] = true;
                        card.classList.add('b5-flip-reveal');
                        Game.TimerManager.setTimeout(() => {
                            card.classList.remove('b5-price-hidden');
                            const priceEl = card.querySelector('.b5-item-price');
                            if (priceEl) priceEl.textContent = priceEl.dataset.price + ' 元';
                        }, 150, 'ui');
                        Game.TimerManager.setTimeout(() => card.classList.remove('b5-flip-reveal'), 330, 'ui');
                        Game.Speech.speak(`${item.name}，${toTWD(item.price)}`);
                        this.audio.play('click');
                        return;
                    }

                    const diff = this.state.settings.difficulty;

                    if (g.selectedIds.has(id)) {
                        // 簡單模式提示商品：不可取消選取
                        if (diff === 'easy' && g.p1HintMode && (g.p1HintItems || []).includes(id)) {
                            this.audio.play('error');
                            this._b5P1ShowWrongTip('提示商品不可以取消', '');
                            Game.Speech.speak('提示商品不可以取消');
                            return;
                        }
                        g.selectedIds.delete(id);
                        card.classList.remove('selected');
                        this.audio.play('click');
                        Game.Speech.speak(`取消${item.name}`);
                        this._updateTotalBar();
                        return;
                    }

                    // 檢查預算（B6 pattern：加選此商品是否超支）
                    const currentTotal = this._getTotal();
                    if (currentTotal + item.price > g.budget) {
                        this.audio.play('error');
                        const over = (currentTotal + item.price) - g.budget;
                        this._b5P1ShowWrongTip(`⚠️ 超出預算 ${over} 元！`, '請換一個便宜一點的');
                        Game.Speech.speak(`${item.name}${toTWD(item.price)}，超出預算${over}元，請換一個便宜一點的`);
                        // 普通模式：3次錯誤自動提示
                        if (diff === 'normal' && !g.p1HintMode) {
                            g.p1ErrorCount = (g.p1ErrorCount || 0) + 1;
                            if (g.p1ErrorCount >= 3) {
                                g.p1ErrorCount = 0;
                                Game.TimerManager.setTimeout(() => this._b5P1ShowHint(), 900, 'ui');
                            }
                        }
                        return;
                    }

                    // 提示模式守衛：點了非建議商品則報錯
                    if (g.p1HintMode && !(g.p1HintItems || []).includes(id)) {
                        this.audio.play('error');
                        this._b5P1ShowWrongTip('❌ 請選擇提示的商品', '看看橘色「點這裡」提示');
                        Game.Speech.speak('不對喔，請選擇提示的商品');
                        return;
                    }

                    // 加入選取
                    g.selectedIds.add(id);
                    card.classList.add('selected');
                    this.audio.play('correct');
                    Game.Speech.speak(`${item.name}，${toTWD(item.price)}`);
                    this._showItemFlyout(item, card);
                    this._updateTotalBar();

                    // 簡單模式：所有提示商品已選完 → 高亮確認按鈕
                    if (diff === 'easy' && g.p1HintMode) {
                        const allHintDone = (g.p1HintItems || []).every(hid => g.selectedIds.has(hid));
                        if (allHintDone) {
                            Game.Speech.speak('所有商品選購完成，可以確認購買了！');
                            document.getElementById('b5-confirm-btn')?.classList.add('b5-hint-here');
                        }
                    }
                }, {}, 'gameUI');
            }

            // ③ 購物清單「✕」取消（委派於 b5-right-panel）
            const rightPanel = document.getElementById('b5-right-panel');
            if (rightPanel) {
                Game.EventManager.on(rightPanel, 'click', (e) => {
                    if (g.submitted) return;
                    const removeBtn = e.target.closest('.b5-ci-remove');
                    if (!removeBtn) return;
                    e.stopPropagation();
                    const id   = removeBtn.dataset.id;
                    // 簡單模式提示商品：不可從購物清單取消
                    if (this.state.settings.difficulty === 'easy' && g.p1HintMode && (g.p1HintItems || []).includes(id)) {
                        this.audio.play('error');
                        this._b5P1ShowWrongTip('提示商品不可以取消', '');
                        Game.Speech.speak('提示商品不可以取消');
                        return;
                    }
                    const item = g.items.find(i => i.id === id);
                    g.selectedIds.delete(id);
                    if (item) Game.Speech.speak(`取消${item.name}`);
                    this.audio.play('click');
                    this._updateTotalBar();
                    // 若商品卡片當前可見，同步移除 selected 樣式
                    const card = document.querySelector(`.b5-item-card[data-id="${id}"]`);
                    if (card) card.classList.remove('selected');
                }, {}, 'gameUI');
            }

            // ④ 確認購買按鈕
            const confirmBtn = document.getElementById('b5-confirm-btn');
            if (confirmBtn) {
                Game.EventManager.on(confirmBtn, 'click', () => {
                    if (g.submitted) return;
                    this._handleConfirm();
                }, {}, 'gameUI');
            }

            // ⑤ 提示按鈕（B6 _b6P1ShowHint pattern）
            const hintBtn = document.getElementById('b5-p1-hint-btn');
            if (hintBtn) {
                Game.EventManager.on(hintBtn, 'click', () => {
                    this._b5P1ShowHint();
                }, {}, 'gameUI');
            }

            // ⑥ 語音重播
            const replayBtn = document.getElementById('replay-speech-btn');
            if (replayBtn) {
                Game.EventManager.on(replayBtn, 'click', () => {
                    const text = this.state.game.lastSpeechText;
                    if (text) Game.Speech.speak(text);
                }, {}, 'gameUI');
            }

            // ⑦ 自訂商品面板
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
                !g.selectedIds.has(i.id) && i.price <= remaining
            );
            // 高亮可選商品
            document.querySelectorAll('.b5-item-card:not(.selected)').forEach(card => {
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
            const total = this._getTotal();
            const customTotal = (g.customItems || []).filter(i => !i._deleted).reduce((s, i) => s + i.price, 0);
            const remaining = budget - total;
            const affordable = g.items.filter(i => !g.selectedIds.has(i.id) && i.price <= remaining);
            const selectedItems = g.items.filter(i => g.selectedIds.has(i.id));
            const selectedHTML = selectedItems.map(i =>
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
                    ${selectedItems.length > 0 ? `
                    <div class="b5-hm-section">
                        <div class="b5-hm-sec-title">✅ 已選商品</div>
                        ${selectedHTML}
                        <div class="b5-hm-row b5-hm-total"><span>已選合計</span><span>${total}元</span></div>
                    </div>` : ''}
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
                ? `派對預算${toTWD(budget)}，已選${toTWD(total)}，還剩${toTWD(remaining)}，可以選${parts.join('或')}`
                : `派對預算${toTWD(budget)}，已選${toTWD(total)}，還剩${toTWD(remaining)}，沒有可加選的商品了`;
            Game.Speech.speak(speech);
        },

        // ── B5 Phase 1 提示系統（B6 _b6P1ShowHint pattern）───────────
        _b5P1ShowHint() {
            const g    = this.state.game;
            const diff = this.state.settings.difficulty;
            // 重置已選商品（全模式統一，同 B6）
            g.selectedIds = new Set();
            this._switchB5Category(g.activeCategory);
            if (diff === 'hard') { this._showHardModeHintModal(); return; }
            this._b5P1ActivateHintMode();
        },

        _b5P1GenerateHintItems() {
            const g = this.state.game;
            let remaining = g.budget;
            const result = [];
            const sorted = [...g.items].sort((a, b) => a.price - b.price);
            for (const item of sorted) {
                if (item.price <= remaining) {
                    result.push(item.id);
                    remaining -= item.price;
                }
            }
            return result;
        },

        _b5P1UpdateHintHighlights() {
            const g = this.state.game;
            document.querySelectorAll('.b5-item-card').forEach(c => c.classList.remove('b5-hint-here'));
            if (!g || !g.p1HintMode) return;
            const diff = this.state.settings.difficulty;
            if (diff === 'hard') return;
            const hintIds = g.p1HintItems || [];
            const unselected = hintIds.filter(id => !g.selectedIds.has(id));
            const toHighlight = diff === 'easy' ? unselected.slice(0, 1) : unselected;
            toHighlight.forEach(id => {
                const card = document.querySelector(`.b5-item-card[data-id="${id}"]`);
                if (card) card.classList.add('b5-hint-here');
            });
        },

        _b5P1ActivateHintMode() {
            const g = this.state.game;
            g.p1HintMode = true;
            if (!g.p1HintItems || g.p1HintItems.length === 0) {
                g.p1HintItems = this._b5P1GenerateHintItems();
            }
            this._b5P1UpdateHintHighlights();
        },

        _b5P1ShowWrongTip(msg, hint) {
            const tipId = 'b5-wrong-tip';
            let tip = document.getElementById(tipId);
            if (!tip) { tip = document.createElement('div'); tip.id = tipId; document.body.appendChild(tip); }
            tip.className = 'b5-wrong-tip';
            tip.innerHTML = `<div class="b5-wt-msg">${msg}</div>${hint ? `<div class="b5-wt-hint">${hint}</div>` : ''}`;
            Game.TimerManager.clearByCategory('wrongTip');
            Game.TimerManager.setTimeout(() => { if (document.body.contains(tip)) tip.remove(); }, 2400, 'wrongTip');
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
            this._updateCartPanel();
            this._updateCatBadges();
            // 可負擔商品高亮（目前可見商品卡片）
            const g          = this.state.game;
            const total      = this._getTotal();
            const remBudget  = g.budget - total;
            document.querySelectorAll('.b5-item-card').forEach(card => {
                const item = g.items.find(i => i.id === card.dataset.id);
                if (!item) return;
                const isSelected = g.selectedIds.has(item.id);
                card.classList.toggle('b5-affordable', !isSelected && item.price <= remBudget);
            });
            this._b5P1UpdateHintHighlights();
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
            const budgetOk  = total <= g.budget;
            const isCorrect = budgetOk && total > 0;

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
                } else {
                    // 計算建議移除的選購商品（最貴的、移除後不超支）
                    const overBy = total - g.budget;
                    const selectedOptionals = g.items
                        .filter(i => g.selectedIds.has(i.id))
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
                g.roundStats.push({ roundNum: g.currentRound + 1, budget: g.budget, spent: total });
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
                this._showCenterFeedback('❌', '超出預算！');
                Game.Speech.speak(`不對喔，超出預算了，多了${toTWD(total - g.budget)}，請再試一次！`);
                // 3次錯誤後自動觸發提示（B4 autoHint pattern）
                if (g.roundErrors >= 3) {
                    Game.TimerManager.setTimeout(() => this._b5P1ShowHint(), 800, 'ui');
                }
            }

            // 正確 → Phase 2 付款；錯誤 → 重試/跳過按鈕
            Game.TimerManager.setTimeout(() => {
                const resultArea2 = document.getElementById('b5-result-area');
                if (resultArea2) {
                    if (isCorrect) {
                        // 進入 Phase 2 付款
                        const selectedItems = g.items.filter(i => g.selectedIds.has(i.id));
                        this._renderB5Phase2(selectedItems, total);
                        return;
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

        // ════════════════════════════════════════════════════════
        // ── 12. B5 Phase 2：付款操作（B6 pattern）─────────────────
        // ════════════════════════════════════════════════════════
        _renderB5Phase2(selectedItems, total) {
            Game.TimerManager.clearAll();
            Game.EventManager.removeByCategory('gameUI');
            const g = this.state.game;
            g.p2Wallet     = [];
            g.p2UidCtr     = 0;
            g.p2ErrorCount = 0;
            g.p2Total      = total;
            g.p2TrayFaces  = {};
            g.p2ShowHint   = false;
            g.p2HintSlots  = [];

            // 產生預算金幣（有限托盤，B6 pattern）
            const diff      = this.state.settings.difficulty;
            const allDenoms = diff === 'hard'   ? [1000,500,100,50,10,5,1] :
                              diff === 'normal' ? [500,100,50,10,5,1] : [100,50,10,5,1];
            const trayFaces = {};
            allDenoms.forEach(d => { trayFaces[d] = Math.random() < 0.5 ? 'back' : 'front'; });
            const budgetCoins = [];
            let rem = g.budget || 0;
            for (const d of allDenoms) { while (rem >= d) { budgetCoins.push(d); rem -= d; } }
            g.p2BudgetFaces = trayFaces;
            g.p2BudgetCoins = budgetCoins;
            g.p2TrayFaces   = trayFaces;

            const diffLabel = { easy: '簡單模式', normal: '普通模式', hard: '困難模式' }[diff] || '';
            const themeKey  = this.state.settings.partyTheme;
            const themeData = B5_THEMES[themeKey] || B5_THEMES.birthday;
            const app = document.getElementById('app');
            app.innerHTML = `
            <div class="b-header">
                <div class="b-header-left">
                    <img src="../images/index/educated_money_bag_character.png" alt="" class="b-header-mascot" onerror="this.style.display='none'">
                    <span class="b-header-unit">${themeData.icon} 生日派對預算</span>
                </div>
                <div class="b-header-center">${diffLabel}</div>
                <div class="b-header-right">
                    <span class="b-progress">第 ${g.currentRound + 1} 關 / 共 ${g.totalRounds} 關</span>
                    <button class="b-reward-btn" onclick="if(typeof RewardLauncher!=='undefined'){RewardLauncher.open();}else{window.open('../reward/index.html','RewardSystem','width=1200,height=800');}">🎁 獎勵</button>
                    <button class="b-back-btn" onclick="Game.showSettings()">返回設定</button>
                </div>
            </div>
            <div class="game-container">
                ${this._renderB5P2RefCard(selectedItems, total, themeData)}
                ${this._renderB5P2WalletArea(total)}
                ${diff !== 'easy' ? `<button class="b5-confirm-btn" id="b5-p2-confirm-btn" disabled>✅ 確認付款</button>` : ''}
                ${this._renderB5P2CoinTray()}
            </div>`;

            this._bindB5P2Events(total);
            this._b5P2SetupDragDrop();

            Game.TimerManager.setTimeout(() => {
                Game.Speech.speak(`共消費${toTWD(total)}，請拖曳正確的金錢圖示付款。`);
            }, 300, 'speech');

            if (diff === 'easy') {
                this._b5P2AutoSetGhostSlots();
                this._b5P2UpdateWalletDisplay();
            }

            if (this.state.settings.clickMode === 'on') {
                Game.TimerManager.setTimeout(() => AssistClick.activate(), 500, 'ui');
            }
        },

        _renderB5P2RefCard(selectedItems, total, themeData) {
            const itemsList = selectedItems.map(it =>
                `<div class="b5p2-ref-item"><span>${it.icon} ${it.name}</span><span class="b5p2-ref-price">${it.price}元</span></div>`
            ).join('');
            const customList = (this.state.game.customItems || [])
                .filter(i => !i._deleted)
                .map(i => `<div class="b5p2-ref-item"><span>📦 ${i.name}</span><span class="b5p2-ref-price">${i.price}元</span></div>`).join('');
            return `
            <div class="b5p2-ref-card">
                <div class="b5p2-ref-header">
                    <span class="b5p2-ref-icon">${themeData.icon}</span>
                    <span class="b5p2-ref-title">${themeData.name}</span>
                    <span class="b5-p2-hint-wrap">
                        <img src="../images/index/educated_money_bag_character.png" alt="" style="width:28px;height:28px;object-fit:contain;flex-shrink:0;" onerror="this.style.display='none'">
                        <button class="b-hint-btn" id="b5-p2-hint-btn">💡 提示</button>
                    </span>
                </div>
                <div class="b5p2-ref-items">${itemsList}${customList}</div>
                <div class="b5p2-ref-total-row">
                    <span class="b5p2-ref-total-label">合計</span>
                    <span class="b5p2-ref-total-val">${total} 元</span>
                </div>
            </div>`;
        },

        _renderB5P2WalletArea(total) {
            return `
            <div class="b5p2-wallet-area" id="b5p2-wallet-area">
                <div class="b5p2-wallet-coins-label">需要付款 <span class="b5p2-wallet-need">${total} 元</span></div>
                <div class="b5p2-wallet-header">
                    <div class="b5p2-wallet-placed-row">
                        <span class="b5p2-wallet-placed-lbl">已放</span>
                        <span class="b5p2-wallet-total-val" id="b5p2-wallet-total">0 元</span>
                        <span class="b5p2-wallet-sep">/</span>
                        <span class="b5p2-wallet-goal">${total} 元</span>
                    </div>
                </div>
                <div class="b5p2-progress-wrap">
                    <div class="b5p2-progress" id="b5p2-progress">
                        <div class="b5p2-progress-fill" id="b5p2-progress-fill"></div>
                    </div>
                </div>
                <div class="b5p2-my-money-label">💳 付款區</div>
                <div class="b5p2-wallet-coins b5p2-drop-zone" id="b5p2-wallet-coins">
                    <span class="b5p2-wallet-empty">把錢幣拖曳到這裡 👈</span>
                </div>
            </div>`;
        },

        _renderB5P2CoinTray() {
            const g = this.state.game;
            const budgetCoins = g.p2BudgetCoins || [];
            const trayFaces   = g.p2BudgetFaces  || {};
            let _trayUidCtr   = 0;
            const coinsHtml = budgetCoins.map(d => {
                const trayUid = 'tc' + (++_trayUidCtr);
                const isBill  = d >= 100;
                const face    = trayFaces[d] || 'front';
                return `
                <div class="b5p2-coin-drag" draggable="true" data-denom="${d}" data-tray-uid="${trayUid}" data-face="${face}" title="${d}元">
                    <img src="../images/money/${d}_yuan_${face}.png" alt="${d}元"
                         class="${isBill ? 'banknote-img' : 'coin-img'}" draggable="false"
                         onerror="this.style.display='none'">
                    <span class="b1-denom-label">${d}元</span>
                </div>`;
            }).join('');
            return `
            <div class="b5p2-tray">
                <div class="b5p2-tray-title"><img src="../images/common/icons_wallet.png" class="b5p2-tray-wallet-icon" onerror="this.style.display='none'"> 我的錢包</div>
                <div class="b5p2-tray-coins" id="b5p2-tray-coins">${coinsHtml}</div>
            </div>`;
        },

        _bindB5P2Events(total) {
            const g    = this.state.game;
            const diff = this.state.settings.difficulty;

            // 確認付款按鈕
            const confirmBtn = document.getElementById('b5-p2-confirm-btn');
            if (confirmBtn) {
                Game.EventManager.on(confirmBtn, 'click', () => {
                    if (this.state.isProcessing) return;
                    this.state.isProcessing = true;
                    this._b5P2HandleConfirm(total);
                }, {}, 'gameUI');
            }

            // 移除幣（委派）＋ 拖回托盤
            const walletCoinsEl = document.getElementById('b5p2-wallet-coins');
            if (walletCoinsEl) {
                Game.EventManager.on(walletCoinsEl, 'click', e => {
                    const btn = e.target.closest('.b5p2-wc-remove');
                    if (btn) { this.audio.play('click'); this._b5P2RemoveCoin(btn.dataset.uid); }
                }, {}, 'gameUI');
                Game.EventManager.on(walletCoinsEl, 'dragstart', e => {
                    const coinEl = e.target.closest('.b5p2-wc-removable');
                    if (!coinEl) return;
                    e.dataTransfer.setData('text/plain', `remove:${coinEl.dataset.uid}`);
                    coinEl.classList.add('b5p2-dragging');
                }, {}, 'gameUI');
                Game.EventManager.on(walletCoinsEl, 'dragend', e => {
                    e.target.closest('.b5p2-wc-removable')?.classList.remove('b5p2-dragging');
                }, {}, 'gameUI');
            }

            // 提示按鈕
            const hintBtn = document.getElementById('b5-p2-hint-btn');
            if (hintBtn) {
                Game.EventManager.on(hintBtn, 'click', () => {
                    this.audio.play('click');
                    if (diff === 'easy') {
                        g.p2Wallet   = [];
                        g.p2UidCtr   = 0;
                        g.p2ShowHint = true;
                        this._b5P2AutoSetGhostSlots();
                        this._b5P2UpdateWalletDisplay();
                        Game.Speech.speak('請按照提示放入正確的金錢');
                    } else {
                        this._showB5HardModeHintModal(total);
                    }
                }, {}, 'gameUI');
            }

            // 托盤接受從錢包拖回的幣
            const tray = document.getElementById('b5p2-tray-coins');
            if (tray) {
                Game.EventManager.on(tray, 'dragover', e => e.preventDefault(), {}, 'gameUI');
                Game.EventManager.on(tray, 'drop', e => {
                    e.preventDefault();
                    const data = e.dataTransfer.getData('text/plain');
                    if (data.startsWith('remove:')) this._b5P2RemoveCoin(data.replace('remove:', ''));
                }, {}, 'gameUI');
            }
        },

        _b5P2SetupDragDrop() {
            const walletCoins = document.getElementById('b5p2-wallet-coins');
            if (!walletCoins) return;

            // Desktop：拖曳盤 → 錢包
            document.querySelectorAll('.b5p2-coin-drag').forEach(dragEl => {
                const denom   = parseInt(dragEl.dataset.denom);
                const trayUid = dragEl.dataset.trayUid;
                const face    = dragEl.dataset.face;
                Game.EventManager.on(dragEl, 'dragstart', e => {
                    if (dragEl.dataset.inUse === 'true') { e.preventDefault(); return; }
                    e.dataTransfer.setData('text/plain', `tray:${trayUid}:${denom}:${face}`);
                    e.dataTransfer.effectAllowed = 'move';
                    dragEl.classList.add('b5p2-dragging');
                }, {}, 'gameUI');
                Game.EventManager.on(dragEl, 'dragend', () => dragEl.classList.remove('b5p2-dragging'), {}, 'gameUI');
            });

            Game.EventManager.on(walletCoins, 'dragover', e => {
                e.preventDefault();
                walletCoins.classList.add('b5p2-drop-active');
            }, {}, 'gameUI');
            Game.EventManager.on(walletCoins, 'dragleave', e => {
                if (!walletCoins.contains(e.relatedTarget)) walletCoins.classList.remove('b5p2-drop-active');
            }, {}, 'gameUI');
            Game.EventManager.on(walletCoins, 'drop', e => {
                e.preventDefault();
                walletCoins.classList.remove('b5p2-drop-active');
                const data = e.dataTransfer.getData('text/plain');
                if (data.startsWith('remove:')) {
                    this._b5P2RemoveCoin(data.replace('remove:', ''));
                } else if (data.startsWith('tray:')) {
                    const parts = data.split(':');
                    const tUid = parts[1], d = parseInt(parts[2]), f = parts[3];
                    const tEl = document.querySelector(`.b5p2-coin-drag[data-tray-uid="${tUid}"]`);
                    if (tEl) { tEl.dataset.inUse = 'true'; tEl.style.display = 'none'; }
                    this._b5P2AddCoin(d, { face: f, trayUid: tUid });
                }
            }, {}, 'gameUI');

            // Touch drag：拖曳盤 → 錢包
            document.querySelectorAll('.b5p2-coin-drag').forEach(dragEl => {
                const denom   = parseInt(dragEl.dataset.denom);
                const trayUid = dragEl.dataset.trayUid;
                const face    = dragEl.dataset.face;
                let ghostEl = null;
                Game.EventManager.on(dragEl, 'touchstart', e => {
                    if (dragEl.dataset.inUse === 'true') return;
                    const t = e.touches[0];
                    ghostEl = dragEl.cloneNode(true);
                    ghostEl.style.cssText = `position:fixed;z-index:9999;pointer-events:none;opacity:0.8;transform:scale(1.05);left:${t.clientX - 30}px;top:${t.clientY - 40}px;`;
                    document.body.appendChild(ghostEl);
                }, { passive: true }, 'gameUI');
                Game.EventManager.on(dragEl, 'touchmove', e => {
                    e.preventDefault();
                    const t = e.touches[0];
                    if (ghostEl) { ghostEl.style.left = (t.clientX - 30) + 'px'; ghostEl.style.top = (t.clientY - 40) + 'px'; }
                    const wc = document.getElementById('b5p2-wallet-coins');
                    if (wc) {
                        const r = wc.getBoundingClientRect();
                        wc.classList.toggle('b5p2-drop-active',
                            t.clientX >= r.left && t.clientX <= r.right &&
                            t.clientY >= r.top  && t.clientY <= r.bottom);
                    }
                }, { passive: false }, 'gameUI');
                Game.EventManager.on(dragEl, 'touchend', e => {
                    if (ghostEl) { ghostEl.remove(); ghostEl = null; }
                    const t = e.changedTouches[0];
                    const wc = document.getElementById('b5p2-wallet-coins');
                    if (wc) {
                        const r = wc.getBoundingClientRect();
                        wc.classList.remove('b5p2-drop-active');
                        if (t.clientX >= r.left && t.clientX <= r.right && t.clientY >= r.top && t.clientY <= r.bottom) {
                            dragEl.dataset.inUse = 'true';
                            dragEl.style.display = 'none';
                            this._b5P2AddCoin(denom, { face, trayUid });
                        }
                    }
                }, { passive: true }, 'gameUI');
            });

            // Touch drag：錢包 → 拖回托盤（普通/困難模式的 .b5p2-wc-removable）
            const trayEl = document.getElementById('b5p2-tray-coins');
            Game.EventManager.on(walletCoins, 'touchstart', e => {
                const coin = e.target.closest('.b5p2-wc-removable');
                if (!coin) return;
                coin._touchDragUid = coin.dataset.uid;
                const t = e.touches[0];
                const ghost = coin.cloneNode(true);
                ghost.id = 'b5p2-wallet-touch-ghost';
                ghost.style.cssText = `position:fixed;z-index:9999;pointer-events:none;opacity:0.75;left:${t.clientX - 30}px;top:${t.clientY - 40}px;`;
                document.body.appendChild(ghost);
            }, { passive: true }, 'gameUI');
            Game.EventManager.on(walletCoins, 'touchmove', e => {
                const ghost = document.getElementById('b5p2-wallet-touch-ghost');
                if (!ghost) return;
                e.preventDefault();
                const t = e.touches[0];
                ghost.style.left = (t.clientX - 30) + 'px';
                ghost.style.top  = (t.clientY - 40) + 'px';
                if (trayEl) {
                    const r = trayEl.getBoundingClientRect();
                    trayEl.classList.toggle('b5p2-drop-active', t.clientX >= r.left && t.clientX <= r.right && t.clientY >= r.top && t.clientY <= r.bottom);
                }
            }, { passive: false }, 'gameUI');
            Game.EventManager.on(walletCoins, 'touchend', e => {
                const ghost = document.getElementById('b5p2-wallet-touch-ghost');
                if (!ghost) return;
                const t = e.changedTouches[0];
                ghost.remove();
                if (trayEl) {
                    const r = trayEl.getBoundingClientRect();
                    trayEl.classList.remove('b5p2-drop-active');
                    if (t.clientX >= r.left && t.clientX <= r.right && t.clientY >= r.top && t.clientY <= r.bottom) {
                        const coin = e.target.closest('.b5p2-wc-removable') || walletCoins.querySelector('[data-uid="' + (walletCoins._touchDragUid || '') + '"]');
                        const uid = coin?._touchDragUid || coin?.dataset?.uid;
                        if (uid) { this.audio.play('click'); this._b5P2RemoveCoin(uid); }
                    }
                }
            }, { passive: true }, 'gameUI');
        },

        _b5P2AddCoin(denom, opts = {}) {
            const g    = this.state.game;
            const diff = this.state.settings.difficulty;
            const face    = opts.face    || g.p2TrayFaces?.[denom] || 'front';
            const trayUid = opts.trayUid || null;
            if (g.p2ShowHint && g.p2HintSlots?.length) {
                const slotIdx = g.p2HintSlots.findIndex(s => s.denom === denom && !s.filled);
                if (slotIdx === -1) { this.audio.play('error'); return; }
                g.p2HintSlots[slotIdx].filled = true;
                this.audio.play('coin');
                const uid = ++g.p2UidCtr;
                g.p2Wallet.push({ denom, uid, isBill: denom >= 100, face, trayUid });
                const slotEl = document.querySelector(`[data-b5p2-hint-idx="${slotIdx}"]`);
                if (slotEl) slotEl.classList.remove('b5p2-ghost-slot');
                this._b5P2UpdateStatusOnly();
            } else {
                this.audio.play('coin');
                const uid = ++g.p2UidCtr;
                g.p2Wallet.push({ denom, uid, isBill: denom >= 100, face, trayUid });
                const coinsEl = document.getElementById('b5p2-wallet-coins');
                if (coinsEl) {
                    coinsEl.querySelector('.b5p2-wallet-empty')?.remove();
                    const canRemove = diff !== 'easy';
                    const isBill = denom >= 100;
                    const w = isBill ? 100 : 60;
                    const div = document.createElement('div');
                    div.className = 'b5p2-wallet-coin b5p2-coin-new' + (canRemove ? ' b5p2-wc-removable' : '');
                    if (canRemove) { div.setAttribute('draggable', 'true'); div.dataset.uid = String(uid); }
                    div.innerHTML = `<img src="../images/money/${denom}_yuan_${face}.png" alt="${denom}元"
                         style="width:${w}px;height:${isBill ? 'auto' : w + 'px'};display:block;"
                         onerror="this.style.display='none'" draggable="false">
                    ${canRemove ? `<button class="b5p2-wc-remove" data-uid="${uid}" title="移除">✕</button>` : ''}`;
                    coinsEl.appendChild(div);
                }
                this._b5P2UpdateStatusOnly();
            }
            // 簡單/普通模式：播累加金額，播完後再執行下一個動作
            if (diff !== 'hard') {
                const walletNow = this._b5P2GetWalletTotal();
                const req = g.p2Total;
                const allFilled = g.p2ShowHint && g.p2HintSlots?.length && g.p2HintSlots.every(s => s.filled);
                const nowEnough = walletNow >= req;
                Game.TimerManager.setTimeout(() => {
                    Game.Speech.speak(toTWD(walletNow), () => {
                        if (diff === 'easy' && allFilled) {
                            Game.TimerManager.setTimeout(() => this._b5P2HandleConfirm(g.p2Total), 300, 'ui');
                        } else if (diff === 'normal' && nowEnough) {
                            const msg = walletNow === req ? '剛好！可以確認付款了！' : '金額足夠，可以確認付款了！';
                            Game.TimerManager.setTimeout(() => Game.Speech.speak(msg), 100, 'ui');
                        }
                    });
                }, 80, 'ui');
            }
        },

        _b5P2RemoveCoin(uid) {
            const g = this.state.game;
            const coinIdx = g.p2Wallet.findIndex(c => String(c.uid) === String(uid));
            const coin = coinIdx !== -1 ? g.p2Wallet[coinIdx] : null;
            // 恢復托盤元素顯示
            if (coin?.trayUid) {
                const tEl = document.querySelector(`.b5p2-coin-drag[data-tray-uid="${coin.trayUid}"]`);
                if (tEl) { delete tEl.dataset.inUse; tEl.style.display = ''; }
            }
            if (g.p2ShowHint && g.p2HintSlots?.length) {
                if (coinIdx !== -1) {
                    let filledSoFar = 0;
                    for (let i = 0; i < g.p2HintSlots.length; i++) {
                        if (g.p2HintSlots[i].filled && g.p2HintSlots[i].denom === coin.denom && filledSoFar === coinIdx) {
                            g.p2HintSlots[i].filled = false; break;
                        }
                        if (g.p2HintSlots[i].filled) filledSoFar++;
                    }
                    g.p2Wallet.splice(coinIdx, 1);
                }
                this._b5P2UpdateWalletDisplay();
            } else {
                g.p2Wallet = g.p2Wallet.filter(c => String(c.uid) !== String(uid));
                document.querySelector(`.b5p2-wc-removable[data-uid="${uid}"]`)?.remove();
                const coinsEl = document.getElementById('b5p2-wallet-coins');
                if (coinsEl && g.p2Wallet.length === 0)
                    coinsEl.innerHTML = '<span class="b5p2-wallet-empty">把錢幣拖曳到這裡 👈</span>';
                this._b5P2UpdateStatusOnly();
            }
        },

        _b5P2GetWalletTotal() {
            return this.state.game.p2Wallet.reduce((s, c) => s + c.denom, 0);
        },

        // 只更新數字/進度條/確認按鈕，不重繪幣元素（避免全區閃爍）
        _b5P2UpdateStatusOnly() {
            const g      = this.state.game;
            const total  = this._b5P2GetWalletTotal();
            const req    = g.p2Total;
            const enough = total >= req;

            const totalEl = document.getElementById('b5p2-wallet-total');
            if (totalEl) {
                totalEl.textContent = total + ' 元';
                totalEl.className = 'b5p2-wallet-total-val' + (enough ? ' enough' : total > 0 ? ' not-enough' : '');
            }
            const fillEl = document.getElementById('b5p2-progress-fill');
            if (fillEl && req > 0) {
                const pct = Math.min(Math.round(total / req * 100), 100);
                fillEl.style.width = pct + '%';
                fillEl.className = 'b5p2-progress-fill' + (enough ? ' full' : pct >= 70 ? ' near' : '');
            }
            const confirmBtn = document.getElementById('b5-p2-confirm-btn');
            if (confirmBtn) {
                confirmBtn.disabled = !enough;
                confirmBtn.classList.toggle('ready', enough);
            }
        },

        _b5P2UpdateWalletDisplay() {
            const g      = this.state.game;
            const total  = this._b5P2GetWalletTotal();
            const req    = g.p2Total;
            const enough = total >= req;
            const diff   = this.state.settings.difficulty;

            const totalEl = document.getElementById('b5p2-wallet-total');
            if (totalEl) {
                totalEl.textContent = total + ' 元';
                totalEl.className = 'b5p2-wallet-total-val' + (enough ? ' enough' : total > 0 ? ' not-enough' : '');
            }
            const fillEl = document.getElementById('b5p2-progress-fill');
            if (fillEl && req > 0) {
                const pct = Math.min(Math.round(total / req * 100), 100);
                fillEl.style.width = pct + '%';
                fillEl.className = 'b5p2-progress-fill' + (enough ? ' full' : pct >= 70 ? ' near' : '');
            }
            const confirmBtn = document.getElementById('b5-p2-confirm-btn');
            if (confirmBtn) {
                confirmBtn.disabled = !enough;
                confirmBtn.classList.toggle('ready', enough);
            }
            const coinsEl = document.getElementById('b5p2-wallet-coins');
            if (!coinsEl) return;
            if (g.p2ShowHint && g.p2HintSlots?.length) {
                coinsEl.innerHTML = g.p2HintSlots.map((slot, idx) => {
                    if (!slot.filled) {
                        const isBill = slot.denom >= 100;
                        const w = isBill ? 100 : 60;
                        const face = slot.face || 'front';
                        return `<div class="b5p2-wallet-coin b5p2-ghost-slot" data-b5p2-hint-idx="${idx}">
                            <img src="../images/money/${slot.denom}_yuan_${face}.png" alt="${slot.denom}元"
                                 style="width:${w}px;height:${isBill ? 'auto' : w + 'px'};display:block;"
                                 onerror="this.style.display='none'" draggable="false"></div>`;
                    }
                    let filledCount = 0;
                    let coin = null;
                    for (let i = 0; i <= idx; i++) {
                        if (g.p2HintSlots[i].filled) {
                            if (i === idx) { coin = g.p2Wallet[filledCount]; break; }
                            filledCount++;
                        }
                    }
                    if (!coin) return '';
                    const isBill = coin.denom >= 100;
                    const w = isBill ? 100 : 60;
                    return `<div class="b5p2-wallet-coin" data-b5p2-hint-idx="${idx}">
                        <img src="../images/money/${coin.denom}_yuan_${coin.face}.png" alt="${coin.denom}元"
                             style="width:${w}px;height:${isBill ? 'auto' : w + 'px'};display:block;"
                             onerror="this.style.display='none'" draggable="false"></div>`;
                }).join('');
            } else if (g.p2Wallet.length === 0) {
                coinsEl.innerHTML = '<span class="b5p2-wallet-empty">把錢幣拖曳到這裡 👈</span>';
            } else {
                const canRemove = diff !== 'easy';
                coinsEl.innerHTML = g.p2Wallet.map(coin => {
                    const isBill = coin.denom >= 100;
                    const w = isBill ? 100 : 60;
                    const cls = 'b5p2-wallet-coin' + (canRemove ? ' b5p2-wc-removable' : '');
                    const extra = canRemove ? `draggable="true" data-uid="${coin.uid}"` : '';
                    const removeBtn = canRemove ? `<button class="b5p2-wc-remove" data-uid="${coin.uid}" title="移除">✕</button>` : '';
                    return `<div class="${cls}" ${extra}>
                        <img src="../images/money/${coin.denom}_yuan_${coin.face}.png" alt="${coin.denom}元"
                             style="width:${w}px;height:${isBill ? 'auto' : w + 'px'};display:block;"
                             onerror="this.style.display='none'" draggable="false">
                        ${removeBtn}</div>`;
                }).join('');
            }
        },

        _b5P2AutoSetGhostSlots() {
            const g     = this.state.game;
            const total = g.p2Total;

            // 取得托盤中實際可用的金幣（未被拖走的）
            const available = [];
            document.querySelectorAll('.b5p2-coin-drag').forEach(el => {
                if (el.dataset.inUse !== 'true' && el.style.display !== 'none') {
                    available.push({ denom: parseInt(el.dataset.denom), face: el.dataset.face || 'front' });
                }
            });

            const optimal = this._b5P2FindOptimalPayment(available, total);
            g.p2HintSlots = optimal.map(c => ({ denom: c.denom, filled: false, face: c.face }));
            g.p2ShowHint  = true;
        },

        // ── 最小超額子集搜尋（B6 pattern）───────────────────────
        _b5P2FindOptimalPayment(coins, total) {
            const n = coins.length;
            if (n === 0) return [];
            if (n > 22) {
                return coins.slice().sort((a,b) => b.denom - a.denom).reduce((acc, c) => {
                    const s = acc.reduce((t,x)=>t+x.denom,0);
                    if (s < total) acc.push(c);
                    return acc;
                }, []);
            }
            let bestMask = -1, bestSum = Infinity;
            for (let mask = 1; mask < (1 << n); mask++) {
                let sum = 0;
                for (let i = 0; i < n; i++) { if (mask & (1 << i)) sum += coins[i].denom; }
                if (sum >= total && sum < bestSum) { bestSum = sum; bestMask = mask; }
            }
            if (bestMask === -1) return coins;
            const result = [];
            for (let i = 0; i < n; i++) { if (bestMask & (1 << i)) result.push(coins[i]); }
            return result.sort((a, b) => b.denom - a.denom);
        },

        _b5P2HandleConfirm(total) {
            const g      = this.state.game;
            const wTotal = this._b5P2GetWalletTotal();
            if (wTotal < total) {
                this.state.isProcessing = false;
                this.audio.play('error');
                g.p2ErrorCount = (g.p2ErrorCount || 0) + 1;
                this._showCenterFeedback('❌', '付太少了！');
                Game.Speech.speak(`付太少了，還差${toTWD(total - wTotal)}，請再拖入金錢`);
                const walletArea = document.getElementById('b5p2-wallet-area');
                if (walletArea) {
                    walletArea.style.animation = 'b5p2Shake 0.4s ease';
                    Game.TimerManager.setTimeout(() => { walletArea.style.animation = ''; }, 500, 'ui');
                }
                // 普通模式：3次付款錯誤自動提示
                if (this.state.settings.difficulty === 'normal' && g.p2ErrorCount >= 3) {
                    g.p2ErrorCount = 0;
                    Game.TimerManager.setTimeout(() => this._showB5HardModeHintModal(total), 900, 'ui');
                }
                return;
            }
            // 付款成功
            const change = wTotal - total;
            this.audio.play('correct');
            this._showCenterFeedback('💯', '付款成功！');
            g.paidAmount = wTotal;
            if (change === 0) {
                Game.Speech.speak(`剛好${toTWD(wTotal)}，精準付款！`, () => {
                    Game.TimerManager.setTimeout(() => {
                        this.state.isProcessing = false;
                        this._b5P2ShowResult(wTotal, 0);
                    }, 400, 'turnTransition');
                });
            } else {
                Game.Speech.speak(`付了${toTWD(wTotal)}`, () => {
                    Game.TimerManager.setTimeout(() => {
                        this.state.isProcessing = false;
                        this._b5P2ShowChangeReturn(wTotal, total, change);
                    }, 400, 'turnTransition');
                });
            }
        },

        // ── 找零拖回階段（B6 重設計 pattern）────────────────────────────
        _b5P2ShowChangeReturn(paid, total, change) {
            const g    = this.state.game;
            const diff = this.state.settings.difficulty;
            Game.TimerManager.clearAll();
            Game.EventManager.removeByCategory('gameUI');

            document.querySelector('.b-center-feedback')?.remove();

            // 重置狀態
            g.changeErrorCount = 0;
            g.changePlaced     = [];
            g.changeGhostMode  = false;
            g.changeHintSlots  = [];
            g.changeTotal      = change;

            // 面額托盤：依找零金額決定
            let trayDenoms;
            if (change <= 100)      { trayDenoms = [50, 10, 5, 1]; }
            else if (change < 1000) { trayDenoms = [500, 100, 50, 10, 5, 1]; }
            else                    { trayDenoms = [1000, 500, 100, 50, 10, 5, 1]; }

            const trayFaces = {};
            trayDenoms.forEach(d => { trayFaces[d] = Math.random() < 0.5 ? 'back' : 'front'; });
            g.changeTrayFaces = trayFaces;

            // 貪婪最佳解（ghost slot 提示用）
            const _allDenoms = [1000, 500, 100, 50, 10, 5, 1];
            const greedySolution = {};
            let remSol = change;
            for (const d of _allDenoms) {
                const cnt = Math.floor(remSol / d);
                if (cnt > 0) { greedySolution[d] = cnt; remSol -= cnt * d; }
            }
            g.changeGreedySolution = greedySolution;

            const themeKey  = this.state.settings.partyTheme;
            const themeData = B5_THEMES[themeKey] || B5_THEMES.birthday;
            const diffLabel = { easy: '簡單模式', normal: '普通模式', hard: '困難模式' }[diff] || '';

            // 面額托盤 HTML（可重複拖曳）
            const trayHtml = trayDenoms.map(d => {
                const isBill = d >= 100;
                return `<div class="b5c-denom-card" draggable="true" data-denom="${d}" data-face="${trayFaces[d]}" title="${d}元">
                    <img src="../images/money/${d}_yuan_${trayFaces[d]}.png" alt="${d}元"
                         class="${isBill ? 'banknote-img' : 'coin-img'}" draggable="false" onerror="this.style.display='none'">
                    <span class="b1-denom-label">${d}元</span>
                </div>`;
            }).join('');

            // 錢包剩餘金額（付款後）
            const walletRemaining = (g.budget || 0) - paid;
            const _wDenoms = [1000, 500, 100, 50, 10, 5, 1];
            const walletCoinsArr = [];
            let _rem = walletRemaining;
            for (const d of _wDenoms) {
                const cnt = Math.floor(_rem / d);
                for (let i = 0; i < cnt; i++) walletCoinsArr.push(d);
                _rem -= cnt * d;
            }
            const walletStaticHtml = walletCoinsArr.map(d => {
                const isBill = d >= 100;
                const face   = Math.random() < 0.5 ? 'back' : 'front';
                const w      = isBill ? 80 : 52;
                return `<div class="b5c-wc-static">
                    <img src="../images/money/${d}_yuan_${face}.png" alt="${d}元"
                         style="width:${w}px;height:${isBill ? 'auto' : w+'px'};display:block;" draggable="false" onerror="this.style.display='none'">
                    <span class="b1-denom-label">${d}元</span>
                </div>`;
            }).join('');

            const app = document.getElementById('app');
            app.innerHTML = `
            <div class="b-header">
                <div class="b-header-left">
                    <img src="../images/index/educated_money_bag_character.png" alt="" class="b-header-mascot" onerror="this.style.display='none'">
                    <span class="b-header-unit">${themeData.icon} 生日派對預算</span>
                </div>
                <div class="b-header-center">${diffLabel}</div>
                <div class="b-header-right">
                    <span class="b-progress">第 ${g.currentRound + 1} 關 / 共 ${g.totalRounds} 關</span>
                    <button class="b-reward-btn" onclick="if(typeof RewardLauncher!=='undefined'){RewardLauncher.open();}else{window.open('../reward/index.html','RewardSystem','width=1200,height=800');}">🎁 獎勵</button>
                    <button class="b-back-btn" onclick="Game.showSettings()">返回設定</button>
                </div>
            </div>
            <div class="game-container">
                <div class="b5p2-ref-card">
                    <div class="b5p2-ref-header">
                        <span class="b5p2-ref-icon">${themeData.icon}</span>
                        <span class="b5p2-ref-title">${themeData.name}</span>
                        <span class="b5-p2-hint-wrap">
                            <img src="../images/index/educated_money_bag_character.png" alt="" style="width:28px;height:28px;object-fit:contain;flex-shrink:0;" onerror="this.style.display='none'">
                            <button class="b-hint-btn" id="b5c-hint-btn">💡 提示</button>
                        </span>
                    </div>
                    <div class="b5c-change-info-bar">
                        您付了 <strong>${paid}</strong> 元，需找零 <strong class="b5c-need-num">${change}</strong> 元
                    </div>
                </div>
                <div class="b5p2-tray">
                    <div class="b5p2-tray-title">💰 找零面額（可重複拖曳）</div>
                    <div class="b5c-tray-coins" id="b5c-tray-coins">${trayHtml}</div>
                </div>
                <div class="b5p2-wallet-area b5c-change-area">
                    <div class="b5p2-wallet-coins-label b5c-change-title">
                        💼 我的錢包
                        <span class="b5c-wallet-bal-badge">付款後剩餘 ${walletRemaining} 元</span>
                    </div>
                    <div class="b5p2-wallet-header">
                        <div class="b5p2-wallet-placed-row">
                            <span class="b5p2-wallet-placed-lbl">已收零</span>
                            <span class="b5p2-wallet-total-val" id="b5c-placed-total">${diff === 'hard' ? '？' : '0'}</span>
                            ${diff !== 'hard' ? `<span class="b5p2-wallet-sep">/</span><span class="b5p2-wallet-goal">${change} 元</span>` : ''}
                        </div>
                    </div>
                    <div class="b5p2-progress-wrap">
                        <div class="b5p2-progress">
                            <div class="b5c-progress-fill" id="b5c-progress-fill"></div>
                        </div>
                    </div>
                    <div class="b5c-wallet-split">
                        <div class="b5c-wallet-split-left">
                            ${walletStaticHtml || '<span class="b5p2-wallet-empty" style="font-size:12px;">（餘額為0）</span>'}
                        </div>
                        <div class="b5c-wallet-split-right b5p2-drop-zone b5c-drop-zone" id="b5c-wallet-zone">
                            <div id="b5c-wallet-coins" style="display:flex;flex-wrap:wrap;gap:10px;width:100%;align-items:flex-end;">
                                <span class="b5p2-wallet-empty">把找零金錢拖曳到這裡</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="b5c-confirm-btn" id="b5c-confirm-btn" disabled>✅ 確認找零</button>
            </div>`;

            Game.Speech.speak(`找您${toTWD(change)}，請把找回的金錢，拖曳到我的錢包`);
            this._b5P2SetupChangeInteraction(change, paid);

            if (this.state.settings.clickMode === 'on') {
                Game.TimerManager.setTimeout(() => AssistClick.activate(), 500, 'ui');
            }
        },

        _b5P2SetupChangeInteraction(change, paid) {
            const g          = this.state.game;
            const diff       = this.state.settings.difficulty;
            const trayEl     = document.getElementById('b5c-tray-coins');
            const walletZone = document.getElementById('b5c-wallet-zone');
            const confirmBtn = document.getElementById('b5c-confirm-btn');
            const hintBtn    = document.getElementById('b5c-hint-btn');
            if (!trayEl || !walletZone) return;

            // 放置一枚金幣到錢包
            const handleDrop = (denom) => {
                const face = g.changeTrayFaces?.[denom] || 'front';
                const uid  = 'ch' + Date.now() + Math.floor(Math.random() * 10000);

                if (g.changeGhostMode) {
                    const slotIdx = (g.changeHintSlots || []).findIndex(s => s.denom === denom && !s.filled);
                    if (slotIdx === -1) { this.audio.play('error'); return; }
                    this.audio.play('coin');
                    g.changeHintSlots[slotIdx].filled = true;
                    g.changeHintSlots[slotIdx].uid = uid;
                    g.changePlaced.push({ denom, uid, face });
                } else {
                    this.audio.play('coin');
                    g.changePlaced.push({ denom, uid, face });
                }
                this._b5P2UpdateChangeDisplay(change);
                this._b5P2RenderWalletCoins(change);
                if (diff === 'normal') {
                    const runningTotal = (g.changePlaced || []).reduce((s, p) => s + p.denom, 0);
                    Game.Speech.speak(`找為${toTWD(runningTotal)}`);
                }
            };

            // Desktop drag-from-tray
            trayEl.querySelectorAll('.b5c-denom-card').forEach(card => {
                const denom = parseInt(card.dataset.denom);
                Game.EventManager.on(card, 'dragstart', e => {
                    e.dataTransfer.setData('text/plain', `chdenom:${denom}`);
                    card.classList.add('b5p2-dragging');
                }, {}, 'gameUI');
                Game.EventManager.on(card, 'dragend', () => card.classList.remove('b5p2-dragging'), {}, 'gameUI');
            });
            Game.EventManager.on(walletZone, 'dragover', e => { e.preventDefault(); walletZone.classList.add('b6p2-drop-active'); }, {}, 'gameUI');
            Game.EventManager.on(walletZone, 'dragleave', e => { if (!walletZone.contains(e.relatedTarget)) walletZone.classList.remove('b6p2-drop-active'); }, {}, 'gameUI');
            Game.EventManager.on(walletZone, 'drop', e => {
                e.preventDefault(); walletZone.classList.remove('b6p2-drop-active');
                const d = e.dataTransfer.getData('text/plain');
                if (d.startsWith('chdenom:')) handleDrop(parseInt(d.replace('chdenom:', '')));
            }, {}, 'gameUI');

            // Touch drag-from-tray
            trayEl.querySelectorAll('.b5c-denom-card').forEach(card => {
                const denom = parseInt(card.dataset.denom);
                let ghostEl = null;
                Game.EventManager.on(card, 'touchstart', e => {
                    const t = e.touches[0];
                    ghostEl = card.cloneNode(true);
                    ghostEl.style.cssText = `position:fixed;z-index:9999;pointer-events:none;opacity:0.8;transform:scale(1.05);left:${t.clientX - 35}px;top:${t.clientY - 50}px;`;
                    document.body.appendChild(ghostEl);
                }, { passive: true }, 'gameUI');
                Game.EventManager.on(card, 'touchmove', e => {
                    e.preventDefault();
                    const t = e.touches[0];
                    if (ghostEl) { ghostEl.style.left = (t.clientX - 35) + 'px'; ghostEl.style.top = (t.clientY - 50) + 'px'; }
                    const r = walletZone.getBoundingClientRect();
                    walletZone.classList.toggle('b6p2-drop-active',
                        t.clientX >= r.left && t.clientX <= r.right && t.clientY >= r.top && t.clientY <= r.bottom);
                }, { passive: false }, 'gameUI');
                Game.EventManager.on(card, 'touchend', e => {
                    if (ghostEl) { ghostEl.remove(); ghostEl = null; }
                    walletZone.classList.remove('b6p2-drop-active');
                    const t = e.changedTouches[0];
                    const r = walletZone.getBoundingClientRect();
                    if (t.clientX >= r.left && t.clientX <= r.right && t.clientY >= r.top && t.clientY <= r.bottom) handleDrop(denom);
                }, { passive: true }, 'gameUI');
            });

            // 移除錢包中的金幣（× 按鈕）
            const walletCoinsEl = document.getElementById('b5c-wallet-coins');
            if (walletCoinsEl) {
                Game.EventManager.on(walletCoinsEl, 'click', e => {
                    const btn = e.target.closest('.b5c-wc-remove');
                    if (!btn) return;
                    this.audio.play('click');
                    if (g.changeGhostMode) {
                        const slotIdx = parseInt(btn.dataset.slotIdx);
                        if (!isNaN(slotIdx) && g.changeHintSlots[slotIdx]) {
                            const uid = g.changeHintSlots[slotIdx].uid;
                            g.changeHintSlots[slotIdx].filled = false;
                            g.changeHintSlots[slotIdx].uid = null;
                            g.changePlaced = g.changePlaced.filter(p => p.uid !== uid);
                        }
                    } else {
                        const uid = btn.dataset.uid;
                        g.changePlaced = g.changePlaced.filter(p => p.uid !== uid);
                    }
                    this._b5P2UpdateChangeDisplay(change);
                    this._b5P2RenderWalletCoins(change);
                }, {}, 'gameUI');
            }

            // 確認找零按鈕
            if (confirmBtn) {
                Game.EventManager.on(confirmBtn, 'click', () => {
                    if (this.state.isProcessing) return;
                    this.state.isProcessing = true;
                    this._b5P2ConfirmChange(change, paid);
                }, {}, 'gameUI');
            }

            // 提示按鈕
            if (hintBtn) {
                Game.EventManager.on(hintBtn, 'click', () => {
                    this.audio.play('click');
                    if (diff === 'easy' || diff === 'normal') {
                        this._b5P2ShowChangeGhostSlots(change);
                    } else {
                        this._b5P2ShowChangeHintModal(change);
                    }
                }, {}, 'gameUI');
            }

            // 錢包幣拖回面額區（拖出 wallet zone 即移除）
            let _draggingWalletUid = null;
            if (walletCoinsEl) {
                Game.EventManager.on(walletCoinsEl, 'dragstart', e => {
                    const item = e.target.closest('.b5c-wc-item[data-uid]');
                    if (!item) return;
                    _draggingWalletUid = item.dataset.uid;
                    e.dataTransfer.setData('text/plain', `b5cuid:${_draggingWalletUid}`);
                    e.dataTransfer.effectAllowed = 'move';
                }, {}, 'gameUI');
            }
            Game.EventManager.on(document, 'dragend', e => {
                if (!_draggingWalletUid) return;
                const uid = _draggingWalletUid;
                _draggingWalletUid = null;
                if (e.dataTransfer.dropEffect === 'none') {
                    if (g.changeGhostMode) {
                        const slotIdx = (g.changeHintSlots || []).findIndex(s => s.uid === uid);
                        if (slotIdx !== -1) { g.changeHintSlots[slotIdx].filled = false; g.changeHintSlots[slotIdx].uid = null; }
                    }
                    g.changePlaced = (g.changePlaced || []).filter(p => p.uid !== uid);
                    this.audio.play('click');
                    this._b5P2UpdateChangeDisplay(change);
                    this._b5P2RenderWalletCoins(change);
                }
            }, {}, 'gameUI');

            // Touch 拖回：錢包幣觸控拖出 wallet zone 即移除
            if (walletCoinsEl) {
                let _touchWalletUid = null;
                let _touchGhostEl   = null;
                Game.EventManager.on(walletCoinsEl, 'touchstart', e => {
                    const item = e.target.closest('.b5c-wc-item[data-uid]');
                    if (!item) return;
                    _touchWalletUid = item.dataset.uid;
                    const t = e.touches[0];
                    _touchGhostEl = item.cloneNode(true);
                    _touchGhostEl.style.cssText = `position:fixed;z-index:9999;pointer-events:none;opacity:0.7;left:${t.clientX - 30}px;top:${t.clientY - 40}px;`;
                    document.body.appendChild(_touchGhostEl);
                }, { passive: true }, 'gameUI');
                Game.EventManager.on(walletCoinsEl, 'touchmove', e => {
                    if (!_touchGhostEl) return;
                    e.preventDefault();
                    const t = e.touches[0];
                    _touchGhostEl.style.left = (t.clientX - 30) + 'px';
                    _touchGhostEl.style.top  = (t.clientY - 40) + 'px';
                }, { passive: false }, 'gameUI');
                Game.EventManager.on(walletCoinsEl, 'touchend', e => {
                    if (_touchGhostEl) { _touchGhostEl.remove(); _touchGhostEl = null; }
                    if (!_touchWalletUid) return;
                    const uid = _touchWalletUid;
                    _touchWalletUid = null;
                    const t    = e.changedTouches[0];
                    const zone = document.getElementById('b5c-wallet-zone');
                    const r    = zone?.getBoundingClientRect();
                    const inside = r && t.clientX >= r.left && t.clientX <= r.right && t.clientY >= r.top && t.clientY <= r.bottom;
                    if (!inside) {
                        if (g.changeGhostMode) {
                            const slotIdx = (g.changeHintSlots || []).findIndex(s => s.uid === uid);
                            if (slotIdx !== -1) { g.changeHintSlots[slotIdx].filled = false; g.changeHintSlots[slotIdx].uid = null; }
                        }
                        g.changePlaced = (g.changePlaced || []).filter(p => p.uid !== uid);
                        this.audio.play('click');
                        this._b5P2UpdateChangeDisplay(change);
                        this._b5P2RenderWalletCoins(change);
                    }
                }, { passive: true }, 'gameUI');
            }
        },

        _b5P2UpdateChangeDisplay(change) {
            const g = this.state.game;
            const placedTotal = (g.changePlaced || []).reduce((s, p) => s + p.denom, 0);
            const pct    = change > 0 ? Math.min(Math.round(placedTotal / change * 100), 100) : 0;
            const exact  = placedTotal === change;
            const fillEl  = document.getElementById('b5c-progress-fill');
            const totalEl = document.getElementById('b5c-placed-total');
            if (fillEl)  { fillEl.style.width = pct + '%'; fillEl.className = 'b5c-progress-fill' + (pct >= 100 ? ' full' : ''); }
            if (totalEl && this.state.settings.difficulty !== 'hard') {
                totalEl.textContent = placedTotal;
                totalEl.className = 'b6p2-wallet-total-val' + (exact ? ' enough' : placedTotal > 0 ? ' not-enough' : '');
            }
            const confirmBtn = document.getElementById('b5c-confirm-btn');
            if (confirmBtn) {
                confirmBtn.disabled = false;
                confirmBtn.classList.toggle('ready', exact);
            }
        },

        _b5P2RenderWalletCoins(change) {
            const g = this.state.game;
            const walletCoinsEl = document.getElementById('b5c-wallet-coins');
            if (!walletCoinsEl) return;

            // Ghost slot 模式
            if (g.changeGhostMode && g.changeHintSlots && g.changeHintSlots.length > 0) {
                if (g.changeHintSlots.every(s => s.filled)) {
                    g.changeGhostMode = false;
                } else {
                    walletCoinsEl.innerHTML = g.changeHintSlots.map((slot, idx) => {
                        const isBill = slot.denom >= 100;
                        const w = isBill ? 80 : 52;
                        if (slot.filled) {
                            return `<div class="b5c-wc-item" draggable="true" data-uid="${slot.uid || ''}">
                                <img src="../images/money/${slot.denom}_yuan_${slot.face}.png" alt="${slot.denom}元"
                                     style="width:${w}px;height:${isBill ? 'auto' : w + 'px'};display:block;" draggable="false" onerror="this.style.display='none'">
                                <span class="b1-denom-label">${slot.denom}元</span>
                                <button class="b5c-wc-remove" data-slot-idx="${idx}" title="移除">×</button>
                            </div>`;
                        }
                        return `<div class="b5c-ghost-slot" data-denom="${slot.denom}">
                            <img src="../images/money/${slot.denom}_yuan_${slot.face}.png" alt="${slot.denom}元"
                                 style="width:${w}px;height:${isBill ? 'auto' : w + 'px'};display:block;opacity:0.3;" draggable="false" onerror="this.style.display='none'">
                            <span class="b1-denom-label" style="opacity:0.3;">${slot.denom}元</span>
                        </div>`;
                    }).join('');
                    return;
                }
            }

            // 一般模式
            if (!g.changePlaced || g.changePlaced.length === 0) {
                walletCoinsEl.innerHTML = '<span class="b6p2-wallet-empty">把找零金錢拖曳到這裡</span>';
                return;
            }
            walletCoinsEl.innerHTML = g.changePlaced.map(p => {
                const isBill = p.denom >= 100;
                const w = isBill ? 80 : 52;
                return `<div class="b5c-wc-item" draggable="true" data-uid="${p.uid}">
                    <img src="../images/money/${p.denom}_yuan_${p.face}.png" alt="${p.denom}元"
                         style="width:${w}px;height:${isBill ? 'auto' : w + 'px'};display:block;" draggable="false" onerror="this.style.display='none'">
                    <span class="b1-denom-label">${p.denom}元</span>
                    <button class="b5c-wc-remove" data-uid="${p.uid}" title="移除">×</button>
                </div>`;
            }).join('');
        },

        _b5P2AddChangeCoin(denom) {
            const g    = this.state.game;
            const face = g.changeTrayFaces?.[denom] || 'front';
            const uid  = 'ch' + Date.now() + Math.floor(Math.random() * 10000);
            if (g.changeGhostMode) {
                const slotIdx = (g.changeHintSlots || []).findIndex(s => s.denom === denom && !s.filled);
                if (slotIdx === -1) { this.audio.play('error'); return; }
                this.audio.play('coin');
                g.changeHintSlots[slotIdx].filled = true;
                g.changeHintSlots[slotIdx].uid = uid;
                g.changePlaced.push({ denom, uid, face });
            } else {
                this.audio.play('coin');
                g.changePlaced.push({ denom, uid, face });
            }
            const totalChange = g.changeTotal || 0;
            this._b5P2UpdateChangeDisplay(totalChange);
            this._b5P2RenderWalletCoins(totalChange);
        },

        _b5P2ConfirmChange(change, paid) {
            const g    = this.state.game;
            const diff = this.state.settings.difficulty;
            const placedTotal = (g.changePlaced || []).reduce((s, p) => s + p.denom, 0);

            if (placedTotal !== change) {
                this.state.isProcessing = false;
                this.audio.play('error');
                g.changeErrorCount = (g.changeErrorCount || 0) + 1;
                const b5ChangeDir = placedTotal > change ? '太多了' : '太少了';
                this._showCenterFeedback('❌', `找零算${b5ChangeDir}！`);
                Game.Speech.speak(`不對喔，找零算${b5ChangeDir}，請再試一次`);
                const walletZone = document.getElementById('b5c-wallet-zone');
                if (walletZone) {
                    walletZone.style.animation = 'b5p2Shake 0.4s ease';
                    Game.TimerManager.setTimeout(() => { walletZone.style.animation = ''; }, 500, 'ui');
                }
                // 錯誤後清空找零區
                Game.TimerManager.setTimeout(() => {
                    g.changePlaced    = [];
                    g.changeGhostMode = false;
                    g.changeHintSlots = [];
                    this._b5P2UpdateChangeDisplay(change);
                    this._b5P2RenderWalletCoins(change);
                }, 700, 'ui');
                // 普通模式：3次錯誤自動顯示 ghost slots
                if (diff === 'normal' && g.changeErrorCount >= 3) {
                    g.changeErrorCount = 0;
                    Game.TimerManager.setTimeout(() => this._b5P2ShowChangeGhostSlots(change), 900, 'ui');
                }
                return;
            }

            // 找零正確
            this._showCenterFeedback('🎉', '找零完成！');
            Game.Speech.speak(`找回${toTWD(change)}，找零完成！`, () => {
                this.state.isProcessing = false;
                this._b5P2ShowResult(paid, change);
            });
        },

        _b5P2ShowChangeGhostSlots(change) {
            const g = this.state.game;
            g.changePlaced    = [];
            g.changeGhostMode = true;
            const solution = g.changeGreedySolution || {};
            const slots = [];
            Object.entries(solution).sort(([a], [b]) => b - a).forEach(([d, cnt]) => {
                const denom = parseInt(d);
                const face  = g.changeTrayFaces?.[denom] || 'front';
                for (let i = 0; i < cnt; i++) slots.push({ denom, face, filled: false, uid: null });
            });
            g.changeHintSlots = slots;
            this._b5P2UpdateChangeDisplay(change);
            this._b5P2RenderWalletCoins(change);
            const parts = Object.entries(solution).sort(([a], [b]) => b - a).map(([d, cnt]) => `${cnt}個${d}元`);
            Game.Speech.speak(`可以用${parts.join('，')}`);
        },

        _b5P2ShowChangeHintModal(change) {
            const g        = this.state.game;
            const solution = g.changeGreedySolution || {};
            const parts    = Object.entries(solution).sort(([a], [b]) => b - a).map(([d, cnt]) => `${cnt}個${d}元`);
            const speechText = `找零${toTWD(change)}，可以用${parts.join('，')}`;

            let hintListHTML = '';
            Object.entries(solution).sort(([a], [b]) => b - a).forEach(([d, cnt]) => {
                const denom  = parseInt(d);
                const face   = g.changeTrayFaces?.[denom] || 'front';
                const isBill = denom >= 100;
                const imgStyle = isBill ? 'width:80px;height:auto;max-height:50px;' : 'width:50px;height:50px;';
                hintListHTML += `
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;padding:10px 14px;background:#f0fdf4;border-radius:10px;border:1px solid #bbf7d0;">
                    <img src="../images/money/${denom}_yuan_${face}.png" alt="${denom}元"
                         style="${imgStyle}object-fit:contain;" onerror="this.style.display='none'" draggable="false">
                    <span style="font-size:18px;font-weight:700;color:#1f2937;">${denom}元</span>
                    <span style="color:#9ca3af;font-size:16px;">×</span>
                    <span style="font-size:18px;font-weight:700;color:#059669;">${cnt} 個</span>
                </div>`;
            });

            const existing = document.getElementById('b5c-hint-modal');
            if (existing) existing.remove();
            const overlay = document.createElement('div');
            overlay.id = 'b5c-hint-modal';
            overlay.className = 'b6-hint-modal-overlay';
            overlay.innerHTML = `
                <div class="b6-hint-modal" style="max-width:420px;width:92%;text-align:left;">
                    <div class="b6-hm-header" style="text-align:center;font-size:20px;padding-bottom:4px;">💡 找零提示</div>
                    <div style="text-align:center;font-size:14px;color:#6b7280;margin-bottom:14px;">建議的找零方式：</div>
                    <div style="padding:0 4px;">${hintListHTML}</div>
                    <div style="display:flex;gap:10px;justify-content:center;margin-top:4px;">
                        <button class="b6-hm-replay-btn" id="b5c-hm-replay">🔊 再播一次</button>
                        <button class="b6-hm-confirm-btn" id="b5c-hm-close">我知道了</button>
                    </div>
                </div>`;
            document.body.appendChild(overlay);
            Game.Speech.speak(speechText);

            const closeModal = () => overlay.remove();
            Game.EventManager.on(document.getElementById('b5c-hm-close'), 'click', closeModal, {}, 'gameUI');
            Game.EventManager.on(document.getElementById('b5c-hm-replay'), 'click', () => {
                this.audio.play('click');
                Game.Speech.speak(speechText);
            }, {}, 'gameUI');
            Game.EventManager.on(overlay, 'click', e => { if (e.target === overlay) closeModal(); }, {}, 'gameUI');
        },

        // ── 付款後顯示結果（下一關按鈕）─────────────────────────
        _b5P2ShowResult(paid, change) {
            const g = this.state.game;
            Game.TimerManager.setTimeout(() => {
                // 支援付款頁（b5p2-wallet-area）與找零頁（b5c-confirm-btn）兩種場景
                const anchor = document.getElementById('b5p2-wallet-area')
                             || document.getElementById('b5c-confirm-btn');
                if (anchor) {
                    const btn = document.createElement('button');
                    btn.className = 'b5-next-btn';
                    btn.textContent = g.currentRound + 1 >= g.totalRounds ? '查看結果 →' : '下一關 →';
                    Game.EventManager.on(btn, 'click', () => this.nextRound(), {}, 'gameUI');
                    anchor.after(btn);
                    if (this.state.settings.clickMode === 'on') {
                        Game.TimerManager.setTimeout(() => AssistClick.activate(), 200, 'ui');
                    }
                }
            }, 400, 'turnTransition');
        },

        // ── 付款提示彈窗（A4 style：列表 + 確認後托盤打勾）───────
        _showB5HardModeHintModal(total) {
            const ALL_BILLS = [1000, 500, 100, 50, 10, 5, 1];
            let rem = total;
            const denomCounts = {};
            ALL_BILLS.forEach(d => {
                if (rem >= d) { denomCounts[d] = Math.floor(rem / d); rem %= d; }
            });
            const parts = Object.entries(denomCounts).sort(([a],[b])=>b-a).map(([d,cnt])=>`${cnt}個${d}元`);
            const speechText = `需付${toTWD(total)}，可以用${parts.join('，')}`;
            this._b5P2LastHintSpeech = speechText;
            this._b5P2LastHintDenoms = denomCounts;

            let hintListHTML = '';
            Object.entries(denomCounts).sort(([a],[b])=>b-a).forEach(([d, cnt]) => {
                const denom = parseInt(d);
                const face  = this.state.game.p2TrayFaces?.[denom] || 'front';
                const isBill = denom >= 100;
                const imgStyle = isBill ? 'width:80px;height:auto;max-height:50px;' : 'width:50px;height:50px;';
                hintListHTML += `
                    <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;padding:10px 14px;background:#f0fdf4;border-radius:10px;border:1px solid #bbf7d0;">
                        <img src="../images/money/${denom}_yuan_${face}.png" alt="${denom}元"
                             style="${imgStyle}object-fit:contain;" onerror="this.style.display='none'" draggable="false">
                        <span style="font-size:18px;font-weight:700;color:#1f2937;">${denom}元</span>
                        <span style="color:#9ca3af;font-size:16px;">×</span>
                        <span style="font-size:18px;font-weight:700;color:#059669;">${cnt} 個</span>
                    </div>`;
            });

            const existing = document.getElementById('b5-hard-hint-modal');
            if (existing) existing.remove();
            const overlay = document.createElement('div');
            overlay.id = 'b5-hard-hint-modal';
            overlay.className = 'b6-hint-modal-overlay';
            overlay.innerHTML = `
                <div class="b6-hint-modal" style="max-width:420px;width:92%;text-align:left;">
                    <div class="b6-hm-header" style="text-align:center;font-size:20px;padding-bottom:4px;">💡 付款提示</div>
                    <div style="text-align:center;font-size:14px;color:#6b7280;margin-bottom:14px;">建議的付款方式：</div>
                    <div style="padding:0 4px;">${hintListHTML}</div>
                    <div style="display:flex;gap:10px;justify-content:center;margin-top:4px;">
                        <button class="b6-hm-replay-btn" id="b5-hm-replay">🔊 再播一次</button>
                        <button class="b6-hm-confirm-btn" id="b5-hm-close">我知道了</button>
                    </div>
                </div>`;
            document.body.appendChild(overlay);
            Game.Speech.speak(speechText);

            const closeAndApply = () => {
                overlay.remove();
                this._b5P2ApplyTrayTicks(this._b5P2LastHintDenoms || {});
            };
            Game.EventManager.on(document.getElementById('b5-hm-close'), 'click', closeAndApply, {}, 'gameUI');
            Game.EventManager.on(document.getElementById('b5-hm-replay'), 'click', () => {
                this.audio.play('click');
                Game.Speech.speak(this._b5P2LastHintSpeech || '');
            }, {}, 'gameUI');
            Game.EventManager.on(overlay, 'click', e => { if (e.target === overlay) closeAndApply(); }, {}, 'gameUI');
        },

        // ── 托盤打勾提示（確認提示後套用）───────────────────────
        _b5P2ApplyTrayTicks(denomCounts) {
            document.querySelectorAll('.b5p2-coin-drag.b5p2-tray-tick').forEach(el => el.classList.remove('b5p2-tray-tick'));
            Object.entries(denomCounts).forEach(([d, cnt]) => {
                const denom = parseInt(d);
                let needed  = cnt;
                document.querySelectorAll(`.b5p2-coin-drag[data-denom="${denom}"]`).forEach(el => {
                    if (needed > 0 && el.dataset.inUse !== 'true' && el.style.display !== 'none' && !el.classList.contains('b5p2-tray-tick')) {
                        el.classList.add('b5p2-tray-tick');
                        needed--;
                    }
                });
            });
        },

        // ── 13. 下一關 ────────────────────────────────────────
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
            if (document.getElementById('b5-round-intro') || document.getElementById('b5-round-transition')) return;
            this._clearHighlight();
            this._queue = [];

            const g = Game.state.game;
            if (!g) return;

            // 歡迎畫面第2頁：偵測「開始挑選！」按鈕
            const wcStartBtn = document.getElementById('b5-wc2-start-btn');
            if (wcStartBtn) {
                this._highlight(wcStartBtn);
                this._queue = [{ el: wcStartBtn, action: () => wcStartBtn.click() }];
                return;
            }

            // Phase 2 找零階段（b5c）
            if (document.getElementById('b5c-wallet-zone')) {
                const nextBtn = document.querySelector('.b5-next-btn');
                if (nextBtn) {
                    this._highlight(nextBtn);
                    this._queue = [{ el: nextBtn, action: () => nextBtn.click() }];
                    return;
                }
                const changeConfirm = document.getElementById('b5c-confirm-btn');
                if (changeConfirm && changeConfirm.classList.contains('ready')) {
                    this._highlight(changeConfirm);
                    this._queue = [{ el: changeConfirm, action: () => changeConfirm.click() }];
                    return;
                }
                const sol = g.changeGreedySolution || {};
                const placed = g.changePlaced || [];
                const placedCounts = {};
                placed.forEach(p => { placedCounts[p.denom] = (placedCounts[p.denom] || 0) + 1; });
                const nextDenom = Object.keys(sol).map(Number).sort((a, b) => b - a)
                    .find(d => (placedCounts[d] || 0) < sol[d]);
                if (nextDenom) {
                    const card = document.querySelector(`.b5c-denom-card[data-denom="${nextDenom}"]`);
                    if (card) {
                        this._highlight(card);
                        this._queue = [{ el: card, action: () => Game._b5P2AddChangeCoin(nextDenom) }];
                    }
                }
                return;
            }

            // Phase 2 付款畫面（b5p2）
            if (document.getElementById('b5p2-wallet-coins')) {
                const p2Confirm = document.getElementById('b5-p2-confirm-btn');
                if (p2Confirm && !p2Confirm.disabled) {
                    this._highlight(p2Confirm);
                    this._queue = [{ el: p2Confirm, action: () => p2Confirm.click() }];
                    return;
                }
                if (g.p2ShowHint && g.p2HintSlots?.length) {
                    const nextSlot = g.p2HintSlots.find(s => !s.filled);
                    if (nextSlot) {
                        const trayEl = document.querySelector(`.b5p2-coin-drag[data-denom="${nextSlot.denom}"]`);
                        if (trayEl) {
                            this._highlight(trayEl);
                            this._queue = [{ el: trayEl, action: () => Game._b5P2AddCoin(nextSlot.denom) }];
                        }
                    }
                }
                return;
            }

            // 下一關 / 再試一次按鈕（送出後）
            if (g.submitted) {
                const nextBtn = document.querySelector('.b5-next-btn');
                if (nextBtn) {
                    this._highlight(nextBtn);
                    this._queue = [{ el: nextBtn, action: () => nextBtn.click() }];
                }
                return;
            }

            // 確認購買按鈕已可按
            const confirmBtn = document.getElementById('b5-confirm-btn');
            if (confirmBtn && !confirmBtn.disabled) {
                this._highlight(confirmBtn);
                this._queue = [{ el: confirmBtn, action: () => confirmBtn.click() }];
                return;
            }

            // 提示模式（p1HintMode）：按提示商品順序引導
            if (g.p1HintMode) {
                const nextHintId = (g.p1HintItems || []).find(id => !g.selectedIds.has(id));
                if (nextHintId) {
                    // 提示商品在當前可見類別
                    const hintCard = document.querySelector(`.b5-item-card[data-id="${nextHintId}"]`);
                    if (hintCard) {
                        this._highlight(hintCard);
                        this._queue = [{ el: hintCard, action: () => hintCard.click() }];
                    } else {
                        // 提示商品在其他類別 → 先切換類別標籤
                        const hintCat = B5_ITEM_CATEGORIES[nextHintId];
                        if (hintCat) {
                            const tab = document.querySelector(`.b5-cat-tab[data-cat="${hintCat}"]`);
                            if (tab) { this._highlight(tab); this._queue = [{ el: tab, action: () => tab.click() }]; }
                        }
                    }
                    return;
                }
                // 所有提示商品已選 → 高亮確認按鈕
                const readyBtn = document.getElementById('b5-confirm-btn');
                if (readyBtn && !readyBtn.disabled) {
                    this._highlight(readyBtn);
                    this._queue = [{ el: readyBtn, action: () => readyBtn.click() }];
                }
                return;
            }

            // 尋找當前類別中第一個買得起且未選的商品
            const total     = g.items.filter(i => g.selectedIds.has(i.id)).reduce((s, i) => s + i.price, 0);
            const remaining = g.budget - total;
            const card = [...document.querySelectorAll('.b5-item-card:not(.selected):not(.disabled)')]
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
