window.__justep.__ResourceEngine.loadCss([{url: '/UI2/v_a79f506fd00b4a3bb124e63e037b6304l_zh_CNs_d_m/system/components/bootstrap.min.css', include: '$model/UI2/system/components/bootstrap/lib/css/bootstrap,$model/UI2/system/components/bootstrap/lib/css/bootstrap-theme'},{url: '/UI2/v_859cedcfc5e2412a95439705c41e4617l_zh_CNs_d_m/system/components/comp.min.css', include: '$model/UI2/system/components/justep/lib/css2/dataControl,$model/UI2/system/components/justep/input/css/datePickerPC,$model/UI2/system/components/justep/messageDialog/css/messageDialog,$model/UI2/system/components/justep/lib/css3/round,$model/UI2/system/components/justep/input/css/datePicker,$model/UI2/system/components/justep/row/css/row,$model/UI2/system/components/justep/dataTables/css/responsive,$model/UI2/system/components/justep/attachment/css/attachment,$model/UI2/system/components/justep/barcode/css/barcodeImage,$model/UI2/system/components/bootstrap/dropdown/css/dropdown,$model/UI2/system/components/justep/contents/css/contents,$model/UI2/system/components/justep/common/css/forms,$model/UI2/system/components/justep/dataTables/css/responsive,$model/UI2/system/components/justep/locker/css/locker,$model/UI2/system/components/justep/menu/css/menu,$model/UI2/system/components/justep/scrollView/css/scrollView,$model/UI2/system/components/justep/loadingBar/loadingBar,$model/UI2/system/components/justep/dialog/css/dialog,$model/UI2/system/components/justep/bar/css/bar,$model/UI2/system/components/justep/popMenu/css/popMenu,$model/UI2/system/components/justep/lib/css/icons,$model/UI2/system/components/justep/lib/css4/e-commerce,$model/UI2/system/components/justep/toolBar/css/toolBar,$model/UI2/system/components/justep/popOver/css/popOver,$model/UI2/system/components/justep/panel/css/panel,$model/UI2/system/components/bootstrap/carousel/css/carousel,$model/UI2/system/components/justep/wing/css/wing,$model/UI2/system/components/bootstrap/scrollSpy/css/scrollSpy,$model/UI2/system/components/justep/titleBar/css/titleBar,$model/UI2/system/components/justep/lib/css1/linear,$model/UI2/system/components/justep/numberSelect/css/numberList,$model/UI2/system/components/justep/list/css/list,$model/UI2/system/components/justep/dataTables/css/dataTables'}]);window.__justep.__ResourceEngine.loadJs(['/v_da512873bd394caa8cf4d3a988db425al_zh_CNs_d_m/system/core.min.js','/v_d739ae135394470392318cce0e04ce82l_zh_CNs_d_m/system/common.min.js','/v_86dff3b4733440609c28d6911de454f1l_zh_CNs_d_m/system/components/comp.min.js']);define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/scrollView/scrollView');
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/list/list');
require('$model/UI2/system/components/justep/titleBar/titleBar');
require('$model/UI2/system/components/justep/panel/child');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/panel/panel');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/TalkDemo/talklist'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cu26Nrm';
	this._flag_='21274abbe5b4bc82ce269fc877889ac6';
	this._wCfg_={};
	this._appCfg_={};
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":false,"autoNew":false,"confirmDelete":true,"confirmRefresh":true,"defCols":{"converID":{"define":"converID","label":"对方ID或群组ID","name":"converID","relation":"converID","type":"String"},"headimg":{"define":"headimg","label":"头像","name":"headimg","relation":"headimg","type":"String"},"id":{"define":"id","label":"序号","name":"id","relation":"id","type":"String"},"lastFrom":{"define":"lastFrom","label":"最近消息发送者","name":"lastFrom","relation":"lastFrom","type":"String"},"lastMsg":{"define":"lastMsg","label":"最近一条消息","name":"lastMsg","relation":"lastMsg","type":"String"},"lastTime":{"define":"lastTime","label":"最近会话时间","name":"lastTime","relation":"lastTime","type":"String"},"talkName":{"define":"talkName","label":"会话名称","name":"talkName","relation":"talkName","type":"String"},"type":{"define":"type","label":"聊天类型","name":"type","relation":"type","type":"String"},"unreadcount":{"define":"unreadcount","label":"未读消息数","name":"unreadcount","relation":"unreadcount","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"shopinfoCustomRefresh"},"idColumn":"id","initData":"","isMain":false,"limit":20,"xid":"talklist"});
}}); 
return __result;});
