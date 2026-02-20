---
title: "[GSAP] keyframes"
date: 2024-03-20 22:27:00 +0900
categories: [Library, GSAP]
tags: []
render_with_liquid: false
math: true
mermaid: true
---



## keyframes
CSS에서 사용할 수 있는 keyframes를 gsap에서도 사용할 수 있다.

````js
gsap.to(".among", {
  keyframes: {
    "0%": {},
    "30%": { x: 420, },
    "50%": { scale: 2, },
    "60%": { x: 0, }, 
    "70%": { scale: 1 },
    "100%": { x: 420, },
    // easeEach: "sine.out",
  },
  duration: 3
})
````


> CSS keyframes의 default ease값은 “power1.inOut” 이고   
> GSAP keyframes의 default ease값은 “power1.out” 입니다.
{: .prompt-tip}


> easeEach 를 사용하면 각 프레임 구간 마다 가속도를 재설정 할 수 있습니다.
{: .prompt-tip}



<https://codepen.io/GreenSock/pen/GRvLaQe/941b82d684b7fbf5303304d671e15ce2>
<iframe height="300" style="width: 100%;" scrolling="no" title="Ease vs EaseEach" src="https://codepen.io/GreenSock/embed/GRvLaQe?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/GreenSock/pen/GRvLaQe">
  Ease vs EaseEach</a> by GSAP (<a href="https://codepen.io/GreenSock">@GreenSock</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>


### 예제1
<iframe height="300" style="width: 100%;" scrolling="no" title="GSAP3 - keyframes (1) (Start)" src="https://codepen.io/Miok-Song-miok/embed/oNOZXgX?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/Miok-Song-miok/pen/oNOZXgX">
  GSAP3 - keyframes (1) (Start)</a> by Miok Song (miok) (<a href="https://codepen.io/Miok-Song-miok">@Miok-Song-miok</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>


### 예제2
<iframe height="300" style="width: 100%;" scrolling="no" title="GSAP3 - keyframes (Challenges 1)" src="https://codepen.io/Miok-Song-miok/embed/VwNpLrP?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/Miok-Song-miok/pen/VwNpLrP">
  GSAP3 - keyframes (Challenges 1)</a> by Miok Song (miok) (<a href="https://codepen.io/Miok-Song-miok">@Miok-Song-miok</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>


### 예제3
<iframe height="300" style="width: 100%;" scrolling="no" title="GSAP3 - keyframes (Challenges 2)" src="https://codepen.io/Miok-Song-miok/embed/poBeJOB?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/Miok-Song-miok/pen/poBeJOB">
  GSAP3 - keyframes (Challenges 2)</a> by Miok Song (miok) (<a href="https://codepen.io/Miok-Song-miok">@Miok-Song-miok</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
