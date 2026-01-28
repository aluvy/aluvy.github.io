---
title: "[Accessibility] WAI-ARIA 요소 - aria-roleDescription"
date: 2023-01-24 16:52:00 +0900
categories: [Web Accessibility]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## aria-roledescription 소개
aria-roledescription은 이름에서 바로 기능을 알 수 있듯이, 요소 역할(role)의 역할을 커스터마이징하여 전달하는 것입니다.
````html
<a href="..." aria-roledescription="Banner link">가을 난방 30% 할인</a>
````
aria-roledescription은 WAI-ARIA 1.1 부터 추가된 WAI-ARIA의 속성으로,   
이미 정해진 요소의 역할을 더 명확하게 만드는데 사용합니다.   
이미지를 예로 들면 단순한 그래픽이 아니라, "thumbnail graphic"처럼, 무엇에 사용하는 이미지인지 정확히 사용자에게 알려주고자 할 때 사용하는 것 입니다.   
이 외에는 HTML5 에서 따로 정의하진 않았지만, 익히 알려진 영역이나 위젯의 역할을 안내하고자 할 때 사용합니다.

## aria-roledescription의 문제점
aria-roledescription의 특성과 문제점을 알아봅시다.

1. **직역하면 역할 설명에 대한 속성이지만 장문의 설명이 아닌 요소의 역할을 더 명학화게 세분화하기 위해 사용하는 속성입니다.**   
  이는 요소의 역할의 의미를 무시하고, 덮어씌웁니다.   
  대표적으로 많이들 오해하는 부분으로, aria-describedby와 많이 혼동됩니다. aria-roleDescription은 힌트와 같은 문장 안내를 하기 위한 속성이 아닙니다.   
  HTML이나 WAI-ARIA에 있는 역할의 기능에 따라 조금 더 역할을 세분화하고 강조하기 위해 "1, 색인 버튼"과 같이 사용합니다.

2. **roledescription은 ARIA나 네이티브 HTML에서 정의된 요소 유형에 해당해야 합니다.**   
  이 또한 오해하기 쉬운 부분으로, 1번 카드에서 언금했던 것처럼, 특정 요소의 용도를 더 명확하게 명시하기 위해 사용합니다.   
  aria-roledescription은 새로운 컨트롤이나 컨테이너를 정의하기 위해 사용하지 않습니다. 반드시 존재하는 요소 유형을 텍스트로 함께 사용해야 하며, 빈칸을 사용해선 안됩니다.   
  example:   
  aria-roleDescription="DoSomething" - X   
  aria-roleDescription="DoSumething Button" - O

3. **되도록 사용자 상호작용이 없는 요소에 사용하는 것이 바람직합니다.**   
  section, region, group과 같은 클릭이나 키보드 동작이 없는 컨테이너 요소에만 사용하는 것이 바람직합니다.   
  2번 카드에서 설명했던 것처럼, widget에 사용할 수는 있으나 상호작용이 가능한 컨트롤 요소에 사용하면 예상치 못한 버그가 발생하기도 하며, 기기별 호환성 상에 이슈가 있습니다.

4. **컴포넌트에 대한 지역화가 필요합니다.**   
  HTML이나 role 속성을 통해 지정된 역할 이름은 언어마다 현지화가 이루어집니다. 같은 요소여도 사용자의 시스템 언어가 다르다면 그 언어의 단어로 대체됩니다.   
  예를 들어 ul과 li 태그는 한국어를 사용할 때 "목록"이라고 읽어주지만, Windows의 시스템 언어가 English라면 "List"라고 읽을 것입니다.   
  하지만. aria-roledescription의 텍스트는 고정값으로 현지화 번역이 이루어지지 않습니다. 또한, aria-속성 안에 들어 있는 텍스트는 웹사이트 번역 등으로도 번역되지 않습니다.   
  aria-label이나 aria-describedby와 같은 텍스트를 작성하는 속성을 가진 요소를 사용자가 스크린 리더로 안내받을 때, 현지화가 되어있지 않기 때문에 음성 엔진의 언어가 달라 듣지 못하게 됩니다.


## 되도록 사용을 지양해야 한다.
aria-roledescription은 위에 작성된 내용처럼 사용자와 개발자에게 많은 이슈가 있습니다.   
위 내용 3번과 4번의 문제가 가장 치명적인 문제입니다. 이 두 문제를 해결하기 위해서는 서비스에 aria-roledescription을 사용할 때에는 주로 접속할 사용자의 기기, 국가별 언어를 반드시 고려해야 합니다.

4번 내용의 문제는 언어별로 roledescription 텍스트를 다르게 준다면 해결됩니다. 하지만, 3번 항목에서 기기의 호환성을 언급하였는데, Android에서는 aria-roledescription을 제대로 지원하지 않습니다. 따라서 스크린리더에서 개발자의 의도와 맞지 않게 표준 컨트롤 이름을 읽는 이슈가 있으며, 이로 인해 기기 환경에 따라서 동일한 경험을 줄 수 없게 됩니다.

요소 유형 텍스트를 변경한다는 것은 분명히 매력적으로 보입니다.   
하지만 사용자와 개발자, 모두 만족하기에는 아직은 많은 아쉬움이 남습니다.

---

<br>

##### 참고
- [WAI-ARIA 바르게 사용하기 9부 - aria-roleDescription 이해하기](https://nuli.navercorp.com/community/article/1133085)
