var layer;
require(['layer'], function(layer) {
		layer = layer;
		//console.log("configlayer", layer); //layer对外提供的接口对象啦哈啊哈
	});
define(['layer'], function(require) {
	//var $ = require('jquery');
	//var layer = require('mobilelayer');
	
	var provinces = new Array("京", "沪", "浙", "苏", "粤", "鲁", "晋", "冀",
		"豫", "川", "渝", "辽", "吉", "黑", "皖", "鄂",
		"津", "贵", "云", "桂", "琼", "青", "新", "藏",
		"蒙", "宁", "甘", "陕", "闽", "赣", "湘");

	var keyNums = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
		"Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
		"A", "S", "D", "F", "G", "H", "J", "K", "L",
		"确认", "Z", "X", "C", "V", "B", "N", "M", "删除");
	function xx_Dshowform (id) {
		var me= this;
		me = this;
		var next = 0; //?
		var options = {
			width: '100%',
			height: 'auto'
		};
		this.compid=id;
		var containterbox;
		this.print=function(){
			console.log(this.compid);
		}
			
		this.init = function(data) {
			var self = this;
			var xx_Dshowcarbox = "<ul class='clearfix ul_input'>" +
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
		
	this.showProvince = function() {
		$("#pro").html("");
		var ss = "";
		for(var i = 0; i < provinces.length; i++) {
			ss = ss + me.addKeyProvince(i);
		}
		$("#pro").html("<ul class='clearfix ul_pro'>" + ss + "<li class='li_close'><span>关闭</span></li><li class='li_clean'><span>清空</span></li></ul>");
		
		console.log("showProvince",me.compid);
		$(".xx_DShowform_provinces").click(function(event) {
			console.log("xx_DShowform_provinces",me.compid);
			me.chooseProvince(event.target);
		});
		$("#pro .li_close").click(function() {
			me.closePro();
		});
		$("#pro .li_clean").click(function() {
			me.cleanPro();
		});
	};

	this.showKeybord = function() {
		$("#pro").html("");
		var sss = "";
		for(var i = 0; i < keyNums.length; i++) {		
			sss = sss + '<li class="ikey ikey' + i + ' ' + (i > 9 ? "li_zm" : "li_num") + ' ' + (i > 28 ? "li_w" : "") + '"  ><span tag="'+i+'">' + keyNums[i] + '</span></li>'	
		}
		$("#pro").html("<ul class='clearfix ul_keybord'>" + sss + "</ul>");
		for (var j=0;j<keyNums.length;j++) {
			$('.ikey'+j+' '+'span').click(function(event){
				//console.log("event",$(event.target).attr("tag"));
				me.choosekey(event.target,$(event.target).attr("tag"));
			});
		}
		
	};

	this.addKeyProvince = function(provinceIds) {
		//console.log("addKeyProvince");
		var addHtml = '<li>';
		addHtml += '<span class="xx_DShowform_provinces">' + provinces[provinceIds] + '</span>';
		addHtml += '</li>';
		return addHtml;
	};

	this.chooseProvince = function(obj) {
		console.log("aa", me.compid);
		$("#"+me.compid+"  .input_pro span").text($(obj).text());
		$("#"+me.compid+"  .input_pro").addClass("hasPro");
		$("#"+me.compid+"  .input_pp").find("span").text("");
		$("#"+me.compid+"  .ppHas").removeClass("ppHas");
		next = 0;
		me.showKeybord();
	};

	this.choosekey = function(obj, jj) {
		console.log('jj',jj);
		if(jj == 29) {
			console.log("车牌:" + $("#"+containterbox).attr("data-pai"));
			layer.closeAll();
		} else if(jj == 37) {
			if($("#"+me.compid+"  .ppHas").length == 0) {
				$("#"+me.compid+"  .hasPro").find("span").text("");
				$("#"+me.compid+"  .hasPro").removeClass("hasPro");
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
				if(next == 0 & jj < 10 & $("#"+me.compid+"  .input_pp:eq(" + next + ")").hasClass("input_zim")) {
					layer.open({
						content: '车牌第二位为字母',
						skin: 'msg',
						time: 1
					});
					return;
				}
				$("#"+me.compid+"  .input_pp:eq(" + next + ")").find("span").text($(obj).text());
				$("#"+me.compid+"  .input_pp:eq(" + next + ")").addClass("ppHas");
				next = next + 1;
				if(next > 5) {
					next = 6;
				}
				me.getpai();
				return;
			}
		}
	};

	this.closePro = function() {
		console.log("closePro",me.compid);
		layer.closeAll();
	};

	this.cleanPro = function() {
		console.log("cleanPro",me.compid);
		$("#"+me.compid+"  .ul_input").find("span").text("");
		$("#"+me.compid+"  .hasPro").removeClass("hasPro");
		$("#"+me.compid+"  .ppHas").removeClass("ppHas");
		next = 0;
	};

	this.trimStr = function(str) {
		return str.replace(" ", "");
	};

	this.getpai = function() {
		console.log("getpai",me.compid);
		var pai = me.trimStr($("#" + containterbox).text());
		$("#" + containterbox).attr("data-pai", pai);
	};
	this.addevents = function() {
		//console.log("window.onload");
		console.log("addevents",me.compid);
		$("#"+me.compid+"  .input_pro").click(function() {
			layer.open({
				type: 1,
				content: '<div id="pro"></div>',
				anim: 'up',
				shade: false,
				style: 'position:fixed; bottom:0; left:0; width: 100%; height: auto; padding:0; border:none;'
			});
			me.showProvince();
		});
		$("#"+me.compid+"  .input_pp").click(function() {
			if($("#"+me.compid+"  .input_pro").hasClass("hasPro")) { // 如果已选择省份
				layer.open({
					type: 1,
					content: '<div id="pro"></div>',
					anim: 'up',
					shade: false,
					style: 'position:fixed; bottom:0; left:0; width: 100%; height: auto; padding:0; border:none;'
				});
				me.showKeybord();
			} else {
				$("#"+me.compid+"  .input_pro").click();
			}
		});

	};
	
	this.keyboardhide=function(){
		$(document).bind('click',function(e){
			var e = e || window.event; //浏览器兼容性   
			var elem = e.target || e.srcElement;
			while(elem) { //循环判断至跟节点，防止点击的是div子元素   
				if(elem.id && (elem.id == 'test' || elem.id == 'test2')) {
					return;
				}
				elem = elem.parentNode;
			}
			$('#a').css('display', 'none'); //点击的不是div或其子元素
		});
	};
	  
	  this.endinput=function(){
	  	me.closePro();
	  }
	};


	
	return  xx_Dshowform;

});