---
title: "[이슈] ios mobile fix item + keypad 이슈"
date: 2023-04-06 22:36:00 +0900
categories: [WEB]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

ios mobile에 키패드 이슈   
모바일 기기에서 input에 focus 되었을 때 가상 키패드가 올라오게되는데,   
OS에 따라 키패드가 올라왔을때의 영역이 다르게 동작해서 크로스브라우징 이슈가 있었다.

ios에서 상단 fixed 헤더가 위로 밀려버리는 문제가 발생했다.   
헤더가 위로 밀려버리는 현상 자체를 해결할순 없었고,   
키패드가 올라왔을때 스크롤이 되지않게 input blur를 해주는 방향으로 작업되었다.

우선 모바일일 때 body에 mobile 클래스를 넣어준 후   
키보드가 올라올만한 input에 focus 시 keyboard-on 클래스를 body에 추가해줬다.   
그리고 그 상태에서 input이 아닌 다른곳을 터치하게 되면 input에 focus를 blur처리해줬다.   
모달팝업 내에 가상키패드도 문제였기 때문에 scroll이벤트로 걸지 않았다.

````javascript
const isKeyboard = function(e){
  if( !$("body").hasClass("mobile") ) return;     // 모바일이 아닐 때 예외처리

  let target = "input[type=text], input[type=date], input[type=number], input[type=password], input[type=email], input[type=tel], input[type=url], input[type=search], textarea";

  $(document).on("focus", target, function(e){
    let elem = $(e.target);
    if ( elem.prop("readonly")
      || elem.prop("disabled")
      || elem.hasClass("readonly")
      || elem.hasClass("disabled")
      || elem.hasClass("nppfs-npv")
    ) return;  // readonly, disabled 예외처리

    $("body").addClass("keyboard-on");
    $(window).resize();     // resize 이벤트 추가
  });

  $(document).on("blur", target, function(){
    $("body").removeClass("keyboard-on");
    $(window).resize();     // resize 이벤트 추가
  });
}
````

````javascript
// ios keyboard open && touch event
$(window).on("touchstart", function(e){
  if ($("body").hasClass("ios")
    && $("body").hasClass("keyboard-on")
    && $(document).find(":focus").parents(".layer_wrap").length > 0
  ){
    let result = isInputTouch(e.target);    // false를 반환했을 때 blur처리
    if (!result) $(document).find(":focus").blur();
  }
})


/**
 * @param {*} target element 
 * @returns 터치영역의 target을 체크하여 false를 반환하면 :focus blur 처리된다.
 */
const isInputTouch = function(target){
  let result = false;

  const isFormItem = $(target).parents(".form_item").length > 0;  // form_item 영역을 touch 했는지 체크
  if (!isFormItem) return false;

  const btnClear = $(target).hasClass("btn_clear");   // btn_clear를 touch했을때 return false
  if (btnClear) return true;

  let inputType = ["text", "date", "number", "password", "email", "tel", "url", "search", "textarea"];
  let check = [];

  const isInput = target.nodeName == "INPUT";     // target이 INPUT tag 인지 체크
  if (isInput) check = inputType.filter((item, idx)=> $(target).attr("type") == item );
  else check = inputType.filter((item, idx)=> $(target).find(`input[type=${item}]`).length > 0 );

  if (check.length > 0) result = true;

  return result;
}
````


---

<br>

##### 참고

- [\[이슈\] Fixed DOM과 가상 키보드](https://nuhends.tistory.com/2)
- [\[IOS\] WebView 키보드(키패드) 영역 문제](https://goddaehee.tistory.com/279)
