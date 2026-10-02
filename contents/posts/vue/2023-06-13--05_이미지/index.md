---
date: '2023-06-13 09:48:00 +0900'
title: '05. 이미지 (require)'
summary: '이미지 경로 이미지는 src/assets/ 폴더 안에 넣는다. <img src="./assets/room0.jpg" class="room-img"> 이미지 경로에 변수 사용 이미지에 변수를 사용할 때에는 require 함수를 이용한다. <img :src="require(`@/assets/room${i}.jpg`)" class="room-img">'
author: ['aluvy']
categories: ['VUE']
tags: []
thumbnail: ''
---


## 이미지 경로
이미지는 src/assets/ 폴더 안에 넣는다.

````vue
<img src="./assets/room0.jpg" class="room-img">
````


## 이미지 경로에 변수 사용

이미지에 변수를 사용할 때에는 require 함수를 이용한다.

````vue
<img :src="require(`@/assets/room${i}.jpg`)" class="room-img">
````