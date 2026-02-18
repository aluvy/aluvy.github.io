---
title: "[JavaScript] forEach와 Promise.all"
date: 2025-02-05 22:02:00 +0900
categories: [JavaScript]
tags: []
render_with_liquid: false
math: true
mermaid: true
---


## ForEach의 동작
먼저 예시 프로그램을 하나 보겠습니다.

````js
function test() {
  const testFunction = num => new Promise((resolve) => setTimeout(() => resolve(`${num}`), num));
  const list = [3000, 2000, 3000, 4000, 1000, 1000, 2000, 3000, 1000, 1000];
  
  list.forEach( val => {
    const result = testFunction(val);
    result.then(cosole.log);
  })
}

test();
````

list 에는 순서대로 timeout의 값들이 들어가 있고, forEach를 통해 순회하면서 testFunction을 실행하여 해당 결과를 출력해주는 프로그램이다.

순서대로 반복한다는 점에서 개발자는 3000, 2000, 3000, 4000, 1000, 1000, 2000, 3000, 1000, 1000 의 순서대로 결과가 출력된다는 것을 예측할 수 있다.

![alt text](/assets/images/posts/2025/02/05/foreach-promise-all-01.png)
_https://velog.io/@0709/forEach%EC%99%80-Promise.all_

그런데 순서가 이상하다. 숫자가 작은 것부터 큰 것 순으로 마치 정렬된 것 처럼 결과가 출력되었다.

````js
Array.prototype.forEach = function (callback) {
  for (let index = 0; index < this.length; index++ ) {
    callback(this[index], index, this);
  }
}
````

forEach는 해당 코드와 같이 동작한다. list의 요소를 순회하면서 callback 함수를 '호출' 한다.

callback 함수에 비동기 로직이 존재한다면? 이전 callback 함수의 결과를 받지도 않고 다음 callback을 호출하기 때문에 순서가 지켜질 수 없는 구조다. 그럼 이전 프로그램의 문제를 보겠다.

forEach문은 다음과 같이 콜백함수 내부에서 testFunction을 호출한다.

```
testFunction(3000); -> 콜백 함수를 '호출'만 할 뿐 결과를 받지 않고 다음 testFunction 실행
testFunction(2000); -> 동일
testFunction(3000); -> 동일
testFunction(4000); -> ...
testFunction(1000);
testFunction(1000);
testFunction(2000);
testFunction(3000);
testFunction(1000);
testFunction(1000);
```

위와 같이 10번의 testFunction이 '호출' 된다. 다만 호출만 하고 다음 호출로 넘어가기 때문에 이 열번의 testFunction은 '거의' 동시에 (완벽한 동시는 아님) 실행된다. 그래서 시간 순서대로 결과가 출력된 것을 확인할 수 있다.

하지만 우리는 '호출 순서' = '결과 순서' 가 동일하기를 원한다. 프로그램을 수정한다.

````js
async function test() {
  const testFunction = (num) => new Promise((resolve) => setTimeout(()=> resolve(`${num}`), num));
  const list = [3000, 2000, 3000, 4000, 1000, 1000, 2000, 3000, 1000, 1000];
  
  for(let i=0; i<list.length; i++) {
    const result = await testFunction(list[i]);
    console.log(result);
  }
}

test();
````

이제 forEach가 아닌 단순 for문으로 변경했다.

![alt text](/assets/images/posts/2025/02/05/foreach-promise-all-02.png)
_https://velog.io/@0709/forEach%EC%99%80-Promise.all_

이제 원하는 순서대로 출력된다.   
위의 코드는 반복문의 각 단계에서 testFunction의 결과를 받을 때까지 기다리기(await) 때문이다.

그런데 뭔가 좀 아쉽다. 위의 forEach 에서 처럼 testFunction 호출은 '거의' 동시에 해놓고 결과는 순서대로 받아올 수 있다면 더 효율적이지 않을까 하는 고민이다.

for문으로 해결한 방식으로는 3+2+3+4+1+1+2+3+1+1=21 초만큼 기다려야 하지만, 만약 위의 방식이 가능하다면 4초만 기다로고도 모든 결과를 받아올 수 있기 때문이다.

프로그램을 조금 더 수정한다.

````js
function test() {
  const testFunction = (num) => new Promise((resolve) => setTimeout(()=> resolve(`${num}`), num));
  const list = [3000, 2000, 3000, 4000, 1000, 1000, 2000, 3000, 1000, 1000];
  
  Promise.all(list.map(element) => testFunction(element))
    .then(console.log)
    .catch(console.log);
}

test();
````

위 코드는 map 메소드를 활용하여 testFunction의 반환값인 Promise 객체를 가지고 있게 된다. 다만 결과값을 아직 가져오지 못햇다면 pending 상태가 된다. 하지만 호출 순서는 보장되기 때문에 결과값을 가져온 순서에는 영향을 받지 않게 된다.

Promise.all은 인자로 받은 Promise 배열이 모두 resolve 상태가 되면 then의 콜백함수를 실행하게 된다. 그래서 결과를 보면

![alt text](/assets/images/posts/2025/02/05/foreach-promise-all-03.png)
_https://velog.io/@0709/forEach%EC%99%80-Promise.all_

4초만에 결과를 얻어올 수 있었을 뿐만 아니라 순서까지 보장된다. Promise 객체를 순서대로 배열에 저장했기 때문에 가능한 일이다.

Promise.all -> map 메소드 활용 패턴과 forEach문의 동작은 기억하면 좋겠다.

---

<br>

##### 참고

- [forEach와 Promise.all](https://velog.io/@0709/forEach%EC%99%80-Promise.all)
- [배열에 비동기 작업을 실시할 때 알아두면 좋은 이야기들](https://velog.io/@hanameee/%EB%B0%B0%EC%97%B4%EC%97%90-%EB%B9%84%EB%8F%99%EA%B8%B0-%EC%9E%91%EC%97%85%EC%9D%84-%EC%8B%A4%EC%8B%9C%ED%95%A0-%EB%95%8C-%EC%95%8C%EC%95%84%EB%91%90%EB%A9%B4-%EC%A2%8B%EC%9D%84%EB%B2%95%ED%95%9C-%EC%9D%B4%EC%95%BC%EA%B8%B0%EB%93%A4)
