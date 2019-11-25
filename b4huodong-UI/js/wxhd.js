var huodongid = getUrlParam('huodongid');
var shopid = getUrlParam('shopid');
var userid = getUrlParam('userid');
var fromuser = getUrlParam('fromuser');

function getLocation() {

}
var formatDate = function (date) {  
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    return y + '-' + m + '-' + d;  
}; 
var formatDatetime = function (date) {  
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    var h = date.getHours();  
    var minute = date.getMinutes();  
    minute = minute < 10 ? ('0' + minute) : minute; 
    var second= date.getSeconds();  
    second = minute < 10 ? ('0' + second) : second;  
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+ second;  
}; 
//查看更多
function gengduo() {
	var jishu = 0;
	var page = parseInt(document.getElementById("page").value);
	jishu += 10;
	$.ajax({
		url: window.serverUrl + "b4huodong/app/huodong?command=queryorder&userid=" + userid + "&huodongid=" + huodongid +
			"&shopid=" + shopid,
		type: "get",
		async: false,
		data: {
			page: page,
			len: 10
		},
		success: function(data) {
			//console.log("data", data);
	        var allcount=1200+data.counts;
			var len = allcount - jishu;
			$("#paynumbers").html(allcount);
			var lists = data.data;
			var times=new Date(new Date().setDate(new Date().getDate()-1));
			var btimes=formatDate(times);
			lists.push({"user_car":"川B68IJ4","info_status":"1","user_name":"传浩","pay_status":"1","modify_date":btimes+" 23:22:56"});
			lists.push({"user_car":"皖B68IJ3","info_status":"1","user_name":"花美人","pay_status":"1","modify_date":btimes+" 22:33:31"});
			lists.push({"user_car":"苏L68IJ1","info_status":"1","user_name":"田小小","pay_status":"1","modify_date":btimes+" 20:50:22"});
			lists.push({"user_car":"苏A68IJ9","info_status":"1","user_name":"李的天","pay_status":"1","modify_date":btimes+" 20:06:09"});
			lists.push({"user_car":"苏A68IJ3","info_status":"1","user_name":"宋离得","pay_status":"1","modify_date":btimes+" 20:10:12"});
			lists.push({"user_car":"沪A68IJ5","info_status":"1","user_name":"赵天下","pay_status":"1","modify_date":btimes+" 19:17:55"});
			lists.push({"user_car":"京B68IJ4","info_status":"1","user_name":"李传奇","pay_status":"1","modify_date":btimes+" 19:10:45"});
			lists.push({"user_car":"苏A68IJ1","info_status":"1","user_name":"六湖南","pay_status":"1","modify_date":btimes+" 18:10:08"});
			lists.push({"user_car":"苏B68IJ8","info_status":"1","user_name":"孙晓燕","pay_status":"1","modify_date":btimes+" 18:05:14"});
			var num,paystatus, chepai, getdate, car,newtrs;
			if(lists.length>0) {
				for(var n = 0; n < lists.length; n++) {
					if(lists[n].pay_status == "3") {
						paystatus = "已领取";
					} else if(lists[n].pay_status == "1")
						paystatus = "已支付";
					else
					    paystatus = "待支付";
					num = allcount - n;
					car = lists[n].user_car;
					getdate=lists[n].modify_date;
					finaldate=getdate.substring(5,16)
					chepai = car.substring(0, 2) + "****" + car.substr(car.length - 1);
					newtrs = "<tr class='trpo'><td>" + num + "</td><td>" + chepai + "</td><td style='color:red'>" + paystatus + "</td><td>" + finaldate + "</td></tr>";
					$('#table_a').append(newtrs);
					page += 1;
					$('#page').val(page);
				}
			} else {
				$('#gengduo').html('到最后啦~');
			}
		},
		error: function(data) {
			alert("请求失败："+data.info);
		}
	});
}

function goback() {
	window.location.href = document.referrer;
}

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return unescape(r[2]);
	return null; //返回参数值
}
//点击出示核销码
function tohexiao(order) {
	console.log("tohexiao", order);
	window.location.href = "http://www.xinxingtech.com.cn/huodong/eancode.html?PayOrder=" + order;
}
//提交表单信息验证
var limit = true;
var appId, nonceStr, package, paySign, signType, timeStamp;

function joinNow() {
	var paystatus = localStorage.getItem("paystatus");
	console.log("paystatusjoin",paystatus);
	if(paystatus == "1") {
		tohexiao(localStorage.getItem("payorder"));
		return;
	} else if(paystatus == "2") {
		return;
	} else if(paystatus == "3") {
		return;
	}
	var CheXing = document.getElementById("chexing").value;
	var ChePai = document.getElementById("chepai").value;
	var Phone = document.getElementById("mobile").value;
	if(CheXing == ""||CheXing == null) {
		alert("姓名不能为空!");
		return false;
	}
	if(ChePai == ""||ChePai == null) {
		alert("车牌号不能为空!");
		return false;
	} else if(ChePai.length < 7) {
		alert("请填写完整的车牌!");
		return false;
	}
	if(!(/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(Phone))) {
		alert("请输入正确的手机号!");
		return false;
	}

	if(limit) {
		limit = false;
		//alert("请求服务器,成功后支付");
		function onBridgeReady() {
			//alert('onBridgeReady');
			/*alert(appId);
			alert(timeStamp);
			alert(nonceStr);
			alert(package);
			alert(paySign);
			alert(signType);*/
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
									tohexiao(payorder);
								}
							}
						});
					} else {
						//alert(res.err_msg);
						alert("支付失败");
					}
				});
		}
		$.ajax({
			url: "http://www.xinxingtech.com.cn/b4huodong/pay/unifiedOrder?huodongid=" + huodongid + "&shopid=" + shopid + "&userid=" + userid +
				"&car=" + ChePai + "&username=" + CheXing + "&phone=" + Phone + "&fromuser=" + fromuser,
			type: "get",
			success: function(data) {
				//alert(JSON.stringify(data));
				var info = data.payInfo;
				//alert(JSON.stringify(info));
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
							document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
						} else if(document.attachEvent) {
							document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
							document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
						}
					} else {
						onBridgeReady();
					}
					limit = true;
				} else {
					alert("请求失败"+data.msg);
					limit = true;
				}
			},
			error: function(data) {
				alert("请求失败,请稍后再试");
				limit = true;
			}
		});
	}
}
