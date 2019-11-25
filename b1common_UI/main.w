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
    <div class="x-panel-bottom2" xid="bottom1" height="48">
       <div component="$UI/system/components/justep/panel/panel" class="x-panel pinfo" xid="infoPanel" bind-visible="showinfo1">
   
       <div component="$UI/system/components/justep/row/row" class="x-row row1" xid="row7" style="border-bottom:1px solid #1ca670;">
   <div class="x-col col1" xid="col4"><div component="$UI/system/components/justep/row/row" class="x-row row1" xid="row1" style="padding-top:0;">
   <div class="x-col x-col-fixed" xid="col1" style="width:auto;margin:0;padding:0;"><div xid="headImgDiv" class="headImgDiv">
   <img alt="" xid="image3" bind-attr-src="picture"></img></div></div>
   <div class="x-col col1" xid="col2"><div component="$UI/system/components/justep/row/row" class="x-row row2" xid="row3">
   <div class="x-col col1" xid="col8"><span bind-text="siji" class="siji"><![CDATA[司机]]></span></div>
   </div>
  <div component="$UI/system/components/justep/row/row" class="x-row row2" xid="row4">
   <div class="x-col col1" xid="col8"><span bind-text="chepai" class="chepai"><![CDATA[车牌]]></span></div></div>
  
   </div>
   <div class="x-col x-col-fixed" xid="col3" style="width:auto;margin:0;padding:0;">
   <div component="$UI/system/components/justep/row/row" class="x-row" xid="row2">
   <div class="x-col x-col-fixed" xid="col5" style="text-align:center;width:auto;margin:0;padding:0;">
   <a bind-attr-href="'sms:'+tel.get()">
   <img src="$UI/b1common/newimages/message.png" xid="image1" style="width:40px;height:40px;margin-right:5px;"></img>
   </a>
   </div>   
   <div class="x-col x-col-fixed" xid="col7" style="text-align:center;width:auto;margin:0;padding:0;">
    <a bind-attr-href="'tel:'+tel.get()">
   <img src="$UI/b1common/newimages/tel.png" xid="image2" style="width:40px;height:40px;margin-right:5px;"></img>
   </a></div></div>
   </div></div>
   <div component="$UI/system/components/justep/row/row" class="x-row row2" xid="row5">
   <div class="x-col" xid="col8"><span bind-text="status" class="status"><![CDATA[等待分配]]></span></div></div>
   </div>
   </div>
   
  <div component="$UI/system/components/justep/row/row" class="x-row row1" xid="row6">
   <div class="x-col x-col-50" xid="col11" style="text-align:center;width:auto;" bind-click="col11Click">
   <a component="$UI/system/components/justep/button/button" class="btn btn-only-label btn-cancle" label="取消" xid="btncancle" 
   style="border-radius:31px;color:#fff;background-color:rgba(174,174,174,0.7);width:50%;">
   <i xid="i2"></i>
   <span xid="span2">取消</span></a></div>
   <div class="x-col x-col-50" xid="col11" style="text-align:center;width:auto;" bind-click="btnzhifu">
   <a component="$UI/system/components/justep/button/button" class="btn  btn-only-label btn-cancle" label="支付" xid="btnzhifu" style="width:50%;border-radius:31px;color:#fff;background-color:#1ca670;">
   <i xid="i2"></i>
   <span xid="span2">支付</span></a></div></div></div>
      <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-lg btn-need" label="我 要 加 油" xid="btnneed" onClick="btnneedClick" bind-visible="showinfo2">
   <i xid="i1"></i><span xid="span1" style="z-index: 999;">我 要 加 油</span></a></div>  
    
  </div>  
  <div class="x-panel-content" xid="content1">
      <div component="$UI/system/components/justep/contents/contents" class="x-contents x-full" active="0" xid="contents1" swipe="false" wrap="false" onActiveChange="contents1ActiveChange">
        
        <div class="x-contents-content" xid="content2">
          <div component="$UI/system/components/justep/windowContainer/windowContainer" class="x-window-container" xid="windowContainer1" src="$UI/b1common/map/commonMap.w" autoLoad="true"></div></div>  
        </div>
    </div><span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog6" src=""></span>
  <span class="winDia2" component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog2" 
  src="$UI/p_common/payCommon.w" status="normal" top="calc(100% - 350px)" height="340px" width="80%" onClose="windowDialog2Close"></span></div>
