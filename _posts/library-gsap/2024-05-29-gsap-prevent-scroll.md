---
title: "[GSAP] Prevent Scroll"
date: 2024-05-29 10:15:00 +0900
categories: [Library, GSAP]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## Prevent Scroll
Intro 페이지나 Hero 페이지에서 애니메이션이 진행되는 동안 사용자가 스크롤을 할 수 없게 구현합니다.

### MarkUp
HTML에 보이지 않는 투명한 레이어를 body 최상단에 위치시켜 스크롤을 막아줍니다.

````html
<div id="no-scroll"></div>
<div id="container">
	<!-- ...contents... -->
</div>
````

### CSS
`#no-scroll` 엘리먼트가 최상단에 덮어질 수 있게 `z-index: 9999`로 설정합니다.

````css
#no-scroll { position: fixed; left: 0; top: 0; width: 100vw; height: 100vh; z-index: 9999; }
#container { position: relative; width: 100vw; height: 100vh; overflow: hidden; z-index: 10; }
````

### Script
tl Timeline 애니메이션이 종료되면 `#no-scroll` 엘리먼트를 삭제시켜 스크롤이 가능한 상태로 만듭니다.

````js
const tl = gsap.timeline({
  defaults: { duration: 3, ease: "power3.inOut" },
});

tl
  .from(".image_container > div", { x: innerWidth, stagger: { amount: 0.5 } })
  .to(".image_container > div", { y: innerHeight * 0.2, stagger: { amount: 0.5, from: 2 }}, "-=1.5")
  .from(".text_container .elem", { y: 30, opacity: 0, duration: 1, stagger: { each: 0.2, ease: "power3.inOut" }}, "-=2" );

// eventCallback
tl.eventCallback("onComplete", () => {
  gsap.set("#no-scroll", { display: "none" });
});
````

----

<br>

##### 참고

- [Prevent Scroll \| github \| aluvy](https://aluvy.github.io/gsap/demo/scrolltrigger-PreventScroll/)
