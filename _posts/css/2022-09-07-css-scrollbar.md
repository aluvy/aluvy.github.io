---
title: "[CSS] scrollbar webkit"
date: 2022-09-07 12:03:00 +0900
categories: [CSS, CSS-basic]
tags: []
render_with_liquid: false
math: true
mermaid: true
---


````css
.sports_wide_right::-webkit-scrollbar{width:3px;}
.sports_wide_right::-webkit-scrollbar-thumb{width:30%; background:#ffc6c6; border-radius: 10px;}
.sports_wide_right::-webkit-scrollbar-track {background:var(--bgalphacolor1);}

body::-webkit-scrollbar{width:5px}
body::-webkit-scrollbar-thumb{height:30%;background:rgba(0,0,0,.4);border-radius:10px}
body::-webkit-scrollbar-track{background:rgba(33,122,244,.03)}
````
