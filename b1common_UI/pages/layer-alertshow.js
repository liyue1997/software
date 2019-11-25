define(function(require) {
	var layeralert = function() {
		
	};

	layeralert.prototype.show = function(strconent){
		layer.open({
			type : 1,
			content : strconent,
			anim : 'up',
			style : 'position:fixed; bottom:0; left:0; width: 100%; height: auto; padding:0; border:none;'
		});
	};
	return new layeralert();
});