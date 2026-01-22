---
title: "[JavaScript] 모바일 디바이스 체크"
date: 2022-12-12 17:52:00 +0900
categories: [JavaScript]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

모바일 디바이스를 체크하여   
PC웹 환경인지, mobile 환경인지 알아낼 수 있다.   
이 코드를 활용해 모바일용, 또는 PC화면용 동작을 다르게 할 수 있다.

````javascript
function detectMobileDevice(agent) {
  const mobileRegex = [/Android/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i]
  return mobileRegex.some(mobile => agent.match(mobile))
}

const isMobile = detectMobileDevice(window.navigator.userAgent)

if (isMobile) {
  // 모바일
} else {
  // PC
}
````
