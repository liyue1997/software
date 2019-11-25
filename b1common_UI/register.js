define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var webjs = require("$UI/p_common/webjs");
	var ttool = require("$UI/p_common/tbase");
	var curtool = require("curtool");
	var Model = function() {
		this.callParent();
	};
	// 获取验证码
	Model.prototype.btnCodeClick = function(event) {
		event.source.set({
			"disabled" : true
		});
		setTimeout(function() {
			event.source.set({
				"disabled" : false
			});
		}, 1000);
		var content = this.comp("contents1");
		var phoneInput = this.comp("inputPhone").val();
		var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
		if (reg.test(phoneInput)) {
			this.comp("btnSendSms").mytimer();
			webjs.pushdata("auth","yzm", "&useraccount=" + phoneInput + "", function(data) {
				content.to("content3");
				$(".lineSpan").removeClass("lineSpan-bg");
				$(".lineTwoSpan").addClass("lineSpan-bg");
				$(".play").addClass("lineTwoSpan2");
			}, function(info) {
				 ttool.showerr(info);
				//ttool.showmsg("验证码未获取成功，请重新获取");
			});
		} else {
			ttool.showerr("手机号不正确");
		}

	};
	// 计时器
	function Timmer(loopSecond, titile1, title2, lisentner) {
		// 还要检查一个结果返回变量。
		this.loopSecond = loopSecond;
		this.waittime = loopSecond;
		var self = this;
		this.mytimer = function() {
			if (self.waittime <= 0) {
				self.set({
					"disabled" : false,
					"label" : titile1
				});
				this.waittime = loopSecond; // 可设 60秒
			} else {
				self.set({
					"disabled" : true,
					"label" : title2 + "(" + self.waittime + ")"
				});
				self.waittime--;
				setTimeout(function() {
					self.mytimer();
				}, 1000);
			}
		};
	}

	Model.prototype.modelLoad = function(event) {

		var comp = this.comp("btnSendSms");
		Timmer.apply(comp, [ 60, "获取验证码", "重新发送" ]);
	};
	// 重新获取验证码
	Model.prototype.btnSendSmsClick = function(event) {
		var phoneInput = this.comp("inputPhone").val();
		var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
		if (reg.test(phoneInput)) {
			this.comp("btnSendSms").mytimer();
			webjs.pushdata("auth","yzm", "&useraccount=" + phoneInput + "", function(data) {
				if (data.ret == "success") {
				}
			}, function(info) {
				 ttool.showerr(info);
				//ttool.showmsg("验证码未获取成功，请重新获取");
			});
		} else {
			ttool.showerr("手机号不正确");
		}
	};
	// 提交验证码
	Model.prototype.button3Click = function(event) {
		var phoneInput = this.comp("inputPhone").val();
		var yzm = this.comp("inputCode").val();
		var content = this.comp("contents1");
		if (yzm === "") {
			ttool.showmsg("验证码未填写");
			return;
		}
		webjs.pushdata("auth","yzmcheck", "&useraccount=" + phoneInput + "&yzm=" + yzm + "", function(data) {
			if (data.ret == "success") {
				content.to("content4");
				$(".lineTwoSpan").removeClass("lineSpan-bg");
				$(".lineThreeSpan").addClass("lineSpan-bg");
				$(".play").removeClass("lineTwoSpan2");
				$(".play").addClass("rightPlay");
			}
		}, function(info) {
			ttool.showerr(info);

		});

	};
	// 注册成功
	Model.prototype.btnRegClick = function(event) {
		var phoneInput = this.comp("inputPhone").val();
		var yzm1 = this.comp("inputCode").val();
		var pass1 = this.comp("password").val();
		var pass2 = this.comp("again-password").val();
		var name = this.comp("nameInput").val();
		if (pass1 != pass2) {
			ttool.showerr("两次输入的密码不一致");
			return;
		}
		if (name === "") {
			ttool.showerr("姓名不能为空");
			return;
		}
		// var cityName=ttool.getcity();
		ttool.showdebug("zhuce start");
		ttool.confirm(this, "确定注册?", function() {

			ttool.showdebug("zhuce pushdata");
			webjs.pushdata("auth","zhuce", "&useraccount=" + phoneInput + "&password=" +  curtool.pswmd5(phoneInput,pass1)  + "&username=" + name + "&yzm=" + yzm1, function(data) {
				ttool.showdebug("zhuce success");
				localStorage.setItem("inputModileNumber", phoneInput);
				justep.Shell.showPage("login");
				//alert(data.info);
				ttool.showmsg("您已成功注册");
			}, function(info) {
				ttool.showerr(info);
                 
			});
		});
	};
	Model.prototype.treatyLinkClick = function(event) {
		justep.Shell.showPage("agreement");
	};
	return Model;
});