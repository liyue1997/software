ע�⣺��ĿͼƬ��ͨ��js�ļ���Դ���ϴ���Ѷ�ƣ����ʵ�Ϊ��Ѷ����Դ·��
1����Ŀ�ṹ��
|-huodongfinal
    | -img
    |      |-ͼƬ
    | -js
    |      | -compents(�ɸ��õ����)
    |      |	| -xx_Chepai(�������)
    |      |	| -xx_Dshow(�ֲ��������)
    |      | -lib
    |      |	 ͨ�õĺ�������jquery��webjs��webpost��tbase��
    |      | -pages
    |      |     | -��Ŀ����ҳ�����ļ��У�html��css��js�����	
    |      |     | -Base.js	
    |      |     | -BaseController.js����ȡģ�����ҳ����أ�	
    |      |     | -main.js������ģ����ת���غ���Ҫ�����������룩	
    | -index.html(��ڡ�����ṹ)
    | -index.js�����ú������ķ���λ�ã�
    | -index.css��ͨ����ʽ��

2��ҳ��ļ�����Ⱦ��������
define(function(require) {
var template = require('text!./huodong.html');//������ҳ��ģ��
    require(css!../.....);//����ģ����ʽ�������ĺ�����

/* ���Ⱪ¶������������ͼ����*/
var load = function() {
render();
bind();
run();
unbind()��
};

/* ��ͼ��Ⱦ*/
function render() {
     controller.setTemplate(template);
     controller.render(Base.getViewContainer());	
}
/*�¼���*/
function bind() {
}
/*����¼���*/
function unbind(){
}
/*����*/
function run(){
}

return {
        load: load
};
)};
