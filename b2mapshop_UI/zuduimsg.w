<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:169px;left:43px;" onLoad="modelLoad">
  <div component="$UI/system/components/justep/data/data"  xid="alldata" autoLoad="false"
     idColumn="team_id" onCustomRefresh="allCustomRefresh" >
    <column label="team_id" name="team_id" type="String" xid="xid1"></column>
  <column label="team_name" name="team_name" type="String" xid="xid2"></column>
  <column isCalculate="false" label="teampicurl" name="teampicurl" type="String" xid="xid3"></column>
  <column label="pageName" name="pageName" type="String" xid="xid4"></column>
  <column name="shop_address" type="String" xid="xid5"></column>
  <column name="valid_date" type="String" xid="xid6"></column>
  <column name="shop_lon" type="String" xid="xid7"></column>
  <column name="shop_lat" type="String" xid="xid8"></column>
  <column label="headpics" name="headpics" type="String" xid="xidheadpics"></column> 
  <column label="min_users" name="min_users" type="String" xid="xidmin_users"></column> 
  <column label="isvalided" name="isvalided" type="String" xid="xidisvalided"></column> 
  <column label="iscancle" name="iscancle" type="String" xid="xidiscancle"></column> 
  <column label="teamusercount" name="teamusercount" type="String" xid="xidteamusercount"></column> 
<column label="shop_fullname" name="shop_fullname" type="String" xid="xidshopFullname"></column> 
<column label="discount_name" name="discount_name" type="String" xid="xiddiscount_name"></column> 
<column label="discount_desc" name="discount_desc" type="String" xid="xiddiscount_desc"></column> 
  <data xid="default1">
  <!--   [{&quot;id&quot;:&quot;1&quot;,&quot;shopImg&quot;:&quot;img_shangdian.png&quot;,&quot;title&quot;:&quot;6人成团享9折&quot;,&quot;name&quot;:&quot;百果园（六朝路店）&quot;,&quot;member&quot;:&quot;5&quot;,&quot;tag&quot;:&quot;还差1人成团&quot;,&quot;time&quot;:&quot;00:25:11&quot;},{&quot;id&quot;:&quot;2&quot;,&quot;shopImg&quot;:&quot;img_shangdian.png&quot;,&quot;title&quot;:&quot;5人成团享9折&quot;,&quot;name&quot;:&quot;百果园（六朝路店）&quot;,&quot;member&quot;:&quot;5&quot;,&quot;tag&quot;:&quot;已完成&quot;},{&quot;id&quot;:&quot;3&quot;,&quot;shopImg&quot;:&quot;img_shangdian.png&quot;,&quot;title&quot;:&quot;5人成团享9折&quot;,&quot;name&quot;:&quot;百果园（六朝路店）&quot;,&quot;member&quot;:&quot;5&quot;,&quot;tag&quot;:&quot;已取消&quot;},{&quot;id&quot;:&quot;4&quot;,&quot;shopImg&quot;:&quot;img_shangdian.png&quot;,&quot;title&quot;:&quot;5人成团享9折&quot;,&quot;name&quot;:&quot;百果园（六朝路店）&quot;,&quot;member&quot;:&quot;5&quot;,&quot;tag&quot;:&quot;待评价&quot;}]
  -->
  </data></div>
    <div component="$UI/system/components/justep/data/data"  xid="runningdata" autoLoad="false"
     idColumn="team_id" onCustomRefresh="runningCustomRefresh" >
    <column label="team_id" name="team_id" type="String" xid="xid1"></column>
  <column label="team_name" name="team_name" type="String" xid="xid2"></column>
  <column isCalculate="false" label="teampicurl" name="teampicurl" type="String" xid="xid3"></column>
  <column label="pageName" name="pageName" type="String" xid="xid4"></column>
  <column name="shop_address" type="String" xid="xid5"></column>
  <column name="valid_date" type="String" xid="xid6"></column>
  <column name="shop_lon" type="String" xid="xid7"></column>
  <column name="shop_lat" type="String" xid="xid8"></column>
  <column label="headpics" name="headpics" type="String" xid="xidheadpics"></column> 
  <column label="min_users" name="min_users" type="String" xid="xidmin_users"></column> 
  <column label="isvalided" name="isvalided" type="String" xid="xidisvalided"></column> 
  <column label="iscancle" name="iscancle" type="String" xid="xidiscancle"></column> 
  <column label="teamusercount" name="teamusercount" type="String" xid="xidteamusercount"></column> 
<column label="shop_fullname" name="shop_fullname" type="String" xid="xidshopFullname"></column> 
<column label="discount_name" name="discount_name" type="String" xid="xiddiscount_name"></column> 
<column label="discount_desc" name="discount_desc" type="String" xid="xiddiscount_desc"></column> 
  <data xid="default1">
  <!--   [{&quot;id&quot;:&quot;1&quot;,&quot;shopImg&quot;:&quot;img_shangdian.png&quot;,&quot;title&quot;:&quot;6人成团享9折&quot;,&quot;name&quot;:&quot;百果园（六朝路店）&quot;,&quot;member&quot;:&quot;5&quot;,&quot;tag&quot;:&quot;还差1人成团&quot;,&quot;time&quot;:&quot;00:25:11&quot;},{&quot;id&quot;:&quot;2&quot;,&quot;shopImg&quot;:&quot;img_shangdian.png&quot;,&quot;title&quot;:&quot;5人成团享9折&quot;,&quot;name&quot;:&quot;百果园（六朝路店）&quot;,&quot;member&quot;:&quot;5&quot;,&quot;tag&quot;:&quot;已完成&quot;},{&quot;id&quot;:&quot;3&quot;,&quot;shopImg&quot;:&quot;img_shangdian.png&quot;,&quot;title&quot;:&quot;5人成团享9折&quot;,&quot;name&quot;:&quot;百果园（六朝路店）&quot;,&quot;member&quot;:&quot;5&quot;,&quot;tag&quot;:&quot;已取消&quot;},{&quot;id&quot;:&quot;4&quot;,&quot;shopImg&quot;:&quot;img_shangdian.png&quot;,&quot;title&quot;:&quot;5人成团享9折&quot;,&quot;name&quot;:&quot;百果园（六朝路店）&quot;,&quot;member&quot;:&quot;5&quot;,&quot;tag&quot;:&quot;待评价&quot;}]
  -->
  </data></div>
    <div component="$UI/system/components/justep/data/data"  xid="creditsdata" autoLoad="false"
     idColumn="team_id" onCustomRefresh="creditsCustomRefresh" >
    <column label="team_id" name="team_id" type="String" xid="xid1"></column>
  <column label="team_name" name="team_name" type="String" xid="xid2"></column>
  <column isCalculate="false" label="teampicurl" name="teampicurl" type="String" xid="xid3"></column>
  <column label="pageName" name="pageName" type="String" xid="xid4"></column>
  <column name="shop_address" type="String" xid="xid5"></column>
  <column name="valid_date" type="String" xid="xid6"></column>
  <column name="shop_lon" type="String" xid="xid7"></column>
  <column name="shop_lat" type="String" xid="xid8"></column>
  <column label="headpics" name="headpics" type="String" xid="xidheadpics"></column> 
  <column label="min_users" name="min_users" type="String" xid="xidmin_users"></column> 
  <column label="isvalided" name="isvalided" type="String" xid="xidisvalided"></column> 
  <column label="iscancle" name="iscancle" type="String" xid="xidiscancle"></column> 
  <column label="teamusercount" name="teamusercount" type="String" xid="xidteamusercount"></column> 
<column label="shop_fullname" name="shop_fullname" type="String" xid="xidshopFullname"></column> 
<column label="discount_name" name="discount_name" type="String" xid="xiddiscount_name"></column> 
<column label="discount_desc" name="discount_desc" type="String" xid="xiddiscount_desc"></column> 
  <data xid="default1">
  <!--   [{&quot;id&quot;:&quot;1&quot;,&quot;shopImg&quot;:&quot;img_shangdian.png&quot;,&quot;title&quot;:&quot;6人成团享9折&quot;,&quot;name&quot;:&quot;百果园（六朝路店）&quot;,&quot;member&quot;:&quot;5&quot;,&quot;tag&quot;:&quot;还差1人成团&quot;,&quot;time&quot;:&quot;00:25:11&quot;},{&quot;id&quot;:&quot;2&quot;,&quot;shopImg&quot;:&quot;img_shangdian.png&quot;,&quot;title&quot;:&quot;5人成团享9折&quot;,&quot;name&quot;:&quot;百果园（六朝路店）&quot;,&quot;member&quot;:&quot;5&quot;,&quot;tag&quot;:&quot;已完成&quot;},{&quot;id&quot;:&quot;3&quot;,&quot;shopImg&quot;:&quot;img_shangdian.png&quot;,&quot;title&quot;:&quot;5人成团享9折&quot;,&quot;name&quot;:&quot;百果园（六朝路店）&quot;,&quot;member&quot;:&quot;5&quot;,&quot;tag&quot;:&quot;已取消&quot;},{&quot;id&quot;:&quot;4&quot;,&quot;shopImg&quot;:&quot;img_shangdian.png&quot;,&quot;title&quot;:&quot;5人成团享9折&quot;,&quot;name&quot;:&quot;百果园（六朝路店）&quot;,&quot;member&quot;:&quot;5&quot;,&quot;tag&quot;:&quot;待评价&quot;}]
  -->
  </data></div>
    <div component="$UI/system/components/justep/data/data"  xid="finishdata" autoLoad="false"
     idColumn="team_id" onCustomRefresh="finishCustomRefresh" >
    <column label="team_id" name="team_id" type="String" xid="xid1"></column>
  <column label="team_name" name="team_name" type="String" xid="xid2"></column>
  <column isCalculate="false" label="teampicurl" name="teampicurl" type="String" xid="xid3"></column>
  <column label="pageName" name="pageName" type="String" xid="xid4"></column>
  <column name="shop_address" type="String" xid="xid5"></column>
  <column name="valid_date" type="String" xid="xid6"></column>
  <column name="shop_lon" type="String" xid="xid7"></column>
  <column name="shop_lat" type="String" xid="xid8"></column>
  <column label="headpics" name="headpics" type="String" xid="xidheadpics"></column> 
  <column label="min_users" name="min_users" type="String" xid="xidmin_users"></column> 
  <column label="isvalided" name="isvalided" type="String" xid="xidisvalided"></column> 
  <column label="iscancle" name="iscancle" type="String" xid="xidiscancle"></column> 
  <column label="teamusercount" name="teamusercount" type="String" xid="xidteamusercount"></column> 
<column label="shop_fullname" name="shop_fullname" type="String" xid="xidshopFullname"></column> 
<column label="discount_name" name="discount_name" type="String" xid="xiddiscount_name"></column> 
<column label="discount_desc" name="discount_desc" type="String" xid="xiddiscount_desc"></column> 
  <data xid="default1">
  <!--   [{&quot;id&quot;:&quot;1&quot;,&quot;shopImg&quot;:&quot;img_shangdian.png&quot;,&quot;title&quot;:&quot;6人成团享9折&quot;,&quot;name&quot;:&quot;百果园（六朝路店）&quot;,&quot;member&quot;:&quot;5&quot;,&quot;tag&quot;:&quot;还差1人成团&quot;,&quot;time&quot;:&quot;00:25:11&quot;},{&quot;id&quot;:&quot;2&quot;,&quot;shopImg&quot;:&quot;img_shangdian.png&quot;,&quot;title&quot;:&quot;5人成团享9折&quot;,&quot;name&quot;:&quot;百果园（六朝路店）&quot;,&quot;member&quot;:&quot;5&quot;,&quot;tag&quot;:&quot;已完成&quot;},{&quot;id&quot;:&quot;3&quot;,&quot;shopImg&quot;:&quot;img_shangdian.png&quot;,&quot;title&quot;:&quot;5人成团享9折&quot;,&quot;name&quot;:&quot;百果园（六朝路店）&quot;,&quot;member&quot;:&quot;5&quot;,&quot;tag&quot;:&quot;已取消&quot;},{&quot;id&quot;:&quot;4&quot;,&quot;shopImg&quot;:&quot;img_shangdian.png&quot;,&quot;title&quot;:&quot;5人成团享9折&quot;,&quot;name&quot;:&quot;百果园（六朝路店）&quot;,&quot;member&quot;:&quot;5&quot;,&quot;tag&quot;:&quot;待评价&quot;}]
  -->
  </data></div>
    <div component="$UI/system/components/justep/data/data"  xid="quxiaodata" autoLoad="false"
     idColumn="team_id" onCustomRefresh="quxiaoCustomRefresh" >
    <column label="team_id" name="team_id" type="String" xid="xid1"></column>
  <column label="team_name" name="team_name" type="String" xid="xid2"></column>
  <column isCalculate="false" label="teampicurl" name="teampicurl" type="String" xid="xid3"></column>
  <column label="pageName" name="pageName" type="String" xid="xid4"></column>
  <column name="shop_address" type="String" xid="xid5"></column>
  <column name="valid_date" type="String" xid="xid6"></column>
  <column name="shop_lon" type="String" xid="xid7"></column>
  <column name="shop_lat" type="String" xid="xid8"></column>
  <column label="headpics" name="headpics" type="String" xid="xidheadpics"></column> 
  <column label="min_users" name="min_users" type="String" xid="xidmin_users"></column> 
  <column label="isvalided" name="isvalided" type="String" xid="xidisvalided"></column> 
  <column label="iscancle" name="iscancle" type="String" xid="xidiscancle"></column> 
  <column label="teamusercount" name="teamusercount" type="String" xid="xidteamusercount"></column> 
<column label="shop_fullname" name="shop_fullname" type="String" xid="xidshopFullname"></column> 
<column label="discount_name" name="discount_name" type="String" xid="xiddiscount_name"></column> 
<column label="discount_desc" name="discount_desc" type="String" xid="xiddiscount_desc"></column> 
  <data xid="default1">
  <!--   [{&quot;id&quot;:&quot;1&quot;,&quot;shopImg&quot;:&quot;img_shangdian.png&quot;,&quot;title&quot;:&quot;6人成团享9折&quot;,&quot;name&quot;:&quot;百果园（六朝路店）&quot;,&quot;member&quot;:&quot;5&quot;,&quot;tag&quot;:&quot;还差1人成团&quot;,&quot;time&quot;:&quot;00:25:11&quot;},{&quot;id&quot;:&quot;2&quot;,&quot;shopImg&quot;:&quot;img_shangdian.png&quot;,&quot;title&quot;:&quot;5人成团享9折&quot;,&quot;name&quot;:&quot;百果园（六朝路店）&quot;,&quot;member&quot;:&quot;5&quot;,&quot;tag&quot;:&quot;已完成&quot;},{&quot;id&quot;:&quot;3&quot;,&quot;shopImg&quot;:&quot;img_shangdian.png&quot;,&quot;title&quot;:&quot;5人成团享9折&quot;,&quot;name&quot;:&quot;百果园（六朝路店）&quot;,&quot;member&quot;:&quot;5&quot;,&quot;tag&quot;:&quot;已取消&quot;},{&quot;id&quot;:&quot;4&quot;,&quot;shopImg&quot;:&quot;img_shangdian.png&quot;,&quot;title&quot;:&quot;5人成团享9折&quot;,&quot;name&quot;:&quot;百果园（六朝路店）&quot;,&quot;member&quot;:&quot;5&quot;,&quot;tag&quot;:&quot;待评价&quot;}]
  -->
  </data></div>
  
  </div> 
<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1" style="background-color:#252330;">
   <div class="x-panel-top" xid="top1" height="80">
   <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar" xid="titleBar1" style="background-color:transparent;">
   <div class="x-titlebar-left" xid="left1"><a component="$UI/system/components/justep/button/button" label="" class="btn btn-link btn-sm btn-only-icon" onClick="{operation:'window.close'}" xid="backBtn" icon="img:$UI/b2mapshop_UI/img/nav_icon_fanhui.png">
   <img src="$UI/b2mapshop_UI/img/nav_icon_fanhui.png" xid="image6" style="width:20px;" height="20px"></img><span xid="span1"></span></a></div>
   <div class="x-titlebar-title" xid="title1"><![CDATA[组队信息]]></div>
   <div class="x-titlebar-right reverse" xid="right1"></div></div>
   <div component="$UI/system/components/justep/button/buttonGroup" class="btn-group" tabbed="true" xid="buttonGroup1" style="width:100%;">
   <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="全部" xid="allbtn" target="page1">
    <i xid="i6"></i>
    <span xid="span12">全部</span></a>
    <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="进行中" xid="runningbtn" target="page2">
   <i xid="i7"></i>
   <span xid="span13">进行中</span></a> 
   <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="待评价" xid="creditsbtn" target="page3">
   <i xid="i8"></i>
   <span xid="span14">待评价</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="已完成" xid="finishbtn" target="page4">
   <i xid="i9"></i>
   <span xid="span15">已完成</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="已取消" xid="quxiaobtn" target="page5">
   <i xid="i10"></i>
   <span xid="span16">已取消</span></a>
  </div></div>
   <div class="x-panel-content  x-scroll-view" xid="content1" _xid="C893E5F19690000191339C1011708620">
  
  <div component="$UI/system/components/justep/contents/contents" class="x-contents x-full" active="0" xid="contents2" onActiveChange="contentsActiveChange">
   <div class="x-contents-content" xid="page1">
    <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView1">
   <div class="x-content-center x-pull-down container" xid="div1">
    <i class="x-pull-down-img glyphicon x-icon-pull-down" xid="i1"></i>
    <span class="x-pull-down-label" xid="span7">下拉刷新...</span></div> 
   <div class="x-scroll-content" xid="div2">
    <div component="$UI/system/components/justep/list/list" class="x-list" xid="list1" data="alldata" limit="20" >
     <ul class="x-list-template" xid="listTemplateUl1">
      <div xid="div4" class="card" bind-click="div4Click">
       <div component="$UI/system/components/justep/row/row" class="x-row" xid="row3">
        <div class="x-col x-col-25" xid="col9">
         <img src=" " alt="" xid="image1" class="shopImg" bind-attr-src='val("teampicurl")'></img></div> 
        <div class="x-col x-col-50" xid="col10">
         <h4 xid="h41" class="event" bind-text=' val("team_name")'></h4>
         <p class="shopname" xid="p1" bind-text=' val("shop_address")'></p>
         <div xid="div2" bind-html="$model.showheads($object)"></div></div> 
        <div class="x-col x-col-25" xid="col11" style="text-align:right;">
         <p class="tag" xid="p2" bind-text="$model.getusersinfo($object)"></p>
         <p class="time" xid="p3" bind-css="$model.getlefttimecss($object)" bind-text="$model.getlefttime($object)"></p></div> </div> </div> </ul> </div> </div> 
   <div class="x-content-center x-pull-up" xid="div3">
    <span class="x-pull-up-label" xid="span8">加载更多...</span></div> </div></div> 
   <div class="x-contents-content  x-scroll-view" xid="page2" bind-load="li2Click">
   <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView2">
   <div class="x-content-center x-pull-down container" xid="div8">
    <i class="x-pull-down-img glyphicon x-icon-pull-down" xid="i2"></i>
    <span class="x-pull-down-label" xid="span2">下拉刷新...</span></div> 
   <div class="x-scroll-content" xid="div7">
    <div component="$UI/system/components/justep/list/list" class="x-list" xid="list2" data="runningdata" limit="20">
     <ul class="x-list-template" xid="listTemplateUl2">
      <div xid="div5" class="card" bind-click="div4Click">
       <div component="$UI/system/components/justep/row/row" class="x-row" xid="row2">
        <div class="x-col x-col-25" xid="col5">
         <img src=" " alt="" xid="image2" class="shopImg" bind-attr-src='val("teampicurl")'></img></div> 
        <div class="x-col x-col-50" xid="col6">
         <h4 xid="h42" class="event" bind-text=' val("team_name")'></h4>
         <p class="shopname" xid="p4" bind-text=' val("shop_address")'></p>
         <div xid="div7" bind-html="$model.showheads($object)"></div></div> 
        <div class="x-col x-col-25" xid="col4" style="text-align:right;">
         <p class="tag" xid="p5" bind-text="$model.getusersinfo($object)"></p>
         <p class="time" xid="p6" bind-css="$model.getlefttimecss($object)" bind-text="$model.getlefttime($object)"></p></div> </div> </div> </ul> </div> </div> 
   <div class="x-content-center x-pull-up" xid="div6">
    <span class="x-pull-up-label" xid="span3">加载更多...</span></div> </div></div> 
   <div class="x-contents-content  x-scroll-view" xid="page3">
   <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView3">
   <div class="x-content-center x-pull-down container" xid="div12">
    <i class="x-pull-down-img glyphicon x-icon-pull-down" xid="i3"></i>
    <span class="x-pull-down-label" xid="span4">下拉刷新...</span></div> 
   <div class="x-scroll-content" xid="div11">
    <div component="$UI/system/components/justep/list/list" class="x-list" xid="list3" data="creditsdata" limit="20">
     <ul class="x-list-template" xid="listTemplateUl3">
      <div xid="div9" class="card" bind-click="div4Click">
       <div component="$UI/system/components/justep/row/row" class="x-row" xid="row4">
        <div class="x-col x-col-25" xid="col8">
         <img src=" " alt="" xid="image3" class="shopImg" bind-attr-src='val("teampicurl")'></img></div> 
        <div class="x-col x-col-50" xid="col12">
         <h4 xid="h43" class="event" bind-text=' val("team_name")'></h4>
         <p class="shopname" xid="p7" bind-text=' val("shop_address")'></p>
         <div xid="div11" bind-html="$model.showheads($object)"></div></div> 
        <div class="x-col x-col-25" xid="col7" style="text-align:right;">
         <p class="tag" xid="p8" bind-text="$model.getusersinfo($object)"></p>
         <p class="time" xid="p9" bind-css="$model.getlefttimecss($object)" bind-text="$model.getlefttime($object)"></p></div> </div> </div> </ul> </div> </div> 
   <div class="x-content-center x-pull-up" xid="div10">
    <span class="x-pull-up-label" xid="span5">加载更多...</span></div> </div></div> 
   <div class="x-contents-content  x-scroll-view" xid="page4">
   <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView4">
   <div class="x-content-center x-pull-down container" xid="div16">
    <i class="x-pull-down-img glyphicon x-icon-pull-down" xid="i4"></i>
    <span class="x-pull-down-label" xid="span6">下拉刷新...</span></div> 
   <div class="x-scroll-content" xid="div15">
    <div component="$UI/system/components/justep/list/list" class="x-list" xid="list4" data="finishdata" limit="20" >
     <ul class="x-list-template" xid="listTemplateUl4">
      <div xid="div13" class="card" bind-click="div4Click">
       <div component="$UI/system/components/justep/row/row" class="x-row" xid="row5">
        <div class="x-col x-col-25" xid="col14">
         <img src=" " alt="" xid="image4" class="shopImg" bind-attr-src='val("teampicurl")'></img></div> 
        <div class="x-col x-col-50" xid="col15">
         <h4 xid="h44" class="event" bind-text=' val("team_name")'></h4>
         <p class="shopname" xid="p10" bind-text=' val("shop_address")'></p>
         <div xid="div15" bind-html="$model.showheads($object)"></div></div> 
        <div class="x-col x-col-25" xid="col13" style="text-align:right;">
         <p class="tag" xid="p11" bind-text="$model.getusersinfo($object)"></p>
         <p class="time" xid="p12" bind-css="$model.getlefttimecss($object)" bind-text="$model.getlefttime($object)"></p></div> </div> </div> </ul> </div> </div> 
   <div class="x-content-center x-pull-up" xid="div14">
    <span class="x-pull-up-label" xid="span9">加载更多...</span></div> </div></div>
    <div class="x-contents-content  x-scroll-view" xid="page5">
    <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView5">
   <div class="x-content-center x-pull-down container" xid="div20">
    <i class="x-pull-down-img glyphicon x-icon-pull-down" xid="i5"></i>
    <span class="x-pull-down-label" xid="span10">下拉刷新...</span></div> 
   <div class="x-scroll-content" xid="div19">
    <div component="$UI/system/components/justep/list/list" class="x-list" xid="list5" data="quxiaodata" limit="20" >
     <ul class="x-list-template" xid="listTemplateUl5">
      <div xid="div17" class="card" bind-click="div4Click">
       <div component="$UI/system/components/justep/row/row" class="x-row" xid="row6">
        <div class="x-col x-col-25" xid="col17">
         <img src=" " alt="" xid="image5" class="shopImg" bind-attr-src='val("teampicurl")'></img></div> 
        <div class="x-col x-col-50" xid="col18">
         <h4 xid="h45" class="event" bind-text=' val("team_name")'></h4>
         <p class="shopname" xid="p13" bind-text=' val("shop_address")'></p>
         <div xid="div19" bind-html="$model.showheads($object)"></div></div> 
        <div class="x-col x-col-25" xid="col16" style="text-align:right;">
         <p class="tag" xid="p14" bind-text="$model.getusersinfo($object)"></p>
         <p class="time" xid="p15" bind-css="$model.getlefttimecss($object)" bind-text="$model.getlefttime($object)"></p></div> </div> </div> </ul> </div> </div> 
   <div class="x-content-center x-pull-up" xid="div18">
    <span class="x-pull-up-label" xid="span11">加载更多...</span></div> </div></div> </div>
  </div>
   <div class="x-panel-bottom" xid="bottom1" height="0"></div></div></div>