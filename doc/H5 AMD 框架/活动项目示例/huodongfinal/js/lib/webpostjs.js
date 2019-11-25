define(function(require) {
	var $ = require('jquery');
	//var justep = require("$UI/system/lib/justep");
	var tbase = require('tbase');

	var webpostjs = function() {
		
	};

	webpostjs.prototype.postdata = function(command,data, success,fail){	
		console.log("postdata",data);
		//data=data.replace(/\?/g,"");
		//data=tbase.filteremoji(data);
		var url=window.prefix + command;
		//var me=this;
		//alert(url);

		tbase.showdebug(url);
		$.support.cors = true;
//		$.post(url,
//			   data,
//			   
//			   function(datavalue,status){
//			        if (status == "success") {
//			        	success(datavalue);
//			        }else{
//			        	tbase.showdebug("网络错误"+status);
//			        }
//		       }
//		);
		var token = localStorage.getItem("token");
		$.ajax({
			 url: url,
			 data:data ,
			 beforeSend: function(request) {
				request.setRequestHeader("credentials", 'include');
			    request.setRequestHeader("token", token);
			    request.setRequestHeader("Accept", '*/*');
			    request.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
			},
			dataType: 'JSON',
			//dataType: 'jsonp',  
			crossDomain: true, 
			async: true,//请求是否异步，默认为异步
			type: 'post',
			success: success,
			error:fail
			});
	};
	webpostjs.prototype.getobj = function(command,data, success,fail){	
		this.postdata(command+"/getobj",data,success,fail);
	};

	webpostjs.prototype.updateobj = function(command,data, success,fail){	
		this.postdata(command+"/updateobj",data,success,fail);
	};
	

	webpostjs.prototype.query = function(command,querycmd,data, success,fail){	
		this.postdata(command+"/updateobj",data,success,fail);
	};
	
	return new webpostjs();
	
});