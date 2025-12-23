---
title: "[CSS] 세로쓰기 모드 writing-mode, 글자 타이핑 효과"
date: 2022-03-18 12:44:00 +0900
categories: [CSS]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

![alt text](/assets/images/posts/2022/0318/writing-mode.png)

CSS 쓰기 모드는 텍스트가 가로 또는 세로로 표시되는지 여부를 나타냅니다. writing-mode (en-US) 속성을 사용하면 쓰기 모드에서 다른 쓰기 모드로 전환할 수 있습니다. 이를 위해 세로 쓰기 모드를 사용하는 언어로 작업할 필요는 없습니다 — 창의적 목적으로 레이아웃 일부의 쓰기 모드를 변경할 수도 있습니다.

아래 예에서는 writing-mode: vertical-rl 를 사용하여 표시되는 제목이 있습니다. 이제 텍스트가 세로로 나타납니다. 세로 텍스트는 그래픽 디자인에서 일반적이며, 웹 디자인에서 보다 흥미로운 모양과 느낌을 추가할 수 있습니다.

## Syntax

````css
/* Keyword values */
writing-mode: horizontal-tb;
writing-mode: vertical-rl;
writing-mode: vertical-lr;

/* Global values */
writing-mode: inherit;
writing-mode: initial;
writing-mode: revert;
writing-mode: unset;
````

- **horizontal-tb**
  - 콘텐츠를 수평적으로(왼쪽→오른쪽) 나열 후, 글자를 수직적으로(위→아래).

- **vertical-rl**
  - 콘텐츠를 수직적으로 (위→아래) 나열 후, 글자를 수평적으로(오른쪽→왼쪽) 써감. 
  - ※ 한글은 그대로 있고, 영문은 오른쪽으로 누움.

- **vertical-lr**
  - 콘텐츠를 수직적으로 (위→아래) 나열 후,  글자를 수평적으로 (왼쪽→오른쪽) 써감.
  - ※ 한글은 그대로 있고, 영문은 오른쪽으로 누움.


- [세로쓰기 모드를 이용한 글자 타이핑 효과 예제](/assets/images/posts/2022/0318/writing-mode.zip)


<hr>

#### 참고

- [mdn writing-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode)
- [mdn 텍스트 표시 방향 제어하기](https://developer.mozilla.org/ko/docs/Learn/CSS/Building_blocks/Handling_different_text_directions)
