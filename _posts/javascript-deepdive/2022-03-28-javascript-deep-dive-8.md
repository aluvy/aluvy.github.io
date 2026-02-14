---
title: "[Deep Dive] 8장 제어문"
date: 2022-03-28 21:50:00 +0900
categories: [JavaScript, Deep Dive]
tags: [deep dive]
render_with_liquid: false
math: true
mermaid: true
---

제어문(Control flow statement)은 조건에 따라 코드 블록을 실행(조건문)하거나 반복 실행(반복문)할 때 사용한다.   
일반적으로 코드는 위에서 아래 방향으로 순차적으로 실행된다. 제어문을 사용하면 코드의 실행 흐름을 인위적으로 제어할 수 있다.


## 8.1 블록문
블록문(block Statement / compound statement)은 0개 이상의 문을 중활호로 묶은 것으로, 코드 블록 또는 블록이라고 부른다. 자바스크립트는 블록문을 하나의 실행 단위로 취급한다.

문의 끝에는 세미콜론을 붙이는 것이 일반적이다. 하지만 블록문은 언제나 문의 중료를 의미하는 자체 종결성을 갖기 때문에 블록문의 끝에는 세미콜론을 붙이지 않는다는 것에 주의하자.

````javascript
// 블록문
{
	var foo = 10;
}

// 제어문
var x = 1;
if(x < 10){
	x++;
}

// 함수 선언문
function sum(a, b){
	return a + b;
}
````

<hr>


## 8.2 조건문
조건문(conditional statement)은 주어진 조건식(conditional expression)의 평가 결과에 따라 코드 블록(블록문)의 실행을 결정한다. 조건식은 불리언 값으로 평가될 수 있는 표현식이다.   

자바스크립트는 if...else와 switch문으로 두가지 조건문을 제공한다.


### 8.2.1 if...else문
if...else 문은 주어진 조건식(불리언 값으로 평가될 수 있는 표현식)의 평가 결과, 즉 논리적 참 또는 거짓에 따라 실행할 코드 블록을 결정한다. 조건식의 평가 결과가 `true`일 경우 if문의 코드 블록이 실행되고, `false`일 경우 else 문의 코드 블록이 실행된다.

````javascript
if (조건식){
	// 조건식이 참이면 이 코드 블록이 실행된다.
} else {
	// 조건식이 거짓이면 이 코드 블록이 실행된다.
}
````

if문의 조건식은 불리언 값으로 평가되어야 한다. 만약 if문의 조건식이 불리언 값이 아닌 값으로 평가되면 자바스크립트 엔진에 의해 암묵적으로 불리언 값으로 강제 변환되어 실행할 코드 블록을 결정한다. 이것을 암묵적 타입 변환이라고 한다.

조건식을 추가하여 조건에 따라 실행될 코드 블록을 늘리고 싶으면 else if문을 사용한다.

````javascript
if (조건식1){
	// 조건식1이 참이면 이 코드 블록이 실행된다.
} else if (조건식2){
	// 조건식2가 참이면 이 코드 블록이 실행된다.
} else {
	// 조건식1과 조건식2가 모두 거짓이면 이 코드 블록이 실행된다.
}
````

else if문과 else 문은 옵션이다.   
만약 코드 블록 내의 문이 하나뿐이라면 중괄호를 생략할 수 있다.

대부분의 if...else 문은 삼항 조건 연산자로 바꿔 쓸 수 있다.

````javascript
// x가 짝수이면 result 변수에 문자열 '짝수'를 할당하고, 홀수면 문자열 '홀수'를 할당한다.

var x = 2;
var result;

if (x % 2){
	result = '홀수';
} else {
	result = '짝수';
}

console.log(result);	// 짝수
````

````javascript
// 삼항조건 연산자로 바꿔쓸 수 있다.

var x = 2;

// 0은 false로 취급된다.
var result = x % 2 ? '홀수' : '짝수';
console.log(result);	// 짝수
````

위 예제는 두 가지 경우의 수(홀수 또는 짝수)를 갖는 경우다. 만약 경우의 수가 세 가지 ('양수', '음수', '영')이라면 다음과 같이 바꿔쓸 수 있다.

````javascript
var num = 2;

var kind = num ? (num > 0 ? '양수' : '음수') : '영';

console.log(kind);	// 양수
num > 0 ? '양수' : '음수' 는 표현식이다.
````

즉, 삼항 조건 연산자는 값으로 평가되는 표현식을 만든다. 따라서 삼항 조건 연산자 표현식은 값으로 사용할 수 있기 때문에 변수에 할당할 수 있다. 하지만 if...else 문은 표현식이 아닌 문이다. 따라서 if...else 문은 **값처럼 사용할 수 없기 때문에 변수에 할당할 수 없다.**



### 8.2.2 switch 문
switch 문은 주어진 표현식을 평가하여 그 값과 일치하는 표현식을 갖는 case 문으로 실행 흐름을 옮긴다. case 문은 상황을 의미하는 표현식을 지정하고 콜론으로 마친다. 그리고 그 뒤에 실행할 문들을 위치시킨다.

switch 문의 표현식과 일치하는 case 문이 없다면 실행 순서는 default 문으로 이동한다. default 문은 선택사항으로, 사용할 수도 있고 사용하지 않을 수도 있다.

````javascript
switch (표현식){
  case 표현식1:
    switch 문의 표현식과 표현식1이 일치하면 실행될 문;
    break;
  case 표현식2:
    switch 문의 표현식과 표현식2가 일치하면 실행될 문;
    break;
  default:
    switch 문의 표현식과 일치하는 case 문이 없을 때 실행될 문;
}
````

if...else 문의 조건식은 불리언 값으로 평가되어야 하지만 switch 문의 표현식은 불리언 값보다는 문자열이나 숫자 값인 경우가 많다.

````javascript
// 월을 영어로 변환한다. (11 > 'November')
var month = 11;
var montName;

switch (month){
	case 1 : monthName = 'January'; break;
	case 2 : monthName = 'Fabruary'; break;
	case 3 : monthName = 'March'; break;
	case 4 : monthName = 'April'; break;
	case 5 : monthName = 'May'; break;
	case 6 : monthName = 'June'; break;
	case 7 : monthName = 'July'; break;
	case 8 : monthName = 'August'; break;
	case 9 : monthName = 'September'; break;
	case 10 : monthName = 'October'; break;
	case 11 : monthName = 'November'; break;
	case 12 : monthName = 'December'; break;
	default : monthName = 'Invalid month';
}

console.log(monthName);	// November
````
`break;`를 꼭 써줘야 한다. 그렇지 않으면 `default`가 실행되어 결과값이 Invalid month가 된다.   
default 문에는 `break` 문을 생략하는 것이 일반적이다.

case문을 하나의 조건으로 사용할 수도 있다. 다음은 윤년인지 판별해서 2월의 일수를 계산하는 예제다.

````javascript
var year = 2000;	// 2000년은 윤년으로 2월이 29일이다.
var month = 2;
var days = 0;

switch (month){
  case 1: case 3: case 5: case 7: case 8: case 10: case 12:
    days = 31;
    break;
  case 4: case 6: case 9: case 11:
    days = 30;
    break;
  case 2:
    // 윤년 계산 알고리즘
    // 1. 연도가 4로 나누어 떨어지는 해 (2000, 2004, 2008, 2012, 2016, 2020...)는 윤년이다.
    // 2. 연도가 4로 나누어 떨어지더라도 연도가 100으로 나누어 떨어지는 해 (2000, 21000, 2200...)는 평년이다.
    // 3. 연도가 400으로 나누어 떨어지는 해(2000, 2400, 2800 ...)는 윤년이다.
    days = ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) ? 29 : 28;
    break;
  default:
    console.log('Invalid month');
}

console.log(days);	// 29
````

만약 if...else 문으로 해결할 수 있다면 switch 문보다 if...else문을 사용하는 편이 좋다.


<hr>


## 8.3 반복문
반복문(loop statement)은 조건식의 평가 결과가 참인 경우 코드 블록을 실행한다. 그 후 조건식을 다시 평가하여 여전히 참인 경우 코드 블록을 다시 실행한다. 이는 조건이 거짓일 때까지 반복된다.

자바스크립트는 세 가지 반복문인 for문, while문, do...while문을 제공한다.


### 8.3.1 for 문
for문은 조건식이 거짓으로 평가될 때까지 코드 블록을 반복 실행한다.   
for문은 매우 중요하다. 다음 예제를 통해 for문이 어떻게 동작하는지 살펴보자.

````javascript
for (var i = 0; i < 2; i++){
	console.log(1);
}

// 결과
// 0
// 1
````

위 예제의 for문은 `i` 변수(for문의 변수 선언문의 변수 이름은 반복을 의미하는 `iteration`의 `i`를 사용하는 것이 일반적이다)가 `0`으로 초기화 딘 상태에서 시작하여 `i`가 `2`보다 작을 때까지 코드 블록을 2번 반복 실행한다.

for문의 변수 선언문, 조건식, 증감식은 모두 옵션이므로 반드시 사용할 필요는 없다. 단, 어떤 식도 선언하지 않으면 무한루프가 된다. 무한루프란 코드 블록을 무한히 반복 실행하는 문이다.

````javascript
// 무한루프
for (;;) { ... }
````

for문 내에 for문을 중첩해 사용할 수 있다. 이를 중첩 for문이라 한다.    
다음은 두 개의 주사위를 던졌을 때 두 눈의 합이 6이 되는 모든 경우의 수를 출력하기 위해 이중 중첩 for문을 사용한 예다.

````javascript
for (var i = 1; i <= 6; i++){
  for (var j = 1; j <= 6; j++){
    if (i + j === 6){
      console.log( `[${i}, ${j}]` );
    }
  }
}

// 결과
// [1, 5]
// [2, 4]
// [3, 3]
// [4, 2]
// [5, 1]
````



### 8.3.2 while 문
while 문은 주어진 조건식의 평가 결과가 참이면 코드 블록을 계속해서 반복 실행한다. for 문은 반복 횟수가 명확할때 주로 사용하고 while 문은 반복 횟수가 불명확할 때 주로 사용한다.   

while 문은 조건문의 평가 결과가 거짓이 되면 코드 블록을 실행하지 않고 종료한다. 만약 조건식의 평가 결과가 불리언 값이 아니면 불리언 값으로 강제 변환하여 논리적 참, 거짓을 구별한다.

````javascript
var count = 0;

// count가 3보다 작을 때까지 코드 블록을 계속 반복 실행한다.
while ( count < 3 ) {
	console.log(count);	// 0 1 2
  count++;
}
````

조건식의 평가 결과가 언제나 참이면 무한루프가 된다.   
무한루프에서 탈출하기 위해서는 코드블록 내에 if 문으로 탈출 조건을 만들고 break 문으로 코드 블록을 탈출한다.

````javascript
var count = 0;

// 무한루프
while (true) {
	console.log(count);
  count++;
  // count가 3이면 코드 블록을 탈출한다.
  if(counse === 3) break;
}	// 0 1 2
````


### 8.3.3 do...while 문
do...while 문은 코드 블록을 먼저 실행하고 조건식을 평가한다. 따라서 코드 블록은 무조건 한 번 이상 실행된다.

````javascript
var count = 0;

// count가 3보다 작을 때까지 코드 블록을 계속 반복 실행한다.
do {
	console.log(count);	// 0 1 2
  count++;
} while (count < 3);
````


<br>



## 8.4 break 문
switch 문과 while 문에서 살펴보았듯이 break 문은 코드 블록을 탈출한다. 좀 더 정홖히 표현하자면 코드 블록을 탈출하는 것이 아니라 레이블 문, 반복문(for, for...in, for...of, while, do...while) 또는 switch 문의 코드 블록을 탈출한다.

레이블문, 반복문, switch 문의 코드 외에 break 문을 사용하면 `SyntaxError` (문법에러)가 발생한다.

````javascript
if(true){
	break;	//	Uncaught SyntaxError: Illegal break statement
}
````
참고로 레이블 문(label statement)란 식별자가 붙은 문을 말한다.

````javascript
// foo라는 레이블 식별자가 붙은 레이블 문
foo: console.log('foo');
````

레이블 문은 프로그램의 실행 순서를 제어하는 데 사용한다. 사실 switch 문의 case 문과 default 문도 레이블 문이다. 레이블 문을 탈출하려면 break 문에 레이블 식별자를 지정한다.

````javascript
// foo라는 식별자가 붙은 레이블 블록문
foo: {
	console.log(i);
  break foo;	// foo 레이블 블록문을 탈출한다.
  console.log(2);
}

console.log('Done!');
````

중첩된 for문의 내부 for문에서 break 문을 실행하면 내부 for문을 탈출하여 외부 for 문으로 진입한다. 이 때 내부 for문이 아닌 외부 for문을 탈출할 때 레이블 문을 사용한다.

````javascript
// outer 라는 식별자가 붙은 레이블 for문
outer: for (var i = 0; i < 3; i++){
	for (var j = 0; j < 3; j++){
    // i + j === 3이면 outer라는 식별자가 붙은 레이블 for 문을 탈출한다.
    if (i + j === 3) break outer;
    console.log( `inner [${i}, ${j}]` );
  }
}
console.log('Done!');
````
레이블은 중첩된 for 문 외부로 탈출할 때 유용하지만 그 밖의 경우에는 일반적으로 권장하지 않는다.


break 문은 레이블 문뿐 아니라 반복문, switch 문에서도 사용할 수 있다. 이 경우에는 break 문에 레이블 식별자를 지정하지 않는다. break 문은 반복문을 더 이상 진행하지 않아도 될 때 불필요한 반복을 회피할 수 있어 유용하다.

다음은 문자열에서 특정 문자의 인덱스(위치)를 검색하는 예다.

````javascript
var string = 'Hello World.';
var search = 'l';
var index;

// 문자열은 유사 배열이므로 for 문으로 순회할 수 있다.
for (var i=0; i<string.length; i++){
	// 문자열의 개별 문자가 'l' 이면
  if(string[i] === search){
    index = i;
    break;	// 반복문을 탈출한다.
  }
}

console.log(index); // 2

// 참고로 String.prototype.indexOf 메서드를 사용해도 같은 동작을 한다.
console.log(string.indexOf(search));	// 2
````


<hr>



## 8.5 continue 문
continue 문은 반복문의 코드 블록 실행을 현 지점에서 중단하고 반복문의 증감식으로 실행 흐름을 이동시킨다. break 문처럼 반복문을 탈출하지는 않는다.

다음은 문자열에서 특정 문자의 개수를 세는 예다.

````javascript
var string = 'Hello World';
var search = 'l';
var count = 0;

// 문자열은 유사 배열이므로 for 문으로 순회할 수 있다.
for (var i=0; i<string.length; i++){
	// 'l'이 아니면 현 지점에서 실행을 중단하고 반복문의 증감식으로 이동한다.
  if (string[i] !== search) continue;
  count++;	// continue 문이 실행되면 이 문은 실행되지 않는다.
}

console.log(count);	// 3

// 참고로 String.prototype.match 메서드를 사용해도 같은 동작을 한다.
const regexp = new RegExp(search, 'g');
console.log(string.match(regexp).length);	// 3
````

위 예제의 for문은 다음 코드와 동일하게 동작한다.

````javascript
for (var i=0; i<string.length; i++){
	// 'l'이면 카운트를 증가시킨다.
  if (string[i] === search) count++;
}
````

위와 같이 if 문 내에서 실행해야 할 코드가 한 줄이라면 continue 문을 사용했을 때 보다 간편하고 가독성도 좋다. 하지만 if 문 내에서 실행해야 할 코드가 길다면 들여쓰기가 한 단계 더 깊어지므로 continue문을 사용하는 편이 가독성이 좋다.
