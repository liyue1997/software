<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;" xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="left:18px;top:83px;height:244px;" onLoad="modelLoad"> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" 
    class="x-panel x-full" xid="panel1"> 
      <div class="x-panel-top" xid="top1"> 
        <div component="$UI/system/components/justep/titleBar/titleBar" title="重置密码"
          class="x-titlebar">
          <div class="x-titlebar-left"> 
            <a component="$UI/system/components/justep/button/button"
              label="" class="btn btn-link btn-only-icon btnback" icon="icon-chevron-left"
              onClick="{operation:'window.close'}" xid="backBtn"> 
              <i class="icon-chevron-left"/>  
              <span></span> 
            </a> 
          </div>  
          <div class="x-titlebar-title">重置密码</div>  
          <div class="x-titlebar-right reverse"> 
          </div>
        </div> 
      </div>  
    <div class="x-panel-content" xid="content1"><div component="$UI/system/components/justep/panel/panel" class="panel panel-default x-card" xid="panel2">
   <img src="$UI/b1common/newimages/restopbg.png" alt="" xid="image1" class="bannerimg"></img>
  <div xid="loginInfo" class="loginInfo">
   <div component="$UI/system/components/justep/row/row" class="x-row phonerow" xid="row4">
    <div class="x-col x-col-fixed x-col-center" xid="col6" style="width:auto;">
     <img src="$UI/b1common/newimages/phone.png" alt="" xid="image2" class="phoneimg"></img></div> 
    
  <div class="x-col msginput" xid="col5"><input component="$UI/system/components/justep/input/input" class="form-control" xid="phoneInput" placeHolder="请输入手机号"></input></div></div> 
   <div component="$UI/system/components/justep/row/row" class="x-row CodeRow" xid="CodeRow">
   <div class="x-col x-col-center" xid="col1">
    <input component="$UI/system/components/justep/input/input" class="inputCode form-control" xid="inputCode" placeHolder="请输入验证码"></input></div> 
   <div class="x-col x-col-fixed x-col-center" xid="col2" style="width:auto;">
    <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-sm btnSendSms" label="获取验证码" xid="btnSendSms" onClick="btnSendSmsClick">
     <i xid="i4"></i>
     <span xid="span4">获取验证码</span></a> </div> </div><div component="$UI/system/components/justep/row/row" class="x-row pwdrow" xid="row1">
    <div class="x-col x-col-fixed x-col-center" xid="col4" style="width:auto;">
     <img src="$UI/b1common/newimages/password.png" alt="" xid="image3" class="pwdimg"></img></div> 
    <div class="x-col x-col-center msginput" xid="col4">
     <input component="$UI/system/components/justep/input/password" class="form-control newpassword" xid="newPasswordInput" placeHolder="请输入新密码"></input></div> </div> </div></div>
  <div xid="acc-login" class="acc-login">
   <button xid="btnLogin" bind-click="btnResetPasswordClick" class="btnlogin"><![CDATA[重置密码]]></button></div>
  </div>
  </div> 
</div>