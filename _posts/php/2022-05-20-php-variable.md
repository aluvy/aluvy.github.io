---
title: "문자 및 변수명 조합으로 가변변수 만들기"
date: 2022-05-20 18:07:00 +0900
categories: [PHP]
tags: [php]
render_with_liquid: false
math: true
mermaid: true
---


````php
${"brand_list".$j}
````


````php
<?php
  for($j=1; $j<10; $j++){
    $brand_array = ${"brand_list".$j};  //   배열명
    for($i=0; $i<count($brand_array); $i++){   
?>
<li class="brand__item">
  <a href="#">
    <div class="photo"><img src="<?=$brand_array[$i]['brandimg']?>" alt="<?=$brand_array[$i]['brandttl']?>"></div>
    <p><?=$brand_array[$i]['brandttl']?></p>
  </a>
</li>
<?php
    }
  }
?>
````
