---
title: "[HTTP] 02. 브라우저 - 4장. 쿠키"
date: 2025-04-04 15:37:00 +0900
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


## 4장. 쿠키

- 쿠키의 시초: 매킥 쿠키. 쇼핑카트
- HTTP 관점으로 보아야 쿠키를 제대로 이해할 수 있다.
  - HTTP 헤더나 보안을 위한 옵션 등이 있어서 쿠키는 HTTP 관점으로 바라봐야 더 정확하게 이해할 수 있다.

> 쿠키가 브라우저 저장소 중 하나라고 알고 있는 경우가 있는데, 다른 저장소와 조금 다르다.   
> 쿠키와 다른 브라우저 저장소와 다른 점: 서버에서 값을 만들어 네트워크에 실은 뒤에 브라우저에 저장하는 구조
{: .prompt-tip}


### 4.1 쿠키 헤더

- 무상태 HTTP
- Set-Cookie 응답 헤더와 Cookie 요청 헤더

````shell
< Set-Cookie: sid=1 # sid: session id
> Cookie: sid=1
````

- 클라이언트를 식별할 수 있는 서버 제작



### 4.2 쿠키 유효 범위

Set-Cookie 응답 헤더를 받은 브라우저가 이후에 발생할 모든 HTTP 요청에 이 값을 보내지는 않는다.   
기본적으로 같은 도메인으로 요청할 때만 쿠키를 전달한다.
브라우저가 쿠키와 도메인을 함께 기억한다.

- Domain 쿠키 디렉티브
  ````shell
  < Set-Cookie: sid=1; Domain=mysite.com
  ````

- Path 쿠키 디렉티브
  - /private 경로로 요청할때만 쿠키를 보낸다.
  ````
  < Set-Cookie: sid=1; Path=/private
  ````


### 4.3 쿠키 생명주기
브라우저는 종료될 때 쿠키를 삭제한다.   
서버와 브라우저 간의 연결을 세션이라고 부르는데, 세션과 같은 수명의 쿠키를 세션쿠키라고 부른다.   
Max-Age와 Expries는 쿠키 수명을 지정하는 쿠키 디렉티브이다.   
서버는 브라우저가 쿠키를 얼마나 오래 저장할 지 지정할 수 있다. (초 단위로 설정)

- 세션 쿠키 (Session Cookie)
- Max-Age와 Expries 쿠키 디렉티브

````shell
< Set-Cookie: sid=1, Max-Age=10 # 10초
````

- 영속적인 쿠키(Permanent Cookie): 세션과 상관없이 일정 기간 유지하는 쿠키





### 4.4 쿠키 Secure

쿠키는 평문을 사용한다.   
누구라도 중간에 네트워크 패킷을 가로채면 읽을 수 있다는 말이다.   
TCP와 HTTP 중간에 보안 계층인 TLS(Transport Layer Security) 를 추가하면 통신 패킷을 가로채도 해석할 수 없는데 바로 이것이 HTTPS이다. 쿠키를 HTTPS로 전달하면 보안계층에 의해서 암호화 된다.   
패킷을 가로채더라도 쿠키값을 읽을 수 없다.

여기서는 HTTP에서만 동작하는 쿠키 디렉티브를 살펴본다.

- 쿠키는 평문이라 유출될 수 있다.
- Secure 쿠키 디렉티브

````shell
< Set-Cookie: sid=1; Secure
````






#### 4.4.1 인증서 만들기 (https 서버 만들기)

- ch04 폴더에 https-server 폴더 생성
- 폴더에 인증서 만들기

````shell
$ cd ch04/https-server
$ openssl req -nodes -new -x509 -keyout server.key -out server.cert
````

엔터를 치면 몇가지 묻는데

- Country Name (2 letter code) [AU]: KO
- State or Province Name (full name) [Some-State]: Seoul

정도만 쓰고 나머지는 엔터,   
실행하면 ch04/https-server 폴더에 server.cert 파일과 server.key 파일이 생성되어 있다.

- server.key: private key
- server.cert: 인증서

위 2 파일을 사용하면 https 서버를 만들 수 있다.   
server.js 설정을 마친 후 https://localhost:3000/ 로 접속 가능




### 4.5 쿠키 HttpOnly

네트워크 외에도 쿠키가 탈취될 수 있는 경우는 더 있다.   
바로 자바스크립트로 접근할 수 있는 document.cookie 다.

````js
document.cookie; // "sid=1"
document.cookie = 'sid=2'; // "sid=2"로 바꿀 수 있다.
document.cookie; // "sid=2"
````

악의적인 목적으로 쿠키를 변경한다면 요청이 위조될 수 있는 위험이 있다.   
애초에 자바스크립트로 쿠키의 접근을 차단한다면 이런 악용 시나리오도 예방할 수 있다.

- 자바스크립트로 쿠키를 위조할 수 있다.
- HttpOnly 쿠키 디렉티브
  - 자바스크립트로부터 쿠키 접근을 차단하고 오직 http 요청에만 쿠키를 사용할 때 쓰는 디렉티브
  - 서버는 클라이언트에게 HTTP 요청에만 이 쿠키를 사용하라고 지시
  - HttpOnly 디렉티브를 받은 브라우저는 자바스크립트로 document.cookie에 접근하는 것을 차단한다.

````shell
< Set-Cookie: sid=1; httpOnly
````


### 4.6 쿠키 라이브러리(서버)

- 쿠키 데이터를 문자열로 변환하는 함수: Express.js res.cookie()
  - <https://github.com/expressjs/express/blob/master/lib/response.js#L749>

- 문자열을 쿠키 데이터로 변환하는 함수: cookie-parser
  - <https://github.com/expressjs/cookie-parser/blob/master/index.js>



### 4.7 쿠키 라이브러리(브라우저)

- 브라우저에서 쿠키를 제어하는 사례. '오늘 하루 다시 보지 않기'
- 쿠키 데이터를 변경/조회/삭제하는 라이브러리: js-cookie
  - <https://github.com/js-cookie/js-cookie/tree/main>
  - <https://github.com/js-cookie/js-cookie/blob/main/src/api.mjs>

````js
document.cookie = 'checked=true; MaxAge=86400';
````

````js
// js-cookie
Cookie.set('checked', true, { ['Max-Age']: 86400 });
Cookie.get('checked'); // true
Cookie.remove('checked'); // 쿠키의 checked 값을 지운다.
````


### 4.8 중간정리
- 상태가 없는 HTTP에 상태를 추가할 목적으로 쿠키를 사용합니다.
- 쿠키 유효범위 디렉티브: Domain, Path
- 쿠키 생명 주기 디렉티브: Max-Age, Expires
- 쿠키 보안 디렉티브: Secure, HttpOnly
- 쿠키 라이브러리

### 참고
- [HTTP 쿠키 \| 김정환블로그](https://jeonghwan-kim.github.io/2024/03/04/http-cookie)
- [HTTP 쿠키 \| 위키피디아](https://ko.wikipedia.org/wiki/HTTP_%EC%BF%A0%ED%82%A4)
- [HTTP 쿠키 \| MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/Guides/Cookies)
- [쿠키와 document.cookie \| JAVASCRIPT INFO](https://ko.javascript.info/cookie)
- 도서) HTTP 완벽가이드 > 11.6 쿠키
- 도서) 리얼월드 HTTP > 2.5 쿠키


-------

## 예제

**파일구조**

- /ch04
  - https-server
    - server.sert
    - server.js
    - server.key
  - server.js


````
-----BEGIN CERTIFICATE-----
MIIDYTCCAkmgAwIBAgIUZp2rm31rG0gkzcl0fXofIYrTHZEwDQYJKoZIhvcNAQEL
BQAwQDELMAkGA1UEBhMCS08xDjAMBgNVBAgMBVNlb3VsMSEwHwYDVQQKDBhJbnRl
cm5ldCBXaWRnaXRzIFB0eSBMdGQwHhcNMjUwODI3MDc1NjQ5WhcNMjUwOTI2MDc1
NjQ5WjBAMQswCQYDVQQGEwJLTzEOMAwGA1UECAwFU2VvdWwxITAfBgNVBAoMGElu
dGVybmV0IFdpZGdpdHMgUHR5IEx0ZDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCC
AQoCggEBAMZbdml3BXIcgJmVqPlxFs9kxmIMJ+eZazReQqYRs7wPdnZeUEW+4O7a
NP7Lms212N7AXCgZ/TU412Cq8/XirM2+Wr+nl8E8SvoJYFDb/+q7RdI3G5WBx8en
/6VdyJMm7FORYrN4wZ2H2mDBgWCaZH6vhMQex3oBm2QtZfpSs/T0oS/tEFKf8ISu
E6QKFgarfNBi3Eb+/qmTuekVYbUfe3599dWeR0epnduDwK0/ugBO5jBipBUJB9wX
rHf8Wd3pKDbp/dVBnbVpD+MvZnUgG7N0HfxZkC2ILJjPfjzT9K0jyVnjbCB+AonK
Nsg8EmPbAgE7gx+Fr2ThlaS6+oaFybkCAwEAAaNTMFEwHQYDVR0OBBYEFIzvb9OW
9jlJrK2AvpnHYvR5zuHwMB8GA1UdIwQYMBaAFIzvb9OW9jlJrK2AvpnHYvR5zuHw
MA8GA1UdEwEB/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAESeRDaORXe126Vt
ZlRkn34L+ZPhxKOdzJ/ENxV6+RE1td2YYdq36PQQfo6Bg3PdnNydbXUEe2QJcVE2
uGoCJ+MFI+5oxM266qKmM58IO4WTEhjca62/q3OmKjuk24DriwoZMSXMnGHUfz8L
1EBRQiOLGqEmfK1rf/AJmrBbbjK9Cbu4wN3qt62HR3KUUajIYAssXj31PVjjk1kO
wDL5KeQXf52rVhe6OkvuQgEvoYHrfqVp0uKUkeX9sTxKIOuqzKX+8ECV4NKJ0MQ8
N3jrmIClzu3yPugOJHr6RbNuUQ7TmsxelRdFDDt9vtIkhimnI9TPBaECxbca0GMx
qsme4hg=
-----END CERTIFICATE-----
````
{: file="/ch04/https-server/server.sert"}


````js
const https = require('https');
const fs = require('fs');
const path = require('path');

const handler = (req, res) => {
  const cookie = req.headers['cookie'];

  if (cookie && cookie.includes('sid')) {
    res.write('Welcome Again.\n');
    res.end();
    return;
  }

  // 첫 방문
  // res.setHeader('Set-Cookie', 'sid=1');
  // res.setHeader('Set-Cookie', 'sid=1; Domain=mysite.com'); // Domain 쿠키 디렉티브
  // res.setHeader('Set-Cookie', 'sid=1; Path=/private'); // Path 쿠키 디렉티브
  // res.setHeader('Set-Cookie', 'sid=1; Max-age=10'); // 쿠키 수명 10초
  // res.setHeader('Set-Cookie', 'sid=1; Secure'); // https 요청일 때만 쿠키를 싣는다.
  res.setHeader('Set-Cookie', 'sid=1; HttpOnly'); // HTTP 요청에만 이 쿠키를 사용하라고 지시
  res.write('Welcome.\n');
  res.end();
};

const options = {
  key: fs.readFileSync(path.join(__dirname, './server.key')),
  cert: fs.readFileSync(path.join(__dirname, './server.cert')),
};

const server = https.createServer(options, handler);
server.listen(3000, () => console.log('server is sunning ::3000'));
````
{: file="/ch04/https-server/server.js"}


````
-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDGW3ZpdwVyHICZ
laj5cRbPZMZiDCfnmWs0XkKmEbO8D3Z2XlBFvuDu2jT+y5rNtdjewFwoGf01ONdg
qvP14qzNvlq/p5fBPEr6CWBQ2//qu0XSNxuVgcfHp/+lXciTJuxTkWKzeMGdh9pg
wYFgmmR+r4TEHsd6AZtkLWX6UrP09KEv7RBSn/CErhOkChYGq3zQYtxG/v6pk7np
FWG1H3t+ffXVnkdHqZ3bg8CtP7oATuYwYqQVCQfcF6x3/Fnd6Sg26f3VQZ21aQ/j
L2Z1IBuzdB38WZAtiCyYz3480/StI8lZ42wgfgKJyjbIPBJj2wIBO4Mfha9k4ZWk
uvqGhcm5AgMBAAECggEADk3m+YbO5pph10GMzpU+U/00VbqC76+XhK6l/4ggBig2
zqUxRIBWA/+KKhQ4gQxzu+eTFcS/BvUnCgZ2AqXCuLEZJgBR4CpnDUY7EwW0fELe
T4EwHO1foPkvZUdguSTpzsJ5o8/p5YB4KflWaUclB2JEsKh4Eec3A6fG9oD7j4bq
buYIdqOLGgyQiWmLFHqCTTu0eCthwMPGRwoNdUShOSTiZr0rAM9HTXFED6sJtQQj
hLpaIFlJQd7U582H8ybBsSobgRgTHeNG5hLPZ2cGBdJPdVGaPHbJt4/Bu70Vcimt
bCM0D7xbzFm0aUtrqAqSF7iCAljDJ+W7cAJVt2fg0QKBgQD/HGHPuNopjs8ZIILQ
/t5S2pL6tDUf0u2gn4duLvirSDb14mf5N3yU3LVQQC/Mmr0K9dEFW0uQMg5RizL8
oBs/rs6aR3gUhSTDwga+NyOVM9VvwquzxZF/iwk8lSAcV+x+hYHQluoynrNptF5z
GJkxu6Ij1G0hx4LKodunD+E0qQKBgQDHDHFxRiGvgEknn2LerkWoIQzsU1jEZ1/x
hnl4Mgu69PrfVbfDtVYNxTdmrDqmyz4nJqtiYtxpTujHcrDaf96/y6u91t4nw7Oa
EEm78M1pMh9oJYMexwMF5VVbQYo4pFjns1NpbDWsxCLVETh7txBu3t9rA8wkyv3i
NymhhMMGkQKBgQCfq+kAdWd+2VaAGJwoKU2HuCyEY+RYPdHjVdYTPa0Ar5tOvN1s
27DLD3UgfHwuaK9nu8GOw7yAzQOvQBuyiJdlfYjsgU0EMu125OsJhUNtMFsnr0V+
qGrP1Hr8gy3s748jBXbh0oNVGYWb5Hu1ODEyMoliOaPwn4oaP8JWRxciuQKBgF2G
OjM3+ZHlm/nTCPiKN850oQbVborx64GnZqGUGjDg9JNFSk/ZfzJ/LLXATNqb+nsY
z0QuIVQVsIguGmy/0iCaCPrs33sdl+DWsF5vGYTI+TrNDVvDtGbrx3xWQiS1C9Tq
TFHndxzTF263ZauzazQ84gr9QMk026+Trarnn18RAoGBAIktLnnICpQgjiW58VOn
Lwua6/WlPJJVXXYYdQXR9cQU8dzMOVP8aIPMn8O7jZtiNbgjDhUNXKHR/Xr2pZvx
8F1ymwNP6nMdA8TVMgIqTACoMMc06V/JESEl72OlFF6PPT+zAFcDqJHMcQnu3aeW
lSDWoLXydirB3zDxWNX8vRpb
-----END PRIVATE KEY-----
````
{: file="/ch04/https-server/server.key"}


````js
const http = require('http');

const handler = (req, res) => {
  const cookie = req.headers['cookie'];

  if (cookie && cookie.includes('sid')) {
    res.write('Welcome Again.\n');
    res.end();
    return;
  }

  // 첫 방문
  // res.setHeader('Set-Cookie', 'sid=1');
  // res.setHeader('Set-Cookie', 'sid=1; Domain=mysite.com'); // Domain 쿠키 디렉티브
  // res.setHeader('Set-Cookie', 'sid=1; Path=/private'); // Path 쿠키 디렉티브
  // res.setHeader('Set-Cookie', 'sid=1; Max-age=10'); // 쿠키 수명 10초
  res.setHeader('Set-Cookie', 'sid=1; Secure'); // https 요청일 때만 쿠키를 싣는다.
  res.write('Welcome.\n');
  res.end();
};

const server = http.createServer(handler);
server.listen(3000, () => console.log('server is sunning ::3000'));
````
{: file="/ch04/server.js"}
