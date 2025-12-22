---
title: "[PHP] 이미지 첨부 게시판"
date: 2022-02-22 10:35:00 +0900
categories: [PHP]
tags: [php]
render_with_liquid: false
math: true
mermaid: true
---

![alt text](/assets/images/posts/2022/0222/image-bbs-01.png)

### /concert/concert.sql

````sql
create table concert (
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


### /concert/list.php

````php
<?
  session_start();
  @extract($_POST);
  @extract($_GET);
  @extract($_SESSION);

  $table = "concert";	// sql문에서 table명을 변수로 처리
?>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>연주회소개 - 루바또</title>
  <link href="../css/common.css" rel="stylesheet" media="all">
  <link href="../css/concert.css" rel="stylesheet" media="all">
</head>
<?
  include "../lib/dbconn.php";

  if (!$scale)
    $scale = 10;  // 한 화면에 표시되는 글 수
  
  if ($mode=="search") {
    if (!$search) {
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
    $page = 1;
 
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
        <div id="title"><img src="../img/title_concert.gif"></div>

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

        <select name="scale" onchange="location.href='list.php?scale='+this.value">
          <option value=''>보기</option>
          <option value='1'>10</option>
          <option value='2'>15</option>
          <option value='3'>20</option>
          <option value='4'>30</option>
        </select>

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
              mysql_data_seek($result, $i);
              // 가져올 레코드로 위치(포인터) 이동  
              $row = mysql_fetch_array($result);
              // 하나의 레코드 가져오기

              $item_num     = $row[num];
              $item_id      = $row[id];
              $item_name    = $row[name];
              $item_nick    = $row[nick];
              $item_hit     = $row[hit];
              $item_date    = $row[regist_day];
              $item_date = substr($item_date, 0, 10);  
              $item_subject = str_replace(" ", "&nbsp;", $row[subject]);

              // 이미지 경로 가져오기
              if ($row[file_copied_0]) {	// 첨부된 첫번째 이미지가 있으면 해당 이미지
                $item_img = './data/'.$row[file_copied_0];
              } else {
                $item_img = './data/default.jpg';	// 이미지가 없으면 default.jpg
              }
          ?>
          <div id="list_item">
            <div id="list_item1"><?= $number ?></div>
            <div id="list_item2">
              <a href="view.php?table=<?=$table?>&num=<?=$item_num?>&page=<?=$page?>">
                <img src="<?=$item_img?>" alt="" width="50" height="50">
                <?= $item_subject ?>
              </a>
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

                    if ($mode=="search") {
                      echo "<a href='list.php?page=$i&scale=$scale&mode=search&find=$find&search=$search'> $i </a>"; 
                    } else {
                      echo "<a href='list.php?page=$i&scale=$scale'> $i </a>";
                    }
                  }
                }
              ?>
              &nbsp;&nbsp;&nbsp;&nbsp;다음 ▶
            </div>
            <div id="button">
              <a href="list.php?table=<?=$table?>&page=<?=$page?>"><img src="../img/list.png"></a>&nbsp;
              <? if($userid) { ?>
              <a href="write_form.php?table=<?=$table?>"><img src="../img/write.png"></a>
              <? } ?>
            </div>
          </div> <!-- end of page_button -->		
        </div> <!-- end of list content -->
        <div class="clear"></div>

      </div>
    </div>
  </div>

</body>
</html>
````


### /concert/write_form.php

- list에서 테이블명을 get방식으로 넘겨받는다.
- 파일 첨부 시 form에 `enctype="multipart/form-data"` 속성 필수
- 글 수정 시에는 `$mode=modify`를 넘겨받는다.

````php
<?
  session_start();
  @extract($_POST);
  @extract($_GET);
  @extract($_SESSION);
  // 새글쓰기 =>  $table=concert
  // 수정하기 => $table, $num, $page, $mode

  include "../lib/dbconn.php";

  if ($mode=="modify") {  //수정 글쓰기면

    $sql = "select * from $table where num=$num";
    $result = mysql_query($sql, $connect);

    $row = mysql_fetch_array($result);

    $item_subject = $row[subject];
    $item_content = $row[content];

    $item_file_0 = $row[file_name_0];
    $item_file_1 = $row[file_name_1];
    $item_file_2 = $row[file_name_2];

    $copied_file_0 = $row[file_copied_0];
    $copied_file_1 = $row[file_copied_1];
    $copied_file_2 = $row[file_copied_2];
  }
?>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>연주회소개 - 루바또</title>
  <link href="../css/common.css" rel="stylesheet" media="all">
  <link href="../css/concert.css" rel="stylesheet" media="all">
  <script>
    function check_input() {
      if (!document.board_form.subject.value) {
        alert("제목을 입력하세요!");
        document.board_form.subject.focus();
        return;
      }

      if (!document.board_form.content.value) {
        alert("내용을 입력하세요!");
        document.board_form.content.focus();
        return;
      }
      document.board_form.submit();
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
        <div id="title"><img src="../img/title_concert.gif"></div>
        <div class="clear"></div>
        <div id="write_form_title"><img src="../img/write_form_title.gif"></div>
        <div class="clear"></div>

        <? if ($mode=="modify") { ?>  // 수정하기 => insert.php 에 mode=modify와 num을 넘겨준다
        <form  name="board_form" method="post" action="insert.php?mode=modify&num=<?=$num?>&page=<?=$page?>&table=<?=$table?>" enctype="multipart/form-data">
        <? } else { ?>  // 새 글쓰기
        <form  name="board_form" method="post" action="insert.php?table=<?=$table?>" enctype="multipart/form-data"> 
        <? } ?>

          <div id="write_form">
            <div class="write_line"></div>
            <div id="write_row1">
              <div class="col1">별명</div>
              <div class="col2"><?=$usernick?></div>
              
              <? if( $userid && ($mode != "modify") ) { ?>  // 새글쓰기 에서만 HTML 쓰기가 보인다
              <div class="col3">
                <input type="checkbox" name="html_ok" id="html_ok" value="y">
                <label for="html_ok">HTML 쓰기</label>
              </div>
              <? } ?>
            </div>

            <div class="write_line"></div>
            <div id="write_row2">
              <div class="col1">제목</div>
              <div class="col2">
                <input type="text" name="subject" value="<?=$item_subject?>" >
              </div>
            </div>
            <div class="write_line"></div>

            <div id="write_row3">
              <div class="col1">내용</div>
              <div class="col2">
                <textarea rows="15" cols="79" name="content"><?=$item_content?></textarea>
              </div>
            </div>
            <div class="write_line"></div>

            <div id="write_row4">
              <div class="col1">이미지파일1</div>
              <div class="col2"><input type="file" name="upfile[]"></div>
            </div>
            <div class="clear"></div>

            <? if ($mode=="modify" && $item_file_0) { ?>  // 수정하기 및 0번파일이 있을 때
            <div class="delete_ok">
              <?=$item_file_0?> 파일이 등록되어 있습니다.
              <input type="checkbox" name="del_file[]" value="0"> 삭제
            </div>
            <div class="clear"></div>
            <? } ?>
            <div class="write_line"></div>

            <div id="write_row5">
              <div class="col1">이미지파일2</div>
              <div class="col2"><input type="file" name="upfile[]"></div>
            </div>

            <? if ($mode=="modify" && $item_file_1) { ?>  // 수정하기 및 1번파일이 있을 때
            <div class="delete_ok">
              <?=$item_file_1?> 파일이 등록되어 있습니다.
              <input type="checkbox" name="del_file[]" value="1"> 삭제
            </div>
            <div class="clear"></div>
            <? } ?>
            <div class="write_line"></div>
            <div class="clear"></div>

            <div id="write_row6">
              <div class="col1">이미지파일3</div>
              <div class="col2"><input type="file" name="upfile[]"></div>
            </div>

            <? if ($mode=="modify" && $item_file_2) { ?>  // 수정하기 및 2번파일이 있을 때
            <div class="delete_ok">
              <?=$item_file_2?> 파일이 등록되어 있습니다.
              <input type="checkbox" name="del_file[]" value="2"> 삭제
            </div>
            <div class="clear"></div>
            <? } ?>
            <div class="write_line"></div>
            <div class="clear"></div>
          </div>

          <div id="write_button">
            <a href="#"><img src="../img/ok.png" onclick="check_input()"></a>&nbsp;
            <a href="list.php?table=<?=$table?>&page=<?=$page?>"><img src="../img/list.png"></a>
          </div>
        </form>

      </div>
    </div>
  </div>

</body>
</html>
````


### /concert/insert.php

````php
<? session_start(); ?>
<meta charset="utf-8">
<?
  @extract($_POST);
  @extract($_GET);
  @extract($_SESSION);
  // 새글삽입 $table, 폼입력값, 세션변수
  // 수정하기 $table, 폼입력값, 세션변수, $mode, $num, $page

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
  /*   단일 파일 업로드 
    $upfile_name	 = $_FILES["upfile"]["name"];
    $upfile_tmp_name = $_FILES["upfile"]["tmp_name"];
    $upfile_type     = $_FILES["upfile"]["type"];
    $upfile_size     = $_FILES["upfile"]["size"];
    $upfile_error    = $_FILES["upfile"]["error"];
  */

  //$_FILES["upfile"]["name"][0];
  //$_FILES["upfile"]["name"][1];
  //$_FILES["upfile"]["name"][2];

  // 다중 파일 업로드
  $files = $_FILES["upfile"];
  //$files[0], $files[1], $files[2]
  $count = count($files["name"]); //업로드된 파일개수 3

  $upload_dir = './data/';  //업로드될 서버 저장경로

  for ($i=0; $i<$count; $i++) {
    $upfile_name[$i]     = $files["name"][$i];  // 실제 이미지 파일 이름 a1.jpg
    $upfile_tmp_name[$i] = $files["tmp_name"][$i];	// 임시파일이름.tmp
    $upfile_type[$i]     = $files["type"][$i];	// image/jpeg
    $upfile_size[$i]     = $files["size"][$i];	// 파일 용량
    $upfile_error[$i]    = $files["error"][$i];	// 에러유무

    $file = explode(".", $upfile_name[$i]); // a1.jpg
    $file_name = $file[0];  //a1
    $file_ext  = $file[1];  //jpg

    if (!$upfile_error[$i]) { //에러가 발생되지 않으면
      $new_file_name = date("Y_m_d_H_i_s");
      // 2019_03_22_10_07_15
      $new_file_name = $new_file_name."_".$i;
      // 2019_03_22_10_07_15_0
      $copied_file_name[$i] =    $new_file_name.".".$file_ext;  
      // 2019_03_22_10_07_15_0.jpg
      $uploaded_file[$i] =    $upload_dir.$copied_file_name[$i];
      // ./data/2019_03_22_10_07_15_0.jpg

      if ( $upfile_size[$i]  > 500000 ) {	// 정확히 하려면 1024 x 500
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
        ($upfile_type[$i] != "image/pjpeg") &&
        ($upfile_type[$i] != "image/png") &&
        ($upfile_type[$i] != "image/x-png")
      ) {
        echo("
          <script>
            alert('JPG와 GIF, PNG 이미지 파일만 업로드 가능합니다!');
            history.go(-1)
          </script>
        ");
        exit;
      }

      if (!move_uploaded_file($upfile_tmp_name[$i], $uploaded_file[$i]) ) {
        // move_uploaded_file(임시저장파일명,실제저장할 서버경로 파일명 )    => 파일 업로드
        //파일을 업로드하고 업로그 처리가 안되었을때 메시    
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

  include "../lib/dbconn.php";

  if ($mode=="modify") {  // 수정일때

    $num_checked = count($_POST['del_file']);	// 3 (삭제 checkbox의 value 갯수)
    $position = $_POST['del_file'];

    for($i=0; $i<$num_checked; $i++) {  // delete checked item
      $index = $position[$i];	// 0 1 2 (삭제 checkbox의 value값)
      $del_ok[$index] = "y";
      // $del_ok[0]='y', $del_ok[1]='y', $del_ok[2]='y'
    }

    $sql = "select * from $table where num=$num";   // get target record
    $result = mysql_query($sql);
    $row = mysql_fetch_array($result);

    for ($i=0; $i<$count; $i++) { // 3 (업데이트 된 파일 갯수)

      $field_org_name = "file_name_".$i;	// file_name_0
      $field_real_name = "file_copied_".$i;	// file_copied_0

      $org_name_value = $upfile_name[$i];	// a1.jpg
      $org_real_value = $copied_file_name[$i];	// 2022_02_22_10_43_01_0.jpg

      if ($del_ok[$i] == "y") { // 삭제 체크 된 것이 있으면
    
        $delete_field = "file_copied_".$i;	// file_copied_0
        $delete_name = $row[$delete_field];	// $row[file_copied_0] -> 2022_02_22_10_43_01_0.jpg

        $delete_path = "./data/".$delete_name;	// 경로

        unlink($delete_path); 	// 업로드 파일 삭제

        $sql = "update $table set $field_org_name = '$org_name_value', $field_real_name = '$org_real_value'  where num=$num";
        mysql_query($sql, $connect);  // $sql 에 저장된 명령 실행

      } else {  // 첨부파일 삭제를 하지 않았을 경우
    
        if (!$upfile_error[$i]) {
          $sql = "update $table set $field_org_name = '$org_name_value', $field_real_name = '$org_real_value'  where num=$num";
          mysql_query($sql, $connect);  // $sql 에 저장된 명령 실행
        }
      }
    }
      
    $subject = htmlspecialchars($subject);
    $content = htmlspecialchars($content);
    $subject = str_replace("'", "&#039;", $subject);
    $content = str_replace("'", "&#039;", $content);

    $sql = "update $table set subject='$subject', content='$content' where num=$num";
    mysql_query($sql, $connect);  // $sql 에 저장된 명령 실행

  } else {
    if ($html_ok=="y") {
      $is_html = "y";
    } else {
      $is_html = "";
    }

    $subject = htmlspecialchars($subject);
    $content = htmlspecialchars($content);
    $subject = str_replace("'", "&#039;", $subject);
    $content = str_replace("'", "&#039;", $content);

    $sql = "insert into $table (id, name, nick, subject, content, regist_day, hit, is_html, ";
    $sql .= " file_name_0, file_name_1, file_name_2, file_copied_0,  file_copied_1, file_copied_2) ";
    $sql .= "values('$userid', '$username', '$usernick', '$subject', '$content', '$regist_day', 0, '$is_html', ";
    $sql .= "'$upfile_name[0]', '$upfile_name[1]',  '$upfile_name[2]', '$copied_file_name[0]', '$copied_file_name[1]','$copied_file_name[2]')";
    mysql_query($sql, $connect);  // $sql 에 저장된 명령 실행
  }

  mysql_close();

  echo "
    <script>
      location.href = 'list.php?table=$table&page=$page';
    </script>
  ";
?>
````


### /concert/view.php

- DB에 연결하여 해당 num에 맞는 레코드를 검색해(select문) 가져온다.
- 가져온 레코드의 정보(`$row[]`)를 해당 변수에 넣는다.
- 제목과 컨텐츠텍스트의 특수문자를 대체문자로 변경한다. (에러방지)
- `GetImageSize()` 함수를 이용해, 파일의 사이즈, 종류를 가져온 후 사이트 너비보다 크다면 줄여준다.
- 해당 위치에 뿌려준다.

````php
<?
  session_start();
  @extract($_POST);
  @extract($_GET);
  @extract($_SESSION);
  // $table, $num, $page, 세션변수

  include "../lib/dbconn.php";

  $sql = "select * from $table where num=$num";
  $result = mysql_query($sql, $connect);

  $row = mysql_fetch_array($result);
  // 하나의 레코드 가져오기

  $item_num     = $row[num];
  $item_id      = $row[id];
  $item_name    = $row[name];
  $item_nick    = $row[nick];
  $item_hit     = $row[hit];

  $image_name[0]   = $row[file_name_0];
  $image_name[1]   = $row[file_name_1];
  $image_name[2]   = $row[file_name_2];


  $image_copied[0] = $row[file_copied_0];	// 2022_02_22_10_43_01_0.jpg
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

    if ($image_copied[$i]) {  //업로드한 파일이 존재하면 0 1 2
      $imageinfo = GetImageSize("./data/".$image_copied[$i]);
      //GetImageSize(서버에 업로드된 파일 경로 파일명)
      // => 파일의 너비와 높이값, 종류
      $image_width[$i] = $imageinfo[0];  //파일너비
      $image_height[$i] = $imageinfo[1]; //파일높이
      $image_type[$i]  = $imageinfo[2];  //파일종류

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
?>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>연주회소개 - 루바또</title>
  <link href="../css/common.css" rel="stylesheet" media="all">
  <link href="../css/concert.css" rel="stylesheet" media="all">
  <script>
    function del(href) {
      if (confirm("한번 삭제한 자료는 복구할 방법이 없습니다.\n\n정말 삭제하시겠습니까?")) {
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
        <div id="title"><img src="../img/title_concert.gif"></div>
        <div id="view_comment"> &nbsp;</div>

        <div id="view_title">
          <div id="view_title1"><?= $item_subject ?></div>
          <div id="view_title2"><?= $item_nick ?> | 조회 : <?= $item_hit ?> | <?= $item_date ?></div>	
        </div>

        <div id="view_content">
          <?
            for ($i=0; $i<3; $i++) { //업로드된 이미지를 출력한다
          
              if ($image_copied[$i]) {  // 첨부된 파일이 있으면
                $img_name = $image_copied[$i];
                $img_name = "./data/".$img_name; 
                // ./data/2019_03_22_10_07_15_0.jpg
                $img_width = $image_width[$i];

                echo "<img src='$img_name' width='$img_width'>"."<br><br>";
              }
            }
          ?>
          <?= $item_content ?>
        </div>

        <div id="view_button">
          <a href="list.php?table=<?=$table?>&page=<?=$page?>"><img src="../img/list.png"></a>&nbsp;
        
          <? if($userid==$item_id || $userid=="admin" || $userlevel==1 ) { ?>
            <a href="write_form.php?table=<?=$table?>&mode=modify&num=<?=$num?>&page=<?=$page?>"><img src="../img/modify.png"></a>&nbsp;
            <a href="javascript:del('delete.php?table=<?=$table?>&num=<?=$num?>')"><img src="../img/delete.png"></a>&nbsp;
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



### /concert/delete.php

- `$num` 변수로 파일을 삭제한다. 여기서 주의할 점은 첨부된 이미지도 함께 삭제 해줘야 한다는 것이다.
- 파일삭제는 `unlink()` 함수로 한다.

````php
<?
  session_start();
  @extract($_POST);
  @extract($_GET);
  @extract($_SESSION);
  //$table, $num, 세션변수

  include "../lib/dbconn.php";

  $sql = "select * from $table where num = $num";
  $result = mysql_query($sql, $connect);

  $row = mysql_fetch_array($result);

  $copied_name[0] = $row[file_copied_0];
  $copied_name[1] = $row[file_copied_1];
  $copied_name[2] = $row[file_copied_2];

  for ($i=0; $i<3; $i++) {  //업로드된 파일 삭제
  
    if ($copied_name[$i]) {
      $image_name = "./data/".$copied_name[$i];
      unlink($image_name);
      //unlink(업드로된 파일경로 파일명); => 파일삭제
    }
  }

  $sql = "delete from $table where num = $num";
  mysql_query($sql, $connect);

  mysql_close();

  echo "
    <script>
      location.href = 'list.php?table=$table';
    </script>
  ";
?>
````
