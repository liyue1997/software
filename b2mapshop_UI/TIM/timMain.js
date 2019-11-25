define(function(require){
	var $ = require("jquery");
    var justep = require("$UI/system/lib/justep");
    var TIM = require("$UI/b2mapshop_UI/TIM/tim-js"); //因为wsdk支持AMD规范, 所以可以直接require
    
    var tim;
    var self;
    var Model = function(){
        this.callParent();
        self=this;
    };
 
    Model.prototype.modelLoad = function(event){
    };
    
    
    Model.prototype.pushMsgReceived = function(message){
	        return false;
    };
    
    
    Model.prototype.handMsgReceived = function(event){
          var database=this.comp("messagedata");
	          var receivemessages={
	              	defaultValues:[]
	          };
		  console.log(event.data);
	      for (var i = 0; i < event.data.length; i++) {
	      
		        var message = event.data[i];
		        var msgtype=message.type;
		        var fromwho=message.from;
		       var msgcontent=message.elements[0].content.text;
		       console.log(fromwho,msgcontent);
		       var msg={id:i,msgtype:msgtype,msgcontent:msgcontent,fromwho:fromwho};
		       if ( self.pushMsgReceived(msg))
		          continue;
		       receivemessages.defaultValues[receivemessages.defaultValues.length]=
		       msg;
	       
	        }
	       database.newData(receivemessages);  
    };
    
	Model.prototype.button1Click = function(event){
	   
       var options = {
		  SDKAppID: 1400259159 // 接入时需要将 0 替换为您的云通信应用的 SDKAppID
		};
		// 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
       tim = TIM.create(options); // SDK 实例通常用 tim 表示

       // 设置 SDK 日志输出级别为 release 级别（详细分级请参考 setLogLevel 接口的说明）
       tim.setLogLevel(1);
       
       //registerPlugin({'cos-wx-sdk': COS}); // 微信小程序环境请取消本行注释，并注释掉 tim.registerPlugin({'cos-js-sdk': COS});
		
		// 监听事件，如：
		tim.on(TIM.EVENT.SDK_READY, function(event) {
		  // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
		  // event.name - TIM.EVENT.SDK_READY
		});
		
		tim.on(TIM.EVENT.MESSAGE_RECEIVED, function(event) {
		  // 收到推送的私聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
		  // event.name - TIM.EVENT.MESSAGE_RECEIVED
		  // event.data - 存储 Message 对象的数组 - [Message]
		  //console.log("MESSAGE_RECEIVED",event);
		  //var message =null;
	     // var msgtype=null;
	      //var fromwho=null;
	      //var msgcontent=null;
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
		});
		
		// 开始登录
		tim.login({userID: 'USER201908070003', userSig: 'eJw1jksLgkAUhf-LrEPujN6pK7RoIQlpghqFu8ApLz4wNQmi-55oLc-jO5y3SIPEMq*WOyNciYgKAFazO5pOuEJZIBbd5*W1bTmfeg6AQpJIS8K5aQa*8QycEi9WIAk2sJ627D-N9yk8B-4YEuEl7YuH1xxLoF3v6*e*iqrskHihHRe1k0UgYfsDB67na5qUcjTqzxe25DIx'});
	};
	Model.prototype.button2Click = function(event){
		var sendtext=this.comp("sendtext").val();
        // 发送文本消息，Web 端与小程序端相同
		// 1. 创建消息实例，接口返回的实例可以上屏
		var message = tim.createTextMessage({
		  to: 'USER201908070001',
		  conversationType: TIM.TYPES.CONV_C2C,
		  payload: {
		    text: sendtext
		  }
		});
		// 2. 发送消息
		var promise = tim.sendMessage(message);
		promise.then(function(imResponse) {
		  // 发送成功
		  sendtext="";
		  console.log("发送成功",imResponse);
		}).catch(function(imError) {
		  // 发送失败
		  console.warn('sendMessage error:', imError);
		});
	};
	Model.prototype.OpenChartClick = function(event){
        justep.Shell.showPage("TIMMessage",{id:'USER201908070003',pid:'am201909240079',type:'group',main:self});
	};
	return Model;
    
 
});