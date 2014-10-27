'use strict';

module.exports = function(app) {
	var agent = require('../../app/controllers/agents');

	app.route('/agents').get(agent.getAgents);
	app.route('/agents/:agentID').get(agent.getAgent);
	app.route('/agents/create').post(agent.createAgent);
	app.route('/agents/home').post(agent.signinAgent);
	app.route('/agents/:agentID/customers/add').post(agent.createCustomer);
	app.route('/agents/:agentID/customers/:customerID').get(agent.getCustomer);
	app.route('/agents/:agentID/customers/:customerID/contacts/add').post(agent.createContact);
	app.route('/agents/:agentID/customers/:customerID/update').post(agent.updateCustomer);
	app.route('/agents/:agentID/update').post(agent.agentUpdate);

	// app.route('/agents/:id').delete(agent.deleteAgent);
	
	app.route('/agents/:agentID/customers').post(agent.deleteCustomer);
	// app.route('/agents/:id/customers').get(agent.getCustomers);
	
};