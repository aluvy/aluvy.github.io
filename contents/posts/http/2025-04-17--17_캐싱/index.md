---
date: '2025-04-17 15:37:00 +0900'
title: '[HTTP] 06. 성능 - 17장. 캐싱'
summary: '캐싱 캐시는 데이터를 미리 복사해 놓는 별도의 저장소를 말한다. 반복 작업을 줄이고 어플리케이션의 성능을 높여주는 역할을 한다. 시간 기반 캐싱 - 서버가 파일 수정일을 Last-Modified 응답 헤더에 싣는다. - 브라우저가 파일을 캐싱하고 If-Modified-Since 요청 헤더에 싣는다.'
author: ['aluvy']
categories: ['HTTP']
tags: ['']
thumbnail: ''
---

# 06. 성능

- 🔗 <https://github.com/jeonghwan-kim/lecture-http>
- 🔗 <https://jeonghwan-kim.github.io/2024/07/12/lecture-http-part6>


- 브라우저가 웹 페이지를 렌더링할 때 발생하는 HTTP 요청을 효율적으로 제어하는 다양한 기법


- 16장. 렌더링 최적화
  - 외부 리소스의 로드 시점을 제어해 웹 성능을 최적화하는 기술
- 17장. 캐시
  - 서버와 브라우저가 HTTP 헤더를 통해 캐싱 정책을 주고받아 성능을 최적화하는 메커니즘

---

## 17장. 캐싱
캐시는 데이터를 미리 복사해 놓는 별도의 저장소를 말한다.   
반복 작업을 줄이고 어플리케이션의 성능을 높여주는 역할을 한다.

- <https://developer.mozilla.org/ko/docs/Web/HTTP/Guides/Caching>
- <https://jeonghwan-kim.github.io/2024/02/08/http-caching>
- <https://web.dev/articles/http-cache?hl=ko#examples>
- <https://web.dev/articles/http-cache?hl=ko>
- <https://web.dev/articles/codelab-http-cache?hl=ko>



### 17-1. 시간 기반 캐싱
- 서버가 파일 수정일을 Last-Modified 응답 헤더에 싣는다.
- 브라우저가 파일을 캐싱하고 If-Modified-Since 요청 헤더에 싣는다.

````js
const modified = stat.mtime;

if (req.headers['if-modified-since']) {
  const modifiedSince = new Date(req.headers['if-modified-since']);

  const isFresh = !(Math.floor(modifiedSince.getTime() / 1000) < Math.floor(modified.getTime() / 1000));

  if (isFresh) {
    res.statusCode = 304; // Not Modified
    res.end();
    return;
  }
}

res.setHeader('Last-Modified', modified.toUTCString());
````


### 17-2. 내용 기반 캐싱
- 시간 기반의 캐시는 한계가 있다.
- 파일 내용을 비교하는 방법을 ETag라고 한다.
- 서버가 해당 패시값을 ETag 응답 헤더에 싣는다.
- 브라우저가 파일을 캐싱하고 If-None-Match 요청 헤더에 싣는다.

````js
const etag = `${stat.mtime.getTime().toString(16)}-${stat.size.toString(16)}`;

if (req.headers['if-none-match']) {
  const noneMatch = req.headers['if-none-match'];

  const isFresh = noneMatch === etag;

  if (isFresh) {
    res.statusCode = 304; // Not Modified
    res.end();
    return;
  }
}

res.setHeader('ETag', etag);
````


### 17-3. 캐시 제어
- 서버는 더 세밀한 캐시 정책을 Cache-Control 응답 헤더에 싣는다.
  - max-age: 브라우저가 자원을 일정기간 캐싱하고 서버에 접속하지 않는다.
  - no-cache: 브라우저는 캐시가 신선한지 매번 서버에 접속해 확인한다.
  - no-store: 브라우저는 이 자원을 캐싱하지 않는다.

````shell
< Cache-Control: max-age=5  # 5초
< Cache-Control: max-age=0
< Cache-Control: no-cache
< Cache-Control: no-store # 캐싱하지 마
````


### 17-4. 기타 캐싱 헤더
- Expires: 서버가 파일의 캐시 만료일을 지정하는 응답 헤더 (서버에 접속하지 않고 브라우저에 캐싱한 정보만 사용한다.)
  - 다른 시간 컨트롤 헤더와 비교
    - Last-Modified: 매번 서버에 접속해서 캐시 신선도를 검증한다.
    - Cache-Control: max-age=xxx: 초단위 값 사용

````shell
# 서버가 파일의 유효기간을 Expires라는 응답 헤더에 싣는다.
< Expires: Tue, 31 Dec 2024 15:00:00 GMT
````

- Vary: 서버가 클라이언트에게 캐시 식별자를 전달하는 헤더

````shell
# accept-language별로 응답을 구상하라
< Vary: accept-language
````



### 17-5. 캐싱 활용 전략
- HTML이 아닌 파일: 최대한 길게 캐싱한다. (1년 설정 권장, Cache-Control: max-age=315360000)
- HTML 파일: 서버에 캐시 신선도를 확인한다.
- 파일별로 Cache-Control 캐시 정책을 전달해 브라우저가 네트웍 요청을 최소화 하도록 유도한다.

````js
const ext = path.extname(filepath).toLowerCase();

if (ext === '.js') {
  // 자바스크립트는 한 번 다운로드 하면 1년 동안 네트워크 요청을 하지 않고 브라우저 캐시에 있는 값을 사용하도록 설정
  res.setHeader('Cache-Control', 'max-age=315360000'); // 1년
} else if (ext === '.html') {
  // 캐시는 저장하지만 브라우저가 매번 이 캐시가 유효한지를 서버한테 확인하라는 정책
  res.setHeader('Cache-Control', 'no-cache');
}
````


### 17-6. 중간 정리
- 브라우저와 서버 간의 캐시 관련 HTTP 헤더
- 브라우저와 서버 간의 HTTP 캐싱 매커니즘 정리
- 캐시를 설정할 때는 무척 신중해야 한다.


### 출처
- [HTTP 캐싱 \| MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/Guides/Caching)
- [HTTP 캐싱 \| 김정환블로그](https://jeonghwan-kim.github.io/2024/02/08/http-caching)
- HTTP 완벽가이드 > 7장 캐시
- 리얼월드 HTTP > 2.8 캐시
- [캐시로 불필요한 네트워크 요청 방지 \| web.dev](https://web.dev/articles/http-cache?hl=ko#examples)
- [HTTP 캐시로 불필요한 네트워크 요청 방지 \| web.dev](https://web.dev/articles/http-cache?hl=ko)
- [HTTP 캐싱 동작 구성 \| web.dev](https://web.dev/articles/codelab-http-cache?hl=ko)


----

## 예제
**파일구조**
- /ch17
  - public
    - favicon.ico
    - index.html
    - script.hash-1.js
  - shared
    - serve-static.js
  - server.js


````js
console.log('script.hash-1.js');
````
{: file="/ch17/public/script.hash-1.js"}

````js
const fs = require('fs');
const path = require('path');

const serveStatic = (root) => {
  return (req, res) => {
    const filepath = path.join(root, req.url === '/' ? '/index.html' : req.url);

    fs.stat(filepath, (err, stat) => {
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

      const etag = `${stat.mtime.getTime().toString(16)}-${stat.size.toString(16)}`;
      const modified = stat.mtime;

      if (req.headers['if-none-match']) {
        const noneMatch = req.headers['if-none-match'];

        const isFresh = noneMatch === etag;

        if (isFresh) {
          res.statusCode = 304; // Not Modified
          res.end();
          return;
        }
      }

      if (req.headers['if-modified-since']) {
        const modifiedSince = new Date(req.headers['if-modified-since']);

        const isFresh = !(Math.floor(modifiedSince.getTime() / 1000) < Math.floor(modified.getTime() / 1000));

        if (isFresh) {
          res.statusCode = 304; // Not Modified
          res.end();
          return;
        }
      }

      res.setHeader('ETag', etag);
      res.setHeader('Last-Modified', modified.toUTCString());

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

        if (ext === '.js') {
          // 자바스크립트는 한 번 다운로드 하면 1년 동안 네트워크 요청을 하지 않고 브라우저 캐시에 있는 값을 사용하도록 설정
          res.setHeader('Cache-Control', 'max-age=315360000'); // 1년
        } else if (ext === '.html') {
          // 캐시는 저장하지만 브라우저가 매번 이 캐시가 유효한지를 서버한테 확인하라는 정책
          res.setHeader('Cache-Control', 'no-cache');
        }

        res.write(data);
        res.end();
      });
    });
  };
};

module.exports = serveStatic;
````
{: file="/ch17/shared/serve-static.js"}

````js
const http = require('http');
const path = require('path');
const static = require('./shared/serve-static');

const handler = (req, res) => {
  static(path.join(__dirname, 'public'))(req, res);
};

const server = http.createServer(handler);
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`server is running ::${port}`));
````
{: file="/ch17/server.js"}
