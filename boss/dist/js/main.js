;(function(win) {
    'use strict';

    win.onload = function() {
        var doc = win.document,
            body = doc.body,
            loading = $('#loading');
            console.log(loading);
        var clickEvent = (document.ontouchstart === null) ? 'click' : 'touchstart';

        var bgMusic = document.querySelector('#bgMusic'),
            bgMusicContr = document.querySelector('#bgMusicContr');

        function $(dom_name) {
            return doc.querySelector(dom_name);
        }

        function addClass(ele, class_name) {
            if (!ele.className.match(class_name)) {
                var old_class = ele.className.split(" ");
                old_class.push(class_name);
                ele.className = old_class.join(" ").trim();
            }
        }

        var controMusic = function(target) {
            if (target.className === 'music') {
                bgMusic.pause();
                target.className = 'music disabled';
            } else {
                bgMusic.play();
                target.className = 'music';
            }
        }
        // var startLoading = function() {
        //     // 进度加载
        //     var loader = new resLoader({
        //         resources: ['./dist/images/teg.png'],
        //         onProgress: function(current, total) {
        //             var percent = parseInt(current / total * 100);
        //             loading_text.innerHTML = percent + '%';
        //             if (percent === 100) {
        //                 setTimeout(function() {
        //                     loading.style.display = "none";
        //                     addClass(body, "loading-done");
        //                 }, 500);
        //             }
        //         }
        //     });
        //     loader.start();
        // }

        addClass(loading, 'loading-done');
        var timeoutId = window.setTimeout(function() {
            loading.style.display = 'none';
        }, 1000);

        FastClick.attach(body);
        bgMusic.play();

        // 背景音乐控制
        bgMusicContr.addEventListener('click', function(e) {
            var target = e.target;
            controMusic(target);
        });

        (function() {
            var videoWraper = document.getElementsByClassName('video')[0],
                videoCover = videoWraper.getElementsByClassName('cover')[0],
                videoBtn = videoCover.getElementsByClassName('cover_play')[0],
                videoEl = videoWraper.getElementsByTagName('video')[0];

            videoBtn.addEventListener('click', function() {
                videoCover.style.display = 'none';
                controMusic(bgMusicContr);
                videoEl.play();
            });
        })();
    }


})(window);
