'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ContactSchema = new Schema({
	agentID: {
		type: mongoose.Schema.Types.ObjectId
	},
	customerID: {
		type: mongoose.Schema.Types.ObjectId
	}, 
	contactType: {
		type: String
	}
});

mongoose.model('Contact', ContactSchema);