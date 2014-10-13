'use strict';

var _ = require('lodash'),
	// errorHandler = require('errors'),
	mongoose = require('mongoose'),
	Person = mongoose.model('Person'),
	agentDS = require('./data_services/agentDS.js');


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

exports.testCreateAgent = function(req, res) {
	var agent = {
		firstName: 'Bob',
	    lastName : 'Smith',
	    phoneNumber: '7222342345',
	    email: 'bob@gmail.com',
	    customers: [132412341, 123412341]
	};
	console.log(agent);
	agentDS.createAgent(agent);
	res.render('success', {
		msg: 'success'
	});
};

// exports.testUpdateAgent = function(req, res) {
// 	var agent = {
// 		firstName: 'NewBob',
// 	    lastName : 'Smith',
// 	    phoneNumber: '7222342345',
// 	    email: 'newbob@gmail.com',
// 	    customers: [132412341, 123412341]
// 	};
// 	console.log(agent);
// 	// var agentID = new ObjectId("54283ed2ee02830000e54e51");
// 	agentDS.updateAgent(agentID, agent);
// 	res.render('success', {
// 		msg: 'success'
// 	});
// };



//should be an ID, not a first name
exports.getInfo = function(req, res, id) {
	return Person.find({_id: id});
};

//they will only need to be able to change their phone # and email
exports.updateInfo = function(req, res, id){
	var phone_update = req.body.phoneNumber;
	var email_update = req.body.email;
	Person.update(
	{ _id: id},
	{
		phoneNumber: phone_update,
		email: email_update
	}
	);
};




// var _getConsumersForAgent = function(agentId) {
// 	return Person.find({ _id: agentId }, { consumers: 1 });
// };


// exports.createRelationship = function(req, res, agentId) {
// 	var consumerId = req.body.consumerId;
// 	Person.update(
// 		{ _id: consumerId }, 
// 		{ 
// 			$set: {
// 				agent: agentId
// 			}
// 		}
// 	);

// 	Person.update( 
// 		{ _id: agentId }, 
// 		{
// 			$addToSet: {
// 				consumers: consumerId
// 			}
// 		}
// 	);

// 	res.render('agents', {
// 		consumers: _getConsumersForAgent(agentId)
// 	});
// };

// exports.destroyRelationship = function (req, res, agentId) {
// 	var consumerId = req.body.consumerId;
// 	Person.update{
// 		{ _id: consumerId},
// 		{
// 			$unset: {
// 				agent: agentId
// 			}
// 		}
// 	};

// 	Person.update(
// 		{_id: agentId},
// 		{
// 			$pull: {
// 				consumers: consumerId
// 			}
// 		}
// 	);

// 	};
// 	res.render('agents', {
// 		consumers: _getConsumersForAgent(agentId)
// 	});


// };


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