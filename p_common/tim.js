define(function(require) {
	var justep = require("$UI/system/lib/justep");

	var IM = require("$UI/p_common/base/js/im");
	var IMWex5Impl = require("$UI/p_common/wex5/js/im.wex5.impl");
	var store = require('$UI/system/lib/base/store');
	var MD5 = require('$UI/system/lib/base/md5');
	var md5 = new MD5();
	var tbase= require("$UI/p_common/tbase");
	var Push = require("$UI/system/lib/base/push");

	
	var tim = function() {
		
	};

	tim.prototype.iminit=function(self)
	{
		new IMWex5Impl(self);
		
		if (tbase.getuserid_nocheck()!=="0")
		{
			var imuid=localStorage.getItem("imuid");
			var nick=localStorage.getItem("username");
		      this.imlogin(imuid,nick,function(){
                   tbase.showdebug("IM ok");
   				localStorage.setItem("imloginok", "1");
   				console.log("imloginok",localStorage.getItem("imloginok"));
                 //hcr 添加推送相关, 当前先不验证用户名和密码, 代码逻辑有点不对： 登录在这里做，但退出在wex5的退出中实现
           		Push.init(IM.getCurrentPersonID(), null);

           		//hcr 点推送通知时，打开相应的会话
           		Push.on("onMessage", function(event){
           			//if (event.message.e && event.message.e.peerId && event.message.e.peerType){
           			//	var id = event.message.e.peerId * 1;
           			//	var type = (event.message.e.peerType==1)? "user" : "group";
           				//justep.Shell.fireEvent("onSendMessagePage", {id: id, type: type});					
           			//}
           			tbase.showinfo("你收到一条消息，请注意");
           		});
		          
		      });
		}
	};
	
	tim.prototype.imlogin=function(imuid,username,success)
	{
		 var urlParams = {};
			urlParams.username =imuid; //window.impre+localStorage.getItem("userid");// 为了支持360急速浏览器,
			urlParams.nick=	username;										// 自动设置参数的情况
			urlParams.password = "123456";// 同上
			urlParams.password = md5.hex_md5_salt(urlParams.password);
			urlParams.loginDate = justep.Date.toString(new Date(), 'yyyy-MM-dd');
			//var client = this.getContext().getRequestParameter('client');
			//if (client)
			//	urlParams.client = client;

			var self = this;
			IM.login(urlParams, this).done(function(data) {
				tbase.showdebug("IM 注册成功");
				//alert("ok");
				this.loginActorDfd = IM.loginActor();
				this.loginActorDfd.done(function() {
					
					tbase.showdebug("登录成功"+IM.getCurrentPerson().uid);
					success();
				}).fail( function(error) {
					alert(error);
				});
			}).fail( function(error) {
				alert(error);
			});
	};
	tim.prototype.startsession=function(uid,success)
	{
		//var curPeer = IM.getUserPeer(uid);
		var person = IM.getPerson(uid);
		IM.regPerson(person).done(function(uid){
		  var  person = IM.getPersonByUID(uid);
		  console.log("person",person);
		  success(  person.uid);
		}).fail(function(error) {
			justep.Util.hint(error);
		});
	};

	tim.prototype.createGroup=function(groupname,success)
	{
		IM.createGroup(groupname, null,  []).then(function(peer) {
			justep.Util.hint('创建成功');
			console.log(peer);
			 success( peer.id);
			//self.getParentModel().button7Click();
		}, function(e) {
			console.log(e);
			justep.Util.hint("创建失败！");
			//self.getParentModel().button7Click();
		});
	};
	tim.prototype.inviteMember=function(gid,uid,success)
	{		
        var invitePerson = function(uid) { 
            var group_id=gid;
            console.log("invitePerson",group_id);
            IM.inviteMember(group_id, uid);   
       }; 
        var person = IM.getPerson(uid);   
        if (typeof person=="undefined"|| person=="undefined")
        	{
        	justep.Util.hint("用户不存在或未登录！");
        	return;
        	}
        
        console.log("person",person);
        IM.regPerson(person).done(invitePerson); 
	};
	tim.prototype.imlogout=function(self)
	{
		localStorage.setItem("imloginok", "0");
		IM.logout();
	};
	
	return new tim();
});