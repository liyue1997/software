define(function(require){
	//var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var webpost = require("$UI/bcommon/webpostjs");
	var webjs = require("$UI/bcommon/webjs");
	var tbase = require("$UI/bcommon/tbase");
	var curtool = require("curtool");
	var mapshoptool = require("mapshoptool");
	require("cordova!phonegap-plugin-launchnavigator");
	
	var self=null;
	
	var Model = function(){
		this.callParent();
		self=this;
		this.pingfen=justep.Bind.observable(2);
		//this.timecss =justep.Bind.observable("time");
		this.shoucang=justep.Bind.observable(false);
		
	};
	Model.prototype.modelModelConstruct = function(event){
	};

	Model.prototype.image1Click = function(event){
		justep.Portal.closeWindow();
	};
	
	Model.prototype.transUrl = function(imgname) {
		return require.toUrl('xinxing/' + imgname);
	};
	
	Model.prototype.getshoucang = function() {
	    if (this.shoucang.get())
		    return require.toUrl('./img/shoucang1.png' );
		else
		    return require.toUrl('./img/shoucang0.png' );
		 
	};
	Model.prototype.showxx = function(fen){
//		if (fen >this.pingfen.get())
//		   return this.transUrl("xx3.png");
//		else
//		   return this.transUrl("xx1.png");
	};
	Model.prototype.getDistance = function(shoplan,shoplon) {
		return "距离你"+curtool.GetDistanceStr(shoplan,shoplon,curtool.getcrulan(),curtool.getcrulon());
	};
	Model.prototype.getscore = function(score,shopscore){   
		if (score >shopscore)
	     	return this.transUrl("xx3.png");
	     	else
	     	return this.transUrl("xx1.png");
	};
	
	Model.prototype.modelLoad = function(event){
        console.log(this.params.shop_id);
        var userid= tbase.getuserid();
	   if (userid === "0")
			return;
	   
       webjs.pushdata("/app/mapshop","getloveshop","&userid="+userid +"&shopid="+this.params.shop_id	,
				function(data){		
			        //event.source.loadData(data.data);
					self.shoucang.set(data.info==="1");
			    },
			    function(info){
			    	tbase.showmsg(info);
				});
        webpost.getobj("/api/LsShop",{id:this.params.shop_id},function(data){
             console.log(data.data);
             
             self.comp("newsData").add(data.data);
             
             self.pingfen.set(data.data.shopScore);
             curtool.getpicture("shop_img",self.params.shop_id,function(data){
                 console.log("pictureSurl",data.data.pictureSurl);
                 self.comp("newsData").setValue("shop_img", data.data.pictureSurl, self.comp("newsData").getCurrentRow());
              });
             //self.comp("newsData").val("shop_img",curtool.getpicture("shop_img",self.params.shop_id));
             
          },function(info){
			    	tbase.showmsg(info);
				});

	};

	Model.prototype.col4Click = function(event){
        var adress=this.comp('newsData').val("shopAddress");
        if (tbase.isweb())
        	{
        	   tbase.showmsg("地址："+adress);
        	   return;
        	
        	}
        var dest=this.comp('newsData').val("shopFullname");
	    curtool.navigate(dest);
	};

	Model.prototype.discDataCustomRefresh = function(event){
	    
        webjs.pushdata("/app/mapshop","querydisc","&shop_id="+this.params.shop_id ,
				function(data){		
			        event.source.loadData(data.data);
			        
			    }		       ,
			    function(info){
			    	tbase.showmsg(info);
				});
	};
	
	Model.prototype.hasteam = function(row) {
	    //var row = event.bindingContext.$object;
//		var row=this.comp('discData').getRowByID(disid);
		if (tbase.isnull( row.val("last_team_id")))
		    return false;
		var str=row.val("valid_date");
        var date1=justep.Date.fromString(str,'yyyy-MM-dd hh:mm:ss');
	    console.log("hasteam",str);
        var date2=new Date();
        var between = justep.Date.diff(date2,date1,'n');
        console.log("between",between);
        if (between<=0)
           return false;
		return true ;
	};
	
	Model.prototype.getusersinfo = function(row) {
	    //var row = event.bindingContext.$object;
//		var row=this.comp('discData').getRowByID(disid);
		if (!this.hasteam( row))
		    return "";
		else
		{
		    var u=row.val("min_users")*1-row.val("teamusercount")*1;
		    return "仅剩"+u+"个名额";
		}
		    return "";
	};
	
	Model.prototype.getLefttime1 = function(str) {
	    return mapshoptool.getLefttime1(str);
	};
	Model.prototype.getlefttime = function(row) {
//		var row=this.comp('discData').getRowByID(disid);
		if (!this.hasteam( row))
		    return "";
		else
		{
		    return self.getLefttime1(row.val("valid_date"));
		}
		    return "";
	};

	Model.prototype.getlefttimecss = function(row) {
//		var row=this.comp('discData').getRowByID(disid);
		if (tbase.isnull( row.val("last_team_id")))
		    return "";
			else{
				    var date1=justep.Date.fromString(row.val("valid_date"),'yyyy-MM-dd hh:mm:ss');
			        var date2=new Date();
			        var between = justep.Date.diff(date2,date1,'n');
		        if (between>60)
		        		return "fcontentgreen";
		        	else
		        		return "fcontentred";
				}
		    return "";
	};

	Model.prototype.btnjoinClick = function(event){
	    var row = event.bindingContext.$object;
        justep.Shell.showPage("talk",{teamid:row.val("last_team_id")});
	};

	Model.prototype.btnstartClick = function(event){
	    var row = event.bindingContext.$object;
        justep.Shell.showPage("talk",{discount_id:row.val("discount_id")});

	};

	Model.prototype.modelActive = function(event){
        self.comp("discData").refreshData();
	};

	Model.prototype.showheads = function(row){   
       //return '<img src="./img/img_touxiang3.png" alt="" xid="image4" class="touxiang"></img><img src="./img/img_touxiang5.png" alt="" xid="image5" class="touxiang"></img><img src="./img/icon_touxiang.png" alt="" xid="image9" class="touxiang"></img><img src="./img/icon_touxiang.png" alt="" xid="image8" class="touxiang"></img><img src="./img/icon_touxiang.png" alt="" xid="image7" class="touxiang"></img><img src="./img/img_touxiang1.png" alt="" xid="image6" class="touxiang"></img>';
        //var row = event.bindingContext.$object;
       console.log("min_users",row.val("min_users"));
      return mapshoptool.showuserheads(row);
	};
	Model.prototype.image3Click = function(event){
       var userid= tbase.getuserid();
	   if (userid === "0")
			return;
	   if (this.shoucang.get())
	   {
	       webjs.pushdata("/app/mapshop","unloveshop","&userid="+userid +"&shopid="+self.comp("newsData").val("shopId")	,
				function(data){		
			        //event.source.loadData(data.data);
					self.shoucang.set(false);
					tbase.showmsg("取消收藏成功");
			    }		       ,
			    function(info){
			    	tbase.showmsg(info);
				});
	   }
	   else{webjs.pushdata("/app/mapshop","loveshop","&userid="+userid +"&shopid="+self.comp("newsData").val("shopId")	,
				function(data){		
			        //event.source.loadData(data.data);
					self.shoucang.set(true);
					tbase.showmsg("收藏成功");
			    }		       ,
			    function(info){
			    	tbase.showmsg(info);
				});}
       
	};
	Model.prototype.image5Click = function(event){
       curtool.share();
	};
	return Model;
});