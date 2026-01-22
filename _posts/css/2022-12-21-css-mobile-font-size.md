---
title: "[CSS] mobile font size"
date: 2022-12-21 11:34:00 +0900
categories: [CSS]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

````css
html {
  font-size:calc(100vw*10/360);
}
@media (min-width: 360px) {
  html{
    font-size: 10px;
  }
}

/* or */
html {
  font-size: calc(100vw*11.66/420);
}

@media (min-width:420px) {
  html {
    font-size:11.66px;
  }
}
````

위 코드처럼 font-size를 주게 되면 브라우저 가로 사이즈에 따라 자동으로 폰트사이즈가 조절되고, rem으로 작성된 스타일의 크기가 자동으로 도절된다.

간단한 모바일 웹 페이지에서 사용하기 용이하다.

계산식은 아래와 같다.
````
10 : 360 = X : 420
10 : 360 = X : 390
````
