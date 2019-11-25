define(function(require){
	//var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var webjs = require("$UI/bcommon/webjs");
	var tbase = require("$UI/bcommon/tbase");
	//var curtool = require("curtool");
	var mapshoptool = require("mapshoptool");
	var jpushInstance = require("$UI/bcommon/jpush");
	//var tim = require("$UI/bcommon/tim");
	var WindowDialog = require("$UI/system/components/justep/windowDialog/windowDialog");
	
	var self=null;
	
	var Model = function(){
		this.callParent();
		self=this;
		this.timecss =justep.Bind.observable("timered");
		this.teamid= justep.Bind.observable("");
		this.createGroupState= justep.Bind.observable(true);
	};
	
	Model.prototype.refreshThis = function(event){
	    this.teamid.set(this.params.teamid);
        this.comp("discData").refreshData();
	};

	Model.prototype.modelLoad = function(event){
	    console.log("talk modelload",this.params.teamid);
	    this.refreshThis();
        
   		//console.log("opendiag imloginok",localStorage.getItem("imloginok"));
		
        
	};
	Model.prototype.modelActive = function(event){
	    console.log("talk modelActive",this.params.teamid);
        this.refreshThis();
	};

	Model.prototype.startdiag = function(event){
		tbase.showmsg("正在登陆聊天系统，请稍后");
	    window.setTimeout(function() {
	    	self.opendiag();		
	          }, 500);
	};
	Model.prototype.opendiag = function(event){
		console.log("opendiag");
   	    if (tbase.isnull( this.teamid.get()))
		    return ;
        var imloginok=tbase.getLocalStorage("imloginok",0);
        var row=self.comp('discData');
        var userid= tbase.getuserid();
 	   if (userid === "0")
 			return;
 	   console.log("group_id",row.val("group_id"));
        if (imloginok==="1" && (row.val("group_id")*1 >0))
		{    
        	 webjs.pushdata("/app/mapshop","addteam","&groupid="+row.val("group_id")+"&userid="+userid ,
     				function(data){		
     			        //event.source.loadData(data.data);   
     			        if (data.data.groupstatus ===1)
     			        	{

		     			   		var dialog;
		     			   		if (!dialog) {
		     			   			dialog = new WindowDialog({
		     			   				title : "消息记录",
		     			   				showTitle : false,
		     			   				src : require.toUrl("$UI/bcommon/wex5/message.w"),
		     			   				// src : require.toUrl("./message.w"),
		     			   				status : "maximize",
		     			   				parentNode : self.getElementByXid("dialog")
		     			   			});
	
		     			   		}
		     			   		dialog.open({
		     			   			params : {
		     			   				id : data.data.groupId*1,
		     			   				type : "group"
		     			   			}
		     			   		});
//	     			        	var url = require.toUrl("$UI/bcommon/wex5/message.w");
//								var params = {
//									id : data.data.groupId*1,
//									type : "group"
//								};
//	                            self.comp("windowContainer2").load(url, params);
     			        	}
     			        	else
     			        	{
     			        	tbase.showmsg("聊天室还未准备好，请稍后再来");
     			        	}
     			    },
     			    function(info){
     			    	tbase.showmsg(info);
     				});
	        //self.comp("windowContainer1").setSrc(require.toUrl("$UI/bcommon/wex5/dialogList.w"));
		   // self.comp("windowContainer1").refresh();
        	
		   //tim.startsession(this.teamid.get(), function(id) {
			//						console.log("imid", id);
//									
//									var url = require.toUrl("$UI/bcommon/wex5/message.w");
//									var params = {
//										id : this.teamid.get()*1,
//										type : "group"
//									};
//                                    self.comp("windowContainer2").load(url, params);
			//					});
		}
		else
		{
			//self.comp('discData').refreshData();
		}
	};

	Model.prototype.showheads = function(){
		
       //return '<img src="./img/img_touxiang3.png" alt="" xid="image4" class="touxiang"></img><img src="./img/img_touxiang5.png" alt="" xid="image5" class="touxiang"></img><img src="./img/icon_touxiang.png" alt="" xid="image9" class="touxiang"></img><img src="./img/icon_touxiang.png" alt="" xid="image8" class="touxiang"></img><img src="./img/icon_touxiang.png" alt="" xid="image7" class="touxiang"></img><img src="./img/img_touxiang1.png" alt="" xid="image6" class="touxiang"></img>';
       var row=self.comp('discData');
       console.log("min_users showheads",row.val("min_users"));
       if (tbase.isnull( row.val("min_users")))
		    return "<span>无头像</span>";
       
       var minusers=row.val("min_users")*1;
       var users=[];
       if  ( !tbase.isnull( this.teamid.get()) &&  !tbase.isnull( row.val("headpics")))
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
	Model.prototype.discDataCustomRefresh = function(event){
		var userid= tbase.getuserid();
	 	   if (userid === "0")
	 			return;
	    if (tbase.isnull(this.teamid.get()))
	    {
            webjs.pushdata("/app/mapshop","querydisc","&discount_id="+this.params.discount_id ,
				function(data){		
			        event.source.loadData(data.data);   
			    },
			    function(info){
			    	tbase.showmsg(info);
				});
	    }
	    else
	    {
	    	//tim.inviteMember(this.teamid.get()*1,tbase.getuserid());
            webjs.pushdata("/app/mapshop","getteam","&teamid="+this.teamid.get(),
				function(data){		
			        event.source.loadData(data.data);

		        	 webjs.pushdata("/app/mapshop","addteam","&groupid="+data.data[0].group_id+"&userid="+userid
		        	        +"&teamid="+self.teamid.get() ,
		     				function(data){	
		        	 
				        	 },
			     			    function(info){
			     			    	tbase.showmsg(info);
			     				});
			    },
			    function(info){
			    	tbase.showmsg(info);
				});
	    }
	};
	
	
	Model.prototype.getusersinfo = function() {
	    //var row = event.bindingContext.$object;
		var row=this.comp('discData');
		if (tbase.isnull( this.teamid.get()))
		    return "";
		else
		{
		    var u=row.val("min_users")*1-row.val("teamusercount")*1;
		    return "仅剩"+u+"个名额";
		}
		    return "";
	};
	

	Model.prototype.getlefttime = function() {
		var row=this.comp('discData');
		return mapshoptool.getlefttime(row,this.teamid.get());
	};

	Model.prototype.getlefttimecss = function() {
		var row=this.comp('discData');
		if (tbase.isnull( this.teamid.get()))
		    return "";
		else
		{
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
	
	Model.prototype.hasteam = function() {
	   // var row=this.comp('discData');
	    //var row = event.bindingContext.$object;
        //var row=this.comp('discData').getRowByID(disid);
		return !tbase.isnull( this.teamid.get());
	};
	
	Model.prototype.hascancle = function() {
	   //未完成 未取消
	    if (tbase.isnull(this.teamid.get()))
	       return false;
	    var row=this.comp('discData');
	   // console.log("iscancle",row.val("iscancle"));
	    if ( row.val("isvalided")===0)
	        return false;
	    
	    if ( row.val("iscancle")===1)
	        return false;
	    
	   // console.log("finish",true);    
		return true;
	};
	Model.prototype.hasjoin = function() {
	   //未完成 未取消
	    if (tbase.isnull(this.teamid.get()))
	       return false;
	    var row=this.comp('discData');
	   // console.log("iscancle",row.val("iscancle"));
	    if ( row.val("isvalided")===0)
	        return false;
	    
	    if ( row.val("iscancle")===1)
	        return false;
	    
	   // console.log("finish",true);    
		return true;
	};
	
	//完成
	Model.prototype.finish = function() {
	    //已完成 未取消
	    if (tbase.isnull(this.teamid.get()))
	       return false;
	    var row=this.comp('discData');
	   // console.log("iscancle",row.val("iscancle"));
	    if ( row.val("isvalided")===1)
	        return false;
	    
	    if ( row.val("iscancle")===1)
	        return false;
	    
	   // console.log("finish",true);    
		return true;
	};
	Model.prototype.btnjoinClick = function(event){
	   // var row=this.comp('discData');
	    var userid= tbase.getuserid();
	   if (userid === "0")
			return;
        tbase.confirm(this,this.getElementByXid("panel1"),"加入拼团吗？",function(){
            webjs.pushdata("/app/mapshop","jointeam","&team_id="+self.teamid.get()+"&userid="+userid ,
				function(data){	
				    self.teamid.set(data.data.teamId);
                    self.comp("discData").refreshData();	
			        tbase.showmsg("加入成功");
//			        jpushInstance.getRegistrationID().done(function(id){
//			        	justep.Bass.sendRequest({
//			        		"method":"post",
//			        		"url":"/jpush/jpush",
//			        		"action":"push",
//			        		"params":{
//			        			registrationId:id,
//			        			input:"加入成功"
//			        		},
//			        		"success":function(data){
//			        			alert("通知:组队成功已推送！");
//			        		}
//			        	});
//			        });      
			    },
			    function(info){
			    	tbase.showmsg(info);
				});
        });
	};

	Model.prototype.btnstartClick = function(event){
	    var row=this.comp('discData');
	    var userid= tbase.getuserid();
        tbase.confirm(this,this.getElementByXid("panel1"),"发起拼团吗？",function(){
        	 webjs.pushdata("/app/mapshop","startteam","&discount_id="+row.val("discount_id")+"&userid="+userid ,
						function(data){		
						    self.teamid.set(data.data.teamId);
		                    self.comp("discData").refreshData();	        
					        tbase.showmsg("发起成功");
					        
					        //self.opendiag();
					    },
					    function(info){
					    	tbase.showmsg(info);
						});
        	
        });

	};
	
	Model.prototype.button2Click = function(event){
	    var userid= tbase.getuserid();
        tbase.confirm(this,this.getElementByXid("panel1"),"取消拼团吗？",function(){
            webjs.pushdata("/app/mapshop","cancleteam","&team_id="+self.teamid.get()+"&userid="+userid ,
				function(data){	
				    self.teamid.set(data.data.teamId);
                    self.comp("discData").refreshData();	
			        tbase.showmsg("取消成功");
 
			    },
			    function(info){
			    	tbase.showmsg(info);
				});
        });
	};
		
	
	Model.prototype.button1Click = function(event){
	    var row=this.comp('discData');
	   // console.log("headpics",row.val("headpics"));
		justep.Shell.showPage("fabiao",{teamid:self.teamid.get(),shop_id:row.val("shop_id")});
	};
	
	//聊天
	Model.prototype.button3Click = function(event){
	     /*console.log(" self.startdiag");
         self.startdiag();*/
         var userid= tbase.getuserid();
         var teamid= self.teamid.get();
         //var row=this.comp('discData');
         console.log("tencentIMpage...");
         //justep.Shell.showPage("TIMmessage",{teamid:self.teamid.get(),discount_name:row.val("discount_name")});
    	   webjs.pushdata("app/mapshop","addteam","&userid=" +userid+"&teamid="+teamid+"",function(data){
				justep.Shell.showPage("TIMmessage",{id:userid,pid:self.teamid.get(),type:"group"});
					},function(info){});
	};
	
	
	Model.prototype.gotomainpage = function(event){
		justep.Shell.showPage("main");
		this.close();
	};
		
	
	Model.prototype.col3Click = function(event){
		justep.Shell.showPage("shoppage");
		this.close();
	};	
	
	
	return Model;
});