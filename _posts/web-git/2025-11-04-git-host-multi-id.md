---
title: "[Git] Host로 아이디2개 사용"
date: 2025-02-03 17:24:00 +0900
categories: [git]
tags: []
render_with_liquid: false
math: true
mermaid: true
---



````shell
[user]
  email = mosong@the-51.com
  name = mosong

# aluvy (HTTPS)
[includeIf "hasconfig:remote.*.url:https://github.com/aluvy/**"]
  path = ~/.gitconfig-aluvy

# aluvy (SSH)[includeIf "hasconfig:remote.*.url:git@github.com:aluvy/**"]
  path = ~/.gitconfig-aluvy
````
{: file=".gitconfig"}




````shell
[user]
  email = aluvy_@naver.com
  name = songmiok
````
{: file=".gitconfig-aluvy"}
