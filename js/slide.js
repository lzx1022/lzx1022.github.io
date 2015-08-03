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
        }
    };
    // 1.2. 获取元素的索引
    function getIndex(el) {
        var parentEl = el.parentNode,
            childEls = parentEl.getElementsByTagName('li');
        for (var i = 0; i < childEls.length; i++) {
            if (childEls[i] === el) return i;
        }
    }

// 2. api ---------------------------------------------------------------------

    var api = {
        slide: function(slideClassName) {

            // 2.1. 初始化
            var currentIndex = 0,
                slideBox = document.querySelector(slideClassName),
                slideBoxUlEl = slideBox.getElementsByTagName('ul')[0],
                count = slideBoxUlEl.getElementsByTagName('li').length,
                slideBoxOlEl = document.createElement('ol'),
                slideBoxOlLiEls = slideBoxOlEl.getElementsByTagName('li');

            // 定义改变状态的方法
            var changeState = function() {
                // 给予目标按钮选中效果
                slideBoxOlLiEls[currentIndex].className = 'activeli';
                // 切换图片
                slideBoxUlEl.style.top = -currentIndex*50 + 'px';
            };

            // 2.2. 生成 <ol> 按钮组
            for (var i = 1; i < count + 1; i++) {
                (function() {
                    var liEl = document.createElement('li');
                    liEl.textContent = i;
                    slideBoxOlEl.appendChild(liEl);
                })(i);
            }
            slideBox.appendChild(slideBoxOlEl);
            // 初始化状态
            changeState();

            // 2.3. 设定轮播效果
            // 设定初始的循环播放
            // setInterval handler
            var setIntervalHandler = function() {
                // 去掉当前按钮的选中效果
                slideBoxOlLiEls[currentIndex].className = '';
                // 判断目前轮播到第几个按钮
                currentIndex = currentIndex < count - 1 ? currentIndex + 1 : 0;
                changeState();
            };
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
                slideBoxOlLiEls[currentIndex].className = '';
                // 获取点击按钮的索引
                event = EventUtil.getEvent(e);
                currentIndex = getIndex(EventUtil.getTarget(event));
                changeState();
            });
        }
    };

    // umd expose
    if (typeof exports === 'object') {
        module.exports = api;
    } else if (typeof define === 'function' && define.amd) {
        define(function(){ return api; });
    } else {
        this.slideBox = api;
    }
})();
