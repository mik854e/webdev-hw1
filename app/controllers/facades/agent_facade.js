'use strict';

var _ = require('lodash'),
	mongoose = require('mongoose'),
	crm_services = require('../CRM/crm_services.js');

exports.createCustomer = function(agentID, customerInfo) {
	crm_services.createCustomer(agentID, customerInfo);
};

exports.deleteCustomer = function(agentID, customerID) {
	crm_services.deleteCustomer(agentID, customerID);
};

exports.createContact= function(agentID, customerID, contactType) {
	crm_services.createContact(agentID, customerID, contactType);
};

exports.getCustomers = function(agentID) {
	return crm_services.getCustomers(agentID);
};

exports.getCustomer = function(agentID, customerID) {
	return crm_services.getCustomer(agentID, customerID);
};

exports.getContactHistory = function(agentID, customerID) {
	return crm_services.getContactHistory(agentID, customerID);
};

exports.createAgent = function(agentInfo) {
	crm_services.createAgent(agentInfo);
};

exports.deleteAgent = function(agentID) {
	crm_services.deleteAgent(agentID);
};

exports.getAgent = function(agentID) {
	return crm_services.getAgent(agentID);
};

exports.getAgents = function() {
	return crm_services.getAgents();
};
