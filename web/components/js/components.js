(function() {

//  1. helpers ----------------------------------------------------------------

    // 1.1. 主要为了兼容 IE8 的事件处理方法集
    var EventUtil = {
        addHandler: function(el, type, handler) {
            if (el.addEventListener) {
                el.addEventListener(type, handler, false);
            } else {
                el.attachEvent('on', type, handler);
            }
        },
        getEvent: function(event) {
            return event ? event : window.event;
        },
        getTarget: function(event) {
            return event.target || event.srcElement;
        },
        preventDefault: function(event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        }
    };

    // 1.2. 获取元素的索引
    function getIndex(el) {
        var parentEl = el.parentNode,
            childEls = parentEl.getElementsByTagName('li');
        for (var i = 0,  len = childEls.length; i < len; i++) {
            if (childEls[i] === el) return i;
        }
    }
    // 1.3. 改变状态
    function changeState(lis, ul, index) {
        // 给予目标按钮选中效果
        lis[index].className = 'activeli';
        // 切换图片
        ul.style.top = -index*50 + 'px';
    }

    // 1.4. 根据值删除数组元素
    function removeItemByValue(arr, item) {
        var index = arr.indexOf(item);
        if (index >= 0) {
            arr.splice(index, 1);
        }
    }

    // 1.5. nextElementSibling/previousElementSibling 只支持 IE9，用这个方法兼容 IE8
    function nextElementSibling(el) {
        do { el = el.nextSibling; } while ( el && el.nodeType !== 1 );
        return el;
    }
    function previousElementSibling(el) {
        do { el = el.previousSibling; } while ( el && el.nodeType !== 1 );
        return el;
    }

    // 1.6 自动触发事件的 trigger 方法，模拟 $().trigger()
    function trigger(el, type) {
        var event = new CustomEvent(type, {
            bubbles: true,
            cancelable: false
        });
        el.dispatchEvent(event);
    }

    // 1.7 模拟 $.ajax()
    function ajax(url, opts){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            var completed = 4;
            if(xhr.readyState === completed){
                if(xhr.status === 200){
                    opts.success(xhr.responseText, xhr);
                }else{
                    opts.error(xhr.responseText, xhr);
                }
            }
        };
        xhr.open(opts.method, url, true);
        xhr.send(opts.data);
    }

// 2. api ---------------------------------------------------------------------

    var api = {
        slide: function(slideClassName) {

            // 2.1. 定义变量
            var currentIndex = 0,
                slideBox = document.querySelector(slideClassName),
                slideBoxUlEl = slideBox.getElementsByTagName('ul')[0],
                count = slideBoxUlEl.getElementsByTagName('li').length,
                slideBoxOlEl = document.createElement('ol'),
                slideBoxOlLiEls = slideBoxOlEl.getElementsByTagName('li');

            // 2.2. 生成 <ol> 按钮组
            (function() {
                for (var i = 1; i < count + 1; i++) {
                    var liEl = document.createElement('li');
                    liEl.textContent = i;
                    slideBoxOlEl.appendChild(liEl);
                }
                slideBox.appendChild(slideBoxOlEl);
            })();

            // 2.3. 设定轮播效果
            // setInterval handler
            var setIntervalHandler = function() {
                // 去掉当前按钮的选中效果
                slideBoxOlLiEls[currentIndex].className = '';
                // 判断目前轮播到第几个按钮
                currentIndex = currentIndex < count - 1 ? currentIndex + 1 : 0;
                changeState(slideBoxOlLiEls, slideBoxUlEl, currentIndex);
            };
            // 初始化状态
            changeState(slideBoxOlLiEls, slideBoxUlEl, currentIndex);
            // 设定初始的循环播放
            var intervalId = setInterval(setIntervalHandler, 3000);

            // 2.4. 绑定事件
            // 2.4.1 mouseover 清空 interval
            EventUtil.addHandler(slideBox, 'mouseover', function() {
                clearInterval(intervalId);
            });
            // 2.4.2 mouseout 恢复 interval
            EventUtil.addHandler(slideBox, 'mouseout', function() {
                intervalId = setInterval(setIntervalHandler, 3000);
            });
            // 2.4.3 click 切换状态
            EventUtil.addHandler(slideBoxOlEl, 'click', function(e) {
                event = EventUtil.getEvent(e);
                var target = EventUtil.getTarget(event);
                if (target.tagName === 'LI') {
                    slideBoxOlLiEls[currentIndex].className = '';
                    currentIndex = getIndex(target);
                    changeState(slideBoxOlLiEls, slideBoxUlEl, currentIndex);
                }
            });
        },

        invitePanel: function(invitePanelIdName) {
            ajax('invite_panel.json', {
                method: 'GET',
                success: function(response) {

                    // 2.0. 初始化
                    var jsonObj = JSON.parse(response),
                        persons = {
                            invited: [],
                            recommended: (jsonObj.recommended).concat(jsonObj.invited)
                        },
                        invitePanel = document.querySelector(invitePanelIdName);
                    invitePanel.innerHTML = '<div class="invite-title"><span class="invite-input"><input placeholder="搜索你想邀请的人" type="text"><i></i></span><span class="invite-status"></span></div><h3>推荐人选</h3><ul class="invite-suggest"></ul><div class="invite-arrow"><a href="">上一页</a><a href="">下一页</a></div>';
                    var inviteStatus = invitePanel.getElementsByClassName('invite-status')[0],
                        inviteSuggest = invitePanel.getElementsByClassName('invite-suggest')[0];

                    // 初始化：生成邀请人列表
                    (function() {
                        var recommendedLen = persons.recommended.length,
                            avatarUrl,
                            personName,
                            bio,
                            innerHtmlText = '',
                            inviteSuggest = invitePanel.getElementsByClassName('invite-suggest')[0];

                        for (var i = 0; i < recommendedLen; i++) {
                            avatarUrl = persons.recommended[i].avatarUrl;
                            personName = persons.recommended[i].name;
                            bio = persons.recommended[i].bio;
                            innerHtmlText += '<li><div><a href=""><img src="http://7xlcqv.com1.z0.glb.clouddn.com/interview/zhihu/invite-panel/' + avatarUrl.slice(avatarUrl.indexOf('/')) + '" alt=""></a><div><button class="btn-recommended">邀请回答</button><a href="">' + personName + '</a><div class="bio">' + bio + '</div></div></div></li>';
                        }
                        inviteSuggest.innerHTML = innerHtmlText;
                    })();

                // 2.1. 邀请按钮对应的一系列功能  ----------------------------------------------

                    (function() {
                        // 2.1.1. 定义变量和方法

                        // 定义更新方法（首先更新 persons 对象，然后根据 persons 对象更新顶部提示部分以及邀请列表里的状态），这是最核心的方法
                        var changeAll = function(target) {
                            var nextAEl = target.nextElementSibling || nextElementSibling(target),
                                prevAEl = target.previousElementSibling || previousElementSibling(target),
                                choice = target.textContent === '邀请回答' ? 'invite' : 'uninvite',
                                personName = nextAEl ? nextAEl.textContent : prevAEl.textContent;

                            // change 1：根据 choice 更新 persons 对象

                            switch (choice) {
                                case 'invite':
                                    (function() {
                                        for (var i = 0; i < persons.recommended.length; i++) {
                                            if (persons.recommended[i].name === personName) break;
                                        }
                                        (persons.invited).unshift(persons.recommended[i]);
                                        removeItemByValue(persons.recommended, persons.recommended[i]);
                                    })();
                                    break;
                                case 'uninvite':
                                    (function() {
                                        for (var i = 0; i < persons.invited.length; i++) {
                                            if (persons.invited[i].name === personName) break;
                                        }
                                        (persons.recommended).unshift(persons.invited[i]);
                                        removeItemByValue(persons.invited, persons.invited[i]);
                                    })();
                                    break;
                                default:
                                    break;
                            }

                            // change 2：更新顶部的邀请的提示语

                            var innerHtmlText = '',
                                coverCardText = '<div><i></i><ul>';
                            // 拼接 coverCard 字符串
                            (function() {
                                for (var i = 0; i < persons.invited.length; i++) {
                                    coverCardText += '<li><a><img src="http://7xlcqv.com1.z0.glb.clouddn.com/interview/zhihu/invite-panel/' + (persons.invited[i].avatarUrl).slice((persons.invited[i].avatarUrl).indexOf('/')) + '" alt=""></a><a>' + persons.invited[i].name + '</a><button>收回邀请</button></li>';
                                }
                            })();
                            coverCardText += '</ul></div>';
                            // 拼接整个 invite status 字符串
                            if (persons.invited.length > 0) {
                                if (persons.invited.length > 2) {
                                    innerHtmlText += '您已邀请 <span><a href="">' + persons.invited[0].name + '</a>、<a href="">' + persons.invited[1].name + '</a>' + coverCardText + '</span> 等 ' + persons.invited.length + ' 人';
                                } else if (persons.invited.length === 2) {
                                    innerHtmlText += '您已邀请 <span><a href="">' + persons.invited[0].name + '</a>、<a href="">' + persons.invited[1].name + '</a>' + coverCardText + '</span>';
                                } else {
                                    innerHtmlText += '您已邀请 <span><a href="">' + persons.invited[0].name + '</a>' + coverCardText + '</span>';
                                }
                            }
                            inviteStatus.innerHTML = innerHtmlText;

                            // change 3：更新邀请人列表里的按钮状态（包括 className 和 文字内容）

                            // 如果点击的是邀请人列表里的按钮，则直接根据上下文改变按钮状态；否则，如果是悬浮框的按钮的话，需要遍历邀请人列表定位需要改变的相应按钮，并改变按钮状态
                            if (nextAEl) {
                                switch (choice) {
                                    case 'invite':
                                        target.className = 'btn-invited';
                                        target.textContent = '收回邀请';
                                        break;
                                    case 'uninvite':
                                        target.className = 'btn-recommended';
                                        target.textContent = '邀请回答';
                                        break;
                                    default:
                                        break;
                                }
                            } else if (prevAEl) {
                                (function() {
                                    var btnEls = inviteSuggest.getElementsByTagName('button'),
                                        aEl;
                                    for (var i = 0; i < btnEls.length; i++) {
                                        aEl = btnEls[i].nextElementSibling || nextElementSibling(btnEls[i]);
                                        if (aEl.textContent === prevAEl.textContent) break;
                                    }
                                    btnEls[i].className = 'btn-recommended';
                                    btnEls[i].textContent = '邀请回答';
                                })();
                            }
                        };

                        // 2.1.2. 绑定事件
                        EventUtil.addHandler(invitePanel, 'click', function(e) {
                            event = EventUtil.getEvent(e);
                            var target = EventUtil.getTarget(event);

                            if (target.tagName === 'BUTTON') {
                                changeAll(target);

                                // 如果此时顶部提示部分已经存在，则对其绑定相应的 mouseover 和 click 事件，因为 inviteStatus 的内容是会完全更新的，所以这里需要每次发生 button click 之后重复绑定 mouseover/out 事件
                                if (persons.invited.length > 0) {
                                    (function() {
                                        var spanEl = inviteStatus.querySelector('span'),
                                            coverCard = spanEl.querySelector('div');

                                        // 悬浮框的 mouseover / mouseout
                                            // 因为需要让悬浮框保持状态，所以在 CSS 里增加了文字部分的上下 padding，扩大 mouseover 范围
                                        EventUtil.addHandler(spanEl, 'mouseover', function(e) {
                                            coverCard.style.display = 'block';
                                        });
                                        EventUtil.addHandler(spanEl, 'mouseout', function(e) {
                                            coverCard.style.display = 'none';
                                        });
                                        EventUtil.addHandler(coverCard, 'mouseover', function(e) {
                                            coverCard.style.display = 'block';
                                        });
                                        EventUtil.addHandler(coverCard, 'mouseout', function(e) {
                                            coverCard.style.display = 'none';
                                        });
                                    })();
                                }
                            }
                        });

                        // 触发已被邀请者：遍历 JSON 数据中已经受到邀请的人，模拟触发 click
                        // (function() {
                        //     var btns = invitePanel.getElementsByTagName('button'),
                        //         invitedLen = persons.invited.length,
                        //         aEl;
                        //     for (var i = 0; i < invitedLen; i++) {
                        //         for (var j = 0; j < btns.length; j++) {
                        //             aEl = btns[j].nextElementSibling || nextElementSibling(btns[j]);
                        //             if (aEl.textContent === persons.invited[i].name) {
                        //                 trigger(btns[j], 'click');
                        //             }
                        //         }
                        //     }
                        // })();
                    })();

                    // 2.2. 翻页功能  --------------------------------------------------------

                    (function() {
                        // 2.2.2. 完成翻页逻辑
                        // 定义变量
                        var liEls = inviteSuggest.getElementsByTagName('li'),
                            // 以下代码只考虑 count > 4 的情况
                            count = liEls.length,
                            totalGroupCount = Math.ceil(count/4),
                            currentGroupCount = 1,
                            inviteArrow = invitePanel.getElementsByClassName('invite-arrow')[0],
                            arrows = inviteArrow.getElementsByTagName('a');

                        // 初始化：显示的邀请人和上下页状态
                        (function() {
                            for (var i = 0; i < 4; i++) {
                                liEls[i].style.display = 'list-item';
                            }
                        })();
                        arrows[0].className = 'arrow-disabled';

                        // 绑定事件
                        EventUtil.addHandler(inviteArrow, 'click', function(e){
                            event = EventUtil.getEvent(e);
                            var target = EventUtil.getTarget(event);
                            EventUtil.preventDefault(event);

                            if (target.tagName === 'A') {
                                var len,
                                    // 这里的 reminderNum 取总数的余数，如果被 4 整除则取 4
                                    reminderNum = count%4 === 0 ? 4 : count%4;

                                if (target.textContent === '下一页' && currentGroupCount !== totalGroupCount) {
                                    // 切换显示的 recommended persons 列表
                                    (function() {
                                        len = reminderNum + 4*currentGroupCount;
                                        for (var i = 4*(currentGroupCount-1); i < 4*currentGroupCount; i++) {
                                            liEls[i].style.display = 'none';
                                        }
                                        currentGroupCount++;
                                        len = currentGroupCount === totalGroupCount ? reminderNum+4*(currentGroupCount-1) : 4*currentGroupCount;
                                        for (var j = 4*(currentGroupCount-1); j < len; j++) {
                                            liEls[j].style.display = 'list-item';
                                        }
                                    })();
                                    // 设置 "上一页" "下一页" 状态
                                    arrows[0].className = '';
                                    if (currentGroupCount === totalGroupCount) {
                                        arrows[1].className = 'arrow-disabled';
                                    }
                                } else if (target.textContent === '上一页' && currentGroupCount !== 1) {
                                    // 切换显示的 recommended persons 列表
                                    (function() {
                                        len = currentGroupCount === totalGroupCount ? reminderNum+4*(currentGroupCount-1) : 4*currentGroupCount;
                                        for (var i = 4*(currentGroupCount-1); i < len; i++) {
                                            liEls[i].style.display = 'none';
                                        }
                                        currentGroupCount--;
                                        for (var j = 4*(currentGroupCount-1); j < 4*currentGroupCount; j++) {
                                            liEls[j].style.display = 'list-item';
                                        }
                                    })();
                                    // 设置 "上一页" "下一页" 状态
                                    arrows[1].className = '';
                                    if (currentGroupCount === 1) {
                                        arrows[0].className = 'arrow-disabled';
                                    }
                                }
                            }
                        });
                    })();
                }
            });
        }
    };

    // umd expose
    if (typeof exports === 'object') {
        module.exports = api;
    } else if (typeof define === 'function' && define.amd) {
        define(function(){ return api; });
    } else {
        this.Components = api;
    }
})();

