---
title: "[JavaScript] 단축평가 논리연산자 && ||, null병합 ??, 옵셔널체이닝 ?"
date: 2024-04-15 17:03:00 +0900
categories: [JavaScript, JavaScript-basic]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## 단축평가
논리합 `||`, 논리곱 `&&` 연산자는 왼쪽부터 오른쪽으로 평가를 진행하는데,   
중간에 평가 결과가 나오면 오른쪽 끝까지 가지 않고 평가 결과를 반환해버린다.   
논리합, 논리곱 연산자 표현식은 언제나 2개의 피연산자 중 어느 한 쪽으로 평가된다.

이를 **단축평가(Short Circuit Evaluation)**라고 하며, 피연산자의 타입을 고려하지 않고 그대로 반환한다.

단축 평가를 활용하면 아래와 같은 코드가 가능해진다.

````js
"apple" || "banana";  // "apple"
"apple" && "banana";  // "banana"
````

### 논리합 ( || , A or B)

A가 `true`면 A를 반환한다.   
논리합 연산자는 두 피연산자 중 하나만 `true`여도 `true`를 반환한다.   
따라서 앞의 항 A의 값이 true라면 단축평가의 동작 원리대로 나머지 평가 과정을 멈추고 A를 반환한다.

````js
true || true;	// true
true || false;	// true
````

만약 A의 값이 `false`라면 B를 반환한다.

````js
false || true;	// true
false || false;	// false
````
 
만약 피연산자의 값이 문자열이라면 문자열을 그대로 반환한다.

````js
"javascript" || "css";	// "javascript"
"javascript" || false;	// "javascript"

false || "javascript";	// "javascript"
false || false;		// false
````


#### 논리합 연산자의 단축평가 규칙

| 논리합 연산자의 패턴 | 단축평가 결과 |
| -------------------- | ------------- |
| 값 \|\| true         | 값            |
| 값 \|\| false        | 값            |
| true \|\| 값         | true          |
| false \|\| 값        | 값            |
| 값A \|\| 값B         | 값A           |



### 논리곱 ( &&, A and B)

A가 `false`면 A를 반환한다.   
논리곱 연산자는 두 개의 피연산자가 모두 `true`여야 `true`로 평가된다.   
따라서 앞의 항 A의 값이 `false`라면 단축평가의 동작 원리대로 나머지 평가 과정을 멈추고 A를 반환한다.

````js
false && true;	// false
false && false;	// false
````

만약 A의 값이 `null` 이라면, `null`은 `false`로 평가되므로 `null`이 반환된다.

````js
null && true;	// null
````
 

만약 A의 값이 `true` 라면 B의 값도 `true`여야 `true`를 반환한다.

````js
true && true;	// true
true && false;	// false
````
 

다르게 표현하면, A값이 `true`라면 B의 값을 그대로 반환한다.

````js
"javascript" && true;	// true
"javascript" && false;	// false
````

A와 B 둘 다 문자열이라면, 둘 다 `true`로 평가되므로 B가 반환된다.

````js
"javascript" || "css";	// "css"
````



#### 논리곱 연산자의 단축평가 규칙

| 논리곱 연산자 패턴 | 단축평가 결과 |
| ------------------ | ------------- |
| false && 값        | false         |
| true && 값         | 값            |
| 값 && false        | false         |
| 값 && true         | true          |
| 값A && 값B         | 값B           |


### null 병합 ( ??, A ?? B)

ES11(ECMA Script2020)에 도입된 Nullish coalescing operator `??` 는   
좌항의 피연산자가 `null` 또는 `undefined` 인 경우 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 피연산자를 반환한다.   
`null` 병합 연산자는 변수의 기본값을 설정할 때 유리하다.

````js
const str = null ?? "default";	// "default"
````
 

`null` 병합 연산자가 도입되기 이전에는 논리 연산자 `||` 를 사용한 단축평가를 통해 변수에 기본값을 설정했다.   
논리연산자 `||` 를 사용한 단축평가의 경우 좌항이 `false`로 평가되면 우항의 피연산자를 반환한다.   
하지만 `0`이나 `''`도 기본값으로 유효하다면 예기지 않은 동작이 발생할 수 있다.

````js
const str = 1 || "default";	// 1
const str = 0 || "default";	// "default"
const str = '' || "default";	// "default"
````


### 옵셔널체이닝 ( ?, A ? B)

ES11 (ECMA Script2020)에 도입된 Optional Chaining 연산자 `?` 는   
좌항의 피연산자가 `null` 또는 `undefined`인 경우 `undefined`를 반환하고, 그렇지 않으면 우항 프로퍼티의 참조를 이어간다.

옵셔널체이닝 연산자는 객체를 가리키는 변수가 `null` 또는 `undefined`가 아닌지 확인하고 프로퍼티를 참조할 때 유용하다.

````js
const obj_01 = null;

console.log(obj_01.name);	// Error
console.log(obj_01?.name);	// undefined
````

왼쪽 객체가 `false`로 평가되더라도, `null`이나 `undefined`가 아니면 객체.키값을 참조한다.

````js
const str = "";
console.log(str?.length);	// 0
````

---

<br>

##### 참고

- [\[자바스크립트\] 논리연산자(&&, \|\|) 단축평가](https://curryyou.tistory.com/193)
- [JavaScript) 논리 연산자를 활용한 단축 평가](https://velog.io/@vbghdl/JavaScript-%EB%85%BC%EB%A6%AC-%EC%97%B0%EC%82%B0%EC%9E%90%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EB%8B%A8%EC%B6%95-%ED%8F%89%EA%B0%80%EC%99%80-%ED%99%9C%EC%9A%A9)
- [\[JavaScript\] 단축 평가 (논리 연산자 \|\|, &&, / null 병합 연산자 ?? /옵셔널 체이닝?)](https://developerntraveler.tistory.com/124)
- [\[JavaScript\] Method Chaining (메서드 체이닝)](https://developerntraveler.tistory.com/116)
- [\[자바스크립트\] 삼항 조건 연산자, 옵셔널체이닝 연산자, null병합 연산자: 변수, 객체, 값의 null 체크 검사 방법](https://curryyou.tistory.com/235)

