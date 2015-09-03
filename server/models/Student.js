'use strict';

var _ = require('lodash');

module.exports = {
	schema: {
		firstName: {
			type: 'string'
		},
		lastName: {
			type: 'string'
		}
	},
	options: {
		lean: false
	}
};
