// B3 存錢計畫 作業單
WorksheetRegistry.register('b3', {
    name: 'B3 存錢計畫',
    icon: '🐷',
    defaultCount: 20,
    subtitle(opts) {
        const diff = { easy:'小金額', normal:'中金額', hard:'大金額' };
        return `難度：${diff[opts.difficulty || 'easy']}`;
    },

    toolbarConfig: {
        fontButton: null,
        adjustCountButton: {
            label: '🎯 難度',
            type: 'dropdown',
            options: [
                { label: '簡單（小金額）', value: 'easy' },
                { label: '普通（中金額）', value: 'normal' },
                { label: '困難（大金額）', value: 'hard' },
            ],
            getCurrentValue: (p) => p.difficulty || 'easy',
            onChange: (v, app) => { app.params.difficulty = v; app.generate(); }
        },
        orientationButton: null,
        extraButtons: [],
    },

    _items: {
        easy: [
            { name: '繪畫工具組', price: 280, icon: '🎨' },
            { name: '玩具機器人', price: 300, icon: '🤖' },
            { name: '望遠鏡',    price: 350, icon: '🔭' },
        ],
        normal: [
            { name: '繪畫工具組', price: 280, icon: '🎨' },
            { name: '玩具機器人', price: 300, icon: '🤖' },
            { name: '望遠鏡',    price: 350, icon: '🔭' },
            { name: '烹飪玩具組', price: 420, icon: '🍳' },
            { name: '故事書套組', price: 450, icon: '📚' },
            { name: '科學實驗組', price: 480, icon: '🔬' },
            { name: '遊樂園門票', price: 500, icon: '🎡' },
            { name: '魔術道具組', price: 550, icon: '🎩' },
            { name: '生日蛋糕',  price: 600, icon: '🎂' },
            { name: '運動鞋',    price: 800, icon: '👟' },
        ],
        hard: [
            { name: '魔術道具組', price: 550,  icon: '🎩' },
            { name: '音樂盒',    price: 650,  icon: '🎵' },
            { name: '運動鞋',    price: 800,  icon: '👟' },
            { name: '水族箱',    price: 1200, icon: '🐠' },
            { name: '電動遊戲機', price: 1500, icon: '🎮' },
            { name: '腳踏車',    price: 2400, icon: '🚴' },
        ],
    },

    _weekly: {
        easy:   [50, 100, 150, 200],
        normal: [30, 50, 75, 100, 120, 150],
        hard:   [25, 35, 50, 65, 80, 100, 125, 150, 175, 200],
    },

    generate(options) {
        const diff = options.difficulty || 'easy';
        const showAnswers = options._showAnswers || false;
        const count = options.count || 20;
        const items = this._items[diff];
        const weeklyOpts = this._weekly[diff];
        const usedKeys = options._usedValues || new Set();
        const questions = [];
        let attempts = 0;

        while (questions.length < count && attempts < count * 4) {
            attempts++;
            const item = items[Math.floor(Math.random() * items.length)];
            const weekly = weeklyOpts[Math.floor(Math.random() * weeklyOpts.length)];
            const key = `b3_${item.name}_${weekly}`;
            if (usedKeys.has(key) && usedKeys.size < items.length * weeklyOpts.length) continue;
            usedKeys.add(key);
            const weeks = Math.ceil(item.price / weekly);
            const ans = showAnswers
                ? `<span style="color:red;font-weight:bold;">${weeks}</span>`
                : blankLine();
            questions.push({
                _key: `b3_${item.name}_${weekly}`,
                prompt: `${item.icon} 想買「<strong>${item.name}</strong>」要 ${item.price} 元，每週存 <strong>${weekly}</strong> 元，要存幾週才夠？`,
                visual: '',
                answerArea: `需要存：${ans} 週`,
                answerDisplay: ''
            });
        }
        return questions;
    },
});
