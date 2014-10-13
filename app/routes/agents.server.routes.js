'use strict';

module.exports = function(app) {
	var agent = require('../../app/controllers/agents');
	app.route('/agents').post(agent.createAgent);
	app.route('/agents').get(agent.getAgents);
	
	// app.route('/agents/:id').delete(agent.deleteAgent);
	app.route('/agents/:id').get(agent.getAgent);
	
	app.route('/agents/:id/customers').post(agent.createCustomer);
	app.route('/agents/:id/customers').delete(agent.deleteCustomer);
	app.route('/agents/:id/customers').get(agent.getCustomers);
	app.route('/agents/:id/customers/:id').get(agent.getCustomer);
	
	app.route('/agents/:id/create-contact').post(agent.createContact);
};