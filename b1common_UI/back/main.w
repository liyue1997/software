<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;"
  xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:57px;left:26px;"
    onActive="modelActive" onLoad="modelLoad" onModelConstruct="modelModelConstruct" onunLoad="modelUnLoad" onInactive="modelInactive"> 
    </div>  
  <span class="winDia2" component="$UI/system/components/justep/windowDialog/windowDialog"
    xid="windowDialog1" forceRefreshOnOpen="false" top="calc(100% - 156px)" height="156px"
    width="100%" status="normal" style="top:12px;left:45px;" onReceive="windowDialog1Receive"/>
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="mainPanel">
    <div class="x-panel-content" xid="content1">
      <div component="$UI/system/components/justep/contents/contents" class="x-contents x-full"
        active="0" xid="contents1" swipe="false" wrap="false" onActiveChange="contents1ActiveChange">
        
        <div class="x-contents-content" xid="content2">
          <div component="$UI/system/components/justep/windowContainer/windowContainer" class="x-window-container" xid="windowContainer1" src="$UI/b1common/map/commonMap.w" autoLoad="true"></div></div>  
        </div>
    </div>  
    <div class="x-panel-bottom" xid="bottom1" style="background:rgba(0,0,0,0);"><img src="$UI/b1common/newimages/login_bg@2x.png" xid="image5" style="position:absolute;width:200px;z-index:999;bottom:20px;left:10%;;width:70%;"></img></div></div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog6" src=""></span></div>
