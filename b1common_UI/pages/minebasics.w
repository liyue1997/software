<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;" xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:-1px;left:244px;" onLoad="modelLoad" onParamsReceive="modelParamsReceive"> 
  <div component="$UI/system/components/justep/data/baasData" autoLoad="true" xid="personInfoData" idColumn="username" 
   onCustomRefresh="personInfoDataCustomRefresh" confirmDelete="false" confirmRefresh="false" onCustomSave="personInfoDataCustomSave">
  <column label="用户昵称" name="username" type="String" xid="xid2"></column>
  <column label="登录账号" name="user_account" type="String" xid="xid3"></column>
  <column label="最后登录IP" name="last_ip" type="String" xid="xid5"></column>
  <column label="最后登录系统" name="last_os" type="String" xid="xid10"></column>
  <column label="最后登录时间" name="last_time" type="String" xid="xid10"></column>
  <column label="图片" name="t_picture" type="String" xid="xid10"></column></div></div>  
  <div component="$UI/system/components/justep/panel/panel" 
    class="x-panel x-full" xid="panel1"> 
      <div class="x-panel-top" xid="top1"> 
        <div component="$UI/system/components/justep/titleBar/titleBar" title="基础信息"
          class="x-titlebar">
          <div class="x-titlebar-left"> 
            <a component="$UI/system/components/justep/button/button"
              label="" class="btn btn-link btn-only-icon btnback" icon="icon-chevron-left"
              onClick="{operation:'window.close'}" xid="backBtn"> 
              <i class="icon-chevron-left"/>  
              <span></span> 
            </a> 
          </div>  
          <div class="x-titlebar-title">基础信息</div>  
          <div class="x-titlebar-right reverse"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-sm" label="保存" xid="btnSave" onClick="btnSaveClick" style="color:#1ca670;font-size:14px;height:26px;">
   <i xid="i1"></i>
   <span xid="span1">保存</span></a></div>
        </div> 
      </div>  
    <div class="x-panel-content" xid="content1"><div component="$UI/system/components/justep/panel/panel" class="panel panel-default x-card" xid="panel2">
   
    
  
  
  
    
  
  <div component="$UI/system/components/justep/row/row" class="x-row mainrow" xid="row2">
   <div class="x-col" xid="col6"><div component="$UI/system/components/justep/row/row" class="x-row" xid="picRow" bind-click="picRowClick">
   <div class="x-col x-col-center" xid="colpic1">
    <span xid="spanpic1">头像</span></div> 
   <div class="x-col" xid="colpic3">
    
    <img bind-attr-src='$model.personInfoData.val("t_picture")'
      xid="image1" class="pull-right imgPicLink" ></img>
     
    </div> </div><div component="$UI/system/components/justep/row/row" class="x-row" xid="nickNameRow" bind-click="nickNameRowClick">
   <div class="x-col" xid="col1"><span xid="span2"><![CDATA[登录账户]]></span></div>
   <div class="x-col" xid="col3" style="height:100%;"><span xid="nickNameSpan" class="pull-right nickNameSpan" bind-text='$model.personInfoData.val("user_account")'></span></div></div>
   <div component="$UI/system/components/justep/row/row" class="x-row" xid="realNameRow" bind-click="realNameRowClick">
   <div class="x-col" xid="col15">
    <span xid="span10"><![CDATA[真实姓名]]></span></div> 
   <div class="x-col" xid="col14">
    <span xid="realNameSpan" class="pull-right realNameSpan" bind-text='$model.personInfoData.val("username")'></span></div> </div></div>
   </div>
  <div component="$UI/system/components/justep/row/row" class="x-row minorrow" xid="row3">
   <div class="x-col" xid="col9"><div component="$UI/system/components/justep/row/row" class="x-row" xid="carRow" bind-click="carowClick">
   <div class="x-col" xid="col16">
    <span xid="span12"><![CDATA[最后登录IP]]></span></div> 
   <div class="x-col" xid="col17">
    <span xid="t_car" bind-text='$model.personInfoData.val("last_ip")' class="pull-right t_car"></span></div> </div><div component="$UI/system/components/justep/row/row" class="x-row" xid="companyRow" bind-click="companyrowClick">
   <div class="x-col" xid="col16">
    <span xid="span12"><![CDATA[最后登录时间]]></span></div> 
   <div class="x-col" xid="col17">
    <span xid="t_company" bind-text='$model.personInfoData.val("last_time")' class="pull-right t_company"></span></div> </div></div>
   </div>
  <div component="$UI/system/components/justep/row/row" class="x-row assitrow" xid="row1">
   <div class="x-col" xid="col2"><div component="$UI/system/components/justep/row/row" class="x-row" xid="companyRow" bind-click="qqRowClick">
   <div class="x-col" xid="col16">
    <span xid="span12"><![CDATA[最后登录系统]]></span></div> 
   <div class="x-col" xid="col17">
    <span xid="t_qq" bind-text='$model.personInfoData.val("last_os")' class="pull-right t_qq"></span></div> </div></div>
   </div></div> 
  </div>
     </div>
<span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog1" onReceive="windowDialog1Receive" style="top:24px;left:143px;"></span>
  </div>