define(function(require) {
	//var $ = require("jquery");
	require('css!$UI/bcommon/lib/superInput/icon/iconfont').load();// 加载新增iconfont
	require('css!$UI/bcommon/lib/superInput/icon/addicon/iconfont').load();
	var justep = require("$UI/system/lib/justep");
	var ShellImpl = require('$UI/system/lib/portal/shellImpl');
	var CommonUtils = require("$UI/system/components/justep/common/utils");
	require("curcheck");
	//var tbase= require("$UI/bcommon/tbase");
	require("$UI/bcommon/main");

	var curtool = require("curtool");
	var Model = function() {
		this.callParent();
		//
		curtool.backgroundMode();
		var shellImpl = new ShellImpl(this, {
			"contentsXid" : "pages",
			"pageMappings" : {
			
				"main" : {
					url : curtool.geturl('main')
				},
				"login" : {
					url : curtool.geturl('login')
				},
				"mapshop" : {
					url : curtool.geturl('mapshop')
				},
				"left" : {
					url : curtool.geturl('left')
				},
				"shoppage" : {
					url : curtool.geturl('shoppage')
				},
				"shoucang" : {
					url : curtool.geturl('shoucang')
				},
				"talk" : {
					url : curtool.geturl('talk')
				},
				"setting" : {
					url : curtool.geturl('setting')
				},
				"forgetpwd" : {
					url : curtool.geturl('forgetpwd')
				},
				"zuduimsg" : {
					url : curtool.geturl('zuduimsg')
				},
				"fabiao" : {
					url : curtool.geturl('fabiao')
				},
				"debugpage" : {
					url : curtool.geturl('debugpage')
				},
				"wap" : {
					url : curtool.geturl('wap')
				},
				"registe" : {
					url : curtool.geturl('registe')
				},
				"show" : {
					url : curtool.geturl('show')
				},
				"tencentIM" : {
					url : curtool.geturl('tencentIM')
				},
				"consolelog" : {
					url : curtool.geturl('consolelog')
				},
				"shareCommon" : {
					url : curtool.geturl('shareCommon')
				},
				"about" : {
					url : curtool.geturl('about')
				},
				"register" : {
					url : curtool.geturl('register')
				},
				"page_other" : {
					url : curtool.geturl('page_other')
				},
				"page_other_updatetpassword" : {
					url : curtool.geturl('page_other_updatetpassword')
				},
				"page_other_resetpassword" : {
					url : curtool.geturl('page_other_resetpassword')
				},
				"picview" : {
					url : curtool.geturl('picview')
				},
				"agreement" : {
					url : curtool.geturl('agreement')
				},
				"oilmain" : {
					url : curtool.geturl('oilmain')
				},
				"mainbasics" : {
					url : curtool.geturl('mainbasics')
				},
				"TIMMessage":{
					url : curtool.geturl('TIMMessage')
					
				},
				"TIMMain":{
					url : curtool.geturl('TIMMain')
				},
				"TIMlist":{
					url : curtool.geturl('TIMlist')
				},
				"TIMmessage":{
					url : curtool.geturl('TIMmessage')
				}
			}
		});
		
		//shellImpl.useDefaultExitHandler = false; //不使系统默认退出处理程序
		//重写附加双击退出应用程序
		CommonUtils.attachDoubleClickExitApp(function() {
			if (shellImpl.pagesComp.getActiveIndex() === 0) {
				return true;
			} else {
				justep.Shell.closePage();
			}
			return false;
		});
		
	};
	Model.prototype.modelLoad = function(event) {
		//处理IOS 标题栏
		//var ua = navigator.userAgent.toLowerCase();        
		  
		//处理IOS 标题栏
//        if (/iphone|ipad|ipod/.test(ua))
//        {
//			$(".x-iostop").css({
//				"top" : "20px"
//			});
//        }
		
		justep.Shell.showPage("main");
		justep.Shell.loadPage("left");
	};
	return Model;
});