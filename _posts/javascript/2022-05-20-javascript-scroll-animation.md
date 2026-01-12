---
title: "스크롤시 엘리먼트에 애니메이션 추가하기"
date: 2022-05-20 18:06:00 +0900
categories: [JavaScript]
tags: []
render_with_liquid: false
math: true
mermaid: true
---


## HTML

````html
<section class="container animation">
  스크롤 시 애니메이션 추가
</section>
````

## CSS

````CSS
@keyframes animation-active {
  0%{opacity: 0; position:relative; top:50px;}
  100%{opacity: 1; position:relative; top:0;}
}
.animation{opacity: 0;}
.animation-active{animation: animation-active 1 .5s; animation-fill-mode:forwards;}
````

## JavaScript

````javascript
$(function(){

  const Elements = $('.animation');

  function scrollSize(){
    const scrollTop = $(document).scrollTop();  // 스크롤TOP 값
    const windowH = $(window).height(); // 창 높이
    const gap = 100;
    const activeScroll = scrollTop + windowH - gap; // 기준값

    Elements.map(function(){
      const elementsX = $(this).offset().top; // 높이값
      if(elementsX <= activeScroll){
        $(this).addClass('animation-active');
      }
    });
  }
  scrollSize();

  $(window).on('scroll', scrollSize); 
});
````
