---
title: "[JavaScript] scroll event 제어"
date: 2024-07-03 09:31:00 +0900
categories: [JavaScript, JavaScript-basic]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

> 스크롤 기능을 막아야 하는 상황에서 대부분은 body 에 `overflow-y: hidden` 을 주는 방법이 제시되지만, 그렇지 않은 경우 자바스크립트로 이를 처리해야 한다.
{: .prompt-tip}


javascript로 `scroll`, `mousewheel`, `touchmove` 등의 이벤트를 걸어 `e.preventDefulat()`로 이벤트를 막아볼 수 있겠지만, `mousewheel` 이벤트와 같이 스크롤과 관련 된 이벤트는 기본적으로 `passive`로 처리되어 있어 추가 옵션을 설정 할 수 없다.


## 아래와 같은 오류 발생

````
[Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive. See <URL>
````

`wheel` 이벤트를 사용하여 스크롤을 감지하고 `preventDefault`를 호출하면서 성능 최적화와 문제해결을 동시에 할 수 있다.   
`passive` 옵션을 추가하고, `wheel` 이벤트로 바꾸면 body 스크롤링이 잘 멈춘다.

````js
function wheelevent(e) {
  e.preventDefault();
}
document.querySelector("body").addEventListener('wheel', wheelevent, { passive: false });
document.querySelector("body").removeEventListener('wheel', wheelevent, { passive: false });
````

## wheel 이벤트와 scroll, mousewheel 의 차이, 그리고 성능 최적화에 대한 내용

`wheel` 이벤트는 마우스 휠 또는 트랙패드 등 더 다양한 입력 장치에서 발생하는 스크롤 이벤트로, `mousewheel` 이벤트와 비슷하지만, `wheel` 이벤트가 표준에 더 가깝고 여러 입력 장치에서의 일관성을 제공한다.

또 `wheel` 이벤트가 `passive`로 처리되는 것은 브라우저가 성능 최적화를 위해 도입한 개념 중 하나이고, 브라우저는 기본적으로 `wheel` 이벤트에 대해 `passive` 플래그를 설정하기 때문에 이벤트 리스너 내에서 `preventDefault`를 호출하지 못하게 한다.

`passive` 플래그가 설정된 이벤트 리스너에서 `preventDefault`를 호출하는 것은 브라우저가 스크롤링 동작을 최적화하기 위해 이벤트 핸들러를 비동기적응로 실행하도록 허용하게 된ㄴ데, 이로 인해 호출 순서가 보장되지 않기 때문에 스크롤을 막아야 하는 경우에는 `passive: false`로 설정 된 이벤트 리스너를 사용해야 한다.

---

<br>

##### 참고

- [body 스크롤 막기](https://velog.io/@h_jinny/javascript-body-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EB%A7%89%EA%B8%B0)
- [\[javascript/jquery\] \[Intervention\] Unable to preventDefault inside passive event listener due to target being treated as passive. See \<URL\> 해결 방법](https://solbel.tistory.com/1299)
