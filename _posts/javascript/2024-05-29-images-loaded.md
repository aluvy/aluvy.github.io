---
title: "[JavaScript] images Loaded"
date: 2024-05-29 14:44:00 +0900
categories: [JavaScript, JavaScript-basic]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## imagesLoaded
imagesLoaded Plugin을 사용하면 이미지의 로딩 여부를 체크하여 이벤트를 발생시킬 수 있습니다.

### CDN

````html
<script src="https://unpkg.com/imagesloaded@5/imagesloaded.pkgd.min.js"></script>
````

### NPM

````shell
$ npm install imagesloaded
$ yarn add imagesloaded
````

### Syntax
#### image

````js
const init = () => {
  // image loading이 끝나면 실행 할 함수
};

const imgs = [...document.querySelectorAll("img")]; // Array like ==> Array
const loader = document.querySelector(".loader--text");

const updateProgress = (instance) => {
  const per = Math.round((instance.progressedCount * 100) / imgs.length);
  loader.textContent = `${per}%`;
};

imagesLoaded(imgs)
  .on("progress", updateProgress)
  .on("always", init);
````


#### background
`{ background: true }`, 또는 `{ background: '.bg' }` 옵션을 추가하여 하위 요소의 배경 이미지가 로드되었을 때를 탐지합니다.

````js
imagesLoaded( '#container', { background: true }, function() {
  console.log('#container background image loaded');
});

imagesLoaded( '#container', { background: '.item' }, function() {
  console.log('all .item background images loaded');
});
````

### Event

| Event      |                                                  |
| ---------- | ------------------------------------------------ |
| `always`   | 모든 이미지가 확인되면 실행                      |
| `done`     | 손상된 이미지 없이 모두 성공적으로 로드되면 실행 |
| `fail`     | 손상된 이미지가 있을 때 실행                     |
| `progress` | 각 이미지가 로드될 때마다 실행                   |


#### always

````js
imagesLoaded.on( 'always', function( instance ) {
  console.log('ALWAYS - all images have been loaded');
});
````

#### done

````js
imagesLoaded.on( 'done', function( instance ) {
  console.log('DONE  - all images have been successfully loaded');
});
````

#### fail

````js
imagesLoaded.on( 'fail', function( instance ) {
  console.log('FAIL - all images loaded, at least one is broken');
});
````

#### progress

````js
imagesLoaded.on( 'progress', function( instance, image ) {
  var result = image.isLoaded ? 'loaded' : 'broken';
  console.log( 'image is ' + result + ' for ' + image.img.src );
});
````

----

<br>

##### 참고

- [imagesLoaded](https://imagesloaded.desandro.com/)
- [Practis \| github \| aluvy](https://aluvy.github.io/gsap/demo/scrolltrigger-practice/)
