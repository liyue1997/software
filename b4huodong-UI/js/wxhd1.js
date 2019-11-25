function getLocation() {
	window.location.href = "http://www.xinxingtech.com.cn/huodong/camera.html";
}

function getLocation2() {
	window.location.href = "http://www.xinxingtech.com.cn/huodong/camera2.html";
}

//提交表单信息验证
var limit = true;
var appId, nonceStr, package, paySign,signType,timeStamp;
function joinNow() {
	

	if(limit) {
		limit = false;
		alert("请求服务器,成功后支付");
		
				function onBridgeReady() {
					alert('onBridgeReady v1' );
					WeixinJSBridge.invoke(
						'getBrandWCPayRequest', {
							"appId": "wx3394377d7e06a7cc", //公众号名称，由商户传入     
							"timeStamp": "1572575147", //时间戳，自1970年以来的秒数     
							"nonceStr": "oaK1sy6iNp2VNaNDAAWKAbNCQmQnwRYj", //随机串     
							"package": "prepay_id=wx011025477608829f24c8755e1044453600",
							"signType": "MD5", //微信签名方式：     
							"paySign": "CB558148D1E69DF2C25717387D886B4F" //微信签名 
						},
						function(res) {
							alert(res.err_msg);
							if(res.err_msg == "get_brand_wcpay_request:ok") {
								// 使用以上方式判断前端返回,微信团队郑重提示：
								//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
							}
						});
				}
		
					//alert("sign",info.paySign)
					//alert("WeixinJSBridgeundefined")
					if(typeof WeixinJSBridge == "undefined") {
						if(document.addEventListener) {
							document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
						} else if(document.attachEvent) {
							document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
							document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
						}
					} else {
						onBridgeReady();
					}
			        limit = true;
				
	}
}

//table查看更多，请求数据
$("#gengduo").on('click', function() {
	var page = parseInt(document.getElementById("page").value);
	jishu += 10;
	var shuliang = 8069 - jishu;
	$.ajax({
		url: "",
		type: "post",
		dataType: "text",
		data: {
			page: page,
			aid: 28,
			shuliang: shuliang
		},
		success: function(data) {
			if(data) {
				$('#table_a').append(data);
				page += 1;
				$('#page').val(page);
			} else {
				$('#gengduo').html('无更多数据');
			}
		},
	});
});