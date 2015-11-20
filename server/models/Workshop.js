'use strict';

var Schema = require('mongoose').Schema;

module.exports = {
	schema: {
        title: {
            type: String
        },
		teacher: {
			type: Schema.Types.ObjectId,
			ref: 'Teacher'
		}
	},
	options: {
		lean: false
	}
};
