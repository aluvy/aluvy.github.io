---
title: "[GSAP] ScrollTrigger: fastScrollEnd"
date: 2024-05-29 10:23:00 +0900
categories: [JavaScript, GSAP]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## ScrollTrigger: fastScrollEnd
ScrollTrigger의 `fastScrollEnd`옵션은 사용자의 스크롤 속도에 따라 ScrollTrigger가 어떻게 반응할지 설정합니다.

`fastScrollEnd: true` 으로 설정하면 트리거 영역을 일정 속도(기본 2500px/s)보다 빨리 벗어나면 ScrollTrigger의 애니메이션을 강제로 완료시킵니다. 이것은 사용자가 빠르게 스크롤 할 때 애니메이션이 겹치는 것을 방지합니다.

````js
fastScrollEnd: true;
````

`fastScrollEnd: 3000` 으로 설정하면 스크롤 속도가 3000px/s를 초과하면 ScrollTrigger의 애니메이션을 강제로 완료시킵니다.

````js
fastScrollEnd: 3000
````

<iframe height="300" style="width: 100%;" scrolling="no" title="preventOverlaps and fastScrollEnd | ScrollTrigger | GSAP" src="https://codepen.io/GreenSock/embed/ZEyXPGj?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/GreenSock/pen/ZEyXPGj">
  preventOverlaps and fastScrollEnd | ScrollTrigger | GSAP</a> by GSAP (<a href="https://codepen.io/GreenSock">@GreenSock</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

---

<br>

##### 참고

- [preventOverlaps and fastScrollEnd \| ScrollTrigger \| GSAP](https://codepen.io/GreenSock/pen/ZEyXPGj)

<iframe height="300" style="width: 100%;" scrolling="no" title="preventOverlaps and fastScrollEnd | ScrollTrigger | GSAP" src="https://codepen.io/GreenSock/embed/ZEyXPGj?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/GreenSock/pen/ZEyXPGj">
  preventOverlaps and fastScrollEnd | ScrollTrigger | GSAP</a> by GSAP (<a href="https://codepen.io/GreenSock">@GreenSock</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

- [Fast Scroll End \| github \| aluvy](https://aluvy.github.io/gsap/demo/scrolltrigger-FastScrollEnd/)
