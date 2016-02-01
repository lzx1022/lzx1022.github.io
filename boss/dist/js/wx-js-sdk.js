
// QQFun

(function() {
    wx.ready(function() {
        var shareTitle = "经典不是一成不变，这一次I'M NOT CUTE！";
        var shareDesc = "二八年华，笑容可掬的企鹅成为时代印记，能否让成长更具挑战？QQ黑白纯色限定版，正式推出！";
        var shareLink = window.location.href;
        var shareImg = 'http://imagecache.ss.qq.com/act/TEG/qqfun/images/wx.jpg';

        // 分享给朋友事件绑定
        wx.onMenuShareAppMessage({
            title: shareTitle,
            desc: shareDesc,
            link: shareLink,
            imgUrl: shareImg,
            success: function () {
                showIframe('share.html',0,0);
            }
        });

        // 分享到朋友圈
        wx.onMenuShareTimeline({
            title: shareTitle,
            link: shareLink,
            imgUrl: shareImg,
            success: function () {
                showIframe('share.html',0,0);
            }
        });

        // 分享到QQ
        wx.onMenuShareQQ({
            title: shareTitle,
            desc: shareDesc,
            link: shareLink,
            imgUrl: shareImg
        });

        // 分享到微博
        wx.onMenuShareWeibo({
            title: shareTitle,
            desc: shareDesc,
            link: shareLink,
            imgUrl: shareImg
        });
    });

    var cUrl = window.location.href.replace(window.location.hash, '');
    $.ajax({
        url: 'http://5minute.cdc.qq.com/wxjssdk-signature/sign.php',
        type: 'GET',
        data: {url: cUrl},
        dataType: 'jsonp',
        success: function(res) {
            wx.config({
                    debug: false,
                    appId: res.data.appId,
                    timestamp: res.data.timestamp,
                    nonceStr: res.data.nonceStr,
                    signature: res.data.signature,
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'onMenuShareQZone'
                    ]
            });
        }
    });

    function showIframe(url){
        $("<iframe width='0' height='0' id='YuFrame1' name='YuFrame1' style='position:absolute;z-index:4;'  frameborder='no' marginheight='0' marginwidth='0' allowTransparency='true' style='opacity:0;'></iframe>").prependTo('body');
        $("#YuFrame1").attr("src", url)

    }
})();


// TEG 招聘 - 刘厉

document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    WeixinJSBridge.on('menu:share:appmessage', function() {
        WeixinJSBridge.invoke('sendAppMessage', {
            "appid": "",
            "img_url": 'http://h5app.qq.com/act/TEG/TEG_recruit3/images/share_teg.jpg',
            "img_width": "120",
            "img_height": "120",
            "link": 'http://h5app.qq.com/act/TEG/TEG_recruit3/',
            "desc": "出发，探索般的冒险之旅；碰撞，超乎你的思维想象；享受，游戏般的科技乐趣。Let's go！",
            "title": '技术之旅，一触即发 - WE ARE TEG'
        }, function(res) {});
        return false;
    });
    WeixinJSBridge.on('menu:share:timeline', function() {
        WeixinJSBridge.invoke('shareTimeline', {
            "appid": "",
            "img_url": 'http://h5app.qq.com/act/TEG/TEG_recruit3/images/share_teg.jpg',
            "img_width": "120",
            "img_height": "120",
            "link": 'http://h5app.qq.com/act/TEG/TEG_recruit3/',
            "desc": "出发，探索般的冒险之旅；碰撞，超乎你的思维想象；享受，游戏般的科技乐趣。Let's go！",
            "title": '技术之旅，一触即发 - WE ARE TEG'
        }, function(res) {});
        return false;
    });
}, false);
