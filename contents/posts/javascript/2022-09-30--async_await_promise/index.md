---
date: '2022-09-30 10:58:00 +0900'
title: 'async await promise'
summary: 'function sayHi(){console.log("start");}async function a(){let promise = new Promise((resolve, reject) => {setTimeout(() => resolve(sayHi()), 3000)});let result = await promise;console.log("end");}a();'
author: ['aluvy']
categories: ['JavaScript']
tags: ['']
thumbnail: ''
---


````javascript
function sayHi(){
  console.log("start");
}

async function a(){
  let promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve(sayHi()), 3000)
});

let result = await promise;
  console.log("end");
}

a();
````


a함수를 실행하면   
3초 뒤 sayHi가 실행 되고, 그 아랫줄이 순차적으로 실행된다.

console창에   
start가 먼저 찍히고, end가 나중에 찍힘