<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:m;" sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:24px;top:134px;"
    onModelConstructDone="modelModelConstructDone"> 
    <div autoLoad="true" component="$UI/system/components/justep/data/data"
      idColumn="fID" xid="dialogData" confirmRefresh="false"> 
      <column label="fID" name="fID" type="String" xid="xid1"/>  
      <column label="fNickName" name="fNickName" type="String" xid="xid2"/>  
      <column name="fCounter" type="Integer" xid="xid3"/>  
      <column name="fImg" type="String" xid="xid4"/>  
      <column name="fState" type="String" xid="xid7"/>  
      <column label="" name="fLatestChatDate" parent="dialogData" type="String"
        update-mode="insert" xid="xid1111111"/>  
      <column label="" name="fLatestChat" parent="dialogData" type="String" update-mode="insert"
        xid="xid2111111"/>  
      <column name="fState" type="String" xid="xid11"/>  
      <column name="fType" type="String" xid="xid5"/>  
      <column label="fNickNamePY" name="fNickNamePY" type="String" xid="xid6"/> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-content" xid="content1" style="overflow-x: hidden; bottom: 0px;"
      _xid="C71BB4D25EC000015A973101183B1FDA"> 
      <div class="x-list x-cards" component="$UI/system/components/justep/list/list"
        data="dialogData" xid="list1" limit="20"> 
        <ul class="x-list-template list-group" xid="listTemplateUl1"> 
          <li class="list-group-item" xid="li1" oncontextmenu="return false;" bind-click="li1Click"> 
            <div class="media-left" xid="div2"> 
              <span bind-html="ref('fCounter')" bind-visible=" $object.val(&quot;fCounter&quot;)&gt;0"
                class="counter" xid="span11"/>  
              <img alt="" class="o-icon" xid="image6" bind-attr-src=' val("fImg")'/> 
            </div>  
            <div class="media-body" xid="div1"> 
              <h5 bind-text="ref('fNickName')" class="dialogName" xid="h51"/>  
              <span bind-text="ref('fLatestChatDate')" class="latestChatDate"
                xid="span9"/>  
              <div style="clear:both;" xid="div3"/>  
              <span bind-html="ref('fLatestChat')" class="latestChat" xid="span10"/> 
            </div> 
          </li> 
        </ul> 
      </div>
    </div> 
  </div> 
</div>
