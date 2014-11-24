'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var CustomerSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		default: ''
	},
	lastName: {
		type: String,
		trim: true,
		default: ''
	}, 
	email: {
		type: String,
		trim: true,
		default: ''
	}, 
	password: {
		type: String,
		trim: true,
		default: ''
	}, 
	phoneNumber: {
		type: String
	},

	agentID: {
		type: String
	},

	street: {
		type: String
	},

	city: {
		type: String
	},

	zip: {
		type: Number
	},

	state: {
		type: String
	},

	update_timestamp: {
		type: Date
	}
});

mongoose.model('Customer', CustomerSchema);