---
title: "[이슈][CSS] input type=password ios/aos 폰트 크로스브라우징 이슈"
date: 2023-04-06 20:05:00 +0900
categories: [CSS, CSS-basic]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## 이슈
`input type="password"`는 값을 입력하면 value가 ●●●●● 형태로 출력이 되는데, 이 도트의 사이즈가 브라우저별로 상이하여   
디자인적으로 value가 input 가로사이즈 영역을 넘어서는 문제, 크로스브라우징 문제가 발생했다.

**검색결과**   
문제는 (2016년 기준) 비밀번호 입력란에 파이어폭스와 인터넷 익스플로러는 유니코드 코드포인트를 사용하는 '검은 동그라미'(●) 문자를 사용하지만, 크롬은 ' 25CF불렛'(•) 문자를 사용한다는 점이다.

ios safari 에서도 큰 검은 동그라미 형태로 출력되어, 디자인적으로 input 가로사이즈 영역을 넘어서는 문제가 발생하게 되었다.


## 해결방법1
'pass' 라는 base64 사용자정의 글꼴을 사용하여 도트의 사이즈를 통일했다.   
placeholder가 노출될 때에는 다른 곳에서 사용하는 폰트와 같아야 하므로 :not(:placeholder-shown) 선택자를 사용했다.

````css
@font-face {
  font-family: 'pass';
  font-style: normal;
  font-weight: 400;
  src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAATsAA8AAAAAB2QAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAABWAAAABwAAAAcg9+z70dERUYAAAF0AAAAHAAAAB4AJwANT1MvMgAAAZAAAAA/AAAAYH7AkBhjbWFwAAAB0AAAAFkAAAFqZowMx2N2dCAAAAIsAAAABAAAAAQAIgKIZ2FzcAAAAjAAAAAIAAAACAAAABBnbHlmAAACOAAAALkAAAE0MwNYJ2hlYWQAAAL0AAAAMAAAADYPA2KgaGhlYQAAAyQAAAAeAAAAJAU+ATJobXR4AAADRAAAABwAAAAcCPoA6mxvY2EAAANgAAAAEAAAABAA5gFMbWF4cAAAA3AAAAAaAAAAIAAKAE9uYW1lAAADjAAAARYAAAIgB4hZ03Bvc3QAAASkAAAAPgAAAE5Ojr8ld2ViZgAABOQAAAAGAAAABuK7WtIAAAABAAAAANXulPUAAAAA1viLwQAAAADW+JM4eNpjYGRgYOABYjEgZmJgBEI2IGYB8xgAA+AANXjaY2BifMg4gYGVgYVBAwOeYEAFjMgcp8yiFAYHBl7VP8wx/94wpDDHMIoo2DP8B8kx2TLHACkFBkYA8/IL3QB42mNgYGBmgGAZBkYGEEgB8hjBfBYGDyDNx8DBwMTABmTxMigoKKmeV/3z/z9YJTKf8f/X/4/vP7pldosLag4SYATqhgkyMgEJJnQFECcMOGChndEAfOwRuAAAAAAiAogAAQAB//8AD3jaY2BiUGJgYDRiWsXAzMDOoLeRkUHfZhM7C8Nbo41srHdsNjEzAZkMG5lBwqwg4U3sbIx/bDYxgsSNBRUF1Y0FlZUYBd6dOcO06m+YElMa0DiGJIZUxjuM9xjkGRhU2djZlJXU1UDQ1MTcDASNjcTFQFBUBGjYEkkVMJCU4gcCKRTeHCk+fn4+KSllsJiUJEhMUgrMUQbZk8bgz/iA8SRR9qzAY087FjEYD2QPDDAzMFgyAwC39TCRAAAAeNpjYGRgYADid/fqneL5bb4yyLMwgMC1H90HIfRkCxDN+IBpFZDiYGAC8QBbSwuceNpjYGRgYI7594aBgcmOAQgYHzAwMqACdgBbWQN0AAABdgAiAAAAAAAAAAABFAAAAj4AYgI+AGYB9AAAAAAAKgAqACoAKgBeAJIAmnjaY2BkYGBgZ1BgYGIAAUYGBNADEQAFQQBaAAB42o2PwUrDQBCGvzVV9GAQDx485exBY1CU3PQgVgIFI9prlVqDwcZNC/oSPoKP4HNUfQLfxYN/NytCe5GwO9/88+/MBAh5I8C0VoAtnYYNa8oaXpAn9RxIP/XcIqLreZENnjwvyfPieVVdXj2H7DHxPJH/2/M7sVn3/MGyOfb8SWjOGv4K2DRdctpkmtqhos+D6ISh4kiUUXDj1Fr3Bc/Oc0vPqec6A8aUyu1cdTaPZvyXyqz6Fm5axC7bxHOv/r/dnbSRXCk7+mpVrOqVtFqdp3NKxaHUgeod9cm40rtrzfrt2OyQa8fppCO9tk7d1x0rpiQcuDuRkjjtkHt16ctbuf/radZY52/PnEcphXpZOcofiEZNcQAAeNpjYGIAg///GBgZsAF2BgZGJkZmBmaGdkYWRla29JzKggxD9tK8TAMDAxc2D0MLU2NjENfI1M0ZACUXCrsAAAABWtLiugAA) format('woff');
}

input[type=password]:not(:placeholder-shown) {
	font-family: 'pass', 'Roboto', Helvetica, Arial, sans-serif;
}
````

## 해결방법2
폰트로 제작해 사용하는 방법이 있다.   
아래 페이지와 깃허브 참고

- [text-security](https://noppa.github.io/text-security.html)
- [github text-security](https://github.com/noppa/text-security)

----

<br>

##### 참고
- [Styling Password Fields in CSS](https://stackoverflow.com/questions/6859727/styling-password-fields-in-css)
- [\[CSS\] input\[type="password"\] 비밀번호 스타일 지정](https://im-developer.tistory.com/19)

