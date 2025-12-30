---
title: "[PHP] 아이디 비밀번호 찾기 AJAX"
date: 2022-02-18 11:52:00 +0900
categories: [PHP]
tags: [php]
render_with_liquid: false
math: true
mermaid: true
---

## 아이디찾기

### /login/id_find.php

이름, 연락처로 `$id`를 찾는다.

- action="find.php"
- `$name`
- `$hp1`, `$hp2`, `$h3`
- 버튼 type="button"

````php
<?
  session_start();
  @extract($_GET);
  @extract($_POST);
  @extract($_SESSION);
?>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>서대문자연사박물관-아이디찾기</title>
  <link rel="stylesheet" href="css/member1.css">
  <script src="https://kit.fontawesome.com/f8a0f5a24e.js" crossorigin="anonymous"></script>
  <script src="../js/jquery-1.12.4.min.js"></script>
  <script src="../js/jquery-migrate-1.4.1.min.js"></script>
  <script>
    $(document).ready(function() {

      $(".find").click(function() {       // 아이디찾기 버튼을 클릭, id입력 상자에 id값 입력시
        var name = $('#name').val();   //홍길동
        var hp1 = $('#hp1').val();     //010
        var hp2 = $('#hp2').val();     //1111
        var hp3 = $('#hp3').val();     //2222

        $.ajax({    // ajax 로 data를 넘겨줌
          type: "POST",
          url: "find.php", 
          data: "name="+ name+ "&hp1="+hp1+ "&hp2="+hp2+ "&hp3="+hp3, // 매개변수id도 같이 넘겨줌
          cache: false,
          success: function(data) { // 이 메소드가 완료되면 data라는 변수 안에 echo문이 들어감
          
            $("#loadtext").html(data); // span안에 있는 태그를 사용할것이기 때문에 html 함수사용
            }
        });

          $("#loadtext").addClass('loadtexton');// css 변경
      });

    });
  </script>
</head>
<body>
  <div id="wrap">
    <h1><a href="../index.html" class="logo">서대문자연사박물관</a></h1>

    <div id="col2">
      <form name="find" method="post" action="find.php"> 
        <div id="title">
          <h2 class="hidden">아이디찾기</h2>
          <p>가입 시 입력하신 정보로 아이디를 찾아드립니다</p>
        </div>

        <div id="login_form">
          <div class="clear"></div>

          <div id="login2">
            <div id="id_input_button">
              <fieldset>
                <input type="text" name="name" class="find_input" id="name" placeholder="이름 (ex. test)">
                <div class="telBox">
                  <label class="hidden" for="hp1">연락처 앞3자리</label>
                  <select name="hp1" id="hp1" title="휴대폰 앞3자리를 선택하세요." class="find_input">
                    <option>010</option>
                    <option>011</option>
                    <option>016</option>
                    <option>017</option>
                    <option>018</option>
                    <option>019</option>
                  </select> ㅡ
                  <label class="hidden" for="hp2">연락처 가운데3자리</label>
                  <input class="find_input" type="text" id="hp2" name="hp2" title="연락처 가운데3자리를 입력하세요." maxlength="4" placeholder="(ex. 1111)"> ㅡ
                  <label class="hidden" for="hp3">연락처 마지막3자리</label>
                  <input class="find_input" type="text" id="hp3" name="hp3" title="연락처 마지막3자리를 입력하세요." maxlength="4" placeholder="(ex. 2222)">
                </div>
                <input type="button" value="아이디찾기" class="find">
              </fieldset>

              <span id="loadtext"></span>

              <ul class="go">
                <li><a href="login_form.php"><i class="fas fa-sign-in-alt"></i>로그인하기</a></li>
                <li>비밀번호를 잊으셨나요?<a href="pw_find.php">비밀번호 찾기</a></li>
              </ul>

            </div>
            <div class="clear"></div>

            <div id="login_line"></div>
            <div id="join_button">
              <p>아직도 회원이 아니신가요?</p>
              <a href="../member/join.html" class="go_join">회원가입</a>
            </div>
          </div>			 
        </div>

      </form>
    </div>

  </div>
</body>
</html>
````


### /login/find.php

ajax로 받아온 데이터에 대한 유효성검사 및 필드 찾아서 출력하기

````php
<?
  session_start();
?>
<meta charset="UTF-8">
<?
  @extract($_GET);
  @extract($_POST);
  @extract($_SESSION);

  /*
    $name='홍길동'
    $hp1='010'
    $hp2='1111'
    $hp3='2222'
  */

  if (!$name) {  /* !='없으면'*/
    echo("
      <script>
        window.alert('이름을 입력하세요');
        history.go(-1);
      </script>
    ");
    exit;
  }

  if (!($hp2 && $hp3)) {
    echo("
      <script>
        window.alert('연락처를 입력하세요');
        history.go(-1);
      </script>
    ");
    exit;
  }

  include "../lib/dbconn.php";   // DB연결

  $sql = "select * from member where name='$name'"; //이름으로 검색
  $result = mysql_query($sql, $connect);//있으면 1, 없으면 null

  $num_match = mysql_num_rows($result); //1 null

  if (!$num_match) {  //검색 레코드가 없으면
    echo(" 
      <script>
        window.alert('등록되지 않은 이름 입니다');
        history.go(-1);
      </script>
    ");
    exit;

  } else {  //검색 레코드가 있으면  
    
    $hp = $hp1."-".$hp2."-".$hp3; // 010-1111-2222 DB안에 저장된 포멧으로 변경

    $row = mysql_fetch_array($result);
    //$row[id] ,.... $row[level]
    $sql ="select * from member where name='$name' and hp='$hp'";
    $result = mysql_query($sql, $connect);
    $num_match = mysql_num_rows($result);//있으면 1, 없으면 null
  
    /* db에 이미 암호화 된 pass를 다시 암호화해서 기존의 pass로 알아낼수 없다,
    암호화된 pass가 입력된 pass의 암호화와 일치하는가를 확인해야함 */

    if (!$num_match) { // 이름은 있지만..전화번호가 일치하지 않으면 
      echo("
        <script>
          window.alert('등록된 정보가 없습니다');
          history.go(-1);
        </script>
      ");

      exit;

    } else {  // 1이면=이름과 전화번호가 모두 일치 한다면
        
      $userid = $row[id];
      $username = $row[name];
      $userhp = $row[hp];
      $date = $row[regist_day];

      echo("
        <strong>[ 가입정보 ]</strong><br>
        아이디 : $userid <br>
        이름 : $username <br>
        연락처: $userhp <br>
        가입일자 : $date
      ");
    }
  }
?>
````


<hr>

## 비밀번호 찾기

### /login/pw_find.php

이름, 아이디, 연락처로 필드를 찾은 후 임시 비밀번호를 알려준다. ~~$pass를 찾는다.~~

````php
<?
  session_start();
  @extract($_GET);
  @extract($_POST);
  @extract($_SESSION); 
?>

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>비밀번호찾기</title>
  <link rel="stylesheet" href="css/member1.css">
  <script src="https://kit.fontawesome.com/f8a0f5a24e.js" crossorigin="anonymous"></script>
  <script src="../js/jquery-1.12.4.min.js"></script>
  <script src="../js/jquery-migrate-1.4.1.min.js"></script>
  <script>
    $(document).ready(function() {

    $(".find").click(function() {           // 비밀번호찾기 버튼 클릭, id입력 상자에 id값 입력시
      var id = $('.find_id').val();      // green2
      var name = $('.find_name').val();  // 홍길동
      var hp1 = $('#hp1').val();         // 010
      var hp2 = $('#hp2').val();         // 1111
      var hp3 = $('#hp3').val();         // 2222

      $.ajax({
        type: "POST",
        url: "find2.php",   // 매개변수인 check_id.php파일을 post방식으로 넘기세요
        data: "id="+ id+ "&name="+ name+ "&hp1="+hp1+ "&hp2="+hp2+ "&hp3="+hp3, // 매개변수id도 같이 넘겨줌
        cache: false, 
        success: function(data) { // 이 메소드가 완료되면 data라는 변수 안에 echo문이 들어감
          $("#loadtext").html(data); // span안에 있는 태그를 사용할것이기 때문에 html 함수사용
        }
      });

      $("#loadtext").addClass('loadtexton');    
    });

    });
  </script>
</head>
<body>
  <div id="wrap">
    <h1><a href="../index.html" class="logo">서대문자연사박물관</a></h1>
    <div id="col2">
      <form  name="find" method="post" action="find2.php"> 
        <div id="title">
          <h2 class="hidden">비밀번호찾기</h2>
          <p>가입 시 입력하신 정보로 비밀번호를 찾아드립니다</p>
        </div>

        <div id="login_form">
          <div class="clear"></div>

          <div id="login2">
            <div id="id_input_button">
              <fieldset>
                <input type="text" name="name" class="find_input find_name" placeholder="이름 (ex. test)">
                <input type="text" name="id" class="find_input find_id" placeholder="아이디 (ex. test)">
                <div class="telBox">
                <label class="hidden" for="hp1">연락처 앞3자리</label>
                <select name="hp1" id="hp1" title="휴대폰 앞3자리를 선택하세요." class="find_input">
                  <option>010</option>
                  <option>011</option>
                  <option>016</option>
                  <option>017</option>
                  <option>018</option>
                  <option>019</option>
                </select> ㅡ
                <label class="hidden" for="hp2">연락처 가운데3자리</label>
                <input class="find_input" type="text" id="hp2" name="hp2" title="연락처 가운데3자리를 입력하세요." maxlength="4" placeholder="(ex. 1111)" required> ㅡ
                <label class="hidden" for="hp3">연락처 마지막3자리</label>
                <input class="find_input" type="text" id="hp3" name="hp3" title="연락처 마지막3자리를 입력하세요." maxlength="4" placeholder="(ex. 2222)" required>
                </div>
                <input type="button" value="비밀번호찾기" class="find">
              </fieldset>

              <span id="loadtext"></span>

              <ul class="go">
                <li><a href="login_form.php"><i class="fas fa-sign-in-alt"></i>로그인하기</a></li>
                <li>아이디를 잊으셨나요?<a href="id_find.php">아이디 찾기</a></li>
              </ul>
            </div>
            <div class="clear"></div>

            <div id="login_line"></div>
            <div id="join_button">
              <p>아직도 회원이 아니신가요?</p>
              <a href="../member/join.html" class="go_join">회원가입</a>
            </div>
          </div>			 
        </div>

      </form>
    </div>

  </div>
</body>
</html>
````

### /login/find2.php

비밀번호는 암호화되어 저장되어 있기 때문에 알려줄 수 없으므로, **랜덤 비밀번호**를 생성해 임시암호를 알려준다.   
그리고 랜덤비밀번호로 비밀번호를 변경해준다.

````php
<?
  session_start();
?>
<meta charset="UTF-8">
<?
  @extract($_GET);
  @extract($_POST);
  @extract($_SESSION);
  /*
  $id='green2'
  $name='홍길동'
  $hp1='010'
  $hp2='1111'
  $hp3='2222'
  */

  if (!$id) {  /* !='없으면'*/
    echo("
      <script>
        window.alert('아이디를 입력하세요');
        history.go(-1);
      </script>
    ");
    exit;
  }

  if (!$name) {  /* !='없으면'*/
    echo("
      <script>
        window.alert('이름을 입력하세요');
        history.go(-1);
      </script>
    ");
    exit;
  }

  if (!($hp2 && $hp3)) {
    echo("
      <script>
        window.alert('연락처를 입력하세요');
        history.go(-1);
      </script>
    ");
    exit;
  }

  include "../lib/dbconn.php";

  $sql = "select * from member where id='$id'";
  $result = mysql_query($sql, $connect);//있으면 1, 없으면 null

  $num_match = mysql_num_rows($result); //1 null

  if (!$num_match) {  //검색 레코드가 없으면
    echo(" 
      <script>
        window.alert('등록되지 않은 아이디 입니다');
        history.go(-1);
      </script>
    ");
    exit;

    } else {  //검색 레코드가 있으면
    
      $hp = $hp1."-".$hp2."-".$hp3;

      $row = mysql_fetch_array($result);
      //$row[id] ,.... $row[level]
      $sql ="select * from member where id='$id' and name='$name' and hp='$hp'";
      $result = mysql_query($sql, $connect);
      $num_match = mysql_num_rows($result);//있으면 1, 없으면 null

      /* db에 이미 암호화 된 pass를 다시 암호화해서 기존의 pass로 알아낼수 없다,
      암호화된 pass가 입력된 pass의 암호화와 일치하는가를 확인해야함*/

      if (!$num_match) {  //null이면=입력된 pass가 암호화된 패스와 맞지 않다면
        echo("
          <script>
            window.alert('등록된 정보가 없습니다');
            history.go(-1);
          </script>
        ");

        exit;

      } else {  //1이면=아이디와 이름 전화번호가 모두 일치 한다면
        
        $userid = $row[id];
        $username = $row[name];
        $userhp = $row[hp];
        $date = $row[regist_day];

        // 랜덤 비밀번호 생성
        function generateRandomPassword($length=8, $strength=0) {
          $vowels = 'aeuy';
          $consonants = 'bdghjmnpqrstvz'; //랜덤으로 뽑아낼 기본 문자

          if ($strength & 1) {    // $strength == 1
            $consonants .= 'BDGHJLMNPQRSTVWXZ'; //추가할 문자
          }

          $password = '';
          $alt = time() % 2; // 0,1

          for ($i = 0;$i < $length;$i++) {  // 0~7 8회
            if ($alt == 1) {
              $password .= $consonants[(rand() % strlen($consonants))];  // 글자들의 인덱스번호
              $alt = 0;
            } else {
              $password .= $vowels[(rand() % strlen($vowels))];
              $alt = 1;
            }
          }
          return $password;  // 임시 패스워드
        }

        $ranpass = generateRandomPassword(8,1); //랜덤으로 뽑은 8자의 문자

        echo ("
          <strong>[ 가입정보 ]</strong><br>
          임시비밀번호는 <strong> $ranpass </strong> 입니다<br>
          아이디 : $userid <br>
          이름 : $username <br>
          연락처: $userhp <br>
          가입일자 : $date <br>
          <strong>* 로그인 후 비밀번호를 변경해주세요.</strong>
        ");

        $sql = "update member set pass=password('$ranpass') where id='$id' and name='$name' and hp='$hp'";// 임시패스워드로 비밀번호를 수정해준다.
        $result = mysql_query($sql, $connect);
      }
    }
?>
````

#### 랜덤 비밀번호 생성하기

````javascript
// 랜덤 비밀번호 생성
function generateRandomPassword($length=8, $strength=0) {
  $vowels = 'aeuy';
  $consonants = 'bdghjmnpqrstvz'; //랜덤으로 뽑아낼 기본 문자

  if ($strength & 1) {    // $strength == 1
    $consonants .= 'BDGHJLMNPQRSTVWXZ'; //추가할 문자
  }

  $password = '';
  $alt = time() % 2; // 0,1
  
  for ($i = 0;$i < $length;$i++) {  // 0~7 8회
    if ($alt == 1) {
      $password .= $consonants[(rand() % strlen($consonants))];  // 글자들의 인덱스번호
      $alt = 0;
    } else {
      $password .= $vowels[(rand() % strlen($vowels))];
      $alt = 1;
    }
  }

  return $password;  // 임시 패스워드
}

$ranpass = generateRandomPassword(8,1); //랜덤으로 뽑은 8자의 문자
````



<hr>

[password.zip](/assets/images/posts/2022/02/18/password.zip)
