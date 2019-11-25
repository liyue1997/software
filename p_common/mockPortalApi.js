define(function(require){
	var shell = require('$UI/system/lib/portal/shell');
	var portal = require('$UI/system/lib/portal/portal');
	
	
	portal.getPortal = function(url, options){
		return shell.impl;
	};
	
	portal.openWindow = function(url, options){
		options = options || {}; 
		options.url = url;
		return shell.showPage(options);
	};

	portal.closeWindow = function(){//TODO: id
		return shell.closePage();
	};

	portal.hasWindow = function(id){
		
	};

	portal.getWindowId = function(){
		
	};

	portal.gotoWindow = function(id){
		return shell.showPage({xid:id});
	};

	portal.toggleMenu = function(){
		return shell.showPage({xid:'left'});
	};
});


