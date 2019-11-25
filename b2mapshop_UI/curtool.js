define(function(require) {
	require("curcheck");
	var jpushInstance=require("$UI/bcommon/jpush");
	var tbase= require("$UI/bcommon/tbase");
	var webjs=require("$UI/bcommon/webjs");
	var webpost = require("$UI/bcommon/webpostjs");
	require("cordova!de.appplant.cordova.plugin.background-mode");
	require("cordova!com.justep.cordova.plugin.weixin.v3");
	var MD5 = require('$UI/system/lib/base/md5');
	var md5 = new MD5();
	//var tim = require("$UI/bcommon/tim");
	//var tim= require ("$UI/p_common/tim" );//聊天功能

	//消息回传给应用处理
	var pbackfuntion=null;

	var curtool = function() {
		jpushInstance.setbackfuntion(pbackfuntion);
		
	};
	
	curtool.prototype.setbackfuntion = function(backfuntion)
	{
		pbackfuntion=backfuntion;
		//jpushInstance.setbackfuntion(pbackfuntion);
	};

	curtool.prototype.tbackfuntion = function(info){
		if (pbackfuntion)
	        pbackfuntion(info); 
	};
	
	curtool.prototype.pswmd5 = function(phone,password)
	{
	    return md5.hex_md5(password);
	};

	curtool.prototype.login = function(phone,password)
	{
		var me = this;
		//login&useraccount=admin&password=1&ver=1.0.1&deviceseq=xxx
		//webjs.postdata("auth/login",{username: phone,password: md5.hex_md5(password)}				,
		webjs.pushdata("app/auth","login","&useraccount=" + phone + "&password=" + this.pswmd5(phone,password) 
				+ "&ver=" + window.ver + "&deviceseq=" + tbase.getseq()+ "&jpushid=" + tbase.getLocalStorage("registrationID"),
				function(data){			
			         me.handledata(me,data);		
			    },
			    function(info){
			    	tbase.showmsg(info);
				});
	};
	curtool.prototype.refresh =function(){
		window.location.href = "./index.w";
	};
	
	curtool.prototype.handledata= function(me,data,openid)
	{

		localStorage.setItem("userid", data.userid);
		localStorage.setItem("credits", data.credits);
		localStorage.setItem("username", data.username);//
		localStorage.setItem("userheadpic", data.userheadpic);
		localStorage.setItem("token", data.token);
		localStorage.setItem("phone", data.phone);
		
		localStorage.setItem("isseq", data.isseq);
		localStorage.setItem("isareward", data.isareward);
		localStorage.setItem("iswxlogin", data.iswxlogin);
		localStorage.setItem("ischatopen", data.ischatopen);
		localStorage.setItem("t_wxid", data.t_wxid);
		//localStorage.setItem("tuserid", data.t_userid);
		localStorage.setItem("tmoneypwd", data.t_moneypwd);
		localStorage.setItem("useraccount", data.useraccount);
		localStorage.setItem("logintype", "7");// 一定要有
		localStorage.setItem("paid", data.paid);
		localStorage.setItem("infoBeforePaid", data.infoBeforePaid);// 购买前提示信息
		localStorage.setItem("infoBeforeUse", data.infoBeforeUse);// 使用前提示信息
		localStorage.setItem("isweixinpay", data.isweixinpay);// 是否显示微信支付
		localStorage.setItem("isweixinwappay", data.isweixinpaywap);// 是否显示微信网页支付
		localStorage.setItem("iszfbpay", data.iszfbpay);// 是否显示支付宝支付
		localStorage.setItem("iszfbpaywap", data.iszfbpaywap);// 是否显示支付宝网页支付
		localStorage.setItem("strPrice", data.strPrice);// 价格
		localStorage.setItem("demolink", data.demolink);// 演示链接
		localStorage.setItem("lawlink", data.lawlink);// 免责链接
		localStorage.setItem("downloadlink", data.downloadlink);// 下载链接
	
		localStorage.setItem("needrefresh", "1");
		localStorage.setItem("imid", data.imid);
		localStorage.setItem("imuid", data.imuid);
		//if (window.plugins){//表示手机 一个用户多个手机，只有最后一个登录的才会收到
		//	jpushInstance.setPushByID(data.userid);
		//	tbase.showmsg(data.userid);
		//}
		
		//tbase.getuserid();
		window.location.href = "./index.w";
		//me.addgroupapplication1(data.t_userid); //处理聊天群组
		
	};
	
	curtool.prototype.wxlogin = function(nickname, headimgurl, openid) {
			var me = this;
			openid=openid.replace("-","");
			openid=openid.replace("_","");
			var platform="";
			var web=tbase.isweb();
			if(web===true){
				platform="web";
			}else{
				var and=tbase.isand();
				if(and===true){
					platform="Android";
				}else{
					platform="ios";
				}
			}
			var seq="";
			if (platform==="web")
			   seq="";
			else
				seq= tbase.uuid;
			//alert("platform:"+platform);
			webjs.pushdata("app/auth","wxlogin", "&uname=" + nickname + "&headimgurl=" + headimgurl 
					+ "&wxid=" + openid + "&ver=" + window.ver + "&deviceseq=" + tbase.getseq()+"&platform="+platform+"&loginseq="+seq
					+ "&jpushid=" + tbase.getLocalStorage("registrationID"), function(data) {
				me.handledata(me,data,openid);

			}, function(info) {
				// alert(info);
				tbase.showmsg(info);
			});
	};
	
	curtool.prototype.geturl=function(name)
	{
		tbase.showdebug("访问page:"+name);
		switch (name)
		{

		    case "main":  return require.toUrl(tbase.getbaseurl()+'main.w');	
		    case "login" :return require.toUrl(tbase.getbaseurl()+'login.w');
		    case "mapshop":  return require.toUrl(tbase.getbaseurl()+'mapshopc.w');	
		    case "shoppage":return require.toUrl(tbase.getbaseurl()+'shoppage.w');
		    case "shoucang":return require.toUrl(tbase.getbaseurl()+'shoucang.w');
		    case "talk":return require.toUrl(tbase.getbaseurl()+'talk.w');
		    case "setting":return require.toUrl(tbase.getbaseurl()+'setting.w');
		    case "zuduimsg":return require.toUrl(tbase.getbaseurl()+'zuduimsg.w');
		    case "fabiao":return require.toUrl(tbase.getbaseurl()+'fabiao.w');
		    case "registe":return require.toUrl(tbase.getbaseurl()+'registe.w');
		    case "forgetpwd":return require.toUrl(tbase.getbaseurl()+'forgetpwd.w');
		    case "debugpage":return require.toUrl(tbase.getbaseurl()+'debugpage.w');
		    case "left":return require.toUrl(tbase.getbaseurl()+'left.w');
		    case "tencentIM":return require.toUrl(tbase.getbaseurl()+'tencentIM.w');
		    case "TIMMessage":return require.toUrl(tbase.getbaseurl()+'base/message.w');
		    case "TIMMain":return require.toUrl(tbase.getbaseurl()+'TalkDemo/timMain.w');
		    case "TIMlist":return require.toUrl(tbase.getbaseurl()+'TalkDemo/talklist.w');
		    case "TIMmessage":return require.toUrl(tbase.getbaseurl()+'TalkDemo/base/message.w');
		    
		    case "wap" : return require.toUrl('$UI/bcommon/wap.w');
		    //case "show" : return require.toUrl('$UI/p_common/show.w');
		    //case "consolelog" : return require.toUrl('$UI/p_common/consolelog.w');
		    //case "commconUploadControl" : return require.toUrl('$UI/p_common/2alyupload/aliyun.w');
		    //case "shareCommon" : return require.toUrl('$UI/p_common/shareCommon.w');
		
		    //case "city": return require.toUrl('$UI/p_common/city.w');
		    
		    case "about": return require.toUrl(tbase.getbaseurl()+'other/about.w');
		    case "page_other_resetpassword":return require.toUrl(tbase.getbaseurl()+'other/page_other_resetpassword.w');
		    case "page_other_updatetpassword":return require.toUrl(tbase.getbaseurl()+'other/page_other_updatetpassword.w');
		    case "page_other": return require.toUrl(tbase.getbaseurl()+'other/page_other.w');
		    
		    case "commonMap": return require.toUrl(tbase.getbaseurl()+'map/commonMap.w');
			 
		    case "register": return require.toUrl(tbase.getbaseurl()+'register.w');
		    case "picview":return require.toUrl(tbase.getbaseurl()+'picview.w');
		    case "agreement":return require.toUrl(tbase.getbaseurl()+'agreement.w');
		    
		    case "oilmain":  return require.toUrl(tbase.getbaseurl()+'pages/oilMain.w');	
		    case "mainbasics":  return require.toUrl(tbase.getbaseurl()+'pages/minebasics.w');	
	    
		}

		tbase.showdebug("访问未定义page:"+name);
		return require.toUrl(name);
	};
	
	curtool.prototype.logout=function()
	{
		localStorage.setItem("userid", "");
		localStorage.setItem("username", "");
		localStorage.setItem("credits", "");
		localStorage.setItem("userheadpic", "");
		if (navigator.alipay)
        {
	        jpushInstance.setPushByID("");
         }
		//有聊天功能的就用 tim.imlogout 没有的用 tbase.logout
		//tbase.logout();
		//tim.imlogout();
		window.location.href = "./index.w";
	};
	
	curtool.prototype.Rad=function(d){
	       return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
	 };
	 //计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
	 curtool.prototype.GetDistance=    function (lat1,lng1,lat2,lng2){
	 
	        var radLat1 = this.Rad(lat1);
	        var radLat2 = this.Rad(lat2);
	        var a = radLat1 - radLat2;
	        var  b = this.Rad(lng1) - this.Rad(lng2);
	        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
	        Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
	        s = s *6378.137 ;// EARTH_RADIUS;
	        s = Math.round(s * 10000) / 10; //输出为米
	        //s=s.toFixed(4);
	        return s;
	    };
	 curtool.prototype.GetDistanceStr = function (lat1,lng1,lat2,lng2){
		var dis= this.GetDistance(lat1,lng1,lat2,lng2);
		if (dis >1000)
			return (dis/1000).toFixed(2) +"公里";
		return dis.toFixed(2) +"米";
		
	 };
	 curtool.prototype.getcrulon=function(){
	       return tbase.getLocalStorage("curlongitude",118.784994);
	 };
	 curtool.prototype.getcrulan=function(){
	       return tbase.getLocalStorage("curlatitude", 31.91509);
	 };

	 curtool.prototype.getpicture=function(pictruetype,objectid,success,fail){
		 webpost.postdata("/api/TPicture/getImgOne",{objectId:objectid,pictureType:pictruetype},success,function(info){
			    	tbase.showmsg(info);
				});
	 };
	 curtool.prototype.getUuid =function(){
	      var len=16;//16长度
	      var radix=16;//16进制
	      var chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');var uuid=[],i;radix=radix||chars.length;if(len){for(i=0;i<len;i++)uuid[i]=chars[0|Math.random()*radix];}else{var r;uuid[8]=uuid[13]=uuid[18]=uuid[23]='-';uuid[14]='4';for(i=0;i<36;i++){if(!uuid[i]){r=0|Math.random()*16;uuid[i]=chars[(i==19)?(r&0x3)|0x8:r];}}}
	     return uuid.join('');
	    }  ;

    //保持手机后台运行，在index中调用
	curtool.prototype.backgroundMode =function(){
		if (!tbase.isweb())
		{
			cordova.plugins.backgroundMode.enable();
		}
    }  ;
    //导航 
	curtool.prototype.navigate =function(dest){
		launchnavigator.navigate(dest, {
	        start: "",
	        enableDebug: false
	    });
    }  ;
    //微信分享
    curtool.prototype.share=function(){
    	//localStorage.setItem("demolink", data.demolink);
    	this.weixinshare("心星随行","您身边的拼团大优惠",
    			"https://b1common-1259797882.cos.ap-shanghai.myqcloud.com/img/C36136A5823E5B4C.png",
    			//tbase.getLocalStorage("demolink","www.baidu.com")
    			"https://pan.baidu.com/s/1jmz48U335ooUKEUrh9Z38w"
    			);
    };
    //微信分享
    curtool.prototype.weixinshare=function(strTile,strContent,strUrlpic,strUrlClick){
    	function wxsuccess(result) {
    		
			tbase.showmsg("分享成功");
		}
		function wxerror(result) {
			tbase.showerr("分享失败");

		}
		navigator.weixin.share({
			message : {
				title : strTile,
				description : strContent,
				mediaTagName : strContent,
				thumb : strUrlpic,
				media : {

					webpageUrl : strUrlClick

				}
			},
			scene : navigator.weixin.Scene.SESSION
		}, wxsuccess, wxerror);
    };
	 
	return new curtool();
	
	
});