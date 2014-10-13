'use strict';

var _ = require('lodash'),
	mongoose = require('mongoose'),
	Agent = mongoose.model('Agent');


exports.createAgent = function(agent) {
/* Agent is a JSON object with all field required to update an agent*/
	console.log(agent);
	var new_agent = new Agent(agent);
	console.log('created new agent');
	new_agent.save(function(err) {
		return err;
		//throw exception
	});
};


exports.getAgent = function(agentID) {
	Agent.find({ _id: agentID }, function(err, agent) {
		return agent;
	});
};


exports.updateAgent = function(agentID, newInfo) {
	var agent = Agent.update({ _id: agentID }, { $set: newInfo });
};


exports.deleteAgent = function(agentID) {
	Agent.delete({ _id: agentID });
};