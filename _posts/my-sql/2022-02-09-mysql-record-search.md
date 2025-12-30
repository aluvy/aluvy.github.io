---
title: "[MySQL] 레코드 검색 명령 where, order"
date: 2022-02-09 11:51:00 +0900
categories: [MySQL]
tags: [mysql]
render_with_liquid: false
math: true
mermaid: true
---

## 레코드 검색 명령

````
select 필드명1, 필드명2 from 테이블명;
select * from 테이블명;    //모든필드 검색
select * from 테이블명 where 조건절;
````

### 전체 필드 검색
````sql
mysql>select id,name,address from mem;
````

전체 필드 검색
````sql
mysql>select * from mem;
````

### 검색어로 검색

여성의 아이디, 이름, 주소, 전화번호, 성별 보기
````sql
mysql>select id,name,address,tel,gender from mem where gender='W';
````

### 조건문 검색

50세 이상인 레코드의 전체 필드 보기
````sql
mysql>select * from mem where age>=50;
````

20대인 레코드의 전체 필드 보기
````sql
mysql>select * from mem where age>=20 and age<30;
````

20대이고 남자인 레코드 전체 필드 보기
````sql
mysql>select * from mem where (age>=20 and age<30) and gender='M';
````

20대 또는 40대 여성인 레코드 전체 필드 보기
````sql
mysql>select * from mem where ((age>=20 and age<30) or (age>=40 and age<50)) and gender='W';
````

이름이 김진모인 해당 필드 보기
````sql
mysql>select name,id,address,age from mem where name='김진모';
````

### % 이용한 검색 like문

이름이 김씨인 해당 필드 보기
````sql
mysql>select name,id,address,age from mem where name like '김%';
````

부산에 사는 여성의 모든 필드 보기
````sql
mysql>select * from mem where address like '부산%' and gender='W';
````

가운데 글자가 용인 사람의  모든 필드 보기
````sql
mysql>select * from mem where  name like '__용%';
````

광주에사는 김씨인 사람의  모든 필드 보기
````sql
mysql>select * from mem where  name like '김%' and address like '광주%';
````

![alt text](/assets/images/posts/2022/02/09/record-search-01.png)
_select id,name,address,tel,gender from mem where gender='W';_


<hr>

## 레코드 정렬 명령

기본은 오름차순 정렬(1~10, A~Z)
````
select 필드명1, 필드명2 form 테이블명 where 조건절 order by 필드명;
````

내림차순 정렬
````
select 필드명1, 필드명2 form 테이블명 where 조건절 order by 필드명 desc;
````

검색된 레코드 중 개수제한
````
select 필드명1, 필드명2 form 테이블명 where 조건절 order by 필드명 limit 개수;
````

### 나이 순으로 오름차순정렬 하고 해당 필드 보기

````sql
mysql>select age,id,name,gender,tel from mem order by age;
````

### 나이 순으로 내림차순정렬 하고 해당 필드 보기

````sql
mysql>select age,id,name,gender,tel from mem order by age desc;
````

### 서울에 사는 나이가 많은 순서대로 정렬하고 해당 필드 보기

````sql
mysql>select age,name,address from mem where address like '서울%' order by age desc;
````

### 10개의 레코드를 num필드값에 내림차순으로 검색

````sql
mysql>select num,id,name,address,tel from mem order by num desc limit 10;
````

<hr>

## 문제

### 1. 경기도에 사는 김씨 성은 가진 남자의 레코드를 검색

````sql
MariaDB [song_db]> select * from mem where address like '%경기%' and name like '김%' and gender='M';
````

### 2. 부산에 사는 20대 이상의 남자 중 나이가 많은 순서대로 2개의 레코드를 검색

````sql
MariaDB [song_db]> select * from mem where address like '부산%' and age>=20 and gender='M' order by age desc limit 2;
````
