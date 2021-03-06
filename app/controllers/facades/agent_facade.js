'use strict';

var _ = require('lodash'),
	mongoose = require('mongoose'),
	crm_services = require('../CRM/crm_services.js');

exports.createCustomer = function(customerInfo, callback) {
	crm_services.createCustomer(customerInfo, callback);
};

exports.deleteCustomer = function(customerID, callback) {
	crm_services.deleteCustomer(customerID, callback);
};

exports.getCustomers = function(agentID, page_num, params, callback) {
	crm_services.getCustomers(agentID, page_num, params, callback);
};

exports.getCustomer = function(customerID, callback) {
	crm_services.getCustomer(customerID, callback);
};

exports.searchCustomers = function(agentID, query, callback) {
	crm_services.searchCustomers(agentID, query, callback);
};

exports.getContactHistory = function(agentID, customerID, page_num, callback) {
	crm_services.getContactHistory(agentID, customerID, page_num, callback);
};

exports.getAllContacts = function(params, callback) {
	crm_services.getFullContactHistory(null, null, params, callback);
};

exports.createContact = function(contactInfo, callback) {
	crm_services.createContact(contactInfo, callback);
};

exports.deleteContact = function(contactID, callback) {
	crm_services.deleteContact(contactID, callback);
};

exports.createAgent = function(agentInfo, callback) {
	crm_services.createAgent(agentInfo, callback);
};

exports.deleteAgent = function(agentID, callback) {
	crm_services.deleteAgent(agentID, callback);
};

exports.getAgent = function(agentID, callback) {
	crm_services.getAgent(agentID, callback);
};

exports.getAgentByEmail = function(email, password, callback) {
	crm_services.getAgentByEmail(email, password, callback);
};

exports.getAgents = function(page_num, params, callback) {
	crm_services.getAgents(page_num, params, callback);
};

exports.updateAgent = function(agentID, agentInfo, callback){
	crm_services.updateAgent(agentID, agentInfo, callback);
};

exports.updateCustomer = function(agentID, customerID, newInfo, callback){
	crm_services.updateCustomer(agentID, customerID, newInfo, callback);
};

exports.getAgentState = function (agentID, callback){
	crm_services.getAgentState(agentID, callback);
};