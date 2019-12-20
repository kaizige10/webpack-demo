const path = require('path')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: {
        main: './src/react.js',
        // other: './src/otherReact.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].js',
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
    optimization: {
        splitChunks: {
            chunks: 'all', // 同步initial，异步async，所有模块用all
            // minSize: 30000,
            // maxSize: 0,
            // minChunks: 1,
            // maxAsyncRequests: 5,
            // maxInitialRequests: 3,
            // automaticNameDelimiter: '@',
            // name: true,
            // cacheGroups: {
            //     react: {
            //         test: /react|react-dom/,
            //         name: 'react',
            //         priority: 4
            //     },
            //     lodash: {
            //         test: /lodash/,
            //         name: 'lodash',
            //         priority: 4
            //     },
            //     default: {
            //         minChunks: 1,
            //         priority: -20,
            //         reuseExistingChunk: true,
            //         name: 'vendor'
            //     }
            // }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name]_[contenthash:5].css',
            chunkFilename: 'css/[id].css'
        }),
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