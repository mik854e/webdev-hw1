'use strict';

var agentDS = require('../data_services/agentDS.js');
var contactDS = require('../data_services/contactDS.js');
var customerDS = require('../data_services/customerDS.js');
var _ = require('lodash'),
	mongoose = require('mongoose'),
	Contact = mongoose.model('Contact'),
	Customer = mongoose.model('Customer'),
	Agent = mongoose.model('Agent');
var limit = 2;

// Agent
exports.createAgent = function(agentInfo, callback) {
	agentDS.createAgent(agentInfo, callback);
};

exports.deleteAgent = function(agentID, callback) {
	console.log('delete agent in crm called');
	agentDS.deleteAgent(agentID, function(err){
		callback();
	});
};

exports.getAgent = function(agentID, callback){
	agentDS.getAgent(agentID, callback);
};

exports.getAgentByEmail = function(email, password, callback){
	agentDS.getAgentByEmail(email, password, callback);
};

exports.getAgents = function(callback){
	agentDS.getAgents(function(agents) {
		console.log(agents);
		callback(agents);
	});
};

exports.getAgentsPaginated = function(pageNum, callback){
	var skip = (pageNum-1)*limit;
	agentDS.getAgentsPaginated(limit, skip, function(agents) {
		console.log(agents);
		callback(agents);
	});
};


exports.updateAgent = function(agent, newInfo, callback){
	console.log('update agent in crm called');
	agentDS.updateAgent(agent, newInfo, callback);
	/*
	agentDS.updateAgent(function (agent, newInfo) {
		console.log(agent);
		callback(agent, newInfo);
	});
*/
};

// Contact
exports.createContact = function(contactInfo, callback) {
	contactDS.createContact(contactInfo, callback);
};

exports.deleteContact = function(callback){
	console.log('delete contact in crm called');
	contactDS.deleteContact(function (agent) {
		console.log(agent);
		callback(agent);
	});
};

exports.getContact = function(callback){
	console.log('get Contanct in crm called');
	contactDS.getContact(function(contact) {
		console.log(contact);
		callback(contact);
	});
};

exports.getContactHistory = function(agentID, customerID, callback){
	contactDS.getContactHistory(agentID, customerID, callback);
};

exports.updateContact = function(contact, newInfo, callback){
	console.log('update contact in crm called');
	contactDS.updateContact(function (contact, newInfo) {
		console.log(contact);
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
	console.log('customer info ' + customerInfo.firstName);
	agentDS.getAgentState(customerInfo.agentID, function(agent_state){		
		agentDS.getAgentCustomerCount(customerInfo.agentID, function(agent_count){
			if( (agent_state !== 'TX') || (agent_state !== 'NY') ){
				console.log('Count: ' +agent_count);
				if(agent_count <= 5){
					console.log('customer Added');
					customerDS.createCustomer(customerInfo, callback);
					agentDS.updateCustomerCount(customerInfo.agentID, agent_count+1,function(new_count){});
				}else {
					//alert('ERROR: Exceeded customer limit. Cannot add customer to agent');
					console.log('ERROR: Exceeded customer limit. Cannot add customer to agent');
				}
			}else{
				console.log('customer Added');
				console.log('customer info');
				customerDS.createCustomer(customerInfo, callback);
				agentDS.updateCustomerCount(customerInfo.agentID, agent_count + 1 ,function(new_count){});
			}
		});
	});
};

exports.deleteCustomer = function(customerID, callback){
	console.log('create customer in crm called');
	customerDS.deleteCustomer(customerID, function() {
		callback();
	});
};

exports.getCustomer = function(customerID, callback){
	customerDS.getCustomer(customerID, callback);
};

exports.getCustomerByEmail = function(email, password, callback) {
	customerDS.getCustomerByEmail(email, password, callback);
};

exports.getCustomers = function(agentID, callback) {
	console.log('get customers in crm called');
	customerDS.getCustomers(agentID, function(customers) {
		callback(customers);
	});
};

exports.updateCustomer = function(customerID, newInfo, callback){
	console.log('update a customer in crm called');
	customerDS.updateCustomer(customerID, newInfo, callback);
	/*
	customerDS.updateCustomer(function(customerID, newInfo) {
		console.log(customerID);
		callback(customerID, newInfo);
	});
*/
};
