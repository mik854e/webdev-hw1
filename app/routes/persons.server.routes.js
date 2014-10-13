'use strict';

module.exports = function(app) {
	// Root routing
	var person = require('../../app/controllers/persons');
	app.route('/agents/:id').get(person.getInfo);
	// app.route('/person/:agentId/create-relationship').post(person.createRelationship);
	// currently creating persons without a front end
	app.route('/create-agent').get(person.signup);
	app.route('/test-create-agent').get(person.testCreateAgent)	;
	// app.route('/person/:agentId/contact-history/:consumerId').get(person.getContactHistory);
};

