---
title: "[MySQL] 명령어, DB Table"
date: 2022-02-08 11:47:00 +0900
categories: [MySQL]
tags: [mysql]
render_with_liquid: false
math: true
mermaid: true
---


## SQL 데이터베이스 관련 명령어

## 데이터베이스 접속 명령

> mysql -u계정아이디 -p비밀번호 데이터베이스명
{: .prompt-info}

````shell
c:\>mysql -usong -p1234 song_db
````

또는

````shell
c:\>mysql -usong -p1234   // 계정로그인
mysql>use song_db         // use 명령을 사용해 작업하려는 데이터베이스 선택
````

![song_db로 들어왔음을 확인](/assets/images/posts/2022/0208/mysql-syntax-01.png)
_song_db로 들어왔음을 확인_


## 데이터베이스 빠져나오기

````shell
\q
````
![Bye 메세지](/assets/images/posts/2022/0208/mysql-syntax-02.png)
_Bye 메세지_


<hr>


## 데이터베이스 생성, 목록 출력

데이터베이스 생성과 삭제 권한은 관리자에게만 있으므로 root로 접속해서 명령을 실행해야 한다!!!! (중요)   
데이터베이스 생성 명령 : `creat database 데이터베이스명;`

데이터베이스는 관리자만 생성할 수 있기 때문에 반드시 root계정으로 생성한 후,   
데이터베이스 출력 명령을 통해 그 존재를 확인해 본다.


````shell
c:\>mysql -uroot -p mysql	// root 계정으로 접속, 비밀번호는 엔터
mysql>create database sample1;	// sample1 데이터베이스 생성
mysql>show databases;	//데이터베이스 목록 출력 명령
````

![root 계정으로 들어왔음을 확인](/assets/images/posts/2022/0208/mysql-syntax-03.png)
_root 계정으로 들어왔음을 확인_

![데이터베이스 생성 Query OK](/assets/images/posts/2022/0208/mysql-syntax-04.png)
_데이터베이스 생성 Query OK_

![데이터베이스 목록 출력 / sample1 을 확인할 수 있다.](/assets/images/posts/2022/0208/mysql-syntax-05.png)
_데이터베이스 목록 출력 / sample1 을 확인할 수 있다._


> 디비세팅은 아래 포스팅을 참고하자
> [XAMPP MySQL 새로운 계정 생성하기](https://ooo-k.tistory.com/179)
{: .prompt-tip}


<hr>

## 데이터베이스 삭제하기

데이터베이스 삭제 명령 : `drop database 데이터베이스명;`

````shell
c:\>mysql -uroot -p mysql	// root 계정 접속
mysql>drop database sample1;    // sample1 데이터베이스 삭제
mysql>show databases;   //데이터베이스 목록 출력 명령
````

![삭제되었다. Query OK! 두번 물어보지 않으니 조심조심](/assets/images/posts/2022/0208/mysql-syntax-06.png)
_삭제되었다. Query OK! 두번 물어보지 않으니 조심조심_

![sample1 DB가 목록에서 사라졌음을 확인](/assets/images/posts/2022/0208/mysql-syntax-07.png)
_sample1 DB가 목록에서 사라졌음을 확인_


<hr>


## MySQL 테이블 관련 명령

테이블 : 실제 데이터가 저장될 수 있는 공간


## 데이터베이스 테이블 생성

> create table 테이블명(   
>    필드명1 타입,   
>    필드명2 타입,   
>    ......   
>    PRIMARY KEY(필드명)   
> );
{: .prompt-info}


````shell
mysql>create table friend(
  num int not null,     // ＊필수항목(primary-key) 값이 꼭 들어가야 함 / int : 정수, null값 안됨
  name char(10),     // char(10) : 글자(글자수)
  address char(80),
  tel char(20),
  email char(20),     // not null이 없으므로 필수항목이 아니다.

  primary key(num)    // 기본키는 필드값은 서로 중복되지 않는 유일한 값을 갖는다. 구별되는 필드
);
````

````shell
mysql -usong -p1234 song_db	// 데이터베이스 접속

mysql>create table friend(
    num int not null,
    name char(10),
    address char(80),
    tel char(20),
    email char(20),

    primary key(num)
);
mysql>show tables;  // 테이블 생성 확인
````


![Query OK, 테이블이 만들어졌다](/assets/images/posts/2022/0208/mysql-syntax-08.png)
_Query OK, 테이블이 만들어졌다_

![friend 테이블이 생성된것을 확인](/assets/images/posts/2022/0208/mysql-syntax-09.png)
_friend 테이블이 생성된것을 확인_


<hr>

## 데이터베이스 테이블 구조 확인

`desc 테이블명;`

````shell
mysql>desc friend;
````

![테이블 구조 확인](/assets/images/posts/2022/0208/mysql-syntax-10.png)
_테이블 구조 확인_


<hr>

## 데이터베이스 테이블 수정 명령

### 새로운 필드 추가 명령
alter table 테이블명 add 새로운필드명 필드타입 [first 또는 after 필드명];

````shell
mysql>alter table friend add age int;  // friend 테이블에 age 필드를 정수형으로 추가 (제일 마지막에 추가됨)
mysql>alter table friend add hp char(20) after tel;  // tel 필드 바로 다음에 hp필드를 추가
````

![age filed가 맨 마지막에 추가된 것을 확인할 수 있다.](/assets/images/posts/2022/0208/mysql-syntax-11.png)
_age filed가 맨 마지막에 추가된 것을 확인할 수 있다._

![tel 다음에 hp filed가 추가된 것을 확인](/assets/images/posts/2022/0208/mysql-syntax-12.png)
_tel 다음에 hp filed가 추가된 것을 확인_


### 필드 삭제 명령

alter table 테이블명 drop 삭제할 필드명1, drop 필드명2, ....;

````shell
mysql>alter table friend drop email;   // email 필드 삭제
mysql>alter table friend drop age, drop hp;    // age, hp 필드 삭제 
mysql>desc friend;
````

![email과 age filed가 삭제된 것을 확인](/assets/images/posts/2022/0208/mysql-syntax-13.png)
_email과 age filed가 삭제된 것을 확인_



### 필드 수정 명령

alter table 테이블명 change 이전필드명 새로운필드명 필드타입;

````shell
mysql>alter table friend change tel phone int;    // tel 필드를 phone 필드 정수형으로 수정
mysql>desc friend;
````

![tel 필드가 삭제되고 phone필드가 들어감](/assets/images/posts/2022/0208/mysql-syntax-14.png)
_tel 필드가 삭제되고 phone필드가 들어감_


### 필드 타입 수정 명령

alter table 테이블명 modify 필드명 새로운타입 not null;

````shell
mysql>alter table friend modify name char(20);   // name 필드 타입을 char(20)로 수정
mysql>desc friend;
````

![필드 타입 수정 명령](/assets/images/posts/2022/0208/mysql-syntax-15.png)



### 데이터베이스 테이블명 수정 명령

alter table 이전테이블명 rename 새로운테이블명;

````shell
mysql>alter table friend rename student;
mysql>show tables;
````

![테이블명이 student 로 변경됨](/assets/images/posts/2022/0208/mysql-syntax-16.png)
_테이블명이 student 로 변경됨_


### 데이터베이스 테이블 삭제 명령

drop table 테이블명;

````shell
mysql>drop table student;
mysql>show tables;
````

![테이블이 삭제됨](/assets/images/posts/2022/0208/mysql-syntax-17.png)
_테이블이 삭제됨_


<hr>

## 데이터베이스 문자셋 확인하기

mysql>show variables like 'c%';

````shell
mysql>show variables like 'c%';
````

![데이터베이스 문자셋 확인하기](/assets/images/posts/2022/0208/mysql-syntax-18.png)
