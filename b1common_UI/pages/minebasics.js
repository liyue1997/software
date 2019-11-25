define(function(require) {
	var $ = require("jquery");
	var ttool= require("$UI/p_common/tbase");
	var webjs = require("$UI/p_common/webjs");
	var webpostjs = require("$UI/p_common/webpostjs");
	var justep = require("$UI/system/lib/justep");
	var curtool= require("curtool");	
	
	require("css!./layer-alert").load();
	require("./layer-alert");
	var layeralert=require("./layer-alertshow");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.personInfoDataCustomRefresh = function(event) {
	
		var userid = ttool.getuserid(); if (userid==="0") return;
		webjs.pushdata("app/auth","getuser","&userid=" + userid,function(data) {
		            console.log(data);
					event.source.loadData([ data.data ]);
				},function (info){
				    ttool.showerr(info);
				} );
	};

	Model.prototype.nickNameRowClick = function(event) {
//		var strconent = '<div class="layer-alert"><div class="layer-alert-top"><span class="layer-alert-leftTop" onclick="layer.closeAll()">取消</span><span class="layer-alert-rightTop" onclick="updateAttr(&quot;.nickNameSpan&quot;,&quot;新的昵称&quot;)">完成</span></div>';
//		strconent += '<div class="layer-alert-content"><input type="text" class="layer-alert-input" placeholder="请输入新的昵称"/><div>';
//		strconent += '</div>';
//		layeralert.show(strconent);
	};
	Model.prototype.realNameRowClick = function(event) {
		var strconent = '<div class="layer-alert"><div class="layer-alert-top"><span class="layer-alert-leftTop" onclick="layer.closeAll()">取消</span><span class="layer-alert-rightTop" onclick="updateAttr(&quot;.realNameSpan&quot;,&quot;真实姓名&quot;)">完成</span></div>';
		strconent += '<div class="layer-alert-content"><input type="text" class="layer-alert-input" placeholder="请输入姓名"/><div>';
		strconent += '</div>';
		layeralert.show(strconent);
	};
	Model.prototype.carowClick = function(event) {
//		var strconent = '<div class="layer-alert"><div class="layer-alert-top"><span class="layer-alert-leftTop" onclick="layer.closeAll()">取消</span><span class="layer-alert-rightTop" onclick="updateAttr(&quot;.t_car&quot;,&quot;车牌&quot;)">完成</span></div>';
//		strconent += '<div class="layer-alert-content"><input type="text"  class="layer-alert-input" placeholder="请输入车牌"/><div>';
//		strconent += '</div>';
//		layeralert.show(strconent);
	};
	Model.prototype.companyrowClick = function(event) {
//		var strconent = '<div class="layer-alert"><div class="layer-alert-top"><span class="layer-alert-leftTop" onclick="layer.closeAll()">取消</span><span class="layer-alert-rightTop" onclick="updateAttr(&quot;.t_company&quot;,&quot;公司&quot;)">完成</span></div>';
//		strconent += '<div class="layer-alert-content"><input type="text"  class="layer-alert-input" placeholder="请输入公司"/><div>';
//		strconent += '</div>';
//		layeralert.show(strconent);
	};
	Model.prototype.qqRowClick = function(event) {
//		var strconent = '<div class="layer-alert"><div class="layer-alert-top"><span class="layer-alert-leftTop" onclick="layer.closeAll()">取消</span><span class="layer-alert-rightTop" onclick="updateAttr(&quot;.t_qq&quot;,&quot;QQ号&quot;)">完成</span></div>';
//		strconent += '<div class="layer-alert-content"><input type="text" onkeyup="this.value=this.value.replace(/[^0-9.]/g,\'\')"  class="layer-alert-input" placeholder="请输入QQ号"/><div>';
//		strconent += '</div>';
//		layeralert.show(strconent);
	};

	Model.prototype.modelLoad = function(event) {
		
		this.surl = justep.Bind.observable("");
	};
	Model.prototype.btnSaveClick = function(event) {
		var userid =ttool.getuserid();
		// 获取要保存的信息
		var me=this;
		
		var iamgesrc = $(this.getElementByXid("image1")).attr("src");
		var nickname = $(this.getElementByXid("nickNameSpan")).text();	
		
		var realNameSpan = $(this.getElementByXid("realNameSpan")).text();
		var qq = $(this.getElementByXid("t_qq")).text();
		var company = $(this.getElementByXid("t_company")).text();
		var car = $(this.getElementByXid("t_car")).text();
		
		//String qq,String username,String picture,String realname,String company,String car
		ttool.confirm(this, "确定提交?",function(){
		//webjs.pushdata("api/TsUser","updateuser","&userid=" + userid + "&qq=" + qq + "&username=" + nickname+ "&realname=" + realNameSpan
		//			+ "&picture="+iamgesrc+"&company=" + company + "&car=" + car
		webjs.pushdata("app/auth","saveuser","&userid=" + userid + "&username=" + realNameSpan
					+ "&pictureurl="+iamgesrc+ "&picturesurl=" + me.surl.get(),function(data) {
		            
				},function (info){
				    ttool.showerr(info);
				} );
					//保存成功后刷新data
//					me.comp('personInfoData').setValue('username','mark');
//me.comp('personInfoData').saveData(
//{
//    "onSuccess" : function(event){
//        event.source.refreshData();
//    }
//});
					
				
        });
        
	};
	Model.prototype.picRowClick = function(event) {
		this.comp("windowDialog1").open({
			"src" : curtool.geturl("commconUploadControl"),
			"data" : {
				"type" : "picture",
				"num" : "1"
			}
		});
	};
	Model.prototype.windowDialog1Receive = function(event) {
		console.log(event.data.pathlist);
		var list = event.data.pathlist;
		var jsonlist = eval("(" + list + ")");
		for (var i = 1; i <= jsonlist.length; i++) {
			// 获取到云端的文件路径
			// alert(jsonlist[i-1]["path1"]+"|"+jsonlist[i-1]["path2"]);
			$(this.getElementByXid("image1")).attr({
				"src" : jsonlist[i - 1]["path1"]
			});
			this.surl.set(jsonlist[i - 1]["path2"]);
		}
	};
	var pbackfuntion=null;
	Model.prototype.modelParamsReceive = function(event){
        //console.log(event);
       // if (event.backfunction)
           pbackfuntion=event.params.backfunction;
	};
	Model.prototype.personInfoDataCustomSave = function(event){
	     //alert("save");
         webpostjs.updateobj("/api/TsUser",{userid:"admin",username:"11"}
					,function(data){
					   ttool.showmsg("保存成功");	
					   
		               localStorage.setItem("username", nickname);
		               localStorage.setItem("picture", iamgesrc);
					   if (pbackfuntion)
					      pbackfuntion(data); 				   
				       justep.Shell.closePage();
					},function(info){
					   ttool.showerr(info);
					});
	};
	return Model;
});