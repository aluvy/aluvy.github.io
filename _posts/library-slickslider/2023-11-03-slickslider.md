---
title: "slick slider"
date: 2023-11-03 14:05:00 +0900
categories: [Library, slick slider]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## Settings

````javascript
$('.slider-items').slick({
  rows: 1,                    //이미지를 몇 줄로 표시할지 개수
  dots: false,                //슬라이더 아래에 도트 네비게이션 버튼 표시 여부(true or false) ▶기본값 false
  appendDots: $('selector'),  //네비게이션 버튼 변경
  dotsClass: 'custom-dots',   //네비게이션 버튼 클래스 변경
  infinite: true,             //무한반복(true or false) 기본값 true
  slidesToShow: 4,            //한번에 보여줄 슬라이드 아이템 개수
  slidesToScroll: 4,          //한번에 넘길 슬라이드 아이템 개수
  slidesPerRow: 1,            //보여질 행의 수 (한 줄, 두 줄 ... )
  autoplay: true,             //슬라이드 자동 시작(true or false) ▶기본값 false
  autoplaySpeed: 2000,        //슬라이드 자동 넘기기 시간(1000ms = 1초) 곧, 슬라이드 하나당 머무는 시간
  variableWidth: true,        //사진마다 width의 크기가 다른가?(true or false) ▶기본값 false
  draggable: false,           //슬라이드 드래그 가능여부 (true or false) ▶기본값 true
  arrows: true,               //이전 다음 버튼 표시 여부(true or false) ▶기본값 true
  pauseOnFocus: true,         //마우스 클릭 시 슬라이드 멈춤 ▶기본값 true
  pauseOnHover: true,         //마우스 호버 시 슬라이드 멈춤 ▶기본값 true
  pauseOnDotsHover: true,     //네이게이션버튼 호버 시 슬라이드 멈춤 ▶기본값 false
  vertical: true,             //세로 방향 여부(true or false) ▶기본값 false
  verticalSwiping: true,      //세로 방향 스와이프 여부(true or false) ▶기본값 false
  accessibility: true,        //접근성 여부(true or false) 기본값 false
  appendArrows: $('#arrows'), //좌우 화살표 변경
  prevArrow: $('#prevArrow'), //이전 화살표만 변경
  nextArrow: $('#nextArrow'), //다음 화살표만 변경
  initialSlide: 1,            //처음 보여질 슬라이드 번호 ▶기본값 0
  centerMode: true,           //중앙에 슬라이드가 보여지는 모드 ▶기본값 false
  centerPadding: '70px',      //중앙에 슬라이드가 보여지는 모드에서 패딩 값
  fade: true,                 //크로스페이드 모션 사용 여부 ▶기본값 false
  speed: 2000,                //모션 시간 (얼마나 빠른속도로 넘어가는지)(1000ms = 1초) 곧, 슬라이드 사이에 넘어가는 속도
  waitForAnimate: true,       //애니메이션 중에는 동작을 제한함 ▶기본값 true 
  // ▼ 반응형 브레이크포인트 옵션
  // breakpoint: 숫자를 제작자의 환경에 맞게 조정함 ex) breakpoint: 1280
  // 각 브레이크포인트 내에 settings 안에 위의 모든 옵션을 다르게 적용할 수 있음
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});
````

- **accessibility**
  - type: boolean
  - default: true
  - 탭 및 화살표 키의 탐색을 활성화 한다.
    - autoplay: false일 경우, 슬라이드가 변경된 후에는 현재 슬라이드에 초정믈 맞춥니다.(여러개의 slideToShow 인 경우, 첫번째 슬라이드)
    - 완벽한 접근성 준수를 위해 focusOnChange를 활성화한다.

- **adaptiveHeigh**
  - type: boolean
  - default: false
  - 슬라이드마다 슬라이더의 높이가 바뀐다.

- **appendArrows**
  - type: string
  - default: $(element)
  - 화살표 element 변경   
    (Selector, htmlString, Array, Element, jQuery object)

- **appendDots**
  - type: string
  - default: $(element)
  - 페이징(dot) element 변경   
    (Selector, htmlString, Array, Element, jQuery object)

- **arrows**
  - type: boolean
  - default: true
  - Next / Prev 버튼 활성화

- **asNavFor**
  - type: string
  - default: $(element)
  - **여러 슬라이드 동기화 가능.**   
    슬라이드 2개이상 쓸 때 사용.

- **autoplay**
  - type: boolean
  - default: false
  - autoplay 활성화

- **autoplaySpeed**
  - type: int
  - default: 3000
  - autoplay 속도 변경

- **centerMode**
  - type: boolean
  - default: false
  - **앞 뒤 슬라이드를 부분적으로 포함하여 슬라이드를 가운데 표시한다.**   
    slidesToShow를 함께 지정하고 값은 홀수로 지정한다.

- **centerpadding**
  - type: string
  - default: '50px'
  - centerMode일 때 양옆의 padding 지정 (px, %)

- **cssEase**
  - type: string
  - default: 'ease'
  - **CSS3 easing** (ease, ease-in, linear)

- **customPaging**
  - type: function
  - default: n/a
  - 페이징(dot) 을 커스텀 한다 (dots: true 필요)

- **dots**
  - type: boolean
  - default: false
  - 페이징(dot) 활성화

- **dotsClass**
  - type: string
  - default: 'slick-dots'
  - 페이징(dot) 클래스 지정

- **draggable**
  - type: boolean
  - default: true
  - PC에서 드래그 활성화

- **easing**
  - type: string
  - default: 'linear'
  - jQuery animate() easing 사용

- **edgeFriction**
  - type: integer
  - default: 0.15
  - 넘겨질 슬라이드가 없을 때 저항값 지정 (overscroll 값 지정)

- **fade**
  - type: boolean
  - default: false
  - fade 활성화

- **focusOnSelect**
  - type: boolean
  - default: false
  - 클릭하여 선택한 슬라이드에 focus를 맞춥니다.   
    (focus 되면 왼쪽 가장자리로 슬라이드 이동)

- **focusOnChange**
  - type: boolean
  - default: false
  - 화살표 등으로 슬라이드가 이동할 때 슬라이드를 focus 한다.   
    (왼쪽 가장자리의 슬라이드가 focus 됨)

- **infinite**
  - type: boolean
  - default: false
  - 무한 루프 활성화

- **initialSlide**
  - type: integer
  - default: 0
  - 처음 보여질 슬라이드 지정

- **lazyLoad**
  - type: string
  - default: 'ondemand'
  - **'ondemand' or 'progressive'**
    - ondemand : 슬라이드를 넘긴 후에 이미지 로드
    - progressive : 페이지가 로드된 후 이미지 로드

- **mobileFirst**
  - type: boolean
  - default: false
  - responsive settings에서 모바일 사이즈를 설정하여 mobile일 때 사용가능하게 한다.   
    breakpoint를 기준으로 mobileFirst: false은 창 너비(설정에 따라 슬라이드 너비)가 breakpoint보다 작은지 여부를 결정, mobileFirst: true는 창 너비가 breakpoint보다 큰지 여부를 결정.

- **nextArrow**
  - type: string (html \| jQuery selector) \| object (DOM node \| jQuery object)
  - default: html
  - **Next 화살표를 node나 HTML로 변경**
    - nextArrow: `<button type="button" class="slick-next">Next</button>`

- **pauseOnDotsHover**
  - type: boolean
  - default: false
  - 페이징(dot) hover 시 autoplay 정지

- **pauseOnFocus**
  - type: boolean
  - default: true
  - 슬라이드 포커스 시 autoplay 정지

- **pauseOnHover**
  - type: boolean
  - default: true
  - 슬라이더 hover 시 autoplay 정지

- **prevArrow**
  - type: string (html \| jQuery selector) \| object (DOM node \| jQuery object)
  - default: html
  - **Prev 화살표를 node나 HTML로 변경.**
    - prevArrow: `<button type="button" class="slick-prev">Previous</button>`

- **respondTo**
  - type: string
  - default: 'window'
  - **breakpoint의 기준으로 객체를 지정.**

- **responsive**
  - type: object
  - default: none
  - 반응형 크기에 따른 재설정이 가능.
    - `breakpoint`로 화면 크기를 설정해주며, slick을 사용하지 않으면 마지막에 `unslick` 해준다.

- **rows**
  - type: int
  - default: 1
  - slidePerRow를 넣어, 행에 슬라이드 수를 정한다.

- **rtl**
  - type: boolean
  - default: false
  - 슬라이더의 방향을 오른쪽에서 왼쪽으로 변경.

- **slide**
  - type: string
  - default: ''
  - 슬라이드로 사용할 요소에 대한 쿼리를 지정

- **slidesPerRow**
  - type: int
  - default: 1
  - 각 행에 슬라이드가 추가 여부.

- **slidesToScroll**
  - type: int
  - default: 1
  - 슬라이드 될 때 스크롤되는 슬라이드 수 지정

- **slidesToShow**
  - type: int
  - default: 1
  - 한번에 표시할 슬라이드 수 지정

- **speed**
  - type: int
  - default: 300
  - 슬라이드 움직이는 속도

- **swipe**
  - type: boolean
  - default: true
  - 스와이프 사용여부

- **swipeToSlide**
  - type: boolean
  - default: false
  - slidesToScroll에 관계없이 스와이프로 슬라이드

- **touchMove**
  - type: boolean
  - default: true
  - 터치 조작으로 슬라이드 활성화

- **touchThreshold**
  - type: int
  - default: 5
  - 스와이프로 슬라이드를 이동하는데 필요한 거리를 지정

- **useCSS**
  - type: boolean
  - default: true
  - CSS transition 활성화

- **useTransform**
  - type: boolean
  - default: true
  - CSS Transforms 활성화

- **variableWidth**
  - type: boolean
  - default: false
  - 슬라이드 너비 자동계산을 비활성화.   
    true일 경우, 활성화되어 자동으로 맞춘 슬라이드 너비가 해제된다.

- **vertical**
  - type: boolean
  - default: false
  - 슬라이드를 수직 방향으로 넘긴다.

- **verticalWidth**
  - type: boolean
  - default: false
  - 수평인 스와이프 방향을 변경.   
    true면 세로로 변경.

- **waitForAnimate**
  - type: boolean
  - default: true
  - 애니메이션 중 슬라이드 이동 요청 무시.

- **zIndex**
  - type: number
  - default: 1000
  - 슬라이드의 z-index를 설정할 수 있다.


### asNavFor

슬라이더를 다른 슬라이더의 네비게이션으로 설정합니다. (클래스 또는 ID를 지정할 수 있습니다.)
- [demo](https://tr.you84815.space/slick/settings/asNavFor.html)

````javascript
$(document).ready(function(){
  $('.slider').slick({
    asNavFor: '.slider-nav'
    arrows: false,
  });
  $('.slider-nav').slick({
    asNavFor: '.slider',
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    slide: 'p'
  });
});
````

### customPaging

페이징을 커스텀한다.
- [demo](https://tr.you84815.space/slick/settings/customPaging.html)

````javascript
$('.slider').slick({
  customPaging: function(slider, i) {
    return $('<span>').text(i + 1);
  },
  dots: true,
});
````




## Events

slick 1.4에서는 콜백 메소드가 더 이상 사용되지 않으며 이벤트로 대체되었다. 아래와 같이 초기화전에 사용한다.

````javascript
// On swipe event
$('.your-element').on('swipe', function(event, slick, direction){
  console.log(direction);
  // left
});

// On edge hit
$('.your-element').on('edge', function(event, slick, direction){
  console.log('edge was hit')
});

// On before slide change
$('.your-element').on('beforeChange', function(event, slick, currentSlide, nextSlide){
  console.log(nextSlide);
});
````

- **afterChange**
  - 슬라이드 이동 후 이벤트 시작

- **beforeChange**
  - 슬라이드 이동 전 이벤트 시작

- **breakpoint**
  - **반응형 설정 중에 breakpoint에 도달하면 발생하는 이벤트**
  - breakpoint에서 지정한 너비에 해당 이벤트가 발생한다.

- **destroy**
  - 슬라이드가 삭제(destoryed)되거나 풀릴 때(unslicked) 발생하는 이벤트

- **edge**
  - **non-infinite(무한대) 일 때, 가장자리가 오버 스크롤 될 때 발생**
  - 마지막 슬라이드에서 우너하는 이벤트를 발생시킨다.

- **init**
  - **slick이 초기화 될 때 발생.**
  - 슬라이더가 초기화되기 전에 이벤트를 정의해야 한다.

- **reInit**
  - 초기화될 때마다 slick이 발생

- **setPosition**
  - **위치가 다시 계산 될때마다 발생**
  - 슬라이드가 초기화될 때마다 슬라이드 재 초기화 이벤트 발생

- **swipe**
  - **swipe 하거나 드래그 한 후 이벤트 발생**
  - 슬라이드를 swipe하면 어느방향으로 이동했는지 알 수 있다.

- **lazyLoaded**
  - **이미지가 느리게 로드된 후 발생**
  - lazyLoad 세팅을 발생시킬 때 사용 가능. 현재 슬라이드의 이미지 소스를 알 수 있다.

- **lazyLoadError**
  - 이미지 로드에 실패한 후 이벤트가 발생


### afterChange
슬라이드가 이동한 후 발생하는 이벤트
- [demo](https://tr.you84815.space/slick/events/afterChange.html)

````javascript
$('.slider').on('afterChange', function(event, slick, currentSlide){ ... });
````

### beforeChange
슬라이드가 이동하기 전에 발생하는 이벤트
- [demo](https://tr.you84815.space/slick/events/beforeChange.html)

````javascript
$('.slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){ ... });
````

### breakpoint
반응형 설정시의 브레이크 포인트에 도달했을 때 발생하는 이벤트
- [demo](https://tr.you84815.space/slick/events/breakpoint.html)

````javascript
$('.slider').on('breakpoint', function(event, slick, breakpoint){ ... });
````

### destroy
슬라이드가 파기되거나 unslicked 발생했을 때 발생하는 이벤트
- [demo](https://tr.you84815.space/slick/events/destroy.html)

````javascript
$('.slider').on('destroy', function(event, slick){ ... });
````

### edge
맨 끝 슬라이드에서 이동하려고 한 후에 발생하는 이벤트
- [demo](https://tr.you84815.space/slick/events/edge.html)

````javascript
$('.slider').on('edge', function(event, slick, direction){ ... });
````

### init
slick을 초기화할 때 발생. 이 이벤트는 슬라이더를 초기화하기 전에 정의해야 함
- [demo](https://tr.you84815.space/slick/events/init.html)

````javascript
$('.slider').on('init', function(event, slick){ ... });
````

### lazyLoaded
이미지를 지연 로드한 후 발생하는 이벤트
- [demo](https://tr.you84815.space/slick/events/lazyLoaded.html)

````javascript
$('.slider').on('lazyLoaded', function(event, slick, image, imageSource){ ... });
````

### lazyLoadError
이미지를 로드하지 못한 후에 발생하는 이벤트
- [demo](https://tr.you84815.space/slick/events/lazyLoadError.html)

````javascript
$('.slider').on('lazyLoadError', function(event, slick, image, imageSource){ ... });
````

### reInit
slick을 (재) 초기화 할 때마다 발생하는 이벤트
- [demo](https://tr.you84815.space/slick/events/reInit.html)

````javascript
$('.slider').on('reInit', function(event, slick){ ... });
````

### setPosition
slick의 위치를 ​​다시 계산할 때마다 발생하는 이벤트
- [demo](https://tr.you84815.space/slick/events/setPosition.html)

````javascript
$('.slider').on('setPosition', function(event, slick){ ... });
````

### swipe
스와이프하거나 드래그한 후 발생하는 이벤트
- [demo](https://tr.you84815.space/slick/events/swipe.html)

````javascript
$('.slider').on('swipe', function(event, slick, direction){ ... });
````





## methods

slick 1.4에서는 slick instance 자체에서 메서드가 호출된다.

````javascript
// Add a slide
$('.your-element').slick('slickAdd',"<div></div>");

// Get the current slide
var currentSlide = $('.your-element').slick('slickCurrentSlide');
````

새로운 구문(syntax)를 통해 slick 내부의 메소드를 호출 할 수 있다.

````javascript
// Manually refresh positioning of slick
$('.your-element').slick('setPosition');
````

````javascript
// slider 제거하기
$('#slider-div').slick("unslick")


// slider에 새로운 아이템 추가하기
$('#slider-div').slick('slickAdd',"<div>새로운 아이템</div>");


// slider에 있는 아이템 삭제하기
$('#slider-div').slick('slickRemove',0);	//특정 인덱스 번호에 있는 slider 삭제
$('#slider-div').slick('slickRemove',false);	//false이면 맨 마지막 슬라이더 삭제
$('#slider-div').slick('slickRemove',true);	// true이면 맨 앞 슬라이더 삭제


// 현재 보여지는 슬라이더가 몇번째 슬라이더인지 확인하기
$('#slider-div').slick('slickCurrentSlide');   // 가장 첫번째에 있는 슬라이드는 0번이다.


// 자동 슬라이드 넘기기 정지 / 시작
$('#slider-div').slick('slickPause');   // 정지
$('#slider-div').slick('slickPlay');    // 시작


// 원하는 슬라이드로 이동
$('#slider-div').slick('goTo', 1);    // slick('goTo', index ) index는 0부터 시작이다.
````

- **slick**
  - argument: options: object
  - slick 초기화

- **unslick**
  - slick 삭제

- **slickNext**
  - 다음 슬라이드로 이동

- **slickPrev**
  - 이전 슬라이드로 이동

- **slickPause**
  - autoplay 정지

- **slickPlay**
  - autoplay 시작 (autoplay option이 true로 설정됨)

- **slickGoTo**
  - argument: index: int, dotAnimation: bool
  - index로 지정된 슬라이드로 이동

- **slickCurrentSlide**
  - 현재 슬라이드 index의 값을 알려준다.

- **slickAdd**
  - argument: element: html or DOM object, index: int, addBefore: bool
  - 슬라이드 추가

- **slickRemove**
  - argument: index: int, removeBefore: bool
  - index로 지정된 슬라이드를 제거

- **slickFilter**
  - argument: filter: selector or function
  - jQuery의 .filter구문을 사용하여 필터링한다.

- **slickUnfilter**
  - 적용된 .filter를 해체

- **slickGetOption**
  - argument: option: string(option name)
  - 지정된 option값을 가져온다

- **slickSetOption**
  - argument: option, value, refresh
  - option을 변경하고 refresh는 항상 boolean을 받고 UI를 업데이트한다.   
  지정된 settingOption의 값(value)을 변경. refresh는 선택적이다.

- **??**
  - argument: 'responsive', [{ breakpoint: n, settings: {}, ... }], refresh
  - 설정해놓은 responsive options을 변화시키거나 추가

- **??**
  - argument: {option: value, option: value, ...}, refresh
  - 여러 옵션을 해당 값으로 변경



### slick
slick 초기화
- [demo](https://tr.you84815.space/slick/methods/slick.html)

````javascript
$('.slider').slick({
  dots: true,
  speed: 500
});
````

### unslick
slick 삭제
- [demo](https://tr.you84815.space/slick/methods/unslick.html)

````javascript
$('.slider').slick('unslick');
````

### slickNext
다음 슬라이드로 이동
- [demo](https://tr.you84815.space/slick/methods/slickNext.html)

````javascript
$('.slider').slick('slickNext');
````

### slickPrev
이전 슬라이드로 이동
- [demo](https://tr.you84815.space/slick/methods/slickPrev.html)

````javascript
$('.slider').slick('slickPrev');
````

### slickPause
슬라이드를 멈춥니다.
- [demo](https://tr.you84815.space/slick/methods/slickPause.html)

````javascript
$('.slider').slick('slickPause');
````

### slickPlay
슬라이드 자동 재생을 시작합니다. (autoplay 옵션도 true 됩니다.)
- [demo](https://tr.you84815.space/slick/methods/slickPlay.html)

````javascript
$('.slider').slick('slickPlay');
````

### slickGoTo
index에서 지정한 슬라이드로 이동합니다.   
두 번째 매개변수로 true를 지정하면 이동 애니메이션을 스킵합니다.
- [demo](https://tr.you84815.space/slick/methods/slickGoTo.html)

````javascript
// index : int
// dontAnimate : Boolean
$('.slider').slick('slickGoTo', index, dontAnimate);
$('.slider').slick('slickGoTo', 2, true);
````

### slickCurrentSlide
현재 슬라이드 번호가 표시됩니다
- [demo](https://tr.you84815.space/slick/methods/slickCurrentSlide.html)

````javascript
$('.slider').slick('slickCurrentSlide');
````

### slickAdd
슬라이드를 추가합니다.   
index가 지정되어 있는 경우, 그 인덱스에 추가합니다.   
addBefore가 true면 지정한 index 슬라이드 앞에 추가합니다.   
HTML 문자열을 받습니다.
- [demo](https://tr.you84815.space/slick/methods/slickAdd.html)

````javascript
$('.slider').slick('slickAdd', element, index, addBefore);
$('.slider').slick('slickAdd', '<p>4</p>', 1, true);
````

### slickRemove
index에서 지정한 슬라이드를 삭제합니다.   
index를 지정하지 않으면 첫 번째 슬라이드를 제거합니다.   
removeBefore가 true면 index에서 지정한 슬라이드 앞의 슬라이드를 삭제합니다.   
removeBefore가 false면 index에서 지정한 슬라이드 후행 슬라이드를 삭제합니다.
- [demo](https://tr.you84815.space/slick/methods/slickRemove.html)

````javascript
// index : int
// removeBefore : boolean
$('.slider').slick('slickRemove', index, removeBefore);
$('.slider').slick('slickRemove', 1, true);
````

### slickFilter
jQuery filter 구문을 사용하여 필터링 합니다.
- [demo](https://tr.you84815.space/slick/methods/slickFilter.html)

````javascript
$('.slider').slick('slickFilter', filter);
$('.slider').slick('slickFilter', ':even');	// 짝수 슬라이드만 표시
````

### slickUnfilter
적용된 필터를 해제합니다.
- [demo](https://tr.you84815.space/slick/methods/slickUnfilter.html)

````javascript
$('.slider').slick('slickUnfilter');
````

### slickGetOption
지정된 옵션의 값을 가져옵니다.
- [demo](https://tr.you84815.space/slick/methods/slickGetOption.html)

````javascript
$('.slider').slick('slickGetOption', option);
var autoplay = $('.slider').slick('slickGetOption', 'autoplay'); // autoplay : true
````

### slickSetOption
지정된 옵션의 값을 변경합니다. refresh항상 boolean받고 UI를 업데이트합니다.
- [demo](https://tr.you84815.space/slick/methods/slickSetOption.html)

````javascript
// option : string
// value : 
// refresh : boolean
$('.slider').slick('slickSetOption', option, value, refresh);
$(element).slick('slickSetOption', 'speed', 5000, true);	// speed를 변화시킨다
````

---
<br>

##### 참고

- [slick](https://kenwheeler.github.io/slick/)
- [github slick](https://github.com/kenwheeler/slick)
- [슬릭 슬라이더(Slick Slider) 옵션 한글 정리](https://www.inflearn.com/blogs/3749)
- [\[PlugIn\] slick slider](https://jmjmjm.tistory.com/30)
- [slick - にほんご。](https://tr.you84815.space/slick/index.html)



