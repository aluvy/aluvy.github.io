---
title: "[CSS] Reset.css vs Normalize.css"
date: 2021-10-07 08:26:00 +0900
categories: [CSS]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

브라우저마다 제공하는 user agent style이라는게 있다.   
브라우저의 스타일링 기본값이라 생각하면 된다.

기본적으로 스타일이 적용된다는 게 사용자에게는 유용할 수 있지만 개발자 입장에서는 매번 번거롭게 새로 선언해줘야 하기 때문에 오히려 피곤하다.

그리고 크롬, 파이어폭스 등 브라우저들이 모두 일관된 스타일을 제공하지 않는 경우도 있어 크로스브라우징에 어려움이 있다.

이런 어려움을 극복하기 위한 전략으로 크게 reset css와 normalize css가 있다.



## Reset CSS란?

reset.css는 브라우저에서 통일된 화면을 볼 수 있도록 기본값을 초기화 것이다.

구글링 해보면 리셋 방법도 굉장히 다양하게 나와 있는 걸 알 수 있는데,   
그 중 Eric Meyer라는 개발자가 만들어 놓은 reset css가 가장 유명하다.

하지만 가장 최근 업데이트가 2011년에 있었던 만큼 오래된 자료이기도 하고,   
유용한 스타일도 초기화해서 비효율을 초래할 수 있다는 비판이 있다.

 - 웹 브라우저마다 각기 다른 default 스타일이 지정되어 있어, 이를 초기화함으로써 사양한 웹브라우저에서도 동일한 스타일이 적용되도록 하는 설정

- W3C에서 공식적으로 권장하는 기법이라기 보다는 실무에서 편의에 의해 임의로 지정하는 설정

 
> - 국내에서는 대부분 front-end개발의 아버지로 칭하는 Eric Meyer의 Reset.css를 사용
> - 국내에서는 아직 normalize 보다는 reset을 하는 추세이다.
{: .prompt-tip}


[CSS Tools: Reset CSS](https://meyerweb.com/eric/tools/css/reset/){: target="_blank"}


### Reset.css의 장단점
- 장점
  + 익숙하다
  + 고려해야 할 변수가 적다
- 단점
  - 코드가 복잡해 진다.
  - 최근 업데이트가 없다.

<br>

## Normalize CSS란?

Normalize CSS는 브라우저 간 유저 에이전트 스타일의 오타를 줄이고, 버그만 줄이는 방향으로 스타일을 재지정한다.

Reset CSS는 기본값을 싹 엎는데 반해 Normalize CSS는 기본값들을 최대한 보존하고 수정을 최소화 한다.


> - Reset CSS는 여러 방법이 있으나, 최근 외국에서는 normalize.css를 주로 사용하는 추세임
> - Normalize CSS 다운로드 : https://necolas.github.io/normalize.css/
> - CDN 기법을 통해 링크로 적용시킬 수 있음 https://cdnjs.com/libraries/normalize
{: .prompt-tip}

[normalize CSS](https://cdnjs.com/libraries/normalize){: target="_blank"}

### Normalize.css의 장단점
- 장점
  - 코드가 간결해 진다.
  - 지속적으로 업데이트 중이다.
- 단점
  - 어색함
