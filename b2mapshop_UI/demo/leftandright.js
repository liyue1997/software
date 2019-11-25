define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var touch = require("./touch");
	
	var Model = function(){
		this.callParent();
	};

	Model.prototype.button1Click = function(event){
        this.comp('newsData').next();
        console.log("button1Click");
	};
	Model.prototype.getImageUrl = function(row){
		return require.toUrl(row.val('fImage'));
	};

	Model.prototype.swipeDelete = function(){
	    var me=this;
		var newsContentID = this.getIDByXID('bottom1');
		console.log(newsContentID);
		var swipeAreaSize = 100;
		var dx;
		touch.on('#'+ newsContentID, 'touchstart', function(ev){
		    console.log("touchstart:");
			ev.preventDefault();
			//var $swipNode = $('#' + newsContentID ).has(ev.target);
			//dx = parseInt($swipNode.attr('swipeX') || "0");
		});
		
		touch.on('#'+ newsContentID, 'drag', function(ev){
		   console.log("drag:"+ev.direction);
//			var $swipNode = $('#' + newsContentID ).has(ev.target);
//			if(ev.direction === "left" || ev.direction === "right"){
//				dx = dx || 0;
//				var offx = dx + ev.x;
//				if(offx < swipeAreaSize*-1){
//					offx = swipeAreaSize*-1;
//				}
//				if(offx > 0){
//					offx = 0;
//				}
//				if(ev.direction === "right" && $swipNode.hasClass('x-swipe-out')){
//					$swipNode.css({'transform':'translate3d('+offx+'px,0,0)'});
//				}else if(ev.direction === "left" && (!$swipNode.hasClass('x-swipe-out'))){
//					$swipNode.css({'transform':'translate3d('+offx+'px,0,0)'});
//				}
//			}
		});
		touch.on('#'+ newsContentID, 'dragend', function(ev){
		    console.log("dragend:"+ev.direction);
			//var $swipNode = $('#' + newsContentID ).has(ev.target);
			if(ev.direction === "left"){
			    me.comp('newsData').pre();
//				$swipNode.css({'transform':'translate3d(-'+swipeAreaSize+'px,0,0)'});
//				$swipNode.addClass('x-swipe-out');
//				dx = swipeAreaSize*-1;
			}else if(ev.direction === "right"){
			    me.comp('newsData').next();
//				$swipNode.removeClass('x-swipe-out');
//				$swipNode.css({'transform':'translate3d(0,0,0)'});
//				dx = 0;
			}
			//$swipNode.attr('swipeX',dx);
		});
	};
	
	
	Model.prototype.modelLoad = function(event){
		this.swipeDelete();

	};
	
	
	return Model;
});