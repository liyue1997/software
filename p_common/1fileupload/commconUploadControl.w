<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:285px;left:338px;" onLoad="modelLoad">
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="data1" idColumn="dir"><column label="dir" name="dir" type="String" xid="xid1"></column>
  <column label="url" name="url" type="String" xid="xid2"></column>
  <data xid="default1">[{&quot;dir&quot;:&quot;lxm&quot;,&quot;url&quot;:&quot;[]&quot;}]</data></div></div> 
<span component="$UI/system/components/justep/windowReceiver/windowReceiver" xid="windowReceiver1" style="top:314px;left:254px;" onReceive="windowReceiver1Receive"></span><div component="$UI/system/components/justep/panel/panel" class="x-panel x-full   ffff" xid="panel1" style="width:100%;height:100%;">
   <div class="x-panel-content" xid="content1"><div component="$UI/system/components/justep/row/row" class="x-row" xid="row6" style="height:15%;">
   <div class="x-col" xid="col2"><a component="$UI/system/components/justep/button/button" class="btn btn-default" label="富媒体上传" xid="button3" style="background-color:#000000;width:100%;border-color:#000000 #000000 #000000 #000000;">
   <i xid="i3"></i>
   <span xid="span9">富媒体上传</span></a></div>
   </div><div component="$UI/system/components/justep/row/row" class="x-row" xid="row5" style="padding:0% 0% 0% 0%;" bind-visible="navigator.camera">
   <div class="x-col" xid="col1">
    <span xid="span3" style="color:#FFFFFF;">3333</span></div> </div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row8" bind-visible="navigator.camera">
   <div class="x-col" xid="col12"></div>
   <div class="x-col x-col-fixed" xid="col13" style="width:auto;"><img src="$UI/p_common/1fileupload/video.png" alt="" xid="image3" style="width:90px;" bind-click="image3Click"></img></div>
   <div class="x-col" xid="col14"></div></div><div component="$UI/system/components/justep/row/row" class="x-row" xid="row1" style="padding:0% 0% 0% 0%;">
   <div class="x-col" xid="col4"><span xid="span8" style="color:#FFFFFF;"><![CDATA[3333]]></span>
  </div>
   </div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row3" style="border-color:#FFFFFF #FFFFFF #FFFFFF #FFFFFF;margin:0% 0% 0% 0%;padding:1% 1% 1% 1%;border-style:ridge ridge ridge ridge;border-width:thin thin thin thin;">
   <div class="x-col" xid="col5" style="margin:0% 0% 0% 0%;padding:0% 0% 0% 0%;"><div component="$UI/system/components/justep/row/row" class="x-row" xid="row2" style="border-color:#FFFFFF #FFFFFF #FFFFFF #FFFFFF;margin:0% 0% 0% 0%;padding:0% 0% 0% 0%;">
   <div class="x-col x-col-center" xid="col3" style="padding:0% 0% 0% 0%;margin:0% 0% 0% 0%;"><div component="$UI/system/components/justep/attachment/attachmentSimple" xid="attachmentSimple1" bind-ref='$model.data1.ref("url")' actionUrl="http://124.232.150.172:8888/baas/justep/attachment/simpleFileStore" style="height:93px;">
     <div class="x-attachment" xid="div1">
      <div class="x-attachment-content x-card-border" xid="div2">
       <div class="x-doc-process" xid="div3">
        <div class="progress-bar x-doc-process-bar" role="progressbar" style="width:0%;" xid="progressBar1"></div></div> 
       <div data-bind="foreach:$attachmentItems" xid="div4">
        <div class="x-attachment-cell" xid="div5">
         <div class="x-attachment-item x-item-other" data-bind="click:$model.previewOrRemoveItem.bind($model),style:{backgroundImage:($model.previewPicture.bind($model,$object))()}" xid="div6">
          <a data-bind="visible:$model.$state.get() == 'remove'" class="x-remove-barget" xid="a1"></a></div> </div> </div> 
       <div class="x-attachment-cell" data-bind="visible:$state.get() == 'upload'" xid="div7">
        <div class="x-attachment-item x-item-upload" data-bind="visible:$state.get() == 'upload'" xid="div8"></div></div> 
       <div class="x-attachment-cell" data-bind="visible:$state.get() == 'upload' &amp;&amp; $attachmentItems.get().length &gt; 0" xid="div9">
        <div class="x-attachment-item x-item-remove" data-bind="click:changeState.bind($object,'remove')" xid="div10"></div></div> 
       <div style="clear:both;" xid="div11"></div></div> </div> </div></div>
   </div><div component="$UI/system/components/justep/row/row" class="x-row" xid="row4" style="margin:0% 0% 0% 0%;padding:0% 0% 0% 0%;">
   <div class="x-col x-col-center" xid="col8" style="margin:0% 0% 0% 0%;padding:0% 0% 0% 0%;"><a component="$UI/system/components/justep/button/button" class="btn btn-default" label="上  传" xid="button6" onClick="button6Click" style="width:100%;background-color:#008000;color:#FFFFFF;">
   <i xid="i6"></i>
   <span xid="span7">上  传</span></a></div>
   </div></div>
   </div>
  
  </div>
   <div class="x-panel-bottom" xid="bottom1"><a component="$UI/system/components/justep/button/button" class="btn btn-default" label="退出" xid="button2" style="width:100%;background-color:#FF0000;" onClick="button2Click">
   <i xid="i2"></i>
   <span xid="span2">退出</span></a></div></div>
  <div component="$UI/system/components/justep/popOver/popOver" class="x-popOver" direction="auto" xid="popOver2" opacity="0.7">
   <div class="x-popOver-overlay" xid="div14"></div>
   <div class="x-popOver-content" xid="div15" style="width:66px;height:60px;"><a component="$UI/system/components/justep/button/button" class="btn btn-link" xid="button5" icon="icon-looping" style="width:100%;font-size:x-large;height:41px;">
   <i xid="i5" class="icon-looping"></i>
   <span xid="span5"></span></a>
  <span xid="span6"><![CDATA[上传,稍候]]></span></div></div><div component="$UI/system/components/justep/popOver/popOver" class="x-popOver" direction="auto" xid="popOver1" dismissible="false">
   <div class="x-popOver-overlay" xid="div12"></div>
   <div class="x-popOver-content" xid="div13" style="width:81px;height:33px;"><img src="$UI/p_common/1fileupload/record.gif" alt="" xid="image1" style="width:83px;height:60px;"></img>
  <div component="$UI/system/components/justep/output/output" class="x-output" xid="output1" style="width:100%"></div><img src="$UI/p_common/1fileupload/stop.png" alt="" xid="image2" style="width:89px;height:93px;" bind-click="image2Click"></img></div></div>
  </div>