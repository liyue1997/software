<div 
  xmlns:xui="http://www.justep.com/xui" 
  xmlns:xu="http://www.xmldb.org/xupdate" 
  xmlns="http://www.w3.org/1999/xhtml" 
  component="$UI/system/components/justep/window/window" 
  xid="window" 
  extends="./messageDemo.w" 
  __id="id_1" 
  design="device:mobile;" 
  sysParam="false" 
  class="main13" >

  <div xid="closeBtn" xui:update-mode="delete"/>
  <div xid="div19" xui:update-mode="delete"/>
  <div xid="emojiRightBtn" xui:update-mode="delete"/>
    <span component="$UI/system/components/justep/windowDialog/windowDialog" showTitle="true" status="normal" xid="windowDialog" xui:before="messageDialog" xui:parent="window" xui:update-mode="insert" />
    <span component="$UI/system/components/justep/windowDialog/windowDialog" showTitle="true" status="normal" xid="showClipboardImageDlg" xui:before="messageDialog" xui:parent="window" xui:update-mode="insert" />
   <div xid="titleBar1" class="x-titlebar"  xui:update-mode="merge"/>
   <div xid="name" style="color:black;"  xui:update-mode="merge"/>
   <div xid="typing" style="padding-top: 3px;text-align:-webkit-right;color:black;"  xui:update-mode="merge"/>
    <div align="center" xid="div1_1" xui:before="listTemplateUl1" xui:parent="msgList" xui:update-mode="insert" >
<a class="btn btn-link" component="$UI/system/components/justep/button/button" label="加载更多" onClick="addMoreMsgClick" xid="button1_1" xui:before="msgList" xui:parent="scrollHeight" xui:update-mode="insert" >
<i xid="i1_1" />
<span xid="span1_1" >

加载更多</span>
</a>
</div>
   <img xid="image6" onerror="this.src = '../base/img/person.png'"  xui:update-mode="merge"/>
   <img xid="image1" onerror="this.src='../base/img/person.png'"  xui:update-mode="merge"/>
   <div xid="superinput" class="x-superinput x-superinput-pc"  xui:update-mode="merge"/>
   <div xid="superinputArea" class="x-superinput-area"  xui:update-mode="merge"/>
    <div class="x-superinput-right" xid="emojiRightBtn" xui:before="prScrn" xui:parent="superinputArea" xui:update-mode="insert" >
<a class="btn btn-link btn-only-icon x-btn-emoji" component="$UI/system/components/justep/button/button" icon="iconfont icon-biaoqing" label="" >
<i class="iconfont icon-biaoqing" />
<span />
</a>
<a class="btn btn-link btn-only-icon x-btn-voice" component="$UI/system/components/justep/button/button" icon="iconfont icon-voice" label="" style="margin-top:-6px" >
<i class="iconfont icon-voice" />
<span />
</a>
<a class="btn btn-link btn-only-icon x-btn-send hide" component="$UI/system/components/justep/button/button" icon="iconfont icon-right" label="" >
<i class="iconfont icon-right" />
<span />
</a>
<span bind-text="$model.$sendByEnter.get()?'按下Ctrl+Enter换行':'按下Ctrl+Enter发送消息'" style="float: right;color: #888;font-size: 12px;margin-top: 16px;margin-left: 10px;margin-right: 7px;" xid="temp" />
</div>

</div>