// B6 菜市場買菜 作業單
WorksheetRegistry.register('b6', {
    name: 'B6 菜市場買菜',
    icon: '🛒',
    defaultCount: 10,
    subtitle(opts) {
        const qt = {
            'fill':          '數字填空',
            'img-fill':      '圖示填空',
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
                { label: '圖示填空',   value: 'img-fill'      },
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

    // 簡單：2 項，便宜蔬菜水果為主（各項 ≤ 50 元）
    // 普通：3 項，含中等食材（雞蛋、水果）
    // 困難：3–4 項，含較貴食材（哈密瓜、白米、葡萄）
    _scenarios: {
        easy: [
            { icon:'🥬', label:'買蔬菜',   items:[{ name:'高麗菜', unit:'顆', cost:30 }, { name:'青蔥',   unit:'把', cost:20 }] },
            { icon:'🍅', label:'買番茄蔥', items:[{ name:'番茄',   unit:'斤', cost:45 }, { name:'青蔥',   unit:'把', cost:20 }] },
            { icon:'🍎', label:'買蘋果蕉', items:[{ name:'蘋果',   unit:'斤', cost:50 }, { name:'香蕉',   unit:'把', cost:25 }] },
            { icon:'🧂', label:'買雜貨',   items:[{ name:'食鹽',   unit:'包', cost:20 }, { name:'豆腐',   unit:'塊', cost:25 }] },
            { icon:'🥬', label:'買根莖菜', items:[{ name:'地瓜',   unit:'斤', cost:35 }, { name:'菠菜',   unit:'把', cost:25 }] },
            { icon:'🍌', label:'買水果',   items:[{ name:'香蕉',   unit:'把', cost:25 }, { name:'柳橙',   unit:'斤', cost:40 }] },
            { icon:'🍜', label:'買麵食',   items:[{ name:'麵條',   unit:'包', cost:35 }, { name:'食鹽',   unit:'包', cost:20 }] },
            { icon:'🥕', label:'買根菜',   items:[{ name:'紅蘿蔔', unit:'斤', cost:40 }, { name:'地瓜',   unit:'斤', cost:35 }] },
            { icon:'🥦', label:'買新鮮菜', items:[{ name:'高麗菜', unit:'顆', cost:30 }, { name:'番茄',   unit:'斤', cost:45 }] },
            { icon:'🍊', label:'買柑橘',   items:[{ name:'柳橙',   unit:'斤', cost:40 }, { name:'蘋果',   unit:'斤', cost:50 }] },
        ],
        normal: [
            { icon:'🛒', label:'今日買菜', items:[{ name:'高麗菜', unit:'顆', cost:30 }, { name:'番茄',   unit:'斤', cost:45 }, { name:'豆腐',   unit:'塊', cost:25 }] },
            { icon:'🛒', label:'蔬果採購', items:[{ name:'蘋果',   unit:'斤', cost:50 }, { name:'菠菜',   unit:'把', cost:25 }, { name:'雞蛋',   unit:'盒', cost:65 }] },
            { icon:'🛒', label:'週末採買', items:[{ name:'地瓜',   unit:'斤', cost:35 }, { name:'香蕉',   unit:'把', cost:25 }, { name:'麵條',   unit:'包', cost:35 }] },
            { icon:'🛒', label:'廚房補貨', items:[{ name:'醬油',   unit:'瓶', cost:45 }, { name:'豆腐',   unit:'塊', cost:25 }, { name:'青蔥',   unit:'把', cost:20 }] },
            { icon:'🛒', label:'蔬菜水果', items:[{ name:'紅蘿蔔', unit:'斤', cost:40 }, { name:'柳橙',   unit:'斤', cost:40 }, { name:'食鹽',   unit:'包', cost:20 }] },
            { icon:'🛒', label:'晚餐食材', items:[{ name:'番茄',   unit:'斤', cost:45 }, { name:'麵條',   unit:'包', cost:35 }, { name:'雞蛋',   unit:'盒', cost:65 }] },
            { icon:'🛒', label:'鮮果雜貨', items:[{ name:'葡萄',   unit:'串', cost:80 }, { name:'高麗菜', unit:'顆', cost:30 }, { name:'豆腐',   unit:'塊', cost:25 }] },
            { icon:'🛒', label:'平日買菜', items:[{ name:'菠菜',   unit:'把', cost:25 }, { name:'蘋果',   unit:'斤', cost:50 }, { name:'醬油',   unit:'瓶', cost:45 }] },
            { icon:'🛒', label:'蔬菜雜糧', items:[{ name:'地瓜',   unit:'斤', cost:35 }, { name:'紅蘿蔔', unit:'斤', cost:40 }, { name:'麵條',   unit:'包', cost:35 }] },
            { icon:'🛒', label:'水果零食', items:[{ name:'芒果',   unit:'斤', cost:60 }, { name:'香蕉',   unit:'把', cost:25 }, { name:'食鹽',   unit:'包', cost:20 }] },
        ],
        hard: [
            { icon:'🛒', label:'週間大買', items:[{ name:'白米',   unit:'包', cost:90 }, { name:'雞蛋',   unit:'盒', cost:65 }, { name:'高麗菜', unit:'顆', cost:30 }, { name:'番茄',   unit:'斤', cost:45 }] },
            { icon:'🛒', label:'豐盛採買', items:[{ name:'哈密瓜', unit:'顆', cost:120}, { name:'雞蛋',   unit:'盒', cost:65 }, { name:'青蔥',   unit:'把', cost:20 }] },
            { icon:'🛒', label:'週一補貨', items:[{ name:'白米',   unit:'包', cost:90 }, { name:'醬油',   unit:'瓶', cost:45 }, { name:'豆腐',   unit:'塊', cost:25 }, { name:'菠菜',   unit:'把', cost:25 }] },
            { icon:'🛒', label:'豐盛晚餐', items:[{ name:'葡萄',   unit:'串', cost:80 }, { name:'番茄',   unit:'斤', cost:45 }, { name:'麵條',   unit:'包', cost:35 }, { name:'雞蛋',   unit:'盒', cost:65 }] },
            { icon:'🛒', label:'滿載而歸', items:[{ name:'哈密瓜', unit:'顆', cost:120}, { name:'白米',   unit:'包', cost:90 }, { name:'紅蘿蔔', unit:'斤', cost:40 }] },
            { icon:'🛒', label:'精心備料', items:[{ name:'芒果',   unit:'斤', cost:60 }, { name:'白米',   unit:'包', cost:90 }, { name:'雞蛋',   unit:'盒', cost:65 }, { name:'地瓜',   unit:'斤', cost:35 }] },
            { icon:'🛒', label:'假日大買', items:[{ name:'哈密瓜', unit:'顆', cost:120}, { name:'蘋果',   unit:'斤', cost:50 }, { name:'白米',   unit:'包', cost:90 }, { name:'青蔥',   unit:'把', cost:20 }] },
            { icon:'🛒', label:'一週食材', items:[{ name:'葡萄',   unit:'串', cost:80 }, { name:'白米',   unit:'包', cost:90 }, { name:'醬油',   unit:'瓶', cost:45 }, { name:'番茄',   unit:'斤', cost:45 }] },
        ],
    },

    _itemEmoji: {
        '高麗菜': '🥬', '青蔥': '🌿', '番茄': '🍅', '蘋果': '🍎',
        '香蕉': '🍌', '食鹽': '🧂', '地瓜': '🍠', '菠菜': '🥬',
        '柳橙': '🍊', '麵條': '🍜', '紅蘿蔔': '🥕', '醬油': '🍶',
        '雞蛋': '🥚', '葡萄': '🍇', '芒果': '🥭', '白米': '🌾',
        '哈密瓜': '🍈',
    },

    _coinsDisplay(amount, renderCoin) {
        const coins     = walletToCoins(amount);
        const displayed = coins.slice(0, 6);
        const more      = coins.length > 6 ? `<span style="font-size:11px;color:#888;">…</span>` : '';
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
        const pool   = shuffle(src.filter(s => !usedLabels.has(`b6_${s.label}`)));
        if (pool.length < 2) src.forEach(s => pool.push(s));
        const chosen = pool.slice(0, options.count || 10);
        chosen.forEach(s => usedLabels.add(`b6_${s.label}`));

        const checkbox = '<span style="display:inline-block;width:16px;height:16px;border:1.5px solid #333;margin:0 4px;vertical-align:middle;"></span>';

        return chosen.map(scenario => {
            const total     = scenario.items.reduce((s, it) => s + it.cost, 0);
            const getIcon = name => { const e = this._itemEmoji[name]; return e ? `<span class="ws-emoji-icon">${e}</span>` : ''; };
            const itemsText = scenario.items
                .map(it => `${getIcon(it.name)}${it.name}（1${it.unit}）<strong>${it.cost}</strong> 元`)
                .join('、');
            const basePromptFact = `去<span class="ws-emoji-icon">🛒</span><strong>菜市場</strong>，買 ${itemsText}`;
            const basePrompt = `${basePromptFact}，總共要多少錢？`;

            // ── 數字填空 ───────────────────────────────────────────────
            if (questionType === 'fill') {
                const ans = showAnswers
                    ? `<span style="color:red;font-weight:bold;">${total}</span>`
                    : blankLine();
                return {
                    _key: `b6_${scenario.label}`,
                    prompt: basePrompt,
                    visual: '',
                    answerArea: `答：${ans} 元`,
                    answerDisplay: ''
                };

            // ── 圖示填空 ───────────────────────────────────────────────
            } else if (questionType === 'img-fill') {
                const itemsWithCoins = scenario.items.map(it => {
                    const coinRow = this._coinsDisplay(it.cost, renderCoin);
                    return `${getIcon(it.name)}${it.name}（1${it.unit}）（<strong>${it.cost}</strong> 元）<span style="vertical-align:middle;">${coinRow}</span>`;
                }).join('&emsp;');
                const ans = showAnswers
                    ? `<span style="color:red;font-weight:bold;">${total}</span>`
                    : blankLine();
                return {
                    _key: `b6_${scenario.label}`,
                    prompt: `去<span class="ws-emoji-icon">🛒</span><strong>菜市場</strong>，買：`,
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
                    _key: `b6_${scenario.label}`,
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
                    _key: `b6_${scenario.label}`,
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
                    _key: `b6_${scenario.label}`,
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
                    _key: `b6_${scenario.label}`,
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
