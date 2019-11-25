<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;" xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="left:18px;top:83px;height:244px;" onLoad="modelLoad"> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" 
    class="x-panel x-full" xid="panel1"> 
      <div class="x-panel-top" xid="top1"> 
        <div component="$UI/system/components/justep/titleBar/titleBar" title="扫描二维码"
          class="x-titlebar">
          <div class="x-titlebar-left"> 
            <a component="$UI/system/components/justep/button/button"
              label="" class="btn btn-link btn-only-icon" icon="icon-chevron-left"
              onClick="{operation:'window.close'}" xid="backBtn"> 
              <i class="icon-chevron-left"/>  
              <span></span> 
            </a> 
          </div>  
          <div class="x-titlebar-title">扫描二维码</div>  
          <div class="x-titlebar-right reverse"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="扫描" xid="button1" onClick="button1Click">
   <i xid="i1"></i>
   <span xid="span1">扫描</span></a></div>
        </div> 
      </div>  
    <div id="createcode" class="x-panel-content" xid="content1"><div xid="makecode"></div>
  
  
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row2">
   <div class="x-col" xid="col4"><input component="$UI/system/components/justep/input/input" class="form-control" xid="input1" placeHolder="输入文字生成二维码"></input></div>
   <div class="x-col" xid="col6"><a component="$UI/system/components/justep/button/button" class="btn btn-default" label="确定" xid="button2" onClick="button2Click">
   <i xid="i2"></i>
   <span xid="span2">确定</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="清除记录" xid="button3" onClick="button3Click">
   <i xid="i3"></i>
   <span xid="span3">清除记录</span></a></div></div></div>
  </div> 
</div>