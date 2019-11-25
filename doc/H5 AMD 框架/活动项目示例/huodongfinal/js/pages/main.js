define(['jquery','tbase',
"https://xinxing-1259797882.cos.ap-shanghai.myqcloud.com/js/layer.js",
'css!https://xinxing-1259797882.cos.ap-shanghai.myqcloud.com/js/layer.css',
'https://xinxing-1259797882.cos.ap-shanghai.myqcloud.com/js/JsBarcode.code128.min.js','wx'], function($,tbase) {
    $(function() {
//	require();
//      if(location.hash =="#login"){
//          loads(hashToPath('login'));
//      }else{
//          location.hash = "#login";
//      }
 //         location.hash = "#PicsDy";
 //       loads(hashToPath("#login"));
       location.hash = "#weixinlogin";
       //tbase.showmsg("开始登陆");
       //location.hash = "#huodong";
        /*
         监听hashchange切换view
         */
        $(window).on('hashchange', function (e) {
            var hash = location.hash;
            console.log("hashchange",location.hash);
            if(hash.indexOf('_') !== -1){
                hash = hash.substring(0, hash.indexOf('_'));
            }
            loads(hashToPath(hash));

        });
        function hashToPath(hash) {
            if (hash.indexOf('#') !== -1) {
                hash = hash.substring(1);
            }
            return 'page/' + hash + '/' + hash;
        }
        function loads(path) {
            require([path], function(view) {
            	
                view.load();
            });
        }
    });
});