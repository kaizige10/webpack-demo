const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    entry: {
        main: './src/react.js'
    },
    mode: "development",
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        // publicPath: 'http://localhost:3001/assets'
    },
    module: {
        rules: [{
            test: /\.css*/,
            include: path.resolve(__dirname, './src'),
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.less*/,
            include: path.resolve(__dirname, './src'),
            use: [
                // 'style-loader', 
                MiniCssExtractPlugin.loader,
                'css-loader', 'less-loader', 'postcss-loader'
            ]
        }, {
            test: /\.(png|jpg|gif)$/,
            include: path.resolve(__dirname, './src'),
            use: {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }
        }, {
            test: /\.js$/,
            include: path.resolve(__dirname, './src'),
            // exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            }
        }]
    },
    // devtool: 'cheap-module-eval-source-map',
    devtool: 'cheap-module-source-map',
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
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name]_[contenthash:5].css',
            chunkFilename: 'css/[id].css'
        }),
        new OptimizeCSSPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                }
            }
        })
    ],
    resolve: {
        modules: [path.resolve(__dirname, './node_modules/')],
        alias: {
            '@': path.resolve(__dirname, './src'),
            react: path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js')
        },
        extensions: ['.js']
    }
}