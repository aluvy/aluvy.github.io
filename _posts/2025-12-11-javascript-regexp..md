---
title: "[JavaScript] RegExp, 정규표현식"
date: 2025-12-11 08:49:00 +0900
categories: [JavaScript, etc]
tags: [regexp, 정규표현식]
render_with_liquid: false
math: true
mermaid: true
---

## RegExp, 정규 표현식이란?

정규표현식은 문자를 검색하거나 대체하거나 추출하는 패턴이다.

정규표현식을 만드는 방법은 생성자 방식과 리터럴 방식이 있습니다.

**생성자 방식**

````javascript
// new RegExp('표현', '옵션')
new RegExp('[a-z]', 'gi')
````
- 생성자 방식은 RegExp 클래스를 사용하여 정규식을 만드는 방식으로, 표현과 옵션을 통해 문자 검색이 가능하다.


**리터럴 방식**

````javascript
// /표현/옵션
/[a-z]/gi
````

- 리터럴 방식은 / 와 / 사이에 표현이 들어가고 두 번째 / 뒤에 옵션을 추가하여 정규식을 만드는 방식이다.
- 많은 경우 리터럴 방식을 사용하지만 간혹 생성자 방식을 사용해야 하는 패턴도 존재한다.


## 자주 사용하는 정규표현식

- 숫자 천 단위마다 콤마(,) 찍기

````javascript
var number = 12975000;
var money = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
alert(money);
````

- 핸드폰번호

````javascript
var regExp = /^\d{3}-\d{3,4}-\d{4}$/;
````

- 일반 전화번호

````javascript
var regExp = /^\d{2,3}-\d{3,4}-\d{4}$/;
````
