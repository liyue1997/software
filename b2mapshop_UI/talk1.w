<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:54px;left:55px;height:auto;" onLoad="modelLoad" onActive="modelActive">
   <div component="$UI/system/components/justep/data/data" xid="discData"  idColumn="discount_id" autoLoad="false" onCustomRefresh="discDataCustomRefresh" confirmRefresh="false"> 
      <data xid="default1">
      </data>
  <column label="discount_id" name="discount_id" type="String" xid="xiddiscount_id"></column> 
<column label="shop_id" name="shop_id" type="String" xid="xidshop_id"></column> 
<column label="shop_fullname" name="shop_fullname" type="String" xid="xidshopFullname"></column> 
<column label="discount_name" name="discount_name" type="String" xid="xiddiscount_name"></column> 
<column label="discount_desc" name="discount_desc" type="String" xid="xiddiscount_desc"></column> 
<column label="min_users" name="min_users" type="String" xid="xidmin_users"></column> 
<column label="iseffective" name="iseffective" type="String" xid="xidiseffective"></column> 
<column label="teamusercount" name="teamusercount" type="String" xid="xidusercount"></column> 
<column label="valid_date" name="valid_date" type="String" xid="xidvalid_date"></column> 
<column label="last_team_id" name="last_team_id" type="String" xid="xidlastteamid"></column> 
<column label="headpics" name="headpics" type="String" xid="xidheadpics"></column> 
<column label="isvalided" name="isvalided" type="String" xid="xidisvalided"></column> 
<column label="iscancle" name="iscancle" type="String" xid="xidiscancle"></column> 
<column label="group_id" name="group_id" type="String" xid="xidgroup_id"></column> 
</div>
  </div> 
<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1" style="background-color:#252330;">
   <div class="x-panel-top" xid="top1" height="50"><div component="$UI/system/components/justep/row/row" class="x-row" xid="row1" style="height:100%;width:100%;">
   <div class="x-col x-col-10" xid="col1"><a component="$UI/system/components/justep/button/button" label="" class="btn btn-link btn-only-icon" icon="img:$UI/b2mapshop_UI/img/nav_icon_fanhui.png" onClick="{operation:'window.close'}" xid="backBtn">
   <img src="$UI/b2mapshop_UI/img/nav_icon_fanhui.png" xid="image3" style="width:20px;"></img>
   <span xid="span1"></span></a></div>
   <div class="x-col" xid="col2"><div class="title" xid="title1" style="text-align:center;" bind-text=' $model.discData.val("shop_fullname")'><![CDATA[百果园（六朝路店）]]></div></div>
   <div class="x-col x-col-10" xid="col3"></div></div></div>
   <div class="x-panel-content" xid="content1">
   <div component="$UI/system/components/justep/row/row" class="x-row" xid="rowinfo">
   
   <div xid="div1" class="divtop"><div component="$UI/system/components/justep/row/row" class="x-row" xid="row2">
   <div class="x-col" xid="col4"><h4 xid="h41" style="color:#FFFFFF;" bind-text=' $model.discData.val("discount_name")'><![CDATA[6人成团享9折]]></h4>
  <p xid="p1" style="color:#FFFFFF;" bind-text=' $model.discData.val("discount_desc")'><![CDATA[6人拼团 进口商品除外 周一至周五可用]]></p>
  
  <div xid="div2" bind-html=" $model.showheads()"></div></div>
   <div class="x-col x-col-25" xid="col6" style="text-align:right;">
     <nobr><span xid="span2" style="color:#FFFFFF;" bind-text="$model.getusersinfo()"><![CDATA[已加入]]></span></nobr>
  <span xid="span3" bind-css=" $model.getlefttimecss()" bind-text="$model.getlefttime()"><![CDATA[00:25:11:13]]></span></div></div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row3">
   <div class="x-col" xid="col9" style="text-align:center;">
   <button xid="btnjoin" class="join" bind-visible=" $model.hasjoin()" bind-click="btnjoinClick"><![CDATA[加入]]></button>
   <button xid="btnstart" class="join" bind-visible="!$model.hasteam()" bind-click="btnstartClick"><![CDATA[发起]]></button>
   <button xid="button2" class="btn2" bind-click="button2Click" bind-visible=" $model.hascancle()">取消</button>
  <button xid="button1" class="join" bind-visible=" $model.finish()" bind-click="button1Click"><![CDATA[评价]]></button></div></div></div>
  </div>
   <div component="$UI/system/components/justep/row/row" class="x-row" xid="rowdiag">
  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel2" style="top:180px;">
   <div class="x-panel-content" xid="content2"><div component="$UI/system/components/justep/windowContainer/windowContainer" class="x-window-container" xid="windowContainer2" autoLoad="false"></div></div>
   </div></div>
   </div>
  
  </div>
   <div class="x-panel-bottom" xid="bottom1" style="background-color:#2B2B38;" height="50" bind-visible="$model.hasteam()">
   
  </div></div>