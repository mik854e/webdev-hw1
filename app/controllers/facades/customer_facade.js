'use strict';

var _ = require('lodash'),
	mongoose = require('mongoose'),
	crm_services = require('../CRM/crm_services.js');

exports.getAgent = function(agentID, callback) {
	crm_services.getAgent(agentID, function(agent) {
		callback(agent);
	});
};

exports.getContactHistory = function(agentID, customerID, callback) {
	crm_services.getContactHistory(agentID, customerID, function(contacts) {
		callback(contacts);
	});
};

exports.getCustomerByEmail = function(email, password, callback) {
	crm_services.getCustomerByEmail(email, password, callback);
};

exports.getCustomer = function(customerID, callback) {
	crm_services.getCustomer(customerID, callback);
};

exports.setRandomAgent = function(customerID, callback) {
	crm_services.getRandomAgent(function(agent) {
		var newInfo = {
			agentID: agent._id.toString()
		};
		crm_services.updateCustomer(customerID, newInfo, function() {
			callback(agent);
		});
	});
};
