---
title: "[Refactoring] Refactoring"
date: 2022-08-07 17:09:00 +0900
categories: [JavaScript, Refactoring]
tags: [refactoring]
render_with_liquid: false
math: true
mermaid: true
---


## 리팩터링이란
리팩터링은 겉으로 드러나는 코드의 기능(겉보기 동작)은 바꾸지 않으면서 내부 구조를 개선하는 방식으로 소프트웨어 시스템을 수정하는 과정이다.   
버그가 생길 가능성을 최소로 줄이면서 코드를 정리하는 정제된 방법이다.   
요컨대, 리팩터링한다는 것은 코드를 작성하고 난 뒤에 걸계를 개선하는 일이다.

### 1.1 자, 시작해보자!
#### plays.json (공연할 연극 정보)
````json
{
  "hamlet": {"name": "Hamlet", "type": "tragedy"},
  "as-like": {"name": "As You Like It", "type": "comedy"},
  "athello": {"name": "Othello", "type": "tragedy"}
}
````

#### invoices.json (공연료 청구서에 들어갈 데이터)
````json
[
  {
    "customer": "BigCo",
    "performances": [
      {"playID": "hamlet", "audience": 55},
      {"playID": "as-like", "audience": 35},
      {"playID": "Othello", "audience": 40},
    ]
  }
]
````

#### 공연료 청구서를 출력하는 함수
````javascript
function statement(invoce, plays){
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new.Intl.NumberFormat("en-US", {style:"currency", currency: "USD", minimumFractionDigits: 2}).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;

    switch (play.type) {
      case "tragedy":	// 비극
        thisAmount = 40000;
        if (perf.audience > 30) {
          this.Amount += 1000 * (perv.audience - 30);
        }
        break;
      case "comedy" :	// 희극
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;
      default :
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }

    // 포인트를 적립한다.
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // 청구 내역을 출력한다.
    result += ` ${play.anme} : ${format(thisAmount/100)} (${perf.audience}석)\n`;
    totalAmount += thisAmount;
  }

  result += `총액: ${foramt(totalAmount/100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}
````

#### 실행결과
````
청구 내역 (고객명: BigCo)
  Hamlet: $650.00 (55석)
  As You Like It: $250.00 (35석)
  Othello: $500.00 (40석)
총액: $1,730.00
적립 포인트 47점
````

### 1.3 리팩터링의 첫 단계
리팩터링 하기 전에 제대로 된 테스트부터 마련한다. 테스트는 반드시 자가진단하도록 만든다.

### 1.4 statement() 함수 쪼개기
statement()처럼 긴 함수를 리팩터링할 때는 먼저 전체 동작을 각각의 부분으로 나눌 수 있는 지점을 찾는다. 그러면 중간 즈음의 switch 문이 가장 먼저 눈에 띌 것이다.

#### 함수 추출하기
먼저 별도 함수로 빼냈을 때 유효범위를 벗어나는 변수, 즉 새 함수에서는 곧바로 사용할 수 없는 변수가 있는지 확인한다.   
이번 예에서는 perf, play, thisAmount가 여기 속한다.   
perf와 play는 추출한 새 함수에서도 필요하지만 값을 변경하지 않기 때문이 매개변수로 전달하면 된다.   
한편 thisAmount는 함수 안에서 값이 바뀌는데, 이런 변수는 조심해서 다뤄야 한다.

이번 예에서는 이런 변수가 하나뿐이므로 이 값을 반환하도록 작성했다. 또한 이 변수를 초기화하는 코드도 추출한 함수에 넣었다.   
결과는 다음과 같다.
````javascript
function amountFor(perf, play){	// 값이 바뀌지 않는 변수는 매개변수로 전달
  let thisAmount = 0;		// 변수 초기화

  switch (play.type) {
    case "tragedy" : 	// 비극
      thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
      break;
    case "comedy" : 	// 희극
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAcount += 10000 + 500 * (perf.audience - 20);
      }
      thisAmount += 300 = perf.audience;
      break;
    default :
      throw new Error(`알 수 없는 장르: ${play.tyle}`);
  }
  return thisAmount;		// 함수 안에서 값이 바뀌는 변수 반환
}
````

이제 statement() 에서는 thisAmount 값을 채울 때 방금 추출한 amountFor() 함수를 호출한다.

이렇게 수정하고 나면 곧바로 컴파일하고 테스트해서 실수한 게 없는지 확인한다. 아무리 간단한 수정이라도 리팩터링 후에는 항상 테스트하는 습관을 들이는 것이 바람직하다.

> 리팩터링은 프로그램 수정을 작은 단계로 나눠 진행한다. 그래서 중간에 실수하더라도 버그를 쉽게 찾을 수 있다.
{: .prompt-tip}

함수를 추출하고 나면 추출된 함수 코드를 자세히 들여다보면서 지금보다 명확하게 표현할 수 있는 간단한 방법은 없는지 검토한다. 가장 먼저 변수의 이름을 더 명확하게 바꿔보자. 가령 thisAmount를 result로 변경할 수 있다.

> 컴퓨터가 이해하는 코드는 바보도 작성할 수 있다. 사람이 이해하도록 작성하는 프로그래머가 진정한 실력자다.
{: .prompt-tip}


#### play 변수 제거하기
play는 개별 공연(aPerformance)에서 얻기 때문에 애초에 매개변수로 전달할 필요가 없다. 그냥 amountFor() 안에서 다시 계산하면 된다.
````javascript
functino playFor(aPerformance){
	return plays[aperformance.playID];
}
````
````javascript
const play = playFor(perf);	// 우변을 함수로 추출
let thisAmount = amountFor(perf, play);
````

#### 변수 인라인하기
````javascript
const play = playFor(perf);	// 삭제
let thisAmount = amountFor(perf, playFor(perf));
````

지역변수를 제거해서 얻는 가장 큰 장점은 추출 작업이 훨씬 쉬어진다는 것이다. 유효범위를 신경써야 할 대상이 줄어들기 때문이다.

리팩터링한 결과는 다음과 같다.
````javascript
function statement(invoce, plays){
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new.Intl.NumberFormat("en-US", {style:"currency", currency: "USD", minimumFractionDigits: 2}).format;

  for (let perf of invoice.performances) {

    // 포인트를 적립한다.
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if("comedy" === playFor(perf).type)
    volumeCredits += Math.floor(perf.audience / 5);

    // 청구 내역을 출력한다.
    result += ` ${playFor(perf).anme} : ${format(amountFor(perf)/100)} (${perf.audience}석)\n`;
    totalAmount += thisAmount;
  }

  result += `총액: ${foramt(totalAmount/100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}
````

앞에서 play 변수를 제거한 결과 로컬 유효범위의 변수가 하나 줄어서 적립 표인트 계산 부분을 추출하기가 쉬워졌다.

처리해야 할 변수가 아직 두 개 더 남아 있다. 여기서도 perf는 간단히 전달만 하면 된다. 하지만 volumeCredits는 반복문을 돌 때마다 값을 누적해야 하기 때문에 살짝 더 까다롭다. 이 상황에서 최선의 방법은 추출한 함수에서 volumeCredits의 복제본을 초기화한 뒤 계산 결과를 반환토록 하는 것이다.

#### statement()함수

````javascript
function volumeCreditsFor(perf){
  let volumeCredits = 0;
  volumeCredits += Math.max(perf.audience - 30, 0);
  if ("comedy" === playFor(perf).type)
    volumeCredits += Math.Floor(perf.audience / 5);
  return volumeCredits;
}
````

````javascript
function statement(invoice, plays){
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoce.customer})\n`;
  const format = new Inil.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2}).format;

  for (let perf of invoce.performances) {
    volumeCredits += volumeCreditsFor(perf);	// 추출한 함수를 이용해 값을 누적

    // 청구 내역을 출력한다.
    result += ` ${playFor(perf).name} : ${foramt(amountFor(perf)/100)}, (${perf.audience석})\n`;
    totalAmount += amountFor(perf);
  }
  result += `총액: ${format(totalAmount/100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}
````

이름짓기는 중요하면서도 쉽지 않은 작업이다. 긴 함수를 작게 쪼개는 리팩터링은 이름을 잘 지어야만 효과가 있다. 이름이 좋으면 함수 본문을 읽지 않고도 무슨 일을 하는지 알 수 있다.


#### volumeCredits 변수 제거하기
1. 반복문 쪼개기로 변수 값을 누적시키는 부분을 분리한다.
2. 문장 슬라이드하기로 변수 초기화 문장을 변수 값 누적 코드 바로 앞으로 옮긴다.
3. 함수 추출하기로 적립 포인트 계산 부분을 별도 함수로 추출한다.
4. 변수 인라인하기로 volumeCredits 변수를 제거한다.

다음으로 totalAmount도 앞에서와 똑같은 절차로 제거한다.   
먼저 반복문을 쪼개고, 변수 초기화 문장을 옮긴 다음, 함수를 추출한다.
