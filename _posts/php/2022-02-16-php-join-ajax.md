---
title: "[PHP] 회원가입 - ajax"
date: 2022-02-16 11:22:00 +0900
categories: [PHP]
tags: [php]
render_with_liquid: false
math: true
mermaid: true
---

약관동의 > 회원가입 폼 > 가입완료의 순으로 진행되며   
아이디, 닉네임 중복확인 시 새창을 사용하지 않고, 비동기 방식으로 바로 화면에 체크 여부가 보여진다.

## /member2/member.sql

````sql
create table member (
  id    char(15) not null,
  pass  char(41) not null,
  name  char(10) not null,
  nick  char(10) not null,
  hp    char(20)  not null,
  email char(80),
  regist_day char(20),
  level int,
  primary key(id)
);
````

## /member2/member_check2.php

각 약관의 동의(체크)여부를 따져 다음 단계로 넘어간다.   
checkbox의 name을 agree로 통일   
모두동의하기 버튼 추가

````php
<?
  session_start();
  @extract($_POST);
  @extract($_GET);
  @extract($_SESSION);
?>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>회원가입-이용약관</title>

  <link rel="stylesheet" href="./css/member_check2.css">

  <script src="../js/jquery-1.12.4.min.js"></script>
  <script src="../js/jquery-migrate-1.4.1.min.js"></script>
  <script src="./js/member_check.js"></script>
</head>
<body>
  <header>
    <a class="logo" href="../index.html"><img src="./images/logo.png" alt=""></a> 
  </header>             
  <article id="content">           
    <div class="sub_cont_wrap">
      <form name="fmember" class="join">

        <h3>약관 동의</h3>
        <h4>서비스 이용약관</h4>
        <div class="policy">
          제 1장 총칙<br><br>
          서비스 이용약관 내용
        </div>
        <div class="check">
          <input type="checkbox" id="check01" name="agree"> 
          <label for="check01">이용약관에 동의합니다.</label>
        </div>

        <h4>개인정보 수집 및 이용에 대한 안내</h4>
        <div class="policy">
          수집하는 개인정보의 항목 및 수집방법<br><br>
          개인정보 수집 및 이용에 대한 안내 내용
        </div>
        <div class="check">
          <input type="checkbox" id="check02" name="agree">
          <label for="check02">수집하는 개인정보의 항목 및 수집방법에 동의합니다.</label>
        </div>

        <h4>개인정보의 수집 및 이용목적</h4>
        <div class="policy">
          개인정보의 수집 및 이용목적<br><br>
          개인정보의 수집 및 이용목적 내용
        </div>
        <div class="check">
          <input type="checkbox" id="check03" name="agree">
          <label for="check03">개인정보 수집 및 이용목적에 동의합니다.</label>
        </div>

        <h4>개인정보의 보유 및 이용기간</h4>
        <div class="policy">
          개인정보의 보유 및 이용기간<br><br>
          개인정보의 보유 및 이용기간 내용
        </div>
        <div class="check">
          <input type="checkbox" id="check04" name="agree">
          <label for="check04">개인정보 보유 및 이용기간에 동의합니다.</label>
        </div>

        <h4>개인정보의 취급 위탁</h4>
        <div class="policy">
          개인정보의 취급 위탁<br><br>
          개인정보의 취급 위탁 내용
        </div>
        <div class="check">
          <input type="checkbox" id="check05" name="agree">
          <label for="check05">개인정보 보유 및 이용기간에 동의합니다.</label>
        </div>

        <div class="button">
          <a class="allcheck" href="#">모두 동의하기</a>
          <a href="#" class="check_agree ok">동의 및 회원가입</a>
          <button type="button" onclick="join_cancel()" class="cancel">취소</button>
        </div>

      </form>
    </div>
  </article>
</body>
</html>
````

## /member2/js/member_check.js

**회원가입 동의 체크**   
전체 체크박스의 갯수와 checked된 체크박스의 갯수를 비교하여 약관에 모두 동의했는지 체크한다.

````php
$(document).ready(function(){
        
  //    회원가입 개인정보 동의 ------------------------------------
  $('.check_agree').on('click',check_agree);

  function check_agree(e) {
    e.preventDefault();

    var checkboxLength = $('input[type="checkbox"]').length;  // 체크박스의 총개수

    var checkedLength = $('input[type="checkbox"]:checked').length;   // 체크가 되어있는 체크박스 갯수
    //console.log(checkboxLength,$('input[type="checkbox"]:checked').length)

    if (checkboxLength != checkedLength) {    // 총 갯수와 체크된 갯수가 같지않으면
      alert("수집하는 개인정보 항목에 동의해야 가입하실 수 있습니다.");
    } else {
      location.href = "member_form.php";   //회원가입 폼 입력 페이지로 이동
    }
  }

  // 모두선택, 해제
  $('.allcheck').toggle(function(e) {
    e.preventDefault();
    $('input[type="checkbox"]').attr('checked',true);
  }, function(e) {
    e.preventDefault();
    $('input[type="checkbox"]').attr('checked',false);
  });

});

function join_cancel(){
  history.go(-1);
}
````


## /member2/member_form.php

아이디, 닉네임 중복 체크를 비동기 방식으로 (ajax) 처리


### form 데이터 전송방식

- name="member_form"
- method="post"
- action="insert.php"


### insert.php에 넘겨줄 데이터

- 아이디: `$id`
- 비밀번호: `$pass`
- 비밀번호 확인: `$pass_confirm`
- 이름: `$name`
- 닉네임: `$nick`
- 휴대폰: `$hp1`, `$hp2`, `$hp3`
- 이메일: `$email1`, `$email2`

````php
<? 
  session_start();
  @extract($_POST);
  @extract($_GET);
  @extract($_SESSION);
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>회원가입</title>
  <link rel="stylesheet" href="../common/css/common.css">
  <link rel="stylesheet" href="css/member_form.css">


  <script src="../js/jquery-1.12.4.min.js"></script>
  <script src="../common/js/fullnav.js"></script>
  <script src="../common/js/move-top.js"></script>
  <script src="../common/js/easing.js"></script>
  <script src="../common/js/topslide.js"></script>

  <script>
    $(document).ready(function() {
    
      //id 중복검사
      $("#id").keyup(function() {     // id입력 상자에 id값 입력시
        var id = $('#id').val();

        $.ajax({
          type: "POST",
          url: "check_id.php",
          data: "id="+ id,        // check_id.php?id= +id
          cache: false,
          success: function(data) {
            //data => echo "문자열" 이 저장된
            $("#loadtext").html(data);
          }
        });
      });
            
      //nick 중복검사		 
      $("#nick").keyup(function() {    // id입력 상자에 id값 입력시
        var nick = $('#nick').val();

        $.ajax({
          type: "POST",
          url: "check_nick.php",
          data: "nick="+ nick,  
          cache: false, 
          success: function(data) {
            $("#loadtext2").html(data);
          }
        });
      });
    });
  </script>
  <script>
    function check_input() {
      if (!document.member_form.id.value) {
        alert("아이디를 입력하세요");
        document.member_form.id.focus();
        return;
      }

      if (!document.member_form.pass.value) {
        alert("비밀번호를 입력하세요");
        document.member_form.pass.focus();
        return;
      }

      if (!document.member_form.pass_confirm.value) {
        alert("비밀번호확인을 입력하세요");
        document.member_form.pass_confirm.focus();
        return;
      }

      if (!document.member_form.name.value) {
        alert("이름을 입력하세요");
        document.member_form.name.focus();
        return;
      }

      if (!document.member_form.nick.value) {
        alert("닉네임을 입력하세요");
        document.member_form.nick.focus();
        return;
      }

      if (!document.member_form.hp2.value || !document.member_form.hp3.value ) {
        alert("휴대폰 번호를 입력하세요");
        document.member_form.nick.focus();
        return;
      }

      if (document.member_form.pass.value != document.member_form.pass_confirm.value) {
        alert("비밀번호가 일치하지 않습니다.\n다시 입력해주세요.");
        document.member_form.pass.focus();
        document.member_form.pass.select();
        return;
      }

      document.member_form.submit();  // insert.php 로 변수 전송
    }
      
    function reset_form() {
      document.member_form.id.value = "";
      document.member_form.pass.value = "";
      document.member_form.pass_confirm.value = "";
      document.member_form.name.value = "";
      document.member_form.nick.value = "";
      document.member_form.hp1.value = "010";
      document.member_form.hp2.value = "";
      document.member_form.hp3.value = "";
      document.member_form.email1.value = "";
      document.member_form.email2.value = "";
      
      document.member_form.id.focus();

      return;
    }
  </script>
</head>
<body>
  <? include "../common/subhead.html" ?>
  <article id="content">  

  <h2>회원가입</h2>

  <form  name="member_form" method="post" action="insert.php"> 
    <table>
      <caption class="hidden">회원가입</caption>
      <tr>
        <th scope="col"><label for="id">아이디</label></th>
        <td>
          <input type="text" name="id" id="id" required>
          <div id="loadtext"></div>
        </td>
      </tr>
      <tr>
        <th scope="col"><label for="pass">비밀번호</label></th>
        <td><input type="password" name="pass" id="pass" required></td>
      </tr>
      <tr>
        <th scope="col"><label for="pass_confirm">비밀번호확인</label></th>
        <td><input type="password" name="pass_confirm" id="pass_confirm" required></td>
      </tr>
      <tr>
        <th scope="col"><label for="name">이름</label></th>
        <td><input type="text" name="name" id="name" required></td>
      </tr>
      <tr>
        <th scope="col"><label for="nick">닉네임</label></th>
        <td>
          <input type="text" name="nick" id="nick" required>
          <div id="loadtext2"></div>
        </td>
      </tr>
      <tr>
        <th scope="col">휴대폰</th>
        <td>
          <label class="hidden" for="hp1">전화번호앞3자리</label>
          <select class="hp" name="hp1" id="hp1"> 
            <option value='010'>010</option>
            <option value='011'>011</option>
            <option value='016'>016</option>
            <option value='017'>017</option>
            <option value='018'>018</option>
            <option value='019'>019</option>
          </select> -
          <label class="hidden" for="hp2">전화번호중간4자리</label>
          <input type="text" class="hp" name="hp2" id="hp2" required> -
          <label class="hidden" for="hp3">전화번호끝4자리</label>
          <input type="text" class="hp" name="hp3" id="hp3" required>
        </td>
      </tr>
      <tr>
        <th scope="col">이메일</th>
        <td>
          <label class="hidden" for="email1">이메일아이디</label>
          <input type="text" id="email1" name="email1"  required> @ 
          <label class="hidden" for="email2">이메일주소</label>
          <input type="text" name="email2" id="email2"  required>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <a href="#"><img src="images/button_save.gif"  onclick="check_input()"></a>&nbsp;&nbsp;
          <a href="#"><img src="images/button_reset.gif" onclick="reset_form()"></a>
        </td>
      </tr>
    </table>
  </form>

  </article>
  <? include "../common/subfoot.html" ?>
</body>
</html>
````



## /member2/insert.php

member_form.php에서 받은 데이터를 정리(?)하여 포멧을 맞춘 후 mysql에 저장

````php
<meta charset="utf-8">
<?
  @extract($_POST);
  @extract($_GET);
  @extract($_SESSION);

  //$id='';  (중복검사)
  //$pass='';
  //$pass_confirm='';
  //$nick='';   (중복검사)

  //$hp1 = '010';
  //$hp2 = '중간자리';
  //$hp3 = '끝자리';

  //$email1='메일아이디';
  //$email2='nate.com';

  $hp = $hp1."-".$hp2."-".$hp3;  //010-0000-0000
  $email = $email1."@".$email2;  //bini@nate.com

  $regist_day = date("Y-m-d (H:i)");  // 현재의 '년-월-일-시-분'을 저장
  $ip = $REMOTE_ADDR;

  include "../lib/dbconn.php";

  $sql = "select * from member where id='$id'";
  $result = mysql_query($sql, $connect);
  $exist_id = mysql_num_rows($result);

  if ($exist_id) {
    echo("
      <script>
        window.alert('해당 아이디가 존재합니다.');
        history.go(-1);
      </script>
    ");
    exit;
  } else {  // 레코드 삽입 명령을 $sql에 입력
    $sql = "insert into member(id, pass, name, nick, hp, email, regist_day, level) ";
    $sql .= "values('$id', password('$pass'), '$name', '$nick', '$hp', '$email', '$regist_day', 9)";

    mysql_query($sql, $connect);  // $sql 에 저장된 명령 실행
  }

  mysql_close();
  echo "
    <script>
      alert('회원가입이 정상적으로 처리되었습니다. 방가방가~');
      location.href = '../index.html';
    </script>
  ";
?>
````


## /member2/check_id.php

````php
<meta charset="utf-8">
<?
  @extract($_POST);
  @extract($_GET);
  @extract($_SESSION);
  //$id='a';

  if (!$id) {
    echo("아이디를 입력하세요.");
  } else {
    include "../lib/dbconn.php";

    $sql = "select * from member where id='$id' ";

    $result = mysql_query($sql, $connect);
    $num_record = mysql_num_rows($result);

    if ($num_record) {
      echo "<span style='color:red'>다른 아이디를 사용하세요.</span>";
    } else {
      echo "<span style='color:green'>사용가능한 아이디입니다.</span>";
    }

    mysql_close();
  }
?>
````


## /member2/check_nick.php

````php
<meta charset="utf-8">
<?
  @extract($_POST);
  @extract($_GET);
  @extract($_SESSION);

  if (!$nick) {
    echo("닉네임을 입력하세요.");
    
  } else {
    include "../lib/dbconn.php";

    $sql = "select * from member where nick='$nick' ";

    $result = mysql_query($sql, $connect);
    $num_record = mysql_num_rows($result);

    if ($num_record) {
      echo "<span style='color:red'>다른 닉네임을 사용하세요.</span>";
    } else {
      echo "<span style='color:green'>사용가능한 닉네입니다.</span>";
    }

    mysql_close();
  }
?>
````

### 예제파일

[join-ajax](/assets/images/posts/2022/0216/join-ajax.zip)
