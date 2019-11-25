<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:-4px;left:261px;" onLoad="modelLoad" onActive="modelActive"/> 
<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1">
   <div class="x-panel-top" xid="top1"><div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar" xid="titleBar1" title="登录" style="color:#000000;">
   <div class="x-titlebar-left" xid="left1"><a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon" label="button" xid="btnClose" icon="icon-android-close" style="color:#FB4747;" onClick="btnCloseClick">
   <i xid="i1" class="icon-android-close"></i>
   <span xid="span1"></span></a></div>
   <div class="x-titlebar-title" xid="title1">登录</div>
   <div class="x-titlebar-right reverse" xid="right1"></div></div></div>
   <div class="x-panel-content" xid="content1" style="height:480px;"><div xid="header" class="header" style="background-color:#efeff4;">
   </div>
  <div xid="loginInfo" class="loginInfo"><div component="$UI/system/components/justep/row/row" class="x-row rowDiv" xid="row4" style="border-bottom-style:solid;border-bottom-width:1px;">
   <div class="x-col x-col-fixed x-col-center" xid="col6" style="width:auto;">
    <label xid="labPhone" class="lableNew" style="color:#929292;">账户</label></div> 
   <div class="x-col x-col-center" xid="col2">
    <input component="$UI/system/components/justep/input/input" class="form-control" xid="inputModileNumber" placeHolder="请输入您的手机号" style="margin-left:10px;border:0;width:200px;" onFocus="inputModileNumberFocus" onBlur="password1Blur"></input></div> 
   </div>
  <div component="$UI/system/components/justep/row/row" class="x-row rowDiv" xid="row1">
   <div class="x-col x-col-fixed x-col-center" xid="col1" style="width:auto;">
    <label xid="label1" class="lableNew" style="color:#929292;"><![CDATA[密码]]></label></div> 
   <div class="x-col x-col-center" xid="col4">
    <input component="$UI/system/components/justep/input/password" class="form-control" xid="password1" placeHolder="请输入登录密码" style="margin-left:10px;width:200px;" bind-focus="inputModileNumberFocus" bind-blur="password1Blur"></input></div> 
   </div></div>
  <div xid="div1" class="header" style="background-color:#efeff4;"></div><div xid="div2" class="div2" style="font-weight:bold;text-align:right;margin-top:15px;margin-right:5px;"><span xid="span5" bind-click="span5Click" style="font-size:medium;"><![CDATA[忘记密码]]></span></div><div xid="acc-login" class="acc-login"><button xid="btnLogin" class="btnLogin" bind-click="btnLoginClick"><![CDATA[登 录]]></button></div>
  <div xid="div3" class="div3" style="font-weight:bold;text-align:right;margin-top:15px;margin-right:5px;">
   <span xid="span2" style="font-size:medium;"><![CDATA[]]></span></div></div>
   <div class="x-panel-bottom" xid="bottom1"><div xid="acc-register" class="acc-register">
   
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row2">
   <div class="x-col" xid="col3"></div>
   <div class="x-col x-col-33" xid="col5"><button xid="btnReg" class="btnReg" bind-click="btnRegClick" bind-visible="showzhuce"><![CDATA[注册]]></button></div>
   <div class="x-col" xid="col7"></div></div></div></div></div></div>