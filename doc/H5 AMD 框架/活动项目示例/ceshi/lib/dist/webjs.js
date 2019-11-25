define(function(require) {
	var $ = require('jquery');
	var tbase=require("tbase");
    var start=false;
	var timer;
	var webjs = function() {
		//alert(start);
		if (start)
		{
			start=false;
			//alert("1");
			timer = window.setInterval(function() {
				var userid = tbase.getuserid_nocheck();
				console.log(window.prefix + "command=cll_just&userid="+userid);
				$.ajax({
					"type" : "get",
					"async" : true,
					"cache" : false,
					"global"   : false,
					"dataType" : "json",
					"url" : window.prefix + "/app/auth?command=CommonJust&userid="+userid+"&requretime="+new Date().getTime(),
					"error" : function(XMLHttpRequest, textStatus, errorThrown) {
						tbase.showmsg("您貌似断网了，请检查网络,如果联网还不能恢复，可重启软件（You offline ,please check network)");
					},
					"complete" : function(xhr) {
					},
					"success" : function(data) {
						//justep.Util.hint("网络监测成功", {
						//	type : 'danger',
						//	delay : 2000
						//});
					}
				});
			}, 60000);
		}
	};

	webjs.prototype.pushdata2 = function(prefix,command,data, success,fail){	
		console.log("pushdata2",data);
		data=data.replace(/\?/g,"");
		data=tbase.filteremoji(data);
		var url=window.prefix+ "/"+prefix + "?command="+command+data+"&requretime="+new Date().getTime();
		var me=this;
		//alert(url);

		tbase.showdebug(url);
		
		$.ajax({
			"type" : "get",
			"async" : false,
			"cache" : false,
			"global"   : false,
			"dataType" : "json",
			"url" :url ,
			"error" : function(XMLHttpRequest, textStatus, errorThrown) {	
				tbase.showdebug("网络错误"+textStatus);
				fail("请在设置中打开本软件的网络权限，或者关闭应用重新打开，谢谢(Please open the network permissions of this software in Settings, or turn off the application and reopen it. Thank you).");
			},
			"complete" : function(xhr) {  
				//tbase.showdebug(xhr);
			},
			"success" : function(datavalue) {	
				if (datavalue.ret == "success") {
					success(datavalue);
				} else {
					
					if (datavalue.info.indexOf("The last packet successfully received from the server")>=0 )
					{
						tbase.showerr("您已经离开太久了，系统会重新提交请求");
						me.pushdata(command, data, success, fail);
						return;
					}
					fail("请求失败："+datavalue.info);
					
				}

			}
		});
	};


	webjs.prototype.pushdata = function(prefix, command,data, success,fail){	
		console.log("pushdata",data);
		data=data.replace(/\?/g,"");
		data=tbase.filteremoji(data);
		var url=window.prefix+ "/"+prefix + "?command="+command+data+"&requretime="+new Date().getTime();
		var me=this;
		//alert(url);

		tbase.showdebug(url);
		
		$.ajax({
			"type" : "get",
			"async" : false,
			"cache" : false,
			"global"   : false,
			"dataType" : "json",
			"url" :url ,
			"error" : function(XMLHttpRequest, textStatus, errorThrown) {	
				tbase.showdebug("网络错误"+textStatus);
				me.pushdata2(prefix,command, data, success, fail);
			},
			"complete" : function(xhr) {  
				tbase.showdebug(xhr);
			},
			"success" : function(datavalue) {	
				tbase.showdebug(datavalue);
				if (datavalue.ret == "success") {
					success(datavalue);
				} else {
					
					if (datavalue.info.indexOf("The last packet successfully received from the server")>=0 )
					{
						tbase.showerr("您已经离开太久了，系统会重新提交请求");
						me.pushdata(command, data, success, fail);
						return;
					}
					fail("请求失败："+datavalue.info);
					
				}

			}
		});
	};



	
webjs.prototype.pushdata_easy = function(command,data1){
	    this.pushdata(command,data1,
				function(data1)
				{
	    	        tbase.showmsg('请求成功');
				    justep.Shell.closePage();
				},
				function(info)
				{

	    	        tbase.showerr(info);
				});
				
	};	
	

	webjs.prototype.check = function(success1){
		var userid = localStorage.getItem("userid");

		if (userid===null || userid===""|| userid==="0")
		{
			userid="0";
			justep.Shell.showPage("login");
			window.userid="0";			
			return;
		}
		var url=window.prefix + "command=cll_just&userid=" + userid;
		tbase.showdebug(url);
		$.ajax({
			"type" : "get",
			"async" : false,
			"cache" : false,
			"global"   : false,
			"dataType" : "json",
			"url" :url ,
			"error" : function(XMLHttpRequest, textStatus, errorThrown) {
				tbase.showdebug("网络错误"+textStatus);
				tbase.showerr( '请检查网络，通讯异常，实在不行重启应用(Please check where your device is online,communication error)');
			},
			"complete" : function(xhr) {
			//	tbase.showdebug(xhr);
			},
			"success" : function(data) {
				if (data.type !== "0") {
					if (data.type === "1") {
						tbase.logout();
						return;
					}
					if (data.type === "2") {	
						tbase.showmsg(data.value);
					
						return;
					}

					if (data.type === "3") {
						var url = data.value;
						justep.Shell.showPage("wap", {
							"wapUrl" : url
						});
						return;
					}

				} else {
					success1();
				}

			}
		});
				
	};	
	
	
	
	return new webjs();
});