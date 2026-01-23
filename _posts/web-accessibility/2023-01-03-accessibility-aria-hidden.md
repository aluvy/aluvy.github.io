---
title: "[Accessibility] WAI-ARIA 접근성: aria-hidden"
date: 2023-01-03 23:29:00 +0900
categories: [Web Accessibility]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

숨김 제목과 같이 일부 컨텐츠를 숨길 필요가 있다. 컨텐츠를 숨기는 방법으로는 CSS를 활용해 display:none, visibility:hidden을 활용할 수 있다.   
이러한 기술은 웹 페이지에서 보이지 않을 뿐만 아니라 스크린 리더와 같은 보조 기술로도 탐색이 불가능하다.

## aria-hidden
aria-hidden은 스크린 리더와 같은 보조 기술을 사용하는 사용자를 대상으로 콘텐츠의 탐색을 제한합니다.   
aria-hidden이 "true"로 설정되면, 스크린 리더로 해당 컨텐츠를 가상 커서로 탐색할 수 없습니다.

> - 스크린리더(보조기기)가 접근하는 것은 원치 않지만, 시각적으로 디자인을 주기 위해서 보여지게 하고 싶은 경우에 사용
> - div팝업을 띄울 때 팝업에 초점맞추기 위해 사용
{: .prompt-tip}

## aria-hidden 사용법
aria-hidden은 키보드 및 마우스 사용자 등과 같은 모든 사용자를 대상으로 컨텐츠를 숨기는 방법이 아니므로, 사용에 주의해야 합니다.   
또한 링크, 버튼과 같이 초점을 받을 수 있는 요소를 aria-hidden으로 숨긴 경우   
키보드 또는 마우스 사용자가 해당 컨트롤에 초점이 제공되어 탐색에 혼란이 있을 수 있으므로 **컨트롤에 대한 초점을 제거**해야 합니다.

### aria-hidden="true"
스크린 리더와 같은 보조기술 사용자의 컨텐츠 탐색을 제한합니다.   
aria-hidden이 "true"로 설정된 컨텐츠는 스크린 리더의 가장 커서에서 탐색되지 않습니다.   
ul, table과 같이 하위 요소를 포함할 수 있는 요소에 aria-hidden 을 "true"로 설정하면 하위 요소까지 숨길 수 있습니다.

### aria-hidden="false"
접근성 API가 스크린 리더와 같은 보조기술 사용자에게 숨겨진 콘텐츠를 노출하여 콘텐츠를 탐색할 수 있습니다.

---
<br>

##### 참고

- [\[HTML\] WAI-ARIA : aria-hidden](https://y00eunji.tistory.com/entry/HTML-WAI-ARIA-aria-hidden#2.%20aria-hidden)

