'use strict';

var _ = require('lodash'),
	mongoose = require('mongoose'),
	crm_services = require('../CRM/crm_services.js');

exports.getAgent = function(agentID) {
	return crm_services.getAgent(agentID);
};

exports.getContactHistory = function(agentID, customerID) {
	return crm_services.getContactHistory(agentID, customerID)
};

exports.getCustomer = function(customerID) {
	return crm_services.getCustomer(customerID)
};