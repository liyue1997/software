define(function(require){
	//var $ = require("jquery");
	//var justep = require("$UI/system/lib/justep");
	var ShellImpl = require('$UI/system/lib/portal/shellImpl');
    window.appname="b2mapshop";
	window.baseurl="$UI/"+ window.appname+"_UI/";
	window.prefix = "http://192.168.0.252:8089/"+ window.appname;
	
	var Model = function(){
		this.callParent();
		this.shellImpl = new ShellImpl(this, {
			contentsXid : "pages",
			pageMappings : {
				"main" : {
					url : require.toUrl('./timMain.w')
				},
				"message" : {
					url : require.toUrl('./base/message.w')
				},
				"talklist" : {
					url : require.toUrl('./talklist.w')
				}
			}
		});
	};

	Model.prototype.modelLoad = function(event){
		this.shellImpl.showPage("main");
	};

	return Model;
});