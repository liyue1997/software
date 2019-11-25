define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/scrollView/scrollView');
require('$model/UI2/system/components/justep/list/list');
require('$model/UI2/system/components/justep/menu/menu');
require('$model/UI2/system/components/justep/panel/child');
require('$model/UI2/system/components/justep/windowDialog/windowDialog');
require('$model/UI2/system/components/justep/router/router');
require('$model/UI2/system/components/justep/messageDialog/messageDialog');
require('$model/UI2/system/components/justep/panel/panel');
require('$model/UI2/system/components/justep/contents/content');
require('$model/UI2/system/components/justep/button/checkbox');
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/output/output');
require('$model/UI2/TalkDemo/lib/superInput/superInput');
require('$model/UI2/system/components/justep/popMenu/popMenu');
require('$model/UI2/system/components/justep/titleBar/titleBar');
require('$model/UI2/system/components/justep/contents/contents');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/button/buttonGroup');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/TalkDemo/base/message'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='false';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='czyqIZv';
	this._flag_='9ec076f6f60869ef5e45d3c6c8e63c80';
	this._wCfg_={};
	this._appCfg_={};
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fAttentionNum":{"define":"fAttentionNum","label":"fAttentionNum","name":"fAttentionNum","relation":"fAttentionNum","type":"String"},"fChecked":{"define":"fChecked","label":"fChecked","name":"fChecked","relation":"fChecked","type":"String"},"fContent":{"define":"fContent","label":"fContent","name":"fContent","relation":"fContent","type":"String"},"fFileName":{"define":"fFileName","label":"fFileName","name":"fFileName","relation":"fFileName","type":"String"},"fID":{"define":"fID","label":"fID","name":"fID","relation":"fID","type":"String"},"fImg":{"define":"fImg","label":"fImg","name":"fImg","relation":"fImg","type":"String"},"fIsOwnSet":{"define":"fIsOwnSet","label":"fIsOwnSet","name":"fIsOwnSet","relation":"fIsOwnSet","type":"String"},"fMessageText":{"define":"fMessageText","label":"fMessageText","name":"fMessageText","relation":"fMessageText","type":"String"},"fSender":{"define":"fSender","label":"fSender","name":"fSender","relation":"fSender","type":"String"},"fSenderPID":{"define":"fSenderPID","label":"fSenderPID","name":"fSenderPID","relation":"fSenderPID","type":"String"},"fSenderTime":{"define":"fSenderTime","label":"fSenderTime","name":"fSenderTime","relation":"fSenderTime","type":"String"},"fState":{"define":"fState","label":"fState","name":"fState","relation":"fState","type":"String"},"fStyle":{"define":"fStyle","label":"fStyle","name":"fStyle","relation":"fStyle","type":"String"},"fileUrl":{"define":"fileUrl","label":"fileUrl","name":"fileUrl","relation":"fileUrl","type":"String"},"isOut":{"define":"isOut","label":"isOut","name":"isOut","relation":"isOut","type":"Boolean"}},"directDelete":false,"events":{},"idColumn":"fID","isMain":false,"limit":20,"xid":"messageData"});
}}); 
return __result;});