---
title: "[PHP] php 기본문법"
date: 2022-02-04 10:25:00 +0900
categories: [PHP]
tags: [php]
render_with_liquid: false
math: true
mermaid: true
---

## 1. echo / print

echo 와 print 는 스크린에 데이터를 출력하는 역할을 합니다. 둘의 차이점은 리턴값이 존재하느냐, 존재하지 않느냐인데   
echo는 리턴값이 존재하지 않고, print는 리턴값이 존재하는 차이가 있습니다.

- 괄호는 생략해서 사용할 수 있다.
- 문자열/태그/자바스크립트 모두 처리 된다.
- 문장의 마지막에 세미콜론 ;
- print의 리턴값은 출력값이 존재하면 1을 리턴한다.

````php
<?
  echo "반갑습니다.<br>";
  echo "행복한 하루 되세요!<br>";
  echo ("php의 기본문법을 익혀봅시다!<br>");

  print "반갑습니다.<br>";
  print ("php의 기본문법을 익혀봅시다!<br>");
?>
````


## 2. 주석

여러 줄을 주석처리 할 때는 /* */ 를 사용한다

````php
<?
  // 이 프로그램은 주석문을 설명하는 프로그램이다. 이 줄은 주석처리를 의미한다.
  /* 여러줄을 주석처리할 때는 
  이와 같이 한다. */
  echo "이 문장은 출력된다.";
?>
````


## 3. 대/소문자

기본적으로 대/소문자를 구문하진 않지만, 대체적으로 소문자를 사용한다

````php
<?
  echo "---------------------- <br>";
  echo "사과<br>";
  echo "오렌지<br>";
  echo "---------------------- <br>";
  ECHO "&^%$&*%&&%*&(*(<br>";
  ECHO "---------------------- <br>";
  ECHO "사과<br>";
  ECHO "오렌지<br>";
  ECHO "---------------------- <br>";
?>
````

## 4. 변수

달러 $ 문자로 선언하며, 가변형 변수 ~~(숫자, 문자, true, false 모두 1개의 변수로 사용가능, 권장X)~~

````php
<?
  $a = "자동차";
  echo "<br>";
  echo $a; // 자동차

  $a = "기차";
  echo "<br>";
  echo $a; // 기차

  $a = 1000;
  echo "<br>";
  echo $a; // 1000

  $a = true;
  echo "<br>";
  echo $a; // 1
?>
````

print함수는 리턴값이 존재하면 1을 출력한다.

````php
<?
  $val = print "echo 는 출력문입니다.<br>";  //echo 는 출력문입니다.
  echo  '$val : '.$val.'<br>';  //$val : 1
?>
````


## 5. 문자열의 결합

php에서 문자의 결합은 .$변수. 또는 {$변수}로 한다. (큰 따옴표 안에서는 생략도 가능하다.)

````php
<?
  $val = "홍길동";

  // 작은 따옴표
  echo  '이름은 : '.$val.'입니다.<br>';  //이름은 : 홍길동입니다.

  // 큰 따옴표
  echo  "이름은 : ".$val."입니다.<br>";  //이름은 : 홍길동입니다.

  // 큰 따옴표 안에서는 따옴표를 생략할 수 있다. (띄어쓰기 유의)
  echo  "이름은 : $val 입니다.<br>"; // 이름은 : 홍길동 입니다.

  // 작은 따옴표 안에서는 변수도 문자열로 인식한다.
  echo  '이름은 : $val 입니다.<br>'; // 이름은 : $val 입니다.

  // {변수} 문법
  echo  "이름은 : {$val}입니다.<br>"; // 이름은 : 홍길동입니다.
?>
````

## 연산

`+`, `/`

````php
<?
  $kor = 85;   	// 국어 점수
  $eng = 90;  	// 영어 점수
  $math = 98;  	// 수학 점수
  $soc = 80;  	// 사회 점수
  $sci = 90;   	// 과학 점수

  $sum = $kor + $eng + $math + $soc + $sci; 	// 5과목의 합계 구하기

  $avg = $sum / 5;

  echo "국어 : $kor, 영어 : $eng, 수학 : $math, 사회 : $soc, 과학 : $sci <br>";
  echo "합계 : $sum, 평균 : $avg";

  /*
    국어 : 85, 영어 : 90, 수학 : 98, 사회 : 80, 과학 : 90
    합계 : 443, 평균 : 88.6
  */
?>
````

`*` 는 `+` 보다 연산순위가 높다

````php
<?
  $child = 5000;     	// 청소년 입장료 5,000원
  $adult = 8000;		// 성인 입장료 8,000원
  $num1 = 3;		// 청소년 3매
  $num2 = 2;		// 성인 2매

  $total = $child * $num1 + $adult * $num2;

  echo "청소년 입장료 : {$child}원<br>";
  echo "성인 입장료 : $adult 원<br>";
  echo "청소년 : $num1 매, 성인 : $num2 매<br>";
  echo "전체 입장료 : $total 원";

  /*
    청소년 입장료 : 5000원
    성인 입장료 : 8000 원
    청소년 : 3 매, 성인 : 2 매
    전체 입장료 : 31000 원
  */
?>
````

## 산술연산자

````php
<?
  $a = 7;
  $b = 8;

  $a++;
  $b--;

  $b = $a * $b + 2;
  $c = $a + $b;

  echo "a : $a, b : $b, c : $c<br>"; // a : 8, b : 58, c : 66

  $c = $a % $b;
  $b = $a + 2;
  $a = $a * 3;

  echo "a : $a, b : $b, c : $c"; // a : 24, b : 10, c : 8
?>
````

## 문자열 연결 연산자

````php
<?
  $n1 = "010";
  $n2 = "2322";
  $n3 = "3233";

  $hp = $n1."-".$n2."-".$n3;

  echo "휴대폰 번호 : $hp"; // 휴대폰 번호 : 010-2322-3233
?>
````

## 대입연산자

````php
<?
  $a = 5;	          	  // $a 에 5 값을 대입	
    echo $a."<br>";

  $a += 3;                  // $a = $a + 3 와 동일
    echo $a."<br>";

  $a -= 4;                  // $a = $a - 4 와 동일
    echo $a."<br>";

  $a *= 2;                  // $a = $a * 2 와 동일
    echo $a."<br>";

  $a /= 4;                  // $a = $a / 4 와 동일
    echo $a."<br>";

  $a %= 2;                  // $a = $a % 2 와 동일
    echo $a."<br>";

  $a = "오렌지";
  $a .= " 주스";            // $a = $a." 주스" 와 동일
    echo $a."<br>";


  /*
    5
    8
    4
    8
    2
    0
    오렌지 주스
  */
?>
````

## if문

````php
<?
  $age = 68;
  $fee = "2,000원";

  if ($age>=65){
    $fee = "무료";
  }

  echo "나이 : $age 세, 지하철 요금 : $fee";

  /*
    나이 : 68 세, 지하철 요금 : 무료
  */
?>
````

### && (참참참)

````php
<?
  $pilgi = 65;
  $silgi = 90;
  $result = "불합격";

  if($pilgi >= 70 && $silgi >= 80 ){
    $result = "합격";
  }

  echo "필기 점수 : $pilgi, 실기 점수 : $silgi<br>";
  echo "결과 : $result";

  /*
    필기 점수 : 65, 실기 점수 : 90
    결과 : 불합격
  */
?>
````

### || (거짓거짓거짓)

````php
<?
  $pilgi = 95;
  $silgi = 55;
  $result = "합격";

  if ($pilgi < 70 || $silgi < 80 ){
    $result = "불합격";
  }

  echo "필기 점수 : $pilgi, 실기점수 : $silgi<br>";
  echo "결과 : $result";

  /*
    필기 점수 : 95, 실기점수 : 55
    결과 : 불합격
  */
?>
````

#### if ~ else

````php
<?
  $num = 80;

  if ($num%2==0){
    echo "$num : 짝수";
  } else {
    echo "$num : 홀수";	
  }

  /* 80 : 짝수 */
?>
````

````php
<?
  $besu = 5;               // 대상 숫자
  $num = 15;		// 5의 배수인지를 판별하고자 하는 대상 숫자

  if ($num % $besu == 0){
    echo "$num 은(는) $besu 의 배수다.";
  } else {
    echo "$num 은(는) $besu 의 배수가 아니다.";	    
  }

  /* 15 은(는) 5 의 배수다. */
?>
````

#### 실행문이 한 줄 일 때 { } 생략 가능.

````php
<?
  // 다이어트가 필요한지 판별 : 몸무게가 (키 - 100) * 0.9 보다
  // 크면 다이어트 필요

  $h = 170;
  $w = 40;
  $a = ($h-100)*0.9;

  echo "키 : $h <br>";
  echo "몸무게 : $w <br>";

  if ($w>$a)
    echo "다이어트가 필요할지도 모르겠군요.<br>";
  else 
    echo "다이어트가 필요하지 않군요.<br>";

  /*
    키 : 170
    몸무게 : 40
    다이어트가 필요하지 않군요.
  */
?>
````

#### php문 안에서 echo를 이용해 자바스크립트를 사용할 수 있다.

````php
<?
  $h = 170;
  $w = 40;
  $a = ($h-100)*0.9;

  echo "키 : $h <br>";
  echo "몸무게 : $w <br>";

  if ($w>$a){
    echo "<script>
    alert('다이어트가 필요할지도 모르겠군요.');
    </script>";
  }else{ 
    echo "<script>
    alert('다이어트가 필요하지 않군요.');
    </script>";
  }

  /*
    (alert 창) 다이어트가 필요하지 않군요.
    키 : 170
    몸무게 : 40
  */
?>
````

#### 제어문 (조건문, 반복문)과 함께 사용될 때 실행코드만 php코드 밖으로 빼 태그로 표현할 수 있다.

````php
<?
  $h = 170;
  $w = 40;
  $a = ($h-100)*0.9;

  echo "키 : $h <br>";
  echo "몸무게 : $w <br>";

  if ($w>$a){
?>
  <p>다이어트가 필요할지도 모르겠군요.</p>
<? }else{ ?> 
<p  >다이어트가 필요하지 않군요.</p>
<?
  }

  /*
    키 : 170
    몸무게 : 40
    다이어트가 필요하지 않군요.
  */
?>
````

````php
<?
  $test1 = 70;	// 획득한 필기 점수
  $test2 = 80;	// 획득한 실기 점수
  $test3 = 87;	// 획득한 도로주행 점수

  $test1_cut = 70;		// 필기 기준 점수
  $test2_cut = 80;		// 필기 기준 점수
  $test3_cut = 90;		// 필기 기준 점수

  echo "운전면허 시험 합격 기준은<br>";
  echo "필기 점수 $test1_cut 점 이상,<br>";
  echo "실기 점수 $test2_cut 점 이상,<br>";
  echo "도로주행 점수 $test3_cut 점 이상입니다.<br><br>";

  echo "획득한 필기 점수 : $test1 점, 실기 점수 : $test2 점, 도로주행 점수 : $test3 점<br><br>";

  if ( ($test1 >= $test1_cut) && ($test2 >= $test2_cut) && ($test3 >= $test3_cut) )
    echo "합격하셨습니다!!!";
  else	
    echo "죄송하지만 불합격입니다!!!";

  /*
    운전면허 시험 합격 기준은
    필기 점수 70 점 이상,
    실기 점수 80 점 이상,
    도로주행 점수 90 점 이상입니다.

    획득한 필기 점수 : 70 점, 실기 점수 : 80 점, 도로주행 점수 : 87 점

    죄송하지만 불합격입니다!!!
*/
?>
````

## switch문

````php
<?
  /*
    초등학교 급식비를 계산하는 프로그램
    1학년 : 3만 원
    2학년 : 3만5천 원
    3학년 : 4만 원
    4학년 : 4만5천 원
    5학년 : 5만 원
    6학년 : 5만5천 원
  */

  $a = 3;

  switch ($a){
    case 1 :
      echo "$a 학년 급식비 : 3만 원";
      break;
    case 2 :
      echo "$a 학년 급식비 : 3만5천 원";
      break;
    case 3 :
      echo "$a 학년 급식비 : 4만 원";
      break;
    case 4 :
      echo "$a 학년 급식비 : 4만5천 원";
      break;
    case 5 :
      echo "$a 학년 급식비 : 5만 원";
      break;
    case 6 :
      echo "$a 학년 급식비 : 5만5천 원";
      break;
    default :
      echo "학년을 잘못 입력했어요!!!";
      break;
  }

  // 3 학년 급식비 : 4만 원
?>
````

## while문

````php
<?
  $a=1;
  $sum=0;

  while($a<=10){
    $sum += $a;
    $a++;
  }

  echo("1에서 10까지 자연수의 합은 $sum 입니다.<br>");

  /* 1에서 10까지 자연수의 합은 55 입니다. */
?>
````

### do while문

````php
<?
  $i = 1;

  do{
    echo $i."<br>";
    $i++;
  } while ($i <= 10)

  /* 
    1
    2
    3
    4
    5
    6
    7
    8
    9
    10
  */
?>
````


## for문

````php
<?   
  $sum=0;

  for($a=1; $a<=10; $a++){
    $sum += $a;     
  }

  echo("1에서 10까지 자연수의 합은 $sum 입니다.<br>");

  /* 1에서 10까지 자연수의 합은 55 입니다. */
?>
````

### 게시판 목록 페이지 출력

````php
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h3>▶ 게시판 목록보기</h3>

  <table border='1' width='600'>
    <tr bgcolor='#ccccc' align='center'>
      <td>번호</td>
      <td>제목</td>
      <td>글쓴이</td>
      <td>날짜</td>
    </tr>
    <?
      $num = 1;
      $name = "홍길동";
      $date = "2013/03/10";

      for($i=1; $i<=10; $i++){
        $title = "게시판 제목 ".$num;

        echo "<tr><td width='50' align='center'>$num</td><td>$title</td>
        <td width='50'>$name</td><td width='80'>$date</td></tr>";

        $num++;
      }
    ?>
  </table>
</body>
</html>
````

![게시판 목록 출력 결과물](/assets/images/posts/2022/0204/php-syntax-1.png)
_출력 결과물_

### 게시판 목록 페이지 출력 2

````php
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h3>▶ 게시판 목록보기</h3>
  <table border='1' width='600'>
    <tr bgcolor='#ccccc' align='center'>
      <td>번호</td>
      <td>제목</td>
      <td>글쓴이</td>
      <td>날짜</td>
    </tr>
    <?
      $num = 1;
      $name = "홍길동";
      $date = "2013/03/10";

      for($i=1; $i<=10; $i++){
        $title = "게시판 제목 ".$num;
      ?>
      <tr>
        <td width='50' align='center'><?=$num?></td><td><?=$title?></td>
        <td width='50'><?=$name?></td><td width='80'><?=$date?></td>
      </tr>
      <? 
        $num++;
      }
    ?>
  </table>
</body>
</html>
````

### 구구단 표 출력

````php
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h3>▶ 구구단 표</h3>
  <table border='1' width='600'>
    <tr bgcolor='#ccccc' align='center'>
      <td>2단</td>
      <td>3단</td>
      <td>4단</td>
      <td>5단</td>
      <td>6단</td>
      <td>7단</td>
      <td>8단</td>
      <td>9단</td>
    </tr>
    <?
      for($b=1; $b<=9; $b++) {
        echo "<tr align='center'>";

        for($a=2; $a<=9; $a++) {
          $c = $a * $b;

          echo "<td>{$a}x{$b}=$c</td>";
        }

        echo "</tr>";
      }
    ?>
  </table>
</body>
</html>
````

![구구단 표](/assets/images/posts/2022/0204/php-syntax-2.png)
_출력 결과물_
