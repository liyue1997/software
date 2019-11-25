define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/input/input');
require('$model/UI2/system/components/justep/list/list');
require('$model/UI2/system/components/justep/panel/child');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/panel/panel');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/TalkDemo/TIM/timMain'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cBRzINj';
	this._flag_='39e5f77c9429db6e3efbee8da1c18063';
	this._wCfg_={};
	this._appCfg_={};
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fromwho":{"define":"fromwho","label":"发送人","name":"fromwho","relation":"fromwho","type":"String"},"id":{"define":"id","label":"序号","name":"id","relation":"id","type":"String"},"msgcontent":{"define":"msgcontent","label":"数据内容","name":"msgcontent","relation":"msgcontent","type":"String"},"msgtype":{"define":"msgtype","label":"数据类型","name":"msgtype","relation":"msgtype","type":"String"}},"directDelete":false,"events":{},"idColumn":"id","isMain":false,"limit":20,"xid":"messagedata"});
}}); 
return __result;});