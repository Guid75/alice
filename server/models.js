'use strict';

var fs = require('fs');
var util = require('util');
var path = require('path');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var restify = require('express-restify-mongoose');
var _ = require('lodash');

function loadModels() {
	fs.readdir('server/models', function (err, files) {
		files.forEach(function (file) {
			var schema;
			var model;
			var fileModule = require('./' + path.join('./models', file));
			var basename = path.basename(file, '.js');
			if (path.extname(file) !== '.js') {
				return;
			}

			schema = new Schema(fileModule.schema);
			if (fileModule.virtuals) {
				schema.set('toObject', { virtuals: true });
				_.forIn(fileModule.virtuals, function (func, key) {
					schema.virtual(key).get(func);
				});
			}

			if (!schema.options.toObject) {
				schema.options.toObject = {};
			}
			// we want "id" instead of "_id"
			schema.options.toObject.transform = function (doc, ret) {
				ret.id = ret._id;

				delete ret._id;
				delete ret.__v;
			};

			schema.post('save', function (doc) {
				console.log('%s has been saved', doc._id);
			});
			model = mongoose.model(basename, schema);
			if (global[basename]) {
				console.warn(util.format('The %s global variable name already exists, it has been smashed, you are exposed to serious undefined behaviour issues!'));
			}
			global[basename] = model;

			restify.serve(router, model, fileModule.options);
		});
	});
}

loadModels();

module.exports = router;
