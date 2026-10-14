---
date: '2025-04-11 15:37:00 +0900'
title: '[HTTP] 04. 추가 프로토콜 - 11장. SSE'
summary: 'SSE - SSE(Server Sent Event, HTML5) 서버가 클라이언트로 메시지를 전달하는 프로토콜 < Content-Type: text/event-stream < data: Hello data: Hello again 11-1. 구조 - 서버가 실시간으로 메시지를 보낸다. - 리소스를 효율적으로 사용할 수 있다. - 비유: 새 소식이 오면 알려주세요.'
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

## 11장. SSE
- SSE(Server Sent Event, HTML5) 서버가 클라이언트로 메시지를 전달하는 프로토콜
- <https://developer.mozilla.org/ko/docs/Web/API/Server-sent_events/Using_server-sent_events#필드>
- <https://ko.javascript.info/server-sent-events>

````shell
< Content-Type: text/event-stream
<
data: Hello

data: Hello again
````

### 11-1. 구조
- 서버가 실시간으로 메시지를 보낸다.
- 리소스를 효율적으로 사용할 수 있다.
- 비유: 새 소식이 오면 알려주세요.


### 11-2. 서버 구현
- 클라이언트 대기열 준비
- 알림 구독 기능
- 채팅 메시지 추가 기능

````shell
$ curl http://localhost:3000/subscribe -v

$ curl http://localhost:3000/update ^
--header "Content-Type: application:json" ^
--data "{\"text\": \"hello\"}" -v
````


### 11-3. 클라이언트 구현
- EventSource
- 수신한 메시지 출력



### 11-4. 재연결
- EventSource 객체는 서버와 연결이 끊기면 자동으로 다시 연결
  - 시간 간격 커스텀 가능: retry로 설정
- 이전에 받은 메시지가 있다면 last-event-id 헤더에 값을 실어서 보낸다.

````js
waitingClient.write(
  [
    `retry: 10000\n`,
    `id: ${message.timestamp}\n`, // last event id
    `data: ${message}\n\n`, // 개행
  ].join('')
);
````


### 11-5. 중간 정리
- 클라이언트와 서버 연결 유지 및 '실시간' 메시지 전송 기법
- EventSource
- 특징: 실시간 알림을 위한 프로토콜
- 주의사항: 단방향 메시지


### 참고
- [Server Sent Events \| JAVASCRIPT.INFO](https://ko.javascript.info/server-sent-events)


-----


## 예제
**파일구조**
- /ch11
  - public
    - favicon.ico
    - index.html
    - script.js
  - shared
    - message.js
    - serve-static.js
  - server.js

````js
const subscribe = () => {
  const eventSource = new EventSource('/subscribe'); // eventSource 객체
  eventSource.addEventListener('message', (event) => {
    render(JSON.parse(event.data));
  });
};

const render = (message) => {
  const messageElement = document.createElement('div');
  const { text } = message;
  const timestamp = new Date(message.timestamp).toLocaleTimeString();
  messageElement.textContent = `${text} (${timestamp})`;
  document.body.appendChild(messageElement);
};

const init = () => {
  subscribe();
};

document.addEventListener('DOMContentLoaded', init);
````
{: file="/ch11/public/script.js"}

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
{: file="/ch11/shared/message.js"}

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
{: file="/ch11/shared/serve-static.js"}

````js
const http = require('http');
const path = require('path');
const static = require('./shared/serve-static');
const Message = require('./shared/message');

let waitingClients = [];
let message = null;

const subscribe = (req, res) => {
  const lastEventId = req.headers['last-event-id'];
  console.log('lastEventId', lastEventId);

  res.setHeader('Content-Type', 'text/event-stream');
  res.write('\n');

  waitingClients.push(res);

  req.on('close', () => {
    waitingClients = waitingClients.filter((client) => client !== res);
  });
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
      waitingClient.write(
        [
          `retry: 10000\n`,
          `id: ${message.timestamp}\n`, // last event id
          `data: ${message}\n\n`, // 개행
        ].join('')
      );
    }

    res.write(`${message}`);
    res.end();
  });
};

const handler = (req, res) => {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  if (pathname === '/subscribe') return subscribe(req, res);
  if (pathname === '/update') return update(req, res);

  static(path.join(__dirname, 'public'))(req, res);
};

const server = http.createServer(handler);
server.listen(3000, () => console.log('server is running ::3000'));
````
{: file="/ch11/server.js"}

