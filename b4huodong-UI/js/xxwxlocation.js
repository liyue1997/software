var nonceStr, signType, timeStamp, signurl;
var fromuser = getUrlParam('fromuser');
var huodongid = getUrlParam('huodongid');
var shopid = getUrlParam('shopid');
var userid = getUrlParam('userid');
window.serverUrl = "http://www.xinxingtech.com.cn/";

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return unescape(r[2]);
	return null; //返回参数值
}
var nowurl = window.serverUrl + "huodong/index.html?huodongid=" + huodongid + "&shopid=" + shopid + "&fromuser=" + userid; //http://www.xinxingtech.com.cn/huodong/index.html?huodongid=hd201910310035&shopid=op201910300004&fromuser=mark
var cururl = window.location.href;
console.log("nowurl", cururl);
var changeurl = cururl.replace(/&/g, "_");
console.log("changeurl", changeurl);

var nowlat, nowlon, nowspeed, nowaccuracy;

function initlocation() {
	$.ajax({
		url: window.serverUrl + "b4huodong/app/huodong?command=wxshare&url=" + changeurl,
		type: "get",
		success: function(data) {
			var info = data.data;
			nonceStr = info.noncestr;
			signature = info.signature;
			timeStamp = info.timestamp;
			signurl = info.url;
			//console.log(data);
			console.log("shareready");
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
				wx.getLocation({
					type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
					success: function(res) {
						nowlat = res.latitude; // 纬度，浮点数，范围为90 ~ -90
						nowlon = res.longitude; // 经度，浮点数，范围为180 ~ -180。
						nowspeed = res.speed; // 速度，以米/每秒计
						nowaccuracy = res.accuracy; // 位置精度
					}
				});
			});
		},
		error: function(data) {
			alert("请求失败");
		}
	});
}

function weixinlocation() {
	console.log("weixinlocation");
	var lat = localStorage.getItem("shoplat");
	var tofloat_lat = parseFloat(lat);
	var lon = localStorage.getItem("shoplon");
	var tofloat_lon = parseFloat(lon);
	console.log("转化前的百度坐标BD09:",tofloat_lon,tofloat_lat)
	var resultzb = gcoord.transform(
		[tofloat_lon,tofloat_lat], // 经纬度坐标
		gcoord.BD09,
		gcoord.GCJ02
	);
	console.log("转化后的腾讯坐标系GCJ02:",resultzb)
	wx.openLocation({
		latitude: resultzb[1], // 纬度，浮点数，范围为90 ~ -90
		longitude: resultzb[0], // 经度，浮点数，范围为180 ~ -180。
		name: localStorage.getItem("shopfullname"), // 位置名
		address: localStorage.getItem("shopaddress"), // 地址详情说明
		scale: 12, // 地图缩放级别,整形值,范围从1~28。默认为最大
		infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
	});
}