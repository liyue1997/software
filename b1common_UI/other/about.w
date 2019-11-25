<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;" xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:39px;left:50px;height:auto;" onLoad="modelLoad"> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" 
    class="x-panel x-full" xid="panel1"> 
      <div class="x-panel-top" xid="top1"> 
        <div component="$UI/system/components/justep/titleBar/titleBar" title="关于"
          class="x-titlebar">
          <div class="x-titlebar-left"> 
            <a component="$UI/system/components/justep/button/button"
              label="" class="btn btn-link btn-only-icon btnback" icon="icon-chevron-left"
              onClick="{operation:'window.close'}" xid="backBtn"> 
              <i class="icon-chevron-left"/>  
              <span></span> 
            </a> 
          </div>  
          <div class="x-titlebar-title">关于</div>  
          <div class="x-titlebar-right reverse"> 
          </div>
        </div> 
      </div>  
    <div class="x-panel-content" xid="content1"><div component="$UI/system/components/justep/panel/panel" class="x-panel panel panel-default x-card" xid="panel2">
   <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-left abovebtn" label="神速送油" xid="button1">
   <i xid="i1"></i>
   <span xid="span1">神速送油</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-left abovebtn" label="竭诚为您服务" xid="button2" onClick="button2Click">
   <i xid="i2"></i>
   <span xid="span2">竭诚为您服务</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-left finallybtn" label="竭诚为您服务" xid="button5" onClick="button2Click" bind-visible="false">
   <i xid="i5"></i>
   <span xid="span5">竭诚为您服务</span></a>
  </div>
  
  
  <div xid="otherBtn" class="otherBtn"></div></div>
  </div> 
</div>