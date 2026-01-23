---
title: "[Accessibility] WAI-ARIA 요소 - tab 컨트롤"
date: 2023-01-24 15:43:00 +0900
categories: [Web Accessibility]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

웹페이지를 마크업 할 때 의미에 맞는 요소 사용 및 키보드 접근성 구현이 중요하다.   
위 내용이 중요한 까닭은 스크린리더 사용자는 포커스 되는 각각의 요소의 이름이나 상태를 통하여 페이지 구조를 파악하고 각 요소에 맞는 키보드 액션을 통해 컨트롤하기 때문이다.

WAI-ARIA 접근성 기술이 보편화되기 시작하면서 이러한 중요성은 더 커지게 되었다.   
그러나 WAI-ARIA와 HTML요소를 어떻게 적용해야 하는지, 또 이 요소의 키보드 접근성은 어떻게 구현해야 하는지 등에 대한 국내 자료가 부족하다.

## ARIA를 이용한 tab 컨트롤 구현하기
tab 이란 주메뉴, 하위 메뉴보다는 작은 개념으로, 한 주제에 대해 여러 개의 세부 섹션을 표현하는 방법 중의 하나다. Tab은 3가지의 요소로 나뉜다.

- **Tab list**
  - tab, tab panel을 하나의 그룹으로 묶어 'tab list'라고 표현한다. 만약 같은 페이지에 두 개의 tab 섹션이 있다면 두 개의 tab list가 존재하는 것이 된다.

- **Tab**
  - tab 리스트의 하위 영역으로 각각의 tab 요소를 일컫는다. 만약 하나의 tab 리스트에 4개의 선택 가능한 요소가 있다면 4개의 tab이 존재하게 된다. role="tablist", role="tab"을 사용하여 tab컨트롤을 구현하면 스크린리더가 tab컨트롤에 접근했을 때 '접근성 블로그 tab, 선택 됨. 2/4'와 같이 전체 tab 및 현재 선택된 tab이 몇 번째 tab 인지 알려준다.

- **Tab panel**
  - 각각의 tab 하위 컨텐츠를 가리킨다. 사용자가 tab 중 하나를 선택할 때마다 관련된 tab 패널은 변경되며 처음 페이지 로딩 시 tab 요소 중 하나는 항상 선택된 상태이므로 하나의 tab 패널 역시 표시된 상태가 된다.


## 키보드 액션
브라우저는 링크, 버튼과 같은 각각의 태그마다 그 태그에 맞는 키보드 액션을 제공한다. 그러나 tab은 네이티브 html에 포함되지 않은 컨트롤 요소이므로 키보드 접근성을 스크립트로 구현해주어야 한다.


## Example

````html
<div class="tabs">
  <h3 id="tablist-1">Danish Composers</h3>
  <div role="tablist" aria-labelledby="tablist-1" class="automatic">
    <button id="tab-1" type="button" role="tab" aria-selected="true" aria-controls="tabpanel-1">
      <span class="focus">Maria Ahlefeldt</span>
    </button>
    <button id="tab-2" type="button" role="tab" aria-selected="false" aria-controls="tabpanel-2" tabindex="-1">
      <span class="focus">Carl Andersen</span>
    </button>
    <button id="tab-3" type="button" role="tab" aria-selected="false" aria-controls="tabpanel-3" tabindex="-1">
      <span class="focus">Ida da Fonseca</span>
    </button>
    <button id="tab-4" type="button" role="tab" aria-selected="false" aria-controls="tabpanel-4" tabindex="-1">
      <span class="focus">Peter Lange-Müller</span>
    </button>
  </div>

  <div id="tabpanel-1" role="tabpanel" tabindex="0" aria-labelledby="tab-1">
    <p>Maria Theresia Ahlefeldt (16 January 1755 – 20 December 1810) was a Danish, (originally German), composer. She is known as the first female composer in Denmark. Maria Theresia composed music for several ballets, operas, and plays of the royal theatre. She was given good critic as a composer and described as a “<span lang="da">virkelig Tonekunstnerinde</span>” ('a True Artist of Music').</p>
  </div>
  <div id="tabpanel-2" role="tabpanel" tabindex="0" aria-labelledby="tab-2" class="is-hidden">
    <p>Carl Joachim Andersen (29 April 1847 – 7 May 1909) was a Danish flutist, conductor and composer born in Copenhagen, son of the flutist Christian Joachim Andersen. Both as a virtuoso and as composer of flute music, he is considered one of the best of his time. He was considered to be a tough leader and teacher and demanded as such a lot from his orchestras but through that style he reached a high level.</p>
  </div>
  <div id="tabpanel-3" role="tabpanel" tabindex="0" aria-labelledby="tab-3" class="is-hidden">
    <p>Ida Henriette da Fonseca (July 27, 1802 – July 6, 1858) was a Danish opera singer and composer.  Ida Henriette da Fonseca was the daughter of Abraham da Fonseca (1776–1849) and Marie Sofie Kiærskou (1784–1863). She and her sister Emilie da Fonseca were students of Giuseppe Siboni, choir master of the Opera in Copenhagen. She was given a place at the royal Opera alongside her sister the same year she debuted in 1827.</p>
  </div>
  <div id="tabpanel-4" role="tabpanel" tabindex="0" aria-labelledby="tab-4" class="is-hidden">
    <p>Peter Erasmus Lange-Müller (1 December 1850 – 26 February 1926) was a Danish composer and pianist. His compositional style was influenced by Danish folk music and by the work of Robert Schumann; Johannes Brahms; and his Danish countrymen, including J.P.E. Hartmann.</p>
  </div>
</div>
````
````css
.tabs {
  font-family: "lucida grande", sans-serif;
}

[role="tablist"] {
  min-width: 550px;
}

[role="tab"],
[role="tab"]:focus,
[role="tab"]:hover {
  position: relative;
  z-index: 2;
  top: 2px;
  margin: 0;
  margin-top: 4px;
  padding: 3px 3px 4px;
  border: 1px solid hsl(219deg 1% 72%);
  border-bottom: 2px solid hsl(219deg 1% 72%);
  border-radius: 5px 5px 0 0;
  overflow: visible;
  background: hsl(220deg 20% 94%);
  outline: none;
  font-weight: bold;
}

[role="tab"][aria-selected="true"] {
  padding: 2px 2px 4px;
  margin-top: 0;
  border-width: 2px;
  border-top-width: 6px;
  border-top-color: rgb(36 116 214);
  border-bottom-color: hsl(220deg 43% 99%);
  background: hsl(220deg 43% 99%);
}

[role="tab"][aria-selected="false"] {
  border-bottom: 1px solid hsl(219deg 1% 72%);
}

[role="tab"] span.focus {
  display: inline-block;
  margin: 2px;
  padding: 4px 6px;
}

[role="tab"]:hover span.focus,
[role="tab"]:focus span.focus,
[role="tab"]:active span.focus {
  padding: 2px 4px;
  border: 2px solid rgb(36 116 214);
  border-radius: 3px;
}

[role="tabpanel"] {
  padding: 5px;
  border: 2px solid hsl(219deg 1% 72%);
  border-radius: 0 5px 5px;
  background: hsl(220deg 43% 99%);
  min-height: 10em;
  min-width: 550px;
  overflow: auto;
}

[role="tabpanel"].is-hidden {
  display: none;
}

[role="tabpanel"] p {
  margin: 0;
}
````
````javascript
/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   File:   tabs-automatic.js
 *
 *   Desc:   Tablist widget that implements ARIA Authoring Practices
 */

'use strict';

class TabsAutomatic {
  constructor(groupNode) {
    this.tablistNode = groupNode;

    this.tabs = [];

    this.firstTab = null;
    this.lastTab = null;

    this.tabs = Array.from(this.tablistNode.querySelectorAll('[role=tab]'));
    this.tabpanels = [];

    for (var i = 0; i < this.tabs.length; i += 1) {
      var tab = this.tabs[i];
      var tabpanel = document.getElementById(tab.getAttribute('aria-controls'));

      tab.tabIndex = -1;
      tab.setAttribute('aria-selected', 'false');
      this.tabpanels.push(tabpanel);

      tab.addEventListener('keydown', this.onKeydown.bind(this));
      tab.addEventListener('click', this.onClick.bind(this));

      if (!this.firstTab) {
        this.firstTab = tab;
      }
      this.lastTab = tab;
    }

    this.setSelectedTab(this.firstTab, false);
  }

  setSelectedTab(currentTab, setFocus) {
    if (typeof setFocus !== 'boolean') {
      setFocus = true;
    }
    for (var i = 0; i < this.tabs.length; i += 1) {
      var tab = this.tabs[i];
      if (currentTab === tab) {
        tab.setAttribute('aria-selected', 'true');
        tab.removeAttribute('tabindex');
        this.tabpanels[i].classList.remove('is-hidden');
        if (setFocus) {
          tab.focus();
        }
      } else {
        tab.setAttribute('aria-selected', 'false');
        tab.tabIndex = -1;
        this.tabpanels[i].classList.add('is-hidden');
      }
    }
  }

  setSelectedToPreviousTab(currentTab) {
    var index;

    if (currentTab === this.firstTab) {
      this.setSelectedTab(this.lastTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.setSelectedTab(this.tabs[index - 1]);
    }
  }

  setSelectedToNextTab(currentTab) {
    var index;

    if (currentTab === this.lastTab) {
      this.setSelectedTab(this.firstTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.setSelectedTab(this.tabs[index + 1]);
    }
  }

  /* EVENT HANDLERS */

  onKeydown(event) {
    var tgt = event.currentTarget,
      flag = false;

    switch (event.key) {
      case 'ArrowLeft':
        this.setSelectedToPreviousTab(tgt);
        flag = true;
        break;

      case 'ArrowRight':
        this.setSelectedToNextTab(tgt);
        flag = true;
        break;

      case 'Home':
        this.setSelectedTab(this.firstTab);
        flag = true;
        break;

      case 'End':
        this.setSelectedTab(this.lastTab);
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onClick(event) {
    this.setSelectedTab(event.currentTarget);
  }
}

// Initialize tablist

window.addEventListener('load', function () {
  var tablists = document.querySelectorAll('[role=tablist].automatic');
  for (var i = 0; i < tablists.length; i++) {
    new TabsAutomatic(tablists[i]);
  }
});
````

---
<br>

##### 참고
- [WAI-ARIA 바르게 사용하기 1부 - tab 컨트롤 활용하기](https://nuli.navercorp.com/community/article/1132879)
- [Example of Tabs with Automatic Activation](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/)
- [웹 접근성을 준수하는 코드 작성하기 #2](https://tech.pxd.co.kr/post/웹-접근성을-준수하는-코드-작성하기-2-61)
