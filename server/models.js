'use strict';

var fs = require('fs');
var format = require('util').format;
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

			model = mongoose.model(basename, schema);
			if (global[basename]) {
				console.warn(format('The %s global variable name already exists, it has been smashed, you are exposed to serious undefined behaviour issues!', basename));
			}
			global[basename] = model;

			restify.serve(router, model, fileModule.options);
		});
	});
}

loadModels();

function importFormationsFromCsvParsedArray(formationTitles) {
	let bulk;
	if (formationTitles.length === 0) {
		return Promise.resolve();
	}

	// create formations if not exist
	bulk = Formation.collection.initializeUnorderedBulkOp();
	formationTitles.forEach((title) => {
		bulk.find({ title }).upsert().replaceOne({
			title
		});
	});
	return bulk.execute();
}

function row2student(row, formations) {
	let student = {
		firstName: row[0],
		lastName: row[1]
	};
	function formationTitleToId(title) {
		return formations.find(formation => formation.title === title);
	}
	if (row.length >= 3) {
		student.formation = formationTitleToId(row[2])._id;
	}
	return student;
}

// serialize an array of BSON and replace the _id field with an "id" field
function BSONArrayToJSONArray(bsonArray) {
	return bsonArray.map(item => {
		let json = item.toJSON();
		json.id = json._id;
		delete json._id;
		return json;
	});
}

function importStudentsFromCsvParsedArray(arr) {
	const formationTitles = [];
	let upsertedFormationsIds;
	let insertedStudentsIds;
	let allNeededFormations;
	// get all formations to "upsert"
	arr.forEach((row) => {
		if (row.length >= 3) {
			formationTitles.push(row[2]);
		}
	});

	return importFormationsFromCsvParsedArray(formationTitles)
	.then(bulkResult => {
		upsertedFormationsIds = bulkResult.getUpsertedIds();
		// find all needed formations
		return Formation.find({ "$or": formationTitles.map(title => ({ title })) });
	})
	.then(formations => {
		let bulk;
		bulk = Student.collection.initializeUnorderedBulkOp();
		allNeededFormations = formations;
		arr.forEach(row => {
			bulk.insert(row2student(row, formations));
		});
		return bulk.execute();
	})
	.then(bulkResult => {
		// keep only ids
		insertedStudentsIds = bulkResult.getInsertedIds().map(item => ({ _id: item._id }));
		return Student.find({ "$or": insertedStudentsIds});
	})
	.then(students => {
		allNeededFormations = allNeededFormations.filter(formation => {
			return upsertedFormationsIds.find(id => {
				return id._id.equals(formation.id);
			 });
		});
		return {
			formations: BSONArrayToJSONArray(allNeededFormations),
			students: BSONArrayToJSONArray(students)
		}
	});
}

module.exports = {
	router,
	importStudentsFromCsvParsedArray
}
