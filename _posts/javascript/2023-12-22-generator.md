---
title: "[JavaScript] 제너레이터 - 이터레이터 강화판"
date: 2023-12-22 15:55:00 +0900
categories: [JavaScript]
tags: []
render_with_liquid: false
math: true
mermaid: true
---


## 1. 제너레이터란?

**이터러블이며 동시에 이터레이터 = 이터레이터를 리턴하는 함수**
(async가 Promise를 리턴하는 함수듯이, 제너레이터는 이터레이터를 리턴하는 함수다.)

제너레이터 함수를 사용하면 [이터레이션 프로토콜](https://poiemaweb.com/es6-iteration-for-of)을 준수해 이터러블을 생성하는 방식보다 간편하게 구현할 수 있다.   
(Promise와 async 관계와 비슷하게 보면 된다.)


### 1.1 이터러블 프로토콜 방식

````javascript
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    return {
      current: this.from,
      last: this.to,

      next() {
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

// {from: 1, to: 5, Symbol(Symbol.iterator): ƒ}
// 이 객체는 인자를 from, to 두개 가지고있는 그냥 객체가 아니라,
// 이터레이터가 적용된 특수한 객체이다. 이 객체를 전개연산자 할 경우 순회되어 나타나게된다.
alert([...range]); // 1,2,3,4,5
````

#### 1.1.1 제너레이터 방식 1 (function 옆에 *을 붙인다.)

````javascript
const range = function* () { //제너레이터 지정해주면 얘 자체가 이터레이터를 반환해준다.
  let i = 1; 
  while(true){ //어차피 안에 yield에 의해서 코드가 멈추니 무한루프 해줘서 원할때 진행을 이어나갈수 있게 한다
    if (i <= 5)
      yield ++i;
      /* yield를 만나면 일시정지되고, 값을 건네준다. 그리고 for..of에 의해서 next()
        가 호출되면 함수 실행을 이어 나간다. 
        이터러블 일경우 next()를 정의하고 안에 리턴값을 {value:,donw:}을 일일히
        정의 해줘야 하는데, 제너레이터는 yield로 퉁칠수 있다. */
    else
      return;
  }
};

for(let i of range()){
  console.log(i); // 1,2,3,4,5
}
````

#### 1.1.2 제너레이터 방식 2 (심볼 이터레이터 메소드에 한방 정리)

````javascript
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // [Symbol.iterator]: function*()를 짧게 줄임
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

alert( [...range] ); // 1, 2, 3, 4, 5
````


## 2. 제너레이터의 정의

제너레이터 함수는 일반 함수와는 다른 독특한 동작을 한다.   
제너레이터 함수는, 일반 함수 처럼 함수의 **코드 블록을 한 번에 실행하지 않고 함수 코드 블록의 실행을 일시 중지했다가 필요한 시점에 재시작**할 수 있는 특수한 함수이다.

````javascript
// 제너레이터 함수 선언식
function* genDecFunc() {
  yield 1;
}
let generatorObj = genDecFunc(); // 제너레이터 함수 실행 결과 반환된 제너레이터 객체를 변수에 넣어 사용한다.


// 제너레이터 함수 표현식
const genExpFunc = function* () {
  yield 1;
};
generatorObj = genExpFunc();


// 제너레이터 메소드 식
const obj = {
  * generatorObjMethod() {
    yield 1;
  }
};
generatorObj = obj.generatorObjMethod();


// 제너레이터 클래스 메소드 식
class MyClass {
  * generatorClsMethod() {
    yield 1;
  }
}
const myClass = new MyClass();
generatorObj = myClass.generatorClsMethod();
````


### 2.1 yield / next

yield는 제너레이터 **함수의 실행을 일시적으로 정지시키며, yield 뒤에 오는 표현식은 제너레이터의 caller에게 반환**된다.

next 메소드는 { value, done } 프로퍼티를 갖는 이터레이터 객체를 반환한다.   
**즉, value 프로퍼티는 yield 문이 반환한 값**이고 **done** 프로퍼티는 제너레이터 함수 내의 모든 yield 문이 실행되었는지를 나타내는 boolean 타입의 값이다.

마지막 yield 문까지 실행된 상태에서 next 메소드를 호출하면 done 프로퍼티 값은 true가 된다.

````javascript
function* generateSequence(){
  ...코드
  yield 1; // 첫번째 호출 시에 이 지점까지 실행된다.
  ...코드
  yield 2; // 두번째 호출 시에 이 지점까지 실행된다.

  return 3;
}

// 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.
// 제너레이터 객체는 이터러블이며 동시에 이터레이터이다.
// 따라서 Symbol.iterator 메소드로 이터레이터를 별도 생성할 필요가 없다
let iter = gen();

//실행 결과가 자기 자신인 Sysmbol.iterator를 가지고 있다. 
console.log(iter[Symbol.iterator]() == iter) // true

//value, done 이 있는 객체를 반환하는 next를 호출하면 이터러블 객체를 반환하고 함수는 일시중단 된다.
console.log(iter.next()); // { "value": 1, "done": false } + 함수 실행 중단
console.log(iter.next()); // { "value": 2, "done": false } + 함수 실행 중단

console.log(iter.next()); // { "value": 3, "done": true } + 순회 종료
````

- 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다. 근데 제너레이터 객체는 이터러블이며 동시에 이터레이터이다. 따로 Symbol.iterator 호출 작업 없이 이터레이터로 치부되니까 Symbol.iterator 메소드로 이터레이터를 별도 생성할 필요가 없다

- 제너레이터레서 yield를 통하여 몇 번의 next 를 통해 값을 꺼낼 수 있는지 정할 수 있다.

- next()함수가 실행되면 yield 순서대로 실행되고 일시 중단된다.
  - start -> generatorObj.next() -> yield 1 -> generatorObj.next() -> yield 2 -> ... -> end

- 제너레이터의 실행 결과가 이터레이이터이기 때문에 for..of 역시 사용 가능하다.
  - 단, next()를 통해 **순회가 끝나면 for..of에서 안찍힌다.**
  - 그리고 next와는 달리 **for..of에서 호출에서는 return의 값은 찍히지 않는다.**

- return을 하면 리턴값을 value와 함께 done이 true가 되면서 순회를 종료 한다.



#### 2.1.1 yield* (제너레이터 컴포지션)

다음과 같은 제너레이터 함수를 생성하려 한다.

처음엔 숫자 0부터 9까지를 생성합니다(문자 코드 48부터 57까지),   
이어서 알파벳 대문자 A부터 Z까지를 생성합니다(문자 코드 65부터 90까지).   
이어서 알파벳 소문자 a부터 z까지를 생성합니다(문자 코드 97부터 122까지).

일반적인 for문을 사용한 구현방법이다.

````javascript
function* generateAlphaNum() {

  for (let i = 48; i <= 57; i++) 
      yield i; // 0123456789

  for (let i = 65; i <= 90; i++) 
      yield i; // ABCDEFGHIJKLMNOPQRSTUVWXYZ

  for (let i = 97; i <= 122; i++) 
      yield i; // abcdefghijklmnopqrstuvwxyz
}

let str = '';
for(let code of generateAlphaNum()) {
  str += String.fromCharCode(code);
}

alert(str); // 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
````

하지만 제너레이터의 특수 문법 **yield***를 사용하면 **제너레이터를 다른 제너레이터에 ‘끼워 넣을 수’** 있다.   
yield에 `*`를 붙여 사용하게 되면, **yield*와 함께 표현된 이터러블 객체를 순회하게 된다.**

````javascript
function* generateSequence(start, end) { // 시작과 끝을 정해서 순회하는 제너레이터
  for (let i = start; i <= end; i++) 
     yield i;
}

function* generatePasswordCodes() {
/* 제너레이터 함수를 실행할땐 보통 let a = generateSequence(48, 57);
   변수에다 널고, a.next()를 통해 순회한다.
   하지만 yield* 에 바로 순회가 가능하다. 
   이는 마치 비동기 파트에서 Promise().then()보다 await Promise() 쓰는 격과 비슷하다고 보면 된다.
*/

  // 0..9
  yield* generateSequence(48, 57); // generateSequence()함수의 리턴값은 제너레이터 객체이다. yield*는 제너레이터 객체를 쭉 순회시킨다.

  // A..Z
  yield* generateSequence(65, 90);

  // a..z
  yield* generateSequence(97, 122);
}

let str = '';
for(let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

alert(str); // 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
````

**+ 추가**

````javascript
function* innerGenerator() {
  yield* ['a', 'b', 'c'];
}

function* generator() {
  yield [1, 2, 3]; // 그냥 yield 하면 배열 자체를 준다.

  yield* [4, 5, 6]; // yield*는 받은 값이 이터레이터 객체일경우 순회한다. 즉, 배열을 풀어서 순회한다.

  yield* innerGenerator();
}

[...generator()];
// [[1, 2, 3], 4, 5, 6, 'a', 'b', 'c']
````

````javascript
function* iterableYield() {
  const a = 1;
  yield a;
  yield* [1, 2, 3].map(el => el * (10 ** a)); // 결과인 배열은 자체가 이터러블 객체이다.

  const b = 2;
  yield b;
  yield* [1, 2, 3].map(el => el * (10 ** b));

  const c = 3;
  yield c;
  yield* [1, 2, 3].map(el => el * (10 ** c));
}

function run(gen) {
  const it = gen();

  (function iterate({ value, done }) {
    console.log({ value, done });
    if (done) {
      return value;
    }

    iterate(it.next(value)); // 재귀로 next()를 반복
  })(it.next());
}

run(iterableYield);
// { value: 1, done: false }
// { value: 10, done: false }
// { value: 20, done: false }
// { value: 30, done: false }
// { value: 2, done: false }
// { value: 100, done: false }
// { value: 200, done: false }
// { value: 300, done: false }
// { value: 3, done: false }
// { value: 1000, done: false }
// { value: 2000, done: false }
// { value: 3000, done: false }
// { value: undefined, done: true }
````



#### 2.1.2 next(인자값) 전달하기

아래 예시에서는 next가 인자값과 함께 호출 되었다.   
첫 번째 호출이 아무것도 출력하지 않은 것은 Generator가 아직 아무런 값도 yield 하지않았기 때문이다.   
(두 번째 호출과 함께 전달된 정수 2는 Generator 내부의 yield 키워드에 전달되어 value로 할당되었고 console.log로 출력되었다)

````javascript
function* gen() {
  while(true) {
    var value = yield null; // null값을 보내고, next(인자값)을 통해 값을 받는다.
    console.log(value);
  }
}

var g = gen();
g.next(1);
// "{ value: null, done: false }"
g.next(2);
// "{ value: null, done: false }"
// 2
````



#### 2.1.3 ... 전개연산자 제너레이터

**spread문법은 이터러블 객체에 한해서 작동**한다.   
제너레이터는 이터러블에 이터레이터라서 이 역시 적용이 가능하다.   
전개연산자를 이용하면 굳이 변수에 넣고, next()를 반복문 할 필요없이 바로바로 펼쳐서 요소값들이 순회 나열 된다.

````javascript
function* generateName() {
  yield 'W';
  yield 'O';
  yield 'N';
  yield 'I';
  yield 'S';
  yield 'M';
}

// for..of
const genForForOf = generateName();
for (let i of genForForOf) {
  console.log(i);
}
// 'W'
// 'O'
// 'N'
// 'I'
// 'S'
// 'M'

// ...Spread
const genForSpread = generateName();
console.log([...genForSpread]); // ['W', 'O', 'N', 'I', 'S', 'M']
````



#### 2.1.4 제너레이터 종료

제너레이터에는 **next 외에도 throw, return 등의 메소드**가 있는데, 이 return과 throw를 통해 제너레이터를 종료할 수 있다. 다만, 이 둘은 조금의 차이가 있다.
​
**\[return\]**

````javascript
function* increment() {
  let i = 0;

  try {
    while (true) {
      yield i++;
    }
  } catch (e) {
    console.log('[ERROR]', e);
  }
}

const withReturn = increment();

console.log(withReturn.next()); // { value: 0, done: false } : i++ 라서 0부터 찍힌다.
console.log(withReturn.next()); // { value: 1, done: false }
console.log(withReturn.next()); // { value: 2, done: false }
console.log(withReturn.next()); // { value: 3, done: false }
console.log(withReturn.return(42)); // { value: 42, done: true }
````

return이 호출되고 나면, value에는 return의 인자가 할당되고, done은 true가 된다.

**\[throw\]**

````javascript
const withThrow = increment();

console.log(withThrow.next());
console.log(withThrow.next());
console.log(withThrow.next());
console.log(withThrow.next()); // { value: 3, done: false }
console.log(withThrow.throw(-1)); // Uncaught -1
````

throw가 호출되고 나면, catch 블록에 throw의 인자가 전달된다.


#### 2.1.5 실전\) 지연 평가의 장점

1부터 99까지 순회할 수 있는 반복자를 만들어 보자.   
먼저 배열을 만드는 방법은,

````javascript
function newArr(n) {
  let i = 1;
  const res = [];
  while (i < n) 
     res.push(i++);
  return res;
}
const arr = newArr(100);
console.log(arr); // [1,2,3 ... 99, 100]
````

제너레이터로 만드는 방법은,

````javascript
function* newArrGen(n) {
  let i = 1;
  while (i < n) 
     yield i++;
}
const iter = newArrGen(100);
console.log(iter);
````

이제 위의 두 함수를 가지고 만들어진 반복 가능한 객체로 5의 배수를 작은 수부터 2개만 찾도록 구현해보자

````javascript
function fiveArr(iter) {
  const res = [];
  for (const item of iter) {
    if (item % 5 == 0) 
       res.push(item);
    else if (res.length == 2) 
       break;
  }
  return res;
}

console.log(fiveArr(newArr(100)));
console.log(fiveArr(newArrGen(100)));

/* 
실행 결과
[ 5, 10 ] 
[ 5, 10 ]
*/
````

같은 결과를 만들어낸다.   
배열을 만들어 넣어 돌리든, 제너레이터로 돌리든 똑같은 순회를 하는 것이다.

**하지만 제너레이터를 활용한 코드는 좀 더 빠르게 동작한다.**   
이 차이가 즉시 평가와 지연 평가인데,

- **fiveArr(newArr(100))**
  - 코드는 newArr 함수가 배열을 즉시 만들어낸다. (1~99까지) 만들어진 배열을 리턴해서 fiveArr 함수를 수행하게 된다.
  - 쉽게 말해 fiveArr([1, 2, 3, 4, 5, 6, ..., 97, 98, 99]) 된다는 것이다.

- **fiveArr(newArrGen(100))**
  - 코드는 **newArrGen 함수가 이터레이터만 만들어내고 fiveArr 함수에서 필요할 때 이터레이터에서 평가된 값을 사용**하게 된다.


극단적으로 크기를 올려서 시간을 비교해보자.

````javascript
console.time('');
console.log(fiveArr(newArr(10000000))); // [ 5, 10 ]
console.timeEnd(''); // : 285.535ms


console.time('');
console.log(fiveArr(newArrGen(10000000))); // [ 5, 10 ]
console.timeEnd(''); // : 7.296ms
````
어마어마한 크기의 반복 가능한 객체를 만든 다음에 fiveArr 함수를 실행하는 모습이다.   
그러나 즉시 평가와 달리 지연 평가는 확실히 빠르게 동작하는 것을 볼 수 있다.

또한, 값이 필요할 때 이터레이터에서 꺼내 쓰므로 무한대로 이터레이터를 만들어도 결과는 같다.

````javascript
console.time('');
console.log(fiveArr(newArrGen(Infinity))); // [ 5, 10 ]
console.timeEnd(''); // : 7.441ms
````


#### 2.1.6 제너레이터 비동기 처리

````javascript
const fetch = require('node-fetch');

function getUser(genObj, username) {
  fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
    // ① 제너레이터 객체에 비동기 처리 결과를 전달한다.
    .then(user => genObj.next(user.name));
}

// 제너레이터 객체 한방 생성
const g = (function* () {
  let user;
  // ② 비동기 처리 함수가 결과를 반환한다.
  // 비동기 처리의 순서가 보장된다.
  user = yield getUser(g, 'jeresig'); // genObj.next(user.name)에 의해서 유저이름이 반환된다.
  console.log(user); // John Resig

  user = yield getUser(g, 'ahejlsberg');
  console.log(user); // Anders Hejlsberg

  user = yield getUser(g, 'ungmo2');
  console.log(user); // Ungmo Lee
}());

// 제너레이터 함수 시작
g.next();
````

1. 굉장히 복잡해 보이지면 별거없다. 차례대로 해보자.
2. 우선 변수 g에 제너레이터 함수 즉시실행으로, 반환값 제너레이터 객체를 받았다. 즉 변수 g는 제너레이터 객체.
3. g.next()를 통해 순회를 시작한다. 그러면 첫 yield로 간다
4. 이 첫 yield에서 getUser()함수를 실행한다. 인자로 call by reference로 g객체를 전달한다.
5. getUser()함수에서 fetch된 결과로 genObj.next(인자값)이 실행된다. next에 값이 있으니, 반환값으로 변수 user에 인자값이 들어가게 된다.
6. 이를 반복한다.

그냥 async / await 쓰면 간단하게 구현할수있다.




#### 2.1.7 요약

​제너레이터 돌리기 위한 3가지 방법.

1. 제너레이터 함수 반환값(`[Symbol.iterator]()`)을 받아서 하나씩 next() 하는법
2. 제너레이터 함수를 for..of문으로 돌리는 방법
3. 제너레이터 함수를 `[...]` spread문법써서 펼치는 법



---

<br>

##### 참고

- [\[JS\] 📚 제너레이터 - 이터레이터 강화판](https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EC%A0%9C%EB%84%88%EB%A0%88%EC%9D%B4%ED%84%B0-%EC%9D%B4%ED%84%B0%EB%A0%88%EC%9D%B4%ED%84%B0-%EA%B0%95%ED%99%94%ED%8C%90)
- [제너레이터(Generators) 란? :: 마이구미](https://mygumi.tistory.com/370Visit)
- [제너레이터와 async/await](https://poiemaweb.com/es6-generatorVisit)
- [JavaScript Generator 이해하기](https://wonism.github.io/javascript-generator/Visit)
- [\[Javascript\] Generator 활용과 장점 (iterable, iterator, lazy evaluation)](https://bbaktaeho-95.tistory.com/80)
