define(function(require) {
	var $ = require('jquery');
	template = require('text!compents/xx_Chepai/xx_Chepai.html');
	require('css!compents/xx_Chepai/xx_Chepai.css');
	var me;
	var xx_Dshowform = function() {
		me = this;
	};

	var provinces = new Array("京", "沪", "浙", "苏", "粤", "鲁", "晋", "冀",
		"豫", "川", "渝", "辽", "吉", "黑", "皖", "鄂",
		"津", "贵", "云", "桂", "琼", "青", "新", "藏",
		"蒙", "宁", "甘", "陕", "闽", "赣", "湘");

	var keyNums = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
		"Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
		"A", "S", "D", "F", "G", "H", "J", "K", "L",
		"确认", "Z", "X", "C", "V", "B", "N", "M", "删除");
	var next = 0; //?
	var options = {
		width: '100%',
		height: 'auto'
	};
	var containterbox;
	xx_Dshowform.prototype.init = function(data) {
		var self = this;
		var xx_Dshowcarbox = "</span><ul class='clearfix ul_input'>" +
			"<li class='input_pro'><span></span></li>" +
			"<li class='input_pp input_zim'><span></span></li>" +
			"<li class='input_pp'><span></span></li>" +
			"<li class='input_pp'><span></span></li>" +
			"<li class='input_pp'><span></span></li>" +
			"<li class='input_pp'><span></span></li>" +
			"<li class='input_pp'><span></span></li>" +
			"</ul><div id='jp_pro'></div>";
		self.option = $.extend({}, options, data);
		self.$dom = $(self.option.CarContainer);
		//console.log(self.$dom[0].id);
		containterbox = self.$dom[0].id;
		self.$dom.append(xx_Dshowcarbox);
		me.addevents();
	}

	xx_Dshowform.prototype.showProvince = function() {
		$("#pro").html("");
		var ss = "";
		for(var i = 0; i < provinces.length; i++) {
			ss = ss + me.addKeyProvince(i);
		}
		$("#pro").html("<ul class='clearfix ul_pro'>" + ss + "<li class='li_close'><span>关闭</span></li><li class='li_clean'><span>清空</span></li></ul>");
		$(".xx_DShowform_provinces").click(function(event) {
			//console.log("xx_DShowform_provinces",obj);
			me.chooseProvince(event.target);
		});
		$("#pro .li_close").click(function() {
			me.closePro();
		});
		$("#pro .li_clean").click(function() {
			me.cleanPro();
		});
	};

	xx_Dshowform.prototype.showKeybord = function() {
		$("#pro").html("");
		var sss = "";
		for(var i = 0; i < keyNums.length; i++) {
			sss = sss + '<li class="ikey ikey' + i + ' ' + (i > 9 ? "li_zm" : "li_num") + ' ' + (i > 28 ? "li_w" : "") + '"  ><span tag="' + i + '">' + keyNums[i] + '</span></li>'
		}
		$("#pro").html("<ul class='clearfix ul_keybord'>" + sss + "</ul>");
		for(var j = 0; j < keyNums.length; j++) {
			$('.ikey' + j + ' ' + 'span').click(function(event) {
				//console.log("event",$(event.target).attr("tag"));
				me.choosekey(event.target, $(event.target).attr("tag"));
			});
		}

	};

	xx_Dshowform.prototype.addKeyProvince = function(provinceIds) {
		//console.log("addKeyProvince");
		var addHtml = '<li>';
		addHtml += '<span class="xx_DShowform_provinces">' + provinces[provinceIds] + '</span>';
		addHtml += '</li>';
		return addHtml;
	};

	xx_Dshowform.prototype.chooseProvince = function(obj) {
		//console.log("aa", $(obj).text());
		$(".input_pro span").text($(obj).text());
		$(".input_pro").addClass("hasPro");
		$(".input_pp").find("span").text("");
		$(".ppHas").removeClass("ppHas");
		next = 0;
		me.showKeybord();
	};

	xx_Dshowform.prototype.choosekey = function(obj, jj) {
		//console.log('jj',jj);
		if(jj == 29) {
			console.log("车牌:" + $("#" + containterbox).attr("data-pai"));
			$("#xx_Dshowchepainum").val($("#" + containterbox).attr("data-pai"));
			layer.closeAll();
		} else if(jj == 37) {
			if($(".ppHas").length == 0) {
				$(".hasPro").find("span").text("");
				$(".hasPro").removeClass("hasPro");
				me.showProvince();
				next = 0;
			}
			$(".ppHas:last").find("span").text("");
			$(".ppHas:last").removeClass("ppHas");
			next = next - 1;
			if(next < 1) {
				next = 0;
			}
			console.log(next);
		} else {
			if(next > 5) {
				return
			}
			console.log(next);
			for(var i = 0; i < $(".input_pp").length; i++) {
				if(next == 0 & jj < 10 & $(".input_pp:eq(" + next + ")").hasClass("input_zim")) {
					layer.open({
						content: '车牌第二位为字母',
						skin: 'msg',
						time: 1
					});
					return;
				}
				$(".input_pp:eq(" + next + ")").find("span").text($(obj).text());
				$(".input_pp:eq(" + next + ")").addClass("ppHas");
				next = next + 1;
				if(next > 5) {
					next = 6;
				}
				me.getpai();
				return;
			}
		}
	};

	xx_Dshowform.prototype.closePro = function() {
		layer.closeAll();
	};

	xx_Dshowform.prototype.cleanPro = function() {
		$(".ul_input").find("span").text("");
		$(".hasPro").removeClass("hasPro");
		$(".ppHas").removeClass("ppHas");
		next = 0;
	};

	xx_Dshowform.prototype.trimStr = function(str) {
		return str.replace(" ", "");
	};

	xx_Dshowform.prototype.getpai = function() {
		var pai = me.trimStr($("#" + containterbox).text());
		$("#" + containterbox).attr("data-pai", pai);
	};
	xx_Dshowform.prototype.addevents = function() {
		//console.log("window.onload");

		$(".input_pro").click(function(event) {
			layer.open({
				type: 1,
				content: '<div id="pro"></div>',
				anim: 'up',
				shade: false,
				style: 'position:fixed; bottom:0; left:0; width: 100%; height: auto; padding:0; border:none;'
			});
			me.showProvince();
			me.closekeybord();
		});
		$(".input_pp").click(function() {
			if($(".input_pro").hasClass("hasPro")) { // 如果已选择省份
				layer.open({
					type: 1,
					content: '<div id="pro"></div>',
					anim: 'up',
					shade: false,
					style: 'position:fixed; bottom:0; left:0; width: 100%; height: auto; padding:0; border:none;'
				});
				me.showKeybord();
				me.closekeybord();
			} else {
				$(".input_pro").click();
			}
		});

	};
	
	//点击其他区域关闭键盘,获取当前输入的车牌数据
	xx_Dshowform.prototype.closekeybord = function() {
		$(document).click(function() {
				me.closePro();
				me.getpai();
			$("#xx_Dshowchepainum").val($("#" + containterbox).attr("data-pai"));
			});
			$("#pro").click(function(event) {
				event.stopPropagation(); //阻止事件向上冒泡
			});
			event.stopPropagation(); //阻止事件向上冒泡
	};

	return new xx_Dshowform();

});