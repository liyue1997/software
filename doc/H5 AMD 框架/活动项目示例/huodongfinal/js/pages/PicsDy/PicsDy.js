define(function(require) {
    var $=require("require"),
       Base = require('page/Base'),
        controller = require('../BaseController'),
        template = require('text!./page.html'),
        xx_Dshow=require('./xx_Dshow_0.9');
        
        require('css!./xx_Dshow-1.0.css');
        
        
    /**
     * 对外暴露函数，用于视图加载
     */
    var load = function() {
        render();
        bind();
        run();
    };
    
//  var  viewContainer = null;
//  function getViewContainer(){
//  	return $('#xx_PicsDy');
//  	return viewContainer ? viewContainer : viewContainer = $('#xx_PicsDy')[0];
//  }
    /**
     * 视图渲染
     */
    function render() {
        controller.setTemplate(template);
        controller.render(Base.getViewContainer());
        /*轮播图*/
		var options = {
			elem: '#carousel',
			anim: 'fade',
			delay: 2000,
			/*传入图片地址数组*/
			piclist: ["https://b1common-1259797882.cos.ap-shanghai.myqcloud.com/HdHuodong/c5d6d568-192c-440b-a6c1-756c48d2fbe6.jpg",
				"https://b1common-1259797882.cos.ap-shanghai.myqcloud.com/HdHuodong/fe32a0e3-5944-4148-a0e4-74786595a390.jpg"
			]
		};
		xx_Dshow.init(options);
        
    }
    /**
     * 事件绑定
     */
    function bind() {
    	
    }
    /**
     * 除事件绑定
     */

    function run() {
       // $('.view-container').css('background-image','');
    }
    return {
        load: load
    };
});