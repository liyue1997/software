define(function(require) {
	var me;
	var xx_Dshowcheckinfo = function() {
		me = this;
	};
	var xx_Dshowcode = require("xx_Dshowcode");

	var check = true;
	xx_Dshowcheckinfo.prototype.checkform = function(name, chepai, phone, success) {
		var paystatus = localStorage.getItem("paystatus");
		if(paystatus == "1") {
			xx_Dshowcode.tohexiao(localStorage.getItem("payorder"));
			return;
		} else if(paystatus == "2") {
			return;
		} else if(paystatus == "3") {
			return;
		}
		if(name == null || name == "") {
			alert("姓名不能为空!");
			return false;
		}
		if(chepai == null || chepai == "") {
			alert("车牌不能为空!");
			return false;
		} else if(chepai.length < 7) {
			alert("请填写正确的车牌!");
			return false;
		}
		if(!(/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(phone))) {
			alert("请输入正确的手机号!");
			return false;
		}
		if(check) {
			success(true);
		}

	};
	xx_Dshowcheckinfo.prototype.checkstatus = function(info) {
		console.log("HuodongStatus", info.HuodongStatus, "PayStatus", info.PayStatus);
		if(info.PayStatus == "1") { //已支付
			$("#xx_Dshowjoinbtn").text("已报名,点击展示核销码");
			$("#xx_Dshowjoinbtn").css("background", "rgb(63,136,231)");
			localStorage.setItem("paystatus", info.PayStatus);
			localStorage.setItem("payorder", info.PayOrder);
			$("#xx_DshowUsernameinput").val(info.UserName);
			$("#xx_DshowPhoneinput").val(info.UserPhone);

			$("#xx_Dshowchepainum").toggle();
			$("#xx_Dshowcarinput").toggle();
			$("#xx_Dshowchepainum").text(info.UserCar);

		} else if(info.PayStatus == "3") { //已核销
			$("#xx_Dshowjoinbtn").text("已核销");
			$("#xx_Dshowjoinbtn").css("background", "rgb(63,136,231)");
			$("#xx_Dshowjoinbtn").attr("disabled", false);
			$("#xx_DshowUsernameinput").val(info.UserName);
			$("#xx_DshowPhoneinput").val(info.UserPhone);
		} else if(info.HuodongStatus == "0") { //活动未开始
			$("#xx_Dshowjoinbtn").text("活动尚未开始");
			$("#xx_Dshowjoinbtn").css("background", "rgb(173,173,174)");
			$("#xx_Dshowjoinbtn").setAttribute("disabled", false);
		} else if(info.HuodongStatus == "2") { //活动已结束
			$("#xx_Dshowjoinbtn").text("活动已结束");
			$("#xx_Dshowjoinbtn").css("background", "rgb(173,173,174)");
			$("#xx_Dshowjoinbtn").attr("disabled", false);
		} else if(info.HuodongStatus == "3") {
			$("#xx_Dshowjoinbtn").text("活动已取消");
			$("#xx_Dshowjoinbtn").css("background", "rgb(173,173,174)");
			$("#xx_Dshowjoinbtn").attr("disabled", false);
			$("#xx_DshowUsernameinput").val(info.UserName);
			$("#xx_DshowPhoneinput").val(info.UserPhone);
		} else if(info.HuodongStatus == "4") {
			$("#xx_Dshowjoinbtn").text("已核算");
			$("#xx_Dshowjoinbtn").css("background", "rgb(173,173,174)");
			$("#xx_Dshowjoinbtn").attr("disabled", false);
			$("#xx_DshowUsernameinput").val(info.UserName);
			$("#xx_DshowPhoneinput").val(info.UserPhone);
		} else {
			localStorage.setItem("paystatus", "0");
		}
	};

	xx_Dshowcheckinfo.prototype.clearallwarning = function() {
		document.getElementById("warningmsg1").innerText = "";
		document.getElementById("warningmsg2").innerText = "";
		document.getElementById("warningmsg3").innerText = "";
		document.getElementById("warningmsg4").innerText = "";
	}

	xx_Dshowcheckinfo.prototype.clearallmsg = function() {
		document.getElementById("InputCompany").value = "";
		document.getElementById("InputAddress").value = "";
		document.getElementById("InputUsername").value = "";
		document.getElementById("InputUserphone").value = "";
		document.getElementById("warningmsg1").innerText = "";
		document.getElementById("warningmsg2").innerText = "";
		document.getElementById("warningmsg3").innerText = "";
		document.getElementById("warningmsg4").innerText = "";
	}

	xx_Dshowcheckinfo.prototype.upregistinfo = function() {
		me.clearallwarning();
		var InputCompany = document.getElementById("InputCompany").value;
		var InputAddress = document.getElementById("InputAddress").value;
		var InputUsername = document.getElementById("InputUsername").value;
		var InputUserphone = document.getElementById("InputUserphone").value;
		var warningmsg1 = document.getElementById("warningmsg1");
		var warningmsg2 = document.getElementById("warningmsg2");
		var warningmsg3 = document.getElementById("warningmsg3");
		var warningmsg4 = document.getElementById("warningmsg4");
		if(InputCompany == "" || InputCompany == null) {
			warningmsg1.innerText = "请输入公司名称！";
			return false;
		}
		if(InputAddress == "" || InputAddress == null) {
			warningmsg2.innerText = "请输入公司地址！";
			return false;
		}
		if(InputUsername == "" || InputUsername == null) {
			warningmsg3.innerText = "请输入联系人姓名！";
			return false;
		}
		if(InputUserphone == "" || InputUserphone == null) {
			warningmsg4.innerText = "请输入联系人手机号！";
			return false;
		} else if(!(/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(InputUserphone))) {
			warningmsg4.innerText = "请输入正确的手机号!";
			return false;
		}
		var token = localStorage.getItem("token");
		var timestamp = (new Date()).valueOf();
		var data = {
			"baomingId": timestamp,
			"handleStatus": "0",
			"shopName": InputCompany,
			"shopAddress": InputAddress,
			"shopContact": InputUsername,
			"shopTel": InputUserphone
		};
		if(check) {
			$.ajax({
				url: "http://127.0.0.1:8089/b4huodong/api/HdBaoming/addobj",
				type: "POST",
				beforeSend: function(request) {
					request.setRequestHeader("credentials", 'include');
					request.setRequestHeader("token", token);
					request.setRequestHeader("Accept", '*/*');
					request.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
				},
				dataType: 'JSON',
				data: data,
				success: function(data) {
					console.log("HdBaoming",data);
					if(data.msg == "保存成功") {
						$("#creat_hdmodel").hide();
						alert("您的申请已成功提交！");
					} else {
						$("#creat_hdmodel").hide();
						clearallmsg();
						alert("提交失败");
					}
				},
				error: function(data) {
					alert("请求失败,请稍后再试");
				}
			});

		}
	};

	return new xx_Dshowcheckinfo();
});