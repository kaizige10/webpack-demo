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