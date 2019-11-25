define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var tbase = require("$UI/p_common/tbase");

	var Model = function(){
		this.callParent();
	};

	Model.prototype.li1Click = function(event){
	
		$(this.getElementByXid("spdesc")).text( event.bindingContext.$object.val("desc"));
        
	};

	Model.prototype.data1CustomRefresh = function(event){        
		var consolelogcount= tbase.getLocalStorage("consolelogcount","0")*1;
        var data = this.comp("data1");
        
        var n=0;
        if (consolelogcount>20)
           n=consolelogcount-20;
		for (var i=consolelogcount;i>=n;i--)
		{		     
		    var text=tbase.getLocalStorage("consolelog"+i.toString(),"");
            var titile=text;
            if (text.length>80)
                titile=text.substr(0,80);
            console.log("data.newData",i);
            data.newData({defaultValues:[{"id":i,"titile":titile,"desc":text}]});
		}
		
	};

	Model.prototype.button1Click = function(event){
        localStorage.clear();

		justep.Shell.showPage("login");
	};

	return Model;
});