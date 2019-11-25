define(function(require){
	var $ = require("jquery");


	var Model = function(){
		this.callParent();
	};

	Model.prototype.modelParamsReceive = function(event){
     var wapUrl=this.params.wapUrl;
     $(this.getElementByXid("iframe1")).attr("src",wapUrl);
	};

	return Model;
});