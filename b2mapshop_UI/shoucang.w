<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;" xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:112px;left:54px;height:auto;" onLoad="modelLoad"> 
  <div component="$UI/system/components/justep/data/data" autoLoad="false" xid="shopinfo" idColumn="shop_id" onCustomRefresh="shopinfoCustomRefresh">

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
  <column name="heart" type="String" xid="xid11"></column>
  <data xid="default1">
  <!--  [{&quot;id&quot;:&quot;1&quot;,&quot;shopID&quot;:&quot;1&quot;,&quot;shopimg&quot;:&quot;img_shangdian.png&quot;,&quot;shopName&quot;:&quot;百果园（六朝路店）&quot;,&quot;heart&quot;:&quot;1&quot;},{&quot;id&quot;:&quot;2&quot;,&quot;shopID&quot;:&quot;1&quot;,&quot;shopimg&quot;:&quot;img_shangdian.png&quot;,&quot;shopName&quot;:&quot;百果园（六朝路店）&quot;,&quot;heart&quot;:&quot;1&quot;},{&quot;id&quot;:&quot;3&quot;,&quot;shopID&quot;:&quot;2&quot;,&quot;shopimg&quot;:&quot;img_shangdian.png&quot;,&quot;shopName&quot;:&quot;衡门小筑&quot;,&quot;heart&quot;:&quot;0&quot;},{&quot;id&quot;:&quot;4&quot;,&quot;shopID&quot;:&quot;3&quot;,&quot;shopimg&quot;:&quot;img_shangdian.png&quot;,&quot;shopName&quot;:&quot;麦当劳（京沪高铁南京南站店）&quot;,&quot;heart&quot;:&quot;0&quot;},{&quot;id&quot;:&quot;5&quot;,&quot;shopID&quot;:&quot;4&quot;,&quot;shopimg&quot;:&quot;img_shangdian.png&quot;,&quot;shopName&quot;:&quot;鱼无双（九都荟店）&quot;,&quot;heart&quot;:&quot;1&quot;}]-->
  </data></div></div>  
  <div component="$UI/system/components/justep/panel/panel" 
    class="x-panel x-full" xid="panel1" style="background-color:#252330;"> 
      <div class="x-panel-top top" xid="top1"> 
        <div component="$UI/system/components/justep/titleBar/titleBar" title="我的收藏"
          class="x-titlebar">
          <div class="x-titlebar-left"> 
            <a component="$UI/system/components/justep/button/button"
              label="" class="btn btn-link btn-only-icon" icon="img:$UI/b2mapshop_UI/img/nav_icon_fanhui.png"
              onClick="{operation:'window.close'}" xid="backBtn"> 
              <img src="$UI/b2mapshop_UI/img/nav_icon_fanhui.png" xid="image3" style="width:20px;"></img><span></span> 
            </a> 
          </div>  
          <div class="x-titlebar-title">我的收藏
  </div>  
          <div class="x-titlebar-right reverse"> 
          </div>
        </div> 
      </div>  
    <div class="x-panel-content  x-scroll-view" xid="content1" _xid="C8929F3F402000011EFDFD70437C16C4">
    <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView1">
   <div class="x-content-center x-pull-down container" xid="div1">
    <i class="x-pull-down-img glyphicon x-icon-pull-down" xid="i1"></i>
    <span class="x-pull-down-label" xid="span1">下拉刷新...</span></div> 
   <div class="x-scroll-content" xid="div2">
    <div class="x-list" component="$UI/system/components/justep/list/list" data="shopinfo" limit="8" xid="list1" style="background-color:#2B2B38;">
     <div class="x-list-template" xid="listTemplateDiv1">
      <div xid="div3" class="div3" style="height:80px;" bind-click="div3Click">
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row1" style="height:100%;width:100%;">
   <div class="x-col x-col-20" xid="col1" style="text-align:center;line-height:60px;"><img src=" " alt="" xid="image1" bind-attr-src='val("shop_img")' class="image1"></img>
   </div>
   <div class="x-col" xid="col2" style="line-height:60px;"><span xid="span3" bind-text='val("shop_fullname")' class="span3"></span></div>
   <div class="x-col x-col-10" xid="col3" style="line-height:60px;text-align:right;"><img alt="" xid="image2" class="image2" bind-click="image2Click" bind-attr-src='$model.sc(val("heart"))'></img></div></div></div></div> </div> 
  </div> 
   <div class="x-content-center x-pull-up" xid="div4">
    <span class="x-pull-up-label" xid="span2">加载更多...</span></div> </div></div>
  </div> 
</div>