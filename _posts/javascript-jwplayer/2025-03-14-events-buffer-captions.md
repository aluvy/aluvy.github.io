---
title: "[JWPlayer] Events - Buffer, Captions"
date: 2025-03-14 08:00:00 +0900
categories: [JavaScript, JWPlayer]
tags: []
render_with_liquid: false
math: true
mermaid: true
---


## BUFFER Events

이 API 호출은 **플레이어에 버퍼링된 파일의 퍼센티지(%) 정보를 클라이언트에 업데이트**하는 데 사용됩니다.

> 이 기능은 **VOD(주문형 비디오)** 미디어에만 적용됩니다.  
> 실시간 스트리밍 미디어(HLS/DASH)에서는 이 동작이 노출되지 않습니다.
{: .prompt-tip}


### .on('bufferChange')

현재 재생 중인 항목이 **버퍼에 추가 데이터를 로드할 때** 트리거됩니다.

```json
{
  "bufferPercent": 2.7706319444444443,
  "position": 7.90229,
  "duration": 648,
  "currentTime": 7.90229,
  "seekRange": {
    "start": 0,
    "end": 648
  },
  "absolutePosition": null,
  "type": "bufferChange"
}
```

- **absolutePosition** (number \| null)
  - 미디어 파일 내에서 시청자의 **절대 위치**를 나타냅니다. 이는 영상의 현재 재생 시간(`currentTime`)과 스트림의 `startDateTime` 값(날짜 형식)을 합한 값입니다.

- **bufferPercent** (number)
  - 현재 미디어에서 **버퍼링된 비율(%)**을 0~100 사이의 값으로 표시합니다.

- **currentTime** (number) <sup>v8.19.0+</sup>
  - 플레이어가 탐색(seek)을 수행하기 전의 **스트림 위치(초 단위)**

- **duration** (number) <sup>v8.19.0+</sup>
  - 미디어의 **현재 전체 재생 길이(초 단위)**

- **position** (number)
  - 미디어 파일의 **현재 재생 위치(초 단위)**

- **seekRange** (object)
  - DVR 스트림의 탐색 가능 범위 또는 라이브 스트림의 버퍼링 가능 구간을 나타내는 **시간 범위 객체**<br>참조: `seekRange`
  - **seekRange[]**
    - **seekRange.end** (number)
      - 스트림의 현재 시간(`currentTime`)을 기준으로 한 **범위의 종료 시점(초 단위)**

    - **seekRange.start** (number)
      - 스트림의 현재 시간(`currentTime`)을 기준으로 한 **범위의 시작 시점(초 단위)**

- **type** (string)
  - 플레이어 이벤트의 카테고리 (이 이벤트의 경우 항상 `"bufferChange"`)



---



## CAPTIONS Events

이 API 호출은 비디오에 하나 이상의 클로즈드 캡션(Closed Captions) 트랙이 제공될 때, **활성 자막 트랙을 감지하거나 업데이트**하는 데 사용됩니다.  
JavaScript API를 사용하여 자막 사용 내역을 기록하거나, **JW Player 외부에 독자적인 CC(자막) 메뉴를 구성**할 수 있습니다.  
또한 `setCaptions()`을 사용하면 **플레이어를 다시 로드하지 않고 자막 스타일을 동적으로 설정**할 수도 있습니다.

> 인덱스 값이 `0`이면 자막이 꺼져(off) 있음을 의미합니다.
{: .prompt-tip}



### .on('captionsList')

사용 가능한 자막 트랙 목록이 변경될 때 트리거됩니다.   
이 이벤트는 API를 사용하여 **기본 자막을 설정하기에 이상적인 시점**입니다.

> `captionsList`는 항상 최소 1개의 항목(`off`)을 반환하지만, 자막이 완전히 로드되면 한 번 더 트리거됩니다.  
> 따라서 `tracks` 배열의 길이가 1을 초과할 때만 자막을 변경하는 것이 좋습니다.
{: .prompt-tip}

```json
{
  "tracks": [
    {
      "id": "off",
      "label": "Off"
    },
    {
      "id": "//playertest-cdn.longtailvideo.com/assets/os/captions/bunny-en.srt",
      "label": "English",
      "language": "en"
    }
  ],
  "track": 0,
  "type": "captionsList"
}
```

- **track** (number)
  - 활성화된 자막 트랙의 인덱스

- **tracks** (array)
  - 포함된 모든 자막 트랙 목록
  - **tracks[]**
    - **tracks.id** (string \| number)
      - **(외부 자막: .srt, .vtt)** 외부 자막 파일의 URL
      - **(내장 자막: .vtt, CEA-608, CEA-708)** 자막의 인덱스
      - 첫 번째 `tracks[]` 객체의 `id` 값은 항상 `"off"`이며, 첫 번째 트랙은 자막이 꺼져 있음을 나타냅니다.

    - **tracks.label** (string)
      - **(외부 자막)** 플레이어 설정에서 구성된 라벨
      - **(내장 자막)** 내장된 자막 내부에 지정된 라벨
      - 첫 번째 `tracks[]` 객체의 `label` 값은 항상 `"Off"`이며, 첫 번째 트랙은 자막이 꺼져 있음을 나타냅니다.

    - **tracks.language** (string)
      - 자막 트랙의 두 글자 언어 약어 (예: `"en"`, `"ko"`)

- **type** (string)
  - 플레이어 이벤트의 카테고리 (이 이벤트의 경우 항상 `captionsList`)



### .on('captionsChanged')

활성 자막 트랙이 **수동으로** 또는 **API를 통해** 변경될 때마다 트리거됩니다.

```json
{
  "tracks": [
    {
      "id": "off",
      "label": "Off"
    },
    {
      "id": "//playertest-cdn.longtailvideo.com/assets/os/captions/bunny-en.srt",
      "label": "English",
      "language": "en"
    }
  ],
  "track": 0,
  "type": "captionsChanged"
}
```

- **track** (number)
  - 새로 활성화된 자막 트랙의 인덱스

- **tracks** (array)
  - 포함된 모든 자막 트랙 목록
  - **tracks[]**
    - **tracks.id** (string \| number)
      - **(외부 자막: .srt, .vtt)** 외부 자막 파일의 URL
      - **(내장 자막: .vtt, CEA-608, CEA-708)** 자막의 인덱스
      - 첫 번째 `tracks[]` 객체의 `id` 값은 항상 `"off"`이며, 첫 번째 트랙은 자막이 꺼져 있음을 나타냅니다.

    - **tracks.label** (string)
      - **(외부 자막)** 플레이어 설정에서 구성된 라벨
      - **(내장 자막)** 내장된 자막 내부에서 지정된 라벨
      - 첫 번째 `tracks[]` 객체의 `label` 값은 항상 `"Off"`이며, 첫 번째 트랙은 자막이 꺼져 있음을 나타냅니다.

    - **tracks.language** (string)
      - 자막 트랙의 두 글자 언어 약어 (예: `"en"`, `"ko"`)

- **type** (string)
  - 플레이어 이벤트의 카테고리
  - 이 이벤트의 경우 항상 `"captionsChanged"`
