define(function(require) {
	// 获取数据，给组件，然后组装
	var tbase = require("tbase");
	var webjs = require("webjs");
	var openid;
	var huodongid;
	var shopid;
	var fromuser;
	var Appid = "wx3394377d7e06a7cc";

	var xx_Dshowweixin = require("xx_Dshowweixin");
	//xx_Dshowweixin.wxauthor(openid, Appid, huodongid, shopid, fromuser);
	//xx_Dshowweixin.wxinit();
	var xx_Dshow = require("xx_Dshow_09");
	var xx_chepai = require("xx_chepai");
	var xx_Dshowtable = require("xx_Dshowtable");
	var xx_Dshowcheckinfo = require("xx_Dshowcheckinfo");
	var xx_Dshowcreathd = require("xx_Dshowcreathd");
	var xx_Dshowcode=require("xx_Dshowcode");

	console.log(xx_Dshow.getjsversion());
	//	window.prefix = "http://www.xinxingtech.com.cn/b4huodong/";
	window.prefix = "http://127.0.0.1:8089/b4huodong";
	window.serverUrl = "http://www.xinxingtech.com.cn/";
	// var huodongInfoData ={
	// 	   title:"11",
	// 	   subtitle:"2323",
	// 	   haibaoPics:{},
	// 	   payMoeny:"",
	// 	   shopmodule:"simshopmodule",
	// 	   huodongmodule:"",
	// }
	// 
	// function getUserInfo(){
	// 	
	// }
	// function showHuodonginfo(data){
	// 	   var data=huodongInfoData;
	// 	   //以轮播形式展现海报图片 通用 tool类型
	// 	   showPicsDy(data.haibaoPics);
	// 	   //显示门店活动信息 项目 业务类型
	//     //门店活动项目内，也会根据门店用户的需求，展现不同的界面
	// 	   showShopHuodongInfo(shopmodule,huodongmodule,data);
	// }
	// function checkHuodongBaoming(){
	// 	
	// }
	// function postHuodongBaoming(){
	// 	
	// }
	// function startPay(){
	// 	
	// }
	// function getPayresult(){
	// 	
	// }
	// 
	// 
	// 
	// 
	// getUserInfo(function(data){
	// 	showHuodonginfo(data);
	// }) ;
	// 
	// 
	// function showPicsDy(pictures){
	//	   var xx_Dshow = require("xx_Dshow_09");
	// 	    /*轮播图*/
	//		var options = {
	//			elem: '#carousel',
	//			anim: 'fade',
	//			delay: 2000,
	//			pictures:pictures
	//		};
	//		//xx_Dshow.init(options);
	//		$(.div).Style("ba")
	// }
	// function showShopHuodongInfo(shopmodule,huodongmodule,data){
	// 	  //shopmodule 模板的名字就是 业务组件的名称
	// 	    loadHuodongCompent(shopmodule,data);
	// 	    //
	// 	    loadHuodongCompent(huodongmodule,data);
	// 	    
	// 	    
	// }

	webjs.pushdata("app/huodong", "gethuodonguser", "&userid=USER201910310074&huodongid=hd201910310035&shopid=op15729149570034", function(data) {
		console.log(data);
		var info = data.data;
		$("#xx_Dshowshopname").text(info.ShopName);
		$("#xx_Dshowshopaddress").text(info.ShopAddress);
		$("#xx_Dshowshoptel").text(info.ShopTel);
		$("#xx_Dshowshoptela").href = "tel:" + info.ShopTel;
		xx_Dshowcheckinfo.checkstatus(info);
		/*轮播图*/
		var options = {
			elem: '#carousel',
			anim: 'fade',
			delay: 2000,
		};
		xx_Dshow.init(options);

		/*分享*/
		var nowurl = window.serverUrl + "huodong/index.html?huodongid=hd201910310035&shopid=op201910300004&fromuser=mark";
		//http://www.xinxingtech.com.cn/huodong/index.html?huodongid=hd201910310035&shopid=op201910300004&fromuser=mark
		var cururl = window.location.href;
		var changeurl = cururl.replace(/&/g, "_");
		webjs.pushdata("app/huodong", "wxshare", "&url=" + changeurl, function(data) {
			console.log("wxsharesigndata", data)
			var info = data.data;
			nonceStr = info.noncestr;
			signature = info.signature;
			timeStamp = info.timestamp;
			signurl = info.url;
			//xx_Dshowweixin.wxinit(nonceStr, signature, timeStamp, nowurl);
		}, function(err) {
			tbase.showerr(err);
		});

		/*车牌*/
		var xx_CarInput = {
			CarContainer: '#xx_Dshowcarinput',
		};
		xx_chepai.init(xx_CarInput);

		/*报名*/
		$("#xx_Dshowjoinbtn").click(function() {
			var xx_Dshowusername = $("#xx_DshowUsernameinput").val();
			var xx_Dshowchepai = $("#xx_Dshowcarinput").data("pai");
			var xx_Dshowphone = $("#xx_DshowPhoneinput").val();
			xx_Dshowcheckinfo.checkform(xx_Dshowusername, xx_Dshowchepai, xx_Dshowphone, function(data) {
				if(data == true) {
					webjs.pushdata("pay/unifiedOrder", "", "&huodongid=hd201910310035&shopid=op15729149570034" +
						"&userid=USER201910310074&car=" + xx_Dshowchepai +
						"&username=" + xx_Dshowusername + "&phone=" + xx_Dshowphone + "&fromuser=mark",
						function(data) {
							success(data);
							console.log(data);
							if(success(data)) {
								xx_Dshowweixin.wexinpayapi(data);
							}
							//xx_Dshowweixin.wechatpayapi();
						},
						function(err) {
							tbase.showerr(err);
						});
				}
			});
		});
		
		/*返回*/
		$("#xx_Dshowreturnbtn").click(function(){
			xx_Dshowcode.returnbtn();
		});

		/*创建*/
		xx_Dshowcreathd.alertregistform();
		$("#xx_regist_box").click(function() {
			xx_Dshowcheckinfo.upregistinfo();
		});

		////	    var xx_info = require("/ceshi/info/xx_info_0.9.js");//车牌 车型
		////	    var xx_info = require("/ceshi/info/xx_info_0.91.js");//车牌 车型 身份证
	}, function(err) {
		tbase.showerr(err);
	});

	/*表格*/
	var xx_MsgTable = {
		MsgTable: '#msgtable',
		tableTag: ['手机', '车牌号码', '报名状态', '报名时间'], //表头信息
		//Rode : "http://www.xinxingtech.com.cn/b4huodong/app/huodong?command=queryorder&userid=USER201910310075&huodongid=hd201910310035&shopid=op15729149570034"
		getPageData: getPageData
	}
	xx_Dshowtable.init(xx_MsgTable);

	function getPageData(pageNum, pagelen, success) {
		webjs.pushdata("app/huodong", "queryorder", "&userid=USER201910310074&huodongid=hd201910310035&shopid=op15729149570034" +
			"&len=" + pagelen + "&page=" + pageNum,
			function(data) {
				success(data);
			},
			function(err) {
				tbase.showerr(err);
			});

	}
});