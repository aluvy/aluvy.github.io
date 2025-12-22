---
title: "[PHP] 최근게시물"
date: 2022-02-28 10:27:00 +0900
categories: [PHP]
tags: [php]
render_with_liquid: false
math: true
mermaid: true
---

홈페이지 index 페이지에 게시판 최근게시물을 노출할 수 있다.

### /index.php

index 최상단 session 관련 코드 필수

````php
<?
  session_start();
  @extract($_GET); 
  @extract($_POST); 
  @extract($_SESSION);  
?>

<? include "./lib/func.php"; ?>	
<div class="con1"><? latest_article("greet", 5, 30); ?></div>
<div class="con2"><? latest_article("concert", 5, 30); ?></div>
````


### /lib/func.php

````php
<?
  function latest_article($table, $loop, $char_limit) { // 테이블명, 노출갯수, 글자수
  
    include "dbconn.php";

    $sql = "select * from $table order by num desc limit $loop";
    $result = mysql_query($sql, $connect);

    while ($row = mysql_fetch_array($result)) {
      $num = $row[num];
      $len_subject = mb_strlen($row[subject], 'utf-8');	// 한글도 1자로 처리, 제목의 총 글자 수
      $subject = $row[subject];
      $len_content = mb_strlen($row[content], 'utf-8');
      $content = $row[content];

      if ($len_subject > $char_limit) { // 제한글자수보다 크면
      
        // $subject = str_replace( "&#039;", "'", $subject);
        $subject = mb_substr($subject, 0, $char_limit, 'utf-8');
        $subject = $subject."...";
      }

      if ($len_content > 50) {	// 제한글자수보다 크면
  
        // $subject = str_replace( "&#039;", "'", $subject);
        $content = mb_substr($content, 0, 50, 'utf-8');
        $content = $subject."...";
      }

      $regist_day = substr($row[regist_day], 0, 10);	// '2022-02-21'

      if ($table=='concert') {
        if ($row[file_copied_0]) {	//	첨부된 이미지가 있으면
          $concertimg='./concert/data/'.$row[file_copied_0];
        } else {
          $concertimg= './concert/data/default.jpg';
        }
      }

      if ($table=='greet') {	// greet table
        echo "      
          <div class='col1'>
            <a href='./$table/view.php?table=$table&num=$num'>
              <p>$subject</p>
              <p>$content</p>
            </a>
          </div>
          <div class='col2'>$regist_day</div>
          <div class='clear'></div>
        ";

      } else if($table=='concert') {		// concert table
        echo "
          <div class='col1'>
            <a href='./$table/view.php?table=$table&num=$num'>
              <img src='$concertimg' alt='' width='50' height='50'>
              $subject
            </a>
          </div>
          <div class='col2'>$regist_day</div>
          <div class='clear'></div>
        ";    
      }
    }
    mysql_close();
  }
?>
````
