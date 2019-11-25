define(function(require) {
	//var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("$UI/p_common/main");
	var webjs = require("$UI/p_common/webjs");
	var ttool = require("$UI/p_common/tbase");
	//var curtool = require("curtool");
	//var tim= require ("$UI/p_common/tim" ); //聊天功能
	var me=null;
	var autorefresh=true;

	var Model = function() {
		this.callParent();
		this.showinfo1=justep.Bind.observable(false);
		this.showinfo2=justep.Bind.observable(true);
		
		me=this;
		this.siji=justep.Bind.observable("司机");
		this.chepai=justep.Bind.observable("车牌号");
		this.status=justep.Bind.observable("等待分配");		
		this.statusid=justep.Bind.observable("00");
		this.tel=justep.Bind.observable(ttool.getLocalStorage("telofpt",""));
		this.applyid=justep.Bind.observable("0");
		this.money=justep.Bind.observable("0");
		this.picture=justep.Bind.observable("images/fluck-headImg.png");
       
	};
	Model.prototype.contents1ActiveChange = function(event) {
		/*
		 * var to = event.to; if (to >= 1) { // 优化内存占用 $('.x-window-container',
		 * this.comp('content1').$domNode).css('display', 'none');
		 * this.comp('windowContainer' + (to)).$domNode.css('display', 'block');
		 * 
		 * this.comp('windowContainer' + (to)).load(); }
		 */
	};
	Model.prototype.itemSharedClick = function(event) {
		
	};
	Model.prototype.modelActive = function(event) {
	    //this.comp('windowContainer1').src=curtool.geturl("commonMap");
	    //this.comp('windowContainer1').load();
	    autorefresh=true;
		this.getapply();
	};
	
	Model.prototype.modelInactive = function(event){
        autorefresh=false;
	};
	Model.prototype.modelLoad = function(event) {
	   // this.comp('windowContainer1').src=curtool.geturl("commonMap");
	  // this.comp('windowContainer1').load();
	  autorefresh=true;
	   this.getapply();
	   justep.Shell.on("onMsgrecive", this.tbackfuntion, this);
	};
	Model.prototype.modelUnLoad = function(event){
	   autorefresh=false;
       justep.Shell.off("onMsgrecive", this.tbackfuntion);
	};
	Model.prototype.windowDialog1Receive = function(event){

	};
	Model.prototype.tbackfuntion = function(event){
		//justep.Util.hint("新通知："+info);
		 ttool.showmsg("新通知："+event.info);
		 me.getapply();
	};
	Model.prototype.modelModelConstruct = function(event){
	  //
	   var self=this;
	   
	   //document.addEventListener('onpush', function(info){alert(info); self.getapply(null);}, false);
      //tim.iminit( this);
      if (ttool.isweb())
      {
          //web 应用，每10秒刷新一次
          window.setInterval(function(){ 
	        self.getapply();
			}, 10000);
      }
      else
      {
          //手机应用30秒刷新一次，收到push 刷新
    	 // curtool.setbackfuntion(self.tbackfuntion);
          window.setInterval(function(){ 
	        self.getapply();
			}, 30000);
      }
        
	};
	
	Model.prototype.getapply = function(event){
	      if (!autorefresh)
	          return;
	      var self=this;
		  var userid=ttool.getuserid_nocheck(); if (userid=="0") return;
		  return;
          webjs.pushdata("getapplylast","&userid="+userid,
        		function(datalast){
        	  var data=datalast.apply;

        	  var gg1= ttool.getLocalStorage("gg1","");
        	  ttool.setLocalStorage("gg1",datalast.gg1.value);
        	  if (gg1!==datalast.gg1.value)
        	  {
        		  ttool.setLocalStorage("ggnew","1");
        	  }
        	  
        	  var picgg1= ttool.getLocalStorage("picgg1","");
        	  if (picgg1 !== datalast.picgg1.value)
        	  {
        	      ttool.setLocalStorage("picgg1",datalast.picgg1.value);
        	      ttool.setLocalStorage("picgg1time",datalast.picgg1.value1);
        	      ttool.setLocalStorage("picgg1new","1");
        	  }
        	  ttool.setLocalStorage("telofpt",datalast.telofpt.value);//平台电话
        	  
        	  
        		self.statusid.set(data.t_pthandle+data.t_carhandle);
        	  if (data.t_applyid=="0" ||data.t_pthandle=="2" ||data.t_carhandle=="2" ||data.t_carhandle=="4")//没有订单 或者完成 或者废弃
        		  {
        			self.showinfo2.set(true);
        			self.showinfo1.set(false);
        			self.comp('bottom1').set({"height":"48"});
        			self.applyid.set("0");
        			self.money.set("0");
        			return;
        		  }
      		self.showinfo2.set(false);
      		self.showinfo1.set(true);
      		self.applyid.set(data.t_applyid);
      		self.money.set(data.t_money);
      		self.comp('bottom1').set({"height":"170"});
        	  if (data.t_pthandle=="0")//平台未处理
        		  {

        			self.siji.set("司机");
        			self.chepai.set("车牌号");
        			self.status.set("单号:"+data.t_applyid+"等待分配，请保持手机畅通");
        			self.tel.set(ttool.getLocalStorage("telofpt",""));
        			self.picture=justep.Bind.observable("images/fluck-headImg.png");
        		  }
        	  else if (data.t_carhandle=="1")
        		  {
      			self.siji.set(data.sjname);
      			self.chepai.set(data.t_carcar);
      			self.status.set("单号:"+data.t_applyid+"已经分配司机，请保持手机畅通");
      			self.tel.set(data.t_tel);
      			self.picture=justep.Bind.observable(data.sjpicture);
        		  }
        	 else if (data.t_carhandle=="3")
        		  {
      			self.siji.set(data.sjname);
      			self.chepai.set(data.t_carcar);
      			self.status.set("单号:"+data.t_applyid+",金额:"+data.t_money+"元,司机已经接单,请保持手机畅通");
      			self.tel.set(data.t_tel);
      			self.picture=justep.Bind.observable(data.sjpicture);
        		  }
          },function(info){ttool.showerr(info);});
      
	};
	Model.prototype.btnneedClick = function(event){
		var userid = ttool.getuserid();
		if (userid === "0")
			return;
		//alert("等待实现");
		justep.Shell.showPage("needoil");
		
		
	};
	Model.prototype.btnsendsms = function(event){
	   // alert(this.statusid.get());
       // alert(this.tel.get());
       //event.fire({type:'onpush'});
	};
	Model.prototype.btntel = function(event){
         alert(this.tel.get());
	};
	Model.prototype.col11Click = function(event){
	     if (this.applyid.get()=="0")
	     {
	          alert("没有可取消的订单，请重新登录");
	          self.getapply();
	          return;
	     }
	     var self=this;
		var userid=ttool.getuserid();	 if (userid==="0") return;
         // 向后台设置预订单 username tradeout money
			webjs.pushdata("cancelapply", "&userid=" + userid + "&applyid=" + this.applyid.get() , function(data) {
				ttool.showmsg("取消成功");
				self.getapply();
			}, function(info) {
				ttool.showerr(info);

			});
	};
	Model.prototype.btnzhifu = function(event){
	    var self=this;
	    if (this.applyid.get()=="0")
	     {
	          alert("没有可支付的订单，请重新登录");
	          self.getapply();
	          return;
	     }
        this.zhifu(self.money.get(),this.applyid.get());
	};
	
	Model.prototype.zhifu = function(money,applyid){
	    var username = localStorage.getItem("username");
		var userid=ttool.getuserid();	 if (userid==="0") return;
		if (this.statusid.get()!="13")
		{
		    alert("司机未确定价格，请联系司机");
		    return;
		}
		var self = this;
     
		var NowTime = new Date();
		var t = NowTime;
		var tradeout = userid + t.getFullYear() + (t.getMonth() + 1) + t.getDate() + t.getHours() + t.getMinutes() + t.getSeconds();
		tradeout=window.starttradecode+tradeout;
		

			// 向后台设置预订单 username tradeout money
			webjs.pushdata("paymoeny", "&userid=" + userid + "&tradecode=" + tradeout + "&money=" + money+ "&applyid=" + applyid, function(data) {
				$(self.getElementByXid("mainPanel")).hide();
					self.comp("windowDialog2").open({
		                "src":require.toUrl("./payCommon.w"),
						"data" : {
							"name" : "神速送油单号:"+applyid,
							"moneysum" : money,
							"account" : username,
							"tradecode" : tradeout,
							"applyid" : applyid
						}
					});
				//$(self.getElementByXid("mainPanel")).show();
			}, function(info) {
				ttool.showerr(info);

			});
		
	};
	Model.prototype.windowDialog2Close = function(event){
$(this.getElementByXid("mainPanel")).show();
	};
	return Model;
});