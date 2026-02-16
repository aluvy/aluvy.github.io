---
title: "[GSAP] from(), fromTo(): immediateRender"
date: 2024-05-29 10:53:00 +0900
categories: [JavaScript, GSAP]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## immediateRender
즉시렌더, `from()` 및 `fromTo()` 트윈의 `immediateRender` 속성은 예상치 못한 결과가 나올 때만 알게 되는 것 중 하나입니다. 이 예상치 못한 결과는 동일한 엘리먼트에 동일한 `from()` 또는 `fromTo()` 트윈이 여러 개 설정되어 있을 때 나타납니다.

### GSAP 작동 방식 필수 개념 요소
`from()`과 `fromTo()` 트윈의 경우 GSAP는 `immediateRender`를 `true`로 기본값을 가집니다.

- `to()` ~부터: 현재 원래 위치에서 보내고 싶은 이동 까지 --> 0 부터 1 까지
- `from()` ~까지: 시작 위치부터 원래 값 까지 --> 1 부터 0까지

**immediateRender: 즉시 렌더**   
`from()` tween은 즉시 CSS 속성을 주고 시작하기 때문에 즉시렌더이다.   
이 설정이 중첩으로 사용되었을 때 글리치 에러가 발생한다.

> 글리치: 주로 정전기처럼 아주 짧은 순간 팍 하고 일어나는 오류를 일컫는다.
{: .prompt-tip}



### 글리치가 발생하는 경우
아래 코드를 실행하면 `imediateRender: true`로 인해 글리치가 발생한다.   
`.from(".orange", { opacity: 0 })` 의 상태를 기억해 `opacity: 0` 으로 멈춘다.   
`immediateRender` 는 기본속성이 `true` 로 설정되어 있기 때문이다.

````js
const tl = gsap.timeline({ defaults: { duration: 2 } });

tl.from(".orange", { opacity: 0, y: 50 }) // opacity 0 -> 1
  .from(".pink", { opacity: 0, y: 50 })
  .from(".blue", { opacity: 0, scale: 1.2 })
````

`immediateRender: false` 로 설정하면, `opacity 0`을 기억하는게 아니래 본래 `.orange`의 `1`을 기억하게 되어 제대로 동작한다.

````js
// ...
.from(".orange", { opacity: 0, immediateRender: false });
````


## 스크롤 시 배경색이 바뀌는 navigation 구현
스크롤 값에 따라 상단에 고정되어 있는 네비게이션의 배경 색상이 변경되는 애니메이션을 구현해야 할 때,   
루프 안에 ScrollTrigger를 생성하고, 그 안에 navigation에 대한 색상 변경 애니메이션을 적용하는 방식으로 구현할 것이빈다. 이 때 기본적으로 `immediateRender: true`로 설정되기 때문에 각 **트윈이 시작 값을 즉시 기록**{: .fc-primary}하므로 약간의 Glitch(글리치)가 발생합니다.

`immediateRender: false` 로 설정하여, `from()` 의 위치를 제어할 수 있다.

````js
const navColor = ['#ebdec1', '#e9aab1', '#92e0d3', '#52becb', '#f17683'];
const section = gsap.utils.toArray('.section').map(o => o.getBoundingClientRect().top);

const nav = document.querySelector('.nav');
const navH = nav.clientHeight;

gsap.utils.toArray('.section').forEach((o, i) => {
  // loop 안에 ScrollTrigger 생성
  ScrollTrigger.create({
    trigger: o,
    start: () => `top ${nav.offsetHeight}px`,
    end: () => `bottom ${nav.offsetHeight}px`,
    animation: gsap.to(nav, {
      backgroundColor: navColor[i],
      immediateRender: false,	// immediateRender: false 꺼야함
    }),
    toggleActions: 'restart none none reverse', // enter, leave, enterback, leaveback
    markers: true,
  });
});
````

---

<br>

##### 참고

- [Navigation Loop \| github \| aluvy](https://aluvy.github.io/gsap/demo/scrolltrigger-NavigationLoop/)
- [immediateRender \| GSAP \| Docs & Learning](https://gsap.com/resources/immediaterender/)
