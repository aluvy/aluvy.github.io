---
title: "[Vue] Navigation Guard"
date: 2024-01-31 14:58:00 +0900
categories: [JavaScript, Vue]
tags: []
render_with_liquid: false
math: true
mermaid: true
---


## Navigation Guard
네비게이션 가드는 특정 URL에 접근(Navigation) 하기 전에 불려지는 (Hook)의 일종으로, 다른 페이지로 우회 하거나 접근 자체를 취소시킬 수 있기 때문에 네비게이션 가드라고 불립니다.

사용자의 권한에 따라 페이지 접근을 막거나 페이지를 로딩하기 전에 데이터를 미리 불러올 때 사용하기 좋은 기술입니다. 사실상 싱글 페이지 어플리케이션을 구현할 때는 거의 필수로 구현해야 합니다.


## 네비게이션 가드 종류
네비게이션 가드의 종류는 적용되는 위치, 범위에 따라서 전역, 지역, 컴포넌트 3가지로 나뉩니다.


### 전역 가드
전역 가드는 모든 라우팅에 적용되는 네비게이션 가드입니다. 라우터의 beforeEach라는 메소드를 통해 전역가드의 로직을 설정할 수 있습니다. 아래는 전역 가드를 설정하는 예시 코드입니다.

````js
var router = new VueRouter();

router.beforeEach(function(to, from, next) {
  // ...
});
````

뷰 라우터 인스턴스를 하나 생성하고 해당 인스턴스를 참조하는 변수에 beforeEach() API 함수를 호출합니다. 인자로 받은 3개의 변수는 다음과 같은 역할을 합니다.

- to: 이동 할 url
- from: 현재 url
- next: to에서 지정ㅈ한 url로 이동하기 위해 꼭 호출해야 하는 함수

> next 함수 인자에 따라서 라우팅 허용 여부가 달라집니다.   
> next() : 라우팅 승인   
> next(false) : 라우팅 취소   
> next('/') : 특정 라우트로 진입 (route.push 처럼 진입하고자 하는 경로 지정 가능)
{: .prompt-tip}



### 지역 가드

지역 가드는 라우팅별로 적용되는 네비게이션 가드입니다. 아래와 같이 특정 라우트의 beforeEnter 속성에 호출할 함수를 지정합니다.

````js
var router = new VueRouter({
  routes: [
    {
      path: '/News',
      component: NewsView,
      beforeEnter: function(to, from, next) {
        EventBus.$emit('start:spinner');
        
        store.dispatch(dispatchName, to.name)
          .then(() => {
            // EventBus.$emit('end:spinner'); // mixin mounted()로 이동
            next(); // next() 함수를 호출해야 페이지가 이동 된다.
          })
          .catch((e) => console.log(e));
      }
    }
  ]
})
````



### 컴포넌트 가드
컴포넌트 가드는 컴포넌트 인스턴스를 통해 라우팅을 제어하는 네비게이션 가드입니다. 목적에 따라 다시 세 종류로 나뉘지만 인자들은 앞에서 살펴본 전역, 지역 가드와 동일합니다.

#### beforeRouteEnter
`beforeRouteEnter`는 컴포넌트 인스턴스가 생성되기 전에 호출됩니다. 인스턴스 생성 전이기 때문에 this를 통한 인스턴스 접근은 불가능합니다. 대신 인스턴스를 조작하는 콜백을 next에 전달하면 인스턴스가 생성된 이후에 콜백이 호출됩니다.

````vue
<script>
export default {
  data() {
    return {
      state: 'pending'
    }
  },
  beforeRouteEnter(to, from, next) {
    // 네비게이션 승인 후 state를 업데이트
    next((vm) => (vm.state = 'approved'));
  }
}
</script>
````


#### beforeRouteUpdate
`beforeRouteUpdate`는 동일한 컴포넌트를 사용하지만 페이지 주소가 바뀔 경우 호출됩니다. 동적 라우팅을 통해서 페이지의 주소만 바뀌고 같은 컴포넌트를 재활용하는 경우를 예로 들 수 있습니다.

````js
new VueRouter({
  routes: [{ path: '/foo/:id', component: Foo }],
})
````

**현재 URL : /foo/1**

````vue
<script>
export default {
  beforeRouteUpdate(to, from, next) {
    console.log(this.$route.params.id);  // 1
    next();
  },
  methods: {
    moveToNext() {
      // 페이지를 이동하기 전에 beforeRouteUpdate를 호출합니다.
      this.$router.push('/foo/2');
    }
  }
}
</script>
````


#### beforeRouteLeave
`beforeRouteLeave`는 해당 컴포넌트를 벗어나 새로운 펭지로 이동할 때 호출됩니다. 보통 사용자가 변경사항을 저장하지 않고 갑작스럽게 사이트를 벗어난 경우 사용됩니다. next(false)로 페이지 이동을 막을 수 있습니다.

````js
beforeRouteLeave(to, from, next) {
  const answer = window.confirm('사이트에서 나가시겠습니까? 변경사항이 저장되지 않을 수 있습니다.');
  if (answer) {
    next()
  } else {
    next(false)
  }
}
````

## 네비게이션 가드 호출 순서 (flow)

1. 비활성화 되는 컴포넌트에서 `beforeRouteLeave` 호출
2. 전역 가드 `beforeEach` 호출
3. 재사용되는 컴포넌트라면 `beforeRouteUpdate` 호출
4. 지역 가드 `beforeEnter` 호출
5. 활성화 되는 컴포넌트에서 `beforeRouteEnter` 호출
6. `beforeRouteEnter`의 next에 넘겨준 콜백 호출

## 네비게이션 가드로 인증 정보 확인

네비게이션 가드가 가장 많이 쓰이는 곳은 사용자 인증 정보에 따라 접근을 막는 로직입니다.

````js
router.beforeEach( function(to, from, next) {
  // to: 이동 url에 해당하는 라우팅 객체
  if(
    to.matched.some(function(routeInfo) {
      return routeInfo.meta.authRequired;
    })
  ) {
    // 이동 할 페이지에 인증 정보가 필요하면 경고 창을 띄우고 페이지 전환은 하지 않음
    alert('Login Please!');
  } else {
    console.log(`routing success: '${to.path}'`);
    next();  // 페이지 전환
  }
});
````

---

<br>

##### 참고

- [캡틴판교 \| Cracking Vue.js \| Navigation Guard](https://joshua1988.github.io/vue-camp/advanced/navigation-guard.html)
- [캡틴판교 \| 라우터 네비게이션 가드 알아보기](https://joshua1988.github.io/web-development/vuejs/vue-router-navigation-guards/)
