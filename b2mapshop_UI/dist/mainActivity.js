define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	
	var Model = function(){
		this.callParent();
	};

	Model.prototype.modelLoad = function(event){
//        	require("$UI/b2mapshop_UI/dist/debug/lib-generate-test-usersig.min");
//	        require("$UI/b2mapshop_UI/dist/debug/GenerateTestUserSig");
//	        require("$UI/b2mapshop_UI/dist/js/chunk-vendors.52212f9e");
//	        require("$UI/b2mapshop_UI/dist/js/app.b200e3e8");
//	        require(["$UI/b2mapshop_UI/dist/debug/lib-generate-test-usersig.min","$UI/b2mapshop_UI/dist/debug/GenerateTestUserSig"
//	           ,"$UI/b2mapshop_UI/dist/js/chunk-vendors.52212f9e","$UI/b2mapshop_UI/dist/js/app.b200e3e8"], function(){
//             //fnOfNoneAMD2();
//                alert("ok");
//            });
            require(["$UI/b2mapshop_UI/dist/debug/lib-generate-test-usersig.min"],function(){
               require(["$UI/b2mapshop_UI/dist/debug/GenerateTestUserSig"],function(){
            	   require(["$UI/b2mapshop_UI/dist/js/chunk-vendors.52212f9e"],function(){
            		   require(["$UI/b2mapshop_UI/dist/js/app.b200e3e8"],function(){
                           alert("ok");
                       });
                   });
               });
            });
	};

	return Model;
});