---
title: "[Accessibility] 스크린리더가 이미지를 무시하는 방법 4가지"
date: 2023-01-03 23:31:00 +0900
categories: [Web Accessibility]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## 1. CSS의 background 속성 사용
````css
.image {background-image: url(bg.gif);}
````

## 2. 태그에 alt 속성을 빈 값으로 사용
````html
<img src="spacer.git" alt="">
````

## 3. aria-hidden="true" 사용
````html
<img src="bg.jpg" aria-hidden="true">

<div aria-hidden="true"></div>
````

## 4. role="presentation" 사용
````html
<img src="bg.jpg" role="presentation">
````

---
<br>

##### 참고
- [스크린리더가 이미지를 무시하는 가장 좋은 방법](https://aoa.gitbook.io/skymimo/aoa-2019/tips-2/ignore#less-than-img-greater-than-aria-hidden)
- [https://y00eunji.tistory.com/entry/HTMLCSS-%EC%8A%A4%ED%81%AC%EB%A6%B0-%EB%A6%AC%EB%8D%94%EA%B0%80-%EC%9D%B4%EB%AF%B8%EC%A7%80%EB%A5%BC-%EB%AC%B4%EC%8B%9C%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95%EB%93%A4]()
- [\[HTML&CSS\] 스크린 리더가 이미지를 무시하는 방법들](https://y00eunji.tistory.com/entry/HTMLCSS-스크린-리더가-이미지를-무시하는-방법들)
