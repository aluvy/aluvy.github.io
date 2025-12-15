---
title: "[PHP] php 배열과 함수"
date: 2022-02-04 12:21:00 +0900
categories: [PHP]
tags: [php]
render_with_liquid: false
math: true
mermaid: true
---

## 배열

````php
<?
  //배열이용 합계, 평균구하기, 배열의 원소는 0부터 시작한다.

  $score[0]=78;
  $score[1]=83;
  $score[2]=97;
  $score[3]=88;
  $score[4]=78;

  $sum = 0;
  for($a=0; $a<=4; $a++){
    $sum = $sum + $score[$a];
  }

  $avg = $sum/5;

  echo("과목 점수 : $score[0], $score[1], $score[2], $score[3], $score[4]<br>");   
  echo("합계 : $sum, 평균 : $avg <br>");

  /*
    과목 점수 : 78, 83, 97, 88, 78
    합계 : 424, 평균 : 84.8
  */
?>
````

### array()

````php
<?
  // array() 함수를 20명의 학생에 대한 영어 성적의 합계와 평균

  // 대괄호 [] 도 사용 가능하다.
  $eng_score = array(87, 76, 98, 87, 87, 93, 79, 85, 88, 63,
  74, 84, 93, 89, 63, 99, 81, 70, 80, 95);

  $sum=0;

  for($a=0; $a<20; $a++) {
    $sum = $sum + $eng_score[$a];  // 20명의 학생의 성적의 누적 합
  }

  $avg = $sum/20;				// 평균 구하기

  echo "학생들 영어 점수 : ";   
  for($a=0; $a<20; $a++)			// 입력된 학생들의 영어 성적 출력
    echo $eng_score[$a]." ";

  echo "<br>";                                 // 줄 바꿈

  echo("합계 : $sum, 평균 : $avg");

  /*
    학생들 영어 점수 : 87 76 98 87 87 93 79 85 88 63 74 84 93 89 63 99 81 70 80 95
    합계 : 1671, 평균 : 83.55
  */
?>
````

### 2차원배열 == 행열 ($배열명[행],[열])

````php
<?
  // 2차원 배열을 이용한 3명의 학생에 대한 4과목 합계와 평균

  //$score = array( array(88, 98, 96, 77, 63), array(86, 77, 66, 86, 93), array(74, 83, 95, 86, 97) );

  $score = [ [88, 98, 96, 77, 63], [86, 77, 66, 86, 93], [74, 83, 95, 86, 97] ] ;

  // 입력된 성적과 배열 인덱스 출력

  for ($i=0; $i<3; $i++){
  for ($j=0; $j<5; $j++)
    echo "\$score[$i][$j] = ".$score[$i][$j]."<br>";
    echo "<br>";
  }

  // 3명에 대한 과목의 합계와 평균
  for($i=0; $i<3; $i++){
  $sum=0;

  for($j=0; $j<5; $j++)
  $sum = $sum + $score[$i][$j];      

  $avg = $sum/5;
  $student_num = $i + 1;
    echo("$student_num 번째 학생의 점수 => 합계 : $sum, 평균 : $avg <br>");
  }

  /*
    $score[0][0] = 88
    $score[0][1] = 98
    $score[0][2] = 96
    $score[0][3] = 77
    $score[0][4] = 63

    $score[1][0] = 86
    $score[1][1] = 77
    $score[1][2] = 66
    $score[1][3] = 86
    $score[1][4] = 93

    $score[2][0] = 74
    $score[2][1] = 83
    $score[2][2] = 95
    $score[2][3] = 86
    $score[2][4] = 97

    1 번째 학생의 점수 => 합계 : 422, 평균 : 84.4
    2 번째 학생의 점수 => 합계 : 408, 평균 : 81.6
    3 번째 학생의 점수 => 합계 : 435, 평균 : 87
  */
?>
````

<hr>

## 문자열 관련 내장함수

- **strlen()**
  - 문자열의 길이를 계산
  - index번호는 0부터 시작
  - 
- **substr()**
  - 문자열을 인덱스값으로 자름
  - substr(문자열, 0, 3)
  - index번호 0부터 3개를 가져 온다.
  - 
- **explode()**
  - 특정 문자를 기준으로 문자열을 분리
  - explode("-", 문자열)
  - `-` 을 기준으로 문자열을 분리하여 배열로 저장

````php
<?   
  $tel = "010-2777-3333";
  $mail = "green22@naver.com";

  // 문자열의 길이 계산
  $num_tel = strlen($tel);
  echo "strlen() 함수 사용 : $num_tel<br>";


  // 문자열을 index값으로 자름
  $tel1 = substr($tel, 0, 3);            // 앞에서 세 문자를 가져옴
  $tel2 = substr($tel, 4, 4);		       // 네 번째 문자에서 네 개를 가져옴
  $tel3 = substr($tel, 9, 4);		       // 아홉 번째 문자에서 네 개를 가져옴

  echo "substr() 함수 사용 : $tel1 $tel2 $tel3<br>";


  // 하이픈(-)을 기준으로 문자열 분리
  $phone = explode("-", $tel);
  echo "explode() 함수 사용 : $phone[0] $phone[1] $phone[2]<br>";

  $email = explode("@", $mail);
  echo "explode() 함수 사용 : $email[0] $email[1]";
?>
````


<hr>

## 사용자 정의 함수

### 기본함수

````php
<?   
  function aaa() {
    echo ("안녕하세요!");
  }

  aaa();
?>
````

### 매개변수

````php
<?
  function plus($a, $b){
    $c = $a + $b;
    echo $c;
  }

  plus(15, 25);
  echo "<br>";
  plus(3500, 1500);
?>
````

### 매개변수+리턴값

````php
<?
  function plus($a, $b){
    $c = $a + $b;
    return $c;
  }

  $result = plus(15, 25);
  echo $result."<br>";

  $result = plus(3500, 1500);
  echo $result;
?>
````

### 전역변수 global 변수명; , $GLOBALS["변수"]

지역변수와 전역변수

보안상의 이슈로 php 전역변수는 함수 내부에서 사용될수 없다.

- global 변수명; 을 이용하여 함수 내부에서 전역변수를 인식시켜 사용하거나
- $GLOBALS["변수명"]; 을 사용하여 함수 내부에서 전역변수를 사용한다.

````php
<? 
  $c=0;

  function plus($a, $b){
    //global $c;
    //$c= $a + $b;   
    $GLOBALS["c"]=$a + $b;
  }

  function plusR(){
    // global $c;
    // echo $c;  
    echo $GLOBALS["c"];
  }

  plus(100,100);
  plusR();
?>
````

### 정적변수 (카운터 만들기) static 변수명;

정적변수는 **지역변수이며 초기값**을 지정한다.

- 정적변수는 지역변수다.
- 정적변수의 초기화는 최초 1회만 적용된다.
- 정적변수는 함수의 계산이 완료되어도 변수가 자동 삭제되지 않는다. 

````php
<?
  function counter() {
    static $num = 1;    // 정적변수
    echo $num.'<br>';
    $num++;
  }

  for($i=1; $i<11 ; $i++){
    counter();
  }
?>
````

> **정적변수, 자동변수**   
> 컴퓨터 프로그래밍에서 정적 변수는 정적으로 할당되는 변수이며, 프로그램 실행 전반에 걸쳐 변수의 수명이 유지된다. 기억 장소가 콜 스택에서 할당 및 할당 해제되는, 수명이 더 짧은 자동 변수와는 반대되는 개념이다. 즉, 기억 장소가 힙 메모리에 동적 할당되는 객체와 반의어이다.
{: .prompt-tip}


<hr>

## 사용자 정의 함수 예제

### 1부터 100까지의 합

````php
<?
  // hap($a, $b) 함수는 $a에서 $b 까지의 합을 구한다.

  function hap($a, $b){
    $sum=0;
    while($a <= $b){
      $sum=$sum+$a;
      $a++;
    }
    return $sum;
  }

  $from = 1;
  $to   = 100;

  $total = hap($from, $to); 
  echo("$from 에서 $to 까지의 합 : $total");
?>
````

### 공원 입장표 출력

````php
<?
  function cal_fee1($day, $age) {      // 일반 입장권 요금 구하기
    if ( $day == "주간" ) {
      if ($age> 12 && $age < 65)
        $money = 26000;
       else
        $money = 19000;
    } else {
      if ($age> 12 && $age < 65)
        $money = 21000;
     else
       $money = 16000;
    }

    return $money;
  }

  function cal_fee2($day, $age) {      // 자유이용권 요금 구하기
    if ( $day == "주간" ) {
      if ($age> 12 && $age < 65)
        $money = 33000;
      else
        $money = 24000;
    } else {
      if ($age> 12 && $age < 65)
        $money = 28000;
      else
        $money = 21000;
    }

    return $money;
  }

  function cal_fee3($age) {      // 2일 자유이용권 요금 구하기
    if ($age> 12 && $age < 65)
      $money = 55000;
    else
      $money = 40000;

    return $money;
  }

  function cal_fee4($age) {      // 콤비권 요금 구하기
    if ($age> 12 && $age < 65)
      $money = 54000;
    else
      $money = 40000;

    return $money;
  }

  // $category가 1=> 입장권, 2=> 자유이용권, 3=> 2일 자유이용권, 4=> 콤비권 의미

  $category = 1;       // 입장권 요금을 구하고자 함
  $age = 13;
  $day = "야간";

  if( $category == 1 )
    $fee = cal_fee1($day, $age);

  elseif ( $category == 2 )
    $fee = cal_fee2($day, $age);

  elseif ( $category == 3 )
    $fee = cal_fee3($age);

  else
    $fee = cal_fee4($age);

      
  if( $category == 1 )
    $cat = "일반 입장권";

  elseif ( $category == 2 )
    $cat = "자유이용권";

  elseif ( $category == 3 )
    $cat = "2일 자유이용권";
  
  else
    $cat = "콤비권";

  echo "구분 : $cat<br>";

  if ($category == 1 || $category==2)
    echo "때 : $day<br>";

  echo "나이 : $age 세<br>";
  echo "입장료 : $fee 원";
?>
````

[놀이공원 요금표]

일반입장권 :  주간  (대인 26,000원)  (소인 및 노인 19,000원)  
                 야간  (대인 21,000원)  (소인 및 노인 16,000원)  

자유이용권 :  주간  (대인 33,000원)  (소인 및 노인 24,000원)  
                 야간  (대인 28,000원)  (소인 및 노인 21,000원)

2일 자유이용권       (대인 55,000원)  (소인 및 노인 40,000원)  

콤비권                 (대인 54,000원)  (소인 및 노인 40,000원)

* 소인은 12세 이하/노인은 65세 이상
