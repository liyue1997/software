define(function(require) {
	var $ = require("jquery"),
		Base = require('page/Base'),
		controller = require('page/BaseController'),
		template = require('text!./huodong.html'),
		xx_Dshow = require('xxDshow'),
		xx_Chepai = require('xxChepai'),
		tbase = require('tbase'),
		webjs = require('webjs'),
		wx = require('wx'),
		webpost = require('webpost');

	require('css!./huodong.css');

	/**
	 * 对外暴露函数，用于视图加载
	 */
	var Appid = "wx3394377d7e06a7cc";
	var huodongid = localStorage.getItem("huodongid"),
		shopid = localStorage.getItem("shopid"),
		userid = localStorage.getItem("userid"),
		fromuser = localStorage.getItem("fromuser");
	
	var load = function() {
		
		render();
		bind();
		run();

	};

	/**
	 * 视图渲染
	 */
	function render() {
		controller.setTemplate(template);
		controller.render(Base.getViewContainer());
		
        getHuodongInfo(showHaibao);
        getOdersinfo();
        showChePai();
	}
		
	/**
	 * 事件绑定
	 */
	function bind() {
		//立即报名
		$("#xx_baomingbtn").click(function(e) {
             baomingHandle(e);
		});

		//我也要创建
		$("#xx_HuodongApplydiv b").click(function() {
			event.preventDefault();
			$(".xx_HuodongApplyformdiv").fadeIn();
		});
		//提交
		$("#xx_huodongapplybtn").click(function(e) {
             ApplyHandle(e);
		});
		//取消
		$("#xx_huodongapplyclose").on("click", function(event) {
			if($(event.target).is("#xx_huodongapplyclose") || $(event.target).is(".fixregisterbox")) {
				event.preventDefault();
				$(".xx_HuodongApplyformdiv").hide();
			}
		})
        //定位绑定
		$("#xx_Dshowlocationicon").click(function() {
			console.log("定位");
			wxlocationchange();
		});
	}
	
	/**
	 * 移除事件绑定
	 */
	function unbind(){
		
	}
    /**
     * 开始运行 
     */
	function run() {
		// $('.view-container').css('background-image','');
        wxShare();
	}


	function getHuodongInfo(pichandle)
	{
		//活动模板信息
		webjs.pushdata("app/huodong", "gethuodonguser", "&userid=" + userid + "&huodongid=" + huodongid + "&shopid=" + shopid, function(data) {
			//console.log(data);
			var info = data.data;
			localStorage.setItem("huotitle", info.HuodongTitle);
			localStorage.setItem("huosubtitle", info.HuodongSubtitle);
			localStorage.setItem("shopfullname", info.ShopFullname), // 位置名
				localStorage.setItem("shopaddress", info.ShopAddress), // 地址详情说明
				$("title").html(info.HuodongTitle);
			$("#xx_ShopInfoshopname").text(info.ShopFullname);
			$("#xx_ShopInfoshopaddress").text(info.ShopAddress);
			$("#xx_ShopInfoshoptel").text(info.ShopTel);
			$("#xx_ShopInfoshoptela").href = "tel:" + info.ShopTel;
			if(info.PayStatus == "1" || info.PayStatus == "3") {
				$("#xx_HuodongInfonameinput").val(info.UserName);
				$("#xx_Dshowchepainum").val(info.UserCar);
				$("#xx_Dshowchepainum").show();
				$("#xx_compChepai").hide();
				$("#xx_HuodongInfophoneinput").val(info.UserPhone);
				$("#xx_HuodongInfophoneinput").attr("readonly", "readonly");
				$("#xx_HuodongInfonameinput").attr("readonly", "readonly");
				$("#xx_Dshowchepainum").attr("readonly", "readonly");
			};
			if(info.PayStatus == "1") { //已支付
				$("#xx_baomingbtn").text("已报名，点击展示核销码");
				$("#xx_baomingbtn").css("background", "rgb(63,136,231)");
				localStorage.setItem("paystatus", info.PayStatus);
				localStorage.setItem("payorder", info.PayOrder);
			} else if(info.PayStatus == "3") {
				$("#xx_baomingbtn").text("已核销");
				$("#xx_baomingbtn").css("background", "rgb(63,136,231)");
				$("#xx_baomingbtn").attr("disabled", "disabled");
			} else if(info.HuodongStatus == "0") {
				$("#xx_baomingbtn").text("活动尚未开始");
				$("#xx_baomingbtn").css("background", "rgb(173,173,174)");
				$("#xx_baomingbtn").attr("disabled", "disabled");
			} else if(info.HuodongStatus == "2") {
				$("#xx_baomingbtn").text("活动已结束");
				$("#xx_baomingbtn").css("background", "rgb(173,173,174)");
				$("#xx_baomingbtn").attr("disabled", "disabled");
			} else if(info.HuodongStatus == "3") {
				$("#xx_baomingbtn").text("活动已取消");
				$("#xx_baomingbtn").css("background", "rgb(173,173,174)");
				$("#xx_baomingbtn").attr("disabled", "disabled");
			} else if(info.HuodongStatus == "4") {
				$("#xx_baomingbtn").text("已核算");
				$("#xx_baomingbtn").css("background", "rgb(173,173,174)");
				$("#xx_baomingbtn").attr("disabled", "disabled");
			} else {
				localStorage.setItem("paystatus", "0");
			}

			localStorage.setItem("shoplat", info.ShopLat);
			localStorage.setItem("shoplon", info.ShopLon);
			
			pichandle(info.HuodongHb);
			
			
		}, function(err) {
			tbase.showerr(err);
		});
	}
    
    function showHaibao(pics){
    	//console.log("pics",pics.split(","));
    	var haibaolist=pics.split(",");
    	var poped=haibaolist.pop();
    	//console.log("dellast",haibaolist);
    	/*轮播图*/
			var options = {
				//elem: '#carousel',
				root: "#xx_PicsDy",
				anim: 'fade',
				delay: 2000,
				/*传入图片地址数组*/
				piclist:haibaolist
			};
			xx_Dshow.init(options);
    }
    
    function showChePai(){
    	
		/*车牌*/
		var Chepai = {
			CarContainer: '#xx_compChepai',
		};
		xx_Chepai.init(Chepai);
    }

	function getOdersinfo() {
		var jishu = 0;
		var page = parseInt(document.getElementById("page").value);
		jishu += 2;
		webjs.pushdata("app/huodong", "queryorder", "&userid=" + userid + "&huodongid=" + huodongid + "&shopid=" + shopid +
			"&len=2&page=" + page,
			function(data) {
				//console.log("11", data);
				$('#xx_InfoTable tbody').empty();
				//console.log("data", data);
				var allcount = 1200 + data.counts;
				var len = allcount - jishu;
				var lists = data.data;
				var times = new Date();
				for(var n = 0; n < lists.length; n++) {
					times = tbase.stringToDate(lists[n].modify_date.substring(0, 10), '-');
				}
				times = new Date(new Date().setDate(times.getDate() - 1));
				var btimes = formatDate(times);
				console.log("btimes", btimes);
				lists.push({
					"user_car": "川B68IJ4",
					"info_status": "1",
					"user_name": "传浩",
					"pay_status": "1",
					"modify_date": btimes + " 23:22:56"
				});
				lists.push({
					"user_car": "皖B68IJ3",
					"info_status": "1",
					"user_name": "花美人",
					"pay_status": "1",
					"modify_date": btimes + " 22:33:31"
				});
				lists.push({
					"user_car": "苏L68IJ1",
					"info_status": "1",
					"user_name": "田小小",
					"pay_status": "1",
					"modify_date": btimes + " 20:50:22"
				});
				lists.push({
					"user_car": "苏A68IJ9",
					"info_status": "1",
					"user_name": "李的天",
					"pay_status": "1",
					"modify_date": btimes + " 20:06:09"
				});
				lists.push({
					"user_car": "苏A68IJ3",
					"info_status": "1",
					"user_name": "宋离得",
					"pay_status": "1",
					"modify_date": btimes + " 20:10:12"
				});
				lists.push({
					"user_car": "沪A68IJ5",
					"info_status": "1",
					"user_name": "赵天下",
					"pay_status": "1",
					"modify_date": btimes + " 19:17:55"
				});
				lists.push({
					"user_car": "京B68IJ4",
					"info_status": "1",
					"user_name": "李传奇",
					"pay_status": "1",
					"modify_date": btimes + " 19:10:45"
				});
				lists.push({
					"user_car": "苏A68IJ1",
					"info_status": "1",
					"user_name": "六湖南",
					"pay_status": "1",
					"modify_date": btimes + " 18:10:08"
				});
				lists.push({
					"user_car": "苏B68IJ8",
					"info_status": "1",
					"user_name": "孙晓燕",
					"pay_status": "1",
					"modify_date": btimes + " 18:05:14"
				});
				var num, paystatus, chepai, getdate, car, newtrs;
				if(lists.length > 0) {
					for(var n = 0; n < lists.length; n++) {
						if(lists[n].pay_status == "3") {
							paystatus = "已领取";
						} else if(lists[n].pay_status == "1")
							paystatus = "已支付";
						else
							paystatus = "待支付";
						num = allcount - n;
						car = lists[n].user_car;
						getdate = lists[n].modify_date;
						finaldate = getdate.substring(5, 16)
						chepai = car.substring(0, 2) + "****" + car.substr(car.length - 1);
						newtrs = "<tr class='trpo'><td>" + num + "</td><td>" + chepai + "</td><td>" + paystatus + "</td><td>" + finaldate + "</td></tr>";
						$('#xx_InfoTable tbody').append(newtrs);
						page += 1;
						$('#page').val(page);
					}
				} else {
					$('#gengduo').html('到最后啦~');
				}
			},
			function(err) {
				tbase.showerr(err);
			});
	}
	
    function baomingHandle(e){
			if(localStorage.getItem("paystatus") == "1") {
//				location.hash = "#hexiaopage";
				require(['page/hexiaopage/hexiaopage'], function(view) { 	
                      view.load();
                });
                return;
			} else {
				var name = tbase.checkinput("xx_HuodongInfonameinput", true, "", "", "姓名不能为空");
				var phone = tbase.checkinput("xx_HuodongInfophoneinput", true, "", /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/, "请填写正确的手机号！");
				var chepai = tbase.checkinput("xx_Dshowchepainum", true, "", /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z0-9]{5}$/, "请填写正确的车牌号！");
				if(phone == null || name == null || chepai == null) return;
				webjs.paydata("pay/unifiedOrder", "&huodongid=" + huodongid + "&shopid=" + shopid +
					"&userid=" + userid + "&car=" + $("#xx_Dshowchepainum").val() +
					"&username=" + $("#xx_HuodongInfonameinput").val() + "&phone=" + $("#xx_HuodongInfophoneinput").val() + "&fromuser=" + fromuser,
					function(data) {
						//console.log("pay/unifiedOrder", data);
						var info = data.payInfo;
						if(data.msg = "SUCCESS") {
							nonceStr = info.nonceStr,
								package = info.package,
								paySign = info.paySign,
								signType = info.signType,
								timeStamp = info.timeStamp;
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
						} else {
							tbase.showmsg("报名失败")
						}
					},
					function(err) {
						console.log("pay/unifiedOrder", err);
						tbase.showerr(err);
					});
			}
    }

    function ApplyHandle(e){
			var InputCompany = tbase.checkinput("xx_HuodongApplyInputCompany", true, "", "", "请填写公司名称！");
			var InputAddress = tbase.checkinput("xx_HuodongApplyInputAddress", true, "", "", "请填写公司地址!");
			var InputUsername = tbase.checkinput("xx_HuodongApplyInputUsername", true, "", "", "姓名不能为空！");
			var InputUserphone = tbase.checkinput("xx_HuodongApplyInputUserphone", true, "", /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/, "请填写正确的手机号!");
			if(InputCompany == null || InputAddress == null || InputUsername == null || InputUserphone == null) return;
			var token = localStorage.getItem("token");
			var timestamp = (new Date()).valueOf();
			var data = {
				"baomingId": timestamp,
				"handleStatus": "0",
				"shopName": $("#xx_HuodongApplyInputCompany").val(),
				"shopAddress": $("#xx_HuodongApplyInputAddress").val(),
				"shopContact": $("#xx_HuodongApplyInputUsername").val(),
				"shopTel": $("#xx_HuodongApplyInputUserphone").val()
			};
			webpost.postdata("/api/HdBaoming/addobj", data, function(data) {
				if(data.code = "201") {
					tbase.showmsg("申请信息已成功提交！");
					$(".xx_HuodongApplyformdiv").hide();
				} else {
					tbase.showmsg("申请失败~");
					$(".xx_HuodongApplyformdiv").hide();
				}
			}, function(err) {
				tbase.showmsg("申请失败~");
				$(".xx_HuodongApplyformdiv").hide();
			});
}

    function wxShare(){
    	var nonceStr, package, paySign, signType, timeStamp;
		var nowurl = window.serverUrl + "huodong/index.html?huodongid=" + huodongid + "&shopid=" + shopid + "&fromuser=" + userid;
		var cururl = window.location.href;
		var changeurl = cururl.split('#')[0].replace(/&/g, "_"); //window.serverUrl +"huodong/index.html";// cururl.replace(/&/g, "_");
		//console.log("changeurl", changeurl);
		webjs.pushdata("app/huodong", "wxshare", "&url=" + changeurl, function(data) {
			//console.log("wxsharesigndata", data)
			var info = data.data;
			//console.log("wxinit", data);
			wx.config({
				debug: false,
				appId: Appid,
				timestamp: info.timestamp,
				nonceStr: info.noncestr,
				signature: info.signature,
				jsApiList: ["updateTimelineShareData", "updateAppMessageShareData", "getLocation", "openLocation"],
			});
			wx.ready(function() {
				//console.log("wx111.ready", wx);
				var shareData = {
					title: localStorage.getItem("huotitle"),
					desc: localStorage.getItem("huosubtitle"),
					link: nowurl,
					imgUrl: "https://xinxing-1259797882.cos.ap-shanghai.myqcloud.com/image/xinxing1024.png",
					success: function() {
						//tbase.showmsg("分享成功");
					},
					cancel: function() {
						//tbase.showmsg("分享失败");
					}
				};
				// 分享到朋友圈
				wx.updateTimelineShareData(shareData);
				// 分享给朋友   
				wx.updateAppMessageShareData(shareData);

			});
		}, function(err) {
			tbase.showerr(err);
		});
    }

	//支付
	function onBridgeReady() {
		WeixinJSBridge.invoke(
			'getBrandWCPayRequest', {
				"appId": Appid, //公众号名称，由商户传入     
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
			        getHuodongInfo(function(pics){});
			        getOrdersInfo();
				} else {
					//alert(res.err_msg);
					tbase.showmsg("支付失败");
				}
			});
	};

	function wxlocationchange() {
		var gcoord, resultzb;
		require(['gcoord'], function(gcoord) {
			gcoord = gcoord;
			var lat = localStorage.getItem("shoplat");
			var tofloat_lat = parseFloat(lat);
			var lon = localStorage.getItem("shoplon");
			var tofloat_lon = parseFloat(lon);
			resultzb = gcoord.transform([tofloat_lon, tofloat_lat], gcoord.BD09, gcoord.GCJ02);
			console.log("转化后的腾讯坐标系GCJ02:", resultzb);
			if(resultzb != null) {
				wx.openLocation({
					latitude: resultzb[1], // 纬度，浮点数，范围为90 ~ -90
					longitude: resultzb[0], // 经度，浮点数，范围为180 ~ -180。
					name: localStorage.getItem("shopfullname"), // 位置名
					address: localStorage.getItem("shopaddress"), // 地址详情说明
					scale: 12, // 地图缩放级别,整形值,范围从1~28。默认为最大
					infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
				});
			} else
				tbase.showmsg("定位失败");
		});

	};
	
   var formatDate = function(date) {
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		return y + '-' + m + '-' + d;
	};
   var formatDatetime = function(date) {
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		var minute = date.getMinutes();
		minute = minute < 10 ? ('0' + minute) : minute;
		var second = date.getSeconds();
		second = minute < 10 ? ('0' + second) : second;
		return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
	};

	return {
		load: load
	};
});