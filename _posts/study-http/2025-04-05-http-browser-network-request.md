---
title: "[HTTP] 02. 브라우저 - 5장. 네트워크 요청"
date: 2025-04-05 15:37:00 +0900
categories: [Study, HTTP]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

# 02. 브라우저

- 🔗 <https://github.com/jeonghwan-kim/lecture-http>
- 🔗 <https://jeonghwan-kim.github.io/2024/07/08/lecture-http-part2>


- 웹 개발 시 가장 많이 사용하는 HTTP 클라이언트는 웹 브라우저
- 우리가 모르는 사이에 브라우저는 HTTP 요청을 만들고 서버 응답에 자동으로 반응한다.


- 3장. 컨텐츠 협상: 웹브라우저가 서버와 데이터를 주고 받을 때 최적의 형태로 만들기 위한 매커니즘을 이해할 수 있다.
- 4장. 쿠키: 서버가 웹 브라우저를 식별하기 위한 방법인 쿠키에 대해 배울 수 있다.
- 5장. 네트워크 요청: 웹 브라우저에서 발생할 수 있는 HTTP 요청의 종류에 대해 알 수 있다.

---


## 5장. 네트워크 요청

브라우저에서 발생하는 HTTP 요청의 종류와 특징을 알아본다.


### 5-1. HTML 요청

- 사용자가 URL을 입력하면 HTTP 요청을 만든다.
- 브라우저에 따라 파비콘을 얻기 위해 HTTP 요청을 만든다.
- 사용자가 웹 문서 링크를 클릭하면 HTTP 요청을 만든다.

브라우저는 웹문서를 렌더링 하기 위해서 HTML 요청을 자동으로 만들어 낸다.   
사용자가 주소창에 URL을 입력하면 해당 문서를 가져오기 위해 HTTP요청을 만들고   
사용자가 하이퍼링크를 클릭하면 클릭한 하이퍼링크에 해당하는 HTML 문서를 가져오기 위해 HTTP 요청을 만든다.   
또, 브라우저에 따라서 파비콘 이미지를 가져오기 위한 HTTP 요청을 만들기도 한다.


### 5-2. HTML 외 요청

- CSS 로딩 태그를 만나면 HTTP 요청을 만든다.
- 글꼴 로딩 태그를 만나면 HTTP 요청을 만든다.
- JS 로딩 태그를 만나면 HTTP 요청을 만든다.

HTML로 만든 문서는 텍스트 그 이상이다.   
텍스트가 아닌 다른 형태의 자원이 포함될 수도 있다.


### 5-3. img 요청

- img 태그를 만나면 HTTP 요청을 만든다.
- 광고 효과를 높이기 위한 도구로 활용한다.
- img 태그를 이용해 광고 픽셀을 만들어 데이터를 수집한다.

#### 광고픽셀

- 마케팅 업체에서 광고 효과를 높이기 위한 수단으로 쓰는 용어
- HTTP 속성을 적극적으로 활용해서 사용자 정보를 수집한다.
  - 인터넷 상에서 광고 업체는 사용자 식별을 위해 정보를 수집한다.
    - 접속한 IP
    - 브라우저 종류
    - 보고있는 페이지 등
  - 이러한 데이터는 단편적으로는 가치가 없어보이지만 데이터가 많이 쌓이면 의미 있는 정보가 될 수 있다.
- 어떻게 모으느냐
  - 이미지 태그를 사용한다.
  - 브라우저는 HTML에서 이미지 태그를 발견하면 곧장 해당 주소로 HTTP 요청을 만든다.
  - 서버는 사람눈에 보이지 않는 아주 작은 1px짜리의 투명한 파일을 본문에 실어서 응답한다.
  - 응답할 때 header에 있는 정보를 수집하는 방식이다.



### 5-4. Form 요청

- form 태그는 사용자가 원하는 시점에 HTTP 요청을 만든다.
- GET 메소드 방식
  - 요청 데이터를 URL에 싣는다.
  - URL 길이제한 문제
  - 보안 문제
- POST 메소드 방식
  - 요청 데이터를 URL이 아닌 Body, 요청 본문에 싣는다.
  - 길이 제한이 없음
  - 데이터 보호하는 데에 적합함
- application/x-www-form-urlencoded 과 multipart/form-data
  - application/x-www-form-urlencoded
    - GET, POST 방식
    - 데이터가 많아지면 전송에 비효율적
    - 파일을 전송할 수 없음
  - multipart/form-data
    - 이미지나 파일 전송 가능
    - 요청 본문을 여러 부분으로 나누어서 사용
    - 각 부분은 다시 헤더와 바디로 구성된다



### 5.5 중간 정리

- 브라우져는 HTML을 얻기 위해 HTTP 요청을 만듭니다.
- 브라우져는 HTML 렌더링 과정에 필요한 HTTP 요청을 만듭니다.
- 브라우져는 img 태그를 만나면 HTTP 요청을 만듭니다.
- 브라우져는 form 태그를 만나면 HTTP 요청을 만듭니다.


### 참고
- [중요 렌더링 경로 \| MDN](https://developer.mozilla.org/ko/docs/Web/Performance/Guides/Critical_rendering_path)
- [\<form\> \| MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Reference/Elements/form)


------


## 예제

**파일 구조**

- /ch05
  - public
    - cat.jpg
    - ch01.html
    - ch02.html
    - favicon.ico
    - index.html
    - login.html
    - script.js
    - style.css
    - tracking-pixel.gif
  - shared
    - serve-static.js
  - server.js


````js
const insertTrackingPicxel = () => {
  const img = document.createElement('img');
  img.src = '/tracking-pixel.gif';
  img.alt = 'Tracking Pixel';
  img.style.width = '1px';
  img.style.height = '1px';
  img.style.display = 'none';
  document.body.appendChild(img);
};

document.addEventListener('DOMContentLoaded', () => {
  console.log('script.js');
  insertTrackingPicxel(); // 광고픽셀
});
````
{: file="/ch05/public/script.js"}



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
{: file="/ch05/shared/serve-static.js"}


````js
const http = require('http');
const path = require('path');
const querystring = require('querystring');

const static = require('./shared/serve-static');

const logRequest = (req) => {
  const log = [
    // 유저의 사용 시간을 알 수 있습니다.
    `${new Date().toISOString()}`,

    // 유저의 접속 지역을 알 수 있습니다.
    `IP: ${req.socket.remoteAddress || req.connection.remoteAddress}`,

    // 유저가 사용하는 단말기 정보를 알 수 있습니다.
    `User-Agent: ${req.headers['user-agent']}`,

    // 사용자가 어떤 페이지를 보는지 알 수 있습니다.
    `Referer: ${req.headers['referer']}`,
  ].join(', ');

  console.log(log);
};

const getLogin = (req, res) => {
  const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
  const email = searchParams.get('email');
  const password = searchParams.get('password');

  const authenticated = email === 'myemail' && password === 'mypassword';

  if (!authenticated) {
    res.statusCode = 401;
    res.write('Unauthorized\n');
    res.end();
    return;
  }

  res.write('Success\n');
  res.end();
};

const postLogin = (req, res) => {
  let body = '';

  req.on('data', (chunk) => {
    body = body + chunk.toString();
  });

  req.on('end', () => {
    const { email, password } = querystring.parse(body);
    const authenticated = email === 'myemail' && password === 'mypassword';

    if (!authenticated) {
      res.statusCode = 401;
      res.write('Unauthorized\n');
      res.end();
      return;
    }

    res.write('Success\n');
    res.end();
  });
};

const handler = (req, res) => {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  if (pathname === '/tracking-pixel.gif') logRequest(req);
  // if (pathname === '/login') return getLogin(req, res);
  if (pathname === '/login') return postLogin(req, res);

  static(path.join(__dirname, 'public'))(req, res);
};

const server = http.createServer(handler);
server.listen(3000, () => console.log('server is running ::3000'));
````
{: file="/ch05/server.js"}
