const merge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
    DllReferencePlugin,
    HotModuleReplacementPlugin
} = require('webpack')
const baseConfig = require('./webpack.base.js')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

const devConfig = {
    mode: "development",
    devtool: 'cheap-module-eval-source-map',
    // devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, "./dist"),
        open: true,
        port: 8081,
        proxy: {
            '/api': {
                target: 'http://localhost:3000'
            }
        },
        hot: true,
        hotOnly: true,
    },
    optimization: {
        usedExports: true, // 将确认使用的代码进行导出，不使用的代码不进行导出
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '凯子歌的网站',
            template: './index.html',
            filename: 'index.html',
        }),
        new HotModuleReplacementPlugin(),
        new DllReferencePlugin({
            manifest: require('./dll/react-manifest.json')
        }),
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, './dll/react.dll.js')
        })
    ],
}

module.exports = devConfig