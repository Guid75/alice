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
		},
        timeslots: [
            {
                first: Date,
                last: Date
            }
        ]
	},
	options: {
		lean: false
	}
};
