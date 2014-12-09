'use strict';

var agentDS = require('../data_services/agentDS.js');
var contactDS = require('../data_services/contactDS.js');
var customerDS = require('../data_services/customerDS.js');
var _ = require('lodash'),
	mongoose = require('mongoose'),
	Contact = mongoose.model('Contact'),
	Customer = mongoose.model('Customer'),
	Agent = mongoose.model('Agent');

var OBJ_LIMIT = 5;

var validateParams = function(params, model) {
	var fields = model.schema.paths;
	var validated_params = {};
	var p, p_new;

	for (var param in params) {
		// Process comparisons
		// Convert < queries to mongo form if valid.
		p_new = {};
		if (param.indexOf('<') > -1) {
			p = param.split('<');
			if (p.length === 2 && p[0] in fields && fields[p[0]].instance === 'Number' && !isNaN(Number(p[1]))) {
				p_new[p[0]] = {$lt: Number(p[1])};
				validated_params[p[0]] = {$lt: Number(p[1])};
			}
		}
		// Convert > queries to mongo form if valid.
		else if (param.indexOf('>') > -1) {
			p = param.split('>');
			if (p.length === 2 && p[0] in fields && fields[p[0]] === 'Number' && !isNaN(Number(p[1]))) {
				p_new[p[0]] = {$gt: Number(p[1])};
				validated_params[p[0]] = {$gt: Number(p[1])} ;		
			}
		}
		// Validate other queries.
		else if (param in fields) {
			if (fields[param] === 'Number' && !isNaN(Number(params[param]))) {
				p_new[param] = params[param];
				validated_params[param] = params[param];
			}
			else {
				p_new[param] = params[param];
				validated_params[param] = params[param];
			}
		}
	}

	return validated_params;
};

// Agent
exports.createAgent = function(agentInfo, callback) {
	agentDS.createAgent(agentInfo, callback);
};

exports.deleteAgent = function(agentID, callback) {
	agentDS.deleteAgent(agentID, function(err) {
		callback();
	});
};

exports.getAgent = function(agentID, callback) {
	agentDS.getAgent(agentID, callback);
};

exports.getRandomAgent = function(callback) {
	agentDS.getRandomAgent(callback);
};

exports.getAgentByEmail = function(email, password, callback) {
	agentDS.getAgentByEmail(email, password, callback);
};

exports.getAgents = function(page_num, params, callback) {
	var skip = (page_num-1)*OBJ_LIMIT;
	params = validateParams(params, Agent);
	agentDS.getAgents(OBJ_LIMIT, skip, params, callback);
};

exports.updateAgent = function(agent, newInfo, callback) {
	agentDS.updateAgent(agent, newInfo, callback);
};

// Contact
exports.createContact = function(contactInfo, callback) {
	contactDS.createContact(contactInfo, callback);
};

exports.deleteContact = function(callback) {
	contactDS.deleteContact(function (agent) {
		callback(agent);
	});
};

exports.getContact = function(callback) {
	contactDS.getContact(function(contact) {
		callback(contact);
	});
};

exports.getContactHistory = function(agentID, customerID, page_num, callback) {
	var skip = (page_num-1)*OBJ_LIMIT;
	contactDS.getContactHistory(agentID, customerID, OBJ_LIMIT, skip, callback);
};

exports.getFullContactHistory = function(agentID, customerID, params, callback) {
	if (agentID)
		params.agentID = agentID;
	if (customerID)
		params.customerID = customerID;

	params = validateParams(params, Contact);
	contactDS.getFullContactHistory(params, callback);
};

exports.updateContact = function(contact, newInfo, callback) {
	contactDS.updateContact(function (contact, newInfo) {
		callback(contact, newInfo);
	});
};

exports.deleteContact = function(contactID, callback) {
	contactDS.deleteContact(contactID, function() {
		callback();
	});
};

// Customer
exports.createCustomer = function(customerInfo, callback) {
	customerDS.createCustomer(customerInfo, callback);
};

exports.getCustomerCount = function(agentID, callback){
	customerDS.getCustomerCount(agentID, callback);
};

exports.deleteCustomer = function(customerID, callback) {
	customerDS.deleteCustomer(customerID, function() {
		callback();
	});
};

exports.getCustomer = function(customerID, callback) {
	customerDS.getCustomer(customerID, callback);
};

exports.getCustomerByEmail = function(email, password, callback) {
	customerDS.getCustomerByEmail(email, password, callback);
};

exports.getCustomers = function(agentID, page_num, params, callback) {
	var skip = (page_num-1)*OBJ_LIMIT;
	if (agentID)
		params.agentID = agentID;
	params = validateParams(params, Customer);
	customerDS.getCustomers(OBJ_LIMIT, skip, params, callback);
};

exports.updateCustomer = function(customerID, newInfo, callback) {
	customerDS.updateCustomer(customerID, newInfo, callback);
};

exports.getAgentState = function(agentID, callback){
	agentDS.getAgentState(agentID, callback);
};

exports.searchCustomers = function(agentID, query, callback) {
	var regex = new RegExp('.*' + query + '.*', 'i');
	customerDS.searchCustomersByName(agentID, regex, callback);
};

