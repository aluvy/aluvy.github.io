---
title: "Service worker Navigation PreLoad"
date: 2022-01-21 20:53:00 +0900
categories: [WEB]
tags: []
render_with_liquid: false
math: true
mermaid: true
---


유튜브 동영상 iframe을 사용하게 되면 아래와 같은 에러메세지가 뜬다

> The service worker navigation preload request was cancelled before 'preloadResponse' settle. If you intend to use 'preloadResponse', use saitUntil() or responWith() to wait for the promise to settle.
{: .prompt-danger}

아래 코드를 head에 삽입하면 해결했다

````html
<head>
  <script>
    // youtube service worker preload
    self.addEventListener( "activate", event => { event.waitUntil( async function () { // Feature-detect
      if ( self.registration.navigationPreload ) { // Enable navigation preloads!
        console.log( "Enable navigation preloads!" );
        await self.registration.navigationPreload.enable();
      } return; }) } );
  </script>
</head>
````

<hr>

## 서비스 워커 Navigation Preload 에러 메시지

Chromium 기반 브라우저에서 서비스 워커 navigationPreload 배관을 사용하지 않고 사전 로드 브라우저 힌트를 사용하는 경우 브라우저 콘솔에 다음 오류 메시지가 표시될 가능성이 습니다.

> The service worker navigation preload request was cancelled before 'preloadResponse' settled. If you intend to use 'preloadResponse', use waitUntil() or respondWith() to wait for the promise to settle.
> 
> 서비스 워커 탐색 사전 로드 요청이 'preloadResponse'가 해결되기 전에 취소되었습니다. 'preloadResponse'를 사용하려면 waitUntil() 또는 respondWith()를 사용하여 promise가 해결될 때까지 기다리십시오.
{: .prompt-danger}

서비스 워커가 부팅되기 전에 사전 로드 요청이 시도될 때 트리거됩니다.

브라우저는 서비스 워커가 부팅이 완료되기 전에 네트워크 요청을 고려하지 않았기 때문에 사전로드 요청이 효과적으로 차단되었음을 알려줍니다.

또한 서비스 워커 패치 이벤트 핸들러가 사용 가능한 preloadResponse를 사용하고 있지 않음을 의미합니다.

<hr>

## Service Worker Navigation Preload 지원 확인

모든 브라우저가 service worker navigation preload 기능을 지원하는 것은 아니므로 기능 감지를 사용하여 API를 사용할 수 있는지 확인해야 합니다.

navigation preLoad 지원, 활성화 및 가져오기 (fetch)를 활성화하기 위해 연결해야 하는 두 가지 방법이 있습니다.

서비스 작업자 활성화 이벤트에서 navigationPreload 객체에 대한 기능 감지를 수행해야 합니다.   
navigationPreload 객체는 서비스 워커 Registration 객체의 멤버입니다.

````javascript
self.addEventListener( "activate", event => { event.waitUntil( async function () { // Feature-detect if ( self.registration.navigationPreload ) { // Enable navigation preloads! console.log( "Enable navigation preloads!" ); await self.registration.navigationPreload.enable(); } return; } ) }() );} );
````

서비서 워커 등록 개체에 nacigationPreload 멤버가 포함되어 있으면 해당 enable 메서드를 안전하게 호출할 수 있습니다.

이렇게 하면 fetch event handler에 대한 기능이 켜집니다. disable 메소드를 호출하여 preFetch지원을 끌수도 있습니다.

enable 및 disable 메소드는 모두 promise를 반환합니다. 서비스 워커의 모든 것은 비동기식이어야함을 기억하십시오.

preomise 스택으로 작업하는 대신 await 속성을 사용하여 이를 동기 메서드로 효과적으로 전환할 수 있습니다. 어떤 방법도 값을 확인하지 않습니다.

또한 이것은 responseWith 메소드 내에서 수행되어야 합니다. 이 방법에 익숙하지 않은 경우 모둔 기능이 완료될 때까지 이벤트 처리기 문이 열린 상태로 유지됩니다.

<hr>

## 서비스 워커 fetch Event Handler에서 preFetchRequests 지원

이제 서비스 워커에서 사전 로드 응답이 활성화되었으므로 fetch 이벤트 핸들러도 응답을 고려해야 합니다.

이렇게 하려면 처리 논리에 preloadResponse를 잡기위한 지원을 추가해야합니다.

````javascript
//출처사이트의 설명
addEventListener("fetch", event => { 
  event.respondWith(async function() {
    // Respond from the cache if we can
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) return cachedResponse; 
    // Else, use the preloaded response, if it's there 
    const response = await event.preloadResponse;
    if (response) return response;
    // Else try the network. 
    return fetch(event.request);
  }());
});

//--------------------------------------------------------

//MDN MOZILLA의 설명
addEventListener('fetch', event => {
  // Prevent the default, and handle the request ourselves.
  event.respondWith(async function() {
    // Try to get the response from a cache.
    const cachedResponse = await caches.match(event.request);
    // Return it if we found one.
    if (cachedResponse) return cachedResponse;
    // If we didn't find a match in the cache, use the network.
    return fetch(event.request);
  }());
});
````

서비스 워커 캐시 내에서 일치 항목을 찾는 것과 마찬가지로 preloadResponse는 비동기적이며 응답 개체를 반환합니다.

위는 표준 서비스 워커 캐시가 먼저이고 네트워크 패턴입니다. 이제 패턴은 preloadResponse에 대한 지원을 추가합니다.

물론 캐시된 응답을 사용할 수 있는 경우 최소한 대부분의 경우 먼저 이를 반환해야 합니다. 네트워크 요청을 수행하기 전에 사전 로드 요청이 유효한 응답으로 트리거되었는지 확인하십시오.

그냥 일반 fetch를 사용하지 않는 이유는 뭘까요?

글쎄요, 복잡하고, 브라우저 배관을 파헤쳐야 합니다. 이것은 실제로 가치가 없으므로 소화하기 쉬운 상위 수준을 살펴보겠습니다.

브라우저가 사전 로드 요청을 시작하면 백그라운드에서 수행됩니다. 이는 요청이 이미 시작되었음을 의미합니다. 새가져오기 요청을 하면 리소스가 네트워크를 통해 두 번 요청된다는 의미입니다. 이것은 우리가 피해야 하는 것입니다.

preloadResponse는 일종의 특별한 백그라운드 대기 응답으로 생각할 수 있습니다. 있을 수도 있고 없을 수도 있습니다. 어느 쪽이든 요청이 완료되는 즉시 응답이(비동기적으로) 해결됩니다.

요청이 preload 힌트에 의해 시작되지 않는 경우 메서드는 정의되지 않은 응답 개체로 즉시 해결됩니다. 즉, 자연스럽게 네트워크 요청 가져오기로 대체됩니다.

<hr>

##### 참고
- [Service worker Navigation PreLoad](https://velog.io/@unu/서비스-워커에서-브라우저-힌트-PreLoad-지원을-활성화하여-페이지-속도-향상시키는-법)
