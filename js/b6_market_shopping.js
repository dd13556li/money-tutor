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
        { budget: 100, items: [
            { stall: 'vegetable', id: 'corn' },
            { stall: 'vegetable', id: 'cucumber' },
        ]},  // 總價35，找零65
        { budget: 150, items: [
            { stall: 'fruit',     id: 'peach' },
            { stall: 'vegetable', id: 'corn' },
        ]},  // 總價70，找零80
        { budget: 100, items: [
            { stall: 'fruit',     id: 'guava' },
            { stall: 'grocery',   id: 'sugar' },
        ]},  // 總價65，找零35
        { budget: 150, items: [
            { stall: 'vegetable', id: 'broccoli' },
            { stall: 'grocery',   id: 'miso' },
            { stall: 'vegetable', id: 'cucumber' },
        ]},  // 總價105，找零45
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
        { budget: 250, items: [
            { stall: 'fruit',     id: 'pineapple' },
            { stall: 'vegetable', id: 'daikon' },
            { stall: 'grocery',   id: 'miso' },
        ]},  // 總價140，找零110
        { budget: 300, items: [
            { stall: 'fruit',     id: 'peach' },
            { stall: 'vegetable', id: 'broccoli' },
            { stall: 'grocery',   id: 'oil' },
            { stall: 'grocery',   id: 'sugar' },
        ]},  // 總價205，找零95
        { budget: 200, items: [
            { stall: 'fruit',     id: 'papaya' },
            { stall: 'vegetable', id: 'corn' },
            { stall: 'grocery',   id: 'canned' },
        ]},  // 總價95，找零105
        { budget: 250, items: [
            { stall: 'vegetable', id: 'pumpkin' },
            { stall: 'grocery',   id: 'tissue' },
            { stall: 'fruit',     id: 'guava' },
        ]},  // 總價140，找零110
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
        { budget: 400, items: [
            { stall: 'fruit',     id: 'strawberry' },
            { stall: 'grocery',   id: 'oil' },
            { stall: 'vegetable', id: 'broccoli' },
            { stall: 'vegetable', id: 'pumpkin' },
            { stall: 'grocery',   id: 'sugar' },
        ]},  // 總價305，找零95
        { budget: 500, items: [
            { stall: 'fruit',     id: 'pineapple' },
            { stall: 'grocery',   id: 'tissue' },
            { stall: 'grocery',   id: 'soap' },
            { stall: 'vegetable', id: 'daikon' },
            { stall: 'fruit',     id: 'papaya' },
        ]},  // 總價240，找零260
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
                ],
            },
        },
        missions: {
            easy: [
                { budget: 100, items: [{ stall:'bakery',  id:'bun'       }, { stall:'bakery',  id:'bread'      }]},  // 50元，找零50
                { budget: 100, items: [{ stall:'dairy',   id:'yogurt'    }, { stall:'bakery',  id:'muffin'     }]},  // 65元，找零35
                { budget: 150, items: [{ stall:'frozen',  id:'ice_cream' }, { stall:'bakery',  id:'toast'      }]},  // 80元，找零70
                { budget: 100, items: [{ stall:'dairy',   id:'cream'     }, { stall:'bakery',  id:'muffin'     }]},  // 70元，找零30
                { budget: 200, items: [{ stall:'bakery',  id:'bread'     }, { stall:'frozen',  id:'edamame'    }]},  // 65元，找零135
                { budget: 100, items: [{ stall:'frozen',  id:'ice_cream' }, { stall:'bakery',  id:'bun'        }]},  // 65元，找零35
                { budget: 150, items: [{ stall:'dairy',   id:'yogurt'    }, { stall:'frozen',  id:'edamame'    }, { stall:'bakery',  id:'bun'        }]},  // 95元，找零55
                { budget: 200, items: [{ stall:'bakery',  id:'toast'     }, { stall:'frozen',  id:'fish_ball'  }]},  // 85元，找零115
                { budget: 100, items: [{ stall:'dairy',   id:'pudding'   }, { stall:'bakery',  id:'donut'      }]},  // 55元，找零45
                { budget: 150, items: [{ stall:'frozen',  id:'corn_dog'  }, { stall:'bakery',  id:'bun'        }, { stall:'dairy',   id:'pudding'    }]},  // 90元，找零60
                { budget: 100, items: [{ stall:'dairy',   id:'soy_milk'  }, { stall:'bakery',  id:'muffin'     }]},  // 60元，找零40
                { budget: 150, items: [{ stall:'bakery',  id:'bagel'     }, { stall:'dairy',   id:'ice_coffee' }]},  // 70元，找零80
            ],
            normal: [
                { budget: 200, items: [{ stall:'bakery',  id:'bread'     }, { stall:'bakery',  id:'croissant'  }, { stall:'dairy',   id:'yogurt'     }]},  // 115，找零85
                { budget: 300, items: [{ stall:'dairy',   id:'milk'      }, { stall:'frozen',  id:'dumpling'   }, { stall:'bakery',  id:'bun'        }]},  // 145，找零155
                { budget: 250, items: [{ stall:'bakery',  id:'cake_slice'}, { stall:'dairy',   id:'cream'      }, { stall:'frozen',  id:'ice_cream'  }, { stall:'bakery',  id:'muffin'     }]},  // 170，找零80
                { budget: 200, items: [{ stall:'frozen',  id:'sausage'   }, { stall:'dairy',   id:'yogurt'     }, { stall:'bakery',  id:'toast'      }]},  // 135，找零65
                { budget: 300, items: [{ stall:'dairy',   id:'sm_egg'    }, { stall:'frozen',  id:'fish_ball'  }, { stall:'bakery',  id:'croissant'  }]},  // 140，找零160
                { budget: 250, items: [{ stall:'frozen',  id:'nugget'    }, { stall:'dairy',   id:'cream'      }, { stall:'bakery',  id:'bread'      }, { stall:'bakery',  id:'bun'        }]},  // 185，找零65
                { budget: 250, items: [{ stall:'bakery',  id:'cake_slice'}, { stall:'dairy',   id:'butter'     }, { stall:'frozen',  id:'edamame'    }]},  // 160，找零90
                { budget: 300, items: [{ stall:'frozen',  id:'dumpling'  }, { stall:'dairy',   id:'yogurt'     }, { stall:'frozen',  id:'edamame'    }, { stall:'bakery',  id:'toast'      }]},  // 185，找零115
                { budget: 250, items: [{ stall:'bakery',  id:'waffle'    }, { stall:'dairy',   id:'oat_milk'   }, { stall:'frozen',  id:'corn_dog'   }]},  // 150，找零100
                { budget: 300, items: [{ stall:'frozen',  id:'wonton'    }, { stall:'dairy',   id:'milk'       }, { stall:'bakery',  id:'cookie'     }, { stall:'bakery',  id:'donut'      }]},  // 205，找零95
                { budget: 200, items: [{ stall:'frozen',  id:'pizza'     }, { stall:'dairy',   id:'pudding'    }, { stall:'bakery',  id:'bun'        }]},  // 120，找零80
                { budget: 250, items: [{ stall:'dairy',   id:'oat_milk'  }, { stall:'bakery',  id:'bagel'      }, { stall:'frozen',  id:'fish_ball'  }, { stall:'dairy',   id:'ice_coffee' }]},  // 180，找零70
            ],
            hard: [
                { budget: 500, items: [{ stall:'dairy',   id:'milk'      }, { stall:'dairy',   id:'cheese'     }, { stall:'frozen',  id:'dumpling'   }, { stall:'bakery',  id:'bread'      }, { stall:'bakery',  id:'croissant'  }]},  // 280，找零220
                { budget: 300, items: [{ stall:'frozen',  id:'nugget'    }, { stall:'frozen',  id:'sausage'    }, { stall:'dairy',   id:'yogurt'     }, { stall:'bakery',  id:'cake_slice' }]},  // 245，找零55
                { budget: 400, items: [{ stall:'dairy',   id:'butter'    }, { stall:'frozen',  id:'dumpling'   }, { stall:'bakery',  id:'toast'      }, { stall:'dairy',   id:'cream'      }]},  // 220，找零180
                { budget: 500, items: [{ stall:'dairy',   id:'cheese'    }, { stall:'frozen',  id:'nugget'     }, { stall:'bakery',  id:'cake_slice' }, { stall:'frozen',  id:'sausage'    }, { stall:'bakery',  id:'bread'      }]},  // 295，找零205
                { budget: 300, items: [{ stall:'frozen',  id:'fish_ball' }, { stall:'dairy',   id:'sm_egg'     }, { stall:'bakery',  id:'croissant'  }, { stall:'frozen',  id:'edamame'    }]},  // 185，找零115
                { budget: 400, items: [{ stall:'dairy',   id:'milk'      }, { stall:'bakery',  id:'cake_slice' }, { stall:'frozen',  id:'dumpling'   }, { stall:'dairy',   id:'butter'     }, { stall:'bakery',  id:'muffin'     }]},  // 295，找零105
                { budget: 500, items: [{ stall:'frozen',  id:'shrimp'    }, { stall:'frozen',  id:'wonton'     }, { stall:'dairy',   id:'oat_milk'   }, { stall:'bakery',  id:'waffle'     }, { stall:'dairy',   id:'cheese'     }]},  // 355，找零145
                { budget: 400, items: [{ stall:'bakery',  id:'cookie'    }, { stall:'frozen',  id:'pizza'      }, { stall:'dairy',   id:'butter'     }, { stall:'frozen',  id:'nugget'     }, { stall:'bakery',  id:'bagel'      }]},  // 290，找零110
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
                { budget: 100, items: [{ stall:'drink',    id:'sugarcane'    }, { stall:'drink',    id:'soymilk'     }]},  // 65元，找零35
                { budget: 100, items: [{ stall:'snack',    id:'pancake'      }, { stall:'drink',    id:'sugarcane'   }]},  // 65元，找零35
                { budget: 150, items: [{ stall:'souvenir', id:'hairpin'      }, { stall:'souvenir', id:'bookmark'    }, { stall:'drink',    id:'sugarcane'   }]},  // 80元，找零70
                { budget: 100, items: [{ stall:'drink',    id:'lemon_tea'    }, { stall:'drink',    id:'soymilk'     }]},  // 75元，找零25
                { budget: 200, items: [{ stall:'snack',    id:'pancake'      }, { stall:'souvenir', id:'magnet'      }]},  // 70元，找零130
                { budget: 100, items: [{ stall:'snack',    id:'stinky_tofu'  }, { stall:'drink',    id:'sugarcane'   }]},  // 75元，找零25
                { budget: 150, items: [{ stall:'drink',    id:'milk_tea'     }, { stall:'souvenir', id:'hairpin'     }, { stall:'drink',    id:'sugarcane'   }]},  // 105元，找零45
                { budget: 200, items: [{ stall:'souvenir', id:'keychain'     }, { stall:'drink',    id:'lemon_tea'   }]},  // 85元，找零115
                { budget: 100, items: [{ stall:'snack',    id:'sweet_potato_ball'},{ stall:'drink',  id:'iced_tea'   }]},  // 60元，找零40
                { budget: 100, items: [{ stall:'souvenir', id:'postcard'     }, { stall:'souvenir', id:'sticker'     }, { stall:'drink',    id:'iced_tea'    }]},  // 75元，找零25
                { budget: 150, items: [{ stall:'snack',    id:'oyster_omelet'}, { stall:'souvenir', id:'badge_pin'   }]},  // 90元，找零60
                { budget: 150, items: [{ stall:'snack',    id:'chicken_chop' }, { stall:'souvenir', id:'sticker'     }]},  // 85元，找零65
            ],
            normal: [
                { budget: 200, items: [{ stall:'snack',    id:'oysternoodle' }, { stall:'drink',    id:'milk_tea'    }, { stall:'souvenir', id:'hairpin'     }]},  // 125，找零75
                { budget: 300, items: [{ stall:'snack',    id:'beefnoodle'   }, { stall:'drink',    id:'bubble_tea'  }, { stall:'souvenir', id:'magnet'      }]},  // 170，找零130
                { budget: 250, items: [{ stall:'snack',    id:'pancake'      }, { stall:'drink',    id:'lemon_tea'   }, { stall:'snack',    id:'takoyaki'    }, { stall:'drink', id:'sugarcane'}]},  // 155，找零95
                { budget: 200, items: [{ stall:'souvenir', id:'keychain'     }, { stall:'snack',    id:'stinky_tofu' }, { stall:'drink',    id:'milk_tea'    }]},  // 140，找零60
                { budget: 300, items: [{ stall:'souvenir', id:'wristband'    }, { stall:'snack',    id:'popcorn_chk' }, { stall:'drink',    id:'smoothie'    }]},  // 170，找零130
                { budget: 250, items: [{ stall:'drink',    id:'bubble_tea'   }, { stall:'souvenir', id:'magnet'      }, { stall:'snack',    id:'oysternoodle'}, { stall:'drink', id:'sugarcane'}]},  // 165，找零85
                { budget: 250, items: [{ stall:'snack',    id:'takoyaki'     }, { stall:'drink',    id:'smoothie'    }, { stall:'souvenir', id:'keychain'    }]},  // 145，找零105
                { budget: 300, items: [{ stall:'snack',    id:'pancake'      }, { stall:'souvenir', id:'wristband'   }, { stall:'drink',    id:'milk_tea'    }, { stall:'drink', id:'lemon_tea'}]},  // 180，找零120
                { budget: 200, items: [{ stall:'snack',    id:'chicken_chop' }, { stall:'drink',    id:'taro_milk'   }, { stall:'souvenir', id:'postcard'    }]},  // 140，找零60
                { budget: 250, items: [{ stall:'souvenir', id:'plush'        }, { stall:'snack',    id:'oyster_omelet'}, { stall:'drink',   id:'iced_tea'    }]},  // 180，找零70
                { budget: 300, items: [{ stall:'souvenir', id:'charm'        }, { stall:'souvenir', id:'fan'         }, { stall:'snack',    id:'beefnoodle'  }, { stall:'drink', id:'sugarcane'}]},  // 215，找零85
                { budget: 200, items: [{ stall:'snack',    id:'fishball_soup'}, { stall:'drink',    id:'papaya_milk' }, { stall:'souvenir', id:'lanyard'     }]},  // 130，找零70
            ],
            hard: [
                { budget: 500, items: [{ stall:'snack',    id:'beefnoodle'   }, { stall:'drink',    id:'bubble_tea'  }, { stall:'souvenir', id:'phone_case'  }, { stall:'snack',    id:'oysternoodle'}, { stall:'drink',    id:'milk_tea'   }]},  // 330，找零170
                { budget: 300, items: [{ stall:'souvenir', id:'phone_case'   }, { stall:'snack',    id:'stinky_tofu' }, { stall:'drink',    id:'smoothie'    }, { stall:'souvenir', id:'magnet'      }]},  // 210，找零90
                { budget: 400, items: [{ stall:'snack',    id:'popcorn_chk'  }, { stall:'drink',    id:'bubble_tea'  }, { stall:'souvenir', id:'wristband'   }, { stall:'snack',    id:'pancake'     }]},  // 210，找零190
                { budget: 500, items: [{ stall:'souvenir', id:'phone_case'   }, { stall:'souvenir', id:'keychain'    }, { stall:'snack',    id:'beefnoodle'  }, { stall:'drink',    id:'smoothie'    }, { stall:'drink',    id:'sugarcane'  }]},  // 310，找零190
                { budget: 300, items: [{ stall:'snack',    id:'takoyaki'     }, { stall:'drink',    id:'bubble_tea'  }, { stall:'souvenir', id:'keychain'    }, { stall:'drink',    id:'soymilk'     }]},  // 185，找零115
                { budget: 400, items: [{ stall:'snack',    id:'oysternoodle' }, { stall:'souvenir', id:'phone_case'  }, { stall:'drink',    id:'lemon_tea'   }, { stall:'snack',    id:'stinky_tofu' }, { stall:'drink',    id:'milk_tea'  }]},  // 305，找零95
                { budget: 400, items: [{ stall:'snack',    id:'chicken_chop' }, { stall:'souvenir', id:'plush'       }, { stall:'drink',    id:'taro_milk'   }, { stall:'souvenir', id:'charm'       }, { stall:'snack',    id:'sweet_potato_ball'}]},  // 295，找零105
                { budget: 300, items: [{ stall:'souvenir', id:'fan'          }, { stall:'souvenir', id:'lanyard'     }, { stall:'snack',    id:'oyster_omelet'}, { stall:'drink',   id:'bubble_tea'  }, { stall:'souvenir', id:'badge_pin'  }]},  // 235，找零65
                { budget: 500, items: [{ stall:'souvenir', id:'plush'        }, { stall:'souvenir', id:'tote_bag'    }, { stall:'snack',    id:'beefnoodle'  }, { stall:'drink',    id:'papaya_milk' }, { stall:'souvenir', id:'charm'      }]},  // 370，找零130
                { budget: 400, items: [{ stall:'snack',    id:'chicken_chop' }, { stall:'snack',    id:'oyster_omelet'}, { stall:'drink',   id:'taro_milk'   }, { stall:'souvenir', id:'fan'         }, { stall:'souvenir', id:'postcard'   }]},  // 255，找零145
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
                collectedIds: new Set(),
                activeStall: Object.keys(_currentStalls)[0],
                phase: 'shopping', // 'shopping' | 'payment' | 'change'
                paidAmount: 0,
                receipts: [],
                stallStats: {},   // { stallKey: totalSpent }
                exactPayments: 0, // 精準付款次數（Round 33）
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
            g.collectedIds = new Set();
            g.activeStall = Object.keys(_currentStalls)[0];
            g.phase       = 'shopping';
            g.paidAmount  = 0;
            g.customItems = []; // 自訂購物項目

            this._renderShoppingUI();
            this._showMissionIntroModal(g.mission, g.currentRound + 1, () => {
                // afterClose callback（B1 pattern）：easy 模式逐項朗讀採購項目
                if (this.state.settings.difficulty === 'easy') {
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
            const g = this.state.game;
            const items = mission.items.map(({ stall, id }) => {
                const item = _currentStalls[stall]?.items.find(i => i.id === id);
                return item ? `<span class="b6-mi-item">${item.icon} ${item.name}</span>` : '';
            }).filter(Boolean).join('');
            const names = mission.items.map(({ stall, id }) => {
                const item = _currentStalls[stall]?.items.find(i => i.id === id);
                return item ? item.name : '';
            }).filter(Boolean).join('、');

            const mktKey = mission._mktKey || this.state.settings.marketType;
            const mkt = B6_MARKETS[mktKey] || B6_MARKETS.traditional;
            const mktLabel = `${mkt.icon} ${mkt.name}`;
            const isFirstRound = roundNum === 1;
            const roundTitle = isFirstRound ? `${mktLabel} 第 ${roundNum} 關` : `第 ${roundNum} 關`;

            const modal = document.createElement('div');
            modal.id = 'b6-mission-intro';
            modal.className = 'b6-mission-intro';
            modal.innerHTML = `
                <div class="b6-mi-card">
                    <div class="b6-mi-round">${roundTitle}</div>
                    <div class="b6-mi-title">🛒 今天的採購任務</div>
                    <div class="b6-mi-items">${items}</div>
                    <div class="b6-mi-budget">預算：<b>${mission.budget}</b> 元</div>
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
            Game.Speech.speak(`${welcomePrefix}第${roundNum}關，今天要買：${names}，預算${mission.budget}元。`, dismiss);
            modal.addEventListener('click', dismiss, { once: true });
            Game.TimerManager.setTimeout(dismiss, 3200, 'turnTransition');
        },

        // ── 簡單模式：採購項目逐項朗讀（B1 _speakItemsOneByOne pattern）─
        _speakMissionItemsOneByOne(mission) {
            const items = mission.items.map(({ stall, id }) => {
                const item = _currentStalls[stall]?.items.find(i => i.id === id);
                return item ? item : null;
            }).filter(Boolean);
            if (!items.length) return;
            let idx = 0;
            const speakNext = () => {
                if (idx >= items.length) {
                    Game.TimerManager.setTimeout(() => {
                        Game.Speech.speak(`共${items.length}樣商品，準備出發！`);
                    }, 300, 'speech');
                    return;
                }
                const item = items[idx++];
                Game.Speech.speak(`${item.name}，${toTWD(item.price)}`, () => {
                    Game.TimerManager.setTimeout(speakNext, 350, 'speech');
                });
            };
            speakNext();
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

            const listHTML = mission.items.map(({ stall, id }) => {
                const item  = _currentStalls[stall].items.find(i => i.id === id);
                const done  = g.collectedIds.has(id);
                return `
                <div class="b6-list-item ${done ? 'checked' : ''}" data-item-id="${id}">
                    <span class="b6-list-icon">${item.icon}</span>
                    <span class="b6-list-name">${item.name}</span>
                    <span class="b6-list-price">${item.price} 元</span>
                    <span class="b6-list-check">✅</span>
                </div>`;
            }).join('');

            const stallKeys = Object.keys(_currentStalls);
            const stallIdx  = stallKeys.indexOf(g.activeStall);
            const isFirst   = stallIdx <= 0;
            const isLast    = stallIdx >= stallKeys.length - 1;

            // 攤位點狀進度指示
            const stallDotsHTML = stallKeys.map((k, i) => {
                const stallNeedIds = mission.items.filter(mi => mi.stall === k).map(mi => mi.id);
                const remaining    = stallNeedIds.filter(id => !g.collectedIds.has(id)).length;
                const hasItems     = stallNeedIds.length > 0;
                const done         = hasItems && remaining === 0;
                const active       = k === g.activeStall;
                return `<span class="b6-snav-dot${active ? ' active' : ''}${done ? ' done' : ''}${hasItems && !done ? ' has-items' : ''}" title="${_currentStalls[k].name}"></span>`;
            }).join('');

            const stallItems = _currentStalls[g.activeStall].items;
            const needIds    = new Set(mission.items.map(i => i.id));
            const productsHTML = stallItems.map(item => {
                const collected  = g.collectedIds.has(item.id);
                const inList     = needIds.has(item.id);
                return `
                <button class="b6-product-btn ${collected ? 'collected' : ''} ${inList ? 'in-list' : 'not-in-list'}"
                        data-item-id="${item.id}" data-stall="${g.activeStall}" ${collected ? 'disabled' : ''}>
                    <span class="b6-product-icon">${item.icon}</span>
                    <span class="b6-product-name">${item.name}</span>
                    <span class="b6-product-price">${item.price} 元</span>
                    <span class="b6-product-unit">/ ${item.unit}</span>
                    ${collected ? '<span class="b6-product-collected-mark">✅</span>' : ''}
                </button>`;
            }).join('');

            const allDone  = mission.items.every(({ id }) => g.collectedIds.has(id));
            const collectedCount = g.collectedIds.size;
            const mktKey = this.state.settings.marketType;
            const mktInfo = mktKey === 'random' ? { icon: '🎲', name: '隨機市場' } : (B6_MARKETS[mktKey] || { icon: '🛒', name: '菜市場' });

            const app = document.getElementById('app');
            app.innerHTML = `
            <div class="b-header">
                <div class="b-header-left">
                    <img src="../images/index/educated_money_bag_character.png" alt="" class="b-header-mascot" onerror="this.style.display='none'"><span class="b-header-unit">${mktInfo.icon} ${mktInfo.name}</span>
                </div>
                <div class="b-header-center">${{ easy: '簡單模式', normal: '普通模式', hard: '困難模式' }[this.state.settings.difficulty] || ''}</div>
                <div class="b-header-right">
                    <span class="b-progress">第 ${g.currentRound + 1} 關 / 共 ${g.totalRounds} 關</span>
                    <button class="b-reward-btn" onclick="if(typeof RewardLauncher!=='undefined'){RewardLauncher.open();}else{window.open('../reward/index.html','RewardSystem','width=1200,height=800');}">🎁 獎勵</button>
                    <button class="b-back-btn" onclick="Game.showSettings()">返回設定</button>
                </div>
            </div>
            <div class="game-container">

                <!-- 任務卡 -->
                <div class="b6-task-card">
                    <div class="b6-task-hdr">
                        <div class="b6-task-hdr-left">
                            <img src="../images/index/educated_money_bag_character.png" class="b6-task-mascot" onerror="this.style.display='none'" alt="">
                            <div class="b6-task-hdr-text">
                                <div class="b6-task-title">📋 今天要買的東西</div>
                                <div class="b6-task-budget">預算：<strong>${mission.budget} 元</strong></div>
                            </div>
                        </div>
                        <button class="b6-replay-btn" id="replay-speech-btn" title="重播語音">🔊</button>
                    </div>
                    <div class="b6-task-items">
                        ${listHTML}
                    </div>
                </div>

                <!-- 市場卡（左右按鈕切換攤位） -->
                <div class="b6-market-card">
                    <div class="b6-stall-nav">
                        <button class="b6-snav-btn" id="b6-stall-prev" ${isFirst ? 'disabled' : ''}>◀</button>
                        <div class="b6-snav-center">
                            <div class="b6-snav-label">${_currentStalls[g.activeStall].icon} ${_currentStalls[g.activeStall].name}</div>
                            <div class="b6-snav-dots">${stallDotsHTML}</div>
                        </div>
                        <button class="b6-snav-btn" id="b6-stall-next" ${isLast ? 'disabled' : ''}>▶</button>
                    </div>
                    <div class="b6-stall-panel">
                        <div class="b6-products-grid">${productsHTML}</div>
                    </div>
                </div>

                <!-- 自訂購物項目 -->
                <div id="b6-custom-items-list"></div>
                ${this.state.settings.customItemsEnabled && this.state.settings.difficulty !== 'easy' ? this._renderCustomItemsPanel() : ''}

                <!-- 結帳列 -->
                <div class="b6-checkout-strip">
                    <div class="b6-cstrip-info">
                        <span class="b6-cstrip-count">🛒 <strong>${collectedCount}</strong> / ${mission.items.length} 件</span>
                        <span class="b6-cstrip-total">小計：<span class="b6-basket-total">${total}</span> 元</span>
                    </div>
                    <button class="b6-checkout-btn" id="b6-checkout-btn" ${allDone ? '' : 'disabled'}>
                        前往結帳 →
                    </button>
                </div>
            </div>`;

            this._bindShoppingEvents();
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
            const _switchStall = (newKey) => {
                if (g.activeStall === newKey) return;
                // 顯示離開攤位的小計（B6 stall subtotal, Round 25）
                const leavingStall = g.activeStall;
                const collectedHere = g.mission.items.filter(i => i.stall === leavingStall && g.collectedIds.has(i.id));
                if (collectedHere.length > 0) {
                    const subtotal = collectedHere.reduce((s, item) => {
                        const found = (_currentStalls[leavingStall]?.items || []).find(p => p.id === item.id);
                        return s + (found?.price || 0);
                    }, 0);
                    this._showStallSubtotal(_currentStalls[leavingStall].name, subtotal);
                }
                this.audio.play('click');
                g.activeStall = newKey;
                // 切換至已完成攤位提示（Round 45）
                const destNeeded = g.mission.items.filter(i => i.stall === newKey);
                const destDone   = destNeeded.every(i => g.collectedIds.has(i.id));
                if (destDone && destNeeded.length > 0) {
                    const toast45 = document.createElement('div');
                    toast45.className = 'b6-stall-done-toast';
                    toast45.textContent = `✅ ${_currentStalls[newKey]?.name || ''} 已收集完畢！`;
                    document.body.appendChild(toast45);
                    Game.TimerManager.setTimeout(() => { toast45.classList.add('b6-sdt-fade'); }, 1000, 'ui');
                    Game.TimerManager.setTimeout(() => { if (document.body.contains(toast45)) toast45.remove(); }, 1600, 'ui');
                }
                // 攤位商品語音引導（Round 39）：說出攤位名 + 需要收集的商品
                const stallInfo = _currentStalls[newKey];
                const neededHere = g.mission.items
                    .filter(mi => mi.stall === newKey && !g.collectedIds.has(mi.id))
                    .map(mi => { const d = stallInfo?.items.find(p => p.id === mi.id); return d ? d.name : mi.id; });
                Game.Speech.speak(neededHere.length > 0
                    ? `${stallInfo.name}，要找${neededHere.join('和')}`
                    : `${stallInfo.name}，這裡已全部收集！`);
                this._renderShoppingUI();
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

            // 商品點擊
            document.querySelectorAll('.b6-product-btn:not([disabled])').forEach(btn => {
                Game.EventManager.on(btn, 'click', () => {
                    const itemId = btn.dataset.itemId;
                    const stall  = btn.dataset.stall;
                    const needIds = new Set(g.mission.items.map(i => i.id));

                    if (!needIds.has(itemId)) {
                        this.audio.play('error');
                        const itemData = _currentStalls[stall].items.find(i => i.id === itemId);
                        const itemName = itemData ? itemData.name : '這個';
                        // 找出此攤位還需要收集的商品
                        const neededAtStall = g.mission.items
                            .filter(mi => mi.stall === stall && !g.collectedIds.has(mi.id))
                            .map(mi => {
                                const d = _currentStalls[stall]?.items.find(p => p.id === mi.id);
                                return d ? `${d.icon} ${d.name}` : mi.id;
                            });
                        const tipId = 'b6-wrong-tip';
                        let tip = document.getElementById(tipId);
                        if (!tip) {
                            tip = document.createElement('div');
                            tip.id = tipId;
                            document.body.appendChild(tip);
                        }
                        tip.className = 'b6-wrong-tip';
                        if (neededAtStall.length > 0) {
                            tip.innerHTML = `<div class="b6-wt-msg">❌ ${itemName}不在清單上</div>` +
                                `<div class="b6-wt-hint">這裡需要：${neededAtStall.join('、')}</div>`;
                            Game.Speech.speak(`${itemName}不對，這裡需要${neededAtStall.map(s=>s.replace(/^\S+\s/,'')).join('和')}`);
                        } else {
                            tip.innerHTML = `<div class="b6-wt-msg">❌ ${itemName}不在今天的購物清單上</div>`;
                            Game.Speech.speak(`${itemName}不在今天的購物清單上`);
                        }
                        Game.TimerManager.clearByCategory('wrongTip');
                        Game.TimerManager.setTimeout(() => { tip?.remove(); }, 2400, 'wrongTip');
                        return;
                    }

                    g.collectedIds.add(itemId);
                    this.audio.play('correct');
                    btn.classList.add('collected');
                    btn.disabled = true;
                    // 收集進度動畫（Round 27）
                    const collected = g.collectedIds.size;
                    const needed    = g.mission.items.length;
                    this._showCollectionProgress(collected, needed);

                    // Update list item + 彈出價格動畫（A4 transaction pattern）
                    const listItem = document.querySelector(`.b6-list-item[data-item-id="${itemId}"]`);
                    if (listItem) {
                        listItem.classList.add('checked', 'b6-list-bounce');
                        Game.TimerManager.setTimeout(
                            () => listItem.classList.remove('b6-list-bounce'), 600, 'ui'
                        );
                        const itemData = _currentStalls[stall].items.find(i => i.id === itemId);
                        if (itemData) {
                            this._showPricePopup(listItem, itemData.price);
                            Game.Speech.speak(`${itemData.name}，${itemData.price}元`);
                        }
                    }

                    // 收據飛出（Round 37）
                    if (itemData) this._showItemReceiptFlyout(listItem, itemData);

                    // Update total and checkout button
                    const total     = this._calcMissionTotal();
                    const basketEl  = document.querySelector('.b6-basket-total');
                    if (basketEl) basketEl.textContent = total;

                    // Update checkout strip count
                    const cstripCountEl = document.querySelector('.b6-cstrip-count');
                    if (cstripCountEl) cstripCountEl.innerHTML = `🛒 <strong>${g.collectedIds.size}</strong> / ${g.mission.items.length} 件`;

                    // 浮動購物籃計數（Round 30）
                    this._updateCartBadge(g.collectedIds.size, g.mission.items.length);

                    const allDone   = g.mission.items.every(({ id }) => g.collectedIds.has(id));
                    const checkoutBtn = document.getElementById('b6-checkout-btn');
                    if (checkoutBtn) {
                        const wasDone = !checkoutBtn.disabled;
                        checkoutBtn.disabled = !allDone;
                        if (allDone && !wasDone) {
                            Game.Speech.speak('所有商品收集完成，可以去結帳了！');
                            this._showAllCollectedFlash();
                        }
                    }

                    // 攤位完成慶祝（Round 36）：更新 nav dot 為完成狀態
                    const currentStall = g.activeStall;
                    if (currentStall) {
                        const stallItems = g.mission.items.filter(i => i.stall === currentStall);
                        const stallDone  = stallItems.every(i => g.collectedIds.has(i.id));
                        if (stallDone) {
                            const _sKeys = Object.keys(_currentStalls);
                            const _sIdx  = _sKeys.indexOf(currentStall);
                            const dot = document.querySelectorAll('.b6-snav-dot')[_sIdx];
                            if (dot) { dot.classList.remove('has-items'); dot.classList.add('done'); }
                        }
                    }
                }, {}, 'gameUI');
            });

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
                    const text = this.state.game.lastSpeechText;
                    if (text) Game.Speech.speak(text);
                }, {}, 'gameUI');
            }
            // 自訂購物項目面板
            if (this.state.settings.customItemsEnabled && this.state.settings.difficulty !== 'easy') {
                this._bindCustomItemsPanel();
            }
        },

        // ── 結帳前確認清單（B1 _showTaskModal pattern）──────────
        _showCheckoutConfirm(g, callback) {
            const existing = document.getElementById('b6-checkout-confirm');
            if (existing) { existing.remove(); callback(); return; }
            const items = g.mission.items.filter(({ id }) => g.collectedIds.has(id));
            const resolve = (item) => (_currentStalls[item.stall]?.items || []).find(i => i.id === item.id);
            const total = items.reduce((sum, item) => sum + (resolve(item)?.price || 0), 0);
            const itemRows = items.map(item => {
                const found = resolve(item);
                return `<div class="b6-cc-row"><span>${found?.icon || ''} ${found?.name || item.id}</span><span>${found?.price || 0} 元</span></div>`;
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
            flyout.className = 'b6-item-flyout';
            flyout.innerHTML = `<span class="b6-if-icon">${item.icon || '🛒'}</span><span class="b6-if-name">${item.name}</span><span class="b6-if-price">+${item.price}元</span>`;
            const rect = anchor ? anchor.getBoundingClientRect() : null;
            if (rect) {
                flyout.style.cssText = `position:fixed;top:${rect.top - 36}px;left:${Math.min(rect.left, window.innerWidth - 160)}px;z-index:600;pointer-events:none;`;
            } else {
                flyout.style.cssText = `position:fixed;top:120px;right:20px;z-index:600;pointer-events:none;`;
            }
            document.body.appendChild(flyout);
            Game.TimerManager.setTimeout(() => flyout.remove(), 1000, 'ui');
        },

        // ── 浮動購物籃計數徽章（Round 30）────────────────────────────
        _updateCartBadge(collected, needed) {
            let badge = document.getElementById('b6-cart-badge');
            if (!badge) {
                badge = document.createElement('div');
                badge.id = 'b6-cart-badge';
                badge.className = 'b6-cart-badge';
                document.body.appendChild(badge);
            }
            const done = collected >= needed;
            badge.className = 'b6-cart-badge' + (done ? ' done' : '');
            badge.textContent = done ? `✓ ${collected}/${needed} 全收集！` : `🛒 ${collected}/${needed}`;
            badge.style.animation = 'none';
            void badge.offsetWidth;
            badge.style.animation = 'b6CartPop 0.3s ease';
        },

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
            const baseTotal = g.mission.items.reduce((sum, { stall, id }) => {
                const item = _currentStalls[stall].items.find(i => i.id === id);
                return sum + (item ? item.price : 0);
            }, 0);
            const customTotal = (g.customItems || [])
                .filter(i => !i._deleted)
                .reduce((sum, i) => sum + i.price, 0);
            return baseTotal + customTotal;
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
                ${diff !== 'easy' ? `<button class="b5-confirm-btn" id="b6-p2-confirm-btn" disabled>✅ 確認付款</button>` : ''}
                ${this._renderB6P2CoinTray(diff)}
            </div>`;

            Game.TimerManager.setTimeout(() => {
                Game.Speech.speak(`共消費${toTWD(total)}，請拖曳正確的金錢圖示付款。`);
            }, 300, 'speech');

            this._bindB6P2Events(total);
            this._b6P2SetupDragDrop();
        },

        _renderB6P2RefCard(mission, total, mkt) {
            const itemsList = mission.items.map(({ stall, id }) => {
                const item = _currentStalls[stall]?.items.find(i => i.id === id);
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
            const hintLabel = diff === 'hard' ? '付法分析' : '提示';
            return `
            <div class="b6p2-wallet-area" id="b6p2-wallet-area">
                <div class="b6p2-wallet-coins-label">需要付款</div>
                <div class="b6p2-wallet-header">
                    <div>
                        <div class="b6p2-wallet-need">${total} 元</div>
                        <div class="b6p2-wallet-placed-row">
                            <span class="b6p2-wallet-placed-lbl">已放</span>
                            <span class="b6p2-wallet-total-val" id="b6p2-wallet-total">0 元</span>
                            <span class="b6p2-wallet-sep">/</span>
                            <span class="b6p2-wallet-goal">${total} 元</span>
                        </div>
                    </div>
                    <span class="b6p2-hint-wrap">
                        <img src="../images/index/educated_money_bag_character.png" alt="" style="width:28px;height:28px;object-fit:contain;" onerror="this.style.display='none'">
                        <button class="b6-hint-btn" id="b6-p2-hint-btn">💡 ${hintLabel}</button>
                    </span>
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

            // Touch drag（B5 pattern）
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
                const canConfirm = diff === 'easy' ? total >= req : total === req;
                confirmBtn.disabled = !canConfirm;
                confirmBtn.classList.toggle('ready', canConfirm);
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
                const canConfirm = diff === 'easy' ? total >= req : total === req;
                confirmBtn.disabled = !canConfirm;
                confirmBtn.classList.toggle('ready', canConfirm);
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
            const denoms = [1000, 500, 100, 50, 10, 5, 1];
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
            const items = g.mission.items.map(({ stall, id }) => {
                const item = _currentStalls[stall]?.items.find(i => i.id === id);
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
                <button class="b5-next-btn" id="b6-next-btn">
                    ${g.currentRound + 1 >= g.totalRounds ? '查看結果 →' : '下一關 →'}
                </button>
            </div>`;

            Game.EventManager.on(document.getElementById('b6-next-btn'), 'click', () => {
                if (g.currentRound + 1 >= g.totalRounds) {
                    this.nextRound();
                } else {
                    this._showRoundCompleteCard(g.currentRound + 1, items, total, paid, change, () => this.nextRound());
                }
            }, {}, 'gameUI');

            // 付款找零計算過程動畫（Round 44，在結果畫面渲染後顯示）
            if (change > 0) {
                Game.TimerManager.setTimeout(() => this._animateChangeCalc(paid, total, change), 400, 'ui');
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

        // ── 14. 完成畫面 ──────────────────────────────────────
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

            let badge, badgeColor;
            if (accuracy === 100)    { badge = '完美 🥇'; badgeColor = '#f59e0b'; }
            else if (accuracy >= 90) { badge = '優異 🥇'; badgeColor = '#f59e0b'; }
            else if (accuracy >= 70) { badge = '良好 🥈'; badgeColor = '#10b981'; }
            else if (accuracy >= 50) { badge = '努力 🥉'; badgeColor = '#6366f1'; }
            else                     { badge = '練習 ⭐'; badgeColor = '#94a3b8'; }

            // 付款效率分析（Round 33）
            const exactCount  = g.exactPayments || 0;
            const totalRounds = g.totalRounds || 1;
            const effPct = Math.round(exactCount / totalRounds * 100);
            const effLabel = effPct === 100 ? '💯 全部精準！' : effPct >= 60 ? '⭐ 表現不錯！' : '💪 繼續練習！';
            const efficiencyHTML = exactCount > 0 ? `
            <div class="b6-res-efficiency">
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
                    <thead>
                        <tr>
                            <th>關卡</th><th>採購商品</th>
                            <th>小計</th><th>付款</th><th>找零</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${g.receipts.map((r, i) => `
                        <tr class="${i % 2 === 0 ? 'b6-receipt-row-even' : ''}">
                            <td class="b6-receipt-round">第${i + 1}關</td>
                            <td class="b6-receipt-items">${r.items.map(it => `${it.name}`).join('、')}</td>
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
                const stallOrder = Object.keys(_currentStalls);
                const entries = stallOrder
                    .filter(k => stats[k])
                    .map(k => ({ key: k, name: _currentStalls[k].name, icon: _currentStalls[k].icon, total: stats[k] }));
                if (entries.length === 0) return '';
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
                                <div class="b6-stall-track">
                                    <div class="b6-stall-fill" style="width:${pct}%"></div>
                                </div>
                                <span class="b6-stall-total">${e.total}元</span>
                            </div>`;
                        }).join('')}
                    </div>
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
            <div class="b-review-emoji">🧾</div>
            <h1 class="b-review-title">採購回顧</h1>
            <p class="b-review-subtitle">看看這次的市場採購記錄！</p>
        </div>
        ${receiptCardHTML}
        ${stallCardHTML}
        <button id="b6-view-summary-btn" class="b-review-next-btn">
            📊 查看測驗總結
        </button>
    </div>
</div>`;

            Game.TimerManager.setTimeout(() => {
                document.getElementById('success-sound')?.play();
            }, 100, 'confetti');
            Game.TimerManager.setTimeout(() => {
                Game.Speech.speak('完成了！來看看採購回顧吧！');
            }, 600, 'speech');

            Game.EventManager.on(document.getElementById('b6-view-summary-btn'), 'click', () => {
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
                <h1 class="b-res-title">🎉 採購達人 🎉</h1>
                <span class="b-res-mascot-spacer"></span>
            </div>
        </div>
        <div class="b-res-reward-wrap">
            <a href="#" id="endgame-reward-link" class="b-res-reward-link">
                🎁 開啟獎勵系統
            </a>
        </div>
        <div class="b-res-container">
            ${/* 市場類型 banner（Round 40）*/ (() => {
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

            ${efficiencyHTML}


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

            // Shopping phase: find next uncollected mission item
            const nextItem = g.mission.items.find(({ id }) => !g.collectedIds.has(id));
            if (!nextItem) {
                // 確認清單彈窗已開啟 → 點「去付款」
                const ccGo = document.getElementById('b6-cc-go');
                if (ccGo) {
                    this._highlight(ccGo);
                    this._queue = [{ el: ccGo, action: () => ccGo.click() }];
                    return;
                }
                // All collected → checkout
                const checkoutBtn = document.getElementById('b6-checkout-btn');
                if (checkoutBtn && !checkoutBtn.disabled) {
                    this._highlight(checkoutBtn);
                    this._queue = [{ el: checkoutBtn, action: () => checkoutBtn.click() }];
                }
                return;
            }

            // Need to switch stall? Use prev/next nav buttons
            if (nextItem.stall !== g.activeStall) {
                const _sk  = Object.keys(_currentStalls);
                const curI = _sk.indexOf(g.activeStall);
                const tgtI = _sk.indexOf(nextItem.stall);
                const navBtn = document.getElementById(tgtI > curI ? 'b6-stall-next' : 'b6-stall-prev');
                if (navBtn && !navBtn.disabled) {
                    this._highlight(navBtn);
                    this._queue = [{ el: navBtn, action: () => navBtn.click() }];
                }
                return;
            }

            // Click the product button
            const productBtn = document.querySelector(`.b6-product-btn:not([disabled])[data-item-id="${nextItem.id}"]`);
            if (productBtn) {
                this._highlight(productBtn);
                this._queue = [{ el: productBtn, action: () => productBtn.click() }];
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
