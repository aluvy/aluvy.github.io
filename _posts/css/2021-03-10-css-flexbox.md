---
title: "[CSS] Flexbox"
date: 2021-03-10 16:37:00 +0900
categories: [CSS]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## Flexbox란?
CSS3의 새로운 레이아웃 방식이다.

W3C에서이 정식 명칭은 **CSS Flexible Box Layout Module**이라고 정의 하고 있으며 이름처럼 레이아웃을 유연하게 구현하는 모듈이라고 보면 된다.   
예전에 레이아웃을 구현하기 위해서는 정식 사용법이 아닌 편법처럼 복잡하게 구현을 했어야 했던것에 반해 **Flexbox**는 쉽게 레이아웃을 구현할 수 있다.

## Flexbox의 구성요소

Flexbox는 부모 요소인 **container**와 자식 요소인 **item**으로 구성된다. Flex의 선언은 container의 CSS에 `display:flex;`로 선언한다.


```html
<div class="conatiner">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</div>
```

```css
.container {display:flex;}
```

## Flexbox 정렬 개념

- 주축이 되는 main-axis와 교차축이 되는 cross-axis의 개념이 있다.
- item의 정렬은 주축(main-axis)에 따라 결정된다.
- 주축의 방향은 flex container의 flex-direction 속성으로 결정한다. 기본 값은 row다. (왼쪽에서 오른쪽 방향)

![Flexbox의 주축과 교차축](/assets/images/posts/2021/0310/flexbox.png)
_Flexbox의 주축과 교차축_


---

## container 속성

flex의 설정은 대부분 container쪽에 지정합니다. item에 지정하는 경우는 item별로 개별지정할 때 주로 사용됩니다.



### display

flex container를 정의한다.

```css
.container {
  display: flex; /* block 특성 */
  display: inline-flex; /* inline 특성 */
}
```


### flex-direction
container 안에 있는 item을 어떤 방향으로 나열할 지 주축(main-axis)을 결정한다.

![flex-direction](/assets/images/posts/2021/0310/flexbox-1.png)
_flex-direction_

```css
.container {
  display:flex;
  flex-direction:row;
}
```

- **row** (기본값)
  - item을 수평방향으로 좌에서 우로 나열함 (float:left)

- **row-reverse**
  - item을 수평방향으로 우에서 좌로 나열함 (float:right)

- **column**
  - item을 수직방향으로 상에서 하로 나열함

- **column-reverse**	
  - item을 수직방향으로 하에서 상으로 나열함


### flex-wrap

container 안에 있는 item이 container를 넘어설 때 줄바꿈을 할 지 한 줄로 표현할지에 대해 지정한다.

![flex-wrap](/assets/images/posts/2021/0310/flexbox-2.png)
_flex-wrap_

```css
.container {
  display:flex;
  flex-wrap:nowrap;
}
```

- **nowrap** (기본값)	
  - item을 줄바꿈하지 않고 한줄에 표시함

- **wrap**
  - item이 container를 넘어설 경우 다음줄에 줄바꿈하여 표시함

- **wrap-reverse**
  - item이 container를 넘어설 경우 역방향으로 줄바꿈하여 표시함


### flex-flow

> flex-direction과 flex-wrap를 flex-flow로 한 줄에 지정할 수 있다.   
> 첫번재 요소는 flex-direction, 두번째 요소는 flex-wrap의 설정값을 넣어준다.
{: .prompt-tip}

```css
.container {
  display:flex;
  /* flex-direction: row; flex-wrap: nowrap; */
  flex-flow:row wrap;
}
```

### justify-content

container 안에 있는 item들을 수평방향으로 정렬하는 방법을 지정한다. (주축, main-axis의 정렬방법 설정)

![justify-content](/assets/images/posts/2021/0310/flexbox-3.png)
_justify-content_

```css
.container {
  display:flex;
  flex-flow: row wrap;
  justify-content:space-between;
}
```

- **flex-start**
  - container안에 있는 item들을 왼쪽으로 정렬함(기본값)

- **flex-end**
  - container안에 있는 item들을 오른쪽으로 정렬함

- **center**
  - container안에 있는 item들을 수평방향의 중앙으로 정렬함

- **space-between**
  - container안에 있는 item들을 좌우 여백 없이 일정 간격으로 정렬함

- **space-around**
  - container안에 있는 item들을 좌우 간격 일정하게 정렬함

- **space-evenly**
  - container안에 있는 item들의 간격을 동일하게 정렬함



### align-items

container안에 있는 item들을 수직방향으로 정렬하는 방법을 지정한다. (교차축, cross-axis 정렬 방법 설정, item이 1줄일 경우에만 사용된다)

![align-items](/assets/images/posts/2021/0310/flexbox-4.png)
_align-items_

```css
.container {
  display:flex;
  flex-flow:row nowrap; /* nowrap일때만 사용 가능 */
  align-items:center;
}
```

- **flex-start**
  - container안에 있는 item들을 상단에 정렬함(기본값)

- **flex-end**
  - container안에 있는 item들을 하단에 정렬함

- **center**
  - container안에 있는 item들을 수직방향의 중앙에 정렬함

- **baseline**
  - container안에 있는 item들을 baseline으로 정렬함

- **stretch**
  - container안에 있는 item들을 container의 높이와 동일하게 상하로 늘려서 상단과 하단에 정렬함 (item의 높이를 주면 안된다)



### align-content

container안에 있는 item들이 여러줄로 표시될 때 수직방향으로 정렬하는 방법을 지정한다.

![align-content](/assets/images/posts/2021/0310/flexbox-5.png)
_align-content_


```css
.container {
  display:flex;
  flex-flow:row wrap;
  align-content:flex-start;
  
  /*
  align-content: normal;
  align-content: start;
  align-content: end;
  align-content: baseline;
  align-content: first baseline;
  align-content: last baseline;
  align-content: safe;
  align-content: unsafe;
  */
}
```

- **flex-start**
  - container안에 있는 여러 줄의 item들을 모두 상단에 정렬함(기본값)

- **flex-end**
  - container안에 있는 여러 줄의 item들을 모두 하단에 정렬함

- **center**
  - container안에 있는 여러 줄의 item들을 모두 수직방향의 중앙에 정렬함

- **space-between**
  - container안에 있는 item들으 줄을 상하단의 여백 없이 일정 간격의 수직방향으로 정렬함

- **space-around**
  - container안에 있는 item들의 줄을 일정 간격으로 수직방향으로 정렬함

- **stretch**
  - container안에 있는 item들의 줄의 높이를 container의 높이와 맞게 늘려서 정렬함

- **space-evenly**
  - container안에 있는 item들의 간격을 동일하게 수직방향 정렬함



### gap

item 사이의 gap을 설정한다.

```css
.gap {
	display:flex;
	gap:1rem;
}
```

---

## item 속성

item들의 대한 설정으로, item의 넓이, 순서 등 item의 개별적인 속성에 대해 설정한다.

### order

items의 순서를 설정한다. 음수값도 사용할 수 있으며 숫자가 작을수록 왼쪽에, 큭수록 오른쪽에 위치한다.

![order](/assets/images/posts/2021/0310/flexbox-6.png)
_order_

```css
.container .item1{order:-1;}
.container .item2{order:0;}
.container .item3{order:1;}
.container .item4{order:2;}
```

### flex-grow

각 item의 넓이를 배수로 지정 합니다. item1의 flex-grow가 1이고 item2의 flex-grow가 2라면 item2는 item1보다 2배가 크게 됩니다. 기본값은 0이며, 음수는 사용하지 않습니다.

![flex-grow](/assets/images/posts/2021/0310/flexbox-7.png)
_flex-grow_

```css
.container .item1{flex-grow:1;}
.container .item2{flex-grow:2;}
.container .item3{flex-grow:0;}
.container .item4{flex-grow:0;}
```


### flex-shrink

flex-grow와 반대로 각 item의 넓이를 배수로 줄여줍니다. item1이 flex-shrink가 1이고 item2 flex-shrink가 2라면 item2는 item1보다 2배가 작게 됩니다. 기본값은 1이며, 음수는 사용하지 않습니다.

![flex-shrink](/assets/images/posts/2021/0310/flexbox-8.png)
_flex-shrink_

```css
.container .item1{flex-shrink:1;}
.container .item2{flex-shrink:2;}
.container .item3{flex-shrink:0;}
.container .item4{flex-shrink:0;}
```

### flex-basis

item의 기본 크기값을 지정한다.

```css
.container .item1{flex-basis:200px;}
```


### flex

> flex-grow, flex-shrink, flex-basis를 flex 한 줄에 지정할 수 있다.   
> 첫번째 요소는 flex-grow, 두번째 요소는 flex-shrink, 세번째 요소는 flex-basis 설정값을 지정한다.   
> 기본값은 flex:0 1 auto;다.
{: .prompt-tip}

```css
.container. item{flex:0 1 200px;}
```

### align-self

지정된 item의 독자적인 수직방향 정렬을 지정한다. container 속성의 align-item의 속성과 동일하게 지정된다.

![align-self](/assets/images/posts/2021/0310/flexbox-9.png)
_align-self_

```css
.container .item1{align-self:flex-end;}
```


- **flex-start**
  - container안에 있는 지정된 item을 상단에 정렬함

- **flex-end**
  - container안에 있는 지정된 item을 하단에 정렬함

- **center**
  - container안에 있는 지정된 item을 수직방향의 중앙에 정렬함

- **baseline**
  - container안에 있는 지정된 item을 baseline으로 정렬함

- **stretch**
  - container안에 있는 지정된 item을 container의 높이와 동일하게 상하로 늘려서 상단과 하단에 정렬함


<br>

---

<br>

##### 참고

- [marina-ferreira.github.io/tutorials/css/flexbox/](https://marina-ferreira.github.io/tutorials/css/flexbox/){: target="_blank"}
- [https://d2.naver.com/helloworld/8540176](https://d2.naver.com/helloworld/8540176){: target="_blank"}
- [https://www.heropy.dev/p/Ha29GI](https://www.heropy.dev/p/Ha29GI){: target="_blank"}
- [https://ux.stories.pe.kr/43?category=748568](https://ux.stories.pe.kr/43?category=748568){: target="_blank"}
