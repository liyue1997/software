<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" onLoad="modelLoad" style="top:239px;left:13px;height:auto;"><div component="$UI/system/components/justep/data/data" autoLoad="true" xid="messagedata" idColumn="id"><column label="序号" name="id" type="String" xid="xid1"></column>
  <column label="数据类型" name="msgtype" type="String" xid="xid2"></column>
  <column label="数据内容" name="msgcontent" type="String" xid="xid3"></column>
  <column label="发送人" name="fromwho" type="String" xid="xid4"></column>
  <column name="senderImg" type="String" xid="xid5"></column>
  <column name="massagestatus" type="String" xid="xid6"></column>
  <column name="isRead" type="String" xid="xid7"></column>
  <column name="sendtime" type="String" xid="xid8"></column></div></div> 
<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1">
   <div class="x-panel-top" xid="top1"><a component="$UI/system/components/justep/button/button" label="" class="btn btn-link btn-only-icon" icon="icon-chevron-left" onClick="{operation:'window.close'}" xid="backBtn">
   <i class="icon-chevron-left" xid="i11"></i>
   <span xid="span10"></span></a></div>
   <div class="x-panel-content" xid="content1">
  
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row2">
   <div class="x-col x-col-33" xid="col2"></div>
   <div class="x-col" xid="col4" style="text-align:center;"><a component="$UI/system/components/justep/button/button" class="btn btn-default" label="登录" xid="button1" onClick="button1Click">
   <i xid="i1"></i>
   <span xid="span1">登录</span></a></div>
   <div class="x-col" xid="col5"></div>
  <div class="x-col" xid="col6" style="text-align:center;"><a component="$UI/system/components/justep/button/button" class="btn btn-default" label="消息" xid="button4" onClick="OpenChartListClick" icon="linear linear-bubble" style="width:100%;height:100%;">
   <i xid="i4" class="linear linear-bubble"></i>
   <span xid="span8">消息</span></a>
  <i xid="i5" class="tip" bind-css="tip" bind-text="count"></i></div></div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row4">
   <div class="x-col" xid="col10"><span xid="span7"><![CDATA[选择类型：]]></span>
  <span component="$UI/system/components/justep/button/radio" class="x-radio" xid="groupcheck" label="群组" name="choosetype"></span>
  <span component="$UI/system/components/justep/button/radio" class="x-radio" xid="usercheck" label="个人" name="choosetype"></span>
  </div>
   <div class="x-col" xid="col11"><input component="$UI/system/components/justep/input/input" class="form-control" xid="inputteamid" placeHolder="请输入teamid"></input></div>
   <div class="x-col x-col-25" xid="col12"><a component="$UI/system/components/justep/button/button" class="btn btn-default" label="打开会话" xid="button3" onClick="OpenChartClick">
   <i xid="i3"></i>
   <span xid="span6">打开会话</span></a></div></div>
   <div component="$UI/system/components/justep/row/row" class="x-row" xid="row1">
   <div class="x-col" xid="col1"><input component="$UI/system/components/justep/input/input" class="form-control" xid="loginid"></input></div>
   </div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row5">
   <div class="x-col" xid="col3"><a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon x-btn-emoji"
          label="" icon="iconfont icon-jianpan2"> 
          <i class="iconfont icon-jianpan2"/>  
          <span/> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon x-btn-voice"
          label="" icon="iconfont icon-voice" style="margin-top:-6px"> 
          <i class="iconfont icon-voice"/>  
          <span/> 
        </a> </div></div><div xid="div1"><ul component="$UI/system/components/justep/list/list" class="x-list x-list-template" xid="list1" data="messagedata">
   <div component="$UI/system/components/justep/row/row" class="x-row" xid="row3">
   <div class="x-col" xid="col7"><span xid="span3" bind-text='val("fromwho")'><![CDATA[发送人]]></span></div>
   <div class="x-col" xid="col8"><span xid="span4" bind-text='val("msgcontent")'><![CDATA[消息]]></span></div>
   <div class="x-col" xid="col9"><span xid="span5" bind-text='val("msgtype")'><![CDATA[消息类型]]></span></div></div></ul></div>
  </div>
   <div class="x-panel-bottom" xid="bottom1" style="text-align:center;"></div></div></div>