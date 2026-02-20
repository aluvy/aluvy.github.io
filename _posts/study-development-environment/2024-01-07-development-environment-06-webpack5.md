---
title: "[프론트엔드 개발환경의 이해] 06. webpack5"
date: 2024-01-07 01:06:00 +0900
categories: [Study, 프론트엔드 개발환경의 이해]
tags: []
render_with_liquid: false
math: true
mermaid: true
---

프론트엔드 개발환경의 이해 강의를 듣고 최신 스펙인 webpack5로 다시 환경설정을 해봤다.

## 1. NPM
### 1-2. 프로젝트 생성

vs code로 프로젝트 폴더를 열고 터미널을 이용해 프로젝트를 생성한다.

````shell
$ npm init
````

옵션은 전부 엔터로 넘겨도 된다.   
루트에 package.json 파일이 생성된다.



## 2. webpack5
### 2-1. webpack & webpack-cli 세팅

터미널을 이용해 webpack과 webpack-cli 패키지를 설치한다.

````shell
$ npm i -D webpack webpack-cli
````

루트에 webpack.config.js 파일을 생성한 후 아래와 같이 세팅한다.

````js
const path = require('path');

const mode = process.env.NODE_ENV || "development";
// const isDev = mode.includes("dev");
const isPro = mode.includes("pro");

module.exports = {
  mode,
  entry: {
    main: './src/app.js',
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    assetModuleFilename: "[path][hash][ext][query]",
    clean: true,
  },
}
````
{: file="webpack.config.js"}

package.json 파일에 script 부분을 세팅한다.

````json
{
  "scripts": {
    "build": "webpack --progress",
  },
}
````
{: file="package.json"}



### 2-2. loader 세팅
자주 사용하는 style-loader, css-loader, file-loader, url-loader 를 설치한다.

````shell
$ npm i -D style-loader css-loader file-loader url-loader sass-loader sass
````

webpack.config.js 파일에 로더 설정을 추가한다.

````js
const webpack = require("webpack");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(css|scss)$/i,
        exclude: /node_modules/,
        use: [
          isPro
          ? MiniCSSExtractPlugin.loader : "style-loader", // loader는 loader설정까지 한 후에 제대로 동작한다.
          {
            loader: "css-loader",
            options: {
              url: true,
              esModule: false
            }
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        loader: "url-loader",
        dependency: { not: ["url"] },
        options: {
          name: "[path][name].[ext]?[hash]",
          limit: 1000, // 1kb
        },
      },
    ],
  },
}
````
{: file="webpack.config.js"}


### 2-3. plugin 세팅
자주 사용하는 html-webpack-plugin, mini-css-extract-plugin 을 설치한다.

````shell
$ npm i -D html-webpack-plugin mini-css-extract-plugin
````

webpack.config.js 파일에 plugin 설정을 추가한다.

````js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [
    new webpack.BannerPlugin({
      banner: `Build Date: ${new Date().toLocaleString()}`,
      // entryOnly: true,
    }),
    new webpack.DefinePlugin({
      MODE: JSON.stringify(process.env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        env: isPro ? "" : "(개발용)",
      },
      minify: isPro
        ? {
            collapseWhitespace: true,
            removeComments: true,
          }
        : false,
    }),
    ...(isPro
      ? [
          new MiniCSSExtractPlugin({
            linkType: false,
            filename: "[name].css",
            chunkFilename: "[name].chunk.css",
          }),
        ]
      : []),
  ],
}
````
{: file="webpack.config.js"}

HtmlWebpackPlugin()을 설정하면   
index.html 파일에 development 모드와 production 모드를 나눠 표시할 수 있다.

````html
<!-- ejs 문법 -->
<title>Document<%= env %></title>
````
{: file="src/index.html"}

package.json 파일에 script 부분을 세팅한다.

````json
{
  "scripts": {
    "start": "NODE_ENV=production webpack-dev-server --progress",
    "build-pro": "NODE_ENV=production webpack --progress",
    "build": "NODE_ENV=development webpack --progress",
  },
}
````
{: file="package.json"}

> window에서 환경변수 NODE_ENV 를 사용하려면 win-node-env 패키지를 설치하면 된다.   
> cmd 를 관리자 권한으로 실행한 후 `$ npm i -g win-node-env`
{: .prompt-tip}


## 3. babel
babel 패키지 및 loader를 설치한다.

````shell
$ npm i -D @babel/core @babel/cli @babel/preset-env babel-loader core-js
````

루트에 babel.config.json 파일을 생성하고 polyfill을 포함하여 세팅한다.

````json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry",
        "corejs": "3.22"
      }
    ]
  ]
}
````
{: file="babel.config.json"}

webpack.config.js에 babel-loader 설정을 추가한다.

````js
const webpack = require("webpack");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
    ],
  },
}
````
{: file="webpack.config.js"}

## 4. esLint & Prettier
esLint와 Prettier, eslint-config-prettier, eslint-plugin-prettier 패키지를 설치한다.

````shell
$ npm i -D esLint Prettier eslint-config-prettier eslint-plugin-prettier
````

eslint init을 실행 한다.

````shell
$ npx eslint --init
````

여러 질문들이 나오는데, 모두 설정하고 나면 루트에 .eslintrc가 생성된다.

- Hou would you like to use ESLint ? \| **problems**{: .fc-primary}
- What type of modules does your project use? \| **esm**{: .fc-primary}
- Which frasmework does your project use? \| **none**{: .fc-primary}
- Does your project use TypeScript? \| **No**{: .fc-primary}
- Where does your code run? \| browser
- What format do you want your config file to be in ? \| **JavaScript**{: .fc-primary}
- Would you like to install them now? \| **Yes**{: .fc-primary}
- Which package manager do you want to use ? \| **npm**{: .fc-primary}

````json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
  },
  "extends": ["eslint:recommended", "plugin:prettier/recommended"],
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
  }
}
````
{: file=".eslintrc"}

## 5. 웹팩 개발 서버
webpack-dev-server 패키지를 설치한다.

````shell
$ npm i -D webpack-dev-server
````

````json
{
  "scripts": {
    "start": "webpack-dev-server --progress"
  }
}
$ npm start
````
{: file="package.json"}


````js
module.exports = {
  devServer: {
    client: {
      overlay: true,
      progress: true,
      reconnect: false,
      logging: "error",
    },
    static: {
      directory: path.join(__dirname, "dist"),
      publicPath: "/",
    },
    hot: true,
    proxy: {
      "/api": "http://localhost:8081",
    },
  },
}
````
{: file="webpack.config.js"}



## 6. 목업 API

_이 부분은 devServer.before 문법 변경으로 업데이트 예정이다._

````js
module.exports = {
  devServer: {
    before: app => {
      res.get("/api/users/", (req, res) => {
        res.json([
          { id: 1, name: "Alice" },
          { id: 2, name: "Bek" },
          { id: 3, name: "Chris" },
        ])
      }
    }
  }
}
````
{: file="webpack.config.js"}

````shell
$ curl localhost:8080/api/users
> [{ id: 1, name: "Alice" }, { id: 2, name: "Bek" }, { id: 3, name: "Chris" }]
````



### 6-1. axios & connect-api-mocker
axios & connect-api-mocker 패키지를 설치한다.   
webpack.config.js에 devServer.before 에서 만들었던 JSON을 별도의 파일로 분리하여 관리할 수 있다. 

````shell
$ npm i axios connect-api-mocker
````

mocks 폴더안에 폴더를 만든 후, 메소드명(GET)으로 json파일을 생성한다.

````json
[
  { "id": 1, "name": "Alice" },
  { "id": 2, "name": "Bek" },
  { "id": 3, "name": "Chris" },
  { "id": 4, "name": "Daniel" },
]
````
{: file="/mocks/api/users/GET.json"}


````js
const apiMocker = require("connect-api-mocker");

module.exports = {
  devServer: {
    before: app => {
      app.use(apiMocker("/api", "mocks/api"));
    }
  },
}
````
{: file="webpack.config.js"}

````js
import axios from 'axios';

document.addEventListener('DOMContentLoaded', async ()=>{
  const res = await axios.get('/api/users');
  console.log(res);

  document.body.innerHTML = (res.data || []).map(user => {
    return `<div>${user.id}: ${user.name}</div>`;
  }).join('');
})
````
{: file="src/app.js"}


### 6-2. CORS policy error
실제 API 연동 시 CORS policy error를 해결하기 위한 방법


#### 6-2-1. server 측 해결방법

````js
app.get("/api/keywords",(req, res)=>{
  res.header("Access-Control-Allow-Origin", "*");  // 헤더를 춛가한다
  res.json(keywords);
})
````
{: file="server/index.js"}


#### 6-2-2. 프론트엔드 측 해결방법

````js
module.exports = {
  devServer: {
    proxy: {
      "/api": "http://localhost:8081",  // 프록시, /api로 요청이 오면 http://localhost:8081로 요청하라는 뜻(?)
    }
  },
}
````
{: file="webpack.config.js"}

api 요청 예

````js
const model = {
  async get() {
    // const { data } = await axios.get("http://localhost:8081/api/keyworkds");
    
    const { data } = await axios.get("/api/keywords");
    return data;
  }
}
````
{: file="src.model.js"}



## 7. Hot loading
### 7-1. HMR 옵션 설정
Hot Module Replacement : 변경한 화면만 재로딩 시킨다.

핫 로딩을 기본적으로 지원하는 로더

- style-loader
- file-loader

````js
module.exports = {
  devServer: {
    hot: true,
  },
}
````
{: file="webpack.config.js"}


### 7-2. HMR 인터페이스 설정

HMR 기능을 제대로 사용하려면 인터페이스를 맞춰야한다.

````js
import form from "./form";
import result from "./result";

let resultEl;
let formEl;

document.addEventListener('DOMContentLoaded', async ()=>{
  formEl = document.createElement("div");
  formEl.innerHTML = form.render();
  document.body.appendChild(formEl);

  resultEl = document.createElement("div");
  resultEl.innerHTML = await result.render();
  document.body.appendChild(resultEl);
});

if (module.hot) {
  console.log('핫 모듈 켜짐');

  module.hot.accept("./result", async ()=>{
    console.log("result 모듈 변경 됨");
    resultEl.innerHTML = await result.render();
  });
  
  module.hot.accept("./form", ()=>{
    console.log("form 모듈 변경 됨");
    formEl.innerHTML = form.render();
  });
}
````
{: file="/src/app.js"}




## 8. 최적화

- **mode: development**   
  디버깅 편의를 위해 아래 두 개 플러그인을 사용한다.
  - NamedChunksPlugin
  - NamedModulesPlugin

- **mode: production**   
  자바스크립트 결과물을 최소화 하기 위해 다음 일곱 개의 플러그인을 사용한다.
  - FlagDependencyUsagePlugin
  - FlagIncludedChunksPlugin
  - ModuleConcatenationPlugin
  - NoEmitOnErrorsPlugin
  - OccurrenceOrderPlugin
  - SideEffectsFlagPlugin
  - TerserPlugin


### 8-1. 외부 환경 설정에 따라 mode 변경하기

````js
const mode = process.env.NODE_ENV || "development";

module.exports = {
  mode,
}
````
{: file="webpack.config.js"} 

````json
"scripts": {
  "build-pro": "NODE_ENV=production webpack --progress",
  "build": "NODE_ENV=development webpack --progress",
}
````
{: file="package.json"}


### 8-2. CSS, JS 난독화
**terser-webpack-plugin**   
**css-minimizer-webpack-plugin**

과거에는 css-minimizer-webpack-plugin 패키지를 썼는데, webpack5부터는 css-minimizer-webpack-plugin이 사용

패키지를 설치한다.

````shell
$ npm i -D css-minimizer-webpack-plugin terser-webpack-plugin
````

````js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  optimization: {
    minimize: isPro ? true : false,
    minimizer: isPro
      ? [
          new CssMinimizerPlugin(),
          new TerserPlugin({
            terserOptions: {
              format: {
                comments: false,
              },
            },
            extractComments: false,
          }),
        ]
      : [],
  },
}
````
{: file="webpack.config.js"}


### 8-3. 코드 스플리팅
아래와 같이 세팅한 후 빌드하면 ./dist/ 폴더에 main.js와 result.js 2개 파일이 생성된다.   
optimization.splitChunks 옵션을 추가하면 vendors-main-result.js라는 파일이 생기는데 이곳에 중복 코드가 들어가게 된다.

````js
module.exports = {
  entry: {
    main: "./src/app.js",
    result: "./src/result.js",
  },
  optimization: {
    splitChunks: {
      chunks: "all" // 중복코드 제거
    }
  },
}
````
{: file="webpack.config.js"}


### 8-4. 다이나믹 임포트
코드 스플리팅의 자동화   
빌드 시 주석 `/* webpackChunkName: "result" */` 에 지정한 파일 명으로 중복코드 파일이 생성된다. (vendors-result.js)

````js
// import result from "./result";

document.addEventListener('DOMContentLoaded', async ()=>{
  import(/* webpackChunkName: "result" */"./result.js").then(async m => {
    const result = m.default;
    resultEl = document.createElement("div");
    resultEl.innerHTML = await result.render();
    document.body.appendChild(resultEl);
  })
});
````
{: file="src/app.js"}


````js
module.exports = {
  entry: {
    main: "./src/app.js",
    // result: "./src/result.js",  // 스플리팅 코드는 필요없다.
  },
  optimization: {
    minimizer: mode === "production" ? [
      new OptimizeCSSAssetsPlugin(),
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          }
        }
      })
    ] : [],
    // splitChunks: {
    //   chunks: "all" // 중복코드 제거. // 스플리팅 코드는 필요없다.
    // }
  },
}
````
{: file="webpack.config.js"}


### 8-5. Externals

빌드 시 필요없는 파일을 제외한다.

copy-webpack-plugin 패키지를 설치한다.

````shell
$ npm i copy-webpack-plugin
````

````js
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
   plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "./node_modules/axios/dist/axios.min.js",
          to: "./axios.min.js",
        },
      ],
    }),
  ],
  externals: {
    axios: "axios",
  },
}
````
{: file="webpack.config.js"}

- **externals**: axios 모듈을 사용하는 곳이 있으면 전역변수 axios를 사용하는 것으로 간주 하라는 의미이다.
- **CopyPlugin**: 복사해갈 라이브러리의 위치와 복사할 위치를 설정한다.

````html
<script type="text/javascript" src="axios.min.js"></script>
````
{: file="src/index.html"}


## 9. 기타
### 6-1. husky: git hook 설정
패키지를 설치한다.

````shell
$ npm i -D husky
````

````json
"husky": {
  "hooks": {
    "pre-commit": "eslint dist/src/app.js --fix"
  }
}
````
{: file="package.json"}

이렇게 설정하면 git commit 직전에 lint가 수행되고 코드가 수정된다.   
error가 나면 commit에 실패하게 된다.



### 6-2. lint-staged: 변경된 파일에 대해서만 lint 수행
패키지를 설치한다.

````shell
$ npm i -D lint-staged
````

````json
{
  "lint-staged": {
    "*.js": "eslint --fix"
  }
}
````
{: file="package.json"}



### 6-3. vs code ESLint Extention

vs code에 ESLint Extention을 설치하면 자동으로 .eslintrc 파일에 설정한데로 읽고 검사한다.

![alt text](/assets/images/posts/study/development-environment/06-01.png)

에디터 설정 중 저장 시 자동 포멧팅

````json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
  }
}
````
{: file=".vscode/settings.json"}

### 6-4. node server 빌드 한 dist 폴더를 서버로 돌리기

````js
// app.use(morgan("dev")); // 아래
app.use(express.static(path.join(__dirname, "../dist")));
````
{: file="server/index.js"}


---
<br>

##### 참고

- [aluvy \| github](https://github.com/aluvy/lecture-frontend-dev-env-practice)
- [github \| jeonghwan-kim](https://github.com/jeonghwan-kim/lecture-frontend-dev-env)
- [webpack.kr](https://webpack.kr/)
