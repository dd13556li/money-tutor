// B4 特賣比一比 作業單
WorksheetRegistry.register('b4', {
    name: 'B4 特賣比一比',
    icon: '🏷️',
    defaultCount: 10,
    subtitle(opts) {
        const qt = {
            cheaper:        '找便宜(2家)',
            'cheaper-3':    '找便宜(3家)',
            both:           '綜合題',
            fill:           '計算差額',
            'fill-select':  '填空與選擇',
            'coin-select':  '圖示選擇',
            'hint-select':  '提示選擇',
            'hint-complete':'提示完成',
        };
        return `題型：${qt[opts.questionType || 'cheaper']}`;
    },

    toolbarConfig: {
        fontButton: null,
        adjustCountButton: null,
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
            },
            {
                id: 'question-type-btn',
                label: '📝 測驗題型',
                type: 'dropdown',
                options: [
                    { label: '找便宜(2家店比較)',          value: 'cheaper'       },
                    { label: '找便宜(3家店比較)',          value: 'cheaper-3'     },
                    { label: '綜合題（找便宜＋差多少）',  value: 'both'          },
                    { label: '計算差額',                   value: 'fill'          },
                    { label: '填空與選擇（差額＋金額組合）',value: 'fill-select'  },
                    { label: '圖示選擇（選出便宜金額）',  value: 'coin-select'   },
                    { label: '提示選擇（有金額提示）',    value: 'hint-select'   },
                    { label: '提示完成（填入幣值數量）',  value: 'hint-complete' },
                ],
                getCurrentValue: (params) => params.questionType || 'cheaper',
                onChange: (val, app) => { app.params.questionType = val; app.generate(); }
            },
            {
                id: 'price-style-btn',
                label: '💰 金額呈現',
                type: 'dropdown',
                options: [
                    { label: '數字填空',   value: 'num-only'  },
                    { label: '看圖填空',   value: 'coin-blank'},
                    { label: '提示完成',   value: 'coin-num'  },
                ],
                getCurrentValue: (params) => params.priceStyle || 'num-only',
                onChange: (val, app) => { app.params.priceStyle = val; app.generate(); }
            }
        ],
    },

    _items: [
        { name:'鉛筆盒',       icon:'✏️',  optA:{ store:'文具店',  price:85   }, optB:{ store:'超市',   price:65   }, optC:{ store:'書局',   price:72   } },
        { name:'蘋果（1斤）',  icon:'🍎',  optA:{ store:'超市',    price:45   }, optB:{ store:'菜市場', price:35   }, optC:{ store:'量販店', price:40   } },
        { name:'原子筆',       icon:'🖊️', optA:{ store:'書局',    price:15   }, optB:{ store:'大賣場', price:12   }, optC:{ store:'量販店', price:10   } },
        { name:'礦泉水',       icon:'💧',  optA:{ store:'超商',    price:20   }, optB:{ store:'量販店', price:13   }, optC:{ store:'超市',   price:16   } },
        { name:'洗髮精',       icon:'🧴',  optA:{ store:'藥妝店',  price:189  }, optB:{ store:'量販店', price:149  }, optC:{ store:'超市',   price:169  } },
        { name:'巧克力',       icon:'🍫',  optA:{ store:'超商',    price:55   }, optB:{ store:'超市',   price:42   }, optC:{ store:'量販店', price:38   } },
        { name:'毛巾',         icon:'🧣',  optA:{ store:'百貨',    price:250  }, optB:{ store:'市場',   price:180  }, optC:{ store:'量販店', price:195  } },
        { name:'故事書',       icon:'📖',  optA:{ store:'書店',    price:280  }, optB:{ store:'二手店', price:150  }, optC:{ store:'網購',   price:130  } },
        { name:'牛奶（1公升）',icon:'🥛',  optA:{ store:'超商',    price:65   }, optB:{ store:'超市',   price:55   }, optC:{ store:'量販店', price:48   } },
        { name:'面紙（一包）', icon:'🧻',  optA:{ store:'超商',    price:39   }, optB:{ store:'量販店', price:25   }, optC:{ store:'大賣場', price:22   } },
        { name:'雨傘',         icon:'☂️',  optA:{ store:'百貨',    price:480  }, optB:{ store:'夜市',   price:150  }, optC:{ store:'量販店', price:200  } },
        { name:'餅乾（一盒）', icon:'🍪',  optA:{ store:'超商',    price:45   }, optB:{ store:'超市',   price:35   }, optC:{ store:'量販店', price:28   } },
        { name:'牙刷',         icon:'🪥',  optA:{ store:'藥局',    price:39   }, optB:{ store:'量販店', price:29   }, optC:{ store:'超市',   price:32   } },
        { name:'色鉛筆',       icon:'🖍️', optA:{ store:'文具店',  price:120  }, optB:{ store:'大賣場', price:89   }, optC:{ store:'量販店', price:75   } },
        { name:'果汁（1瓶）',  icon:'🧃',  optA:{ store:'超商',    price:35   }, optB:{ store:'超市',   price:25   }, optC:{ store:'量販店', price:20   } },
        { name:'電池（4顆）',  icon:'🔋',  optA:{ store:'超商',    price:85   }, optB:{ store:'量販店', price:59   }, optC:{ store:'大賣場', price:68   } },
        { name:'洗碗精',       icon:'🧼',  optA:{ store:'超市',    price:59   }, optB:{ store:'量販店', price:45   }, optC:{ store:'大賣場', price:52   } },
        { name:'運動鞋',       icon:'👟',  optA:{ store:'品牌店',  price:1580 }, optB:{ store:'網購',   price:1200 }, optC:{ store:'特賣場', price:950  } },
        { name:'拖鞋',         icon:'🩴',  optA:{ store:'百貨',    price:390  }, optB:{ store:'夜市',   price:120  }, optC:{ store:'量販店', price:150  } },
        { name:'手套',         icon:'🧤',  optA:{ store:'百貨',    price:320  }, optB:{ store:'市場',   price:180  }, optC:{ store:'量販店', price:145  } },
    ],

    generate(options) {
        const questionType = options.questionType || 'cheaper';
        const coinStyle    = options.coinStyle     || 'real';
        const priceStyle   = options.priceStyle    || 'num-only';
        const showAnswers  = options._showAnswers  || false;
        const usedKeys     = options._usedValues   || new Set();
        const count        = options.count         || 10;
        const items        = this._items;

        const renderCoin = (value) => {
            if (coinStyle === 'symbol')    return coinSymbol(value);
            if (coinStyle === 'real-back') return coinImgBack(value);
            if (coinStyle === 'real-both') return coinImgRandom(value);
            return coinImgFront(value);
        };

        // 金額呈現方式：純數字 / 金錢圖示+數字 / 金錢圖示+底線
        const renderPrice = (price) => {
            if (priceStyle === 'num-only') {
                return `<strong>${price}</strong> 元`;
            }
            const coins = walletToCoins(price);
            const coinImgsHtml = `<div style="display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:2px;margin:2px 0 1px;">${coins.map(c => renderCoin(c)).join('')}</div>`;
            if (priceStyle === 'coin-num') {
                return `${coinImgsHtml}<strong>${price}</strong> 元`;
            }
            // coin-blank：金錢圖示 + 底線填寫
            return `${coinImgsHtml}${blankLine()} 元`;
        };

        const checkbox = '<span style="display:inline-block;width:16px;height:16px;border:1.5px solid #333;margin:0 4px;vertical-align:middle;"></span>';

        const available = items.map((_, i) => i).filter(i => !usedKeys.has(`b4_${i}`));
        const pool      = shuffle(available.length >= 2 ? available : items.map((_, i) => i));
        const chosen    = pool.slice(0, count);
        chosen.forEach(i => usedKeys.add(`b4_${i}`));

        // 用於題目提示文字的 icon 包裝（讓 emoji 隨圖示比例縮放，不隨文字比例縮放）
        const iconSpan = (icon) => `<span class="ws-emoji-icon">${icon}</span>`;

        return chosen.map(idx => {
            const item = items[idx];

            // 隨機左右交換，增加版面多樣性
            const swapped    = Math.random() < 0.5;
            const left       = swapped ? item.optB : item.optA;
            const right      = swapped ? item.optA : item.optB;
            const cheaperOpt = item.optB;          // optB 永遠較便宜（2家比較）
            const cheaperPrice = cheaperOpt.price;
            const pricerOpt  = item.optA;
            const diff       = item.optA.price - item.optB.price;

            // 兩家比較區塊（所有題型共用）
            const priceRow = `<div style="display:flex;gap:18px;margin:6px 0;font-size:13pt;">
                <span style="flex:1;text-align:center;background:#fef9c3;border-radius:8px;padding:4px 8px;">
                    🏪 ${left.store}<br>${renderPrice(left.price)}
                </span>
                <span style="flex:1;text-align:center;background:#dbeafe;border-radius:8px;padding:4px 8px;">
                    🏬 ${right.store}<br>${renderPrice(right.price)}
                </span>
            </div>`;

            // ── 找便宜（3家店比較）────────────────────────────────────
            if (questionType === 'cheaper-3') {
                // 找出三家中最便宜的
                const stores3   = [item.optA, item.optB, item.optC];
                const cheapest3 = stores3.reduce((a, b) => a.price < b.price ? a : b);
                // 隨機排列三家店的顯示順序
                const shuffled3 = shuffle([...stores3]);
                const storeIcons = ['🏪', '🏬', '🏦'];
                const colors3    = ['#fef9c3', '#dbeafe', '#dcfce7'];
                const priceRow3 = `<div style="display:flex;gap:10px;margin:6px 0;font-size:12pt;">
                    ${shuffled3.map((opt, i) => `<span style="flex:1;text-align:center;background:${colors3[i]};border-radius:8px;padding:4px 6px;">
                        ${storeIcons[i]} ${opt.store}<br>${renderPrice(opt.price)}
                    </span>`).join('')}
                </div>`;
                const ans = showAnswers
                    ? `<span style="color:red;font-weight:bold;">${cheapest3.store}</span>`
                    : blankLine();
                return {
                    _key: `b4_${idx}`,
                    prompt: `${iconSpan(item.icon)}<strong>${item.name}</strong> 在三家店的售價如下：`,
                    visual: priceRow3,
                    answerArea: `哪家比較便宜？${ans}`,
                    answerDisplay: ''
                };
            }

            // ── 找便宜（2家店比較）────────────────────────────────────
            if (questionType === 'cheaper' ||
               (questionType === 'both' && Math.random() < 0.5)) {
                const ans = showAnswers
                    ? `<span style="color:red;font-weight:bold;">${cheaperOpt.store}</span>`
                    : blankLine();
                return {
                    _key: `b4_${idx}`,
                    prompt: `${iconSpan(item.icon)}<strong>${item.name}</strong> 在兩家店的售價如下：`,
                    visual: priceRow,
                    answerArea: `哪家比較便宜？${ans}`,
                    answerDisplay: ''
                };
            }

            // ── 差額（both 的另一半或 fill）─────────────────────────
            if (questionType === 'both') {
                const ans = showAnswers
                    ? `<span style="color:red;font-weight:bold;">${diff}</span>`
                    : blankLine();
                return {
                    _key: `b4_${idx}`,
                    prompt: `${iconSpan(item.icon)}<strong>${item.name}</strong> 在兩家店的售價如下：`,
                    visual: priceRow,
                    answerArea: `兩家差了多少元？${ans} 元`,
                    answerDisplay: ''
                };
            }

            // ── 1. 計算差額（原數字填空）────────────────────────────
            if (questionType === 'fill') {
                // 看圖填空（coin-blank）：商店格用金錢圖示顯示；差額區也顯示差額金錢圖示讓學生填數字
                if (priceStyle === 'coin-blank') {
                    const diffCoins = walletToCoins(diff);
                    const diffCoinImgs = `<span style="display:inline-flex;flex-wrap:wrap;align-items:center;gap:2px;margin:0 3px;vertical-align:middle;">${diffCoins.map(c => renderCoin(c)).join('')}</span>`;
                    return {
                        _key: `b4_${idx}`,
                        prompt: `${iconSpan(item.icon)}<strong>${item.name}</strong> 在兩家店的售價如下：`,
                        visual: priceRow,
                        answerArea: `兩家差了多少元？${diffCoinImgs}${blankLine()} 元`,
                        answerDisplay: ''
                    };
                }

                // 提示完成（coin-num）：商店格與差額均用 hint-complete 格式（___個X元[圖示] 共N元）
                if (priceStyle === 'coin-num') {
                    const mkHintComplete = (price, hideTotalNum) => {
                        const combo = this._findCombo(price);
                        if (!combo) return `<strong>${price}</strong> 元`;
                        const partsHtml = combo.map(c => {
                            const icons  = Array(c.count).fill(renderCoin(c.denom)).join('');
                            const ansNum = showAnswers
                                ? `<span style="color:red;font-weight:bold;">${c.count}</span>` : '___';
                            const qty    = c.denom >= 100 ? '張' : '個';
                            return `${ansNum}${qty}&nbsp;${icons}`;
                        }).join('&ensp;');
                        const totalColor = showAnswers ? 'color:red' : (hideTotalNum ? 'color:#ccc' : '');
                        return `<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:3px;margin:3px 0;">${partsHtml}&ensp;<span style="${totalColor};font-weight:bold;">共 ${price} 元</span></div>`;
                    };

                    const priceRowHC = `<div style="display:flex;gap:18px;margin:6px 0;font-size:12pt;">
                        <span style="flex:1;text-align:center;background:#fef9c3;border-radius:8px;padding:4px 8px;">
                            🏪 ${left.store}<br>${mkHintComplete(left.price, false)}
                        </span>
                        <span style="flex:1;text-align:center;background:#dbeafe;border-radius:8px;padding:4px 8px;">
                            🏬 ${right.store}<br>${mkHintComplete(right.price, false)}
                        </span>
                    </div>`;

                    const diffCombo = this._findCombo(diff);
                    let diffArea;
                    if (diffCombo) {
                        const partsHtml = diffCombo.map(c => {
                            const icons  = Array(c.count).fill(renderCoin(c.denom)).join('');
                            const ansNum = showAnswers
                                ? `<span style="color:red;font-weight:bold;">${c.count}</span>` : '___';
                            const qty    = c.denom >= 100 ? '張' : '個';
                            return `${ansNum}${qty}&nbsp;${icons}`;
                        }).join('&ensp;');
                        const totalColor = showAnswers ? 'color:red' : 'color:#ccc';
                        diffArea = `兩家差了多少元？${partsHtml}&ensp;<span style="${totalColor};font-weight:bold;">共 ${diff} 元</span>`;
                    } else {
                        const ans = showAnswers
                            ? `<span style="color:red;font-weight:bold;">${diff}</span>` : blankLine();
                        diffArea = `兩家差了多少元？${ans} 元`;
                    }

                    return {
                        _key: `b4_${idx}`,
                        prompt: `${iconSpan(item.icon)}<strong>${item.name}</strong> 在兩家店的售價如下：`,
                        visual: priceRowHC,
                        answerArea: diffArea,
                        answerDisplay: ''
                    };
                }

                // 數字填空（num-only）：純文字
                const ans = showAnswers
                    ? `<span style="color:red;font-weight:bold;">${diff}</span>`
                    : blankLine();
                return {
                    _key: `b4_${idx}`,
                    prompt: `${iconSpan(item.icon)}<strong>${item.name}</strong> 在兩家店的售價如下：`,
                    visual: priceRow,
                    answerArea: `兩家差了多少元？${ans} 元`,
                    answerDisplay: ''
                };
            }

            // ── 2. 填空與選擇：差額填空 ＋ 選出便宜店金額組合 ──────────
            if (questionType === 'fill-select') {
                const diffAns = showAnswers
                    ? `<span style="color:red;font-weight:bold;">${diff}</span>`
                    : blankLine();
                const correctCoins = walletToCoins(cheaperPrice);
                const opts = this._generateCoinOptions(cheaperPrice, correctCoins);
                const choicesHtml = opts.map((opt, i) => {
                    const label     = String.fromCharCode(9312 + i);
                    const isCorrect = opt.total === cheaperPrice;
                    const style     = showAnswers && isCorrect ? 'border-color:red;border-width:3px;' : '';
                    const check     = (showAnswers && isCorrect)
                        ? '<span style="display:inline-block;width:16px;height:16px;border:1.5px solid red;color:red;font-size:14px;line-height:16px;text-align:center;margin:0 4px;vertical-align:middle;">✓</span>'
                        : checkbox;
                    const answerTag = (showAnswers && isCorrect)
                        ? `<span style="color:red;font-weight:bold;margin-left:6px;">答案：${cheaperPrice} 元</span>`
                        : '';
                    return `<div class="coin-choice-option" style="${style}">
                        <span style="font-weight:bold;min-width:20px;">${label}</span>${check}
                        <div class="combo-coins">${opt.coins.map(c => renderCoin(c)).join('')}</div>${answerTag}
                    </div>`;
                }).join('');
                return {
                    _key: `b4_${idx}`,
                    prompt: `${iconSpan(item.icon)}<strong>${item.name}</strong> 在兩家店的售價如下：`,
                    visual: `${priceRow}
                        <div style="margin-bottom:6px;">兩家差了多少元？${diffAns} 元</div>
                        <div style="margin-bottom:4px;">在 <strong>${cheaperOpt.store}</strong> 購買需付 <strong>${cheaperPrice}</strong> 元，請選出正確的金額組合：</div>
                        <div class="coin-choice-options">${choicesHtml}</div>`,
                    answerArea: '',
                    answerDisplay: ''
                };
            }

            // ── 3. 圖示選擇：選出較便宜店的金額組合 ─────────────────
            if (questionType === 'coin-select') {
                const correctCoins = walletToCoins(cheaperPrice);
                const opts = this._generateCoinOptions(cheaperPrice, correctCoins);
                const choicesHtml = opts.map((opt, i) => {
                    const label     = String.fromCharCode(9312 + i);
                    const isCorrect = opt.total === cheaperPrice;
                    const style     = showAnswers && isCorrect ? 'border-color:red;border-width:3px;' : '';
                    const check     = (showAnswers && isCorrect)
                        ? '<span style="display:inline-block;width:16px;height:16px;border:1.5px solid red;color:red;font-size:14px;line-height:16px;text-align:center;margin:0 4px;vertical-align:middle;">✓</span>'
                        : checkbox;
                    const answerTag = (showAnswers && isCorrect)
                        ? `<span style="color:red;font-weight:bold;margin-left:6px;">答案：${cheaperPrice} 元</span>`
                        : '';
                    return `<div class="coin-choice-option" style="${style}">
                        <span style="font-weight:bold;min-width:20px;">${label}</span>${check}
                        <div class="combo-coins">${opt.coins.map(c => renderCoin(c)).join('')}</div>${answerTag}
                    </div>`;
                }).join('');
                return {
                    _key: `b4_${idx}`,
                    prompt: `${iconSpan(item.icon)}<strong>${item.name}</strong>：${pricerOpt.store} 賣 ${pricerOpt.price} 元，${cheaperOpt.store} 賣 <span style="color:red;font-weight:bold;">${cheaperPrice}</span> 元較便宜，請選出正確的金額組合：`,
                    visual: `<div class="coin-choice-options">${choicesHtml}</div>`,
                    answerArea: '',
                    answerDisplay: ''
                };
            }

            // ── 4. 提示選擇：同圖示選擇，但附灰色金額提示 ───────────
            if (questionType === 'hint-select') {
                const correctCoins = walletToCoins(cheaperPrice);
                const opts = this._generateCoinOptions(cheaperPrice, correctCoins);
                const choicesHtml = opts.map((opt, i) => {
                    const label     = String.fromCharCode(9312 + i);
                    const isCorrect = opt.total === cheaperPrice;
                    const style     = showAnswers && isCorrect ? 'border-color:red;border-width:3px;' : '';
                    const check     = (showAnswers && isCorrect)
                        ? '<span style="display:inline-block;width:16px;height:16px;border:1.5px solid red;color:red;font-size:14px;line-height:16px;text-align:center;margin:0 4px;vertical-align:middle;">✓</span>'
                        : checkbox;
                    const answerTag = (showAnswers && isCorrect)
                        ? `<span style="color:red;font-weight:bold;margin-left:6px;">答案：${cheaperPrice} 元</span>`
                        : '';
                    return `<div class="coin-choice-option" style="${style}">
                        <span style="font-weight:bold;min-width:20px;">${label}</span>${check}
                        <div class="combo-coins">${opt.coins.map(c => renderCoin(c)).join('')}</div>
                        <span style="color:#ccc;font-weight:bold;margin-left:6px;">${opt.total}元</span>${answerTag}
                    </div>`;
                }).join('');
                return {
                    _key: `b4_${idx}`,
                    prompt: `${iconSpan(item.icon)}<strong>${item.name}</strong>：${pricerOpt.store} 賣 ${pricerOpt.price} 元，${cheaperOpt.store} 賣 <span style="color:red;font-weight:bold;">${cheaperPrice}</span> 元較便宜，請選出正確的金額組合：`,
                    visual: `<div class="coin-choice-options">${choicesHtml}</div>`,
                    answerArea: '',
                    answerDisplay: ''
                };
            }

            // ── 5. 提示完成：填入便宜店金額的幣值數量 ───────────────
            if (questionType === 'hint-complete') {
                const combo = this._findCombo(cheaperPrice);
                if (!combo) {
                    // fallback：改為差額填空
                    const ans = showAnswers
                        ? `<span style="color:red;font-weight:bold;">${diff}</span>`
                        : blankLine();
                    return {
                        _key: `b4_${idx}`,
                        prompt: `${iconSpan(item.icon)}<strong>${item.name}</strong> 在兩家店的售價如下：`,
                        visual: priceRow,
                        answerArea: `兩家差了多少元？${ans} 元`,
                        answerDisplay: ''
                    };
                }
                const partsHtml = combo.map(c => {
                    const icons     = Array(c.count).fill(renderCoin(c.denom)).join('');
                    const answerNum = showAnswers
                        ? `<span style="color:red;font-weight:bold;">${c.count}</span>` : '___';
                    const qty       = c.denom >= 100 ? '張' : '個';
                    return `${answerNum}${qty} ${icons}`;
                }).join('&nbsp;&nbsp;');
                const totalColor = showAnswers ? 'color:red' : 'color:#ccc';
                const totalHint  = `<span style="font-size:14pt;font-weight:bold;margin-left:6px;">共 <span style="${totalColor};font-weight:bold;">${cheaperPrice}</span> 元</span>`;
                return {
                    _key: `b4_${idx}`,
                    prompt: `${iconSpan(item.icon)}<strong>${item.name}</strong>：${cheaperOpt.store} 較便宜只要 ${cheaperPrice} 元，填入正確的幣值數量：`,
                    visual: `<div style="margin:4px 0;">${partsHtml} ${totalHint}</div>`,
                    answerArea: '',
                    answerDisplay: ''
                };
            }

            // fallback
            return {
                _key: `b4_${idx}`,
                prompt: `${iconSpan(item.icon)}<strong>${item.name}</strong> 在兩家店的售價如下：`,
                visual: priceRow,
                answerArea: `哪家比較便宜？${blankLine()}`,
                answerDisplay: ''
            };
        });
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
            const offset      = randomInt(1, Math.max(5, Math.floor(correctAmount * 0.3)));
            const wrongAmount = Math.random() < 0.5
                ? correctAmount + offset
                : Math.max(1, correctAmount - offset);
            if (options.some(o => o.total === wrongAmount)) continue;
            options.push({ coins: walletToCoins(wrongAmount), total: wrongAmount });
        }
        while (options.length < 3) {
            const wrongAmount = correctAmount + options.length * 3;
            options.push({ coins: walletToCoins(wrongAmount), total: wrongAmount });
        }
        return shuffle(options);
    }
});
