---
title: "[PHP] 로그인 및 로그아웃"
date: 2022-02-17 11:58:00 +0900
categories: [PHP]
tags: [PHP]
render_with_liquid: false
math: true
mermaid: true
---

## /login/login_form.php

`$id` 와 `$pass` 값을 post로 login.php에 넘겨준다.

````php
<?
  session_start();
  @extract($_GET);
  @extract($_POST);
  @extract($_SESSION);
?>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>로그인</title>
</head>
<body>
  <form  name="member_form" method="post" action="login.php">
    <ul>
      <li><input type="text" name="id" class="login_input"></li>
      <li><input type="password" name="pass" class="login_input"></li>
    </ul>
    <div id="login_button"><input type="image" src="../img/login_button.gif"></div>
  </form>
</body>
</html>
````


## /login/login.php

넘어온 `$id` 와 `$pass` 값에 대한 유효성 검사와, DB정보 매칭 검사를 하여 로그인한다.   
비밀번호는 암호화되어 DB에 들어가있기 때문에, where절로 pass를 찾을때에도 암호화 한 값으로 찾아야한다.

**pass=password('$pass')**

입력된 정보가 맞으면 로그인이 된다. 로그인 값을 **SESSION변수에** 등록한다.   
세션변수를 강제로 지워주지 않으면(로그아웃), 로그인상태가 유지된다.

````php
<?
  session_start();
?>
<meta charset="utf-8">

<?
  @extract($_GET);
  @extract($_POST);
  @extract($_SESSION);
  // 이전화면에서 이름이 입력되지 않았으면 "이름을 입력하세요"
  // 메시지 출력
  // $id=>입력id값    $pass=>입력 pass
   
  if (!$id) { // id가 입력되지 않았으면
    echo("
      <script>
        window.alert('아이디를 입력하세요.');
        history.go(-1);
      </script>
    ");
    exit;
  }

  if (!$pass) { // pass가 입력되지 않았으면
    echo("
      <script>
        window.alert('비밀번호를 입력하세요.');
        history.go(-1);
      </script>
    ");
    exit;
  }

  include "../lib/dbconn.php";    // DB연결

  $sql = "select * from member where id='$id'";   //id 검색 sql문
  $result = mysql_query($sql, $connect);

  $num_match = mysql_num_rows($result);  // 검색되면 1, 없으면 0

  if (!$num_match) {  // 검색되지 않았으면    
    echo("
      <script>
        window.alert('등록되지 않은 아이디입니다.');
        history.go(-1);
      </script>
    ");

  } else {  // 해당 아이디가 검색되었으면
    
    $row = mysql_fetch_array($result);
    //$row[id] ,.... $row[level]
    $sql ="select * from member where id='$id' and pass=password('$pass')"; // id와 password를 찾는 sql문 (pass는 암호화한 값으로 찾아야한다)
    $result = mysql_query($sql, $connect);
    $num_match = mysql_num_rows($result);   // 검색되면 1, 없으면 0
    
    if (!$num_match) {  //적은 패스워드와 디비 패스워드가 같지않을때 
      echo("
        <script>
          window.alert('비밀번호가 틀립니다.');
          history.go(-1);
        </script>
      ");

      exit;

    } else {  // 입력 pass 와 테이블에 저장된 pass 일치한다.
        
      $userid = $row[id];
      $username = $row[name];
      $usernick = $row[nick];
      $userlevel = $row[level];

      //세션변수에 id~level 값을 저장한다(로그인상태)
      $_SESSION['userid'] = $userid;//$_SESSION['userid'] = $row[id];
      $_SESSION['username'] = $username;//$_SESSION['username'] = $row[name];
      $_SESSION['usernick'] = $usernick;//$_SESSION['usernick'] = $row[nick];
      $_SESSION['userlevel'] = $userlevel;//$_SESSION['userlevel'] = $row[level];

      echo("
        <script>
          alert('로그인이 되었습니다.');
          location.href = '../index.php';
        </script>
      ");
    }
  }
?>
````


## 로그인, 회원가입을 로그아웃, 정보수정으로 변경하기

### /lib/top_login1.php

세션변수 이용해 로그인 상태 여부를 판별하여 알맞는 메뉴로 변경해준다. (메인과 서브 경로문제 체크)   
실제 페이지(부모문서) 상단에 `session_start();` 함수가 있어야한다.

````php
<div id="logo"><a href="index.php"><img src="./img/logo.gif" border="0"></a></div>
<div id="moto"><img src="./img/moto.gif"></div>
<div id="top_login">

  <? if (!$userid) { ?> // userid 세션변수가 없으면 (로그아웃 상태)

    <a href="./login/login_form.php">로그인</a> | <a href="./member/member_form.php">회원가입</a>

  <? } else { ?>  // userid 세션변수가 있으면 (로그인 상태)

    <?=$usernick?> (level:<?=$userlevel?>) | 
    <a href="./login/logout.php">로그아웃</a> | <a href="./login/member_form_modify.php">정보수정</a>

  <? } ?>
</div>
````


### /login/logout.php

uset() 함수를 사용하여 세션변수를 삭제하고 index로 링크시켜준다.

````php
<?
  session_start();

  unset($_SESSION['userid']);
  unset($_SESSION['username']);
  unset($_SESSION['usernick']);
  unset($_SESSION['userlevel']);

  echo("
    <script>
      location.href = '../index.php'; 
    </script>
  ");
?>
````

<hr>

[login-logout.zip](/assets/images/posts/2022/0217/login-logout.zip)
