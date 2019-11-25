define(function(require) {
	//var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var ShellImpl = require('$UI/system/lib/portal/shellImpl');
	var CommonUtils = require("$UI/system/components/justep/common/utils");
	require("cordova!de.appplant.cordova.plugin.background-mode");
	require("curcheck");

	//require('css!$UI/p_common/lib/superInput/icon/iconfont').load();// 加载新增iconfont，聊天功能
	//require('css!$UI/p_common/lib/superInput/icon/addicon/iconfont').load();
	
	//require("css!$UI/antique/css/style").load();
	//require("css!$UI/antique/css/animation").load();

	//var ttool = require("$UI/p_common/tbase");
	var curtool = require("curtool");
	var Model = function() {
		this.callParent();
		//
		if (navigator.alipay)
		{
			cordova.plugins.backgroundMode.enable();
		}
		var shellImpl = new ShellImpl(this, {
			"contentsXid" : "pages",
			"pageMappings" : {
				"wap" : {
					url : curtool.geturl('wap')
				},
				"show" : {
					url : curtool.geturl('show')
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
				"main" : {
					url : curtool.geturl('main')
				},
				"login" : {
					url : curtool.geturl('login')
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
				"needoil" : {
					url : curtool.geturl('needoil')
				},
				"oilmain" : {
					url : curtool.geturl('oilmain')
				},
				"mainbasics" : {
					url : curtool.geturl('mainbasics')
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
		var ua = navigator.userAgent.toLowerCase();        
		  
		//处理IOS 标题栏
//        if (/iphone|ipad|ipod/.test(ua))
//        {
//			$(".x-iostop").css({
//				"top" : "20px"
//			});
//        }
		
		justep.Shell.showPage("main");
	};
	return Model;
});