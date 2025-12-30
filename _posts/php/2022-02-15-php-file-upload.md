---
title: "[PHP&MySQL] file upload"
date: 2022-02-15 14:33:00 +0900
categories: [PHP]
tags: [php]
render_with_liquid: false
math: true
mermaid: true
---

DB에 파일을 저장할 때는 파일명과 실제 파일을 DB에 올리고, 둘을 짝으로 링크시켜 저장한다.


## file.sql

- **file_name_0** : 실제 파일 이름을 저장한다.

- **file_copied_0** : 년월일시분초_0.jpg 로 이름이 변경되어 실제 파일이 서버에 저장된다.

위 2개의 파일이 서로 짝으로 링크되어 서버에 저장된다.

````sql
create table file (
  num int not null auto_increment,

  file_name_0 char(40),
  file_name_1 char(40),

  file_copied_0 char(30),
  file_copied_1 char(30),

  primary key(num)
);
````

![alt text](/assets/images/posts/2022/02/15/fileupload-01.png)
_저장 된 화면_



## file.html

````
<form name="board_form" method="post" action="insert.php" enctye="multipart/form-data">
// 용량이 큰 데이터를 처리할때 쓰이므로, 파일을 첨부할때는 항상 써준다

<input type="file" name="upfile[]">     // name은 배열
````

````php
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <form  name="board_form" method="post" action="insert.php" enctype="multipart/form-data">
    <div class="col2"><input type="file" name="upfile[]"></div>
    <div class="col2"><input type="file" name="upfile[]"></div>
    <div id="write_button"><input type="submit" value="전송"></div>
  </form>
</body>
</html>
````


## insert.php

name 속성이 upfile[]일 때 전달되는 배열 변수

- **$_FILES["upfile"]["name"]**: 업로드하는 실제 파일명
- **$_FILES["upfile"]["tmp_name"]**: 서버에 저장되는 임시 파일명
- **$_FILES["upfile"]["type"]**: 업로드 파일 형식
- **$_FILES["upfile"]["size"]**: 업로드 파일 크기
- **$_FILES["upfile"]["error"]**: 에러 발생 확인
 

````
move_uploaded_file(임시파일이름.tmp, 경로/업로드될파일이름.확장자)     // 파일을 업로드한다.
````


````php
<meta charset="UTF-8">

<?
  @extract($_POST);
  @extract($_GET);
  @extract($_SESSION);

  // $upfile (배열)

  /*   단일 파일 업로드 
  name 속성이 upfile[]일때 전달되는 배열 변수

  $_FILES["upfile"]["name"]   => 업로드하는 실제 파일명
  $_FILES["upfile"]["tmp_name"]  => 서버에 저장되는 임시 파일명
  $_FILES["upfile"]["type"]   => 업로드 파일 형식
  $_FILES["upfile"]["size"]   => 업로드 파일 크기
  $_FILES["upfile"]["error"]   => 에러 발생 확인
  */

  // 다중 파일 업로드
  $files = $_FILES["upfile"];
  $count = count($files["name"]); // 첨부된 파일의 개수 (2개)

  $upload_dir = './data/';  // 파일을 저장할 경로명

  for ($i=0; $i<$count; $i++) { // i = 0, 1
    $upfile_name[$i]     = $files["name"][$i];
    $upfile_tmp_name[$i] = $files["tmp_name"][$i];
    $upfile_type[$i]     = $files["type"][$i];
    $upfile_size[$i]     = $files["size"][$i];
    $upfile_error[$i]    = $files["error"][$i];

    // echo "$upfile_name[$i]<br>$upfile_tmp_name[$i]<br>$upfile_type[$i]<br>$upfile_size[$i]<br>$upfile_error[$i]";

    // 데이터 이름 저장 start //
    $file = explode(".", $upfile_name[$i]);   // '.'을 기준으로 문자열을 나누어 배열로 처리 [0]a1, [1]jpg
    $file_name = $file[0];  //파일명    a1
    $file_ext  = $file[1];   //확장자   jpg

    $new_file_name = date("Y_m_d_H_i_s"); 
    $new_file_name = $new_file_name."_".$i;   //파일 이름을  2016_08_11_15_08_12_0 형식으로.
    $copied_file_name[$i] = $new_file_name.".".$file_ext;    //  2016_08_11_15_08_12_0.확장자
    $uploaded_file[$i] = $upload_dir.$copied_file_name[$i]; //  ./data/2016_08_11_15_08_12_0.확장자
    // 데이터 이름 저장 end //

    /*
      1024byte = 1kb
      1024kb = 1mb
      1024mb = 1gb
      1024gb = 1tb
    */
    if ( $upfile_size[$i] > 500000 ) {
      echo("
        <script>
          alert('업로드 파일 크기가 지정된 용량(500KB)을 초과합니다!<br>파일 크기를 체크해주세요! ');
          history.go(-1)
        </script>
      ");
      exit;
    }

    if ( ($upfile_type[$i] != "image/gif") &&
      ($upfile_type[$i] != "image/jpeg") &&
      ($upfile_type[$i] != "image/pjpeg") ) {
    echo("
      <script>
        alert('JPG와 GIF 이미지 파일만 업로드 가능합니다!');
        history.go(-1)
      </script>
      ");
      exit;
    }

    // move_uploaded_file(임시파일이름.tmp, 경로/업로드될파일이름.확장자) : 파일을 업로드한다.

    if (!move_uploaded_file($upfile_tmp_name[$i], $uploaded_file[$i]) ) { //파일을 업로드한다.
      echo("
        <script>
          alert('파일을 지정한 디렉토리에 복사하는데 실패했습니다.');
          history.go(-1)
        </script>
      ");
      exit;
    }

  }

    $connect = mysql_connect("localhost","song","1234");    // kdhong 계정으로 접속
    $db_con = mysql_select_db("song_db", $connect);

    $sql = "insert into file ( file_name_0, file_name_1 ,file_copied_0,  file_copied_1) ";
    $sql .= "values('$upfile_name[0]', '$upfile_name[1]', '$copied_file_name[0]', '$copied_file_name[1]')";
    mysql_query($sql, $connect);  // $sql 에 저장된 명령 실행

    mysql_close();         // DB 연결 끊기

    echo "
      <script>
        alert('파일이 업로드 되었습니다.');
        location.href = 'file.html';
      </script>
    ";

?>
````


## view.php

````php
<meta charset="UTF-8">
<? 
  @extract($_POST);
  @extract($_GET);
  @extract($_SESSION);

  $connect = mysql_connect("localhost","song","1234");    // song 계정으로 접속
  $db_con = mysql_select_db("song_db", $connect);

  $sql = "select * from file where num=1"; // num1을 읽어옴
  $result = mysql_query($sql, $connect);

  $row = mysql_fetch_array($result);

  $item_num     = $row[num];

  $image_name[0]   = $row[file_name_0];	// a1.jpg
  $image_name[1]   = $row[file_name_1];	// a2.jpg

  $image_copied[0] = $row[file_copied_0];		// ./data/2022_02_15_14_18_57_0.jpg
  $image_copied[1] = $row[file_copied_1];		// ./data/2022_02_15_14_18_57_1.jpg

  mysql_close();
?>

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="view_content">
  <?
    for ($i=0; $i<2; $i++) {
      if ($image_copied[$i]) {    // 첨부된 이미지가 있으면
        $img_name = $image_copied[$i];  // 2022_02_15_14_18_57_0.jpg
        $img_name = "./data/".$img_name;  // ./data/2022_02_15_14_18_57_0.jpg
        $img_width = 200;

        echo "<img src='$img_name' width='$img_width'>"."<br><br>";
      }
    }
  ?>
  </div>	
</body>
</html>
````
