<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:80px;left:0px;height:auto;" onLoad="modelLoad"> 
  </div>
   
  <div component="$UI/system/components/justep/wing/wing" class="x-wing x-wing-xs"
    xid="wing" routable="false" display="push" animate="false"> 
    <div class="x-wing-left" xid="left" style="width:250px;"/>  
    <div class="x-wing-content" xid="conter"> 
      <div class="x-wing-backdrop" xid="div1" style="display:none;"/>  
      <div component="$UI/system/components/justep/contents/contents" class="x-contents x-full"
        active="0" xid="pages" swipe="false" slidable="true">
        <div class="x-contents-content" xid="main">
          <div component="$UI/system/components/justep/windowContainer/windowContainer"
            class="x-window-container" xid="windowContainer1" src="$UI/b2mapshop_UI/main.w"/>
        </div>
      </div> 
    </div> 
  </div> 
 </div>