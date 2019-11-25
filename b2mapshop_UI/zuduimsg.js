define(function(require){
	//var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var webjs = require("$UI/bcommon/webjs");
	var tbase = require("$UI/bcommon/tbase");
	var mapshoptool=require("mapshoptool");
	
	var Model = function(){
		this.callParent();
		//this.curtag=justep.Bind.observable("all");
		console.log("zuduimsg create");	
	};
	
/*	Model.prototype.pagetitle = function(){
	    if ()
	       return "组队信息";
	    else
	       return "待评价";
       
	};*/
	
	Model.prototype.transUrl = function(imgname) {
		return require.toUrl('img/' + imgname);
	};	
	
	Model.prototype.modelActive = function(event){
	   console.log("modelActive","1");
       //this.comp("zuduidata").refreshData();
       //取得当前显示的页然后刷
       
	};	
	
	Model.prototype.showheads = function(row){
		return mapshoptool.showuserheads(row);
	};	
	
	Model.prototype.getusersinfo = function(row) {
	    return  mapshoptool.getteamusersinfo(row);
	};
	
	Model.prototype.getlefttime = function(row) {
		
	    return  mapshoptool.getlefttime(row,1);

	};

	Model.prototype.getlefttimecss = function(row) {
		
	    return  mapshoptool.getlefttimecss(row,1);
		
	};
	
	Model.prototype.div4Click = function(event){
        
	    var row = event.bindingContext.$object;
        justep.Shell.showPage("talk",{teamid:row.val("team_id")});
	};
	
	Model.prototype.modelLoad = function(event){
	    
        console.log("this.params.tag",this.params.tag);
        if (this.params.tag)
        {
           this.comp("contents2").to(this.params.tag*1);
        } 
        else
           this.comp("contents2").to(0);
           
	};
	
	Model.prototype.contentsActiveChange = function(event) {
	    console.log(event.to);
		switch (event.to) {
			case 0:
				this.comp("alldata").refreshData();
				break;
			case 1:
				this.comp("runningdata").refreshData();
				break;
			case 2:
				this.comp("creditsdata").refreshData();
				break;
			case 3:
				this.comp("finishdata").refreshData();
				break;
			case 4:
				this.comp("quxiaodata").refreshData();
				break;
		}
	};
	
	Model.prototype.loaddata = function(event,where){
		var userid= tbase.getuserid();
			   if (userid === "0")
					return;
       webjs.pushdata("/app/mapshop","queryteams_user","&userid="+userid+where,
				function(data){		
			        event.source.loadData(data.data);	
			    },
			    function(info){
			    	tbase.showmsg(info);
				});
	};
	
	Model.prototype.allCustomRefresh = function(event){
	    this.loaddata(event, "");
	};
	
	Model.prototype.runningCustomRefresh = function(event){
        this.loaddata(event, "&isvalided=1&iscancle=0&valid_date=1");
	};
	
	Model.prototype.creditsCustomRefresh = function(event){
       this.loaddata(event, "&isvalided=0&iscancle=0&shop_credits=1");
	};
	
	Model.prototype.finishCustomRefresh = function(event){
       this.loaddata(event, "&isvalided=0&iscancle=0");

	};
	
	Model.prototype.quxiaoCustomRefresh = function(event){
       this.loaddata(event, "&iscancle=1");

	};
	
	return Model;
});