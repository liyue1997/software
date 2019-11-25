<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" onLoad="modelLoad" style="top:23px;left:89px;height:auto;"/> 
<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1">
   <div class="x-panel-top" xid="top1">
    <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar" xid="titleBar1">
     <div class="x-titlebar-left" xid="left1" style="background-color:#252330;" bind-click="leftClick">
      <img src="./img/nav_icon_quxiao.png" alt="" xid="image4" style="width:18px;position:absolute;top:18px;"></img></div> 
     <div class="x-titlebar-title" xid="title1" style="background-color:#252330;"></div>
     <div class="x-titlebar-right reverse" xid="right1" style="background-color:#252330;"></div></div> </div> 
   <div class="x-panel-content" xid="content1">
   <h2 xid="h21" class="findpwdtitle"><![CDATA[找回密码]]></h2>
    <div class="list-group" xid="listGroup" bind-visible="showlogin">
     <div xid="div2" class="list-group-item">
      <div class="input-group" component="$UI/system/components/bootstrap/inputGroup/inputGroup" xid="inputGroup1" style="background-color:#252330;border-bottom-style:solid;border-bottom-width:1px;border-bottom-color:#FFFFFF;">
       <span class="input-group-addon" xid="span3">+86</span><input type="text" class="form-control phoneinput" component="$UI/system/components/justep/input/input" xid="inputMobileNumber" placeHolder="请输入手机号" style="width:60%;"></input>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-only-label center-block btnyzm" label="获取验证码" xid="yzmbutton" bind-disable="yzmdisable" onClick="button1Click">
   <i xid="i1"></i>
   <span xid="span4">获取验证码</span></a></div> </div> 
     <div xid="div3" class="list-group-item">
      
  <div class="input-group" component="$UI/system/components/bootstrap/inputGroup/inputGroup" xid="inputGroup3" style="background-color:#252330;border-bottom-style:solid;border-bottom-width:1px;border-bottom-color:#FFFFFF;">
   <span class="input-group-addon" xid="span1" style="width:90px;"><![CDATA[验证码]]></span>
   <input type="text" class="form-control yzminput" component="$UI/system/components/justep/input/input" xid="yzminput" placeHolder="请输入验证码" style="width:100%;"></input></div></div> 
     <div xid="div6" class="list-group-item">
   <div class="input-group" component="$UI/system/components/bootstrap/inputGroup/inputGroup" xid="inputGroup4" style="background-color:#252330;border-bottom-style:solid;border-bottom-width:1px;border-bottom-color:#FFFFFF;">
    <span class="input-group-addon " xid="span2" style="width:90px;"><![CDATA[密  码]]></span>
    <input component="$UI/system/components/justep/input/password" class="form-control pwdinputfirst" xid="passwordinput" style="width:100%;" placeHolder="请输入新密码"></input></div> 
  </div>
  <div xid="div7" class="list-group-item">
   <div class="input-group" component="$UI/system/components/bootstrap/inputGroup/inputGroup" xid="inputGroup5" style="background-color:#252330;border-bottom-style:solid;border-bottom-width:1px;border-bottom-color:#FFFFFF;">
    <span class="input-group-addon" xid="span3" style="width:90px;"><![CDATA[确认密码]]></span>
    <input component="$UI/system/components/justep/input/password" class="form-control pwdinputsecond" xid="passwordinput2" style="width:100%;" placeHolder="请再次输入新密码"></input></div> 
  </div>
     
     <div xid="div5" class="list-group-item" style="text-align:center;margin-top:40px;">
      <button xid="OKBtn" style="border-style:none none none none;" bind-click="OKBtnClick" class="okbutton"><![CDATA[确定]]></button></div> 
</div> 
</div>
  <div class="x-panel-bottom" xid="bottom2"></div>
   </div></div>