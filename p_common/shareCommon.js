define(function(require) {
	// 分享
	require("cordova!com.justep.cordova.plugin.qq");
	require("cordova!com.justep.cordova.plugin.weixin.v3");

	var strTile;
	var strContent;
	var strUrlpic;
	var strUrlClick;
	var me;
	var Model = function() {
		this.callParent();
		me=this;
	};

	Model.prototype.button1Click = function(event) {

	};

	Model.prototype.windowReceiver1Receive = function(event) {
		 strTile=event.data.title; 
		 strContent=event.data.content;
		 strUrlpic=event.data.urlpic; 
		 strUrlClick=event.data.urlclick;
		
	};

	Model.prototype.button2Click = function(event) {
		function success(result) {

		}
		function error(result) {

		}
		var args = {};
		args.url = strUrlClick;// utils.getShareUrl(window.location.href);
		args.title = strTile;
		args.description = strContent;
		args.imageUrl = strUrlpic;
		args.appName = "内容分享";
		navigator.QQ.shareToQQ(success, error, args);
	};

	Model.prototype.button5Click = function(event) {
		this.comp("windowReceiver1").windowCancel();
	};

	Model.prototype.button3Click = function(event) {
	
	};
    //QQ分享
	Model.prototype.col67Click = function(event) {

		function success(result) {
	
				me.comp("windowReceiver1").windowEnsure();
		}
		function error(result) {
		
		}
		var args = {};
		args.url = strUrlClick;// utils.getShareUrl(window.location.href);
		args.title = strTile;
		args.description = strContent;
		args.imageUrl = strUrlpic;
		args.appName = "资讯分享";
		navigator.QQ.shareToQQ(success, error, args);
	
		
		
		
	};
    //微信分享
	Model.prototype.col73Click = function(event) {
		function success(result) {
		
			this.comp("windowReceiver1").windowEnsure();
		}
		function error(result) {

		}
		navigator.weixin.share({
			message : {
				title : strTile,
				description : strContent,
				mediaTagName : strContent,
				thumb : strUrlpic,
				media : {

					webpageUrl : strUrlClick

				}
			},
			scene : navigator.weixin.Scene.SESSION
		}, success, error);
		

	};

	return Model;
});