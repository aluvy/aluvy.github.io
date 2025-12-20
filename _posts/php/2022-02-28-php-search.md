---
title: "[PHP] 검색"
date: 2022-02-28 12:17:00 +0900
categories: [PHP]
tags: [PHP]
render_with_liquid: false
math: true
mermaid: true
---

유효성 검사 후 검색기능

### index.php

````php
<script>
  function check_search() {
    if (!document.board_form.search.value) {
      alert("검색어를 입력하세요!");    
      document.board_form.search.focus();
      return;
    }

    document.board_form.submit();
  }
</script>


<form name="board_form" method="post" action="concert/list.php?table=concert&mode=search">
  <label class="hidden" for="find">상품명</label>
  <input type="hidden" id="find" name="find" value="subject">

  <label class="hidden" for="search">상품검색어입력</label>
  <input type="text" id="search" name="search" placeholder="상품명검색">
  <input type="button" value="검색" onclick="check_search()">
</form>
````
