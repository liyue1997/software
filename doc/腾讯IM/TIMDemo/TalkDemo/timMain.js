define(function(require){
	//var $ = require("jquery");
    var justep = require("$UI/system/lib/justep");
	var vConsole = require("$UI/system/lib/debug/console");
    var TIM = require("tim"); //因为wsdk支持AMD规范, 所以可以直接require
    var webjs=require("$UI/bcommon/webjs");
 
    var self;
    var type=null;
    var loginid=null;
    var Model = function(){
        this.callParent();
        self=this;
        self.tip=justep.Bind.observable("notip");
        self.count=justep.Bind.observable("");
        this.debugmode=justep.Bind.observable(window.ver);
    };
 
    Model.prototype.modelLoad = function(event){
    	self.comp("messagedata").refreshData();
    	var loginuserid=localStorage.getItem("inputuserid");//缓存的用户id
	    if(loginuserid!==null||loginuserid!=="")
	    {	
	    	loginid=self.comp("loginid").set("value",loginuserid);
	    }
	    else
	    {
	    	loginid=self.comp("loginid").set("value","");
	    }
    };
 
    Model.prototype.pushMsgReceived = function(message){
    	//console.log("timMain",message);
        var database=self.comp("messagedata");
	          var receivemessages={
	             	 	defaultValues:[{
	              id:message.ID,
	              	msgtype:message.type,
	              	msgcontent:message.elements[0].content.text,
	              	fromwho:message.from,
	              	senderImg:'0',
	              	messagestatus:message.status,
	              	isRead:message.isRead
	              	}]
	          };
	      // console.log("timMain",receivemessages);
	       database.newData(receivemessages);  
	          
	        return true;
    };
    
    
    Model.prototype.onIMMsgUnhandle = function(data){
    	//todo 把 消息列表 这个按钮 样式改变一下
    	//console.log(data.count);
    	if(data.count>0){
    		self.count.set(data.count);
    		self.tip.set("tip");
    	}
    	else
    	    self.tip.set("notip");    
    };
	Model.prototype.OpenChartListClick = function(event){
		var userid=localStorage.getItem("inputuserid");
        //todo 把样式恢复原状
        self.tip.set("notip");
        //打开一个会话列表界面  缓一下
        justep.Shell.showPage("talklist",{id:userid});
	};
    
    //登录
	Model.prototype.button1Click = function(event){
	    //TIM.handMsgReceivedfuntion=self.pushMsgReceived;
	    justep.Shell.on("onIMMsgrecive",this.pushMsgReceived,this);
	    justep.Shell.on("onIMMsgUnhandle",this.onIMMsgUnhandle,this);
	    TIM.login(self.comp("loginid").val());
	    

    	//justep.Shell.loadPage("talklist");
	   };
	
	Model.prototype.OpenChartClick = function(event){
       // justep.Shell.showPage("message",{id:'USER201908070003',pid:'am201909230076',type:'group'});
       //如果是选择群组
       //执行一个加入群组 addteam 后台会建立群组和用户的聊天关系
       //群组或个人	
		var checked1=self.comp("groupcheck").get("checked");
		if(checked1)
			type="group";
		else
			type="user";
       var teamid=self.comp("inputteamid").val();
       var userid=self.comp("loginid").val();
       if(type==="group"){
    	   webjs.pushdata("app/mapshop","addteam","&userid=" +userid+"&teamid="+teamid+"",function(data){
				justep.Shell.showPage("message",{id:userid,pid:teamid,type:type});
					},function(info){
				});
       }
       if(type==="user"){
           justep.Shell.showPage("message",{id:userid,pid:teamid,type:type});
//    	   webjs.pushdata("app/mapshop","addteam","&userid=" +userid+"&teamid="+teamid+"",function(data){
//				justep.Shell.showPage("message",{id:userid,pid:data.groupid,type:type});
//					},function(info){
//				});
       }
	};
	
	
	return Model;
    
 
});