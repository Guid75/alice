'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {
	schema: {
		firstName: {
			type: String
		},
		lastName: {
			type: String
		},
		formation: {
			type: Schema.Types.ObjectId,
			ref: 'Formation'
		}
	},
	options: {
		lean: false
	}
};
