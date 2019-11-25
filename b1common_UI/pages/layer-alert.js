//传入修改
function updateAttr(attr, strInfo) {
	var updateInfo = $(".layer-alert-input").val();
	if (updateInfo == "") {
		alert("您还未输入" + strInfo);
	} else {
		$(attr).text(updateInfo);
		layer.closeAll();
	}
}
// 修改性别名称
function updateSex(sex, sexSpan) {
	var txtSex = $(sex).text();
	$(sexSpan).text(txtSex);
	layer.closeAll();
}
function showDiv(classDiv) {
	$(classDiv).show();
}
function hideDiv(classDiv) {
	$(classDiv).hide();
}