'use strict';

var webpack = require('webpack');
var path = require('path');
var nodeModulesDir = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app', 'index.js');

// var deps = [
//     'react/dist/react.min.js'
// ];
//
var deps = [];
var config = {
    devtool: 'eval',
    entry: {
        app: [
            'webpack-hot-middleware/client',
            mainPath
        ]
    },
    output: {
        path: buildPath,
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    // resolve: {
    //     alias: {
    //         'react/lib': path.resolve(nodeModulesDir, 'react/lib')
    //     }
    // },
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

// deps.forEach(function (dep) {
//     var depPath = path.resolve(nodeModulesDir, dep);
//     config.resolve.alias[dep.split(path.sep)[0]] = depPath;
//     config.module.noParse.push(depPath);
// });

module.exports = config;
