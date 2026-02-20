---
title: "input type number를 비밀번호로 표시하기, 모바일 숫자키패드"
date: 2022-08-17 18:32:00 +0900
categories: [CSS, CSS-basic]
tags: []
render_with_liquid: false
math: true
mermaid: true
---


HTML input type 속성은 하나의 타입만 허용한다.   
number나, password냐   
둘 중 하나를 골라야 한다. 그런데 숫자만 입력 받고, 모바일에서 숫자 키패드가 뜨고, 비밀번호로 표시하고 싶다면?

## 모바일에서 숫자 키패드가 뜨고, 비밀번호로 표시하고 싶다면?

````html
<input type="number" inputmode="numeric" class="input-number-password">
````

````css
.input-number-password{
  -webkit-text-security: disc;
}
````

- type="number"는 숫자 인풋이다.
- inputmode="numeric" 모바일 디바이스에서 일반 키패드 대신 숫자 키패드를 띄운다.
- class="input-number-password" 웹킷 힌트를 준 클래스를 적용했다.

-webkit-text-security 값으로는 disc 말고도 square나 circle 등이 올 수 있으나, disc가 가장 일반적인 패스워드 표시 형식이다. (검게 칠한 동그라미)


## 모바일 키패드 숫자로 표시하기
````html
<input type="password" inputmode="numeric" pattern="[0-9]*" >
````


---
<br>

##### 참고

- [input type number를 비밀번호로 표시하기](https://server0.tistory.com/74)
- [inputmode](https://developer.mozilla.org/ko/docs/Web/HTML/Reference/Global_attributes/inputmode)
