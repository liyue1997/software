define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

    require("cordova!cordova-plugin-geolocation");
    require("cordova!cordova-plugin-compat");
	var ttool = require("$UI/p_common/tbase");
	var webjs = require("$UI/p_common/webjs");
	var curtool = require("curtool");
	var self=null;
	var map=null;
	var autorefresh=true;

	var Model = function() {
		this.callParent();
	};
	function success(data){
	     var translateCallback = function(datanew) {
	        console.log("map  translate  success",datanew);
			if (datanew.status === 0) {
			    var datanew1={};
			    datanew1.coords={};
			    
			    datanew1.coords.longitude=datanew.points[0].lng;
			    datanew1.coords.latitude=datanew.points[0].lat;
				success1(datanew1);
			}
		};
	    console.log("map success",data);
		var ggPoint = new BMap.Point(data.coords.longitude,data.coords.latitude);
		var convertor = new BMap.Convertor();
        var pointArr = [];
        pointArr.push(ggPoint);
        convertor.translate(pointArr, 1, 5, translateCallback);
	}
    function success1(data){
       // alert("经度:"+data.coords.longitude +"\n"
       //    +"纬度:"+data.coords.latitude +"\n"
       //    +"类型:"+data.coorType +"\n"
       // );
       // self.dingwei(data.coords.longitude,data.coords.latitude);
	     map.clearOverlays();
	     console.log("map success1",data);
	     var point1={"lng":data.coords.longitude,"lat":data.coords.latitude};
	     self.addpoint(map,point1);
	     var point = new BMap.Point(data.coords.longitude,data.coords.latitude);
	     map.panTo(point);

	     var geoc = new BMap.Geocoder(); 
	     
	     geoc.getLocation(point, function(rs){
	                    var addComp = rs.addressComponents;
	                    //ttool.showmsg("当前位置:"+addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
	                    var userid=ttool.getuserid_nocheck(); if (userid=="0") return;
	                    webjs.pushdata("updatelocation",
	                    		"&userid="+userid+"&latitude="+data.coords.latitude+"&longitude="+data.coords.longitude+"&adress="+addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber,
	                    		function(data){},function(info){ttool.showerr(info);});
			                    
			           	webjs.pushdata("getlocation","&userid="+userid+"&latitude="+data.coords.latitude+"&longitude="+data.coords.longitude,
			           	        		function(data){
			           	        	for (var i=0;i<data.data.length;i++)
							        {
			           	        	   var point={"lng":data.data[i].lo,"lat":data.data[i].la,"url":ttool.getpicformap( data.data[i].picture)  ,
			           	        	   "id":data.data[i].useraccount,"name":data.data[i].username,"address":addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber};
			           	   		        self.addMarker(map,point,data.data[i].username);
			           	            }
	           	        },function(info){ttool.showerr(info);});
	                    
	               });  	     

	     //getCurrentPosition();
    }
    /*
    function getCurrentPosition()
    {
    	
			window.setTimeout(function(){ 
			     if (autorefresh)
			     {
                     console.log("start getCurrentPosition");
				     navigator.geolocation.getCurrentPosition(success, fail, null);
				   
				 }
				 else
				 {
				    getCurrentPosition();
				 }
			}, 60000);
    }
*/
    function fail(msg){	     
          console.log("map fail",msg);
          //getCurrentPosition();
    }
	Model.prototype.modelLoad = function(event) {
	    self=this;
	    autorefresh=true;
	    //self.image4Click(null);
	    //self.image6Click(null);
	    self.loadBaiduMap();
	};
	Model.prototype.modelunLoad= function(event) {
	    
	    autorefresh=false;
	     console.log("map modelunLoad");
	};
	Model.prototype.modelActive= function(event) {
	    //self=this;
	   // if (map)
	   // {
	    autorefresh=true;
	     console.log("map modelActive");
	   //   self.button1Click(null);
	    //  }
	};
    
    Model.prototype.modelInactive = function(event){

	    autorefresh=false;
	};  
	Model.prototype.loadBaiduMap = function(cityname) {
		var id = this.getIDByXID("baiduMap");
		window._baiduInit = function() {

		   console.log("map _baiduInit");
			map = new BMap.Map(id);
		   	    
			map.addControl(new BMap.MapTypeControl());
			var point = new BMap.Point(118.784994, 31.91509);

			map.centerAndZoom(point, 12);
			map.enableScrollWheelZoom(true);
			map.addControl(new BMap.NavigationControl()); 
		    //self.button1Click();

			window.setTimeout(function(){  

                console.log("start getCurrentPosition first");
			     navigator.geolocation.getCurrentPosition(success, fail, null);
                 //getCurrentPosition();
				 //  console.log("start getCurrentPosition");
				self.showgg();
			}, 400);

			
		};
		require([ 'http://api.map.baidu.com/api?v=2.0&ak=EgoEPeTY2iSVzgs6KvZIKvrmX1laCPEZ&callback=_baiduInit' ], function() {
			if (!(window.BMap && window.BMap.apiLoad)){
				window._baiduInit();
			}
		});
	};
	
	 Model.prototype.addMarker= function (map1,point,info){  // 创建图标对象     
	    console.log("addmarker",info);
          var p=new BMap.Point(point.lng,point.lat);
        //  map.centerAndZoom(p, 13);	
	   var label = new BMap.Label(info,{point:p,offset: new BMap.Size(0, 42)}); 
	   label.setStyle({border:"0px solid #ccc",fontSize:"14px"});
		//map.addOverlay(label); 
		var  marker = new BMap.Marker(p);
		var mySize=new BMap.Size(40,40);//{"width":40, "height":40};
		var myIco=new BMap.Icon(point.url,mySize); 
		//var myOp={"icon":myIco};
		console.log(label);
		var  marker = new BMap.Marker(p);
		marker.setIcon(myIco);
	   marker.setLabel(label);
		map.addOverlay(marker); 
		(function() {  
	            marker.addEventListener("click",function(){  
	                showInfo(this,point);  
	            });  
	        })();
	};   
	//添加一个圆点
	Model.prototype.addpoint=function(map1,point)
	{
        var p=new BMap.Point(point.lng,point.lat);
		//var circle = new BMap.Circle(p,30,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});//设置覆盖物的参数，中心坐标，半径，颜色
       // var circle = new BMap.Circle(p,160,{fillColor:"red"});
		//map1.addOverlay(circle);//在地图上显示圆形覆盖物
      
		var mySize=new BMap.Size(30,30);//{"width":40, "height":40};
		var myIco=new BMap.Icon("http://yussdhfuf.com:8888/tmp/xme.png",mySize); 
		
		var  marker = new BMap.Marker(p);
		marker.setIcon(myIco);
		map.addOverlay(marker); 
	};
	
	//显示信息窗口，显示标注点的信息。  
	function showInfo(thisMaker,point){  
	    var sContent =  
	    '<ul style="margin:0 0 5px 0;padding:0.2em 0">'  
	    +'<li style="line-height: 26px;font-size: 15px;">'  
	    +'<span style="width: 50px;display: inline-block;">电话：</span>' + point.id + '</li>'  
	    +'<li style="line-height: 26px;font-size: 15px;">'  
	    +'<span style="width: 50px;display: inline-block;">名称：</span>' + point.name + '</li>'   
	    +'<li style="line-height: 26px;font-size: 15px;">'  
	    +'<span style="width: 50px;display: inline-block;">地址：</span>' + point.address + '</li>' 
	    //+'<li style="line-height: 26px;font-size: 15px;"><span style="width: 50px;display: inline-block;">查看：</span><a href="'+point.url+'">详情</a></li>'  
	    +'</ul>';  
	    var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象  
	    thisMaker.openInfoWindow(infoWindow);   //图片加载完毕重绘infowindow  
	   }
    
    Model.prototype.btnlistClick = function(event){

		var userid=ttool.getuserid();	 if (userid==="0") return;
		justep.Shell.showPage("page_other");
	};  
    Model.prototype.btnSetupClick = function(event){
        console.log("btnSetupClick");
        if (!navigator.alipay) {
			ttool.showdownpage("在网页上不能分享，请下载app，系统将自动定向到下载地址，谢谢，如果已经有账户，下载app后账户可直接登录无需重复注册");
		    return;
		}
         
		this.comp("windowDialog1").open({
			"src" : curtool.geturl("shareCommon"),
			"data" : {
				"title" : "【神速送油】应用分享",
				"content" : "神速送油，便宜好用",
				"urlpic" : "http://www.xwctw.com/aaa/logo"+window.appname+".png",
				"urlclick" : ttool.getdownlink()
			}
		});
	};  
    Model.prototype.windowDialog1Receive = function(event){

	}; 
	var  picgg1time=0;
	var  ggtime=60;
	
	Model.prototype.showgg=function(){
	//return;
	      window.setTimeout(function(){ 
			     if (autorefresh)
			     {
                     console.log("start showgg");
                     if (picgg1time>0)
                     {
                        --picgg1time;
			         	$(self.getElementByXid("span1")).text(picgg1time + "秒后自动关闭...");
			         	if (picgg1time<1)
			         	{
			         	   self.closegg(null);
			         	}
                     }
                     else
                     {
	                     if (ggtime >59)
	                     {
	                        ggtime=0;
					        self.showgginfo();
					     }
					     else
					     {
					        ggtime++;
					     }
				     }
				    self.showgg();
				     
				 }
				 else
				 {
				    self.showgg();
				 }
			}, 1000);
	};
	Model.prototype.showgginfo=function(){
	    var gg=  ttool.getLocalStorage("gg1","");
	    
		navigator.geolocation.getCurrentPosition(success, fail, null);
         var ggnew=ttool.getLocalStorage("ggnew","0");
	    if (gg!=="")
	    {
	         if (ggnew==="1")
	         {
	         $(self.getElementByXid('span2')).text(gg);
	         $(self.getElementByXid("image6")).show();
		     $(self.getElementByXid("image8")).show();
		     $(self.getElementByXid("image7")).show();
		     $(self.getElementByXid("span2")).show();
		     }
	    }
	    var picgg1new=ttool.getLocalStorage("picgg1new","0");
	    if (picgg1new==="1")
	    {
	        var picgg1=ttool.getLocalStorage("picgg1","");
	       //ttool.setLocalStorage("picgg1",datalast.picgg1.value);
        	//  ttool.setLocalStorage("picgg1time",datalast.picgg1.value1);
        	//  ttool.setLocalStorage("picgg1new","1");
        	$(self.getElementByXid("image3")).attr("src", picgg1);
        	picgg1time=ttool.getLocalStorage("picgg1time","0")*1;
        	$(self.getElementByXid("image4")).show();
		    $(self.getElementByXid("image3")).show();
		    if (picgg1time===0)
		        $(self.getElementByXid("span1")).hide();
		    else
		    {		    
				$(self.getElementByXid("span1")).text(picgg1time + "秒后自动关闭...");
		        $(self.getElementByXid("span1")).show();
		    }    
        	
	    }        	  
	};
	Model.prototype.closeggtxt = function(event) {
		$(this.getElementByXid("image6")).hide();
		$(this.getElementByXid("image8")).hide();
		$(this.getElementByXid("image7")).hide();
		$(this.getElementByXid("span2")).hide();
	};
	Model.prototype.image6Click = function(event) {
		
	    ttool.setLocalStorage("ggnew","0");
	    self.closeggtxt(null);
	};
	Model.prototype.closegg = function(event) {
		$(this.getElementByXid("image4")).hide();
		$(this.getElementByXid("image3")).hide();
		$(this.getElementByXid("span1")).hide();
	};
	Model.prototype.image4Click = function(event) {
	    ttool.setLocalStorage("picgg1new","0");
		self.closegg(null);
	};
	Model.prototype.image5Click = function(event) {
	    
		navigator.geolocation.getCurrentPosition(success, fail, null);
	};
	
	
    return Model;
});