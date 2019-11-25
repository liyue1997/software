define(function(require){
	var justep = require("$UI/system/lib/justep");
	var tbase=require("$UI/p_common/tbase");


	var Model = function(){
		this.callParent();
	};

	Model.prototype.button3Click = function(event){
			var wapUrl;
			if ((localStorage.getItem("downloadlink") === null) || (localStorage.getItem("downloadlink") === ""))
				wapUrl =window.downloadlink;
			else
				wapUrl = localStorage.getItem("downloadlink");

			justep.Shell.showPage("wap", {
				"wapUrl" : wapUrl
			});
	};
    var i=0;
	Model.prototype.button2Click = function(event){
        i=i+1;
        if (i>3)
        {
        	tbase.startdebug();
            justep.Shell.showPage("consolelog");
        }
	};

	Model.prototype.modelLoad = function(event){
          this.comp('button5').set({"label":window.ver });
		
	};

	Model.prototype.btnCheckClick = function(event){
         var env= tbase.getLocalStorage("p_thisenv","");
         if (env=="androidApp")
         {
         this.check();
         }
         else  if (env=="iosApp")
         {
         this.check();
         }
         else
         {
            this.checkbrower();
         }
	};


	Model.prototype.check = function(){
       //  tbase.showmsg("已经是最新版本");
	};
	
	
	
	Model.prototype.checkbrower = function(){
       //  tbase.showmsg("已经是最新版本");
		 
	};
	
	

	return Model;
});