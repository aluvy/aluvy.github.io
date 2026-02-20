---
title: "[CSS] Media Queries Breakpoints For Responsive Design In 2023"
date: 2023-11-01 17:06:00 +0900
categories: [CSS, CSS-basic]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## Using min-width

````css
// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) { ... }

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) { ... }

// Large devices (desktops, 992px and up)
@media (min-width: 992px) { ... }

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) { ... }
````

## Using max-width

````css
@media (max-width: 575.98px) { ... }

// Small devices (landscape phones, less than 768px)
@media (max-width: 767.98px) { ... }

// Medium devices (tablets, less than 992px)
@media (max-width: 991.98px) { ... }

// Large devices (desktops, less than 1200px)
@media (max-width: 1199.98px) { ... }
````


## Devices
Mostly looked at Apple devices. While Android-based devices are important too, they have a lot of variances in most phones. I hope it’s not a big deal for you.


| Device Category   | Breakpoint Width | Device Name                      |
| ----------------- | ---------------- | -------------------------------- |
| Mobile, portrait  | 320px            | iPhone SE                        |
|                   | 375px            | iPhone 6 to X                    |
|                   | 414px            | iPhone 8 Plus                    |
| Mobile, landscape | 568px            | iPhone SE                        |
|                   | 667px            | iPhone 6 to 8                    |
|                   | 736px            | iPhone 8 Plus                    |
|                   | 812px            | iPhone X                         |
| Tablet, portrait  | 768px            | iPad Air, iPad Mini, iPad Pro 9″ |
|                   | 834px            | iPad Pro 10″                     |
| Tablet, landscape | 1024px           | iPad Air, iPad Mini, iPad Pro 9″ |
|                   | 1024px           | iPad Pro 12″ (portrait)          |
|                   | 1112px           | iPad Pro 10″                     |
| Laptop displays   | 1366px           | HD laptops (768p)                |
|                   | 1366px           | iPad Pro 12″ (landscape)         |
|                   | 1440px           | 13″ MacBook Pro (2x scaling)     |
| Desktop displays  | 1680px           | 13″ MacBook Pro (1.5x scaling)   |
|                   | 1920px           | 1080p displays                   |






---
<br>

##### 참고

- [media-queries-breakpoints-2023](https://devfacts.com/media-queries-breakpoints-2023/)
