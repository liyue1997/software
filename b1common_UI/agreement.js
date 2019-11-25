define(function(require){
	var justep = require("$UI/system/lib/justep");
	var Model = function(){
		this.callParent();
	};

	Model.prototype.backBtnClick = function(event){
		justep.Shell.closePage();
	};

	return Model;
});