
define( function(require) {
	//var me;
	function xx_testcompent (id) {
		//me = this;
		var curdata="a";
		this.init = function(data) {
			this.data=data;
			curdata=data;
		};
		
		
		this.print = function(data) {
			console.log(this.data,curdata);
		};
	};
	
	
	return  xx_testcompent;
}
);