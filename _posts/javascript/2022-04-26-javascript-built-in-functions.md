---
title: "[JavaScript] ES6 배열 내장 함수"
date: 2022-04-26 10:09:00 +0900
categories: [JavaScript, JavaScript-basic]
tags: []
render_with_liquid: false
math: true
mermaid: true
---


## ES6 배열함수
ES6에는 배열을 처리할 수 있는 여러 함수들이 있다.

1. **forEach**: 반환값이 없다, 단순 for문과 같이 작동한다.
2. **map**: 반환값을 배열에 담아 반환한다. *****
3. **filter**: 조건에 충족하는(true) 아이템만 배열에 담아 반환한다.
4. **some**: 조건에 충족하는 아이템이 하나라도 있으면 true 반환, 아니면 false.
5. **every**: 모든 배열에 아이템이 조건을 충족하면 true 반환, 아니면 false.
6. **find**: 조건에 충족하는 아이템 하나만 반환(여러개라면 첫번째것만 반환)
7. **findIndex**: 조건에 충족하는 아이템의 인덱스값 반환 (여러개라면 첫번째아이템의 인덱스번호만 반환)
8. **reduce**: 배열의 각 요소에 대해 주어진 리듀서(reducer) 함수를 실행하고, 하나의 결과값을 반환
9. **splice**: 해당 구간 인덱스의 요소를 다른 요소로 바꾸거나 삭제하고 새로운 배열을 반환


**배열**
````javascript
let names = [
  "Steven Paul Jobs",
  "Bill Gates",
  "Mark Elliot Zuckerberg",
  "Elon Musk",
  "Jeff Bezos",
  "Warren Edward Buffett",
  "Larry Page",
  "Larry Ellison",
  "Tim Cook",
  "Lloyd Blankfein",
];

let ceoList = [
  {name:'홍길동', age:50, height: 180},
  {name:'이순신', age:60, height: 190},
  {name:'강감찬', age:70, height: 170}
];
````


---


## 1. forEach()
반환값이 없다, 단순 for문과 같이 작동한다.   
forEach 메서드는 배열을 반복하는 메서드이다. 일반적으로 무언가를 반복하고자 할 때 for문을 사용하는데, for문 대신 사용할 수 있다.

````javascript
function printName (item) {
  console.log(item);
}
names.forEach(printName);
````

### 화살표 함수 문법

````javascript
names.forEach((item, index) => { console.log(item,index) });
````

names의 배열을 for문을 사용한 것 처럼 차례로 실행한다.

![alt text](/assets/images/posts/2022/04/26/built-in-functions-01.png)
_결과_


### 예제2

````javascript
const a = [1, 2, 3, 4, 5];

a.forEach( function(s){
	console.log(s);	// 1, 2, 3, 4, 5
});
````

배열 a는 각 1, 2, 3, 4, 5의 요소를 가지고 있다.   
3열에서 배열 a의 메서드 forEach를 호출 하는데 인자로 함수를 전달하고 함수의 매개변수(s)는 배열a의 요소가 된다.   
첫번째 배열 인덱스부터 마지막 배열 인덱스까지 반복한다.



---


## 2. map()
반환값을 배열에 담아 반환한다.   
Map 메서드는 해당 배열의 모든 요소를 이용하여 새로운 배열을 반환하는 메서드다.

````javascript
let data = names.map((item) => {
  return  item;
  // return '이름:' + item;
});
console.log(data);
````

### 화살표 함수 문법

````javascript
let data2 = ceoList.map((item) => item.name);
console.log(data2);
````

![alt text](/assets/images/posts/2022/04/26/built-in-functions-02.png)
_결과_

### 예제2

````javascript
const a = [1, 2, 3, 4, 5];

const b = a.map( function(s){
	return s * s;
});

console.log(b);	// [1, 4, 9, 16, 25]
````

배열 a는 각 1, 2, 3, 4, 5의 요소를 가지고 있다.   
3열에서 a 배열의 map 메서드를 호출하고 인자로 함수를 넣고 함수의 매개변수는 배열 a의 요소가 된다.   
리턴 값으로 s * s를 리턴하여 새로운 배열을 생성하고 b 변수에 저장했다. 7열에서 새로운 배열 1, 4, 9, 16, 25를 출력한다.


### map 문제

문제1) 모든 이름을 대문자로 바꾸어서 출력하시오.

````javascript
let mapTest = names.map((item) => {
  return item.toUpperCase();
});
console.log(mapTest);
````

문제2) 성을제외한 이름만 출력하시오. (예-[“Steven”,“Bill”,“Mark”,“Elon”…])

````javascript
let mapTest2 = names.map((item) => {
  return item.split(' ')[0]
});
console.log(mapTest2);
````

문제3) 이름의 이니셜만 출력하시오. (예-[“SPU”,“BG”,“MEZ”,“EM”…])

````javascript
let mapTest3 = names.map((item) =>{
  let splitName = item.split(' ');
  let initial = "";

  splitName.forEach((nameItem) => {
    (initial += nameItem[0]);
  });
  return initial;
});
console.log(mapTest3);
````



---



## 3. filter()
return 조건에 충족하는(true) 아이템만 배열에 담아 반환한다.   
filter 메서드는 조건에 만족하는 모든 요소들을 모아 새로운 배열을 반환하는 메서드이다.

````javascript
let data3 = ceoList.filter((item) => {
  // return  item.name=='이순신'; 
  return  item.age >= 60;
});
console.log(data3);
````

### 화살표 함수 문법

````javascript
let data4 = names.filter((item) => {
  return  item.startsWith('L');  //첫번째 문자를 찾는 메소드
});
console.log(data4);
````

![alt text](/assets/images/posts/2022/04/26/built-in-functions-03.png)

### 예제2

````javascript
const a = [1, 2, 3, 4, 5];

const b = a.filter( function(s){
	return s % 2 === 0;
});

console.log(b);	// [2, 4]
````

배열 a는 각 1, 2, 3, 4, 5의 요소를 가지고 있다.   
3열에서 filter 메서드를 호출하고 리턴에서 매개변수 s를 2로 나누었을 때 나머지가 0인 요소들만 리턴하고 있다.   
즉 매개변수가 해당 리턴의 조건을 만족하는 경우에만 해당 매개변수를 리턴한다.

좀 더 예제를 다르게 해보자.

````javascript
const a = [
  {
    name: 'jeon',
    age: 20
  },
  {
    name: 'park',
    age: 25
  },
  {
    name: 'park',
    age: 25
  }
]

const b = a.filter( function(s){
	return s.age === 25;
})

console.log(b);
/*
[
  {
    name: 'park',
    age: 25
  },
  {
    name: 'park',
    age: 25
  }
]
*/
````

이번엔 배열 안에 3개의 객체를 저장 하였다.   
각 객체들은 name과 age 프로퍼티를 가지고 있다.   
마찬가지로 16열에서 filter 메서드를 호출하는데 이번엔 각 객체의 age 프로퍼티가 25일 경우에만 리턴하도록 설정했다. 즉, 이때 매개변수 s는 a배열의 객체들이 된다. 20열에서 b 배열을 출력한 결과로 1개의 배열이 리턴되고 안에 2개의 배열이 담겨있다.


### filter 문제
문제1) 이름에 a를 포함한 사람들을 출력하시오.

````javascript
let filterTest = names.filter((item)=>{
  return item.includes('a');
});
console.log(filterTest);
````

문제2) 이름에 같은 글자가 연속해서 들어간 사람을 출력하시오. (예-tt,ff,ll 이런 글자들)

````javascript
let doubleLetter =  names.filter((item) => {
  let splitName = item.split("");
  return splitName.some((letter, index) => letter == splitName[index + 1]);
})
console.log(doubleLetter)
````


---


## 4. some()
return 조건에 충족하는 아이템이 하나라도 있으면 true 반환, 아니면 false를 반환한다.

````javascript
let data5 = names.some((item)=>{
  return  item.startsWith('L');
  // return  item.startsWith('K');
});
console.log(data5);
````

![alt text](/assets/images/posts/2022/04/26/built-in-functions-04.png)

### some 문제
문제1) 전체 이름의 길이가 20자 이상인 사람이 있는가?

````javascript
let someTest = names.some((item) => {
  return item.length >= 20;
});
console.log(someTest);
````

문제2) 성을 제외한 이름에 p를 포함한 사람이 있는가?(대소문자 상관 no)

````javascript
let someTest2 = names.some((item)=>{
  let splitName = item.split(' ');
  splitName.pop();

  return splitName.some(eachName=>eachName.toLocaleLowerCase().includes("p"))
});
console.log(someTest2);
````



---



## 5. every()
모든 배열에 아이템이 조건을 충족하면 true 반환, 아니면 false를 반환한다.

````javascript
let data6 = names.every((item)=>{
  return  item.startsWith('L');
  //return  item.length>1; 
});
console.log(data6);
````

### 화살표 함수 문법

````javascript
let data7 = ceoList.every((item)=>{
  //return  item.name=='이순신'; 
  return  item.age>=50;
});
console.log(data7);
````

![alt text](/assets/images/posts/2022/04/26/built-in-functions-05.png)

### every 문제
문제1) 모두의 전체 이름의 길이가 20자 이상인가?

````javascript
console.log(names.every(item=>item.length>=20))
````

문제2) 모두의 이름에 a 가 포함되어 있는가?

````javascript
console.log(names.every(item=>item.includes('a')))
````


---


## 6. find()
조건에 충족하는 아이템 하나만 반환(여러개라면 첫번째 것만 반환)

````javascript
let data8 = names.find((item)=>{
  return  item.startsWith('L');
});
console.log(data8);
````

![alt text](/assets/images/posts/2022/04/26/built-in-functions-06.png)


### find 문제
문제1) 전체 이름의 길이가 20자 이상인 사람을 찾으시오.

````javascript
console.log(names.find(item=>item.length>=20))
````

문제2) 미들네임이 포함되어있는 사람을 찾으시오.(예-Steven Paul Jobs)

````javascript
console.log(names.find(item=>item.split(' ').length>=3))
````


---



## 7. findIndex()
조건에 충족하는 아이템의 인덱스값 반환 (여러개라면 첫번째 아이템의 인덱스번호만 반환)

````javascript
let data9 = names.findIndex((item)=>{
  return  item.startsWith('L');
});
console.log(data9);
````

![alt text](/assets/images/posts/2022/04/26/built-in-functions-07.png)

### findIndex 문제
문제1) 전체 이름의 길이가 20자 이상인 사람의 인덱스 번호를 찾으시오.

````javascript
console.log(names.findIndex(item=>item.length>=20))
````

문제2) 미들네임이 포함되어있는 사람의 인덱스 번호를 찾으시오.

````javascript
console.log(names.findIndex(item=>item.split(' ').length>=3))
````


---


## 8. reduce()
배열의 각 요소에 대해 주어진 리듀서(reducer) 함수를 실행하고, 하나의 결과값을 반환   
인자로는 리듀서함수와 accumulator 초기값을 받는다.

reduce 함수란 정해진 4개의 매개변수가 있다.

- **accumulator** : 누적 되는 매개 변수
- **currentValue** : 현재 순환하는 인덱스의 값
- **currentIndex** : 현재 순환하는 인덱스
- **array** : 호출한 배열을 가르킴

위의 순서를 지켜야 하며, 매개변수 이름은 바뀌어도 상관이 없다.currentIndex와 array 매개변수는 생략 가능하다.

````javascript
const a = [1, 2, 3, 4, 5];

const b = a.reduce( function(a,b) {
	return a + b;
}, 0);

console.log(b);	// 15
````

배열 a는 1, 2, 3, 4, 5 요소를 가지고 있다. 3열에서 reduce 메서드를 호출하는데 매개 변수로 a (accumlator) b (currentValue)를 받고 있다. 4열에서 a와 b를 더한 값을 리턴했다. 리턴의 결과값은 매개변수 a에 저장되며 다시 순환한다.여기서 a는 0이다.2번째 매개변수 0으로 초기화 했다.b는 a 배열의 첫번재 요소 1이 된다.즉 0과 1을 더한 값을 다시 a 매개변수에 저장하는 것이다.그 다음 요소 2가 매개변수 b로 저장되고다시 a와 b를 더한 값을 a 매개변수에 저장하고 배열의 마지막 원소까지 반복한다. 7열에서 1+2+3+4+5의 값인 15를 출력했다.

이번에는 currentIndex와 array 매개변수까지 다 사용해보자.

````javascript
const a = [1, 2, 3, 4, 5];

const b = a.reduce( function(a, b, c, d){
  if ( c === d.length -1 ){
    return ( a + b ) / d.length;
  } else {
    return a + b;
  }
});

console.log(b);	// 3
````

4열에서 if문을 통해 c가 d의 길이 -1와 같은지 검사한다.   
여기서 c (currentIndex)는 배열의 인덱스이고, d (array)는 a 배열이다.   
d.length -1 을 한 것은 배열의 첫 인덱스는 0부터 시작하기 때문이다. 즉, 인덱스 0부터 4번까지 요소를 검사한다.   
이 조건이 만족하는 경우인 마지막 요소(5)를 순회하는 경우 a와 b를 더해주고   
a 배열의 길이를 나누어 평균을 리턴한다. 11열에서 15를 a의 길이로 나눴을 때 값은 3을 출력했다.



---


## 9. splice()
splice 메서드는 해당 구간 인덱스의 요소를 다른 요소로 바꾸거나 삭제하고 새로운 배열을 반환한다.

````javascript
const a = [1, 2, 3, 4, 5];

const b = a.splice(0, 2);

console.log(a);	// [1, 2]
console.log(b);	// [3, 4, 5]
````

3열에서 splice 메서드를 호출하여   
첫번째 요소로는 시작지점의 인덱스를 지정하고   
두번째 요소로는 시작지점으로 부터 제거할 요소의 수이다.   
5열과 6열에서 a와 b를 둘다 출력했을 때   
b 배열에는 a배열의  0번째 요소 1부터 2개의 요소 1, 2를 가지는 배열을 출력했다.   
a 배열에는 1, 2 요소가 삭제 된 3, 4, 5 배열을 출력했다.

````javascript 
const a = [1, 2, 3, 4, 5];

const b = a.splice(0, 2, 10, 11);

console.log(b);	// [1, 2]
console.log(a);	// [10, 11, 3, 4, 5]
````

이번에는 3열에서 3번째 4번째 인자로   
해당 요소를 삭제하고 추가할 10과 11을 전달했다.   
6열에서 a를 출력한 결과를 보면 1과 2를 삭제하고 10과 11이 추가됐다.


---


#### 참고
- [JS의 배열 내장함수들](https://velog.io/@won-developer/JS의-배열-내장함수들)
