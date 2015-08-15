(function() {

// ----------------------------------------------------------------------------
//  1. helpers ----------------------------------------------------------------
// ----------------------------------------------------------------------------

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

// 1.2. 根据值删除数组元素
function removeItemByValue(arr, item) {
    var index = arr.indexOf(item);
    if (index >= 0) {
        arr.splice(index, 1);
    }
}

// 1.3. nextElementSibling/previousElementSibling 只支持 IE9，用这个方法兼容 IE8
function nextElementSibling(el) {
    do { el = el.nextSibling; } while ( el && el.nodeType !== 1 );
    return el;
}
function previousElementSibling(el) {
    do { el = el.previousSibling; } while ( el && el.nodeType !== 1 );
    return el;
}

// 1.4 自动触发事件的 trigger 方法，模拟 $().trigger()
function trigger(el, type) {
    var event = new CustomEvent(type, {
        bubbles: true,
        cancelable: false
    });
    el.dispatchEvent(event);
}

// 1.5 模拟 $.ajax()
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

// ----------------------------------------------------------------------------
// 2. 功能逻辑   ----------------------------------------------------------------
// ----------------------------------------------------------------------------

ajax('../../js/interview/invite_panel.json', {
    method: 'GET',
    success: function(response) {

    // 2.0. 初始化
        var jsonObj = JSON.parse(response),
            persons = {
                invited: [],
                recommended: (jsonObj.recommended).concat(jsonObj.invited)
            },
            invitePanel = document.getElementById('invite-panel');
        invitePanel.innerHTML = '<div class="invite-title"><span class="invite-input"><input placeholder="搜索你想邀请的人" type="text"><i></i></span><span class="invite-status"></span></div><h3>推荐人选</h3><ul class="invite-suggest"></ul><div class="invite-arrow"><a href="">上一页</a><a href="">下一页</a></div>';
        var inviteStatus = invitePanel.getElementsByClassName('invite-status')[0],
            inviteSuggest = invitePanel.getElementsByClassName('invite-suggest')[0];

        // 初始化：生成邀请人列表
        (function() {
            var invitedLen = persons.invited.length,
                recommendedLen = persons.recommended.length,
                avatarUrl,
                personName,
                bio,
                innerHtmlText = '',
                inviteSuggest = invitePanel.getElementsByClassName('invite-suggest')[0];

            for (var i = 0; i < invitedLen; i++) {
                avatarUrl = persons.invited[i].avatarUrl;
                personName = persons.invited[i].name;
                bio = persons.invited[i].bio;
                innerHtmlText += '<li><div><a href=""><img src="../../img/interview/zhihu/invite-panel/' + avatarUrl.slice(avatarUrl.indexOf('/')) + '" alt=""></a><div><button class="btn-recommended">邀请回答</button><a href="">' + personName + '</a><div class="bio">' + bio + '</div></div></div></li>';
            }
            for (var j = 0; j < recommendedLen; j++) {
                avatarUrl = persons.recommended[j].avatarUrl;
                personName = persons.recommended[j].name;
                bio = persons.recommended[j].bio;
                innerHtmlText += '<li><div><a href=""><img src="../../img/interview/zhihu/invite-panel/' + avatarUrl.slice(avatarUrl.indexOf('/')) + '" alt=""></a><div><button class="btn-recommended">邀请回答</button><a href="">' + personName + '</a><div class="bio">' + bio + '</div></div></div></li>';
            }
            inviteSuggest.innerHTML = innerHtmlText;
        })();

    // 2.1. 邀请按钮对应的功能  ---------------------------------------------------

        (function() {
            // 2.1.1. 定义变量和方法

            // 定义改变顶部邀请提示语的方法，这是最核心的方法
            var changeAll = function(target, choice) {
                var aEl1 = target.nextElementSibling || nextElementSibling(target),
                    aEl2 = target.previousElementSibling || previousElementSibling(target),
                    personName;
                personName = aEl1 ? aEl1.textContent : aEl2.textContent;

                // change-1：根据 choice 更新 persons 对象

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

                // change-2：更新顶部的邀请的提示语

                var innerHtmlText = '',
                    coverCardText = '<div><i></i><ul>';
                // 拼接 coverCard 字符串
                (function() {
                    for (var i = 0; i < persons.invited.length; i++) {
                        coverCardText += '<li><a><img src="../../img/interview/zhihu/invite-panel/' + (persons.invited[i].avatarUrl).slice((persons.invited[i].avatarUrl).indexOf('/')) + '" alt=""></a><a>' + persons.invited[i].name + '</a><button>收回邀请</button></li>';
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

                // 绑定事件：如果 persons.invited.length > 0 即制作出 invited-status 内部的元素，则添加 mouseover / mouseout / click 事件
                    // 这两个方法必须写在 changeAll() 方法里面，因为 mouseover 必须根据文本的范围来判断，而文本本身是一只在更新的
                if (persons.invited.length > 0) {
                    (function() {
                        var spanEl = inviteStatus.querySelector('span'),
                            coverCard = spanEl.querySelector('div');

                        // 悬浮框的 mouseover / mouseout
                            // 因为需要让悬浮框保持状态，所以在 CSS 里增加了文字部分的上下 padding，扩大 hover 范围
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

                        // 悬浮框里 button 的 click
                        EventUtil.addHandler(coverCard, 'click', function(e) {
                            event = EventUtil.getEvent(e);
                            var target = EventUtil.getTarget(event);

                            if (target.tagName === 'BUTTON') {
                                var btnEls = inviteSuggest.getElementsByTagName('button'),
                                    aEl1, aEl2;
                                for (var i = 0; i < btnEls.length; i++) {
                                    aEl1 = btnEls[i].nextElementSibling || nextElementSibling(btnEls[i]);
                                    aEl2 = target.previousElementSibling || previousElementSibling(target);
                                    if (aEl1.textContent === aEl2.textContent) {
                                        btnEls[i].className = 'btn-recommended';
                                        btnEls[i].textContent = '邀请回答';
                                    }
                                }
                                changeAll(target, 'uninvite');
                            }
                        });

                    })();
                }
            };

            // 2.1.2. 绑定事件：邀请人列表里 button 上的 click
            EventUtil.addHandler(invitePanel, 'click', function(e) {
                event = EventUtil.getEvent(e);
                var target = EventUtil.getTarget(event);

                if (target.tagName === 'BUTTON') {
                    switch (target.className) {
                        case 'btn-recommended':
                            target.className = 'btn-invited';
                            target.textContent = '收回邀请';
                            changeAll(target, 'invite');
                            break;
                        case 'btn-invited':
                            target.className = 'btn-recommended';
                            target.textContent = '邀请回答';
                            changeAll(target, 'uninvite');
                            break;
                        default:
                            break;
                    }
                }
            });

            // 初始化：JSON 数据中已经受到邀请的人，模拟触发 click
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

    // 2.2. 翻页功能  -----------------------------------------------------------

        // 2.2.2. 完成翻页逻辑
        // 定义变量
        var liEls = inviteSuggest.getElementsByTagName('li'),
            // 以下代码只考虑 count > 4 的情况
            count = liEls.length,
            totalGroupCount = Math.ceil(count/4),
            currentGroupCount = 1,
            inviteArrow = invitePanel.getElementsByClassName('invite-arrow')[0],
            arrows = inviteArrow.getElementsByTagName('a');

        // 初始化：邀请人按钮状态和上下页状态
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
    }
});

})();
