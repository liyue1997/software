define(function(require){
	//var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
    var curtool = require("curtool");
	var ttool = require("$UI/p_common/tbase");
	var me;
	var Model = function(){
		this.callParent();
		me=this;

		var userid=ttool.getuserid();	 if (userid==="0") return;
		this.tel=justep.Bind.observable(ttool.getLocalStorage("telofpt",""));
		this.username=justep.Bind.observable(ttool.getLocalStorage("username",""));
		this.useraccount=justep.Bind.observable(ttool.getLocalStorage("useraccount",""));
		this.picture=justep.Bind.observable(ttool.getLocalStorage("picture",require.toUrl("$UI/b1common/newimages/shifu.png")));
	};
    Model.prototype.Refreshthis = function(data){
        me.username.set(ttool.getLocalStorage("username",""));
        me.picture.set(ttool.getLocalStorage("picture",require.toUrl("$UI/b1common/newimages/shifu.png")));
	};
	Model.prototype.btnlogoutClick = function(event){
        curtool.logout();
	};

	Model.prototype.row3Click = function(event){
		justep.Shell.showMainPage();
        
	};

	Model.prototype.row7Click = function(event){
        
		justep.Shell.showPage("page_other_updatetpassword");
	};

	Model.prototype.row4Click = function(event){

		justep.Shell.showPage("oilmain");
	};

	Model.prototype.row1Click = function(event){
        var me=this;
		justep.Shell.showPage("mainbasics",{
                backfunction:me.Refreshthis
         });
	};

	Model.prototype.btnaboutClick = function(event){
        var me=this;
		justep.Shell.showPage("about",{
         });
	};
	return Model;
});