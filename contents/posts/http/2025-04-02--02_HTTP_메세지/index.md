---
date: '2025-04-02 15:37:00 +0900'
title: '[HTTP] 01. HTTP 기본 - 2장. HTTP 메세지'
summary: '01. HTTP 기본 - 1장. HTTP 시작: 웹의 탄생 배경과 역사에 대해 알 수 있다. - 2장. HTTP 메시지: HTTP의 주요 요소에 대해 배울 수 있다. 2장. HTTP 메시지 2.2 URL 프로토콜://도메인:포트/경로?쿼리문자열#앵커 - Uniform Resource Locator - URL: 클라이언트와 요청을 보낼 때 대상이 되는 것'
author: ['aluvy']
categories: ['HTTP']
tags: ['']
thumbnail: ''
---

# 01. HTTP 기본

- 🔗 <https://github.com/jeonghwan-kim/lecture-http>
- 🔗 <https://jeonghwan-kim.github.io/2024/07/07/lecture-http-part1>


- 1장. HTTP 시작: 웹의 탄생 배경과 역사에 대해 알 수 있다.
- 2장. HTTP 메시지: HTTP의 주요 요소에 대해 배울 수 있다.

---

## 2장. HTTP 메시지

### 2.2 URL

````
프로토콜://도메인:포트/경로?쿼리문자열#앵커
````

- Uniform Resource Locator
- URL: 클라이언트와 요청을 보낼 때 대상이 되는 것
- 일정한 방식의 자원, 위치 탐사기, 인터넷 상의 파일 위치를 지정하는 방식

#### 2.2.1 프로토콜

````
http://도메인:포트/경로?쿼리문자열#앵커
````

- URL은 프로토콜 이름으로 시작한다.
- 프로토콜은 URL의 종류를 결정하는 역할을 한다.
- http 라고 하면 웹 문서를 식별하는 URL
- 다른 프로토콜
  - mailto: 이메일 전송용 프로토콜
  - tel: 전화를 위한 프로토콜

#### 2.2.2 도메인

````
http://localhost:포트/경로?쿼리문자열#앵커
````

- 서버의 위치를 나타냄
- 도메인의 IP를 알려주는 서버인 Domain Name System. 줄여서 DNS에 도메인 주소를 전달하면 IP주소를 얻을 수 있다.
-  ㄴ도메인 위치에 IP주소를 바로 사용해도 됨



#### 2.2.3 포트

````
http://localhost:3000/경로?쿼리문자열#앵커
````

- IP로 접속한 서버는 여러 개의 포트가 있음
- 클라이언트는 특정 포트를 통해 서버에 접속하고, 특정 어플리케이션에 접속할 수 있다.
- 포트는 0부터 65535 사이의 정수값을 쓴다.
  - 0 ~ 1023: 정해진 포트 (사용하려면 운영체제의 관리자 권한이 있어야 한다.)
    - http 프로토콜: 80
    - https 프로토콜: 443
    - 파일 전송을 위한 프로토콜: 22
    - shell: 22
    - email: 25 등
  - 1024 ~ 49151: 등록된 포트
    - 개발환경 구성 시 사용
  - 나머지
    - 동적 포트 (일시적으로 클라이언트가 서버와 통신하기 위한 포트)



#### 2.2.4 경로

````
http://localhost:3000/ch01.txt?쿼리문자열#앵커
````

- 서버가 제공하는 파일의 위치
- 경로
- 상황에 따라서는 서버의 실제 경로가 아닐 수도 있다. (서버 구현에 따라 다르다.)
- 서버가 외부에 제공하는 추강화된 개념이라고 이해하는것이 더 좋다.

#### 2.2.5 쿼리문자열

````
http://localhost:3000/ch01.txt?query=name#앵커
````

- 서버에 추가로 정보를 전달할 때 사용
- 경로 뒤에 ? 로 시작하며 key=value 형태, 하나 이상일 때는 &로 연결


#### 2.2.6 프레그먼트

````
http://localhost:3000/ch01.txt?query=name#title
````

- 웹페이지 내에 특정 위치를 가리킴
- html 마크업 id 속성과 매칭 됨




### 2.3 요청, request

````shell
# 요청 헤더
> GET /ch01.txt HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/8.7.1
> Accept: */*
>
````

- 클라이언트에서 서버로 전달하는 메시지
- 구성
  - 요청 메시지: 메서드와 경로, 헤더, 본문으로 구성
  - 메서드: GET, POST, PUT, PATCH, DELETE
  - 경로: 자원의 위치
  - 프로토콜 버전
  - 요청 본문

````shell
GET / ch01.txt HTTP/1.1
````

- GET: 메소드
  - 클라이언트와 서버 간의 요청 방식을 정의
  - 클라이언트가 서버에게 어떤 작업을 수행할지를 메서드로 전달
  - 메소드
    - GET: 서버로부터 자원을 요청할 때 사용
    - POST: 서버로 데이터를 전송하고 서버는 이 일을 처리해 새로운 자원을 생성
    - PUT: 서버의 리소스 교체
    - PATCH: 서버의 리소스를 부분적으로 교체
    - DELETE: 서버의 특성 리소스를 삭제
  - /ch01.txt: 경로
    - 서버의 어떤 파일을 가리키는지 알려줌
  - HTTP/1.1: 프로토콜 버전



````shell
Host: localhost: 3000
````

- Host: localhost:3000: 요청을 보낼 호스트와 포트번호 (서버의 위치)

````shell
User-Agent: curl/8.7.1
````

- User-Agent: 클라이언트 정보
  - curl을 사용했기 때문에 curl/8.7.1 이라는 값으로 나타남
  - 브라우저라면 브라우저 이름이 실린다.


````shell
Acccept: */*
````
- Accept: 클라이언트가 어떤 컨텐츠 타입을 받을 수 있는지 표시하는 값
  - */*: 어떤 컨텐츠 타입이든 받을 수 있다는 의미
- 요청 헤더의 마지막을 빈 줄로 입력하면 요청헤더가 끝났다 라는 의미


#### 요청 헤더의 종류

- Accept
- Accept-Encoding
- Accept-Language
- User-Agent
- Cookie
- Origin
- 캐싱 관련
  - If-Modifyied-Since
  - If-None-Match
- 보안 관련
  - Access-Control-Allow-Headers
  - Access-Control-Allow-Method


#### 요청 본문

- 예시에는 없지만 헤더가 끝난 뒤에는 요청 본문을 실을 수 있다.
- 요청 헤더와 달리 요청 본문은 method에 따라서 선택사항 임
- POST나 PUT, PATCH 같은 method에서는 사용할 수 있다.





### 2.4 응답, response

````shell
# 응답 헤더
< HTTP/1.1 200 OK
< Date: Fri, 31 Jan 2025 08:51:06 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< Transfer-Encoding: chunked
<
````

- 클라이언트가 응답 받는 메시지
- 구성
  - 상태 코드: 1xx, 2xx, 3xx, 4xx, 5xx
  - 응답 헤더
  - 응답 본문

````shell
HTTP/1.1 200 OK
````

- 프로토콜 버전: 클라이언트가 보낸 요청시에 프로토콜 버전을 서버에서도 사용할 수 있는 경우에 같은 버전을 표시하여 사용 할 프로토콜을 서로 맞춘다.
- 상태코드와 상태 문자: 요청 받은 서버가 처리 결과를 알려준다.
  - 상태 값
    - 1XX: 정보 응답
      - 101: 서버가 클라이언트의 프로토콜 전환 요청을 승인할 때
    - 2XX: 성공을 의미
      - 200: 요청에 성공201: 성공, 자원생성
      - 204: 요청은 성공했지만 응답할 본문은 없을 때
    - 3XX: 리다이렉션
      - 301: 요청한 리소스 URL가 영구적으로 다른 주소로 바뀌었음. 바뀐 주소는 응답 헤더이 싣는다
      - 302: 요청한 리소스가 임시적으로 다른 URL로 변경됐다.
      - 304: 클라이언트가 캐싱한 리소스를 사용해도 된다. 본문은 비워서 옴
    - 4XX: 클라이언트 오류. 요청에 문제가 있어서 서버가 처리하지 못했을 경우
      - 400: bad request 잘못된 요청
      - 401: 인증이 필요한 경우
      - 404: 없는 페이지 요청할 경우
    - 5XX: 서버 처리 오류. 요청 자체는 문제가 없지만 서버의 이유로 요청을 처리하지 못함
      - 500: 인터널 서버 에러 - 서버에서 예상하지 못한 오류 발생
      - 503: 서버가 현재 요청을 처리할 수 없음 (서버 다운)
      - 504: time out


````shell
Date: Fri, 31 Jan 2025 08:51:06 GMT
````

- 서버가 응답한 시간


````shell
Connection: keep-alive
````

- TCP 연결을 일정시간 유지하기 위해 쓰는 헤더
- 클라이언트는 3way handshake를 만들지 않고 이미 연결된 TCP 위에 HTTP요청을 다시 보낼 수 있다.


````shell
Keep-Alive: timeout=5
````

TCP 연결을 유지할 수 있는 제한시간 (5초)



#### 응답 헤더의 종류

- Content-Type
- Content-Encoding
- Accept-Language
- Vary
- Set-Cookie
- 캐싱 관련
  - Last-Modified
  - ETag
  - Cache-Control
  - Expires
- 보안 관련
  - Content-Security-Polycy
  - Content-Security-Polycy-Report-Only
  - Access-Control-Allow-Methods
  - Access-Control-Allow-Max-Age




#### 응답 본문

- 응답 헤더의 마지막 줄을 비우고 나면 본문이 시작된다.
- 실제 데이터

````text
HTTP Lecture

Chapter 1. Basic
  1.1 HTTP Start
  1.2 HTTP Message* Connection #0 to host localhost left intact
````



### 2.5 중간 정리

- 클라이언트와 서버 간의 HTTP 흐름이 이해했습니다.
- URL을 시작으로 HTTP 메세지를 주고 받습니다.
- HTTP 요청
- HTTP 응답



### 참고

- [HTTP 개요 \| MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/Guides/Overview)
- [웹의 리소스 식별하기 \| MDN](https://developer.mozilla.org/ko/docs/orphaned/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web)