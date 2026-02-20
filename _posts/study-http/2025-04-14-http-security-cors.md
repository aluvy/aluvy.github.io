---
title: "[HTTP] 05. 보안 - 14장. CORS"
date: 2025-04-14 15:37:00 +0900
categories: [Study, HTTP]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

# 05. 보안

- 🔗 <https://github.com/jeonghwan-kim/lecture-http>
- 🔗 <https://jeonghwan-kim.github.io/2024/07/11/lecture-http-part5>


- 브라우저 보안과 함께 HTTP 통신을 더 안전하게 만드는 LTS


- 13장. 브라우저 보안
  - XSS (크로스 사이트 스크립팅)와 같은 공격 기법과 이를 방지하기 위한 브라우저 보안정책
- 14장. CORS
  - 외부 도메인의 자원을 안전하게 활용하기 위한 CORS 정책과 적용 방법
- 15장. HTTPS
  - HTTPS가 네트워크 보안을 강화하는 방식과 TLS의 역할

---

## 14장. CORS
- <https://ko.javascript.info/fetch-crossorigin>
- <https://developer.mozilla.org/ko/docs/Web/HTTP/Guides/CORS>
- <https://github.com/expressjs/cors>


### 14-1. CORS의 동작 원리
- 용어 정리: 출처, 교차 출처 요청
  - 출처: URL에 프로토콜, 호스트, 포트 세가지를 모아서 출처라고 한다.
    - 이 세가지가 같으면 출처가 같다 라고 표현한다.
    - 이 중에 하나라도 다르면 출처가 다르다 라고 표현한다.
  - 교차 출처 요청: 다른 출처의 자원을 사용하기 위해 네트워크 요청을 만드는걸 말한다.
- 재현: 웹 서버 준비
- 재현: 교차 출처 요청
- 해결: 서버가 허용할 출처를 명시한다.



### 14-2. 단순 요청
- GET, POST, HEAD 메소드를 사용한다.
- 안전한 헤더를 사용한다.
  - <https://developer.mozilla.org/ko/docs/Glossary/CORS-safelisted_request_header>
  - 안전하지 않은 헤더를 사용하려면, 서버는 이 응답 헤더에 허용할 헤더 이름을 명시해줘야 한다.



### 14-3. 사전 요청
- PUT, PATCH, DELETE 메소드를 사용한다.
  - 이런 경우에 서버는 이 요청을 보낸 측이 브라우저가 아닐 수 있다라고 판단한다.
  - 이 경우에 브라우저와 서버는 서로 한번 더 확인하기 위한 요청을 먼저 주고 받는다. => 사전 요청, preflight request
- 사전 요청 캐시



### 14-4. CORS를 사용하는 요청
- <https://developer.mozilla.org/ko/docs/Web/HTTP/Guides/CORS#어떤_요청이_cors를_사용합니까>
- fetch 함수
- XMLHttpRequest 객체
- 웹 폰트 (@font-face)
- WebGL 텍스쳐
- drawImage()를 사용해 캔버스에 그린 이미지/비디오 프레임
- 이미지로부터 추출하는 CSS Shapes



### 14-5. 중간 정리
- CORS의 동작 원리
- 단순 요청
- 사전 요청
- CORS를 사용하는 요청



### 참고
- (도서) 리얼월드 HTTP \| 한빛미디어
- [CORS \| JAVASCRIPT.INFO](https://ko.javascript.info/fetch-crossorigin)
- [교차 출처 리소스 공유 (CORS) \| MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/Guides/CORS)
- [expressjs/core \| Github](https://github.com/expressjs/cors)


--------


## 예제
**파일구조**
- /ch14
  - public
    - favicon.ico
    - index.html
    - myfont.otf
    - resource.json
    - script.js
  - shared
    - message.js
    - serve-static.js
  - server.js


````js
const init = async () => {
  // // 단순 요청
  // const res = await fetch('http://localhost:3001/resource.json');

  // // custom header 요청 (안전하지 않은 헤더 테스트)
  // const res = await fetch('http://localhost:3001/resource.json', {
  //   headers: {
  //     'X-Foo': 'foo',
  //   },
  // });

  // 사전요청 (PUT, PATCH, DELETE 메소드를 사용)
  const res = await fetch('http://localhost:3001/resource.json', {
    method: 'PUT',
  });

  const data = await res.text();
  const jsonEl = document.createElement('pre');
  jsonEl.textContent = data;
  document.body.appendChild(jsonEl);
};

document.addEventListener('DOMContentLoaded', init);
````
{: file="/ch14/public/script.js"}

````js
class Message {
  constructor(text) {
    this.text = text;
    this.timestamp = Date.now();
  }

  toString() {
    return JSON.stringify({
      text: this.text,
      timestamp: this.timestamp,
    });
  }
}

module.exports = Message;
````
{: file="/ch14/shared/message.js"}

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
{: file="/ch14/shared/serve-static.js"}

````js
const http = require('http');
const path = require('path');
const static = require('./shared/serve-static');

const handler = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // 출처명시: http://localhost:3000 도 사용 허용한다.
  res.setHeader('Access-Control-Allow-Headers', 'X-Foo'); // 커스텀 헤더 이름 명시
  res.setHeader('Access-Control-Allow-Methods', 'PUT'); // 사전요청 (PUT, PATCH, DELETE 메소드를 사용)
  res.setHeader('Access-Control-Max-Age', '10'); // 사전 요청은 캐시로 네트워크 비용을 아낄 수 있다.

  static(path.join(__dirname, 'public'))(req, res);
};

const server = http.createServer(handler);
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`server is running ::${port}`));

// $ PORT=3001 node ch14/server
````
{: file="/ch14/server.js"}

