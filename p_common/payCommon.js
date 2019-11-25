define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("cordova!cordova-plugin-device");
	require("cordova!com.justep.cordova.plugin.weixin.v3");

	var wxPay = require('$UI/system/api/native/wxPay');

	var strName;
	var strMoneysum;
	var strAccount;
	var strTradecode;
	var Model = function() {
		this.weixinvisible= justep.Bind.observable(false);
		this.zfbvisible= justep.Bind.observable(false);
		this.zfbwapvisible= justep.Bind.observable(false);
		this.callParent();
	};

	Model.prototype.windowReceiver1Receive = function(event) {

		strName = event.data.name;
		strMoneysum = event.data.moneysum;
		strAccount = event.data.account;
		strTradecode = event.data.tradecode;
		// alert(strName+" "+strMoneysum+" "+strAccount+" "+strTradecode);
		var resultLabel1 = this.getElementByXid("span6");
		$(resultLabel1).text("您将为(" + strName + ")支付" + strMoneysum + "元");
		$(this.getElementByXid("span7")).text(strName);
		$(this.getElementByXid("span11")).text("支付:￥" + strMoneysum);
	};

	Model.prototype.button4Click = function(event) {
		this.comp("windowReceiver1").windowCancel();
	};

	Model.prototype.button1Click = function(event) {
		var me = this;


		var notifyUrl = "http://wxfuture.club:8888/lxmlxm/lxmlxm";
		//var sum = strMoneysum;
		//var iSum = parseInt(sum) * 100;
		//var iSumReal = iSum.toString();
		wxPay.pay({
			body : strName,
			mchId : strAccount,
			notifyUrl : notifyUrl,
			outTradeNo : strTradecode,
			totalFee : strMoneysum,
			success : function(e) {

				me.comp("windowReceiver1").windowEnsure({
					"ret" : "success"
				});
			},
			cancel : function(e) {
				me.comp("windowReceiver1").windowCancel();
			},
			fail : function(e) {
				alert("支付失败");
			}
		});
	};

	Model.prototype.button2Click = function(event) {
		var me = this;
		me.comp("windowReceiver1").windowEnsure({
			"ret" : "success"
		});
		return;
	};

	Model.prototype.button3Click = function(event) {
		var me = this;
		me.comp("windowReceiver1").windowEnsure({
			"ret" : "success"
		});
	};

	Model.prototype.backBtnClick = function(event) {
		this.comp("windowReceiver1").windowCancel();
	};

	Model.prototype.btnPayClick = function(event) {
		var zfbRadBox = this.comp("radZfbPay");
		var wxRadBox = this.comp("radWxPay");
		var unionRadBox = this.comp("radUnionPay");
		//var notifyUrl1 = "http://124.232.150.3:8888/lxmlxm/lxm";
		var notifyUrl =localStorage.getItem("paidnotifyurl");

	

	};
	Model.prototype.modelLoad = function(event)
	{

		var weixin=localStorage.getItem("isWeixinpay");
		if (weixin===null)
			this.weixinvisible.set(false);
		else
		{
			if (weixin==="1")
			{
				this.weixinvisible.set(true);
			}
			else
			{
				this.weixinvisible.set(false);
			}
		}
		var zfb=localStorage.getItem("iszfbpay");
		if (zfb===null)
			this.zfbvisible.set(false);
		else
		{
			if (zfb==="1")
			{
				this.zfbvisible.set(true);
			}
			else
			{
				this.zfbvisible.set(false);
			}
		}
		var zfbwap=localStorage.getItem("iszfbpaywap");
		if (zfbwap===null)
			this.zfbwapvisible.set(false);
		else
		{
			if (zfbwap==="1")
			{
				this.zfbwapvisible.set(true);
			}
			else
			{
				this.zfbwapvisible.set(false);
			}
		}

	};
	Model.prototype.modelActive = function(event){
	
	};
	return Model;
});