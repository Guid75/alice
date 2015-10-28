var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var models = require('./server/models');
var format = require('util').format;

var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? 8080 : 3001;
var publicPath = path.resolve(__dirname, 'public');

var login = process.env.ALICE_DB_LOGIN;
var password = process.env.ALICE_DB_PASSWORD;
var db_url = process.env.ALICE_DB_URL;
var db_noauth = process.env.ALICE_DB_NOAUTH;
var complete_url; // with authentication

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());

app.use(models);

if (db_noauth) {
    complete_url = format('mongodb://@%s', db_url);
} else {
    complete_url = format('mongodb://%s:%s@%s', login, password, db_url);
}

mongoose.connect(format(complete_url), function (err) {
    if (err) {
        console.error(err);
    }

    Formation.findOne().populate('students').exec(function (err, d) {
        console.log(d);
    });
});

if (!isProduction) {
    // TODO move all the following instruction of the block to a specific dev file
    var webpack = require('webpack');
    var config = require('./webpack.config');
    var compiler = webpack(config);
    app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler));
}

app.listen(process.env.PORT || port, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:' + (process.env.PORT || port));
});
