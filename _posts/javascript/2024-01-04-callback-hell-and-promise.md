---
title: "[JavaScript] Callback Hell and Promise"
date: 2024-01-04 15:15:00 +0900
categories: [JavaScript]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## Callback
다시 불리다.   
정의 되고 나서 바로 실행되는게 아니라 , 특정 작업이 끝난 후 다시 불려지는 함수가 콜백함수다.

setTimeout()의 첫 번째 인자가 바로 콜백함수다.

````javascript
function waitAndRun(){
  setTimeout(()=>{
    console.log('끝');
  }, 2000);
}

console.log(waitAndRun());
// 2초를 기다린 후에 '끝' 문자 출력
````

waitAndRun() 함수를 실행하게 되면   
2초를 기다린 후 '끝'이라는 문자를 출력하게 된다.

waitAndRun() 함수는 setTimeout()을 한 번만 실행하고 있다.

그런데 만약   
2초 후에 '끝'을 출력하고, 또 2초 후에 '끝'을 출력하고, ... 또 2초 후에 '끝'을 출력하고 싶다면 Promise를 사용하면 된다.


## Promise

### resolve()

Promise의 첫 번째 파라미터는 resolve다.   
resolve() 함수를 실행되면 timeoutPromise.then()을 실행시킨다.

````javascript
const timeoutPromise = new Promise((resolve, reject)=>{	// promise 객체 생성
  setTimeout(()=>{
    resolve('완료');
  }, 2000);
});

// resolve() 함수가 실행되면 .then()이라는 함수가 실행된다.
// 그러니까 2초 뒤에 '완료'라는 값을 넣어서 콜백함수가 실행된다.
timeoutPromise.then((res)=>{	// res : resolve 함수에서 넣어준 값 '완료'
  console.log('---then---');
  console.log(res);
});

/*
---then---
완료
*/
// 2초 뒤 '---then---', '완료' 문자 출력
````

Promise를 반환하는 함수를 만들어서 사용할 수 있다.

````javascript
// 함수가 promise를 반환하는 코드
const getPromise = (seconds)=> new Promise((resolve, reject)=>{
  setTimeout(()=>{
    resolve('완료');
  }, seconds * 1000);
});

getPromise(3)
  .then((res)=>{
    console.log('--- first then ---');
    console.log(res);
    
    return getPromise(3);
  })
  .then((res)=>{
    console.log('--- second then ---');
    console.log(res);
    
    return getPromise(3);
  })
  .then((res)=>{
    console.log('--- third then ---');
    console.log(res);
    
    return getPromise(4);
  });


/*
--- first then ---
완료
--- second then ---
완료
--- third then ---
완료
*/

// 3초 뒤 '--- first then ---', '완료' 출력
// 그리고 다시 3초 뒤 '--- second then ---', '완료' 출력
// 그리고 다시 4초 뒤 '--- third then ---', '완료' 출력
````


### reject()
Promise의 두 번째 파라미터는 reject다.   
reject()는 에러를 던질 때 사용한다.   
reject() 함수를 실행되면 timeoutPromise.catch()을 실행시킨다.

````javascript
const getPromise = (seconds)=> new Promise((resolve, reject)=>{
  setTimeout(()=>{
    reject('error');
  }, seconds * 1000);
});

getPromise(3)
  .then((res)=>{
    console.log('--- first then ---');
    console.log(res);
  })
  .catch((res)=>{
    console.log('--- first catch ---');
    console.log(res);
  })


/*
--- first catch ---
에러
*/

// 3초 뒤 '--- first catch ---', '에러' 출력
````

### finally()
finally()는 항상 실행되는 함수로 파라미터를 받지 않는다.

````javascript
const getPromise = (seconds)=> new Promise((resolve, reject)=>{
  setTimeout(()=>{
    reject('에러');
  }, seconds * 1000);
});

getPromise(3)
  .then((res)=>{
    console.log('--- first then ---');
    console.log(res);
  })
  .catch((res)=>{
    console.log('--- first catch ---');
    console.log(res);
  })
  .finally(()=>{
    console.log('--- finally ---');
  })


/*
--- first catch ---
에러
--- finally ---
*/

// 3초 뒤 '--- first catch ---', '에러' 출력
// 그리고 바로 '--- finally ---' 출력
````

## Promise.all()

여러 개의 Promise를 동시에 실행시킬 수도 있다.   
Promise.all() 을 사용하게 되면 가장 느리게 완료되는 함수 기준으로 then 또는 catch가 불려진다.   
3개의 Promise를 모두 동시에 실행시켰기 때문에 실행한 순서대로 배열로 값을 반환받게 된다.

````javascript
const getPromise = (seconds)=> new Promise((resolve, reject)=>{
  setTimeout(()=>{
    reject('에러');
  }, seconds * 1000);
});

Promise.all([	// static method
  // 실행할 promise들을 배열로 입력
  getPromise(1),
  getPromise(4),
  getPromise(1)
]).then((res)=>{
  console.log(res);
});

// [ '에러', '에러', '에러' ]
// 4초 뒤에 출력된다.
````
