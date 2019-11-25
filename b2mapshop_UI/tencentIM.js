define(function(require){
	var $ = require("jquery");
	//var justep = require("$UI/system/lib/justep");
	var tbase = require("$UI/bcommon/tbase");
	var curtool = require("curtool");
	
	var Model = function(){
		this.callParent();
		this.teamid = justep.Bind.observable("");
		this.talkroomtitle= justep.Bind.observable("");
	};

	Model.prototype.modelLoad = function(event){
		this.talkroomtitle.set(this.params.discount_name);
		this.teamid.set(this.params.teamid);
	    var userid= tbase.getuserid();
		if (userid === "0")
			return;
		//http://192.168.0.252:8081/index.html?groupid=13&userid=xx1&creategroup=0&
		//var url="http://192.168.0.252:8081/index.html?groupid="+this.params.teamid+"&userid="+userid+"&creategroup=0&";
		var url="./dist/index.html?groupid="+this.params.teamid+"&userid="+userid+"&creategroup=0&";
		 console.log("IM",url);
		this.getElementByXid("TIMiframe").src=url;
		var lookfor=$(".TIMiframe").contents().find(".text-element-wrapper");
		if(lookfor!==null&&lookfor!=="")
		   console.log("收到消息");
	};

	return Model;
});