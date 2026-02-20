---
title: "[GSAP] Timeline Visualizer"
date: 2024-03-22 21:53:00 +0900
categories: [Library, GSAP]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

GSAP Timeline Visualizer는 GSAP(GreenSock Animation Platform)의 타임라인 애니메이션을 시각적으로 디버깅하고 제어할 수 있게 해주는 개발 도구입니다.

## 주요 기능

- **시각적 타임라인 표현**
  - 복잡한 애니메이션 시퀀스를 시간축 상에서 직관적으로 볼 수 있습니다. 각 트윈(tween)이 언제 시작하고 끝나는지, 어떻게 겹치는지를 한눈에 파악할 수 있어요.

- **실시간 재생 제어**
  - 타임라인을 일시정지, 재생, 되감기할 수 있고, 특정 시점으로 직접 이동(seek)할 수도 있습니다. 이를 통해 애니메이션의 특정 순간을 정밀하게 검사할 수 있죠.

- **속도 조절**
  - 애니메이션 재생 속도를 느리게 하거나 빠르게 해서 세밀한 부분까지 확인하거나 전체 흐름을 빠르게 파악할 수 있습니다.

## 사용 방법
GSAP Timeline Visualizer는 주로 GSDevTools라는 플러그인을 통해 사용됩니다:

````js
const tl = gsap.timeline();
tl.to(".box", { x: 100, duration: 1 })
  .to(".circle", { y: 50, duration: 0.5 })
  .to(".box", { rotation: 360, duration: 1 });

// 비주얼라이저 추가
GSDevTools.create({ animation: tl });
````
이 도구는 특히 복잡한 순차 애니메이션이나 여러 요소가 동시에 움직이는 애니메이션을 개발할 때 매우 유용합니다. 개발 과정에서만 사용하고 프로덕션에서는 제거하는 것이 일반적입니다.


- `.getChildren()`: 타임라인에서 모든 자식 트윈 및 타임라인의 배열을 가져온다.
- `.startTime()`: 부모 타임라인에서 시작되는 시간을 가져오거나 설정한다.
- `.duration()`: 자신이 재생되는 시간을 가져온다.
