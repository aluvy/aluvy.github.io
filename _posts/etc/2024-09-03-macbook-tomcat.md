---
title: "맥북 (Mac OS) M2 톰캣 설치하기"
date: 2024-09-03 15:02:00 +0900
categories: [ETC]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## 1. 톰캣 설치

아파치 톰캣 사이트에 접속합니다.   
<https://tomcat.apache.org/>

![alt text](/assets/images/posts/2024/09/03/macbook-tomcat-01.png)
_https://velog.io/@wijoonwu_

- 페이지 왼쪽의 `Download` 카테고리에서 다운로드 할 톰캣 버전을 클릭합니다.
- 내게 맞는 톰캣 버전을 찾는 방법 참고: <https://itworldyo.tistory.com/88>

  ![alt text](/assets/images/posts/2024/09/03/macbook-tomcat-02.png)
  _https://velog.io/@wijoonwu_

- `Binary Distributions` 항목에서 `tar.gz` 파일을 클릭 해 다운로드 합니다.

  ![alt text](/assets/images/posts/2024/09/03/macbook-tomcat-03.png)
  _https://velog.io/@wijoonwu_

- 저장 경로를 설정하고 `저장` 버튼을 클릭합니다.
- 다운로드가 시작됩니다.

  ![alt text](/assets/images/posts/2024/09/03/macbook-tomcat-04.png)
  _https://velog.io/@wijoonwu_

  ![alt text](/assets/images/posts/2024/09/03/macbook-tomcat-05.png)
  _https://velog.io/@wijoonwu_


- 설치 된 tar.gz 파일을 더블 클릭하여 압축을 해제 합니다.


## 2. 톰캣 실행

![alt text](/assets/images/posts/2024/09/03/macbook-tomcat-06.png)
_https://velog.io/@wijoonwu_

![alt text](/assets/images/posts/2024/09/03/macbook-tomcat-07.png)
_https://velog.io/@wijoonwu_


- `Finder`에서 톰캣이 설치된 경로로 접속합니다.
- 키보드에서 `command` + `option` + `c` 를 동시에 눌러 경로를 복사합니다.

  ![alt text](/assets/images/posts/2024/09/03/macbook-tomcat-08.png)
  _https://velog.io/@wijoonwu_

- 터미널을 실행합니다.
- `cd` + 복사해둔 경로 + `/bin` 명령어를 입력합니다.
- `./startup.sh` 명령어를 입력하여 톰캣을 실행합니다.
- `Tomcat started.` 문구가 출력되면 성공입니다.
- `./shutdown.sh` 명령어를 입력하면 톰캣 서버가 중지됩니다.

  ![alt text](/assets/images/posts/2024/09/03/macbook-tomcat-09.png)
  _https://velog.io/@wijoonwu_

- 인터넷 브라우저를 실행한 뒤 주소창에 `localhost:8080` 을 입력합니다.
- 위 이미지와 같이 톰캣 페이지가 출력되면 성공입니다.


---

<br>

##### 참고

- [맥북(Mac OS) M1 톰캣 설치하기](https://velog.io/@wijoonwu/%EB%A7%A5%EB%B6%81Mac-OS-M1-%ED%86%B0%EC%BA%A3-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0)
