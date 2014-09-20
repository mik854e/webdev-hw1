'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var validateRole = function(role) {
	return ((role == 'consumer') || (role == 'agent'))
};

var PersonSchema = new Schema({
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
	role: {
		type: String,
		validate: [validateRole, 'Either consumer or agent']
	},
	phoneNumber: {
		type: String
	}
});

mongoose.model('Person', personSchema);