<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:13px;left:120px;" onLoad="modelLoad" onModelConstruct="modelModelConstruct" onActive="modelActive"> 
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
  <div component="$UI/system/components/justep/data/data" xid="discData"  idColumn="discount_id" autoLoad="false" onCustomRefresh="discDataCustomRefresh" confirmRefresh="false"> 
      <data xid="default1">
      </data>
  <column label="discount_id" name="discount_id" type="String" xid="xiddiscount_id"></column> 
<column label="shop_id" name="shop_id" type="String" xid="xidshop_id"></column> 
<column label="discount_name" name="discount_name" type="String" xid="xiddiscount_name"></column> 
<column label="discount_desc" name="discount_desc" type="String" xid="xiddiscount_desc"></column> 
<column label="min_users" name="min_users" type="String" xid="xidmin_users"></column> 
<column label="iseffective" name="iseffective" type="String" xid="xidiseffective"></column> 
<column label="teamusercount" name="teamusercount" type="String" xid="xidusercount"></column> 
<column label="valid_date" name="valid_date" type="String" xid="xidvalid_date"></column> 
<column label="last_team_id" name="last_team_id" type="String" xid="xidlastteamid"></column> 
<column label="headpics" name="headpics" type="String" xid="xidheadpics"></column> 
</div>
  </div>
<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1" style="background-color:#252330;">
   <div class="x-panel-top" xid="top1"><div component="$UI/system/components/justep/row/row" class="x-row" xid="row1" style="height:100%;">
   <div class="x-col x-col-20" xid="col1" style="padding:0px 0px 0px 0px;"><div xid="div1">
  <a component="$UI/system/components/justep/button/button" label="" class="btn btn-link btn-only-icon" icon="img:$UI/b2mapshop_UI/img/nav_icon_fanhui.png" onClick="{operation:'window.close'}" xid="backBtn">
   <img src="$UI/b2mapshop_UI/img/nav_icon_fanhui.png" xid="image6" style="width:20px;"></img><span xid="span1"></span></a>
  </div>
  </div>
   <div class="x-col" xid="col3" style="text-align:right;"><img src="./img/shoucang0.png" alt="" xid="image3" class="icon" bind-click="image3Click" bind-attr-src=" $model.getshoucang()"></img>
  <img src="./img/nav_icon_xiaoxi.png" alt="" xid="image4" class="icon" bind-visible="false"></img>
  <img src="./img/fenxiang.png" alt="" xid="image5" class="icon" bind-click="image5Click"></img></div></div></div>
   <div class="x-panel-content" xid="content1"><div xid="div2" class="divtop"><h3 xid="h31" class="shopname" bind-text=' $model.newsData.val("shopFullname")'><![CDATA[百果园（六朝路店）]]></h3>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row2">
   <div class="x-col x-col-75" xid="col2"><img src="./img/img_shangdian.png" alt="" xid="image7" style="width:65px;float:left;" bind-attr-src=' $model.newsData.val("shop_img")' class="shopimg"></img>
  <div xid="div3" class="pinfendiv">
   <img src=" " alt="" xid="image8" class="star" bind-attr-src='$model.getscore(1, $model.newsData.val("shop_score")*1.0)'></img>
   <img src=" " alt="" xid="image9" class="star" bind-attr-src='$model.getscore(2, $model.newsData.val("shop_score")*1.0)'></img>
   <img src=" " alt="" xid="image10" class="star" bind-attr-src='$model.getscore(3, $model.newsData.val("shop_score")*1.0)'></img>
   <img src=" " alt="" xid="image11" class="star" bind-attr-src='$model.getscore(4, $model.newsData.val("shop_score")*1.0)'></img>
   <img src=" " alt="" xid="image12" class="star" bind-attr-src='$model.getscore(5, $model.newsData.val("shop_score")*1.0)'></img>
   <span xid="span2"></span>
  <span xid="span3" class="fenshu" bind-text=' $model.newsData.val("shopScore")+"分"'><![CDATA[2分]]></span><p xid="p1" style="color:#FFFFFF;font-size:12px;margin-top:10px;" bind-text=' $model.newsData.val("shopTags")'><![CDATA[水果]]></p></div>
  </div>
   <div class="x-col x-col-25" xid="col5"><span xid="span5" class="price" bind-text="'￥'+ $model.newsData.val(&quot;shopAverage&quot;)+'/人'"><![CDATA[￥26/人]]></span></div></div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row3" style="margin-top:5px;">
   <div class="x-col x-col-75" xid="col4" bind-click="col4Click"><p xid="p2" style="color:#FFFFFF;" bind-text=' $model.newsData.val("shopAddress")'><![CDATA[雨花台区六朝路绿地之窗A1-125（金瑞图文旁边）  距您步行100m]]></p>
  <p xid="p3" style="color:#FFFFFF;display:inline-block;" bind-text='$model.getDistance($model.newsData.val("shopLat"),$model.newsData.val("shopLon"))'><![CDATA[营业中   10:30-21:30]]></p><img src="./img/icon_xiayiji_small.png" alt="" xid="image2" class="mapimg"></img></div>
   <div class="x-col" xid="col7" style="text-align:left;">
   <a bind-attr-href="'tel:'+$model.newsData.val('shopPhone')">
   <img src="./img/icon_dianhua.png" alt="" xid="image1" style="width:19px;margin-top:20%;margin-left:20%;"></img></a></div></div>
  </div>
  <ul component="$UI/system/components/justep/list/list" class="x-list x-list-template" xid="list1" data="discData">
   <li xid="li1"><div xid="div4" class="divcenter"><div component="$UI/system/components/justep/row/row" class="x-row" xid="row4">
   <div class="x-col" xid="col6"><h4 xid="h41" class="centertitle" bind-text='ref("discount_name")'><![CDATA[6人成团享9折]]></h4></div>
   <div class="x-col" xid="col9"><span xid="span6" style="color:#FFFFFF;"  bind-text="$model.getusersinfo($object)"><![CDATA[仅剩1个名额]]></span>
  <span xid="span7" class="shoptime" bind-text="$model.getlefttime($object)" bind-css="$model.getlefttimecss($object)"><![CDATA[00:25:11]]></span></div></div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row5">
   <div class="x-col" xid="col10"><p class="msg" xid="p4" bind-text='ref("discount_desc")'><![CDATA[6人拼团·周一至周五可用·进口商品除外]]></p></div>
   </div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row6" bind-visible=" $model.hasteam($object)">
   <div class="x-col" xid="col13" bind-html=" $model.showheads($object)"></div>
   </div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row7">
   <div class="x-col" xid="col16" style="text-align:center;"><button xid="btnjoin" class="join" bind-visible=" $model.hasteam($object)" bind-click="btnjoinClick"><![CDATA[加入]]></button>
   <button xid="btnstart" class="join" bind-visible="!$model.hasteam($object)" bind-click="btnstartClick"><![CDATA[发起]]></button>
   </div>
   </div>
  </div></li></ul>
  </div>
   </div></div>