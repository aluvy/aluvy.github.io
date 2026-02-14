---
title: "[JavaScript] async, await"
date: 2024-01-04 16:05:00 +0900
categories: [JavaScript]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## async, await
async, await을 사용해서 비동기 프로그래밍을 할 수 있다.

async 키워드를 사용해서 함수를 선언하게 되면 함수 내부에서 await 키워드를 사용할 수 있다.   
await 키워드는 promise로 만든 함수에만 사용할 수 있다.   
await을 사용하면 다음 코드를 실행하지 않고 promise를 기다린다.

하지만 스레드를 막고 있지는 않아서 함수 외부의 다른 코드는 실행된다.

````javascript
const getPromise = (seconds) => new Promise((resolve, reject)=>{
  setTimeout(()=>{
    resolve('완료');
  }, seconds * 1000);
});


// async 함수 선언
// async 함수 키워드로 함수를 선언하면 함수 내부에서 await 키워드를 사용할 수 있다.
async function runner(){
  const result1 = await getPromise(1);
  /*
  await은 promise에다가만 쓸 수 있다.
  await을 사용하면 Promise를 기다린다.
  await의 다음 코드가 await 키워드 뒤의 함수(Promise)가 끝날때 까지 실행되지 않는다.

  하지만 스레드를 막고 있지는 않아서
  runner() 함수 외부의 다른 함수는 실행된다.
  */

  console.log(result1);


  const result2 = await getPromise(2);
  console.log(result2);
  const result3 = await getPromise(1);
  console.log(result3);
}

runner();
console.log('실행 끝');


/*
실행 끝
완료
완료
완료
*/
// '실행 끝' 출력 후 1초 뒤에 '완료' 출력
// 그리고 2초 뒤에 '완료' 출력
// 그리고 1초 뒤에 '완료' 출력
````

resolve() 함수는 잘 실행이 되지만 reject() 함수를 사용하면 에러가 발생한다.   
try, catch 문을 사용해야 한다.

````javascript
const getPromise = (seconds) => new Promise((resolve, reject)=>{
  setTimeout(()=>{
    reject('에러');
  }, seconds * 1000);
});


async function runner(){

  try {
    const result1 = await getPromise(1);
    console.log(result1);
    const result2 = await getPromise(2);
    console.log(result2);
    const result3 = await getPromise(1);
    console.log(result3);
  }
  catch(e) {
    console.log('--- catch e ---');
    console.log(e);
  }
  finally() {
    console.log('--- finally ---');
  }
}

runner();
console.log('실행 끝');


/*
--- catch e ---
에러
--- finally ---
*/
````

---
<br>

##### 참고

- [자바스크립트 async와 await](https://joshua1988.github.io/web-development/javascript/js-async-await/)
- [Async & Await](https://joshua1988.github.io/vue-camp/es6+/async-await.html)
