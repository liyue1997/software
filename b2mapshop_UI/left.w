<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window portal-left" component="$UI/system/components/justep/window/window" design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:195px;left:134px;" onActive="modelActive"/> 
<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1" style="background-color:#2B2B39;">
   
   <div class="x-panel-content" xid="content1" style="top:0;"><div xid="div1" style="height:176px;" class="title"><div component="$UI/system/components/justep/row/row" class="x-row" xid="row1" style="position:relative;top:40px;border-style:none none none none;" bind-click="row1Click">
   <div class="x-col x-col-33" xid="col1" style="text-align:center;"><img src="./img/img_touxiang_default_171.png" alt="" xid="image1" class="headimg" bind-attr-src=' $model.getValue("userheadpic","./img/img_touxiang_default_171.png")'></img></div>
   <div class="x-col" xid="col2" style="text-align:left;padding-left:10px;"><p class="username" xid="p2" bind-text="username"><![CDATA[未登录]]></p>
  <span xid="span3" class="xinyu" bind-text="'信誉值'+$model.getValue('credits','')"><![CDATA[信誉值100]]></span></div>
   </div>
  </div>
  <div xid="div3" class="cehualist"><div component="$UI/system/components/justep/row/row" class="x-row" xid="row2" bind-click="row2Click" style="border-top-style:solid;border-top-width:1px;border-top-color:#252330;">
   <div class="x-col x-col-90" xid="col4" ><img src="./img/icon-zudui.png" alt="" xid="image2" class="icon"></img>
  <span xid="span4" class="detail"><![CDATA[组队信息]]></span></div>
   <div class="x-col" xid="col6"><img src="./img/icon_xiayiji_small.png" alt="" xid="image7" class="nexticon"></img></div></div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row3" bind-click="row3Click">
   <div class="x-col x-col-90" xid="col7"><img src="./img/icon-shoucang_small.png" alt="" xid="image3" class="icon"></img>
  <span xid="span5" class="detail"><![CDATA[我的收藏]]></span></div>
   <div class="x-col" xid="col9"><img src="./img/icon_xiayiji_small.png" alt="" xid="image8" class="nexticon"></img></div></div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row4" bind-click="row4Click">
   <div class="x-col x-col-90" xid="col10"><img src="./img/icon-lishi.png" alt="" xid="image4" class="icon"></img>
  <span xid="span6" class="detail"><![CDATA[浏览历史]]></span></div>
   <div class="x-col" xid="col12"><img src="./img/icon_xiayiji_small.png" alt="" xid="image9" class="nexticon"></img></div></div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row5" bind-click="row5Click">
   <div class="x-col x-col-90" xid="col13"><img src="./img/icon_dianping.png" alt="" xid="image5" class="icon"></img>
  <span xid="span7" class="detail"><![CDATA[待点评]]></span></div>
   <div class="x-col" xid="col15"><img src="./img/icon_xiayiji_small.png" alt="" xid="image10" class="nexticon"></img></div></div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row6" style="border-bottom-style:solid;border-bottom-width:1px;border-bottom-color:#252330;" bind-click="row6Click">
   <div class="x-col x-col-90" xid="col16"><img src="./img/icon_shezhi.png" alt="" xid="image6" class="icon"></img>
  <span xid="span8" class="detail"><![CDATA[设置]]></span></div>
   <div class="x-col" xid="col18"><img src="./img/icon_xiayiji_small.png" alt="" xid="image11" class="nexticon"></img></div></div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row7" bind-click="row7Click">
   <div class="x-col x-col-90" xid="col3"><img src="./img/icon_tuichu.png" alt="" xid="image14" class="icon"></img>
  <span xid="span2" class="detail" bind-text="$model.getlogintext()" style="width:100%;"><![CDATA[退出登录]]></span></div>
   <div class="x-col" xid="col8"><img src="./img/icon_xiayiji_small.png" alt="" xid="image15" class="nexticon"></img></div></div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row8" bind-click="row8Click">
   <div class="x-col x-col-90" xid="col11"><span xid="span1" class="detailver" bind-text="debugmode"><![CDATA[版本]]></span></div>
   </div>
  </div></div></div>
  </div>