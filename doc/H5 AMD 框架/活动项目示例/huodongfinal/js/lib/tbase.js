define(function(require) {
	var tbase = function() {
	};

	tbase.prototype.getbaseurl = function()
	{
		return window.baseurl;
	};

	tbase.prototype.showmsg = function(info)
	{
		console.log(info);
		//alert(info);
		layer.open({
			content : info,
			skin : 'msg',
			time : 2
		});
	};
	tbase.prototype.showerr = function(info)
	{
		//alert(info);
		layer.open({
			content : info,
			skin : 'msg',
			time : 4
		});
	};
	tbase.prototype.showdebug = function(info,data)
	{
		console.log(info,data);
        //alert(info);
        //alert(data);
	};
	
	tbase.prototype.confirm = function(me,parentnode,info,success)
	{
		//alert(info);
		return;
        var refreshv=1;
        this.showdebug("confirm",info);
        var self=this;
		if (!me.msg)			
			me.msg = new MsgDialog({
				parentNode : parentnode  //me.getElementByXid("panel1")
				
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
	
	tbase.prototype.filteremoji =function(emojireg){
	    var ranges = [
	        '\ud83c[\udf00-\udfff]', 
	        '\ud83d[\udc00-\ude4f]', 
	        '\ud83d[\ude80-\udeff]'
	    ];
	    return emojireg.replace(new RegExp(ranges.join('|'), 'g'), '');
	};
	
	//
	tbase.prototype.getseq=function()
	{
		var seq=localStorage.getItem("deviceseq");
		if (( seq=== null) || (seq === "")) {
            //网页端以时间戳作为seq

				var NowTime = new Date();

				var t = NowTime;
				seq ="web"+ t.getFullYear().toString() + (t.getMonth() + 1).toString() + t.getDate().toString() + t.getHours().toString() + t.getMinutes().toString() + t.getSeconds().toString();

			localStorage.setItem("deviceseq", seq);
		}
		console.log("seq:",seq);
		return seq;
	};

	
	tbase.prototype.setLocalStorage=function(name,value)
	{
		console.log("setLocalStorage:"+name,value);
		localStorage.setItem(name,value);
		
	};
	tbase.prototype.getLocalStorage=function(name,defalutvalue)
	{
		var v= localStorage[name];
		console.log("getLocalStorage", v);
		if (this.isnull(v))
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
		console.log("getuserid",v);
		if (this.isnull(v))
		{
			justep.Shell.showPage("login");
			window.userid="0";
			return "0";
		}
		window.userid=v;
		return v;
	};

	tbase.prototype.isnull = function(v)
	{
	   return (v===null || typeof v=="undefined"|| v=="undefined" || v===""|| v==="0");
	};
	tbase.prototype.islogin=function()
	{
		var v= localStorage.getItem("userid");
		console.log("islogin",v);
		if (this.isnull(v))
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
		//justep.Shell.showPage("login");
	};
	tbase.prototype.logout1 = function()
	{
		localStorage.setItem("userid", "0");
		window.userid="0";

       // this.showmsg("退出成功");
		justep.Shell.showPage("login");
	};
	//获取下载地址
	tbase.prototype.getdownlink=function()
	{
		var wapUrl=this.getLocalStorage("downloadlink",window.downloadlink);
		return wapUrl;
	};
	//是否为web应用
	tbase.prototype.isweb=function()
	{
		return !window.plugins; //if (navigator.alipay)
	};

	
	tbase.prototype.getdatetimestr=function(now)
	{
		var year = now.getFullYear();
	    var month =(now.getMonth() + 1).toString();
	    var day = (now.getDate()).toString();
	    var hour = (now.getHours()).toString();
	    var minute = (now.getMinutes()).toString();
	    var second = (now.getSeconds()).toString();
	    if (month.length == 1) {
	        month = "0" + month;
	    }
	    if (day.length == 1) {
	        day = "0" + day;
	    }
	    if (hour.length == 1) {
	    	hour = "0" + hour;
	    }
	    if (minute.length == 1) {
	    	minute = "0" + minute;
	    }
	    if (second.length == 1) {
	    	second = "0" + second;
	    }
	     var dateTime = year + "-" + month + "-" + day +" "+ hour +":"+minute+":"+second;
	     return dateTime;

		
	};
	//获取url中的code值
		tbase.prototype.getUrlParam = function(name){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");//构造一个含有目标参数的正则表达式对象
			var r=window.location.search.substr(1).match(reg);//匹配目标参数
			if(r != null) return unescape(r[2]); return null;//返回参数值
		};
		
		tbase.prototype.stringToDate=function(dateStr, separator) {
		if(!separator) {
			separator = "-";
		}
		var dateArr = dateStr.split(separator);
		var year = parseInt(dateArr[0]);
		var month;
		//处理月份为04这样的情况                         
		if(dateArr[1].indexOf("0") == 0) {
			month = parseInt(dateArr[1].substring(1));
		} else {
			month = parseInt(dateArr[1]);
		}
		var day = parseInt(dateArr[2]);
		var date = new Date(year, month - 1, day);
		return date;
	};
	
		/*表单数据验证方法*/
	tbase.prototype.checkinput=function(id, required, defaultvalue, pattern, warringmsg) {
		var own=this;
		var textvalue = $('#' + id).val();
		if(textvalue == "" || textvalue == null) {
			if(required) {
				$('#' + id).attr('placeholder', warringmsg);
				own.showmsg(warringmsg);
				return null;
			}
			textvalue = defaultvalue;
		}
		if(pattern != "") {
			if(!(pattern.test(textvalue))) {
				$('#' + id).attr('placeholder', warringmsg);
				own.showmsg(warringmsg);
				return null;
			}
		}
		return textvalue;
	}
	
	return new tbase();
});