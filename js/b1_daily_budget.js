// =============================================================
// FILE: js/b1_daily_budget.js — B1 今天帶多少錢
// 建立日期：2026-03-14
// =============================================================
'use strict';

// ── 場景資料庫（含 category 欄位供類別篩選）──────────────────────
// 類別：school（學校）| food（飲食）| outdoor（戶外）| entertainment（娛樂）| shopping（購物）
// 每個 item 以 min/max 定義價格區間，由 _generateQuestions 隨機取值（5元倍數）
const B1_SCENARIOS = {
    easy: [
        { icon:'🏫', label:'去學校',    cat:'school',        items:[{ name:'午餐費',   min:40,  max:65  }] },
        { icon:'🏪', label:'去超商',    cat:'shopping',      items:[{ name:'飲料費',   min:20,  max:35  }] },
        { icon:'📚', label:'圖書館',    cat:'school',        items:[{ name:'影印費',   min:5,   max:20  }] },
        { icon:'🎭', label:'看表演',    cat:'entertainment', items:[{ name:'表演票',   min:80,  max:150 }] },
        { icon:'🏊', label:'游泳課',    cat:'outdoor',       items:[{ name:'入場費',   min:60,  max:100 }] },
        { icon:'🎨', label:'美術課',    cat:'school',        items:[{ name:'材料費',   min:25,  max:50  }] },
        { icon:'🚌', label:'搭公車',    cat:'school',        items:[{ name:'公車票',   min:15,  max:30  }] },
        { icon:'🌿', label:'逛公園',    cat:'outdoor',       items:[{ name:'停車費',   min:15,  max:30  }] },
        { icon:'☕', label:'買早餐',    cat:'food',          items:[{ name:'早餐費',   min:25,  max:55  }] },
        { icon:'🐟', label:'買魚飼料',  cat:'shopping',      items:[{ name:'飼料費',   min:35,  max:65  }] },
        { icon:'🎬', label:'看電影',    cat:'entertainment', items:[{ name:'電影票',   min:100, max:160 }] },
        { icon:'🍜', label:'吃點心',    cat:'food',          items:[{ name:'點心費',   min:30,  max:60  }] },
        { icon:'🛒', label:'買文具',    cat:'shopping',      items:[{ name:'文具費',   min:40,  max:75  }] },
        { icon:'⛺', label:'踏青',      cat:'outdoor',       items:[{ name:'門票費',   min:50,  max:80  }] },
        { icon:'🍦', label:'買冰淇淋',  cat:'food',          items:[{ name:'冰淇淋費', min:20,  max:50  }] },
        { icon:'🎮', label:'電玩體驗',  cat:'entertainment', items:[{ name:'遊戲費',   min:30,  max:60  }] },
        { icon:'🌸', label:'賞花展',    cat:'outdoor',       items:[{ name:'門票費',   min:50,  max:100 }] },
        { icon:'🐾', label:'寵物店',    cat:'shopping',      items:[{ name:'零食費',   min:30,  max:60  }] },
    ],
    normal: [
        { icon:'🏫', label:'上學日',    cat:'school',        items:[{ name:'午餐費',  min:50,  max:85  }, { name:'公車票',  min:15,  max:35  }] },
        { icon:'🎨', label:'才藝課',    cat:'school',        items:[{ name:'課程費',  min:120, max:220 }, { name:'材料費',  min:40,  max:80  }] },
        { icon:'🏥', label:'看醫生',    cat:'school',        items:[{ name:'掛號費',  min:100, max:200 }, { name:'藥費',    min:60,  max:130 }] },
        { icon:'🎬', label:'看電影',    cat:'entertainment', items:[{ name:'電影票',  min:200, max:330 }, { name:'爆米花',  min:60,  max:120 }] },
        { icon:'🚂', label:'搭火車',    cat:'outdoor',       items:[{ name:'火車票',  min:180, max:360 }, { name:'便當費',  min:60,  max:110 }] },
        { icon:'🏊', label:'去游泳',    cat:'outdoor',       items:[{ name:'入場費',  min:70,  max:130 }, { name:'飲料費',  min:20,  max:45  }] },
        { icon:'📖', label:'買書',      cat:'shopping',      items:[{ name:'故事書',  min:150, max:260 }, { name:'文具費',  min:20,  max:50  }] },
        { icon:'🌄', label:'爬山',      cat:'outdoor',       items:[{ name:'門票費',  min:80,  max:160 }, { name:'食物費',  min:80,  max:160 }] },
        { icon:'🎮', label:'遊樂場',    cat:'entertainment', items:[{ name:'門票費',  min:150, max:260 }, { name:'零食費',  min:40,  max:80  }] },
        { icon:'🍜', label:'吃午飯',    cat:'food',          items:[{ name:'午餐費',  min:70,  max:130 }, { name:'飲料費',  min:25,  max:50  }] },
        { icon:'🏫', label:'補習班',    cat:'school',        items:[{ name:'課程費',  min:150, max:300 }, { name:'文具費',  min:20,  max:55  }] },
        { icon:'🍰', label:'下午茶',    cat:'food',          items:[{ name:'飲料費',  min:45,  max:80  }, { name:'點心費',  min:50,  max:95  }] },
        { icon:'🛒', label:'買玩具',    cat:'shopping',      items:[{ name:'玩具費',  min:200, max:400 }, { name:'電池費',  min:35,  max:65  }] },
        { icon:'🎡', label:'遊樂場',    cat:'entertainment', items:[{ name:'入場費',  min:120, max:210 }, { name:'零食費',  min:45,  max:85  }] },
        { icon:'🍣', label:'吃壽司',    cat:'food',          items:[{ name:'壽司費',  min:150, max:300 }, { name:'飲料費',  min:25,  max:50  }] },
        { icon:'🥐', label:'買麵包',    cat:'food',          items:[{ name:'麵包費',  min:40,  max:75  }, { name:'咖啡費',  min:45,  max:80  }] },
        { icon:'💇', label:'去剪髮',    cat:'shopping',      items:[{ name:'剪髮費',  min:150, max:300 }, { name:'洗髮費',  min:50,  max:100 }] },
        { icon:'🏋️', label:'健身房',   cat:'outdoor',       items:[{ name:'入場費',  min:150, max:300 }, { name:'運動飲料', min:25,  max:50  }] },
        { icon:'🎳', label:'去打保齡球', cat:'entertainment', items:[{ name:'場地費', min:120, max:210 }, { name:'租鞋費',  min:40,  max:70  }] },
        { icon:'🐠', label:'水族館',    cat:'outdoor',       items:[{ name:'門票費',  min:150, max:280 }, { name:'紀念品',  min:50,  max:100 }] },
    ],
    hard: [
        { icon:'🛒', label:'大採購',    cat:'shopping',      items:[{ name:'衣服費',  min:280, max:480 }, { name:'鞋子費',  min:380, max:620 }, { name:'書費',    min:150, max:230 }] },
        { icon:'🎂', label:'買禮物',    cat:'shopping',      items:[{ name:'禮物費',  min:200, max:400 }, { name:'蛋糕費',  min:350, max:520 }, { name:'卡片費',  min:25,  max:55  }] },
        { icon:'🌿', label:'出遊',      cat:'outdoor',       items:[{ name:'公車票',  min:15,  max:35  }, { name:'冰淇淋費', min:35,  max:65  }, { name:'門票費', min:80,  max:160 }, { name:'飲料費', min:25,  max:50 }] },
        { icon:'🏕️', label:'露營',     cat:'outdoor',       items:[{ name:'食材費',  min:280, max:440 }, { name:'裝備費',  min:150, max:300 }, { name:'入場費',  min:120, max:210 }] },
        { icon:'🎡', label:'遊樂園',    cat:'entertainment', items:[{ name:'門票費',  min:450, max:720 }, { name:'餐費',    min:200, max:340 }, { name:'紀念品費', min:150, max:260 }] },
        { icon:'🌍', label:'校外教學',  cat:'school',        items:[{ name:'交通費',  min:60,  max:130 }, { name:'午餐費',  min:90,  max:160 }, { name:'門票費',  min:150, max:300 }, { name:'零用錢', min:80,  max:160 }] },
        { icon:'🎓', label:'畢業典禮',  cat:'school',        items:[{ name:'服裝費',  min:380, max:580 }, { name:'花束費',  min:200, max:400 }, { name:'聚餐費',  min:280, max:450 }] },
        { icon:'🏖️', label:'去海邊',   cat:'outdoor',       items:[{ name:'防曬乳',  min:150, max:260 }, { name:'餐費',    min:250, max:400 }, { name:'停車費',  min:80,  max:160 }, { name:'飲料費', min:50,  max:90 }] },
        { icon:'🍱', label:'聚餐',      cat:'food',          items:[{ name:'餐費',    min:380, max:580 }, { name:'飲料費',  min:100, max:180 }, { name:'甜點費',  min:120, max:210 }] },
        { icon:'🏫', label:'暑期課程',  cat:'school',        items:[{ name:'課程費',  min:400, max:680 }, { name:'教材費',  min:150, max:260 }, { name:'午餐費',  min:80,  max:160 }] },
        { icon:'🛍️', label:'換季採購',  cat:'shopping',      items:[{ name:'外套費',  min:550, max:850 }, { name:'褲子費',  min:280, max:450 }, { name:'包包費',  min:350, max:580 }] },
        { icon:'🎤', label:'KTV 歡唱',  cat:'entertainment', items:[{ name:'包廂費',  min:320, max:530 }, { name:'飲料費',  min:100, max:190 }, { name:'小食費',  min:60,  max:130 }] },
        { icon:'🎳', label:'去打保齡球', cat:'entertainment', items:[{ name:'場地費', min:120, max:210 }, { name:'租鞋費',  min:40,  max:75  }, { name:'飲料費',  min:25,  max:50  }] },
        { icon:'🧸', label:'逛玩具展',  cat:'entertainment', items:[{ name:'門票費',  min:150, max:300 }, { name:'紀念品費', min:120, max:220 }, { name:'餐費',   min:100, max:180 }] },
        { icon:'📱', label:'買手機殼',  cat:'shopping',      items:[{ name:'手機殼',  min:150, max:260 }, { name:'保護貼',  min:40,  max:75  }, { name:'充電線',  min:80,  max:160 }] },
        { icon:'🎻', label:'音樂課',    cat:'school',        items:[{ name:'課程費',  min:320, max:530 }, { name:'樂器耗材', min:60,  max:130 }, { name:'教材費', min:80,  max:160 }] },
        { icon:'🍕', label:'吃披薩',    cat:'food',          items:[{ name:'披薩費',  min:280, max:440 }, { name:'飲料費',  min:50,  max:90  }, { name:'甜點費',  min:60,  max:110 }] },
        { icon:'🏋️', label:'健身房',   cat:'outdoor',       items:[{ name:'月費',    min:280, max:460 }, { name:'運動飲料', min:25,  max:50  }, { name:'毛巾費', min:30,  max:60  }] },
        { icon:'🐠', label:'海生館',    cat:'outdoor',       items:[{ name:'門票費',  min:300, max:480 }, { name:'紀念品費', min:100, max:200 }, { name:'餐費',   min:150, max:280 }] },
        { icon:'🎠', label:'親子遊',    cat:'entertainment', items:[{ name:'樂園票',  min:380, max:600 }, { name:'餐費',    min:200, max:350 }, { name:'玩具費',  min:100, max:200 }, { name:'飲料費', min:50, max:90 }] },
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

// ── 場景標籤去除重複「去」前綴（避免「今天要去：去游泳」）────────
const fmtLabel = label => label.replace(/^去/, '');

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
            settings: { difficulty: null, questionCount: null, retryMode: 'retry', clickMode: 'off', sceneCategory: null, timerEnabled: false, customItemsEnabled: false },
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
                                <button class="b-sel-btn" data-cat="all">隨機 🎲</button>
                                <button class="b-sel-btn" data-cat="school">學校 🏫</button>
                                <button class="b-sel-btn" data-cat="food">飲食 🍜</button>
                                <button class="b-sel-btn" data-cat="outdoor">戶外 🌿</button>
                                <button class="b-sel-btn" data-cat="entertainment">娛樂 🎭</button>
                                <button class="b-sel-btn" data-cat="shopping">購物 🛒</button>
                            </div>
                            <div style="margin-top:4px;font-size:12px;color:#6b7280;">
                                選擇特定類別可以專注練習該情境的金額計算
                            </div>
                            <div id="custom-items-toggle-row" style="display:none;margin-top:10px;">
                                <label style="font-size:13px;color:#374151;font-weight:600;">🛠️ 自訂項目</label>
                                <div class="b-btn-group" id="custom-items-group" style="margin-top:4px;">
                                    <button class="b-sel-btn active" data-custom="off">關閉</button>
                                    <button class="b-sel-btn" data-custom="on">開啟</button>
                                </div>
                                <div style="margin-top:4px;font-size:12px;color:#6b7280;">
                                    開啟後，可在測驗頁面新增或刪除項目，系統將依自訂項目計算所需金額
                                </div>
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
                    const assistGroup  = document.getElementById('assist-click-group');
                    const modeGroup    = document.getElementById('mode-settings-group');
                    const customRow    = document.getElementById('custom-items-toggle-row');
                    if (btn.dataset.diff === 'easy') {
                        if (assistGroup) assistGroup.style.display = '';
                        if (modeGroup && this.state.settings.clickMode === 'on') modeGroup.style.display = 'none';
                        // 簡單模式：隱藏自訂項目，重設為關閉
                        if (customRow) customRow.style.display = 'none';
                        this.state.settings.customItemsEnabled = false;
                        document.querySelectorAll('#custom-items-group [data-custom]').forEach(b => {
                            b.classList.toggle('active', b.dataset.custom === 'off');
                        });
                    } else {
                        if (assistGroup) assistGroup.style.display = 'none';
                        this.state.settings.clickMode = 'off';
                        if (modeGroup) modeGroup.style.display = '';
                        // 普通/困難：顯示自訂項目切換列
                        if (customRow) customRow.style.display = '';
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

            // 自訂項目切換
            document.querySelectorAll('#custom-items-group [data-custom]').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#custom-items-group [data-custom]').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.customItemsEnabled = btn.dataset.custom === 'on';
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
            if (btn) btn.disabled = !s.difficulty || !s.questionCount || !s.sceneCategory;
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
            // 立即清空設定頁，讓彈窗出現在乾淨背景上
            const app = document.getElementById('app');
            if (app) app.innerHTML = '';
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
            const basePool = filtered.length > 0 ? filtered : allScenarios;
            const pool     = [...basePool];
            const result   = [];

            // 隨機取 min~max 範圍內的金額，四捨五入至 5 元倍數
            const randCost = (min, max) => Math.round((min + Math.random() * (max - min)) / 5) * 5 || 5;

            for (let i = 0; i < count; i++) {
                if (pool.length === 0) pool.push(...basePool);
                const idx = Math.floor(Math.random() * pool.length);
                const scenario = pool.splice(idx, 1)[0];
                // 依 min/max 隨機化各項金額（舊格式 cost 直接保留作相容）
                const items = scenario.items.map(it =>
                    it.min != null
                        ? { name: it.name, cost: randCost(it.min, it.max) }
                        : { name: it.name, cost: it.cost }
                );
                const total = items.reduce((s, it) => s + it.cost, 0);
                result.push({ icon: scenario.icon, label: scenario.label, cat: scenario.cat, items, total });
            }
            Game.Debug.log('question', `產生題目 ${result.length} 題（類別：${cat}）`);
            return result;
        },

        // ── 自訂項目合併 helpers ────────────────────────────────
        _getEffectiveItems(curr) {
            const q = this.state.quiz;
            const base   = curr.items.filter(it => !it._deleted);
            const custom = (q.customItems || []).filter(it => !it._deleted);
            return [...base, ...custom];
        },

        _getEffectiveTotal(curr) {
            return this._getEffectiveItems(curr).reduce((s, it) => s + it.cost, 0);
        },

        // ── Render Question ────────────────────────────────────
        renderQuestion() {
            Game.TimerManager.clearAll();
            Game.EventManager.removeAll();
            AssistClick.deactivate();
            this.state.isProcessing = false;
            this.state.wallet = [];
            const q = this.state.quiz;
            q.errorCount = 0;
            q.showHint   = false;
            q.hintSlots  = [];
            q.hardTotalInput = '';
            q.walletRevealed = false;
            q.customItems    = [];
            q.phase = 1;
            // 先顯示場景彈窗（只含目的地），關閉後再渲染 Phase 1
            const curr = q.questions[q.currentQuestion];
            // 重設自訂項目刪除旗標
            if (curr && curr.items) curr.items.forEach(it => { it._deleted = false; });
            this._showTaskModal(curr, () => this._renderPhase1());
        },

        // ── Phase 1：行程確認（看清單 / 計算總額）──────────────────
        _renderPhase1() {
            Game.TimerManager.clearByCategory('gameUI');
            Game.EventManager.removeByCategory('gameUI');

            const q    = this.state.quiz;
            const curr = q.questions[q.currentQuestion];
            const diff = this.state.settings.difficulty;
            const isHard = diff === 'hard';
            const app  = document.getElementById('app');
            const useCustom = this.state.settings.customItemsEnabled && diff !== 'easy';

            // showTotal：easy & normal 顯示實際金額，hard 顯示???
            const showTotal  = diff !== 'hard';
            // showHintBtn：只有 hard 模式在行程卡顯示提示鈕
            const showHintBtn = isHard;

            app.innerHTML = `
            ${this._renderHeader()}
            <div class="b-game-wrap">
                <div class="b1-card-outer-wrap">
                    ${this._renderScheduleCard(curr, showTotal, { showItemAmounts: true, showHintBtn, useCustom })}
                    ${isHard ? `
                    <div class="b1-calc-side-col">
                        <button class="b1-calc-toggle-btn" id="b1-calc-toggle">🧮 開啟計算機</button>
                        <div class="b1-calc-panel" id="b1-calc-panel" style="display:none;">
                            ${this._getCalculatorHTML()}
                        </div>
                    </div>` : ''}
                </div>
                ${diff === 'easy'
                    ? this._renderChoiceButtons(curr)
                    : this._renderTotalInput(isHard, useCustom)
                }
            </div>`;

            this._bindPhase1Events(curr, diff);

            // 彈窗關閉後朗讀費用明細（同步存入 lastSpeechText 供重播按鈕使用）
            Game.TimerManager.setTimeout(() => {
                const lbl = fmtLabel(curr.label);
                const effectiveItems = this._getEffectiveItems(curr);
                const effectiveTotal = this._getEffectiveTotal(curr);
                const names = effectiveItems.map(it => it.name).join('、');
                let speechText;
                if (diff === 'easy') {
                    const it = curr.items[0];
                    speechText = `今天去${lbl}，${it.name}，${toTWD(it.cost)}，請選擇正確的答案。`;
                } else if (diff === 'normal') {
                    speechText = `今天去${lbl}，要準備${names}，總共${toTWD(effectiveTotal)}，請輸入正確的答案。`;
                } else if (isHard) {
                    speechText = `今天去${lbl}，要準備${names}，請計算總計的金額後，輸入正確的答案。`;
                }
                if (speechText) {
                    this.state.quiz.lastSpeechText = speechText;
                    Game.Speech.speak(speechText);
                }
            }, 300, 'speech');

            if (this.state.settings.timerEnabled) {
                Game.TimerManager.setTimeout(() => this._startRouteTimer(curr), 2200, 'countdown');
            }
        },

        // ── Phase 2：準備錢幣（放置金錢）───────────────────────────
        _renderPhase2(curr, diff) {
            Game.TimerManager.clearByCategory('gameUI');
            Game.EventManager.removeByCategory('gameUI');
            this.state.quiz.phase = 2;

            const isEasy = diff === 'easy';
            const effectiveTotal = this._getEffectiveTotal(curr);
            const app = document.getElementById('app');
            app.innerHTML = `
            ${this._renderHeader()}
            <div class="b-game-wrap">
                ${this._renderPhase2RefCard(curr)}
                ${this._renderWalletArea(effectiveTotal)}
                ${!isEasy ? `<div style="display:flex;justify-content:center;margin:8px 0;">
                    <button class="b1-confirm-btn" id="confirm-btn" ${diff === 'hard' ? '' : 'disabled'}>✅ 準備好了，出發！</button>
                </div>` : ''}
                ${this._renderCoinTray(diff)}
            </div>`;

            this._bindPhase2Events(curr);

            Game.Speech.speak(`請準備${toTWD(effectiveTotal)}`);

            // 簡單模式：自動顯示 ghost slot 提示（靜默，無語音/彈窗）
            if (isEasy) {
                Game.TimerManager.setTimeout(() => this._autoSetGhostSlots(curr), 300, 'ui');
            }
        },

        // ── 靜默設定 ghost slots（簡單模式自動提示）──────────────
        _autoSetGhostSlots(curr) {
            const denoms  = DENOM_BY_DIFF[this.state.settings.difficulty] || DENOM_BY_DIFF.easy;
            const optimal = this._calcOptimalCoins(this._getEffectiveTotal(curr), denoms);
            const q = this.state.quiz;
            q.showHint   = true;
            q.hintSlots  = optimal.map(d => ({ denom: d, filled: false }));
            this._updateWalletDisplay();
        },

        // ── Phase 2 迷你參考卡 ──────────────────────────────────────
        _renderPhase2RefCard(curr) {
            const diff = this.state.settings.difficulty;
            const effectiveItems = this._getEffectiveItems(curr);
            const effectiveTotal = this._getEffectiveTotal(curr);
            const itemsSummary = effectiveItems.map(it => `${it.name} ${it.cost}元`).join('・');
            const showHint = diff === 'normal' || diff === 'hard';
            const hintWrap = showHint
                ? `<div class="b1-pr-hint-wrap">
                       <img src="../images/index/educated_money_bag_character.png" alt="" class="b1-hint-mascot" onerror="this.style.display='none'">
                       <button class="b1-hint-btn" id="hint-btn" title="提示">💡 提示</button>
                   </div>`
                : '';
            return `
            <div class="b1-phase2-ref">
                <div class="b1-pr-top-row">
                    <span class="b1-pr-icon">${curr.icon}</span>
                    <div class="b1-pr-info">
                        <span class="b1-pr-label">今天要去：${fmtLabel(curr.label)}</span>
                        <span class="b1-pr-sub">${itemsSummary}</span>
                    </div>
                    ${hintWrap}
                </div>
                <div class="b1-pr-total-row">
                    <div class="b1-pr-total">${effectiveTotal} 元</div>
                </div>
            </div>`;
        },

        // ── 普通/困難模式：總計輸入鍵盤 ─────────────────────────────
        _renderTotalInput(isHard, useCustom) {
            return `
            <div class="b1-hard-total-area" id="b1-hard-total-area">
                <div class="b1-ht-top-row">
                    <div class="b1-ht-label">把每項金額加起來，總共需要幾元？</div>
                </div>
                <div class="b1-ht-total-row">
                    <span class="b1-ht-total-label">總計</span>
                    <div class="b1-ht-display" id="b1-ht-display">___</div>
                    <span class="b1-ht-total-label">元</span>
                </div>
                <div class="b1-ht-numpad" id="b1-ht-numpad">
                    <button class="b1-ht-digit" data-digit="1">1</button>
                    <button class="b1-ht-digit" data-digit="2">2</button>
                    <button class="b1-ht-digit" data-digit="3">3</button>
                    <button class="b1-ht-digit" data-digit="4">4</button>
                    <button class="b1-ht-digit" data-digit="5">5</button>
                    <button class="b1-ht-digit" data-digit="6">6</button>
                    <button class="b1-ht-digit" data-digit="7">7</button>
                    <button class="b1-ht-digit" data-digit="8">8</button>
                    <button class="b1-ht-digit" data-digit="9">9</button>
                    <button class="b1-ht-digit b1-ht-back" data-digit="back">⌫</button>
                    <button class="b1-ht-digit" data-digit="0">0</button>
                    <button class="b1-ht-confirm" id="b1-ht-confirm">✓ 確認</button>
                </div>
                <div class="b1-ht-error" id="b1-ht-error" style="display:none"></div>
            </div>`;
        },

        // ── 自訂項目面板 HTML ──────────────────────────────────────
        _renderCustomItemsPanel(curr) {
            const rows = curr.items.map((it, i) => `
                <div class="b1-cip-row" id="b1-cip-base-${i}">
                    <span class="b1-cip-name">${it.name}</span>
                    <span class="b1-cip-cost">${it.cost}元</span>
                    <button class="b1-cip-del-btn" data-base-idx="${i}" title="刪除">✕</button>
                </div>`).join('');
            return `
            <div class="b1-custom-items-panel" id="b1-custom-panel">
                <div class="b1-cip-header">🛠️ 自訂行程項目</div>
                <div id="b1-cip-base-list">${rows}</div>
                <div id="b1-cip-custom-list"></div>
                <div class="b1-cip-add-row">
                    <input type="text" id="b1-cip-name-input" placeholder="項目名稱" maxlength="8"
                           class="b1-cip-input">
                    <input type="number" id="b1-cip-cost-input" placeholder="金額" min="1" max="9999"
                           class="b1-cip-input b1-cip-cost-inp">
                    <button class="b1-cip-add-btn" id="b1-cip-add-btn">＋ 新增</button>
                </div>
            </div>`;
        },

        // ── 即時更新自訂合計預覽 ──────────────────────────────────
        _updateCustomTotalPreview(curr) {
            const total = this._getEffectiveTotal(curr);
            // 同步更新 schedule card 的 total strip
            const strip = document.querySelector('.b1-ts-amount');
            if (strip) strip.textContent = `${total} 元`;
        },

        _getCalculatorHTML() {
            return `
            <div class="b1-calculator">
                <div class="b1-calc-display" id="b1-calc-display">0</div>
                <div class="b1-calc-buttons">
                    <button class="b1-calc-btn b1-calc-num" data-v="7">7</button>
                    <button class="b1-calc-btn b1-calc-num" data-v="8">8</button>
                    <button class="b1-calc-btn b1-calc-num" data-v="9">9</button>
                    <button class="b1-calc-btn b1-calc-op" data-v="C">C</button>
                    <button class="b1-calc-btn b1-calc-num" data-v="4">4</button>
                    <button class="b1-calc-btn b1-calc-num" data-v="5">5</button>
                    <button class="b1-calc-btn b1-calc-num" data-v="6">6</button>
                    <button class="b1-calc-btn b1-calc-op" data-v="+">+</button>
                    <button class="b1-calc-btn b1-calc-num" data-v="1">1</button>
                    <button class="b1-calc-btn b1-calc-num" data-v="2">2</button>
                    <button class="b1-calc-btn b1-calc-num" data-v="3">3</button>
                    <button class="b1-calc-btn b1-calc-op" data-v="-">-</button>
                    <button class="b1-calc-btn b1-calc-num" data-v="0">0</button>
                    <button class="b1-calc-btn b1-calc-op" data-v="⌫">⌫</button>
                    <button class="b1-calc-btn b1-calc-eq" data-v="=">=</button>
                    <button class="b1-calc-btn b1-calc-op" data-v="×">×</button>
                </div>
            </div>`;
        },

        _bindCalculator() {
            const panel   = document.getElementById('b1-calc-panel');
            const toggle  = document.getElementById('b1-calc-toggle');
            const display = document.getElementById('b1-calc-display');
            if (!panel || !toggle || !display) return;

            let calcVal = '0', calcOp = null, calcPrev = null, calcFresh = false;
            const updateDisp = () => { display.textContent = calcVal; };

            toggle.addEventListener('click', () => {
                const open = panel.style.display === 'none';
                panel.style.display = open ? '' : 'none';
                toggle.textContent = open ? '🧮 關閉計算機' : '🧮 開啟計算機';
            });

            panel.querySelectorAll('.b1-calc-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const v = btn.dataset.v;
                    if (v === 'C') { calcVal = '0'; calcOp = null; calcPrev = null; calcFresh = false; }
                    else if (v === '⌫') { calcVal = calcVal.length > 1 ? calcVal.slice(0, -1) : '0'; }
                    else if (['+', '-', '×'].includes(v)) {
                        // 連續運算：若已有待計算結果，先算出來再接下一步
                        if (calcOp && calcPrev !== null && !calcFresh) {
                            const cur = parseFloat(calcVal);
                            const res = calcOp === '+' ? calcPrev + cur : calcOp === '-' ? calcPrev - cur : calcPrev * cur;
                            calcVal = String(Math.round(res * 1000) / 1000);
                            updateDisp();
                        }
                        calcPrev = parseFloat(calcVal); calcOp = v; calcFresh = true;
                    } else if (v === '=') {
                        if (calcOp && calcPrev !== null) {
                            const cur = parseFloat(calcVal);
                            const res = calcOp === '+' ? calcPrev + cur : calcOp === '-' ? calcPrev - cur : calcPrev * cur;
                            calcVal = String(Math.round(res * 1000) / 1000);
                            calcOp = null; calcPrev = null;
                        }
                    } else {
                        calcVal = (calcFresh || calcVal === '0') ? v : calcVal + v;
                        calcFresh = false;
                    }
                    updateDisp();
                });
            });
        },

        // ── 簡單模式：3個金額選項 ─────────────────────────────────
        _renderChoiceButtons(curr) {
            const choices = this._generateChoices(curr.total);
            return `
            <div class="b1-choice-area">
                <div class="b1-choice-label">這次出門，總共需要帶多少錢？</div>
                <div class="b1-choice-btns">
                    ${choices.map(amt => `
                    <button class="b1-choice-btn" data-amount="${amt}">
                        <span class="b1-choice-amount">${amt} 元</span>
                        <span class="b1-choice-icons">${this._renderMoneyIconsGrouped(amt)}</span>
                    </button>
                    `).join('')}
                </div>
            </div>`;
        },

        _renderMoneyIconsGrouped(amount, maxGroups = 4) {
            const denoms = [1000, 500, 100, 50, 10, 5, 1];
            let rem = amount;
            const groups = [];
            for (const d of denoms) {
                if (rem <= 0) break;
                const count = Math.floor(rem / d);
                if (count > 0) {
                    groups.push({ denom: d, count });
                    rem -= count * d;
                }
                if (groups.length >= maxGroups) break;
            }
            if (groups.length === 0) return '';
            return groups.map(g => {
                const isBill = g.denom >= 100;
                const w = isBill ? 36 : 26;
                const countBadge = g.count > 1 ? `<span class="b1-mic-count">×${g.count}</span>` : '';
                return `<span class="b1-mic-item">
                    <img src="../images/money/${g.denom}_yuan_front.png" alt="${g.denom}元"
                         style="width:${w}px;height:${isBill ? 'auto' : w + 'px'};${isBill ? 'border-radius:3px' : 'border-radius:50%'};display:block;"
                         onerror="this.style.display='none'" draggable="false">${countBadge}
                </span>`;
            }).join('');
        },

        _generateChoices(correct) {
            const candidates = new Set([correct]);
            const offsets = [10, 20, 15, 30, 25, 5, 40, 50];
            let i = 0;
            while (candidates.size < 3 && i < offsets.length * 2) {
                const sign = i % 2 === 0 ? 1 : -1;
                const c = correct + sign * offsets[Math.floor(i / 2)];
                if (c > 0) candidates.add(c);
                i++;
            }
            return [...candidates].sort(() => Math.random() - 0.5);
        },

        // 困難模式逐項朗讀（含各項金額）
        _speakItemsOneByOneHard(curr) {
            const items = curr.items;
            let idx = 0;
            const next = () => {
                if (idx < items.length) {
                    const it = items[idx++];
                    Game.Speech.speak(`${it.name}，${toTWD(it.cost)}`);
                    Game.TimerManager.setTimeout(next, 1000, 'speech');
                }
            };
            next();
        },

        // ── Phase 1 事件繫結 ──────────────────────────────────────
        _bindPhase1Events(curr, diff) {
            const isHard = diff === 'hard';

            Game.EventManager.on(document.getElementById('back-to-settings'), 'click', () => {
                this.showSettings();
            }, {}, 'gameUI');

            Game.EventManager.on(document.getElementById('replay-speech-btn'), 'click', () => {
                const text = this.state.quiz.lastSpeechText;
                if (text) Game.Speech.speak(text);
            }, {}, 'gameUI');

            Game.EventManager.on(document.getElementById('reward-btn-game'), 'click', () => {
                if (typeof RewardLauncher !== 'undefined') RewardLauncher.open();
                else window.open('../reward/index.html', 'RewardSystem', 'width=1200,height=800');
            }, {}, 'gameUI');

            // 提示鈕（行程卡右側，三難度均有）
            const hintBtn = document.getElementById('hint-btn');
            if (hintBtn) {
                Game.EventManager.on(hintBtn, 'click', () => {
                    if (isHard) {
                        // 困難模式：重播費用語音（提示項目金額）
                        this._speakItemsOneByOneHard(curr);
                    } else {
                        // 簡單/普通：顯示建議錢幣彈窗
                        this._showCoinHint();
                    }
                }, {}, 'gameUI');
            }
            if (diff === 'easy') {
                // 簡單模式：3個選項按鈕
                document.querySelectorAll('.b1-choice-btn').forEach(btn => {
                    Game.EventManager.on(btn, 'click', () => {
                        const chosen = parseInt(btn.dataset.amount);
                        if (chosen === curr.total) {
                            this.audio.play('correct');
                            this._showFeedback('✅', '答對了！');
                            btn.classList.add('b1-choice-correct');
                            document.querySelectorAll('.b1-choice-btn').forEach(b => { b.disabled = true; });
                            Game.Speech.speak(`答對了！總共${toTWD(curr.total)}`, () => {
                                this._renderPhase2(curr, diff);
                            });
                        } else {
                            this.audio.play('error');
                            btn.classList.add('b1-choice-wrong');
                            Game.TimerManager.setTimeout(() => btn.classList.remove('b1-choice-wrong'), 800, 'ui');
                            Game.Speech.speak('不對喔，再想想看！');
                        }
                    }, {}, 'gameUI');
                });
            } else {
                // 普通/困難模式：數字鍵盤驗證總額，正確後自動進入 Phase 2
                this._bindTotalNumpad(curr, diff);
                if (diff === 'hard') this._bindCalculator();
                // 自訂項目面板事件
                if (this.state.settings.customItemsEnabled) {
                    this._bindCustomItemsPanel(curr);
                }
            }
        },

        // ── 自訂項目面板事件繫結 ──────────────────────────────────
        _bindCustomItemsPanel(curr) {
            // 刪除/還原原有項目（✕ 按鈕現在直接在 b1-schedule-item 裡）
            document.querySelectorAll('[data-base-idx]').forEach(delBtn => {
                Game.EventManager.on(delBtn, 'click', () => {
                    const idx = parseInt(delBtn.dataset.baseIdx);
                    curr.items[idx]._deleted = !curr.items[idx]._deleted;
                    const row = document.getElementById(`b1-cip-base-${idx}`);
                    if (row) row.classList.toggle('b1-cip-deleted', !!curr.items[idx]._deleted);
                    this._updateCustomTotalPreview(curr);
                    this.audio.play('click');
                }, {}, 'gameUI');
            });

            // 新增項目
            const addBtn = document.getElementById('b1-cip-add-btn');
            if (addBtn) {
                Game.EventManager.on(addBtn, 'click', () => {
                    const nameEl = document.getElementById('b1-cip-name-input');
                    const costEl = document.getElementById('b1-cip-cost-input');
                    const name = nameEl ? nameEl.value.trim() : '';
                    const cost = costEl ? parseInt(costEl.value) : 0;
                    if (!name || !cost || cost < 1) return;
                    const q = this.state.quiz;
                    q.customItems.push({ name, cost });
                    const customIdx = q.customItems.length - 1;
                    const list = document.getElementById('b1-cip-custom-list');
                    if (list) {
                        // 新增項目樣式與原有行程項目一致（b1-schedule-item）
                        const row = document.createElement('div');
                        row.className = 'b1-schedule-item b1-cip-custom-row';
                        row.id = `b1-cip-custom-${customIdx}`;
                        row.innerHTML = `<span class="b1-item-name">📌 ${name}</span>
                                         <span class="b1-item-cost">${cost} 元</span>
                                         <button class="b1-cip-del-btn" data-custom-idx="${customIdx}">✕</button>`;
                        list.appendChild(row);
                        const delBtn2 = row.querySelector('[data-custom-idx]');
                        if (delBtn2) {
                            Game.EventManager.on(delBtn2, 'click', () => {
                                const ci = parseInt(delBtn2.dataset.customIdx);
                                q.customItems[ci]._deleted = true;
                                row.remove();
                                this._updateCustomTotalPreview(curr);
                                this.audio.play('click');
                            }, {}, 'gameUI');
                        }
                    }
                    if (nameEl) nameEl.value = '';
                    if (costEl) costEl.value = '';
                    this._updateCustomTotalPreview(curr);
                    this.audio.play('click');
                }, {}, 'gameUI');
            }
        },

        _bindTotalNumpad(curr, diff) {
            const q = this.state.quiz;
            const display   = document.getElementById('b1-ht-display');
            const errorEl   = document.getElementById('b1-ht-error');

            const updateDisplay = () => {
                if (display) display.textContent = q.hardTotalInput || '___';
            };

            document.querySelectorAll('.b1-ht-digit').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    const d = btn.dataset.digit;
                    if (d === 'back') {
                        q.hardTotalInput = (q.hardTotalInput || '').slice(0, -1);
                    } else {
                        const next = (q.hardTotalInput || '') + d;
                        if (parseInt(next, 10) <= 99999) q.hardTotalInput = next;
                    }
                    this.audio.play('click');
                    updateDisplay();
                }, {}, 'gameUI');
            });

            const confirmBtn = document.getElementById('b1-ht-confirm');
            if (confirmBtn) {
                Game.EventManager.on(confirmBtn, 'click', () => {
                    const entered = parseInt(q.hardTotalInput, 10);
                    if (!q.hardTotalInput || isNaN(entered)) return;
                    const correctTotal = this._getEffectiveTotal(curr);
                    if (entered === correctTotal) {
                        // 正確！語音播完後自動進入 Phase 2
                        this.audio.play('correct');
                        if (errorEl) errorEl.style.display = 'none';
                        this._showFeedback('✅', '算對了！');
                        if (display) { display.textContent = correctTotal; display.classList.add('b1-ht-correct'); }
                        confirmBtn.disabled = true;
                        document.querySelectorAll('.b1-ht-digit').forEach(b => { b.disabled = true; });
                        Game.Speech.speak(`答對了！總共${toTWD(correctTotal)}`, () => {
                            this._renderPhase2(curr, diff);
                        });
                    } else {
                        // 錯誤
                        this.audio.play('error');
                        q.errorCount = (q.errorCount || 0) + 1;
                        const isOver = entered > correctTotal;
                        const errMsg = isOver ? `算多了，再算算看！` : `算少了，再算算看！`;
                        if (errorEl) {
                            errorEl.textContent = `❌ ${errMsg}`;
                            errorEl.style.display = '';
                        }
                        Game.Speech.speak(`不對喔，${errMsg}`);
                        q.hardTotalInput = '';
                        updateDisplay();
                        // 3次錯誤後自動提示
                        if (q.errorCount >= 3) {
                            Game.TimerManager.setTimeout(() => {
                                const effectiveItems = this._getEffectiveItems(curr);
                                const parts = effectiveItems.map(it => `${it.name}${toTWD(it.cost)}`).join('，');
                                Game.Speech.speak(`${parts}，加起來是${toTWD(correctTotal)}`);
                                if (errorEl) {
                                    errorEl.textContent = `💡 提示：${effectiveItems.map(it => `${it.cost}`).join(' + ')} = ${correctTotal}`;
                                    errorEl.style.display = '';
                                    errorEl.classList.add('b1-ht-hint');
                                }
                            }, 600, 'ui');
                        }
                    }
                }, {}, 'gameUI');
            }

        },

        // ── Phase 2 事件繫結 ──────────────────────────────────────
        _bindPhase2Events(curr) {
            this._setupDragDrop();

            Game.EventManager.on(document.getElementById('confirm-btn'), 'click', () => {
                this.handleConfirm(this._getEffectiveTotal(curr));
            }, {}, 'gameUI');

            // 普通/困難：✕ 按鈕移除錢包幣
            const walletCoinsEl = document.getElementById('wallet-coins');
            if (walletCoinsEl) {
                Game.EventManager.on(walletCoinsEl, 'click', (e) => {
                    const btn = e.target.closest('.b1-wc-remove');
                    if (!btn) return;
                    const uid = parseInt(btn.dataset.uid);
                    if (!isNaN(uid)) this.removeCoin(uid);
                }, {}, 'gameUI');

                // 普通/困難：從錢包拖回拖曳盤
                Game.EventManager.on(walletCoinsEl, 'dragstart', (e) => {
                    const coinEl = e.target.closest('.b1-wc-removable');
                    if (!coinEl) return;
                    const uid = parseInt(coinEl.dataset.uid);
                    if (isNaN(uid)) return;
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/plain', 'remove:' + uid);
                    coinEl.classList.add('b1-dragging');
                }, {}, 'gameUI');
                Game.EventManager.on(walletCoinsEl, 'dragend', (e) => {
                    const coinEl = e.target.closest('.b1-wc-removable');
                    if (coinEl) coinEl.classList.remove('b1-dragging');
                }, {}, 'gameUI');
            }

            // 拖曳盤接收「移回」事件
            const tray = document.querySelector('.b1-coin-tray');
            if (tray) {
                Game.EventManager.on(tray, 'dragover', (e) => {
                    if (e.dataTransfer.getData && e.dataTransfer.types.includes('text/plain')) {
                        e.preventDefault();
                        e.dataTransfer.dropEffect = 'move';
                    }
                }, {}, 'gameUI');
                Game.EventManager.on(tray, 'drop', (e) => {
                    e.preventDefault();
                    const data = e.dataTransfer.getData('text/plain');
                    if (data && data.startsWith('remove:')) {
                        const uid = parseInt(data.slice(7));
                        if (!isNaN(uid)) this.removeCoin(uid);
                    }
                }, {}, 'gameUI');
            }

            Game.EventManager.on(document.getElementById('back-to-settings'), 'click', () => {
                this.showSettings();
            }, {}, 'gameUI');

            // 提示鈕（在迷你參考卡右側，普通/困難模式）
            const hintBtn = document.getElementById('hint-btn');
            if (hintBtn) {
                Game.EventManager.on(hintBtn, 'click', () => {
                    // 困難模式：揭露已放金額
                    if (this.state.settings.difficulty === 'hard') {
                        this.state.quiz.walletRevealed = true;
                        this._updateWalletDisplay();
                    }
                    this._showCoinHint();
                }, {}, 'gameUI');
            }

            Game.EventManager.on(document.getElementById('reward-btn-game'), 'click', () => {
                if (typeof RewardLauncher !== 'undefined') RewardLauncher.open();
                else window.open('../reward/index.html', 'RewardSystem', 'width=1200,height=800');
            }, {}, 'gameUI');

            if (this.state.settings.clickMode === 'on') {
                Game.TimerManager.setTimeout(() => AssistClick.activate(curr), 600, 'ui');
            }
        },

        // 逐項朗讀費用（C2 逐項朗讀 pattern，Round 42）
        _speakItemsOneByOne(q) {
            const items = q.items;
            let idx = 0;
            const next = () => {
                if (idx < items.length) {
                    const it = items[idx++];
                    Game.Speech.speak(`${it.name}，${toTWD(it.cost)}`);
                    Game.TimerManager.setTimeout(next, 950, 'speech');
                } else {
                    Game.TimerManager.setTimeout(
                        () => Game.Speech.speak(`總共${toTWD(q.total)}`),
                        500, 'speech'
                    );
                }
            };
            next();
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

        _renderScheduleCard(q, showTotal, opts = {}) {
            const showItemAmounts = opts.showItemAmounts !== false; // default true
            const showHintBtn     = opts.showHintBtn    !== false; // default true
            const useCustom       = opts.useCustom      === true;
            const isHard   = this.state.settings.difficulty === 'hard';
            const catBadgeMap = { school:'📚', food:'🍔', outdoor:'🌳', entertainment:'🎭', shopping:'🛒' };
            const catBadge = catBadgeMap[q.cat] ? `<span class="b1-item-cat-badge">${catBadgeMap[q.cat]}</span>` : '';
            const itemsHtml = q.items.map((it, idx) => {
                const showAmt = showItemAmounts;
                const pctBar = showAmt && !isHard && q.total > 0
                    ? `<div class="b1-item-pct-bar-wrap"><div class="b1-item-pct-bar" style="width:${Math.round(it.cost / q.total * 100)}%"></div></div>`
                    : '';
                const delBtn = useCustom
                    ? `<button class="b1-cip-del-btn b1-item-del-btn" data-base-idx="${idx}" title="刪除">✕</button>`
                    : '';
                return `
                <div class="b1-schedule-item b1-item-enter" id="b1-cip-base-${idx}" style="animation-delay:${idx * 140 + 200}ms">
                    <span class="b1-item-name">📌 ${it.name}${catBadge}</span>
                    <span class="b1-item-cost">${showAmt ? `${it.cost} 元` : '??? 元'}</span>
                    ${pctBar}
                    ${delBtn}
                </div>`;
            }).join('');

            const totalTag = showTotal
                ? `<div class="b1-total-right">
                       <div class="b1-total-right-label">共需金額</div>
                       <span class="b1-total-tag">${q.total} 元</span>
                   </div>`
                : '';

            const isEasyMode = this.state.settings.difficulty === 'easy';
            const hintWrap = (showHintBtn && !isEasyMode)
                ? `<div class="b1-schedule-hint-wrap" id="b1-hint-wrap">
                       <img src="../images/index/educated_money_bag_character.png" alt="" class="b1-hint-mascot" onerror="this.style.display='none'">
                       <button class="b1-hint-btn" id="hint-btn" title="提示">💡 提示</button>
                   </div>`
                : '';

            const catColorMap = { school: 'b1-cat-school', food: 'b1-cat-food', outdoor: 'b1-cat-outdoor', entertainment: 'b1-cat-entertainment', shopping: 'b1-cat-shopping' };
            const catClass = catColorMap[q.cat] || '';

            // 自訂項目：新增清單在 total strip 上方，輸入列在 total strip 下方
            const customListAbove  = useCustom ? `<div id="b1-cip-custom-list"></div>` : '';
            const customAddBelow   = useCustom ? `
                <div class="b1-cip-add-row b1-cip-add-row-inline">
                    <input type="text" id="b1-cip-name-input" placeholder="項目名稱" maxlength="8" class="b1-cip-input">
                    <input type="number" id="b1-cip-cost-input" placeholder="金額" min="1" max="9999" class="b1-cip-input b1-cip-cost-inp">
                    <button class="b1-cip-add-btn" id="b1-cip-add-btn">＋ 新增</button>
                </div>` : '';

            return `
            <div class="b1-schedule-card ${catClass}${useCustom ? ' b1-custom-mode' : ''}">
                <div class="b1-schedule-header">
                    <span class="b1-schedule-icon">${q.icon}</span>
                    <div class="b1-schedule-text">
                        <div class="b1-schedule-label-row">
                            <span class="b1-schedule-label">今天要去：${fmtLabel(q.label)}</span>
                            <button class="b-inline-replay" id="replay-speech-btn" title="重播語音">🔊</button>
                        </div>
                        ${isEasyMode ? '' : '<div class="b1-schedule-subtitle">需要帶這些錢 👇</div>'}
                    </div>
                    ${(isEasyMode || this.state.settings.difficulty === 'normal') ? '' : totalTag}
                    ${hintWrap}
                </div>
                <div class="b1-schedule-items">${itemsHtml}</div>
                ${customListAbove}
                <div class="b1-total-strip">
                    <span class="b1-ts-label">總計金額</span>
                    <span class="b1-ts-amount">${showTotal ? `${q.total} 元` : '??? 元'}</span>
                </div>
                ${customAddBelow}
            </div>`;
        },

        _renderWalletArea(requiredTotal) {
            return `
            <div class="b1-wallet-area" id="wallet-area">
                <div class="b1-wallet-header">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <span class="b1-wallet-title">👛 我的錢包</span>
                    </div>
                    <div class="b1-wallet-total-wrap">
                        <span class="b1-wallet-total-label">已放</span>
                        <span class="b1-wallet-total-val" id="wallet-total">0 元</span>
                        <span class="b1-wallet-sep">/</span>
                        <span class="b1-wallet-goal-tag">需要 ${requiredTotal} 元</span>
                    </div>
                </div>
                <div class="b1-wallet-progress-wrap">
                    <div class="b1-wallet-progress" id="b1-wallet-progress"><div class="b1-wallet-progress-fill" id="b1-wallet-progress-fill"></div></div>
                </div>
                <div class="b1-wallet-coins b1-drop-zone" id="wallet-coins">
                    <span class="b1-wallet-empty">把錢幣拖曳到這裡 👈</span>
                </div>
                <div class="b1-denom-summary" id="b1-denom-summary" style="display:none"></div>
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

        // ── _bindQuestionEvents 已被 _bindPhase1Events / _bindPhase2Events 取代 ──

        // ── Wallet Operations ──────────────────────────────────
        addCoin(denom) {
            const q = this.state.quiz;
            // Ghost slot 模式：只允許放入對應 ghost slot 的面額（B3 _handleNormalDrop pattern）
            if (q.showHint && q.hintSlots?.length) {
                const slotIdx = q.hintSlots.findIndex(s => s.denom === denom && !s.filled);
                if (slotIdx === -1) {
                    this.audio.play('error');
                    return; // 拒絕不符合 ghost slot 的面額
                }
                q.hintSlots[slotIdx].filled = true;
                this.audio.play('coin');
                const uid = ++this.state.uidCounter;
                this.state.wallet.push({ denom, uid, isBanknote: denom >= 100 });
                q.denomStats[denom] = (q.denomStats[denom] || 0) + 1;
                Game.Debug.log('wallet', `加入 ${denom}元（ghost slot ${slotIdx}），合計 ${this._getWalletTotal()}`);
                // 直接移除 ghost class，CSS transition opacity:0.35→1（B3 pattern）
                const slotEl = document.querySelector(`[data-hint-idx="${slotIdx}"]`);
                if (slotEl) slotEl.classList.remove('b1-wallet-ghost-slot');
                // 更新確認按鈕與進度條（不全量重繪 coinsEl）
                this._updateWalletStatusOnly();
                // 簡單模式：所有 ghost slot 填滿後自動確認
                if (this.state.settings.difficulty === 'easy' && q.hintSlots.every(s => s.filled)) {
                    const currQ = this.state.quiz.questions[this.state.quiz.currentQuestion];
                    const req = currQ ? this._getEffectiveTotal(currQ) : 0;
                    Game.TimerManager.setTimeout(() => this.handleConfirm(req), 600, 'ui');
                }
                // 放幣語音：簡單/普通模式播錢包總計，困難模式靜音
                if (this.state.settings.difficulty === 'normal' || this.state.settings.difficulty === 'easy') {
                    const walletNow = this._getWalletTotal();
                    Game.TimerManager.setTimeout(() => Game.Speech.speak(toTWD(walletNow)), 80, 'ui');
                }
                // 浮動標籤
                const coinArea2 = document.getElementById('wallet-coins') || document.getElementById('wallet-area');
                if (coinArea2) {
                    const rect2 = coinArea2.getBoundingClientRect();
                    const popup2 = document.createElement('div');
                    popup2.className = 'b1-coin-popup';
                    popup2.textContent = `+${denom}元`;
                    popup2.style.cssText = `position:fixed;left:${rect2.left + rect2.width/2}px;top:${rect2.top + 10}px;`;
                    document.body.appendChild(popup2);
                    Game.TimerManager.setTimeout(() => { if (popup2.parentNode) popup2.remove(); }, 900, 'ui');
                }
                return;
            }
            this.audio.play('coin');
            const uid = ++this.state.uidCounter;
            this.state.wallet.push({ denom, uid, isBanknote: denom >= 100 });
            q.denomStats[denom] = (q.denomStats[denom] || 0) + 1;
            Game.Debug.log('wallet', `加入 ${denom}元，合計 ${this._getWalletTotal()}`);
            this._updateWalletDisplay();
            // 放幣語音：簡單/普通模式播錢包總計，困難模式靜音
            if (this.state.settings.difficulty === 'normal' || this.state.settings.difficulty === 'easy') {
                const walletNow = this._getWalletTotal();
                Game.TimerManager.setTimeout(() => Game.Speech.speak(toTWD(walletNow)), 80, 'ui');
            }
            // 硬幣浮動標籤（A4 price popup pattern）
            const coinArea = document.querySelector('.b1-coin-tray') || document.getElementById('wallet-coins') || document.getElementById('wallet-area');
            if (coinArea) {
                const rect = coinArea.getBoundingClientRect();
                const popup = document.createElement('div');
                popup.className = 'b1-coin-popup';
                popup.textContent = `+${denom}元`;
                popup.style.cssText = `position:fixed;left:${rect.left + rect.width/2}px;top:${rect.top + 10}px;`;
                document.body.appendChild(popup);
                Game.TimerManager.setTimeout(() => { if (popup.parentNode) popup.remove(); }, 900, 'ui');
            }
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
            const currQ2     = this.state.quiz.questions[this.state.quiz.currentQuestion];
            const required   = currQ2 ? this._getEffectiveTotal(currQ2) : 0;
            const enough     = total >= required;
            const isHard     = this.state.settings.difficulty === 'hard';

            // 更新合計顯示（困難模式按提示後才顯示）
            const totalEl = document.getElementById('wallet-total');
            if (totalEl) {
                const q2 = this.state.quiz;
                if (isHard && !q2.walletRevealed) {
                    totalEl.textContent = '??? 元';
                    totalEl.className = 'b1-wallet-total-val';
                } else {
                    totalEl.textContent = `${total} 元`;
                    const wasEnough = totalEl.classList.contains('enough');
                    totalEl.className = 'b1-wallet-total-val ' + (enough ? 'enough' : (total > 0 ? 'not-enough' : ''));
                    if (enough && !wasEnough && total > 0 && !isHard) {
                        totalEl.classList.add('b1-total-pop');
                        Game.TimerManager.setTimeout(() => totalEl.classList.remove('b1-total-pop'), 500, 'ui');
                    }
                }
            }
            // 更新進度條（困難模式隱藏）
            const fillEl = document.getElementById('b1-wallet-progress-fill');
            const progressWrap = document.getElementById('b1-wallet-progress');
            if (progressWrap) progressWrap.style.display = isHard ? 'none' : '';
            if (fillEl && required > 0 && !isHard) {
                const pct = Math.min(100, Math.round((total / required) * 100));
                fillEl.style.width = pct + '%';
                fillEl.className = 'b1-wallet-progress-fill' + (enough ? ' full' : (pct >= 70 ? ' near' : ''));
            }

            // 更新錢包幣列
            const coinsEl = document.getElementById('wallet-coins');
            if (coinsEl) {
                const q = this.state.quiz;
                if (q.showHint && q.hintSlots?.length) {
                    // Ghost slot 模式（B3 b3-nplaced-ghost-slot pattern）：
                    // 先依已放置硬幣逐一填充 hintSlots，再渲染（已填=正常顯示，未填=淡化）
                    const tmpSlots = q.hintSlots.map(s => ({ ...s, filled: false }));
                    this.state.wallet.forEach(coin => {
                        const idx = tmpSlots.findIndex(s => s.denom === coin.denom && !s.filled);
                        if (idx >= 0) tmpSlots[idx].filled = true;
                    });
                    coinsEl.innerHTML = tmpSlots.map((slot, idx) => {
                        const isBanknote = slot.denom >= 100;
                        const imgW = isBanknote ? '100px' : '60px';
                        const ghostClass = slot.filled ? '' : ' b1-wallet-ghost-slot';
                        return `<div class="b1-wallet-coin${ghostClass}" data-hint-idx="${idx}">
                            <img src="../images/money/${slot.denom}_yuan_front.png" alt="${slot.denom}元"
                                 style="width:${imgW};${isBanknote ? 'border-radius:4px' : 'border-radius:50%'}"
                                 draggable="false" onerror="this.style.display='none'">
                        </div>`;
                    }).join('');
                } else if (this.state.wallet.length === 0) {
                    coinsEl.innerHTML = '<span class="b1-wallet-empty">把錢幣拖曳到這裡 👈</span>';
                } else {
                    const removable = this.state.settings.difficulty === 'normal' || this.state.settings.difficulty === 'hard';
                    coinsEl.innerHTML = this.state.wallet.map(coin => {
                        const imgSrc   = `../images/money/${coin.denom}_yuan_front.png`;
                        const imgClass = coin.isBanknote ? 'banknote-img' : 'coin-img';
                        const imgW     = coin.isBanknote ? '100px' : '60px';
                        const removableAttrs = removable ? `draggable="true" data-denom="${coin.denom}" class="b1-wallet-coin b1-wc-removable"` : `class="b1-wallet-coin"`;
                        const removeBtn = removable ? `<button class="b1-wc-remove" data-uid="${coin.uid}" title="拖回">✕</button>` : '';
                        return `
                        <div ${removableAttrs} data-uid="${coin.uid}">
                            <img src="${imgSrc}" alt="${coin.denom}元" class="${imgClass}"
                                 style="width:${imgW};${coin.isBanknote ? 'border-radius:4px' : 'border-radius:50%'}"
                                 onerror="this.style.display='none'" draggable="false">
                            ${removeBtn}
                        </div>`;
                    }).join('');
                }
            }

            // 確認按鈕狀態（困難模式隨時可點，不受金額控制）
            const confirmBtn = document.getElementById('confirm-btn');
            if (confirmBtn && !isHard) {
                const wasSufficient = !confirmBtn.disabled;
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

            // 面額計數摘要已隱藏（不顯示）
            const denomSummaryEl = document.getElementById('b1-denom-summary');
            if (denomSummaryEl) denomSummaryEl.style.display = 'none';

            // 簡單模式：動態淡化超出剩餘所需的錢幣
            if (this.state.settings.difficulty === 'easy') {
                const remaining = Math.max(0, required - total);
                document.querySelectorAll('.b1-coin-draggable').forEach(el => {
                    const d = parseInt(el.dataset.denom);
                    el.classList.toggle('b1-coin-faded', total > 0 && remaining > 0 && d > remaining);
                });
            }
        },

        // ── Ghost slot 模式下的狀態更新（不重繪 coinsEl）────────
        // 只更新確認按鈕、進度條、面額摘要；coinsEl 已由 ghost class 移除處理
        _updateWalletStatusOnly() {
            const total    = this._getWalletTotal();
            const currQ    = this.state.quiz.questions[this.state.quiz.currentQuestion];
            const required = currQ ? this._getEffectiveTotal(currQ) : 0;
            const enough   = total >= required;

            // 合計顯示
            const totalEl = document.getElementById('wallet-total');
            if (totalEl) {
                totalEl.textContent = `${total} 元`;
                const wasEnough = totalEl.classList.contains('enough');
                totalEl.className = 'b1-wallet-total-val ' + (enough ? 'enough' : (total > 0 ? 'not-enough' : ''));
                if (enough && !wasEnough && total > 0) {
                    totalEl.classList.add('b1-total-pop');
                    Game.TimerManager.setTimeout(() => totalEl.classList.remove('b1-total-pop'), 500, 'ui');
                }
            }
            // 進度條
            const fillEl = document.getElementById('b1-wallet-progress-fill');
            if (fillEl && required > 0) {
                const pct = Math.min(100, Math.round((total / required) * 100));
                fillEl.style.width = pct + '%';
                fillEl.className = 'b1-wallet-progress-fill' + (enough ? ' full' : (pct >= 70 ? ' near' : ''));
            }
            // 確認按鈕
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
                const card = document.querySelector('.b1-schedule-card');
                if (card) card.classList.toggle('exact-match', total === required && total > 0);
            }
            // 面額摘要已隱藏（不顯示）
            const denomSummaryEl2 = document.getElementById('b1-denom-summary');
            if (denomSummaryEl2) denomSummaryEl2.style.display = 'none';
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

        // ── 找零說明動畫（B6 _showChangeFormula pattern）────────
        _showChangeTip(paid, required, change) {
            const prev = document.getElementById('b1-change-tip');
            if (prev) prev.remove();
            const tip = document.createElement('div');
            tip.id = 'b1-change-tip';
            tip.className = 'b1-change-tip';
            tip.innerHTML = `
                <div class="b1-ct-title">💱 找零計算</div>
                <div class="b1-ct-row">
                    <span class="b1-ct-item">${paid}元</span>
                    <span class="b1-ct-op">−</span>
                    <span class="b1-ct-item">${required}元</span>
                    <span class="b1-ct-op">=</span>
                    <span class="b1-ct-ans">找回 ${change} 元</span>
                </div>`;
            document.body.appendChild(tip);
            Game.TimerManager.setTimeout(() => {
                tip.classList.add('b1-ct-fade');
                Game.TimerManager.setTimeout(() => { if (tip.parentNode) tip.remove(); }, 400, 'ui');
            }, 2200, 'ui');
        },

        // ── 行程卡倒數計時器（Round 44）──────────────────────────
        _startRouteTimer(question) {
            const diff = this.state.settings.difficulty;
            const secs = diff === 'easy' ? 30 : diff === 'normal' ? 20 : 15;
            let remaining = secs;
            const el = document.getElementById('b1-route-timer');
            if (!el) return;
            const update = () => {
                if (!el.isConnected) return;
                el.textContent = `⏱ ${remaining}s`;
                el.classList.toggle('b1-rt-urgent', remaining <= 5);
            };
            update();
            const tick = () => {
                if (!el.isConnected) return;
                remaining--;
                update();
                if (remaining <= 0) {
                    el.textContent = '⏱ 0s';
                    this.audio.play('error');
                    Game.Speech.speak('時間到！來看看答案吧！');
                    Game.TimerManager.setTimeout(() => {
                        this._showScheduleBreakdown(question);
                    }, 600, 'countdown');
                    return;
                }
                Game.TimerManager.setTimeout(tick, 1000, 'countdown');
            };
            Game.TimerManager.setTimeout(tick, 1000, 'countdown');
        },

        // ── Confirm ────────────────────────────────────────────
        handleConfirm(requiredTotal) {
            if (this.state.isProcessing) return;
            this.state.isProcessing = true;

            const walletTotal = this._getWalletTotal();
            const diff        = this.state.settings.difficulty;
            const isCorrect   = diff === 'easy' ? walletTotal >= requiredTotal : walletTotal === requiredTotal;

            Game.Debug.log('state', `確認：錢包${walletTotal} 需要${requiredTotal} 正確=${isCorrect}`);

            if (isCorrect) {
                Game.TimerManager.clearByCategory('countdown'); // 停止倒數計時器
                this.audio.play('correct');
                this._showFeedback('✅', '答對了！');
                const diff = walletTotal - requiredTotal;
                let msg = `答對了！你準備了${toTWD(walletTotal)}`;
                if (diff > 0) msg += `，找回${toTWD(diff)}`;
                Game.Speech.speak(msg, () => {
                    // 語音播完後再進入下一題
                    Game.TimerManager.setTimeout(() => this.nextQuestion(), 400, 'turnTransition');
                });
                this.state.quiz.correctCount++;
                this.state.quiz.streak = (this.state.quiz.streak || 0) + 1;
                if (this.state.quiz.streak === 3 || this.state.quiz.streak === 5) {
                    Game.TimerManager.setTimeout(() => this._showStreakBadge(this.state.quiz.streak), 200, 'ui');
                }
                this.state.quiz.solvedSchedules.push(this.state.quiz.questions[this.state.quiz.currentQuestion]);
                // 最少張數提示（C4/C6 最佳付款 pattern）
                this._showMinCoinsHint(walletTotal, requiredTotal);
                // 找零說明動畫（Round 25）
                if (diff > 0) {
                    Game.TimerManager.setTimeout(() => this._showChangeTip(walletTotal, requiredTotal, diff), 300, 'ui');
                }
                return; // nextQuestion 已由 speech callback 處理
            } else {
                this.state.quiz.streak = 0;
                this.audio.play('error');
                this.state.quiz.errorCount = (this.state.quiz.errorCount || 0) + 1;
                this._showFeedback('❌', this.state.settings.retryMode === 'proceed' ? '答錯了！' : '再試一次！');
                if (this.state.settings.retryMode === 'proceed') {
                    Game.Speech.speak(`需要${toTWD(requiredTotal)}，繼續下一題`);
                    Game.TimerManager.setTimeout(() => this.nextQuestion(), 2000, 'turnTransition');
                } else {
                    if (diff === 'normal' || diff === 'hard') {
                        // 普通/困難：清空錢包 + 方向提示
                        const isOver = walletTotal > requiredTotal;
                        const errSpeech = isOver
                            ? `拿了太多的錢，請再試一次`
                            : `拿了太少的錢，請再試一次`;
                        Game.Speech.speak(errSpeech);
                        this.state.wallet = [];
                        this.state.quiz.showHint = false;
                        this.state.quiz.hintSlots = [];
                    } else {
                        Game.Speech.speak(`不對喔，你付的錢太少，請再試一次`);
                    }
                    this.state.isProcessing = false;
                    const walletArea = document.getElementById('wallet-area');
                    if (walletArea) {
                        walletArea.style.animation = 'b1Shake 0.4s ease';
                        Game.TimerManager.setTimeout(() => {
                            walletArea.style.animation = '';
                            this._updateWalletDisplay();
                        }, 500, 'ui');
                    }
                    // 普通模式：3次錯誤後自動顯示 ghost slot 提示
                    if (this.state.settings.difficulty === 'normal' && this.state.quiz.errorCount >= 3) {
                        Game.TimerManager.setTimeout(() => this._showCoinHint(), 700, 'ui');
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
        // 場景彈窗：只顯示目的地圖示＋名稱，不顯示金額；語音念完後自動關閉
        _showTaskModal(curr, afterClose) {
            const existing = document.getElementById('b1-task-modal');
            if (existing) existing.remove();
            const modal = document.createElement('div');
            modal.id = 'b1-task-modal';
            modal.className = 'b1-task-modal';
            modal.innerHTML = `
                <div class="b1-task-modal-inner">
                    <div class="b1-task-modal-icon">${curr.icon}</div>
                    <div class="b1-task-modal-dest">今天要去</div>
                    <div class="b1-task-modal-label">${fmtLabel(curr.label)}</div>
                    <div class="b1-task-modal-tap">點任意處繼續</div>
                </div>`;
            document.body.appendChild(modal);
            let closed = false;
            const closeModal = () => {
                if (closed) return;
                closed = true;
                if (document.body.contains(modal)) modal.remove();
                afterClose?.();
            };
            modal.addEventListener('click', closeModal);
            // 語音：「今天要去[場景]，準備出發！」，播完後自動關閉
            Game.TimerManager.setTimeout(() => {
                const lbl = fmtLabel(curr.label);
                Game.Speech.speak(`今天要去${lbl}，準備出發！`, closeModal);
            }, 300, 'ui');
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
            const optimal = this._calcOptimalCoins(this._getEffectiveTotal(curr), denoms);

            document.querySelectorAll('.b1-coin-draggable').forEach(el => el.classList.remove('b1-coin-hint'));

            const countMap = {};
            optimal.forEach(d => { countMap[d] = (countMap[d] || 0) + 1; });
            Object.keys(countMap).forEach(d => {
                document.querySelectorAll(`.b1-coin-draggable[data-denom="${d}"]`).forEach(el => {
                    el.classList.add('b1-coin-hint');
                });
            });

            // 語音：「可以用N個X元，M個Y元」
            const parts = Object.entries(countMap)
                .sort((a, b) => b[0] - a[0])
                .map(([d, c]) => `${c}個${parseInt(d)}元`);
            Game.Speech.speak(`可以用${parts.join('，')}`);

            // Ghost slots（在 Phase 2 wallet 中顯示）
            const q = this.state.quiz;
            q.showHint = true;
            q.hintSlots = optimal.map(d => ({ denom: d, filled: false }));
            const placed = [...this.state.wallet];
            placed.forEach(coin => {
                const idx = q.hintSlots.findIndex(s => s.denom === coin.denom && !s.filled);
                if (idx >= 0) q.hintSlots[idx].filled = true;
            });
            this._updateWalletDisplay();

            // 顯示 B3 風格提示彈窗
            this._showHintModal(optimal, countMap, parts);

            Game.TimerManager.setTimeout(() => {
                document.querySelectorAll('.b1-coin-draggable').forEach(el => el.classList.remove('b1-coin-hint'));
            }, 6000, 'ui');
        },

        // ── B3 風格提示彈窗（金錢圖示 + 語音）──
        _showHintModal(optimal, countMap, parts) {
            const prev = document.getElementById('b1-hint-modal-overlay');
            if (prev) prev.remove();

            const total = optimal.reduce((s, d) => s + d, 0);

            const denomsHtml = Object.entries(countMap)
                .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
                .map(([d, c]) => {
                    const dn = parseInt(d);
                    const isBanknote = dn >= 100;
                    const imgSize = isBanknote ? '80px' : '48px';
                    const imgsHtml = Array(c).fill(0).map(() =>
                        `<img src="../images/money/${d}_yuan_front.png"
                              style="width:${imgSize};height:${imgSize};object-fit:contain;${isBanknote ? 'border-radius:4px;' : 'border-radius:50%;'}"
                              onerror="this.style.display='none'">`
                    ).join('');
                    return `
                    <div class="b1-hm-group">
                        <div class="b1-hm-imgs">${imgsHtml}</div>
                        <div class="b1-hm-count">${d}元 × ${c}</div>
                    </div>`;
                }).join('');

            const overlay = document.createElement('div');
            overlay.id = 'b1-hint-modal-overlay';
            overlay.className = 'b1-hint-modal-overlay';
            overlay.innerHTML = `
                <div class="b1-hint-modal">
                    <div class="b1-hm-title">💡 建議帶法</div>
                    <div class="b1-hm-body">${denomsHtml}</div>
                    <div class="b1-hm-total">合計：${total} 元</div>
                    <button class="b1-hm-close" id="b1-hm-close">✓ 我知道了</button>
                </div>`;
            document.body.appendChild(overlay);

            const close = () => { if (overlay.parentNode) overlay.remove(); };
            document.getElementById('b1-hm-close')?.addEventListener('click', close);
            overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
            Game.TimerManager.setTimeout(close, 8000, 'ui');
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
            if (accuracy === 100)    { badge = '完美 🥇'; badgeColor = '#f59e0b'; }
            else if (accuracy >= 90) { badge = '優異 🥇'; badgeColor = '#f59e0b'; }
            else if (accuracy >= 70) { badge = '良好 🥈'; badgeColor = '#10b981'; }
            else if (accuracy >= 50) { badge = '努力 🥉'; badgeColor = '#6366f1'; }
            else                     { badge = '練習 ⭐'; badgeColor = '#94a3b8'; }

            // 行程費用清單（最貴/最便宜標記 Round 40）
            const scheduleCardHTML = (() => {
                if (!q.solvedSchedules || q.solvedSchedules.length === 0) return '';
                const maxTotal = Math.max(...q.solvedSchedules.map(s => s.total));
                const minTotal = Math.min(...q.solvedSchedules.map(s => s.total));
                return `
                <div class="b1-res-schedules">
                    <h3>🗓️ 預定的行程</h3>
                    <div class="b1-schedule-rows">
                        ${q.solvedSchedules.map(s => {
                            const tag = s.total === maxTotal && q.solvedSchedules.length > 1
                                ? `<span class="b1-sch-tag most-exp">最貴 💸</span>`
                                : s.total === minTotal && q.solvedSchedules.length > 1
                                ? `<span class="b1-sch-tag cheapest">最便宜 💚</span>`
                                : '';
                            return `
                            <div class="b1-schedule-row">
                                <span class="b1-sch-icon">${s.icon}</span>
                                <span class="b1-sch-label">${s.label}</span>
                                <span class="b1-sch-items">${s.items.map(it => `${it.name}${it.cost}元`).join('・')}</span>
                                <span class="b1-sch-total">${s.total}元</span>
                                ${tag}
                            </div>`;
                        }).join('')}
                    </div>
                </div>`;
            })();

            // 面額使用統計
            const denomEntries = Object.entries(q.denomStats).sort((a, b) => parseInt(b[0]) - parseInt(a[0]));
            const denomCardHTML = denomEntries.length > 0 ? `
            <div class="b-review-card">
                <h3>💰 我的錢包的金額</h3>
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

            // ── 第一頁：測驗回顧 ──
            app.innerHTML = `
<div class="b-review-wrapper">
    <div class="b-review-screen">
        <div class="b-review-header">
            <div class="b-review-emoji">🗓️</div>
            <h1 class="b-review-title">今日行程總覽</h1>
            <p class="b-review-subtitle">看看我的錢包裡準備了多少錢！</p>
        </div>
        ${scheduleCardHTML}
        ${denomCardHTML}
        <button id="b1-view-summary-btn" class="b-review-next-btn">
            📊 查看測驗總結
        </button>
    </div>
</div>`;

            Game.TimerManager.setTimeout(() => {
                document.getElementById('success-sound')?.play();
            }, 100, 'confetti');
            Game.TimerManager.setTimeout(() => {
                Game.Speech.speak('完成了！來看看今日行程總覽吧！');
            }, 600, 'speech');

            Game.EventManager.on(document.getElementById('b1-view-summary-btn'), 'click', () => {
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
            const remaining   = Game._getEffectiveTotal(curr) - walletTotal;

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
