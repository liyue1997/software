<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;" xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:112px;left:54px;height:auto;" onLoad="modelLoad" onActive="modelActive"> 
  <div component="$UI/system/components/justep/data/data" autoLoad="false" xid="talklist" idColumn="id" 
  onCustomRefresh="shopinfoCustomRefresh">

      <data xid="default1">
  <!--  [{&quot;id&quot;:&quot;1&quot;,&quot;shopID&quot;:&quot;1&quot;,&quot;shopimg&quot;:&quot;img_shangdian.png&quot;,&quot;shopName&quot;:&quot;百果园（六朝路店）&quot;,&quot;heart&quot;:&quot;1&quot;},{&quot;id&quot;:&quot;2&quot;,&quot;shopID&quot;:&quot;1&quot;,&quot;shopimg&quot;:&quot;img_shangdian.png&quot;,&quot;shopName&quot;:&quot;百果园（六朝路店）&quot;,&quot;heart&quot;:&quot;1&quot;},{&quot;id&quot;:&quot;3&quot;,&quot;shopID&quot;:&quot;2&quot;,&quot;shopimg&quot;:&quot;img_shangdian.png&quot;,&quot;shopName&quot;:&quot;衡门小筑&quot;,&quot;heart&quot;:&quot;0&quot;},{&quot;id&quot;:&quot;4&quot;,&quot;shopID&quot;:&quot;3&quot;,&quot;shopimg&quot;:&quot;img_shangdian.png&quot;,&quot;shopName&quot;:&quot;麦当劳（京沪高铁南京南站店）&quot;,&quot;heart&quot;:&quot;0&quot;},{&quot;id&quot;:&quot;5&quot;,&quot;shopID&quot;:&quot;4&quot;,&quot;shopimg&quot;:&quot;img_shangdian.png&quot;,&quot;shopName&quot;:&quot;鱼无双（九都荟店）&quot;,&quot;heart&quot;:&quot;1&quot;}]-->
  </data>
  <column label="序号" name="id" type="String" xid="xid1"></column>
  <column label="聊天类型" name="type" type="String" xid="xid7"></column>
  <column label="头像" name="headimg" type="String" xid="xid2"></column>
  <column label="会话名称" name="talkName" type="String" xid="xid3"></column>
  <column label="最近一条消息" name="lastMsg" type="String" xid="xid4"></column>
  <column label="最近会话时间" name="lastTime" type="String" xid="xid5"></column>
  <column label="最近消息发送者" name="lastFrom" type="String" xid="xid8"></column>
  <column label="未读消息数" name="unreadcount" type="String" xid="xid6"></column>
  <column label="对方ID或群组ID" name="converID" type="String" xid="xid9"></column></div></div>  
  <div component="$UI/system/components/justep/panel/panel" 
    class="x-panel x-full" xid="panel1"> 
      <div class="x-panel-top top" xid="top1"> 
        <div component="$UI/system/components/justep/titleBar/titleBar" title="会话列表"
          class="x-titlebar">
          <div class="x-titlebar-left"> 
            <a component="$UI/system/components/justep/button/button"
              label="" class="btn btn-link btn-only-icon" icon="img:$UI/b2mapshop_UI/img/nav_icon_fanhui.png"
              onClick="{operation:'window.close'}" xid="backBtn"> 
              <img src="$UI/b2mapshop_UI/img/nav_icon_fanhui.png" xid="image3" style="width:20px;"></img><span></span> 
            </a> 
          </div>  
          <div class="x-titlebar-title">会话列表</div>  
          <div class="x-titlebar-right reverse"> 
          </div>
        </div> 
      </div>  
    <div class="x-panel-content  x-scroll-view" xid="content1" _xid="C8929F3F402000011EFDFD70437C16C4">
    <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView1">
   <div class="x-content-center x-pull-down container" xid="div1">
    <i class="x-pull-down-img glyphicon x-icon-pull-down" xid="i1"></i>
    <span class="x-pull-down-label" xid="span1">下拉刷新...</span></div> 
   <div class="x-scroll-content" xid="div2">
    <div class="x-list" component="$UI/system/components/justep/list/list" data="talklist" limit="8" xid="list1">
     <div class="x-list-template" xid="listTemplateDiv1">
      <div xid="talklistdiv" class="talklist">
      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row1" style="height:100%;width:100%;" bind-click="row1Click">
   <div class="x-col x-col-20" xid="col1">
  <img src=" " alt="" xid="headimg" class="headimg" bind-attr-src=' val("headimg")'></img></div>
   <div class="x-col" xid="col2"><span xid="span4" bind-text='val("talkName")' class="talkname">会话名</span>
   <span xid="lastfrom" bind-text='val("lastFrom")' class="lastfrom"><![CDATA[最近一条信息发送者：]]></span>:
   <span xid="lastmsg" bind-text='val("lastMsg")' class="lastmsg"><![CDATA[最近一条消息]]></span>
  </div>
   <div class="x-col x-col-10" xid="col3" style="text-align:right;"><span xid="unread" class="unreadcount" bind-text='val("unreadcount")' bind-visible=' $model.tipshow( val("unreadcount"))'><![CDATA[未读消息数]]></span></div>
   </div>
   </div></div> </div> 
  </div> 
   <div class="x-content-center x-pull-up" xid="div4">
    <span class="x-pull-up-label" xid="span2">加载更多...</span></div> </div></div>
  </div> 
</div>