---
title: "[HTTP] 04. 추가 프로토콜 - 12장. 웹 소켓"
date: 2025-04-12 15:37:00 +0900
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

## 12장. 웹 소켓
- <https://ko.javascript.info/websocket>


### 12-1. 구조
- HTTP는 단방향성의 한계가 있음
- 웹 소켓 프로토콜
- WebSocket API


#### 12-1-1. 웹 소켓 설치

````shell
$ cd ch12 // 폴더 이동
$ npm init // npm 초기화 하여 자동으로 package.json 파일 생성
$ npm i ws@8  // 웹 소켓 8버전 설치
````

package.json에 dependencies 에 웹 소켓 버전이 추가 됨

````json
"dependencies": {
    "ws": "^8.18.3"
  }
````

````shell
$ nc localhost 3000 -c
GET / HTTP/1.1
Connection: Upgrade
Upgrade: websocket
Sec-Websocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-Websocket-Version: 13

HTTP:1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+x0o=

?Welcome
````


#### 12-1-2. 웹 브라우저 콘솔창에서 테스트
웹 브라우저 콘솔 창에 아래 내용을 입력

````console
const ws = new WebSocket('sw://localhost:3000');
ws.send('Hello');
````

크롬 개발자모드 Network 탭에서 확인할 수 있다.

- Response Headers

  ````
  HTTP/1.1 101 Switching Protocols
  Upgrade: websocket
  Connection: Upgrade
  Sec-WebSocket-Accept: 3/lD4DJB9zdAehX5JZzCruDgpDs=
  ````

- Request Headers
  ````
  GET ws://localhost:3000/ HTTP/1.1
  Host: localhost:3000
  Connection: Upgrade
  Pragma: no-cache
  Cache-Control: no-cache
  User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36
  Upgrade: websocket
  Origin: http://localhost:3000
  Sec-WebSocket-Version: 13
  ...
  ````

### 12-2. 서버 구현
- <https://github.com/websockets/ws?tab=readme-ov-file#external-https-server>
- 웹 소켓을 웹서버와 통합
- 클라이언트 대기열 준비
- 채팅 기능 구현
- HTTP가 메시지를 서로 주고 받았다면, 웹 소켓은 프레임을 주고 받는다.


- 채팅: 클라이언트에서 받은 메시지를 다른 클라이언트에게 그대로 전달한다.



### 12-3. 클라이언트 구현
- 채팅 UI
- 웹 소켓 연결
- 수신한 메시지를 클릭
- 메시지 전송

2개의 브라우저로 http://localhost:3000 으로 각각 접속하여 메시지를 보내면 서로 메시지를 주고받는 채팅 구현을 확인할 수 있다.



### 12-4. 중간 정리
- 웹 소켓 프로토콜
- WebSocket API
- 특징: 실시간 양방향 통신
- 주의사항: 연결 관리



### 참고
- [웹 소켓 \| JAVASCRIPT.INFO](https://ko.javascript.info/websocket)

----


## 예제
**파일구조**
- /ch12
  - node_modules
    - sw
    - .package-lock.json
  - public
    - favicon.ico
    - index.html
    - script.js
  - shared
    - message.js
    - serve-static.js
  - package-lock.json
  - package.json
  - server.js




````js
let webSocket;

const subscribe = () => {
  webSocket = new WebSocket(`ws://${location.host}`);
  webSocket.addEventListener('message', (event) => {
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

const initSendButton = () => {
  const sendButtonEl = document.querySelector('#send-button');
  sendButtonEl.addEventListener('click', () => {
    const textFieldEl = document.querySelector('#text-field');
    const textValue = textFieldEl.value;
    if (!textValue) return;

    textFieldEl.value = '';

    if (!webSocket) return;

    webSocket.send(textValue);
  });
};

const init = () => {
  subscribe();
  initSendButton();
};

document.addEventListener('DOMContentLoaded', init);
````
{: file="/ch12/public/script.js"}


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
{: file="/ch12/shared/message.js"}


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
{: file="/ch12/shared/serve-static.js"}


````json
{
  "name": "ch12",
  "version": "1.0.0",
  "description": "🔗 https://github.com/jeonghwan-kim/lecture-http  \r 🔗 https://jeonghwan-kim.github.io/2024/07/10/lecture-http-part4",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "ws": "^8.18.3"
  }
}
````
{: file="/ch12/package.json"}




````js
const http = require('http');
const path = require('path');
const { WebSocketServer } = require('ws');
const static = require('./shared/serve-static');
const Message = require('./shared/message');

const handler = (req, res) => {
  static(path.join(__dirname, 'public'))(req, res);
};

const server = http.createServer(handler);
server.listen(3000, () => console.log('server is running ::3000'));

const webSocketServer = new WebSocketServer({ server });
const webSocketClients = [];

// 연결
webSocketServer.on('connection', (webSocket) => {
  console.log('connection handshaking');

  const message = new Message('서버와 연결되었습니다.');
  webSocket.send(`${message}`);

  webSocketClients.push(webSocket);

  webSocket.on('message', (data) => {
    for (const webSocketClient of webSocketClients) {
      const text = `${webSocket === webSocketClient ? 'me:' : 'other:'} ${data.toString('utf-8')}`;
      const message = new Message(text);
      webSocketClient.send(`${message}`);
    }
  });
});
````
{: file="/ch12/server.js"}






