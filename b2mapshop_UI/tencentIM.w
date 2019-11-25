<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:110px;left:23px;height:auto;" onLoad="modelLoad"/> 
<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1">
   <div class="x-panel-top" xid="top1"><div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar" xid="titleBar1">
   <div class="x-titlebar-left" xid="left1"><a component="$UI/system/components/justep/button/button" label="" class="btn btn-link btn-only-icon" icon="img:$UI/b2mapshop_UI/img/nav_icon_fanhui.png" onClick="{operation:'window.close'}" xid="backBtn">
   <img src="$UI/b2mapshop_UI/img/nav_icon_fanhui.png" xid="image3" style="width:20px;"></img>
   <span xid="span1"></span></a></div>
   <div class="x-titlebar-title" xid="title1" bind-text="talkroomtitle"><![CDATA[聊天室]]></div>
   <div class="x-titlebar-right reverse" xid="right1"></div></div></div>
   <div class="x-panel-content" xid="content1"><iframe xid="TIMiframe" frameborder="0" height="100%" width="100%" scrolling="yes" class="TIMiframe"></iframe></div>
   <div class="x-panel-bottom" xid="bottom1" height="0"></div></div></div>