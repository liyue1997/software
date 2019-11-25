define(function(require){
	//var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var tbase = require("$UI/bcommon/tbase");
	var curtool =require("curtool");
	var TIM = require("$UI/b2mapshop_UI/TalkDemo/tim");
	
	var Model = function(){
		this.callParent();
		this.showweibo=justep.Bind.observable(false);
		this.showweixin=justep.Bind.observable(!tbase.isweb());
		this.showweiqq=justep.Bind.observable(false);
		//this.showlogin=justep.Bind.observable(tbase.isweb());
		this.showlogin=justep.Bind.observable(true);
	};
	
	//图片路径转换
	Model.prototype.toUrl = function(url){
		return url ? require.toUrl(url) : "";
	};
	//
	Model.prototype.loginsuccess = function(){
		console.log( this.params.gotopage);
	    justep.Shell.showPage(this.params.gotopage);
	};
	
	
	Model.prototype.loginBtnClick = function(event){
	    var phone = this.comp("inputModileNumber").val();
		var password = this.comp("password1").val();
		var me =this;
		if (phone === "" || phone === null) {
			tbase.showerr("请输入您的手机号");			
			return;
		}
		if (password === "" || password === null) {
			tbase.showerr("请输入您的登陆密码");
			return;
		}
	
	    if ( curtool.login(phone,password)){
	    	tbase.setLocalStorage("inputModileNumber", phone);
	    	tbase.setLocalStorage("password1", password);
			me.loginsuccess();
        }
	    
	};
	
	Model.prototype.modelLoad = function(event){
		this.comp("inputModileNumber").val(tbase.getLocalStorage("inputModileNumber",""));
		this.comp("password1").val(tbase.getLocalStorage("password1",""));
	};
	
	Model.prototype.image2Click = function(event){
		if (!navigator.weixin) {
			justep.Util.hint("请安装最新版本(含插件)体验！");
			return;
		}
		var me=this;
//		$(".rele-showmain").removeClass("fadeOut");
//		$(".rele-showmain").show();
		var weixin = navigator.weixin;
		weixin.ssoLogin(function() {
			weixin.getUserInfo(saveUser, function(reason) {
//				$(".rele-showmain").removeClass("fadeIn").addClass("fadeOut");
//				$(".relebody .col-xs-4").removeClass("animated bounceInUp").addClass("animated bounceOutDown");
//				$(".rele-showmain").hide();
//				$(".relebody .col-xs-4").hide();
				justep.Util.hint("登录失败: " + JSON.stringify(reason), {
					"type" : "danger"
				});
			});
		}, function(reason) {
//			$(".rele-showmain").removeClass("fadeIn").addClass("fadeOut");
//			$(".relebody .col-xs-4").removeClass("animated bounceInUp").addClass("animated bounceOutDown");
//			$(".rele-showmain").hide();
//			$(".relebody .col-xs-4").hide();
			justep.Util.hint("登录失败: " + JSON.stringify(reason), {
				"type" : "danger"
			});
		});
		function saveUser(data) {
			if (curtool.wxlogin(data.nickname,data.headimgurl,data.openid))
			   	me.loginsuccess();
		}
	};
	Model.prototype.leftClick = function(event){
        console.log("left1Click");
		justep.Shell.showMainPage();
	};
	//注册
	Model.prototype.button4Click = function(event){
		justep.Shell.showPage("registe");
	};
	//忘记密码
	Model.prototype.button1Click = function(event){
		justep.Shell.showPage("forgetpwd");
	};
	Model.prototype.modelActive = function(event){
		this.comp("inputModileNumber").val(tbase.getLocalStorage("inputModileNumber",""));
		this.comp("password1").val(tbase.getLocalStorage("password1",""));

	};
	
	Model.prototype.getshowweixin = function(){
//		var phone = this.comp("inputModileNumber").val();
//		return phone.length>0;
		return true;
	
	};
	
	return Model;
});