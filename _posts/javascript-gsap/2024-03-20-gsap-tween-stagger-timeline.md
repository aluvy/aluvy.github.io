---
title: "[GSAP] tween, stagger, timeline"
date: 2024-03-20 21:17:00 +0900
categories: [JavaScript, GSAP]
tags: []
render_with_liquid: false
math: true
mermaid: true
---


## tween
Tweens는 모든 애니메이션이 작동하는 역할을 말하며, ( high-performance property setter ) 대상 ( 애니메이션을 적용할 객체) 에게 duration, animation-properties 정보를 입력하는 하나의 단위로 해석합니다.

Tween은 3가지의 methods를 가지고 애니메이션을 만들 수 있으며 각각의 트윈엔 기본 규칙으로 `target`과 `vars object` 옵션을 가집니다.


### 1. 기본 문법 - to, from, fromTo

#### gsap.to()

````js
gsap.to('.elem', { duration: 1, x: 100, y: 100, rotation: 45 });
````

#### gsap.from()

````js
gsap.from('.elem', { duration: 1, x: 100, y: 100, rotation: 45 });
````

#### gsap.fromTo()

````js
gsap.fromTo(
  '.elem',
  { duration: 1, x: -100, y: -100, rotation: -45 },
  { duration: 1, x: 100, y: 100, rotation: 45 }
);
````

<iframe height="300" style="width: 100%;" scrolling="no" title="GSAP3 - Basic Tween" src="https://codepen.io/Miok-Song-miok/embed/yLrMBPw?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/Miok-Song-miok/pen/yLrMBPw">
  GSAP3 - Basic Tween</a> by Miok Song (miok) (<a href="https://codepen.io/Miok-Song-miok">@Miok-Song-miok</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

재생속도를 정하지 않았다면 gsap은 기본값인 0.5s(500ms)를 사용합니다.


#### 1-1. Short codes properties

- **x: 100**: transform: translateX(100px)
- **y: 100**: trasnform: translateY(100px)
- **rotation: 360**: transform: rotate(360deg)
- **rotationX: 360**: transform: rotateX(360deg)
- **rotationY: 360**: transform: rotateY(360deg)
- **skewX: 45**: transform: skewX(45deg)
- **skewY: 45**: transform: skewY(45deg)
- **scale: 2**: transform: scale(2, 2)
- **scaleX: 2**: transform: scaleX(2)
- **scaleY: 2**: transform: scaleY(2)
- **xPercent: -50  /  x: "-50%"**: transform: translateX(-50%)
- **yPercent: -50  /  y: "-50%"**: transform: translateY(-50%)

> **브라우저 성능을 고려한다면**   
> 브라우저 성능을 최대치로 끌어올리기 위해선 `CSS Transform`과 `Opacity`의 애니메이션을 사용해야 한다. `CSS Transform`과 `Opacity`가 아닌 값을 변경하면 브라우저가 페이지 레이아웃을 다시 랜더링(re-rander)하여 트윈이 많을 경우 성능을 저하시킬 수 있다.
{: .prompt-tip}


### 2. 지연과 반복 - delay, repeat, yoyo, repeatDelay
스페셜 속성은 애니메이션이 실행되는 방식과 수행해야 하는 작업을 정의합니다.   
특수 속성은 애니메이션 되지 않습니다.

- **delay** : 애니메이션이 시작되기 전에 지연시간을 지정합니다.
- **repeat** : 애니메이션이 몇번 반복되어야 하는지를 지정합니다.
- **yoyo** : `true` 로 설정하면 애니메이션이 앞뒤로 재생됩니다.
- **repeatDelay** : 각 반복 사이에 발생하는 지연시간을 지정합니다.

> 무한 반복은 `repeat: -1` 을 설정하면 애니메이션이 무기한 반복됩니다.
{: .prompt-info}

> yoyo 속성은 `repeat` 설정이 들어있어야 사용가능합니다.
{: .prompt-info}

<iframe height="300" style="width: 100%;" scrolling="no" title="GSAP3 - Basic Tween" src="https://codepen.io/Miok-Song-miok/embed/oNOZvpz?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/Miok-Song-miok/pen/oNOZvpz">
  GSAP3 - Basic Tween</a> by Miok Song (miok) (<a href="https://codepen.io/Miok-Song-miok">@Miok-Song-miok</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>


### 3. 가속도 - easing
ease는 애니메이션이 재생될 때의 변경 속도를 제어합니다.   
간단한 사용에서 ease는 애니메이션이 느려지거나 빨라지는지에 대한 여부를 제어합니다.

가속도 제어는 ease를 기본값(default)로 가지며, 커브가 가파를수록 더 급격한 변화를 만들 수 있습니다.

"power.out", "sine.in", "sine.out" 등의 값을 많이 사용합니다.

````js
gsap.to(".elem", { duration: 2.5, ease: "power1.out", y: -500 });
````

<https://gsap.com/docs/v3/Eases/>




### 4. 다중 요소 제어 - stagger
stagger 기능을 사용하면 각 개체의 애니메이션의 시작 사이에 약간의 지연시간을 넣어 보다 쉽게 제어할 수 있습니다.   
stagger 객체를 사용하면 stagger가 시작되는 위치와 타이밍이 분산되는 방식을 더 잘 제어할 수 있습니다.

````js
gsap.to(".stage .box", { y: -50, stagger: {
    each: 0.2,
    from: "end"
  }
});
````

- **each**: 0.2 는 각 애니메이션의 시작 사이에 0.2초가 있음을 의미합니다.
- **amount**: 0.2 는 모든 애니메이션이 0.2초 이내에 시작됩니다.

> `from` 으로 받을 수 있는 값 first, end, center, edges
{: .prompt-tip}

<iframe height="300" style="width: 100%;" scrolling="no" title="GSAP3 - stagger" src="https://codepen.io/Miok-Song-miok/embed/bGJqbaK?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/Miok-Song-miok/pen/bGJqbaK">
  GSAP3 - stagger</a> by Miok Song (miok) (<a href="https://codepen.io/Miok-Song-miok">@Miok-Song-miok</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>



### 5. tween control
Tween에는 재생을 제어하는 여러 가지 방법들이 있습니다.   
트윈을 제어하려면 이를 참조할 방법이 필요합니다. 아래의 코드처럼 트윈을 참조하는 변수를 설정합니다.

````js
let tween = gsap.to(".box", { x: 600, paused: true });
````

트윈이 자동으로 재생되지 않도록 하려면 paused 속성을 true로 설정하여 처음 자동재생을 막을 수 있습니다.   
`tween.pause()` 로도 가능합니다.

해당 트윈을 재생하려면 나중에 다음을 호출할 수 있습니다.

````js
tween.play();
tween.pause();
tween.resume();
tween.reverse();
tween.restart();
````

<iframe height="300" style="width: 100%;" scrolling="no" title="GSAP3 - Tween Control" src="https://codepen.io/Miok-Song-miok/embed/oNOZvqY?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/Miok-Song-miok/pen/oNOZvqY">
  GSAP3 - Tween Control</a> by Miok Song (miok) (<a href="https://codepen.io/Miok-Song-miok">@Miok-Song-miok</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>


### 6. 트윈의 버그, 해결방법

지금까지 GSAP의 기본 트윈으로 할 수 있는 많은 애니메이션들을 만들어봤습니다.   
GSAP을 사용하면 몇 줄의 코드로 다양하고 많은 애니메이션들을 만들어낼 수 있습니다.   
하지만, 몇가지 의도치 않은 문제점들도 발생합니다.

에러의 원인을 확인하기 위해 gsap의 `getProperty` 메서드를 이용해 확인해봅시다.

<iframe height="300" style="width: 100%;" scrolling="no" title="GSAP3 - from() Tweens Glitch" src="https://codepen.io/Miok-Song-miok/embed/abxJoKd?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/Miok-Song-miok/pen/abxJoKd">
  GSAP3 - from() Tweens Glitch</a> by Miok Song (miok) (<a href="https://codepen.io/Miok-Song-miok">@Miok-Song-miok</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

`gsap.fromTo()` 메서드로 처음 시작점과 끝 점을 정확하게 지정해주면 해결됩니다.

---

<br>

#### 참고

- [Homepage \| GSAP](https://gsap.com/)
- [GSAP Basic \| Notion](https://productive-printer-b81.notion.site/GSAP-Basic-4c37387fe8254db4a7d14c883f8baa2d)
