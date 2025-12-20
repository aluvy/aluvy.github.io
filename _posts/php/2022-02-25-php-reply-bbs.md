---
title: "[PHP] 댓글 게시판"
date: 2022-02-25 10:13:00 +0900
categories: [PHP]
tags: [PHP]
render_with_liquid: false
math: true
mermaid: true
---


## 댓글 게시판
- 글쓰기, 글저장, 글수정, 글삭제 기능
- 세 개의 이미지 파일 업로드 가능
- 글 내용 보기 페이지에 댓글 쓰기 기능 추가
- 글 목록 페이지의 글 제목 뒤에 댓글의 개수 표시
 

## 특징
- free.sql, free_ripple.sql DB table 2개 사용
- insert, insert_ripple 2개 사용
- delete, delete_ripple 2개 사용


### free.sql

````sql
create table free (
  num int not null auto_increment,
  id char(15) not null,
  name  char(10) not null,
  nick  char(10) not null,
  subject char(100) not null,
  content text not null,
  regist_day char(20),
  hit int,
  is_html char(1),
  file_name_0 char(40),
  file_name_1 char(40),
  file_name_2 char(40),
  file_name_3 char(40),
  file_name_4 char(40),
  file_copied_0 char(30),
  file_copied_1 char(30),
  file_copied_2 char(30),
  file_copied_3 char(30),
  file_copied_4 char(30), 
  primary key(num)
);
````


### free_ripple.spl

````sql
create table free_ripple (
  num int not null auto_increment,
  parent int not null,
  id char(15) not null,
  name  char(10) not null,
  nick  char(10) not null,
  content text not null,
  regist_day char(20),
  primary key(num)
);
````


### list.php

````php
<?
  session_start(); 
  @extract($_POST);
  @extract($_GET);
  @extract($_SESSION);

  $table = "free";
  $ripple = "free_ripple";
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link href="../css/common.css" rel="stylesheet" media="all">
  <link href="../css/board4.css" rel="stylesheet" media="all">
</head>
<?
  include "../lib/dbconn.php";
  $scale=10;			// 한 화면에 표시되는 글 수

  if ($mode=="search") {
    if(!$search) {
      echo("
        <script>
          window.alert('검색할 단어를 입력해 주세요!');
          history.go(-1);
        </script>
      ");
      exit;
    }
    $sql = "select * from $table where $find like '%$search%' order by num desc";

  } else {
    $sql = "select * from $table order by num desc";
  }

  $result = mysql_query($sql, $connect);
  $total_record = mysql_num_rows($result); // 전체 글 수

  // 전체 페이지 수($total_page) 계산 
  if ($total_record % $scale == 0)
    $total_page = floor($total_record/$scale);      
  else
    $total_page = floor($total_record/$scale) + 1; 

  if (!$page)                 // 페이지번호($page)가 0 일 때
    $page = 1;              // 페이지 번호를 1로 초기화

  // 표시할 페이지($page)에 따라 $start 계산  
  $start = ($page - 1) * $scale;      
  $number = $total_record - $start;
?>
<body>
  <div id="wrap">
    <div id="header"><? include "../lib/top_login2.php"; ?></div>
    <div id="menu"><? include "../lib/top_menu2.php"; ?></div>

    <div id="content">
      <div id="col1">
        <div id="left_menu"><? include "../lib/left_menu.php"; ?></div>
      </div>

      <div id="col2">        
        <div id="title"><img src="../img/title_free.gif"></div>

        <form  name="board_form" method="post" action="list.php?table=<?=$table?>&mode=search"> 
          <div id="list_search">
            <div id="list_search1">▷ 총 <?= $total_record ?> 개의 게시물이 있습니다.  </div>
            <div id="list_search2"><img src="../img/select_search.gif"></div>
            <div id="list_search3">
              <select name="find">
                <option value='subject'>제목</option>
                <option value='content'>내용</option>
                <option value='nick'>별명</option>
                <option value='name'>이름</option>
              </select>
            </div>
            <div id="list_search4"><input type="text" name="search"></div>
            <div id="list_search5"><input type="image" src="../img/list_search_button.gif"></div>
          </div>
        </form>
        <div class="clear"></div>

        <div id="list_top_title">
          <ul>
            <li id="list_title1"><img src="../img/list_title1.gif"></li>
            <li id="list_title2"><img src="../img/list_title2.gif"></li>
            <li id="list_title3"><img src="../img/list_title3.gif"></li>
            <li id="list_title4"><img src="../img/list_title4.gif"></li>
            <li id="list_title5"><img src="../img/list_title5.gif"></li>
          </ul>
        </div>

        <div id="list_content">
          <?
            for ($i=$start; $i<$start+$scale && $i < $total_record; $i++) {
              mysql_data_seek($result, $i);     // 포인터 이동        
              $row = mysql_fetch_array($result); // 하나의 레코드 가져오기	      

              $item_num     = $row[num];
              $item_id      = $row[id];
              $item_name    = $row[name];
              $item_nick    = $row[nick];
              $item_hit     = $row[hit];
              $item_date    = $row[regist_day];
              $item_date = substr($item_date, 0, 10);  
              $item_subject = str_replace(" ", "&nbsp;", $row[subject]);

              $sql = "select * from $ripple where parent=$item_num";
              $result2 = mysql_query($sql, $connect);
              $num_ripple = mysql_num_rows($result2);
          ?>
          <div id="list_item">
            <div id="list_item1"><?= $number ?></div>
            <div id="list_item2">
              <a href="view.php?table=<?=$table?>&num=<?=$item_num?>&page=<?=$page?>"><?= $item_subject ?></a>
              <?
                if ($num_ripple)
                echo " [$num_ripple]";
              ?>
            </div>
            <div id="list_item3"><?= $item_nick ?></div>
            <div id="list_item4"><?= $item_date ?></div>
            <div id="list_item5"><?= $item_hit ?></div>
          </div>
          <?
              $number--;
            }
          ?>

          <div id="page_button">
            <div id="page_num">
              ◀ 이전 &nbsp;&nbsp;&nbsp;&nbsp; 
              <?
                // 게시판 목록 하단에 페이지 링크 번호 출력
                for ($i=1; $i<=$total_page; $i++) {
                  if ($page == $i) {  // 현재 페이지 번호 링크 안함
                    echo "<b> $i </b>";
                  } else {
                    echo "<a href='list.php?table=$table&page=$i'> $i </a>";
                  }
                }
              ?>			
              &nbsp;&nbsp;&nbsp;&nbsp;다음 ▶
            </div>
            <div id="button">
              <a href="list.php?table=<?=$table?>&page=<?=$page?>"><img src="../img/list.png"></a>&nbsp;
              <? if ($userid) { ?>
              <a href="write_form.php?table=<?=$table?>"><img src="../img/write.png"></a>
              <? } ?>
            </div>
          </div>
        </div>

      <div class="clear"></div>

      </div>
    </div>
  </div>
</body>
</html>
````

### list.php

````php
<?
  session_start(); 
  @extract($_POST);
  @extract($_GET);
  @extract($_SESSION);

  $table = "free";
  $ripple = "free_ripple";
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link href="../css/common.css" rel="stylesheet" media="all">
  <link href="../css/board4.css" rel="stylesheet" media="all">
</head>
<?
  include "../lib/dbconn.php";
  $scale=10;			// 한 화면에 표시되는 글 수

  if ($mode=="search") {
    if(!$search) {
      echo("
        <script>
          window.alert('검색할 단어를 입력해 주세요!');
          history.go(-1);
        </script>
      ");
      exit;
    }
    $sql = "select * from $table where $find like '%$search%' order by num desc";

  } else {
    $sql = "select * from $table order by num desc";
  }

  $result = mysql_query($sql, $connect);
  $total_record = mysql_num_rows($result); // 전체 글 수

  // 전체 페이지 수($total_page) 계산 
  if ($total_record % $scale == 0)
    $total_page = floor($total_record/$scale);      
  else
    $total_page = floor($total_record/$scale) + 1; 

  if (!$page)                 // 페이지번호($page)가 0 일 때
    $page = 1;              // 페이지 번호를 1로 초기화

  // 표시할 페이지($page)에 따라 $start 계산  
  $start = ($page - 1) * $scale;      
  $number = $total_record - $start;
?>
<body>
  <div id="wrap">
  <div id="header"><? include "../lib/top_login2.php"; ?></div>
  <div id="menu"><? include "../lib/top_menu2.php"; ?></div>

    <div id="content">
      <div id="col1">
        <div id="left_menu"><? include "../lib/left_menu.php"; ?></div>
      </div>

      <div id="col2">        
        <div id="title"><img src="../img/title_free.gif"></div>

        <form  name="board_form" method="post" action="list.php?table=<?=$table?>&mode=search"> 
          <div id="list_search">
            <div id="list_search1">▷ 총 <?= $total_record ?> 개의 게시물이 있습니다.  </div>
            <div id="list_search2"><img src="../img/select_search.gif"></div>
            <div id="list_search3">
              <select name="find">
                <option value='subject'>제목</option>
                <option value='content'>내용</option>
                <option value='nick'>별명</option>
                <option value='name'>이름</option>
              </select>
            </div>
            <div id="list_search4"><input type="text" name="search"></div>
            <div id="list_search5"><input type="image" src="../img/list_search_button.gif"></div>
          </div>
        </form>
        <div class="clear"></div>

        <div id="list_top_title">
          <ul>
            <li id="list_title1"><img src="../img/list_title1.gif"></li>
            <li id="list_title2"><img src="../img/list_title2.gif"></li>
            <li id="list_title3"><img src="../img/list_title3.gif"></li>
            <li id="list_title4"><img src="../img/list_title4.gif"></li>
            <li id="list_title5"><img src="../img/list_title5.gif"></li>
          </ul>
        </div>

        <div id="list_content">
          <?
            for ($i=$start; $i<$start+$scale && $i < $total_record; $i++) {
              mysql_data_seek($result, $i);     // 포인터 이동        
              $row = mysql_fetch_array($result); // 하나의 레코드 가져오기	      

              $item_num     = $row[num];
              $item_id      = $row[id];
              $item_name    = $row[name];
              $item_nick    = $row[nick];
              $item_hit     = $row[hit];
              $item_date    = $row[regist_day];
              $item_date = substr($item_date, 0, 10);  
              $item_subject = str_replace(" ", "&nbsp;", $row[subject]);

              $sql = "select * from $ripple where parent=$item_num"; // 추가 $item_num=메인게시글의 num
              $result2 = mysql_query($sql, $connect); // 추가
              $num_ripple = mysql_num_rows($result2); // 추가 해당 메인게시글의 댓글의 갯수
          ?>
          <div id="list_item">
            <div id="list_item1"><?= $number ?></div>
            <div id="list_item2">
              <a href="view.php?table=<?=$table?>&num=<?=$item_num?>&page=<?=$page?>"><?= $item_subject ?></a>
              <?
                if ($num_ripple) {	// 댓글이 있으면
                  echo " [$num_ripple]";
                }
              ?>
            </div>
            <div id="list_item3"><?= $item_nick ?></div>
            <div id="list_item4"><?= $item_date ?></div>
            <div id="list_item5"><?= $item_hit ?></div>
          </div>
          <?
              $number--;
            }
          ?>
          <div id="page_button">
            <div id="page_num">
              ◀ 이전 &nbsp;&nbsp;&nbsp;&nbsp; 
              <?
                // 게시판 목록 하단에 페이지 링크 번호 출력
                for ($i=1; $i<=$total_page; $i++) {
                  if ($page == $i) {  // 현재 페이지 번호 링크 안함
                    echo "<b> $i </b>";
                  } else {
                    echo "<a href='list.php?table=$table&page=$i'> $i </a>";
                  }
                }
              ?>			
              &nbsp;&nbsp;&nbsp;&nbsp;다음 ▶
            </div>
            <div id="button">
              <a href="list.php?table=<?=$table?>&page=<?=$page?>"><img src="../img/list.png"></a>&nbsp;
              <? if ($userid) { ?>
              <a href="write_form.php?table=<?=$table?>"><img src="../img/write.png"></a>
              <? } ?>
            </div>
          </div>
        </div>
        <div class="clear"></div>

      </div>
    </div>
  </div>
</body>
</html>
````


### view.php

````php
<? 
  session_start(); 
  @extract($_POST);
  @extract($_GET);
  @extract($_SESSION);

  include "../lib/dbconn.php";

  $sql = "select * from $table where num=$num";
  $result = mysql_query($sql, $connect);
  $row = mysql_fetch_array($result);       

  $item_num     = $row[num];
  $item_id      = $row[id];
  $item_name    = $row[name];
  $item_nick    = $row[nick];
  $item_hit     = $row[hit];

  $image_name[0]   = $row[file_name_0];
  $image_name[1]   = $row[file_name_1];
  $image_name[2]   = $row[file_name_2];
  $image_copied[0] = $row[file_copied_0];
  $image_copied[1] = $row[file_copied_1];
  $image_copied[2] = $row[file_copied_2];

  $item_date    = $row[regist_day];
  $item_subject = str_replace(" ", "&nbsp;", $row[subject]);
  $item_content = $row[content];
  $is_html      = $row[is_html];

  if ($is_html!="y") {
    $item_content = str_replace(" ", "&nbsp;", $item_content);
    $item_content = str_replace("\n", "<br>", $item_content);
  }	

  for ($i=0; $i<3; $i++) {
    if ($image_copied[$i]) {
      $imageinfo = GetImageSize("./data/".$image_copied[$i]);
      $image_width[$i] = $imageinfo[0];
      $image_height[$i] = $imageinfo[1];
      $image_type[$i]  = $imageinfo[2];

      if ($image_width[$i] > 785)
        $image_width[$i] = 785;

    } else {
    $image_width[$i] = "";
    $image_height[$i] = "";
    $image_type[$i]  = "";
    }
  }
  $new_hit = $item_hit + 1;
  $sql = "update $table set hit=$new_hit where num=$num";   // 글 조회수 증가시킴
  mysql_query($sql, $connect);

  $ripple = "free_ripple";
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link href="../css/common.css" rel="stylesheet" media="all">
  <link href="../css/board4.css" rel="stylesheet" media="all">
  <script>
    function check_input() {  // 추가함수
    
      if (!document.ripple_form.ripple_content.value) {
        alert("내용을 입력하세요!");    
        document.ripple_form.ripple_content.focus();
        return;
      }
      document.ripple_form.submit();
    }

    function del(href)  {
      if(confirm("한번 삭제한 자료는 복구할 방법이 없습니다.\n\n정말 삭제하시겠습니까?")) {
        document.location.href = href;
      }
    }
  </script>
</head>

<body>
  <div id="wrap">
    <div id="header"><? include "../lib/top_login2.php"; ?></div>
    <div id="menu"><? include "../lib/top_menu2.php"; ?></div>

    <div id="content">
      <div id="col1">
        <div id="left_menu"><? include "../lib/left_menu.php"; ?></div>
      </div>

      <div id="col2">        
        <div id="title"><img src="../img/title_free.gif"></div>

        <div id="view_comment"> &nbsp;</div>
        <div id="view_title">
          <div id="view_title1"><?= $item_subject ?></div>
          <div id="view_title2"><?= $item_nick ?> | 조회 : <?= $item_hit ?> | <?= $item_date ?> </div>	
        </div>

        <div id="view_content">
          <?
            for ($i=0; $i<3; $i++) {
              if ($image_copied[$i]) {
                $img_name = $image_copied[$i];
                $img_name = "./data/".$img_name;
                $img_width = $image_width[$i];

                echo "<img src='$img_name' width='$img_width'>"."<br><br>";
              }
            }
          ?>
          <?= $item_content ?>
        </div>

        <!-- 댓글보기 및 댓글입력 추가 : 시작 -->
        <div id="ripple">
          <?
            $sql = "select * from $ripple where parent='$item_num'";
            $ripple_result = mysql_query($sql);

            while ($row_ripple = mysql_fetch_array($ripple_result)) {
            $ripple_num     = $row_ripple[num];
            $ripple_id      = $row_ripple[id];
            $ripple_nick    = $row_ripple[nick];
            $ripple_content = str_replace("\n", "<br>", $row_ripple[content]);
            $ripple_content = str_replace(" ", "&nbsp;", $ripple_content);
            $ripple_date    = $row_ripple[regist_day];
          ?>
          <div id="ripple_writer_title">
            <ul>
              <li id="writer_title1"><?=$ripple_nick?></li>
              <li id="writer_title2"><?=$ripple_date?></li>
              <li id="writer_title3">
                <? 
                  if ($userid==$ripple_id || $userid=="admin" || $userlevel==1) {	// 관리자, 글쓴이만 삭제 가능
                    echo "<a href='delete_ripple.php?table=$table&num=$item_num&ripple_num=$ripple_num'>[삭제]</a>";
                  }
                ?>
              </li>
            </ul>
          </div>
          <div id="ripple_content"><?=$ripple_content?></div>
          <div class="hor_line_ripple"></div>
          <? } ?>

          <form name="ripple_form" method="post" action="insert_ripple.php?table=<?=$table?>&num=<?=$item_num?>">  
            <div id="ripple_box">
              <div id="ripple_box1"><img src="../img/title_comment.gif"></div>
              <div id="ripple_box2">
                <?	
                  if ($userid) {
                    echo "<textarea rows='5' cols='65' name='ripple_content'></textarea>";
                  } else {
                    echo "<textarea rows='5' cols='65' placeholder='로그인 후 이용하세요' name='ripple_content' readonly></textarea>";
                  }
                ?>
              </div>
              <div id="ripple_box3"><a href="#"><img src="../img/ok_ripple.gif"  onclick="check_input()"></a></div>
            </div>
          </form>
        </div><!-- end of ripple -->
        <!-- 댓글보기 및 댓글입력 추가 : 끝 -->


        <div id="view_button">
         <a href="list.php?table=<?=$table?>&page=<?=$page?>"><img src="../img/list.png"></a>

          <? if($userid && ($userid==$item_id)) { ?>
          <a href="write_form.php?table=<?=$table?>&mode=modify&num=<?=$num?>&page=<?=$page?>"><img src="../img/modify.png"></a>
          <a href="javascript:del('delete.php?table=<?=$table?>&num=<?=$num?>')"><img src="../img/delete.png"></a>
          <? } ?>

          <? if($userid) { ?>
          <a href="write_form.php?table=<?=$table?>"><img src="../img/write.png"></a>
          <? } ?>
        </div>
        <div class="clear"></div>

      </div>
    </div>
  </div>
</body>
</html>
````


### insert.php


````php
<? session_start(); ?>

<meta charset="utf-8">
<?
  @extract($_POST);
  @extract($_GET);
  @extract($_SESSION);

  if(!$userid) {
    echo("
      <script>
        window.alert('로그인 후 이용해 주세요.')
        history.go(-1)
      </script>
    ");
    exit;
  }

  $regist_day = date("Y-m-d (H:i)");  // 현재의 '년-월-일-시-분'을 저장

  // 다중 파일 업로드
  $files = $_FILES["upfile"];
  $count = count($files["name"]);
  $upload_dir = './data/';

  for ($i=0; $i<$count; $i++) {
    $upfile_name[$i]     = $files["name"][$i];
    $upfile_tmp_name[$i] = $files["tmp_name"][$i];
    $upfile_type[$i]     = $files["type"][$i];
    $upfile_size[$i]     = $files["size"][$i];
    $upfile_error[$i]    = $files["error"][$i];

    $file = explode(".", $upfile_name[$i]);
    $file_name = $file[0];
    $file_ext  = $file[1];

    if (!$upfile_error[$i]) {
      $new_file_name = date("Y_m_d_H_i_s");
      $new_file_name = $new_file_name."_".$i;
      $copied_file_name[$i] = $new_file_name.".".$file_ext;      
      $uploaded_file[$i] = $upload_dir.$copied_file_name[$i];

      if ( $upfile_size[$i]  > 500000 ) {
        echo("
          <script>
            alert('업로드 파일 크기가 지정된 용량(500KB)을 초과합니다!<br>파일 크기를 체크해주세요! ');
            history.go(-1)
          </script>
        ");
        exit;
      }

      if (
          ($upfile_type[$i] != "image/gif") &&
          ($upfile_type[$i] != "image/jpeg") &&
          ($upfile_type[$i] != "image/pjpeg")
        )
      {
        echo("
          <script>
            alert('JPG와 GIF 이미지 파일만 업로드 가능합니다!');
            history.go(-1)
          </script>
        ");
        exit;
      }

      if (!move_uploaded_file($upfile_tmp_name[$i], $uploaded_file[$i]) ) {
        echo("
          <script>
            alert('파일을 지정한 디렉토리에 복사하는데 실패했습니다.');
            history.go(-1)
          </script>
        ");
        exit;
      }
    }
  }
  include "../lib/dbconn.php";       // dconn.php 파일을 불러옴

  if ($mode=="modify") {
    $num_checked = count($_POST['del_file']);
    $position = $_POST['del_file'];

    for($i=0; $i<$num_checked; $i++) {                      // delete checked item  
      $index = $position[$i];
      $del_ok[$index] = "y";
    }

    $sql = "select * from $table where num=$num";   // get target record
    $result = mysql_query($sql);
    $row = mysql_fetch_array($result);

    for ($i=0; $i<$count; $i++) {					// update DB with the value of file input box

      $field_org_name = "file_name_".$i;
      $field_real_name = "file_copied_".$i;

      $org_name_value = $upfile_name[$i];
      $org_real_value = $copied_file_name[$i];
      
      if ($del_ok[$i] == "y") {
        $delete_field = "file_copied_".$i;
        $delete_name = $row[$delete_field];				
        $delete_path = "./data/".$delete_name;

        unlink($delete_path);

        $sql = "update $table set $field_org_name = '$org_name_value', $field_real_name = '$org_real_value'  where num=$num";
        mysql_query($sql, $connect);  // $sql 에 저장된 명령 실행

      } else {

        if (!$upfile_error[$i]) {
          $sql = "update $table set $field_org_name = '$org_name_value', $field_real_name = '$org_real_value'  where num=$num";
          mysql_query($sql, $connect);  // $sql 에 저장된 명령 실행					
        }
      }
    }

    $sql = "update $table set subject='$subject', content='$content' where num=$num";
    mysql_query($sql, $connect);  // $sql 에 저장된 명령 실행

  } else {
    if ($html_ok=="y") {
      $is_html = "y";
    } else {
      $is_html = "";
      $content = htmlspecialchars($content);
    }

    $sql = "insert into $table (id, name, nick, subject, content, regist_day, hit, is_html, ";
    $sql .= " file_name_0, file_name_1, file_name_2, file_copied_0,  file_copied_1, file_copied_2) ";
    $sql .= "values('$userid', '$username', '$usernick', '$subject', '$content', '$regist_day', 0, '$is_html', ";
    $sql .= "'$upfile_name[0]', '$upfile_name[1]',  '$upfile_name[2]', '$copied_file_name[0]', '$copied_file_name[1]','$copied_file_name[2]')";
    mysql_query($sql, $connect);  // $sql 에 저장된 명령 실행
  }
  mysql_close();                // DB 연결 끊기

  echo "
    <script>
      location.href = 'list.php?table=$table&page=$page';
    </script>
  ";
?>
````



### insert_ripple.php

````php
<? session_start(); ?>
<meta charset="utf-8">
<?
  @extract($_POST);
  @extract($_GET);
  @extract($_SESSION);

  /*
    table=부모테이블명 (get)
    num=부모테이블글번호 (get)
    ripple_content=리플콘텐츠 (post)
  */

  if (!$userid) {
    echo("
      <script>
        window.alert('로그인 후 이용하세요.')
        history.go(-1)
      </script>
    ");
    exit;
  }
  include "../lib/dbconn.php";       // dconn.php 파일을 불러옴

  $regist_day = date("Y-m-d (H:i)");  // 현재의 '년-월-일-시-분'을 저장

  // 레코드 삽입 명령
  $sql = "insert into free_ripple (parent, id, name, nick, content, regist_day) ";
  $sql .= "values($num, '$userid', '$username', '$usernick', '$ripple_content', '$regist_day')";    

  mysql_query($sql, $connect);  // $sql 에 저장된 명령 실행
  mysql_close();                // DB 연결 끊기

  echo "
    <script>
      location.href = 'view.php?table=$table&num=$num';
    </script>
  ";
?>
````



### delete.php

````php
<?
  session_start();
  @extract($_POST);
  @extract($_GET);
  @extract($_SESSION);

  $ripple = "free_ripple";

  /*
    $table=free (메인테이블) get
    $num=
  */

  include "../lib/dbconn.php";

  $sql = "select * from $table where num = $num";
  $result = mysql_query($sql, $connect);

  $row = mysql_fetch_array($result);

  $copied_name[0] = $row[file_copied_0];
  $copied_name[1] = $row[file_copied_1];
  $copied_name[2] = $row[file_copied_2];

  for ($i=0; $i<3; $i++) {
    if ($copied_name[$i]) {
      $image_name = "./data/".$copied_name[$i];
      unlink($image_name);
    }
  }

  $sql = "delete from $table where num = $num";
  mysql_query($sql, $connect);

  $sql = "delete from $ripple where parent=$num"; // 추가
  mysql_query($sql, $connect); // 추가

  mysql_close();

  echo "
    <script>
      location.href = 'list.php?table=$table';
    </script>
  ";
?>
````



### delete_ripple.php

````php
<?
  @extract($_POST);
  @extract($_GET);
  @extract($_SESSION);
  /*
  table=$table (get)
  num=$item_num (본글 글번호) **** (get)

  ripple_num=$ripple_num(리플 글번호) (get)
  */

  include "../lib/dbconn.php";

  $sql = "delete from free_ripple where num=$ripple_num";
  mysql_query($sql, $connect);
  mysql_close();

  echo "
    <script>
      location.href = 'view.php?table=$table&num=$num';
    </script>
  ";
?>
````

<hr>

[reply-bbs.zip download](/assets/images/posts/2022/0225/reply-bbs.zip)
