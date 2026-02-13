---
title: "[CSS] iPhone overscroll, user-scale 제어"
date: 2023-10-04 14:52:00 +0900
categories: [CSS]
tags: []
render_with_liquid: false
math: true
mermaid: true
---


css

````css
*,
*:before,
*:after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: none;
  -webkit-tap-highlight-color: transparent !important;
  -webkit-text-size-adjust: none;
  -moz-text-size-adjust: none;
  -ms-text-size-adjust: none;
  overscroll-behavior-y: none;
  touch-action: pan-x pan -y;
}
````
