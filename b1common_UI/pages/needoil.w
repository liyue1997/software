<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:-4px;left:261px;" onLoad="modelLoad" onActive="modelActive"/> 
<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1">
   <div class="x-panel-top" xid="top1"><div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar" xid="titleBar1" title="我要加油">
   <div class="x-titlebar-left" xid="left1"><a component="$UI/system/components/justep/button/button" class="btn btn-link closebtn" xid="btnClose" icon="icon-chevron-left" onClick="btnCloseClick">
   <i xid="i1" class="icon-chevron-left"></i>
   <span xid="span1"></span></a></div>
   <div class="x-titlebar-title" xid="title1">我要加油</div>
   <div class="x-titlebar-right reverse" xid="right1"></div></div></div>
   <div class="x-panel-content" xid="content1"><div xid="header" class="header">
   </div>
  <div xid="loginInfo" class="loginInfo">
  <div component="$UI/system/components/justep/row/row" class="x-row rowDiv" xid="row4" style=" ">
   <div class="x-col x-col-fixed x-col-center leftcol" xid="col6">
       <span xid="spnt2" class="spncaption"><![CDATA[今日单价 ]]></span>
    </div> 
   <div class="x-col x-col-center" xid="col2">
       <span xid="spntoday" class="spntext"><![CDATA[￥6.00元/升]]></span>
    </div> 
   </div>
  <div component="$UI/system/components/justep/row/row" class="x-row rowDiv" xid="row1">
   <div class="x-col x-col-fixed x-col-center leftcol" xid="col1">
      <span xid="spn3" class="spncaption"><![CDATA[加油升数 ]]></span></div> 
   <div class="x-col x-col-center" xid="col4">
    
  <input component="$UI/system/components/justep/input/input" class="form-control" xid="inputvalue" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')" placeHolder="请输入整数，最小为1" onChange="inputvalueChange"></input></div> 
   </div>
   
   <div component="$UI/system/components/justep/row/row" class="x-row rowDiv" xid="row4" style=" ">
   <div class="x-col x-col-fixed x-col-center leftcol" xid="col6">
       <span xid="spn4" class="spncaption"><![CDATA[预估费用 ]]></span>
    </div> 
   <div class="x-col x-col-center" xid="col2" >
       
    <span xid="span5" class="spntext"><![CDATA[￥]]></span><span xid="spnprice" class="spntextprice">xx</span><span xid="span4" class="spntext"><![CDATA[元]]></span>
  </div> 
   </div>
   
   
   </div>
  <div xid="div2" class="div2"></div>
  <div xid="acc-login" class="acc-login"><button xid="btnLogin" class="btnLogin" bind-click="btnLoginClick"><![CDATA[申请加油]]></button></div>
  
  <div xid="loginInfo" class="loginInfo">
  <div component="$UI/system/components/justep/row/row" class="x-row rowDiv" xid="row4" style=" ">
   <div class="x-col x-col-fixed x-col-center" xid="col6" style="width:auto;">
       <div component="$UI/system/components/justep/row/row" class="x-row rowDiv" xid="row4" style=" ">
   <div class="x-col x-col-center" xid="col2">
       <span xid="spnserver" class="spntext" style="color:#139462;"><![CDATA[*活动期间免服务费用！]]></span>
    </div> 
   </div><div component="$UI/system/components/justep/row/row" class="x-row rowDiv" xid="row6" style=" ">
   <div class="x-col x-col-center" xid="col7">
    <span xid="spantime" class="spntext" style="color:#139462;"><![CDATA[*2:00到5:00根据法律规定不提供服务!]]></span></div> </div><div component="$UI/system/components/justep/row/row" class="x-row" xid="row5">
   <div class="x-col" xid="col11"><span xid="spntoday" class="spndesc"><![CDATA[*请保持手机畅通，马上为您安排师傅]]></span></div>
   </div><div component="$UI/system/components/justep/row/row" class="x-row" xid="row3">
   <div class="x-col" xid="col8"><span xid="spntoday" class="spndesc"><![CDATA[*预估费用仅供参考，申请加油后，送油师傅将联系您确认金额]]></span></div>
   </div><div component="$UI/system/components/justep/row/row" class="x-row" xid="row2">
   <div class="x-col" xid="col3"><span xid="spntoday" class="spndesc"><![CDATA[*预估费用=柴油今日单价*加油升数+服务费用]]>
  </span>
  </div>
   </div>
       
       
    </div> 
   
   </div></div>
  </div>
   </div></div>