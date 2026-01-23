---
title: "[Accessibility] WAI-ARIA 접근성: role, properties, states"
date: 2023-01-03 23:30:00 +0900
categories: [Web Accessibility]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## ARIA role (역할)
특정 요소에 역할 정의, 사용자에게 정보 제공, 부여한 역할 동적 변경 불가


## ARIA role 속성
- **`role="application"`**
  - 동일요소x, div 요소와 같이 그룹역할을 하는 요소로 대체

- **`role="banner"`**
  - 비슷한 의미로 `<header>`사용 가능
  - `<header role="banner">`로 사용 시 1페이지에서 1개만 사용하기를 권장

- **`role="navigation"`**
  - `<nav>`와 동일

- **`role="main"`**
  - `<main>`과 동일
  - 1페이지 내에 1개만 사용 가능하다. 본문의 주요 컨텐츠 영역

- **`role="aside"`**
  - `<aside>`와 동일, 주요 컨텐츠와 연관이 적은 의미를 가진 영역

- **`role="form"`**
  - `<form>`과 동일
  - 서버에 전송될 수 있는 컨텐츠, 폼 관련 요소의 모임

- **`role="search"`**
  - 검색 역할을 담당하는 서식 영역, `<div>`또는 `<form>`에 사용 권장

- **`role="contentinfo"`**
  - `<footer>`와 비슷
  - `<footer role="contentinfo">`로 사용 시 한 페이지에 한 개 요소만 사용하길 권장

- **`role="button"`**
  - p, span, div에서도 버튼 컨트롤로 사용된다는 것을 스크린리더에 인식시킬 수 있다.
  - 가능하면 button role 보다 기본 html의 `<button>`, `<input type="button">`, `<input type="submit">`을 사용해야 한다.
  - 기본 html 요소들은 추가 사용자 정의 없이 키보드 포커스를 지원한다.

- **`role="tablist"`**
  - 탭 메뉴 등의 리스트임을 사용자에게 전달한다.

- **`role="tab"`**
  - 보조기기가 탭으로 인식 (버튼에게 tab을 줘, 메뉴를 컨트롤하는 의미 추가 가능)

- **`role="tabpanel"`**
  - 보조기기가 탭 패널로 인식

- **`role="presentation"`**, **`role="none"`**
  - semantic의미를 요소와 그 자식 요소로부터 제거하기 위해 사용한다.
  - 시각적으로 제시하는 용도의 요소에 적용한다.
  - none은 최근에 나온 속성 값으로 presentation과 같은 역할을 한다.
  - 호환성 문제가 있을 수 있으니 두개 다 기입해주는 것이 좋다.

- **`role="group"`**
  - 라디오 버튼과 같이 여러 개의 옵션 중 한 가지를 선택할 때, name 속성에 같은 같은 값을 넣어줘서 그룹화 하더라도 스크린리더 사용자는 시각적으로 볼 수 있는 사용자와 달리 묶여있는 그룹이라는 것을 인식하기 어렵다.
  - 이러한 경우 role="group"을 부여하여 같은 그룹이라는 것을 인식시킨다.


## ARIA properties(속성) & states(상태)
요소가 기본적으로 가진 특징 or 상황, "aria-"라는 접두어를 갖는다.

- 상태: 요소의 상황을 나타내므로 application 실행 중 자주 바뀐다.
- 속성: 상대적으로 바뀌는 정도가 드물다.

### 필수 항목 속성
#### 속성
- **aria-required**
  - form 요소의 입력 필수 속성
  - 해당 요소가 필수적으로 입력되어야 함을 전달한다.
  - `<input type="checkout" aria-required="true">`

- **aria-label**
  - text 없이 이미지로 표현될 때 정보 설명
  - 추가설명 요소를 사용한다.
  - `<div role="group" aria-label="레이블">`

- **aria-live**
  - 업데이트 된 정보의 상황에 대한 설명

- **aria-controls (속성에 제어 대상)**
  - 제어대상

- **aria-describedby="reference"**
  - 추가설명
  - `<input type="text" aria-describedby="reference">`
  - `<div id="reference">추가설명</div>`


#### 상태
- **aria-checked (true, false, undefined)**
  - 선택 상태

- **aria-hidden (true, false, undefined)**
  - 숨김 상태

- **aria-disabled (true, false)**
  - 사용 불가능/가능 상태

- **aria-pressed (true, false, 대상)**
  - 눌림 상태



## 속성
### aria-expanded="true"
확장되어 있는 탭 패널 : aria-expanded로 현재 탭 패널이 펼처짐(활성화) 상태라는 것을 전달. (false : 접힌상태)
````html
<div role="tabpanel" aria-expanded="true">
````

### aria-invalid="true"
input에 입력된 값이 유효한지 판단하기 위한 것. true는 오류가 발생한 상태라는 것을 전달한다.
````html
<div type="text" aria-invalid="true">
````

### aria-pressed="true"
선택된 상태의 토글버튼: pressed를 이용하여 해당 요소를 토글버튼으로 정의해준다.   
true는 누른상태, false는누르지 않은 상태, mixed는 부분적으로 눌린 상태이다.
````html
<button aria-pressed="true">
````

----
##### 참고

- [\[HTML\] ARIA 역할 (role), 속성(properties), 상태(states)](https://y00eunji.tistory.com/entry/HTML-ARIA-역할-ROLE-속성properties-상태states)
