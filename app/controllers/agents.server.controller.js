'use strict';

var _ = require('lodash'),
	mongoose = require('mongoose'),
	agent_facade = require('./facades/agent_facade.js');

var HOST = 'http://localhost:3000';

exports.createCustomer = function(req, res) {
	var agentID = req.params.agentID;
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var email = req.body.email;
	var password = req.body.password;
	var phoneNumber = req.body.phoneNumber;
	var street = req.body.street;
	var city = req.body.city;
	var zip = req.body.zip;
	var state = req.body.state;
	var update_timestamp = new Date();

	var customerInfo = {
		firstName: firstName,
	    lastName: lastName,
	    phoneNumber: phoneNumber,
	    email: email,
	    password: password,
	    agentID: agentID,
	   	street: street,
	    city: city,
	    zip: zip,
	    state: state,
	    update_timestamp: update_timestamp
	};
	
	var prev_page = '/agents/' + agentID + '#';
	var next_page = '/agents/' + agentID + '?page=2';

	agent_facade.createCustomer(customerInfo, function(customer) {
		agent_facade.getAgent(agentID, function(agent) {
			agent_facade.getCustomers(agentID, 1, function(customers) {
				res.render('agenthome', {
					agent: agent,
					customers: customers,
					prev_page: prev_page,
					next_page: next_page
				});
			});
		});
	});
};

exports.deleteCustomer = function(req, res) {
	var agentID = req.params.agentID;
	var customerID = req.params.customerID;

	var page_num = 1;
	var prev_page = '/agents/' + agentID + '#';
	var next_page = '/agents/' + agentID + '?page=2';

	agent_facade.deleteCustomer(customerID, function() {
		agent_facade.getAgent(agentID, function(agent) {
			agent_facade.getCustomers(agentID, page_num, function(customers) {
				res.render('agenthome', {
					agent: agent,
					customers: customers,
					prev_page: prev_page,
					next_page: next_page
				});
			});
		});
	});
};

exports.createAgent = function(req, res) {
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var email = req.body.email;
	var password = req.body.password;
	var phoneNumber = req.body.phoneNumber;
	var street = req.body.street;
	var city = req.body.city;
	var zip = req.body.zip;
	var state = req.body.state;
	var customer_count = 0;

	var agentInfo = {
		firstName: firstName,
	    lastName: lastName,
	    phoneNumber: phoneNumber,
	    email: email,
	    password: password,
	    street: street,
	    city: city,
	    zip: zip,
	    state: state,
	    customer_count: customer_count
	};

	agent_facade.createAgent(agentInfo, function(agent) {
		res.render('agenthome', {
			agent: agent
		});
	});

};

exports.getAgent = function(req, res) {
	var agentID = req.params.agentID;

	var page_num = req.query.page;
	if (!page_num) page_num = 1;
	else page_num = parseInt(page_num);

	var prev_page;
	if (page_num > 1) prev_page = '/agents/' + agentID + '?page=' + (page_num-1).toString();
	else prev_page = '/agents/' + agentID + '#';

	var next_page = '/agents/' + agentID + '?page=' + (page_num+1).toString();

	agent_facade.getAgent(agentID, function(agent) {
		agent_facade.getCustomers(agentID, page_num, function(customers) {
			res.render('agenthome', {
				agent: agent,
				customers: customers,
				prev_page: prev_page,
				next_page: next_page
			});
		});
	});
};

exports.getAgentUpdate = function(req, res) {
	var agentID = req.params.agentID;

	agent_facade.getAgent(agentID, function(agent) {
		agent_facade.getCustomers(agentID, 1, function(customers) {
			res.render('agentUpdate', {
				agent: agent,
				customers: customers
			});
		});
	});
};

exports.getAgents = function(req, res) {
	var page_num = req.query.page;
	if (!page_num) page_num = 1;
	else page_num = parseInt(page_num);

	var prev_page;
	if (page_num > 1) prev_page = '/agents?page=' + (page_num-1).toString();
	else prev_page = '/agents/#';

	var next_page = '/agents?page=' + (page_num+1).toString();

	agent_facade.getAgents(page_num, function(agents) {
		res.render('allagents', {
			agents: agents,
			prev_page: prev_page,
			next_page: next_page
		});
	});
};

exports.signinAgent = function(req, res) {
	var email = req.body.email;
	var password = req.body.password;

	var page_num = 1;

	agent_facade.getAgentByEmail(email, password, function(agent) {
		if (agent) {
			var agentID = agent._id.toString();
			var prev_page = '/agents/' + agentID + '#';
			var next_page = '/agents/' + agentID + '?page=2';
			agent_facade.getCustomers(agentID, page_num, function(customers) {
				res.render('agenthome', {
					agent: agent,
					customers: customers,
					prev_page: prev_page,
					next_page: next_page
				});
			});
		}
		else {
			res.render('signin');
		}
	});
};

exports.getCustomer = function(req, res) {
	var agentID = req.params.agentID;
	var customerID = req.params.customerID;

	var page_num = req.query.page;
	if (!page_num) page_num = 1;
	else page_num = parseInt(page_num);

	var prev_page;
	if (page_num > 1) prev_page = '/agents/' + agentID + '/customers/' + customerID + '?page=' + (page_num-1).toString();
	else prev_page = '/agents/' + agentID + '/customers/' + customerID + '/#';

	var next_page = '/agents/' + agentID + '/customers/' + customerID + '?page=' + (page_num+1).toString();

	agent_facade.getCustomer(customerID, function(customer) {
		agent_facade.getContactHistory(agentID, customerID, page_num, function(contactHistory) {
			res.render('customer', {
				agentID: agentID,
				customer: customer,
				contactHistory : contactHistory,
				prev_page: prev_page,
				next_page: next_page
			});
		});
	});
};

exports.getCustomerUpdate = function(req, res) {
	var agentID = req.params.agentID;
	var customerID = req.params.customerID;

	var page_num = 1;
	var prev_page = '/agents/' + agentID + '/customers/' + customerID + '/#';
	var next_page = '/agents/' + agentID + '/customers/' + customerID + '?page=' + (page_num+1).toString();

	agent_facade.getCustomer(customerID, function(customer) {
		agent_facade.getContactHistory(agentID, customerID, page_num, function(contactHistory) {
			res.render('customerupdate', {
				agentID: agentID,
				customer: customer,
				contactHistory : contactHistory,
				prev_page: prev_page,
				next_page: next_page
			});
		});
	});
};

exports.createContact = function(req, res) {
	var agentID = req.params.agentID;
	var customerID = req.params.customerID;
	var contactType = req.body.contactType;
	var summary = req.body.summary;
	var street = req.body.street;
	var city = req.body.city;
	var zip = req.body.zip;
	var state = req.body.state;
	var date = new Date();
	var contactInfo = {
		agentID: agentID,
		customerID: customerID,
		contactType: contactType,
		summary: summary,
		timestamp: new Date(),
		street: street,
		city: city,
		zip: zip,
		state: state
	};

	var page_num = 1;
	var prev_page = '/agents/' + agentID + '/customers/' + customerID + '/#';
	var next_page = '/agents/' + agentID + '/customers/' + customerID + '?page=' + (page_num+1).toString();

	agent_facade.createContact(contactInfo, function() {
		agent_facade.getCustomer(customerID, function(customer) {
			agent_facade.getContactHistory(agentID, customerID, page_num, function(contactHistory) {
				res.render('customer', {
					agentID: agentID,
					customer: customer,
					contactHistory : contactHistory
				});
			});
		});
	});
};

exports.updateCustomer = function(req, res){
	var agentID = req.params.agentID;
	var customerID = req.params.customerID;

	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var email = req.body.email;
	var phoneNumber = req.body.phoneNumber;
	var street = req.body.street;
	var city = req.body.city;
	var zip = req.body.zip;
	var state = req.body.state;
	var update_timestamp = new Date();

	var customerInfo = {
		firstName: firstName,
	    lastName: lastName,
	    phoneNumber: phoneNumber,
	    email: email,
	    agentID: agentID,
	    street: street,
	    city: city,
	    zip: zip,
	    state: state,
	    update_timestamp: update_timestamp
	};
	
	var page_num = 1;
	var prev_page = '/agents/' + agentID + '#';
	var next_page = '/agents/' + agentID + '?page=2';

	agent_facade.updateCustomer(customerID, customerInfo, function(customer) {
		agent_facade.getAgent(agentID, function(agent) {
			agent_facade.getCustomers(agentID, page_num, function(customers) {
				res.render('agentHome', {
					agent: agent,
					customers: customers,
					prev_page: prev_page,
					next_page: next_page
				});
			});
		});
	});

};

exports.deleteContact = function(req, res) {
	var contactID = req.params.contactID;
	agent_facade.deleteContact(contactID, function() {
		res.render('success', {
			msg: 'deleted contact!'
		});
	});
};

exports.updateAgent = function(req, res) {
	var agentID = req.params.agentID;
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var email = req.body.email;
	var phoneNumber = req.body.phoneNumber;
	var street = req.body.street;
	var city = req.body.city;
	var zip = req.body.zip;
	var state = req.body.state;

	var agentInfo = {
		firstName: firstName,
	    lastName: lastName,
	    phoneNumber: phoneNumber,
	    email: email,
	   	street: street,
	    city: city,
	    zip: zip,
	    state: state
	};

	var page_num = 1;
	var prev_page = '/agents/' + agentID + '#';
	var next_page = '/agents/' + agentID + '?page=2';

	agent_facade.updateAgent(agentID, agentInfo, function(agent) {
		agent_facade.getAgent(agentID, function(agent) {
			agent_facade.getCustomers(agentID, page_num, function(customers) {
				res.render('agenthome', {
					agent: agent,
					customers: customers,
					prev_page: prev_page,
					next_page: next_page
				});
			});
		});
	});
};	

exports.deleteAgent = function(req, res) {
	var agentID = req.params.agentID;
	var page_num = 1;
	var prev_page = '/agents/#';
	var next_page = '/agents?page=' + (page_num+1).toString();

	agent_facade.deleteAgent(agentID, function() {
		agent_facade.getAgents(page_num, function(agents) {
			res.render('allagents', {
				agents: agents,
				prev_page: prev_page,
				next_page: next_page
			});
		});
	});
};

exports.searchCustomers = function(req, res) {
	var agentID = req.params.agentID;
	var query = req.body.query;

	agent_facade.searchCustomers(agentID, query, function(customers) {
		res.render('customersearch', {
			agentID: agentID,
			customers: customers,
			query: query
		});
	});
};

exports.updateAgentAsync = function(req, res) {
	var agentID = req.params.agentID;
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var email = req.body.email;
	var phoneNumber = req.body.phoneNumber;
	var street = req.body.street;
	var city = req.body.city;
	var zip = req.body.zip;
	var state = req.body.state;

	var agentInfo = {
		firstName: firstName,
	    lastName: lastName,
	    phoneNumber: phoneNumber,
	    email: email,
	   	street: street,
	    city: city,
	    zip: zip,
	    state: state
	};

	agent_facade.updateAgent(agentID, agentInfo, function(agent) {
	});

	var poll_url = HOST + '/agents/' + agentID;

	res.status(202).render('asyncupdated', {
		poll_url: poll_url
	});
};
