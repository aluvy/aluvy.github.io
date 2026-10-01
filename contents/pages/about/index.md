---
date: '1999-01-01 22:40:00 +0900'
title: 'About, Text and Typography'
summary: 'aluvy Blog'
author: ['aluvy']
categories: []
tags: []
thumbnail: ''
---

## Headings
# H1 - Heading
## H2 - Heading
### H3 - Heading
#### H4 - Heading
##### H5 - Heading
###### H6 - Heading

---

## Paragraph
Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate maxime consequuntur a? Temporibus quia omnis quis quas esse eaque maiores rem ea iure nostrum harum sit repellat, possimus, nisi cupiditate! Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate maxime consequuntur a? Temporibus quia omnis quis quas esse eaque maiores rem ea iure nostrum harum sit repellat, possimus, nisi cupiditate!

Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate maxime consequuntur a? Temporibus quia omnis quis quas esse eaque maiores rem ea iure nostrum harum sit repellat, possimus, nisi cupiditate!

---

## code block

- 언어 이름만 (자동 표시)
```js
const foo = 'bar'
```

- 파일명 표시   
  `js:title=index.js`

```js:title=index.js
const foo = 'bar'
```

- 줇 번호 매기기   
  `javascript{numberLines: true}`

```javascript{numberLines: true}
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        `gatsby-remark-prismjs`,
      ]
    }
  }
]
```

- 원하는 인덱스부터 표시하기   
  `javascript{numberLines: 5}`

```javascript{numberLines: 5}
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        `gatsby-remark-prismjs`,
      ]
    }
  }
]
```

- 라인 강조 표시   
  `javascript{1,4-6}`

```javascript{1,4-6}
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        `gatsby-remark-prismjs`,
      ]
    }
  }
]
```

---

## list

- Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate maxime consequuntur a? Temporibus quia omnis quis quas esse eaque maiores rem ea iure nostrum harum sit repellat, possimus, nisi cupiditate!
- Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate maxime consequuntur a? Temporibus quia omnis quis quas esse eaque maiores rem ea iure nostrum harum sit repellat, possimus, nisi cupiditate!
  - Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate maxime consequuntur a? Temporibus quia omnis quis quas esse eaque maiores rem ea iure nostrum harum sit repellat, possimus, nisi cupiditate!
  - Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate maxime consequuntur a? Temporibus quia omnis quis quas esse eaque maiores rem ea iure nostrum harum sit repellat, possimus, nisi cupiditate!
    - Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate maxime consequuntur a? Temporibus quia omnis quis quas esse eaque maiores rem ea iure nostrum harum sit repellat, possimus, nisi cupiditate!
      - Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate maxime consequuntur a? Temporibus quia omnis quis quas esse eaque maiores rem ea iure nostrum harum sit repellat, possimus, nisi cupiditate!
      - Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate maxime consequuntur a? Temporibus quia omnis quis quas esse eaque maiores rem ea iure nostrum harum sit repellat, possimus, nisi cupiditate!

---

## table

|Company	|Contact|Country|center|
|:--|:--|--:|:--:|
|Alfreds Futterkiste|Maria Anders|Germany|d|
|Island Trading|Helen Bennett	|UK|4|
|Magazzini Alimentari Riuniti|Giovanni Rovelli	|Italy|1|

---

## prompt

> **기본 프롬프트**   
> Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate maxime consequuntur a? Temporibus quia omnis quis quas esse eaque maiores rem ea iure nostrum harum sit repellat, possimus

> **prompt tip**   
> `{: .prompt-tip}`   
> Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate maxime consequuntur a? Temporibus quia omnis quis quas esse eaque maiores rem ea iure nostrum harum sit repellat, possimus
{: .prompt-tip}

> **prompt info**   
> `{: .prompt-info}`   
> Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate maxime consequuntur a? Temporibus quia omnis quis quas esse eaque maiores rem ea iure nostrum harum sit repellat, possimus
{: .prompt-info}

> **prompt warning**   
> `{: .prompt-warning}`   
> Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate maxime consequuntur a? Temporibus quia omnis quis quas esse eaque maiores rem ea iure nostrum harum sit repellat, possimus
{: .prompt-warning}

> **prompt danger**   
> `{: .prompt-danger}`   
> Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate maxime consequuntur a? Temporibus quia omnis quis quas esse eaque maiores rem ea iure nostrum harum sit repellat, possimus
{: .prompt-danger}