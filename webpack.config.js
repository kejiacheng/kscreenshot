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
        libraryTarget: 'umd'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif|ico|svg|woff)$/,
                loader: 'url-loader'
            }
        ]
    },
    // plugins: [
    //      new HtmlWebpackPlugin(
    //          {
    //              template: path.join(demoPath, './index.html'),
    //              filename: 'index.html',
    //              inject: 'body',
    //              chunks: ['test']
    //          }
    //      ),
    //      new CopyWebpackPlugin(
    //         [
    //           {
    //             from: path.join(__dirname, './src/assets'),
    //             to: path.join(__dirname, `./dist/assets`)
    //           }
    //         ]
    //       )
    // ]
}

module.exports = webpackConfig