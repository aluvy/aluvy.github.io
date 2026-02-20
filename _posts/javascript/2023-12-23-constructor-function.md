---
title: "[JavaScript] Constructor Function 생성자 함수"
date: 2023-12-23 20:52:00 +0900
categories: [JavaScript, JavaScript-basic]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

Using function to create objects

## 생성자 함수로 객체 만들기
this 키워드를 통해서 property를 세팅할 수 있다.   
생성자 함수로 객체를 만들 때는 꼭 'new' 키워드를 사용해야 한다.

````javascript
function IdolModel(name, year){
  this.name = name;
  this.year = year;
  
  this.dance = function(){
    return `${this.name}이 춤을 춥니다.`;
  }
}

// new 키워드로 호출
const yuJin = new IdolModel('안유진', 2003);

console.log(yuJin);
// IdolModel { name: '안유진', year: 2003 }

console.log(yuJin.dance());
// 안유진이 춤을 춥니다.
````


### 'new' 키워드를 안쓰면 어떻게 될까?
undefined가 출력된다.   
'new' 키워드 없이 함수형으로 실행 하면, 실행된 함수의 반환값이 없기 때문에 undefined가 출력된다.

````javascript
// 일반 함수로 호출
const yuJin2 = IdolModel('안유진', 2003)
console.log(yuJin2)
// undefined
````

### 그렇다면, this.name과 this.year는 어디로 갔을까?
global이라는 객체가 존재하는데, global은 자동으로 생성되는 객체이고, node에서 실행될 때 필요한 값들을 모두 들고있다.   
(만약 웹에서 실행한다고 하면 window Object와 똑같은 것이다.)

````javascript
console.log(global.name);
// 안유진
````

### new 키워드를 쓰게 되면 this를 어디에 매핑하는지를 결정하게 된다.

1. new 키워드로 호출한 1번 에서 this 는 자신이 된다. ==> IdolModel { }
2. new 키워드 없이 호출한 2번에서는 this가 global에 매핑되었다.

````javascript
function IdolModel(name, year){
  console.log(this);
  this.name = name;
  this.year = year;
  
  this.dance = function(){
    return `${this.name}이 춤을 춥니다.`;
  }
}

// 1) new 키워드로 호출
const yuJin = new IdolModel('안유진', 2003);
// IdolModel {}

// 2) 일반 함수로 호출
const yuJin2 = IdolModel('안유진', 2003);
// <ref *1> Object [global] { ...
````

### new.target으로 new 키워드 사용 여부를 알 수 있다.

1. new 키워드로 호출한 1번에서 new.target은 [Function: IdolModel]이 된다.
2. new 키워드 없이 호출한 2번에서는 undefined가 출력되었다.

````javascript
function IdolModel(name, year){
  console.log(new.target);
  this.name = name;
  this.year = year;
  
  this.dance = function(){
    return `${this.name}이 춤을 춥니다.`;
  }
}

// 1) new 키워드로 호출
const yuJin = new IdolModel('안유진', 2003);
// [Function: IdolModel]

// 2) 일반 함수로 호출
const yuJin2 = IdolModel('안유진', 2003);
// undefined
````

### new 키워드로 호출하지 않았을 때 new 키워드로 호출하도록 변경해준다.

````javascript
function IdolModel(name, year){
  // new 키워드로 호출하지 않았을 때 new 키워드로 호출하도록 변경해준다.
  if(!new.target){
  	return new IdolModel(name, year);  
  }
  
  this.name = name;
  this.year = year;
  
  this.dance = function(){
    return `${this.name}이 춤을 춥니다.`;
  }
}

// 1) new 키워드로 호출
const yuJin = new IdolModel('안유진', 2003);
console.log(yuJin);
IdolModel { name: '안유진', year: 2003, dance: [Function (anonymous)] }

// 2) 일반 함수로 호출
const yuJin2 = IdolModel('안유진', 2003);
IdolModel { name: '안유진', year: 2003, dance: [Function (anonymous)] }
// 일반 함수로 호출하지 않았지만 객체가 제대로 생성되었다.
````


## 그렇다면, arrow function으로 생성자 함수를 만들 수 있을까?
화살표 함수로 만든 생성자 함수를 호출했을 때에는 Error가 발생한다.

````javascript
const IdolModelArrow = (name, year) =>{
  this.name = name;
  this.year = year;
}

const yuJin = new IdolModelArrow('안유진', 2003);
// Error가 발생한다.
// TypeError: IdolModelArrow is not a constructor ...
// 생성자 함수가 아니다.
````
