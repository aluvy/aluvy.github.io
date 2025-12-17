---
title: "[PHP] 공지사항 및 최근게시물"
date: 2022-02-11 12:48:00 +0900
categories: [PHP]
tags: [php]
render_with_liquid: false
math: true
mermaid: true
---

## 자료

**notice.sql**

````sql
create table notice(
   num int not null,
   nick  char(10) not null,
   subject char(100) not null,
   content char(250) not null,
   primary key(num)
);

insert into notice values (1, 'yjhwang', '우리아이가 좋아하는 Happy Kids 이벤트', '우리아이가 좋아하는 Happy Kids 이벤트 내용글');
insert into notice values (2, 'jyp1004', '메가스톰 & 타워부메랑고 현장 사전예약제 실시', '메가스톰 & 타워부메랑고 현장 사전예약제 실시 내용글');
insert into notice values (3, 'leesang', '현금/카드 대신 쓰는 다양한 결제수단', '현금/카드 대신 쓰는 다양한 결제수단 내용글');
insert into notice values (4, 'kimsi', '캐리비안 베이 특별 엔터테인먼트 공연 뮤지컬  매직쇼', '캐리비안 베이 특별 엔터테인먼트 공연 뮤지컬  매직쇼 내용글');
insert into notice values (5, 'park3245', 'KB국민에버랜드판다카드 신규출시', 'KB국민에버랜드판다카드 신규출시 내용글');
insert into notice values (6, 'jjang5741', '캐리비안 베이 특별 엔터테인먼트 공연 뮤지컬  매직쇼', '캐리비안 베이 특별 엔터테인먼트 공연 뮤지컬  매직쇼 내용글');
insert into notice values (7, 'lee78852', '쓰다 남은 베이코인, 에버랜드에서도 편리하게', '쓰다 남은 베이코인, 에버랜드에서도 편리하게 내용글');
insert into notice values (8, 'angel1004', '강남역에서 에버랜드까지 대중교통 Tip', '강남역에서 에버랜드까지 대중교통 Tip 내용글');
insert into notice values (9, 'kkang8734', '세계워터파크협회 우수 워터파크 선정', '세계워터파크협회 우수 워터파크 선정 내용글');
insert into notice values (10, 'hongsa', '드디어 야간개장 에버랜드 리조트의 환상적인 여름밤', '드디어 야간개장 에버랜드 리조트의 환상적인 여름밤  내용글');
````

## notice.html

````html
<!DOCTYPE html>
<html lang="ko">
  <head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Untitled Document</title>
  <style>
    *{margin:0; padding:0}
    body{ font-size:16px; padding: 50px;}
    a{ color:#333; text-decoration:none;}
    a:hover{ color:#090; text-decoration:underline;}
    ul{list-style:none}

    #notice{ width:400px; border:1px solid #ccc; padding:20px;}
    #notice h3{ margin-bottom:15px; font-size:1.2rem}
    #notice li{line-height:1.5; overflow:hidden;}
    #notice span{float:right;}
  </style>
</head>
<body>

  <? include "func.php"; ?>
  <div id="notice">
    <h3>NOTICE</h3>
    <div class="notice_box">
      <? latest_article(); ?>
    </div>
  </div>

</body>
</html>
````


## func.php

````php
<?
  function latest_article(){    //테이블명, 게시물 개수, 문자개수

    $connect=mysql_connect( "localhost", "song", "1234") or  
    die( "SQL server에 연결할 수 없습니다.");    // 접속에 실패하면 에러메시지 출력

    mysql_select_db("song_db",$connect);

    $sql = "select * from notice order by num desc limit 5";
    // $table 테이블에서 num필드를 기준으로 $loop 개수 만큼만  내림차순 정렬

    $result = mysql_query($sql, $connect); // 검색 쿼리 적용


    echo "<ul>";

    while ($row = mysql_fetch_array($result)){   //읽어드린 레코드 만큼..

      $num = $row[num];    // 번호를 저장
      $len_subject = strlen($row[subject]);  // 제목의 길이를 구한다.
      $subject = $row[subject];    // 제목을 저장한다
      $nick = $row[nick];    // 제목을 저장한다

      if ($len_subject > 20){   //제목의 길이가 지정한 길이보다 크면

        $subject = mb_substr($row[subject], 0, 20, 'utf-8');
        // 첫번째 문자부터 $char_limit만큼 잘라낸다.
        // mb_substr 은 입력받은 문자열을 정해진 길이만큼 잘라서 리턴하는데 
        // 2byte 문자인 한글에 대해서도 처리가 가능한 함수입니다. 

        $subject .= "...";   // 잘라낸 문자열에 ...을 추가한다.
      }

      echo "<li><a href='#'>$subject<span>$nick</span></a></li>";
    }

    echo "</ul>";

    mysql_close();
  }
?>
````

![alt text](/assets/images/posts/2022/0211/php-notice-01.png)
