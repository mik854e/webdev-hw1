'use strict';

var mongoose = require('mongoose'),
	random = require('mongoose-simple-random'),
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
	password: {
		type: String,
		trim: true,
		default: ''
	}, 

	phoneNumber: {
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

	state:{
		type: String
	},

	customer_count: {
		type: Number
	}
	  
});

AgentSchema.plugin(random);
mongoose.model('Agent', AgentSchema);