define(function(require) {
	var gcoord = require('gcoord');
	var wx = require('wx');

	window.serverUrl = "http://www.xinxingtech.com.cn/";
	var me;
	var xx_Dshowweixin = function() {
		me = this;
	};
	var xx_Dshowcode=require('xx_Dshowcode');

	xx_Dshowweixin.prototype.getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if(r != null) return unescape(r[2]);
		return null; //返回参数值
	};

	//微信授权 获取code
	xx_Dshowweixin.prototype.wxauthor = function(openid, Appid, huodongid, shopid, fromuser) {
		//alert("ceshi 1.0");
		var code = me.getUrlParam('rcode');
		huodongid = me.getUrlParam('huodongid');
		shopid = me.getUrlParam('shopid');
		fromuser = me.getUrlParam('fromuser');
		var Local = window.serverUrl + "return.html?app=huodong/index.html?v=1";

		var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + Appid + '&redirect_uri=' + encodeURIComponent(Local) + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
		if(code == null || code == "") {
			localStorage.setItem('huodongid', huodongid);
			localStorage.setItem('shopid', shopid);
			localStorage.setItem('fromuser', fromuser);
			window.location.href = url;
		} else {
			huodongid = localStorage.getItem('huodongid');
			shopid = localStorage.getItem('shopid');
			fromuser = localStorage.getItem('fromuser');
			me.getOpenId(code, huodongid, shopid, fromuser);
		}
	};

	//发送code 从后台获取openid
	xx_Dshowweixin.prototype.getOpenId = function(code, huodongid, shopid, fromuser) {
		$.ajax({
			url: window.serverUrl + "b4huodong/app/huodong?command=wxloginbycode&code=" + code + "&huodongid=" + huodongid +
				"&shopid=" + shopid + "&fromuser=" + fromuser,
			type: "get",
			async: false,
			success: function(data) {
				var userid = data.userid;
				var huodongmoudle = data.moudle;
				var token = data.token;
				localStorage.setItem("userid", userid);
				localStorage.setItem("token", token);
				window.location.href = window.serverUrl + huodongmoudle + "?huodongid=" + huodongid +
					"&shopid=" + shopid + "&fromuser=" + fromuser + "&userid=" + userid;
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert("请求失败");
			}
		});
		me.strat();
	};

	//微信授权 获取code
	xx_Dshowweixin.prototype.start = function() {
		//alert(return);
		var code = getUrlParam('code');
		var app = getUrlParam('app');
		if(code == null || code == "") {
			alert("登录失败");
			window.location.href = app;
		} else {
			window.location.href = app + "&rcode=" + code;
		}
	}

	xx_Dshowweixin.prototype.wxinit = function(nonceStr, signature, timestamp, nowurl) {
		wx.config({
			debug: false,
			appId: "wx3394377d7e06a7cc",
			timestamp: timeStamp,
			nonceStr: nonceStr,
			signature: signature,
			jsApiList: ["updateTimelineShareData", "updateAppMessageShareData", "getLocation", "openLocation"],
		});
		wx.ready(function() {
			console.log("wx111.ready");
			var shareData = {
				title: localStorage.getItem("huotitle"),
				desc: localStorage.getItem("huosubtitle"),
				link: nowurl,
				imgUrl: "http://www.xinxingtech.com.cn/huodong/img/1024.png",
				success: function() {
					// alert('分享成功');
				},
				cancel: function() {
					// alert('分享失败');  
				}
			};
			// 分享到朋友圈
			wx.updateTimelineShareData(shareData);
			// 分享给朋友   
			wx.updateAppMessageShareData(shareData);
		});
		$("#xx_Dshowlocationicon").click(function() {
			console.log("locationinit");
			//wxopenlocation();
		});
	};

	xx_Dshowweixin.prototype.wxopenlocation = function() {
		wx.getLocation({
			type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
			success: function(res) {
				nowlat = res.latitude; // 纬度，浮点数，范围为90 ~ -90
				nowlon = res.longitude; // 经度，浮点数，范围为180 ~ -180。
				nowspeed = res.speed; // 速度，以米/每秒计
				nowaccuracy = res.accuracy; // 位置精度
			}
		});
		wx.openLocation({
			latitude: resultzb[1], // 纬度，浮点数，范围为90 ~ -90
			longitude: resultzb[0], // 经度，浮点数，范围为180 ~ -180。
			name: localStorage.getItem("shopfullname"), // 位置名
			address: localStorage.getItem("shopaddress"), // 地址详情说明
			scale: 12, // 地图缩放级别,整形值,范围从1~28。默认为最大
			infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
		});
	};

	xx_Dshowweixin.prototype.wxlocationchange = function(BD09location) {
		var lat = localStorage.getItem("shoplat");
		var tofloat_lat = parseFloat(lat);
		var lon = localStorage.getItem("shoplon");
		var tofloat_lon = parseFloat(lon);
		console.log("转化前的百度坐标BD09:", tofloat_lon, tofloat_lat)
		var resultzb = gcoord.transform(
			[tofloat_lon, tofloat_lat], // 经纬度坐标
			gcoord.BD09,
			gcoord.GCJ02
		);
		console.log("转化后的腾讯坐标系GCJ02:", resultzb)
	};

	xx_Dshowweixin.prototype.onBridgeReady = function() {
		WeixinJSBridge.invoke(
			'getBrandWCPayRequest', {
				"appId": appId, //公众号名称，由商户传入     
				"timeStamp": timeStamp, //时间戳，自1970年以来的秒数     
				"nonceStr": nonceStr, //随机串     
				"package": package,
				"signType": signType, //微信签名方式：     
				"paySign": paySign //微信签名 
			},
			function(res) {
				//alert(res.err_msg);
				if(res.err_msg == "get_brand_wcpay_request:ok") {
					// 使用以上方式判断前端返回,微信团队郑重提示：
					//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
					window.location.reload();
					var joinNowbtn = document.getElementById("joinNowbtn");
					joinNowbtn.innerText = "已报名,点击展示核销码";
					joinNowbtn.style.background = "rgb(63,136,231)";
					CheXing = CheXing;
					ChePai = ChePai;
					Phone = Phone;
					$.ajax({
						url: window.serverUrl + "b4huodong/app/huodong?command=gethuodonguser&userid=" + userid + "&huodongid=" + huodongid +
							"&shopid=" + shopid,
						type: "get",
						async: false,
						success: function(data) {
							var info = data.data;
							paystatus = info.PayStatus;
							payorder = info.PayOrder;
							if(paystatus == "1") {
								xx_Dshowcode.tohexiao(payorder);
							}
						}
					});
				} else {
					//alert(res.err_msg);
					alert("支付失败");
				}
			});
	};
	var appId, nonceStr, package, paySign, signType, timeStamp;
	xx_Dshowweixin.prototype.wexinpayapi = function(data) {
		var info = data.payInfo;
		if(data.msg == "SUCCESS") {
			//alert( info.appId);
			appId = info.appId;
			nonceStr = info.nonceStr;
			package = info.package;
			paySign = info.paySign;
			signType = info.signType;
			timeStamp = info.timeStamp;
			//alert("sign",info.paySign)
			//alert("WeixinJSBridgeundefined")
			if(typeof WeixinJSBridge == "undefined") {
				if(document.addEventListener) {
					document.addEventListener('WeixinJSBridgeReady', me.onBridgeReady, false);
				} else if(document.attachEvent) {
					document.attachEvent('WeixinJSBridgeReady', me.onBridgeReady);
					document.attachEvent('onWeixinJSBridgeReady', me.onBridgeReady);
				}
			} else {
				me.onBridgeReady();
			}
		} else {
			alert("请求失败" + data.msg);
		}
	}

	return new xx_Dshowweixin();
});