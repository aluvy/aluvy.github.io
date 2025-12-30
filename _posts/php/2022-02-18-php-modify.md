---
title: "[PHP] 회원정보수정"
date: 2022-02-18 11:52:00 +0900
categories: [PHP]
tags: [php]
render_with_liquid: false
math: true
mermaid: true
---

### /login/member_form_modify.php

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
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link href="../css/common.css" rel="stylesheet" type="text/css" media="all">
  <link href="../css/member.css" rel="stylesheet" type="text/css" media="all">
  <script>
    function check_id() {
      window.open("check_id.php?id=" + document.member_form.id.value, "IDcheck", "left=200,top=200,width=250,height=100,scrollbars=no,resizable=yes");
    }
    
    function check_nick() {
      window.open("../member/check_nick.php?nick=" + document.member_form.nick.value, "NICKcheck", "left=200,top=200,width=250,height=100,scrollbars=no,resizable=yes");
    }
    
    function check_input() {
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

      document.member_form.submit();
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
<?
  //$userid='aaa';

  include "../lib/dbconn.php";

  $sql = "select * from member where id='$userid'";
  $result = mysql_query($sql, $connect);

  $row = mysql_fetch_array($result);
  //$row[id]....$row[level]

  $hp = explode("-", $row[hp]);  //000-0000-0000
  $hp1 = $hp[0];
  $hp2 = $hp[1];
  $hp3 = $hp[2];

  $email = explode("@", $row[email]);
  $email1 = $email[0];
  $email2 = $email[1];

  mysql_close();
?>
<body>
  <div id="wrap">
    <div id="header"><? include "../lib/top_login2.php"; ?></div>  <!-- end of header -->

    <div id="menu"><? include "../lib/top_menu2.php"; ?></div>  <!-- end of menu --> 

    <div id="content">
      <div id="col1">
        <div id="left_menu"><? include "../lib/left_menu.php"; ?></div>
      </div>

      <div id="col2">
        <form  name="member_form" method="post" action="modify.php"> 
          <div id="title"><img src="../img/title_member_modify.gif"></div>

          <div id="form_join">
            <div id="join1">
              <ul>
                <li>* 아이디</li>
                <li>* 비밀번호</li>
                <li>* 비밀번호 확인</li>
                <li>* 이름</li>
                <li>* 닉네임</li>
                <li>* 휴대폰</li>
                <li>&nbsp;&nbsp;&nbsp;이메일</li>
              </ul>
            </div>
            
            <div id="join2">
              <ul>
                <li><?= $row[id] ?></li>
                <li><input type="password" name="pass" value=""></li>
                <li><input type="password" name="pass_confirm" value=""></li>
                <li><input type="text" name="name" value="<?= $row[name] ?>"></li>
                <li>
                  <div id="nick1"><input type="text" name="nick" value="<?= $row[nick] ?>"></div>
                  <div id="nick2" ><a href="#"><img src="../img/check_id.gif" onclick="check_nick()"></a></div>
                </li>
                <li>
                  <input type="text" class="hp" name="hp1" value="<?= $hp1 ?>"> -
                  <input type="text" class="hp" name="hp2" value="<?= $hp2 ?>"> -
                  <input type="text" class="hp" name="hp3" value="<?= $hp3 ?>">
                </li>
                <li>
                  <input type="text" id="email1" name="email1" value="<?= $email1 ?>"> @
                  <input type="text" name="email2" value="<?= $email2 ?>">
                </li>
              </ul>
            </div>

            <div class="clear"></div>
            <div id="must"> * 는 필수 입력항목입니다.^^</div>
          </div>

          <div id="button">
            <a href="#"><img src="../img/button_save.gif"  onclick="check_input()"></a>
            &nbsp;&nbsp;
            <a href="#"><img src="../img/button_reset.gif" onclick="reset_form()"></a>
          </div>
        </form>
      </div>
    </div>
  </div>
</body>
</html>
````

### /login/modify.php

````php
<?
  session_start();
  @extract($_POST);
  @extract($_GET);
  @extract($_SESSION);
?>
<meta charset="utf-8">
<?
  $hp = $hp1."-".$hp2."-".$hp3;
  $email = $email1."@".$email2;

  $regist_day = date("Y-m-d (H:i)");  // 현재의 '년-월-일-시-분'을 저장

  include "../lib/dbconn.php";       // dconn.php 파일을 불러옴

  $sql = "update member set pass=password('$pass'), name='$name' , ";
  $sql .= "nick='$nick', hp='$hp', email='$email', regist_day='$regist_day' where id='$userid'";

  mysql_query($sql, $connect);  // $sql 에 저장된 명령 실행

  //수정된 세션변수 이름과 닉네임을 바꾸어준
  $_SESSION['username'] = $name;
  //$_SESSION['username'] = $row[name];
  $_SESSION['usernick'] = $nick;
  //$_SESSION['usernick'] = $row[nick];


  mysql_close();                // DB 연결 끊기
  echo "
    <script>
      window.alert('회원정보가 수정되었습니다.');
      location.href = '../index.php';
    </script>
  ";
?>
````


<hr>

[modify.zip download](/assets/images/posts/2022/02/18/modify.zip)
