---
title: "[GSAP] callback, eventCallback"
date: 2024-05-28 15:00:00 +0900
categories: [JavaScript, GSAP]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## callback, eventCallback
`onComplete`, `onUpdate`, `onStart`, `onRepeat` 의 이벤트 콜백을 가져오거나 설정한다.

````js
eventCallback(type:String, callback:Function, params:Array)
````

### Parameters

- **type: String**
  - 이벤트 콜백 유형은 "`onComplete`", "`onUpdate`", "`onStart`", "`onRepeat`" 이며, 대소문자를 구분한다.

- **callback: Function**
  - default: `null`
  - 이벤트가 발생했을 때 호출되는 함수

- **params: Array**
  - default: `null`
  - 콜백 함수에 전달하기 위한 매개변수 배열



### Returns: [Function \| self]

- **getter**
  - 첫 번째 매개변수를 제외하고 모두 생략하면 현재 값(getter)이 반환된다.

- **setter**
  - 첫 번째 매개변수보다 더 많이 정의하면 콜백(setter)이 설정되고 인스턴스 자체를 반환한다.


### Syntax
#### 애니메이션 내부에서 callback 사용하기

````js
gsap.to(obj, {
  duration: 1,
  x: 100,
  onComplete: myFunction,
  onCompleteParams: ["param1", "param2"],
});
````


#### 애니메이션 외부에서 callback 사용하기

````js
myAnimation.eventCallback("onComplete", myFunction, ["param1", "param2"]);
````

애니메이션 외부에서 callback을 설정하면, 콜백 참조를 검사하거나 삭제할수 있다는 장점이 있다.

````js
// deletes the onUpdate
myAnimation.eventCallback("onUpdate", null);
````

콜백은 각 이벤트 유형 `onComplete`, `onUpdate`, `onStart`, `onRepeat` 하나씩만 설정할 수 있다. 따라서 새 값을 설정하면 이전 값을 덮어쓰게 된다.




## callback 종류
### Tween, Stagger, timeline

- **onComplete()**
  - 애니메이션이 완료되면 호출
  - ~~※ 무한반복 상태에서는 `onComplete` callback을 받을 수 없다.~~
  - `onCompleteParams: Array` - 콜백에 전달 할 파라미터

- **onStart()**
  - 애니메이션이 시작될 때 호출
  - `onStartParams: Array` - 콜백에 전달 할 파라미터

- **onUpdate()**
  - 애니메이션이 업데이트 될 때마다 호출
  - `onUpdateParams: Array` - 콜백에 전달 할 파라미터

- **onRepeat()**
  - 애니메이션이 반복될 때마다 호출
  - `onRepeatParams: Array` - 콜백에 전달 할 파라미터

- **onReverseComplete()**
  - 애니메이션 반전 시 애니메이션이 완료되면 호출
  - `onReverseCompleteParams: Array` - 콜백에 전달 할 파라미터


### Timeline

- **onComplete()**
  - 애니메이션이 완료되면 호출
  - `onCompleteParams: Array` - 콜백에 전달 할 파라미터

- **onInterrupt()**
  - 애니메이션이 중단될 때 호출 (애니메이션이 정상적으로 완료되면 호출하지 않음)
  - `onInterruptParams: Array` - 콜백에 전달 할 파라미터

- **onRepeat()**
  - 애니메이션이 반복될 때마다 호출
  - `onRepeatParams: Array` - 콜백에 전달 할 파라미터

- **onReverseComplete()**
  - 애니메이션이 거꾸로 재생되고 다시 시작점에 도달했을 때 호출
  - `onReverseCompleteParams: Array` - 콜백에 전달 할 파라미터

- **onStart()**
  - 애니메이션이 시작될 때 호출
  - `onStartParams: Array` - 콜백에 전달 할 파라미터

- **onUpdate()**
  - 애니메이션이 업데이트 될 때마다 호출
  - `onUpdateParams: Array` - 콜백에 전달 할 파라미터

### ScrollTrigger

- **onEnter()**
  - 스크롤 위치가 시작점을 지날 때 호출
  - 인스턴스 자체를 하나의 매개변수로 받는다.
  - `onEnter ({ progress, direction, isActive })`

- **onLeave()**
  - 종료점을 지날 때 호출
  - 인스턴스 자체를 하나의 매개변수로 받는다.
  - `onLeave ({ progress, direction, siActive })`

- **onEnterBack()**
  - 스크롤 위치가 종료점을 지나 다시 종료점으로 들어올 때 호출
  - 인스턴스 자체를 하나의 매개변수로 받는다.
  - `onEnterBack ({ progress, direction, isActive })`

- **onLeaveBack()**
  - 스크롤 위치가 종료점을 지나 다시 들어온 후 다시 시작점을 나갈 때 호출
  - 인스턴스 자체를 하나의 매개변수로 받는다.
  - `onLeaveBack ({ progress, direction, isActive })`

- **onToggle()**
  - onEnter, onLeave, onEnterBack, onLeaveBack 콜백들이 호출될 때마다 호출
  - `onToggle ({ self })`

- **onRefresh()**
  - resize 이벤트 발생 시 호출. ScrollTrigger가 모든 위치 지정을 다시 계산한다.
  - `onRefresh ({ progress, direction, isActive })`

- **onUpdate()**
  - 스크롤이 되는 동안 지속적으로 호출
  - ~~※ `scrub`에 숫자를 할당한 경우 스크롤 위치가 멈춘 후에도 관련 애니메이션이 잠시동안 스크러빙 된다는 점 유의~~
  - `onUpdate ( self )`

- **onScrubComplete()**
  - 스크럽이벤트가 완료되었을 때 호출
  - `onScrubComplete ({ progress, direction, isActive })`

- **onSnapComplete()**
  - 스냅 이벤트가 완료되었을 때 호출
  - `onSnapComplete ({ progress, direction, isActive })`


### Draggable

- **onClick()**
  - 요소를 클릭했다가 3px 이상 이동하지 않고 놓았을 때만 호출
  - `onClickParams: Array` - 콜백에 전달 할 파라미터

- **onDrag()**
  - 드래그 하는 동안 호출되는 함수
  - `onDragParams: Array` - 콜백에 전달 할 파라미터

- **onDragEnd()**
  - 드래그 후 마우스를 놓는 즉시 호출되는 함수
  - `onDragEndParams: Array` - 콜백에 전달 할 파라미터

- **onDragStart()**
  - 요소를 클릭했다가 2픽셀 이상 이동하면 즉시 호출
  - `onDragStartParams: Array` - 콜백에 전달 할 파라미터

- **onLockAxis()**
  - 움직임이 수평 또는 수직 축에 고정되자마자 호출하는 함수

- **onMove()**
  - 드래그 하는 동안 마우스가 움직일 때마다 호출되는 함수

- **onPress()**
  - 요소를 누르는 즉시 호출되는 함수
  - `onPressParams: Array` - 콜백에 전달 할 파라미터

- **onPressInit()**
  - 시작 값이 기록되기 전에 호출되는 함수

- **onRelease()**
  - 드래그 여부와 관계없이 요소를 누른 후 마우스를 놓는 즉시 호출
  - `onReleaseParams: Array` - 콜백에 전달 할 파라미터


---

<br>

##### 참고

- [Callback](https://gsap.com/resources/getting-started/control/)
- [Tween](https://gsap.com/docs/v3/GSAP/Tween/eventCallback()/)
- [Stagger](https://gsap.com/resources/getting-started/Staggers/)
- [Timeline](https://gsap.com/resources/getting-started/Staggers/#repeat--yoyo--callbacks)
- [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/?page=1)
