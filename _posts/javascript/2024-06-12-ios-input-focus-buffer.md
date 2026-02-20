---
title: "iOS input focus, buffer"
date: 2024-06-12 21:02:00 +0900
categories: [JavaScript, JavaScript-basic]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

![alt text](/assets/images/posts/2024/06/12/ios-buffer-01.png)
_'오늘날씨' 입력_

![alt text](/assets/images/posts/2024/06/12/ios-buffer-02.png)
_value 삭제 후 '내일날씨' 입력을 위해 'ㄴ' 입력 ('씨' 가 buffer로 자동입력)_


한글은 자음, 모음으로 구성된다.

iOS에서 input 에 있는 value를 'X' 버튼 등으로 한번에 삭제하고 다시 input에 focus를 주려고 할 때,   
input에 입력되어 있던 문자가 한글이고, 마지막 문자가 받침이 없는 문자였다면,   
문자를 재입력 했을 때 남아있던 버퍼가 함께 보여지게 된다.

1. '오늘날씨' 입력 후
2. X 버튼 클릭응로 value 삭제
3. input에 focus가 옮겨지고 '내일날씨'를 입력

이런 경우에 input value에는 '내일날씨'가 입력되어 있는게 아니라, 남아있던 buffer로 인해 '씨내일날씨'가 입력되게 된다.

이 문제는, input에 focus를 주기 전, 다른 input을 생성해 그곳에 먼저 focus를 줬다가, 검색 input에 다시 focus를 줘서 buffer를 삭제해줘야 한다.

````js
const hiddenInp = document.createElement('input');
        
hiddenInp.setAttribute('type', 'text');	// 숨겨진 input (CSS 등 으로 숨긴다)

this.doc.body.prepend(hiddenInp);
hiddenInp.focus();	// focus

window.setTimeout(() => {
  this.inp.nativeElement.focus();
  hiddenInp.remove();
}, 0);
````

---

<br>

##### 참고

- [iOS 한글 buffer 문제](https://ggodong.tistory.com/294)
