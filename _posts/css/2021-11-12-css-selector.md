---
title: "[CSS] 선택자(Selector), 가상선택자(Virtual selector)"
date: 2021-11-12 08:26:00 +0900
categories: [CSS]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

CSS3에서는 선택자 속성이 새롭게 추가되었다.   
selector를 사용하게 되면 id나 class를 대폭 줄일 수 있는 장점이 있다.


## 유사클래스 네임 (해당 문자를 포함하는 클래스 명)

````html
<div class="box1">
  <ul>
    <li class="hana dul set">배분 대표사업의 핵심 브랜드화</li>
    <li class="net daseot yuseot">창의적 배분구조/사업/플랫폼의 인큐베이팅</li>
    <li class="ilgop yudeop ahop">공익단체 역량의 집중 강화(교육,컨설팅)</li>
    <li class="yul yulhana yuldul">사회이슈에 대한 전자구적 인식과 대응</li>
    <li class="yulset yulnet yuldaseot">창의적 참여적 시민기부모델 개발</li>
  </ul>
</div>
<div class="box2">
  <p>창립 10주년 기념 사이트 "나눔으로 함께 만든 10년"사이트 오픈</p>
  <address>서울시 강남구 역삼동 000-000번지 tel:00-000-0000</address>
</div>
````

- **`li[class^=yul]`**: class 이름이 yul로 시작되는 li 요소
- **`li[class$=seot]`**: class 이름이 seot로 끝나는 li 요소
- **`li[class*=hana]`**: class 이름이 hana를 포함하는 li 요소

> * 프로그램 언어에서 ^가 front라는 의미로 사용된다.
> * 프로그램 언어에서 $가 back이라는 의미로 사용된다.
> * 프로그램 언어에서 *가 all이라는 의미로 사용된다.
{: .prompt-tip}


## first-child, last-child

````html
<ul>
  <li>1. 배분 대표사업의 핵심 브랜드화</li>
  <li>2. 창의적 배분구조/사업/플랫폼의 인큐베이팅</li>
  <li>3. 공익단체 역량의 집중 강화(교육,컨설팅)</li>
  <li>4. 사회이슈에 대한 전자구적 인식과 대응</li>
  <li>5. 창의적 참여적 시민기부모델 개발</li>
</ul>
````

- **`li:first-child`**: 동일 레벨의 요소 중 첫번째 li
- **`li:last-child`**: 동일 레벨의 요소 중 마지막 li


## nth-child

````html
<ul>
  <li>1. 배분 대표사업의 핵심 브랜드화</li>
  <li>2. 창의적 배분구조/사업/플랫폼의 인큐베이팅</li>
  <li>3. 공익단체 역량의 집중 강화(교육,컨설팅)</li>
  <li>4. 사회이슈에 대한 전자구적 인식과 대응</li>
  <li>5. 창의적 참여적 시민기부모델 개발</li>
</ul>
````

- **`li:nth-child(3)`**: 동일 레벨의 요소 중 앞에서부터 3번째 li
  - ex) ○○●○○○○○○○
- **`li:nth-last-child(2)`**: 동일 레벨의 요소 중 뒤에서부터 2번쨰 li
  - ex) ○○○○○○○○●○
- **`li:nth-child(2n)`**: 동일 레벨의 요소 중 두번째 마다 선택 = (even)과 동일
  - ex) ○●○●○●○●○●
- **`li:nth-child(2n+1)`**: 동일 레벨의 요소 중 첫번째 요소로부터 2번째 마다 선택
  - ex) ●○●○●○●○●○
- **`li:nth-child(2n+5)`**: 동일 레벨의 요소 중 다섯번째 요소로부터 2개마다 선택
  - ex) ○○○○●○●○●○
- **`li:nth-child(-2n+5)`**: 동일 레벨의 요소 중 다섯번째 요소까지 2개마다 선택
  - ex) ●○●○●○○○○○
- **`li:nth-child(n+5)`**: 동일 레벨의 요소 중 다섯번째부터 모두 선택
  - ex) ○○○○○●●●●●
- **`li:nth-child(-n+5)`**: 동일 레벨의 요소 중 앞에서부터 5개만 선택
  - ex) ●●●●●○○○○○
- **`li:nth-child(odd)`**: 동일 레벨의 요소 중 홀수 요소만 선택
  - ex) ●○●○●○●○●○
- **`li:nth-child(even)`**: 동일 레벨의 요소 중 짝수 요소만 선택
  - ex) ○●○●○●○●○●


## first-of-type, last-of-type

````html
<div class="box3">
  <h3>제목1입니다.</h3>
  <p>단락1-1입니다.</p>
  <p>단락1-2입니다.</p>
  <p>단락1-3입니다.</p>

  <h3>제목2입니다.</h3>
  <p>단락2-1입니다.</p>
  <p>단락2-2입니다.</p>
  <p>단락2-3입니다.</p>
</div>
````

- **`h3:first-of-type`**: .box3안에 h3 요소 중 첫번째
- **`h3:last-of-type`**: .box3안에 h3 요소 중 마지막

## nth-of-type

````html
<div class="box3">
  <h3>제목1입니다.</h3>
  <p>단락1-1입니다.</p>
  <p>단락1-2입니다.</p>
  <p>단락1-3입니다.</p>

  <h3>제목2입니다.</h3>
  <p>단락2-1입니다.</p>
  <p>단락2-2입니다.</p>
  <p>단락2-3입니다.</p>
</div>
````
- **`p:nth-of-type(2)`**: .box3안에 p 요소 중 2번째
- **`p:nth-last-of-type(2)`**: .box3안에 p 요소 중 뒤에서부터 2번째
- **`p:nth-of-type(2n+1)`**: .box3안에 p 요소 중 첫번째부터 2번째마다 선택
- **`p:nth-of-type(n+2):nth-of-type(-n+5)`**: 선택자를 두번 사용하여 교집합인 요소만 선택할 수 있다.


## 조건 선택자

````html
<div class="box2">
  <p>창립 10주년 기념 사이트 "나눔으로 함께 만든 10년"사이트 오픈</p>
  <address>서울시 강남구 역삼동 000-000번지 tel:00-000-0000</address>
</div>
````

- **`.box2 p:only-child`**: .box2 안에 p가 유일한 자식일 때 선택
- **`.box2 p:only-of-type`**: .box2 안에 p가 유일한 타입일때 선택
- **`.box2 address:not(p)`**: .box2 안에 p가 아닌 address 요소를 선택

## target

````html
/*
  1. 탭 메뉴 클릭 시 주소에 타겟이 추가 됨 = 주소#html5
  2. 주소에 타겟이 설정 됨 = #html5
  3. p:target = p#html5
  4. html5 id를 가진 p가 선택 됨
*/

<section>
  <nav>
    <ul>
      <li><a href="#html5">HTML5</a></li>
      <li><a href="#css3">CSS3</a></li>
      <li><a href="#js">JavaScript</a></li>
    </ul>
  </nav>
  <article>
    <p id="html5">
      HTML5는 HTML 4.01, XHTML 1.0, DOM Level 2 HTML에 대한 차기 표준 제안이다. 최신 멀티미디어 콘텐츠를 브라우저에서 쉽고 용이하게 볼 수 있게하는 것을 목적으로 한다.
    </p>
    <p id="css3">
      CSS 또는 캐스케이딩 스타일 시트(Cascading Style Sheet)는 마크업 언어가 실제 표시되는 방법을 기술하는 언어로, HTML과 XHTML에 주로 쓰이며, XML에서도 사용할 수 있다. W3C의 표준이며, 레이아웃과 스타일을 정의할 때의 자유도가 높다.
    </p>
    <p id="js">
      자바스크립트(JavaScript)는 객체 기반의 스크립트 프로그래밍 언어이다. 이 언어는 웹 사이트에서의 사용으로 많이 알려졌지만, 다른 응용프로그램의 내장 객체에도 접근할 수 있는 기능을 가지고 있다.
    </p>
  </article>
 </section>
````

- **`article p:target`**: article 안에 타겟이 맞춰진 p만 선택된다.


## before, after

````css
p::before{content:'앞';}
p::after{content:'뒤';}
````

````html
<p>안녕하세요</p>
````

- **`p::before`**: 요소 **안 앞쪽**에 inline 요소 추가
- **`p::after`**: 요소 안 **뒤쪽에** inline 요소 추가
