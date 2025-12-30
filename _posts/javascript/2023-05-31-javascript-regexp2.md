---
title: "[JavaScript] 정규식을 이용한 input replace 유효성 체크"
date: 2023-05-31 08:50:00 +0900
categories: [JavaScript]
tags: []
render_with_liquid: false
math: true
mermaid: true
---


Javascript를 이용한 input value 유효성 검사 예제   
value 입력 시 다음 칸으로 focus() 된다


````html
<div class="input__wrap input__certy">
  <label for="">인증번호 4자리 입력</label>
  <input type="tel" maxlength="1" min="0" max="9" class="input__square" onlyNumber>
  <input type="tel" maxlength="1" min="0" max="9" class="input__square" onlyNumber>
  <input type="tel" maxlength="1" min="0" max="9" class="input__square" onlyNumber>
  <input type="tel" maxlength="1" min="0" max="9" class="input__square" onlyNumber>
  <span class="input__alert">잘못된 인증번호 입니다!</span>
</div>
````


````javascript
// signup
$(function(){
  $(document).on('keypress keyup keydown', 'input[onlyNumber]', function(e){
    if (/[a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g.test(this.value)) { //한글 막기
      e.preventDefault();
      this.value = '';
    } else if (e.which != 8 && e.which != 0 //영문 e막기
      && e.which < 48 || e.which > 57    //숫자키만 받기
      && e.which < 96 || e.which > 105) { //텐키 받기
      e.preventDefault();
      this.value = '';
    } else if (this.value.length >= this.maxLength) { //1자리 이상 입력되면 다음 input으로 이동시키기
      this.value = this.value.slice(0, this.maxLength);
      if ($(this).next('input').length > 0) {
        $(this).next().focus();
      } else {
        $(this).blur();
      }
    }
  });
});

// 아래걸로
// 숫자만 입력 가능
$(document).on('keypress keyup keydown', 'input[onlyNumber]', function(e){
  // console.log(e.which);
  if (/[a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g.test(this.value)) { //한글 막기
    e.preventDefault();
    this.value = '';
  } else if ( e.which != 8    //  backspace 허용
    && e.which != 0         // ??
    && e.which != 9     // Tab 허용
    && e.which != 116   // F5허용  //영문 e막기
    && e.which < 48 || e.which > 57    //숫자키 허용
    && e.which < 96 || e.which > 105) { //텐키 허용
    e.preventDefault();
    // this.value = '';
  }
});
````



기타 참고

````javascript
// 정규식
const regExpSpecial = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;   // 특수문자
const regExp_Special_comma = /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;   // 특수문자 (콤마허용)
const regExp_Special_dot = /[\{\}\[\]\/?,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;   // 특수문자 (.허용)
const regExpEmpty = /\s/g;   // 공백
const regExpNumber = /[0-9]/g;  // 숫자
const regExpEng = /[a-z|A-Z]/g; // 영어
const regExpKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;   // 한글
const regExpEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;   // 이메일
const regExpPhone2 = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;  // 핸드폰번호
const regExpTel = /^\d{2,3}-\d{3,4}-\d{4}$/;    // 일반번호
const regExpMoney = /\B(?=(\d{3})+(?!\d))/g;    // money
const regExpFee = /\B(?=(\d{3})+(?!\d))/g;

$(function(){
  // 자동완성 기능 제거
  $(document).find("input[onlyNumber], input[onlyCerty], input[onlyMoney], input[onlyTel], input[onlyNumber-password], input[onlyRate], input[onlyKor], input[onlyText], input[noGap]").attr("autocomplete", "off");

  // 숫자만 입력받기
  $(document).on("propertychange change keyup keypress keydown paste input", "input[onlyNumber]", function(e) {
    // if (regExpEmpty.test(this.value)         // 공백
    //   || regExpEng.test(this.value)          // 영어
    //   || regExpKor.test(this.value)          // 한글
    //   || regExpSpecial.test(this.value)) {   // 특문
    //   e.preventDefault();
    //   this.value = '';
    // }
    if ($(this).prop("readonly")) { return false; }
    if (this.value.length > $(this).attr("maxlength")) {
      this.value = this.value.slice(0, this.maxLength);
    }
    this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
  });
    
  // // 숫자만 입력받기 => 금액
  // $(document).on("keydown keypress keyup", "input[onlyMoney]", function(e){
  //   if (regExpEmpty.test(this.value)                // 공백
  //     || regExpEng.test(this.value)                 // 영어
  //     || regExpKor.test(this.value)                 // 한글
  //     || regExp_Special_comma.test(this.value)) {   // 특문(콤마허용)
  //     e.preventDefault();
  //     this.value = '';
  //   }
  //   let money = this.value;
  //   money = format_remove(money);
  //   this.value = Number(money).toLocaleString('ko-KR');
  // });
    
  // 숫자만 입력받기 => 금액
  $(document).on("propertychange change keyup keypress keydown paste input", "input[onlyMoney]", function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
    // if (regExpEmpty.test(this.value)                // 공백
    //   || regExpEng.test(this.value)                 // 영어
    //   || regExpKor.test(this.value)                 // 한글
    //   || regExp_Special_comma.test(this.value)) {   // 특문(콤마허용)
    //   e.preventDefault();
    //   this.value = '';
    // }
    let money = this.value;
    money = format_remove(money);
    this.value = Number(money).toLocaleString('ko-KR');
  });
    
  // 숫자만 입력받기 => 수수료 00.00
  $(document).on("propertychange change keyup keypress keydown paste input", "input[onlyRate]", function(e) {
    // this.value = this.value.replace(/[^0-9.]/g, '');
    this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    // this.value = this.value.replace(/[..]/g, '.')
    // this.value = this.value.replace(/[^0-9]/g, '');
    this.value = this.value.replace(/^(\d{1,2})(\d{2})$/, `$1.$2`);
  });
    
  // 숫자만 입력받기 => 전화번호
  $(document).on("propertychange change keyup keypress keydown paste input", "input[onlyTel]", function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
    this.value = this.value.replace(/^(\d{2,3})(\d{3,4})(\d{3,4})$/, `$1-$2-$3`);
  });

  // input[type="number"] 키보드 방향키 막기
  $(document).on("keydown keypress keyup", "input[type='number']", function(e) {
    if (!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58)
      || e.keyCode == 8
      || e.keyCode == 9
      || e.keyCode == 0)
      || /[a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g.test(this.value)) {   // 숫자만 입력, 한글 막기
      return false;
    }
  });
    
  // 한글
  $(document).on("propertychange change keyup keypress keydown paste input", "input[onlyKor]", function(e) {
    // if (regExpEmpty.test(this.value)            // 공백
    //   || regExpNumber.test(this.value)         // 숫자
    //   || regExpEng.test(this.value)            // 영어
    //   || regExpSpecial.test(this.value)) {     // 특문
    //   e.preventDefault();
    //   this.value = '';
    // }
    this.value = this.value.replace(/[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g, '');
    // /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
  });

  $(document).on("keypress", "input[onlyKor]", function() {
    if (!/[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g.test(this.value) && e.keyCode != 13) {
      alert("한글만 입력해주세요");
    }
  });
    
  // 한글영문
  $(document).on("propertychange change keyup keypress keydown paste input", "input[onlyText]", function(e) {
    // if (regExpEmpty.test(this.value)            // 공백
    //   || regExpNumber.test(this.value)          // 숫자
    //   || regExpSpecial.test(this.value)) {      // 특문
    //   e.preventDefault();
    //   this.value = '';
    // }
    this.value = this.value.replace(/[0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g, '');
    // /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g
    // /[^ㄱ-힣a-zA-Z]/gi
  });

  // 공백제거
  $(document).on("propertychange change keyup keypress keydown paste input", "input[noGap]", function(e) {
    // if (regExpEmpty.test(this.value)) {   // 공백
    //   e.preventDefault();
    //   this.value = '';
    // }
    this.value = this.value.replace(/\s/g,'');
  });
});

// 금액 콤마(,) 표시
function format_money(item){
  return item = Number(item).toLocaleString('ko-KR');
}

// 핸드폰번호 000-****-0000
function format_phone(phone){
  return phone = phone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-****-$3");

}

// 핸드폰번호 000-0000-0000
function format_phone_all(phone){
  return phone = phone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
}

// 특수문자 제거
function format_remove(item){
  return item = item.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g, "");
}

// 공백제거
function format_noGap(item){
  return item = item.replace(/\s/g,'');
}
````
