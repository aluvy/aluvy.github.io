---
date: '2023-12-22 15:49:00 +0900'
title: 'getter & setter'
summary: 'getter와 setter는 객체 지향 프로그래밍에서 사용되는 개념이며, 일종의 메서드라고 보면 된다. 즉, 단어 그대로 getter는 객체의 속성(property) 값을 반환하는 메서드이며, setter는 객체의 속성 값을 설정, 변경하는 메서드라고 보면 된다. 예를 들어 user 라는 객체가 있을 경우,'
author: ['aluvy']
categories: ['JavaScript']
tags: ['']
thumbnail: ''
---


getter와 setter는 객체 지향 프로그래밍에서 사용되는 개념이며, 일종의 메서드라고 보면 된다.   
즉, 단어 그대로 getter는 객체의 속성(property) 값을 반환하는 메서드이며, setter는 객체의 속성 값을 설정, 변경하는 메서드라고 보면 된다.

예를 들어 user 라는 객체가 있을 경우, 보통이라면 user.name으로 프로퍼티로 바로 접근해서 이름값을 가져오거나 재설정 할 텐데

````javascript
const user = {
  name: 'inpa',
  age: 50
}

console.log(user.name); // inpa
user.name = 'tistory';
````

위와 같이 바로 접근하지 말고 getName(), setName() 메서드를 통해 경유해서 설정하도록 하는 기법이 바로 getter와 setter 개념이라고 보면 된다.

````javascript
const user = {
  name: 'inpa',
  age: 50,

  // 객체의 메서드(함수)
  getName() {
    return user.name;
  },
  setName(value) {
    user.name = value;
  }
}

console.log(user.getName()); // inpa
user.setName('tistory');Copy
````

## getter & setter 활용하기
두 방식은 결과적으로 목표하고자 하는 바는 같고 결과값도 같게 보일 수도 있다. 그러면 굳이 번거롭게 getter와 setter를 사용하는 이유는 뭘까?

getter와 setter를 사용하면 객체 내부 속성에 직접 접근하지 않아 객체의 **정보 은닉**을 가능하게 해주어 보안을 강화할 수 있고, 코드의 안정성과 유지보수성을 높일 수 있다는 장점이 있다. 또한 옳지 않은 값을 넣으려고 할 때 이를 미연에 방지할 수 있다.   
예를 들어 user.age 프로퍼티에 400이라는 나이값은 옳은 값이 아니니 할당하지 못하도록 해야 하는데, setter 메서드를 통해 경유하도록 설정하면 메서드 내에서 if문을 통해 값을 필터링 할 수 있게 된다.

````javascript
const user = {
  name: 'inpa',
  age: 50,

  getAge() {
    return user.age;
  },
  setAge(value) {
    // 만일 나이 값이 100 초과일 경우 바로 함수를 리턴해서 user.name이 재설정되지 않도록 필터링
    if(value > 100) {
      console.error('나이는 100을 초과할 수 없습니다.')
      return;
    }
    user.name = value;
  }
}

user.setAge(400); // 나이는 100을 초과할 수 없습니다.
````


## JavaScript getter & setter
getter와 setter는 이론적인 개념으로서 보통 위와 같이 get프로퍼티명(), set프로퍼티명() 형식으로 메서드 이름을 짓기로 약속해 사용하지만, ES6 JavaScript 부터는 getter와 setter를 간단하게 정의할 수 있는 문법이 별도로 추가되었다.

객체 리터럴 안에서 속성 이름 앞에 get 또는 set 키워드만 붙여 getter와 setter를 정의할 수 있게 된 것이다. 이 방법을 사용하면 getter와 setter 코드를 더욱 간결하고 가독성 있게 작성할 수 있다.

````javascript
const user = {
  name: 'inpa',
  age: 50,

  // userName() 메서드 왼쪽에 get, set 키워드만 붙이면 알아서 Getter, Setter 로서 동작된다
  get userName() {
    return user.name;
  },
  set userName(value) {
    user.name = value;
  }
}
````

그런데 이 때의 getter와 setter 은 함수 호출 형식이 아닌, 일반 프로퍼티처럼 접근해서 사용된다.

getter와 setter 메서드를 구현하면 객체엔 userName 이라는 가상의 프로퍼티가 생기는데, 가상의 프로퍼티는 읽고 쓸 순 있지만 실제로는 존재하지 않는 프로퍼티다.



## 접근자 프로퍼티
JavaScript의 객체 프로퍼티는 크게 두 종류로 나눌 수 있다.

- 데이터 프로퍼티 (data property)
- 접근자 프로퍼티 (accessor property)

데이터 프로퍼티는 객체 내부에 저장된 실제 데이터 값으로서 우리가 일반적인 프로퍼티라고 부르는 대상이고, 접근자 프로퍼티는 일반적인 프로퍼티와 달리 키(key)와 값(value)를 가지지 않고 getter와 setter라는 함수를 가지는 특수한 프로퍼티다.

즉, 자바스크립트 객체 속성에 접근하듯이 접근자 프로퍼티를 호출하면, 함수 호출 문법이 아니더라도 getter & setter 함수가 호출되는 것과 같은 것이다. 한마디로 getter와 setter 함수 자체가 접근자 프로퍼티라고 보면 된다.

````javascript
let person = {
  /* 데이터 프로퍼티 */
  firstName: "John",
  lastName: "Doe",
  
  /* 접근자 프로퍼티 */
  get fullName() {
    return this.firstName + " " + this.lastName;
  },
  set fullName(name) {
    let names = name.split(" ");
    this.firstName = names[0];
    this.lastName = names[1];
  }
};

console.log(person.firstName); // "Jane" 출력
console.log(person.lastName); // "Doe" 출력

console.log(person.fullName); // "John Doe" 출력
person.fullName = "Jane Doe"; // Setter 호출
````



## getter & setter 주의점

### getter만 선언할 시

만일 getter만 선언하고 setter는 선언하지 않았을 때, 아래 예시의 fullName 접근자 프로퍼티는 getter 메서드만 가지고 있기 때문에 값을 할당하려고 하면 에러가 발생하게 된다.

````javascript
let user = {
  get fullName() {
    return `...`;
  }
};

user.fullName = "Test"; // Error (프로퍼티에 getter 메서드만 있어서 에러가 발생합니다.)
````


### setter 무한 루프

만일 아래와 같이 데이터 프로퍼티명과 접근자 프로퍼티명 둘이 같을 경우 setter의 무한 루프에 빠져버리게 된다. 따라서 접근자 프로퍼티의 이름이 중복되도록 하면 안된다.

````javascript
let user = {
  name : 'inpa',

  get name() {
    return user.name;	
  },

  set name(value) {
    user.name = value;
  }
}

// user 객체의 name 프로퍼티 값을 변경
user.name = 'inpa2';
````

이러한 현상은 JavaScript의 언어적 특성이라 할 수 있다.   
그리고 무한 루프가 발생하는 이유는 setter 함수 내에서 자기 자신을 호출하였기 때문이다.

---
<br>

##### 참고

- [\[JS\] 📚 자바스크립트의 Getter & Setter 완벽 정리](https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-getter-setter-%EB%9E%80)

