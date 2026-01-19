---
title: "google webFont loader"
date: 2022-12-07 17:19:00 +0900
categories: [JavaScript]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## google web font loader
CSS가 로드되기 전에 폰트가 로드되길 원하고,   
스타일되지 않은 텍스트가 번쩍거리지 않게 하려면 웹 폰트 로더를 사용하라.

웹 폰트 로더는 사이트가 로드되기 전에 로드되고,   
스타일되지 않은 텍스트가 번쩍이는 것을 확실하게 방지한다.

비동기 스크립트도 사용할 수 있지만,   
폰트가 먼저 로드되는 것을 확실하게 하기 위해 동기 스크립트를 사용하는 것이 좋다.


## 사용하기
Web Font Loader 라이브러리를 사용하려면 페이지에 포함하고 로드할 글꼴을 지정하기만 하면 된다.   
Web Font Loader는 jsDelivr 및 CDNJS CDN에서도 사용할 수 있다.

- https://www.jsdelivr.com/package/npm/webfontloader
- https://github.com/typekit/webfontloader


````html
<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
<script>
  WebFont.load({
    google: {
      families: ['Open Sans', 'Oswald', 'Droid Serif:bold', 'Open Sans Condensed:300,700']
    },
    custom: {
      families : ['Nanum Gothic', 'Spoqa Han Sans Neo'],
      urls: ['http://fonts.googleapis.com/earlyaccess/nanumgothic.css', '//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css'],
      testString: {
        'Nanum Gothic': '\uE003\uE005'
      }
    }
  });
</script>
````

````css
@font-face {
  font-family: 'Nanum Gothic';
  font-style: normal;
  font-weight: normal; /* or 400 */
  src: ...;
}
@font-face {
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: normal; /* or 400 */
  src: ...;
}
@font-face {
  font-family: 'My Other Font';
  font-style: normal;
  font-weight: bold; /* or 700 */
  src: ...;
}
````


---
<br>

##### 참고
- [webfontloader](https://github.com/typekit/webfontloader)
