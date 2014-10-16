'use strict';

var agentDS = require('../data_services/agentDS.js');
var contactDS = require('../data_services/contactDS.js');
var customerDS = require('../data_services/customerDS.js');
var _ = require('lodash'),
	// errorHandler = require('errors'),
	mongoose = require('mongoose'),
	Contact = mongoose.model('Contact'),
	Customer = mongoose.model('Customer'),
	Agent = mongoose.model('Agent');


// Relationship between Customer and Agent
var create_Relationship = function(agentID, customerID, callback){
	Customer.update( 
		{ _id: customerID }, 
		{
			$set: {
				agentID: agentID
			}
		}
	);

	console.log('create new relationship');
};


// // Establishes Relationship between Agent and Customer
exports.createRelationship = function(agentID, customerID) {
	console.log('delete relationship');
	create_Relationship( agentID, customerID, function(callback){
		console.log('delete relationship');
		callback(agentID, customerID);
	});

	//res.render('agents', {
	//	consumers: _getConsumersForAgent(agentId)
	//});

};

var delete_Relationship = function(agentID, customerID, callback){
	Agent.update(
		{_id: agentID},
		{
			$pull: {
				customers: customerID
			}
			
		}
	);

	Customer.update(
		{_id: customerID},
		{
			$unset: {
				agent: agentID
			}
		}
	);
	console.log('deleted relationship');
};

// Deletes relationship between Agent and Cusomter
exports.deleteRelationship = function(agentID, customerID, callback){
	console.log('delete relationship');
	delete_Relationship( agentID, customerID, function(callback){
		console.log('delete relationship');
		callback(agentID, customerID, callback);
	});
	
};


var updateContact = function(agentID, customerID, contactType){
	console.log('create new contact interaction');
	Contact.update(
		{$and: 
			[{_agentId: agentID}, 
			{_customerId: customerID}]
		},
		{
			$addToSet: {
				contactType: contactType
			}
		}
	);
};

// // Establishes link between Agent and Customer for contact interaction
// // ContactType: Email, Phone, 
exports.createContactInteraction = function(agentID, customerID, contactType, callback){
	console.log('create contact interaction');
	updateContact(agentID, customerID, contactType, function(callback){
		console.log('contact interaction');
		callback(agentID, customerID, contactType);
	});
};

exports.getContactHistory = function(agentID, customerID, callback){
	contactDS.getContactHistory(agentID, customerID, callback);
};

// Agent
exports.createAgent = function(agentInfo, callback) {
	agentDS.createAgent(agentInfo, callback);
};

exports.deleteAgent = function(callback){
	console.log('delete agent in crm called');
	agentDS.deleteAgent(function(agent){
		console.log(agent);
		callback(agent);
	});
};

exports.getAgent = function(agentID, callback){
	agentDS.getAgent(agentID, callback);
};

exports.getAgentByEmail = function(email, callback){
	agentDS.getAgentByEmail(email, callback);
};

exports.getAgents = function(callback){
	console.log('get agents in crm called');
	agentDS.getAgents(function(agents) {
		console.log(agents);
		callback(agents);
	});
};

exports.updateAgent = function(agent, newInfo, callback){
	console.log('update agent in crm called');
	agentDS.updateAgent(function (agent, newInfo) {
		console.log(agent);
		callback(agent, newInfo);
	});
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

exports.updateContact = function(contact, newInfo, callback){
	console.log('update contact in crm called');
	contactDS.updateContact(function (contact, newInfo) {
		console.log(contact);
		callback(contact, newInfo);
	});
};


// Customer
exports.createCustomer = function(customerInfo, callback) {
	customerDS.createCustomer(customerInfo, callback);
};

exports.deleteCustomer = function(callback){
	console.log('create customer in crm called');
	customerDS.deleteCustomer(function (customer) {
		console.log(customer);
		callback(customer);
	});
};

exports.getCustomer = function(customerID, callback){
	customerDS.getCustomer(customerID, callback);
};

exports.getCustomerByEmail = function(email, callback) {
	customerDS.getCustomerByEmail(email, callback);
};

exports.getCustomers = function(agentID, callback) {
	console.log('get customers in crm called');
	customerDS.getCustomers(agentID, function(customers) {
		callback(customers);
	});
};

exports.updateCustomer = function(customer, newInfo, callback){
	console.log('update a customer in crm called');
	customerDS.getCustomer(function(customer, newInfo) {
		console.log(customer);
		callback(customer, newInfo);
	});
};
