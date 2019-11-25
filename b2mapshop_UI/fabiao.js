define(function(require){
	//var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var webjs = require("$UI/bcommon/webjs");
	var tbase = require("$UI/bcommon/tbase");
	var curtool =require("curtool");
	var webpost = require("$UI/bcommon/webpostjs");
	
	var self=null;
	var Model = function(){
		this.callParent();
		self=this;
		this.teamid= justep.Bind.observable("");
		this.fen = justep.Bind.observable(0);
		this.shopscore = justep.Bind.observable(0);
		this.fabiao= justep.Bind.observable(true);
		
	};
	Model.prototype.transUrl = function(imgname) {

		return require.toUrl('xinxing/' + imgname);
	};
	Model.prototype.image13Click = function(event){
	     if (!this.fabiao.get())
	        return;
	     console.log("image13Click");
	     var imgs=["imgxx1","imgxx2","imgxx3","imgxx4","imgxx5"];
		 for(var i = 0;i <imgs.length;i++){
		     document.getElementById(this.getIDByXID (imgs[i])).src=this.transUrl('xx3.png'); 
		    }
		    var index = event.currentTarget.dataset.index-0;
		    console.log(index);
		    for(i = 0;i <=index;i++){
		    	 document.getElementById(this.getIDByXID (imgs[i])).src=this.transUrl('xx1.png'); 
		    }
		    //index-0进行隐式转换成number
		    this.fen.set(index+1);
	};

	Model.prototype.right1Click = function(event){
		var userid= tbase.getuserid();
	    if (userid === "0")
			return;
		//console.log("fen2",this.fen.get());
		var fen=this.fen.get()*1;
		if (fen ===0)
		   {
		      tbase.showerr("请点星星给与打分");
		      return;
		   }
		//console.log("fen1",fen);
		var f=fen.toString() ;
		//console.log("fen",f);
		webjs.pushdata("/app/mapshop","fabiao","&teamid=" +self.teamid.get()+"&userid="+userid+"&credits="+f+"&creditsdesc=好评",
				        		function(data){
									tbase.showerr("谢谢您的宝贵评分");
									},function(info){
										tbase.showerr(info);
								});
				    

        // guanbi ziji
        this.close();
	};

	Model.prototype.modelLoad = function(event){
	    this.teamid.set(this.params.teamid);
	    
        //chaxun
        var userid= tbase.getuserid();
	    if (userid === "0")
			return;
		//var headpics=this.params.headpics;
		//console.log('headpics',headpics);
       
        webjs.pushdata("/app/mapshop","getshopcredits","&teamid="+self.teamid.get()+"&userid="+userid+"",
						function(data){	
						    //console.log(data);	
						    //fabiao
						    self.fen.set(data.data.shopCredits *1);
						    //self.comp("newsData").setValue("shopCredits", data.data.shopCredits *1, self.comp("newsData").getCurrentRow());
				            console.log("fen",self.fen.get());
				            self.fabiao.set(self.fen.get()===0);
					    },
					    function(info){
					    	tbase.showmsg(info);
						});
        webpost.getobj("/api/LsShop",{id:this.params.shop_id},function(data){
             console.log(data.data);
             self.shopscore.set(data.data.shopScore*1.0);
             self.comp("newsData").add(data.data);
             //self.comp("newsData").val("shop_img",headpics);
             curtool.getpicture("shop_img",self.params.shop_id,function(data){
                 console.log("pictureSurl",data.data.pictureSurl);
                 self.comp("newsData").setValue("shop_img", data.data.pictureSurl, self.comp("newsData").getCurrentRow());
              });
		
//             
//             self.pingfen.set(data.data.shopScore);
//             curtool.getpicture("shop_img",self.params.shop_id,function(data){
//                 console.log("pictureSurl",data.data.pictureSurl);
//                 self.comp("newsData").setValue("shop_img", data.data.pictureSurl, self.comp("newsData").getCurrentRow());
//              });
             //self.comp("newsData").val("shop_img",curtool.getpicture("shop_img",self.params.shop_id));
             
          },function(info){
			    	tbase.showmsg(info);
				});
		
        
	};
	Model.prototype.getscore = function(score){   
		if (score >self.shopscore.get())
	     	return this.transUrl("xx3.png");
	     	else
	     	return this.transUrl("xx1.png");
	};
	Model.prototype.getscore1 = function(score){   
		if (score >self.fen.get() )
	     	return this.transUrl("xx3.png");
	     	else
	     	return this.transUrl("xx1.png");
	};

	return Model;
});