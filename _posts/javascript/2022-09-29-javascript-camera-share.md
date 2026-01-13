---
title: "아이폰 카메라, 공유하기 버튼"
date: 2022-09-29 18:17:00 +0900
categories: [JavaScript]
tags: []
render_with_liquid: false
math: true
mermaid: true
---


## 카메라 띄우기
````html
<div class="jsQR">
  <div id="loadingMessage">🎥 비디오 스트림에 액세스할 수 없습니다.<br>(웹캠이 활성화되어 있는지 확인하십시오).</div>
  <canvas id="canvas" hidden></canvas>
  <div id="output" hidden>
    <div id="outputMessage">잘못된 QR코드입니다.</div>
    <div hidden><b>Data:</b> <span id="outputData"></span></div>
  </div>
</div>
````

````javascript
// var video = document.createElement("video");
var video = document.getElementById("video");
// $("#wrap").append(video);
// console.log('1', video);
var canvasElement = document.getElementById("canvas");
var canvas = canvasElement.getContext("2d");
var loadingMessage = document.getElementById("loadingMessage");
var outputContainer = document.getElementById("output");
var outputMessage = document.getElementById("outputMessage");
var outputData = document.getElementById("outputData");

// let videoLive = true;

const qrcodeEl = document.querySelector('#qrcode');
const downloadEl = document.querySelector('#download');
$(function() {
  qrcodeEl.innerHTML = ``;
  new QRCode(qrcodeEl, {
    text:`<?=session()->get('id')?>`,
    width: '256',
    height: '256'
  });
});


// $("#testbtn").on("click", function(e){
//     e.preventDefault();
//     console.log('dd');
//     video.play();
//     requestAnimationFrame(tick);
// });

function drawLine(begin, end, color) {
  canvas.beginPath();
  canvas.moveTo(begin.x, begin.y);
  canvas.lineTo(end.x, end.y);
  canvas.lineWidth = 4;
  canvas.strokeStyle = color;
  canvas.stroke();
}

// Use facingMode: environment to attemt to get the front camera on phones
// function playVideo(){
// { video: true, audio: true }
navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
  // track = stream.getTracks()[0];
  video.srcObject = stream;
  // video.setAttribute("playsinline", false); // required to tell iOS safari we don't want fullscreen
  // video.setAttribute("muted", true); // required to tell iOS safari we don't want fullscreen
  video.play();
  requestAnimationFrame(tick);
})
.catch(function(error){
  alert(error);
});
// }
// playVideo();

function tick() {


  loadingMessage.innerText = "⌛ Loading video..."
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    loadingMessage.hidden = true;
    canvasElement.hidden = false;
    outputContainer.hidden = false;

    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;

    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);


    var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);

    var code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });

    // alert(imageData);

    if (code) {
      drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#00c6ff");
      drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#00c6ff");
      drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#00c6ff");
      drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#00c6ff");
      outputMessage.hidden = true;
      outputData.parentElement.hidden = false;
      outputData.innerText = code.data;

      let $data = code.data;
      let regExpPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

      if( regExpPhone.test($data) ){                    
        location.href = `/mobile/pin/pin_send?send_id=${$data}`;
      }

    } else {
      outputMessage.hidden = false;
      outputData.parentElement.hidden = true;
    }
  }

  requestAnimationFrame(tick);
}

// preCapture(container, onSuccess) {
//     const canvas = this.createCanvas(),
//         context = canvas.getContext("2d");
//     context.drawImage(container, 0, 0);
//     this.clearCanvas(canvas);

//     setTimeout(() => {
//         onSuccess(container);
//     }, 1000);
// }
````


## 공유하기

````html
<span class="qr_share"><a href="#">공유</a></span>
````

````javascript
$(document).on("click", ".qr_share", function(e){
    e.preventDefault();
    shareCanvas();
})


async function shareCanvas() {
  // const canvasElement = document.querySelector('canvas');
  const canvasElement = await html2canvas(
    document.querySelector("#qrcode img"),
    {
      scale: 1, // 줌 비율, 기본값으로 1
      width:'195',
      height:'195',
    }
  );
  const dataUrl = canvasElement.toDataURL();
  const blob = await (await fetch(dataUrl)).blob();
  const filesArray = [
    new File(
      [blob],
      'qrcode.png',
      {
        // type: blob.type,
        type: "image/png",
        lastModified: new Date().getTime()
      }
    )
  ];
  console.log(filesArray);
  const shareData = {
    files: filesArray,
    title : "PinKey",
    text : "PinKey QRcode 공유",
  };
  navigator.share(shareData);
}
````
