define(function(require) {
	var $ = require("jquery"),
		template = require('text!compents/xx_InfoTable/xx_InfoTable.html');
	require('css!compents/xx_InfoTable/xx_InfoTable.css');

	var me;
	var xx_InfoTable = function() {
		me = this;
	};

	var options = {
		MsgTable: "#xx_Infotable",
		width: '100%',
		height: 'auto',
		pagelen: 4,
		curpage: 0
	};

	xx_InfoTable.prototype.init = function(option) {
		var self = this;

		self.option = $.extend({}, options, option);
		$(self.option.root).html(template);
		var xx_InfoTable = "<table id='xx_InfoTable'><thead id='xx_Dshowthead'><tr></tr></thead></table><span>-加载更多-</span>";

		self.$dom = $(self.option.MsgTable);
		self.$dom.css({ //设置样式
			width: self.option.width,
			height: self.option.height
		})
		self.$dom.append(xx_InfoTable);
		self.Tags = $(self.option.tableTag);
		var xx_Dshowthead = "";
		for(var i = 0; i < self.Tags.length; i++) {
			xx_Dshowthead += "<th>" + self.Tags[i] + "</th>";
		}
		$("#xx_Dshowthead tr").append(xx_Dshowthead);
		//		console.log(self.option);
		me.getinfos();

	};

	xx_InfoTable.prototype.getinfos = function() {
		//var page = parseInt(document.getElementById("page").value);
		var xx_Dshowtbody = "<tbody id='xx_Dshowtbody'></tbody>";
		$("#xx_Dshowthead").after(xx_Dshowtbody);
		me.option.getPageData(me.option.curpage, me.option.pagelen, function(data) {
			console.log("getPageData", data);
			if(data.data.length == 0) {
				$("#xx_Infotable span").text("没有更多了~");
			} else {
				var xx_Dshowtbodytd = "";
				for(var j = 0; j < data.data.length; j++) {
					var info = data.data;
					if(info[j].pay_status == "3") {
						paystatus = "已领取";
					} else if(info[j].pay_status == "1")
						paystatus = "已支付";
					else
						paystatus = "待支付";
					var car = info[j].user_car.substring(0, 2) + "****" + info[j].user_car.substr(info[j].user_car.length - 1);
					var phone = info[j].user_phone.substring(0, 3) + "***" + info[j].user_phone.substr(8, 10);
					xx_Dshowtbodytd += "<tr><td>" + phone +
						"</td><td>" + car + "</td><td>" + paystatus +
						"</td><td>" + info[j].create_date.substring(5, 16) + "</td></tr>";
				}
				$("#xx_Dshowtbody").append(xx_Dshowtbodytd);
			};
		});
		$("#xx_Infotable span").click(function() {
			me.getNextinfos();
		});

	}
	xx_InfoTable.prototype.getNextinfos = function(getPageData) {
		me.option.curpage += 1;
		me.getinfos();
	}

	return new xx_InfoTable();
});