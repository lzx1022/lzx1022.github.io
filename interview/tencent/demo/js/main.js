;(function() {

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
    }
});

var swiperSlide4 = document.getElementsByClassName('swiper-slide-4')[0];
var commentsBox = swiperSlide4.getElementsByClassName('comments-click-1')[0],
    mask = swiperSlide4.getElementsByClassName('mask')[0],
    commentsBoxs = swiperSlide4.getElementsByClassName('comments-click');

swiperSlide4.addEventListener('click', function(e) {
    var target = e.target;

    switch (target.className) {
        case 'btn btn-1':
            (function() {
                commentsBox.style.left = '0px';
                mask.style.left = '0px';
            })();
            break;
        case 'btn btn-2':
            (function() {
                commentsBox.style.left = '0px';
                mask.style.left = '0px';
            })();
            break;
        case 'btn-close':
            (function() {
                mask.style.left = '-320px';
                for (var i = 0; i < commentsBoxs.length; i++) {
                    commentsBoxs[i].style.left = '-600px';
                }
            })();
            break;
        default:
            break;
    }
});


})();
