var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var nodeModulesDir = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'dist');
var mainPath = path.resolve(__dirname, 'app', 'index.js');

var config = {
    // We change to normal source mapping
    devtool: 'source-map',
    entry: mainPath,
    output: {
        path: buildPath,
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new HtmlWebpackPlugin({
            template: 'app/index.tpl.html',
            inject: 'body',
            filename: 'index.html',
            favicon: path.resolve(__dirname, 'app', 'favicon.ico')
        }),
        new ExtractTextPlugin('[name]-[hash].min.css')
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel?optional=es7.decorators',
            exclude: [nodeModulesDir]
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style', 'css!postcss!sass?outputStyle=expanded&includePaths[]=' + nodeModulesDir + '/bootstrap-sass/assets/stylesheets/')
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss')
        }, {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=100000'
        }]
    },
    postcss: [
        require('autoprefixer')
    ]
};

module.exports = config;
