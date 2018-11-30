 const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

const srcPath = path.join(__dirname, './src')
const distPath = path.join(__dirname, './dist')

const webpackConfig = {
    entry: {
        kss: [path.join(srcPath, './kss.js')]
    },
    output: {
        path: distPath,
        publicPath: './',
        library: 'kscreenshot',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, srcPath)
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif|ico|svg|woff)$/,
                loader: 'url-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    }
}

module.exports = webpackConfig