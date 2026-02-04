---
title: "웹, 앱 체크 navigator.userAgent"
date: 2023-04-06 22:36:00 +0900
categories: [JavaScript]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## navigator.userAgent
user agent는 HTTP 요청을 보내는 디바이스와 브라우저 등 사용자 소프트웨어의 식별 정보를 담고 있는 request header의 한 종류이다.

지금 사용하고 있는 브라우저의 navigator.userAgent를 콘솔에 찍어보면 아래와 같이 나온다.   
사용하고 있는 OS의 종류, 브라우저의 정보를 담고있다.

````
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'
````

하이브리드 앱을 제작할때 web view의 RRL이 로드되기 전에 userAgent를 수정하여 특정 문자열을 삽입하는 방법으로 웹인지 앱인지 구분할때도 사용한다.



### navigator에는 대표적으로 다음과 같은 프로퍼티가 있다.

- **navigator.appName**
  - 브라우저의 간단한 이름

- **navigator.appVersion**
  - 버전 또는 버전과 관련된 정보.   
    브라우저 내부적으로 사용되는 버전에 대한 숫자이므로 사용자에게 표시되는 버전 숫자와 항상 일치하지는 않다.

- **navigator.userAgent**
  - 브라우저가 User-Agent HTTP 헤더에 넣어 전송하는 문자열로 appName과 appVersion의 모든 정보를 포함하여 더 자세한 정보를 추가로 담고 있다.   
    이 정보에 대해서는 표준화된 서식이 존재하지 않기 때문에 각 브라우저 특성에 따라 파싱해야 한다.

- **navigator.appCodeName**
  - 브라우저의 코드 네임.   
    Netscape에서는 "Mozilla"라는 코드 네임을 사용한다. 호환성을 위해 IE도 역시 같은 코드 네임을 사용한다.

- **navigator.platform**
  - 브라우저가 실행되는 하드웨어 플랫폼으로 javascript 1.2 버전부터 지원한다.


### 사용 예제

````javascript
const elem = $("body");
const userAgent = navigator.userAgent;
const mobile = /Android|webOS|iPhone|iPad|BlackBerry|IEMobile|Opera Mini/i;
const ios = /iPhone|iPad|iPod/i;
const iosApp = /sample_ios/i;
const aos = /Android/i;
const aosApp = /sample_android/i;

( mobile.test(userAgent) ) ? elem.addClass("mobile") : null;
( ios.test(userAgent) ) ? elem.addClass("ios") : null;
( iosApp.test(userAgent) ) ? elem.addClass("ios_app") : null;
( aos.test(userAgent) ) ? elem.addClass("aos") : null;
( aosApp.test(userAgent) ) ? elem.addClass("aos_app") : null;
````


----

<br>

##### 참고

- [User Agent 파헤치기 (navigator.userAgent)](https://ohgyun.com/292)

