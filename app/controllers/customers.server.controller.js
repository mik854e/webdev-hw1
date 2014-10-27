'use strict';

var _ = require('lodash'),
	mongoose = require('mongoose'),
	customer_facade = require('./facades/customer_facade.js');

exports.signInCustomer = function(req, res) {
	var email = req.body.email;
	var password = req.body.password;

	customer_facade.getCustomerByEmail(email, password, function(customer) {
		if (customer) {
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
		}
		else {
			res.render('signin');
		}
	});
};