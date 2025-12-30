---
title: "[PHP] 다운로드 게시판"
date: 2022-02-24 10:35:00 +0900
categories: [PHP]
tags: [php]
render_with_liquid: false
math: true
mermaid: true
---

![alt text](/assets/images/posts/2022/02/24/download-bbs-01.png)


### download.sql

- file 첨부에 필요한 filed
  - 첨부되는 실제 파일 이름
  - 실제 업로드된 파일
  - 파일의 타입

````sql
create table download (
  num int not null auto_increment,
  id char(15) not null,
  name  char(10) not null,
  nick  char(10) not null,
  subject char(100) not null,
  content text not null,
  regist_day char(20),
  hit int,
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
  file_type_0 char(30),
  file_type_1 char(30),
  file_type_2 char(30),
  file_type_3 char(30),
  file_type_4 char(30),
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

  $table = "download";
?>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>다운로드</title>
  <link href="../css/common.css" rel="stylesheet" media="all">
  <link href="../css/board3.css" rel="stylesheet" media="all">
</head>
<?
  include "../lib/dbconn.php";

  $scale=10;			// 한 화면에 표시되는 글 수

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
  if ($total_record % $scale == 0) {
    $total_page = floor($total_record/$scale);
  } else {
    $total_page = floor($total_record/$scale) + 1;
  }

  if (!$page) { // 페이지번호($page)가 0 일 때
    $page = 1;
  }              // 페이지 번호를 1로 초기화

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
        <div id="title"><img src="../img/title_download.gif"></div>

        <form  name="board_form" method="post" action="list.php?table=<?=$table?>&mode=search"> 
          <div id="list_search">
            <div id="list_search1">▷ 총 <?= $total_record ?> 개의 게시물이 있습니다.</div>
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
          ?>
          <div id="list_item">
            <div id="list_item1"><?= $number ?></div>
            <div id="list_item2">
              <a href="view.php?table=<?=$table?>&num=<?=$item_num?>&page=<?=$page?>">
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



### write_form.php

파일 첨부 시 form에 enctype="multipart/form-data" 필수

````php
<?
  session_start(); 
  @extract($_POST);
  @extract($_GET);
  @extract($_SESSION);

  include "../lib/dbconn.php";

  if ($mode=="modify") {
    $sql = "select * from $table where num=$num";
    $result = mysql_query($sql, $connect);

    $row = mysql_fetch_array($result);

    $item_subject     = $row[subject];
    $item_content     = $row[content];

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
  <title>다운로드</title>

  <link href="../css/common.css" rel="stylesheet" media="all">
  <link href="../css/board3.css" rel="stylesheet" media="all">
  <script>
    function check_input() {
      if (!document.board_form.subject.value) {
        alert("제목을 입력하세요1");
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
        <div id="title"><img src="../img/title_download.gif"></div>
        <div class="clear"></div>
        <div id="write_form_title"><img src="../img/write_form_title.gif"></div>
        <div class="clear"></div>

        <? if($mode=="modify") { ?>
        <form  name="board_form" method="post" action="insert.php?mode=modify&num=<?=$num?>&page=<?=$page?>&table=<?=$table?>" enctype="multipart/form-data"> 
        <? } else { ?>

        <form  name="board_form" method="post" action="insert.php?table=<?=$table?>" enctype="multipart/form-data"> 
        <? } ?>

          <div id="write_form">

            <div class="write_line"></div>
            <div id="write_row1">
              <div class="col1">닉네임</div>
              <div class="col2"><?=$usernick?></div>
            </div>

            <div class="write_line"></div>
            <div id="write_row2">
              <div class="col1">제목</div>
              <div class="col2"><input type="text" name="subject" value="<?=$item_subject?>" ></div>
            </div>

            <div class="write_line"></div>
            <div id="write_row3">
              <div class="col1">내용</div>
              <div class="col2"><textarea rows="15" cols="79" name="content"><?=$item_content?></textarea></div>
            </div>

            <div class="write_line"></div>
            <div id="write_row4">
              <div class="col1">첨부파일1</div>
              <div class="col2"><input type="file" name="upfile[]"> * 5MB까지 업로드 가능!</div>
            </div>
            <div class="clear"></div>

            <? if ($mode=="modify" && $item_file_0) { ?>
            <div class="delete_ok">
              <?=$item_file_0?> 파일이 등록되어 있습니다.
              <input type="checkbox" name="del_file[]" id="del_file0" value="0">
              <label for="del_file0">삭제</label>
            </div>
            <div class="clear"></div>
            <? } ?>

            <div class="write_line"></div>
            <div id="write_row5">
              <div class="col1">첨부파일2</div>
              <div class="col2"><input type="file" name="upfile[]">  * 5MB까지 업로드 가능!</div>
            </div>

            <? if ($mode=="modify" && $item_file_1) { ?>
            <div class="delete_ok">
              <?=$item_file_1?> 파일이 등록되어 있습니다.
              <input type="checkbox" name="del_file[]" id="del_file1" value="1">
              <label for="del_file1">삭제</label>
            </div>
            <div class="clear"></div>
            <? } ?>

            <div class="write_line"></div>
            <div class="clear"></div>
            <div id="write_row6">
              <div class="col1">첨부파일3</div>
              <div class="col2"><input type="file" name="upfile[]">  * 5MB까지 업로드 가능!</div>
            </div>

            <? if ($mode=="modify" && $item_file_2) { ?>
            <div class="delete_ok">
              <?=$item_file_2?> 파일이 등록되어 있습니다.
              <input type="checkbox" name="del_file[]" id="del_file2" value="2">
              <label for="del_file2">삭제</label>
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


### insert.php

````php
<? session_start(); ?>
<meta charset="utf-8">
<?
  @extract($_POST);
  @extract($_GET);
  @extract($_SESSION);

  if (!$userid) {
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

    $file = explode(".", $upfile_name[$i]);		// a1.jpg
    $file_name = $file[0];	// a1
    $file_ext  = $file[1];	// jpg

    if (!$upfile_error[$i]) { // 에러가 나지 않았으면
      $new_file_name = date("Y_m_d_H_i_s");
      $new_file_name = $new_file_name."_".$i;
      $copied_file_name[$i] = $new_file_name.".".$file_ext;	// 
      $uploaded_file[$i] = $upload_dir.$copied_file_name[$i];

      if( $upfile_size[$i]  > 5000000 ) {
        echo("
          <script>
            alert('업로드 파일 크기가 지정된 용량(5MB)을 초과합니다!<br>파일 크기를 체크해주세요! ');
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

  include "../lib/dbconn.php";

  if ($mode=="modify") {
    $num_checked = count($_POST['del_file']);
    $position = $_POST['del_file'];

    for ($i=0; $i<$num_checked; $i++) {  // delete checked item
      $index = $position[$i];
      $del_ok[$index] = "y";
    }

    $sql = "select * from $table where num=$num";   // get target record
    $result = mysql_query($sql);
    $row = mysql_fetch_array($result);

    for ($i=0; $i<$count; $i++) { // update DB with the value of file input box
  
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
    $sql = "insert into $table (id, name, nick, subject, content, regist_day, hit, ";
    $sql .= " file_name_0, file_name_1, file_name_2, file_type_0, file_type_1, file_type_2, file_copied_0,  file_copied_1, file_copied_2) ";
    $sql .= " values('$userid', '$username', '$usernick', '$subject', '$content', '$regist_day', 0, ";
    $sql .= " '$upfile_name[0]', '$upfile_name[1]',  '$upfile_name[2]', '$upfile_type[0]', '$upfile_type[1]',  '$upfile_type[2]', ";
    $sql .= " '$copied_file_name[0]', '$copied_file_name[1]','$copied_file_name[2]')";
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

  $file_name[0]   = $row[file_name_0];
  $file_name[1]   = $row[file_name_1];
  $file_name[2]   = $row[file_name_2];

  $file_type[0]   = $row[file_type_0];
  $file_type[1]   = $row[file_type_1];
  $file_type[2]   = $row[file_type_2];

  $file_copied[0] = $row[file_copied_0];
  $file_copied[1] = $row[file_copied_1];
  $file_copied[2] = $row[file_copied_2];

  $item_date    = $row[regist_day];
  $item_subject = str_replace(" ", "&nbsp;", $row[subject]);

  $item_content = str_replace(" ", "&nbsp;", $row[content]);
  $item_content = str_replace("\n", "<br>", $item_content);
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
  <title>다운로드</title>
  <link href="../css/common.css" rel="stylesheet" type="text/css" media="all">
  <link href="../css/board3.css" rel="stylesheet" type="text/css" media="all">
  <script>
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
        <div id="title"><img src="../img/title_download.gif"></div>
        <div id="view_comment"></div>

        <div id="view_title">
          <div id="view_title1"><?= $item_subject ?></div>
          <div id="view_title2"><?= $item_nick ?> | 조회 : <?= $item_hit ?> | <?= $item_date ?></div>	
        </div>

        <div id="view_content">
          <?
            for ($i=0; $i<3; $i++) {
              if ($userid && $file_copied[$i]) {  // 로그인, 첨부된 파일이 있으면
                $show_name = $file_name[$i];
                $real_name = $file_copied[$i];
                $real_type = $file_type[$i];
                $file_path = "./data/".$real_name;	//	경로
                $file_size = filesize($file_path);	// 파일의 용량

                echo "▷ 첨부파일 : $show_name ($file_size Byte) &nbsp;&nbsp;&nbsp;&nbsp;
                <a href='download.php?table=$table&num=$num&real_name=$real_name&show_name=$show_name&file_type=$real_type'>[저장]</a><br>";
              }
            }
          ?>
          <br>
          <?= $item_content ?>
        </div>

        <div id="view_button">
          <a href="list.php?table=<?=$table?>&page=<?=$page?>"><img src="../img/list.png"></a>&nbsp;

          <? if ($userid && ( $userid==$item_id || $userid=='admin' || $userlevel==1)) { ?>
          <a href="write_form.php?table=<?=$table?>&mode=modify&num=<?=$num?>&page=<?=$page?>"><img src="../img/modify.png"></a>&nbsp;
          <a href="javascript:del('delete.php?table=<?=$table?>&num=<?=$num?>')"><img src="../img/delete.png"></a>&nbsp;
          <? } ?>

          <? if ($userid) { ?>
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


### delete.php

````php
<?
  session_start();
  @extract($_POST);
  @extract($_GET);
  @extract($_SESSION);

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

  mysql_close();

  echo "
    <script>
      location.href = 'list.php?table=$table';
    </script>
  ";
?>
````


<hr>


## 파일 업로드와 관련된 함수

- **move_uploaded_file(이동하려는 파일의 현재위치, 이동하려는 파일의 현재위치)**
  - 업로드된 파일을 서버의 폴더에 복사
- **GetImageSize()**
  - 업로드된 이미지 파일의 정보(폭,높이,형식 등) 가져옴
  - [0]->폭 [1]->높이 [2]->type
- **unlink(삭제하려는 파일명과 파일의경로)**
  - 업로드된 파일 삭제

> IE 에서는 jpg 파일을 인식하려면 type가 pjpeg 여야만 하고, 파이어폭스는 jpeg가 되어야만 합니다.
{: .prompt-tip}


## 파일관련 함수
- **filesize(파일의 경로와 파일명)**
  - 파일을 용량을 반환한다.
- **file_exists(파일의 경로와 파일명)**
  - 입력한 경로에 해당 파일이 있는지 확인  true/false 반환
- **fopen(파일의경로와파일명 , 모드)**
  - 파일을 열어서 파일이 있는 위치를 가르키는 파일포인터.
  - 모드(r-읽기 w-쓰기 b-이진)
- **fpassthru(파일포인터)**
  - 파일포인터가 지시하는 현 위치에서 파일을 끝까지 읽어서 출력버퍼에 저장한다.
  - (다운로드)
- **fclose(파일포인터)**
  - 파일 포인터가 지사하는 파일을 닫는다.
  - true/false 반환

> 파일포인터 : 파일이 등록된 메모리의 첫번째 주소(시작 주소)
{: .prompt-tip}


### download.php

````php
<?
  for ($i=0; $i<3; $i++) {
    if ($userid && $file_copied[$i]) { // 로그인, 첨부된 파일이 있으면
      $show_name = $file_name[$i];
      $real_name = $file_copied[$i];
      $real_type = $file_type[$i];
      $file_path = "./data/".$real_name; // 경로 ./data/2022_02_24_10_29_32_0.zip
      $file_size = filesize($file_path); // 파일의 용량

      echo "▷ 첨부파일 : $show_name ($file_size Byte) &nbsp;&nbsp;&nbsp;&nbsp;
      <a href='download.php?table=$table&num=$num&real_name=$real_name&show_name=$show_name&file_type=$real_type'>[저장]
      </a><br>";
    }
  }
?>
````


#### view.php에서 넘겨받은 변수

- table=$table
- num=$num
- real_name="$real_name     // 2022_02_24_10_29_32_0.zip
- show_name=$show_name     // 한글파일명.zip
- file_type=$real_type     // 파일종류


````php
<?
  session_start();
  @extract($_POST);
  @extract($_GET);
  @extract($_SESSION);
  /*
  table=$table
  num=$num
  real_name=$real_name(저장)
  show_name=$show_name(실제)
  file_type=$real_type

  */

  if (!$userid) {
    echo("
      <script>
        window.alert('로그인 후 이용해 주세요.')
        history.go(-1)
      </script>
    ");
    exit;
  }
  $file_path = "./data/".$real_name;
  //$file_path =./data/2019_03_25_10_01_04_1.jpg

  if ( file_exists($file_path) ) {  // 파일이 존재하면
  
    $fp = fopen($file_path,"rb");   // 파일포인터 모드 : r읽기,b이진
    //$fp =>메모리에 올려진 파일의 시작 주소
    if( $file_type ) {
      Header("Content-type: application/x-msdownload"); 
      Header("Content-Length: ".filesize($file_path));
      Header("Content-Disposition: attachment; filename=$show_name");   // 이름변경
      Header("Content-Transfer-Encoding: binary"); 
      Header("Content-Description: File Transfer"); 

      header("Expires: 0");

    } else {  // 익스 버전별 처리
      if (eregi("(MSIE 5.0|MSIE 5.1|MSIE 5.5|MSIE 6.0)", $HTTP_USER_AGENT)) {
        Header("Content-type: application/octet-stream"); 
        Header("Content-Length: ".filesize($file_path));
        Header("Content-Disposition: attachment; filename=$show_name");   
        Header("Content-Transfer-Encoding: binary");   
        Header("Expires: 0");   
      } else {
        Header("Content-type: file/unknown");
        Header("Content-Length: ".filesize($file_path)); 
        Header("Content-Disposition: attachment; filename=$show_name"); 
        Header("Content-Description: PHP3 Generated Data"); 
        Header("Expires: 0"); 
      }
    }

    if (!fpassthru($fp)) {    // 파일다운로드
      fclose($fp);
    }
  }
?>
````

<hr>

[download-bbs.zip](/assets/images/posts/2022/02/24/download-bbs.zip)
