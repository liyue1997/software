<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:238px;left:432px;height:auto;"/> 
<span component="$UI/system/components/justep/windowReceiver/windowReceiver" xid="windowReceiver1" onReceive="windowReceiver1Receive"></span>
  <img src="./image/1.jpg" alt="" xid="image1" style="width:100%;height:50%;top:0%;left:0%;display:none;"></img>
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1" style="display:none;">
   <div class="x-panel-top" xid="top1"></div>
   <div class="x-panel-content" xid="content1"><a component="$UI/system/components/justep/button/button" class="btn btn-default" label="分享到QQ" xid="button2" style="width:100%;height:10%;margin-top:1%;margin-bottom:1%;" onClick="button2Click">
   <i xid="i2"></i>
   <span xid="span2">分享到QQ</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="分享到微信" xid="button3" style="width:100%;height:10%;margin-top:1%;margin-bottom:1%;" onClick="button3Click">
   <i xid="i3"></i>
   <span xid="span3">分享到微信</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="分享到微博" xid="button4" style="width:100%;height:10%;margin-top:1%;margin-bottom:1%;">
   <i xid="i4"></i>
   <span xid="span4">分享到微博</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" xid="button5" style="width:100%;height:10%;margin-top:1%;margin-bottom:1%;background-color:#800040;color:#FFFFFF;" label="关闭" onClick="button5Click">
   <i xid="i5"></i>
   <span xid="span5">关闭</span></a></div>
   <div class="x-panel-bottom" xid="bottom1"></div></div>
  <div component="$UI/system/components/justep/row/row" class="x-row shareRow" xid="shareRow" style="text-align:center;">
   <div class="x-col" xid="col67" bind-click="col67Click">
    <div component="$UI/system/components/justep/row/row" class="x-row" xid="row27">
     <div class="x-col" xid="col82">
      <img src="$UI/p_common/img/QQ.png" alt="" xid="image8" style="width:40px;"></img></div> </div> 
    <div component="$UI/system/components/justep/row/row" class="x-row" xid="row28">
     <div class="x-col" xid="col85">
      <span xid="span60">分享到QQ</span></div> </div> </div> 
   <div class="x-col" xid="col73" bind-click="col73Click">
    <div component="$UI/system/components/justep/row/row" class="x-row" xid="row30">
     <div class="x-col" xid="col89">
      <img src="$UI/p_common/img/wx.png" alt="" xid="image9" style="width:40px;"></img></div> </div> 
    <div component="$UI/system/components/justep/row/row" class="x-row" xid="row29">
     <div class="x-col" xid="col88">
      <span xid="span61">分享到微信</span></div> </div> </div> 
   <div class="x-col" xid="col78" style="width:0px;" bind-visible="false">
    <div component="$UI/system/components/justep/row/row" class="x-row" xid="row32">
     <div class="x-col" xid="col91">
      <img src="$UI/p_common/img/sina.png" alt="" xid="image10" style="width:40px;"></img></div> </div> 
    <div component="$UI/system/components/justep/row/row" class="x-row" xid="row31">
     <div class="x-col" xid="col90">
      <span xid="span62">分享到微博</span></div> </div> </div> </div>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" xid="button1" label="取消" onClick="button5Click" style="width:100%">
   <i xid="i1"></i>
   <span xid="span9">取消</span></a></div>