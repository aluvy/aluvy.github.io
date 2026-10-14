---
date: '2025-04-13 15:37:00 +0900'
title: '[HTTP] 05. 보안 - 13장. 브라우저 보안'
summary: '브라우저 보안 브라우저 보안 지식을 알고 어플리케이션을 개발한다. 13-1. 크로스 사이트 스크립팅 - 인라인 자바스크립트를 웹 문서에 주입한 공격 - 새니타이즈(Sanitize)로 예방 - HTML 태그를 웹 문서에 주입한 공격 - 이스케이프(Escape)로 예방 - 다른 공격의 기점이 됨.'
author: ['aluvy']
categories: ['HTTP']
tags: ['']
thumbnail: ''
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

## 13장. 브라우저 보안
브라우저 보안 지식을 알고 어플리케이션을 개발한다.
- [공격유형 \| MDN](https://developer.mozilla.org/ko/docs/Web/Security/Attacks#cross-site_scripting_xss)
- [콘텐츠 보안 정책 \| MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/Guides/CSP)
- [동일 출처 정책 \| MDN](https://developer.mozilla.org/ko/docs/Web/Security/Defenses/Same-origin_policy)



### 13-1. 크로스 사이트 스크립팅
- 인라인 자바스크립트를 웹 문서에 주입한 공격
- 새니타이즈(Sanitize)로 예방
- HTML 태그를 웹 문서에 주입한 공격
- 이스케이프(Escape)로 예방
- 다른 공격의 기점이 됨.



#### 13-1-1. Sanitize
- input 창을 통해 자바스크립트 주입 공격 ==> Sanitize로 예방

````
<script>alert('hello')</script>
````

- 사용자가 input 창 등을 통해 입력한 HTML에서 위험하다고 판단되는 스크립트를 찾아내 제거하는 기법을 Sanitize라고 한다.
- 이런 역할을 하는 대표적인 라이브러리가 DOMPurify다.
- XSS 같은 공격을 방어하기 위해 신뢰할 수 없는 HTML을 안전하게 정화해주는 라이브러리.
- DOMPurify는 스크립트 태그는 아얘 없애버린다.
  - <https://github.com/cure53/DOMPurify>
  - <https://cure53.de/purify>


#### 13-1-2. Escape
- input 창을 통해 HTML 태그 주입 공격 ==> Escape로 예방

````html
<h1>Product3</h1>
````

- 특정 문자나 태그를 브라우저가 해석하지 못하도록 변환하는 방법

````js
const escapedProduct = product.replace(/</g, '&lt;').replace(/>/g, '&gt;');
database.products.push(escapedProduct);
````

- 이 과정을 돕는 대표적인 도구가 lodash escape라는 함수이다.
  - <https://lodash.com/docs/4.17.15#escape>
  - <https://github.com/lodash/lodash/blob/main/lodash.js#L398>



### 13-2. 세션 하이재킹
- 웹 어플리케이션의 로그인과 세션 관리
- 인증된 사용자에게 제공되는 맞춤형 HTML
- 쿠키 취약성을 이용한 세션 탈취 공격
- 쿠키 설정으로 예방
  - 쿠키 디렉티브 HttpOnly 사용 (javascript가 제한 됨)


### 13-3. 교차 사이트 요청 위조
- 사용자 권한을 탈취해 악의적인 요청을 보내는 공격
- 쿠키 설정으로 예방
  - 쿠키 디렉티브 SameSite=Strict 사용
  - <https://developer.mozilla.org/ko/docs/Web/HTTP/Guides/Cookies#samesite>
- CSRF(Cross Site Request Forgery) 토큰으로 예방
  - `<input type="hidden" value="my-csrf-token">`
- CAPTCHA로 예방
  - Completely Automated Public Turing test to tell Computers and Humans Apart
  - 완전 자동화된 사람과 컴퓨터 판별
  - 캡챠


### 13-4. 컨텐츠 보안 정책
- Content-Security-Policy 응답 헤더
  - `res.setHeader('Content-Security-Policy', 'defaultsrc "self"');`
  - 모든 리소스가 사이트 자체에서 와야한다.
  - 다른 출처에서 가져온 리소스들을 사용할 수 없음 (cdn, font 등..)
  - <https://developer.mozilla.org/ko/docs/Web/HTTP/Guides/CSP#예제_일반적인_사용_사례>
  - inline으로 들어간 스타일도 읽히지 않음
- CSP의 일반적인 사용 사례
- Content-Security-Policy-Report-Only 헤더 (진단 보고서)
  - 실행은 허용하고 report를 받는다.
- 사례 탐구: google.com

````
CSP Report: {
  'csp-report': {
    'document-uri': 'http://localhost:3000/',
    referrer: 'http://localhost:3000/',
    'violated-directive': 'style-src-elem',
    'effective-directive': 'style-src-elem',
    'original-policy': 'default-src "self"; report-uri /report',
    disposition: 'report',
    'blocked-uri': 'inline',
    'line-number': 5,
    'source-file': 'http://localhost:3000/',
    'status-code': 200,
    'script-sample': ''
  }
}
````


### 13-5. 동일 출처 정책 (Same Origin Policy)
- 브라우저 스스로 자원 출처를 관리하는 보안 정책
- 적용 대상: AJAX, 웹 폰트
  - <https://developer.mozilla.org/ko/docs/Web/Security/Same-origin_policy#교차_출처_네트워크_접근>
- CSP와 SOP 비교
  - CSP
    - 서버와 브라우저의 보안정책
    - 서버에서 정책을 정하고 브라우저가 그 정책을 응답 헤더로 받음
    - 그리고 실제 정책에 맞게 동작함
    - 보안주체: 개발자
  - SOP
    - 서버가 관여하지 않고 브라우저만의 보안정책
    - 보안주체: 브라우저에 기본으로 탑재된 보안 정책 (프로그래밍의 영역이 아님), 브라우저마다 구현이 조금씩 다를 수 있음
- 균형



### 13-6. 중간 정리
- 크로스 사이트 스크립팅 공격의 원리와 예방 방법
- 다양한 공격들: 세션 하이재킹, CSRF
- CSP와 SOP


### 참고
- [공격유형 \| MDN](https://developer.mozilla.org/ko/docs/Web/Security/Attacks#cross-site_scripting_xss)
- [컨텐츠 보안 정책 \| MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/Guides/CSP)
- [동일 출처 정책 \| MDN](https://developer.mozilla.org/ko/docs/Web/Security/Defenses/Same-origin_policy#교차_출처_네트워크_접근)



----


## 예제
**파일구조**
- /ch13
  - attacker-server-1.js
  - attacker-server-2.js
  - server.js



````js
const http = require('http');

// 요청 URL을 로깅합니다.
// 탈취한 정보가 요청 URL로 올겁니다.
const log = (req, res) => console.log(`${req.method} ${req.url}`);

// 서버 인스턴스를 준비합니다.
const server = http.createServer((req, res) => {
  // 모든 요청을 기록합니다.
  log(req, res);

  // 빈 응답을 보냈습니다.
  res.end();
});

// 어플리케이션 서버와 다른 포트를 사용해 요청 대기합니다,
server.listen(3001, () => console.log('server is running ::3001'));
````
{: file="/ch13/attacker-server-1.js"}



````js
const http = require('http');

const csrf = (req, res) => {
  res.setHeader('Content-Type', 'text/html');

  res.write(`
    <!DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
        CSRF
        <!-- img 태그를 사용해 공격 대상인 mysite.com:3000 으로 요청을 보낸다. -->
        <img src="http://mysite.com:3000">
      </body>
    </html>
  `);
  res.end();
};

const server = http.createServer(csrf);
server.listen(3002, () => console.log('server is running ::3002'));
````
{: file="/ch13/attacker-server-2.js"}



````js
const http = require('http');
const querystring = require('querystring');

const database = {
  products: ['Product 1', 'Product 2'],
  session: {},
};

const parseCookie = (req) => {
  const cookies = (req.headers.cookie || '').split(';');
  const cookieObj = {};
  cookies.forEach((cookie) => {
    const [name, value] = cookie.trim().split('=');
    cookieObj[decodeURIComponent(name)] = decodeURIComponent(value);
  });

  return cookieObj;
};

const login = (req, res) => {
  const createSession = () => `session-id-${Date.now()}`;
  const findUser = () => ({
    name: 'Alice',
    email: 'alice@email.com',
  });

  const sid = createSession();
  const user = findUser();

  database.session = {
    [sid]: user,
  };

  // index로 리다이렉션
  res.statusCode = 301;
  res.setHeader('Location', '/');
  res.setHeader('Set-Cookie', `sid=${sid}; HttpOnly;`); // 세션 하이재킹 예방
  res.setHeader('Set-Cookie', `sid=${sid}; SameSite=Strict;`); // CSRF 예방
  res.end();
};

const logout = (req, res) => {
  const sid = parseCookie(req)['sid'] || '';
  delete database.session[sid];

  res.statusCode = 301;
  res.setHeader('Location', '/');
  res.setHeader('Set-Cookie', 'sid=;Max-Age=-1');
  res.end();
};

const postProduct = (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body = body + chunk.toString();
  });

  req.on('end', () => {
    const { product } = querystring.parse(body);

    const escapedProduct = product.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    database.products.push(escapedProduct);

    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
  });
};

const report = (req, res) => {
  let body = '';

  req.on('data', (chunk) => {
    body = body + chunk.toString();
  });

  req.on('end', () => {
    // JSON 형태의 본문을 받는다.
    const report = JSON.parse(body);

    // 리포트를 출력한다.
    console.log('CSP Report:', report);

    res.end();
  });
};

// index.html 동적으로 만들기
const index = (req, res) => {
  const sid = parseCookie(req)['sid'] || '';
  const userAccount = database.session[sid] || '';

  res.setHeader('Content-Type', 'text/html');
  // res.setHeader('Content-Security-Policy', 'default-src "self"'); // Content-Security-Policy 응답 헤더
  // res.setHeader('Content-Security-Policy-Report-Only', 'default-src "self"; report-uri /report'); // Content-Security-Policy-Report-Only 응답 헤더
  res.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          input {width: 600px;}
          @font-face {
            font-family: 'MyCustomFont;
            src: url('http://other-origin.com/MyCustomFont.woff2');
          }
        </style>
      </head>
      <body style="font-family: 'MyCustomFont';">
        ${userAccount ? userAccount.name + ', ' + userAccount.email : 'Guest'}
        <input type="hidden" value="my-csrf-token">
        <form method="POST" action="/product">
          <input type="text" name="product">
          <button type="submit">Add</button>
        </form>
        <ul>
          ${database.products.map((product) => `<li>${product}</li>`).join('')}
        </ul>
      </body>
    </html>
  `);
  res.end();
};

const server = http.createServer((req, res) => {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  if (pathname === '/login') return login(req, res);
  if (pathname === '/logout') return logout(req, res);
  if (pathname === '/product') return postProduct(req, res);

  if (pathname === '/report') return report(req, res);

  index(req, res);
});

server.listen(3000, () => console.log('server is running ::3000'));
````
{: file="/ch13/server.js"}


