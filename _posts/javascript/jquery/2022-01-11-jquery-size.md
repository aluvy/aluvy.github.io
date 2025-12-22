---
title: "[jQuery] 영역의 크기 메소드"
date: 2022-01-11 20:17:00 +0900
categories: [JavaScript, jQuery]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## 영역의 크기

페이지 내의 모든 사각형 영역의 너비와 높이를 알아내거나 수정할 때 사용한다.

### 영역의 크기를 가져오거나 설정하는 메소드

- `.height()`: 영역의 높이를 리턴한다. (바깥 여백, 테두리, 안쪽 여백 X)
- `.width()`: 영역의 너비를 리턴한다. (바깥 여백, 테두리, 안쪽 여백 X)


- `.innerHeight()`: 영역의 높이에 안쪽 여백을 더한 값을 리턴한다.
- `.innerWidth()`: 영역의 너비에 안쪽 여백을 더한 값을 리턴한다.
- `.outerHeight()`: 영역의 높이에 안쪽 여백과 테두리 두께를 더한 값을 리턴한다.
- `.outerWidth()`: 영역의 너비에 안쪽 여백과 테두리 뚜께를 더한 값을 리턴한다.
- `.outerHeight(true)`: 영역의 높이에 안쪽 여백과 테두리 두께, 바깥 여백을 더한 값을 리턴한다.
- `.outerWidth(true)`: 영역의 높이에 안쪽 여백과 테두리 두께, 바깥 여백을 더한 값을 리턴한다.

![영역의 크기](/assets/images/posts/2022/0111/size-1.png)


<hr>

## 창과 페이지의 크기

`.height()`와 `.width()` 메소드는 브라우저 창과 HTML 문서의 크기를 알아낼 때도 사용할 수 있다. 또한 스크롤바의 위치를 가져오거나 지정하는 메소드들도 제공된다.

- `.height()`: jQuery 객체집합의 높이를 가져온다.
- `.width()`: jQuery 객체 집합의 너비를 가져온다.
- `.scrollLeft()`: jQuery 객체집합 내 첫 번째 아이템의 수평 스크롤 위치를 가져오거나 전체 노드의 수평 스크롤 위치를 지정한다.
- `.scrollTop()`: jQuery 객체 집합 내 첫 번째 아이템의 수직 스크롤 위치를 가져오거나 전체 노드의 수직 스크롤 위치를 지정한다.

![창과 페이지의 크기](/assets/images/posts/2022/0111/size-2.png)


<hr>
<br>

##### 참고

- [jQuery 입문 > 요소의 영역 > 요소의 크기 .width() .height()](https://www.devkuma.com/docs/jquery/%EC%9A%94%EC%86%8C%EC%9D%98-%ED%81%AC%EA%B8%B0-width-height/)
