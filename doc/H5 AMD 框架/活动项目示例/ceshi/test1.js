define(function(require) {
	var $ = require('jquery');
	var xx_comchepai=require("xx_comchepai");
	
	var test=require("xx_test");
	//var test2=require("xx_test");
	
	function testC(){
		this.data="a";
		this.init=function(data){
		      this.data=data;
		}
		this.print=function(){
			console.log(this.data);
		}
	};

	$(function(){
		console.log("aa");
		var xx_CarInput = {
			CarContainer:'#chepai1',
		};
		var xx_chepai=new xx_comchepai("chepai1");
		xx_chepai.init(xx_CarInput);
//		console.log(xx_chepai);
		var xx_CarInput2 = {
			CarContainer:'#chepai2',
		};
		var xx_chepai2=new xx_comchepai("chepai2");
		xx_chepai2.init(xx_CarInput2);
//		console.log(xx_chepai);
//		console.log(xx_chepai2);
		xx_chepai.print();
		xx_chepai2.print();
		
//		var test1=new test();
//		var test2=new test();
//		console.log(test1);
//		test1.init("1");
//		test2.init("2");
//		console.log(test2);
//		test1.print();
//		test2.print();

      //当界面被输入火
      // fireEvent("");
	})
	
	
});