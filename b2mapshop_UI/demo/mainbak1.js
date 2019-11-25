define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	var Model = function(){
		this.callParent();
	};
    var self=null;
	Model.prototype.div1Click = function(event){
		justep.Shell.showPage("mapshop");
	};
    var up=2;
    var lf=2;
    function moveimg(img,imgw,divheight,divwidth){
            var top=img.css("margin-top").replace('px','')*1;
            var left=img.css("margin-left").replace('px','')*1;
            //console.log(left);
            
            if(top<imgw+50)
               up =2;
            else if (top >divwidth)
               up =-2;
            
                var top_css=(top+up)+'px';
                img.css('margin-top',top_css);
            
            if(left>divwidth-imgw)
               lf=-1;
            else if (left<5+imgw)
                lf=1;
            
                var left_css=(left*1+lf)+'px';
                img.css('margin-left',left_css);
    }
    
	function move(){
		window.setTimeout(function(){  

            //console.log("move");
            //console.log(self.getElementByXid("xinxing1"));
            //var top=  $(self.getElementByXid("xinxing1")).style.top;
            var divheight= $(self.getElementByXid("content1")).height();
            var divwidth= $(self.getElementByXid("content1")).width();
            var imgw=60;
            moveimg($(self.getElementByXid("xinxing1")),imgw,divheight,divwidth);
            moveimg($(self.getElementByXid("xinxing2")),imgw,divheight,divwidth);
            moveimg($(self.getElementByXid("xinxing3")),imgw,divheight,divwidth);
            
            //console.log(top);
            
            move();
		}, 50);
	}

	Model.prototype.modelLoad = function(event){
		self=this;
		move();
		
	};

	return Model;
});