<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:mobile" class="window portal-main">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:76px;left:364px;" onLoad="modelLoad" onActive="modelActive" onModelConstruct="modelModelConstruct" onInactive="modelInactive"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="false"
      xid="data" idColumn="team_id" onCustomRefresh="dataCustomRefresh">
      <data xid="default1">
      <!-- [{"id":"1","title":"西瓜组团了！","imgName":"x1.png","pageName":"aboutUs"},
      {"id":"2","title":"香蕉大作战","imgName":"x2.png","pageName":"product"},
      {"id":"3","title":"鞋子拼单拉","imgName":"x3.png","pageName":"cases"},
      {"id":"4","title":"午餐大优惠","imgName":"x4.png","pageName":"promotion"},
      {"id":"5","title":"鸡排大派送","imgName":"x5.png","pageName":"dynamic"},
      {"id":"6","title":"文具也可以","imgName":"x6.png","pageName":"contactUs"}] -->
      </data>
    <column label="team_id" name="team_id" type="String" xid="xid1"></column>
  <column label="team_name" name="team_name" type="String" xid="xid2"></column>
  <column isCalculate="false" label="teampicurl" name="teampicurl" type="String" xid="xid3"></column>
  <column label="pageName" name="pageName" type="String" xid="xid4"></column>
  <column name="shop_address" type="String" xid="xid5"></column>
  <column name="valid_date" type="String" xid="xid6"></column>
  <column name="shop_lon" type="String" xid="xid7"></column>
  <column name="shop_lat" type="String" xid="xid8"></column>
  </div>
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full x-bgImg" bind-click="panel2Click"> 
    <div class="x-panel-top" height="48" style="background-color:transparent;"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar" style="background-color:transparent;padding-top:15px;"> 
        <div class="x-titlebar-left" bind-click="left1Click"> <img src="./img/img_touxiang_default_171.png" xid="image1" style="margin-left:10px;" class="cehua" bind-attr-src=' $model.getValue("userheadpic","./img/img_touxiang_default_171.png")'></img>
          </div>  
        <div class="x-titlebar-title  text-success" style="background-color:transparent;"><a component="$UI/system/components/justep/button/button" class="btn btn-default btn-sm btn-icon-left btn-only-icon shakebtn" xid="shakebtn" icon="linear linear-tablet" style="background-color:transparent;" onClick="shakebtnClick">
   <i xid="i1" class="linear linear-tablet"></i>
   <span xid="span1"></span></a></div>  
        <div class="x-titlebar-right reverse" style="background-color:transparent;"> 
<img src="img/fenxiang.png" xid="image2" bind-click="image2Click" class="share"></img>
  <img src="./img/nav_icon_xiaoxi.png" alt="" xid="image4" class="msg" bind-click="image4Click"></img>
    <i xid="i2" class="tip" bind-css="tip"></i>
  <img src="./img/nav_icon_saoyicao.png" alt="" xid="scannerimg" class="scanner" bind-click="scannerimgClick"></img></div> 
      </div> 
    </div>  
    <div class="x-panel-content"> 
      <ul component="$UI/system/components/justep/list/list" class="x-list x-list-template listdiv"
        xid="list2" data="data"> 
        <li xid="li2" class="licircle">
        	<div bind-click="openPageClick" class="cricle"> 
            <img bind-attr-src="$model.transUrl($object)"
              class="x-img2"/>  
            <h5 class="text-white" bind-text="ref('team_name')" style="padding:0px 0px 0px 0px;margin:0px 0px 0px 0px;"><![CDATA[]]></h5>
          </div>
        </li>
      </ul>
      <img class="centerimg" src="xinxing/x7.png" width="140" bind-click="image5Click" xid="centerimg1" id="centerimg1" style="width:140;"></img>
    <div component="$UI/system/components/justep/panel/panel" class="x-panel infopanel" xid="infopanel" bind-visible="infoshow">
                <div class="x-panel-content" xid="content1">
                
                <div component="$UI/system/components/justep/row/row" class="x-row" xid="row1" style="margin-top:10px;">
   <div class="x-col" xid="col1" style="font-weight:bold;"><span class="ftitle" style="margin-left:10px;" bind-text='$model.data.val("team_name")'><![CDATA[6人成团享9折]]></span></div>
   <div class="x-col x-col-fixed pull-right" xid="col2" style="font-weight:bold;width:auto;">
   <span class="fcontent" xid="span2"><![CDATA[剩余]]></span>
  <span class="fcontentred" xid="span3" bind-css="timecss" bind-text="$model.getLefttime($model.data.val('valid_date'))"><![CDATA[00:25]]></span>
  </div></div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row2">
   <div class="x-col" xid="col4"><span class="fcontent" style="margin-left:11px;" bind-text='$model.data.val("shop_address")'><![CDATA[百果园（六朝路店）]]></span></div>
   <div class="x-col x-col-fixed" xid="col5" style="width:auto;"><span class="fcontent" bind-text='$model.getDistance($model.data.val("shop_lat"),$model.data.val("shop_lon"))'><![CDATA[距您步行500m]]></span></div></div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row3" align="center">
   <div class="x-col" xid="col7"><button class="canyu" style="border-style:none none none none;" bind-click="button1Click">立即参与</button></div>
   </div></div>
   </div>
   </div> 
  <div class="x-panel-bottom" xid="bottom1" height="62" style="background-color:transparent;"><div xid="div1" align="center" bind-click="div1Click" style="background-color:transparent;"><img src="img/btn_fabu.png" xid="image3" style="margin-left:10px;width:60px;height:60px;"></img></div>
  </div></div> 
<span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog1" onReceived="windowDialog1Received" forceRefreshOnOpen="false"></span>
   <div xid="dialog"></div>
   </div>