define(function(require) {
    var Base = require('page/Base'),
        controller = require('../BaseController'),
        template = require('text!./hexiaopage.html');
        require('css!./hexiaopage.css');
    /**
     * 对外暴露函数，用于视图加载
     */
    var load = function() {
        render();
        bind();
        run();
    };
    /**
     * 视图渲染
     */
    function render() {
        controller.setTemplate(template);
        controller.render(Base.getViewContainer());
        var codenumber = localStorage.getItem('payorder');
        var barcode = document.getElementById("make128code"),
		     options = {
				width: 2,
				textAlign: "center",	
				format: "CODE128",
				displayValue: true,
				fontSize: 18
			};
		JsBarcode(barcode, "1573692578088", options); 
    }
    /**
     * 事件绑定
     */
    function bind() {
        $('#xx_backtohuodongbtn').on('click',function () {
              location.hash = "#huodong";
        });
    }
    /**
     * 除事件绑定
     */
    function run() {
    	
        var xx_hexiaocode=localStorage.getItem("payorder");      
        console.log("code",xx_hexiaocode);
		/*条码*/
		$('#xx_payorder').innerText = xx_hexiaocode;
//		var barcode =$("#make128code"),
//		options = {
//				width: 2,
//				textAlign: "center",	
//				format: "CODE128",
//				displayValue: true,
//				fontSize: 18
//			};
//		JsBarcode(barcode, "1573692578088", options); 
	
    }
    return {
        load: load
    };
});