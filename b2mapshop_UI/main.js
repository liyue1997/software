define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var tbase = require("$UI/bcommon/tbase");
	//var webpost = require("$UI/bcommon/webpostjs");
	var webjs=require("$UI/bcommon/webjs");
	var curtool = require("curtool");
	var TIM = require("$UI/b2mapshop_UI/TalkDemo/tim");
	//var tim = require("$UI/bcommon/tim");
	var WindowDialog = require("$UI/system/components/justep/windowDialog/windowDialog");
	require("cordova!phonegap-plugin-barcodescanner");
	require("cordova!cordova-plugin-device-motion");
	
	var self=null;
	var Model = function() {
		this.callParent();
		self=this;
        this.dingwei = justep.Bind.observable(false);
        this.infoshow = justep.Bind.observable(false);
        this.itemclick = justep.Bind.observable(false);
        this.timecss =justep.Bind.observable("fcontentred");
        self.tip=justep.Bind.observable("notip");
        this.imgindex = 0;
        this.imgrout = justep.Bind.observable(0);
        this.watchID = null;
	};
	
	Model.prototype.modelLoad = function(event){
		TIM.login(localStorage.getItem("userid"));
	    justep.Shell.on("onIMMsgUnhandle",this.onIMMsgUnhandle,this);
	};
	
	Model.prototype.onIMMsgUnhandle = function(data){
    	if(data.count>0){
    		self.tip.set("tip");
    	}
    	else
    	    self.tip.set("notip");    
    };
	
	Model.prototype.scannerimgClick = function(event){
		function onSuccess(result){
			alert(result.text);
		}
		function onError(error){
			alert(error);
		}
		justep.barcodeScanner.scan(onSuccess,onError);
	};
	
	Model.prototype.Loaclposition =function(){
	    console.log("start getCurrentPosition first");
        //if (this.dingwei.get())
        //   return;
        if (tbase.isweb())
        {
            success({"coords":{"longitude":118.808667,"latitude":31.97187}});
         }
         else 
         {
            navigator.geolocation.getCurrentPosition(success, fail, null,"bd09ll");
         }
                	 
	};
	function successdingwei(data){
	    this.dingwei.set(true);
		success(data);
	}
	function success(data){
		tbase.showmsg("定位成功");
		//var ggPoint = new BMap.Point(data.coords.longitude,data.coords.latitude);
		localStorage.setItem("curlongitude", data.coords.longitude);
		localStorage.setItem("curlatitude", data.coords.latitude);
		self.comp("data").refreshData();
	}
    function fail(msg){	   
	  	tbase.showerr(msg.message);
	  	success({"coords":{"longitude":118.808667,"latitude":31.97187}
                	    });
	}

	Model.prototype.getDistance = function(shoplan,shoplon) {
		return "距离你"+curtool.GetDistanceStr(shoplan,shoplon,curtool.getcrulan(),curtool.getcrulon());
	};
	Model.prototype.getLefttime = function(str) {
	    var date1=justep.Date.fromString(str,'yyyy-MM-dd hh:mm:ss');
        var date2=new Date();
        var between = justep.Date.diff(date2,date1,'n');
        if (between<=0)
           return "已结束";
        if (between>60)
           this.timecss.set("fcontentgreen");
        else
           this.timecss.set("fcontentred");
        
		return (between-between%60)/60+":"+between%60;
	};

	Model.prototype.transUrl = function(row) {
	    this.imgindex++;
		return require.toUrl('xinxing/x' + this.imgindex+".png");
	};
	
	Model.prototype.getValue= function(key,defaultvalue){
	    return  tbase.getLocalStorage(key,defaultvalue);
	};

	Model.prototype.openPageClick = function(event) {	    
		var row = event.bindingContext.$object;
		this.comp("data").to(row);
		//justep.Shell.showPage(row.val("pageName"));
		this.itemclick.set(true);
		$(this.getElementByXid("infopanel")).show();
		this.infoshow.set(true);
	};
	
	Model.prototype.panel2Click = function(event){
	    if (!this.itemclick.get())
           this.infoshow.set(false);
        this.itemclick.set(false);
	};

	Model.prototype.div1Click = function(event){
	    if (tbase.islogin())
		    justep.Shell.showPage("mapshop");
		 else
		    justep.Shell.showPage("login",{gotopage:"mapshop"});
	};
	
	Model.prototype.left1Click = function(event){
       //this.timecss.set("fcontentgreen");
       console.log("left1Click");
       justep.Shell.showLeft();
	};

	Model.prototype.image5Click = function(event){
	     //this.dingwei.set(false);
         self.Loaclposition();
	};
	
    var rotateHTML5 = function (c_Height,c_Width)
    {
        //console.log ("rotate("+self.imgrout.get()+"deg)");
        //return;
         $("#centerimg1").css("transform","rotate("+self.imgrout.get()+"deg)");
         self.imgrout.set(self.imgrout.get()+1);
        
        //每个li得宽度60 半径r= c_Width-60-20
        var r= c_Width-60-20;
        //假设一个圆的圆心坐标是(a,b)，半径为r，
        //则圆上每个点的X坐标=a + Math.sin(2*Math.PI / 360) * r ；Y坐标=b + Math.cos(2*Math.PI / 360) * r ；
        
	    $(".licircle").each(function (index) {
	        var hudu = (2*Math.PI / 360) *  (self.imgrout.get()+index*60);
	        var x1=c_Width + Math.sin(hudu) * r ;
	        var y1=c_Height + Math.cos(hudu) * r ;
	        $(this).css("top",y1-60);
	        $(this).css("left",x1-30);
	        //console.log (index,hudu);
	        //console.log (x1,y1);
	 
	    });
	};
	
	Model.prototype.start = function ()
    {
        var div= this.getElementByXid("list2");
        if (!!div.interval)
        {
            clearInterval (div.interval);
            delete div.interval;
            self.start();
            return;
        }
        else
        {
	        var c_Height=$(document.body)[0].clientHeight/2;  
	        var c_Width=$(document.body)[0].clientWidth/2;
	        $("#centerimg1").css("top",c_Height-50);
	        $("#centerimg1").css("left",c_Width-70);
	        $("#centerimg1").show(1000);
	            div.interval = setInterval (function ()
	            {
	                rotateHTML5(c_Height,c_Width);
	                ///.*webkit.*/i.test (navigator.userAgent) ? rotateHTML5 (div,1) : rotateIE (div);
	            }, 30);
        }
    };
    
	Model.prototype.dataCustomRefresh = function(event){
         webjs.pushdata("/app/mapshop","queryteams","" 	,
				function(data){			
			        self.imgindex=0;
			        event.source.loadData(data.data);
			        			        self.start();
					
			    },

			    function(info){
			    	tbase.showmsg(info);
				});
	};
	
	Model.prototype.button1Click = function(event){
	     var row = this.comp("data").getCurrentRow();
         justep.Shell.showPage("talk",{teamid:row.val("team_id")});
	};
	
	Model.prototype.modelActive = function(event){
	        window.setTimeout(function(){  
                 self.Loaclposition();
                 //getCurrentPosition();
				 //  console.log("start getCurrentPosition");
				 //self.showgg();
			}, 400);
			TIM.login(localStorage.getItem("userid"));
			justep.Shell.on("onIMMsgUnhandle",this.onIMMsgUnhandle,this);
	}; 
	
	Model.prototype.modelModelConstruct = function(event){
	    localStorage.setItem("imloginok", "0");
		//tim.iminit(this);
	};
	
	//打开会话列表
	Model.prototype.image4Click = function(event){
	    /*var self = this;
		var userid = tbase.getuserid();
		if (userid === "0")
			return;
		// tim.imlogin(localStorage.getItem("imuid"),
		// localStorage.getItem("username"), function() {
		var dlg = self.comp('windowDialog1');
		dlg.set({
			title : "会话列表(点击会话进入聊天界面)",
			showTitle : true,
			src : require.toUrl("$UI/bcommon/wex5/dialogList.w"),
			status : "maximize"
		});
		dlg.open();*/
		var userid = tbase.getuserid();
		if (userid === "0")
			return;
			//TIM.login(userid);
			justep.Shell.showPage("TIMlist",{id:localStorage.getItem("inputuserid")});    
	};
	
	Model.prototype.windowDialog1Received = function(event){
       var id = event.data.id;
		var type = event.data.type;
		var dialog;
		if (!dialog) {
			dialog = new WindowDialog({
				title : "消息记录",
				showTitle : false,
				src : require.toUrl("$UI/bcommon/wex5/message.w"),
				status : "maximize",
				parentNode : this.getElementByXid("dialog")
			});
		}
		dialog.open({
			params : {
				id : id,
				type : type
			}
		});	
	};
	
	Model.prototype.modelInactive = function(event){
        var div= this.getElementByXid("list2");
        if (!!div.interval)
        {
            clearInterval (div.interval);
            delete div.interval;
        }
	};
	
	Model.prototype.shakebtnClick = function(event){
		console.log("shakebtnClick");
		var oldValue = {
			x : null,
			y : null,
			z : null
		};
		var options = {	frequency : 800};
		this.watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
		// 获取加速度信息成功后的回调函数
		function onSuccess(newValue) {
			var changes = {}, bound = 6;
			if (oldValue.x !== null) {
				changes.x = Math.abs(oldValue.x - newValue.x);
				changes.y = Math.abs(oldValue.y - newValue.y);
				changes.z = Math.abs(oldValue.z - newValue.z);
				
				if (changes.x > bound || changes.y > bound || changes.z > bound) {
					self.comp("data").refreshData();
					if (this.watchID) {
						navigator.accelerometer.clearWatch(this.watchID);
						this.watchID = null;
						}
				}
			}
			oldValue = {
				x : newValue.x,
				y : newValue.y,
				z : newValue.z
			};
			navigator.accelerometer.clearWatch(this.watchID);
		}
		// 获取加速度信息失败后的回调函数
		function onError() {
			alert('失败!');
			if (this.watchID) {
					navigator.accelerometer.clearWatch(this.watchID);
					this.watchID = null;
				}
			navigator.accelerometer.clearWatch(this.watchID);
		}
	};
	return Model;
});
define(function(require){
	var $ = require("jquery");
	var Model = function(){
		this.callParent();
	};
	Model.prototype.image4Click = function(event){

	};

	return Model;
});
