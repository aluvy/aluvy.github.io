---
date: '2024-05-16 10:50:00 +0900'
title: '[SASS] SCSS'
summary: 'SCSS는 Sass로부터 등장했습니다. Sass는 CSS 전처리기로서 변수, 상속, 혼합, 중첩 등의 다양한 기능을 제공합니다.    전처리기로 작성한 코드는 CSS로 컴파일을 거친 뒤 실행시킬 수 있습니다. SCSS는 Sass3 버전부터 새롭게 등장했습니다. SCSS는 Sass의 모든 기능을 지원하는 Superset 입니다. 게다가 SCSS는 CSS와 거의 비슷한 문법으로 Sass의 기능을 사용할 수 있습니다.'
author: ['aluvy']
categories: ['SASS']
tags: ['sass']
thumbnail: ''
---


## SCSS

**SASS (Synthetically Awesome StyleSheets)**   
SCSS는 Sass로부터 등장했습니다. Sass는 CSS 전처리기로서 변수, 상속, 혼합, 중첩 등의 다양한 기능을 제공합니다.   
전처리기로 작성한 코드는 CSS로 컴파일을 거친 뒤 실행시킬 수 있습니다.

SCSS는 Sass3 버전부터 새롭게 등장했습니다. SCSS는 Sass의 모든 기능을 지원하는 Superset 입니다.   
게다가 SCSS는 CSS와 거의 비슷한 문법으로 Sass의 기능을 사용할 수 있습니다.

**Sass와 SCSS의 차이점**
- Sass: 중괄호가 아닌 들여쓰기 사용
- SCSS: CSS처럼 `{}`와 `;` 을 사용


## 1. DataTypes
SCSS는 다양한 데이터 타입을 정의하고 있어 이를 변수처럼 활용할 수 있습니다.

| type         |                                                 |                                              |
| ------------ | ----------------------------------------------- | -------------------------------------------- |
| **Numbers**  | 숫자                                            | 1, 82, 20px, 2rem...                         |
| **Strings**  | 문자                                            | bold, relative, "images/a.png", "dotum"      |
| **Colors**   | 색상                                            | red, blue, #FFFF00, rgba(255,0,0,0.5)        |
| **Booleans** | 논리                                            | true, false                                  |
| **Nulls**    | 아무것도 없음                                   | null                                         |
| **Lists**    | Array<br>공백이나 ,로 구분 된 값의 목록         | (apple, orange, banana), apple orange banana |
| **Maps**     | Object<br>Lists와 유사하나 값이 Key: Value 형태 | (apple: a, orange: b, banana: c)             |


````js
$boolean: true;
$string: hello;
$color: red;
$number: 720;
$list: red, orange, yellow, green, blue;
$map: (
  l: light,
  d: dark,
);
````

## 2. Nesting (중첩)

Nesting을 통해 상위 선택자의 반복을 줄일 수 있습니다. 이를 통해 복잡한 구조를 더 편리하게 개선하게 됩니다.

````scss
/* SCSS */
.section {
  width: 100%;

  .list { padding: 20px;
    li { float: left; }
  }
}

/* Compile to CSS */
.section { width: 100%; }
.section .list { padding: 20px; }
.section .list li { float: left; }
````

## 3. & (상위 선택자 참조)

Nesting(중첩) 내부에서 `&` 키워드는 상위(부모) 선택자로 치환됩니다.

````scss
/* SCSS */
.btn {
  position: absolute;
  &.active {
    color: red;
  }
}

.list {
  li {
    &:last-child { margin-right: 0; }
  }
}

/* Compile to CSS */
.btn { position: absolute; }
.btn.active { color: red; }
.list li:last-child { margin-right: 0; }
````

치환의 원리이기 때문에 다음과 같이 응용할 수 있습니다.

````scss
/* SCSS */
.fs {
  &-small { font-size: 12px; }
  &-medium { font-size: 14px; }
  &-large { font-size: 16px; }
}

/* Compile to CSS */
.fs-small { font-size: 12px; }
.fs-medium { font-size: 14px; }
.fs-large { font-size: 16px; }
````


## 4. Variables (변수)

반복적으로 사용되거나 관리하고 싶은 값을 변수로 지정할 수 있습니다.   
다만 변수 앞에는 항상 `$`를 붙여야 합니다.

요즘에는 CSS 스펙에 사용자 속성(custom properties)이 추가되어 변수를 지정해 사용할 수 있지만 예전에는 Sass가 제공하는 큰 이점 중 하나였습니다.

````scss
/* SCSS */
$color-primary: #e96900;
$url-images: "/assets/images/";
$w: 200px;

.box { width: $w; margin-left: $w; background: $color-primary url($url-images + "bg.jpg"); }

/* Compile to CSS */
.box { width: 200px; margin-left: 200px; background: #e96900 url("/assets/images/bg.jpg"); }
````


### Variables scope

변수는 선언 된 블록 지역 내에서만 유효 범위를 가집니다.

````scss
.box1 {
  $color: #111;
  background: $color;
}

/* Error */
.box2 { background: $color; }
````

### # {}

`#{}` 를 이용하면 JavaScript의 템플릿 리터럴처럼 코드의 어디든지 변수 값을 넣을 수 있습니다.

````scss
/* SCSS */
$family: unquote("Droid+Sans");
@import url("http://fonts.googleapis.com/css?family=#{$family}");

/* Compile to CSS */
@import url("http://fonts.googleapis.com/css?family=Droid+Sans");
````



### 보간법 (Interpolation)

만약 변수 값을 속성 값이 아닌 속성명으로 사용할 때는 어떡해야 할지 알아보도록 합시다.

````scss
$radius: "border-radius";

.border {
  border: 1px solid black;
  $radius: 5px;   /* x 컴파일 에러 */
  #{$radius}: 5px;  /* o border-radius: 5px */
}
````

좀 더 실용적인 예시

````scss
@for $i from 1 through 5 {
  .color#{$i} {
    background-color: lighten(red, 10% * $i);
  }
}

/* 컴파일 결과 */
.color1 { background-color: #f33; }
.color2 { background-color: #f66; }
.color3 { background-color: #f99; }
.color4 { background-color: #fcc; }
.color5 { background-color: white; }
````


## 5. Operations (연산)

연산자는 레이아웃을 디테일하게 디자인할 때 유용하게 쓰일 수 있습니다.

| type |        |                                       |
| ---- | ------ | ------------------------------------- |
| `+`  | 더하기 |                                       |
| `-`  | 빼기   |                                       |
| `*`  | 곱하기 | 하나 이상의 값이 반드시 숫자 (Number) |
| `/`  | 나누기 | 오른쪽 값이 반드시 숫자 (Number)      |
| `%`  | 나머지 |                                       |


## 6. Mixins (재활용)

Mixin은 재사용할 CSS 스타일을 정의할 수 있는 유용한 기능입니다.   
`@mixin`을 통해 스타일을 선언하고 `@include`을 통해 사용합니다.

````scss
/* 선언 - @mixin */
@mixin large-text {
  font: { size: 22px; weight: bold; family: sans-serif; }
  color: orange;
  &::after { content: "!!"; }
  span.icon { background: url("/images/icon.png"); }
}

/* 사용 - @include */
h1 { @include large-text; }
div { @include large-text; }
````


## 7. Functions (함수)

함수를 정의하여 사용할 수 있습니다.   
다만 함수와 Mixin이 헷갈릴 수 있는데, 이들은 변환 값에 차이가 있습니다.

**Mixin과 Functions의 차이점**
- **Mixin**: 지정한 스타일 (style) 반환
- **Functions**: 계산된 특정 값을 @return 지시어를 통해 반환

````scss
/* SCSS */

@mixin dash-line($width: 1px, $color: black) { /* 기본값 설정 */
	border: $width dashed $color;
}

.box0 { @include dash-line(); }
.box1 { @include dash-line(1px, red); }
.box2 { @include dash-line(4px, blue); }

/* Compile to CSS */
.box0 { border: 1px dashed black; }
.box1 { border: 1px dashed red; }
.box2 { border: 4px dashed blue; }
````


## 8. Condition (조건)
### if문 (조건문)

조건의 참, 거짓에 따라 하나의 값을 반환합니다. JavaScript의 삼항 연산자 구조와 비슷합니다.

````scss
/* SCSS */
$width: 555px;

div { width: if($width > 300px, $width, null); }

/* Compile to CSS */
div { width: 555px; }
````



### @if, @else, @if else

조건에 따른 분기 처리가 가능합니다. JavaScript의 `if-else`문과 구조가 비슷합니다.

````scss
/* SCSS */
$color: orange;
div {
  @if $color == strawberry {
    color: #fe2e2e;
  } @else if $color == orange {
    color: #fe9a2e;
  } @else if $color == banana {
    color: #ffff00;
  } @else {
    color: #2a1b0a;
  }
}

/* Compile to CSS */
div { color: #fe9a2e; }
````


## 9. Loop (반복)
### @for

스타일을 반복적으로 출력합니다. JavaScript의 for문과 유사합니다.   
다만 through와 to에 따라서 종료 조건이 달라집니다.

- **from a through b**: a 부터 b까지 반복 (b 포함)
- **from a to b**: a부터 b직전까지 반복

````scss
/* SCSS */

/* 1부터 3까지 반복 (3번 반복) */
@for $i from 1 through 3 {
  .through:nth-child(#{$i}) {
    width: 20px * $i;
  }
}

/* 1부터 3 직전까지 반복 (2번 반복) */
@for $i from 1 to 3 {
	.to:nth-child(#{$i}) { width: 20px * $i; }
}

/* Compile to CSS */
.through:nth-child(1) { width: 20px; }
.through:nth-child(2) { width: 40px; }
.through:nth-child(3) { width: 60px; }
.to:nth-child(1) { width: 20px; }
.to:nth-child(2) { width: 40px; }
````



### @each

List 또는 Map 데이터를 반복할 때 사용합니다. JavaScript의 for-in / for-of 문가 유사합니다.

````scss
/* SCSS */

// List
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}

// Map
@each $header, $size in (h1: 2em, h2: 1.5em, h3: 1.2em) {
  #{$header} {
    font-size: $size;
  }
}

/* Compile to CSS */
.puma-icon { background-image: url("/images/puma.png"); }
.sea-slug-icon { background-image: url("/images/sea-slug.png"); }
.egret-icon { background-image: url("/images/egret.png"); }
.salamander-icon { background-image: url("/images/salamander.png"); }
h1 { font-size: 2em; }
h2 { font-size: 1.5em; }
h3 { font-size: 1.2em; }
````


## 10. Built-in-Functions (내장함수)

Sass에선 기본적으로 다양한 내장 함수를 제공합니다. 종류가 다양하니 필요에 따라 찾아보면서 사용하는 것을 권장합니다.

<https://sass-lang.com/documentation/modules/>

````scss
.item:nth-child(1) { background-color: $color; }
.item:nth-child(2) { background-color: lighten($color, 20%); }
.item:nth-child(3) { color: white; background-color: darken($color, 20%); }
.item:nth-child(4) { background-color: grayscale($color); }
.item:nth-child(5) { background-color: rgba($color, 0.3); }
.item:nth-child(6) { background-color: invert($color); }
````

---
<br>

##### 참고

- [\[SCSS\] SCSS 문법 정리](https://seokzin.tistory.com/entry/SCSS-SCSS-%EB%AC%B8%EB%B2%95-%EC%A0%95%EB%A6%AC)
- [\[SCSS\] SCSS는 무엇인가?](https://voyage-dev.tistory.com/59)
- [\[SCSS\] 💎 함수형 프로그래밍 (mixin  / functions)](https://inpa.tistory.com/entry/SCSS-%F0%9F%92%8E-%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-mixin-functions)