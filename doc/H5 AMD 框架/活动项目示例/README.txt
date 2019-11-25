注意：项目图片及通用js文件资源已上传腾讯云，访问的为腾讯云资源路径
1、项目结构：
|-huodongfinal
    | -img
    |      |-图片
    | -js
    |      | -compents(可复用的组件)
    |      |	| -xx_Chepai(车牌组件)
    |      |	| -xx_Dshow(轮播海报组件)
    |      | -lib
    |      |	 通用的函数包（jquery、webjs、webpost、tbase）
    |      | -pages
    |      |     | -项目各个页面以文件夹（html、css、js）存放	
    |      |     | -Base.js	
    |      |     | -BaseController.js（获取模板控制页面加载）	
    |      |     | -main.js（控制模板跳转加载和重要函数包的载入）	
    | -index.html(入口、整体结构)
    | -index.js（配置函数包的访问位置）
    | -index.css（通用样式）

2、页面的加载渲染基本规则
define(function(require) {
var template = require('text!./huodong.html');//先引入页面模板
    require(css!../.....);//引入模板样式、依赖的函数包

/* 对外暴露函数，用于视图加载*/
var load = function() {
render();
bind();
run();
unbind()；
};

/* 视图渲染*/
function render() {
     controller.setTemplate(template);
     controller.render(Base.getViewContainer());	
}
/*事件绑定*/
function bind() {
}
/*解除事件绑定*/
function unbind(){
}
/*运行*/
function run(){
}

return {
        load: load
};
)};
