define(function(require) {
	require("curcheck");
	var jpushInstance=require("$UI/p_common/jpush");
	var tbase= require("$UI/p_common/tbase");
	var ttool= require("$UI/p_common/tbase");
	var webjs=require("$UI/p_common/webjs");
	var MD5 = require('$UI/system/lib/base/md5');
	var md5 = new MD5();
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
    	//login&useraccount=admin&password=1&ver=1.0.1&deviceseq=xxx
		//webjs.postdata("auth/login",{username: phone,password: md5.hex_md5(password)}				,
		webjs.pushdata("app/auth","login","&useraccount=" + phone + "&password=" + this.pswmd5(phone,password) 
				+ "&ver=" + window.ver + "&deviceseq=" + ttool.getseq() 	,
				function(data){			
		            localStorage.setItem("logintype","6");// 一定要有 且和curcheck.js 一致
		            localStorage.setItem("needrefresh","1");//让首页知道是第一次打开，需要刷新
		            

		            localStorage.setItem("telofpt",data.telofpt);//平台电话
		            
					localStorage.setItem("userid", data.userid);// 一定要有
		            localStorage.setItem("usertype", data.usertype);
		            localStorage.setItem("useraccount", data.useraccount);
		            localStorage.setItem("picture", data.picture);
		            localStorage.setItem("infoBeforePaid", data.infoBeforePaid);//购买前提示信息
		            localStorage.setItem("infoBeforeUse", data.infoBeforeUse);//使用前提示信息
		            localStorage.setItem("isweixinpay", data.isweixinpay);//是否显示微信支付
		            localStorage.setItem("isweixinwappay", data.isweixinwappay);//是否显示微信支付
		            localStorage.setItem("iszfbpay", data.iszfbpay);//是否显示支付宝支付
		            localStorage.setItem("iszfbpaywap ", data.iszfbpaywap );//是否显示支付宝网页支付
		            localStorage.setItem("strPrice", data.strPrice);//价格
		            localStorage.setItem("demolink", data.demolink);//演示链接
		            localStorage.setItem("lawlink", data.lawlink);//免责链接
		            localStorage.setItem("downloadlink", data.downloadlink);//下载链接
		            localStorage.setItem("token", data.token);//下载链接
		            
		            
		            
		            //下面3个 聊天功能必备
		            localStorage.setItem("username", data.username);
					localStorage.setItem("imid", data.imid);
					localStorage.setItem("imuid", data.imuid);
		            
		            if (navigator.alipay) 
		            {
		    			jpushInstance.setPushByID(phone);
		    		}
		            
		            window.location.href = "./index.w";  
					
		    }		       ,
		    function(info){
		    	   alert(info);
			});
	};

	curtool.prototype.geturl=function(name)
	{
		tbase.showdebug("访问page:"+name);
		switch (name)
		{
	    case "wap" : return require.toUrl('$UI/p_common/wap.w');
	    case "show" : return require.toUrl('$UI/p_common/show.w');
	    case "consolelog" : return require.toUrl('$UI/p_common/consolelog.w');
	    case "commconUploadControl" : return require.toUrl('$UI/p_common/2alyupload/aliyun.w');
	    case "shareCommon" : return require.toUrl('$UI/p_common/shareCommon.w');
	
	    case "city": return require.toUrl('$UI/p_common/city.w');
	    
	    case "about": return require.toUrl(tbase.getbaseurl()+'other/about.w');
	    case "page_other_resetpassword":return require.toUrl(tbase.getbaseurl()+'other/page_other_resetpassword.w');
	    case "page_other_updatetpassword":return require.toUrl(tbase.getbaseurl()+'other/page_other_updatetpassword.w');
	    case "page_other": return require.toUrl(tbase.getbaseurl()+'other/page_other.w');
	    
	    case "commonMap": return require.toUrl(tbase.getbaseurl()+'map/commonMap.w');
		 
	    case "main":  return require.toUrl(tbase.getbaseurl()+'main.w');	
	    case "login" :return require.toUrl(tbase.getbaseurl()+'login.w');
	    case "register": return require.toUrl(tbase.getbaseurl()+'register.w');
	    case "picview":return require.toUrl(tbase.getbaseurl()+'picview.w');
	    case "agreement":return require.toUrl(tbase.getbaseurl()+'agreement.w');
	    
	    case "needoil":  return require.toUrl(tbase.getbaseurl()+'pages/needoil.w');	
	    case "oilmain":  return require.toUrl(tbase.getbaseurl()+'pages/oilMain.w');	
	    case "mainbasics":  return require.toUrl(tbase.getbaseurl()+'pages/minebasics.w');	
	    
		}

		tbase.showdebug("访问未定义page:"+name);
		return require.toUrl(name);
	};
	curtool.prototype.logout=function()
	{
		if (navigator.alipay)
        {
	        jpushInstance.setPushByID("");
         }
		//有聊天功能的就用 tim.imlogout 没有的用 tbase.logout
		tbase.logout();
		//tim.imlogout();
	};
	
	return new curtool();
	
	
});