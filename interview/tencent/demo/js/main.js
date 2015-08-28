//本插件由www.swiper.com.cn提供
function swiperAnimateCache(){for(allBoxes=window.document.documentElement.querySelectorAll(".ani"),i=0;i<allBoxes.length;i++)allBoxes[i].attributes["style"]?allBoxes[i].setAttribute("swiper-animate-style-cache",allBoxes[i].attributes["style"].value):allBoxes[i].setAttribute("swiper-animate-style-cache"," "),allBoxes[i].style.visibility="hidden"}function swiperAnimate(a){clearSwiperAnimate();var b=a.slides[a.activeIndex].querySelectorAll(".ani");for(i=0;i<b.length;i++)b[i].style.visibility="visible",effect=b[i].attributes["swiper-animate-effect"]?b[i].attributes["swiper-animate-effect"].value:"",b[i].className=b[i].className+"  "+effect+" "+"animated",style=b[i].attributes["style"].value,duration=b[i].attributes["swiper-animate-duration"]?b[i].attributes["swiper-animate-duration"].value:"",duration&&(style=style+"animation-duration:"+duration+";-webkit-animation-duration:"+duration+";"),delay=b[i].attributes["swiper-animate-delay"]?b[i].attributes["swiper-animate-delay"].value:"",delay&&(style=style+"animation-delay:"+delay+";-webkit-animation-delay:"+delay+";"),b[i].setAttribute("style",style)}function clearSwiperAnimate(){for(allBoxes=window.document.documentElement.querySelectorAll(".ani"),i=0;i<allBoxes.length;i++)allBoxes[i].attributes["swiper-animate-style-cache"]&&allBoxes[i].setAttribute("style",allBoxes[i].attributes["swiper-animate-style-cache"].value),allBoxes[i].style.visibility="hidden",allBoxes[i].className=allBoxes[i].className.replace("animated"," "),allBoxes[i].attributes["swiper-animate-effect"]&&(effect=allBoxes[i].attributes["swiper-animate-effect"].value,allBoxes[i].className=allBoxes[i].className.replace(effect," "))}

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
