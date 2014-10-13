'use strict';

var _ = require('lodash'),
	mongoose = require('mongoose'),
	customer_facade = require('./facades/customer_facade.js');

exports.getAgent = function(req, res, customerID) {
	var customer = customer_facade.getCustomer(customerID);
	var agentID = customer.agentID;
	var agent = customer_facade.getAgent(agentID);
	var contactHistory = customer_facade.getContactHistory(agentID, customerID);

	res.render('customerhome', {
		agent: agent,
		contactHistory: contactHistory
	});
};