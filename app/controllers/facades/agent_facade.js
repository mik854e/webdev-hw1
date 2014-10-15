'use strict';

var _ = require('lodash'),
	mongoose = require('mongoose'),
	crm_services = require('../CRM/crm_services.js');

exports.createCustomer = function(agentID, customerInfo) {
	crm_services.createCustomer(agentID, customerInfo, function(customer) {
		callback(customer);
	});
};

exports.deleteCustomer = function(agentID, customerID) {
	crm_services.deleteCustomer(agentID, customerID, function() {
		callback();
	});
};

exports.createContact= function(agentID, customerID, contactType) {
	crm_services.createContact(agentID, customerID, contactType, function() {
		callback();
	});
};

exports.getCustomers = function(agentID) {
	crm_services.getCustomers(agentID, function(customers) {
		callback(customers);
	});
};

exports.getCustomer = function(customerID) {
	crm_services.getCustomer(customerID, function(customer) {
		callback(customer);
	});
};

exports.getContactHistory = function(agentID, customerID) {
	crm_services.getContactHistory(agentID, customerID, function(contactHistory) {
		callback(contactHistory);
	});
};

exports.createAgent = function(agentInfo) {
	crm_services.createAgent(agentInfo, function(agent) {
		callback(agent);
	});
};

exports.deleteAgent = function(agentID) {
	crm_services.deleteAgent(agentID, function() {
		callback();
	});
};

exports.getAgent = function(agentID) {
	crm_services.getAgent(agentID, function(agent) {
		callback(agent);
	});
};

exports.getAgents = function(callback) {
	console.log('facade called');
	crm_services.getAgents(function(agents) {
		console.log(agents);
		callback(agents);
	});
};
