---
title: "오픈그래프(open graph)"
date: 2025-12-02 08:12:00 +0900
categories: [ETC]
tags: [open graph, og]
render_with_liquid: false
math: true
mermaid: true
---

## open graph 태그란?

- 페이스북이나 네이버 블로그, 카카오톡 등에서 링크를 공유하면 자동으로 링크에 대한 미리보기 제목, 설명, 이미지를 제공하게 되는데, 이를 제어할 수 있는 태그
- 오픈그래프 프로토콜은 페이스북에 의해서 처음 만들어 짐
- 오픈그래프는 HTML문서의 메타정보를 쉽게 표시하기 위해 만들어짐
- 메타정보에 해당하는 제목, 설명, 문서의 타입, 대표 URL등 다양한 요소들에 대해서 사람들이 통일하여 쓸 수 있도록 정의해 놓은 프로토콜임.

![open graph](/assets/images/posts/2025/1202/open-graph-1.png)

## open graph 작동원리

1. 사용자가 링크를 입력창에 입력
2. 페이스북, 네이버 블로그, 카카오톡은 입력창의 문자열이 '링크'라는 것을 파악함
3. 링크라는 것이 파악되면 페이스북, 네이버 블로그, 카카오톡의 크롤러는 미리 그 웹사이트를 방문해서 HTML head의 open graph 메타 데이터를 긁어옴
4. 이 중에서도 og:title, og:description, og:image 가 각각 제목, 설명, 이미지의 정보를 나타 냄
5. 그 정보를 바탕으로 미리보기 화면을 자동 생성하여 보여주게 됨

## 사용예제

**기본 사용예제**

````html
<meta property="og:type" content="website"><!-- 웹페이지 타입 (blog, website 등) -->
<meta property="og:title" content="컨텐츠제목">
<meta property="og:url" content="http://웹사이트주소">
<meta property="og:site_name" content="웹사이트 이름">
<meta property="og:description" content="웹사이트설명">
<meta property="og:image" content="표시되는 이미지 주소">
````

**트위터 미리보기 사용예제**

````html
<meta name="twitter:card" content="summary"><!-- 트위터 카드 타입(요약정보, 사진, 비디오) -->
<meta name="twitter:title" content="컨텐츠제목">
<meta name="twitter:description" content="웹사이트설명">
<meta name="twitter:image" content="표시되는 이미지 주소">
````

**모바일 앱 사용예제 - ios**

````html
<meta property="al:ios:url" content="ios 앱 URL">
<meta property="al:ios:app_store_id" content="ios 앱스토어 ID">
<meta property="al:ios:app_name" content="ios 앱 이름">
````

**모바일 앱 사용예제 - 안드로이드**

````html
<meta property="al:android:url" content="안드로이드 앱 URL">
<meta property="al:android:app_name" content="안드로이드 앱 이름">
<meta property="al:android:package" content="안드로이드 패키지 이름">
<meta property="al:web:url" content="안드로이드 앱 URL">
````

## 카카오톡 open graph 이미지 사이즈

다양한 이미지 사이즈를 실험해본 결과 같은 사이즈, 같은 확장자를 가져도 어떤 링크는 이미지가 짤리는 현상을 보였다. 카카오톡 가이드에 맞춰 만들었을때 가장 오류가 적었다.

**이미지 사이즈 800px * 800px**



## 카카오톡 open graph 미리보기 캐시 삭제

카카오톡에서 오픈그래프 사용시 캐시때문에 리셋이 되지 않는 경우가 있는데, 이때 kakao developers에서 강제로 리셋을 해줄 수 있다.
**kakao developers 사이트에 접속 > 로그인 > 도구 > 초기화도구**

> **카카오톡 개발자 사이트**   
> https://developers.kakao.com/tool/clear/og
{: .prompt-info}


<br>

#### 참고 사이트

[카톡 오픈그래프 메타태그 및 이미지 사이즈 & 캐시삭제](https://ddorang-d.tistory.com/31#google_vignette)
