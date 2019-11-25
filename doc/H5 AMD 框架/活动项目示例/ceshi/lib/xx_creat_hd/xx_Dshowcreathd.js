define(function(require) {
	var xx_Dshowcheckinfo = require("xx_Dshowcheckinfo");
	var xx_Dshowcreathd = function() {
	};

	xx_Dshowcreathd.prototype.alertregistform = function() {
		$("#xx_creat_hdbtn").on("click", function(event) {
			event.preventDefault();
			$("#creat_hdmodel").fadeIn();
		})
		$("#xx_close_box").on("click", function(event) {
			if($(event.target).is("#xx_close_box") || $(event.target).is("#xx_regist_box")) {
				event.preventDefault();
				$("#creat_hdmodel").hide();
				xx_Dshowcheckinfo.clearallmsg();
			}
		})
		$(document).keyup(function(event) {
			if(event.which == "27") {
				$("#creat_hdmodel").fadeOut();
			}
		});
	};

	return new xx_Dshowcreathd();
});