---
title: "[HTTP] 06. 성능 - 16장. 로딩 최적화"
date: 2025-04-16 15:37:00 +0900
categories: [Study, HTTP]
tags: []
render_with_liquid: false
math: true
mermaid: true
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

## 16장. 로딩 최적화
- <https://developer.mozilla.org/ko/docs/Web/Performance/Guides/Critical_rendering_path>
- <https://ko.javascript.info/script-async-defer>
- <https://developer.mozilla.org/ko/docs/Web/HTML/Reference/Attributes/rel/preload>
- <https://developer.mozilla.org/ko/docs/Glossary/Prefetch>
- <https://developer.mozilla.org/ko/docs/Web/HTML/Reference/Elements/img>



### 16-1. 렌더링 과정
- DSN 질의
- HTML 문서 획득
- 주요 렌더링 경로 (Critical Rendering Path, CRP)
- 파싱을 차단하는 HTTP 요청

렌더링 순서
1. 파싱 : 코드를 한 줄 씩 읽으면서 브라우저에게 의미있는 단위로 쪼개는 작업 수행
2. COM / CSSOM
3. 렌더트리
4. 레이아웃
5. 페인팅



### 16-2. script 태그의 렌더링 영향도
- 웹 서버 준비
- 자바스크립트를 로딩하는 웹 문서 준비
- 응답 지연 기능 추가
- PerformanceAPI로 정확한 시간 측정



### 16-3. Async
파싱과 동시에 파일을 다운로드

- 파싱과 동시에 파일을 다운로드하는 방법
- 다운로드 완료한 순서대로 실행한다.
- DOM에 무관하거나 서로 영향을 주지 않는 스크립트에 적합, 광고나 분석 트래커

````js
<script src="script-big.js" async></script>
````


### 16-4. Defer
파싱과 동시에 파일을 다운로드 + **실행은 하지 않고 기다린다.**   
코드에 정의 된 순서대로 스크립트를 실행한다.

- 순서대로 실행해야하는 스크립트
- **미리 다운로드한 뒤 실행 순서를 보장하는 방법**
- 서로 의존하는 스크립트에 적합

````js
<script src="script-big.js" defer></script>
````


### 16-5. Preload
- 웹문서에 필요한 자원을 미리 다운로드하는 방법
- 용량이 큰 이미지를 다운로드하는 상황
- 클릭과 동시에 이미지가 렌더링되도록 개선
- 이미지, 비디오, 스타일시트, 폰트, 자바스크립트 등에 활용

````html
<link rel="preload" href="cat.jpg" as="image" />
````


### 16-6. Prefetch
- **다음 페이지에서 사용할 자원을 미리 다운로드**하는 방법
- 용량이 큰 다음 페이지로 이동하는 상황
- 링크 이동과 동시에 페이지가 렌더링되도록 개선
- 다음 문서의 렌더링 성능을 높일 때 활용

````html
<link rel="prefetch" href="index-next.html" as="html" />
````

- link prefetch는 아직 모든 브라우저에서 동작하지 않는다.
- 어플리케이션의 브라우저 지원 범위를 고려하면서 사용해야 한다.
- <https://caniuse.com/?search=link+prefetch>


### 16-7. 이미지 지연 로딩
- 브라우저가 img 태그의 이미지를 다운로드하는 시점
- 뷰 포트 안에 이미지만 다운로드하고 밖에 있는 이미지는 지연 로딩
- 이미지가 많은 사진첩이나 블로그에서 활용

````js
<img src="dog.jpg" alt="dog" loading="lazy" />
````


### 16-8. 중간 정리
- 주요 렌더링 경로에서 추가적인 HTTP 요청은 성능에 영향을 준다.
- **Async** 속성으로 자바스크립트를 비동기로 다운로드 할 수 있다.
- **Defer** 속성으로 자바스크립트의 실행 순서를 보장할 수 있다.
- **Preload** 로 웹 페이지에 필요한 자원을 미리 다운로드할 수 있다.
- **Prefetch** 로 다음 페이지에 필요한 자원을 미리 다운로드 할 수 있다.
- **loading="lazy"** 로 img 태그로 로딩하는 이미지는 지연 로딩할 수 있다.


### 참고
- [주요 렌더링 경로 \| MDN](https://developer.mozilla.org/ko/docs/Web/Performance/Guides/Critical_rendering_path)
- [defer, async 스크립트 \| JAVASCRITP.INFO](https://ko.javascript.info/script-async-defer)
- [preload \| MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Reference/Attributes/rel/preload)
- [prefetch \| MDN](https://developer.mozilla.org/ko/docs/Glossary/Prefetch)
- [img \| MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Reference/Elements/img)

----

## 예제
**파일구조**
- /ch16
  - public
    - cat.jpg
    - dog.jpg
    - favicon.ico
    - index-next.html
    - index.html
    - script-big.js
    - script-small.js
  - shared
    - message.js
    - serve-static.js
  - server.js


````html
<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>next</title>
</head>

<body>
  <h1>Next Page</h1>
</body>

</html>
````
{: fild="/ch16/public/index-next.html"}

````html
<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CH16</title>
  <style>
    img {
      width: 50%;
    }
  </style>
  <script>
    window.addEventListener('DOMContentLoaded', () => {
      console.log('DOMContentLoaded');
    })

    window.addEventListener('load', () => {
      console.log('load');
      const entries = performance.getEntriesByType('measure');
      entries.forEach(entry => {
        const result = `${entry.name}: ${entry.startTime}, ${entry.duration}ms`;
        console.log(result);
      })
    })
  </script>

  <!-- preload -->
  <link rel="preload" href="cat.jpg" as="image">

  <!-- Prefetch -->
  <link rel="prefetch" href="index-next.html" as="html">
</head>

<body>
  <script>
    performance.mark("script-big-start");
  </script>
  <!-- <script src="script-big.js" async></script> -->
  <script src="script-big.js" defer></script>
  <script>
    performance.mark("script-small-start");
  </script>
  <!-- <script src="script-small.js" async></script> -->
  <script src="script-small.js" defer></script>

  <button type="button" id="addImageButton">Add Image</button>
  <script>
    document.querySelector("#addImageButton").addEventListener('click', () => {
      const img = document.createElement('img');
      img.src = 'cat.jpg';
      document.body.appendChild(img);
    })
  </script>

  <!-- Prefetch -->
  <a href="index-next.html">Next Page</a>

  <img src="cat.jpg" alt="cat">
  <div style="height: 1000vh; border: 1px solid #000;">
    Empty Box
  </div>
  <img src="dog.jpg" alt="dog" loading="lazy">
</body>

</html>
````
{: fild="/ch16/public/index.html"}

````js
console.log('script-big.js');

window.foo = () => console.log('foo is excuted.');

performance.mark('script-big-end');
performance.measure('script-big excution time', 'script-big-start', 'script-big-end');
````
{: fild="/ch16/public/script-big.js"}

````js
console.log('script-small.js');

foo(); // Async 로 호출하면 에러 발생

performance.mark('script-small-end');
performance.measure('script-small excution time', 'script-small-start', 'script-small-end');
````
{: fild="/ch16/public/script-small.js"}

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
{: fild="/ch16/shared/message.js"}

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

      // 딜레이 발생
      if (res.delayMs) {
        setTimeout(() => {
          res.write(data);
          res.end();
        }, res.delayMs);
        return;
      }

      res.write(data);
      res.end();
    });
  };
};

module.exports = serveStatic;
````
{: fild="/ch16/shared/serve-static.js"}

````js
const http = require('http');
const path = require('path');
const static = require('./shared/serve-static');

const handler = (req, res) => {
  const filename = path.basename(req.url);

  // delay
  if (filename === 'script-big.js') res.delayMs = 3000;
  if (filename === 'script-small.js') res.delayMs = 1000;

  if (filename === 'cat.jpg') res.delayMs = 1000;
  if (filename === 'dog.jpg') res.delayMs = 1000;

  if (filename === 'index-next.html') {
    res.delayMs = 3000;
    res.setHeader('Cache-Control', 'max-age=3600'); // for firefox
  }

  static(path.join(__dirname, 'public'))(req, res);
};

const server = http.createServer(handler);
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`server is running ::${port}`));
````
{: fild="/ch16/server.js"}

