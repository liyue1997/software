<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;"
  xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="left:18px;top:83px;height:244px;"></div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" title="修改密码"
        class="x-titlebar"> 
        <div class="x-titlebar-left"> 
          <a component="$UI/system/components/justep/button/button" label=""
            class="btn btn-link btn-only-icon btnback" icon="icon-chevron-left" onClick="{operation:'window.close'}"
            xid="backBtn"> 
            <i class="icon-chevron-left"/>  
            <span/> 
          </a> 
        </div>  
        <div class="x-titlebar-title">修改密码</div>  
        <div class="x-titlebar-right reverse"></div> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1" style="background-color:white;">
      <img src="$UI/b1common/newimages/restopbg.png" alt="" xid="image1" height="30%" class="bannerimg"></img><div component="$UI/system/components/justep/panel/panel" class="panel panel-default x-card"
        xid="panel2"><div component="$UI/system/components/justep/row/row" class="x-row oldpwdrow" xid="row1">
   <div class="x-col x-col-fixed x-col-center" xid="col1" style="width:auto;">
    <img src="$UI/b1common/newimages/oldpwd.png" alt="" xid="image2" class="oldimg"></img></div> 
   <div class="x-col x-col-center" xid="col2">
    <input component="$UI/system/components/justep/input/password" class="form-control" xid="oldPasswordInput" placeHolder="请输入原来的密码"></input></div> </div>
  <div component="$UI/system/components/justep/row/row" class="x-row newpwdrow" xid="row3">
   <div class="x-col x-col-fixed x-col-center" xid="col18" style="width:auto;">
    <img src="$UI/b1common/newimages/password.png" alt="" xid="image6" class="newimg"></img></div> 
   <div class="x-col x-col-center" xid="col10">
    <input component="$UI/system/components/justep/input/password" class="password form-control" xid="newPasswordInput" placeHolder="请输入新密码"></input></div> </div>
  <div component="$UI/system/components/justep/row/row" class="x-row renewpwdrow" xid="row4">
   <div class="x-col x-col-fixed x-col-center" xid="col16" style="width:auto;">
    <img src="$UI/b1common/newimages/repwd.png" alt="" xid="image4" class="oldimg"></img></div> 
   <div class="x-col x-col-center" xid="col13">
    <input component="$UI/system/components/justep/input/password" class="form-control password" xid="password2" placeHolder="请再次输入新密码"></input></div> </div>
  </div>
    
  
  <div xid="updatePassword" class="updatePassword"><a component="$UI/system/components/justep/button/button" class="btnUpdatePassword btn btn-default " label="修改密码" xid="btnUpdatePassword" onClick="btnUpdatePasswordClick">
   <i xid="i1"></i>
   <span xid="span1">修改密码</span></a></div>
  </div> 
  </div> 
</div>
