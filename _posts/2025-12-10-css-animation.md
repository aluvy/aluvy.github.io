---
title: "[CSS] CSS3 animation"
date: 2025-12-10 21:22:00 +0900
categories: [CSS, animation]
tags: [css, animation]
render_with_liquid: false
math: true
mermaid: true
---

## CSS3 animation

CSS의 속성을 이용하여 애니메이션을 표현할 수 있다.

CSS3 애니메이션은 엘리먼트에 적용되는 CSS 스타일을 다른 CSS 스타일로 부드럽게 전환시켜준다.

애니메이션은 애니메이션을 나타내는 CSS 스타일과 애니메이션의 중간 상태를 나타내는 키프레임들로 이루어진다.

### 장점

CSS 애니메이션은 기존에 사용되던 스크립트를 이용한 애니메이션보다 다음 세가지 이유에서 이점을 가집니다.

1. 자바스크립트를 모르더라도 간단하게 애니메이션을 만들 수 있다.
2. 자바스크립으를 이용한 애니메이션은 잘 만들어졌더라도 성능이 좋지 못했다. CSS 애니메이션은 frame-skipping 같은 여러 기술을 이용하여 최대한 부드럽게 렌더링된다.
3. 브라우저는 애니메이션의 성능을 효율적으로 최적화 할 수 있다. 예를 들어 현재 안보이는 엘리먼트에 대한 애니메이션은 업데이트 주기를 줄여 부하를 최소화 할 수 있다.

## animation 속성

CSS 애니메이션을 만들려면 animation 속성과 속성의 하위 속성을 지정한다. 애니메이션의 총 시간과 반복 여부 등을 지정할 수 있다. 애니메이션의 중간 상태는 @keyframes 규칙을 이용하여 기술한다.

| 속성                      | 설명                                                       |
| :------------------------ | :--------------------------------------------------------- |
| animation-name            | 설정된 keyframe의 이름                                     |
| animation-delay           | 실행 전 지연 시간                                          |
| animation-duration        | 1회의 실행 시간                                            |
| animation-iteration-count | 반복 횟수 ( infinite : 반복 )                              |
| animation-timing-function | 속도 형태 ( linear, ease, ease-in, ease-out, ease-in-out ) |
| animation-direction       | 반복 형태 ( alternate : 역방향 )                           |

````css
@keyframes 애니메이션이름 {
  from {
    초기상태 속성값
  }
  키프레임위치 % {
    키프레임 위치에서의 속성값
  }
  to {
    종료상태 속성값
  }
}
````

## animation 예제

````css
#exampleSub img{ border:5px solid green;}

@keyframes animationSample{
  from{
  	opacity:1.0;
  	transform:rotate(0deg);
  }
  30% {
  	border:5px solid red;
  }
  50% {
  	opacity:0.1;
  }
  70% {
  	border:5px solid blue;
  }
  to {
  	opacity:1.0;
  	transform:rotate(360deg);
  }
}

#exampleSub img{
  animation-name: animationSample; /* animation 이름 */
  animation-delay: 2s;  /* 실행 전 지연시간 2초 */
  animation-duration: 4s;  /* 1회의 실행 시간 */
  animation-iteration-count: infinite;  /* 반복횟수 */
  animation-timing-function: ease-in-out;  /* 속도의 형태 */
  animation-direction: alternate;  /* 반복 형태 */
}
````
