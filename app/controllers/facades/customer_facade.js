'use strict';

var _ = require('lodash'),
	mongoose = require('mongoose'),
	crm_services = require('../CRM/crm_services.js');

exports.getAgent = function(agentID) {
	crm_services.getAgent(agentID, function(agent) {
		callback(agent);
	}

exports.getContactHistory = function(agentID, customerID) {
	crm_services.getContactHistory(agentID, customerID, function(contacts) {
		callback(contacts);
	});
};

exports.getCustomer = function(customerID) {
	crm_services.getCustomer(customerID, function(customer) {
		callback(customer);
	});
};