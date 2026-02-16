---
title: "[Git] 맥 vscode 터미널에 git 현재 branch 표시하기"
date: 2024-07-05 19:59:00 +0900
categories: [git]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## vscode 터미널에 git 현재 branch 표시하기

vscode 터미널 사용 시 현재 브랜치 명이 표시되지 않아 불편하다.

````shell
$ touch .bash_profile
$ open .bash_profile
````

터미널에 .bash_profile 파일을 만들어주고 열어준다.

````js
parse_git_branch() {
  git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}
export PS1="\u@\h \W\[\033[32m\]\$(parse_git_branch)\[\033[00m\] $ "
````
{: file=".bash_profile"}

이 코드를 그대로 저장 후

````shell
$ source .bash_profile
````

방금 그 파일을 실행시켜준다.

---

<br>

##### 참고

- [\[Git\] 맥 vscode 터미널에 git 현재 branch 표시하기](https://velog.io/@kcy8507/Git-%EB%A7%A5-vscode-%ED%84%B0%EB%AF%B8%EB%84%90%EC%97%90-git-%ED%98%84%EC%9E%AC-branch-%ED%91%9C%EC%8B%9C%ED%95%98%EA%B8%B0)
