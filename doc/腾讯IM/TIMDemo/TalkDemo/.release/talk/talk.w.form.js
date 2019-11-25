define(function(require){
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
var __parent0=require('$model/UI2/TalkDemo/talk'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cMVZ7B3';
	this._flag_='1135292ca6b98284dfe95f7ebb1f6f62';
	this._wCfg_={};
	this._appCfg_={};
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":false,"autoNew":false,"confirmDelete":true,"confirmRefresh":true,"defCols":{"converID":{"define":"converID","label":"对方ID或群组ID","name":"converID","relation":"converID","type":"String"},"headimg":{"define":"headimg","label":"头像","name":"headimg","relation":"headimg","type":"String"},"id":{"define":"id","label":"序号","name":"id","relation":"id","type":"String"},"lastFrom":{"define":"lastFrom","label":"最近消息发送者","name":"lastFrom","relation":"lastFrom","type":"String"},"lastMsg":{"define":"lastMsg","label":"最近一条消息","name":"lastMsg","relation":"lastMsg","type":"String"},"lastTime":{"define":"lastTime","label":"最近会话时间","name":"lastTime","relation":"lastTime","type":"String"},"talkName":{"define":"talkName","label":"会话名称","name":"talkName","relation":"talkName","type":"String"},"type":{"define":"type","label":"聊天类型","name":"type","relation":"type","type":"String"},"unreadcount":{"define":"unreadcount","label":"未读消息数","name":"unreadcount","relation":"unreadcount","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"shopinfoCustomRefresh"},"idColumn":"id","initData":"","isMain":false,"limit":20,"xid":"talklist"});
}}); 
return __result;});