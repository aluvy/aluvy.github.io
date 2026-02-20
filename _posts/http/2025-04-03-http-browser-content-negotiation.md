---
title: "[HTTP] 02. 브라우저 - 3장. 컨텐츠 협상"
date: 2025-04-03 15:37:00 +0900
categories: [HTTP]
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


## 3장. 컨텐츠 협상

- 서버는 다양한 클라이언트에 적합한 자원을 제공해야 합니다.
  - 같은 내용이라도 클라이언트마다 필요한 문서 형식이 다르다.
  - 압축한 문서를 읽을 수도 있지만 그렇지 못한 클라이언트도 있다.
  - 클라이언트가 선호하는 언어가 다르기도 하다.
  - 이런 각양 각색의 클라이언트에게 최적의 자원을 제공하는 것이 서버의 역할
  - 클라이언트와 함께 서로 입장 차이를 줄여나가고 주고 받을 자원의 형태를 결정하는 것이 컨텐츠 협상이다.
- 컨텐츠 협상에 사용되는 HTTP 헤더와 동작 방식을 공부합니다.

### 3.1 컨텐츠 타입

````
클라이언트: html문서로 보내주세요
````

- Accept 요청 헤더, Content-Type 응답 헤더

````shell
> Accept: text/html # 클라이언트 > 서버
< Content-Type: text/html # 클라이언트 < 서버
````

- 사례: gitHub
- 라이브러리: express.js 의 res.format 함수
  - 🔗 <https://github.com/expressjs/express/blob/master/lib/response.js#L551>


GitHub는 같은 URL이라도 Accept 요청 헤더에 따라서 다양한 형식의 자원을 제공한다.

````shell
$ curl https://github.com/jeonghwan-kim/jeonghwan-kim.github.com -H "Accept: text/html"
````

결과: 마크업 코드가 들어있는 html 문서를 보내준다.

````shell
$ curl https://github.com/jeonghwan-kim/jeonghwan-kim.github.com -H "Accept: application/json"
````

결과: json 형식의 문서를 제공한다.



### 3.2 압축

````shell
클라이언트: 저는 이런 압축 알고리즘을 알고 있어요 가능하면 이걸로 보내주세요
````

파일을 압축해서 전송하면 그만큼 네트워크 비용을 아끼고 더 신속하게 전달할 수 있다.

- Accept-Encoding 요청 헤더, Content-Encoding 응답 헤더

````shell
> Accept-Encoding: gzip # 클라이언트 > 서버
< Content-Encoding: gzip  # 클라이언트 < 서버
````

- 사례: GitHub
- 라이브러리: Express.js의 Compression(압축 미들웨어)
  - <https://github.com/expressjs/compression>

GitHub는 같은 URL이라도 Accept Encoding 요청 헤드에 따라서 자원을 압축해서 제공한다.

````shell
$ curl https://github.com/jeonghwan-kim/jeonghwan-kim.github.com -H "Accept-Encoding: gzip" -s -o result-gzip
$ cat result-gzip # mac
$ type result-gzip # window
````

- 결과: 알 수 없게 압축되어 있는 파일

````shell
# 압축 풀어서 보기
$ curl https://github.com/jeonghwan-kim/jeonghwan-kim.github.com -H "Accept-Encoding: gzip" -s --compressed
````

- 결과: 압축을 해제하여 콘솔로 출력해준다.
  - 압축돼서 데이터를 요청 > 압축한 파일을 서버로부터 전달 받음 > 압축 해제하여 바로 콘솔에 출력




### 3.3 언어

````shell
클라이언트: 이 URL의 자원을 요청하는데요 가능하면 한글 문서를 주세요
````

- Accept-Language 요청 헤더
  - 클라이언트가 선호하는 언어를 서버한테 전달하면 서버는 준비된 언어의 문서를 제공한다.

````shell
> Accept-Language: ko
````

- 사례: 유튜브
  - 브라우저에서 언어설정을 변경하면 같은 URL이라도 다른 웹페이지를 볼 수 있다.
- 라이브러리: express.js req.acceptLanguage(), accepts, negotiator




### 3.4 사용자 에이전트

- User-Agent 요청 헤더
  - User-Agent는 각 브라우저가 원하는 문자열을 사용한다. (가령 Chrome 브라우저인데 Safari 문자가 있는 식)
  - 그래서 User-Agent Sniffing 이라고 불리는 것 처럼 이 값은 좀 신뢰하기 어려운 값이다.
    - <https://developer.mozilla.org/ko/docs/Web/HTTP/Guides/Browser_detection_using_the_user_agent>

````shell
# User-Agent: 제품명/버전 설명
> User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36
````

- 사례: 구형 브라우져 감지
- 라이브러리: express-useragent
  - <https://github.com/biggora/express-useragent/blob/master/lib/express-useragent.js>

````shell
/(?:chrome|crios)\/([\d\w\.\-]+)/i.test(navigator.userAgent) // true
````



### 3.5 중간 정리

- 컨텐츠 협상은 HTTP 헤더를 기반으로 동작
- 경험했던 사례 소개


### 참고

- [컨텐츠 협상 \| 김정환블로그](https://jeonghwan-kim.github.io/2024/05/04/content-negotiation)
- [사용자 에이전트를 사용한 브라우저 감지 \| MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/Guides/Browser_detection_using_the_user_agent#mobile_device_detection)
- [expressjs/express \| 깃헙](https://github.com/expressjs/express)
- [expressjs/compression \| 깃헙](https://github.com/expressjs/compression)
- [jshttp/accepts \| 깃헙](https://github.com/jshttp/accepts/)
- [jshttp/negotiator \| 깃헙](https://github.com/jshttp/negotiator)
- [biggora/express-useagent \| 깃헙](https://github.com/biggora/express-useragent/blob/master/lib/express-useragent.js)


--------


## 예제

**파일 구조**
- /ch03
  - result-gzip
  - result-html
  - unzip.js

````js
const zlib = require('zlib');
const fs = require('fs');

const sourceStream = fs.createReadStream('./ch03/result-gzip');
const outputStream = fs.createWriteStream('./ch03/result-html');

sourceStream.pipe(zlib.createUnzip()).pipe(outputStream);

/**
 * $ node ch03/unzip.js
 * ==> result-html이 생성됨: result-gzip의 압축이 해제 된 html 파일
 */
````
{: file="ch03/unzip.js"}
