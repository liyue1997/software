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

     <img src="$UI/b1common/newimages/notice.png" alt="" xid="image7"  style="z-index: 999; position: absolute; margin-top: 10%; top: -10px; margin-left: 50px; left: 0px; height: 45px; width: 45px;" bind-click="image5Click"></img>
     <img src="$UI/b1common/newimages/msgbg.png" alt="" xid="image8" style="z-index: 99; position: absolute; margin-top:6%; top: 2px; margin-left: 12%; width: 80%; height: 50px;" ></img>
     <img src="$UI/b1common/newimages/closenotice.png" alt="" xid="image6"  style="z-index: 999; position: absolute; margin-top: 7%; top: 10px; margin-left: 84%; height: 25px;" bind-click="image6Click"></img>
     <span xid="span2"                         style="word-break: break-all;z-index: 99; position: absolute; margin-top: 9%; top: 6px; margin-left: 99px; color: white;"><![CDATA[神速加油，加油方便，还免服务费！]]></span>
     
     <img src="" onerror='this.src="./map/middle.jpg";' alt="" xid="image3" style="z-index:999;position:fixed;width:80%;top:25%;left:10%;margin-left:width/2;margin-top:height/2;display:none;"></img>
     <img src="./detele-icon.png" alt="" xid="image4" height="20px" style="width:20px;height:20px;position:absolute;z-index:999;top:20%;left:88%;display:none;" bind-click="image4Click"></img>
     <span xid="span1" style="top:20%;z-index:999;position:absolute;left:35%;display:none;"><![CDATA[3秒后自动关闭...]]></span>
    </div> 
  </div> 
<span class="winDia2" component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog1" forceRefreshOnOpen="false" top="20px" height="auto" width="100%" status="normal" style="top:12px;left:45px;" onReceive="windowDialog1Receive"></span></div>
