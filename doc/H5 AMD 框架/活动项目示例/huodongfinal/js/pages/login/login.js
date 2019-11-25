define(function(require) {
    var Base = require('page/Base'),
        controller = require('../BaseController'),
        template = require('text!./login.html');
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
        $('#login').on('click',function () {
           // if($('#inputUserName').val()=='小颖'&&$('#inputPassword').val()==1028){
//              alert('登陆成功！');
                location.hash = "#huodong";

//          }else {
//              alert('登陆失败！');
//          }
        });
    }
    /**
     * 除事件绑定
     */

    function run() {
        $('.view-container').css("background","url(images/xiangrikui3.jpg) center/cover  no-repeat");
    }
    return {
        load: load
    };
});