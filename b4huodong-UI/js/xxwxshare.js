var nonceStr, signType, timeStamp,signurl;
var fromuser = getUrlParam('fromuser');
var huodongid = getUrlParam('huodongid');
var shopid = getUrlParam('shopid');
var userid = getUrlParam('userid');
window.serverUrl="http://www.xinxingtech.com.cn/";
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return unescape(r[2]);
	return null; //返回参数值
}
var nowurl=window.serverUrl+"huodong/index.html?huodongid="+huodongid+"&shopid="+shopid+"&fromuser="+userid;  //http://www.xinxingtech.com.cn/huodong/index.html?huodongid=hd201910310035&shopid=op201910300004&fromuser=mark
var cururl=window.location.href;
//console.log("nowurl",cururl);
var changeurl=cururl.replace(/&/g,"_");
//console.log("changeurl",changeurl);
function initshare() {
	$.ajax({
		url: window.serverUrl + "b4huodong/app/huodong?command=wxshare&url="+changeurl,
		type: "get",
		success: function(data) {
			var info = data.data;
			nonceStr = info.noncestr;
			signature = info.signature;
			timeStamp = info.timestamp;
			signurl=info.url;
			//console.log(data);
			console.log("shareready");
			wx.config({
				debug: false,
				appId: "wx3394377d7e06a7cc",
				timestamp: timeStamp,
				nonceStr: nonceStr,
				signature: signature,
				jsApiList: ["updateTimelineShareData", "updateAppMessageShareData"],
			});
			wx.ready(function() {
				console.log("wx.ready");
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
		},
		error: function(data) {
			alert("请求失败");
		}
	});

}