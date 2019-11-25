define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var COS=require("./js/cos-js-sdk-v5.min");
	var webjs = require("$UI/bcommon/webjs");
	var tbase= require("$UI/bcommon/tbase");
	var curtool = require("curtool");
	var JPushInstance = require("$UI/bcommon/jpush");
	var self=null;
	var Model = function(){
		
		this.callParent();
		self=this;
		// $model.getValue("userheadpic","./img/img_touxiang_default_171.png")
		//$model.getValue("userheadpic","./img/img_home_touxiang.png")
        this.headpic=justep.Bind.observable(tbase.getLocalStorage("userheadpic","./img/img_touxiang_default_171.png"));
        //console.log(this.getIDByXID ("image1"));
		document.getElementById("setting_headpic").src=this.headpic.get();					        
		this.username=justep.Bind.observable(tbase.getLocalStorage("username"),"");
		this.phone=justep.Bind.observable(tbase.getLocalStorage("phone"),"");
	};
		
	Model.prototype.transUrl = function(imgname) {
		return require.toUrl( imgname);
	};
		
	var cos=new COS({
		 // 必选参数
		  getAuthorization: function (options, callback) {
		      tbase.showmsg(window.prefix+'/cosfile/file');
		      $.ajax({
		          method: 'POST',
		          url: window.prefix+'/cosfile/file',
		          data: JSON.stringify(options.Scope),
		          beforeSend: function (xhr) {
		              xhr.setRequestHeader('Content-Type', 'application/json');
		          },
		          dataType: 'json',
		          success: function (data) {
		              var credentials = data.credentials;
		              callback({
		                  TmpSecretId: credentials.tmpSecretId,
		                  TmpSecretKey: credentials.tmpSecretKey,
		                  XCosSecurityToken: credentials.sessionToken, // 需要提供把 sessionToken 传给 
		                  ExpiredTime: data.expiredTime,
		                  ScopeLimit: true, // 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
		              });
		          }
		      });
		  }
	});

	Model.prototype.image1Click = function(event){
		$(this.getElementByXid('selectImage')).click();
	};

	Model.prototype.saveUserBtnClick = function(event){
	   var userid= tbase.getuserid();
	   if (userid === "0")
			return;
//		var userData = this.comp("userdata");
//		userData.saveData({
//			onSuccess : function() {
//				justep.Util.hint("用户信息保存成功");
//			}
//		});
        var username= this.comp("edtusername").val();
        if (username === "" || username === null) {
			tbase.showerr("请输入用户名");			
			return;
		}
        webjs.pushdata("/app/auth","updateUserinfo","&userid=" +userid+"&username=" +username+
				      		"",
								function(data){		
							        //console.log(data);
							        localStorage.setItem("username", username);
			                        tbase.showmsg("保存成功");
			                        if (self.params.funbak)
			                        	self.params.funbak(null);
							        
							    },
							    function(info){
							    	tbase.showmsg(info);
								});
	};
	Model.prototype.getValue= function(key,defaultvalue){
	    return  tbase.getLocalStorage(key,defaultvalue);
	};

	Model.prototype.selectImageChange = function(event){
		var userid= tbase.getuserid();
		   if (userid === "0")
				return;
		if (!event.target.files) {
			return;
		}
		var file = event.target.files[0];
		if (file===null) return;
		if (/^image\/\w+$/.test(file.type)) {
			//var blobURL = URL.createObjectURL(file);
			
		
	               var id=curtool.getUuid();
				    //取出后缀名，改成 uuid+后缀
				    var filename=file.name;
				    var index = filename.lastIndexOf(".");
				    var suffix = filename.substr(index+1);//后缀名
				    var uuidname=id+'.'+suffix;
				    //console.log(uuidname);
				    //alert(uuidname);
				    cos.putObject({
				        Bucket: 'b1common-1259797882',
				        Region: 'ap-shanghai',
				        Key: 'img/' + uuidname,
				        Body: file,
				    }, function (err, data) {
				        if (err)
				        	{
				        	//console.log(err);
				        	tbase.showerr(err.info);
				        	//console.log(err.info);
				        	return;
				        	}
				      webjs.pushdata("/app/auth","uploadfileone","&filetype=user_head&userid=" +userid+
				      		"&url=https://b1common-1259797882.cos.ap-shanghai.myqcloud.com/img/"+uuidname
				    		  +"&surl=https://b1common-1259797882.picsh.myqcloud.com/img/"+uuidname+"!img100",
								function(data){		
							        //console.log(data);
							        localStorage.setItem("userheadpic", "https://b1common-1259797882.picsh.myqcloud.com/img/"+uuidname+"!img100");
			                        tbase.showmsg("图片上传成功");
			                        //document.getElementById("setting_headpic").src ="https://b1common-1259797882.picsh.myqcloud.com/img/"+uuidname+"!img100";
							        curtool.refresh();
							    },
							    function(info){
							    	tbase.showmsg(info);
								});
						    });
		
			//console.log(file);
			//$inputImage.val('');

		} else {
			tbase.showmsg("请选择图片格式的文件！");
		}
	};

	Model.prototype.modelModelConstruct = function(event){
	};

/*	Model.prototype.button1Click = function(event){
	   // JPushInstance.getRegistrationID(function(registrationID) {
		//	self.comp("inputRegistrationID").val(registrationID);
		//});
//		
//		var registrationID=	tbase.getLocalStorage("registrationID");
//		tbase.showmsg(registrationID);
//		self.comp("inputRegistrationID").val(registrationID);
        JPushInstance.getRegistrationID().done(function(id) {
            tbase.showmsg(id);
			self.comp("inputRegistrationID").val(id);
		});
		
	};

	Model.prototype.button2Click = function(event){
	    var userid= tbase.getuserid();
		if (userid === "0")
		   return;
	    JPushInstance.setPushByID(userid);
		this.comp("inputPushByID").val(userid);
	};*/

	return Model;
});