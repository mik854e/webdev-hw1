'use strict';

module.exports = function(app) {
	// Root routing
	var person = require('../../app/controllers/person');
	app.route('/person/:id').get(person.getInfo);
	app.route('/person/:agentId/create-relationship').post(person.createRelationship);
	app.route('/person/:agentId/contact-history/:consumerId').get(person.getContactHistory);
};
