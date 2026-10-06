---
date: '2023-12-22 15:35:00 +0900'
title: 'ES6 class'
summary: 'ES6 클래스 문법은 좀 더 JAVA 스럽게 객체 지향적으로 표현하기 위해 추가된 새로운 문법이다. ES5 까지 JavaScript에는 클래스가 없었다. 그래서 프로토타입 체이닝을 통해 클래스 비스무리하게 구현 해왔었는데 ES6 버전에 들어서면서 클래스와 비슷한 구조 문법을 추가하였다. 다만'
author: ['aluvy']
categories: ['JavaScript']
tags: ['']
thumbnail: ''
---


ES6 클래스 문법은 좀 더 JAVA 스럽게 객체 지향적으로 표현하기 위해 추가된 새로운 문법이다.

ES5 까지 JavaScript에는 클래스가 없었다. 그래서 프로토타입 체이닝을 통해 클래스 비스무리하게 구현 해왔었는데 ES6 버전에 들어서면서 클래스와 비슷한 구조 문법을 추가하였다.

다만 생김새만 클래스 구조이지, 엔진 내부적으로는 프로토타입 방식으로 작동된다.

## ES5 프로토타입 문법 VS ES6 클래스 문법

이 둘은 같은 결과를 출력하지만, 문법 생김새만 다르고 내부 로직은 완전히 같은 구조다.

**ES5 프로토타입 문법**

````javascript
// 생성자 함수
function Person({name, age}){
  this.name = name;
  this.age = age;
}

Person.prototype.introduce = function(){
	return `안녕하세요, 제 이름은 ${this.name}입니다.`;
}

const person = new Person({name: '홍길동', age: 20});
console.log(person.introduce()));	// 안녕하세요, 제 이름은 홍길동입니다.
````

**ES6 클래스 문법**

````javascript
// 클래스
class Person {
  name;
  age;

  constructor({name, age}){
    this.name = name;
    this.age = age;
  }

  introduce(){
    return `안녕하세요, 제 이름은 ${this.name}입니다.`;
  }
}

const person = new Person({name: '홍길동', age: 20});
console.log(person.introduce());	// 안녕하세요, 제 이름은 홍길동입니다.
````


## class 문법

constructor는 인스턴스를 생성하고 클래스 필드를 초기화하기 위한 특수한 메서드이다.   
constructor는 클래스 안에 한 개만 존재할 수 있다. 2개 이상 있을 경우 Syntax Error가 발생한다.

````javascript
class Person {
  height = 180;	// 인스턴스 변수
  name;
  age;

  // constructor는 이름을 변경할 수 없다.
  constructor(name, age){
    // this는 클래스가 생성할 인스턴스를 가리킨다.
    this.name = name;
    this.age = age;
  }
}

let person1 = new Person('john', 23);
console.log(person1.name);	// john
console.log(person1.age);	// 23
console.log(person1.height);	// 180
````

클래스 필드의 선언과 초기화는 반드시 constructor 내부에서 실시한다.   
constructor 내부에 선언한 클래스 필드는 클래스가 생성할 인스턴스에 바인딩 된다.   
클래스 필드는 그 인스턴스의 프로퍼티가 되며, 인스턴스를 통해 클래스 외부에서 언제나 참조할 수 있다. (public)



## class 메소드

클래스의 메소드를 정의할 때는 객체 리터럴에서 사용하던 문법과 유사한 문법을 사용한다.

````javascript
class Calculator {
  add(x,y){
    return x + y;
  }
  subtract(x,y){
    return x-y;
  }
}

let calc = new Calculator();
calc.add(1,10);	// 11
````

객체 리터럴의 문법과 마찬가지로, 임의의 표현식을 대괄호로 둘러싸서 메소드의 이름으로 사용할 수도 있다.

````javascript
const methodName = 'introduce';	// 클래스 메소드 이름

class Person {
  name;
  age;
  constructor({name, age}){
    this.name = name;
    this.age = age;
  }

  // 아래 메소드의 이름은 `introduce`가 됩니다.
  [methodName](){
    return `안녕하세요, 제 이름은 ${this.name}입니다.`;
  }
}

console.log(new Person({name: '홍길동', age: 20}).introduce());
// 안녕하세요, 제 이름은 홍길동입니다.
````

## getter / setter

클래스 내에서 getter 혹은 setter를 정의하고 싶을 때는 메소드 이름 앞에 get 또는 set을 붙여주면 된다.

````javascript
class Account {
  constructor(){
    this._balance = 0;
  }

  get balance(){
    return this._balance;
  }
  set balance(newBalance){
    return this._balance = newBalance;
  }
}

const account = new Account();
account.balance = 10000;
account.balance;	// 10000
````


## 정적 메소드 static

정적 메서드는 클래스의 인스턴스가 아닌 클래스 이름으로 곧바로 호출되는 메서드이다.   
static 키워드를 메소드 이름 앞에 붙여주면 해당 메소드는 정적 메소드가 된다.

> 우리가 랜덤 값을 얻기 위해 Math.random() 같은 메서드를 쓰듯이, 따로 new Math() 없이 곧바로 클래스명.메서드명 으로 함수를 호출해서 사용하는 것이 바로 random 메소드가 static으로 설정되어 있기 때문이다.
{: .prompt-tip}

````javascript
class Person {
  name;
  age;
  constructor({name, age}){	// 생성자 인스턴스
    this.name = name;
    this.age = age;
  }
  static static_name = 'STATIC';	// 정적 인스턴스

  getName(){	// 인스턴스(프로토타입) 메소드
    return this.name;
  }
  static static_getName(){	// 정적 메소드
    return this.static_name;
  }
}

const person = new Person({ name: 'jeff', age: 20 });
person.getName();	// jeff
person.static_getName();	// STATIC
````

````javascript
class Person {
  name;
  age;
  constructor({name, age}){
    this.name = name;
    this.age = age;
  }

  // 이 메소드는 정적 메소드
  static static_sumAge(...people){
    /*
    함수 파라미터 people를 스프레드 연산자 ...people을 통해 배열로 만듦
    [ { name: '홍길동', age: 20 }, { name: '김길동', age: 23 } ]
    */

    // 그리고 각 객체의 age 값을 얻어와 합침
    return people.reduce((acc,person)=> acc + person.age, 0);
  }
}

const person1 = new Person({ name: '홍길동', age: 20 });
const person2 = new Person({ name: '김길동', age: 23 });

Person.static_sumAge(person1, person2);	// 43
````


## 제너레이터

Generator 메소드를 정의하려면, 메소드 이름 앞에 * 기호를 붙여주면 된다.

````javascript
class Gen {
  *[Symbol.iterator](){
    yield 1;
    yield 2;
    yield 3;
  }
}

// 1, 2, 3이 순서대로 출력됩니다.
for(let n of new Gen()){
	console.log(n);
}
````


## 클래스 상속 (class Inheritance)
클래스 상속(class inheritance, subclassing) 기능을 통해 한 클래스의 기능을 다른 클래스에서 재사용할 수 있다.

### extends 키워드
extends 키워드는 클래스 다른 클래스의 하위 클래스로 만들기 위해 사용된다.

````javascript
class Parent {
	// ...
}

class Child extends Parent {
	// ...
}
````

위 코드에서 extends 키워드를 통해 Child 클래스가 Parent 클래스를 상속했다.   
이 관계를 보고 '부모 클래스 - 자식 클래스 관계' 혹은 '슈퍼 클래스(superclass) - 서브 클래스(subclass) 관계'라고 말하기도 한다.

따라서 어떤 클래스 A가 다른 클래스 B를 상속 받으려면, 다음과 같은 일들이 가능해진다.

- 자식 클래스 A를 통해 부모 클래스 B의 정적 메소드와 정적 속성을 사용할 수 있다.
- 부모 클래스 B의 인스턴스 메소드와 인스턴스 속성을 자식 클래스 A의 인스턴스에서 사용할 수 있다.

````javascript
class Parent {
  static staticProp = 'staticProp';
  static staticMethod() {
    return 'I\'m a static method.';
  }
  instanceProp = 'instanceProp';
  instanceMethod() {
    return 'I\'m a instance method.';
  }
}

class Child extends Parent {}

// 상속하면 부모의 static요소들을 사용 가능
console.log(Child.staticProp); // staticProp
console.log(Child.staticMethod()); // I'm a static method.

// 상속하면 부모의 인스턴스를 사용 가능
const c = new Child();
console.log(c.instanceProp); // instanceProp
console.log(c.instanceMethod()); // I'm a instance method.
````

## Super 키워드

super 키워드의 동작 방식은 다음과 같다.

- **생성자 내부에서 super를 함수처럼 호출하면, 부모 클래스의 생성자가 호출**
- 정적 메소드 내부에서는 `super.prop` 과 같이 써서 부모 클래스의 prop 정적 속성에 접근할 수 있다.
- 인스턴스 메소드 내부에서는 `super.prop` 과 같이 써서 부모 클래스의 prop 인스턴스 속성에 접근할 수 있다.

````javascript
super(); // 부모 생성자
super.메소드명 // 접근
````

````javascript
class Person{
  name;
  first;
  second;
  constructor(name, first, second){
    this.name = name;
    this.first = first;
    this.second = second;
  }

  sum(){
    return (this.first + this.second);
  }
} 

class Person2 extends Person{
  // override Person
  constructor(name, first, second, third){
    super(name, first, second); //부모 생성자를 가져와서 행하게 한다.
    this.third = third;
  }

  sum(){
    // 부모 메소드를 가져와서 사용.
    // 오버로딩 메소드에서 온전한 부모 메소드를 사용하고 싶을때
    return super.sum() + this.third; 
  }
}

var kim = new Person2('kim', 10, 20, 30);
document.write(kim.sum()); // 60
````


## Private 클래스 변수

이전까지 자바스크립트 클래스의 모든 메서드는 public으로 지정되었다.

그래서 유명무실한 반쪽짜리 클래스 구현체로 비난을 받아왔지만, ES2021 부터는 메소드와 필드명 앞에 # 을 붙여서 프라이빗 메서드와 필드 정의가 가능해졌다. (보다 JAVA 스러워졌다)

`#` 기호를 접두사로 사용하여 메서드와 접근자를 비공개로 설정할 수 있으며, 동시에 getter 및 setter 메서드를 사용할 수 있다.

````javascript
class myClass {
  // private 변수
  #num = 100

  // private 메서드
  #privMethod(){
    console.log(this.#num); // 프라이빗 변수 호출
  }

  publicMethod() {
    this.#privMethod(); // 프라이빗 메소드 호출
  }
}
 
let newClass = new myClass();
newClass.publicMethod() // 100
````


### Private Fileds 체크하기

private 변수를 클래스에 추가하는 것 까지는 좋았지만, 클래스를 이용할 때, 이 클래스 인스턴스가 private 인지 public 인지 확인이 어려운 경우가 있었다.

왜냐하면 public 필드에 대해 클래스의 존재하지 않는 필드에 접근을 시도하면 undefined가 반환되는 반면에, private 필드는 undefined대신 예외를 발생시키게 되기 때문이다. 그래서 특정 객체에 어떤 private 프로퍼티가 있는지 확인하기 어려웠다.

따라서 in 키워드를 사용해 이 객체 안에 private 속성/메소드가 있는지 체크할 수 있다.

````javascript
class Foo {
   #brand = 100;
   static isFoo(obj) {
      return #brand in obj;
   }
}

const foo = new Foo();
const foo2 = { brand: 100 };
console.log('foo : ', Foo.isFoo(foo)); // true
console.log('foo2 : ', Foo.isFoo(foo2)); // false
````

---
<br>

##### 참고
- [📚 자바스크립트 클래스 문법 - 완벽 가이드](https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-ES6-Class-%EB%AC%B8%EB%B2%95-%EC%99%84%EB%B2%BD-%EC%A0%95%EB%A6%AC)