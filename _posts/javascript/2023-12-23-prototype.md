---
title: "[JavaScript] Prototype, Prototype Chain"
date: 2023-12-23 20:55:00 +0900
categories: [JavaScript]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## Prototype, Prototype Chain

JavaScript는 프로토타입 기반 언어라고 불립니다.   
JavaScript 개발을 하면 빠질 수 없는 것이 prototype입니다. prototype이 거의 JavaScript 그 자체이기 때문에 이해하는 것이 어렵고 개념도 복잡합니다.

JavaScript도 객체지향 언어입니다.   
하지만 자바스크립트에는 class라는 개념이 없습니다. (ES6 에서 class 문법이 추가되었습니다.) 대신 prototype이라는 것이 존재합니다. 자바스크립트가 프로토타입 기반 언어라고 불리는 이유입니다.

자바스크립트는 특정 객체의 프로퍼티나 메소드에 접근 시 객체 자신의 것 뿐 아니라 proto가 가리키는 링크를 따라서 자신의 부모 역할을 하는 프로토타입 객체의 프로퍼티나 메소드에 접근할 수 있습니다.   
즉, 특정 객체의 프로퍼티나 메소드 접근 시 만약 현재 객체의 해당 프로퍼티가 존재하지 않는다면 proto가 가리키는 링크를 따라 부모 역할을 하는 프로토타입 객체의 프로퍼티나 메소드를 차례로 검색합니다. 이것이 프로토타입 체인입니다.

모든 프토토타입 체이닝의 종점은 Object.prototype입니다.   
하위 객체는 상위 객체의 프로퍼티나 메소드를 상속받는 것이 아니라 공유합니다.   
해당 객체에 없는 프로퍼티나 메소드를 접근할 때 프로토타입 체이닝이 일어납니다.

> JavaScript의 기본 데이터 타입은 Number.prototype, String.prototype 등과 같이 이들의 프로토타입 객체에 정의된 표준 메서드를 사용합니다. 그리고 이들 프로토타입 객체 또한 Object.prototype을 자신의 프로토타입(proto 링크)으로 가지고 프로토타입 체이닝으로 연결됩니다.
{: .prompt-tip}

![prototype chain](/assets/images/posts/2023/12/23/prototype-01.png)
_prototype chain_

---

## prototype, \_\_proto\_\_, constructor

- **prototype 프로퍼티**
  - 함수 객체만 가지고 있는 프로퍼티이다.
  - 함수 객체가 생성자로 사용될 때, 이 함수를 통해 생성될 객체의 부모 역할을 하는 객체(prototype 객체)를 가리킨다.
  - 즉, prototype 객체란 어떠한 객체가 만들어지기 위해 그 객체의 모태가 되는 객체이고 **하위 객체에게 물려줄 속성들**이다.

- **\_\_proto\_\_ 프로퍼티**
  - 함수를 포함한 모든 객체가 가지고 있는 인터널 슬롯이다. (프로퍼티다)
  - 객체의 입장에서 자신의 **부모 역할을 하는 prototype 객체를 가리킨다.**
  - ECMAScript에서는 암묵적 프로토타입 링크(Implicit Prototype Link)라 부르며 proto 프로퍼티에 저장된다.
  - prototype 프로퍼티는 함수의 입장에서 자신과 링크된 자식에게 물려줄 프로토타입 객체를 가리키고
  - proto 프로퍼티는 객체의 입장에서 자신의 부모 객체인 prototype 객체를 내부의 숨겨진 링크로 가지고 있는 것이다.

- **constructor 프로퍼티**
  - **prototype 객체는 constructor 프로퍼티를 가진다.**
  - constructor 프로퍼티는 생성된 객체(인스턴스)의 입장에서 자신을 생성한 함수를 가리킨다.


### \_\_proto\_\_
__proto__는 함수를 포함한 모든 객체가 가지고 있는 프로퍼티이며, 부모 역할을 하는 prototype 객체를 가리킨다.

````javascript
const obj = {};

// obj의 __proto__를 확인해보자.
console.log(obj.__proto__};
// [Object: null prototype] {}
// 아무것도 없기 때문에 아무것도 안나올 것 같지만, Object가 나온다.

console.log(obj.__proto__ === Object.prototype);
// true
````

![alt text](/assets/images/posts/2023/12/23/prototype-02.png)
_obj.\_\_proto\_\_ 는 Object.prototype 객체를 가리킨다._



### prototype

생성자 함수의 prototype을 확인해보자.

````javascript
// 생성자 함수
function IdolModel(name, year){
  this.name = name;
  this.year = year;
}

console.log(IdolModel.prototype);	// prototype: static 값
// {}
````

비어있는 Object가 나타난다. console.dir() 로 prototype의 숨겨져 있는 값을 확인해보자.

````javascript
// console.dir() 로 숨겨져있는 값을 확인해보자.
console.dir(IdolModel.prototype, {
  showHidden: true,
});
<ref *1>{
  [constructor]: [function: IdolModel]{
    [length]: 2,
    [name]: 'IdolModel',
    [arguments]: null,
    [caller]: null,
    [prototype]: [Circular *1]
  }
}
// 숨겨져 있는 값이 존재한다.
````


### constructor

**IdolModel의 prototype.constructor가 IdolModel과 같은지 확인해보자.**

````javascript
console.log(IdolModel.prototype.constructor === IdolModel);
// true
````

생성자 함수의 prototype과 그 생성자 함수의 prototype.constructor.prototype은 같다. 이를 **circular reference**라고 한다.

> circular reference: 서로가 서로를 참조하고 있는 상태
{: .prompt-tip}

````javascript
console.log(IdolModel.prototype.constructor.prototype === IdolModel.prototype);
// true
````

![alt text](/assets/images/posts/2023/12/23/prototype-03.png)
_circular reference : 서로가 서로를 참조하고 있는 상태_

````javascript
const yuJin = new IdolModel('안유진', 2003);

console.log(yuJin.__proto__);
// {}

console.log(yuJin.__proto__ === IdolModel.prototype);
// true
// __proto__ 는 부모 함수의 prototype과 같다.
````

![alt text](/assets/images/posts/2023/12/23/prototype-04.png)
_IdolModel과 yuJin 객체의 참조_


---

## 최상위 프로토타입 객체 Object.prototype

IdolModel의 부모(\_\_proto\_\_)는 Function.prototype 이고 Function의 부모는 Object.prototype 이다

````javascript
console.log(IdolModel.__proto__ === Function.prototype);
// true

console.log(Function.prototype.__proto__ === Object.prototype);
// true
````

**그렇다면 IdolModel의 prototype의 부모는 뭐가될까?**   
Object.prototype 과 같다.   
**결국, IdolModel의 prototype은 최상위 객체가 Object.prototype이 된다.**

````javascript
console.log(IdolModel.prototype.__proto__ === Object.prototype);
// true
````

![alt text](/assets/images/posts/2023/12/23/prototype-05.png)
_Object.prototype_

상속을 받을 때에는 부모의 모든 property를 자식이 상속받는다.   
예를 들어 Object.prototype.toString()은 모든 객체가 상속받았기 때문에 사용이 가능하다.

````javascript
console.log(yuJin.toString());
// [object Object]

Object.prototype.toString());
// [object Object]
````

## prototype chain 활용

prototype chain을 활용하면, 효과적으로 메모리를 절약할 수 있다.   
Object.prototype을 그대로 상속받아 인스턴스에서 사용할 수 있기 때문이다.

````javascript
Function IdolModel2(name, year){
  this.name = name;
  this.year = year;
  
  this.sayHello = function(){
    return `${this.name}이 인사를 합니다.`;
  }
}

const yuJin2 = new IdolModel2('안유진', 2003);
const wonYoung2 = new IdolModel2('장원영', 2002);

console.log(yuJin2.sayHello());
// 안유진이 인사를 합니다.

console.log(wonYoung2.sayHello());
// 장원영이 인사를 합니다.
````

**그렇다면 yuJin2.sayHello는 wonYoung2.sayHello와 같은 함수일까?**   
같은 함수가 아니다. new 키워드로 생성되었고 함수의 메소드로 작성했기 때문에 각각 고유의 property다.

````javascript
console.log(yuJin2.sayHello === wonYoung2.sayHello);
// false
// new 키워드로 생성되었기 때문에 false 가 나온다.
````

**yuJin2의 sayHello가 상속받은 property인지, yuJin2의 고유 property인지 확인을 해보자.**   
true, yuJin2 고유의 프로퍼티다.

````javascript
console.log(yuJin2.hasOwnProperty('sayHello'));
// 상속받은 property인지, yuJin2의 고유 프로퍼티인지 확인하는 함수
// true
// yuJin2의 고유 프로퍼티라는 뜻
````

이렇게 사용하게 되면, 똑같은 기능을 하는 sayHello() 메소드가 각각의 인스턴스마다 생성되기 때문에 메모리가 낭비된다.   
sayHello() 메소드를 prototype에 작성하여 상속받을 수 있도록 작성해보자.

````javascript
funciton IdolModel3(name, year){
  this.name = name;
  this.year = year;
}

// IdolModel3 내부에 sayHello()메소드를 직접 만들지 않고
// IdolModel3에 prototype에 만든다.
// __proto__가 참조하게 되는 객체이다. 상속받는 부모의 역할.
// 하위 객체에 상속된다.
IdolModel3.prototype.sayHello = function(){
  return `${this.name}이 인사를 합니다.`;
}
// IdolModel3의 instance 안에서 실행할 것이기 때문에 this 키워드 사용 가능.


const yuJin3 = new IdolModel3('안유진', 2003);
const wonYoung3 = new IdolModel3('장원영', 2004);

console.log(yuJin3.sayHello());
// 안유진이 인사를 합니다.

console.log(wonYoung3.sayHello());
// 장원영이 인사를 합니다.

console.log(yuJin3.sayHello === wonYoung3.sayHello);
// true
// 실제로 한 공간에 sayHello 함수가 저장되어있다.
// 리소스를 더 효율적으로 사용할 수 있다.
````

**yuJin3의 sayHello가 상속받은 property인지, yuJin2의 고유 property인지 확인을 해보자.**   
false, yuJin3의 고유 프로퍼티가 아니라 상속받은 프로퍼티다.

````javascript
console.log(yuJin3.hasOwnProperty('sayHello'));
// false
// yuJin3의 고유 property가 아니라 상속받은 property 다.
````

![alt text](/assets/images/posts/2023/12/23/prototype-06.png)
_yuJin 객체와 wonYoung 객체가 IdolModel.prototype의 sayHello() property를 상속받았다._



### static method
생성자 함수로 static method 만들기.

````javascript
IdolModel3에다가 sayHello 라는 스태틱 메소드 만들기
IdolModel3.sayStaticHello = function(){
  return `안녕하세요 저는 static method 입니다.`;
}

console.log(IdolModel3.sayStaticHello());
// 안녕하세요 저는 static method 입니다.
````



### Overriding
아래와 같은 코드가 있다. IdolModel4.prototype.sayHello 메소드를 오버라이드 하려면

````javascript
function IdolModel4(name, year){
  this.name = name;
  this.year = year;
}
IdolModel4.prototype.sayHello = function(){
  return '안녕하세요 저는 prototype 메서드입니다.';
}

const yuJin4 = new IdolModel4('안유진', 2003);
console.log(yuJin4.sayHello());
// 안녕하세요 저는 prototype 메서드입니다.
````

IdolModel4 함수에다가 직접 함수를 선언한다.   
그렇게 되면 IdolModel4.prototype의 sayHello를 instance의 sayHello로 덮어쓸 수 있다.   
자바스크립트에서 class 문법이 나오기 이전에는 오버라이딩을 프로퍼티 셰도잉이라고 불렀다. 

````javascript
function IdolModel4(name, year){
  this.name = name;
  this.year = year;
  
  this.sayHello(){
    return `안녕하세요 저는 인스턴스 메서드입니다!`;
  }
}
IdolModel4.prototype.sayHello = function(){
  return '안녕하세요 저는 prototype 메서드입니다.';
}

const yuJin4 = new IdolModel4('안유진', 2003);
console.log(yuJin4.sayHello());
// 안녕하세요 저는 인스턴스 메서드입니다!
````

일반적인 OOP에는 존재하지 않는 기능이있다.   
자바스크립트 oop에는 이상한게 많음~

우리가 상속받는 클래스를 변경할 수 있다.   
인스턴스를 생성하고 난 다음에도 할 수 있다. (말도안되는것..)   
가능은 하다.


### getPrototypeOf, setPrototypeOf
자바스크립트에서는 일반적인 OOP에는 존재하지 않는 기능이 있다.   
자바스크립트에서는 인스턴스를 생성하고 난 후에도 상속받는 클래스를 변경할 수 있다.

````javascript
function IdolModel(name, year){
  this.name = name;
  this.year = year;
}

IdolModel.prototype.sayHello = function(){
  return `${this.name} 인사를 합니다.`;
}

function femaleIdolModel(name, year){
  this.name = name;
  this.year = year;
  
  this.dance = function(){
    return `${this.name}이 춤을 춥니다.`;
  }
}

const gaEul = new Idolmodel('가을', 2004);
const ray = new FemaleIdolModel('레이', 2004);


console.log(gaEul.__proto__);
// { sayHello: [Function (anonymous)] }

console.log(gaEul.__proto__ === IdolModel.prototype);
// true

console.log(Object.getPrototypeOf(gaEul) === IdolModel.prototype);
// gaEul의 프로토를 가져옴



console.log(gaEul.sayHello());
// 가을 인사를 합니다.

console.log(ray.dance());
// 레이가 춤을 춥니다.

console.log(ray.sayHello());
// Error
````

FemaleIdolModel이 IdolModel의 sayHello()를 상속받고 싶다면?

````javascript
console.log(Object.getPrototypeOf(ray) === FemaleIdolModel.prototype);

Object.setPrototypeOf(ray, IdolModel.prototype);
// JavaScript는 ray 인스턴스를 만든 후에 상속받는 대상을 바꾸는 것이 가능하다.

console.log(ray.sayHello());
// 레이 인사를 합니다.
// 상속체일을 바꿔서 에러가 나지않고 변경한 프로토타입의 함수가 실행된다.
````

````javascript
console.log(ray.constructor === FemaleIdolModel);
// false
// ray인스턴스의 상속 프로토타입을 변경했기 때문에 false가 나온다.


console.log(ray.constructor === IdolModel);
// true
// ray 객체는 setPrototypeOf()를 통해 IdolModel의 prototype으로 변경했기 때문에 true가 나온다.


console.log(Object.getPrototypeOf(ray) === FemaleIdolModel.prototype);
// false

console.log(Object.getPrototypeOf(ray) === IdolModel.prototype);
// true
````



#### 함수의 prototype 변경

````javascript
FemaleIdolModel.prototype = IdolModel.prototype;
// 이것도 된다.

const eSeo = new FemaleIdolModel('이서', 2007);

console.log(Object.getPrototypeOf(eSeo) === FemaleIdolModel.prototype);
// true
// FemaleIdolModel로 생성했기 때문에


console.log(FemaleIdolModel.prototype === IdolModel.prototype);
// true
// 우리가 prototype을 직접 변경해버리면, new 키워드로 인스턴스를 생성할때 변경한 프로토타입을 상속받기 때문에 전부 같아진다.
````
