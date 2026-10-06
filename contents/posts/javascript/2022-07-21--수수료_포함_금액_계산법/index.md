---
date: '2022-07-21 09:50:00 +0900'
title: '수수료 포함한 금액 계산법 /1.1'
summary: '// 수수료 포함한 금액 계산 const cal_money = function(total_pin){ let ret_money = 0; let fee = ( $refund_fee_max * 0.01 ) + 1;  /// 10.00 x 0.01  +1  => 1.1 let temp_money = total_pin / fee; ret_money = Math.floor( temp_money / 100)'
author: ['aluvy']
categories: ['JavaScript']
tags: ['']
thumbnail: ''
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