'use strict';

module.exports = function(app) {
	// Root routing
	var customer = require('../../app/controllers/customers.server.controller.js');
	
	app.route('/customers/home').post(customer.signInCustomer);
	app.route('/customers/:customerID/agents/update').get(customer.updateAgent);
};


