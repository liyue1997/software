define(function(require){
	//var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var webjs = require("$UI/bcommon/webjs");
	var tbase = require("$UI/bcommon/tbase");

	var Model = function(){
		this.callParent();
	};
	

	Model.prototype.transUrl = function(imgname) {
		return require.toUrl('img/' + imgname);
	};
	
	Model.prototype.sc = function(sc1) {
		 if (sc1 ===1)
		   return this.transUrl("shoucang1.png");
		else
		   return this.transUrl("shoucang0.png");
	};
	
	Model.prototype.image2Click = function(event){
		
	};
	
	
	Model.prototype.modelLoad = function(event){
        this.comp("shopinfo").refreshData();
	};
	
	
	Model.prototype.shopinfoCustomRefresh = function(event){
		   var userid= tbase.getuserid();
	   if (userid === "0")
			return;
        webjs.pushdata("/app/mapshop","queryshops","&userid="+userid,
				function(data){		
			        event.source.loadData(data.data);
			    }		       ,
			    function(info){
			    	tbase.showmsg(info);
				});
	};
	
	
	Model.prototype.div3Click = function(event){

	    var row = event.bindingContext.$object;
		justep.Shell.showPage("shoppage",{shop_id:row.val("shop_id")});
	};
	
	
	return Model;
});