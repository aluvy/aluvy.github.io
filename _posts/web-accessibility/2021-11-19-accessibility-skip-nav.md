---
title: "[Accessibility] Skip Nav"
date: 2021-11-19 21:22:00 +0900
categories: [Web Accessibility]
tags: [web accessibility, 웹 접근성, skip nav]
render_with_liquid: false
math: true
mermaid: true
---

## skip navi란?

사용자 편의 및 웹 접근성향상을 위한 skip navi를 body 최상단에 넣어준다.

마우스나 키보드를 사용하지 못해 tab키를 사용해야 하는 사용자에게 사이트 최상단에 바로가기를 만들어 줌으로써 원하는 영역에 바로 갈 수 있게 도와주는 기능을 한다.

## 사용예제

````html
<div id="skipNav">
  <a href="#content">본문 바로가기</a>
  <a href="#nav">글로벌 네비게이션 바로가기</a>
</div>
````

````css
#skipNav{position:relative; width:100%; overflow:hidden;}
#skipNav a{display:block; height:1px; margin-bottom:-1px; overflow:hidden; text-align:center;}
#skipNav a:hover,
#skipNav a:focus,
#skipNav a:active{height:auto; padding:5px 0; background:#fff;}
````
