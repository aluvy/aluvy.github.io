---
title: "노드 복제와 템플릿 Node clone, template"
date: 2022-05-30 19:15:00 +0900
categories: [JavaScript]
tags: []
render_with_liquid: false
math: true
mermaid: true
---



````javascript
window.addEventListener("load", function(){
  var notices = [
    {id:5, title:"추가한당~~~", regDate:"2019-01-26", writerId:"newlec", hit:"0"},
    {id:6, title:"복제한당~~", regDate:"2019-01-26", writerId:"newlec", hit:"0"}
  ]

  var section = document.querySelector('#section7');

  var noticeList = section.querySelector(".notice-list");
  var tbodyNode = noticeList.querySelector('tbody');

  var cloneBtn = section.querySelector(".clone-btn");
  var templateBtn = section.querySelector(".template-btn");


  cloneBtn.onclick = function(){
    var trNode = noticeList.querySelector("tbody tr");   // querySelector는 첫번째 1개만 가져온다
    var cloneNode = trNode.cloneNode(true); // false하면 껍데기만 복제한다.

    // 데이텨 교체
    var tds = cloneNode.querySelectorAll("td"); // td 5개가 셀렉된다
    tds[0].innerText = notices[0].id;
    tds[1].innerHTML = '<a href="#">' + notices[0].title + '</a>';
    tds[2].innerText = notices[0].regDate;
    tds[3].innerText = notices[0].writerId;
    tds[4].innerText = notices[0].hit;


    tbodyNode.append(cloneNode);    // 마지막에 넣는다.

  }

  templateBtn.onclick = function(){

    var template = section.querySelector("template");   // 템플릿 선택
    var cloneNode = document.importNode(template.content, true);   // 클론하지 않고, document에서 template를 임포트한다. true:전부, false:껍데기만

    // 데이텨 넣기
    var tds = cloneNode.querySelectorAll("td"); // td 5개가 셀렉된다
    tds[0].innerText = notices[0].id;

    // tds[1].innerHTML = '<a href="#">' + notices[0].title + '</a>';
    var aNode = tds[1].children[0]; // a 선택
    aNode.href = "#";
    aNode.textContent = notices[0].title;

    tds[2].innerText = notices[0].regDate;
    tds[3].innerText = notices[0].writerId;
    tds[4].innerText = notices[0].hit;


    tbodyNode.append(cloneNode);    // 마지막에 넣는다.
  }

});
````


---

<br>

##### 참고

- [34강 노드 복제와 템플릿](https://www.notion.so/mioksong/JavaScript-DOM-for-Vanilla-JS-c6edf7a6bbe2405595d91d21eda3bc1e#ed58eb48a5c3422db5d305e4127938d3)
- [jQuery 로 template 태그 사용하기](https://lynmp.com/ko/article/ucdff0097f8f)
