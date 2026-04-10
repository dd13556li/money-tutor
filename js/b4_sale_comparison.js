// =============================================================
// FILE: js/b4_sale_comparison.js — B4 特賣比一比
// 建立日期：2026-03-14
// =============================================================
'use strict';

// ── 商品資料（20組）─────────────────────────────────────────────
// optA 永遠比 optB 貴；顯示時隨機左右交換（swapped 旗標）
const B4_ITEMS = [
    { cat:'stationery', name:'鉛筆盒',       icon:'✏️',  optA:{ store:'文具店',  storeIcon:'🏪', price:85  }, optB:{ store:'超市',   storeIcon:'🛒', price:65  } },
    { cat:'food',       name:'蘋果（1斤）',  icon:'🍎',  optA:{ store:'超市',   storeIcon:'🛒', price:45  }, optB:{ store:'菜市場', storeIcon:'🥬', price:35  } },
    { cat:'stationery', name:'原子筆',       icon:'🖊️', optA:{ store:'書局',   storeIcon:'📚', price:15  }, optB:{ store:'大賣場', storeIcon:'🏬', price:12  } },
    { cat:'food',       name:'礦泉水',       icon:'💧',  optA:{ store:'超商',   storeIcon:'🏪', price:20  }, optB:{ store:'量販店', storeIcon:'🏬', price:13  } },
    { cat:'daily',      name:'洗髮精',       icon:'🧴',  optA:{ store:'藥妝店', storeIcon:'💊', price:189 }, optB:{ store:'量販店', storeIcon:'🏬', price:149 } },
    { cat:'food',       name:'巧克力',       icon:'🍫',  optA:{ store:'超商',   storeIcon:'🏪', price:55  }, optB:{ store:'超市',   storeIcon:'🛒', price:42  } },
    { cat:'daily',      name:'毛巾',         icon:'🧣',  optA:{ store:'百貨',   storeIcon:'🏢', price:250 }, optB:{ store:'市場',   storeIcon:'🥬', price:180 } },
    { cat:'stationery', name:'故事書',       icon:'📖',  optA:{ store:'書店',   storeIcon:'📚', price:280 }, optB:{ store:'二手店', storeIcon:'♻️', price:150 } },
    { cat:'food',       name:'牛奶（1公升）',icon:'🥛',  optA:{ store:'超商',   storeIcon:'🏪', price:65  }, optB:{ store:'超市',   storeIcon:'🛒', price:55  } },
    { cat:'daily',      name:'面紙（一包）', icon:'🧻',  optA:{ store:'超商',   storeIcon:'🏪', price:39  }, optB:{ store:'量販店', storeIcon:'🏬', price:25  } },
    { cat:'clothing',   name:'雨傘',         icon:'☂️',  optA:{ store:'百貨',   storeIcon:'🏢', price:480 }, optB:{ store:'夜市',   storeIcon:'🌙', price:150 } },
    { cat:'food',       name:'餅乾（一盒）', icon:'🍪',  optA:{ store:'超商',   storeIcon:'🏪', price:45  }, optB:{ store:'超市',   storeIcon:'🛒', price:35  } },
    { cat:'daily',      name:'牙刷',         icon:'🪥',  optA:{ store:'藥局',   storeIcon:'💊', price:39  }, optB:{ store:'量販店', storeIcon:'🏬', price:29  } },
    { cat:'stationery', name:'色鉛筆',       icon:'🖍️', optA:{ store:'文具店', storeIcon:'🏪', price:120 }, optB:{ store:'大賣場', storeIcon:'🏬', price:89  } },
    { cat:'food',       name:'果汁（1瓶）',  icon:'🧃',  optA:{ store:'超商',   storeIcon:'🏪', price:35  }, optB:{ store:'超市',   storeIcon:'🛒', price:25  } },
    { cat:'daily',      name:'電池（4顆）',  icon:'🔋',  optA:{ store:'超商',   storeIcon:'🏪', price:85  }, optB:{ store:'量販店', storeIcon:'🏬', price:59  } },
    { cat:'daily',      name:'洗碗精',       icon:'🧼',  optA:{ store:'超市',   storeIcon:'🛒', price:59  }, optB:{ store:'量販店', storeIcon:'🏬', price:45  } },
    { cat:'clothing',   name:'運動鞋',       icon:'👟',  optA:{ store:'品牌店', storeIcon:'👔', price:1580}, optB:{ store:'網購',   storeIcon:'💻', price:1200} },
    { cat:'clothing',   name:'拖鞋',         icon:'🩴',  optA:{ store:'百貨',   storeIcon:'🏢', price:390 }, optB:{ store:'夜市',   storeIcon:'🌙', price:120 } },
    { cat:'clothing',   name:'手套',         icon:'🧤',  optA:{ store:'百貨',   storeIcon:'🏢', price:320 }, optB:{ store:'市場',   storeIcon:'🥬', price:180 } },
    { cat:'daily',      name:'洗手乳',       icon:'🧴',  optA:{ store:'藥局',   storeIcon:'💊', price:55  }, optB:{ store:'量販店', storeIcon:'🏬', price:39  } },
    { cat:'food',       name:'奶茶',         icon:'🧋',  optA:{ store:'手搖店', storeIcon:'🥤', price:60  }, optB:{ store:'超商',   storeIcon:'🏪', price:50  } },
    { cat:'daily',      name:'運動水壺',     icon:'🍶',  optA:{ store:'體育用品店',storeIcon:'⚽',price:350 }, optB:{ store:'量販店', storeIcon:'🏬', price:260 } },
    { cat:'clothing',   name:'帽子',         icon:'🧢',  optA:{ store:'百貨',   storeIcon:'🏢', price:580 }, optB:{ store:'網購',   storeIcon:'💻', price:420 } },
    { cat:'daily',      name:'便當盒',       icon:'🍱',  optA:{ store:'百貨',   storeIcon:'🏢', price:285 }, optB:{ store:'量販店', storeIcon:'🏬', price:199 } },
    { cat:'stationery', name:'筆記本（3本）',icon:'📓',  optA:{ store:'書局',   storeIcon:'📚', price:95  }, optB:{ store:'量販店', storeIcon:'🏬', price:69  } },
    { cat:'food',       name:'口香糖',       icon:'🍬',  optA:{ store:'超商',   storeIcon:'🏪', price:35  }, optB:{ store:'超市',   storeIcon:'🛒', price:25  } },
    { cat:'daily',      name:'浴巾',         icon:'🛁',  optA:{ store:'百貨',   storeIcon:'🏢', price:480 }, optB:{ store:'量販店', storeIcon:'🏬', price:320 } },
    { cat:'food',       name:'醬油（一瓶）', icon:'🫙',  optA:{ store:'超商',   storeIcon:'🏪', price:89  }, optB:{ store:'量販店', storeIcon:'🏬', price:65  } },
    { cat:'daily',      name:'洗衣精',       icon:'🧺',  optA:{ store:'超市',   storeIcon:'🛒', price:159 }, optB:{ store:'量販店', storeIcon:'🏬', price:119 } },
    // 追加 10 組（2026-03-29）
    { cat:'stationery', name:'橡皮擦（2個）',icon:'📎',  optA:{ store:'文具店', storeIcon:'🏪', price:25  }, optB:{ store:'大賣場', storeIcon:'🏬', price:18  } },
    { cat:'food',       name:'果凍（一盒）', icon:'🍮',  optA:{ store:'超商',   storeIcon:'🏪', price:55  }, optB:{ store:'量販店', storeIcon:'🏬', price:38  } },
    { cat:'food',       name:'麵包',         icon:'🍞',  optA:{ store:'咖啡廳', storeIcon:'☕', price:60  }, optB:{ store:'麵包店', storeIcon:'🥐', price:45  } },
    { cat:'food',       name:'鮪魚罐頭',     icon:'🐟',  optA:{ store:'超商',   storeIcon:'🏪', price:45  }, optB:{ store:'量販店', storeIcon:'🏬', price:32  } },
    { cat:'clothing',   name:'雨衣',         icon:'🌧️', optA:{ store:'百貨',   storeIcon:'🏢', price:280 }, optB:{ store:'夜市',   storeIcon:'🌙', price:150 } },
    { cat:'stationery', name:'剪刀',         icon:'✂️', optA:{ store:'文具店', storeIcon:'🏪', price:35  }, optB:{ store:'大賣場', storeIcon:'🏬', price:25  } },
    { cat:'food',       name:'洋芋片（大包）',icon:'🥔', optA:{ store:'超商',   storeIcon:'🏪', price:49  }, optB:{ store:'量販店', storeIcon:'🏬', price:35  } },
    { cat:'daily',      name:'眼藥水',       icon:'💊',  optA:{ store:'藥局',   storeIcon:'💊', price:89  }, optB:{ store:'網購',   storeIcon:'💻', price:65  } },
    { cat:'daily',      name:'保溫瓶',       icon:'🫙',  optA:{ store:'品牌店', storeIcon:'👔', price:650 }, optB:{ store:'量販店', storeIcon:'🏬', price:480 } },
    { cat:'food',       name:'零食禮盒',     icon:'🎁',  optA:{ store:'百貨',   storeIcon:'🏢', price:380 }, optB:{ store:'量販店', storeIcon:'🏬', price:260 } },
];

// ── 三商店比一比題庫（15 組，每組 3 家店，參照 F4 排序設計）──────────────
// stores[0]最貴、stores[1]中間、stores[2]最便宜（生成時再隨機打亂）
const B4_TRIPLE_ITEMS = [
    { cat:'stationery', name:'鉛筆盒',       icon:'✏️',  stores:[{ store:'百貨',   storeIcon:'🏢', price:120 },{ store:'文具店', storeIcon:'🏪', price:85  },{ store:'大賣場', storeIcon:'🏬', price:65  }] },
    { cat:'food',       name:'礦泉水',       icon:'💧',  stores:[{ store:'百貨餐廳',storeIcon:'🏢', price:50  },{ store:'超商',   storeIcon:'🏪', price:25  },{ store:'量販店', storeIcon:'🏬', price:13  }] },
    { cat:'food',       name:'巧克力',       icon:'🍫',  stores:[{ store:'機場免稅',storeIcon:'✈️', price:120 },{ store:'超商',   storeIcon:'🏪', price:55  },{ store:'超市',   storeIcon:'🛒', price:42  }] },
    { cat:'daily',      name:'洗髮精',       icon:'🧴',  stores:[{ store:'百貨',   storeIcon:'🏢', price:280 },{ store:'藥妝店', storeIcon:'💊', price:189 },{ store:'量販店', storeIcon:'🏬', price:149 }] },
    { cat:'stationery', name:'故事書',       icon:'📖',  stores:[{ store:'書店',   storeIcon:'📚', price:320 },{ store:'書局',   storeIcon:'📚', price:280 },{ store:'二手店', storeIcon:'♻️', price:150 }] },
    { cat:'food',       name:'牛奶（1公升）',icon:'🥛',  stores:[{ store:'超商',   storeIcon:'🏪', price:80  },{ store:'超市',   storeIcon:'🛒', price:65  },{ store:'量販店', storeIcon:'🏬', price:50  }] },
    { cat:'stationery', name:'色鉛筆',       icon:'🖍️', stores:[{ store:'百貨',   storeIcon:'🏢', price:180 },{ store:'文具店', storeIcon:'🏪', price:120 },{ store:'大賣場', storeIcon:'🏬', price:89  }] },
    { cat:'food',       name:'果汁（1瓶）',  icon:'🧃',  stores:[{ store:'機場',   storeIcon:'✈️', price:80  },{ store:'超商',   storeIcon:'🏪', price:35  },{ store:'超市',   storeIcon:'🛒', price:25  }] },
    { cat:'daily',      name:'電池（4顆）',  icon:'🔋',  stores:[{ store:'超商',   storeIcon:'🏪', price:120 },{ store:'藥局',   storeIcon:'💊', price:85  },{ store:'量販店', storeIcon:'🏬', price:59  }] },
    { cat:'daily',      name:'毛巾',         icon:'🧣',  stores:[{ store:'百貨',   storeIcon:'🏢', price:350 },{ store:'超市',   storeIcon:'🛒', price:250 },{ store:'市場',   storeIcon:'🥬', price:180 }] },
    { cat:'stationery', name:'筆記本（3本）',icon:'📓',  stores:[{ store:'書局',   storeIcon:'📚', price:150 },{ store:'文具店', storeIcon:'🏪', price:95  },{ store:'量販店', storeIcon:'🏬', price:69  }] },
    { cat:'daily',      name:'洗手乳',       icon:'🧴',  stores:[{ store:'百貨',   storeIcon:'🏢', price:120 },{ store:'藥局',   storeIcon:'💊', price:79  },{ store:'量販店', storeIcon:'🏬', price:55  }] },
    { cat:'food',       name:'奶茶',         icon:'🧋',  stores:[{ store:'咖啡廳', storeIcon:'☕', price:150 },{ store:'手搖店', storeIcon:'🥤', price:60  },{ store:'超商',   storeIcon:'🏪', price:45  }] },
    { cat:'clothing',   name:'運動鞋',       icon:'👟',  stores:[{ store:'品牌旗艦',storeIcon:'👔', price:2800},{ store:'品牌店', storeIcon:'👔', price:1580},{ store:'網購',   storeIcon:'💻', price:1200}] },
    { cat:'daily',      name:'洗碗精',       icon:'🧼',  stores:[{ store:'超商',   storeIcon:'🏪', price:89  },{ store:'超市',   storeIcon:'🛒', price:59  },{ store:'量販店', storeIcon:'🏬', price:45  }] },
    // 追加 5 組（2026-03-29）
    { cat:'stationery', name:'橡皮擦（2個）',icon:'📎',  stores:[{ store:'書局',   storeIcon:'📚', price:45  },{ store:'文具店', storeIcon:'🏪', price:25  },{ store:'大賣場', storeIcon:'🏬', price:18  }] },
    { cat:'food',       name:'果凍（一盒）', icon:'🍮',  stores:[{ store:'超商',   storeIcon:'🏪', price:75  },{ store:'超市',   storeIcon:'🛒', price:55  },{ store:'量販店', storeIcon:'🏬', price:38  }] },
    { cat:'food',       name:'麵包',         icon:'🍞',  stores:[{ store:'星巴克', storeIcon:'☕', price:120 },{ store:'咖啡廳', storeIcon:'☕', price:60  },{ store:'麵包店', storeIcon:'🥐', price:45  }] },
    { cat:'clothing',   name:'雨衣',         icon:'🌧️', stores:[{ store:'百貨',   storeIcon:'🏢', price:480 },{ store:'超市',   storeIcon:'🛒', price:280 },{ store:'夜市',   storeIcon:'🌙', price:150 }] },
    { cat:'food',       name:'洋芋片（大包）',icon:'🥔', stores:[{ store:'超商',   storeIcon:'🏪', price:79  },{ store:'超市',   storeIcon:'🛒', price:49  },{ store:'量販店', storeIcon:'🏬', price:35  }] },
];

// ── 單位比價題庫（12 組，optA 每單位較貴、optB 每單位較便宜）────────
// unit: 商品計算單位；qty/price → perUnit = price/qty（整數）
const B4_UNIT_ITEMS = [
    { cat:'food',       name:'糖果',     icon:'🍬', unit:'個', optA:{ store:'超商',    storeIcon:'🏪', qty:8,  price:56  }, optB:{ store:'超市',   storeIcon:'🛒', qty:10, price:50  } },
    { cat:'stationery', name:'鉛筆',     icon:'✏️', unit:'支', optA:{ store:'文具店',  storeIcon:'🏪', qty:5,  price:40  }, optB:{ store:'大賣場', storeIcon:'🏬', qty:6,  price:36  } },
    { cat:'food',       name:'雞蛋',     icon:'🥚', unit:'顆', optA:{ store:'超商',    storeIcon:'🏪', qty:6,  price:60  }, optB:{ store:'超市',   storeIcon:'🛒', qty:10, price:80  } },
    { cat:'food',       name:'香蕉',     icon:'🍌', unit:'根', optA:{ store:'超市',    storeIcon:'🛒', qty:3,  price:30  }, optB:{ store:'菜市場', storeIcon:'🥬', qty:4,  price:32  } },
    { cat:'food',       name:'水餃',     icon:'🥟', unit:'個', optA:{ store:'冷凍食品',storeIcon:'🏪', qty:10, price:80  }, optB:{ store:'大賣場', storeIcon:'🏬', qty:12, price:84  } },
    { cat:'food',       name:'吐司',     icon:'🍞', unit:'片', optA:{ store:'超商',    storeIcon:'🏪', qty:4,  price:60  }, optB:{ store:'麵包店', storeIcon:'🥐', qty:6,  price:72  } },
    { cat:'food',       name:'小番茄',   icon:'🍅', unit:'顆', optA:{ store:'超商',    storeIcon:'🏪', qty:5,  price:35  }, optB:{ store:'菜市場', storeIcon:'🥬', qty:8,  price:40  } },
    { cat:'food',       name:'優格',     icon:'🫙', unit:'瓶', optA:{ store:'超商',    storeIcon:'🏪', qty:2,  price:50  }, optB:{ store:'超市',   storeIcon:'🛒', qty:4,  price:88  } },
    { cat:'food',       name:'巧克力棒', icon:'🍫', unit:'支', optA:{ store:'超商',    storeIcon:'🏪', qty:3,  price:75  }, optB:{ store:'超市',   storeIcon:'🛒', qty:5,  price:110 } },
    { cat:'daily',      name:'洗衣錠',   icon:'🧼', unit:'顆', optA:{ store:'藥局',    storeIcon:'💊', qty:10, price:120 }, optB:{ store:'量販店', storeIcon:'🏬', qty:15, price:150 } },
    { cat:'food',       name:'果凍',     icon:'🍮', unit:'個', optA:{ store:'超商',    storeIcon:'🏪', qty:3,  price:45  }, optB:{ store:'量販店', storeIcon:'🏬', qty:6,  price:72  } },
    { cat:'daily',      name:'抹布',     icon:'🧹', unit:'條', optA:{ store:'超市',    storeIcon:'🛒', qty:2,  price:30  }, optB:{ store:'量販店', storeIcon:'🏬', qty:4,  price:48  } },
    // 追加 3 組（2026-03-29）
    { cat:'food',       name:'棒棒糖',   icon:'🍭', unit:'支', optA:{ store:'超商',    storeIcon:'🏪', qty:4,  price:48  }, optB:{ store:'量販店', storeIcon:'🏬', qty:6,  price:60  } },
    { cat:'food',       name:'麵條',     icon:'🍜', unit:'包', optA:{ store:'超市',    storeIcon:'🛒', qty:3,  price:90  }, optB:{ store:'量販店', storeIcon:'🏬', qty:5,  price:130 } },
    { cat:'stationery', name:'橡皮擦',   icon:'📎', unit:'個', optA:{ store:'書局',    storeIcon:'📚', qty:3,  price:30  }, optB:{ store:'大賣場', storeIcon:'🏬', qty:5,  price:40  } },
];

// ── 輔助函數 ────────────────────────────────────────────────────
const toTWD = v => typeof convertToTraditionalCurrency === 'function' ? convertToTraditionalCurrency(v) : `${v}元`;

// ── 金錢圖示渲染（貪婪分解，每枚各顯示一張圖）────────────────
const B4_DENOMS = [1000, 500, 100, 50, 10, 5, 1];
// 較小圖示版（用於差額頁價格條，配合 flex-wrap:nowrap）
function b4PriceCoinsBar(price) {
    let rem = price;
    const coins = [];
    for (const d of B4_DENOMS) {
        const n = Math.floor(rem / d);
        for (let i = 0; i < n; i++) coins.push(d);
        rem -= d * n;
    }
    return coins.map(d => {
        const isBill = d >= 100;
        const w  = isBill ? '60px' : '44px';
        const h  = isBill ? 'auto' : '44px';
        const br = isBill ? '4px'  : '50%';
        return `<img src="../images/money/${d}_yuan_front.png" style="width:${w};height:${h};border-radius:${br};flex-shrink:0;" draggable="false" onerror="this.style.display='none'">`;
    }).join('');
}
// 差額算式提示表格：[貴商店] - [便宜商店] = [差額]
function b4DiffFormula(expStore, expPrice, cheapStore, cheapPrice, diff, unit, hideResult = false) {
    const u = unit || '元';
    const diffCell = hideResult
        ? `<div class="b4-dff-price b4-dff-diff b4-dff-unknown">？？？</div>`
        : `<div class="b4-dff-price b4-dff-diff">${diff} ${u}</div>`;
    return `
    <div class="b4-diff-formula">
        <div class="b4-dff-hd">${expStore}</div>
        <div class="b4-dff-op-hd"></div>
        <div class="b4-dff-hd">${cheapStore}</div>
        <div class="b4-dff-op-hd"></div>
        <div class="b4-dff-hd b4-dff-result-hd">便宜</div>
        <div class="b4-dff-price b4-dff-exp">${expPrice} ${u}</div>
        <div class="b4-dff-op">－</div>
        <div class="b4-dff-price b4-dff-cheap">${cheapPrice} ${u}</div>
        <div class="b4-dff-op">＝</div>
        ${diffCell}
    </div>`;
}
function b4PriceCoins(price) {
    let rem = price;
    const coins = [];
    for (const d of B4_DENOMS) {
        const n = Math.floor(rem / d);
        for (let i = 0; i < n; i++) coins.push(d);
        rem -= d * n;
    }
    return coins.map(d => {
        const isBill = d >= 100;
        const w  = isBill ? '100px' : '60px';
        const h  = isBill ? '48.91px' : '60px';
        const br = isBill ? '4px'   : '50%';
        return `<img src="../images/money/${d}_yuan_front.png" style="width:${w};height:${h};border-radius:${br};vertical-align:middle;object-fit:cover;" draggable="false" onerror="this.style.display='none'">`;
    }).join('');
}

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
            settings: { difficulty: null, questionCount: null, retryMode: null, compareStores: null, clickMode: 'off', itemCat: 'all', customItemsEnabled: false },
            quiz: {
                currentQuestion: 0,
                totalQuestions: 10,
                correctCount: 0,
                totalSaved: 0,
                selectErrorCount: 0,
                diffErrorCount: 0,
                streak: 0,
                questions: [],
                comparisonHistory: [],
                startTime: null
            },
            phase: 'select',    // 'select' | 'diff' | 'tripleRank'
            numpadValue: '',
            tripleClickOrder: [],   // 三商店排序點擊順序（hard mode）
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
                /* 三商店比一比（F4 排序 pattern）*/
                .b4-triple-grid {
                    display: flex; flex-wrap: wrap; gap: 12px;
                    justify-content: center; padding: 8px 16px;
                }
                .b4-triple-card {
                    flex: 1; min-width: 100px; max-width: 200px;
                    position: relative;
                }
                .b4-price-hidden { color: #94a3b8; font-size: 1.1em; }
                .b4-rank-badge {
                    position: absolute; top: -10px; right: -10px;
                    font-size: 1.5em; display: none;
                    align-items: center; justify-content: center;
                }
                .b4-triple-clicked { border: 3px solid #f59e0b !important; }
                .b4-rank-hint {
                    font-size: 13px; color: #6b7280; margin-top: 6px;
                }
                .b4-pbar-mid {
                    background: linear-gradient(90deg, #f59e0b, #fbbf24);
                }
                /* 單位比價卡 */
                .b4-unit-card { padding: 14px 10px !important; }
                .b4-unit-qty {
                    font-size: 13px; color: #6b7280; margin-top: 2px;
                }
                .b4-unit-per {
                    font-size: 14px; font-weight: bold; color: #374151;
                    background: #fef3c7; border: 1.5px solid #fbbf24;
                    border-radius: 8px; padding: 3px 8px; margin-top: 4px;
                }
                .b4-unit-per-val {
                    font-size: 1.3em; color: #d97706;
                }
            `;
            document.head.appendChild(s);
        },

        resetGameState() {
            const q = this.state.quiz;
            q.currentQuestion     = 0;
            q.totalQuestions      = this.state.settings.questionCount;
            q.correctCount        = 0;
            q.totalSaved          = 0;
            q.streak              = 0;
            q.questions           = [];
            q.comparisonHistory   = [];
            q.startTime           = null;
            this.state.phase            = 'select';
            this.state.numpadValue      = '';
            this.state.tripleClickOrder = [];
            this.state.isEndingGame     = false;
            this.state.isProcessing     = false;
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
                        <div class="b-setting-group" id="assist-click-group" style="display:none;">
                            <label class="b-setting-label">🤖 輔助點擊</label>
                            <div class="b-btn-group" id="assist-group">
                                <button class="b-sel-btn${this.state.settings.clickMode === 'on' ? ' active' : ''}" data-assist="on">✓ 啟用</button>
                                <button class="b-sel-btn${this.state.settings.clickMode !== 'on' ? ' active' : ''}" data-assist="off">✗ 停用</button>
                            </div>
                            <div style="margin-top:6px;font-size:12px;color:#6b7280;line-height:1.5;">
                                啟用後，只要偵測到點擊便會自動執行下一個步驟
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
                            <label class="b-setting-label">🏪 比較方式</label>
                            <div class="b-btn-group">
                                <button class="b-sel-btn" data-stores="two">兩家店</button>
                                <button class="b-sel-btn" data-stores="triple">三家店排序 🎲</button>
                                <button class="b-sel-btn" data-stores="unit">單位比價 📦</button>
                            </div>
                            <div style="margin-top:6px;font-size:12px;color:#6b7280;line-height:1.5;">
                                兩家店：比較兩間商店價格 ｜ 三家店：三間商店由便宜到貴排序 ｜ 單位比價：計算每單位的價格再比較
                            </div>
                        </div>
                        <div class="b-setting-group">
                            <label class="b-setting-label">🏷️ 商品類別</label>
                            <div class="b-btn-group" id="cat-group">
                                <button class="b-sel-btn active" data-cat="all">全部</button>
                                <button class="b-sel-btn" data-cat="food">食品飲料</button>
                                <button class="b-sel-btn" data-cat="stationery">文具書籍</button>
                                <button class="b-sel-btn" data-cat="daily">生活用品</button>
                                <button class="b-sel-btn" data-cat="clothing">服飾配件</button>
                            </div>
                            <div id="b4-custom-price-toggle-row" style="display:none;margin-top:8px;">
                                <label style="font-size:13px;color:#374151;font-weight:600;">🛠️ 自訂價格</label>
                                <div class="b-btn-group" id="b4-custom-price-group" style="margin-top:4px;">
                                    <button class="b-sel-btn active" data-custom="off">關閉</button>
                                    <button class="b-sel-btn" data-custom="on">開啟</button>
                                </div>
                                <div style="margin-top:4px;font-size:12px;color:#6b7280;">開啟後，可在題目頁面修改兩間商店的價格，系統重新計算比較結果（兩家店模式）</div>
                            </div>
                        </div>
                        <div class="b-setting-group" id="mode-settings-group">
                            <label class="b-setting-label">🔄 作答模式</label>
                            <div class="b-btn-group">
                                <button class="b-sel-btn" data-mode="retry">反複作答</button>
                                <button class="b-sel-btn" data-mode="proceed">單次作答</button>
                            </div>
                            <div style="margin-top:6px;font-size:12px;color:#6b7280;line-height:1.5;">
                                反複作答：答錯可以再試 ｜ 單次作答：顯示正確答案後繼續
                            </div>
                        </div>
                        <div class="b-setting-group">
                            <label class="b-setting-label">📝 作業單</label>
                            <div class="b-btn-group">
                                <a href="#" id="settings-worksheet-link" class="b-sel-btn active"
                                   style="text-decoration:none;display:inline-flex;align-items:center;justify-content:center;">
                                    產生作業單
                                </a>
                            </div>
                        </div>
                        <div class="b-setting-group">
                            <label class="b-setting-label">🎁 獎勵系統</label>
                            <div class="b-btn-group">
                                <a href="#" id="settings-reward-link" class="b-sel-btn active"
                                   style="text-decoration:none;display:inline-flex;align-items:center;justify-content:center;">
                                    開啟獎勵系統
                                </a>
                            </div>
                        </div>
                        <div class="b-setting-group">
                            <label style="font-size:13px;color:#6b7280;text-align:left;display:block;">
                                ✨ 比較商店價格，找出最划算的選擇！<br>
                                兩家店：簡單選最便宜；三家店：由便宜到貴依序排列（F4 排序應用）；單位比價：算每單位價格再比較（÷ 應用）
                            </label>
                        </div>
                    </div>
                    <div class="game-buttons">
                        <button class="back-btn" onclick="Game.backToMenu()">返回主選單</button>
                        <button class="start-btn" id="start-btn" disabled>▶ 開始練習</button>
                    </div>
                </div>
            </div>`;

            this._bindSettingsEvents();
        },

        _diffDescriptions: {
            easy:   '簡單：點選最划算的那家商店，答對就過關！',
            normal: '普通：選出最划算的之後，再回答差了多少（三選一）',
            hard:   '困難（兩/三家店）：選最划算的後自己輸入差額；（三家店）由便宜到貴依序點選'
        },

        _bindSettingsEvents() {
            Game.EventManager.removeByCategory('settings');
            const _updateCustomPriceToggle = () => {
                const toggle = document.getElementById('b4-custom-price-toggle-row');
                if (!toggle) return;
                const s = this.state.settings;
                const show = s.difficulty !== 'easy' && s.compareStores === 'two';
                toggle.style.display = show ? '' : 'none';
                if (!show) {
                    this.state.settings.customItemsEnabled = false;
                    document.querySelectorAll('#b4-custom-price-group [data-custom]').forEach(b => b.classList.toggle('active', b.dataset.custom === 'off'));
                }
            };

            document.querySelectorAll('[data-diff]').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('[data-diff]').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.difficulty = btn.dataset.diff;
                    const desc = document.getElementById('diff-desc');
                    if (desc) { desc.textContent = this._diffDescriptions[btn.dataset.diff]; desc.classList.add('show'); }
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
                    _updateCustomPriceToggle();
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

            document.querySelectorAll('[data-stores]').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('[data-stores]').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.compareStores = btn.dataset.stores;
                    _updateCustomPriceToggle();
                    this._checkCanStart();
                }, {}, 'settings');
            });

            document.querySelectorAll('#cat-group [data-cat]').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#cat-group [data-cat]').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.itemCat = btn.dataset.cat;
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

            document.querySelectorAll('#b4-custom-price-group [data-custom]').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#b4-custom-price-group [data-custom]').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.customItemsEnabled = btn.dataset.custom === 'on';
                }, {}, 'settings');
            });

            document.querySelectorAll('[data-assist]').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('[data-assist]').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.clickMode = btn.dataset.assist;
                    const modeGroup = document.getElementById('mode-settings-group');
                    if (modeGroup) {
                        modeGroup.style.display = (this.state.settings.difficulty === 'easy' && btn.dataset.assist === 'on') ? 'none' : '';
                    }
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
            const s = this.state.settings;
            const retryOk = (s.difficulty === 'easy' && s.clickMode === 'on') || !!s.retryMode;
            if (btn) btn.disabled = !s.difficulty || !s.questionCount || !retryOk || !s.compareStores;
        },

        // ── Start Game ─────────────────────────────────────────
        startGame() {
            Game.EventManager.removeByCategory('settings');
            Game.TimerManager.clearAll();

            const s = this.state.settings;
            const q = this.state.quiz;
            q.currentQuestion   = 0;
            q.totalQuestions    = s.questionCount;
            q.correctCount      = 0;
            q.totalSaved        = 0;
            q.streak            = 0;
            q.comparisonHistory = [];
            q.startTime         = Date.now();
            q.questions         = this._generateQuestions(q.totalQuestions);

            this.state.phase         = 'select';
            this.state.numpadValue   = '';
            this.state.isEndingGame = false;
            this.state.isProcessing  = false;

            this.renderQuestion();
        },

        _generateQuestions(count) {
            const compareStores = this.state.settings.compareStores;
            const itemCat = this.state.settings.itemCat || 'all';
            const isTriple = compareStores === 'triple';
            const isUnit   = compareStores === 'unit';
            const basePool = isTriple ? B4_TRIPLE_ITEMS : (isUnit ? B4_UNIT_ITEMS : B4_ITEMS);
            const filtered = itemCat !== 'all' ? basePool.filter(i => i.cat === itemCat) : basePool;
            const catPool  = filtered.length >= 2 ? filtered : basePool;
            const pool     = [...catPool];
            const result   = [];
            for (let i = 0; i < count; i++) {
                if (pool.length === 0) pool.push(...catPool);
                const idx  = Math.floor(Math.random() * pool.length);
                const item = pool.splice(idx, 1)[0];

                if (isTriple) {
                    // 隨機打亂三家店的顯示順序
                    const shuffled = [...item.stores].sort(() => Math.random() - 0.5);
                    // 由便宜到貴排序（cheapest = index 0）
                    const sortedAsc = [...item.stores].sort((a, b) => a.price - b.price);
                    // 在打亂陣列中找各排名的位置
                    const cheapestIdx  = shuffled.findIndex(s => s.price === sortedAsc[0].price);
                    const middleIdx    = shuffled.findIndex(s => s.price === sortedAsc[1].price);
                    const mostExpIdx   = shuffled.findIndex(s => s.price === sortedAsc[2].price);
                    const diff = sortedAsc[2].price - sortedAsc[0].price; // 最貴 - 最便宜
                    result.push({ ...item, stores: shuffled, sortedAsc, cheapestIdx, middleIdx, mostExpIdx, diff, isTriple: true, isUnit: false });
                } else if (isUnit) {
                    // 單位比價：計算每單位價格（整數）
                    const perA   = item.optA.price / item.optA.qty; // optA 永遠貴
                    const perB   = item.optB.price / item.optB.qty; // optB 永遠便宜
                    const diff   = perA - perB;
                    const swapped = Math.random() < 0.5;
                    result.push({ ...item, swapped, perA, perB, diff, isTriple: false, isUnit: true });
                } else {
                    // 價格動態變化（普通/困難模式 ±10%/±20%，C5 PriceStrategy pattern）
                    let finalItem = item;
                    const difficulty = this.state.settings.difficulty;
                    if (difficulty === 'normal' || difficulty === 'hard') {
                        const pct = difficulty === 'hard' ? 0.20 : 0.10;
                        let priceA = Math.round(item.optA.price * (1 + (Math.random() * 2 - 1) * pct) / 5) * 5;
                        let priceB = Math.round(item.optB.price * (1 + (Math.random() * 2 - 1) * pct) / 5) * 5;
                        priceA = Math.max(priceA, 5);
                        priceB = Math.max(priceB, 5);
                        // 確保 optA 仍較貴（若隨機使 A ≤ B，則不套用變化）
                        if (priceA > priceB) {
                            finalItem = { ...item, optA: { ...item.optA, price: priceA }, optB: { ...item.optB, price: priceB } };
                        }
                    }
                    // 隨機決定左右交換
                    const swapped = Math.random() < 0.5;
                    const diff    = finalItem.optA.price - finalItem.optB.price; // optB 永遠便宜
                    result.push({ ...finalItem, swapped, diff, isTriple: false, isUnit: false });
                }
            }
            return result;
        },

        // ── Render Question ────────────────────────────────────
        renderQuestion() {
            Game.TimerManager.clearAll();
            Game.EventManager.removeByCategory('gameUI');
            AssistClick.deactivate();
            this.state.isProcessing    = false;
            this.state.phase           = 'select';
            this.state.numpadValue     = '';
            this.state.tripleClickOrder = [];

            const q    = this.state.quiz;
            const curr = q.questions[q.currentQuestion];
            const diff = this.state.settings.difficulty;
            const app  = document.getElementById('app');

            // 三商店模式路由
            if (curr.isTriple) {
                this._renderTripleQuestion(curr, diff, app);
                return;
            }

            // 決定左右
            const left  = curr.swapped ? curr.optB : curr.optA;
            const right = curr.swapped ? curr.optA : curr.optB;
            // 正確答案：便宜的是 optB；若 swapped，便宜在左（left=optB）
            const correctSide = curr.swapped ? 'left' : 'right';

            const questionLabel = curr.isUnit
                ? `哪家每${curr.unit}比較划算？`
                : `哪個地方比較便宜？`;

            app.innerHTML = `
            ${this._renderHeader()}
            <div class="b-game-wrap">
                <div class="b4-item-hero" style="position:relative;">
                    <span class="b4-item-icon">${curr.icon}</span>
                    <div class="b4-item-name">${curr.name}</div>
                    <div class="b4-question-label">
                        ${questionLabel}
                        <button class="b-inline-replay" id="replay-speech-btn" title="重播語音">🔊</button>
                    </div>
                    ${diff === 'easy' && !curr.isUnit ? `<div class="b4-easy-coin-hint">👆 點擊每一枚金幣，點完後自動比較</div>` : ''}
                    ${diff !== 'easy' ? `<div class="b4-hero-hint-wrap" id="b4-hero-hint-wrap">
                        <img src="../images/index/educated_money_bag_character.png" alt="" class="b4-hint-mascot" onerror="this.style.display='none'">
                        <button class="b4-hero-hint-btn" id="b4-hero-hint-btn">💡 提示</button>
                    </div>` : ''}
                </div>
                <div class="b4-compare-grid" id="compare-grid">
                    ${this._renderOptionCard('left', left, curr.isUnit ? curr.optB.price / curr.optB.qty : curr.optB.price, correctSide, curr.isUnit ? curr : null)}
                    <div class="b4-vs-divider">VS</div>
                    ${this._renderOptionCard('right', right, curr.isUnit ? curr.optB.price / curr.optB.qty : curr.optB.price, correctSide, curr.isUnit ? curr : null)}
                </div>
                ${this.state.settings.customItemsEnabled && !curr.isTriple && !curr.isUnit && diff !== 'easy' ? `
                <div class="b4-custom-price-panel" id="b4-cpp-panel">
                    <div class="b4-cpp-header">🛠️ 自訂價格</div>
                    <div class="b4-cpp-row">
                        <label class="b4-cpp-label">${left.store}：</label>
                        <input type="number" id="b4-cpp-left" class="b4-cpp-input" value="${left.price}" min="1" max="99999">
                        <span>元</span>
                    </div>
                    <div class="b4-cpp-row">
                        <label class="b4-cpp-label">${right.store}：</label>
                        <input type="number" id="b4-cpp-right" class="b4-cpp-input" value="${right.price}" min="1" max="99999">
                        <span>元</span>
                    </div>
                    <button class="b4-cpp-apply-btn" id="b4-cpp-apply-btn">套用自訂價格</button>
                </div>` : ''}
                <div id="diff-section"></div>
            </div>`;

            this._bindSelectEvents(curr, correctSide, left, right);

            // 依難度揭露卡片
            if (diff === 'easy') {
                this._setupEasyModeCoins(curr, left, right, correctSide);
            } else if (diff === 'normal') {
                this._setupNormalModeCoins(curr, left, right, correctSide);
            } else {
                // hard: 金幣預先顯示，價格以？？？隱藏，等提示鈕才揭露數字
                ['left', 'right'].forEach(s => {
                    const priceEl = document.querySelector(`#card-${s} .b4-price`);
                    if (priceEl) {
                        priceEl.classList.remove('b4-price-hidden');
                        priceEl.innerHTML = `<span class="b4-price-unknown">？？？</span>`;
                    }
                });
                this._revealCoinsOnly(left, right);
            }

            // 語音引導（afterClose pattern）
            let speechText;
            if (curr.isUnit) {
                const unitSuffix = diff === 'easy'
                    ? `，哪家每${curr.unit}比較划算？`
                    : `，哪家每${curr.unit}比較划算？請輸入較划算的每${curr.unit}價格。`;
                speechText = `${left.store}${left.qty}${curr.unit}${toTWD(left.price)}，${right.store}${right.qty}${curr.unit}${toTWD(right.price)}${unitSuffix}`;
            } else {
                const s1 = left.store, p1 = left.price;
                const s2 = right.store, p2 = right.price;
                const intro = p1 === p2
                    ? `${s1}跟${s2}都是${p1}元`
                    : `${s1}${toTWD(p1)}，${s2}${toTWD(p2)}`;
                const speechMap = {
                    easy:   `${intro}，請問哪一個商店賣的比較便宜？`,
                    normal: `${intro}，請問哪一個商店賣的比較便宜？`,
                    hard:   `${intro}，請問哪一個商店賣的比較便宜？`,
                };
                speechText = speechMap[diff] || `哪個地方比較便宜？`;
            }
            this.state.quiz.lastSpeechText = `${curr.name}，${speechText}`;
            this._showItemIntroModal(curr, () => {
                if (diff === 'hard') {
                    // 困難：播完題目語音後才顯示輸入框
                    Game.Speech.speak(speechText, () => {
                        this._showPriceInputSection(curr, left, right, correctSide);
                    });
                } else {
                    Game.Speech.speak(speechText);
                    // 輔助點擊（easy/normal 依賴金幣點擊，不啟動 AssistClick）
                }
            });

        },

        // ── 困難記憶倒數（Round 38）─────────────────────────────
        _startMemoryCountdown() {
            const existing = document.getElementById('b4-memory-bar');
            if (existing) existing.remove();
            let sec = 3;
            const bar = document.createElement('div');
            bar.id = 'b4-memory-bar';
            bar.className = 'b4-memory-bar';
            bar.innerHTML = `<span>⏱</span><span>記住價格！還有 <strong id="b4-mem-sec">3</strong> 秒</span><div class="b4-mem-track"><div class="b4-mem-fill" id="b4-mem-fill" style="width:100%"></div></div>`;
            const app = document.getElementById('app');
            if (app) app.insertAdjacentElement('afterbegin', bar);
            else return;

            const tick = () => {
                sec--;
                const secEl = document.getElementById('b4-mem-sec');
                const fill  = document.getElementById('b4-mem-fill');
                if (secEl) secEl.textContent = sec;
                if (fill)  fill.style.width = `${Math.round((sec / 3) * 100)}%`;
                if (sec <= 0) {
                    if (document.body.contains(bar)) bar.remove();
                    // 模糊所有價格
                    document.querySelectorAll('.b4-price').forEach(el => el.classList.add('b4-mem-blur'));
                    const hero = document.querySelector('.b4-item-hero');
                    if (hero) {
                        const hint = document.createElement('div');
                        hint.className = 'b4-mem-challenge';
                        hint.textContent = '🤔 靠記憶回答！';
                        hero.appendChild(hint);
                        Game.TimerManager.setTimeout(() => { if (document.body.contains(hint)) hint.remove(); }, 2200, 'ui');
                    }
                    // 語音重聽按鈕（Round 45）
                    const curr45 = this.state.quiz.currentQuestion < this.state.quiz.questions.length
                        ? this.state.quiz.questions[this.state.quiz.currentQuestion] : null;
                    if (curr45) {
                        const replayBtn = document.createElement('button');
                        replayBtn.id = 'b4-mem-replay';
                        replayBtn.className = 'b4-mem-replay-btn';
                        replayBtn.textContent = '🔊 重聽價格';
                        const buildSpeech = c => {
                            if (c.isTriple) return c.stores.map(s => `${s.store}${s.price}元`).join('，');
                            return `${c.optA.store}${c.optA.price}元，${c.optB.store}${c.optB.price}元`;
                        };
                        Game.EventManager.on(replayBtn, 'click', () => {
                            Game.Speech.speak(buildSpeech(curr45));
                            replayBtn.disabled = true;
                            Game.TimerManager.setTimeout(() => { replayBtn.disabled = false; }, 2000, 'ui');
                        }, {}, 'gameUI');
                        const app = document.getElementById('app');
                        if (app) app.insertAdjacentElement('afterbegin', replayBtn);
                    }
                } else {
                    Game.TimerManager.setTimeout(tick, 1000, 'ui');
                }
            };
            Game.TimerManager.setTimeout(tick, 1000, 'ui');
        },

        _showItemIntroModal(curr, afterClose) {
            const existing = document.getElementById('b4-item-intro-modal');
            if (existing) existing.remove();

            const modal = document.createElement('div');
            modal.id = 'b4-item-intro-modal';
            modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:10200;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.45);cursor:pointer;';
            modal.innerHTML = `
                <div class="b4-intro-card">
                    <div class="b4-intro-icon">${curr.icon}</div>
                    <div class="b4-intro-name">${curr.name}</div>
                </div>`;
            document.body.appendChild(modal);

            // afterClose pattern（B1/B2/B5/B6 pattern）
            let closed = false;
            const closeModal = () => {
                if (closed) return;
                closed = true;
                if (modal.parentNode) modal.remove();
                afterClose?.();
            };
            // 朗讀商品名稱，語音結束後自動關閉（closed guard 防重複）
            Game.TimerManager.setTimeout(() => {
                Game.Speech.speak(curr.name, closeModal);
            }, 300, 'ui');
            const t = Game.TimerManager.setTimeout(closeModal, 2200, 'ui'); // fallback
            modal.addEventListener('click', () => { Game.TimerManager.clearTimeout(t); closeModal(); });
        },

        _renderHeader() {
            const q = this.state.quiz;
            const diffLabel = { easy: '簡單模式', normal: '普通模式', hard: '困難模式' }[this.state.settings.difficulty] || '';
            const catLabels = { all:'全部', food:'食品飲料', stationery:'文具書籍', daily:'生活用品', clothing:'服飾配件' };
            const catLabel  = catLabels[this.state.settings.itemCat || 'all'];
            const stepLabel = { select:'第 1 步：找出較便宜的價格', tripleRank:'第 1 步：找出較便宜的價格', diff:'第 2 步：算出差額' }[this.state.phase] || '';
            const centerTxt = stepLabel || (catLabel !== '全部' ? `${diffLabel}・${catLabel}` : diffLabel);
            return `
            <div class="b-header">
                <div class="b-header-left">
                    <span class="b-header-unit">🏷️ 特賣比一比</span>
                </div>
                <div class="b-header-center">${centerTxt}</div>
                <div class="b-header-right">
                    <span class="b-progress">第 ${q.currentQuestion + 1} 題 / 共 ${q.totalQuestions} 題</span>
                    ${q.totalSaved > 0 ? `<span class="b4-savings-tally">💰 已省 ${q.totalSaved} 元</span>` : ''}
                    <button class="b-reward-btn" id="reward-btn-g">🎁 獎勵</button>
                    <button class="b-back-btn" id="back-to-settings">返回設定</button>
                </div>
            </div>`;
        },

        _renderOptionCard(side, opt, cheaperPer, correctSide, unitCurr = null) {
            if (unitCurr) {
                // 單位比價模式：顯示數量/總價 + 每單位價格
                const per = opt.price / opt.qty;
                return `
                <div class="b4-option-card b4-unit-card" id="card-${side}" data-side="${side}">
                    <div class="b4-store-label">商店</div>
                    <div class="b4-store-icon">${opt.storeIcon}</div>
                    <div class="b4-store-name">${opt.store}</div>
                    <div class="b4-unit-qty">${opt.qty}${unitCurr.unit} / ${opt.price}元</div>
                    <div class="b4-unit-per">每${unitCurr.unit} <span class="b4-unit-per-val">${per}</span>元</div>
                </div>`;
            }
            return `
            <div class="b4-option-card" id="card-${side}" data-side="${side}" data-price="${opt.price}">
                <div class="b4-store-label">商店</div>
                <div class="b4-store-icon">${opt.storeIcon}</div>
                <div class="b4-store-name">${opt.store}</div>
                <div class="b4-price b4-price-hidden">? <span class="b4-price-unit">元</span></div>
                <div class="b4-price-coins b4-price-coins-hidden"></div>
            </div>`;
        },

        // ── 簡單模式：逐枚點擊金幣後自動比較 ─────────────────────
        _getCoinsArray(price) {
            let rem = price;
            const arr = [];
            for (const d of B4_DENOMS) {
                const n = Math.floor(rem / d);
                for (let i = 0; i < n; i++) arr.push(d);
                rem -= d * n;
            }
            return arr;
        },

        _setupEasyModeCoins(curr, left, right, correctSide) {
            const state = this.state;
            const coinsData = {
                left:  { opt: left,  coins: this._getCoinsArray(left.price),  clickedCount: 0, done: false },
                right: { opt: right, coins: this._getCoinsArray(right.price), clickedCount: 0, done: false }
            };

            ['left', 'right'].forEach(side => {
                const card = document.getElementById(`card-${side}`);
                const coinsEl = card?.querySelector('.b4-price-coins');
                const priceEl = card?.querySelector('.b4-price');
                if (!coinsEl) return;

                const data = coinsData[side];
                let runningTotal = 0;

                // Show coins as clickable, price starts at 0
                coinsEl.classList.remove('b4-price-coins-hidden');
                coinsEl.innerHTML = data.coins.map((d, i) => {
                    const isBill = d >= 100;
                    const w  = isBill ? '100px' : '60px';
                    const h  = isBill ? '48.91px' : '60px';
                    const br = isBill ? '4px' : '50%';
                    return `<img src="../images/money/${d}_yuan_front.png"
                        data-cidx="${i}" data-cval="${d}" data-cside="${side}"
                        class="b4-easy-coin"
                        style="width:${w};height:${h};border-radius:${br};vertical-align:middle;object-fit:cover;cursor:pointer;transition:opacity 0.2s,outline 0.1s;"
                        draggable="false" onerror="this.style.display='none'">`;
                }).join('');

                // Show price as 0 元 (visible, not hidden)
                if (priceEl) {
                    priceEl.classList.remove('b4-price-hidden');
                    priceEl.innerHTML = `0 <span class="b4-price-unit">元</span>`;
                }

                // Attach per-coin click handlers
                coinsEl.querySelectorAll('.b4-easy-coin').forEach(img => {
                    Game.EventManager.on(img, 'click', () => {
                        if (img.dataset.clicked || data.done) return;
                        img.dataset.clicked = '1';
                        img.style.opacity = '0.5';
                        img.style.outline = '3px solid #10b981';

                        runningTotal += parseInt(img.dataset.cval);
                        data.clickedCount++;

                        if (priceEl) {
                            priceEl.innerHTML = `${runningTotal} <span class="b4-price-unit">元</span>`;
                        }

                        const isLast = data.clickedCount >= data.coins.length;
                        if (isLast) {
                            data.done = true;
                            if (card) card.style.outline = '3px solid #10b981';
                            // Wait for speech to complete before checking if both sides done
                            Game.Speech.speak(`${runningTotal}元`, () => {
                                const other = side === 'left' ? 'right' : 'left';
                                if (coinsData[other].done) {
                                    this._handleEasyBothSidesDone(curr, correctSide, left, right);
                                }
                            });
                        } else {
                            Game.Speech.speak(`${runningTotal}元`);
                        }
                    }, {}, 'gameUI');
                });
            });

            // Store reference so we can check completion
            this.state._easyCoinsDone = coinsData;
        },

        _handleEasyBothSidesDone(curr, correctSide, left, right) {
            if (this.state.isProcessing) return;
            this.state.isProcessing = true;
            this._clearSelectHintTimer();

            // Reveal actual prices
            this._revealCardPrices(left, right);

            const correctCard = document.getElementById(`card-${correctSide}`);
            const wrongSide   = correctSide === 'left' ? 'right' : 'left';
            const wrongCard   = document.getElementById(`card-${wrongSide}`);

            this.audio.play('correct');
            this._showCenterFeedback('✅', '比較看看！');

            if (correctCard) {
                correctCard.classList.add('selected-correct', 'b4-card-glow');
                correctCard.innerHTML += `<div class="b4-result-mark correct">✓</div>
                    <div class="b4-cheaper-tag">比較便宜！</div>`;
            }
            if (wrongCard) {
                const delta = Math.abs(left.price - right.price);
                if (delta > 0) {
                    wrongCard.classList.add('selected-wrong');
                    wrongCard.innerHTML += `<div class="b4-exp-delta">比較貴 +${delta}元</div>`;
                }
            }

            this.state.quiz.correctCount++;
            this.state.quiz.streak = (this.state.quiz.streak || 0) + 1;
            if (this.state.quiz.streak === 3 || this.state.quiz.streak === 5) {
                Game.TimerManager.setTimeout(() => this._showStreakBadge(this.state.quiz.streak), 200, 'ui');
            }

            const cheapSide = correctSide === 'left' ? left : right;
            this._showChampionBadge(cheapSide.store);
            this._showThinkingSteps(curr);

            const priceSpeech = `${cheapSide.store}，${cheapSide.price}元，比較便宜！`;
            Game.Speech.speak(priceSpeech, () => {
                this.state.isProcessing = false;
                this.state.phase = 'diff';
                this.state.currentDiffItem = curr;
                this._renderDiffSection(curr, 'easy');
            });
        },

        // ── 普通模式：點幣後輸入較便宜價格 ──────────────────────────
        _setupNormalModeCoins(curr, left, right, correctSide) {
            const coinsData = {
                left:  { opt: left,  coins: this._getCoinsArray(left.price),  clickedCount: 0, done: false },
                right: { opt: right, coins: this._getCoinsArray(right.price), clickedCount: 0, done: false }
            };

            ['left', 'right'].forEach(side => {
                const card = document.getElementById(`card-${side}`);
                const coinsEl = card?.querySelector('.b4-price-coins');
                const priceEl = card?.querySelector('.b4-price');
                if (!coinsEl) return;

                const data = coinsData[side];
                let runningTotal = 0;

                coinsEl.classList.remove('b4-price-coins-hidden');
                coinsEl.innerHTML = data.coins.map((d, i) => {
                    const isBill = d >= 100;
                    const w  = isBill ? '100px' : '60px';
                    const h  = isBill ? '48.91px' : '60px';
                    const br = isBill ? '4px' : '50%';
                    return `<img src="../images/money/${d}_yuan_front.png"
                        data-cidx="${i}" data-cval="${d}" data-cside="${side}"
                        class="b4-easy-coin"
                        style="width:${w};height:${h};border-radius:${br};vertical-align:middle;object-fit:cover;cursor:pointer;transition:opacity 0.2s,outline 0.1s;"
                        draggable="false" onerror="this.style.display='none'">`;
                }).join('');

                if (priceEl) {
                    priceEl.classList.remove('b4-price-hidden');
                    priceEl.innerHTML = `0 <span class="b4-price-unit">元</span>`;
                }

                coinsEl.querySelectorAll('.b4-easy-coin').forEach(img => {
                    Game.EventManager.on(img, 'click', () => {
                        if (img.dataset.clicked || data.done) return;
                        img.dataset.clicked = '1';
                        img.style.opacity = '0.5';
                        img.style.outline = '3px solid #10b981';

                        runningTotal += parseInt(img.dataset.cval);
                        data.clickedCount++;
                        if (priceEl) priceEl.innerHTML = `${runningTotal} <span class="b4-price-unit">元</span>`;

                        const isLast = data.clickedCount >= data.coins.length;
                        if (isLast) {
                            data.done = true;
                            if (card) card.style.outline = '3px solid #10b981';
                            Game.Speech.speak(`${runningTotal}元`, () => {
                                const other = side === 'left' ? 'right' : 'left';
                                if (coinsData[other].done) {
                                    this._showPriceInputSection(curr, left, right, correctSide);
                                }
                            });
                        } else {
                            Game.Speech.speak(`${runningTotal}元`);
                        }
                    }, {}, 'gameUI');
                });
            });
        },

        _showPriceInputSection(curr, left, right, correctSide) {
            const diff      = this.state.settings.difficulty;
            const cheapOpt  = correctSide === 'left' ? left : right;
            const expOpt    = correctSide === 'left' ? right : left;
            const cheapPrice = cheapOpt.price;

            const section = document.getElementById('diff-section');
            if (!section) return;

            const isUnit = curr.isUnit;
            const label  = isUnit ? `請輸入較划算的每${curr.unit}價格` : '請輸入較便宜的商品價格';
            const unit   = isUnit ? `元/${curr.unit}` : '元';

            section.innerHTML = `
            <div class="b4-pi-card">
                <div class="b4-pi-label">${label}</div>
                <div class="b4-input-display b4-pi-input-box" id="b4-pi-display" style="cursor:pointer;" title="點我輸入">
                    <span id="b4-pi-val">？</span><span class="b4-unit-text"> ${unit}</span>
                </div>
                <div class="b4-pi-tap-hint">👆 點擊輸入</div>
            </div>`;

            let piValue = '';
            const updateDisplay = () => {
                const el = document.getElementById('b4-pi-val');
                if (el) el.textContent = piValue || '？';
            };

            Game.Speech.speak(label);

            const openNumpad = () => {
                const prev = document.getElementById('b4-pi-modal');
                if (prev) prev.remove();

                const overlay = document.createElement('div');
                overlay.id = 'b4-pi-modal';
                overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:10200;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.45);';
                overlay.innerHTML = `
                <div class="b4-pi-modal-card">
                    <button class="b4-modal-close-x" id="b4-pi-m-x">✕</button>
                    <div class="b4-pi-modal-title">${label}</div>
                    <div class="b4-input-display" id="b4-pi-m-display">
                        <span id="b4-pi-m-val">${piValue || '0'}</span><span class="b4-unit-text"> ${unit}</span>
                    </div>
                    <div class="b4-numpad">
                        ${[7,8,9,4,5,6,1,2,3].map(n => `<button class="b4-numpad-btn" data-pinum="${n}">${n}</button>`).join('')}
                        <button class="b4-numpad-btn btn-del" id="b4-pi-m-del">⌫</button>
                        <button class="b4-numpad-btn" data-pinum="0">0</button>
                        <button class="b4-numpad-btn btn-ok" id="b4-pi-m-ok">✓</button>
                    </div>
                </div>`;
                document.body.appendChild(overlay);

                const updateM = () => {
                    const el = document.getElementById('b4-pi-m-val');
                    if (el) el.textContent = piValue || '0';
                };

                overlay.querySelectorAll('[data-pinum]').forEach(btn => {
                    btn.addEventListener('click', e => { e.stopPropagation(); if (piValue.length >= 5) return; piValue += btn.dataset.pinum; updateM(); updateDisplay(); });
                });
                document.getElementById('b4-pi-m-del').addEventListener('click', e => { e.stopPropagation(); piValue = piValue.slice(0, -1); updateM(); updateDisplay(); });
                document.getElementById('b4-pi-m-x').addEventListener('click', e => { e.stopPropagation(); overlay.remove(); });
                document.getElementById('b4-pi-m-ok').addEventListener('click', e => {
                    e.stopPropagation();
                    if (this.state.isProcessing) return;
                    const entered = parseInt(piValue) || 0;
                    if (entered === 0) return;
                    this.state.isProcessing = true;
                    overlay.remove();

                    const display = document.getElementById('b4-pi-display');
                    if (display) display.querySelector('#b4-pi-val').textContent = entered;
                    const isCorrect = (entered === cheapPrice);
                    if (isCorrect) {
                        this.audio.play('correct');
                        this._showCenterFeedback('✅', '答對了！');
                        this.state.quiz.correctCount++;
                        this.state.quiz.streak = (this.state.quiz.streak || 0) + 1;

                        this._revealCardPrices(left, right);
                        const correctCard = document.getElementById(`card-${correctSide}`);
                        if (correctCard) {
                            correctCard.classList.add('selected-correct', 'b4-card-glow');
                            correctCard.innerHTML += `<div class="b4-result-mark correct">✓</div><div class="b4-cheaper-tag">比較便宜！</div>`;
                        }
                        const wrongSide = correctSide === 'left' ? 'right' : 'left';
                        const wrongCard = document.getElementById(`card-${wrongSide}`);
                        if (wrongCard) {
                            const delta = Math.abs(left.price - right.price);
                            if (delta > 0) {
                                wrongCard.classList.add('selected-wrong');
                                wrongCard.innerHTML += `<div class="b4-exp-delta">比較貴 +${delta}元</div>`;
                            }
                        }

                        const speech = isUnit
                            ? `答對了！${cheapOpt.store}每${curr.unit}${cheapPrice}元，比較划算`
                            : `答對了！${cheapOpt.store}${cheapPrice}元，比較便宜`;
                        Game.Speech.speak(speech, () => {
                            this.state.isProcessing = false;
                            this.state.phase = 'diff';
                            this.state.currentDiffItem = curr;
                            this._renderDiffSection(curr, diff);
                        });
                    } else {
                        this.audio.play('error');
                        const isExpPrice = (entered === expOpt.price);
                        const errSpeech = isExpPrice
                            ? `不對喔，${expOpt.store}是${expOpt.price}元，請輸入比較便宜的那家`
                            : `不對喔，請再想想哪家比較便宜`;
                        Game.Speech.speak(errSpeech, () => {
                            Game.TimerManager.setTimeout(() => {
                                this.state.isProcessing = false;
                                piValue = '';
                                updateDisplay();
                            }, 400, 'ui');
                        });
                    }
                });  // end ok click
            };  // end openNumpad

            Game.EventManager.on(document.getElementById('b4-pi-display'), 'click', openNumpad, {}, 'gameUI');
        },

        // ── 揭露卡片價格 helpers ────────────────────────────────
        _revealCardPrices(left, right) {
            ['left', 'right'].forEach(s => {
                const card = document.getElementById(`card-${s}`);
                if (!card) return;
                const opt = s === 'left' ? left : right;
                const priceEl = card.querySelector('.b4-price');
                if (priceEl) {
                    priceEl.classList.remove('b4-price-hidden');
                    priceEl.innerHTML = `${opt.price} <span class="b4-price-unit">元</span>`;
                }
                const coinsEl = card.querySelector('.b4-price-coins');
                if (coinsEl) {
                    coinsEl.classList.remove('b4-price-coins-hidden');
                    coinsEl.innerHTML = b4PriceCoins(opt.price);
                }
            });
        },

        _revealTripleCardPrices(curr) {
            curr.stores.forEach((store, i) => {
                const card = document.getElementById(`tcard-${i}`);
                if (!card) return;
                const priceEl = card.querySelector('.b4-price');
                if (priceEl) {
                    priceEl.classList.remove('b4-price-hidden');
                    priceEl.innerHTML = `${store.price} <span class="b4-price-unit">元</span>`;
                }
                const coinsEl = card.querySelector('.b4-price-coins');
                if (coinsEl) {
                    coinsEl.classList.remove('b4-price-coins-hidden');
                    coinsEl.innerHTML = b4PriceCoins(store.price);
                }
            });
        },

        // ── 僅揭露金錢圖示，價格文字保留「? 元」────────────────────
        _revealCoinsOnly(left, right) {
            ['left', 'right'].forEach(s => {
                const card = document.getElementById(`card-${s}`);
                if (!card) return;
                const opt = s === 'left' ? left : right;
                const coinsEl = card.querySelector('.b4-price-coins');
                if (coinsEl) {
                    coinsEl.classList.remove('b4-price-coins-hidden');
                    coinsEl.innerHTML = b4PriceCoins(opt.price);
                }
            });
        },

        _revealTripleCoinsOnly(curr) {
            curr.stores.forEach((store, i) => {
                const card = document.getElementById(`tcard-${i}`);
                if (!card) return;
                const coinsEl = card.querySelector('.b4-price-coins');
                if (coinsEl) {
                    coinsEl.classList.remove('b4-price-coins-hidden');
                    coinsEl.innerHTML = b4PriceCoins(store.price);
                }
            });
        },

        _bindSelectEvents(curr, correctSide, left, right) {
            const diff = this.state.settings.difficulty;
            // 選項卡點擊（簡單/普通模式改為逐枚點幣，不可直接點卡片選擇）
            if (diff !== 'easy' && diff !== 'normal') {
                ['left', 'right'].forEach(side => {
                    const card = document.getElementById(`card-${side}`);
                    Game.EventManager.on(card, 'click', () => {
                        if (this.state.isProcessing) return;
                        this.state.isProcessing = true;
                        const isCorrect = (side === correctSide);
                        this.handleSelectClick(isCorrect, curr, correctSide, left, right);
                    }, {}, 'gameUI');
                });
            }

            // hero 提示鈕
            const heroHintBtn = document.getElementById('b4-hero-hint-btn');
            if (heroHintBtn) {
                Game.EventManager.on(heroHintBtn, 'click', () => {
                    if (this.state.phase === 'select') {
                        // 揭露兩張卡片的價格+金幣，再高亮正確卡
                        this._revealCardPrices(left, right);
                        if (diff === 'hard') this._revealCoinsOnly(left, right);
                        const hintCard = document.getElementById(`card-${correctSide}`);
                        if (hintCard) {
                            hintCard.classList.add('b4-select-hint');
                            Game.TimerManager.setTimeout(() => hintCard.classList.remove('b4-select-hint'), 2400, 'ui');
                        }
                        const cheapName = correctSide === 'left' ? left.store : right.store;
                        Game.Speech.speak(`提示：${cheapName}比較便宜`);
                    } else {
                        // diff 階段：顯示算式 + 語音
                        this._showDiffFormulaHint();
                        const item = this.state.currentDiffItem || curr;
                        const hintSpeech = item.isUnit
                            ? `每${item.unit}，${item.optA.store}${item.perA}元，${item.optB.store}${item.perB}元，兩者差多少元？`
                            : `${item.optA.store}${item.optA.price}元，${item.optB.store}${item.optB.price}元，兩者差多少元？`;
                        Game.Speech.speak(hintSpeech);
                    }
                }, {}, 'gameUI');
            }

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
            // 自訂價格套用
            const applyBtn = document.getElementById('b4-cpp-apply-btn');
            if (applyBtn) {
                Game.EventManager.on(applyBtn, 'click', () => {
                    const leftPrice  = parseInt(document.getElementById('b4-cpp-left')?.value);
                    const rightPrice = parseInt(document.getElementById('b4-cpp-right')?.value);
                    if (!leftPrice || !rightPrice || leftPrice < 1 || rightPrice < 1 || leftPrice === rightPrice) return;
                    this._applyCustomPrices(curr, leftPrice, rightPrice);
                    this.renderQuestion();
                }, {}, 'gameUI');
            }
        },

        _applyCustomPrices(curr, leftPrice, rightPrice) {
            // left = curr.swapped ? curr.optB : curr.optA
            // right = curr.swapped ? curr.optA : curr.optB
            if (curr.swapped) {
                // left=optB, right=optA
                if (leftPrice <= rightPrice) {
                    curr.optB.price = leftPrice;
                    curr.optA.price = rightPrice;
                } else {
                    // optB (left) becomes more expensive → flip
                    curr.optB.price = rightPrice;
                    curr.optA.price = leftPrice;
                    curr.swapped = false;
                }
            } else {
                // left=optA, right=optB
                if (leftPrice >= rightPrice) {
                    curr.optA.price = leftPrice;
                    curr.optB.price = rightPrice;
                } else {
                    // optA (left) becomes cheaper → flip
                    curr.optA.price = rightPrice;
                    curr.optB.price = leftPrice;
                    curr.swapped = true;
                }
            }
            curr.diff = curr.optA.price - curr.optB.price;
        },

        // ── Select Phase Handler ────────────────────────────────
        handleSelectClick(isCorrect, curr, correctSide, left, right) {
            this._clearSelectHintTimer();
            const diff = this.state.settings.difficulty;
            // 點擊時揭露兩張卡片的價格
            this._revealCardPrices(left, right);

            // 視覺回饋
            const correctCard = document.getElementById(`card-${correctSide}`);
            const wrongSide   = correctSide === 'left' ? 'right' : 'left';
            const wrongCard   = document.getElementById(`card-${wrongSide}`);

            if (isCorrect) {
                this.audio.play('correct');
                this._showCenterFeedback('✅', '答對了！');
                if (correctCard) {
                    correctCard.classList.add('selected-correct', 'b4-card-glow'); // 卡片光暈（Round 33）
                    const cheapTag = curr.isUnit ? '比較划算！' : '比較便宜！';
                    correctCard.innerHTML += `<div class="b4-result-mark correct">✓</div>
                        <div class="b4-cheaper-tag">${cheapTag}</div>`;
                }
                // 貴的那張顯示「比較貴 +N元」（Round 27）
                if (wrongCard && !curr.isUnit) {
                    const delta = Math.abs((left.price || 0) - (right.price || 0));
                    if (delta > 0) {
                        wrongCard.classList.add('selected-wrong');
                        wrongCard.innerHTML += `<div class="b4-exp-delta">比較貴 +${delta}元</div>`;
                    }
                }
                if (diff === 'easy') {
                    // 簡單：直接下一題
                    this.state.quiz.correctCount++;
                    this.state.quiz.streak = (this.state.quiz.streak || 0) + 1;
                    if (this.state.quiz.streak === 3 || this.state.quiz.streak === 5) {
                        Game.TimerManager.setTimeout(() => this._showStreakBadge(this.state.quiz.streak), 200, 'ui');
                    }
                    const cheapSide = correctSide === 'left' ? left : right;
                    const expSide   = correctSide === 'left' ? right : left;
                    let easyCorrectSpeech;
                    if (curr.isUnit) {
                        easyCorrectSpeech = `答對了！${cheapSide.store}每${curr.unit}${curr.perB}元，比${expSide.store}每${curr.unit}${curr.perA}元便宜！`;
                    } else {
                        easyCorrectSpeech = `答對了！${cheapSide.store}${cheapSide.price}元，比${expSide.store}${expSide.price}元便宜！`;
                    }
                    // 即時數字語音（Round 37：F4 instant feedback pattern）
                    const priceSpeech = curr.isUnit
                        ? `${cheapSide.store}每${curr.unit}${cheapSide.price === (curr.optA.store === cheapSide.store ? curr.perA : curr.perB)}元，比較划算！`
                        : `${cheapSide.store}，${cheapSide.price}元，比較便宜！`;
                    this._showChampionBadge(cheapSide.store); // 冠軍徽章（Round 31）
                    this._showThinkingSteps(curr); // 比價思路步驟卡（Round 44）
                    Game.Speech.speak(priceSpeech, () => {
                        this.state.isProcessing = false;
                        this.state.phase = 'diff';
                        this.state.currentDiffItem = curr;
                        this._renderDiffSection(curr, 'easy');
                    });
                } else {
                    // 普通/困難：語音播完後進入差額頁
                    const cheapSideNH = correctSide === 'left' ? left : right;
                    const nhSpeech = curr.isUnit
                        ? `答對了！${cheapSideNH.store}每${curr.unit}比較划算`
                        : `答對了！${cheapSideNH.store}比較便宜`;
                    Game.Speech.speak(nhSpeech, () => {
                        this.state.isProcessing = false;
                        this.state.phase = 'diff';
                        this.state.currentDiffItem = curr;
                        this._renderDiffSection(curr, diff);
                    });
                }
            } else {
                this.state.quiz.streak = 0;
                this.audio.play('error');
                if (wrongCard)   wrongCard.classList.add('selected-wrong');
                if (correctCard) {
                    correctCard.classList.add('reveal-correct');
                    const revealTag = curr.isUnit ? '這個才划算' : '這個才便宜';
                    correctCard.innerHTML += `<div class="b4-cheaper-tag">${revealTag}</div>`;
                }
                if (this.state.settings.retryMode === 'proceed') {
                    this._showCenterFeedback('❌', '答錯了！');
                    const cStoreName = correctCard?.querySelector('.b4-store-name')?.textContent || '另一個';
                    const wrongProceedSpeech = curr.isUnit
                        ? `答錯了，${cStoreName}才是比較划算的`
                        : `答錯了，${cStoreName}才是比較便宜的`;
                    Game.Speech.speak(wrongProceedSpeech);
                    Game.TimerManager.setTimeout(() => this.nextQuestion(), 1800, 'turnTransition');
                } else {
                    this.state.quiz.selectErrorCount++;
                    // 普通模式第 3 次錯誤：揭露金額數字
                    if (diff === 'normal' && this.state.quiz.selectErrorCount >= 3) {
                        this._revealCardPrices(left, right);
                    }
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

        // ── 三商店比一比（F4 排序 pattern）────────────────────────
        _renderTripleQuestion(curr, diff, app) {
            const isHard = (diff === 'hard');
            const questionLabel = isHard
                ? '請由便宜到貴，依序點選三家商店'
                : '哪家商店最便宜？';

            const cardsHTML = curr.stores.map((store, idx) => {
                const priceDisplay = `<div class="b4-price b4-price-hidden" data-price="${store.price}">? <span class="b4-price-unit">元</span></div>
                       <div class="b4-price-coins b4-price-coins-hidden"></div>`;
                return `
                <div class="b4-option-card b4-triple-card" id="tcard-${idx}" data-idx="${idx}">
                    <div class="b4-store-label">商店</div>
                    <div class="b4-store-icon">${store.storeIcon}</div>
                    <div class="b4-store-name">${store.store}</div>
                    ${priceDisplay}
                    <div class="b4-rank-badge" id="badge-${idx}" style="display:none"></div>
                </div>`;
            }).join('');

            app.innerHTML = `
            ${this._renderHeader()}
            <div class="b-game-wrap">
                <div class="b4-item-hero" style="position:relative;">
                    <span class="b4-item-icon">${curr.icon}</span>
                    <div class="b4-item-name">${curr.name}</div>
                    <div class="b4-question-label">
                        ${questionLabel}
                        <button class="b-inline-replay" id="replay-speech-btn" title="重播語音">🔊</button>
                    </div>
                    ${isHard ? '<div class="b4-rank-hint">點選順序：1️⃣最便宜 → 2️⃣中間 → 3️⃣最貴</div>' : ''}
                    ${diff !== 'easy' ? `<div class="b4-hero-hint-wrap" id="b4-hero-hint-wrap">
                        <img src="../images/index/educated_money_bag_character.png" alt="" class="b4-hint-mascot" onerror="this.style.display='none'">
                        <button class="b4-hero-hint-btn" id="b4-hero-hint-btn">💡 提示</button>
                    </div>` : ''}
                </div>
                <div class="b4-triple-grid" id="triple-grid">
                    ${cardsHTML}
                </div>
                <div id="diff-section"></div>
            </div>`;

            this._bindTripleEvents(curr, diff);

            // 依難度揭露卡片：easy 顯示金幣＋金額；normal/hard 只顯示金幣（讓學生從圖示判斷金額）
            if (diff === 'easy') {
                this._revealTripleCardPrices(curr);
            } else {
                this._revealTripleCoinsOnly(curr);
            }

            // 語音引導（afterClose pattern）
            const prices = curr.stores.map(s => `${s.store}${toTWD(s.price)}`).join('，');
            const tripleTextMap = {
                easy:   `${prices}，哪家最便宜？`,
                normal: `${prices}，找出最便宜的，再回答省了多少元。`,
                hard:   `${prices}，請由便宜到貴依序點選。`,
            };
            const tripleText = tripleTextMap[diff] || `哪家最便宜？`;
            this.state.quiz.lastSpeechText = `${curr.name}，${tripleText}`;
            this._showItemIntroModal(curr, () => {
                Game.Speech.speak(tripleText);
                if (this.state.settings.clickMode === 'on') {
                    Game.TimerManager.setTimeout(() => AssistClick.activate(curr, null), 400, 'ui');
                }
            });
        },

        _bindTripleEvents(curr, diff) {
            const isHard = (diff === 'hard');

            // hero 提示鈕（三商店）
            const heroHintBtn = document.getElementById('b4-hero-hint-btn');
            if (heroHintBtn) {
                Game.EventManager.on(heroHintBtn, 'click', () => {
                    if (this.state.phase === 'select') {
                        this._revealTripleCardPrices(curr);
                        const hintCard = document.getElementById(`tcard-${curr.cheapestIdx}`);
                        if (hintCard) {
                            hintCard.classList.add('b4-select-hint');
                            Game.TimerManager.setTimeout(() => hintCard.classList.remove('b4-select-hint'), 2400, 'ui');
                        }
                        Game.Speech.speak(`提示：${curr.stores[curr.cheapestIdx].store}最便宜`);
                    } else {
                        this._showDiffFormulaHint();
                        const item = this.state.currentDiffItem;
                        if (item) Game.Speech.speak(`${item.optA.store}${item.optA.price}元，${item.optB.store}${item.optB.price}元，兩者差多少元？`);
                    }
                }, {}, 'gameUI');
            }

            curr.stores.forEach((_, idx) => {
                const card = document.getElementById(`tcard-${idx}`);
                Game.EventManager.on(card, 'click', () => {
                    if (this.state.isProcessing) return;
                    if (isHard) {
                        this._handleTripleRankClick(idx, curr, diff);
                    } else {
                        this.state.isProcessing = true;
                        const isCorrect = (idx === curr.cheapestIdx);
                        this._handleTripleSelectClick(isCorrect, idx, curr, diff);
                    }
                }, {}, 'gameUI');
            });

            // 三商店困難模式：10秒無動作後高亮最便宜商品（B1 _showMinCoinsHint pattern）
            if (isHard) {
                Game.TimerManager.setTimeout(() => {
                    if (this.state.tripleClickOrder.length === 0 && !this.state.isProcessing) {
                        const hintCard = document.getElementById(`tcard-${curr.cheapestIdx}`);
                        if (hintCard) {
                            hintCard.classList.add('b4-triple-auto-hint');
                            Game.Speech.speak('提示：先找最便宜的');
                            Game.TimerManager.setTimeout(() => hintCard.classList.remove('b4-triple-auto-hint'), 2500, 'ui');
                        }
                    }
                }, 10000, 'ui');
            }

            // 導覽
            const backBtn = document.getElementById('back-to-settings');
            if (backBtn) Game.EventManager.on(backBtn, 'click', () => this.showSettings(), {}, 'gameUI');
            const rewardBtn = document.getElementById('reward-btn-g');
            if (rewardBtn) Game.EventManager.on(rewardBtn, 'click', () => {
                if (typeof RewardLauncher !== 'undefined') RewardLauncher.open();
                else window.open('../reward/index.html', 'RewardSystem', 'width=1200,height=800');
            }, {}, 'gameUI');
            const replayBtn = document.getElementById('replay-speech-btn');
            if (replayBtn) Game.EventManager.on(replayBtn, 'click', () => {
                const text = this.state.quiz.lastSpeechText;
                if (text) Game.Speech.speak(text);
            }, {}, 'gameUI');
        },

        // easy/normal 模式：點選最便宜的那家
        _handleTripleSelectClick(isCorrect, clickedIdx, curr, diff) {
            this._revealTripleCardPrices(curr);
            const correctCard = document.getElementById(`tcard-${curr.cheapestIdx}`);
            const clickedCard = document.getElementById(`tcard-${clickedIdx}`);

            if (isCorrect) {
                this.audio.play('correct');
                this._showCenterFeedback('✅', '答對了！');
                if (correctCard) {
                    correctCard.classList.add('selected-correct');
                    correctCard.innerHTML += `<div class="b4-result-mark correct">✓</div>
                        <div class="b4-cheaper-tag">最便宜！</div>`;
                }
                if (diff === 'easy') {
                    this.state.quiz.correctCount++;
                    Game.Speech.speak(`答對了！${curr.stores[curr.cheapestIdx].store}最便宜`, () => {
                        Game.TimerManager.setTimeout(() => {
                            this.state.isProcessing = false;
                            this.state.phase = 'diff';
                            this.state.currentDiffItem = { ...curr, optA: curr.sortedAsc[2], optB: curr.sortedAsc[0] };
                            this._renderTripleDiffSection(curr, 'easy');
                        }, 400, 'turnTransition');
                    });
                } else {
                    // normal：再問差額（最貴 - 最便宜）
                    Game.TimerManager.setTimeout(() => {
                        this.state.isProcessing = false;
                        this.state.phase = 'diff';
                        this.state.currentDiffItem = {
                            ...curr,
                            optA: curr.sortedAsc[2], // 最貴
                            optB: curr.sortedAsc[0], // 最便宜
                        };
                        this._renderTripleDiffSection(curr, diff);
                    }, 700, 'turnTransition');
                }
            } else {
                this.audio.play('error');
                if (clickedCard) clickedCard.classList.add('selected-wrong');
                if (correctCard) {
                    correctCard.classList.add('reveal-correct');
                    correctCard.innerHTML += `<div class="b4-cheaper-tag">這家才最便宜</div>`;
                }
                if (this.state.settings.retryMode === 'proceed') {
                    this._showCenterFeedback('❌', '答錯了！');
                    Game.Speech.speak(`答錯了，${curr.stores[curr.cheapestIdx].store}才是最便宜的`);
                    Game.TimerManager.setTimeout(() => this.nextQuestion(), 1800, 'turnTransition');
                } else {
                    this.state.quiz.selectErrorCount++;
                    // 普通模式第 3 次錯誤：揭露金額數字
                    if (diff === 'normal' && this.state.quiz.selectErrorCount >= 3) {
                        this._revealTripleCardPrices(curr);
                    }
                    this._showCenterFeedback('❌', '再試一次！');
                    Game.Speech.speak('不對喔，請再比較看看');
                    Game.TimerManager.setTimeout(() => {
                        this.state.isProcessing = false;
                        curr.stores.forEach((_, i) => {
                            const c = document.getElementById(`tcard-${i}`);
                            if (c) c.classList.remove('selected-wrong', 'reveal-correct', 'selected-correct');
                            c?.querySelectorAll('.b4-result-mark,.b4-cheaper-tag')?.forEach(m => m.remove());
                        });
                    }, 1500, 'turnTransition');
                }
            }
        },

        // hard 模式：依序點選（便宜→中間→最貴，F4 排序 pattern）
        _handleTripleRankClick(clickedIdx, curr, diff) {
            const order = this.state.tripleClickOrder;
            if (order.includes(clickedIdx)) return; // 已點過

            order.push(clickedIdx);
            const rankNum = order.length;
            const badge = document.getElementById(`badge-${clickedIdx}`);
            if (badge) {
                badge.textContent = rankNum === 1 ? '1️⃣' : rankNum === 2 ? '2️⃣' : '3️⃣';
                badge.style.display = 'flex';
            }
            const card = document.getElementById(`tcard-${clickedIdx}`);
            if (card) card.classList.add('b4-triple-clicked');

            Game.Speech.speak(`第${rankNum}個`);

            if (order.length === 3) {
                // 驗證：order[0]=cheapest, order[1]=middle, order[2]=mostExp
                this.state.isProcessing = true;
                this._revealTripleCardPrices(curr);
                const isCorrect = (order[0] === curr.cheapestIdx && order[1] === curr.middleIdx && order[2] === curr.mostExpIdx);

                Game.TimerManager.setTimeout(() => {
                    if (isCorrect) {
                        this.audio.play('correct');
                        this._showCenterFeedback('✅', '排序正確！');
                        // 顯示正確價格（原本隱藏）
                        curr.stores.forEach((store, i) => {
                            const priceEl = document.querySelector(`#tcard-${i} .b4-price-hidden`);
                            if (priceEl) {
                                priceEl.classList.remove('b4-price-hidden');
                                priceEl.innerHTML = `${store.price} <span class="b4-price-unit">元</span>`;
                            }
                            const coinsEl = document.querySelector(`#tcard-${i} .b4-price-coins-hidden`);
                            if (coinsEl) { coinsEl.classList.remove('b4-price-coins-hidden'); coinsEl.innerHTML = b4PriceCoins(store.price); }
                            document.getElementById(`tcard-${i}`)?.classList.add('selected-correct');
                        });
                        this.state.quiz.correctCount++;
                        this.state.quiz.totalSaved += curr.diff;
                        this.state.quiz.comparisonHistory.push({
                            name: curr.name, icon: curr.icon, isTriple: true,
                            cheapStore: curr.sortedAsc[0].store, cheapPrice: curr.sortedAsc[0].price,
                            expStore: curr.sortedAsc[2].store,   expPrice:  curr.sortedAsc[2].price,
                            saved: curr.diff
                        });
                        this._showSavingsToast(curr.diff);
                        this._showPodiumAnimation(curr);
                        Game.Speech.speak(`排序正確！從${curr.sortedAsc[0].store}${toTWD(curr.sortedAsc[0].price)}到${curr.sortedAsc[2].store}${toTWD(curr.sortedAsc[2].price)}`, () => {
                            Game.TimerManager.setTimeout(() => this.nextQuestion(), 400, 'turnTransition');
                        });
                    } else {
                        this.audio.play('error');
                        // 顯示正確排序
                        curr.stores.forEach((store, i) => {
                            const card = document.getElementById(`tcard-${i}`);
                            const priceEl = card?.querySelector('.b4-price-hidden');
                            if (priceEl) {
                                priceEl.classList.remove('b4-price-hidden');
                                priceEl.innerHTML = `${store.price} <span class="b4-price-unit">元</span>`;
                            }
                            const coinsEl = card?.querySelector('.b4-price-coins-hidden');
                            if (coinsEl) { coinsEl.classList.remove('b4-price-coins-hidden'); coinsEl.innerHTML = b4PriceCoins(store.price); }
                        });
                        const correctOrder = [curr.cheapestIdx, curr.middleIdx, curr.mostExpIdx];
                        correctOrder.forEach((ci, rank) => {
                            const c = document.getElementById(`tcard-${ci}`);
                            if (c) c.classList.add('reveal-correct');
                            const b = document.getElementById(`badge-${ci}`);
                            if (b) b.textContent = rank === 0 ? '1️⃣' : rank === 1 ? '2️⃣' : '3️⃣';
                        });
                        this._showCenterFeedback('❌', '答錯了！');
                        if (this.state.settings.retryMode === 'proceed') {
                            Game.Speech.speak(`正確順序是：${curr.sortedAsc.map(s => s.store).join('、')}`);
                            Game.TimerManager.setTimeout(() => this.nextQuestion(), 2200, 'turnTransition');
                        } else {
                            Game.Speech.speak('不對喔，請看看正確的排序，再試一次！');
                            Game.TimerManager.setTimeout(() => {
                                this.state.isProcessing = false;
                                this.state.tripleClickOrder = [];
                                curr.stores.forEach((store, i) => {
                                    const c = document.getElementById(`tcard-${i}`);
                                    if (c) c.classList.remove('selected-wrong','reveal-correct','selected-correct','b4-triple-clicked');
                                    const priceEl = c?.querySelector('.b4-price');
                                    if (priceEl) {
                                        priceEl.classList.add('b4-price-hidden');
                                        priceEl.innerHTML = `? <span class="b4-price-unit">元</span>`;
                                    }
                                    const coinsEl = c?.querySelector('.b4-price-coins');
                                    if (coinsEl && diff !== 'hard') { coinsEl.classList.add('b4-price-coins-hidden'); coinsEl.innerHTML = ''; }
                                    const b = document.getElementById(`badge-${i}`);
                                    if (b) { b.textContent = ''; b.style.display = 'none'; }
                                });
                            }, 2200, 'turnTransition');
                        }
                    }
                }, 400, 'turnTransition');
            }
        },

        // normal 模式三商店差額（最貴 - 最便宜）
        _renderTripleDiffSection(curr, diff) {
            Game.EventManager.removeByCategory('diffUI');
            Game.EventManager.removeByCategory('gameUI');

            const correctDiff = curr.diff;
            const tripleExpOpt   = curr.sortedAsc[2];
            const tripleCheapOpt = curr.sortedAsc[0];
            const formulaHTML = b4DiffFormula(
                `${tripleExpOpt.storeIcon} ${tripleExpOpt.store}`, tripleExpOpt.price,
                `${tripleCheapOpt.storeIcon} ${tripleCheapOpt.store}`, tripleCheapOpt.price,
                correctDiff);
            const maxP = curr.sortedAsc[2].price;
            const barsHTML = `
            <div class="b4-price-bars">
                ${curr.sortedAsc.map(s => {
                    const pct = Math.round(s.price / maxP * 100);
                    const colorClass = s.price === maxP ? 'b4-pbar-high' : s.price === curr.sortedAsc[0].price ? 'b4-pbar-low' : 'b4-pbar-mid';
                    return `<div class="b4-pbar-row">
                        <div class="b4-pbar-store-hd">
                            <span class="b4-pbar-store-icon-lg">${s.storeIcon}</span>
                            <span class="b4-pbar-store-name-lg">${s.store}</span>
                        </div>
                        <div class="b4-pbar-money-row">
                            <div class="b4-pbar-coins">${b4PriceCoinsBar(s.price)}</div>
                            <span class="b4-pbar-price">${s.price} 元</span>
                        </div>
                        <div class="b4-pbar-track"><div class="b4-pbar-fill ${colorClass}" style="width:${pct}%"></div></div>
                    </div>`;
                }).join('')}
            </div>`;

            const hintWrap = `<div class="b4-hero-hint-wrap" id="b4-hero-hint-wrap">
                <img src="../images/index/educated_money_bag_character.png" alt="" class="b4-hint-mascot" onerror="this.style.display='none'">
                <button class="b4-hero-hint-btn" id="b4-hero-hint-btn">💡 提示</button>
            </div>`;

            const refCardHTML = `
            <div class="b4-ref-card-wrap">
                <div class="b4-diff-ref-card">
                    <span class="b4-diff-ref-icon">${curr.icon}</span>
                    <div class="b4-diff-ref-info">
                        <span class="b4-diff-ref-name">${curr.name}</span>
                    </div>
                </div>
                <div class="b4-diff-ref-cheap">✅ ${curr.sortedAsc[0].storeIcon} ${curr.sortedAsc[0].store} 最便宜</div>
            </div>`;

            const app = document.getElementById('app');

            if (diff === 'easy') {
                // 簡單：顯示正確答案（單一選項）
                app.innerHTML = `
                ${this._renderHeader()}
                <div class="b-game-wrap">
                    <div class="b4-item-hero" style="position:relative;">
                        ${refCardHTML}
                    </div>
                    <div class="b4-diff-section">
                        ${barsHTML}
                        <div class="b4-diff-question">
                            最貴比最便宜貴多少元？
                            <div class="b4-diff-sub">點選答案繼續</div>
                        </div>
                        <div class="b4-diff-options b4-diff-options-easy">
                            <button class="b4-diff-opt b4-diff-opt-solo" id="b4-easy-tdiff-btn" data-val="${correctDiff}">
                                <div class="b4-diff-opt-coins">${b4PriceCoins(correctDiff)}</div>
                                <span class="b4-diff-opt-label">${correctDiff} 元</span>
                            </button>
                        </div>
                    </div>
                </div>`;

                Game.EventManager.on(document.getElementById('b4-easy-tdiff-btn'), 'click', () => {
                    if (this.state.isProcessing) return;
                    this.state.isProcessing = true;
                    this.audio.play('correct');
                    document.getElementById('b4-easy-tdiff-btn')?.classList.add('correct-ans');
                    this.state.quiz.totalSaved += correctDiff;
                    this.state.quiz.comparisonHistory.push({
                        name: curr.name, icon: curr.icon, isTriple: true,
                        cheapStore: curr.sortedAsc[0].store, cheapPrice: curr.sortedAsc[0].price,
                        expStore: curr.sortedAsc[2].store,   expPrice:  curr.sortedAsc[2].price,
                        saved: correctDiff
                    });
                    this._showSavingsToast(correctDiff);
                    Game.Speech.speak(`最貴比最便宜貴了${correctDiff}元`, () => {
                        Game.TimerManager.setTimeout(() => this.nextQuestion(), 400, 'turnTransition');
                    });
                }, {}, 'diffUI');

                const backBtnTE = document.getElementById('back-to-settings');
                if (backBtnTE) Game.EventManager.on(backBtnTE, 'click', () => this.showSettings(), {}, 'diffUI');
                const rewardBtnTE = document.getElementById('reward-btn-g');
                if (rewardBtnTE) Game.EventManager.on(rewardBtnTE, 'click', () => {
                    if (typeof RewardLauncher !== 'undefined') RewardLauncher.open();
                    else window.open('../reward/index.html', 'RewardSystem', 'width=1200,height=800');
                }, {}, 'diffUI');
                Game.Speech.speak(`最貴比最便宜貴了${correctDiff}元`);
                return;
            }

            const options = this._getDiffOptions(correctDiff);
            app.innerHTML = `
            ${this._renderHeader()}
            <div class="b-game-wrap">
                <div class="b4-item-hero" style="position:relative;">
                    ${refCardHTML}
                    ${hintWrap}
                </div>
                <div class="b4-diff-section">
                    ${barsHTML}
                    <div class="b4-diff-question">
                        最貴比最便宜貴多少元？
                        <div class="b4-diff-sub">點選正確的差額（最貴 − 最便宜）</div>
                    </div>
                    ${formulaHTML}
                    <div class="b4-diff-options">
                        ${options.map(val => `
                        <button class="b4-diff-opt" data-val="${val}">
                            <div class="b4-diff-opt-coins">${b4PriceCoins(val)}</div>
                            <span class="b4-diff-opt-label">${val} 元</span>
                        </button>`).join('')}
                    </div>
                </div>
            </div>`;

            document.querySelectorAll('.b4-diff-opt').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    if (this.state.isProcessing) return;
                    this.state.isProcessing = true;
                    const chosen    = parseInt(btn.dataset.val);
                    const isCorrect = (chosen === correctDiff);
                    btn.classList.add(isCorrect ? 'correct-ans' : 'wrong-ans');
                    if (!isCorrect) {
                        document.querySelector(`.b4-diff-opt[data-val="${correctDiff}"]`)?.classList.add('correct-ans');
                    }
                    if (isCorrect) {
                        this.state.quiz.correctCount++;
                        this.state.quiz.totalSaved += correctDiff;
                        this.state.quiz.comparisonHistory.push({
                            name: curr.name, icon: curr.icon, isTriple: true,
                            cheapStore: curr.sortedAsc[0].store, cheapPrice: curr.sortedAsc[0].price,
                            expStore: curr.sortedAsc[2].store,   expPrice:  curr.sortedAsc[2].price,
                            saved: correctDiff
                        });
                        this._showSavingsToast(correctDiff);
                        Game.Speech.speak(`答對了！最貴比最便宜貴了${toTWD(correctDiff)}`, () => {
                            Game.TimerManager.setTimeout(() => this.nextQuestion(), 400, 'turnTransition');
                        });
                    } else {
                        this.audio.play('error');
                        this.state.quiz.diffErrorCount = (this.state.quiz.diffErrorCount || 0) + 1;
                        const revealTriple = this.state.settings.difficulty !== 'hard' && this.state.quiz.diffErrorCount >= 3;
                        if (revealTriple) this._showDiffFormulaHint();
                        if (this.state.settings.retryMode === 'proceed') {
                            Game.Speech.speak(`差額是${toTWD(correctDiff)}`);
                            Game.TimerManager.setTimeout(() => this.nextQuestion(), 1800, 'turnTransition');
                        } else {
                            if (revealTriple) {
                                Game.Speech.speak(`不對喔，差額是${toTWD(correctDiff)}，請再試一次`);
                            } else {
                                Game.Speech.speak(`不對喔，再算算看`);
                            }
                            Game.TimerManager.setTimeout(() => {
                                this.state.isProcessing = false;
                                document.querySelectorAll('.b4-diff-opt').forEach(b => {
                                    if (!revealTriple || parseInt(b.dataset.val) !== correctDiff) {
                                        b.classList.remove('wrong-ans', 'correct-ans');
                                        b.disabled = false;
                                    }
                                });
                            }, 1600, 'turnTransition');
                        }
                    }
                }, {}, 'diffUI');
            });

            // 提示鈕（三商店差額頁）
            const heroHintBtn = document.getElementById('b4-hero-hint-btn');
            if (heroHintBtn) {
                Game.EventManager.on(heroHintBtn, 'click', () => {
                    this._showDiffFormulaHint();
                    Game.Speech.speak(`${curr.sortedAsc[2].store}${curr.sortedAsc[2].price}元，${curr.sortedAsc[0].store}${curr.sortedAsc[0].price}元，兩者差多少元？`);
                }, {}, 'diffUI');
            }

            // 導覽按鈕
            const backBtn = document.getElementById('back-to-settings');
            if (backBtn) Game.EventManager.on(backBtn, 'click', () => this.showSettings(), {}, 'diffUI');
            const rewardBtn = document.getElementById('reward-btn-g');
            if (rewardBtn) Game.EventManager.on(rewardBtn, 'click', () => {
                if (typeof RewardLauncher !== 'undefined') RewardLauncher.open();
                else window.open('../reward/index.html', 'RewardSystem', 'width=1200,height=800');
            }, {}, 'diffUI');

            // 語音
            Game.Speech.speak(`${curr.sortedAsc[2].store}最貴，${curr.sortedAsc[0].store}最便宜，差了多少元？`);
        },

        // ── Diff Phase ─────────────────────────────────────────
        // ── 視覺價差比例條（F5 量比較 pattern）─────────────────────
        _renderPriceBars(curr) {
            if (curr.isUnit) {
                // 單位比價模式：用每單位價格畫比例條（無金幣圖示）
                const maxP = Math.max(curr.perA, curr.perB);
                const pctA = Math.round(curr.perA / maxP * 100);
                const pctB = Math.round(curr.perB / maxP * 100);
                const mkUnitRow = (opt, per, pct, cls) => `
                <div class="b4-pbar-row">
                    <div class="b4-pbar-store-hd">
                        <span class="b4-pbar-store-icon-lg">${opt.storeIcon}</span>
                        <span class="b4-pbar-store-name-lg">${opt.store}</span>
                        <span class="b4-pbar-price b4-pbar-unit-price">${per} 元/${curr.unit}</span>
                    </div>
                    <div class="b4-pbar-track">
                        <div class="b4-pbar-fill ${cls}" style="width:${pct}%"></div>
                    </div>
                </div>`;
                return `
                <div class="b4-price-bars">
                    ${mkUnitRow(curr.optA, curr.perA, pctA, 'b4-pbar-high')}
                    ${mkUnitRow(curr.optB, curr.perB, pctB, 'b4-pbar-low')}
                </div>`;
            }
            const maxP = Math.max(curr.optA.price, curr.optB.price);
            const pctA = Math.round(curr.optA.price / maxP * 100);
            const pctB = Math.round(curr.optB.price / maxP * 100);
            // 加上差距百分比標籤（Round 36）
            const diffPct = maxP > 0 ? Math.round((maxP - Math.min(curr.optA.price, curr.optB.price)) / maxP * 100) : 0;
            const mkRow = (opt, pct, cls) => `
            <div class="b4-pbar-row">
                <div class="b4-pbar-store-hd">
                    <span class="b4-pbar-store-icon-lg">${opt.storeIcon}</span>
                    <span class="b4-pbar-store-name-lg">${opt.store}</span>
                </div>
                <div class="b4-pbar-money-row">
                    <div class="b4-pbar-coins">${b4PriceCoinsBar(opt.price)}</div>
                    <span class="b4-pbar-price">${opt.price} 元</span>
                </div>
                <div class="b4-pbar-track">
                    <div class="b4-pbar-fill ${cls}" style="width:${pct}%"></div>
                </div>
            </div>`;
            return `
            <div class="b4-price-bars">
                ${mkRow(curr.optA, pctA, 'b4-pbar-high')}
                ${mkRow(curr.optB, pctB, 'b4-pbar-low')}
                ${diffPct > 0 ? `<div class="b4-pbar-diff-pct">便宜了 ${diffPct}%</div>` : ''}
            </div>`;
        },

        _renderDiffSection(curr, diff) {
            Game.EventManager.removeByCategory('diffUI');
            Game.EventManager.removeByCategory('gameUI');

            const correctDiff = curr.diff;
            const barsHTML    = this._renderPriceBars(curr);
            const diffQuestion = curr.isUnit ? `每${curr.unit}差多少元？` : `便宜了多少元？`;
            const diffUnit     = curr.isUnit ? `元/${curr.unit}` : `元`;
            const hintWrap = `<div class="b4-hero-hint-wrap" id="b4-hero-hint-wrap">
                <img src="../images/index/educated_money_bag_character.png" alt="" class="b4-hint-mascot" onerror="this.style.display='none'">
                <button class="b4-hero-hint-btn" id="b4-hero-hint-btn">💡 提示</button>
            </div>`;

            const cheapOpt = curr.isUnit ? curr.optB : (curr.optA.price < curr.optB.price ? curr.optA : curr.optB);
            const expOpt   = curr.isUnit ? curr.optA : (curr.optA.price >= curr.optB.price ? curr.optA : curr.optB);
            const formulaHTML = curr.isUnit
                ? b4DiffFormula(`${curr.optA.storeIcon} ${curr.optA.store}`, curr.perA, `${curr.optB.storeIcon} ${curr.optB.store}`, curr.perB, correctDiff, `元/${curr.unit}`)
                : b4DiffFormula(`${expOpt.storeIcon} ${expOpt.store}`, expOpt.price, `${cheapOpt.storeIcon} ${cheapOpt.store}`, cheapOpt.price, correctDiff);

            const refCardHTML = `
            <div class="b4-ref-card-wrap">
                <div class="b4-diff-ref-card">
                    <span class="b4-diff-ref-icon">${curr.icon}</span>
                    <div class="b4-diff-ref-info">
                        <span class="b4-diff-ref-name">${curr.name}</span>
                    </div>
                </div>
                <div class="b4-diff-ref-cheap">✅ ${cheapOpt.storeIcon} ${cheapOpt.store} 比較便宜</div>
            </div>`;

            const app = document.getElementById('app');

            if (diff === 'easy') {
                // 簡單：顯示算式 + 正確答案（單一選項，學生點選後繼續）
                app.innerHTML = `
                ${this._renderHeader()}
                <div class="b-game-wrap">
                    <div class="b4-item-hero" style="position:relative;">
                        ${refCardHTML}
                    </div>
                    <div class="b4-diff-section b4-diff-normal-card">
                        ${formulaHTML}
                        <div class="b4-diff-question b4-diff-question-below">
                            ${diffQuestion}
                            <div class="b4-diff-sub">點選答案繼續</div>
                        </div>
                    </div>
                    <div class="b4-diff-section b4-diff-options-card">
                        <div class="b4-diff-options b4-diff-options-easy">
                            <button class="b4-diff-opt b4-diff-opt-solo" id="b4-easy-diff-btn" data-val="${correctDiff}">
                                ${!curr.isUnit ? `<div class="b4-diff-opt-coins">${b4PriceCoins(correctDiff)}</div>` : ''}
                                <span class="b4-diff-opt-label">${correctDiff} ${diffUnit}</span>
                            </button>
                        </div>
                    </div>
                </div>`;

                Game.EventManager.on(document.getElementById('b4-easy-diff-btn'), 'click', () => {
                    if (this.state.isProcessing) return;
                    this.state.isProcessing = true;
                    this.audio.play('correct');
                    document.getElementById('b4-easy-diff-btn')?.classList.add('correct-ans');
                    this.state.quiz.totalSaved += correctDiff;
                    const ci = this.state.currentDiffItem;
                    if (ci) {
                        this.state.quiz.comparisonHistory.push({
                            name: ci.name, icon: ci.icon, cat: ci.cat || 'other',
                            cheapStore: cheapOpt.store, cheapPrice: ci.isUnit ? ci.perB : cheapOpt.price,
                            expStore: expOpt.store,     expPrice:  ci.isUnit ? ci.perA : expOpt.price,
                            saved: correctDiff, isUnit: ci.isUnit, unit: ci.unit
                        });
                    }
                    // 在算式卡下方插入「便宜了X元」
                    const diffCard = document.querySelector('.b4-diff-normal-card');
                    if (diffCard) {
                        const reveal = document.createElement('div');
                        reveal.className = 'b4-diff-answer-reveal';
                        reveal.textContent = curr.isUnit ? `每${curr.unit}差 ${correctDiff} 元` : `便宜了 ${correctDiff} 元`;
                        diffCard.appendChild(reveal);
                    }
                    this._showSavingsToast(correctDiff);
                    const s = curr.isUnit ? `每${curr.unit}差${correctDiff}元` : `便宜了${correctDiff}元`;
                    Game.Speech.speak(s, () => {
                        Game.TimerManager.setTimeout(() => this.nextQuestion(), 800, 'turnTransition');
                    });
                }, {}, 'diffUI');

                const backBtnE = document.getElementById('back-to-settings');
                if (backBtnE) Game.EventManager.on(backBtnE, 'click', () => this.showSettings(), {}, 'diffUI');
                const rewardBtnE = document.getElementById('reward-btn-g');
                if (rewardBtnE) Game.EventManager.on(rewardBtnE, 'click', () => {
                    if (typeof RewardLauncher !== 'undefined') RewardLauncher.open();
                    else window.open('../reward/index.html', 'RewardSystem', 'width=1200,height=800');
                }, {}, 'diffUI');
                // 進入頁面的語音：商品名稱 + 兩家店價格 + 請選擇
                const easySpeech = curr.isUnit
                    ? `${curr.name}，每${curr.unit}差${correctDiff}元，請選擇正確的答案`
                    : `${curr.name}，${expOpt.store}${expOpt.price}元，${cheapOpt.store}${cheapOpt.price}元，請選擇正確的答案`;
                Game.Speech.speak(easySpeech);
                return;

            } else if (diff === 'normal') {
                const options = this._getDiffOptions(correctDiff, curr.isUnit);
                app.innerHTML = `
                ${this._renderHeader()}
                <div class="b-game-wrap">
                    <div class="b4-item-hero" style="position:relative;">
                        ${refCardHTML}
                        ${hintWrap}
                    </div>
                    <div class="b4-diff-section b4-diff-normal-card">
                        ${formulaHTML}
                        <div class="b4-diff-question b4-diff-question-below">
                            ${diffQuestion}
                            <div class="b4-diff-sub">點選正確的差額</div>
                        </div>
                    </div>
                    <div class="b4-diff-section b4-diff-options-card">
                        <div class="b4-diff-options">
                            ${options.map(val => `
                            <button class="b4-diff-opt b4-diff-opt-masked" data-val="${val}">
                                ${!curr.isUnit ? `<div class="b4-diff-opt-coins">${b4PriceCoins(val)}</div>` : ''}
                                <span class="b4-diff-opt-label">？？？</span>
                            </button>`).join('')}
                        </div>
                    </div>
                </div>`;

                // 選項按鈕事件（點後先顯示金額再驗證）
                document.querySelectorAll('.b4-diff-opt').forEach(btn => {
                    Game.EventManager.on(btn, 'click', () => {
                        if (this.state.isProcessing) return;
                        // 點擊時顯示所有選項的金額
                        this._revealNormalDiffOptions(options, correctDiff, curr.isUnit, diffUnit);
                        this.state.isProcessing = true;
                        const chosen    = parseInt(btn.dataset.val);
                        const isCorrect = (chosen === correctDiff);
                        btn.classList.add(isCorrect ? 'correct-ans' : 'wrong-ans');
                        if (!isCorrect) {
                            document.querySelector(`.b4-diff-opt[data-val="${correctDiff}"]`)?.classList.add('correct-ans');
                        }
                        this.handleDiffAnswer(isCorrect, correctDiff);
                    }, {}, 'diffUI');
                });

            } else {
                // 困難：算式顯示？？？（可點擊）→ 彈窗數字輸入器 + 計算機
                const hardFormulaHTML = curr.isUnit
                    ? b4DiffFormula(`${curr.optA.storeIcon} ${curr.optA.store}`, curr.perA, `${curr.optB.storeIcon} ${curr.optB.store}`, curr.perB, correctDiff, `元/${curr.unit}`, true)
                    : b4DiffFormula(`${expOpt.storeIcon} ${expOpt.store}`, expOpt.price, `${cheapOpt.storeIcon} ${cheapOpt.store}`, cheapOpt.price, correctDiff, null, true);
                app.innerHTML = `
                ${this._renderHeader()}
                <div class="b-game-wrap">
                    <div class="b4-item-hero" style="position:relative;">
                        ${refCardHTML}
                        ${hintWrap}
                    </div>
                    <div class="b4-diff-hard-outer">
                        <div class="b4-diff-section b4-diff-normal-card" id="b4-hard-diff-card">
                            ${hardFormulaHTML}
                        </div>
                        <div class="b4-calc-side-col">
                            <button class="b4-calc-toggle-btn" id="b4-calc-toggle">🧮 開啟計算機</button>
                            <div class="b4-calc-panel" id="b4-calc-panel" style="display:none;">
                                ${this._getB4CalculatorHTML()}
                            </div>
                        </div>
                    </div>
                </div>`;

                // ？？？格點擊 → 彈窗數字輸入器
                Game.TimerManager.setTimeout(() => {
                    const unknownCell = document.querySelector('.b4-dff-unknown');
                    if (unknownCell) {
                        unknownCell.style.cursor = 'pointer';
                        unknownCell.title = '點我輸入答案';
                        Game.EventManager.on(unknownCell, 'click', () => {
                            if (this.state.isProcessing) return;
                            this._showHardDiffNumpadModal(correctDiff, diffUnit);
                        }, {}, 'diffUI');
                    }
                }, 50, 'ui');

                // 計算機
                this._bindB4Calculator();
            }

            // 提示鈕（diff 頁面）
            const heroHintBtn = document.getElementById('b4-hero-hint-btn');
            if (heroHintBtn) {
                Game.EventManager.on(heroHintBtn, 'click', () => {
                    if (diff === 'hard') {
                        // 困難：顯示完整算式彈窗
                        this._showHardDiffFormulaHint(curr, expOpt, cheapOpt, correctDiff, diffUnit);
                    } else if (diff === 'normal') {
                        // 普通：揭露所有選項金額 + 高亮正確 + 語音
                        const options = this._getDiffOptions(correctDiff, curr.isUnit);
                        this._revealNormalDiffOptions(options, correctDiff, curr.isUnit, diffUnit);
                        const correctBtn = document.querySelector(`.b4-diff-opt[data-val="${correctDiff}"]`);
                        if (correctBtn) {
                            correctBtn.classList.add('b4-select-hint');
                            Game.TimerManager.setTimeout(() => correctBtn.classList.remove('b4-select-hint'), 2400, 'ui');
                        }
                        Game.Speech.speak('請依提示選擇正確的答案');
                    } else {
                        this._showDiffFormulaHint();
                        const hintSpeech = curr.isUnit
                            ? `每${curr.unit}，${curr.optA.store}${curr.perA}元，${curr.optB.store}${curr.perB}元，兩者差多少元？`
                            : `${expOpt.store}${expOpt.price}元，${cheapOpt.store}${cheapOpt.price}元，兩者差多少元？`;
                        Game.Speech.speak(hintSpeech);
                    }
                }, {}, 'diffUI');
            }

            // 導覽按鈕
            const backBtn = document.getElementById('back-to-settings');
            if (backBtn) Game.EventManager.on(backBtn, 'click', () => this.showSettings(), {}, 'diffUI');
            const rewardBtn = document.getElementById('reward-btn-g');
            if (rewardBtn) Game.EventManager.on(rewardBtn, 'click', () => {
                if (typeof RewardLauncher !== 'undefined') RewardLauncher.open();
                else window.open('../reward/index.html', 'RewardSystem', 'width=1200,height=800');
            }, {}, 'diffUI');

            // 語音
            let diffSpeech;
            if (diff === 'easy') {
                diffSpeech = curr.isUnit
                    ? `${curr.name}，每${curr.unit}差${correctDiff}元，請選擇正確的答案`
                    : `${curr.name}，${expOpt.store}${expOpt.price}元，${cheapOpt.store}${cheapOpt.price}元，請選擇正確的答案`;
            } else if (diff === 'normal') {
                diffSpeech = curr.isUnit
                    ? `${curr.name}，${curr.optA.store}每${curr.unit}${curr.perA}元，${curr.optB.store}每${curr.unit}${curr.perB}元，${curr.optB.store}便宜了${correctDiff}元，請選擇正確的答案`
                    : `${curr.name}，${expOpt.store}${expOpt.price}元，${cheapOpt.store}${cheapOpt.price}元，${cheapOpt.store}便宜了${correctDiff}元，請選擇正確的答案`;
            } else {
                diffSpeech = curr.isUnit
                    ? `請計算每${curr.unit}差多少元，點擊問號輸入答案`
                    : `${expOpt.store}${expOpt.price}元，${cheapOpt.store}${cheapOpt.price}元，點擊問號輸入差額`;
            }
            Game.Speech.speak(diffSpeech);
        },

        _updateNumpadDisplay() {
            const el = document.getElementById('numpad-val');
            if (el) el.textContent = this.state.numpadValue || '0';
        },

        // 普通模式差額選項：揭露所有金額（coins 已在 HTML 中，只需更新 label visibility）
        _revealNormalDiffOptions(options, correctDiff, isUnit, diffUnit) {
            document.querySelectorAll('.b4-diff-opt').forEach(btn => {
                const val = parseInt(btn.dataset.val);
                const label = btn.querySelector('.b4-diff-opt-label');
                if (label) { label.textContent = `${val} ${diffUnit}`; label.style.visibility = 'visible'; }
            });
        },

        // 困難模式差額：彈窗數字輸入器
        _showHardDiffNumpadModal(correctDiff, diffUnit) {
            const prev = document.getElementById('b4-hard-np-modal');
            if (prev) prev.remove();

            const overlay = document.createElement('div');
            overlay.id = 'b4-hard-np-modal';
            overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:10200;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.45);';
            overlay.innerHTML = `
            <div class="b4-hnp-card">
                <button class="b4-modal-close-x" id="b4-hnp-x">✕</button>
                <div class="b4-hnp-title">便宜了多少${diffUnit}？</div>
                <div class="b4-input-display" id="b4-hnp-display">
                    <span id="b4-hnp-val">0</span><span class="b4-unit-text"> ${diffUnit}</span>
                </div>
                <div class="b4-numpad">
                    ${[7,8,9,4,5,6,1,2,3].map(n => `<button class="b4-numpad-btn" data-hnp="${n}">${n}</button>`).join('')}
                    <button class="b4-numpad-btn btn-del" id="b4-hnp-del">⌫</button>
                    <button class="b4-numpad-btn" data-hnp="0">0</button>
                    <button class="b4-numpad-btn btn-ok" id="b4-hnp-ok">✓</button>
                </div>
            </div>`;
            document.body.appendChild(overlay);

            let val = '';
            const updateDisp = () => {
                const el = document.getElementById('b4-hnp-val');
                if (el) el.textContent = val || '0';
            };

            overlay.querySelectorAll('[data-hnp]').forEach(btn => {
                btn.addEventListener('click', e => {
                    e.stopPropagation();
                    if (val.length >= 5) return;
                    val += btn.dataset.hnp;
                    updateDisp();
                });
            });
            document.getElementById('b4-hnp-del').addEventListener('click', e => {
                e.stopPropagation();
                val = val.slice(0, -1);
                updateDisp();
            });
            document.getElementById('b4-hnp-ok').addEventListener('click', e => {
                e.stopPropagation();
                if (this.state.isProcessing) return;
                const entered = parseInt(val) || 0;
                if (entered === 0) return;
                this.state.isProcessing = true;
                const display = document.getElementById('b4-hnp-display');
                const isCorrect = (entered === correctDiff);
                if (display) { display.style.background = isCorrect ? '#059669' : '#dc2626'; display.style.color = '#fff'; }
                if (isCorrect) {
                    // 更新算式中的 ？？？ 為正確答案
                    const unknownCell = document.querySelector('.b4-dff-unknown');
                    if (unknownCell) {
                        unknownCell.classList.remove('b4-dff-unknown');
                        unknownCell.textContent = `${correctDiff} 元`;
                        unknownCell.style.color = '#059669';
                    }
                }
                Game.TimerManager.setTimeout(() => {
                    overlay.remove();
                    this.handleDiffAnswer(isCorrect, correctDiff);
                }, 600, 'ui');
            });
            document.getElementById('b4-hnp-x').addEventListener('click', () => overlay.remove());
        },

        // 困難模式差額：算式提示彈窗
        _showHardDiffFormulaHint(curr, expOpt, cheapOpt, correctDiff, diffUnit) {
            const prev = document.getElementById('b4-hard-formula-hint');
            if (prev) prev.remove();

            const expPrice   = curr.isUnit ? curr.perA : expOpt.price;
            const cheapPrice = curr.isUnit ? curr.perB : cheapOpt.price;
            const expStore   = curr.isUnit ? curr.optA.store : expOpt.store;
            const cheapStore = curr.isUnit ? curr.optB.store : cheapOpt.store;

            const overlay = document.createElement('div');
            overlay.id = 'b4-hard-formula-hint';
            overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:10200;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.45);cursor:pointer;';
            overlay.innerHTML = `
            <div class="b4-hfh-card">
                <div class="b4-hfh-title">💡 算式提示</div>
                <div class="b4-hfh-formula">
                    <span class="b4-hfh-store">${expStore}</span>
                    <span class="b4-hfh-num">${expPrice}</span>
                    <span class="b4-hfh-op">－</span>
                    <span class="b4-hfh-store">${cheapStore}</span>
                    <span class="b4-hfh-num">${cheapPrice}</span>
                    <span class="b4-hfh-op">＝</span>
                    <span class="b4-hfh-ans">${correctDiff} ${diffUnit}</span>
                </div>
                <div class="b4-hfh-close">點任意處關閉</div>
            </div>`;
            document.body.appendChild(overlay);

            const speech = `${expStore}${expPrice}元，減去${cheapStore}${cheapPrice}元，等於${correctDiff}${diffUnit}`;
            Game.Speech.speak(speech);

            overlay.addEventListener('click', () => overlay.remove());
        },

        _getDiffOptions(correct, isUnit = false) {
            const opts = new Set([correct]);
            const variations = isUnit
                ? [1, 2, 3, 4, 5, 6, 7, 8]
                : [10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 100];
            for (const v of variations) {
                if (opts.size >= 3) break;
                const candidate = correct + (Math.random() < 0.5 ? v : -v);
                if (candidate > 0 && candidate !== correct) opts.add(candidate);
            }
            // 補足到3個
            let extra = isUnit ? 1 : 10;
            while (opts.size < 3) { opts.add(correct + extra); extra += isUnit ? 1 : 5; }
            return [...opts].sort(() => Math.random() - 0.5);
        },

        // ── Diff Correct 算式閃現（Round 28）────────────────────
        _showDiffCalcFlash(highPrice, lowPrice, diff) {
            const prev = document.getElementById('b4-calc-flash');
            if (prev) prev.remove();
            const flash = document.createElement('div');
            flash.id = 'b4-calc-flash';
            flash.className = 'b4-calc-flash';
            flash.innerHTML = `
                <span class="b4-cf-num">${highPrice}</span>
                <span class="b4-cf-op">−</span>
                <span class="b4-cf-num">${lowPrice}</span>
                <span class="b4-cf-op">=</span>
                <span class="b4-cf-ans">${diff} 元</span>`;
            document.body.appendChild(flash);
            Game.TimerManager.setTimeout(() => {
                flash.classList.add('b4-cf-fade');
                Game.TimerManager.setTimeout(() => { if (flash.parentNode) flash.remove(); }, 400, 'ui');
            }, 1400, 'ui');
        },

        // ── Select 階段計時提示（清除函數）──────────────────────
        _clearSelectHintTimer() {
            if (this._selectHintTimer) {
                // TimerManager handles clearing, just reset the ref
                this._selectHintTimer = null;
            }
        },

        // ── Diff Formula Hint ───────────────────────────────────
        _showDiffFormulaHint() {
            const item = this.state.currentDiffItem;
            if (!item) return;
            if (document.querySelector('.b4-diff-hint-formula')) return; // 防重複
            const section = document.querySelector('.b4-diff-section');
            if (!section) return;
            const hint = document.createElement('div');
            hint.className = 'b4-diff-hint-formula';
            if (item.isUnit) {
                // 單位比價：顯示每單位算式
                hint.innerHTML = `<span class="b4-hint-label">💡 算式提示：</span>`
                    + `${item.optA.store} ${item.optA.price}÷${item.optA.qty}=${item.perA}元`
                    + ` <span class="b4-hint-op">−</span> `
                    + `${item.optB.store} ${item.optB.price}÷${item.optB.qty}=${item.perB}元`
                    + ` <span class="b4-hint-op">=</span> <span class="b4-hint-blank">？</span> 元/${item.unit}`;
            } else {
                hint.innerHTML = `<span class="b4-hint-label">💡 算式提示：</span>`
                    + `${item.optA.price} <span class="b4-hint-op">−</span> ${item.optB.price}`
                    + ` <span class="b4-hint-op">=</span> <span class="b4-hint-blank">？</span> 元`;
            }
            const anchor = section.querySelector('.b4-diff-options') || section.querySelector('.b4-numpad');
            if (anchor) section.insertBefore(hint, anchor);
            else section.appendChild(hint);
        },

        // ── 三商店獎台動畫（F4 排序 pattern）────────────────────
        _showPodiumAnimation(curr) {
            const prev = document.getElementById('b4-podium-overlay');
            if (prev) prev.remove();
            const sorted = curr.sortedAsc; // [cheapest, middle, mostExp]
            // 獎台視覺：左=2nd，中=1st（最高），右=3rd
            const cols = [
                { store: sorted[1].store, price: sorted[1].price, rank: '🥈', height: '70px', label: '第2名', cls: 'silver' },
                { store: sorted[0].store, price: sorted[0].price, rank: '🥇', height: '96px', label: '最便宜', cls: 'gold' },
                { store: sorted[2].store, price: sorted[2].price, rank: '🥉', height: '50px', label: '第3名', cls: 'bronze' },
            ];
            const overlay = document.createElement('div');
            overlay.id = 'b4-podium-overlay';
            overlay.style.cssText = 'position:fixed;inset:0;z-index:10150;display:flex;align-items:flex-end;justify-content:center;padding-bottom:60px;pointer-events:none;';
            overlay.innerHTML = `<div class="b4-podium-wrap">
                ${cols.map((col, i) => `
                <div class="b4-podium-col ${col.cls}" style="animation-delay:${i*0.12}s">
                    <div class="b4-podium-rank">${col.rank}</div>
                    <div class="b4-podium-store">${col.store}</div>
                    <div class="b4-podium-price">${col.price}元</div>
                    <div class="b4-podium-block ${col.cls}" style="height:${col.height}">
                        <span class="b4-podium-lbl">${col.label}</span>
                    </div>
                </div>`).join('')}
            </div>`;
            document.body.appendChild(overlay);
            // 語音播報排名（Round 43）
            const cheapest = sorted[0];
            Game.TimerManager.setTimeout(() => {
                Game.Speech.speak(`第一名，${cheapest.store}，${cheapest.price}元，最便宜！`);
            }, 350, 'speech');
            Game.TimerManager.setTimeout(() => {
                overlay.style.transition = 'opacity 0.4s';
                overlay.style.opacity = '0';
                Game.TimerManager.setTimeout(() => { if (overlay.parentNode) overlay.remove(); }, 400, 'ui');
            }, 1600, 'ui');
        },

        // ── 連勝徽章（B3 streak pattern）──────────────────────
        _showStreakBadge(streak) {
            const existing = document.getElementById('b4-streak-badge');
            if (existing) existing.remove();
            const badge = document.createElement('div');
            badge.id = 'b4-streak-badge';
            badge.className = 'b4-streak-badge';
            const label = streak === 3 ? '🔥 3連勝！' : '⚡ 5連勝！';
            const msg   = streak === 3 ? '繼續加油！' : '太厲害了！';
            badge.innerHTML = `<div class="b4-sb-inner"><div class="b4-sb-label">${label}</div><div class="b4-sb-msg">${msg}</div></div>`;
            document.body.appendChild(badge);
            Game.Speech.speak(streak === 3 ? '三連勝，繼續加油！' : '五連勝，太厲害了！');
            Game.TimerManager.setTimeout(() => {
                badge.classList.add('b4-sb-fade');
                Game.TimerManager.setTimeout(() => { if (badge.parentNode) badge.remove(); }, 400, 'ui');
            }, 1600, 'ui');
        },

        // ── Diff Answer Handler ─────────────────────────────────
        // 省錢 toast（A4 _showPricePopup pattern）
        // ── 學習要點提示（Round 32）──────────────────────────────
        _showSubtractionTip(highPrice, lowPrice, diff) {
            const prev = document.getElementById('b4-sub-tip');
            if (prev) prev.remove();
            const tip = document.createElement('div');
            tip.id = 'b4-sub-tip';
            tip.className = 'b4-sub-tip';
            tip.innerHTML = `<span class="b4-st-label">📐 減法算式：</span>`
                + `<span class="b4-st-hi">${highPrice}</span>`
                + `<span class="b4-st-op"> − </span>`
                + `<span class="b4-st-lo">${lowPrice}</span>`
                + `<span class="b4-st-op"> = </span>`
                + `<span class="b4-st-diff">${diff} 元</span>`;
            document.body.appendChild(tip);
            Game.TimerManager.setTimeout(() => { tip.classList.add('b4-tip-fade'); Game.TimerManager.setTimeout(() => tip.remove(), 400, 'ui'); }, 1200, 'ui');
        },

        // ── 冠軍徽章（Round 31）──────────────────────────────────
        // ── 比價思路步驟卡（Round 44）────────────────────────────
        _showThinkingSteps(curr) {
            document.getElementById('b4-thinking-card')?.remove();
            if (curr.isTriple || curr.isUnit) return; // 僅兩商店模式
            const a = curr.optA, b = curr.optB;
            const cheaperStore = a.price <= b.price ? a.store : b.store;
            const cheaper  = a.price <= b.price ? a.price : b.price;
            const pricierStore = a.price <= b.price ? b.store : a.store;
            const pricier  = a.price <= b.price ? b.price : a.price;
            const op = pricier > cheaper ? '>' : '=';
            const card = document.createElement('div');
            card.id = 'b4-thinking-card';
            card.className = 'b4-thinking-card';
            card.innerHTML = `
                <div class="b4-tc-title">🤔 比較思路</div>
                <div class="b4-tc-step b4-tc-step1">1️⃣ 看 ${a.store}：<strong>${a.price}元</strong></div>
                <div class="b4-tc-step b4-tc-step2">2️⃣ 看 ${b.store}：<strong>${b.price}元</strong></div>
                <div class="b4-tc-conclude">${pricier}元 ${op} ${cheaper}元，所以 <strong>${cheaperStore}</strong> 比較便宜 ✅</div>`;
            document.body.appendChild(card);
            Game.TimerManager.setTimeout(() => {
                card.classList.add('b4-tc-fade');
                Game.TimerManager.setTimeout(() => { if (card.parentNode) card.remove(); }, 400, 'ui');
            }, 2000, 'ui');
        },

        _showChampionBadge(storeName) {
            const prev = document.getElementById('b4-champion-badge');
            if (prev) prev.remove();
            const badge = document.createElement('div');
            badge.id = 'b4-champion-badge';
            badge.className = 'b4-champion-badge';
            badge.innerHTML = `<span class="b4-champ-icon">🥇</span><span class="b4-champ-text">${storeName}最便宜！</span>`;
            document.body.appendChild(badge);
            Game.TimerManager.setTimeout(() => badge.remove(), 1600, 'ui');
        },

        _showSavingsToast(amount) {
            const prev = document.getElementById('b4-savings-toast');
            if (prev) prev.remove();
            const toast = document.createElement('div');
            toast.id = 'b4-savings-toast';
            toast.className = 'b4-savings-toast';
            const ci3 = this.state.currentDiffItem;
            if (ci3 && ci3.isUnit) {
                const pctU = ci3.perA > 0 ? Math.round((amount / ci3.perA) * 100) : 0;
                toast.textContent = `💰 每${ci3.unit}省了 ${amount} 元（省 ${pctU}%）！`;
            } else {
                const highPrice = ci3 ? (ci3.optA?.price || (ci3.optA?.price)) : 0;
                const pct = highPrice > 0 ? Math.round((amount / highPrice) * 100) : 0;
                toast.textContent = pct > 0 ? `💰 省了 ${amount} 元（省 ${pct}%）！` : `💰 省了 ${amount} 元！`;
            }
            document.body.appendChild(toast);
            Game.TimerManager.setTimeout(() => {
                toast.classList.add('b4-toast-fade');
                Game.TimerManager.setTimeout(() => { if (toast.parentNode) toast.remove(); }, 400, 'ui');
            }, 1100, 'ui');
        },

        handleDiffAnswer(isCorrect, correctDiff) {
            if (isCorrect) {
                this.audio.play('correct');
                this._showCenterFeedback('✅', '答對了！');
                this.state.quiz.correctCount++;
                this.state.quiz.totalSaved += correctDiff;
                this.state.quiz.streak = (this.state.quiz.streak || 0) + 1;
                if (this.state.quiz.streak === 3 || this.state.quiz.streak === 5) {
                    Game.TimerManager.setTimeout(() => this._showStreakBadge(this.state.quiz.streak), 200, 'ui');
                }
                const ci = this.state.currentDiffItem;
                if (ci) {
                    this.state.quiz.comparisonHistory.push({
                        name: ci.name, icon: ci.icon, cat: ci.cat || 'other',
                        cheapStore: ci.optB.store, cheapPrice: ci.isUnit ? ci.perB : ci.optB.price,
                        expStore: ci.optA.store,   expPrice:  ci.isUnit ? ci.perA : ci.optA.price,
                        saved: correctDiff,
                        isUnit: ci.isUnit || false, unit: ci.unit || ''
                    });
                }
                this._showSavingsToast(correctDiff);
                // 差額算式閃現（Round 28）
                const ci2 = this.state.currentDiffItem;
                if (ci2 && !ci2.isUnit) {
                    this._showDiffCalcFlash(ci2.optA.price, ci2.optB.price, correctDiff);
                }
                const diffSpeech = (ci2 && ci2.isUnit)
                    ? `答對了！每${ci2.unit}便宜了${correctDiff}元`
                    : `答對了！便宜了${toTWD(correctDiff)}`;
                // 學習要點提示（Round 32）
                if (ci2 && !ci2.isUnit) {
                    this._showSubtractionTip(ci2.optA.price, ci2.optB.price, correctDiff);
                }
                Game.Speech.speak(diffSpeech, () => {
                    Game.TimerManager.setTimeout(() => this.nextQuestion(), 400, 'turnTransition');
                });
            } else {
                this.state.quiz.streak = 0;
                this.state.quiz.diffErrorCount = (this.state.quiz.diffErrorCount || 0) + 1;
                this.audio.play('error');
                const ciW = this.state.currentDiffItem;
                const diff = this.state.settings.difficulty;
                // 普通模式：3次後自動揭露答案；困難模式：只有提示鈕才揭露
                const revealAnswer = diff !== 'hard' && this.state.quiz.diffErrorCount >= 3;
                if (revealAnswer) {
                    this._showDiffFormulaHint(); // 普通模式第3次後顯示算式
                }
                const diffWrongSpeechBase = (ciW && ciW.isUnit)
                    ? `每${ciW.unit}差${correctDiff}元`
                    : `差額是${toTWD(correctDiff)}`;
                if (this.state.settings.retryMode === 'proceed') {
                    this._showCenterFeedback('❌', '答錯了！');
                    Game.Speech.speak(`${diffWrongSpeechBase}，繼續下一題`);
                    Game.TimerManager.setTimeout(() => this.nextQuestion(), 1800, 'turnTransition');
                } else {
                    this._showCenterFeedback('❌', '再試一次！');
                    if (revealAnswer) {
                        // 普通模式第3次：說出答案，並保留正確選項高亮
                        Game.Speech.speak(`不對喔，${diffWrongSpeechBase}，請再試一次`);
                    } else {
                        // 第1~2次（或困難模式全部次數）：只給方向提示
                        const ciWDir = ciW && !ciW.isUnit && this.state.numpadValue
                            ? parseInt(this.state.numpadValue) > correctDiff ? '多了' : '少了'
                            : null;
                        const dirHint = ciWDir ? `算${ciWDir}，` : '';
                        Game.Speech.speak(`不對喔，${dirHint}再想想看`);
                    }
                    Game.TimerManager.setTimeout(() => {
                        this.state.isProcessing = false;
                        // 普通模式 3 次後保留正確答案高亮，困難模式全部清除
                        document.querySelectorAll('.b4-diff-opt').forEach(b => {
                            const isCorrectOpt = parseInt(b.dataset.val) === correctDiff;
                            if (revealAnswer && isCorrectOpt) {
                                b.classList.add('correct-ans'); // 保留高亮
                            } else {
                                b.classList.remove('wrong-ans', 'correct-ans');
                            }
                            b.disabled = revealAnswer && isCorrectOpt; // 正確選項保持不可點
                        });
                        // Reset numpad display
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
            q.selectErrorCount = 0;
            q.diffErrorCount = 0;
            q.currentQuestion++;
            if (q.currentQuestion >= q.totalQuestions) {
                if (q.comparisonHistory && q.comparisonHistory.length > 0) {
                    this.showSavingsList();
                } else {
                    this.showResults();
                }
            } else {
                this.renderQuestion();
            }
        },

        // ── 省錢清單（測驗結束後先顯示，再進總結頁）──────────────
        showSavingsList() {
            AssistClick.deactivate();
            Game.TimerManager.clearByCategory('turnTransition');
            Game.EventManager.removeByCategory('gameUI');
            Game.EventManager.removeByCategory('diffUI');

            const q      = this.state.quiz;
            const hist   = q.comparisonHistory || [];
            const isUnit = this.state.settings.compareStores === 'unit';

            const app = document.getElementById('app');
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
            app.style.overflow  = 'auto';
            app.style.height    = 'auto';
            app.style.minHeight = '100vh';

            // ── 依省錢排序，取出最划算 ──
            const sorted = [...hist].sort((a, b) => b.saved - a.saved);
            const best   = sorted[0];
            // 建立快速索引：histIdx → rank medal
            const medalMap = new Map();
            sorted.slice(0, 3).forEach((h, rank) => {
                const idx = hist.indexOf(h);
                medalMap.set(idx, ['🥇', '🥈', '🥉'][rank]);
            });

            // ── 每筆比價卡片（卡片式設計） ──
            const cardsHTML = hist.map((h, i) => {
                const medal = medalMap.get(i) || '';
                const expLabel  = h.isUnit ? `每${h.unit} ${h.expPrice}元`   : `${h.expPrice}元`;
                const cheapLabel= h.isUnit ? `每${h.unit} ${h.cheapPrice}元` : `${h.cheapPrice}元`;
                const savedLabel= h.isUnit ? `省${h.saved}元/${h.unit}`       : `省 ${h.saved} 元`;
                const catColor  = { food:'#f0fdf4', stationery:'#eff6ff', daily:'#fdf4ff', clothing:'#fff7ed', other:'#f9fafb' }[h.cat] || '#f9fafb';
                const catBorder = { food:'#86efac', stationery:'#93c5fd', daily:'#d8b4fe', clothing:'#fdba74', other:'#e5e7eb' }[h.cat] || '#e5e7eb';
                return `
                <div class="b4-sl-card2${medal === '🥇' ? ' b4-sl-card2-gold' : ''}" style="animation-delay:${i * 110 + 300}ms;">
                    ${medal ? `<div class="b4-sl2-medal-badge">${medal}</div>` : ''}
                    <div class="b4-sl2-top" style="background:${catColor};border-color:${catBorder};">
                        <span class="b4-sl2-icon">${h.icon}</span>
                        <span class="b4-sl2-name">${h.name}</span>
                    </div>
                    <div class="b4-sl2-body">
                        <div class="b4-sl2-formula">
                            <div class="b4-sl2-store-block b4-sl2-exp">
                                <span class="b4-sl2-store-name">${h.expStore}</span>
                                <span class="b4-sl2-price">${expLabel}</span>
                            </div>
                            <span class="b4-sl2-op">－</span>
                            <div class="b4-sl2-store-block b4-sl2-cheap">
                                <span class="b4-sl2-store-name">${h.cheapStore}</span>
                                <span class="b4-sl2-price">${cheapLabel}</span>
                            </div>
                            <span class="b4-sl2-op">＝</span>
                            <div class="b4-sl2-store-block b4-sl2-saved">
                                <span class="b4-sl2-saved-txt">${savedLabel}</span>
                            </div>
                        </div>
                    </div>
                </div>`;
            }).join('');

            const diffLabel = { easy: '簡單', normal: '普通', hard: '困難' }[this.state.settings.difficulty] || '';

            app.innerHTML = `
<div class="b-header">
    <div class="b-header-left"><span class="b-header-unit">🏷️ 特賣比一比</span></div>
    <div class="b-header-center">${diffLabel}模式 · 省錢清單</div>
    <div class="b-header-right">
        <button class="b-reward-btn" id="b4-sl-reward-btn">🎁 獎勵</button>
        <button class="b-back-btn" id="b4-sl-back-btn">返回設定</button>
    </div>
</div>
<div class="b4-sl-page">
    <div class="b4-sl-summary-card">
        <div class="b4-sl-sc-trophy">💰</div>
        <div class="b4-sl-sc-title">省錢清單</div>
        ${q.totalSaved > 0 ? `<div class="b4-sl-sc-total">${isUnit ? '最划算單位價格' : `總共省了 ${q.totalSaved} 元`}</div>` : ''}
        ${best ? `<div class="b4-sl-sc-best">🌟 最划算：${best.icon}${best.name}（${best.cheapStore}）省 ${best.saved} 元</div>` : ''}
    </div>

    <div class="b4-sl-cards2">
        ${hist.length > 0 ? cardsHTML : '<div class="b4-sl-empty">這次沒有比價記錄</div>'}
    </div>

    <div class="b4-sl-actions">
        <button class="b4-sl-next-btn" id="b4-sl-next-btn">
            查看完整成績 →
        </button>
    </div>
</div>`;

            Game.EventManager.on(document.getElementById('b4-sl-next-btn'), 'click', () => {
                this.showResults();
            }, {}, 'gameUI');
            Game.EventManager.on(document.getElementById('b4-sl-reward-btn'), 'click', () => {
                if (typeof RewardLauncher !== 'undefined') RewardLauncher.open();
                else window.open('../reward/index.html', 'RewardSystem', 'width=1200,height=800');
            }, {}, 'gameUI');
            Game.EventManager.on(document.getElementById('b4-sl-back-btn'), 'click', () => {
                this.showSettings();
            }, {}, 'gameUI');

            // 音效 + 煙火
            Game.TimerManager.setTimeout(() => {
                document.getElementById('success-sound')?.play();
                this._fireConfetti();
            }, 150, 'confetti');

            // 語音
            if (q.totalSaved > 0) {
                Game.TimerManager.setTimeout(() => {
                    Game.Speech.speak(`恭喜！這次比價總共省了${q.totalSaved}元！`);
                }, 600, 'speech');
            }
        },

        showResults() {
            // ── 完成畫面守衛 ──
            if (this.state.isEndingGame) return;
            this.state.isEndingGame = true;

            AssistClick.deactivate();
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
            if (accuracy === 100)    { badge = '完美 🥇'; badgeColor = '#f59e0b'; }
            else if (accuracy >= 90) { badge = '優異 🥇'; badgeColor = '#f59e0b'; }
            else if (accuracy >= 70) { badge = '良好 🥈'; badgeColor = '#10b981'; }
            else if (accuracy >= 50) { badge = '努力 🥉'; badgeColor = '#6366f1'; }
            else                     { badge = '練習 ⭐'; badgeColor = '#94a3b8'; }

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
                    <div class="b-res-ach-item">✅ 比較不同商店的價格</div>
                    <div class="b-res-ach-item">✅ 找出最划算的選擇</div>
                    ${this.state.settings.compareStores === 'triple'
                        ? `<div class="b-res-ach-item">✅ 將三家商店由便宜到貴排序（F4 排序技能應用）</div>`
                        : `<div class="b-res-ach-item">✅ 計算兩價格的差額</div>`}
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

        // ── 計算機（困難模式差額頁）────────────────────────────────
        _getB4CalculatorHTML() {
            return `
            <div class="b4-calculator">
                <div class="b4-calc-display" id="b4-calc-display">0</div>
                <div class="b4-calc-buttons">
                    <button class="b4-calc-btn b4-calc-num" data-v="7">7</button>
                    <button class="b4-calc-btn b4-calc-num" data-v="8">8</button>
                    <button class="b4-calc-btn b4-calc-num" data-v="9">9</button>
                    <button class="b4-calc-btn b4-calc-op"  data-v="C">C</button>
                    <button class="b4-calc-btn b4-calc-num" data-v="4">4</button>
                    <button class="b4-calc-btn b4-calc-num" data-v="5">5</button>
                    <button class="b4-calc-btn b4-calc-num" data-v="6">6</button>
                    <button class="b4-calc-btn b4-calc-op"  data-v="+">+</button>
                    <button class="b4-calc-btn b4-calc-num" data-v="1">1</button>
                    <button class="b4-calc-btn b4-calc-num" data-v="2">2</button>
                    <button class="b4-calc-btn b4-calc-num" data-v="3">3</button>
                    <button class="b4-calc-btn b4-calc-op"  data-v="-">−</button>
                    <button class="b4-calc-btn b4-calc-num" data-v="0">0</button>
                    <button class="b4-calc-btn b4-calc-op"  data-v="⌫">⌫</button>
                    <button class="b4-calc-btn b4-calc-eq"  data-v="=">=</button>
                    <button class="b4-calc-btn b4-calc-op"  data-v="×">×</button>
                </div>
            </div>`;
        },

        _bindB4Calculator() {
            const panel   = document.getElementById('b4-calc-panel');
            const toggle  = document.getElementById('b4-calc-toggle');
            const display = document.getElementById('b4-calc-display');
            if (!panel || !toggle || !display) return;

            let calcVal = '0', calcOp = null, calcPrev = null, calcFresh = false;
            const updateDisp = () => { display.textContent = calcVal; };

            Game.EventManager.on(toggle, 'click', () => {
                const open = panel.style.display === 'none';
                panel.style.display = open ? '' : 'none';
                toggle.textContent = open ? '🧮 關閉計算機' : '🧮 開啟計算機';
            }, {}, 'diffUI');

            panel.querySelectorAll('.b4-calc-btn').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    const v = btn.dataset.v;
                    if (v === 'C') { calcVal = '0'; calcOp = null; calcPrev = null; calcFresh = false; }
                    else if (v === '⌫') { calcVal = calcVal.length > 1 ? calcVal.slice(0, -1) : '0'; }
                    else if (['+', '−', '-', '×'].includes(v)) {
                        if (calcOp && calcPrev !== null && !calcFresh) {
                            const cur = parseFloat(calcVal);
                            const res = calcOp === '+' ? calcPrev + cur : (calcOp === '−' || calcOp === '-') ? calcPrev - cur : calcPrev * cur;
                            calcVal = String(Math.round(res * 1000) / 1000);
                            updateDisp();
                        }
                        calcPrev = parseFloat(calcVal); calcOp = v; calcFresh = true;
                    } else if (v === '=') {
                        if (calcOp && calcPrev !== null) {
                            const cur = parseFloat(calcVal);
                            const res = calcOp === '+' ? calcPrev + cur : (calcOp === '−' || calcOp === '-') ? calcPrev - cur : calcPrev * cur;
                            calcVal = String(Math.round(res * 1000) / 1000);
                            calcOp = null; calcPrev = null;
                        }
                    } else {
                        calcVal = (calcFresh || calcVal === '0') ? v : calcVal + v;
                        calcFresh = false;
                    }
                    updateDisp();
                }, {}, 'diffUI');
            });
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

    // 👆 輔助點擊模式（AssistClick）— 獨立區塊
    // ============================================================
    const AssistClick = {
        _overlay: null, _handler: null, _touchHandler: null,
        _queue: [], _enabled: false,
        _lastHighlighted: null, _observer: null,
        _curr: null, _correctSide: null,

        activate(curr, correctSide) {
            if (this._overlay) return;
            this._curr        = curr;
            this._correctSide = correctSide;
            this._overlay = document.createElement('div');
            this._overlay.id = 'b4-assist-overlay';
            const tbEl = document.querySelector('.b-header');
            const tbBottom = tbEl ? Math.round(tbEl.getBoundingClientRect().bottom) : 60;
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
            this._queue = []; this._enabled = false;
            this._curr = null; this._correctSide = null;
            this._handler = null; this._touchHandler = null;
        },

        buildQueue() {
            if (!this._enabled) return;
            this._clearHighlight();
            this._queue = [];

            const curr        = this._curr;
            const correctSide = this._correctSide;
            const diff        = Game.state.settings.difficulty;
            const phase       = Game.state.phase;

            if (!curr) return;

            if (curr.isTriple) {
                // ── 三商店模式 ────────────────────────────────
                if (diff === 'hard') {
                    // hard：依已點順序決定下一個目標（cheapest→middle→mostExp）
                    const rankOrder = [curr.cheapestIdx, curr.middleIdx, curr.mostExpIdx];
                    const done      = Game.state.tripleClickOrder.length;
                    if (done >= rankOrder.length) return;
                    const nextIdx = rankOrder[done];
                    const card = document.getElementById(`tcard-${nextIdx}`);
                    if (card && !card.classList.contains('ranked')) {
                        this._queue = [{ el: card, action: () => card.click() }];
                    }
                } else {
                    // easy/normal：點最便宜卡
                    if (phase === 'select') {
                        const card = document.getElementById(`tcard-${curr.cheapestIdx}`);
                        if (card && !card.classList.contains('selected-correct')) {
                            this._queue = [{ el: card, action: () => card.click() }];
                        }
                    } else if (phase === 'diff') {
                        // normal 三商店差額（three options）
                        const diffSection = document.getElementById('diff-section');
                        if (!diffSection) return;
                        const correctDiff = curr.diff;
                        const opt = diffSection.querySelector(`.b4-diff-opt[data-val="${correctDiff}"]`);
                        if (opt && !opt.disabled) {
                            this._queue = [{ el: opt, action: () => opt.click() }];
                        }
                    }
                }
            } else {
                // ── 兩家店模式 ────────────────────────────────
                if (phase === 'select') {
                    const card = document.getElementById(`card-${correctSide}`);
                    if (card && !card.classList.contains('selected-correct')) {
                        this._queue = [{ el: card, action: () => card.click() }];
                    }
                } else if (phase === 'diff') {
                    const correctDiff = curr.diff;
                    if (diff === 'normal') {
                        const opt = document.querySelector(`.b4-diff-opt[data-val="${correctDiff}"]`);
                        if (opt && !opt.disabled) {
                            this._queue = [{ el: opt, action: () => opt.click() }];
                        }
                    } else {
                        // hard：逐位數 + 確認
                        const steps = [];
                        const digits = String(correctDiff).split('');
                        for (const d of digits) {
                            const btn = document.querySelector(`[data-num="${d}"]`);
                            if (btn) steps.push({ el: btn, action: () => btn.click() });
                        }
                        const okBtn = document.getElementById('btn-ok');
                        if (okBtn) steps.push({ el: okBtn, action: () => okBtn.click() });
                        this._queue = steps;
                    }
                }
            }

            if (this._queue.length > 0) this._highlight(this._queue[0].el);
        },

        _executeStep() {
            if (!this._enabled || this._queue.length === 0) return;
            const step = this._queue.shift();
            this._clearHighlight();
            if (step?.action) step.action();
            // 高亮下一步
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
