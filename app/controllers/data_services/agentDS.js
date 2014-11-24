'use strict';

var _ = require('lodash'),
	mongoose = require('mongoose'),
	Agent = mongoose.model('Agent');

exports.createAgent = function(agentInfo, callback) {
	var agent = new Agent(agentInfo);
	agent.save(function (err, agent) {
		callback(agent);
	});
};


exports.getAgent = function(agentID, callback) {
	Agent.findOne({ _id: agentID }, function(err, agent) {
		callback(agent);
	});
};

exports.getAgentByEmail = function(email, password, callback) {
	Agent.findOne({ email: email, password: password }, function(err, agent) {
		callback(agent);
	});
};

exports.getAgents = function(callback) {
	Agent.find({}, function(err, agents) {
		callback(agents);
	});
};

exports.getAgentsPaginated = function(limit, skip, callback) {
	Agent.find({}).limit(limit).skip(skip).exec(function(err, agents) {
		console.log(agents);
		callback(agents);
	});
};

exports.updateAgent = function(agentID, newInfo, callback) {
	var new_firstName = newInfo.firstName;
	var new_lastName = newInfo.lastName;
	var new_phoneNumber =  newInfo.phoneNumber;
	var new_email = newInfo.email;
	var new_street = newInfo.street;
	var new_city = newInfo.city;
	var new_zip = newInfo.zip;
	var new_state = newInfo.state;
	Agent.update(
				{ _id: agentID }, 
				{ $set: 
					{
					firstName: new_firstName,
					lastName: new_lastName,
					phoneNumber: new_phoneNumber,
					email: new_email,
					street: new_street,
					city: new_city,
					zip: new_zip,
					state: new_state
					}
				},
				{},
				function(err, agent){
					callback(agent);
				}
			);
};


exports.deleteAgent = function(agentID, callback) {
	Agent.remove({ _id: agentID }, function(err) {
		callback(err);
	});
};

exports.getAgentState = function(agentID, callback){
	Agent.findOne({ _id: agentID }, function(err, agent){
		callback(agent.state);
	}); 
};

exports.getAgentCustomerCount = function(agentID, callback){
	Agent.findOne({ _id: agentID }, function(err, agent){
		callback(agent.customer_count);
	}); 
};

exports.updateCustomerCount = function(agentID, count, callback){
	Agent.update(
				{ _id: agentID }, 
				{ $set: 
					{
					customer_count: count
					}
				},
				{},
				function(err, agent){
					callback(agent);
				}
			);
};