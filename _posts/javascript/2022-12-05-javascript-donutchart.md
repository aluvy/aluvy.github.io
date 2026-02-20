---
title: "SVG 도넛차트"
date: 2022-12-05 21:40:00 +0900
categories: [JavaScript, JavaScript-basic]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

도넛 모양의 차트를 구현한 일이 있었는데,   
디자인 상의 그라데이션과 100% 채워졌을때의 디자인이 일반 SVG 도넛차트와 달라서 여러 방법으로 테스트를 하던 중,   
비슷한 라이브러리를 찾아 구현할 수 있었다.

![alt text](/assets/images/posts/2022/12/05/donutchart-01.png)

````html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Radial/Ring/Circle Progress Chart Generator for Apple Watch.</title>

  <style>
    body{ padding: 0; margin:0; text-rendering: optimizelegibility; }
    .charts-item { text-align: center; }
    .chart-box { position:relative; height:300px; width:300px; margin: 10px auto;}
    .chart-options { padding: 5px 0; }
    .knob.with-subtext {margin-top: 85px !important;}
    .subtext {position: absolute; width: 100%; text-align: center; text-transform: uppercase; top: 180px; font-size: 20px;}
  </style>
  <script src="https://code.jquery.com/jquery-3.6.2.js" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js"></script>
  <script src="jquery.knob.js"></script>
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-60593416-1', 'auto');
    ga('send', 'pageview');
  </script>
</head>
<body>
  <div class="charts-item">
    <h3>chart sample</h3>
    <div id="single-arc" class="chart-box">

      <div class="canvas-box">
        <input id="single-single-arc" class="knob with-subtext"
          data-min="0"
          data-bgColor="#F4F6F9" data-fgColor="#F4EAEA" data-fgColorMid="#fab275" data-fgColorEnd="#ff7a00"
          data-displayInput="true"
          data-width="300" data-height="300"
          data-thickness=".2" data-bgthickness=".2"
          data-angleOffset="0" data-linecap="round"
          data-readOnly="false"
          data-inputColor="#000000"
          data-shadow="false" data-shadowColor="#000000"
          data-step="0.1"
          value="0"
          data-max="100"
          rel="100"
        >
        <div class="subtext">chart sample</div>
      </div>
    </div>
  </div>

  <script>
    window.addEventListener("load", ()=>{
      // $(".knob").each(()=>{
      let $this = $(".knob");
      let myVal = $this.attr("rel");
      $this.knob();

      $({
        value: 0
      }).animate({
        value: myVal
      }, {
        duration: 2000,
        // easing: 'easeOutQuad',
        easing: 'easeOutCubic',
        // easing: 'easeOutQuart',
        // easing: 'easeOutQuint',
        // easing: 'easeOutExpo',
        step: function () {
          // $this.val(Math.ceil(this.value)).trigger('change');
          $this.val((this.value).toFixed(2)).trigger('change');
          $this.val((this.value).toFixed(0));
        }
      })
      // });
    })
  </script>
</body>
</html>
````


---
<br>

##### 참고

- [github/aluvy/chart-donutgauge](https://github.com/aluvy/chart-donutgauge)
- [aluvy/chart-donutgauge](https://aluvy.github.io/chart-donutgauge/)

- [RadialChartImageGenerator](https://hmaidasani.github.io/RadialChartImageGenerator/)
- [highcharts-demo-gauges](https://www.highcharts.com/demo#highcharts-demo-gauges)
- [jsCharting - Circular Activity Rings Chart](https://jscharting.com/examples/chart-types/circular-gauge/activity-rings/#)
