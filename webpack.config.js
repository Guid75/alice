'use strict';

var webpack = require('webpack');
var path = require('path');
var nodeModulesDir = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app', 'main.js');

var deps = [
  'react/dist/react.min.js'
];

var config = {
    devtool: 'eval',
    entry: {
        app: [
            'webpack/hot/dev-server',
            // The script refreshing the browser on none hot updates
            'webpack-dev-server/client?http://localhost:8080',
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
    resolve: {
        alias: {
            'react/lib': path.resolve(nodeModulesDir, 'react/lib')
        }
    },
    module: {
        loaders: [{
            test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, 'app'),
            exclude: nodeModulesDir
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }],
        noParse: []
    }
};

deps.forEach(function (dep) {
  var depPath = path.resolve(nodeModulesDir, dep);
  config.resolve.alias[dep.split(path.sep)[0]] = depPath;
  config.module.noParse.push(depPath);
});

module.exports = config;
