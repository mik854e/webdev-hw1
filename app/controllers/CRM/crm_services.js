'use strict';

var agentDS = require('./app/controllers/data_services/agentDS.js');
var contactDS = require('./app/controllers/data_services/contactDS.js');
var customerDS = require('./app/controllers/data_services/customerDS.js');
var _ = require('lodash'),
	// errorHandler = require('errors'),
	mongoose = require('mongoose'),
	Contact = mongoose.model('Contact'),
	Customer = mongoose.model('Customer'),
	Agent = mongoose.model('Agent');


// Relationship between Customer and Agent

// Establishes Relationship between Agent and Customer
exports.createRelationship = function(agentID, customerID) {
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
/*
	res.render('agents', {
		consumers: _getConsumersForAgent(agentId)
	});
*/
};

// Deletes relationship between Agent and Cusomter
exports.deleteRelationship = function(agentID, customerID){
	Agent.update(
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
};

// Establishes link between Agent and Customer for contact interaction
// ContactType: Email, Phone, 
exports.createContactInteraction = function(agentID, customerID, contactType){
	Contact.update(
		$and [{_agentId: agentID}, {_customerId: customerID}],
		{
			$addToSet: {
				contactType: contactType
			}
		}
	);
	console.log('create new contact interaction');
};

exports.contactHistory = function(agentID, customerID){
	Contact.find( {agentID: agentId, customerID: customerID}, function(err, contact){
		return contact
	});
};

// Agent
exports.createAgent = function(agentID){
	agentDS.createAgent(agentID);
};

exports.deleteAgent = function(agentID){
	agentDS.deleteAgent(agentID);
};

exports.getAgent = function(agentID){
	return agentDS.getAgent(agentID);
};

export.updateAgent = function(agentID, newInfo){
	agentDS.updateAgent(agentID, newInfo);
};


// Contact
exports.createContact = function(contactID){
	contactDS.createContact(agentID);
};

exports.deleteContact = function(contactID){
	contactDS.deleteContact(agentID);
};

exports.getContact = function(contactID){
	return contactDS.getContact(agentID);
};

export.updateContact = function(contactID, newInfo){
	contactDS.updateContact(agentID, newInfo);
};


// Customer
exports.createCustomer = function(customerID){
	customerDS.createCustomer(customerID);
};

exports.deleteCustomer = function(customerID){
	customerDS.deleteCustomer(customerID);
};

exports.getCustomer = function(customerID){
	return customerDS.getCustomer(customerID);
};

export.updateCustomer = function(customerID, newInfo){
	customerDS.updateCustomer(customerID, newInfo);
};


/*
exports.updateRelationship = function(agent, customer){

}
*/



