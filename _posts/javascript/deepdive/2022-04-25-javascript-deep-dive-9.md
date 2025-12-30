---
title: "[Deep Dive] 9장 타입 변환과 단축 평가"
date: 2022-04-25 19:39:00 +0900
categories: [JavaScript, Deep Dive]
tags: [deep dive]
render_with_liquid: false
math: true
mermaid: true
---



## 9.1 타입 변환이란?
자바스크립트의 모든 값은 타입이 있다.

개발자가 의도적으로 값의 타입을 변환하는 것을 **명시적 타입 변환** 또는 **타입 캐스팅**이라 한다.   
개발자의 의도와는 상관없이 표현식을 평가하는 도중에 자바스크립트 엔진에 의해 암묵적으로 타입이 자동변환되가도 한다. 이를 **암묵적 타입 변환** 또는 **타입 강제 변환**이라 한다.


---


## 9.2 암묵적 타입 변환
자바스크립트 엔진은 표현식을 평가할 때 개발자의 의도와는 상관없이 코드의 문맥을 고려해 암묵적으로 데이터 타입을 강제 변환(암묵적 타입 변환)할 때가 있다.

````javascript
// 피연산자가 모두 문자열 타입이어야 하는 문맥
'10' + 2	// '102'

// 피연산자가 모두 숫자 타입이어야 하는 문맥
5 * '10'	// 50

// 피연산자 또는 표현식이 불리언 타입이어야 하는 문맥
!0	// true
if(1){ }
````
이처럼 표현식을 평가할 때 코드의 문맥에 부합하지 않는 다양한 상황이 발생할 수 있다. 이때 프로그래밍 언어에 따라 에러를 발생시키기도 하지만 **자바스크립트는 가급적 에러를 발생시키지 않도록 암묵적 타입 변환을 통해 표현식을 평가한다.**

암묵적 타입 변환이 발생하면 문자열, 숫자, 불리언과 같은 원시 타입 중 하나로 타입을 자동 변환한다. 타입 별로 암묵적 타입 변환이 어떻게 발생하는지 살펴보자.


### 9.2.1 문자열 타입으로 변환

````javascript
1 + '2'	// "12"
````

위 예제의 + 연산자는 피연산자 중 하나 이상이 문자열이므로 문자열 연결 연산자로 동작한다.

**자바스크립트 엔진은 문자열 연산자 표현식을 평가하기 위해 문자열 연결 연산자의 피연산자 중에서 문자열 타입이 아닌 피연산자를 문자열 타입으로 암묵적 타입 변환한다.**   
연산자 표현식의 피연산자(피연산자도 표현식이다)만이 암묵적 타입 변환의 대상이 되는 것은 아니다. 앞서 언급했듯이 자바스크립트 엔진은 표현식을 평가할 때 코드 문맥에 부합하도록 암묵적 타입 변환을 실행한다.

예를 들어, ES6 에서 도입된 템플릿 리터럴의 표현식 삽입은 표현식의 평가 결과를 문자열 타입으로 암묵적 타입 변환 한다.

````javascript
`1 + 1 = ${1 + 1}`	// "1 + 1 = 2"
````


### 9.2.2 숫자 타입으로 변환

````javascript
1 - '1'	// 0
1 * '10'	// 10
1 / 'one'	// NaN
````

위 예제에서 사용한 연산자는 모두 산술 연산자다. 산술 연산자의 역할은 숫자 값을 만드는 것이다. 따라서 산술 연산자의 모든 피연산자는 코드 문맥상 모두 숫자 타입이어야 한다.   
자바스크립트 엔진은 산술 연산자 표현식을 평가하기 위해 산술 연산자의 피연산자 중에서 숫자 타입이 아닌 피연산자를 숫자 타입으로 암묵적 타입 변환한다.


피연산자를 숫자 타입으로 변환해야 할 문맥은 산술 연산자뿐만이 아니다.

````javascript
'1' > 0	// true
````

빈 문자얼(`''`), 빈 배열(`[]`), `null`, `false`는 0으로, `true`는 1로 변환된다. 객체와 빈 배열이 아닌 배열, `undefined`는 변환되지 않아 `NaN`이 된다.



### 9.2.3 불리언 타입으로 변환

````javascript
if(' ') console.log(x);
````

if문이나 for 문과 같은 제어문 또는 삼항 조건 연산자의 조건식은 불리언 값, 즉 논리적 참/거짓으로 평가되어야 하는 표현식이다. 자바스크립트 엔진은 조건식의 평가 결과를 불리언 타입으로 암묵적 타입 변환한다.

이때 자바스크립트 엔진은 불리언 타입이 아닌 값을 `true`(참), 또는 `false`(거짓)으로 구분한다.

> **false로 평가되는 값**   
> `false`, `undefined`, `null`, `0`, `-0`, `NaN`, ' '(빈 문자열)
{: .prompt-tip}

`false` 값 외의 모든 값은 `true`로 평가된다.



---



## 9.3 명시적 타입 변환
개발자의 의도에 따라 명시적으로 타입을 변경하는 방법은 다양하다. 표준 빌트인 생성자 함수 (`String`, `Number`, `Boolean`)를 new 연산자 없이 호출하는 방법과 빌트인 메서드를 사용하는 방법, 그리고 앞에서 살펴본 암묵적 타입 변환을 이용하는 방법이 있다.

> **＊ 표준 빌트인 생성자 함수와 빌트인 메서드**
> 표준 빌트인 생성자 함수와 표준 빌트인 메서드는 자바스크립트에서 기본 제공하는 함수다. 표준 빌트인 생성자 함수는 객체를 생성하기 위한 함수이며 new 연산자와 함께 호출한다. 표준 빌트인 메서드는 자바스크립트에서 기본 제공하는 빌트인 객체의 메서드다.
{: .prompt-tip}



### 9.3.1 문자열 타입으로 변환
문자열 타입이 아닌 값을 문자열 타입으로 변환하는 방법은 다음과 같다.

1. String 생성자 함수를 new 연산자 없이 호출하는 방법
2. `Object.prototype.toString` 메서드를 사용하는 방법
3. 문자열 연결 연산자를 이용하는 방법

````javascript
// 1. String 생성자 함수를 new 연산자 없이 호출하는 방법
// 숫자 타입 => 문자열 타입
String(1);	// "1"
String(NaN);	// "NaN"
String(Infinity);	// "Infinity"

// 불리언 타입 => 문자열 타입
String(true);	// "true"
String(false);	// "false"


// 2. Object.prototype.toString 메서드를 사용하는 방법
// 숫자 타입 => 문자열 타입
(1).toString();	// "1"
(NaN).toString();	// "NaN"
(Infinity).toString();	// "Infinity"

// 불리언 타입 => 문자열 타입
(true).toString();	// "true"
(false).toString();	// "false"


// 3. 문자열 연결 연산자를 이용하는 방법
// 숫자 타입 => 문자열 타입
1 + '';	// "1"
NaN + '';	// "NaN"
Infinity + '';	// "Infinity"

// 불리언 타입 => 문자열 타입
true + '';	// "true"
false + '';	// "false"
````



### 9.3.2 숫자 타입으로 변환
숫자 타입이 아닌 값을 숫자 타입으로 변환하는 방법은 다음과 같다.

1. Number 생성자 함수를 new 연산자 없이 호출하는 방법
2. `parseInt`, `parseFloat` 함수를 사용하는 방법 (문자열만 숫자 타입으로 변환 가능)
3. `+` 단항 연산자를 이용하는 방법
4. `*` 산술 연산자를 이용하는 방법

````javascript
// 1. Number 생성자 함수를 new 연산자 없이 호출하는 방법
// 문자열 타입 => 숫자 타입
Number('0');	// 0
Number('-1');	// -1
Number('10.53');	// 10.53

// 불리언 타입 => 숫자 타입
Number(true);	// 1
Number(false);	// 0


// 2. parseInt, parseFloat 함수를 사용하는 방법 (문자열만 변환 가능)
// 문자열 타입 => 숫자 타입
parseInt('0');	// 0
parseInt('-1');	// -1
parseInt('10.53');	// 10.53


// 3. + 단항 산술 연산자를 이용하는 방법
// 문자열 타입 => 숫자 타입
+'0';	// 0
+'-1';	// -1
+'10.53';	// 10.53

// 불리언 타입 => 숫자 타입
+true;	// 1
+false;	// 0


// 4. * 산술 연산자를 이용하는 방법
// 문자열 타입 => 숫자 타입
'0' * 1;	// 0
'-1' * 1;	// -1
'10.53' * 1;	// 10.53

// 불리언 타입 => 숫자 타입
true * 1;	// 1
false * 1;	// 0
````


### 9.3.3 불리언 타입으로 변환
불리언 타입이 아닌 값을 불리언 타입으로 변환하는 방법은 다음과 같다

1. Boolean 생성자 함수를 new 연산자 없이 호출하는 방법
2. `!`부정 논리 연산자를 두 번 사용하는 방법

````javascript
// 1. Boolean 생성자 함수를 new 연산자 없이 호출하는 방법
// 문자열 타입 => 불리언 타입
Boolean('x');	// true
Boolean('');	// false
Boolean('false');	// true

// 숫자 타입 => 불리언 타입
Boolean(0);	// false
Boolean(1);	// true
Boolean(NaN);	// false
Boolean(Infinity);	// true

// null 타입 => 불리언 타입
Boolean(null);	// false

// undefined 타입 => 불리언 타입
Boolean(undefined);	// false

// 객체 타입 => 불리언 타입
Boolean({});	// true
Boolean([]);	// true


// 2. !부정 논리 연산자를 두 번 사용하는 방법
// 문자열 타입 => 불리언 타입
!!'x';	// true
!!'';	// false
!!'false';	// true

// 숫자 타입 => 불리언 타입
!!0;	// false
!!1;	// true
!!NaN;	// false
!!Infinity;	// true

// null 타입 => 불리언 타입
!!null;	// false

// undefined 타입 => 불리언 타입
!!undefined;	// false

// 객체 타입 => 불리언 타입
!!{};	// true
!![];	// true
````


---



## 9.4 단축 평가

### 9.4.1 논리 연산자를 사용한 단축 평가
논리 합( `||` ) 또는 논리 곱( `&&` ) 연산자 표현식의 평가 결과는 불리언 값이 아닐 수도 있다.   
논리 합( `||` ) 또는 논리 곱 ( `&&` ) 연산자 표현식은 언제나 2개 피연산자 중 어느 한쪽으로 평가된다.

````javascript
'Cat' && 'Dog'	// Dog
````

**논리곱( && ) 연산자는 두 개의 피연산자가 모두 true로 평가될 때 true를 반환한다.**   
좌항에서 우항으로 평가가 진행된다.

첫 번째 연산자 'Cat'은 `true`로 평가된다. 하지만 이 시점까지는 위 표현식을 평가할 수 없다. 두 번째 피연산자까지 평가해 보아야 위 표현식을 평가할 수 있다. 다시 말해, 두 번째 피연산자가 위 논리곱 연산자 표현식의 평가 결과를 결정한다. 이때 논리곱 연산자는 **논리 연산의 결과를 결정하는 두 번째 피연산자, 즉 문자열 'Dog'를 그대로 반환한다.**

````javascript
'Cat' || 'Dog';	// 'Cat'
````

**논리합( `||` ) 연산자는 두 개의 피연산자 중 하나만 `true`로 평가되어도 `true`를 반환한다.**   
좌항에서 우항으로 평가가 진행된다.

첫 번째 연산자 'Cat'은 ture로 평가된다. 이 시점에 두 번째 피연산자까지 평가해보지 않아도 위 표현식을 평가할 수 있다. 이때 논리합 연산자는 **논리 연산의 결과를 결정한 첫 번째 피연산자, 즉 문자열 'Cat'을 그대로 반환한다.**

논리곱( `&&` ) 연산자와 논리 합 ( `||` ) 연산자는 이처럼 논리 연산의 결과를 결정하는 피연산자를 타입 변환하지 않고 그대로 반환한다. 이를 단축 평가라 한다.   
**단축평가란 표현식을 평가하는 도중에 평가 결과가 확정된 경우 나머지 평가 과저을 생략하는 것을 말한다.**

````javascript
// 논리합 ( || ) 연산자
'Cat' || 'Dog';	// 'Cat'
false || 'Dog';	// 'Dog'
'Cat' || false;	// 'Cat'

// 논리곱 ( && ) 연산자
'Cat' && 'Dog';	// 'Dog'
false && 'Dog'	// false
'Cat' && false	// false
````

단축 평가를 사용하면 if 문을 대체할 수 있다. 어떤 조건이 `true` 값일 때 무언가를 해야 한다면 논리곱( `&&` ) 연산자 표현식으로 if 문을 대체할 수 있다.

````javascript
var done = true;
var message = '';

// 주어진 조건이 true일 때
if (done) message = '완료';

// if 문은 단축 평가로 대체 가능하다.
// done이 true라면 message에 '완료'를 할당
message = done && '완료';
cosole.log(message);	// 완료
````

조건이 `false`일때 무언가를 해야 한다면 논리 합 ( `||` ) 연산자 표현식으로 if문을 대체할 수 있다.

````javascript
var done = false;
var message = '';

// 주어진 조건이 false일 때
if (!done) message = '미완료';

// if문은 단축 평가로 대체 가능하다.
// done이 true라면 message에 '완료'를 할당
message = done || '미완료';
console.log(message);	// 미완료
````

참고로 삼항 조건 연산자는 if...else 문을 대체할 수 있다.

````javascript
var done = 'true';
var message = '';

// if...else문
if(done) message = '완료';
else message = '미완료';
console.log(message);	// 완료

// if...else 문은 삼항 조건 연산자로 대체 가능하다.
message = done ? '완료' : '미완료';
console.log(message);	// 완료
````


#### 객체를 가리키기를 기대하는 변수가 null 또는 undefined가 아닌지 확인하고 프로퍼티를 참조할 때

객체는 키와 값으로 구성된 프로퍼티의 집합이다.   
만약 객체를 가리키기를 기대하는 변수의 값이 객체가 아니라 `null` 또는 `undefined`인 경우 객체의 프로퍼티를 참조하면 타입 에러가 발생한다. 에러가 발생하면 프로그램이 강제 종료된다.

````javascript
var elem = null;
var value = elem.value;	// TypeError : Cannot read property 'value' of null
````

이때 단축 평가를 사용하면 에러를 발생시키지 않는다.

````javascript
var elem = null;
// elem이 null이나 undefined와 같은 falsy 값이면 elem으로 평가되고
// elem이 truthy 값이면 elem.value로 평가된다.
var value = elem && elem.value;	// null
````


#### 함수 매개변수에 기본값을 설정할 때
함수를 호출할 때 인수를 전달하지 않으면 매개변수에는 `undefined`가 할당된다. 이때 단축 평가를 사용해 매개변수의 기본값을 설정하면 `undefined`로 인해 발생하는 에러를 방지할 수 있다.

````javascript
// 단축 평가를 사용한 매개변수의 기본값 설정
function getStringLength(str){
	str = str || '';
  return str.length;
}

getStringLength();	//	0
getStringLength('hi');	// 2

// ES6의 매개변수의 기본값 설정
function getStringLength(str = ''){
	return str.length;
}

getStringLength();	// 0
getStringLength('hi');	// 2
````


### 9.4.2 옵셔널 체이닝 연산자
ES11 (ECMAScript2020)에서 도입된 옵셔널 체니잉 연산자 `?.` 는 좌항의 피연산자가 `null` 또는 `undefined`인 경우 `undefined`를 반환하고, 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.

````javascript
var elem = null;

// elem이 null 또는 undefined이면 undefined를 반환하고,
// 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.
var value = elem?.value;
console.log(value);	// undefined
````

옵셔널 체이닝 연산자 `?.`는 객체를 가리키기를 기대하는 변수가 `null` 또는 `undefined`가 아닌지 확인하고 프로퍼티를 참조할 때 유용하다. 옵셔널 체이닝 연산자 `?.` 가 도입되기 이전에는 논리 연산자 `&&`를 사용한 단축 평가를 통해 변수가 `null` 또는 `undefined`인지 확인했다.

````javascript
var elem = null;

// elem이 falsy 값이면 elem으로 평가되고, elem이 truthy 값이면 elem.value로 평가된다.
var value = elem && elem.value;
console.log(value);	// null
````

논리 연산자 `&&`는 좌항 피연산자가 `false`로 평가되는 falsy값 (`false`, `undefined`, `null`, `0`, `-0`, `NaN`, '')이면 좌항 피연산자를 그대로 반환한다. 좌항 피연산자가 falsy 값인 0 이나 ''인 경우도 마찬가지다. 하지만 0이나 ''은 객체로 평가될 때도 있다.

````javascript
var str '';

// 문자열의 길이(length)를 참조한다.
var length = str && str.length;

// 문자열의 길이(length)를 참조하지 못한다.
console.log(length);	// ''
````

하지만 옵셔널 체이닝 연산자 `?.` 는 좌항 피연산자가 `false`로 평가되는 falsy 값 (`false`, `undefined`, `null`, `0`, `-0`, `NaN`, '')이라도 `null` 또는 `undefined`가 아니면 우항의 프로퍼티 참조를 이어간다.

````javascript
var str = '';

// 문자열의 길이 (length)를 참조한다. 이때 좌항 피연산자가 false로 평가되는 falsy 값이라도
// null 또는 undefined가 아니면 우항의 프로퍼티 참조를 이어간다.
var length = str?.length;
console.log(length);	// 0
````



### 9.4.3 null 병합 연산자
ES11 (ECMAScript2020)에서 도입된 `null` 병합 연산자 `??` 는 좌항의 피연산자가 `null` 또는 `undefined`인 경우 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 피연산자를 반환한다. `null` 병합 연산자 `??` 는 변수에 기본값을 설정할 때 유용하다.

````javascript
// 좌항의 피연산자가 null 또는 undefined이면 우항의 피연산자를 반환하고,
// 그렇지 않으면 좌항의 피연산자를 반환한다.

var foo = null ?? 'default string';
console.log(foo);	// 'default string'
````

`null` 병합 연산자 `??` 는 변수에 기본값을 설정할 때 유용하다. `null` 병합 연산자 `??` 가 도입되기 이전에는 논리 연산자 `||` 를 사용한 단축 평가를 통해 변수에 기본값을 설정했다. 논리 연산자 `||` 를 사용한 단축 평가의 경우 좌항의 피연산자가 `false`로 평가되는 falsy 값 (`false`, `undefined`, `null`. `0`, `-0`, `NaN`, '')이면 우항의 피연산자를 반환한다. 만약 falsy 값인 0이나 ''도 기본값으로서 유효다하면 예기지 않은 동작이 발생할 수 있다.

````javascript
// falsy 값인 0이나 ''도 기본값으로서 유효하다면 예기지 않은 동작이 발생할 수 있다.
var foo = '' || 'default string';
console.log(foo);	// 'default string'
````

하지만 `null` 병합 연산자 `??` 는 좌항의 피연산자가 `false`로 평가되는 falsy 값 (`false`, `undefined`, `null`, `0`, `-0`, `NaN`, '')이라도 `null` 또는 `undefined`가 아니면 좌항의 피연산자를 그대로 반환한다.

````javascript
// 좌항의 피연산자가 falsy 값이라도 null 또는 undefined가 아니면 좌항의 피연산자를 반환한다.
var foo = '' ?? 'default string';
console.log(foo);	// ''
````
