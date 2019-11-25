<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window othWindow" component="$UI/system/components/justep/window/window" design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:53px;left:381px;" onLoad="modelLoad">
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="sumsData" onCustomRefresh="sumsDataCustomRefresh"></div><div component="$UI/system/components/justep/data/data" autoLoad="true" xid="FLuckListFunData" idColumn="ID" onCustomRefresh="FLuckListFunDataCustomRefresh">
   <column label="功能ID" name="ID" type="String" xid="column1"></column>
   <column label="功能名称" name="listFunName" type="String" xid="column2"></column>
   <column label="功能图标" name="listFunIcon" type="String" xid="column3"></column>
   <column label="功能描述" name="listFunDesc" type="String" xid="column4"></column>
   <column label="功能链接" name="listFunUrl" type="String" xid="xid5"></column>
   <column label="功能类型" name="listFunType" type="String" xid="xid6"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="myInfoData" idColumn="ID" onCustomRefresh="myInfoDataCustomRefresh"><column label="用户ID" name="ID" type="String" xid="xid1"></column>
  <column label="手机" name="TEL" type="String" xid="xid2"></column>
  <column label="昵称" name="nickName" type="String" xid="xid3"></column>
  <column label="头像" name="head" type="String" xid="xid4"></column></div></div> 
<span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog6" src="./shareCommon.w"></span><div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1">
   <div class="x-panel-content" xid="content1"><div component="$UI/system/components/justep/panel/panel" class="panel panel-default x-card" xid="panel2" style="border:0;">
   <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar" xid="titleBar2">
    <div class="x-titlebar-left" xid="left2"><a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon" label="button" xid="btnPerInfo" icon="glyphicon glyphicon-cog" onClick="btnPerInfoClick">
   <i xid="i3" class="glyphicon glyphicon-cog"></i>
   <span xid="span1"></span></a></div>
    <div class="x-titlebar-title" xid="title2"></div>
    <div class="x-titlebar-right reverse" xid="right2">
     <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon" label="button" xid="btnSetup" icon="icon-android-share" onClick="btnSetupClick">
      <i xid="i1" class="icon-android-share"></i>
      <span xid="span2"></span></a> 
  <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon" label="button" xid="btnChat" icon="icon-android-forums" onClick="btnChatClick">
   <i xid="i4" class="icon-android-forums"></i>
   <span xid="span5"></span></a>
  </div> 
  </div> 
   <div xid="headDiv" class="headDiv">
    <div xid="headPicDiv" class="headPicDiv">
     <div xid="headImgDiv" class="headImgDiv" bind-click="headImgDivClick">
   <img src="../images/fluck-headImg.png" alt="" xid="image3"></img></div><div component="$UI/system/components/justep/row/row" class="x-row" xid="row2">
      <div class="x-col x-col-center" xid="col6" style="text-align:center;">
       <div xid="div4">
        <span xid="span3" bind-click="span3Click">请先登录
  </span></div> 
       </div> 
      <div class="x-col x-col-fixed x-col-center" xid="col7" style="width:auto;display:none;">
       <i xid="i2" class="icon-chevron-right" style="color:#FFFFFF;"></i></div> </div> 
  </div> </div> 
   <div xid="titleBottom" class="titleBottom"><div component="$UI/system/components/justep/button/buttonGroup" class="btn-group x-card btn-group-justified" tabbed="true" xid="buttonGroup3"><a component="$UI/system/components/justep/button/button" class="btn btn-default" xid="btnMyAntique" onClick="btnMyAntiqueClick">
   <div><span xid="countGoods">0</span></div>
   <div><span>我的古玩</span></div></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="button" xid="btnMyCollections" onClick="btnMyCollectionsClick">
   <div><span xid="countCollections">0</span></div>
   <div><span xid="span11">我的收藏</span></div></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="button" xid="btnMyFinds" onClick="btnMyFindsClick">
    <div><span xid="countFinds">0</span></div>
   <div><span xid="span4">我的动态</span></div></a></div></div>
  </div>
  <div component="$UI/system/components/justep/panel/panel" class="panel panel-default x-card" xid="panel3">
   <div component="$UI/system/components/justep/list/list" class="x-list" xid="list2" data="FLuckListFunData">
    <ul class="x-list-template" xid="listTemplateUl2">
     <li xid="listFun" class="listFun" bind-click="listFunClick">
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row2">
       <div class="x-col x-col-fixed" xid="col5" style="width:auto;">
        <img src="./images/update-password.png" alt="" xid="image1" style="width:30px;" bind-attr-src=' val("listFunIcon")'></img></div> 
       <div class="x-col x-col-center borderLi" xid="col5">
        <span xid="span7" bind-text=' val("listFunName")' class="pull-left"><![CDATA[修改密码]]></span></div> 
       <div class="x-col x-col-fixed x-col-center borderLi" xid="col9" style="width:auto;">
        <i xid="i7" class="icon-ios7-arrow-forward"></i></div> </div> 
  </li> </ul> </div> 
  <div component="$UI/system/components/justep/list/list" class="x-list" xid="list1">
   <ul class="x-list-template" xid="listTemplateUl1">
    <li xid="li1" class="listFun"><div component="$UI/system/components/justep/row/row" class="x-row" xid="row3" bind-visible="false">
   <div class="x-col x-col-fixed" xid="col3" style="width:auto;">
    <img src="../function4/images/index-fun-money.png" alt="" xid="image4" style="width:30px;"></img></div> 
   <div class="x-col x-col-center borderLi" xid="col3" bind-click="col2Click">
    <span xid="span6" class="pull-left">支付</span></div> 
   <div class="x-col x-col-fixed x-col-center borderLi" xid="col4" style="width:auto;">
    <i xid="i5" class="icon-ios7-arrow-forward"></i></div> </div></li></ul> </div></div>
  <div component="$UI/system/components/justep/panel/panel" class="panel panel-default x-card" xid="panel4"><button xid="btnQuit" class="btnQuit" bind-click="btnQuitClick"><![CDATA[退 出]]></button></div>
  </div>
   </div>
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="messageDialog"></span><span component="$UI/system/components/justep/messageDialog/messageDialog" xid="messageDialog6" title="充值" message="请输入金额" type="Prompt" onOK="messageDialog6OK"></span><span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog1" onReceived="windowDialog1Received" forceRefreshOnOpen="true"></span>
  <span class="winDia2" component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog2" src="$UI/p_common/payCommon.w" status="normal" onReceive="windowDialog2Receive" top="calc(100% - 156px)" height="156px" width="100%"></span>
  <div xid="dialog"></div></div>