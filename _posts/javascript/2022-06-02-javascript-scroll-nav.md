---
title: "스크롤 방향에 따른 네비게이션 보이기, 감추기"
date: 2022-06-02 14:53:00 +0900
categories: [JavaScript, JavaScript-basic]
tags: []
render_with_liquid: false
math: true
mermaid: true
---


## HTML
````html
<header>
  <div class="container">
    <h1><a href="/">Logo</a></h1>
    <nav>
      <h2 class="hidden">글로벌 네비게이션</h2>
      <ul class="nav">
        <li><a href="/about"><h3>menu1</h3></a></li>
        <li><a href="/shop/main"><h3>menu2</h3></a></li>
        <li><a href="/pin/pin_send"><h3>menu3</h3></a></li>
        <li><a href="/charge/charge"><h3>menu4</h3></a></li>
        <li><a href="javascript:alert('준비중입니다.');"><h3>menu5</h3></a></li>
      </ul>
    </nav>
  </div>
</header>
````


## CSS
````css
/* header */
header{position:fixed; left: 0; top: 0; width: 100%; z-index:99; background:none; transition:top .3s, background .3s;}
header::after{content:''; display:block; position:absolute; left:0; top:0; width:100%; height:100%; z-index:-1; background:linear-gradient(90deg, rgba(0,198,255,1) 55%, rgba(8,228,168,1) 100%); opacity: 0; transition:opacity .3s;}
header.hide{position:fixed; top: -5rem;}

#wrap header.scroll::after{opacity: 1;} /* scroll 일때만 배경 나오게 */
#wrap.sub header::after{opacity: 1;}    /* sub에선 항상 배경 나오게 */
````



## JavaScript
````javascript
// 스크롤 시 헤더
$(function(){

  var lastScrollTop = 0;
  var delta = 5;
  var fixBox = document.querySelector('header');
  var fixBoxHeight = fixBox.offsetHeight;
  var didScroll;

  //스크롤 이벤트 
  window.onscroll = function() {
    didScroll = true;
  };

  setInterval(function(){ //0.1초마다 스크롤 여부 체크하여 스크롤 중이면 hasScrolled() 호출
    if(didScroll){
      hasScrolled();
      didScroll = false;
    }
  }, 100);

  function hasScrolled(){
    let nowScrollTop = window.scrollY;
    console.log(nowScrollTop, lastScrollTop);

    if(Math.abs(lastScrollTop - nowScrollTop) <= delta){ return; }
    if(nowScrollTop > lastScrollTop && nowScrollTop > fixBoxHeight){    //Scroll down

      fixBox.classList.add('hide');
    }else{
      if(nowScrollTop + window.innerHeight < document.body.offsetHeight){ //Scroll up
        fixBox.classList.remove('hide');
      }
    }
    lastScrollTop = nowScrollTop;

    if( nowScrollTop > 0 ){
      fixBox.classList.add('scroll'); // scroll 클래스 일때만 배경 나옴
    } else {
      fixBox.classList.remove('scroll');
    }
  }
  hasScrolled();  // 초기 1회 실행 

});
````
