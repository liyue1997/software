var appId, nonceStr, package, paySign, signType, timeStamp;
/*$.ajax({
	url: window.serverUrl + "b4huodong/app/huodong?command=wxshare&url=http://127.0.0.1",
	type: "get",
	success: function(data) {
		var info = data.payInfo;
		appId = info.appId;
		nonceStr = info.nonceStr;
		signature = info.paySign;
		timeStamp = info.timeStamp;
	},
	error: function(data) {
		alert("请求失败");
		limit = true;
	}
});*/

function initshare(){
	console.log("shareready");
	wx.config({
		debug: false,
		appId: "wx3394377d7e06a7cc",
		timestamp: "1572853735",
		nonceStr: "xzgT5MyRglxH1MonkH250tWWuPiOTeYs",
		signature: "43c0ba963d548eddcd95dbce841d840acadf0f11",
		jsApiList: ["updateTimelineShareData", "updateAppMessageShareData"],
	});
	wx.ready(function() {
		console.log("wx.ready");
		var shareData = {
			title: localStorage.getItem("huoname"),
			desc: localStorage.getItem("huosubtitle"),
			link: "http://www.xinxingtech.com.cn/huodong/index.html",
			imgUrl: "img/1024.png",
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
}