---
title: "[JavaScript] Immutable Objects - extensible, seal, freeze"
date: 2023-12-23 16:59:00 +0900
categories: [JavaScript, JavaScript-basic]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## Immutable Objects

**불변 객체** - JavaScript에서 primitive data type(원시 타입)은 변경 불가능한 값(immutable value)이며,   
객체는 변경 가능한 값(mutable value)입니다.

immutable을 쓰는 이유는 궁긍적으로 '성능' 때문입니다.   
mutable value는 값에 대한 메모리 주소를 참조하기 때문에 값을 변경했을 경우 해당 값을 사용하고 있는 모든 곳에서 side effect(부수 효과)가 발생하여 예기치 못한 버그를 유발할 수 있습니다.

immutable로 객체를 선언하고 사용하게 되면 객체의 메모리 주소가 불변하기 때문에 구조를 단순하게 유지할 수 있고 그로 인해 구조적인 공유를 할 수 있어 애플리케이션을 추론하기 쉽게 됩니다. 내부적으로 구조를 공유하고 있기 때문에 메로리 사용량을 획기적으로 감소시키는 장점도 가지게 됩니다.

객체를 immutable로 선언할 때는 Object.extensible, Object.seal, Object.freeze 메소드 들을 사용하면 되는데, 객체 안에 있는 nested object 까지 immutable로 지정되는 건 아니기 때문에 nested object가 바뀌는 것 까진 막지 못하므로 주의해야 합니다.

- **extensible**
  - 객체 확장 여부 - 객체에 property 추가 가능 여부
  - 객체의 isExtensible() 값이 true면 객체의 property 추가가 불가능하다. (삭제는 가능하다)

- **seal**
  - 객체의 봉인 여부 - 객체에 property 추가/삭제 가능 여부
  - 객체의 isSealed() 값이 true면 객체의 property 추가/삭제가 불가능하다.
  - 객체의 isSealed() 값이 true면 객체의 property attribute의 configurable의 값도 false로 변경된다.

- **freeze**
  - **가장 높은 Immutable의 등급**
  - 객체의 동결 여부 - 객체의 property, property attribute 추가/삭제/수정 가능 여부
  - 객체의 isFrozen() 값이 true면, 객체의 property, property attribute 추가/삭제/수정이 불가능하다.
  - 객체의 isFrozen() 값이 true면, 객체의 property attribute의 writable과 configurable의 값도 false로 변경된다.


## 1. Extensible
객체의 확장 가능 여부를 확인할 수 있다.   
extensible 값이 true 면 객체에 property 값을 추가할 수 있지만, extensible 값이 false 면 객체에 property값을 추가할 수 없다.   
하지만, extensible 값과 관계 없이 property값의 삭제는 가능하다.

````javascript
const yuJin = {
  name: '안유진',
  year: 2003,
  
  get age(){
    return new Date().getFullYear() - this.year;
  },
  set age(age){
    this.year = new Date().getFullYear() - age;
  }
}

// yuJin 객체 property 출력
console.log(yuJin);
{ name: '안유진', year: 2003, age: [Getter/Setter] }
````

### 1-1. Object 생성 시 기본 extensible 값은 true 다.

````javascript
// yuJin이라는 객체가 확장이 가능한지 확인
// yuJin 객체의 extensible 값 확인
console.log(Object.isExtensible(yuJin));	// isExtensible() : static method
// true
````

### 1-2. extensible이 true면 property 추가가 가능하다.

````javascript
// yuJin의 'position' property를 추가
yuJin['position'] = 'vocal';

// yuJin의 property 값 확인
console.log(yuJin);
{ name: '안유진', year: 2003, age: [Getter/Setter], position: 'vocal' }
// vocal 값이 추가되어 있다.
````

### 1-3. extensible 값을 false로 변경해 본다.

````javascript
// yuJin의 extensible 값을 false로 변경
Object.preventExtensions(yuJin)	// preventExtensions() : static method

// yuJin 객체의 extensible 값 확인
console.log(Object.isExtensible(yuJin));
// false
// extensible의 값이 false로 변경되었다.
````

### 1-4. extensible 값이 false 인 상태에서 yuJin의 property 값 추가

extensible이 false면 property를 추가로 생성할 수 없다. 주의할 점은 error가 발생하지 않는다.

````javascript
// yuJin 객체에 'groupName' property 추가
yuJin['groupName'] = '아이브';

// yuJin 객체 property 확인
console.log(yuJin);
{ name: '안유진', year: 2003, age: [Getter/Setter], position: 'vocal' }
// error가 발생하진 않지만
// 'groupName' property가 생성되지 않았다.
````

### 1-5. extensible 값이 false 일 때 property 삭제는 가능할까?

extensible값이 false여도 삭제는 가능하다.

````javascript
// yuJin 객체의 'position' 값을 삭제해본다.
delete yuJin['position'];

// yuJin객체의 property 값 확인
console.log(yuJin);
{ name: '안유진', year: 2003, age: [Getter/Setter] }
// 'position' property가 삭제되었다.
````

---

## 2. Seal
객체의 봉인 여부를 확인할 수 있다. 객체의 seal 값이 true면 property의 추가, 삭제가 불가능하다.   
**seal 값이 true면 property attribute - configurable 값이 false로 변경된다.**   
단, 주의해야 할 점은 Error도 나지 않는다는 점이다.

````javascript
const yuJin = {
  name: '안유진',
  year: 2003,
  
  get age(){
    return new Date().getFullYear() - this.year;
  },
  set age(age){
    this.year = new Date().getFullYear() - age;
  }
}

// yuJin 객체 property 출력
console.log(yuJin);
{ name: '안유진', year: 2003, age: [Getter/Setter] }
````

### 2-1. Object 생성 시 기본 seal 값은 false 다.
봉인되어 있지 않다.

````javascript
// yuJin 객체의 seal 값을 확인한다. 
console.log(Object.isSealed(yuJin));	// isSealed() : static method
// false
````

### 2-2. yuJin 객체를 봉인해본다.

````javascript
// yuJin 객체를 봉인해본다.
Object.seal(yuJin);	// seal() : static method

// yuJin 객체의 봉인 여부 확인
console.log(Object.isSealed(yuJin));
// true
// yuJin 객체가 봉인 된 것을 확인할 수 있다.
````

### 2-3. yuJin 객체에 property를 추가해본다.
객체의 seal 이 true 면 property가 추가되지 않는다. 단, Error도 발생하지 않는다.

````javascript
// yuJin객체에 'groupName' property를 추가해본다.
yuJin['groupName'] = '아이브'

// yuJin 객체의 property를 모두 확인해본다.
console.log(yuJin);
{ name: '안유진', year: 2003, age: [Getter/Setter] }
// yuJin 객체에 'groupName' property가 추가되지 않았다.
// Error는 발생하지 않는다.
```` 

### 2-4. yuJin 객체에 property를 삭제해본다.
객체의 seal이 true면 property가 삭제되지 않는다. 단, Error도 발생하지 않는다.

````javascript
// yuJin 객체의 'name' property 값 삭제하기
delete yuJin['name'];

// yuJin 객체의 property 값 확인
console.log(yuJin);
{ name: '안유진', year: 2003, year: [Getter/Setter] }
// yuJin 객체의 'name' property 값이 삭제되지 않았다.
// Error도 발생하지 않았다.
````

### 2-5. yuJin 객체의 seal이 true일 때 'name' property attribute를 변경해본다.
객체의 seal 값의 여부와 상관없이 property attribute 값은 변경할 수 있다.   
하지만, 객체의 seal 값이 true 면 property attribute 중 configurable 값이 false로 변경된다.   
**그렇기 때문에 결국 seal을 하는 작업은 configurable을 변경하는 작업과 같다.**

````javascript
// yuJin 객체의 'name' property의 value 값을 변경해본다.
Object.defineProperty(yuJin, 'name', {
  value: '코드팩토리'
});


// yuJin 객체의 'name' property attribute 값 확인
console.log(Object.getOwnPropertyDescriptor(yuJin, 'name'));
{ value: '코드팩토리', writable: true, enumerable: true, configurable: false }
// yuJin 객체의 'name' property의 value 값이 변경되었다.
// yuJin 객체의 'name' property의 configurable의 값도 false로 변경되었다.



// yuJin 객체의 'name' property의 writable 값을 변경해본다.
Object.defineProperty(yuJin, 'name', {
  writable: false,
});


// yuJin 객체의 'name' property attribute 값 확인
console.log(Object.getOwnPropertyDescriptor(yuJin, 'name'));
{ value: '코드팩토리', writable: false, enumerable: true, configurable: false }
// yuJin 객체의 'name' property의 writable 값이 변경되었다.
````


---



## 3. freezed
동결시킨다. 가장 높은 Immutable의 등급이다. 읽기 외에 모든 기능을 불가능하게 만든다.

````javascript
const yuJin = {
  name: '안유진',
  year: 2003,
  
  get age(){
    return new Date().getFullYear() - this.year;
  },
  set age(age){
    this.year = new Date().getFullYear() - age;
  }
}

// yuJin 객체 property 출력
console.log(yuJin);
{ name: '안유진', year: 2003, age: [Getter/Setter] }
````

### 3-1. Object 생성 시 기본 freezed 값은 false 다.

````javascript
// yuJin 객체의 freezed 여부를 확인한다.
console.log(Object.isFrozen(yuJin));
// false
````

### 3-2. 객체를 동결시켜본다.

````javascript
// yuJin 객체를 동결시킨다.
Object.freeze(yuJin);

// yuJin 객체의 동결 여부를 확인한다.
console.log(Object.isFrozen(yuJin));
// true
````

### 3-3. yuJin 객체에 property를 추가해본다.

객체의 isFrozen 값이 true면 property 추가가 불가능하다. 단, Error도 발생하지 않는다.

````javascript
// yuJin 객체에 'groupName' property 값을 추가해본다.
yuJin['groupName'] = '아이브';

// yuJin 객체의 property 값 확인
console.log(yuJin);
{ name: '안유진', year: 2003, age: [Getter/Setter] }
// yuJin 객체에 'groupName' property가 추가되지 않았다.
// Error도 발생하지 않는다.
````

### 3-4. yuJin 객체에 'name' property 를 삭제해본다.

객체의 isFrozen 값이 true면 property 삭제가 불가능하다. 단, Error도 발생하지 않는다.

````javascript
// yuJin 객체의 'name' property 삭제
delete yuJin['name']

// yuJin 객체의 property 값 확인
console.log(yuJin);
{ name: '안유진', year: 2003, age: [Getter/Setter] }
// yuJin 객체의 'name' property가 삭제되지 않았다.
// Error도 발생하지 않는다.
````

### 3-5. yuJin 객체의 property attribute를 변경해본다.
객체의 isFrozen 값이 true면 property attribute 변경이 불가능하다. Error가 발생하며 실행되지 않는다.

````javascript
// isFrozen 값이 true인 객체 yuJin의 'name' property attribute 값을 변경해본다.
Object.defineProperty(yuJin, 'name',{
  value: '코드팩토리',
})

// Error가 발생하며 실행되지 않는다.
// TypeError: Cannot redefine property: name
````

### 3-6. property attribute를 확인해본다.
객체의 isFrozen 값이 true면 property attribute의 writable과 configurable의 값이 false로 변경된다.

````javascript
// yuJin 객체의 'name' property attribute를 확인해본다.
console.log(Object.getOwnPropertyDescriptor(yuJin, 'name'))
{
  value: '안유진'
  writable: false,
  enumerable: true,
  configurable: false,
}

// writable과 configurable이 false로 변경되어 있다.
````

---


## 4. Immutable의 상속 여부
상위 Object의 Immutable 값이 하위 Object에 상속되는지 확인해보자.

````javascript
const yuJin = {
  name: '안유진',
  year: 2003,

  wonYoung: {
    name: '장원영',
    year: 2002,
  }
}
````

### 4-1. yuJin 객체를 동결해보자

````javascript
// yuJin 객체를 동결시켜본다.
Object.freeze(yuJin);


// yuJin 객체의 동결 여부 확인
console.log(Object.isFrozen(yuJin));
// true
// yuJin 객체의 isFrozen() 값이 true로 변경되었다.
````

### 4-2. yuJin 객체의 wonYoung 객체의 동결 여부를 확인해본다.

````javascript
// yuJin['wonYoung']의 isFrozen() 값을 확인해본다.
console.log(Object.isFrozen(yuJin['wonYoung']));
// false
// isFrozed() 값이 상속되지 않았다.
````
