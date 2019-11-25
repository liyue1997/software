<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;" xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="left:18px;top:83px;height:244px;"> 
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="data1" idColumn="id" onCustomRefresh="data1CustomRefresh"><column name="id" type="String" xid="xid1"></column>
  <column name="titile" type="String" xid="xid2"></column>
  <column name="desc" type="String" xid="xid3"></column></div></div>  
  <div component="$UI/system/components/justep/panel/panel" 
    class="x-panel x-full" xid="panel1"> 
      <div class="x-panel-top" xid="top1"> 
        <div component="$UI/system/components/justep/titleBar/titleBar" title="控制台"
          class="x-titlebar">
          <div class="x-titlebar-left"> 
            <a component="$UI/system/components/justep/button/button"
              label="" class="btn btn-link btn-only-icon" icon="icon-chevron-left"
              onClick="{operation:'window.close'}" xid="backBtn"> 
              <i class="icon-chevron-left"/>  
              <span></span> 
            </a> 
          </div>  
          <div class="x-titlebar-title">控制台</div>  
          <div class="x-titlebar-right reverse"> 
          <button xid="button1" bind-click="button1Click"><![CDATA[清除]]></button></div>
        </div> 
      </div>  
    <div class="x-panel-content" xid="content1"><span xid="spdesc"><![CDATA[信息]]></span>
    <ul component="$UI/system/components/justep/list/list" class="x-list x-list-template" xid="list1" data="data1">
   <li xid="li1" bind-click="li1Click"><div component="$UI/system/components/justep/row/row" class="x-row" xid="row1">
   <div class="x-col x-col-fixed" xid="col1" style="width:auto;;"><span xid="span1" bind-text='val("id")'></span></div>
   <div class="x-col x-col-fixed" xid="col1"><span xid="span1" bind-text='val("titile")'></span></div>
   </div></li></ul>
  </div>
  </div> 
</div>