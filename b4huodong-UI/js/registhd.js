//弹出报名
function alertregistform() {
	$("#creat_hd").on("click", function(event) {
		event.preventDefault();
		$(".hdformdiv").fadeIn();
	})
	$(".close_formbox").on("click", function(event) {
		if($(event.target).is(".close_formbox") || $(event.target).is(".fixregisterbox")) {
			event.preventDefault();
			$(".hdformdiv").hide();
			clearallmsg();
		}
	})
	$(document).keyup(function(event) {
		if(event.which == "27") {
			$(".hdformdiv").fadeOut();
		}
	});
}

function clearallmsg() {
	document.getElementById("InputCompany").value = "";
	document.getElementById("InputAddress").value = "";
	document.getElementById("InputUsername").value = "";
	document.getElementById("InputUserphone").value = "";
	document.getElementById("warningmsg1").innerText = "";
	document.getElementById("warningmsg2").innerText = "";
	document.getElementById("warningmsg3").innerText = "";
	document.getElementById("warningmsg4").innerText = "";
}
//提交表单
var limit = true;

function upregistinfo() {
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
	if(limit) {
		limit = false;
		$.ajax({
			url: "http://www.xinxingtech.com.cn/b4huodong/api/HdBaoming/addobj",
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
				console.log(data);
				if(data.msg == "保存成功") {
					$(".hdformdiv").hide();
//					document.getElementById("hdregistform").reset();
					alert("您的申请已成功提交！");
					limit = true;
				} else {
					$(".hdformdiv").hide();
					clearallmsg();
					alert("提交失败");
					limit = true;
				}
			},
			error: function(data) {
				alert("请求失败,请稍后再试");
				limit = true;
			}
		});
	}

}