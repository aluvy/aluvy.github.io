---
title: "[jQuery] 가시영역의 이미지만 로딩 – Lazy Load Plugin for jQuery"
date: 2022-03-18 20:17:00 +0900
categories: [JavaScript, jQuery]
tags: [lazy loading]
render_with_liquid: false
math: true
mermaid: true
---

## Lazy Loading 이란?

![alt text](/assets/images/posts/2022/0318/lazy-load-01.png)

lazy loading은 페이지를 읽어들이는 시점에 중요하지 않은 리소스 로딩을 추 후에 하는 기술 입니다.

웹 성능 최적화를 위한 Image Lazy Loading 기법   
처음에는 화면에 보여지는 이미지만 로딩 되어있고, 스크롤 시 아래 이미지들을 호출하는 플러그인

````html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    img{ margin:100px 0; display:block}
  </style>
  <script src="jquery-1.8.3.min.js"></script>
  <script src="jquery.lazyload.js"></script>
  <script>
    $(function() {
      $("#lazyload img").lazyload({placeholder : "grey.gif"});
    });
  </script>
</head>
<body>
  <div id="lazyload">
    <img src="a1.jpg" alt="">
    <img src="a2.jpg" alt="">
    <img src="a3.jpg" alt="">
    <img src="a4.jpg" alt="">
    <img src="a1.jpg" alt="">
    <img src="a2.jpg" alt="">
    <img src="a3.jpg" alt="">
    <img src="a4.jpg" alt="">
    <img src="a1.jpg" alt="">
    <img src="a2.jpg" alt="">
    <img src="a3.jpg" alt="">
    <img src="a4.jpg" alt="">
    <img src="a1.jpg" alt="">
    <img src="a2.jpg" alt="">
    <img src="a3.jpg" alt="">
    <img src="a4.jpg" alt="">
  </div>
</body>
</html>
````


<hr>

#### 다운로드

- [jquery-lazyload-01.zip](/assets/images/posts/2022/0318/jquery-lazyload-01.zip)
- [jquery-lazyload-02.zip](/assets/images/posts/2022/0318/jquery-lazyload-02.zip)
