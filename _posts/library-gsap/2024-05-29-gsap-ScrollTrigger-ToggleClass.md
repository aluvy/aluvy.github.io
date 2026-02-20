---
title: "[GSAP] ScrollTrigger: ToggleClass"
date: 2024-05-29 10:32:00 +0900
categories: [Library, GSAP]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## ScrollTrigger: ToggleClass
ScrollTrigger가 활성 또는 비활성을 전환할 때 요소에 클래스를 추가또는 제거 합니다.

### String
ScrollTrigger가 활성화 되면 `trigger`에 `active` 클래스를 추가합니다.

````js
toggleClass: "active"
````

### Object
ScrollTrigger가 활성화 되면 `.my-selector`에 `active` 클래스를 추가합니다.

````js
toggleClass: { targets: '.my-selector', className: 'active' }
````

<iframe height="300" style="width: 100%;" scrolling="no" title="preventOverlaps and fastScrollEnd | ScrollTrigger | GSAP" src="https://codepen.io/GreenSock/embed/ZEyXPGj?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/GreenSock/pen/ZEyXPGj">
  preventOverlaps and fastScrollEnd | ScrollTrigger | GSAP</a> by GSAP (<a href="https://codepen.io/GreenSock">@GreenSock</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

> toggleAction은 toggleClass에 적용되지 않습니다. 클래스 이름을 다른 방식으로 토글 하려면 콜백을 사용합니다.
{: .prompt-tip}

---

<br>

##### 참고

- [Fast Scroll Trigger](https://aluvy.github.io/gsap/demo/scrolltrigger-FastScrollEnd/)
