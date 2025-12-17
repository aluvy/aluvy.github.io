---
title: "[PHP&MySQL] 아이디 중복검사 1 - 팝업형"
date: 2022-02-10 12:43:00 +0900
categories: [PHP]
tags: [php, mysql]
render_with_liquid: false
math: true
mermaid: true
---

회원가입 시 id 중복체크   
아이디 입력 input 옆에 button으로 id 중복검사를 하는 방법

### form.html

id중복검사 버튼에 onclick으로 check_id() 스크립트를 걸어준다.   
새창을 띄워 사용 가능한 id인지 알려줌 ~~(요즘엔 잘 쓰지 않는다)~~

````html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>form값 전달 및 아이디 중복검사</title>
  <style>
    *{margin:0 ; padding:0}
    body{padding: 50px;}
    table{ border-collapse:collapse; width:400px }
    th{ padding:10px; border:1px solid #ccc; background:#FC6}
    td{ padding:10px; border:1px solid #ccc}
    .but{ text-align:center}
    input{ padding:3px}
  </style>
  <script>
  function check_id()   // 아이디 중복 검사
    {
      window.open("check_id.php?id=" + document.member_form.id.value,
      "IDcheck",
      "left=200,top=200,width=400,height=100,scrollbars=no,resizable=yes"); 
      // ?id= value값으로 id값을 넘겨준다
      // 팝업창을 띄운후 check_id.php로 검사
    }
  </script>
</head>
<body>
  <form  name="member_form" method="post" action="insert.php"> 
    <table>
      <tr>
        <th>id</th>
        <td>
          <input type="text" id="id" name="id">
          <input type="button" value="id중복검사" onclick="check_id()">
        </td>
      </tr>
      <tr>
        <th>pass</th>
        <td><input type="password" id="pass" name="pass"></td>
      </tr>
      <tr>
        <th>name</th>
        <td><input type="text" id="name" name="name"></td>
      </tr>
      <tr>
        <th>hp</th>
        <td><input type="text" id="hp" name="hp"></td>
      </tr>
      <tr>
        <th>email</th>
        <td><input type="text" id="email" name="email"></td>
      </tr>
      <tr>
        <td class="but" colspan="2">
          <input type="submit" value="회원가입">
          <input type="reset" value="다시쓰기">
        </td>
      </tr>
    </table>
  </form>
</body>
</html>
````


### insert.php

````php
<meta charset="UTF-8">

<?
  $id = $_POST['id'];
  $pass = $_POST['pass'];
  $name = $_POST['name'];
  $hp = $_POST['hp'];
  $email = $_POST['email'];

  $connect=mysql_connect( "localhost", "song", "1234");    // DB접속
  mysql_select_db("song_db",$connect);

  $sql = "select * from memberTable where id='$id'";  // 동일한 아이디가 존재하는지 검색
  $result = mysql_query($sql, $connect);
  $exist_id = mysql_num_rows($result);

    if($exist_id) {         // 검색 레코드 개수가 1이상이면.. 참
    echo "
      <script type='text/javascript'>
        alert('해당 아이디가 존재합니다.');
        history.go(-1);
      </script>
    ";
    exit;   // insert.php를 빠져 나온다
  } else {           // 검색 레코드가 0이면.. 동일한 아이디의 레코드가 없다는 ..
    // 레코드 삽입 명령을 $sql에 입력
    $sql = "insert into memberTable(id, pass, name, hp, email) ";
    $sql .= "values('$id', '$pass', '$name', '$hp', '$email')";
    mysql_query($sql, $connect);  // $sql 에 저장된 명령 실행
  }

  mysql_close();                // DB 연결 끊기

  echo "
    <script>
      location.href = 'form.html'; 
    </script>
  ";
?>
````

### check_id.php

````php
<meta charset="UTF-8">
<?
  $id = $_GET['id'];

  if(!$id){   // id값이 NULL이면..

    echo "아이디가 입력되지 않았습니다.";
    echo "<br>아이디를 입력하세요.";

  } else {
    $connect=mysql_connect( "localhost", "song", "1234");    // DB접속
    mysql_select_db("song_db",$connect);

    $sql = "select * from memberTable where id='$id' ";
    //사용자가 입력한 아이디와 동일한 아이디가 있는지 검색

    $result = mysql_query($sql, $connect);   // 명령을 실행하고 결과를 result 변수에 넣는다.
    $num_record = mysql_num_rows($result);  // 저장된 레코드의 개수를 구한다

    if ($num_record){   //레코드 개수가 1이면
      echo "아이디가 중복됩니다!<br>";
      echo "다른 아이디를 사용하세요.<br>";	 
    } else {    // 레코드 개수가 0이면 (검색되지 않았으면, 중복되지 않았으면~)
      echo "사용가능한 아이디입니다.";
    }

    mysql_close($connect);  //접속을 끊는다
  }
?>
````
