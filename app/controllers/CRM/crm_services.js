'use strict';

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
};

/*
exports.updateRelationship = function(agent, customer){

}
*/



