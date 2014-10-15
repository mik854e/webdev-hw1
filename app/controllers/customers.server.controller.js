'use strict';

var _ = require('lodash'),
	mongoose = require('mongoose'),
	customer_facade = require('./facades/customer_facade.js');

exports.getAgent = function(req, res, customerID) {
	customer_facade.getCustomer(customerID, function(err, customer) {
		var agentID = customer.agentID;
		customer_facade.getAgent(agentID, function(err, agent) {
			customer_facade.getContactHistory(agentID, customerID, function(err, contactHistory) {
				res.render('customerhome', {
					agent: agent,
					contactHistory: contactHistory
				});
			});
		});
	});
};