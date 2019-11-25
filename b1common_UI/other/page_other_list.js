define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var ttool = require("$UI/p_common/tbase");
	var webjs = require("$UI/p_common/webjs");
	var curtool = require("curtool");
	var WindowDialog = require("$UI/system/components/justep/windowDialog/windowDialog");
	var self = null;

	var Model = function() {
		this.callParent();
		self = this;
	};

	Model.prototype.FLuckListFunDataCustomRefresh = function(event) {
		var FLuckListFunData = event.source;
		$.ajax({
			type : "GET",
			url : require.toUrl("./json/FLuckListFunData.json"),
			dataType : 'json',
			async : false,
			cache : false,
			success : function(data) {
				FLuckListFunData.loadData(data);// 将返回的数据加载到data组件
			},
			error : function() {
				throw justep.Error.create("加载数据失败");
			}
		});
	};

	Model.prototype.listFunClick = function(event) {

		var userid = ttool.getuserid();
		if (userid === "0")
			return;

		var row = event.bindingContext.$object;
		justep.Shell.showPage(row.val("listFunUrl"));
	};
	Model.prototype.modelLoad = function(event) {
		if (ttool.islogin()) {
			$(".phoneSign").hide();
		} else {
			$(this.getElementByXid("span1")).hide();
			$(this.comp("panel4").domNode).hide();
		}
	};
	Model.prototype.Refreshthis = function() {
		self.comp("myInfoData").refreshData();
	};
	Model.prototype.btnSetupClick = function(event) {
		if (!navigator.alipay) {
			alert("在网页上不能分享，请下载app，系统将自动定向到下载地址，谢谢，如果已经有账户，下载app后账户可直接登录无需重复注册");
			var wapUrl;
			if ((localStorage.getItem("downloadlink") === null) || (localStorage.getItem("downloadlink") === ""))
				wapUrl = window.downloadlink;
			else
				wapUrl = localStorage.getItem("downloadlink");

			justep.Shell.showPage("wap", {
				"wapUrl" : wapUrl
			});
			return;
		}

		this.comp("windowDialog2").open({
			"src" : curtool.geturl("shareCommon"),
			"data" : {
				"title" : "【玩家】应用分享",
				"content" : "分享艺术品信息，玩家沟通",
				"urlpic" : "http://www.xwctw.com/aaa/logowanjia.jpg",
				"urlclick" : localStorage.getItem("downloadlink")
			}
		});

	};

	Model.prototype.windowDialog2Receive = function(event) {

	};

	Model.prototype.myInfoDataCustomRefresh = function(event) {
		var me = this;

		var phone = ttool.getuserid_nocheck();
		if (phone === "0")
			return;
		webjs.pushdata("getPersonalInfo", "&personalID=" + phone, function(data) {

			event.source.loadData(data.obj);
			$(me.getElementByXid("span3")).text(data.obj.nickName);
			if (data.obj.head === "") {
				$(me.getElementByXid("image3")).attr("src", "http://fdlx.oss-cn-shanghai.aliyuncs.com/1488524106429.png");
			} else {
				$(me.getElementByXid("image3")).attr("src", data.obj.head);
			}
		}, function(info) {
			ttool.showerr(info);
		});
	};

	Model.prototype.btnQuitClick = function(event) {
		
		curtool.logout();
		this.comp("myInfoData").refreshData();
		$(this.getElementByXid("span1")).hide();
		$(this.comp("panel4").domNode).hide();
		$(this.getElementByXid("image3")).attr({
			"src" : "http://fdlx.oss-cn-shanghai.aliyuncs.com/1488524106429.png"
		});
		$(this.getElementByXid("span3")).text("请重新登陆");

	};

	Model.prototype.btnMyAntiqueClick = function(event) {
		var phone = ttool.getuserid();
		if (phone === "0") {
			return;
		}
		justep.Shell.showPage("myAntiquePage");
	};

	Model.prototype.btnMyCollectionsClick = function(event) {
		var phone = ttool.getuserid();
		if (phone === "0") {
			return;
		}
		justep.Shell.showPage("myCollectionPage");
	};

	Model.prototype.sumsDataCustomRefresh = function(event) {
		var me = this;
		var phone = ttool.getuserid_nocheck();
		if (phone === "0")
			return;
		webjs.pushdata("getCollectNum", "&personalID=" + phone, function(data) {
			// event.source.loadData(data.obj);
			$(me.getElementByXid("countGoods")).text(data.obj.goodsNum);
			$(me.getElementByXid("countCollections")).text(data.obj.collectNum);
			$(me.getElementByXid("countFinds")).text(data.obj.postNum);
		}, function(info) {
			ttool.showerr(info);
		});
	};

	Model.prototype.btnMyFindsClick = function(event) {
		var phone = ttool.getuserid();
		if (phone === "0") {
			return;
		}
		justep.Shell.showPage("myFindsPage");
	};

	Model.prototype.btnPerInfoClick = function(event) {
		var phone = ttool.getuserid();
		if (phone === "0")
			return;
		justep.Shell.showPage("myInfoPage", {
			backfunction : this.Refreshthis
		});
	};

	Model.prototype.span3Click = function(event) {
		var phone = ttool.getuserid();
		if (phone === "0")
			return;
		justep.Shell.showPage("myInfoPage", {
			backfunction : this.Refreshthis
		});
	};

	Model.prototype.col2Click = function(event) {
		var me = this;
		var phone = ttool.getuserid();
		if (phone === "0") {
			return;

		} else {
			if (!navigator.alipay) {
				alert("在网页上不能支付，请下载app，系统将自动定向到下载地址，谢谢，如果已经有账户，下载app后账户可直接登录无需重复注册");

				var wapUrl = localStorage.getItem("downloadlink");

				justep.Shell.showPage("wap", {
					"wapUrl" : wapUrl
				});
				return;
			}
			alert(localStorage.getItem("infoBeforePaid"));
			me.comp("messageDialog6").show();
		}
	};

	Model.prototype.messageDialog6OK = function(event) {
		var username = localStorage.getItem("iphone");

		var self = this;

		var NowTime = new Date();
		var t = NowTime;
		var tradeout = username + t.getFullYear() + (t.getMonth() + 1) + t.getDate() + t.getHours() + t.getMinutes() + t.getSeconds();
		tradeout = tradeout + "9993";
		if (event.input === null) {
			return;
		}
		if (event.input.length === 0) {
			return;
		}

		var reg = /^[0-9]+[0-9]*[0-9]*$/;
		if (reg.test(event.input)) {
		} else {
			alert("请输入合理金额，格式不对，谢谢！");
			return;
		}
		var money = parseInt(event.input);

		if (parseInt(money) < 100) {
			alert("充值金额不能低于100元");
			return;
		}

		self.comp("windowDialog6").open({
			"src" : require.toUrl("./payCommon.w"),
			"data" : {
				"name" : "antique",
				"moneysum" : money,
				"account" : username,
				"tradecode" : tradeout
			}
		});
	};

	Model.prototype.headImgDivClick = function(event) {
		var phone = ttool.getuserid();
		if (phone === "0")
			return;
		justep.Shell.showPage("myInfoPage", {
			backfunction : this.Refreshthis
		});
	};

	Model.prototype.btnChatClick = function(event) {
		var self = this;
		var userid = ttool.getuserid();
		if (userid === "0")
			return;
		tim.imlogin(localStorage.getItem("imuid"), localStorage.getItem("username"), function() {
			var dlg = self.comp('windowDialog1');
			dlg.set({
				title : "会话列表(点击会话进入聊天界面)",
				showTitle : true,
				src : require.toUrl("$UI/p_common/wex5/dialogList.w"),
				status : "maximize"
			});
			dlg.open();
		});

	};
	Model.prototype.windowDialog1Received = function(event) {
		var id = event.data.id;
		var type = event.data.type;
		/*var dlg = this.comp('messageDialog');
		dlg.set({
			title : "消息记录",
			showTitle : false,
			src : require.toUrl("$UI/p_common/wex5/message.w"),
			// src : require.toUrl("./message.w"),
			status : "maximize"
		});*/
		var dialog;
		if(!dialog)
		{
		dialog=new WindowDialog({
		title : "消息记录",
			showTitle : false,
			src : require.toUrl("$UI/p_common/wex5/message.w"),
			// src : require.toUrl("./message.w"),
			status : "maximize",
			parentNode:this.getElementByXid("dialog")
		});
		
		}
		dialog.open({
			params : {
				id : id,
				type : type
			}
		});
	};

	return Model;
});