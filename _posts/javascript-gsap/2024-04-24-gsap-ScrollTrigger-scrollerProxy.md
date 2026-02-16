---
title: "[GSAP] ScrollTrigger.scrollerProxy()"
date: 2024-04-24 14:50:00 +0900
categories: [JavaScript, GSAP]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## ScrollTrigger.scrollerProxy

특정한 스크롤러 요소의 scrollTop 또는 scrollLeft의  getter/setter를 대체하여 부드러운 스크롤링 또는 기타 사용자 정의 효과를 구현할 수 있게 해줍니다.

````js
ScrollTrigger.scrollerProxy(scroller: String | Element, vars: Object)
````

### Parameters
- **scroller: String \| Element**
  - `"body"`또는 `".container"` 와 같은 선택자 텍스트 또는 스크롤러로 사용할 요소를 지정합니다.

- **vars: Object**
  - scrollTop 및/또는 scrollLeft 함수를 포함하는 객체로서 프록시된 getter/setter 역할을 하는 것,
  - 예: `{scrollTop: function(value) {...}, scrollLeft: function(value) {...}}`
  - 또한 getBoundingClientRect(), scrollWidth(), scrollHeight() 메서드를 포함할 수 있으며 선택적으로 `pinType: "fixed" | "transform"`을 가질 수 있습니다.

    ````js
    {
      scrollTop: function(value) {
        // scrollTop 값을 설정하거나 반환하는 함수 내용
      },
      scrollLeft: function(value) {
        // scrollLeft 값을 설정하거나 반환하는 함수 내용
      }
    }
    ````


### Details
특정 스크롤러 요소에 대한 scrollTop 및/또는 scrollLeft getter/setter를 장악하여 부드러운 스크롤링 또는 기타 사용자 정의 효과를 구현할 수 있게 해줍니다.

> 💡 GreenSock의 ScrollSmoother는 ScrollTrigger 위에 구축된 부드러운 스크롤링 플러그인으로, 완전히 통합되어 사용이 매우 간편합니다. 다른 부드러운 스크롤링 라이브러리를 괴롭히는 대부분의 접근성 문제를 피하기 위해 기본 스크롤 기술을 사용합니다.
{: .prompt-tip}

> 💡 ScrollSmoother는 Club GreenSock의 회원 전용 혜택이지만, 선호하는 경우 3rd party library를 사용할 수 있습니다. 이것이 scrollerProxy()가 존재하는 이유입니다. 다른 라이브러리를 지원하지는 않지만 예의상 인기있는 라이브러리와 함께 몇 가지 데모를 아래에 포함시켜 두었습니다.
{: .prompt-tip}


### How does it work?
보통 ScrollTrigger는 스크롤러 요소의 일반 속성/메서드를 통해 스크롤 위치를 직접 가져오거나 설정하지만 사용자 정의 경험을 제공하기 위해 자체 getter/setter 함수를 제공할 수도 있습니다.

````js
// 3rd party library setup:
const bodyScrollBar = Scrollbar.init(document.body, {
  damping: 0.1,
  delegateTo: document,
});

// Tell ScrollTrigger to use these proxy getter/setter methods for the "body" element:
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    if (arguments.length) {
      bodyScrollBar.scrollTop = value; // setter
    }
    return bodyScrollBar.scrollTop; // getter
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
});

// when the smooth scroller updates, tell ScrollTrigger to update() too:
bodyScrollBar.addListener(ScrollTrigger.update);
````

기본적으로 '안녕 ScrollTrigger, 이 요소의 scrollTop 또는 `getBoundingClientRect()`을 가져오거나 설정할 때 항상 이러한 메서드 대신 사용하라고 안내하는 것이며,  해당 메서드 내에서 원하는 대로 작업을 수행합니다.

video: <https://vimeo.com/437223508?fl=pl&fe=sh>

<div style="padding:56.43% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/437223508?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Smooth scrolling with ScrollTrigger - .scrollerProxy()"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>


### Special properties
반드시 `scrollTop` 또는 `scrollLeft` getter/setter (또는 둘 다)가 있어야 하며, 나머지는 도움이 될 수도 있고 그렇지 않을 수도 있습니다 (선택 사항입니다).


#### scrollTop
**Function** - getter 및 setter로 사용할 수 있는 메서드   
인수를 받으면 setter로 처리해야 하며, 그렇지 않으면 getter로 처리하여 현재 `scrollTop` 값을 반환해야 합니다.

#### scrollLeft
**Function** - getter 및 setter로 사용할 수 있는 메서드   
인수를 받으면 setter로 처리해야 하며, 그렇지 않으면 getter로 처리하여 현재 `scrollLeft` 값을 반환해야 합니다.

#### fixedMarkers
**Boolean** - `true`인 경우, 마커들을 마치 `position: fixed`와 같이 취급합니다.   
이것은 스무스 스크롤링 라이브러리와 통합할 때 마커가 번역되는 요소 내에 배치되는 경우에만 유용합니다. 마커가 움직이는 것을 발견하면 `true`로 설정해 보세요. (3.7.0 버전에서 추가됨)

#### getBoundingClientRact
**Function** - proxied 스크롤러의 경계 사각형을 나타내는 `top`, `left`, `width`, `height` 속성을 포함하는 객체를 반환하는 메서드입니다. 이 객체는 대부분 `{top: 0, left: 0, width: window.innerWidth, height: window.innerHeight}`와 같습니다.

#### scrollWidth
**Function** - getter 및 setter로 사용할 수 있는 메서드   
인수를 받으면 setter로 처리해야 하며, 그렇지 않으면 getter로 처리하여 현재 `scrollWidth` 값을 반환해야 합니다.

#### scrollHeight
**Function** - getter 및 setter로 사용할 수 있는 메서드   
인수를 받으면 setter로 처리해야 하며, 그렇지 않으면 getter로 처리하여 현재 `scrollHeight` 값을 반환해야 합니다.

#### pinType
**'fixed' \| 'transform'** - 요소가 이 프록시된 스크롤러와 연관될 때(만약 ScrollTrigger에 핀(pin)이 정의되어 있다면) 핀이 적용되는 방식을 결정합니다. 기본적으로, `<body>`만 핀(pin)에 대해 `position: "fixed"`를 사용하고 모든 다른 경우에는 `transform` 오프셋을 사용합니다. 왜냐하면 부모 요소 중 어떤 요소라도 `transform`이 적용되면 (심지어 transform: translate(0, 0)일 경우에도) 새로운 컨텍스트를 생성하며 `position: "fixed"`가 예상한대로 동작하지 않기 때문입니다. 이것은 브라우저 문제이며 ScrollTrigger의 문제가 아닙니다. pinType은 프록시된 스크롤러에 대해 특정 핀(pin) 기술을 강제로 사용하도록 허용합니다. 핀이 떨리는 현상을 관찰하면 pinType: "fixed"로 설정해 보세요 (떨림은 일반적으로 브라우저가 본문의 스크롤링을 다른 스레드에서 처리하기 때문에 JS를 통해 적용되는 변환(transforms)이 동기화되지 않을 때 발생합니다). 핀이 전혀 고정되지 않는 것으로 보인다면 `pinType: "transform"`으로 설정해 보세요.

GreenSock은 특정 스무스 스크롤링 라이브러리를 권장하거나 지지하지 않습니다. 아래의 데모는 다양한 포럼 게시물을 기반으로 만들어졌습니다.

## 3rd party library

### Locomotive Scroll

- 공식 홈페이지: <https://locomotivemtl.github.io/locomotive-scroll/>
- gitHub: [Locomotive Scroll](https://github.com/locomotivemtl/locomotive-scroll)

<iframe height="300" style="width: 100%;" scrolling="no" title=" Locomotive Scroll with ScrollTrigger scrubbing and pinning" src="https://codepen.io/GreenSock/embed/zYrELYe?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/GreenSock/pen/zYrELYe">
   Locomotive Scroll with ScrollTrigger scrubbing and pinning</a> by GSAP (<a href="https://codepen.io/GreenSock">@GreenSock</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>


### smooth-scrollbar

- 공식 홈페이지: <https://idiotwu.github.io/smooth-scrollbar/>
- gitHub: [smooth-scrollbar](https://github.com/dolphin-wood/smooth-scrollbar)

<iframe height="300" style="width: 100%;" scrolling="no" title="ScrollTrigger.scrollerProxy() smooth-scroller Demo" src="https://codepen.io/GreenSock/embed/oNLqgBm?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/GreenSock/pen/oNLqgBm">
  ScrollTrigger.scrollerProxy() smooth-scroller Demo</a> by GSAP (<a href="https://codepen.io/GreenSock">@GreenSock</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

<iframe height="300" style="width: 100%;" scrolling="no" title="ScrollTrigger.scrollerProxy() smooth-scrollbar demo" src="https://codepen.io/GreenSock/embed/GRovmPr?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/GreenSock/pen/GRovmPr">
  ScrollTrigger.scrollerProxy() smooth-scrollbar demo</a> by GSAP (<a href="https://codepen.io/GreenSock">@GreenSock</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>


### ASScroll

- gitHub: [ASScroll](https://github.com/ashthornton/asscroll)

<iframe height="300" style="width: 100%;" scrolling="no" title="ASScroll × GSAP ScrollTrigger" src="https://codepen.io/GreenSock/embed/rNyyxBP?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/GreenSock/pen/rNyyxBP">
  ASScroll × GSAP ScrollTrigger</a> by GSAP (<a href="https://codepen.io/GreenSock">@GreenSock</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>


> ScrollTrigger.scrollerProxy()은 GSAP 3.4.0 버전에 추가되었습니다.
{: .prompt-tip}


---

<br>

##### 참고

- [static-scrollerProxy \| GSAP \| Docs & Learning](https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.scrollerProxy()/)
- [ScrollTrigger.scrollerProxy() \| Notion](https://productive-printer-b81.notion.site/ScrollTrigger-scrollerProxy-1aa1b1a606c5406f8d0bc7063668430e)
- [scrollerProxy \| github \| aluvy](https://aluvy.github.io/gsap/demo/scrolltrigger-proxy/)
