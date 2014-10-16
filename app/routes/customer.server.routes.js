'use strict';

module.exports = function(app) {
	// Root routing
	var customer = require('../../app/controllers/customers.server.controller.js');
	
	//app.route('/customers/:customerID').get(customer.getCustomer);
	app.route('/customers/home').post(customer.getCustomer);
};


