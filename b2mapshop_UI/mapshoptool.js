define(function(require) { 
	var justep = require("$UI/system/lib/justep");
	var tbase = require("$UI/bcommon/tbase");

	var mapshoptool = function() {
		
	};
	
	mapshoptool.prototype.getLefttime1 = function(str) {
	    
	    var date1=justep.Date.fromString(str,'yyyy-MM-dd hh:mm:ss');
        var date2=new Date();
        var between = justep.Date.diff(date2,date1,'n');
        if (between<=0)
           return "已结束";
        
		return "剩余"+ (between-between%60)/60+":"+between%60;
	};
	mapshoptool.prototype.getlefttime = function(row,teamid) {
		//var row=this.comp('discData');
		if (tbase.isnull( teamid))
		    return "";
		else
		{
		    return this.getLefttime1(row.val("valid_date"));
		}
		    return "";
	};
	mapshoptool.prototype.getlefttimecss = function(row,teamid) {
		if (row.val("isvalided")==="0")
		    return "";
		if (row.val("iscancle")==="1")
		    return "";
		
		    var date1=justep.Date.fromString(row.val("valid_date"),'yyyy-MM-dd hh:mm:ss');
		    
	        var date2=new Date();
	        var between = justep.Date.diff(date2,date1,'n');
	        
        if (between>60)
           return "fcontentgreen";
        else
           return "fcontentred";
	};
	mapshoptool.prototype.showuserheads = function(row) {
		//var row=this.comp('discData');
		 if (tbase.isnull( row.val("min_users")))
			    return "<span>无头像</span>";
	       
	       var minusers=row.val("min_users")*1;
	       var users=[];
	       if  (!tbase.isnull( row.val("headpics")))
	           users=row.val("headpics").split(',');
	       //console.log("users",users);
	       //console.log("users.length",users.length);
	       var html="";
	       for (var i=0;i<minusers;i++)
	       {
	           if (i>=users.length)
	           {
	                html=html+'<img src="./img/icon_touxiang.png" alt="" xid="image'+i+'" class="touxiang"></img>';
	           }
	           else
	           {
	               html=html+'<img src="'+users[i]+'" alt="" xid="image'+i+'" class="touxiang"></img>';
	           }
	       }
	       return html;
	};
	mapshoptool.prototype.getteamusersinfo = function(row) {
		if (row.val("isvalided")==="0")
		    return "已成团";
		if (row.val("iscancle")==="1")
		    return "已取消";
		var u=row.val("min_users")*1-row.val("teamusercount")*1;
		console.log("getusersinfo",u);
		if (u>0)
		    return "仅剩"+u+"个名额";
		else
		    return "已满";
	};
	
	mapshoptool.prototype.sureclick = function(phone,yzm,password2,password) {
		if (password === "" || password === null) {
			tbase.showerr("密码不能为空！");
			return;
		}
		if (yzm === "" || yzm === null) {
			tbase.showerr("验证码不能为空！");
			return;
			}
		if (password!=password2) {
			tbase.showerr("两次密码不同，请重新输入！");
			return;
			}
	};
	
	//验证码计时器
	mapshoptool.prototype.time =function Timmer(loopSecond,title1,title2,listener){
	    //debugger;
	    console.log("Timmer");
		this.loopSecond=loopSecond;
		this.waittime=loopSecond;
		var self=this;
		this.mytime=function(){
			if(self.waittime<=0){
				self.set({
					"disabled":false,
					"label":title1
				});
				this.waittime=loopSecond;
			}else{
				self.set({
					"disabled":true,
					"label":title2+"(" + self.waittime + ")"
				});
				self.waittime--;
				setTimeout(function(){
					self.mytime();
				},1000);
			}
		};
};
	
	return new mapshoptool();
	
	
});