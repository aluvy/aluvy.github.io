---
title: "input[type='number'] 화살표 및 키보드 막기"
date: 2022-05-18 11:38:00 +0900
categories: [CSS, CSS-basic]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

````css
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
````

````javascript
// input[type="number"] 키보드 막기
$( function(){
  $("input[type='number']").on('keydown', function(e){
    if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58) 
      || e.keyCode == 8)) {

      return false;
    }
  });
});
````
