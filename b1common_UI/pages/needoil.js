define(function(require) {
	var justep = require("$UI/system/lib/justep");
	var ttool = require("$UI/p_common/tbase");
	//var curtool= require("curtool");	
	var webjs = require("$UI/p_common/webjs");
	var Model = function() {
		this.callParent();
	};
	var oilprice=0;
	var serverprice=0;
	Model.prototype.btnCloseClick = function(event) {
		justep.Shell.closePage();
	};
	Model.prototype.btnLoginClick = function(event) {
	   //  var self=this;
         var unit=this.comp("inputvalue").val()*1.0;
		var userid = ttool.getuserid();
		if (userid === "0")
		{		    
			return;
	     }
	     webjs.check(function(){
		     webjs.pushdata("applyoil","&userid="+userid+"&unit="+unit.toString(),function(data){
	              ttool.showmsg("您的订单号为"+data.info+",请保持手机畅通,系统即将为您分配师傅为您加油");
	              justep.Shell.closePage();
	              
	         },function(info){
	             ttool.showerr(info);
	         });
	     });
	};
	Model.prototype.initdata=function()
	{
	     var self=this;
	     var userid = ttool.getuserid();
		if (userid === "0")
		{		    
			return;
	     }
         webjs.pushdata("getoilinfo","&userid="+userid,function(data){
              oilprice=data.oilprice;
              serverprice=data.serverprice;
             $(self.getElementByXid('spntoday')).text('￥'+oilprice+'元/升');
              if (serverprice=="0")
                {$(self.getElementByXid('spnserver')).text('*活动期间免服务费用！');}
              else
                {$(self.getElementByXid('spnserver')).text('*收取相关服务费用：'+serverprice+'元!');}
              $(self.getElementByXid('spntime')).text('*'+data.starttime+'到'+data.endtime+'根据法律规定不提供服务!');
         },function(info){
             ttool.showerr(info);
         });
	};
	Model.prototype.modelLoad = function(event){
	   this.initdata();
	};
	Model.prototype.modelActive = function(event){
         this.initdata();
	};
	Model.prototype.inputvalueChange = function(event){
             var self=this;
             var unit=this.comp("inputvalue").val()*1.0;
             var totol=Math.round((unit*oilprice+serverprice*1)*100)/100;
             
             
             $(self.getElementByXid('spnprice')).text(totol.toString());
	};
	
	
	return Model;

});