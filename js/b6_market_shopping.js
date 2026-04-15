// =============================================================
// FILE: js/b6_market_shopping.js — B6 菜市場買菜
// =============================================================
'use strict';

// ── 市場攤位資料 ─────────────────────────────────────────────
const B6_STALLS = {
    vegetable: {
        name: '蔬菜攤', icon: '🥦',
        items: [
            { id: 'cabbage',    name: '高麗菜', price: 30,  unit: '顆', icon: '🥬' },
            { id: 'tomato',     name: '番茄',   price: 45,  unit: '斤', icon: '🍅' },
            { id: 'scallion',   name: '青蔥',   price: 20,  unit: '把', icon: '🌿' },
            { id: 'sweetpot',   name: '地瓜',   price: 35,  unit: '斤', icon: '🍠' },
            { id: 'spinach',    name: '菠菜',   price: 25,  unit: '把', icon: '🥗' },
            { id: 'carrot',     name: '紅蘿蔔', price: 40,  unit: '斤', icon: '🥕' },
            { id: 'corn',       name: '玉米',   price: 15,  unit: '根', icon: '🌽' },
            { id: 'cucumber',   name: '小黃瓜', price: 20,  unit: '條', icon: '🥒' },
            { id: 'broccoli',   name: '花椰菜', price: 45,  unit: '顆', icon: '🥦' },
            { id: 'pumpkin',    name: '南瓜',   price: 55,  unit: '顆', icon: '🎃' },
            { id: 'daikon',     name: '白蘿蔔', price: 30,  unit: '條', icon: '🥬' },
            { id: 'pakchoi',    name: '青江菜', price: 15,  unit: '把', icon: '🌱' },
        ],
    },
    fruit: {
        name: '水果攤', icon: '🍎',
        items: [
            { id: 'apple',      name: '蘋果',   price: 50,  unit: '斤', icon: '🍎' },
            { id: 'banana',     name: '香蕉',   price: 25,  unit: '把', icon: '🍌' },
            { id: 'grape',      name: '葡萄',   price: 80,  unit: '串', icon: '🍇' },
            { id: 'orange',     name: '柳橙',   price: 40,  unit: '斤', icon: '🍊' },
            { id: 'melon',      name: '哈密瓜', price: 120, unit: '顆', icon: '🍈' },
            { id: 'mango',      name: '芒果',   price: 60,  unit: '斤', icon: '🥭' },
            { id: 'watermelon', name: '西瓜',   price: 80,  unit: '片', icon: '🍉' },
            { id: 'pineapple',  name: '鳳梨',   price: 70,  unit: '顆', icon: '🍍' },
            { id: 'strawberry', name: '草莓',   price: 100, unit: '盒', icon: '🍓' },
            { id: 'peach',      name: '桃子',   price: 55,  unit: '顆', icon: '🍑' },
            { id: 'papaya',     name: '木瓜',   price: 45,  unit: '顆', icon: '🧡' },
            { id: 'guava',      name: '芭樂',   price: 35,  unit: '顆', icon: '🍏' },
        ],
    },
    grocery: {
        name: '雜貨攤', icon: '🛒',
        items: [
            { id: 'egg',        name: '雞蛋',   price: 65,  unit: '盒', icon: '🥚' },
            { id: 'tofu',       name: '豆腐',   price: 25,  unit: '塊', icon: '🫙' },
            { id: 'soy',        name: '醬油',   price: 45,  unit: '瓶', icon: '🍶' },
            { id: 'rice',       name: '白米',   price: 90,  unit: '包', icon: '🌾' },
            { id: 'noodle',     name: '麵條',   price: 35,  unit: '包', icon: '🍜' },
            { id: 'salt',       name: '食鹽',   price: 20,  unit: '包', icon: '🧂' },
            { id: 'sugar',      name: '砂糖',   price: 30,  unit: '包', icon: '🍬' },
            { id: 'miso',       name: '味噌',   price: 40,  unit: '包', icon: '🟡' },
            { id: 'oil',        name: '沙拉油', price: 75,  unit: '瓶', icon: '🫙' },
            { id: 'canned',     name: '罐頭',   price: 35,  unit: '罐', icon: '🥫' },
            { id: 'soap',       name: '洗碗精', price: 45,  unit: '瓶', icon: '🧴' },
            { id: 'tissue',     name: '衛生紙', price: 50,  unit: '包', icon: '🧻' },
        ],
    },
};

// ── 購物清單任務（依難度）── 新格式：指定各攤位選幾樣，不指定具體商品 ──
// budget = 上限；stalls = [{stall, count}] 表示在該攤位自由選 count 樣
const B6_MISSIONS = {
    easy: [
        { budget:  80, stalls: [{ stall:'vegetable', count:1 }, { stall:'grocery',   count:1 }] },
        { budget: 100, stalls: [{ stall:'fruit',     count:1 }, { stall:'vegetable', count:1 }] },
        { budget:  60, stalls: [{ stall:'vegetable', count:2 }] },
        { budget:  80, stalls: [{ stall:'grocery',   count:1 }, { stall:'fruit',     count:1 }] },
        { budget: 100, stalls: [{ stall:'fruit',     count:1 }, { stall:'grocery',   count:1 }] },
        { budget:  70, stalls: [{ stall:'vegetable', count:1 }, { stall:'fruit',     count:1 }] },
        { budget:  80, stalls: [{ stall:'grocery',   count:2 }] },
        { budget: 100, stalls: [{ stall:'vegetable', count:1 }, { stall:'fruit',     count:1 }, { stall:'grocery', count:1 }] },
    ],
    normal: [
        { budget: 120, stalls: [{ stall:'vegetable', count:2 }, { stall:'grocery',   count:1 }] },
        { budget: 150, stalls: [{ stall:'fruit',     count:1 }, { stall:'grocery',   count:2 }] },
        { budget: 130, stalls: [{ stall:'vegetable', count:2 }, { stall:'fruit',     count:1 }] },
        { budget: 180, stalls: [{ stall:'fruit',     count:2 }, { stall:'grocery',   count:1 }] },
        { budget: 140, stalls: [{ stall:'vegetable', count:1 }, { stall:'fruit',     count:1 }, { stall:'grocery', count:1 }] },
        { budget: 110, stalls: [{ stall:'vegetable', count:3 }] },
        { budget: 160, stalls: [{ stall:'fruit',     count:1 }, { stall:'vegetable', count:2 }, { stall:'grocery', count:1 }] },
        { budget: 170, stalls: [{ stall:'grocery',   count:2 }, { stall:'fruit',     count:1 }] },
    ],
    hard: [
        { budget: 200, stalls: [{ stall:'vegetable', count:2 }, { stall:'fruit',     count:1 }, { stall:'grocery', count:2 }] },
        { budget: 180, stalls: [{ stall:'vegetable', count:3 }, { stall:'grocery',   count:2 }] },
        { budget: 220, stalls: [{ stall:'fruit',     count:2 }, { stall:'vegetable', count:2 }, { stall:'grocery', count:1 }] },
        { budget: 250, stalls: [{ stall:'grocery',   count:3 }, { stall:'fruit',     count:2 }] },
        { budget: 200, stalls: [{ stall:'vegetable', count:3 }, { stall:'fruit',     count:1 }, { stall:'grocery', count:1 }] },
        { budget: 230, stalls: [{ stall:'fruit',     count:2 }, { stall:'grocery',   count:2 }, { stall:'vegetable', count:1 }] },
        { budget: 260, stalls: [{ stall:'vegetable', count:2 }, { stall:'fruit',     count:2 }, { stall:'grocery', count:2 }] },
        { budget: 200, stalls: [{ stall:'vegetable', count:4 }, { stall:'grocery',   count:2 }] },
    ],
};

// ── 市場類型（B5_THEMES pattern）────────────────────────────
const B6_MARKETS = {
    traditional: {
        name: '傳統市場', icon: '🏪',
        stalls: B6_STALLS,
        missions: B6_MISSIONS,
    },
    supermarket: {
        name: '超市購物', icon: '🛒',
        stalls: {
            bakery: {
                name: '烘焙區', icon: '🥖',
                items: [
                    { id: 'bread',      name: '麵包',   price: 30,  unit: '個', icon: '🍞' },
                    { id: 'croissant',  name: '可頌',   price: 45,  unit: '個', icon: '🥐' },
                    { id: 'toast',      name: '吐司',   price: 35,  unit: '條', icon: '🍞' },
                    { id: 'muffin',     name: '馬芬',   price: 25,  unit: '個', icon: '🧁' },
                    { id: 'bun',        name: '小餐包', price: 20,  unit: '包', icon: '🥖' },
                    { id: 'cake_slice', name: '蛋糕',   price: 60,  unit: '片', icon: '🎂' },
                    { id: 'bagel',      name: '貝果',   price: 40,  unit: '個', icon: '🥯' },
                    { id: 'waffle',     name: '鬆餅',   price: 50,  unit: '片', icon: '🧇' },
                    { id: 'donut',      name: '甜甜圈', price: 30,  unit: '個', icon: '🍩' },
                    { id: 'cookie',     name: '餅乾',   price: 45,  unit: '包', icon: '🍪' },
                    { id: 'brownie',    name: '布朗尼', price: 35,  unit: '塊', icon: '🍫' },
                    { id: 'eclair',     name: '閃電泡芙', price: 55, unit: '個', icon: '🥧' },
                ],
            },
            dairy: {
                name: '乳品區', icon: '🥛',
                items: [
                    { id: 'milk',       name: '牛奶',   price: 50,  unit: '瓶', icon: '🥛' },
                    { id: 'yogurt',     name: '優格',   price: 40,  unit: '杯', icon: '🫙' },
                    { id: 'cheese',     name: '起司',   price: 80,  unit: '片', icon: '🧀' },
                    { id: 'butter',     name: '奶油',   price: 65,  unit: '盒', icon: '🧈' },
                    { id: 'cream',      name: '鮮奶油', price: 45,  unit: '瓶', icon: '🫙' },
                    { id: 'sm_egg',     name: '雞蛋',   price: 55,  unit: '盒', icon: '🥚' },
                    { id: 'soy_milk',   name: '豆漿',   price: 35,  unit: '瓶', icon: '🥛' },
                    { id: 'oat_milk',   name: '燕麥奶', price: 60,  unit: '瓶', icon: '🌾' },
                    { id: 'pudding',    name: '布丁',   price: 25,  unit: '個', icon: '🍮' },
                    { id: 'ice_coffee', name: '咖啡凍', price: 30,  unit: '杯', icon: '☕' },
                    { id: 'milk_tea_b', name: '奶茶',   price: 45,  unit: '瓶', icon: '🍵' },
                    { id: 'custard',    name: '卡士達', price: 55,  unit: '個', icon: '🥛' },
                ],
            },
            frozen: {
                name: '冷凍區', icon: '🧊',
                items: [
                    { id: 'dumpling',   name: '水餃',   price: 75,  unit: '包', icon: '🥟' },
                    { id: 'sausage',    name: '香腸',   price: 60,  unit: '包', icon: '🌭' },
                    { id: 'ice_cream',  name: '冰淇淋', price: 45,  unit: '支', icon: '🍦' },
                    { id: 'nugget',     name: '雞塊',   price: 80,  unit: '包', icon: '🍗' },
                    { id: 'fish_ball',  name: '魚丸',   price: 50,  unit: '包', icon: '🫙' },
                    { id: 'edamame',    name: '毛豆',   price: 35,  unit: '包', icon: '🫘' },
                    { id: 'wonton',     name: '餛飩',   price: 65,  unit: '包', icon: '🥟' },
                    { id: 'shrimp',     name: '蝦仁',   price: 90,  unit: '包', icon: '🦐' },
                    { id: 'pizza',      name: '披薩',   price: 55,  unit: '片', icon: '🍕' },
                    { id: 'corn_dog',   name: '熱狗',   price: 40,  unit: '條', icon: '🌽' },
                    { id: 'pork_bun',   name: '刈包',   price: 50,  unit: '個', icon: '🥙' },
                    { id: 'spring_roll',name: '春捲',   price: 35,  unit: '條', icon: '🌯' },
                ],
            },
        },
        missions: {
            easy: [
                { budget:  80, stalls: [{ stall:'bakery', count:1 }, { stall:'dairy',  count:1 }] },
                { budget: 100, stalls: [{ stall:'frozen', count:1 }, { stall:'bakery', count:1 }] },
                { budget:  80, stalls: [{ stall:'bakery', count:2 }] },
                { budget: 100, stalls: [{ stall:'dairy',  count:1 }, { stall:'bakery', count:1 }] },
                { budget: 100, stalls: [{ stall:'dairy',  count:2 }] },
                { budget: 100, stalls: [{ stall:'frozen', count:1 }, { stall:'dairy',  count:1 }] },
                { budget: 100, stalls: [{ stall:'bakery', count:1 }, { stall:'dairy',  count:1 }, { stall:'frozen', count:1 }] },
                { budget: 100, stalls: [{ stall:'frozen', count:2 }] },
            ],
            normal: [
                { budget: 150, stalls: [{ stall:'bakery', count:2 }, { stall:'dairy',  count:1 }] },
                { budget: 180, stalls: [{ stall:'dairy',  count:1 }, { stall:'frozen', count:2 }] },
                { budget: 160, stalls: [{ stall:'bakery', count:2 }, { stall:'frozen', count:1 }] },
                { budget: 200, stalls: [{ stall:'dairy',  count:2 }, { stall:'bakery', count:1 }] },
                { budget: 170, stalls: [{ stall:'bakery', count:1 }, { stall:'dairy',  count:1 }, { stall:'frozen', count:1 }] },
                { budget: 130, stalls: [{ stall:'bakery', count:3 }] },
                { budget: 190, stalls: [{ stall:'frozen', count:1 }, { stall:'bakery', count:2 }, { stall:'dairy',  count:1 }] },
                { budget: 200, stalls: [{ stall:'dairy',  count:2 }, { stall:'frozen', count:1 }] },
            ],
            hard: [
                { budget: 250, stalls: [{ stall:'bakery', count:2 }, { stall:'dairy',  count:1 }, { stall:'frozen', count:2 }] },
                { budget: 220, stalls: [{ stall:'bakery', count:3 }, { stall:'dairy',  count:2 }] },
                { budget: 280, stalls: [{ stall:'dairy',  count:2 }, { stall:'frozen', count:2 }, { stall:'bakery', count:1 }] },
                { budget: 300, stalls: [{ stall:'frozen', count:3 }, { stall:'dairy',  count:2 }] },
                { budget: 240, stalls: [{ stall:'bakery', count:3 }, { stall:'frozen', count:1 }, { stall:'dairy',  count:1 }] },
                { budget: 260, stalls: [{ stall:'dairy',  count:2 }, { stall:'frozen', count:2 }, { stall:'bakery', count:1 }] },
                { budget: 280, stalls: [{ stall:'bakery', count:2 }, { stall:'dairy',  count:2 }, { stall:'frozen', count:2 }] },
                { budget: 230, stalls: [{ stall:'bakery', count:4 }, { stall:'dairy',  count:2 }] },
            ],
        },
    },
    nightmarket: {
        name: '夜市美食', icon: '🏮',
        stalls: {
            snack: {
                name: '小吃攤', icon: '🍜',
                items: [
                    { id: 'oysternoodle',  name: '蚵仔麵線', price: 50,  unit: '碗', icon: '🍜' },
                    { id: 'beefnoodle',    name: '牛肉麵',   price: 80,  unit: '碗', icon: '🍲' },
                    { id: 'pancake',       name: '蔥抓餅',   price: 35,  unit: '份', icon: '🥞' },
                    { id: 'popcorn_chk',   name: '鹹酥雞',   price: 60,  unit: '份', icon: '🍗' },
                    { id: 'stinky_tofu',   name: '臭豆腐',   price: 45,  unit: '份', icon: '🫙' },
                    { id: 'takoyaki',      name: '章魚燒',   price: 50,  unit: '份', icon: '🐙' },
                    { id: 'chicken_chop',  name: '雞排',     price: 65,  unit: '份', icon: '🍖' },
                    { id: 'oyster_omelet', name: '蚵仔煎',   price: 60,  unit: '份', icon: '🍳' },
                    { id: 'sweet_potato_ball', name: '地瓜球', price: 30, unit: '份', icon: '🟠' },
                    { id: 'fishball_soup', name: '魚丸湯',   price: 40,  unit: '碗', icon: '🍥' },
                    { id: 'scallion_egg',  name: '蔥油餅',   price: 35,  unit: '份', icon: '🥚' },
                    { id: 'pork_pepper',   name: '胡椒餅',   price: 45,  unit: '個', icon: '🫔' },
                ],
            },
            drink: {
                name: '飲料攤', icon: '🧋',
                items: [
                    { id: 'bubble_tea',  name: '珍珠奶茶', price: 55, unit: '杯', icon: '🧋' },
                    { id: 'lemon_tea',   name: '檸檬茶',   price: 40, unit: '杯', icon: '🍋' },
                    { id: 'sugarcane',   name: '甘蔗汁',   price: 30, unit: '杯', icon: '🌿' },
                    { id: 'milk_tea',    name: '奶茶',     price: 45, unit: '杯', icon: '🍵' },
                    { id: 'smoothie',    name: '果汁',     price: 50, unit: '杯', icon: '🍹' },
                    { id: 'soymilk',     name: '豆花',     price: 35, unit: '碗', icon: '🥛' },
                    { id: 'papaya_milk', name: '木瓜牛奶', price: 50, unit: '杯', icon: '🥛' },
                    { id: 'iced_tea',    name: '紅茶',     price: 30, unit: '杯', icon: '🍶' },
                    { id: 'taro_milk',   name: '芋頭牛奶', price: 55, unit: '杯', icon: '🫗' },
                    { id: 'winter_melon',name: '冬瓜茶',   price: 25, unit: '杯', icon: '🍵' },
                    { id: 'mango_ice',   name: '芒果冰',   price: 60, unit: '杯', icon: '🥭' },
                    { id: 'plum_juice',  name: '梅子汁',   price: 30, unit: '杯', icon: '🫙' },
                ],
            },
            souvenir: {
                name: '紀念品攤', icon: '🎁',
                items: [
                    { id: 'phone_case',  name: '手機殼',   price: 80,  unit: '個', icon: '📱' },
                    { id: 'keychain',    name: '鑰匙圈',   price: 45,  unit: '個', icon: '🔑' },
                    { id: 'hairpin',     name: '髮夾',     price: 30,  unit: '個', icon: '💎' },
                    { id: 'bookmark',    name: '書籤',     price: 20,  unit: '個', icon: '📖' },
                    { id: 'magnet',      name: '冰箱磁鐵', price: 35,  unit: '個', icon: '🧲' },
                    { id: 'wristband',   name: '手環',     price: 60,  unit: '個', icon: '🪬' },
                    { id: 'postcard',    name: '明信片',   price: 25,  unit: '張', icon: '📮' },
                    { id: 'sticker',     name: '貼紙組',   price: 20,  unit: '包', icon: '🌟' },
                    { id: 'charm',       name: '吊飾',     price: 55,  unit: '個', icon: '🔮' },
                    { id: 'plush',       name: '可愛布偶', price: 90,  unit: '個', icon: '🧸' },
                    { id: 'badge_pin',   name: '徽章',     price: 30,  unit: '個', icon: '🏅' },
                    { id: 'fan',         name: '摺扇',     price: 50,  unit: '把', icon: '🪭' },
                    { id: 'lanyard',     name: '掛繩',     price: 40,  unit: '條', icon: '🎀' },
                    { id: 'tote_bag',    name: '帆布袋',   price: 75,  unit: '個', icon: '👜' },
                ],
            },
        },
        missions: {
            easy: [
                { budget:  80, stalls: [{ stall:'drink',    count:1 }, { stall:'souvenir', count:1 }] },
                { budget:  80, stalls: [{ stall:'snack',    count:1 }, { stall:'drink',    count:1 }] },
                { budget: 100, stalls: [{ stall:'souvenir', count:2 }] },
                { budget:  80, stalls: [{ stall:'snack',    count:1 }, { stall:'souvenir', count:1 }] },
                { budget: 100, stalls: [{ stall:'drink',    count:2 }] },
                { budget: 100, stalls: [{ stall:'snack',    count:1 }, { stall:'drink',    count:1 }] },
                { budget: 120, stalls: [{ stall:'snack',    count:1 }, { stall:'drink',    count:1 }, { stall:'souvenir', count:1 }] },
                { budget:  70, stalls: [{ stall:'souvenir', count:1 }, { stall:'drink',    count:1 }] },
            ],
            normal: [
                { budget: 150, stalls: [{ stall:'snack',    count:1 }, { stall:'drink',    count:2 }] },
                { budget: 180, stalls: [{ stall:'souvenir', count:2 }, { stall:'drink',    count:1 }] },
                { budget: 160, stalls: [{ stall:'snack',    count:2 }, { stall:'drink',    count:1 }] },
                { budget: 200, stalls: [{ stall:'snack',    count:1 }, { stall:'souvenir', count:2 }] },
                { budget: 170, stalls: [{ stall:'snack',    count:1 }, { stall:'drink',    count:1 }, { stall:'souvenir', count:1 }] },
                { budget: 140, stalls: [{ stall:'snack',    count:3 }] },
                { budget: 190, stalls: [{ stall:'drink',    count:2 }, { stall:'snack',    count:1 }, { stall:'souvenir', count:1 }] },
                { budget: 200, stalls: [{ stall:'souvenir', count:2 }, { stall:'snack',    count:1 }] },
            ],
            hard: [
                { budget: 250, stalls: [{ stall:'snack',    count:2 }, { stall:'drink',    count:1 }, { stall:'souvenir', count:2 }] },
                { budget: 220, stalls: [{ stall:'snack',    count:3 }, { stall:'souvenir', count:2 }] },
                { budget: 280, stalls: [{ stall:'souvenir', count:2 }, { stall:'drink',    count:2 }, { stall:'snack',    count:1 }] },
                { budget: 300, stalls: [{ stall:'drink',    count:3 }, { stall:'souvenir', count:3 }] },
                { budget: 240, stalls: [{ stall:'snack',    count:3 }, { stall:'drink',    count:1 }, { stall:'souvenir', count:1 }] },
                { budget: 260, stalls: [{ stall:'souvenir', count:3 }, { stall:'snack',    count:2 }] },
                { budget: 280, stalls: [{ stall:'snack',    count:2 }, { stall:'drink',    count:2 }, { stall:'souvenir', count:2 }] },
                { budget: 230, stalls: [{ stall:'drink',    count:4 }, { stall:'souvenir', count:2 }] },
            ],
        },
    },
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

// ── 市場類型動態切換（startGame 時設定）─────────────────────────
let _currentStalls   = B6_STALLS;
let _currentMissions = B6_MISSIONS;

// ── Game 物件 ────────────────────────────────────────────────────
// 金額語音轉換（安全版：若 number-speech-utils.js 未載入則退回原始格式）
const toTWD = v => typeof convertToTraditionalCurrency === 'function' ? convertToTraditionalCurrency(v) : `${v}元`;
// 數量語音：2 讀作「兩」，避免 TTS 唸成「貳」
const toCountSpeech = n => n === 2 ? '兩' : String(n);

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
            settings: { difficulty: null, rounds: null, clickMode: 'off', marketType: null, customItemsEnabled: false },
            game: {
                currentRound: 0,
                totalRounds: 5,
                correctCount: 0,
                streak: 0,
                missions: [],
                startTime: null,
                // current round state
                mission: null,
                collectedIds: new Set(),  // Set<itemId> 快速查詢
                selectedItems: [],        // [{stall, id}] 玩家自由選擇的商品
                activeStall: Object.keys(_currentStalls)[0],
                phase: 'shopping', // 'shopping' | 'payment' | 'change'
                paidAmount: 0,
                receipts: [],
                stallStats: {},   // { stallKey: totalSpent }
                exactPayments: 0, // 精準付款次數
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
            g.streak       = 0;
            g.missions     = [];
            g.startTime    = null;
            g.mission      = null;
            g.collectedIds = new Set();
            g.selectedItems = [];
            g.activeStall  = 'vegetable';
            g.phase        = 'shopping';
            g.paidAmount   = 0;
            g.receipts     = [];
            g.stallStats     = {};
            g.exactPayments  = 0;
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
                    <div class="settings-title-row b-settings-title-row">
                        <h1>單元B6：菜市場買菜</h1>
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
                        <div class="b-setting-group">
                            <div id="b6-custom-items-toggle-row" style="display:none;">
                                <label style="font-size:13px;color:#374151;font-weight:600;">🛠️ 自訂購物項目</label>
                                <div class="b-btn-group" id="b6-custom-items-group" style="margin-top:4px;">
                                    <button class="b-sel-btn active" data-custom="off">關閉</button>
                                    <button class="b-sel-btn" data-custom="on">開啟</button>
                                </div>
                                <div style="margin-top:4px;font-size:12px;color:#6b7280;">開啟後，可在購物頁面新增自訂商品，計入付款總金額</div>
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
                                <button class="b-sel-btn" data-val="6">6關</button>
                                <button class="b-sel-btn" id="b6-custom-rounds-btn">自訂選項</button>
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
                            <label class="b-setting-label">🏪 市場類型：</label>
                            <div class="b-btn-group" id="market-group">
                                <button class="b-sel-btn" data-market="traditional">🏪 傳統市場</button>
                                <button class="b-sel-btn" data-market="supermarket">🛒 超市</button>
                                <button class="b-sel-btn" data-market="nightmarket">🏮 夜市</button>
                                <button class="b-sel-btn" data-market="random">隨機 🎲</button>
                            </div>
                        </div>
                        <div class="b-setting-group">
                            <label style="font-size:13px;color:#6b7280;text-align:left;display:block;">
                                ✨ 依照購物清單在市場各攤位買菜，然後付款找零
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
                    const assistGroup = document.getElementById('assist-click-group');
                    const customToggle = document.getElementById('b6-custom-items-toggle-row');
                    if (assistGroup) {
                        if (btn.dataset.val === 'easy') {
                            assistGroup.style.display = '';
                            if (customToggle) customToggle.style.display = 'none';
                            this.state.settings.customItemsEnabled = false;
                            document.querySelectorAll('#b6-custom-items-group [data-custom]').forEach(b => b.classList.toggle('active', b.dataset.custom === 'off'));
                        } else {
                            assistGroup.style.display = 'none';
                            this.state.settings.clickMode = 'off';
                            if (customToggle) customToggle.style.display = '';
                        }
                    }
                    this._checkCanStart();
                }, {}, 'settings');
            });

            document.querySelectorAll('#rounds-group .b-sel-btn:not(#b6-custom-rounds-btn)').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#rounds-group .b-sel-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.rounds = parseInt(btn.dataset.val);
                    this._checkCanStart();
                }, {}, 'settings');
            });

            // 自訂關卡數
            const b6CustomRoundsBtn = document.getElementById('b6-custom-rounds-btn');
            if (b6CustomRoundsBtn) {
                Game.EventManager.on(b6CustomRoundsBtn, 'click', () => {
                    this._showSettingsCountNumpad('關卡數', (n) => {
                        document.querySelectorAll('#rounds-group .b-sel-btn').forEach(b => b.classList.remove('active'));
                        b6CustomRoundsBtn.classList.add('active');
                        b6CustomRoundsBtn.textContent = `${n}關`;
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
                const params = new URLSearchParams({ unit: 'b6' });
                window.open('../worksheet/index.html?' + params.toString(), 'Worksheet', 'width=900,height=700');
            }, {}, 'settings');

            document.querySelectorAll('#market-group .b-sel-btn').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#market-group .b-sel-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.state.settings.marketType = btn.dataset.market;
                    this._checkCanStart();
                }, {}, 'settings');
            });

            document.querySelectorAll('#b6-custom-items-group [data-custom]').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    document.querySelectorAll('#b6-custom-items-group [data-custom]').forEach(b => b.classList.remove('active'));
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
            if (btn) btn.disabled = !s.difficulty || !s.rounds || !s.marketType;
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

        // ── 8. 遊戲開始 ───────────────────────────────────────
        startGame() {
            Game.EventManager.removeByCategory('settings');
            Game.TimerManager.clearAll();

            // 設定當前市場類型（隨機模式：在 _pickMissions 逐關隨機）
            const mktKey = this.state.settings.marketType;
            if (mktKey === 'random') {
                // 隨機模式延遲到 _pickMissions 時再決定；先用傳統市場作預設
                _currentStalls   = B6_MARKETS.traditional.stalls;
                _currentMissions = B6_MARKETS.traditional.missions;
            } else {
                const mkt = B6_MARKETS[mktKey] || B6_MARKETS.traditional;
                _currentStalls   = mkt.stalls;
                _currentMissions = mkt.missions;
            }

            const s = this.state.settings;
            const g = this.state.game;
            g.currentRound = 0;
            g.totalRounds  = s.rounds;
            g.correctCount = 0;
            g.streak       = 0;
            g.startTime    = Date.now();
            g.missions     = this._pickMissions(s.rounds, s.difficulty);

            this.state.isEndingGame = false;
            this.state.isProcessing  = false;

            // 清除 showResults() 殘留的 overflow/height 行內樣式，防止閃爍
            const appEl = document.getElementById('app');
            if (appEl) {
                appEl.style.overflow = '';
                appEl.style.height   = '';
                appEl.style.minHeight = '';
            }
            document.body.style.overflow = '';

            this.renderRound();
        },

        _pickMissions(count, diff) {
            const mktKey  = this.state.settings.marketType;
            const mktKeys = ['traditional', 'supermarket', 'nightmarket'];
            if (mktKey === 'random') {
                const result = [];
                for (let i = 0; i < count; i++) {
                    const rKey = mktKeys[Math.floor(Math.random() * mktKeys.length)];
                    const pool = B6_MARKETS[rKey].missions[diff].slice().sort(() => Math.random() - 0.5);
                    result.push({ ...pool[0], _mktKey: rKey });
                }
                return result;
            }
            const pool = _currentMissions[diff].slice().sort(() => Math.random() - 0.5);
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
            AssistClick.deactivate();

            const g       = this.state.game;
            g.mission     = g.missions[g.currentRound];
            // 隨機模式：依本關 _mktKey 切換攤位資料
            if (g.mission._mktKey && B6_MARKETS[g.mission._mktKey]) {
                _currentStalls = B6_MARKETS[g.mission._mktKey].stalls;
            }
            g.collectedIds  = new Set();
            g.selectedItems = [];          // [{stall, id}] 本關自由選擇的商品
            g.activeStall = Object.keys(_currentStalls)[0];
            g.phase       = 'shopping';
            g.paidAmount  = 0;
            g.customItems = []; // 自訂購物項目
            g.p1HintMode  = false;  // 提示模式旗標
            g.p1HintItems = [];     // [{stall, id}] 提示建議商品

            this._renderShoppingUI();
            this._showMissionIntroModal(g.mission, g.currentRound + 1, () => {
                // afterClose callback（B1 pattern）
                if (this.state.settings.difficulty === 'easy') {
                    // 簡單模式：自動啟動提示高亮，再逐攤朗讀
                    this._b6P1ActivateHintMode();
                    Game.TimerManager.setTimeout(() => this._speakMissionItemsOneByOne(g.mission), 200, 'speech');
                }
            });

            if (this.state.settings.clickMode === 'on') {
                Game.TimerManager.setTimeout(() => AssistClick.activate(), 400, 'ui');
            }
        },

        // ── 關卡開場任務說明彈窗（B1 _showTaskModal afterClose pattern）──
        _showMissionIntroModal(mission, roundNum, afterClose) {
            const existing = document.getElementById('b6-mission-intro');
            if (existing) existing.remove();

            // 從 mission.stalls 建立攤位需求 HTML 與語音文字
            const stallsHTML = (mission.stalls || []).map(({ stall, count }) => {
                const stallInfo = _currentStalls[stall];
                if (!stallInfo) return '';
                return `<span class="b6-mi-item">${stallInfo.icon} ${stallInfo.name} <strong>× ${count}</strong> 樣</span>`;
            }).filter(Boolean).join('');
            const stallsText = (mission.stalls || []).map(({ stall, count }) => {
                const stallInfo = _currentStalls[stall];
                return stallInfo ? `${stallInfo.name}選${count}樣` : '';
            }).filter(Boolean).join('，');

            const mktKey = mission._mktKey || this.state.settings.marketType;
            const mkt = B6_MARKETS[mktKey] || B6_MARKETS.traditional;
            const mktLabel = `${mkt.icon} ${mkt.name}`;
            const isFirstRound = roundNum === 1;
            const roundTitle = mktLabel;

            const modal = document.createElement('div');
            modal.id = 'b6-mission-intro';
            modal.className = 'b6-mission-intro';
            modal.innerHTML = `
                <div class="b6-mi-card">
                    <div class="b6-mi-round">${roundTitle}</div>
                    <div class="b6-mi-title">🛒 今天的採購任務</div>
                    <div class="b6-mi-items">${stallsHTML}</div>
                    <div class="b6-mi-budget">預算：<b>${mission.budget}</b> 元</div>
                    <div class="b6-mi-hint" style="font-size:12px;color:#6b7280;margin-top:4px;">在預算內，從指定攤位各選指定數量的商品</div>
                    <div class="b6-mi-hint">點任意處開始</div>
                </div>`;
            document.body.appendChild(modal);
            const welcomePrefix = isFirstRound ? `歡迎來到${mkt.name}！` : '';
            let closed = false;
            const dismiss = () => {
                if (closed) return;
                closed = true;
                if (modal.parentNode) {
                    modal.classList.add('b6-mi-fade');
                    Game.TimerManager.setTimeout(() => {
                        if (modal.parentNode) modal.remove();
                        afterClose?.();
                    }, 350, 'ui');
                }
            };
            // 語音結束後關閉彈窗（B1 afterClose pattern）
            Game.Speech.speak(`${welcomePrefix}${stallsText}，預算${mission.budget}元。`, dismiss);
            modal.addEventListener('click', dismiss, { once: true });
            Game.TimerManager.setTimeout(dismiss, 3500, 'turnTransition');
        },

        // ── 簡單模式：攤位需求逐攤朗讀（B1 _speakItemsOneByOne pattern）─
        _speakMissionItemsOneByOne(mission) {
            const reqs = (mission.stalls || []).map(({ stall, count }) => {
                const stallInfo = _currentStalls[stall];
                return stallInfo ? { name: stallInfo.name, count } : null;
            }).filter(Boolean);
            if (!reqs.length) return;
            const totalCount = reqs.reduce((s, r) => s + r.count, 0);
            // 數字 2 在量詞前唸「兩」，避免 TTS 讀成「貳」

            let idx = 0;
            const speakNext = () => {
                if (idx >= reqs.length) {
                    Game.TimerManager.setTimeout(() => {
                        Game.Speech.speak(`共要選${toCountSpeech(totalCount)}樣商品，準備出發！`);
                    }, 300, 'speech');
                    return;
                }
                const req = reqs[idx++];
                Game.Speech.speak(`${req.name}，選${toCountSpeech(req.count)}樣`, () => {
                    Game.TimerManager.setTimeout(speakNext, 350, 'speech');
                });
            };
            speakNext();
        },

        // ── 第一頁提示入口（依難度路由）────────────────────────
        _b6P1ShowHint() {
            const diff = this.state.settings.difficulty;
            if (diff === 'hard')   { this._b6P1ShowHardHintModal(); return; }
            if (diff === 'normal') { this._b6P1ActivateHintMode(); return; }
            // easy 模式：提示已在開始時自動啟動，重新高亮即可
            this._b6P1ActivateHintMode();
        },

        // ── 貪婪法生成建議購買清單 ───────────────────────────
        _b6P1GenerateHintItems() {
            const g = this.state.game;
            let remaining = g.mission.budget;
            const result = [];
            for (const req of (g.mission.stalls || [])) {
                const stallItems = (_currentStalls[req.stall]?.items || [])
                    .slice()
                    .sort((a, b) => a.price - b.price);
                let picked = 0;
                for (const item of stallItems) {
                    if (picked >= req.count) break;
                    if (item.price <= remaining) {
                        result.push({ stall: req.stall, id: item.id });
                        remaining -= item.price;
                        picked++;
                    }
                }
            }
            return result;
        },

        // ── 更新「點這裡」高亮（當前攤位的提示商品）────────────
        _b6P1UpdateHintHighlights() {
            const g = this.state.game;
            // 先移除所有既有高亮
            document.querySelectorAll('.b6-product-btn').forEach(btn => {
                btn.classList.remove('b6-product-here-hint');
            });
            if (!g.p1HintMode) return;
            // 困難模式：只用彈窗提示，不在商品卡顯示「點這裡」
            if (this.state.settings.difficulty === 'hard') return;

            const diff = this.state.settings.difficulty;
            const hintItems = g.p1HintItems || [];
            // 僅處理當前攤位、且尚未選取的提示商品
            const unselected = hintItems.filter(h =>
                h.stall === g.activeStall &&
                !(g.selectedItems || []).some(si => si.stall === h.stall && si.id === h.id)
            );
            // 簡單模式：每次只高亮一個；普通模式：全部高亮
            const toHighlight = diff === 'easy' ? unselected.slice(0, 1) : unselected;
            toHighlight.forEach(h => {
                const btn = document.querySelector(`.b6-product-btn[data-item-id="${h.id}"]`);
                if (btn) btn.classList.add('b6-product-here-hint');
            });
        },

        // ── 啟動提示模式（生成 + 高亮）─────────────────────────
        _b6P1ActivateHintMode() {
            const g = this.state.game;
            g.p1HintMode = true;
            if (!g.p1HintItems || g.p1HintItems.length === 0) {
                g.p1HintItems = this._b6P1GenerateHintItems();
            }
            this._b6P1UpdateHintHighlights();
        },

        // ── 困難模式提示彈窗（重置非提示商品，顯示建議清單）──
        _b6P1ShowHardHintModal() {
            const g = this.state.game;
            // 生成建議清單
            const newHintItems = this._b6P1GenerateHintItems();
            g.p1HintItems = newHintItems;

            // 只重置不在提示清單中的已選商品
            if ((g.selectedItems || []).length > 0) {
                const nonHint = (g.selectedItems || []).filter(si =>
                    !newHintItems.some(h => h.stall === si.stall && h.id === si.id)
                );
                if (nonHint.length > 0) {
                    g.selectedItems = (g.selectedItems || []).filter(si =>
                        newHintItems.some(h => h.stall === si.stall && h.id === si.id)
                    );
                    this._updateShoppingUIPartial();
                }
            }

            const existing = document.getElementById('b6-p1-hard-hint-overlay');
            if (existing) existing.remove();

            // 建立彈窗 HTML（已被選擇的商品顯示淡化＋標記）
            const itemsHTML = newHintItems.map(({ stall, id }) => {
                const item = (_currentStalls[stall]?.items || []).find(i => i.id === id);
                if (!item) return '';
                const stallInfo = _currentStalls[stall];
                const alreadySel = (g.selectedItems || []).some(si => si.stall === stall && si.id === id);
                return `<div class="b6-p1hh-item${alreadySel ? ' b6-p1hh-item-done' : ''}">
                    <span class="b6-p1hh-icon">${item.icon}</span>
                    <span class="b6-p1hh-name">${item.name}</span>
                    <span class="b6-p1hh-stall">${stallInfo?.name || ''}</span>
                    <span class="b6-p1hh-price">${item.price} 元</span>
                    ${alreadySel ? '<span class="b6-p1hh-done-badge">✅ 已選擇</span>' : ''}
                </div>`;
            }).join('');

            const totalSuggested = newHintItems.reduce((s, h) => {
                const item = (_currentStalls[h.stall]?.items || []).find(i => i.id === h.id);
                return s + (item?.price || 0);
            }, 0);

            const overlay = document.createElement('div');
            overlay.id = 'b6-p1-hard-hint-overlay';
            overlay.className = 'b6-p1hh-overlay';
            overlay.innerHTML = `
                <div class="b6-p1hh-modal">
                    <div class="b6-p1hh-header">💡 購物建議清單</div>
                    <div class="b6-p1hh-subtext">以下是一組符合預算的購買方案，請按照提示選購。</div>
                    <div class="b6-p1hh-list">${itemsHTML}</div>
                    <div class="b6-p1hh-total">合計：<strong>${totalSuggested}</strong> 元（預算 ${g.mission.budget} 元）</div>
                    <button class="b6-p1hh-close-btn" id="b6-p1hh-close">我知道了，開始購物</button>
                </div>`;
            document.body.appendChild(overlay);

            // 語音說明（跳過已選項）
            const needSpeech = newHintItems.filter(h =>
                !(g.selectedItems || []).some(si => si.stall === h.stall && si.id === h.id)
            ).map(({ stall, id }) => {
                const item = (_currentStalls[stall]?.items || []).find(i => i.id === id);
                const stallInfo = _currentStalls[stall];
                return item ? `${stallInfo?.name || ''}的${item.name}${item.price}元` : '';
            }).filter(Boolean);
            if (needSpeech.length > 0) {
                Game.Speech.speak(`建議購買：${needSpeech.join('，')}`);
            } else {
                Game.Speech.speak('所有建議商品都已選擇，可以結帳了！');
            }

            // 關閉後啟動提示模式（困難模式不顯示「點這裡」，只設旗標）
            const closeBtn = document.getElementById('b6-p1hh-close');
            const dismiss = () => {
                overlay.remove();
                g.p1HintMode = true;
                // 困難模式不呼叫 _b6P1UpdateHintHighlights（不顯示卡片高亮）
            };
            if (closeBtn) closeBtn.addEventListener('click', dismiss, { once: true });
            overlay.addEventListener('click', (e) => { if (e.target === overlay) dismiss(); });
        },

        // ── 連勝徽章（B3 streak pattern）─────────────────────
        _showStreakBadge(streak) {
            const existing = document.getElementById('b6-streak-badge');
            if (existing) existing.remove();
            const badge = document.createElement('div');
            badge.id = 'b6-streak-badge';
            badge.className = 'b6-streak-badge';
            const label = streak === 3 ? '🔥 3連勝！' : '⚡ 5連勝！';
            const msg   = streak === 3 ? '繼續加油！' : '太厲害了！';
            badge.innerHTML = `<div class="b6-sb-inner"><div class="b6-sb-label">${label}</div><div class="b6-sb-msg">${msg}</div></div>`;
            document.body.appendChild(badge);
            Game.Speech.speak(streak === 3 ? '三連勝，繼續加油！' : '五連勝，太厲害了！');
            Game.TimerManager.setTimeout(() => {
                badge.classList.add('b6-sb-fade');
                Game.TimerManager.setTimeout(() => { if (badge.parentNode) badge.remove(); }, 400, 'ui');
            }, 1600, 'ui');
        },

        // ── 10. 購物畫面 ──────────────────────────────────────
        _renderShoppingUI() {
            const g       = this.state.game;
            const mission = g.mission;
            const total   = this._calcMissionTotal();
            const budget  = mission.budget;
            const budgetOver = total > budget;

            // 任務卡：顯示每個攤位的選購進度
            const stallReqsHTML = (mission.stalls || []).map(({ stall, count }) => {
                const stallInfo = _currentStalls[stall];
                if (!stallInfo) return '';
                const selected = (g.selectedItems || []).filter(i => i.stall === stall);
                const done = selected.length >= count;
                const active = stall === g.activeStall;
                // 列出已選商品名稱
                const selectedNames = selected.map(si => {
                    const item = stallInfo.items.find(i => i.id === si.id);
                    return item ? `<span class="b6-sr-sel-item">${item.icon} ${item.name}</span>` : '';
                }).join('');
                return `
                <div class="b6-stall-req${done ? ' done' : ''}${active ? ' active' : ''}" data-req-stall="${stall}">
                    <span class="b6-sr-icon">${stallInfo.icon}</span>
                    <span class="b6-sr-name">${stallInfo.name}</span>
                    <span class="b6-sr-prog">${selected.length}/${count}${done ? ' ✅' : ''}</span>
                    ${selectedNames ? `<div class="b6-sr-items">${selectedNames}</div>` : ''}
                </div>`;
            }).join('');

            const stallKeys = Object.keys(_currentStalls);
            const stallIdx  = stallKeys.indexOf(g.activeStall);
            const isFirst   = stallIdx <= 0;
            const isLast    = stallIdx >= stallKeys.length - 1;

            // 攤位點狀進度指示
            const stallDotsHTML = stallKeys.map((k) => {
                const req = (mission.stalls || []).find(r => r.stall === k);
                const hasReq = !!req;
                const selCount = (g.selectedItems || []).filter(i => i.stall === k).length;
                const done = hasReq && selCount >= req.count;
                const active = k === g.activeStall;
                return `<span class="b6-snav-dot${active ? ' active' : ''}${done ? ' done' : ''}${hasReq && !done ? ' has-items' : ''}" title="${_currentStalls[k].name}"></span>`;
            }).join('');

            // 商品網格：已選商品可點選取消；超出預算的商品標示警告
            const activeStallReq = (mission.stalls || []).find(r => r.stall === g.activeStall);
            const activeQuota = activeStallReq ? activeStallReq.count : 0;
            const activeSelCount = (g.selectedItems || []).filter(i => i.stall === g.activeStall).length;
            const stallQuotaFull = activeSelCount >= activeQuota;

            const stallItems = _currentStalls[g.activeStall].items;
            const productsHTML = stallItems.map(item => {
                const isSelected = (g.selectedItems || []).some(si => si.stall === g.activeStall && si.id === item.id);
                const wouldExceed = !isSelected && (total + item.price) > budget;
                const isQuotaFull = !isSelected && stallQuotaFull;
                let extraClass = '';
                if (isSelected)     extraClass = 'selected';
                else if (wouldExceed) extraClass = 'over-budget';
                else if (isQuotaFull) extraClass = 'quota-full';
                return `
                <button class="b6-product-btn${extraClass ? ' ' + extraClass : ''}"
                        data-item-id="${item.id}" data-stall="${g.activeStall}" data-price="${item.price}">
                    <span class="b6-product-icon">${item.icon}</span>
                    <span class="b6-product-name">${item.name}</span>
                    <span class="b6-product-price">${item.price} 元</span>
                    <span class="b6-product-unit">/ ${item.unit}</span>
                    ${isSelected ? '<span class="b6-product-collected-mark">✅</span>' : ''}
                    ${wouldExceed ? '<span class="b6-product-over-mark">⚠️</span>' : ''}
                </button>`;
            }).join('');

            const missionDone = this._isMissionComplete();
            const totalRequired = this._getTotalRequired();
            const selectedCount = (g.selectedItems || []).length;
            const mktKey = this.state.settings.marketType;
            const mktInfo = mktKey === 'random' ? { icon: '🎲', name: '隨機市場' } : (B6_MARKETS[mktKey] || { icon: '🛒', name: '菜市場' });

            // 已選商品清單（右側結帳卡）
            const selectedItemsHTML = (g.selectedItems || []).length > 0
                ? (g.selectedItems || []).map(({ stall, id }) => {
                    const item = (_currentStalls[stall]?.items || []).find(i => i.id === id);
                    if (!item) return '';
                    return `<div class="b6-cart-item">
                        <span class="b6-ci-icon">${item.icon}</span>
                        <span class="b6-ci-name">${item.name}</span>
                        <span class="b6-ci-price">${item.price} 元</span>
                    </div>`;
                }).join('')
                : `<div class="b6-cart-empty">尚未選購商品</div>`;

            const app = document.getElementById('app');
            app.style.opacity = '0';
            app.innerHTML = `
            <div class="b-header">
                <div class="b-header-left">
                    <span class="b-header-unit">${mktInfo.icon} ${mktInfo.name}</span>
                </div>
                <div class="b-header-center">${{ easy: '簡單模式', normal: '普通模式', hard: '困難模式' }[this.state.settings.difficulty] || ''}</div>
                <div class="b-header-right">
                    <span class="b-progress">第 ${g.currentRound + 1} 關 / 共 ${g.totalRounds} 關</span>
                    <button class="b-reward-btn" onclick="if(typeof RewardLauncher!=='undefined'){RewardLauncher.open();}else{window.open('../reward/index.html','RewardSystem','width=1200,height=800');}">🎁 獎勵</button>
                    <button class="b-back-btn" onclick="Game.showSettings()">返回設定</button>
                </div>
            </div>
            <div class="game-container">

                <!-- 任務卡（標題 + 預算） -->
                <div class="b6-task-card">
                    <div class="b6-task-hdr">
                        <div class="b6-task-hdr-left">
                            <div class="b6-task-hdr-text">
                                <div class="b6-task-title">📋 今天的採購任務<button class="b6-replay-btn" id="replay-speech-btn" title="重播語音">🔊</button></div>
                                <div class="b6-task-budget">預算 <strong class="${budgetOver ? 'b6-budget-over' : ''}">${budget} 元</strong>${budgetOver ? `<span class="b6-budget-warning"> ⚠️ 超出！</span>` : ''}</div>
                            </div>
                        </div>
                        <div class="b6-task-hdr-right">
                            <img src="../images/index/educated_money_bag_character.png" class="b6-task-mascot" onerror="this.style.display='none'" alt="">
                            <button class="b6-p1-hint-btn" id="b6-p1-hint-btn">💡 提示</button>
                        </div>
                    </div>
                </div>

                <!-- 三欄容器：左（攤位進度卡）+ 中（市場卡）+ 右（結帳卡）-->
                <div class="b6-market-checkout-row">

                    <!-- 左側：攤位進度卡 -->
                    <div class="b6-stall-card">
                        <div class="b6-sc-header">🗒️ 採購進度</div>
                        <div class="b6-task-stall-reqs">
                            ${stallReqsHTML}
                        </div>
                    </div>

                    <!-- 中間：市場卡（左右按鈕切換攤位） -->
                    <div class="b6-market-card">
                        <div class="b6-stall-nav">
                            <button class="b6-snav-btn" id="b6-stall-prev" ${isFirst ? 'disabled' : ''}>◀</button>
                            <div class="b6-snav-center">
                                <div class="b6-snav-label">${_currentStalls[g.activeStall].icon} ${_currentStalls[g.activeStall].name}${activeQuota > 0 ? `<span class="b6-snav-quota"> (${activeSelCount}/${activeQuota})</span>` : ''}</div>
                                <div class="b6-snav-dots">${stallDotsHTML}</div>
                            </div>
                            <button class="b6-snav-btn" id="b6-stall-next" ${isLast ? 'disabled' : ''}>▶</button>
                        </div>
                        <div class="b6-stall-panel">
                            <div class="b6-products-grid">${productsHTML}</div>
                        </div>
                    </div>

                    <!-- 右側：結帳卡 -->
                    <div class="b6-checkout-strip">
                        <div class="b6-cstrip-row1">
                            <span class="b6-cstrip-count">🛒 <strong>${selectedCount}</strong> / ${totalRequired} 件</span>
                            <span class="b6-cstrip-total${budgetOver ? ' over' : ''}">小計：<span class="b6-basket-total">${total}</span> 元</span>
                        </div>
                        <div class="b6-cart-items" id="b6-cart-items">
                            ${selectedItemsHTML}
                        </div>
                        <button class="b6-checkout-btn" id="b6-checkout-btn" ${missionDone ? '' : 'disabled'}>
                            前往結帳 →
                        </button>
                    </div>

                </div><!-- /.b6-market-checkout-row -->

                <!-- 自訂購物項目 -->
                <div id="b6-custom-items-list"></div>
                ${this.state.settings.customItemsEnabled && this.state.settings.difficulty !== 'easy' ? this._renderCustomItemsPanel() : ''}
            </div>`;

            this._bindShoppingEvents();

            // 淡入消除閃爍
            requestAnimationFrame(() => {
                app.style.transition = 'opacity 0.18s ease';
                app.style.opacity    = '1';
                Game.TimerManager.setTimeout(() => {
                    app.style.transition = '';
                    app.style.opacity    = '';
                }, 200, 'ui');
            });
        },

        _renderCustomItemsPanel() {
            return `
            <div class="b6-custom-items-panel" id="b6-cip-panel">
                <div class="b6-cip-header">🛍️ 自訂購物項目</div>
                <div class="b6-cip-add-row">
                    <input type="text" id="b6-cip-name-input" placeholder="商品名稱" maxlength="8" class="b6-cip-input">
                    <input type="number" id="b6-cip-price-input" placeholder="金額" min="1" max="9999" class="b6-cip-input b6-cip-price-inp">
                    <button class="b6-cip-add-btn" id="b6-cip-add-btn">＋ 新增</button>
                </div>
            </div>`;
        },

        _bindCustomItemsPanel() {
            const g = this.state.game;
            const addBtn = document.getElementById('b6-cip-add-btn');
            if (!addBtn) return;
            Game.EventManager.on(addBtn, 'click', () => {
                const nameEl  = document.getElementById('b6-cip-name-input');
                const priceEl = document.getElementById('b6-cip-price-input');
                const name  = nameEl?.value.trim();
                const price = parseInt(priceEl?.value);
                if (!name || !price || price < 1) return;
                const newItem = { name, price, icon: '🛍️', _deleted: false };
                g.customItems.push(newItem);
                const ci  = g.customItems.length - 1;
                const list = document.getElementById('b6-custom-items-list');
                const row = document.createElement('div');
                row.className = 'b6-list-item b6-cip-custom-row';
                row.id = `b6-custom-item-${ci}`;
                row.innerHTML = `<span class="b6-list-icon">${newItem.icon}</span><span class="b6-list-name">${name} <span style="color:#6b7280;font-size:12px;">${price}元</span></span><button class="b6-cip-del-btn" data-custom-idx="${ci}">✕</button>`;
                list.appendChild(row);
                const delBtn = row.querySelector('[data-custom-idx]');
                Game.EventManager.on(delBtn, 'click', (e) => {
                    e.stopPropagation();
                    g.customItems[ci]._deleted = true;
                    row.remove();
                    // 更新購物籃小計
                    const basketTotalEl = document.querySelector('.b6-basket-total');
                    if (basketTotalEl) basketTotalEl.textContent = this._calcMissionTotal();
                }, {}, 'gameUI');
                if (nameEl) nameEl.value = '';
                if (priceEl) priceEl.value = '';
                // 更新購物籃小計
                const basketTotalEl = document.querySelector('.b6-basket-total');
                if (basketTotalEl) basketTotalEl.textContent = this._calcMissionTotal();
                this.audio.play('click');
            }, {}, 'gameUI');
        },

        _bindShoppingEvents() {
            const g = this.state.game;

            // 攤位左右切換
            const _stallKeys = Object.keys(_currentStalls);

            // ── 攤位商品格局部更新（不重建整頁，只換商品面板）──
            const _refreshStallPanel = this._b6RefreshPanel = () => {
                const mission = g.mission;
                const total   = this._calcMissionTotal();
                const budget  = mission.budget;
                const activeStallReq = (mission.stalls || []).find(r => r.stall === g.activeStall);
                const activeQuota    = activeStallReq ? activeStallReq.count : 0;
                const activeSelCount = (g.selectedItems || []).filter(i => i.stall === g.activeStall).length;
                const stallQuotaFull = activeSelCount >= activeQuota;
                const stallItems     = _currentStalls[g.activeStall].items;
                const productsHTML = stallItems.map(item => {
                    const isSelected  = (g.selectedItems || []).some(si => si.stall === g.activeStall && si.id === item.id);
                    const wouldExceed = !isSelected && (total + item.price) > budget;
                    const isQuotaFull = !isSelected && stallQuotaFull;
                    let extraClass = '';
                    if (isSelected)      extraClass = 'selected';
                    else if (wouldExceed) extraClass = 'over-budget';
                    else if (isQuotaFull) extraClass = 'quota-full';
                    return `<button class="b6-product-btn${extraClass ? ' ' + extraClass : ''}"
                        data-item-id="${item.id}" data-stall="${g.activeStall}" data-price="${item.price}">
                        <span class="b6-product-icon">${item.icon}</span>
                        <span class="b6-product-name">${item.name}</span>
                        <span class="b6-product-price">${item.price} 元</span>
                        <span class="b6-product-unit">/ ${item.unit}</span>
                        ${isSelected  ? '<span class="b6-product-collected-mark">✅</span>' : ''}
                        ${wouldExceed ? '<span class="b6-product-over-mark">⚠️</span>' : ''}
                    </button>`;
                }).join('');
                const panelEl = document.querySelector('.b6-stall-panel');
                if (panelEl) panelEl.innerHTML = `<div class="b6-products-grid">${productsHTML}</div>`;
                // 更新導航按鈕狀態
                const stallIdx = _stallKeys.indexOf(g.activeStall);
                const prevBtn = document.getElementById('b6-stall-prev');
                const nextBtn = document.getElementById('b6-stall-next');
                if (prevBtn) prevBtn.disabled = stallIdx <= 0;
                if (nextBtn) nextBtn.disabled = stallIdx >= _stallKeys.length - 1;
                // 重新綁定新商品的點擊事件
                _bindProductBtns();
                // 更新導航標籤、dots、任務卡、結帳列
                this._updateShoppingUIPartial();
                // 提示高亮（攤位切換後重新標記）
                this._b6P1UpdateHintHighlights();
            };

            const _switchStall = (newKey) => {
                if (g.activeStall === newKey) return;
                // 顯示離開攤位的小計
                const leavingStall = g.activeStall;
                const selectedHere = (g.selectedItems || []).filter(i => i.stall === leavingStall);
                if (selectedHere.length > 0) {
                    const subtotal = selectedHere.reduce((s, si) => {
                        const found = (_currentStalls[leavingStall]?.items || []).find(p => p.id === si.id);
                        return s + (found?.price || 0);
                    }, 0);
                    this._showStallSubtotal(_currentStalls[leavingStall].name, subtotal);
                }
                this.audio.play('click');
                g.activeStall = newKey;
                // 切換至已完成攤位提示
                const destReq = (g.mission.stalls || []).find(r => r.stall === newKey);
                const destSelCount = (g.selectedItems || []).filter(i => i.stall === newKey).length;
                if (destReq && destSelCount >= destReq.count) {
                    const toast = document.createElement('div');
                    toast.className = 'b6-stall-done-toast';
                    toast.textContent = `✅ ${_currentStalls[newKey]?.name || ''} 已選購完畢！`;
                    document.body.appendChild(toast);
                    Game.TimerManager.setTimeout(() => { toast.classList.add('b6-sdt-fade'); }, 1000, 'ui');
                    Game.TimerManager.setTimeout(() => { if (document.body.contains(toast)) toast.remove(); }, 1600, 'ui');
                }
                // 攤位語音引導
                const stallInfo = _currentStalls[newKey];
                const remaining = destReq ? (destReq.count - destSelCount) : 0;
                Game.Speech.speak(remaining > 0
                    ? `${stallInfo.name}，還要選${remaining}樣`
                    : `${stallInfo.name}，這裡已選購完畢！`);
                // 只替換商品面板，不重建整頁
                _refreshStallPanel();
            };

            const prevBtn = document.getElementById('b6-stall-prev');
            const nextBtn = document.getElementById('b6-stall-next');
            if (prevBtn) {
                Game.EventManager.on(prevBtn, 'click', () => {
                    const idx = _stallKeys.indexOf(g.activeStall);
                    if (idx > 0) _switchStall(_stallKeys[idx - 1]);
                }, {}, 'gameUI');
            }
            if (nextBtn) {
                Game.EventManager.on(nextBtn, 'click', () => {
                    const idx = _stallKeys.indexOf(g.activeStall);
                    if (idx < _stallKeys.length - 1) _switchStall(_stallKeys[idx + 1]);
                }, {}, 'gameUI');
            }

            // 商品點擊（切換選取/取消，含配額與預算檢查）
            // 抽成具名函數，攤位切換時可重新綁定新商品
            const _bindProductBtns = () => {
            document.querySelectorAll('.b6-product-btn').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    const itemId = btn.dataset.itemId;
                    const stall  = btn.dataset.stall;
                    const price  = parseInt(btn.dataset.price) || 0;
                    const itemData = (_currentStalls[stall]?.items || []).find(i => i.id === itemId);
                    const itemName = itemData?.name || '這個商品';

                    const existingIdx = (g.selectedItems || []).findIndex(si => si.stall === stall && si.id === itemId);
                    const isSelected = existingIdx !== -1;

                    if (isSelected) {
                        // 取消選取
                        g.selectedItems.splice(existingIdx, 1);
                        this.audio.play('click');
                        Game.Speech.speak(`取消選取${itemName}`);
                        this._updateShoppingUIPartial();
                        return;
                    }

                    // 檢查此攤位的配額
                    const stallReq = (g.mission.stalls || []).find(r => r.stall === stall);
                    if (!stallReq) {
                        // 此攤位本關不需要購買
                        this.audio.play('error');
                        const tipId = 'b6-wrong-tip';
                        let tip = document.getElementById(tipId);
                        if (!tip) { tip = document.createElement('div'); tip.id = tipId; document.body.appendChild(tip); }
                        tip.className = 'b6-wrong-tip';
                        tip.innerHTML = `<div class="b6-wt-msg">❌ 這個攤位今天不在採購計畫中</div>`;
                        Game.Speech.speak(`這個攤位今天不需要買東西`);
                        Game.TimerManager.clearByCategory('wrongTip');
                        Game.TimerManager.setTimeout(() => { tip?.remove(); }, 2400, 'wrongTip');
                        return;
                    }
                    const stallSelCount = (g.selectedItems || []).filter(i => i.stall === stall).length;
                    if (stallSelCount >= stallReq.count) {
                        // 配額已滿：提示要換其他商品或取消其中一個
                        this.audio.play('error');
                        const tipId = 'b6-wrong-tip';
                        let tip = document.getElementById(tipId);
                        if (!tip) { tip = document.createElement('div'); tip.id = tipId; document.body.appendChild(tip); }
                        tip.className = 'b6-wrong-tip';
                        tip.innerHTML = `<div class="b6-wt-msg">這個攤位只需要選 ${stallReq.count} 樣</div><div class="b6-wt-hint">點已選的商品可以取消</div>`;
                        Game.Speech.speak(`${_currentStalls[stall]?.name || ''}只需要選${toCountSpeech(stallReq.count)}樣，點已選的商品可以取消`);
                        Game.TimerManager.clearByCategory('wrongTip');
                        Game.TimerManager.setTimeout(() => { tip?.remove(); }, 2400, 'wrongTip');
                        return;
                    }

                    // 檢查預算
                    const currentTotal = this._calcMissionTotal();
                    if (currentTotal + price > g.mission.budget) {
                        this.audio.play('error');
                        const over = (currentTotal + price) - g.mission.budget;
                        const tipId = 'b6-wrong-tip';
                        let tip = document.getElementById(tipId);
                        if (!tip) { tip = document.createElement('div'); tip.id = tipId; document.body.appendChild(tip); }
                        tip.className = 'b6-wrong-tip';
                        tip.innerHTML = `<div class="b6-wt-msg">⚠️ 超出預算 ${over} 元！</div><div class="b6-wt-hint">換一個便宜一點的商品</div>`;
                        Game.Speech.speak(`${itemName}${price}元，超出預算${over}元，請換一個便宜一點的`);
                        Game.TimerManager.clearByCategory('wrongTip');
                        Game.TimerManager.setTimeout(() => { tip?.remove(); }, 2800, 'wrongTip');
                        return;
                    }

                    // 提示模式守衛：點了非建議商品則報錯
                    if (g.p1HintMode) {
                        const isHintItem = (g.p1HintItems || []).some(h => h.stall === stall && h.id === itemId);
                        if (!isHintItem) {
                            this.audio.play('error');
                            const tipId = 'b6-wrong-tip';
                            let tip = document.getElementById(tipId);
                            if (!tip) { tip = document.createElement('div'); tip.id = tipId; document.body.appendChild(tip); }
                            tip.className = 'b6-wrong-tip';
                            tip.innerHTML = `<div class="b6-wt-msg">❌ 請選擇提示的商品</div><div class="b6-wt-hint">看看橘色「點這裡」提示</div>`;
                            Game.Speech.speak('不對喔，請選擇提示的商品');
                            Game.TimerManager.clearByCategory('wrongTip');
                            Game.TimerManager.setTimeout(() => { tip?.remove(); }, 2400, 'wrongTip');
                            return;
                        }
                    }

                    // 加入選取
                    if (!g.selectedItems) g.selectedItems = [];
                    g.selectedItems.push({ stall, id: itemId });
                    g.collectedIds.add(itemId); // 向後相容（結果頁使用）
                    this.audio.play('correct');
                    // 飛出收據動畫
                    if (itemData) this._showItemReceiptFlyout(btn, itemData);
                    Game.Speech.speak(`${itemName}，${price}元`);
                    // 收集進度動畫
                    this._showCollectionProgress(g.selectedItems.length, this._getTotalRequired());
                    // 更新 UI
                    this._updateShoppingUIPartial();

                    // 簡單模式：當前攤位配額已滿 → 自動切換到下一個待買攤位
                    if (this.state.settings.difficulty === 'easy' && g.p1HintMode) {
                        const req = (g.mission.stalls || []).find(r => r.stall === stall);
                        const nowCount = (g.selectedItems || []).filter(i => i.stall === stall).length;
                        if (req && nowCount >= req.count) {
                            const nextReq = (g.mission.stalls || []).find(r => {
                                if (r.stall === stall) return false;
                                return (g.selectedItems || []).filter(i => i.stall === r.stall).length < r.count;
                            });
                            if (nextReq && g.activeStall !== nextReq.stall) {
                                Game.TimerManager.setTimeout(() => {
                                    g.activeStall = nextReq.stall;
                                    this._b6RefreshPanel?.();
                                    const newStallInfo = _currentStalls[nextReq.stall];
                                    Game.Speech.speak(`前往${newStallInfo.name}`);
                                }, 700, 'ui');
                            }
                        }
                    }
                }, {}, 'gameUI');
            });
            }; // end _bindProductBtns
            _bindProductBtns();

            // 結帳按鈕
            const checkoutBtn = document.getElementById('b6-checkout-btn');
            Game.EventManager.on(checkoutBtn, 'click', () => {
                if (this.state.isProcessing) return;
                this._showCheckoutConfirm(g, () => {
                    g.phase = 'payment';
                    g.paidAmount = 0;
                    this._renderPaymentUI();
                });
            }, {}, 'gameUI');
            // 語音重播
            const replayBtn = document.getElementById('replay-speech-btn');
            if (replayBtn) {
                Game.EventManager.on(replayBtn, 'click', () => {
                    this.audio.play('click');
                    this._speakMissionItemsOneByOne(this.state.game.mission);
                }, {}, 'gameUI');
            }
            const p1HintBtn = document.getElementById('b6-p1-hint-btn');
            if (p1HintBtn) {
                Game.EventManager.on(p1HintBtn, 'click', () => {
                    this.audio.play('click');
                    this._b6P1ShowHint();
                }, {}, 'gameUI');
            }
            // 自訂購物項目面板
            if (this.state.settings.customItemsEnabled && this.state.settings.difficulty !== 'easy') {
                this._bindCustomItemsPanel();
            }
        },

        // ── 局部更新購物 UI（不全重繪，只更新任務卡/結帳列/商品狀態）──
        _updateShoppingUIPartial() {
            const g      = this.state.game;
            const mission = g.mission;
            const total  = this._calcMissionTotal();
            const budget = mission.budget;
            const budgetOver = total > budget;
            const missionDone = this._isMissionComplete();
            const totalRequired = this._getTotalRequired();
            const selectedCount = (g.selectedItems || []).length;

            // 更新預算顯示
            const budgetEl = document.querySelector('.b6-task-budget');
            if (budgetEl) {
                budgetEl.innerHTML = `預算 <strong class="${budgetOver ? 'b6-budget-over' : ''}">${budget} 元</strong>${budgetOver ? `<span class="b6-budget-warning"> ⚠️ 超出！</span>` : ''}`;
            }

            // 更新攤位需求列（任務卡）
            (mission.stalls || []).forEach(({ stall, count }) => {
                const reqEl = document.querySelector(`.b6-stall-req[data-req-stall="${stall}"]`);
                if (!reqEl) return;
                const selected = (g.selectedItems || []).filter(i => i.stall === stall);
                const done = selected.length >= count;
                reqEl.classList.toggle('done', done);
                reqEl.classList.toggle('active', stall === g.activeStall);
                const progEl = reqEl.querySelector('.b6-sr-prog');
                if (progEl) progEl.textContent = `${selected.length}/${count}${done ? ' ✅' : ''}`;
                // 更新已選商品名稱
                const stallInfo = _currentStalls[stall];
                const selectedNames = selected.map(si => {
                    const item = stallInfo?.items.find(i => i.id === si.id);
                    return item ? `<span class="b6-sr-sel-item">${item.icon} ${item.name}</span>` : '';
                }).join('');
                let itemsEl = reqEl.querySelector('.b6-sr-items');
                if (selectedNames) {
                    if (!itemsEl) { itemsEl = document.createElement('div'); itemsEl.className = 'b6-sr-items'; reqEl.appendChild(itemsEl); }
                    itemsEl.innerHTML = selectedNames;
                } else if (itemsEl) {
                    itemsEl.remove();
                }
            });

            // 更新攤位標題配額顯示
            const navLabelEl = document.querySelector('.b6-snav-label');
            if (navLabelEl) {
                const activeReq = (mission.stalls || []).find(r => r.stall === g.activeStall);
                const activeSelCount = (g.selectedItems || []).filter(i => i.stall === g.activeStall).length;
                const activeQuota = activeReq ? activeReq.count : 0;
                const stallInfo = _currentStalls[g.activeStall];
                navLabelEl.innerHTML = `${stallInfo?.icon || ''} ${stallInfo?.name || ''}${activeQuota > 0 ? `<span class="b6-snav-quota"> (${activeSelCount}/${activeQuota})</span>` : ''}`;
            }

            // 更新每個商品按鈕的狀態
            const activeStallReq = (mission.stalls || []).find(r => r.stall === g.activeStall);
            const activeQuota = activeStallReq ? activeStallReq.count : 0;
            const activeSelCount = (g.selectedItems || []).filter(i => i.stall === g.activeStall).length;
            const stallQuotaFull = activeSelCount >= activeQuota;
            document.querySelectorAll('.b6-product-btn').forEach(btn => {
                const itemId = btn.dataset.itemId;
                const stall  = btn.dataset.stall;
                const price  = parseInt(btn.dataset.price) || 0;
                const isSelected = (g.selectedItems || []).some(si => si.stall === stall && si.id === itemId);
                const wouldExceed = !isSelected && (total + price) > budget;
                const isQuotaFull = !isSelected && stallQuotaFull;
                btn.className = 'b6-product-btn' + (isSelected ? ' selected' : wouldExceed ? ' over-budget' : isQuotaFull ? ' quota-full' : '');
                let mark = btn.querySelector('.b6-product-collected-mark');
                let overMark = btn.querySelector('.b6-product-over-mark');
                if (isSelected && !mark) {
                    mark = document.createElement('span'); mark.className = 'b6-product-collected-mark'; mark.textContent = '✅';
                    btn.appendChild(mark);
                } else if (!isSelected && mark) mark.remove();
                if (wouldExceed && !overMark) {
                    overMark = document.createElement('span'); overMark.className = 'b6-product-over-mark'; overMark.textContent = '⚠️';
                    btn.appendChild(overMark);
                } else if (!wouldExceed && overMark) overMark.remove();
            });

            // 更新 nav dots
            const stallKeys = Object.keys(_currentStalls);
            const dots = document.querySelectorAll('.b6-snav-dot');
            stallKeys.forEach((k, i) => {
                const dot = dots[i];
                if (!dot) return;
                const req = (mission.stalls || []).find(r => r.stall === k);
                const hasReq = !!req;
                const selCount = (g.selectedItems || []).filter(si => si.stall === k).length;
                const done = hasReq && selCount >= req.count;
                dot.classList.toggle('done', done);
                dot.classList.toggle('has-items', hasReq && !done);
            });

            // 更新結帳列
            const basketEl = document.querySelector('.b6-basket-total');
            if (basketEl) basketEl.textContent = total;
            const cstripCountEl = document.querySelector('.b6-cstrip-count');
            if (cstripCountEl) cstripCountEl.innerHTML = `🛒 <strong>${selectedCount}</strong> / ${totalRequired} 件`;
            const cstripTotalEl = document.querySelector('.b6-cstrip-total');
            if (cstripTotalEl) cstripTotalEl.classList.toggle('over', budgetOver);

            // 更新已選商品清單（右側結帳卡）
            const cartItemsEl = document.getElementById('b6-cart-items');
            if (cartItemsEl) {
                cartItemsEl.innerHTML = (g.selectedItems || []).length > 0
                    ? (g.selectedItems || []).map(({ stall, id }) => {
                        const item = (_currentStalls[stall]?.items || []).find(i => i.id === id);
                        if (!item) return '';
                        return `<div class="b6-cart-item">
                            <span class="b6-ci-icon">${item.icon}</span>
                            <span class="b6-ci-name">${item.name}</span>
                            <span class="b6-ci-price">${item.price} 元</span>
                        </div>`;
                    }).join('')
                    : `<div class="b6-cart-empty">尚未選購商品</div>`;
            }

            // 結帳按鈕
            const checkoutBtn = document.getElementById('b6-checkout-btn');
            if (checkoutBtn) {
                const wasDone = !checkoutBtn.disabled;
                checkoutBtn.disabled = !missionDone;
                if (missionDone && !wasDone) {
                    Game.Speech.speak('所有商品選購完成，可以去結帳了！');
                    this._showAllCollectedFlash();
                    // 簡單模式：結帳按鈕顯示「點這裡」提示
                    if (this.state.settings.difficulty === 'easy') {
                        checkoutBtn.classList.add('b6-product-here-hint');
                    }
                }
                // 非完成狀態時移除提示
                if (!missionDone) checkoutBtn.classList.remove('b6-product-here-hint');
            }

            // 浮動購物籃徽章
            this._updateCartBadge(selectedCount, totalRequired);

            // 提示高亮：商品狀態更新後重新標記（商品被選取後移至下一個）
            this._b6P1UpdateHintHighlights();
        },

        // ── 結帳前確認清單（B1 _showTaskModal pattern）──────────
        _showCheckoutConfirm(g, callback) {
            const existing = document.getElementById('b6-checkout-confirm');
            if (existing) { existing.remove(); callback(); return; }
            const items = (g.selectedItems || []).map(({ stall, id }) => {
                const item = (_currentStalls[stall]?.items || []).find(i => i.id === id);
                return item ? { stall, id, ...item } : null;
            }).filter(Boolean);
            const total = items.reduce((sum, item) => sum + item.price, 0);
            const itemRows = items.map(item => {
                return `<div class="b6-cc-row"><span>${item.icon || ''} ${item.name}</span><span>${item.price} 元</span></div>`;
            }).join('');
            const modal = document.createElement('div');
            modal.id = 'b6-checkout-confirm';
            modal.style.cssText = 'position:fixed;inset:0;z-index:10200;background:rgba(0,0,0,0.55);display:flex;align-items:center;justify-content:center;padding:16px;';
            modal.innerHTML = `
                <div class="b6-checkout-card">
                    <div class="b6-cc-title">🛒 結帳清單</div>
                    <div class="b6-cc-items">
                        ${itemRows}
                        <div class="b6-cc-sep"></div>
                        <div class="b6-cc-row b6-cc-total"><span>合計</span><span>${total} 元</span></div>
                        <div class="b6-cc-row b6-cc-budget"><span>預算</span><span>${g.mission.budget} 元</span></div>
                        <div class="b6-cc-row b6-cc-avg"><span>共 ${items.length} 項，平均每項</span><span>${items.length > 0 ? Math.round(total / items.length) : 0} 元</span></div>
                    </div>
                    <button class="b6-cc-btn" id="b6-cc-go">✓ 去付款</button>
                </div>`;
            document.body.appendChild(modal);
            Game.Speech.speak(`合計${total}元，預算${g.mission.budget}元，確認去付款！`);
            const go = () => { if (modal.parentNode) modal.remove(); callback(); };
            Game.EventManager.on(document.getElementById('b6-cc-go'), 'click', go, {}, 'gameUI');
            const autoT = Game.TimerManager.setTimeout(go, 5000, 'ui');
            // 點擊背景也關閉
            modal.addEventListener('click', (e) => {
                if (e.target === modal) { Game.TimerManager.clearTimeout(autoT); go(); }
            });
        },

        // ── 收集進度動畫（Round 27）──────────────────────────────
        _showCollectionProgress(collected, needed) {
            const prev = document.getElementById('b6-col-progress');
            if (prev) prev.remove();
            const isAll = collected >= needed;
            const prog = document.createElement('div');
            prog.id = 'b6-col-progress';
            prog.className = `b6-col-progress${isAll ? ' all-done' : ''}`;
            prog.innerHTML = `<span class="b6-cp-plus">+1</span><span class="b6-cp-count">${collected}/${needed}</span>`;
            document.body.appendChild(prog);
            Game.TimerManager.setTimeout(() => {
                prog.classList.add('b6-cp-fade');
                Game.TimerManager.setTimeout(() => { if (prog.parentNode) prog.remove(); }, 400, 'ui');
            }, 1200, 'ui');
        },

        // ── 全部收集完成中央閃光（Round 38）─────────────────────
        _showAllCollectedFlash() {
            const existing = document.getElementById('b6-all-done-flash');
            if (existing) existing.remove();
            const el = document.createElement('div');
            el.id = 'b6-all-done-flash';
            el.className = 'b6-all-done-flash';
            el.textContent = '🎉 全部收集完成！';
            document.body.appendChild(el);
            Game.TimerManager.setTimeout(() => { if (document.body.contains(el)) el.remove(); }, 1500, 'ui');
        },

        // ── 攤位小計提示（Round 25）──────────────────────────────
        _showStallSubtotal(stallName, subtotal) {
            const prev = document.getElementById('b6-stall-subtotal');
            if (prev) prev.remove();
            const tip = document.createElement('div');
            tip.id = 'b6-stall-subtotal';
            tip.className = 'b6-stall-subtotal';
            tip.innerHTML = `<span class="b6-ss-name">${stallName}</span><span class="b6-ss-total">共 ${subtotal} 元</span>`;
            document.body.appendChild(tip);
            Game.TimerManager.setTimeout(() => {
                tip.classList.add('b6-ss-fade');
                Game.TimerManager.setTimeout(() => { if (tip.parentNode) tip.remove(); }, 400, 'ui');
            }, 1800, 'ui');
        },

        _showCenterFeedback(icon, text = '') {
            document.querySelector('.b-center-feedback')?.remove();
            const overlay = document.createElement('div');
            overlay.className = 'b-center-feedback';
            overlay.innerHTML = `<span class="b-cf-icon">${icon}</span>${text ? `<span class="b-cf-text">${text}</span>` : ''}`;
            document.body.appendChild(overlay);
            Game.TimerManager.setTimeout(() => overlay.remove(), 1200, 'ui');
        },

        // ── 商品收據飛出（Round 37）──────────────────────────────────
        _showItemReceiptFlyout(anchor, item) {
            const flyout = document.createElement('div');
            flyout.className = 'b6-item-flyout b6-item-flyout-center';
            flyout.innerHTML = `<span class="b6-if-icon">${item.icon || '🛒'}</span><span class="b6-if-name">${item.name}</span><span class="b6-if-price">+${item.price}元</span>`;
            document.body.appendChild(flyout);
            Game.TimerManager.setTimeout(() => flyout.remove(), 1000, 'ui');
        },

        // ── 浮動購物籃計數徽章（已移除，改由結帳列顯示）────────────
        _updateCartBadge(collected, needed) { },

        // ── 找到商品彈出價格動畫（A4 transaction tag pattern）────────
        _showPricePopup(anchor, price) {
            const rect = anchor.getBoundingClientRect();
            const tag  = document.createElement('div');
            tag.className = 'b6-price-popup';
            tag.textContent = `+${price} 元`;
            tag.style.left = Math.min(rect.right + 4, window.innerWidth - 80) + 'px';
            tag.style.top  = (rect.top + rect.height / 2 - 12) + 'px';
            document.body.appendChild(tag);
            Game.TimerManager.setTimeout(() => tag.remove(), 1100, 'ui');
        },

        _calcMissionTotal() {
            const g = this.state.game;
            const baseTotal = (g.selectedItems || []).reduce((sum, { stall, id }) => {
                const item = (_currentStalls[stall]?.items || []).find(i => i.id === id);
                return sum + (item ? item.price : 0);
            }, 0);
            const customTotal = (g.customItems || [])
                .filter(i => !i._deleted)
                .reduce((sum, i) => sum + i.price, 0);
            return baseTotal + customTotal;
        },

        // 所有攤位配額都達到且總額不超過預算
        _isMissionComplete() {
            const g = this.state.game;
            const mission = g.mission;
            if (!mission?.stalls) return false;
            for (const req of mission.stalls) {
                const cnt = (g.selectedItems || []).filter(i => i.stall === req.stall).length;
                if (cnt < req.count) return false;
            }
            return this._calcMissionTotal() <= mission.budget;
        },

        // 本關所有攤位需要選取的總件數
        _getTotalRequired() {
            const mission = this.state.game.mission;
            if (!mission?.stalls) return 0;
            return mission.stalls.reduce((sum, req) => sum + req.count, 0);
        },

        // ── 11. 付款畫面（B1/B5 Phase 2 拖曳付款模式）───────────
        _renderPaymentUI() {
            Game.TimerManager.clearAll();
            Game.EventManager.removeByCategory('gameUI');
            document.getElementById('b6-cart-badge')?.remove();

            const g     = this.state.game;
            const total = this._calcMissionTotal();
            const diff  = this.state.settings.difficulty;

            // 初始化 Phase 2 錢包狀態
            g.p2Wallet    = [];
            g.p2UidCtr    = 0;
            g.p2ErrorCount = 0;
            g.p2Total     = total;
            g.p2TrayFaces = {};
            g.p2ShowHint  = false;
            g.p2HintSlots = [];
            g.paidAmount  = 0;

            const mktKey   = g.mission._mktKey || this.state.settings.marketType;
            const mkt      = B6_MARKETS[mktKey] || B6_MARKETS.traditional;
            const diffLabel = { easy: '簡單模式', normal: '普通模式', hard: '困難模式' }[diff] || '';

            const app = document.getElementById('app');
            app.innerHTML = `
            <div class="b-header">
                <div class="b-header-left">
                    <img src="../images/index/educated_money_bag_character.png" alt="" class="b-header-mascot" onerror="this.style.display='none'">
                    <span class="b-header-unit">${mkt.icon} ${mkt.name}</span>
                </div>
                <div class="b-header-center">${diffLabel}</div>
                <div class="b-header-right">
                    <span class="b-progress">第 ${g.currentRound + 1} 關 / 共 ${g.totalRounds} 關</span>
                    <button class="b-reward-btn" onclick="if(typeof RewardLauncher!=='undefined'){RewardLauncher.open();}else{window.open('../reward/index.html','RewardSystem','width=1200,height=800');}">🎁 獎勵</button>
                    <button class="b-back-btn" onclick="Game.showSettings()">返回設定</button>
                </div>
            </div>
            <div class="game-container">
                ${this._renderB6P2RefCard(g.mission, total, mkt)}
                ${this._renderB6P2WalletArea(total, diff)}
                <button class="b5-confirm-btn" id="b6-p2-confirm-btn" disabled>✅ 確認付款</button>
                ${this._renderB6P2CoinTray(diff)}
            </div>`;

            Game.TimerManager.setTimeout(() => {
                Game.Speech.speak(`共消費${toTWD(total)}，請拖曳正確的金錢圖示付款。`);
            }, 300, 'speech');

            this._bindB6P2Events(total);
            this._b6P2SetupDragDrop();

            // 進入第二頁自動啟動輔助點擊
            if (this.state.settings.clickMode === 'on') {
                Game.TimerManager.setTimeout(() => AssistClick.activate(), 500, 'ui');
            }
        },

        _renderB6P2RefCard(mission, total, mkt) {
            const itemsList = (this.state.game.selectedItems || []).map(({ stall, id }) => {
                const item = (_currentStalls[stall]?.items || []).find(i => i.id === id);
                if (!item) return '';
                return `<div class="b6p2-ref-item">
                    <span>${item.icon || ''} ${item.name}</span>
                    <span class="b6p2-ref-price">${item.price}元</span>
                </div>`;
            }).join('');
            const customList = (this.state.game.customItems || [])
                .filter(i => !i._deleted)
                .map(i => `<div class="b6p2-ref-item">
                    <span>📦 ${i.name}</span>
                    <span class="b6p2-ref-price">${i.price}元</span>
                </div>`).join('');
            return `
            <div class="b6p2-ref-card">
                <div class="b6p2-ref-header">
                    <span class="b6p2-ref-icon">${mkt.icon}</span>
                    <span class="b6p2-ref-title">${mkt.name}</span>
                </div>
                <div class="b6p2-ref-items">${itemsList}${customList}</div>
                <div class="b6p2-ref-total-row">
                    <span class="b6p2-ref-total-label">合計</span>
                    <span class="b6p2-ref-total-val">${total} 元</span>
                </div>
            </div>`;
        },

        _renderB6P2WalletArea(total, diff) {
            return `
            <div class="b6p2-wallet-area" id="b6p2-wallet-area">
                <div class="b6p2-wallet-coins-label">需要付款 <span class="b6p2-wallet-need">${total} 元</span></div>
                <div class="b6p2-wallet-header">
                    <div class="b6p2-wallet-placed-row">
                        <span class="b6p2-wallet-placed-lbl">已放</span>
                        <span class="b6p2-wallet-total-val" id="b6p2-wallet-total">0 元</span>
                        <span class="b6p2-wallet-sep">/</span>
                        <span class="b6p2-wallet-goal">${total} 元</span>
                    </div>
                </div>
                <div class="b6p2-progress-wrap">
                    <div class="b6p2-progress" id="b6p2-progress">
                        <div class="b6p2-progress-fill" id="b6p2-progress-fill"></div>
                    </div>
                </div>
                <div class="b6p2-my-money-label">💼 我的金錢區</div>
                <div class="b6p2-wallet-coins b6p2-drop-zone" id="b6p2-wallet-coins">
                    <span class="b6p2-wallet-empty">把金錢卡片拖曳到這裡</span>
                </div>
            </div>`;
        },

        _renderB6P2CoinTray(diff) {
            const denomMap = {
                easy:   [1, 5, 10, 50, 100],
                normal: [1, 5, 10, 50, 100, 500],
                hard:   [1, 5, 10, 50, 100, 500, 1000]
            };
            const denoms = denomMap[diff] || denomMap.easy;
            const trayFaces = {};
            denoms.forEach(d => { trayFaces[d] = Math.random() < 0.5 ? 'back' : 'front'; });
            this.state.game.p2TrayFaces = trayFaces;
            const coinsHtml = denoms.map(d => {
                const isBill = d >= 100;
                return `
                <div class="b6p2-coin-drag" draggable="true" data-denom="${d}" title="${d}元">
                    <img src="../images/money/${d}_yuan_${trayFaces[d]}.png" alt="${d}元"
                         class="${isBill ? 'banknote-img' : 'coin-img'}" draggable="false"
                         onerror="this.style.display='none'">
                    <span class="b1-denom-label">${d}元</span>
                </div>`;
            }).join('');
            return `
            <div class="b6p2-tray">
                <div class="b6p2-tray-title">💰 金錢拖曳區</div>
                <div class="b6p2-tray-subtitle">把金錢卡片拖曳到上方「我的金錢區」（可重複拖曳）</div>
                <div class="b6p2-tray-coins" id="b6p2-tray-coins">${coinsHtml}</div>
            </div>`;
        },

        _bindB6P2Events(total) {
            const g    = this.state.game;
            const diff = this.state.settings.difficulty;

            // 確認付款按鈕（普通/困難）
            const confirmBtn = document.getElementById('b6-p2-confirm-btn');
            if (confirmBtn) {
                Game.EventManager.on(confirmBtn, 'click', () => {
                    if (this.state.isProcessing) return;
                    this.state.isProcessing = true;
                    this._b6P2HandleConfirm(total);
                }, {}, 'gameUI');
            }

            // 移除幣（委派）＋ 拖回托盤
            const walletCoinsEl = document.getElementById('b6p2-wallet-coins');
            if (walletCoinsEl) {
                Game.EventManager.on(walletCoinsEl, 'click', e => {
                    const btn = e.target.closest('.b6p2-wc-remove');
                    if (btn) { this.audio.play('click'); this._b6P2RemoveCoin(btn.dataset.uid); }
                }, {}, 'gameUI');
                Game.EventManager.on(walletCoinsEl, 'dragstart', e => {
                    const coinEl = e.target.closest('.b6p2-wc-removable');
                    if (!coinEl) return;
                    e.dataTransfer.setData('text/plain', `remove:${coinEl.dataset.uid}`);
                    coinEl.classList.add('b6p2-dragging');
                }, {}, 'gameUI');
                Game.EventManager.on(walletCoinsEl, 'dragend', e => {
                    e.target.closest('.b6p2-wc-removable')?.classList.remove('b6p2-dragging');
                }, {}, 'gameUI');
            }

            // 提示按鈕
            const hintBtn = document.getElementById('b6-p2-hint-btn');
            if (hintBtn) {
                Game.EventManager.on(hintBtn, 'click', () => {
                    this.audio.play('click');
                    if (diff === 'hard') {
                        this._showHardModeHintModal(total);
                    } else {
                        // 清空已放金錢再套用提示，避免統計錯誤
                        g.p2Wallet  = [];
                        g.p2UidCtr  = 0;
                        g.p2ShowHint = true;
                        this._b6P2AutoSetGhostSlots();
                        this._b6P2UpdateWalletDisplay();
                        Game.Speech.speak('請按照提示放入正確的金錢');
                    }
                }, {}, 'gameUI');
            }

            // 托盤接受從錢包拖回的幣
            const tray = document.getElementById('b6p2-tray-coins');
            if (tray) {
                Game.EventManager.on(tray, 'dragover', e => e.preventDefault(), {}, 'gameUI');
                Game.EventManager.on(tray, 'drop', e => {
                    e.preventDefault();
                    const data = e.dataTransfer.getData('text/plain');
                    if (data.startsWith('remove:')) this._b6P2RemoveCoin(data.replace('remove:', ''));
                }, {}, 'gameUI');
            }
        },

        _b6P2SetupDragDrop() {
            const walletCoins = document.getElementById('b6p2-wallet-coins');
            if (!walletCoins) return;

            // Desktop：拖曳盤 → 錢包
            document.querySelectorAll('.b6p2-coin-drag').forEach(dragEl => {
                const denom = parseInt(dragEl.dataset.denom);
                Game.EventManager.on(dragEl, 'dragstart', e => {
                    e.dataTransfer.setData('text/plain', String(denom));
                    e.dataTransfer.effectAllowed = 'copy';
                    dragEl.classList.add('b6p2-dragging');
                }, {}, 'gameUI');
                Game.EventManager.on(dragEl, 'dragend', () => dragEl.classList.remove('b6p2-dragging'), {}, 'gameUI');
            });

            Game.EventManager.on(walletCoins, 'dragover', e => {
                e.preventDefault();
                walletCoins.classList.add('b6p2-drop-active');
            }, {}, 'gameUI');
            Game.EventManager.on(walletCoins, 'dragleave', e => {
                if (!walletCoins.contains(e.relatedTarget)) walletCoins.classList.remove('b6p2-drop-active');
            }, {}, 'gameUI');
            Game.EventManager.on(walletCoins, 'drop', e => {
                e.preventDefault();
                walletCoins.classList.remove('b6p2-drop-active');
                const data = e.dataTransfer.getData('text/plain');
                if (data.startsWith('remove:')) this._b6P2RemoveCoin(data.replace('remove:', ''));
                else { const d = parseInt(data); if (!isNaN(d)) this._b6P2AddCoin(d); }
            }, {}, 'gameUI');

            // Touch drag：拖曳盤 → 錢包
            document.querySelectorAll('.b6p2-coin-drag').forEach(dragEl => {
                const denom = parseInt(dragEl.dataset.denom);
                let ghostEl = null;
                Game.EventManager.on(dragEl, 'touchstart', e => {
                    const t = e.touches[0];
                    ghostEl = dragEl.cloneNode(true);
                    ghostEl.style.cssText = `position:fixed;z-index:9999;pointer-events:none;opacity:0.8;transform:scale(1.05);left:${t.clientX - 30}px;top:${t.clientY - 40}px;`;
                    document.body.appendChild(ghostEl);
                }, { passive: true }, 'gameUI');
                Game.EventManager.on(dragEl, 'touchmove', e => {
                    e.preventDefault();
                    const t = e.touches[0];
                    if (ghostEl) { ghostEl.style.left = (t.clientX - 30) + 'px'; ghostEl.style.top = (t.clientY - 40) + 'px'; }
                    const wc = document.getElementById('b6p2-wallet-coins');
                    if (wc) {
                        const r = wc.getBoundingClientRect();
                        wc.classList.toggle('b6p2-drop-active', t.clientX >= r.left && t.clientX <= r.right && t.clientY >= r.top && t.clientY <= r.bottom);
                    }
                }, { passive: false }, 'gameUI');
                Game.EventManager.on(dragEl, 'touchend', e => {
                    if (ghostEl) { ghostEl.remove(); ghostEl = null; }
                    const t = e.changedTouches[0];
                    const wc = document.getElementById('b6p2-wallet-coins');
                    if (wc) {
                        const r = wc.getBoundingClientRect();
                        wc.classList.remove('b6p2-drop-active');
                        if (t.clientX >= r.left && t.clientX <= r.right && t.clientY >= r.top && t.clientY <= r.bottom) this._b6P2AddCoin(denom);
                    }
                }, { passive: true }, 'gameUI');
            });

            // Touch drag：錢包 → 拖回托盤（普通/困難模式的 .b6p2-wc-removable）
            const trayEl = document.getElementById('b6p2-tray-coins');
            Game.EventManager.on(walletCoins, 'touchstart', e => {
                const coin = e.target.closest('.b6p2-wc-removable');
                if (!coin) return;
                coin._touchDragUid = coin.dataset.uid;
                const t = e.touches[0];
                const ghost = coin.cloneNode(true);
                ghost.id = 'b6p2-wallet-touch-ghost';
                ghost.style.cssText = `position:fixed;z-index:9999;pointer-events:none;opacity:0.75;left:${t.clientX - 30}px;top:${t.clientY - 40}px;`;
                document.body.appendChild(ghost);
            }, { passive: true }, 'gameUI');
            Game.EventManager.on(walletCoins, 'touchmove', e => {
                const ghost = document.getElementById('b6p2-wallet-touch-ghost');
                if (!ghost) return;
                e.preventDefault();
                const t = e.touches[0];
                ghost.style.left = (t.clientX - 30) + 'px';
                ghost.style.top  = (t.clientY - 40) + 'px';
                if (trayEl) {
                    const r = trayEl.getBoundingClientRect();
                    trayEl.classList.toggle('b6p2-drop-active', t.clientX >= r.left && t.clientX <= r.right && t.clientY >= r.top && t.clientY <= r.bottom);
                }
            }, { passive: false }, 'gameUI');
            Game.EventManager.on(walletCoins, 'touchend', e => {
                const ghost = document.getElementById('b6p2-wallet-touch-ghost');
                if (!ghost) return;
                const t = e.changedTouches[0];
                ghost.remove();
                if (trayEl) {
                    const r = trayEl.getBoundingClientRect();
                    trayEl.classList.remove('b6p2-drop-active');
                    if (t.clientX >= r.left && t.clientX <= r.right && t.clientY >= r.top && t.clientY <= r.bottom) {
                        const coin = e.target.closest('.b6p2-wc-removable') || walletCoins.querySelector('[data-uid="' + (walletCoins._touchDragUid || '') + '"]');
                        const uid = coin?._touchDragUid || coin?.dataset?.uid;
                        if (uid) { this.audio.play('click'); this._b6P2RemoveCoin(uid); }
                    }
                }
            }, { passive: true }, 'gameUI');
        },

        _b6P2AddCoin(denom) {
            const g    = this.state.game;
            const diff = this.state.settings.difficulty;
            if (g.p2ShowHint && g.p2HintSlots?.length) {
                const slotIdx = g.p2HintSlots.findIndex(s => s.denom === denom && !s.filled);
                if (slotIdx === -1) { this.audio.play('error'); return; }
                g.p2HintSlots[slotIdx].filled = true;
                this.audio.play('coin');
                const uid = ++g.p2UidCtr;
                const face = g.p2TrayFaces?.[denom] || 'front';
                g.p2Wallet.push({ denom, uid, isBill: denom >= 100, face });
                const slotEl = document.querySelector(`[data-b6p2-hint-idx="${slotIdx}"]`);
                if (slotEl) slotEl.classList.remove('b6p2-ghost-slot');
                this._b6P2UpdateStatusOnly();
                if (diff === 'easy' && g.p2HintSlots.every(s => s.filled)) {
                    Game.TimerManager.setTimeout(() => this._b6P2HandleConfirm(g.p2Total), 600, 'ui');
                }
            } else {
                this.audio.play('coin');
                const uid = ++g.p2UidCtr;
                const face = g.p2TrayFaces?.[denom] || 'front';
                g.p2Wallet.push({ denom, uid, isBill: denom >= 100, face });
                const coinsEl = document.getElementById('b6p2-wallet-coins');
                if (coinsEl) {
                    coinsEl.querySelector('.b6p2-wallet-empty')?.remove();
                    const canRemove = diff !== 'easy';
                    const isBill = denom >= 100;
                    const w = isBill ? 100 : 60;
                    const div = document.createElement('div');
                    div.className = 'b6p2-wallet-coin b6p2-coin-new' + (canRemove ? ' b6p2-wc-removable' : '');
                    if (canRemove) { div.setAttribute('draggable', 'true'); div.dataset.uid = String(uid); }
                    div.innerHTML = `<img src="../images/money/${denom}_yuan_${face}.png" alt="${denom}元"
                         style="width:${w}px;height:${isBill ? 'auto' : w + 'px'};display:block;"
                         onerror="this.style.display='none'" draggable="false">
                    ${canRemove ? `<button class="b6p2-wc-remove" data-uid="${uid}" title="移除">✕</button>` : ''}`;
                    coinsEl.appendChild(div);
                }
                this._b6P2UpdateStatusOnly();
            }
            if (diff !== 'hard') {
                const walletNow = this._b6P2GetWalletTotal();
                Game.TimerManager.setTimeout(() => Game.Speech.speak(toTWD(walletNow)), 80, 'ui');
            }
        },

        _b6P2RemoveCoin(uid) {
            const g = this.state.game;
            if (g.p2ShowHint && g.p2HintSlots?.length) {
                const coinIdx = g.p2Wallet.findIndex(c => String(c.uid) === String(uid));
                if (coinIdx !== -1) {
                    const coin = g.p2Wallet[coinIdx];
                    let filledSoFar = 0;
                    for (let i = 0; i < g.p2HintSlots.length; i++) {
                        if (g.p2HintSlots[i].filled && g.p2HintSlots[i].denom === coin.denom && filledSoFar === coinIdx) {
                            g.p2HintSlots[i].filled = false; break;
                        }
                        if (g.p2HintSlots[i].filled) filledSoFar++;
                    }
                    g.p2Wallet.splice(coinIdx, 1);
                }
                this._b6P2UpdateWalletDisplay();
            } else {
                g.p2Wallet = g.p2Wallet.filter(c => String(c.uid) !== String(uid));
                document.querySelector(`.b6p2-wc-removable[data-uid="${uid}"]`)?.remove();
                const coinsEl = document.getElementById('b6p2-wallet-coins');
                if (coinsEl && g.p2Wallet.length === 0)
                    coinsEl.innerHTML = '<span class="b6p2-wallet-empty">把金錢卡片拖曳到這裡</span>';
                this._b6P2UpdateStatusOnly();
            }
        },

        _b6P2GetWalletTotal() {
            return this.state.game.p2Wallet.reduce((s, c) => s + c.denom, 0);
        },

        _b6P2UpdateStatusOnly() {
            const g      = this.state.game;
            const total  = this._b6P2GetWalletTotal();
            const req    = g.p2Total;
            const enough = total >= req;
            const diff   = this.state.settings.difficulty;
            const totalEl = document.getElementById('b6p2-wallet-total');
            if (totalEl) {
                totalEl.textContent = total + ' 元';
                totalEl.className = 'b6p2-wallet-total-val' + (enough ? ' enough' : total > 0 ? ' not-enough' : '');
            }
            const fillEl = document.getElementById('b6p2-progress-fill');
            if (fillEl && req > 0) {
                const pct = Math.min(Math.round(total / req * 100), 100);
                fillEl.style.width = pct + '%';
                fillEl.className = 'b6p2-progress-fill' + (enough ? ' full' : pct >= 70 ? ' near' : '');
            }
            const confirmBtn = document.getElementById('b6-p2-confirm-btn');
            if (confirmBtn) {
                const wasDisabled = confirmBtn.disabled;
                const canConfirm  = diff === 'hard' ? total > 0 : enough;
                confirmBtn.disabled = !canConfirm;
                confirmBtn.classList.toggle('ready', canConfirm);
                if (canConfirm && wasDisabled && total > 0) {
                    const msg = (diff === 'easy' && total === req) ? '剛好！可以確認付款了！'
                              : enough ? '金額足夠，可以確認付款了！' : '';
                    if (msg) Game.TimerManager.setTimeout(() => Game.Speech.speak(msg), 200, 'ui');
                }
            }
        },

        _b6P2UpdateWalletDisplay() {
            const g      = this.state.game;
            const total  = this._b6P2GetWalletTotal();
            const req    = g.p2Total;
            const enough = total >= req;
            const diff   = this.state.settings.difficulty;
            const totalEl = document.getElementById('b6p2-wallet-total');
            if (totalEl) {
                totalEl.textContent = total + ' 元';
                totalEl.className = 'b6p2-wallet-total-val' + (enough ? ' enough' : total > 0 ? ' not-enough' : '');
            }
            const fillEl = document.getElementById('b6p2-progress-fill');
            if (fillEl && req > 0) {
                const pct = Math.min(Math.round(total / req * 100), 100);
                fillEl.style.width = pct + '%';
                fillEl.className = 'b6p2-progress-fill' + (enough ? ' full' : pct >= 70 ? ' near' : '');
            }
            const confirmBtn = document.getElementById('b6-p2-confirm-btn');
            if (confirmBtn) {
                const wasDisabled2 = confirmBtn.disabled;
                const canConfirm   = diff === 'hard' ? total > 0 : enough;
                confirmBtn.disabled = !canConfirm;
                confirmBtn.classList.toggle('ready', canConfirm);
                if (canConfirm && wasDisabled2 && total > 0) {
                    const msg = (diff === 'easy' && total === req) ? '剛好！可以確認付款了！'
                              : enough ? '金額足夠，可以確認付款了！' : '';
                    if (msg) Game.TimerManager.setTimeout(() => Game.Speech.speak(msg), 200, 'ui');
                }
            }
            const coinsEl = document.getElementById('b6p2-wallet-coins');
            if (!coinsEl) return;
            if (g.p2ShowHint && g.p2HintSlots?.length) {
                coinsEl.innerHTML = g.p2HintSlots.map((slot, idx) => {
                    if (!slot.filled) {
                        const isBill = slot.denom >= 100;
                        const w = isBill ? 100 : 60;
                        return `<div class="b6p2-wallet-coin b6p2-ghost-slot" data-b6p2-hint-idx="${idx}">
                            <img src="../images/money/${slot.denom}_yuan_${slot.face || 'front'}.png" alt="${slot.denom}元"
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
                    return `<div class="b6p2-wallet-coin" data-b6p2-hint-idx="${idx}">
                        <img src="../images/money/${coin.denom}_yuan_${coin.face}.png" alt="${coin.denom}元"
                             style="width:${w}px;height:${isBill ? 'auto' : w + 'px'};display:block;"
                             onerror="this.style.display='none'" draggable="false"></div>`;
                }).join('');
            } else if (g.p2Wallet.length === 0) {
                coinsEl.innerHTML = '<span class="b6p2-wallet-empty">把錢幣拖曳到這裡 👈</span>';
            } else {
                const canRemove = diff !== 'easy';
                coinsEl.innerHTML = g.p2Wallet.map(coin => {
                    const isBill = coin.denom >= 100;
                    const w = isBill ? 100 : 60;
                    const cls = 'b6p2-wallet-coin' + (canRemove ? ' b6p2-wc-removable' : '');
                    const extra = canRemove ? `draggable="true" data-uid="${coin.uid}"` : '';
                    const removeBtn = canRemove ? `<button class="b6p2-wc-remove" data-uid="${coin.uid}" title="移除">✕</button>` : '';
                    return `<div class="${cls}" ${extra}>
                        <img src="../images/money/${coin.denom}_yuan_${coin.face}.png" alt="${coin.denom}元"
                             style="width:${w}px;height:${isBill ? 'auto' : w + 'px'};display:block;"
                             onerror="this.style.display='none'" draggable="false">
                        ${removeBtn}</div>`;
                }).join('');
            }
        },

        _b6P2AutoSetGhostSlots() {
            const g = this.state.game;
            const diff = this.state.settings.difficulty;
            const trayDenomMap = {
                easy:   [100, 50, 10, 5, 1],
                normal: [500, 100, 50, 10, 5, 1],
                hard:   [1000, 500, 100, 50, 10, 5, 1]
            };
            const denoms = trayDenomMap[diff] || trayDenomMap.easy;
            let rem = g.p2Total;
            const coins = [];
            for (const d of denoms) { while (rem >= d) { coins.push(d); rem -= d; } }
            g.p2HintSlots = coins.map(d => ({ denom: d, filled: false, face: g.p2TrayFaces?.[d] || 'front' }));
            g.p2ShowHint  = true;
        },

        _b6P2HandleConfirm(total) {
            const g      = this.state.game;
            const wTotal = this._b6P2GetWalletTotal();
            const diff   = this.state.settings.difficulty;
            // 簡單模式：≥ 即正確（多付也接受）；普通/困難：需精確 = total
            const isCorrect = diff === 'easy' ? wTotal >= total : wTotal === total;

            if (isCorrect) {
                this.audio.play('correct');
                this._showCenterFeedback('💯', '付款成功！');
                g.paidAmount = wTotal;
                Game.Speech.speak(`付了${toTWD(wTotal)}`, () => {
                    Game.TimerManager.setTimeout(() => {
                        this.state.isProcessing = false;
                        this._showChange(wTotal, total);
                    }, 400, 'turnTransition');
                });
            } else {
                this.state.isProcessing = false;
                this.audio.play('error');
                g.p2ErrorCount = (g.p2ErrorCount || 0) + 1;
                this._showCenterFeedback('❌', '再試一次！');
                Game.Speech.speak(wTotal > total ? `拿了太多的錢，請再試一次` : `拿了太少的錢，請再試一次`);
                g.p2Wallet    = [];
                g.p2ShowHint  = false;
                g.p2HintSlots = [];
                const walletArea = document.getElementById('b6p2-wallet-area');
                if (walletArea) {
                    walletArea.style.animation = 'b6p2Shake 0.4s ease';
                    Game.TimerManager.setTimeout(() => {
                        walletArea.style.animation = '';
                        this._b6P2UpdateWalletDisplay();
                    }, 500, 'ui');
                }
                if (g.p2ErrorCount >= 3) {
                    Game.TimerManager.setTimeout(() => { this._b6P2AutoSetGhostSlots(); this._b6P2UpdateWalletDisplay(); }, 700, 'ui');
                }
            }
        },

        // ── 付款提示（保留，困難模式彈窗仍使用）─────────────────
        _showPaymentHint(total) {
            // legacy — no longer called by new UI; kept for assist-click compatibility
            const used = {};
            let rem = total;
            [1000,500,100,50,10,5,1].forEach(d => { const c = Math.floor(rem/d); if(c) { used[d]=c; rem-=c*d; } });
            const parts = Object.entries(used).sort(([a],[b])=>b-a).map(([d,c])=>`${c}個${d}元`);
            Game.Speech.speak(`可以用${parts.join('，')}`);
        },

        // ── 困難模式付法彈窗（B3 _showHardModeHintModal pattern）────
        _showHardModeHintModal(total) {
            const ALL_BILLS = [1000, 500, 100, 50, 10, 5, 1];
            let rem = total;
            const items = [];
            ALL_BILLS.forEach(d => {
                if (rem >= d) {
                    const cnt = Math.floor(rem / d);
                    for (let i = 0; i < cnt; i++) items.push(d);
                    rem %= d;
                }
            });
            const denomCounts = {};
            items.forEach(d => { denomCounts[d] = (denomCounts[d] || 0) + 1; });
            const parts = Object.entries(denomCounts)
                .sort(([a], [b]) => b - a)
                .map(([d, cnt]) => `${cnt}個${d}元`);
            const existing = document.getElementById('b6-hard-hint-modal');
            if (existing) existing.remove();
            const overlay = document.createElement('div');
            overlay.id = 'b6-hard-hint-modal';
            overlay.className = 'b6-hint-modal-overlay';
            overlay.innerHTML = `
                <div class="b6-hint-modal">
                    <div class="b6-hm-header">💡 付法分析</div>
                    <div class="b6-hm-total-row">需付 <strong>${total}</strong> 元</div>
                    <div class="b6-hm-imgs">
                        ${items.map(d => {
                            const imgSize = d >= 100 ? '62px' : '48px';
                            return `<img src="../images/money/${d}_yuan_front.png" style="width:${imgSize};height:auto;" draggable="false" alt="${d}元">`;
                        }).join('')}
                    </div>
                    <button class="b6-hm-close-btn" id="b6-hm-close">✕ 關閉</button>
                </div>`;
            document.body.appendChild(overlay);
            const close = () => overlay.remove();
            Game.EventManager.on(document.getElementById('b6-hm-close'), 'click', close, {}, 'gameUI');
            Game.EventManager.on(overlay, 'click', e => { if (e.target === overlay) close(); }, {}, 'gameUI');
            Game.Speech.speak(`需付${toTWD(total)}，可以用${parts.join('，')}`);
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
            this._changeQuizErrors = 0; // 重置計數（Round 34）
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
                <div class="b-header-left"><img src="../images/index/educated_money_bag_character.png" alt="" class="b-header-mascot" onerror="this.style.display='none'"><span class="b-header-unit">🛒 菜市場買菜</span></div>
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
                    <button class="b6-calc-toggle" id="b6-calc-toggle">🧮 幫我算一算</button>
                    <div class="b6-calc-panel" id="b6-calc-panel">
                        <div class="b6-cp-row">
                            <span class="b6-cp-label">付了</span>
                            <span class="b6-cp-num">${paid}</span>
                            <span class="b6-cp-unit">元</span>
                        </div>
                        <div class="b6-cp-row b6-cp-sub">
                            <span class="b6-cp-op">−</span>
                            <span class="b6-cp-label">花了</span>
                            <span class="b6-cp-num">${total}</span>
                            <span class="b6-cp-unit">元</span>
                        </div>
                        <div class="b6-cp-divider"></div>
                        <div class="b6-cp-row b6-cp-ans">
                            <span class="b6-cp-op">=</span>
                            <span class="b6-cp-label">找零</span>
                            <span class="b6-cp-num b6-cp-q">？</span>
                            <span class="b6-cp-unit">元</span>
                        </div>
                    </div>
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
                        // 答錯：漸進提示（Round 34）
                        this._changeQuizErrors = (this._changeQuizErrors || 0) + 1;
                        btn.classList.add('b6-change-opt-wrong');
                        this.audio.play('error');
                        if (this._changeQuizErrors === 1) {
                            // 第1次：只顯示算式 (付-商品=?)
                            this._showChangeRangeHint(paid, total);
                        } else {
                            this._showChangeFormula(paid, total, change);
                        }
                        const retryMode = this.state.settings.retryMode;
                        if (retryMode === 'retry') {
                            btn.disabled = true;
                            const b6ChangeDir = selected > change ? '太多了' : '太少了';
                            Game.Speech.speak(`不對喔，找零算${b6ChangeDir}，請再試一次`);
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
            // 幫我算一算 toggle（C6 計算機模式）
            const calcToggle = document.getElementById('b6-calc-toggle');
            const calcPanel  = document.getElementById('b6-calc-panel');
            if (calcToggle && calcPanel) {
                Game.EventManager.on(calcToggle, 'click', () => {
                    const shown = calcPanel.classList.toggle('visible');
                    calcToggle.textContent = shown ? '🙈 收起計算' : '🧮 幫我算一算';
                }, {}, 'gameUI');
            }
        },

        // ── 找零第1次錯誤：顯示算式架構（Range hint, Round 34）─
        _showChangeRangeHint(paid, total) {
            if (document.querySelector('.b6-change-range-hint')) return;
            const hint = document.createElement('div');
            hint.className = 'b6-change-range-hint';
            hint.innerHTML = `💡 提示：付 <strong>${paid}</strong> 元 − 商品 <strong>${total}</strong> 元 = <strong>？</strong> 元`;
            const opts = document.querySelector('.b6-change-opts');
            if (opts) opts.insertAdjacentElement('beforebegin', hint);
        },

        _showChangeFormula(paid, total, change) {
            const existing = document.getElementById('b6-change-formula');
            if (existing) return;
            const hint = document.createElement('div');
            hint.id = 'b6-change-formula';
            hint.className = 'b6-change-formula';
            hint.innerHTML = `
                <span class="b6-cf-item">${paid}元</span>
                <span class="b6-cf-op">−</span>
                <span class="b6-cf-item">${total}元</span>
                <span class="b6-cf-op">=</span>
                <span class="b6-cf-ans">${change}元</span>`;
            const optsEl = document.getElementById('b6-change-opts');
            if (optsEl) optsEl.insertAdjacentElement('afterend', hint);
        },

        // ── 付款找零計算過程逐行動畫（Round 44）──────────────────
        _animateChangeCalc(paid, total, change) {
            document.getElementById('b6-change-calc-anim')?.remove();
            const box = document.createElement('div');
            box.id = 'b6-change-calc-anim';
            box.className = 'b6-change-calc-anim';
            const lines = [
                { text: `💰 付了 ${paid} 元`, cls: 'b6-cc-paid' },
                { text: `🛒 商品 ${total} 元`, cls: 'b6-cc-total' },
                { text: `💵 找零 = ${paid} − ${total} = <strong>${change}</strong> 元`, cls: 'b6-cc-result' },
            ];
            lines.forEach((ln, i) => {
                const el = document.createElement('div');
                el.className = `b6-cc-line ${ln.cls}`;
                el.innerHTML = ln.text;
                el.style.animationDelay = `${i * 400}ms`;
                box.appendChild(el);
            });
            // Insert after change-section or as body overlay
            const anchor = document.querySelector('.b6-change-section');
            if (anchor) anchor.insertAdjacentElement('afterend', box);
            else document.body.appendChild(box);
            Game.TimerManager.setTimeout(() => {
                box.classList.add('b6-cca-fade');
                Game.TimerManager.setTimeout(() => { if (box.parentNode) box.remove(); }, 500, 'ui');
            }, 2800, 'ui');
        },

        _showChangeResult(paid, change) {
            const g = this.state.game;

            // 儲存本關收據（A3/A4 交易摘要模式）
            const total = this._calcMissionTotal();
            const items = (g.selectedItems || []).map(({ stall, id }) => {
                const item = (_currentStalls[stall]?.items || []).find(i => i.id === id);
                if (item) g.stallStats[stall] = (g.stallStats[stall] || 0) + item.price;
                return item ? { name: item.name, price: item.price } : null;
            }).filter(Boolean);
            g.receipts.push({ items, total, paid, change });

            // 易/普通模式結果語音（困難模式語音已在 _showChangeQuiz 播出）
            if (this.state.settings.difficulty !== 'hard') {
                if (change === 0) {
                    Game.Speech.speak(`精準付款！剛好${toTWD(paid)}，不需找零，買菜成功！`);
                } else {
                    Game.Speech.speak(`付了${toTWD(paid)}，找回${toTWD(change)}，買菜成功！`);
                }
            }

            g.correctCount++;
            if (change === 0) g.exactPayments = (g.exactPayments || 0) + 1; // 精準付款計數（Round 33）
            g.streak = (g.streak || 0) + 1;
            if (g.streak === 3 || g.streak === 5) {
                Game.TimerManager.setTimeout(() => this._showStreakBadge(g.streak), 200, 'ui');
            }

            const app = document.getElementById('app');
            const isFinalRound = (g.currentRound + 1) >= g.totalRounds;

            if (isFinalRound) {
                // ── 最終關：採購回顧合併頁（付款結果 + 收據 + 攤位分析 + 付款效率）──
                document.body.style.overflow = 'auto';
                document.documentElement.style.overflow = 'auto';
                app.style.overflow = 'auto'; app.style.height = 'auto'; app.style.minHeight = '100vh';

                // 付款效率
                const exactCount  = g.exactPayments || 0;
                const totalRounds = g.totalRounds || 1;
                const effPct   = Math.round(exactCount / totalRounds * 100);
                const effLabel = effPct === 100 ? '💯 全部精準！' : effPct >= 60 ? '⭐ 表現不錯！' : '💪 繼續練習！';
                const effHTML  = exactCount > 0 ? `
                <div class="b-review-card">
                    <h3>🎯 付款效率</h3>
                    <div class="b6-eff-row">
                        <div class="b6-eff-ring" style="--eff-pct:${effPct}">
                            <svg viewBox="0 0 36 36" class="b6-eff-svg">
                                <circle class="b6-eff-bg" cx="18" cy="18" r="15.9"/>
                                <circle class="b6-eff-fill" cx="18" cy="18" r="15.9"
                                    stroke-dasharray="${effPct} ${100 - effPct}" stroke-dashoffset="25"/>
                            </svg>
                            <span class="b6-eff-pct">${effPct}%</span>
                        </div>
                        <div class="b6-eff-info">
                            <div class="b6-eff-label">${effLabel}</div>
                            <div class="b6-eff-detail">精準付款 <strong>${exactCount}</strong> 次 / 共 <strong>${totalRounds}</strong> 關</div>
                        </div>
                    </div>
                </div>` : '';

                // 採購收據
                const receiptCardHTML = g.receipts.length > 0 ? `
                <div class="b-review-card">
                    <h3>🧾 採購收據</h3>
                    <table class="b6-receipt-table">
                        <thead><tr><th>關卡</th><th>採購商品</th><th>小計</th><th>付款</th><th>找零</th></tr></thead>
                        <tbody>
                            ${g.receipts.map((r, i) => `
                            <tr class="${i % 2 === 0 ? 'b6-receipt-row-even' : ''}">
                                <td class="b6-receipt-round">第${i + 1}關</td>
                                <td class="b6-receipt-items">${r.items.map(it => it.name).join('、')}</td>
                                <td class="b6-receipt-num">${r.total}元</td>
                                <td class="b6-receipt-num">${r.paid}元</td>
                                <td class="b6-receipt-change">${r.change}元</td>
                            </tr>`).join('')}
                        </tbody>
                    </table>
                </div>` : '';

                // 攤位消費分析
                const stallCardHTML = (() => {
                    const stats = g.stallStats;
                    if (!stats || Object.keys(stats).length === 0) return '';
                    const entries = Object.keys(_currentStalls)
                        .filter(k => stats[k])
                        .map(k => ({ name: _currentStalls[k].name, icon: _currentStalls[k].icon, total: stats[k] }));
                    if (!entries.length) return '';
                    const grandTotal = entries.reduce((s, e) => s + e.total, 0);
                    return `
                    <div class="b-review-card">
                        <h3>🏪 攤位消費分析</h3>
                        <div class="b6-stall-bars">
                            ${entries.map(e => {
                                const pct = Math.round(e.total / grandTotal * 100);
                                return `<div class="b6-stall-bar-row">
                                    <span class="b6-stall-icon">${e.icon}</span>
                                    <span class="b6-stall-name">${e.name}</span>
                                    <div class="b6-stall-track"><div class="b6-stall-fill" style="width:${pct}%"></div></div>
                                    <span class="b6-stall-total">${e.total}元</span>
                                </div>`;
                            }).join('')}
                        </div>
                    </div>`;
                })();

                app.innerHTML = `
                <div class="b-review-wrapper">
                    <div class="b-review-screen">
                        <div class="b-review-header">
                            <div class="b-review-emoji">${change === 0 ? '💯' : '🎉'}</div>
                            <h1 class="b-review-title">${change === 0 ? '精準付款！' : '買菜成功！'}</h1>
                            <p class="b-review-subtitle">${change === 0
                                ? `剛好 ${paid} 元，不需找零`
                                : `付了 ${paid} 元，找回 ${change} 元`}</p>
                        </div>
                        ${receiptCardHTML}
                        ${stallCardHTML}
                        ${effHTML}
                        <button id="b6-view-summary-btn" class="b-review-next-btn">📊 查看測驗總結</button>
                    </div>
                </div>`;

                Game.TimerManager.setTimeout(() => document.getElementById('success-sound')?.play(), 100, 'confetti');
                Game.EventManager.on(document.getElementById('b6-view-summary-btn'), 'click', () => {
                    this.nextRound();
                }, {}, 'gameUI');

            } else {
                // ── 中間關卡：付款結果 + 下一關按鈕 ──
                app.innerHTML = `
                <div class="b-header">
                    <div class="b-header-left"><img src="../images/index/educated_money_bag_character.png" alt="" class="b-header-mascot" onerror="this.style.display='none'"><span class="b-header-unit">🛒 菜市場買菜</span></div>
                    <div class="b-header-center">${{ easy: '簡單模式', normal: '普通模式', hard: '困難模式' }[this.state.settings.difficulty] || ''}</div>
                    <div class="b-header-right">
                        <span class="b-progress">第 ${g.currentRound + 1} 關 / 共 ${g.totalRounds} 關</span>
                        <button class="b-reward-btn" onclick="if(typeof RewardLauncher!=='undefined'){RewardLauncher.open();}else{window.open('../reward/index.html','RewardSystem','width=1200,height=800');}">🎁 獎勵</button>
                        <button class="b-back-btn" onclick="Game.showSettings()">返回設定</button>
                    </div>
                </div>
                <div class="game-container">
                    <div class="b6-change-section${change === 0 ? ' exact-payment' : ''}">
                        <div class="b6-change-icon">${change === 0 ? '💯' : '🎉'}</div>
                        ${change === 0
                            ? `<div class="b6-change-text exact-text">精準付款！</div>
                               <div class="b6-change-amount exact-amt">${paid} 元，不需找零</div>`
                            : `<div class="b6-change-text">付了 ${paid} 元，找回</div>
                               <div class="b6-change-amount">${change} 元</div>`}
                        <div style="font-size:14px;color:#065f46;margin-top:4px;">買菜成功！</div>
                    </div>
                    <button class="b5-next-btn" id="b6-next-btn">下一關 →</button>
                </div>`;

                Game.EventManager.on(document.getElementById('b6-next-btn'), 'click', () => {
                    this._showRoundCompleteCard(g.currentRound + 1, items, total, paid, change, () => this.nextRound());
                }, {}, 'gameUI');

                if (change > 0) {
                    Game.TimerManager.setTimeout(() => this._animateChangeCalc(paid, total, change), 400, 'ui');
                }
            }
        },

        // ── 13. 下一關 ────────────────────────────────────────
        // 關卡完成轉場卡（B5 _showRoundTransition pattern）
        _showRoundCompleteCard(roundNum, items, total, paid, change, callback) {
            const prev = document.getElementById('b6-round-complete');
            if (prev) prev.remove();
            const card = document.createElement('div');
            card.id = 'b6-round-complete';
            card.className = 'b6-round-complete';
            card.innerHTML = `
                <div class="b6-rc-inner">
                    <div class="b6-rc-badge">第 ${roundNum} 關完成！</div>
                    <div class="b6-rc-emoji">🎉</div>
                    <div class="b6-rc-items">${items.map(it => it.name).join('・')}</div>
                    <div class="b6-rc-amounts">共 ${total} 元｜付 ${paid} 元｜找零 ${change} 元</div>
                    <div class="b6-rc-hint">點任意處繼續</div>
                </div>`;
            document.body.appendChild(card);
            const advance = () => {
                if (!card.parentNode) return;
                card.classList.add('b6-rc-fade');
                Game.TimerManager.setTimeout(() => {
                    if (card.parentNode) card.remove();
                    callback();
                }, 300, 'turnTransition');
            };
            card.addEventListener('click', advance, { once: true });
            Game.TimerManager.setTimeout(advance, 1500, 'turnTransition');
        },

        nextRound() {
            this.state.game.currentRound++;
            if (this.state.game.currentRound >= this.state.game.totalRounds) {
                this.showResults();
            } else {
                this.renderRound();
            }
        },

        // ── 14. 完成畫面（測驗總結）──────────────────────────────
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

            let badge;
            if (accuracy === 100)    badge = '完美 🥇';
            else if (accuracy >= 90) badge = '優異 🥇';
            else if (accuracy >= 70) badge = '良好 🥈';
            else if (accuracy >= 50) badge = '努力 🥉';
            else                     badge = '練習 ⭐';

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
            <a href="#" id="endgame-reward-link" class="b-res-reward-link">🎁 開啟獎勵系統</a>
        </div>
        <div class="b-res-container">
            ${(() => {
                const mkt = this.state.settings.marketType;
                if (!mkt) return '';
                const mktLabels = { traditional: { name: '傳統市場', icon: '🏪' }, supermarket: { name: '超級市場', icon: '🏬' }, nightmarket: { name: '夜市', icon: '🌙' }, random: { name: '隨機市場', icon: '🎲' } };
                const info = mktLabels[mkt] || mktLabels.traditional;
                return `<div class="b6-mkt-banner">${info.icon} 本次練習：${info.name}</div>`;
            })()}
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

            this._fireConfetti();
            Game.TimerManager.setTimeout(() => {
                let msg;
                if (accuracy === 100)    msg = '太厲害了，全部完成了！';
                else if (accuracy >= 80) msg = `很棒喔，完成了${g.correctCount}關！`;
                else if (accuracy >= 60) msg = '不錯喔，繼續加油！';
                else                     msg = '要再加油喔，多練習幾次！';
                Game.Speech.speak(msg);
            }, 300, 'speech');
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
            this._overlay.id = 'b6-assist-overlay';
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
            // Wait for intro modal / round complete card to dismiss
            if (document.getElementById('b6-mission-intro') || document.getElementById('b6-round-complete')) return;
            this._clearHighlight();
            this._queue = [];

            const g = Game.state.game;
            if (!g || !g.mission) return;

            // Change quiz phase: click correct change option
            const changeOpts = document.querySelectorAll('.b6-change-opt:not([disabled])');
            if (changeOpts.length > 0) {
                const total = Game._calcMissionTotal();
                const correctChange = g.paidAmount - total;
                const correctOpt = document.querySelector(`.b6-change-opt[data-value="${correctChange}"]`);
                if (correctOpt && !correctOpt.disabled) {
                    this._highlight(correctOpt);
                    this._queue = [{ el: correctOpt, action: () => correctOpt.click() }];
                }
                return;
            }

            // Result next-round button
            const nextBtn = document.getElementById('b6-next-btn');
            if (nextBtn) {
                this._highlight(nextBtn);
                this._queue = [{ el: nextBtn, action: () => nextBtn.click() }];
                return;
            }

            // Payment phase
            if (g.phase === 'payment') {
                const payBtn = document.getElementById('b6-pay-btn');
                if (payBtn && !payBtn.disabled) {
                    this._highlight(payBtn);
                    this._queue = [{ el: payBtn, action: () => payBtn.click() }];
                } else {
                    const total = Game._calcMissionTotal();
                    const remaining = total - g.paidAmount;
                    if (remaining > 0) {
                        // Greedy: largest bill ≤ remaining (B6_BILLS already sorted large→small)
                        let nextBill = B6_BILLS.find(b => b.value <= remaining) || B6_BILLS[B6_BILLS.length - 1];
                        const billBtn = document.querySelector(`.b6-bill-btn[data-value="${nextBill.value}"]`);
                        if (billBtn) {
                            this._highlight(billBtn);
                            this._queue = [{ el: billBtn, action: () => billBtn.click() }];
                        }
                    }
                }
                return;
            }

            // Shopping phase: find a stall with unmet quota, navigate, click cheapest valid item
            // 確認清單彈窗已開啟 → 點「去付款」
            const ccGo = document.getElementById('b6-cc-go');
            if (ccGo) {
                this._highlight(ccGo);
                this._queue = [{ el: ccGo, action: () => ccGo.click() }];
                return;
            }
            // All done → checkout
            const checkoutBtn = document.getElementById('b6-checkout-btn');
            if (checkoutBtn && !checkoutBtn.disabled) {
                this._highlight(checkoutBtn);
                this._queue = [{ el: checkoutBtn, action: () => checkoutBtn.click() }];
                return;
            }

            // Find first stall with unmet quota
            const mission = g.mission;
            const budget  = mission.budget;
            const currentTotal = Game._calcMissionTotal();
            const unmetReq = (mission.stalls || []).find(req => {
                const cnt = (g.selectedItems || []).filter(i => i.stall === req.stall).length;
                return cnt < req.count;
            });
            if (!unmetReq) return;

            // Navigate to that stall if not already there
            if (unmetReq.stall !== g.activeStall) {
                const _sk  = Object.keys(_currentStalls);
                const curI = _sk.indexOf(g.activeStall);
                const tgtI = _sk.indexOf(unmetReq.stall);
                const navBtn = document.getElementById(tgtI > curI ? 'b6-stall-next' : 'b6-stall-prev');
                if (navBtn && !navBtn.disabled) {
                    this._highlight(navBtn);
                    this._queue = [{ el: navBtn, action: () => navBtn.click() }];
                }
                return;
            }

            // Find cheapest unselected affordable item in this stall
            const alreadySelected = new Set((g.selectedItems || []).filter(i => i.stall === g.activeStall).map(i => i.id));
            const stallItems = _currentStalls[g.activeStall]?.items || [];
            const affordable = stallItems
                .filter(item => !alreadySelected.has(item.id) && (currentTotal + item.price) <= budget)
                .sort((a, b) => a.price - b.price);
            const pick = affordable[0];
            if (pick) {
                const productBtn2 = document.querySelector(`.b6-product-btn[data-item-id="${pick.id}"]`);
                if (productBtn2) {
                    this._highlight(productBtn2);
                    this._queue = [{ el: productBtn2, action: () => productBtn2.click() }];
                }
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
