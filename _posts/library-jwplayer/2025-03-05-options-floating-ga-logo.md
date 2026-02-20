---
title: "[JWPlayer] Options - Float on scroll, Google Analytics (ga), Logo"
date: 2025-03-05 08:00:00 +0900
categories: [Library, JWPlayer]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## Float on scroll

스크롤 시 플레이어 고정

이 기능은 **페이지를 스크롤할 때 원래 위치의 플레이어가 화면 밖으로 벗어나면**,  
플레이어를 **화면의 한쪽 구석으로 축소해 계속 표시**합니다.

세로 방향(포트레이트) 모드의 기기에서는  
플레이어가 **원래 크기로 페이지 상단에 고정(fixed)** 됩니다.

플로팅 상태에서는 시청자가 **플레이어를 드래그하여 위치를 변경**할 수 있습니다.  
단, **광고 재생 중에는 이 기능이 비활성화**됩니다.

기본적으로, **빈 `floating` 객체를 추가하면 플로팅 플레이어 기능이 활성화되며**,  
`dismissible: true`가 자동으로 설정됩니다.



### 커스터마이징용 CSS 클래스

플로팅 플레이어의 스타일을 사용자 정의하려면 아래 CSS 클래스를 사용할 수 있습니다.

- .jw-flag-floating .jw-wrapper
- .jw-float-icon

또한 **Floating API** 메서드를 사용하면  
**사용자 정의 플로팅 타이밍(floating timing)** 을 구현할 수 있습니다.

> 주의: **Float on scroll** 기능은 **iframe에 삽입된 플레이어**에서는 사용할 수 없습니다.
{: .prompt-danger}


```javascript
player.setup({
  "playlist": "https://cdn.jwplayer.com/v2/playlists/{playlist_id}",
  ...
  "floating": {
    "dismissible": true
  }
});
```


- **dismissible** (boolean)
  - 시청자가 **플로팅 플레이어를 닫을 수 있는지 여부**를 제어합니다.
  - 가능한 값:
    - `true`: (기본값) 시청자가 플로팅 플레이어를 닫을 수 있음
    - `false`: 시청자가 플로팅 플레이어를 닫을 수 없음

- **mode** (string) <sup>< 8.17.0+</sup>
  - **플로팅 동작 방식**을 설정합니다.
  - 가능한 값:
    - `notVisible`: (기본값) 플레이어가 화면에서 벗어나면 플로팅 시작, 다시 보이면 플로팅 종료
    - `always`: 항상 플로팅 상태 유지
    - `never`: 플로팅 기능 사용 안 함

- **showTitle** (boolean)
  - **플로팅 플레이어 상단의 닫기(X) 버튼과 함께 동영상 제목을 표시할지 여부**를 설정합니다.
  - 가능한 값:
    - `false`: (기본값) 닫기 바에 동영상 제목 표시 안 함
    - `true`: 닫기 바에 동영상 제목 표시





----------------








## Google Analytics (ga)

이 옵션은 **Google Analytics(GA)** 와의 **내장 통합 기능(built-in integration)** 을 구성합니다.

플레이어 이벤트를 Google Analytics 계정에서 추적하려면,  
**플레이어가 포함된 동일한 페이지에 Google Analytics가 구현되어 있어야 합니다.**


> 주의: JW Player는 **Google Tag Manager(GTM)** 를 통한 **GA4 통합을 지원하지 않습니다.**
{: .prompt-danger}


```json
"ga":  {
  "label": "mediaid",
  "sendEnhancedEvents": true
}
```


- **label** (string)
  - Google Analytics 이벤트의 **라벨(label)** 로 사용할 **플레이리스트 속성**을 정의합니다.
  - 예: `title`, `mediaid`
  - 기본값: `file`

- **sendEnhancedEvents** (boolean) <sup>8.27.0+</sup>
  - **(Google Analytics 4 전용)**
  - 이벤트에 대해 **향상된 측정(enhanced measurement)** 값과 **새로운 이벤트 네이밍 규칙**을 사용할지 여부를 지정합니다.
  - 가능한 값:
    - `false`: (기본값) 기존 이벤트 이름과 기존 매개변수로 JWP 이벤트 전송
    - `true`: 모든 JWP 이벤트가 `video_` 접두사로 시작하는 **새 이벤트 이름**으로 전송되며, 다음 **GA4 비디오 관련 매개변수**를 포함합니다:
       • video_current_time
       • video_duration
       • video_percent
       • video_provider
       • video_title
       • video_url
       • visible


> 팁:  
> 빈 GA 객체`("ga": {})`를 정의할 수도 있습니다.  
> 이 경우 **모든 기본값이 자동으로 적용**됩니다.
{: .prompt-tip}





----------------












## Logo

이 옵션 블록은 **비디오 위에 오버레이되는 클릭 가능한 워터마크(logo)** 를 설정합니다.

```javascript
player.setup({
  file: 'http://example.com/myVideo.mp4',
  logo: {
    file: '/assets/jw-logo-red-46px.png',
    link: 'https://www.jwplayer.com',
    hide: 'true',
    position: 'top-left',
  },
});
```

- **file** (string)
  - 워터마크로 사용할 **외부 이미지(JPG, PNG, GIF)** 의 URL을 지정합니다.  
    예시: `"/assets/logo.png"`
  - **투명도가 있는 24비트 PNG 이미지 사용을 권장합니다.**

- **hide** (boolean)
  - `true`로 설정하면, 로고가 **플레이어 컨트롤과 함께 자동으로 표시 및 숨김** 처리됩니다.
  - 기본값: `false`

- **link** (string)
  - 워터마크 이미지를 클릭했을 때 이동할 **URL 주소**를 지정합니다.
  - 이 속성이 설정되지 않으면 로고 클릭 시 아무 동작도 하지 않습니다.

- **margin** (number)
  - 로고가 **플레이어 화면 가장자리로부터 떨어진 거리(px 단위)** 를 지정합니다.
  - 기본값: `8`

- **position** (string) <sup>8.0+</sup>
  - 워터마크를 표시할 **위치(코너)** 를 지정합니다.
  - `"control-bar"`로 설정하면, **로고가 컨트롤 바 오른쪽 버튼 그룹의 가장 왼쪽 아이콘**으로 추가됩니다.
  - 가능한 값:
    - `"top-right"` (기본값)
    - `"bottom-left"`
    - `"bottom-right"`
    - `"control-bar"`
    - `"top-left"`


> 참고:  
> 플레이어 내 로고 이미지는 **저해상도(low-resolution)** 를 사용하는 것이 좋습니다.  
> 특히 **Internet Explorer**에서는 고해상도 이미지를 제대로 리사이징하지 못할 수 있습니다.
{: .prompt-tip}
