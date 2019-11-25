define(function(require) {
    var Base = require('page/Base'),
        controller = require('../BaseController')
       , template = require('text!./weixinlogin.html')
       ,tbase=require('tbase')
       ,webjs=require('webjs')
        ;
    /**
     * 对外暴露函数，用于视图加载
     */
    var load = function() {
        render();
        bind();
        run();
    };
    /**
     * 视图渲染
     */
    function render() {
        controller.setTemplate(template);
        controller.render(Base.getViewContainer());
    }
    /**
     * 事件绑定
     */
    function bind() {

    }
    /**
     * 除事件绑定
     */

		var openid;
		var huodongid;
		var shopid;
		var fromuser;
		var Appid="wx3394377d7e06a7cc";
		function wxauthor1(){
			console.log("本地测试");
			
			    localStorage.setItem("userid", "USER201910310075");		
			    localStorage.setItem("token", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiLlv4PmmJ_np5HmioAiLCJ1aWQiOiJjNzQzNGU4OGUyNDA0NjkwYjZjNTY3NDMyOWRkNDA4YVQxNTI3NDc0MTEzOTU3IiwiZXhwIjoxODMyMTE0ODgyfQ.e4t-vb2Y4AOEJvxDC9TwVddAzrH21dlJHr23qOa-ZsRW2D5PZYYH5VszmWDmqQmQps5TKqz-9b1UfUf51EO2qw");		
				localStorage.setItem('huodongid',"hd15729227780062");
				localStorage.setItem('shopid',"op15729149570034");
				localStorage.setItem('fromuser',"mark");
			    location.hash = "#huodong";
		}
		//微信授权 获取code
		function wxauthor(){
//			alert("ceshi 1.0");
			var code=tbase.getUrlParam('rcode');
//			alert(code);
			 huodongid=tbase.getUrlParam('huodongid');
			 shopid=tbase.getUrlParam('shopid');
			 fromuser=tbase.getUrlParam('fromuser');
			var Local=window.serverUrl+"return.html?app=huodong/index.html?v=1";

			//https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect 若提示“该链接无法访问”，请检查参数是否填写错误，是否拥有scope参数对应的授权作用域权限。
			var url='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+Appid+'&redirect_uri='+encodeURIComponent(Local)+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
			//alert(Local);
			if (code == null || code == "") {
				localStorage.setItem('huodongid',huodongid);
				localStorage.setItem('shopid',shopid);
				localStorage.setItem('fromuser',fromuser);
				window.location.href = url;
			} else{
				//this.getOpenId(code);
				//window.location.href = "http://web.mingnengtech.com/"+getUrlParam('huodong');
//				huodongid=localStorage.getItem('huodongid');
//				shopid=localStorage.getItem('shopid');
//				fromuser=localStorage.getItem('fromuser');
				getOpenId(code);
				tbase.showmsg("登录成功");
			}
		}
		function getOpenId(code){
			huodongid=localStorage.getItem('huodongid');
				shopid=localStorage.getItem('shopid');
				fromuser=localStorage.getItem('fromuser');
            webjs.pushdata("app/huodong","wxloginbycode","&code="+code+"&huodongid="+huodongid
				    +"&shopid="+shopid+"&fromuser="+fromuser,function(data){
				    	var userid=data.userid;
					var huodongmoudle=data.moudle;
					var token=data.token;
					//alert(token);
					//alert(huodongmoudle);
			        localStorage.setItem("userid", userid);		
			        localStorage.setItem("token", token);		
					//window.location.href =window.serverUrl+huodongmoudle+"?huodongid="+huodongid
				    //    +"&shopid="+shopid+"&fromuser="+fromuser+"&userid="+userid;
				    location.hash = "#"+huodongmoudle;
				    },function(info){
				    	tbase.showerr(info);
				    });
		};
    function run() {
    	console.log("weixinlogin");
        wxauthor();
    }
    return {
        load: load
    };
});