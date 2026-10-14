---
date: '2025-04-09 15:37:00 +0900'
title: '[HTTP] 04. 추가 프로토콜 - 9장. 폴링'
summary: '폴링 - 클라이언트가 서버에게 지속적으로 HTTP 요청을 보낸다. - polling (당기다) - 서버 자원이 민감한 환경에서는 이 기법을 신중하게 다뤄야 한다. $ curl http://localhost:3000/poll -v 9-1. 구조 - 지속적인 요청으로 서버와 연결을 유지한다. - 네트워크 대역폭과 서버 자원을 낭비할 수 있다.'
author: ['aluvy']
categories: ['HTTP']
tags: ['']
thumbnail: ''
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

## 9장. 폴링

- 클라이언트가 서버에게 지속적으로 HTTP 요청을 보낸다.
- polling (당기다)
- 서버 자원이 민감한 환경에서는 이 기법을 신중하게 다뤄야 한다.

````shell
$ curl http://localhost:3000/poll -v
````



### 9-1. 구조
- 지속적인 요청으로 서버와 연결을 유지한다.
- 네트워크 대역폭과 서버 자원을 낭비할 수 있다.
- 비유: 새로운 소식이 있나요?


### 9-2. 서버 구현
- 채팅 어플리케이션 제작
- 채팅 메시지 조회 기능
- 채팅 메시지 전송 기능


### 9-3. 클라이언트 구현
- 지속적으로 요청을 생성
  - setTimeout
- 수신한 메시지를 출력

````shell
curl -v -X POST http://localhost:3000/update ^
  -H "Content-Type: application/json" ^
  --data "{\"text\":\"hello\"}"
````


### 9-4. 중간정리

- HTTP 연결을 유지하기 위해 주기적으로 요쳥을 만드는 기법
- 특징: 단순한 구현
- 주의사항 1: 네트웍과 서버 자원을 낭비할 수 있다.
- 주의사항 2: 지연 시간 (실시간성 저하)


### 참고

- [롱 폴링 \| JAVASCRIPT.INFO](https://ko.javascript.info/long-polling)


-----


## 예제
**파일구조**
- /ch09
  - public
    - favicon.ico
    - index.html
    - script.js
  - shared
    - message.js
    - serve-static.js
  - server.js

````js
const pollServer = async () => {
  const INTERVAL_MS = 5000;

  const response = await fetch('/poll');

  if (response.status === 204) {
    setTimeout(pollServer, INTERVAL_MS);
    return;
  }

  const message = await response.json();
  render(message);

  setTimeout(pollServer, INTERVAL_MS);
};

const render = (message) => {
  const messageElement = document.createElement('div');
  const { text } = message;
  const timestamp = new Date(message.timestamp).toLocaleTimeString();
  messageElement.textContent = `${text} (${timestamp})`;
  document.body.appendChild(messageElement);
};

const init = () => {
  pollServer();
};

document.addEventListener('DOMContentLoaded', init);
````
{: file="/ch09/public/script.js"}

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
{: file="/ch09/shared/message.js"}

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
{: file="/ch09/shared/serve-static.js"}

````js
const http = require('http');
const path = require('path');
const static = require('./shared/serve-static');
const Message = require('./shared/message');

let message = null;

const poll = (req, res) => {
  if (!message) {
    res.statusCode = 204; // 204: no content
    res.end();
    return;
  }

  res.setHeader('Content-Type', 'application/json');
  res.write(`${message}\n`); // 본문
  res.end(); // 종료

  message = null;
};

// (POST) 클라이언트 -> 서버
const update = (req, res) => {
  let body = '';

  req.on('data', (chunk) => {
    body = body + chunk.toString();
  });

  req.on('end', () => {
    const { text } = JSON.parse(body);

    if (!text) {
      res.statusCode = 400;
      res.setHeader('content-type', 'application/json');
      res.write(
        JSON.stringify({
          error: 'text 필드를 채워주세요',
        })
      );
      res.end();
      return;
    }

    message = new Message(text);

    res.setHeader('content-type', 'application/json');
    res.write(JSON.stringify(`${message}`));
    res.end();
  });
};

const handler = (req, res) => {
  const { pathname } = new URL(req.url, `https://${req.headers.host}`);

  if (pathname === '/poll') return poll(req, res);
  if (pathname === '/update') return update(req, res);

  static(path.join(__dirname, 'public'))(req, res);
};

const server = http.createServer(handler);
server.listen(3000, () => console.log('server is running ::3000'));
````
{: file="/ch09/server.js"}
