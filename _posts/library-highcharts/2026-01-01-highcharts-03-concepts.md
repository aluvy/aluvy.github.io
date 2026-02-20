---
title: "[Highcharts] Highcharts 이해하기 (title, series, tooltip, legend, axes)"
date: 2026-01-01 08:03:00 +0900
categories: [Library, Highcharts]
tags: []
render_with_liquid: false
math: true
mermaid: true
---


## Highcharts 이해하기

Highcharts가 어떻게 동작하는지 이해하려면 차트의 다양한 구성 요소, 즉 개념들을 이해하는 것이 중요합니다.   
아래 이미지는 차트의 주요 개념들을 설명합니다.

![alt text](/assets/images/posts/library/highcharts/03-01.png)


### Title (타이틀)
차트를 설명하는 텍스트입니다. 일반적으로 차트 상단에 위치합니다.   
자세한 내용은 [Title and subtitle](https://www.highcharts.com/docs/chart-concepts/title-and-subtitle) 문서를 참고하세요.

### Series (시리즈)
차트에 표시되는 하나 이상의 데이터 시리즈입니다.   
자세한 내용은 [Series](https://www.highcharts.com/docs/chart-concepts/series) 문서를 참고하세요.

### Tooltip (툴팁)
차트의 시리즈나 특정 데이터 포인트 위에 마우스를 올리면, 해당 차트 영역의 값을 설명하는 툴팁을 확인할 수 있습니다.
자세한 내용은 [Tooltip](https://www.highcharts.com/docs/chart-concepts/tooltip) 문서를 참고하세요.

### Legend (범례)
범례는 차트의 데이터 시리즈를 보여주며, 하나 이상의 시리즈를 활성화하거나 비활성화할 수 있습니다.
자세한 내용은 [Legend](https://www.highcharts.com/docs/chart-concepts/legend) 문서를 참고하세요.

### Axes (축)
일반적인 카테시안(Cartesian) 라인 차트나 컬럼 차트와 같은 대부분의 차트에는 데이터를 측정하고 분류하기 위한 두 개의 축이 있습니다. 세로 축(y축)과 가로 축(x축)이 그것입니다. 3D 차트에는 세 번째 축인 깊이 축(z축)이 추가됩니다. 레이더 차트(radar chart)라고도 불리는 폴라 차트(polar chart)는 차트의 둘레를 따라 하나의 축만 가집니다. 속도계 차트(speedometer chart)라고도 불리는 게이지 차트(gauge chart)는 단일 값 축을 가질 수도 있습니다. 반면 파이 차트(pie chart)에는 축이 없습니다.   
자세한 내용은 [Axes](https://www.highcharts.com/docs/chart-concepts/axes) 문서를 참고하세요.


---

## Title and subtitle (타이틀과 서브타이틀)

타이틀은 기본적으로 차트 상단에 표시되며, 선택적으로 그 아래에 서브타이틀을 표시할 수 있습니다.   
타이틀과 서브타이틀은 아래 예시와 같이 설정할 수 있습니다.

![alt text](/assets/images/posts/library/highcharts/03-02.png)

````js
title: {
  text: 'My custom title'
},
subtitle: {
  text: 'My custom subtitle'
}
````

### 적응형 정렬 (Adaptive Alignment)
버전 12부터 기본적으로 타이틀과 서브타이틀은 텍스트 길이와 차트 너비에 가장 잘 맞도록 **적응형 정렬(adaptive alignment)** 이 적용됩니다. 적용되는 규칙은 다음과 같습니다.

짧은 텍스트의 경우 타이틀은 가운데 정렬됩니다.

타이틀이 넘칠 것 같은 경우 `title.minScale` 옵션에 설정된 한계값에 도달할 때까지 타이틀이 축소됩니다.   
기본값은 `0.67`로, 이는 타이틀의 폰트 크기가 서브타이틀과 동일해지는 비율입니다.

축소 후에도 타이틀이 맞지 않는 경우 타이틀은 여러 줄로 줄 바꿈됩니다. 이때 더 깔끔한 모양을 위해 텍스트는 왼쪽 정렬로 변경됩니다.

서브타이틀은 기본적으로 (그리고 동적으로) 메인 타이틀과 동일한 정렬 방식을 따릅니다.


### 규칙 재정의 (Overriding the Rules)
위의 모든 규칙은 타이틀 또는 서브타이틀의 `align` 속성을 명시적으로 설정하거나,   
`title.minScale`을 설정하여 재정의할 수 있습니다. 예를 들어 `title.minScale`을 1로 설정하면 축소를 허용하지 않습니다.


### 위치 조정
타이틀과 서브타이틀은 title 및 subtitle 옵션의 기본 속성인 `align`, `float`, `margin`, `verticalAlign`, `x`, `y`를 통해 위치를 조정할 수도 있습니다.   
사용 가능한 모든 옵션은 [options.title](https://api.highcharts.com/highcharts/title) 및 [options.subtitle](https://api.highcharts.com/highcharts/subtitle) 문서를 참고하세요.


### 동적 수정 (Dynamic Modification)
타이틀은 렌더링 이후에도 **Chart.setTitle** 메서드를 통해 동적으로 수정할 수 있습니다.



-----

## Series

### 시리즈란 무엇인가? (What is a series?)
시리즈는 하나의 데이터 집합으로, 예를 들어 라인 그래프나 하나의 컬럼 세트가 이에 해당합니다. 차트에 표시되는 모든 데이터는 시리즈 객체에서 가져옵니다. 시리즈 객체의 구조는 다음과 같습니다.

```js
series: [{
    name: '',
    data: []
}]
```

> 참고: 시리즈 객체는 배열이므로 여러 개의 시리즈를 포함할 수 있습니다.
{: .prompt-tip}

`name` 속성은 시리즈에 이름을 부여하며, 차트에서 시리즈 위에 마우스를 올리거나 [범례(legend)](https://www.highcharts.com/docs/chart-concepts/legend)에서 해당 이름이 표시됩니다.


### 시리즈의 데이터 (The data in a series)
실제 데이터는 `data` 속성을 통해 배열로 표현되며, 세 가지 방식으로 제공할 수 있습니다.

#### 1. 숫자 값의 목록
숫자 값들은 y값으로 해석되며, x값은 자동으로 계산됩니다. x값은 0부터 시작하여 1씩 증가하거나, `pointStart` 및 `pointInterval` 옵션에 따라 결정됩니다. 축에 카테고리가 있는 경우에는 해당 카테고리가 사용됩니다.

````js
javascriptdata: [0, 5, 3, 5]
````

[Online example](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/chart/reflow-true/)


#### 2. 두 개 이상의 값으로 이루어진 배열의 목록
첫 번째 값은 x값, 두 번째 값은 y값으로 사용됩니다. 첫 번째 값이 날짜 문자열이고 x축이 `datetime` 타입인 경우, 해당 문자열은 날짜로 파싱됩니다.   
그 외에 첫 번째 값이 문자열인 경우에는 해당 포인트의 이름으로 적용되며, x값은 위의 규칙에 따라 증가합니다. [arearange](https://api.highcharts.com/highcharts/series.arearange.data)와 같은 일부 시리즈는 두 개 이상의 값을 허용합니다. 각 시리즈 타입의 자세한 내용은 API 문서를 참고하세요.

````js
data: [0, 5, 3, 5]
````

[Online example](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/series/data-array-of-arrays/)



#### 3. 이름이 지정된 값을 가진 객체의 목록
이 경우 객체들은 `options.point`에서 설명하는 포인트 설정 객체입니다. 사용 가능한 전체 속성 목록은 API에서 확인할 수 있습니다(예: [라인 시리즈](https://api.highcharts.com/highcharts/series.line.data)).   
이 옵션이 Highcharts Stock에서 작동하려면 전체 포인트 수가 `turboThreshold`를 초과하지 않아야 하며, 초과하는 경우 [turboThreshold](https://api.highcharts.com/highstock/series.line.turboThreshold) 설정을 늘려야 합니다.

````js
data: [{
  name: 'Point 1',
  color: '#00FF00',
  y: 0
}, {
  name: 'Point 2',
  color: '#FF00FF',
  y: 5
}]
````



### 포인트와 마커 (Point and marker)

카테시안(Cartesian) 차트에서 포인트는 차트 위의 (x, y) 좌표 쌍을 나타냅니다. 포인트에는 시리즈 데이터 내에서 개별 옵션을 지정할 수 있습니다. 다른 차트 타입에서는 포인트가 (x, y) 이외의 값을 나타냅니다. 예를 들어 범위 차트(range chart)에서 포인트는 (x, low, high)를, OHLC 차트에서는 (x, open, high, low, close)를 나타냅니다. 파이 차트나 게이지 차트에서 포인트는 단일 값을 나타냅니다.

`point` 옵션은 모든 차트에 적용할 수 있습니다. 아래는 특정 포인트의 색상을 변경하는 예시입니다.

````js
series: [{
  data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5,
    { y: 216.4, color: '#BF0B23'}, 194.1, 95.6, 54.4]
}]
````

라인, 스플라인(spline), 에어리어(area), 에어리어스플라인(areaspline) 차트에는 포인트 마커(point marker) 를 표시하는 옵션이 있습니다.   
이는 `point` 옵션과는 약간 다르며, 포인트 마커의 스타일과 모양을 변경할 수 있습니다.

아래는 특정 포인트의 마커 색상과 크기를 변경하는 예시입니다.

````js
series: [{
  data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5,
    {y: 216.4, marker: { fillColor: '#BF0B23', radius: 10 } }, 194.1, 95.6, 54.4]
}]
````



### 시리즈 옵션 (Series options)
시리즈 옵션은 Highcharts 옵션 구조 내 두 곳에서 정의할 수 있습니다.

여러 시리즈에 공통으로 적용되는 일반 옵션은 `plotOptions`에서 정의합니다.   
차트 내 모든 시리즈에 일반 옵션을 설정하려면 `plotOptions.series`를 사용하고, 특정 차트 타입에 일반 옵션을 설정하려면 각 차트 타입별 `plotOptions` 컬렉션을 사용합니다.

각 시리즈에 대한 특정 옵션은 `series` 옵션 구조에서 정의합니다.   
`plotOptions` 구조에 나열된 모든 옵션은 특정 시리즈 정의에서도 설정할 수 있습니다. `data`, `id`, `name`과 같은 일부 옵션은 특정 시리즈에만 의미가 있습니다.

아래는 데이터 시리즈에 적용할 수 있는 가장 일반적인 옵션들의 개요입니다.


#### Animation (애니메이션)
시리즈의 초기 애니메이션 특성을 비활성화하거나 변경할 수 있습니다. 애니메이션은 기본적으로 활성화되어 있습니다.

#### Color (색상)
시리즈의 색상을 변경할 수 있습니다.

#### Point selection (포인트 선택)
단일 포인트를 선택하고 강조 표시할 수 있습니다. 포인트를 제거하거나 편집하거나 정보를 표시하는 데 사용할 수 있습니다.

![alt text](/assets/images/posts/library/highcharts/03-03.png)

[Try it here](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/series-allowpointselect-line/)

포인트 선택을 활성화하는 코드:

````js
plotOptions: {
  series: {
    allowPointSelect: true
  }
}
````

선택된 포인트를 가져오는 코드:

````js
var selectedPoints = chart.getSelectedPoints();
````


#### Line width (라인 두께)
라인의 두께를 변경할 수 있습니다.

![alt text](/assets/images/posts/library/highcharts/03-04.png)

[Try it here](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/series-linewidth-specific/)

라인 두께를 변경하는 코드:

````js
series: [{
  data: [216.4, 194.1, 95.6],
  lineWidth: 5
}]
````


#### Stacking (스태킹)
스태킹은 시리즈들이 겹치지 않고 서로 위에 쌓이도록 배치할 수 있습니다. 자세한 내용은 [Stacking charts](https://www.highcharts.com/docs/advanced-chart-features/stacking-charts) 문서를 참고하세요.


#### Cursor (커서)
포인트와 시리즈가 클릭 가능하다는 것을 나타내기 위해 커서의 모양을 변경할 수 있습니다.


#### Data labels (데이터 레이블)
차트의 시리즈에 있는 각 데이터 포인트에 데이터 레이블을 표시할 수 있습니다.

![alt text](/assets/images/posts/library/highcharts/03-05.png)

[Try it here](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/line-labels/)

데이터 레이블을 활성화하는 코드 예시:

````js
plotOptions: {
  line: {
    dataLabels: {
      enabled: true
    }
  }
},
````

> 참고: 마우스 트래킹(mouse tracking)을 비활성화할 수도 있습니다. 마우스 트래킹은 마우스를 올렸을 때 시리즈와 포인트를 강조 표시합니다(마우스 트래킹이 비활성화되면 툴팁도 표시되지 않습니다).
{: .prompt-tip}

데이터 레이블에 표시되는 텍스트는 `formatter` 옵션을 사용하여 커스터마이징할 수 있습니다. 더 많은 옵션은 API 레퍼런스를 참고하세요.


#### Dash style (대시 스타일)
실선 대신 점선을 사용할 수 있으며, 여러 가지 대시 옵션을 사용할 수 있습니다.

![alt text](/assets/images/posts/library/highcharts/03-06.png)

[Try it here](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/series-dashstyle/)

개별 시리즈에 점선을 설정하는 코드(`dashStyle`은 `plotOptions`에서도 설정 가능):

````js
series: [{
  data: [1, 3, 2, 4, 5, 4, 6, 2, 3, 5, 6],
  dashStyle: 'longdash'
}]
````


#### Zones (구역)
경우에 따라 그래프의 특정 구간을 다르게 표시하고 싶을 때가 있습니다.

일반적인 예로는 데이터가 특정 범위에 있을 때 다른 색상을 사용하는 것입니다. 이 효과는 **존(zones)** 을 사용하여 구현할 수 있습니다.

기본적으로 구역은 y축을 기준으로 적용되지만, 시리즈의 `zoneAxis` 변수를 설정하여 쉽게 변경할 수 있습니다. 구역 자체를 설정하려면 `zones`라는 배열을 정의해야 하며, 각 항목은 하나의 구역에 해당하고 구역의 끝을 나타내는 파라미터 값으로 구분됩니다.

각 구역에서 재정의할 수 있는 설정은 `color`, `fillColor`, `dashStyle`입니다.

![alt text](/assets/images/posts/library/highcharts/03-07.png)

[Try it here](https://jsfiddle.net/api/post/library/pure/)

구역 설정에 사용된 코드:

````js
zones: [{
  value: 0,
  color: '#f7a35c'
}, {
  value: 10,
  color: '#7cb5ec'
}, {
  color: '#90ed7d'
}]
````

또 다른 일반적인 활용 사례는 미래의 예상 데이터 포인트를 다르게 스타일링하는 것입니다.

![alt text](/assets/images/posts/library/highcharts/03-08.png)

[Try it here](https://jsfiddle.net/api/post/library/pure/)

구역 설정에 사용된 코드:

````js
zoneAxis: 'x',
zones: [{
  value: 8
}, {
  dashStyle: 'dot'
}]
````

자세한 내용은 [API](https://api.highcharts.com/highcharts/plotOptions.series.zones)를 참고하세요.


----


## Tooltip

툴팁은 시리즈의 포인트 위에 마우스를 올렸을 때 나타납니다. 기본적으로 툴팁은 포인트의 값과 시리즈 이름을 표시합니다. 툴팁에 사용할 수 있는 전체 옵션은 [API 레퍼런스](https://api.highcharts.com/highcharts/tooltip)를 참고하세요.

![alt text](/assets/images/posts/library/highcharts/03-09.png)


### 외관 (Appearance)
아래 코드 예시는 툴팁의 가장 일반적인 외관 옵션을 보여줍니다.

````js
tooltip: {
  backgroundColor: '#FCFFC5',
  borderColor: 'black',
  borderRadius: 10,
  borderWidth: 3
}
````

배경색은 그라디언트로도 설정할 수 있습니다. [예시](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/tooltip/backgroundcolor-gradient/)를 참고하세요.   
텍스트 속성은 [style 옵션](https://api.highcharts.com/highcharts/tooltip.style)을 사용하여 설정할 수 있습니다.

또는 **Styled Mode를 활성화**하여 CSS로 툴팁을 스타일링할 수 있습니다.

````css
.highcharts-tooltip-box {
  fill: #FCFFC5;
  stroke: black;
  stroke-width: 3;
}
````

> 참고: 툴팁 내용은 기본적으로 SVG로 렌더링되므로, CSS에서 fill과 stroke 같은 SVG 속성을 지정해야 합니다.
{: .prompt-tip}



### 툴팁 포매팅 (Tooltip formatting)
툴팁의 내용은 HTML의 일부를 기반으로 렌더링되며, 다양한 방식으로 변경할 수 있어 구현자가 내용을 완전히 제어할 수 있습니다.

[tooltip](https://api.highcharts.com/highcharts/tooltip) 설정 객체의 옵션 외에도, [series.tooltip](https://api.highcharts.com/highcharts/plotOptions.series.tooltip)을 통해 각 시리즈가 툴팁에 표시되는 방식에 대한 옵션을 설정할 수 있습니다.

- 툴팁의 헤더 부분은 [tooltip.headerFormat](https://api.highcharts.com/highcharts/tooltip.headerFormat)을 사용하여 변경할 수 있습니다. 공유 툴팁(shared tooltip)에서는 첫 번째 시리즈의 `headerFormat`이 사용됩니다.   
v12+에서는 `point.key`에 대한 로케일 인식 날짜 이름이 브라우저의 대소문자 방식을 따르므로(주로 소문자), 헤더를 대문자로 표시하려면 `{ucfirst point.key}`를 사용하세요.

- 각 시리즈의 목록 부분은 [tooltip.pointFormat](https://api.highcharts.com/highcharts/tooltip.pointFormat) 옵션 또는 각 시리즈별 개별 `pointFormat`으로 설정합니다.

- 푸터 부분은 [tooltip.footerFormat](https://api.highcharts.com/highcharts/tooltip.footerFormat) 옵션으로 설정할 수 있습니다.

- 위의 모든 옵션은 프로그래밍 방식의 제어를 위해 [tooltip.formatter](https://api.highcharts.com/highcharts/tooltip.formatter) 콜백으로 재정의할 수 있습니다.


기본적으로 툴팁은 HTML을 SVG로 파싱하여 렌더링하기 때문에 HTML의 일부만 허용합니다.   
[useHTML](https://api.highcharts.com/highcharts/tooltip.useHTML) 옵션을 `true`로 설정하면 렌더러가 완전한 HTML로 전환되어 툴팁 내부에 테이블 레이아웃이나 이미지 등을 사용할 수 있습니다.

````js
tooltip: {
  format: 'The value for <b>{x}</b> is <b>{y}</b>, in series {series.name}'
}
````

포매팅에 대한 자세한 내용은 [Labels and string formatting](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting) 문서를 참고하세요.


### 위치 지정 (Positioning)
Highcharts는 기능성과 디자인을 모두 개선하여 툴팁 위치를 필요에 맞게 조정할 수 있는 여러 옵션을 제공합니다.

- **공유 툴팁(Shared tooltips)** 은 여러 시리즈가 있는 차트에 유용합니다. 특정 x축 값에 대한 모든 시리즈의 정보를 하나의 툴팁에 표시하여 복잡함을 줄이고 비교를 쉽게 합니다. [tooltip.shared](https://api.highcharts.com/highcharts/tooltip.shared)를 참고하세요.
- **분할 툴팁(Split tooltips)** 은 각 시리즈 포인트에 대해 별도의 툴팁을 표시하며, 각 데이터 포인트의 상세 정보가 필요할 때 유용합니다. [tooltip.split](https://api.highcharts.com/highcharts/tooltip.split)을 참고하세요.
- **고정 툴팁(Fixed tooltips, v12.2부터 지원)** 은 차트의 고정된 위치(기본적으로 데이터 영역의 왼쪽 상단 모서리)에 툴팁을 표시합니다. 고정 툴팁은 `shared` 또는 `split`과 함께 사용할 수 있습니다. [tooltip.fixed](https://api.highcharts.com/highcharts/tooltip.fixed)를 참고하세요.


### 크로스헤어 (Crosshairs)
크로스헤어는 포인트와 해당 축을 연결하는 선을 표시합니다. Highcharts에서는 기본적으로 비활성화되어 있지만, Highcharts Stock에서는 기본적으로 활성화되어 있습니다. 크로스헤어의 전체 옵션은 [crosshairs](https://api.highcharts.com/highcharts/xAxis.crosshair) 문서를 참고하세요.

![alt text](/assets/images/posts/library/highcharts/03-10.png)

크로스헤어는 x축, y축 또는 두 축 모두에 활성화할 수 있습니다.

````js
// x축에 활성화
xAxis: {
  crosshair: true
}

// y축에 활성화
yAxis: {
  crosshair: true
}
````


----


## Legend (범례)

범례는 차트의 시리즈를 사전에 정의된 기호(symbol)와 시리즈 이름으로 표시합니다. 시리즈는 범례를 통해 비활성화하거나 활성화할 수 있습니다.

![alt text](/assets/images/posts/library/highcharts/03-11.png)

자세한 내용은 범례 옵션에 대한 [API 레퍼런스](https://api.highcharts.com/highcharts/legend)를 참고하세요.



-----



## Axes (축)

x축과 y축은 카테시안 좌표계([cartesian coordinate system](https://www.highcharts.com/docs/chart-concepts/dataviz-glossary#cartesian-coordinate-system))를 가진 데이터 시리즈가 포함된 모든 차트에서 기본적으로 표시됩니다.

아래는 축 요소에 대한 간략한 개요입니다.

![alt text](/assets/images/posts/library/highcharts/03-12.png)



### 축 레이블, 눈금 및 격자선 (Axis labels, tickmarks and gridlines)
축 레이블, 눈금 및 격자선은 서로 밀접하게 연결되어 있으며 모두 함께 스케일이 조정됩니다. 이들의 위치는 차트에 표시된 데이터에 가장 적합하도록 계산됩니다.

#### 눈금 (Ticks)

눈금 표시(tick mark)는 측정 단위를 나타내기 위해 축을 따라 배치되는 선입니다. 눈금 간격은 주로 [tickInterval](https://api.highcharts.com/highcharts/xAxis.tickInterval)과 [tickPixelInterval](https://api.highcharts.com/highcharts/xAxis.tickPixelInterval) 옵션에 의해 결정됩니다. 레이블과 격자선은 눈금 표시와 동일한 위치에 배치됩니다.

`tickInterval` 옵션은 축 단위로 눈금 표시 간격을 결정합니다. 기본값은 `null`이며, 이는 선형(linear) 및 날짜/시간(datetime) 축에서 `tickPixelInterval`을 대략적으로 따르도록 계산된다는 것을 의미합니다.

카테고리 축(categorized axes)에서 `tickInterval`이 `null`이면 기본값은 `1`, 즉 하나의 카테고리입니다.

날짜/시간 축은 밀리초를 기반으로 하므로, 예를 들어 하루의 간격은 `24 * 3600 * 1000`으로 표현됩니다.

로그 축(logarithmic axes)에서 `tickInterval`은 거듭제곱을 기반으로 하므로, `tickInterval`이 `1`이면 0.1, 1, 10, 100 등 각각에 눈금이 하나씩 생깁니다.   
`tickInterval`이 `2`이면 0.1, 10, 1000 등에 눈금이 생깁니다.   
`tickInterval`이 `0.2`이면 0.1, 0.2, 0.4, 0.6, 0.8, 1, 2, 4, 6, 8, 10, 20, 40 등에 눈금이 생깁니다.

`tickPixelInterval` 옵션은 픽셀 값을 기반으로 눈금 표시의 대략적인 픽셀 간격을 설정합니다(`tickInterval`이 null인 경우 적용).   
이를 통해 반응형 레이아웃에서 차트 크기와 축 길이에 관계없이 눈금 간에 적절한 거리를 보장합니다. 카테고리 축에는 적용되지 않습니다. 기본값은 y축의 경우 `72`, x축의 경우 `100`입니다.


#### 보조 눈금 (Minor ticks)
[minorTickInterval](https://api.highcharts.com/highcharts/xAxis.minorTickInterval) 옵션이 설정되면 주요 눈금 사이에 보조 눈금이 배치됩니다.   
여기에는 보조 눈금 표시와 보조 격자선이 포함되며, 이들은 외관에 대한 별도의 옵션을 가지고 있습니다. 단, 레이블은 포함되지 않습니다.


#### Highcharts에서 눈금은 어떻게 계산되나요? (How are ticks calculated in Highcharts?)
Highcharts는 축의 눈금 외관과 위치를 제어하는 여러 옵션을 제공합니다.   
기본적으로 축의 최솟값/최댓값과 눈금 위치는 모든 데이터 값이 차트 안에 맞도록 계산됩니다.   
눈금은 "반올림된" 값(선형 축의 경우 1, 2, 5, 10, 20, 50 등, 날짜/시간 축의 경우 분, 시, 월 등)에 배치됩니다.   
이는 차트를 읽고 해석하기 쉽게 만들어 줍니다.   
예를 들어 데이터의 최솟값이 2이고 최댓값이 16이라면, y축은 자동으로 0~20의 범위로 설정되고 눈금은 0, 5, 10, 15, 20에 배치될 수 있습니다.   
이 기본 동작은 여러 옵션을 사용하여 수정할 수 있습니다.

##### 눈금 위치 제어 (Controlling tick placement)
- `tickInterval`: 눈금 간격을 고정 값으로 설정합니다.
- `tickPixelInterval`: 눈금 사이의 대략적인 픽셀 거리를 설정합니다. 반응형 레이아웃에 유용합니다.
- `tickPositions`: 값 배열을 사용하여 눈금 위치를 명시적으로 설정합니다. 자동 계산과 위의 옵션들을 재정의합니다.
- `tickPositioner`: 눈금 위치 배열을 반환하는 콜백 함수로, 완전한 커스터마이징이 가능합니다.


##### 축 최솟값/최댓값과 눈금 (Axis extremes and ticks)
기본적으로 축은 눈금에서 시작하고 끝납니다. 즉, 축의 최솟값과 최댓값은 가장 가까운 눈금 값으로 반올림됩니다.   
이 동작은 `startOnTick`과 `endOnTick` 옵션으로 제어할 수 있습니다. 이 옵션들은 명시적으로 설정한 `min`과 `max` 값도 재정의할 수 있으므로, 축이 정돈된 눈금 값에서 시작하고 끝나게 됩니다.


##### 관련 옵션 (Related options)
눈금 계산과 축 최솟값/최댓값에 영향을 미치는 추가 옵션들입니다.
`alignTicks`, `ceiling`, `floor`, `max`, `min`, `minTickInterval`, `minRange`, `softMax`, `softMin`, `startOnTick`, `tickAmount`, `tickInterval`, `tickPixelInterval`, `tickPositioner`, `tickPositions`



#### 레이블 (Labels)
축 레이블은 해당 데이터의 값을 나타내며 축을 따라 표시됩니다. 레이블은 포맷 문자열이나 포매터 함수를 사용하여 커스터마이징할 수 있습니다.

````js
yAxis: {
  labels: {
    format: '{value}%', // 아래와 동일한 결과:
    formatter: function() {
      return this.value + ' %';
    }
  },
},
````

위 예시는 y축 레이블의 값을 가져와 끝에 `%` 기호를 추가합니다.


#### 격자선 (Grid lines)
격자선은 차트를 격자 형태로 나누는 수평(및/또는 수직) 선의 모음으로, 차트의 값을 읽기 쉽게 만들어 줍니다.

x축 또는 y축의 격자선을 활성화하거나 비활성화하려면 해당 축의 [gridLineWidth](https://api.highcharts.com/highcharts/xAxis.gridLineWidth)를 설정합니다.

````js
xAxis: {
  gridLineWidth: 1
},
yAxis: {
  gridLineWidth: 1
}
````

y축의 격자선은 기본적으로 활성화되어 있으며(`gridLineWidth: 1`), x축은 기본적으로 비활성화되어 있습니다(`gridLineWidth: 0`).

격자선에 대한 다른 옵션들은 x축 및 y축에 대한 [API 레퍼런스](https://api.highcharts.com/highcharts/xAxis) 에서 확인할 수 있습니다.

보조 격자선(minor grid lines)은 [minorTickInterval](https://api.highcharts.com/highcharts/xAxis.minorTickInterval) 옵션을 설정하여 활성화할 수 있는 중간 선입니다.



### 다중 축 (Multiple axes)
여러 축을 만들고 서로 다른 데이터 시리즈와 연결하는 것이 가능합니다. 이를 위해 아래와 같이 여러 축을 생성해야 합니다.

````js
yAxis: [{ //--- 기본 yAxis
  title: {
    text: 'Temperature'
  }
}, { //--- 보조 yAxis
  title: {
    text: 'Rainfall'
  },
  opposite: true
}],
series: [{
  yAxis: 0,
  data: [
    49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
    95.6, 54.4
  ]
}, {
  yAxis: 1,
  data: [
    7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6
  ]
}]
````

여러 축은 배열로 생성되므로 첫 번째 `yAxis`는 인덱스 0부터 시작합니다. `opposite: true` 옵션은 축을 차트의 오른쪽에 배치합니다.


#### 눈금 정렬 (Align ticks)
다중 축을 사용할 때는 여러 격자선이 차트를 복잡하게 만들지 않도록 눈금을 정렬하는 것이 일반적으로 바람직합니다. [chart.alignTicks](https://api.highcharts.com/highcharts/chart.alignTicks) 옵션은 기본적으로 `true`입니다. 정렬의 단점은 각 축이 다른 축과 동일한 눈금 수를 갖도록 사전에 결정되므로 눈금 배치가 최적이 아닐 수 있다는 것입니다. 대안으로 `alignTicks`를 비활성화하고 `gridLineWidth`를 `0`으로 설정할 수 있습니다.

#### 임계값 정렬 (Align thresholds)
v10부터 [chart.alignThresholds](https://api.highcharts.com/highcharts/chart.alignThresholds) 옵션을 통해 여러 축의 임계값([threshold](https://api.highcharts.com/highcharts/series.line.threshold))을 정렬하는 것이 가능합니다. 이는 `alignTicks`와 유사하지만 한 단계 더 나아가 영(zero) 레벨이나 다른 종류의 임계값도 정렬되도록 보장합니다.


### 축 타이틀 (Axis title)
축 타이틀은 축 선 옆에 표시됩니다. y축에서는 기본적으로 표시되고 x축에서는 기본적으로 숨겨집니다.   
전체 옵션은 [xAxis.title](https://api.highcharts.com/highcharts/xAxis.title) 을 참고하세요.

### 축 타입 (Axis types)
축은 선형(linear), 로그(logarithmic), 날짜/시간(datetime) 또는 카테고리(categories) 타입 중 하나로 설정할 수 있습니다. 축 타입은 다음과 같이 설정합니다.

````js
// 타입은 'linear', 'logarithmic', 'datetime' 중 하나
yAxis: {
  type: 'linear',
}
// 카테고리는 배열로 설정
xAxis: {
  categories: ['Apples', 'Bananas', 'Oranges']
}
````

#### 선형 (Linear)
축의 숫자가 선형 스케일로 표시됩니다. 이것이 기본 축 타입입니다. 데이터 시리즈에 y값만 있는 경우 x축은 0부터 y값의 수까지 레이블이 붙습니다(y값의 배열 인덱스를 표시).

````js
var chart = new Highcharts.Chart({
  chart: {
    renderTo: 'container',
    type: 'column'
  },
  title: {
    text: 'Fruit Consumption'
  },
  xAxis: {
    title: {
      text: 'Fruit Number'
    },
    tickInterval: 1
  },
  yAxis: {
    title: {
      text: 'Fruit eaten'
    },
    tickInterval: 1
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

![alt text](/assets/images/posts/library/highcharts/03-13.png)


#### 로그 (Logarithmic)
로그 축에서 축의 숫자는 로그적으로 증가하며, 축은 차트에 표시된 데이터 시리즈에 맞게 자동 조정됩니다.

로그 축에서 [tickInterval](https://api.highcharts.com/highcharts/yAxis.tickInterval) 옵션은 거듭제곱을 기반으로 하므로, `tickInterval`이 `1`이면 0.1, 1, 10, 100 등 각각에 눈금이 하나씩 생깁니다. `tickInterval`이 `2`이면 0.1, 10, 1000 등에 눈금이 생깁니다. `tickInterval`이 `0.2`이면 0.1, 0.2, 0.4, 0.6, 0.8, 1, 2, 4, 6, 8, 10, 20, 40 등에 눈금이 생깁니다.

또한 로그 축은 음수가 될 수 없다는 점을 주의해야 합니다. 각 전체 축 단위는 이전 값의 10분의 1이기 때문입니다. 따라서 Highcharts는 축과 연관된 0 또는 음수 포인트를 제거하며, `axis.min` 옵션을 0 또는 음수로 설정하려 하면 오류가 발생합니다.

##### 로그 축에서 0과 음수 값을 표시하는 방법

로그(logarithm)의 핵심 개념부터 살펴보겠습니다. 10의 L승이 Z와 같은 방정식이 있을 때, L은 Z에 대한 밑이 10인 로그라고 합니다. L이 음수이면 Z는 1.0보다 작은 양의 분수를 의미합니다. L이 0이면 Z는 정확히 1.0입니다. L이 0보다 크면 Z는 1.0을 초과합니다. 어떤 L 값이든 Z가 0이거나 음수가 되는 것은 불가능하다는 점이 중요합니다. 로그는 그러한 경우에 대해 정의된 값이 없으며, 오직 양수에 대해서만 작동합니다.

Highcharts의 로그 축에서 0과 음수 값을 표시하려면 커스텀 플러그인을 사용하는 것이 유일한 방법입니다. 이 플러그인은 로그 축에서 음수 값을 에뮬레이션하는 것을 가능하게 합니다. 진정한 로그 축은 0에 닿거나 교차하지 않기 때문에, 결과 스케일이 수학적으로 정확하지 않다는 점을 유념해야 합니다. 커스텀 플러그인은 이 [데모](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/yaxis/type-log-negative/) 에서 확인할 수 있습니다.


#### 날짜/시간 (Datetime)
날짜/시간 축은 적절한 간격으로 반올림된 날짜 값의 레이블을 출력합니다. 내부적으로 날짜/시간 축은 JavaScript `Date` 객체에서 정의한 대로 1970년 1월 1일 자정 이후의 밀리초를 기반으로 한 선형 숫자 축입니다. 스케일에 따라 날짜/시간 레이블은 시간 또는 날짜 형식으로 표시됩니다.

날짜/시간 축에서 모든 시간 설정은 밀리초, 날짜 문자열(v12부터), 또는 `Date` 객체로 제공할 수 있습니다. 여기에는 `min`과 `max` 옵션, `Axis.setExtremes` 인자, `point.x` 및 `series.pointStart`와 같은 관련 옵션들이 포함됩니다.

##### 타임존 처리 (Timezone handling)

기본적으로 Highcharts는 모든 날짜/시간 축에 UTC를 사용합니다. 차트 레벨의 [time.timezone](https://api.highcharts.com/highcharts/time.timezone) 옵션을 설정하여 날짜가 해석되고 표시되는 방식을 제어할 수 있습니다. 타임존이 없는 날짜 문자열은 이 타임존으로 해석됩니다. 날짜 문자열에 타임존 오프셋이 포함된 경우, 해당 오프셋이 적용됩니다.

> 팁: 모든 사용자와 타임존에서 일관된 동작을 위해 ISO 날짜 문자열(예: `2024-01-31`) 또는 UTC 타임스탬프(`Date.UTC(...)`)를 사용하는 것을 권장합니다. 축 값에 로컬 JavaScript `Date` 객체(예: `new Date(2024, 0, 31)`)를 사용하는 것은 피하세요. 이는 사용자의 로컬 타임존에 따라 달라지며, 특히 월 경계 근처에서 예상치 못한 결과를 초래할 수 있습니다.
{: .prompt-tip}

Highcharts Stock에서 x축은 항상 날짜/시간 축입니다.


#### 카테고리 (Categories)
카테고리가 있는 경우, 축의 숫자나 날짜 대신 카테고리 이름이 사용됩니다. [xAxis.categories](https://api.highcharts.com/highcharts/xAxis.categories) 를 참고하세요.


#### 어떤 축 타입을 사용해야 하나요? (What axis type should I use?)
[Highcharts 데모 페이지](https://www.highcharts.com/demo/) 의 많은 예시들은 카테고리를 포함한 xAxis를 사용합니다. 그러나 카테고리를 사용해야 할 때와 선형 또는 날짜/시간 xAxis를 사용하는 것이 더 나을 때를 이해하는 것이 중요합니다.

카테고리는 "사과", "배", "오렌지" 또는 "빨강", "초록", "파랑", "노랑"과 같이 항목들의 그룹입니다. 이러한 카테고리들의 공통점은 중간값이 없다는 것입니다. 사과와 배 사이에는 연속적인 전환이 없습니다. 또한 카테고리 하나를 빠뜨리면 사용자는 무엇이 빠졌는지 알 수 없습니다. 예를 들어 "빨강", "초록", "파랑", "노랑" 중 하나씩 건너뛰어 출력하면 사용자는 어떤 색상이 빠졌는지 알 수 없습니다. 따라서 Highcharts는 카테고리가 축에 너무 밀집될 경우 자동으로 숨기는 방법을 제공하지 않습니다. 축 레이블이 겹치는 문제가 발생하면 [xAxis.labels.staggerLines](https://api.highcharts.com/highcharts/xAxis.labels.staggerLines) 옵션을 사용하거나 레이블에 회전(rotation)을 적용해 보세요. [xAxis.labels.step](https://api.highcharts.com/highcharts/xAxis.labels.step) 옵션으로 카테고리 레이블을 건너뛸 수 있다면, 선형 또는 날짜/시간 축을 사용하는 것이 더 나을 수 있습니다.

선형 또는 날짜/시간 타입의 xAxis는 Highcharts가 보간(interpolate)하는 방법을 알고 있어 데이터 레이블 간격을 결정할 수 있다는 장점이 있습니다. 레이블은 기본적으로 약 100px 간격으로 배치되며, `tickPixelInterval` 옵션으로 변경할 수 있습니다. "Item1", "Item2", "Item3" 또는 "2012-01-01", "2012-01-02", "2012-01-03" 등과 같이 예측 가능한 카테고리가 있다면, [xAxis.labels.formatter](https://api.highcharts.com/highcharts/xAxis.labels.formatter)와 결합한 선형 또는 날짜/시간 축 타입이 더 나은 선택일 것입니다.



### 축 동적 업데이트 (Dynamically updating axes)
렌더링 이후에 새로운 정보로 축을 업데이트할 수 있습니다. 자세한 내용은 [API](https://api.highcharts.com/class-reference/Highcharts.Axis) 를 참고하세요.




-----

##### 참고

- [Understanding Highcharts \| Highcharts](https://www.highcharts.com/docs/chart-concepts/understanding-highcharts)
- [Title and subtitle \| Highcharts](https://www.highcharts.com/docs/chart-concepts/title-and-subtitle)
- [Series \| Highcharts](https://www.highcharts.com/docs/chart-concepts/series)
- [Tooltip \| Highcharts](https://www.highcharts.com/docs/chart-concepts/tooltip)
- [Legend \| Highcharts](https://www.highcharts.com/docs/chart-concepts/legend)
- [Axes \| Highcharts](https://www.highcharts.com/docs/chart-concepts/axes)
