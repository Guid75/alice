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
		formation : {
			type: Schema.Types.ObjectId,
		//	type: String,
			ref: 'Formation'
		}
	},
	options: {
		lean: false
	}
};
