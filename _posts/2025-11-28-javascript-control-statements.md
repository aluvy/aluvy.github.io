---
title: "[JavaScript] 제어문 (control statements)"
date: 2025-11-28 08:36:00 +0900
categories: [JavaScript, basic]
tags: [제어문, control statements, 조건문, 반복문, 보조 제어문]
render_with_liquid: false
math: true
mermaid: true
---

## 제어문이란?

프로그램의 실행 과정을 제어하기 위해 사용하는 구문

##### 조건문

조건에 따라 다음 문장을 선택적으로 실행

- if
- if~else
- 다중 if~else
- switch~case

##### 반복문

동일한 명령을 여러 번 처리하거나 특정 연산을 반복적으로 처리

- for
- while
- do~while

##### 보조 제어문

조건문을 만나면 건너가거나 반복 수행을 종료, 반복문 내에서 사용

- continue
- break
- label


<br>

## 조건문

### if

조건식이 참(true)이면 블록 내의 문장을 처리하고, 거짓이면 블록을 빠져나감

````javascript
if (조건식) {
  실행 문장;
}

if (조건식A) {
  실행 문장;
  if (조건식B) {
    실행 문장;
  }
}
````


### if~else

조건식이 참(true)인 경우와 거짓(false)인 경우 처리할 문장이 각각 따로 있을 때 사용하는 제어문

````javascript
if (age >= 19){
  result = "성인입니다";
}
else {
  result = "미성년자입니다.";
}
````

ex) 성별과 성년 구분하는 프로그램 만들기

````javascript
var genter = "M"; // 남자(M), 여자(F)
var age = 21;

if(genter == "M"){
  if(age>=19){
    result = "남자 성인입니다.";
  } else {
    result = "남자 미성년자입니다.";
  }
} else {
  if(age>=19){
    result = "여자 성인입니다.";
  } else {
    result = "여자 미성년자입니다.";
  }
}
document.write("당신은"+ result +"<br>");
````


### 다중 if~else

여러 조건을 체크해야 할 때 사용

````javascript
if(조건식-1){
  조건식-1의 결과가 참일 때 실행할 문장;
} else if (조건식-2){
  조건식-2의 결과가 참일 때 실행할 문장;
} else {
  조건식-1, 조건식-2 모두 거짓일 때 실행할 문장;
}
````

ex) 학점 환산 프로그램 만들기

````javascript
var point = 93; //과목 점수
var grade = "";

if(point>100){
  document.write("0~100점 사이 값을 입력해야 합니다."+"<br>");
} else if(point>=90){
  grade = "A";
  document.write("아주 잘했어요."+"<br>");
} else if(point>=80){
  grade = "B";
  document.write("잘했어요"+"<br>");
} else if(point>=70){
  grade = "C";
  document.write("조금만 노력하면 잘할 수 있어요."+"<br>");
} else if(point>=60){
  grade = "D";
  document.write("좀 더 노력하세요."+"<br>");
} else {
  grade = "F";
  document.write("많이 노력하시기 바랍니다."+"<br>");
}

document.write("학생의 학점은 <b>"+ grade +"</b>입니다.");
````


### switch~case

조건문을 체크하여 다음에 처리할 문장의 위치를 파악한 후 해당 문장으로 바로 가서 처리

````javascript
switch (상수값){
  case n:
    실행 문장;
    break;
  case n:
    실행 문장;
    break;
  default:
    기본 실행 문장;
}
````

ex) 요일을 알려주는 프로그램 만들기

````javascript
var day;
var week = new Date().getDay(); // 0(일요일)~6(토요일)

switch(week){
  case 0:
    day="일요일";
    break;
  case 1:
    day="월요일";
    break;
  case 2:
    day="화요일";
    break;
  case 3:
    day="수요일";
    break;
  case 4:
    day="목요일";
    break;
  case 5:
    day="금요일";
    break;
  case 6:
    day="토요일";
    break;
  default:
    day="없는 요일";
}
document.write("오늘은<b>"+ day +"</b>입니다.<br>");
````

<br>

## 반복문

### for

````javascript
// for문 형식
for(초기식; 조건식; 증감식){
  실행 문장;
}
````

- 초기식: 반복 변수값을 초기화하여, for문이 처음 시작할 때 단 한 번만 실행
- 조건식: 블록 내 문장을 얼마나 반복할지 결정하며, 조건식이 참인 동안 반복
- 증감식: 초기식에서 초기화한 변수의 값을 증가 또는 감소

ex) 구구단 프로그램 만들기

````javascript
var x, y;

for(x=2; x<=5; x++){
  document.write("<b>"+ x + "단<br>");
  for(y=1; y<=9; y++){
    document.write(x + "*" + y + "=" + x*y + "<br>");
  }
}
````


### while

ex) 1부터 100까지 합 구하기

````javascript
var a = 1;
var sum = 0;

while(a<=100){
  sum += a;
  a++;
}
document.write("1~100까지 합 : <b>"+ sum +"</b><br>");
````

ex) 1부터 10000까지 합 구하기

````javascript
var b = 1;
var summ = 0;

while(1){
  summ += b;
  b++;
  if(b==10001)
  break;
}
document.write("1~10000 까지의 합 : <b>"+ summ + "<b>");
````


### do~while문

ex) 1부터 100까지 합 구하기

````javascript
var c = 1;
var summm = 0;

do {
  summm += c;
  c++;
} while(c<=100);

document.write("1~100까지 합 : <b>"+ summm +"</b><br>");
````

<br>

## 보조 제어문

### break

for문, while문, do~while문과 같은 반복문이나   
switch~case문 내에서 해당 블록을 강제적으로 벗어나 다음 문장을 처리하도록 할 때 사용

ex) break문으로 1부터 100까지 수 중 3의 배수 합 구하기

````javascript
var d = 0;
var sum = 0;

while(1){
  d += 3;
  if(d>100)
    break;
  sum += d;
  document.write(d + " ");
}
document.write("<br><Br>");
document.write("1~100까지 수 중 3의 배수 합 : <b>"+ sum +"</b><br>");
````


### continue

if문의 조건식이 참이면 continue문 이후 문장을 처리하지 않고 제어를 반복문의 시작 위치로 옮김

ex) continue문으로 1부터 100까지 수 중 3의 배수 합 구하기

````javascript
var e = 0;
var sum = 0;

for(e=1; e<=100; e++){
  if(e%3 != 0)
    continue;
  sum += e;
  document.write(e + " ");
}
document.write("<br><br>");
document.write("1~100까지 수 중 3의 배수 합 : <b>" + sum + "</b><br>");
````


### label

제어를 블록 바깥으로 옮김

````javascript
var i, j;
outloop;
for(i=0; i<3; i++){
  inloop;
  for(j=0; j<3; j++){
    if(i===0 && j===0){
      continue outloop;
    }
    document.write("i = "+ i +", j = "+ j +"<br>");
  }
}
````
