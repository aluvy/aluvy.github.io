---
title: "[HTTP] 03. AJAX - 7장. 진행율과 취소"
date: 2025-04-07 15:37:00 +0900
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

## 7장. 진행율과 취소

### 7-1. 응답 진행율

업로드나 다운로드 시 사용자에게 진행율을 알려줄 수 있다.   
<https://developer.mozilla.org/ko/docs/Web/API/Response#%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4_%EB%A9%94%EC%84%9C%EB%93%9C>

- Response.body 속성
  - <https://developer.mozilla.org/en-US/docs/Web/API/Response/body>
  - <https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream>
- 서버 준비
- 응답 진행율 계산

````shell
$ curl http://localhost:3000/chunk -v
````



### 7-2. 응답 취소

- AbortController
  - <https://developer.mozilla.org/ko/docs/Web/API/AbortController>

- AbortSignal
  - <https://developer.mozilla.org/ko/docs/Web/API/AbortSignal>

- Request: signal 속성
  - <https://developer.mozilla.org/en-US/docs/Web/API/Request/signal>

- 응답 취소 구현



### 7-3. 요청 진행율

- XHR 객체로 요청 진행율 계산
- progres 이벤트 활용



### 7.4 중간정리
- fetch로 응답 진행율을 계산할 수 있다.
- fetch로 응답을 취소할 수 있다.
- XHR 객체로 요청 진행율을 계산할 수 있다.


### 참고
- [Fetch Progress \| JAVASCRIPT.INFO](https://ko.javascript.info/fetch-progress)
- [ReadableStream \| MDN](https://developer.mozilla.org/ko/docs/Web/API/ReadableStream)
- [Fetch Abort \| MDN](https://ko.javascript.info/fetch-abort)
- [AbortController \| MDN](https://developer.mozilla.org/ko/docs/Web/API/AbortController)
- [AbortSignal \| MDN](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
- [XMLHttpRequst \| JAVASCRIPT.INFO](https://ko.javascript.info/xmlhttprequest)


----

## 예제

**파일구조**
- /ch07
  - public
    - favicon.ico
    - index.html
    - script.js
  - shared
    - serve-static.js
  - server.js



````js
class Downloader {
  constructor(controller) {
    this.controller = controller;
  }

  render() {
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download';
    downloadButton.addEventListener('click', () => this.downloadWithAbort());
    document.body.appendChild(downloadButton);
  }

  async downloadWithAbort() {
    try {
      const response = await fetch('/chunk', {
        signal: this.controller.signal,
      });

      const totalLength = Number(response.headers.get('content-length'));
      const chunks = [];
      let receivedLength = 0;

      const render = response.body.getReader();
      while (true) {
        const { done, value } = await render.read();

        if (done) {
          this.renderResponseBody(chunks);
          break;
        }

        chunks.push(value);
        receivedLength += value.length;

        this.renderProgress(receivedLength, totalLength);
      }
    } catch (error) {
      console.error('다운로드 중 오류 발생:', error);
    }
  }

  renderProgress(receivedLength, totalLength) {
    const gaugeEl = document.createElement('div');
    gaugeEl.textContent = `[Progress] ${receivedLength}/${totalLength} byte downloaded.\n`;
    document.body.appendChild(gaugeEl);
  }

  renderResponseBody(chunks) {
    const textDecoder = new TextDecoder('utf-8');
    const responseText = chunks.map((chunk) => textDecoder.decode(chunk)).join('');

    const el = document.createElement('div');
    el.textContent = `[Response] ${responseText}`;
    document.body.appendChild(el);
  }
}

class Aborter {
  constructor(controller) {
    this.controller = controller;
  }

  render() {
    const abortButton = document.createElement('button');
    abortButton.textContent = 'abort';
    abortButton.addEventListener('click', () => {
      this.controller.abort();

      const cancelMsgEl = document.createElement('div');
      cancelMsgEl.textContent = 'Download is canceled.';
      cancelMsgEl.style.color = 'red';
      document.body.appendChild(cancelMsgEl);
    });
    document.body.appendChild(abortButton);
  }
}

class Uploader {
  render() {
    const uploadInput = document.createElement('input');
    uploadInput.type = 'file';
    uploadInput.addEventListener('change', (event) => {
      this.upload(uploadInput.files[0]);
    });
    document.body.appendChild(uploadInput);
  }

  upload(file) {
    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener('progress', (event) => {
      this.renderProgress(event);
    });
    xhr.open('POST', '/upload');
    xhr.send(formData);
  }

  renderProgress(event) {
    let uploadProgress = 0;

    if (event.lengthComputable) {
      uploadProgress = Math.round((event.loaded / event.total) * 100);

      const uploadGauge = document.createElement('div');
      uploadGauge.textContent = `[Progress] ${uploadProgress}% uploaded.`;
      document.body.appendChild(uploadGauge);
    }
  }
}

const init = () => {
  const controller = new AbortController();

  const downloader = new Downloader(controller);
  downloader.render();

  const aborter = new Aborter(controller);
  aborter.render();

  const uploader = new Uploader();
  uploader.render();
};

document.addEventListener('DOMContentLoaded', init);
````
{: file="/ch07/public/script.js"}


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
{: file="/ch07/shared/serve-static.js"}


````js
const http = require('http');
const path = require('path');
const static = require('./shared/serve-static');

const chunk = async (req, res) => {
  const totalChunks = 5;
  const delayMs = 1000;
  const chunkSize = 8;

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', totalChunks * chunkSize);

  for (let i = 0; i < totalChunks; i++) {
    res.write(`chunk ${i}\n`);
    await new Promise((resolve) => setTimeout(resolve, delayMs)); // 지연
  }

  res.end();
};

const upload = (req, res) => {
  res.setHeader('Content-type', 'text/plain');
  res.write('success\n');
  res.end();
};

const handler = (req, res) => {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  if (pathname === '/chunk') return chunk(req, res);
  if (pathname === '/upload') return upload(req, res);

  static(path.join(__dirname, 'public'))(req, res);
};

const server = http.createServer(handler);
server.listen(3000, () => console.log('server is running ::3000'));
````
{: file="/ch07/server.js"}
