define(function(require) {
	var justep = require("$UI/system/lib/justep");
	require("cordova!cordova-plugin-device");// seq序列号
	require('$UI/p_common/mockPortalApi');
	var Message = require("$UI/system/components/justep/common/common");
	var MsgDialog = require("$UI/system/components/justep/messageDialog/messageDialog");

	
	var tbase = function() {
		
	};

	tbase.prototype.getbaseurl = function()
	{
		return window.baseurl;
	};

	tbase.prototype.showmsg = function(info)
	{
		layer.open({
			content : info,
			skin : 'msg',
			time : 2
		});
		//this.showdebug("正常:"+info);
	};
	tbase.prototype.showerr = function(info)
	{
		layer.open({
			content : info,
			skin : 'msg',
			time : 4
		});
		//this.showdebug("错误:"+info);
	};
	//panel 的名字必须叫 panel1
	tbase.prototype.confirm = function(me,info,success)
	{
		//debugger;
		//Message.message("aler", info);
        var refreshv=1;
        this.showdebug("confirm",info);
        var self=this;
		if (!me.msg)			
			me.msg = new MsgDialog({
				parentNode : me.getElementByXid("panel1")
				
			});
		me.msg.on('onClose', function(event) {
			self.showdebug("me.msg",event);
			if (event.button==="ok")
			{
				if (refreshv==1)
				{
					refreshv=0;
					self.showdebug("confirm","success");
				    success();
				}
				else
				{
					//alert("你点的太快了");

					self.showdebug("confirm","你点的太快了");
				}
			}
		}, me);
			
		me.msg.show({
			type :'OKCancel',
			title :  '提醒',
			message :info,
			inputValue :'',
			width : '80%'
		});
	};
	var startd=0;
	tbase.prototype.startdebug= function(info)
	{
		startd=1;
	};
	
	tbase.prototype.showdebug = function(info)
	{
		console.log( info);
		
		//console.log("startd",startd);
		/*
		if (startd===1)
        {
   var consolelogcount= this .getLocalStorage("consolelogcount" ,"0" )*1;

	//console.log("consolelogcount",consolelogcount);
  consolelogcount=consolelogcount+1;
   this .setLocalStorage("consolelogcount" ,consolelogcount);
   this .setLocalStorage("consolelog" +consolelogcount.toString(),info);
        }
*/
	};

	tbase.prototype.filteremoji =function(emojireg){
	    var ranges = [
	        '\ud83c[\udf00-\udfff]', 
	        '\ud83d[\udc00-\ude4f]', 
	        '\ud83d[\ude80-\udeff]'
	    ];
	    return emojireg.replace(new RegExp(ranges.join('|'), 'g'), '');
	};
	tbase.prototype.getseq=function()
	{
		var seq=localStorage.getItem("deviceseq");
		if (( seq=== null) || (seq === "")) {
            //网页端以时间戳作为seq
			//debugger;
			if (!window.plugins) {
				var NowTime = new Date();

				var t = NowTime;
				seq ="web"+ t.getFullYear().toString() + (t.getMonth() + 1).toString() + t.getDate().toString() + t.getHours().toString() + t.getMinutes().toString() + t.getSeconds().toString();

			}
			else {//原生APP获取seq
				seq = device.uuid;
			}
			localStorage.setItem("deviceseq", seq);
		}
		console.log("seq:",seq);
		return seq;
	};

	tbase.prototype.getdeviceplatform=function()
	{
		return device.platform;
		
	};
	
	tbase.prototype.setLocalStorage=function(name,value)
	{
		console.log("setLocalStorage:"+name,value);
		localStorage.setItem(name,value);
		
	};
	tbase.prototype.getLocalStorage=function(name,defalutvalue)
	{
		var v= localStorage[name];
		//console.log("getLocalStorage",typeof v);
		if (v===null || typeof v=="undefined"|| v=="undefined" || v===""|| v==="0" )
		{
			//console.log("getLocalStorage,default name:",name);
			console.log("getLocalStorage,default "+name+":",defalutvalue);
			return defalutvalue;
		}
		console.log("getLocalStorage "+name+":",v);
		return v;
	};
	tbase.prototype.getuserid_nocheck=function()
	{
		var v= this.getLocalStorage("userid","0");		
		window.userid=v;
		return v;
	};
	tbase.prototype.getuserid = function()
	{
		var v= this.getLocalStorage("userid","0");
		if (v===null || v===""|| v==="0")
		{
			justep.Shell.showPage("login");
			window.userid="0";
			return "0";
		}
		window.userid=v;
		return v;
	};

	tbase.prototype.islogin=function()
	{
		var v= localStorage.getItem("userid");
		if (v===null || v===""|| v==="0")
		{
			return false;
		}
		return true;
	};
	tbase.prototype.logout = function()
	{
		localStorage.setItem("userid", "0");
		window.userid="0";

        this.showmsg("退出成功");
		justep.Shell.showPage("login");
	};
	tbase.prototype.logout1 = function()
	{
		localStorage.setItem("userid", "0");
		window.userid="0";

       // this.showmsg("退出成功");
		justep.Shell.showPage("login");
	};
    //转换图片为地图显示的圆角图片
	tbase.prototype.getpicformap=function(pic)
	{
		//http://fdlx.oss-cn-shanghai.aliyuncs.com/FtB7PX3WBP.png
		//http://fdlx.img-cn-shanghai.aliyuncs.com/1489476109000.jpg@!map
		//console.log("pic",pic);
		if (pic.indexOf(".aliyuncs.com")>0)		
		    return pic.replace("oss-cn-shanghai","img-cn-shanghai")+"@!map";
		else
			return pic;
	};
	//获取下载地址
	tbase.prototype.getdownlink=function()
	{
        //console.log("window.downloadlink",window.downloadlink);
		var wapUrl=this.getLocalStorage("downloadlink",window.downloadlink);
		//if ((localStorage.getItem("downloadlink") === null) || (localStorage.getItem("downloadlink") === ""))
		//	wapUrl = window.downloadlink;
		//else
		//	wapUrl = localStorage.getItem("downloadlink");
		return wapUrl;
	};
	//显示下载页面
	tbase.prototype.showdownpage=function(info)
	{
		//alert("在网页上不能分享，请下载app，系统将自动定向到下载地址，谢谢，如果已经有账户，下载app后账户可直接登录无需重复注册");
		//alert(info);
		var msg1 = $(
		     '<div style="display: none;z-index:99999;position: fixed;width: 100%;bottom: 250px;text-align: center;"><span style="font-size:18px;border-radius: 3px;padding: 7px;background-color:  #A9A9A9;color: #F0F0F0;">'+info+'</span></div>')
		   .appendTo('body');
          msg1.fadeIn(400).delay(2000).fadeOut(400, function() {
	             msg1.remove();
         });
		var wapUrl=this.getdownlink();
		//if ((localStorage.getItem("downloadlink") === null) || (localStorage.getItem("downloadlink") === ""))
		//	wapUrl = window.downloadlink;
		//else
		//	wapUrl = localStorage.getItem("downloadlink");
        console.log(require.toUrl('$UI/p_common/wap.w'));
		justep.Shell.showPage(require.toUrl('$UI/p_common/wap.w'), {
			"wapUrl" : wapUrl
		});
	};
	//是否为web应用
	tbase.prototype.isweb=function()
	{
		//console.log("isweb",device.platform);
		return !window.plugins;
	};

	//是否为安卓
	tbase.prototype.isand=function()
	{
	//console.log("device.platform",device.platform);
		if(device.platform == "Android"){
			
			return true;
		}else{
			return false;
		}
		
	};
	//是否为苹果
	tbase.prototype.isios=function()
	{
		//console.log("device.platform",device.platform);
		if(device.platform == "iOS"){
			
			return true;
		}else{
			return false;
		}
		
	};
	return new tbase();
});