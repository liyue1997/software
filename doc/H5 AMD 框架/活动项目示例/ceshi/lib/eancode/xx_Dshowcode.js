var JsBarcode;
require(['JsBarcode'], function(JsBarcode) {
	JsBarcode = JsBarcode;
});
define(function(require) {
	var xx_Dshowcode = function() {

	};
	//var xx_Dshowweixin = require("xx_Dshowweixin");

	xx_Dshowcode.prototype.initcode = function(order) {
		/*条码*/
		var codenumber = xx_Dshowweixin.getUrlParam('PayOrder');
		$('#codeMsg').innerText = codenumber;
		var barcode =$("#make128code"),
			options = {
				width: 2,
				textAlign: "center",	
				format: "CODE128",
				displayValue: true,
				fontSize: 18
			};
		JsBarcode(barcode, codenumber, options); 
	};
	//点击出示核销码
	xx_Dshowcode.prototype.tohexiao = function(order) {
		console.log("tohexiao", order);
		window.location.href = "http://www.xinxingtech.com.cn/huodong/eancode.html?PayOrder=" + order;
	};
	xx_Dshowcode.prototype.returnbtn=function(){
		window.location.href = document.referrer;
	}

	return new xx_Dshowcode();
});