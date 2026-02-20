---
title: "[GSAP] timeline"
date: 2024-03-20 22:00:00 +0900
categories: [Library, GSAP]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## timeline
타임라인은 `gsap.timeline()`으로 생성됩니다.   
타임라인은 모든 트윈을 자연스럽게 순서대로 재생처리합니다.

````js
gsap.timeline()
  .from('.sun', { duration: 1, opacity: 0, x: 50, y: 50 })
  .from('.gress', { duration: 1, opacity: 0, y: 100, stagger: 0.2 })
  .from('.bird', { duration: 1, opacity: 0, y: 100 })
  .from('.music', { duration: 1, opacity: 0, x: 100, y: 100 })
````

### 1. 시각적 효과 - Position Parameter

````js
const tl = gsap.timeline();
  tl.to(object, {y:300}, "+=1")  // 이전 트윈 종료 후 1초 뒤에 시작
  tl.to(object, {x:300}, "-=1")  // 이전 트윈 종료 1초 전에 시작
  tl.to(object, {rotation:90}, "<")  // 이전 트윈 시작될 때 동시에 실행
  tl.to(object, {opacity:0.5}, "<1") // 이전 트윈 시작 된 후 1초 뒤에 실행
  tl.to(object2, {x:200}, 1) // 타임라인 1초에 실행
````

<iframe height="300" style="width: 100%;" scrolling="no" title="GSAP3 - basic timeline" src="https://codepen.io/Miok-Song-miok/embed/xxeqKmO?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/Miok-Song-miok/pen/xxeqKmO">
  GSAP3 - basic timeline</a> by Miok Song (miok) (<a href="https://codepen.io/Miok-Song-miok">@Miok-Song-miok</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>



### 2. 타임라인의 컨트롤과 라벨링
GSAP은 타임라인에도 트윈과 동일하게 애니메이션을 제어할 수 있는 방법을 제공합니다. `ex) play()`   
Label을 사용하면 타임라인에서 특정 지점으로 이동할 수 있습니다.   
`add()` 메서드를 사용하여 타임라인에 Label을 추가할 수 있습니다.

<iframe height="300" style="width: 100%;" scrolling="no" title="GSAP3 - Timeline Control" src="https://codepen.io/Miok-Song-miok/embed/gOymOpd?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/Miok-Song-miok/pen/gOymOpd">
  GSAP3 - Timeline Control</a> by Miok Song (miok) (<a href="https://codepen.io/Miok-Song-miok">@Miok-Song-miok</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>



### 3. 메뉴 효과
GSAP을 사용하여 paused된 애니메이션 객체(Tween or Timeline)를 생성합니다.   
Javascript의 Mouse Event를 사용해 (mouseenter, mouseleave) 애니메이션 객체에 `play()` 또는 `reverse()`를 적용합니다.

<iframe height="300" style="width: 100%;" scrolling="no" title="GSAP3 - Menu Hover Effects (Multiple - Start)" src="https://codepen.io/Miok-Song-miok/embed/KKYWwVW?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/Miok-Song-miok/pen/KKYWwVW">
  GSAP3 - Menu Hover Effects (Multiple - Start)</a> by Miok Song (miok) (<a href="https://codepen.io/Miok-Song-miok">@Miok-Song-miok</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>



### 4. Hover Pulse Animation, 버그 해결
부드럽게 멈추거나 다시 반복되는 애니메이션의 대한 이슈는 GreenSock 포럼과 Stackoverflow에 굉장히 자주 등장하는 주제입니다.

<iframe height="300" style="width: 100%;" scrolling="no" title="GSAP3 - Hover Pulse Animation (Started)" src="https://codepen.io/Miok-Song-miok/embed/JjVWobe?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/Miok-Song-miok/pen/JjVWobe">
  GSAP3 - Hover Pulse Animation (Started)</a> by Miok Song (miok) (<a href="https://codepen.io/Miok-Song-miok">@Miok-Song-miok</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>


#### FOCU
Flash of Un-styled Content (FOUC) 는 스타일이 지정되어 있지 않은 요소들이 화면에 랜더링 될 경우 콘텐츠의 깜빡이는 플래시 효과를 나타내는 용어 입니다.

가장 일반적으로 웹폰트가 로드되기 전에 페이지 렌더링 상태에서 기본 글꼴이 나오고 적용된 웹폰트로 변경되는 모습을 상상하시면 됩니다.

사용자에게 가장 빠른 로딩 경험을 제공 하기 위해 `<body>` 태그 끝나기 전에 사용자 정의 스크립트를 로드하는 것이 좋고 또는 defer 명령어를 사용하는 것도 좋은 방법중 하나 입니다.

하지만 우리 수업에서는 GSAP과 Javascript를 사용하여 FOUC를 제거해봅니다.

FOUC를 피하기 위한 단계별 수행 항목

- GSAP의 Special 속성인 `autoAlpha : 1` 설정
- 애니메이션 코드를 init() 함수로 래핑
- 로드 이벤트 리스너를 사용하여 페이지가 로드 된 후 init() 함수를 호출



### timeline을 활용한 예제 1

~~이미지 로딩시간이 좀 길다.~~

<iframe height="300" style="width: 100%;" scrolling="no" title="GSAP3 - 예제1" src="https://codepen.io/Miok-Song-miok/embed/bGJqpXO?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/Miok-Song-miok/pen/bGJqpXO">
  GSAP3 - 예제1</a> by Miok Song (miok) (<a href="https://codepen.io/Miok-Song-miok">@Miok-Song-miok</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>


### timeline을 활용한 예제 2

FOUC현상을 해결하기 위해 autoAlpha 속성을 사용합니다.

````js
tl.from('.stage', { autoAlpha: 0 })
````

codepen 에서는 유료 멤버십 기능인 `GSDevTools.create()` 를 사용할 수 있습니다.

<iframe height="300" style="width: 100%;" scrolling="no" title="GSAP3 - Final Project (Start)" src="https://codepen.io/Miok-Song-miok/embed/yLrMyRK?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/Miok-Song-miok/pen/yLrMyRK">
  GSAP3 - Final Project (Start)</a> by Miok Song (miok) (<a href="https://codepen.io/Miok-Song-miok">@Miok-Song-miok</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
