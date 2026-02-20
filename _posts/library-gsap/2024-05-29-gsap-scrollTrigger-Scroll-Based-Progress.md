---
title: "[GSAP] ScrollTrigger: Scroll based Progress"
date: 2024-05-29 14:02:00 +0900
categories: [Library, GSAP]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## Scroll based Progress
스크롤 기반의 진행률을 나타낼 수 있는 다양한 애니메이션을 구현합니다.

### Progress Bar
CSS scale 값 0 ~ 1 을 이용해서 progress bar를 구현합니다.

````js
const progress = document.querySelector('.progress');
const percent = document.querySelector('.percent span');

ScrollTrigger.create({
  trigger: '.progressHolder',
  start: `top ${document.querySelector('.section01').offsetHeight - document.querySelector('.progressHolder').offsetHeight}`,
  endTrigger: '.section03',
  end: 'bottom bottom', // endTrigger인 section03의 bottom이 된다.
  pin: true,
  animation: gsap.to(progress, { scaleX: 1, ease: 'none' }),
  onUpdate({ progress }) {
    percent.textContent = Math.round(progress * 100);
  },
  scrub: true,
  id: 'pro', // ScrollTrigger.getById('pro') 을 콘솔에 찍어보면 pro ScrollTrigger 값 확인 가능
});
````

### SVG Progress Bar
SVG를 이용한 Progress Bar를 구현할 때에는 SVG 라인의 총 길이를 알아야 합니다.   
SVG 라인의 총 길이 값을 SVG의 `strokeDashoffset` 과 `strokeDasharray`에 할당하고, 스크롤이 진행됨에 따라 `strokeDashoffset`의 값을 0으로 만들어주면 SVG라인이 그려지는 효과를 낼 수 있습니다.

`SVG.getTotalLength()` 함수는 SVG의 총 길이를 반환해줍니다.

````js
const circle = document.querySelector('.circleContainer circle');
const circleLenth = circle.getTotalLength() + 1; // SVG 길이값에 1 정도 더해준다.

const rect = document.querySelector('.rectContainer rect');
const rectLength = rect.getTotalLength() + 1;

gsap.set(rect, { strokeDashoffset: rectLength, strokeDasharray: rectLength });
gsap.set(circle, { strokeDashoffset: circleLenth, strokeDasharray: circleLenth });


const progressSVG = gsap.timeline({
  defaults: { strokeDashoffset: 0, duration: 2, ease: 'none' },
})
  .to(circle, {})
  .to(rect, {}, '<');

ScrollTrigger.create({
  trigger: '.scroll-content', // document 전체에 대한 progress
  start: 'top top',
  end: 'bottom bottom',
  animation: progressSVG,
  scrub: true,
});
````


#### SVG 선의 총 길이를 구하는 함수
자주 사용되는 SVG의 총 길이를 구하고 `strokeDashoffset`과 `strokeDasharray` 값을 세팅하는 부분을 함수로 처리하면, 조금 더 효율적인 코드가 될 수 있습니다.

````js
function drawSVG(target) {

  // target이 string이 아닐 때 에러처리
  if ( typeof target !== 'string') throw new TypeError('drawSVG 함수에 전달된 인수는 string 타입이어야 합니다.');

  let pathLength;
  
  // target에 , 가 있을 경우 배열로 처리
  if ( target.includes(",") ) {
    const arr = target.split(",").map((a, i)=>{
      pathLength = document.querySelector(a).getTotalLength();
      gsap.set(a, {
        strokeDashoffset: pathLength,
        strokeDasharray: pathLength,
      });
      return pathLength;
    })
    
    return arr
  }

  pathLength = document.querySelector(target).getTotalLength();  // svg 선의 총 길이
  gsap.set(target, {
    strokeDashoffset: pathLength,
    strokeDasharray: pathLength,
  });
  return pathLength;
}

drawSVG(".circleContainer circle, .rectContainer rect");	// 배열로 전달
````

### GSAP Plugin: drawSVG
GSAP의 유료 플러그인인 drawSVG을 사용하면 **SVG의 총 길이 계산이나 strokeDashoffset, strokeDasharray 값 세팅 없이** 간단하게 구현할 수 있습니다.

````js
const circle = document.querySelector('.circleContainer circle');
const rect = document.querySelector('.rectContainer rect');

const progressSVG = gsap
  .timeline({ defaults: { drawSVG: 0, ease: 'none' } })		// drawSVG: 0 값만으로 구현
  .from(circle, {})
  .from(rect, {}, '<');

ScrollTrigger.create({
  trigger: '.scroll-content', // 전체에 대한 progress
  start: 'top top',
  end: 'bottom bottom',
  animation: progressSVG,
  scrub: true,
});
````

---

<br>

##### 참고

- [Progress](https://aluvy.github.io/gsap/demo/scrolltrigger-scrollbasedprogress/)
