---
title: "쿠키 (Cookie)"
date: 2022-02-15 10:13:00 +0900
categories: [PHP]
tags: [PHP, cookie]
render_with_liquid: false
math: true
mermaid: true
---

## 쿠키 (Cookie)
사용자가 웹 페이지에 접속하면, 서버에서 사용자의 컴퓨터(클라이언트)에 텍스트 파일 형태로 저장하는 정보를 말한다.

웹페이지로 접근하는 사용자를 구별하기 위해 사용하는 값입니다.   
같은 역할을 하는 session 이라는 것이 존재하는데 session 은 서버에 값을 저장하고 **cookie 는 클라이언트에 값을 저장하는 차이점**이 있다. cookie 값이 클라이언트에 저장을 하기 때문에 변조가 쉬우며, 이로 인해 보안에 취약하다는 문제점이 있지만 서버에 부담을 적게 주는 장점이 있기 때문에 보안상에 위협이 되지 않는 값일 경우 쿠키로 저장을 하게 된다.

1. 웹 사이트를 재 방문하거나 사이트의 다른 페이지로 이동할 때, 다시 로그인할 필요 없이 사이트를 이용할 수 있게 한다.
2. 웹 사이트 사용자의 이름이나 이이디를 기억한다.
3. 사용자가 어떻게 웹 페이지를 이용하는지 그 패턴을 분석한다.


## setcookie()함수를 이용한 쿠키 생성

````
setcookie( [쿠키이름], [값], [만료시간 / 초 단위], [경로] );     // 쿠키이름은 변수
````

> **[참고사항] setcookie 의 만료시간**   
> setcookie 의 만료시간은 초단위이며, 현재 시간을 초형태로 나타내기 때문에 time() 함수를 이용하여 현재 시간의 초단위를 구한후 거기에 원하는 만료기간을 초단위로 더해줘야 한다.   
> 
> ex) setcookie("cookie", "setcookie", time() + 3600, "/");   
> 
> 예제 1의 3600은 1시간을 초단위로 나타낸 숫자로 해당 쿠키가 1시간 뒤까지 유효하도록 설정한 것이다.


### cookie1.php

저장된 쿠키 정보는 구글 개발자모드(F12) Application 탭 Cookie에서 확인 가능하다.

````php
<?
  $a = setcookie("userid", "bini2");  // 쿠키변수 userid = "bini2";
  $b = setcookie("username","이순신", time() + 60); // 쿠키변수 username = "이순신"; 60초간 유효

  if ($a and $b){ // 쿠키가 성공적으로 실행되면 1(true) 를 반환한다.

    echo "쿠키 'userid'와 'username' 생성 완료!<br>";
    echo "쿠키 'username'은 60초(1분)간 지속됨!";
  }
?>
<meta charset="UTF-8">
````

![alt text](/assets/images/posts/2022/0215/cookie-01.png)


<hr>

## 쿠키 사용 방법

1. register_globals=On : 배열 변수 $_COOKIE[]를 사용할 필요 없이, 쿠키의 이름을 변수명으로 사용한다.
2. register_globals=Off : 배열 변수 $_COOKIE[]를 사용한다.
 

### cookie2.php (register_globals=On 일 경우)

````php
<?
  echo "쿠키 'userid' : $userid <br>";
  echo "쿠키 'username' : $username <br>";
?> 
<meta charset="UTF-8">
````


## cookie3.php (쿠키 변수를 읽어오는 방법)

### register_globals=Off 일 경우

````php
<?
  // @extract($_COOKIE);

  $userid = $_COOKIE['userid'];
  $username = $_COOKIE['username'];

  echo "쿠키 'userid' : $userid <br>";
  echo "쿠키 'username' : $username <br>";
?> 
<meta charset="UTF-8">
````


<hr>

## 쿠키 삭제 방법

쿠키를 삭제하는 함수가 따로 존재하지 않습니다.   
때문에 setcookie 를 이용하여 값을 제거하고 만료시간을 이용하여 만료된 쿠키로 만들어서 사용할 수 없도록 처리한다.

````
setcookie( [쿠키이름], "", 0, [경로] );
````

````php
<?
  // @extract($_COOKIE);

  $userid = $_COOKIE['userid'];
  $username = $_COOKIE['username'];
  
  $a = setcookie("userid", "");
  $b = setcookie("username", "");

  if ($a and $b){
    echo "쿠키 'userid'와 'username' 삭제 완료!";
  }
?> 
<meta charset="UTF-8">
````
