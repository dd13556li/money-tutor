// =============================================================
// FILE: js/b2_allowance_diary.js — B2 零用錢日記
// =============================================================
'use strict';

// ── 日記範本資料庫 ────────────────────────────────────────────
const B2_TEMPLATES = {
    easy: [
        { startAmount: 100, events: [
            { type: 'income',  name: '媽媽給零用錢', amount: 50,  icon: '💰' },
            { type: 'expense', name: '買飲料',       amount: 30,  icon: '🧋' },
        ]},  // 答案：120
        { startAmount: 50, events: [
            { type: 'income',  name: '幫忙洗碗',     amount: 20,  icon: '🍽️' },
            { type: 'expense', name: '買糖果',       amount: 15,  icon: '🍬' },
        ]},  // 答案：55
        { startAmount: 200, events: [
            { type: 'expense', name: '買文具',       amount: 80,  icon: '✏️' },
            { type: 'income',  name: '爸爸獎勵',     amount: 50,  icon: '🌟' },
        ]},  // 答案：170
        { startAmount: 80, events: [
            { type: 'income',  name: '過年紅包',     amount: 100, icon: '🧧' },
            { type: 'expense', name: '買玩具',       amount: 120, icon: '🎮' },
        ]},  // 答案：60
        { startAmount: 150, events: [
            { type: 'expense', name: '買早餐',       amount: 40,  icon: '🥐' },
            { type: 'income',  name: '幫忙買菜',     amount: 20,  icon: '🛒' },
        ]},  // 答案：130
        { startAmount: 60, events: [
            { type: 'income',  name: '阿嬤零用錢',   amount: 50,  icon: '💝' },
            { type: 'expense', name: '買貼紙',       amount: 25,  icon: '🌸' },
        ]},  // 答案：85
        { startAmount: 300, events: [
            { type: 'expense', name: '買書',         amount: 150, icon: '📚' },
            { type: 'expense', name: '買點心',       amount: 30,  icon: '🍪' },
        ]},  // 答案：120
        { startAmount: 120, events: [
            { type: 'income',  name: '幫忙打掃',     amount: 30,  icon: '🧹' },
            { type: 'expense', name: '買冰淇淋',     amount: 45,  icon: '🍦' },
        ]},  // 答案：105
        { startAmount: 70, events: [
            { type: 'income',  name: '阿姨送禮',     amount: 30,  icon: '🎁' },
            { type: 'expense', name: '買糖果',       amount: 20,  icon: '🍬' },
        ]},  // 答案：80
        { startAmount: 90, events: [
            { type: 'expense', name: '買零食',       amount: 25,  icon: '🍿' },
            { type: 'income',  name: '爸爸給',       amount: 35,  icon: '👨' },
        ]},  // 答案：100
        { startAmount: 250, events: [
            { type: 'expense', name: '買漫畫書',     amount: 60,  icon: '📔' },
            { type: 'income',  name: '幫忙整理',     amount: 40,  icon: '🗂️' },
        ]},  // 答案：230
        { startAmount: 35, events: [
            { type: 'income',  name: '媽媽零用錢',   amount: 80,  icon: '💰' },
            { type: 'expense', name: '買飲料',       amount: 45,  icon: '🧃' },
        ]},  // 答案：70
    ],
    normal: [
        { startAmount: 200, events: [
            { type: 'income',  name: '爸爸給零用錢', amount: 100, icon: '💰' },
            { type: 'expense', name: '買文具',       amount: 45,  icon: '✏️' },
            { type: 'expense', name: '買零食',       amount: 35,  icon: '🍿' },
            { type: 'income',  name: '幫忙家事',     amount: 20,  icon: '🧹' },
        ]},  // 答案：240
        { startAmount: 150, events: [
            { type: 'income',  name: '生日紅包',     amount: 200, icon: '🧧' },
            { type: 'expense', name: '買玩具',       amount: 120, icon: '🎮' },
            { type: 'expense', name: '看電影',       amount: 80,  icon: '🎬' },
            { type: 'expense', name: '買飲料',       amount: 35,  icon: '🧋' },
        ]},  // 答案：115
        { startAmount: 300, events: [
            { type: 'expense', name: '買運動鞋',     amount: 180, icon: '👟' },
            { type: 'income',  name: '幫鄰居送報',   amount: 50,  icon: '📰' },
            { type: 'expense', name: '買午餐',       amount: 60,  icon: '🍱' },
            { type: 'income',  name: '媽媽零用錢',   amount: 100, icon: '💝' },
        ]},  // 答案：210
        { startAmount: 500, events: [
            { type: 'expense', name: '買書包',       amount: 350, icon: '🎒' },
            { type: 'income',  name: '爺爺紅包',     amount: 100, icon: '🧧' },
            { type: 'expense', name: '買文具',       amount: 75,  icon: '✏️' },
            { type: 'income',  name: '節省獎勵',     amount: 50,  icon: '🌟' },
        ]},  // 答案：225
        { startAmount: 100, events: [
            { type: 'income',  name: '媽媽零用錢',   amount: 150, icon: '💰' },
            { type: 'expense', name: '買零食',       amount: 45,  icon: '🍬' },
            { type: 'income',  name: '幫忙澆花',     amount: 20,  icon: '🌱' },
            { type: 'expense', name: '買飲料',       amount: 30,  icon: '🧋' },
        ]},  // 答案：195
        { startAmount: 250, events: [
            { type: 'expense', name: '買故事書',     amount: 90,  icon: '📖' },
            { type: 'expense', name: '買彩色筆',     amount: 65,  icon: '🖍️' },
            { type: 'income',  name: '幫忙洗車',     amount: 80,  icon: '🚗' },
            { type: 'expense', name: '買冰淇淋',     amount: 40,  icon: '🍦' },
        ]},  // 答案：135
        { startAmount: 400, events: [
            { type: 'income',  name: '爸媽雙倍獎勵', amount: 200, icon: '🎉' },
            { type: 'expense', name: '買玩具組',     amount: 280, icon: '🧩' },
            { type: 'expense', name: '買點心',       amount: 55,  icon: '🍪' },
            { type: 'income',  name: '幫忙掃地',     amount: 30,  icon: '🧹' },
        ]},  // 答案：295
        { startAmount: 180, events: [
            { type: 'income',  name: '老師獎勵',     amount: 50,  icon: '📝' },
            { type: 'expense', name: '買午餐',       amount: 65,  icon: '🍜' },
            { type: 'income',  name: '姐姐給',       amount: 30,  icon: '💕' },
            { type: 'expense', name: '坐公車',       amount: 20,  icon: '🚌' },
        ]},  // 答案：175
        { startAmount: 350, events: [
            { type: 'expense', name: '買水彩組',     amount: 90,  icon: '🎨' },
            { type: 'income',  name: '幫忙鄰居',     amount: 50,  icon: '🏡' },
            { type: 'expense', name: '買飲料',       amount: 30,  icon: '🧃' },
            { type: 'income',  name: '媽媽獎勵',     amount: 100, icon: '💝' },
        ]},  // 答案：380
        { startAmount: 120, events: [
            { type: 'income',  name: '生日禮金',     amount: 150, icon: '🎂' },
            { type: 'expense', name: '買玩具',       amount: 95,  icon: '🎲' },
            { type: 'income',  name: '幫忙家事',     amount: 20,  icon: '🧹' },
            { type: 'expense', name: '看電影',       amount: 70,  icon: '🎬' },
        ]},  // 答案：125
        { startAmount: 450, events: [
            { type: 'expense', name: '買書包',       amount: 220, icon: '🎒' },
            { type: 'income',  name: '爸媽給零用錢', amount: 200, icon: '💰' },
            { type: 'expense', name: '買零食',       amount: 55,  icon: '🍬' },
            { type: 'income',  name: '回收獎勵',     amount: 30,  icon: '♻️' },
        ]},  // 答案：405
        { startAmount: 250, events: [
            { type: 'income',  name: '暑期工讀',     amount: 300, icon: '💼' },
            { type: 'expense', name: '買球鞋',       amount: 180, icon: '👟' },
            { type: 'expense', name: '買書',         amount: 75,  icon: '📚' },
            { type: 'income',  name: '存款利息',     amount: 20,  icon: '🏦' },
        ]},  // 答案：315
    ],
    hard: [
        { startAmount: 500, events: [
            { type: 'income',  name: '媽媽零用錢',   amount: 300, icon: '💰' },
            { type: 'expense', name: '買運動服',     amount: 280, icon: '👕' },
            { type: 'income',  name: '幫忙搬家具',   amount: 100, icon: '🛋️' },
            { type: 'expense', name: '買書',         amount: 145, icon: '📚' },
            { type: 'expense', name: '看表演',       amount: 200, icon: '🎭' },
            { type: 'income',  name: '過年紅包',     amount: 500, icon: '🧧' },
        ]},  // 答案：775
        { startAmount: 800, events: [
            { type: 'expense', name: '買腳踏車配件', amount: 350, icon: '🚴' },
            { type: 'income',  name: '比賽獎金',     amount: 200, icon: '🏆' },
            { type: 'expense', name: '買運動鞋',     amount: 480, icon: '👟' },
            { type: 'income',  name: '爺爺奶奶紅包', amount: 600, icon: '🧧' },
            { type: 'expense', name: '買生日禮物',   amount: 250, icon: '🎁' },
            { type: 'expense', name: '吃大餐',       amount: 185, icon: '🍽️' },
        ]},  // 答案：335
        { startAmount: 1000, events: [
            { type: 'income',  name: '暑期打工',     amount: 500, icon: '💼' },
            { type: 'expense', name: '買智慧手錶',   amount: 890, icon: '⌚' },
            { type: 'income',  name: '幫忙補習',     amount: 300, icon: '📖' },
            { type: 'expense', name: '買球鞋',       amount: 395, icon: '👟' },
            { type: 'income',  name: '獎學金',       amount: 200, icon: '🎓' },
            { type: 'expense', name: '買文具組',     amount: 120, icon: '✏️' },
        ]},  // 答案：595
        { startAmount: 300, events: [
            { type: 'income',  name: '爸爸月零用錢', amount: 600, icon: '💰' },
            { type: 'expense', name: '買科學玩具',   amount: 450, icon: '🔬' },
            { type: 'expense', name: '補習費',       amount: 200, icon: '📝' },
            { type: 'income',  name: '鄰居除草費',   amount: 150, icon: '🌿' },
            { type: 'expense', name: '買零食飲料',   amount: 85,  icon: '🍿' },
            { type: 'income',  name: '回收獎勵',     amount: 40,  icon: '♻️' },
        ]},  // 答案：355
        { startAmount: 600, events: [
            { type: 'expense', name: '買樂器',       amount: 380, icon: '🎸' },
            { type: 'income',  name: '表演收入',     amount: 250, icon: '🎤' },
            { type: 'expense', name: '買樂譜',       amount: 95,  icon: '🎵' },
            { type: 'income',  name: '爸媽獎勵',     amount: 300, icon: '🌟' },
            { type: 'expense', name: '買書',         amount: 180, icon: '📚' },
            { type: 'expense', name: '吃冰淇淋',     amount: 60,  icon: '🍦' },
        ]},  // 答案：435
        { startAmount: 750, events: [
            { type: 'income',  name: '春節紅包',     amount: 800, icon: '🧧' },
            { type: 'expense', name: '買遊戲',       amount: 560, icon: '🎮' },
            { type: 'income',  name: '幫忙照顧寵物', amount: 120, icon: '🐶' },
            { type: 'expense', name: '買零食',       amount: 75,  icon: '🍬' },
            { type: 'income',  name: '幫忙送貨',     amount: 200, icon: '📦' },
            { type: 'expense', name: '看電影',       amount: 160, icon: '🎬' },
        ]},  // 答案：1075
        { startAmount: 400, events: [
            { type: 'income',  name: '幫忙家教',     amount: 350, icon: '📚' },
            { type: 'expense', name: '買腳踏車',     amount: 680, icon: '🚲' },
            { type: 'income',  name: '媽媽補貼',     amount: 500, icon: '💝' },
            { type: 'expense', name: '電影加餐廳',   amount: 220, icon: '🍕' },
            { type: 'income',  name: '叔叔生日紅包', amount: 300, icon: '🎂' },
            { type: 'expense', name: '買衣服',       amount: 180, icon: '👗' },
        ]},  // 答案：470
        { startAmount: 1200, events: [
            { type: 'expense', name: '買平板電腦',   amount: 880, icon: '💻' },
            { type: 'income',  name: '過年紅包',     amount: 600, icon: '🧧' },
            { type: 'expense', name: '買書包',       amount: 350, icon: '🎒' },
            { type: 'income',  name: '幫忙翻譯',     amount: 200, icon: '🌍' },
            { type: 'expense', name: '買文具',       amount: 95,  icon: '✏️' },
            { type: 'income',  name: '節省獎金',     amount: 100, icon: '🌟' },
        ]},  // 答案：775
        { startAmount: 250, events: [
            { type: 'income',  name: '阿公零用錢',   amount: 400, icon: '👴' },
            { type: 'expense', name: '買球鞋',       amount: 320, icon: '👟' },
            { type: 'income',  name: '幫忙洗車',     amount: 80,  icon: '🚗' },
            { type: 'expense', name: '買手機殼',     amount: 45,  icon: '📱' },
            { type: 'income',  name: '賣舊玩具',     amount: 120, icon: '🧸' },
            { type: 'expense', name: '買飲料',       amount: 35,  icon: '🧃' },
        ]},  // 答案：450
        { startAmount: 900, events: [
            { type: 'expense', name: '暑期夏令營',   amount: 550, icon: '⛺' },
            { type: 'income',  name: '比賽獎金',     amount: 300, icon: '🏅' },
            { type: 'expense', name: '買新手機',     amount: 720, icon: '📱' },
            { type: 'income',  name: '爸爸獎勵',     amount: 400, icon: '👨' },
            { type: 'expense', name: '買衣服',       amount: 180, icon: '👗' },
            { type: 'income',  name: '幫忙家務',     amount: 50,  icon: '🏠' },
        ]},  // 答案：200
        { startAmount: 650, events: [
            { type: 'income',  name: '生日紅包',     amount: 500, icon: '🎂' },
            { type: 'expense', name: '買電動遊戲機', amount: 980, icon: '🎮' },
            { type: 'income',  name: '賣舊書',       amount: 120, icon: '📚' },
            { type: 'expense', name: '買零食',       amount: 65,  icon: '🍿' },
            { type: 'income',  name: '幫忙鄰居',     amount: 80,  icon: '🏡' },
            { type: 'expense', name: '買手環',       amount: 95,  icon: '⌚' },
        ]},  // 答案：210
        { startAmount: 2000, events: [
            { type: 'expense', name: '暑期旅遊費',   amount: 1200, icon: '✈️' },
            { type: 'income',  name: '打工收入',     amount: 800,  icon: '💼' },
            { type: 'expense', name: '買相機',       amount: 650,  icon: '📸' },
            { type: 'income',  name: '叔叔紅包',     amount: 400,  icon: '🧧' },
            { type: 'expense', name: '買衣服鞋子',   amount: 380,  icon: '👗' },
            { type: 'income',  name: '退費',         amount: 120,  icon: '💵' },
        ]},  // 答案：1090
    ],
};

// ── 日記主題（B5 partyTheme pattern）──────────────────────────
const B2_THEMES = {
    school: {
        name: '學校週記', icon: '🏫',
        templates: {
            easy: [
                { startAmount: 80,  events: [{ type:'income', name:'媽媽給零用錢', amount:50,  icon:'💰'}, { type:'expense', name:'買文具',  amount:30, icon:'✏️'}]},  // 100
                { startAmount: 60,  events: [{ type:'expense',name:'買便當',       amount:40,  icon:'🍱'}, { type:'income',  name:'幫忙打掃', amount:20, icon:'🧹'}]},  // 40
                { startAmount: 120, events: [{ type:'income', name:'作業獎勵',     amount:30,  icon:'🌟'}, { type:'expense', name:'買橡皮擦', amount:15, icon:'✏️'}]},  // 135
                { startAmount: 50,  events: [{ type:'income', name:'爸爸零用錢',   amount:100, icon:'💰'}, { type:'expense', name:'買書包配件', amount:45, icon:'🎒'}]},  // 105
                { startAmount: 200, events: [{ type:'expense',name:'買課外讀物',   amount:80,  icon:'📚'}, { type:'income',  name:'節省獎金', amount:30, icon:'🏅'}]},  // 150
                { startAmount: 90,  events: [{ type:'income', name:'阿嬤零用錢',   amount:40,  icon:'💝'}, { type:'expense', name:'買貼紙',  amount:20, icon:'🌸'}]},  // 110
                { startAmount: 150, events: [{ type:'expense',name:'買彩色筆',     amount:60,  icon:'🎨'}, { type:'income',  name:'幫忙整理書桌', amount:25, icon:'🗂️'}]},  // 115
                { startAmount: 70,  events: [{ type:'income', name:'優良獎勵',     amount:50,  icon:'🏆'}, { type:'expense', name:'買點心',  amount:35, icon:'🍪'}]},  // 85
            ],
            normal: [
                { startAmount: 200, events: [{ type:'income', name:'爸爸零用錢', amount:100, icon:'💰'}, { type:'expense', name:'買文具',   amount:45, icon:'✏️'}, { type:'expense', name:'買便當', amount:55, icon:'🍱'}, { type:'income', name:'幫忙家事', amount:20, icon:'🧹'}]},  // 220
                { startAmount: 150, events: [{ type:'income', name:'期末獎勵',   amount:200, icon:'🏆'}, { type:'expense', name:'買參考書', amount:120, icon:'📚'}, { type:'expense', name:'買文具', amount:60, icon:'✏️'}, { type:'expense', name:'買飲料', amount:30, icon:'🧋'}]},  // 140
                { startAmount: 300, events: [{ type:'expense',name:'買書包',     amount:180, icon:'🎒'}, { type:'income',  name:'幫鄰居抄筆記', amount:50, icon:'📝'}, { type:'expense', name:'買早餐', amount:40, icon:'🥐'}, { type:'income', name:'媽媽獎勵', amount:80, icon:'💝'}]},  // 210
                { startAmount: 500, events: [{ type:'expense',name:'補習費',     amount:350, icon:'🏫'}, { type:'income',  name:'成績進步獎', amount:100, icon:'🌟'}, { type:'expense', name:'買作業本', amount:55, icon:'📓'}, { type:'income', name:'節省零用錢', amount:50, icon:'💵'}]},  // 245
                { startAmount: 100, events: [{ type:'income', name:'幫同學收作業', amount:30, icon:'📋'}, { type:'expense', name:'買測驗卷', amount:25, icon:'📄'}, { type:'income', name:'老師獎勵券換現', amount:50, icon:'🎟️'}, { type:'expense', name:'買零食', amount:40, icon:'🍬'}]},  // 115
                { startAmount: 250, events: [{ type:'expense',name:'買計算機',   amount:100, icon:'🔢'}, { type:'income',  name:'媽媽零用錢', amount:150, icon:'💰'}, { type:'expense', name:'買橡皮擦文具', amount:35, icon:'✏️'}, { type:'expense', name:'喝飲料', amount:45, icon:'🥤'}]},  // 220
            ],
            hard: [
                { startAmount: 600, events: [{ type:'expense',name:'買教科書',   amount:400, icon:'📘'}, { type:'income',  name:'打工薪資', amount:300, icon:'💼'}, { type:'expense', name:'買制服', amount:280, icon:'👔'}, { type:'income', name:'考試獎勵', amount:150, icon:'🏅'}, { type:'expense', name:'交通費', amount:120, icon:'🚌'}]},  // 250
                { startAmount: 800, events: [{ type:'income', name:'課輔獎助學金', amount:500, icon:'🎓'}, { type:'expense', name:'買學習平板', amount:650, icon:'💻'}, { type:'income', name:'作業優良獎', amount:100, icon:'🌟'}, { type:'expense', name:'買文具組', amount:95, icon:'✏️'}, { type:'income', name:'節省零用錢', amount:80, icon:'💵'}]},  // 735
                { startAmount: 1000, events: [{ type:'expense',name:'語言補習費', amount:700, icon:'🗣️'}, { type:'income',  name:'打掃工讀', amount:300, icon:'🧹'}, { type:'expense', name:'買參考書', amount:200, icon:'📚'}, { type:'income', name:'媽媽獎勵', amount:250, icon:'💝'}, { type:'expense', name:'買文具', amount:85, icon:'✏️'}]},  // 565
                { startAmount: 400, events: [{ type:'income', name:'英文競賽獎', amount:300, icon:'🏆'}, { type:'expense', name:'補習費',   amount:350, icon:'🏫'}, { type:'income', name:'爸爸補貼', amount:200, icon:'👨'}, { type:'expense', name:'買作業組', amount:75, icon:'📓'}, { type:'income', name:'節約獎勵', amount:50, icon:'💰'}]},  // 525
            ],
        },
    },
    holiday: {
        name: '假期日記', icon: '🎉',
        templates: {
            easy: [
                { startAmount: 100, events: [{ type:'income', name:'過年紅包',   amount:200, icon:'🧧'}, { type:'expense', name:'買玩具',  amount:150, icon:'🎮'}]},  // 150
                { startAmount: 80,  events: [{ type:'expense',name:'看電影',     amount:60,  icon:'🎬'}, { type:'income',  name:'壓歲錢', amount:50, icon:'🎊'}]},  // 70
                { startAmount: 200, events: [{ type:'income', name:'阿姨紅包',   amount:100, icon:'💝'}, { type:'expense', name:'買糖果',  amount:45, icon:'🍬'}]},  // 255
                { startAmount: 50,  events: [{ type:'income', name:'中秋紅包',   amount:100, icon:'🎑'}, { type:'expense', name:'買月餅',  amount:60, icon:'🥮'}]},  // 90
                { startAmount: 150, events: [{ type:'expense',name:'遊樂園票',   amount:100, icon:'🎡'}, { type:'income',  name:'幫忙家事', amount:40, icon:'🧹'}]},  // 90
                { startAmount: 120, events: [{ type:'income', name:'聖誕紅包',   amount:80,  icon:'🎄'}, { type:'expense', name:'買禮物',  amount:65, icon:'🎁'}]},  // 135
                { startAmount: 80,  events: [{ type:'expense',name:'買冰淇淋',   amount:35,  icon:'🍦'}, { type:'income',  name:'爺爺獎勵', amount:50, icon:'👴'}]},  // 95
                { startAmount: 200, events: [{ type:'expense',name:'買書',       amount:90,  icon:'📚'}, { type:'income',  name:'叔叔紅包', amount:120, icon:'🧧'}]},  // 230
            ],
            normal: [
                { startAmount: 200, events: [{ type:'income', name:'過年紅包',   amount:500, icon:'🧧'}, { type:'expense', name:'買玩具', amount:220, icon:'🎮'}, { type:'expense', name:'看電影', amount:80, icon:'🎬'}, { type:'expense', name:'買零食', amount:45, icon:'🍿'}]},  // 355
                { startAmount: 150, events: [{ type:'income', name:'生日禮金',   amount:300, icon:'🎂'}, { type:'expense', name:'買遊樂園票', amount:150, icon:'🎡'}, { type:'expense', name:'買紀念品', amount:85, icon:'🎠'}, { type:'expense', name:'買飲料', amount:40, icon:'🧋'}]},  // 175
                { startAmount: 300, events: [{ type:'expense',name:'聖誕購物',   amount:180, icon:'🎄'}, { type:'income',  name:'爺爺紅包', amount:200, icon:'👴'}, { type:'expense', name:'買裝飾', amount:65, icon:'✨'}, { type:'income', name:'幫忙家事', amount:50, icon:'🧹'}]},  // 305
                { startAmount: 500, events: [{ type:'expense',name:'暑期夏令營', amount:350, icon:'⛺'}, { type:'income',  name:'壓歲錢', amount:300, icon:'🎊'}, { type:'expense', name:'買游泳用品', amount:120, icon:'🏊'}, { type:'income', name:'叔叔補貼', amount:100, icon:'👨'}]},  // 430
                { startAmount: 100, events: [{ type:'income', name:'中秋紅包',   amount:200, icon:'🎑'}, { type:'expense', name:'買月餅盒', amount:90, icon:'🥮'}, { type:'income', name:'幫忙採購', amount:30, icon:'🛒'}, { type:'expense', name:'買燈籠', amount:50, icon:'🏮'}]},  // 190
                { startAmount: 250, events: [{ type:'expense',name:'跨年煙火行', amount:120, icon:'🎆'}, { type:'income',  name:'阿姨紅包', amount:150, icon:'💝'}, { type:'expense', name:'買飲料零食', amount:65, icon:'🥤'}, { type:'expense', name:'買帽子', amount:45, icon:'🎩'}]},  // 170
            ],
            hard: [
                { startAmount: 600,  events: [{ type:'income', name:'過年紅包合計', amount:800, icon:'🧧'}, { type:'expense', name:'買電動', amount:680, icon:'🎮'}, { type:'expense', name:'春節旅遊', amount:350, icon:'🚌'}, { type:'income', name:'爺爺另外給', amount:200, icon:'👴'}, { type:'expense', name:'買紀念品', amount:120, icon:'🎁'}]},  // 450
                { startAmount: 800,  events: [{ type:'expense',name:'暑期日本旅遊', amount:1200, icon:'✈️'}, { type:'income',  name:'打工收入', amount:600, icon:'💼'}, { type:'expense', name:'買伴手禮', amount:280, icon:'🎀'}, { type:'income', name:'叔叔補助', amount:400, icon:'👨'}, { type:'expense', name:'逛夜市', amount:150, icon:'🌙'}]},  // 170
                { startAmount: 1000, events: [{ type:'income', name:'生日禮金合計', amount:700, icon:'🎂'}, { type:'expense', name:'買電動遊戲機', amount:980, icon:'🎮'}, { type:'income', name:'爸媽補貼', amount:400, icon:'💰'}, { type:'expense', name:'買生日蛋糕', amount:200, icon:'🎂'}, { type:'expense', name:'買衣服', amount:150, icon:'👗'}]},  // 770
                { startAmount: 500,  events: [{ type:'expense',name:'聖誕購物節', amount:450, icon:'🎄'}, { type:'income',  name:'聖誕紅包', amount:300, icon:'🎅'}, { type:'expense', name:'買裝飾品', amount:180, icon:'✨'}, { type:'income', name:'義賣義工', amount:120, icon:'💚'}, { type:'expense', name:'買聖誕禮', amount:95, icon:'🎁'}]},  // 195
            ],
        },
    },
    family: {
        name: '家庭日記', icon: '👨‍👩‍👧',
        templates: {
            easy: [
                { startAmount: 100, events: [{ type:'income', name:'媽媽零用錢', amount:50,  icon:'💰'}, { type:'expense', name:'買早餐',   amount:30, icon:'🥐'}]},  // 120
                { startAmount: 60,  events: [{ type:'income', name:'幫忙洗碗',   amount:20,  icon:'🍽️'}, { type:'expense', name:'買點心',   amount:15, icon:'🍪'}]},  // 65
                { startAmount: 150, events: [{ type:'expense',name:'家庭採購幫手', amount:50, icon:'🛒'}, { type:'income',  name:'爸爸獎勵', amount:30, icon:'👨'}]},  // 130
                { startAmount: 80,  events: [{ type:'income', name:'幫忙打掃',   amount:30,  icon:'🧹'}, { type:'expense', name:'買衛生紙', amount:20, icon:'🧻'}]},  // 90
                { startAmount: 200, events: [{ type:'expense',name:'買洗碗精',   amount:40,  icon:'🧴'}, { type:'income',  name:'媽媽感謝', amount:50, icon:'💝'}]},  // 210
                { startAmount: 70,  events: [{ type:'income', name:'幫忙倒垃圾', amount:15,  icon:'🗑️'}, { type:'expense', name:'買水果',   amount:35, icon:'🍎'}]},  // 50
                { startAmount: 120, events: [{ type:'income', name:'幫做家常菜', amount:40,  icon:'🍳'}, { type:'expense', name:'買食材',   amount:55, icon:'🥦'}]},  // 105
                { startAmount: 90,  events: [{ type:'expense',name:'買家用品',   amount:25,  icon:'🏠'}, { type:'income',  name:'阿嬤零用錢', amount:60, icon:'👵'}]},  // 125
            ],
            normal: [
                { startAmount: 200, events: [{ type:'income', name:'爸爸零用錢', amount:100, icon:'💰'}, { type:'expense', name:'買菜',     amount:80, icon:'🥦'}, { type:'income', name:'幫忙買菜', amount:20, icon:'🛒'}, { type:'expense', name:'買調味料', amount:35, icon:'🧂'}]},  // 205
                { startAmount: 300, events: [{ type:'expense',name:'家庭聚餐費', amount:200, icon:'🍜'}, { type:'income',  name:'奶奶紅包', amount:150, icon:'💝'}, { type:'expense', name:'買甜點', amount:60, icon:'🎂'}, { type:'expense', name:'買飲料', amount:40, icon:'🧃'}]},  // 150
                { startAmount: 150, events: [{ type:'income', name:'幫忙家務',   amount:80,  icon:'🧹'}, { type:'expense', name:'買清潔劑', amount:45, icon:'🧴'}, { type:'income', name:'媽媽感謝金', amount:50, icon:'💰'}, { type:'expense', name:'買零食', amount:30, icon:'🍬'}]},  // 205
                { startAmount: 400, events: [{ type:'expense',name:'買廚房用品', amount:250, icon:'🍳'}, { type:'income',  name:'叔叔給的', amount:200, icon:'👨'}, { type:'expense', name:'買食材', amount:90, icon:'🥕'}, { type:'income', name:'幫忙採購獎', amount:60, icon:'🌟'}]},  // 320
                { startAmount: 100, events: [{ type:'income', name:'媽媽零用錢', amount:150, icon:'💰'}, { type:'expense', name:'買菜',     amount:60, icon:'🥬'}, { type:'expense', name:'買水果', amount:45, icon:'🍊'}, { type:'income', name:'爸爸嘉獎', amount:30, icon:'👨'}]},  // 175
                { startAmount: 250, events: [{ type:'expense',name:'家庭旅遊費', amount:180, icon:'🚌'}, { type:'income',  name:'阿公零用', amount:150, icon:'👴'}, { type:'expense', name:'買零食', amount:40, icon:'🍿'}, { type:'income', name:'幫忙整理', amount:25, icon:'🗂️'}]},  // 205
            ],
            hard: [
                { startAmount: 500,  events: [{ type:'expense',name:'買冰箱（家電）', amount:600, icon:'🧊'}, { type:'income',  name:'爸爸補貼', amount:400, icon:'👨'}, { type:'expense', name:'電費', amount:150, icon:'⚡'}, { type:'income', name:'媽媽補貼', amount:300, icon:'💰'}, { type:'expense', name:'買食材', amount:120, icon:'🥦'}]},  // 330
                { startAmount: 800,  events: [{ type:'income', name:'年終家庭獎金', amount:500, icon:'💵'}, { type:'expense', name:'買家具',   amount:650, icon:'🛋️'}, { type:'income', name:'舊物變賣', amount:200, icon:'♻️'}, { type:'expense', name:'買裝飾品', amount:180, icon:'🖼️'}, { type:'expense', name:'外送費', amount:90, icon:'🛵'}]},  // 580
                { startAmount: 1000, events: [{ type:'expense',name:'全家旅遊費', amount:800,  icon:'✈️'}, { type:'income',  name:'幫忙打工', amount:350, icon:'💼'}, { type:'expense', name:'買旅行用品', amount:200, icon:'🧳'}, { type:'income', name:'爺爺補貼', amount:300, icon:'👴'}, { type:'expense', name:'景點紀念品', amount:150, icon:'🗺️'}]},  // 500
                { startAmount: 400,  events: [{ type:'income', name:'家庭分工獎勵', amount:600, icon:'🏡'}, { type:'expense', name:'買洗衣機', amount:700, icon:'🌀'}, { type:'income', name:'二手拍賣', amount:250, icon:'♻️'}, { type:'expense', name:'買清潔用品', amount:80, icon:'🧼'}, { type:'income', name:'爸爸零用', amount:100, icon:'👨'}]},  // 570
            ],
        },
    },
};

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
            log(cat, ...a)  { if (this.FLAGS.all || this.FLAGS[cat]) console.log(`[B2-${cat}]`, ...a); },
            warn(cat, ...a) { if (this.FLAGS.all || this.FLAGS[cat]) console.warn(`[B2-${cat}]`, ...a); },
            error(...a)     { console.error('[B2-ERROR]', ...a); },
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
            settings: { difficulty: null, questionCount: null, retryMode: null, clickMode: 'off', diaryTheme: null, customItemsEnabled: false },
            quiz: {
                currentQuestion: 0,
                totalQuestions: 10,
                correctCount: 0,
                errorCount: 0,
                streak: 0,
                questions: [],
                answeredHistory: [],
                startTime: null,
                currentInput: '',
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
            if (document.getElementById('b2-global-animations')) return;
            const style = document.createElement('style');
            style.id = 'b2-global-animations';
            style.textContent = `
                @keyframes b2RowIn {
                    from { opacity: 0; transform: translateX(-12px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @keyframes b2CoinIn {
                    0%   { opacity: 0; transform: translateY(-18px) scale(0.5); }
                    65%  { transform: translateY(4px) scale(1.1); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes b2P2FadeUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `;
            document.head.appendChild(style);
        },

        resetGameState() {
            const q = this.state.quiz;
            q.currentQuestion  = 0;
            q.totalQuestions   = this.state.settings.questionCount;
            q.correctCount     = 0;
            q.streak           = 0;
            q.questions        = [];
            q.answeredHistory  = [];
            q.startTime        = null;
            q.currentInput     = '';
            this.state.isEndingGame = false;
            this.state.isProcessing  = false;
            Game.Debug.log('init', '🔄 [B2] 遊戲狀態已重置');
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
                        <h1>單元B2：零用錢日記</h1>
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
                        <div class="b-setting-group" id="assist-click-group" style="display:none;">
                            <label class="b-setting-label">🤖 輔助點擊：</label>
                            <div class="b-btn-group" id="assist-group">
                                <button class="b-sel-btn${this.state.settings.clickMode === 'on' ? ' active' : ''}" data-val="on">✓ 啟用</button>
                                <button class="b-sel-btn${this.state.settings.clickMode !== 'on' ? ' active' : ''}" data-val="off">✗ 停用</button>
                            </div>
                            <div style="margin-top:4px;font-size:12px;color:#6b7280;">
                                啟用後，只要偵測到點擊便會自動執行下一個步驟
                            </div>
                        </div>
                        <div class="b-setting-group">
                            <label class="b-setting-label">題數：</label>
                            <div class="b-btn-group" id="count-group">
                                <button class="b-sel-btn" data-val="1">1題</button>
                                <button class="b-sel-btn" data-val="5">5題</button>
                                <button class="b-sel-btn" data-val="10">10題</button>
                                <button class="b-sel-btn" data-val="15">15題</button>
                                <button class="b-sel-btn" data-val="20">20題</button>
                            </div>
                        </div>
                        <div class="b-setting-group" id="mode-settings-group">
                            <label class="b-setting-label">🔄 作答模式：</label>
                            <div class="b-btn-group" id="mode-group">
                                <button class="b-sel-btn" data-val="retry">反複作答</button>
                                <button class="b-sel-btn" data-val="proceed">單次作答</button>
                            </div>
                            <div style="margin-top:4px;font-size:12px;color:#6b7280;">
                                反複作答：答錯可以再試 ｜ 單次作答：顯示答案後繼續
                            </div>
                        </div>
                        <div class="b-setting-group">
                            <label class="b-setting-label">📓 日記主題：</label>
                            <div class="b-btn-group" id="theme-group">
                                <button class="b-sel-btn" data-theme="school">🏫 學校</button>
                                <button class="b-sel-btn" data-theme="holiday">🎉 假期</button>
                                <button class="b-sel-btn" data-theme="family">👨‍👩‍👧 家庭</button>
                                <button class="b-sel-btn" data-theme="random">隨機 🎲</button>
                            </div>
                            <div id="b2-custom-events-toggle-row" style="display:none;margin-top:8px;">
                                <label style="font-size:13px;color:#374151;font-weight:600;">🛠️ 自訂事件</label>
                                <div class="b-btn-group" id="b2-custom-events-group" style="margin-top:4px;">
                                    <button class="b-sel-btn active" data-custom="off">關閉</button>
                                    <button class="b-sel-btn" data-custom="on">開啟</button>
                                </div>
                                <div style="margin-top:4px;font-size:12px;color:#6b7280;">開啟後，可新增或刪除收支事件，系統將依自訂事件計算答案</div>
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
                                ✨ 看每週的收入和支出，計算最後剩下多少錢<br>
                                簡單：選擇答案；普通/困難：數字輸入
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
            easy:   '簡單：從選項中選出正確的餘額，每題只有一項收入或支出',
            normal: '普通：用數字鍵盤輸入餘額，題目包含收入和支出',
            hard:   '困難：複雜的多項收支計算，需正確加減所有項目',
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
                    const assistGroup = document.getElementById('assist-click-group');
                    const modeGroup   = document.getElementById('mode-settings-group');
                    const customRow = document.getElementById('b2-custom-events-toggle-row');
                    if (btn.dataset.val === 'easy') {
                        if (assistGroup) assistGroup.style.display = '';
                        if (modeGroup && this.state.settings.clickMode === 'on') modeGroup.style.display = 'none';
                        if (customRow) customRow.style.display = 'none';
                        this.state.settings.customItemsEnabled = false;
                        document.querySelectorAll('#b2-custom-events-group [data-custom]').forEach(b => b.classList.toggle('active', b.dataset.custom === 'off'));
                    } else {
                        if (assistGroup) assistGroup.style.display = 'none';
                        this.state.settings.clickMode = 'off';
                        if (modeGroup) modeGroup.style.display = '';
                        if (customRow) customRow.style.display = '';
                    }
                    this._checkCanStart();
                }, {}, 'settings');
            });

            document.querySelectorAll('#count-group .b-sel-btn').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#count-group .b-sel-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.questionCount = parseInt(btn.dataset.val);
                    this._checkCanStart();
                }, {}, 'settings');
            });

            document.querySelectorAll('#mode-group .b-sel-btn').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#mode-group .b-sel-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.retryMode = btn.dataset.val;
                    this._checkCanStart();
                }, {}, 'settings');
            });

            const rewardLink = document.getElementById('settings-reward-link');
            Game.EventManager.on(rewardLink, 'click', (e) => {
                e.preventDefault();
                if (typeof RewardLauncher !== 'undefined') RewardLauncher.open();
                else window.open('../reward/index.html', 'RewardSystem', 'width=1200,height=800');
            }, {}, 'settings');

            document.querySelectorAll('#theme-group .b-sel-btn').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#theme-group .b-sel-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.diaryTheme = btn.dataset.theme;
                    this._checkCanStart();
                }, {}, 'settings');
            });

            document.querySelectorAll('#b2-custom-events-group [data-custom]').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#b2-custom-events-group [data-custom]').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.customItemsEnabled = btn.dataset.custom === 'on';
                }, {}, 'settings');
            });

            document.querySelectorAll('#assist-group .b-sel-btn').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#assist-group .b-sel-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.clickMode = btn.dataset.val;
                    const modeGroup = document.getElementById('mode-settings-group');
                    if (modeGroup) {
                        modeGroup.style.display = (this.state.settings.difficulty === 'easy' && btn.dataset.val === 'on') ? 'none' : '';
                    }
                    this._checkCanStart();
                }, {}, 'settings');
            });

            // 作業單
            Game.EventManager.on(document.getElementById('settings-worksheet-link'), 'click', (e) => {
                e.preventDefault();
                const params = new URLSearchParams({ unit: 'b2' });
                window.open('../worksheet/index.html?' + params.toString(), 'Worksheet', 'width=900,height=700');
            }, {}, 'settings');

            Game.EventManager.on(document.getElementById('start-btn'), 'click', () => this.startGame(), {}, 'settings');
        },

        _checkCanStart() {
            const btn = document.getElementById('start-btn');
            const s = this.state.settings;
            const retryOk = (s.difficulty === 'easy' && s.clickMode === 'on') || !!s.retryMode;
            if (btn) btn.disabled = !s.difficulty || !s.questionCount || !retryOk || !s.diaryTheme;
        },

        // ── 9. 遊戲開始 ───────────────────────────────────────
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
            q.questions       = this._generateQuestions(s.questionCount);
            q.currentInput    = '';

            this.state.isEndingGame = false;
            this.state.isProcessing  = false;

            this.renderQuestion();
        },

        // ── 10. 題目產生 ──────────────────────────────────────
        _generateQuestions(count) {
            const diff    = this.state.settings.difficulty;
            const theme   = this.state.settings.diaryTheme;
            let templates;
            if (theme === 'random') {
                // 隨機模式：每題從三主題各自隨機抽取
                const keys = ['school', 'holiday', 'family'];
                const merged = keys.flatMap(k => (B2_THEMES[k].templates[diff] || []).map(t => ({ ...t, _theme: k })));
                templates = merged.sort(() => Math.random() - 0.5);
            } else {
                const themeData = B2_THEMES[theme];
                const basePool  = themeData ? themeData.templates[diff] : B2_TEMPLATES[diff];
                templates = (basePool && basePool.length > 0 ? basePool : B2_TEMPLATES[diff]).slice().sort(() => Math.random() - 0.5);
            }
            const result    = [];

            for (let i = 0; i < count; i++) {
                const tmpl   = templates[i % templates.length];
                const answer = this._calcAnswer(tmpl);
                const choices = diff === 'easy' ? this._generateChoices(answer) : null;
                result.push({ ...tmpl, answer, choices });
            }
            return result;
        },

        _calcAnswer(tmpl) {
            let balance = tmpl.startAmount;
            tmpl.events.forEach(e => {
                balance += e.type === 'income' ? e.amount : -e.amount;
            });
            return balance;
        },

        _getEffectiveEvents(question) {
            const base   = question.events.filter(e => !e._deleted);
            const custom = (this.state.quiz.customEvents || []).filter(e => !e._deleted);
            return [...base, ...custom];
        },

        _getEffectiveAnswer(question) {
            let balance = question.startAmount;
            this._getEffectiveEvents(question).forEach(e => {
                balance += e.type === 'income' ? e.amount : -e.amount;
            });
            return balance;
        },

        _generateChoices(correct) {
            // Generate distractors far enough apart to be meaningfully different
            const opts = new Set([correct]);
            const deltas = [20, 30, 50, 40, 60, 25, 35, 45];
            let di = 0;
            while (opts.size < 3 && di < deltas.length * 2) {
                const delta = deltas[di % deltas.length];
                const candidate = di % 2 === 0 ? correct + delta : Math.max(0, correct - delta);
                if (candidate !== correct) opts.add(candidate);
                di++;
            }
            return Array.from(opts).sort(() => Math.random() - 0.5);
        },

        // ── 11. 題目渲染 ──────────────────────────────────────
        renderQuestion() {
            Game.TimerManager.clearAll();
            Game.EventManager.removeByCategory('gameUI');
            AssistClick.deactivate();
            this.state.isProcessing  = false;
            this.state.quiz.currentInput = '';

            const q   = this.state.quiz;
            // 重置自訂事件狀態
            q.customEvents = [];
            const currQ = q.questions[q.currentQuestion];
            if (currQ) currQ.events.forEach(e => { e._deleted = false; });

            const app = document.getElementById('app');
            app.innerHTML = this._renderQuestionHTML(q.questions[q.currentQuestion]);
            this._bindQuestionEvents(q.questions[q.currentQuestion]);

            // 語音引導
            const currentQ = this.state.quiz.questions[this.state.quiz.currentQuestion];
            const diff = this.state.settings.difficulty;

            const themeKey = this.state.settings.diaryTheme;
            const themeIntros = {
                school:  '學校週記，',
                holiday: '假日時光日記，',
                family:  '家庭生活日記，',
            };
            const themePrefix = (themeKey && themeKey !== 'random' && themeIntros[themeKey]) ? themeIntros[themeKey] : '';
            const speechMap = {
                easy:   `${themePrefix}看看日記，計算最後剩下多少錢？`,
                normal: `${themePrefix}看看每筆收入和支出，算出最後的金額。`,
                hard:   `${themePrefix}仔細看每筆記錄，輸入最後剩下多少元。`,
            };
            this.state.quiz.lastSpeechText = speechMap[diff];

            // 完整鏈式順序：起始彈窗語音 → 關閉彈窗 → 主題語音 → Easy逐項動畫 or 輔助點擊
            this._showTaskIntroModal(currentQ, () => {
                Game.TimerManager.setTimeout(() => {
                    Game.Speech.speak(speechMap[diff], () => {
                        // 主題語音結束後才啟動 Easy 動畫或輔助點擊，避免語音互相中斷
                        if (diff === 'easy') {
                            this._animateEasyEntriesSequential(currentQ);
                        } else if (this.state.settings.clickMode === 'on') {
                            Game.TimerManager.setTimeout(() => AssistClick.activate(currentQ), 300, 'ui');
                        }
                        Game.TimerManager.setTimeout(() => this._showThemeGuide(), 200, 'ui');
                    });
                }, 200, 'speech');
            });
        },

        _renderQuestionHTML(question) {
            const diff = this.state.settings.difficulty;
            const q    = this.state.quiz;
            const pct  = Math.round((q.currentQuestion / q.totalQuestions) * 100);
            const useCustom = this.state.settings.customItemsEnabled && diff !== 'easy';

            // 累計金額欄（Round 38）
            let runningAmt = question.startAmount;
            const eventsHTML = question.events.map((e, idx) => {
                runningAmt = e.type === 'income' ? runningAmt + e.amount : runningAmt - e.amount;
                const moneyIcons = this._renderMoneyIconsGrouped(e.amount);
                return `
                <div class="b2-event-row ${e.type}" style="animation-delay:${0.05 * (idx + 1)}s" id="b2-base-event-${idx}">
                    <span class="b2-type-badge ${e.type}">${e.type === 'income' ? '收入 📥' : '支出 📤'}</span>
                    <span class="b2-event-icon">${e.icon}</span>
                    <span class="b2-event-name">${e.name}</span>
                    <div class="b2-event-money-icons">${moneyIcons}</div>
                    <span class="b2-event-amount ${e.type}">${e.type === 'income' ? '+' : '-'}${e.amount} 元</span>
                    <span class="b2-running-val">${runningAmt}元</span>
                    ${useCustom ? `<button class="b2-cep-del-btn" data-base-idx="${idx}" title="刪除">✕</button>` : ''}
                </div>`;
            }).join('');
            const customPanelHTML = useCustom ? this._renderCustomEventsPanel() : '';

            return `
            <div class="b-header">
                <div class="b-header-left">
                    <span class="b-header-unit">📒 零用錢日記</span>
                </div>
                <div class="b-header-center">${{ easy: '簡單模式', normal: '普通模式', hard: '困難模式' }[diff] || ''}${ (() => { const t = B2_THEMES[this.state.settings.diaryTheme]; return t ? ` · ${t.icon}${t.name}` : ''; })() }</div>
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

                <div class="b2-diary${diff === 'hard' ? ' b2-memory-mode' : ''}" data-diff="${diff}">
                    <div class="b2-diary-header">
                        <span class="b2-diary-icon">📒</span>
                        <span class="b2-diary-title">本週零用錢記錄</span>
                        <button class="b-inline-replay" id="replay-speech-btn" title="重播語音">🔊</button>
                        ${diff === 'hard' ? `<button class="b2-reveal-btn" id="b2-reveal-btn">👁️ 查看</button>` : ''}
                        <span class="b2-hint-wrap" style="display:inline-flex;align-items:center;gap:3px;margin-left:auto;">
                            <img src="../images/index/educated_money_bag_character.png" alt="" style="width:28px;height:28px;object-fit:contain;" onerror="this.style.display='none'">
                            <button class="b2-hint-btn" id="b2-hint-btn" title="提示">💡 提示</button>
                        </span>
                    </div>
                    ${diff === 'easy' ? `<div class="b2-legend"><span class="b2-legend-in">📥 收入</span><span class="b2-legend-sep">·</span><span class="b2-legend-out">📤 支出</span></div>` : ''}
                    <div class="b2-start-row">
                        <span class="b2-start-label">💼 開始有</span>
                        <span class="b2-start-amount">${question.startAmount} 元</span>
                    </div>
                    ${eventsHTML}
                    <div id="b2-cep-custom-list"></div>
                    ${customPanelHTML}
                    <div class="b2-question-row">
                        <span class="b2-question-label">💰 現在剩下</span>
                        <span class="b2-question-blank">___ 元</span>
                    </div>
                </div>

                <div class="b2-answer-card" id="b2-answer-area">
                    <div class="b2-answer-prompt">請選擇或輸入最後剩下的金額：</div>
                    ${diff === 'easy'
                        ? this._renderChoicesHTML(question)
                        : this._renderNumpadHTML()}
                </div>
            </div>`;
        },

        _renderChoicesHTML(question) {
            const btns = question.choices.map(c => `
                <button class="b2-choice-btn" data-val="${c}">
                    ${c}
                    <span class="b2-choice-suffix">元</span>
                </button>`).join('');
            return `<div class="b2-choices">${btns}</div>`;
        },

        _renderNumpadHTML() {
            const digits = [7, 8, 9, 4, 5, 6, 1, 2, 3];
            const diff = this.state.settings.difficulty;
            return `
            <div class="b2-numpad-section">
                <div class="b2-input-display" id="b2-input-display">
                    <span id="b2-input-value">＿</span><span class="b2-unit-hint">元</span>
                    ${diff === 'hard' ? `<button class="b2-replay-btn" id="b2-replay-btn" title="重聽題目">🔊</button>` : ''}
                </div>
                <div class="b2-input-preview" id="b2-input-preview"></div>
                <div class="b2-numpad">
                    ${digits.map(n => `<button class="b2-numpad-btn" data-digit="${n}">${n}</button>`).join('')}
                    <button class="b2-numpad-btn btn-del" data-action="del">⌫</button>
                    <button class="b2-numpad-btn" data-digit="0">0</button>
                    <button class="b2-numpad-btn btn-ok" data-action="ok">確認</button>
                </div>
            </div>`;
        },

        _renderCustomEventsPanel() {
            return `
            <div class="b2-custom-events-panel" id="b2-cep-panel">
                <div class="b2-cep-header">📋 自訂收支事件</div>
                <div class="b2-cep-add-row">
                    <select class="b2-cep-input b2-cep-type-sel" id="b2-cep-type-sel">
                        <option value="income">📥 收入</option>
                        <option value="expense">📤 支出</option>
                    </select>
                    <input type="text" id="b2-cep-name-input" placeholder="事件名稱" maxlength="8" class="b2-cep-input">
                    <input type="number" id="b2-cep-amt-input" placeholder="金額" min="1" max="9999" class="b2-cep-input b2-cep-amt-inp">
                    <button class="b2-cep-add-btn" id="b2-cep-add-btn">＋ 新增</button>
                </div>
            </div>`;
        },

        // ── 金額→金幣圖示組（每個面額顯示一次＋數量）────────────────
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
                const w = isBill ? 34 : 24;
                const countBadge = g.count > 1 ? `<span class="b2-mic-count">×${g.count}</span>` : '';
                return `<span class="b2-mic-item">
                    <img src="../images/money/${g.denom}_yuan_front.png" alt="${g.denom}元"
                         style="width:${w}px;height:${isBill ? 'auto' : w + 'px'};${isBill ? 'border-radius:3px' : 'border-radius:50%'};display:block;"
                         onerror="this.style.display='none'" draggable="false">${countBadge}
                </span>`;
            }).join('');
        },

        _bindCustomEventsPanel(question) {
            // 刪除原有事件
            document.querySelectorAll('#b2-base-event-0, #b2-base-event-1, #b2-base-event-2, #b2-base-event-3').forEach(row => {
                const delBtn = row?.querySelector('[data-base-idx]');
                if (!delBtn) return;
                Game.EventManager.on(delBtn, 'click', () => {
                    const idx = parseInt(delBtn.dataset.baseIdx);
                    question.events[idx]._deleted = !question.events[idx]._deleted;
                    row.classList.toggle('b2-cep-deleted', !!question.events[idx]._deleted);
                    this._updateCustomAnswerPreview(question);
                }, {}, 'gameUI');
            });
            // 新增事件
            const addBtn = document.getElementById('b2-cep-add-btn');
            if (!addBtn) return;
            Game.EventManager.on(addBtn, 'click', () => {
                const typeEl = document.getElementById('b2-cep-type-sel');
                const nameEl = document.getElementById('b2-cep-name-input');
                const amtEl  = document.getElementById('b2-cep-amt-input');
                const type   = typeEl?.value || 'income';
                const name   = nameEl?.value.trim();
                const amount = parseInt(amtEl?.value);
                if (!name || !amount || amount < 1) return;
                const q = this.state.quiz;
                const newEvent = { type, name, amount, icon: type === 'income' ? '💰' : '💸', _deleted: false };
                q.customEvents.push(newEvent);
                const ci = q.customEvents.length - 1;
                const list = document.getElementById('b2-cep-custom-list');
                const row = document.createElement('div');
                row.className = `b2-event-row ${type} b2-cep-custom-row`;
                row.id = `b2-custom-event-${ci}`;
                row.innerHTML = `<span class="b2-type-badge ${type}">${type === 'income' ? '收入 📥' : '支出 📤'}</span><span class="b2-event-icon">${newEvent.icon}</span><span class="b2-event-name">${name}</span><span class="b2-event-amount ${type}">${type === 'income' ? '+' : '-'}${amount} 元</span><button class="b2-cep-del-btn" data-custom-idx="${ci}">✕</button>`;
                list.appendChild(row);
                const delBtn2 = row.querySelector('[data-custom-idx]');
                Game.EventManager.on(delBtn2, 'click', () => {
                    q.customEvents[ci]._deleted = true;
                    row.remove();
                    this._updateCustomAnswerPreview(question);
                }, {}, 'gameUI');
                if (nameEl) nameEl.value = '';
                if (amtEl) amtEl.value = '';
                this._updateCustomAnswerPreview(question);
                this.audio.play('click');
            }, {}, 'gameUI');
        },

        _updateCustomAnswerPreview(question) {
            const ans = this._getEffectiveAnswer(question);
            const prev = document.getElementById('b2-input-preview');
            const val = parseInt(this.state.quiz.currentInput);
            if (prev && !isNaN(val)) {
                const diff2 = val - ans;
                const cls   = diff2 === 0 ? 'exact' : diff2 > 0 ? 'over' : 'under';
                const label = diff2 === 0 ? '✓ 剛好！' : diff2 > 0 ? `多了 ${diff2} 元` : `少了 ${-diff2} 元`;
                prev.className = 'b2-input-preview ' + cls;
                prev.textContent = label;
            } else if (prev) {
                prev.className = 'b2-input-preview';
                prev.textContent = '';
            }
        },

        // ── 12. 事件綁定 ──────────────────────────────────────
        _bindQuestionEvents(question) {
            const diff = this.state.settings.difficulty;
            if (diff === 'easy') {
                document.querySelectorAll('.b2-choice-btn').forEach(btn => {
                    Game.EventManager.on(btn, 'click', () => {
                        this._handleChoiceAnswer(parseInt(btn.dataset.val), question);
                    }, {}, 'gameUI');
                });
            } else {
                document.querySelectorAll('.b2-numpad-btn').forEach(btn => {
                    Game.EventManager.on(btn, 'click', () => {
                        if (this.state.isProcessing) return;
                        this.audio.play('click');
                        const action = btn.dataset.action;
                        const digit  = btn.dataset.digit;
                        if (digit !== undefined) {
                            if (this.state.quiz.currentInput.length < 5) {
                                this.state.quiz.currentInput += digit;
                            }
                        } else if (action === 'del') {
                            this.state.quiz.currentInput = this.state.quiz.currentInput.slice(0, -1);
                        } else if (action === 'ok') {
                            this._handleNumpadAnswer(question);
                            return;
                        }
                        this._updateInputDisplay();
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
            // 提示按鈕（三難度均顯示）：困難→彈窗，其他→算式卡片（B3/B5/B6 pattern）
            const b2HintBtn = document.getElementById('b2-hint-btn');
            if (b2HintBtn) {
                Game.EventManager.on(b2HintBtn, 'click', () => {
                    if (diff === 'hard') {
                        this._showHardModeHintModal(question);
                    } else {
                        this._showCalcBreakdown(question);
                        const effEvents = this._getEffectiveEvents(question);
                        const effAnswer = this._getEffectiveAnswer(question);
                        const steps = [question.startAmount, ...effEvents.map((e, i) => {
                            let running = question.startAmount;
                            for (let j = 0; j <= i; j++) running += effEvents[j].type === 'income' ? effEvents[j].amount : -effEvents[j].amount;
                            return running;
                        })];
                        const parts = effEvents.map((e, i) => {
                            const verb = e.type === 'income' ? '收入' : '花了';
                            return `${verb}${e.amount}元，剩下${steps[i + 1]}元`;
                        });
                        Game.Speech.speak(`從${question.startAmount}元開始，${parts.join('，')}，最後剩下${effAnswer}元`);
                    }
                }, {}, 'gameUI');
            }
            // 困難模式專屬重聽鈕（inline numpad 區域）
            if (diff === 'hard') {
                const hardReplayBtn = document.getElementById('b2-replay-btn');
                if (hardReplayBtn) {
                    Game.EventManager.on(hardReplayBtn, 'click', () => {
                        const q = this.state.quiz.questions[this.state.quiz.currentQuestion];
                        if (q) {
                            const evtText = q.events.map(e => `${e.amount > 0 ? '收入' : '支出'}${Math.abs(e.amount)}元`).join('，');
                            Game.Speech.speak(`起始${q.startAmount}元，${evtText}，最後餘額是多少？`);
                        }
                    }, {}, 'gameUI');
                }
                // 困難模式：查看文字切換（聽力記憶模式，Round 43）
                const revealBtn = document.getElementById('b2-reveal-btn');
                if (revealBtn) {
                    Game.EventManager.on(revealBtn, 'click', () => {
                        const diary = document.querySelector('.b2-diary');
                        if (!diary) return;
                        const revealed = diary.classList.toggle('b2-revealed');
                        revealBtn.textContent = revealed ? '🙈 隱藏' : '👁️ 查看';
                    }, {}, 'gameUI');
                }
            }
            // 自訂事件面板
            if (this.state.settings.customItemsEnabled && diff !== 'easy') {
                this._bindCustomEventsPanel(question);
            }
        },

        _updateInputDisplay() {
            const el = document.getElementById('b2-input-value');
            if (el) el.textContent = this.state.quiz.currentInput || '＿';
            // 即時餘額預覽（Round 31）
            const previewEl = document.getElementById('b2-input-preview');
            if (previewEl) {
                const q   = this.state.quiz.questions[this.state.quiz.currentQuestion];
                const val = parseInt(this.state.quiz.currentInput);
                const ans = q ? this._getEffectiveAnswer(q) : null;
                if (q && !isNaN(val) && ans !== null) {
                    const diff  = val - ans;
                    const cls   = diff === 0 ? 'exact' : diff > 0 ? 'over' : 'under';
                    const label = diff === 0 ? '✓ 剛好！' : diff > 0 ? `多了 ${diff} 元` : `少了 ${-diff} 元`;
                    previewEl.className = 'b2-input-preview ' + cls;
                    previewEl.textContent = label;
                } else {
                    previewEl.className = 'b2-input-preview';
                    previewEl.textContent = '';
                }
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

        // ── 13. 答題處理 ──────────────────────────────────────
        _handleChoiceAnswer(chosen, question) {
            if (this.state.isProcessing) return;
            this.state.isProcessing = true;

            const effectiveAnswer = this._getEffectiveAnswer(question);
            const isCorrect = chosen === effectiveAnswer;

            document.querySelectorAll('.b2-choice-btn').forEach(btn => {
                btn.disabled = true;
                const v = parseInt(btn.dataset.val);
                if (v === effectiveAnswer) btn.classList.add('correct');
                else if (v === chosen && !isCorrect) btn.classList.add('wrong');
            });

            // 答題動畫（Round 33）
            const qCard = document.querySelector('.b2-question-card') || document.querySelector('#b2-question-card');
            if (qCard) {
                qCard.classList.add(isCorrect ? 'b2-answer-correct' : 'b2-answer-wrong');
                Game.TimerManager.setTimeout(() => qCard.classList.remove('b2-answer-correct', 'b2-answer-wrong'), 600, 'ui');
            }

            if (isCorrect) {
                this.state.quiz.correctCount++;
                this.state.quiz.answeredHistory.push({ startAmount: question.startAmount, events: question.events, answer: question.answer });
                this.state.quiz.streak = (this.state.quiz.streak || 0) + 1;
                if (this.state.quiz.streak === 3 || this.state.quiz.streak === 5) {
                    Game.TimerManager.setTimeout(() => this._showStreakBadge(this.state.quiz.streak), 200, 'ui');
                }
                this.audio.play('correct');
                this._showCenterFeedback('✅', '答對了！');
                this._showNetTrend(question);
                this._showFinancialTip(question);
                // 語音播完後進入第2頁（金錢圖示）
                Game.Speech.speak(`答對了！剩下${toTWD(effectiveAnswer)}`, () => {
                    Game.TimerManager.setTimeout(() => this._renderPhase2(question, effectiveAnswer), 400, 'turnTransition');
                });
            } else {
                this.state.quiz.streak = 0;
                this.audio.play('error');
                if (this.state.settings.retryMode === 'retry') {
                    this.state.quiz.errorCount++;
                    const willShowHint = this.state.quiz.errorCount >= 3;
                    this._showCenterFeedback('❌', '再試一次！');
                    const b2EasyErrDir = chosen > effectiveAnswer ? '太多了' : '太少了';
                    Game.Speech.speak(`不對喔，算${b2EasyErrDir}，請再試一次`);
                    if (willShowHint) this._showCalcBreakdown(question);
                    Game.TimerManager.setTimeout(() => {
                        this.state.isProcessing = false;
                        document.querySelectorAll('.b2-choice-btn').forEach(btn => {
                            btn.disabled = false;
                            btn.classList.remove('wrong');
                        });
                    }, 1600, 'turnTransition');
                } else {
                    this._showCenterFeedback('❌', '答錯了！');
                    // 告知正確答案後進入第2頁
                    Game.Speech.speak(`正確答案是${toTWD(effectiveAnswer)}`, () => {
                        Game.TimerManager.setTimeout(() => this._renderPhase2(question, effectiveAnswer), 400, 'turnTransition');
                    });
                }
            }
        },

        // ── Easy 模式逐項動畫（語音回調鏈，確保每段語音播完再進下一步）────
        _animateEasyEntriesSequential(question) {
            const answerArea = document.getElementById('b2-answer-area');
            if (!answerArea) return;
            answerArea.style.visibility = 'hidden';

            const entries = Array.from(document.querySelectorAll('.b2-event-row'));
            if (entries.length === 0) { answerArea.style.visibility = ''; return; }

            // 建立逐項小計顯示
            const runEl = document.createElement('div');
            runEl.id = 'b2-running-total';
            runEl.className = 'b2-running-total';
            runEl.innerHTML = `<span class="b2-rt-label">目前小計</span><span class="b2-rt-val" id="b2-rt-val">${question.startAmount} 元</span>`;
            const startRow = document.querySelector('.b2-start-row');
            if (startRow) startRow.insertAdjacentElement('afterend', runEl);

            entries.forEach(r => r.classList.add('b2-entry-dim'));

            // 預先計算每步餘額
            let balance = question.startAmount;
            const balances = question.events.map(e => {
                balance = e.type === 'income' ? balance + e.amount : balance - e.amount;
                return balance;
            });

            let idx = 0;
            const highlightNext = () => {
                if (idx >= entries.length) {
                    // 所有項目播完：移除最後 active，顯示週小結，然後顯示答題區
                    if (entries.length > 0) entries[entries.length - 1].classList.remove('b2-entry-active');

                    const totalIncome  = question.events.filter(e => e.type === 'income').reduce((s, e) => s + e.amount, 0);
                    const totalExpense = question.events.filter(e => e.type !== 'income').reduce((s, e) => s + e.amount, 0);

                    const summary = document.createElement('div');
                    summary.id = 'b2-week-summary';
                    summary.className = 'b2-week-summary';
                    summary.innerHTML = `
                        <span class="b2-ws-item income">📥 收入 ${totalIncome} 元</span>
                        <span class="b2-ws-sep">｜</span>
                        <span class="b2-ws-item expense">📤 支出 ${totalExpense} 元</span>`;
                    const runningEl = document.getElementById('b2-running-total');
                    if (runningEl) runningEl.insertAdjacentElement('afterend', summary);

                    // 週小結顯示 1.2s 後，清理並顯示答題區
                    Game.TimerManager.setTimeout(() => {
                        entries.forEach(r => r.classList.remove('b2-entry-active', 'b2-entry-dim'));
                        if (runEl.parentNode) runEl.remove();
                        document.getElementById('b2-week-summary')?.remove();
                        answerArea.style.visibility = '';
                        answerArea.style.animation = 'b2FadeIn 0.35s ease';
                        // Easy 模式輔助點擊在動畫結束後啟動
                        if (this.state.settings.clickMode === 'on') {
                            Game.TimerManager.setTimeout(() => AssistClick.activate(question), 300, 'ui');
                        }
                    }, 1200, 'ui');
                    return;
                }

                const row = entries[idx];
                const ev  = question.events[idx];
                const i   = idx;
                idx++;

                if (i > 0) entries[i - 1].classList.remove('b2-entry-active');
                row.classList.remove('b2-entry-dim');
                row.classList.add('b2-entry-active');

                // 更新小計顯示
                const valEl = document.getElementById('b2-rt-val');
                if (valEl) {
                    valEl.textContent = `${balances[i]} 元`;
                    valEl.className = 'b2-rt-val ' + (ev.type === 'income' ? 'b2-rt-up' : 'b2-rt-down');
                    valEl.style.animation = 'none';
                    void valEl.offsetWidth; // 觸發 reflow
                    valEl.style.animation = 'b2RtPop 0.3s ease';
                }

                // 逐項語音，語音結束後才進下一步（300ms 緩衝）
                const verb = ev.type === 'income' ? '收入' : '花了';
                Game.Speech.speak(`${ev.name}，${verb}${ev.amount}元`, () => {
                    Game.TimerManager.setTimeout(highlightNext, 300, 'ui');
                });
            };

            // 短暫停頓後開始
            Game.TimerManager.setTimeout(highlightNext, 200, 'ui');
        },

        // ── 開題起始金額彈窗（B1 _showTaskModal pattern）─────────
        _showTaskIntroModal(question, afterClose) {
            // B1 _showTaskModal afterClose pattern：語音結束後才關閉彈窗並執行後續語音
            document.getElementById('b2-task-intro-modal')?.remove();
            const modal = document.createElement('div');
            modal.id = 'b2-task-intro-modal';
            modal.className = 'b2-task-intro-modal';
            modal.innerHTML = `
                <div class="b2-task-intro-inner">
                    <div class="b2-task-intro-icon">📒</div>
                    <div class="b2-task-intro-label">起始金額</div>
                    <div class="b2-task-intro-amount">${question.startAmount} 元</div>
                    <div class="b2-task-intro-tap">點任意處繼續</div>
                </div>`;
            document.body.appendChild(modal);
            let closed = false;
            const closeModal = () => {
                if (closed) return;
                closed = true;
                if (document.body.contains(modal)) modal.remove();
                afterClose?.();
            };
            Game.TimerManager.setTimeout(() => {
                Game.Speech.speak(`本週零用錢，起始${question.startAmount}元`, closeModal);
            }, 300, 'ui');
            modal.addEventListener('click', closeModal);
            Game.TimerManager.setTimeout(closeModal, 2600, 'ui');
        },

        // ── 類別圖示動畫導引（Round 44）──────────────────────────
        _showThemeGuide() {
            document.getElementById('b2-theme-guide')?.remove();
            const themeKey = this.state.settings.diaryTheme;
            const themeData = {
                school:  { icon: '📚', phrase: '學校週記：留意收入和支出' },
                holiday: { icon: '🌴', phrase: '假日時光：算算假期花費' },
                family:  { icon: '👨‍👩‍👧', phrase: '家庭生活：記錄每筆零用錢' },
            };
            const td = themeData[themeKey];
            if (!td) return; // 不顯示於隨機/未設定模式
            const bar = document.createElement('div');
            bar.id = 'b2-theme-guide';
            bar.className = 'b2-theme-guide';
            bar.innerHTML = `<span class="b2-tg-icon">${td.icon}</span><span class="b2-tg-phrase">${td.phrase}</span>`;
            const app = document.getElementById('app');
            if (app) app.insertAdjacentElement('afterbegin', bar);
            Game.TimerManager.setTimeout(() => {
                bar.classList.add('b2-tg-fade');
                Game.TimerManager.setTimeout(() => { if (bar.parentNode) bar.remove(); }, 500, 'ui');
            }, 2000, 'ui');
        },

        // ── 計算過程提示（答錯後顯示逐步算式）─────────────────
        _showCalcBreakdown(question) {
            document.querySelector('.b2-calc-breakdown')?.remove(); // 先移除舊的，確保反映最新自訂事件
            const section = document.querySelector('.b2-numpad-section');
            if (!section) return;
            const effEvents = this._getEffectiveEvents(question);
            const effAnswer = this._getEffectiveAnswer(question);
            let cur = question.startAmount;
            const steps = effEvents.map(e => {
                cur = e.type === 'income' ? cur + e.amount : cur - e.amount;
                const op = e.type === 'income' ? '＋' : '－';
                return `<div class="b2-bd-row">
                    <span class="b2-bd-op ${e.type}">${op}</span>
                    <span class="b2-bd-name">${e.name}</span>
                    <span class="b2-bd-val">${e.amount} 元</span>
                </div>`;
            }).join('');
            const box = document.createElement('div');
            box.className = 'b2-calc-breakdown';
            box.innerHTML = `
                <div class="b2-bd-title">💡 計算過程</div>
                <div class="b2-bd-row b2-bd-start">
                    <span class="b2-bd-op">起</span>
                    <span class="b2-bd-name">開始有</span>
                    <span class="b2-bd-val">${question.startAmount} 元</span>
                </div>
                ${steps}
                <div class="b2-bd-row b2-bd-result">
                    <span class="b2-bd-op">＝</span>
                    <span class="b2-bd-name">結果</span>
                    <span class="b2-bd-val">${effAnswer} 元</span>
                </div>`;
            section.appendChild(box);
        },

        _handleNumpadAnswer(question) {
            if (this.state.isProcessing) return;
            const input = parseInt(this.state.quiz.currentInput);
            if (isNaN(input) || input < 0) return;
            this.state.isProcessing = true;

            const effectiveAnswer = this._getEffectiveAnswer(question);
            const isCorrect = input === effectiveAnswer;

            const displayEl = document.getElementById('b2-input-display');
            if (displayEl) displayEl.style.background = isCorrect ? '#064e3b' : '#7f1d1d';

            document.querySelectorAll('.b2-numpad-btn').forEach(btn => btn.disabled = true);

            if (isCorrect) {
                this.state.quiz.correctCount++;
                this.state.quiz.answeredHistory.push({ startAmount: question.startAmount, events: this._getEffectiveEvents(question), answer: effectiveAnswer });
                this.state.quiz.streak = (this.state.quiz.streak || 0) + 1;
                if (this.state.quiz.streak === 3 || this.state.quiz.streak === 5) {
                    Game.TimerManager.setTimeout(() => this._showStreakBadge(this.state.quiz.streak), 200, 'ui');
                }
                this.audio.play('correct');
                this._showCenterFeedback('✅', '答對了！');
                this._showNetTrend(question);
                this._showFinancialTip(question);
                // 語音播完後進入第2頁（金錢圖示）
                Game.Speech.speak(`答對了！剩下${toTWD(effectiveAnswer)}`, () => {
                    Game.TimerManager.setTimeout(() => this._renderPhase2(question, effectiveAnswer), 400, 'turnTransition');
                });
            } else {
                this.state.quiz.streak = 0;
                this.audio.play('error');
                // 漸進提示（Round 34）：第1次錯→範圍提示，第2次以上→算式；困難→彈窗（B3/B5/B6 pattern）
                this.state.quiz.errorCount = (this.state.quiz.errorCount || 0) + 1;
                const isDiffHard = this.state.settings.difficulty === 'hard';
                if (this.state.quiz.errorCount === 1 && !isDiffHard) {
                    const lo = Math.min(question.startAmount, effectiveAnswer);
                    const hi = Math.max(question.startAmount, effectiveAnswer);
                    this._showRangeHint(lo, hi);
                } else if (isDiffHard) {
                    if (this.state.quiz.errorCount >= 2) {
                        Game.TimerManager.setTimeout(() => this._showHardModeHintModal(question), 800, 'ui');
                    }
                } else {
                    this._showCalcBreakdown(question); // 答錯即顯示計算過程
                }
                // 錯誤辨識語音（Round 33）
                const userVal = parseInt(this.state.quiz.currentInput);
                const diff33 = !isNaN(userVal) ? userVal - effectiveAnswer : 0;
                const errSpeech = !isNaN(userVal) && diff33 !== 0
                    ? (diff33 > 0 ? `不對喔，算太多了，請再試一次` : `不對喔，算太少了，請再試一次`)
                    : `不對喔，請再試一次`;
                if (this.state.settings.retryMode === 'retry') {
                    this._showCenterFeedback('❌', '再試一次！');
                    Game.Speech.speak(errSpeech);
                    Game.TimerManager.setTimeout(() => {
                        this.state.isProcessing = false;
                        this.state.quiz.currentInput = '';
                        this._updateInputDisplay();
                        const displayEl = document.getElementById('b2-input-display');
                        if (displayEl) displayEl.style.background = '';
                        document.querySelectorAll('.b2-numpad-btn').forEach(btn => btn.disabled = false);
                    }, 1800, 'turnTransition');
                } else {
                    this._showCenterFeedback('❌', '答錯了！');
                    // 告知正確答案後進入第2頁
                    Game.Speech.speak(`正確答案是${toTWD(effectiveAnswer)}`, () => {
                        Game.TimerManager.setTimeout(() => this._renderPhase2(question, effectiveAnswer), 400, 'turnTransition');
                    });
                }
            }
        },

        // ── 第2頁：正確金錢圖示展示（B1 Phase 2 pattern）────────────
        _renderPhase2(question, effectiveAnswer) {
            Game.TimerManager.clearByCategory('turnTransition');
            Game.EventManager.removeByCategory('gameUI');

            const q    = this.state.quiz;
            const diff = this.state.settings.difficulty;
            const pct  = Math.round((q.currentQuestion / q.totalQuestions) * 100);
            const isLast = (q.currentQuestion + 1) >= q.totalQuestions;

            // 貪婪分解面額
            const denoms = [1000, 500, 100, 50, 10, 5, 1];
            let rem = effectiveAnswer;
            const groups = [];
            for (const d of denoms) {
                if (rem <= 0) break;
                const count = Math.floor(rem / d);
                if (count > 0) { groups.push({ denom: d, count }); rem -= count * d; }
            }

            // 判斷顯示方式：總數 ≤ 10 枚 → 逐枚顯示；否則 → 分組×N
            const totalCoins = groups.reduce((s, g) => s + g.count, 0);
            let coinsHTML = '';
            if (totalCoins <= 10) {
                // 逐枚顯示，帶入場動畫
                let animIdx = 0;
                for (const g of groups) {
                    for (let i = 0; i < g.count; i++) {
                        const isBill = g.denom >= 100;
                        const w = isBill ? '80px' : '56px';
                        coinsHTML += `
                        <div class="b2-p2-coin" style="animation-delay:${animIdx * 150}ms">
                            <img src="../images/money/${g.denom}_yuan_front.png" alt="${g.denom}元"
                                 style="width:${w};${isBill ? 'border-radius:6px' : 'border-radius:50%'}"
                                 onerror="this.style.display='none'" draggable="false">
                            <span class="b2-p2-coin-label">${g.denom}</span>
                        </div>`;
                        animIdx++;
                    }
                }
            } else {
                // 分組顯示：每種面額一張圖＋×N
                groups.forEach((g, i) => {
                    const isBill = g.denom >= 100;
                    const w = isBill ? '80px' : '56px';
                    coinsHTML += `
                    <div class="b2-p2-coin" style="animation-delay:${i * 180}ms">
                        <img src="../images/money/${g.denom}_yuan_front.png" alt="${g.denom}元"
                             style="width:${w};${isBill ? 'border-radius:6px' : 'border-radius:50%'}"
                             onerror="this.style.display='none'" draggable="false">
                        <span class="b2-p2-coin-label">${g.denom}元 ×${g.count}</span>
                    </div>`;
                });
            }

            const themeInfo = B2_THEMES[this.state.settings.diaryTheme];
            const diffLabel = { easy: '簡單模式', normal: '普通模式', hard: '困難模式' }[diff] || '';
            const centerText = diffLabel + (themeInfo ? ` · ${themeInfo.icon}${themeInfo.name}` : '');

            const app = document.getElementById('app');
            app.innerHTML = `
            <div class="b-header">
                <div class="b-header-left"><span class="b-header-unit">📒 零用錢日記</span></div>
                <div class="b-header-center">${centerText}</div>
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
                <div class="b2-phase2-card">
                    <div class="b2-p2-header">
                        <span class="b2-p2-icon">💰</span>
                        <span class="b2-p2-title">最後剩下</span>
                    </div>
                    <div class="b2-p2-amount">${effectiveAnswer} 元</div>
                    <div class="b2-p2-subtitle">換成錢幣看起來像這樣 👇</div>
                    <div class="b2-p2-coins-wrap">
                        ${groups.length > 0 ? coinsHTML : '<span style="color:#9ca3af;font-size:14px;">（無需找零）</span>'}
                    </div>
                    <button class="b2-p2-next-btn" id="b2-p2-next-btn">
                        ${isLast ? '🏆 查看結果' : '下一題 ▶'}
                    </button>
                </div>
            </div>`;

            // 播語音
            Game.Speech.speak(`剩下${toTWD(effectiveAnswer)}`);

            // 按鈕 + 防重複觸發
            let advanced = false;
            const advance = () => {
                if (advanced) return;
                advanced = true;
                Game.TimerManager.clearByCategory('p2auto');
                this.nextQuestion();
            };
            Game.EventManager.on(document.getElementById('b2-p2-next-btn'), 'click', advance, {}, 'gameUI');
            // 5秒後自動前進
            Game.TimerManager.setTimeout(advance, 5000, 'p2auto');
        },

        // ── 收支趨勢指示（Round 26）───────────────────────────
        _showNetTrend(question) {
            const net = question.answer - question.startAmount;
            if (net === 0) return; // 完全平衡，不顯示
            const prev = document.getElementById('b2-net-trend');
            if (prev) prev.remove();
            const isUp = net > 0;
            const sign = isUp ? '+' : '';
            const trend = document.createElement('div');
            trend.id = 'b2-net-trend';
            trend.className = `b2-net-trend ${isUp ? 'up' : 'down'}`;
            trend.innerHTML = `<span class="b2-nt-arrow">${isUp ? '↑' : '↓'}</span><span>${isUp ? '本週盈餘' : '本週赤字'} ${sign}${net} 元</span>`;
            document.body.appendChild(trend);
            Game.TimerManager.setTimeout(() => {
                trend.classList.add('b2-nt-fade');
                Game.TimerManager.setTimeout(() => { if (trend.parentNode) trend.remove(); }, 400, 'ui');
            }, 1400, 'ui');
        },

        // ── 困難模式提示彈窗（B3/B5/B6 _showHardModeHintModal pattern）──
        _showHardModeHintModal(question) {
            document.getElementById('b2-hard-hint-modal')?.remove();
            const effEvents = this._getEffectiveEvents(question);
            const effAnswer = this._getEffectiveAnswer(question);
            let cur = question.startAmount;
            const steps = effEvents.map(e => {
                const prev = cur;
                cur = e.type === 'income' ? cur + e.amount : cur - e.amount;
                const op = e.type === 'income' ? '＋' : '－';
                return `<div class="b2-hm-row">
                    <span class="b2-hm-op ${e.type}">${op}${e.amount}元</span>
                    <span class="b2-hm-name">${e.name}</span>
                    <span class="b2-hm-result">${cur}元</span>
                </div>`;
            }).join('');

            const overlay = document.createElement('div');
            overlay.id = 'b2-hard-hint-modal';
            overlay.className = 'b2-hm-overlay';
            overlay.innerHTML = `
                <div class="b2-hm-modal">
                    <div class="b2-hm-header">💡 計算步驟</div>
                    <div class="b2-hm-start-row">
                        <span class="b2-hm-op neutral">起</span>
                        <span class="b2-hm-name">開始有</span>
                        <span class="b2-hm-result">${question.startAmount}元</span>
                    </div>
                    ${steps}
                    <div class="b2-hm-answer-row">
                        <span class="b2-hm-op neutral">＝</span>
                        <span class="b2-hm-name">最後餘額</span>
                        <span class="b2-hm-result b2-hm-answer">${effAnswer}元</span>
                    </div>
                    <button class="b2-hm-close-btn" id="b2-hm-close-btn">✕ 關閉</button>
                </div>`;
            document.body.appendChild(overlay);

            // 語音：逐步說明計算過程
            const parts = effEvents.map(e => {
                const verb = e.type === 'income' ? '加上' : '減去';
                return `${e.name}${verb}${e.amount}元`;
            });
            Game.Speech.speak(`從${question.startAmount}元開始，${parts.join('，')}，最後剩下${effAnswer}元`);

            const closeHM = () => { document.getElementById('b2-hard-hint-modal')?.remove(); };
            Game.EventManager.on(document.getElementById('b2-hm-close-btn'), 'click', closeHM, {}, 'gameUI');
            overlay.addEventListener('click', e => { if (e.target === overlay) closeHM(); });
        },

        // ── 範圍提示（Round 34：第1次錯誤時）────────────────────
        _showRangeHint(lo, hi) {
            const container = document.querySelector('.b2-numpad-section');
            if (!container || document.querySelector('.b2-range-hint')) return;
            const hint = document.createElement('div');
            hint.className = 'b2-range-hint';
            hint.innerHTML = `💡 提示：答案介於 <strong>${lo}</strong> 元 ~ <strong>${hi}</strong> 元 之間`;
            container.appendChild(hint);
        },

        // ── 理財建議卡（Round 32）────────────────────────────────
        _showFinancialTip(question) {
            const net = question.answer - question.startAmount;
            const tips = net > 0
                ? ['收入大於支出，可以把多出來的錢存起來！', '有盈餘真好！記得把剩餘的錢放進撲滿。']
                : net < 0
                ? ['支出超過收入要小心喔，記得控制花費。', '赤字時，思考哪些費用可以減少。']
                : ['收支剛好平衡，繼續保持！'];
            const tip = tips[Math.floor(Math.random() * tips.length)];
            const prev = document.getElementById('b2-fin-tip');
            if (prev) prev.remove();
            const card = document.createElement('div');
            card.id = 'b2-fin-tip';
            card.className = 'b2-fin-tip';
            card.innerHTML = `<span class="b2-ft-icon">💡</span><span class="b2-ft-text">${tip}</span>`;
            const app = document.getElementById('app');
            if (app) app.appendChild(card);
            Game.TimerManager.setTimeout(() => { if (card.parentNode) card.remove(); }, 1400, 'ui');
        },

        // ── 連勝徽章（B3 streak pattern）─────────────────────
        _showStreakBadge(streak) {
            const existing = document.getElementById('b2-streak-badge');
            if (existing) existing.remove();
            const badge = document.createElement('div');
            badge.id = 'b2-streak-badge';
            badge.className = 'b2-streak-badge';
            const label = streak === 3 ? '🔥 3連勝！' : '⚡ 5連勝！';
            const msg   = streak === 3 ? '繼續加油！' : '太厲害了！';
            badge.innerHTML = `<div class="b2-sb-inner"><div class="b2-sb-label">${label}</div><div class="b2-sb-msg">${msg}</div></div>`;
            document.body.appendChild(badge);
            Game.Speech.speak(streak === 3 ? '三連勝，繼續加油！' : '五連勝，太厲害了！');
            Game.TimerManager.setTimeout(() => {
                badge.classList.add('b2-sb-fade');
                Game.TimerManager.setTimeout(() => { if (badge.parentNode) badge.remove(); }, 400, 'ui');
            }, 1600, 'ui');
        },

        // ── 14. 下一題 ────────────────────────────────────────
        nextQuestion() {
            this.state.quiz.errorCount = 0;
            this.state.quiz.currentQuestion++;
            if (this.state.quiz.currentQuestion >= this.state.quiz.totalQuestions) {
                this.showResults();
            } else {
                this.renderQuestion();
            }
        },

        // ── 15. 完成畫面 ──────────────────────────────────────
        showResults() {
            if (this.state.isEndingGame) return;
            this.state.isEndingGame = true;

            AssistClick.deactivate();
            Game.TimerManager.clearByCategory('turnTransition');
            Game.EventManager.removeByCategory('gameUI');

            const q        = this.state.quiz;
            const elapsed  = q.startTime ? (Date.now() - q.startTime) : 0;
            const mins     = Math.floor(elapsed / 60000);
            const secs     = Math.floor((elapsed % 60000) / 1000);
            const accuracy = q.totalQuestions > 0
                ? Math.round((q.correctCount / q.totalQuestions) * 100) : 0;

            let badge, badgeColor;
            if (accuracy === 100)    { badge = '完美 🥇'; badgeColor = '#f59e0b'; }
            else if (accuracy >= 90) { badge = '優異 🥇'; badgeColor = '#f59e0b'; }
            else if (accuracy >= 70) { badge = '良好 🥈'; badgeColor = '#10b981'; }
            else if (accuracy >= 50) { badge = '努力 🥉'; badgeColor = '#6366f1'; }
            else                     { badge = '練習 ⭐'; badgeColor = '#94a3b8'; }

            // 本期收支總計
            const totalCardHTML = (() => {
                const hist = q.answeredHistory;
                if (!hist || hist.length === 0) return '';
                let totalIncome = 0, totalExpense = 0;
                hist.forEach(h => {
                    h.events.forEach(e => {
                        if (e.type === 'income')  totalIncome  += e.amount;
                        else                       totalExpense += e.amount;
                    });
                });
                const net = totalIncome - totalExpense;
                // 收支平衡評語（Round 40）
                let balanceComment, balanceClass;
                if (totalIncome === 0 && totalExpense === 0) { balanceComment = ''; balanceClass = ''; }
                else if (net > totalIncome * 0.3)  { balanceComment = '💚 理財優等生！收入遠大於支出'; balanceClass = 'b2-bal-great'; }
                else if (net >= 0)                 { balanceComment = '😊 收支平衡，繼續保持！'; balanceClass = 'b2-bal-ok'; }
                else if (-net < totalExpense * 0.2){ balanceComment = '⚠️ 略有赤字，要多注意支出！'; balanceClass = 'b2-bal-warn'; }
                else                               { balanceComment = '😰 赤字偏高，可以減少一些支出！'; balanceClass = 'b2-bal-bad'; }
                const commentHTML = balanceComment
                    ? `<div class="b2-balance-comment ${balanceClass}">${balanceComment}</div>`
                    : '';
                return `
                <div class="b-review-card">
                    <h3>💰 本期收支總計</h3>
                    <div class="b2-totals-row">
                        <div class="b2-total-item income">
                            <span class="b2-total-label">總收入</span>
                            <span class="b2-total-val">＋${totalIncome}元</span>
                        </div>
                        <div class="b2-total-item expense">
                            <span class="b2-total-label">總支出</span>
                            <span class="b2-total-val">－${totalExpense}元</span>
                        </div>
                        <div class="b2-total-item net ${net >= 0 ? 'positive' : 'negative'}">
                            <span class="b2-total-label">淨餘額</span>
                            <span class="b2-total-val">${net >= 0 ? '＋' : ''}${net}元</span>
                        </div>
                    </div>
                    ${commentHTML}
                </div>`;
            })();

            // 最大收支記錄
            const maxCardHTML = (() => {
                const hist = q.answeredHistory;
                if (!hist || hist.length === 0) return '';
                let maxIncome = null, maxExpense = null;
                hist.forEach(h => h.events.forEach(e => {
                    if (e.type === 'income'  && (!maxIncome  || e.amount > maxIncome.amount))  maxIncome  = e;
                    if (e.type === 'expense' && (!maxExpense || e.amount > maxExpense.amount)) maxExpense = e;
                }));
                if (!maxIncome && !maxExpense) return '';
                return `
                <div class="b-review-card">
                    <h3>📌 本期最大記錄</h3>
                    <div class="b2-max-row">
                        ${maxIncome ? `<div class="b2-max-item income">
                            <span class="b2-max-icon">${maxIncome.icon || '💰'}</span>
                            <span class="b2-max-label">最大收入</span>
                            <span class="b2-max-name">${maxIncome.name}</span>
                            <span class="b2-max-val">＋${maxIncome.amount}元</span>
                        </div>` : ''}
                        ${maxExpense ? `<div class="b2-max-item expense">
                            <span class="b2-max-icon">${maxExpense.icon || '💸'}</span>
                            <span class="b2-max-label">最大支出</span>
                            <span class="b2-max-name">${maxExpense.name}</span>
                            <span class="b2-max-val">－${maxExpense.amount}元</span>
                        </div>` : ''}
                    </div>
                </div>`;
            })();

            // 記帳日記回顧
            const historyCardHTML = (() => {
                const hist = q.answeredHistory;
                if (!hist || hist.length === 0) return '';
                const rows = hist.map((h, i) => {
                    const eventsStr = h.events.map(e =>
                        `<span class="b2-hist-ev ${e.type}">${e.type === 'income' ? '＋' : '－'}${e.amount}</span>`
                    ).join('');
                    return `<tr>
                        <td class="b2-hist-no">${i + 1}</td>
                        <td class="b2-hist-start">${h.startAmount}</td>
                        <td class="b2-hist-evs">${eventsStr}</td>
                        <td class="b2-hist-ans">${h.answer}</td>
                    </tr>`;
                }).join('');
                const themeTitle = (() => { const t = B2_THEMES[this.state.settings.diaryTheme]; return t ? `${t.icon} ${t.name}回顧` : '📒 記帳日記回顧'; })();
                return `
                <div class="b-review-card">
                    <h3>${themeTitle}</h3>
                    <table class="b2-hist-table">
                        <thead><tr>
                            <th>#</th><th>起始</th><th>收支事件</th><th>結餘</th>
                        </tr></thead>
                        <tbody>${rows}</tbody>
                    </table>
                </div>`;
            })();

            const app = document.getElementById('app');
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
            app.style.overflow = 'auto'; app.style.height = 'auto'; app.style.minHeight = '100vh';

            // ── 第一頁：測驗回顧 ──
            app.innerHTML = `
<div class="b-review-wrapper">
    <div class="b-review-screen">
        <div class="b-review-header">
            <div class="b-review-emoji">📒</div>
            <h1 class="b-review-title">記帳回顧</h1>
            <p class="b-review-subtitle">這週的收支紀錄</p>
        </div>
        ${totalCardHTML}
        ${maxCardHTML}
        ${historyCardHTML}
        <button id="b2-view-summary-btn" class="b-review-next-btn">
            📊 查看測驗總結
        </button>
    </div>
</div>`;

            Game.TimerManager.setTimeout(() => {
                document.getElementById('success-sound')?.play();
            }, 100, 'confetti');
            Game.TimerManager.setTimeout(() => {
                Game.Speech.speak('完成了！來看看記帳回顧吧！');
            }, 600, 'speech');

            Game.EventManager.on(document.getElementById('b2-view-summary-btn'), 'click', () => {
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
                <h1 class="b-res-title">🎉 記帳達人 🎉</h1>
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
                    <div class="b-res-ach-item">✅ 分辨收入與支出</div>
                    <div class="b-res-ach-item">✅ 計算收支後的餘額</div>
                    <div class="b-res-ach-item">✅ 閱讀記帳日記格式</div>
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
    // ============================================================
    const AssistClick = {
        _overlay: null, _handler: null, _touchHandler: null,
        _queue: [], _enabled: false,
        _lastHighlighted: null, _observer: null,

        activate(question) {
            if (this._overlay) return;
            this._overlay = document.createElement('div');
            this._overlay.id = 'b2-assist-overlay';
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

            const diff = Game.state.settings.difficulty;
            const q    = question || Game.state.quiz.questions[Game.state.quiz.currentQuestion];
            if (!q) return;

            if (diff === 'easy') {
                const btn = document.querySelector(`.b2-choice-btn[data-val="${q.answer}"]`);
                if (!btn) return;
                this._queue = [{ el: btn, action: () => btn.click() }];
            } else {
                // Normal / Hard：逐位數輸入 → 確認
                const steps = [];
                const digits = String(q.answer).split('');
                for (const d of digits) {
                    const btn = document.querySelector(`.b2-numpad-btn[data-digit="${d}"]`);
                    if (btn) steps.push({ el: btn, action: () => btn.click() });
                }
                const okBtn = document.querySelector('.b2-numpad-btn[data-action="ok"]');
                if (okBtn) steps.push({ el: okBtn, action: () => okBtn.click() });
                this._queue = steps;
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
