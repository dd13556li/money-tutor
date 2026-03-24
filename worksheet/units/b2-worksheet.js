// B2 零用錢日記 作業單
WorksheetRegistry.register('b2', {
    name: 'B2 零用錢日記',
    icon: '📒',
    defaultCount: 8,
    subtitle(opts) {
        const diff = { easy:'簡單', normal:'普通', hard:'困難' };
        const type = { fill:'填最終餘額', steps:'逐步計算' };
        return `${diff[opts.difficulty || 'easy']}・${type[opts.questionType || 'fill']}`;
    },

    toolbarConfig: {
        fontButton: {
            label: '📝 題型',
            type: 'dropdown',
            options: [
                { label: '填最終餘額', value: 'fill' },
                { label: '逐步計算',   value: 'steps' },
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

        return idxList.map(idx => {
            const { startAmount, events } = pool[idx];
            const finalBalance = events.reduce(
                (b, e) => e.type === 'income' ? b + e.amount : b - e.amount, startAmount);

            if (type === 'fill') {
                const eventsHtml = events.map(e => {
                    const sign = e.type === 'income' ? '+' : '−';
                    const color = e.type === 'income' ? '#059669' : '#dc2626';
                    return `<div style="color:${color};">${e.icon} ${sign}${e.amount} 元（${e.name}）</div>`;
                }).join('');
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
            } else { // steps
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
            }
        });
    },
});
