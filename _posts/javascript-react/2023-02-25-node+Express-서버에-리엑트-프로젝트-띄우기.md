---
title: "[React] node + Express 서버에 리엑트 프로젝트 띄우기"
date: 2023-02-25 21:35:00 +0900
categories: [JavaScript, React]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## node.js로 웹 서버 만들기

1. node.js 설치
2. 작업폴더 만든 후 에디터로 오픈
3. server.js 파일 만들고 아래 코드 작성   

````javascript
const express = require('express');
const path = require('path');
const app = express();

app.listen(8080, function(){
  console.log('listening on 8080');
})
````

4. 터미널 열어서 npm init -y 입력
5. npm install express 입력

이렇게 하면 웹 서버 만들기 끝   
서버 미리보기를 띄우고 싶으면 터미널에 nodemon server.js 입력   
nodemon이 설치되어 있지 않다면 node server.js 입력



## 리액트 프로젝트를 띄우고 싶다면

````javascript
// server.js
app.use(express.static(path.join(__dirname, 'react-project/build')));

app.get('/', function(요청, 응답){
  응답.sendFile(path.join(__dirname, '/react-project/build/index.html'));
})
````
express.static 을 쓰면 특정 폴더 안의 파일들을 static 파일로 고객들에게 잘 보내준다.   
그럼 build 폴더 안의 css, js, img 파일들도 잘 사용할 수 있다.   
그리고 / 페이지로 접속하면, 리액트로 만든 html을 보내주라는 코드


## 라우팅
라우팅은 서버에서 담당할수도 있고, 리액트에서 담당할수도 있다.   
리액트는 react-router-dom 을 설치하면 된다.   
하지만 리액트 라우터로 페이지 링크를 걸 경우, 직접 URL을 입력하면 아무것도 뜨지 않는다.   
직접 URL을 입력하는 것은 리액트 라우터에게 라우팅을 요청하는 것이 아니라, 서버에 요청하는 것이기 때문이다.

리액트에게 라우팅 전권을 넘기고 싶다면 server.js에 아래 코드를 추가한다.
````javascript
// server.js
app.get('*', function(요청, 응답){
  응답.sendFile(path.join(__dirname, '/react-project/build/index.html'));
})
````
`*` 이라는 것은 모든 문자를 뜻한다.   
URL에 아무거나 입력해도, 리액트 프로젝트를 보내주라는 코드이다.   
이 코드는 **항상 가장 하단에 놓아야** 잘 된다.



## 리액트에서 DB 데이터를 보여주고 싶으면?
예를 들어 DB에서 글 목록 데이터를 꺼내 HTML에 보여주고 싶은 경우   
server-side rendering / client-side rendering 둘 중 하나를 선택하면 된다.

- **server-side rendering은 HTML을 서버가 만들어서 보내주는 방식이다.**
  1. DB에서 데이터를 뽑아서
  2. 글 목록.html 파일에 넣고
  3. 그 html 파일을 서버에 보내주는 것

- **client-side rendering은 html을 리액트가 브라우저 안에서 만드는 것이다.**
  1. 리액트가 서버에 GET 요청으로 DB데이터를 가져와서
  2. html을 만들어 보여준다.

 
리액트는 보통 client-side rendering을 한다.   
그래서 DB에 있는 상품목록을 가져와 리액트에 보여주고 싶으면

1. 서버는 누군가 /product로 get 요청을 하면 DB에서 데이터를 꺼내서 보내주라고 API를 작성한다.
2. 리액트는 상품목록을 보여주고 싶을 때 서버/product 주소로 get 요청을 날린다.
3. 데이터를 받아와 html을 만들어 보여준다.

리액트는 서버와의 통신은 거의 ajax로 진행합니다.   
POST요청, 로그인해서 세션만들기 등도 ajax로 진행한다.

client-side rendering 방식을 사용할때 server.js 상단에

````javascript
// server.js
app.use(express.json());
var cors = requir('cors');
app.use(cors());
````

위 코드를 넣고 시작해야 node.js 서버 간 ajax 요청이 잘 된다.   
위 코드를 사용하려면 터미널에서 npm install cors 설치해야 한다.   
`express.json()`은 유저가 보낸 array/object 데이터를 출력해보기 위해 필요하고   
cors는 다른 도메인주소끼리 ajax 요청을 주고받을 때 필요하다.

## 서브 디렉토리에 리액트 앱을 발행하고 싶은 경우
/react 로 접속하면 리액트로 만든 index.html   
/ 로 접속하면 public 폴더에 있는 main.html 을 보여주고 싶은 경우엔

````javascript
// server.js

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/react', express.static(path.join(__dirname, 'react-project/build')));

app.get('/', function(요청, 응답){
  응답.sendFile(path.join(__dirname, 'public/main.html'));
})
app.get('/react', function(요청, 응답){
  응답.sendFile(path.join(__dirname, 'react-project/build/index.html'))
})
````

서버 라우팅을 위와 같이 바꿔준 후

````javascript
// 리액트 프로젝트 내의 package.json
{
  "homepage": "/react",
  "verson": "0.1.0",
  ...
}
````

리액트 프로젝트 내의 package.json에 homepage라는 항목을   
발생을 원하는 서브디렉토리 명으로 새로 기입해주면 된다.

그럼 server.js에서 /react 접속 시 리액트 프로젝트를 보여주고   
/ 접속 시 일반 html 파일을 보내준다.

