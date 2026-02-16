---
title: "[JavaScript] Element: insertAdjacentHTML()"
date: 2024-04-15 10:50:00 +0900
categories: [JavaScript]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## insertAdjacentHTML()
인터페이스의 `insertAdjacentHTML()` 메서드는 지정된 텍스트를 HTML 혹은 XML로 파싱하고 결과 노드들을 지정된 위치의 DOM 트리에 삽입합니다.

### Syntax

````js
insertAdjacentHTML(position, text)
````

- **position**   
  요소와 상대적인 위치를 나타내는 문자열입니다. 다음 문자열 중 하나여야 합니다.
  - `beforebegin`: 요소 이전에 위치합니다. 오직 요소가 DOM 트리에 있고 부모 요소를 가지고 있을 때만 유효합니다.
  - `afterbegin`: 요소 바로 안에서 처음 자식 이전에 위치합니다.
  - `beforeend`: 요소 바로 안에서 마지막 자식 이후에 위치합니다.
  - `afterend`: 요소 이후에 위치합니다. 오직 요소가 DOM 트리에 있고 부모 요소를 가지고 있을 때만 유효합니다.

- **text**   
  HTML 혹은 XML로 파싱되고 트리에 삽입되는 문자열입니다.




### description

`insertAdjacentHTML()` 메서드는 사용되고 있는 요소를 다시 파싱하지 않아서 해당 요소 내의 기존 요소들을 손상시키지 않습니다. 이는 추가적인 직렬화 단계를 피하므로 직접적인 innerHTML 조작보다 훨씬 빠릅니다.

다음과 같이 삽입된 콘텐츠의 가능한 위치를 시각화할 수 있습니다.

````html
<!-- beforebegin -->
<p>
  <!-- afterbegin -->
  foo
  <!-- beforeend -->
</p>
<!-- afterend -->
````




### example

````html
<select id="position">
  <option>beforebegin</option>
  <option>afterbegin</option>
  <option>beforeend</option>
  <option>afterend</option>
</select>

<button id="insert">Insert HTML</button>
<button id="reset">Reset</button>

<p>
  Some text, with a <code id="subject">code-formatted element</code> inside it.
</p>
````

````css
code {
  color: red;
}
````

````js
const insert = document.querySelector("#insert");
insert.addEventListener("click", () => {
  const subject = document.querySelector("#subject");
  const positionSelect = document.querySelector("#position");
  subject.insertAdjacentHTML(
    positionSelect.value,
    "<strong>inserted text</strong>",
  );
});
const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
  document.location.reload();
});
````

---
<br>

##### 참고

- [MDN \| ertAdjacentHTML() 메서드](https://developer.mozilla.org/ko/docs/Web/API/Element/insertAdjacentHTML)
- [MDN \| Playground](https://developer.mozilla.org/ko/play)
