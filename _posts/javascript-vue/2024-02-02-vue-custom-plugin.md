---
title: "[Vue] Custom Plugin"
date: 2024-02-02 15:38:00 +0900
categories: [JavaScript, Vue]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

여러 번 사용되는 라이브러리의 경우   
컴포넌트마다 import 해오지 말고 plugin으로 만들어 사용하면 좋다.   
plugin으로 등록하면 전역에서 사용할 수 있다.

## Chart.js 라이브러리 plugin 제작

````shell
$ npm i chart.js
````

````js
import ChartPlugin from './plugins/ChartPlugin.js';

Vue.use(ChartPlugin);
````
{: file="src/index.js"}

`Vue.use(ChartPlugin)` 하게 되면 `ChartPlugin` 안의 `install()` 함수가 실행된다.



````js
import { Chart, registerables } from 'chart.js';
Chart register(...registerables);

export default {
  install(Vue){
    Vue.prototype.$_Chart = Chart;
  }
}
````
{: file="src/plugins/ChartPlugin.js"}


`install()` 함수가 실행되면   
Vue.prototype에 `$_Chart`라는 이름으로 Chart가 등록된다.   
변수명 앞에 `$_` 를 프리픽스로 사용하는 이유는 **$와 _는 이미 Vue 내부에서 사용되고 있기 때문**이다.



````vue
export default {
  mounted() {
    const ctx = this.$refs.BarChart;
    new this._Chart(ctx, {
      type: 'bar',
      // ...
    })
  }
}
````
{: file="src/components/component.vue"}
 

플러그인으로 등록하면 컴포넌트에서 `this.$_Chart`로 접근이 가능하다.


---

##### 참고

- [Vue.js](https://vuejs.org/guide/reusability/plugins.html#plugins)
