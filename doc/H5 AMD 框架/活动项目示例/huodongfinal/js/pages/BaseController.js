define(function() {
    var setTemplate=function(template){
        this.template = template;
    };
    var render=function(container){
        // 获取模板
        var templateStr = this.template;
        // 加载页面
        container.innerHTML = templateStr;
        //console.log("render over",templateStr);
    };
    return {
        setTemplate:setTemplate,
        render:render
    }
});