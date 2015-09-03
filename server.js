var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var models = require('./server/models');
var format = require('util').format;

var httpProxy, proxy, bundle;

var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? 8080 : 3001;
var publicPath = path.resolve(__dirname, 'public');

var login = process.env.ALICE_DB_LOGIN;
var password = process.env.ALICE_DB_PASSWORD;
var db_url = process.env.ALICE_DB_URL;

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());

app.use(models);

mongoose.connect(format('mongodb://%s:%s@%s', login, password, db_url));

// We only want to run the workflow when not in production
if (!isProduction) {
    httpProxy = require('http-proxy');
    proxy = httpProxy.createProxyServer();

  // We require the bundler inside the if block because
  // it is only needed in a development environment. Later
  // you will see why this is a good idea
  bundle = require('./server/bundle.js');
  bundle();

  // Any requests to localhost:3000/build is proxied
  // to webpack-dev-server
  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    });
  });

  // It is important to catch any errors from the proxy or the
  // server will crash. An example of this is connecting to the
  // server when webpack is bundling
  proxy.on('error', function(e) {
    console.log('Could not connect to proxy, please try again...');
  });
}

app.listen(process.env.PORT || port, function () {
  console.log('Server running on port ' + port);
});
