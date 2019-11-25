define(function(require){
	//var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	//var webjs = require("$UI/bcommon/webjs");
	//var tbase = require("$UI/bcommon/tbase");
	var TIM = require("tim");
	var webjs=require("$UI/bcommon/webjs");
	var self;
	var Model = function(){
		self=this;
		this.callParent();
	};
	
	Model.prototype.modelLoad = function(event){
        self.comp("talklist").refreshData();
	};
	Model.prototype.modelActive = function(event){
	    console.log("talk list modelActive");
        self.comp("talklist").refreshData();
	};
	
	//未读消息的样式
	Model.prototype.tipshow = function(data){
	    if(data>0)
	    	return true;
	    else
	    	return false;
	};
	
	Model.prototype.shopinfoCustomRefresh = function(event){
		TIM.getTalklist(function(data){
			var talklists=[];		
			var nameornick=null;
			var lastmsgfrom=null;
			var headimg=null;
			var converid=null;
			console.log("getTalklist:",data);
			//console.log("getTalklist:",data[1].groupProfile.name);
			for(var i=0;i<data.length;i++){
				var infos=data[i];
				//console.log(infos);
				//console.log(infos.type);
				if(infos.type==="C2C")
				{	
					converid=infos.userProfile.userID;
					nameornick=infos.userProfile.nick;
					lastmsgfrom=infos.userProfile.nick;
					headimg=infos.userProfile.avatar;
				}
				else if(infos.type==="GROUP")
				{ 
					converid=infos.groupProfile.groupID;
					nameornick=infos.groupProfile.name;	
					TIM.getUserinfo(infos.lastMessage.fromAccount,function(data){
						lastmsgfrom=data[0].nick;
						headimg=data[0].avatar;
					});
				}
				else
				{
					converid="system";
					nameornick="系统通知";
					lastmsgfrom="系统管理员";
				}
				console.log("infos.lastMessage",infos.lastMessage);
				var msgforshow=infos.lastMessage.messageForShow;
				var filename=infos.lastMessage.payload.fileName;
				var index=filename.lastIndexOf(".");
				var msgtype=filename.substr(index+1);//文件后缀
				console.log(msgtype);
				if(msgtype==="wav"){
					msgforshow="[语音]";
				}
		         talklists.push({
						        id:infos.conversationID,
						        type:infos.type,
						        talkName:nameornick,
						        headimg:headimg,
						        lastMsg:msgforshow,
						        lastTime:infos.lastMessage.lastTime,
						        lastFrom:lastmsgfrom,
						        converID:converid,
						        unreadcount:infos.unreadCount
						});
		       
			}
		         //console.log("talklists",talklists);
		          event.source.loadData(talklists);
		});
	};
	
	//点击跳转
	Model.prototype.row1Click = function(event){	
		var type=null;
		var row = event.bindingContext.$object;
		//console.log("talklistdivClick",row);
		var userid=self.params.id;
		var teamid=row.val("converID");
		if (row.val("type")==="GROUP")
		{
			type="group";
		}
		else if(row.val("type")==="C2C")
		{
			type="user";
		}

       if(type==="group"){
    	   webjs.pushdata("app/mapshop","addteam","&userid=" +userid+"&teamid="+teamid+"",function(data){
				justep.Shell.showPage("message",{id:userid,pid:teamid,type:type});
					},function(info){
				});
       }
       if(type==="user"){
           justep.Shell.showPage("message",{id:userid,pid:teamid,type:type});
       }
	
	
	};
	return Model;
});