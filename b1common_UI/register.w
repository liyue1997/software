<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;" xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:379px;left:194px;" onLoad="modelLoad"> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" 
    class="x-panel x-full" xid="panel1"> 
      <div class="x-panel-top" xid="top1"> 
        <div component="$UI/system/components/justep/titleBar/titleBar" title="注册"
          class="x-titlebar">
          <div class="x-titlebar-left"> 
            <a component="$UI/system/components/justep/button/button"
              label="" class="btn btn-link btn-only-icon" icon="icon-chevron-left"
              onClick="{operation:'window.close'}" xid="backBtn" style="color:#139462;"> 
              <i class="icon-chevron-left"/>  
              <span></span> 
            </a> 
          </div>  
          <div class="x-titlebar-title">注册</div>  
          <div class="x-titlebar-right reverse"> 
          </div>
        </div> 
      <div component="$UI/system/components/justep/button/buttonGroup" class="tb-tabs btn-group btn-group-justified" tabbed="true" xid="buttonGroup1" style="display:none;"><a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-label active" label="普通用户" xid="button1">
   <i xid="i1"></i>
   <span xid="span1">普通用户</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-label" label="经理人" xid="button2">
   <i xid="i2"></i>
   <span xid="span2">经理人</span></a></div>
  </div>  
    <div class="x-panel-content" xid="content1"><div component="$UI/system/components/justep/panel/panel" class="x-panel regTitlePanel" xid="regTitlePanel">
   <div xid="regTitleContent" class="regTitleContent">
   <img src="$UI/b1common/newimages/restopbg.png" alt="" xid="image1" class="bannerimg">
   </img><div xid="withLineDiv" class="withLineDiv">
    <span xid="line" class="line"></span>
    <span xid="span3" class="play"></span>
    <span xid="lineSpan" class="lineSpan lineSpan-bg">1</span>
    <span xid="lineTwoSpan" class="lineTwoSpan lineTwoSpan2">2</span>
    <span xid="lineThreeSpan" class="lineThreeSpan">3</span></div> 
  </div>
  <div component="$UI/system/components/justep/contents/contents" class="x-contents" active="0" xid="contents1" slidable="true" swipe="false" wrap="false">
   <div class="x-contents-content" xid="content2"><div component="$UI/system/components/justep/row/row" class="x-row row2" xid="row2">
   <div class="x-col x-col-fixed x-col-center" xid="col8" style="width:auto;">
   <img src="$UI/b1common/newimages/phone.png" alt="" xid="image3" style="width:15px;height:25px;"></img></div>
  <div class="x-col" xid="col9" style="margin-left:5px"><input component="$UI/system/components/justep/input/input" class="form-control inputPhone" xid="inputPhone" placeHolder="请输入手机号"></input></div></div>
  <div xid="codeDiv" class="codeDiv">
   <a component="$UI/system/components/justep/button/button" class="btnCode btn btn-default" label="获取验证码" xid="btnCode" onClick="btnCodeClick">
    <i xid="i3"></i>
    <span xid="span11">获取验证码</span></a> </div><div xid="treatyDiv" class="treatyDiv"><span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="checkbox1" checked="true"></span>
  <span xid="span18"><![CDATA[我已同意并阅读]]></span>
  <span xid="treatyLink" class="treatyLink" bind-click="treatyLinkClick"><![CDATA[系统许可协议]]></span></div>
  </div>
   <div class="x-contents-content" xid="content3"><div component="$UI/system/components/justep/row/row" class="x-row CodeRow" xid="CodeRow">
   <div class="x-col" xid="col1">
   <input component="$UI/system/components/justep/input/input" class="inputCode form-control" xid="inputCode" placeHolder="请输入验证码"></input>
  </div><div class="x-col x-col-fixed x-col-center" xid="col2" style="width:auto;"><a component="$UI/system/components/justep/button/button" class="btn btn-default btnSendSms" label="获取验证码" xid="btnSendSms" onClick="btnSendSmsClick">
   <i xid="i4"></i>
   <span xid="span4">获取验证码</span></a></div>
   </div>
  <div xid="submitCodeDiv" class="submitCodeDiv">
   <a component="$UI/system/components/justep/button/button" class="btnsubmitCode btn btn-default" label="提交验证码" xid="button3" onClick="button3Click">
    <i xid="i5"></i>
    <span xid="span5">提交验证码</span></a> </div></div>
  <div class="x-contents-content" xid="content4"><div component="$UI/system/components/justep/row/row" class="x-row row3" xid="row3">
   
   <div class="x-col x-col-fixed x-col-center" xid="col18" style="width:auto;">
   <img src="$UI/b1common/newimages/password.png" alt="" xid="image6" class="pwdone"></img></div><div class="x-col x-col-center" xid="col10"><input component="$UI/system/components/justep/input/password" class="password form-control" xid="password" placeHolder="请设置密码"></input></div></div>
  <div component="$UI/system/components/justep/row/row" class="x-row row4" xid="row4">
   <div class="x-col x-col-fixed x-col-center" xid="col16" style="width:auto;">
   <img src="$UI/b1common/newimages/repwd.png" alt="" xid="image4" class="pwdtwo"></img></div><div class="x-col x-col-center" xid="col13"><input component="$UI/system/components/justep/input/password" class="form-control password" xid="again-password" placeHolder="请确认密码"></input></div>
   </div><div component="$UI/system/components/justep/row/row" class="x-row QQDiv" xid="row1">
   <div class="x-col x-col-fixed x-col-center" xid="col3" style="width:auto;"><img src="$UI/b1common/newimages/name.png" alt="" xid="image2" class="qqimg"></img></div>
   <div class="x-col x-col-center" xid="col4"><input component="$UI/system/components/justep/input/input" class="form-control password" xid="nameInput" placeHolder="请输入您的姓名"></input></div>
   </div><div xid="regDiv" class="regDiv" style="margin-bottom:5%;;padding-right:10%;padding-left:10%;">
   <a component="$UI/system/components/justep/button/button" class="btnReg btn btn-default" label="注册" xid="btnReg" onClick="btnRegClick">
    <i xid="i7"></i>
    <span xid="span7">注册</span></a> </div></div></div>
   
   
  </div>
  </div>
  </div> 
</div>