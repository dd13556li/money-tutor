// B4 特賣比一比 作業單
WorksheetRegistry.register('b4', {
    name: 'B4 特賣比一比',
    icon: '🏷️',
    defaultCount: 10,
    subtitle(opts) {
        const qt = { cheaper:'找便宜', diff:'差多少', both:'綜合題' };
        return `題型：${qt[opts.questionType || 'cheaper']}`;
    },

    toolbarConfig: {
        fontButton: {
            label: '📝 題型',
            type: 'dropdown',
            options: [
                { label: '找便宜（哪家划算）', value: 'cheaper' },
                { label: '差多少（價格差異）',  value: 'diff'    },
                { label: '綜合題（兩種混合）',  value: 'both'    },
            ],
            getCurrentValue: (p) => p.questionType || 'cheaper',
            onChange: (v, app) => { app.params.questionType = v; app.generate(); }
        },
        adjustCountButton: null,
        orientationButton: null,
        extraButtons: [],
    },

    _items: [
        { name:'鉛筆盒',       icon:'✏️',  optA:{ store:'文具店',  price:85   }, optB:{ store:'超市',   price:65   } },
        { name:'蘋果（1斤）',  icon:'🍎',  optA:{ store:'超市',    price:45   }, optB:{ store:'菜市場', price:35   } },
        { name:'原子筆',       icon:'🖊️', optA:{ store:'書局',    price:15   }, optB:{ store:'大賣場', price:12   } },
        { name:'礦泉水',       icon:'💧',  optA:{ store:'超商',    price:20   }, optB:{ store:'量販店', price:13   } },
        { name:'洗髮精',       icon:'🧴',  optA:{ store:'藥妝店',  price:189  }, optB:{ store:'量販店', price:149  } },
        { name:'巧克力',       icon:'🍫',  optA:{ store:'超商',    price:55   }, optB:{ store:'超市',   price:42   } },
        { name:'毛巾',         icon:'🧣',  optA:{ store:'百貨',    price:250  }, optB:{ store:'市場',   price:180  } },
        { name:'故事書',       icon:'📖',  optA:{ store:'書店',    price:280  }, optB:{ store:'二手店', price:150  } },
        { name:'牛奶（1公升）',icon:'🥛',  optA:{ store:'超商',    price:65   }, optB:{ store:'超市',   price:55   } },
        { name:'面紙（一包）', icon:'🧻',  optA:{ store:'超商',    price:39   }, optB:{ store:'量販店', price:25   } },
        { name:'雨傘',         icon:'☂️',  optA:{ store:'百貨',    price:480  }, optB:{ store:'夜市',   price:150  } },
        { name:'餅乾（一盒）', icon:'🍪',  optA:{ store:'超商',    price:45   }, optB:{ store:'超市',   price:35   } },
        { name:'牙刷',         icon:'🪥',  optA:{ store:'藥局',    price:39   }, optB:{ store:'量販店', price:29   } },
        { name:'色鉛筆',       icon:'🖍️', optA:{ store:'文具店',  price:120  }, optB:{ store:'大賣場', price:89   } },
        { name:'果汁（1瓶）',  icon:'🧃',  optA:{ store:'超商',    price:35   }, optB:{ store:'超市',   price:25   } },
        { name:'電池（4顆）',  icon:'🔋',  optA:{ store:'超商',    price:85   }, optB:{ store:'量販店', price:59   } },
        { name:'洗碗精',       icon:'🧼',  optA:{ store:'超市',    price:59   }, optB:{ store:'量販店', price:45   } },
        { name:'運動鞋',       icon:'👟',  optA:{ store:'品牌店',  price:1580 }, optB:{ store:'網購',   price:1200 } },
        { name:'拖鞋',         icon:'🩴',  optA:{ store:'百貨',    price:390  }, optB:{ store:'夜市',   price:120  } },
        { name:'手套',         icon:'🧤',  optA:{ store:'百貨',    price:320  }, optB:{ store:'市場',   price:180  } },
    ],

    generate(options) {
        const questionType = options.questionType || 'cheaper';
        const showAnswers = options._showAnswers || false;
        const usedKeys = options._usedValues || new Set();
        const count = options.count || 10;
        const items = this._items;

        const available = items.map((_, i) => i).filter(i => !usedKeys.has(`b4_${i}`));
        const pool = shuffle(available.length >= 2 ? available : items.map((_, i) => i));
        const chosen = pool.slice(0, count);
        chosen.forEach(i => usedKeys.add(`b4_${i}`));

        return chosen.map(idx => {
            const item = items[idx];
            // randomly swap left/right for variety
            const swapped = Math.random() < 0.5;
            const left  = swapped ? item.optB : item.optA;
            const right = swapped ? item.optA : item.optB;
            const cheaper = item.optB; // optB is always cheaper
            const diff = item.optA.price - item.optB.price;

            const useType = (questionType === 'both')
                ? (Math.random() < 0.5 ? 'cheaper' : 'diff')
                : questionType;

            const priceRow = `<div style="display:flex;gap:18px;margin:6px 0;font-size:13pt;">
                <span style="flex:1;text-align:center;background:#fef9c3;border-radius:8px;padding:4px 8px;">
                    🏪 ${left.store}<br><strong>${left.price}</strong> 元
                </span>
                <span style="flex:1;text-align:center;background:#dbeafe;border-radius:8px;padding:4px 8px;">
                    🏬 ${right.store}<br><strong>${right.price}</strong> 元
                </span>
            </div>`;

            if (useType === 'cheaper') {
                const ans = showAnswers
                    ? `<span style="color:red;font-weight:bold;">${cheaper.store}</span>`
                    : blankLine();
                return {
                    _key: `b4_${idx}`,
                    prompt: `${item.icon} <strong>${item.name}</strong> 在兩家店的售價如下：`,
                    visual: priceRow,
                    answerArea: `哪家比較便宜？${ans}`,
                    answerDisplay: ''
                };
            } else {
                const ans = showAnswers
                    ? `<span style="color:red;font-weight:bold;">${diff}</span>`
                    : blankLine();
                return {
                    _key: `b4_${idx}`,
                    prompt: `${item.icon} <strong>${item.name}</strong> 在兩家店的售價如下：`,
                    visual: priceRow,
                    answerArea: `兩家差了多少元？${ans} 元`,
                    answerDisplay: ''
                };
            }
        });
    },
});
