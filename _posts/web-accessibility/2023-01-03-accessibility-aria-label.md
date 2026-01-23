---
title: "[Accessibility] WAI-ARIA 접근성: aria-lable, aria-labelledby"
date: 2023-01-03 22:13:00 +0900
categories: [Web Accessibility]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

이전 포스팅에서 WAI-ARIA의 기본적인 내용에 대해 알아봤다면   
이번엔 자주 사용하는 ARIA 속성에 대해서 알아보려 한다.

ARIA는 HTML요소에 **접근 가능한 설명용 텍스트**를 넣을 수 있다.   
그 방법이 바로 ARIA의 속성 중 label과 관련된 속성을 사용하는 것이다.

간단하게 설명을 먼저 하자면   
**aria-label**은 화면에 현재 요소를 **설명할 텍스트가 없을 경우**에 사용하는 설명용 텍스트를 담고 있고,   
**aria-labelledby**는 화면에 현재 **요소를 설명할 텍스트가 있을 경우**에 해당 텍스트 영역과 현재 요소를 연결할 때 사용한다.


## aria-label
### 1. aria-label은 모든 html태그에서 사용할 수 있다.
### 2. 이미지를 사용해 시각적 표현을 할 경우에 대체 텍스트 역할을 한다.

일반적인 텍스트를 사용해서 영역을 표현하는 경우가 아닌   
이미지를 통해 영역을 표현하는 경우 해당 영역이 어떤 영역인지 설명할 수 있는 요소가 있어야 한다.

그런 설명하는 역할을 하는 속성이 바로 aria-lebel 속성이다.
````html
<button class="bt_menu" aria-label="navigation menu"></button>
````
예를 들어 햄버거 메뉴 버튼이 있다고 하다면   
일반적인 사용자들의 경우 햄버거 메뉴 이미지를 보고 클릭을 하고 사용하겠지만   
시각적으로 햄버거 메뉴 이미지를 확인할 수 없는 사용자들의 경우 해당 영역이 어떤 버튼인지 인지 할 수 없다.   
그렇기 때문에 aria-label 속성을 사용해 해당 영역이 navigation menu라는 정보를 담아준다.

### 3. 네이티브 텍스트와 aria-label과 같이 사용하게 되면 aria-label 속성에 작성한 정보를 사용한다.
위의 예시에서 사용한 버튼을 예로 들면
````html
<button class="bt_menu" aria-label="navigation menu">네비용 버튼</button>
````
해당 소스와 같이 aria-label엔 'navigation menu'를   
button 태그 안에는 '네비용 버튼'이라는 텍스트를 넣었을 경우에   
스크린리더로 정보를 불러올 때 aria-label에 담긴 'navigation menu'값을 사용한다.



## aria-labelledby
aria-labelledby는 맨 처음 aria-label을 설명하기 전에 설명했듯이   
화면에 현재 요소를 설명할 텍스트가 있을 경우에 해당 텍스트 영역과 현재 요소를 연결할 때 사용한다.
````html
<span id="rg-label">
  Dring options
</span>

<div role="raiogroup" aria-labelledby="rg-label">
  <div>
    <input type="radio" name="drink" id="drink1">
    <label for="drink1">Water</label>
  </div>
  <div>
    <input type="radio" name="drink" id="drink2">
    <label for="drink2">Tea</label>
  </div>
  <div>
    <input type="radio" name="drink" id="drink3">
    <label for="drink3">Coffee</label>
  </div>
  <div>
    <input type="radio" name="drink" id="drink4">
    <label for="drink4">Cola</label>
  </div>
  <div>
    <input type="radio" name="drink" id="drink5">
    <label for="drink5">Ginger Ale</label>
  </div>
</div>
````
위와 같은 소스로 작성했을 경우   
Water ~ Ginger Ale을 담고있는 radiogroup 영역에 대한 설명용 텍스트가   
해당 div 영역 밖인 `<span id="rg-label">`에 있기 때문에   
해당 id 값과 radiogroup div의 aria-labelledby의 값을 일치 시켜줘서   
radiogroup 영역이 어떤 요소들의 집합인지 설명해 줄 수 있다.

### 1. aria-labelledby는 모든 html 태그에서 사용할 수 있다.
### 2. aria-labelledby는 숨겨져 있는 요소도 참조할 수 있다. (display:none or visibility:hidden)

````html
<!--
  display: none,
  visibility: hidden을 적용한 영역도 참조할 수 있다.
-->

<span id="rg-label" style="display:none">
  Dring options
</span>

<div role="raiogroup" aria-labelledby="rg-label">
  <div>
    <input type="radio" name="drink" id="drink1">
    <label for="drink1">Water</label>
  </div>
  <div>
    <input type="radio" name="drink" id="drink2">
    <label for="drink2">Tea</label>
  </div>
  <div>
    <input type="radio" name="drink" id="drink3">
    <label for="drink3">Coffee</label>
  </div>
  <div>
    <input type="radio" name="drink" id="drink4">
    <label for="drink4">Cola</label>
  </div>
  <div>
    <input type="radio" name="drink" id="drink5">
    <label for="drink5">Ginger Ale</label>
  </div>
</div>
````

### 3. aria-labelledby와 네이티브 텍스트, aria-label과 함께 사용이 된다면 aria-labelledby에 있는 내용이 최우선된다.
````html
<span id="labelledby-text">navigation menu1</span>
<button class="bt_menu" aria-label="navigation menu2" aria-labelledby="labelledby-text">
  navigation menu3
</button>
````
위와 같은 소스일 경우에   
aria-labelledby의 경우 `<span id="labelledby-text">navigation menu1</span>`   
aria-label의 경우 navigation menu2   
네이티브 텍스트의 경우 navigation menu3의 값을 가지고 있는데,

이처럼 3개의 내용이 동시에 적용될 경우   
aria-labelledby 속성으로 정의한 내용이 최우선 된다.


## 우선순위
aria-labelledby > aria-label > 네이티브 텍스트

---
<br>

##### 참고

- [WAI-ARIA 접근성1. 소개 및 주의사항, 태그별 role의 사용](https://abcdqbbq.tistory.com/76)

