define(function(require) {
    var Base = require('page/Base'),
        controller = require('../BaseController'),
        template = require('text!./main.html');
    /**
     * 对外暴露函数，用于视图加载
     */
    var load = function() {
        render();
        bind();
        run();
    };
    /**
     * 视图渲染
     */
    function render() {
        controller.setTemplate(template);
        controller.render(Base.getViewContainer());
    }
    /**
     * 事件绑定
     */
    function bind() {
    }
    /**
     * 除事件绑定
     */

    function run() {
        $('.view-container').css('background-image','');
    }
    return {
        load: load
    };
});