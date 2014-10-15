'use strict';

var _ = require('lodash'),
	mongoose = require('mongoose'),
	crm_services = require('../CRM/crm_services.js');

exports.createCustomer = function(agentID, customerInfo, callback) {
	crm_services.createCustomer(agentID, customerInfo, function(customer) {
		callback(customer);
	});
};

exports.deleteCustomer = function(agentID, customerID, callback) {
	crm_services.deleteCustomer(agentID, customerID, function() {
		callback();
	});
};

exports.createContact= function(agentID, customerID, contactType, callback) {
	crm_services.createContact(agentID, customerID, contactType, function() {
		callback();
	});
};

exports.getCustomers = function(agentID, callback) {
	crm_services.getCustomers(agentID, function(customers) {
		callback(customers);
	});
};

exports.getCustomer = function(customerID, callback) {
	crm_services.getCustomer(customerID, function(customer) {
		callback(customer);
	});
};

exports.getContactHistory = function(agentID, customerID, callback) {
	crm_services.getContactHistory(agentID, customerID, function(contactHistory) {
		callback(contactHistory);
	});
};

exports.createAgent = function(agentInfo, callback) {
	crm_services.createAgent(agentInfo, function(agent) {
		callback(agent);
	});
};

exports.deleteAgent = function(agentID, callback) {
	crm_services.deleteAgent(agentID, function() {
		callback();
	});
};

exports.getAgent = function(agentID, callback) {
	crm_services.getAgent(agentID, function(agent) {
		callback(agent);
	});
};

exports.getAgents = function(callback, callback) {
	console.log('facade called');
	crm_services.getAgents(function(agents) {
		console.log(agents);
		callback(agents);
	});
};
