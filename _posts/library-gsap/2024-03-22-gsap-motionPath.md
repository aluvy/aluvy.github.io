---
title: "[GSAP] motionPath"
date: 2024-03-22 21:51:00 +0900
categories: [Library, GSAP]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## MotionPath
경로를 따라(또는 임의의 속성 값을 통해) 모든 오브젝트에 애니메이션을 적용합니다.
````js
gsap.registerPlugin(MotionPathPlugin);

// Minimal usage
gsap.to("#div", {
  motionPath: {
    path: "#path",
  },
  transformOrigin: "50% 50%",
  duration: 5,
});
````

<iframe width="560" height="315" src="https://www.youtube.com/embed/3FbYrkDzgd4?si=PrEMo8XOfF_n7M9C" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


경로를 따라(또는 임의의 속성 값을 통해) 모든 오브젝트에 애니메이션을 적용합니다.   
모션경로는 다음 중 하나로 정의할 수 있습니다:

SVG `<path>` 요소(선택기 텍스트 또는 직접 참조)와 같습니다:

````js
motionPath: "#pathID";
````

SVG 경로 데이터 문자열:

````js
motionPath: "M9,100c0,0,18-41,49-65";
````

x,y 좌표가 있는 객체의 배열.   
기본적으로 이 좌표를 통해 곡선 경로를 그리지만 유형을 설정합니다: 큐빅 베지어를 나타내는 경우 `type: "cubic"`으로 설정합니다:

````js
// plot a curve through these coordinates. The target's current coordinates will automatically be added to the start:
motionPath: [{x:100, y:50}, {x:200, y:0}, {x:300, y:100}]

// cubic bezier coordinates (anchor, two control points, anchor, two control points, etc.):
motionPath: {
  path: [{x:0, y:0}, {x:20, y:0}, {x:30, y:50}, {x:50, y:50}],
  type: "cubic"
}
````


다른 프로퍼티를 정의하는 객체 배열("x"와 "y"일 필요는 없음):   
이렇게 하면 기본적으로 각 값에 도달할 때 속도 변화를 부드럽게 합니다:

````js
// property values through which to animate (the target's current property values will be added to the start):
motionPath: [
  { scale: 0.5, rotation: 10 },
  { scale: 1, rotation: -10 },
  { scale: 0.8, rotation: 3 },
];
````

위 형식의 경로 속성과 다음과 같은 기타 구성 세부 정보가 있는 구성 개체입니다:

````js
gsap.to('#elem', {
  x: 10,
  y: 10,
  motionPath: {
    path: '#pathID',
    align: '#pathID',
    alignOrigin: [0.5, 0.5],
    autoRotate: true,
    start: 0.25,
    end: 0.75
  }
})
````




### Special Properties

#### path
**String | Element | Array** \[required\] 대상에 애니메이션을 적용할 모션 경로입니다.   
다음 중 하나가 될 수 있습니다:

- 같은 SVG 요소 `motionPath: "#pathID"`
- SVG 경로 데이터 문자열 `motionPath: "M9,100c0,0,18-41,49-65"`
- x,y 좌표가 있는 객체의 배열. 이 좌표 또는 집합 유형을 통해 곡선 경로가 그려집니다:
  - `type: "cubic"` 으로 설정하면 순차적인 큐빅 베지어 좌표로 해석됩니다(앵커, 두 제어점, 앵커, 두 제어점 등의 순서)
  - `motionPath: {path: [{x:0, y:0}, {x:20, y:0}, {x:30, y:50}, {x:50, y:50}], type: "cubic" }`
- 다른 프로퍼티를 정의하는 객체 배열("x"와 "y"일 필요는 없음). 이렇게 하면 기본적으로 각 값에 도달할 때 속도 변화를 부드럽게 합니다.
  - `motionPath: [ { scale: 0.5, rotation: 10 }, { scale: 1, rotation: -10 }, { scale: 0.8, rotation: 3 } ]`


#### align
**String | Element** - 기본적으로 `path` 데이터의 원시 좌표 값은 대상의 x/y 변환에 직접 연결되지만 `align` 속성은 서로 다른 변환 컨테이너 안에 얼마나 깊게 중첩되어 있는지에 관계없이 대상을 경로 위에 정확히 배치(또는 경로를 대상으로 이동)하기 위해 좌표 공간을 구부립니다!   
`path`에 `align`할 수도 있습니다. 즉, 경로와 정렬은 같은 요소를 가리킬 수 있습니다.   
align은 다음 중 하나가 될 수 있습니다:

- **Selector text** - `"#path"`와 같은 선택기 텍스트는 ID가 "path"인 요소를 선택하고 트윈의 타겟을 왼쪽 상단 모서리가 "#path" 요소와 완벽하게 정렬되도록 이동합니다. 타깃을 그 자리에서 중앙에 배치하려면 `alignOrigin: [0.5, 0.5]`를 사용합니다.
- **Element** - DOM 요소에 대한 참조
- **"self"** - "self"는 트윈이 처음에 점프하지 않도록 경로를 트윈의 타겟으로 이동합니다. 즉, 마치 현재 위치에서 경로가 그려지는 것과 같습니다.

`offsetX`, `offsetY를` 사용하여 정렬을 미세 조정할 수도 있습니다.


#### alignOrigin
**Array** - 대상에서 경로와 정렬되는 지점을 결정합니다.   
`alignOrigin`은 x축과 y축을 따라 진행률 값이 있는 배열이므로 `[0.5, 0.5]`는 중앙, `[1, 0]`은 오른쪽 상단 모서리 등이 될 수 있습니다.   
편의를 위해 `alignOrigin`을 설정하면 `transformOrigin`도 대상의 해당 위치로 자동 설정됩니다. (GSAP 3.2.0에 추가됨)


#### autoRotate
**Boolean | Number** - 요소를 경로 방향으로 회전합니다.   
`true`은 경로의 각도와 정확히 일치하지만 `autoRotate`를 숫자(도)로 정의하여 각도를 원하는 만큼 오프셋할 수 있습니다.   
예를 들어 `autoRotate: 90`은 경로를 따라 이동할 때 회전에 90도를 더합니다. 요소가 중심에서 회전하도록 하려면 `transformOrigin: "50% 50%"`를 설정하면 됩니다.   
경로를 대상의 중앙에 정렬하려면 `alignOrigin: [0.5, 0.5]`를 사용하거나 motionPath 트윈 앞에 대상에 `xPercent: -50, yPercent: -50`을 설정합니다.


#### start
**Number** - 시작하려는 경로의 위치로, 0은 시작, 1은 끝, 0.5는 중간입니다. 양수 또는 음수의 십진수가 될 수 있습니다.   
예를 들어 `0.3`은 커브를 따라 30% 지점에서 요소를 시작합니다. 기본값은 0입니다.


#### end
**Number** - 끝나는 경로의 위치로, 0은 시작, 1은 끝, 0.5는 중간입니다.   
시작보다 작은 값(개체가 뒤로 이동하게 하는 값)을 포함하여 양수 또는 음수의 십진수일 수 있습니다.   
예를 들어 `0.3`은 커브를 따라 30% 지점에서 요소가 끝나게 합니다. 1.5는 시작점으로 되돌아가서 중간 지점에서 멈추게 합니다. 기본값은 1입니다.



#### curviness
**Number** - `path`가 커브를 그릴 점의 배열인 경우에만 적용됩니다.   
이는 결과 경로의 "곡선" 정도를 결정합니다. 따라서 0은 직선(딱딱한 모서리), 1(기본값)은 멋진 곡선 경로, 2는 훨씬 더 곡선화된 경로를 만듭니다.   
숫자가 높아질수록 앵커에서 제어점을 점점 더 바깥쪽으로 당긴다고 생각하면 됩니다. 기본값은 1입니다.


#### offsetX
**Number** - 정렬 미세 조정을 위해 X 좌표에 추가할 값입니다. 기본값은 0입니다.


#### offsetY
**Number** - 정렬 미세 조정을 위해 Y 좌표에 추가할 값입니다. 기본값은 0입니다.


#### fromCurrent
**Boolean** - `false` 이면 `path`에 전달된 배열에 현재 속성 값을 포함하지 않도록 합니다.   
예를 들어, 대상이 현재 `x: 0`, `y: 0`이고 모션 path: `{path: [{x: 100, y: 100}, {x: 200, y: 0}, {x: 300, y: 200}]}` 트윈을 수행하면 기본적으로 `{x: 0, y: 0}`을 해당 배열의 시작 부분에 추가하여 현재 위치에서 부드럽게 움직이도록 하지만, 이를 피하고 `x: 100, y: 100`으로 점프하도록 하려면 `fromCurrent: false`를 설정할 수 있습니다: 100으로 점프하도록 설정할 수 있습니다. (3.7.0에 추가됨)


#### relative
**Boolean** - `path`가 배열인 경우에만 적용됩니다.   
`true`면 연속되는 각 값은 이전 값에 상대적인 것으로 해석됩니다. 예를 들어 대상의 x가 100에서 시작하고 경로가 `[{x:5}, {x:10}, {x:-2}]`인 경우 먼저 105로 이동한 다음 115로 이동하고 마지막으로 113에서 끝납니다.


#### type
**String** - `path`가 x/y 속성을 가진 객체의 배열 - 집합 유형인 경우에만 적용됩니다: `type: "cubic"`으로 설정하여 앵커, 제어점 2개, 앵커, 제어점 2개, 앵커 등의 순서로 큐빅 베지어 시퀀스로 해석되도록 하되, 원하는 만큼 반복할 수 있지만 반드시 앵커로 시작하고 앵커로 끝내야 합니다.


#### resolution
**Number** - `path`가 배열인 경우에만 적용됩니다.   
베지어 곡선의 특성으로 인해 시간에 따른 경로에서 개체의 진행을 플로팅하면 제어점의 배치와 경로의 각 연속 세그먼트의 길이에 따라 속도가 빨라지거나 느려지는 것처럼 보일 수 있습니다.   
따라서 MotionPathPlugin은 이러한 차이를 줄이거나 없애는 기술을 구현하는데, 여기에는 해상도가 제어하는 특정 수의 세그먼트를 세분화하는 작업이 포함됩니다.   
숫자가 클수록 시간 리매핑이 더 정확해집니다. 하지만 정밀도를 높이기 위해 지불해야 하는 처리 비용이 있습니다. 기본값인 12는 일반적으로 완벽하지만, 경로에서 약간의 속도 변화를 발견하면 해상도 값을 높일 수 있습니다. 또는 속도를 우선시하고 싶다면 숫자를 줄일 수 있습니다.


#### useRadians
**Boolean** - `true`이면 회전으로 전달되는 값에 도 대신 라디안을 사용합니다.   
이 옵션은 Pixi.js와 같이 기본적으로 라디안을 사용하는 다른 스크립트나 라이브러리로 작업할 때 특히 유용합니다. 기본값은 false입니다.


### Demo

````js
gsap.to("#div", {
  motionPath: {
    path: "#path",
    align: "#path",
    alignOrigin: [0.5, 0.5],
    autoRotate: true,
  },
  transformOrigin: "50% 50%",
  duration: 5,
  ease: "power1.inOut",
});
````

<iframe height="300" style="width: 100%;" scrolling="no" title="MotionPathPlugin Demo" src="https://codepen.io/GreenSock/embed/LwzMKL?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/GreenSock/pen/LwzMKL">
  MotionPathPlugin Demo</a> by GSAP (<a href="https://codepen.io/GreenSock">@GreenSock</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>


**MotionPath Showcase**   
<https://codepen.io/collection/AyMQkq>


**MotionPath How-To Demos**   
<https://codepen.io/collection/DYRzxd>



## getter, setter
getter-setter 메서드를 사용하면 애니메이션에서 값을 가져오거나 값을 설정할 수 있다.

- **getter**
  - `paused()`: 일시 정시 여부 리턴
  - `reversed()`: 역방향 여부 리턴
  - `timeScale()`: 배속 값 리턴
  - `time()`: 애니메이션 재생 시간 리턴
  - `progress()`: 애니메이션 재생 시간 리턴

- **setter**
  - `paused(true)`: 일시정지
  - `reversed(true)`: 역방향 재생
  - `timeScale(2)`: 2배속
  - `time(2)`: 2초로 점프
  - `progress(1)`: 완료 시점으로 점프

<br>

- `time()`은 duration값에 비례한 재생 시간을 리턴한다.
- `progress()`는 0~1 사이의 값을 재생 시간으로 리턴한다.

<br>

**setter** 애니메이션의 재생 헤드를 3초로 점프 시킨다.

````js
animation.time(3);
````

**getter** 애니메이션의 현재 시간을 리턴한다.

````js
animation.time();
````

````js
animation.pause();	// 애니메이션 일시 정지 메서드
console.log(animation.paused());	// 애니메이션 일시정지 get/set 메서드

animation.progress(0.5).pause();	// set progress -> method chain
console.log(animation.progress());	// get

animation.time(3);			// sets time to 3 seconds
animation.duration(1);		// sets duration to 5 seconds
animation.timeScale(2);		// makes animation play 2x as fast
animation.reversed(true);	// set the reversed state
````


## Practice

<iframe height="300" style="width: 100%;" scrolling="no" title="GSAP3-MotionPath" src="https://codepen.io/Miok-Song-miok/embed/xxerQQE?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/Miok-Song-miok/pen/xxerQQE">
  GSAP3-MotionPath</a> by Miok Song (miok) (<a href="https://codepen.io/Miok-Song-miok">@Miok-Song-miok</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### 트윈 진행률 가져오기

````js
const animation = gsap.to(tiger, {
  duration: 6,
  motionPath: {
    path: route,
    align: tiger,
    alignOrigin: [0.5, 0.5]
  }
});

// animation의 재생위치를 22%위치로 2초의 시간 만큼 움직여라
gsap.to( animation, { progress: 0.22, duration: 2 });
````

## Practice2

<iframe height="300" style="width: 100%;" scrolling="no" title="GSAP3-MotionPath2" src="https://codepen.io/Miok-Song-miok/embed/jORLrNz?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/Miok-Song-miok/pen/jORLrNz">
  GSAP3-MotionPath2</a> by Miok Song (miok) (<a href="https://codepen.io/Miok-Song-miok">@Miok-Song-miok</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>


### SVG의 길이

````js
$('#medi .path').getTotalLength();
````

### 모션이 없는 셋팅

````js
gsap.set('#medi .pick', { opacity: 0 });
````

### GSAP의 속성 값에는 식이 들어갈 수 있다.

````js
gsap.to(map, { x: 0, y: 0, scale: 1, duration: isScale ? 2 : 0 });
````

----

<br>

##### 참고

- [MotionPath \| GSAP \| Docs & Learning](https://gsap.com/docs/v3/Plugins/MotionPathPlugin/)

