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
    onInit: function(swiper) {
        swiperAnimateCache(swiper); //隐藏动画元素
        swiperAnimate(swiper); //初始化完成开始动画
    },
    onSlideChangeEnd: function(swiper) {
        swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
    },
    // onTransitionEnd: function(swiper) {
    //     swiperAnimate(swiper);
    // },

    // watchSlidesProgress: true,

    // onProgress: function(swiper) {
    //     for (var i = 0; i < swiper.slides.length; i++) {
    //         var slide = swiper.slides[i];
    //         var progress = slide.progress;
    //         var translate = progress * swiper.height / 4;
    //         var scale = 1 - Math.min(Math.abs(progress * 0.5), 1);
    //         var opacity = 1 - Math.min(Math.abs(progress / 2), 0.5);
    //         slide.style.opacity = opacity;
    //         var es = slide.style;
    //         es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(0,' + translate + 'px,-' + translate + 'px) scaleY(' + scale + ')';

    //     }
    // },

    // onSetTransition: function(swiper, speed) {
    //     for (var i = 0; i < swiper.slides.length; i++) {
    //         var es = swiper.slides[i].style;
    //         es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = speed + 'ms';

    //     }
    // }
});
