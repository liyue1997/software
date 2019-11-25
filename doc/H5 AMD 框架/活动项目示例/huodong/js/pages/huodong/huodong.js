define(function(require) {
    var $=require("jquery"),
       Base = require('page/Base'),
        controller = require('page/BaseController'),
        template = require('text!./huodong.html')
        ,xx_Dshow=require('xxDshow')
        ,tbase=require('tbase')
        ;
        
        require('css!./huodong.css');
        
        
    /**
     * 对外暴露函数，用于视图加载
     */
    var load = function() {
        render();
       // $(function (){
	        bind();
	        run();
       // });

    };
    

    /**
     * 视图渲染
     */
    function render() {
        controller.setTemplate(template);
        controller.render(Base.getViewContainer());
        /*轮播图*/
		var options = {
//			elem: '#carousel',
            root:"#xx_PicsDy",
			anim: 'fade',
			delay: 2000,
			/*传入图片地址数组*/
			piclist: ["https://b1common-1259797882.cos.ap-shanghai.myqcloud.com/HdHuodong/c5d6d568-192c-440b-a6c1-756c48d2fbe6.jpg",
				"https://b1common-1259797882.cos.ap-shanghai.myqcloud.com/HdHuodong/fe32a0e3-5944-4148-a0e4-74786595a390.jpg"
			]
		};
		xx_Dshow.init(options);
		/*车牌*/
		var Chepai = {
			root: '#xx_compChepai',
		};
		xx_chepai.init(Chepai);
        /*shopinfo*/
       
       
    }
    /**
     * 事件绑定
     */
    function bind() {
    	$("#xx_baomingbtn").click(function() {
       	    //location.hash = "main";
       	    tbase.showmsg("报名开始");
       });
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