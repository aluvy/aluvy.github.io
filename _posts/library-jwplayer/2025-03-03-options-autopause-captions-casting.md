---
title: "[JWPlayer] Options - Auto Pause, Captions, Casting, Common Media Client Data, Do Not Save Cookies"
date: 2025-03-03 08:00:00 +0900
categories: [JavaScript, JWPlayer]
tags: []
render_with_liquid: false
math: true
mermaid: true
---


## Auto Pause

(자동 일시정지)

플레이어가 **특정 규칙에 따라 자동으로 일시정지**되도록 설정합니다.

기본적으로, 빈 `autoPause` 객체를 추가하면 **자동 일시정지 기능**이 활성화되며,  
`viewability: true`가 기본으로 설정됩니다.


````js
player.setup({
  "playlist": "https://example.com/myVideo.mp4",
  ...
  "autoPause": {
    "viewability": true,
    "pauseAds": true
  }
});
````

- **pauseAds** (boolean) <sup>8.10.0+</sup>
  - 플레이어가 더 이상 화면에 보이지 않을 때 **광고 재생을 일시정지할지 여부**를 제어합니다.
  - 가능한 값:
    - `false`: (기본값) 플레이어가 화면에서 사라져도 **비디오 재생만 일시정지**되고, 광고는 계속 재생됩니다.
    - `true`: 플레이어가 화면에서 보이지 않으면 **광고 재생이 일시정지**되고, 다시 화면에 보이면 **광고 재생이 재개**됩니다.
  - **참고**: `viewability: false`로 설정된 경우, `pauseAds: true`는 적용되지 않습니다.

- **viewability** (boolean)
  - 플레이어가 화면에 더 이상 표시되지 않을 때 **비디오 재생을 중지할지 여부**를 제어합니다.
  - 가능한 값:
    - `true`: (기본값) 플레이어가 화면에서 보이지 않으면 **비디오 재생이 일시정지**되고, 다시 표시되면 재생이 재개됩니다.  
      단, 광고 구간이 시작된 이후 플레이어가 보이지 않게 되더라도, **해당 광고 구간(ad break)은 종료될 때까지 계속 재생된 후** 일시정지됩니다.
    - `false`: **자동 일시정지 기능을 비활성화**합니다.






---







## Captions

**Closed Captions Styling**   
이 옵션 블록은 JWP 웹 및 iOS 플레이어용 자막(Closed Captions) 의 스타일(모양) 을 구성합니다.



**참고할 만한 두 가지 자막 설정 팁**
1. 자막이 **브라우저에서 렌더링될지, JW Player에서 렌더링될지**를 제어하려면,  
   `setup()`의 전역 설정에서 `[renderCaptionsNatively]`<https://docs.jwplayer.com/players/reference/setup-options#render-captions-natively> 속성을 지정하세요.

2. **iOS 및 Android**에서는 **FCC(미 연방통신위원회)** 규정에 따라  
   사용자가 **시스템 설정을 통해 자막 스타일을 직접 제어**할 수도 있습니다.



- **backgroundColor** (string)
  - 자막 문자 **배경의 색상**을 16진수(hex)로 지정합니다.
  - 기본값: `#000000`

- **backgroundOpacity** (number)
  - 자막 문자 **배경의 불투명도(투명도%)** 를 설정합니다.
  - 기본값: `75`

- **color** (string)
  - 자막 **텍스트 색상**을 16진수(hex)로 지정합니다.
  - 기본값: #ffffff

- **edgeStyle** (string)
  - 자막 문자가 **배경과 구분되는 방식(테두리 스타일)** 을 설정합니다.
  - 기본값: `none`

- **fontFamily** (string)
  - 자막 **텍스트의 폰트 패밀리(Font Family)** 를 지정합니다.
  - 기본값: `sans`

- **fontOpacity** (number)
  - 자막 **텍스트의 불투명도(투명도%)** 를 설정합니다.
  - 기본값: `100`

- **fontSize** (number)
  - 자막 **텍스트 크기(px)** 를 지정합니다.
  - 단, 브라우저가 자막을 렌더링하는 경우에는 크기에 영향을 주지 않습니다.
  - 기본값: `15`

- **windowColor** (string)
  - 자막 전체 영역의 **배경색**을 16진수(hex)로 지정합니다.
  - 기본값: `#000000`

- **windowOpacity** (number)
  - 자막 전체 영역의 **배경 불투명도(투명도%)** 를 설정합니다.
  - 기본값: `0`


> 참고: 자막 스타일을 설정할 때, color 값은 반드시 **16진수(hex 형식)** 로 지정해야 합니다.
{: .prompt-tip}





-------------








## Casting

**캐스팅(Casting)** 기능을 사용하면 시청자가 **Google Cast** 또는 **Apple AirPlay** 기술을 이용해  
비디오 및 오디오 콘텐츠를 **호환되는 TV 또는 사운드 시스템으로 스트리밍**할 수 있습니다.

플레이어에서 캐스팅 기능을 활성화하면, 시청자는 **컨트롤 바의 캐스트 아이콘**을 눌러  
콘텐츠를 캐스트 호환 기기에서 재생할 수 있습니다.

플레이어가 **호환 기기를 감지하지 못한 경우, 캐스트 아이콘은 표시되지 않습니다.**

> 참고: [FAQs](https://docs.jwplayer.com/players/docs/players-enable-casting-and-airplay#faqs) 도 함께 확인하세요.
{: .prompt-tip}



### 캐스팅 활성화 방법

플레이어 설정(`setup()`)에 빈 **cast 객체**를 추가합니다.

````js
player.setup({
  playlist: 'https://cdn.jwplayer.com/v2/playlists/1a2Bc3d4',
  height: 360,
  width: 640,
  cast: {},
});
````



### 커스텀 리시버(Custom Receiver) 사용 시

커스텀 리시버를 사용하는 경우, **리시버 앱의 식별자(identifier)** 를  
`cast.appid` 속성에 지정합니다.

````js
player.setup({
  playlist: 'https://cdn.jwplayer.com/v2/playlists/1a2Bc3d4',
  height: 360,
  width: 640,
  cast: {
    appid: 'XXXXXX',
    interceptCast: true,
  },
});
````

- **appid** (string)
  - 커스텀 리시버를 사용할 때, **리시버 앱의 식별자(identifier)** 를 지정합니다.

- **interceptCast** (boolean)
  - **기본 Chromecast 동작을 비활성화**합니다.
  - 이 설정이 활성화되면, **캐스트 아이콘 클릭 시 기본 전송 동작은 실행되지 않으며**,  
    대신 플레이어에서 `castIntercepted` 이벤트가 트리거됩니다.


> 참고: 이 구성이 설정된 경우, **사용자는 직접 API를 호출해야 합니다.**
>
> - 캐스팅 시작: `requestCast()`
> - 캐스팅 중지: `stopCasting()`
{: .prompt-tip}




----





## Common Media Client Data

<sup>8.36.2+</sup>

공통 미디어 클라이언트 데이터, CMCD

이 속성은 **모든 HLS.js 또는 Shaka 요청에 CMCD(Common Media Client Data) 정보를 추가**합니다.

> 참고: `"cmcd": {}`를 추가하면 각 CMCD 속성에 대해 **기본값(default values)** 이 전송됩니다.  
> 그러나 각 **CMCD ID에 의미 있는 값**을 직접 지정하는 것을 권장합니다.
{: .prompt-tip}


````js
player.setup({
  "playlist": "https://cdn.jwplayer.com/v2/media/hWF9vG66",
  ...
  "cmcd": {
    "sessionId": "6e2fb550-c457-11e9-bb97-0800200c9a66",
    "contentId": "hWF9vG66",
    "useHeaders": false
  }
});
````


- **contentId** (string)
  - 현재 미디어 항목의 **식별자(identifier)** 를 지정합니다.
  - 기본값: 플레이리스트 항목의 `media ID`

- **sessionId** (string)
  - **세션(session)** 의 고유 식별자입니다.
  - 기본값: 무작위로 생성된 `UUID`

- **useHeaders** (boolean)
  - 요청에 **CMCD 헤더를 추가할지 여부**를 설정합니다.
  - 가능한 값:
    - `false`: (기본값) CMCD 정보가 **쿼리 스트링(query string)** 을 통해 전송됩니다.
    - `true`: CMCD 정보가 **HTTP 헤더(headers)** 를 통해 전송됩니다.
  - ⚠️ 단, 서버가 이러한 추가 헤더를 **예상하고 허용하지 않는 경우, CORS 오류**가 발생할 수 있습니다.





----------






## Do Not Save Cookies

쿠키 저장 안 함   
`doNotSaveCookies` 속성은 **플레이어 내 데이터 수집을 제한**합니다.

````js
player.setup({
  "playlist": "https://cdn.jwplayer.com/v2/playlists/{playlist_id}",
  ...
  "doNotSaveCookies": false
});
````

- **doNotSaveCookies** (boolean)
  - 플레이어가 **사용자 ID를 저장할 수 있는지 여부**를 제어합니다.
  - 가능한 값:
    - `false`: (기본값) 사용자 쿠키가 저장됩니다.
    - `true`: 사용자 쿠키가 저장되지 않습니다.


> 참고: 콘텐츠 관리 플랫폼(CMP, Content Management Platform)을 사용하는 경우,   
> 사용자가 **쿠키 추적을 거부(opt-out)** 했을 때 `"doNotSaveCookies": true` 로 설정하면   
> 플레이어가 사용자의 개인정보 선택 사항을 **준수하도록 보장**할 수 있습니다.
{: .prompt-tip}
