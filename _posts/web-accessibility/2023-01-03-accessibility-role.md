---
title: "[Accessibility] WAI-ARIA 접근성: role"
date: 2023-01-03 21:43:00 +0900
categories: [Web Accessibility]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## WAI-ARIA 란?
WAI-ARIA (Web Accessibility Initiative - Accessible Rich Internet Applications)는   
W3C에서 만든 기술로, WAI-ARIA 혹은 ARIA로 불린다.

마우스와 같은 포인팅 장비를 사용하기 힘든, 스크린 리더를 사용하는 사용자들에게 **동적 컨텐츠, JavaScript, Ajax, Vue, React** 등과 같이 페이지를 새로고침 하지 않고도 페이지의 내용과 데이터가 바뀌는 영역에 **역할, 속성, 상태 정보를 추가**하여 동적인 컨텐츠에 보다 원활하게 접근하고 페이지에 접근성을 높여 여러 사용자들에게 원활한 페이지 이용을 도와준다.

ex) 버튼을 클릭하여 페이지를 새로고침이나 링크 이동으로 전환되는 것이 아닌 **컨텐츠 내용이나 구조가 바뀌는 상황에서 페이지 전환 상태나 정보를 WAI-ARIA로 알려준다.**

또한   
WAI-ARIA는 단순 HTML로 표현할 수 없는 의미들을 태그에 부여하여 시각적인 불편함이 있는 사용자들에게 일반적인 구조의 HTML에서 필요한 요소에 적절한 정보를 전달받아 원활하게 페이지 탐색 및 이용을 하도록 도와준다.

````html
<ul>
  <li tabindex="0" class="checkbox" checked>
    Receive promotional Offers
  </li>
</ul>
````
예를 들어 위와 같은 태그를 살펴봤을 때   
li태그의 .checkbox 클래스를 부여하여 css 상으로 체크박스 형태의 모양을 만들어 사용할 경우   
시각적 불편함이 없는 사용자들의 경우  css 화면을 보고 해당 영역이 체크박스임을 인지할 수 있지만   
스크린리더로 화면을 탐색해야 하는 사용자들의 경우 위의 css정보를 얻을 수 없다.

이때 스크린리더 사용자들을 위한 방법이 WAI-ARIA 를 사용하는 것이다.
````html
<ul>
  <li tabindex="0" class="checkbox" role="checkbox" checked aria-checked="true">
    Receive promotional offers
  </li>
</ul>
````
기존 소스와 다르게 role, aria-checked ARIA 속성을 사용하여   
해당 영역이 체크박스인지, 체크가 되었는지까지 명시할 수 있다.


## WAI-ARIA 사용시 주의사항

### 1. 올바르지 못한 ARIA를 사용할 바엔 ARIA를 사용하지 않는 편이 좋다.
스크린리더를 사용하여 페이지에 접근하는 경우 ARIA의 정보에 의지하게 되는데   
바르지 못한 정보를 제공하게 되는 경우 스크린리더 사용자의 페이지 접근에 치명적인 영향을 주게 된다.
````html
<div role="button">주문하기</button>
````
예를 들어,   
쇼핑몰에서 위의 소스처럼 div 영역을 버튼으로 사용하고 클릭 시 주문이 되도록 소스를 작성했다고 했을 때,   
role="button"을 작성한다고 해서 실제 html 상에 키보드 포커싱이 일반 버튼처럼 역할을 해주는 것은 아니다.   
**(키보드로 해당 div가 접근이 안된다.)**

키보드로 접근할 때 a, button과 같은 상호작용을 하는 태그가 아니라면 키보드로 해당 컨텐츠에 접근할 수 없다.   
그렇기 때문에 위의 소스로 작성을 하게 된다면 키보드로 해당 div 영역을 접근할 수 있도록 처리를 해주거나   
(강제로 tabindex 속성을 주거나 스크립트 처리)   
버튼의 용도에 맞게 a, button 태그를 사용해야 한다.

### 2. ARIA를 사용하기 전에 태그의 역할과 의미에 맞게 작성한다.
html 태그는 각 태그별로 담당하고 있는 역할이 있다.   
예를 들면 a 태그는 상호작용과 링크 이동과 같은 역할을, button 태그는 말 그대로 버튼의 역할을...   
이처럼 각 태그를 사용할 때 태그가 가지고 있는 역할에 맞게 사용한다면 불필요한 ARIA 속성을 줄이고 보다 접근성 향상에 도움을 줄 것이다.
````html
<!-- X -->
<div role="button">버튼</button>

<!-- O -->
<button>버튼</button>
````

### 3. 태그의 기본 의미를 중복해서 선언할 필요는 없다.
위의 내용들과 연관지을 수 있는 내용인데   
html의 각 태그에는 기본적으로 갖고 있는 역할과 의미가 있다.

그렇기 때문에 태그의 기본 속성에 덧붙여서 속성을 중복하여 정의할 필요는 없다.
````html
<!-- O -->
<input type="checkbox">
<button>버튼</button>
<fieldset>...</fieldset>
<ul>...</ul>

<!-- X (중복선언) -->
<input type="checkbox" role="checkbox">
<button role="button">버튼</button>
<fieldset role="group">...</fieldset>
<ul role="list">...</ul>
````

### 4. 페이지에서 사용하는 태그의 역할이 잘못된 ARIA를 선언하면 안된다.
````html
<!-- X -->
<button role="heading">버튼</button>
````
위의 예시처럼 button의 역할을 하는 태그에 heading이라는 역할을 주게 되면 접근성에 치명적 오류를 범하게 된다.



## 태그별 role (역할)
html 각 태그별로 암묵적으로 가지고 있는 role(역할)이 있다.   
그리고 각 태그별로 적용할 수 있는 역할도 있다.

- **`<a href="">`**
  - 암묵적 기본 역할:
    - role="link"
  - 적용 가능한 역할:
    - button, checkbox, menuitem, menuitemcheckbox, menuitemradio, option, radio, switch, tab

- **`<a>`** (href 속성 없이)
  - 암묵적 기본 역할:
    - x
  - 적용 가능한 역할:
    - 어떤 role이든 적용 가능

- **`<article>`**
  - 암묵적 기본 역할:
    - role="article"
  - 적용 가능한 역할:
    - application, document, feed, main, none, presentation, region

- **`<aside>`**
  - 암묵적 기본 역할:
    - role="complementary"
  - 적용 가능한 역할:
    - feed, none, note, presentation, region, search

- **`<header>`**
  - 암묵적 기본 역할:
    - article, aside, main, nav, section 태그의 자손 요소이거나 role=article, complementary, main, navigation, region을 사용한 태그의 자손일 경우엔 암묵적 역할이 따로 없고 해당 요소들의 자손요소가 아닐 경우엔 role="banner"이다.
  - 적용 가능한 역할:
    - group, none, presentation

- **`<footer>`**
  - 암묵적 기본 역할:
    - article, aside, main, nav, section 태그의 자손 요소이거나 role=article, complementary, main, navigation, region을 사용한 태그의 자손일 경우엔 암묵적 역할이 따로 없고 해당 요소돌의 자손요소가 아닐 경우엔 role="contentinfo"이다.
  - 적용 가능한 역할:
    - group, none, presentation

- **`<section>`**
  - 암묵적 기본 역할:
    - accessible name을 가지고 있다면 role="region" 그렇지 않다면 역할이 따로 없다.
  - 적용 가능한 역할:
    - alert, alertdialog, application, banner, complementary, contentinfo, dialog, document, feed, log, main, marquee, navigation, none, note, presentation, search, status, tabpanel

- **`<button>`**
  - 암묵적 기본 역할:
    - role="button"
  - 적용 가능한 역할:
    - checkbox, link, menuitem, menuitemcheckbox, menuitemradio, option, radio, switch, tab

- **`<div>`**
  - 암묵적 기본 역할:
    - x
  - 적용 가능한 역할:
    - 어떤 role이든 적용 가능

- **`<dl>`**
  - 암묵적 기본 역할:
    - x
  - 적용 가능한 역할:
    - group, list, presentation, none

- **`<dt>`**
  - 암묵적 기본 역할:
    - role="term"
  - 적용 가능한 역할:
    - listitem

- **`<dd>`**
  - 암묵적 기본 역할:
    - role="definition"
  - 적용 가능한 역할:
    - x

- **`<fieldset>`**
  - 암묵적 기본 역할:
    - role="group"
  - 적용 가능한 역할:
    - none, presentation, radiogroup

- **`<form>`**
  - 암묵적 기본 역할:
    - accessible name을 가지고 있다면 role="form" 그렇지 않다면 역할이 따로 없다.
  - 적용 가능한 역할:
    - search, none, presentation

- **`<h1>`** ~ **`<h6>`**
  - 암묵적 기본 역할:
    - role="heading"
  - 적용 가능한 역할:
    - none, presentation, tab

- **`<img alt="텍스트">`**
  - 암묵적 기본 역할:
    - role="img"
  - 적용 가능한 역할:
    - button, checkbox, link, menuitem, menuitemcheckbox, menuitemradio, option, progressbar, scrollbar, separator, slider, switch, tab, treeitem

- **`<img alt="">`**
  - 암묵적 기본 역할:
    - x
  - 적용 가능한 역할:
    - x

- **`<img>`** (alt 속성 없이)
  - 암묵적 기본 역할:
    - role="img"
  - 적용 가능한 역할:
    - x

- **`<ul>`**, **`<ol>`**
  - 암묵적 기본 역할:
    - role="list"
  - 적용 가능한 역할:
    - directory, group, listbox, menu, menubar, none, presentation, radiogroup, tablist, toolbar, tree

- **`<li>`**
  - 암묵적 기본 역할:
    - role="listitem"
  - 적용 가능한 역할:
    - menuitem, menuitemcheckbox, menuitemradio,option, none, presentation, radio, separator, tab, treeitem

- **`<nav>`**
  - 암묵적 기본 역할:
    - role="navigation"
  - 적용 가능한 역할:
    - menu, menubar, tablist

- **`<svg>`**
  - 암묵적 기본 역할:
    - role="graphics-document"
  - 적용 가능한 역할:
    - 어떤 role이든 적용 가능

- **`<input type="button">`**
  - 암묵적 기본 역할:
    - role="button"
  - 적용 가능한 역할:
    - link, menuitem, menuitemcheckbox, menuitemradio, option, radio, switch, tab

- **`<input type="checkbox">`**
  - 암묵적 기본 역할:
    - role="checkbox"
  - 적용 가능한 역할:
    - button(사용할 경우 aria-pressed 함께 사용), menuitemcheckbox, option, switch

- **`<input type="radio">`**
  - 암묵적 기본 역할:
    - role="radio"
  - 적용 가능한 역할:
    - menuitemradio

- **`<input type="text">`**
  - 암묵적 기본 역할:
    - role="textbox"
  - 적용 가능한 역할:
    - combobox, searchbox, spinbutton



자세한 내용은 [https://www.w3.org/TR/html-aria/#docconformance](https://www.w3.org/TR/html-aria/#docconformance) 에서 확인할 수 있다.   
또 각 role 별로 필수 속성 및 지원이 가능한 속성도 별도로 있으니 [www.w3.org/TR/html-aria/#case-sensitivity](https://www.w3.org/TR/html-aria/#case-sensitivity) 에서 확인하면서 작업하면 도움이 될 것이다.


---

<br>

##### 참고
- [WAI-ARIA 접근성1. 소개 및 주의사항, 태그별 role의 사용](https://abcdqbbq.tistory.com/76)
- [https://www.w3.org/TR/html-aria/#docconformance](https://www.w3.org/TR/html-aria/#docconformance)
- [www.w3.org/TR/html-aria/#case-sensitivity](https://www.w3.org/TR/html-aria/#case-sensitivity)
