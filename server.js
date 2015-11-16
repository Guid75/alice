const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const format = require('util').format;

const models = require('./server/models');
const importRouter = require('./server/import');

const app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? 8080 : 3001;
var publicPath = path.resolve(__dirname, 'dist');

var login = process.env.ALICE_DB_LOGIN;
var password = process.env.ALICE_DB_PASSWORD;
var db_url = process.env.ALICE_DB_URL;
var db_noauth = process.env.ALICE_DB_NOAUTH;
var complete_url; // with authentication

app.use(favicon(__dirname + '/dist/favicon.ico'));
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());

app.use(models.router);
app.use(importRouter);

if (db_noauth) {
    complete_url = format('mongodb://@%s', db_url);
} else {
    complete_url = format('mongodb://%s:%s@%s', login, password, db_url);
}

mongoose.connect(format(complete_url), (err) => {
    if (err) {
        console.error(err);
    }
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

app.listen(process.env.PORT || port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:' + (process.env.PORT || port));
});
