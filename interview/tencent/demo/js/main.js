(function() {

var animateParas = [
    [
        ['flash', '0.7s', '1.7s'],
        ['zoomIn', '1.2s', 0],
        ['rotateInDownLeft', '0.7s', '1s'],
        ['rotateInDownLeft', '0.7s', '1s'],
        ['rotateInDownRight', '0.7s', '1s']
    ],
    [
        ['bounceInDown', '0.7s', 0],
        ['bounceInDown', '0.7s', '0.7s'],
        ['bounceInDown', '0.7s', '0.9s'],
        ['bounceInDown', '0.7s', '1.1s']
    ],
    [
        ['bounceInDown', '0.7s', 0],
        ['bounceInDown', '0.7s', '0.2s'],
        ['bounceInDown', '0.7s', '0.4s'],
        ['bounceInDown', '0.7s', '1.1s'],
        ['lightSpeedIn', '0.7s', '1.8s'],
        ['slideInDown', '1s', '2.5s']
    ],
    [
        ['bounceInDown', '0.5s', 0],
        ['bounceInDown', '0.5s', '0.2s'],
        ['bounceInDown', '0.5s', '0.4s'],
        ['bounceInDown', '0.5s', '0.6s'],
        ['bounceInDown', '0.5s', '0.8s'],
        ['bounceInDown', '0.7s', '1.3s'],
        ['bounceInDown', '0.7s', '1.3s']
    ],
    [
        ['zoomIn', '0.5s', 0],
        ['bounceIn', '0.7s', '0.5s'],
        ['bounceInDown', '0.5s', '1.2s'],
        ['bounceInDown', '0.5s', '1.4s'],
        ['bounceInDown', '0.5s', '1.6s'],
        ['bounceInDown', '0.5s', '1.9s']
    ],
    [
        ['flash', '0.5s', '2.6s'],
        ['bounceInDown', '0.7s', 0],
        ['bounceInDown', '0.7s', '0.2s'],
        ['bounceIn', '0.7s', '0.9s'],
        ['bounceIn', '1s', '1.7s'],
        ['lightSpeedIn', '0.7s', '1.9s']
    ],
    [
        ['bounceInDown', '0.5s', 0],
        ['bounceInDown', '0.5s', '0.2s'],
        ['bounceIn', '0.7s', '0.7s'],
        ['flash', '0.7s', '2.1s'],
        ['lightSpeedIn', '0.7s', '1.4s']
    ]
];

// 清除前后 slide 的动画状态
function clearSwiperAnimate(swiper) {
    // 因为 swiper.js 会在前面生成一个最后的 slide，在最后生成一个第1的 slide，所以 swiper.slides.length === 9，所以这里要使用 0 和 8 来判断
    var prevIndex = swiper.activeIndex === 0 ? 8 : swiper.activeIndex - 1,
        nextIndex = swiper.activeIndex === 8 ? 0 : swiper.activeIndex + 1;
    var prevBoxes = Array.prototype.slice.call(swiper.slides[prevIndex].querySelectorAll('.ani')),
        nextBoxes = Array.prototype.slice.call(swiper.slides[nextIndex].querySelectorAll('.ani')),
        boxes = prevBoxes.concat(nextBoxes);
    for (var i = 0, boxesLen = boxes.length; i < boxesLen; i++) {
        if (boxes[i].attributes['style']) {
            boxes[i].attributes['style'].value = 'hidden';
        }
        boxes[i].className = 'ani resize';
    }
}

function swiperAnimate(swiper) {
    // 清除前后 slide 的动画状态
    clearSwiperAnimate(swiper);

    var activeIndex = swiper.activeIndex,
        trueIndex,
        b = swiper.slides[activeIndex].querySelectorAll('.ani'),
        style,
        effect,
        duration,
        delay;
    if (activeIndex === 8) {
        trueIndex = 1;
    } else if (activeIndex === 0) {
        trueIndex = 7;
    } else {
        trueIndex = activeIndex;
    };
    for (var i = 0, bLen = b.length; i < bLen; i++) {
        b[i].style.visibility = 'visible';
        effect = animateParas[trueIndex-1][i][0];
        b[i].className += ' animated '+ effect;
        style = b[i].attributes['style'].value;
        duration = animateParas[trueIndex-1][i][1];
        delay = animateParas[trueIndex-1][i][2];
        style += 'animation-duration:' + duration + ';-webkit-animation-duration:' + duration + ';' + 'animation-delay:' + delay + ';-webkit-animation-delay:' + delay + ';';
        b[i].setAttribute('style', style);
    }
}

var scaleW = window.innerWidth/320,
    scaleH = window.innerHeight/480,
    resizes = document.querySelectorAll('.resize');

(function() {
    for (var j=0, resizesLen = resizes.length; j<resizesLen; j++) {
        resizes[j].style.width = parseInt(resizes[j].style.width)*scaleW+'px';
        resizes[j].style.height = parseInt(resizes[j].style.height)*scaleH+'px';
        resizes[j].style.top = parseInt(resizes[j].style.top)*scaleH+'px';
        resizes[j].style.left = parseInt(resizes[j].style.left)*scaleW+'px';
    }
})();

var mySwiper = new Swiper ('.swiper-container', {
    direction: 'vertical',
    loop: true,

    // 如果需要前进后退按钮
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    onSlideChangeEnd: function(swiper) {
        swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
    }
});

var swiperSlide4 = document.getElementsByClassName('swiper-slide-4')[0];
var commentsBoxes = swiperSlide4.getElementsByClassName('comments-click'),
    mask = swiperSlide4.getElementsByClassName('mask')[0];

swiperSlide4.addEventListener('click', function(e) {
    var target = e.target;

    switch (target.className) {
        case 'btn btn-1':
            (function() {
                commentsBoxes[0].style.left = '0px';
                mask.classList.remove('maskmoveout');
                mask.classList.add('maskmovein');
            })();
            break;
        case 'btn btn-2':
            (function() {
                commentsBoxes[1].style.left = '0px';
                mask.classList.remove('maskmoveout');
                mask.classList.add('maskmovein');
            })();
            break;
        case 'btn-close':
            (function() {
                mask.classList.remove('maskmovein');
                mask.classList.add('maskmoveout');
                for (var i = 0, commentsBoxesLen = commentsBoxes.length; i < commentsBoxesLen; i++) {
                    commentsBoxes[i].style.left = '-750px';
                }
            })();
            break;
        default:
            break;
    }
});

})();
