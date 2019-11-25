define(function(require) {
	var alypath = "http://b1common.oss-cn-shanghai.aliyuncs.com/";
	var alyimgpath = "http://b1common.img-cn-shanghai.aliyuncs.com/";
	var me;
	var ctype = "picture";

	var Model = function() {
		this.callParent();
		me = this;
	};

	Model.prototype.windowReceiver1Receive = function(event) {
		var self = this;
		var path = "./upload";
		ctype = event.data.type;
		//require([ path ], function() {
			type = event.data.type;
			num = event.data.num;
			functionback = self.uploadok;
			urlreturn = "";

			document.getElementById('ossfile').innerHTML = '';
			var s = "图片,格式为png或jpg";
			if (type == "video") {
				s = "视频,格式为mp4";
			} else if (type == "audio") {
				s = "声音,格式为mp3";
			}
			numoffiles = 0;
			
			showinfo("\n你可以上传" + num + "个" + s);
		//});
	};
	Model.prototype.uploadok = function(fname, upload) {
		//alert(fname);
		// upload.destroy();

		me.comp("windowReceiver1").windowEnsure({
			"pathlist" : "[" + fname + "]"
		});
	};
	Model.prototype.a1Click = function(event) {

		this.comp("windowReceiver1").windowCancel();
	};
	return Model;
});