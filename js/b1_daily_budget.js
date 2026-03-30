// =============================================================
// FILE: js/b1_daily_budget.js — B1 今天帶多少錢
// 建立日期：2026-03-14
// =============================================================
'use strict';

// ── 場景資料庫（含 category 欄位供類別篩選）──────────────────────
// 類別：school（學校）| food（飲食）| outdoor（戶外）| entertainment（娛樂）| shopping（購物）
const B1_SCENARIOS = {
    easy: [
        { icon:'🏫', label:'去學校',   cat:'school',        items:[{ name:'午餐費', cost:50  }] },
        { icon:'🏪', label:'去超商',   cat:'shopping',      items:[{ name:'飲料',   cost:25  }] },
        { icon:'📚', label:'圖書館',   cat:'school',        items:[{ name:'影印費', cost:10  }] },
        { icon:'🎭', label:'看表演',   cat:'entertainment', items:[{ name:'門票',   cost:100 }] },
        { icon:'🏊', label:'游泳課',   cat:'outdoor',       items:[{ name:'入場費', cost:80  }] },
        { icon:'🎨', label:'美術課',   cat:'school',        items:[{ name:'材料費', cost:30  }] },
        { icon:'🚌', label:'搭公車',   cat:'school',        items:[{ name:'公車費', cost:15  }] },
        { icon:'🌿', label:'逛公園',   cat:'outdoor',       items:[{ name:'停車費', cost:20  }] },
        { icon:'☕', label:'買早餐',   cat:'food',          items:[{ name:'早餐',   cost:35  }] },
        { icon:'🐟', label:'買魚飼料', cat:'shopping',      items:[{ name:'飼料',   cost:45  }] },
        { icon:'🎬', label:'看電影',   cat:'entertainment', items:[{ name:'票價',   cost:120 }] },
        { icon:'🍜', label:'吃點心',   cat:'food',          items:[{ name:'點心',   cost:40  }] },
        { icon:'🛒', label:'買文具',   cat:'shopping',      items:[{ name:'文具',   cost:55  }] },
        { icon:'⛺', label:'踏青',     cat:'outdoor',       items:[{ name:'門票',   cost:60  }] },
    ],
    normal: [
        { icon:'🏫', label:'上學日',   cat:'school',        items:[{ name:'午餐費', cost:60  }, { name:'公車費', cost:20  }] },
        { icon:'🎨', label:'才藝課',   cat:'school',        items:[{ name:'課程費', cost:150 }, { name:'材料費', cost:50  }] },
        { icon:'🏥', label:'看醫生',   cat:'school',        items:[{ name:'掛號費', cost:150 }, { name:'藥費',   cost:80  }] },
        { icon:'🎬', label:'看電影',   cat:'entertainment', items:[{ name:'票價',   cost:280 }, { name:'爆米花', cost:90  }] },
        { icon:'🚂', label:'搭火車',   cat:'outdoor',       items:[{ name:'票價',   cost:250 }, { name:'便當',   cost:75  }] },
        { icon:'🏊', label:'去游泳',   cat:'outdoor',       items:[{ name:'入場費', cost:80  }, { name:'飲料',   cost:25  }] },
        { icon:'📖', label:'買書',     cat:'shopping',      items:[{ name:'故事書', cost:180 }, { name:'文具',   cost:45  }] },
        { icon:'🌄', label:'爬山',     cat:'outdoor',       items:[{ name:'門票',   cost:100 }, { name:'食物',   cost:120 }] },
        { icon:'🎮', label:'遊樂場',   cat:'entertainment', items:[{ name:'門票',   cost:200 }, { name:'遊戲',   cost:50  }] },
        { icon:'🍜', label:'吃午飯',   cat:'food',          items:[{ name:'午餐',   cost:85  }, { name:'飲料',   cost:30  }] },
        { icon:'🏫', label:'補習班',   cat:'school',        items:[{ name:'課程費', cost:200 }, { name:'文具費', cost:30  }] },
        { icon:'🍰', label:'下午茶',   cat:'food',          items:[{ name:'飲料',   cost:55  }, { name:'點心',   cost:65  }] },
        { icon:'🛒', label:'買玩具',   cat:'shopping',      items:[{ name:'玩具',   cost:280 }, { name:'電池',   cost:45  }] },
        { icon:'🎡', label:'遊樂場',   cat:'entertainment', items:[{ name:'入場費', cost:150 }, { name:'零食',   cost:60  }] },
    ],
    hard: [
        { icon:'🛒', label:'大採購',   cat:'shopping',      items:[{ name:'衣服', cost:350 }, { name:'鞋子',   cost:490 }, { name:'書',    cost:180 }] },
        { icon:'🎂', label:'買禮物',   cat:'shopping',      items:[{ name:'禮物', cost:280 }, { name:'蛋糕',   cost:420 }, { name:'卡片',  cost:35  }] },
        { icon:'🌿', label:'出遊',     cat:'outdoor',       items:[{ name:'公車費', cost:20 }, { name:'冰淇淋', cost:45  }, { name:'門票', cost:100 }, { name:'飲料', cost:30 }] },
        { icon:'🏕️', label:'露營',    cat:'outdoor',       items:[{ name:'食材', cost:350 }, { name:'裝備費', cost:200 }, { name:'入場費', cost:150 }] },
        { icon:'🎡', label:'遊樂園',   cat:'entertainment', items:[{ name:'門票', cost:580 }, { name:'餐費',   cost:250 }, { name:'紀念品', cost:180 }] },
        { icon:'🌍', label:'校外教學', cat:'school',        items:[{ name:'車費', cost:80  }, { name:'午餐',   cost:120 }, { name:'門票', cost:200 }, { name:'零用', cost:100 }] },
        { icon:'🎓', label:'畢業典禮', cat:'school',        items:[{ name:'服裝', cost:450 }, { name:'花束',   cost:280 }, { name:'聚餐', cost:350 }] },
        { icon:'🏖️', label:'去海邊',  cat:'outdoor',       items:[{ name:'防曬乳', cost:180 }, { name:'餐費', cost:300 }, { name:'停車費', cost:100 }, { name:'飲料', cost:60 }] },
        { icon:'🍱', label:'辦桌聚餐', cat:'food',          items:[{ name:'餐費', cost:450 }, { name:'飲料',   cost:120 }, { name:'甜點',  cost:150 }] },
        { icon:'🏫', label:'暑期課程', cat:'school',        items:[{ name:'課程費', cost:500 }, { name:'教材費', cost:180 }, { name:'午餐費', cost:120 }] },
        { icon:'🛍️', label:'換季採購', cat:'shopping',      items:[{ name:'外套', cost:680 }, { name:'褲子',   cost:350 }, { name:'包包',  cost:420 }] },
        // 追加（2026-03-29）
        { icon:'🍣', label:'吃壽司',   cat:'food',          items:[{ name:'迴轉壽司', cost:180 }, { name:'飲料', cost:30 }] },
        { icon:'🍦', label:'吃冰淇淋', cat:'food',          items:[{ name:'冰淇淋', cost:55  }, { name:'飲料', cost:25  }] },
        { icon:'🍕', label:'吃披薩',   cat:'food',          items:[{ name:'披薩', cost:350 }, { name:'飲料', cost:60 }, { name:'甜點', cost:80 }] },
        { icon:'🥐', label:'買麵包',   cat:'food',          items:[{ name:'麵包', cost:45  }, { name:'咖啡', cost:55  }] },
        { icon:'🎤', label:'KTV 歡唱',  cat:'entertainment', items:[{ name:'包廂費', cost:400 }, { name:'飲料費', cost:120 }, { name:'小食', cost:80 }] },
        { icon:'🎳', label:'去打保齡球', cat:'entertainment', items:[{ name:'場地費', cost:150 }, { name:'租鞋費', cost:50 }] },
        { icon:'🎰', label:'夾娃娃機', cat:'entertainment', items:[{ name:'投幣費', cost:100 }] },
        { icon:'🧸', label:'逛玩具展', cat:'entertainment', items:[{ name:'門票', cost:200 }, { name:'紀念品', cost:150 }, { name:'餐費', cost:120 }] },
        { icon:'💇', label:'去剪髮',   cat:'shopping',      items:[{ name:'剪髮費', cost:200 }] },
        { icon:'📱', label:'買手機殼', cat:'shopping',      items:[{ name:'手機殼', cost:180 }, { name:'保護貼', cost:50 }] },
        { icon:'🏋️', label:'健身房',  cat:'outdoor',       items:[{ name:'會員費', cost:350 }, { name:'運動飲料', cost:35 }] },
        { icon:'🎻', label:'音樂課',   cat:'school',        items:[{ name:'課程費', cost:400 }, { name:'樂器耗材', cost:80 }] },
    ]
};

const DENOM_BY_DIFF = {
    easy:   [1, 5, 10, 50],
    normal: [1, 5, 10, 50, 100, 500],
    hard:   [1, 5, 10, 50, 100, 500, 1000]
};

// ── 金額語音轉換（安全版）──────────────────────────────────────
const toTWD = v => typeof convertToTraditionalCurrency === 'function'
    ? convertToTraditionalCurrency(v) : `${v}元`;

// ── 主遊戲物件 ─────────────────────────────────────────────────
let Game;

document.addEventListener('DOMContentLoaded', () => {
    Game = {

        // ── Debug ──────────────────────────────────────────────
        Debug: {
            FLAGS: { all:false, init:false, speech:false, audio:false,
                     ui:false, question:false, state:false, wallet:false, error:true },
            log(cat, ...a)  { if (this.FLAGS.all || this.FLAGS[cat]) console.log(`[B1-${cat}]`, ...a); },
            warn(cat, ...a) { if (this.FLAGS.all || this.FLAGS[cat]) console.warn(`[B1-${cat}]`, ...a); },
            error(...a)     { console.error('[B1-ERROR]', ...a); }
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
                ['correct', 'success', 'error', 'click', 'coin'].forEach(name => {
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
            settings: { difficulty: null, questionCount: null, retryMode: null, clickMode: 'off', sceneCategory: null },
            quiz: {
                currentQuestion: 0,
                totalQuestions: 10,
                correctCount: 0,
                streak: 0,
                questions: [],
                startTime: null,
                denomStats: {},
                solvedSchedules: []
            },
            wallet: [],       // [{denom, uid, isBanknote}]
            uidCounter: 0,
            isEndingGame: false,
            isProcessing: false,
            _documentEventsBound: false
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
            Game.Debug.log('init', 'B1 初始化完成');
        },

        injectGlobalAnimationStyles() {
            if (document.getElementById('b1-global-animations')) return;
            const s = document.createElement('style');
            s.id = 'b1-global-animations';
            s.textContent = `
                @keyframes b1CoinIn {
                    0%  { transform: translateY(-20px) scale(0.5); opacity:0; }
                    70% { transform: translateY(4px) scale(1.1); }
                    100%{ transform: translateY(0) scale(1); opacity:1; }
                }
                @keyframes b1Pop {
                    0%  { transform: scale(0.5); opacity:0; }
                    60% { transform: scale(1.2); }
                    100%{ transform: scale(1); opacity:1; }
                }
                @keyframes b1Shake {
                    0%,100% { transform:translateX(0); }
                    25%     { transform:translateX(-8px); }
                    75%     { transform:translateX(8px); }
                }
            `;
            document.head.appendChild(s);
        },

        resetGameState() {
            const q = this.state.quiz;
            q.currentQuestion = 0;
            q.totalQuestions  = this.state.settings.questionCount;
            q.correctCount    = 0;
            q.streak          = 0;
            q.questions       = [];
            q.startTime       = null;
            q.denomStats      = {};
            q.solvedSchedules = [];
            this.state.wallet        = [];
            this.state.uidCounter    = 0;
            this.state.isEndingGame = false;
            this.state.isProcessing  = false;
            Game.Debug.log('init', '🔄 [B1] 遊戲狀態已重置');
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
                        <h1>單元B1：今天帶多少錢</h1>
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
                        <div class="b-setting-group" id="assist-click-group" style="display:none;">
                            <label class="b-setting-label">🤖 輔助點擊</label>
                            <div class="b-btn-group" id="assist-group">
                                <button class="b-sel-btn${this.state.settings.clickMode === 'on' ? ' active' : ''}" data-assist="on">✓ 啟用</button>
                                <button class="b-sel-btn${this.state.settings.clickMode !== 'on' ? ' active' : ''}" data-assist="off">✗ 停用</button>
                            </div>
                            <div style="margin-top:4px;font-size:12px;color:#6b7280;">
                                啟用後，只要偵測到點擊便會自動執行下一個步驟
                            </div>
                        </div>
                        <div class="b-setting-group">
                            <label class="b-setting-label">🗂️ 場景類別</label>
                            <div class="b-btn-group" id="cat-group" style="flex-wrap:wrap;">
                                <button class="b-sel-btn" data-cat="all">全部 🎲</button>
                                <button class="b-sel-btn" data-cat="school">學校 🏫</button>
                                <button class="b-sel-btn" data-cat="food">飲食 🍜</button>
                                <button class="b-sel-btn" data-cat="outdoor">戶外 🌿</button>
                                <button class="b-sel-btn" data-cat="entertainment">娛樂 🎭</button>
                                <button class="b-sel-btn" data-cat="shopping">購物 🛒</button>
                            </div>
                            <div style="margin-top:4px;font-size:12px;color:#6b7280;">
                                選擇特定類別可以專注練習該情境的金額計算
                            </div>
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
                        <div class="b-setting-group" id="mode-settings-group">
                            <label class="b-setting-label">🔄 作答模式</label>
                            <div class="b-btn-group" id="mode-group">
                                <button class="b-sel-btn" data-mode="retry">反複作答</button>
                                <button class="b-sel-btn" data-mode="proceed">單次作答</button>
                            </div>
                            <div style="margin-top:4px;font-size:12px;color:#6b7280;">
                                反複作答：答錯可以再試 ｜ 單次作答：顯示答案後繼續下一題
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
                                ✨ 看行程清單，準備好正確的錢幣，出發！<br>
                                簡單：硬幣；普通：硬幣+紙鈔；困難：自行加總所有費用
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
            easy:   '簡單：每次只有1項費用，總金額會顯示，可使用硬幣（1、5、10、50元）',
            normal: '普通：2~3項費用，總金額會顯示，可使用硬幣和紙鈔',
            hard:   '困難：3~5項費用，需要自己加總，使用所有面額，必須準備足夠的錢'
        },

        _bindSettingsEvents() {
            Game.EventManager.removeByCategory('settings');
            // 場景類別
            document.querySelectorAll('#cat-group [data-cat]').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#cat-group [data-cat]').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.sceneCategory = btn.dataset.cat;
                    this._checkCanStart();
                }, {}, 'settings');
            });

            // 難度
            document.querySelectorAll('[data-diff]').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('[data-diff]').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.difficulty = btn.dataset.diff;
                    const desc = document.getElementById('diff-desc');
                    if (desc) {
                        desc.textContent = this._diffDescriptions[btn.dataset.diff];
                        desc.classList.add('show');
                    }
                    // 輔助點擊：只有簡單模式才顯示
                    const assistGroup = document.getElementById('assist-click-group');
                    const modeGroup   = document.getElementById('mode-settings-group');
                    if (btn.dataset.diff === 'easy') {
                        if (assistGroup) assistGroup.style.display = '';
                        if (modeGroup && this.state.settings.clickMode === 'on') modeGroup.style.display = 'none';
                    } else {
                        if (assistGroup) assistGroup.style.display = 'none';
                        this.state.settings.clickMode = 'off';
                        if (modeGroup) modeGroup.style.display = '';
                    }
                    this._checkCanStart();
                }, {}, 'settings');
            });

            // 題數
            document.querySelectorAll('[data-count]').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('[data-count]').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.questionCount = parseInt(btn.dataset.count);
                    this._checkCanStart();
                }, {}, 'settings');
            });

            // 作答模式
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
                const params = new URLSearchParams({ unit: 'b1' });
                window.open('../worksheet/index.html?' + params.toString(), 'Worksheet', 'width=900,height=700');
            }, {}, 'settings');

            document.querySelectorAll('#assist-group .b-sel-btn').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#assist-group .b-sel-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.clickMode = btn.dataset.assist;
                    const modeGroup = document.getElementById('mode-settings-group');
                    if (modeGroup) {
                        modeGroup.style.display = (this.state.settings.difficulty === 'easy' && btn.dataset.assist === 'on') ? 'none' : '';
                    }
                    this._checkCanStart();
                }, {}, 'settings');
            });

            // 開始
            Game.EventManager.on(document.getElementById('start-btn'), 'click', () => {
                this.startGame();
            }, {}, 'settings');
        },

        _checkCanStart() {
            const s   = this.state.settings;
            const btn = document.getElementById('start-btn');
            const retryOk = (s.difficulty === 'easy' && s.clickMode === 'on') || !!s.retryMode;
            if (btn) btn.disabled = !s.difficulty || !s.questionCount || !retryOk || !s.sceneCategory;
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
            q.streak          = 0;
            q.startTime       = Date.now();
            q.questions       = this._generateQuestions(q.totalQuestions);

            this.state.wallet        = [];
            this.state.uidCounter    = 0;
            this.state.isEndingGame = false;
            this.state.isProcessing  = false;

            Game.Debug.log('init', `開始遊戲 diff=${s.difficulty} count=${q.totalQuestions}`);
            this.renderQuestion();
        },

        _generateQuestions(count) {
            const diff = this.state.settings.difficulty;
            const cat  = this.state.settings.sceneCategory;
            const allScenarios = B1_SCENARIOS[diff] || B1_SCENARIOS.easy;
            // 依類別篩選（'all' 不篩選）
            const filtered = (cat && cat !== 'all')
                ? allScenarios.filter(s => s.cat === cat)
                : allScenarios;
            const basePool = filtered.length > 0 ? filtered : allScenarios; // 防空集合回退
            const pool     = [...basePool];
            const result   = [];

            for (let i = 0; i < count; i++) {
                if (pool.length === 0) {
                    // 補滿：重新洗牌原始資料
                    pool.push(...basePool);
                }
                const idx = Math.floor(Math.random() * pool.length);
                const scenario = pool.splice(idx, 1)[0];
                const total = scenario.items.reduce((s, item) => s + item.cost, 0);
                result.push({ ...scenario, total });
            }
            Game.Debug.log('question', `產生題目 ${result.length} 題（類別：${cat}）`);
            return result;
        },

        // ── Render Question ────────────────────────────────────
        renderQuestion() {
            Game.TimerManager.clearAll();
            Game.EventManager.removeByCategory('gameUI');
            AssistClick.deactivate();
            this.state.isProcessing = false;
            this.state.wallet = [];
            this.state.quiz.errorCount = 0;

            const q    = this.state.quiz;
            const curr = q.questions[q.currentQuestion];
            const diff = this.state.settings.difficulty;
            const app  = document.getElementById('app');

            const showTotal = (diff !== 'hard');

            app.innerHTML = `
            ${this._renderHeader()}
            <div class="b-game-wrap">
                ${this._renderScheduleCard(curr, showTotal)}
                ${this._renderWalletArea(curr.total)}
                <div style="display:flex;justify-content:center;margin:8px 0;">
                    <button class="b1-confirm-btn" id="confirm-btn" disabled>✅ 準備好了，出發！</button>
                </div>
                ${this._renderCoinTray(diff)}
            </div>`;

            this._bindQuestionEvents(curr);
            this._showTaskModal(curr, diff);

            // 語音播報
            Game.TimerManager.setTimeout(() => {
                const names = curr.items.map(it => it.name).join('、');
                const diff  = this.state.settings.difficulty;
                let text;
                if (diff === 'easy') {
                    text = `今天要去${curr.label}，需要準備${names}，共${toTWD(curr.total)}`;
                } else if (diff === 'normal') {
                    text = `今天要去${curr.label}，需要準備${names}，把錢幣放進錢包。`;
                } else {
                    text = `今天要去${curr.label}，需要準備${names}，自己算好總金額！`;
                }
                this.state.quiz.lastSpeechText = text;
                Game.Speech.speak(text);
            }, 400, 'speech');

            // 輔助點擊啟動
            if (this.state.settings.clickMode === 'on') {
                Game.TimerManager.setTimeout(() => AssistClick.activate(curr), 600, 'ui');
            }
        },

        _renderHeader() {
            const q = this.state.quiz;
            const diffLabel = { easy: '簡單模式', normal: '普通模式', hard: '困難模式' }[this.state.settings.difficulty] || '';
            const catLabels = { all:'全部', school:'學校 🏫', food:'飲食 🍜', outdoor:'戶外 🌿', entertainment:'娛樂 🎭', shopping:'購物 🛒' };
            const catLabel  = catLabels[this.state.settings.sceneCategory] || '';
            const centerText = catLabel && catLabel !== '全部' ? `${diffLabel} ·  ${catLabel}` : diffLabel;
            return `
            <div class="b-header">
                <div class="b-header-left">
                    <span class="b-header-unit">💰 今天帶多少錢</span>
                </div>
                <div class="b-header-center">${centerText}</div>
                <div class="b-header-right">
                    <span class="b-progress">第 ${q.currentQuestion + 1} 題 / 共 ${q.totalQuestions} 題</span>
                    <button class="b-reward-btn" id="reward-btn-game">🎁 獎勵</button>
                    <button class="b-back-btn" id="back-to-settings">返回設定</button>
                </div>
            </div>`;
        },

        _renderScheduleCard(q, showTotal) {
            const isHard   = this.state.settings.difficulty === 'hard';
            const itemsHtml = q.items.map(it => `
                <div class="b1-schedule-item">
                    <span class="b1-item-name">📌 ${it.name}</span>
                    ${isHard
                        ? `<span class="b1-item-cost b1-cost-hidden">??? 元</span>`
                        : `<span class="b1-item-cost">${it.cost} 元</span>`
                    }
                </div>`).join('');

            const totalTag = showTotal
                ? `<div class="b1-total-right">
                       <div class="b1-total-right-label">共需金額</div>
                       <span class="b1-total-tag">${q.total} 元</span>
                   </div>`
                : `<div class="b1-total-right">
                       <div class="b1-total-right-label">共需金額</div>
                       <span class="b1-total-tag b1-total-tag-hidden">??? 元</span>
                   </div>`;

            return `
            <div class="b1-schedule-card">
                <div class="b1-schedule-header">
                    <span class="b1-schedule-icon">${q.icon}</span>
                    <div class="b1-schedule-text">
                        <div class="b1-schedule-label-row">
                            <span class="b1-schedule-label">今天要去：${q.label}</span>
                            <button class="b-inline-replay" id="replay-speech-btn" title="重播語音">🔊</button>
                        </div>
                        <div class="b1-schedule-subtitle">需要帶這些錢 👇</div>
                    </div>
                    ${totalTag}
                </div>
                <div class="b1-schedule-items">${itemsHtml}</div>
            </div>`;
        },

        _renderWalletArea(requiredTotal) {
            const diff = this.state.settings.difficulty;
            const hintBtn = diff === 'hard'
                ? `<button class="b1-hint-btn" id="hint-btn" title="提示">💡 提示</button>`
                : '';
            return `
            <div class="b1-wallet-area" id="wallet-area">
                <div class="b1-wallet-header">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <span class="b1-wallet-title">👛 我的錢包</span>
                        ${hintBtn}
                    </div>
                    <div class="b1-wallet-total-wrap">
                        <span class="b1-wallet-total-label">已放</span>
                        <span class="b1-wallet-total-val" id="wallet-total">0 元</span>
                        <span class="b1-wallet-sep">/</span>
                        <span class="b1-wallet-goal-tag">需要 ${requiredTotal} 元</span>
                    </div>
                </div>
                <div class="b1-wallet-coins b1-drop-zone" id="wallet-coins">
                    <span class="b1-wallet-empty">把錢幣拖曳到這裡 👈</span>
                </div>
            </div>`;
        },

        _renderCoinTray(diff) {
            const denoms = DENOM_BY_DIFF[diff] || DENOM_BY_DIFF.easy;
            const coinsHtml = denoms.map(d => {
                const isBanknote = d >= 100;
                const imgSrc = `../images/money/${d}_yuan_front.png`;
                const imgClass = isBanknote ? 'banknote-img' : 'coin-img';
                return `
                <div class="b1-coin-draggable" draggable="true" data-denom="${d}" title="${d}元 — 拖曳放入錢包">
                    <img src="${imgSrc}" alt="${d}元" class="${imgClass}" draggable="false"
                         onerror="this.style.display='none'">
                    <span class="b1-denom-label">${d}元</span>
                </div>`;
            }).join('');

            return `
            <div class="b1-coin-tray">
                <div class="b1-tray-title">💰 拖曳錢幣放入錢包（可重複拖曳）</div>
                <div class="b1-tray-coins" id="coin-tray">${coinsHtml}</div>
            </div>`;
        },

        // ── Bind Game Events ───────────────────────────────────
        _bindQuestionEvents(question) {
            // 設置拖曳放置
            this._setupDragDrop();

            // 確認按鈕
            Game.EventManager.on(document.getElementById('confirm-btn'), 'click', () => {
                this.handleConfirm(question.total);
            }, {}, 'gameUI');

            // 返回設定
            Game.EventManager.on(document.getElementById('back-to-settings'), 'click', () => {
                this.showSettings();
            }, {}, 'gameUI');

            // 語音重播（內嵌於題目中）
            Game.EventManager.on(document.getElementById('replay-speech-btn'), 'click', () => {
                const text = this.state.quiz.lastSpeechText;
                if (text) Game.Speech.speak(text);
            }, {}, 'gameUI');

            // 提示按鈕（困難模式）
            const hintBtn = document.getElementById('hint-btn');
            if (hintBtn) {
                Game.EventManager.on(hintBtn, 'click', () => {
                    this._showCoinHint();
                }, {}, 'gameUI');
            }

            // 獎勵按鈕
            Game.EventManager.on(document.getElementById('reward-btn-game'), 'click', () => {
                if (typeof RewardLauncher !== 'undefined') RewardLauncher.open();
                else window.open('../reward/index.html', 'RewardSystem', 'width=1200,height=800');
            }, {}, 'gameUI');
        },

        // ── Wallet Operations ──────────────────────────────────
        addCoin(denom) {
            this.audio.play('coin');
            const uid = ++this.state.uidCounter;
            this.state.wallet.push({ denom, uid, isBanknote: denom >= 100 });
            this.state.quiz.denomStats[denom] = (this.state.quiz.denomStats[denom] || 0) + 1;
            Game.Debug.log('wallet', `加入 ${denom}元，合計 ${this._getWalletTotal()}`);
            this._updateWalletDisplay();
            // 放幣語音（F4 instant feedback + C1 coin recognition pattern）
            Game.TimerManager.setTimeout(() => Game.Speech.speak(`${denom}元`), 80, 'ui');
        },

        removeCoin(uid) {
            this.audio.play('click');
            this.state.wallet = this.state.wallet.filter(c => c.uid !== uid);
            Game.Debug.log('wallet', `移除 uid=${uid}，合計 ${this._getWalletTotal()}`);
            this._updateWalletDisplay();
        },

        _getWalletTotal() {
            return this.state.wallet.reduce((s, c) => s + c.denom, 0);
        },

        _updateWalletDisplay() {
            const total      = this._getWalletTotal();
            const required   = this.state.quiz.questions[this.state.quiz.currentQuestion]?.total ?? 0;
            const enough     = total >= required;

            // 更新合計顯示
            const totalEl = document.getElementById('wallet-total');
            if (totalEl) {
                totalEl.textContent = `${total} 元`;
                totalEl.className = 'b1-wallet-total-val ' + (enough ? 'enough' : (total > 0 ? 'not-enough' : ''));
            }

            // 更新錢包幣列
            const coinsEl = document.getElementById('wallet-coins');
            if (coinsEl) {
                if (this.state.wallet.length === 0) {
                    coinsEl.innerHTML = '<span class="b1-wallet-empty">把錢幣拖曳到這裡 👈</span>';
                } else {
                    coinsEl.innerHTML = this.state.wallet.map(coin => {
                        const imgSrc   = `../images/money/${coin.denom}_yuan_front.png`;
                        const imgClass = coin.isBanknote ? 'banknote-img' : 'coin-img';
                        const imgW     = coin.isBanknote ? '100px' : '60px';
                        return `
                        <div class="b1-wallet-coin" data-uid="${coin.uid}">
                            <img src="${imgSrc}" alt="${coin.denom}元" class="${imgClass}"
                                 style="width:${imgW};${coin.isBanknote ? 'border-radius:4px' : 'border-radius:50%'}"
                                 onerror="this.style.display='none'">
                            <button class="b1-remove-btn" data-uid="${coin.uid}" title="移除">×</button>
                        </div>`;
                    }).join('');

                    // 綁定移除按鈕（gameUI category）
                    coinsEl.querySelectorAll('.b1-remove-btn').forEach(btn => {
                        Game.EventManager.on(btn, 'click', () => {
                            this.removeCoin(parseInt(btn.dataset.uid));
                        }, {}, 'gameUI');
                    });
                }
            }

            // 確認按鈕狀態（B6 wasSufficient pattern）
            const confirmBtn = document.getElementById('confirm-btn');
            const wasSufficient = confirmBtn && !confirmBtn.disabled;
            if (confirmBtn) {
                confirmBtn.disabled = !enough;
                if (enough && !wasSufficient && total > 0) {
                    if (total === required) {
                        this._showExactMatchToast();
                        Game.Speech.speak('剛好！不需要找零，可以出發了！');
                    } else {
                        Game.Speech.speak('金額足夠，可以出發了！');
                    }
                }
                // 行程卡綠光（剛好符合時）
                const card = document.querySelector('.b1-schedule-card');
                if (card) card.classList.toggle('exact-match', total === required && total > 0);
            }

            // 簡單模式：動態淡化超出剩餘所需的錢幣
            if (this.state.settings.difficulty === 'easy') {
                const remaining = Math.max(0, required - total);
                document.querySelectorAll('.b1-coin-draggable').forEach(el => {
                    const d = parseInt(el.dataset.denom);
                    el.classList.toggle('b1-coin-faded', total > 0 && remaining > 0 && d > remaining);
                });
            }
        },

        // ── 連勝徽章（B3 streak pattern）────────────────────────
        _showStreakBadge(streak) {
            const existing = document.getElementById('b1-streak-badge');
            if (existing) existing.remove();
            const badge = document.createElement('div');
            badge.id = 'b1-streak-badge';
            badge.className = 'b1-streak-badge';
            const label = streak === 3 ? '🔥 3連勝！' : '⚡ 5連勝！';
            const msg   = streak === 3 ? '繼續加油！' : '太厲害了！';
            badge.innerHTML = `<div class="b1-sb-inner"><div class="b1-sb-label">${label}</div><div class="b1-sb-msg">${msg}</div></div>`;
            document.body.appendChild(badge);
            Game.Speech.speak(streak === 3 ? '三連勝，繼續加油！' : '五連勝，太厲害了！');
            Game.TimerManager.setTimeout(() => {
                badge.classList.add('b1-sb-fade');
                Game.TimerManager.setTimeout(() => { if (badge.parentNode) badge.remove(); }, 400, 'ui');
            }, 1600, 'ui');
        },

        // ── 費用明細提示（B2 breakdown pattern）────────────────
        _showScheduleBreakdown(question) {
            if (!question) return;
            const existing = document.getElementById('b1-breakdown');
            if (existing) return; // 防重複
            const div = document.createElement('div');
            div.id = 'b1-breakdown';
            div.className = 'b1-breakdown';
            const rows = question.items.map(it =>
                `<div class="b1-bd-row"><span class="b1-bd-name">📌 ${it.name}</span><span class="b1-bd-cost">${it.cost} 元</span></div>`
            ).join('');
            div.innerHTML = `<div class="b1-bd-title">💡 費用明細</div>${rows}<div class="b1-bd-total">合計 ${question.total} 元</div>`;
            const walletArea = document.getElementById('wallet-area');
            if (walletArea) walletArea.before(div);
            else document.querySelector('.b-game-wrap')?.appendChild(div);
            Game.TimerManager.setTimeout(() => {
                div.classList.add('b1-bd-fade');
                Game.TimerManager.setTimeout(() => { if (div.parentNode) div.remove(); }, 400, 'ui');
            }, 4000, 'ui');
        },

        // ── 最少張數提示（C4/C6 最佳付款 pattern）──────────────
        _showMinCoinsHint(walletTotal, requiredTotal) {
            const used    = this.state.wallet.length;
            const denoms  = DENOM_BY_DIFF[this.state.settings.difficulty] || DENOM_BY_DIFF.easy;
            const optimal = this._calcOptimalCoins(requiredTotal, denoms);
            const minCount = optimal.length;
            if (used <= minCount) return; // 已達最佳，不顯示
            const existing = document.getElementById('b1-min-coins-toast');
            if (existing) existing.remove();
            const toast = document.createElement('div');
            toast.id = 'b1-min-coins-toast';
            toast.className = 'b1-min-coins-toast';
            toast.innerHTML = `💡 你用了 <b>${used}</b> 張，其實最少只需要 <b>${minCount}</b> 張！`;
            document.body.appendChild(toast);
            Game.TimerManager.setTimeout(() => {
                toast.classList.add('b1-toast-fade');
                Game.TimerManager.setTimeout(() => { if (toast.parentNode) toast.remove(); }, 400, 'ui');
            }, 1800, 'ui');
        },

        // ── 剛好浮動提示 ────────────────────────────────────────
        _showExactMatchToast() {
            const existing = document.getElementById('b1-exact-toast');
            if (existing) existing.remove();
            const toast = document.createElement('div');
            toast.id = 'b1-exact-toast';
            toast.className = 'b1-exact-toast';
            toast.textContent = '💯 剛好！不需要找零';
            document.body.appendChild(toast);
            Game.TimerManager.setTimeout(() => {
                toast.classList.add('b1-toast-fade');
                Game.TimerManager.setTimeout(() => { if (toast.parentNode) toast.remove(); }, 400, 'ui');
            }, 1400, 'ui');
        },

        // ── Confirm ────────────────────────────────────────────
        handleConfirm(requiredTotal) {
            if (this.state.isProcessing) return;
            this.state.isProcessing = true;

            const walletTotal = this._getWalletTotal();
            const isCorrect   = walletTotal >= requiredTotal;

            Game.Debug.log('state', `確認：錢包${walletTotal} 需要${requiredTotal} 正確=${isCorrect}`);

            if (isCorrect) {
                this.audio.play('correct');
                this._showFeedback('✅', '答對了！');
                const diff = walletTotal - requiredTotal;
                let msg = `答對了！你準備了${toTWD(walletTotal)}`;
                if (diff > 0) msg += `，找回${toTWD(diff)}`;
                Game.Speech.speak(msg);
                this.state.quiz.correctCount++;
                this.state.quiz.streak = (this.state.quiz.streak || 0) + 1;
                if (this.state.quiz.streak === 3 || this.state.quiz.streak === 5) {
                    Game.TimerManager.setTimeout(() => this._showStreakBadge(this.state.quiz.streak), 200, 'ui');
                }
                this.state.quiz.solvedSchedules.push(this.state.quiz.questions[this.state.quiz.currentQuestion]);
                // 最少張數提示（C4/C6 最佳付款 pattern）
                this._showMinCoinsHint(walletTotal, requiredTotal);
            } else {
                this.state.quiz.streak = 0;
                this.audio.play('error');
                this.state.quiz.errorCount = (this.state.quiz.errorCount || 0) + 1;
                this._showFeedback('❌', this.state.settings.retryMode === 'proceed' ? '答錯了！' : '再試一次！');
                if (this.state.settings.retryMode === 'proceed') {
                    Game.Speech.speak(`需要${toTWD(requiredTotal)}，繼續下一題`);
                    Game.TimerManager.setTimeout(() => this.nextQuestion(), 2000, 'turnTransition');
                } else {
                    Game.Speech.speak(`還不夠喔！需要${toTWD(requiredTotal)}，你只有${toTWD(walletTotal)}`);
                    this.state.isProcessing = false;
                    const walletArea = document.getElementById('wallet-area');
                    if (walletArea) {
                        walletArea.style.animation = 'b1Shake 0.4s ease';
                        Game.TimerManager.setTimeout(() => { walletArea.style.animation = ''; }, 500, 'ui');
                    }
                    // 普通模式：3次錯誤後自動顯示提示
                    if (this.state.settings.difficulty === 'normal' && this.state.quiz.errorCount >= 3) {
                        Game.TimerManager.setTimeout(() => this._showCoinHint(), 600, 'ui');
                        Game.TimerManager.setTimeout(() => this._showScheduleBreakdown(this.state.quiz.questions[this.state.quiz.currentQuestion]), 900, 'ui');
                    }
                    // 困難模式答錯：顯示費用明細（B2 breakdown pattern）
                    if (this.state.settings.difficulty === 'hard') {
                        Game.TimerManager.setTimeout(() => this._showScheduleBreakdown(this.state.quiz.questions[this.state.quiz.currentQuestion]), 400, 'ui');
                    }
                }
                return;
            }

            Game.TimerManager.setTimeout(() => {
                this.nextQuestion();
            }, 1400, 'turnTransition');
        },

        _showFeedback(icon, text = '') {
            document.querySelector('.b-center-feedback')?.remove();
            const overlay = document.createElement('div');
            overlay.className = 'b-center-feedback';
            overlay.innerHTML = `<span class="b-cf-icon">${icon}</span>${text ? `<span class="b-cf-text">${text}</span>` : ''}`;
            document.body.appendChild(overlay);
            Game.TimerManager.setTimeout(() => overlay.remove(), 1200, 'ui');
        },

        // ── Drag & Drop ────────────────────────────────────────
        _setupDragDrop() {
            const walletCoins = document.getElementById('wallet-coins');
            if (!walletCoins) return;

            // Desktop HTML5 drag
            document.querySelectorAll('.b1-coin-draggable').forEach(dragEl => {
                Game.EventManager.on(dragEl, 'dragstart', (e) => {
                    e.dataTransfer.effectAllowed = 'copy';
                    e.dataTransfer.setData('text/plain', dragEl.dataset.denom);
                    dragEl.classList.add('b1-dragging');
                    if (e.dataTransfer.setDragImage) {
                        try {
                            const img = dragEl.querySelector('img');
                            const ghost = document.createElement('img');
                            ghost.src = img ? img.src : '';
                            ghost.style.cssText = 'position:fixed;top:-200px;left:-200px;width:56px;height:56px;object-fit:contain;';
                            document.body.appendChild(ghost);
                            e.dataTransfer.setDragImage(ghost, 28, 28);
                            Game.TimerManager.setTimeout(() => ghost.remove(), 100, 'ui');
                        } catch(ex) {}
                    }
                }, {}, 'gameUI');
                Game.EventManager.on(dragEl, 'dragend', () => {
                    dragEl.classList.remove('b1-dragging');
                }, {}, 'gameUI');
            });

            Game.EventManager.on(walletCoins, 'dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'copy';
                walletCoins.classList.add('b1-drop-active');
            }, {}, 'gameUI');
            Game.EventManager.on(walletCoins, 'dragleave', (e) => {
                if (!walletCoins.contains(e.relatedTarget)) {
                    walletCoins.classList.remove('b1-drop-active');
                }
            }, {}, 'gameUI');
            Game.EventManager.on(walletCoins, 'drop', (e) => {
                e.preventDefault();
                walletCoins.classList.remove('b1-drop-active');
                const denom = parseInt(e.dataTransfer.getData('text/plain'));
                if (denom && !isNaN(denom)) this.addCoin(denom);
            }, {}, 'gameUI');

            // Touch drag
            this._setupTouchDrag();
        },

        _setupTouchDrag() {
            let touchDenom = null;
            let ghost      = null;
            const self     = this;

            document.querySelectorAll('.b1-coin-draggable').forEach(dragEl => {
                Game.EventManager.on(dragEl, 'touchstart', (e) => {
                    if (e.touches.length > 1) return;
                    touchDenom = parseInt(dragEl.dataset.denom);
                    const rect = dragEl.getBoundingClientRect();
                    ghost = dragEl.cloneNode(true);
                    ghost.style.cssText = `position:fixed;left:${rect.left}px;top:${rect.top}px;` +
                        `width:${rect.width}px;height:${rect.height}px;` +
                        `opacity:0.85;pointer-events:none;z-index:9999;transform:scale(1.15);transition:none;`;
                    document.body.appendChild(ghost);
                }, { passive: true }, 'gameUI');

                Game.EventManager.on(dragEl, 'touchmove', (e) => {
                    if (!ghost) return;
                    e.preventDefault();
                    const t = e.touches[0];
                    ghost.style.left = (t.clientX - ghost.offsetWidth  / 2) + 'px';
                    ghost.style.top  = (t.clientY - ghost.offsetHeight / 2) + 'px';
                    const wc = document.getElementById('wallet-coins');
                    if (wc) {
                        const r = wc.getBoundingClientRect();
                        wc.classList.toggle('b1-drop-active',
                            t.clientX >= r.left && t.clientX <= r.right &&
                            t.clientY >= r.top  && t.clientY <= r.bottom);
                    }
                }, { passive: false }, 'gameUI');

                Game.EventManager.on(dragEl, 'touchend', (e) => {
                    if (!ghost || touchDenom === null) return;
                    const t  = e.changedTouches[0];
                    const wc = document.getElementById('wallet-coins');
                    if (wc) {
                        const r = wc.getBoundingClientRect();
                        if (t.clientX >= r.left && t.clientX <= r.right &&
                            t.clientY >= r.top  && t.clientY <= r.bottom) {
                            self.addCoin(touchDenom);
                        }
                        wc.classList.remove('b1-drop-active');
                    }
                    ghost.remove(); ghost = null; touchDenom = null;
                }, { passive: true }, 'gameUI');
            });
        },

        // ── 開題任務說明彈窗（C4 instruction modal 模式）──────────
        _showTaskModal(curr, diff) {
            const existing = document.getElementById('b1-task-modal');
            if (existing) existing.remove();
            const totalText = (diff !== 'hard')
                ? `<div class="b1-task-amount">${toTWD(curr.total)}</div>`
                : `<div class="b1-task-amount-q">？ 元</div>`;
            const modal = document.createElement('div');
            modal.id = 'b1-task-modal';
            modal.className = 'b1-task-modal';
            modal.innerHTML = `
                <div class="b1-task-modal-inner">
                    <div class="b1-task-modal-icon">${curr.icon}</div>
                    <div class="b1-task-modal-dest">今天要去 ${curr.label}</div>
                    ${totalText}
                    <div class="b1-task-modal-tap">點任意處繼續</div>
                </div>`;
            document.body.appendChild(modal);
            modal.addEventListener('click', () => modal.remove());
            Game.TimerManager.setTimeout(() => {
                if (document.body.contains(modal)) modal.remove();
            }, 2000, 'ui');
        },

        // ── Hint ───────────────────────────────────────────────
        _calcOptimalCoins(amount, denoms) {
            const sorted = [...denoms].sort((a, b) => b - a);
            const result = [];
            let rem = amount;
            for (const d of sorted) {
                while (rem >= d) { result.push(d); rem -= d; }
            }
            return result;
        },

        _showCoinHint() {
            const curr = this.state.quiz.questions[this.state.quiz.currentQuestion];
            if (!curr) return;
            const denoms  = DENOM_BY_DIFF[this.state.settings.difficulty] || DENOM_BY_DIFF.easy;
            const optimal = this._calcOptimalCoins(curr.total, denoms);

            document.querySelectorAll('.b1-coin-draggable').forEach(el => el.classList.remove('b1-coin-hint'));

            const countMap = {};
            optimal.forEach(d => { countMap[d] = (countMap[d] || 0) + 1; });
            Object.keys(countMap).forEach(d => {
                document.querySelectorAll(`.b1-coin-draggable[data-denom="${d}"]`).forEach(el => {
                    el.classList.add('b1-coin-hint');
                });
            });

            const parts = Object.entries(countMap)
                .sort((a, b) => b[0] - a[0])
                .map(([d, c]) => `${c > 1 ? c + '個' : ''}${toTWD(parseInt(d))}`);
            Game.Speech.speak(`提示：放${parts.join('加')}，共${toTWD(curr.total)}`);

            Game.TimerManager.setTimeout(() => {
                document.querySelectorAll('.b1-coin-draggable').forEach(el => el.classList.remove('b1-coin-hint'));
            }, 5000, 'ui');
        },

        // ── Next Question / Results ────────────────────────────
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

            AssistClick.deactivate();
            Game.TimerManager.clearByCategory('turnTransition');
            Game.EventManager.removeByCategory('gameUI');

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

            // 行程費用清單（B6 採購收據 pattern）
            const scheduleListHTML = q.solvedSchedules && q.solvedSchedules.length > 0 ? `
            <div class="b1-res-schedules">
                <h3>📋 完成的行程</h3>
                <div class="b1-schedule-rows">
                    ${q.solvedSchedules.map(s => `
                    <div class="b1-schedule-row">
                        <span class="b1-sch-icon">${s.icon}</span>
                        <span class="b1-sch-label">${s.label}</span>
                        <span class="b1-sch-items">${s.items.map(it => `${it.name}${it.cost}元`).join('・')}</span>
                        <span class="b1-sch-total">${s.total}元</span>
                    </div>`).join('')}
                </div>
            </div>` : '';

            // 面額使用統計（C1 統計模式）
            const denomEntries = Object.entries(q.denomStats).sort((a, b) => parseInt(b[0]) - parseInt(a[0]));
            const denomStatsHTML = denomEntries.length > 0 ? `
            <div class="b-res-denom-stats">
                <h3>🪙 面額使用統計</h3>
                <div class="b1-stat-grid">
                    ${denomEntries.map(([d, c]) => `
                    <div class="b1-stat-item">
                        <img src="../images/money/${d}_yuan_front.png" alt="${d}元"
                             style="width:44px;height:44px;object-fit:contain;" onerror="this.style.display='none'">
                        <div class="b1-stat-denom">${d}元</div>
                        <div class="b1-stat-count">× ${c}</div>
                    </div>`).join('')}
                </div>
            </div>` : '';

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
                <h1 class="b-res-title">🎉 帶錢小達人 🎉</h1>
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
                    <div class="b-res-ach-item">✅ 計算出行所需費用</div>
                    <div class="b-res-ach-item">✅ 選擇正確面額錢幣</div>
                    <div class="b-res-ach-item">✅ 累計總金額達到目標</div>
                    ${(() => {
                        const catNames = { school:'學校活動', food:'飲食消費', outdoor:'戶外活動', entertainment:'娛樂活動', shopping:'購物消費' };
                        const sc = this.state.settings.sceneCategory;
                        return sc && sc !== 'all' ? `<div class="b-res-ach-item">✅ 專注練習：${catNames[sc] || sc}場景</div>` : '';
                    })()}
                </div>
            </div>

            ${scheduleListHTML}

            ${denomStatsHTML}

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

            // 綁定完成畫面按鈕
            Game.EventManager.on(document.getElementById('play-again-btn'), 'click',
                () => this.startGame(), {}, 'gameUI');
            Game.EventManager.on(document.getElementById('back-settings-btn'), 'click',
                () => this.showSettings(), {}, 'gameUI');
            Game.EventManager.on(document.getElementById('endgame-reward-link'), 'click', (e) => {
                e.preventDefault();
                if (typeof RewardLauncher !== 'undefined') RewardLauncher.open();
                else window.open('../reward/index.html', 'RewardSystem', 'width=1200,height=800');
            }, {}, 'gameUI');

            // 音效 + 煙火
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

            Game.Debug.log('state', `遊戲結束 正確=${q.correctCount}/${q.totalQuestions}`);
        },

        // ── Confetti（遞迴版，不用 setInterval）──────────────────
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
        backToMenu() {
            Game.TimerManager.clearAll();
            Game.EventManager.removeAll();
            window.location.href = '../index.html#part4';
        }

    };  // end Game

    // 👆 輔助點擊模式（AssistClick）— 獨立區塊
    // ============================================================
    const AssistClick = {
        _overlay: null, _handler: null, _touchHandler: null,
        _enabled: false, _lastHighlighted: null, _observer: null,
        _curr: null,

        activate(curr) {
            if (this._overlay) return;
            this._curr = curr;
            const tbEl = document.querySelector('.b-header');
            const tbBottom = tbEl ? Math.round(tbEl.getBoundingClientRect().bottom) : 60;
            this._overlay = document.createElement('div');
            this._overlay.id = 'b1-assist-overlay';
            this._overlay.style.cssText = `position:fixed;top:${tbBottom}px;left:0;right:0;bottom:0;z-index:10100;pointer-events:all;touch-action:none;background:transparent;cursor:pointer;`;
            document.body.appendChild(this._overlay);
            this._handler      = (e) => { e.stopPropagation(); this._executeStep(); };
            this._touchHandler = (e) => { e.preventDefault(); e.stopPropagation(); this._executeStep(); };
            this._overlay.addEventListener('click',    this._handler);
            this._overlay.addEventListener('touchend', this._touchHandler, { passive: false });
            this._enabled = true;
            this._startObserver();
            this.buildQueue();
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
            this._enabled = false; this._curr = null;
            this._handler = null; this._touchHandler = null;
        },

        buildQueue() {
            if (!this._enabled) return;
            this._clearHighlight();

            const curr = this._curr;
            if (!curr) return;

            // 計算錢包中已有金額
            const walletTotal = Game.state.wallet.reduce((s, c) => s + c.denom, 0);
            const remaining   = curr.total - walletTotal;

            if (remaining <= 0) {
                // 已足夠 → 高亮確認按鈕
                const btn = document.getElementById('confirm-btn');
                if (btn && !btn.disabled) this._highlight(btn, () => btn.click());
            } else {
                // 計算下一個最優硬幣
                const diff   = Game.state.settings.difficulty;
                const denoms = (typeof DENOM_BY_DIFF !== 'undefined')
                    ? (DENOM_BY_DIFF[diff] || DENOM_BY_DIFF.easy)
                    : [1, 5, 10, 50];
                const sorted = [...denoms].sort((a, b) => b - a);
                let nextDenom = sorted[0];
                for (const d of sorted) {
                    if (d <= remaining) { nextDenom = d; break; }
                }
                const el = document.querySelector(`.b1-coin-draggable[data-denom="${nextDenom}"]`);
                if (el) this._highlight(el, () => Game.addCoin(nextDenom));
            }
        },

        _executeStep() {
            if (!this._enabled) return;
            const fn = this._pendingAction;
            this._clearHighlight();
            this._pendingAction = null;
            if (fn) fn();
            // 重建下一步（同步執行後 wallet 已更新）
            Game.TimerManager.setTimeout(() => { if (this._enabled) this.buildQueue(); }, 120, 'ui');
        },

        _pendingAction: null,

        _startObserver() {
            const app = document.getElementById('app');
            if (!app) return;
            let t = null;
            this._observer = new MutationObserver(() => {
                if (!this._enabled) return;
                if (t) window.clearTimeout(t);
                t = window.setTimeout(() => { if (this._enabled) this.buildQueue(); }, 300);
            });
            this._observer.observe(app, { childList: true, subtree: true, attributes: true });
        },

        _highlight(el, action) {
            this._clearHighlight();
            if (!el) return;
            el.classList.add('assist-click-hint');
            this._lastHighlighted = el;
            this._pendingAction   = action || null;
        },

        _clearHighlight() {
            if (this._lastHighlighted) {
                this._lastHighlighted.classList.remove('assist-click-hint');
                this._lastHighlighted = null;
            }
            document.querySelectorAll('.assist-click-hint').forEach(e => e.classList.remove('assist-click-hint'));
            this._pendingAction = null;
        }
    };

    Game.init();
});
