---
title: "[Highcharts] Installation"
date: 2026-01-01 08:01:00 +0900
categories: [Library, Highcharts]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## Highcharts 초기 설정 방법
공식 문서 기준으로 설치/로딩 방법은 크게 5가지입니다.


### 1. npm (권장 — 실무 표준)

React/Vue/Angular 등 모던 프레임워크 환경에서는 이 방식이 기본입니다.

````bash
npm install highcharts
````

````js
// ES Module 방식
import Highcharts from 'highcharts';

// 추가 모듈 필요 시
import Stock from 'highcharts/modules/stock';
import Maps from 'highcharts/modules/map';

Stock(Highcharts);
Maps(Highcharts);
````


### 2. CDN으로 로딩
빠른 프로토타이핑이나 간단한 페이지에 적합합니다. 버전 관리가 필요하다면 버전을 명시하는 것을 권장합니다.

````html
<head>
  <!-- 최신 버전 -->
  <script src="https://code.highcharts.com/highcharts.js"></script>

  <!-- 특정 버전 고정 (v12 최신 마이너) -->
  <script src="https://code.highcharts.com/12/highcharts.js"></script>
</head>
````



### 3. 자체 서버에서 로딩
Highcharts 파일을 직접 다운로드해서 서버에 올린 뒤 사용합니다.   
보안 정책상 외부 CDN을 허용하지 않는 폐쇄망 환경에서 주로 사용합니다.

````html
<script src="/js/highcharts.js"></script>
````



### 4. ES6 모듈 (트리쉐이킹 가능)
번들 사이즈를 줄이고 싶을 때 사용합니다. npm 패키지와 CDN 모두 지원합니다.   
불필요한 모듈을 제외할 수 있어 대규모 프로젝트에서 성능 최적화에 유리합니다.

````javascript
import Highcharts from 'highcharts/es-modules/masters/highcharts.src.js';
````


### 5. AMD / CommonJS (RequireJS, Node.js 환경)
레거시 환경이나 서버사이드 렌더링(SSR) 대응 시 사용합니다.

````js
// CommonJS (Node.js)
const Highcharts = require('highcharts');
````



### Stock / Maps / Gantt 사용 시 주의사항
`highstock.js`, `highmaps.js`, `highcharts-gantt.js`는 Highcharts Core를 내장하고 있기 때문에 **highcharts.js와 절대 중복 로드하면 안 됩니다.**   
여러 제품을 한 페이지에서 함께 써야 할 경우에는 아래처럼 모듈 방식으로 불러와야 합니다.

````html
<!-- Core 하나만 로드 후 필요한 모듈 추가 -->
<script src="/js/highcharts.js"></script>
<script src="/js/modules/stock.js"></script>
<script src="/js/modules/map.js"></script>
<script src="/js/modules/gantt.js"></script>
````


----

## Your first chart

웹 페이지에 Highcharts를 포함시켰다면 이제 첫 번째 차트를 만들 준비가 된 것입니다.   
간단한 바 차트(bar chart)를 만드는 것부터 시작해 보겠습니다.

### 1. div 요소 추가하기
웹 페이지에 div를 추가합니다. id를 지정하고 차트의 너비와 높이가 될 특정 width와 height를 설정합니다.

````html
<div id="container" style="width:100%; height:400px;"></div>
````

### 2. JavaScript 코드 추가하기
차트는 웹 페이지 어디에든 `<script></script>` 태그를 추가하여 초기화합니다. 1번에서 만든 div는 생성자에서 참조됩니다.

````javascript
document.addEventListener('DOMContentLoaded', function () {
  const chart = Highcharts.chart('container', {
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
});
````

Stock 차트를 삽입하는 경우에는 `Highcharts.stockChart`라는 별도의 생성자 메서드를 사용합니다. Stock 차트에서는 일반적으로 데이터를 별도의 JavaScript 배열로 제공하며, 별도의 JavaScript 파일에서 가져오거나 서버에 XHR 요청을 통해 받아옵니다.

````js
let chart; // 전역으로 사용 가능

document.addEventListener('DOMContentLoaded', function() {
  chart = Highcharts.stockChart('container', {
    rangeSelector: {
      selected: 1
    },
    series: [{
      name: 'USD to EUR',
      data: usdtoeur // 미리 정의된 JavaScript 배열
    }]
  });
});
````


### 3. 결과 확인
이제 웹 페이지에서 아래와 같은 차트를 확인할 수 있습니다.

![alt text](/assets/images/posts/library/highcharts/01-01.png)


### 4. 테마 적용하기 (선택 사항)
선택적으로 차트에 테마를 적용할 수 있습니다. 아래 두 가지 방법 중 하나를 사용하면 됩니다.

#### 방법 1 - 사전 구성된 테마 로드하기
사전 구성된 테마는 `Highcharts.setOptions` 메서드를 통해 전역으로 적용되는 옵션들의 모음입니다. 다운로드 패키지에는 여러 가지 테마가 포함되어 있습니다. 이 테마 중 하나를 적용하려면 highcharts.js 파일을 포함한 바로 다음에 아래 코드를 추가합니다.

````html
<script type="text/javascript" src="/js/themes/gray.js"></script>
````

#### 방법 2 - Styled Mode를 사용하여 CSS로 스타일링하기
**Styled Mode**를 사용하여 CSS로 차트를 스타일링하는 것도 가능합니다. Styled Mode가 활성화된 경우, 메인 Highcharts CSS 파일과 함께 추가 테마 CSS 파일 중 하나를 불러올 수 있습니다.

````css
@import url("/css/highcharts.css");
@import url("/css/themes/dark-unica.css");
````


Highcharts의 옵션 또는 설정이 작동하는 방식에 대한 자세한 내용은 [How to set options](https://www.highcharts.com/docs/getting-started/how-to-set-options) 문서를 참고하세요.
아래는 이 문서에서 소개한 예시들의 온라인 데모 링크입니다.

- [Simple bar chart (간단한 바 차트)](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/docs/simple-bar/)
- [Highcharts Stock Example (Highcharts Stock 예시)](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/stock/demo/basic-line/)



-----

##### 참고

- [installation \| Highcharts](https://www.highcharts.com/docs/getting-started/installation)
- [Your first chart \| Highcharts](https://www.highcharts.com/docs/getting-started/your-first-chart)
