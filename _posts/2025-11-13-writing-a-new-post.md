---
title: jekyll theme Chripy 포스트 작성 방법
# description: Examples of text, typography, math equations, diagrams, flowcharts, pictures, videos, and more.
date: 2025-11-13 09:28:00 +0900
categories: [ETC, ETC]
tags: [writing a new post, post, jekyll, chripy]     # TAG names should always be lowercase
render_with_liquid: false
---

이 튜토리얼은 _Chirpy 템플릿_ 에서 게시물을 작성하는 방법을 안내합니다.   
Jekyll을 이미 사용해 본 적이 있더라도, 여러 기능이 특정 변수를 설정해야만 동작하므로 한 번 읽어볼 가치가 있습니다.



## Naming and Path

루트 디렉터리의 **_posts** 안에 **YYYY-MM-DD-TITLE.EXTENSION** 형식의 이름을 가진 새 파일을 생성하세요.   
**EXTENSION** 값은 반드시 **md** 또는 **markdown** 중 하나여야 합니다.   
파일 생성 작업에 드는 시간을 절약하고 싶다면, 플러그인 [`Jekyll-Compose`](https://github.com/jekyll/jekyll-compose)를 사용하여 이 작업을 수행하는 것을 고려해 보세요.


## Front Matter

기본적으로, 게시물의 맨 위에 다음과 같이 [`Front Matter`](https://jekyllrb.com/docs/front-matter/)를 채워 넣어야 합니다:

```yaml
---
title: TITLE
date: YYYY-MM-DD HH:MM:SS +/-TTTT
categories: [TOP_CATEGORY, SUB_CATEGORY]
tags: [TAG]     # TAG names should always be lowercase
---
```

> 게시물의 _레이아웃_ 은 기본적으로 `post`로 설정되어 있으므로, Front Matter 블록에 _layout_ 변수를 추가할 필요는 없습니다.
{: .prompt-tip }



## Timezone of Date

게시물의 발행 날짜를 정확하게 기록하려면, **_config.yml**의 `timezone`만 설정하는 것이 아니라,   
해당 게시물의 Front Matter 블록에 있는 `date` 변수에도 게시물의 시간대를 함께 지정해야 합니다.   
형식: `+/-TTTT`, e.g. `+0800`.


## Categories and Tags

각 게시물의 `categories`는 최대 두 개의 요소를 포함하도록 설계되어 있으며, `tags`의 요소 개수는 0개부터 무한대까지 가능합니다.   
예시는 다음과 같습니다:

```yaml
---
categories: [Animal, Insect]
tags: [bee]
---
```


## Author Information

게시물의 작성자 정보는 보통 _Front Matter_ 에 직접 작성할 필요가 없으며, 기본적으로 설정 파일의 `social.name` 변수와 `social.links`의 첫 번째 항목에서 가져옵니다.   
하지만, 아래와 같이 이를 오버라이드할 수도 있습니다.

먼저 `_data/authors.yml`에 작성자 정보를 추가합니다.   
(웹사이트에 이 파일이 없다면, 주저하지 말고 새로 생성해 추가해도 됩니다).

```yaml
<author_id>:
  name: <full name>
  twitter: <twitter_of_author>
  url: <homepage_of_author>
```


그 다음, 단일 항목을 지정할 때는 `author`, 여러 항목을 지정할 때는 `authors`를 사용합니다:

```yaml
---
author: <author_id>                     # for single entry
# or
authors: [<author1_id>, <author2_id>]   # for multiple entries
---
```
즉, `author` 키 역시 여러 항목을 식별하는 데 사용할 수 있습니다.

> **_data/authors.yml** 파일에서 작성자 정보를 읽어 오는 이점은,   
> 페이지에 `twitter:creator` 메타 태그가 추가된다는 점이며,   
> 이는 [Twitter 카드(Twitter Cards)](https://developer.x.com/en/docs/x-for-websites/cards/guides/getting-started#card-and-content-attribution)를 더 풍부하게 만들어 주고 SEO에도 도움이 됩니다.
{: .prompt-info}


## Post Description

기본적으로, 게시물의 첫 문장들은 홈 페이지의 게시물 목록, Further Reading 섹션, 그리고 RSS 피드의 XML에 표시하는 데 사용됩니다.   
게시물에 대해 자동 생성된 설명을 표시하고 싶지 않다면, 다음과 같이 Front Matter의 `description` 필드를 사용해 직접 커스터마이즈할 수 있습니다:

```yaml
---
description: Short summary of the post.
---
```
또한, 이 `description` 텍스트는 게시물 페이지에서 게시물 제목 아래에도 표시됩니다.


## Table of Contents

기본적으로, Table of Contents(TOC)는 게시물의 오른쪽 패널에 표시됩니다.   
전역적으로 TOC를 끄고 싶다면 **_config.yml**로 이동해 `toc` 변수를 `false`로 설정하세요.   
특정 게시물에서만 TOC를 끄고 싶다면, 게시물의 [Front Matter](https://jekyllrb.com/docs/front-matter/)에 다음 내용을 추가합니다:

```yaml
---
toc: false
---
```


## Comments

댓글에 대한 전역 설정은 **_config.yml** 파일의 `comments.provider` 옵션으로 정의됩니다.   
이 변수에 댓글 시스템을 설정하면, 모든 게시물에서 댓글이 활성화됩니다.

특정 게시물에서만 댓글을 비활성화하려면, 해당 게시물의 **Front Matter**에 다음을 추가합니다:

```yaml
---
comments: false
---
```


## Media

_Chirpy_ 에서는 이미지, 오디오, 비디오를 media resources(미디어 리소스) 라고 부릅니다.


### URL Prefix
게시물에서 여러 리소스에 대해 동일한 URL 접두사를 반복해 작성해야 하는 경우가 있는데, 이는 두 개의 매개변수를 설정해 지루한 작업을 피할 수 있습니다.

- CDN에서 미디어 파일을 호스팅하는 경우, **_config.yml**의 `cdn`을 지정할 수 있습니다.   
  그러면 사이트 아바타와 게시물 내 미디어 리소스의 URL 앞에 CDN 도메인이 접두사로 붙습니다.

  ```yaml
  cdn: https://cdn.com
  ```

- 현재 게시물/페이지 범위에 대한 리소스 경로 접두사를 지정하려면, 게시물의 _Front Matter_ 에 `media_subpath`를 설정합니다:

  ```yaml
  ---
  media_subpath: /path/to/media/
  ---
  ```

`site.cdn`과 `page.media_subpath` 옵션은 개별적으로 혹은 조합하여 사용할 수 있으며, 최종 리소스 URL은 다음과 같이 구성됩니다:   
`[site.cdn/][page.media_subpath/]file.ext`



### Images

#### Caption

이미지 바로 아래 줄에 _이탤릭체_ 를 추가하면, 그것이 캡션이 되어 이미지 하단에 표시됩니다:

```markdown
![img-description](/path/to/image)
_Image Caption_
```

#### Size

이미지가 로드될 때 페이지 콘텐츠 레이아웃이 흔들리지 않도록, 각 이미지에 width와 height를 지정해야 합니다.

```markdown
![Desktop View](/assets/img/sample/mockup.png){: width="700" height="400" }
```

> SVG의 경우 최소한 width는 반드시 지정해야 하며, 그렇지 않으면 렌더링되지 않습니다.
{: .prompt-info}

_Chirpy v5.0.0_ 부터 `height`와 `width`는 약어를 지원합니다 (`height` → `h`, `width` → `w`).   
아래 예시는 위와 동일한 효과를 냅니다:

```markdown
![Desktop View](/assets/img/sample/mockup.png){: w="700" h="400" }
```

#### Position

기본적으로 이미지는 가운데 정렬되지만, `.normal`, `.left`, `.right` 클래스 중 하나로 위치를 지정할 수 있습니다.

> 위치를 지정한 경우에는 이미지 캡션을 추가하면 안 됩니다.
{: .prompt-warning}

- **Normal position**   
아래 샘플에서는 이미지가 왼쪽 정렬됩니다:

  ```markdown
  ![Desktop View](/assets/img/sample/mockup.png){: .normal }
  ```

- **Float to the left**

  ```markdown
  ![Desktop View](/assets/img/sample/mockup.png){: .left }
  ```

- **Float to the right**
  
  ```markdown
  ![Desktop View](/assets/img/sample/mockup.png){: .right }
  ```

#### Dark/Light mode

다크/라이트 모드에서 테마 설정을 따르도록 하려면,   
다크 모드용 이미지와 라이트 모드용 이미지 두 개를 준비한 뒤 각각에 `.dark` 또는 `.light` 클래스를 지정해야 합니다:

```markdown
![Light mode only](/path/to/light-mode.png){: .light }
![Dark mode only](/path/to/dark-mode.png){: .dark }
```

#### Shadow
프로그램 창의 스크린샷처럼, 그림자 효과를 적용할 수 있습니다:

```markdown
![Desktop View](/assets/img/sample/mockup.png){: .shadow }
```

#### Preview Image

게시물 상단에 이미지를 추가하고 싶다면, `1200 × 630` 해상도의 이미지를 제공해야 합니다.   
이미지의 종횡비가 `1.91 : 1`과 다르면, 이미지가 조정 및 크롭됩니다.

이를 이해했다면, 이제 다음과 같이 이미지 속성을 설정할 수 있습니다:

```yaml
---
image:
  path: /path/to/image
  alt: image alternative text
---
```
`media_subpath`는 미리보기 이미지에도 적용할 수 있으며,   
이 값이 설정되어 있다면 `path`에는 이미지 파일 이름만 적으면 됩니다.

단순하게 사용하고 싶다면, 다음처럼 `image` 한 줄만 사용할 수도 있습니다:

```yaml
---
image: /path/to/image
---
```

#### LQIP

Preview 이미지용:
  
```yaml
---
image:
  lqip: /path/to/lqip-file # or base64 URI
---
```
> "[Text and Typography](https://chirpy.cotes.page/posts/text-and-typography/)" 게시물의 미리보기 이미지에서 LQIP가 어떻게 작동하는지 확인할 수 있습니다.

일반 이미지용:
  
```markdown
![Image description](/path/to/image){: lqip="/path/to/lqip-file" }
```


### Sodial Media Platforms

소셜 미디어 플랫폼의 비디오/오디오를 다음 구문을 사용하여 임베드할 수 있습니다:

```liquid
{% include embed/{Platform}.html id='{ID}' %}
```

여기서 `Platform`은 플랫폼 이름의 소문자이며, `ID`는 비디오 ID입니다.

아래 표는 특정 비디오/오디오 URL에서 필요한 두 가지 매개변수를 얻는 방법을 보여주며, 현재 지원되는 비디오 플랫폼도 확인할 수 있습니다.

| Video URL                                                                                                                      | Platform   | ID                       |
| ------------------------------------------------------------------------------------------------------------------------------ | ---------- | ------------------------ |
| [https://www.**youtube**.com/watch?v=**H-B46URT4mg**](https://www.youtube.com/watch?v=H-B46URT4mg)                             | `youtube`  | `H-B46URT4mg`            |
| [https://www.**twitch**.tv/videos/**1634779211**](https://www.twitch.tv/videos/1634779211)                                     | `twitch`   | `1634779211`             |
| [https://www.**bilibili**.com/video/**BV1Q44y1B7Wf**](https://www.bilibili.com/video/BV1Q44y1B7Wf)                             | `bilibili` | `BV1Q44y1B7Wf`           |
| [https://www.open.**spotify**.com/track/**3OuMIIFP5TxM8tLXMWYPGV**](https://www.open.spotify.com/track/3OuMIIFP5TxM8tLXMWYPGV) | `spotify`  | `3OuMIIFP5TxM8tLXMWYPGV` |


Spotify는 몇 가지 추가 매개변수를 지원합니다:

- `compact` - 컴팩트 플레이어를 표시합니다.   
  (예: `{% include embed/spotify.html id='3OuMIIFP5TxM8tLXMWYPGV' compact=1 %}`)

- `dark` - 다크 테마를 강제로 적용합니다   
(예: `{% include embed/spotify.html id='3OuMIIFP5TxM8tLXMWYPGV' dark=1 %}`)

### Video Files

비디오 파일을 직접 임베드하려면 다음 구문을 사용합니다:

```liquid
{% include embed/video.html src='{URL}' %}
```

여기서 `URL`은 비디오 파일의 URL입니다. 예: `/path/to/sample/video.mp4`

또한, 임베드된 비디오 파일에 대해 추가 속성을 지정할 수 있습니다. 허용되는 속성의 전체 목록은 다음과 같습니다:

- `poster='/path/to/poster.png'` - 비디오가 다운로드되는 동안 표시되는 포스터 이미지
- `title='Text'` - 비디오 아래에 표시되며 이미지와 동일한 형태의 제목
- `autoplay=true` - 가능한 빨리 자동 재생
- `loop=true` - 비디오 종료 시 자동으로 처음으로 돌아감
- `muted=true` - 오디오가 처음에 음소거된 상태로 시작
- `types` - 추가 비디오 포맷의 확장자를 `|`로 구분하여 지정 (해당 파일들은 기본 비디오 파일과 같은 디렉터리에 있어야 함)

전체 설정을 사용한 예시는 다음과 같습니다:

```liquid
{%
  include embed/video.html
  src='/path/to/video.mp4'
  types='ogg|mov'
  poster='poster.png'
  title='Demo video'
  autoplay=true
  loop=true
  muted=true
%}
```


### Audio Files

오디오 파일을 직접 임베드하려면 다음 구문을 사용합니다:

```liquid
{% include embed/audio.html src='{URL}' %}
```

여기서 `URL`은 오디오 파일의 URL입니다. 예: `/path/to/audio.mp3`

또한, 임베드된 오디오 파일에 추가 속성을 지정할 수도 있습니다. 허용되는 속성 목록은 다음과 같습니다:

- `title='Text'` - 오디오 아래에 표시되며 이미지와 비슷한 형태의 제목
- `types` - 추가 오디오 포맷의 확장자를 `|`로 구분하여 지정 (해당 파일들은 기본 오디오 파일과 같은 디렉터리에 있어야 함)

전체 설정을 사용한 예시는 다음과 같습니다:

```liquid
{%
  include embed/audio.html
  src='/path/to/audio.mp3'
  types='ogg|wav|aac'
  title='Demo audio'
%}
```


## Pinned Posts

홈 페이지 상단에 하나 이상의 게시물을 고정할 수 있으며, 고정된 게시물은 발행일을 기준으로 역순으로 정렬됩니다. 아래와 같이 활성화합니다:

```yaml
---
pin: true
---
```

---

## Prompts

프롬프트에는 `tip`, `info`, `warning`, `danger` 등 여러 종류가 있습니다. 이러한 프롬프트는 `blockquote`에 `prompt-{type}` 클래스를 추가하여 생성할 수 있습니다.

예를 들어, info 타입의 프롬프트는 다음과 같이 정의합니다:

```markdown
> Example line for prompt.
{: .prompt-info }
```


## Syntax

### Inline Code
```markdown
`inline code part`
```

### Filepath Highlight

```markdown
`/path/to/a/file.extend`{: .filepath}
```

---

## Code Block

마크다운의 ```` ``` ```` 기호만으로 아래와 같이 손쉽게 코드 블록을 만들 수 있습니다:

````md
```
This is a plaintext code snippet.
```
````


### Specifying Language

Using ```{language} you will get a code block with syntax highlight:

````markdown
```yaml
key: value
```
````

> Jekyll 태그 `{% highlight %}` 는 이 테마와 호환되지 않습니다.
{: .prompt-danger}


### Line Number

기본적으로 `plaintext`, `console`, `terminal`을 제외한 모든 언어는 줄 번호(line numbers)가 표시됩니다.   
코드 블록에서 줄 번호를 숨기고 싶다면 다음과 같이 `nolineno` 클래스를 추가하세요:

````markdown
```shell
echo 'No more line numbers!'
```
{: .nolineno }
````


### Specifying the Filename

코드 블록 상단에 기본적으로 언어명이 표시됩니다.
이를 파일 이름으로 바꾸고 싶다면 `file` 속성을 추가하면 됩니다:

````markdown
```shell
# content
```
{: file="path/to/file" }
````


### Liquid Codes

**Liquid** 코드 스니펫을 그대로 화면에 표시하려면, Liquid 코드를 `{% raw %}` 와 `{% endraw %}` 로 감싸면 됩니다:

````markdown
{% raw %}
```liquid
{% if product.title contains 'Pack' %}
  This product's title contains the word Pack.
{% endif %}
```
{% endraw %}
````

또는 게시물의 YAML 블록에 `render_with_liquid: false`(Jekyll 4.0 이상 필요)를 추가하는 방법도 있습니다.



## Mathematics

수학 표현은 [**MathJax**](https://www.mathjax.org/)로 렌더링합니다. 웹사이트 성능상의 이유로, 수학 기능은 기본적으로 로드되지 않습니다.   
하지만 다음과 같이 활성화할 수 있습니다:

```yaml
---
math: true
---
```

수학 기능을 활성화하면, 다음 문법으로 수식을 추가할 수 있습니다:

- **블록 수식(block math)**은 `$$ math $$` 로 작성하며, `$$` 앞뒤에는 반드시 **빈 줄이 있어야 합니다.**

  - **번호가 매겨진 방정식**을 넣으려면 `$$\begin{equation} math \end{equation}$$` 형태로 작성합니다.

  - **방정식 번호**를 참조하려면, 방정식 블록 안에 `\label{eq:label_name}` 을 작성하고, 본문에서는 `\eqref{eq:label_name}` 로 참조합니다(아래 예시 참고).

- **인라인 수식**(한 줄 내)은 `$$ math $$` 형태로 작성하며 앞뒤에 **빈 줄이 없어야 합니다.**

- **목록 안의 인라인 수식**은 `\$$ math $$` 처럼 `$`를 이스케이프하여 작성합니다.


```markdown
<!-- Block math, keep all blank lines -->

$$
LaTeX_math_expression
$$

<!-- Equation numbering, keep all blank lines  -->

$$
\begin{equation}
  LaTeX_math_expression
  \label{eq:label_name}
\end{equation}
$$

Can be referenced as \eqref{eq:label_name}.

<!-- Inline math in lines, NO blank lines -->

"Lorem ipsum dolor sit amet, $$ LaTeX_math_expression $$ consectetur adipiscing elit."

<!-- Inline math in lists, escape the first `$` -->

1. \$$ LaTeX_math_expression $$
2. \$$ LaTeX_math_expression $$
3. \$$ LaTeX_math_expression $$
```

> **MathJax** `v7.0.0`부터는 설정 옵션이 **assets/js/data/mathjax.js** 파일로 이동했습니다.   
> 필요에 따라 옵션 ([Extentions](https://docs.mathjax.org/en/latest/input/tex/extensions/index.html))을 변경할 수 있습니다.
> 
> 사이트를 `chirpy-starter`로 빌드하는 경우, `bundle info --path jekyll-theme-chirpy` 명령으로 gem 설치 경로를 확인한 뒤, 해당 파일을 저장소의 동일한 디렉터리에 복사하세요.
{: .prompt-tip}



## Mermaid


[**Mermaid**](https://github.com/mermaid-js/mermaid)는 훌륭한 다이어그램 생성 도구입니다.   
게시물에서 Mermaid를 사용하려면 YAML 블록에 다음을 추가합니다:

```yaml
---
mermaid: true
---
```

그 다음, 다른 마크다운 언어처럼, 그래프 코드를 `｀｀｀mermaid` 와 `｀｀｀` 로 감싸 사용하면 됩니다.


## Learn More

Jekyll 게시물에 대해 더 알고 싶다면, [Jekyll Docs: Posts](https://jekyllrb.com/docs/posts/) 문서를 참고하세요.
