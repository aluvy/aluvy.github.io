---
title: "[이슈][CSS] 사파리 overflow:hidden + border-radius 관련 이슈 해결법"
date: 2023-09-08 15:18:00 +0900
categories: [CSS]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

사파리의 렌더링 엔진 Webkit의 버그

## 해결법

````css
.box {
  border-radius: 1.2rem;
  overflow: hidden;
  isolation: isolate;
}
````

---
<br>

##### 참고

- [사파리 overflow:hidden + border-radius 관련 이슈 해결법](https://www.sungikchoi.com/blog/safari-overflow-border-radius/)
