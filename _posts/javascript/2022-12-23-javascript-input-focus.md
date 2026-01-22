---
title: "[JavaScript] input 글자수 입력 후 다음 칸에 focus"
date: 2022-12-23 13:46:00 +0900
categories: [JavaScript]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

input maxlength 값 만큼 입력 후 다음 input에 자동으로 focusing 된다.   
카드번호 입력, 비밀번호 1글자씩 입력 등에 사용된다.
````html
<form class="">
  <div class="form__group">
    <div class="form__item">
      <label>카드번호</label>
      <div class="form__item-input flex">
        <div class="form__item-hasbtn w20">
          <input type="text" class="wfull section__joincard_1" pattern="[0-9]*" inputmode="numeric" placeholder="입력해주세요" autocomplete="off" maxlength="4">
          <a href="#" class="clear-text inp-del">취소</a>
        </div>
        <div class="form__item-hasbtn w20">
          <input type="text" class="wfull section__joincard_2" pattern="[0-9]*" inputmode="numeric" placeholder="입력해주세요" autocomplete="off" maxlength="4">
          <a href="#" class="clear-text inp-del">취소</a>
        </div>
        <div class="form__item-hasbtn w20">
          <input type="text" class="wfull section__joincard_3" pattern="[0-9]*" inputmode="numeric" placeholder="입력해주세요" autocomplete="off" maxlength="4">
          <a href="#" class="clear-text inp-del">취소</a>
        </div>
        <div class="form__item-hasbtn w20">
          <input type="text" class="wfull section__joincard_4" pattern="[0-9]*" inputmode="numeric" placeholder="입력해주세요" autocomplete="off" maxlength="4">
          <a href="#" class="clear-text inp-del">취소</a>
        </div>
      </div>
    </div>
    <div class="form__item">
      <label>유효기간</label>
      <div class="form__item-input">
        <div class="form__item-hasbtn">
          <input type="text" class="wfull section__joincard_5" placeholder="입력해주세요" autocomplete="off">
          <a href="#" class="clear-text inp-del">취소</a>
        </div>
      </div>
    </div>
  </div>
</form>
````

````javascript
$(".section__joincard .form__item-input.flex input").keyup (function () {
  var charLimit = $(this).attr("maxlength");
  if (this.value.length >= charLimit) {
    $(this).parent().next().find('input').focus();
    return false;
  }
});
````
