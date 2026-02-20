---
title: "[JWPlayer] Events - Sharing, Viewability, Volume"
date: 2025-03-21 08:00:00 +0900
categories: [Library, JWPlayer]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## Sharing Events

공유(Sharing) API 호출은 `getPlugin()` 메서드와 함께 동작합니다.  
예를 들어, 모든 공유 인스턴스는 이 특정 플러그인을 참조하기 위해  
`getPlugin('sharing')` API 호출을 사용합니다.

다음 예시는 공유 플러그인을 대상으로 합니다:

```javascript
.on('ready', function(event){
  sharingPlugin = jwplayer().getPlugin('sharing');
});
```

이후 나오는 **모든 `sharingPlugin` 참조**는   
위 코드가 **페이지 내에 구현되어 있다고 가정합니다.**



### ("sharing").on('open')

공유(Sharing) 플러그인이 **열릴 때** 감지합니다.

```json
{
  "visible": true,
  "method": "interaction"
}
```

- **method** (string)
  - 공유 메뉴가 열리게 된 방식
  - 가능한 값:<
    - `interaction`: 클릭, 터치, 키보드 입력

- **visible** (string)
  - 공유 메뉴의 표시 여부
  - 이 값은 항상 `true`



### ("sharing").on('close')

공유(Sharing) 플러그인이 **닫힐 때** 감지합니다.

```json
{
  "visible": false,
  "method": "interaction"
}
```

- **method** (string)
  - 공유 메뉴가 열리게 된 방식
  - 가능한 값:
    - `interaction`: 클릭, 터치, 키보드 입력

- **visible** (string)
  - 공유 메뉴의 표시 여부
  - 이 값은 항상 `false`



### ("sharing").on('click')

공유(Sharing) 플러그인 내에서 **사용자가 콘텐츠를 공유할 때마다** 트리거됩니다.

```jso
{
  "method": "facebook"
}
```

- **method** (string)
  - 사용된 공유 방식의 라벨
  - 가능한 값:
    - `email`
    - `facebook`
    - `link`
    - `twitter`



--------




## Viewability Events

> iframe 환경에서는 viewability API 사용을 권장하지 않습니다.
{: .prompt-tip}



### .on('containerViewable')

플레이어 컨테이너(`<div>` 요소)의 **가시성(viewability)** 상태를 나타내는 이벤트가 트리거됩니다.

```json
{
  "viewable": 0,
  "type": "containerViewable"
}
```

- **type** (string)
  - 이벤트의 유형
  - 이 값은 항상 `"containerViewable"`

- **viewable** (boolean)
  - 플레이어 컨테이너의 가시성 상태
  - 가능한 값:
    - `0`: 플레이어 컨테이너가 화면에 보이지 않음
    - `1`: 플레이어 컨테이너가 화면에 보임



### .on('viewable')

플레이어의 **가시성(viewability)** 상태를 나타내는 이벤트가 트리거됩니다.

```json
{
  "viewable": 1,
  "type": "viewable"
}
```

- **type** (string)
  - 이벤트의 유형
  - 이 값은 항상 `"viewable"`

- **viewable** (boolean)
  - 플레이어의 가시성 상태
  - 가능한 값:
    - `0`: 플레이어가 화면에 보이지 않음
    - `1`: 플레이어가 화면에 보임





--------







## Volume Events



### .on('mute')

플레이어가 **음소거 상태로 전환되거나 해제될 때** 트리거됩니다.

```json
{
  "mute": true,
  "type": "mute"
}
```

- **event** (string)
  - 이벤트의 유형
  - 이 속성의 값은 항상 `"volume"`

- **mute** (boolean)
  - 플레이어의 새로운 음소거 상태
  - 가능한 값:
    - `true`
    - `false`



### .on('volume')

플레이어의 **볼륨이 변경될 때** 트리거됩니다.

```json
{
  "volume": 73,
  "type": "volume"
}
```

- **type** (string)
  - 이벤트의 유형
  - 이 속성의 값은 항상 `"volume"`

- **volume** (number)
  - 새로운 볼륨 비율 (0–100)
