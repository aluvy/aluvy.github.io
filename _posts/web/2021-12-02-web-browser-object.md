---
title: "BOM, DOM Object Model"
date: 2021-12-02 22:20:00 +0900
categories: [WEB]
tags: [browser object model, bom, document object model, dom]
render_with_liquid: false
math: true
mermaid: true
---

## 브라우저 객체 모델 (Browser Object Model : BOM)

실제 우리가 사용하고 있는 브라우저와 관련된 객체의 집합이다.

대표적으로 window(최상위 객체), location, navigator, history, screen, document 객체가 있다.

![window 객체 구조도](/assets/images/posts/2021/1202/bom.png){: width="450"}
_window 객체 구조도_

- **location Object**: 웹 링크, url에 관련된 객체
- **navigatior Object**: 브라우저의 탑재 메뉴들 관장
- **history Object**: 히스토리 관장
- **screen Object**: 윈도우 창, 사이즈 관장 (반응형 웹 관련)


### window 객체

- 브라우저의 내장 객체 중 최상위 객체
- 모든 전역 객체, 함수, 변수는 자동적으로 window 객체에 속함
- 모든 전역 변수는 window 객체의 속성이 됨
- 모든 전역 함수는 window 객체의 메서드가 됨
- window를 생략한 형태로 window객체와 메서드 사용 가능
- 적용하기 위한 공식적인 웹표준은 없느나, 주로 브라우저들에서 지원되고 있음.

### screen 객체

- 윈도우의 사이즈를 핸들링한다.
- 운영체제의 화면에 대한 정보를 가지고 있는 객체
- window 객체의 한 부분으로써 window,screen 속성을 통해 접근 (window는 생략 가능)
- 방문자의 화면을 고려해 적당한 사이즈의 팝업창을 제공 가능

### location 객체

- 현재 URL에 대한 정보를 가지고 있는 객체
- window 객체의 한 부분으로써 window.location 속성을 통해 접근 (window는 생략 가능)
- a 태그를 대신해 사용할 수 있다.

### navigator 객체

- 웹 문서를 실행하고 있는 브라우저에 대한 정보를 가지고 있는 객체
- window 객체의 한 부분으로써 window.navigator 속성을 통해 접근 (window는 생략 가능)


### history 객체

- 브라우저의 방문 기록(history)에 대한 정보를 가지고 있는 객체
- window 객체의 한 부분으로써 window.history 속성을 통해 접근 (window는 생략 가능)
- 사용자들의 사생활을 보호하기 위해, JavaScript를 통해 접근하는데 제한이 있음


<br>

<hr>


## 문서 객체 모델 (Document Object Model : DOM)

태그의 계층이라고 생각하면 된다.   
화면에서 일어나는 어떤 계층적인 태그의 구조

 - 문서에 접근하기 위한 표준으로, W3C (world wide web consortium)에서 정의
- core DOM, XML, HTML DOM으로 나뉘어짐
- 웹 문서를 로드할 때, 브라우저는 구성 요소들을 객체화하여 트리 구조의 DOM을 생성
- HTML DOM은 HTML 구성요소들을 획득, 변경, 추가, 삭제하기 위한 표준
- HTML 문서를 브라우저에서 로드 시 각 구성요소들을 객체화하여 객체 드리 구조를 나타냄

![DOM](/assets/images/posts/2021/1202/dom.png){: width="450"}


### document 객체

- HTML 문서와 관련있는 객체
- window 객체의 한 부분으로써 window.documet 속성을 통해 접근 (window는 생략 가능)
- 좁은 의미의 문서 객체 모델 : document 객체와 관련된 객체의 집합
- 로드된 문서에 단 하나의 document 객체 존재
- HTML 문서 객체 접근의 시발점

> 사용할 때 계산순서가 중요한데, html을 전부 로드한 후에 계산되어야 한다.
{: .prompt-tip}
