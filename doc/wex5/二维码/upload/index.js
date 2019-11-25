define(function(require){
	//var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var ShellImpl = require('$UI/system/lib/portal/shellImpl');
	var COS=require("./js/cos-js-sdk-v5.min");
	require("cordova!com.phonegap.plugins.barcodescanner");
	
	var Model = function(){
		this.callParent();
		this.shellImpl = new ShellImpl(this, {
			contentsXid : "pages",
			pageMappings : {
				"main" : {
					url : require.toUrl('./mainActivity.w')
				},
				"scanner" : {
					url : require.toUrl('./scanner.w')
				}
			}
		});
	};

	Model.prototype.modelLoad = function(event){
		this.shellImpl.showPage("main");
	};

	return Model;
});