---
title: "오늘하루 열지않기 팝업"
date: 2022-06-02 11:57:00 +0900
categories: [JavaScript, JavaScript-basic]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## HTML
````html
<div id="popup">
  <div class="popup_wrap">
    <div class="popup_body">
      <img src="/assets/images/common/popup.png" alt="popup">
    </div>
    <div class="popup_btn">
      <a href="#" class="btn__popup_today_close">오늘하루 보지않음</a>
      <a href="#" class="btn__popup_close">닫기</a>
    </div>
  </div>
</div>
````

## CSS
````css
#popup{position:relative; display: none;}
#popup::after{content:''; display:block; width:100%; height: 100%; position:fixed; left:0; top:0; background:rgba(0,0,0,0.7); z-index:998;}
#popup .popup_wrap{position:fixed; left:50%; top:50%; z-index:999; transform:translate(-50%, -50%);}
#popup .popup_btn{display:flex; align-items:center; justify-content: space-between; gap:1rem; margin:1rem 0 0;}
#popup .popup_btn a{flex:1 1 1%; display:block; height:45px; line-height:45px; text-align:center; color:rgba(255,255,255,.6); border-radius:45px; background:rgba(0,0,0,0.5); transition: background .3s, color .3s;}
#popup .popup_btn .btn__popup_today_close{flex:1 1 65%;}
#popup .popup_btn .btn__popup_close{flex:1 1 35%;}
#popup .popup_btn a:hover{background:rgba(0,0,0,1); color:rgba(255,255,255,1);}
````


## JavaScript
````javascript
$(function(){

  // 팝업 쿠키 설정
  function setCookie( name, value, expiredays ) { 
    let todayDate = new Date(); 
    todayDate.setDate( todayDate.getDate() + expiredays );
    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
  }

  // 쿠키 설정에 따른 팝업 노출 유무
  let cookiedata = document.cookie;
  if ( cookiedata.indexOf("ncookie=done") < 0 ){  // 저장된 쿠키명
    $('#popup').show();
  } else {
    $('#popup').remove();
  }

  // 닫기 클릭
  $('#popup .btn__popup_close').on( "click", function(e){
    e.preventDefault();
    $('#popup').remove();
  });

  // 오늘하루 보지않음 클릭
  $('#popup .btn__popup_today_close').on( "click", function(e){
    e.preventDefault();
    setCookie( "ncookie", "done" , 7 );     // 저장될 쿠키명 , 쿠키 value값 , 기간( ex. 1은 하루, 7은 일주일)
    $('#popup').remove();
  });
});
````
