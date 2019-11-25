define(function(require){
	//var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var webjs = require("$UI/bcommon/webjs");
	var tbase = require("$UI/bcommon/tbase");
	var curtool =require("curtool");
	var mapshoptool =require("mapshoptool");
	
	var self=null;
	
	var Model = function(){
		this.callParent();
		self=this;
		this.showlogin=justep.Bind.observable(true);
		this.yzmdisable=justep.Bind.observable(false);
		this.showweixin=justep.Bind.observable(!tbase.isweb());
	};
	
	//图片路径转换
	Model.prototype.toUrl = function(url){
		return url ? require.toUrl(url) : "";
	};
	
	//验证码click
	Model.prototype.button1Click = function(event){
	    console.log("button1Click");
		setTimeout(function(){
			self.yzmdisable.set(false);
			},1000);
		var phone=this.comp("inputMobileNumber").val();
			if (phone === "" || phone === null) {
				tbase.showerr("手机号不能为空");
				this.yzmdisable.set(true);			
				return;
			}	
		var reg=/^0?1[3|4|5|7|8][0-9]\d{8}$/;
			if(reg.test(phone)){
			this.comp("yzmbutton").mytime();
				webjs.pushdata("app/auth","yzm","&useraccount=" +phone+"",function(data){
				},function(info){
					this.yzmdisable.set(true);
					tbase.showerr(info);
				});
			}else{
				tbase.showerr("手机号不合法，请重新输入");
				this.yzmdisable.set(true);
			}
	};
	
	Model.prototype.modelLoad = function(event){
		var comp=this.comp("yzmbutton");
		mapshoptool.time.apply(comp,[60,"获取验证码","重新发送"]);
	};
	//提交注册
	Model.prototype.registeBtnClick = function(event){
	    console.log("registeBtnClick");
		var phone=this.comp("inputMobileNumber").val();
		var yzm=this.comp("yzminput").val();
		var password2=this.comp("passwordinput2").val();
		var password=this.comp("passwordinput").val();
			mapshoptool.sureclick(phone,yzm,password2,password);
			
			webjs.pushdata("app/auth","yzmcheck","&useraccount=" +phone+"&yzm="+yzm+"",function(data){
					if(data.ret=="success"){
						webjs.pushdata("app/auth","zhuce","&useraccount="+phone+"&yzm="+yzm
						   +"&password="+curtool.pswmd5(phone,password) +"&username="+phone+"",function(data){
							tbase.showdebug("register success!");
			                localStorage.setItem("inputModileNumber", phone);
							justep.Shell.showPage("login");
							tbase.showmsg("恭喜您！注册成功！");
						},function(info){
							this.yzmdisable.set(true);
							tbase.showerr(info);
						});
					}
				},function(info){
					this.yzmdisable.set(true);
					tbase.showerr(info);
				});
	};

	//关闭按钮
	Model.prototype.leftClick = function(event){
		 var me = this;
		 justep.Shell.showPage('login').done(function(){
	        me.close();
	    });
	};

	return Model;
});