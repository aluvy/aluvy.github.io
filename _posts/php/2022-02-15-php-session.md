---
title: "[PHP] 세션 (Session)"
date: 2022-02-15 11:11:00 +0900
categories: [PHP]
tags: [PHP, session]
render_with_liquid: false
math: true
mermaid: true
---

## 세션 (Session)

세션은 정보를 사용자 컴퓨터와 서버 양쪽에 나누어 저장한다.   
쿠키보다 보완을 강화할 수 있다. (로그인/로그아웃에 주로 쓰인다.)

웹사이트를 방문하는 사용자 컴퓨터에 세션 ID정보를 저장하고, 서버에는 사용자 컴퓨터의 세션 ID에 대응하는 정보를 저장한다. 두 정보가 짝이 맞아야 서버에서 데이터를 처리할 수 있다. 사용자의 컴퓨터의 세션 아이디가 유출되더라도, 세션 아이디 자체에는 별다른 정보가 없고 주요 **정보는 서버에 저장되기 때문에 쿠키보다 보안적으로 안전하다.**

> 변수 이름은 사용자 PC에 저장하고, 그 값은 서버에 저장된다.
{: .prompt-info}


### PHP Session 을 사용하기 위한 준비코드

````
session_start();
````

> **[참고사항] session_start() 함수의 위치**   
> session_start() 함수는 **소스코드의 최상단**에 위치시켜 다른 코드가 그 위에 오지 않도록 처리해야 한다.
{: .prompt-tip}


### PHP session 생성 및 수정

````
$_SESSION["[세션명]"] = "값";     // 세션변수
````


<hr>

## 세션 시작과 등록
 
### session1.php

````php
<?
  session_start();    // 세션시작

  echo "세션시작!!!<br>";

  $_SESSION['userid'] = "bini";
  $_SESSION['username']  = "홍길동";
  $_SESSION['pass']  = "1234";
  $_SESSION['time']    = time();   // time()은 현재 시간

  $userid = $_SESSION['userid'];
  $username = $_SESSION['username'];
  $pass = $_SESSION['pass'];
  $time = $_SESSION['time'];

  echo '3개의 세션 변수 등록 완료!!!<br><br>';

  echo " $userid <br>";
  echo " $username <br>";
  echo " $pass <br>";
  echo " $time <br>";
?>

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
    
</body>
</html>
````


<hr>


## 세션 사용 방법

- register_globals=On : 배열 변수 $_SESSION[]를 사용할 필요 없이, 쿠키의 이름을 변수명으로 사용한다. 
- register_globals=Off : 배열 변수 $_SESSION[]를 사용한다.
 

### session2.php (register_globals=On 일 경우)

````php
<?
  session_start();

  $time = date('Y-m-d(H:i:s)', $time);
?>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h3>▶ 등록된 세션의 사용</h3>
  <table width="500" border="1">
    <tr>
      <td>아이디</td>
      <td>이름</td>
      <td>비밀번호</td>
      <td>현재시간</td>
    </tr>
    <tr>
      <td><?=$userid ?></td>
      <td><?=$username ?></td>
      <td><?=$pass ?></td>
      <td><?=$time ?></td>
    </tr>
  </table>
</body>
</html>
````


### session3.php (register_globals=Off 일 경우)

````php
<?
  session_start();

  $userid = $_SESSION['userid'];
  $username = $_SESSION['username'];
  $pass = $_SESSION['pass'];
  $time = $_SESSION['time'];

  $time = date('Y-m-d(H:i:s)', $time);
?>

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h3>▶ 등록된 세션의 사용</h3>
  <table width="500" border="1">
    <tr>
      <td>아이디</td>
      <td>이름</td>
      <td>비밀번호</td>
      <td>현재시간</td>
    </tr>
    <tr>
      <td><?=$userid ?></td>
      <td><?=$username ?></td>
      <td><?=$pass ?></td>
      <td><?=$time ?></td>
    </tr>
  </table>
</body>
</html>
````


<hr>


## 세션 삭제 방법

````
unset( $_SESSION['세션변수명'] );
````

### delete_session.php

````php
<?
  session_start();

  unset($_SESSION['userid']);
  unset($_SESSION['username']);
  unset($_SESSION['pass']);
  unset($_SESSION['time']);

  echo "로그아웃 되었습니다.<br>";
?>

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h3>▶ 세션의 삭제</h3>
  <table width="400" border="1">
    <tr>
      <td>아이디</td>
      <td>이름</td>
      <td>비밀번호</td>
      <td>현재시간</td>
    </tr>
    <tr>
      <td><?=$_SESSION['userid'] ?></td>
      <td><?=$_SESSION['username'] ?></td>
      <td><?=$_SESSION['pass'] ?></td>
      <td><?=$_SESSION['time'] ?></td>
    </tr>
  </table>
</body>
</html>
````
