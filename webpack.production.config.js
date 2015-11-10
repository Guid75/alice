var Webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var nodeModulesDir = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
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
      new ExtractTextPlugin('[name]-[hash].min.css')
  ],
  module: {
      loaders: [{
          test: /\.jsx?$/,
          loader: 'babel',
          exclude: [nodeModulesDir]
      }, {
          test: /\.scss$/,
          loader: "style!css!sass?outputStyle=expanded&includePaths[]=" + nodeModulesDir + "/bootstrap-sass/assets/stylesheets/"
      }, {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss')
      }, {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader?limit=100000'
      }]
  }
};

module.exports = config;
