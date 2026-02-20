---
title: "[CSS] backdrop-filter"
date: 2024-04-25 15:40:00 +0900
categories: [CSS, CSS-basic]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## backdrop-filter

해당 요소에 블러 처리되는 `filter: blur()`와 달리 요소의 배경 영역에 블러 처리가 된다.

`backdrop-filter` CSS 속성을 사용 하면 요소 뒤 배경 영역에 흐림이나 색상 변경과 같은 그래픽 효과를 적용할 수 있다. 이는 요소 뒤에 있는 모든 것에 적용되므로 효과를 보려면 요소나 배경이 투명하거나 부분적으로 투명해야 한다.

사파리 에서는 vender prefix와 함께 사용해야 한다. `-webkit-backdrop-filter`

<iframe height="300" style="width: 100%;" scrolling="no" title="[css]backdrop-filter3" src="https://codepen.io/miok-song/embed/vYwBYyK?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/miok-song/pen/vYwBYyK">
  [css]backdrop-filter3</a> by miok song (<a href="https://codepen.io/miok-song">@miok-song</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>


### Syntax

````css
/* Keyword value */
backdrop-filter: none;

/* URL to SVG filter */
backdrop-filter: url(commonfilters.svg#filter);

/* <filter-function> values */
backdrop-filter: blur(2px);
backdrop-filter: brightness(60%);
backdrop-filter: contrast(40%);
backdrop-filter: drop-shadow(4px 4px 10px blue);
backdrop-filter: grayscale(30%);
backdrop-filter: hue-rotate(120deg);
backdrop-filter: invert(70%);
backdrop-filter: opacity(20%);
backdrop-filter: sepia(90%);
backdrop-filter: saturate(80%);

/* Multiple filters */
backdrop-filter: url(filters.svg#filter) blur(4px) saturate(150%);

/* Global values */
backdrop-filter: inherit;
backdrop-filter: initial;
backdrop-filter: revert;
backdrop-filter: revert-layer;
backdrop-filter: unset;
````

---

<br>

##### 참고

- [\[CSS\] backdrop-filter로 배경에 효과주기](https://shynaunum.tistory.com/38)
- [MDN \| backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter)
- [backdrop-filter \| CSS-Tricks](https://css-tricks.com/almanac/properties/b/backdrop-filter/)
- [backdrop-filter가 사파리에서 작동 안해요!!](https://lemongreen.tistory.com/11)
