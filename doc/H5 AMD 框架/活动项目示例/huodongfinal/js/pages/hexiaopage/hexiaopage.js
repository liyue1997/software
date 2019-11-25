define(function(require) {
    var Base = require('page/Base'),
        controller = require('../BaseController'),
        template = require('text!./hexiaopage.html');
        require('css!./hexiaopage.css');
    /**
     * 对外暴露函数，用于视图加载
     */
    var load = function() {
        render();//元素加载进来
        bind();//绑定元素 处理事件
        run();//运行
    };
    /**
     * 视图渲染
     */
    
	var containterbox;
    function render() {
        //controller.setTemplate(template);
        //controller.render(Base.getViewContainer());
        console.log("render");
        this.$dom = $("body");
		//console.log(self.$dom[0].id);
		containterbox = self.$dom[0].id;
		this.$dom.append(template);
        
        var codenumber = localStorage.getItem('payorder');
        $("#xx_payorder").text(codenumber);
        var barcode = document.getElementById("make128code"),
		     options = {
				width: 2,
				textAlign: "center",	
				format: "CODE128",
				displayValue: true,
				fontSize: 18
			};
		JsBarcode(barcode, codenumber, options); 
		
		$(".view-container").hide();
    }
    /**
     * 事件绑定
     */
    function bind() {
        $('#xx_backtohuodongbtn').on('click',function () {
//            location.hash = "#huodong";
               console.log("xx_backtohuodongbtn click");
               
		       $("#hexiaobaoming").remove();
		       $(".view-container").show();
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