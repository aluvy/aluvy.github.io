---
title: "[JavaScript] Spread Operator"
date: 2023-12-22 10:55:00 +0900
categories: [JavaScript, JavaScript-basic]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## Spread Operator
마침표를 연달아 3개(...)를 찍는 문법을 스프레드 오퍼레이터(Spread Operator)라고 합니다.   
Spread의 뜻은 (펼치다, 퍼트리다) 이며, 한글로는 '펼침연산자' 라고도 합니다.   
이 문법을 사용하면 객체 혹은 배열을 펼칠 수 있습니다.

Spread Operator는 대괄호, 중괄호, 소괄호 안에서만 사용 가능하며   
외부에서 사용할 경우, 에러가 발생합니다.

> JavaScript Spread 연산자(...)를 사용하면 기존 배열이나 객체의 전체 또는 일부를 다른 배열이나 객체로 빠르게 복사할 수 있습니다.
{: .prompt-tip}


## 1. Sperad Operator 기본 문법
스프레드 연산자를 사용하면 배열, 문자열, 객체 등 반복 가능한 객체 (Iterable Object)를 개별 요소로 분리할 수 있습니다.

````javascript
// Array
var arr1 = [1, 2, 3, 4, 5]; 
var arr2 = [...arr1, 6, 7, 8, 9]; 
console.log(arr2); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

// String
var str1 = 'paper block'; 
var str2 = [...str1]; 
console.log(str2); // [ "p", "a", "p", "e", "r", " ", "b", "l", "o", "c", "k" ]
````

## 2. 배열에서의 Spread Operator
### 2-1. 배열의 복사
배열 참조가 아닌 배열 복사를 위해서 기존에는 slice 또는 ES5의 map을 이용하여 배열을 복사했습니다.   
ES6의 스프레드 연산자를 사용하면, 간단하게 복사된 배열을 생성할 수 있습니다.

````javascript
// ES6 spread operator
var arr1 = ['철수','영희']; 
var arr2 = [...arr1]; 

arr2.push('바둑이'); 

console.log(arr2); // [ "철수", "영희", "바둑이" ]
// 원본 배열은 변경되지 않습니다.
console.log(arr1); // [ "철수", "영희" ]
````

참고로 스프레드 연산자를 이용한 복사는 얕은(shallow) 복사를 수행하며, 배열 안에 객체가 있는 경우에는 객체 자체는 복사되지 않고 원본 값을 참조합니다. 따라서 원본 배열 내의 객체를 변경하는 경우 새로운 배열 내의 객체 값도 변경됩니다.

````javascript
var arr1 = [{name: '철수', age: 10}]; 
var arr2 = [...arr1]; 

arr2[0].name = '영희';

console.log(arr1); // [ {name:'영희', age: 10}]
console.log(arr2); // [ {name:'영희', age: 10}]
````

### 2-2. 배열의 병합
두 개의 배열을 하나로 병합하려고 할 때 기존에는 concat 메서드를 사용했지만, ES6에서는 스프레드 연산자를 통해 보다 간편하고 깔끔하게 병합이 가능합니다.

````javascript
// 기존 방식
var arr1 = [1,2,3]; 
var arr2 = [4,5,6]; 
var arr = arr1.concat(arr2); 
console.log(arr); // [ 1, 2, 3, 4, 5, 6 ] 

// ES6 spread operator
var arr1 = [1,2,3]; 
var arr2 = [4,5,6]; 
var arr = [...arr1, ...arr2]; 
console.log(arr); // [ 1, 2, 3, 4, 5, 6 ]
````

또한 스프레드 연산자를 사용하면 다양한 형태의 배열 병합을 비교적 간단하게 수행할 수 있습니다.

````javascript
var arr1 = [1,2,3]; 
var arr2 = [4,5,6]; 
arr1.push(...arr2) 
console.log(arr1); // [1,2,3,4,5,6]

var arr1 = [1,2];
var arr2 = [0, ...arr1, 3, 4];
console.log(arr2); // [0, 1, 2, 3, 4]
````

## 3. 함수에서의 Spread Operator
### 3-1. 매개변수에 사용
함수를 호출할 때 함수의 매개변수(parameter)를 스프레드 연산자로 작성한 형태를 Rest Parameter라고 부릅니다.   
rest 파라미터를 사용하면 함수의 파라미터로 오는 값들을 모아서 배열에 집어넣습니다. 이를 통해서 깔끔한 함수 표현을 적용할 수 있습니다.

````javascript
function add(...rest) {
  let sum = 0;
  for (let item of rest) {
    sum += item;
  }
  return sum;
}

console.log( add(1) ); // 1
console.log( add(1, 2) ); // 3
console.log( add(1, 2, 3) ); // 6
````

위의 결과에서 보이듯이, Rest parameter를 시용하면 인자의 개수와 상관없이 모든 딘자를 더하는 함수를 쉽게 구현할 수 있습니다. (기존 JavaScript에서는 'arguments'를 이용하여 처리할 수 있습니다.)

다음과 같이 기본 인자를 섞어서 사용하는 방법도 가능합니다.

````javascript
function addMul(method, ...rest){ 
  if (method === 'add') {
    let sum = 0;
    for (let item of rest) {
      sum += item;
    }    
     return sum;    
  } else if (method === 'multiply'){
    let mul = 1;
    for (let item of rest) {
      mul *= item;
    }
     return mul;    
  }
 
} 

console.log( addMul('add', 1,2,3,4) ); // 10
console.log( addMul('multiply', 1,2,3,4) ); // 24
````

> 단, Rest 파라미터는 항상 제일 마지막 파라미터로 있어야 합니다.   
> function addMul(...rest, method){ } 와 같은 방식으로는 사용할 수 없습니다.
{: .prompt-tip}


### 3-2. 함수 호출 인자로 사용
위의 경우와 반대로, 함수 정의 쪽이 아니라 함수를 호출할 때도 스프레드 연산자를 사용할 수 있습니다.   
기존에는 배열로 되어 있는 내용을 함수의 인자로 넣으려면 풀어서 넣어주던지, Apply를 이용했어야 하지만 스프레드 연산자를 이용하면 배열 행테에서 바로 함수 인자로 넣어줄 수 있습니다.

````javascript
var numbers = [9, 4, 7, 1]; 
Math.min(...numbers); // 1

// map과 함께 사용
var input = [{name:'철수',age:12}, {name:'영희',age:12}, {name:'바둑이',age:2}];

//가장 어린 나이 구하기.
var minAge = Math.min( ...input.map((item) => item.age) );
console.log(minAge); // 2
````

## 4. 객체에서의 Spread Operator
ES2018 (ES9)에서는 객체와 관련된 사항이 추가되었습니다. 배열에 대한 스프레드 연산자를 지원하는 최근의 브라우저는 객체에 대한 스프레드 연산자 역시 지원합니다.


### 4-1. 객체 복사 또는 업데이트
객체에서 스프레드 연산자를 이용하여 객체의 복사 또는 프로퍼티를 업데이트 할 수 있습니다.

````javascript
var currentState = { name: '철수', species: 'human'};
currentState = { ...currentState, age: 10}; 

console.log(currentState)// {name: "철수", species: "human", age: 10}

currentState = { ...currentState, name: '영희', age: 11}; 
console.log(currentState); // {name: "영희", species: "human", age: 11}
````

## 5. Destructuring
스프레드 연산자는 배열이나 객체에서의 destructuring에 사용될 수 있습니다.   
이 경우에 의미적으로는 Spread Operator 라기 보다는 Rest Parameter에 가까운 형태입니다.

````javascript
var a, b, rest;
[a, b] = [10, 20];

console.log(a); // 10
console.log(b); // 20

[a, b, ...rest] = [10, 20, 30, 40, 50];

console.log(rest); // [30,40,50]

({a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40});
console.log(a); // 10
console.log(b); // 20
console.log(rest); // {c: 30, d: 40}
````
