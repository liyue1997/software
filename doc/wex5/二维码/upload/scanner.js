define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("./js/jquery.qrcode.min");
	require("$UI/system/lib/cordova/cordova");
	require("cordova!phonegap-plugin-barcodescanner");

	var words=null;
	var Model = function(){
		this.callParent();
	};

	Model.prototype.button1Click = function(event){
		function onSuccess(result){
			alert(result.text);
		}
		function onError(error){
			alert(error);
		}
		justep.barcodeScanner.scan(onSuccess,onError);
	};

	Model.prototype.button2Click = function(event){
		words=this.comp("input1").val();
		$("#createcode").qrcode({
			render:"cancas",
			width:200,
			height:200,
			text:"'"+words+"'"
		});
	};

	Model.prototype.modelLoad = function(event){

	};

	Model.prototype.button3Click = function(event){
		$("table").remove();
	};

	return Model;
});