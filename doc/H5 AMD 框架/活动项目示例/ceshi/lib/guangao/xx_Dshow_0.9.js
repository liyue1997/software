define(function(require){
	//https://www.cnblogs.com/daxiaohaha/p/11325467.html
	//图片轮播工具，适用于广告等
	var xx_Dshow = function() {
		
	};
	var options = {
		width: '100%',
		height: 'auto',
		anim: 'default', //切换方式 ; default 左右，fade 淡入
		autoplay: true, //开启轮播
		delay: 1000, //延时
		idx: 0, //播放序号
		pagePation: 'insider', //分页
		trigger: 'click'
	};
	var ELEM_NAME = ['kui-carousel', '.kui-carousel-item', 'kui-show', '.kui-carousel-pagePation', 'kui-this'];
	
    xx_Dshow.prototype.getjsversion = function()
	{
		return '0.9';
	};
	//option.elem ?
	
	xx_Dshow.prototype.init = function(option) {
		var self = this;
		self.option = $.extend({}, options, option);
		//console.log(self.option );
		//容器
		self.$dom = $(self.option.elem);
		self.carousel_list = self.$dom.find(ELEM_NAME[1] + ' >*');
		//限制序号取值范围
		self.option.idx = self.option.idx < self.carousel_list.length ? self.option.idx : 0;
		//设置切换类型
		self.$dom.attr('kui-anim', self.option.anim);
		//设置样式
		self.$dom.css({
			width: self.option.width,
			height: self.option.height
		})
		//分页
		self.PagePation();
		self.autoplay();
		return this;
	};
	
	xx_Dshow.prototype.autoplay = function() {
		var self = this;
		if(!self.option.autoplay) return;
		self.Timer = setInterval(_setIntervalfn, self.option.delay);
		self.carousel_list.on('mouseover', function() {
			clearInterval(self.Timer);
		})
		self.carousel_list.on('mouseout', function() {
			self.Timer = setInterval(_setIntervalfn, self.option.delay);
		})

		function _setIntervalfn() {
			//console.log("idx",self.option.idx);
			self.option.idx += 1;
			if(self.option.idx >= self.carousel_list.length) {
				self.option.idx = 0;
			}
			self.activeIndex();
		}
	};

	xx_Dshow.prototype.PagePation = function() {
		var self = this;
		if($.inArray(self.option.pagePation, ['insider', 'outsider']) == -1) return;
		self.$dom.attr('kui-pagePation', self.option.pagePation);
		$.each(self.carousel_list, function(i) {
			$('<a href="javascript:;" class="' + (i == self.option.idx ? ELEM_NAME[4] : '') + '"></a>').appendTo(ELEM_NAME[3]);
		})
		self.carousel_page = self.$dom.find(ELEM_NAME[3] + '>*');
		//console.log("carousel_page",self.carousel_page);
		self.activeIndex();
		self.carousel_page.on('click', function() {
			self.option.idx = $(this).index();
			self.activeIndex();
		})
	};

	xx_Dshow.prototype.activeIndex = function() {
		var self = this;
		self.carousel_list.removeClass(ELEM_NAME[2]);
		self.carousel_list.eq(self.option.idx).addClass(ELEM_NAME[2]);
		self.carousel_page.removeClass(ELEM_NAME[4]);
		self.carousel_page.eq(self.option.idx).addClass(ELEM_NAME[4]);
	};
    
	return new xx_Dshow();
});
