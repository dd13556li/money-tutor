// B5 派對活動採購 作業單
WorksheetRegistry.register('b5', {
    name: 'B5 派對活動採購',
    icon: '🎂',
    defaultCount: 10,
    subtitle(opts) {
        const qt = {
            'fill':          '數字填空',
            'img-fill':      '看圖填空',
            'fill-select':   '填空與選擇',
            'coin-select':   '圖示選擇',
            'hint-select':   '提示選擇',
            'hint-complete': '提示完成',
        };
        const diff = { easy:'簡單', normal:'普通', hard:'困難' };
        return `難度：${diff[opts.difficulty || 'easy']}　題型：${qt[opts.questionType || 'fill']}`;
    },

    toolbarConfig: {
        fontButton: {
            label: '📝 題型',
            type: 'dropdown',
            options: [
                { label: '數字填空',   value: 'fill'          },
                { label: '看圖填空',   value: 'img-fill'      },
                { label: '填空與選擇', value: 'fill-select'   },
                { label: '圖示選擇',   value: 'coin-select'   },
                { label: '提示選擇',   value: 'hint-select'   },
                { label: '提示完成',   value: 'hint-complete' },
            ],
            getCurrentValue: (p) => p.questionType || 'fill',
            onChange: (v, app) => { app.params.questionType = v; app.generate(); }
        },
        adjustCountButton: {
            label: '🎯 難度',
            type: 'dropdown',
            options: [
                { label: '簡單', value: 'easy'   },
                { label: '普通', value: 'normal' },
                { label: '困難', value: 'hard'   },
            ],
            getCurrentValue: (p) => p.difficulty || 'easy',
            onChange: (v, app) => { app.params.difficulty = v; app.generate(); }
        },
        orientationButton: null,
        extraButtons: [
            {
                id: 'coin-style-btn',
                label: '📊 圖示類型',
                type: 'dropdown',
                options: [
                    { label: '真實金錢(正面)',     value: 'real'      },
                    { label: '真實金錢(反面)',     value: 'real-back' },
                    { label: '真實金錢(正、反面)', value: 'real-both' },
                    { label: '金錢符號',           value: 'symbol'    },
                ],
                getCurrentValue: (params) => params.coinStyle || 'real',
                onChange: (val, app) => { app.params.coinStyle = val; app.generate(); }
            }
        ],
    },

    // 三大活動主題：🎂 生日派對 / 🎃 萬聖節派對 / 🌸 春日野餐
    // 簡單：2 項，各項 ≤ 100 元；普通：2–3 項（含中等消費）；困難：3–4 項（含高單價）
    _scenarios: {
        easy: [
            { icon:'🎂', event:'生日派對',   label:'氣球蠟燭',   items:[{ name:'彩色氣球',   cost:50 }, { name:'生日蠟燭',   cost:30 }] },
            { icon:'🎂', event:'生日派對',   label:'帽子彩帶',   items:[{ name:'派對帽',     cost:80 }, { name:'彩帶裝飾',   cost:65 }] },
            { icon:'🎂', event:'生日派對',   label:'糖果拉炮',   items:[{ name:'糖果禮包',   cost:90 }, { name:'噴彩拉炮',   cost:55 }] },
            { icon:'🎃', event:'萬聖節派對', label:'南瓜骷髏',   items:[{ name:'南瓜燈',     cost:85 }, { name:'骷髏貼紙',   cost:30 }] },
            { icon:'🎃', event:'萬聖節派對', label:'糖果蜘蛛',   items:[{ name:'糖果袋',     cost:60 }, { name:'蜘蛛網裝飾', cost:45 }] },
            { icon:'🎃', event:'萬聖節派對', label:'面具糖果',   items:[{ name:'鬼臉面具',   cost:75 }, { name:'萬聖糖果',   cost:50 }] },
            { icon:'🌸', event:'春日野餐',   label:'三明治飲料', items:[{ name:'三明治',     cost:60 }, { name:'氣泡水',     cost:40 }] },
            { icon:'🌸', event:'春日野餐',   label:'餅乾水果',   items:[{ name:'餅乾零食',   cost:55 }, { name:'水果盒',     cost:80 }] },
            { icon:'🌸', event:'春日野餐',   label:'涼帽紙巾',   items:[{ name:'涼帽',       cost:90 }, { name:'紙巾',       cost:25 }] },
            { icon:'🌸', event:'春日野餐',   label:'保冷袋飲料', items:[{ name:'保冷袋',     cost:70 }, { name:'氣泡水',     cost:40 }] },
        ],
        normal: [
            { icon:'🎂', event:'生日派對',   label:'相機禮包',    items:[{ name:'拍立得相機', cost:150 }, { name:'糖果禮包',   cost:90  }] },
            { icon:'🎂', event:'生日派對',   label:'禮物氣球',    items:[{ name:'小禮物',     cost:200 }, { name:'彩色氣球',   cost:50  }] },
            { icon:'🎂', event:'生日派對',   label:'飲料蠟燭帽',  items:[{ name:'果汁飲料',   cost:120 }, { name:'生日蠟燭',   cost:30  }, { name:'派對帽',     cost:80  }] },
            { icon:'🎂', event:'生日派對',   label:'相機彩帶',    items:[{ name:'拍立得相機', cost:150 }, { name:'彩帶裝飾',   cost:65  }] },
            { icon:'🎃', event:'萬聖節派對', label:'女巫魔杖',    items:[{ name:'女巫帽',     cost:120 }, { name:'巫師魔杖',   cost:65  }] },
            { icon:'🎃', event:'萬聖節派對', label:'裝扮面具',    items:[{ name:'萬聖裝扮',   cost:180 }, { name:'鬼臉面具',   cost:75  }] },
            { icon:'🎃', event:'萬聖節派對', label:'南瓜假髮袋',  items:[{ name:'南瓜燈',     cost:85  }, { name:'恐怖假髮',   cost:100 }, { name:'糖果袋',     cost:60  }] },
            { icon:'🌸', event:'春日野餐',   label:'野餐籃三明治',items:[{ name:'野餐籃',     cost:150 }, { name:'三明治',     cost:60  }] },
            { icon:'🌸', event:'春日野餐',   label:'水果零食飲料',items:[{ name:'水果盒',     cost:80  }, { name:'氣泡水',     cost:40  }, { name:'餅乾零食',   cost:55  }] },
            { icon:'🌸', event:'春日野餐',   label:'防曬帽巾',    items:[{ name:'防曬乳',     cost:100 }, { name:'涼帽',       cost:90  }, { name:'紙巾',       cost:25  }] },
        ],
        hard: [
            { icon:'🎂', event:'生日派對',   label:'蛋糕飲料氣球', items:[{ name:'生日蛋糕',   cost:380 }, { name:'果汁飲料',   cost:120 }, { name:'彩色氣球',   cost:50  }] },
            { icon:'🎂', event:'生日派對',   label:'蛋糕禮物蠟燭', items:[{ name:'生日蛋糕',   cost:380 }, { name:'小禮物',     cost:200 }, { name:'生日蠟燭',   cost:30  }] },
            { icon:'🎂', event:'生日派對',   label:'相機禮物糖果', items:[{ name:'拍立得相機', cost:150 }, { name:'小禮物',     cost:200 }, { name:'糖果禮包',   cost:90  }] },
            { icon:'🎂', event:'生日派對',   label:'完整生日套組', items:[{ name:'生日蛋糕',   cost:380 }, { name:'果汁飲料',   cost:120 }, { name:'小禮物',     cost:200 }, { name:'彩色氣球', cost:50  }] },
            { icon:'🎃', event:'萬聖節派對', label:'萬聖三件組',   items:[{ name:'萬聖裝扮',   cost:180 }, { name:'女巫帽',     cost:120 }, { name:'南瓜燈',     cost:85  }] },
            { icon:'🎃', event:'萬聖節派對', label:'萬聖全套',     items:[{ name:'萬聖裝扮',   cost:180 }, { name:'恐怖假髮',   cost:100 }, { name:'鬼臉面具',   cost:75  }, { name:'糖果袋', cost:60  }] },
            { icon:'🌸', event:'春日野餐',   label:'野餐豪華組',   items:[{ name:'野餐籃',     cost:150 }, { name:'防曬乳',     cost:100 }, { name:'水果盒',     cost:80  }, { name:'三明治', cost:60  }] },
            { icon:'🌸', event:'春日野餐',   label:'野餐全裝備',   items:[{ name:'野餐籃',     cost:150 }, { name:'保冷袋',     cost:70  }, { name:'涼帽',       cost:90  }, { name:'餅乾零食', cost:55 }] },
        ],
    },

    _itemEmoji: {
        // 生日派對
        '生日蛋糕': '🎂', '彩色氣球': '🎈', '生日蠟燭': '🕯️', '派對帽': '🎩',
        '噴彩拉炮': '🎉', '彩帶裝飾': '🎊', '糖果禮包': '🍬', '小禮物': '🎁',
        '果汁飲料': '🧃', '拍立得相機': '📸',
        // 萬聖節派對
        '南瓜燈': '🎃', '糖果袋': '🍭', '女巫帽': '🧙', '鬼臉面具': '👻',
        '萬聖裝扮': '🦇', '蜘蛛網裝飾': '🕸️', '骷髏貼紙': '💀', '巫師魔杖': '🪄',
        '萬聖糖果': '🍫',
        // 春日野餐
        '三明治': '🥪', '水果盒': '🍓', '野餐籃': '🧺', '餅乾零食': '🍪',
        '涼帽': '👒', '紙巾': '🧻', '一次性餐具': '🍴', '保冷袋': '🧊',
        '氣泡水': '🥤', '防曬乳': '☀️',
    },

    _coinsDisplay(amount, renderCoin) {
        const coins = walletToCoins(amount);
        const displayed = coins.slice(0, 6);
        const more = coins.length > 6 ? `<span style="font-size:11px;color:#888;">…</span>` : '';
        return displayed.map(c => renderCoin(c)).join('') + more;
    },

    generate(options) {
        const diff         = options.difficulty    || 'easy';
        const questionType = options.questionType  || 'fill';
        const coinStyle    = options.coinStyle     || 'real';
        const showAnswers  = options._showAnswers  || false;
        const usedLabels   = options._usedValues   || new Set();

        const renderCoin = (value) => {
            if (coinStyle === 'symbol')    return coinSymbol(value);
            if (coinStyle === 'real-back') return coinImgBack(value);
            if (coinStyle === 'real-both') return coinImgRandom(value);
            return coinImgFront(value);
        };

        const src    = this._scenarios[diff];
        const pool   = shuffle(src.filter(s => !usedLabels.has(`b5_${s.label}`)));
        if (pool.length < 2) src.forEach(s => pool.push(s));
        const chosen = pool.slice(0, options.count || 10);
        chosen.forEach(s => usedLabels.add(`b5_${s.label}`));

        const checkbox = '<span style="display:inline-block;width:16px;height:16px;border:1.5px solid #333;margin:0 4px;vertical-align:middle;"></span>';

        return chosen.map(scenario => {
            const total     = scenario.items.reduce((s, it) => s + it.cost, 0);
            const getIcon   = name => { const e = this._itemEmoji[name]; return e ? `<span class="ws-emoji-icon">${e}</span>` : ''; };
            const itemsText = scenario.items
                .map(it => `${getIcon(it.name)}${it.name} <strong>${it.cost}</strong> 元`)
                .join('、');
            const basePromptFact = `辦<span class="ws-emoji-icon">${scenario.icon}</span><strong>${scenario.event}</strong>，買 ${itemsText}`;
            const basePrompt = `${basePromptFact}，總共要多少錢？`;

            // ── 數字填空 ───────────────────────────────────────────────
            if (questionType === 'fill') {
                const ans = showAnswers
                    ? `<span style="color:red;font-weight:bold;">${total}</span>`
                    : blankLine();
                return {
                    _key: `b5_${scenario.label}`,
                    prompt: basePrompt,
                    visual: '',
                    answerArea: `答：${ans} 元`,
                    answerDisplay: ''
                };

            // ── 看圖填空 ───────────────────────────────────────────────
            } else if (questionType === 'img-fill') {
                const itemsWithCoins = scenario.items.map(it => {
                    const coinRow = this._coinsDisplay(it.cost, renderCoin);
                    return `${getIcon(it.name)}${it.name}（<strong>${it.cost}</strong> 元）<span style="vertical-align:middle;">${coinRow}</span>`;
                }).join('&emsp;');
                const ans = showAnswers
                    ? `<span style="color:red;font-weight:bold;">${total}</span>`
                    : blankLine();
                return {
                    _key: `b5_${scenario.label}`,
                    prompt: `辦<span class="ws-emoji-icon">${scenario.icon}</span><strong>${scenario.event}</strong>，買：`,
                    visual: `<div style="margin:4px 0 6px;line-height:2.2;">${itemsWithCoins}</div>`,
                    answerArea: `共需 ${ans} 元`,
                    answerDisplay: ''
                };

            // ── 填空與選擇 ─────────────────────────────────────────────
            } else if (questionType === 'fill-select') {
                const opts      = this._coinOptions(total);
                const fillArea  = showAnswers
                    ? `共需帶：<span style="color:red;font-weight:bold;">${total}</span> 元`
                    : `共需帶：${blankLine()} 元`;
                const choicesHtml = opts.map((opt, i) => {
                    const label     = String.fromCharCode(9312 + i);
                    const isCorrect = opt.total === total;
                    const style     = showAnswers && isCorrect ? 'border-color:red;border-width:3px;' : '';
                    const check     = (showAnswers && isCorrect)
                        ? '<span style="display:inline-block;width:16px;height:16px;border:1.5px solid red;color:red;font-size:14px;line-height:16px;text-align:center;margin:0 4px;vertical-align:middle;">✓</span>'
                        : checkbox;
                    const ansTag    = (showAnswers && isCorrect)
                        ? `<span style="color:red;font-weight:bold;margin-left:6px;">答案：${total} 元</span>` : '';
                    return `<div class="coin-choice-option" style="${style}">
                        <span style="font-weight:bold;min-width:20px;">${label}</span>${check}
                        <div class="combo-coins">${opt.coins.map(c => renderCoin(c)).join('')}</div>${ansTag}
                    </div>`;
                }).join('');
                return {
                    _key: `b5_${scenario.label}`,
                    prompt: basePromptFact,
                    visual: `<div style="margin-bottom:6px;">${fillArea}</div>
                             <div style="margin-bottom:4px;">請選出正確的錢幣組合：</div>
                             <div class="coin-choice-options">${choicesHtml}</div>`,
                    answerArea: '',
                    answerDisplay: ''
                };

            // ── 圖示選擇 ───────────────────────────────────────────────
            } else if (questionType === 'coin-select') {
                const opts        = this._coinOptions(total);
                const choicesHtml = opts.map((opt, i) => {
                    const label     = String.fromCharCode(9312 + i);
                    const isCorrect = opt.total === total;
                    const style     = showAnswers && isCorrect ? 'border-color:red;border-width:3px;' : '';
                    const check     = (showAnswers && isCorrect)
                        ? '<span style="display:inline-block;width:16px;height:16px;border:1.5px solid red;color:red;font-size:14px;line-height:16px;text-align:center;margin:0 4px;vertical-align:middle;">✓</span>'
                        : checkbox;
                    return `<div class="coin-choice-option" style="${style}">
                        <span style="font-weight:bold;min-width:20px;">${label}</span>${check}
                        <div class="combo-coins">${opt.coins.map(c => renderCoin(c)).join('')}</div>
                    </div>`;
                }).join('');
                return {
                    _key: `b5_${scenario.label}`,
                    prompt: `${basePromptFact}，共需 <strong>${total}</strong> 元，請選出正確的錢幣組合：`,
                    visual: `<div class="coin-choice-options">${choicesHtml}</div>`,
                    answerArea: '',
                    answerDisplay: ''
                };

            // ── 提示選擇 ───────────────────────────────────────────────
            } else if (questionType === 'hint-select') {
                const opts        = this._coinOptions(total);
                const choicesHtml = opts.map((opt, i) => {
                    const label     = String.fromCharCode(9312 + i);
                    const isCorrect = opt.total === total;
                    const style     = showAnswers && isCorrect ? 'border-color:red;border-width:3px;' : '';
                    const check     = (showAnswers && isCorrect)
                        ? '<span style="display:inline-block;width:16px;height:16px;border:1.5px solid red;color:red;font-size:14px;line-height:16px;text-align:center;margin:0 4px;vertical-align:middle;">✓</span>'
                        : checkbox;
                    const ansTag    = (showAnswers && isCorrect)
                        ? `<span style="color:red;font-weight:bold;margin-left:6px;">答案：${total} 元</span>` : '';
                    return `<div class="coin-choice-option" style="${style}">
                        <span style="font-weight:bold;min-width:20px;">${label}</span>${check}
                        <div class="combo-coins">${opt.coins.map(c => renderCoin(c)).join('')}</div>
                        <span style="color:#ccc;font-weight:bold;margin-left:6px;">${opt.total} 元</span>${ansTag}
                    </div>`;
                }).join('');
                return {
                    _key: `b5_${scenario.label}`,
                    prompt: `${basePromptFact}，共需 <strong>${total}</strong> 元，請選出正確的錢幣組合：`,
                    visual: `<div class="coin-choice-options">${choicesHtml}</div>`,
                    answerArea: '',
                    answerDisplay: ''
                };

            // ── 提示完成 ───────────────────────────────────────────────
            } else {
                const combo = this._findCombo(total);
                if (!combo) return null;
                const partsHtml = combo.map(c => {
                    const icons  = Array(Math.min(c.count, 5)).fill(renderCoin(c.denom)).join('');
                    const ansNum = showAnswers
                        ? `<span style="color:red;font-weight:bold;">${c.count}</span>` : '___';
                    const unit   = c.denom >= 100 ? '張' : '個';
                    return `${ansNum}${unit} ${icons}`;
                }).join('&nbsp;&nbsp;');
                const totalHint = `<span style="margin-left:8px;">共 <span style="color:#ccc;font-weight:bold;">${total}</span> 元</span>`;
                return {
                    _key: `b5_${scenario.label}`,
                    prompt: basePromptFact,
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
            const offset   = randomInt(1, 3) * 10;
            const wrongAmt = Math.random() < 0.5
                ? correctAmount + offset
                : Math.max(10, correctAmount - offset);
            if (options.some(o => o.total === wrongAmt)) continue;
            options.push({ coins: walletToCoins(wrongAmt), total: wrongAmt });
        }
        while (options.length < 3) {
            options.push({ coins: walletToCoins(correctAmount + options.length * 10), total: correctAmount + options.length * 10 });
        }
        return shuffle(options);
    },
});
