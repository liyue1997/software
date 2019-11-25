define(function(require) {
	var $ = require('jquery');
	var tbase=require("$UI/p_common/tbase");
	var justep = require("$UI/system/lib/justep");
	require("cordova!cordova-plugin-device");
	
	//消息回传给应用处理
	var pbackfuntion=null;
	
	
	
	var JPushInstance = function() {
		if (window.plugins && window.plugins.jPushPlugin) {
			
			document.addEventListener("deviceready", this.onDeviceReady.bind(this), false);
			document.addEventListener("jpush.openNotification", this.onOpenNotification.bind(this), false);
			document.addEventListener("jpush.receiveNotification", this.onReceiveNotification.bind(this), false);
			document.addEventListener("jpush.receiveMessage", this.onReceiveMessage.bind(this), false);
		}
	};
	
	//hcr 解决第一次获取失败的问题
	JPushInstance.prototype.getRegistrationID = function(){
		 var dtd = $.Deferred();
		 var self=this;
		 if (this.registrationID)
		 {
			 dtd.resolve(this.registrationID);
		 }
		 else
		 {
			 if (window.plugins && window.plugins.jPushPlugin)
			 {
				 window.plugins.jPushPlugin.getRegistrationID
				 (
						function(registrationID) 
						{
							 self.registrationID = registrationID;
							 if (self.registrationID)
							 {
								 dtd.resolve(self.registrationID);	 
							 }else
							 {
								 dtd.reject();
							 }
						}
				);
			 }else
			 {
				 dtd.reject();
			 }
		 }
		 return dtd.promise();
	};
	
	JPushInstance.prototype.setPushByID = function(userid)
	{
		window.plugins.jPushPlugin.setAlias(userid);
	};
	
	JPushInstance.prototype.setbackfuntion = function(backfuntion)
	{
		pbackfuntion=backfuntion;
	};
	
	JPushInstance.prototype.stopPush = function()
	{
		window.plugins.jPushPlugin.stopPush();
	};
	
	JPushInstance.prototype.onDeviceReady = function() {
		var self = this;
		window.plugins.jPushPlugin.init();
		window.plugins.jPushPlugin.getRegistrationID(function(registrationID) {
			self.registrationID = registrationID;
		});
		
		if (tbase.getdeviceplatform() == "Android") {
			window.plugins.jPushPlugin.setDebugMode(false);
			window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
		} else {
			window.plugins.jPushPlugin.setDebugMode(false);
			window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
		}
	};

	JPushInstance.prototype.onOpenNotification = function(event) {
		var alertContent;
		if (tbase.getdeviceplatform() == "Android") {
			alertContent = window.plugins.jPushPlugin.openNotification.alert;
		} else {
			alertContent = event.aps.alert;
		}
		window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
		 //if (pbackfuntion)
		     // pbackfuntion(alertContent);    
			 justep.Shell.fireEvent("onMsgrecive", {info:alertContent});
		 //else
		//     justep.Util.hint(alertContent);
	};

	JPushInstance.prototype.onReceiveNotification = function(event) {
		var alertContent;
        if(tbase.getdeviceplatform() == "Android"){
        	alertContent = window.plugins.jPushPlugin.receiveNotification.alert;
        }else{
        	alertContent   = event.aps.alert;
        }
        window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
   
		justep.Shell.fireEvent("onMsgrecive", {info:alertContent});

	};

	JPushInstance.prototype.onReceiveMessage = function() {
		var message;
        if(tbase.getdeviceplatform()== "Android")
        {
       		 message = window.plugins.jPushPlugin.receiveMessage.message;
        }else
        {
              message   = event.content;
              if ((message==="refreshguang")||(message==="dashang"))
            	  {
            	  
            	  }
              else
            	  {
            	  	justep.Util.hint(message);
            	  }
              
        }
        window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);    
		justep.Shell.fireEvent("onMsgreciveXiaoxi", {info:message});

	};

	return new JPushInstance();
});