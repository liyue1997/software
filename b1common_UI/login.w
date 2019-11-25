<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:-4px;left:261px;" onLoad="modelLoad" onActive="modelActive"/> 
<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1">
   <div class="x-panel-content" xid="content1"><div xid="header">
   <img src="$UI/b1common/newimages/logintopbg.png" alt="" xid="image1" class="bannerimg"></img><a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon btnClose" xid="btnClose" icon="icon-chevron-left" onClick="btnCloseClick">
   <i xid="i1" class="icon-chevron-left"></i>
   <span xid="span1"></span></a></div>
  <div xid="loginInfo" class="loginInfo"><div component="$UI/system/components/justep/row/row" class="x-row row4" xid="row4">
   <div class="x-col x-col-fixed x-col-center" xid="col6" style="width:auto;">
    <img src="$UI/b1common/newimages/phone.png" alt="" xid="image2" class="phoneimg"></img></div> 
   <div class="x-col x-col-center" xid="col2" style="margin-left:5px;border-bottom: 1px solid #E5E5E5;">
    <input component="$UI/system/components/justep/input/input" class="form-control" xid="inputModileNumber" placeHolder="请输入手机号" onFocus="inputModileNumberFocus" onBlur="password1Blur"></input></div> 
   </div>
  <div component="$UI/system/components/justep/row/row" class="x-row row1" xid="row1">
   <div class="x-col x-col-fixed x-col-center" xid="col1" style="width:auto;">
    <img src="$UI/b1common/newimages/password.png" alt="" xid="image3" class="pwdimg"></img></div> 
   <div class="x-col x-col-center" xid="col4" style="margin-left:5px;border-bottom: 1px solid #E5E5E5;">
    <input component="$UI/system/components/justep/input/password" class="form-control" xid="password1" placeHolder="密码" bind-focus="inputModileNumberFocus" bind-blur="password1Blur"></input></div> 
   </div></div>
  <div xid="acc-login" class="acc-login">
  
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row2">
   <div class="x-col" xid="col3"><button xid="btnLogin" bind-click="btnLoginClick" class="btnLogin">登 录</button></div>
   </div></div>
  <div xid="div2" class="div2"><span xid="span5" bind-click="span5Click" class="forgetpwdspan"><![CDATA[忘记密码?]]></span>
  <span xid="span4" bind-click="btnRegClick" bind-visible="showzhuce" class="registerspan"><![CDATA[注册]]></span>
  
  </div>
  <div xid="div2" class="div2">
   
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row3">
   <div class="x-col" xid="col5"></div>
   <div class="x-col" xid="col7"></div>
   <div class="x-col" xid="col8"><span xid="span2" class="versionnumberspan"><![CDATA[]]></span></div></div></div>
  </div></div></div>