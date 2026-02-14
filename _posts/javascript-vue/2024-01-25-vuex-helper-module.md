---
title: "[Vue] Vuex, 헬퍼, 모듈화"
date: 2024-01-25 16:01:00 +0900
categories: [JavaScript, Vue]
tags: []
render_with_liquid: false
math: true
mermaid: true
---


## Vuex
Vuex는 vuejs에서 컴포넌트들의 상태(state)를 관리하는 라이브러리이다.   
(React의 Flux 패턴에서 차용한 것이라고 한다.)


## Vuex 설치하기

````shell
$ npm i vuex --save
````

## Vuex 세팅하기

Vuex는 상태(state)를 저장하고 있는 저장소(store)를 가지고 있다.   
Vuex가 설치되었다면 이 저장소를 관리하는 파일을 생성해주자.

````js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {}
});
````
{: file="src/store/store.js"}

main.js에선 만들어준 src/store/store.js를 import 해온 뒤 Vue 인스턴스에 주입한다.

````js
import Vue from 'vue';
import App from './App.vue';
import { store } from './store/store';

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
````
{: file="main.js"}



## Vuex store 속성

Vuex store에는 state와 같은 속성이 크게 5가지가 있다.   
state, getters, mutations, actions, modules

### state
state는 상태(state)의 집합이다.   
Vuex는 단일 상태 트리(single state tree)를 사용하기 때문에 이 집합 내에서 현재 상태를 쉽게 찾을 수 있다.

````js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    count: 0,
  }
});
````
{: file="src/store/store.js"}

````vue
<template>
  <div>{{ count }}</div>
</template>

<script>
export default {
  computed: {
    count() {
      return this.$store.state.count
    }
  }
}
</script>
````
{: file="src/components/component.vue"}



#### mapState

````vue
<template>
  <div>{{ count }}</div>
</template>

<script>
import { mapState } from 'vuex'
  
export default {
  computed: {
    ...mapState(['count']),
  }
}
</script>
````
{: file="src/components/component.vue"}


### getters

state 값에 접근하는 속성이자 `computed()` 처럼 미리 연산된 값에 접근하는 속성

````js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    count: 0,
  },
  getters: {
    doubleCount(state) {
      return state.count * 2
    }
  }
});
````
{: file="src/store/store.js"}


````vue
<template>
  <div>{{ doubleCount }}</div>
</template>

<script>
export default {
  computed: {
    doubleCount() {
      return this.$store.getters.doubleCount
    }
  }
}
</script>
````
{: file="src/components/component.vue"}



#### mapGetters

````vue
<template>
  <div>{{ doubleCount }}</div>
</template>

<script>
import { mapGetters } from 'vuex'
  
export default {
  computed: {
    ...mapGetters({ doubleCount: 'doubleCount' }),
  }
}
</script>
````
{: file="src/components/component.vue"}


### mutations

state의 값을 변경할 수 있는 유일한 방법이자 메서드   
뮤테이션은 commit()으로 동작시킨다.

````js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    addCount(state, payload) {
      state.count = state.count + payload.num;
    }
  }
});
````
{: file="src/store/store.js"}


````vue
<template>
  <div><button @click="addCount">{{ count }}</button></div>
</template>

<script>
export default {
  computed: {
    count() {
      return this.$store.state.count
    }
  },
  methods: {
    addCount() {
      this.$store.commit('addCount', { num: 20 });
    }
  }
}
</script>
````
{: file="src/components/component.vue"}


#### mapMutations

````vue
<template>
  <div><button @click="addCount({ num: 20 })">{{ count }}</button></div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters({ count: 'count'}),
  },
  methods: {
    ...mapMutations(['addCount']),
  },
}
</script>
````
{: file="src/components/component.vue"}



### actions

비동기 처리 로직을 선언하는 메서드, 비동기 로직을 담당하는 mutations   
데이터 요청, Promise, ES6 async 와 같은 비동기 처리는 모두 actions에 선언한다

````js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    product: [],
  },
  mutations: {
    setData(state, payload) {
      state.product = fetchedData;
    }
  },
  actions: {
    fetchProductData(context) {
      return axios.get('https://domain.com/product/1')
                  .then(res => context.commit('setData', res));
    }
  }
});
````
{: file="src/store/store.js"}


````vue
methods: {
  getProduct() {
    this.$store.dispatch('fetchProductData');
  }
}
````
{: file="src/components/component.vue"}


## Vuex 헬퍼 함수가 주는 간편함

````js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    price: 100,
  },
  getters: {
    originalPrice(state) {
      return state.price;
    },
    doublePrice(state) {
      return state.price * 2;
    },
    triplePrice(state) {
      return state.price * 3;
    },
  },
});
````
{: file="src/store/store.js"}


````vue
<template>
  <div class="root">
    <p>{{ originalPrice }}</p>
    <p>{{ doublePrice }}</p>
    <p>{{ triplePrice }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['originalPrice', 'doublePrice', 'triplePrice']),
  }
}
</script>
````
{: file="src/components/component.vue"}



## Vuex 모듈화

````js
import Vue from 'vue';
import Vuex from 'vuex';
import todoApp from './todoApp/todoApp.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    todoApp,
  },
});
````
{: file="src/store/store.js"}


````js
import * as getters from './getters.js'; // import 방법1
import mutations from './mutations.js'; // import 방법2
import actions from './actions.js';

const storage = {
  fetch() {
    let arr = [];
    if (localStorage.getItem('todoItems') !== null) {
      arr = JSON.parse(localStorage.getItem('todoItems'));
    }
    return arr;
  },
};

const state = {
  todoItems: storage.fetch(),
};

export default {
  state,
  getters,
  mutations,
  actions,
};
````
{: file="src/store/todoApp/todoApp.js"}


````js
// export 방법1
const getTodoItems = (state) => {
  return state.todoItems;
};

export { getTodoItems };
````
{: file="src/store/todoApp/getters.js"}


````js
// export 방법2
export default {
  addTodo(state, payload) {
    const time = new Date().toJSON().replaceAll(/[^0-9]/g, '');
    const obj = { time: time, completed: false, item: payload.newTodoItem };
    state.todoItems.push(obj);
    this.commit('setLocalStorage');
  },
  removeTodo(state, payload) {
    const idx = state.todoItems.indexOf(payload.todoItem);
    state.todoItems.splice(idx, 1);
    this.commit('setLocalStorage');
  },
  toggleComplete(state, payload) {
    const idx = state.todoItems.indexOf(payload.todoItem);
    state.todoItems[idx].completed = !state.todoItems[idx].completed;
    this.commit('setLocalStorage');
  },
  clearTodo(state) {
    state.todoItems = [];
    this.commit('setLocalStorage');
  },
  setLocalStorage(state) {
    localStorage.setItem('todoItems', JSON.stringify(state.todoItems));
  },
};
````
{: file="src/store/todoApp/mutations.js"}

---

<br>

##### 참고

- [\[Vue\] Vuex 개념과 실제 사용해보기!](https://jinyisland.kr/post/vuex/)
- [Vuex란? 개념과 예제](https://doozi0316.tistory.com/entry/Vuex-%EA%B0%9C%EB%85%90%EA%B3%BC-%EC%98%88%EC%A0%9C-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0)
