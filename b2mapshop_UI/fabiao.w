<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:12px;left:84px;" onLoad="modelLoad">
   <div component="$UI/system/components/justep/data/data" xid="newsData"  idColumn="shop_id" autoLoad="false"> 
      <data xid="default1">
  <!-- 
      [{&quot;shopId&quot;:&quot;1&quot;,&quot;shopName&quot;:&quot;美食1&quot;,&quot;shopFullname&quot;:&quot;11&quot;,&quot;shopPhone&quot;:&quot;13913929633&quot;,&quot;shopAddress&quot;:&quot;4.9分&quot;,&quot;shopRoute&quot;:&quot;好吃的&quot;,&quot;shopImg&quot;:&quot;http://pet-1252596634.cos.ap-chengdu.myqcloud.com/od201906170055.jpg&quot;}
      ,{&quot;shopId&quot;:&quot;2&quot;,&quot;shopName&quot;:&quot;美食2&quot;,&quot;shopFullname&quot;:&quot;12&quot;,&quot;shopPhone&quot;:&quot;13913929633&quot;,&quot;shopAddress&quot;:&quot;南京南&quot;,&quot;shopRoute&quot;:&quot;好吃的&quot;,&quot;shopImg&quot;:&quot;http://pet-1252596634.cos.ap-chengdu.myqcloud.com/od201906170059.jpg&quot;}]
     -->
      </data>
  <column label="shopId" name="shopId" type="String" xid="xid1"></column>
  <column label="商户简称" name="shopName" type="String" xid="xid2"></column>
  <column name="shopFullname" type="String" xid="xid3"></column>
  <column name="shopPhone" type="String" xid="xid4"></column>
  <column name="shopAddress" type="String" xid="xid5"></column>
  <column name="shopScore" type="String" xid="xid6"></column>
  <column name="shop_img" type="String" xid="xid7"></column>
  <column name="shopLon" type="String" xid="xid8"></column>
  <column name="shopLat" type="String" xid="xid9"></column>
  <column name="shopTags" type="String" xid="xid9"></column>
  <column name="shopAverage" type="String" xid="xid10"></column>
  
  </div>
  </div> 
<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1" style="background-color:#252330;">
   <div class="x-panel-top" xid="top1"><div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar" xid="titleBar1">
   <div class="x-titlebar-left" xid="left1">
    <a component="$UI/system/components/justep/button/button" label="" class="btn btn-link btn-only-icon" icon="img:$UI/b2mapshop_UI/img/nav_icon_fanhui.png" onClick="{operation:'window.close'}" xid="backBtn">
     <img src="$UI/b2mapshop_UI/img/nav_icon_fanhui.png" xid="image3" style="width:20px;"></img>
     <span xid="span1"></span></a> </div> 
   <div class="x-titlebar-title" xid="title1">评价</div>
   <div class="x-titlebar-right reverse" xid="right1" style="width:74px;" bind-click="right1Click"><h4 xid="h41" style="color:#FFFFFF;font-size:17px;" bind-visible="fabiao.get()"><![CDATA[发表]]></h4></div></div></div>
   <div class="x-panel-content" xid="content1"><div component="$UI/system/components/justep/row/row" class="x-row" xid="row1" style="padding-top:16px;padding-right:10px;padding-left:10px;">
   <div class="x-col x-col-20" xid="col1"><img src="./img/img_shangdian.png" alt="" xid="image1" class="shopimg" bind-attr-src=' $model.newsData.val("shop_img")'></img></div>
   <div class="x-col" xid="col2"><div component="$UI/system/components/justep/row/row" class="x-row" xid="row4">
   <div class="x-col" xid="col10"><h4 xid="h43" class="title" bind-text=' $model.newsData.val("shopFullname")'><![CDATA[百果园]]></h4></div>
   </div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row5">
   <div class="x-col" xid="col13"><img src="./xinxing/xx1.png" alt="" xid="image8" class="star" style="margin-left:10px;" bind-attr-src='$model.getscore(1)'></img>
  <img src="./xinxing/xx1.png" alt="" xid="image9" class="star" dir="rtl" bind-attr-src="$model.getscore(2)"></img>
  <img src="./xinxing/xx1.png" alt="" xid="image10" class="star" bind-attr-src="$model.getscore(3)"></img>
  <img src="./xinxing/xx1.png" alt="" xid="image11" class="star" bind-attr-src="$model.getscore(4)"></img>
  <img src="./xinxing/xx3.png" alt="" xid="image12" class="star" bind-attr-src="$model.getscore(5)"></img>
  <span xid="span3" bind-text="shopscore.get()+'分'"><![CDATA[4分]]></span><span xid="span6" style="float:right;" bind-text="'￥'+ $model.newsData.val(&quot;shopAverage&quot;)+'/人'"><![CDATA[￥26/人]]></span></div>
   </div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row6">
   <div class="x-col" xid="col16"><span xid="span5" style="margin-left:10px;" bind-text=' $model.newsData.val("shopTags")'><![CDATA[水果]]></span>
  <span xid="span7" style="float:right;" bind-visible="false"><![CDATA[100米]]></span></div>
   </div></div>
   </div>
  <div xid="div1" style="margin-top:52px;"><div component="$UI/system/components/justep/row/row" class="x-row" xid="row7">
   <div class="x-col" xid="col21"><h4 xid="h44" style="text-align:center;color:#FFFFFF;font-size:17px;" class="servicetitle"><![CDATA[请对本次服务进行评价]]></h4></div></div><div component="$UI/system/components/justep/row/row" class="x-row" xid="row8" style="margin-top:25px;">
   <div class="x-col" xid="col22" style="text-align:center;">
  <img src="./xinxing/xx3.png" alt="" xid="imgxx1" class="score" bind-click="image13Click" data-index="0" bind-attr-src="$model.getscore1(1)"></img>
  <img src="./xinxing/xx3.png" alt="" xid="imgxx2" class="score" bind-click="image13Click" data-index="1" bind-attr-src="$model.getscore1(2)"></img>
  <img src="./xinxing/xx3.png" alt="" xid="imgxx3" class="score" bind-click="image13Click" data-index="2" bind-attr-src="$model.getscore1(3)"></img>
  <img src="./xinxing/xx3.png" alt="" xid="imgxx4" class="score" bind-click="image13Click" data-index="3" bind-attr-src="$model.getscore1(4)"></img>
  <img src="./xinxing/xx3.png" alt="" xid="imgxx5" class="score" style="margin-right:0px;" bind-click="image13Click" data-index="4" bind-attr-src="$model.getscore1(5)"></img>
  </div>
   </div></div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row2">
   <div class="x-col" xid="col4" style="text-align:center;"><label id="getIDByXID" xid="lblfenshu" style="color:#FFFFFF;" bind-text='fen.get()+"分"'><![CDATA[]]></label></div>
   </div></div>
   <div class="x-panel-bottom" xid="bottom1"></div></div></div>