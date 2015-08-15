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
// function prevElementSibling(el) {
//     do { el = el.previousSibling; } while ( el && el.nodeType !== 1 );
//     return el;
// }

// 1.4 自动触发事件的 trigger 方法，模拟 $().trigger()
function trigger(el, type) {
    var event = new CustomEvent(type, {
        bubbles: true,
        cancelable: false
    });
    el.dispatchEvent(event);
}

// ----------------------------------------------------------------------------
// 2. 功能逻辑   ----------------------------------------------------------------
// ----------------------------------------------------------------------------

// 2.0. 初始化
var invitePanel = document.getElementById('invite-panel');
invitePanel.innerHTML = '<div class="invite-title"><span class="invite-input"><input placeholder="搜索你想邀请的人" type="text"><i></i></span><span class="invite-status"></span></div><h3>推荐人选</h3><ul class="invite-suggest"></ul><div class="invite-arrow"><a href="">上一页</a><a href="">下一页</a></div>';

// 2.1. 邀请按钮对应的功能  -------------------------------------------------------

(function() {

    // 2.1.1. 定义变量和方法
    var invitedPersons = [];
    var changeTitle = function(target, choice) {
        var aEl = target.nextElementSibling || nextElementSibling(target);
        var personName = aEl.textContent;

        switch (choice) {
            case 'invite':
                invitedPersons.unshift(personName);
                break;
            case 'uninvite':
                removeItemByValue(invitedPersons, personName);
                break;
            default:
                break;
        }

        var invitedPersonsLen = invitedPersons.length,
            inviteStatusSpanEl = document.getElementsByClassName('invite-status')[0],
            innerHtmlText = '';
        // 因为这里考虑到要处理 2 个姓名之间的「、」，所以采用 switch，这样比用 if 判断更加清晰
        switch (invitedPersonsLen) {
            case 0:
                break;
            case 1:
                innerHtmlText += '您已邀请 <span><a href="">' + invitedPersons[0] + '</a></span>';
                break;
            case 2:
                innerHtmlText += '您已邀请 <span><a href="">' + invitedPersons[0] + '</a>、<a href="">' + invitedPersons[1] + '</a></span>';
                break;
            default:
                innerHtmlText += '您已邀请 <span><a href="">' + invitedPersons[0] + '</a>、<a href="">' + invitedPersons[1] + '</a></span> 等 ' + invitedPersonsLen + ' 人';
                break;
        }
        inviteStatusSpanEl.innerHTML = innerHtmlText;
    };

    // 2.1.2. 绑定 button 的 click 事件
    EventUtil.addHandler(invitePanel, 'click', function(e) {
        event = EventUtil.getEvent(e);
        var target = EventUtil.getTarget(event);

        if (target.tagName === 'BUTTON') {
            switch (target.className) {
                case 'btn-recommended':
                    target.className = 'btn-invited';
                    target.textContent = '收回邀请';
                    changeTitle(target, 'invite');
                    break;
                case 'btn-invited':
                    target.className = 'btn-recommended';
                    target.textContent = '邀请回答';
                    changeTitle(target, 'uninvite');
                    break;
                default:
                    break;
            }
        }
    });
})();

// 2.2. 翻页功能  ---------------------------------------------------------------

(function() {
    // 获取 json 文件生成 persons 对象
    var persons;
    $.ajaxSettings.async = false;
    $.getJSON('../../js/interview/invite_panel.json', function(data) {
        persons = data;
    });

    // 2.2.1. 初始化，根据 json 生成 DOM
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
        // console.log(innerHtmlText);
        inviteSuggest.innerHTML = innerHtmlText;
    })();

    // 2.2.2. 完成翻页逻辑
    // 定义变量
    var inviteSuggest = invitePanel.getElementsByClassName('invite-suggest')[0],
        liEls = inviteSuggest.getElementsByTagName('li'),
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

    // 初始化：JSON 数据中已经受到邀请的人，模拟触发 click
    (function() {
        var btns = invitePanel.getElementsByTagName('button'),
            invitedLen = persons.invited.length,
            aEl;
        for (var i = 0; i < invitedLen; i++) {
            for (var j = 0; j < btns.length; j++) {
                aEl = btns[j].nextElementSibling || nextElementSibling(btns[j]);
                if (aEl.textContent === persons.invited[i].name) {
                    trigger(btns[j], 'click');
                }
            }
        }
    })();

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
                    currentGroupCount ++;
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
                    currentGroupCount --;
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

})();
