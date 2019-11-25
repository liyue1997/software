<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" onLoad="modelLoad"><div component="$UI/system/components/justep/data/data" autoLoad="true" xid="messagedata" idColumn="id"><column label="序号" name="id" type="String" xid="xid1"></column>
  <column label="数据类型" name="msgtype" type="String" xid="xid2"></column>
  <column label="数据内容" name="msgcontent" type="String" xid="xid3"></column>
  <column label="发送人" name="fromwho" type="String" xid="xid4"></column></div></div> 
<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1">
   <div class="x-panel-top" xid="top1"></div>
   <div class="x-panel-content" xid="content1"><a component="$UI/system/components/justep/button/button" class="btn btn-default" label="登录" xid="button1" onClick="button1Click">
   <i xid="i1"></i>
   <span xid="span1">登录</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="打开聊天会话" xid="button3" onClick="OpenChartClick">
   <i xid="i3"></i>
   <span xid="span6">打开聊天会话</span></a><div component="$UI/system/components/justep/row/row" class="x-row" xid="row1">
   <div class="x-col x-col-67" xid="col1"><input component="$UI/system/components/justep/input/input" class="form-control" xid="sendtext"></input></div>
   <div class="x-col x-col-33" xid="col3"><a component="$UI/system/components/justep/button/button" class="btn btn-default" label="发送" xid="button2" onClick="button2Click">
   <i xid="i2"></i>
   <span xid="span2">发送</span></a></div></div>
  <div xid="div1"><ul component="$UI/system/components/justep/list/list" class="x-list x-list-template" xid="list1" data="messagedata">
   <div component="$UI/system/components/justep/row/row" class="x-row" xid="row3">
   <div class="x-col" xid="col7"><span xid="span3" bind-text='val("fromwho")'><![CDATA[发送人]]></span></div>
   <div class="x-col" xid="col8"><span xid="span4" bind-text='val("msgcontent")'><![CDATA[消息]]></span></div>
   <div class="x-col" xid="col9"><span xid="span5" bind-text='val("msgtype")'><![CDATA[消息类型]]></span></div></div></ul></div>
  </div>
   <div class="x-panel-bottom" xid="bottom1"></div></div></div>