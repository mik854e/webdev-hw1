'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ContactSchema = new Schema({
	agentID: {
		type: String
	},
	customerID: {
		type: String
	}, 
	contactType: {
		type: String
	},
	summary : {
		type: String
	},
	timestamp: {
		type: Date
	}
});

mongoose.model('Contact', ContactSchema);