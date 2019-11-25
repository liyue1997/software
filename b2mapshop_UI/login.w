<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:258px;top:435px;" onLoad="modelLoad" onActive="modelActive"/> 

  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1" style="background-color:#252330;height:100%;width:100%;">
   <div class="x-panel-top" xid="top1"><div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar" xid="titleBar1">
   <div class="x-titlebar-left" xid="left1" style="background-color:#252330;" bind-click="leftClick">
       <img src="./img/nav_icon_quxiao.png" alt="" xid="image4" style="width:18px;position:absolute;top:18px;"></img></div>
   <div class="x-titlebar-title" xid="title1" style="background-color:#252330;"></div>
   <div class="x-titlebar-right reverse" xid="right1" style="background-color:#252330;"></div>
  </div></div>
   <div class="x-panel-content" xid="content1"><div class="list-group" xid="listGroup2" bind-visible="showlogin" style="position:absolute;top:30%;">
   <div xid="div2" class="list-group-item"><div class="input-group" component="$UI/system/components/bootstrap/inputGroup/inputGroup" xid="inputGroup1" style="background-color:#252330;border-bottom-style:solid;border-bottom-width:1px;border-bottom-color:#FFFFFF;">
   <span class="input-group-addon" xid="span3" style="border-style:none none none none;font-size:17px;"><![CDATA[+86]]></span>
  <input type="text" class="form-control" component="$UI/system/components/justep/input/input" xid="inputModileNumber" placeHolder="请输入手机号" style="font-size:17px;background-color:#252330;border-style:none none none none;color:#FFFFFF;width:100%;"></input>
  </div>
  </div>
  <div xid="div3" class="list-group-item"><div class="input-group" component="$UI/system/components/bootstrap/inputGroup/inputGroup" xid="inputGroup2" style="background-color:#252330;border-bottom-style:solid;border-bottom-width:1px;border-bottom-color:#FFFFFF;">
   <input component="$UI/system/components/justep/input/password" class="form-control" xid="password1" style="font-size:17px;background-color:#252330;border-style:none none none none;color:#FFFFFF;width:100%;" placeHolder="请输入密码"></input></div>
  </div><div xid="div6" class="twospans"><button xid="button1" class="button1" bind-click="button1Click"><![CDATA[忘记密码]]></button>
  <button xid="button2" class="button2" bind-click="button4Click"><![CDATA[注册]]></button></div>
  <div xid="div5" class="list-group-item" style="text-align:center;margin-top:40px;"><button xid="loginBtn" style="border-style:none none none none;" bind-click="loginBtnClick" class="loginBtn">登录</button>
  </div>
  </div>
  <div xid="div1"><h2 xid="h21" class="titleh2"><![CDATA[请输入账号密码]]></h2></div>
  </div>
   <div class="x-panel-bottom" xid="bottom2" height="88" style="position:fixed;" bind-visible="true"><div xid="div8" class="div8"><div xid="div4" class="div4"><span xid="span5" class="span5" style="position:relative;right:4px;"></span>
  <span xid="span6" class="span6"><![CDATA[其它登录方式]]></span>
  <span xid="span7" class="span5" style="position:relative;left:4px;"></span><div component="$UI/system/components/justep/row/row" class="x-row text-center" xid="row4">
   <div class="x-col" xid="col11"><img src="./img/icon_weixin.png" alt="" xid="image2" bind-attr-src="$model.toUrl('./img/weixin.png')" height="40" style="width:40;" bind-click="image2Click"></img></div>
   </div></div></div></div></div></div>