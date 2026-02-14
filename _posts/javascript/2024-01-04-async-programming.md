---
title: "[JavaScript] Async Programming"
date: 2024-01-04 14:40:00 +0900
categories: [JavaScript]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

자바스크립트는 싱글 스레드 프로그램이기 때문에 한번에 단 한개의 작업만 할 수 있다.   
이러한 싱글 스레드의 단점을 Async Programming을 이용해 많은 부분 극복할 수 있다.

## Thread란?

CPU를 살 때 '8코어 16스레드' 와 같인 스펙이 적혀있는 것을 볼 수 있다.   
8개의 코어가 각각 2개의 스레드를 소유하고 있어서 16개의 스레드를 사용할 수가 있다는 뜻이다.

스레드는 가장 작은 단위의 Working Unit이라고 보면 되는데,   
쉽게 말해서 16스레드 라고 하면 동시에 작업할 수 있는 것이 16개라는 뜻이다.   
스레드가 몇개 있느냐는 CPU가 동시에 몇개의 작업을 연산할 수 있는가를 의미한다.

**JavaScript는 Single Threaded다**{: .fc-primary}   
자바스크립트는 어느 한 순간에 동시에 단 하나의 작업만 실행할 수 있다.   
굉장히 비효율적인 것 처럼 느껴지지만, 싱글 스레드의 단점을 Async Programming으로 많은 부분 극복할 수 있다.


## Async Programming (비동기 프로그래밍)
아래와 같은 프로그램을 구현해보자.

````
1. 콘솔에 'Hello' 출력
2. 2초가 걸리는 작업 시작
3. 위 작업 시작 후 (작업이 끝나기 전) 바로 'World' 출력
4. 2초가 걸리는 작업 완료 후 '완료' 출력
````

여기에서 중요한 포인트는   
2. 2초가 걸리는 작업을 시작한 후 바로 3. 'World' 라는 단어를 출력하고,   
3. 그 후 2초가 걸리는 작업이 완료되면 '완료'라는 단어를 출력하는 것이다.

Sync Programming(동기 프로그래밍)에서는 위 프로그램을 구현할 수 없다.   
**while Loop이 실행 되는 2초 동안 스레드에서 다른 코드를 전혀 실행할 수가 없기 때문이다.**
{: .fc-danger}

![alt text](/assets/images/posts/2024/01/04/async-programming-01.png)

비동기 함수인 setTimeout() 을 사용해 구현할 수 있다.

````javascript
function longWork(){
  setTimeout(()=>{	// setTimeout은 비동기로 실행된다.
    console.log('완료');
  }, 2000);	// 2초 후 실행
}

console.log('Hello');
longWork();
console.log('World');

/*
Hello
World
완료
*/
````

'Hello' 문자 출력 후 setTimeout() 함수를 실행한다.   
**setTimeout()은 비동기 함수**이기 때문에, setTimeout()함수가 실행 되자마자 **스레드가 비워지고**   
'World' 문자를 출력할 수 있게 된다.   
그리고 setTimeout()함수가 실행된 후 2초 뒤에 '완료' 문자를 출력한다.

> 비동기 프로그래밍을 사용하면   
> 싱글 스레드로 자바스크립트 런타임을 실행하더라도 효율적으로 스레드를 작업할 수 있다.
{: .prompt-tip}


## Async Progamming 동작원리 : Event Loop
싱글 스레드인 자바스크립트 엔진 안에는 Memory Heap과 Call Stack이 존재한다.   
그리고 Task Queue (Event Queue) 라는게 존재한다.

Call Stack에서 비동기 함수가 실행되면   
비동기 함수는 Call Stack에서 Event Queue로 옮겨지게 된다.   
이 때 비워진 Call Stack에서 다른 함수들이 실행된다.

Event Loop은   
Event Queue에 옮겨진 비동기 함수가 종료될 때 까지 기다리고 있다가   
비동기 함수가 종료됬을 때, 콜스텍이 비어있으면 종료된 비동기 함수를 Call Stack으로 다시 옮겨 실행하게 된다.

![alt text](/assets/images/posts/2024/01/04/async-programming-02.png)
