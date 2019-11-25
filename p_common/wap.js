define(function(require){
	var $ = require("jquery");


	var Model = function(){
		this.callParent();
	};

	Model.prototype.modelParamsReceive = function(event){
     var wapUrl=this.params.wapUrl;
     console.log(wapUrl);
     $(this.getElementByXid("iframe1")).attr("src",wapUrl);
	};

	Model.prototype.button1Click = function(event){
        this.close();
	};

	return Model;
});