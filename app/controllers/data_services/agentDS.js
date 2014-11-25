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

exports.getRandomAgent = function(callback) {
	Agent.findOneRandom(function(err, agent) {
		if (err) console.log(err);
		else {
			callback(agent);
		}
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
	Agent.update(
			{ _id: agentID }, 
			{ $set: newInfo },
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