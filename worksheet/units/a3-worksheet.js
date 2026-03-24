// A3 麥當勞 作業單
WorksheetRegistry.register('a3', {
    name: 'A3 麥當勞',
    icon: '🍔',
    defaultCount: 20,
    subtitle() { return '點餐計算與找零'; },

    toolbarConfig: {
        fontButton: null,
        orientationButton: null,
        adjustCountButton: {
            label: '📊 圖示類型',
            type: 'dropdown',
            options: [
                { label: '真實金錢(正面)', value: 'real' },
                { label: '真實金錢(反面)', value: 'real-back' },
                { label: '真實金錢(正、反面)', value: 'real-both' },
                { label: '金錢符號', value: 'symbol' },
            ],
            getCurrentValue: (params) => params.coinStyle || 'real',
            onChange: (val, app) => { app.params.coinStyle = val; app.generate(); }
        },
        extraButtons: [{
            id: 'question-type-btn',
            label: '📝 測驗題型',
            type: 'dropdown',
            options: [
                { label: '數字填空(價格計算)', value: 'price-fill' },
                { label: '看圖填空(價格計算)', value: 'price-img-fill' },
                { label: '填空與選擇(價格計算)', value: 'price-fill-select' },
                { label: '圖示選擇(價格計算)', value: 'price-coin-select' },
                { label: '提示選擇(價格計算)', value: 'price-hint-select' },
                { label: '提示完成(價格計算)', value: 'price-hint-complete' },
                { label: '數字填空(找零計算)', value: 'fill' },
                { label: '看圖填空(找零計算)', value: 'img-fill' },
                { label: '填空與選擇(找零計算)', value: 'fill-select' },
                { label: '圖示選擇(找零計算)', value: 'coin-select' },
                { label: '提示選擇(找零計算)', value: 'hint-select' },
                { label: '提示完成(找零計算)', value: 'hint-complete' },
            ],
            getCurrentValue: (params) => params.questionType || 'price-fill',
            onChange: (val, app) => { app.params.questionType = val; app.generate(); }
        }]
    },

    menu: {
        burgers: [
            { name: '雙層獨家醬料牛肉堡', price: 75, emoji: '🍔', img: 'icon-a3-double-special-sauce-beef-burger' },
            { name: '雙層起司牛肉堡', price: 55, emoji: '🍔', img: 'icon-a3-mc-double' },
            { name: '經典香雞堡', price: 65, emoji: '🐔', img: 'icon-a3-mc-chicken' },
            { name: '黃金鱈魚堡', price: 52, emoji: '🐟', img: 'icon-a3-filet-o-fish' },
            { name: '厚切牛肉堡', price: 68, emoji: '🍔', img: 'icon-a3-quarter-pounder' },
            { name: '勁辣雞腿堡', price: 70, emoji: '🌶️', img: 'icon-a3-deluxe-chicken' },
            { name: '起司牛肉堡', price: 45, emoji: '🍔', img: 'icon-a3-cheese-burger' },
            { name: '培根牛肉堡', price: 80, emoji: '🥓', img: 'icon-a3-bacon-burger' },
            { name: '雙層豪華牛肉堡', price: 95, emoji: '🍔', img: 'icon-a3-double-deluxe' },
            { name: '蘑菇牛肉堡', price: 72, emoji: '🍄', img: 'icon-a3-mushroom-burger' },
            { name: '照燒雞腿堡', price: 68, emoji: '🍔', img: 'icon-a3-teriyaki-burger' },
            { name: '素食蔬菜堡', price: 60, emoji: '🥗', img: 'icon-a3-veggie-burger' },
            { name: 'BBQ烤肉堡', price: 78, emoji: '🍖', img: 'icon-a3-bbq-burger' },
            { name: '太陽蛋牛肉堡', price: 75, emoji: '🍳', img: 'icon-a3-egg-burger' },
            { name: '豪華脆雞堡', price: 70, emoji: '🐓', img: 'icon-a3-chicken-deluxe' },
            { name: '夏威夷鳳梨堡', price: 82, emoji: '🍍', img: 'icon-a3-hawaiian-burger' },
            { name: '墨西哥辣椒堡', price: 76, emoji: '🌮', img: 'icon-a3-jalapeno-burger' },
            { name: '三重起司堡', price: 85, emoji: '🧀', img: 'icon-a3-triple-cheese' },
            { name: '酪梨牛肉堡', price: 88, emoji: '🥑', img: 'icon-a3-avocado-burger' },
            { name: '脆洋蔥牛肉堡', price: 74, emoji: '🧅', img: 'icon-a3-crispy-onion-burger' },
        ],
        sides: [
            { name: '黃金薯條 (大)', price: 35, emoji: '🍟', img: 'icon-a3-french-fries-large' },
            { name: '黃金薯條 (中)', price: 30, emoji: '🍟', img: 'icon-a3-french-fries-medium' },
            { name: '黃金雞塊 (6塊)', price: 45, emoji: '🍗', img: 'icon-a3-mcnuggets-6' },
            { name: '黃金薯餅 (1片)', price: 25, emoji: '🥔', img: 'icon-a3-hash-brown' },
            { name: '黃金雞塊 (10塊)', price: 70, emoji: '🍗', img: 'icon-a3-mcnuggets-10' },
            { name: '洋蔥圈', price: 40, emoji: '🧅', img: 'icon-a3-onion-rings' },
            { name: '奶油起司玉米杯', price: 28, emoji: '🌽', img: 'icon-a3-corn-cup' },
            { name: '起司條', price: 50, emoji: '🧀', img: 'icon-a3-cheese-sticks' },
            { name: '炸雞翅 (6隻)', price: 60, emoji: '🍗', img: 'icon-a3-chicken-wings' },
            { name: '義式莫札瑞拉起司條', price: 55, emoji: '🧀', img: 'icon-a3-mozzarella-sticks' },
            { name: '地瓜薯條', price: 38, emoji: '🍠', img: 'icon-a3-sweet-potato-fries' },
            { name: '爆米花雞球', price: 48, emoji: '🍗', img: 'icon-a3-popcorn-chicken' },
            { name: '黃金薯條 (小)', price: 25, emoji: '🍟', img: 'icon-a3-french-fries-small' },
            { name: '田園沙拉', price: 42, emoji: '🥗', img: 'icon-a3-salad' },
            { name: '馬鈴薯沙拉', price: 30, emoji: '🥬', img: 'icon-a3-coleslaw' },
            { name: '黃金薯餅 (2片)', price: 45, emoji: '🥔', img: 'icon-a3-hash-browns-2' },
            { name: '捲捲薯條', price: 42, emoji: '🍟', img: 'icon-a3-curly-fries' },
            { name: '香酥雞柳條', price: 55, emoji: '🍗', img: 'icon-a3-chicken-strips' },
            { name: '蒜香麵包', price: 32, emoji: '🍞', img: 'icon-a3-garlic-bread' },
            { name: '帶皮楔形薯塊', price: 38, emoji: '🥔', img: 'icon-a3-potato-wedges' },
        ],
        drinks: [
            { name: '經典可樂 (大杯)', price: 30, emoji: '🥤', img: 'icon-a3-coke-large' },
            { name: '經典可樂 (中杯)', price: 25, emoji: '🥤', img: 'icon-a3-coke-medium' },
            { name: '鮮榨柳橙汁', price: 35, emoji: '🍊', img: 'icon-a3-orange-juice' },
            { name: '全脂鮮乳', price: 20, emoji: '🥛', img: 'icon-a3-milk' },
            { name: '檸檬萊姆汽水 (大杯)', price: 30, emoji: '🥤', img: 'icon-a3-sprite-large' },
            { name: '冰紅茶', price: 28, emoji: '🧋', img: 'icon-a3-iced-tea' },
            { name: '100%蘋果汁', price: 32, emoji: '🍎', img: 'icon-a3-apple-juice' },
            { name: '熱美式咖啡', price: 38, emoji: '☕', img: 'icon-a3-coffee' },
            { name: '熱拿鐵', price: 45, emoji: '☕', img: 'icon-a3-latte' },
            { name: '熱卡布奇諾', price: 48, emoji: '☕', img: 'icon-a3-cappuccino' },
            { name: '熱可可', price: 40, emoji: '🍫', img: 'icon-a3-hot-chocolate' },
            { name: '檸檬氣泡飲', price: 30, emoji: '🍋', img: 'icon-a3-lemonade' },
            { name: '無糖冰綠茶', price: 25, emoji: '🍵', img: 'icon-a3-green-tea' },
            { name: '綜合水果冰沙', price: 50, emoji: '🥤', img: 'icon-a3-smoothie' },
            { name: '瓶裝礦泉水', price: 15, emoji: '💧', img: 'icon-a3-mineral-water' },
            { name: '百香果汁', price: 42, emoji: '🥝', img: 'icon-a3-energy-drink' },
            { name: '珍珠奶茶', price: 55, emoji: '🧋', img: 'icon-a3-bubble-tea' },
            { name: '鮮甜芒果汁', price: 40, emoji: '🥭', img: 'icon-a3-mango-juice' },
            { name: '葡萄汁', price: 35, emoji: '🍇', img: 'icon-a3-grape-juice' },
            { name: '熱摩卡咖啡', price: 52, emoji: '☕', img: 'icon-a3-mocha' },
        ],
        desserts: [
            { name: '酥皮蘋果派', price: 25, emoji: '🥧', img: 'icon-a3-apple-pie' },
            { name: '原味蛋捲冰淇淋', price: 15, emoji: '🍦', img: 'icon-a3-ice-cream-cone' },
            { name: '巧克力脆餅', price: 20, emoji: '🍪', img: 'icon-a3-cookies' },
            { name: '濃郁巧克力奶昔', price: 40, emoji: '🥤', img: 'icon-a3-shake-chocolate' },
            { name: '草莓奶昔', price: 40, emoji: '🍓', img: 'icon-a3-shake-strawberry' },
            { name: '巧克力聖代', price: 30, emoji: '🍨', img: 'icon-a3-sundae' },
            { name: '藍莓馬芬', price: 35, emoji: '🧁', img: 'icon-a3-muffin' },
            { name: '經典甜甜圈', price: 22, emoji: '🍩', img: 'icon-a3-donut' },
            { name: '濃情布朗尼', price: 38, emoji: '🍫', img: 'icon-a3-brownie' },
            { name: '紐約起司蛋糕', price: 55, emoji: '🍰', img: 'icon-a3-cheesecake' },
            { name: '義式提拉米蘇', price: 60, emoji: '🍰', img: 'icon-a3-tiramisu' },
            { name: '比利時鬆餅', price: 45, emoji: '🧇', img: 'icon-a3-waffle' },
            { name: '法式可麗餅', price: 48, emoji: '🥞', img: 'icon-a3-crepe' },
            { name: '香草奶酪', price: 42, emoji: '🍮', img: 'icon-a3-panna-cotta' },
            { name: '法式馬卡龍 (3入)', price: 50, emoji: '🍬', img: 'icon-a3-macaron' },
            { name: '西班牙吉拿棒', price: 35, emoji: '🥖', img: 'icon-a3-churros' },
            { name: '綜合水果塔', price: 58, emoji: '🥧', img: 'icon-a3-fruit-tart' },
            { name: '香蕉船冰淇淋', price: 65, emoji: '🍌', img: 'icon-a3-ice-cream-sundae' },
            { name: '香甜肉桂捲', price: 38, emoji: '🥐', img: 'icon-a3-cinnamon-roll' },
            { name: '焦糖布丁', price: 35, emoji: '🍮', img: 'icon-a3-pudding' },
        ]
    },

    _itemImg(item) {
        return `<img src="../images/a3/${item.img}.png" class="drink-img" alt="${item.name}" onerror="this.outerHTML='${item.emoji}'">`;
    },

    // 將價格轉換為金錢圖示顯示
    _renderPriceWithCoins(price, renderCoin) {
        const coins = walletToCoins(price);
        return `<span class="price-coins">${coins.map(c => renderCoin(c)).join('')}</span>`;
    },

    generate(options) {
        const { count = 8 } = options;
        const questionType = options.questionType || 'price-fill';
        const coinStyle = options.coinStyle || 'real';
        const showAnswers = options._showAnswers || false;
        const renderCoin = (value) => {
            if (coinStyle === 'symbol') return coinSymbol(value);
            if (coinStyle === 'real-back') return coinImgBack(value);
            if (coinStyle === 'real-both') return coinImgRandom(value);
            return coinImgFront(value);
        };
        const checkbox = '<span style="display:inline-block;width:16px;height:16px;border:1.5px solid #333;margin:0 4px;vertical-align:middle;"></span>';
        const questions = [];
        const allItems = [...this.menu.burgers, ...this.menu.sides, ...this.menu.drinks, ...this.menu.desserts];

        for (let i = 0; i < count; i++) {
            const numItems = randomInt(2, 3);
            const selected = pickRandom(allItems, numItems);
            const total = selected.reduce((s, it) => s + it.price, 0);
            const paid = [100, 200, 500].find(p => p >= total) || 500;
            const change = paid - total;

            const itemList = selected.map(it => `${it.img ? this._itemImg(it) : it.emoji} ${it.name}(${it.price}元)`).join('、');

            if (questionType === 'price-fill') {
                questions.push({
                    prompt: `你點了：${itemList}`,
                    visual: '',
                    answerArea: showAnswers
                        ? `總共費用 <span style="color:red;font-weight:bold;">${total}</span> 元`
                        : `總共費用 ${blankLine()} 元`,
                    answerDisplay: ''
                });
            } else if (questionType === 'price-img-fill') {
                // 看圖填空(價格計算)：在價格前顯示金錢圖示
                const itemListWithCoins = selected.map(it =>
                    `${it.img ? this._itemImg(it) : it.emoji} ${it.name} ${this._renderPriceWithCoins(it.price, renderCoin)}(${it.price}元)`
                ).join('、');
                questions.push({
                    prompt: `你點了：${itemListWithCoins}`,
                    visual: '',
                    answerArea: showAnswers
                        ? `總共費用 <span style="color:red;font-weight:bold;">${total}</span> 元`
                        : `總共費用 ${blankLine()} 元`,
                    answerDisplay: ''
                });
            } else if (questionType === 'price-fill-select') {
                const correctCoins = walletToCoins(total);
                const opts = this._generateCoinOptions(total, correctCoins);
                const choicesHtml = opts.map((opt, idx) => {
                    const label = String.fromCharCode(9312 + idx);
                    const isCorrect = opt.total === total;
                    const style = showAnswers && isCorrect ? 'border-color: red; border-width: 3px;' : '';
                    const check = (showAnswers && isCorrect)
                        ? '<span style="display:inline-block;width:16px;height:16px;border:1.5px solid red;color:red;font-size:14px;line-height:16px;text-align:center;margin:0 4px;vertical-align:middle;">✓</span>'
                        : checkbox;
                    const answerTag = (showAnswers && isCorrect)
                        ? `<span style="color:red;font-weight:bold;margin-left:6px;">答案：${total} 元</span>`
                        : '';
                    return `<div class="coin-choice-option" style="${style}">
                        <span style="font-weight:bold; min-width:20px;">${label}</span>${check}
                        <div class="combo-coins">${opt.coins.map(c => renderCoin(c)).join('')}</div>${answerTag}
                    </div>`;
                }).join('');
                const fillArea = showAnswers
                    ? `總共費用 <span style="color:red;font-weight:bold;">${total}</span> 元`
                    : `總共費用 ${blankLine()} 元`;
                questions.push({
                    prompt: `你點了：${itemList}`,
                    visual: `<div style="margin-bottom:6px;">${fillArea}</div>
                             <div style="margin-bottom:4px;">請選出正確的金額組合：</div>
                             <div class="coin-choice-options">${choicesHtml}</div>`,
                    answerArea: '',
                    answerDisplay: ''
                });
            } else if (questionType === 'price-coin-select') {
                const correctCoins = walletToCoins(total);
                const opts = this._generateCoinOptions(total, correctCoins);
                const choicesHtml = opts.map((opt, idx) => {
                    const label = String.fromCharCode(9312 + idx);
                    const isCorrect = opt.total === total;
                    const style = showAnswers && isCorrect ? 'border-color: red; border-width: 3px;' : '';
                    const check = (showAnswers && isCorrect)
                        ? '<span style="display:inline-block;width:16px;height:16px;border:1.5px solid red;color:red;font-size:14px;line-height:16px;text-align:center;margin:0 4px;vertical-align:middle;">✓</span>'
                        : checkbox;
                    const answerTag = (showAnswers && isCorrect)
                        ? `<span style="color:red;font-weight:bold;margin-left:6px;">答案：${total} 元</span>`
                        : '';
                    return `<div class="coin-choice-option" style="${style}">
                        <span style="font-weight:bold; min-width:20px;">${label}</span>${check}
                        <div class="combo-coins">${opt.coins.map(c => renderCoin(c)).join('')}</div>${answerTag}
                    </div>`;
                }).join('');
                questions.push({
                    prompt: `你點了：${itemList}，總共 <span style="color:red;font-weight:bold;">${total}</span> 元，請選出正確的金額組合：`,
                    visual: `<div class="coin-choice-options">${choicesHtml}</div>`,
                    answerArea: '',
                    answerDisplay: ''
                });
            } else if (questionType === 'price-hint-select') {
                const correctCoins = walletToCoins(total);
                const opts = this._generateCoinOptions(total, correctCoins);
                const choicesHtml = opts.map((opt, idx) => {
                    const label = String.fromCharCode(9312 + idx);
                    const isCorrect = opt.total === total;
                    const style = showAnswers && isCorrect ? 'border-color: red; border-width: 3px;' : '';
                    const check = (showAnswers && isCorrect)
                        ? '<span style="display:inline-block;width:16px;height:16px;border:1.5px solid red;color:red;font-size:14px;line-height:16px;text-align:center;margin:0 4px;vertical-align:middle;">✓</span>'
                        : checkbox;
                    const answerTag = (showAnswers && isCorrect)
                        ? `<span style="color:red;font-weight:bold;margin-left:6px;">答案：${total} 元</span>`
                        : '';
                    return `<div class="coin-choice-option" style="${style}">
                        <span style="font-weight:bold; min-width:20px;">${label}</span>${check}
                        <div class="combo-coins">${opt.coins.map(c => renderCoin(c)).join('')}</div>
                        <span style="color:#ccc;font-weight:bold;margin-left:6px;">${opt.total}元</span>${answerTag}
                    </div>`;
                }).join('');
                questions.push({
                    prompt: `你點了：${itemList}，總共 <span style="color:red;font-weight:bold;">${total}</span> 元，請選出正確的金額組合：`,
                    visual: `<div class="coin-choice-options">${choicesHtml}</div>`,
                    answerArea: '',
                    answerDisplay: ''
                });
            } else if (questionType === 'price-hint-complete') {
                const combo = this._findCombo(total);
                if (!combo) continue;
                const coinQty = (value) => value >= 100 ? '張' : '個';
                const partsHtml = combo.map(c => {
                    const icons = Array(c.count).fill(renderCoin(c.denom)).join('');
                    const answerNum = showAnswers
                        ? `<span style="color:red;font-weight:bold;">${c.count}</span>` : '___';
                    return `${answerNum}${coinQty(c.denom)} ${icons}`;
                }).join('&nbsp;&nbsp;');
                const totalColor = showAnswers ? 'color:red' : 'color:#ccc';
                const totalHint = `<span style="font-size:14pt; font-weight:bold; margin-left:6px;">共 <span style="${totalColor};font-weight:bold;">${total}</span> 元</span>`;
                questions.push({
                    prompt: `你點了：${itemList}，總共費用如下：`,
                    visual: `<div style="margin:4px 0;">總共要 ${partsHtml} ${totalHint}</div>`,
                    answerArea: '',
                    answerDisplay: ''
                });
            } else if (questionType === 'fill') {
                questions.push({
                    prompt: `你點了：${itemList}`,
                    visual: '',
                    answerArea: showAnswers
                        ? `總共費用 <span style="color:red;font-weight:bold;">${total}</span> 元　你付 ${paid} 元，找回 <span style="color:red;font-weight:bold;">${change}</span> 元`
                        : `總共費用 ${blankLine()} 元　你付 ${paid} 元，找回 ${blankLine()} 元`,
                    answerDisplay: ''
                });
            } else if (questionType === 'img-fill') {
                // 看圖填空(找零計算)：在價格前顯示金錢圖示
                const itemListWithCoins = selected.map(it =>
                    `${it.img ? this._itemImg(it) : it.emoji} ${it.name} ${this._renderPriceWithCoins(it.price, renderCoin)}(${it.price}元)`
                ).join('、');
                questions.push({
                    prompt: `你點了：${itemListWithCoins}`,
                    visual: '',
                    answerArea: showAnswers
                        ? `總共費用 <span style="color:red;font-weight:bold;">${total}</span> 元　你付 ${paid} 元，找回 <span style="color:red;font-weight:bold;">${change}</span> 元`
                        : `總共費用 ${blankLine()} 元　你付 ${paid} 元，找回 ${blankLine()} 元`,
                    answerDisplay: ''
                });
            } else if (questionType === 'fill-select') {
                const correctCoins = walletToCoins(change);
                const opts = this._generateCoinOptions(change, correctCoins);
                const choicesHtml = opts.map((opt, idx) => {
                    const label = String.fromCharCode(9312 + idx);
                    const isCorrect = opt.total === change;
                    const style = showAnswers && isCorrect ? 'border-color: red; border-width: 3px;' : '';
                    const check = (showAnswers && isCorrect)
                        ? '<span style="display:inline-block;width:16px;height:16px;border:1.5px solid red;color:red;font-size:14px;line-height:16px;text-align:center;margin:0 4px;vertical-align:middle;">✓</span>'
                        : checkbox;
                    const answerTag = (showAnswers && isCorrect)
                        ? `<span style="color:red;font-weight:bold;margin-left:6px;">答案：${change} 元</span>`
                        : '';
                    return `<div class="coin-choice-option" style="${style}">
                        <span style="font-weight:bold; min-width:20px;">${label}</span>${check}
                        <div class="combo-coins">${opt.coins.map(c => renderCoin(c)).join('')}</div>${answerTag}
                    </div>`;
                }).join('');
                const fillArea = showAnswers
                    ? `總共費用 <span style="color:red;font-weight:bold;">${total}</span> 元　你付 ${paid} 元，找回 <span style="color:red;font-weight:bold;">${change}</span> 元`
                    : `總共費用 ${blankLine()} 元　你付 ${paid} 元，找回 ${blankLine()} 元`;
                questions.push({
                    prompt: `你點了：${itemList}`,
                    visual: `<div style="margin-bottom:6px;">${fillArea}</div>
                             <div style="margin-bottom:4px;">請選出正確的找零組合：</div>
                             <div class="coin-choice-options">${choicesHtml}</div>`,
                    answerArea: '',
                    answerDisplay: ''
                });
            } else if (questionType === 'coin-select') {
                const correctCoins = walletToCoins(change);
                const opts = this._generateCoinOptions(change, correctCoins);
                const choicesHtml = opts.map((opt, idx) => {
                    const label = String.fromCharCode(9312 + idx);
                    const isCorrect = opt.total === change;
                    const style = showAnswers && isCorrect ? 'border-color: red; border-width: 3px;' : '';
                    const check = (showAnswers && isCorrect)
                        ? '<span style="display:inline-block;width:16px;height:16px;border:1.5px solid red;color:red;font-size:14px;line-height:16px;text-align:center;margin:0 4px;vertical-align:middle;">✓</span>'
                        : checkbox;
                    const answerTag = (showAnswers && isCorrect)
                        ? `<span style="color:red;font-weight:bold;margin-left:6px;">答案：${change} 元</span>`
                        : '';
                    return `<div class="coin-choice-option" style="${style}">
                        <span style="font-weight:bold; min-width:20px;">${label}</span>${check}
                        <div class="combo-coins">${opt.coins.map(c => renderCoin(c)).join('')}</div>${answerTag}
                    </div>`;
                }).join('');
                questions.push({
                    prompt: `你點了：${itemList}，總共 <span style="color:red;font-weight:bold;">${total}</span> 元，付 ${paid} 元，應找回 <span style="color:red;font-weight:bold;">${change}</span> 元，請選出正確的找零組合：`,
                    visual: `<div class="coin-choice-options">${choicesHtml}</div>`,
                    answerArea: '',
                    answerDisplay: ''
                });
            } else if (questionType === 'hint-select') {
                const correctCoins = walletToCoins(change);
                const opts = this._generateCoinOptions(change, correctCoins);
                const choicesHtml = opts.map((opt, idx) => {
                    const label = String.fromCharCode(9312 + idx);
                    const isCorrect = opt.total === change;
                    const style = showAnswers && isCorrect ? 'border-color: red; border-width: 3px;' : '';
                    const check = (showAnswers && isCorrect)
                        ? '<span style="display:inline-block;width:16px;height:16px;border:1.5px solid red;color:red;font-size:14px;line-height:16px;text-align:center;margin:0 4px;vertical-align:middle;">✓</span>'
                        : checkbox;
                    const answerTag = (showAnswers && isCorrect)
                        ? `<span style="color:red;font-weight:bold;margin-left:6px;">答案：${change} 元</span>`
                        : '';
                    return `<div class="coin-choice-option" style="${style}">
                        <span style="font-weight:bold; min-width:20px;">${label}</span>${check}
                        <div class="combo-coins">${opt.coins.map(c => renderCoin(c)).join('')}</div>
                        <span style="color:#ccc;font-weight:bold;margin-left:6px;">${opt.total}元</span>${answerTag}
                    </div>`;
                }).join('');
                questions.push({
                    prompt: `你點了：${itemList}，總共 <span style="color:red;font-weight:bold;">${total}</span> 元，付 ${paid} 元，應找回 <span style="color:red;font-weight:bold;">${change}</span> 元，請選出正確的找零組合：`,
                    visual: `<div class="coin-choice-options">${choicesHtml}</div>`,
                    answerArea: '',
                    answerDisplay: ''
                });
            } else if (questionType === 'hint-complete') {
                const combo = this._findCombo(change);
                if (!combo) continue;
                const coinQty = (value) => value >= 100 ? '張' : '個';
                const partsHtml = combo.map(c => {
                    const icons = Array(c.count).fill(renderCoin(c.denom)).join('');
                    const answerNum = showAnswers
                        ? `<span style="color:red;font-weight:bold;">${c.count}</span>` : '___';
                    return `${answerNum}${coinQty(c.denom)} ${icons}`;
                }).join('&nbsp;&nbsp;');
                const totalColor = showAnswers ? 'color:red' : 'color:#ccc';
                const totalHint = `<span style="font-size:14pt; font-weight:bold; margin-left:6px;">共 <span style="${totalColor};font-weight:bold;">${change}</span> 元</span>`;
                questions.push({
                    prompt: `你點了：${itemList}，總共 ${total} 元，付 ${paid} 元，應找回多少元？`,
                    visual: `<div style="margin:4px 0;">找回 ${partsHtml} ${totalHint}</div>`,
                    answerArea: '',
                    answerDisplay: ''
                });
            }
        }
        return questions;
    },

    _findCombo(amount) {
        const denoms = [1000, 500, 100, 50, 10, 5, 1];
        const result = [];
        let remaining = amount;
        for (const d of denoms) {
            if (remaining >= d) {
                const c = Math.floor(remaining / d);
                result.push({ denom: d, count: c });
                remaining -= c * d;
            }
        }
        if (remaining > 0) return null;
        return result;
    },

    _generateCoinOptions(correctAmount, correctCoins) {
        const options = [{ coins: [...correctCoins], total: correctAmount }];
        for (let attempt = 0; attempt < 20 && options.length < 3; attempt++) {
            const offset = randomInt(1, Math.max(5, Math.floor(correctAmount * 0.3)));
            const wrongAmount = Math.random() < 0.5
                ? correctAmount + offset
                : Math.max(1, correctAmount - offset);
            if (options.some(o => o.total === wrongAmount)) continue;
            const wrongCoins = walletToCoins(wrongAmount);
            options.push({ coins: wrongCoins, total: wrongAmount });
        }
        while (options.length < 3) {
            const wrongAmount = correctAmount + options.length * 3;
            options.push({ coins: walletToCoins(wrongAmount), total: wrongAmount });
        }
        return shuffle(options);
    }
});
