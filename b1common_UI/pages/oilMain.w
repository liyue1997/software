<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model"    onLoad="modelLoad" style="top:17px;left:244px;height:auto;"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="false"
      xid="selectedListData" idColumn="ID" onCustomRefresh="selectedListDataCustomRefresh"
      limit="100" confirmRefresh="false" confirmDelete="false"> 
      <column label="ID" name="ID" type="String" xid="xid1"/>  
      <column label="昵称" name="t_applyid" type="String" xid="xid2a"/>  
      <column label="昵称" name="t_userid" type="String" xid="xid2b"/>  
      <column label="昵称" name="t_unit" type="String" xid="xid2c"/>  
      <column label="昵称" name="t_applydate" type="String" xid="xid2d"/>  
      <column label="昵称" name="t_ptuserid" type="String" xid="xid2e"/>  
      <column label="用户ID" name="t_pthandle" type="String" xid="xid3"/>  
      <column label="用户手机号" name="t_ptdesc" type="String" xid="xid4"/>  
      <column label="头像" name="t_caruserid" type="String" xid="xid5"/>  
      <column label="内容" name="t_carhandle" type="String" xid="xid6"/>  
      <column label="时间" name="t_cardesc" type="String" xid="xid7"/>  
      <column label="评论数" name="t_carcar" type="String" xid="xid8"/>  
      <column label="点赞数" name="t_money" type="Integer" xid="xid9"/>  
      <column label="图片集合" name="useraccount" type="String" xid="xid10"/> 
      <column label="图片集合" name="username" type="String" xid="xid10a"/> 
      <column label="图片集合" name="t_car" type="String" xid="xid10b"/> 
      <column label="图片集合" name="t_realname" type="String" xid="xid10c"/> 
      <column label="图片集合" name="t_tel" type="String" xid="xid10d"/> 
      <column label="图片集合" name="sjname" type="String" xid="xid10e"/> 
      <column label="图片集合" name="sjcompany" type="String" xid="xid10f"/> 
      <column label="图片集合" name="sjpicture" type="String" xid="xid10g"/> 
      <column label="图片集合" name="t_timeinfo" type="String" xid="xid11a"/> 
      <column label="图片集合" name="t_address" type="String" xid="xid11b"/> 
      <column label="图片集合" name="t_pay" type="String" xid="xid11"/> 
    </div>  
    </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1"> 
        <div class="x-titlebar-left" xid="left1"><a component="$UI/system/components/justep/button/button" label="" class="btn btn-link btn-only-icon backBtn" icon="icon-chevron-left" onClick="{operation:'window.close'}" xid="backBtn">
   <i class="icon-chevron-left" xid="i2"></i>
   <span xid="span9"></span></a></div>  
        <div class="x-titlebar-title" xid="title1">历史纪录</div>  
        <div class="x-titlebar-right reverse" xid="right1"> 
        
        </div> 
      </div> 
    </div>  
    <div class="x-panel-content  x-scroll-view" xid="content1" _xid="C74969795EC000012EBF12B0165712F5"> 
      <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView"
        xid="scrollView1" onPullDown="scrollView1PullDown" onPullUp="scrollView1PullUp"
        autoPullUp="false" autoAppend="false"> 
        <div class="x-content-center x-pull-down container" xid="div1"> 
          <i class="x-pull-down-img glyphicon x-icon-pull-down" xid="i1"/>  
          <span class="x-pull-down-label" xid="span1">下拉刷新...</span> 
        </div>  
        <div class="x-scroll-content" xid="div2" style="width:100%;"> 
          <div component="$UI/system/components/justep/row/row" class="x-row historyrow" xid="row4">
   <div class="x-col historycol" xid="col6"><span xid="span6" style="color:black;margin-left:15px;margin-top:0;"><![CDATA[历史记录]]></span></div></div>
   <div component="$UI/system/components/justep/panel/panel" class="panel panel-default x-card indentpanel"
            xid="panel2"> 
            <div component="$UI/system/components/justep/list/list" class="x-list"
              xid="list1" data="selectedListData" limit="-1"> 
              <ul class="x-list-template" xid="listTemplateUl1"> 
                <li xid="selectInfoLi" class="selectInfoLi"> 
                  <div xid="div4" class="indentdiv"> 
                    <div component="$UI/system/components/justep/row/row" class="x-row infoRow"
                      xid="infoRow" > 
                      <div class="x-col x-col-fixed x-col-center" xid="col1"
                        style="width:auto;" bind-visible="false"> 
                        <img src="../images/fluck-headImg.png" alt="" xid="image1"
                          bind-attr-src="val(&quot;sjpicture&quot;)"/> 
                      </div>  
                      <div class="x-col titleInfoCol" xid="titleInfoCol"> 
                        <div component="$UI/system/components/justep/row/row"
                          class="x-row" xid="row2"> 
                          <div class="x-col nickNamecol" xid="nickNamecol"> 
                            <span xid="span3" bind-text='"司机:"+val("sjname")' bind-visible="false"><![CDATA[司机]]></span> 
                          <span xid="span12" bind-text='"单号:"+val("t_applyid")'><![CDATA[单号]]></span></div>  
                          <div class="x-col " xid="htCol"> 
                             
                          <a component="$UI/system/components/justep/button/button" class="btn htCol btn-sm" xid="button1" bind-css='$model.gethandlecss(val("t_carhandle"))'>
   <i xid="i3"></i><span xid="span4" bind-text='$model.gethandle(val("t_carhandle"))'></span>
</a></div> 
                        </div>  
                        <div component="$UI/system/components/justep/row/row"
                          class="x-row" xid="row3"> 
                          <div class="x-col" xid="timeCol" style="width:auto;"> 
                            <span xid="span5" bind-text='"时间:"+val("t_timeinfo")'><![CDATA[时间]]></span> 
                          </div>  
                          </div> 
                      <div component="$UI/system/components/justep/row/row" class="x-row" xid="row5">
   
   
   <div class="x-col" xid="col8">
    <span xid="span15" bind-text='"地址:"+val("t_address")'><![CDATA[地址]]></span></div> </div><div component="$UI/system/components/justep/row/row" class="x-row moneyrow" xid="row1">
   <div class="x-col" xid="col2"><span xid="span7" bind-text='"金额:"+val("t_money")+"元"'><![CDATA[金额]]></span></div>
   <div class="x-col" xid="col3"><span xid="span8" bind-text='$model.getpay(val("t_pay"))' class="ispay"><![CDATA[是否支付]]></span></div>
   </div></div> 
                    </div>  
                      
                  
                  </div> 
                </li> 
              </ul> 
            </div> 
          </div> 
        </div>  
        <div class="x-content-center x-pull-up" xid="div3"> 
          <span class="x-pull-up-label" xid="span2">加载更多...</span> 
        </div> 
      </div> 
    </div> 
  </div>  
  </div>
