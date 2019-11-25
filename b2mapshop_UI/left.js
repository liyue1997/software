define(function(require){
	//var $ = require("jquery");
	require("curcheck");
	var justep = require("$UI/system/lib/justep");
	var tbase = require("$UI/bcommon/tbase");
	var curtool = require("curtool");
	var self=null;
	var Model = function(){
		this.callParent();
		self=this;
		this.username=justep.Bind.observable(tbase.getLocalStorage("username"),"未登录");
		this.debugmode=justep.Bind.observable(window.ver);
	};
	
	Model.prototype.getValue= function(key,defaultvalue)
	{
	    return  tbase.getLocalStorage(key,defaultvalue);
	};

	Model.prototype.row7Click = function(event){
	    var userid = tbase.getuserid();
		if (userid === "0")
			return;
        curtool.logout();
       
	};
	Model.prototype.getlogintext = function(){
	    if (tbase.islogin())
	       return "退出登录";
	    else
	       return "登录";
       
	};

	Model.prototype.row3Click = function(event){
		var userid = tbase.getuserid();
		if (userid === "0")
			return;
		justep.Shell.showPage("shoucang");
	};


	Model.prototype.row4Click = function(event){
		var userid = tbase.getuserid();
		if (userid === "0")
			return;
		justep.Shell.showPage("shoucang");
	};

	Model.prototype.row2Click = function(event){
		var userid = tbase.getuserid();
		if (userid === "0")
			return;
	      //组队信息
		  justep.Shell.showPage("zuduimsg",{tag:0});
	};

	Model.prototype.row5Click = function(event){
		var userid = tbase.getuserid();
		if (userid === "0")
			return;
		  justep.Shell.showPage("zuduimsg",{tag:2});
	};

	Model.prototype.row6Click = function(event){
		var userid = tbase.getuserid();
		if (userid === "0")
			return;
		   justep.Shell.showPage("setting",{funbak:this.refreshMe});
	};
	Model.prototype.refreshMe = function(event){
	    console.log("refreshMe","left");
        self.username.set(tbase.getLocalStorage("username"));
	};

	Model.prototype.modelActive = function(event){
	    console.log("modelActive","left");
        self.username.set(tbase.getLocalStorage("username"));
	};

	Model.prototype.row1Click = function(event){
		var userid = tbase.getuserid();
		if (userid === "0")
			return;
		   justep.Shell.showPage("setting",{funbak:this.refreshMe});
	};
	
		var timer=null;
		var clickcount=0;
	Model.prototype.row8Click = function(event){
		clickcount++;
		console.log("点击了"+clickcount+"次");
		timer=setTimeout(function(){
			clickcount=0;//超时清零
		},5000);
		if(clickcount===5){
		    clickcount=0;//计数清零
		    clearTimeout(timer);//计时器清0
			justep.Shell.showPage("debugpage");
		}
	};


	return Model;
});