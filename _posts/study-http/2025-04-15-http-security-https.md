---
title: "[HTTP] 05. 보안 - 15장. HTTPS"
date: 2025-04-15 15:37:00 +0900
categories: [Study, HTTP]
tags: []
render_with_liquid: false
math: true
mermaid: true
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

## 15장. HTTPS

### 15-1. 해시
- 해시함수
- 해시 값(다이제스트) 특징: 고정 길이, 고유성, 변경 불가, 단방향
- 대표적인 해시 함수: MD5


### 15-2. 암호화
- 해시 함수의 한계
  - 복호화 불가: 변경한 값을 원래 값으로 복구할 수 없음
- 특징: 암호화, 복호화, 키
  - 암호화 키와 복호화 키가 같으면 '대칭키 암호화'
  - 암호화 키와 복호화 키가 다르면 '비대칭키 암호화'
- 대표적인 암호화 알고리즘: AES


### 15-3. 비대칭키 암호화
- 대칭키 암호화의 한계
  - 키 관리가 어려움
  - 무결성 부족
- 특징: 서로 다른 키, 공개키(암호화 할 때 사용), 개인키(복호화 할 때 사용), 신분 증명
- 비대칭 키의 대표적인 알고리즘: RSA

````shell
# 개인키 생성
$ openssl genpkey -algorithm RSA -out private_key.pem

# 공개키 생성
$ openssl rsa -putout -in private_key.pem -out public_key.pem

# 공개키로 암호화
$ echo "Hello World" | openssl rsautl -encrypt -inkey public_key.pem -pubin -out encrypted

# 개인키로 복호화
$ cat encrypted | openssl rsautl -decrypt -inkey private_key.pem
````

- 암호화 방식 비교: 해시 함수, 대칭키 암호화, 비대칭키 암호화


### 15-4. 디지털 서명
- 디지털 서명의 원리: 해시 함수 사용, 개인키로 서명, 평문과 서명 전달, 서명의 유효성 검증
  - A: 평문 데이터로 해시값 생성 -> 개인키를 만들어 복호함수에 전달 -> 서명
  - 평문과 서명을 B에 전달
  - B: 평문 데이터로 해시값 생성 -> 전달 받은 서명을 전달 받은 공개키를 이용해 암호함수에 전달 -> 결과물
  - 결과물이 해시값과 같은지 체크
- 디지털 서명 실습

````shell
# 평문 생성
$ echo "It's me" > message.txt

# md5로 해시값 생성
$ cat message.txt | md5 > message.md5

# 서명 파일 제작
$ cat message.md5 | openssl -dgst -md5 -sign private_key.pem -out message.sig

# 평문과 서명 파일 B에게 전달

# 검증
$ cat message.md5 | openssl dgst -md5 -verify public_key.pem -signiture message.sig
````


### 15-5. 디지털 인증서
- 디지털 인증서 원리
- 디지털 인증서 사례

디지털 인증서: 신뢰할 수 있는 기관이 인터넷상에서 사용자의 신원을 보증하는 문서

- 사용자 이름
- 유효 기간
- 발급자 정보
- 디지털 서명
- 공개키

대부분의 디지털 인증서는 x.509라는 표준 형식을 따른다.   
이 형식은 공통적으로 사용되는 인증서의 구조를 규정한다.

구글의 사례를 살펴본다.

````shell
# HTTPS, TLS 서버에 연결을 시도
$ openssl s_client -connect www.google.com:443 -servername google.com </dev/null> google.crt
````

google.crt 파일이 다운로드 된다.

````shell
# 출력값
Connecting to 142.250.76.132
depth=2 C=US, O=Google Trust Services LLC, CN=GTS Root R4
verify return:1
depth=1 C=US, O=Google Trust Services, CN=WE2
verify return:1
depth=0 CN=*.google.com
verify return:1
DONE
````

````shell
$ cat google.crt
````

다운로드 한 인증서 내용을 확인할 때도 OpenSSL을 사용한다.

````shell
$ openssl x509 -in google.crt -text -noout
````


### 15-6. TLS
- 1단계: TLS 핸드쉐이크
- 2단계: 데이터 전송



### 15-7. HTTPS 서버 제작
- 디지털 인증서 생성
- 인증서로 HTTPS 서버 제작

curl로 구글 사이트에 요청을 보내본다.

````shell
$ curl https://google.com -v
````

````shell
# 결과값
* Host google.com:443 was resolved. # 433번 포트로 접속 시도
* IPv6: (none)
* IPv4: 142.250.207.110
*   Trying 142.250.207.110:443...
* schannel: disabled automatic use of client certificate
* ALPN: curl offers http/1.1
* ALPN: server accepted http/1.1
* Connected to google.com (142.250.207.110) port 443
* using HTTP/1.x
> GET / HTTP/1.1
> Host: google.com
> User-Agent: curl/8.14.1
> Accept: */*
>
* Request completely sent off
* schannel: remote party requests renegotiation
* schannel: renegotiating SSL/TLS connection
* schannel: SSL/TLS connection renegotiated
< HTTP/1.1 301 Moved Permanently
< Location: https://www.google.com/
< Content-Type: text/html; charset=UTF-8
< Content-Security-Policy-Report-Only: object-src 'none';base-uri 'self';script-src 'nonce-Png0H5wWMDwTaMfkEn5VIQ' 'strict-dynamic' 'report-sample' 'unsafe-eval' 'unsafe-inline' https: http:;report-uri https://csp.withgoogle.com/csp/gws/other-hp
< Date: Wed, 15 Oct 2025 05:57:28 GMT
< Expires: Fri, 14 Nov 2025 05:57:28 GMT
< Cache-Control: public, max-age=2592000
< Server: gws
< Content-Length: 220
< X-XSS-Protection: 0
< X-Frame-Options: SAMEORIGIN
< Alt-Svc: h3=":443"; ma=2592000,h3-29=":443"; ma=2592000
<
<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>301 Moved</TITLE></HEAD><BODY>
<H1>301 Moved</H1>
The document has moved
<A HREF="https://www.google.com/">here</A>.
</BODY></HTML>
* Connection #0 to host google.com left intact
````

#### 서버 제작 실습

````shell
# 인증서 생성 server.key
$ openssl genrsa -out server.key 2048

# 인증서 서명 요청 생성 server.csr
$ openssl req -new -key server.key -out server.csr
# Country Name: KO
# State or Province Name: Seoul
# 나머지는 엔터

# server.csr로 서명된 인증서 파일 생성 server.cert
$ openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.cert

# server.cert 인증서로 https 서버를 생성
````


#### 서버 실행 후

````shell
$ curl -v https://localhost:3000
````

````shell
# 출력 값
$ curl -v https://localhost:3000
* Host localhost:3000 was resolved.
* IPv6: ::1
* IPv4: 127.0.0.1
*   Trying [::1]:3000...
* schannel: disabled automatic use of client certificate
* ALPN: curl offers http/1.1
* schannel: SEC_E_UNTRUSTED_ROOT (0x80090325) - 신뢰되지 않은 기관에서 인증서  체인을 발급했습니다.
* closing connection #0
curl: (60) schannel: SEC_E_UNTRUSTED_ROOT (0x80090325) - More details here: https://curl.se/docs/sslcerts.html

curl failed to verify the legitimacy of the server and therefore could not
establish a secure connection to it. To learn more about this situation and
how to fix it, please visit the webpage mentioned above.
````



### 15-8. 중간 정리
- 해시 함수로 평문을 요약할 수 있다.
- 암호화로 평문을 암호화 및 복호화 할 수 있다.
- 비대칭키 암호화로 더 안전하게 암복호화 할 수 있다.
- 비대칭키 암호화와 해시함수를 이용해 디지털 서명을 만들 수 있다.
- 디지털 서명을 이용한 디지털 인증서로 서버의 신원을 확인할 수 있다.
- 디지털 인증서를 이용해 보안 프로오콜인 TLS를 구현할 수 있다.


### 참고
- HTTP 완벽 가이드 > 14장 보안 \| 인사이트
- 리얼월드 HTTP \| 한빛미디어



-----


## 예제
**파일구조**
- /ch15
  - encrypted
  - google.crt
  - message.txt
  - private_key.pem
  - public_key.pem
  - server.sert
  - server.csr
  - server.js
  - server.key

````js
const https = require('https'); // https 모듈
const fs = require('fs');
const path = require('path');

const options = {
  // 디지털 인증서
  key: fs.readFileSync(path.join(__dirname, './server.key')), // 키
  cert: fs.readFileSync(path.join(__dirname, './server.cert')), // 인증서
};

const handler = (req, res) => {
  res.write('Hello\n');
  res.end();
};

const server = https.createServer(options, handler);
server.listen(3000, () => console.log('server is running ::3000'));
````
{: file="/ch15/server.js"}

