---
title: "[JavaScript] Property Attribute"
date: 2023-12-22 20:53:00 +0900
categories: [JavaScript, JavaScript-basic]
tags: []
render_with_liquid: false
math: true
mermaid: true
---


## property attribute

JavaScript의 객체는 key, value만 존재하는 것이 아니라 생각보다 굉장히 섬세한 객체이다.   
객체나 클래스에서 선언하는 프로퍼티의 애트리뷰트를 확인해볼 수 있다.

객체의 프로퍼티에는 아래 2가지 종류가 있다.

1. **데이터 프로퍼티** - 키와 값으로 형성된 실질적 값을 갖고 있는 프로퍼티
2. **액세서 프로퍼티** - 자체적으로 값을 갖고 있지 않지만 다른 값을 가져오거나 설정할 때 호출되는 함수로 구성된 프로퍼티   
  ex) getter, setter


## 1. 프로퍼티 애트리뷰트 출력

- `Object.getOwnPropertyDescriptor`(객체, 프로퍼티key)
- `Object.getOwnPropertyDescriptors`(객체)

> - **Object**
>   - 대문자로 시작하므로 생성자 함수 이거나 클래스의 이름임을 유추해볼 수 있다.
> - **getOwnPropertyDescriptor**
>   - 생성자 함수 또는 클래스 . 뒤에 바로 오는 함수는 static 함수임을 유추해볼 수 있다.
{: .prompt-tip}


### 1-1. data property attribute

````javascript
const yuJin = {
  name: '안유진',
  year: 2003,
}

// 'name' property atteribute 확인
console.log(Object.getOwnPropertyDescriptor(Yujin, 'name'));
{ value: '안유진', writable: true, enumerable: true, configurable: true }

// yuJin 객체가 가진 모든 property의 attribute 확인
console.log(Object.getOwnPropertyDescriptors(yuJin));
{
  name: { value: '안유진', writable: true, enumerable: true, configurable: true },
  year: { value: 2003, writable: true, enumerable: true, configurable: true },
}
````

- **value**
  - 실제 프로퍼티의 값

- **writable**
  - 값을 수정할 수 있는지 여부. false로 설정하면 프로퍼티 값을 수정할 수 없다.

- **enuerable**
  - 열거가 가능한지 여부이다. ~~for···in 룹 등을 사용할 수 있으면 true를 반환한다.~~

- **configurable**
  - 프로퍼티 어트리뷰트의 재정의가 가능한지 여부를 판단한다. false일 경우 프로퍼티 삭제나 어트리뷰트 변경이 금지된다.
  - 단, writable이 true인 경우 값 변경와 writable을 변경하는 건 가능하다.



### 1-2. acceser property attribute

````javascript
const yuJin2 = {
  // data property
  name: '안유진',
  year: 2003,

  // acceser property
  get age(){
    return new Date().getFullYear() - this.year;
  },
  set age(age){
    this.year = new Date().getFullYear() - age;
  }
}

// yuJin2 property 확인 - 'age' 값이 getter/setter로 되어 있다.
console.log(yuJin2);
{ name: '안유진', year: 2003, age: [Getter/Setter] }

// getter 호출 --> year 값 확인
console.log(yuJin2.age);	// 20

// setter 호출 --> year 값 변경
yuJin2.age = 32;

// getter 호출 --> 변경된 나이 출력
console.log(yuJin2.age);	// 32

// getter 호출 --> year 값 확인
console.log(yuJin2.year);	// 1991


// 'age' property attribute 확인
console.log(Object.getOwnPropertyDescriptor(yuJin2, 'age'));
{
  get: [Function get age],
  set: [Function set age],
  enumerable: true,
  configurable: true
}
````

액세서 프로퍼티는 value프로퍼티 애트리뷰트가 존재하지 않고   
get과 set이라는 프로퍼티 애트리뷰트가 존재하고 이 프로퍼티는 실제 getter 함수와 setter 함수를 의미한다.

> 데이터 프로퍼티와 액세서 프로퍼티를 구분하는 방법은 Object.getOwnPropertyDescriptor()를 실행하여 어떤 형태로 프로퍼티 애트리뷰트가 나오는지를 확인해보면 알 수 있다. 
{: .prompt-tip}



## 2. 프로퍼티 애트리뷰트 재정의 하기

yuJin2 변수에 key를 추가하는 방법으로 가장 간단하게는 아래와 같은 방법이 있다.   
이렇게 선언하게 되면 프로퍼티 애트리뷰트가 모두 true로 들어가게 된다.

````javascript
yuJin2.height = 172;
// or
yuJin2['height'] = 172;


// yuJin2 객체 property 확인
console.log(yuJin2);
{ name: '안유진', year: 1991, age: [Getter/Setter], height: 172 }


// yuJin2 'height' property attribute 확인
console.log(Object.getOwnPropertyDescriptor(yuJin2, 'height'));
{ value: 172, writable: true, enumerable: true, configurable: true }
````


### 2-1. 프로퍼티 애트리뷰트 값 변경하여 추가하기

**Object.defineProperty**(객체, 추가할 프로퍼티key, { `property attribute` })

````javascript
Object.defineProperty(yuJin2, 'height', {
  // property attribute 정의
  value: 172,
  writable: false,
  enumerable: true,
  configurable: false
});

// yuJin2 property 확인
console.log(yuJin2);
{ name: '안유진', year: 1991, age: [Getter/Setter], height: 172 }

// yuJin2의 'height' property attribute 확인
console.log(Object.getOwnPropertyDescriptor(yuJin2, 'height'));
{ value: 172, writable: false, enumerable: true, configurable: false }
````



### 2-2. property attribute의 기본 값

Object.defineProperty 함수로 프로퍼티를 정의할 때   
writable, enumerable, configurable **값을 선언하지 않았을 경우 전부 false로 설정된다.**

````javascript
Object.defineProperty(yuJin2, 'height', {
  value: 172,
  // 나머지 값들을 설정하지 않음 --> false로 설정 됨
});


// yuJin2 property 확인
console.log(yuJin2);
{ name: '안유진', year: 1991, age: [Getter/Setter], height: 172 }


// yuJin2의 'height' property attribute 확인
console.log(Object.getOwnPropertyDescriptor(yuJin2, 'height'));
{ value: 172, writable: false, enumerable: false, configurable: false }
// 전부 false로 설정되었다.
````



### 2-3. writable: false

값을 수정할 수 있는지 여부. false로 설정하면 프로퍼티 값을 수정할 수 없다.   
writable이 false 값을 가지면 값의 변경이 불가능하다. 한번 정의 후 변경하지 못하는 값을 만들고 싶을 때 유용하다.

````javascript
Object.defineProperty(yuJin2, 'height', {
  // property attribute 정의
  value: 172,
  writable: true,
  enumerable: true,
  configurable: true
});


// 'height' property의 value값 수정 후 yuJin2의 property 확인
yuJin.height = 180;
console.log(yuJin2);
{ name: '안유진', year: 1991, age: [Getter/Setter], height: 180 }
// height 값이 180으로 변경되었다.


// yuJin2의 'height' property attribute 값 중 writable 값 변경
Object.defineProperty(yuJin2, 'height', {
  writable: false;
});


// yuJin2의 'height' property attribute 값 확인
console.log(Object.getOwnPropertyDescriptor(yuJin2, 'height');
{ value: 180, writable: false, enumerable: true, configurable: true }
// writable이 false로 변경되었다.


// yuJin2의 'height'값 변경 시도
yuJin2.height = 172;


// yuJin2 property 값 확인
console.log(yuJin2);
{ name: '안유진', year: 1991, age: [Getter/Setter], height: 180 }
// 에러는 나지 않지만 height 값이 변경되지 않았다.
````


### 2-4. enumerable: false

열거 가능 여부이다. ~~for···in 룹 등을 사용할 수 있으면 true를 반환한다.~~

````javascript
// yuJin2 의 key 출력
console.log(Object.keys(yuJin2));
[ 'name', 'year', 'age', 'height' ]
// 키 값이 모두 출력된다.


// yuJin2의 'name' property attribute 중 enumerable 값 수정
Object.defineProperty(yuJin2, 'name', {
  enumerable: false,
});


// yuJin2의 'name' property attribute 출력
console.log(Object.getOwnPropertyDescriptor(yuJin2, 'name'));
{ value: '안유진', writable: true, enumerable: false, configurable: true }
// enumerable: false 로 변경되었다.


// yuJin2의 key 값 출력
console.log(Object.keys(yuJin2));
[ 'year', 'age', 'height' ]
// enumerable: false로 변경한 'name' 프로퍼티는 열거되지 않는다.


// yuJin2의 property를 모두 출력
console.log(yuJin2);
{ year: 1991, age: [getter/Setter], height: 180 }
// 여기에서도 마찬가지로 'name' 프로퍼티가 열거되지 않는다.


// yuJin2.name 출력
console.log(yuJin2.name);
안유진
// name이라는 값 자체가 사라진 것은 아니다. 다만 열거할 수 없을 뿐이다.
````


### 2-5. configuragle: false

프로퍼티 어트리뷰트의 재정의가 가능한지 여부를 판단한다. false일 경우 프로퍼티 삭제나 어트리뷰트 변경이 금지된다.   
단, writable이 true인 경우 값 변경와 writable을 변경하는 건 가능하다.

````javascript
// yuJin2의 'height' property attribute 중 configurable 값 변경
Object.defineProperty(yuJin2, 'height', {
  configurable: false,
})


// yuJin2의 'height' property attribute 출력
console.log(Object.getOwnPropertyDescriptor(yuJin2, 'height'));
{ value: 180, writable: false, enumerable: true, configurable: false }
// configurable속성이 false로 변경된 것을 확인할 수 있다.


// yuJin2의 'height' property attribute 중 enumerable 값 변경
Object.defineProperty(yuJin2, 'height', {
  enumerable: false,
});
// 실행 시 Error가 난다.
// TypeError: Cannot redefine property: height ...
// height라는 프로퍼티를 재정의할 수 없다.
````

writable이 true인 경우 값 변경와 writable을 변경하는 건 가능하다.

````javascript
// yuJin2의 'height' property attribute 중 writable과 configurable 값을 변경
Object.defineProperty(yuJin2, 'height', {
  writable: true,
  configurable: false,
})


// yuJin2의 'height' property attribute 확인
console.log(Object.getOwnPropertyDescriptor(yuJin2, 'height'));
{ value: 180, writable: true, enumerable: true, configurable: false }
// writable 속성은 true, configurable 속성은 false로 변경된 것을 확인할 수 있다.



/*
  configurable이 false 여서 enumerable 속성의 값은 바꿀 수 없지만
  writable이 true이기 때문에 value와 writable은 변경할 수 있다.
*/


// yuJin2의 'height' property attribute 중 value 값 변경
Object.defineProperty(yuJin2, 'height', {
  value: 172,
});


// yuJin2의 'height' property attribute 값 확인
console.log(Object.getOwnPropertyDescriptor(yuJin2, 'height'));
{ value: 172, writable: true, enumerable: true, configurable: false }
// value 값이 변경된 것을 확인할 수 있다.



// yuJin2의 'height' property attribute 값 중 writable 값 변경
Object.defineProperty(yuJin2, 'height', {
  writable: false,
});


// yuJin2의 'height' property attribute 값 확인
console.log(Object.getOwnPropertyDescriptor(yuJin2, 'height'));
{ value: 172, writable: false, enumerable: true, configurable: false }
// writable 값이 false로 변경된 것을 확인할 수 있다.


// yuJin2의 'height' property attribute 값 중 writable 값 변경
Object.defineProperty(yuJin2, 'height', {
  writable: true,
});
// writable 값이 false인 상태에서 ture로 변경하려고 하면 Error가 발생한다.
// TypeError: Cannot redefine property: height ...
// writable 값을 재정의할 수 없다.
````
