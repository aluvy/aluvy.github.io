---
title: "[CSS] 방법론"
date: 2022-12-07 17:20:00 +0900
categories: [CSS, CSS-basic]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

현재 CSS 방법론이라고 사람들이 말하는 것은 크게 3가지로 구분됩니다.   
해당 방법론이 무엇이고 어떠한 장점과 단점을 가지고 있는지 알아봅니다.

3가지 방법론 중 무엇 하나 정답이라고 말할 수 없으며 공부를 하다 보면 자신에게 맞는 방법론이 보이게 됩니다. 그 방법론을 프로젝트에 맞게 또 공통 가이드화 하여 협업이 용이하게 사용하는게 더 중요합니다.

**왜 CSS 방법론을 사용할까요?**
- 협업 시 사람마다 다른 코드 구조 및 스타일 정의 (방법론을 사용하는 이유는 첫 번째 이유가 가낭 크다고 생각합니다.)
- 서로 다른 네이밍 규칙
- 유지보수가 어려운 코드
- 타인이 작성한 코드를 이해하고 분석하는데 드는 시간의 증가
- 복잡해지는 선택자 등

위 이유 이외에도 추가적으로 더 있을 수 있다.   
코드의 규칙성(획일성)을 확보하기 위해 마크업 가이드를 통해서 마크업을 하듯이   
CSS도 방법론이 대두되고 프로젝트에 맞는 방법론을 적용하여 사용하는 추세가 늘어나고 있다.



**대표적인 3가지 방법론**
- OOCSS (Object Oriented CSS)
- BEM (Block Element Modifier)
- SMACSS (Scalable and Modular Architecture for CSS)



## 1. OOCSS (Object Oriented CSS)
OOCSS는 약어에서도 알 수 있듯이 객체 지향에 따라서 고안된 설계 방식이다.   
이 방법론의 특징은 첫째, 구조와 외형을 분리하고 둘째, 컨테이너와 내용을 분리하는 것이다.

### 첫째, 구조와 외형을 분리
- 구조: width, height, border, padding, margin ...
- 외형: color, border-color, color, background-color...

````html
<div class="btn common-skin tel">tel</div>
<div class="btn common-skin email">email</div>
````
````css
.btn {공통 스타일 정의}
.common-skin {공통 스타일 정의}
````

### 둘째, 컨테이너와 내용을 분리
- 위치에 의존하지 않는 스타일 정의
- 어떤 태그라도 동일한 외형 제공
- 어디에서나 재사용이 가능한 클래스 기반 모듈 구축

````css
/* bad */
h3 {font-size:16px}

/* good */
.sub-title {font-size:16px}
````
````html
<h3 class="sub-title">...</h3>
<span class="sub-title">...</span>
````

### OOCSS 장점과 단점
**OOCSS 장점**
- 공통된 부분을 정의해서 재사용이 가능하다
- 구조적 상황에 관계없이 동일한 클래스라면 동일한 스타일을 기대할 수 있다.
- 코드의 재사용으로 코드 양이 줄어든다.

**OOCSS 단점**
- 공통된 클래스가 많기 때문에 수정이 발생할 시 멀티클래스를 사용해야 한다.
- 멀티클래스가 많아짐에 다라 유지보수에 어려움이 있다.
- 코드의 가독성이 떨어진다.


## 2. BEM (Block Element Modifier)
Block, Element, Modifier로 나누어 클래스명을 기술하는 방법이다.

아이디를 사용하지 않고 클래스명만 사용하여 전체 구조를 block(전체를 감싸고 있는 블록 요소), element(내부요소), modifier(기능/수정)으로 정의하고 block과 element는 더블 언더스코어로, modifier는 더블 하이픈으로 연결하여 정의하는 방법론이다.

- block(전체를 감싸고 있는 요소)__element(내부요소)--modifier(기능/수정)
- 언더스코어를 두개 사용하는 이유은 하이픈이나 언더스코어를 통해 블록 이름을 구분자로 사용할 수도 있기 때문이다.

### BEM 장점과 단점
**BEM 장점**
- 직관적인 클래스 명으로 마크업 구조를 직접 보지 않아도 구조 파악이 쉽다.

**BEM 단점**
- 클래스명이 상대적으로 길어질 수 밖에 없는 구조이기 때문에 코드가 길어지고 복잡해진다.
- 기존 마크업에서 새롭게 기능이 추가되었을 경우 클래스명 재수정이 불편하다.



## 3. SMACSS (Scalable and Modular Architecture for CSS)
CSS에 대한 확장형 모듈식 구조의 형태로 5개로 구분된 카테고리로 CSS 코딩 기법을 제시하는 방법이다.   
어떤 카테고리에 속하는지 결정하는데 고민과 숙고가 요구된다

### Base - 기본규칙
각 브라우저의 기본 스타일 (default.css, reset.css) , 요소 element 스타일의 기본 정의 값

### Layout - 레이아웃 규칙
큰 틀의 레이아웃, 요소를 배치, 구별하는데 사용   
주요 컴포넌트 : header, footer, aside, container, content 등   
하위 컴포넌트 : list, item, form 등   
클래스 명은 접수사 i-, layout- 명시

### Module  - 모듈 규칙
페이지에서 재사용이 가능한 요소 : 버튼, 배너, 아이콘, 박스 요소 등   
각 모듈은 독립성을 가지게 스타일 선언 : 재사용이 가능하게 id, 태그 선택자는 사용하지 않음.

### State - 상태 규칙
요소의 상태변화를 표현하는 요소 : 툴팁, 아코디언 등   
active나 disable 등이며 suffix "is-"나 "s-"를 붙여서 사용   
모듈과 레이아웃 모두 적용 가능

### Theme - 테마 규칙
사용자가 선택 가능하도록 스타일을 재선언하여 사용.   
Theme는 전반적인 Look and feel을 정의하며 suffix "theme-"를 붙인다. 


### SMACSS 의 장점과 단점
**SMACSS의 장점**
- 클래스명을 통한 예측의 용이성
- 재사용을 통한 코드의 간결화
- 확장의 용이성

**SMACSS의 단점**
- 카테고리를 나누는 기준이 작성사에 따라서 불분명해질 수 있다.
- 코드를 나누어서 작성해야 하기 때문에 CSS를 사용하기 번거롭다.
- 잘못 사용하면 오히려 의도와 다르게 더 복잡해지고 번거로워진다.



## 마무리
각 방법론에는 장점과 단점이 존재한다.

방법론은 절대적인 규칙이 아니기 때문에 기존 방법론을 프로젝트에 따라 또 상황에 따라 일관성 있게 사용하여 사용성을 높이고 프로젝트에서 동일한 코드를 유지하는게 중요하다.


---

<br>


##### 참고
- [CSS방법론 : OOCSS, BEM, SMACSS 비교해보기](https://whales.tistory.com/33)
- 


