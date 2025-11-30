---
title: "[JavaScript] 함수 (Function)"
date: 2025-11-30 19:03:00 +0900
categories: [JavaScript, basic]
tags: [함수, function]
render_with_liquid: false
math: true
mermaid: true
---

## 함수 선언과 호출 형식

````javascript
function 함수명(매개변수1, 매개변수2, ···){ //함수선언
  실행 문장;
  return 반환값;
}

함수명(인자1, 인자2, ···); //함수 호출
````

- **인자**: 함수를 호출할 때 전달하는 입력값
- **매개변수**: 함수 호출문에서 전달한 인자를 받기 위해 선언된 변수
- **function**: 함수를 선언할 때 사용하는 키워드
- **return**: 함수에서 수행한 결과값을 반환할 때 사용하는 키워드

<br>

## 함수 선언 - 일반적인 방법(기본 함수)

### 기본 함수 호출하기

````javascript
var text1 = "함수 선언 전 호출";
var text2 = "함수 선언 후 호출";
printMsg(text1); //함수 선언 전 호출

function printMsg(msg){ //함수 선언
  document.write("함수 호출 메세지 : "+ msg +"<br>");
}
printMsg(text2);
````

### onclick 속성값으로 함수 호출하기

````html
<script>
  // onclick 속성값으로 함수 호출하기
  function printMsg(name, age){ //함수 선언
    document.write("학생 이름 : <b>"+ name +"</b><br>");
    document.write("학생 나이 : <b>"+ age +"</b><br>");
  }
</script>
<button type="button" onclick="printMsg('홍길동',21)">학생정보</button>
````

### 함수 표현식으로 작성하는 방법(무명함수)

````javascript
var 변수명 = function(매개변수1, 매개변수2, ···){ // 함수 선언
  실행 문장;
}
변수명(인자1, 인자2, ···); //함수 호출
````

### 무명 함수 호출하기

````javascript
//무명 함수 호출하기
var text1="함수 선언 전 호출 에러";
var text2="함수 선언 후 호출만 가능";

//printMsg(text1); //함수 선언 전 호출 에러
var printMsg=function(msg){ //함수 객체 선언
  document.write("함수 호출 메세지 : "+ msg +"<br>");
}
printMsg(text2); //함수 선언 후 호출 가능
````

<br>

## 함수 선언문과 호출문

### 변수를 이용하여 반환값 출력하기

````javascript
var result;
function add(name, n){
  document.write(name +"학생이 1부터"+ n +"까지 덧셈 수행<br>");
  var sum = 0;
  for(var i=1; i<=n; i++){
    sum += i;
  }
  return sum;
}

result=add('홍길동', 10);
document.write("결과 : "+ result +"<br>");
result=add('이영희', 100);
document.write("결과 : "+ result +"<br>");
````

### 서로 다른 변수로 같은 함수의 반환값 출력하기

````javascript
function add(x,y){
  return x + y;
}
var calSum = add;  // 함수를 변수에 할당
var addUp = add;  // 함수를 변수에 할당
document.write("결과 값 : "+ calSum(5, 10) +"<br>");
document.write("결과 값 : "+ addUp(3, 20) +"<br>");
````

<br>

## 인자와 매개 변수

````javascript
Function 함수명(매개변수1, 매개변수2, 매개변수3){  // 함수 선언
  실행 문장;
  return 반환값;
}
result=함수명(인자1, 인자2, 인자3);  // 함수 호출
````

### 자바스크립트 코드의 실행 순서 살펴보기

````javascript
function add(){
  var sum = 1;
  return sum;
}
function add(x){
  var sum = x + 1;
  return sum;
}
function add(x,y){
  var sum = x + y;
  return sum;
}
function add(x,y,z){
  var sum = x + y + z;
  return sum;
}

var r0=add();
var r1=add(1);
var r2=add(2,3);
var r3=add(4,5,6);
var r4=add(7,8,9,10);

document.write("함수 호출 인자 없음 : "+ r0 +"<br>");
document.write("함수 호출 인자 부족 : "+ r1 +"<br>");
document.write("함수 호출 인자 부족 : "+ r2 +"<br>");
document.write("정상적인 함수 호출 : "+ r3 +"<br>");
document.write("7, 8, 9만 인자값으로 적용 : "+ r4 +"<br>");
````

### 인자의 개수가 적을 때 처리 방법 살펴보기

````javascript
function add(x,y,z){
  var sum;
  if((y===undefined) && (z===undefined)){
    sum = x;
  } else if(z===undefined){
    sum = x + y;
  } else{
    sum = x + y + z;
  }
  return sum;
}

var r1=add(2);
var r2=add(2,3);
var r3=add(4,5,6);

document.write("함수 호출 인자 부족 : "+ r1 +"<br>");
document.write("함수 호출 인자 부족 : "+ r2 +"<br>");
document.write("정상적인 함수 호출 : "+ r3 +"<br>");
````

### 인자를 arguments 객체로 처리하기

````javascript
function add(){
  var i, sum = 0;
  for(i=0; i<arguments.length; i++){
    sum = sum + arguments[i];
  }
  document.write("수행 결과 : "+ sum +"<br>");
}
add(2, 3);
add(2, 3, 4);
add(4,5,6,7,8);
add(1,2,3,4,5,6,7,8,9,10);
````
