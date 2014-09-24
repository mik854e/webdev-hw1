'use strict';

var _ = require('lodash'),
	// errorHandler = require('errors'),
	mongoose = require('mongoose'),
	Person = mongoose.model('Person');


function _getAllAgents(res) {
	var persons = Person.find({role: 'agent'}, function(err, agents) {
		res.render('index', {
			agents: agents
		});
	});
}


exports.signup = function(req, res) {
	// var person = new Person(req.body);
	console.log('hi');
	var person = new Person({
		firstName: 'Bob',
	    lastName : 'Smith',
	    phoneNumber: '7222342345',
	    email: 'bob@gmail.com',
	    role: 'agent'
	});

	person.save(function(err) {
		if (err) {
			return 'error';
			// return res.status(400).send({
				// message: errorHandler.getErrorMessage(err)
		} else {
			_getAllAgents(res);
		}
	});
};




//should be an ID, not a first name
exports.getInfo = function(req, res, id) {
	return Person.find({_id: id});
};



var _getConsumersForAgent = function(agentId) {
	return Person.find({ _id: agentId }, { consumers: 1 });
};


exports.createRelationship = function(req, res, agentId) {
	var consumerId = req.body.consumerId;
	Person.update(
		{ _id: consumerId }, 
		{ 
			$set: {
				agent: agentId
			}
		}
	);

	Person.update( 
		{ _id: agentId }, 
		{
			$addToSet: {
				consumers: consumerId
			}
		}
	);

	res.render('agents', {
		consumers: _getConsumersForAgent(agentId)
	});
};

// exports.getContactHistory = function(req, res, agentId, consumerId) {
// 	var messages = message.find ( 
// 				{ 
// 				agentId: agentId,
// 				consumerId: consumerId 
// 				}
// 			);
// 	res.render('contact-history', {	
// 				messages: messages	
// 	});	
// };