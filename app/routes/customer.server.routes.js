'use strict';

module.exports = function(app) {
	// Root routing
	var customer = require('../../app/controllers/customers.server.controller.js');
	app.route('/customer/:id').get(customer.getAgent);
};


