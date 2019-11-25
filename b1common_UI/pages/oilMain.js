define(function(require) {
	//var $ = require("jquery");
	//var justep = require("$UI/system/lib/justep");
	var webjs = require("$UI/p_common/webjs");
	var ttool = require("$UI/p_common/tbase");
	//var curtool = require("curtool");
	//var isrefreshing = 0;

	var strPage = "1";
	var self = null;
	var Model = function() {
		this.callParent();
		self = this;
	};

	Model.prototype.selectedListDataCustomRefresh = function(event) {
		ttool.showdebug("selectedListDataCustomRefresh");
		// isrefreshing=1;
		//var me = this;
		var userid= ttool.getuserid();	 if (userid==="0") return;
		webjs.pushdata("getapplys",
				"&userid=" + userid 	+ "&pagefrom="+(strPage*1-1) * 6+"&pageto=" + strPage * 6, function(data) {
			if (strPage === "1") {
				event.source.loadData(data.list, false);
			} else {
				event.source.loadData(data.list, true);
			}
		}, function(info) {
			ttool.showerr(info);
		});
		
	};

	// 图片路径转换
	Model.prototype.toUrl = function(url) {
		return url ? require.toUrl(url) : "";
	};
	
	Model.prototype.getpay = function(handle) {
	     if (handle=="0")
	        return "未支付";
	    if (handle=="1")
	        return "线上支付";
	    return "现金支付";
	};
	// 图片路径转换
	Model.prototype.gethandlecss = function(handle) {
	    if (handle=="0")return  "htCol x-col x-col-center";
	    if (handle=="1")return  "htCol1 x-col x-col-center";
	    if (handle=="2")return  "htCol2 x-col x-col-center";
	    if (handle=="3")return  "htCol3 x-col x-col-center";
	    if (handle=="4")return  "htCol4 x-col x-col-center";
		return  "htCol x-col x-col-center";
	};
	Model.prototype.gethandle = function(handle) {
	    if (handle=="0")
	        return "待处理";
	    if (handle=="1")
	        return "已分配";
	    if (handle=="2")
	        return "已取消";
	    if (handle=="3")
	        return "待支付";
	    if (handle=="4")
	        return "已完成";
		return  "";
	};
	Model.prototype.modelLoad = function(event) {
	    strPage = "1";
		this.comp("selectedListData").refreshData();
	};
	Model.prototype.scrollView1PullDown = function(event) {
		strPage = "1";
		this.comp("selectedListData").refreshData();
	};
	Model.prototype.scrollView1PullUp = function(event) {
		var iPage = parseInt(strPage);
		iPage = iPage + 1;
		strPage = iPage.toString();
		this.comp("selectedListData").refreshData();
		
	};
	Model.prototype.windowDialog1Receive = function(event){

	};
	return Model;
});