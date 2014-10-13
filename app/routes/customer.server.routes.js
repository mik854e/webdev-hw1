'use strict';

module.exports = function(app) {
	// Root routing
	var customer = require('../../app/controllers/data_services/customerDS.js');
	app.route('/customer/:id').get(customer.getInfo);
};


