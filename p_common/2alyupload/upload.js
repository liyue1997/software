
//accessid= '6MKOqxGiGU4AUk44';
//accesskey= 'ufu7nS8kS59awNihtjSonMETLI0KLy';
//host = 'http://post-test.oss-cn-hangzhou.aliyuncs.com';
accessid= 'LTAIXcRiUYNsDwrb';
accesskey= 'g9MdYTOhQOtJ0H5TjSQXgPanR0vMan';
host = 'http://b1common.oss-cn-shanghai.aliyuncs.com';
/*var alypath="http://fdlx.oss-cn-shanghai.aliyuncs.com/";
var alyimgpath="http://fdlx.img-cn-shanghai.aliyuncs.com/";
var alyvideoImgpath = "http://outimg.oss-cn-shanghai.aliyuncs.com/";*/

var alypath="http://b1common.oss-cn-shanghai.aliyuncs.com/";
var alyimgpath="http://b1common.img-cn-shanghai.aliyuncs.com/";
var alyvideoImgpath = "http://outimg.china-xiuwei.cn/";

g_dirname = ''
g_object_name = ''
g_object_name_type = 'random_name'
now = timestamp = Date.parse(new Date()) / 1000; 

var type="";
var num=1;	
var numoffiles=0;
var functionback;
var urlreturn="";

var policyText = {
    "expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
    "conditions": [
    ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
    ]
};

var policyBase64 = Base64.encode(JSON.stringify(policyText))
message = policyBase64
var bytes = Crypto.HMAC(Crypto.SHA1, message, accesskey, { asBytes: true }) ;
var signature = Crypto.util.bytesToBase64(bytes);

function check_object_radio() {
    var tt = document.getElementsByName('myradio');
    for (var i = 0; i < tt.length ; i++ )
    {
        if(tt[i].checked)
        {
            g_object_name_type = tt[i].value;
            break;
        }
    }
}

function get_dirname()
{
    dir ='';// document.getElementById("dirname").value;
    if (dir != '' && dir.indexOf('/') != dir.length - 1)
    {
        dir = dir + '/'
    }
    //alert(dir)
    g_dirname = dir
}

function random_string(len) {
　　len = len || 32;
　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
　　var maxPos = chars.length;
　　var pwd = '';
　　for (i = 0; i < len; i++) {
    　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function get_suffix(filename) {
    pos = filename.lastIndexOf('.')
    suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos)
    }
    return suffix;
}

function calculate_object_name(filename)
{
    if (g_object_name_type == 'local_name')
    {
        g_object_name += "${filename}"
    }
    else if (g_object_name_type == 'random_name')
    {
        suffix = get_suffix(filename)
        g_object_name = g_dirname + random_string(10) + suffix
    }
    return ''
}

function get_uploaded_object_name(filename)
{
    if (g_object_name_type == 'local_name')
    {
        tmp_name = g_object_name
        tmp_name = tmp_name.replace("${filename}", filename);
        return tmp_name
    }
    else if(g_object_name_type == 'random_name')
    {
        return g_object_name
    }
}
function showinfo( txt)
{
    //alert(txt);
	document.getElementById('console').appendChild(document.createTextNode("\n"+txt));
}
function set_upload_param(up, filename, ret)
{
    g_object_name = g_dirname;
    if (filename != '') {
        suffix = get_suffix(filename)
        calculate_object_name(filename)
    }
    new_multipart_params = {
        'key' : g_object_name,
        'policy': policyBase64,
        'OSSAccessKeyId': accessid, 
        'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
        'signature': signature,
    };
    up.setOption({
        'url': host,
        'multipart_params': new_multipart_params
    });

    up.start();
}

var uploader = new plupload.Uploader({
	runtimes : 'html5,flash,silverlight,html4',
	browse_button : 'selectfiles', 
    //multi_selection: false,
	container: document.getElementById('container'),
	flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
	silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',
    url : 'http://oss.aliyuncs.com',

	init: {
		PostInit: function() {
			//alert("PostInit");
			
			//document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML ='你可以上传'+num+ s;
			document.getElementById('postfiles').onclick = function() {
              set_upload_param(uploader, '', false);
              return false;
			};
		},

		FilesAdded: function(up, files) {
			
			plupload.each(files, function(file) {
				//alert("FilesAdded："+file.name);
				if (numoffiles >=num)
					{
					showinfo("只能选择"+num+"个");
					uploader.removeFile(file);
					return;
					}
				var ext=file.name.split(".")[1];
				if (type=="picture")
				{
					if((ext != "png")&&(ext != "PNG") &&(ext != "jpg") &&( ext != "JPG"))
				    {
						showinfo("只能上传JPG、PNG格式图片"+ext);
						uploader.removeFile(file);
						return;
				    }
				}
				else if (type=="video")
				{
					if((ext != "mp4")&&(ext != "MP4")&&(ext != "MOV")&&(ext != "mov"))
				    {
				    	showinfo("只能上传mp4格式视频文件"+ext);
				    	uploader.removeFile(file);
						return;
				    }
				}
				else if (type=="audio")
				{
					if((ext != "mp3")&&(ext != "MP3"))
				    {
				    	showinfo("只能上传mp3格式视频文件"+ext);
				    	uploader.removeFile(file);
						return;
				    }
				}
				numoffiles++;
				document.getElementById('ossfile').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'
				+'<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
				+'</div>';
			});
		},

		BeforeUpload: function(up, file) {
			//alert("BeforeUpload");
            check_object_radio();
            get_dirname();
            set_upload_param(up, file.name, true);
        },

		UploadProgress: function(up, file) {
			var d = document.getElementById(file.id);
			//d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
            var prog = d.getElementsByTagName('div')[0];
			var progBar = prog.getElementsByTagName('div')[0];
			progBar.style.width= 2*file.percent+'px';
			progBar.setAttribute('aria-valuenow', file.percent);
		},

		FileUploaded: function(up, file, info) {
			//alert("FileUploaded");
		
            if (info.status == 200)
            {
            	var filename=get_uploaded_object_name(file.name);
            	//functionback(get_uploaded_object_name(file.name));
            	var path1=alypath+filename;
	            var path2=alyimgpath+filename+"@!img400";
	            if (type=="video")
	            	{
	            	path1=alypath+filename;
	               path2=alyvideoImgpath+filename+".jpg";
	            	}
	               
	            if (type=="audio")
	               path2=alypath+"mp3.png";
	            
            	urlreturn=urlreturn+"{\"path1\":\""+path1+"\",\"path2\":\""+path2+"\"},";
            	//alert(urlreturn);
            	numoffiles--;
                document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML ='上传成功' ;
                if (numoffiles===0)
                {
                	functionback(urlreturn,uploader);
                }
            }
            else
            {
                document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML ='上传失败：'+ info.response;
            } 
		},

		Error: function(up, err) {
			document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
		}
	}
});

uploader.init();
//alert("init");
