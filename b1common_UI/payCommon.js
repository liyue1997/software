define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("cordova!cordova-plugin-device");
	require("cordova!com.justep.cordova.plugin.weixin.v3");
	require("cordova!com.justep.cordova.plugin.alipay");
	var wxPay = require('$UI/system/api/native/wxPay');
	var ttool = require("$UI/p_common/tbase");

	var strName;
	var strMoneysum;
	var strAccount;
	var strTradecode;
	var Model = function() {
		this.weixinvisible = justep.Bind.observable(false);
		this.weixinwapvisible = justep.Bind.observable(false);
		this.zfbvisible = justep.Bind.observable(false);
		this.zfbwapvisible = justep.Bind.observable(false);
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
		$(this.getElementByXid("span11")).text("￥" + strMoneysum);
		console.log(strAccount);
	};

	Model.prototype.button4Click = function(event) {
		this.comp("windowReceiver1").windowCancel();
	};

	Model.prototype.button1Click = function(event) {
		var me = this;

		var notifyUrl =window.notifyUrl;// "http://wxfuture.club:8888/lxmlxm/lxmlxm";
		console.log(notifyUrl);
		// var sum = strMoneysum;
		// var iSum = parseInt(sum) * 100;
		// var iSumReal = iSum.toString();
		wxPay
				.pay({
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

						var msg = $(
								'<div style="display: none;z-index:99999;position: fixed;width: 100%;bottom: 250px;text-align: center;"><span style="font-size:18px;border-radius: 3px;padding: 7px;background-color:  #A9A9A9;color: #F0F0F0;">支付失败！</span></div>')
								.appendTo('body');
						msg.fadeIn(400).delay(2000).fadeOut(400, function() {

							msg.remove();
						});
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
		var radwapWxPay = this.comp("radwapWxPay");
		// var notifyUrl1 = "http://wxfuture.club:8888/lxmlxm/lxmlxm;
		var notifyUrl =window.notifyUrl; //localStorage.getItem("paidnotifyurl");
		console.log(notifyUrl);
		var me = this;
		/*
		 * 
		 */
		// 支付宝支付
		if (zfbRadBox.get("checked")) {
			/*
			 * alert("选择了支付宝支付"); this.comp("windowReceiver1").windowEnsure({
			 * "ret" : "success" }); return;
			 */
			if (!navigator.alipay) {

				var msg = $(
						'<div style="display: none;z-index:99999;position: fixed;width: 100%;bottom: 250px;text-align: center;"><span style="font-size:18px;border-radius: 3px;padding: 7px;background-color:  #A9A9A9;color: #F0F0F0;">需要安装app才能进行支付宝支付，请安装app，谢谢！</span></div>')
						.appendTo('body');
				msg.fadeIn(400).delay(2000).fadeOut(400, function() {

					msg.remove();
				});
				return;
			}


			var alipay = navigator.alipay;
			alipay
					.pay(
							{

								"seller" : window.seller,//"1582955073@qq.com", // 卖家支付宝账号或对应的支付宝唯一用户号
								"subject" : strName, // 商品名称
								"body" : strName, // 商品详情
								"price" : strMoneysum, // 金额，单位为RMB
								"tradeNo" : strTradecode, // 唯一订单号
								"timeout" : "30m", // 超时设置
								"notifyUrl" : notifyUrl
							// 服务器通知路径
							},
							function(message) {
								var responseCode = parseInt(message);

								if (responseCode === 9000) {
									var msg = $(
											'<div style="display: none;z-index:99999;position: fixed;width: 100%;bottom: 250px;text-align: center;"><span style="font-size:18px;border-radius: 3px;padding: 7px;background-color:  #A9A9A9;color: #F0F0F0;">支付成功！</span></div>')
											.appendTo('body');
									msg.fadeIn(400).delay(2000).fadeOut(400, function() {

										msg.remove();
									});
									me.comp("windowReceiver1").windowEnsure({
										"ret" : "success"
									});
								} else {
									// alert(responseCode);

									var msg1 = $(
											'<div style="display: none;z-index:99999;position: fixed;width: 100%;bottom: 250px;text-align: center;"><span style="font-size:18px;border-radius: 3px;padding: 7px;background-color:  #A9A9A9;color: #F0F0F0;">支付失败：'
													+ responseCode + '</span></div>').appendTo('body');
									msg1.fadeIn(400).delay(2000).fadeOut(400, function() {

										msg1.remove();
									});
								}
							},
							function(msg) {
								var msg2 = $(
										'<div style="display: none;z-index:99999;position: fixed;width: 100%;bottom: 250px;text-align: center;"><span style="font-size:18px;border-radius: 3px;padding: 7px;background-color:  #A9A9A9;color: #F0F0F0;">支付失败！</span></div>')
										.appendTo('body');
								msg2.fadeIn(400).delay(2000).fadeOut(400, function() {

									msg2.remove();
								});
							});
		}
		// 微信支付
		if (wxRadBox.get("checked")) {

			if (!navigator.weixin) {

				
				ttool.showdownpage("需要安装app才能进行微信支付，请安装app，谢谢！");
			    
				return;
			}
			//var me = this;

			var sum = strMoneysum;
			var iSum = parseFloat(sum) * 100;
			var iSumReal = iSum.toString();
			wxPay
					.pay({
						body : strName,
						mchId : strAccount,
						notifyUrl : notifyUrl,
						outTradeNo : strTradecode,
						totalFee : iSumReal,
						success : function(e) {
							// var responseCode = parseInt(e);
							/*
							 * var responseCode = parseInt(e); if (responseCode
							 * === 0) { alert('支付成功');
							 * me.comp("windowReceiver1").windowEnsure({ "ret" :
							 * "success" }); } else { alert("支付失败"); }
							 */

							me.comp("windowReceiver1").windowEnsure({
								"ret" : "success"
							});

						},
						cancel : function(e) {

							var msg = $(
									'<div style="display: none;z-index:99999;position: fixed;width: 100%;bottom: 250px;text-align: center;"><span style="font-size:18px;border-radius: 3px;padding: 7px;background-color:  #A9A9A9;color: #F0F0F0;">支付失败！</span></div>')
									.appendTo('body');
							msg.fadeIn(400).delay(2000).fadeOut(400, function() {

								msg.remove();
							});
						},
						fail : function(e) {
							var msg = $(
									'<div style="display: none;z-index:99999;position: fixed;width: 100%;bottom: 250px;text-align: center;"><span style="font-size:18px;border-radius: 3px;padding: 7px;background-color:  #A9A9A9;color: #F0F0F0;">支付失败！</span></div>')
									.appendTo('body');
							msg.fadeIn(400).delay(2000).fadeOut(400, function() {

								msg.remove();
							});
						}
					});
			return;
		}
		// 银联卡支付
		if (unionRadBox.get("checked")) {
			var msg1 = $(
					'<div style="display: none;z-index:99999;position: fixed;width: 100%;bottom: 250px;text-align: center;"><span style="font-size:18px;border-radius: 3px;padding: 7px;background-color:  #A9A9A9;color: #F0F0F0;">暂时不支持银联卡支付！</span></div>')
					.appendTo('body');
			msg1.fadeIn(400).delay(2000).fadeOut(400, function() {

				msg1.remove();
			});
			this.comp("windowReceiver1").windowEnsure({
				"ret" : "success"
			});
		}
		// wap微信支付
		if (radwapWxPay.get("checked")) {
		    if (!navigator.weixin) {
				
				ttool.showdownpage("需要安装app才能进行微信支付，请安装app，谢谢！");			    
				return;
			}
			//var me = this;

			var sum1 = strMoneysum;
		    var urlnew="http://wxfuture.club:8888/lxmCollege/lxmCollege?command=paylxm&product=car&ver=car&paytype=wap&useraccount="+strAccount+"&money="+sum1+"&strTradecode="+strTradecode;
		    console.log(urlnew);
			window.open(urlnew, "_system");
			console.log("跳转首页");
            window.location.href = "./index.w";  
		}
	};
	Model.prototype.modelLoad = function(event) {

		var weixin = ttool.getLocalStorage("isweixinpay","0");
		if (weixin === null)
			this.weixinvisible.set(false);
		else {
			if (weixin === "1") {
				this.weixinvisible.set(true);
			} else {
				this.weixinvisible.set(false);
			}
		}
		var weixinwap =ttool.getLocalStorage("isweixinwappay","0");
		if (weixinwap === null)
			this.weixinwapvisible.set(false);
		else {
			if (weixinwap === "1") {
				this.weixinwapvisible.set(true);
			} else {
				this.weixinwapvisible.set(false);
			}
		}
		var zfb = ttool.getLocalStorage("iszfbpay",'0');
		if (zfb === null)
			this.zfbvisible.set(false);
		else {
			if (zfb === "1") {
				this.zfbvisible.set(true);
			} else {
				this.zfbvisible.set(false);
			}
		}
		var zfbwap = ttool.getLocalStorage("iszfbpaywap","0");
		if (zfbwap === null)
			this.zfbwapvisible.set(false);
		else {
			if (zfbwap === "1") {
				this.zfbwapvisible.set(true);
			} else {
				this.zfbwapvisible.set(false);
			}
		}

	};
	Model.prototype.modelActive = function(event) {

	};
	return Model;
});