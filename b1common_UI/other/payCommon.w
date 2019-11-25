<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:13px;left:142px;height:auto;" onLoad="modelLoad" onActive="modelActive"/> 
<img src="$UI/lxmholiday/common/image/2.jpg" alt="" xid="image1" style="display:none;"></img>
  <span component="$UI/system/components/justep/windowReceiver/windowReceiver" xid="windowReceiver1" onReceive="windowReceiver1Receive" style="top:10px;left:42px;"></span><div component="$UI/system/components/justep/panel/panel" class="x-panel x-full paymentPanel x-has-iosstatusbar" xid="paymentPanel">
   <div class="x-panel-top" xid="top1"><div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar" xid="titleBar1">
   <div class="x-titlebar-left" xid="left1"><a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon" label="button" xid="backBtn" icon="icon-chevron-left" onClick="backBtnClick" style="color:#333333;">
   <i xid="i6" class="icon-chevron-left"></i>
   <span xid="span15"></span></a></div>
   <div class="x-titlebar-title" xid="title1" style="color:#333333;">支付窗口</div>
   <div class="x-titlebar-right reverse" xid="right1"></div></div></div>
   <div class="x-panel-content payPanelContent" xid="content1"><div component="$UI/system/components/justep/row/row" class="x-row" xid="zfbPayRow">
   <div class="x-col x-col-fixed x-col-center" xid="col2" style="width:auto;">
    <img src="$UI/rental/img/fluck-zfbpay.png" alt="" xid="image2" style="width:30px;"></img></div> 
   <div class="x-col x-col-center" xid="col3">
    <span xid="span5" class="pull-left">支付宝支付</span></div> 
   <div class="x-col x-col-fixed x-col-center" xid="col11" style="width:auto;">
    <span component="$UI/system/components/justep/button/radio" class="x-checkbox x-radio choose" xid="radZfbPay" name="1" checked="true"></span></div> </div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="wxPayRow" bind-visible="false">
   <div class="x-col x-col-fixed x-col-center" xid="col6" style="width:auto;">
    <img src="$UI/rental/img/fluck-wxpay.png" alt="" xid="image3" style="width:30px;"></img></div> 
   <div class="x-col x-col-center" xid="col15">
    <span xid="span9" class="pull-left"><![CDATA[微信支付]]></span></div> 
   <div class="x-col x-col-fixed x-col-center" xid="col14" style="width:auto;">
    <span component="$UI/system/components/justep/button/radio" class="x-radio" xid="radWxPay" name="1"></span></div> </div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="unionPayRow" bind-visible="false">
   <div class="x-col x-col-fixed x-col-center" xid="col9" style="width:auto;">
    <img src="$UI/rental/img/fluck-unionpay.png" alt="" xid="image4" style="width:30px;"></img></div> 
   <div class="x-col x-col-center" xid="col17">
    <span xid="span10" class="pull-left"><![CDATA[支付宝网页支付]]></span></div> 
   <div class="x-col x-col-fixed x-col-center" xid="col16" style="width:auto;">
    <span component="$UI/system/components/justep/button/radio" class="x-radio" xid="radUnionPay" name="1"></span></div> </div>
  </div>
   <div class="x-panel-bottom" xid="bottom2"><div component="$UI/system/components/justep/row/row" class="x-row prcNameRow" xid="prcNameRow" style="display:none;">
   <div class="x-col" xid="col4" style="width:0px;">
    <span xid="span7"></span>
  <input component="$UI/system/components/justep/input/input" class="form-control" xid="input1"></input></div> </div>
  <div component="$UI/system/components/justep/row/row" class="x-row moneyRow" xid="moneyRow">
   <div class="x-col x-col-center" xid="col8" style="text-align:center;">
    <span xid="span11" style="color:#FF5979;"><![CDATA[支付:￥6元]]></span></div> 
   <div class="x-col x-col-center" xid="col10">
    <a component="$UI/system/components/justep/button/button" class="btn btn-default" xid="btnPay" label="付款" onClick="btnPayClick">
     <i xid="i5"></i>
     <span xid="span8">付款</span></a> </div> </div></div></div><div component="$UI/system/components/justep/row/row" class="x-row" xid="row1" style="display:none">
   <div class="x-col" xid="col1" style="padding:0px 0px 0px 0px;"><span xid="span6" style="color:#06c1ae;font-size:x-small;"><![CDATA[fsdfds]]></span></div>
   </div><a component="$UI/system/components/justep/button/button" class="btn btn-default" label="微信支付" xid="button1" onClick="button1Click" style="display:none">
   <i xid="i1"></i>
   <span xid="span1">微信支付</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="支付宝支付" xid="button2" style="display:none" onClick="button2Click">
   <i xid="i2"></i>
   <span xid="span2">支付宝支付</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="银联支付" xid="button3" style="display:none" onClick="button3Click">
   <i xid="i3"></i>
   <span xid="span3">银联支付</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="放弃" xid="button4" style="display:none" onClick="button4Click">
   <i xid="i4"></i>
   <span xid="span4">放弃</span></a>
  </div>