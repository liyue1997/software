<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:13px;left:142px;height:auto;" onLoad="modelLoad" onActive="modelActive"/> 
<img src="img/icon2.jpg" alt="" xid="image1" style="display:none;"></img>
  <span component="$UI/system/components/justep/windowReceiver/windowReceiver" xid="windowReceiver1" onReceive="windowReceiver1Receive" style="top:10px;left:42px;"></span><div component="$UI/system/components/justep/panel/panel" class="x-panel x-full paymentPanel x-has-iosstatusbar" xid="paymentPanel">
   <div class="x-panel-content payPanelContent" xid="content1"><div component="$UI/system/components/justep/row/row" class="x-row closerow" xid="row14">
   <div class="x-col" xid="col46" style="padding:0;margin:0;"><a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon" label="button" xid="backBtn" icon="icon-android-close" onClick="backBtnClick" style="margin:0;color:#333333;padding:0;margin-left:5px;">
     <i xid="i6" class="icon-android-close"></i>
     <span xid="span15"></span></a></div>
   </div><div component="$UI/system/components/justep/row/row" class="x-row msgrow" xid="row2">
   
   <div class="x-col" xid="col33" style="margin:0;padding:0;"><div component="$UI/system/components/justep/row/row" class="x-row" xid="row9" style="margin:0;padding:0;height:30px;">
   <div class="x-col" xid="col34" style="height:30px;margin:0;padding:0;"><span xid="span21" style="font-size:medium;float:right;margin:0;padding:0;"><![CDATA[需支付]]></span></div>
   </div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row10" style="margin:0;padding:0;height:30px;">
   <div class="x-col" xid="col37" style="height:30px;marign:0;padding:0;"><span xid="span22" style="margin:0;padding:0;float:right;color:#1ca670;font-size:large;"><![CDATA[司机]]></span></div>
   </div></div><div class="x-col" xid="col40"><div component="$UI/system/components/justep/row/row" class="x-row" xid="row11" style="margin:0;padding:0;height:30px;">
   <div class="x-col" xid="col41" style="height:30px;margin:0;padding:0;">
    <span xid="span24" style="font-size:large;float:right;margin:0;padding:0;" bind-visible="false">需支付</span></div> </div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row12" style="margin:0;;height:30px;">
   <div class="x-col" xid="col42" style="height:30px;marign:0;padding:0;">
    <span xid="span23" style="font-size:medium;bottom:0;margin-left:5px;"><![CDATA[油费]]></span></div> </div></div><div class="x-col x-col-center" xid="col8" style="text-align:center;">
    <span xid="span11" style="font-size:x-large;font-weight:normal;"><![CDATA[￥6]]></span></div>
  </div><div component="$UI/system/components/justep/row/row" class="x-row zfbPayRow" xid="zfbPayRow" bind-visible="zfbvisible">
    
    
  <div class="x-col x-col-fixed x-col-center" xid="col49" style="width:auto;">
   <img src="$UI/p_common/img/fluck-zfbpay.png" alt="" xid="image9" style="width:30px;"></img></div><div class="x-col x-col-center" xid="col3">
    <span xid="span5" class="pull-left">支付宝支付</span></div><div class="x-col x-col-fixed x-col-center" xid="col11" style="width:auto;">
    <span component="$UI/system/components/justep/button/radio" class="x-checkbox x-radio choose" xid="radZfbPay" name="1" checked="true"></span></div></div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="wxPayRow" bind-visible="weixinvisible" style="wxPayRow">
   <div class="x-col x-col-fixed x-col-center" xid="col6" style="width:auto;">
    <img src="img/fluck-wxpay.png" alt="" xid="image3" style="width:30px;"></img></div> 
   <div class="x-col x-col-center" xid="col15">
    <span xid="span9" class="pull-left"><![CDATA[微信支付]]></span></div> 
   <div class="x-col x-col-fixed x-col-center" xid="col14" style="width:auto;">
    <span component="$UI/system/components/justep/button/radio" class="x-radio" xid="radWxPay" name="1"></span></div> </div>
  <div component="$UI/system/components/justep/row/row" class="x-row unionPayRow" xid="unionPayRow" bind-visible="zfbwapvisible">
   <div class="x-col x-col-fixed x-col-center" xid="col9" style="width:auto;">
    <img src="img/fluck-unionpay.png" alt="" xid="image4" style="width:30px;"></img></div> 
   <div class="x-col x-col-center" xid="col17">
    <span xid="span10" class="pull-left"><![CDATA[支付宝网页支付]]></span></div> 
   <div class="x-col x-col-fixed x-col-center" xid="col16" style="width:auto;">
    <span component="$UI/system/components/justep/button/radio" class="x-radio" xid="radUnionPay" name="1"></span></div> </div>
  <div component="$UI/system/components/justep/row/row" class="x-row wapwxPayRow" xid="wapwxPayRow" bind-visible="weixinwapvisible">
   <div class="x-col x-col-fixed x-col-center" xid="col12" style="width:auto;">
    <img src="img/fluck-wxpay.png" alt="" xid="image5" style="width:30px;"></img></div> 
   <div class="x-col x-col-center" xid="col5">
    <span xid="span12" class="pull-left"><![CDATA[wap微信支付]]></span></div> 
   <div class="x-col x-col-fixed x-col-center" xid="col7" style="width:auto;">
    <span component="$UI/system/components/justep/button/radio" class="x-radio" xid="radwapWxPay" name="1"></span></div> </div>
  <div component="$UI/system/components/justep/row/row" class="x-row prcNameRow" xid="prcNameRow" style="display:none;">
   <div class="x-col" xid="col4" style="width:0px;">
    <span xid="span7"></span>
    <input component="$UI/system/components/justep/input/input" class="form-control" xid="input1"></input></div> </div>
  <div component="$UI/system/components/justep/row/row" class="x-row moneyRow" xid="moneyRow">
    
   <div class="x-col x-col-center" xid="col10">
    <a component="$UI/system/components/justep/button/button" class="btn btn-default" xid="btnPay" label="确认支付" onClick="btnPayClick">
     <i xid="i5"></i>
     <span xid="span8">确认支付</span></a> </div> </div>
  </div>
   </div><div component="$UI/system/components/justep/row/row" class="x-row" xid="row1" style="display:none">
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