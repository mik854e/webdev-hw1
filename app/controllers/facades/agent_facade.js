'use strict';

var _ = require('lodash'),
	mongoose = require('mongoose'),
	crm_services = require('../CRM/crm_services.js');

exports.createCustomer = function(customerInfo, callback) {
	crm_services.createCustomer(customerInfo, callback);
};

exports.deleteCustomer = function(customerID, callback) {
	crm_services.deleteCustomer(customerID, function() {
		callback();
	});
};

exports.getCustomers = function(agentID, callback) {
	crm_services.getCustomers(agentID, function(customers) {
		callback(customers);
	});
};

exports.getCustomer = function(customerID, callback) {
	crm_services.getCustomer(customerID, callback);
};

exports.getContactHistory = function(agentID, customerID, callback) {
	crm_services.getContactHistory(agentID, customerID, callback);
};

exports.createContact = function(contactInfo, callback) {
	crm_services.createContact(contactInfo, callback);
};


exports.deleteContact = function(contactID, callback) {
	crm_services.deleteContact(contactID, function() {
		callback();
	});
};


exports.createAgent = function(agentInfo, callback) {
	crm_services.createAgent(agentInfo, callback);
};

exports.deleteAgent = function(agentID, callback) {
	crm_services.deleteAgent(agentID, function() {
		callback();
	});
};

exports.getAgent = function(agentID, callback) {
	crm_services.getAgent(agentID, callback);
};

exports.getAgentByEmail = function(email, password, callback) {
	crm_services.getAgentByEmail(email, password, callback);
};

exports.getAgents = function(callback) {
	crm_services.getAgents(function(agents) {
		callback(agents);
	});
};

exports.getAgentsPaginated = function(pageNum, callback) {
	crm_services.getAgentsPaginated(pageNum, function(agents) {
		callback(agents);
	});
};

exports.updateAgent = function(agentID, agentInfo, callback){
	crm_services.updateAgent(agentID, agentInfo, callback);
};

exports.updateCustomer = function(agentID, customerID, newInfo, callback){
	crm_services.updateCustomer(agentID, customerID, newInfo, callback);
};



