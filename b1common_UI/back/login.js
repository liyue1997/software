define(function(require) {
	var justep = require("$UI/system/lib/justep");
	require("curcheck");	
	var ttool = require("$UI/p_common/tbase");
	var tbase = require("$UI/p_common/tbase");
	var curtool= require("curtool");	
	var Model = function() {
		this.callParent();
		this.showzhuce=justep.Bind.observable(true);
	};
	Model.prototype.span5Click = function(event) {
		justep.Shell.showPage("page_other_resetpassword");
	};
	Model.prototype.btnRegClick = function(event) {
		justep.Shell.showPage("register");
	};
	Model.prototype.btnCloseClick = function(event) {
		//justep.Shell.closePage();
		justep.Shell.showMainPage();
	};
	Model.prototype.btnLoginClick = function(event) {
		var phone = this.comp("inputModileNumber").val();
		var password = this.comp("password1").val();
		if (phone === "" || phone === null) {
			ttool.showerr("请输入您的手机号");			
			return;
		}
		if (password === "" || password === null) {

			ttool.showerr("请输入您的登陆密码");
			return;
		}

		localStorage.setItem("inputModileNumber", phone);
		localStorage.setItem("password1", password);
		curtool.login(phone,password);
	};
	Model.prototype.modelLoad = function(event){
		var resultLabel1 = this.getElementByXid("span2");
		if (resultLabel1!==null)
			$(resultLabel1).text(window.ver);
			
		this.comp("inputModileNumber").val(tbase.getLocalStorage("inputModileNumber",""));
		this.comp("password1").val(tbase.getLocalStorage("password1",""));
	};
	Model.prototype.modelActive = function(event){

		this.comp("inputModileNumber").val(tbase.getLocalStorage("inputModileNumber",""));
		this.comp("password1").val(tbase.getLocalStorage("password1",""));
	};
	Model.prototype.inputModileNumberFocus = function(event){
         this.showzhuce.set(false);
	};
	Model.prototype.password1Blur = function(event){
 this.showzhuce.set(true);
	};
	return Model;

});