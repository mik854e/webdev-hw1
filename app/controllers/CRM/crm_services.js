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

// Establishes Relationship between Agent and Customer
exports.createRelationship = function(agentID, customerID) {
	console.log('delete relationship');
	create_Relationship( agentID, customerID, function(callback){
		console.log('delete relationship');
		callback(agentID, customerID);
	});
/*
	res.render('agents', {
		consumers: _getConsumersForAgent(agentId)
	});
*/
};

var create_Relationship = function(agentID, customerID, callback){
	Agent.update(
		{ _id: agentID }, 
		{ 
			$addToSet: {
				consumers: customerID
			}
			
		}
	);

	Customer.update( 
		{ _id: customerID }, 
		{
			$set: {
				agent: agentID
			}
		}
	);

	console.log('create new relationship');
}

// Deletes relationship between Agent and Cusomter
exports.deleteRelationship = function(agentID, customerID, callback){
	console.log('delete relationship');
	delete_Relationship( agentID, customerID, function(callback){
		console.log('delete relationship');
		callback(agentID, customerID, callback);
	});
	
};

var delate_Relationship = function(agentID, customerID, callback){
	Agent.update( function(agent)
		{_id: agentID},
		{
			$pull: {
				consumers: consumerID
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
}

// Establishes link between Agent and Customer for contact interaction
// ContactType: Email, Phone, 
exports.createContactInteraction = function(agentID, customerID, contactType, callback){
	console.log('create contact interaction');
	updateContact(agentID, customerID, contactType, function(callback){
		console.log('contact interaction');
		callback(agentID, customerID, contactType);
	});
	
};

var updateContact = function(agentID, customerID, contactType){
	console.log('create new contact interaction');
	Contact.update(
		$and [{_agentId: agentID}, {_customerId: customerID}],
		{
			$addToSet: {
				contactType: contactType
			}
		}
	);
}



exports.contactHistory = function(agentID,, customerID, callback){
	console.log('get contact history');
	getContactHistory(agentID, customerID, function(contact){
		console.log('get contact history between')
		console.log(agentID);
		console.log(customerID);
		callback(agentID, customerID);
	});
};

var getContactHistory = function(agentID, customerID, callback){
	console.log('get contact history in crm call');
	Contact.find( {agentID: agentId, customerID: customerID}, function(err, contact){
		callback(contact);
});

// Agent
exports.createAgent = function(callback){
	console.log('create agent in crm called');
	agentDS.createAgent(function(agent) {
		console.log(agent);
		callback(agent);
	});
};

exports.deleteAgent = function(callback){
	console.log('delete agent in crm called');
	agentDS.deleteAgent(function(agent){
		console.log(agent);
		callback(agent);
	});
};

exports.getAgent = function(callback){
	console.log('get an agent in crm called');
	agentDS.getAgent(function(agent) {
		console.log(agent);
		callback(agent);
	});
};

exports.getAgents = function(callback){
	console.log('get agents in crm called');
	agentDS.getAgents(function(agents) {
		console.log(agents);
		callback(agents);
	});
}

exports.updateAgent = function(agent, newInfo, callback){
	console.log('update agent in crm called');
	agentDS.updateAgent(function (agent, newInfo) {
		console.log(agent);
		callback(agent, newInfo);
	});
};


// Contact
exports.createContact = function(callback){
	console.log('create contact in crm called');
	contactDS.createContact(function (agent) {
		console.log(agent);
		callback(agent);
	});
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
exports.createCustomer = function(callback){
	console.log('create customer in crm called');
	contactDS.updateContact(function (customer) {
		console.log(customer);
		callback(customer);
	});
};

exports.deleteCustomer = function(callback){
	console.log('create customer in crm called');
	customerDS.deleteCustomer(function (customer) {
		console.log(customer);
		callback(customer);
	});
};

exports.getCustomer = function(callback){
	console.log('get a customer in crm called');
	customerDS.getCustomer(function(customer) {
		console.log(customer);
		callback(customer);
	});

}

exports.getCustomers = function(callback){
	console.log('get customers in crm called');
	customerDS.getCustomers(function(customers) {
		console.log(customers);
		callback(customers);
	});
}

exports.updateCustomer = function(customer, newInfo, callback){
	console.log('update a customer in crm called');
	customerDS.getCustomer(function(customer, newInfo) {
		console.log(customer);
		callback(customer, newInfo);
	});
};


/*
exports.updateRelationship = function(agent, customer){

}
*/



