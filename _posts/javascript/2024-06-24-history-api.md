---
title: "[JavaScript] history API로 SPA 구현"
date: 2024-06-24 19:40:00 +0900
categories: [JavaScript]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## history API
브라우저는 페이지 로딩 시 세션 히스토리를 갖는다.   
세션 히스토리는 페이지를 이동할 때마다 쌓이며, 이를 통해 뒤로가기 시 이전 페이지로 가거나 뒤로 간 이후 다시 앞으로 가는 등의 이동이 가능하다.   
사용자가 페이지를 새로고침 하거나 뒤로가기/앞으로가기 버튼을 클릭하지 않아도, 웹 애플리케이션 내에서 프로그래밍 방식으로 페이지를 이동할 수 있다.

- `history.back()`: 브라우저의 '뒤로' 버튼과 같은 역할. 세션 기록에서 한 단계 이전 페이지로 이동
- `history.forward()`: 브라우저의 '앞으로' 버튼과 같은 역할. 세션 기록에서 한 단계 다음 페이지로 이동
- `history.go(n)`: 현재 위치에서 상대적으로 n페이지 만큼 앞이나 뒤로 이동. n이 음수일 경우 n 페이지 만큼 뒤로, 양수일 경우 n 페이지 만큼 앞으로 이동.

history API는 이러한 브라우저의 세션 기록을 조작할 수 있는 메소드를 담은 객체이며, history API를 활용하여 SPA를 구현할 수 있다.

````js
history.back();
history.foward();
history.go(-1);
````


## pushState, replaceState
`pushState()` 및 `replaceState()` 메서드는 각각 히스토리 항목을 추가하고 수정한다. 이 메서드들은 `popstate` 이벤트와 함께 작동한다.

- `pushState`는 세션 히스토리에 새 URL 상태를 쌓아 URL만 변경시키고 해당 URL로 요청은 하지 않는다.
또한 이전 페이지를 기억하여 돌아가게 할 수 있다.
- `replaceState`는 세션 히스토리에 새 URL 상태를 쌓지 않아 이전 페이지를 기억하지 않고 이동할 URL을 변경시키고 해당 URL로 요청하지 않는다.
또한 뒤로가기를 하게 되면 이전 페이지로 가지 않고 히스토리에 저장된 제일 마지막 URL로 이동한다.

위 함수들을 호출할 때 3가지 파라미터를 받는다.


### history.pushState(state, title, [, url]);
`pushState()` 는 `state object`, `title` (현재 무시됨), `URL` (선택사항)의 세 가지 매개변수를 가진다.

- `state`: history.state에서 꺼내쓸 수 있는 값. 브라우저 이동 시 넘겨 줄 데이터 (popstate에서 받아서 원하는 처리 가능)
- `title`: 변경할 페이지의 title을 가리키는 값. 대부분 브라우저가 지원하지 않아 빈 문자열을 넣으면 된다.
- `url`: 세션 히스토리에 새로 넣을 url. (변경할 브라우저의 주소)

````js
const path = window.location.href.replace(window.location.origin, "");	// URL 앞 부분을 날린다. location.origin은 앞 부분을 가지고 있다.

history.pushState({data: 'test', page: 'testpage'}, null, path);
history.replaceState({data: 'test', page: 'testpage'}, null, path);
````


### popstate 이벤트
활성 기록 항목이 변경될 때마다 창에 `popstate` 이벤트가 전송된다. 활성화 중인 기록 항목이 `pushState`에 의해 생성되었거나 `replaceState` 호출의 영향을 받은 경우, `popstate` 이벤트의 `state` 속성에는 기록 항목의 상태 객체 복사본이 포함된다.


### 현재 상태 읽기
다음과 같이 `history.state` 속성을 사용하여 `popstate` 이벤트를 기다리지 않고 현재 기록 항목의 상태를 읽을 수 있다.

````js
const currentState = history.state;
````


## pushState로 SPA 구현하기

`a`태그나 `location.href`로 URL을 변경하면 변경된 주소에서 `GET`요청이 일어난다.   
하지만 `pushState`로 주소를 변경하는 경우에는 `GET` 요청을 하지 않는다.   
`pushState`로 주소를 변경한 후 `GET`요청 등의 이벤트를 일으키려면 `hashchange`나 `popstate` 등의 이벤트를 이용해야 한다.

````js
const button = document.querySelector("#button");
button.addEventListener("click", function() {
  setHash('abc');
});

window.onpopstate = function() {
  router();
}

// url의 hash가 바뀌면 popstate 이벤트가 호출된다.
function setHash(hash) {
  window.location.hash = `#${hash}`;  // hash change
}

// url의 hash가 바뀌면 hash를 history에 저장한다.
function router(hash) {
  const { pathname, search } = window.location;
  const URL = `${pathname}${search}#${hash}`;
  history.replaceState({data: hash}, null, URL);
}
````

---

<br>

##### 참고

- [history API로 SPA 구현](https://velog.io/@dhgg321/history-API%EB%A1%9C-SPA-%EA%B5%AC%ED%98%84)
- [MDN \| History API로 작업하기](https://developer.mozilla.org/ko/docs/Web/API/History_API/Working_with_the_History_API)
