'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var nodeModulesDir = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app', 'index.js');

var config = {
    devtool: 'eval',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        mainPath
    ],
    output: {
        path: buildPath,
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.tpl.html',
            inject: 'body',
            filename: 'index.html',
            favicon: path.resolve(__dirname, 'app', 'favicon.ico')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
            loaders: ['babel'],
            include: path.join(__dirname, 'app'),
            exclude: nodeModulesDir
        }, {
            test: /\.scss$/,
            loader: "style!css!sass?outputStyle=expanded&includePaths[]=" + nodeModulesDir + "/bootstrap-sass/assets/stylesheets/"
        }, {
            test: /\.css?$/,
            loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
        }, {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=100000'
        }
        ],
        noParse: []
    }
};

module.exports = config;
