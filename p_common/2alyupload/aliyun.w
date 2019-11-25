<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:30px;left:420px;height:auto;"/> 
<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1">
   <div class="x-panel-top" xid="top1"><div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar" xid="titleBar1" title="文件上传">
   <div class="x-titlebar-left" xid="left1"><a component="$UI/system/components/justep/button/button" label="" class="btn btn-link btn-only-icon" icon="icon-chevron-left" onClick="{operation:'window.close'}" xid="backBtn">
   <i class="icon-chevron-left" xid="i1"></i>
   <span xid="span1"></span></a></div>
   <div class="x-titlebar-title" xid="title1">文件上传</div>
   <div class="x-titlebar-right reverse" xid="right1"></div></div></div>
   <div class="x-panel-content" xid="content1"><div id="container" class="btnMain" xid="div2">
   <a id="selectfiles" href="javascript:void(0);" class="btn btnaddFile btn-icon-left" xid="a2" style="background-color:white;"><img src="./img/plus.png" alt="" xid="image1"></img></a>
   <a id="postfiles" href="javascript:void(0);" class="btn btnuploadFile btn-icon-left" xid="a3"><i class="e-commerce e-commerce-zhiding"></i>开始上传</a>
  </div>
  <div component="$UI/system/components/justep/row/row" class="x-row fileRow" xid="row1">
   <div class="x-col x-col-fixed" xid="col1" style="width:5%; display:none;"></div>
   <div class="x-col" xid="col2" style="width:90%;">
    <div id="ossfile" xid="div3">你的浏览器不支持flash,Silverlight或者HTML5！</div></div> 
   <div class="x-col x-col-fixed" xid="col3" style="width:5%;"></div></div>
   <pre id="console" ></pre></div>
   <div class="x-panel-bottom" xid="bottom1">
   <a id="postfiles" href="#" class="btn btnCancel" bind-click="a1Click" xid="a1">取消</a></div></div>

<div xid="div1" class="x-panel-bottom" style="height:48;"></div><script type="text/javascript" src="lib/crypto1/crypto/crypto.js"></script>
<script type="text/javascript" src="lib/crypto1/hmac/hmac.js"></script>
<script type="text/javascript" src="lib/crypto1/sha1/sha1.js"></script>
<script type="text/javascript" src="lib/base64.js"></script>
<script type="text/javascript" src="lib/plupload-2.1.2/js/plupload.full.min.js"></script>
<script type="text/javascript" src="./upload.js"></script>

   
   <span component="$UI/system/components/justep/windowReceiver/windowReceiver" xid="windowReceiver1" style="top:197px;left:10px;" onReceive="windowReceiver1Receive"></span>
  </div>