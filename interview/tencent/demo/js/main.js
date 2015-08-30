(function() {

// 清除前后 slide 的动画状态
function clearSwiperAnimate(swiper) {
    // 因为 swiper.js 会在前面生成一个最后的 slide，在最后生成一个第1的 slide，所以 swiper.slides.length === 9，所以这里要使用 0 和 8 来判断
    var prevIndex = swiper.activeIndex === 0 ? 8 : swiper.activeIndex - 1,
        nextIndex = swiper.activeIndex === 8 ? 0 : swiper.activeIndex + 1;
    var prevBoxes = Array.prototype.slice.call(swiper.slides[prevIndex].querySelectorAll('.ani')),
        nextBoxes = Array.prototype.slice.call(swiper.slides[nextIndex].querySelectorAll('.ani')),
        boxes = prevBoxes.concat(nextBoxes);
    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].attributes['style']) {
            boxes[i].attributes['style'].value = 'hidden';
        }
        boxes[i].className = 'ani resize';
    }
}

function swiperAnimate(swiper) {
    // 清除前后 slide 的动画状态
    clearSwiperAnimate(swiper);

    var b = swiper.slides[swiper.activeIndex].querySelectorAll('.ani'),
        style,
        effect,
        duration,
        delay;
    for (var i = 0; i < b.length; i++) {
        b[i].style.visibility = 'visible';
        effect = b[i].attributes['swiper-animate-effect'] ? b[i].attributes['swiper-animate-effect'].value : '';
        b[i].className += ' animated '+ effect;
        style = b[i].attributes['style'].value;
        duration = b[i].attributes['swiper-animate-duration'] ? b[i].attributes['swiper-animate-duration'].value : '';
        delay = b[i].attributes['swiper-animate-delay'] ? b[i].attributes['swiper-animate-delay'].value : '';
        style += 'animation-duration:' + duration + ';-webkit-animation-duration:' + duration + ';' + 'animation-delay:' + delay + ';-webkit-animation-delay:' + delay + ';';
        b[i].setAttribute('style', style);
    }
}

var scaleW = window.innerWidth/320,
    scaleH = window.innerHeight/480,
    resizes = document.querySelectorAll('.resize');

(function() {
    for (var j=0; j<resizes.length; j++) {
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
var commentsBoxs = swiperSlide4.getElementsByClassName('comments-click'),
    mask = swiperSlide4.getElementsByClassName('mask')[0];

swiperSlide4.addEventListener('click', function(e) {
    var target = e.target;

    switch (target.className) {
        case 'btn btn-1':
            (function() {
                commentsBoxs[0].style.left = '0px';
                mask.style.left = '0px';
            })();
            break;
        case 'btn btn-2':
            (function() {
                commentsBoxs[1].style.left = '0px';
                mask.style.left = '0px';
            })();
            break;
        case 'btn-close':
            (function() {
                mask.style.left = '-500px';
                for (var i = 0; i < commentsBoxs.length; i++) {
                    commentsBoxs[i].style.left = '-750px';
                }
            })();
            break;
        default:
            break;
    }
});

})();
