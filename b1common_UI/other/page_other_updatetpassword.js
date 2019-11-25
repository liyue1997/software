define(function(require) {
	var justep = require("$UI/system/lib/justep");
	var ttool = require("$UI/p_common/tbase");
	var webjs = require("$UI/p_common/webjs");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.btnUpdatePasswordClick = function(event) {
		var phone = ttool.getuserid();
		if (phone === "0") {
			return;
		}
		var newpassword = this.comp("newPasswordInput").val();
		var oldpassword = this.comp("oldPasswordInput").val();
		var password2 = this.comp("password2").val();
		if (newpassword != password2) {

			ttool.showerr("两次密码不一致，请重新输入");
			return;
		}
		ttool.confirm(this, "确定修改?", function() {
			webjs.pushdata("changepass", "&useraccount=" + phone + "&password=" + newpassword + "&oldpassword=" + oldpassword , function(data) {
				ttool.showmsg("修改成功");
				justep.Shell.closePage();
			}, function(info) {
				ttool.showerr(info);
			});
		});
	};

	return Model;
});