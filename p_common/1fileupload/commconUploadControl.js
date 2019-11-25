define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var fileLength=0;
	var filePathLocal=0;
	var alypath="http://test-img111.oss-cn-shanghai.aliyuncs.com/";
	var alyimgpath="http://test-img111.img-cn-shanghai.aliyuncs.com/";
	//var alypath="http://fdlx.oss-cn-shanghai.aliyuncs.com/";
	//var alyimgpath="http://fdlx.img-cn-shanghai.aliyuncs.com/";

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
        this.mediaTimer;
        this.mediaRec;
        this.fileName;
        this.timeLen;
        this.operateType;
        this.STORE_ID = "com.justep.demo.advice.audiodata";
        
	    this.rowvisible=justep.Bind.observable(false);
		this.callParent();
		me=this;
	};

    function upload(fileURL) {
    
        var fname=fileURL.substr(fileURL.lastIndexOf('/') + 1);
        
        var fext=/\.[^\.]+$/.exec(fname)||'.jpg'; 
        fname=Date.parse(new Date())+fext;
        
        me.comp("popOver2").show();

            //上传成功
            var success = function (r) {
            	me.comp("popOver2").hide();
    
	            var path1=alypath+fname;
	            var path2=alyimgpath+fname+"@!img400";
	            if (type=="video")
	               path2=alypath+"video.png";
	               
	            if (type=="audio")
	               path2=alypath+"mp3.png";
	               
	            me.comp("windowReceiver1").windowEnsure({"pathlist":"[{\"path1\":\""+path1+"\",\"path2\":\""+path2+"\"}]"});			
            };
 
            //上传失败
            var fail = function (error) {
            	me.comp("popOver2").hide();
                justep.Util.hint("上传失败! Code = " + error.code);
                //return "fail";
            };
 
            var options = new FileUploadOptions();
            options.fileKey = "recFile";
            options.fileName = fname;
            //options.mimeType = "text/plain";
 
            //上传参数
            var params = {};
            params.value1 = "test";
            params.value2 = "param";
            options.params = params;
 
            var ft = new FileTransfer();
            //上传地址
            var SERVER = "http://www.xwctw.com/zschoolyeyinteface/page/TWebServiceNew.aspx?command=uploadfile"
            ft.upload(fileURL, encodeURI(SERVER), success, fail, options);
          };

	Model.prototype.windowReceiver1Receive = function(event){
		type=event.data.type; 
		num=event.data.num;
		var resultLabel1 = this.getElementByXid("span8");
		var resultLabel3 = this.getElementByXid("span3");
		var imag=this.getElementByXid("image3");
		
		
        this.comp("popOver2").hide();
		//var uploader = this.comp("attachmentSimple1").uploader;
		
		
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
	//设置显示的时间
    Model.prototype.setAudioPosition = function(position) {
    	var hour = parseInt(position / 3600);// 小时数
		var min = parseInt(position / 60);// 分钟数
		if (min >= 60) {
			min = min % 60;
		}
		var lastsecs = position % 60;
		if(hour < 10) hour = "0" + hour;
		if(min < 10) min = "0" + min;
		if(lastsecs < 10) lastsecs = "0" + lastsecs;
		
		this.timeLen = hour + ':' + min + ':' + lastsecs;

		
    };

	Model.prototype.button4Click = function(event){
		this.comp("windowReceiver1").windowCancel();
	};




	Model.prototype.modelLoad = function(event)
	{
	//this.rowvisible.set(true);
		var data=this.comp("data1");
		var uploader = this.comp("attachmentSimple1").uploader;

        

		uploader.on('onFileSelected',function(event)
		{
			var urllist=data.getValue("url", data.getCurrentRow());
			var jsonlist=eval("("+urllist+")");
		    if(jsonlist.length+1> parseInt(num)){
		    	justep.Util.hint("只能上传"+num+"个文件");
		        event.cancel = true;
		    }
		});


		uploader.on('onFileSelected',function(event)
		{
		if (type=="picture")
		{
			if((event.file.name.split(".")[1] != "png")&&(event.file.name.split(".")[1] != "PNG") &&(event.file.name.split(".")[1] != "jpg") &&( event.file.name.split(".")[1] != "JPG"))
		    {
		    	justep.Util.hint("只能上传JPG、PNG格式图片");
		        event.cancel = true;
		    }
		}
		else if (type=="video")
		{
			if((event.file.name.split(".")[1] != "mp4")&&(event.file.name.split(".")[1] != "MP4"))
		    {
		    	justep.Util.hint("只能上传mp4格式视频文件，如果是苹果手机，请点击上部的按钮直接录像即可，不用在文件选择区用实时录像模式");
		        event.cancel = true;
		    }
		}
		else if (type=="audio")
		{
			if((event.file.name.split(".")[1] != "mp3")&&(event.file.name.split(".")[1] != "MP3"))
		    {
		    	justep.Util.hint("只能上传mp3格式视频文件");
		        event.cancel = true;
		    }
		}

		});
	};

	Model.prototype.image2Click = function(event){
		// 清空计时器
		clearInterval(this.mediaTimer);
		if (this.operateType == "record") {
			// 停止录音
			this.comp("popOver1").hide();
			this.mediaRec.stopRecord();
			fileLength=this.timeLen;


			upload(filePathLocal);
		}else{
			//停止播放
			this.comp("popOver1").hide();
			this.mediaRec.stop();
		}
	};

	Model.prototype.button2Click = function(event){
		this.comp("windowReceiver1").windowCancel();
	};

	Model.prototype.button6Click = function(event){
	        var data=this.comp("data1");
			var urllist=data.getValue("url", data.getCurrentRow());
			console.log(urllist);
			var dir=data.getValue("dir", data.getCurrentRow());
			console.log("dir",dir);
			var jsonlist=eval("("+urllist+")");
			var id="lxm";
			var urlreturn="";
			for (var i=1;i<=jsonlist.length;i++)
			{
		
			console.log(this.comp("attachmentSimple1").getFileUrl(jsonlist[i-1]["realFileName"],jsonlist[i-1]["storeFileName"],id,"download"));
		
			var fname=jsonlist[i-1]["realFileName"].substr(jsonlist[i-1]["realFileName"].lastIndexOf('/') + 1);        
            var fext=/\.[^\.]+$/.exec(fname)||'.jpg'; 
            fname=Date.parse(new Date())+fext;
			 if (type=="picture" ||type=="audio")
			 {
				 //反正得到这个图片文件的两个链接 path1缩略 path2 原图	
				// var url="http://127.0.0.1/fileserver/FileServer.aspx?command=File_push&objectname="
                //         +jsonlist[i-1]["storeFileName"]+"&fileName="+fname;
				 //var url="http://124.232.150.172:8888/lxm/lxm?command=movefile&dir="+dir+"&oldname="+jsonlist[i-1]["storeFileName"]+"&newname="+fname;
				 var url="http://124.232.163.114/fileserver/FileServer.aspx?command=lxmpush&dir="+dir+"&oldname="+jsonlist[i-1]["storeFileName"]+"&newname="+fname;
                 console.log(url);
				 $.ajax({
                    "type" : "post",
                    "async" : false,
                    "dataType" : "json",
                    "url" :url ,
                    "complete" : function(xhr) {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            
                         } else {
                               justep.Util.hint("失败！"+xhr.status);
                         }
                         },
                    "data" : {
                      "ret" : "ret",
                      "info" : "info",
                    },  			
                   "success": function (data) { 
                          if ("success"== data.ret)
                          {         
                        	  console.log(data.info);
                           var path1=alypath+fname;
                     	  console.log(path1);
	                       var path2=alyimgpath+fname+"@!img400";	               
	                      if (type=="audio")
	                            path2=alypath+"mp3.png";	               
                          urlreturn=urlreturn+"{\"path1\":\""+path1+"\",\"path2\":\""+path2+"\"},";
                          }
                          else
                          {
                              justep.Util.hint(data.info);
                              return;
                          }
                          
                    }
                 });
                 me.comp("windowReceiver1").windowEnsure({"pathlist":"["+urlreturn+"]"});
                 return;
			 }
			 if (type=="video")
			 { 
	
			     //反正得到这个图片文件的两个链接 path1缩略 path2 原图	
				// var url="http://127.0.0.1/fileserver/FileServer.aspx?command=video_push&objectname="
                 //        +jsonlist[i-1]["storeFileName"]+"&fileName="+fname;
				 var url="http://124.232.163.114/fileserver/FileServer.aspx?command=lxmvideopush&dir="+dir
				     +"&oldname="+jsonlist[i-1]["storeFileName"]+"&newname="+fname;
	               
                 console.log(url);
				 $.ajax({
                    "type" : "post",
                    "async" : false,
                    "dataType" : "json",
                    "url" :url ,
                    "complete" : function(xhr) {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                                    
                         } else {
                               justep.Util.hint("失败！"+xhr.status);
                         }
                         },
                    "data" : {
                      "ret" : "ret",
                      "info" : "info",
                      "fileid" : "fileid",
                    },  			
                   "success": function (data) { 
                          if ("success"== data.ret)
                          {         
                          console.log(data.fileid);
                           var path1="http://124.232.163.114/fileserver/videoplay.aspx?fileName="+data.fileid+"";
	                       var path2=alypath+"video.png";	
	                      urlreturn=urlreturn+"{\"path1\":\""+path1+"\",\"path2\":\""+path2+"\"},";                
	                      //me.comp("windowReceiver1").windowEnsure({"pathlist":"[{\"path1\":\""+path1+"\",\"path2\":\""+path2+"\"}]"});
                          }
                          else
                          {
                              justep.Util.hint(data.info);
                          }
                          
                    }
                 });
                 me.comp("windowReceiver1").windowEnsure({"pathlist":"["+urlreturn+"]"});
                 return;
			 }
			

			}
	};

	Model.prototype.image3Click = function(event){
	    if (!navigator.camera)
		{
			justep.Util.hint("网页不支持拍照请在手机运行");
		}
		function lxmsuccess(path)
		{
               upload(path);
           
        }        
			
		function lxmsuccess1(path)
		{
			for (var i=1;i<=path.length;i++)
			{
				var fileURL=path[i-1].fullPath;
				upload(fileURL);				
			}
		}
		
		function lxmfail(message)
		{
			
		}
		if (type=="picture")
		{			
	    	navigator.camera.getPicture(lxmsuccess, lxmfail, {quality:50,sourceType : 1}), {
                destinationType: window.Camera.DestinationType.FILE_URI,
                sourceType: window.Camera.PictureSourceType.PHOTOLIBRARY,
                 mediaType: window.Camera.MediaType.ALLMEDIA
             };
		}
		if (type=="video")
		{
     		navigator.device.capture.captureVideo(lxmsuccess1, lxmfail, {limit:1, duration: 10});
		}
		if (type=="audio")
		{
			if (!window.Media)
			{
				justep.Util.hint("声音功能只能在app运行，请下载app");
				return;
			}
		
			this.comp("popOver1").show();
			this.comp('output1').set({value: "00:00:00"});
	
			this.fileName = justep.Date.toString(new Date(), "yyyyMMddhhmmss") + ".wav";
		    filePathLocal=cordova.file.externalRootDirectory+this.fileName;
			this.mediaRec = new window.Media(this.fileName,
					function() {
			
					    upload(filePathLocal);
					},
					function(err) {
						justep.Util.hint("录音失败");
					}
			);
			// 开始录音
			this.mediaRec.startRecord();
			this.operateType = "record";
			var me = this;
			var recTime = 0;
			this.mediaTimer = setInterval(function() {
				recTime = recTime + 1;
	            me.setAudioPosition(recTime);
	            me.comp('output1').set(me.timeLen);
			}, 1000);
		}
	};

	return Model;
});