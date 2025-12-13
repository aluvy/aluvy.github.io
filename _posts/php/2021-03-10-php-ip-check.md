---
title: "[PHP] 특정 IP 에서만 노출"
date: 2021-03-10 09:53:00 +0900
categories: [PHP]
tags: [php]
render_with_liquid: false
math: true
mermaid: true
---

실 서버 유지보수 작업 시 유용합니다.   
if문 안에 있는 내용은 설정된 IP 내에서만 보여집니다.

````php
<? if($_SERVER['REMOTE_ADDR']=='아이피') { ?>
  특정 IP에서만 노출됩니다.
<? } ?>
````
