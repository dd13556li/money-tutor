// B2 零用錢日記 作業單
WorksheetRegistry.register('b2', {
    name: 'B2 零用錢日記',
    icon: '📒',
    defaultCount: 8,
    subtitle(opts) {
        const diff = { easy:'簡單', normal:'普通', hard:'困難' };
        const typeLabels = {
            'fill':          '數字填空',
            'steps':         '逐步計算',
            'img-fill':      '看圖填空',
            'fill-select':   '填空與選擇',
            'coin-select':   '圖示選擇',
            'hint-select':   '提示選擇',
            'hint-complete': '提示完成',
        };
        return `${diff[opts.difficulty || 'easy']}・${typeLabels[opts.questionType || 'fill'] || ''}`;
    },

    toolbarConfig: {
        fontButton: {
            label: '📝 題型',
            type: 'dropdown',
            options: [
                { label: '數字填空(最終餘額)', value: 'fill' },
                { label: '逐步計算',           value: 'steps' },
                { label: '看圖填空',           value: 'img-fill' },
                { label: '填空與選擇',         value: 'fill-select' },
                { label: '圖示選擇',           value: 'coin-select' },
                { label: '提示選擇',           value: 'hint-select' },
                { label: '提示完成',           value: 'hint-complete' },
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

    _templates: {
        easy: [
            { startAmount: 100, events: [
                { type: 'income',  name: '媽媽給零用錢', amount: 50,  icon: '💰' },
                { type: 'expense', name: '買飲料',       amount: 30,  icon: '🧋' },
            ]},
            { startAmount: 50, events: [
                { type: 'income',  name: '幫忙洗碗',     amount: 20,  icon: '🍽️' },
                { type: 'expense', name: '買糖果',       amount: 15,  icon: '🍬' },
            ]},
            { startAmount: 200, events: [
                { type: 'expense', name: '買文具',       amount: 80,  icon: '✏️' },
                { type: 'income',  name: '爸爸獎勵',     amount: 50,  icon: '🌟' },
            ]},
            { startAmount: 80, events: [
                { type: 'income',  name: '過年紅包',     amount: 100, icon: '🧧' },
                { type: 'expense', name: '買玩具',       amount: 120, icon: '🎮' },
            ]},
            { startAmount: 150, events: [
                { type: 'expense', name: '買早餐',       amount: 40,  icon: '🥐' },
                { type: 'income',  name: '幫忙買菜',     amount: 20,  icon: '🛒' },
            ]},
            { startAmount: 60, events: [
                { type: 'income',  name: '阿嬤零用錢',   amount: 50,  icon: '💝' },
                { type: 'expense', name: '買貼紙',       amount: 25,  icon: '🌸' },
            ]},
            { startAmount: 300, events: [
                { type: 'expense', name: '買書',         amount: 150, icon: '📚' },
                { type: 'expense', name: '買點心',       amount: 30,  icon: '🍪' },
            ]},
            { startAmount: 120, events: [
                { type: 'income',  name: '幫忙打掃',     amount: 30,  icon: '🧹' },
                { type: 'expense', name: '買冰淇淋',     amount: 45,  icon: '🍦' },
            ]},
        ],
        normal: [
            { startAmount: 200, events: [
                { type: 'income',  name: '爸爸給零用錢', amount: 100, icon: '💰' },
                { type: 'expense', name: '買文具',       amount: 45,  icon: '✏️' },
                { type: 'expense', name: '買零食',       amount: 35,  icon: '🍿' },
                { type: 'income',  name: '幫忙家事',     amount: 20,  icon: '🧹' },
            ]},
            { startAmount: 150, events: [
                { type: 'income',  name: '生日紅包',     amount: 200, icon: '🧧' },
                { type: 'expense', name: '買玩具',       amount: 120, icon: '🎮' },
                { type: 'expense', name: '看電影',       amount: 80,  icon: '🎬' },
                { type: 'expense', name: '買飲料',       amount: 35,  icon: '🧋' },
            ]},
            { startAmount: 300, events: [
                { type: 'expense', name: '買運動鞋',     amount: 180, icon: '👟' },
                { type: 'income',  name: '幫鄰居送報',   amount: 50,  icon: '📰' },
                { type: 'expense', name: '買午餐',       amount: 60,  icon: '🍱' },
                { type: 'income',  name: '媽媽零用錢',   amount: 100, icon: '💝' },
            ]},
            { startAmount: 500, events: [
                { type: 'expense', name: '買書包',       amount: 350, icon: '🎒' },
                { type: 'income',  name: '爺爺紅包',     amount: 100, icon: '🧧' },
                { type: 'expense', name: '買文具',       amount: 75,  icon: '✏️' },
                { type: 'income',  name: '節省獎勵',     amount: 50,  icon: '🌟' },
            ]},
            { startAmount: 100, events: [
                { type: 'income',  name: '媽媽零用錢',   amount: 150, icon: '💰' },
                { type: 'expense', name: '買零食',       amount: 45,  icon: '🍬' },
                { type: 'income',  name: '幫忙澆花',     amount: 20,  icon: '🌱' },
                { type: 'expense', name: '買飲料',       amount: 30,  icon: '🧋' },
            ]},
            { startAmount: 250, events: [
                { type: 'expense', name: '買故事書',     amount: 90,  icon: '📖' },
                { type: 'expense', name: '買彩色筆',     amount: 65,  icon: '🖍️' },
                { type: 'income',  name: '幫忙洗車',     amount: 80,  icon: '🚗' },
                { type: 'expense', name: '買冰淇淋',     amount: 40,  icon: '🍦' },
            ]},
        ],
        hard: [
            { startAmount: 500, events: [
                { type: 'income',  name: '媽媽零用錢',   amount: 300, icon: '💰' },
                { type: 'expense', name: '買運動服',     amount: 280, icon: '👕' },
                { type: 'income',  name: '幫忙搬家具',   amount: 100, icon: '🛋️' },
                { type: 'expense', name: '買書',         amount: 145, icon: '📚' },
                { type: 'expense', name: '看表演',       amount: 200, icon: '🎭' },
                { type: 'income',  name: '過年紅包',     amount: 500, icon: '🧧' },
            ]},
            { startAmount: 800, events: [
                { type: 'expense', name: '買腳踏車配件', amount: 350, icon: '🚴' },
                { type: 'income',  name: '比賽獎金',     amount: 200, icon: '🏆' },
                { type: 'expense', name: '買運動鞋',     amount: 480, icon: '👟' },
                { type: 'income',  name: '爺爺奶奶紅包', amount: 600, icon: '🧧' },
                { type: 'expense', name: '買生日禮物',   amount: 250, icon: '🎁' },
                { type: 'expense', name: '吃大餐',       amount: 185, icon: '🍽️' },
            ]},
            { startAmount: 1000, events: [
                { type: 'income',  name: '暑期打工',     amount: 500, icon: '💼' },
                { type: 'expense', name: '買智慧手錶',   amount: 890, icon: '⌚' },
                { type: 'income',  name: '幫忙補習',     amount: 300, icon: '📖' },
                { type: 'expense', name: '買球鞋',       amount: 395, icon: '👟' },
                { type: 'income',  name: '獎學金',       amount: 200, icon: '🎓' },
                { type: 'expense', name: '買文具組',     amount: 120, icon: '✏️' },
            ]},
        ],
    },

    // 將金額分解為金幣圖示（最多顯示 5 枚）
    _coinsDisplay(amount) {
        const coins = walletToCoins(amount);
        const displayed = coins.slice(0, 5);
        const more = coins.length > 5 ? `<span style="font-size:11px;color:#888;">…</span>` : '';
        return displayed.map(c => coinImgRandom(c)).join('') + more;
    },

    generate(options) {
        const diff = options.difficulty || 'easy';
        const type = options.questionType || 'fill';
        const showAnswers = options._showAnswers || false;
        const usedKeys = options._usedValues || new Set();
        const pool = this._templates[diff];
        const available = pool.map((_, i) => i).filter(i => !usedKeys.has(`b2_${diff}_${i}`));
        const idxList = shuffle(available.length >= 2 ? available : pool.map((_, i) => i))
            .slice(0, options.count || 8);
        idxList.forEach(i => usedKeys.add(`b2_${diff}_${i}`));
        const checkbox = '<span style="display:inline-block;width:16px;height:16px;border:1.5px solid #333;margin:0 4px;vertical-align:middle;"></span>';

        return idxList.map(idx => {
            const { startAmount, events } = pool[idx];
            const finalBalance = events.reduce(
                (b, e) => e.type === 'income' ? b + e.amount : b - e.amount, startAmount);

            // 共用：事件列表（純文字）
            const eventsHtml = events.map(e => {
                const sign = e.type === 'income' ? '+' : '−';
                const color = e.type === 'income' ? '#059669' : '#dc2626';
                return `<div style="color:${color};">${e.icon} ${sign}${e.amount} 元（${e.name}）</div>`;
            }).join('');

            if (type === 'fill') {
                // 數字填空：事件列表，填入最終餘額
                const ans = showAnswers
                    ? `<span style="color:red;font-weight:bold;">${finalBalance}</span>`
                    : blankLine();
                return {
                    _key: `b2_${diff}_${idx}`,
                    prompt: `開始有 <strong>${startAmount}</strong> 元`,
                    visual: `<div style="margin:4px 0;line-height:1.9;font-size:13pt;">${eventsHtml}</div>`,
                    answerArea: `最後剩下：${ans} 元`,
                    answerDisplay: ''
                };

            } else if (type === 'steps') {
                // 逐步計算：表格填入每次餘額
                let running = startAmount;
                const rows = events.map(e => {
                    const sign = e.type === 'income' ? '+' : '−';
                    const color = e.type === 'income' ? '#059669' : '#dc2626';
                    running = e.type === 'income' ? running + e.amount : running - e.amount;
                    const runAns = showAnswers
                        ? `<span style="color:red;font-weight:bold;">${running}</span>`
                        : blankLine(true);
                    return `<tr>
                        <td style="padding:3px 6px;">${e.icon} ${e.name}</td>
                        <td style="text-align:center;padding:3px 6px;color:${color};">${sign}${e.amount}</td>
                        <td style="text-align:center;padding:3px 8px;">${runAns}</td>
                    </tr>`;
                }).join('');
                return {
                    _key: `b2_${diff}_${idx}`,
                    prompt: `開始有 <strong>${startAmount}</strong> 元，填入每次的餘額：`,
                    visual: `<table style="border-collapse:collapse;font-size:12pt;width:100%;margin-top:4px;">
                        <tr style="background:#f3f4f6;">
                            <th style="padding:3px 6px;border-bottom:1.5px solid #9ca3af;text-align:left;">項目</th>
                            <th style="padding:3px 6px;border-bottom:1.5px solid #9ca3af;">金額</th>
                            <th style="padding:3px 6px;border-bottom:1.5px solid #9ca3af;">餘額（元）</th>
                        </tr>
                        ${rows}
                    </table>`,
                    answerArea: '',
                    answerDisplay: ''
                };

            } else if (type === 'img-fill') {
                // 看圖填空：事件旁顯示金幣圖示，填入最終餘額
                const eventsWithCoins = events.map(e => {
                    const sign = e.type === 'income' ? '+' : '−';
                    const color = e.type === 'income' ? '#059669' : '#dc2626';
                    const coinRow = this._coinsDisplay(e.amount);
                    return `<div style="color:${color};display:flex;align-items:center;flex-wrap:wrap;gap:4px;margin-bottom:3px;">
                        <span>${e.icon} ${sign}${e.amount} 元（${e.name}）</span>
                        <span class="price-coins">${coinRow}</span>
                    </div>`;
                }).join('');
                const startCoinRow = this._coinsDisplay(startAmount);
                const ans = showAnswers
                    ? `<span style="color:red;font-weight:bold;">${finalBalance}</span>`
                    : blankLine();
                return {
                    _key: `b2_${diff}_${idx}`,
                    prompt: `開始有 <strong>${startAmount}</strong> 元 <span class="price-coins" style="vertical-align:middle;">${startCoinRow}</span>`,
                    visual: `<div style="margin:4px 0;font-size:13pt;">${eventsWithCoins}</div>`,
                    answerArea: `最後剩下：${ans} 元`,
                    answerDisplay: ''
                };

            } else if (type === 'fill-select') {
                // 填空與選擇：填入最終餘額，再選出正確錢幣組合
                if (finalBalance <= 0) return null;
                const opts = this._coinOptions(finalBalance);
                const fillArea = showAnswers
                    ? `最後剩下：<span style="color:red;font-weight:bold;">${finalBalance}</span> 元`
                    : `最後剩下：${blankLine()} 元`;
                const choicesHtml = opts.map((opt, i) => {
                    const label = String.fromCharCode(9312 + i);
                    const isCorrect = opt.total === finalBalance;
                    const style = showAnswers && isCorrect ? 'border-color:red;border-width:3px;' : '';
                    const check = (showAnswers && isCorrect)
                        ? '<span style="display:inline-block;width:16px;height:16px;border:1.5px solid red;color:red;font-size:14px;line-height:16px;text-align:center;margin:0 4px;vertical-align:middle;">✓</span>'
                        : checkbox;
                    const answerTag = (showAnswers && isCorrect)
                        ? `<span style="color:red;font-weight:bold;margin-left:6px;">答案：${finalBalance} 元</span>` : '';
                    return `<div class="coin-choice-option" style="${style}">
                        <span style="font-weight:bold;min-width:20px;">${label}</span>${check}
                        <div class="combo-coins">${opt.coins.map(c => coinImgRandom(c)).join('')}</div>${answerTag}
                    </div>`;
                }).join('');
                return {
                    _key: `b2_${diff}_${idx}`,
                    prompt: `開始有 <strong>${startAmount}</strong> 元`,
                    visual: `<div style="margin:4px 0;line-height:1.9;font-size:13pt;">${eventsHtml}</div>
                             <div style="margin-bottom:6px;">${fillArea}</div>
                             <div style="margin-bottom:4px;">請選出最終餘額的錢幣組合：</div>
                             <div class="coin-choice-options">${choicesHtml}</div>`,
                    answerArea: '',
                    answerDisplay: ''
                };

            } else if (type === 'coin-select') {
                // 圖示選擇：顯示最終餘額，選出正確錢幣組合
                if (finalBalance <= 0) return null;
                const opts = this._coinOptions(finalBalance);
                const choicesHtml = opts.map((opt, i) => {
                    const label = String.fromCharCode(9312 + i);
                    const isCorrect = opt.total === finalBalance;
                    const style = showAnswers && isCorrect ? 'border-color:red;border-width:3px;' : '';
                    const check = (showAnswers && isCorrect)
                        ? '<span style="display:inline-block;width:16px;height:16px;border:1.5px solid red;color:red;font-size:14px;line-height:16px;text-align:center;margin:0 4px;vertical-align:middle;">✓</span>'
                        : checkbox;
                    return `<div class="coin-choice-option" style="${style}">
                        <span style="font-weight:bold;min-width:20px;">${label}</span>${check}
                        <div class="combo-coins">${opt.coins.map(c => coinImgRandom(c)).join('')}</div>
                    </div>`;
                }).join('');
                return {
                    _key: `b2_${diff}_${idx}`,
                    prompt: `開始有 <strong>${startAmount}</strong> 元`,
                    visual: `<div style="margin:4px 0;line-height:1.9;font-size:13pt;">${eventsHtml}</div>
                             <div style="margin-bottom:4px;">最後剩下 <strong>${finalBalance}</strong> 元，請選出正確的錢幣組合：</div>
                             <div class="coin-choice-options">${choicesHtml}</div>`,
                    answerArea: '',
                    answerDisplay: ''
                };

            } else if (type === 'hint-select') {
                // 提示選擇：選項旁顯示灰色金額提示
                if (finalBalance <= 0) return null;
                const opts = this._coinOptions(finalBalance);
                const choicesHtml = opts.map((opt, i) => {
                    const label = String.fromCharCode(9312 + i);
                    const isCorrect = opt.total === finalBalance;
                    const style = showAnswers && isCorrect ? 'border-color:red;border-width:3px;' : '';
                    const check = (showAnswers && isCorrect)
                        ? '<span style="display:inline-block;width:16px;height:16px;border:1.5px solid red;color:red;font-size:14px;line-height:16px;text-align:center;margin:0 4px;vertical-align:middle;">✓</span>'
                        : checkbox;
                    const answerTag = (showAnswers && isCorrect)
                        ? `<span style="color:red;font-weight:bold;margin-left:6px;">答案：${finalBalance} 元</span>` : '';
                    return `<div class="coin-choice-option" style="${style}">
                        <span style="font-weight:bold;min-width:20px;">${label}</span>${check}
                        <div class="combo-coins">${opt.coins.map(c => coinImgRandom(c)).join('')}</div>
                        <span style="color:#ccc;font-weight:bold;margin-left:6px;">${opt.total} 元</span>${answerTag}
                    </div>`;
                }).join('');
                return {
                    _key: `b2_${diff}_${idx}`,
                    prompt: `開始有 <strong>${startAmount}</strong> 元`,
                    visual: `<div style="margin:4px 0;line-height:1.9;font-size:13pt;">${eventsHtml}</div>
                             <div style="margin-bottom:4px;">最後剩下 <strong>${finalBalance}</strong> 元，請選出正確的錢幣組合：</div>
                             <div class="coin-choice-options">${choicesHtml}</div>`,
                    answerArea: '',
                    answerDisplay: ''
                };

            } else { // hint-complete
                // 提示完成：顯示金幣圖示，填入各面額數量
                if (finalBalance <= 0) return null;
                const combo = this._findCombo(finalBalance);
                if (!combo) return null;
                const partsHtml = combo.map(c => {
                    const icons = Array(Math.min(c.count, 5)).fill(coinImgRandom(c.denom)).join('');
                    const ansNum = showAnswers
                        ? `<span style="color:red;font-weight:bold;">${c.count}</span>` : '___';
                    const unit = c.denom >= 100 ? '張' : '個';
                    return `${ansNum}${unit} ${icons}`;
                }).join('&nbsp;&nbsp;');
                const totalHint = `<span style="margin-left:8px;">共 <span style="color:#ccc;font-weight:bold;">${finalBalance}</span> 元</span>`;
                return {
                    _key: `b2_${diff}_${idx}`,
                    prompt: `開始有 <strong>${startAmount}</strong> 元`,
                    visual: `<div style="margin:4px 0;line-height:1.9;font-size:13pt;">${eventsHtml}</div>
                             <div style="margin:4px 0;">最後剩下：${partsHtml}${totalHint}</div>`,
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
