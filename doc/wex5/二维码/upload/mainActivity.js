define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var COS=require("./js/cos-js-sdk-v5.min");
	var webjs = require("$UI/bcommon/webjs");
	var tbase = require("$UI/bcommon/tbase");
	require("cordova!com.phonegap.plugins.barcodescanner");

	var Model = function(){
		this.callParent();
		window.prefix = "http://192.168.0.252:8089/"+"b2mapshop";
	};
	
	// 初始化实例
	/*var cos = new COS({
    getAuthorization: function (options, callback) {
        // 异步获取临时密钥
        $.get('http://example.com/server/sts.php', {
            bucket: options.Bucket,
            region: options.Region,
        }, function (data) {
            var credentials = data.credentials;
            callback({
                 TmpSecretId: credentials.tmpSecretId, 
                 TmpSecretKey: credentials.tmpSecretKey, 
                 XCosSecurityToken: credentials.sessionToken, 
                 ExpiredTime: data.expiredTime
            });
        });
    }
});*/
	var cos=new COS({
		 // 必选参数
		  getAuthorization: function (options, callback) {
		      // 服务端例子：https://github.com/tencentyun/qcloud-cos-sts-sdk/edit/master/scope.md
		      $.ajax({
		          method: 'POST',
		          url: 'http://192.168.0.252:8089/b2mapshop/cosfile/file',
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

	document.getElementById('file-selector').onchange = function () {
	    var file = this.files[0];
		    if (!file) return;
		    console.log(file.name);
		    //取出后缀名，改成 uuid+后缀
		    var filename=file.name;
		    cos.putObject({
		        Bucket: 'b1common-12597978821',
		        Region: 'ap-shanghai',
		        Key: 'img/' + filename,
		        Body: file,
		    }, function (err, data) {
		        console.log(err || data);
		        if (err)
		        	{
		        	console.log(err);
		        	return;
		        	}
		      webjs.pushdata("/app/auth","uploadfileone","&filetype=userhead&userid=0" +
		      		"&url=https://b1common-1259797882.cos.ap-shanghai.myqcloud.com/img/启动页1.png"
		    		  +"&surl=https://b1common-1259797882.picsh.myqcloud.com/img/启动页1.png!img100",
						function(data){		
					        console.log(data);  
					    },
					    function(info){
					    	tbase.showmsg(info);
						});
		    });
		    
};

	//扫描二维码
	Model.prototype.button1Click = function(event){
		justep.Shell.showPage("scanner");
	};

	
	return Model;
});