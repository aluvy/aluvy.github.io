---
title: "[HTTP] 03. AJAX - 8장. 라이브러리"
date: 2025-04-08 15:37:00 +0900
categories: [HTTP]
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

## 8장. 라이브러리

### 8-1. SuperAgent
- <https://github.com/forwardemail/superagent>
- <https://github.com/forwardemail/superagent?tab=readme-ov-file#plugins>
- XHR 기반. 2011년 출시. 콜백 스타일
- HTTP 메소드별 전용 함수
- Error 클래스를 확장한 오류 객체
- 플러그인으로 확장


### 8-2. Axios
- <https://github.com/axios/axios>
- XHR 기반. 2014년 출시. 프라미스 기반
- HTTP 메소드별 전용 함수
- AxiosError
- 인터셉터로 확장


### 8-3. Ky
- <https://github.com/sindresorhus/ky>
- fetch 기반. 2018년 출시. 타입스크립트
- HTTP 메소드별 전용 함수
- 프라미스 사용을 간소화
- Error 클래스를 확장한 HTTPError
- 훅으로 확장


### 8-4. Wretch
- <https://github.com/elbywan/wretch>
- fetch 기반. 2017년 출시. 타입스크립트
- HTTP 메소드별 전용 함수
- Error 클래스를 확장한 WrechError
- 미들웨어, 애드온으로 확장


### 8-5. 중간정리
- 비슷한 점
  - HTTP 메소드별로 함수를 제공한다
  - 일관된 응답 객체를 제공한다
  - 일관된 오류 객체를 제공한다
  - 구조와 이름만 다를 뿐 확장하는 인터페이스를 제공한다

- 다른 점
  - SuperAgent: 가장 오래 됨. 크로스브라우저
  - Axios: xhr 기반. 프라이스 인터페이스 제공
  - Ky: fetch 기반. 프라미스 사용 간소화
  - Wretch: 오류 전용 캐처, 미들웨어, 애드온 등 편의 제공


### 참고

- [SuperAgent \| Github](https://github.com/forwardemail/superagent)
- [Axios \| Github](https://github.com/axios/axios)
- [Ky \| Github](https://github.com/sindresorhus/ky)
- [Wretch \| Github](https://github.com/elbywan/wretch)



-----


## 예제

**파일구조**
- /ch08
  - public
    - favicon.ico
    - index.html
  - shared
    - serve-static.js
  - server.js



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
{: file="/ch08/shared/serve-static.js"}


````js
const http = require('http');
const path = require('path');
const static = require('./shared/serve-static');

const successApi = (req, res) => {
  res.setHeader('Content-type', 'application/json');
  res.write(JSON.stringify({ result: 'success' }));
  res.end();
};

const failApi = (req, res) => {
  res.statusCode = 400;
  res.setHeader('Content-type', 'application/json');
  res.write(JSON.stringify({ result: 'fail' }));
  res.end();
};

const server = http.createServer((req, res) => {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  if (pathname === '/api/success') return successApi(req, res);
  if (pathname === '/api/fail') return failApi(req, res);

  static(path.join(__dirname, 'public'))(req, res);
});

server.listen(3000, () => console.log('server is sunning ::3000'));
````
{: file="/ch08/server.js"}
