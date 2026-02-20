---
title: "[JWPlayer] Events - Cast, Controls, Floating"
date: 2025-03-15 08:00:00 +0900
categories: [Library, JWPlayer]
tags: []
render_with_liquid: false
math: true
mermaid: true
---



## Cast Events

이 API 호출은 개발자가 **캐스트 관련 이벤트를 감지**할 수 있도록 합니다.



### .on('cast')

캐스트 속성이 변경될 때 트리거됩니다.

```json
{
  "available": true,
  "active": true,
  "deviceName": "ViewerTV",
  "type": "cast"
}
```

- **active** (boolean)
  - 캐스팅이 시작되었는지(`true`) 또는 중지되었는지(`false`)를 나타냅니다.

- **available** (boolean)
  - 캐스트 가능한 디바이스가 존재하면 `true`, 없으면 `false`를 반환합니다.
  - 캐스트 가능한 기기가 탐지되면 **플레이어 컨트롤 바에 캐스트 아이콘이 표시됩니다.**

- **deviceName** (string)
  - 시청자가 기기에 지정한 이름(수신기 이름)을 나타냅니다.
  - 이 속성은 `"cast.active": "true"`일 때만 채워집니다.

- **type** (string)
  - 플레이어 이벤트의 카테고리 (이 이벤트의 경우 항상 `"cast"`)



### .on('castIntercepted')

[`interceptCast`](https://docs.jwplayer.com/players/reference/casting)가 활성화된 상태에서 사용자가 콘텐츠를 캐스트하려고 시도할 때 발생합니다.

이 이벤트는 또한 **현재 캐스트 세션이 활성 상태인지 여부**를 나타냅니다.

```js
{
  "isCasting": false,
  "type": "castIntercepted"
}
```

- **isCasting** (boolean)
  - Chromecast 기기가 미디어를 캐스트 중(`true`)인지, 아닌지(`false`)를 나타냅니다.

- **type** (string)
  - 수신 중인 이벤트의 유형을 식별합니다. (이 이벤트의 경우 항상 `"castIntercepted"`)




----




## Control Events

이 API 호출은 개발자가 **내장 플레이어 컨트롤(컨트롤 바 및 디스플레이 아이콘)**과 상호작용할 수 있도록 합니다.

> 재생 중 비디오가 키보드나 마우스 포커스를 잃으면 **컨트롤은 자동으로 사라집니다.**  
> 컨트롤이 비활성화되면 JW Player는 완전히 **크롬 없는(chrome-less)** 상태가 됩니다.
{: .prompt-tip}



### .on('controls')

스크립트에 의해 **컨트롤이 활성화되거나 비활성화될 때** 트리거됩니다.

다음과 같은 객체를 반환합니다:

- **controls** (boolean)
  - 컨트롤의 새로운 상태를 나타냅니다. (`true` = 활성화, `false` = 비활성화)



### .on('displayClick')

사용자가 **비디오 디스플레이 영역을 클릭할 때** 트리거됩니다.   
이 이벤트는 **내장 컨트롤이 비활성화된 경우, 사용자 정의 컨트롤을 연결할 때** 특히 유용합니다.

> 컨트롤이 활성화되어 있으면 기본 클릭 동작(재생/일시정지 토글)은 여전히 발생합니다.
{: .prompt-tip}

```json
{
  "type": "displayClick"
}
```

- **type** (string)
  - 플레이어 이벤트의 카테고리
  - 이 이벤트의 경우 항상 `"displayClick"`



---


## Floating Player Events

플레이어는 사용자가 **플로팅 상태를 동적으로 업데이트**할 수 있도록 합니다.



### .on('float')

플로팅 플레이어가 **떠오르거나(floating 시작) 원래 위치로 복귀할 때** 트리거됩니다.

```json
{
  "floating": true,
  "type": "float"
}
```

- **floating** (boolean)
  - 플레이어의 플로팅 상태를 나타냅니다.
  - 가능한 값:
    - `true`: 플로팅 플레이어 상태
    - `false`: 플레이어가 원래 위치로 복귀된 상태

- **type** (string)
  - 플레이어 이벤트의 카테고리
  - 이 이벤트의 경우 항상 `"float"`
