<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" onLoad="modelLoad" onActive="modelActive" onunLoad="modelunLoad" style="top:71px;left:283px;height:auto;" onInactive="modelInactive"/>  
  
  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel3"> 
    <div class="x-panel-top" xid="top3"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar" xid="titleBar1" title="我的位置">
   <div class="x-titlebar-left" xid="left1"><img src="$UI/b1common/newimages/siderbaricon.png" xid="image1" style="margin-left:10px;width:15px;height:10px;" bind-click="btnlistClick"></img></div>
   <div class="x-titlebar-title" xid="title1">我的位置</div>
   <div class="x-titlebar-right reverse" xid="right1" bind-click="btnSetupClick"><img src="$UI/b1common/newimages/share.png" xid="image2" style="width:15px;height:14px;margin-left:10px;"></img></div></div></div>  
    <div class="x-panel-content" xid="content3">  
            <div xid="baiduMap" style="height:100%;width:100%;"/> 

     
     
     
     
     <img src="" onerror='this.src="./map/middle.jpg";' alt="" xid="image3" class="adimg"></img>
     <img src="./detele-icon.png" alt="" xid="image4" height="20px" bind-click="image4Click" class="delimg"></img>
     <span xid="span1" class="countdown"><![CDATA[3秒后自动关闭...]]></span>
    <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon bgbtn" xid="button1">
   <i xid="i1"></i>
   <span xid="span3"></span></a>
  <div component="$UI/system/components/justep/row/row" class="x-row aboverow" xid="row1">
   <div class="x-col x-col-fixed" xid="col1" style="width:auto;">
   <img src="$UI/b1common/newimages/notice.png" alt="" xid="image7" bind-click="image5Click" class="noteimg"></img></div>
   <div class="x-col x-col-center" xid="col2"><span xid="span2" class="adspan"><![CDATA[神速加油，加油方便，还免服务费！]]></span></div>
   <div class="x-col x-col-fixed x-col-center" xid="col3" style="width:auto;">
   <img src="$UI/b1common/newimages/closenotice.png" alt="" xid="image6" bind-click="image6Click" class="closeimg"></img></div></div></div> 
  </div> 
<span class="winDia2" component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog1" forceRefreshOnOpen="false" top="20px" height="auto" width="100%" status="normal" style="top:12px;left:45px;" onReceive="windowDialog1Receive"></span>
  <span class="winDia2" component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog2" src="$UI/p_common/payCommon.w" status="normal" onReceive="windowDialog2Receive" top="calc(100% - 156px)" height="156px" width="100%"></span></div>
