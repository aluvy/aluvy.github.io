---
title: "[CSS] 폰트를 한글과 영어, 숫자 따로 적용하기 (feat. unicode-range)"
date: 2022-05-04 11:19:00 +0900
categories: [CSS, CSS-basic]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

`unicode-range` 속성은 @font-face 규칙으로   
로드되는 글꼴의 특정 문자 범위를 지정합니다.

이 속성을 사용하면 브라우저가 글꼴 파일을 다운로드할 때 **필요한 문자 파일만을 다운로드**하기 때문에 화면에 **빠르게 렌더링**할 수 있습니다.

> **알아두세요!**   
> @font-face 규칙을 사용하여 웹 페이지에 사용자 정의 글꼴을 적용한 글꼴을 일반적으로 '웹 폰트'라고 부릅니다.   
> 웹 폰트는 사용자 디바이스에 설치된 글꼴(일반적으로 '시스템 폰트')이 아닌, 웹사이트에서 제공하는 글꼴 파일을 불러와 브라우저가 렌더링할 수 있도록 고안된 폰트로 다른 폰트와 구별해서 사용하는 용어입니다.   
> unicode-range 속성은 '시스템 폰트'가 아닌 **'웹 폰트'에만 적용**됩니다.
{: .prompt-tip}


## 유니코드 범위
````
unicode-range: U+0-10FFFF;     // 기본값, 모든 글자
unicode-range: U+0020-007E;    // 영문, 숫자, 특수문자
unicode-range: U+0041-005A;    // 영문 대문자
unicode-range: U+0061-007A;    // 영문 소문자
unicode-range: U+0020-002F, U+003A-0040, U+005B-0060, U+007B-007E;    // 특수문자
unicode-range: U+0030-0039;    // 숫자
unicode-range: U+AC00-D7A3;    // 한글
unicode-range: U+3000-30FF;    // 일본 문자
unicode-range: U+3000-30FF, U+FF61-FFEF;  // 일본 문자 적용(반각 가타가나 포함)
unicode-range: U+4E00-9FAF;    // 한중일 통합 한자
````

### 자주 사용할 만한 유니코드 범위
- 한글 범위: U+AC00-D7A3
- 영어 대문자 범위: U+0041-005A
- 영어 소문자 범위: U+0061-007A
- 숫자 범위: U+0030-0039
- 특수 문자: U+0020-002F, U+003A-0040, U+005B-0060, U+007B-007E


## 적용하기

@font-face 규칙을 통해   
웹에 호스팅된 "Roboto" 글꼴을 로드하고,   
영어 대소문자에 해당하는 유니코드 범위만 사용하도록 설정한다.

````css
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  src: local('※'),
    url('../fonts/Roboto-Regular.eot'),
    url('../fonts/Roboto-Regular.eot#iefix') format('embedded-opentype')
    url('../fonts/Roboto-Regular.woff') format('woff'),
    url('../fonts/Roboto-Regular.otf') format('opentype'),
    url('../fonts/Roboto-Regular.ttf') format('truetype');
    unicode-range:U+0041-005A, U+0061-007A; /* 영어 대소문자에 해당하는 범위에서만 다운로드해서 사용 */
}
````

위에서 정의한 Roboto 글꼴을 body 태그에 적용한다.   
만약 Roboto 글꼴이 로드되지 않으면 sans-serif 계열의 폰트로 대체한다.

````css
body {
  font-family: 'Roboto' , 'sans-serif';
}
````


## 주의

이 속성은 `@font-face`규칙에서만 사용할 수 있는 설명자(descriptor)입니다. 선택자의 속성으로는 사용할 수 없다.

````css
selector {
  font-family: "Nanum Gothic";
  unicode-range: U+AC00-D7A3; /* 선택자의 속성으로는 사용할 수 없다. */
}
````



---

##### 참고
- [CSS unicode-range 속성 – 올바른 이해와 사용 방법](https://codingeverybody.kr/css-unicode-range-속성/)
- [개발 🐾/HTML,CSS 폰트를 한글과 영어,숫자 따로 적용하기 (feat. unicode-range)](https://wazacs.tistory.com/48)
- [mdn unicode-range](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-face/unicode-range)
- [Unicode Character 'AMPERSAND' (U+0026)](https://www.fileformat.info/info/unicode/char/26/index.htm)
- 유니코드
  - [유니코드 2000~2FFF](https://ko.wikipedia.org/wiki/유니코드_2000~2FFF)
  - [유니코드](https://ko.wikipedia.org/wiki/%EC%9C%A0%EB%8B%88%EC%BD%94%EB%93%9C)
  - [Unicode block](https://en.wikipedia.org/wiki/Unicode_block)
  - [List of Unicode characters](https://en.wikipedia.org/wiki/List_of_Unicode_characters)
