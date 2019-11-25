define(function(require) {
	var justep = require("$UI/system/lib/justep");
	var touch = require("./js/touch");
	require("./js/jquery.min");

    require("cordova!cordova-plugin-geolocation");
    //require("cordova!cordova-plugin-compat");
	require("cordova!phonegap-plugin-launchnavigator");
	var webjs = require("$UI/bcommon/webjs");
	var tbase = require("$UI/bcommon/tbase");
	var curtool = require("curtool");
	var baidumap=null;
	//var tim= require ("$UI/bcommon/tim" ); //聊天功能
	var self=null;
	
	var map=null;
	var autorefresh=true;

	var Model = function() {
		this.callParent();
		this.showinfo1=justep.Bind.observable(true);
		
		self=this;
       
	};
	Model.prototype.modelLoad = function(event) {
		   autorefresh=true;
		   justep.Shell.on("onMsgrecive", this.tbackfuntion, this);
		    this.loadBaiduMap("南京");
			this.swipeTouch();
		};
		Model.prototype.modelUnLoad = function(event){
		   autorefresh=false;
	       justep.Shell.off("onMsgrecive", this.tbackfuntion);
		};
	
	Model.prototype.modelActive = function(event) {
	    autorefresh=true;
	    if (map !== null)
	    {
	    	var point = new BMap.Point(curtool.getcrulon(),curtool.getcrulan());
			map.centerAndZoom(point, 15	);
	    }
		
	};
	
	Model.prototype.modelInactive = function(event){
        autorefresh=false;
	};
	
	Model.prototype.getDistance = function(shoplan,shoplon) {
		return "距您"+curtool.GetDistanceStr(shoplan,shoplon,curtool.getcrulan(),curtool.getcrulon());
	};
	
	Model.prototype.tbackfuntion = function(event){
		tbase.showmsg("新通知："+event.info);

	};
	

	Model.prototype.loadBaiduMap = function(cityname) {
		var id = this.getIDByXID("baiduMap");
		window._baiduInit = function() {
		    console.log("map _baiduInit");
		    baidumap=BMap;
			map = new baidumap.Map(id);
			var point = new baidumap.Point(curtool.getcrulon(),curtool.getcrulan());

			map.centerAndZoom(point, 15	);
			map.enableScrollWheelZoom(true);
		    console.log("refreshData");
		    self.comp("newsData").refreshData();
			
		};
		require([ 'http://api.map.baidu.com/api?v=3.0&ak=HTaxBoWvUHHaqPGpcrZkayIeFqPt5lAr&callback=_baiduInit' ], function() {
			if (!(window.BMap && window.BMap.apiLoad)){
				window._baiduInit();
			}
		});
	};

		
		
	Model.prototype.swipeTouch = function(){
	    var me=this;
		var newsContentID = this.getIDByXID('colcontent');
		touch.on('#'+ newsContentID, 'touchstart', function(ev){
			ev.preventDefault();
		});
		
		touch.on('#'+ newsContentID, 'drag', function(ev){
		   console.log("drag:"+ev.direction);

		});
		touch.on('#'+ newsContentID, 'dragend', function(ev){
			if(ev.direction === "left"){
			    me.comp('newsData').next();
			    self.findMarker(me.comp('newsData').val("shop_lat"),me.comp('newsData').val("shop_lon"));
			}else if(ev.direction === "right"){
			    me.comp('newsData').pre();
			    self.findMarker(me.comp('newsData').val("shop_lat"),me.comp('newsData').val("shop_lon"));
			}
		});
	};
	Model.prototype.findMarker=function(x,y)
	{
		var allOverlay = map.getOverlays();//获取所有标注点
		for (var i = 0; i < allOverlay.length; i++){
			if (allOverlay[i].point ===null)
			   continue;
			
				if(allOverlay[i].point.lat === x*1.0
				    &&allOverlay[i].point.lng===y*1.0){
				     self.changeMarker(allOverlay[i]);
				     break;
				}
		}
	};
	var PreviousPoint = null; 
	Model.prototype.getIcon=function(no1)
	{
	    var pointAIcon2=  new baidumap.Icon("http://api.map.baidu.com/img/markers.png", new baidumap.Size(23, 25), {  
                             offset: new baidumap.Size(10, 25), // 指定定位位置  
                             imageOffset: new baidumap.Size(0, 0 - no1 * 25) // 设置图片偏移  
	                    });
	                 return pointAIcon2;
	};
	Model.prototype.changeMarker=function(marker)
	{
           	//被点击的形态改变
	            	if(PreviousPoint!==null){
	            	    PreviousPoint.setAnimation();
	                    PreviousPoint.setIcon(self.getIcon(11));
                        PreviousPoint.setTop(false);
	            	}
                    marker.setIcon(self.getIcon(10));
                    marker.setTop(true);
	            	PreviousPoint=marker;
	                PreviousPoint.setAnimation(2);//跳动的动画
	};

	Model.prototype.addMarker= function (map1,point,info){  // 创建图标对象     
	    console.log("addmarker",info);
         var p=new baidumap.Point(point.lng,point.lat);
		var  marker = new baidumap.Marker(p);
		marker.setIcon(self.getIcon(11));
		//marker.setAnimation(2);
		map.addOverlay(marker);
		
		(function() {
		
				
	            marker.addEventListener("click",function(e){
	                self.changeMarker(this);
	                showInfo(this,point);
	                 
	            });
	        })();
	};   
	Model.prototype.dataCustomRefresh = function(event){
	     if (map===null)
	    	 return;
	     map.clearOverlays();
	     //取出 地图的左上和右下 2个坐标点
	     var Bounds=map.getBounds();
	     var zlon=Bounds.getSouthWest().lng;
	     var zlan=Bounds.getNorthEast().lat;
	     var ylon=Bounds.getNorthEast().lng;
	     var ylan=Bounds.getSouthWest().lat;
	     console.log("左上角："+zlon+","+zlan+"\n"+"右下角："+ylon+","+ylan);
         webjs.pushdata("/app/mapshop","queryshops","&shopname="+this.comp("inputSearch").val() 
        		 +"&zlon="+zlon+"&zlan="+zlan+"&ylon="+ylon+"&ylan="+ylan,
				function(data){		
			        event.source.loadData(data.data);
			        self.showinfo1.set(data.data.length>0);
			        if (data.data.length>0)
			        {
			        	var point = new baidumap.Point(data.data[0].shop_lon,data.data[0].shop_lat);
						map.centerAndZoom(point, 15	);
			        }
			        else
			        {
			            tbase.confirm(self,self.getElementByXid("panelMain"),"没有搜索到符合条件的商铺，是否跳转到距你最近的商铺?",function(){
			                
			        	   var point = new baidumap.Point(118.808667,31.97187);
						   map.centerAndZoom(point, 15	);
	                       self.comp("newsData").refreshData();
			            });
			        }
			        for (var i=0;i<data.data.length;i++)
			        {
       	        	   var point={"lng":data.data[i].shop_lon,"lat":data.data[i].shop_lat,"url": data.data[i].shop_img  ,
       	        	   "id":data.data[i].shop_id,"name":data.data[i].shop_name};
       	   		        self.addMarker(map,point,data.data[i].shop_name);
       	   		        	
       	            }
			    }		       ,
			    function(info){
			    	tbase.showmsg(info);
				});
					
				
	};

	//显示信息窗口，显示标注点的信息。  
	function showInfo(thisMaker,point){  
		var p = new baidumap.Point(point.lng,point.lat);
		map.centerAndZoom(p, 16	);
	    self.comp("newsData").to(self.comp("newsData").getRowByID(point.id)) ;	   
	}
    
	Model.prototype.col3Click = function(event){
		var me=this;
		me.close();
		justep.Shell.showPage("main");
	};
	
	Model.prototype.transUrl = function(imgname) {
		return require.toUrl('xinxing/' + imgname);
	};
	Model.prototype.getscore = function(score,shopscore){   
		if (score >shopscore)
	     	return this.transUrl("xx3.png");
	     	else
	     	return this.transUrl("xx1.png");
	};
	Model.prototype.input5Keydown = function(event){
           console.log(event.keyCode);
        if(event.keyCode == 13){
           console.log("huiche");
           self.comp("newsData").refreshData();
       }
	};
	
	//距离
	Model.prototype.col9Click = function(event){
		this.comp("popOver2").hide();
		if ($(this.comp("popOver1").$domNode).css("display") == "block") {
			this.comp("popOver1").hide();
		} else {
			this.comp("popOver1").show();
		}
	};
	//全部
	Model.prototype.col7Click = function(event){
		this.comp("popOver1").hide();
		if ($(this.comp("popOver2").$domNode).css("display") == "block") {
			this.comp("popOver2").hide();
		} else {
			this.comp("popOver2").show();
		}
	};
	
	Model.prototype.button2Click = function(event){
		var shopid=this.comp("newsData").getCurrentRow().val("shop_id");
		console.log(shopid);
		justep.Shell.showPage("shoppage",{shop_id:shopid});
	};

	Model.prototype.list1Click = function(event){
		var data = this.comp("conditionRow");
		data.setValue("fState", "0", data.find([ "fState" ], [ "1" ], true, true, true)[0]);
		var row = data.getCurrentRow();
		data.setValue("fState", "1", row);
		this.comp("col9").set("span", data.getValue("fName", row));

		this.comp("popOver2").hide();
	};

	Model.prototype.button5Click = function(event){
		//取出 地图的左上和右下 2个坐标点
	     self.comp("newsData").refreshData();
	};

	return Model;
});