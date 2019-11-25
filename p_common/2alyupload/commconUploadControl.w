<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:285px;left:338px;" onLoad="modelLoad">
  </div> 
<span component="$UI/system/components/justep/windowReceiver/windowReceiver" xid="windowReceiver1" style="top:314px;left:254px;" onReceive="windowReceiver1Receive"></span>
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full   ffff" xid="panel1" style="width:100%;height:100%;">
   <div class="x-panel-content" xid="content1">
    <div component="$UI/system/components/justep/row/row" class="x-row" xid="row6" style="height:15%;">
     <div class="x-col" xid="col2">
      <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="富媒体上传" xid="button3" style="background-color:#000000;width:100%;border-color:#000000 #000000 #000000 #000000;">
       <i xid="i3"></i>
       <span xid="span9">富媒体上传</span></a> </div> </div> 
    <div component="$UI/system/components/justep/row/row" class="x-row" xid="row5" style="padding:0% 0% 0% 0%;" bind-visible="navigator.camera"></div>
    <div component="$UI/system/components/justep/row/row" class="x-row" xid="row8" bind-visible="navigator.camera">
     <div class="x-col x-col-fixed" xid="col13" style="width:auto;"></div></div> 
    <div component="$UI/system/components/justep/row/row" class="x-row" xid="row1" style="padding:0% 0% 0% 0%;">
     <div class="x-col" xid="col4">
      <span xid="span8" style="color:#FFFFFF;">3333</span></div> </div> 
    <div component="$UI/system/components/justep/row/row" class="x-row" xid="row3" style="border-color:#FFFFFF #FFFFFF #FFFFFF #FFFFFF;margin:0% 0% 0% 0%;padding:1% 1% 1% 1%;border-style:ridge ridge ridge ridge;border-width:thin thin thin thin;">
     <div class="x-col" xid="col5" style="margin:0% 0% 0% 0%;padding:0% 0% 0% 0%;">
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row2" style="border-color:#FFFFFF #FFFFFF #FFFFFF #FFFFFF;margin:0% 0% 0% 0%;padding:0% 0% 0% 0%;">
       <div class="x-col x-col-center" xid="col3" style="padding:0% 0% 0% 0%;margin:0% 0% 0% 0%;">
        <div id="ossfile" xid="div1">你的浏览器不支持flash,Silverlight或者HTML5！</div></div> </div> 
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row4" style="margin:0% 0% 0% 0%;padding:0% 0% 0% 0%;">
       <div class="x-col x-col-center" xid="col8" style="margin:0% 0% 0% 0%;padding:0% 0% 0% 0%;">
        <a id="selectfiles" href="javascript:void(0);" class="btn" xid="a1">选择文件</a>
        <a id="postfiles" href="javascript:void(0);" class="btn" xid="a2">开始上传</a></div> </div> </div> 
     <pre id="console" xid="default2"></pre></div> </div> 
   <div class="x-panel-bottom" xid="bottom1">
    <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="退出" xid="button2" style="width:100%;background-color:#FF0000;" onClick="button2Click">
     <i xid="i2"></i>
     <span xid="span2">退出</span></a> </div> </div><script type="text/javascript" src="lib/crypto1/crypto/crypto.js"></script>
<script type="text/javascript" src="lib/crypto1/hmac/hmac.js"></script>
<script type="text/javascript" src="lib/crypto1/sha1/sha1.js"></script>
<script type="text/javascript" src="lib/base64.js"></script>
<script type="text/javascript" src="lib/plupload-2.1.2/js/plupload.full.min.js"></script>
<script type="text/javascript" src="upload.js"></script>
  
  </div>