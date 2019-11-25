define(function(require) {
	var $ = require('jquery');
	var xx_Dshowform=require("xx_Dshowform");

	$(function(){
		console.log("aa");
		var xx_CarInput = {
			CarContainer:'#xx_Dshowcarinput',
		};
		xx_Dshowform.init(xx_CarInput);
//		$(".xx_DShowform_provinces").on("click",xx_Dshowform.chooseProvince(this));
		$(".xx_DShowform_provinces").on("click",chooseProvince);
	})
	
	function chooseProvince()
			{
				alert('a');
			}
	
});