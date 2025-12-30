---
title: "파비콘 제작, 웹사이트에 적용하기"
date: 2021-03-08 11:04:00 +0900
categories: [WEB]
tags: []
render_with_liquid: false
math: true
mermaid: true
---


![favicon](/assets/images/posts/2021/03/08/favicon-01.png)
_파비콘 예시_


## 파비콘이란?

파비콘이란 'Favorite + Icon' 의 합성어로 인터넷 웹 브라우저의 즐겨찾기나 주소창에 표시되는 웹사이트나 웹페이지를 대표하는 아이콘을 말한다.

- 확장자 : ico, png
+ 아이콘 크기는 16x16, 32x32, 48x48, 64x64픽셀이 될 수 있고, 8비트, 24비트, 32비트 색상이 가능하다.
- 브라우저 탭과 북마크에서 웹사이트 URL 옆에 나타나며, 방문자가 오픈 탭에서 웹사이트를 구분하기 쉽도록 함
- 브라우저에 상관없이 호환되며 인터넷 익스플로러, 파이어폭스, 크롬, 오페라에서 모두 지원한다.


## 파비콘 만드는 방법

1. 포토샵으로 192 x 192 픽셀의 이미지를 만든다. (확장자는 png 또는 jpg)

    ![favicon](/assets/images/posts/2021/03/08/favicon-02.png)
    _Slog favicon_

2. 사이즈 자동 변환 사이트 Favicon & App Icon Generator 사이트에 접속한다.

    [https://www.favicon-generator.org](https://www.favicon-generator.org)

3. 만든 이미지를 첨부하고 'Create Favicon' 버튼을 클릭한다.

    ![favicon](/assets/images/posts/2021/03/08/favicon-03.png)
    _Favicon & App Icon Generator capture_

4. 'Download the generated favicon' 으로 파일을 다운받는다.

    ![favicon](/assets/images/posts/2021/03/08/favicon-04.png)
    _Download the generator favicon_

5. 다운받은 파일

    ![favicon](/assets/images/posts/2021/03/08/favicon-05.png)
    _다운받은 파일_

6. 아래쪽에 있는 코드를 홈페이지 `<head></head>` 사이에 삽입한다. (이미지 경로 수정이 필요하다)

    ![favicon](/assets/images/posts/2021/03/08/favicon-06.png)

7. `<link rel="shortcut icon" href="">`코드가 빠져있으므로 추가하여 넣어준다.

    ```html
    <!-- 추가 -->
    <link rel="shortcut icon" href="/apple-icon.png">

    <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
    ```

---

## 파비콘 생성 사이트

- [https://www.favicon.cc](https://www.favicon.cc){: target="_blank"}
- [https://www.favicon-generator.org](https://www.favicon-generator.org){: target="_blank"}
- [https://www.websiteplanet.com/ko/webtools/favicon-generator](https://www.websiteplanet.com/ko/webtools/favicon-generator){: target="_blank"}
- [https://icoconvert.com](https://icoconvert.com){: target="_blank"}
- [https://www.degraeve.com/favicon](https://www.degraeve.com/favicon){: target="_blank"}
