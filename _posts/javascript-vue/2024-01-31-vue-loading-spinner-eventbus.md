---
title: "[Vue] LoadingSpinner | EventBus"
date: 2024-01-31 15:29:00 +0900
categories: [JavaScript, Vue]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## src/components/LoadingSpinner.vue

````vue
<template>
  <div class="loading" v-if="loading">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true,
    }
  }
}
</script>

<style scoped>
.loading { position: absolute; top: 50%; left: 50%; display: block; width: 6.4rem; height: 6.4rem; transform: translate(-50%, -50%); }
.loading div { position: absolute; top: 50%; display: block; width: 1.3rem; background: #42b883; animation: loading 1.2s cubic-bezier(1, 2, 0.5, 2) infinite; }
.loading div:nth-child(1) { right: 50%; transform: translate(-1.3rem, -50%); animation-delay: 0s; }
.loading div:nth-child(2) { left: 50%; transform: translate(-50%, -50%); animation-delay: .12s; }
.loading div:nth-child(3) { left:50%; transform: translate(1.3rem, -50%); animation-delay: .24s; }

@keyframes loading {
  0% { height: 5rem; }
  50%, 100% { height: 2.4rem; }
}
</style>
````
{: file="src/components/LoadingSpinner.vue"}



## src/utils/EventBus.js

````js
import Vue from 'vue';

export default new Vue();
````
{: file="src/utils/EventBus.js"}


## src/App.vue

````vue
<template>
  <div id="app">
    <header-nav></header-nav>
    <transition name="page">
      <router-view></router-view>
    </transition>
    <loading-spinner :loading="loadingStatus"></loading-spinner>
  </div>
</template>

<script>
import HeaderNav from './components/HeaderNav.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import EventBus from './utils/EventBus.js'

export default {
  components: {
    HeaderNav,
    LoadingSpinner
  },
  data() {
    return {
      loadingStatus: false,
    }
  },
  methods: {
    startSpinner() {
      this.loadingStatus = true;
    },
    endSpinner() {
      this.loadingStatus = false;
    }
  },
  created() {
    EventBus.$on('start:spinner', this.startSpinner);
    EventBus.$on('end:spinner', this.endSpinner);
  },
  beforeDestroy() {
    EventBus.$off('start:spinner', this.startSpinner);
    EventBus.$off('end:spinner', this.endSpinner);
  }
}
</script>

<style scoped>
.page-enter-active { position: absolute; animation: fade-in .3s .1s backwards; }
.page-leave-active { position: absolute; animation: fade-in .1s reverse forwards; }

@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
</style>
````
{: file="src/App.vue"}


## Mixin or high order component

````js
import EventBus from '@/utils/EventBus';

// mixin
export default {
  // 재사용 할 component option & logic | data, methdos, create 등...
  created() {
    EventBus.$emit('start:spinner');
    this.$store
      .dispatch('FETCH_LIST', this.$route.name)
      .then(() => {
        // EventBus.$emit('end:spinner');
      })
      .catch((e) => console.log(e));
  },
};
````
{: file="src/mixins/ListMixin.js"}


## src/views/CreateListView.js

````js
import ListView from './ListView.vue';
import EventBus from '../utils/EventBus.js';

// high order component
export default function createListView(name) {
  return {
    // 재사용 할 인스턴스(컴포넌트) 옵션들이 들어갈 자리
    name: name,
    created() {
      EventBus.$emit('start:spinner');
      this.$store
        .dispatch('FETCH_LIST', this.$route.name)
        .then(() => {
          EventBus.$emit('end:spinner');
        })
        .catch((e) => console.log(e));
    },
    // render() 로 컴포넌트를 로딩한다.
    render(createElement) {
      return createElement(ListView);
    },
  };
}
````
{: file="src/views/CreateListView.js"}


## src/store/actions.js

promise를 return해줘야 함

````js
import { fetchList, fetchUserInfo, fetchItemView } from '../api/index';

export default {
  FETCH_LIST(context, pageName) {
    return fetchList(pageName)
      .then(({ data }) => context.commit('SET_LIST', data))
      .catch((e) => console.log(e));
  },
  FETCH_USER(context, user) {
    return fetchUserInfo(user)
      .then(({ data }) => {
        context.commit('SET_USER', data);
      })
      .catch((e) => console.log(e));
  },
  FETCH_ITEM(context, id) {
    return fetchItemView(id)
      .then(({ data }) => {
        context.commit('SET_ITEM', data);
      })
      .catch((e) => console.log(e));
  },
};
````
{: file="src/store/actions.js"}

