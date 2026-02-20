---
title: "[JavaScript] webpack.config.js"
date: 2024-01-26 13:48:00 +0900
categories: [JavaScript, JavaScript-basic]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

## 웹팩의 4가지 주요 속성

웹팩의 빌드(파일 변환) 과정을 이해하기 위해서는 아래 4가지 주요 속성에 대해 알고 있어야 합니다.

- entry
- output
- loader (module)
- plugin

## mode

주요 속성은 아니지만 한번 짚고 간다.

````js
module.exports = {
  mode: 'none',  // production, development, none
}
````

## entry

`entry` 속성은 웹팩에서 웹 자원을 변환하기 위해 필요한 최초 진입점이자 자바스크립트 파일 경로입니다.

````js
module.exports = {
  entry: './src/index.js'
}
````

위 코드는 웹팩을 실행했을 때 `src` 폴더 밑의 `index.js` 을 대상으로 웹팩이 빌드를 수행하는 코드입니다.


### entry 파일에는 어떤 내용이 들어가야 하나?

`entry` 속성에 지정된 파일에는 웹 어플리케이션의 전반적인 구조와 내용이 담겨져 있어야 합니다. 웹팩이 해당 파일을 가지고 웹 어플리케이션에서 사용되는 모듈들의 연관 관계를 이해하고 분석하기 때문에 어플리케이션을 동작시킬 수 있는 내용들이 담겨져 있어야 합니다.

예를 들어, 블로그 서비스를 웹팩으로 빌드한다고 했을 때의 코드 모양은 아래와 같을 수 있습니다.

````js
import LoginView from './LoginView.js';
import HomeView from './HomeView.js';
import PostView from './PostView.js';

function initApp() {
  LoginView.init();
  HomeView.init();
  PostView.init();
}

initApp();
````
{: file="index.js"}

위 코드는 해당 서비스가 싱글 페이지 어플리케이션이라고 가정하고 작성한 코드입니다. 사용자의 로그인 화면, 로그인 후 진입하는 메인 화면, 그리고 게시글을 작성하는 화면 등 웹 서비스에 필요한 화면들이 모두 `index.js` 파일에서 불러져 사용되고 있기 때문에 웹팩을 실행하면 해당 파일들의 내용까지 해석하여 파일을 빌드해줄 것입니다.

이렇게 모듈 간의 의존 관계가 생기는 구조를 **디펜던시 그래프(Dependency Graph)**{: .fc-primary}라고 합니다.


### entry 유형

앞에서 살펴본 것처럼 엔트리 포인트는 1개가 될 수도 있지만 여러 개가 될 수 도 있습니다.

````js
entry: {
  login: './src/LoginView.js',
  main: './src/MainView.js'
}
````

위와 같이 엔트리 포인트를 분리하는 경우는 싱글 페이지 어플리케이션이 아닌 특정 페이지로 진입했을 때 서버에서 해당 정보를 내려주는 형태의 멀티 페이지 어필르케이션에 적합합니다.




## output

`output` 속성은 웹팩을 돌리고 난 결과물의 파일 경로를 의미합니다.

````js
module.exports = {
  output: {
    filename: 'bundle.js'
  }
}
````

앞에서 배운 `entry` 속성과는 다르게 객체 형태로 옵션들을 추가해야 합니다.



### output 속성 옵션 형태

최소한 `filename` 은 지정해줘야 하며 일반적으로 아래와 같이 `path` 속성을 함께 정의합니다.

````js
var path = require('path');

module.exports = {
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist/')
  }
}
````

여기서 `filename` 속성은 웹팩으로 빌드한 파일의 이름을 의미하고, `path` 속성은 해당 파일의 경로를 의미합니다. 그리고 `path` 속성에서 사용된 `path.resolve()` 코드는 인자로 넘어온 경로들을 조합하여 유효한 파일 경로를 만들어주는 Node.js API 입니다.

이 API가 하는 역할을 좀 더 이해하기 쉽게 표현하면 아래와 같스빈다.

````js
output: './dist/bundle.js'
````

위 코드에서 사용한 path 라이브러리의 자세한 사용법은 여기를 참고하세요.



### output 파일 이름 옵션

앞에서 살펴본 `filename` 속성에 여러 가지 옵션을 넣을 수 있습니다.


1. 결과 파일 이름에 `entry` 속성을 포함하는 옵션

    ````js
    module.exports = {
      output: {
        filename: '[name].bundle.js'
      }
    }
    ````

2. 결과 파일 이름에 웹팩 내부적으로 사용하는 모듈 ID를 포함하는 옵션

    ````js
    module.exports = {
      output: {
        filename: '[id].bundle.js'
      }
    }
    ````
 

3. 매 빌드시 마다 고유 해시 값을 붙이는 옵션

    ````js
    module.exports = {
      output: {
        filename: '[name].[hash].bundle.js'
      }
    }
    ````

4. 웹팩의 각 모듈 내용을 기준으로 생성된 해시 값을 붙이는 옵션

    ````js
    module.exports = {
      output: {
        filename: '[chunkhash].bundle.js'
      }
    }
    ````
 

이렇게 생성된 결과 파일의 이름에는 각각 엔트리 이름, 모듈 아이디, 해시 값 등이 포함됩니다.




## loader

`loader`는 웹팩이 웹 어플리케이션을 해석할 때 자바스크립트 파일이 아닌 웹 자원 (HTML, CSS, Image, 폰트 등)들을 변환할 수 있도록 도와주는 속성입니다.

````js
module.exports = {
  module: {
    rules: []
  }
}
````

entry나 output 속성과는 다르게 `module` 이라는 이름을 사용합니다.


### loader가 필요한 이유

웹팩으로 어플리케이션을 빌드할 때 만약 아래와 같은 코드가 있다고 해보겠습니다.

````js
import './common.css';

console.log('css loaded');
````
{: file="app.js"}

````css
p { color: blue }
````
{: file="common.css"}

````js
module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  }
}
````
{: file="webpack.config.js"}
 
위 파일을 웹팩으로 빌드하게 되면 아래와 같은 에러가 발생합니다.

![alt text](/assets/images/posts/2024/01/26/webpack-config-01.png)
_https://joshua1988.github.io/webpack-guide/concepts/loader.html#loader-필요한-이유_

위 에러 메시지의 의미는 `app.js` 파일에서 임포트한 `common.css` 파일을 해석하기 위해 적절한 로더를 추가해 달라는 것입니다.


### CSS loader 적용하기

이 때 해당 폴더에 아래의 npm 명령어로 CSS 로더를 설치하고 웹팩 설정 파일 설정을 바꿔주면 에러를 해결할 수 있습니다.

````shell
$ npm i -D css-loader
````

````js
module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['css-loader']
      }
    ]
  }
}
````

위 module 쪽 코드를 보면 `rules` 배열에 객체 한 쌍을 추가했습니다. 그리고 그 객체에는 2개의 속성이 들어가 있는데 각각 아래와 같은 역할을 합니다.

- `test` : 로더를 적용할 파일 유형 (일반적으로 정규식 표현 사용)
- `use` : 해당 파일에 적용할 로더의 이름




### 자주 사용되는 로더 종류

앞에서 살펴본 CSS 로더 이외에도 실제 서비스를 만들 때 자주 사용되는 로더의 종류는 다음과 같습니다.

- babel-loader
- sass-loader
- file-loader
- vue-loader
- ts-loader

로더를 여러 개 사용하는 경우에는 아래와 같이 `rules` 배열에 로더 옵션을 추가해주면 됩니다.

````js
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' },
      // ...
    ]
  }
}
````




### 로더 적용 순서

특정 파일에 대해 여러 개의 로더를 사용하는 경우 로더가 적용되는 순서에 주의해야 합니다. 로더는 기본적으로 오른쪽에서 왼쪽 순으로 적용됩니다.

CSS의 확장 문법은 SCSS 파일에 로더를 적용하는 예시를 보겠습니다.

````js
module: {
  rules: [
    {
      test: /\.scss$/,
      use: ['css-loader', 'sass-loader']
    }
  ]
}
````

위 코드는 scss 파일에 대해 먼저 sass-loader로 전처리 (scss 파일을 css로 변환)를 한 다음 웹팩에서 CSS 파일을 인식할 수 있게 css-loader 를 적용하는 코드입니다.

만약 웹팩으로 빌드한 자원으로 실행했을 때 해당 CSS 파일이 웹 어플리케이션 인라인 스타일 태그로 추가되는 것을 원한다면 아래와 같이 style-loader도 추가할 수 있습니다.

````js
{
  test: /\.scss$/,
  use: [ 'style-loader', 'css-loader', 'sass-loader' ]
}
````

그리고, 위와 같이 배열로 입력하는 대신 아래와 같이 옵션을 포함한 형태로도 입력할 수 있습니다.

````js
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: { modules: true }
        },
        { loader: 'sass-loader' }
      ]
    }
  ]
}
````



## plugin

`plugin`은 웹팩의 기본적인 동작에 추가적인 기능을 제공하는 속성입니다. 로더랑 비교하면 로더는 파일을 해석하고 변환하는 과정에 관여하는 반면, 플러그인은 해당 결과물의 형태를 바꾸는 역할을 한다고 보면 됩니다.

플러그인은 아래와 같이 선언합니다.

````js
module.exports = {
  plugins: []
}
````
 

플러그인의 배열에는 생성자 함수로 생성한 객체 인스턴스만 추가될 수 있습니다. 예를 들어보겠습니다.

````js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.ProgressPlugin()
  ]
}
````

위의 두 플러그인은 각각 아래와 같은 역할을 합니다.

- `HtmlWebpackPlugin` : 웹팩으로 빌드한 결과물로 HTML 파일을 생성해주는 플러그인
- `ProgressPlugin` : 웹팩의 빌드 진행률을 표시해주는 플러그인



### 자주 사용하는 플러그인

- split-chunks-plugin
- clean-webpack-plugin
- image-webpack-loader
- webpack-bundle-analyzer-plugin

## 정리

여태까지 살펴본 웹팩 4가지 주요 속성을 도식으로 나타내보면 다음과 같습니다.

![alt text](/assets/images/posts/2024/01/26/webpack-config-02.png)
_https://joshua1988.github.io/webpack-guide/concepts/wrapup.html#concepts-review_

위 도식을 보면서 지금까지 배운 내용을 종합해보겠습니다.

1. `entry` : 속성은 웹팩을 실행할 대상 파일. 진입점
2. `output` : 속성은 웹팩의 결과물에 대한 정보를 입력하는 속성. 일반적으로 filename 과 path를 정의
3. `loader` : 속성은 CSS, 이미지와 같은 비 자바스크립트 파일을 웹팩이 인식할 수 있게 추가하는 속성. 로더는 오른쪽에서 왼쪽 순으로 적용
4. `plugin` : 속성은 웹팩으로 변환한 파일에 추가적인 기능을 더하고 싶을 때 사용하는 속성. 웹팩 변환 과정 전반에 대한 제어권을 갖고 있음


### 그 밖의 속성들

````js
var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/', // cdn 배포 시 주소와 관련되어 있음
    filename: 'build.js',
  },
  // loader
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
        // css-loader로 css파일을 webpack(js)에 포함 후 vue-style-lodaer를 실행함
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {},
          // other vue-loader options go here
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/, // 제외폴더
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  // 웹팩으로 파일을 해석해나갈때 파일의 해석 방식을 정의함
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js', // vue$파일은 이 파일로 해석하겠다
    },
    extensions: ['*', '.js', '.vue', '.json'], // import { sum } from './math' 시 확장자 제외 옵션
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
  },
  // 결과물 크기에 관련하여 웹팩이 설정한 크기를 넘어갔을 때 경고를 주는. 성능 관련 된 힌트
  performance: {
    hints: false,
  },
  devtool: '#eval-source-map',
};

// webpack 3 에서 사용하던 옵션

// if (process.env.NODE_ENV === 'production') {
//   module.exports.devtool = '#source-map'
//   // http://vue-loader.vuejs.org/en/workflow/production.html
//   module.exports.plugins = (module.exports.plugins || []).concat([
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: '"production"'
//       }
//     }),
//     new webpack.optimize.UglifyJsPlugin({
//       sourceMap: true,
//       compress: {
//         warnings: false
//       }
//     }),
//     new webpack.LoaderOptionsPlugin({
//       minimize: true
//     })
//   ])
// }
````


---

<br>

##### 속성

- [캡틴판교 웹팩 핸드북](https://joshua1988.github.io/webpack-guide/concepts/overview.html)
