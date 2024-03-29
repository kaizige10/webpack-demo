const path = require('path')
const {
    DllPlugin
} = require('webpack')

module.exports = {
    mode: 'production',
    entry: {
        react: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, './dll'),
        filename: '[name].dll.js',
        library: 'react'
    },
    plugins: [
        new DllPlugin({
            path: path.resolve(__dirname, './dll', '[name]-manifest.json'),
            name: 'react'
        })
    ]
}