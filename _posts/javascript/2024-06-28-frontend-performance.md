---
title: "[JavaScript] 프론트엔드 성능 최적화"
date: 2024-06-28 10:24:00 +0900
categories: [JavaScript]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## 브라우저 동작 원리

> 브라우저 로딩 과정: 파싱 > 스타일 > 레이아웃(리플로우) > 페인트 > 합성 & 렌더
{: .prompt-tip}

프론트엔드의 성능 최적화를 확인하기에 앞서 브라우저가 어떻게 화면을 사용자에게 보여주는지를 알아야 한다.

- [브라우저의 동작과정부터 React까지](https://velog.io/@kmlee95/브라우저의-동작과정부터-React)

## 프론트엔드 성능 최적화

> 프론트 엔드 성능 최적화에는 `웹 페이지 로드 최적화`, `웹 페이지 렌더링 최적화`가 있다.
{: .prompt-tip}

### 1. 웹 페이지 로드 최적화
#### (1) 브라우저 상에서 최적화

- `DOMContentLoaded`: html, css 파싱이 끝난 시점
- `Loaded`: html 상에 모든 리소스가 load 된 시점

![alt text](/assets/images/posts/2024/06/28/frontend-performance-01.png)
_https://velog.io/@kmlee95/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%84%B1%EB%8A%A5%EC%B5%9C%EC%A0%81%ED%99%94_


html, css 파싱을 진행하다가 script 태그와 만나게 되면 javascript 파싱을 진행하게 되고, 그 이후로 동기적으로 파싱이 된다.   
그래서 html, css를 파싱하면서 자바스크립트로 인해 `block resource`가 발생하는걸 방지해야 한다.

````html
<!-- block resource 방지 -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My Test Page</title>
    <!-- css 위치 -->
  </head>
  <body>
    <div></div>
    
    <!-- js 위치 -->
    <script>
      // ...
    </script>
  </body>
</html>
````


#### (2) 리소스 용량 최적화

리소스 용량을 줄임으로써 리소스 다운로드 시간을 최적화 할 수 있다.

![alt text](/assets/images/posts/2024/06/28/frontend-performance-02.png)
_크롬 개발자 도구의 network 탭 -> 필터에서 리소스 유형 (https://velog.io/@kmlee95/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%84%B1%EB%8A%A5%EC%B5%9C%EC%A0%81%ED%99%94)_

- 불필요한 코드는 제거한다.
- 압축 및 난독화로 용량을 최소화 한다.
- 간결한 셀렉터를 사용한다.
- 모듈번들러(webpack) css, js 번들링 한다.
- 캐싱할 필요 없는 style은 내부 스타일 시트를 사용한다.



### 2. 웹 페이지 렌더링 최적화

> 페이지 렌더링 최적화의 목표는 `레이아웃을 최대한 빠르게`, `최대한 적게 발생시키는 것`
{: .prompt-tip}

웹 페이지를 렌더링 하기 위해서는 DOM, CSS가 필요하다. 그러나 다양한 기능과 효과를 구현하기 위해서는 자바스크립트를 많이 사용한다. 자바스크립트는 브라우저에서 단일 스레드로 동작하기 때문에 자바스크립트의 실행 시간은 곧 렌더링 성능과 직결된다. 결국엔 자바스크립트에서 실행되는 코드가 최적화 될 수 있게 구성해야 한다.


### 3. 레이아웃 최적화
렌더링 과정에서 `레이아웃은 DOM 요소들이 화면에 어느 위치에서 어떤 크기로 배치될지`를 결정하게 되는 계산 과정이다. 레이아웃은 글자의 크기를 일일히 계산하고 요소 간 관계를 모두 파악해야 하는 과정이므로 시간이 오래 걸린다.

![alt text](/assets/images/posts/2024/06/28/frontend-performance-03.png)
_https://velog.io/@kmlee95/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%84%B1%EB%8A%A5%EC%B5%9C%EC%A0%81%ED%99%94_

레이아웃 최적화의 목표는 자바스크립트 실행 과정과 렌더링이 다시 일어나는 과정에서 레이아웃에 걸리는 시간을 단축하고 최대한 발생시키지 않도록 하는 것이다. 아래 세 가지를 확인한다.

#### (1) 자바스크립트 실행 최적화
자바스크립트 실행 시간이 긴 경우, 한 프레임 처리가 오래걸려 렌더링 성능이 떨어진다. 많은 작업을 수행할 때 자바스크립트 실행 시간은 오래걸린다. 그래서 자바스크립트가 DOM 및 스타일 변경에 어떤 영향을 끼치는지 확인하고, 수정해야 한다.

##### 문제1: 강제 동기 레이아웃 피하기

````js
// 계산된 값을 반환하기 전에 변경된 스타일이 계산 결과에 적용되어 있지 않으면 변경 이전 값을 반환하기 때문에 브라우저는 동기로 레이아웃을 해야만 한다.

const tabBtn = document.getElementById("tab_btn");

tabBtn.style.fontSize = "24px";
console.log(testBlock.offsetTop);  // offsetTop 호출 직전 브라우저 내부에서는 동기 레이아웃이 발생한다.
tabBtn.style.margin = "10px";
// 레이아웃
````

##### 문제2: 레이아웃 스래싱 피하기

````js
// 한 프레임 내에서 강제 동기 레이아웃이 연속적으로 발생하면 성능이 더욱 저하된다.
function resizeAllParagraphs() {
  const box = document.getElementById("box");
  const paragraphs = document.querySelectorAll(".paragraphs");
  
  for (let i=0; i<paragraphs.length; i++) {
    paragraphs[i].style.width = box.offsetWidth + "px";
  }
}

// 레이아웃 스래싱을 개선한 코드
function resizeAllParagraphs() {
  const box = document.getElementById("box");
  const paragraphs = document.querySelectorAll(".paragraphs");
  const width = box.offsetWidth;
  
  for (let i=0; i<paragraphs.length; i++) {
    paragraphs[i].style.width = width + "px";
  }
}
````


#### (2) HTML, CSS 최적화
화면을 렌더링하기 위해서 필요한 데이터는 HTLM과 CSS로, 각각 DOM 트리와 CSSOM 트리를 만들고 렌더링할 때 사용된다. DOM 트리와 CSSOM 트리를 변경하면 렌더링을 유발하고 트리가 클 수록 더 많은 계산이 필요하다. 그러므로 HTML과 CSS를 최적화하여 렌더링 성능을 향상시킬 수 있다.

- css가 복잡하고 많을수록 스타일 계산과 레이아웃이 오래 걸린다. 복잡한 선택자는 시간이 많이 걸리므로 피한다.
- dom이 작고 깊이가 얕을수록 계산이 빠르므로 불필요한 래퍼 엘리먼트는 제거한다.



#### (3) 애니메이션 최적화
**한 프레임 처리가 16ms(60fps)** 내로 완료되어야 렌더링 시 끊기는 현상 없이 자연스러운 렌더링을 만들어낼 수 있다. 애니메이션을 구현할 때 네이티브 자바스크립트 API를 사용하는 것보다 CSS 사용을 권장한다.

---

<br>

##### 참고

- [프론트엔드 성능최적화](https://velog.io/@kmlee95/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%84%B1%EB%8A%A5%EC%B5%9C%EC%A0%81%ED%99%94)
- [\[프론트엔드\] 성능 최적화 관리](https://coffeeandcakeandnewjeong.tistory.com/34)
- [TOAST UI \| 성능 최적화](https://ui.toast.com/fe-guide/ko_PERFORMANCE)
