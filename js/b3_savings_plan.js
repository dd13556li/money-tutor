// =============================================================
// FILE: js/b3_savings_plan.js — B3 存錢計畫
// =============================================================
'use strict';

// ── 圖片壓縮工具 ──────────────────────────────────────────────
function b3CompressImage(file, maxWidth = 200, quality = 0.7) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                let w = img.width, h = img.height;
                if (w > maxWidth) { h = Math.round(h * maxWidth / w); w = maxWidth; }
                const canvas = document.createElement('canvas');
                canvas.width = w; canvas.height = h;
                canvas.getContext('2d').drawImage(img, 0, 0, w, h);
                resolve(canvas.toDataURL('image/jpeg', quality));
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
}

// ── 商品資料庫（依難度篩選）─────────────────────────────────────
const B3_ALL_ITEMS = [
    { name: '食譜書',    price: 200,  icon: '📖', img: 'icon-b3-art-set.png',           cat: 'book' },
    { name: '拼圖遊戲',  price: 250,  icon: '🧩', img: 'icon-b3-puzzle.png',            cat: 'toy' },
    { name: '兒童繪本',  price: 280,  icon: '📕', img: 'icon-b3-recipe-book.png',       cat: 'book' },
    { name: '玩具機器人', price: 300,  icon: '🤖', img: 'icon-b3-robot-toy.png',         cat: 'toy' },
    { name: '望遠鏡',    price: 350,  icon: '🔭', img: 'icon-b3-telescope.png',         cat: 'outdoor' },
    { name: '桌遊組',    price: 380,  icon: '🎲', img: 'icon-b3-board-game.png',        cat: 'toy' },
    { name: '烹飪玩具組', price: 420,  icon: '🍳', img: 'icon-b3-cooking-toy.png',       cat: 'toy' },
    { name: '故事書套組', price: 450,  icon: '📚', img: 'icon-b3-story-books.png',       cat: 'book' },
    { name: '科學實驗組', price: 480,  icon: '🔬', img: 'icon-b3-science-kit.png',       cat: 'outdoor' },
    { name: '遊樂園門票', price: 500,  icon: '🎡', img: 'icon-b3-amusement-ticket.png',  cat: 'outdoor' },
    { name: '魔術道具組', price: 550,  icon: '🎩', img: 'icon-b3-magic-set.png',         cat: 'toy' },
    { name: '音樂盒',    price: 600,  icon: '🎵', img: 'icon-b3-music-box.png',         cat: 'tech' },
    { name: '生日蛋糕',  price: 650,  icon: '🎂', img: 'icon-b3-birthday-cake.png',     cat: 'book' },
    { name: '積木套組',  price: 700,  icon: '🧱', img: 'icon-b3-lego-set.png',          cat: 'toy' },
    { name: '運動鞋',    price: 800,  icon: '👟', img: 'icon-b3-sneakers.png',          cat: 'outdoor' },
    { name: '數位相機',  price: 1000, icon: '📷', img: 'icon-b3-digital-camera.png',    cat: 'tech' },
    { name: '水族箱',    price: 1200, icon: '🐠', img: 'icon-b3-fish-tank.png',         cat: 'tech' },
    { name: '電動遊戲機', price: 1500, icon: '🎮', img: 'icon-b3-game-console.png',      cat: 'tech' },
    { name: '腳踏車',    price: 2400, icon: '🚴', img: 'icon-b3-bicycle.png',           cat: 'outdoor' },
    { name: '平板電腦',  price: 3500, icon: '💻', img: 'icon-b3-tablet.png',            cat: 'tech' },
];

const B3_ITEMS_BY_DIFF = {
    easy:   B3_ALL_ITEMS.filter(i => i.price <= 400),
    normal: B3_ALL_ITEMS.filter(i => i.price <= 800),
    hard:   B3_ALL_ITEMS,
};

const B3_WEEKLY_OPTIONS = {
    easy:   [50, 100, 150, 200],
    normal: [30, 50, 75, 100, 120, 150],
    hard:   [25, 35, 50, 65, 80, 100, 125, 150, 175, 200],
};

// ── 面額兌換規則（供撲滿手動兌換）────────────────────────────────
const EXCHANGE_RULES = [
    { from: 1,   count: 10, to: 10   },
    { from: 1,   count: 5,  to: 5    },
    { from: 5,   count: 2,  to: 10   },
    { from: 10,  count: 5,  to: 50   },
    { from: 50,  count: 2,  to: 100  },
    { from: 100, count: 5,  to: 500  },
    { from: 500, count: 2,  to: 1000 },
];

// ── 金額語音轉換（安全版）──────────────────────────────────────
const toTWD = v => typeof convertToTraditionalCurrency === 'function'
    ? convertToTraditionalCurrency(v) : `${v}元`;

// ── Game 物件 ────────────────────────────────────────────────────
let Game;

document.addEventListener('DOMContentLoaded', () => {
    Game = {

        // ── 1. Debug ──────────────────────────────────────────
        Debug: {
            FLAGS: { all: false, init: false, speech: false, question: false, error: true },
            log(cat, ...a)  { if (this.FLAGS.all || this.FLAGS[cat]) console.log(`[B3-${cat}]`, ...a); },
            warn(cat, ...a) { if (this.FLAGS.all || this.FLAGS[cat]) console.warn(`[B3-${cat}]`, ...a); },
            error(...a)     { console.error('[B3-ERROR]', ...a); },
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
                ['correct', 'success', 'error', 'click', 'coin'].forEach(name => {
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
        tempItemImageData: null, // 上傳預覽暫存

        state: {
            settings: {
                difficulty: null,
                questionCount: null,  // normal/hard only
                retryMode: null,      // normal/hard only
                startDate: null,      // easy only (null = today)
                dailyAmount: null,    // easy only (null = auto)
                priceRange: null,     // easy only (max price of items)
                clickMode: null,      // hard mode quiz only
                itemCat: 'all',       // item category filter (all/toy/book/outdoor/tech)
            },
            quiz: {
                currentQuestion: 0,
                totalQuestions: 0,
                correctCount: 0,
                streak: 0,
                questions: [],
                achievedGoals: [],
                startTime: null,
                currentInput: '',
            },
            calendar: {
                item: null,
                dailyAmount: 0,
                accumulated: 0,
                denomPile: {},   // 實際持有面額 {denom: count}
                clickedDays: 0,
                startDate: null,
                startTime: null,
                drag: null,
            },
            customItems: [], // { name, price, imageData, isCustom:true }（跨局保留）
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
            if (document.getElementById('b3-global-animations')) return;
            const style = document.createElement('style');
            style.id = 'b3-global-animations';
            style.textContent = `
                @keyframes b3SlotPop {
                    0%   { transform: translateY(-16px) scale(0.4); opacity: 0; }
                    60%  { transform: translateY(3px) scale(1.2); }
                    100% { transform: translateY(0) scale(1); opacity: 1; }
                }
                @keyframes b3CoinFloat {
                    0%   { transform: translate(var(--b3-dx, 0px), 0px) scale(1);   opacity: 1; }
                    60%  { transform: translate(var(--b3-dx, 0px), -80px) scale(1.3); opacity: 0.9; }
                    100% { transform: translate(var(--b3-dx, 0px), -140px) scale(0.6); opacity: 0; }
                }
                @keyframes b3SlotFill {
                    0%   { transform: scale(0.5); opacity: 0; }
                    70%  { transform: scale(1.15); }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes b3DropWrong {
                    0%, 100% { transform: translateX(0); }
                    20%      { transform: translateX(-6px); }
                    40%      { transform: translateX(6px); }
                    60%      { transform: translateX(-4px); }
                    80%      { transform: translateX(4px); }
                }
                @keyframes b3CheckPop {
                    0%   { transform: scale(0) rotate(-20deg); opacity: 0; }
                    60%  { transform: scale(1.3) rotate(5deg); opacity: 1; }
                    100% { transform: scale(1) rotate(0deg); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        },

        resetGameState() {
            const q = this.state.quiz;
            q.currentQuestion  = 0;
            q.totalQuestions   = this.state.settings.questionCount || 0;
            q.correctCount     = 0;
            q.streak           = 0;
            q.questions        = [];
            q.achievedGoals    = [];
            q.startTime        = null;
            q.currentInput     = '';
            const c = this.state.calendar;
            c.item = null; c.dailyAmount = 0; c.accumulated = 0; c.denomPile = {};
            c.clickedDays = 0; c.startDate = null; c.startTime = null; c.drag = null;
            this.state.isEndingGame = false;
            this.state.isProcessing  = false;
            Game.Debug.log('init', '🔄 [B3] 遊戲狀態已重置');
        },

        // ── 8. 設定頁 ─────────────────────────────────────────
        showSettings() {
            Game.TimerManager.clearAll();
            Game.EventManager.removeByCategory('gameUI');
            this.resetGameState();
            document.getElementById('app').innerHTML = this._renderSettingsHTML();
            this._bindSettingsEvents();
            Game.Debug.log('init', 'showSettings 完成');
        },

        _renderSettingsHTML() {
            const today = new Date().toISOString().split('T')[0];
            return `
    <div class="unit-welcome">
        <div class="welcome-content">
            <div class="settings-title-row">
                <img src="../images/index/educated_money_bag_character.png" alt="金錢小助手"
                     class="settings-mascot-img" onerror="this.style.display='none'">
                <h1>單元B3：存錢計畫</h1>
            </div>
            <div class="game-settings">
                <div class="b-setting-group">
                    <label class="b-setting-label">🎯 難度選擇：</label>
                    <div class="b-btn-group" id="diff-group">
                        <button class="b-sel-btn b-diff-easy"   data-val="easy">簡單</button>
                        <button class="b-sel-btn b-diff-normal" data-val="normal">普通</button>
                        <button class="b-sel-btn b-diff-hard"   data-val="hard">困難</button>
                    </div>
                    <div class="b-diff-desc" id="diff-desc"></div>
                </div>

                <div class="b-setting-group b3-cal-settings" id="cal-settings-group" style="display:none;">
                    <label class="b-setting-label">📅 開始日期：</label>
                    <div class="b-btn-group">
                        <input type="date" id="b3-start-date" class="b3-date-input" value="${today}">
                    </div>
                </div>

                <div class="b-setting-group b3-cal-settings" id="cal-price-range-group" style="display:none;">
                    <label class="b-setting-label">🛒 購買物品金額：</label>
                    <div class="b-btn-group" id="price-range-group">
                        <button class="b-sel-btn" data-range="300">300元以內</button>
                        <button class="b-sel-btn" data-range="500">500元以內</button>
                        <button class="b-sel-btn" data-range="800">800元以內</button>
                    </div>
                </div>

                <div class="b-setting-group">
                    <label class="b-setting-label">🖼️ 自訂物品（選填）：</label>
                    <div class="b3-custom-items-list" id="b3-custom-items-list">
                        ${this._renderCustomItemsPanel()}
                    </div>
                    <div class="b-btn-group" style="margin-top:6px;">
                        <button class="b-sel-btn" id="b3-add-custom-item-btn" style="background:linear-gradient(45deg,#FF6B6B,#4ECDC4);color:#fff;border:none;">＋ 新增物品</button>
                    </div>
                    <div style="margin-top:4px;font-size:12px;color:#6b7280;">上傳圖片作為存錢目標，最多 5 個，會加入題目池一起出題</div>
                    <input type="file" id="b3-custom-image" accept="image/*" style="display:none;">
                </div>

                <div class="b-setting-group b3-cal-settings" id="cal-daily-group" style="display:none;">
                    <label class="b-setting-label">💰 每天存款金額：</label>
                    <div class="b-btn-group" id="daily-group">
                        <button class="b-sel-btn" data-daily="auto">自動</button>
                        <button class="b-sel-btn" data-daily="10">10元</button>
                        <button class="b-sel-btn" data-daily="20">20元</button>
                        <button class="b-sel-btn" data-daily="30">30元</button>
                        <button class="b-sel-btn" data-daily="50">50元</button>
                        <button class="b-sel-btn" data-daily="custom">自訂</button>
                    </div>
                    <div id="b3-custom-daily-row" style="display:none;margin-top:8px;display:none;align-items:center;gap:6px;">
                        <input type="number" id="b3-custom-daily-input"
                               min="1" max="9999" placeholder="輸入金額"
                               style="width:100px;padding:6px 10px;border:2px solid #d97706;border-radius:8px;font-size:15px;text-align:center;outline:none;">
                        <span style="font-size:13px;color:#6b7280;">元（1～9999）</span>
                    </div>
                    <div style="margin-top:4px;font-size:12px;color:#6b7280;">自動：系統根據目標金額決定每天存多少</div>
                </div>
                <div class="b3-cal-settings b3-days-preview" id="b3-days-preview" style="display:none;"></div>

                <!-- 普通模式設定 -->
                <div class="b-setting-group b3-normal-settings" id="n-start-date-group" style="display:none;">
                    <label class="b-setting-label">📅 開始日期：</label>
                    <div class="b-btn-group">
                        <input type="date" id="b3-n-start-date" class="b3-date-input" value="${today}">
                    </div>
                </div>
                <div class="b-setting-group b3-normal-settings" id="n-price-range-group" style="display:none;">
                    <label class="b-setting-label">🛒 購買物品金額：</label>
                    <div class="b-btn-group" id="n-price-range-btns">
                        <button class="b-sel-btn" data-nrange="300">300元以內</button>
                        <button class="b-sel-btn" data-nrange="500">500元以內</button>
                        <button class="b-sel-btn" data-nrange="800">800元以內</button>
                    </div>
                </div>
                <div class="b-setting-group b3-normal-settings" id="n-daily-group" style="display:none;">
                    <label class="b-setting-label">💰 每天存款金額：</label>
                    <div class="b-btn-group" id="n-daily-btn-group">
                        <button class="b-sel-btn" data-ndaily="preset">預設</button>
                        <button class="b-sel-btn" data-ndaily="custom">自訂</button>
                    </div>
                    <div id="b3-preset-display" style="display:none;margin-top:10px;padding:10px 20px;background:#fef3c7;border:2px solid #d97706;border-radius:12px;text-align:center;">
                        <span id="b3-preset-number" style="font-size:2rem;font-weight:900;color:#92400e;letter-spacing:2px;">--</span>
                        <span style="font-size:1rem;color:#92400e;margin-left:4px;">元 / 天</span>
                    </div>
                    <div id="b3-n-custom-daily-row" style="display:none;margin-top:8px;align-items:center;gap:6px;">
                        <input type="number" id="b3-n-custom-daily-input"
                               min="1" max="9999" placeholder="輸入金額"
                               style="width:100px;padding:6px 10px;border:2px solid #d97706;border-radius:8px;font-size:15px;text-align:center;outline:none;">
                        <span style="font-size:13px;color:#6b7280;">元（1～9999）</span>
                    </div>
                </div>
                <div class="b3-normal-settings b3-days-preview" id="b3-n-days-preview" style="display:none;"></div>

                <!-- 困難模式設定 -->
                <div class="b-setting-group b3-hard-settings" id="count-settings-group" style="display:none;">
                    <label class="b-setting-label">📋 題數：</label>
                    <div class="b-btn-group" id="count-group">
                        <button class="b-sel-btn" data-val="1">1題</button>
                        <button class="b-sel-btn" data-val="5">5題</button>
                        <button class="b-sel-btn" data-val="10">10題</button>
                        <button class="b-sel-btn" data-val="15">15題</button>
                        <button class="b-sel-btn" data-val="20">20題</button>
                    </div>
                </div>
                <div class="b-setting-group b3-hard-settings" id="mode-settings-group" style="display:none;">
                    <label class="b-setting-label">🔄 作答模式：</label>
                    <div class="b-btn-group" id="mode-group">
                        <button class="b-sel-btn" data-val="retry">重試模式</button>
                        <button class="b-sel-btn" data-val="proceed">繼續模式</button>
                    </div>
                    <div style="margin-top:4px;font-size:12px;color:#6b7280;">重試：答錯可以再試 ｜ 繼續：顯示答案後繼續</div>
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

                <!-- 自訂物品上傳預覽 Modal -->
                <div id="b3-item-preview-modal" class="b3-modal-overlay" style="display:none;">
                    <div class="b3-modal-box">
                        <div class="b3-modal-header">🖼️ 新增自訂物品</div>
                        <div class="b3-modal-body">
                            <img id="b3-preview-image" src="" alt="預覽" class="b3-modal-preview-img">
                            <div class="b3-modal-field">
                                <label class="b3-modal-label">物品名稱：</label>
                                <input type="text" id="b3-custom-item-name" class="b3-modal-input" placeholder="例如：新玩具" maxlength="10">
                            </div>
                            <div class="b3-modal-field">
                                <label class="b3-modal-label">目標金額（元）：</label>
                                <input type="number" id="b3-custom-item-price" class="b3-modal-input" placeholder="例如：300" min="1" max="9999">
                            </div>
                        </div>
                        <div class="b3-modal-footer">
                            <button id="b3-modal-cancel-btn" class="b3-modal-btn b3-modal-btn-cancel">取消</button>
                            <button id="b3-modal-confirm-btn" class="b3-modal-btn b3-modal-btn-confirm">確認新增</button>
                        </div>
                    </div>
                </div>
                <div class="b-setting-group b3-quiz-settings" style="display:none">
                    <label class="b-setting-label">🗂️ 目標類別：</label>
                    <div class="b-btn-group" id="b3-cat-group">
                        <button class="b-sel-btn active" data-cat="all">全部</button>
                        <button class="b-sel-btn" data-cat="toy">🎮 玩具</button>
                        <button class="b-sel-btn" data-cat="book">📚 書本</button>
                        <button class="b-sel-btn" data-cat="outdoor">🌿 戶外</button>
                        <button class="b-sel-btn" data-cat="tech">💻 科技</button>
                    </div>
                </div>
                <div class="b-setting-group b3-hard-settings" style="display:none">
                    <label class="b-setting-label">🤖 輔助點擊</label>
                    <div class="b-btn-group" id="assist-group">
                        <button class="b-sel-btn" data-assist="on">✓ 啟用</button>
                        <button class="b-sel-btn" data-assist="off">✗ 停用</button>
                    </div>
                    <div style="margin-top:4px;font-size:12px;color:#6b7280;">
                        啟用後，只要偵測到點擊便會自動執行下一個步驟
                    </div>
                </div>
                <div class="b-setting-group">
                    <label style="font-size:13px;color:#6b7280;text-align:left;display:block;">
                        ✨ 簡單：月曆存錢，面額已分解好直接放置｜普通：月曆存錢，自行組合面額｜困難：計算每週存款所需週數
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
            easy:   '簡單：月曆模擬！點擊每一天存入固定金額，面額已幫你分解好，直接拖曳放置即可',
            normal: '普通：月曆模擬！每天自行組合正確面額存入撲滿，比簡單模式更具挑戰性',
            hard:   '困難：計算每週存固定金額需要幾週才能達成目標，精確輸入週數',
        },

        _bindSettingsEvents() {
            Game.EventManager.removeByCategory('settings');
            document.querySelectorAll('#diff-group .b-sel-btn').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#diff-group .b-sel-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const diff = btn.dataset.val;
                    this.state.settings.difficulty = diff;
                    const desc = document.getElementById('diff-desc');
                    if (desc) { desc.textContent = this._diffDescriptions[diff]; desc.classList.add('show'); }
                    // Show/hide settings by difficulty
                    document.querySelectorAll('.b3-cal-settings').forEach(el => el.style.display = diff === 'easy' ? '' : 'none');
                    document.querySelectorAll('.b3-normal-settings').forEach(el => el.style.display = diff === 'normal' ? '' : 'none');
                    document.querySelectorAll('.b3-hard-settings').forEach(el => el.style.display = diff === 'hard' ? '' : 'none');
                    document.querySelectorAll('.b3-quiz-settings').forEach(el => el.style.display = diff === 'hard' ? '' : 'none');
                    if (diff === 'hard') {
                        // Reset calendar settings
                        this.state.settings.startDate = null;
                        this.state.settings.dailyAmount = null;
                        this.state.settings.priceRange = null;
                    } else {
                        // Reset hard-mode settings
                        this.state.settings.questionCount = null;
                        this.state.settings.retryMode = null;
                    }
                    if (diff === 'easy') {
                        const dateInput = document.getElementById('b3-start-date');
                        if (dateInput) this.state.settings.startDate = dateInput.value;
                    } else if (diff === 'normal') {
                        const dateInput = document.getElementById('b3-n-start-date');
                        if (dateInput) this.state.settings.startDate = dateInput.value;
                        // Reset normal-specific UI
                        this.state.settings.dailyAmount = null;
                        this.state.settings.priceRange = null;
                        const presetDisplay = document.getElementById('b3-preset-display');
                        if (presetDisplay) { presetDisplay.style.display = 'none'; presetDisplay.classList.remove('b3-preset-locked'); }
                        const customRow = document.getElementById('b3-n-custom-daily-row');
                        if (customRow) customRow.style.display = 'none';
                        document.querySelectorAll('#n-daily-btn-group .b-sel-btn').forEach(b => b.classList.remove('active'));
                        document.querySelectorAll('#n-price-range-btns .b-sel-btn').forEach(b => b.classList.remove('active'));
                    }
                    this._checkCanStart();
                }, {}, 'settings');
            });

            // Date input
            const dateInput = document.getElementById('b3-start-date');
            Game.EventManager.on(dateInput, 'change', () => {
                this.state.settings.startDate = dateInput.value;
            }, {}, 'settings');

            // Price range buttons
            document.querySelectorAll('#price-range-group .b-sel-btn').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#price-range-group .b-sel-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.priceRange = parseInt(btn.dataset.range);
                    this._updateDaysPreview();
                    this._checkCanStart();
                }, {}, 'settings');
            });

            // Daily amount buttons
            document.querySelectorAll('#daily-group .b-sel-btn').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#daily-group .b-sel-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const v = btn.dataset.daily;
                    const customRow = document.getElementById('b3-custom-daily-row');
                    if (v === 'custom') {
                        if (customRow) customRow.style.display = 'flex';
                        // 等待使用者輸入，先標記為 'custom' 阻止開始
                        this.state.settings.dailyAmount = 'custom';
                        const inp = document.getElementById('b3-custom-daily-input');
                        if (inp) { inp.value = ''; inp.focus(); }
                    } else {
                        if (customRow) customRow.style.display = 'none';
                        this.state.settings.dailyAmount = v === 'auto' ? 'auto' : parseInt(v);
                    }
                    this._updateDaysPreview();
                    this._checkCanStart();
                }, {}, 'settings');
            });

            // 自訂存款金額輸入
            const customDailyInput = document.getElementById('b3-custom-daily-input');
            if (customDailyInput) {
                Game.EventManager.on(customDailyInput, 'input', () => {
                    const val = parseInt(customDailyInput.value);
                    this.state.settings.dailyAmount = (val >= 1 && val <= 9999) ? val : 'custom';
                    this._updateDaysPreview();
                    this._checkCanStart();
                }, {}, 'settings');
            }

            // ── 普通模式設定事件 ──────────────────────────────
            // Normal: 開始日期
            const nDateInput = document.getElementById('b3-n-start-date');
            if (nDateInput) {
                Game.EventManager.on(nDateInput, 'change', () => {
                    this.state.settings.startDate = nDateInput.value;
                }, {}, 'settings');
            }

            // Normal: 購買物品金額
            document.querySelectorAll('#n-price-range-btns .b-sel-btn').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#n-price-range-btns .b-sel-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.priceRange = parseInt(btn.dataset.nrange);
                    this._updateNDaysPreview();
                    this._checkCanStart();
                }, {}, 'settings');
            });

            // Normal: 每天存款金額（預設/自訂）
            document.querySelectorAll('#n-daily-btn-group .b-sel-btn').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#n-daily-btn-group .b-sel-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const v = btn.dataset.ndaily;
                    const presetDisplay = document.getElementById('b3-preset-display');
                    const customRow = document.getElementById('b3-n-custom-daily-row');
                    if (v === 'preset') {
                        if (customRow) customRow.style.display = 'none';
                        if (presetDisplay) { presetDisplay.style.display = 'block'; presetDisplay.classList.remove('b3-preset-locked'); }
                        this.state.settings.dailyAmount = 'preset-pending';
                        this._checkCanStart();
                        // 浮動金額動畫
                        const pool = [10, 20, 30, 50, 75, 100];
                        const numEl = document.getElementById('b3-preset-number');
                        const animId = setInterval(() => {
                            if (numEl) numEl.textContent = pool[Math.floor(Math.random() * pool.length)];
                        }, 80);
                        Game.TimerManager.setTimeout(() => {
                            clearInterval(animId);
                            const chosen = pool[Math.floor(Math.random() * pool.length)];
                            if (numEl) numEl.textContent = chosen;
                            if (presetDisplay) presetDisplay.classList.add('b3-preset-locked');
                            this.state.settings.dailyAmount = chosen;
                            this._updateNDaysPreview();
                            this._checkCanStart();
                        }, 1200, 'presetLock');
                    } else {
                        if (presetDisplay) { presetDisplay.style.display = 'none'; presetDisplay.classList.remove('b3-preset-locked'); }
                        if (customRow) customRow.style.display = 'flex';
                        this.state.settings.dailyAmount = 'custom';
                        const inp = document.getElementById('b3-n-custom-daily-input');
                        if (inp) { inp.value = ''; inp.focus(); }
                        this._checkCanStart();
                    }
                }, {}, 'settings');
            });

            // Normal: 自訂金額輸入
            const nCustomDailyInput = document.getElementById('b3-n-custom-daily-input');
            if (nCustomDailyInput) {
                Game.EventManager.on(nCustomDailyInput, 'input', () => {
                    const val = parseInt(nCustomDailyInput.value);
                    this.state.settings.dailyAmount = (val >= 1 && val <= 9999) ? val : 'custom';
                    this._updateNDaysPreview();
                    this._checkCanStart();
                }, {}, 'settings');
            }

            // Count buttons (hard mode only)
            document.querySelectorAll('#count-group .b-sel-btn').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#count-group .b-sel-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.questionCount = parseInt(btn.dataset.val);
                    this._checkCanStart();
                }, {}, 'settings');
            });

            // Mode buttons (normal/hard)
            document.querySelectorAll('#mode-group .b-sel-btn').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#mode-group .b-sel-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.retryMode = btn.dataset.val;
                    this._checkCanStart();
                }, {}, 'settings');
            });

            // 自訂物品上傳
            Game.EventManager.on(document.getElementById('b3-add-custom-item-btn'), 'click', () => {
                this.triggerCustomItemUpload();
            }, {}, 'settings');
            Game.EventManager.on(document.getElementById('b3-custom-image'), 'change', (e) => {
                this.handleCustomItemUpload(e);
            }, {}, 'settings');
            Game.EventManager.on(document.getElementById('b3-modal-cancel-btn'), 'click', () => {
                this.closeCustomItemPreview();
            }, {}, 'settings');
            Game.EventManager.on(document.getElementById('b3-modal-confirm-btn'), 'click', () => {
                this.confirmAddCustomItem();
            }, {}, 'settings');

            const rewardLink = document.getElementById('settings-reward-link');
            Game.EventManager.on(rewardLink, 'click', (e) => {
                e.preventDefault();
                if (typeof RewardLauncher !== 'undefined') RewardLauncher.open();
                else window.open('../reward/index.html', 'RewardSystem', 'width=1200,height=800');
            }, {}, 'settings');

            Game.EventManager.on(document.getElementById('settings-worksheet-link'), 'click', (e) => {
                e.preventDefault();
                const params = new URLSearchParams({ unit: 'b3' });
                window.open('../worksheet/index.html?' + params.toString(), 'Worksheet', 'width=900,height=700');
            }, {}, 'settings');

            document.querySelectorAll('#b3-cat-group .b-sel-btn').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#b3-cat-group .b-sel-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.itemCat = btn.dataset.cat;
                    this._updateDaysPreview();
                    this._checkCanStart();
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

        // ── 自訂物品管理 ──────────────────────────────────────
        _itemIconHTML(item, size = '128px') {
            if (item.imageData) {
                return `<img src="${item.imageData}" alt="${item.name}" style="width:${size};height:${size};object-fit:cover;border-radius:8px;" draggable="false">`;
            }
            if (item.img) {
                const fallback = item.icon || '🎁';
                return `<img src="../images/b3/${item.img}" alt="${item.name}" style="width:${size};height:${size};object-fit:contain;" draggable="false" onerror="this.replaceWith(document.createTextNode('${fallback}'))">`;
            }
            return item.icon || '🎁';
        },

        _renderCustomItemsPanel() {
            const items = this.state.customItems;
            if (!items.length) {
                return `<div class="b3-custom-empty">尚未新增自訂物品</div>`;
            }
            return items.map((item, i) => `
                <div class="b3-custom-item-card">
                    <img src="${item.imageData}" alt="${item.name}" class="b3-custom-item-img">
                    <div class="b3-custom-item-info">
                        <div class="b3-custom-item-name">${item.name}</div>
                        <div class="b3-custom-item-price">${item.price} 元</div>
                    </div>
                    <button class="b3-custom-remove-btn" onclick="Game.removeCustomItem(${i})">✕</button>
                </div>`).join('');
        },

        _updateCustomItemsPanel() {
            const panel = document.getElementById('b3-custom-items-list');
            if (panel) panel.innerHTML = this._renderCustomItemsPanel();
        },

        triggerCustomItemUpload() {
            if (this.state.customItems.length >= 5) {
                alert('最多只能新增 5 個自訂物品！');
                return;
            }
            const fileInput = document.getElementById('b3-custom-image');
            if (fileInput) { fileInput.value = ''; fileInput.click(); }
        },

        async handleCustomItemUpload(event) {
            const file = event.target.files[0];
            if (!file) return;
            if (!file.type.startsWith('image/')) { alert('請選擇圖片檔案！'); return; }
            try {
                const compressed = await b3CompressImage(file, 200, 0.7);
                this.showCustomItemPreview(compressed);
            } catch (err) {
                Game.Debug.warn('init', '圖片壓縮失敗', err);
                alert('圖片處理失敗，請重試！');
            }
        },

        showCustomItemPreview(imageDataUrl) {
            this.tempItemImageData = imageDataUrl;
            const modal = document.getElementById('b3-item-preview-modal');
            const img   = document.getElementById('b3-preview-image');
            if (!modal || !img) return;
            img.src = imageDataUrl;
            modal.style.display = 'flex';
            const nameInput = document.getElementById('b3-custom-item-name');
            if (nameInput) { nameInput.value = ''; Game.TimerManager.setTimeout(() => nameInput.focus(), 100, 'ui'); }
            const priceInput = document.getElementById('b3-custom-item-price');
            if (priceInput) priceInput.value = '';
        },

        closeCustomItemPreview() {
            const modal = document.getElementById('b3-item-preview-modal');
            if (modal) modal.style.display = 'none';
            const fileInput = document.getElementById('b3-custom-image');
            if (fileInput) fileInput.value = '';
            this.tempItemImageData = null;
        },

        confirmAddCustomItem() {
            const name  = (document.getElementById('b3-custom-item-name')?.value || '').trim();
            const price = parseInt(document.getElementById('b3-custom-item-price')?.value || '');
            if (!name)           { alert('請輸入物品名稱！'); return; }
            if (!this.tempItemImageData) { alert('圖片資料遺失，請重新上傳！'); return; }
            if (!price || price < 1 || price > 9999) { alert('請輸入 1～9999 之間的目標金額！'); return; }
            if (this.state.customItems.some(i => i.name === name)) { alert('物品名稱已存在，請使用不同的名稱！'); return; }
            this.state.customItems.push({ name, price, imageData: this.tempItemImageData, isCustom: true });
            this.closeCustomItemPreview();
            this._updateCustomItemsPanel();
            this._updateDaysPreview();
            Game.Speech.speak(`已新增自訂物品：${name}`);
        },

        removeCustomItem(index) {
            const item = this.state.customItems[index];
            if (!item) return;
            if (confirm(`確定要刪除「${item.name}」嗎？`)) {
                this.state.customItems.splice(index, 1);
                this._updateCustomItemsPanel();
                this._updateDaysPreview();
                Game.Speech.speak(`已移除：${item.name}`);
            }
        },

        _updateDaysPreview() {
            const preview = document.getElementById('b3-days-preview');
            if (!preview) return;
            const s = this.state.settings;
            const range = s.priceRange;
            const daily = s.dailyAmount;

            // Hide if not in easy mode context
            if (!range && this.state.customItems.length === 0) {
                preview.style.display = 'none';
                return;
            }

            const effectiveDaily = (!daily || daily === 'custom') ? null : (daily === 'auto' ? null : daily);

            // Build item pool
            const builtInInRange = range ? B3_ALL_ITEMS.filter(i => i.price <= range) : [];
            const customItems = this.state.customItems;

            // Lines to display
            const lines = [];

            if (range && effectiveDaily !== null) {
                if (builtInInRange.length > 0) {
                    const prices = builtInInRange.map(i => i.price);
                    const minDays = Math.ceil(Math.min(...prices) / effectiveDaily);
                    const maxDays = Math.ceil(Math.max(...prices) / effectiveDaily);
                    if (minDays === maxDays) {
                        lines.push(`📅 內建物品預計需要 <strong>${maxDays}</strong> 天`);
                    } else {
                        lines.push(`📅 內建物品預計需要 <strong>${minDays}～${maxDays}</strong> 天`);
                    }
                }
            } else if (range && daily === 'auto') {
                lines.push(`📅 每天存款金額由系統自動決定`);
            }

            if (customItems.length > 0 && effectiveDaily !== null) {
                customItems.forEach(i => {
                    const d = Math.ceil(i.price / effectiveDaily);
                    lines.push(`🎯 ${i.name}（${i.price}元）需要 <strong>${d}</strong> 天`);
                });
            } else if (customItems.length > 0 && daily === 'auto') {
                customItems.forEach(i => {
                    lines.push(`🎯 ${i.name}（${i.price}元）天數由系統決定`);
                });
            }

            if (lines.length === 0) {
                preview.style.display = 'none';
                return;
            }
            preview.innerHTML = lines.join('<br>');
            preview.style.display = '';
        },

        _checkCanStart() {
            const s = this.state.settings;
            const btn = document.getElementById('start-btn');
            if (!btn) return;
            if (!s.difficulty) { btn.disabled = true; return; }
            if (s.difficulty === 'easy') {
                btn.disabled = !s.priceRange || (s.dailyAmount === 'custom');
            } else if (s.difficulty === 'normal') {
                btn.disabled = !s.priceRange || !s.dailyAmount ||
                               s.dailyAmount === 'custom' || s.dailyAmount === 'preset-pending';
            } else {
                btn.disabled = !s.questionCount || !s.retryMode || !s.clickMode;
            }
        },

        // 普通模式設定頁天數預覽（寫入 #b3-n-days-preview）
        _updateNDaysPreview() {
            const preview = document.getElementById('b3-n-days-preview');
            if (!preview) return;
            const s = this.state.settings;
            const range = s.priceRange;
            const daily = s.dailyAmount;
            const effectiveDaily = (daily && typeof daily === 'number') ? daily : null;
            if (!effectiveDaily || !range) { preview.style.display = 'none'; return; }
            const items = B3_ALL_ITEMS.filter(i => i.price <= range);
            if (!items.length) { preview.style.display = 'none'; return; }
            const prices = items.map(i => i.price);
            const minDays = Math.ceil(Math.min(...prices) / effectiveDaily);
            const maxDays = Math.ceil(Math.max(...prices) / effectiveDaily);
            preview.innerHTML = minDays === maxDays
                ? `📅 預計需要 <strong>${maxDays}</strong> 天`
                : `📅 預計需要 <strong>${minDays}～${maxDays}</strong> 天`;
            preview.style.display = '';
        },

        // ── 9. 遊戲開始 ───────────────────────────────────────
        startGame() {
            Game.EventManager.removeByCategory('settings');
            Game.TimerManager.clearAll();
            this.state.isEndingGame = false;
            this.state.isProcessing  = false;

            if (this.state.settings.difficulty === 'easy' || this.state.settings.difficulty === 'normal') {
                this._startCalendarSession();
            } else {
                const s = this.state.settings;
                const q = this.state.quiz;
                q.currentQuestion = 0;
                q.totalQuestions  = s.questionCount;
                q.correctCount    = 0;
                q.streak          = 0;
                q.startTime       = Date.now();
                q.questions       = this._generateQuestions(s.questionCount);
                q.currentInput    = '';
                this.renderQuestion();
            }
        },

        // ── Easy Mode: Calendar Session ───────────────────────────────
        _startCalendarSession() {
            const s = this.state.settings;
            const maxPrice = s.priceRange || 400;
            const builtIn = B3_ALL_ITEMS.filter(i => i.price <= maxPrice);
            const customInRange = this.state.customItems.filter(i => i.price <= maxPrice);
            const pool    = customInRange.length > 0 || builtIn.length > 0
                ? [...customInRange, ...builtIn]
                : B3_ALL_ITEMS.slice(0, 3); // fallback if range too small
            const items = pool.slice().sort(() => Math.random() - 0.5);
            const item  = items[0];

            // Calculate daily amount (auto or user-set)
            let dailyAmount;
            if (!s.dailyAmount || s.dailyAmount === 'auto') {
                // Auto: aim for ~12-18 days, pick a round number
                const rawPerDay = item.price / 15;
                const niceAmounts = [10, 15, 20, 25, 30, 40, 50, 75, 100];
                dailyAmount = niceAmounts.find(a => a >= rawPerDay) || 100;
            } else {
                dailyAmount = s.dailyAmount;
            }

            // Start date
            let startDate;
            if (s.startDate) {
                startDate = new Date(s.startDate + 'T00:00:00');
            } else {
                startDate = new Date();
                startDate.setHours(0, 0, 0, 0);
            }

            this.state.calendar = {
                item,
                dailyAmount,
                accumulated: 0,
                denomPile: {},
                clickedDays: 0,
                startDate,
                startTime: Date.now(),
                drag: null,
            };

            this.renderCalendar();
            this._showCalendarTaskPopup();
        },

        _showCalendarTaskPopup() {
            const c = this.state.calendar;
            const daysNeeded = Math.ceil(c.item.price / c.dailyAmount);
            const overlay = document.createElement('div');
            overlay.className = 'b3-task-popup-overlay';
            overlay.innerHTML = `
        <div class="b3-task-popup">
            <div class="b3-task-popup-title">🎯 存錢目標</div>
            <div class="b3-task-item-icon-wrap">${this._itemIconHTML(c.item, '128px')}</div>
            <div class="b3-task-item-name">${c.item.name}</div>
            <div class="b3-task-item-price">需要 <strong>${c.item.price}</strong> 元</div>
            <div class="b3-task-meta">
                <span>💰 每天存 <strong>${c.dailyAmount}</strong> 元</span>
                <span>⏰ 預計 <strong>${daysNeeded}</strong> 天存到</span>
            </div>
            <button class="b3-task-start-btn" id="b3-task-start">開始存錢！🐷</button>
        </div>`;
            document.body.appendChild(overlay);
            Game.Speech.speak(`存錢目標，${c.item.name}，需要 ${c.item.price} 元`);
            document.getElementById('b3-task-start').addEventListener('click', () => {
                overlay.remove();
                Game.Speech.speak('開始存錢');
            });
        },

        renderCalendar() {
            Game.TimerManager.clearAll();
            Game.EventManager.removeByCategory('gameUI');
            this.state.isProcessing = false;

            const c = this.state.calendar;
            const pct = Math.min(100, Math.round((c.accumulated / c.item.price) * 100));
            const daysNeeded = Math.ceil(c.item.price / c.dailyAmount);
            const remaining = Math.max(0, c.item.price - c.accumulated);

            const app = document.getElementById('app');
            app.innerHTML = `
<div class="b-header">
    <div class="b-header-left"><span class="b-header-unit">🐷 存錢計畫</span></div>
    <div class="b-header-center">簡單模式・月曆存錢</div>
    <div class="b-header-right">
        <button class="b-reward-btn" onclick="if(typeof RewardLauncher!=='undefined'){RewardLauncher.open();}else{window.open('../reward/index.html','RewardSystem','width=1200,height=800');}">🎁 獎勵</button>
        <button class="b-back-btn" onclick="Game.showSettings()">返回設定</button>
    </div>
</div>
<div class="b3-cal-layout">
    <div class="b3-cal-center-col">
        <div class="b3-cal-info-card">
            <button class="b-inline-replay b3-cal-replay-btn" id="replay-speech-btn" title="重播語音">🔊</button>
            <div class="b3-cal-item-section">
                <div class="b3-cal-item-center-col">
                    <span class="b3-cal-item-icon-lg">${this._itemIconHTML(c.item, '128px')}</span>
                    <div class="b3-cal-item-title">${c.item.name}</div>
                    <div class="b3-cal-item-target">目標：${c.item.price} 元</div>
                </div>
                <div class="b3-cal-pct-badge" id="b3-cal-pct">${pct}%</div>
            </div>
            <div class="b3-cal-progress-section">
                <div class="b3-cal-prog-bar-wrap">
                    <div class="b3-cal-progress-fill" id="b3-cal-progress-fill" style="width:${pct}%"></div>
                </div>
                <div class="b3-cal-stats-center">
                    <div class="b3-cal-stats-line">已存 <span id="b3-cal-accumulated" class="b3-cal-acc-num">${c.accumulated}</span> 元、還需 <span id="b3-cal-remaining" class="b3-cal-rem-num">${remaining}</span> 元</div>
                    <div class="b3-cal-stat-sep">｜</div>
                    <div class="b3-cal-stats-line">每天存 ${c.dailyAmount} 元</div>
                    <div class="b3-cal-stat-sep">｜</div>
                    <div class="b3-cal-stats-line">共 ${daysNeeded} 天</div>
                    <div class="b3-cal-stat-sep">｜</div>
                    <div class="b3-cal-stats-line b3-days-left-line">距完成 <span id="b3-days-left" class="b3-days-left-num">${daysNeeded}</span> 天</div>
                    <div class="b3-est-date" id="b3-est-date">計算中…</div>
                </div>
            </div>
        </div>
        <div class="b3-cal-card" id="b3-calendar">${this._renderCalendarHTML()}</div>
    </div>
    <div class="b3-pig-col" id="b3-pig-col">
        <div class="b3-daily-card" id="b3-daily-card">
            <div class="b3-daily-header">今日可存金錢</div>
            <div class="b3-daily-subtitle" id="b3-daily-subtitle">點擊日曆上的存錢圖示開始</div>
            <div class="b3-daily-items" id="b3-daily-items"></div>
        </div>
        <div class="b3-pig-card" id="b3-pig-bank">
            <div id="b3-pig-drop-zone" class="b3-pig-drop-zone" style="display:none">
                <div class="b3-pig-drop-title">存入金錢區</div>
                <div class="b3-drop-slots" id="b3-drop-slots"></div>
            </div>
            <div id="b3-pig-content">${this._renderPiggyBankCard()}</div>
        </div>
    </div>
</div>`;

            this._bindCalendarEvents();
        },

        // ── 撲滿卡片 ──────────────────────────────────────────────

        // 將金額分解為各面額張數
        _decomposeToDenominations(amount) {
            const result = {};
            let rem = Math.max(0, Math.round(amount));
            for (const d of [1000, 500, 100, 50, 10, 5, 1]) {
                if (rem >= d) { result[d] = Math.floor(rem / d); rem %= d; }
            }
            return result;
        },

        _renderPiggyBankCard(changedDenoms) {
            const c     = this.state.calendar;
            const total = c.accumulated;
            changedDenoms = changedDenoms || {};
            const pile  = c.denomPile || {};

            const pctRing = c.item ? Math.min(100, Math.round((total / c.item.price) * 100)) : 0;
            const ringDeg = pctRing * 3.6;
            const pigSectionHd = `<div class="b3-pig-section-hd">
                <span class="b3-pig-section-title">🐷 我的撲滿</span>
                <div class="b3-progress-ring-wrap">
                    <div class="b3-progress-ring" id="b3-progress-ring" style="background:conic-gradient(#f59e0b ${ringDeg}deg, #e5e7eb ${ringDeg}deg)">
                        <div class="b3-progress-ring-inner"><span id="b3-ring-pct">${pctRing}%</span></div>
                    </div>
                </div>
                <span class="b3-pig-section-total"><strong>${total}</strong> 元</span>
            </div>`;

            if (total === 0) {
                return `${pigSectionHd}
                    <div class="b3-pig-empty">點擊日期開始存錢</div>`;
            }

            // 直接使用 denomPile（不自動兌換）
            const coinDenoms = [1, 5, 10, 50].filter(d => pile[d] > 0);
            const billDenoms = [100, 500, 1000].filter(d => pile[d] > 0);
            const hasBoth    = coinDenoms.length > 0 && billDenoms.length > 0;

            const renderRow = (denom, count) => {
                const isBill    = denom >= 100;
                const imgSize   = isBill ? '90px' : '55px';
                const thumbSize = isBill ? '40px' : '28px';
                const isChanged = !!changedDenoms[denom];
                let imgs = '';
                for (let i = 0; i < count; i++) {
                    const isNew = isChanged && (i === count - 1);
                    imgs += `<span class="b3-pig-img-wrap${isNew ? ' b3-pig-img-new' : ''}"><img src="../images/money/${denom}_yuan_front.png" style="width:${imgSize};height:auto;" draggable="false" alt="${denom}元"></span>`;
                }

                // 兌換按鈕
                const rule = EXCHANGE_RULES.find(r => r.from === denom && count >= r.count);
                const exchBtn = rule
                    ? `<button class="b3-pig-exch-btn" data-from="${rule.from}" data-count="${rule.count}" data-to="${rule.to}">🔄 ${rule.count}個${rule.from}元換1個${rule.to}元</button>`
                    : '';

                return `<div class="b3-pig-row">
                    <div class="b3-pig-row-label">
                        <img src="../images/money/${denom}_yuan_front.png" style="width:${thumbSize};height:auto;" draggable="false" alt="" class="b3-pig-row-thumb">
                        <span class="b3-pig-row-denom">${denom}元 ×${count}</span>
                    </div>
                    <div class="b3-pig-row-imgs">${imgs}</div>
                    ${exchBtn}
                </div>`;
            };

            const coinsRows = coinDenoms.map(d => renderRow(d, pile[d])).join('');
            const billsRows = billDenoms.map(d => renderRow(d, pile[d])).join('');

            return `${pigSectionHd}
                <div class="b3-pig-body">
                    ${coinDenoms.length ? `<div class="b3-pig-group">
                        <div class="b3-pig-group-hd">🪙 硬幣</div>
                        ${coinsRows}
                    </div>` : ''}
                    ${hasBoth ? '<div class="b3-pig-group-divider"></div>' : ''}
                    ${billDenoms.length ? `<div class="b3-pig-group">
                        <div class="b3-pig-group-hd">💵 紙鈔</div>
                        ${billsRows}
                    </div>` : ''}
                </div>`;
        },

        _updatePiggyBankCard(changedDenoms = {}) {
            const card = document.getElementById('b3-pig-content');
            if (!card) return;
            card.innerHTML = this._renderPiggyBankCard(changedDenoms);
        },

        _handleExchange(from, count, to) {
            const c = this.state.calendar;
            if ((c.denomPile[from] || 0) < count) return;
            c.denomPile[from] -= count;
            if (c.denomPile[from] === 0) delete c.denomPile[from];
            c.denomPile[to] = (c.denomPile[to] || 0) + 1;
            this._updatePiggyBankCard({ [to]: true });
            this.audio.play('coin');
            Game.Speech.speak(`${count}個${from}元換成1個${to}元`);
        },

        _renderCalendarHTML() {
            const c = this.state.calendar;
            const startDate = c.startDate;
            const year  = startDate.getFullYear();
            const month = startDate.getMonth();
            const startDay = startDate.getDate();
            const nextClickDay = startDay + c.clickedDays; // 1-based day number to click next

            // First day of month (0=Sun)
            const firstWeekday = new Date(year, month, 1).getDay();
            const daysInMonth  = new Date(year, month + 1, 0).getDate();

            const weekHeaders = ['日', '一', '二', '三', '四', '五', '六']
                .map(d => `<div class="b3-cal-weekday">${d}</div>`).join('');

            let cells = '';
            // Blank cells before first day
            for (let i = 0; i < firstWeekday; i++) {
                cells += `<div class="b3-cal-cell b3-cal-blank"></div>`;
            }
            for (let d = 1; d <= daysInMonth; d++) {
                let cls = 'b3-cal-cell';
                let inner = `<span class="b3-cal-day-num">${d}</span>`;
                if (d < startDay) {
                    cls += ' b3-cal-before';
                } else if (d < nextClickDay) {
                    // Already saved
                    cls += ' b3-cal-done';
                    inner += `<span class="b3-cal-saved-amt">+${c.dailyAmount}</span><span class="b3-cal-check">✓</span>`;
                } else if (d === nextClickDay) {
                    cls += ' b3-cal-active';
                    inner += `<span class="b3-cal-coin">🐷</span>`;
                } else {
                    cls += ' b3-cal-future';
                }
                cells += `<div class="${cls}" data-day="${d}">${inner}</div>`;
            }

            return `
<div class="b3-cal-month-header">${year}年${month + 1}月</div>
<div class="b3-cal-grid">
    ${weekHeaders}
    ${cells}
</div>`;
        },

        _updateCalendarUI(skipPigUpdate = false) {
            const c = this.state.calendar;
            const pct = Math.min(100, Math.round((c.accumulated / c.item.price) * 100));
            const remaining = Math.max(0, c.item.price - c.accumulated);
            const startDay = c.startDate.getDate();
            const justClickedDay = startDay + c.clickedDays - 1;
            const nextDay = startDay + c.clickedDays;
            const daysInMonth = new Date(c.startDate.getFullYear(), c.startDate.getMonth() + 1, 0).getDate();

            // Update info card numbers
            const accEl = document.getElementById('b3-cal-accumulated');
            if (accEl) accEl.textContent = c.accumulated;
            const fillEl = document.getElementById('b3-cal-progress-fill');
            if (fillEl) fillEl.style.width = pct + '%';
            const pctEl = document.getElementById('b3-cal-pct');
            if (pctEl) pctEl.textContent = pct + '%';
            const remEl = document.getElementById('b3-cal-remaining');
            if (remEl) remEl.textContent = remaining;
            // 進度環（Round 30）
            const ringEl = document.getElementById('b3-progress-ring');
            if (ringEl) {
                ringEl.style.background = `conic-gradient(#f59e0b ${pct * 3.6}deg, #e5e7eb ${pct * 3.6}deg)`;
                const ringLabelEl = document.getElementById('b3-ring-pct');
                if (ringLabelEl) ringLabelEl.textContent = pct + '%';
            }
            // 距完成天數 + 完成預測日期（Round 37）
            const daysLeftEl = document.getElementById('b3-days-left');
            const daysLeft   = remaining > 0 ? Math.ceil(remaining / (c.dailyAmount || 1)) : 0;
            if (daysLeftEl) {
                daysLeftEl.textContent = daysLeft;
                daysLeftEl.className = 'b3-days-left-num' + (daysLeft <= 3 ? ' near' : '');
            }
            const estDateEl = document.getElementById('b3-est-date');
            if (estDateEl) {
                if (remaining <= 0) {
                    estDateEl.textContent = '🎉 達標！';
                    estDateEl.className = 'b3-est-date reached';
                } else {
                    const today = new Date();
                    today.setDate(today.getDate() + daysLeft);
                    const mm = today.getMonth() + 1;
                    const dd = today.getDate();
                    estDateEl.textContent = `預計 ${mm}/${dd} 達標`;
                    estDateEl.className = 'b3-est-date' + (daysLeft <= 5 ? ' soon' : '');
                }
            }

            // Update clicked cell: active → done
            const clickedCell = document.querySelector(`.b3-cal-cell[data-day="${justClickedDay}"]`);
            if (clickedCell) {
                clickedCell.className = 'b3-cal-cell b3-cal-done';
                clickedCell.innerHTML = `<span class="b3-cal-day-num">${justClickedDay}</span><span class="b3-cal-saved-amt">+${c.dailyAmount}</span><span class="b3-cal-check">✓</span>`;
            }

            if (nextDay <= daysInMonth) {
                // Activate next cell in same month
                const nextCell = document.querySelector(`.b3-cal-cell[data-day="${nextDay}"]`);
                if (nextCell) {
                    nextCell.className = 'b3-cal-cell b3-cal-active';
                    nextCell.innerHTML = `<span class="b3-cal-day-num">${nextDay}</span><span class="b3-cal-coin">🐷</span>`;
                    Game.EventManager.on(nextCell, 'click', () => {
                        this._handleDayClick(nextDay);
                    }, {}, 'gameUI');
                }
            } else {
                // Advance to next month and full re-render
                c.startDate = new Date(c.startDate.getFullYear(), c.startDate.getMonth() + 1, 1);
                c.clickedDays = 0;
                this.renderCalendar();
                return;
            }
            if (!skipPigUpdate) this._updatePiggyBankCard();
            this.state.isProcessing = false;
        },

        _bindCalendarEvents() {
            document.querySelectorAll('.b3-cal-active').forEach(el => {
                Game.EventManager.on(el, 'click', () => {
                    this._handleDayClick(parseInt(el.dataset.day));
                }, {}, 'gameUI');
            });
            const replayBtn = document.getElementById('replay-speech-btn');
            if (replayBtn) {
                Game.EventManager.on(replayBtn, 'click', () => {
                    const text = this.state.calendar.lastSpeech;
                    if (text) Game.Speech.speak(text);
                }, {}, 'gameUI');
            }
            // 兌換按鈕：委派監聽（pig-content 重繪後仍有效）
            const pigContent = document.getElementById('b3-pig-content');
            if (pigContent) {
                Game.EventManager.on(pigContent, 'click', (e) => {
                    const btn = e.target.closest('.b3-pig-exch-btn');
                    if (!btn) return;
                    this._handleExchange(
                        parseInt(btn.dataset.from),
                        parseInt(btn.dataset.count),
                        parseInt(btn.dataset.to)
                    );
                }, {}, 'gameUI');
            }
        },

        _spawnCoinParticles(originEl, amount) {
            const denom = amount >= 100 ? 100 : amount >= 50 ? 50 : amount >= 10 ? 10 : amount >= 5 ? 5 : 1;
            const isBanknote = denom >= 100;
            const imgSize = isBanknote ? '36px' : '30px';
            const COUNT = 6;
            const rect = originEl ? originEl.getBoundingClientRect() : null;
            const cx = rect ? rect.left + rect.width  / 2 : window.innerWidth  / 2;
            const cy = rect ? rect.top  + rect.height / 2 : window.innerHeight / 2;
            for (let i = 0; i < COUNT; i++) {
                const span = document.createElement('span');
                const dx = (Math.random() - 0.5) * 80;          // -40 ~ +40 px 水平漂移
                const delay = i * 60;                            // 每粒間隔 60ms
                const dur   = 700 + Math.random() * 300;        // 700~1000ms
                span.innerHTML = `<img src="../images/money/${denom}_yuan_front.png" style="width:${imgSize};height:auto;display:block;" draggable="false">`;
                span.style.cssText = [
                    'position:fixed',
                    `left:${cx}px`,
                    `top:${cy}px`,
                    'pointer-events:none',
                    'z-index:99999',
                    'user-select:none',
                    `--b3-dx:${dx}px`,
                    `animation:b3CoinFloat ${dur}ms ease-out ${delay}ms both`,
                ].join(';');
                document.body.appendChild(span);
                Game.TimerManager.setTimeout(() => { span.remove(); }, dur + delay + 100, 'coinFloat');
            }
        },

        _getMoneyImagesHTML(amount) {
            const DENOMS = [100, 50, 10, 5, 1];
            const imgs = [];
            let rem = amount;
            for (const d of DENOMS) {
                while (rem >= d && imgs.length < 3) {
                    const isBanknote = d >= 100;
                    const w = isBanknote ? '64px' : '56px';
                    imgs.push(`<img src="../images/money/${d}_yuan_front.png" style="width:${w};height:auto;" draggable="false" alt="${d}元">`);
                    rem -= d;
                }
                if (imgs.length >= 3) break;
            }
            return imgs.join('');
        },

        _handleDayClick(day) {
            if (this.state.isProcessing) return;
            this.state.isProcessing = true;
            this.audio.play('click');
            const c = this.state.calendar;
            const month = c.startDate.getMonth() + 1;
            const dayNum = c.clickedDays + 1;
            const diff = this.state.settings.difficulty;
            Game.Speech.speak(`${month}月${day}日，第${dayNum}天`, () => {
                if (diff === 'normal') {
                    this._startNormalDragSession(day);
                } else {
                    this._startDragSession(day);
                }
            });
        },

        // ── 拖曳存錢工作階段 ─────────────────────────────────────

        // 將金額展開為面額項目陣列（從大到小）
        _decomposeToDenomItems(amount) {
            const items = [];
            let rem = Math.max(0, Math.round(amount));
            for (const d of [1000, 500, 100, 50, 10, 5, 1]) {
                const count = Math.floor(rem / d);
                rem %= d;
                for (let i = 0; i < count; i++) {
                    items.push({ denom: d, slotIdx: items.length });
                }
            }
            return items;
        },

        _startDragSession(day) {
            const c = this.state.calendar;
            const items = this._decomposeToDenomItems(c.dailyAmount);
            c.drag = { dayBeingSaved: day, items, placedCount: 0, placedAmount: 0 };

            const pigBank = document.getElementById('b3-pig-bank');
            if (!pigBank) return;

            // 在既有的「今日可存金錢」卡片填入金錢圖示
            const subtitle = document.getElementById('b3-daily-subtitle');
            const itemsContainer = document.getElementById('b3-daily-items');
            if (subtitle) subtitle.style.display = 'none';
            if (itemsContainer) itemsContainer.innerHTML = this._renderDailyItemsHTML(items);

            // 顯示「存入金錢區」放置槽
            const dropZone = document.getElementById('b3-pig-drop-zone');
            const slotsContainer = document.getElementById('b3-drop-slots');
            if (slotsContainer) slotsContainer.innerHTML = this._renderDropZoneHTML(items);
            if (dropZone) dropZone.style.display = '';

            const speechText = `今天可以存${toTWD(c.dailyAmount)}`;
            c.lastSpeech = speechText;
            Game.Speech.speak(speechText);

            this._initCalendarDragAndDrop();
        },

        _renderDailyItemsHTML(items) {
            return items.map(item => {
                const isBill  = item.denom >= 100;
                const imgSize = isBill ? '80px' : '58px';
                return `<div class="b3-drag-coin" draggable="true"
                             data-denom="${item.denom}" data-slot-idx="${item.slotIdx}"
                             id="b3-drag-coin-${item.slotIdx}">
                    <img src="../images/money/${item.denom}_yuan_front.png"
                         style="width:${imgSize};height:auto;" draggable="false" alt="${item.denom}元">
                </div>`;
            }).join('');
        },

        _renderDropZoneHTML(items) {
            return items.map(item => {
                const isBill  = item.denom >= 100;
                const imgSize = isBill ? '80px' : '58px';
                return `<div class="b3-drop-slot" data-denom="${item.denom}" data-slot-idx="${item.slotIdx}">
                    <img src="../images/money/${item.denom}_yuan_front.png"
                         style="width:${imgSize};height:auto;" draggable="false" alt="${item.denom}元">
                </div>`;
            }).join('');
        },

        _initCalendarDragAndDrop() {
            // 桌面 HTML5 拖曳
            document.querySelectorAll('.b3-drag-coin').forEach(coin => {
                Game.EventManager.on(coin, 'dragstart', (e) => {
                    coin.classList.add('b3-dragging');
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/plain', JSON.stringify({
                        denom:   parseInt(coin.dataset.denom),
                        slotIdx: parseInt(coin.dataset.slotIdx),
                    }));
                    const img = coin.querySelector('img');
                    if (img && e.dataTransfer.setDragImage) {
                        // 使用 CSS 顯示尺寸（非 naturalWidth）避免偏移過大
                        const rect = img.getBoundingClientRect();
                        const iw = rect.width  || parseInt(img.style.width)  || 58;
                        const ih = rect.height || parseInt(img.style.width)  || 58;
                        e.dataTransfer.setDragImage(img, iw / 2, ih / 2);
                    }
                }, {}, 'gameUI');
                Game.EventManager.on(coin, 'dragend', () => {
                    coin.classList.remove('b3-dragging');
                }, {}, 'gameUI');
            });

            document.querySelectorAll('.b3-drop-slot').forEach(slot => {
                Game.EventManager.on(slot, 'dragover', (e) => {
                    if (!slot.classList.contains('b3-slot-filled')) {
                        e.preventDefault();
                        slot.classList.add('b3-drop-hover');
                    }
                }, {}, 'gameUI');
                Game.EventManager.on(slot, 'dragleave', () => {
                    slot.classList.remove('b3-drop-hover');
                }, {}, 'gameUI');
                Game.EventManager.on(slot, 'drop', (e) => {
                    e.preventDefault();
                    slot.classList.remove('b3-drop-hover');
                    if (slot.classList.contains('b3-slot-filled')) return;
                    try {
                        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
                        this._handleCoinDrop(data.denom, data.slotIdx, slot);
                    } catch(err) {}
                }, {}, 'gameUI');
            });

            // 觸控支援（TouchDragUtility）
            if (window.TouchDragUtility) {
                const pigCol = document.getElementById('b3-pig-col');
                if (pigCol) {
                    window.TouchDragUtility.cleanupAll?.();
                    window.TouchDragUtility.registerDraggable(pigCol, '.b3-drag-coin', {
                        onDragStart: (el) => !el.classList.contains('b3-coin-placed'),
                        onDrop: (draggedEl, dropZone) => {
                            if (!dropZone?.classList.contains('b3-drop-slot')) return;
                            if (dropZone.classList.contains('b3-slot-filled')) return;
                            this._handleCoinDrop(
                                parseInt(draggedEl.dataset.denom),
                                parseInt(draggedEl.dataset.slotIdx),
                                dropZone
                            );
                        },
                    });
                    document.querySelectorAll('.b3-drop-slot').forEach(slot => {
                        window.TouchDragUtility.registerDropZone(slot);
                    });
                }
            }
        },

        // ── 普通模式：自由組合面額拖曳 ──────────────────────────

        _startNormalDragSession(day) {
            const c = this.state.calendar;
            const targetAmount = c.dailyAmount;

            // 可用面額：所有 ≤ targetAmount 的面額，加上「下一個較大面額」
            const ALL_DENOMS = [1, 5, 10, 50, 100, 500, 1000];
            const smaller = ALL_DENOMS.filter(d => d <= targetAmount);
            const nextLarger = ALL_DENOMS.find(d => d > targetAmount);
            const availDenoms = nextLarger ? [...smaller, nextLarger] : smaller;
            if (!availDenoms.length) availDenoms.push(1);

            c.drag = {
                dayBeingSaved: day,
                mode: 'normal',
                targetAmount,
                placedItems: [],  // [{ denom, uid }]
                placedTotal: 0,
                availDenoms,
                items: [],        // 完成後填入，供 _completeDragSession 使用
                errorCount: 0,
            };

            const pigBank = document.getElementById('b3-pig-bank');
            if (!pigBank) return;

            // 更新「今日可存金錢」卡片：顯示大數字 + 面額選項
            this._updateNormalDailyCard();

            // 顯示放置區
            const dropZone = document.getElementById('b3-pig-drop-zone');
            const slotsContainer = document.getElementById('b3-drop-slots');
            if (slotsContainer) slotsContainer.innerHTML = this._renderNormalDropZoneHTML();
            if (dropZone) dropZone.style.display = '';

            const speechText = `今天要存${toTWD(targetAmount)}，請選擇正確的面額`;
            c.lastSpeech = speechText;
            Game.Speech.speak(speechText);

            this._initNormalDragAndDrop();
            this.state.isProcessing = false;
        },

        _updateNormalDailyCard() {
            const c = this.state.calendar;
            const drag = c.drag;
            const subtitle = document.getElementById('b3-daily-subtitle');
            const itemsContainer = document.getElementById('b3-daily-items');
            if (subtitle) subtitle.style.display = 'none';
            if (!itemsContainer) return;
            itemsContainer.innerHTML = `
<div class="b3-normal-target-wrap">
    <div class="b3-normal-target-amount">${drag.targetAmount}</div>
    <div class="b3-normal-target-unit">元</div>
</div>
<div class="b3-normal-denom-sources">
    ${drag.availDenoms.map(d => {
        const isBill = d >= 100;
        const imgSize = isBill ? '72px' : '54px';
        return `<div class="b3-ndrag-denom" draggable="true" data-denom="${d}">
            <img src="../images/money/${d}_yuan_front.png" style="width:${imgSize};height:auto;" draggable="false" alt="${d}元">
            <div class="b3-ndrag-label">${d}元</div>
        </div>`;
    }).join('')}
</div>`;
        },

        _renderNormalDropZoneHTML() {
            const c = this.state.calendar;
            const drag = c.drag;
            if (!drag || drag.mode !== 'normal') return '';
            const total = drag.placedTotal;
            const target = drag.targetAmount;

            // 依面額分組顯示
            const denomCounts = {};
            drag.placedItems.forEach(({ denom }) => {
                denomCounts[denom] = (denomCounts[denom] || 0) + 1;
            });
            const placedHTML = Object.keys(denomCounts).length
                ? Object.entries(denomCounts).map(([denom, count]) => {
                    const d = parseInt(denom);
                    const isBill = d >= 100;
                    const imgSize = isBill ? '56px' : '44px';
                    return `<div class="b3-nplaced-row">
                        <img src="../images/money/${d}_yuan_front.png" style="width:${imgSize};height:auto;" draggable="false" alt="${d}元">
                        <span class="b3-nplaced-count">×${count}</span>
                    </div>`;
                }).join('')
                : `<div class="b3-nplace-hint">拖曳或點擊面額放入此處</div>`;

            const totalColor = total === target ? '#16a34a' : total > target ? '#dc2626' : '#1e40af';
            const confirmDisabled = total <= 0 ? 'disabled' : '';
            return `
<div class="b3-normal-placed-area" id="b3-normal-placed-area">${placedHTML}</div>
<div class="b3-normal-total-row">
    <span>已存：</span><span id="b3-n-total" style="color:${totalColor};font-weight:900;">${total} 元</span>
    <span> / 目標：${target} 元</span>
</div>
<div class="b3-normal-action-row">
    <button class="b3-normal-clear-btn" id="b3-normal-clear-btn">🗑️ 清除</button>
    <button class="b3-normal-confirm-btn" id="b3-normal-confirm-btn" ${confirmDisabled}>✅ 確認</button>
</div>`;
        },

        _initNormalDragAndDrop() {
            // 1. HTML5 拖曳：來源面額（drag source tiles）
            document.querySelectorAll('.b3-ndrag-denom').forEach(tile => {
                Game.EventManager.on(tile, 'dragstart', (e) => {
                    tile.classList.add('b3-ndragging');
                    e.dataTransfer.effectAllowed = 'copy';
                    e.dataTransfer.setData('text/plain', JSON.stringify({ denom: parseInt(tile.dataset.denom) }));
                    const img = tile.querySelector('img');
                    if (img && e.dataTransfer.setDragImage) {
                        const rect = img.getBoundingClientRect();
                        const iw = rect.width || 54;
                        const ih = rect.height || 54;
                        e.dataTransfer.setDragImage(img, iw / 2, ih / 2);
                    }
                }, {}, 'gameUI');
                Game.EventManager.on(tile, 'dragend', () => tile.classList.remove('b3-ndragging'), {}, 'gameUI');
                // 點擊也能新增
                Game.EventManager.on(tile, 'click', () => {
                    this._handleNormalDrop(parseInt(tile.dataset.denom));
                }, {}, 'gameUI');
            });

            // 2. 觸控支援（TouchDragUtility）
            if (window.TouchDragUtility) {
                const pigCol = document.getElementById('b3-pig-col');
                if (pigCol) {
                    window.TouchDragUtility.cleanupAll?.();
                    window.TouchDragUtility.registerDraggable(pigCol, '.b3-ndrag-denom', {
                        onDragStart: () => true,
                        onDrop: (draggedEl) => {
                            this._handleNormalDrop(parseInt(draggedEl.dataset.denom));
                        },
                    });
                }
                // 登記整個「存入金錢區」容器為 drop zone（持久存在，不被 DOM 更新破壞）
                // 作為 b3-normal-placed-area 之外的 fallback（手指落在合計列/按鈕區時仍能觸發）
                const pigDropZone = document.getElementById('b3-pig-drop-zone');
                if (pigDropZone) window.TouchDragUtility.registerDropZone(pigDropZone);
            }

            // 3. 放置區事件（每次 DOM 更新後需重綁）
            this._bindNormalDropZoneEvents();
        },

        _bindNormalDropZoneEvents() {
            // 放置區：直接綁定到 b3-normal-placed-area（HTML5 dragover 必須在目標元素上 preventDefault）
            const dropZone = document.getElementById('b3-normal-placed-area');
            if (dropZone) {
                Game.EventManager.on(dropZone, 'dragover', (e) => {
                    e.preventDefault();
                    dropZone.classList.add('b3-ndrop-hover');
                }, {}, 'gameUI');
                Game.EventManager.on(dropZone, 'dragleave', (e) => {
                    if (!dropZone.contains(e.relatedTarget)) {
                        dropZone.classList.remove('b3-ndrop-hover');
                    }
                }, {}, 'gameUI');
                Game.EventManager.on(dropZone, 'drop', (e) => {
                    e.preventDefault();
                    dropZone.classList.remove('b3-ndrop-hover');
                    try {
                        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
                        if (data.denom) this._handleNormalDrop(data.denom);
                    } catch(err) {}
                }, {}, 'gameUI');
                // 觸控放置區（每次更新後重新登記新元素）
                if (window.TouchDragUtility) {
                    window.TouchDragUtility.registerDropZone(dropZone);
                }
            }
            const confirmBtn = document.getElementById('b3-normal-confirm-btn');
            if (confirmBtn) Game.EventManager.on(confirmBtn, 'click', () => this._confirmNormalDeposit(), {}, 'gameUI');
            const clearBtn = document.getElementById('b3-normal-clear-btn');
            if (clearBtn) Game.EventManager.on(clearBtn, 'click', () => this._clearNormalDropZone(), {}, 'gameUI');
        },

        _handleNormalDrop(denom) {
            const c = this.state.calendar;
            if (!c.drag || c.drag.mode !== 'normal') return;
            if (this.state.isProcessing) return;
            const newTotal = c.drag.placedTotal + denom;
            const target = c.drag.targetAmount;
            if (newTotal > target) {
                this.audio.play('error');
                Game.Speech.speak(`放太多了！目標是${toTWD(target)}`);
                return;
            }
            this.audio.play('coin');
            const uid = Date.now() + '_' + Math.random().toString(36).slice(2, 7);
            c.drag.placedItems.push({ denom, uid });
            c.drag.placedTotal = newTotal;
            this._updateNormalDropZone();
        },

        _updateNormalDropZone() {
            const slotsContainer = document.getElementById('b3-drop-slots');
            if (slotsContainer) slotsContainer.innerHTML = this._renderNormalDropZoneHTML();
            this._bindNormalDropZoneEvents();
        },

        _clearNormalDropZone() {
            const c = this.state.calendar;
            if (!c.drag || c.drag.mode !== 'normal') return;
            c.drag.placedItems = [];
            c.drag.placedTotal = 0;
            this._updateNormalDropZone();
        },

        _confirmNormalDeposit() {
            const c = this.state.calendar;
            if (!c.drag || c.drag.mode !== 'normal') return;
            if (this.state.isProcessing) return;
            const { placedTotal, targetAmount } = c.drag;
            if (placedTotal === targetAmount) {
                this.state.isProcessing = true;
                this.audio.play('correct');
                // 移除提示高亮
                document.querySelectorAll('.b3-ndrag-hint').forEach(el => el.classList.remove('b3-ndrag-hint'));
                c.drag.items = c.drag.placedItems.map((item, i) => ({ denom: item.denom, slotIdx: i }));
                c.drag.placedCount = c.drag.items.length;
                c.drag.placedAmount = placedTotal;
                Game.Speech.speak(`存入${toTWD(targetAmount)}，正確！`, () => {
                    this._completeDragSession();
                });
            } else if (placedTotal > targetAmount) {
                c.drag.errorCount++;
                this.audio.play('error');
                Game.Speech.speak(`存入太多了，目標是${toTWD(targetAmount)}，請重新選擇`);
                this._clearNormalDropZone();
                if (c.drag.errorCount >= 3) this._showNormalDepositHint();
            } else {
                c.drag.errorCount++;
                this.audio.play('error');
                Game.Speech.speak(`還差${toTWD(targetAmount - placedTotal)}元，請繼續放入`);
                if (c.drag.errorCount >= 3) this._showNormalDepositHint();
            }
        },

        _showNormalDepositHint() {
            const c = this.state.calendar;
            if (!c.drag) return;
            const target = c.drag.targetAmount;
            // 貪婪分解最佳面額組合
            const ALL_DENOMS = [1000, 500, 100, 50, 10, 5, 1];
            let remaining = target;
            const hintMap = {};
            ALL_DENOMS.forEach(d => {
                if (remaining >= d) {
                    hintMap[d] = Math.floor(remaining / d);
                    remaining %= d;
                }
            });
            // 高亮對應面額格子（脈動動畫）
            document.querySelectorAll('.b3-ndrag-denom').forEach(tile => {
                const d = parseInt(tile.dataset.denom);
                if (hintMap[d]) tile.classList.add('b3-ndrag-hint');
            });
            // 語音提示
            const parts = Object.entries(hintMap)
                .filter(([, cnt]) => cnt > 0)
                .sort(([a], [b]) => b - a)
                .map(([d, cnt]) => `${d}元${cnt > 1 ? cnt + '個' : ''}`);
            Game.Speech.speak(`提示：可以用 ${parts.join('、')} 組合成${toTWD(target)}`);
        },

        // ── Easy 模式：對應槽位放置 ──────────────────────────────

        _handleCoinDrop(denom, slotIdx, targetSlot) {
            const c = this.state.calendar;
            if (!c.drag) return;
            const targetDenom = parseInt(targetSlot.dataset.denom);
            if (denom !== targetDenom) {
                this.audio.play('error');
                targetSlot.classList.add('b3-drop-wrong');
                Game.TimerManager.setTimeout(() => targetSlot.classList.remove('b3-drop-wrong'), 500, 'ui');
                return;
            }
            // 填充槽位
            this.audio.play('coin');
            targetSlot.classList.add('b3-slot-filled');
            const check = document.createElement('div');
            check.className = 'b3-slot-check';
            check.textContent = '✓';
            targetSlot.appendChild(check);

            // 隱藏來源金錢圖示
            const sourceCoin = document.getElementById(`b3-drag-coin-${slotIdx}`);
            if (sourceCoin) sourceCoin.classList.add('b3-coin-placed');

            c.drag.placedCount++;
            c.drag.placedAmount += denom;
            const isLast = c.drag.placedCount >= c.drag.items.length;
            if (isLast) {
                Game.Speech.speak(`存入${toTWD(c.drag.placedAmount)}`, () => {
                    this._completeDragSession();
                });
            } else {
                Game.Speech.speak(`存入${toTWD(c.drag.placedAmount)}`);
            }
        },

        _completeDragSession() {
            const c = this.state.calendar;
            if (!c.drag) return;
            const draggedItems = c.drag.items; // 存起來，下面 c.drag = null 後仍可用
            c.drag = null;

            this.audio.play('correct');
            const pigBank = document.getElementById('b3-pig-bank');
            this._spawnCoinParticles(pigBank, c.dailyAmount);

            const prevAccum = c.accumulated;
            c.accumulated += c.dailyAmount;
            c.clickedDays++;

            // 里程碑偵測（25 / 50 / 75 %）
            const prevPct = Math.floor(prevAccum / c.item.price * 100);
            const newPct  = Math.floor(c.accumulated / c.item.price * 100);
            const crossed = [25, 50, 75].find(m => prevPct < m && newPct >= m);
            if (crossed) this._showMilestoneBadge(crossed);

            // 存錢粒子特效（Round 38）
            this._showSavingsSparkle();

            // 更新 denomPile（不做自動兌換，逐枚加入）
            const changedDenoms = {};
            draggedItems.forEach(item => {
                c.denomPile[item.denom] = (c.denomPile[item.denom] || 0) + 1;
                changedDenoms[item.denom] = true;
            });

            // 清除來源卡片金錢圖示，恢復提示文字
            const subtitle = document.getElementById('b3-daily-subtitle');
            const itemsContainer = document.getElementById('b3-daily-items');
            if (itemsContainer) itemsContainer.innerHTML = '';
            if (subtitle) subtitle.style.display = '';

            // 立即隱藏「存入金錢區」
            const dropZone = document.getElementById('b3-pig-drop-zone');
            const slotsContainer = document.getElementById('b3-drop-slots');
            if (dropZone) dropZone.style.display = 'none';
            if (slotsContainer) slotsContainer.innerHTML = '';

            // 立即更新撲滿（不等語音完成，顯示新增面額動畫）
            this._updatePiggyBankCard(changedDenoms);

            const reached   = c.accumulated >= c.item.price;
            if (reached) {
                const speechText = `太棒了！存到${toTWD(c.accumulated)}了，可以買${c.item.name}了！`;
                c.lastSpeech = speechText;
                Game.Speech.speak(speechText, () => {
                    this.state.isProcessing = false;
                    Game.TimerManager.setTimeout(() => this._onCalendarGoalReached(), 400, 'turnTransition');
                });
            } else {
                this._updateCalendarUI(true); // pig already updated
                const remaining = Math.max(0, c.item.price - c.accumulated);
                const daysLeft  = Math.ceil(remaining / c.dailyAmount);
                const speechText = `存入${toTWD(c.dailyAmount)}！還差${toTWD(remaining)}，再存${daysLeft}天就達標了！`;
                c.lastSpeech = speechText;
                Game.Speech.speak(speechText);
                this._showCountdownHint(remaining, daysLeft);
            }
        },

        // ── 倒數提示浮動卡（B1 _showExactMatchToast pattern）─────
        _showCountdownHint(remaining, daysLeft) {
            const prev = document.getElementById('b3-countdown-hint');
            if (prev) prev.remove();
            const hint = document.createElement('div');
            hint.id = 'b3-countdown-hint';
            hint.className = 'b3-countdown-hint';
            hint.innerHTML = `<span class="b3-cd-num">${remaining}</span><span class="b3-cd-label">元・再存 ${daysLeft} 天</span>`;
            document.body.appendChild(hint);
            Game.TimerManager.setTimeout(() => {
                hint.classList.add('b3-cd-fade');
                Game.TimerManager.setTimeout(() => { if (hint.parentNode) hint.remove(); }, 400, 'ui');
            }, 2000, 'ui');
        },

        // ── 存錢粒子特效（Round 38）──────────────────────────────
        _showSavingsSparkle() {
            const emojis = ['✨', '💫', '⭐', '🌟', '💰'];
            const pigBank = document.getElementById('b3-pig-bank');
            const rect = pigBank ? pigBank.getBoundingClientRect() : null;
            const baseLeft = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
            const baseTop  = rect ? rect.top : window.innerHeight / 2;
            for (let i = 0; i < 5; i++) {
                const sp = document.createElement('div');
                sp.className = 'b3-sparkle';
                sp.textContent = emojis[i % emojis.length];
                sp.style.cssText = `left:${baseLeft - 40 + Math.random() * 80}px;top:${baseTop + Math.random() * 30}px;animation-delay:${Math.random() * 0.25}s;position:fixed;`;
                document.body.appendChild(sp);
                Game.TimerManager.setTimeout(() => sp.remove(), 1400, 'ui');
            }
        },

        _showMilestoneBadge(pct) {
            const existing = document.getElementById('b3-milestone-badge');
            if (existing) existing.remove();
            const labels  = { 25: '存了四分之一！🎉', 50: '存了一半！🌟', 75: '快到了！💪' };
            const speeches = { 25: '太棒了！已經存了四分之一！', 50: '好棒！已經存了一半了！', 75: '快到了！再加油！' };
            const badge = document.createElement('div');
            badge.id = 'b3-milestone-badge';
            badge.className = 'b3-milestone-badge';
            badge.innerHTML = `<span class="b3-milestone-pct">${pct}%</span><span>${labels[pct]}</span>`;
            document.body.appendChild(badge);
            this.audio.play('correct');
            Game.TimerManager.setTimeout(() => Game.Speech.speak(speeches[pct]), 200, 'ui'); // 里程碑語音（Round 35）
            Game.TimerManager.setTimeout(() => {
                if (document.body.contains(badge)) badge.remove();
            }, 2200, 'ui');
        },

        _onCalendarGoalReached() {
            if (this.state.isEndingGame) return;
            this.state.isEndingGame = true;

            const c = this.state.calendar;
            const elapsed = c.startTime ? (Date.now() - c.startTime) : 0;
            const mins = Math.floor(elapsed / 60000);
            const secs = Math.floor((elapsed % 60000) / 1000);

            const app = document.getElementById('app');
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
            app.style.overflow = 'auto'; app.style.height = 'auto'; app.style.minHeight = '100vh';

            // ── 第一畫面：達成存錢目標 ──
            app.innerHTML = `
<div class="b-res-wrapper">
    <div class="b-res-screen">
        <div class="b-res-header">
            <div class="b-res-trophy" style="font-size:3rem;animation:none;">🎉</div>
            <h1 class="b-res-title">達成存錢目標！</h1>
        </div>
        <div class="b-res-container">
            <div class="b3-cal-success-item">
                <span class="b3-cal-success-icon">${this._itemIconHTML(c.item, '160px')}</span>
                <div class="b3-cal-success-name">${c.item.name} 買到了！</div>
                <div class="b3-cal-success-price">${c.item.price} 元</div>
            </div>
            <div class="b-res-grid" style="grid-template-columns:1fr 1fr;">
                <div class="b-res-card b-res-card-1">
                    <div class="b-res-icon">📅</div>
                    <div class="b-res-label">存錢天數</div>
                    <div class="b-res-value">${c.clickedDays} 天</div>
                </div>
                <div class="b-res-card b-res-card-2">
                    <div class="b-res-icon">💰</div>
                    <div class="b-res-label">每天存款</div>
                    <div class="b-res-value">${c.dailyAmount} 元</div>
                </div>
            </div>
            <div class="b-res-btns">
                <button id="b3-view-summary-btn" class="b-res-play-btn">
                    <span class="btn-icon">📊</span><span class="btn-text">查看測驗總結</span>
                </button>
            </div>
        </div>
    </div>
</div>`;

            Game.EventManager.on(document.getElementById('b3-view-summary-btn'), 'click', () => {
                Game.EventManager.removeByCategory('gameUI');
                // ── 第二畫面：測驗總結 ──
                app.innerHTML = `
<div class="b-res-wrapper">
    <div class="b-res-screen">
        <div class="b-res-header">
            <div class="b-res-trophy">🏆</div>
            <div class="b-res-title-row">
                <img src="../images/index/educated_money_bag_character.png"
                     class="b-res-mascot" alt="金錢小助手" onerror="this.style.display='none'">
                <h1 class="b-res-title">🎉 存錢成功！🎉</h1>
                <span class="b-res-mascot-spacer"></span>
            </div>
        </div>
        <div class="b-res-reward-wrap">
            <a href="#" id="endgame-reward-link" class="b-res-reward-link">
                🎁 開啟獎勵系統
            </a>
        </div>
        <div class="b-res-container">
            <div class="b-res-grid" style="grid-template-columns:1fr 1fr;">
                <div class="b-res-card b-res-card-1">
                    <div class="b-res-icon">✅</div>
                    <div class="b-res-label">完成天數</div>
                    <div class="b-res-value">${c.clickedDays} 天</div>
                </div>
                <div class="b-res-card b-res-card-2">
                    <div class="b-res-icon">⏱️</div>
                    <div class="b-res-label">完成時間</div>
                    <div class="b-res-value">${mins > 0 ? mins + '分' : ''}${secs}秒</div>
                </div>
            </div>
            <div class="b-res-perf-section">
                <h3>📊 表現評價</h3>
                <div class="b-res-perf-badge" style="background:#f59e0b;">
                    🏆 完成了 ${c.clickedDays} 天，成功存到夢想物品！
                </div>
            </div>
            <div class="b-res-achievements">
                <h3>🏆 學習成果</h3>
                <div class="b-res-ach-list">
                    <div class="b-res-ach-item">✅ 了解每天存錢的重要性</div>
                    <div class="b-res-ach-item">✅ 體驗為目標存錢的過程</div>
                    <div class="b-res-ach-item">✅ 學習累積存款達成夢想</div>
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
                this._fireConfetti();
                Game.TimerManager.setTimeout(() => Game.Speech.speak('存錢成功，繼續加油！'), 300, 'speech');
            }, {}, 'gameUI');

            Game.TimerManager.setTimeout(() => {
                document.getElementById('success-sound')?.play();
                this._fireConfetti();
            }, 100, 'confetti');
            Game.TimerManager.setTimeout(() => {
                Game.Speech.speak(`太棒了！你只用了${c.clickedDays}天就存到了${toTWD(c.item.price)}，買到了${c.item.name}！`);
            }, 800, 'speech');
        },

        // ── 10. 題目產生 ──────────────────────────────────────
        _generateQuestions(count) {
            const diff    = this.state.settings.difficulty;
            const cat     = this.state.settings.itemCat || 'all';
            const builtIn = B3_ITEMS_BY_DIFF[diff];
            const filtered = (cat && cat !== 'all') ? builtIn.filter(i => i.cat === cat) : builtIn;
            const catPool  = filtered.length >= 2 ? filtered : builtIn; // fallback if too few
            const pool    = this.state.customItems.length > 0
                ? [...this.state.customItems, ...catPool]
                : catPool;
            const items   = pool.slice().sort(() => Math.random() - 0.5);
            const weekly  = B3_WEEKLY_OPTIONS[diff];
            const result  = [];

            for (let i = 0; i < count; i++) {
                const item   = items[i % items.length];
                const wkAmt  = weekly[Math.floor(Math.random() * weekly.length)];
                const answer = Math.ceil(item.price / wkAmt);
                const choices = diff === 'easy' ? this._generateChoices(answer) : null;
                result.push({ item, weekly: wkAmt, answer, choices });
            }
            return result;
        },

        _generateChoices(correct) {
            const opts = new Set([correct]);
            let attempts = 0;
            while (opts.size < 3 && attempts < 60) {
                attempts++;
                const delta = Math.floor(Math.random() * 4) + 1;
                const candidate = Math.random() < 0.5 ? correct + delta : Math.max(1, correct - delta);
                if (candidate > 0 && candidate !== correct) opts.add(candidate);
            }
            return Array.from(opts).sort(() => Math.random() - 0.5);
        },

        // ── 存錢目標開題彈窗（B2 _showTaskIntroModal pattern）─────
        _showSavingsGoalModal(question) {
            document.getElementById('b3-goal-modal')?.remove();
            const modal = document.createElement('div');
            modal.id = 'b3-goal-modal';
            modal.className = 'b3-goal-modal';
            modal.innerHTML = `
                <div class="b3-goal-modal-inner">
                    <div class="b3-goal-modal-icon">${this._itemIconHTML(question.item, '80px')}</div>
                    <div class="b3-goal-modal-name">${question.item.name}</div>
                    <div class="b3-goal-modal-price">${question.item.price} 元</div>
                    <div class="b3-goal-modal-tap">點任意處繼續</div>
                </div>`;
            document.body.appendChild(modal);
            Game.Speech.speak(`存錢目標：${question.item.name}，${question.item.price}元`);
            modal.addEventListener('click', () => modal.remove());
            Game.TimerManager.setTimeout(() => {
                if (document.body.contains(modal)) modal.remove();
            }, 2500, 'ui');
        },

        // ── 11. 題目渲染 ──────────────────────────────────────
        renderQuestion() {
            Game.TimerManager.clearAll();
            Game.EventManager.removeByCategory('gameUI');
            AssistClick.deactivate();
            this.state.isProcessing  = false;
            this.state.quiz.currentInput = '';

            const q   = this.state.quiz;
            const app = document.getElementById('app');
            app.innerHTML = this._renderQuestionHTML(q.questions[q.currentQuestion]);
            this._bindQuestionEvents(q.questions[q.currentQuestion]);

            // 開題存錢目標彈窗（B2 _showTaskIntroModal pattern）
            const question = this.state.quiz.questions[this.state.quiz.currentQuestion];
            this._showSavingsGoalModal(question);

            // 語音引導
            const diff = this.state.settings.difficulty;
            Game.TimerManager.setTimeout(() => {
                const price = question.item.price;
                const weekly = question.weekly;
                const speechMap = {
                    easy:   `${question.item.name}要${toTWD(price)}，每週存${weekly}元，需要幾週？`,
                    normal: `${question.item.name}要${toTWD(price)}，每週存${weekly}元，輸入需要幾週。`,
                    hard:   `${question.item.name}要${toTWD(price)}，每週存${weekly}元，輸入正確週數。`,
                };
                this.state.quiz.lastSpeechText = speechMap[diff];
                Game.Speech.speak(speechMap[diff]);
            }, 500, 'speech');

            // 輔助點擊啟動（困難模式 quiz 用）
            if (this.state.settings.clickMode === 'on') {
                Game.TimerManager.setTimeout(() => AssistClick.activate(question), 700, 'ui');
            }
        },

        _renderQuestionHTML(question) {
            const diff = this.state.settings.difficulty;
            const q    = this.state.quiz;
            const pct  = Math.round((q.currentQuestion / q.totalQuestions) * 100);

            return `
            <div class="b-header">
                <div class="b-header-left">
                    <span class="b-header-unit">🐷 存錢計畫</span>
                </div>
                <div class="b-header-center">${{ easy: '簡單模式', normal: '普通模式', hard: '困難模式' }[diff] || ''}</div>
                <div class="b-header-right">
                    <span class="b-progress">第 ${q.currentQuestion + 1} 題 / 共 ${q.totalQuestions} 題</span>
                    <button class="b-reward-btn" onclick="if(typeof RewardLauncher!=='undefined'){RewardLauncher.open();}else{window.open('../reward/index.html','RewardSystem','width=1200,height=800');}">🎁 獎勵</button>
                    <button class="b-back-btn" onclick="Game.showSettings()">返回設定</button>
                </div>
            </div>
            <div class="game-container">
                <div class="progress-bar-wrap">
                    <div class="progress-bar-fill" style="width:${pct}%"></div>
                </div>
                <div class="progress-text">${q.currentQuestion + 1} / ${q.totalQuestions}</div>

                <div class="b3-goal-card">
                    <span class="b3-goal-icon">${this._itemIconHTML(question.item, '128px')}</span>
                    <div class="b3-goal-name">${question.item.name}</div>
                    <div class="b3-goal-price-label">目標價格</div>
                    <div class="b3-goal-price">${question.item.price} 元</div>
                </div>

                <div class="b3-weekly-strip">
                    <span>每週存</span>
                    <span class="b3-weekly-amount">${question.weekly} 元</span>
                    <span>，需要幾週才夠？</span>
                    <button class="b-inline-replay" id="replay-speech-btn" title="重播語音">🔊</button>
                </div>

                <div class="b3-answer-card" id="b3-answer-area">
                    ${diff === 'easy'
                        ? this._renderChoicesHTML(question)
                        : this._renderNumpadHTML()}
                </div>

                <div class="b3-week-preview" id="b3-week-preview"></div>

                <div id="b3-anim-section"></div>
            </div>`;
        },

        _renderChoicesHTML(question) {
            // 每個選項下方顯示配速預覽（Round 34）
            const btns = question.choices.map(c => {
                const totalSaved = question.weekly * c;
                const paceNote = `每週${question.weekly}元 × ${c}週 = ${totalSaved}元`;
                return `
                <button class="b3-choice-btn" data-val="${c}">
                    ${c}
                    <span class="b3-choice-suffix">週</span>
                    <span class="b3-choice-pace">${paceNote}</span>
                </button>`;
            }).join('');
            return `
            <div class="b3-question-box">請選擇正確的週數</div>
            <div class="b3-choices">${btns}</div>`;
        },

        _renderNumpadHTML() {
            const digits = [7, 8, 9, 4, 5, 6, 1, 2, 3];
            return `
            <div class="b3-numpad-section">
                <div class="b3-question-box" style="margin-bottom:10px;">輸入需要的週數</div>
                <div class="b3-input-display" id="b3-input-display">
                    <span id="b3-input-value">＿</span><span class="b3-unit-hint">週</span>
                </div>
                <div class="b3-numpad">
                    ${digits.map(n => `<button class="b3-numpad-btn" data-digit="${n}">${n}</button>`).join('')}
                    <button class="b3-numpad-btn btn-del" data-action="del">⌫</button>
                    <button class="b3-numpad-btn" data-digit="0">0</button>
                    <button class="b3-numpad-btn btn-ok" data-action="ok">確認</button>
                </div>
            </div>`;
        },

        // ── 存週預覽格（F5 量比較 pattern）──────────────────────
        _updateWeekPreview(n, question) {
            const preview = document.getElementById('b3-week-preview');
            if (!preview) return;
            const cap = Math.min(n, 16); // 最多顯示16格
            const isCorrect = n === question.answer;
            const blocks = [];
            for (let i = 0; i < cap; i++) {
                blocks.push(`<span class="b3-week-block${isCorrect ? ' correct' : ''}" style="animation-delay:${i * 60}ms"></span>`);
            }
            const extra = n > 16 ? `<span class="b3-week-extra">+${n - 16}</span>` : '';
            const label = `<span class="b3-week-label">${n} 週</span>`;
            preview.innerHTML = `<div class="b3-week-blocks">${blocks.join('')}${extra}</div>${label}`;
        },

        // ── 12. 事件綁定 ──────────────────────────────────────
        _bindQuestionEvents(question) {
            const diff = this.state.settings.difficulty;
            if (diff === 'easy') {
                document.querySelectorAll('.b3-choice-btn').forEach(btn => {
                    Game.EventManager.on(btn, 'click', () => {
                        this._updateWeekPreview(parseInt(btn.dataset.val), question);
                        this._handleChoiceAnswer(parseInt(btn.dataset.val), question);
                    }, {}, 'gameUI');
                });
            } else {
                document.querySelectorAll('.b3-numpad-btn').forEach(btn => {
                    Game.EventManager.on(btn, 'click', () => {
                        if (this.state.isProcessing) return;
                        this.audio.play('click');
                        const action = btn.dataset.action;
                        const digit  = btn.dataset.digit;
                        if (digit !== undefined) {
                            if (this.state.quiz.currentInput.length < 4) {
                                this.state.quiz.currentInput += digit;
                            }
                        } else if (action === 'del') {
                            this.state.quiz.currentInput = this.state.quiz.currentInput.slice(0, -1);
                        } else if (action === 'ok') {
                            this._handleNumpadAnswer(question);
                            return;
                        }
                        this._updateInputDisplay();
                        const n = parseInt(this.state.quiz.currentInput);
                        if (!isNaN(n) && n > 0) this._updateWeekPreview(n, question);
                    }, {}, 'gameUI');
                });
            }
            // 語音重播
            const replayBtn = document.getElementById('replay-speech-btn');
            if (replayBtn) {
                Game.EventManager.on(replayBtn, 'click', () => {
                    const text = this.state.quiz.lastSpeechText;
                    if (text) Game.Speech.speak(text);
                }, {}, 'gameUI');
            }
        },

        _updateInputDisplay() {
            const el = document.getElementById('b3-input-value');
            if (el) el.textContent = this.state.quiz.currentInput || '＿';
        },

        _showCenterFeedback(icon, text = '') {
            document.querySelector('.b-center-feedback')?.remove();
            const overlay = document.createElement('div');
            overlay.className = 'b-center-feedback';
            overlay.innerHTML = `<span class="b-cf-icon">${icon}</span>${text ? `<span class="b-cf-text">${text}</span>` : ''}`;
            document.body.appendChild(overlay);
            Game.TimerManager.setTimeout(() => overlay.remove(), 1200, 'ui');
        },

        // ── 13. 答題處理 ──────────────────────────────────────
        _handleChoiceAnswer(chosen, question) {
            if (this.state.isProcessing) return;
            this.state.isProcessing = true;

            const isCorrect = chosen === question.answer;

            document.querySelectorAll('.b3-choice-btn').forEach(btn => {
                btn.disabled = true;
                const v = parseInt(btn.dataset.val);
                if (v === question.answer) btn.classList.add('correct');
                else if (v === chosen && !isCorrect) btn.classList.add('wrong');
            });

            if (isCorrect) {
                this.state.quiz.correctCount++;
                this.state.quiz.streak = (this.state.quiz.streak || 0) + 1;
                this.state.quiz.achievedGoals.push({ item: question.item, weekly: question.weekly, answer: question.answer });
                this.audio.play('correct');
                this._showCenterFeedback('✅', '答對了！');
                if (this.state.quiz.streak === 3 || this.state.quiz.streak === 5) {
                    Game.TimerManager.setTimeout(() => this._showStreakBadge(this.state.quiz.streak), 200, 'ui');
                }
                Game.Speech.speak(`答對了！每週存${question.weekly}元，需要${question.answer}週，就能買${question.item.name}了！`);
                Game.TimerManager.setTimeout(() => {
                    this._showPiggyAnimation(question, () => this.nextQuestion());
                }, 500, 'turnTransition');
            } else {
                this.state.quiz.streak = 0;
                this.audio.play('error');
                if (this.state.settings.retryMode === 'retry') {
                    this._showCenterFeedback('❌', '再試一次！');
                    Game.Speech.speak(`不對喔，再想想看`);
                    Game.TimerManager.setTimeout(() => {
                        this.state.isProcessing = false;
                        document.querySelectorAll('.b3-choice-btn').forEach(btn => {
                            btn.disabled = false;
                            btn.classList.remove('wrong');
                        });
                    }, 1600, 'turnTransition');
                } else {
                    this._showCenterFeedback('❌', '答錯了！');
                    Game.Speech.speak(`正確答案是${question.answer}週`);
                    Game.TimerManager.setTimeout(() => this.nextQuestion(), 2000, 'turnTransition');
                }
            }
        },

        // ── 最佳存法提示（Round 31）─────────────────────────────
        _showBestSavingHint(question) {
            if (document.querySelector('.b3-best-hint')) return;
            // 計算其他週存金額對應的週數（展示對比）
            const target = question.item.price;
            const weekly = question.weekly;
            const correct = question.answer;
            const half = Math.ceil(target / (weekly / 2));
            const double = Math.ceil(target / (weekly * 2));
            const container = document.querySelector('.b3-numpad-section') || document.querySelector('.b3-quiz-area');
            if (!container) return;
            const hint = document.createElement('div');
            hint.className = 'b3-best-hint';
            hint.innerHTML = `<span class="b3-bh-label">💡 換個方式比較：</span>
                <div class="b3-bh-rows">
                    <span class="b3-bh-row slow">每週存 ${Math.round(weekly/2)} 元 → ${half} 週</span>
                    <span class="b3-bh-row correct">✓ 每週存 ${weekly} 元 → ${correct} 週</span>
                    <span class="b3-bh-row fast">每週存 ${weekly * 2} 元 → ${double} 週</span>
                </div>`;
            container.appendChild(hint);
        },

        // ── 除法提示（答錯後顯示計算公式）───────────────────────
        _showDivisionHint(question) {
            if (document.querySelector('.b3-div-hint')) return;
            const section = document.querySelector('.b3-numpad-section');
            if (!section) return;
            const hint = document.createElement('div');
            hint.className = 'b3-div-hint';
            hint.innerHTML = `<span class="b3-hint-label">💡 計算方式：</span>`
                + `${question.item.price} 元 <span class="b3-hint-op">÷</span> `
                + `${question.weekly} 元/週 `
                + `<span class="b3-hint-op">≈</span> `
                + `<span class="b3-hint-ans">${question.answer}</span> 週（無條件進位）`;
            section.appendChild(hint);
        },

        _handleNumpadAnswer(question) {
            if (this.state.isProcessing) return;
            const input = parseInt(this.state.quiz.currentInput);
            if (!input || input <= 0) return;
            this.state.isProcessing = true;

            const isCorrect = input === question.answer;

            const displayEl = document.getElementById('b3-input-display');
            if (displayEl) displayEl.style.background = isCorrect ? '#064e3b' : '#7f1d1d';

            document.querySelectorAll('.b3-numpad-btn').forEach(btn => btn.disabled = true);

            if (isCorrect) {
                this.state.quiz.correctCount++;
                this.state.quiz.streak = (this.state.quiz.streak || 0) + 1;
                this.state.quiz.achievedGoals.push({ item: question.item, weekly: question.weekly, answer: question.answer });
                this.audio.play('correct');
                this._showCenterFeedback('✅', '答對了！');
                if (this.state.quiz.streak === 3 || this.state.quiz.streak === 5) {
                    Game.TimerManager.setTimeout(() => this._showStreakBadge(this.state.quiz.streak), 200, 'ui');
                }
                Game.Speech.speak(`答對了！每週存${question.weekly}元，需要${question.answer}週，就能買${question.item.name}了！`);
                Game.TimerManager.setTimeout(() => {
                    this._showPiggyAnimation(question, () => this.nextQuestion());
                }, 500, 'turnTransition');
            } else {
                this.state.quiz.streak = 0;
                this.audio.play('error');
                this._showDivisionHint(question); // 答錯即顯示除法公式
                this._showBestSavingHint(question); // 最佳存法提示（Round 31）
                if (this.state.settings.retryMode === 'retry') {
                    this._showCenterFeedback('❌', '再試一次！');
                    Game.Speech.speak(`不對喔，參考提示再試一次`);
                    Game.TimerManager.setTimeout(() => {
                        this.state.isProcessing = false;
                        this.state.quiz.currentInput = '';
                        this._updateInputDisplay();
                        const displayEl = document.getElementById('b3-input-display');
                        if (displayEl) displayEl.style.background = '';
                        document.querySelectorAll('.b3-numpad-btn').forEach(btn => btn.disabled = false);
                    }, 1800, 'turnTransition');
                } else {
                    this._showCenterFeedback('❌', '答錯了！');
                    Game.Speech.speak(`正確答案是${question.answer}週`);
                    Game.TimerManager.setTimeout(() => this.nextQuestion(), 2500, 'turnTransition');
                }
            }
        },

        // ── 連勝徽章 ──────────────────────────────────────────
        _showStreakBadge(streak) {
            const existing = document.getElementById('b3-streak-badge');
            if (existing) existing.remove();
            const badge = document.createElement('div');
            badge.id = 'b3-streak-badge';
            badge.className = 'b3-streak-badge';
            const label = streak === 3 ? '🔥 3連勝！' : '⚡ 5連勝！';
            const msg   = streak === 3 ? '繼續加油！' : '太厲害了！';
            badge.innerHTML = `<div class="b3-sb-inner"><div class="b3-sb-label">${label}</div><div class="b3-sb-msg">${msg}</div></div>`;
            document.body.appendChild(badge);
            Game.Speech.speak(streak === 3 ? '三連勝，繼續加油！' : '五連勝，太厲害了！');
            Game.TimerManager.setTimeout(() => {
                badge.classList.add('b3-sb-fade');
                Game.TimerManager.setTimeout(() => { if (badge.parentNode) badge.remove(); }, 400, 'ui');
            }, 1600, 'ui');
        },

        // ── 14. 撲滿動畫 ──────────────────────────────────────
        _showPiggyAnimation(question, callback) {
            const animSection = document.getElementById('b3-anim-section');
            if (!animSection) { callback(); return; }

            const totalWeeks   = question.answer;
            const displaySlots = Math.min(totalWeeks, 8);
            const weeksPerSlot = totalWeeks <= 8 ? 1 : Math.ceil(totalWeeks / 8);
            const slotNote     = totalWeeks > 8 ? `（每格代表 ${weeksPerSlot} 週）` : '';

            const slotsHTML = Array.from({ length: displaySlots }, (_, i) =>
                `<div class="b3-slot" id="b3-slot-${i}">🪙</div>`
            ).join('');

            animSection.innerHTML = `
                <div class="b3-anim-card">
                    <div class="b3-piggy-wrap">
                        <div class="b3-piggy-emoji" id="b3-piggy">🐷</div>
                        <div class="b3-slots-track">${slotsHTML}</div>
                        <div class="b3-weeks-label">
                            共 <strong>${totalWeeks}</strong> 週存到
                            <strong>${this._itemIconHTML(question.item, '22px')} ${question.item.name}</strong>！${slotNote}
                        </div>
                    </div>
                </div>`;

            let slotIndex = 0;
            const fillNext = () => {
                if (slotIndex < displaySlots) {
                    const slot = document.getElementById(`b3-slot-${slotIndex}`);
                    if (slot) slot.classList.add('filled');
                    this.audio.play('coin');
                    slotIndex++;
                    Game.TimerManager.setTimeout(fillNext, 350, 'animation');
                } else {
                    const piggy = document.getElementById('b3-piggy');
                    if (piggy) piggy.classList.add('shake');
                    Game.TimerManager.setTimeout(callback, 900, 'animation');
                }
            };
            fillNext();
        },

        // ── 15. 下一題 ────────────────────────────────────────
        nextQuestion() {
            this.state.quiz.currentQuestion++;
            if (this.state.quiz.currentQuestion >= this.state.quiz.totalQuestions) {
                this.showResults();
            } else {
                this.renderQuestion();
            }
        },

        // ── 16. 完成畫面 ──────────────────────────────────────
        showResults() {
            if (this.state.isEndingGame) return;
            this.state.isEndingGame = true;

            Game.TimerManager.clearByCategory('turnTransition');
            Game.EventManager.removeByCategory('gameUI');

            const q        = this.state.quiz;
            const elapsed  = q.startTime ? (Date.now() - q.startTime) : 0;
            const mins     = Math.floor(elapsed / 60000);
            const secs     = Math.floor((elapsed % 60000) / 1000);
            const accuracy = q.totalQuestions > 0
                ? Math.round((q.correctCount / q.totalQuestions) * 100) : 0;

            let perfText, perfMedal;
            if (accuracy === 100)    { perfText = `🥇 完美！全部答對！`;                         perfMedal = '🥇'; }
            else if (accuracy >= 90) { perfText = `🥇 完成了 ${q.correctCount} 題，表現優異！`;   perfMedal = '🥇'; }
            else if (accuracy >= 70) { perfText = `🥈 完成了 ${q.correctCount} 題，表現良好！`;   perfMedal = '🥈'; }
            else if (accuracy >= 50) { perfText = `🥉 完成了 ${q.correctCount} 題，繼續努力！`;   perfMedal = '🥉'; }
            else                     { perfText = `⭐ 完成了 ${q.correctCount} 題，多多練習加油！`; perfMedal = '⭐'; }

            // 取最後一題物品做購買展示
            const lastQ      = q.questions[q.totalQuestions - 1] || {};
            const lastItem   = lastQ.item   || { name: '', price: '', icon: '🎁' };
            const lastWeekly = lastQ.weekly || '';
            const lastAnswer = lastQ.answer || '';

            const app = document.getElementById('app');
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
            app.style.overflow = 'auto'; app.style.height = 'auto'; app.style.minHeight = '100vh';

            // ── 第一畫面：達成存錢目標 ──
            app.innerHTML = `
<div class="b-res-wrapper">
    <div class="b-res-screen">
        <div class="b-res-header">
            <div class="b-res-trophy" style="font-size:3rem;animation:none;">🎉</div>
            <h1 class="b-res-title">達成存錢目標！</h1>
        </div>
        <div class="b-res-container">
            <div class="b3-cal-success-item">
                <span class="b3-cal-success-icon">${this._itemIconHTML(lastItem, '160px')}</span>
                <div class="b3-cal-success-name">${lastItem.name} 買到了！</div>
                <div class="b3-cal-success-price">${lastItem.price} 元</div>
            </div>
            <div class="b-res-grid" style="grid-template-columns:1fr 1fr;">
                <div class="b-res-card b-res-card-1">
                    <div class="b-res-icon">📅</div>
                    <div class="b-res-label">存錢週數</div>
                    <div class="b-res-value">${lastAnswer} 週</div>
                </div>
                <div class="b-res-card b-res-card-2">
                    <div class="b-res-icon">💰</div>
                    <div class="b-res-label">每週存款</div>
                    <div class="b-res-value">${lastWeekly} 元</div>
                </div>
            </div>
            <div class="b-res-btns">
                <button id="b3-view-summary-btn" class="b-res-play-btn">
                    <span class="btn-icon">📊</span><span class="btn-text">查看測驗總結</span>
                </button>
            </div>
        </div>
    </div>
</div>`;

            Game.EventManager.on(document.getElementById('b3-view-summary-btn'), 'click', () => {
                Game.EventManager.removeByCategory('gameUI');
                // ── 第二畫面：測驗總結 ──
                app.innerHTML = `
<div class="b-res-wrapper">
    <div class="b-res-screen">
        <div class="b-res-header">
            <div class="b-res-trophy">🏆</div>
            <div class="b-res-title-row">
                <img src="../images/index/educated_money_bag_character.png"
                     class="b-res-mascot" alt="金錢小助手" onerror="this.style.display='none'">
                <h1 class="b-res-title">🎉 存錢達人 🎉</h1>
                <span class="b-res-mascot-spacer"></span>
            </div>
        </div>
        <div class="b-res-reward-wrap">
            <a href="#" id="endgame-reward-link" class="b-res-reward-link">
                🎁 開啟獎勵系統
            </a>
        </div>
        <div class="b-res-container">
            <div class="b-res-grid" style="grid-template-columns:1fr 1fr;">
                <div class="b-res-card b-res-card-1">
                    <div class="b-res-icon">✅</div>
                    <div class="b-res-label">完成題數</div>
                    <div class="b-res-value">${q.correctCount} 題</div>
                </div>
                <div class="b-res-card b-res-card-2">
                    <div class="b-res-icon">⏱️</div>
                    <div class="b-res-label">完成時間</div>
                    <div class="b-res-value">${mins > 0 ? mins + '分' : ''}${secs}秒</div>
                </div>
            </div>
            <div class="b-res-perf-section">
                <h3>📊 表現評價</h3>
                <div class="b-res-perf-badge">${perfText}</div>
            </div>
            <div class="b-res-achievements">
                <h3>🏆 學習成果</h3>
                <div class="b-res-ach-list">
                    <div class="b-res-ach-item">✅ 計算達成目標所需時間</div>
                    <div class="b-res-ach-item">✅ 了解定期存錢的概念</div>
                    <div class="b-res-ach-item">✅ 練習加法累積計算</div>
                </div>
            </div>
            ${q.achievedGoals && q.achievedGoals.length > 0 ? `
            <div class="b3-res-goals">
                <h3>🐷 存錢目標清單${ (() => { const catLabels = { toy:'🎮 玩具類', book:'📚 書本類', outdoor:'🌿 戶外類', tech:'💻 科技類' }; const c = this.state.settings.itemCat; return (c && c !== 'all') ? ` · ${catLabels[c] || ''}` : ''; })() }</h3>
                <div class="b3-goal-list">
                    ${q.achievedGoals.map(g => `
                    <div class="b3-goal-row">
                        <span class="b3-goal-icon">${g.item.icon || '🎁'}</span>
                        <span class="b3-goal-name">${g.item.name}</span>
                        <span class="b3-goal-price">${g.item.price}元</span>
                        <span class="b3-goal-weeks">每週存${g.weekly}元 × ${g.answer}週</span>
                    </div>`).join('')}
                </div>
            </div>
            <div class="b3-goal-summary">
                <div class="b3-gs-item">
                    <span class="b3-gs-label">目標數量</span>
                    <span class="b3-gs-val">${q.achievedGoals.length} 個</span>
                </div>
                <div class="b3-gs-item">
                    <span class="b3-gs-label">合計目標金額</span>
                    <span class="b3-gs-val">${q.achievedGoals.reduce((s, g) => s + g.item.price, 0)} 元</span>
                </div>
                <div class="b3-gs-item">
                    <span class="b3-gs-label">平均需要週數</span>
                    <span class="b3-gs-val">${Math.round(q.achievedGoals.reduce((s, g) => s + g.answer, 0) / q.achievedGoals.length)} 週</span>
                </div>
                <div class="b3-gs-item highlight">
                    <span class="b3-gs-label">平均每週存款</span>
                    <span class="b3-gs-val">${Math.round(q.achievedGoals.reduce((s, g) => s + g.weekly, 0) / q.achievedGoals.length)} 元</span>
                </div>
            </div>` : ''}
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
                    else if (accuracy >= 80) msg = `很棒喔，答對了${q.correctCount}題！`;
                    else if (accuracy >= 60) msg = '不錯喔，繼續加油！';
                    else                     msg = '要再加油喔，多練習幾次！';
                    Game.Speech.speak(msg);
                }, 300, 'speech');
            }, {}, 'gameUI');

            Game.TimerManager.setTimeout(() => {
                document.getElementById('success-sound')?.play();
                this._fireConfetti();
            }, 100, 'confetti');
            Game.TimerManager.setTimeout(() => {
                if (lastItem.name) Game.Speech.speak(`太棒了！${lastItem.name}買到了！`);
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

    // 👆 輔助點擊模式（AssistClick）— 獨立區塊（困難 quiz 模式）
    // ============================================================
    const AssistClick = {
        _overlay: null, _handler: null, _touchHandler: null,
        _queue: [], _enabled: false,
        _lastHighlighted: null, _observer: null,

        activate(question) {
            if (this._overlay) return;
            this._overlay = document.createElement('div');
            this._overlay.id = 'b3-assist-overlay';
            this._overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:10100;pointer-events:all;touch-action:none;background:transparent;cursor:pointer;';
            document.body.appendChild(this._overlay);
            this._handler      = (e) => { e.stopPropagation(); this._executeStep(); };
            this._touchHandler = (e) => { e.preventDefault(); e.stopPropagation(); this._executeStep(); };
            this._overlay.addEventListener('click',    this._handler);
            this._overlay.addEventListener('touchend', this._touchHandler, { passive: false });
            this._enabled = true;
            this._startObserver();
            this.buildQueue(question);
        },

        deactivate() {
            if (this._overlay) {
                this._overlay.removeEventListener('click',    this._handler);
                this._overlay.removeEventListener('touchend', this._touchHandler);
                this._overlay.remove();
                this._overlay = null;
            }
            if (this._observer) { this._observer.disconnect(); this._observer = null; }
            this._clearHighlight();
            this._queue = []; this._enabled = false;
            this._handler = null; this._touchHandler = null;
        },

        buildQueue(question) {
            if (!this._enabled) return;
            this._clearHighlight();
            this._queue = [];

            const q = question || Game.state.quiz.questions[Game.state.quiz.currentQuestion];
            if (!q) return;

            // numpad mode（B3 hard mode always uses numpad）
            const steps = [];
            const digits = String(q.answer).split('');
            for (const d of digits) {
                const btn = document.querySelector(`.b3-numpad-btn[data-digit="${d}"]`);
                if (btn) steps.push({ el: btn, action: () => btn.click() });
            }
            const okBtn = document.querySelector('.b3-numpad-btn[data-action="ok"]');
            if (okBtn) steps.push({ el: okBtn, action: () => okBtn.click() });
            this._queue = steps;

            if (this._queue.length > 0) this._highlight(this._queue[0].el);
        },

        _executeStep() {
            if (!this._enabled || this._queue.length === 0) return;
            const step = this._queue.shift();
            this._clearHighlight();
            if (step?.action) step.action();
            Game.TimerManager.setTimeout(() => {
                if (this._enabled && this._queue.length > 0) this._highlight(this._queue[0].el);
            }, 120, 'ui');
        },

        _startObserver() {
            const app = document.getElementById('app');
            if (!app) return;
            let t = null;
            this._observer = new MutationObserver(() => {
                if (!this._enabled || this._queue.length > 0) return;
                if (t) window.clearTimeout(t);
                t = window.setTimeout(() => { if (this._enabled) this.buildQueue(); }, 400);
            });
            this._observer.observe(app, { childList: true, subtree: true });
        },

        _highlight(el) {
            this._clearHighlight();
            if (!el) return;
            el.classList.add('assist-click-hint');
            this._lastHighlighted = el;
        },

        _clearHighlight() {
            if (this._lastHighlighted) {
                this._lastHighlighted.classList.remove('assist-click-hint');
                this._lastHighlighted = null;
            }
            document.querySelectorAll('.assist-click-hint').forEach(e => e.classList.remove('assist-click-hint'));
        }
    };

    Game.init();
});
