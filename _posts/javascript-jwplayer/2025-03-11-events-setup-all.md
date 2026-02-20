---
title: "[JWPlayer] Events - Setup, All"
date: 2025-03-11 08:00:00 +0900
categories: [JavaScript, JWPlayer]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## JWPlayer 이벤트

이벤트 핸들러 `.on`, `.once`, `.off` 을 사용하여 이벤트를 등록하거나 제거할 수 있으며,   
`.trigger` 를 통해 사용자 정의 이벤트를 발생시킬 수도 있습니다.

- `on`: 하나 또는 여러 개의 이벤트를 선택한 요소에 부착합니다. 이벤트가 발생할 때마다 지정된 함수(핸들러)를 실행합니다.
- `once`: 이벤트가 단 한 번만 발생하도록 등록합니다. 이벤트 핸들러가 한 번 실행된 후에는 자동으로 제거됩니다.
- `off`: 이전에 on 또는 once를 통해 등록했던 이벤트 핸들러를 제거합니다.
- `trigger`: 마우스 클릭과 같은 사용자의 실제 행동 없이도, 특정 요소에 연결된 이벤트를 프로그래밍 방식으로 강제 발생시킵니다. 또한, 사용자 정의 이벤트를 생성하여 원하는 시점에 실행하는 데에도 사용됩니다.


---

## SETUP Events

- **Setup Events**   
  이 API 호출은 **플레이어를 생성하고 설정 정보를 제공**하는 데 사용됩니다.


### .on('ready')

플레이어가 초기화되어 **재생 준비가 완료되었을 때** 발생합니다.   
이 시점이 **가장 빠르게 API 호출을 수행할 수 있는 시점**입니다.

```json
{
  "setupTime": 240,
  "viewable": 1
}
```

- **setupTime** (number)
  - `setup()` 호출부터 `ready` 상태까지 걸린 시간(밀리초 단위)

- **viewable** (number)
  - 플레이어가 현재 **화면에 보이는 상태인지 여부**



### .on('remove')

`jwplayer().remove()`를 통해 **플레이어가 페이지에서 제거될 때** 트리거됩니다.   
반환되는 값은 없습니다.



### .on('setupError')

플레이어를 **정상적으로 설정할 수 없을 때** 발생합니다.

```json
{
  "code": 101101,
  "sourceError": null,
  "message": "Sorry, the video player failed to load.",
  "type": "setupError"
}
```

- **code** (number)
  - 오류 식별자(ID)

- **message** (string)
  - 사용자에게 표시되는 오류 메시지
  - 이 속성은 **지역화(다국어 변환)** 가능합니다.

- **sourceError** (object \| null)
  - 플레이어 내부에서 발생한 **하위 수준 오류나 이벤트 객체**로, 이 오류의 원인이 된 요소입니다.

- **type** (string)
  - 오류 또는 경고의 카테고리 (이 이벤트의 경우 항상 `"setupError"`)



---


## ALL Events


### .on('all')

이 단일 API 호출은 **플레이어의 API에서 발생하는 모든 이벤트를 수집**하는 데 사용할 수 있습니다.

> 이 호출은 **매우 많은 양의 정보를 출력**하므로, 장시간 사용 시 **브라우저 성능이 저하될 수 있습니다.**
{: .prompt-tip}
