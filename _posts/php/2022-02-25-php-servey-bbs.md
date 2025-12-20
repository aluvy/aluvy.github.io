---
title: "[PHP] 설문조사"
date: 2022-02-25 12:38:00 +0900
categories: [PHP]
tags: [PHP]
render_with_liquid: false
math: true
mermaid: true
---

### servey.sql

````sql
create table survey(
  ans1 int,
  ans2 int,
  ans3 int,
  ans4 int
);

insert into survey values(0, 0, 0, 0);
````

### servey.php

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
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>설문조사</title>
  <link rel="stylesheet" href="../css/survey.css">
  <script>
    function update() {
      var vote;
      var length = document.survey_form.composer.length; 

      for (var i=0; i<length; i++) {
        if (document.survey_form.composer[i].checked == true) {
          vote= document.survey_form.composer[i].value;
          break;
        }
      }

      if (i == length) {
        alert("문항을 선택하세요");
        return;
      }

      window.open("update.php?composer="+vote , "", "left=200, top=200, width=300, height=300, status=no, scrollbars=no");
    }

    function result() {
      window.open("result.php" , "", "left=200, top=200, width=300, height=300, status=no, scrollbars=no");
    }
  </script>
</head> 
<body>
  <form name=survey_form method=post > 
    <table border=0 cellspacing=0 cellpdding=0 width='200' align='center'>
      <input type=hidden name=kkk value=100>
      <tr height=40>
        <td><img src="../img/bbs_poll.gif"></td>
      </tr>
      <tr height=1 bgcolor="#cccccc"><td></td></tr>
      <tr height="7"><td></td></tr>
      <tr>
        <td><b>가장 좋아하는 기타 작곡가는?</b></td>
      </tr>
      <tr>
        <td><input type=radio name='composer' value='ans1' >1. 타레가</td>
      </tr>
      <tr height=5><td></td></tr>
      <tr>
        <td><input type=radio name='composer' value='ans2' >2. 빌라로보스</td>
      </tr>
      <tr height=5><td></td></tr>
      <tr>
        <td><input type=radio name='composer' value='ans3' >3. 끌레양</td>
      </tr>
      <tr height=5><td></td></tr>
      <tr>
        <td><input type=radio name='composer' value='ans4' >4. 소르</td>
      </tr>
      <tr height=7><td></td></tr>
      <tr height=1 bgcolor="#cccccc"><td></td></tr>
      <tr height=7><td></td></tr>
      <tr>
        <td align=middle>
          <a href="#"><img src="../img/b_vote.gif" border="0"  style='cursor:hand' onclick=update()></a>
          <a href="#"><img src="../img/b_result.gif" border="0"  style='cursor:hand' onclick=result()></a>
        </td>
      </tr>
    </table>
  </form>
</body>
</html>
````


### result.php

````php
<?
  session_start();
  @extract($_POST);
  @extract($_GET);
  @extract($_SESSION);

  include "../lib/dbconn.php";

  $sql ="select * from survey";
  $result = mysql_query($sql, $connect);
  $row = mysql_fetch_array($result);

  $total = $row[ans1] + $row[ans2] + $row[ans3] + $row[ans4]; 

  $ans1_percent = $row[ans1]/$total * 100;
  $ans2_percent = $row[ans2]/$total * 100;
  $ans3_percent = $row[ans3]/$total * 100;
  $ans4_percent = $row[ans4]/$total * 100;

  $ans1_percent = floor($ans1_percent);
  $ans2_percent = floor($ans2_percent);
  $ans3_percent = floor($ans3_percent);
  $ans4_percent = floor($ans4_percent);
?>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>설문조사</title>
  <link rel="stylesheet" href="../css/survey.css">
</head>
<body>
  <table width=250 height=250 border='0' cellspacing='0' cellpadding='0'>
    <tr>
      <td width=180 height=1 colspan=5 bgcolor="#ffffff"></td>
    </tr>
    <tr>
      <td width=1 height=35 bgcolor='#ffffff'></td>
      <td width=9 bgcolor='#ffffff'></td>
      <td width=150  align=center bgcolor='#ffffff'><b>총 투표수 : <? echo $total ?> &nbsp;명</b></td>
      <td width=9 bgcolor='#ffffff'></td>
      <td width=1 bgcolor='#ffffff'></td>
    </tr>
    <tr>
      <td height=29 bgcolor='#ffffff'></td>
      <td></td>
      <td valign=middle><b>가장 좋아하는 기타 작곡가는?</b></td>
      <td></td>
      <td bgcolor='#ffffff'></td>
    </tr>
    <tr>
      <td height=20 bgcolor='#ffffff'></td>
      <td></td>
      <td> 타레가 (<b><? echo $ans1_percent ?></b> %) <font color=purple><b><? echo $row[ans1] ?></b></font> 명</td>
      <td></td>
      <td bgcolor='#ffffff'></td>
    </tr>
    <tr>
      <td height=3 bgcolor='#ffffff'></td>
      <td></td>
      <td>
        <table width=100 border=0 height=3 cellspacing=0 cellpadding=0>
          <tr>
            <?
            $rest = 100 - $ans1_percent;
            echo "
              <td width='$ans1_percent%' bgcolor=purple></td>
              <td width='$rest%' bgcolor='#dddddd' height=5></td>
            ";
            ?>
          </tr>
        </table>
      </td>
      <td></td>
      <td bgcolor='#ffffff'></td>
    </tr>
    <tr>
      <td height=20 bgcolor='#ffffff'></td>
      <td></td>
      <td> 빌라로보스 (<b><? echo $ans2_percent ?></b> %) <font color=blue><b><? echo $row[ans2] ?></b></font> 명</td>
      <td></td>
      <td bgcolor='#ffffff'></td>
    </tr>
    <tr>
      <td height=3 bgcolor='#ffffff'></td>
      <td></td>
      <td>
        <table width=100 border=0 height=3 cellspacing=0 cellpadding=0>
          <tr>
            <?
            $rest = 100 - $ans2_percent;
            echo "
              <td width='$ans2_percent%' bgcolor=blue></td>
              <td width='$rest%' bgcolor='#dddddd' height=5></td>
            ";
            ?>
          </tr>
        </table>
      </td>
      <td></td>
      <td bgcolor='#ffffff'></td>
    </tr>
    <tr>
      <td height=20 bgcolor='#ffffff'></td>
      <td></td>
      <td> 끌레양 (<b><? echo $ans3_percent ?></b> %) <font color=green><b><? echo $row[ans3] ?></b></font> 명</td>
      <td></td>
      <td bgcolor='#ffffff'></td>
    </tr>
    <tr>
      <td height=3 bgcolor='#ffffff'></td>
      <td></td>
      <td>
        <table width=100 border=0 height=3 cellspacing=0 cellpadding=0>
          <tr>
          <?
            $rest = 100 - $ans3_percent;
            echo "
              <td width='$ans3_percent%' bgcolor=green></td>
              <td width='$rest%' bgcolor='#dddddd' height=5></td>
            ";
          ?>
          </tr>
        </table>
      </td>
      <td></td>
      <td bgcolor='#ffffff'></td>
    </tr>
    <tr>
      <td height=20 bgcolor='#ffffff'></td>
      <td></td>
      <td> 소르 (<b><? echo $ans4_percent ?></b> %) <font color=skyblue><b><? echo $row[ans4] ?></b></font> 명</td>
      <td></td>
      <td bgcolor='#ffffff'></td>
    </tr>
    <tr>
      <td height=3 bgcolor='#ffffff'></td>
      <td></td>
      <td>
        <table width=100 border=0 height=3 cellspacing=0 cellpadding=0>
          <tr>
            <?
            $rest = 100 - $ans4_percent;
            echo "
              <td width='$ans4_percent%' bgcolor=skyblue></td>
              <td width='$rest%' bgcolor='#dddddd' height=5></td>
            ";
            ?>
          </tr>
        </table>
      </td>
      <td></td>
      <td bgcolor='#ffffff'></td>
    </tr>
    <tr>
      <td height=40 bgcolor='#ffffff'></td>
      <td></td>
      <td align=center valign=middle>
        <input type='image' style='cursor:hand' src='../img/close.gif' border=0 onfocus=this.blur() onClick="window.close()">
      </td>
      <td></td>
      <td bgcolor='#ffffff'></td>
    </tr>
    <tr>
      <td height=1 colspan=5 bgcolor="#ffffff"></td>
    </tr>
  </table>
</body>
</html>
````



### update.php

````php
<?
  session_start(); 
  @extract($_POST);
  @extract($_GET);
  @extract($_SESSION);

  include "../lib/dbconn.php";

  $sql = "update survey set $composer = $composer + 1"; // 선택한 필드 값을 1씩 증가
  mysql_query($sql, $connect);

  mysql_close();

  Header("location:result.php");
?>
````

<hr>


[servey-bbs.zip download](/assets/images/posts/2022/0225/survey-bbs.zip)
