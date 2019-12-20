const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const PurgeCssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const path = require('path')
const baseConfig = require('./webpack.base.js')

const proConfig = {
    mode: "production",
    // devtool: 'cheap-module-source-map',
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: '凯子歌的网站',
            template: './index.html',
            filename: 'index.html',
            minify: {
                removeComments: true, // 移除注释
                collapseWhitespace: true, // 删除空白符和换行
                minifyCSS: true, // 压缩内联css
            }
        }),
        new OptimizeCSSPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                }
            }
        }),
        // new PurifyCss({
        //     paths: glob.sync([
        //         path.resolve(__dirname, './src/*.html'),
        //         path.resolve(__dirname, './src/*.js'),
        //     ])
        // })
        new PurgeCssPlugin({
            paths: glob.sync([
                path.resolve(__dirname, './index.html'),
                path.resolve(__dirname, './src/*.js')
            ])
        })
    ],
}

module.exports = proConfig