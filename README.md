# webpack-demo
### webpack作业

使⽤外部变量区分模式

### 思路

- 在scripts中使用NODE_ENV=development形式传参
- 在webpack配置文件中读取NODE_ENV，根据参数判断使用哪个模式进行打包

### 使用方法

1. npm install安装依赖
2. npm run dll安装react动态链接库
3. npm run start:dev开发模式打包
4. npm run start:pro 生产模式打包

### 代码请参考

1. package.json

   ~~~json
     "scripts": {
       "dll": "webpack --config ./webpack.dll.config.js",
       "start:dev": "cross-env NODE_ENV=development webpack --config ./webpack.start.js",
       "start:pro": "cross-env NODE_ENV=production webpack --config ./webpack.start.js"
     },
   ~~~

   

2. webpack.start.js

   ~~~javascript
   const baseConfig = require('./webpack.base.js')
   const devConfig = require('./webpack.dev.js')
   const proConfig = require('./webpack.pro.js')
   const merge = require('webpack-merge')
   
   let mergeConfig;
   if (process.env.NODE_ENV === 'development') {
       mergeConfig = merge(baseConfig, devConfig)
   } else {
       mergeConfig = merge(baseConfig, proConfig)
   }
   module.exports = mergeConfig
   ~~~

   