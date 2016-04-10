(function() {

window.onload = function() {
    var loadingPage = document.getElementsByClassName('loading')[0];
    (function() {
        loadingPage.style.cssText += 'animation-name: fadeOutDisappear; -webkit-animation-name: fadeOutDisappear; animation-duration: 1s;-webkit-animation-duration: 1s;animation-iteration-count: 1; -webkit-animation-iteration-count: 1';
    })();

    var scaleW = window.innerWidth/320,
        scaleH = window.innerHeight/568,
        widthProp,
        heightProp,
        topProp,
        marginleftProp,
        arrowEle = document.getElementById('arrow');
        console.log(scaleW);
        console.log(scaleH);

        // console.log(window.innerWidth);
        // console.log(window.innerHeight);
        // console.log(window.outerWidth);
        // console.log(window.outerHeight);
        // console.log(document.width);
        // console.log(document.height);
        // console.log(screen.width);
        // console.log(screen.height);
        // console.log(scaleW);
        // console.log(scaleH);


        widthProp = 'width:' + parseInt(window.getComputedStyle(arrowEle).getPropertyValue('width'))*scaleH + 'px;';
        heightProp = 'height:' + parseInt(window.getComputedStyle(arrowEle).getPropertyValue('height'))*scaleH + 'px;';
        topProp = 'top:' + parseInt(window.getComputedStyle(arrowEle).getPropertyValue('top'))*scaleH + 'px;';
        marginleftProp = 'margin-left:' + parseInt(window.getComputedStyle(arrowEle).getPropertyValue('margin-left'))*scaleH + 'px;';
        arrowEle.style.cssText += widthProp + heightProp + topProp + marginleftProp;

    var timeoutId = window.setTimeout(function() {

        loadingPage.style.display = 'none';

        var animateParas = [
            // P1 五星标杆
            [
                // stars
                ['flash', '3s', '1s', 'infinite'],
                ['flash', '3s', '1.2s', 'infinite'],
                ['flash', '3s', '1.4s', 'infinite'],
                ['flash', '3s', '1.6s', 'infinite'],
                // cloud
                ['cloudMove', '6s', '0s', 'infinite'],
                ['cloudMoveSmall', '10s', '1s', 'infinite'],
                // words
                ['fadeInDownSmall', '0.3s', '1.5s', 1],
                ['zoomInFromBig', '0.5s', '1s', 1],
                // penguin
                ['fadeIn', '0.3s', '2.4s', 1],
                ['fadeIn', '0.3s', '2.1s', 1],
                ['fadeIn', '0.3s', '1.8s', 1]
            ],
            // P2 五星员工
            [
                // bg
                ['fadeIn', '0.5s', '0.5s', 1],
                ['fadeIn', '0.5s', '2.1s', 1],
                ['fadeIn', '0.5s', '4.5s', 1],
                // banner
                ['zoomInFromBig', '0.5s', 0, 1],
                // penguin-1
                ['fadeIn', '0.5s', '1s', 1],
                ['fadeInUpSmall', '0.3s', '1.5s', 1],
                ['fadeInUpSmall', '0.3s', '1.8s', 1],
                // penguin-2
                ['fadeIn', '0.5s', '2.6s', 1],
                ['fadeInRightSmall', '0.5s', '3.1s', 1],
                ['fadeInRightSmall', '0.5s', '3.1s', 1],
                ['fadeIn', '0.3s', '3.6s', 1],
                ['fadeInUpSmall', '0.3s', '3.9s', 1],
                ['fadeInUpSmall', '0.3s', '4.2s', 1],
                // penguin-3
                ['fadeInUpSmall', '0.3s', '5s', 1],
                ['fadeInRightSmall', '0.3s', '5.3s', 1],
                ['fadeInUpSmall', '0.3s', '5.6s', 1],
                ['fadeInUpSmall', '0.3s', '5.9s', 1]
            ],
            // P3 五星档案
            [
                // stars
                ['starSlide', '9s', '4s', 'infinite'],
                ['starSlide', '9s', '1.5s', 'infinite'],
                ['starSlide', '9s', '3s', 'infinite'],
                ['starSlide', '9s', '5s', 'infinite'],
                // portrait
                ['fadeInRightBottom', '0.7s', 0, 1],
                ['zoomInFromBig', '0.4s', '0.7s',1],
                ['fadeIn', '0.4s', '1.1s', 1],
                // qqwords
                    // qqwords-bg
                ['fadeIn', '0.5s', '1.5s', 1],
                    // qqwords-penguin
                ['fadeInLeft', '0.3s', '2s', 1],
                    // qqwords-dialog
                ['zoomIn', '0.3s', '2.3s', 1],
                ['fadeIn', '0.3s', '2.6s', 1],

                // svg
                // svg
                // svg

                 // words-1
                ['fadeIn', '0.4s', '2.9s', 1],
                // building
                ['fadeInUpSmall', '0.4s', '3.3s', 1],
                // circle-1
                ['fadeIn', '0.1s', '3.3s', 1],
                // words-2
                ['fadeIn', '0.4s', '3.8s', 1],
                // circle-2
                ['fadeIn', '0.1s', '3.7s', 1],
                // star
                ['tada', '0.4s', '3.2s', 1],
                // circle-3
                ['fadeIn', '0.1s', '4.2s', 1],
                // rocket
                ['fadeInUpSmall', '0.4s', '3.9s', 1],
                // words-3
                ['fadeIn', '0.4s', '5s', 1],
                // circle-4
                ['fadeIn', '0.1s', '5s', 1],
                // svg
                ['lineRun', '2.5s', '3.3s', 1],

                // penguin
                ['fadeIn', '0.5s', '5.6s', 1],
                // stamp
                ['zoomInFromBig', '0.7s', '6.1s', 1]
            ],
            // P4 老大有话说
            [
                // leader-bg
                ['rubberBand', '2s', '1s', 1],
                // leader-bg-light
                ['fadeInAndOutInfinite', '1.2s', '3.4s', 'infinite'],
                // leader-cloud
                ['fadeInAndOut', '0.8s', '0.5s', 1],
                // leader-penguin
                ['fadeInDown', '0.5s', 0, 1],
                // leader-words
                ['bounceInDown', '0.5s', '2.7s', 1],
                // leader-microphone
                ['fadeInUpSmall', '0.5s', '3.2s', 1],
                // comments
                ['fadeInUpSmall', '0.3s', '3.8s', 1],
                ['fadeInUpSmall', '0.3s', '4s', 1]
            ],
            // P5 五星特权
            [
                // penguin-bg
                ['fadeInAndOutInfinite', '1.4s', '1.5s', 'infinite'],
                // penguin-reuse
                ['zoomIn', '0.8s', '0.5s', 1],
                // penguin-words
                ['bounceInDown', '0.5s', 0, 1],
                // gems
                ['fadeIn', '0.4s', '1.3s', 1],
                ['fadeIn', '0.4s', '1.5s', 1],
                ['fadeIn', '0.4s', '1.7s', 1],
                ['fadeIn', '0.4s', '1.9s', 1],
                ['fadeIn', '0.4s', '2.1s', 1],
                // blocks-1
                ['fadeInLeft', '0.3s', '2.6s', 1],
                ['fadeInRightSmall', '0.3s', '2.9s', 1],
                ['fadeIn', '0.2s', '3.2s', 1],
                ['fadeIn', '0.2s', '3.4s', 1],
                // blocks-2
                ['zoomIn', '0.3s', '3.6s', 1],
                ['fadeIn', '0.2s', '3.9s', 1],
                ['fadeIn', '0.2s', '4.1s', 1],
                // blocks-3
                ['fadeIn', '0.3s', '4.3s', 1],
                ['fadeIn', '0.2s', '4.6s', 1],
                ['fadeIn', '0.2s', '4.8s', 1],
                // blocks-4
                ['fadeInUpSmall', '0.3s', '5s', 1],
                ['fadeIn', '0.2s', '5.3s', 1],
                ['fadeIn', '0.2s', '5.5s', 1]
            ],
            // P6 五星邂逅
            [
                // stars
                ['flash', '3s', '1s', 'infinite'],
                ['flash', '3s', '1.2s', 'infinite'],
                ['flash', '3s', '1.4s', 'infinite'],
                ['flash', '3s', '1.6s', 'infinite'],
                // cloud
                ['cloudMove', '6s', '0s', 'infinite'],
                ['cloudMoveSmall', '10s', '1s', 'infinite'],
                // thanks
                ['zoomInDisappear', '2s', '0.2s', 1],
                // words-fighting
                ['fadeInUpSmall', '0.7s', '2.2s', 1],
                // words-meet
                ['zoomInDisappear', '2s', 0, 1],
                // penguin-reuse
                ['zoomIn', '0.7s', '0.4s', 1]
            ]
        ];

        // 清除前后 slide 的动画状态
        function clearSwiperAnimate(swiper) {
            // 因为 swiper.js 会在前面生成一个最后的 slide，在最后生成一个第1的 slide，所以 swiper.slides.length === 9，所以这里要使用 0 和 8 来判断
            var prevIndex = swiper.activeIndex === 0 ? 7 : swiper.activeIndex - 1,
                nextIndex = swiper.activeIndex === 7 ? 0 : swiper.activeIndex + 1;
            var prevBoxes = Array.prototype.slice.call(swiper.slides[prevIndex].querySelectorAll('.ani')),
                nextBoxes = Array.prototype.slice.call(swiper.slides[nextIndex].querySelectorAll('.ani')),
                boxes = prevBoxes.concat(nextBoxes);
            for (var i = 0, boxesLen = boxes.length; i < boxesLen; i++) {
                boxes[i].style.cssText = 'hidden';
                if (boxes[i].tagName === 'path') {
                    boxes[i].className.baseVal = 'ani resize';
                } else {
                    boxes[i].className = 'ani resize';
                }
            }
            var resizeBoxes = document.getElementsByClassName('resize');
            for (var j = 0; j < resizeBoxes.length; j++) {
                // svg 和 path 的 className 都不太一样，另外这里要把箭头也去掉
                if ((resizeBoxes[j].className === 'resize' || resizeBoxes[j].className.baseVal === 'resize') && resizeBoxes[j].id !== 'arrow') {
                    resizeBoxes[j].style.cssText = 'hidden';
                }
            }
        }

        function swiperAnimate(swiper) {
            // 清除前后 slide 的动画状态
            clearSwiperAnimate(swiper);

            var activeIndex = swiper.activeIndex,
                trueIndex,
                b = swiper.slides[activeIndex].querySelectorAll('.ani'),
                resizeBoxes = swiper.slides[activeIndex].querySelectorAll('.resize'),
                effect,
                duration,
                iteration,
                delay;
            // 还是因为 swiper.js 在前后多生成一个 slide 的原因
            if (activeIndex === 7) {
                trueIndex = 1;
            } else if (activeIndex === 0) {
                trueIndex = 6;
            } else {
                trueIndex = activeIndex;
            }

            // 因为标有 .ani 和 .resize 的元素不是完全匹配的，所以这里要分两步处理
            for (var j = 0, resizeBoxesLen = resizeBoxes.length; j < resizeBoxesLen; j++) {
                widthProp = 'width:' + parseInt(window.getComputedStyle(resizeBoxes[j]).getPropertyValue('width'))*scaleH + 'px;';
                heightProp = 'height:' + parseInt(window.getComputedStyle(resizeBoxes[j]).getPropertyValue('height'))*scaleH + 'px;';
                topProp = 'top:' + (parseInt(window.getComputedStyle(resizeBoxes[j]).getPropertyValue('top'))*scaleH) + 'px;';
                marginleftProp = 'margin-left:' + parseInt(window.getComputedStyle(resizeBoxes[j]).getPropertyValue('margin-left'))*scaleH + 'px;';
                resizeBoxes[j].style.cssText += widthProp + heightProp + topProp + marginleftProp;
            }

            for (var i = 0, bLen = b.length; i < bLen; i++) {
                b[i].style.visibility = 'visible';
                effect = animateParas[trueIndex-1][i][0];
                if (b[i].tagName === 'path') {
                    b[i].className.baseVal += ' animated '+ effect;
                } else {
                    b[i].className += ' animated '+ effect;
                }
                duration = animateParas[trueIndex-1][i][1];
                delay = animateParas[trueIndex-1][i][2];
                iteration = animateParas[trueIndex-1][i][3];
                b[i].style.cssText += 'animation-duration:' + duration + ';-webkit-animation-duration:' + duration + ';' + 'animation-delay:' + delay + ';-webkit-animation-delay:' + delay + ';' + 'animation-iteration-count:' + iteration + ';-webkit-animation-iteration-count:' + iteration;
            }




        }

        var mySwiper = new Swiper ('.swiper-container', {
            direction: 'vertical',
            loop: true,

            // 如果需要前进后退按钮
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            onSlideChangeEnd: function(swiper) {
                swiperAnimate(swiper); //每个slide切换结束时运行当前slide动画
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
    }, 1000);

};

})();
