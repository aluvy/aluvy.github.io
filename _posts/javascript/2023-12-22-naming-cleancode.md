---
title: "[JavaScript] 네이밍(Naming)과 클린 코드(Clean Code)"
date: 2023-12-22 13:33:00 +0900
categories: [JavaScript]
tags: []
render_with_liquid: false
math: true
mermaid: true
---


## Naming Convention

### 1-1. 기본사항
변수명은 자체 설명적이어야 함   
JavaScript에서는 camelCase, PascalCase를 사용

````javascript
// bad
const value = 'Robin';
const val = 'Robin';

// good
const firstName = 'Robin';
````

### 1-2. Components, Class, 생성자 함수
컴포넌트, 클래스, 생성자 함수는 PascalCase를 사용

````javascript
class UserProfile{
  ...
}

function UserProfile(name, year){
  this.name = name;
  this.year = year;
}
````

### 1-3. Arrays
변수 이름에 복수, 단수 표현하기

````javascript
// bad
const fruit = ['apple', 'banana', 'cucumber'];
// okay
const fruitArr = ['apple', 'banana', 'cucumber'];
// good
const fruits = ['apple', 'banana', 'cucumber'];

// great
const fruitNames = ['apple', 'banana', 'cucumber'];
const fruits = [
  { name: 'apple', genus: 'malus' },
  { name: 'banana', genus: 'musa' },
  { name: 'cucumber', genus: 'cucumis' },
];
````

### 1-4. Booleans
is, has, can 으로 시작하여 변수의 타입을 암시하기

````javascript
// bad
const open = true;
const write = true;
const fruit = true;
const equal = true;
const visible = true;

// good
const isOpen = true;
const canWrite = true;
const hasFruit = true;
const areEqual = true;
const isVisible = true;
````

#### 만약 함수의 return 값이 boolean이라면?
함수명을 check나 get으로 시작하기

````javascript
const user = { fruits: ['apple'] };
const checkHasFruit = (user, fruitName) => user.fruits.includes(fruitName);
const hasFruit = checkHasFruit(user, 'apple');

checkTodoData();
````

### 1-5. Numbers
변수명에 maximun, minimum, total 포함하기

````javascript
// bad
const pugs = 3;

// good
const minPugs = 1;
const maxPugs = 5;
const totalPugs = 3;
````

### 1-6. Functions
동사를 사용하여 명명하기

````javascript
// bad
userData(userId);
userDataFunc(userId);
totalOfItems(items);
elementValidator(elements);

// good
getUser(userId);
calculateTotal(items);
validateElement(elements);
````

to를 앞에 명명하는 것은 오래된 컨벤션

````javascript
toDollars('euros', 20);
toUppercase('a string');
````

반복문 안에서의 변수는 단수형을 사용하기

````javascript
// bad
const newFruits = fruits.map(x => {
  return doSomething(x);
});

// good
const newFruits = fruits.map(fruit => {
  return doSomething(fruit);
});
````

### 1-7. Constant
대문자에_를 사용

````javascript
var SECONDS = 60;
var MINUTES = 60;
var HOURS = 24;
var DAY = SECONDS * MINUTES * HOURS;
var DAYS_UNTIL_TOMORROW = 1;
````




## Clean Code

### 2-1. Object Loopup table
다수의 switch-case 문은 JSON으로 table화 하기

**BAD**

````javascript
function getUserType(type) {
  switch (key) {
    case 'ADMIN':
      return '관리자';
    case 'INSTRUCTOR':
      return '강사';
    case 'STUDENT':
      return '학생';
    default:
      return '해당 없음';
  }
}
````

**GOOD**

````javascript
function getUserType(type) {
  const USER_TYPE = {
    ADMIN: '관리자',
    INSTRUCTOR: '강사',
    STUDENT: '수강생',
  };

  return USER_TYPE[type] || '해당 없음';
}
````

### 2-2. 긍정 우선 코드
**BAD**

````javascript
if(!(typeof data === 'string')){ ... }
````

### 2-3. 조건문엔 함수 사용하기
어떤 연산을 위한 조건문인지 알아보기 쉬움

**BAD**

````javascript
if(n % 1 === 0) { ... }
````

**GOOD**

````javascript
if(isInt(n)) { ... }
````

### 2-4. 중첩 사용 지양하기

**BAD**

````javascript
for (let i = range - 1; i < d.length; i++) {
  let sum = 0;
  for (let j = i - range + 1; j <= i; j++) {
    sum += d[j];
  }
  result.push(sum);
}
````

**GOOD**

````javascript
for(let i=0; i<range; i++) {
	sum += d[i];
}

for(let k 1-i; j < d.length; j++) {
	if(j === (range-1)) {
		console.log(sum);
		continue;
	}
	let start = j - range;
	sum += d[j] - d[start];
	console.log(sum);
}
````

### 2-5. 복잡한 것 숨기기

**BAD**

````javascript
const validEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9+\.)+[a-zA-z]{2,}))$/.test(
    str,
  );
````

**GOOD**

````javascript
const validEmail = isValidEmail(eMail);
````

### 2-6. Short circuiting 대신 default parameters 사용
주의할 것은 undefined만 default parameter가 적용됩니다. 즉, falsy 값인 '', "", false, null, 0, NaN은 default value로 대체되지 않습니다.

**BAD**

````javascript
function createMicrobrewery(name) {
  const breweryName = name || 'Hipster Brew Co.';
  // ...
}
````

**GOOD**

````javascript
function createMicrobrewery(name = 'Hipster Brew Co.') {
  // ...
}
````

### 2-7. function parameters는 2개로 제한하기

**BAD**

````javascript
function createMenu(title, body, buttonText, cancellable) {
  // ...
}

createMenu('Foo', 'Bar', 'Baz', true);
````

**GOOD**

````javascript
function createMenu({ title, body, buttonText, cancellable }) {
  // ...
}

createMenu({
  title: 'Foo',
  body: 'Bar',
  buttonText: 'Baz',
  cancellable: true,
});
````

### 2-8. 함수는 한 가지 일만 수행하기

**BAD**

````javascript
function emailClients(clients) {
  clients.forEach(client => {
    const clientRecord = database.lookup(client);
    if (clientRecord.isActive()) {
      email(client);
    }
  });
}
````

**GOOD**

````javascript
function emailActiveClients(clients) {
  clients.filter(isActiveClient).forEach(email);
}

function isActiveClient(client) {
  const clientRecord = database.lookup(client);
  return clientRecord.isActive();
}
````

## 2-9. 함수는 하나의 개념으로 추상화 하기

**BAD**

````javascript
function parseBetterJSAlternative(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(' ');
  const tokens = [];
  REGEXES.forEach(REGEX => {
    statements.forEach(statement => {
      // ...
    });
  });

  const ast = [];
  tokens.forEach(token => {
    // lex...
  });

  ast.forEach(node => {
    // parse...
  });
}
````

**GOOD**

````javascript
function parseBetterJSAlternative(code) {
  const tokens = tokenize(code);
  const syntaxTree = parse(tokens);
  syntaxTree.forEach(node => {
    // parse...
  });
}

function tokenize(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(' ');
  const tokens = [];
  REGEXES.forEach(REGEX => {
    statements.forEach(statement => {
      tokens.push(/* ... */);
    });
  });

  return tokens;
}

function parse(tokens) {
  const syntaxTree = [];
  tokens.forEach(token => {
    syntaxTree.push(/* ... */);
  });

  return syntaxTree;
}
````

### 2-10. Object.assign으로 object default value 설정

**BAD**

````javascript
const menuConfig = {
  title: null,
  body: 'Bar',
  buttonText: null,
  cancellable: true,
};

function createMenu(config) {
  config.title = config.title || 'Foo';
  config.body = config.body || 'Bar';
  config.buttonText = config.buttonText || 'Baz';
  config.cancellable =
    config.cancellable !== undefined ? config.cancellable : true;
}

createMenu(menuConfig);
````

**GOOD**

````javascript
const menuConfig = {
  title: 'Order',
  // User did not include 'body' key
  buttonText: 'Send',
  cancellable: true,
};

function createMenu(config) {
  let finalConfig = Object.assign(
    {
      title: 'Foo',
      body: 'Bar',
      buttonText: 'Baz',
      cancellable: true,
    },
    config,
  );
  return finalConfig;
  // config now equals: {title: "Order", body: "Bar", buttonText: "Send", cancellable: true}
  // ...
}

createMenu(menuConfig);
````

### 2-11. flag를 함수의 매개변수로 사용하지 말기

**BAD**

````javascript
function createFile(name, temp) {
  if (temp) {
    fs.create(`./temp/${name}`);
  } else {
    fs.create(name);
  }
}
````

**GOOD**

````javascript
function createFile(name) {
  fs.create(name);
}

function createTempFile(name) {
  createFile(`./temp/${name}`);
}
````

### 2-12. 조건문 캡슐화

**BAD**

````javascript
if (fsm.state === 'fetching' && isEmpty(listNode)) {
  // ...
}
````

**GOOD**

````javascript
function shouldShowSpinner(fsm, listNode) {
  return fsm.state === 'fetching' && isEmpty(listNode);
}

if (shouldShowSpinner(fsmInstance, listNodeInstance)) {
  // ...
}
````

### 2-13. 에러 무시하지 말기

**BAD**

````javascript
try {
  functionThatMightThrow();
} catch (error) {
  console.log(error);
}
````

**GOOD**

````javascript
try {
  functionThatMightThrow();
} catch (error) {
  // One option (more noisy than console.log):
  console.error(error);
  // Another option:
  notifyUserOfError(error);
  // Another option:
  reportErrorToService(error);
  // OR do all three!
}
````

### 2-14. 에러를 catch 하기

**BAD**

````javascript
getdata()
  .then(data => {
    functionThatMightThrow(data);
  })
  .catch(error => {
    console.log(error);
  });
````

**GOOD**

````javascript
getdata()
  .then(data => {
    functionThatMightThrow(data);
  })
  .catch(error => {
    // One option (more noisy than console.log):
    console.error(error);
    // Another option:
    notifyUserOfError(error);
    // Another option:
    reportErrorToService(error);
    // OR do all three!
  });
````

### 2-15. 함수 호출자와 피호출자는 가까이 두기

**BAD**

````javascript
class PerformanceReview {
  constructor(employee) {
    this.employee = employee;
  }

  lookupPeers() {
    return db.lookup(this.employee, 'peers');
  }

  lookupManager() {
    return db.lookup(this.employee, 'manager');
  }

  getPeerReviews() {
    const peers = this.lookupPeers();
    // ...
  }

  perfReview() {
    this.getPeerReviews();
    this.getManagerReview();
    this.getSelfReview();
  }

  getManagerReview() {
    const manager = this.lookupManager();
  }

  getSelfReview() {
    // ...
  }
}

const review = new PerformanceReview(employee);
review.perfReview();
````

**GOOD**

````javascript
class PerformanceReview {
  constructor(employee) {
    this.employee = employee;
  }

  perfReview() {
    this.getPeerReviews();
    this.getManagerReview();
    this.getSelfReview();
  }

  getPeerReviews() {
    const peers = this.lookupPeers();
    // ...
  }

  lookupPeers() {
    return db.lookup(this.employee, 'peers');
  }

  getManagerReview() {
    const manager = this.lookupManager();
  }

  lookupManager() {
    return db.lookup(this.employee, 'manager');
  }

  getSelfReview() {
    // ...
  }
}

const review = new PerformanceReview(employee);
review.perfReview();
````
