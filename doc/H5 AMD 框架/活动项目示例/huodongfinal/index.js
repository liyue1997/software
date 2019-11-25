requirejs.config({
    baseUrl: 'js',
	map : {
		'*':{
			'css':'https://xinxing-1259797882.cos.ap-shanghai.myqcloud.com/js/css.min.js'
		}
	},
    paths: {
        jquery: 'https://xinxing-1259797882.cos.ap-shanghai.myqcloud.com/js/jquery-3.4.1.min',
        text:'https://xinxing-1259797882.cos.ap-shanghai.myqcloud.com/js/text',
        tbase:'lib/tbase',
        webjs:'lib/webjs',
        webpost:'lib/webpostjs',
        
        page: 'pages',
        compents: 'compents',
        
        wx:'http://res.wx.qq.com/open/js/jweixin-1.4.0',
		/*微信JS-SDK*/
		gcoord:'https://unpkg.com/gcoord/dist/gcoord',
        xxDshow:'compents/xx_Dshow/xx_Dshow_0.9',
        xxChepai:'compents/xx_Chepai/xx_Chepai'
    }
});
//window.serverUrl="http://192.168.0.252:8089/ceshi/";

window.serverUrl="http://www.xinxingtech.com.cn/";
window.prefix="http://www.xinxingtech.com.cn/b4huodong";
//window.prefix="http://127.0.0.1:8089/b4huodong";
require(   ['page/main'], function() {
	
});
//,"page/ShopInfo","page/HuodongInfo"