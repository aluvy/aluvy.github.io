---
title: "[JavaScript] 객체 (Object)"
date: 2021-11-02 19:22:00 +0900
categories: [JavaScript, basic]
tags: [객체, object]
render_with_liquid: false
math: true
mermaid: true
---

객체는 세상에 존재하는 모든 것이다.

## 자동차 객체의 모델링

- 객체
  - car
- 속성
  - `car.nave = "Sonata"`
  - `car.speed = 100`
  - `car.color = "White"`
  - `car.door = 4`
  
- 메소드
  - `car.start(){}`
  - `car.accel(){}`
  - `car.break(){}`
  - `car.transe(){}`

## 자바스크립트 객체

- 사용자 정의 객체
  - 사용자가 직접 객체의 속성과 메소드를 정의하여 사용하는 객체
  - `car()`, `house()`, `hotel()`
- 내장 객체
  - 자바스크립트 프로그램 자체에서 정의하여 사용자에게 제공하는 객체
  - `object()`, `array()`, `date()`

## 날짜를 지정하는 Date 객체

웹 페이지에 오늘의 날짜와 시간 및 요일 등을 표시

> get메소드 : 시스템에 설정된 날짜 중에서 월과 일만 개별적으로 추출
{: .prompt-tip}

- `getYear()` : 연도를 표시
- `getMonth()` : 월을 표시
- `getDate()` : 일을 표시
- `setYear()` : 1970년 이상의 연도를 설정
- `setMonth()` : 월을 설정
- `setDate()` : 일을 설정
- `setDay()` : 요일을 설정

````javascript
today = new Date();

document.write("오늘 날짜를 출력합니다.<br>");
document.write((today.getYear()+1900) + "년 "); // 1900계산
document.write((today.getMonth()+1) + "월 ");
document.write(today.getDate()+"일 입니다.<hr>");

document.write("지금 시간을 출력합니다.<br>");
if(today.getHours()<=12)
  document.write("오전 "+ today.getHours()+ "시")
  else
  document.write("오후 "+ (today.getHours()-12)+ "시")
document.write(today.getMinutes()+"분");
document.write(today.getSeconds()+"초 입니다<hr>");
````

## Date 객체를 이용하여 오늘의 요일 표시하기

Date 객체를 이용, 오늘의 요일 표시

- `getDay()` 메소드: 요일을 표시 - 0=일, 1=월, 2=화, 3=수, 4=목, 5=금, 6=토
- `setDay()` 메소드: 요일을 설정 - 0=일, 1=월, 2=화, 3=수, 4=목, 5=금, 6=토

````javascript
today = new Date();

document.write("오늘이 무슨 요일일까요?<br>")
switch(today.getDay()){
  case 0 : document.write("일요일입니다.<br>"); break;
  case 1 : document.write("월요일입니다.<br>"); break;
  case 2 : document.write("화요일입니다.<br>"); break;
  case 3 : document.write("수요일입니다.<br>"); break;
  case 4 : document.write("목요일입니다.<br>"); break;
  case 5 : document.write("금요일입니다.<br>"); break;
  case 6 : document.write("토요일입니다.<br>"); break;
}
````

## D-day 구하기

Date 객체로 객체 변수를 선언할 때 생성자에 매개변수를 지정하지 않으면 오늘 날짜가 지정

**getTime()**

- 두 날짜 사이의 차 구하기
- 설정된 날자를 1/1000초 단위로 환산하여 차를 구한 후 몇 일인지 환산

````javascript
var theday = new Date(2000,6,7);  // 1월이 0이기 때문에 -1 해준다
var today = new Date();

var cnt = today.getTime() - theday.getTime();
cnt = Math.ceil(cnt/(24*60*60*1000));

document.write("<h3>우리 만난 지<h3>"+ cnt +"일 째");
````
