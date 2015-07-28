//百度统计
var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?208bb4489cd89ccc7e00a0c3077bfdeb";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();


//google analytics
(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o), m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-56953225-1', 'auto');
ga('send', 'pageview');
