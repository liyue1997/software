define(function(require) {
	var justep = require("$UI/system/lib/justep");
	var webjs = require("$UI/p_common/webjs");
	var ttool = require("$UI/p_common/tbase");
	var Model = function() {
		this.callParent();
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
	Model.prototype.btnSendSmsClick = function(event) {
		var phoneInput = this.comp("phoneInput").val();
		var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
	
		if (reg.test(phoneInput)) {
			this.comp("btnSendSms").mytimer();
			webjs.pushdata("yzm", "&useraccount=" + phoneInput + "", function(data) {
			}, function(info) {
				// ttool.showerr(info);
				ttool.showerr(info);
			});
		} else {
			ttool.showerr("手机号不正确");
		}
	};
	Model.prototype.btnResetPasswordClick = function(event) {
		var phoneInput = this.comp("phoneInput").val();
		var yzm = this.comp("inputCode").val();
		var newpassword = this.comp("newPasswordInput").val();
		var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
	
		if (reg.test(phoneInput)) {
		    ttool.confirm(this, "确定修改?",function(){
		    webjs.pushdata("resetpass", "&useraccount=" + phoneInput + "&yzm=" + yzm + "&password="+newpassword, function(data) {
			ttool.showmsg("重置密码成功");
		    justep.Shell.closePage();
			}, function(info) {
				// ttool.showerr(info);
				ttool.showerr(info);
			});}
        );
		} else {
			ttool.showerr("手机号不正确");
		}
	};

	return Model;
});