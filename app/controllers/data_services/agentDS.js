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

exports.getAgentByEmail = function(email, callback) {
	Agent.findOne({ email: email }, function(err, agent) {
		callback(agent);
	});
};

exports.getAgents = function(callback) {
	Agent.find({}, function(err, agents) {
		callback(agents);
	});
};


exports.updateAgent = function(agentID, newInfo, callback) {
	Agent.update(
				{ _id: agentID }, 
				{ $set: newInfo },
				function(err, agent){
					callback(agent);
				}
				);
};


exports.deleteAgent = function(agentID) {
	Agent.delete({ _id: agentID });
};