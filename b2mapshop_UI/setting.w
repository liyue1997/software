<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:291px;left:115px;" onModelConstruct="modelModelConstruct"></div> 
<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1" style="background-color:#252330;">
   <div class="x-panel-top" xid="top1"><div component="$UI/system/components/justep/row/row" class="x-row" xid="row1" style="margin:0px 0px 0px 0px;padding:0px 0px 0px 0px;">
   <div class="x-col x-col-20" xid="col1">
    <a component="$UI/system/components/justep/button/button" label="" class="btn btn-link btn-sm btn-only-icon" onClick="{operation:'window.close'}" xid="backBtn" icon="img:$UI/b2mapshop_UI/img/nav_icon_fanhui.png">
   <img src="$UI/b2mapshop_UI/img/nav_icon_fanhui.png" xid="image6" style="width:20px;" height="20px"></img>
   <span xid="span1"></span></a></div> 
   <div class="x-col" xid="col2" style="padding:0px 0px 0px 0px;margin:0px 0px 0px 0px;">
    <h3 xid="h31" style="text-align:center;color:#FFFFFF;line-height:48px;margin:0 auto;height:48px;padding:0px 0px 0px 0px;"><![CDATA[设置]]></h3></div> 
   <div class="x-col x-col-20" xid="col3"><h4 xid="h41" style="color:#FFFFFF;font-size:15px;text-align:center;" bind-click="saveUserBtnClick"><![CDATA[保存]]></h4></div></div></div>
   <div class="x-panel-content" xid="content1"><div xid="div1" style="background-color:#2B2B38;"><form class="form-horizontal" xid="form1">
   <div class="form-group" xid="formGroup4">
   <label class="col-xs-3 control-label" style="word-spacing:20px;padding-top:12px;text-align:center;font-size:15px;" xid="controlLabel4"><![CDATA[头像]]></label>
   <div class="col-xs-9" xid="col16" style="text-align:right;">
    <img alt="" xid="image1" class="setImg" bind-click="image1Click" id="setting_headpic"></img>
  <input type="file" value="" xid="selectImage" accept="image/*" style="display:none;" bind-change="selectImageChange"></input></div> </div>
   <div class="form-group" xid="formGroup1">
    <label class="col-xs-3 control-label" style="word-spacing:20px;padding-top: 12px;text-align:center;font-size:15px;" xid="controlLabel1">姓名</label>
    <div class="col-xs-9" xid="col13">
     <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="edtusername" style="border-style:none none none none;background-color:transparent;text-align:right;" bind-ref='username'></input></div> </div> 
   <div class="form-group" xid="formGroup2">
    <label class="col-xs-3 control-label" style="word-spacing:20px;padding-top: 12px;text-align:center;font-size:15px;" xid="controlLabel2">电话</label>
    <div class="col-xs-9" xid="col14">
     <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="input8" style="background-color:transparent;border-style:none none none none;text-align:right;" bind-ref='phone'></input></div> </div> 
   </form>
  </div>
  </div>
   <div class="x-panel-bottom" xid="bottom1"></div></div></div>