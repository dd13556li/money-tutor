// B5 生日派對預算 作業單
WorksheetRegistry.register('b5', {
    name: 'B5 生日派對預算',
    icon: '🎂',
    defaultCount: 4,
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

    _allItems: [
        { id: 'cake',    name: '生日蛋糕',   price: 380, icon: '🎂', must: true  },
        { id: 'drink',   name: '果汁飲料',   price: 120, icon: '🧃', must: true  },
        { id: 'balloon', name: '彩色氣球',   price: 50,  icon: '🎈', must: false },
        { id: 'gift',    name: '小禮物',     price: 200, icon: '🎁', must: false },
        { id: 'plate',   name: '派對紙盤',   price: 45,  icon: '🍽️', must: false },
        { id: 'candle',  name: '生日蠟燭',   price: 30,  icon: '🕯️', must: false },
        { id: 'ribbon',  name: '彩帶裝飾',   price: 65,  icon: '🎊', must: false },
        { id: 'hat',     name: '派對帽',     price: 80,  icon: '🎉', must: false },
        { id: 'candy',   name: '糖果禮包',   price: 90,  icon: '🍬', must: false },
        { id: 'photo',   name: '拍立得相機', price: 150, icon: '📸', must: false },
        { id: 'popper',  name: '噴彩拉炮',   price: 55,  icon: '🎆', must: false },
        { id: 'banner',  name: '生日橫幅',   price: 70,  icon: '🏷️', must: false },
    ],

    _scenarios: {
        easy: [
            { budget: 700,  availableIds: ['cake','drink','balloon','hat','candle'] },
            { budget: 600,  availableIds: ['cake','drink','ribbon','plate','candle'] },
            { budget: 650,  availableIds: ['cake','drink','balloon','plate','hat'] },
            { budget: 750,  availableIds: ['cake','drink','candy','hat','candle'] },
            { budget: 680,  availableIds: ['cake','drink','popper','candle','balloon'] },
            { budget: 720,  availableIds: ['cake','drink','ribbon','hat','plate'] },
            { budget: 600,  availableIds: ['cake','drink','balloon','candle','plate'] },
            { budget: 650,  availableIds: ['cake','drink','hat','popper','candle'] },
        ],
        normal: [
            { budget: 700,  availableIds: ['cake','drink','balloon','gift','plate','candle','hat'] },
            { budget: 750,  availableIds: ['cake','drink','ribbon','gift','photo','candle','hat'] },
            { budget: 800,  availableIds: ['cake','drink','balloon','gift','candy','popper','hat'] },
            { budget: 650,  availableIds: ['cake','drink','balloon','plate','ribbon','candle','hat'] },
            { budget: 720,  availableIds: ['cake','drink','gift','ribbon','photo','plate','candle'] },
            { budget: 780,  availableIds: ['cake','drink','candy','gift','popper','banner','hat'] },
            { budget: 700,  availableIds: ['cake','drink','balloon','photo','plate','ribbon','candle'] },
            { budget: 760,  availableIds: ['cake','drink','gift','candy','banner','popper','hat'] },
        ],
        hard: [
            { budget: 700,  availableIds: ['cake','drink','balloon','gift','plate','candle','ribbon','hat','candy'] },
            { budget: 750,  availableIds: ['cake','drink','ribbon','gift','photo','candle','hat','popper','candy'] },
            { budget: 720,  availableIds: ['cake','drink','balloon','gift','banner','plate','ribbon','hat','photo'] },
            { budget: 680,  availableIds: ['cake','drink','balloon','gift','candy','popper','ribbon','hat','banner'] },
            { budget: 760,  availableIds: ['cake','drink','gift','photo','candy','popper','banner','ribbon','hat'] },
            { budget: 740,  availableIds: ['cake','drink','balloon','gift','photo','plate','candle','ribbon','popper'] },
            { budget: 710,  availableIds: ['cake','drink','candy','banner','gift','hat','photo','ribbon','popper'] },
            { budget: 770,  availableIds: ['cake','drink','balloon','gift','photo','candy','plate','banner','hat'] },
        ],
    },

    generate(options) {
        const diff = options.difficulty || 'easy';
        const showAnswers = options._showAnswers || false;
        const usedKeys = options._usedValues || new Set();
        const count = options.count || 4;
        const pool = this._scenarios[diff];
        const itemMap = Object.fromEntries(this._allItems.map(it => [it.id, it]));

        const available = pool.map((_, i) => i).filter(i => !usedKeys.has(`b5_${diff}_${i}`));
        const idxList = shuffle(available.length >= 2 ? available : pool.map((_, i) => i))
            .slice(0, count);
        idxList.forEach(i => usedKeys.add(`b5_${diff}_${i}`));

        return idxList.map(idx => {
            const { budget, availableIds } = pool[idx];
            const items = availableIds.map(id => itemMap[id]).filter(Boolean);
            const mustItems   = items.filter(it => it.must);
            const optItems    = items.filter(it => !it.must);
            const mustTotal   = mustItems.reduce((s, it) => s + it.price, 0);
            const remaining   = budget - mustTotal;

            // Build the items table
            const mustRows = mustItems.map(it =>
                `<tr><td>${it.icon} ${it.name}</td><td style="color:#dc2626;font-weight:600;">必買</td><td style="text-align:right;">${it.price} 元</td></tr>`
            ).join('');
            const optRows = optItems.map(it =>
                `<tr><td>${it.icon} ${it.name}</td><td style="color:#2563eb;">選購</td><td style="text-align:right;">${it.price} 元</td></tr>`
            ).join('');

            const mustAns = showAnswers
                ? `<span style="color:red;font-weight:bold;">${mustTotal}</span>`
                : blankLine();
            const remainAns = showAnswers
                ? `<span style="color:red;font-weight:bold;">${remaining}</span>`
                : blankLine();

            return {
                _key: `b5_${diff}_${idx}`,
                prompt: `🎉 預算：<strong>${budget}</strong> 元，必買商品一定要買，用剩下的錢選購。`,
                visual: `<table style="border-collapse:collapse;font-size:12pt;width:100%;margin:6px 0;">
                    <tr style="background:#f3f4f6;font-size:11pt;">
                        <th style="padding:3px 6px;text-align:left;border-bottom:1.5px solid #9ca3af;">商品</th>
                        <th style="padding:3px 6px;border-bottom:1.5px solid #9ca3af;">類別</th>
                        <th style="padding:3px 6px;text-align:right;border-bottom:1.5px solid #9ca3af;">單價</th>
                    </tr>
                    ${mustRows}${optRows}
                </table>`,
                answerArea: `必買商品共：${mustAns} 元｜剩餘預算：${remainAns} 元`,
                answerDisplay: ''
            };
        });
    },
});
