---
title: "[GSAP] ScrollTrigger: Parallax Scroll"
date: 2024-05-29 09:59:00 +0900
categories: [JavaScript, GSAP]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## Parallax Scroll
시차 스크롤링은 스크롤 시 각 요소의 이동 속도를 제어하여 깊이감을 주는 효과를 구현하는데에 쓰입니다.

### MarkUp
시차 스크롤링이 적용 될 `.parallax` 엘리먼트에 `data-depth` 속성을 부여하여 스크롤 시에 받을 속도를 조절합니다.

````html
<div id="hero">
  <div class="layer parallax layer-bg" data-depth="0.1"></div>
  <div class="layer parallax layer-1" data-depth="0.2"></div>
  <div class="layer parallax layer-2" data-depth="0.5"></div>
  <div class="layer parallax layer-3" data-depth="0.8"></div>
  <div class="layer parallax layer-overlay" data-depth="0.85"></div>
  <div class="layer parallax layer-4" data-depth="1"></div>
</div>
````

### Script
엘리먼트에 부여된 `data-depth` 속성을 기반으로 `y`값을 부여하여, 시차 스크롤링을 구현합니다.

#### 방법1
각각의 `.parallax` 엘리먼트에 `ScrollTrigger`를 모두 걸어서 구현합니다.   
이렇게 구현하게 되면 ScrollTrigger가 `.parallax` 엘리먼트 수 많큼 생성되기 때문에 무거워 질 수 있다.

````js
gsap.utils.toArray(".parallax").forEach((a, i) => {
  const depth = a.dataset.depth;
  const height = a.offsetHeight;
  const y = -(height * depth);

  ScrollTrigger.create({
    trigger: "#hero",
    start: "top top",
    end: "bottom top",
    animation: gsap.to(a, { y, ease: "none" }),
    markers: true,
    scrub: true,
  });
});
````

#### 방법2
각각의 `.parallax` 엘리먼트의 Tween들을 timeline으로 만들고, `position parameter`를 `0`으로 설정해 동시에 실행 시깁니다. 이 Timeline에 ScrollTrigger를 연결 시켜 시차 스크롤링을 구현합니다.

````js
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#hero",
    start: "top top",
    end: "bottom top",
    // animation: tl,
    markers: true,
    scrub: true,
  },
});

gsap.utils.toArray(".parallax").forEach((a, i) => {
  const depth = a.dataset.depth;
  const height = a.offsetHeight;
  const y = -(height * depth);

  tl.to(a, { y, ease: "none" }, 0);
});
````

---

<br>

##### 참고

- [Parallax](https://aluvy.github.io/gsap/demo/scrolltrigger-parallax/)
