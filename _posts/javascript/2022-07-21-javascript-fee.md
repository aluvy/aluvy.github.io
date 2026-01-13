---
title: "수수료 포함한 금액 계산법 /1.1"
date: 2022-07-21 09:50:00 +0900
categories: [JavaScript]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

````javascript
// 수수료 포함한 금액 계산
const cal_money = function(total_pin){

  let ret_money = 0;
  let fee = ( $refund_fee_max * 0.01 ) + 1;  /// 10.00 x 0.01  +1  => 1.1
  let temp_money = total_pin / fee;
  ret_money = Math.floor( temp_money / 100) * 100;

  return ret_money;
}
````
