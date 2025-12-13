---
title: "Entity"
date: 2025-11-24 08:26:00 +0900
categories: [ETC]
tags: [html, entity, unicode]
render_with_liquid: false
math: true
mermaid: true
---

## 엔티티 (Entity)란?

HTML에는 미리 예약 된 몇몇 문자가 있으며, 이러한 문자를 HTML 예약어(reserved characters)라고 부른다.

이러한 HTML 예약어를 HTML코드에서 사용하면, 웹 브라우저는 그것을 평소와는 다른 의미로 해석한다.

따라서 HTML 예약어를 기존에 사용하던 의미 그대로 사용하기 위해 별도로 만든 문자셋을 엔티티(Entity)라고 한다.

## Entity Code

HTML에서 제공하는 대표적인 엔티티(entity)는 다음과 같습니다.

| 기호 | HTML코드 | CSS코드 | 유니코드   | 설명        |
| :--- | :------- | :------ | :--------- | :---------- |
| 공백 | `&#160;` | `\00A0` | `&nbsp;`   | space       |
| <    | `&#60;`  | `\003C` | `&lt;`     | 좌측 화살표 |
| >    | `&#62;`  | `\003E` | `&gt;`     | 우측 화살표 |
| &    | `&#38;`  | `\0026` | `&amp;`    | 앰퍼샌드    |
| ⓒ    | `&#169;` | `\00A9` | `&copy;`   | 저작권 서명 |
| @    | `&#64;`  | `\0040` | `&commat;` | 상업용      |





<br>


#### 참고

- [HTML 엔티티](https://symbl.cc/kr/html-entities/){: target="_blank"}
- [EntityCode](https://entitycode.com/){: target="_blank"}
- [HTML Arrow Symbol, Arrow Entity and ASCII Arrow Character Code Reference](https://www.toptal.com/designers/htmlarrows/arrows/){: target="_blank"}
- [
Character Entities for HTML, CSS and Javascript](https://oinam.github.io/entities/){: target="_blank"}
