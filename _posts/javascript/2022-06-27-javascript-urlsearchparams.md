---
title: "URLSearchParams, javascript url 파라미터 가져오기"
date: 2022-06-27 15:59:00 +0900
categories: [JavaScript]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## javascript로 주소에 있는 파라미터 가져오기

```
url : http://test.com?brand=1
```

````javascript
let query = window.location.search;
let param = new URLSearchParams(query);
let brand = param.get('brand');

console.log(brand);        // 1
````


---

<br>


##### 참고

- [URLSearchParams](https://developer.mozilla.org/ko/docs/Web/API/URLSearchParams)
- [Javascript URL 파라미터 가져오기](https://europani.github.io/javascript/2021/06/25/031-URL-parameter.html)
