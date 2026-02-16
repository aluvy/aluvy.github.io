---
title: "[GSAP] eventCallback"
date: 2024-03-22 21:52:00 +0900
categories: [JavaScript, GSAP]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

GSAP의 강력한 기능은 애니메이션의 콜백 처리다.   
콜백의 종류, 매개변수, 범위에 대해서 알아본다.

## eventCallback
콜백 함수에는 this바인딩 때문에 concise method를 사용하는 것이 좋다.

````js
gsap.to('.orange', {
  duration: 2.5,
  y: 100,
  
  // 애니메이션이 완료된 시점에 호출된다.
  onComplete() { },		// concise method
  onComplete: complete,
  
  onUpdate() {},
  onStart() {},
  onReverseComplete() {},
  onInterrupt() {},
  onRepeat() {},
})
````


### Details

- `onComplete`:	애니메이션이 완료 된 시점에 호출
- `onUpdate`:	애니메이션이 재생되는 동안 지속적으로 호출
- `onStart`:	애니메이션이 처음 시작될 때 딱 1번 호출
- `onReverseComplete`:	 
- `onInterrupt`:	 
- `onRepeat`:	애니메이션이 반복될 때마다 호출


<iframe height="300" style="width: 100%;" scrolling="no" title="GSAP - eventCallback" src="https://codepen.io/Miok-Song-miok/embed/qBwXqLz?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/Miok-Song-miok/pen/qBwXqLz">
  GSAP - eventCallback</a> by Miok Song (miok) (<a href="https://codepen.io/Miok-Song-miok">@Miok-Song-miok</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>


### 콜백에 매개변수 전달

#### onCompleteParams: Array

````js
gsap.to('.orange', {
  duration: 2.5,
  y: 100,
  
  // X잘못된 사용X: 애니메이션 완료 시점이 아니라 처음에 호출된다.
  onComplete: complete('오렌지'),
  
  // GSAP callback 함수에 파라미터 전달 방법
  onComplete: complete,
  onCompleteParams: ['오렌지', 3],	// 배열로 전달해야 한다.
})

function complete(color, number) {
  h1.textContent = `${color + number} 애니메이션 재생 끝`;
}
````

함수는 onComplete가 실행시키고, 파라미터의 전달은 onCompleteParams를 이용한다.   
onCompleteParams가 배열로 전달되는 이유: `apply(this, [1,2,3])`   
참고: <https://ooo-k.tistory.com/401>

#### 함수의 종류와 this 바인딩

````js
const user = {
  name: 'tiger',
  age: '33',
  
  // 일반 함수 (생성자 함수 내장)
  sayHi: function() {
    console.log(this);	// user
  },
  
  // 화살표 함수 (생성자 함수 constructure 내장X)
  sayBye: () => {
    console.log(this);	// window (화살표 함수는 this를 가지지 않고 부모를 참조한다)
  },
  
  // concise method (concise: 간결한, 축약형)
  // 생성자 함수 constructure 내장X, 하지만 this바인딩 가능
  sayGood() {
    console.log(this);	// user
  }
}
````



### 콜백에서 this 바인딩 - 일반함수

#### this.targets()
일반 함수에서 this는 tween 자신을 가리키며,   
그 내부에 targets() 함수로 해당 엘리먼트에 접근할 수 있다.

````js
gsap.to('.orange', {
  duration: 2.5,
  y: 100,
  onComplete: complete,
  onCompleteParams: ['오렌지', 3],
})

function complete(color, number) {
  console.log(this);	// tween을 참조한다.
  console.log(this.targets());	// 배열 [div.orange]
  console.log(this.targets()[0]);	// .orange Element
  
  hi.textContent = `${color} 애니메이션 재생 끝`;
  gsap.to(this.targets()[0], { rotate: 360 })
}
````


### 콜백에서 this 바인딩 - class

````js
class Tiger {
  constructor(target, name) {
    this.animation = gsap.to(target, {
      x: 100,
      onComplete: this.complete,
      callbackScope: this, //
    });
    this.animation.pause();
    this.name = name;
  }

  start() {
    this.animation.play();
  }

  complete() {
    console.log(this);
    // 여기서 this는 Tiger가 아닌 Tween 이 나온다.
    // callbackScope: this 를 설정해 주면 Tiger가 this에 바인딩 된다.
    this.render();
  }
  
  render() {
    $('h1').textContent = `${this.name} 애니메이션 재생 끝`;
  }
}

const pink = new Tiger('.pink', '핑핑이');
const blue = new Tiger('.blue', '파랑이');
const green = new Tiger('.green', '초록이');
````


#### callbackScope: this

class에서 this는 class 자신을 바인딩하지만,   
class 내에 있는 트윈에서 콜백함수의 this는 트윈 자신을 반환한다.   
class를 반환하게 하기 위해서는 `callbackScope: this` 속성을 추가한다.


### class 활용 - instance method & static method

- **instance method**: 생성자 함수를 통해 생성된 객체만 사용할 수 있음
- **static method**: 객체 생성 없이 사용할 수 있는 유틸 메서드


````js
class Tiger {
  // static method : 객체 생성 없이 사용할 수 있는 유틸 메서드
  static moveX(target, distance) {
    gsap.to(target, { x: distance });
  }

  constructor(target, name) {
    this.animation = gsap.to(target, {
      x: 100,
      onComplete: this.complete,
      callbackScope: this, //
    });
    this.animation.pause();
    this.name = name;
  }

  // instance method : 객체 생성으로만 사용할 수 있는 메서드
  start() {
    this.animation.play();
  }
}

Tiger.moveX('.orange', 300);	// 사용 가능
Tiger.render();	// 사용 불가능
````
