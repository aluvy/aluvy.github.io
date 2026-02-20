---
title: "[CSS] 디자인 시스템 만들기: breakpoint"
date: 2024-07-12 13:01:00 +0900
categories: [CSS, CSS-basic]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## 들어가며
디자인을 할 때 여러 해상도를 대응해야 하는 것은 필수적이다.

특히나 요즘에는 너무나도 다양한 기기들이 나오다 보니 하나의 서비스를 만들 때 모바일 앱이 아닌 이상 데스크탑, 태블릿, 모바일 그리고 이 디바이스에서도 다양한 해상도를 대응해야 한다. (갤럭시 플립, 폴더···)

그래서 디자인 시스템 Foundation 영역에 들어갈 브레이크 포인트를 설정하는 데 있어서도 많은 고민과 리서치가 필요하다.

## 1. 글로벌 기업의 디자인 시스템 리서치

Google의 Meterial 디자인 시스템, MUI 디자인 시스템 그리고 기타 브랜드의 디자인 시스템을 찾아 공통적인 영역을 도출

### Google Meterial Design System

| Breakpoint Range (dp) | Portrait       | Landscape      | Window | Colums | Margines / Gutters* |
| --------------------- | -------------- | -------------- | ------ | ------ | ------------------- |
| 0 ~ 359               | small handset  |                | xsmall | 4      | 16                  |
| 360 ~ 399             | medium handset |                | xsmall | 4      | 16                  |
| 400 ~ 479             | large handset  |                | xsmall | 4      | 16                  |
| 480 ~ 599             | large handset  | small handset  | xsmall | 4      | 16                  |
| 600 ~ 719             | small tablet   | medium handset | small  | 8      | 16                  |
| 720 ~ 839             | large tablet   | large handset  | small  | 8      | 16                  |
| 840 ~ 959             | large tablet   | large handset  | small  | 12     | 24                  |
| 960 ~ 1023            |                | small tablet   | small  | 12     | 24                  |
| 1024 ~ 1279           |                | large tablet   | medium | 12     | 24                  |
| 1280 ~ 1439           |                | large tablet   | medium | 12     | 24                  |
| 1440 ~ 1599           |                |                | large  | 12     | 24                  |
| 1600 ~ 1919           |                |                | large  | 12     | 24                  |
| 1920 +                |                |                | xlarge | 12     | 24                  |


### MUI Design System

Define breakpoint   
Each breakpoint (a key) matches with a fixed screen width (a value):

- **xs**: extra-small: 0px
- **sm**, small: 600px
- **md**, medium: 900px
- **lg**, large: 1200px
- **xl**, extra-large: 1536px

### Carbon Design System

| Breakpoint | Value (px/rem) | Columns | Size (%) | Size | Padding | Margin |
| ---------- | -------------- | ------- | -------- | ---- | ------- | ------ |
| Small      | 320 / 20       | 4       | 25%      | 80px | 16px    | 0      |
| Medium     | 672 / 42       | 8       | 12.5%    | 80px | 16px    | 16px   |
| Large      | 1056 / 66      | 16      | 6.25%    | 64px | 16px    | 16px   |
| X-Large    | 1312 / 82      | 16      | 6.25%    | 80px | 16px    | 16px   |
| Max        | 1584 / 99      | 16      | 6.25%    | 96px | 16px    | 24px   |

구글 머터리얼 디자인 시스템을 보면 굉장히 다양한 해상도를 대응하는것을 볼 수 있다. 총 13개로 브레이크 포인트를 나누고 5~6가지로 기기를 구별하였다.

MUI 같은 경우에는 총 4가지 브레이크 포인트를 나누었고 Carbon은 5개로 나누었다.

이 세 가지에서 공통적인 부분은 **모바일 사이즈는 600px 이하로 잡았다는 것**이고, 나머지 부분들은 각자의 서비스에 맞춰서 나누어 값들이 다양했다.

넓은 범위로서 공통점은 700px, 1200px, 1600px 이하 영역에서 브레이크 포인트를 잡았다는 점이다.


## 2. 가장 많이 사용하는 해상도 찾기

<https://gs.statcounter.com/screen-resolution-stats#monthly-202401-202501-bar>

- **Desktop**: 1920x1080, 1366x768, 1536x864
- **Tablet**: 768x1024, 810x1080, 820x1180
- **Mobile**: 360x800, 390x844, 393x873

| Type         | 해상도          |
| ------------ | --------------- |
| Mobile       | 0 ~ 599px       |
| Small Tablet | 600px ~ 1023px  |
| Large Tablet | 1024px ~ 1439px |
| Desktop      | 1440px ~ 1920   |
 

위의 표가 정답은 아니다.   
많은 리서치와 데이터를 바탕으로 브레이크 포인트를 서비스에 맞게 설정해야 한다.


---

<br>

##### 참고

- [디자인 시스템 만들기-3 브레이크포인트](https://brunch.co.kr/@bommade/22)
