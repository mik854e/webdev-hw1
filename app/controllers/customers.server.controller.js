'use strict';

var _ = require('lodash'),
	mongoose = require('mongoose'),
	customer_facade = require('./facades/customer_facade.js');

exports.getCustomer = function(req, res) {
	var email = req.body.email;
	console.log(email);

	customer_facade.getCustomerByEmail(email, function(customer) {
		var agentID = customer.agentID;
		var customerID = customer._id.toString();
		customer_facade.getAgent(agentID, function(agent) {
			customer_facade.getContactHistory(agentID, customerID, function(contactHistory) {
				res.render('customerhome', {
					agent: agent,
					contactHistory: contactHistory
				});
			});
		});
	});
};