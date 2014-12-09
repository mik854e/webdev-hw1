'use strict';

var _ = require('lodash'),
	mongoose = require('mongoose'),
	crm_services = require('../CRM/crm_services.js');

exports.getAgent = function(agentID, callback) {
	crm_services.getAgent(agentID, callback);
};

exports.getContactHistory = function(agentID, customerID, page_num, callback) {
	crm_services.getContactHistory(agentID, customerID, page_num, callback);
};

exports.getFullContactHistory = function(agentID, customerID, callback) {
	crm_services.getFullContactHistory(agentID, customerID, callback);
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

exports.getCustomerCount = function(agentID, callback){
	crm_services.getCustomerCount(agentID, callback);
};