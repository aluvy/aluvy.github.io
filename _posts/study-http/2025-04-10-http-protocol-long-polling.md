---
title: "[HTTP] 04. 추가 프로토콜 - 10장. 롱 폴링"
date: 2025-04-10 15:37:00 +0900
categories: [Study, HTTP]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

# 04. 추가 프로토콜

- 🔗 <https://github.com/jeonghwan-kim/lecture-http>
- 🔗 <https://jeonghwan-kim.github.io/2024/07/10/lecture-http-part4>


- HTTP의 비연결성을 극복하는 다양한 기술


- 9장. 폴링: 클라이언트가 주기적으로 서버에 요청을 보내서 새로운 데이터를 확인하는 방법
- 10장. 롱 폴링: 폴링보다 효율적인 통신 기법
- 11장. SSE: 서버가 클라이언트로 실시간 데이터를 푸시하는 방법
- 12장. 웹 소켓: 클라이언트와 서버 간의 양방향 통신 프로토콜

---

## 10장. 롱 폴링
- <https://ko.javascript.info/long-polling>
- 폴링의 단점 개선 (클라이언트가 불필요한 요청을 줄일 수 있다.)
- 장점: 네트워크 비용 절감
- 단점: 서버의 자원 낭비


### 10-1. 구조
- 서버에 요청하고 데이터가 올 때까지 대기한다. (새로운 데이터가 있을 때까지 연결을 지속한다.)
- 서버 자원을 낭비할 수 있다.
- 비유: 새로운 소식이 있나요? 잠깐만 기다려 보세요.


### 10-2. 서버 구현
- 클라이언트 대기열 준비
- 채팅 메시지 조회 기능
- 채팅 메시지 추가 기능

````shell
$ curl http://localhost:3000/longPoll -v

$ curl http://localhost:3000/update ^
--header "Content-Type: application:json" ^
--data "{\"text\": \"hello\"}" -v
````


### 10-3. 클라이언트 구현
- 지속적으로 요청 생성
- 수신한 메시지를 출력


### 10-4. 중간 정리
- HTTP 연결을 유지하기 위해 응답을 지연하는 기법
- 특징: 실시간성
- 주의사항: 서버 자원을 낭비할 수 있다.


### 참고
- [롱 폴링 \| JAVASCRITP.INFO](https://ko.javascript.info/long-polling)


-----


## 예제
**파일구조**
- /ch10
  - public
    - favicon.ico
    - index.html
    - script.js
  - shared
    - message.js
    - serve-static.js
  - server.js


````js
const longPollServer = async () => {
  const response = await fetch('/longPoll');

  if (response.status == 408) {
    longPollServer(); // 재요청
    return;
  }

  const message = await response.json();
  render(message);

  longPollServer(); // 재요청
};

const render = (message) => {
  const messageElement = document.createElement('div');
  const { text } = message;
  const timestamp = new Date(message.timestamp).toLocaleTimeString();
  messageElement.textContent = `${text} (${timestamp})`;
  document.body.appendChild(messageElement);
};

const init = () => {
  longPollServer();
};

document.addEventListener('DOMContentLoaded', init);
````
{: file="/ch10/public/script.js"}

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
{: file="/ch10/shared/message.js"}

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
{: file="/ch10/shared/serve-static.js"}

````js
const http = require('http');
const path = require('path');
const static = require('./shared/serve-static');
const Message = require('./shared/message');

let waitingClients = []; // 대기중인 클라이언트의 배열
let message = null;

const longPoll = (req, res) => {
  const WAITING_TIMES_MS = 10000;

  if (!message) {
    waitingClients.push(res);

    res.setTimeout(WAITING_TIMES_MS, () => {
      res.statusCode = 408;
      res.end();
    });

    return;
  }

  if (res.headersSent) {
    res.setHeader('Content-Type', 'application/json');
    res.write(`${message}\n`);
    res.end;
  }

  message = null;
};

const update = (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body = body + chunk.toString();
  });

  req.on('end', () => {
    const { text } = JSON.parse(body);

    if (!text) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({ error: 'text 필드를 채워주세요' }));
      res.end();
      return;
    }

    message = new Message(text);

    for (const waitingClient of waitingClients) {
      if (!waitingClient.headersSent) {
        waitingClient.setHeader('content-type', 'application/json');
        waitingClient.write(`${message}`);
        waitingClient.end();
      }
    }

    if (!res.headersSent) {
      res.setHeader('Content-Type', 'application/json');
      res.write(`${message}`);
      res.end();
    }

    message = null;
    waitingClients = [];
  });
};

const handler = (req, res) => {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  if (pathname === '/longPoll') return longPoll(req, res);
  if (pathname === '/update') return update(req, res);

  static(path.join(__dirname, 'public'))(req, res);
};

const server = http.createServer(handler);
server.listen(3000, () => console.log('server is running ::3000'));
````
{: file="/ch10/server.js"}

