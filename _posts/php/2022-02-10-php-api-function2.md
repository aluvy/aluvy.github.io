---
title: "[PHP] API 함수를 이용한 레코드 삽입2"
date: 2022-02-10 12:12:00 +0900
categories: [PHP]
tags: [php]
render_with_liquid: false
math: true
mermaid: true
---

## memberTable.sql

DB 테이블을 생성한다.

````sql
create table memberTable(
  id    char(15) not null,
  pass  char(15) not null,
  name  char(10) not null,
  hp    char(20)  not null,
  email char(80),

  primary key(id)
);
````

## form.html

**전달방식**
- action="insert.php"
- method="post"
- name="memer_form"
 
**전달 될 정보**

- $id
- $pass
- $name
- $hp
- $email

````php
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>form값 전달</title>
  <style>
    *{margin:0 ; padding:0}
    body{padding: 50px;}
    table{ border-collapse:collapse; width:400px }
    th{ padding:10px; border:1px solid #ccc; background:#FC6}
    td{ padding:10px; border:1px solid #ccc}
    .but{ text-align:center}
  </style>
</head>
<body>
  <form  name="member_form" method="post" action="insert.php"> 
    <table>
      <tr>
        <th>id</th>
        <td><input type="text" id="id" name="id"  /></td>
      </tr>
      <tr>
        <th>pass</th>
        <td><input type="password" id="pass" name="pass"  /></td>
      </tr>
      <tr>
        <th>name</th>
        <td><input type="text" id="name" name="name"  /></td>
      </tr>
      <tr>
        <th>hp</th>
        <td><input type="text" id="hp" name="hp"  /></td>
      </tr>
      <tr>
        <th>email</th>
        <td><input type="text" id="email" name="email"  /></td>
      </tr>
      <tr>
        <td class="but" colspan="2">
        <input type="submit" value="회원가입" />
        <input type="reset" value="다시쓰기" />
      </td>
      </tr>
    </table>
  </form>
</body>
</html>
````

![alt text](/assets/images/posts/2022/0210/php-api-function2-01.png)


## insert.php

````php
<meta charset="UTF-8">
<?
  $id = $_POST['id'];
  $pass = $_POST['pass'];
  $name = $_POST['name'];
  $hp = $_POST['hp'];
  $email = $_POST['email'];

  $connect=mysql_connect( "localhost", "song", "1234");   // DB 접속정보
  mysql_select_db("song_db",$connect);    // DB접속
 
  // 중복 아이디가 있는지 검색하는 SQL문
  $sql = "select * from memberTable where id='$id'";

  // SQL을 실행, ★★검색된 레코드가 리턴된다., 없으면 null
  $result = mysql_query($sql);

  // 리턴된 레코드의 개수 리턴 0또는 1
  $exist_id = mysql_num_rows($result);

  if($exist_id) { // 검색 레코드 개수가 1이면 참 (id가 존재하면, 중복되면)
    echo "
      <script>
        alert('해당 아이디가 존재합니다.');
        history.go(-1);
      </script>
    ";
    exit;   // insert.php를 빠져 나온다
  } else {           // 검색 레코드가 0이면.. 동일한 아이디의 레코드가 없다는 ..
    // 레코드 삽입 명령을 $sql에 입력
    $sql = "insert into memberTable(id, pass, name, hp, email) ";
    $sql .= "values('$id', '$pass', '$name', '$hp', '$email')"; // 타입 형태를 맞춰줘야 한다. 숫자면 따옴표X
    mysql_query($sql, $connect);  // $sql 에 저장된 명령 실행
  }

  mysql_close($connect);  // DB 연결 끊기

  echo "
    <script>
      alert('회원가입이 완료되었습니다.');
      location.href = 'form.html';    // 로그인 페이지로 이동
    </script>
  ";
?>
````
