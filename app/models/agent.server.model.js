'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var AgentSchema = new Schema({
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
	phoneNumber: {
		type: String
	},
	customers: {
		//IDs of customers
		type: Array
	}
});

mongoose.model('Agent', AgentSchema);