<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;"
  xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:100px;left:31px;"
    onActive="modelActive" onLoad="modelLoad"  onunLoad="modelUnLoad" onInactive="modelInactive"> 
     <div component="$UI/system/components/justep/data/data" xid="newsData"  onCustomRefresh="dataCustomRefresh"
      idColumn="shop_id" autoLoad="false"> 
      <data xid="default1">
  <!-- 
      [{&quot;shopId&quot;:&quot;1&quot;,&quot;shopName&quot;:&quot;美食1&quot;,&quot;shopFullname&quot;:&quot;11&quot;,&quot;shopPhone&quot;:&quot;13913929633&quot;,&quot;shopAddress&quot;:&quot;4.9分&quot;,&quot;shopRoute&quot;:&quot;好吃的&quot;,&quot;shopImg&quot;:&quot;http://pet-1252596634.cos.ap-chengdu.myqcloud.com/od201906170055.jpg&quot;}
      ,{&quot;shopId&quot;:&quot;2&quot;,&quot;shopName&quot;:&quot;美食2&quot;,&quot;shopFullname&quot;:&quot;12&quot;,&quot;shopPhone&quot;:&quot;13913929633&quot;,&quot;shopAddress&quot;:&quot;南京南&quot;,&quot;shopRoute&quot;:&quot;好吃的&quot;,&quot;shopImg&quot;:&quot;http://pet-1252596634.cos.ap-chengdu.myqcloud.com/od201906170059.jpg&quot;}]
     -->
      </data>
  <column label="shopId" name="shop_id" type="String" xid="xid1"></column>
  <column label="商户简称" name="shop_name" type="String" xid="xid2"></column>
  <column name="shop_fullname" type="String" xid="xid3"></column>
  <column name="shop_phone" type="String" xid="xid4"></column>
  <column name="shop_address" type="String" xid="xid5"></column>
  <column name="shop_score" type="String" xid="xid6"></column>
  <column name="shop_img" type="String" xid="xid7"></column>
  <column name="shop_lon" type="String" xid="xid8"></column>
  <column name="shop_lat" type="String" xid="xid9"></column>
  <column name="shop_average" type="String" xid="xid10"></column>
  <column name="shopTags" type="String" xid="xid14"></column></div>
  
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="conditiondata" idColumn="id"><column label="id" name="id" type="String" xid="xid11"></column>
  <column label="筛选条件名" name="fName" type="String" xid="xid12"></column>
  <column label="状态" name="fState" type="Integer" xid="xid13"></column>
  <data xid="default2">[{&quot;id&quot;:&quot;1&quot;,&quot;fName&quot;:&quot;附近&quot;,&quot;fState&quot;:1},{&quot;id&quot;:&quot;2&quot;,&quot;fName&quot;:&quot;500米&quot;,&quot;fState&quot;:0},{&quot;id&quot;:&quot;3&quot;,&quot;fName&quot;:&quot;1千米&quot;,&quot;fState&quot;:0},{&quot;id&quot;:&quot;4&quot;,&quot;fName&quot;:&quot;3千米&quot;,&quot;fState&quot;:0},{&quot;id&quot;:&quot;5&quot;,&quot;fName&quot;:&quot;5千米&quot;,&quot;fState&quot;:0}]</data></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="conditiondata2" idColumn="id">
   <column label="id" name="id" type="String" xid="column3"></column>
   <column label="筛选条件名" name="fName" type="String" xid="column1"></column>
   <column label="状态" name="fState" type="Integer" xid="column2"></column>
   <data xid="default3">[{&quot;id&quot;:&quot;1&quot;,&quot;fName&quot;:&quot;全部分类&quot;,&quot;fState&quot;:1},{&quot;id&quot;:&quot;2&quot;,&quot;fName&quot;:&quot;小吃快餐&quot;,&quot;fState&quot;:0},{&quot;id&quot;:&quot;3&quot;,&quot;fName&quot;:&quot;自助餐&quot;,&quot;fState&quot;:0},{&quot;id&quot;:&quot;4&quot;,&quot;fName&quot;:&quot;火锅&quot;,&quot;fState&quot;:0},{&quot;id&quot;:&quot;5&quot;,&quot;fName&quot;:&quot;烧烤&quot;,&quot;fState&quot;:0},{&quot;id&quot;:&quot;6&quot;,&quot;fName&quot;:&quot;水果生鲜&quot;,&quot;fState&quot;:0},{&quot;id&quot;:&quot;7&quot;,&quot;fName&quot;:&quot;面包甜点&quot;,&quot;fState&quot;:0},{&quot;id&quot;:&quot;8&quot;,&quot;fName&quot;:&quot;人气餐厅&quot;,&quot;fState&quot;:0},{&quot;id&quot;:&quot;9&quot;,&quot;fName&quot;:&quot;其他&quot;,&quot;fState&quot;:0}]</data></div></div>  
  <div component="$UI/system/components/justep/popOver/popOver" class="x-popOver" direction="left-bottom" xid="popOver1" anchor="col9" opacity="0.7" dismissible="true" position="center">
   <div class="x-popOver-overlay" xid="div3"></div>
   <div class="x-popOver-content sorting" xid="div4">
    <div component="$UI/system/components/justep/list/list" class="x-list" xid="list1" data="conditiondata" dataItemAlias="conditionRow" bind-click="list1Click">
     <ul class="x-list-template" xid="listTemplateUl1">
      <li xid="li1" bind-css="{'current':conditionRow.val('fState')==1}" class="list-group-item">
       <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-xs btn-only-icon pull-right liBtn" label="button" icon="icon-checkmark" xid="button1">
        <i xid="i4" class="icon-checkmark text-danger"></i>
        <span xid="span29"></span></a> 
       <span xid="span7" bind-text='val("fName")'></span></li> </ul> </div> </div> </div>
       <div component="$UI/system/components/justep/popOver/popOver" class="x-popOver" direction="left-bottom" xid="popOver2" anchor="col7" opacity="0.7" dismissible="true" position="center">
   <div class="x-popOver-overlay" xid="div5"></div>
   <div class="x-popOver-content sorting2" xid="div6">
    <div component="$UI/system/components/justep/list/list" class="x-list" xid="list2" data="conditiondata2" dataItemAlias="condition2Row">
     <ul class="x-list-template" xid="listTemplateUl2">
      <li xid="li2" bind-css="{'current':condition2Row.val('fState')==1}" class="list-group-item">
       <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-xs btn-only-icon pull-right liBtn" label="button" icon="icon-checkmark" xid="button3">
        <i xid="i5" class="icon-checkmark text-danger"></i>
        <span xid="span29"></span></a> 
       <span xid="span9" bind-text='val("fName")'></span></li> </ul> </div> </div> </div>
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panelMain">
      
    
  <div class="x-panel-top" xid="top1" height="68"><div xid="div1" class="divtop" style="width:100%;height:100%;background-color:#252330;"><div component="$UI/system/components/justep/row/row" class="x-row" xid="row2">
   <div class="x-col x-col-10" xid="col3" style="text-align:center;" bind-click="col3Click"><img src="./img/nav_icon_fanhui.png" alt="" xid="image1" class="imgback"></img></div>
   <div class="x-col" xid="col5" style="text-align:center;"><input component="$UI/system/components/justep/input/input" class="search" xid="inputSearch" bind-keydown="input5Keydown"></input></div>
   <div class="x-col x-col-10" xid="col6" style="text-align:center;"><img src="./img/nav_icon_xiaoxi.png" alt="" xid="image2" class="imgmsg" bind-visible="false"></img></div></div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row6" bind-visible="false">
   <div class="x-col" xid="col7" style="text-align:center;" bind-click="col7Click"><span xid="span2" class="span2"><![CDATA[全部]]></span>
  <img src="./img/icon_xiala.png" alt="" xid="image3" class="down"></img></div>
   <div class="x-col" xid="col9" style="text-align:center;" bind-click="col9Click"><span xid="span4" class="span4"><![CDATA[距离]]></span>
  <img src="./img/icon_xiala.png" alt="" xid="image4" class="down"></img></div>
   <div class="x-col" xid="col10" style="text-align:center;"><span xid="span5" class="span5"><![CDATA[筛选]]></span>
  <img src="./img/icon_xiala.png" alt="" xid="image5" class="down"></img></div></div>
  </div></div>
      <div class="x-panel-content" xid="content3">
      <div xid="searchdiv"><button xid="button5" class="searchhere" bind-click="button5Click"></button></div>
      <div xid="baiduMap" style="height:100%;width:100%;"></div> 
      </div>
  <div class="x-panel-bottom2" xid="bottom1" height="48">
       <div component="$UI/system/components/justep/panel/panel" class="x-panel pinfo" xid="infoPanel" bind-visible="showinfo1">
   
       <div component="$UI/system/components/justep/row/row" class="x-row row1" xid="row1" style="padding-top:0;">
   <div class="x-col x-col-fixed  col1" xid="col1" style="width:auto;margin:0;padding:8px 5px 8px 5px;"><div xid="headImgDiv" class="headImgDiv">
   <img alt="" xid="picture" bind-attr-src='$model.newsData.val("shop_img")' width="60" style="width:60;"></img></div></div>
   <div class="x-col" xid="col2"><div component="$UI/system/components/justep/row/row" class="x-row row2" xid="row3">
   <div class="x-col col1" xid="col8" style="margin-top:10px;"><span bind-text=' $model.newsData.val("shop_name")' class="title"><![CDATA[鱼无双(九都荟店)]]></span>
  <img src="./img/icon_xiangqing.png" alt="" xid="image11" style="float:right;" bind-click="button2Click" class="btndetail"></img></div>
   </div>
  
  
   
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row7">
   <div class="x-col" xid="colcontent"><div component="$UI/system/components/justep/row/row" class="x-row row2" xid="row4" style="margin-top:8px;">
   <div class="x-col col1" xid="col8">
  <span bind-text='"￥"+$model.newsData.val("shop_average")+"/人"' class="desc" xid="span1" style="float:right;"><![CDATA[￥69/人]]></span>
  <div xid="div2" style="vertical-align: middle;"><img src="./img/icon_pinfeng1_big.png" alt="" xid="image6" class="star" bind-attr-src=' $model.getscore(1, $model.newsData.val("shop_score")*1.0)'></img>
  <img src="./img/icon_pinfeng1_big.png" alt="" xid="image7" class="star" bind-attr-src='$model.getscore(2, $model.newsData.val("shop_score")*1.0)'></img>
  <img src="./img/icon_pinfeng1_big.png" alt="" xid="image8" class="star" bind-attr-src='$model.getscore(3, $model.newsData.val("shop_score")*1.0)'></img>
  <img src="./img/icon_pinfeng1_big.png" alt="" xid="image9" class="star" bind-attr-src='$model.getscore(4, $model.newsData.val("shop_score")*1.0)'></img>
  <img src="./img/icon_pinfeng22_big.png" alt="" xid="image10" class="star" bind-attr-src='$model.getscore(5, $model.newsData.val("shop_score")*1.0)'></img>
  <span bind-text=' $model.newsData.val("shop_score")+"分"' class="desc" xid="span6" style="vertical-align: middle;"><![CDATA[4.9分]]></span></div></div></div><div component="$UI/system/components/justep/row/row" class="x-row row2" xid="row5" style="margin-top:8px;">
   
  <div class="x-col" xid="col4">
   <span bind-text=' $model.newsData.val("shop_address")' class="detail shopname" xid="shopTagspan"><![CDATA[鱼火锅]]></span><span xid="span3" class="detail" bind-text='$model.getDistance($model.newsData.val("shop_lat"),$model.newsData.val("shop_lon"))' style="float:right;"><![CDATA[100m]]></span>
  </div></div></div>
   </div></div>
   </div></div>
      </div></div>  
  </div>
