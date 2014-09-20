'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core');
	app.route('/').get(core.index);
	app.route('/agents/:name').get(core.getAgent);
	app.route('/customers/:name').get(core.getCustomer);

};
