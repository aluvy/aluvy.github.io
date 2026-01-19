---
title: "마우스 커서 변경하기"
date: 2022-11-18 18:14:00 +0900
categories: [CSS]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## 이미지를 마우스 커서로 사용하기
CSS 커서 속성을 이용해 이미지 파일을 마우스 커서로 설정해서 사용할 수 있다.

> cursor: url('주소'), 속성값;
{: .prompt-tip}

커서 속성 값url 중 마지막에 "auto" 속성 값은 비트맵 이미지 커서를 가져올 수 없는 경우 최종적으로 적용하는 커서 속성값이다.   
커서 속성값은 쉼표로 구분해서 여러 개를 나열할 수 있으며, 왼쪽부터 순서대로 적용 가능한 커서 속성 값을 우선 적용한다.

````css
body { cursor: url('/resources/assets/images/icon/arrow_cusor_1.cur'), pointer;}
````



## 이모지를 마우스 커서로 사용하기
비트맵 이미지를 직접 만들어 사용하는 것 보다 이모지를 사용하면 조금 더 간편하게 마우스 커서를 변경할 수 있다.   
사용하고 싶은 이모지 아이콘을 복사하여 편집기에 붙여 넣으면 완성   
svg 포맷을 이용해 적용한다.
````css
body { 
  cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>🤖</text></svg>") 16 0, auto;
}
````



---
<br>

##### 참고

- [이모지](https://getemoji.com/)


> IE에서는 지원하지 않는다.
{: .prompt-danger}
