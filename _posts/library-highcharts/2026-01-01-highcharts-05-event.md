---
title: "[Highcharts] 주요 이벤트"
date: 2026-01-01 08:05:00 +0900
categories: [Library, Highcharts]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## Understanding Common Highcharts Events (Highcharts 주요 이벤트 이해하기)

Highcharts는 차트와 그 구성 요소에 인터랙티비티(interactivity)와 커스텀 동작을 추가할 수 있는 유연한 이벤트 시스템을 제공합니다. 이 가이드는 Highcharts에서 가장 일반적이고 유용한 이벤트를 소개하고, 이를 효과적으로 다루는 방법을 설명합니다.

개별 이벤트를 살펴보기 전에, Highcharts에서 이벤트 핸들러를 연결하는 방법이 여러 가지 있다는 점을 이해하는 것이 중요합니다. 어떤 방법을 선택할지는 사용 사례에 따라 달라집니다.


### Highcharts에서 이벤트를 연결하는 방법 (Ways to Attach Events in Highcharts)
이벤트는 설정이 정적인지, 동적인지, 또는 여러 차트에서 재사용할 의도인지에 따라 여러 방식으로 등록할 수 있습니다.

| 방법                                            | 범위                  | 적합한 경우                                | JSON 설정 지원 여부              | 예시                                                             |
| ----------------------------------------------- | --------------------- | ------------------------------------------ | -------------------------------- | ---------------------------------------------------------------- |
| 설정(Configuration) 내에서                      | 차트 하나             | 특정 차트에 대한 커스텀 동작               | ❌ 불가 (함수는 JSON에 저장 불가) | `chart.events.load`                                              |
| 컴포넌트 인스턴스에서 (Chart, Series, Point 등) | 이미 생성된 차트 하나 | 설정이 백엔드/편집 가능한 UI에서 로드될 때 | ✅ 가능                           | `Highcharts.addEvent(chart, 'render', ...)`                      |
| Highcharts 클래스에서                           | 특정 타입의 모든 차트 | 플러그인 스타일의 재사용 가능한 로직       | ✅ 가능                           | `Highcharts.addEvent(Highcharts.Series, 'legendItemClick', ...)` |



#### 각 방법의 선택 기준 (When to Choose Each Method)
- 특정 차트에 대해 구현 시 인터랙션을 직접 정의할 때는 **설정 내에서** 사용합니다.
- 차트 설정이 순수 JSON으로 제공될 때는 **인스턴스 레벨**을 사용합니다.
- 여러 차트에서 일관된 동작을 원하거나 확장/플러그인을 작성할 때는 **클래스 레벨**을 사용합니다.

#### 코드 예시 (Code Examples)

A) 설정(Configuration) 내에서 (가장 일반적)

````js
Highcharts.chart('container', {
  chart: {
    events: {
      load() {
        console.log('Chart loaded');
      }
    }
  }
});
````

B) 차트 인스턴스에서

````js
const chart = Highcharts.chart('container', {
  series: [{ data: [1, 2, 3] }]
});
Highcharts.addEvent(chart, 'render', function () {
  console.log('Rendered (instance)');
});
````

C) 클래스에서 (모든 차트/시리즈/포인트에 적용)

````js
Highcharts.addEvent(Highcharts.Series, 'legendItemClick', function () {
  console.log('Legend clicked:', this.name);
});
````

- [Extending Highcharts 문서](https://www.highcharts.com/docs/extending-highcharts/extending-highcharts) 를 참고하세요.



### 주요 이벤트 (Common Events)
#### 1. 차트 로드 이벤트 (Chart Load Event)
`load` 이벤트는 차트가 완전히 로드되었을 때 발생합니다. 초기 설정이나 수정 작업을 수행하기에 좋은 시점입니다.

````js
Highcharts.chart('container', {
  chart: {
    events: {
      load: function() {
        alert('Chart has loaded');
      }
    }
  },
  series: [{
    data: [1, 2, 3, 4]
  }]
});
````

- [Demo](https://api.highcharts.com/highcharts/chart.events.load)
- [API option](https://api.highcharts.com/highcharts/chart.events.load)


#### 2. 차트 렌더 이벤트 (Chart Render Event)
`render` 이벤트는 차트가 다시 그려질 때마다 발생합니다. 요소를 업데이트하거나, 현재 차트 상태를 기반으로 계산을 실행하거나, 커스텀 반응형 요소를 그리는 데 유용합니다.

````js
let renderCount = 0;
Highcharts.chart('container', {
  chart: {
    events: {
      render: function () {
        renderCount++;
        console.log(`Chart has rendered ${renderCount} times`);
      }
    }
  },
  series: [{
    data: [1, 2, 3, 4]
  }]
});
````

- [Demo](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/members/renderer-on-chart/)
- [API option](https://api.highcharts.com/highcharts/chart.events.render)



#### 3. 차트 선택 이벤트 (Chart Selection Event)
`selection` 이벤트는 사용자가 차트에서 영역을 선택할 때(일반적으로 줌(zoom) 용도) 발생합니다. 선택한 영역의 정확한 좌표를 가져오는 데 유용합니다.

````js
Highcharts.chart("container", {
  chart: {
    zooming: { 
        type: "x" 
    },
    events: {
      selection(e) {
        const text = e.xAxis
          ? `From ${e.xAxis[0].min} to ${e.xAxis[0].max}`
          : "";
        this.setSubtitle({ text });
      },
    },
  },
  series: [
    {
      data: [1, 2, 3, 4],
    },
  ],
});
````

- [Demo](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/chart/events-selection/)
- [API option](https://api.highcharts.com/highcharts/chart.events.selection)



#### 4. 포인트 클릭 이벤트 (Point Click Event)
포인트의 `click` 이벤트는 사용자가 특정 데이터 포인트를 클릭할 때 발생합니다. 클릭한 포인트를 기반으로 추가 정보를 표시하거나 동작을 수행하는 데 사용할 수 있습니다.

````js
Highcharts.chart("container", {
  plotOptions: {
    series: {
      point: {
        events: {
          click: function () {
            alert("You clicked on point: " + this.index)
          },
        },
      },
    },
  },
  series: [
    {
      data: [1, 2, 3, 4],
    },
  ],
});
````

- [Demo](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/series-point-events-click/)
- [API option](https://api.highcharts.com/highcharts/plotOptions.series.point.events.click)



#### 5. 범례 항목 클릭 이벤트 (Legend Item Click Event)
범례의 `itemClick` 이벤트는 사용자가 범례 항목을 클릭할 때 발생하며, 일반적으로 시리즈의 표시 여부를 토글합니다. `false`를 반환하거나 `event.preventDefault()`를 호출하여 이 기본 동작을 막고 대신 커스텀 동작을 구현할 수 있습니다.

````js
Highcharts.chart('container', {
  legend: {
    events: {
      itemClick: function (e) {
        const visibility = e.legendItem.visible ? 'visible' : 'hidden'
        if (
          !confirm(
            'The series is currently ' +
              visibility +
              '. Do you want to change ' +
              'that?',
          )
        ) {
          return false
        }
      },
    },
  },
  series: [
    {
      data: [1, 2, 3, 4],
    },
  ],
});
````

- [Demo](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/legend/pie-legend-itemclick/)
- [API option](https://api.highcharts.com/highcharts/legend.events.itemClick)



### 이벤트 핸들러 인자 (Event Handler Arguments)
각 핸들러는 인터랙션에 대한 세부 정보가 담긴 이벤트 객체를 받습니다. 공통 속성으로는 커서 좌표(`chartX`, `chartY`), 축 범위, 대상 요소 등이 있습니다. `this` 컨텍스트는 이벤트를 발생시킨 요소(`chart`, `series` 또는 `point`)를 가리킵니다.

````js
Highcharts.chart("container", {
  chart: {
    events: {
      click: function (event) {
        console.log("Mouse X:", event.chartX, "Mouse Y:", event.chartY)
      },
    },
  },
  series: [
    {
      data: [1, 2, 3, 4],
    },
  ],
});
````

- [Demo](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/chart/events-click/)
- [API](https://api.highcharts.com/highcharts/chart.events.click)



### Highcharts에서 Promise 및 비동기 데이터 처리 (Dealing with Promises and Asynchronous Data in Highcharts)
Highcharts는 `Highcharts.chart()`가 실행될 때 데이터가 준비되어 있기를 기대합니다. 그러나 데이터를 비동기적으로 로드하는 것은 매우 일반적입니다. 이러한 경우 차트는 보통 **빈 데이터나 플레이스홀더(placeholder) 데이터**로 초기화된 후, 실제 데이터가 가져와지면 업데이트됩니다.

주요 접근 방식은 두 가지입니다.

1. 차트를 생성하기 전에 데이터를 먼저 가져온 후 `Highcharts.chart()`에 직접 전달하거나,
2. 차트를 먼저 생성하고 데이터가 준비되면 업데이트하는 방식으로, 실시간 또는 지속적으로 업데이트되는 데이터에 유용합니다.

일반적인 패턴은 `fetch()`(또는 다른 비동기 API)를 사용하여 데이터를 로드한 후 `series.setData()` 또는 `series.addPoint()`를 사용하여 차트를 업데이트하는 것입니다. 이 메서드들은 자동으로 다시 그리기(redraw)를 트리거합니다. 성능상의 이유로 여러 업데이트를 한꺼번에 처리해야 하는 경우, 모든 업데이트를 적용한 후 `chart.redraw()`를 수동으로 호출할 수 있습니다.

비동기 로딩은 대용량 데이터셋이나 맵 시각화에서 특히 유용하며, 데이터 요청을 지연함으로써 성능을 개선하고 UI의 반응성을 유지합니다.

![alt text](/assets/images/posts/library/highcharts/05-01.png)

[Live random data](https://jsfiddle.net/api/post/library/pure/)

- [Live data 문서](https://www.highcharts.com/docs/working-with-data/live-data) 를 참고하세요.

---

##### 참고
- [Understanding Common Highcharts Events \| Highcharts](https://www.highcharts.com/docs/chart-concepts/common-events)



