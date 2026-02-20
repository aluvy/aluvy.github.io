---
title: "[Highcharts] How to set options"
date: 2026-01-01 08:02:00 +0900
categories: [Library, Highcharts]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## How to set options (옵션 설정 방법)

Highcharts는 JavaScript 객체 구조를 사용하여 차트의 옵션 또는 설정을 정의합니다. 이 문서는 옵션 객체가 어떻게 동작하는지, 그리고 어떻게 사용하는지를 설명합니다.

### 옵션 객체 (The options object)
`Highcharts.Chart` 생성자를 사용하여 차트를 초기화할 때, 옵션 객체는 두 번째 파라미터로 전달됩니다.

````js
const chart1 = Highcharts.chart('container', {
  chart: {
    type: 'bar'
  },
  title: {
    text: 'Fruit Consumption'
  },
  xAxis: {
    categories: ['Apples', 'Bananas', 'Oranges']
  },
  yAxis: {
    title: {
      text: 'Fruit eaten'
    }
  },
  series: [{
    name: 'Jane',
    data: [1, 0, 4]
  }, {
    name: 'John',
    data: [5, 7, 3]
  }]
});
````

Highcharts를 최대한 활용하려면 옵션 객체가 어떻게 동작하는지, 그리고 프로그래밍 방식으로 어떻게 수정할 수 있는지를 이해하는 것이 중요합니다. 아래는 JavaScript 객체에 관한 몇 가지 핵심 개념입니다.

#### 객체 리터럴 표기법 (Object Literal Notation)
예시에 나온 Highcharts 옵션은 **객체 리터럴(object literal)** 로 정의되어 있습니다.   
이 방식으로 설정을 표기하면 깔끔하고 사람이 읽기 쉬우며 공간을 적게 차지하는 설정 객체를 만들 수 있습니다.

아래의 복잡한 코드는 C 계열 언어 배경을 가진 개발자에게 더 익숙한 방식일 수 있습니다.

````js
// 나쁜 코드 (Bad code):
var options = new Object();
options.chart = new Object();
options.chart.type = 'bar';
options.series = new Array();
options.series[0] = new Object();
options.series[0].name = 'Jane';
options.series[0].data = new Array(1, 0, 4);
````

JavaScript 객체 리터럴 방식으로 작성하면 아래와 같습니다. 두 옵션 객체는 완전히 동일한 결과를 생성한다는 점에 주목하세요.

````js
// 좋은 코드 (Good code):
const options = {
  chart: {
    type: 'bar'
  },
  series: [{
    name: 'Jane',
    data: [1, 0, 4]
  }]
};
````

위 예시에서 옵션 객체는 독립적으로 생성되며, 차트 생성자에 전달하여 차트에 적용할 수 있습니다.

````js
const chart = new Highcharts.Chart('container', options);
````


#### 점 표기법으로 옵션 확장하기 (Extending with Dot Notation)
객체 리터럴 표기법으로 객체를 생성한 후에는 **점 표기법(dot notation)** 을 사용하여 멤버를 추가할 수 있습니다. 위의 "좋은 코드"에서 정의한 객체가 있다고 가정하면, 아래 코드는 해당 객체에 시리즈(series)를 하나 더 추가합니다. `options.series`는 배열이므로 `push` 메서드를 사용할 수 있다는 점을 기억하세요.

````js
options.series.push({
  name: 'John',
  data: [3, 4, 2]
});
````


#### 점 표기법과 괄호 표기법의 동등성
JavaScript 객체를 다룰 때 유용한 또 다른 사실은, **점 표기법(dot notation)** 과 **괄호 표기법(square bracket notation)** 이 동등하다는 것입니다.   
따라서 모든 멤버에 문자열 이름으로 접근할 수 있습니다. 실제로 `options.chart.type`은 항상 `options['chart']['type']`과 동일합니다.



---

## 글로벌 옵션 (Global Options)
같은 페이지의 모든 차트에 동일한 옵션 세트를 적용하려면 아래와 같이 `Highcharts.setOptions`를 사용합니다.

````js
Highcharts.setOptions({
  chart: {
    backgroundColor: {
      linearGradient: [0, 0, 500, 500],
      stops: [
        [0, 'rgb(255, 255, 255)'],
        [1, 'rgb(240, 240, 255)']
      ]
    },
    borderWidth: 2,
    plotBackgroundColor: 'rgba(255, 255, 255, .9)',
    plotShadow: true,
    plotBorderWidth: 1
  }
});

const chart1 = Highcharts.chart('container', {
  xAxis: {
    type: 'datetime'
  },
  series: [{
    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
    pointStart: Date.UTC(2010, 0, 1),
    pointInterval: 3600 * 1000 // 1시간
  }]
});

const chart2 = Highcharts.chart('container2', {
  chart: {
    type: 'column'
  },
  xAxis: {
    type: 'datetime'
  },
  series: [{
    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
    pointStart: Date.UTC(2010, 0, 1),
    pointInterval: 3600 * 1000 // 1시간
  }]
});
````

> 참고: Highcharts 다운로드에 포함된 테마들은 이 함수를 사용합니다. 자세한 내용은 [Themes](https://www.highcharts.com/docs/chart-design-and-style/themes) 문서를 참고하세요.
{: .prompt-tip}

사용 가능한 옵션의 전체 레퍼런스는 [Highcharts options reference](https://api.highcharts.com/highcharts/) 또는 [Highcharts Stock options reference](https://api.highcharts.com/highstock/) 를 참고하세요.





-----

##### 참고

- [How to set options \| Highcharts](https://www.highcharts.com/docs/getting-started/how-to-set-options)
