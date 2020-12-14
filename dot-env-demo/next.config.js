const Dotenv = require("dotenv-webpack");
// npm i @zeit/next-less less // antd.less 를 활용해 보려고 하였으나 실패하여 관련 코드는 commented out
// const withLess = require("@zeit/next-less"); 

let config = {
    webpack: (config) => {
      // 기존의 웹팩 플러그인에 새로운 Dotenv플러그인을 연결시켜준다.
      // silent는 옵션은 .env파일을 찾지 못했을 때 에러를 일으키지 않도록 설정해주는 옵션이다.
      config.plugins.push(new Dotenv({ silent: true }));
  
      return config;
    }
};

// config = withLess({
//   ...config,
//   lessLoaderOptions: {
//     javascriptEnabled: true,
//   },
// })

module.exports = config;