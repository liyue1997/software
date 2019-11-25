<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model"><div component="$UI/system/components/justep/data/data" autoLoad="false" xid="imgData" idColumn="ID" onCustomRefresh="imgDataCustomRefresh">
   <column label="ID" name="ID" type="String" xid="column2"></column>
   <column label="动态ID" name="postid" type="String" xid="column3"></column>
   <column label="大图片" name="img" type="String" xid="column1"></column>
   <column label="小图片" name="sImg" type="String" xid="xid11"></column>
   <column label="视频" name="video" type="String" xid="xid12"></column>
   <column label="视频图片" name="videoImg" type="String" xid="xid13"></column></div></div> 

  
  <div xid="imgViewMain" class="imgViewMain"><div component="$UI/system/components/bootstrap/carousel/carousel" class="x-carousel" xid="carousel1" auto="false" style="height:100%;" supportImagePinch="true" interval="6">
   <ol class="carousel-indicators" xid="ol1" bind-visible=" $model.imgData.count() &gt;1"></ol>
   <div class="x-contents carousel-inner imgcontent" role="listbox" component="$UI/system/components/justep/contents/contents" active="0" slidable="true" wrap="true" swipe="true" xid="contentsImg" routable="false" style="height:100%;" bind-click="contentsImgClick" onActiveChanged="contentsImgActiveChanged">
    <div class="x-contents-content" xid="content1">
     
  
  <div xid="img-show" class="img-show"><img src="./images/def-img.png" alt="" xid="image13" bind-click="openPageClick" class="tb-img2" pagename="./detail.w"></img></div></div> </div> </div></div>
  <span component="$UI/system/components/justep/windowReceiver/windowReceiver" xid="windowReceiver1" onReceive="windowReceiver1Receive"></span>
  <div component="$UI/system/components/justep/popOver/popOver" class="x-popOver" direction="auto" xid="popOver1" opacity="0" dismissible="false">
   <div class="x-popOver-overlay" xid="div1"></div>
   <div class="x-popOver-content" xid="div2" style="text-align:center;font-size:36px;"><i xid="i1" class="icon-loading-c"></i></div></div></div>