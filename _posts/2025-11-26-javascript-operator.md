---
title: "[JavaScript] 연산자 (operator)"
date: 2025-11-26 15:37:00 +0900
categories: [JavaScript, basic]
tags: [연산자, operator]
render_with_liquid: false
math: true
mermaid: true
---

연산자란 피연산자에게 연산 명령을 내리기 위해 사용하는 기호다.

## 01. 문자열 연산자

'+' 기호를 사용하여 문자열을 연결

|             |      |
| :---------- | :--- |
| 문자열 연결 | +    |

````javascript
var st="Hello"+"Javascript"; // Hello Javascript

var st="100"+10 // 10010
var st=100+10; // 110
````

<br>

## 02. 산술 연산자

사칙 연산을 수행

|          |      |
| :------- | :--- |
| 증가연산 | ++   |
| 감소연산 | --   |
| 곱셈     | *    |
| 나눗셈   | /    |
| 나머지   | %    |
| 덧셈     | +    |
| 뺄셈     | -    |

> - 나머지(%) : 나눗셈 결과 나머지 값을 구함   
> - 증가(++) : 변수 값을 증가시킴   
> - 감소(--) : 변수 값을 감소시킴   
{: .prompt-info}

````javascript
var incData=1;
var decData-5;

var r1=r2=0; //나머지 연산
document.write("15%3 ="+ r1 +"<br>");// 3
document.write("incData++ ="+ incData++ +"<br>"); // 1 후위 증가 (출력 후 증가)
document.write("++incData ="+ ++incData +"<br>"); // 3 전위 증가
document.write("decData-- ="+ decData-- +"<br>"); // 5 후위 감소 (출력 후 감소)
document.write("--decData ="+ --decData +"<br>"); // 3 전위 감소
r2=incData*decData; //곱셈 연산
document.write("incData*decData ="+ r2 +"<br>"); // 9
````

<br>

## 03. 비교 연산자

두 피연산자의 값을 비교하여 참(true) 또는 거짓(false) 값을 반환

|                       |      |
| :-------------------- | :--- |
| 작다                  | <    |
| 작거나 같다           | <=   |
| 크다                  | >    |
| 크거나 같다           | >=   |
| 값이 같다             | ==   |
| 값이 다르다           | !==  |
| 값과 타입 모두 같다   | ===  |
| 값 또는 타입이 다르다 | !==  |


| 비교연산자 | 설명                       | 사용 예 | 결과  |
| :--------- | :------------------------- | :------ | :---- |
| ==         | 값이 같은지 비교           | 5=="5"  | true  |
| ===        | 값과 타입이 같은지 비교    | 5==="5" | false |
| !=         | 값이 다른지 비교           | 5!="5"  | true  |
| !==        | 값 또는 타입이 다른지 비교 | 5!=="5" | false |

````javascript
var x=5;
var y="5";
var result;

result=(x>y); // 비교 연산
document.write("x > y : "+ result +"<br>"); // x > y : false

result=(x==y); // 두 값이 같은지 비교
document.write("x == y : "+ result +"<br>"); // x == y : true

result=(x===y); // 두 값과 타입이 같은지 비교
document.write("x === y : "+ result +"<br>"); // x === y : false

result=(x!=y); // 두 값이 다른지 비교
document.write("x != y : "+ result +"<br>"); // x != y : false

result=(x!==y); //두 값이 다르거나 또는 타입이 다른지 비교
document.write("x !== y : "+ result +"<br>"); // x !== y : true
````

<br>

## 04. 논리 연산자

일반 논리 연산자와 비트 논리 연산자로 나뉜다

### 일반 논리 연산자
|      |           |                                                                     |
| :--- | :-------- | :------------------------------------------------------------------ |
| &&   | 논리 곱   | 두 개의 피연산자 값이 모두 참일 때만 참이고, 하나라도 거짓이면 거짓 |
| \|\| | 논리 합   | 두 개의 피연산자 값 중 하나라도 참이면 참이고, 모두 거짓이면 거짓   |
| !    | 논리 부정 | 피연산자 값이 참이면 거짓, 거짓이면 참                              |

````javascript
var x=5;
var y=7;
var result;

result=(x<10 && y>10); // 논리곱
document.write("(x<10 && y>10 :"+ result +"<br>"); // (x<10 && y>10) : false

result=(x<10 || y>10); // 논리합
document.write("(x<10 || y>10 :"+ result +"<br>"); // (x<10 || y>10) : true

result=!(x<10 && y>10); // 논리 부정
document.write("!(x<10 && y>10 :"+ result +"<br>"); // !(x<10 && y>10) : true
````

<br>

### 비트 논리 연산자

|      |               |                                               |
| :--- | :------------ | :-------------------------------------------- |
| &    | 비트곱        | 두 비트 모두 1일 때만 1이고, 하나라도 0이면 0 |
| \|   | 비트합        | 두 비트 중 하나라도 1이면 1이고, 모두 0이면 0 |
| ~    | 비트 부정     | 비트 값이 1이면 0, 0이면 1                    |
| ^    | 배타적 비트합 | 두 비트가 같을 때 0이고, 다를 때 1            |

````javascript
var x=5; // 0101 (2진수로 변환)
var y=7; // 0111 (2진수로 변환)
var result;

result=(x & y); // 비트곱
document.write("x & y = "+ result +"<br>"); // x & y = 5

result=(x | y); // 비트합
document.write("x | y = "+ result +"<br>"); // x | y = 7

result=(x ^ y); // 배타적 비트합
document.write("x ^ y = "+ result +"<br>"); // x ^ y = 2

result=(~x); // 비트 부정
document.write("~x = "+ result +"<br>"); // ~x = -6
````

<br>

## 05. 조건 연산자

조건식을 판별하여 참이냐 거짓이냐에 따라 다음 문장을 선택적으로 실행

|      |                 |
| :--- | :-------------- |
| 판단 | ? true : false; |

````javascript
Max_value=(a>b) ? A : b; // a, b 중 큰 값을 저장

var x=5;
var y=7;
var reseult;

result=(x>y) ? x : y; // 조건 연산
document.write("큰 값 : "+ result +"<br>"); // 큰 값 : 7

result=(x>y) ? x-y : y-x; // 조건 연산
document.write("큰 값-작은 값 : "+ result +"<br>"); // 큰 값-작은 값 : 2
````

<br>

## 06. 대입 연산자

'=' 기호를 사용하여 값이나 변수를 할당


|       |       |       |       |       |       |
| :---: | :---: | :---: | :---: | :---: | :---: |
|   =   |  +=   |  -=   |  *=   |  \/=  |  5=   |
|  <<=  |  >>=  | >>>=  |  &=   | \| =  |  ^=   |

````javascript
var x1=x2=x3=x4=x5=10;
var st="Hello";

x1 += 1;
document.write("x1 :"+ x1 +"<br>"); // x1 : 11

x2 -= 2;
document.write("x2 :"+ x2 +"<br>"); // x2 : 8

x3 *= 3;
document.write("x3 :"+ x3 +"<br>"); // x3 : 30

x4 /= 4;
document.write("x4 :"+ x4 +"<br>"); // x4 : 2.5

x5 %= 5;
document.write("x5 :"+ x5 +"<br>"); // x5 : 0

st += "Javascript";
document.write("st :"+ st +"<br>"); // st : Hello Javascript
````
