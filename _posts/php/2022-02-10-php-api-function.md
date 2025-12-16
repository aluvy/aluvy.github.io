---
title: "[PHP] API 함수를 이용한 레코드 삽입"
date: 2022-02-10 10:50:00 +0900
categories: [PHP]
tags: [php]
render_with_liquid: false
math: true
mermaid: true
---

## PHP API 함수

mysql_ 로 시작되는 함수를 사용한다.

- `mysql_connect();`: DB 접속 정보
- `mysql_select_db();`: DB 를 선택하고, 접속정보 입력
- `mysql_query();`: SQL query문을 실행
- `mysql_close();`: DB 접속 해제 ( \q )


### insert.php

해당 DB의 아이디, 비밀번호, 디비명을 수정해야한다

````php
<meta charset="UTF-8">
<?
  $connect = mysql_connect("localhost","song","1234");    // DB 접속 정보
  mysql_select_db("song_db", $connect);   // DB에 접속

  // SQL문
  $sql = "insert into biz_card (num, name, company, tel, hp, address)";
  $sql .= " values (2, '원선우', '미래전자', '031-276-1829', ";
  $sql .= " '010-8723-2837', '경기도 용인시 신갈동 388-23 번지')";

  $result = mysql_query($sql);    // SQL 실행

  // SQL 실행 성공시 1(true)이 리턴된다.
  // SQL 실행 실패시 0(false)나 null값이 리턴된다.
  if ($result){
    echo "레코드 삽입 완료!";
  } else {
    echo "레코드 삽입 실패! 에러 확인 요망!";
  };

  mysql_close($connect); // 접속해제 \q
?>
````

<hr>

## 실제 폼을 사용한 PHP API 함수를 이용한 레코드 삽입

(유효성 검사는 생략되어 있다.)

### mem_form.php

**전달 방식**
- action="mem_print.php"
- method="post"
- name="mem_form"
 
**전달 될 정보**

- $title="회원가입 양식"
- $id
- $name
- $passwd
- $passwd_confirm
- $gender = 'M' , 'W'
- $phone1, $phone2, $phone3
- $address
- $movie, $book, $shop, $sport (체크 시 yes)
- $intro

````php
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PHP API 함수를 이용한 레코드 삽입</title>
</head>
<body>
  <h2>▶ 회원가입</h2>
  <form action="mem_print.php" method="post" name="mem_form" id="mem_form">
    <input type="hidden" name="title" value="회원가입 양식"> 
    <table border="1" width="640" cellspacing="1" cellpadding="4">
      <tr>
        <td>* 아이디 :</td>
        <td><input type="text" size="15" maxlength="12" name="id" value=""></td>
      </tr>
      <tr>
        <td > * 이름 :</td>
        <td><input type="text" size="15" maxlength="12" name="name"></td>
      </tr>
      <tr>
        <td> * 비밀번호 :</td>
        <td><input type="password" size="15" maxlength="10" name="passwd"  value=""></td>
      </tr>
      <tr>
        <td> * 비밀번호 확인 :</td>
        <td><input type="password" size="15" maxlength="12" name="passwd_confirm"></td>
      </tr>
      <tr>
        <td>성별 :</td>
        <td>
          <input type="radio" name="gender" value="M" checked>남
          <input type="radio" name="gender" value="F">여
        </td>
      </tr>
      <tr>
        <td>휴대전화 :</td>
        <td>
          <select name="phone1">
          <option>선택</option>
          <option value="010">010</option>
          <option value="011">011</option>
          <option value="017">017</option>
          </select> - 
          <input type="text" size="4" name="phone2" maxlength="4"> -
          <input type="text" size="4" name="phone3" maxlength="4">
        </td>
      </tr>
      <tr>
        <td>주 소 :</td>
        <td><input type="text" size="50" name="address"></td>
      </tr>
      <tr>
        <td>취 미 :</td>
        <td>
          <input type="checkbox" name="movie" value="yes" checked>영화감상 &nbsp;  
          <input type="checkbox" name="book" value="yes">독서 &nbsp; 
          <input type="checkbox" name="shop" value="yes">쇼핑 &nbsp; 
          <input type="checkbox" name="sport" value="yes" checked>운동
        </td>
      </tr>
      <tr>
        <td>자기소개 :</td>
        <td><textarea name="intro" rows="5" cols="60"></textarea></td>
      </tr>
    </table>

    <br>

    <table border="0"  width="640">
      <tr>
        <td align="center">
          <input type="submit" value="확인">
          <input type="reset" value="다시작성">
        </td>
      </tr>
    </table>
  </form>
</body>
</html>
````


![alt text](/assets/images/posts/2022/0210/php-api-function-01.png)


<hr>

## 전달 받은 정보 확인해보기

### mem_print.php

````php
<meta charset="UTF-8">
<?
  $title = $_POST['title'];
  $id = $_POST['id'];
  $name = $_POST['name'];
  $passwd = $_POST['passwd'];
  $passwd_confirm = $_POST['passwd_confirm'];
  $gender = $_POST['gender'];
  $phone1 = $_POST['phone1'];
  $phone2 = $_POST['phone2'];
  $phone3 = $_POST['phone3'];
  $address = $_POST['address'];
  $movie = $_POST['movie'];
  $book = $_POST['book'];
  $shop = $_POST['shop'];
  $sport = $_POST['sport'];
  $intro = $_POST['intro'];

  echo "데이터가 전송 되었습니다.<br>";

  echo "아이디 :          $id<br>";
  echo "이름 :            $name<br>";
  echo "비밀번호 :         $passwd<br>";
  echo "비밀번호 확인 :     $passwd_confirm<br>";
  echo "성별 :            $gender<br>";
  echo "휴대번호 :         $phone1 - $phone2 - $phone3<br>";
  echo "주소 :            $address<br>";
  echo "영화감상 :         $movie<br>";
  echo "독서 :            $book<br>";
  echo "쇼핑 :            $shop<br>";
  echo "운동 :            $sport<br>";
  echo "자기소개 :         $intro<br>";
  echo "제목(hidden 타입에서 전달) : $title<br>";
?>
````

![alt text](/assets/images/posts/2022/0210/php-api-function-02.png)
