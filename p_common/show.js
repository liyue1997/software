define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function(){
		this.callParent();
		this.ifamevisible=justep.Bind.observable(false);
	};

	Model.prototype.modelParamsReceive = function(event)
	{
		var type=this.params.type;
		var wapUrl=this.params.wapUrl;
		if (type==="video")
		{
			this.ifamevisible.set(true);
			this.comp("titleBar1").set({"title":"视频播放"});
			     
		     $(this.getElementByXid("iframe1")).attr("src",wapUrl);
		
		}
		if (type==="picture")
		{
			this.comp("titleBar1").set({"title":"图片查阅"});
			this.ifamevisible.set(false);
			$(this.getElementByXid("image1")).attr("src",wapUrl);
		}
	
	};

	return Model;
});