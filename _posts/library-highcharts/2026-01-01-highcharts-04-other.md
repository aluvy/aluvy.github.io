---
title: "[Highcharts] 기타 (템플릿, 반응형 차트)"
date: 2026-01-01 08:04:00 +0900
categories: [Library, Highcharts]
tags: []
render_with_liquid: false
math: true
mermaid: true
---


## Templating (템플릿)
Highcharts는 포맷 문자열에서 템플릿을 지원합니다.   
v11.1(2023)부터 템플릿은 논리 연산을 [지원](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting#format-strings)하며, 설정이 보안 및 JSON 호환이 필요한 경우 [formatter callbacks](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting#formatter-callbacks)보다 일반적으로 권장됩니다.   
Highcharts 템플릿 스타일은 Handlebars 및 Mustache와 같은 검증된 언어에서 영감을 받았지만, 차트는 수치 데이터를 다루기 때문에 수치 연산에 더 집중되어 있습니다.


### 표현식 (Expressions)
포맷 문자열의 표현식은 `{single brackets}`로 감싸집니다.   
단순 변수나 상수, 또는 조건부 블록이나 헬퍼(helpers)라고 불리는 함수가 될 수 있습니다.

**변수**와 속성은 괄호 안에 직접 삽입됩니다. 예를 들어 `"The point value at {point.x} is {point.y}"`.   
중첩된 속성은 점 표기법(dot notation)으로 지원됩니다. 배열 역시 점 표기법으로 인덱싱할 수 있습니다. 예를 들어 `{series.xAxis.categories.0}`, 또는 더 실용적으로 서브표현식을 사용하면 `{series.xAxis.categories.(point.x)}`와 같습니다.

**숫자**는 C 라이브러리 함수 `sprintf`의 부동소수점 포맷 규칙의 일부를 사용하여 포맷됩니다. 포맷은 표현식 안에서 값과 콜론으로 구분하여 덧붙입니다. 점과 쉼표가 각각 소수점과 천 단위 구분자를 나타내지만, 실제로 렌더링되는 방식은 언어 설정에 따라 달라집니다. 예를 들어:

- 소수점 두 자리: "`{point.y:.2f}`" [Demo](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/labels/two-decimal-places)
- 천 단위 구분자, 소수점 없음: `{point.y:,.0f}` [Demo](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/labels/no-decimal-places)
- 천 단위 구분자, 소수점 한 자리: `{point.y:,.1f}` [Demo, internationalized](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/labels/one-decimal-place)

**날짜**는 숫자와 마찬가지로 콜론 뒤에 포맷을 덧붙일 수 있습니다. 허용되는 포맷 규칙은 [Highcharts.dateFormat()](https://api.highcharts.com/class-reference/Highcharts.Time#dateFormat) 의 규칙과 동일합니다. 예를 들어:

- 전체 날짜: `{value:%Y-%m-%d}` [Demo](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/labels/full-date)
- 로케일 인식 전체 날짜: `{value:%[Ymd]}` [Demo](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/labels/full-date)

> 참고: 로케일 인식 포맷은 활성 로케일의 이름을 사용합니다.   
> `lang.months`, `lang.weekdays` 등에서 커스텀 이름을 적용하려면 로케일 비인식 포맷을 사용하세요.   
> 예를 들어 `{value:%b}`는 `lang.shortMonths`를 사용하고, `{value:%[b]}`는 로케일을 따릅니다.


### 헬퍼 (Helpers)
헬퍼는 표현식에서 사용할 조건부 블록 또는 함수를 정의합니다. Highcharts에는 여러 [built-in helpers](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting#built-in-helpers)가 포함되어 있으며, 커스텀 헬퍼를 추가할 수도 있습니다.

````js
// `add` 헬퍼를 사용하여 두 리터럴 숫자를 더하기
format: '{add 1 2}' // => 3 출력

// 리터럴 숫자와 변수를 더하기
format: '{add point.index 1}' // => 0부터 시작하는 인덱스를 1부터 시작하는 인덱스로 출력
````

**블록 헬퍼**는 조건부로 실행되는 블록을 포함합니다. 블록 헬퍼는 `#`으로 시작하고 닫는 표현식으로 끝납니다. 조건이 거짓(falsy)일 때 실행할 `{else}` 표현식을 포함할 수도 있습니다.

````js
// 단순 #if 헬퍼
format: '{#if point.isNull}Null{else}{point.y:.2f} USD{/if}'

// 중첩 표현식을 사용하여 포인트를 순회하는 블록 헬퍼
format: '{#each points}{add this.index 1}) {this.name}\n{/each}'
````

[공유 툴팁에서 #each 헬퍼를 사용하는 데모를 참고하세요.](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/tooltip/format-shared)

**커스텀 헬퍼**는 `Highcharts.Templating.helpers`를 확장하여 정의할 수 있습니다.   
각 헬퍼는 고정된 수의 인자를 가집니다. 블록 헬퍼가 컨텍스트나 블록 본문에 접근해야 하는 경우를 위해 `match` 객체가 인자에 추가됩니다. 헬퍼는 불리언(boolean)을 반환하면 조건으로 동작하고, 문자열이나 숫자를 반환하면 전체 블록 또는 표현식에 해당 값이 삽입됩니다.

````js
// 숫자의 절댓값을 반환하는 헬퍼 정의
Highcharts.Templating.helpers.abs = value => Math.abs(value);

// 사용 방법
format: 'Absolute value: {abs point.y}'
````

[View live demo.](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/bar-negative-stack)


### 서브표현식 (Subexpressions)
서브표현식은 여러 헬퍼를 호출하고 내부 헬퍼의 결과를 외부 헬퍼로 전달하는 강력한 방법을 제공합니다. 서브표현식은 괄호로 구분됩니다.

````js
// 섭씨를 화씨로 변환 (point.y는 섭씨)
format: '{add (multiply point.y (divide 9 5)) 32}℉'
````

이런 식으로 수학 연산을 하다 보면 소수점이 너무 많거나 숫자 또는 날짜 포맷을 적용해야 하는 경우가 생깁니다. 그럴 때는 서브표현식을 사용한 후 위에서 설명한 포맷을 적용합니다.

````js
// 섭씨를 화씨로 변환 (point.y는 섭씨)
// 결과를 소수점 한 자리로 포맷
format: '{(add (multiply point.y (divide 9 5)) 32):.1f}℉'
````

[View live demo.](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/series-datalabels-format-subexpression)

서브표현식은 조건 안에서 명제가 참인지 평가하는 데도 사용할 수 있습니다.

````js
// 조건 안의 서브표현식. 단수/복수 형태 결정.
format: 'The series exists of {points.length} ' + '{#if (eq 1 points.length)}point{else}points{/if}.'
````

### 디버깅 (Debugging)
포매터 콜백 대신 문자열 포맷을 사용할 때의 단점 중 하나는 콜백 내부에서 로그 및 디버깅을 할 수 없다는 것입니다. 이를 해결하기 위해 컨텍스트를 검사할 수 있는 커스텀 헬퍼를 정의할 수 있습니다.

````js
// 컨텍스트를 로그하는 커스텀 헬퍼
Highcharts.Templating.helpers.log = function () {
  console.log(arguments[0].ctx);
};

// 사용 방법
format: '{log}'
````

[View live demo.](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/members/format-log)



### 내장 헬퍼 (Built-in helpers)

- **add**
  - 두 숫자를 더합니다. 예를 들어 `{add index 1}`은 컨텍스트의 0 기반 `index`에 1을 더합니다. [Demo](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/series-datalabels-format-subexpression)

- **divide**
  - 첫 번째 숫자를 두 번째 숫자로 나눕니다. 예를 들어 `{divide 10 2}`는 5를 출력합니다. 0으로 나누면 빈 문자열을 반환합니다. [Demo](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/series-datalabels-format-subexpression)

- **eq**
  - 첫 번째와 두 번째 인자 사이의 느슨한 동등성(JavaScript `==`)에 대해 `true`를 반환합니다. 블록 헬퍼 `{#eq index 0}First item{/eq}` 또는 서브표현식 `{#if (eq index 0)}First item{/if}` 형태로 사용할 수 있습니다.

- **#each**
  - 항목 배열을 순회합니다. 각 자식의 컨텍스트는 블록 본문에서 `{this}`로 제공됩니다. 블록 본문의 추가 변수로는 `@index`, `@first`, `@last`가 있습니다. 예: `{#each points}{@index}) {name}, {#if @last}and {/if}`. [Demo](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/tooltip/format-shared)

- **ge**
  - 크거나 같음(JavaScript `>=`). 블록 헬퍼와 서브표현식 모두로 사용 가능합니다.

- **gt**
  - 초과(JavaScript `>`). 블록 헬퍼와 서브표현식 모두로 사용 가능합니다.

- **#if**
  - 조건부 블록 헬퍼. `{#if point.isNull}The point is null{else}The value is {point.y}{/if}`.

- **le**
  - 작거나 같음(JavaScript `<=`). 블록 헬퍼와 서브표현식 모두로 사용 가능합니다.

- **lt**
  - 미만(JavaScript `<`). 블록 헬퍼와 서브표현식 모두로 사용 가능합니다.

- **multiply**
  - 두 숫자를 곱합니다. 예를 들어 `{multiply value 1000}`. [Demo](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/series-datalabels-format-subexpression)

- **ne**
  - 같지 않음(JavaScript `!=`). 블록 헬퍼와 서브표현식 모두로 사용 가능합니다.

- **subtract**
  - 첫 번째 숫자에서 두 번째 숫자를 뺍니다. 예: `{subtract 5 2}`는 3을 출력합니다.

- **ucfirst**
  - 문자열의 첫 번째 문자를 대문자로 바꿉니다. 예를 들어 `{ucfirst point.key}`.

- **#unless**
  - `#if`의 반대입니다. `{#unless point.isNull}The value is {point.y}{/unless}`.


### 제한 사항 (Limitations)
템플릿 시스템은 각 항목에 전달된 컨텍스트에서만 작동합니다. 데이터 레이블의 경우 컨텍스트는 포인트이고, 툴팁 포맷의 경우 컨텍스트는 시리즈, 포인트, 제안된 헤더를 포함하며, 축 레이블의 경우 컨텍스트는 축 값 등을 포함합니다. 대부분의 경우 컨텍스트는 DOM 요소에 대한 깊은 접근(예: `series.chart.container.ownerDocument`를 통해)을 가지고 있지만, XSS 필터링으로 인해 이러한 속성은 템플릿에서 접근할 수 없습니다. DOM 접근을 방지하는 것이 포매터 콜백 대신 문자열 포맷을 선택하는 이유 중 하나입니다.

헬퍼만으로는 원하는 포맷에 도달하기 어려운 경우, 데이터셋을 전처리하는 것이 더 좋습니다. 시리즈와 포인트에 [custom option](https://api.highcharts.com/highcharts/series.line.custom)을 사용하고 포맷 문자열에서 해당 옵션에 접근하세요.

[colum-comparison demo](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/column-comparison) 에서는 축 레이블과 툴팁에 대한 룩업(lookup) 객체를 준비하고, 이를 차트 레벨의 옵션에 추가한 후 축과 툴팁 포맷 문자열에서 접근합니다.


### 더 이상 사용되지 않는 포맷 함수 (Deprecated format functions)
v11.1 이전의 접근성(accessibility) 모듈에는 `#each()`와 `#plural()`이라는 두 가지 고급 함수가 있었습니다. 이 함수들은 더 이상 사용되지 않으며(deprecated), 기본 언어 문자열에서 새로운 `#each`와 `#eq`로 대체되었습니다.   
자세한 내용은 GitHub의 [Advanced format strings](https://github.com/highcharts/highcharts/blob/v11.0.0/docs/chart-concepts/labels-and-string-formatting.md#advanced-format-strings) (링크 포함) 를 참고하세요.


---


## Responsive charts (반응형 차트)
Highcharts 5.0부터 반응형 웹 페이지를 작업하는 방식과 매우 유사하게 반응형 차트를 만들 수 있습니다. 설정에 최상위 옵션인 [responsive](https://api.highcharts.com/highcharts/responsive) 가 존재합니다.

이 옵션을 사용하면 각각의 규칙(rule) 세트를 정의할 수 있으며, 각 규칙에는 [condition](https://api.highcharts.com/highcharts/responsive.rules.condition) (예: `maxWidth: 500`)과 일반 차트 옵션 위에 적용되는 별도의 [chartOptions](https://api.highcharts.com/highcharts/responsive.rules.chartOptions) 세트가 포함됩니다. chartOptions는 해당 규칙이 적용될 때 일반 차트 옵션을 재정의(override)하는 방식으로 동작합니다. 예를 들어 아래 규칙은 차트 너비가 500픽셀 미만일 때 범례(legend)를 숨깁니다.

````js
responsive: {
  rules: [{
    condition: {
      maxWidth: 500
    },
    chartOptions: {
      legend: {
        enabled: false
      }
    }
  }]
}
````

가장 편리한 옵션 중 하나는 [chart.className](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/responsive/classname/) 으로, Highcharts [styled mode](https://www.highcharts.com/docs/chart-design-and-style/style-by-css) 에서 다른 모든 요소의 스타일을 제어하는 데 사용할 수 있습니다.

일반적으로 반응형 설정을 통해 차트의 모든 측면에 대해 크기에 따른 설정을 정의할 수 있습니다. 대표적인 활용 사례로는 [범례 이동](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/responsive/legend/) 이나 [축이 차지하는 공간](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/responsive/axis/) 조정 등이 있습니다.   
반응형은 [스톡 차트(stock charts)](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/stock/demo/responsive/) 와 같이 많은 그래픽 요소가 있는 차트에서도 매우 유용한 개념입니다.

브라우저 창 크기를 늘리거나 줄일 때 아래 샘플에서 범례가 어떻게 변화하는지 확인해 보세요.

![alt text](/assets/images/posts/library/highcharts/04-01.png)

[Highcharts responsive chart](https://jsfiddle.net/api/post/library/pure/)







---

##### 참고
- [Templating \| Highcharts](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting)
- [Responsive charts \| Highcharts](https://www.highcharts.com/docs/chart-concepts/responsive)



