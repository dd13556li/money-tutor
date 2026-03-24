// B1 今天帶多少錢 作業單
WorksheetRegistry.register('b1', {
    name: 'B1 今天帶多少錢',
    icon: '💰',
    defaultCount: 20,
    subtitle(opts) {
        const diff = { easy:'簡單', normal:'普通', hard:'困難' };
        return `難度：${diff[opts.difficulty || 'easy']}`;
    },

    toolbarConfig: {
        fontButton: {
            label: '📝 題型',
            type: 'dropdown',
            options: [
                { label: '數字填空', value: 'fill' },
                { label: '圖示選擇', value: 'coin-select' },
                { label: '提示完成', value: 'hint-complete' },
            ],
            getCurrentValue: (p) => p.questionType || 'fill',
            onChange: (v, app) => { app.params.questionType = v; app.generate(); }
        },
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

    _scenarios: {
        easy: [
            { icon:'🏫', label:'去學校',   items:[{ name:'午餐費', cost:50  }] },
            { icon:'🏪', label:'去超商',   items:[{ name:'飲料',   cost:25  }] },
            { icon:'📚', label:'圖書館',   items:[{ name:'影印費', cost:10  }] },
            { icon:'🎭', label:'看表演',   items:[{ name:'門票',   cost:100 }] },
            { icon:'🏊', label:'游泳課',   items:[{ name:'入場費', cost:80  }] },
            { icon:'🎨', label:'美術課',   items:[{ name:'材料費', cost:30  }] },
            { icon:'🚌', label:'搭公車',   items:[{ name:'公車費', cost:15  }] },
            { icon:'🌿', label:'逛公園',   items:[{ name:'停車費', cost:20  }] },
            { icon:'☕', label:'買早餐',   items:[{ name:'早餐',   cost:35  }] },
            { icon:'🐟', label:'買魚飼料', items:[{ name:'飼料',   cost:45  }] },
        ],
        normal: [
            { icon:'🏫', label:'上學日',   items:[{ name:'午餐費', cost:60  }, { name:'公車費', cost:20  }] },
            { icon:'🎨', label:'才藝課',   items:[{ name:'課程費', cost:150 }, { name:'材料費', cost:50  }] },
            { icon:'🏥', label:'看醫生',   items:[{ name:'掛號費', cost:150 }, { name:'藥費',   cost:80  }] },
            { icon:'🎬', label:'看電影',   items:[{ name:'票價',   cost:280 }, { name:'爆米花', cost:90  }] },
            { icon:'🚂', label:'搭火車',   items:[{ name:'票價',   cost:250 }, { name:'便當',   cost:75  }] },
            { icon:'🏊', label:'去游泳',   items:[{ name:'入場費', cost:80  }, { name:'飲料',   cost:25  }] },
            { icon:'📖', label:'買書',     items:[{ name:'故事書', cost:180 }, { name:'文具',   cost:45  }] },
            { icon:'🌄', label:'爬山',     items:[{ name:'門票',   cost:100 }, { name:'食物',   cost:120 }] },
            { icon:'🎮', label:'遊樂場',   items:[{ name:'門票',   cost:200 }, { name:'遊戲',   cost:50  }] },
            { icon:'🍜', label:'吃午飯',   items:[{ name:'午餐',   cost:85  }, { name:'飲料',   cost:30  }] },
        ],
        hard: [
            { icon:'🛒', label:'大採購',   items:[{ name:'衣服',   cost:350 }, { name:'鞋子',   cost:490 }, { name:'書',     cost:180 }] },
            { icon:'🎂', label:'買禮物',   items:[{ name:'禮物',   cost:280 }, { name:'蛋糕',   cost:420 }, { name:'卡片',   cost:35  }] },
            { icon:'🌿', label:'出遊',     items:[{ name:'公車費', cost:20  }, { name:'冰淇淋', cost:45  }, { name:'門票',   cost:100 }, { name:'飲料', cost:30 }] },
            { icon:'🏕️', label:'露營',   items:[{ name:'食材',   cost:350 }, { name:'裝備費', cost:200 }, { name:'入場費', cost:150 }] },
            { icon:'🎡', label:'遊樂園',   items:[{ name:'門票',   cost:580 }, { name:'餐費',   cost:250 }, { name:'紀念品', cost:180 }] },
            { icon:'🌍', label:'校外教學', items:[{ name:'車費',   cost:80  }, { name:'午餐',   cost:120 }, { name:'門票',   cost:200 }, { name:'零用', cost:100 }] },
            { icon:'🎓', label:'畢業典禮', items:[{ name:'服裝',   cost:450 }, { name:'花束',   cost:280 }, { name:'聚餐',   cost:350 }] },
            { icon:'🏖️', label:'去海邊', items:[{ name:'防曬乳', cost:180 }, { name:'餐費',   cost:300 }, { name:'停車費', cost:100 }, { name:'飲料', cost:60  }] },
        ],
    },

    generate(options) {
        const diff = options.difficulty || 'easy';
        const questionType = options.questionType || 'fill';
        const showAnswers = options._showAnswers || false;
        const usedLabels = options._usedValues || new Set();
        const src = this._scenarios[diff];
        const pool = shuffle(src.filter(s => !usedLabels.has(`b1_${s.label}`)));
        if (pool.length < 2) src.forEach(s => pool.push(s)); // fallback: allow repeats
        const chosen = pool.slice(0, options.count || 20);
        chosen.forEach(s => usedLabels.add(`b1_${s.label}`));
        const checkbox = '<span style="display:inline-block;width:16px;height:16px;border:1.5px solid #333;margin:0 4px;vertical-align:middle;"></span>';

        return chosen.map(scenario => {
            const total = scenario.items.reduce((s, it) => s + it.cost, 0);
            const itemsText = scenario.items.map(it => `${it.name} <strong>${it.cost}</strong> 元`).join('、');

            if (questionType === 'fill') {
                const ans = showAnswers
                    ? `<span style="color:red;font-weight:bold;">${total}</span>`
                    : blankLine();
                return {
                    _key: `b1_${scenario.label}`,
                    prompt: `${scenario.icon} 要去<strong>${scenario.label}</strong>，需要花：${itemsText}`,
                    visual: '',
                    answerArea: `至少要帶：${ans} 元`,
                    answerDisplay: ''
                };
            } else if (questionType === 'coin-select') {
                const opts = this._coinOptions(total);
                const choicesHtml = opts.map((opt, i) => {
                    const label = String.fromCharCode(9312 + i);
                    const isCorrect = opt.total === total;
                    const style = showAnswers && isCorrect ? 'border-color:red;border-width:3px;' : '';
                    return `<div class="coin-choice-option" style="${style}">
                        <span style="font-weight:bold;min-width:20px;">${label}</span>${checkbox}
                        <div class="combo-coins">${opt.coins.map(c => coinImgFront(c)).join('')}</div>
                    </div>`;
                }).join('');
                return {
                    _key: `b1_${scenario.label}`,
                    prompt: `${scenario.icon} 要去<strong>${scenario.label}</strong>，需要花：${itemsText}<br>共需 <strong>${total}</strong> 元，請選出正確的錢幣組合：`,
                    visual: `<div class="coin-choice-options">${choicesHtml}</div>`,
                    answerArea: '',
                    answerDisplay: ''
                };
            } else { // hint-complete
                const combo = this._findCombo(total);
                if (!combo) return null;
                const partsHtml = combo.map(c => {
                    const icons = Array(Math.min(c.count, 5)).fill(coinImgFront(c.denom)).join('');
                    const ansNum = showAnswers
                        ? `<span style="color:red;font-weight:bold;">${c.count}</span>` : '___';
                    const unit = c.denom >= 100 ? '張' : '個';
                    return `${ansNum}${unit} ${icons}`;
                }).join('&nbsp;&nbsp;');
                const totalHint = `<span style="margin-left:8px;">共 <span style="color:#ccc;font-weight:bold;">${total}</span> 元</span>`;
                return {
                    _key: `b1_${scenario.label}`,
                    prompt: `${scenario.icon} 要去<strong>${scenario.label}</strong>，需要花：${itemsText}`,
                    visual: `<div style="margin:4px 0;">需帶：${partsHtml}${totalHint}</div>`,
                    answerArea: '',
                    answerDisplay: ''
                };
            }
        }).filter(Boolean);
    },

    _findCombo(amount) {
        const denoms = [1000, 500, 100, 50, 10, 5, 1];
        const result = [];
        let r = amount;
        for (const d of denoms) {
            if (r >= d) { const c = Math.floor(r / d); result.push({ denom: d, count: c }); r -= c * d; }
        }
        return r === 0 ? result : null;
    },

    _coinOptions(correctAmount) {
        const correct = walletToCoins(correctAmount);
        const options = [{ coins: [...correct], total: correctAmount }];
        for (let a = 0; a < 20 && options.length < 3; a++) {
            const offset = randomInt(1, 3) * 10;
            const wrongAmt = Math.random() < 0.5 ? correctAmount + offset : Math.max(10, correctAmount - offset);
            if (options.some(o => o.total === wrongAmt)) continue;
            options.push({ coins: walletToCoins(wrongAmt), total: wrongAmt });
        }
        while (options.length < 3) {
            options.push({ coins: walletToCoins(correctAmount + options.length * 10), total: correctAmount + options.length * 10 });
        }
        return shuffle(options);
    },
});
