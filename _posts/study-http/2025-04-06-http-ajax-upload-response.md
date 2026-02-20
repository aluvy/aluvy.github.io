---
title: "[HTTP] 03. AJAX - 6장. 업로드와 응답"
date: 2025-04-06 15:37:00 +0900
categories: [Study, HTTP]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

# 03. AJAX

- 🔗 <https://github.com/jeonghwan-kim/lecture-http>
- 🔗 <https://jeonghwan-kim.github.io/2024/07/09/lecture-http-part3>


- 직접 만들 수 있는 HTTP 요청


- 6장. AJAX 요청과 응답: fetch 함수로 AJAX 요청과 응답을 다루는 법에 대해
- 7장. AJAX 진행율과 취소: AJAX 진행율을 계산하는 방법과 요청을 취소하는 방법에 대해
- 8장. AJAX 라이브러리: fetch와 XHR 객체 기반의 주요 AJAX 라이브러리

---


## 6장. 업로드와 응답

### 6-1. AJAX

- Form 요청은 비교적 느림
  - 기존 화면을 지우고 HTTP 요청을 만드는 구조
  - 화면을 다시 그리기 때문에 느리다
- AJAX, Asynchronous JavaScript and XML
  - 웹 페이지 요청과 별개로 데이터 전송만 따로 요청한다. (비동기 라고 표현)
  - 변경된 부분만 다시 그리는 방식
- XMLHttpRequest(XHR), fetch


### 6-2. Fetch API

- fetch(url, [options]) 함수
  - <https://developer.mozilla.org/ko/docs/Web/API/Window/fetch>
- Request 객체
- 로그인 POST 요청 제작
- JSON 형식

````js
fetch(resource);
fetch(resource, options);
````


### 6-3. Response 객체

- fetch()는 응답 객체로 이행하는 Promise를 반환
  - <https://developer.mozilla.org/ko/docs/Web/API/Response>
- 응답 헤더
  - Response.headers
- 응답 본문
  - Response.json(), Response.text(), Response.blob() 등



### 6.4 중간정리

- Form은 화면을 갱신하는 반면 AJAX는 화면을 유지한 채 HTTP 요청을 만들수 있습니다.
- fetch() 함수는 url과 옵션을 지정해 HTP 요청을 만듭니다.
- fetch는 Response 객체로 이행하는 프라미스를 반환합니다.
- Response 객체는 응답 본문을 조회하는 메소드를 제공합니다.


### 참고
- [Fetch API \| MDN](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API)
- [HTTP 상태 코드 \| MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/Reference/Status)
- [Fetch \| 모던 자바스크립트 튜토리얼](https://ko.javascript.info/fetch)



-----

## 예제

**파일구조**
- /ch06
  - public
    - favicon.ico
    - index.html
    - script.js
  - shared
    - serve-static.js
  - server.js

````js
const init = () => {
  const loginForm = document.querySelector('#login-form');
  if (!loginForm) throw 'no #login-form';

  loginForm.addEventListener('submit', handleSubmit);
};

const handleSubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  // const urlSearchParams = new URLSearchParams();
  // urlSearchParams.append('email', formData.get('email'));
  // urlSearchParams.append('password', formData.get('password'));

  const jsonData = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    const response = await fetch('/login', {
      method: 'POST',
      // body: formData,
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json',
      },
      // body: urlSearchParams.toString(),
      body: JSON.stringify(jsonData),
    });

    if (!response.ok) {
      alert('API Error');
      return;
    }

    const body = await response.json();
    alert(`Success: ${body.authenticated}`);
  } catch (error) {
    alert('Network Error');
  }
};

document.addEventListener('DOMContentLoaded', init);
````
{: file="/ch06/public/script.js"}


````js
const fs = require('fs');
const path = require('path');

const serveStatic = (root) => {
  return (req, res) => {
    const filepath = path.join(root, req.url === '/' ? '/index.html' : req.url);

    fs.readFile(filepath, (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          res.statusCode = 404;
          res.write('Not Found\n');
          res.end();
          return;
        }

        res.statusCode = 500;
        res.write('Internal Server Error\n');
        res.end();
        return;
      }

      const ext = path.extname(filepath).toLowerCase();
      let contentType = 'text/html';
      switch (ext) {
        case '.html':
          contentType = 'text/html';
          break;
        case '.js':
          contentType = 'text/javascript';
          break;
        case '.css':
          contentType = 'text/css';
          break;
        case '.png':
          contentType = 'image/png';
          break;
        case '.json':
          contentType = 'application/json';
          break;
        case '.otf':
          contentType = 'font/otf';
          break;
        default:
          contentType = 'application/octet-stream';
      }
      res.setHeader('Content-Type', contentType);

      res.write(data);
      res.end();
    });
  };
};

module.exports = serveStatic;
````
{: file="/ch06/shared/serve-static.js"}


````js
const http = require('http');
const path = require('path');
const static = require('./shared/serve-static');

const handleLogin = (req, res) => {
  let body = '';

  req.on('data', (chunk) => {
    body = body + chunk.toString();
  });

  req.on('end', () => {
    const { email, password } = JSON.parse(body);

    const authenticated = email === 'myemail' && password === 'mypassword';

    res.statusCode = authenticated ? 200 : 401;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({ authenticated }));
    res.end();
  });
};

const handler = (req, res) => {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  if (pathname === '/login') return handleLogin(req, res);

  static(path.join(__dirname, 'public'))(req, res);
};

const server = http.createServer(handler);

server.listen(3000, () => console.log('server is running ::3000'));
````
{: file="/ch06/server.js"}
