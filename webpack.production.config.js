var Webpack = require('webpack');
var path = require('path');
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
  module: {
      loaders: [{
          test: /\.jsx?$/,
          loader: 'babel',
          exclude: [nodeModulesDir]
      }, {
          test: /\.scss$/,
          loader: "style!css!sass?outputStyle=expanded&includePaths[]=" + nodeModulesDir + "/bootstrap-sass/assets/stylesheets/"
      }, {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader?limit=100000'
      }]
  }
};

module.exports = config;
