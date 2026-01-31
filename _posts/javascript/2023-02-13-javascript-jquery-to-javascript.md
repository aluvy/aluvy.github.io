---
title: "[JavaScript] jQuery 함수를 JavaScript로 구현하기"
date: 2023-02-13 00:15:00 +0900
categories: [JavaScript]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## jQuery보다 JavaScript를 선택해야 하는 이유

웹 개발을 하다 보면 jQuery를 사용할지, JavaScript를 사용할지 고민하게 된다.   
한때 jQuery는 웹 개발의 필수 도구였지만, 현대 웹 환경에서는 JavaScript가 여러 측면에서 더 나은 선택이 될 수 있다.

- **성능과 사용자 경험**
  - 웹 성능은 더 이상 선택이 아닌 필수! JavaScript는 브라우저 네이티브 API를 직접 사용하기 때문에 jQuery보다 30-50% 빠른 DOM 조작 속도를 보인다. 중간 추상화 레이어가 없어 불필요한 오버헤드가 발생하지 않기 때문이다.

- **파일 크기와 로딩 속도**
  - jQuery 3.7.1은 압축 후에도 약 30KB의 용량을 차지한다. 반면 JavaScript는 추가 라이브러리가 필요 없어 0KB다. 이 차이는 초기 로딩 시간 단축으로 직결되며, Core Web Vitals 점수 향상에 기여한다. 특히 모바일 환경에서 30KB는 결코 작은 용량이 아니다.

- **브라우저 표준의 진화**
  - 현대 브라우저들은 `querySelector`, `fetch`, `classList` 등 jQuery의 핵심 기능을 모두 네이티브로 지원한다. 2006년 jQuery가 해결하려던 브라우저 호환성 문제는 더 이상 존재하지 않습니다.

- **의존성 제로, 리스크 제로**
  - 외부 라이브러리는 보안 취약점, 버전 관리, Breaking Changes라는 리스크를 동반한다. JavaScript는 이 모든 문제에서 자유롭다. 유지보수 비용이 줄어들고, 코드의 수명이 길어진다.


### You might not need jQuery
기존의 제이쿼리 코드를 바닐라 자바스크립트로 구현한 예제 모음 사이트다.   
사이트 이름만 보면 알수있듯이 제이쿼리 존재를 전적으로 부인하고 있다. 다만 복잡한 메서드는 몇가지 빠져 있는 듯 하다.

- [You Might Not Need jQuery](https://youmightnotneedjquery.com/)



## AJAX

### getJSON()

- jQuery   

  ````javascript
  $.getJSON('/my/url', function (data) {});
  ````

- JavaScript   

  ````javascript
  const response = await fetch('/my/url');
  const data = await response.json();
  ````


### load()

- jQuery   

  ````javascript
  $('#some.selector').load('/path/to/template.html');
  ````

- JavaScript   

  ````javascript
  const response = await fetch('/path/to/template.html');
  const body = await response.text();

  document.querySelector('#some.selector').innerHTML = body;
  ````


### ajax()

- jQuery   

  ````javascript
  $.ajax({
    type: 'POST',
    url: '/my/url',
    data: data
  });
  ````

- JavaScript   

  ````javascript
  await fetch('/my/url', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  ````





## Effects


### fadeIn()

- jQuery   

  ````javascript
  $(el).fadeIn();
  ````

- JavaScript   

  ````javascript
  el.classList.replace('hide', 'show');
  ````
  ````css
  .show {
    transition: opacity .4s;
  }
  .hide {
    opacity: 0;
  }
  ````


### fadeOut()

- jQuery   

  ````javascript
  $(el).fadeOut();
  ````

- JavaScript   

  ````javascript
  el.classList.replace('show', 'hide');
  ````
  ````css
  .show {
    opacity: 1;
  }
  .hide {
    opacity: 0;
    transition: opacity .4s;
  }
  ````

### hide()

- jQuery   

  ````javascript
  $(el).hide();
  ````

- JavaScript   

  ````javascript
  el.style.display = 'none';
  ````


### show()

- jQuery

  ````javascript
  $(el).show();
  ````

- JavaScript

  ````javascript
  el.style.display = '';
  ````


### toggle()

- jQuery

  ````javascript
  $(el).toggle();
  ````

- JavaScript

  ````javascript
  function toggle(el) {
    if (el.style.display == 'none') {
      el.style.display = '';
    } else {
      el.style.display = 'none';
    }
  }
  ````



## Elements

### addClass()

- jQuery

  ````javascript
  $(el).addClass(className);
  ````

- JavaScript

  ````javascript
  el.classList.add(className);
  ````

### after()

- jQuery

  ````javascript
  $(target).after(element);
  ````

- JavaScript

  ````javascript
  target.after(element);
  ````

### append()

- jQuery

  ````javascript
  $(parent).append(el);
  ````

- JavaScript

  ````javascript
  parent.append(el);
  ````

### before()

- jQuery

  ````javascript
  $(target).before(element);
  ````

- JavaScript

  ````javascript
  target.before(el);
  ````

### children()

- jQuery

  ````javascript
  $(el).children();
  ````

- JavaScript

  ````javascript
  el.children;
  ````

### clone()

- jQuery

  ````javascript
  $(el).clone();
  ````

- JavaScript

  ````javascript
  el.cloneNode(true);
  ````

### closet()

- jQuery

  ````javascript
  $(el).closest(sel);
  ````

- JavaScript

  ````javascript
  el.closest(sel);
  ````

### contents()

- jQuery

  ````javascript
  $(el).contents();
  ````

- JavaScript

  ````javascript
  el.childNodes;
  ````

### create element

- jQuery

  ````javascript
  $('<div>Hello World!</div>');
  ````

- JavaScript

  ````javascript
  function generateElements(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.children;
  }

  generateElements('<div>Hello World!</div>');
  ````

### find()

- jQuery

  ````javascript
  $(el).find(selector);
  ````

- JavaScript

  ````javascript
  // For direct descendants only, see https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll#user_notes
  el.querySelectorAll(`:scope ${selector}`);
  ````

### innerHeight()

- jQuery

  ````javascript
  $(el).innerHeight();
  $(el).innerHeight(150);
  ````

- JavaScript

  ````javascript
  function innerHeight(el, value) {
    if (value === undefined) {
      return el.clientHeight;
    } else {
      el.style.height = value;
    }
  }

  innerHeight(el);
  innerHeight(el, 150);
  ````

### innerWidth()

- jQuery

  ````javascript
  $(el).innerWidth();
  $(el).innerWidth(150);
  ````

- JavaScript

  ````javascript
  function innerWidth(el, value) {
    if (value === undefined) {
      return el.clientWidth;
    } else {
      el.style.width = value;
    }
  }

  innerWidth(el);
  innerWidth(el, 150);
  ````

### ishidden()

- jQuery

  ````javascript
  $(el).is(':hidden');
  ````

- JavaScript

  ````javascript
  function isHidden(el) {
    return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  }
  ````

### isVisible()

- jQuery

  ````javascript
  $(el).is(':visible');
  ````

- JavaScript

  ````javascript
  function isVisible(el) {
    return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  }
  ````


### last()

- jQuery

  ````javascript
  $(el).last();
  ````

- JavaScript

  ````javascript
  [...document.querySelectorAll(el)].at(-1);
  ````

### next()

- jQuery

  ````javascript
  $(el).next();
  ````

- JavaScript

  ````javascript
  function next(el, selector) {
    const nextEl = el.nextElementSibling;
    if (!selector || (nextEl && nextEl.matches(selector))) {
      return nextEl;
    }
    return null;
  }

  next(el);
  // Or, with an optional selector
  next(el, '.my-selector');
  ````

### offset()

- jQuery

  ````javascript
  $(el).offset();
  ````

- JavaScript

  ````javascript
  function offset(el) {
    box = el.getBoundingClientRect();
    docElem = document.documentElement;
    return {
      top: box.top + window.pageYOffset - docElem.clientTop,
      left: box.left + window.pageXOffset - docElem.clientLeft
    };
  }
  ````

### outerHeight(true)

- jQuery

  ````javascript
  $(el).outerHeight(true);
  ````

- JavaScript

  ````javascript
  function outerHeight(el) {
    const style = getComputedStyle(el);

    return (
      el.getBoundingClientRect().height +
      parseFloat(style.marginTop) +
      parseFloat(style.marginBottom)
    );
  }

  outerHeight(el);
  ````

### outerWidth(true)

- jQuery

  ````javascript
  $(el).outerWidth(true);
  ````

- JavaScript

  ````javascript
  function outerWidth(el) {
    const style = getComputedStyle(el);

    return (
      el.getBoundingClientRect().width +
      parseFloat(style.marginLeft) +
      parseFloat(style.marginRight)
    );
  }

  outerWidth(el);
  ````

### parents()

- jQuery

  ````javascript
  $(el).parents(selector);
  ````

- JavaScript

  ````javascript
  function parents(el, selector) {
    const parents = [];
    while ((el = el.parentNode) && el !== document) {
      if (!selector || el.matches(selector)) parents.push(el);
    }
    return parents;
  }
  ````

  ### position()

- jQuery

  ````javascript
  $(el).position();
  ````

- JavaScript

  ````javascript
  function position(el) {
    const {top, left} = el.getBoundingClientRect();
    const {marginTop, marginLeft} = getComputedStyle(el);
    return {
      top: top - parseInt(marginTop, 10),
      left: left - parseInt(marginLeft, 10)
    };
  }
  ````

### prev()

- jQuery

  ````javascript
  $(el).prev();
  // Or, with an optional selector
  $(el).prev('.my-selector');
  ````

- JavaScript

  ````javascript
  function prev(el, selector) {
    const prevEl = el.previousElementSibling;
    if (!selector || (prevEl && prevEl.matches(selector))) {
      return prevEl;
    }
    return null;
  }

  prev(el);
  // Or, with an optional selector
  prev(el, '.my-selector');
  ````

### remove()

- jQuery

  ````javascript
  $(el).remove();

  // multiple elements
  $(selector).remove();
  ````

- JavaScript

  ````javascript
  el.remove();

  // multiple elements
  for (const el of document.querySelectorAll(selector)) {
    el.remove();
  }
  ````

### scrollLeft()

- jQuery

  ````javascript
  $(window).scrollLeft();
  ````

- JavaScript

  ````javascript
  function scrollLeft(el, value) {
    var win;
    if (el.window === el) {
      win = el;
    } else if (el.nodeType === 9) {
      win = el.defaultView;
    }

    if (value === undefined) {
      return win ? win.pageXOffset : el.scrollLeft;
    }

    if (win) {
      win.scrollTo(value, win.pageYOffset);
    } else {
      el.scrollLeft = value;
    }
  }
  ````

### scrollTop()

- jQuery

  ````javascript
  $(window).scrollTop();
  ````

- JavaScript

  ````javascript
  function scrollTop(el, value) {
    var win;
    if (el.window === el) {
      win = el;
    } else if (el.nodeType === 9) {
      win = el.defaultView;
    }

    if (value === undefined) {
      return win ? win.pageYOffset : el.scrollTop;
    }

    if (win) {
      win.scrollTo(win.pageXOffset, value);
    } else {
      el.scrollTop = value;
    }
  }
  ````

### height(value)

- jQuery

  ````javascript
  $(el).height(val);
  ````

- JavaScript

  ````javascript
  function setHeight(el, val) {
    if (typeof val === 'function') val = val();
    if (typeof val === 'string') el.style.height = val;
    else el.style.height = val + 'px';
  }

  setHeight(el, val);
  ````

### width(value)

- jQuery

  ````javascript
  $(el).width(val);
  ````

- JavaScript

  ````javascript
  function setWidth(el, val) {
    if (typeof val === 'function') val = val();
    if (typeof val === 'string') el.style.width = val;
    else el.style.width = val + 'px';
  }

  setWidth(el, val);
  ````

### siblings()

- jQuery

  ````javascript
  $(el).siblings();
  ````

- JavaScript

  ````javascript
  [...el.parentNode.children].filter((child) => child !== el);
  ````

### val()

- jQuery

  ````javascript
  $(el).val();
  ````

- JavaScript

  ````javascript
  function val(el) {
    if (el.options && el.multiple) {
      return el.options
        .filter((option) => option.selected)
        .map((option) => option.value);
    } else {
      return el.value;
    }
  }
  ````


## Events

### .on()

- jQuery

  ````javascript
  $(el).on(eventName, eventHandler);
  // Or when you want to delegate event handling
  $(el).on(eventName, selector, eventHandler);
  ````

- JavaScript

  ````javascript
  function addEventListener(el, eventName, eventHandler, selector) {
    if (selector) {
      const wrappedHandler = (e) => {
        if (!e.target) return;
        const el = e.target.closest(selector);
        if (el) {
          eventHandler.call(el, e);
        }
      };
      el.addEventListener(eventName, wrappedHandler);
      return wrappedHandler;
    } else {
      const wrappedHandler = (e) => {
        eventHandler.call(el, e);
      };
      el.addEventListener(eventName, wrappedHandler);
      return wrappedHandler;
    }
  }

  // Use the return value to remove that event listener, see #off
  addEventListener(el, eventName, eventHandler);
  // Or when you want to delegate event handling
  addEventListener(el, eventName, eventHandler, selector);
  ````

### .ready()

- jQuery

  ````javascript
  $(document).ready(function () {});
  ````

- JavaScript

  ````javascript
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }
  ````

### parseHTML()

- jQuery

  ````javascript
  $.parseHTML(htmlString);
  ````

- JavaScript

  ````javascript
  function parseHTML(str) {
    const tmp = document.implementation.createHTMLDocument('');
    tmp.body.innerHTML = str;
    return [...tmp.body.childNodes];
  }

  parseHTML(htmlString);
  ````

---

<br>

##### 참고

- [You might not need jQuery](https://youmightnotneedjquery.com/)
- [♻️ 제이쿼리 함수를 → 자바스크립트로 구현 (모음집)](https://inpa.tistory.com/entry/JS-%E2%99%BB%EF%B8%8F-제이쿼리-함수-→-자바스크립트로-변환-모음)

