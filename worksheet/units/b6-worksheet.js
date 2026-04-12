// B6 菜市場買菜 作業單
WorksheetRegistry.register('b6', {
    name: 'B6 菜市場買菜',
    icon: '🛒',
    defaultCount: 3,
    subtitle(opts) {
        const diff = { easy:'簡單', normal:'普通', hard:'困難' };
        return `難度：${diff[opts.difficulty || 'easy']}`;
    },

    toolbarConfig: {
        fontButton: null,
        adjustCountButton: {
            label: '🎯 難度',
            type: 'dropdown',
            options: [
                { label: '簡單', value: 'easy' },
                { label: '普通', value: 'normal' },
                { label: '困難', value: 'hard' },
            ],
            getCurrentValue: (p) => p.difficulty || 'easy',
            onChange: (v, app) => { app.params.difficulty = v; app.generate(); }
        },
        orientationButton: null,
        extraButtons: [],
    },

    _stalls: {
        vegetable: {
            cabbage:  { name: '高麗菜', price: 30,  unit: '顆', icon: '🥬' },
            tomato:   { name: '番茄',   price: 45,  unit: '斤', icon: '🍅' },
            scallion: { name: '青蔥',   price: 20,  unit: '把', icon: '🌿' },
            sweetpot: { name: '地瓜',   price: 35,  unit: '斤', icon: '🍠' },
            spinach:  { name: '菠菜',   price: 25,  unit: '把', icon: '🥗' },
            carrot:   { name: '紅蘿蔔', price: 40,  unit: '斤', icon: '🥕' },
        },
        fruit: {
            apple:    { name: '蘋果',   price: 50,  unit: '斤', icon: '🍎' },
            banana:   { name: '香蕉',   price: 25,  unit: '把', icon: '🍌' },
            grape:    { name: '葡萄',   price: 80,  unit: '串', icon: '🍇' },
            orange:   { name: '柳橙',   price: 40,  unit: '斤', icon: '🍊' },
            melon:    { name: '哈密瓜', price: 120, unit: '顆', icon: '🍈' },
            mango:    { name: '芒果',   price: 60,  unit: '斤', icon: '🥭' },
        },
        grocery: {
            egg:      { name: '雞蛋',   price: 65,  unit: '盒', icon: '🥚' },
            tofu:     { name: '豆腐',   price: 25,  unit: '塊', icon: '🫙' },
            soy:      { name: '醬油',   price: 45,  unit: '瓶', icon: '🍶' },
            rice:     { name: '白米',   price: 90,  unit: '包', icon: '🌾' },
            noodle:   { name: '麵條',   price: 35,  unit: '包', icon: '🍜' },
            salt:     { name: '食鹽',   price: 20,  unit: '包', icon: '🧂' },
        },
    },

    _missions: {
        easy: [
            { budget: 100, items: [{ stall:'vegetable', id:'cabbage'  }, { stall:'vegetable', id:'scallion' }] },
            { budget: 100, items: [{ stall:'vegetable', id:'tomato'   }, { stall:'grocery',   id:'salt'     }] },
            { budget: 150, items: [{ stall:'fruit',     id:'banana'   }, { stall:'grocery',   id:'tofu'     }, { stall:'vegetable', id:'scallion' }] },
            { budget: 100, items: [{ stall:'grocery',   id:'tofu'     }, { stall:'vegetable', id:'spinach'  }] },
            { budget: 200, items: [{ stall:'vegetable', id:'carrot'   }, { stall:'fruit',     id:'apple'    }] },
            { budget: 100, items: [{ stall:'vegetable', id:'sweetpot' }, { stall:'grocery',   id:'salt'     }] },
        ],
        normal: [
            { budget: 200, items: [{ stall:'vegetable', id:'cabbage'  }, { stall:'vegetable', id:'tomato'   }, { stall:'grocery',   id:'tofu'   }] },
            { budget: 300, items: [{ stall:'fruit',     id:'apple'    }, { stall:'grocery',   id:'egg'      }, { stall:'vegetable', id:'carrot' }] },
            { budget: 250, items: [{ stall:'fruit',     id:'banana'   }, { stall:'vegetable', id:'tomato'   }, { stall:'grocery',   id:'noodle' }, { stall:'grocery', id:'salt' }] },
            { budget: 200, items: [{ stall:'vegetable', id:'sweetpot' }, { stall:'fruit',     id:'orange'   }, { stall:'grocery',   id:'soy'    }] },
            { budget: 300, items: [{ stall:'grocery',   id:'rice'     }, { stall:'vegetable', id:'spinach'  }, { stall:'fruit',     id:'mango'  }] },
            { budget: 250, items: [{ stall:'vegetable', id:'scallion' }, { stall:'vegetable', id:'carrot'   }, { stall:'fruit',     id:'banana' }, { stall:'grocery', id:'tofu' }] },
        ],
        hard: [
            { budget: 500, items: [{ stall:'grocery',   id:'rice'     }, { stall:'grocery',   id:'egg'      }, { stall:'vegetable', id:'cabbage' }, { stall:'vegetable', id:'tomato' }, { stall:'fruit', id:'apple' }] },
            { budget: 300, items: [{ stall:'fruit',     id:'grape'    }, { stall:'grocery',   id:'egg'      }, { stall:'vegetable', id:'spinach' }, { stall:'grocery',   id:'noodle' }] },
            { budget: 400, items: [{ stall:'fruit',     id:'mango'    }, { stall:'vegetable', id:'sweetpot' }, { stall:'grocery',   id:'rice'    }, { stall:'fruit',     id:'banana'  }, { stall:'grocery', id:'salt' }] },
            { budget: 500, items: [{ stall:'fruit',     id:'melon'    }, { stall:'grocery',   id:'egg'      }, { stall:'grocery',   id:'soy'     }, { stall:'vegetable', id:'carrot'  }, { stall:'vegetable', id:'scallion' }] },
        ],
    },

    generate(options) {
        const diff = options.difficulty || 'easy';
        const showAnswers = options._showAnswers || false;
        const usedKeys = options._usedValues || new Set();
        const count = options.count || 3;
        const pool = this._missions[diff];

        const available = pool.map((_, i) => i).filter(i => !usedKeys.has(`b6_${diff}_${i}`));
        const idxList = shuffle(available.length >= 2 ? available : pool.map((_, i) => i))
            .slice(0, count);
        idxList.forEach(i => usedKeys.add(`b6_${diff}_${i}`));

        return idxList.map(idx => {
            const { budget, items } = pool[idx];
            const resolved = items.map(({ stall, id }) => {
                const item = this._stalls[stall][id];
                return item ? { ...item, stall } : null;
            }).filter(Boolean);

            const total   = resolved.reduce((s, it) => s + it.price, 0);
            const change  = budget - total;

            const rows = resolved.map(it =>
                `<tr>
                    <td style="padding:3px 6px;"><span class="ws-emoji-icon">${it.icon}</span> ${it.name}（1${it.unit}）</td>
                    <td style="text-align:right;padding:3px 8px;">${it.price} 元</td>
                </tr>`
            ).join('');

            const totalAns = showAnswers
                ? `<span style="color:red;font-weight:bold;">${total}</span>`
                : blankLine();
            const changeAns = showAnswers
                ? `<span style="color:red;font-weight:bold;">${change}</span>`
                : blankLine();

            return {
                _key: `b6_${diff}_${idx}`,
                prompt: `<span class="ws-emoji-icon">🛒</span> 帶了 <strong>${budget}</strong> 元去買菜，購買以下商品：`,
                visual: `<table style="border-collapse:collapse;font-size:12pt;width:100%;margin:6px 0;">
                    <tr style="background:#f3f4f6;font-size:11pt;">
                        <th style="padding:3px 6px;text-align:left;border-bottom:1.5px solid #9ca3af;">商品</th>
                        <th style="padding:3px 6px;text-align:right;border-bottom:1.5px solid #9ca3af;">單價</th>
                    </tr>
                    ${rows}
                </table>`,
                answerArea: `共花了：${totalAns} 元｜找回零錢：${changeAns} 元`,
                answerDisplay: ''
            };
        });
    },
});
