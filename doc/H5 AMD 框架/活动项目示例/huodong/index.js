requirejs.config({
    baseUrl: 'js',
	map : {
		'*':{
			'css':'lib/css.min'
		}
	},
    paths: {
        jquery: 'lib/jquery-3.4.1.min',
        text:'lib/text',
        tbase:'lib/tbase',
        webjs:'lib/webjs',
        page: 'pages',
        compents: 'compents',
        
        
        xxDshow:'compents/xx_Dshow/xx_Dshow_0.9'
    }
});
window.serverUrl="http://www.xinxingtech.com.cn/";
//window.serverUrl="http://192.168.0.252:8089/ceshi/";
require(   ['page/main'], function() {
     
	
});
//,"page/ShopInfo","page/HuodongInfo"