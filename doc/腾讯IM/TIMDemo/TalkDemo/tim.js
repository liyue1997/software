define(function(require) {
    var TIM = require("$UI/TalkDemo/TIM/tim-js");
    var COS = require("$UI/TalkDemo/TIM/cos-js-sdk-v5");
    var webjs=require("$UI/bcommon/webjs");
	var justep = require("$UI/system/lib/justep");
    var tim;
    var self;
	var timtalk = function() {
		self=this;
		//console.log("timtalk","create");
		//self.TYPES = TIM.TYPES;
	};

	//消息回传给应用处理
	//var handMsgReceivedfuntion=null;
	//getMyProfile 获取自己的信息  获取后可以写入  localStorage.setItem("userid", data.userid);
	//getUserProfile  获取用户信息
	//getGroupProfile 获取群组信息
	 // 打开某个会话时，设置成已读
    timtalk.prototype.getMyinfo=function(){
    	var promise = tim.getMyProfile();
    	promise.then(function(imResponse) {
    	  //console.log("getMyinfo:",imResponse.data); // 个人资料 - Profile 实例
    	  localStorage.setItem("imusernick", imResponse.data.nick);
    	  localStorage.setItem("imuseravatar", imResponse.data.avatar);
    	}).catch(function(imError) {
    	  console.log('getMyProfile error:', imError); // 获取个人资料失败的相关信息
    	});
    };
    timtalk.prototype.getMemberList=function(pid,success){
    	var promise = tim.getGroupMemberList({ groupID: pid, count: 30, offset:0 }); // 从0开始拉取30个群成员
    	promise.then(function(imResponse) {
    		success(imResponse.data.memberList);
    	  //console.log(imResponse.data.memberList); // 群成员列表
    	}).catch(function(imError) {
    	  console.warn('getGroupMemberList error:', imError);
    	});
    };
    timtalk.prototype.getUserinfo=function(userid,success){
    	//console.log("tim getUserinfo",userid);
    	var promise = tim.getUserProfile({
    		  userIDList: [userid] // 请注意：即使只拉取一个用户的资料，也需要用数组类型，例如：userIDList: ['user1']
    		});
    		promise.then(function(imResponse) {
    			success(imResponse.data);
    		}).catch(function(imError) {
    		  console.log('getUserProfile error:', imError); // 获取其他用户资料失败的相关信息
    		});
    };
    
    timtalk.prototype.getGroupinfo=function(pid,success){
    	var promise = tim.getGroupProfile({ groupID: pid, groupCustomFieldFilter: [], memberCustomFieldFilter: []});
    	promise.then(function(imResponse) {
    	  success(imResponse.data.group);
    	}).catch(function(imError) {
    	  console.log('getGroupProfile error:', imError); // 获取群详细资料失败的相关信息
    	});
    };

	timtalk.prototype.handMsgReceived = function(event){
         var handlecount=0;
	      for (var i = 0; i < event.data.length; i++) {
	      
		        var message = event.data[i];
//		        var msgtype=message.type;
//		        var fromwho=message.from;
		       //var msgcontent=message.elements[0].content.text;
//		       console.log(fromwho,msgcontent);
//		       var msg={id:i,msgtype:msgtype,msgcontent:msgcontent,fromwho:fromwho};
		       //if (self.handMsgReceivedfuntion !==null)
			   //    if ( self.handMsgReceivedfuntion(message))
			   //       continue;
		       
		    	//console.log("未处理",msgcontent);
		        message.ishandle=0;
		       justep.Shell.fireEvent("onIMMsgrecive", message); 
		       if (message.ishandle===0)
		    	   handlecount++;
	        } 
	      if (handlecount>0)
		       justep.Shell.fireEvent("onIMMsgUnhandle", {count:handlecount}); 
    };
    
	timtalk.prototype.login=function(userid){
		
		   var userSig=null;
	       var options = {
			  SDKAppID: 1400259159 // 接入时需要将 0 替换为您的云通信应用的 SDKAppID
			};
			// 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
	       tim = TIM.create(options); // SDK 实例通常用 tim 表示

	       // 设置 SDK 日志输出级别为 release 级别（详细分级请参考 setLogLevel 接口的说明）
	       tim.setLogLevel(1);
	       
	       tim.registerPlugin({'cos-js-sdk': COS}); // 微信小程序环境请取消本行注释，并注释掉 tim.registerPlugin({'cos-js-sdk': COS});
			
			// 监听事件，如：
			tim.on(TIM.EVENT.SDK_READY, function(event) {
			  // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
			  // event.name - TIM.EVENT.SDK_READY
				self.getMyinfo();
			});
			
			tim.on(TIM.EVENT.MESSAGE_RECEIVED, function(event) {
			  // 收到推送的私聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
			  // event.name - TIM.EVENT.MESSAGE_RECEIVED
			  // event.data - 存储 Message 对象的数组 - [Message]
			  //console.log("MESSAGE_RECEIVED",event);
				console.log("收到消息：",event.data);
				self.handMsgReceived(event);
		        
			});
			
			tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, function(event) {
			  // 收到会话列表更新通知，可通过遍历 event.data 获取会话列表数据并渲染到页面
			  // event.name - TIM.EVENT.CONVERSATION_LIST_UPDATED
			  // event.data - 存储 Conversation 对象的数组 - [Conversation]
			});
			
			tim.on(TIM.EVENT.GROUP_LIST_UPDATED, function(event) {
			  // 收到群组列表更新通知，可通过遍历 event.data 获取群组列表数据并渲染到页面
			  // event.name - TIM.EVENT.GROUP_LIST_UPDATED
			  // event.data - 存储 Group 对象的数组 - [Group]
			});
			//Missing required params: "eventName".
			/*
			tim.on(TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED, function(event) {
			  // 收到新的群系统通知
			  // event.name - TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED
			  // event.data.type - 群系统通知的类型，详情请参见 GroupSystemNoticePayload 的 <a href="https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/Message.html#.GroupSystemNoticePayload"> operationType 枚举值说明</a>
			  // event.data.message - Message 对象，可将 event.data.message.content 渲染到到页面
			});
			*/
			tim.on(TIM.EVENT.PROFILE_UPDATED, function(event) {
			  // 收到自己或好友的资料变更通知
			  // event.name - TIM.EVENT.PROFILE_UPDATED
			  // event.data - 存储 Profile 对象的数组 - [Profile]
			});
			
			tim.on(TIM.EVENT.BLACKLIST_UPDATED, function(event) {
			  // 收到黑名单列表更新通知
			  // event.name - TIM.EVENT.BLACKLIST_UPDATED
			  // event.data - 存储 userID 的数组 - [userID]
			});
			
			tim.on(TIM.EVENT.ERROR, function(event) {
			  // 收到 SDK 发生错误通知，可以获取错误码和错误信息
			  // event.name - TIM.EVENT.ERROR
			  // event.data.code - 错误码
			  // event.data.message - 错误信息
			});
			
			tim.on(TIM.EVENT.SDK_NOT_READY, function(event) {
			  // 收到 SDK 进入 not ready 状态通知，此时 SDK 无法正常工作
			  // event.name - TIM.EVENT.SDK_NOT_READY
			});
			
				
			
			tim.on(TIM.EVENT.KICKED_OUT, function(event) {
			  // 收到被踢下线通知
			  // event.name - TIM.EVENT.KICKED_OUT
			  // event.data.type - 被踢下线的原因，例如 TIM.TYPES.KICKED_OUT_MULT_ACCOUNT 多账号登录被踢
				var answer=confirm("您的账号在其他设备上登录，请重新登录！");
				if(answer){
					justep.Shell.closePage("message");
					justep.Shell.showPage("main");
				}	
			});
			// 根据用户id，获得后台的签名 timsign
			webjs.pushdata("app/auth","timsign","&userid=" +userid+"",function(data){
					userSig=data.info;
					// 开始登录
					tim.login({userID: userid, userSig: userSig});
					localStorage.setItem("inputuserid",userid);
				},function(info){});
			
		
    };
    timtalk.prototype.sendMessage =function(text,pid,type,success,fail){
    	var ctype= TIM.TYPES.CONV_C2C;
    	if (type==="group")
    		ctype= TIM.TYPES.CONV_GROUP;
    	var sendmsg = tim.createTextMessage({
			  to: pid,
			  conversationType: ctype,
			  payload: {
			    text: text
			  }
			});
    	// 2. 发送消息
		var promise = tim.sendMessage(sendmsg);
		promise.then(function(imResponse) {
		  // 发送成功
		  success(imResponse);
		}).catch(function(imError) {
		  // 发送失败
		  console.warn('sendMessage error:', imError);
		});
    
    };
    
    timtalk.prototype.transtime =function(linuxtime){
    	var CrDate = new Date();
    	CrDate.setTime(linuxtime);//其中data为需要被转化的linux时间戳 1490778706000
    	return CrDate;
    
    };
    // 打开某个会话时，第一次拉取消息列表
    timtalk.prototype.getconversationID=function(peer){
    	if (peer.type==="user")
    		return "C2C"+peer.pid;
    	else
    		return "GROUP"+peer.pid;
    };
    
 // 打开某个会话时，设置成已读
    timtalk.prototype.setread=function(peer,success){
    	tim.setMessageRead({ conversationID: this.getconversationID(peer) });
    };
 // 打开某个会话时，第一次拉取消息列表
    timtalk.prototype.getHistoryMsg=function(peer,success){
    	var conversationID=this.getconversationID(peer);
    		
    	// 打开某个会话时，第一次拉取消息列表
    	var promise = tim.getMessageList({conversationID: conversationID, count: 5});
    	//下拉查看更多消息
    	//var promises = tim.getMessageList({conversationID: pid, nextReqMessageID, count: 15});
	    promise.then(function(imResponse) {
	    	success(imResponse);});
    };
 // 打开某个会话时，下一次拉取消息列表
    timtalk.prototype.getHistoryMsgNext=function(peer,nextReqMessageID, success){
    	var conversationID=this.getconversationID(peer);
    	var promise = tim.getMessageList({conversationID: conversationID,nextReqMessageID:nextReqMessageID, count: 5});
    	promise.then(function(imResponse) {
	    	success(imResponse);});
    };
    
    // 拉取会话列表
    timtalk.prototype.getTalklist=function(success){
    	var promise = tim.getConversationList();
    	promise.then(function(imResponse) {
    	  var conversationList = imResponse.data.conversationList; // 会话列表，用该列表覆盖原有的会话列表。
    	  success(conversationList);
    	}).catch(function(imError) {
    	  console.warn('getConversationList error:', imError); // 获取会话列表失败的相关信息
    	});
    };
    
    //发送图片消息
    timtalk.prototype.sendimg=function(id,pid,type,fileElement,success){
    	//创建消息实例，接口返回的实例可以上屏
    	var ctype= TIM.TYPES.CONV_C2C;
    	if (type==="group")
    		ctype= TIM.TYPES.CONV_GROUP;

    	var message = tim.createImageMessage({
            to: pid,
            conversationType: ctype,
            payload: {
              file: fileElement //document.getElementById('imagePicker') // 或者用event.target
            },
            onProgress: function(event) { console.log('file uploading:', event); }
          });
          // 3. 发送图片
		    var promise = tim.sendMessage(message);
		    promise.then(function(imResponse) {
		      // 发送成功
		      console.log("sendMessage success",imResponse);
		      success(imResponse);
		    }).catch(function(imError) {
		      // 发送失败
		      console.log('sendMessage error:', imError);
		    });
    };
    
  //发送文件消息
    timtalk.prototype.sendfile=function(id,pid,type,fileElement,success){
    	//创建消息实例，接口返回的实例可以上屏
    	var ctype= TIM.TYPES.CONV_C2C;
    	if (type==="group")
    		ctype= TIM.TYPES.CONV_GROUP;

    	var message = tim.createFileMessage({
            to: pid,
            conversationType: ctype,
            payload: {
              file: fileElement
            },
            onProgress: function(event) { console.log('file uploading:', event); }
          });
          // 3. 发送文件
		    var promise = tim.sendMessage(message);
		    promise.then(function(imResponse) {
		      // 发送成功
		      console.log("sendMessage success",imResponse);
		      success(imResponse);
		    }).catch(function(imError) {
		      // 发送失败
		      console.log('sendMessage error:', imError);
		    });
    };
	
	return new timtalk();
})