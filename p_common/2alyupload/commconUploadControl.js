define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var fileLength=0;
	var filePathLocal=0;
	//var alypath="http://test-img111.oss-cn-shanghai.aliyuncs.com/";
	//var alyimgpath="http://test-img111.img-cn-shanghai.aliyuncs.com/";
	var alypath="http://fdlx.oss-cn-shanghai.aliyuncs.com/";
	var alyimgpath="http://fdlx.img-cn-shanghai.aliyuncs.com/";

	var me=null;
	require("css!$UI/p_common/css/pub").load();
	//http://gun-10063798.file.myqcloud.com/gun_31232_20160823142408.mp4
	require("cordova!cordova-plugin-media");
	
	require("$UI/system/lib/cordova/cordova");
	require("cordova!cordova-plugin-camera");
	require("cordova!cordova-plugin-device");
	require("cordova!cordova-plugin-media-capture");
	require("cordova!cordova-plugin-inappbrowser");
	require("cordova!cordova-plugin-file");
	require("cordova!cordova-plugin-file-transfer");
	
	
	var type="picture";
	var num="1";

	var Model = function(){
		me=this;
		this.callParent();
		me=this;
	};

	Model.prototype.windowReceiver1Receive = function(event){
		type=event.data.type;
		num=event.data.num;
		var resultLabel1 = this.getElementByXid("span8");
		var resultLabel3 = this.getElementByXid("span3");
		var imag=this.getElementByXid("image3");
		
		
		
		if (type=="picture")
		{
		  $(resultLabel3).text("在如下区域可直接拍照");
		  $(resultLabel1).text("在如下区域可选择图库照片");
		  $(imag).attr("src",require.toUrl("./photo.png"));
		}
		else if (type=="video")
		{
		  $(resultLabel3).text("在如下区域可直接录像");
		  $(resultLabel1).text("在如下区域可选择录像文件");
		  $(imag).attr("src",require.toUrl("./video.png"));
		}
		else if (type=="audio")
		{
		  $(resultLabel3).text("在如下区域可直接录音");
		  $(resultLabel1).text("在如下区域可选择音频文件");
		  $(imag).attr("src",require.toUrl("./voice.png"));
		}
	};
	Model.prototype.button4Click = function(event){
		this.comp("windowReceiver1").windowCancel();
	};




	Model.prototype.modelLoad = function(event)
	{
	};


	Model.prototype.button2Click = function(event){
		this.comp("windowReceiver1").windowCancel();
	};

	return Model;
});