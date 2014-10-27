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
	}
});

mongoose.model('Customer', CustomerSchema);