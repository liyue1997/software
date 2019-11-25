define(function(require){
	//var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	//var webjs = require("$UI/bcommon/webjs");
	//var tbase = require("$UI/bcommon/tbase");
	var TIM = require("$UI/b2mapshop_UI/TalkDemo/tim");
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
			var talklists=[];			
		TIM.getTalklist(function(data){	
			//console.log("getTalklist:",data);
			//console.log("getTalklist:",data[1].groupProfile.name);
			//先循环获取用户信息 （异步过程）
			
			//等待循环获取完毕
			
			//再次循环组装talklists
			
			//最后显示

			for(var i=0;i<data.length;i++){
				var infos1=data[i];
				TIM.getUserinfo(infos1.lastMessage.fromAccount,function(data,info){
				    var infos=info;
					var nameornick=null;
					var lastmsgfrom=null;
					var headimg=null;
					var converid=null;
					lastmsgfrom=data[0].nick;
					if(infos.type==="C2C")
					{	
						converid=infos.userProfile.userID;
						nameornick=infos.userProfile.nick;
						headimg=infos.userProfile.avatar;
					}
					else if(infos.type==="GROUP")
					{ 
						converid=infos.groupProfile.groupID;
						nameornick=infos.groupProfile.name;
					}
					else
					{
						converid="system";
						nameornick="系统通知";
						lastmsgfrom="系统管理员";
					}
					var msgforshow=null;
					var filename=infos.lastMessage.payload.fileName;
					if (filename===null || typeof filename=="undefined"|| filename=="undefined" || filename===""|| filename==="0")
					{
					   msgforshow=infos.lastMessage.messageForShow;
					}
					else
					{
						var msgtype=filename.split(".").pop();
						if(msgtype==="wav"||msgtype==="mp3"||msgtype==="opus"||msgtype==="flac"||msgtype==="weba"||msgtype==="aac"||msgtype==="mid"||msgtype==="oga"||msgtype==="ogg"){
							msgforshow="[语音]";
						}
						else if(msgtype==="mp4"||msgtype==="rmvb"||msgtype==="avi"||msgtype==="flv"||msgtype==="mov"||msgtype==="mkv"||msgtype==="m4v"||msgtype==="avi"||msgtype==="mpg"){
							msgforshow="[视频]";
						}
						else
						    msgforshow=infos.lastMessage.messageForShow;
					}
					
					var today = new Date();
					var lasttime=TIM.transtime(infos.lastMessage.lastTime*1000);
					var time=justep.Date.toString(today, "yyyy/MM/dd") === justep.Date.toString(lasttime, "yyyy/MM/dd") ? justep.Date.toString(lasttime, "hh:mm")
											: justep.Date.toString(lasttime, "yyyy/MM/dd hh:mm");
					if(headimg===null||headimg===""){
						headimg="https://b1common-1259797882.picsh.myqcloud.com/LsShop/c8af3e9e-85f4-4aa9-a67e-a435e8630544.jpg!img100";
					}
			         talklists.push({
							        id:infos.conversationID,
							        type:infos.type,
							        talkName:nameornick,
							        headimg:headimg,
							        lastMsg:msgforshow,
							        lastTime:time,
							        lastFrom:lastmsgfrom,
							        converID:converid,
							        unreadcount:infos.unreadCount
							});
				},infos1);     
			}
			function sleep(ms) {
			  return new Promise(resolve => setTimeout(resolve, ms));
			}
			sleep(1000).then(()=>{
			   //code
			   //console.log("end",talklists);
			   event.source.loadData(talklists);
			});
		    //event.source.loadData(talklists);
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
				justep.Shell.showPage("TIMmessage",{id:userid,pid:teamid,type:type});
					},function(info){});
       }
       if(type==="user"){
           justep.Shell.showPage("TIMmessage",{id:userid,pid:teamid,type:type});
       }
	
	
	};
	return Model;
});