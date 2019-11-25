define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var webjs = require("$UI/p_common/webjs");
	var ttool = require("$UI/p_common/tbase");
	var Model = function() {
		this.callParent();
		this.strID = "";
		this.type = "";
		this.imgNum = "";
		this.classes = "";
	};
	Model.prototype.windowReceiver1Receive = function(event) {
		this.strID = event.data.strID;
		this.type = event.data.type;
		this.imgNum = event.data.num;
		this.comp("imgData").refreshData();
		this.comp("contentsImg").to(this.imgNum);
		this.classes = justep.UUID.createUUID();
		$(".imgcontent .x-contents-content").addClass(this.classes);
		$(".imgcontent .x-contents-content img").addClass("dhb" + this.classes);

	};
	Model.prototype.imgDataCustomRefresh = function(event) {
		var me = this;
		// var phone = ttool.getuserid_nocheck();
		webjs.pushdata("getImg", "&ID=" + me.strID + "&type=" + me.type, function(data) {
			event.source.loadData(data.o);
		}, function(info) {
			ttool.showerr(info);
		});
		var carousel = me.comp("carousel1");
		event.source.each(function(obj) {
			var fImgUrl = require.toUrl(obj.row.val("img"));
			if (me.comp('contentsImg').getLength() > obj.index) {
				$(carousel.domNode).find("img").eq(obj.index).attr({
					"src" : fImgUrl,
				});
				if (obj.index === 0) {
					localStorage.setItem("index_BannerImg_src", fImgUrl);
					// localStorage.setItem("index_BannerImg_url", fUrl);
				}
			} else {
				carousel.add('<div class="img-show"><img src="' + fImgUrl + '" class="tb-img2" bind-click="openPageClick"/></div>');
			}
		});
	};
	Model.prototype.openPageClick = function(event) {
		event.stopPropagation();
		this.comp("windowReceiver1").windowEnsure();
	};

	Model.prototype.loadimgIng = function(url, callback) {
		var img = new Image(); // 创建一个Image对象，实现图片的预下载
		img.src = url;
		if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
			callback.call(img);
			return; // 直接返回，不用再处理onload事件
		}
		img.onload = function() { // 图片下载完毕时异步调用callback函数。
			callback.call(img);// 将回调函数的this替换为Image对象
		};

	};
	Model.prototype.contentsImgClick = function(event) {
		this.comp("windowReceiver1").windowEnsure();
	};
	Model.prototype.contentsImgActiveChanged = function(event) {
		var me = this;
		var num = event.to;
		$(me.classes).css("display", "none");
		var imgsrc = $('.dhb' + me.classes + '').eq(num).attr("src");
		me.comp("popOver1").show();
		me.loadimgIng(imgsrc, function() {
			$(me.classes).eq(num).css("display", "block");
			me.comp("popOver1").hide();
		});
	};
	return Model;
});