---
title: "[GSAP] ScrollTrigger"
date: 2024-03-22 21:54:00 +0900
categories: [Library, GSAP]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

ScrollTrigger 플러그인은 페이지 스크롤 이벤트를 사용하여 웹 요소의 애니메이션과 상호 작용하는 강력한 도구입니다. 이 플러그인을 사용하면 스크롤 위치, 화면 진입 및 화면 퇴장과 같은 스크롤 관련 이벤트를 기반으로 웹 요소를 제어하고 애니메이션을 트리거할 수 있습니다.

## 주요기능

- 특정 요소에 애니메이션을 연결하여 해당 요소가 뷰포트에 들어올 때만 재생되도록 할 수 있습니다. 이로써 성능이 향상되며 아름다운 애니메이션을 실제로 볼 수 있게 됩니다!

- ScrollTrigger는 정의된 영역에 들어오거나 나갈 때 애니메이션을 제어할 수 있는 작업(재생, 일시정지, 재개, 다시 시작, 반전, 완료, 재설정)을 수행하거나 스크롤바와 직접 연결하여 스크러버(Scrubber)처럼 작동하도록 할 수 있습니다. `(scrub: true)`

- 애니메이션과 스크롤바 간의 연결을 완화하여 일정 시간 동안 "따라잡는" 시간을 설정할 수 있습니다. 예를 들어 scrub: 1은 1초 동안 따라잡습니다.

- ScrollSmoother와 통합되어 있으며, GreenSock의 네이티브 스크롤 기술 위에 구축된 부드러운 스크롤링 도구입니다 (멤버 전용 혜택).

- 속도를 기반으로 애니메이션의 특정 지점으로 스냅합니다. 실제로 언제든지 스크롤의 `getVelocity()`를 얻을 수 있습니다. 타임라인 내의 가장 가까운 레이블 또는 배열 내의 진행값에 스냅하거나 자신만의 함수 기반 로직을 실행할 수 있습니다.

- 스크롤 트리거를 직접 GSAP 애니메이션 (타임라인 포함)에 포함하거나 독립적인 인스턴스를 생성하고 리치한 콜백 시스템을 활용하여 원하는 작업을 수행할 수 있습니다.

- 고급 핀(Pin) 기능을 사용하여 특정 스크롤 위치 사이에 요소를 고정시킬 수 있습니다. 패딩은 자동으로 추가되어 다른 요소가 요소가 고정 해제될 때 다른 요소가 따라잡을 수 있도록 합니다 (`pinSpacing: false`로 비활성화할 수 있음). 동일한 요소를 다른 지점에서 여러 번 고정할 수도 있습니다.

- 스크롤 위치를 정의하는 데 높은 유연성을 제공합니다. 예를 들어 "이 요소의 중앙이 뷰포트의 중앙에 닿을 때 시작하고, 다른 요소의 하단이 뷰포트의 하단에 닿을 때 끝나는"와 같이 정의할 수 있으며, 키워드 (top, center, bottom, left, right), 백분율, 픽셀 또는 `"+=300px"`와 같은 상대적인 값 등을 사용할 수 있습니다. 구문에 익숙해지면 획기적으로 직관적입니다.

- 수직 또는 수평 스크롤을 수용합니다.

- `onEnter`, `onLeave`, `onEnterBack`, `onLeaveBack`, `onToggle`, `onUpdate`, `onScrubComplete`, `onRefresh`를 포함한 풍부한 콜백 시스템 제공합니다.

- 창 크기 조절 시 위치를 자동으로 다시 계산합니다.

- 개발 중에 시작/끝/트리거 지점을 정확히 보려면 시각적 표시 요소를 활성화할 수 있습니다. `startColor: "green", endColor: "red", fontSize: "12px"`와 같은 사용자 정의 옵션을 사용하여 마커를 사용자 정의할 수 있습니다.

- CSS 클래스를 토글합니다. 예를 들어, `toggleClass: "active"`는 ScrollTrigger가 활성 상태일 때 트리거 요소에 "active" 클래스를 추가합니다. 다른 요소에도 영향을 줄 수 있습니다.

- 반응형 지원 - `matchMedia()` 메서드를 사용하여 표준 미디어 쿼리를 사용하여 다양한 화면 크기에 대한 다른 설정을 생성할 수 있습니다.

- 사용자 정의 컨테이너 - 뷰포트 대신 `<div>` 와 같은 사용자 정의 스크롤러를 정의할 수 있습니다.

- 최대 성능을 위해 고도로 최적화되었습니다 - 스크롤 이벤트가 디바운스되며, 업데이트가 GSAP과 동기화되며 화면 새로고침과 동기화되며 창 크기 조절 계산이 쓸모없이 많이 실행되지 않습니다.

- 스크롤 재킹이 없으므로 CSS 스크롤 스냅과 같은 네이티브 기술과 결합할 수 있습니다. 스크롤 스무딩을 원하는 경우 ScrollSmoother를 사용하거나 `scrollerProxy()` 메서드를 사용하여 타사 부드러운 스크롤 라이브러리와 통합할 수 있습니다.


## example

### Simple example

````js
gsap.to(".box", {
  scrollTrigger: ".box", // ".box"가 뷰포트에 들어올 때 애니메이션이 1번 실행됩니다.
  x: 500
});
````

### Advanced example

````js
let tl = gsap.timeline({
    // 타임라인에 추가 가능
    scrollTrigger: {
      trigger: ".container",
      pin: true,   // 활성화 되면 트리거 요소를 고정시킨다
      start: "top top", // 트리거의 상단이 뷰포트 상단에 닿을 때
      end: "+=500", // 애니메이션 시작 후 500px 스크롤될 때 까지
      scrub: 1, // 부드러운 스크러빙, 스크롤바를 "따라잡는" 데 1초가 걸린다.
      snap: {
        snapTo: "labels", // 타임라인에서 가장 가까운 레이블로 스냅
        duration: {min: 0.2, max: 3}, // 스냅 애니메이션은 0.2 ~ 3초여야 한다. (속도에 따라 결정 됨)
        delay: 0.2, // 마지막 스크롤 이벤트에서 0.2초 기다린 후 스냅 수행
        ease: "power1.inOut" // the ease of the snap animation ("power3" by default)
      }
    }
  });

// 타임라인에 라벨 추가
tl.addLabel("start")
  .from(".box p", {scale: 0.3, rotation:45, autoAlpha: 0})
  .addLabel("color")
  .from(".box", {backgroundColor: "#28a92b"})
  .addLabel("spin")
  .to(".box", {rotation: 360})
  .addLabel("end");
````

### Standalone / Custom example
ScrollTrigger를 애니메이션 내부에 직접 넣을 필요는 없습니다 (비록 이것이 아마도 가장 일반적인 사용 사례일 것입니다). 모든 것에 대해 콜백(callbacks)을 사용하세요.

````js
ScrollTrigger.create({
  trigger: "#id",
  start: "top top",
  endTrigger: "#otherID",
  end: "bottom 50%+=100px",
  onToggle: self => console.log("toggled, isActive:", self.isActive),
  onUpdate: self => {
    console.log(
      "progress:",
      self.progress.toFixed(3),
      "direction:",
      self.direction,
      "velocity",
      self.getVelocity()
    );
  }
});
````




## Config Object

### animation
**Tween \| Timeline** - ScrollTrigger에 의해 제어되어야 하는 GSAP Tween 또는 Timeline 인스턴스입니다. ScrollTrigger 당 하나의 애니메이션이 제어됩니다. 그러나 모든 애니메이션을 단일 Timeline에 포함하거나 원하는 경우 여러 ScrollTrigger를 만들 수 있습니다.

### anticipatePin
**Number** - 큰 섹션 또는 패널을 고정하는 경우 빠르게 스크롤할 때 고정이 약간 지연된 것처럼 보일 수 있습니다. 이는 대부분의 현대 브라우저가 스크롤 리페인트를 별도의 스레드에서 처리하기 때문에 발생합니다. 따라서 고정을 시도하는 시점에 브라우저가 이미 고정되기 전의 콘텐츠를 그렸을 수 있으며, 이로 인해 약 1/60초 동안 보이게 됩니다. 이를 해결하기 위한 유일한 방법은 ScrollTrigger가 스크롤 속도를 모니터하고 고정을 예상하여 약간 일찍 적용하여 고정되지 않은 콘텐츠가 나타나지 않도록 하는 것입니다. 대개 `anticipatePin: 1`의 값은 잘 작동하지만, 이 숫자를 줄이거나 늘려서 고정을 얼마나 일찍 수행할지 제어할 수 있습니다. 그러나 많은 경우에는 anticipatePin을 전혀 필요로 하지 않을 수 있으며 (기본값은 0입니다).

### containerAnimation
**Tween \| Timeline** - 인기 있는 효과 중 하나는 수직 스크롤에 연결된 수평으로 이동하는 섹션을 만드는 것입니다. 그러나 이러한 수평 이동은 네이티브 스크롤이 아니기 때문에 일반 ScrollTrigger는 요소가 수평으로 보이는 걸 trigger 하지 못합니다. 

따라서 ScrollTrigger에게 트리거(`containerAnimation: yourTween`)를 모니터링하도록 지시해야 합니다. 이렇게 하면 컨테이너의 \[수평\] 애니메이션을 모니터링하여 언제 트리거할지 알 수 있습니다. 자세한 내용은 여기에서 확인하십시오. 주의 사항: 컨테이너의 애니메이션은 선형 이징 (`ease: "none"`)을 사용해야 합니다. 또한, 컨테이너 애니메이션을 기반으로 한 ScrollTrigger에서는 고정 및 스냅 핀 기능을 사용할 수 없습니다. 트리거 요소를 수평으로 애니메이션화하는 것을 피해야 하며, 그렇게 하려면 트리거의 시작/끝 값에 애니메이션하는 거리에 따라 오프셋을 설정하십시오.

### end
**String \| Number \| Function** - ScrollTrigger의 종료 위치를 결정합니다. 다음 중 하나일 수 있습니다.
  - **String**: endTrigger(또는 trigger가 정의되지 않은 경우)의 위치와 ScrollTrigger를 종료하기 위해 충족해야 하는 스크롤러의 위치를 설명합니다. 예를 들어, `"bottom center"`는 "endTrigger의 하단이 스크롤러의 중앙에 닿았을 때"를 의미합니다. `"center 100px"`는 "endTrigger의 중앙이 스크롤러의 상단에서 100px 아래에 닿았을 때"를 의미합니다 (수직 스크롤인 경우). "top", "bottom", "center" (또는 `horizontal: true`일 경우 `"left"` 및 `"right"`)와 같은 키워드나 `"80%"`와 같은 백분율, `"100px"`와 같은 픽셀 값을 사용할 수 있습니다. 백분율과 픽셀은 항상 요소/뷰포트의 상단/왼쪽을 기준으로 상대적입니다. `"+=300"`과 같이 단일한 상대값을 정의할 수도 있으며, 이는 "시작 위치에서 300px 이상"을 의미하며, `"+=100%"`은 "시작 위치에서 스크롤러의 높이 이상"을 의미합니다. `"max"`는 최대 스크롤 위치를 나타내는 특수 키워드입니다.
  - **Number**: 정확한 스크롤 값으로, 예를 들어 `200`은 뷰포트/스크롤러가 정확히 200픽셀을 스크롤할 때 트리거됩니다.
  - **Function**: ScrollTrigger가 리프레시되고 위치를 계산할 때마다 (일반적으로 생성 시 및 스크롤러 크기가 조정될 때) 호출되는 함수입니다. 이 함수는 위에서 설명한대로 String 또는 Number를 반환해야 합니다. 이를 통해 값을 동적으로 계산하기가 쉽습니다. 모든 콜백과 마찬가지로 이 함수는 ScrollTrigger 인스턴스 자체를 유일한 매개변수로 받습니다.
  - 이 값은 ScrollTrigger가 생성될 때와 스크롤러가 크기를 조정할 때 일반 문서 흐름에서의 위치를 기반으로 계산되는 정적인 위치입니다. ScrollTrigger는 성능을 위해 상수적으로 다시 계산되지 않습니다. 예를 들어 trigger/endTrigger를 애니메이션화하면 ScrollTrigger는 계속해서 시작/끝 값을 업데이트하지 않습니다. 이 값을 다시 계산하려면 `ScrollTrigger.refresh()`를 호출할 수 있습니다. 기본값은 `"bottom top"`입니다.

`"clamp()"` 값 적용 (버전 3.12+)
  - 계산된 값을 항상 페이지 상단 (0)과 최대 스크롤 위치 사이에서 유지하도록 ScrollTrigger에게 알려주기 위해 종료 값을 `"clamp()"`로 감싸주세요. 실제로는 페이지 하단 근처에 있는 트리거 요소가 일부 스크럽된 애니메이션으로 종료되지 않도록 보장합니다. 예를 들어, `end: "clamp(bottom top)"` - 모든 일반 문자열 기반 값은 `clamp()` 내부에 들어갈 수 있습니다. 예를 들어 `"clamp(20px 80%)"`입니다.

### endTrigger
**String \| Element** - ScrollTrigger가 종료 지점을 계산할 때 정상적인 문서 흐름에서의 위치를 사용하는 요소(또는 요소에 대한 선택자 텍스트)입니다. 트리거 요소와 다른 요소가 아닌 경우 endTrigger를 정의할 필요는 없습니다. 왜냐하면 그게 기본값이기 때문입니다.

## fastScrollEnd
**Boolean \| Number** - true인 경우, 사용자가 특정 속도(기본값 2500px/s)보다 빨리 트리거 영역을 빠져나갈 때 현재 ScrollTrigger의 애니메이션을 완료하도록 강제합니다. 이렇게 하면 사용자가 빠르게 스크롤할 때 애니메이션이 겹치는 것을 방지할 수 있습니다. 최소 속도를 지정하려면 `fastScrollEnd: 3000`과 같이 숫자를 지정할 수 있으며, 이렇게 하면 속도가 3000px/s를 초과할 때만 활성화됩니다. 여기에서 데모를 확인할 수 있습니다.

### horizontal
**Boolean** - 기본적으로 수직 스크롤을 사용하는 것으로 인식합니다. 그러나 수평 스크롤을 사용하는 경우 `horizontal: true` 로 설정하십시오.

### id
**String** - ScrollTrigger 인스턴스에 대한 임의의 고유 식별자로, `ScrollTrigger.getById()`와 함께 사용할 수 있습니다. 이 id는 마커에도 추가됩니다.

### invalidateOnRefresh
**Boolean** - true인 경우, ScrollTrigger와 관련된 애니메이션은 `refresh()`가 발생할 때(일반적으로 크기 조정 시) `invalidate()` 메서드가 호출됩니다. 이로써 내부적으로 기록된 시작 값이 제거됩니다.

### markers
**Object \| Boolean** - 개발 및 문제 해결 시 유용한 마커를 추가합니다. `markers: true`는 기본값`(startColor: "green", endColor: "red", fontSize: "16px", fontWeight: "normal", indent: 0)`으로 마커를 추가하지만 다음과 같은 객체를 사용하여 사용자 정의할 수 있습니다.

````js
markers: {startColor: "white", endColor: "white", fontSize: "18px", fontWeight: "bold", indent: 20}
````

### once
**Boolean** - true인 경우, ScrollTrigger는 종료 위치에 달성하면 한 번에 자체 `kill()`합니다. 이로써 스크롤 이벤트 수신을 중지하고 가비지 컬렉션에 대상이 됩니다. 이렇게 하면 onEnter를 최대 한 번만 호출하게 됩니다. 연관된 애니메이션을 종료하지는 않습니다. 스크롤을 전진하면 애니메이션을 한 번만 재생하고 재설정되거나 다시 재생되지 않도록 하려는 경우에 적합합니다. 또한 `toggleActions`를 `"play none none none"` 으로 설정합니다.

### onEnter
**Function** - "start"를 지나 스크롤 위치가 전진할 때 (일반적으로 트리거가 화면에 스크롤될 때) 호출되는 콜백입니다. 하나의 매개변수를 받으며, 이 매개변수는 `progress`, `direction`, `isActive`, `getVelocity()` 등과 같은 속성/메서드를 가진 ScrollTrigger 인스턴스 그 자체입니다.

Example:

````js
onEnter: ({progress, direction, isActive}) => console.log(progress, direction, isActive)
````

### onEnterBack
**Function** - "end"를 지나 스크롤 위치가 역방향으로 이동할 때 (일반적으로 트리거가 다시 화면에 스크롤될 때) 호출되는 콜백입니다. 하나의 매개변수를 받으며, 이 매개변수는 `progress`, `direction`, `isActive`, `getVelocity()` 등과 같은 속성/메서드를 가진 ScrollTrigger 인스턴스 그 자체입니다.

Example:

````js
onEnterBack: ({progress, direction, isActive}) => console.log(progress, direction, isActive)
````

### onLeave
**Function** - "end"를 지나 스크롤 위치가 전진할 때 (일반적으로 트리거가 화면에서 스크롤되지 않을 때) 호출되는 콜백입니다. 하나의 매개변수를 받으며, 이 매개변수는 `progress`, `direction`, `isActive`, `getVelocity()` 등과 같은 속성/메서드를 가진 ScrollTrigger 인스턴스 그 자체입니다.

Example:

````js
onLeave: ({progress, direction, isActive}) => console.log(progress, direction, isActive)
````

### onLeaveBack
**Function** - "start"를 지나 스크롤 위치가 역방향으로 이동할 때 (일반적으로 트리거가 완전히 시작 위치를 지나 역방향으로 스크롤될 때) 호출되는 콜백입니다. 하나의 매개변수를 받으며, 이 매개변수는 `progress`, `direction`, `isActive`, `getVelocity()` 등과 같은 속성/메서드를 가진 ScrollTrigger 인스턴스 그 자체입니다.

Example:

````js
onLeaveBack: ({progress, direction, isActive}) => console.log(progress, direction, isActive)
````

### onRefresh
**Function** - 리프레시가 발생할 때 (일반적으로 리사이즈 이벤트) ScrollTrigger가 모든 위치를 다시 계산하도록 강제하는 콜백입니다. 하나의 매개변수를 받으며, 이 매개변수는 `progress`, `direction`, `isActive`, `getVelocity()` 등과 같은 속성/메서드를 가진 ScrollTrigger 인스턴스 그 자체입니다.

Example:

````js
onRefresh: ({progress, direction, isActive}) => console.log(progress, direction, isActive)
````

### onUpdate
**Function** - ScrollTrigger의 진행 상황이 변경될 때마다 (스크롤 위치가 변경될 때마다) 호출되는 콜백입니다. 숫자 스크럽이 적용된 경우, 연관된 애니메이션은 스크롤 위치가 멈춘 후에도 약간의 시간 동안 계속해서 스크럽될 것이므로 애니메이션이 업데이트될 때마다 무언가를 업데이트하려면 ScrollTrigger 대신 애니메이션 자체에 `onUpdate`를 적용하는 것이 가장 좋습니다. 여기에서 데모를 확인할 수 있습니다. onUpdate 콜백은 `progress`, `direction`, `isActive`, `getVelocity()` 등과 같은 속성/메서드를 가진 ScrollTrigger 인스턴스 그 자체를 하나의 매개변수로 받습니다.

Example:

````js
onUpdate: self => console.log("progress", self.progress)
````

### onScrubComplete
**Function** - 숫자 스크럽 (예: `scrub: 1`)이 적용된 경우에만 적용되며 숫자 스크럽이 완료될 때 호출되는 콜백입니다. 이 콜백은 `progress`, `direction`, `isActive`, `getVelocity()` 등과 같은 속성/메서드를 가진 ScrollTrigger 인스턴스 그 자체를 하나의 매개변수로 받습니다.

Example:

````js
onScrubComplete: ({progress, direction, isActive}) => console.log(progress, direction, isActive)
````

### onSnapComplete
**Function** - `snap` 속성이 정의된 경우에만 사용가능한 콜백이며 스냅이 완료될 때 호출되는 콜백입니다. 사용자(또는 다른 요소)가 스크롤을 어떤 방식으로든 상호 작용하는 경우 스냅이 취소되므로 이 경우 `onSnapComplete`는 전혀 트리거되지 않습니다. 이 콜백은 `progress`, `direction`, `isActive`, `getVelocity()` 등과 같은 속성/메서드를 가진 ScrollTrigger 인스턴스 그 자체를 하나의 매개변수로 받습니다.

Example:

````js
onSnapComplete: ({progress, direction, isActive}) => console.log(progress, direction, isActive)
````

### onToggle
**Function** - ScrollTrigger가 비활성화 상태에서 활성 상태 또는 그 반대로 전환될 때 호출되는 콜백입니다. 일반적으로 스크롤 위치가 양방향으로 `"start"` 또는 `"end"`를 지나갈 때 발생하지만 사용자가 매우 빠르게 스크롤하는 경우와 같이 동일한 틱에서 양쪽을 빠르게 지나가면 상태가 변경되지 않으므로 `onToggle`이 발생하지 않습니다. 일반적으로 이 콜백을 사용하여 `onEnter`, `onLeave`, `onEnterBack` 및 `onLeaveBack`을 모두 대신하여 isActive 속성을 확인하여 토글링하는 데 사용할 수 있습니다. 이 콜백은 `progress`, `direction`, `isActive`, `getVelocity()` 등과 같은 속성/메서드를 가진 ScrollTrigger 인스턴스 그 자체를 하나의 매개변수로 받습니다.

Example:

````js
onToggle: self => console.log("toggled to active:", isActive)
```` 

### pin
**Boolean \| String \| Element** - ScrollTrigger가 활성 상태인 동안 고정되어 있는 것처럼 보일 요소(또는 요소에 대한 선택자 텍스트)입니다. 이 요소는 나머지 콘텐츠가 그 아래로 계속 스크롤되는 동안 시작 위치에 "stick" 하게 표시됩니다. 고정된 요소는 하나만 허용되지만 원하는만큼 많은 요소를 포함할 수 있습니다. `pin: true`로 설정하면 트리거 요소를 고정합니다. 

> 🚨주의: 고정된 요소 자체를 애니메이션화하지 마십시오. 그렇게 하면 측정값이 오동작할 수 있습니다 (ScrollTrigger는 성능을 높이기 위해 최대한 미리 계산합니다). 대신 고정된 요소 내부의 요소만 애니메이션화하는 방식으로 중첩시킬 수 있습니다. 
{: .prompt-danger}

> 💡참고: 다른 요소 내부에 중첩된 것을 고정하는 경우 시작/종료 위치를 올바르게 조정하려면 `pinnedContainer`를 정의하십시오. React를 사용하고 있나요? 적절한 cleanup을 수행하세요 - 여기를 읽으십시오.
{: .prompt-tip}

### pinnedContainer
**Element \| String** - 만약 ScrollTrigger의 trigger/endTrigger 요소가 다른 ScrollTrigger에 의해 고정되는 요소 내부에 있다면 (매우 드문 경우), 그 고정이 지속되는 기간 동안 시작/종료 위치가 얼마나 더 길어질지에 따라 이러한 위치가 오동작할 수 있습니다. 그래서 `pinnedContainer`를 그 부모/컨테이너 요소로 설정하여 ScrollTrigger가 해당 오프셋을 계산하도록 할 수 있습니다. 다시 말하지만, 이것은 아주 드물게 필요한 경우입니다. 중요: 중첩된 고정은 지원되지 않으므로 이 기능은 고정되지 않는 ScrollTrigger 전용입니다 (3.7.0에서 추가됨).

### pinReparent
**Boolean** - `true`인 경우 고정된 요소는 활성 상태로 고정되는 동안 부모를 포함한 블록에서도 벗어날 수 있도록 `<body>`에 리페어런팅됩니다. 고정하는 동안 이상한 동작 (고정된 요소가 갑자기 이동하고 스크롤과 함께 움직이는 것처럼)을 발견하면 아마도 부모 요소에 transform 또는 `will-change`가 있는 경우입니다. 이는 `position: fixed` 동작을 망가트리는 브라우저 동작으로, 피하는 것이 가장 좋습니다. 하지만 reparenting은 비용이 많이 들 수 있으므로 피할 수 없는 경우 `pinReparent: true`를 사용할 수 있습니다. 반드시 필요한 경우에만 이 기능을 사용하십시오.

> 🚨경고: reparenting에 영향을 받을 수 있는 특정 중첩을 기반으로 하는 CSS 규칙이 있는 경우 이러한 규칙이 깨질 수 있습니다. 예를 들어, `pinReparent: true`로 `.panel` 요소를 고정하는 경우 `.section .panel p {color: white}`와 같은 CSS 규칙은 더 이상 중첩된 `<p>`에 적용되지 않을 것입니다. 고정되는 동안 `<section>` 안에 있지 않기 때문이므로 reparenting을 수용하도록 CSS 규칙을 작성하십시오.
{: .prompt-danger}

### pinSpacer
**Element** - 일반적으로 ScrollTrigger는 고정된 요소를 감싸기 위해 내부적으로 `<div>`를 만듭니다. 그러나 고정된 요소에 `iframe`을 로드하는 극히 드문 시나리오에서는 ScrollTrigger가 리프레시될 때 (예: 창 크기 조정) `iframe`이 새로 고쳐질 수 있으므로 이 기능을 사용하면 내부적으로 생성된 대신 스페이서로 사용될 요소를 지정할 수 있습니다. 이렇게 하면 ScrollTrigger가 리프레시 중에 그것을 제거/추가하지 않으므로 `iframe` 콘텐츠가 유지됩니다.

### pinSpacing
**Boolean \| String** - 기본적으로 하단 (또는 `horizontal: true`인 경우 오른쪽)에 패딩이 추가되어 다른 요소를 아래로 밀어내어 고정된 요소가 고정 해제되면 다음 콘텐츠가 완벽하게 따라잡히도록합니다. 그렇지 않으면 요소가 고정된 요소 아래로 스크롤 될 수 있습니다. `pinSpacing: false`로 설정하여 ScrollTrigger가 패딩을 추가하지 않도록 지시할 수 있습니다. 패딩 대신 마진을 사용하려면 `pinSpacing: "margin"`으로 설정할 수 있습니다. 

> 💡참고: pinSpacing은 대부분의 경우에 작동하지만 실제로는 DOM 및 CSS 설정 방식에 따라 다릅니다. 예를 들어, `display: flex` 또는 ``position: absolute``를 사용하는 부모에서 무언가를 고정하는 경우 추가 패딩은 다른 요소를 아래/오른쪽으로 밀어내지 않으므로 수동으로 간격을 조정해야 할 수 있습니다. pinSpacing은 대부분의 상황에서 작동하는 편리한 기능일 뿐입니다. 
{: .prompt-tip}

> ✅중요: 컨테이너가 `display: flex`인 경우 일반적으로 원하는 동작으로 작동하기 때문에 pinSpacing은 기본적으로 `false`로 설정됩니다. 왜냐하면 패딩이 그러한 맥락에서 다르게 작동하기 때문입니다. 비디오를 통해 확인할 수 있습니다.
{: .prompt-info}

### pinType
**"fixed" \| "transform"** - 기본적으로 scroller가 `<body>`인 경우에만 고정에 `position: fixed`가 사용되고, 그렇지 않으면 중첩된 여러 시나리오에서 `position: fixed`가 작동하지 않기 때문에 대신 transforms가 사용됩니다. 그러나 `pinType: "fixed"`를 설정하여 ScrollTrigger가 강제로 `position: fixed`를 사용하도록 할 수 있습니다. 일반적으로 이것은 필요하지 않거나 도움이 되지 않습니다. 

> 🚨주의: CSS 속성 `will-change: transform`을 설정하면 브라우저가 이를 transform이 적용된 것처럼 처리하여 `position: fixed` 요소를 깨뜨립니다 (이는 ScrollTrigger/GSAP과 무관합니다)
{: .prompt-danger}

### preventOverlaps
**Boolean \| String** -  ScrollTrigger가 애니메이션을 트리거하기 직전에 활성화됩니다. 앞선 ScrollTrigger 기반의 애니메이션을 찾아 해당 애니메이션을 그들의 끝 상태로 강제하여 불필요한 겹침을 피합니다. `true` 로 설정하면 모든 ScrollTriggers에 영향을 미칩니다. 일치하는 문자열을 가진 다른 ScrollTriggers에만 영향을 미치도록 효과를 제한하려면 임의의 문자열을 사용할 수 있습니다. 따라서 `preventOverlaps: "group1"` 은 `preventOverlaps: "group1"` 을 가진 다른 ScrollTriggers에만 영향을 미칩니다. 여기에서 데모를 확인하세요.

### refreshPriority
**Number** - ScrollTriggers를 페이지의 발생 순서 (위에서 아래로 또는 왼쪽에서 오른쪽으로)대로 생성하는 경우에는 refreshPriority를 정의할 필요가 거의 없습니다. 그렇지 않은 경우, refreshPriority를 사용하여 ScrollTriggers가 새로 고침되는 순서에 영향을 주어 후속 ScrollTriggers의 시작/끝 값에 고정 거리가 추가되도록합니다 (이것이 순서가 중요한 이유입니다). 자세한 내용은 sort() 메서드를 참조하십시오. `refreshPriority`가 1인 ScrollTrigger는 기본값인 `refreshPriority`가 0인 것보다 더 빨리 새로 고침됩니다. 음수를 사용할 수도 있으며, 동일한 숫자를 다수의ScrollTriggers에 할당할 수 있습니다.

### scroller
**String \| Element** - 기본적으로 스크롤러는 viewport 자체입니다. 그러나 스크롤 가능한 `<div>`에 ScrollTrigger를 추가하려면 해당 `<div>`를 스크롤러로 정의하십시오. `"#elementID"` 와 같은 선택자 텍스트 또는 엘리먼트 자체를 사용할 수 있습니다.

### scrub
**Boolean \| Number** - 애니메이션의 진행 상황을 스크롤바와 직접 연결하여 scrubber처럼 작동하도록 합니다. 스크롤바의 위치를 잡아내는 데 약간의 시간이 걸리도록 스무딩을 적용할 수 있습니다. 다음 중 하나일 수 있습니다.
  - **Boolean** - `scrub: true`는 애니메이션의 진행 상황을 ScrollTrigger의 진행 상황과 직접 연결합니다.
  - **Number** - 플레이 헤드가 스크롤바의 위치를 잡아내는 데 걸리는 시간(초)을 나타냅니다. `scrub: 0.5`는 애니메이션의 플레이 헤드가 스크롤바의 위치를 잡아내는 데 0.5초가 걸린다는 것을 의미합니다. 이것은 스무딩을 적용하는 데 좋습니다.

### snap
**Number \| Array \| Function \| Object \| "labels" \| "labelsDirectional"** - 사용자가 스크롤을 멈춘 후 일부 진행 값(0에서 1 사이)으로 스냅할 수 있게 합니다. 예를 들어 `snap: 0.1`은 0.1(10%, 20%, 30% 등) 단위로 스냅합니다.

`snap: [0, 0.1, 0.5, 0.8, 1]`은 해당하는 특정 진행 값 중 하나에만 도달하도록 허용합니다. 다음 중 하나가 될 수 있습니다.
  - **Number** - `snap: 0.1`은 0.1(10%, 20%, 30%, 등) 단위로 스냅합니다. 특정 섹션 수가 있다면 간단히 1 / (섹션 - 1)을 사용하세요.
  - **Array** - `snap: [0, 0.1, 0.5, 0.8, 1]`은 마지막 스크롤 방향으로 배열 내 가장 가까운 진행 값으로 스냅합니다 (directional: false를 설정하지 않는 한).
  - **Function** - `snap: (value) => Math.round(value / 0.2) * 0.2`는 자연스러운 목적지 값(속도 기반)을 함수에 공급하고 반환된 값을 최종 진행 값으로 사용합니다(이 경우 0.2 단위로 스냅됨). 원하는 논리를 실행할 수 있습니다. 이러한 값은 항상 0에서 1 사이여야 하며 애니메이션 진행 상황을 나타냅니다. 따라서 0.5는 중간을 의미합니다.
  - **"labels"** - `snap: "labels"`는 타임라인 내 가장 가까운 레이블로 스냅합니다(물론 애니메이션은 레이블이 포함된 타임라인이어야 함).
  - **"labelsDirectional**" - `snap: "labelsDirectional"`는 타임라인 내에서 가장 최근 스크롤 방향으로 스냅하는 레이블로 스냅합니다. 따라서 약간 스크롤해서 다음 레이블로 이동하면(그리고 멈추면), 현재 스크롤 위치가 기술적으로 가장 가까운 현재/마지막 레이블이라고 해도 해당 방향으로 스냅합니다. 이렇게 하면 사용자에게 더 직관적으로 느껴질 수 있습니다.
  - **Object** - 예를 들면 `snap: {snapTo: "labels", duration: 0.3, delay: 0.1, ease: "power1.inOut"}`와 같이 모든 다음 속성 중 하나로 완전히 사용자 정의할 수 있습니다 ("snapTo"가 필수입니다).
    - **snapTo [Number \| Array \| Function \| "labels"]** - 스냅 로직을 결정합니다(위에 설명한대로)
    - **delay [Number]** - 마지막 스크롤 이벤트와 스냅 애니메이션 시작 사이의 지연(초). 기본값은 스크럽 양의 절반(또는 숫자가 아닌 경우 0.1)입니다.
    - **directional [Boolean]** - 기본적으로 (버전 3.8.0부터) 스냅은 방향성이 있으며 사용자가 마지막으로 스크롤한 방향으로 이동합니다. 그러나 `directional: false`로 설정하여 비활성화할 수 있습니다.
    - **duration [Number \| Object]** - 스냅 애니메이션의 지속 시간(초). `duration: 0.3`은 항상 0.3초가 걸립니다만, `duration: {min: 0.2, max: 3}` 과 같이 범위를 정의하여 제공된 범위 내에서 범위를 설정할 수 있습니다(속도 기반). 이렇게 하면 사용자가 스냅 지점에 가까이 스크롤을 멈추면 스냅하는 데 소요되는 시간이 더 적습니다.
    - **ease [Number \| Function]** - 스냅 애니메이션에 사용할 easing값. 기본값은 `"power3"`입니다.
    - **inertia [Boolean]** - ScrollTrigger가 관성을 고려하지 않도록 설정하려면 `inertia: false`로 설정하세요.
    - **onStart [Function]** - 스냅 시작 시 호출될 함수
    - **onInterrupt [Function**] - 스냅이 중단될 때 호출될 함수(사용자가 스냅 중간에 스크롤을 시작하는 경우와 같음)
    - **onComplete [Function**] - 스냅 완료 시 호출될 함수

### start
**String \| Number \| Function** - ScrollTrigger의 시작 위치를 결정합니다. 다음 중 하나가 될 수 있습니다.
  - **String** - ScrollTrigger를 시작하려면 트리거의 위치와 스크롤러의 위치가 일치해야 합니다. 예를 들어,
    - `"top center"`는 "트리거의 맨 위가 스크롤러의 가운데에 닿을 때"를 의미합니다(기본적으로 스크롤러는 뷰포트입니다).
    - `"bottom 80%"`는 "트리거의 아래쪽이 뷰포트의 상단에서 80% 아래에 닿을 때"를 의미합니다(수직 스크롤인 경우).
    - `"top bottom-=100px"`와 같이 복잡한 상대 값도 사용할 수 있으며, 이 경우 "트리거의 맨 위가 뷰포트/스크롤러의 아래쪽에서 100px 위에 닿을 때"를 의미합니다.
  - **Number** - 정확한 스크롤 값으로, 예를 들어 200은 뷰포트/스크롤러가 정확히 200 픽셀 스크롤될 때 트리거됩니다.
  - **Function** - ScrollTrigger가 위치를 계산할 때마다 호출되는 함수(일반적으로 생성 시와 스크롤러 크기 조정 시). 이 함수는 위에서 설명한대로 문자열 또는 숫자를 반환해야 합니다. 모든 콜백과 마찬가지로 함수는 ScrollTrigger 인스턴스 자체를 유일한 매개변수로 받으므로 이전 ScrollTrigger의 끝을 기반으로 위치를 설정하는 것과 같이 동적으로 값을 계산하는 것이 가능합니다.
    - 이것은 ScrollTrigger가 생성될 때와 스크롤러가 크기를 조정할 때 정상적인 문서 흐름에서 어떤 위치에 있는지를 기반으로 계산되는 정적 위치입니다. ScrollTrigger는 성능을 최적화하기 위해 상수적으로 재계산되지 않습니다. 예를 들어 trigger/endTrigger를 애니메이션화하면 시작/끝 값을 지속적으로 업데이트하지 않습니다. 이러한 값을 강제로 다시 계산하려면 ScrollTrigger.refresh()를 호출할 수 있습니다. 기본값은 `"top bottom"`이며, `pin: true`로 설정된 경우 기본값은 `"top top"`입니다.
    - `"clamp()"`를 사용한 값(버전 3.12+) start 값을 `"clamp()"`로 감싸면 ScrollTrigger에게 항상 계산된 값을 페이지 상단(0)과 최대 스크롤 위치 사이로 유지하도록 지시하여 페이지 경계를 벗어나지 않도록 합니다. 이렇게 하면 "above the fold"(뷰포트 상단에서 보이는 부분)의 트리거가 일부 스크럽 애니메이션으로 시작하지 않도록 보장합니다. 예를 들어 `"start: 'clamp(top bottom)'"`는 `clamp()` 내부에 일반 문자열 기반 값이 들어갈 수 있으며, `"clamp(20px 80%)"`과 같이 사용할 수 있습니다. 이 내용에 대한 자세한 설명은 해당 비디오에서 확인할 수 있습니다.

### toggleActions
**String** - 연결된 애니메이션을 네 가지 서로 다른 토글 위치(`onEnter`, `onLeave`, `onEnterBack`, `onLeaveBack`)에서 어떻게 제어할지를 결정합니다.

기본값은 `"play none none none"`입니다. 따라서 `toggleActions: "play pause resume reset"`은 진입할 때 애니메이션을 재생하고, 떠날 때 일시 중지하며, 역방향으로 다시 진입할 때 다시 재생하고, 시작 부분을 완전히 벗어나 스크롤하여 다시 처음으로 되감기(되감기)할 때 애니메이션을 재설정합니다.

각 작업에 대해 다음과 같은 키워드 중 하나를 사용할 수 있습니다: "`play`", "`pause`", "`resume`", "`reset`", "`restart`", "`complete`", "`reverse`", "`none`"

### toggleClass
**String \| Object** - ScrollTrigger가 활성화/비활성화될 때 요소(또는 여러 요소)에 클래스를 추가하거나 제거합니다. 다음 중 하나일 수 있습니다.
- **String** - 트리거 요소에 추가할 클래스 이름입니다. 예: `toggleClass: "active"`
- **Object** - 트리거 이외의 요소에 클래스를 토글하려면 다음과 같이 객체 구문을 사용하십시오. `toggleClass: {targets: ".my-selector", className: "active"}`. "targets"는 선택기 텍스트, 요소에 대한 직접 참조 또는 요소 배열일 수 있습니다. toggleClass에는 toggleActions가 적용되지 않는다는 점에 유의하십시오. 클래스 이름을 다르게 토글하려면 콜백 함수(`onEnter`, `onLeave`, `onLeaveBack` 및 `onEnterBack`)를 사용하십시오.

### trigger
**String \| Element** - 일반 문서 흐름에서 ScrollTrigger가 시작하는 위치를 계산하는 데 사용되는 요소(또는 요소에 대한 선택기 텍스트)입니다.

---

<br>

##### 참고

- [ScrollTrigger \| GSAP \| Docs & Learning](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [ScrollTrigger \| Notion](https://productive-printer-b81.notion.site/ScrollTrigger-2ffb9690a0c2461eb596b8ce6d09ff21)
