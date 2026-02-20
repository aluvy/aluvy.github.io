---
title: "[JWPlayer] Events - Quality, Related, Resize"
date: 2025-03-19 08:00:00 +0900
categories: [JavaScript, JWPlayer]
tags: []
render_with_liquid: false
math: true
mermaid: true
---


## Quality Events

이 API 호출은 **여러 화질(quality level)** 이 제공되는 비디오에서  
현재 화질을 **감지하거나 변경할 때** 사용됩니다.

> 인덱스 **0은 항상 “Auto(자동)”** 를 의미합니다.
{: .prompt-tip}



### .on('levels')

사용 가능한 화질 수준 목록이 **업데이트될 때** 트리거됩니다.  
예를 들어, **플레이리스트 항목이 재생을 시작한 직후**에 발생합니다.

- **width** (number)
  - 플레이어의 새로운 너비

- **levels** (array)
  - 새로운 항목을 포함한 전체 화질 배열.
  - `getQualityLevels()`와 동일한 정보를 포함합니다.



### .on('levelsChanged')

**활성 화질 수준이 변경될 때** 트리거됩니다.  
이 이벤트는 사용자가 **품질 메뉴에서 옵션을 클릭했을 때** 또는  
스크립트에서 `setCurrentQuality()`를 호출했을 때 발생합니다.

- **currentQuality** (number)
  - `getQualityLevels()` 배열 내에서 새 화질 수준의 인덱스




### .on('visualQuality')

HLS에서 **활성 화질 수준이 변경될 때** 트리거됩니다.

이 이벤트는 `levelsChanged`와 다르게,  
**적응형 스트리밍(adaptive streaming) 이 자동으로 화질을 전환할 때**도 발생합니다.

```json
{
  "reason": "initial choice",
  "mode": "auto",
  "level": {
    "bitrate": 700000,
    "index": 1,
    "label": "auto",
    "width": 1280,
    "height": 536
  },
  "type": "visualQuality"
}
```

- **level** (object)
  - 미디어 항목의 각 화질 수준에 대한 정보
  - 참조: _level_
    - **level.bitrate** (string)
      - 미디어 파일의 비트레이트

    - **level.height** (number)
      - 미디어 파일의 세로 해상도

    - **level.index** (number)
      - 화질 수준의 인덱스

    - **level.label** (string)
      - 화질 수준의 라벨

    - **level.width** (number)
      - 미디어 파일의 가로 해상도

- **mode** (string)
  - 현재 화질 선택 모드
  - 가능한 값:
    - `auto`: 자동 화질 전환
    - `manual`: 고정 화질

- **reason** (string)
  - 화질이 변경된 이유
  - 가능한 값:
    - `api`: 재생 도중 사용자가 고정 화질을 선택했거나 API에서 화질을 설정한 경우
    - `auto`: 자동 화질 전환이 발생한 경우
    - `initial.choice`: 사용자가 기본 화질을 설정했으며 변경하지 않은 경우

- **type** (string)
  - 이벤트의 카테고리
  - 이 값은 항상 `"visualQuality"`



-----------





## Related Events



### .on('relatedReady')

Related 플러그인이 준비되었을 때** 트리거되는 이벤트를 나타냅니다.  
이 시점이 **가장 먼저 API 호출을 수행할 수 있는 시점\*\*입니다.

```json
{
  "type": "relatedReady"
}
```

- **type** (string)
  - 플레이어 이벤트의 카테고리
  - 이 값은 항상 `"relatedReady"`

다음 페이지의 관련 이벤트들을 사용하려면, 아래 코드를 **사전에 구현해야 합니다.**

```javascript
.on('relatedReady', function(event) {
    relatedPlugin = jwplayer().getPlugin('related');
});
```



### ("related").on('open')

추천(related) 인터페이스가 **열릴 때** 트리거됩니다.

- **items** (object)
  - Related 플러그인에 로드된 모든 객체들의 집합

- **method** (object)
  - 플러그인을 연 데 사용된 메서드

- **url** (object)
  - 플레이어에 로드된 피드의 URL



### ("related").on('close')

추천(related) 인터페이스가 **닫힐 때** 트리거됩니다.

```json
{
  "visible": false,
  "method": "interaction_more",
  "relatedFile": "https://cdn.jwplayer.com/feed.json?feed_id=9qjYmZBC&related_media_id=Zb9M8K61",
  "onclick": "link"
}
```

- **method** (string)
  - 플러그인을 여는 데 사용된 메서드

- **onclick** (string)
  - 추천 영상이 선택되었을 때의 동작 방식
  - 참조: _onclick (Related)_

- **relatedFile** (string)
  - 플레이어에 로드된 피드의 URL

- **visible** (boolean)
  - Related 플러그인의 표시 여부
  - 이 값은 항상 `false`



### ("related").on('play')

사용자가 **추천 피드에서 항목을 선택했을 때** 트리거됩니다.

- **auto** (boolean)
  - 자동 재생으로 시작된 경우 `true`, 수동으로 시작된 경우 `false`

- **item** (object)
  - 피드에 지정된 선택된 항목의 메타데이터

- **position** (number)
  - 선택된 추천 영상의 순서 번호 (ordinal position)






------------






## Resize Events

이 API 호출은 **플레이어의 현재 크기(dimension)** 및 **전체화면(fullscreen) 상태를 조회하거나 업데이트**하는 데 사용됩니다.



### .on('fullscreen')

플레이어가 **전체화면 모드로 전환되거나 해제될 때** 트리거됩니다.

```json
{
  "fullscreen": false,
  "type": "fullscreen"
}
```

- **fullscreen** (boolean)
  - 플레이어 화면이 전체화면 모드인지 여부
  - 가능한 값:
    - `true`
    - `false`

- **type** (string)
  - 리사이즈 이벤트의 카테고리
  - 이 값은 항상 `"fullscreen"`



### .on('resize')

플레이어의 **페이지 내 크기(dimension)가 변경되었을 때** 트리거됩니다.

> `.on('resize')` 이벤트는 **전체화면(fullscreen) 전환 시**에는 트리거되지 않습니다.
{: .prompt-tip}

```json
{
  "width": 1920,
  "height": 1080,
  "type": "resize"
}
```

- **height** (number)
  - 플레이어의 새로운 높이

- **type** (string)
  - 리사이즈 이벤트의 카테고리
  - 이 값은 항상 `"resize"`

- **width** (number)
  - 플레이어의 새로운 너비
